/**
 * Escriba Web - Gerenciador de Clipboard
 * Convertido de escriba_2025.html — layout original preservado
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
			.neu-form-input{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;height:30px;transition:box-shadow .2s}
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

	function renderEscriba() {
		const container = document.getElementById('psf_sub_escriba');
		if (!container) {
			console.error('[Escriba] Container #psf_sub_escriba não encontrado');
			return;
		}

		injectNeuCSS();

		container.innerHTML = `
			<div class="neu-card w-full max-w-3xl mx-auto">
				<header class="text-center flex flex-row justify-start gap-6 m-6">
					<h1 class="text-center text-2xl font-bold flex items-center justify-center gap-3 text-[#23217c]">
						<i class="fa-solid fa-brain"></i> Escriba Web <i class="fa-solid fa-brain"></i>
					</h1>
				</header>

				<!-- Controles Principais -->
				<div class="flex flex-col sm:flex-row items-center gap-4 mb-4">
					<select id="escriba_memorySelector" title="Selecione uma memória para visualizar..." class="neu-form-select max-w-[220px] sm:w-auto flex-grow text-sm">
						<option value="">Nenhuma memória salva...</option>
					</select>
					<button id="escriba_addMemoryBtn" type="button" class="neu-btn neu-btn-primary w-[220px] sm:w-auto">
						<i class="fa-solid fa-plus mr-2"></i>
						<span class="text-sm">Add Memória</span>
					</button>
				</div>

				<!-- Textbox de Visualização -->
				<textarea id="escriba_previewBox" class="neu-form-textarea w-full text-sm" rows="8" readonly placeholder="Selecione uma memória para visualizar..."></textarea>

				<!-- Ações -->
				<div class="neu-btn-container mt-6 flex-wrap justify-center">
					<button id="escriba_copyBtn" type="button" class="neu-btn">
						<i class="fa-solid fa-copy mr-2"></i>
						<span class="text-sm">Copiar</span>
					</button>
					<button id="escriba_clearBtn" type="button" class="neu-btn neu-btn-danger">
						<i class="fa-solid fa-trash mr-2"></i>
						<span class="text-sm">LIMPAR</span>
					</button>
				</div>
			</div>
		`;

		// ===============================
		//  ESTADO E ELEMENTOS
		// ===============================
		const memorySelector = document.getElementById('escriba_memorySelector');
		const previewBox = document.getElementById('escriba_previewBox');
		const addMemoryBtn = document.getElementById('escriba_addMemoryBtn');
		const copyBtn = document.getElementById('escriba_copyBtn');
		const clearBtn = document.getElementById('escriba_clearBtn');

		let clipSaves = [];

		// ===============================
		//  FUNÇÕES PRINCIPAIS
		// ===============================
		function refreshSelector() {
			memorySelector.innerHTML = '';
			if (clipSaves.length === 0) {
				previewBox.value = '';
				memorySelector.innerHTML = '<option value="">Nenhuma memória salva...</option>';
				return;
			}
			clipSaves.forEach((text, index) => {
				const option = document.createElement('option');
				option.value = index;
				option.textContent = text.length > 50 ? text.substring(0, 50) + '...' : text;
				memorySelector.appendChild(option);
			});
			memorySelector.value = clipSaves.length - 1;
			updatePreview();
		}

		function updatePreview() {
			const selectedIndex = memorySelector.value;
			if (selectedIndex !== '' && clipSaves[selectedIndex]) {
				previewBox.value = clipSaves[selectedIndex];
			} else {
				previewBox.value = '';
			}
		}

		async function addFromClipboard() {
			try {
				const text = await navigator.clipboard.readText();
				if (text.trim() === '') return;
				if (clipSaves.includes(text)) {
					memorySelector.value = clipSaves.indexOf(text);
					updatePreview();
					return;
				}
				clipSaves.push(text);
				refreshSelector();
			} catch (err) {
				console.error('Falha ao ler o clipboard: ', err);
				alert('Permissão para ler a área de transferência foi negada.');
			}
		}

		function copyPreviewText() {
			const textToCopy = previewBox.value;
			if (textToCopy.trim() === '') return;
			navigator.clipboard.writeText(textToCopy).catch((err) => {
				console.error('Falha ao copiar: ', err);
				alert('Não foi possível copiar o texto.');
			});
		}

		function clearAll() {
			if (clipSaves.length === 0) return;
			if (confirm('Tem certeza que deseja limpar todas as memórias salvas?')) {
				clipSaves = [];
				refreshSelector();
			}
		}

		// ===============================
		//  EVENT LISTENERS
		// ===============================
		memorySelector.addEventListener('change', updatePreview);
		addMemoryBtn.addEventListener('click', addFromClipboard);
		copyBtn.addEventListener('click', copyPreviewText);
		clearBtn.addEventListener('click', clearAll);

		refreshSelector();
		console.log('[Escriba] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_escriba')) {
		renderEscriba();
	}

	window.renderEscriba = renderEscriba;
})();
