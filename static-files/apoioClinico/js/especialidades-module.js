// especialidades-module.js
(() => {
	'use strict';

	// ============================================
	// UTILIT\u00C1RIOS
	// ============================================
	const $ = (id) => document.getElementById(id);

	// ============================================
	// DADOS DAS ESPECIALIDADES
	// ============================================
	const SPECIALTIES = [
		{
			key: 'pediatria',
			name: 'Pediatria',
			file: 'static/ped.html',
			description: 'Calculadora de doses e protocolos pedi\u00E1tricos.',
		},
		{
			key: 'clinica',
			name: 'Cl\u00EDnica M\u00E9dica',
			file: 'static/clinica.html',
			description: 'Protocolos de HAS, DM e patologias comuns.',
		},
		{
			key: 'gineco',
			name: 'Ginecologia',
			file: 'static/gineco.html',
			description: 'Sa\u00FAde da mulher, gestante e infec\u00E7\u00F5es.',
		},
		{
			key: 'psiquiatria',
			name: 'Psiquiatria',
			file: 'static/psiquiatria.html',
			description: 'Manejo de transtornos mentais comuns.',
		},
		{
			key: 'emergencia',
			name: 'Emerg\u00EAncia',
			file: 'static/emergencia.html',
			description: 'Protocolos de urg\u00EAncia e emerg\u00EAncia.',
		},
		{
			key: 'hotstrings',
			name: '\u26A1 Hotstrings',
			file: 'hotstrings.html',
			description: 'Busca r\u00E1pida de prescri\u00E7\u00F5es e condutas.',
		},
	];

	// ============================================
	// FUN\u00C7\u00D5ES PRINCIPAIS
	// ============================================

	function loadSpecialty(file) {
		const iframe = $('contentFrame');
		if (!iframe) {
			console.warn('Iframe #contentFrame n\u00E3o encontrado');
			return;
		}

		// Carrega o arquivo no iframe
		iframe.src = file;

		// Atualiza visual das tabs
		document.querySelectorAll('.specialty-tab').forEach((btn) => {
			if (btn.getAttribute('data-file') === file) {
				btn.classList.add('text-sky-600', 'font-bold');
				btn.classList.remove('text-[#5f6775]');
			} else {
				btn.classList.remove('text-sky-600', 'font-bold');
				btn.classList.add('text-[#5f6775]');
			}
		});
	}

	function renderTabs() {
		const container = $('specialtyTabs');
		if (!container) {
			console.warn('Container #specialtyTabs n\u00E3o encontrado');
			return;
		}

		container.innerHTML = SPECIALTIES.map((spec, index) => {
			const isFirst = index === 0;
			return `
        <button 
          data-file="${spec.file}"
          onclick="window.EspecialidadesModule.load('${spec.file}')"
          class="specialty-tab inline-flex items-center gap-2 rounded-2xl bg-[#e0e5ec] px-4 py-2 text-sm font-semibold ${
						isFirst ? 'text-sky-600 font-bold' : 'text-[#5f6775]'
					} shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] transition-all duration-300 hover:text-sky-600 hover:shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff]">
          ${spec.name}
        </button>
      `;
		}).join('');

		// Carrega a primeira especialidade por padr\u00E3o
		if (SPECIALTIES.length > 0) {
			loadSpecialty(SPECIALTIES[0].file);
		}
	}

	function getSpecialtyByKey(key) {
		return SPECIALTIES.find((s) => s.key === key) || null;
	}

	function getSpecialtyByFile(file) {
		return SPECIALTIES.find((s) => s.file === file) || null;
	}

	// ============================================
	// INICIALIZA\u00C7\u00C3O
	// ============================================
	function init() {
		renderTabs();
	}

	// ============================================
	// EXP\u00D5E API GLOBAL
	// ============================================
	window.EspecialidadesModule = {
		init: init,
		load: loadSpecialty,
		render: renderTabs,
		getByKey: getSpecialtyByKey,
		getByFile: getSpecialtyByFile,
		specialties: SPECIALTIES,
	};

	// Mant\u00E9m compatibilidade com c\u00F3digo antigo
	window.loadSpecialty = loadSpecialty;

	// ============================================
	// AUTO-INIT
	// ============================================
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
