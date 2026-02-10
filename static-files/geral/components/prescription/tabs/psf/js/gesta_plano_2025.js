/**
 * Planificacao da Vigilancia da Gravidez
 * Convertido de gesta_plano_2025.html — layout original preservado
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
		`;
		document.head.appendChild(s);
	}

	function injectNeumoCSS() {
		if (document.getElementById('gp-neumo-styles')) return;
		const ns = document.createElement('style');
		ns.id = 'gp-neumo-styles';
		ns.textContent = `
			.neumo-card{background-color:#e0e5ec;box-shadow:2px 2px 4px #aab4c0,-2px -2px 4px #fff}
			.neumo-card-inset{background-color:#e0e5ec;box-shadow:inset 4px 4px 8px #c1c9d2,inset -4px -4px 8px #fff}
			.neumo-button{background-color:#e0e5ec;box-shadow:2px 2px 4px #aab4c0,-2px -2px 4px #fff;color:#5f6775;transition:all .2s ease-in-out}
			.neumo-button:hover{color:#4d3dbc}
			.neumo-button:active{box-shadow:inset 4px 4px 8px #c1c9d2,inset -4px -4px 8px #fff}
			.neumo-input{background-color:#e0e5ec;box-shadow:inset 4px 4px 8px #c1c9d2,inset -4px -4px 8px #fff;color:#5f6775}
			input[type='date']::-webkit-calendar-picker-indicator{cursor:pointer;filter:invert(0.5)}
		`;
		document.head.appendChild(ns);
	}

	function renderGestaPlano() {
		const container = document.getElementById('psf_sub_gesta_plano');
		if (!container) {
			console.error('[GestaPlano] Container #psf_sub_gesta_plano nao encontrado');
			return;
		}

		injectNeuCSS();
		injectNeumoCSS();

		container.innerHTML = `
			<main class="neumo-card w-full max-w-7xl p-6 md:p-8 rounded-2xl">
				<header class="text-center mb-8">
					<h1 class="text-3xl md:text-4xl font-bold text-gray-700">
						<i class="fas fa-baby text-purple-600 mr-2"></i>
						Planificacao da Vigilancia da Gravidez
					</h1>
					<p class="text-lg text-gray-500 mt-2">Datas das Consultas e Exames a realizar</p>
				</header>

				<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<!-- Coluna Esquerda: Inputs -->
					<div class="lg:col-span-1 flex flex-col gap-6">
						<!-- DUM -->
						<section class="neumo-card-inset p-4 rounded-xl">
							<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
								<i class="fas fa-calendar-alt text-purple-600"></i> DUM
							</h3>
							<div class="space-y-3">
								<label for="gp_datepicker" class="block text-sm font-medium">1&ordm; dia do ultimo periodo menstrual:</label>
								<input class="neumo-input w-full p-2 rounded-lg" id="gp_datepicker" type="date" />
								<div class="text-sm">
									<strong>Idade Gestacional (Estimativa):</strong>
									<div class="font-mono">
										<span id="gp_Nsemanas_Est">-</span> semanas e <span id="gp_Ndias_Est">-</span> dias
									</div>
								</div>
								<div class="font-semibold text-purple-700">
									<strong><i class="fas fa-baby-carriage"></i> DPP (DUM):</strong>
									<span id="gp_dataparto" class="font-mono ml-2">-</span>
								</div>
							</div>
						</section>

						<!-- Ecografia -->
						<section class="neumo-card-inset p-4 rounded-xl">
							<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
								<i class="fas fa-laptop-medical text-blue-600"></i> Ecografia 1&ordm; Trimestre
							</h3>
							<div class="space-y-3">
								<label for="gp_datepicker2" class="block text-sm font-medium">Data da Ecografia:</label>
								<input class="neumo-input w-full p-2 rounded-lg" id="gp_datepicker2" type="date" />
								<div class="flex gap-4">
									<div>
										<label for="gp_Nsemanas_Eco" class="text-sm">Semanas:</label>
										<input class="neumo-input w-20 p-2 text-center rounded-lg" id="gp_Nsemanas_Eco" type="number" min="0" />
									</div>
									<div>
										<label for="gp_Ndias_Eco" class="text-sm">Dias:</label>
										<input class="neumo-input w-20 p-2 text-center rounded-lg" id="gp_Ndias_Eco" type="number" min="0" max="6" />
									</div>
								</div>
								<div class="font-semibold text-blue-700">
									<strong><i class="fas fa-baby-carriage"></i> DPP (Eco):</strong>
									<span id="gp_dataparto2" class="font-mono ml-2">-</span>
								</div>
							</div>
						</section>

						<!-- Opcoes -->
						<section class="neumo-card-inset p-4 rounded-xl">
							<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
								<i class="fas fa-cogs"></i> Opcoes
							</h3>
							<div class="space-y-3">
								<label for="gp_nome" class="block text-sm font-medium">Nome (Opcional):</label>
								<input class="neumo-input w-full p-2 rounded-lg" id="gp_nome" type="text" placeholder="Digite o nome da paciente" />
								<strong class="block text-sm font-medium pt-2">Planificar com base:</strong>
								<div class="space-y-2 text-sm">
									<label class="flex items-center gap-2 cursor-pointer">
										<input type="radio" name="gp_gridRadios" id="gp_radio1" value="1" checked class="accent-purple-600" />
										<span>Ultima Menstruacao (DUM)</span>
									</label>
									<label class="flex items-center gap-2 cursor-pointer">
										<input type="radio" name="gp_gridRadios" id="gp_radio2" value="2" class="accent-blue-600" />
										<span>Ecografia 1&ordm; Trimestre</span>
									</label>
								</div>
							</div>
						</section>

						<div class="flex gap-4 justify-center">
							<button type="button" id="gp_planificarBtn" class="neumo-button flex-1 py-3 px-4 rounded-lg font-semibold text-purple-700">
								<i class="fas fa-table mr-2"></i> Planificar
							</button>
						</div>
					</div>

					<!-- Coluna Direita: Resultados -->
					<div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Consultas (DINAMICAS) -->
						<section class="neumo-card-inset p-4 rounded-xl md:col-span-2">
							<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
								<i class="fas fa-stethoscope text-red-500"></i> Consultas de Vigilancia
							</h3>
							<div class="overflow-y-auto max-h-80 text-sm space-y-2">
								<div class="grid grid-cols-4 gap-2 font-semibold border-b pb-1 sticky top-0 bg-[#e0e5ec]">
									<span>Consulta</span><span>De</span><span>Ate</span><span>Info</span>
								</div>
								<div id="gp_consultasBody"></div>
							</div>
						</section>

						<!-- Analises & Rastreios -->
						<section class="neumo-card-inset p-4 rounded-xl">
							<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
								<i class="fas fa-vial text-green-600"></i> Analises &amp; Rastreios
							</h3>
							<div class="text-sm space-y-2">
								<div class="grid grid-cols-4 gap-2 font-semibold border-b pb-1">
									<span>Periodo</span><span>De</span><span>Ate</span><span>Info</span>
								</div>
								<div class="grid grid-cols-4 gap-2 items-center">
									<strong>1&ordm; Tri</strong>
									<span id="gp_analise1a">-</span>
									<span id="gp_analise1b">-</span>
									<a href="#" class="text-blue-600 hover:underline gp-btn-analise-info" data-key="T1">+ info</a>
								</div>
								<div class="grid grid-cols-4 gap-2 items-center">
									<strong>2&ordm; Tri (24-28s)</strong>
									<span id="gp_analise2a">-</span>
									<span id="gp_analise2b">-</span>
									<a href="#" class="text-blue-600 hover:underline gp-btn-analise-info" data-key="T2">+ info</a>
								</div>
								<div class="grid grid-cols-4 gap-2 items-center">
									<strong>3&ordm; Tri (29-36s)</strong>
									<span id="gp_analise3a">-</span>
									<span id="gp_analise3b">-</span>
									<a href="#" class="text-blue-600 hover:underline gp-btn-analise-info" data-key="T3">+ info</a>
								</div>
							</div>
						</section>

						<!-- Ecografias -->
						<section class="neumo-card-inset p-4 rounded-xl">
							<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
								<i class="fas fa-laptop-medical text-blue-600"></i> Ecografias
							</h3>
							<div class="text-sm space-y-2">
								<div class="grid grid-cols-3 gap-2 font-semibold border-b pb-1">
									<span>Trimestre</span><span>De</span><span>Ate</span>
								</div>
								<div class="grid grid-cols-3 gap-2">
									<strong>1&ordm; Trimestre</strong>
									<span id="gp_eco1a">-</span><span id="gp_eco1b">-</span>
								</div>
								<div class="grid grid-cols-3 gap-2">
									<strong>2&ordm; Trimestre</strong>
									<span id="gp_eco2a">-</span><span id="gp_eco2b">-</span>
								</div>
								<div class="grid grid-cols-3 gap-2">
									<strong>3&ordm; Trimestre</strong>
									<span id="gp_eco3a">-</span><span id="gp_eco3b">-</span>
								</div>
							</div>
						</section>

						<!-- Vacinas -->
						<section class="neumo-card-inset p-4 rounded-xl">
							<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
								<i class="fas fa-syringe text-teal-600"></i> Vacinas
							</h3>
							<div class="text-sm space-y-2">
								<div class="grid grid-cols-4 gap-2 font-semibold border-b pb-1">
									<span>Vacina</span><span>De</span><span>Ate</span><span>Ideal</span>
								</div>
								<div class="grid grid-cols-4 gap-2">
									<strong>Tdpa</strong>
									<span id="gp_Tdpa1a">-</span><span id="gp_Tdpa1b">-</span><span id="gp_ideal3">-</span>
								</div>
								<div class="grid grid-cols-4 gap-2 bg-yellow-200/50 rounded p-1">
									<strong>Ig anti-D</strong>
									<span>-</span><span>-</span><span id="gp_ideal4">-</span>
								</div>
							</div>
						</section>

						<!-- Streptococcus B -->
						<section class="neumo-card-inset p-4 rounded-xl">
							<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
								<i class="fas fa-bacteria text-orange-500"></i> Streptococcus B
							</h3>
							<div class="text-sm space-y-2">
								<div class="grid grid-cols-4 gap-2 font-semibold border-b pb-1">
									<span>Exame</span><span>De</span><span>Ate</span><span>Ideal</span>
								</div>
								<div class="grid grid-cols-4 gap-2">
									<strong>Colheita</strong>
									<span id="gp_StreptoB1a">-</span><span id="gp_StreptoB1b">-</span><span id="gp_ideal5">-</span>
								</div>
							</div>
						</section>
					</div>
				</div>
			</main>

			<!-- Modal Overlay -->
			<div id="gp_modalOverlay" class="neu-modal-overlay hidden"></div>

			<!-- Modal de Informacoes -->
			<div id="gp_infoModal" class="neu-modal neu-modal-card hidden" style="max-width:640px">
				<div class="flex flex-col max-h-[85vh] p-4">
					<div class="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
						<h2 id="gp_modalTitle" class="text-xl font-bold text-purple-700">Informacoes</h2>
						<button id="gp_closeModalBtn" type="button" class="text-3xl bg-transparent border-none cursor-pointer">&times;</button>
					</div>
					<div id="gp_modalBody" class="text-sm max-h-[70vh] overflow-y-auto space-y-4"></div>
				</div>
			</div>
		`;

		// =========================================================================
		// ELEMENTOS
		// =========================================================================
		const datepicker = document.getElementById('gp_datepicker');
		const datepicker2 = document.getElementById('gp_datepicker2');
		const semanasEco = document.getElementById('gp_Nsemanas_Eco');
		const diasEco = document.getElementById('gp_Ndias_Eco');
		const semanasEst = document.getElementById('gp_Nsemanas_Est');
		const diasEst = document.getElementById('gp_Ndias_Est');
		const dataparto = document.getElementById('gp_dataparto');
		const dataparto2 = document.getElementById('gp_dataparto2');
		const radio2 = document.getElementById('gp_radio2');
		const consultasBody = document.getElementById('gp_consultasBody');
		const planificarBtn = document.getElementById('gp_planificarBtn');

		const modalOverlay = document.getElementById('gp_modalOverlay');
		const infoModal = document.getElementById('gp_infoModal');
		const modalTitle = document.getElementById('gp_modalTitle');
		const modalBody = document.getElementById('gp_modalBody');
		const closeModalBtn = document.getElementById('gp_closeModalBtn');

		// =========================================================================
		// FUNCOES AUXILIARES DE DATA
		// =========================================================================
		function addDays(date, days) {
			const d = new Date(date);
			d.setDate(d.getDate() + days);
			return d;
		}

		function fmt(d) {
			if (!d || !(d instanceof Date)) return '-';
			const dd = String(d.getDate()).padStart(2, '0');
			const mm = String(d.getMonth() + 1).padStart(2, '0');
			const yyyy = d.getFullYear();
			return dd + '/' + mm + '/' + yyyy;
		}

		// =========================================================================
		// CALCULAR DATAS (DUM E ECO)
		// =========================================================================
		function calcularDatas() {
			const dum = datepicker.value;
			const ecoData = datepicker2.value;
			const ecoSemanasVal = parseInt(semanasEco.value) || 0;
			const ecoDiasVal = parseInt(diasEco.value) || 0;

			if (dum) {
				const baseDate = new Date(dum + 'T00:00:00');
				const dpp = addDays(baseDate, 280);
				const hoje = new Date();
				const diffDias = Math.floor((hoje - baseDate) / (1000 * 60 * 60 * 24));
				if (diffDias >= 0) {
					const semanas = Math.floor(diffDias / 7);
					const dias = diffDias % 7;
					semanasEst.textContent = semanas;
					diasEst.textContent = dias;
				} else {
					semanasEst.textContent = '-';
					diasEst.textContent = '-';
				}
				dataparto.textContent = fmt(dpp);
			}

			if (ecoData && (ecoSemanasVal > 0 || ecoDiasVal > 0)) {
				const dataEco = new Date(ecoData + 'T00:00:00');
				const igEmDias = ecoSemanasVal * 7 + ecoDiasVal;
				const dpp = addDays(dataEco, 280 - igEmDias);
				dataparto2.textContent = fmt(dpp);
			}
		}

		// =========================================================================
		// DADOS INFORMATIVOS DOS MODAIS
		// =========================================================================
		const gruposInfo = {
			G1: {
				titulo: 'Per\u00edodo Inicial (at\u00e9 20s)',
				periodo: '0\u201320 semanas',
				objetivos: [
					'Confirma\u00e7\u00e3o / data\u00e7\u00e3o, hist\u00f3ria cl\u00ednica e exame f\u00edsico',
					'Avalia\u00e7\u00e3o de risco gestacional e orienta\u00e7\u00e3o nutricional',
					'Solicitar 1\u00ba bloco de an\u00e1lises'
				],
				exames: [
					'Ecografia 1\u00ba Tri (11\u201313+6s) com TN',
					'Painel laboratorial inicial'
				],
				orientacoes: [
					'\u00c1cido f\u00f3lico at\u00e9 12\u201313s; atividades e sinais de alerta',
					'Planejar pr\u00f3xima fase de exames/USG'
				]
			},
			G2: {
				titulo: 'Meio de Gesta\u00e7\u00e3o (20\u201332s)',
				periodo: '20\u201332 semanas',
				objetivos: [
					'USG morfol\u00f3gica (20\u201322s)',
					'Rastreio de diabetes (24\u201328s) e anemia',
					'Segundo bloco de an\u00e1lises'
				],
				exames: [
					'PTGO 75g (24\u201328s)',
					'Hemograma; sorologias conforme protocolo'
				],
				orientacoes: [
					'Vacina\u00e7\u00e3o dTpa a partir de 20s (ideal ~32s)',
					'Educa\u00e7\u00e3o sobre sinais de TPP'
				]
			},
			G3: {
				titulo: 'Final da Gesta\u00e7\u00e3o (\u226532s)',
				periodo: '\u226532 semanas',
				objetivos: [
					'Terceiro bloco de an\u00e1lises',
					'Triagem para Strepto B (35\u201337s)',
					'Planejamento/condutas para o parto'
				],
				exames: [
					'Coleta GBS 35\u201337s',
					'Avalia\u00e7\u00f5es de bem-estar fetal conforme servi\u00e7o'
				],
				orientacoes: [
					'Plano de parto, reconhecimento de trabalho de parto',
					'Revis\u00e3o de sinais de alerta'
				]
			}
		};

		const analisesInfo = {
			T1: {
				titulo: '1\u00ba Trimestre \u2014 Painel Laboratorial',
				itens: [
					'Grupo sangu\u00edneo/Rh e Coombs indireto',
					'Hemograma completo',
					'Glicemia em jejum',
					'Toxoplasmose IgG/IgM',
					'EAS e urocultura',
					'TSH (se indicado)',
					'Testes r\u00e1pidos: HIV, S\u00edfilis, Hepatite B'
				]
			},
			T2: {
				titulo: '2\u00ba Trimestre (24\u201328s) \u2014 Painel Laboratorial',
				itens: [
					'PTGO/TOTG 75 g (rastreio de DMG)',
					'Hemograma (anemia)',
					'Repetir sorologia Toxoplasmose se suscet\u00edvel',
					'Testes r\u00e1pidos: HIV, S\u00edfilis, Hepatite B',
					'Coombs indireto se Rh\u2212'
				]
			},
			T3: {
				titulo: '3\u00ba Trimestre (29\u201336s) \u2014 Painel Laboratorial',
				itens: [
					'Hemograma',
					'HIV e VDRL (repeti\u00e7\u00e3o)',
					'Glicemia em jejum',
					'EAS e urocultura',
					'Repetir Toxoplasmose se suscet\u00edvel',
					'Coombs indireto se Rh\u2212'
				]
			}
		};

		// =========================================================================
		// MODAL: ABRIR / FECHAR
		// =========================================================================
		function openModal(info) {
			modalTitle.textContent = info.titulo;
			let htmlContent = '';

			if (info.itens) {
				htmlContent = '<ul class="space-y-2 list-disc list-inside">' +
					info.itens.map(function (x) { return '<li>' + x + '</li>'; }).join('') +
					'</ul>';
			} else {
				htmlContent =
					'<div class="mb-4"><p><strong class="text-purple-700">Per\u00edodo:</strong> ' + info.periodo + '</p></div>' +
					'<div class="mb-4">' +
					'<h4 class="font-bold text-base mb-1"><i class="fas fa-bullseye text-green-500"></i> Objetivos:</h4>' +
					'<ul class="list-disc list-inside">' + info.objetivos.map(function (o) { return '<li>' + o + '</li>'; }).join('') + '</ul>' +
					'</div>' +
					'<div class="mb-4">' +
					'<h4 class="font-bold text-base mb-1"><i class="fas fa-vial text-blue-500"></i> Exames:</h4>' +
					'<ul class="list-disc list-inside">' + info.exames.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul>' +
					'</div>' +
					'<div>' +
					'<h4 class="font-bold text-base mb-1"><i class="fas fa-lightbulb text-yellow-500"></i> Orienta\u00e7\u00f5es:</h4>' +
					'<ul class="list-disc list-inside">' + info.orientacoes.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul>' +
					'</div>';
			}

			modalBody.innerHTML = htmlContent;
			modalOverlay.classList.remove('hidden');
			infoModal.classList.remove('hidden');
		}

		function closeModal() {
			modalOverlay.classList.add('hidden');
			infoModal.classList.add('hidden');
		}

		// =========================================================================
		// WIRE INFO BUTTONS (consultas + analises)
		// =========================================================================
		function wireInfoButtons() {
			container.querySelectorAll('.gp-btn-consulta-info').forEach(function (btn) {
				btn.addEventListener('click', function (e) {
					e.preventDefault();
					const grupoKey = e.currentTarget.getAttribute('data-grupo');
					if (gruposInfo[grupoKey]) {
						openModal(gruposInfo[grupoKey]);
					}
				});
			});
			container.querySelectorAll('.gp-btn-analise-info').forEach(function (btn) {
				btn.addEventListener('click', function (e) {
					e.preventDefault();
					const key = e.currentTarget.getAttribute('data-key');
					if (analisesInfo[key]) {
						openModal(analisesInfo[key]);
					}
				});
			});
		}

		// =========================================================================
		// FUNCAO PRINCIPAL DE PLANIFICACAO
		// =========================================================================
		function Planificar() {
			const dumInput = datepicker.value;
			const useEco = radio2.checked;
			let baseDate;

			if (useEco) {
				const ecoDataInput = datepicker2.value;
				const ecoSemanasVal = parseInt(semanasEco.value) || 0;
				const ecoDiasVal = parseInt(diasEco.value) || 0;
				if (!ecoDataInput || (ecoSemanasVal === 0 && ecoDiasVal === 0)) {
					alert('Para planificar com base na ecografia, por favor, preencha a data e a idade gestacional da eco.');
					return;
				}
				const dataEco = new Date(ecoDataInput + 'T00:00:00');
				const igEmDias = ecoSemanasVal * 7 + ecoDiasVal;
				baseDate = addDays(dataEco, -igEmDias);
			} else {
				if (!dumInput) {
					alert('Por favor, preencha a Data da Ultima Menstruacao.');
					return;
				}
				baseDate = new Date(dumInput + 'T00:00:00');
			}

			// 1. GERACAO DINAMICA DAS CONSULTAS
			consultasBody.innerHTML = '';
			const consultas = [];

			for (let w = 4; w <= 28; w += 4) {
				consultas.push({ start: w, end: w + 4 });
			}
			for (let w = 32; w <= 36; w += 2) {
				consultas.push({ start: w, end: w + 2 });
			}
			for (let w = 37; w <= 40; w += 1) {
				consultas.push({ start: w, end: w + 1 });
			}

			consultas.forEach(function (c, idx) {
				const from = addDays(baseDate, c.start * 7);
				const to = addDays(baseDate, c.end * 7 - 1);
				const grupoKey = c.start < 20 ? 'G1' : c.start <= 32 ? 'G2' : 'G3';
				const div = document.createElement('div');
				div.className = 'grid grid-cols-4 gap-2 items-center';
				div.innerHTML =
					'<strong>Consulta ' + (idx + 1) + ' (' + c.start + 's)</strong>' +
					'<span>' + fmt(from) + '</span>' +
					'<span>' + fmt(to) + '</span>' +
					'<a href="#" class="text-blue-600 hover:underline gp-btn-consulta-info" data-grupo="' + grupoKey + '">+ info</a>';
				consultasBody.appendChild(div);
			});

			// 2. PREENCHIMENTO DAS OUTRAS TABELAS
			function setDataRange(elementId, base, semanaInicio, semanaFim, usarFim, diasExtra) {
				if (typeof usarFim === 'undefined') usarFim = false;
				if (typeof diasExtra === 'undefined') diasExtra = 0;
				const data = new Date(base);
				const semanas = usarFim ? semanaFim : semanaInicio;
				data.setDate(data.getDate() + semanas * 7 + diasExtra);
				const el = document.getElementById(elementId);
				if (el) el.textContent = fmt(data);
			}

			function setDataIdeal(elementId, base, semanas, dias) {
				const data = new Date(base);
				data.setDate(data.getDate() + semanas * 7 + dias);
				const el = document.getElementById(elementId);
				if (el) el.textContent = fmt(data);
			}

			// Janelas de Analises
			setDataRange('gp_analise1a', baseDate, 8, 12);
			setDataRange('gp_analise1b', baseDate, 8, 12, true);
			setDataRange('gp_analise2a', baseDate, 24, 28);
			setDataRange('gp_analise2b', baseDate, 24, 28, true);
			setDataRange('gp_analise3a', baseDate, 29, 36);
			setDataRange('gp_analise3b', baseDate, 29, 36, true);

			// Ecografias
			setDataRange('gp_eco1a', baseDate, 11, 13, false, 6);
			setDataRange('gp_eco1b', baseDate, 11, 13, true, 6);
			setDataRange('gp_eco2a', baseDate, 20, 22);
			setDataRange('gp_eco2b', baseDate, 20, 22, true);
			setDataRange('gp_eco3a', baseDate, 32, 34);
			setDataRange('gp_eco3b', baseDate, 32, 34, true);

			// Vacinas
			setDataRange('gp_Tdpa1a', baseDate, 20, 36);
			setDataRange('gp_Tdpa1b', baseDate, 20, 36, true);
			setDataIdeal('gp_ideal3', baseDate, 32, 0);
			setDataIdeal('gp_ideal4', baseDate, 28, 0);

			// Streptococcus B
			setDataRange('gp_StreptoB1a', baseDate, 35, 37);
			setDataRange('gp_StreptoB1b', baseDate, 35, 37, true);
			setDataIdeal('gp_ideal5', baseDate, 36, 0);

			// 3. REATIVAR OS BOTOES DE INFORMACAO DOS MODAIS
			wireInfoButtons();
		}

		// =========================================================================
		// EVENT LISTENERS
		// =========================================================================
		datepicker.addEventListener('change', calcularDatas);
		datepicker2.addEventListener('change', calcularDatas);
		semanasEco.addEventListener('change', calcularDatas);
		diasEco.addEventListener('change', calcularDatas);
		planificarBtn.addEventListener('click', Planificar);
		closeModalBtn.addEventListener('click', closeModal);
		modalOverlay.addEventListener('click', closeModal);

		// Ativacao inicial dos botoes de info (analises)
		wireInfoButtons();

		console.log('[GestaPlano] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_gesta_plano')) {
		renderGestaPlano();
	}

	window.renderGestaPlano = renderGestaPlano;
})();
