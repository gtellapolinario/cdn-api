// apoiomed_aside.js — Orquestrador (REFATORADO)
// Dependências: aside_event_bus.js, aside_registry.js (carregar antes)
(() => {
	'use strict';

	const REQUIRED_COMPONENTS = ['cnes-search', 'ubs-selector', 'formatting-tools', 'hotstrings-panel'];

	const KEYBOARD_SHORTCUTS = [
		{ keys: { ctrl: true, shift: true, key: 'C' }, target: 'busca-cnes', label: 'Buscar CNES' },
		{ keys: { ctrl: true, shift: true, key: 'U' }, target: 'select-unidade', label: 'Abrir UBS' },
		{ keys: { ctrl: true, shift: true, key: 'H' }, target: 'hotstrings-search', label: 'Buscar Hotstring' },
	];

	/** @type {AsideEventBus} */
	let bus;
	/** @type {AsideRegistry} */
	let registry;
	/** @type {AbortController|null} */
	let abortController = null;
	let isRendered = false;

	// =========================================
	// RENDER
	// =========================================

	function renderAside() {
		if (isRendered) return;

		const container = document.getElementById('apoiomed_aside');
		if (!container) {
			console.warn('[Aside] Container #apoiomed_aside not found');
			return;
		}

		bus = window.__asideBus;
		registry = window.__asideRegistry;

		if (!bus || !registry) {
			console.error('[Aside] EventBus or Registry not found. Load dependencies first.');
			return;
		}

		container.className = 'flex flex-col print:hidden';
		container.innerHTML = `
      <div id="aside_cnes_search"></div>
      <div id="aside_ubs_selector"></div>
      <div id="aside_formatting_tools"></div>
      <div id="aside_hotstrings_panel"></div>
    `;

		isRendered = true;
		abortController = new AbortController();

		registry.setRequired(REQUIRED_COMPONENTS);

		// ✅ Chama render de cada componente AGORA que os containers existem.
		// Os scripts já carregaram e registraram window.renderXXX,
		// mas falharam no auto-bootstrap porque os containers não existiam.
		if (window.renderCNESSearch) window.renderCNESSearch();
		if (window.renderUBSSelector) window.renderUBSSelector();
		if (window.renderFormattingTools) window.renderFormattingTools();
		if (window.renderHotstringsPanel) window.renderHotstringsPanel();

		setupCommunication();
		setupKeyboardShortcuts();
		setupPersistence();

		// Aguarda componentes e finaliza
		registry.waitForAll(10000).then(({ ready, missing }) => {
			if (missing.length) {
				console.warn(`[Aside] Initialized with missing: ${missing.join(', ')}`);
			}
			console.log(`[Aside] ✅ Ready (${ready.length}/${REQUIRED_COMPONENTS.length} components)`);
			bus.emit('asideReady');
		});
	}

	// =========================================
	// COMUNICAÇÃO ENTRE COMPONENTES
	// =========================================

	function setupCommunication() {
		// CNES carregado → propaga para header/footer
		bus.on('cnesDataLoaded', (data) => {
			window.setInstitutionData?.(data.local1 || `PREFEITURA DE ${data.municipio.toUpperCase()}`, data.local2 || 'SECRETARIA MUNICIPAL DE SAÚDE', data.local3 || data.nome.toUpperCase());

			window.setDoctorData?.({
				local: [data.nome, data.endereco, data.municipio, data.uf].filter(Boolean).join(' - '),
				cnes: data.cnes,
				telefone: data.telefone,
			});

			window.setUF?.(data.uf);
		});

		// CNES limpo → limpa header/footer
		bus.on('cnesDataCleared', () => {
			window.clearHeaderData?.();
			window.clearFooterData?.();
		});

		// UBS selecionada → busca CNES automaticamente
		bus.on('ubsSelected', ({ cnes }) => {
			const input = document.getElementById('busca-cnes');
			if (input) input.value = cnes;

			const cnesApi = registry.get('cnes-search');
			cnesApi?.search?.(cnes);
		});

		// Hotstring clicada → insere no editor
		bus.on('hotstringClicked', ({ code }) => {
			window.insertAtCursor?.(code);
		});

		// Editor bloqueado → desabilita formatação
		bus.on('editorBlockedStateChanged', ({ isBlocked }) => {
			setFormattingEnabled(!isBlocked);
		});

		// Formatação aplicada → foca editor
		bus.on('formattingApplied', () => {
			document.getElementById('textArea')?.focus();
		});
	}

	// =========================================
	// FORMATAÇÃO — ENABLE/DISABLE
	// =========================================

	function setFormattingEnabled(enabled) {
		const buttons = document.querySelectorAll('#aside_formatting_tools button[data-cmd]');
		buttons.forEach((btn) => {
			btn.disabled = !enabled;
			btn.classList.toggle('opacity-50', !enabled);
			btn.classList.toggle('cursor-not-allowed', !enabled);
			if (!enabled) btn.title = 'Limite de página atingido';
		});
	}

	// =========================================
	// ATALHOS DE TECLADO
	// =========================================

	function setupKeyboardShortcuts() {
		const signal = abortController?.signal;

		document.addEventListener(
			'keydown',
			(e) => {
				for (const shortcut of KEYBOARD_SHORTCUTS) {
					const { keys, target } = shortcut;
					const ctrlOrMeta = e.ctrlKey || e.metaKey;

					if (ctrlOrMeta && e.shiftKey && e.key === keys.key) {
						e.preventDefault();
						const el = document.getElementById(target);
						if (el) {
							el.focus();
							if ('select' in el) el.select();
						}
						return;
					}
				}
			},
			{ signal },
		);
	}

	// =========================================
	// PERSISTÊNCIA
	// =========================================

	function setupPersistence() {
		bus.on('cnesDataLoaded', (data) => {
			try {
				localStorage.setItem('apoiomed_lastCNES', data.cnes);
				localStorage.setItem('apoiomed_lastCNESData', JSON.stringify(data));
			} catch {
				// quota exceeded ou private browsing — silencia
			}
		});

		// Restaura último CNES (aguarda componente estar pronto)
		bus.once('asideReady', () => {
			const lastCNES = localStorage.getItem('apoiomed_lastCNES');
			if (lastCNES) {
				const input = document.getElementById('busca-cnes');
				if (input) {
					input.value = lastCNES;
					input.placeholder = `Último: ${lastCNES}`;
				}
			}
		});
	}

	// =========================================
	// API PÚBLICA
	// =========================================

	function clearAside() {
		const input = document.getElementById('busca-cnes');
		if (input) input.value = '';

		const ubsSelect = document.getElementById('select-unidade');
		if (ubsSelect) ubsSelect.value = '';

		const hotstringSearch = document.getElementById('hotstrings-search');
		if (hotstringSearch) {
			hotstringSearch.value = '';
			hotstringSearch.dispatchEvent(new Event('input'));
		}

		bus.emit('cnesDataCleared');
	}

	function showAsideLoading(show) {
		const container = document.getElementById('apoiomed_aside');
		if (!container) return;
		container.style.opacity = show ? '0.5' : '1';
		container.style.pointerEvents = show ? 'none' : 'auto';
	}

	function destroyAside() {
		abortController?.abort();
		abortController = null;
		bus?.destroy();
		registry?.destroyAll();
		isRendered = false;

		const container = document.getElementById('apoiomed_aside');
		if (container) container.innerHTML = '';

		console.log('[Aside] 🗑️ Destroyed');
	}

	// =========================================
	// BOOTSTRAP
	// =========================================

	function bootstrap() {
		renderAside();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', bootstrap);
	} else {
		bootstrap();
	}

	// Exporta API mínima
	window.renderAside = renderAside;
	window.clearAside = clearAside;
	window.destroyAside = destroyAside;
	window.showAsideLoading = showAsideLoading;
})();
