//@ts-nocheck
// tab_apoio.js — Aba Apoio Clínico por Especialidade
// Renderiza menu de especialidades + carrega módulos sob demanda (lazy load)
// Padrão idêntico ao tab_psf.js — neumórfico + CDNLoader
(() => {
	'use strict';

	const APOIO_CDN = 'https://cdn.gtmedics.com/apoioClinico';

	// Ferramentas de Apoio — cada uma com scripts e scaffold próprio
	const apoioTools = [
		{ key: 'clinica', name: 'Clínica Médica', icon: 'cardiology', description: 'Protocolos clínicos e prescrições por patologia' },
		{ key: 'emergencia', name: 'Emergência', icon: 'emergency', description: 'Protocolos de emergência por especialidade' },
		{ key: 'pediatria', name: 'Pediatria', icon: 'pediatrics', description: 'Calculadora de fármacos pediátricos por peso' },
		{ key: 'gineco', name: 'Ginecologia', icon: 'pregnancy', description: 'Protocolos ginecológicos (em breve)' },
		{ key: 'psiquiatria', name: 'Psiquiatria', icon: 'psychology', description: 'Protocolos psiquiátricos (em breve)' },
	];

	let loaderApoio = null;
	const loadedScripts = new Set();

	// ============================================
	// RENDER PRINCIPAL
	// ============================================
	function renderApoioTab() {
		const container = document.getElementById('tab_apoio');
		if (!container) {
			console.error('[Apoio] Container #tab_apoio não encontrado');
			return;
		}

		container.innerHTML = `
      <section id="tab-apoio" class="tabPanel hidden print:hidden">
        <div class="w-full max-w-7xl">
          <div
            class="rounded-[20px] bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] transition-all duration-300 ring-1 ring-slate-200">

            <!-- Header -->
            <header class="flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-slate-800">library_books</span>
                  <h1 class="text-xl font-semibold tracking-tight text-slate-800">Apoio clínico por especialidade</h1>
                </div>
                <p class="mt-1 text-sm text-slate-800">
                  Selecione a especialidade para ver protocolos, prescrições e ferramentas clínicas.
                </p>
              </div>

              <div class="px-6 pb-2">
                <div
                  class="rounded-2xl bg-[#e0e5ec] p-4 text-sm text-slate-800 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
                  <div class="flex items-start gap-3">
                    <span class="material-symbols-outlined mt-0.5 text-amber-700">warning</span>
                    <div class="space-y-1">
                      <div class="font-semibold text-slate-800">Material de apoio. Validar com protocolo institucional.</div>
                      <div>
                        Especialmente em gestação/lactação, insuficiência renal/hepática, interações, alergias e IST.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <!-- Menu de Especialidades -->
            <div id="menu-apoio" class="px-6 pb-4 flex flex-wrap gap-3"></div>

            <!-- Content -->
            <section class="p-4 pt-2">
              <div class="bg-gray-200  overflow-hidden rounded-xl border border-gray-300">
                <div id="apoio-content" class="min-h-[400px]"></div>
              </div>
            </section>

          </div>
        </div>
      </section>
    `;

		initializeApoioTab();
	}

	// ============================================
	// INICIALIZAÇÃO
	// ============================================
	function initializeApoioTab() {
		loaderApoio = new CDNLoader(APOIO_CDN);
		const menuContainer = document.getElementById('menu-apoio');

		if (menuContainer) {
			menuContainer.innerHTML = apoioTools
				.map(
					(tool) => `
				<button data-apoio-key="${tool.key}"
					class="apoio-menu-btn inline-flex items-center cursor-pointer gap-2 rounded-full bg-[#e0e5ec] px-4 py-2 text-sm font-semibold text-slate-700 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] border-none hover:text-[#007BFF] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all focus:outline-none"
					title="${tool.description}">
					<span class="material-symbols-outlined text-base">${tool.icon}</span>
					${tool.name}
				</button>
			`,
				)
				.join('');

			menuContainer.addEventListener('click', (e) => {
				const btn = e.target.closest('[data-apoio-key]');
				if (btn) switchApoio(btn.dataset.apoioKey);
			});
		}

		// Auto-seleciona a primeira especialidade
		switchApoio(apoioTools[0].key);
		console.log('[Apoio] Aba renderizada e inicializada');
	}

	// ============================================
	// SWITCH ENTRE ESPECIALIDADES
	// ============================================
	async function switchApoio(key) {
		const tool = apoioTools.find((t) => t.key === key);
		if (!tool) return;

		const apoioContent = document.getElementById('apoio-content');

		// Highlight botão ativo
		document.querySelectorAll('.apoio-menu-btn').forEach((btn) => {
			const isActive = btn.dataset.apoioKey === key;
			if (isActive) {
				btn.classList.add('text-[#007BFF]');
				btn.style.boxShadow = 'inset 4px 4px 8px #c1c9d2, inset -4px -4px 8px #ffffff';
			} else {
				btn.classList.remove('text-[#007BFF]');
				btn.style.boxShadow = '6px 6px 12px #c1c9d2, -6px -6px 12px #ffffff';
			}
		});

		if (!apoioContent) return;

		// Render por especialidade
		switch (key) {
			case 'clinica':
				await renderClinica(apoioContent);
				break;
			case 'pediatria':
				await renderPediatria(apoioContent);
				break;
			case 'emergencia':
				await renderEmergencia(apoioContent);
				break;
			default:
				showPlaceholder(apoioContent, tool);
				break;
		}
	}

	// ============================================
	// HELPER: Carregar script via CDNLoader
	// ============================================
	async function loadScript(scriptName) {
		if (loadedScripts.has(scriptName)) return true;
		try {
			await loaderApoio.load(scriptName);
			loadedScripts.add(scriptName);
			return true;
		} catch (err) {
			console.error(`[Apoio] Erro ao carregar ${scriptName}:`, err);
			return false;
		}
	}

	// ============================================
	// CLÍNICA MÉDICA
	// ============================================
	async function renderClinica(contentEl) {
		// Scaffold DOM que clinica.js espera
		contentEl.innerHTML = `
			<div class="p-6 bg-[#e0e5ec]">
				<div class="flex flex-col md:flex-row gap-6">
					<!-- Sidebar: dropdown de patologias -->
					<div class="w-full md:w-1/3">
						<div class="rounded-[20px] bg-[#e0e5ec] p-4 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
							<h3 class="text-sm font-bold text-[#2d3748] mb-3 flex items-center gap-2">
								<span class="material-symbols-outlined text-sm">search</span>
								Selecione a patologia
							</h3>
							<select id="entitySelect"
								class="w-full rounded-[15px] bg-[#e0e5ec] p-3 text-sm text-[#25282e] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] border-none focus:outline-none">
								<option value="">— Selecione —</option>
							</select>
						</div>
					</div>

					<!-- Viewer: card do protocolo -->
					<div class="w-full md:w-2/3">
						<div id="protocolCard"
							class="rounded-[20px] bg-[#e0e5ec] p-6 shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] min-h-[300px]">
							<div class="text-center py-12 text-[#25282e]">
								<span class="material-symbols-outlined text-5xl mb-4 text-[#5f6775]">library_books</span>
								<h3 class="text-xl font-medium text-[#2d3748]">Selecione uma patologia</h3>
								<p class="text-[#25282e] mt-2">Escolha um item na lista à esquerda para ver o protocolo clínico e prescrição.</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Toast -->
				<div id="toast" class="hidden fixed bottom-4 right-4 z-50 rounded-2xl bg-[#e0e5ec] px-6 py-3 text-sm font-bold text-green-700 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
					<div>Copiado!</div>
				</div>
			</div>
		`;

		// Carrega dados + UI
		const dataOk = await loadScript('protocolos-completo.js');
		if (!dataOk) {
			contentEl.innerHTML = errorMsg('Clínica Médica');
			return;
		}

		const uiOk = await loadScript('clinica.js');
		if (!uiOk) {
			contentEl.innerHTML = errorMsg('Clínica Médica');
			return;
		}

		// clinica.js auto-inicia via DOMContentLoaded ou detecção direta
		// Se já carregou antes, precisamos re-init manualmente
		if (window.ProtocolosModule && window.ProtocolosModule.init) {
			window.ProtocolosModule.init();
		}
	}

	// ============================================
	// PEDIATRIA (Calculadora de Fármacos)
	// ============================================
	async function renderPediatria(contentEl) {
		// Scaffold DOM que farmacos_completo.js espera
		contentEl.innerHTML = `
			<div class="p-6 bg-[#e0e5ec]">
				<div class="flex flex-col md:flex-row gap-6">
					<!-- Sidebar: Controles (1/3) -->
					<div class="w-full md:w-1/3">
						<div class="rounded-[20px] bg-[#e0e5ec] p-4 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
							<h3 class="text-sm font-bold text-[#2d3748] mb-3 flex items-center gap-2">
								<span class="material-symbols-outlined text-sm">pediatrics</span>
								Parâmetros
							</h3>

							<div class="flex flex-col gap-3">
								<!-- Fármaco -->
								<div>
									<label for="selectFarmaco" class="block text-xs font-bold text-[#2d3748] mb-1">Fármaco</label>
									<select id="selectFarmaco"
										class="w-full rounded-[15px] bg-[#e0e5ec] p-3 text-sm text-[#25282e] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] border-none focus:outline-none">
										<option value="">— Selecione —</option>
									</select>
								</div>

								<div class="grid grid-cols-2 gap-3">
									<!-- Peso -->
									<div>
										<label for="inputPeso" class="block text-xs font-bold text-[#2d3748] mb-1">Peso (kg)</label>
										<input id="inputPeso" type="number" step="0.1" min="0.5" placeholder="ex: 12"
											class="w-full rounded-[15px] bg-[#e0e5ec] p-3 text-sm text-[#25282e] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] border-none focus:outline-none" />
									</div>
									<!-- Idade -->
									<div>
										<label for="inputIdadeMeses" class="block text-xs font-bold text-[#2d3748] mb-1">Idade (mes)</label>
										<input id="inputIdadeMeses" type="number" min="0" placeholder="ex: 36"
											class="w-full rounded-[15px] bg-[#e0e5ec] p-3 text-sm text-[#25282e] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] border-none focus:outline-none" />
									</div>
								</div>
							</div>

							<!-- Botões -->
							<div class="flex flex-col gap-2 mt-4">
								<button id="btnCalcular"
									class="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#e0e5ec] px-4 py-2 text-sm font-bold text-[#007BFF] shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] border-none hover:shadow-[8px_8px_16px_#c1c9d2,-8px_-8px_16px_#ffffff] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all">
									<span class="material-symbols-outlined text-sm">calculate</span>
									Calcular
								</button>
								<div class="flex items-center gap-2">
									<button id="btnCopiarRx"
										class="flex-1 inline-flex justify-center items-center gap-2 rounded-full bg-[#e0e5ec] px-4 py-2 text-xs font-bold text-slate-700 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] border-none hover:shadow-[8px_8px_16px_#c1c9d2,-8px_-8px_16px_#ffffff] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all">
										<span class="material-symbols-outlined text-sm">content_copy</span>
										Copiar
									</button>
									<span id="copyStatus" class="text-[10px] text-green-600 w-16 text-center"></span>
								</div>
							</div>
						</div>
					</div>

					<!-- Content: Resultado (2/3) -->
					<div class="w-full md:w-2/3">
						<div id="medicationCard"
							class="rounded-[20px] bg-[#e0e5ec] p-6 shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] min-h-[300px] font-mono text-sm text-[#25282e] whitespace-pre-wrap h-full">
							<div class="text-center py-12 text-[#5f6775]">
								<span class="material-symbols-outlined text-5xl mb-3 opacity-50">medication_liquid</span>
								<h3 class="text-lg font-medium text-[#2d3748]">Calculadora Pediátrica</h3>
								<p class="text-sm mt-2">Configure os parâmetros à esquerda para calcular.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		// Carrega farmacos_completo.js
		const ok = await loadScript('farmacos_completo.js');
		if (!ok) {
			contentEl.innerHTML = errorMsg('Pediatria');
			return;
		}

		// Popula dropdown de fármacos a partir da API global
		populateFarmacoSelect();

		// farmacos_completo.js usa DOMContentLoaded → já disparou.
		// Precisamos re-vincular os event listeners manualmente
		bindPediatriaEvents();
	}

	/**
	 * Popula <select id="selectFarmaco"> com optgroups por categoria
	 */
	function populateFarmacoSelect() {
		const select = document.getElementById('selectFarmaco');
		const data = window.farmacosData;
		if (!select || !data) return;

		const categorias = data.getCategorias();
		categorias.forEach((catKey) => {
			const items = data.getByCategoria(catKey);
			if (!items || !Object.keys(items).length) return;

			const optgroup = document.createElement('optgroup');
			optgroup.label = catKey.charAt(0).toUpperCase() + catKey.slice(1);

			Object.keys(items).forEach((itemKey) => {
				const item = items[itemKey];
				const opt = document.createElement('option');
				opt.value = catKey + '.' + itemKey;
				opt.textContent = item.name || itemKey;
				optgroup.appendChild(opt);
			});

			select.appendChild(optgroup);
		});
	}

	/**
	 * Vincula eventos de Calcular/Copiar para Pediatria
	 * (replicando a lógica de farmacos_completo.js que só roda no DOMContentLoaded)
	 */
	function bindPediatriaEvents() {
		const btnCalc = document.getElementById('btnCalcular');
		const btnCopy = document.getElementById('btnCopiarRx');
		const statusEl = document.getElementById('copyStatus');
		const cardEl = document.getElementById('medicationCard');
		let currentRxText = '';

		function setStatus(msg) {
			if (!statusEl) return;
			statusEl.textContent = msg;
			setTimeout(() => {
				statusEl.textContent = '';
			}, 1500);
		}

		function getSelectedItem() {
			const select = document.getElementById('selectFarmaco');
			const path = select?.value;
			const farmacos = window.farmacosData?.farmacos;
			if (!path || !farmacos) return null;
			return path.split('.').reduce((acc, k) => (acc ? acc[k] : null), farmacos);
		}

		function getCtx() {
			const pesoEl = document.getElementById('inputPeso');
			const idadeEl = document.getElementById('inputIdadeMeses');
			const weight = pesoEl ? Number(pesoEl.value) : NaN;
			const ageMonths = idadeEl?.value ? Number(idadeEl.value) : null;
			return { weight, ageMonths };
		}

		function stripHtml(s) {
			return String(s ?? '')
				.replace(/<[^>]*>/g, '')
				.trim();
		}

		function normalizeSpaces(s) {
			return String(s ?? '')
				.replace(/[ \t]+\n/g, '\n')
				.replace(/\n{3,}/g, '\n\n')
				.trim();
		}

		function buildRxText(item, ctx) {
			if (!item || isNaN(ctx.weight) || ctx.weight <= 0) return '';
			const calc = item.calculate ? item.calculate(ctx.weight, ctx.ageMonths) : null;
			const drugLine = `${item.name} — ${item.presentation || ''}`;

			if (calc?.rxText) return normalizeSpaces(stripHtml(calc.rxText));
			if (calc?.practicalDose) {
				const pos = normalizeSpaces(stripHtml(calc.practicalDose));
				return normalizeSpaces(`${drugLine}\n${pos}`);
			}
			if (calc?.details) return normalizeSpaces(`${drugLine}\n${stripHtml(calc.details)}`);
			return normalizeSpaces(drugLine);
		}

		if (btnCalc) {
			btnCalc.addEventListener('click', () => {
				const item = getSelectedItem();
				if (!item) return setStatus('Selecione um fármaco.');

				const ctx = getCtx();
				if (isNaN(ctx.weight) || ctx.weight <= 0) return setStatus('Insira o peso.');

				currentRxText = buildRxText(item, ctx);

				if (!currentRxText) return setStatus('Sem prescrição.');

				if (cardEl) {
					// Render resultado formatado
					const calc = item.calculate ? item.calculate(ctx.weight, ctx.ageMonths) : null;
					let html = `<div class="space-y-3">`;
					html += `<h4 class="text-base font-bold text-[#2d3748]">${item.name}</h4>`;
					html += `<p class="text-xs text-[#5f6775]">${item.presentation || ''}</p>`;
					html += `<p class="text-xs"><strong>Dose:</strong> ${item.dose || ''}</p>`;
					if (item.practicalRule) html += `<p class="text-xs"><strong>Regra prática:</strong> ${item.practicalRule}</p>`;
					if (calc?.dailyDose) html += `<p class="text-xs"><strong>Dose diária:</strong> ${calc.dailyDose}</p>`;
					if (calc?.singleDose) html += `<p class="text-xs"><strong>Dose unitária:</strong> ${calc.singleDose}</p>`;
					if (calc?.practicalDose) html += `<p class="text-xs"><strong>Prática:</strong> ${calc.practicalDose}</p>`;
					if (calc?.details) html += `<div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs">${calc.details}</div>`;
					if (item.renalAdjustment) html += `<p class="text-xs text-amber-700 mt-2"><strong>Ajuste renal:</strong> ${item.renalAdjustment}</p>`;
					if (item.maxDose) html += `<p class="text-xs text-red-600"><strong>${item.maxDose}</strong></p>`;
					if (item.notes) html += `<p class="text-xs text-slate-500 mt-1"><strong>Obs:</strong> ${item.notes}</p>`;
					html += `</div>`;
					cardEl.innerHTML = html;
					cardEl.dataset.copy = currentRxText;
				}

				setStatus('Calculado ✅');
			});
		}

		if (btnCopy) {
			btnCopy.addEventListener('click', async () => {
				const text = currentRxText || cardEl?.dataset?.copy || '';
				if (!text) return setStatus('Calcule primeiro.');

				try {
					await navigator.clipboard.writeText(text);
					setStatus('Copiado ✅');
				} catch {
					// Fallback
					const ta = document.createElement('textarea');
					ta.value = text;
					document.body.appendChild(ta);
					ta.select();
					document.execCommand('copy');
					ta.remove();
					setStatus('Copiado (fallback) ✅');
				}
			});
		}
	}

	// ============================================
	// EMERGÊNCIA (Protocolos Data Module)
	// ============================================
	async function renderEmergencia(contentEl) {
		contentEl.innerHTML = `
			<div class="p-6 bg-[#e0e5ec]">
				<div class="flex flex-col md:flex-row gap-6">
					<!-- Sidebar: categorias -->
					<div class="w-full md:w-1/3">
						<div id="emerg-sidebar" class="rounded-[20px] bg-[#e0e5ec] p-4 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
							<h3 class="text-sm font-bold text-[#2d3748] mb-3 flex items-center gap-2">
								<span class="material-symbols-outlined text-sm">emergency</span>
								Categorias
							</h3>
							<div id="emerg-categories" class="flex flex-col gap-2">
								<div class="text-center py-4 text-[#5f6775] text-sm">Carregando...</div>
							</div>
						</div>
					</div>

					<!-- Viewer -->
					<div class="w-full md:w-2/3">
						<div id="emerg-viewer"
							class="rounded-[20px] bg-[#e0e5ec] p-6 shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] min-h-[400px]">
							<div class="text-center py-12 text-[#25282e]">
								<span class="material-symbols-outlined text-5xl mb-4 text-[#5f6775]">emergency</span>
								<h3 class="text-xl font-medium text-[#2d3748]">Protocolos de Emergência</h3>
								<p class="text-[#25282e] mt-2">Selecione uma categoria à esquerda para ver os protocolos.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		// Carrega protocolos-data-module.js
		const ok = await loadScript('protocolos-data-module.js');
		if (!ok) {
			contentEl.innerHTML = errorMsg('Emergência');
			return;
		}

		const PDM = window.ProtocolosDataModule;
		if (!PDM) {
			contentEl.innerHTML = errorMsg('Emergência');
			return;
		}

		// Render categorias na sidebar
		const categoriesEl = document.getElementById('emerg-categories');
		if (!categoriesEl) return;

		const categorias = PDM.getCategorias();
		categoriesEl.innerHTML = categorias
			.map(
				(cat) => `
			<button data-emerg-cat="${cat.key}"
				class="emerg-cat-btn flex items-center justify-between rounded-[15px] bg-[#e0e5ec] px-4 py-2.5 text-xs font-bold text-slate-700 shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] border-none hover:text-[#007BFF] active:shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] transition-all text-left cursor-pointer">
				<span>${cat.name}</span>
				<span class="text-[10px] text-slate-400">${cat.count}</span>
			</button>
		`,
			)
			.join('');

		// Event: clicar em categoria
		categoriesEl.addEventListener('click', (e) => {
			const btn = e.target.closest('[data-emerg-cat]');
			if (!btn) return;

			const catKey = btn.dataset.emergCat;

			// Highlight categoria ativa
			categoriesEl.querySelectorAll('.emerg-cat-btn').forEach((b) => {
				if (b.dataset.emergCat === catKey) {
					b.classList.add('text-[#007BFF]');
					b.style.boxShadow = 'inset 3px 3px 6px #c1c9d2, inset -3px -3px 6px #ffffff';
				} else {
					b.classList.remove('text-[#007BFF]');
					b.style.boxShadow = '4px 4px 8px #c1c9d2, -4px -4px 8px #ffffff';
				}
			});

			// Render lista de protocolos da categoria
			renderEmergCategory(catKey, PDM);
		});
	}

	/**
	 * Renderiza lista de protocolos de uma categoria de emergência
	 */
	function renderEmergCategory(catKey, PDM) {
		const viewer = document.getElementById('emerg-viewer');
		if (!viewer) return;

		const protocolos = PDM.getProtocolosPorCategoria(catKey);
		if (!protocolos.length) {
			viewer.innerHTML = `<div class="text-center py-8 text-[#5f6775]"><p>Nenhum protocolo nesta categoria.</p></div>`;
			return;
		}

		let html = `<div class="space-y-3">`;
		html += `<h3 class="text-base font-bold text-[#2d3748] mb-3">${protocolos[0]?.categoriaNome || catKey}</h3>`;

		protocolos.forEach((p) => {
			html += `
				<button data-emerg-proto="${p.key}" data-emerg-cat="${catKey}"
					class="emerg-proto-btn w-full text-left rounded-[15px] bg-[#e0e5ec] px-4 py-3 text-sm font-medium text-[#25282e] shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] border-none hover:text-[#007BFF] hover:shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] active:shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] transition-all cursor-pointer">
					<span class="material-symbols-outlined text-sm mr-2 align-middle text-indigo-400">article</span>
					${p.title}
				</button>
			`;
		});

		html += `</div>`;
		viewer.innerHTML = html;

		// Event: clicar em protocolo
		viewer.addEventListener('click', (e) => {
			const btn = e.target.closest('[data-emerg-proto]');
			if (!btn) return;

			const proto = PDM.getProtocolo(btn.dataset.emergCat, btn.dataset.emergProto);
			if (proto) renderEmergProtocol(proto);
		});
	}

	/**
	 * Renderiza um protocolo de emergência individual
	 */
	function renderEmergProtocol(proto) {
		const viewer = document.getElementById('emerg-viewer');
		if (!viewer) return;

		let html = `
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<h3 class="text-lg font-bold text-[#2d3748] flex items-center gap-2">
						<span class="material-symbols-outlined text-indigo-500">emergency</span>
						${proto.title}
					</h3>
					<button id="emerg-back-btn"
						class="inline-flex items-center gap-1 rounded-full bg-[#e0e5ec] px-3 py-1.5 text-xs font-bold text-slate-600 shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] border-none hover:text-[#007BFF] active:shadow-[inset_3px_3px_6px_#c1c9d2,inset_-3px_-3px_6px_#ffffff] transition-all cursor-pointer">
						<span class="material-symbols-outlined text-sm">arrow_back</span>
						Voltar
					</button>
				</div>

				<!-- Conteúdo do protocolo -->
				<div class="rounded-[15px] bg-white bg-opacity-80 p-4 shadow-sm border border-gray-200 overflow-auto max-h-[500px] text-sm">
					${proto.content || '<p class="text-slate-500">Sem conteúdo disponível.</p>'}
				</div>
		`;

		// Prescrição
		if (proto.rx_text) {
			html += `
				<div class="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-[15px]">
					<div class="flex justify-between items-center mb-3">
						<h4 class="text-sm font-bold text-blue-800 flex items-center">
							<span class="material-symbols-outlined mr-2 text-sm">description</span>
							Sugestão de Prescrição
						</h4>
						<button id="emerg-copy-rx"
							class="rounded-[15px] bg-white shadow-sm text-blue-600 px-3 py-1.5 text-xs font-bold hover:text-blue-800 hover:shadow-md transition-all active:scale-95 border border-blue-100 flex items-center gap-1 cursor-pointer">
							<span class="material-symbols-outlined text-sm">content_copy</span>
							Copiar Rx
						</button>
					</div>
					<div class="bg-white p-4 rounded-[15px] shadow-[inset_2px_2px_5px_#e2e8f0,inset_-2px_-2px_5px_#ffffff] font-mono text-xs text-slate-600 whitespace-pre-wrap leading-relaxed border border-slate-100">${proto.rx_text}</div>
				</div>
			`;
		}

		html += `</div>`;
		viewer.innerHTML = html;

		// Botão voltar
		const backBtn = document.getElementById('emerg-back-btn');
		if (backBtn) {
			backBtn.addEventListener('click', () => {
				renderEmergCategory(proto.categoria, window.ProtocolosDataModule);
			});
		}

		// Botão copiar Rx
		const copyBtn = document.getElementById('emerg-copy-rx');
		if (copyBtn && proto.rx_text) {
			copyBtn.addEventListener('click', async () => {
				try {
					await navigator.clipboard.writeText(proto.rx_text);
					copyBtn.textContent = 'Copiado ✅';
					setTimeout(() => {
						copyBtn.innerHTML = '<span class="material-symbols-outlined text-sm">content_copy</span> Copiar Rx';
					}, 1500);
				} catch {
					const ta = document.createElement('textarea');
					ta.value = proto.rx_text;
					document.body.appendChild(ta);
					ta.select();
					document.execCommand('copy');
					ta.remove();
					copyBtn.textContent = 'Copiado ✅';
					setTimeout(() => {
						copyBtn.innerHTML = '<span class="material-symbols-outlined text-sm">content_copy</span> Copiar Rx';
					}, 1500);
				}
			});
		}
	}

	// ============================================
	// PLACEHOLDER
	// ============================================
	function showPlaceholder(contentEl, tool) {
		contentEl.innerHTML = `
			<div class="flex flex-col items-center justify-center py-16 text-slate-500">
				<span class="material-symbols-outlined text-6xl mb-4 text-slate-300">construction</span>
				<h3 class="text-lg font-bold text-[#2d3748] mb-2">${tool.name}</h3>
				<p class="text-sm text-slate-500">${tool.description}</p>
				<p class="text-xs text-slate-400 mt-4">Módulo em desenvolvimento — em breve disponível.</p>
			</div>
		`;
	}

	// ============================================
	// ERROR MSG HELPER
	// ============================================
	function errorMsg(moduleName) {
		return `<div class="p-8 text-center text-red-500">
			<span class="material-symbols-outlined text-4xl mb-2">error</span>
			<p>Erro ao carregar módulo: ${moduleName}</p>
		</div>`;
	}

	// ============================================
	// BOOT
	// ============================================
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderApoioTab);
	} else {
		renderApoioTab();
	}

	window.renderApoioTab = renderApoioTab;
	window.switchApoio = switchApoio;
})();
