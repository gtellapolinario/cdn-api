//@ts-nocheck
// tab_guias.js — Aba Guias SUS
// Padrão: main + aside (igual Exames), com botões Limpar/Imprimir e ações individuais por guia
(() => {
	'use strict';

	const GUIAS_CDN = 'https://cdn.gtmedics.com/geral/js';

	// Registry global para módulos das guias
	// window.GuiasModules = { lme: { clear(), loadSelects(btn), ... }, ... }
	window.GuiasModules = window.GuiasModules || {};

	const guiasTools = [
		{
			key: 'lme',
			name: 'LME',
			icon: 'lab_profile',
			script: 'guia_lme.js',
			containerId: 'guia_lme',
			renderFn: 'renderGuiaLme',
			description: 'Servico Auxiliar de Diagnostico e Terapia',
			actions: [{ action: 'loadSelects', label: 'CARREGAR SELECTS', icon: 'cloud_download' }],
		},
		{ key: 'consulta', name: 'Consulta', icon: 'stethoscope', script: 'guia_consulta.js', containerId: 'guia_consulta', renderFn: 'renderGuiaConsulta', description: 'Guia de Consulta', actions: [] },
		{ key: 'internacao', name: 'Internacao', icon: 'hotel', script: 'guia_internacao.js', containerId: 'guia_internacao', renderFn: 'renderGuiaInternacao', description: 'Guia de Internacao Hospitalar', actions: [] },
		{ key: 'sp_sadt', name: 'SP/SADT', icon: 'healing', script: 'guia_sp_sadt.js', containerId: 'guia_sp_sadt', renderFn: 'renderGuiaSpSadt', description: 'Solicitacao de Procedimento/SADT', actions: [] },
		{ key: 'resumo_internacao', name: 'Resumo Int.', icon: 'description', script: 'guia_resumo_internacao.js', containerId: 'guia_resumo_internacao', renderFn: 'renderGuiaResumoInt', description: 'Resumo de Internacao', actions: [] },
	];

	let loaderGuias = null;
	const loadedScripts = new Set();

	let activeKey = null;
	let activeTool = null;

	function renderGuiasTab() {
		const container = document.getElementById('tab_guias');
		if (!container) {
			console.error('[Guias] Container #tab_guias nao encontrado');
			return;
		}

		container.innerHTML = `
  <section id="tab-guias" class="tabPanel hidden">
    <div class="grid gap-4 lg:grid-cols-[1fr_260px]">

      <!-- MAIN -->
      <div class="w-full max-w-7xl">
        <div
          class="rounded-[20px] bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] transition-all duration-300 ring-1 ring-slate-200">

          <header class="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-slate-800">description</span>
                <h1 class="text-xl font-semibold tracking-tight text-[#2d3748]">Guias SUS</h1>
              </div>
            </div>

            <div class="px-6 pb-2">
              <div
                class="rounded-2xl bg-[#e0e5ec] p-4 text-sm text-slate-800 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined mt-0.5 text-amber-700">warning</span>
                  <div class="space-y-1">
                    <div class="font-semibold text-[#2d3748]">Material de apoio — Guias gerais de uso no SUS.</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div id="menu-guias" class="px-6 pb-4 flex flex-wrap gap-3 border-b border-slate-100"></div>

          
            <!-- Toolbar zoom -->
            <div
              class="flex items-center justify-self-end gap-2 p-4 rounded-3xl  bg-slate-300 w-fit shadow-2xl m-4 print:hidden">
              <button id="guiasZoomOut"
                class="px-3 py-1 shadow-xl rounded-2xl bg-slate-200 hover:bg-slate-400">−</button>
              <div id="guiasZoomLabel"
                class="!bg-white p-2 rounded-2xl shadow inset-shadow-lg text-sm font-semibold text-shadow-sm w-16 text-center">
                100%</div>
              <button id="guiasZoomIn"
                class="px-3 py-1 shadow-xl rounded-2xl bg-slate-200 hover:bg-slate-400">+</button>
              <button id="guiasZoomReset"
                class="px-3 py-1 shadow-xl rounded-2xl bg-slate-200 hover:bg-slate-400">Reset</button>
            </div>
            
						<div id="menu-guias" class="px-6 pb-4 flex flex-wrap gap-3 border-b border-slate-300"></div>
            
						<!-- Área do documento: cresce conforme conteúdo -->
            <div class="p-3">
              <!-- Este wrapper é o ALVO do zoom -->
              <div id="guiasZoomTarget" class="origin-top-center w-fit">
                <div id="guias-content" class="min-h-[400px]"></div>
              </div>
            </div>
        
        </div>
      </div>

      <!-- ASIDE -->
      <aside class="sidebar w-full max-w-60 flex flex-col p-6 rounded-xl shadow-xl bg-white print:hidden">
        <div class="button-group bg-gray-200 p-4 mb-5 rounded-xl shadow-xl">
          <button type="button"
            class="text-[12px] font-semibold w-full mb-2 p-2.5 bg-sky-600 text-white rounded-xl shadow-xl hover:bg-sky-700 transition-colors cursor-pointer"
            id="guias_clearBtn">LIMPAR GUIA</button>

          <button type="button"
            class="text-[12px] font-semibold w-full mb-2 p-2.5 bg-sky-600 text-white rounded-xl shadow-xl hover:bg-sky-700 transition-colors cursor-pointer"
            id="guias_printBtn">IMPRIMIR</button>

          <div class="mt-3 pt-3 border-t border-slate-300/60">
            <div class="text-[11px] font-semibold text-slate-700 mb-2">Ações desta guia</div>
            <div id="guias_extraActions" class="space-y-2"></div>
          </div>

          <div class="mt-3 text-[11px] text-slate-600">
            <span class="font-semibold">Ativa:</span> <span id="guias_activeName">—</span>
          </div>
        </div>
      </aside>

    </div>
  </section>
    `;

		initializeGuiasTab();
		setupGuiasZoom();
	}

	function initializeGuiasTab() {
		// CDNLoader para módulos (quando existirem)
		if (typeof CDNLoader !== 'undefined') {
			try {
				loaderGuias = new CDNLoader(GUIAS_CDN);
			} catch (e) {
				loaderGuias = null;
			}
		}

		renderGuiasMenu();
		bindAsideControls();

		switchGuia(guiasTools[0].key);
		console.log('[Guias] Aba renderizada e inicializada');
	}

	function renderGuiasMenu() {
		const menuContainer = document.getElementById('menu-guias');
		if (!menuContainer) return;

		menuContainer.innerHTML = guiasTools
			.map(
				(tool) => `
        <button data-guia-key="${tool.key}"
          class="guia-menu-btn inline-flex items-center gap-2 rounded-full bg-[#e0e5ec] px-4 py-2 text-sm font-semibold text-slate-700 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] border-none hover:text-[#007BFF] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all focus:outline-none"
          title="${tool.description}">
          <span class="material-symbols-outlined text-base">${tool.icon}</span>
          ${tool.name}
        </button>
      `,
			)
			.join('');

		menuContainer.addEventListener('click', (e) => {
			const btn = e.target.closest('[data-guia-key]');
			if (btn) switchGuia(btn.dataset.guiaKey);
		});
	}

	function bindAsideControls() {
		const btnClear = document.getElementById('guias_clearBtn');
		const btnPrint = document.getElementById('guias_printBtn');
		const extra = document.getElementById('guias_extraActions');

		if (btnClear) {
			btnClear.addEventListener('click', () => {
				const mod = getActiveModule();
				if (mod && typeof mod.clear === 'function') return mod.clear();
				genericClearActive();
			});
		}

		if (btnPrint) {
			btnPrint.addEventListener('click', () => {
				// print SEM mexer no seu CSS global:
				printOnlyActiveGuide();
			});
		}

		if (extra) {
			extra.addEventListener('click', async (e) => {
				const btn = e.target.closest('[data-action]');
				if (!btn) return;

				const action = btn.dataset.action;
				const mod = getActiveModule();

				if (!mod || typeof mod[action] !== 'function') {
					console.warn(`[Guias] Ação "${action}" não implementada para a guia ativa`);
					return;
				}

				await mod[action](btn);
			});
		}
	}

	function getActiveModule() {
		if (!activeKey) return null;
		return window.GuiasModules?.[activeKey] || null;
	}

	function setActiveLabel(tool) {
		const el = document.getElementById('guias_activeName');
		if (el) el.textContent = tool?.name || '—';
	}

	function renderExtraActions(tool) {
		const extra = document.getElementById('guias_extraActions');
		if (!extra) return;

		const actions = tool?.actions || [];
		if (!actions.length) {
			extra.innerHTML = `<div class="text-[11px] text-slate-500">Sem ações específicas.</div>`;
			return;
		}

		extra.innerHTML = actions
			.map((a) => {
				const icon = a.icon ? `<span class="material-symbols-outlined text-sm">${a.icon}</span>` : '';
				return `
          <button type="button"
            data-action="${a.action}"
            class="text-[12px] font-semibold w-full p-2.5 bg-slate-700 text-white rounded-xl shadow-xl hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-2">
            ${icon}${a.label}
          </button>
        `;
			})
			.join('');
	}

	async function switchGuia(key) {
		const tool = guiasTools.find((t) => t.key === key);
		if (!tool) return;

		activeKey = key;
		activeTool = tool;

		// highlight botão ativo
		document.querySelectorAll('.guia-menu-btn').forEach((btn) => {
			const isActive = btn.dataset.guiaKey === key;
			if (isActive) {
				btn.classList.add('text-[#007BFF]');
				btn.style.boxShadow = 'inset 4px 4px 8px #c1c9d2, inset -4px -4px 8px #ffffff';
			} else {
				btn.classList.remove('text-[#007BFF]');
				btn.style.boxShadow = '6px 6px 12px #c1c9d2, -6px -6px 12px #ffffff';
			}
		});

		setActiveLabel(tool);
		renderExtraActions(tool);

		// placeholder container
		const guiasContent = document.getElementById('guias-content');
		if (guiasContent) guiasContent.innerHTML = `<div id="${tool.containerId}"></div>`;

		// Se já carregou (bundle), usa direto
		if (window[tool.renderFn]) {
			window[tool.renderFn]();
			return;
		}

		// Lazy-load via CDNLoader
		if (loaderGuias && !loadedScripts.has(tool.script)) {
			try {
				await loaderGuias.load(tool.script);
				loadedScripts.add(tool.script);

				if (window[tool.renderFn]) {
					window[tool.renderFn]();
					return;
				}
			} catch (err) {
				console.warn('[Guias] Modulo ' + tool.script + ' ainda nao disponivel');
			}
		}

		showPlaceholder(tool);
	}

	function showPlaceholder(tool) {
		const container = document.getElementById(tool.containerId);
		if (!container) return;

		container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16 text-slate-500">
        <span class="material-symbols-outlined text-6xl mb-4 text-slate-300">construction</span>
        <h3 class="text-lg font-semibold text-[#2d3748] mb-2">${tool.name}</h3>
        <p class="text-sm text-slate-500">${tool.description}</p>
        <p class="text-xs text-slate-400 mt-4">Modulo em desenvolvimento — em breve disponivel.</p>
      </div>
    `;
	}

	function genericClearActive() {
		const host = document.getElementById(activeTool?.containerId || '');
		if (!host) return;

		host.querySelectorAll('input[type="text"], input[type="email"], input[type="date"]').forEach((i) => (i.value = ''));
		host.querySelectorAll('textarea').forEach((t) => (t.value = ''));
		host.querySelectorAll('select').forEach((s) => (s.selectedIndex = 0));
		host.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((c) => (c.checked = false));
	}

	/**
	 * PRINT helper (JS) para funcionar com seu CSS global atual,
	 * que faz "body * { visibility:hidden !important; }" e só libera prescrição/exames.
	 * Aqui a gente força via inline styles (!) visibilidade apenas da guia ativa e imprime.
	 */
	function printOnlyActiveGuide() {
		const host = document.getElementById(activeTool?.containerId || '');
		if (!host) return window.print();

		const restore = forceOnlyThisVisibleForPrint(host);

		const cleanup = () => {
			try {
				restore();
			} catch (e) {}
		};

		// tenta restaurar sempre
		window.addEventListener('afterprint', cleanup, { once: true });

		window.print();

		// fallback (caso afterprint não dispare)
		setTimeout(cleanup, 800);
	}

	function forceOnlyThisVisibleForPrint(rootEl) {
		const changed = new Map(); // el -> previous style attr

		const rememberAndSet = (el, patch) => {
			if (!changed.has(el)) changed.set(el, el.getAttribute('style'));
			// aplica patch no style inline
			Object.entries(patch).forEach(([k, v]) => {
				el.style.setProperty(k, v, 'important');
			});
		};

		// 1) esconde geral via inline (não depende do CSS)
		rememberAndSet(document.body, { visibility: 'hidden' });

		// 2) torna root e descendentes visíveis
		rememberAndSet(rootEl, {
			visibility: 'visible',
			position: 'absolute',
			left: '0',
			top: '0',
			width: '100%',
			background: 'white',
		});

		rootEl.querySelectorAll('*').forEach((el) => {
			rememberAndSet(el, { visibility: 'visible' });
		});

		// garante que os ancestrais do root não "cortem" layout (ex.: overflow hidden)
		let p = rootEl.parentElement;
		while (p && p !== document.body) {
			rememberAndSet(p, { visibility: 'visible', overflow: 'visible' });
			p = p.parentElement;
		}

		return () => {
			changed.forEach((prev, el) => {
				if (prev === null || prev === undefined) el.removeAttribute('style');
				else el.setAttribute('style', prev);
			});
		};
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderGuiasTab);
	} else {
		renderGuiasTab();
	}

	function setupGuiasZoom() {
		const zoomTarget = document.getElementById('guiasZoomTarget');

		const btnIn = document.getElementById('guiasZoomIn');
		const btnOut = document.getElementById('guiasZoomOut');
		const btnReset = document.getElementById('guiasZoomReset');
		const label = document.getElementById('guiasZoomLabel');

		if (!zoomTarget || !btnIn || !btnOut || !btnReset || !label) return;

		let zoom = 1.0;
		const ZOOM_MIN = 0.6;
		const ZOOM_MAX = 1.8;
		const STEP = 0.1;

		const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

		function applyZoom(next) {
			zoom = clamp(next, ZOOM_MIN, ZOOM_MAX);

			// ✅ zoom (Chrome/Edge) altera o layout => altura acompanha
			zoomTarget.style.zoom = String(zoom);

			// fallback opcional (caso um dia rode em browser que não suporte bem)
			// zoomTarget.style.transform = `scale(${zoom})`;

			label.textContent = `${Math.round(zoom * 100)}%`;
		}

		btnIn.addEventListener('click', () => applyZoom(zoom + STEP));
		btnOut.addEventListener('click', () => applyZoom(zoom - STEP));
		btnReset.addEventListener('click', () => applyZoom(1.0));

		// reset para impressão
		const prev = { zoom: 1.0 };
		window.addEventListener('beforeprint', () => {
			prev.zoom = zoom;
			zoomTarget.style.zoom = '1';
			label.textContent = '100%';
		});
		window.addEventListener('afterprint', () => applyZoom(prev.zoom));

		applyZoom(1.0);
	}

	window.renderGuiasTab = renderGuiasTab;
	window.switchGuia = switchGuia;
})();
