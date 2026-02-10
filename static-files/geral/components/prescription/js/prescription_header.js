// prescription_header.js (REFATORADO)
// Dependências: aside_event_bus.js, aside_registry.js
(() => {
	'use strict';

	/** @type {AbortController|null} */
	let abortController = null;

	// =========================================
	// RENDER
	// =========================================

	function render() {
		const container = document.getElementById('prescription_header');
		if (!container) {
			console.warn('[Header] Container #prescription_header not found');
			return;
		}

		abortController = new AbortController();
		const signal = abortController.signal;

		container.innerHTML = `
      <div class="mt-2 grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-2">
        <div class="md:col-span-4 print:col-span-4 rounded-md bg-slate-50 px-3 py-2 flex items-center gap-2">
          <img id="logoSus" src="https://static.cdnlogo.com/logos/s/74/sus-brasil.svg" alt="Logo SUS"
            class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 print:w-28 md:h-28 print:h-28 object-contain" />
          <div id="textoViaDigital" class="hidden text-center text-[11px] font-bold text-shadow-rs tracking-wide">
            VIA<br />DIGITAL
          </div>
        </div>

        <div class="md:col-span-8 print:col-span-8 rounded-md bg-slate-50 px-2 py-1 flex flex-col gap-2">
          <input id="local1" name="local1" type="text" placeholder="PREFEITURA DE ..."
            class="w-full h-8 rounded-md border border-slate-50 bg-white px-2 text-xs sm:text-sm print:text-sm font-semibold text-center uppercase outline-none focus:ring-2 focus:ring-slate-400 print:placeholder:text-transparent" />
          <input id="local2" name="local2" type="text" placeholder="SECRETARIA DE SAÚDE DE ..."
            class="w-full h-8 rounded-md border border-slate-50 bg-white px-2 text-xs sm:text-sm print:text-sm font-semibold text-center uppercase outline-none focus:ring-2 focus:ring-slate-400 print:placeholder:text-transparent" />
          <input id="local3" name="local3" type="text" placeholder="UBS ..."
            class="w-full h-8 rounded-md border border-slate-50 bg-white px-2 text-xs sm:text-sm print:text-sm font-semibold text-center uppercase outline-none focus:ring-2 focus:ring-slate-400 print:placeholder:text-transparent" />
        </div>
      </div>

      <label id="REC" type="text"
        class="flex items-center justify-center w-full h-10 rounded-md border border-slate-50 bg-slate-200 px-2 text-base sm:text-lg print:text-lg font-semibold text-center mt-2">
        RECEITA MÉDICA
      </label>

      <div class="mt-2 grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-2">
        <label class="md:col-span-8 print:col-span-8 rounded-md bg-slate-50 px-2 sm:px-3 print:px-3 py-2 flex flex-col sm:flex-row print:flex-row items-start sm:items-center print:items-center gap-1 sm:gap-2 print:gap-2">
          <div class="text-[10px] font-bold tracking-wide whitespace-nowrap">PACIENTE:</div>
          <input id="paciente" name="paciente" type="text" placeholder="Nome completo"
            class="w-full rounded-md border border-slate-50 bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400" />
        </label>
        <label class="md:col-span-4 print:col-span-4 rounded-md bg-slate-50 px-2 py-1 flex flex-col sm:flex-row print:flex-row items-start sm:items-center print:items-center gap-1 sm:gap-2 print:gap-2 print:bg-transparent">
          <div class="text-[11px] font-bold text-shadow-rs tracking-wide whitespace-nowrap">DT. NASC.:</div>
          <input id="nascimento" name="nascimento" type="date"
            class="w-full rounded-md border border-slate-100 bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400 print:border-0 print:bg-transparent print:text-[11px]" />
        </label>
      </div>
    `;

		bindEvents(signal);
		registerComponent();
	}

	// =========================================
	// EVENTS
	// =========================================

	function bindEvents(signal) {
		// Uppercase nos inputs de instituição
		['local1', 'local2', 'local3'].forEach((id) => {
			const input = document.getElementById(id);
			input?.addEventListener(
				'input',
				(e) => {
					const pos = e.target.selectionStart;
					e.target.value = e.target.value.toUpperCase();
					e.target.setSelectionRange(pos, pos);
				},
				{ signal },
			);
		});

		// Title Case no nome do paciente (on blur)
		const paciente = document.getElementById('paciente');
		paciente?.addEventListener(
			'blur',
			(e) => {
				e.target.value = toTitleCase(e.target.value);
			},
			{ signal },
		);
	}

	// =========================================
	// UTILS
	// =========================================

	function toTitleCase(str) {
		return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
	}

	// =========================================
	// API PÚBLICA
	// =========================================

	function getData() {
		return {
			local1: document.getElementById('local1')?.value || '',
			local2: document.getElementById('local2')?.value || '',
			local3: document.getElementById('local3')?.value || '',
			titulo: document.getElementById('REC')?.textContent || 'RECEITA MÉDICA',
			paciente: document.getElementById('paciente')?.value || '',
			nascimento: document.getElementById('nascimento')?.value || '',
		};
	}

	function setData(data) {
		const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
		if (data.local1) set('local1', data.local1.toUpperCase());
		if (data.local2) set('local2', data.local2.toUpperCase());
		if (data.local3) set('local3', data.local3.toUpperCase());
		if (data.titulo) { const el = document.getElementById('REC'); if (el) el.textContent = data.titulo; }
		if (data.paciente) set('paciente', data.paciente);
		if (data.nascimento) set('nascimento', data.nascimento);
	}

	function setInstitution(prefeitura, secretaria, ubs) {
		const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
		if (prefeitura) set('local1', prefeitura.toUpperCase());
		if (secretaria) set('local2', secretaria.toUpperCase());
		if (ubs) set('local3', ubs.toUpperCase());
	}

	function setPatient(nome, dataNascimento) {
		const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
		if (nome) set('paciente', nome);
		if (dataNascimento) set('nascimento', dataNascimento);
	}

	function setTitle(titulo) {
		const el = document.getElementById('REC');
		if (el) el.textContent = titulo.toUpperCase();
	}

	function toggleSusLogo(visible) {
		const logo = document.getElementById('logoSus');
		const texto = document.getElementById('textoViaDigital');
		if (logo) logo.classList.toggle('hidden', !visible);
		if (texto) texto.classList.toggle('hidden', visible);
	}

	function clear() {
		['local1', 'local2', 'local3', 'paciente', 'nascimento'].forEach((id) => {
			const el = document.getElementById(id);
			if (el) el.value = '';
		});
		const recEl = document.getElementById('REC');
		if (recEl) recEl.textContent = 'RECEITA MÉDICA';
		toggleSusLogo(true);
	}

	function getPatientAge() {
		const val = document.getElementById('nascimento')?.value;
		if (!val) return null;
		const today = new Date();
		const birth = new Date(val);
		let age = today.getFullYear() - birth.getFullYear();
		const m = today.getMonth() - birth.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
		return age;
	}

	// =========================================
	// REGISTRO & LIFECYCLE
	// =========================================

	function registerComponent() {
		window.__asideRegistry?.register('prescription-header', {
			render,
			destroy,
			getData,
			setData,
			setInstitution,
			setPatient,
			setTitle,
			toggleSusLogo,
			clear,
			getPatientAge,
		});
	}

	function destroy() {
		abortController?.abort();
		abortController = null;
		const container = document.getElementById('prescription_header');
		if (container) container.innerHTML = '';
	}

	// Backward compat — orquestrador antigo e aside chamam essas globals
	window.renderPrescriptionHeader = render;
	window.getHeaderData = getData;
	window.setHeaderData = setData;
	window.setInstitutionData = setInstitution;
	window.setPatientData = setPatient;
	window.setDocumentTitle = setTitle;
	window.toggleSusLogo = toggleSusLogo;
	window.clearHeaderData = clear;
	window.getPatientAge = getPatientAge;
})();
