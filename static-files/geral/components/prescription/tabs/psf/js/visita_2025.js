/**
 * Visita Domiciliar
 * Convertido de visita_2025.html — layout original preservado
 */
(function () {
	'use strict';

	function injectNeuCSS() {
		if (document.getElementById('psf-neu-styles')) return;
		const s = document.createElement('style');
		s.id = 'psf-neu-styles';
		s.textContent = `
			.neu-card{background:#e0e5ec;padding:22px;border-radius:24px;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}
			.neu-inset{background:#e0e5ec;padding:18px;border-radius:24px;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}
			.neu-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 22px;border:none;border-radius:60px;background:#e0e5ec;color:#5f6775;font-weight:bold;cursor:pointer;transition:all .2s;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;font-size:13px}
			.neu-btn:hover{color:#007bff;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}
			.neu-btn:active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;color:#23217c;transform:translateY(1px)}
			.neu-btn-primary{color:#007bff}
			.neu-btn-danger{color:#dc3545}
			.neu-btn-success{color:#28a745}
			.neu-btn-info{color:#007bff}
			.neu-btn-container{display:flex;gap:15px;justify-content:center;margin-top:15px}
			.neu-form-group{margin-bottom:20px;display:flex;flex-direction:row;gap:10px;align-items:center;justify-content:center}
			.neu-form-label{font-size:14px;font-weight:500;color:#5f6775;display:flex;align-items:center;gap:10px}
			.neu-form-input{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;height:30px;transition:box-shadow .2s;max-width:80px}
			.neu-form-input:focus{outline:none;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff}
			.neu-form-select{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;transition:box-shadow .2s}
			.neu-form-select:focus{outline:none}
			.neu-form-textarea{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;min-height:100px;resize:vertical;transition:box-shadow .2s}
			.neu-form-textarea:focus{outline:none}
			.neu-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:40}
			.neu-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:95%;max-width:600px;z-index:50;max-height:90vh}
			.neu-modal{background:#e0e5ec;border-radius:36px;padding:18px;margin:20px}
			.neu-tabs-nav{display:flex;gap:10px;flex-wrap:wrap}
			.neu-tab-button{padding:10px 20px;border:none;border-radius:60px;background:#e0e5ec;color:#5f6775;font-weight:500;cursor:pointer;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}
			.neu-tab-button.active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;color:#007bff;font-weight:bold}
			.neu-tab-panel{display:none}
			.neu-tab-panel.active{display:block}
		`;
		document.head.appendChild(s);
	}

	function renderVisita() {
		const container = document.getElementById('psf_sub_visita');
		if (!container) {
			console.error('[Visita] Container #psf_sub_visita não encontrado');
			return;
		}

		injectNeuCSS();

		container.innerHTML = `
			<div class="p-4">
				<header class="text-center flex flex-row justify-start gap-6 m-6">
					<h1 class="text-2xl font-bold text-[#23217c]">
						<i class="fa-solid fa-house-medical-circle-check"></i> Visita Domiciliar
					</h1>
				</header>

				<section class="neu-card" style="font-size:14px">
					<main class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
						<!-- Coluna Esquerda -->
						<div class="flex flex-col gap-6">
							<section class="neu-inset flex flex-col gap-2">
								<h3 class="flex items-center gap-2 font-semibold text-[#23217c] mb-4"><i class="fa-solid fa-calendar-days"></i> Dados Básicos</h3>
								<div class="flex flex-row flex-wrap gap-2">
									<div class="neu-form-group">
										<label for="visita_nome" class="neu-form-label">Nome:</label>
										<input type="text" id="visita_nome" class="neu-form-input" style="max-width:240px" />
									</div>
									<div class="neu-form-group">
										<label for="visita_idade" class="neu-form-label">Idade:</label>
										<input type="number" id="visita_idade" class="neu-form-input" style="max-width:90px" />
									</div>
								</div>
								<div class="flex flex-row flex-wrap gap-2">
									<div class="neu-form-group">
										<label for="visita_data" class="neu-form-label">Data:</label>
										<input type="date" id="visita_data" class="neu-form-input" style="max-width:160px" />
									</div>
									<div class="neu-form-group flex-1">
										<label for="visita_acs" class="neu-form-label">ACS's:</label>
										<textarea id="visita_acs" class="neu-form-textarea w-full" rows="2" style="min-height:50px"></textarea>
									</div>
								</div>
							</section>

							<section class="neu-inset">
								<h3 class="flex items-center gap-2 font-semibold text-[#23217c] mb-4"><i class="fa-solid fa-users"></i> Contexto Familiar</h3>
								<div class="flex flex-col gap-2">
									<div class="neu-form-group">
										<label for="visita_familyAccomp" class="neu-form-label">Visita acompanhada por familiar?</label>
										<select id="visita_familyAccomp" class="neu-form-select" style="max-width:140px">
											<option value="Não">Não</option>
											<option value="Sim">Sim</option>
										</select>
									</div>
									<div class="neu-form-group">
										<label for="visita_familyName" class="neu-form-label">Nome do familiar:</label>
										<input type="text" id="visita_familyName" class="neu-form-input" style="max-width:240px" placeholder="sem acompanhante" />
									</div>
								</div>
							</section>

							<section class="neu-inset">
								<h3 class="flex items-center gap-2 font-semibold text-[#23217c] mb-4"><i class="fa-solid fa-clipboard-list"></i> Planejamento</h3>
								<div class="flex flex-col gap-2">
									<div>
										<button type="button" id="visita_openSavassiBtn" class="neu-btn mb-4" style="font-size:13px">Escala Coelho e Savassi</button>
									</div>
									<div class="neu-form-group">
										<label for="visita_risco" class="neu-form-label">Coelho-Savassi (Classificação):</label>
										<select id="visita_risco" class="neu-form-select">
											<option value="Risco baixo">Risco baixo</option>
											<option value="Risco médio">Risco médio</option>
											<option value="Risco alto">Risco alto</option>
										</select>
									</div>
									<div class="neu-form-group">
										<label class="neu-form-label">Próxima visita (aprox.):</label>
										<p id="visita_proxVisita" class="font-bold text-lg">--/--/----</p>
									</div>
								</div>
							</section>
						</div>

						<!-- Coluna Direita -->
						<div class="grid grid-cols-1 gap-6">
							<section class="neu-inset w-full">
								<h3 class="flex items-center gap-2 font-semibold text-[#23217c] mb-4"><i class="fa-solid fa-file-pen"></i> Avaliação da Visita</h3>
								<div class="neu-form-group">
									<label for="visita_queixa" class="neu-form-label w-1/3">Coelho e Savassi:</label>
									<textarea id="visita_queixa" class="neu-form-textarea w-2/3" rows="2"></textarea>
								</div>
								<div class="neu-form-group">
									<label for="visita_ambiente" class="neu-form-label w-1/3">Ambiente:</label>
									<textarea id="visita_ambiente" class="neu-form-textarea w-2/3" rows="3"></textarea>
								</div>
								<div class="neu-form-group">
									<label for="visita_adesao" class="neu-form-label w-1/3">Adesão</label>
									<textarea id="visita_adesao" class="neu-form-textarea w-2/3" rows="3"></textarea>
								</div>
								<div class="neu-form-group">
									<label for="visita_avaliacao" class="neu-form-label w-1/3">Av. geral:</label>
									<textarea id="visita_avaliacao" class="neu-form-textarea w-2/3" rows="4"></textarea>
								</div>
							</section>

							<section class="neu-inset w-full">
								<h3 class="flex items-center gap-2 font-semibold text-[#23217c] mb-4"><i class="fa-solid fa-pills"></i> Condutas e Registros</h3>
								<div class="neu-form-group">
									<label for="visita_medicacoes" class="neu-form-label w-1/3">Medicações em uso:</label>
									<textarea id="visita_medicacoes" class="neu-form-textarea w-2/3" rows="3"></textarea>
								</div>
								<div class="neu-form-group">
									<label for="visita_exames" class="neu-form-label w-1/3">Últimos exames:</label>
									<textarea id="visita_exames" class="neu-form-textarea w-2/3" rows="3"></textarea>
								</div>
								<div class="neu-form-group">
									<label for="visita_orientacoes" class="neu-form-label w-1/3">Orientações:</label>
									<textarea id="visita_orientacoes" class="neu-form-textarea w-2/3" rows="3"></textarea>
								</div>
							</section>
						</div>
					</main>

					<div class="neu-btn-container mt-8 flex justify-center">
						<button type="button" id="visita_copyBtn" class="neu-btn neu-btn-primary" style="min-width:200px"><i class="fa-solid fa-clipboard mr-2"></i> <span class="text-sm">COPIAR</span></button>
					</div>
				</section>
			</div>

			<!-- MODAL: Escala de Risco de Coelho e Savassi -->
			<div id="visita_savassiModalOverlay" class="neu-modal-overlay hidden"></div>
			<div id="visita_savassiModal" class="neu-modal neu-modal-card hidden">
				<div class="flex flex-col h-[85vh] gap-4 p-4">
					<div class="flex justify-between items-center border-b border-gray-200 pb-4">
						<h2 class="text-xl font-bold flex items-center gap-3 text-[#23217c]"><i class="fa-solid fa-stethoscope"></i> Escala de Coelho e Savassi</h2>
						<button type="button" id="visita_closeModalBtn" class="text-2xl bg-transparent border-none cursor-pointer">&times;</button>
					</div>
					<div class="flex-grow overflow-y-auto flex flex-col gap-4 p-1">
						<section class="neu-inset">
							<h3 class="font-semibold mb-2 text-[#23217c]">Fatores de Risco</h3>
							<div id="visita_fatoresRiscoContainer" class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2"></div>
						</section>
						<section class="neu-inset">
							<h3 class="font-semibold mb-2 text-[#23217c]">Dados Demográficos</h3>
							<div class="neu-form-group">
								<label for="visita_numComodos" class="neu-form-label">Número de cômodos:</label>
								<input type="number" id="visita_numComodos" class="neu-form-input" value="1" min="1" />
							</div>
							<div class="neu-form-group">
								<label for="visita_numMoradores" class="neu-form-label">Número de moradores:</label>
								<input type="number" id="visita_numMoradores" class="neu-form-input" value="1" min="1" />
							</div>
						</section>
						<div class="neu-btn-container">
							<button id="visita_savassiCalcularBtn" type="button" class="neu-btn">Calcular Risco</button>
						</div>
						<section class="neu-inset">
							<h3 class="font-semibold mb-2 text-[#23217c]">Resultado</h3>
							<p><strong>Pontuação Total:</strong> <span id="visita_pontuacaoResult">-</span></p>
							<p><strong>Classificação de Risco:</strong> <span id="visita_classificacaoResult">-</span></p>
							<p><strong>Cômodos por Pessoa:</strong> <span id="visita_comodosPessoaResult">-</span></p>
						</section>
					</div>
					<div class="neu-btn-container">
						<button type="button" id="visita_savassiAplicarBtn" class="neu-btn neu-btn-primary">Aplicar</button>
					</div>
				</div>
			</div>
		`;

		// ===============================
		//  HELPERS
		// ===============================
		const getEl = (id) => document.getElementById(id);
		const getVal = (id) => (getEl(id)?.value ?? '').toString().trim();
		const lineIf = (label, value) => (value ? '- *' + label + ':* ' + value : '');
		const fmtBR = (d) => {
			if (!(d instanceof Date) || isNaN(d)) return '';
			const dd = String(d.getDate()).padStart(2, '0');
			const mm = String(d.getMonth() + 1).padStart(2, '0');
			const yyyy = d.getFullYear();
			return dd + '/' + mm + '/' + yyyy;
		};

		// ===============================
		//  ELEMENTOS
		// ===============================
		const copyBtn = getEl('visita_copyBtn');
		const riscoSelect = getEl('visita_risco');
		const proxVisitaP = getEl('visita_proxVisita');
		const openSavassiBtn = getEl('visita_openSavassiBtn');
		const dataInput = getEl('visita_data');

		// Data padrão = hoje
		dataInput.value = new Date().toISOString().slice(0, 10);

		// ===============================
		//  CLIPBOARD COM FALLBACKS
		// ===============================
		async function copyText(text) {
			try {
				if (navigator?.clipboard?.writeText) {
					await navigator.clipboard.writeText(text);
					return true;
				}
			} catch (e) {}
			try {
				if (typeof window.require === 'function') {
					var clip = window.require('electron').clipboard;
					if (clip?.writeText) { clip.writeText(text); return true; }
				}
			} catch (e) {}
			try {
				var ta = document.createElement('textarea');
				ta.value = text;
				ta.style.position = 'fixed';
				ta.style.opacity = '0';
				ta.style.pointerEvents = 'none';
				document.body.appendChild(ta);
				ta.focus();
				ta.select();
				var ok = document.execCommand('copy');
				document.body.removeChild(ta);
				return ok;
			} catch (e) {
				return false;
			}
		}

		// ===============================
		//  CÁLCULO PRÓXIMA VISITA
		// ===============================
		var calculaProximaVisita = function () {
			var risco = riscoSelect.value;
			var dias = 0;

			switch (risco) {
				case 'Risco alto': dias = 91; break;
				case 'Risco médio': dias = 183; break;
				case 'Risco baixo': dias = 365; break;
			}

			var base = getVal('visita_data') ? new Date(getVal('visita_data') + 'T00:00:00') : new Date();

			if (!isNaN(base) && dias > 0) {
				base.setDate(base.getDate() + dias);
				proxVisitaP.textContent = fmtBR(base);
			} else {
				proxVisitaP.textContent = '--/--/----';
			}

			switch (risco) {
				case 'Risco alto': proxVisitaP.style.color = '#dc3545'; break;
				case 'Risco médio': proxVisitaP.style.color = '#ffc107'; break;
				case 'Risco baixo': proxVisitaP.style.color = '#28a745'; break;
				default: proxVisitaP.style.color = '#5f6775';
			}
		};

		// ===============================
		//  MARKDOWN BUILDER
		// ===============================
		var buildMarkdown = function () {
			var famAcmpText = getVal('visita_familyAccomp');
			var famName = getVal('visita_familyName') || 'sem acompanhante';
			var famText = famAcmpText === 'Sim'
				? 'estava acompanhado(a) de familiar ' + famName
				: 'não estava acompanhado(a) de familiar';

			var dataVisita = getVal('visita_data')
				? fmtBR(new Date(getVal('visita_data') + 'T00:00:00'))
				: fmtBR(new Date());

			var md = [];
			md.push('**VISITA DOMICILIAR** — Data: ' + dataVisita, '');

			var linhaBasica = [
				'*Nome:* ' + getVal('visita_nome'),
				'*Idade:* ' + getVal('visita_idade') + ' anos',
				'*ACS:* ' + getVal('visita_acs')
			].join(' | ');
			md.push('### INFORMAÇÕES BÁSICAS', '- ' + linhaBasica);
			md.push('- *Acompanhamento:* ' + famText);
			md.push('', '#=======================================================================', '');

			md.push('### AVALIAÇÃO DA VISITA');
			var blocoAvaliacao = [
				lineIf('Queixa principal', getVal('visita_queixa')),
				lineIf('Condições do ambiente', getVal('visita_ambiente')),
				lineIf('Adesão ao tratamento', getVal('visita_adesao')),
				lineIf('Avaliação geral', getVal('visita_avaliacao'))
			].filter(Boolean);
			md.push.apply(md, blocoAvaliacao);
			md.push('', '#=======================================================================', '');

			md.push('### CONDUTAS E REGISTROS');
			var blocoCondutas = [
				lineIf('Medicações em uso', getVal('visita_medicacoes')),
				lineIf('Últimos exames', getVal('visita_exames')),
				lineIf('Orientações fornecidas', getVal('visita_orientacoes'))
			].filter(Boolean);
			md.push.apply(md, blocoCondutas);
			md.push('', '#=======================================================================', '');

			md.push('### PLANEJAMENTO');
			md.push(lineIf('Classificação Coelho-Savassi', getVal('visita_risco')));
			md.push(lineIf('Próxima visita (aprox.)', proxVisitaP.textContent));

			return md.filter(Boolean).join('\n');
		};

		// ===============================
		//  AÇÃO DE COPIAR
		// ===============================
		var copiarVisita = async function () {
			var texto = buildMarkdown();
			var ok = await copyText(texto);
			if (ok) {
				alert('Texto da visita (Markdown) copiado para a área de transferência!');
			} else {
				alert('Falha ao copiar. Verifique permissões do Clipboard.');
			}
		};

		// ===============================
		//  BINDINGS FORM
		// ===============================
		riscoSelect.addEventListener('change', calculaProximaVisita);
		dataInput.addEventListener('change', calculaProximaVisita);
		copyBtn.addEventListener('click', copiarVisita);

		// ===============================
		//  MODAL SAVASSI
		// ===============================
		var modal = getEl('visita_savassiModal');
		var overlay = getEl('visita_savassiModalOverlay');
		var closeModalBtn = getEl('visita_closeModalBtn');
		var calcularBtn = getEl('visita_savassiCalcularBtn');
		var aplicarBtn = getEl('visita_savassiAplicarBtn');
		var fatoresContainer = getEl('visita_fatoresRiscoContainer');
		var resultadoCalculado = {};

		var FATORES_DE_RISCO = [
			{ id: 'acamado', label: 'Acamado', peso: 3 },
			{ id: 'deficienciaFisica', label: 'Deficiência física', peso: 3 },
			{ id: 'deficienciaMental', label: 'Deficiência mental', peso: 3 },
			{ id: 'baixoSaneamento', label: 'Baixas condições de saneamento', peso: 3 },
			{ id: 'desnutricaoGrave', label: 'Desnutrição grave', peso: 3 },
			{ id: 'drogadicao', label: 'Drogadição', peso: 2 },
			{ id: 'desemprego', label: 'Desemprego', peso: 2 },
			{ id: 'analfabetismo', label: 'Analfabetismo', peso: 1 },
			{ id: 'menorSeisMeses', label: 'Menor de 6 meses', peso: 1 },
			{ id: 'maiorSetentaAnos', label: 'Maior de 70 anos', peso: 1 },
			{ id: 'hipertensao', label: 'Hipertensão arterial sistêmica', peso: 1 },
			{ id: 'diabetes', label: 'Diabetes mellitus', peso: 1 },
		];

		var openModal = function () {
			modal.classList.remove('hidden');
			overlay.classList.remove('hidden');
		};
		var closeModal = function () {
			modal.classList.add('hidden');
			overlay.classList.add('hidden');
		};

		var calcularRisco = function () {
			var pontuacaoTotal = 0;
			var fatoresSelecionados = [];
			FATORES_DE_RISCO.forEach(function (f) {
				var chk = getEl('visita_chk_' + f.id);
				if (chk && chk.checked) {
					pontuacaoTotal += f.peso;
					fatoresSelecionados.push('- ' + f.label);
				}
			});
			var numComodos = parseInt(getEl('visita_numComodos').value) || 1;
			var numMoradores = parseInt(getEl('visita_numMoradores').value) || 1;
			var comodosPessoa = numComodos / numMoradores;
			if (comodosPessoa < 1) pontuacaoTotal += 3;

			var classificacao = 'Risco baixo';
			if (pontuacaoTotal >= 5) classificacao = 'Risco alto';
			else if (pontuacaoTotal >= 3) classificacao = 'Risco médio';

			getEl('visita_pontuacaoResult').textContent = pontuacaoTotal;
			getEl('visita_classificacaoResult').textContent = classificacao;
			getEl('visita_comodosPessoaResult').textContent = comodosPessoa.toFixed(2);

			resultadoCalculado = {
				pontuacao: pontuacaoTotal,
				classificacao: classificacao,
				comodosPessoa: comodosPessoa.toFixed(2),
				fatores: fatoresSelecionados,
			};
		};

		var aplicarResultado = function () {
			if (!resultadoCalculado.classificacao) {
				alert("Por favor, clique em 'Calcular Risco' primeiro.");
				return;
			}
			var textoFormatado = '\n### Escala de Coelho e Savassi\n';
			textoFormatado += '* Classificação: ' + resultadoCalculado.classificacao + ' (Pontuação: ' + resultadoCalculado.pontuacao + ')\n';
			if (resultadoCalculado.fatores.length > 0) {
				textoFormatado += '* Fatores identificados:\n' + resultadoCalculado.fatores.join('\n');
			}

			riscoSelect.value = resultadoCalculado.classificacao;
			var queixaTextarea = getEl('visita_queixa');
			queixaTextarea.value += (queixaTextarea.value ? '\n' : '') + textoFormatado;
			calculaProximaVisita();
			closeModal();
		};

		// Render checkboxes no modal
		FATORES_DE_RISCO.forEach(function (f) {
			var label = document.createElement('label');
			label.className = 'neu-form-label flex items-center gap-2';
			label.innerHTML = '<input type="checkbox" id="visita_chk_' + f.id + '" class="w-4 h-4 rounded shadow-inner"> ' + f.label;
			fatoresContainer.appendChild(label);
		});

		// Event listeners do modal
		openSavassiBtn.addEventListener('click', openModal);
		closeModalBtn.addEventListener('click', closeModal);
		overlay.addEventListener('click', closeModal);
		calcularBtn.addEventListener('click', calcularRisco);
		aplicarBtn.addEventListener('click', aplicarResultado);

		calculaProximaVisita();
		console.log('[Visita] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_visita')) {
		renderVisita();
	}

	window.renderVisita = renderVisita;
})();
