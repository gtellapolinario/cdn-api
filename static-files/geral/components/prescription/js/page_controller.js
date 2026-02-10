// page_controller.js (FINAL)
// Responsabilidades EXCLUSIVAS:
//   - Codes panel (sidebar busca rápida hotstrings)
//   - Editor Table CRUD (aba editar hotstrings)
//   - Import/Export/Reset hotstrings
//   - Convert Text modal
//   - Hotstring expansion em textareas (examText)
//   - Backward compat stubs (CNES inline onclick)
//
// MIGRADO para header_toolbar.js:     print/clear/copy buttons, checkboxes (SUS/codes/medico/local)
// MIGRADO para header_tool_container.js: tab navigation, lazy-init módulos
// MIGRADO para prescription_box.js:    insertAtCursor, adjustFontSize, tryExpandActiveWord
// MIGRADO para aside_cnes_search.js:   preencherCNES, limparCamposCNES
(() => {
  'use strict';

  const el = (id) => document.getElementById(id);
  const on = (node, evt, fn, opts) => { if (node) node.addEventListener(evt, fn, opts); };

  const safeFirstLine = (text) => {
    const first = String(text || '').split('\n')[0] || '';
    return first.length > 80 ? first.slice(0, 80) + '…' : first;
  };

  // =========================================
  // HOTSTRINGS DATA
  // =========================================

  const getHotstringsData = () => {
    if (window.HotstringsModule?.data) return window.HotstringsModule.data;
    return typeof window.hotstrings === 'object' && window.hotstrings ? window.hotstrings : {};
  };

  let hotstringsRef = getHotstringsData();

  if (!Object.keys(hotstringsRef).length) {
    const retry = setInterval(() => {
      const data = getHotstringsData();
      if (Object.keys(data).length) {
        hotstringsRef = data;
        renderHotstringsList(el('searchBox')?.value || '');
        renderEditorTable();
        clearInterval(retry);
      }
    }, 500);
    setTimeout(() => clearInterval(retry), 10000);
  }

  const DEFAULT_HOTSTRINGS = JSON.parse(JSON.stringify(hotstringsRef));

  // =========================================
  // TAB CHANGE LISTENER
  // =========================================

  const bus = window.__asideBus;

  function onTabChanged(tab) {
    if (tab === 'editar') {
      hotstringsRef = getHotstringsData();
      renderEditorTable();
    }
  }

  bus?.on('tabChanged', ({ tab }) => onTabChanged(tab));
  window.addEventListener('tabChanged', (e) => onTabChanged(e.detail?.tab));

  // =========================================
  // CODES PANEL
  // =========================================

  const searchBox = el('searchBox');

  function renderHotstringsList(filter = '') {
    const container = el('hotstringItems');
    const counter = el('codesCount');
    if (!container || !counter) return;

    container.innerHTML = '';
    const entries = Object.entries(hotstringsRef).sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));
    counter.textContent = String(entries.length);

    const term = filter.trim().toLowerCase();
    if (!term) {
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-8 text-slate-400 opacity-60">
          <span class="material-symbols-outlined text-4xl mb-2">manage_search</span>
          <span class="text-xs font-medium">Digite para buscar...</span>
        </div>`;
      return;
    }

    let count = 0;
    const LIMIT = 50;
    const fragment = document.createDocumentFragment();

    for (const [code, text] of entries) {
      if (!code.toLowerCase().includes(term)) continue;
      if (count >= LIMIT) {
        const more = document.createElement('div');
        more.className = 'text-center text-xs text-slate-400 py-2 italic border-t border-slate-100 mt-2';
        more.textContent = '...e mais resultados. Refine sua busca.';
        fragment.appendChild(more);
        break;
      }

      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'w-full text-left px-3 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-lg transition-colors group mb-1';
      row.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="font-mono text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors bg-slate-100 inline-block px-1.5 rounded text-[11px] mb-1">${code}</div>
            <div class="text-[11px] text-slate-600 leading-snug line-clamp-2 text-justify">${safeFirstLine(text)}</div>
          </div>
          <span class="material-symbols-outlined text-slate-300 text-[16px] group-hover:text-blue-500 transition-colors mt-1">input</span>
        </div>`;

      on(row, 'click', () => {
        const api = window.__asideRegistry?.get('prescription-editor');
        if (api?.insertAtCursor) { api.insertAtCursor(code + ' '); }
        else if (window.insertAtCursor) { window.insertAtCursor(code + ' '); }
      });

      fragment.appendChild(row);
      count++;
    }

    if (!count) {
      container.innerHTML = '<div class="py-6 text-center text-sm text-slate-500">Nenhum resultado encontrado.</div>';
    } else {
      container.appendChild(fragment);
    }
  }

  on(searchBox, 'input', () => renderHotstringsList(searchBox.value));

  // =========================================
  // HOTSTRING EXPANSION — Exames textarea only
  // =========================================

  function tryExpandInTextarea(textarea) {
    if (!textarea || !hotstringsRef) return;
    const cursorPos = textarea.selectionStart ?? textarea.value.length;
    const before = textarea.value.slice(0, cursorPos);
    if (!/\s$/.test(before)) return;

    const trimmed = before.trimEnd();
    const match = trimmed.match(/(\S+)$/);
    if (!match) return;

    const word = match[1];
    let key = word;
    if (!Object.prototype.hasOwnProperty.call(hotstringsRef, word)) {
      key = Object.keys(hotstringsRef).find((k) => k.toLowerCase() === word.toLowerCase());
    }
    if (!key) return;

    const expansion = hotstringsRef[key];
    const newBefore = trimmed.slice(0, trimmed.length - word.length) + expansion + ' ';
    textarea.value = newBefore + textarea.value.slice(cursorPos);
    textarea.setSelectionRange(newBefore.length, newBefore.length);
  }

  document.addEventListener('input', (e) => {
    if (e.target?.id === 'examText') tryExpandInTextarea(e.target);
  });

  // =========================================
  // EDITOR TABLE — CRUD
  // =========================================

  let editorCurrentPage = 1;
  let editorItemsPerPage = 10;
  let editorFilter = '';

  const editorHotstringsList = el('editorHotstringsList');
  const searchEditorInput = el('searchEditorInput');
  const itemsPerPageSelect = el('itemsPerPageSelect');
  const prevPageBtn = el('prevPageBtn');
  const nextPageBtn = el('nextPageBtn');
  const pageNumbers = el('pageNumbers');
  const totalItemsSpan = el('totalItems');
  const gotoPageInput = el('gotoPageInput');

  const hotstringModal = el('hotstringModal');
  const modalCodeInput = el('modalCodeInput');
  const modalTextInput = el('modalTextInput');
  const modalTitle = el('modalTitle');
  const modalSaveBtn = el('modalSaveBtn');
  const modalCancelBtn = el('modalCancelBtn');
  let editingOriginalCode = null;

  function getFilteredSorted() {
    const entries = Object.entries(hotstringsRef);
    const term = editorFilter.trim().toLowerCase();
    let filtered = term
      ? entries.filter(([c, t]) => c.toLowerCase().includes(term) || t.toLowerCase().includes(term))
      : entries;
    return filtered.sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));
  }

  function renderEditorTable() {
    if (!editorHotstringsList) return;
    const all = getFilteredSorted();
    const total = all.length;
    if (totalItemsSpan) totalItemsSpan.textContent = total;

    const totalPages = Math.ceil(total / editorItemsPerPage) || 1;
    editorCurrentPage = Math.max(1, Math.min(editorCurrentPage, totalPages));

    const start = (editorCurrentPage - 1) * editorItemsPerPage;
    const page = all.slice(start, start + editorItemsPerPage);

    editorHotstringsList.innerHTML = '';

    if (!page.length) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="3" class="px-6 py-4 text-center text-slate-500">Nenhum item encontrado</td>';
      editorHotstringsList.appendChild(tr);
    } else {
      for (const [code, text] of page) {
        const tr = document.createElement('tr');
        tr.className = 'group transition-colors hover:bg-black/5 text-slate-800 border-b border-transparent hover:border-slate-200';
        const display = text.length > 60 ? text.slice(0, 60) + '...' : text;
        tr.innerHTML = `
          <td class="px-6 py-4 font-mono font-bold align-top select-all">${code}</td>
          <td class="px-6 py-4 whitespace-pre-wrap align-top text-xs">${display}</td>
          <td class="px-6 py-4 align-top text-right">
            <div class="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <button type="button" class="btn-edit p-2 rounded-full hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors" title="Editar"><span class="material-symbols-outlined text-lg">edit</span></button>
              <button type="button" class="btn-delete p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors" title="Excluir"><span class="material-symbols-outlined text-lg">delete</span></button>
            </div>
          </td>`;
        tr.querySelector('.btn-edit').onclick = () => openModal(code, text);
        tr.querySelector('.btn-delete').onclick = () => deleteHotstring(code);
        editorHotstringsList.appendChild(tr);
      }
    }
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (pageNumbers) {
      pageNumbers.innerHTML = '';
      const info = document.createElement('span');
      info.className = 'text-sm font-semibold text-slate-800 self-center';
      info.textContent = `${editorCurrentPage} / ${totalPages}`;
      pageNumbers.appendChild(info);
    }
    if (prevPageBtn) prevPageBtn.disabled = editorCurrentPage <= 1;
    if (nextPageBtn) nextPageBtn.disabled = editorCurrentPage >= totalPages;
    if (gotoPageInput) gotoPageInput.value = editorCurrentPage;
  }

  function openModal(code = null, text = null) {
    if (hotstringModal) hotstringModal.classList.remove('hidden');
    editingOriginalCode = code;
    if (modalTitle) modalTitle.textContent = code ? 'Editar Hotstring' : 'Adicionar Hotstring';
    if (modalCodeInput) modalCodeInput.value = code || '';
    if (modalTextInput) modalTextInput.value = text || '';
    modalCodeInput?.focus();
  }

  function closeModal() {
    if (hotstringModal) hotstringModal.classList.add('hidden');
    editingOriginalCode = null;
  }

  function saveHotstring() {
    const code = modalCodeInput?.value.trim();
    const text = modalTextInput?.value;
    if (!code) return alert('Código é obrigatório!');
    if (hotstringsRef[code] && (editingOriginalCode !== code || !editingOriginalCode)) {
      if (!confirm(`"${code}" já existe. Sobrescrever?`)) return;
    }
    if (editingOriginalCode && code !== editingOriginalCode) delete hotstringsRef[editingOriginalCode];
    hotstringsRef[code] = text;
    closeModal();
    renderHotstringsList();
    renderEditorTable();
  }

  function deleteHotstring(code) {
    if (confirm(`Excluir "${code}"?`)) {
      delete hotstringsRef[code];
      renderHotstringsList();
      renderEditorTable();
    }
  }

  on(el('addNewHotstringBtn'), 'click', () => openModal());
  on(modalCancelBtn, 'click', closeModal);
  on(modalSaveBtn, 'click', saveHotstring);
  on(searchEditorInput, 'input', (e) => { editorFilter = e.target.value; editorCurrentPage = 1; renderEditorTable(); });
  on(itemsPerPageSelect, 'change', (e) => { editorItemsPerPage = parseInt(e.target.value); editorCurrentPage = 1; renderEditorTable(); });
  on(prevPageBtn, 'click', () => { if (editorCurrentPage > 1) { editorCurrentPage--; renderEditorTable(); } });
  on(nextPageBtn, 'click', () => { const tp = Math.ceil(getFilteredSorted().length / editorItemsPerPage) || 1; if (editorCurrentPage < tp) { editorCurrentPage++; renderEditorTable(); } });
  on(gotoPageInput, 'change', (e) => { const v = parseInt(e.target.value); if (v > 0) { editorCurrentPage = v; renderEditorTable(); } });

  // =========================================
  // CONVERT TEXT MODAL
  // =========================================

  const convertTextModal = el('convertTextModal');
  const convertCodeInput = el('convertCodeInput');
  const convertTextInput = el('convertTextInput');

  on(el('convertTextBtn'), 'click', () => { if (convertTextModal) convertTextModal.classList.remove('hidden'); if (convertCodeInput) convertCodeInput.value = ''; if (convertTextInput) convertTextInput.value = ''; });
  on(el('convertCancelBtn'), 'click', () => { if (convertTextModal) convertTextModal.classList.add('hidden'); });
  on(el('convertSaveBtn'), 'click', () => {
    const code = convertCodeInput?.value.trim();
    const text = convertTextInput?.value;
    if (!code) return alert('Código necessário');
    if (hotstringsRef[code] && !confirm('Sobrescrever?')) return;
    hotstringsRef[code] = text;
    if (convertTextModal) convertTextModal.classList.add('hidden');
    renderHotstringsList();
    renderEditorTable();
  });

  // =========================================
  // RESET / EXPORT / IMPORT
  // =========================================

  on(el('resetBtn'), 'click', () => {
    if (!confirm('Restaurar hotstrings para o padrão original?')) return;
    for (const k of Object.keys(hotstringsRef)) delete hotstringsRef[k];
    Object.assign(hotstringsRef, DEFAULT_HOTSTRINGS);
    renderHotstringsList();
    renderEditorTable();
    alert('Restaurado para o padrão.');
  });

  on(el('exportBtn'), 'click', () => {
    const a = document.createElement('a');
    a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(hotstringsRef, null, 2));
    a.download = 'hotstrings_backup.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  on(el('importInput'), 'change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const obj = JSON.parse(evt.target.result);
        if (obj && typeof obj === 'object') {
          if (!confirm('Importar substituirá a lista atual. Continuar?')) return;
          for (const k of Object.keys(hotstringsRef)) delete hotstringsRef[k];
          Object.assign(hotstringsRef, obj);
          renderHotstringsList();
          renderEditorTable();
          alert('Importado com sucesso!');
        } else { alert('Arquivo inválido.'); }
      } catch (err) { alert('Erro ao ler JSON: ' + err.message); }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // =========================================
  // BACKWARD COMPAT STUBS
  // =========================================

  window.mostrarCNES = function () {
    const select = el('select-unidade'), container = el('cnes-container'), input = el('input-cnes');
    if (!select) return;
    const cnes = select.value;
    if (input) input.value = cnes;
    if (container) container.style.display = cnes ? 'flex' : 'none';
  };

  window.inserirCNES = function () {
    const cnes = el('input-cnes')?.value;
    if (!cnes) return;
    const api = window.__asideRegistry?.get('cnes-search');
    if (api?.search) api.search(cnes);
    else if (window.searchCNES) window.searchCNES(cnes);
  };

  window.limparCamposCNES = function () { window.__asideBus?.emit('cnesDataCleared'); };
  window.preencherCNES = function (cnes, btn) { if (window.searchCNES) window.searchCNES(cnes, btn); };

  // =========================================
  // INIT
  // =========================================

  renderHotstringsList();
  renderEditorTable();
})();
