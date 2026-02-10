// header_index.js
// Renderiza o shell do header dentro de #header-index
// Estrutura EXATA da produção:
//   #header-index
//     div.flex.flex-col (inner header)
//       div (logo)
//       div#toolbar-prescricao (toolbar será preenchida por headerToolbar.js)
//     div.w-full.max-w-5xl (tabs wrapper)
//       div#toolboxContainer (tabs serão preenchidas por headerToolContainer.js)
//
// Expõe: window.renderHeaderIndex
(() => {
  'use strict';

  let rendered = false;

  function render() {
    const container = document.getElementById('header-index');
    if (!container) {
      console.warn('[HeaderIndex] #header-index not found');
      return;
    }
    if (rendered) return;

    // ✅ Classes idênticas à produção
    container.className = 'border-b border-slate-50 px-4 py-4 md:px-6 print:hidden';

    // ✅ HTML EXATO da produção — IDs corretos
    container.innerHTML = `
      <div class="flex flex-col p-3 mb-8 bg-[#e0e5ec] rounded-[50px] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] gap-3 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center gap-3">
          <span class="material-symbols-rounded region-icon text-4xl text-blue-500 mx-4">cognition</span>
          <div class="text-xl font-bold text-slate-900 text-shadow-sm">Apoio clínico - GT-Medics ® - 2025</div>
        </div>

        <div id="toolbar-prescricao"
          class="bg-gray-200 flex flex-wrap items-center gap-8 p-4 m-4 rounded-xl shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff]">
        </div>
      </div>

      <div class="w-full max-w-5xl mx-auto">
        <div id="toolboxContainer">
        </div>
      </div>
    `;

    rendered = true;
    window.__asideRegistry?.register('header-index', { render, destroy });

    // Renderiza filhos com retry
    renderChildren();
  }

  function renderChildren() {
    let done = 0;
    const maxWait = 5000;
    let elapsed = 0;

    function tick() {
      if (done >= 2) return;

      // Toolbar: checa se já foi preenchida (tem botão dentro)
      if (window.renderHeaderToolbar && !document.getElementById('printBtnrec')) {
        window.renderHeaderToolbar();
        done++;
      }

      // Tabs: checa se já foi preenchida (tem tabBtn dentro)
      if (window.renderHeaderToolContainer && !document.querySelector('#toolboxContainer .tabBtn')) {
        window.renderHeaderToolContainer();
        done++;
      }

      if (done >= 2) {
        console.log('[HeaderIndex] ✅ Header complete');
        return;
      }

      elapsed += 100;
      if (elapsed >= maxWait) {
        console.warn('[HeaderIndex] ⚠️ Timeout — ' + done + '/2 children rendered');
        if (window.renderHeaderToolbar) window.renderHeaderToolbar();
        if (window.renderHeaderToolContainer) window.renderHeaderToolContainer();
        return;
      }

      setTimeout(tick, 100);
    }

    tick();
  }

  function destroy() {
    rendered = false;
    const c = document.getElementById('header-index');
    if (c) c.innerHTML = '';
  }

  // =========================================
  // BOOTSTRAP — Aguarda DOM
  // =========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

  window.renderHeaderIndex = render;
})();