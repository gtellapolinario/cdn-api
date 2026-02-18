//@ts-nocheck
// tab_psf.js — Aba PSF (Estratégia Saúde da Família)
// Renderiza menu de ferramentas + carrega módulos sob demanda (lazy load)
(() => {
	'use strict';

	const PSF_CDN = 'https://cdn.gtmedics.com/geral/components/prescription/tabs/psf';
	const APOIO_CDN = 'https://cdn.gtmedics.com/apoioClinico';

	// Ferramentas PSF — cada uma com tipo de renderização
	const psfTools = [
		{ key: 'home',       name: 'PSF',                          icon: 'healing',        script: 'index.js',     containerId: 'psf_home',       renderFn: 'renderPsfHome' },
		{ key: 'patologias', name: 'Patologias Comuns',            icon: 'healing',        script: 'psf-app.js',   containerId: 'psf_patologias', renderFn: 'renderPsfPatologias', cdn: APOIO_CDN },
		{ key: 'marevan',    name: 'Anticoagulação com Varfarina', icon: 'blood_pressure', script: 'marevan.js',   containerId: 'tab_marevan',    renderFn: 'renderMarevanTab' },
		{ key: 'radio',      name: 'Incidências de RX',           icon: 'glucose',        script: 'inc_radio.js', containerId: 'tab_radio',      renderFn: 'renderRadioTab' },
	];

	let loaderPsf = null;
	let loaderApoio = null;
	const loadedScripts = new Set();

	/**
	 * Renderiza a aba PSF
	 */
	function renderPsfTab() {
		const container = document.getElementById('tab_psf');
		if (!container) {
			console.error('[PSF] Container #tab_psf não encontrado');
			return;
		}

		container.innerHTML = `
      <section id="tab-psf" class="tabPanel hidden print:hidden">
        <div class="w-full max-w-7xl">
          <div
            class="rounded-[20px] bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] transition-all duration-300 ring-1 ring-slate-200">

            <!-- Header -->
            <header class="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-slate-800">groups</span>
                  <h1 class="text-xl font-semibold tracking-tight text-[#2d3748]">Estratégia Saúde da Família (PSF)</h1>
                </div>
              </div>

              <div class="px-6 pb-2">
                <div
                  class="rounded-2xl bg-[#e0e5ec] p-4 text-sm text-slate-800 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
                  <div class="flex items-start gap-3">
                    <span class="material-symbols-outlined mt-0.5 text-amber-700">warning</span>
                    <div class="space-y-1">
                      <div class="font-semibold text-[#2d3748]">Protocolos e Ferramentas da Atenção Primária.</div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <!-- Menu de Seleção PSF -->
            <div id="menu-psf" class="px-6 pb-4 flex flex-wrap gap-3"></div>

            <!-- Content -->
            <section class="p-4 pt-2">
              <div class="bg-gray-200 overflow-hidden rounded-xl border border-gray-300">
                <div id="psf-content" class="min-h-[400px]"></div>
              </div>
            </section>

          </div>
        </div>
      </section>
    `;

		initializePsfTab();
	}

	/**
	 * Inicializa menu + carrega primeiro tool
	 */
	function initializePsfTab() {
		loaderPsf = new CDNLoader(PSF_CDN);
		loaderApoio = new CDNLoader(APOIO_CDN);
		const menuContainer = document.getElementById('menu-psf');

		if (menuContainer) {
			menuContainer.innerHTML = psfTools.map(tool => `
				<button data-psf-key="${tool.key}"
					class="psf-menu-btn inline-flex items-center gap-2 rounded-full bg-[#e0e5ec] px-4 py-2 text-sm font-semibold text-slate-700 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] border-none hover:text-[#007BFF] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all focus:outline-none">
					<span class="material-symbols-outlined text-sm">${tool.icon}</span>
					${tool.name}
				</button>
			`).join('');

			menuContainer.addEventListener('click', (e) => {
				const btn = e.target.closest('[data-psf-key]');
				if (btn) switchTool(btn.dataset.psfKey);
			});
		}

		// Auto-load primeiro tool (PSF Home)
		switchTool(psfTools[0].key);
		console.log('[PSF] Aba renderizada e inicializada');
	}

	/**
	 * Alterna entre ferramentas PSF
	 */
	async function switchTool(key) {
		const tool = psfTools.find(t => t.key === key);
		if (!tool) return;

		const psfContent = document.getElementById('psf-content');

		// Highlight botão ativo
		document.querySelectorAll('.psf-menu-btn').forEach(btn => {
			const isActive = btn.dataset.psfKey === key;
			if (isActive) {
				btn.classList.add('text-[#007BFF]');
				btn.style.boxShadow = 'inset 4px 4px 8px #c1c9d2, inset -4px -4px 8px #ffffff';
			} else {
				btn.classList.remove('text-[#007BFF]');
				btn.style.boxShadow = '6px 6px 12px #c1c9d2, -6px -6px 12px #ffffff';
			}
		});

		if (psfContent) {
			psfContent.innerHTML = `<div id="${tool.containerId}"></div>`;
		}

		// Seleciona loader correto (apoioClinico ou PSF tabs)
		const loader = tool.cdn ? loaderApoio : loaderPsf;

		// Carrega script se ainda não carregou (lazy load)
		if (!loadedScripts.has(tool.script)) {
			try {
				await loader.load(tool.script);
				loadedScripts.add(tool.script);
			} catch (err) {
				console.error(`[PSF] Erro ao carregar ${tool.script}:`, err);
				if (psfContent) psfContent.innerHTML = `<div class="p-8 text-center text-red-500">Erro ao carregar módulo: ${tool.name}</div>`;
				return;
			}
		}

		// Renderiza no container (primeiro load + re-renderizações)
		if (window[tool.renderFn]) {
			window[tool.renderFn]();
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderPsfTab);
	} else {
		renderPsfTab();
	}

	window.renderPsfTab = renderPsfTab;
	window.switchPsfTool = switchTool;
})();
