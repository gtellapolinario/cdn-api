//@ts-nocheck
// tab_guias.js — Aba Guias SUS
// Renderiza menu de guias + carrega modulos sob demanda (lazy load)
// Padrao identico ao tab_psf.js — neuromorfico + CDNLoader
(() => {
	'use strict';

	const GUIAS_CDN = 'https://cdn.gtmedics.com/geral/js';

	// Guias SUS — cada uma com script futuro para lazy-load via CDNLoader
	const guiasTools = [
		{ key: 'lme', name: 'LME', icon: 'lab_profile', script: 'guia_lme.js', containerId: 'guia_lme', renderFn: 'renderGuiaLme', description: 'Servico Auxiliar de Diagnostico e Terapia' },
		{ key: 'consulta', name: 'Consulta', icon: 'stethoscope', script: 'guia_consulta.js', containerId: 'guia_consulta', renderFn: 'renderGuiaConsulta', description: 'Guia de Consulta' },
		{ key: 'internacao', name: 'Internacao', icon: 'hotel', script: 'guia_internacao.js', containerId: 'guia_internacao', renderFn: 'renderGuiaInternacao', description: 'Guia de Internacao Hospitalar' },
		{ key: 'sp_sadt', name: 'SP/SADT', icon: 'healing', script: 'guia_sp_sadt.js', containerId: 'guia_sp_sadt', renderFn: 'renderGuiaSpSadt', description: 'Solicitacao de Procedimento/SADT' },
		{ key: 'resumo_internacao', name: 'Resumo Int.', icon: 'description', script: 'guia_resumo_internacao.js', containerId: 'guia_resumo_internacao', renderFn: 'renderGuiaResumoInt', description: 'Resumo de Internacao' },
	];

	let loaderGuias = null;
	const loadedScripts = new Set();

	/**
	 * Renderiza a aba Guias SUS
	 */
	function renderGuiasTab() {
		const container = document.getElementById('tab_guias');
		if (!container) {
			console.error('[Guias] Container #tab_guias nao encontrado');
			return;
		}

		container.innerHTML = `
      <section id="tab-guias" class="tabPanel hidden print:hidden">
        <div class="w-full max-w-7xl">
          <div
            class="rounded-[20px] bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] transition-all duration-300 ring-1 ring-slate-200">

            <!-- Header -->
            <header class="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-slate-800">description</span>
                  <h1 class="text-xl font-extrabold tracking-tight text-[#2d3748]">Guias SUS</h1>
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

            <!-- Menu de Selecao de Guias -->
            <div id="menu-guias" class="px-6 pb-4 flex flex-wrap gap-3"></div>

            <!-- Content -->
            <section class="p-4 pt-2">
              <div class="bg-gray-200 overflow-hidden rounded-xl border border-gray-300">
                <div id="guias-content" class="min-h-[400px]"></div>
              </div>
            </section>

          </div>
        </div>
      </section>
    `;

		initializeGuiasTab();
	}

	/**
	 * Inicializa menu + placeholder
	 */
	function initializeGuiasTab() {
		// CDNLoader para modulos de guias (quando existirem)
		if (typeof CDNLoader !== 'undefined') {
			try {
				loaderGuias = new CDNLoader(GUIAS_CDN);
			} catch (e) {
				loaderGuias = null;
			}
		}

		const menuContainer = document.getElementById('menu-guias');

		if (menuContainer) {
			menuContainer.innerHTML = guiasTools
				.map(
					(tool) => `
				<button data-guia-key="${tool.key}"
					class="guia-menu-btn inline-flex items-center gap-2 rounded-full bg-[#e0e5ec] px-4 py-2 text-sm font-bold text-slate-700 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] border-none hover:text-[#007BFF] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all focus:outline-none"
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

		// Auto-seleciona a primeira guia
		switchGuia(guiasTools[0].key);
		console.log('[Guias] Aba renderizada e inicializada');
	}

	/**
	 * Alterna entre guias SUS
	 */
	// Alterna entre guias SUS
	async function switchGuia(key) {
		const tool = guiasTools.find((t) => t.key === key);
		if (!tool) return;

		const guiasContent = document.getElementById('guias-content');

		// Highlight botao ativo
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

		if (guiasContent) {
			guiasContent.innerHTML = `<div id="${tool.containerId}"></div>`;
		}

		// Prioriza funcao ja carregada (bundle)
		if (window[tool.renderFn]) {
			window[tool.renderFn]();
		}
		// Senao tenta carregar via CDNLoader
		else if (loaderGuias && !loadedScripts.has(tool.script)) {
			try {
				await loaderGuias.load(tool.script);
				loadedScripts.add(tool.script);
			} catch (err) {
				console.warn('[Guias] Modulo ' + tool.script + ' ainda nao disponivel');
				showPlaceholder(tool);
			}
		} else {
			showPlaceholder(tool);
		}
	}

	/**
	 * Exibe placeholder para modulos ainda nao implementados
	 */
	function showPlaceholder(tool) {
		const container = document.getElementById(tool.containerId);
		if (!container) return;

		container.innerHTML = `
			<div class="flex flex-col items-center justify-center py-16 text-slate-500">
				<span class="material-symbols-outlined text-6xl mb-4 text-slate-300">construction</span>
				<h3 class="text-lg font-bold text-[#2d3748] mb-2">${tool.name}</h3>
				<p class="text-sm text-slate-500">${tool.description}</p>
				<p class="text-xs text-slate-400 mt-4">Modulo em desenvolvimento — em breve disponivel.</p>
			</div>
		`;
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderGuiasTab);
	} else {
		renderGuiasTab();
	}

	window.renderGuiasTab = renderGuiasTab;
	window.switchGuia = switchGuia;
})();
