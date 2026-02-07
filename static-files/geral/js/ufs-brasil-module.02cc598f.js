(() => {
  'use strict';

  const UFS_BRASIL = [
    { sigla: 'AC', nome: 'Acre', regiao: 'Norte' },
    { sigla: 'AL', nome: 'Alagoas', regiao: 'Nordeste' },
    { sigla: 'AP', nome: 'Amapá', regiao: 'Norte' },
    { sigla: 'AM', nome: 'Amazonas', regiao: 'Norte' },
    { sigla: 'BA', nome: 'Bahia', regiao: 'Nordeste' },
    { sigla: 'CE', nome: 'Ceará', regiao: 'Nordeste' },
    { sigla: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste' },
    { sigla: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste' },
    { sigla: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste' },
    { sigla: 'MA', nome: 'Maranhão', regiao: 'Nordeste' },
    { sigla: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste' },
    { sigla: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste' },
    { sigla: 'PA', nome: 'Pará', regiao: 'Norte' },
    { sigla: 'PB', nome: 'Paraíba', regiao: 'Nordeste' },
    { sigla: 'PR', nome: 'Paraná', regiao: 'Sul' },
    { sigla: 'PE', nome: 'Pernambuco', regiao: 'Nordeste' },
    { sigla: 'PI', nome: 'Piauí', regiao: 'Nordeste' },
    { sigla: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste' },
    { sigla: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste' },
    { sigla: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul' },
    { sigla: 'RO', nome: 'Rondônia', regiao: 'Norte' },
    { sigla: 'RR', nome: 'Roraima', regiao: 'Norte' },
    { sigla: 'SC', nome: 'Santa Catarina', regiao: 'Sul' },
    { sigla: 'SP', nome: 'São Paulo', regiao: 'Sudeste' },
    { sigla: 'SE', nome: 'Sergipe', regiao: 'Nordeste' },
    { sigla: 'TO', nome: 'Tocantins', regiao: 'Norte' },
  ];

  const getUF = (sigla) => UFS_BRASIL.find((uf) => uf.sigla === sigla.toUpperCase()) || null;
  const getTodas = () => UFS_BRASIL;
  const porRegiao = (regiao) => UFS_BRASIL.filter((uf) => uf.regiao === regiao);
  const getSiglas = () => UFS_BRASIL.map((uf) => uf.sigla);
  const isValidaUF = (sigla) => UFS_BRASIL.some((uf) => uf.sigla === sigla.toUpperCase());

  function criarSelect(options = {}) {
    const {
      id = 'crmUf',
      name = 'crmUf',
      placeholder = 'UF',
      selectedValue = '',
      incluirVazio = true,
      className = 'w-full rounded-md border border-slate-100 bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400',
      showNomeCompleto = false,
    } = options;

    const select = document.createElement('select');
    select.id = id;
    select.name = name;
    select.className = className;

    if (incluirVazio) {
      const optionVazia = document.createElement('option');
      optionVazia.value = '';
      optionVazia.textContent = placeholder;
      select.appendChild(optionVazia);
    }

    UFS_BRASIL.forEach((uf) => {
      const option = document.createElement('option');
      option.value = uf.sigla;
      option.textContent = showNomeCompleto ? `${uf.sigla} - ${uf.nome}` : uf.sigla;
      if (uf.sigla === selectedValue) option.selected = true;
      select.appendChild(option);
    });

    return select;
  }

  function renderizarSelect(container, options = {}) {
    const element = typeof container === 'string' ? document.getElementById(container) : container;
    if (!element) {
      console.error('Container não encontrado:', container);
      return null;
    }
    const select = criarSelect(options);
    element.innerHTML = '';
    element.appendChild(select);
    return select;
  }

  function renderizarLabelSelect(container, options = {}) {
    const { 
      labelText = 'UF:', 
      labelClass = 'sm:col-span-2 print:col-span-2 rounded-md bg-slate-50 px-1 py-1 flex items-center gap-2', 
      labelTextClass = 'text-[10px] font-bold tracking-wide whitespace-nowrap', 
      ...selectOptions 
    } = options;

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

    const select = criarSelect(selectOptions);
    label.appendChild(labelDiv);
    label.appendChild(select);

    element.innerHTML = '';
    element.appendChild(label);

    return select;
  }

  function gerarHTMLSelect(options = {}) {
    const {
      id = 'crmUf',
      name = 'crmUf',
      placeholder = 'UF',
      selectedValue = '',
      incluirVazio = true,
      className = 'w-full rounded-md border border-slate-100 bg-white px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-slate-400',
      showNomeCompleto = false,
    } = options;

    let html = `<select id="${id}" name="${name}" class="${className}">`;
    if (incluirVazio) {
      html += `<option value="">${placeholder}</option>`;
    }
    UFS_BRASIL.forEach((uf) => {
      const text = showNomeCompleto ? `${uf.sigla} - ${uf.nome}` : uf.sigla;
      const selected = uf.sigla === selectedValue ? ' selected' : '';
      html += `<option value="${uf.sigla}"${selected}>${text}</option>`;
    });
    html += '</select>';
    return html;
  }

  function gerarHTMLLabelSelect(options = {}) {
    const { 
      labelText = 'UF:', 
      labelClass = 'sm:col-span-2 print:col-span-2 rounded-md bg-slate-50 px-1 py-1 flex items-center gap-2', 
      labelTextClass = 'text-[10px] font-bold tracking-wide whitespace-nowrap', 
      ...selectOptions 
    } = options;

    return `
      <label class="${labelClass}">
        <div class="${labelTextClass}">${labelText}</div>
        ${gerarHTMLSelect(selectOptions)}
      </label>
    `;
  }

  window.UFsBrasilModule = {
    data: UFS_BRASIL,
    getUF: getUF,
    getTodas: getTodas,
    porRegiao: porRegiao,
    getSiglas: getSiglas,
    isValida: isValidaUF,
    criarSelect: criarSelect,
    renderizarSelect: renderizarSelect,
    renderizarLabelSelect: renderizarLabelSelect,
    gerarHTMLSelect: gerarHTMLSelect,
    gerarHTMLLabelSelect: gerarHTMLLabelSelect,
  };

  console.log('✅ UFs Brasil Module carregado:', UFS_BRASIL.length, 'estados');
})();
