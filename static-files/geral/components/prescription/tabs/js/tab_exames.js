//@ts-nocheck
// tab_exames.js
(() => {
	'use strict';

	/**
	 * Renderiza a aba de Exames
	 * Layout: grid com formulário (#app) à esquerda e sidebar à direita.
	 * A lógica (form, selects, bindings) é delegada ao ExamesModule (exames-module.js)
	 * que se liga aos IDs criados aqui no sidebar.
	 */
	function renderExamesTab() {
		const container = document.getElementById('tab_exames');

		if (!container) {
			console.error('[Exames] Container #tab_exames não encontrado');
			return;
		}

		container.innerHTML = `
      <section id="tab-exames" class="tabPanel hidden">
        <div class="grid gap-4 lg:grid-cols-[1fr_260px]">
          <div class="container w-full max-w-6xl bg-white p-5 shadow-lg rounded-lg flex flex-col lg:flex-row">
            <div id="app" class="w-full"></div>
          </div>

          <!-- ASIDES EXAMES -->
          <div class="sidebar w-full max-w-60 flex flex-col p-6 ml-4 rounded-xl shadow-xl bg-white print:hidden">
            <div class="button-group bg-gray-200 p-4 mb-5 rounded-xl shadow-xl">
              <button type="button"
                class="text-[12px] font-semibold w-full mb-2 p-2.5 bg-sky-600 text-white rounded-xl shadow-xl hover:bg-sky-700 transition-colors cursor-pointer"
                id="clearAllBtn">LIMPAR TUDO</button>
              <button type="button"
                class="text-[12px] font-semibold w-full mb-2 p-2.5 bg-sky-600 text-white rounded-xl shadow-xl hover:bg-sky-700 transition-colors cursor-pointer"
                id="printBtnExam">IMPRIMIR</button>
              <button type="button"
                class="text-[12px] font-semibold w-full mb-2 p-2.5 bg-sky-600 text-white rounded-xl shadow-xl hover:bg-sky-700 transition-colors cursor-pointer"
                id="clearExamBtn">LIMPAR EXAMES</button>

              <div class="flex items-center gap-2">
                <input type="checkbox" id="toggleSusLogo" class="accent-sky-600" checked />
                <label for="toggleSusLogo" class="text-[12px] font-semibold cursor-pointer">Ocultar Logo SUS</label>
              </div>
            </div>

            <div class="select-group bg-gray-200 p-4 mb-5 rounded-xl shadow-xl">
              <select title="lab" id="laboratorySelect"
                class="w-full mb-2.5 p-1 border border-gray-50 rounded-xl shadow-xl text-[12px]">
                <option value="">LABORATÓRIO</option>
              </select>

              <select title="img" id="imageSelect"
                class="w-full mb-2.5 p-1 border border-gray-50 rounded-xl shadow-xl text-[12px]">
                <option value="">IMAGEM</option>
              </select>

              <select title="sdmulher" id="womanSelect"
                class="w-full mb-2.5 p-1 border border-gray-50 rounded-xl shadow-xl text-[12px]">
                <option value="">SAÚDE DA MULHER</option>
              </select>
            </div>
          </div>

        </div>
      </section>
    `;

		// ExamesModule (exames-module.js) encontra os IDs do sidebar
		// (#clearAllBtn, #printBtnExam, #toggleSusLogo, #laboratorySelect, etc.)
		// e faz o binding automaticamente via ensureControls + bindFormEvents.
		if (window.ExamesModule && typeof window.ExamesModule.init === 'function') {
			window.ExamesModule._initialized = false;
			window.ExamesModule.init();
		}

		console.log('[Exames] Aba Exames renderizada e inicializada');
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderExamesTab);
	} else {
		renderExamesTab();
	}

	window.renderExamesTab = renderExamesTab;
})();
