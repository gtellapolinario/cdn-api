/**
 * Entrada Rapida de Exames
 * Convertido de exames_simples_2025.html — layout original preservado
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

	function renderExamesSimples() {
		const container = document.getElementById('psf_sub_exames_simples');
		if (!container) {
			console.error('[ExamesSimples] Container #psf_sub_exames_simples nao encontrado');
			return;
		}

		injectNeuCSS();

		container.innerHTML = `
			<div class="neu-card w-full max-w-4xl mx-auto">
				<header class="text-center flex flex-row justify-start gap-6 m-4">
					<h1 class="text-center text-2xl font-bold flex items-center justify-center gap-3 text-[#23217c]">
						<i class="fa-solid fa-vial-virus"></i>
						Entrada de Exames
					</h1>
				</header>

				<!-- Campos de Cabecalho -->
				<div class="neu-inset mb-4 p-4 flex flex-col sm:flex-row items-center gap-4">
					<div class="flex flex-row gap-2 items-center justify-center w-full sm:w-auto">
						<label for="es_nomePaciente" class="neu-form-label" style="font-size:14px;font-weight:bold">Nome:</label>
						<input type="text" id="es_nomePaciente" class="neu-form-input" style="max-width:200px;height:32px" placeholder="Nome completo" />
					</div>
					<div class="flex flex-row gap-2 items-center justify-center w-full sm:w-auto">
						<label for="es_dataColeta" class="neu-form-label" style="font-size:14px;font-weight:bold">Coleta:</label>
						<input type="date" id="es_dataColeta" class="neu-form-input" style="max-width:180px;height:32px" />
					</div>
				</div>

				<!-- Grid para os campos de exame -->
				<div id="es_examForm" class="grid grid-cols-3 gap-x-4 gap-y-2 p-2"></div>

				<!-- Botao de Acao -->
				<div class="neu-btn-container mt-8">
					<button id="es_copyBtn" type="button" class="neu-btn neu-btn-primary" style="min-width:220px">
						<i class="fa-solid fa-clipboard mr-2"></i>
						Copiar
					</button>
				</div>
			</div>
		`;

		// ===============================
		//  DADOS DOS CAMPOS
		// ===============================
		const examFields = [
			// Coluna 1 - Hematologia
			{ id: 'HC' },
			{ id: 'HB' },
			{ id: 'HT' },
			{ id: 'VCM' },
			{ id: 'GL' },
			{ id: 'S' },
			{ id: 'L' },
			{ id: 'PQL' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			// Coluna 2 - Perfil Lipidico e Metabolico
			{ id: 'CT' },
			{ id: 'HDL' },
			{ id: 'LDL' },
			{ id: 'TRG' },
			{ id: 'GJ' },
			{ id: 'HBG' },
			{ id: 'K+' },
			{ id: '\u00C1.\u00DAR' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			// Coluna 3 - Funcao Renal e Urina
			{ id: 'CR' },
			{ id: 'TFG' },
			{ id: 'UR' },
			{ id: 'EAS' },
			{ id: 'EPF' },
			{ id: 'PSOF' },
			{ id: 'UC' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
			{ id: '*EX', color: '#dc3545' },
		];

		// ===============================
		//  GERACAO DINAMICA DOS CAMPOS
		// ===============================
		const formContainer = document.getElementById('es_examForm');
		const fieldGroups = [[], [], []];
		let exCounter = 0;
		const itemsPerCol = Math.ceil(examFields.length / 3);

		examFields.forEach(function (field, i) {
			const colIndex = Math.floor(i / itemsPerCol);
			if (field.id === '*EX') {
				exCounter++;
				field.uniqueId = 'es_ex-' + exCounter;
			} else {
				field.uniqueId = 'es_' + field.id.replace(/[^a-zA-Z0-9]/g, '_');
			}
			if (fieldGroups[colIndex]) {
				fieldGroups[colIndex].push(field);
			}
		});

		fieldGroups.forEach(function (colItems) {
			const colDiv = document.createElement('div');
			colDiv.className = 'flex flex-col gap-2';

			colItems.forEach(function (field) {
				const formGroup = document.createElement('div');
				formGroup.className = 'neu-form-group flex items-center gap-2';
				formGroup.style.marginBottom = '6px';

				const labelEl = document.createElement('label');
				labelEl.className = 'neu-form-label';
				labelEl.style.fontSize = '13px';
				labelEl.style.fontWeight = 'bold';
				labelEl.style.width = '50px';
				labelEl.style.textAlign = 'right';
				labelEl.style.justifyContent = 'flex-end';
				labelEl.setAttribute('for', field.uniqueId);
				labelEl.textContent = field.id + ':';

				if (field.color) {
					labelEl.style.color = field.color;
				}

				formGroup.appendChild(labelEl);

				const inputEl = document.createElement('input');
				inputEl.type = 'text';
				inputEl.id = field.uniqueId;
				inputEl.className = 'neu-form-input';
				inputEl.style.maxWidth = '100%';
				inputEl.style.flexGrow = '1';
				inputEl.style.height = '30px';

				formGroup.appendChild(inputEl);
				colDiv.appendChild(formGroup);
			});

			formContainer.appendChild(colDiv);
		});

		// ===============================
		//  DATA PADRAO
		// ===============================
		const dataColetaEl = document.getElementById('es_dataColeta');
		if (dataColetaEl && !dataColetaEl.value) {
			dataColetaEl.value = new Date().toISOString().slice(0, 10);
		}

		// ===============================
		//  CLIPBOARD HELPER
		// ===============================
		function copyToClipboard(text) {
			try {
				if (navigator.clipboard && window.isSecureContext) {
					return navigator.clipboard.writeText(text).then(function () { return true; });
				}
			} catch (e) { /* fallback below */ }
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.style.position = 'fixed';
			ta.style.left = '-9999px';
			document.body.appendChild(ta);
			ta.focus();
			ta.select();
			let ok = false;
			try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
			document.body.removeChild(ta);
			return Promise.resolve(ok);
		}

		// ===============================
		//  LOGICA DE COPIA (MARKDOWN)
		// ===============================
		const copyBtn = document.getElementById('es_copyBtn');

		copyBtn.addEventListener('click', function () {
			const nome = (document.getElementById('es_nomePaciente').value || '').trim();
			const dataColetaValue = (document.getElementById('es_dataColeta').value || '').trim();
			const dataColeta = dataColetaValue
				? new Date(dataColetaValue + 'T00:00:00').toLocaleDateString('pt-BR')
				: 'N/A';

			// Mapeamento de categorias
			const fieldMapping = {
				'HEMATOLOGIA': ['HC', 'HB', 'HT', 'VCM', 'GL', 'S', 'L', 'PQL'],
				'PERFIL LIP\u00CDDICO E METAB\u00D3LICO': ['CT', 'HDL', 'LDL', 'TRG', 'GJ', 'HBG', 'K+', '\u00C1.\u00DAR'],
				'FUN\u00C7\u00C3O RENAL E URINA': ['CR', 'TFG', 'UR', 'EAS', 'EPF', 'PSOF', 'UC'],
				'OUTROS': [],
			};

			const resultados = {};
			let hasValue = false;

			examFields.forEach(function (field) {
				const input = document.getElementById(field.uniqueId);
				if (!input) return;
				const value = input.value.trim();

				if (value) {
					hasValue = true;
					if (field.id === '*EX') {
						if (!resultados['OUTROS']) resultados['OUTROS'] = [];
						resultados['OUTROS'].push(value);
					} else {
						const categories = Object.keys(fieldMapping);
						for (let c = 0; c < categories.length; c++) {
							const category = categories[c];
							if (fieldMapping[category].indexOf(field.id) !== -1) {
								if (!resultados[category]) resultados[category] = [];
								resultados[category].push(field.id + ': ' + value);
								break;
							}
						}
					}
				}
			});

			if (!hasValue) {
				alert('Nenhum exame foi preenchido.');
				return;
			}

			// Constroi a string Markdown
			let md = '## EXAMES REALIZADOS - Nome: ' + nome + ' | Coleta: ' + dataColeta + '\n\n';

			const categoryOrder = Object.keys(fieldMapping);
			categoryOrder.forEach(function (category) {
				if (resultados[category] && resultados[category].length > 0) {
					md += '**' + category + ':**\n';
					md += '- ' + resultados[category].join('; ') + '\n\n';
				}
			});

			copyToClipboard(md.trim()).then(function (ok) {
				if (ok || ok === undefined) {
					alert('Exames formatados copiados para a area de transferencia!');
					// Limpa o formulario apos copiar
					examFields.forEach(function (field) {
						const input = document.getElementById(field.uniqueId);
						if (input) input.value = '';
					});
					const nomeInput = document.getElementById('es_nomePaciente');
					if (nomeInput) nomeInput.value = '';
				} else {
					alert('Nao foi possivel copiar os exames.');
				}
			});
		});

		console.log('[ExamesSimples] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_exames_simples')) {
		renderExamesSimples();
	}

	window.renderExamesSimples = renderExamesSimples;
})();
