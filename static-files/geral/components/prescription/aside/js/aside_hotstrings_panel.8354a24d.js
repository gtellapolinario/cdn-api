// aside_hotstrings_panel.js (REFATORADO)
// Sem favoritos (app aberta). Começa vazio — items aparecem conforme busca.
// Counter mostra total disponível. max-w-[340px].
(() => {
  'use strict';

  let bus;
  let abortController = null;
  let currentHotstrings = {};

  // =========================================
  // RENDER
  // =========================================

  function render() {
    const container = document.getElementById('aside_hotstrings_panel');
    if (!container) return;

    bus = window.__asideBus;
    abortController?.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    // ✅ HTML da produção. IDs: codesPanel, codesCount, searchBox, hotstringItems
    container.innerHTML = `
      <aside id="codesPanel" class="rounded-2xl shadow-lg bg-white p-2 m-2 max-w-[340px] print:hidden">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-900">code</span>
            <div class="text-sm font-bold text-shadow-rs">Hotstrings</div>
          </div>
          <span id="codesCount"
            class="rounded-full bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600">0</span>
        </div>

        <div class="mt-3">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">search</span>
            <input id="searchBox" type="text" placeholder="Buscar código ou descrição..."
              class="w-full rounded-xl border border-slate-100 bg-white py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-slate-300" />
          </div>
        </div>

        <div class="mt-3 max-h-[640px] overflow-auto rounded-xl">
          <div id="hotstringItems" class="divide-y divide-slate-100"></div>
        </div>

        <div class="mt-3 text-xs text-slate-500">
          Dica: clique em um item para inserir o <span class="font-mono">código</span> no cursor.
        </div>
      </aside>
    `;

    loadHotstrings();
    bindEvents(signal);
    registerComponent();
  }

  // =========================================
  // EVENTS
  // =========================================

  function bindEvents(signal) {
    const searchInput = document.getElementById('searchBox');
    const itemsContainer = document.getElementById('hotstringItems');

    // Busca com debounce — items só aparecem ao digitar
    let timer;
    searchInput?.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const term = searchInput.value.trim();
        if (term.length >= 2) {
          renderFilteredItems(term);
        } else {
          // Menos de 2 chars → limpa lista
          clearItems();
        }
      }, 150);
    }, { signal });

    // Click delegation → insere hotstring no editor
    itemsContainer?.addEventListener('click', (e) => {
      const item = e.target.closest('[data-hotstring]');
      if (!item) return;

      const code = item.dataset.hotstring;
      bus?.emit('hotstringClicked', { code });

      // Backward compat
      if (typeof window.insertAtCursor === 'function') {
        window.insertAtCursor(code);
      }
    }, { signal });
  }

  // =========================================
  // DATA
  // =========================================

  function loadHotstrings() {
    currentHotstrings =
      window.hotstrings ||
      window.psf_hotstrings ||
      window.quick_hotstrings ||
      {};

    const total = Object.keys(currentHotstrings).length;
    updateCounter(total);

    if (total) return; // dados já disponíveis, counter atualizado

    // Aguarda hotstrings ficarem disponíveis (flag evita disparo duplo bus+timeout)
    let hsLoaded = false;
    bus?.once('hotstringDataReady', () => {
      if (hsLoaded) return;
      hsLoaded = true;
      currentHotstrings = window.hotstrings || window.psf_hotstrings || {};
      updateCounter(Object.keys(currentHotstrings).length);
    });

    // Fallback caso o evento nunca dispare
    setTimeout(() => {
      if (hsLoaded || Object.keys(currentHotstrings).length) return;
      hsLoaded = true;
      currentHotstrings = window.hotstrings || window.psf_hotstrings || {};
      updateCounter(Object.keys(currentHotstrings).length);
    }, 2000);
  }

  // =========================================
  // RENDER ITEMS (só os filtrados)
  // =========================================

  function renderFilteredItems(term) {
    const container = document.getElementById('hotstringItems');
    if (!container) return;

    const search = term.toLowerCase();
    const entries = Object.entries(currentHotstrings);

    const filtered = entries.filter(([code, text]) =>
      code.toLowerCase().includes(search) || text.toLowerCase().includes(search)
    );

    if (!filtered.length) {
      container.innerHTML = `
        <div class="p-3 text-center text-xs text-slate-400">Nenhum resultado para "${escapeHTML(term)}"</div>
      `;
      return;
    }

    container.innerHTML = filtered
      .map(([code, text]) => {
        const preview = text.substring(0, 60).replace(/\n/g, ' ');
        return `
          <div class="hotstring-item flex items-center gap-2 p-2 hover:bg-slate-100 cursor-pointer rounded transition-colors"
            data-hotstring="${escapeAttr(code)}">
            <span class="font-mono text-xs font-bold text-blue-600 flex-shrink-0">${escapeHTML(code)}</span>
            <span class="text-xs text-slate-500 truncate flex-1">${escapeHTML(preview)}…</span>
          </div>
        `;
      })
      .join('');
  }

  function clearItems() {
    const container = document.getElementById('hotstringItems');
    if (container) container.innerHTML = '';
  }

  function updateCounter(count) {
    const counter = document.getElementById('codesCount');
    if (counter) counter.textContent = count;
  }

  // =========================================
  // UTILS
  // =========================================

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // =========================================
  // REGISTRO & LIFECYCLE
  // =========================================

  function registerComponent() {
    window.__asideRegistry?.register('hotstrings-panel', {
      render, destroy, reload: loadHotstrings,
    });
  }

  function destroy() {
    abortController?.abort();
    abortController = null;
    const c = document.getElementById('aside_hotstrings_panel');
    if (c) c.innerHTML = '';
  }

  window.renderHotstringsPanel = render;
})();