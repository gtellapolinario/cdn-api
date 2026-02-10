// prescription_box.js (REFATORADO)
// FONTE ÚNICA DE VERDADE para o editor contenteditable
// Dependências: aside_event_bus.js, aside_registry.js
(() => {
  'use strict';

  const CONFIG = {
    maxFontSize: 12,
    minFontSize: 7,
    fontSizeStep: 0.5,
    maxResizeAttempts: 20,
  };

  /** @type {AsideEventBus} */
  let bus;
  /** @type {AbortController|null} */
  let abortController = null;
  /** @type {HTMLElement|null} */
  let editorEl = null;
  /** @type {HTMLElement|null} */
  let warningEl = null;
  /** @type {boolean} */
  let isBlocked = false;
  /** @type {Record<string, string>|null} */
  let hotstringsRef = null;

  // =========================================
  // RENDER
  // =========================================

  function render() {
    const container = document.getElementById('apoiomed_prescription');
    if (!container) {
      console.warn('[Editor] Container #apoiomed_prescription not found');
      return;
    }

    // Evita re-render se já existe
    if (document.getElementById('textArea')) return;

    bus = window.__asideBus;
    abortController = new AbortController();

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
            style="white-space: pre-wrap; font-size: ${CONFIG.maxFontSize}px;"></div>

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

    editorEl = document.getElementById('textArea');
    warningEl = document.getElementById('limitWarning');

    bindEvents(abortController.signal);
    connectHotstrings();
    adjustFontSize();
    registerComponent();
  }

  // =========================================
  // EVENTS
  // =========================================

  function bindEvents(signal) {
    if (!editorEl) return;

    editorEl.addEventListener('keydown', handleKeydown, { signal });
    editorEl.addEventListener('beforeinput', handleBeforeInput, { signal });
    editorEl.addEventListener('input', () => adjustFontSize(), { signal });
    editorEl.addEventListener('paste', (e) => { if (isBlocked) e.preventDefault(); }, { signal });

    // Resize
    window.addEventListener('resize', () => adjustFontSize(), { signal });
  }

  // =========================================
  // HOTSTRINGS
  // =========================================

  function connectHotstrings() {
    // Tenta conectar imediatamente
    hotstringsRef = resolveHotstrings();

    if (hotstringsRef) return;

    // Se não disponível, aguarda evento do Registry ou tenta uma vez após delay
    bus?.once('hotstringDataReady', () => {
      hotstringsRef = resolveHotstrings();
    });

    // Fallback: tenta uma vez após 2s (para scripts que carregam async sem evento)
    setTimeout(() => {
      if (!hotstringsRef) {
        hotstringsRef = resolveHotstrings();
      }
    }, 2000);
  }

  function resolveHotstrings() {
    if (window.HotstringsModule?.data) return window.HotstringsModule.data;
    if (window.hotstrings && typeof window.hotstrings === 'object') return window.hotstrings;
    return null;
  }

  function tryExpandActiveWord() {
    if (!hotstringsRef) hotstringsRef = resolveHotstrings();
    if (!hotstringsRef) return false;

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
    const content = hotstringsRef[code] || hotstringsRef[code.toLowerCase()];
    if (!content) return false;

    // Substitui o código pelo conteúdo expandido
    const rangeToReplace = document.createRange();
    rangeToReplace.setStart(node, match.index);
    rangeToReplace.setEnd(node, caretPos);

    sel.removeAllRanges();
    sel.addRange(rangeToReplace);
    document.execCommand('insertText', false, content);

    // Reposiciona cursor
    editorEl?.focus();
    adjustFontSize();

    bus?.emit('hotstringExpanded', { code, content });
    return true;
  }

  // =========================================
  // FONT SIZE AUTO-ADJUST
  // =========================================

  function adjustFontSize() {
    if (!editorEl) return false;

    let currentSize = parseFloat(window.getComputedStyle(editorEl).fontSize) || CONFIG.maxFontSize;
    const isOverflowing = () => editorEl.scrollHeight > editorEl.clientHeight;

    // Reduzir se overflow
    if (isOverflowing()) {
      while (isOverflowing() && currentSize > CONFIG.minFontSize) {
        currentSize -= CONFIG.fontSizeStep;
        editorEl.style.fontSize = currentSize + 'px';
      }
    }
    // Aumentar se tem espaço
    else if (currentSize < CONFIG.maxFontSize) {
      let attempts = 0;
      while (!isOverflowing() && currentSize < CONFIG.maxFontSize && attempts < CONFIG.maxResizeAttempts) {
        const next = currentSize + CONFIG.fontSizeStep;
        editorEl.style.fontSize = next + 'px';
        if (isOverflowing()) {
          editorEl.style.fontSize = currentSize + 'px';
          break;
        }
        currentSize = next;
        attempts++;
      }
    }

    const hitLimit = isOverflowing() && currentSize <= CONFIG.minFontSize;
    updateBlockedState(hitLimit);
    return hitLimit;
  }

  function updateBlockedState(blocked) {
    if (isBlocked === blocked) return; // Evita emissão redundante
    isBlocked = blocked;

    if (warningEl) {
      warningEl.classList.toggle('hidden', !blocked);
      warningEl.style.display = blocked ? 'block' : 'none';
    }

    bus?.emit('editorBlockedStateChanged', { isBlocked: blocked });
  }

  // =========================================
  // KEYBOARD HANDLERS
  // =========================================

  const ALLOWED_KEYS = new Set(['Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab']);
  const BLOCKED_INPUT_TYPES = new Set(['insertFromPaste', 'insertFromDrop', 'insertText', 'insertLineBreak', 'insertParagraph']);

  function handleKeydown(e) {
    if (isBlocked) {
      const isModifier = e.ctrlKey || e.metaKey || e.altKey;
      if (!ALLOWED_KEYS.has(e.key) && !isModifier && e.key.length === 1) {
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

  function handleBeforeInput(e) {
    if (isBlocked && BLOCKED_INPUT_TYPES.has(e.inputType)) {
      e.preventDefault();
    }
  }

  // =========================================
  // API PÚBLICA
  // =========================================

  function insertAtCursor(textOrCode) {
    if (!textOrCode || isBlocked || !editorEl) return;

    if (!hotstringsRef) hotstringsRef = resolveHotstrings();
    const expanded = hotstringsRef?.[textOrCode] || hotstringsRef?.[textOrCode.toLowerCase()];
    const content = expanded || textOrCode;

    editorEl.focus();
    document.execCommand('insertText', false, content);
    adjustFontSize();
  }

  function getContent() {
    return editorEl?.innerText || '';
  }

  function setContent(text) {
    if (!editorEl) return;
    editorEl.innerText = text;
    adjustFontSize();
  }

  function clearContent() {
    if (!editorEl) return;
    editorEl.innerText = '';
    adjustFontSize();
  }

  async function copyContent() {
    if (!editorEl) return;
    const text = editorEl.innerText;
    try {
      await navigator.clipboard.writeText(text);
      bus?.emit('editorContentCopied', { text });
      return true;
    } catch (err) {
      console.error('[Editor] Copy failed:', err);
      return false;
    }
  }

  function getIsBlocked() {
    return isBlocked;
  }

  function focus() {
    editorEl?.focus();
  }

  // =========================================
  // REGISTRO & LIFECYCLE
  // =========================================

  function registerComponent() {
    window.__asideRegistry?.register('prescription-editor', {
      render,
      destroy,
      insertAtCursor,
      getContent,
      setContent,
      clearContent,
      copyContent,
      getIsBlocked,
      adjustFontSize,
      focus,
    });
  }

  function destroy() {
    abortController?.abort();
    abortController = null;
    editorEl = null;
    warningEl = null;
    isBlocked = false;
    hotstringsRef = null;
    const container = document.getElementById('apoiomed_prescription');
    if (container) container.innerHTML = '';
  }

  // Backward compat — page script e aside chamam essas globals
  window.renderPrescriptionBox = render;
  window.insertAtCursor = insertAtCursor;
  window.copyToClipboard = copyContent;
  window.getEditorContent = getContent;
  window.setEditorContent = setContent;
  window.clearEditor = clearContent;
  window.isEditorBlocked = getIsBlocked;
})();
