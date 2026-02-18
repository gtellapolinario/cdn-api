// header_tool_container.js
// Renderiza tabs dentro do wrapper correto da produção.
// Estrutura: #header-index > div.w-full > #toolboxContainer > div.flex > buttons
// Este script preenche #toolboxContainer com os botões de tab.
// Expõe: window.renderHeaderToolContainer
(() => {
	'use strict';

	const TABS = [
		{ id: 'prescricao', label: 'Prescrição', icon: 'edit_note' },
		{ id: 'exames', label: 'Exames', icon: 'lab_profile' },
		{ id: 'guias', label: 'Guias SUS', icon: 'description' },
		{ id: 'apoio', label: 'Apoio', icon: 'info' },
		{ id: 'psf', label: 'PSF', icon: 'groups' },
	];

	let rendered = false;
	let abortCtrl = null;
	let tabButtons = null;
	let bus = null;

	function render() {
		const container = document.getElementById('toolboxContainer');
		if (!container) {
			console.warn('[Tabs] #toolboxContainer not found');
			return;
		}
		if (rendered) return;

		bus = window.__asideBus;
		abortCtrl = new AbortController();
		const signal = abortCtrl.signal;

		// ✅ HTML idêntico à produção
		container.innerHTML = `
      <div class="flex flex-wrap gap-2 justify-around p-4 bg-[#e0e5ec] rounded-[30px] shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] md:gap-4">
        ${TABS.map(
					(t) => `
          <button type="button"
            class="tabBtn inline-flex items-center gap-2 py-[1rem] px-4 border-none rounded-[50px] bg-[#e0e5ec] text-sm font-medium text-slate-800 drop-shadow-lg transition-all duration-300 hover:text-[#007BFF] hover:bg-gray-50 focus:outline-none"
            data-tab="${t.id}">
            <span class="material-symbols-outlined text-base">${t.icon}</span>
            ${t.label}
          </button>
        `,
				).join('')}
      </div>
    `;

		tabButtons = container.querySelectorAll('.tabBtn[data-tab]');

		tabButtons.forEach((btn) => {
			btn.addEventListener('click', () => setActiveTab(btn.dataset.tab), { signal });
		});

		rendered = true;
		window.__asideRegistry?.register('header-tabs', { render, destroy, setActiveTab, getActiveTab });

		// Restaura tab salva
		setTimeout(() => {
			setActiveTab(sessionStorage.getItem('rx_active_tab') || 'prescricao');
		}, 100);

		console.log('[Tabs] ✅ Rendered (' + tabButtons.length + ' tabs)');
	}

	// =========================================
	// TAB LOGIC
	// =========================================

	function setActiveTab(name) {
		if (!tabButtons) return;

		// Toggle toolbar prescrição (ID correto de produção)
		const toolbar = document.getElementById('toolbar-prescricao');
		if (toolbar) {
			const show = name === 'prescricao';
			toolbar.classList.toggle('hidden', !show);
			toolbar.classList.toggle('flex', show);
		}

		// Toggle panels — suporta tanto tab-xxx (hyphen) quanto tab_xxx (underscore)
		document.querySelectorAll('[id^="tab-"], [id^="tab_"]').forEach((panel) => {
			const panelName = panel.id.replace(/^tab[-_]/, '');
			panel.classList.toggle('hidden', panelName !== name);
		});

		// Toggle button states
		tabButtons.forEach((btn) => {
			const active = btn.dataset.tab === name;
			btn.classList.toggle('text-[#007BFF]', active);
			btn.classList.toggle('font-bold', active);
			btn.classList.toggle('text-slate-800', !active);
			btn.classList.toggle('font-medium', !active);
		});

		sessionStorage.setItem('rx_active_tab', name);
		lazyInit(name);

		bus?.emit('tabChanged', { tab: name });
		window.dispatchEvent(new CustomEvent('tabChanged', { detail: { tab: name } }));
	}

	function lazyInit(name) {
		if ((name === 'apoio' || name === 'psf') && window.EspecialidadesModule?.init && !window.EspecialidadesModule._initialized) {
			window.EspecialidadesModule.init();
			window.EspecialidadesModule._initialized = true;
		}
		if (name === 'exames' && window.ExamesModule?.init && !window.ExamesModule._initialized) {
			window.ExamesModule.init();
		}
		if (name === 'psf' && window.ProtocolosModule?.init) {
			window.ProtocolosModule.init();
		}
	}

	function getActiveTab() {
		return sessionStorage.getItem('rx_active_tab') || 'prescricao';
	}

	function destroy() {
		abortCtrl?.abort();
		abortCtrl = null;
		tabButtons = null;
		rendered = false;
		const c = document.getElementById('toolboxContainer');
		if (c) c.innerHTML = '';
	}

	window.renderHeaderToolContainer = render;
})();
