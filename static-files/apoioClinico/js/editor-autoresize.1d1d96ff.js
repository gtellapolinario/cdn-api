(() => {
	'use strict';

	// =========================
	// Configuração
	// =========================
	const EDITOR_ID = 'textArea';
	const LIMIT_WARNING_ID = 'limitWarning';
	const SIDEBAR_ID = 'hotstringItems';
	const COPY_BTN_ID = 'btnCopyRec';

	const MAX_FONT_SIZE = 14;
	const MIN_FONT_SIZE = 9;
	const STEP = 0.5;

	// =========================
	// Estado
	// =========================
	let editorDiv = null;
	let limitWarning = null;

	let isBlocked = false; // bloqueia inserção quando não cabe mais
	let lastGoodHTML = '';
	let lastGoodFontSize = `${MAX_FONT_SIZE}px`;

	let mo = null; // MutationObserver
	let rafId = null;

	// =========================
	// Utilitários DOM
	// =========================
	const $ = (id) => document.getElementById(id);

	function ensureLimitWarning() {
		limitWarning = $(LIMIT_WARNING_ID);

		if (limitWarning) return limitWarning;

		// Cria uma mensagem discreta acima do editor (não quebra layout)
		if (!editorDiv || !editorDiv.parentElement) return null;

		const el = document.createElement('div');
		el.id = LIMIT_WARNING_ID;
		el.className = 'text-[11px] font-semibold opacity-0 transition-opacity mb-1';
		el.textContent = '';
		editorDiv.parentElement.insertBefore(el, editorDiv);
		limitWarning = el;
		return el;
	}

	function showWarning(text) {
		if (!limitWarning) ensureLimitWarning();
		if (!limitWarning) return;
		limitWarning.textContent = text;
		limitWarning.classList.remove('opacity-0');
	}

	function hideWarning() {
		if (!limitWarning) return;
		limitWarning.classList.add('opacity-0');
		limitWarning.textContent = '';
	}

	function getFontSizePx() {
		if (!editorDiv) return MAX_FONT_SIZE;
		const s = window.getComputedStyle(editorDiv).fontSize;
		const n = parseFloat(s);
		return Number.isFinite(n) ? n : MAX_FONT_SIZE;
	}

	function setFontSizePx(px) {
		if (!editorDiv) return;
		editorDiv.style.fontSize = `${px}px`;
	}

	function isOverflowing() {
		if (!editorDiv) return false;
		// tolerância de 1px para evitar tremedeira
		return editorDiv.scrollHeight > editorDiv.clientHeight + 1;
	}

	function snapshotGoodState() {
		if (!editorDiv) return;
		lastGoodHTML = editorDiv.innerHTML;
		lastGoodFontSize = editorDiv.style.fontSize || `${getFontSizePx()}px`;
	}

	function restoreGoodState() {
		if (!editorDiv) return;
		editorDiv.innerHTML = lastGoodHTML || '';
		editorDiv.style.fontSize = lastGoodFontSize || `${MAX_FONT_SIZE}px`;
	}

	// =========================
	// Hotstrings (referência global)
	// =========================
	function ensureHotstrings() {
		// 1) hotstrings direto
		if (!window.hotstringsRef && window.hotstrings) {
			window.hotstringsRef = window.hotstrings;
		}
		// 2) fallback módulo
		if (!window.hotstringsRef && window.HotstringsModule && window.HotstringsModule.data) {
			window.hotstringsRef = window.HotstringsModule.data;
		}
	}

	function resolveHotstring(codeOrText) {
		ensureHotstrings();
		const ref = window.hotstringsRef;
		if (!ref) return null;

		const key = String(codeOrText || '').trim();
		if (!key) return null;

		// suporta objeto normal e Map
		if (ref instanceof Map) {
			return ref.get(key) || ref.get(key.toLowerCase()) || null;
		}

		return ref[key] || ref[key.toLowerCase()] || null;
	}

	// =========================
	// Inserção no cursor (Selection/Range) com fallback
	// =========================
	function insertTextAtCursor(text) {
		if (!editorDiv) return false;

		const content = String(text ?? '');
		if (!content) return true;

		editorDiv.focus();

		const sel = window.getSelection?.();
		if (sel && sel.rangeCount > 0) {
			const range = sel.getRangeAt(0);

			// garante que o range está dentro do editor
			if (!editorDiv.contains(range.commonAncestorContainer)) {
				// joga o cursor pro final
				const r = document.createRange();
				r.selectNodeContents(editorDiv);
				r.collapse(false);
				sel.removeAllRanges();
				sel.addRange(r);
			}

			// re-obtem range após possível ajuste
			const range2 = sel.getRangeAt(0);
			range2.deleteContents();

			const node = document.createTextNode(content);
			range2.insertNode(node);

			// move cursor para depois do texto inserido
			range2.setStartAfter(node);
			range2.setEndAfter(node);
			sel.removeAllRanges();
			sel.addRange(range2);

			return true;
		}

		// fallback antigo
		try {
			return document.execCommand('insertText', false, content);
		} catch {
			return false;
		}
	}

	// =========================
	// Ajuste de fonte (com cap de iterações + rollback)
	// =========================
	function adjustFontSize() {
		if (!editorDiv) return;

		ensureLimitWarning();

		const availableHeight = editorDiv.clientHeight;
		if (!availableHeight) return;

		let current = getFontSizePx();

		// 1) Se overflow: diminuir até caber ou chegar no mínimo
		if (isOverflowing()) {
			showWarning('Ajustando texto...');
			let guard = 0;

			while (isOverflowing() && current > MIN_FONT_SIZE && guard < 100) {
				current = Math.max(MIN_FONT_SIZE, current - STEP);
				setFontSizePx(current);
				guard++;
			}

			// Se ainda overflow no mínimo -> hard limit
			if (isOverflowing() && current <= MIN_FONT_SIZE + 0.0001) {
				isBlocked = true;
				showWarning('Limite de espaço atingido! Apague algo para continuar.');
			} else {
				isBlocked = false;
				hideWarning();
				snapshotGoodState();
			}

			return;
		}

		// 2) Se não overflow: tenta aumentar até o máximo (sem estourar)
		if (current < MAX_FONT_SIZE) {
			let temp = current;
			let guard = 0;

			while (!isOverflowing() && temp < MAX_FONT_SIZE && guard < 100) {
				temp = Math.min(MAX_FONT_SIZE, temp + STEP);
				setFontSizePx(temp);
				guard++;
			}

			// se estourou no último passo, volta 1 step
			if (isOverflowing()) {
				temp = Math.max(MIN_FONT_SIZE, temp - STEP);
				setFontSizePx(temp);
			}

			isBlocked = false;
			hideWarning();
			snapshotGoodState();
		}
	}

	function scheduleAdjust() {
		if (rafId) cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(() => {
			rafId = null;
			adjustFontSize();
		});
	}

	// Inserção segura com rollback se exceder
	function safeInsert(text) {
		if (!editorDiv) return;
		if (isBlocked) return;

		// snapshot antes de inserir
		snapshotGoodState();

		const ok = insertTextAtCursor(text);
		if (!ok) return;

		adjustFontSize();

		// se ficou hard limit, reverte a inserção e bloqueia
		if (isBlocked) {
			restoreGoodState();
			adjustFontSize();
		}
	}

	// =========================
	// Eventos do editor (bloqueio)
	// =========================
	function handleBeforeInput(e) {
		if (!editorDiv) return;

		if (isBlocked && e.inputType && e.inputType.startsWith('insert')) {
			e.preventDefault();
		}
	}

	function handleEditorKeydown(e) {
		const allowedKeys = ['Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];

		if (isBlocked) {
			const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;
			const isAllowedKey = allowedKeys.includes(e.key);

			// bloqueia apenas inserção de caracteres (key.length === 1)
			if (!isAllowedKey && !isModifierKey && e.key.length === 1) {
				e.preventDefault();
				return;
			}
		}

		// Tab indent
		if (e.key === 'Tab') {
			e.preventDefault();
			safeInsert('  ');
		}
	}

	function handlePaste(e) {
		if (!editorDiv) return;

		if (isBlocked) {
			e.preventDefault();
			return;
		}

		// snapshot para rollback se necessário
		snapshotGoodState();

		// intercepta texto puro e insere via safeInsert (evita HTML esquisito)
		const text = e.clipboardData?.getData('text/plain');
		if (text != null) {
			e.preventDefault();
			safeInsert(text);
			return;
		}

		// se não der pra pegar texto, deixa passar e ajusta depois
		setTimeout(scheduleAdjust, 0);
	}

	// =========================
	// Sidebar interception (hotstrings)
	// =========================
	function setupSidebarInterception() {
		const sidebarPanel = $(SIDEBAR_ID);
		if (!sidebarPanel) return;

		if (sidebarPanel.dataset.bound === '1') return;
		sidebarPanel.dataset.bound = '1';

		sidebarPanel.addEventListener(
			'click',
			(e) => {
				const btn = e.target.closest?.('button');
				if (!btn) return;

				const codeEl = btn.querySelector?.('.font-mono');
				if (!codeEl) return;

				const code = codeEl.textContent?.trim();
				if (!code) return;

				const expanded = resolveHotstring(code);
				const content = expanded ?? code;

				e.preventDefault();
				e.stopImmediatePropagation();

				safeInsert(content);
			},
			true, // capture para ganhar de outros scripts
		);
	}

	// =========================
	// Overrides globais
	// =========================
	function setupGlobalOverrides() {
		// evita reatribuir toda hora
		if (window.GtMedicEditorModule && window.GtMedicEditorModule._overrides) return;

		window.insertAtCursor = function (textOrCode) {
			if (!editorDiv) return;
			if (isBlocked) return;

			const expanded = resolveHotstring(textOrCode);
			const content = expanded ?? textOrCode;
			safeInsert(content);
		};

		window.copyToClipboard = function () {
			if (!editorDiv) return;

			const text = editorDiv.innerText ?? '';

			const done = () => {
				const btn = $(COPY_BTN_ID);
				if (!btn) return;
				const original = btn.textContent;
				btn.textContent = 'Copiado!';
				setTimeout(() => (btn.textContent = original || 'Copiar'), 1500);
			};

			if (navigator.clipboard?.writeText) {
				navigator.clipboard
					.writeText(text)
					.then(done)
					.catch((err) => console.error('Erro ao copiar', err));
				return;
			}

			// fallback antigo
			try {
				const ta = document.createElement('textarea');
				ta.value = text;
				ta.style.position = 'fixed';
				ta.style.left = '-9999px';
				document.body.appendChild(ta);
				ta.select();
				document.execCommand('copy');
				document.body.removeChild(ta);
				done();
			} catch (err) {
				console.error('Erro ao copiar', err);
			}
		};

		// desabilita implementação antiga se existir
		window.tryExpandHotstring = function () {
			return false;
		};

		window.GtMedicEditorModule = window.GtMedicEditorModule || {};
		window.GtMedicEditorModule._overrides = true;
	}

	// =========================
	// Inicialização editor (idempotente)
	// =========================
	function initEditorIfPresent() {
		const el = $(EDITOR_ID);
		if (!el) return false;

		// se já está inicializado nesse mesmo elemento, sai
		if (el.dataset.bound === '1') {
			editorDiv = el;
			ensureLimitWarning();
			return true;
		}

		// opcional: clone remove listeners antigos de outros scripts
		// (só faz se tiver parent)
		let target = el;
		if (el.parentNode) {
			const cloned = el.cloneNode(true);
			el.parentNode.replaceChild(cloned, el);
			target = cloned;
		}

		editorDiv = target;
		editorDiv.dataset.bound = '1';

		limitWarning = $(LIMIT_WARNING_ID) || null;
		ensureLimitWarning();

		// listeners
		editorDiv.addEventListener('keydown', handleEditorKeydown);
		editorDiv.addEventListener('beforeinput', handleBeforeInput);
		editorDiv.addEventListener('input', scheduleAdjust);
		editorDiv.addEventListener('paste', handlePaste);

		// font inicial
		editorDiv.style.fontSize = `${MAX_FONT_SIZE}px`;

		// snapshot inicial
		snapshotGoodState();

		// ajuste inicial
		adjustFontSize();

		return true;
	}

	// =========================
	// Boot robusto (DOM + SPA)
	// =========================
	function boot() {
		ensureHotstrings();
		setupGlobalOverrides();

		// tenta init imediato
		initEditorIfPresent();
		setupSidebarInterception();

		// observa o DOM pra SPA/render tardio
		if (mo) mo.disconnect();
		mo = new MutationObserver(() => {
			ensureHotstrings();

			const ok = initEditorIfPresent();
			if (ok) {
				setupSidebarInterception();
				// se voltou a caber (após apagar, por ex.), destrava
				if (!isOverflowing()) {
					isBlocked = false;
					hideWarning();
					snapshotGoodState();
				}
			}
		});

		mo.observe(document.documentElement, { childList: true, subtree: true });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', boot, { once: true });
	} else {
		boot();
	}
})();
