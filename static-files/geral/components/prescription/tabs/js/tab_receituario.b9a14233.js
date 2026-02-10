// tab_receituario.js (REFATORADO)
// Dependências: aside_event_bus.js, aside_registry.js
(() => {
	'use strict';

	const REQUIRED = ['prescription-header', 'prescription-footer', 'prescription-editor'];
	const OPTIONAL = ['cnes-search', 'ubs-selector', 'formatting-tools', 'hotstrings-panel'];

	/** @type {AsideRegistry} */
	let registry;

	// =========================================
	// RENDER
	// =========================================

	function renderReceituarioTab() {
		const container = document.getElementById('tab-prescricao');
		if (!container) {
			console.error('[Tab] Container #tab-prescricao not found');
			return;
		}

		registry = window.__asideRegistry;

		container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-2">

        <!-- COLUNA ESQUERDA: Formulário de Prescrição (3/4) -->
        <div class="lg:col-span-3 w-full overflow-x-auto print:overflow-visible">
          <form id="rxForm" class="p-0 m-0 bg-white rounded-xl print:shadow-none w-full max-w-full md:max-w-[210mm] print:max-w-[210mm] mx-auto">
            <div class="relative h-full px-2 sm:px-4 md:px-6 print:px-2 pb-2 pt-2 w-full">

              <!-- 1. Header -->
              <div id="prescription_header"></div>

              <!-- 2. Via de Administração -->
              <div class="flex justify-self-center w-fit mt-2">
                <div id="adm_farmaco_container"></div>
              </div>

              <!-- 3. Editor -->
              <div id="apoiomed_prescription"></div>

              <!-- 4. Footer -->
              <div id="prescription_footer"></div>

            </div>
          </form>
        </div>

        <!-- COLUNA DIREITA: Sidebar (1/4) -->
        <aside id="apoiomed_aside" class="lg:col-span-1 flex flex-col min-w-[360px] print:hidden"></aside>

      </div>
    `;

		// Renderiza componentes
		initializeComponents();
	}

	// =========================================
	// INICIALIZAÇÃO
	// =========================================

	async function initializeComponents() {
		console.log('[Tab] Initializing prescription components...');

		// Renderiza componentes obrigatórios
		// Os scripts já fazem auto-render, mas se container foi recriado, precisamos re-chamar
		window.renderPrescriptionHeader?.();
		window.renderPrescriptionFooter?.();
		window.renderPrescriptionBox?.();

		// Aside (se disponível)
		if (typeof window.renderAside === 'function') {
			window.renderAside();
		}

		// Opcional: AdmDrugs (via de administração)
		if (window.AdmDrugsModule?.renderLabelSelect) {
			window.AdmDrugsModule.renderLabelSelect('adm_farmaco_container', {
				labelText: '',
				includeEmpty: true,
			});
		}

		// Aguarda registro no Registry (se disponível)
		if (registry) {
			try {
				const { ready, missing } = await registry.waitForAll(8000);
				if (missing.length) {
					console.warn(`[Tab] Missing components: ${missing.join(', ')}`);
				}
				console.log(`[Tab] ✅ Ready (${ready.length} components)`);
			} catch (err) {
				console.warn('[Tab] Registry wait failed:', err.message);
			}
		}

		// Sinaliza que a tab está pronta
		window.__asideBus?.emit('receituarioReady');
		window.dispatchEvent(new CustomEvent('receituarioReady'));

		console.log('[Tab] ✅ Receituário tab mounted');
	}

	// =========================================
	// ERROR HANDLING
	// =========================================

	function showError(message) {
		const container = document.getElementById('tab-prescricao');
		if (!container) return;
		container.innerHTML = `
      <div class="p-8 bg-red-50 border border-red-200 rounded-lg text-center">
        <h3 class="text-lg font-bold text-red-700 mb-2">Erro ao carregar prescrição</h3>
        <p class="text-sm text-red-600 mb-4">${message}</p>
        <button onclick="window.location.reload()"
          class="px-4 py-2 bg-white border border-red-300 text-red-700 rounded hover:bg-red-50">
          Recarregar Página
        </button>
      </div>
    `;
	}

	// =========================================
	// EXPORT
	// =========================================

	window.renderReceituarioTab = renderReceituarioTab;

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderReceituarioTab);
	} else {
		renderReceituarioTab();
	}
})();
