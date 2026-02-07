// clinica.js
(() => {
	'use strict';

	// ============================================
	// DADOS
	// ============================================
	const ITEMS = window.protocolosClinica || [
		{
			id: 'erro-load',
			title: 'Erro ao carregar dados',
			tags: [],
			summary: 'O arquivo protocolos_clinica.js não foi carregado.',
			rx_text: 'Verifique a importação do script.',
			sections: [],
			references: [],
		},
	];

	// ============================================
	// CONSTANTES DE ESTILO
	// ============================================
	const NEUMORPHIC_TEXT = 'text-[#25282e]';
	const NEUMORPHIC_TEXT_DARK = 'text-[#2d3748]';

	// ============================================
	// UTILITÁRIOS
	// ============================================

	// Copy Helper
	async function copyToClipboard(text) {
		try {
			await navigator.clipboard.writeText(text);
			showToast('Copiado com sucesso!');
			return true;
		} catch (e) {
			console.error('Falha ao copiar', e);
			// Fallback
			const ta = document.createElement('textarea');
			ta.value = text;
			document.body.appendChild(ta);
			ta.select();
			document.execCommand('copy');
			ta.remove();
			showToast('Copiado (fallback).');
			return true;
		}
	}

	let toastTimer = null;
	function showToast(msg) {
		const toast = document.getElementById('toast');
		if (!toast) return;

		const msgEl = toast.querySelector('div');
		if (msgEl) msgEl.textContent = msg || 'OK';

		toast.classList.remove('hidden');
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => toast.classList.add('hidden'), 2000);
	}

	// ============================================
	// RENDER FUNCTION
	// ============================================
	function renderProtocol(id) {
		const protocolCard = document.getElementById('protocolCard');
		if (!protocolCard) return;

		if (!id) {
			protocolCard.innerHTML = `
        <div class="text-center py-12 text-[#25282e]">
          <span class="material-symbols-outlined text-5xl mb-4 text-[#5f6775]">library_books</span>
          <h3 class="text-xl font-medium text-[#2d3748]">Selecione uma patologia</h3>
          <p class="text-[#25282e] mt-2">Escolha um item na lista à esquerda para ver o protocolo clínico e prescrição.</p>
        </div>
      `;
			return;
		}

		const item = ITEMS.find((i) => i.id === id);
		if (!item) return;

		let html = `
      <div class="border-b border-[#c1c9d2] pb-4 mb-4 animate-fadeIn">
        <h2 class="text-xl font-bold ${NEUMORPHIC_TEXT_DARK}">
          <span class="material-symbols-outlined text-xl mr-2 align-middle text-indigo-500">healing</span>
          ${item.title}
        </h2>
        <div class="mt-2 flex flex-wrap gap-2">
          ${(item.tags || [])
						.map(
							(tag) => `
              <span class="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-medium text-indigo-700">
                ${tag}
              </span>
            `,
						)
						.join('')}
        </div>
      </div>

      <div class="mb-6 animate-fadeIn">
        <h3 class="text-lg font-semibold ${NEUMORPHIC_TEXT_DARK} mb-2 flex items-center">
          <span class="material-symbols-outlined mr-2 text-slate-500">short_text</span>
          Resumo
        </h3>
        <div class="bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] p-4 rounded-[15px]">
          <p class="${NEUMORPHIC_TEXT}">${item.summary}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 animate-fadeIn">
        ${(item.sections || [])
					.map(
						(sec) => `
            <div>
              <h4 class="font-bold text-[#2d3748] mb-2 flex items-center text-sm">
                <span class="material-symbols-outlined text-sm mr-2 text-blue-500">check_circle</span>
                ${sec.title}
              </h4>
              <ul class="rounded-[15px] bg-white bg-opacity-60 p-3 space-y-1 shadow-sm">
                ${(sec.bullets || [])
									.map(
										(b) => `
                    <li class="flex items-start text-xs text-[#25282e]">
                      <span class="mr-2 text-slate-400">•</span>
                      ${b}
                    </li>
                  `,
									)
									.join('')}
              </ul>
            </div>
          `,
					)
					.join('')}
      </div>

      <div class="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-[15px] animate-fadeIn">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-bold text-blue-800 flex items-center">
            <span class="material-symbols-outlined mr-2">description</span>
            Sugestão de Prescrição
          </h3>
          <button
            onclick="window.ProtocolosModule.copyRx('${item.id}')"
            class="rounded-[15px] bg-white shadow-sm text-blue-600 px-3 py-1.5 text-xs font-bold hover:text-blue-800 hover:shadow-md transition-all active:scale-95 border border-blue-100 flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-sm">content_copy</span>
            Copiar
          </button>
        </div>
        
        <div class="bg-white p-4 rounded-[15px] shadow-[inset_2px_2px_5px_#e2e8f0,inset_-2px_-2px_5px_#ffffff] font-mono text-xs text-slate-600 whitespace-pre-wrap leading-relaxed border border-slate-100">
${item.rx_text}
        </div>
        <p class="text-[10px] text-blue-400 mt-2 text-right">Verifique doses e alergias antes de prescrever.</p>
      </div>
    `;

		protocolCard.innerHTML = html;
	}

	// ============================================
	// INICIALIZAÇÃO
	// ============================================
	function init() {
		const entitySelect = document.getElementById('entitySelect');
		const protocolCard = document.getElementById('protocolCard');

		if (!entitySelect || !protocolCard) {
			console.warn('Elementos #entitySelect ou #protocolCard não encontrados');
			return;
		}

		// Render Dropdown
		ITEMS.forEach((item) => {
			const opt = document.createElement('option');
			opt.value = item.id;
			opt.textContent = item.title;
			entitySelect.appendChild(opt);
		});

		// Event Listener
		entitySelect.addEventListener('change', function () {
			const id = this.value;
			renderProtocol(id);
		});

		// Render inicial vazio
		renderProtocol('');
	}

	// ============================================
	// EXPÕE API GLOBAL
	// ============================================
	window.ProtocolosModule = {
		init: init,
		render: renderProtocol,
		copyRx: function (itemId) {
			const item = ITEMS.find((i) => i.id === itemId);
			if (item && item.rx_text) {
				copyToClipboard(item.rx_text);
			}
		},
		items: ITEMS,
	};

	// ============================================
	// AUTO-INIT
	// ============================================
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
