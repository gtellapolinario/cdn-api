(() => {
	'use strict';

	const ADM_ROUTES = [
		{ value: 'USO ORAL', label: 'USO ORAL' },
		{ value: 'USO IM', label: 'USO IM' },
		{ value: 'USO EV', label: 'USO EV' },
		{ value: 'USO SC', label: 'USO SC' },
		{ value: 'USO INTRANASAL', label: 'USO INTRANASAL' },
		{ value: 'USO INALATÓRIO', label: 'USO INALATÓRIO' },
		{ value: 'USO RETAL', label: 'USO RETAL' },
		{ value: 'USO SUBLINGUAL', label: 'USO SUBLINGUAL' },
		{ value: 'USO TÓPICO', label: 'USO TÓPICO' },
		{ value: 'USO OFTÁLMICO', label: 'USO OFTÁLMICO' },
		{ value: 'USO OTOLÓGICO', label: 'USO OTOLÓGICO' },
		{ value: 'USO VAGINAL', label: 'USO VAGINAL' },
		{ value: 'USO TRANSDÉRMICO', label: 'USO TRANSDÉRMICO' },
	];

	const getRoute = (value) => ADM_ROUTES.find((r) => r.value === value.toUpperCase()) || null;
	const getAll = () => ADM_ROUTES;
	const getValues = () => ADM_ROUTES.map((r) => r.value);
	const isValid = (value) => ADM_ROUTES.some((r) => r.value === value.toUpperCase());

	function createSelect(options = {}) {
		const {
			id = 'adm_farmaco',
			name = 'adm_farmaco',
			title = 'select_poso',
			placeholder = 'SELECIONE A VIA',
			selectedValue = '',
			includeEmpty = false,
			className = 'mt-1 w-full h-[32px] rounded-md border border-slate-50 bg-white px-2 py-1 text-[12px] font-semibold outline-none focus:ring-2 focus:ring-slate-400 print:border-0 print:bg-transparent print:outline-0 print:shadow-none print:appearance-none',
		} = options;

		const select = document.createElement('select');
		select.id = id;
		select.name = name;
		select.title = title;
		select.className = className;

		if (includeEmpty) {
			const optionEmpty = document.createElement('option');
			optionEmpty.value = '';
			optionEmpty.textContent = placeholder;
			select.appendChild(optionEmpty);
		}

		ADM_ROUTES.forEach((route) => {
			const option = document.createElement('option');
			option.value = route.value;
			option.textContent = route.label;
			if (route.value === selectedValue) option.selected = true;
			select.appendChild(option);
		});

		return select;
	}

	function renderSelect(container, options = {}) {
		const element = typeof container === 'string' ? document.getElementById(container) : container;
		if (!element) {
			console.error('Container não encontrado:', container);
			return null;
		}
		const select = createSelect(options);
		element.innerHTML = '';
		element.appendChild(select);
		return select;
	}

	function renderLabelSelect(container, options = {}) {
		const { labelText = '', labelClass = 'bg-transparent flex items-center gap-2', labelTextClass = 'text-[11px] font-bold tracking-wide whitespace-nowrap', ...selectOptions } = options;

		const element = typeof container === 'string' ? document.getElementById(container) : container;
		if (!element) {
			console.error('Container não encontrado:', container);
			return null;
		}

		const label = document.createElement('label');
		label.className = labelClass;

		const labelDiv = document.createElement('div');
		labelDiv.className = labelTextClass;
		labelDiv.textContent = labelText;

		const select = createSelect(selectOptions);
		label.appendChild(labelDiv);
		label.appendChild(select);

		element.innerHTML = '';
		element.appendChild(label);

		return select;
	}

	function generateHTMLSelect(options = {}) {
		const {
			id = 'adm_farmaco',
			name = 'adm_farmaco',
			title = 'select_poso',
			placeholder = 'SELECIONE A VIA',
			selectedValue = '',
			includeEmpty = false,
			className = 'mt-1 w-full h-[32px] rounded-md border border-slate-50 bg-transparent px-2 py-1 text-[12px] text-center font-semibold outline-none focus:ring-2 focus:ring-slate-400 print:border-0 print:bg-transparent print:outline-0 print:shadow-none print:appearance-none',
		} = options;

		let html = `<select id="${id}" name="${name}" title="${title}" class="${className}">`;
		if (includeEmpty) {
			html += `<option value="">${placeholder}</option>`;
		}
		ADM_ROUTES.forEach((route) => {
			const selected = route.value === selectedValue ? ' selected' : '';
			html += `<option value="${route.value}"${selected}>${route.label}</option>`;
		});
		html += '</select>';
		return html;
	}

	function generateHTMLLabelSelect(options = {}) {
		const { labelText = '', labelClass = 'rounded-md bg-slate-50 px-2 py-1 flex items-center gap-2', labelTextClass = 'text-[11px] font-bold tracking-wide whitespace-nowrap', ...selectOptions } = options;

		return `
      <label class="${labelClass}">
        <div class="${labelTextClass}">${labelText}</div>
        ${generateHTMLSelect(selectOptions)}
      </label>
    `;
	}

	window.AdmDrugsModule = {
		data: ADM_ROUTES,
		getRoute: getRoute,
		getAll: getAll,
		getValues: getValues,
		isValid: isValid,
		createSelect: createSelect,
		renderSelect: renderSelect,
		renderLabelSelect: renderLabelSelect,
		generateHTMLSelect: generateHTMLSelect,
		generateHTMLLabelSelect: generateHTMLLabelSelect,
		ADM_ROUTES: ADM_ROUTES,
	};

	console.log('✅ Adm Drugs Module carregado:', ADM_ROUTES.length, 'vias');
})();
