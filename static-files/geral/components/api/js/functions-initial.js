// header_toolbar.js (BIND-ONLY)
// O HTML da toolbar já existe no index.html.
// Este script APENAS faz bind de eventos nos elementos existentes.
// IDs esperados: printBtnrec, clearBtn, copyBtn,
//   mostrarLogoSus, codesBtn, mostrarMedico, mostrarLocal
(() => {
  'use strict';

  let abortController = null;

  function init() {
    if (!document.getElementById('printBtnrec')) {
      console.warn('[Toolbar] #printBtnrec not found — skipping');
      return;
    }

    if (abortController) abortController.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    bindButtons(signal);
    bindCheckboxes(signal);
    registerComponent();
    console.log('[Toolbar] ✅ Events bound');
  }

  // =========================================
  // BUTTONS
  // =========================================

  function bindButtons(signal) {
    document.getElementById('printBtnrec')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    }, { signal });

    document.getElementById('clearBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!confirm('Tem certeza que deseja limpar a receita?')) return;

      const api = window.__asideRegistry?.get('prescription-editor');
      if (api?.clearContent) { api.clearContent(); }
      else if (window.clearEditor) { window.clearEditor(); }
      else {
        const editor = document.getElementById('textArea');
        if (editor) { editor.innerHTML = ''; editor.focus(); }
      }
    }, { signal });

    document.getElementById('copyBtn')?.addEventListener('click', async (e) => {
      e.preventDefault();
      const api = window.__asideRegistry?.get('prescription-editor');
      let text = api?.getContent ? api.getContent() : (document.getElementById('textArea')?.innerText || '');

      if (!text) { flashBtn(document.getElementById('copyBtn'), 'Vazio!'); return; }

      try {
        if (api?.copyContent) { await api.copyContent(); }
        else { await navigator.clipboard.writeText(text); }
        flashBtn(document.getElementById('copyBtn'), 'Copiado!');
      } catch (err) { console.error('[Toolbar] Copy failed:', err); }
    }, { signal });
  }

  // =========================================
  // CHECKBOXES
  // =========================================

  function bindCheckboxes(signal) {
    setupCheckbox('mostrarLogoSus', (checked) => {
      const logo = document.getElementById('logoSus');
      const texto = document.getElementById('textoViaDigital');
      if (logo) logo.classList.toggle('hidden', !checked);
      if (texto) texto.classList.toggle('hidden', checked);
    }, signal);

    setupCheckbox('codesBtn', (checked) => {
      const panel = document.getElementById('codesPanel');
      if (panel) panel.classList.toggle('hidden', !checked);
    }, signal);

    setupCheckbox('mostrarMedico', (checked) => {
      const row = document.getElementById('rowMedico');
      if (row) row.classList.toggle('hidden', !checked);
    }, signal);

    setupCheckbox('mostrarLocal', (checked) => {
      const row = document.getElementById('rowLocal');
      if (row) row.classList.toggle('hidden', !checked);
    }, signal);
  }

  function setupCheckbox(id, callback, signal) {
    const cb = document.getElementById(id);
    if (!cb) return;
    cb.addEventListener('change', (e) => callback(e.target.checked), { signal });
    setTimeout(() => callback(cb.checked), 50);
  }

  // =========================================
  // UTILS
  // =========================================

  function flashBtn(btn, text = 'OK!') {
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.textContent = text;
    btn.classList.add('ring-2', 'ring-emerald-300');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove('ring-2', 'ring-emerald-300');
    }, 1200);
  }

  // =========================================
  // REGISTRY & LIFECYCLE
  // =========================================

  function registerComponent() {
    window.__asideRegistry?.register('header-toolbar', { init, destroy });
  }

  function destroy() {
    abortController?.abort();
    abortController = null;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.renderHeaderToolbar = init;
})();