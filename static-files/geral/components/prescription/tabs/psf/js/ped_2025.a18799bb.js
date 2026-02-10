/**
 * Apoio a Puericultura
 * Convertido de ped_2025.html — layout original preservado
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
			.neu-tree-node{cursor:pointer;padding:0.25rem;border-radius:5px}
			.neu-tree-node:hover{background-color:#e2e8f0}
			.neu-tree-children{display:none;padding-left:1.5rem}
			.neu-tree-children.open{display:block}
			.neu-custom-table{width:100%;border-collapse:collapse}
			.neu-custom-table th,.neu-custom-table td{padding:0.75rem;border-bottom:1px solid #d1d9e6;text-align:left}
			.neu-custom-table thead th{position:sticky;top:0;background-color:#e0e5ec;font-weight:600}
			.neu-custom-table tbody tr:hover{background-color:#e2e8f0}
			.neu-nori-table{width:100%;border-collapse:collapse}
			.neu-nori-table th,.neu-nori-table td{padding:0.5rem;border-bottom:1px solid #d1d9e6;text-align:left;font-size:13px}
			.neu-nori-table thead th{position:sticky;top:0;background-color:#e0e5ec;font-weight:600}
			.neu-nori-table tbody tr:hover{background-color:#e2e8f0}
			.neu-neumo-modal{background:#e0e5ec;border-radius:24px;padding:24px;box-shadow:8px 8px 16px #c1c9d2,-8px -8px 16px #fff}
			.neu-neumo-card-inset{background:#e0e5ec;padding:12px;border-radius:16px;box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff}
			.neu-neumo-checkbox{width:18px;height:18px;cursor:pointer}
			.neu-neumo-button{display:inline-flex;align-items:center;justify-content:center;padding:10px 20px;border:none;border-radius:12px;cursor:pointer;font-weight:600;transition:all .2s;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}
			.neu-neumo-button:hover{box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}
			.neu-neumo-button:active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;transform:translateY(1px)}
			.neu-check-mark{color:#22c55e;font-weight:bold;font-size:18px}
		`;
		document.head.appendChild(s);
	}

	function renderPed() {
		const container = document.getElementById('psf_sub_ped');
		if (!container) {
			console.error('[Ped] Container #psf_sub_ped nao encontrado');
			return;
		}

		injectNeuCSS();

		// ===============================
		//  HTML PRINCIPAL
		// ===============================
		container.innerHTML = `
			<div class="p-4">
				<header class="text-center flex flex-row items-center justify-start gap-2 mb-4">
					<h1 class="text-2xl font-bold flex items-center justify-center gap-3 text-[#23217c]">
						<i class="fa-solid fa-baby text-3xl"></i>
						Apoio \u00e0 Puericultura
					</h1>
				</header>

				<!-- GRID PRINCIPAL -->
				<div class="space-y-6">
					<div class="grid gap-6 lg:grid-cols-3 auto-rows-max">
						<!-- 1) TOP ESQUERDA - Pr\u00e9-Natal e Nascimento -->
						<section class="neu-inset flex flex-col gap-4 justify-start items-start h-full lg:col-span-1 lg:row-start-1">
							<h3 class="font-semibold text-lg mb-4">Pr\u00e9-Natal e Nascimento</h3>
							<div class="flex flex-row gap-4">
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_prenatal" class="neu-form-label" style="font-size:12px;font-weight:600">Pr\u00e9-Natal</label>
									<select id="ped_prenatal" class="neu-form-select" style="font-size:12px;max-height:50px">
										<option value=""></option>
										<option>Habitual</option>
										<option>DMG</option>
										<option>DHEG</option>
										<option>TORCHS</option>
									</select>
								</div>
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_pesoNasc" class="neu-form-label" style="font-size:12px;font-weight:600">Peso (g)</label>
									<input type="number" id="ped_pesoNasc" class="neu-form-input" style="font-size:12px;max-width:100px" />
								</div>
							</div>
							<div class="flex flex-row gap-4">
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_parto" class="neu-form-label" style="font-size:12px;font-weight:600">Parto</label>
									<select id="ped_parto" class="neu-form-select" style="font-size:12px;max-height:50px">
										<option value=""></option>
										<option>Normal</option>
										<option>Ces\u00e1reo</option>
									</select>
								</div>
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_compNasc" class="neu-form-label" style="font-size:12px;font-weight:600">Comp. (cm)</label>
									<input type="number" id="ped_compNasc" class="neu-form-input" style="font-size:12px;max-width:100px" />
								</div>
							</div>
							<div class="flex flex-row gap-4">
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_pcNasc" class="neu-form-label" style="font-size:12px;font-weight:600">PC (cm)</label>
									<input type="number" id="ped_pcNasc" class="neu-form-input" style="font-size:12px;max-width:100px" />
								</div>
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_aig" class="neu-form-label" style="font-size:12px;font-weight:600">Classifica\u00e7\u00e3o</label>
									<select id="ped_aig" class="neu-form-select" style="font-size:12px;max-height:50px">
										<option></option>
										<option>PIG</option>
										<option>AIG</option>
										<option>GIG</option>
									</select>
								</div>
							</div>
							<div class="flex flex-row gap-4">
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_termo" class="neu-form-label" style="font-size:12px;font-weight:600">Termo</label>
									<select id="ped_termo" class="neu-form-select" style="font-size:12px;max-height:50px">
										<option></option>
										<option>Pr\u00e9-termo</option>
										<option>A termo</option>
										<option>P\u00f3s-termo</option>
									</select>
								</div>
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_apgar" class="neu-form-label" style="font-size:12px;font-weight:600">Apgar</label>
									<input type="text" id="ped_apgar" class="neu-form-input" style="font-size:12px;max-width:100px" placeholder="ex: 9/10" />
								</div>
							</div>
						</section>

						<!-- 2) TOP CENTRO - Consulta Atual -->
						<section class="neu-inset lg:col-span-1 lg:row-start-1">
							<h3 class="font-semibold text-lg mb-4">Consulta Atual</h3>
							<div class="grid grid-cols-2 gap-4">
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_idade" class="neu-form-label" style="font-size:12px;font-weight:600">Idade (m)</label>
									<input type="number" id="ped_idade" class="neu-form-input" style="font-size:12px;max-width:100px" />
								</div>
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_peso" class="neu-form-label" style="font-size:12px;font-weight:600">Peso (g)</label>
									<input type="number" id="ped_peso" class="neu-form-input" style="font-size:12px;max-width:100px" />
								</div>
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_comp" class="neu-form-label" style="font-size:12px;font-weight:600">Comp. (cm)</label>
									<input type="number" id="ped_comp" class="neu-form-input" style="font-size:12px;max-width:100px" />
								</div>
								<div class="neu-form-group" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_pc" class="neu-form-label" style="font-size:12px;font-weight:600">PC (cm)</label>
									<input type="number" id="ped_pc" class="neu-form-input" style="font-size:12px;max-width:100px" />
								</div>
								<div class="neu-form-group col-span-2" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_alimentacao" class="neu-form-label" style="font-size:12px;font-weight:600">Alimenta\u00e7\u00e3o</label>
									<select id="ped_alimentacao" class="neu-form-select" style="font-size:12px;max-height:50px">
										<option></option>
										<option>Leite materno exclusivo</option>
										<option>Leite materno + f\u00f3rmula</option>
										<option>F\u00f3rmula exclusiva</option>
										<option>Alimenta\u00e7\u00e3o variada</option>
									</select>
								</div>
								<div class="neu-form-group col-span-2" style="margin-bottom:0;flex-direction:column;align-items:flex-start">
									<label for="ped_eliminacoes" class="neu-form-label" style="font-size:12px;font-weight:600">Elimina\u00e7\u00f5es</label>
									<select id="ped_eliminacoes" class="neu-form-select" style="font-size:12px;max-height:50px">
										<option></option>
										<option>Fisiol\u00f3gicas</option>
										<option>Constipado</option>
										<option>Diarreia</option>
									</select>
								</div>
							</div>
						</section>

						<!-- 3) TOP DIREITA - Par\u00e2metros de Crescimento Esperado -->
						<section class="neu-inset lg:col-span-1 lg:row-start-1">
							<h3 class="font-semibold text-lg mb-4">Par\u00e2metros de Crescimento Esperado</h3>
							<div class="overflow-y-auto" style="max-height:400px">
								<table id="ped_crescimentoTable" class="neu-custom-table" style="font-size:13px"></table>
							</div>
						</section>

						<!-- 4) MEIO ESQUERDA (LARGO) - Crescimento e Desenvolvimento -->
						<section class="neu-inset flex flex-col lg:col-span-2 lg:row-start-2">
							<h3 class="font-semibold text-lg mb-4">Crescimento e Desenvolvimento</h3>
							<div class="neu-form-group flex flex-col justify-start items-start mb-4" style="margin-bottom:8px">
								<div class="flex flex-row gap-4 items-center">
									<label for="ped_desenvolvimentoSelect" class="neu-form-label" style="font-size:12px;font-weight:600">Selecionar Faixa Et\u00e1ria</label>
									<select id="ped_desenvolvimentoSelect" class="neu-form-select" style="font-size:12px"></select>
								</div>
							</div>
							<div class="flex-grow flex flex-col justify-start items-start">
								<label class="neu-form-label" style="font-size:12px;font-weight:600">Marcos e Red Flags</label>
								<textarea id="ped_desenvolvimentoTexto" class="neu-form-textarea w-full" rows="8" placeholder="Marcos e Red Flags" style="font-size:12px"></textarea>
							</div>
						</section>

						<!-- 5) MEIO DIREITA - Par\u00e2metros de Apoio -->
						<section class="neu-inset lg:col-span-1 lg:row-start-2" style="min-height:300px">
							<h3 class="font-semibold text-lg mb-4">Par\u00e2metros de Apoio</h3>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<h4 class="font-semibold mb-2" style="font-size:13px">Vitais</h4>
									<div id="ped_vitaisTree" class="overflow-y-auto" style="max-height:192px;font-size:12px"></div>
								</div>
								<div>
									<h4 class="font-semibold mb-2" style="font-size:13px">Alimentares</h4>
									<div id="ped_alimentacaoTree" class="overflow-y-auto" style="max-height:192px;font-size:12px"></div>
								</div>
							</div>
						</section>
					</div>

					<!-- LINHA INFERIOR - 3 BOT\u00d5ES -->
					<div class="flex flex-col gap-4 items-stretch lg:flex-row lg:justify-center lg:gap-12">
						<button id="ped_openModalExames" type="button" class="neu-btn neu-btn-primary">Abrir Exames/Reflexos</button>
						<button id="ped_openModalMchat" type="button" class="neu-btn neu-btn-primary">Abrir M-CHAT</button>
						<button id="ped_btnCopiar" type="button" class="neu-btn neu-btn-primary">Copiar e Fechar</button>
					</div>
				</div>
			</div>

			<!-- ================== MODAL EXAMES/REFLEXOS ================== -->
			<div id="ped_examesOverlay" class="neu-modal-overlay hidden"></div>
			<div id="ped_examesModal" class="hidden" style="position:fixed;inset:0;z-index:50;display:none;align-items:center;justify-content:center;padding:16px">
				<div id="ped_examesPanel" class="neu-neumo-modal w-full" style="max-width:72rem">
					<div class="flex items-center justify-start gap-6 pb-2 border-b" style="border-color:rgba(163,177,198,.3)">
						<i class="fa-solid fa-baby text-2xl text-[#23217c]"></i>
						<h2 class="text-xl font-semibold text-[#23217c]">Exames semiol\u00f3gicos e reflexos por idade</h2>
					</div>
					<div class="pt-4">
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<!-- \u00c1rvore -->
							<section>
								<h3 class="mb-2 font-semibold" style="font-size:14px">Idade / Grupo</h3>
								<div id="ped_examesTree" class="neu-inset p-3 overflow-auto" style="max-height:360px;font-size:12px"></div>
								<div class="neu-form-group mt-6" style="justify-content:flex-start">
									<label for="ped_ddResultado" class="neu-form-label" style="font-size:12px;font-weight:600">Conclus\u00e3o:</label>
									<select id="ped_ddResultado" class="neu-form-select w-full" style="max-width:28rem;font-size:12px">
										<option>OK (compat\u00edvel)</option>
										<option selected>Aten\u00e7\u00e3o (incompleto/lim\u00edtrofe)</option>
										<option>Alerta (incompat\u00edvel p/ idade)</option>
									</select>
								</div>
							</section>
							<!-- Checklist -->
							<section class="space-y-4">
								<div>
									<div class="mt-2">
										<table id="ped_examesChecklist" class="neu-nori-table w-full">
											<thead>
												<tr>
													<th class="text-left">Exame</th>
													<th class="text-left" style="width:160px">Status</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
									</div>
								</div>
							</section>
							<div class="lg:col-span-2">
								<h3 class="mb-1 font-semibold" style="font-size:14px">Nota / Defini\u00e7\u00e3o</h3>
								<textarea id="ped_txtNota" class="neu-form-textarea w-full" style="min-height:140px;font-size:12px" readonly></textarea>
							</div>
						</div>
					</div>
					<div class="pt-4 border-t flex items-center justify-end gap-3" style="border-color:rgba(163,177,198,.3)">
						<button id="ped_btnAplicarExames" type="button" class="neu-btn neu-btn-primary">Aplicar</button>
						<button id="ped_btnFecharExames" type="button" class="neu-btn">Fechar</button>
					</div>
				</div>
			</div>

			<!-- ================== MODAL M-CHAT ================== -->
			<div id="ped_mchatOverlay" class="neu-modal-overlay hidden"></div>
			<div id="ped_mchatModal" class="neu-neumo-modal hidden" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:95%;max-width:72rem;padding:24px;z-index:50">
				<div class="flex flex-col" style="height:760px;background:#e5e7eb;padding:32px;border-radius:16px">
					<!-- Cabe\u00e7alho -->
					<div class="flex-shrink-0">
						<div class="flex justify-between items-center">
							<h2 class="text-xl md:text-2xl font-bold text-blue-900">\ud83e\udde9 M-CHAT-R \u2014 Triagem de Autismo</h2>
							<button id="ped_mchatCloseBtn" type="button" class="text-3xl text-gray-500 bg-transparent border-none cursor-pointer" style="line-height:1">&times;</button>
						</div>
						<p class="text-sm text-red-800 mt-2">Idade: 16-30 meses | Responda sobre comportamento HABITUAL</p>
						<p class="text-xs italic text-gray-600 mt-1">Duplo-clique na linha para alternar entre SIM/N\u00c3O. Responda todas as 20 perguntas para obter resultado.</p>
					</div>
					<!-- Tabela -->
					<div class="neu-neumo-card-inset flex-grow my-4 rounded-xl overflow-y-auto">
						<table id="ped_mchatTable" class="neu-nori-table w-full text-left text-sm">
							<thead class="text-xs uppercase">
								<tr>
									<th style="width:8%">N\u00ba</th>
									<th style="width:67%">Pergunta</th>
									<th style="width:12%" class="text-center">SIM</th>
									<th style="width:12%" class="text-center">N\u00c3O</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<!-- Resultado -->
					<div class="neu-neumo-card-inset flex-shrink-0 p-4 rounded-xl">
						<h3 class="text-base font-bold text-blue-900">\ud83d\udcca RESULTADO DA TRIAGEM</h3>
						<p id="ped_mchatResultText" class="text-lg font-bold text-blue-600 mt-2">Clique em CALCULAR ap\u00f3s responder todas</p>
						<p id="ped_mchatRiskLevel" class="text-sm mt-1 whitespace-pre-line"></p>
					</div>
					<!-- Bot\u00f5es -->
					<div class="flex-shrink-0 flex flex-wrap gap-4 justify-end mt-6">
						<button id="ped_mchatBtnLimpar" type="button" class="neu-neumo-button py-2 px-5 rounded-lg font-semibold text-black bg-yellow-400">\ud83d\udd04 LIMPAR</button>
						<button id="ped_mchatBtnCalcular" type="button" class="neu-neumo-button py-2 px-5 rounded-lg font-semibold text-white bg-blue-500">\ud83e\uddee CALCULAR</button>
						<button id="ped_mchatBtnAplicar" type="button" class="neu-neumo-button py-2 px-5 rounded-lg font-semibold text-white bg-green-500">\u2713 APLICAR</button>
					</div>
				</div>
			</div>
		`;

		// ===============================
		//  ESTADO GLOBAL
		// ===============================
		const appState = {
			examesResultado: '',
			mchatResultado: '',
		};

		// ===============================
		//  HELPERS
		// ===============================
		const getVal = (id) => {
			const el = document.getElementById(id);
			return el ? el.value.trim() : '';
		};

		function clipCopy(text) {
			try {
				if (navigator.clipboard && window.isSecureContext) {
					return navigator.clipboard.writeText(text).then(() => true);
				}
			} catch (e) { /* fallback below */ }
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.style.position = 'fixed';
			ta.style.left = '-9999px';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.focus();
			ta.select();
			let ok = false;
			try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
			document.body.removeChild(ta);
			return Promise.resolve(ok);
		}

		function slug(s) {
			return s.toLowerCase().replace(/[^\w]+/g, '-');
		}

		// ===============================
		//  DADOS DE DESENVOLVIMENTO
		// ===============================
		const devMarcos = {
			'0\u20131 m': 'MotorG: eleva queixo/prono; reflexos primitivos.\nMotorF: preens\u00e3o palmar.\nLinguagem: choro diferenciado.\nCog/Adapt: fixa alto-contraste.\nSocio: acalma com voz.',
			'2 m': 'MotorG: sustenta cabe\u00e7a brevemente.\nMotorF: m\u00e3os mais abertas.\nLinguagem: vogais; sorriso social.\nCog/Adapt: segue 90\u2013120\u00b0.\nSocio: responde a rosto/voz.',
			'3 m': 'MotorG: ergue t\u00f3rax, apoia antebra\u00e7o.\nMotorF: m\u00e3os \u00e0 linha m\u00e9dia.\nLinguagem: balbucio simples.\nCog/Adapt: acompanha 180\u00b0.\nSocio: sorriso responsivo.',
			'4 m': 'MotorG: rola lateral; bom cervical.\nMotorF: pega c\u00fabito-palmar.\nLinguagem: risos/pros\u00f3dia.\nCog/Adapt: aten\u00e7\u00e3o a brinquedos.\nSocio: busca intera\u00e7\u00e3o.',
			'5 m': 'MotorG: rola prono\u2194supino.\nMotorF: transfere objetos.\nLinguagem: s\u00edlabas isoladas.\nCog/Adapt: explora com boca.\nSocio: estranhamento inicial.',
			'6 m': 'MotorG: senta com apoio.\nMotorF: pin\u00e7a grosseira; bate objetos.\nLinguagem: balbucio can\u00f4nico (ba/da).\nCog/Adapt: perman\u00eancia objeto inicial.\nSocio: contato visual ampliado.',
			'7\u20138 m': 'MotorG: senta sem apoio.\nMotorF: pega radial-palmar.\nLinguagem: responde ao nome.\nCog/Adapt: busca objeto oculto parcial.\nSocio: ansiedade de estranhos.',
			'9 m': 'MotorG: engatinha/arrasta; p\u00f5e de p\u00e9.\nMotorF: pin\u00e7a em evolu\u00e7\u00e3o.\nLinguagem: gestos (tchau/palmas).\nCog/Adapt: perman\u00eancia clara.\nSocio: desconforto separa\u00e7\u00e3o.',
			'10\u201311 m': 'MotorG: de p\u00e9 com apoio; cruza m\u00f3veis.\nMotorF: pin\u00e7a fina emergente.\nLinguagem: jarg\u00e3o.\nCog/Adapt: imita\u00e7\u00e3o funcional.\nSocio: explora\u00e7\u00e3o ativa.',
			'12 m': 'MotorG: 1\u20133 passos.\nMotorF: pin\u00e7a fina.\nLinguagem: 1\u20132 palavras; ordens simples com gesto.\nCog/Adapt: apontar protodeclarativo.\nSocio: imita a\u00e7\u00f5es di\u00e1rias.',
			'15 m': 'MotorG: marcha independente; agacha.\nMotorF: torre 2; garatuja.\nLinguagem: 3\u201310 palavras.\nCog/Adapt: usa colher com ajuda.\nSocio: gestos para pedir/mostrar.',
			'18 m': 'MotorG: corre inicial; sobe degraus com apoio.\nMotorF: torre 3\u20134; vira v\u00e1rias p\u00e1ginas.\nLinguagem: 10\u201320 palavras; combina\u00e7\u00f5es emergentes.\nCog/Adapt: aponta partes do corpo.\nSocio: faz-de-conta simples.',
			'24 m': 'MotorG: corre melhor; chuta bola; escadas com aux\u00edlio alternado.\nMotorF: torre 5\u20136; linhas/c\u00edrculos.\nLinguagem: frases de 2 palavras (~50\u2013200+).\nCog/Adapt: comandos de 2 etapas.\nSocio: brincadeira paralela/independ\u00eancia.',
			'36 m': 'MotorG: salta; triciclo.\nMotorF: torre 8; copia c\u00edrculo.\nLinguagem: 3\u20134 palavras; 75% intelig\u00edvel.\nCog/Adapt: cores b\u00e1sicas.\nSocio: cooperativa inicial.',
			'48 m': 'MotorG: pula 1 p\u00e9; escadas alternando.\nMotorF: cruz/quadrado; recorta simples.\nLinguagem: 100% intelig\u00edvel.\nCog/Adapt: conta at\u00e9 4.\nSocio: regras simples em grupo.',
			'60 m': 'MotorG: coordena\u00e7\u00e3o global; salta alternado.\nMotorF: tri\u00e2ngulo; veste-se quase s\u00f3.\nLinguagem: passado/futuro.\nCog/Adapt: conta at\u00e9 10; no\u00e7\u00f5es de tempo.\nSocio: cooperativa estruturada.',
			'72 m': 'MotorG: corre \u00e1gil; inicia esportes.\nMotorF: escreve algumas letras.\nLinguagem: frases complexas.\nCog/Adapt: regras de jogos; aten\u00e7\u00e3o sustentada.\nSocio: autonomia escolar.',
		};

		const devRedFlags = {
			'2 m': 'Sem sorriso social; n\u00e3o fixa; hipo/hipertonia marcadas.',
			'4 m': 'Sem controle cervical; n\u00e3o segue 180\u00b0; sem vocaliza\u00e7\u00e3o responsiva.',
			'6 m': 'N\u00e3o rola; sem balbucio can\u00f4nico; assimetrias importantes.',
			'9 m': 'N\u00e3o senta sem apoio; aus\u00eancia de gestos; pouca reatividade social.',
			'12 m': 'Sem palavras; n\u00e3o aponta; n\u00e3o compartilha interesse.',
			'15 m': 'N\u00e3o anda; regress\u00e3o; pouca imita\u00e7\u00e3o.',
			'18 m': 'Nenhuma palavra funcional; sem apontar protodeclarativo; perda de habilidades.',
			'24 m': 'Sem frases de 2 palavras; n\u00e3o cumpre 2 etapas; contato social muito restrito.',
			'Qualquer idade': 'Regress\u00e3o global; perda de habilidades; aus\u00eancia de contato visual; sinais neurol\u00f3gicos focais.',
		};

		const treeVitaisData = {
			FR: { '0\u20132m': '\u226460 irpm', '2\u201311m': '\u226450 irpm', '12m\u20135a': '\u226440 irpm' },
			'FC m\u00e9dia': { '0\u201311m': '125 bpm', '1a': '120 bpm', '2a': '110 bpm' },
			Temperatura: { Hipotermia: '< 36,2 \u00b0C', Febre: '> 37,8 \u00b0C' },
		};

		const treeAlimentacaoData = {
			'Amamenta\u00e7\u00e3o': {
				'0\u20136m': ['Leite Materno Exclusivo', 'Livre demanda', 'Armazenamento: 12h geladeira, 15d freezer'],
				'6\u201312m': ['Manter LM + Alimenta\u00e7\u00e3o Complementar', 'Fruta, Almo\u00e7o, Jantar'],
			},
			'F\u00f3rmula Infantil': {
				'0\u20136m': 'Uso conforme necessidade',
				'6\u201312m': 'Manter f\u00f3rmula + AC',
			},
			Geral: {
				Todos: ['Frutas, legumes, carnes', '8m: peda\u00e7os pequenos', '12m: consist\u00eancia da fam\u00edlia', 'EVITAR A\u00c7\u00daCAR/ULTRAPROCESSADOS', 'N\u00c3O USAR MEL < 1 ano', 'OVOS a partir de 6m'],
			},
		};

		// ===============================
		//  DADOS EXAMES/REFLEXOS
		// ===============================
		const ExamesReflexosData = () => ({
			'0-1m': [
				{ nyu: 'Moro', win: 'PRESENTE', nota: 'Desaparece ~4m' },
				{ nyu: 'Preens\u00e3o palmar', win: 'PRESENTE', nota: 'Vai sumindo at\u00e9 4\u20136m' },
				{ nyu: 'Preens\u00e3o plantar', win: 'PRESENTE', nota: 'Vai sumindo at\u00e9 4\u20136m' },
				{ nyu: 'Suc\u00e7\u00e3o', win: 'PRESENTE', nota: 'Soma com reflexo de busca' },
				{ nyu: 'Busca', win: 'PRESENTE' },
				{ nyu: 'T\u00f4nico-cervical (esgrimista)', win: 'PRESENTE', nota: 'At\u00e9 ~3m' },
				{ nyu: 'Babinski (extensor)', win: 'PRESENTE', nota: 'Pode persistir at\u00e9 2a' },
				{ nyu: 'Marcha reflexa', win: 'PRESENTE', nota: 'At\u00e9 ~2m' },
				{ nyu: 'T\u00f4nus flexor/postura em flex\u00e3o', win: 'PRESENTE' },
			],
			'2-4m': [
				{ nyu: 'Moro', win: 'TRANSI\u00c7\u00c3O', nota: 'Desaparecendo at\u00e9 ~4m' },
				{ nyu: 'Suc\u00e7\u00e3o/Busca', win: 'TRANSI\u00c7\u00c3O', nota: 'Desaparecendo' },
				{ nyu: 'T\u00f4nico-cervical', win: 'TRANSI\u00c7\u00c3O', nota: 'At\u00e9 ~3m' },
				{ nyu: 'Preens\u00e3o palmar/plantar', win: 'TRANSI\u00c7\u00c3O', nota: 'Desaparecendo' },
			],
			'4-6m': [
				{ nyu: 'Landau', win: 'PRESENTE', nota: 'Surge ap\u00f3s ~3m' },
				{ nyu: 'Galant', win: 'TRANSI\u00c7\u00c3O', nota: 'At\u00e9 4\u20136m' },
				{ nyu: 'Preens\u00e3o palmar/plantar', win: 'AUSENTE', nota: 'J\u00e1 deve ter sumido' },
			],
			'6-9m': [
				{ nyu: 'Parachute (paraquedista)', win: 'PRESENTE', nota: 'Surge ~8\u20139m e permanece' },
				{ nyu: 'Landau', win: 'PRESENTE' },
			],
			'9-12m': [
				{ nyu: 'Reflexos primitivos', win: 'AUSENTE', nota: 'Exceto paraquedista' },
				{ nyu: 'Parachute', win: 'PRESENTE' },
				{ nyu: 'Babinski', win: 'TRANSI\u00c7\u00c3O', nota: 'Pode persistir at\u00e9 2 anos' },
			],
		});

		const ExamesDescricoes = () => ({
			'Moro': 'Como fazer: Segurar o beb\u00ea em dec\u00fabito dorsal, sustentar cabe\u00e7a e tronco. Abaixar rapidamente a cabe\u00e7a uns 2cm (simulando queda). Resposta esperada: Abdu\u00e7\u00e3o e extens\u00e3o dos bra\u00e7os, seguida de adu\u00e7\u00e3o (como se fosse abra\u00e7ar).',
			'Preens\u00e3o palmar': 'Como fazer: Colocar dedo indicador na palma da m\u00e3o do beb\u00ea. Resposta esperada: Flex\u00e3o dos dedos, agarrando firmemente o dedo do examinador.',
			'Preens\u00e3o plantar': 'Como fazer: Pressionar regi\u00e3o plantar logo abaixo dos dedos do p\u00e9. Resposta esperada: Flex\u00e3o dos dedos dos p\u00e9s.',
			'Suc\u00e7\u00e3o': 'Como fazer: Colocar chupeta, mamadeira ou dedo limpo na boca. Resposta esperada: Movimentos r\u00edtmicos de suc\u00e7\u00e3o coordenados.',
			'Busca': 'Como fazer: Tocar levemente o canto da boca ou bochecha do beb\u00ea. Resposta esperada: Beb\u00ea vira a cabe\u00e7a em dire\u00e7\u00e3o ao est\u00edmulo, abrindo a boca.',
			'T\u00f4nico-cervical (esgrimista)': 'Como fazer: Beb\u00ea em dec\u00fabito dorsal, girar passivamente a cabe\u00e7a para um lado. Resposta esperada: Extens\u00e3o do bra\u00e7o e perna do lado para onde a cabe\u00e7a est\u00e1 virada, flex\u00e3o do lado oposto (posi\u00e7\u00e3o de esgrimista).',
			'Babinski (extensor)': 'Como fazer: Estimular a borda lateral da planta do p\u00e9, do calcanhar em dire\u00e7\u00e3o aos dedos. Resposta esperada: Extens\u00e3o do h\u00e1lux com abertura em leque dos demais dedos.',
			'Marcha reflexa': 'Como fazer: Segurar o beb\u00ea em posi\u00e7\u00e3o vertical, com os p\u00e9s tocando uma superf\u00edcie plana. Inclinar levemente para frente. Resposta esperada: Movimentos alternados das pernas simulando passos.',
			'T\u00f4nus flexor/postura em flex\u00e3o': 'Como observar: RN normalmente mant\u00e9m membros em flex\u00e3o quando em repouso. Ao tentar estender passivamente os membros, h\u00e1 resist\u00eancia e retorno \u00e0 posi\u00e7\u00e3o fletida.',
			'Landau': 'Como fazer: Suspender o beb\u00ea em prono (barriga para baixo) horizontalmente. Resposta esperada: Beb\u00ea levanta cabe\u00e7a, extens\u00e3o da coluna e dos membros inferiores (posi\u00e7\u00e3o de avi\u00e3o).',
			'Galant': 'Como fazer: Beb\u00ea em prono ou suspenso. Estimular a pele paravertebral de um lado (da esc\u00e1pula ao quadril). Resposta esperada: Curvatura lateral da coluna para o lado estimulado.',
			'Parachute (paraquedista)': 'Como fazer: Segurar o beb\u00ea suspenso em prono, mov\u00ea-lo rapidamente em dire\u00e7\u00e3o a uma superf\u00edcie (como se fosse cair). Resposta esperada: Extens\u00e3o e abertura dos bra\u00e7os e m\u00e3os, como se fosse se proteger da queda.',
		});

		// ===============================
		//  DADOS M-CHAT
		// ===============================
		const MCHAT_QUESTIONS = [
			'Se voc\u00ea apontar algo longe, a crian\u00e7a olha para o que apontou?',
			'Voc\u00ea j\u00e1 se perguntou se a crian\u00e7a \u00e9 surda?',
			'A crian\u00e7a brinca de faz-de-conta? (ex: finge beber em copo vazio)',
			'A crian\u00e7a gosta de subir em coisas?',
			'A crian\u00e7a faz movimentos incomuns com dedos perto dos olhos?',
			'A crian\u00e7a aponta com dedo para PEDIR algo?',
			'A crian\u00e7a aponta com dedo para MOSTRAR algo interessante?',
			'A crian\u00e7a se interessa por outras crian\u00e7as?',
			'A crian\u00e7a MOSTRA coisas trazendo ou segurando para voc\u00ea?',
			'A crian\u00e7a responde quando chamada pelo nome?',
			'Quando voc\u00ea sorri, a crian\u00e7a sorri de volta?',
			'A crian\u00e7a fica INCOMODADA com ru\u00eddos do dia a dia?',
			'A crian\u00e7a j\u00e1 anda?',
			'A crian\u00e7a olha nos seus olhos quando fala/brinca?',
			'A crian\u00e7a tenta IMITAR o que voc\u00ea faz?',
			'Se voc\u00ea vira a cabe\u00e7a, a crian\u00e7a olha para ver o qu\u00ea?',
			'A crian\u00e7a busca sua aten\u00e7\u00e3o? (olha, faz sons)',
			'A crian\u00e7a COMPREENDE quando pede algo? (sem apontar)',
			'Quando algo novo acontece, olha seu rosto para ver rea\u00e7\u00e3o?',
			'A crian\u00e7a gosta de atividades com movimento? (balan\u00e7o, pulo)',
		];

		// ===============================
		//  FUN\u00c7\u00d5ES AUXILIARES
		// ===============================
		function createTreeView(data, targetContainer) {
			const ul = document.createElement('ul');
			for (const [key, value] of Object.entries(data)) {
				const li = document.createElement('li');
				const node = document.createElement('div');
				node.className = 'neu-tree-node p-1';
				node.textContent = key;
				li.appendChild(node);
				if (value && typeof value === 'object') {
					const childrenUl = document.createElement('ul');
					childrenUl.className = 'neu-tree-children';
					for (const [ck, cv] of Object.entries(value)) {
						if (Array.isArray(cv)) {
							cv.forEach((it) => {
								const li2 = document.createElement('li');
								li2.textContent = '- ' + it;
								childrenUl.appendChild(li2);
							});
						} else {
							const childLi = document.createElement('li');
							childLi.textContent = ck + ': ' + cv;
							childrenUl.appendChild(childLi);
						}
					}
					li.appendChild(childrenUl);
				}
				ul.appendChild(li);
			}
			targetContainer.innerHTML = '';
			targetContainer.appendChild(ul);
			targetContainer.querySelectorAll('.neu-tree-node').forEach((n) => {
				const c = n.nextElementSibling;
				if (c && c.classList.contains('neu-tree-children')) {
					n.addEventListener('click', () => c.classList.toggle('open'));
				}
			});
		}

		// ===============================
		//  INICIALIZA\u00c7\u00c3O DA UI PRINCIPAL
		// ===============================
		const desenvolvimentoSelect = document.getElementById('ped_desenvolvimentoSelect');
		const desenvolvimentoTexto = document.getElementById('ped_desenvolvimentoTexto');

		function initializeMainUI() {
			// Preencher select de desenvolvimento
			desenvolvimentoSelect.innerHTML =
				'<option value="">Selecione...</option>' +
				Object.keys(devMarcos)
					.map((k) => '<option value="' + k + '">' + k + '</option>')
					.join('');

			// Event listener para select de desenvolvimento
			desenvolvimentoSelect.addEventListener('change', (e) => {
				const bucket = e.target.value;
				if (!bucket) {
					desenvolvimentoTexto.value = '';
					return;
				}
				const txt = devMarcos[bucket] || '';
				const rf = Object.entries(devRedFlags).find(([age]) => bucket.includes(age.split(' ')[0]))?.[1] || devRedFlags['Qualquer idade'];
				desenvolvimentoTexto.value = (txt + '\n\n**Red flags:**\n- ' + rf).replace(/(\bMotorG:|\bMotorF:|\bLinguagem:|\bCog\/Adapt:|\bSocio:)/g, '\n- **$1**');
			});

			// Criar \u00e1rvores de vitais e alimenta\u00e7\u00e3o
			createTreeView(treeVitaisData, document.getElementById('ped_vitaisTree'));
			createTreeView(treeAlimentacaoData, document.getElementById('ped_alimentacaoTree'));

			// Preencher tabela de crescimento
			document.getElementById('ped_crescimentoTable').innerHTML =
				'<thead><tr><th>Per\u00edodo</th><th>Peso</th><th>Comp.</th><th>PC</th></tr></thead>' +
				'<tbody>' +
				'<tr><td>1\u00ba TRIM</td><td>~700g/m\u00eas</td><td>~3.5cm/m\u00eas</td><td>~2cm/m\u00eas</td></tr>' +
				'<tr><td>2\u00ba TRIM</td><td>~600g/m\u00eas</td><td>~2cm/m\u00eas</td><td>~1cm/m\u00eas</td></tr>' +
				'<tr><td>3\u00ba TRIM</td><td>~500g/m\u00eas</td><td>~1.5cm/m\u00eas</td><td>~0.5cm/m\u00eas</td></tr>' +
				'<tr><td>4\u00ba TRIM</td><td>~400g/m\u00eas</td><td>~1.2cm/m\u00eas</td><td>~0.5cm/m\u00eas</td></tr>' +
				'<tr><td>2\u00ba Ano</td><td>~200g/m\u00eas</td><td>~1cm/m\u00eas</td><td>~2cm/ano</td></tr>' +
				'</tbody>';
		}

		// ===============================
		//  MODAL EXAMES/REFLEXOS
		// ===============================
		const ExState = new Map();
		let currentAgeKey = '';

		const exOverlay = document.getElementById('ped_examesOverlay');
		const exModal = document.getElementById('ped_examesModal');
		const exPanel = document.getElementById('ped_examesPanel');
		const exOpenBtn = document.getElementById('ped_openModalExames');
		const exCloseBtn = document.getElementById('ped_btnFecharExames');
		const exTreeContainer = document.getElementById('ped_examesTree');
		const exChecklistBody = document.querySelector('#ped_examesChecklist tbody');
		const exTxtNota = document.getElementById('ped_txtNota');
		const exDdResultado = document.getElementById('ped_ddResultado');
		const exBtnAplicar = document.getElementById('ped_btnAplicarExames');

		function openExamesModal() {
			exOverlay.classList.remove('hidden');
			exModal.classList.remove('hidden');
			exModal.style.display = 'flex';
			document.addEventListener('keydown', onExamesKeydown);
			document.addEventListener('click', onExamesOutside, true);
		}

		function closeExamesModal() {
			exOverlay.classList.add('hidden');
			exModal.classList.add('hidden');
			exModal.style.display = 'none';
			document.removeEventListener('keydown', onExamesKeydown);
			document.removeEventListener('click', onExamesOutside, true);
		}

		function onExamesKeydown(e) {
			if (e.key === 'Escape') {
				e.preventDefault();
				closeExamesModal();
			}
		}

		function onExamesOutside(e) {
			if (!exPanel.contains(e.target) && !exOpenBtn.contains(e.target)) {
				closeExamesModal();
			}
		}

		function ensureAgeState(ageKey) {
			if (!ExState.has(ageKey)) {
				const perAge = new Map();
				const data = ExamesReflexosData();
				(data[ageKey] || []).forEach((item) => {
					perAge.set(item.nyu, { status: 'Ausente', obs: '' });
				});
				ExState.set(ageKey, perAge);
			}
		}

		function FillChecklist(ageKey) {
			try {
				const data = ExamesReflexosData();
				if (!data[ageKey]) return;

				exChecklistBody.innerHTML = '';
				ensureAgeState(ageKey);

				data[ageKey].forEach((item) => {
					const st = ExState.get(ageKey).get(item.nyu).status;
					const tr = document.createElement('tr');
					tr.dataset.examName = item.nyu;

					const tdName = document.createElement('td');
					tdName.textContent = item.nyu;

					const tdStatus = document.createElement('td');
					const cbId = 'ped_ex-' + slug(ageKey) + '-' + slug(item.nyu);
					const cb = document.createElement('input');
					cb.type = 'checkbox';
					cb.id = cbId;
					cb.className = 'neu-neumo-checkbox align-middle';
					cb.checked = st === 'Presente';
					cb.title = cb.checked ? 'Presente' : 'Ausente';
					cb.setAttribute('aria-label', item.nyu + ': ' + cb.title);

					cb.addEventListener('change', () => {
						const next = cb.checked ? 'Presente' : 'Ausente';
						ExState.get(ageKey).get(item.nyu).status = next;
						cb.title = next;
						cb.setAttribute('aria-label', item.nyu + ': ' + next);
					});

					tdStatus.appendChild(cb);
					tr.appendChild(tdName);
					tr.appendChild(tdStatus);
					exChecklistBody.appendChild(tr);
				});

				currentAgeKey = ageKey;
			} catch (err) {
				alert('Erro ao preencher checklist: ' + err.message);
			}
		}

		function ShowExamNote(ageKey, examName) {
			try {
				const data = ExamesReflexosData();
				const descs = ExamesDescricoes();
				if (!data[ageKey]) return;

				for (const it of data[ageKey]) {
					if (it.nyu === examName) {
						let txt = '**' + it.nyu + '**\n\n';
						txt += 'Janela esperada: ' + it.win;
						if (it.nota && it.nota !== '') txt += ' | ' + it.nota;
						if (descs[examName]) {
							txt += '\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n';
							txt += descs[examName];
						}
						exTxtNota.value = txt;
						return;
					}
				}
				exTxtNota.value = '';
			} catch (e) {
				exTxtNota.value = '';
			}
		}

		function renderExamesTree() {
			exTreeContainer.innerHTML = '';
			const data = ExamesReflexosData();
			const ul = document.createElement('ul');
			ul.className = 'space-y-2';

			Object.keys(data).forEach((ageKey, idx) => {
				const li = document.createElement('li');

				const ageBtn = document.createElement('div');
				ageBtn.className = 'neu-tree-node p-1 cursor-pointer font-semibold';
				ageBtn.textContent = ageKey;
				ageBtn.dataset.role = 'age';
				ageBtn.dataset.ageKey = ageKey;

				const children = document.createElement('ul');
				children.className = 'neu-tree-children';

				data[ageKey].forEach((item) => {
					const childLi = document.createElement('li');
					const examBtn = document.createElement('div');
					examBtn.className = 'neu-tree-node p-1 cursor-pointer';
					examBtn.dataset.role = 'exam';
					examBtn.dataset.ageKey = ageKey;
					examBtn.dataset.examName = item.nyu;
					examBtn.textContent = item.nyu;
					childLi.appendChild(examBtn);
					children.appendChild(childLi);
				});

				li.appendChild(ageBtn);
				li.appendChild(children);
				ul.appendChild(li);

				if (idx === 0) {
					currentAgeKey = ageKey;
					FillChecklist(ageKey);
				}
			});

			exTreeContainer.appendChild(ul);
		}

		function applyExamesResult() {
			try {
				if (!currentAgeKey || !ExState.has(currentAgeKey)) {
					alert('Selecione uma idade e marque os exames.');
					return;
				}

				const selected = exDdResultado ? exDdResultado.value : 'Aten\u00e7\u00e3o';
				let out = '\n### Exames/Reflexos \u2014 ' + currentAgeKey + ' [' + selected + ']\n';

				let temMarcacao = false;
				const perAge = ExState.get(currentAgeKey);
				for (const [exam, obj] of perAge.entries()) {
					if (obj.status === 'Presente') {
						out += '- **' + exam + ':** ' + obj.status + '\n';
						temMarcacao = true;
					}
				}
				if (!temMarcacao) out += '- *(sem marca\u00e7\u00f5es)*\n';

				appState.examesResultado = out;

				const mainExamesButton = document.getElementById('ped_openModalExames');
				if (mainExamesButton) {
					mainExamesButton.textContent = 'Exames/Reflexos (Preenchido \u2713)';
					mainExamesButton.classList.add('neu-btn-success');
				}

				closeExamesModal();
			} catch (err) {
				alert('Erro ao aplicar: ' + err.message);
			}
		}

		// Event listeners - Exames modal
		exOpenBtn.addEventListener('click', openExamesModal);
		exCloseBtn.addEventListener('click', closeExamesModal);
		exOverlay.addEventListener('click', closeExamesModal);

		exTreeContainer.addEventListener('click', (e) => {
			const btn = e.target.closest('[data-role]');
			if (!btn) return;

			const role = btn.dataset.role;
			if (role === 'exam') {
				FillChecklist(btn.dataset.ageKey);
				ShowExamNote(btn.dataset.ageKey, btn.dataset.examName);
			} else if (role === 'age') {
				FillChecklist(btn.dataset.ageKey);
				exTxtNota.value = '';
				const children = btn.nextElementSibling;
				if (children && children.classList.contains('neu-tree-children')) {
					children.classList.toggle('open');
				}
			}
		});

		exChecklistBody.addEventListener('click', (e) => {
			const cell = e.target.closest('td');
			if (!cell || cell.cellIndex !== 0) return;
			const row = cell.parentElement;
			const exam = row.dataset.examName;
			ShowExamNote(currentAgeKey, exam);
		});

		exChecklistBody.addEventListener('dblclick', (e) => {
			const row = e.target.closest('tr');
			if (!row) return;
			const cb = row.querySelector('input[type="checkbox"]');
			if (!cb) return;
			cb.checked = !cb.checked;
			cb.dispatchEvent(new Event('change'));
		});

		exBtnAplicar.addEventListener('click', applyExamesResult);

		// ===============================
		//  MODAL M-CHAT
		// ===============================
		const mchatOverlay = document.getElementById('ped_mchatOverlay');
		const mchatModal = document.getElementById('ped_mchatModal');
		const mchatOpenBtn = document.getElementById('ped_openModalMchat');
		const mchatCloseBtn = document.getElementById('ped_mchatCloseBtn');
		const mchatTableBody = document.querySelector('#ped_mchatTable tbody');
		const mchatResultText = document.getElementById('ped_mchatResultText');
		const mchatRiskLevel = document.getElementById('ped_mchatRiskLevel');
		const mchatBtnLimpar = document.getElementById('ped_mchatBtnLimpar');
		const mchatBtnCalcular = document.getElementById('ped_mchatBtnCalcular');
		const mchatBtnAplicar = document.getElementById('ped_mchatBtnAplicar');

		let mchatState = [];

		function openMchatModal() {
			mchatModal.classList.remove('hidden');
			mchatOverlay.classList.remove('hidden');
		}

		function closeMchatModal() {
			mchatModal.classList.add('hidden');
			mchatOverlay.classList.add('hidden');
		}

		function populateMchatQuestions() {
			mchatTableBody.innerHTML = '';
			mchatState = [];
			MCHAT_QUESTIONS.forEach((questionText, index) => {
				mchatState.push({ text: questionText, answer: 0 });
				const row = document.createElement('tr');
				row.dataset.index = index;
				row.innerHTML =
					'<td class="text-center">' + (index + 1) + '</td>' +
					'<td>' + questionText + '</td>' +
					'<td class="text-center"></td>' +
					'<td class="text-center"></td>';
				mchatTableBody.appendChild(row);
			});
		}

		function toggleMchatAnswer(event) {
			const row = event.target.closest('tr');
			if (!row) return;

			const index = parseInt(row.dataset.index);
			if (isNaN(index) || index < 0 || index >= mchatState.length) return;

			const currentState = mchatState[index].answer;
			const nextState = currentState === 0 || currentState === 2 ? 1 : 2;
			mchatState[index].answer = nextState;

			row.cells[2].innerHTML = nextState === 1 ? '<span class="neu-check-mark">\u2713</span>' : '';
			row.cells[3].innerHTML = nextState === 2 ? '<span class="neu-check-mark">\u2713</span>' : '';
		}

		function calculateMchatScore() {
			const unansweredCount = mchatState.filter((q) => q.answer === 0).length;
			if (unansweredCount > 0) {
				alert('Faltam ' + unansweredCount + ' respostas! Por favor, responda todas as perguntas.');
				return;
			}

			let score = 0;
			const reverseScoreItems = [2, 5, 12];

			mchatState.forEach((question, index) => {
				const itemNumber = index + 1;
				const failed =
					(reverseScoreItems.includes(itemNumber) && question.answer === 1) ||
					(!reverseScoreItems.includes(itemNumber) && question.answer === 2);

				if (failed) {
					score++;
				}
			});

			mchatResultText.classList.remove('text-green-600', 'text-yellow-600', 'text-red-600');
			if (score <= 2) {
				mchatResultText.textContent = 'PONTUA\u00c7\u00c3O: ' + score + '/20 \u2192 BAIXO RISCO';
				mchatResultText.classList.add('text-green-600');
				mchatRiskLevel.textContent = '\u2713 Triagem NEGATIVA. Repetir aos 24m se <24m. Vigil\u00e2ncia de rotina.';
			} else if (score <= 7) {
				mchatResultText.textContent = 'PONTUA\u00c7\u00c3O: ' + score + '/20 \u2192 RISCO MODERADO';
				mchatResultText.classList.add('text-yellow-600');
				mchatRiskLevel.textContent = '\u26a0 Aplicar Entrevista M-CHAT-R/F. Se \u22652: encaminhar p/ diagn\u00f3stico.';
			} else {
				mchatResultText.textContent = 'PONTUA\u00c7\u00c3O: ' + score + '/20 \u2192 ALTO RISCO';
				mchatResultText.classList.add('text-red-600');
				mchatRiskLevel.textContent = '\ud83d\udea8 Triagem POSITIVA! Encaminhar URGENTE p/ avalia\u00e7\u00e3o + interven\u00e7\u00e3o.';
			}
		}

		function applyMchatResult() {
			if (mchatResultText.textContent.includes('CALCULAR')) {
				alert('Calcule o resultado primeiro!');
				return;
			}

			appState.mchatResultado = '\n### M-CHAT-R (Triagem Autismo)\n- **Resultado:** ' + mchatResultText.textContent + '\n- **Interpreta\u00e7\u00e3o:** ' + mchatRiskLevel.textContent + '\n';

			const mainMchatButton = document.getElementById('ped_openModalMchat');
			if (mainMchatButton) {
				mainMchatButton.textContent = 'M-CHAT (Preenchido \u2713)';
				mainMchatButton.classList.add('neu-btn-success');
			}

			closeMchatModal();
		}

		function clearMchatForm() {
			populateMchatQuestions();
			mchatResultText.textContent = 'Clique em CALCULAR ap\u00f3s responder todas';
			mchatRiskLevel.textContent = '';
			mchatResultText.classList.remove('text-green-600', 'text-yellow-600', 'text-red-600');
		}

		// Event listeners - M-CHAT
		mchatOpenBtn.addEventListener('click', openMchatModal);
		mchatCloseBtn.addEventListener('click', closeMchatModal);
		mchatOverlay.addEventListener('click', closeMchatModal);
		mchatTableBody.addEventListener('dblclick', toggleMchatAnswer);
		mchatBtnLimpar.addEventListener('click', clearMchatForm);
		mchatBtnCalcular.addEventListener('click', calculateMchatScore);
		mchatBtnAplicar.addEventListener('click', applyMchatResult);

		// ===============================
		//  FUN\u00c7\u00c3O PRINCIPAL DE C\u00d3PIA
		// ===============================
		function copyAllToClipboard() {
			const data = {
				preNatal: getVal('ped_prenatal'),
				parto: getVal('ped_parto'),
				pesoNasc: getVal('ped_pesoNasc'),
				compNasc: getVal('ped_compNasc'),
				pcNasc: getVal('ped_pcNasc'),
				aig: getVal('ped_aig'),
				termo: getVal('ped_termo'),
				apgar: getVal('ped_apgar'),
				idade: getVal('ped_idade'),
				peso: getVal('ped_peso'),
				comp: getVal('ped_comp'),
				pc: getVal('ped_pc'),
				alimentacao: getVal('ped_alimentacao'),
				eliminacoes: getVal('ped_eliminacoes'),
				crescDev: getVal('ped_desenvolvimentoTexto'),
				faixaDev: getVal('ped_desenvolvimentoSelect'),
			};

			const linha = (l, v, u) => (v ? ('*' + l + ':* ' + v + (u || '')) : '');
			const separador = '\n**-------------------------------------------------------------------------------------------------**\n';

			let finalText = '**PUERICULTURA** \u2014 Data: ' + new Date().toLocaleDateString('pt-BR') + '\n\n';

			// Se\u00e7\u00e3o PR\u00c9-NATAL E NASCIMENTO
			finalText += '### PR\u00c9-NATAL E NASCIMENTO\n\n';
			const prenatalData = [
				linha('Pr\u00e9-natal', data.preNatal),
				linha('Parto', data.parto),
				linha('Peso', data.pesoNasc, 'g'),
				linha('Comp', data.compNasc, 'cm'),
				linha('PC', data.pcNasc, 'cm'),
			].filter(Boolean).join('; ');

			const prenatalData2 = [
				linha('Class.', data.aig),
				linha('Termo', data.termo),
				linha('Apgar', data.apgar),
			].filter(Boolean).join('; ');

			if (prenatalData) finalText += '- ' + prenatalData + ';\n';
			if (prenatalData2) finalText += '- ' + prenatalData2 + '\n';

			finalText += separador;

			// Se\u00e7\u00e3o CONSULTA ATUAL
			finalText += '### CONSULTA ATUAL\n\n';
			const consultaData1 = [
				linha('Idade', data.idade, 'm'),
				linha('Peso', data.peso, 'g'),
				linha('Comp', data.comp, 'cm'),
				linha('PC', data.pc, 'cm'),
				linha('Alimenta\u00e7\u00e3o', data.alimentacao),
			].filter(Boolean).join('; ');

			const consultaData2 = [
				linha('Elimina\u00e7\u00f5es', data.eliminacoes),
			].filter(Boolean).join('; ');

			if (consultaData1) finalText += '- ' + consultaData1 + ';\n';
			if (consultaData2) finalText += '- ' + consultaData2 + '\n';

			finalText += separador;

			// Se\u00e7\u00e3o DESENVOLVIMENTO
			finalText += '### DESENVOLVIMENTO (' + (data.faixaDev || 'N/A') + ')\n\n';

			if (data.crescDev) {
				const lines = data.crescDev.split('\n');
				const categories = [];
				let redFlags = [];
				let inRedFlags = false;

				for (const line of lines) {
					const trimmed = line.trim();
					if (!trimmed) continue;

					if (trimmed.includes('Red flags') || trimmed.includes('red flags')) {
						inRedFlags = true;
						continue;
					}

					if (inRedFlags) {
						if (trimmed.startsWith('- ')) {
							redFlags.push(trimmed.replace('- ', ''));
						}
						continue;
					}

					const match = trimmed.match(/^- \*\*([^:]+):\*\* (.+)$/);
					if (match) {
						categories.push({ category: match[1], content: match[2] });
					}
				}

				if (categories.length === 0) {
					inRedFlags = false;
					redFlags = [];
					for (const line of lines) {
						const trimmed = line.trim();
						if (!trimmed) continue;

						if (trimmed.includes('Red flags') || trimmed.includes('red flags')) {
							inRedFlags = true;
							continue;
						}

						if (inRedFlags) {
							if (trimmed.startsWith('- ')) {
								redFlags.push(trimmed.replace('- ', ''));
							}
							continue;
						}

						const altMatch = trimmed.match(/^\*\*([^:]+):\*\* (.+)$/);
						if (altMatch) {
							categories.push({ category: altMatch[1], content: altMatch[2] });
						}
					}
				}

				if (categories.length > 0) {
					const rows = Math.ceil(categories.length / 2);
					for (let i = 0; i < rows; i++) {
						const leftCat = categories[i * 2];
						const rightCat = categories[i * 2 + 1];

						let leftText = '';
						let rightText = '';

						if (leftCat) {
							leftText = '- **' + leftCat.category + ':** ' + leftCat.content;
						}
						if (rightCat) {
							rightText = '- **' + rightCat.category + ':** ' + rightCat.content;
						}

						if (leftText && rightText) {
							const leftPad = 45;
							const spaces = ' '.repeat(Math.max(1, leftPad - leftText.length));
							finalText += leftText + spaces + '| ' + rightText + '\n';
						} else if (leftText) {
							finalText += leftText + '\n';
						} else if (rightText) {
							finalText += ' '.repeat(45) + '| ' + rightText + '\n';
						}

						if (i < rows - 1) {
							finalText += ' '.repeat(45) + '|\n';
						}
					}
				} else {
					finalText += data.crescDev + '\n';
				}

				if (redFlags.length > 0) {
					finalText += '\n**Red flags:**\n';
					redFlags.forEach((flag) => {
						finalText += '- ' + flag + '\n';
					});
				}
			} else {
				finalText += '- *(n\u00e3o informado)*\n';
			}

			finalText += separador;

			// Incluir resultados dos modais
			if (appState.examesResultado) {
				finalText += appState.examesResultado + '\n';
				finalText += separador + '\n';
			}

			if (appState.mchatResultado) {
				const mchatLines = appState.mchatResultado.split('\n');
				let formattedMchat = '';

				for (const line of mchatLines) {
					if (line.startsWith('### M-CHAT-R')) {
						formattedMchat += line + '\n\n';
					} else if (line.startsWith('- **Resultado:**')) {
						formattedMchat += '- ' + line.replace('- **Resultado:**', '**Resultado:**') + '\n';
					} else if (line.startsWith('- **Interpreta\u00e7\u00e3o:**')) {
						formattedMchat += '- ' + line.replace('- **Interpreta\u00e7\u00e3o:**', '**Interpreta\u00e7\u00e3o:**') + '\n';
					}
				}

				finalText += formattedMchat;
			}

			const txt = finalText.replace(/; \n/g, '\n');
			clipCopy(txt).then((ok) => {
				alert(ok ? 'Copiado!' : 'Copiado (alternativo).');
			});
		}

		// Event listener para bot\u00e3o de c\u00f3pia
		document.getElementById('ped_btnCopiar').addEventListener('click', copyAllToClipboard);

		// ===============================
		//  INICIALIZA\u00c7\u00c3O
		// ===============================
		initializeMainUI();
		renderExamesTree();
		populateMchatQuestions();

		console.log('[Ped] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_ped')) {
		renderPed();
	}

	window.renderPed = renderPed;
})();
