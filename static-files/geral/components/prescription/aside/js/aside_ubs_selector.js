// aside_ubs_selector.js (REFATORADO)
// EXATO conforme código enviado pelo usuário.
// Sem input de busca. Select + display CNES + botão Aplicar.
(() => {
	'use strict';

	const UBS_CONTAGEM = [
		{ cnes: '2190052', nome: 'UBS Água Branca', bairro: 'Água Branca' },
		{ cnes: '7301189', nome: 'UBS Amazonas', bairro: 'Amazonas' },
		{ cnes: '2190923', nome: 'UBS Amendoeiras', bairro: 'Amendoeiras' },
		{ cnes: '2190427', nome: 'UBS Arpoador', bairro: 'Arpoador' },
		{ cnes: '2190680', nome: 'UBS Bandeirantes', bairro: 'Bandeirantes' },
		{ cnes: '2191040', nome: 'UBS Bela Vista', bairro: 'Bela Vista' },
		{ cnes: '2190109', nome: 'UBS Campina Verde', bairro: 'Campina Verde' },
		{ cnes: '6755976', nome: 'UBS Campo Alto', bairro: 'Campo Alto' },
		{ cnes: '2190478', nome: 'UBS Canadá', bairro: 'Canadá' },
		{ cnes: '2189968', nome: 'UBS Centro', bairro: 'Centro' },
		{ cnes: '2190397', nome: 'UBS Chácaras', bairro: 'Chácaras' },
		{ cnes: '2190591', nome: 'UBS Colorado', bairro: 'Colorado' },
		{ cnes: '2190818', nome: 'UBS Darcy Ribeiro', bairro: 'Darcy Ribeiro' },
		{ cnes: '2190451', nome: 'UBS Duque de Caxias', bairro: 'Duque de Caxias' },
		{ cnes: '2190141', nome: 'UBS Durval de Barros', bairro: 'Durval de Barros' },
		{ cnes: '2190095', nome: 'UBS Eldorado', bairro: 'Eldorado' },
		{ cnes: '2190753', nome: 'UBS Estaleiro', bairro: 'Estaleiro' },
		{ cnes: '7053355', nome: 'UBS Estâncias Imperiais', bairro: 'Estâncias Imperiais' },
		{ cnes: '2190931', nome: 'UBS Estrela Dalva', bairro: 'Estrela Dalva' },
		{ cnes: '2189909', nome: 'UBS Flamengo', bairro: 'Flamengo' },
		{ cnes: '2220261', nome: 'UBS Funcionários', bairro: 'Funcionários' },
		{ cnes: '2190826', nome: 'UBS Icaivera', bairro: 'Icaivera' },
		{ cnes: '2190885', nome: 'UBS Ilda Efigênia', bairro: 'Ilda Efigênia' },
		{ cnes: '4275454', nome: 'UBS Inconfidentes', bairro: 'Inconfidentes' },
		{ cnes: '2189933', nome: 'UBS Industrial III Seção', bairro: 'Industrial III Seção' },
		{ cnes: '2190788', nome: 'UBS Ipê Amarelo', bairro: 'Ipê Amarelo' },
		{ cnes: '2190001', nome: 'UBS Jardim Bandeirantes', bairro: 'Jardim Bandeirantes' },
		{ cnes: '2220245', nome: 'UBS Jardim Eldorado', bairro: 'Jardim Eldorado' },
		{ cnes: '2189992', nome: 'UBS Jardim Industrial', bairro: 'Jardim Industrial' },
		{ cnes: '2190214', nome: 'UBS João Evangelista', bairro: 'João Evangelista' },
		{ cnes: '2190893', nome: 'UBS Joaquim Murtinho', bairro: 'Joaquim Murtinho' },
		{ cnes: '2190184', nome: 'UBS Laguna', bairro: 'Laguna' },
		{ cnes: '2190176', nome: 'UBS Linda Vista', bairro: 'Linda Vista' },
		{ cnes: '2191059', nome: 'UBS Maria da Conceição', bairro: 'Maria da Conceição' },
		{ cnes: '2189984', nome: 'UBS Moacir Pinto Moreira', bairro: 'Moacir Pinto Moreira' },
		{ cnes: '2191199', nome: 'UBS Monte Castelo', bairro: 'Monte Castelo' },
		{ cnes: '2191229', nome: 'UBS Morada Nova', bairro: 'Morada Nova' },
		{ cnes: '2190222', nome: 'UBS Nacional', bairro: 'Nacional' },
		{ cnes: '0181854', nome: 'UBS Nascentes Imperiais', bairro: 'Nascentes Imperiais' },
		{ cnes: '2190834', nome: 'UBS Nova Contagem I', bairro: 'Nova Contagem I' },
		{ cnes: '2190710', nome: 'UBS Nova Contagem II', bairro: 'Nova Contagem II' },
		{ cnes: '2190605', nome: 'UBS Novo Boa Vista', bairro: 'Novo Boa Vista' },
		{ cnes: '6557864', nome: 'UBS Novo Eldorado', bairro: 'Novo Eldorado' },
		{ cnes: '2190567', nome: 'UBS Novo Progresso II', bairro: 'Novo Progresso II' },
		{ cnes: '2190044', nome: 'UBS Novo Riacho', bairro: 'Novo Riacho' },
		{ cnes: '2190877', nome: 'UBS Oitis', bairro: 'Oitis' },
		{ cnes: '2190990', nome: 'UBS Parque São João', bairro: 'Parque São João' },
		{ cnes: '2190494', nome: 'UBS Parque Turista', bairro: 'Parque Turista' },
		{ cnes: '2190966', nome: 'UBS Perobas', bairro: 'Perobas' },
		{ cnes: '2190206', nome: 'UBS Petrolândia', bairro: 'Petrolândia' },
		{ cnes: '7110316', nome: 'UBS Praia', bairro: 'Praia' },
		{ cnes: '2190869', nome: 'UBS Presidente Kennedy', bairro: 'Presidente Kennedy' },
		{ cnes: '2190540', nome: 'UBS Retiro', bairro: 'Retiro' },
		{ cnes: '2189844', nome: 'UBS Riacho', bairro: 'Riacho' },
		{ cnes: '2190192', nome: 'UBS Sandoval de Azevedo', bairro: 'Sandoval de Azevedo' },
		{ cnes: '4311833', nome: 'UBS Santa Cruz', bairro: 'Santa Cruz' },
		{ cnes: '2190389', nome: 'UBS Santa Helena', bairro: 'Santa Helena' },
		{ cnes: '2190486', nome: 'UBS São Joaquim', bairro: 'São Joaquim' },
		{ cnes: '2190656', nome: 'UBS São Judas Tadeu', bairro: 'São Judas Tadeu' },
		{ cnes: '2190524', nome: 'UBS São Luiz I', bairro: 'São Luiz I' },
		{ cnes: '2190508', nome: 'UBS São Luiz II', bairro: 'São Luiz II' },
		{ cnes: '2190435', nome: 'UBS Sapucaias', bairro: 'Sapucaias' },
		{ cnes: '7116306', nome: 'UBS Tijuca', bairro: 'Tijuca' },
		{ cnes: '2190400', nome: 'UBS Tropical II', bairro: 'Tropical II' },
		{ cnes: '4696077', nome: 'UBS Unidade XVI', bairro: 'Unidade XVI' },
		{ cnes: '2191202', nome: 'UBS Vila Diniz', bairro: 'Vila Diniz' },
		{ cnes: '2190796', nome: 'UBS Vila Esperança', bairro: 'Vila Esperança' },
		{ cnes: '2191024', nome: 'UBS Vila Itália', bairro: 'Vila Itália' },
		{ cnes: '2190532', nome: 'UBS Vila Pérola', bairro: 'Vila Pérola' },
		{ cnes: '2190648', nome: 'UBS Vila Renascer', bairro: 'Vila Renascer' },
		{ cnes: '2190060', nome: 'UBS Vila São Paulo', bairro: 'Vila São Paulo' },
		{ cnes: '2190729', nome: 'UBS Vila Soledade', bairro: 'Vila Soledade' },
		{ cnes: '2190915', nome: 'UBS Xangrilá', bairro: 'Xangrilá' },
		{ cnes: '2190087', nome: 'UBS XV', bairro: 'XV' },
	].sort((a, b) => a.nome.localeCompare(b.nome));

	let bus;
	let abortController = null;

	// =========================================
	// RENDER
	// =========================================

	function render() {
		const container = document.getElementById('aside_ubs_selector');
		if (!container) return;

		bus = window.__asideBus;
		abortController?.abort();
		abortController = new AbortController();
		const signal = abortController.signal;

		container.innerHTML = `
      <div class="rounded-2xl shadow-lg border border-slate-50 bg-white p-4 m-2 max-w-[340px] mb-4 relative z-10 print:hidden">
        <h3 class="text-lg justify-center font-bold mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">apartment</span>
          UBS's de Contagem/MG
        </h3>

        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-2 px-6">
            <select
              id="select-unidade"
              class="w-full shadow-lg px-4 py-2 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none text-sm">
              <option value="">Selecione a UBS</option>
              ${buildOptions()}
            </select>
          </div>

          <div id="ubs-cnes-display" class="hidden bg-slate-50 p-3 rounded-lg">
						<div class="flex justify-self-center items-center gap-2 mb-6 ">
							<i class="fa-solid fa-network-wired text-sm"></i>
							<label class="text-center text-sm font-medium">CNES:</label>
						</div>
						<div class="flex items-center justify-between gap-2 px-4">
							<div class="flex items-center gap-2 flex-1">
                
                <input
                  type="text"
                  id="ubs-cnes-value"
                  readonly
                  class="w-full  shadow-lg px-3 py-3 rounded-lg border-2 border-slate-300 bg-white text-sm font-mono cursor-default" />
              </div>
              <button
                id="btn-aplicar-ubs"
                class="inline-flex w-full max-w-[100px] max-h-[44px] h-[44px] font-medium shadow-lg items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-green-600 text-sm transition-colors">
                <i class="fa-solid fa-check text-sm"></i>
                Aplicar
              </button>
            </div>
          </div>

          <p class="text-xs text-gray-500">
            💡 Selecione sua unidade e clique em Aplicar
          </p>
        </div>
      </div>
    `;

		bindEvents(signal);
		registerComponent();
	}

	// =========================================
	// EVENTS
	// =========================================

	function bindEvents(signal) {
		const select = document.getElementById('select-unidade');
		const displayContainer = document.getElementById('ubs-cnes-display');
		const cnesValue = document.getElementById('ubs-cnes-value');
		const btnAplicar = document.getElementById('btn-aplicar-ubs');

		// Seleção mostra CNES
		select?.addEventListener(
			'change',
			(e) => {
				const cnes = e.target.value;
				if (cnes) {
					displayContainer?.classList.remove('hidden');
					if (cnesValue) cnesValue.value = cnes;
				} else {
					displayContainer?.classList.add('hidden');
				}
			},
			{ signal },
		);

		// Aplicar
		btnAplicar?.addEventListener(
			'click',
			() => {
				applySelection(select?.value);
			},
			{ signal },
		);

		// Duplo clique = aplicar
		select?.addEventListener(
			'dblclick',
			() => {
				if (select.value) applySelection(select.value);
			},
			{ signal },
		);
	}

	// =========================================
	// LOGIC
	// =========================================

	function buildOptions(filter = '') {
		const list = filter ? UBS_CONTAGEM.filter((u) => u.nome.toLowerCase().includes(filter.toLowerCase()) || u.cnes.includes(filter)) : UBS_CONTAGEM;

		return list.map((u) => `<option value="${u.cnes}">${u.nome}</option>`).join('');
	}

	function applySelection(cnes) {
		if (!cnes) return;

		const ubs = UBS_CONTAGEM.find((u) => u.cnes === cnes);
		if (!ubs) return;

		bus?.emit('ubsSelected', {
			cnes,
			nome: ubs.nome,
			bairro: ubs.bairro,
		});

		showToast(`UBS ${ubs.nome} selecionada`, 'success');
	}

	function showToast(message, type) {
		const colors = { success: 'bg-green-500', info: 'bg-blue-500' };
		const toast = document.createElement('div');
		toast.textContent = message;
		toast.className = `fixed bottom-6 right-6 ${colors[type] || colors.info} text-white px-2  py-3 rounded-lg shadow-lg z-[9999] transition-opacity duration-300`;
		document.body.appendChild(toast);
		setTimeout(() => {
			toast.style.opacity = '0';
			setTimeout(() => toast.remove(), 300);
		}, 2500);
	}

	// =========================================
	// REGISTRO & LIFECYCLE
	// =========================================

	function registerComponent() {
		window.__asideRegistry?.register('ubs-selector', {
			render,
			destroy,
			getUBSList: () => UBS_CONTAGEM,
		});
	}

	function destroy() {
		abortController?.abort();
		abortController = null;
		const container = document.getElementById('aside_ubs_selector');
		if (container) container.innerHTML = '';
	}

	window.renderUBSSelector = render;
})();
