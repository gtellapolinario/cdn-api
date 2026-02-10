/**
 * Componente de Lógica para Patologias Comuns (PSF)
 * Gerencia a busca, paginação e renderização dos cards.
 * Expõe renderPsfPatologias() para uso como módulo lazy-loaded.
 */

(() => {
	'use strict';

	let grid, searchInput, paginationContainer, pageIndicator, prevBtn, nextBtn;

	let allItems = [];
	let filteredItems = [];
	let currentPage = 1;
	const itemsPerPage = 6;

	// Estilos neuromorphic do componente
	const PSF_STYLES_ID = 'psf-patologias-styles';
	const PSF_STYLES = `
		.card-neu {
			background: #e0e5ec;
			border-radius: 20px;
			box-shadow: 6px 6px 12px #c1c9d2, -6px -6px 12px #ffffff;
			transition: all 0.2s ease-in-out;
		}
		.card-neu:hover { transform: translateY(-2px); }
		.input-neu {
			background: #e0e5ec;
			border-radius: 9999px;
			box-shadow: inset 6px 6px 12px #c1c9d2, inset -6px -6px 12px #ffffff;
			border: none;
		}
		.btn-neu {
			display: inline-flex; align-items: center; gap: 0.5rem;
			background: #e0e5ec; border-radius: 9999px;
			padding: 0.5rem 1rem; font-weight: 700; color: #4a5568;
			box-shadow: 6px 6px 12px #c1c9d2, -6px -6px 12px #ffffff;
			transition: all 0.2s ease; cursor: pointer; border: none;
		}
		.btn-neu:hover { color: #3182ce; transform: translateY(-1px); }
		.btn-neu:active { box-shadow: inset 4px 4px 8px #c1c9d2, inset -4px -4px 8px #ffffff; transform: translateY(1px); }
		.btn-neu:disabled { opacity: 0.5; cursor: not-allowed; }
		.panel-inset {
			background: #e0e5ec; border-radius: 12px;
			box-shadow: inset 6px 6px 12px #c1c9d2, inset -6px -6px 12px #ffffff;
		}
	`;

	/**
	 * Injeta estilos se ainda não existirem
	 */
	function injectStyles() {
		if (!document.getElementById(PSF_STYLES_ID)) {
			const style = document.createElement('style');
			style.id = PSF_STYLES_ID;
			style.textContent = PSF_STYLES;
			document.head.appendChild(style);
		}
	}

	/**
	 * Cria o HTML do componente dentro do container
	 */
	function createLayout(container) {
		container.innerHTML = `
			<div class="p-4 text-slate-800">
				<div class="max-w-7xl mx-auto mb-8">
					<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 card-neu p-6 border-none">
						<div>
							<h2 class="text-2xl font-bold text-slate-800">Patologias Comuns & Protocolos</h2>
							<p class="text-slate-500 text-sm mt-1">Busque por diagnóstico, sintomas ou código.</p>
						</div>
						<div class="relative w-full md:w-96">
							<span class="material-symbols-outlined absolute left-4 top-2.5 text-slate-400">search</span>
							<input id="searchInput" type="text" placeholder="Buscar patologia..."
								class="w-full pl-12 pr-6 py-2 input-neu outline-none focus:ring-0 text-sm font-medium text-slate-700 placeholder-slate-400">
						</div>
					</div>
				</div>
				<div id="gridContainer" class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"></div>
				<div id="paginationContainer" class="max-w-7xl mx-auto flex items-center justify-center gap-6 mb-8" style="display: none;">
					<button id="prevBtn" class="btn-neu">
						<span class="material-symbols-outlined text-sm">arrow_back_ios</span> Anterior
					</button>
					<span id="pageIndicator"
						class="text-sm font-bold text-slate-600 bg-[#e0e5ec] px-4 py-2 rounded-full shadow-[inset_2px_2px_5px_#c1c9d2,inset_-2px_-2px_5px_#ffffff]">
						Página 1 de 1
					</span>
					<button id="nextBtn" class="btn-neu">
						Próximo <span class="material-symbols-outlined text-sm">arrow_forward_ios</span>
					</button>
				</div>
			</div>
		`;
	}

	/**
	 * Inicializa capturando elementos e aguardando dados
	 */
	function init() {
		grid = document.getElementById('gridContainer');
		searchInput = document.getElementById('searchInput');
		paginationContainer = document.getElementById('paginationContainer');
		pageIndicator = document.getElementById('pageIndicator');
		prevBtn = document.getElementById('prevBtn');
		nextBtn = document.getElementById('nextBtn');

		if (!grid || !searchInput) {
			console.warn('[PSF-Patologias] Elementos DOM não encontrados.');
			return;
		}

		// Bind botões de paginação
		if (prevBtn) prevBtn.addEventListener('click', () => changePage(-1));
		if (nextBtn) nextBtn.addEventListener('click', () => changePage(1));

		// Polling para aguardar dados do unified_hotstrings.js
		const h = window.psf_hotstrings || {};
		const m = window.psf_metadata || {};

		if (Object.keys(h).length > 0 || Object.keys(m).length > 0) {
			processData(h, m);
		} else {
			const checkData = setInterval(() => {
				const h = window.psf_hotstrings || {};
				const m = window.psf_metadata || {};
				if (Object.keys(h).length > 0 || Object.keys(m).length > 0) {
					clearInterval(checkData);
					processData(h, m);
				}
			}, 100);
		}
	}

	function processData(hotstrings, metadata) {
		const keys = Object.keys(metadata);

		allItems = keys.map((key) => {
			const meta = metadata[key] || { title: key, symptoms: '', tips: '' };
			const prescription = hotstrings[key] || '';
			return {
				key,
				title: meta.title || key,
				symptoms: meta.symptoms || 'Consulte protocolo clínico.',
				tips: meta.tips || '',
				prescription,
			};
		});

		allItems.sort((a, b) => a.title.localeCompare(b.title));
		filteredItems = [...allItems];
		renderPage();

		searchInput.addEventListener('input', (e) => {
			const term = e.target.value.toLowerCase();
			filteredItems = allItems.filter((item) => item.title.toLowerCase().includes(term) || item.key.toLowerCase().includes(term) || item.symptoms.toLowerCase().includes(term));
			currentPage = 1;
			renderPage();
		});
	}

	function renderPage() {
		const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

		if (currentPage < 1) currentPage = 1;
		if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const pageItems = filteredItems.slice(startIndex, endIndex);

		renderCards(pageItems);
		updatePaginationControls(totalPages);
	}

	function updatePaginationControls(totalPages) {
		if (totalPages <= 1) {
			paginationContainer.style.display = 'none';
		} else {
			paginationContainer.style.display = 'flex';
			pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
			prevBtn.disabled = currentPage === 1;
			nextBtn.disabled = currentPage === totalPages;
		}
	}

	function renderCards(items) {
		grid.innerHTML = '';
		if (items.length === 0) {
			grid.innerHTML = `
				<div class="col-span-full text-center py-12 text-slate-400">
					<span class="material-symbols-outlined text-4xl mb-2">sentiment_dissatisfied</span>
					<p>Nenhuma patologia encontrada.</p>
				</div>
			`;
			return;
		}

		items.forEach((item) => {
			const hasTips = item.tips && item.tips.length > 5 && !item.tips.includes('Seguir conduta médica');
			const tipsHtml = item.tips.replace(/\\n/g, '<br>');

			const el = document.createElement('div');
			el.className = 'card-neu p-6 flex flex-col h-full animate-[fadeIn_0.3s_ease-out]';
			el.innerHTML = `
				<div class="flex items-start justify-between mb-4">
					<h3 class="font-bold text-slate-800 text-lg leading-tight uppercase tracking-wide">${item.title}</h3>
					<span class="text-[10px] font-mono font-bold text-slate-500 bg-[#e0e5ec] shadow-[inset_2px_2px_5px_#c1c9d2,inset_-2px_-2px_5px_#ffffff] px-2 py-1 rounded-full">${item.key}</span>
				</div>

				<div class="mb-4">
					<div class="text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
						<span class="material-symbols-outlined text-[16px]">stethoscope</span>
						Sinais e Sintomas
					</div>
					<p class="text-sm text-slate-600 leading-relaxed line-clamp-3" title="${item.symptoms}">${item.symptoms}</p>
				</div>

				${hasTips ? `
				<div class="mb-5 bg-[#e0e5ec] p-3 rounded-xl shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff]">
					<div class="text-xs font-bold text-emerald-600 uppercase mb-1 flex items-center gap-1">
						<span class="material-symbols-outlined text-[16px]">lightbulb</span>
						Dicas / Conduta
					</div>
					<div class="text-xs text-slate-600 leading-relaxed line-clamp-4">${tipsHtml}</div>
				</div>
				` : ''}

				<div class="mt-auto pt-4 flex items-center justify-between gap-3">
					<button data-action="toggle" class="btn-neu text-xs w-full justify-center">
						<span class="material-symbols-outlined text-[18px]">visibility</span> VER
					</button>
					<button data-action="copy" data-key="${item.key}" class="btn-neu text-xs w-full justify-center text-blue-600">
						<span class="material-symbols-outlined text-[18px]">content_copy</span> COPIAR
					</button>
				</div>

				<div class="details-panel hidden mt-4 p-4 panel-inset text-xs font-mono text-slate-700 overflow-auto max-h-56 whitespace-pre-wrap">${item.prescription}</div>
			`;

			// Event listeners no próprio card (sem globals)
			el.querySelector('[data-action="toggle"]').addEventListener('click', function () {
				const panel = el.querySelector('.details-panel');
				panel.classList.toggle('hidden');
				const isHidden = panel.classList.contains('hidden');
				this.innerHTML = `<span class="material-symbols-outlined text-[18px]">${isHidden ? 'visibility' : 'visibility_off'}</span> ${isHidden ? 'VER' : 'OCULTAR'}`;
			});

			el.querySelector('[data-action="copy"]').addEventListener('click', async function () {
				const key = this.dataset.key;
				const text = window.psf_hotstrings[key];
				if (!text) {
					console.error(`Prescrição não encontrada para chave: ${key}`);
					return;
				}
				try {
					await navigator.clipboard.writeText(text);
					const toast = document.createElement('div');
					toast.textContent = 'Prescrição copiada!';
					toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#e0e5ec] text-slate-800 px-6 py-3 rounded-full shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] text-sm font-bold z-50 animate-[fadeIn_0.3s_ease-out] border border-slate-100';
					document.body.appendChild(toast);
					setTimeout(() => toast.remove(), 2000);
				} catch (err) {
					console.error('Falha ao copiar:', err);
				}
			});

			grid.appendChild(el);
		});
	}

	function changePage(delta) {
		currentPage += delta;
		renderPage();
		const el = document.getElementById('searchInput');
		if (el) {
			const top = el.offsetTop;
			el.closest('.p-4')?.scrollTo({ top: top - 20, behavior: 'smooth' });
		}
	}

	/**
	 * Ponto de entrada para renderização como módulo lazy-loaded
	 */
	function renderPsfPatologias() {
		const container = document.getElementById('psf_patologias');
		if (!container) {
			console.error('[PSF-Patologias] Container #psf_patologias não encontrado');
			return;
		}

		// Reset estado para re-renderização
		allItems = [];
		filteredItems = [];
		currentPage = 1;

		injectStyles();
		createLayout(container);
		init();
		console.log('[PSF-Patologias] Módulo renderizado');
	}

	// Expor globalmente para o sistema de tabs
	window.renderPsfPatologias = renderPsfPatologias;

	// Auto-init para uso standalone (compatibilidade com psf.html se necessário)
	if (document.getElementById('gridContainer') && !document.getElementById('psf_patologias')) {
		init();
	}
})();
