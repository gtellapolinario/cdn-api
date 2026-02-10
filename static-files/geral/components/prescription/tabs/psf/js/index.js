/**
 * PSF Home — Página Principal (Viver a Vida v7.67)
 * Renderiza o menu de sub-ferramentas PSF com ícones SVG e lazy load
 * Design baseado em indexPsf.html original
 */
(() => {
	'use strict';

	const PSF_CDN = 'https://cdn.gtmedics.com/geral/components/prescription/tabs/psf';
	const ICONS_CDN = 'https://cdn.gtmedics.com/geral/assets/icons';

	const psfSubTools = [
		{ name: 'Puericultura', icon: 'noun-pediatric.svg', script: 'ped_2025.js', containerId: 'psf_sub_ped', renderFn: 'renderPed' },
		{ name: 'Pré-Natal / Neuro', icon: 'noun-pregnant.svg', script: 'prenatal_neuro_2025.js', containerId: 'psf_sub_prenatal', renderFn: 'renderPrenatal' },
		{ name: 'Visita Domiciliar', icon: 'noun-old.svg', script: 'visita_2025.js', containerId: 'psf_sub_visita', renderFn: 'renderVisita' },
		{ name: 'Psiquiatria', icon: 'noun-brain.svg', script: 'psiqui_2025.js', containerId: 'psf_sub_psiqui', renderFn: 'renderPsiqui' },
		{ name: 'Dengue', icon: 'noun-mosquito.svg', script: 'dengue_2025.js', containerId: 'psf_sub_dengue', renderFn: 'renderDengue' },
		{ name: 'Preencher Exames', icon: 'noun-diagx.svg', script: 'exames_simples_2025.js', containerId: 'psf_sub_exames_simples', renderFn: 'renderExamesSimples' },
		{ name: 'Escriba', icon: 'noun-copy.svg', script: 'escriba_2025.js', containerId: 'psf_sub_escriba', renderFn: 'renderEscriba' },
		{ name: 'Gerador de Árvore', icon: 'noun-data.svg', script: 'tree_2025.js', containerId: 'psf_sub_tree', renderFn: 'renderTree' },
		{ name: 'Calculadoras PSF', icon: 'noun-toolbox.svg', script: 'calc_2025.js', containerId: 'psf_sub_calc', renderFn: 'renderCalc' },
		{ name: 'Gestação - Plano', icon: 'noun-notes.svg', script: 'gesta_plano_2025.js', containerId: 'psf_sub_gesta_plano', renderFn: 'renderGestaPlano' },
	];

	let loader = null;
	const loadedScripts = new Set();

	/**
	 * Injeta estilos do PSF Home (ícones SVG filter + animações)
	 */
	function injectPsfHomeStyles() {
		if (document.getElementById('psf-home-styles')) return;
		const style = document.createElement('style');
		style.id = 'psf-home-styles';
		style.textContent = `
			.psf-button-icon {
				width: 40px;
				height: 40px;
				filter: brightness(0) saturate(100%) invert(38%) sepia(8%) saturate(1065%) hue-rotate(173deg) brightness(95%) contrast(90%);
				transition: filter 0.3s ease, transform 0.3s ease;
			}
			.psf-tool-button:hover .psf-button-icon {
				filter: brightness(0) saturate(100%) invert(28%) sepia(98%) saturate(5462%) hue-rotate(208deg) brightness(97%) contrast(106%);
				transform: scale(1.1);
			}
			@keyframes psfFadeInUp {
				from { opacity: 0; transform: translateY(20px); }
				to { opacity: 1; transform: translateY(0); }
			}
			.psf-animate {
				animation: psfFadeInUp 0.5s ease-out forwards;
				opacity: 0;
			}
		`;
		document.head.appendChild(style);
	}

	function renderPsfHome() {
		const container = document.getElementById('psf_home');
		if (!container) {
			console.error('[PSF Home] Container #psf_home não encontrado');
			return;
		}

		injectPsfHomeStyles();
		loader = new CDNLoader(PSF_CDN);

		const delays = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

		container.innerHTML = `
      <div class="bg-[#e0e5ec] text-[#5f6775] font-sans antialiased min-h-[600px] p-4 md:p-8">
        <div class="max-w-4xl mx-auto">

          <!-- Botão Voltar (oculto inicialmente) -->
          <div id="psf-home-back" class="hidden mb-4">
            <button id="psf-back-btn" type="button"
              class="inline-flex items-center gap-2 rounded-full bg-[#e0e5ec] px-5 py-2.5 text-sm font-bold text-[#5f6775] shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] border-none hover:text-[#007BFF] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all cursor-pointer">
              <i class="fa-solid fa-arrow-left"></i>
              Voltar ao Menu PSF
            </button>
          </div>

          <!-- Header -->
          <header id="psf-home-header" class="mb-10 text-center psf-animate">
            <h1 class="text-3xl md:text-4xl font-bold text-[#23217c] mb-2">
              Viver a Vida - GT-Medics - 2025 &reg;
            </h1>
            <p class="text-[#8a99aa] text-sm md:text-base font-medium">
              Suite Clínica para Atenção Primária
            </p>
          </header>

          <!-- Seção Principal -->
          <section id="psf-home-section" class="bg-[#e0e5ec] rounded-3xl p-6 md:p-10 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] psf-animate" style="animation-delay:100ms">
            <div class="flex items-center gap-3 mb-4">
              <img src="${ICONS_CDN}/noun-toolbox.svg" alt="Ferramentas" class="psf-button-icon w-10 h-10" />
              <h2 class="text-2xl font-bold text-[#23217c]">Ferramentas e Atalhos</h2>
            </div>
            <p class="text-[#5f6775] mb-8 text-sm md:text-base pl-1">
              Acesse módulos específicos e consulte os recursos para agilizar seu trabalho.
            </p>

            <!-- Grid de Botões -->
            <div id="psf-home-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${psfSubTools
								.map(
									(tool, i) => `
                <button type="button" data-psf-sub="${tool.script}"
                  class="psf-tool-button group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] hover:shadow-[8px_8px_16px_#c1c9d2,-8px_-8px_16px_#ffffff] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] bg-[#e0e5ec] text-[#5f6775] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border-none cursor-pointer psf-animate"
                  style="animation-delay:${delays[i] || (i + 1) * 100}ms">
                  <img src="${ICONS_CDN}/${tool.icon}" alt="${tool.name}" class="psf-button-icon" />
                  <span class="font-semibold text-lg group-hover:text-[#007bff] transition-colors">${tool.name}</span>
                </button>
              `,
								)
								.join('')}
            </div>
          </section>

          <!-- Área de conteúdo dos sub-tools (oculta inicialmente) -->
          <div id="psf-sub-content" class="hidden min-h-[400px]"></div>

          <div id="psf-home-footer" class="mt-8 text-center text-xs text-[#6a6a6a]">
            Desenvolvido com <span class="text-red-500">&#10084;</span> por <strong>Dr. Guilherme</strong>
          </div>
        </div>
      </div>
    `;

		const grid = document.getElementById('psf-home-grid');
		const backDiv = document.getElementById('psf-home-back');
		const backBtn = document.getElementById('psf-back-btn');
		const subContent = document.getElementById('psf-sub-content');
		const header = document.getElementById('psf-home-header');
		const section = document.getElementById('psf-home-section');
		const footer = document.getElementById('psf-home-footer');

		grid?.addEventListener('click', async (e) => {
			const btn = e.target.closest('[data-psf-sub]');
			if (!btn) return;

			const scriptName = btn.dataset.psfSub;
			const tool = psfSubTools.find((t) => t.script === scriptName);
			if (!tool) return;

			section.classList.add('hidden');
			header.classList.add('hidden');
			footer.classList.add('hidden');
			backDiv.classList.remove('hidden');
			subContent.classList.remove('hidden');
			subContent.innerHTML = `<div id="${tool.containerId}"></div>`;

			if (!loadedScripts.has(tool.script)) {
				try {
					await loader.load(tool.script);
					loadedScripts.add(tool.script);
				} catch (err) {
					console.error(`[PSF Home] Erro ao carregar ${tool.script}:`, err);
					subContent.innerHTML = `<div class="p-8 text-center text-red-500">Erro ao carregar módulo: ${tool.name}</div>`;
				}
			} else if (window[tool.renderFn]) {
				window[tool.renderFn]();
			}
		});

		backBtn?.addEventListener('click', () => {
			section.classList.remove('hidden');
			header.classList.remove('hidden');
			footer.classList.remove('hidden');
			backDiv.classList.add('hidden');
			subContent.classList.add('hidden');
			subContent.innerHTML = '';
		});

		console.log('[PSF Home] Renderizado com', psfSubTools.length, 'sub-ferramentas');
	}

	if (document.getElementById('psf_home')) {
		renderPsfHome();
	}

	window.renderPsfHome = renderPsfHome;
})();
