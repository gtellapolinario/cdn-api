// aside_cnes_search.js (REFATORADO)
// Dependências: aside_event_bus.js, aside_registry.js
(() => {
  'use strict';

  const CONFIG = {
    apiUrl: 'https://cnes-gtmedic.replit.app',
    defaultCnes: '2189909',
    toastDuration: 2500,
  };

  /** @type {AsideEventBus} */
  let bus;
  /** @type {AbortController|null} */
  let abortController = null;

  // =========================================
  // RENDER
  // =========================================

  function render() {
    const container = document.getElementById('aside_cnes_search');
    if (!container) return;

    bus = window.__asideBus;
    abortController?.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    container.innerHTML = `
      <div class="rounded-2xl shadow-lg border border-slate-50 bg-white p-4 m-2 max-w-[340px] mb-4 relative z-10 print:hidden">
        <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">business</span>
          Buscar Dados do CNES
        </h3>

        <div class="flex flex-col  gap-4 text-sm mt-8">
          <div class="flex justify-center items-center gap-8 flex-wrap ">
            <input 
              type="text"
              id="busca-cnes"
              placeholder="CNES 7dig."
              maxlength="7"
              inputmode="numeric"
              class="w-full max-w-[100px] shadow-lg px-3 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none" />
            <button
              id="btn-buscar-cnes"
              class="w-full max-w-[100px] max-h-[44px] font-medium h-[44px] inline-flex shadow-xl items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
              <span class="material-symbols-outlined text-sm">search</span>
              Buscar
            </button>
          </div>

          <div class="flex justify-center items-center gap-8  flex-wrap">
            <button
              id="btn-limpar-cnes"
              class="inline-flex w-full max-w-[100px] max-h-[44px] h-[44px] font-medium shadow-lg items-center gap-2 px-3 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-300 text-sm transition-colors">
              <i class="fa-solid fa-trash text-sm"></i>
              Limpar
            </button>
            <button
              id="btn-padrao-cnes"
              class="inline-flex w-full max-w-[100px] max-h-[44px] h-[44px] shadow-lg items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-green-600 text-sm transition-colors">
              <i class="fa-solid fa-bolt text-sm"></i>
              Padrão
            </button>
          </div>

          <p class="text-xs text-gray-500">
            💡 Os dados serão preenchidos automaticamente nos campos da receita
          </p>
        </div>
      </div>
    `;

    bindEvents(signal);
    registerComponent();
  }

  // =========================================
  // EVENTS
  // =========================================

  function bindEvents(signal) {
    const input = document.getElementById('busca-cnes');
    const btnBuscar = document.getElementById('btn-buscar-cnes');
    const btnLimpar = document.getElementById('btn-limpar-cnes');
    const btnPadrao = document.getElementById('btn-padrao-cnes');

    input?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    }, { signal });

    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnBuscar?.click();
      }
    }, { signal });

    btnBuscar?.addEventListener('click', () => {
      const cnes = input?.value.trim();
      if (validateCNES(cnes)) searchCNES(cnes, btnBuscar);
    }, { signal });

    btnLimpar?.addEventListener('click', () => {
      if (input) input.value = '';
      bus?.emit('cnesDataCleared');
      showNotification('Dados do CNES limpos', 'info');
    }, { signal });

    btnPadrao?.addEventListener('click', () => {
      if (input) input.value = CONFIG.defaultCnes;
      searchCNES(CONFIG.defaultCnes, btnPadrao);
    }, { signal });
  }

  // =========================================
  // VALIDAÇÃO
  // =========================================

  function validateCNES(cnes) {
    if (!cnes) {
      showNotification('Digite um código CNES', 'warning');
      return false;
    }
    if (cnes.length !== 7) {
      showNotification('CNES deve ter exatamente 7 dígitos', 'warning');
      return false;
    }
    return true;
  }

  // =========================================
  // BUSCA
  // =========================================

  async function searchCNES(cnes, button = null) {
    const loadingState = setButtonLoading(button, true);

    try {
      const response = await fetch(`${CONFIG.apiUrl}/cnes/${cnes}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController?.signal,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      const apiData = await response.json();
      const transformed = transformCNESData(apiData, cnes);

      bus?.emit('cnesDataLoaded', transformed);
      showNotification('Dados carregados com sucesso!', 'success');
    } catch (error) {
      if (error.name === 'AbortError') return; // Componente destruído, ignora

      console.error('[CNES] Fetch error:', error);
      const msg = error.message || 'Erro ao buscar CNES';
      showNotification(msg, 'error');
      bus?.emit('cnesError', { cnes, error: msg });
    } finally {
      setButtonLoading(button, false, loadingState);
    }
  }

  // =========================================
  // TRANSFORM
  // =========================================

  function transformCNESData(apiData, cnes) {
    return {
      cnes,
      nome: apiData.nome_fantasia || apiData.nome_empresarial || '',
      telefone: formatPhone(apiData.telefone || ''),
      municipio: apiData.municipio?.nome || '',
      uf: apiData.uf || '',
      endereco: apiData.endereco_estabelecimento || '',
      local1: apiData.local1 || `PREFEITURA DE ${(apiData.municipio?.nome || '').toUpperCase()}`,
      local2: apiData.local2 || 'SECRETARIA MUNICIPAL DE SAÚDE',
      local3: apiData.local3 || (apiData.nome_fantasia || '').toUpperCase(),
    };
  }

  function formatPhone(phone) {
    const d = phone.replace(/\D/g, '');
    if (d.length === 10) return d.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    if (d.length === 11) return d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    return phone;
  }

  // =========================================
  // UI HELPERS
  // =========================================

  function setButtonLoading(button, isLoading, previousHTML = null) {
    if (!button) return null;

    if (isLoading) {
      const original = button.innerHTML;
      button.disabled = true;
      button.innerHTML = `
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Buscando...</span>
      `;
      return original;
    }

    button.disabled = false;
    if (previousHTML) button.innerHTML = previousHTML;
    return null;
  }

  function showNotification(message, type = 'info') {
    if (typeof Swal !== 'undefined') {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: CONFIG.toastDuration,
        timerProgressBar: true,
        width: '300px',
      }).fire({
        icon: type,
        title: message,
      });
      return;
    }

    // Fallback nativo
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
    };

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `fixed bottom-6 right-6 ${colors[type] || colors.info} text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-opacity duration-300`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, CONFIG.toastDuration);
  }

  // =========================================
  // REGISTRO & LIFECYCLE
  // =========================================

  function registerComponent() {
    window.__asideRegistry?.register('cnes-search', {
      render,
      search: searchCNES,
      destroy,
    });
  }

  function destroy() {
    abortController?.abort();
    abortController = null;
    const container = document.getElementById('aside_cnes_search');
    if (container) container.innerHTML = '';
    console.log('[CNES] Destroyed');
  }

  // NÃO auto-executa: container #aside_cnes_search é criado por apoiomed_aside.js
  // que chamará window.renderCNESSearch() após criar o DOM.
  window.renderCNESSearch = render;
  window.searchCNES = searchCNES;
})();