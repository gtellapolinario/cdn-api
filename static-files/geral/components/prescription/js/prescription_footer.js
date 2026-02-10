// prescription_footer.js (REFATORADO)
// Dependências: aside_event_bus.js, aside_registry.js
(() => {
  'use strict';

  /** @type {AbortController|null} */
  let abortController = null;

  // =========================================
  // RENDER
  // =========================================

  function render() {
    const container = document.getElementById('prescription_footer');
    if (!container) {
      console.warn('[Footer] Container #prescription_footer not found');
      return;
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    container.innerHTML = `
      <div class="mt-2 text-[12px]">
        <div id="rowMedico" class="grid grid-cols-1 sm:grid-cols-12 print:grid-cols-12 gap-1 sm:gap-2 print:gap-1">
          <label class="sm:col-span-7 print:col-span-7 gap-2 rounded-md bg-slate-50 flex items-center px-1 py-1">
            <div class="text-[10px] font-bold tracking-wide whitespace-nowrap">MÉDICO(A):</div>
            <input id="medico" name="medico" type="text" placeholder="Nome"
              class="w-full rounded-md border border-slate-100 bg-white px-2 py-1 h-7 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400" />
          </label>
          <div class="grid grid-cols-2 gap-1 sm:contents print:contents">
            <label class="sm:col-span-3 print:col-span-3 rounded-md bg-slate-50 px-1 py-1 flex items-center gap-2">
              <div class="text-[10px] font-bold text-shadow-rs tracking-wide whitespace-nowrap">CRM:</div>
              <input id="crm" name="crm" type="text" placeholder="000000"
                class="w-full rounded-md border border-slate-100 bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400" />
            </label>
            <div id="ufContainer"
              class="sm:col-span-2 print:col-span-2 rounded-md bg-slate-50 px-1 py-1 flex items-center justify-center">
            </div>
          </div>
        </div>

        <div id="rowLocal" class="grid grid-cols-1 sm:grid-cols-12 print:grid-cols-12 gap-1 sm:gap-2 print:gap-1">
          <label class="sm:col-span-7 print:col-span-7 rounded-md bg-slate-50 px-1 py-1 flex items-center gap-1 print:bg-transparent">
            <div class="text-[10px] font-bold text-shadow-rs tracking-wide whitespace-nowrap">LOCAL:</div>
            <input id="local" name="local" type="text" placeholder="Clínica / UBS / Consultório"
              class="w-full tracking-wide rounded-md border border-slate-50 bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400 print:border-0 print:bg-transparent" />
          </label>
          <div class="grid grid-cols-2 gap-1 sm:contents print:contents">
            <label class="sm:col-span-2 print:col-span-2 rounded-md bg-slate-50 px-1 py-1 flex items-center gap-1 print:bg-transparent">
              <div class="text-[10px] font-bold text-shadow-rs tracking-wide whitespace-nowrap">CNES:</div>
              <input id="cnes" name="cnes" type="text" placeholder="—"
                class="w-full rounded-md border border-slate-50 tracking-wide bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400 print:border-0 print:bg-transparent" />
            </label>
            <label class="sm:col-span-3 print:col-span-3 rounded-md bg-slate-50 px-1 py-1 flex items-center gap-1 print:bg-transparent">
              <div class="text-[10px] font-bold tracking-wide whitespace-nowrap">FONE:</div>
              <input id="telefone" name="telefone" type="text" placeholder="(00) 00000-0000"
                class="w-full rounded-md border border-slate-50 tracking-wide bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400 print:border-0 print:bg-transparent" />
            </label>
          </div>
        </div>
      </div>

      <div class="mt-5 grid grid-cols-1 sm:grid-cols-12 print:grid-cols-12 gap-1 sm:gap-2 print:gap-1">
        <label class="sm:col-span-4 print:col-span-4 rounded-md bg-slate-50 px-1 py-1 flex items-center gap-1">
          <div class="text-[10px] font-bold text-shadow-rs tracking-wide whitespace-nowrap">DATA:</div>
          <input id="data" name="data" type="date"
            class="w-full rounded-md border border-slate-50 bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400 print:border-0 print:bg-transparent print:outline-0 print:shadow-none print:appearance-none" />
        </label>
        <div class="hidden sm:block print:block w-full sm:col-span-8 print:col-span-8 border-b border-slate-500"></div>
      </div>

      <div class="flex justify-center items-end mt-4 sm:mt-0 print:mt-0">
        <div class="text-[10px] sm:ml-48 print:ml-48 font-bold text-shadow-rs tracking-wide whitespace-nowrap">
          ASSINATURA MÉDICO(A)</div>
      </div>
    `;

    // Renderiza select de UF no container
    if (window.UFsBrasilModule?.renderizarLabelUfSelect) {
      window.UFsBrasilModule.renderizarLabelUfSelect('ufContainer', {
        labelText: 'UF:',
        incluirVazio: true,
        placeholder: 'UF',
      });
    }

    bindEvents(signal);
    setTodayDate();
    registerComponent();
  }

  // =========================================
  // EVENTS
  // =========================================

  function bindEvents(signal) {
    // Máscara telefone
    document.getElementById('telefone')?.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length <= 11) {
        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
        v = v.replace(/(\d)(\d{4})$/, '$1-$2');
      }
      e.target.value = v;
    }, { signal });

    // CRM — apenas números
    document.getElementById('crm')?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    }, { signal });

    // CNES — apenas números, max 7
    document.getElementById('cnes')?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 7);
    }, { signal });
  }

  // =========================================
  // UTILS
  // =========================================

  function setTodayDate() {
    const input = document.getElementById('data');
    if (input && !input.value) {
      input.value = new Date().toISOString().split('T')[0];
    }
  }

  // =========================================
  // API PÚBLICA
  // =========================================

  function getData() {
    return {
      medico: document.getElementById('medico')?.value || '',
      crm: document.getElementById('crm')?.value || '',
      uf: document.getElementById('crmUf')?.value || '',
      local: document.getElementById('local')?.value || '',
      cnes: document.getElementById('cnes')?.value || '',
      telefone: document.getElementById('telefone')?.value || '',
      data: document.getElementById('data')?.value || '',
    };
  }

  function setData(data) {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
    if (data.medico) set('medico', data.medico);
    if (data.crm) set('crm', data.crm);
    if (data.uf) setUF(data.uf);
    if (data.local) set('local', data.local);
    if (data.cnes) set('cnes', data.cnes);
    if (data.telefone) set('telefone', data.telefone);
    if (data.data) set('data', data.data);
  }

  function setUF(uf) {
    const el = document.getElementById('crmUf');
    if (el) el.value = uf.toUpperCase();
  }

  function clear() {
    ['medico', 'crm', 'local', 'cnes', 'telefone'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const ufEl = document.getElementById('crmUf');
    if (ufEl) ufEl.value = '';
    setTodayDate();
  }

  // =========================================
  // REGISTRO & LIFECYCLE
  // =========================================

  function registerComponent() {
    window.__asideRegistry?.register('prescription-footer', {
      render,
      destroy,
      getData,
      setData,
      setUF,
      clear,
    });
  }

  function destroy() {
    abortController?.abort();
    abortController = null;
    const container = document.getElementById('prescription_footer');
    if (container) container.innerHTML = '';
  }

  // Backward compat
  window.renderPrescriptionFooter = render;
  window.getDoctorData = getData;
  window.setDoctorData = setData;
  window.clearFooterData = clear;
  window.setUF = setUF;
})();
