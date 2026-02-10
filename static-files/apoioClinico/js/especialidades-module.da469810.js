// especialidades-module.js
(() => {
	'use strict';

	// =========================
	// Utilitários
	// =========================
	const $ = (id) => document.getElementById(id);

	const on = (el, event, handler, options) => {
		if (!el) return;
		el.addEventListener(event, handler, options);
	};

	function parseSpecFromURL() {
		// suporta ?spec=psiquiatria e #spec=psiquiatria e #psiquiatria
		try {
			const url = new URL(window.location.href);
			const q = url.searchParams.get('spec');
			if (q) return q.trim().toLowerCase();

			const hash = (url.hash || '').replace(/^#/, '');
			if (!hash) return null;

			// #spec=xxx
			if (hash.startsWith('spec=')) return hash.slice(5).trim().toLowerCase();

			// #xxx
			return hash.trim().toLowerCase();
		} catch {
			return null;
		}
	}

	// =========================
	// Dados
	// =========================
	const SPECIALTIES = [
		{ key: 'pediatria', name: 'Pediatria', file: 'static/ped.html', description: 'Calculadora de doses e protocolos pediátricos.' },
		{ key: 'clinica', name: 'Clínica Médica', file: 'static/clinica.html', description: 'Protocolos de HAS, DM e patologias comuns.' },
		{ key: 'gineco', name: 'Ginecologia', file: 'static/gineco.html', description: 'Saúde da mulher, gestante e infecções.' },
		{ key: 'psiquiatria', name: 'Psiquiatria', file: 'static/psiquiatria.html', description: 'Manejo de transtornos mentais comuns.' },
		{ key: 'emergencia', name: 'Emergência', file: 'static/emergencia.html', description: 'Protocolos de urgência e emergência.' },
		{ key: 'hotstrings', name: '⚡ Hotstrings', file: 'hotstrings.html', description: 'Busca rápida de prescrições e condutas.' },
	];

	// =========================
	// Estado
	// =========================
	let currentFile = null;

	// =========================
	// Lookup
	// =========================
	function getByKey(key) {
		const k = String(key || '')
			.trim()
			.toLowerCase();
		return SPECIALTIES.find((s) => s.key === k) || null;
	}

	function getByFile(file) {
		const f = String(file || '').trim();
		return SPECIALTIES.find((s) => s.file === f) || null;
	}

	// =========================
	// UI helpers
	// =========================
	function setActiveTab(file) {
		document.querySelectorAll('.specialty-tab').forEach((btn) => {
			const isActive = btn.getAttribute('data-file') === file;

			btn.classList.toggle('text-sky-600', isActive);
			btn.classList.toggle('font-bold', isActive);
			btn.classList.toggle('text-[#5f6775]', !isActive);
		});
	}

	function load(file, { pushState = true } = {}) {
		const iframe = $('contentFrame');
		if (!iframe) {
			console.warn('Iframe #contentFrame não encontrado');
			return;
		}

		const f = String(file || '').trim();
		if (!f) return;

		// idempotência: não recarrega se já está igual
		if (currentFile === f && iframe.getAttribute('src') === f) {
			setActiveTab(f);
			return;
		}

		currentFile = f;
		iframe.src = f;
		setActiveTab(f);

		// opcional: atualiza URL (hash) para deep-link
		if (pushState) {
			const spec = getByFile(f);
			if (spec) {
				// não "quebra" histórico: hash simples
				window.history.replaceState(null, '', `#spec=${encodeURIComponent(spec.key)}`);
			}
		}
	}

	function renderTabs() {
		const container = $('specialtyTabs');
		if (!container) {
			console.warn('Container #specialtyTabs não encontrado');
			return;
		}

		// evita duplicar binds e render em re-init
		container.innerHTML = SPECIALTIES.map((spec) => {
			return `
        <button 
          type="button"
          data-file="${spec.file}"
          data-key="${spec.key}"
          class="specialty-tab inline-flex items-center gap-2 rounded-2xl bg-[#e0e5ec] px-4 py-2 text-sm font-semibold text-[#5f6775]
                 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] transition-all duration-300
                 hover:text-sky-600 hover:shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff]
                 active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff]">
          ${spec.name}
        </button>
      `;
		}).join('');

		// event delegation (1 handler só)
		if (container.dataset.bound !== '1') {
			container.dataset.bound = '1';
			on(container, 'click', (e) => {
				const btn = e.target.closest('button.specialty-tab');
				if (!btn) return;
				const file = btn.getAttribute('data-file');
				load(file);
			});
		}
	}

	function resolveInitialSpecialty() {
		const fromURL = parseSpecFromURL();
		if (fromURL) {
			const byKey = getByKey(fromURL);
			if (byKey) return byKey.file;
		}
		return SPECIALTIES[0]?.file || null;
	}

	// =========================
	// Init (idempotente)
	// =========================
	function init() {
		// evita reinicializar à toa
		if (window.EspecialidadesModule?._initialized) return;

		renderTabs();

		const initial = resolveInitialSpecialty();
		if (initial) load(initial, { pushState: false });

		// responde a mudança de hash (SPA / deep-link)
		window.addEventListener('hashchange', () => {
			const k = parseSpecFromURL();
			if (!k) return;
			const spec = getByKey(k);
			if (spec) load(spec.file, { pushState: false });
		});

		window.EspecialidadesModule._initialized = true;
	}

	// =========================
	// API global
	// =========================
	window.EspecialidadesModule = {
		init,
		load,
		render: renderTabs,
		getByKey,
		getByFile,
		specialties: SPECIALTIES,
		_initialized: false,
	};

	// compat (legado)
	window.loadSpecialty = load;

	// auto-init
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init, { once: true });
	} else {
		init();
	}
})();
