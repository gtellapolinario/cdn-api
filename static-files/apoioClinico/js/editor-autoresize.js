(() => {
	'use strict';

	// =========================
	// Configura\u00E7\u00E3o e Estado
	// =========================
	let editorDiv = null;
	let limitWarning = null;
	const maxFontSize = 14;
	let isBlocked = false;

	// =========================
	// Utilit\u00E1rios
	// =========================

	// Garante refer\u00EAncia global aos hotstrings
	function ensureHotstrings() {
		if (!window.hotstringsRef && window.hotstrings) {
			window.hotstringsRef = window.hotstrings;
		}
		// Fallback: se variavel hotstrings nao existir globalmente
		if (!window.hotstringsRef && window.HotstringsModule && window.HotstringsModule.data) {
			window.hotstringsRef = window.HotstringsModule.data;
		}
	}

	function adjustFontSize() {
		if (!editorDiv) return;

		// Altura dispon\u00E3vel (fixo ou din\u00E3mico)
		const availableHeight = editorDiv.clientHeight;
		let currentSize = parseFloat(window.getComputedStyle(editorDiv).fontSize);

		// 1. Se estourou, diminui
		if (editorDiv.scrollHeight > availableHeight) {
			limitWarning.classList.remove('opacity-0');
			limitWarning.textContent = 'Ajustando texto...';
			isBlocked = true; // Bloqueia digita\u00E7\u00E3o temporariamente

			while (editorDiv.scrollHeight > availableHeight && currentSize > 9) {
				currentSize -= 0.5;
				editorDiv.style.fontSize = currentSize + 'px';
			}

			// Se ap\u00F3s diminuir at\u00E9 9px ainda sobrar, bloqueia de vdd
			if (editorDiv.scrollHeight > availableHeight) {
				limitWarning.textContent = 'Limite de espa\u00E7o atingido!';
				// Reverte ultima digita\u00E7\u00E3o se poss\u00EDvel? (nao implementado, apenas impede nova)
			} else {
				limitWarning.classList.add('opacity-0');
				isBlocked = false;
			}
		}
		// 2. Se N\u00C3O estiver estourando, tenta aumentar (somente se n\u00E3o estiver bloqueado por logica)
		else if (currentSize < maxFontSize) {
			// Loop reverso: aumenta at\u00E9 estourar, depois volta 1 passo
			let tempSize = currentSize;

			// Simula aumento
			while (editorDiv.scrollHeight <= availableHeight && tempSize < maxFontSize) {
				tempSize += 0.5;
				editorDiv.style.fontSize = tempSize + 'px';
			}

			// Se estourou no ultimo passo, volta 1
			if (editorDiv.scrollHeight > availableHeight) {
				tempSize -= 0.5;
				editorDiv.style.fontSize = tempSize + 'px';
			}

			limitWarning.classList.add('opacity-0');
			isBlocked = false;
		}
	}

	function handleBeforeInput(e) {
		if (isBlocked && e.inputType && e.inputType.startsWith('insert')) {
			e.preventDefault();
		}
	}

	function handleEditorKeydown(e) {
		const allowedKeys = ['Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'];

		// Bloqueia apenas teclas de inser\u00E7\u00E3o quando no limite
		if (isBlocked) {
			const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;
			const isAllowedKey = allowedKeys.includes(e.key);

			// Permite: teclas permitidas, atalhos (Ctrl+C, etc), e teclas de fun\u00E7\u00E3o
			if (!isAllowedKey && !isModifierKey && e.key.length === 1) {
				e.preventDefault();
				return;
			}
		}

		// Tab indent
		if (e.key === 'Tab') {
			e.preventDefault();
			document.execCommand('insertText', false, '  ');
		}
	}

	// =========================
	// Intercepta\u00E7\u00E3o da Sidebar (Hotstrings)
	// =========================
	function setupSidebarInterception() {
		const sidebarPanel = document.getElementById('hotstringItems');
		if (sidebarPanel) {
			// Remove listener antigo se houver (dif\u00EDcil sem ref, mas adiciona novo com flag capture)
			// Melhor: adiciona listener no document delegando pro sidebar
			// Ou assume que este script roda apenas uma vez.

			sidebarPanel.addEventListener(
				'click',
				(e) => {
					const btn = e.target.closest('button');
					if (!btn) return;
					const codeEl = btn.querySelector('.font-mono');
					if (codeEl) {
						const code = codeEl.textContent.trim();

						ensureHotstrings();

						// Busca no ref global atualizado
						const content = window.hotstringsRef && (window.hotstringsRef[code] || window.hotstringsRef[code.toLowerCase()]);

						if (content && editorDiv) {
							e.preventDefault(); // Impede comportamento padrao antigo
							e.stopImmediatePropagation(); // Impede outros scripts

							editorDiv.focus();

							// Verifica se cabe
							const prevSize = editorDiv.style.fontSize;

							// Insere
							document.execCommand('insertText', false, content);

							// Ajusta fonte
							adjustFontSize();

							// Se bloqueou ap\u00F3s inserir, avisa
							if (isBlocked) {
								// Opcional: Desfazer? Por enquanto deixa o usuario apagar
							}
						}
					}
				},
				true,
			); // Captura fase para ganhar dos outros scripts
		}
	}

	// =========================
	// Overrides Globais
	// =========================
	function setupGlobalOverrides() {
		window.insertAtCursor = function (textOrCode) {
			if (!editorDiv) return;
			if (isBlocked) return;

			ensureHotstrings();
			// Tenta expandir se for codigo
			const expanded = window.hotstringsRef && (window.hotstringsRef[textOrCode] || window.hotstringsRef[textOrCode.toLowerCase()]);
			const content = expanded || textOrCode;

			editorDiv.focus();
			document.execCommand('insertText', false, content);
			adjustFontSize();
		};

		window.copyToClipboard = function () {
			if (!editorDiv) return;
			const text = editorDiv.innerText;
			navigator.clipboard
				.writeText(text)
				.then(() => {
					// Feedback visual
					const btn = document.getElementById('btnCopyRec');
					if (btn) {
						const original = btn.textContent;
						btn.textContent = 'Copiado!';
						setTimeout(() => (btn.textContent = original || 'Copiar'), 1500);
					}
				})
				.catch((err) => console.error('Erro ao copiar', err));
		};

		// Override tryExpandHotstring (desabilita implementa\u00E7\u00E3o antiga)
		window.tryExpandHotstring = function () {
			return false;
		};
	}

	// =========================
	// Inicializa\u00E7\u00E3o
	// =========================
	function initEditor() {
		console.log('Gt-Medic: Inicializando editor...');

		const oldEditor = document.getElementById('textArea');
		if (!oldEditor) {
			console.warn('Editor textArea n\u00E3o encontrado');
			return;
		}

		// Clone para remover listeners antigos e limpar estado
		const newEditor = oldEditor.cloneNode(true);
		oldEditor.parentNode.replaceChild(newEditor, oldEditor);

		// Atualiza refer\u00EAncias
		editorDiv = newEditor;
		limitWarning = document.getElementById('limitWarning');

		// Listeners
		editorDiv.addEventListener('keydown', handleEditorKeydown);
		editorDiv.addEventListener('beforeinput', handleBeforeInput);
		editorDiv.addEventListener('input', adjustFontSize);
		editorDiv.addEventListener('paste', (e) => {
			if (isBlocked) e.preventDefault();
			// Apos colar, ajusta fonte (timeout para pegar conteudo)
			setTimeout(adjustFontSize, 0);
		});

		// Fonte Inicial
		editorDiv.style.fontSize = maxFontSize + 'px';
		adjustFontSize();
	}

	// Boot
	document.addEventListener('DOMContentLoaded', () => {
		ensureHotstrings();
		setInterval(ensureHotstrings, 500);

		// Inicializa depois de um delay para garantir que DOM est\u00E1 pronto
		setTimeout(() => {
			initEditor();
			setupGlobalOverrides();
			setupSidebarInterception();
		}, 200);
	});
})();
