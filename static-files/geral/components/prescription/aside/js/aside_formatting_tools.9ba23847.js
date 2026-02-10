// aside_formatting_tools.js (REFATORADO)
// Dependências: aside_event_bus.js, aside_registry.js
(() => {
	'use strict';

	const FORMAT_COMMANDS = {
		fontSize: [
			{ value: '1', label: 'Pequena', icon: 'format_size', iconSize: '12px' },
			{ value: '3', label: 'Normal', icon: 'format_size', iconSize: '14px' },
			{ value: '5', label: 'Grande', icon: 'format_size', iconSize: '16px' },
		],
		style: [
			{ cmd: 'bold', label: 'Negrito', icon: 'format_bold', iconSize: '18px' },
			{ cmd: 'italic', label: 'Itálico', icon: 'format_italic', iconSize: '18px' },
			{ cmd: 'underline', label: 'Sublinhado', icon: 'format_underlined', iconSize: '18px' },
		],
		align: [
			{ cmd: 'justifyLeft', label: 'Esquerda', icon: 'format_align_left', iconSize: '18px' },
			{ cmd: 'justifyCenter', label: 'Centro', icon: 'format_align_center', iconSize: '18px' },
			{ cmd: 'justifyFull', label: 'Justificado', icon: 'format_align_justify', iconSize: '18px' },
		],
	};

	/** @type {AsideEventBus} */
	let bus;
	/** @type {AbortController|null} */
	let abortController = null;

	// =========================================
	// RENDER
	// =========================================

	function render() {
		const container = document.getElementById('aside_formatting_tools');
		if (!container) return;

		bus = window.__asideBus;
		abortController = new AbortController();

		container.innerHTML = `
      <div class="rounded-2xl shadow-lg border border-slate-50 bg-white p-2 m-2 max-w-[340px] mb-4 relative z-10 print:hidden">
        <div class="flex items-center justify-between mb-2 px-1 border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-700 text-sm">edit_square</span>
            <div class="text-sm font-bold text-slate-700">Formatação</div>
          </div>
          <div class="text-[10px] text-slate-400">Selecione o texto</div>
        </div>

        <div class="flex flex-wrap justify-between p-1 m-0">
          ${renderGroup(FORMAT_COMMANDS.fontSize, true)}
          ${separator()}
          ${renderGroup(FORMAT_COMMANDS.style)}
          ${separator()}
          ${renderGroup(FORMAT_COMMANDS.align)}
          ${separator()}
          <button type="button" data-cmd="removeFormat"
            class="fmt-btn p-1 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded transition-colors"
            title="Limpar formatação">
            <i class="fa-solid fa-text-slash fa-xs"></i>
          </button>
        </div>
      </div>
    `;

		bindEvents(abortController.signal);
		registerComponent();
	}

	// =========================================
	// HTML BUILDERS
	// =========================================

	function renderGroup(items, isFontSize = false) {
		return items
			.map((item) => {
				const cmd = isFontSize ? 'fontSize' : item.cmd;
				const value = isFontSize ? item.value : '';
				const iconStyle = item.iconSize ? `style="font-size: ${item.iconSize}"` : 'class="text-[16px]"';

				return `
          <button type="button"
            data-cmd="${cmd}"
            ${value ? `data-value="${value}"` : ''}
            class="fmt-btn p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
            title="${item.label}">
            <span class="material-symbols-outlined" ${iconStyle}>${item.icon}</span>
          </button>
        `;
			})
			.join('');
	}

	function separator() {
		return '<div class="w-px h-5 bg-slate-200 mx-0.5 self-center"></div>';
	}

	// =========================================
	// EVENTS
	// =========================================

	function bindEvents(signal) {
		// Delegate — um único listener no container
		const container = document.getElementById('aside_formatting_tools');
		if (!container) return;

		container.addEventListener(
			'click',
			(e) => {
				const button = e.target.closest('.fmt-btn');
				if (!button || button.disabled) return;

				const cmd = button.dataset.cmd;
				const value = button.dataset.value || null;

				execFormat(cmd, value);

				// Flash visual
				button.classList.add('bg-blue-100');
				setTimeout(() => button.classList.remove('bg-blue-100'), 200);
			},
			{ signal },
		);
	}

	// =========================================
	// EXEC
	// =========================================

	function execFormat(command, value = null) {
		// execCommand é deprecado mas ainda é a única forma viável para
		// contenteditable sem framework rich-text. Quando migrar para
		// Tiptap/ProseMirror/Slate, substituir por commands do editor.
		try {
			document.execCommand(command, false, value);
		} catch (err) {
			console.warn(`[Formatting] execCommand("${command}") failed:`, err);
			return;
		}

		bus?.emit('formattingApplied', { command, value });
	}

	// =========================================
	// REGISTRO & LIFECYCLE
	// =========================================

	function registerComponent() {
		window.__asideRegistry?.register('formatting-tools', {
			render,
			destroy,
			execFormat,
		});
	}

	function destroy() {
		abortController?.abort();
		abortController = null;
		const container = document.getElementById('aside_formatting_tools');
		if (container) container.innerHTML = '';
	}

	// NÃO auto-executa: container criado por apoiomed_aside.js
	window.renderFormattingTools = render;
})();
