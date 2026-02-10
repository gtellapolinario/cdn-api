(() => {
	'use strict';

	/**
	 * Renderiza a aba de Incidências Radiográficas
	 */
	function renderRadioTab() {
		const container = document.getElementById('tab_radio'); // Container ID sugerido

		if (!container) {
			console.error('Container #tab_radio não encontrado');
			return;
		}

		// Injeta o HTML com classes arbitrárias (substituindo as customizadas para garantir o visual sem config externa)
		container.innerHTML = `
      <!-- Dependências de Ícones (se já não estiverem no head principal) -->
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      
      <!-- Keyframes para animação slideDown -->
      <style>
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease;
        }
      </style>

      <div class="bg-[#e0e5ec] text-[#333] font-sans antialiased min-h-screen p-5">
        <div class="max-w-[1440px] min-h-[800px] mx-auto bg-[#e0e5ec] rounded-[30px] p-10 pt-10 pb-2.5 shadow-[15px_15px_30px_#a3b1c6,-15px_-15px_30px_#ffffff]">
          
          <div class="text-center mb-10">
            <h1 class="text-[#4a4a4a] drop-shadow-[2px_2px_4px_rgba(255,255,255,0.5)] text-4xl flex items-center justify-center gap-4">
              <div class="w-[50px] h-[50px] bg-[#e0e5ec] rounded-full flex items-center justify-center shadow-[8px_8px_15px_#a3b1c6,-8px_-8px_15px_#ffffff]">
                <i class="fas fa-x-ray text-2xl text-[#5a9fd4]"></i>
              </div>
              Incidências Radiográficas
            </h1>
            <p class="text-[#6a6a6a] text-base mt-2.5">Sistema de Consulta Rápida para Profissionais de Saúde</p>
          </div>

          <div class="mb-5 relative">
            <input type="text" class="w-full md:w-3/5 p-2.5 pl-10 border-none rounded-[25px] bg-[#e0e5ec] text-[#333] text-sm shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] focus:outline-none block" id="radioSearchBox" placeholder="Pesquisar região ou incidência..." />
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#5a9fd4] text-sm"></i>
          </div>

          <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 mb-2.5" id="regionsGrid">
            <!-- Regions will be dynamically inserted here -->
          </div>

          <div class="hidden bg-[#e0e5ec] rounded-[20px] p-[30px] mt-[30px] shadow-[inset_8px_8px_15px_#a3b1c6,inset_-8px_-8px_15px_#ffffff]" id="incidenciasPanel">
            <div class="flex justify-between items-center mb-[25px]">
              <h2 class="text-2xl text-[#4a4a4a] font-bold" id="panelTitle"></h2>
              <button type="button" id="closePanelBtn" class="w-[40px] h-[40px] bg-[#e0e5ec] border-none rounded-full cursor-pointer shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#a3b1c6,inset_-5px_-5px_10px_#ffffff] transition-all duration-300 flex items-center justify-center">
                <i class="fas fa-times text-[#e74c3c] text-lg"></i>
              </button>
            </div>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[15px]" id="incidenciasList">
              <!-- Incidências will be dynamically inserted here -->
            </div>
          </div>

          <div class="flex justify-center items-end text-center mt-[100px] gap-[10px] pt-[10px] border-t-2 border-[#d0d5dc] text-[#6a6a6a]">Desenvolvido com <i class="fas fa-heart text-[#e74c3c]"></i> por <strong>Dr. Guilherme</strong></div>
        </div>
      </div>
    `;

		initializeRadioTab(container);
	}

	function initializeRadioTab(container) {
		const incidenciasData = {
			'Tórax e Vias Aéreas': {
				icon: 'fa-lungs',
				incidencias: ['Tórax - PA e Lateral', 'Esterno – OAD e Lateral', 'Art. Esterno-Clavicular – PA, OAD e OAE', 'Costelas Posteriores – AP, OPD e OPE', 'Costelas Anteriores – PA, OAD e OPE', 'Vias aéreas superiores - AP e Lateral'],
			},
			'Abdome e Pelve': {
				icon: 'fa-hospital',
				incidencias: [
					'Abdome - AP em Decúbito Dorsal',
					'RAA - Tórax PA, Abdome em Decúbito Dorsal e Abdome em AP Ortostrica',
					'Pelves (Bacia) - AP e AP perna de Rã, para traumatismo apenas AP',
					'Quadril - AP e Axial Lateral',
					'Art. Sacro-Ilíaca – Axial AP e Oblíquas',
				],
			},
			'MM.SS.': {
				icon: 'fa-hand-paper',
				incidencias: [
					'Dedos da mão do 2º ao 5º - PA, Lateral e Oblíqua',
					'Polegar - AP, Lateral e Oblíqua',
					'Mão - PA, Lateral e Oblíqua',
					'Mão e Punho para Idade Óssea - PA Comparativa',
					'Punho - PA, Lateral e Oblíqua',
					'Antebraço - AP e Lateral',
					'Cotovelo - AP e Lateral',
					'Úmero - AP e Lateral',
					'Ombro - AP com rotação externa e interna',
					'Ombro em traumatismo - AP com rotação neutra, Lateral escapular ou Transtorácica',
					'Clavícula - AP e AP Axial',
					'Art. Acromioclavicular - AP Bilateral com e sem estresse',
					'Escápula - AP e Lateral',
				],
			},
			'MM.II.': {
				icon: 'fa-walking',
				incidencias: [
					'Dedos dos pés - AP, Lateral e Oblíqua',
					'Pé - AP, Lateral e Oblíqua',
					'Calcâneo - Axial e Lateral',
					'Tornozelo - AP, AP do encaixe, Lateral e Oblíqua',
					'Joelho - AP, Lateral e Oblíqua',
					'Patela - PA, Lateral e Tangencial',
					'Perna - AP e Lateral',
					'Fêmur – AP e Lateral',
				],
			},
			'Coluna Vertebral': {
				icon: 'fa-spine',
				incidencias: [
					'Coluna Cervical - Axial AP, Transoral, Lateral e Oblíqua',
					'Coluna Dorsal ou Torácica - AP e Lateral',
					'Coluna Lombar - AP, Lateral e Oblíqua',
					'Sacro e Cóccix - Axial AP e Lateral',
					'Rotina para Escoliose – AP e Lateral',
					'Rotina para Fusão Vertebral – AP com inclinação Esquerda e Direita Lateral com Hiperextensão e Hiperflexão',
				],
			},
			'Cabeça e Face': {
				icon: 'fa-head-side-virus',
				incidencias: [
					'Crânio - AP Axial, PA e Lateral',
					'Ossos da Face - Caldwell, Waters e Lateral',
					'Ossos Nasais - Waters e Lateral',
					'Mandíbula - Axial Lateral, PA e Axial AP',
					'Seios da Face - Caldwell, Waters e Lateral',
					'Arcos Zigomáticos – Axial AP Submentovertice e Tangencial',
					'Pirâmide – Rhêse, Caldwell e Waters',
					"ATM's – Axial Lateral e Oblíqua Axial Lateral",
					'Mastoides – Oblíqua Axial Lateral, Oblíqua Axial Anterior e Axial AP',
					'Sela Turcica – Axial AP e Lateral',
				],
			},
		};

		function showIncidencias(region) {
			const panel = container.querySelector('#incidenciasPanel');
			const title = container.querySelector('#panelTitle');
			const list = container.querySelector('#incidenciasList');

			title.textContent = region;
			list.innerHTML = '';

			incidenciasData[region].incidencias.forEach((incidencia) => {
				const item = document.createElement('div');
				item.className = 'bg-[#e0e5ec] p-[15px_20px] rounded-[15px] flex items-center gap-[12px] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] transition-all duration-200 hover:shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff]';

				let htmlContent = incidencia;
				if (incidencia.includes(' - ') || incidencia.includes(' – ')) {
					const separator = incidencia.includes(' - ') ? ' - ' : ' – ';
					const parts = incidencia.split(separator);
					const titulo = parts[0];
					const descricao = parts.slice(1).join(separator);
					htmlContent = `<strong>${titulo}</strong>${separator}${descricao}`;
				}

				item.innerHTML = `
          <div class="w-[35px] h-[35px] bg-[#e0e5ec] rounded-full flex items-center justify-center shadow-[3px_3px_6px_#a3b1c6,-3px_-3px_6px_#ffffff] flex-shrink-0">
              <i class="fas fa-x-ray text-[16px] text-[#5a9fd4]"></i>
          </div>
          <div class="text-[#4a4a4a] text-[0.95em] leading-[1.4]">${htmlContent}</div>
        `;
				list.appendChild(item);
			});

			panel.classList.remove('hidden');
			panel.classList.add('animate-slideDown');
			panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}

		function renderRegions() {
			const grid = container.querySelector('#regionsGrid');
			grid.innerHTML = '';

			Object.keys(incidenciasData).forEach((region) => {
				const data = incidenciasData[region];
				const card = document.createElement('div');
				card.className = 'bg-[#e0e5ec] rounded-[20px] p-5 cursor-pointer transition-all duration-300 shadow-[8px_8px_15px_#a3b1c6,-8px_-8px_15px_#ffffff] hover:-translate-y-1 hover:shadow-[12px_12px_20px_#a3b1c6,-12px_-12px_20px_#ffffff] region-card';

				// Event Listener direto no elemento, evitando funções globais
				card.onclick = () => showIncidencias(region);

				card.innerHTML = `
          <div class="flex items-center gap-[15px]">
              <div class="w-[40px] h-[40px] bg-[#e0e5ec] rounded-full flex items-center justify-center shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] flex-shrink-0">
                  <i class="fas ${data.icon} text-[20px] text-[#5a9fd4]"></i>
              </div>
              <div>
                  <div class="text-base font-bold text-[#4a4a4a]">${region}</div>
                  <div class="text-[0.9em] text-[#8a8a8a] mt-[5px]">${data.incidencias.length} incidências</div>
              </div>
          </div>
        `;

				grid.appendChild(card);
			});
		}

		function closePanel() {
			const panel = container.querySelector('#incidenciasPanel');
			panel.classList.add('hidden');
			panel.classList.remove('animate-slideDown');
		}

		// Inicializar Search Listener
		const searchBox = container.querySelector('#radioSearchBox');
		searchBox.addEventListener('input', function (e) {
			const searchTerm = e.target.value.toLowerCase();
			const cards = container.querySelectorAll('.region-card');

			cards.forEach((card) => {
				const text = card.textContent.toLowerCase();
				if (text.includes(searchTerm)) {
					card.style.display = 'block';
				} else {
					card.style.display = 'none';
				}
			});
		});

		// Inicializar Close Button Listener
		const closeBtn = container.querySelector('#closePanelBtn');
		if (closeBtn) {
			closeBtn.addEventListener('click', closePanel);
		}

		// Renderizar inicialmente
		renderRegions();
	}

	// Expor globalmente
	window.renderRadioTab = renderRadioTab;

	// Auto-executar se o DOM já estiver pronto
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderRadioTab);
	} else {
		renderRadioTab();
	}
})();
