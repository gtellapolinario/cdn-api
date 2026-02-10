/**
 * Psiquiatria - Exame Psíquico
 * Convertido de psiqui_2025.html — layout original preservado
 */
(function () {
	'use strict';

	function injectNeuCSS() {
		if (document.getElementById('psf-neu-styles')) return;
		var s = document.createElement('style');
		s.id = 'psf-neu-styles';
		s.textContent = [
			'.neu-card{background:#e0e5ec;padding:22px;border-radius:24px;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}',
			'.neu-inset{background:#e0e5ec;padding:18px;border-radius:24px;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}',
			'.neu-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 22px;border:none;border-radius:60px;background:#e0e5ec;color:#5f6775;font-weight:bold;cursor:pointer;transition:all .2s;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;font-size:13px}',
			'.neu-btn:hover{color:#007bff;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}',
			'.neu-btn:active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;color:#23217c;transform:translateY(1px)}',
			'.neu-btn-primary{color:#007bff}',
			'.neu-btn-danger{color:#dc3545}',
			'.neu-btn-success{color:#28a745}',
			'.neu-btn-info{color:#007bff}',
			'.neu-btn-container{display:flex;gap:15px;justify-content:center;margin-top:15px}',
			'.neu-form-group{margin-bottom:20px;display:flex;flex-direction:row;gap:10px;align-items:center;justify-content:center}',
			'.neu-form-label{font-size:14px;font-weight:500;color:#5f6775;display:flex;align-items:center;gap:10px}',
			'.neu-form-input{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;height:30px;transition:box-shadow .2s;max-width:80px}',
			'.neu-form-input:focus{outline:none;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff}',
			'.neu-form-select{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;transition:box-shadow .2s}',
			'.neu-form-select:focus{outline:none}',
			'.neu-form-textarea{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;min-height:100px;resize:vertical;transition:box-shadow .2s}',
			'.neu-form-textarea:focus{outline:none}',
			'.neu-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:40}',
			'.neu-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:95%;max-width:600px;z-index:50;max-height:90vh}',
			'.neu-modal{background:#e0e5ec;border-radius:36px;padding:18px;margin:20px}',
			'.neu-tabs-nav{display:flex;gap:10px;flex-wrap:wrap}',
			'.neu-tab-button{padding:10px 20px;border:none;border-radius:60px;background:#e0e5ec;color:#5f6775;font-weight:500;cursor:pointer;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}',
			'.neu-tab-button.active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;color:#007bff;font-weight:bold}',
			'.neu-tab-panel{display:none}',
			'.neu-tab-panel.active{display:block}'
		].join('\n');
		document.head.appendChild(s);
	}

	function renderPsiqui() {
		var container = document.getElementById('psf_sub_psiqui');
		if (!container) {
			console.error('[Psiqui] Container #psf_sub_psiqui não encontrado');
			return;
		}

		injectNeuCSS();

		container.innerHTML = [
			'<div class="p-4">',
			'<header class="flex flex-row justify-start items-center gap-4 mb-6 border-b border-gray-200 pb-4">',
			'<h1 class="text-2xl font-bold flex items-center gap-3 text-[#23217c]"><i class="fa-solid fa-brain"></i> Exame Psíquico</h1>',
			'<div class="neu-form-group" style="margin-bottom:0;flex:0 0 auto"><label for="psiqui_nome" class="neu-form-label" style="font-size:14px">Nome:</label><input type="text" id="psiqui_nome" class="neu-form-input" style="max-width:200px;height:32px" /></div>',
			'<div class="neu-form-group" style="margin-bottom:0;flex:0 0 auto"><label for="psiqui_data" class="neu-form-label" style="font-size:14px">Data:</label><input type="datetime-local" id="psiqui_data" class="neu-form-input" style="max-width:220px;height:32px" /></div>',
			'</header>',
			'<div id="psiqui_examePsiquicoForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" style="font-size:11px"></div>',
			'<section class="neu-inset mt-6 flex flex-col">',
			'<div class="flex flex-row gap-3 items-center justify-center mb-3"><i class="fa-solid fa-pencil text-gray-500"></i><h3 class="font-bold" style="font-size:14px">Observações adicionais</h3></div>',
			'<textarea id="psiqui_obsAdicionais" class="neu-form-textarea" style="font-size:14px" rows="3" placeholder="Observações adicionais..."></textarea>',
			'</section>',
			'<div class="neu-btn-container mt-6 flex flex-col md:flex-row gap-4">',
			'<button id="psiqui_openScalesBtn" type="button" class="neu-btn"><i class="fa-solid fa-chart-simple mr-2"></i> ABRIR ESCALAS</button>',
			'<button id="psiqui_copyBtn" type="button" class="neu-btn neu-btn-primary"><i class="fa-solid fa-clipboard mr-2"></i> COPIAR TUDO</button>',
			'</div>',
			'</div>',
			'<!-- MODAL DE ESCALAS -->',
			'<div id="psiqui_scalesModalOverlay" class="neu-modal-overlay hidden"></div>',
			'<div id="psiqui_scalesModal" class="neu-modal neu-modal-card hidden" style="max-width:640px">',
			'<div class="flex flex-col h-[85vh] p-4">',
			'<div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">',
			'<h2 class="text-xl font-bold flex items-center gap-3 text-[#23217c]"><i class="fa-solid fa-ruler-combined"></i> Escalas de Rastreamento</h2>',
			'<button id="psiqui_closeScalesBtn" type="button" class="text-2xl bg-transparent border-none cursor-pointer">&times;</button>',
			'</div>',
			'<div id="psiqui_tabNav" class="neu-tabs-nav mb-4">',
			'<button class="neu-tab-button active" data-tab="psiqui_phq9">PHQ-9</button>',
			'<button class="neu-tab-button" data-tab="psiqui_gad7">GAD-7</button>',
			'<button class="neu-tab-button" data-tab="psiqui_cage">CAGE</button>',
			'<button class="neu-tab-button" data-tab="psiqui_bdi">Beck (BDI-II)</button>',
			'</div>',
			'<div class="flex-grow overflow-y-auto neu-inset p-4">',
			'<div id="psiqui_phq9" class="neu-tab-panel active"></div>',
			'<div id="psiqui_gad7" class="neu-tab-panel"></div>',
			'<div id="psiqui_cage" class="neu-tab-panel"></div>',
			'<div id="psiqui_bdi" class="neu-tab-panel"></div>',
			'</div>',
			'<div class="neu-btn-container mt-4 flex flex-col md:flex-row gap-4">',
			'<button id="psiqui_copyScalesBtn" type="button" class="neu-btn"><i class="fa-solid fa-copy mr-2"></i> Copiar Escalas</button>',
			'<button id="psiqui_closeScalesBtnModal" type="button" class="neu-btn neu-btn-primary">Fechar</button>',
			'</div>',
			'</div>',
			'</div>'
		].join('\n');

		// ===============================
		//  ESTADO E HELPERS
		// ===============================
		var APP_STATE = { scalesMD: '', scalesMD2: '' };

		var qs = function (sel, root) { return (root || container).querySelector(sel); };
		var qsa = function (sel, root) { return Array.from((root || container).querySelectorAll(sel)); };
		var toSlug = function (s) {
			return (s || '').toLowerCase()
				.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
				.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
		};

		function copyToClipboard(text) {
			try {
				if (navigator.clipboard && window.isSecureContext) {
					return navigator.clipboard.writeText(text).then(function () { return true; });
				}
			} catch (e) {}
			var ta = document.createElement('textarea');
			ta.value = text;
			ta.style.position = 'fixed';
			ta.style.left = '-9999px';
			document.body.appendChild(ta);
			ta.focus();
			ta.select();
			var ok = false;
			try { ok = document.execCommand('copy'); } catch (e) {}
			document.body.removeChild(ta);
			return Promise.resolve(ok);
		}

		var getVal = function (id) {
			var el = document.getElementById(id);
			return el ? (el.value || '').trim() : '';
		};

		function formatarDuasColunas(textoEsquerda, textoDireita, larguraColuna) {
			var linhasEsq = (textoEsquerda || '').split('\n');
			var linhasDir = (textoDireita || '').split('\n');
			var maxLinhas = Math.max(linhasEsq.length, linhasDir.length);
			var out = '';
			for (var i = 0; i < maxLinhas; i++) {
				var lEsq = (linhasEsq[i] || '').padEnd(larguraColuna);
				var lDir = linhasDir[i] || '';
				out += lEsq + ' | ' + lDir + '\n';
			}
			return out;
		}

		// ===============================
		//  DADOS DOS GRUPOS
		// ===============================
		var EXAME_PSIQUICO_GRUPOS = [
			{
				icon: 'fa-user-tie', title: 'Aspecto geral',
				subgroups: [
					{ label: 'Cuidado', options: ['Adequado', 'Descuidado'] },
					{ label: 'Higiene', options: ['Adequada', 'Precária'] },
					{ label: 'Compostura', options: ['Preservada', 'Alterada'] }
				]
			},
			{
				icon: 'fa-handshake-angle', title: 'Atitude',
				subgroups: [
					{ label: 'Cooperação', options: ['Cooperativo', 'Pouco cooperativo', 'Hostil'] },
					{ label: 'Motivação', options: ['Motivado p/ tratamento', 'Pouco motivado'] }
				]
			},
			{
				icon: 'fa-compass', title: 'Consciência',
				subgroups: [
					{ label: 'Nível', options: ['Clara', 'Rebaixada', 'Flutuante'] }
				]
			},
			{
				icon: 'fa-map-location-dot', title: 'Orientação',
				subgroups: [
					{ label: 'Tempo', options: ['Orientado', 'Desorientado'] },
					{ label: 'Espaço', options: ['Orientado', 'Desorientado'] },
					{ label: 'Pessoa', options: ['Orientado', 'Desorientado'] }
				]
			},
			{
				icon: 'fa-comments', title: 'Discurso',
				subgroups: [
					{ label: 'Fluência', options: ['Fluente', 'Arrastado'] },
					{ label: 'Coerência', options: ['Coerente', 'Incoerente'] },
					{ label: 'Volume', options: ['Adequado', 'Hipofonia', 'Hipersonoridade'] },
					{ label: 'Velocidade', options: ['Normal', 'Reduzida', 'Taquilalia'] }
				]
			},
			{
				icon: 'fa-face-smile', title: 'Humor',
				subgroups: [
					{ label: 'Qualidade', options: ['Eutímico', 'Depressivo', 'Ansioso', 'Eufórico', 'Lábil'] }
				]
			},
			{
				icon: 'fa-masks-theater', title: 'Afeto',
				subgroups: [
					{ label: 'Congruência', options: ['Congruente', 'Incongruente'] },
					{ label: 'Amplitude', options: ['Normal', 'Amortecido', 'Restrito', 'Emboto'] }
				]
			},
			{
				icon: 'fa-project-diagram', title: 'Pensamento',
				subgroups: [
					{ label: 'Curso', options: ['Normal', 'Lentificado', 'Acelerado', 'Fuga de ideias'] },
					{ label: 'Forma', options: ['Organizada', 'Desorganizada', 'Tangencial'] },
					{ label: 'Conteúdo', options: ['Normal', 'Ideias obsessivas', 'Delírios'] }
				]
			},
			{
				icon: 'fa-eye', title: 'Percepções',
				subgroups: [
					{ label: 'Qualidade', options: ['Sem alterações', 'Alucinações auditivas', 'Alucinações visuais', 'Ilusões'] }
				]
			},
			{
				icon: 'fa-puzzle-piece', title: 'Cognição',
				subgroups: [
					{ label: 'Memória', options: ['Preservada', 'Comprometida'] },
					{ label: 'Atenção', options: ['Preservada', 'Déficit'] },
					{ label: 'Concentração', options: ['Preservada', 'Prejudicada'] },
					{ label: 'Inteligência', options: ['Dentro da média', 'Abaixo da média'] }
				]
			},
			{
				icon: 'fa-bolt', title: 'Insight',
				subgroups: [
					{ label: 'Reconhecimento', options: ['Reconhece a doença', 'Reconhecimento parcial', 'Sem reconhecimento'] }
				]
			},
			{
				icon: 'fa-scale-balanced', title: 'Julgamento',
				subgroups: [
					{ label: 'Qualidade', options: ['Adequado', 'Parcialmente preservado', 'Prejudicado'] }
				]
			}
		];

		// ===============================
		//  RENDER DOS GRUPOS
		// ===============================
		var formContainer = document.getElementById('psiqui_examePsiquicoForm');

		function createGroupComponent(groupData) {
			var groupId = toSlug(groupData.title);
			var section = document.createElement('section');
			section.className = 'neu-inset';
			section.id = 'psiqui_group-' + groupId;

			var subgroupsHTML = groupData.subgroups.map(function (sub) {
				var subId = toSlug(sub.label);
				var checkboxesHTML = sub.options.map(function (opt) {
					return '<label class="neu-form-label flex items-center gap-4" style="font-size:12px">' +
						'<input type="checkbox" name="psiqui_' + groupId + '-' + subId + '" value="' + opt + '" class="w-4 h-4"> ' +
						opt + '</label>';
				}).join('');

				return '<div>' +
					'<span class="font-semibold" style="font-size:14px">' + sub.label + '</span>' +
					'<div class="flex flex-row flex-wrap items-center gap-x-6 gap-y-2 mt-2">' + checkboxesHTML + '</div>' +
					'</div>';
			}).join('<hr style="border:0;border-top:2px solid #0a74da;width:80%;margin:10px auto">');

			section.innerHTML = '<h3 class="mb-4 font-bold flex justify-center items-center gap-3" style="font-size:16px">' +
				'<i class="fa-solid ' + groupData.icon + ' text-gray-500"></i> ' + groupData.title + '</h3>' +
				'<div class="flex flex-col gap-2 mb-2">' + subgroupsHTML + '</div>' +
				'<input type="text" id="psiqui_comp-' + groupId + '" class="neu-form-input mt-4 w-full" style="max-width:100%;height:32px" placeholder="Complemento...">';

			formContainer.appendChild(section);
		}

		EXAME_PSIQUICO_GRUPOS.forEach(createGroupComponent);

		// Data padrão
		var dataEl = document.getElementById('psiqui_data');
		if (dataEl && !dataEl.value) {
			dataEl.value = new Date().toISOString().slice(0, 16);
		}

		// ===============================
		//  ESCALAS (MODAL)
		// ===============================
		function getScaleResultText(checkAll) {
			var getResult = function (containerId) {
				var root = document.getElementById(containerId);
				if (!root) return null;
				var totalEl = root.querySelector('.total-score');
				var interpEl = root.querySelector('.interpretation');
				var isAnswered = totalEl && totalEl.textContent !== '-';
				if (!isAnswered && !checkAll) return null;
				return {
					total: isAnswered ? totalEl.textContent : 'Não preenchido',
					interp: isAnswered ? interpEl.textContent : 'Não aplicado'
				};
			};

			var phq = getResult('psiqui_phq9');
			var gad = getResult('psiqui_gad7');
			var cage = getResult('psiqui_cage');
			var bdi = getResult('psiqui_bdi');

			var scaleText = '## Escalas\n\n';
			if (phq || checkAll) scaleText += '### PHQ-9\n- **Total:** ' + (phq ? phq.total : '-') + ' (de 27)\n- **Interpretação:** ' + (phq ? phq.interp : '-') + '\n\n';
			if (gad || checkAll) scaleText += '### GAD-7\n- **Total:** ' + (gad ? gad.total : '-') + ' (de 21)\n- **Interpretação:** ' + (gad ? gad.interp : '-') + '\n\n';
			if (cage || checkAll) scaleText += '### CAGE\n- **Total:** ' + (cage ? cage.total : '-') + ' (de 4, Sim=1)\n- **Interpretação:** ' + (cage ? cage.interp : '-') + '\n\n';
			if (bdi || checkAll) scaleText += '### Beck (BDI-II)\n- **Total:** ' + (bdi ? bdi.total : '-') + ' (de 63)\n- **Interpretação:** ' + (bdi ? bdi.interp : '-') + '\n\n';

			var anyAnswered = phq || gad || cage || bdi;
			return (anyAnswered || checkAll) ? scaleText.trim() : '';
		}

		function getScaleBlocks(checkAll) {
			var getResult = function (containerId) {
				var root = document.getElementById(containerId);
				if (!root) return null;
				var totalEl = root.querySelector('.total-score');
				var interpEl = root.querySelector('.interpretation');
				var isAnswered = totalEl && totalEl.textContent !== '-';
				if (!isAnswered && !checkAll) return null;
				return {
					total: isAnswered ? totalEl.textContent : 'Não preenchido',
					interp: isAnswered ? interpEl.textContent : 'Não aplicado'
				};
			};

			var phq = getResult('psiqui_phq9');
			var gad = getResult('psiqui_gad7');
			var cage = getResult('psiqui_cage');
			var bdi = getResult('psiqui_bdi');

			var blocks = [];
			var pushBlock = function (title, r, max) {
				var total = r ? r.total : '-';
				var interp = r ? r.interp : '-';
				blocks.push('### ' + title + '\n- **Total:** ' + total + ' (de ' + max + ')\n- **Interpretação:** ' + interp);
			};

			if (phq || checkAll) pushBlock('PHQ-9', phq, 27);
			if (gad || checkAll) pushBlock('GAD-7', gad, 21);
			if (cage || checkAll) pushBlock('CAGE', cage, 4);
			if (bdi || checkAll) pushBlock('Beck (BDI-II)', bdi, 63);

			return blocks;
		}

		function getScaleResultTextTwoCols(checkAll, larguraColuna) {
			var blocks = getScaleBlocks(checkAll);
			if (!blocks.length && !checkAll) return '';

			var separador = '#'.padEnd(larguraColuna - 1, '=');
			var out = '## Escalas\n\n';

			for (var i = 0; i < blocks.length; i += 2) {
				var left = blocks[i] || '';
				var right = blocks[i + 1] || '';
				out += formatarDuasColunas(left, right, larguraColuna);
				out += formatarDuasColunas(separador, separador, larguraColuna) + '\n';
			}
			return out.trim();
		}

		function generateScale(containerId, title, questions, options) {
			var scaleContainer = document.getElementById(containerId);
			if (!scaleContainer) return;

			var questionsHTML = questions.map(function (q, i) {
				var opts = options.map(function (opt) {
					return '<option value="' + opt.score + '">' + opt.text + '</option>';
				}).join('');
				return '<div class="neu-form-group flex flex-col md:flex-row md:items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-100" style="margin-bottom:8px">' +
					'<label class="neu-form-label" style="font-size:12px">' + (i + 1) + '. ' + q + '</label>' +
					'<select class="neu-form-select scale-item" style="width:100%;max-width:256px">' +
					'<option value="-1">Selecione...</option>' + opts + '</select></div>';
			}).join('');

			scaleContainer.innerHTML = '<h3 class="mb-2 font-bold" style="font-size:16px">' + title + '</h3>' +
				'<p class="font-semibold text-gray-500 mb-4" style="font-size:14px">Responda considerando as últimas 2 semanas:</p>' +
				'<div class="flex flex-col">' + questionsHTML + '</div>' +
				'<div class="neu-inset mt-4 p-3 text-center">' +
				'<span class="font-bold" style="font-size:12px">Total: <span class="total-score">-</span></span> | ' +
				'<span class="font-bold" style="font-size:12px">Interpretação: <span class="interpretation">-</span></span></div>';
		}

		function setupScoreUpdater(containerId, calculateScore, getInterpretation) {
			var scaleContainer = document.getElementById(containerId);
			if (!scaleContainer) return;

			var items = qsa('.scale-item', scaleContainer);
			var totalEl = qs('.total-score', scaleContainer);
			var interpEl = qs('.interpretation', scaleContainer);

			var update = function () {
				var score = calculateScore(items);
				if (totalEl) totalEl.textContent = String(score);
				if (interpEl) interpEl.textContent = getInterpretation(score);
				APP_STATE.scalesMD = getScaleResultText(true);
				APP_STATE.scalesMD2 = getScaleResultTextTwoCols(true, 75);
			};

			items.forEach(function (item) { item.addEventListener('change', update); });
			update();
		}

		function generateCAGE() {
			var cageContainer = document.getElementById('psiqui_cage');
			if (!cageContainer) return;

			var questions = [
				'Alguma vez sentiu que deveria diminuir a quantidade de bebida?',
				'As pessoas criticaram o seu modo de beber?',
				'Alguma vez sentiu-se mal ou culpado por beber?',
				'De manhã, já tomou bebida logo ao acordar?'
			];

			var questionsHTML = questions.map(function (q, i) {
				return '<label class="neu-form-label flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100" style="font-size:12px">' +
					'<input type="checkbox" class="w-5 h-5 scale-item"> ' + (i + 1) + '. ' + q + '</label>';
			}).join('');

			cageContainer.innerHTML = '<h3 class="mb-4 font-bold" style="font-size:16px">CAGE</h3>' +
				'<div class="flex flex-col gap-2">' + questionsHTML + '</div>' +
				'<div class="neu-inset mt-4 p-3 text-center">' +
				'<span class="font-bold" style="font-size:12px">Total: <span class="total-score">-</span></span> | ' +
				'<span class="font-bold" style="font-size:12px">Interpretação: <span class="interpretation">-</span></span></div>';

			setupScoreUpdater('psiqui_cage',
				function (items) { return items.reduce(function (sum, item) { return sum + (item.checked ? 1 : 0); }, 0); },
				function (score) { return score >= 2 ? 'Positivo (risco)' : 'Negativo'; }
			);
		}

		function generatePHQ9() {
			var questions = [
				'Pouco interesse ou prazer em fazer as coisas',
				'Se sentir para baixo, deprimido(a) ou sem esperanças',
				'Dificuldade para pegar no sono, manter o sono ou dormir demais',
				'Cansaço ou pouca energia',
				'Falta de apetite ou comer demais',
				'Sentir-se mal consigo mesmo(a) — um fracasso ou decepção',
				'Dificuldade para se concentrar',
				'Lentidão para se mover/falar ou agitação',
				'Pensamentos de que seria melhor estar morto(a) ou se ferir'
			];
			var options = [
				{ text: 'Nunca', score: 0 },
				{ text: 'Alguns dias', score: 1 },
				{ text: 'Mais da metade dos dias', score: 2 },
				{ text: 'Quase todos os dias', score: 3 }
			];
			generateScale('psiqui_phq9', 'PHQ-9 (Depressão)', questions, options);

			setupScoreUpdater('psiqui_phq9',
				function (items) { return items.reduce(function (sum, item) { return sum + Math.max(0, parseInt(item.value)); }, 0); },
				function (score) {
					if (score <= 4) return 'Mínimo/ausente';
					if (score <= 9) return 'Leve';
					if (score <= 14) return 'Moderado';
					if (score <= 19) return 'Moderado-grave';
					return 'Grave';
				}
			);
		}

		function generateGAD7() {
			var questions = [
				'Sentir-se nervoso(a), ansioso(a) ou no limite',
				'Não conseguir parar/controlar a preocupação',
				'Preocupar-se demais com diferentes coisas',
				'Dificuldade para relaxar',
				'Agitação a ponto de ser difícil ficar parado(a)',
				'Irritar-se ou ficar impaciente facilmente',
				'Sentir medo como se algo terrível fosse acontecer'
			];
			var options = [
				{ text: 'Nunca', score: 0 },
				{ text: 'Alguns dias', score: 1 },
				{ text: 'Mais da metade dos dias', score: 2 },
				{ text: 'Quase todos os dias', score: 3 }
			];
			generateScale('psiqui_gad7', 'GAD-7 (Ansiedade)', questions, options);

			setupScoreUpdater('psiqui_gad7',
				function (items) { return items.reduce(function (sum, item) { return sum + Math.max(0, parseInt(item.value)); }, 0); },
				function (score) {
					if (score <= 4) return 'Mínimo/ausente';
					if (score <= 9) return 'Leve';
					if (score <= 14) return 'Moderado';
					return 'Grave';
				}
			);
		}

		function generateBDI() {
			var questions = [
				'Tristeza', 'Pessimismo', 'Sentimento de fracasso', 'Perda de prazer',
				'Sentimento de culpa', 'Sentimento de punição', 'Autoaversão', 'Autoacusação',
				'Ideias de suicídio', 'Choro', 'Irritabilidade', 'Retração social',
				'Indecisão', 'Autoimagem corporal', 'Fadiga', 'Apetite',
				'Insônia', 'Irritabilidade (física)', 'Concentração', 'Cansaço', 'Libido'
			];
			var options = [
				{ text: '0', score: 0 },
				{ text: '1', score: 1 },
				{ text: '2', score: 2 },
				{ text: '3', score: 3 }
			];
			generateScale('psiqui_bdi', 'Inventário de Depressão de Beck (BDI-II)', questions, options);

			setupScoreUpdater('psiqui_bdi',
				function (items) { return items.reduce(function (sum, item) { return sum + Math.max(0, parseInt(item.value)); }, 0); },
				function (score) {
					if (score <= 13) return 'Mínimo/ausente';
					if (score <= 19) return 'Leve';
					if (score <= 28) return 'Moderado';
					return 'Grave';
				}
			);
		}

		// ===============================
		//  SETUP MODAL ESCALAS
		// ===============================
		function setupScalesModal() {
			var modal = document.getElementById('psiqui_scalesModal');
			var overlay = document.getElementById('psiqui_scalesModalOverlay');
			var openBtn = document.getElementById('psiqui_openScalesBtn');
			var closeH = document.getElementById('psiqui_closeScalesBtn');
			var closeF = document.getElementById('psiqui_closeScalesBtnModal');
			var copyScalesBtn = document.getElementById('psiqui_copyScalesBtn');
			var tabNav = document.getElementById('psiqui_tabNav');
			var panels = modal ? modal.querySelectorAll('.neu-tab-panel') : [];

			var open = function () {
				if (modal) modal.classList.remove('hidden');
				if (overlay) overlay.classList.remove('hidden');
			};
			var close = function () {
				if (modal) modal.classList.add('hidden');
				if (overlay) overlay.classList.add('hidden');
			};

			if (openBtn) openBtn.addEventListener('click', open);
			if (closeH) closeH.addEventListener('click', close);
			if (closeF) closeF.addEventListener('click', close);
			if (overlay) overlay.addEventListener('click', close);

			if (tabNav) {
				tabNav.addEventListener('click', function (e) {
					var t = e.target;
					if (!(t instanceof HTMLElement) || t.tagName !== 'BUTTON') return;
					var tabId = t.getAttribute('data-tab');
					tabNav.querySelectorAll('.neu-tab-button').forEach(function (btn) { btn.classList.remove('active'); });
					t.classList.add('active');
					panels.forEach(function (p) {
						if (p.id === tabId) { p.classList.add('active'); }
						else { p.classList.remove('active'); }
					});
				});
			}

			generatePHQ9();
			generateGAD7();
			generateCAGE();
			generateBDI();

			APP_STATE.scalesMD = getScaleResultText(true);
			APP_STATE.scalesMD2 = getScaleResultTextTwoCols(true, 75);

			if (copyScalesBtn) {
				copyScalesBtn.addEventListener('click', function () {
					APP_STATE.scalesMD = getScaleResultText(true);
					APP_STATE.scalesMD2 = getScaleResultTextTwoCols(true, 75);
					copyToClipboard(APP_STATE.scalesMD2 || APP_STATE.scalesMD || '## Escalas\n—').then(function (ok) {
						alert(ok ? 'Resultados das escalas copiados!' : 'Falha ao copiar escalas.');
					});
				});
			}
		}

		setupScalesModal();

		// ===============================
		//  GERAÇÃO DO MARKDOWN
		// ===============================
		function gerarTextoDoGrupo(group) {
			if (!group) return '';
			var groupId = toSlug(group.title);
			var texto = '### ' + group.title + '\n';

			var selectionsText = '';
			group.subgroups.forEach(function (sub) {
				var subId = toSlug(sub.label);
				var checked = qsa('input[name="psiqui_' + groupId + '-' + subId + '"]:checked', container).map(function (c) { return c.value; });
				if (checked.length) {
					selectionsText += '- ' + sub.label + ': ' + checked.join(', ') + '\n';
				}
			});

			texto += selectionsText || '- *(Sem alterações marcadas)*\n';

			var comp = getVal('psiqui_comp-' + groupId);
			if (comp) texto += '  Complemento: ' + comp + '\n';

			return texto.trim();
		}

		function copiarTudo() {
			var LARGURA_COLUNA = 75;
			var separador = '#'.padEnd(LARGURA_COLUNA - 1, '=');

			var nome = getVal('psiqui_nome') || '-';
			var dataStr = getVal('psiqui_data');
			var dataFmt = dataStr ? new Date(dataStr).toLocaleString('pt-BR') : '-';

			var md = '**EXAME PSÍQUICO** — Paciente: ' + nome + ' | Data: ' + dataFmt + '\n\n';

			for (var i = 0; i < EXAME_PSIQUICO_GRUPOS.length; i += 2) {
				var gEsq = EXAME_PSIQUICO_GRUPOS[i];
				var gDir = EXAME_PSIQUICO_GRUPOS[i + 1];
				var tEsq = gerarTextoDoGrupo(gEsq);
				var tDir = gerarTextoDoGrupo(gDir);
				md += formatarDuasColunas(tEsq, tDir, LARGURA_COLUNA);
				md += formatarDuasColunas(separador, separador, LARGURA_COLUNA) + '\n';
			}

			md += '### Observações adicionais\n' + (getVal('psiqui_obsAdicionais') || '- *(sem observações adicionais)*') + '\n\n';
			md += separador + '\n\n';

			var escalas2 = APP_STATE.scalesMD2 || getScaleResultTextTwoCols(true, LARGURA_COLUNA);
			if (escalas2) {
				md += escalas2;
			} else {
				var escalasMD = APP_STATE.scalesMD || getScaleResultText(true);
				if (escalasMD) md += escalasMD;
			}

			copyToClipboard(md).then(function (ok) {
				alert(ok ? 'Exame psíquico + escalas copiados para a área de transferência.' : 'Falha ao copiar. Tente um navegador diferente ou HTTPS.');
			});
		}

		var copyBtn = document.getElementById('psiqui_copyBtn');
		if (copyBtn) copyBtn.addEventListener('click', copiarTudo);

		console.log('[Psiqui] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_psiqui')) {
		renderPsiqui();
	}

	window.renderPsiqui = renderPsiqui;
})();
