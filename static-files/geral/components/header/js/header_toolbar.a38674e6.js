// header_toolbar.js
// Renderiza botões + checkboxes dentro de #toolbar-prescricao
// ID correto conforme HTML de produção: toolbar-prescricao (NÃO header-toolbar)
// Expõe: window.renderHeaderToolbar
(() => {
	'use strict';

	let rendered = false;
	let abortCtrl = null;

	function render() {
		const container = document.getElementById('toolbar-prescricao');
		if (!container) {
			console.warn('[Toolbar] #toolbar-prescricao not found');
			return;
		}
		if (rendered) return;

		abortCtrl = new AbortController();
		const signal = abortCtrl.signal;

		container.className = 'bg-gray-200 flex flex-wrap items-center gap-8 p-4 m-4 rounded-xl shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff]';

		// ✅ Conteúdo idêntico ao HTML de produção
		container.innerHTML = `
      <button id="printBtnrec" type="button"
        class="inline-flex items-center gap-2 py-[1rem] px-4 border-none rounded-[50px] bg-[#e0e5ec] text-sm font-medium text-slate-800 drop-shadow-lg transition-all duration-300 hover:text-[#007BFF] hover:bg-gray-50 focus:outline-none">
        <span class="material-symbols-outlined text-base">print</span>
        Imprimir
      </button>

      <button id="clearBtn" type="button"
        class="inline-flex items-center gap-2 py-[1rem] px-4 border-none rounded-[50px] bg-[#e0e5ec] text-sm font-medium text-slate-800 drop-shadow-lg transition-all duration-300 hover:text-[#007BFF] hover:bg-gray-50 focus:outline-none">
        <span class="material-symbols-outlined text-base">ink_eraser</span>
        Limpar
      </button>

      <button id="copyBtn" type="button"
        class="inline-flex items-center gap-2 py-[1rem] px-4 border-none rounded-[50px] bg-[#e0e5ec] text-sm font-medium text-slate-800 drop-shadow-lg transition-all duration-300 hover:text-[#007BFF] hover:bg-gray-50 focus:outline-none">
        <span class="material-symbols-outlined text-base">content_copy</span>
        Copiar
      </button>

      <div>
        <label class="flex items-center gap-2 mt-6 mb-2">
          <input title="sus" type="checkbox" id="mostrarLogoSus" checked class="w-4 h-4" />
          <span class="text-sm font-semibold">Logo do SUS</span>
        </label>

        <label class="flex items-center gap-2 mb-2">
          <input title="code" type="checkbox" id="codesBtn" checked class="w-4 h-4" />
          <span class="text-sm font-semibold">Códigos</span>
        </label>

        <label class="flex items-center gap-2 mb-2">
          <input type="checkbox" id="mostrarMedico" class="w-4 h-4" />
          <span class="text-sm font-semibold">Médico/CRM</span>
        </label>

        <label class="flex items-center gap-2 mb-2">
          <input type="checkbox" id="mostrarLocal" checked class="w-4 h-4" />
          <span class="text-sm font-semibold">Local/CNES</span>
        </label>
      </div>
    `;

		// ---- Bind events ----
		document.getElementById('printBtnrec').addEventListener(
			'click',
			(e) => {
				e.preventDefault();
				window.print();
			},
			{ signal },
		);

		document.getElementById('clearBtn').addEventListener(
			'click',
			(e) => {
				e.preventDefault();
				if (!confirm('Tem certeza que deseja limpar a receita?')) return;
				const api = window.__asideRegistry?.get('prescription-editor');
				if (api?.clearContent) api.clearContent();
				else {
					const ed = document.getElementById('textArea');
					if (ed) {
						ed.innerHTML = '';
						ed.focus();
					}
				}
			},
			{ signal },
		);

		document.getElementById('copyBtn').addEventListener(
			'click',
			async (e) => {
				e.preventDefault();
				const api = window.__asideRegistry?.get('prescription-editor');
				const text = api?.getContent ? api.getContent() : document.getElementById('textArea')?.innerText || '';
				if (!text) {
					flashBtn(document.getElementById('copyBtn'), 'Vazio!');
					return;
				}
				try {
					if (api?.copyContent) await api.copyContent();
					else await navigator.clipboard.writeText(text);
					flashBtn(document.getElementById('copyBtn'), 'Copiado!');
				} catch (err) {
					console.error('[Toolbar]', err);
				}
			},
			{ signal },
		);

		// ---- Checkboxes ----
		bindCb(
			'mostrarLogoSus',
			(on) => {
				const logo = document.getElementById('logoSus');
				const txt = document.getElementById('textoViaDigital');
				if (logo) logo.classList.toggle('hidden', !on);
				if (txt) txt.classList.toggle('hidden', on);
			},
			signal,
		);

		bindCb(
			'codesBtn',
			(on) => {
				const p = document.getElementById('codesPanel');
				if (p) p.classList.toggle('hidden', !on);
			},
			signal,
		);

		bindCb(
			'mostrarMedico',
			(on) => {
				const r = document.getElementById('rowMedico');
				if (r) r.classList.toggle('hidden', !on);
			},
			signal,
		);

		bindCb(
			'mostrarLocal',
			(on) => {
				const r = document.getElementById('rowLocal');
				if (r) r.classList.toggle('hidden', !on);
			},
			signal,
		);

		rendered = true;
		window.__asideRegistry?.register('header-toolbar', { render, destroy });
		console.log('[Toolbar] ✅ Rendered');
	}

	function bindCb(id, cb, signal) {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('change', (e) => cb(e.target.checked), { signal });
		setTimeout(() => cb(el.checked), 200);
	}

	function flashBtn(btn, text) {
		if (!btn) return;
		const orig = btn.innerHTML;
		btn.textContent = text;
		btn.classList.add('ring-2', 'ring-emerald-300');
		setTimeout(() => {
			btn.innerHTML = orig;
			btn.classList.remove('ring-2', 'ring-emerald-300');
		}, 1200);
	}

	function destroy() {
		abortCtrl?.abort();
		abortCtrl = null;
		rendered = false;
		const c = document.getElementById('toolbar-prescricao');
		if (c) c.innerHTML = '';
	}

	window.renderHeaderToolbar = render;
})();
