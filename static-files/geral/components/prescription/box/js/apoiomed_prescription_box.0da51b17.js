//@ts-nocheck
// apoiomed_prescription_box.js (VERSÃO FINAL PERFEITA)
(() => {
	'use strict';

	/**
	 * ✅ Configuração centralizada
	 */
	const EDITOR_CONFIG = {
		maxFontSize: 12,
		minFontSize: 7,
		fontSizeStep: 0.5,
		maxResizeAttempts: 20,
		hotstringsCheckInterval: 500,
	};

	/**
	 * ✅ Estado do editor encapsulado
	 */
	const editorState = {
		element: null,
		limitWarning: null,
		isBlocked: false,
		hotstringsRef: null,
	};

	function renderPrescriptionBox() {
		// ✅ CORRETO: Busca APENAS o container específico do editor
		const container = document.getElementById('apoiomed_prescription');

		if (!container) {
			console.error('Container #apoiomed_prescription não encontrado');
			return;
		}

		// Evita re-renderizar se já existe
		if (!document.getElementById('textArea')) {
			container.innerHTML = `
        <div class="mt-2 rounded-md border border-slate-50 p-0 sm:p-1 print:p-0 overflow-hidden print:overflow-visible bg-slate-50">
          <div class="relative w-full bg-white">
            <div 
              id="textArea" 
              contenteditable="true" 
              spellcheck="false" 
              role="textbox" 
              aria-multiline="true"
              aria-label="Área de prescrição médica"
              class="w-full resize-none max-w-full rounded-md border border-slate-50 bg-white px-2 sm:px-3 print:px-3 py-2 sm:py-3 print:py-3 font-mono leading-relaxed outline-none focus:ring-2 focus:ring-slate-100 break-words overflow-wrap-anywhere h-[580px] overflow-hidden print:border-0"
              style="white-space: pre-wrap; font-size: ${EDITOR_CONFIG.maxFontSize}px;"></div>

            <div 
              id="limitWarning"
              class="hidden absolute bottom-2 left-2 right-2 bg-red-50 text-red-600 text-xs font-bold px-3 py-2 rounded shadow-sm border border-red-100 print:hidden z-20">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">warning</span>
                Limite da página atingido.
              </div>
            </div>
          </div>
        </div>
      `;
		}

		initializeEditorLogic();
	}

	function initializeEditorLogic() {
		editorState.element = document.getElementById('textArea');
		editorState.limitWarning = document.getElementById('limitWarning');

		if (!editorState.element) {
			console.warn('Elemento #textArea não encontrado');
			return;
		}

		console.log('✅ Editor: Inicializando...');

		// Event listeners
		editorState.element.addEventListener('keydown', handleEditorKeydown);
		editorState.element.addEventListener('beforeinput', handleBeforeInput);
		editorState.element.addEventListener('input', adjustFontSize);
		editorState.element.addEventListener('paste', handlePaste);

		// Inicializa hotstrings
		ensureHotstrings();
		setInterval(ensureHotstrings, EDITOR_CONFIG.hotstringsCheckInterval);

		// Ajuste inicial
		adjustFontSize();

		// API pública
		setupGlobalAPI();

		console.log('✅ Editor inicializado com sucesso');
	}

	/**
	 * ✅ Garante referência aos hotstrings
	 */
	function ensureHotstrings() {
		if (!editorState.hotstringsRef && window.hotstrings) {
			editorState.hotstringsRef = window.hotstrings;
			console.log('🔗 Hotstrings conectados ao editor');
		}
	}

	/**
	 * ✅ Ajuste automático de fonte
	 */
	function adjustFontSize() {
		const editor = editorState.element;
		if (!editor) return false;

		const style = window.getComputedStyle(editor);
		let currentSize = parseFloat(style.fontSize) || EDITOR_CONFIG.maxFontSize;

		const isOverflowing = () => editor.scrollHeight > editor.clientHeight;

		// Reduzir se estiver estourando
		if (isOverflowing()) {
			while (isOverflowing() && currentSize > EDITOR_CONFIG.minFontSize) {
				currentSize -= EDITOR_CONFIG.fontSizeStep;
				editor.style.fontSize = currentSize + 'px';
			}
		}
		// Aumentar se tiver espaço
		else if (currentSize < EDITOR_CONFIG.maxFontSize) {
			let attempts = 0;

			while (!isOverflowing() && currentSize < EDITOR_CONFIG.maxFontSize && attempts < EDITOR_CONFIG.maxResizeAttempts) {
				const nextSize = currentSize + EDITOR_CONFIG.fontSizeStep;
				editor.style.fontSize = nextSize + 'px';

				if (isOverflowing()) {
					editor.style.fontSize = currentSize + 'px';
					break;
				}

				currentSize = nextSize;
				attempts++;
			}
		}

		// Atualiza estado de bloqueio
		const hitLimit = isOverflowing() && currentSize <= EDITOR_CONFIG.minFontSize;
		updateBlockedState(hitLimit);

		return hitLimit;
	}

	/**
	 * ✅ Atualiza estado de bloqueio
	 */
	function updateBlockedState(isBlocked) {
		editorState.isBlocked = isBlocked;

		if (editorState.limitWarning) {
			editorState.limitWarning.classList.toggle('hidden', !isBlocked);
			editorState.limitWarning.style.display = isBlocked ? 'block' : 'none';
		}

		// Dispara evento
		window.dispatchEvent(
			new CustomEvent('editorBlockedStateChanged', {
				detail: { isBlocked },
			}),
		);
	}

	/**
	 * ✅ Expande hotstring
	 */
	function tryExpandActiveWord() {
		ensureHotstrings();
		if (!editorState.hotstringsRef) return false;

		const sel = window.getSelection();
		if (!sel.rangeCount) return false;

		const range = sel.getRangeAt(0);
		const node = range.endContainer;

		if (node.nodeType !== Node.TEXT_NODE) return false;

		const text = node.textContent;
		const caretPos = range.endOffset;
		const textBefore = text.slice(0, caretPos);

		const match = textBefore.match(/(\S+)$/);
		if (!match) return false;

		const code = match[0];
		const content = editorState.hotstringsRef[code] || editorState.hotstringsRef[code.toLowerCase()];

		if (content) {
			const rangeToReplace = document.createRange();
			rangeToReplace.setStart(node, match.index);
			rangeToReplace.setEnd(node, caretPos);

			sel.removeAllRanges();
			sel.addRange(rangeToReplace);
			document.execCommand('insertText', false, content);

			editorState.element.focus();
			adjustFontSize();

			// Dispara evento
			window.dispatchEvent(
				new CustomEvent('hotstringExpanded', {
					detail: { code, content },
				}),
			);

			return true;
		}

		return false;
	}

	/**
	 * ✅ Handler de teclado
	 */
	function handleEditorKeydown(e) {
		const ALLOWED_KEYS = ['Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'];

		if (editorState.isBlocked) {
			const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;
			const isAllowedKey = ALLOWED_KEYS.includes(e.key);

			if (!isAllowedKey && !isModifierKey && e.key.length === 1) {
				e.preventDefault();
				return;
			}
		}

		if (e.key === ' ' || e.key === 'Enter') {
			if (tryExpandActiveWord()) {
				e.preventDefault();
			}
		}
	}

	/**
	 * ✅ Handler de input
	 */
	function handleBeforeInput(e) {
		const BLOCKED_INPUT_TYPES = ['insertFromPaste', 'insertFromDrop', 'insertText', 'insertLineBreak', 'insertParagraph'];

		if (editorState.isBlocked && BLOCKED_INPUT_TYPES.includes(e.inputType)) {
			e.preventDefault();
		}
	}

	/**
	 * ✅ Handler de paste
	 */
	function handlePaste(e) {
		if (editorState.isBlocked) {
			e.preventDefault();
		}
	}

	/**
	 * ✅ API pública do editor
	 */
	function setupGlobalAPI() {
		window.insertAtCursor = function (textOrCode) {
			if (!textOrCode || editorState.isBlocked) return;

			ensureHotstrings();
			const expanded = editorState.hotstringsRef && (editorState.hotstringsRef[textOrCode] || editorState.hotstringsRef[textOrCode.toLowerCase()]);
			const contentToInsert = expanded || textOrCode;

			if (editorState.element) {
				editorState.element.focus();
				document.execCommand('insertText', false, contentToInsert);
				adjustFontSize();
			}
		};

		window.copyToClipboard = function () {
			if (!editorState.element) return;

			const text = editorState.element.innerText;
			navigator.clipboard
				.writeText(text)
				.then(() => {
					console.log('📋 Texto copiado para clipboard');

					window.dispatchEvent(
						new CustomEvent('editorContentCopied', {
							detail: { text },
						}),
					);
				})
				.catch((err) => console.error('❌ Erro ao copiar:', err));
		};

		window.getEditorContent = function () {
			return editorState.element?.innerText || '';
		};

		window.setEditorContent = function (content) {
			if (editorState.element) {
				editorState.element.innerText = content;
				adjustFontSize();
			}
		};

		window.clearEditor = function () {
			if (editorState.element) {
				editorState.element.innerText = '';
				adjustFontSize();
			}
		};

		window.isEditorBlocked = function () {
			return editorState.isBlocked;
		};
	}

	// Auto-executa
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderPrescriptionBox);
	} else {
		renderPrescriptionBox();
	}

	// API pública
	window.renderPrescriptionBox = renderPrescriptionBox;
	window.initializeEditorLogic = initializeEditorLogic;
})();
