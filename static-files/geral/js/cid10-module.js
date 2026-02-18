(() => {
	'use strict';

	// Ajuste conforme necessário - endpoint da API de CID
	const API_URL = 'https://api-cid.gtmedics.com';

	/**
	 * Busca CID-10 na API
	 * @param {string} query Termo de busca (código ou descrição)
	 * @returns {Promise<Array>} Lista de resultados
	 */
	async function searchCid(query) {
		// Evita chamadas vazias (min 2 caracteres conforme pedido)
		if (!query || query.length < 2) return [];

		try {
			const res = await fetch(`${API_URL}/cid/search?q=${encodeURIComponent(query)}`);

			if (!res.ok) {
				throw new Error(`Erro na busca: ${res.statusText}`);
			}

			const data = await res.json();

			// Lógica defensiva do snippet do usuário
			if (Array.isArray(data)) {
				return data;
			} else if (data && Array.isArray(data.results)) {
				return data.results;
			}

			return [];
		} catch (error) {
			console.error('Erro ao buscar CID:', error);
			return [];
		}
	}

	/**
	 * Configura o autocomplete para um par de inputs (código e descrição)
	 * @param {string|HTMLElement} inputCidId ID ou elemento do input de código (ex: lme_cid)
	 * @param {string|HTMLElement} inputDescId ID ou elemento do input de descrição (ex: lme_diagnostico)
	 */
	function setupCidSearch(inputCidId, inputDescId) {
		const elCid = typeof inputCidId === 'string' ? document.getElementById(inputCidId) : inputCidId;
		const elDesc = typeof inputDescId === 'string' ? document.getElementById(inputDescId) : inputDescId;

		if (!elCid) {
			console.warn('Input CID não encontrado:', inputCidId);
			return;
		}

		// Garante posição relativa no pai para posicionar a lista
		if (elCid.parentNode) {
			elCid.parentNode.style.position = 'relative';
		}

		// Cria lista de sugestões
		let suggestionsBox = document.createElement('div');
		suggestionsBox.className = 'absolute z-[9999] bg-white border border-gray-300 w-[300px] max-h-48 overflow-y-auto shadow-lg hidden';
		suggestionsBox.style.top = '100%';
		suggestionsBox.style.left = '0';

		if (elCid.parentNode) {
			elCid.parentNode.appendChild(suggestionsBox);
		}

		let debounceTimer;

		console.log('SetupCidSearch anexado a:', elCid.id);

		elCid.addEventListener('input', (e) => {
			const term = e.target.value;
			clearTimeout(debounceTimer);

			// Ajustado para 2 caracteres conforme pedido
			if (term.length < 2) {
				suggestionsBox.innerHTML = '';
				suggestionsBox.classList.add('hidden');
				return;
			}

			debounceTimer = setTimeout(async () => {
				suggestionsBox.innerHTML = '<div class="p-2 text-[10px] text-gray-500">Buscando...</div>';
				suggestionsBox.classList.remove('hidden');

				const results = await searchCid(term);

				suggestionsBox.innerHTML = '';
				if (!results || results.length === 0) {
					suggestionsBox.innerHTML = '<div class="p-2 text-[10px] text-gray-500">Nenhum resultado</div>';
				} else {
					results.forEach((item) => {
						const div = document.createElement('div');
						div.className = 'p-2 hover:bg-blue-50 cursor-pointer text-[10px] border-b border-gray-100 flex flex-col';
						// item: { code: "A00", description: "Cólera" }
						// Ajuste para exibir codigo e descrição claramente
						div.innerHTML = `
                            <span class="font-bold text-blue-700">${item.code}</span>
                            <span class="text-gray-600 truncate">${item.description || item.nome || ''}</span>
                        `;

						div.onclick = () => {
							elCid.value = item.code;
							if (elDesc) elDesc.value = item.description || item.nome || '';
							suggestionsBox.innerHTML = '';
							suggestionsBox.classList.add('hidden');
						};
						suggestionsBox.appendChild(div);
					});
				}
			}, 300); // Debounce levemente menor
		});

		// Fecha ao clicar fora
		document.addEventListener('click', (e) => {
			if (!elCid.contains(e.target) && !suggestionsBox.contains(e.target)) {
				suggestionsBox.classList.add('hidden');
			}
		});
	}

	window.Cid10Module = {
		searchCid,
		setupCidSearch,
	};

	console.log('✅ CID-10 Module carregado');
})();
