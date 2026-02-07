(() => {
	'use strict';

	// ===============================
	// 1) Dados (EXATAMENTE como voc\u00EA definiu)
	// ===============================
	const examesPorCategoria = {
		// --- LABORAT\u00D3RIO ---
		anemia: ['HEMOGRAMA', 'FERRO S\u00C9RICO', 'FERRITINA', 'TRANSFERRINA', 'ERITR\u00D3CITOS'],

		risco_cardiovascular: ['HEMOGRAMA', 'LIPIDOGRAMA', 'GLICEMIA JEJUM', '\u00C1CIDO \u00DARICO', 'TFG', 'EAS'],

		controle_dm_tipo2: ['HEMOGRAMA', 'GLICEMIA JEJUM', 'HB GLICADA', 'LIPIDOGRAMA', 'TFG', 'EAS', 'RAC', '\u00C1CIDO \u00DARICO'],

		controle_has: ['HEMOGRAMA', 'GLICEMIA JEJUM', '\u00C1CIDO \u00DARICO', 'LIPIDOGRAMA', 'TFG', 'K+', 'EAS'],

		controle_has_dm_tipo2: ['HEMOGRAMA', 'GLICEMIA JEJUM', 'HB GLICADA', 'LIPIDOGRAMA', 'RFG', 'EAS', 'RAC', '\u00C1CIDO \u00DARICO', 'K+'],

		hematuria_microscopica: ['EAS', 'DISMORFISMO ERITROCIT\u00C1RIO', 'UROCULTURA'],

		hipotireoidismo: ['TSH', 'T4 LIVRE'],

		investigacao_artrite_lupus: ['HEMOGRAMA', 'FAN, PCR, VHS', 'FATOR REUMETOIDE, ANTI CCP', 'ANTI SM, ANTI DNA', 'ANTI RO, ANTI LA', 'C3, C4', 'EAS'],

		risco_cirurgico: ['HEMOGRAMA', 'GLICEMIA DE JEJUM', 'HB GLICADA', 'UR\u00C9IA, CREATININA', 'COAGULOGRAMA', 'EAS'],

		seguimento_lupus: ['HEMOGRAMA', 'FAN', 'PCR, VHS', 'C3, C4', 'EAS'],

		seguimento_dm_pos_medicacao: ['GLICEMIA JEJUM', 'HB GLICADA'],

		verminoses: ['PSOF POSITIVO EM EXAME ANTERIOR', 'EPF', 'PSOF 3 AMOSTRAS'],

		intolerancia_gluten_lactose: ['ANTI-TRANSGLUTAMINASE IGA, IGG', 'ANTI-ENDOM\u00C1SIO', 'ANTI-GLIADINA', 'TESTE DE TOLER\u00C2NCIA ORAL A LACTOSE 50G'],

		arboviroses_covid: ['RT-PCR PARA ARBOVIROSES', 'RT-PCR COVID-19'],

		// --- IMAGEM ---
		dor_abdominal: ['ULTRASONOGRAFIA ABDOMEM TOTAL'],

		retencao_urinaria: ['ULTRASONOGRAFIA DE PR\u00D3STATA'],

		hernia_parede: ['ULTRASONOGRAFIA DE PAREDE'],

		aterosclerose_carotidas: ['ECODOPPLER DE CAR\u00D3TIDAS'],

		dor_claudicacao_varicoses: ['DUPLEX SCAN VENOSO DE MMII BILATERAL', 'DUPLEX SCAN VENOSO DE MMII E', 'DUPLEX SCAN VENOSO DE MMII D'],

		dor_ombro: ['ULTRASONOGRAFIA DE OMBRO D', 'ULTRASONOGRAFIA DE OMBRO E'],

		dor_joelho: ['ULTRASONOGRAFIA DE JOELHO D', 'ULTRASONOGRAFIA DE JOELHO E'],

		hematuria_nefrolitiase: ['ULTRASONOGRAFIA DE RINS E VIAS URIN\u00C1RIAS'],

		nodulo_tireoide: ['ULTRASONOGRAFIA COM DOPPLER DE TIRE\u00D3IDE'],

		dor_torax_tosse: ['RX DE T\u00D3RAX PA E PERFIL'],

		dor_testicular: ['ULTRASONOGRAFIA BOLSA TESTICULAR COM DOPPLER'],

		// --- SA\u00DADE DA MULHER ---
		gestacao_1trimestre: ['HEMOGRAMA', 'GS/RH ; COOMBS INDIRETO', 'GLICEMIA JEJUM', 'TOXOPLASMOSE IGG/IGM', 'EAS + UROCULTURA', 'TSH', 'ELETROFORESE DE HEMOGLOBINA'],

		gestacao_2trimestre: ['HEMOGRAMA', '[Se RH -]COOMBS INDIRETO', 'GLICEMIA JEJUM', 'TOXOPLASMOSE IGG/IGM Se Suscept\u00EDvel', 'EAS + UROCULTURA', 'TOTG - 75g - Jejum, 1 e 2 horas'],

		gestacao_3trimestre: ['HEMOGRAMA', '[Se RH -]COOMBS INDIRETO', 'GLICEMIA JEJUM', 'TOXOPLASMOSE IGG/IGM Se Suscept\u00EDvel', 'EAS + UROCULTURA'],

		swab_3trimestre: ['SWAB COM CULTURA PARA STREPTOCOCCUS DO GRUPO B'],

		mamografia: ['MAMOGRAFIA BILATERAL'],

		bi_rads_0: ['ULTRASONOGRAFIA DE MAMA BILATERAL'],

		complemento_usg_mama: ['ULTRASONOGRAFIA DE AXILAS BILATERAL'],

		preventivo: ['EXAME CITOPATOL\u00D3GICO DE COLO DO \u00DATERO'],

		usg_obstetrico_1trimestre: ['ULTRASONOGRAFIA OBST\u00C9TRICA + TRANSLUSC\u00CANCIA NUCAL'],

		usg_obstetrico_2trimestre: ['ULTRASONOGRAFIA OBST\u00C9TRICA - MORFOL\u00D3GICO'],

		usg_obstetrico: ['ULTRASONOGRAFIA OBST\u00C9TRICA'],

		sangramento_uterino: ['ULTRASONOGRAFIA ENDOVAGINAL'],
	};

	// Labels (texto do select) -> key (categoria)
	const opcoesSelect = {
		// LAB
		ANEMIA: 'anemia',
		'AVALIA\u00C7\u00C3O DE RISCO CARDIOVASCULAR': 'risco_cardiovascular',
		'CONTROLE DM TIPO 2': 'controle_dm_tipo2',
		'CONTROLE HAS': 'controle_has',
		'CONTROLE HAS E DM TIPO 2': 'controle_has_dm_tipo2',
		'HEMAT\u00DARIA MICROSC\u00D3PICA EM EXAME ANTERIOR': 'hematuria_microscopica',
		HIPOTIREOIDISMO: 'hipotireoidismo',
		'INVESTIGA\u00C7\u00C3O ARTRITE REUMATOIDE E LUPUS': 'investigacao_artrite_lupus',
		'RISCO CIR\u00DARGICO': 'risco_cirurgico',
		'SEGUIMENTO DE ATIVIDADE DE DOEN\u00C7A DO LUPUS': 'seguimento_lupus',
		'SEGUIMENTO DM TIPO 2 P\u00D3S TROCA DE MEDICA\u00C7\u00C3O': 'seguimento_dm_pos_medicacao',
		'VERMINOSES: PSOF POSITIVO EM EXAME ANTERIOR': 'verminoses',
		'PESQUISA DE INTOLER\u00C2NCIA A GL\u00DATEN E LACTOSE': 'intolerancia_gluten_lactose',
		'ARBOVIROSES E COVID': 'arboviroses_covid',

		// IMAGEM
		'DOR ABDOMINAL DIFUSA COM CERCA DE 6 MESES DE EVOLU\u00C7\u00C3O': 'dor_abdominal',
		'RETEN\u00C7\u00C3O URIN\u00C1RIA / HIST\u00D3RICO DE HPB / AUMENTO DE PSA+GOTEJAMENTO URIN\u00C1RIO': 'retencao_urinaria',
		'H\u00C9RNIA INGUINAL? / H\u00C9RNIA UMBILICAL? / H\u00C9RNIA DE PAREDE': 'hernia_parede',
		'AVALIA\u00C7\u00C3O DE ATEROSCLEROSE DE CAR\u00D3TIDAS': 'aterosclerose_carotidas',
		'DOR EM CLAUDICA\u00C7\u00C3O? VEIAS VARICOSAS? TVP ANTERIOR? QUANDO? CLASSIFICA\u00C7\u00C3O CEAPS': 'dor_claudicacao_varicoses',
		'DOR E LIMITA\u00C7\u00C3O DE MOVIMENTO EM OMBRO COM CERCA DE 6 MESES DE EVOLU\u00C7\u00C3O': 'dor_ombro',
		'DOR E EDEMA EM JOELHO D OU E COM CERCA DE 6 MESES DE EVOLU\u00C7\u00C3O': 'dor_joelho',
		'HEMAT\u00DARIA MICROSC\u00D3PICA MANTIDA AP\u00D3S 2 EXAMES OU CONTROLE DE NEFROLIT\u00C1SE': 'hematuria_nefrolitiase',
		'N\u00D3DULO DE TIRE\u00D3IDE?': 'nodulo_tireoide',
		'DOR TOR\u00C1XICA E TOSSE PRODUTIVA': 'dor_torax_tosse',
		'DOR TESTICULAR - VARICOCELE?': 'dor_testicular',

		// SA\u00DADE DA MULHER
		'GESTA\u00C7\u00C3O 1\u00BA TRIMESTRE': 'gestacao_1trimestre',
		'GESTA\u00C7\u00C3O 2\u00BA TRIMESTRE': 'gestacao_2trimestre',
		'GESTA\u00C7\u00C3O 3\u00BA TRIMESTRE': 'gestacao_3trimestre',
		'SWAB 3\u00BA TRIMESTRE': 'swab_3trimestre',
		MAMOGRAFIA: 'mamografia',
		'BI RADS 0 - ALTERA\u00C7\u00C3O EM MAMA': 'bi_rads_0',
		'COMPLEMENTO DE ULTRASONOGRAFIA DE MAMA': 'complemento_usg_mama',
		PREVENTIVO: 'preventivo',
		'ULTRASONOGRAFIA OBST\u00C9TRICO: 1\u00BA TRIMESTRE ; TRANSLUSC\u00CANCIA NUCAL': 'usg_obstetrico_1trimestre',
		'ULTRASONOGRAFIA OBST\u00C9TRICO: 2\u00BA TRIMESTRE': 'usg_obstetrico_2trimestre',
		'ULTRASONOGRAFIA OBST\u00C9TRICO: ULTRASONOGRAFIA OBST\u00C9TRICA': 'usg_obstetrico',
		'SANGRAMENTO UTERINO ANORMAL, DISPAREUNIA': 'sangramento_uterino',
	};

	// Grupos (para popular os 3 selects)
	const grupoLab = new Set([
		'anemia',
		'risco_cardiovascular',
		'controle_dm_tipo2',
		'controle_has',
		'controle_has_dm_tipo2',
		'hematuria_microscopica',
		'hipotireoidismo',
		'investigacao_artrite_lupus',
		'risco_cirurgico',
		'seguimento_lupus',
		'seguimento_dm_pos_medicacao',
		'verminoses',
		'intolerancia_gluten_lactose',
		'arboviroses_covid',
	]);

	const grupoImg = new Set(['dor_abdominal', 'retencao_urinaria', 'hernia_parede', 'aterosclerose_carotidas', 'dor_claudicacao_varicoses', 'dor_ombro', 'dor_joelho', 'hematuria_nefrolitiase', 'nodulo_tireoide', 'dor_torax_tosse', 'dor_testicular']);

	const grupoMulher = new Set([
		'gestacao_1trimestre',
		'gestacao_2trimestre',
		'gestacao_3trimestre',
		'swab_3trimestre',
		'mamografia',
		'bi_rads_0',
		'complemento_usg_mama',
		'preventivo',
		'usg_obstetrico_1trimestre',
		'usg_obstetrico_2trimestre',
		'usg_obstetrico',
		'sangramento_uterino',
	]);

	// ===============================
	// 2) Utilit\u00E1rios
	// ===============================
	const $ = (id) => document.getElementById(id);

	const on = (el, event, handler, options) => {
		if (!el) return;
		el.addEventListener(event, handler, options);
	};

	const firstById = (...ids) => ids.map($).find(Boolean) || null;

	// ===============================
	// 3) UI: Montagem do Formul\u00E1rio
	// ===============================
	function createFormStructure() {
		const app = $('app');
		if (!app) return;

		app.innerHTML = '';

		const header = document.createElement('div');
		header.className = 'mt-2 grid grid-cols-12 gap-2 mb-0 border border-black border-b-0 pt-5';
		header.innerHTML = `
    <div class="col-span-4 rounded-md bg-slate-50 px-2 py-1 flex items-center gap-2">
      <img id="logoSusExame"
        src="https://static.cdnlogo.com/logos/s/74/sus-brasil.svg"
        alt="Logo SUS"
        class="w-28 h-28 object-contain" />
      <div id="textoViaDigitalExame"
        class="hidden text-center text-[11px] font-bold text-shadow-rs tracking-wide">VIA<br />DIGITAL</div>
    </div>

    <div class="col-span-8 rounded-md bg-slate-50 px-2 py-1 flex flex-col gap-1">
      <input id="local1" name="local1" type="text" placeholder="Estabelecimento"
        class="w-full h-8 rounded-md border border-slate-50 bg-white px-2 text-[12px] font-semibold text-center uppercase outline-none focus:ring-2 focus:ring-slate-400" />
      <input id="local2" name="local2" type="text" placeholder="Estabelecimento"
        class="w-full h-8 rounded-md border border-slate-50 bg-white px-2 text-[12px] font-semibold text-center uppercase outline-none focus:ring-2 focus:ring-slate-400" />
      <input id="local3" name="local3" type="text" placeholder="Estabelecimento"
        class="w-full h-8 rounded-md border border-slate-50 bg-white px-2 text-[12px] font-semibold text-center uppercase outline-none focus:ring-2 focus:ring-slate-400" />
    </div>
  `;
		app.appendChild(header);

		const table = document.createElement('table');
		table.className = 'w-full border-collapse border border-black';
		table.innerHTML = `
    <tr>
      <th colspan="4" class="border border-black p-1 bg-gray-200 text-center font-bold text-[12px]">REQUISI\u00C7\u00C3O DE EXAME</th>
    </tr>

    <tr>
      <td colspan="4" class="border border-black p-1">
        <div class="grid grid-cols-12 gap-2 items-center">
          <label class="col-span-12 sm:col-span-6 flex items-center gap-1">
            <span class="text-[12px] font-semibold whitespace-nowrap">PACIENTE:</span>
            <input id="paciente" name="paciente" type="text" placeholder="Nome completo"
              class="w-full rounded border border-gray-50 bg-white px-2 py-0.5 text-[12px] font-semibold uppercase outline-none focus:ring-1 focus:ring-slate-400" />
          </label>

          <label class="col-span-12 sm:col-span-3 flex items-center gap-1">
            <span class="text-[12px] font-semibold whitespace-nowrap">DT. NASC.:</span>
            <input id="nascimento" name="nascimento" type="date"
              class="w-full rounded border border-gray-50 bg-white px-2 py-0.5 text-[12px] font-semibold outline-none focus:ring-1 focus:ring-slate-400" />
          </label>

          <label class="col-span-12 sm:col-span-3 flex items-center justify-center gap-2">
            <span class="text-[12px] font-semibold">SEXO:</span>
            <label class="flex items-center">
              <input type="radio" name="sexo" value="F" class="accent-sky-600" />
              <span class="text-[12px] ml-1">F</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="sexo" value="M" class="accent-sky-600" />
              <span class="text-[12px] ml-1">M</span>
            </label>
          </label>
        </div>
      </td>
    </tr>

    <tr>
      <td colspan="4" class="border border-black p-1">
        <div class="grid grid-cols-12 gap-2 items-center">
          <label class="col-span-12 sm:col-span-6 flex items-center gap-1">
            <span class="text-[12px] font-semibold whitespace-nowrap">NOME DA M\u00C3E:</span>
            <input id="nomeMae" name="nomeMae" type="text"
              class="w-full rounded border border-gray-50 bg-white px-2 py-0.5 text-[12px] font-semibold uppercase outline-none focus:ring-1 focus:ring-slate-400" />
          </label>

          <label class="col-span-12 sm:col-span-3 flex items-center gap-1">
            <span class="text-[12px] font-semibold whitespace-nowrap">CNS:</span>
            <input id="cartaoSus" name="cartaoSus" type="text"
              class="w-full rounded border border-gray-50 bg-white px-2 py-0.5 text-[12px] font-semibold uppercase outline-none focus:ring-1 focus:ring-slate-400" />
          </label>

          <label class="col-span-12 sm:col-span-3 flex items-center gap-1">
            <span class="text-[12px] font-semibold whitespace-nowrap">CPF:</span>
            <input id="cpf" name="cpf" type="text"
              class="w-full rounded border border-gray-50 bg-white px-2 py-0.5 text-[12px] font-semibold uppercase outline-none focus:ring-1 focus:ring-slate-400" />
          </label>
        </div>
      </td>
    </tr>

    <tr>
      <td colspan="4" class="border border-black p-1">
        <div class="grid grid-cols-12 gap-2 items-center">
          <label class="col-span-12 sm:col-span-9 flex items-center gap-1">
            <span class="text-[12px] font-semibold whitespace-nowrap">ENDERE\u00C7O:</span>
            <input id="endereco" name="endereco" type="text"
              class="w-full rounded border border-gray-50 bg-white px-2 py-0.5 text-[12px] uppercase outline-none focus:ring-1 focus:ring-slate-400" />
          </label>

          <label class="col-span-12 sm:col-span-3 flex items-center gap-1">
            <span class="text-[12px] font-semibold whitespace-nowrap">TELEFONE:</span>
            <input id="telefone" name="telefone" type="text" placeholder="(00) 00000-0000"
              class="w-full rounded border border-gray-50 bg-white px-2 py-0.5 text-[12px] uppercase outline-none focus:ring-1 focus:ring-slate-400" />
          </label>
        </div>
      </td>
    </tr>

    <tr>
      <td colspan="4" class="border border-black p-1 bg-gray-100 text-left font-bold text-[12px]">1 - DADOS CL\u00CDNICOS</td>
    </tr>
    <tr>
      <td colspan="4" class="border border-black p-1">
        <input type="text" class="w-full bg-white px-2 py-0.5 text-[12px] uppercase" />
      </td>
    </tr>

    <tr>
      <td colspan="4" class="border border-black p-1 bg-gray-100 text-left font-bold text-[12px]">02 - TIPO DE EXAME</td>
    </tr>
    <tr>
      <td colspan="4" class="border border-black p-1 text-[12px]">
        <input type="checkbox" id="clinicalAnalysisCheckbox" class="accent-sky-600" />
        <span>ANÁLISES CLÍNICAS</span>

        <input type="checkbox" id="imageCheckbox" class="accent-sky-600 ml-4" />
        <span>IMAGEM</span>
      </td>
    </tr>

    <tr>
      <td colspan="4" class="border border-black p-1 bg-gray-100 text-left font-bold text-[12px]">3 - EXAMES SOLICITADOS</td>
    </tr>
    <tr>
      <td colspan="4" class="border border-black p-2">
        <textarea 
          id="examText" 
          rows="12" 
          spellcheck="false"
          class="w-full resize-y rounded border border-slate-300 bg-white p-2 font-mono text-[12px] leading-relaxed uppercase outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Digite solicita\u00E7\u00E3o de exames...&#10;(c\u00F3digos + espa\u00E7o) ou use os menus ao lado."></textarea>
      </td>
    </tr>

    <tr>
      <td colspan="2" class="border border-black p-1 text-[12px]">
        <span class="font-semibold">DATA:</span>
        <input type="date" class="w-full rounded border border-gray-50 px-1 text-[12px]" />
      </td>
      <td colspan="2" class="border border-black p-1 text-[12px]">
        <span class="font-semibold">CARIMBO/ASSINATURA:</span>
        <input type="text" class="w-full text-[12px] font-semibold uppercase" />
      </td>
    </tr>
  `;
		app.appendChild(table);
	}

	// ===============================
	// 4) Toggle Logo SUS / VIA DIGITAL (SEM DUPLICATA)
	// ===============================
	function syncSusLogoExame() {
		const checkbox = $('toggleSusLogo'); // can\u00F4nico desta aba
		const logo = $('logoSusExame');
		const via = $('textoViaDigitalExame');
		if (!checkbox || !logo || !via) return;

		const ocultarLogo = checkbox.checked;
		logo.classList.toggle('hidden', !ocultarLogo);
		via.classList.toggle('hidden', ocultarLogo);
	}

	function bindSusLogoExame() {
		const checkbox = $('toggleSusLogo');
		if (!checkbox) return;

		if (checkbox.dataset.bound === '1') return;
		checkbox.dataset.bound = '1';

		checkbox.addEventListener('change', syncSusLogoExame);
	}

	// ===============================
	// 5) M\u00E1scaras
	// ===============================
	function maskCPF(value) {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
			.slice(0, 14);
	}

	function maskPhone(value) {
		value = value.replace(/\D/g, '');

		if (value.length <= 10) {
			return value
				.replace(/(\d{2})(\d)/, '($1) $2')
				.replace(/(\d{4})(\d)/, '$1-$2')
				.slice(0, 14);
		}

		return value
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{5})(\d)/, '$1-$2')
			.slice(0, 15);
	}

	// ===============================
	// 6) Exames: textarea
	// ===============================
	function formatExamsInColumns() {
		const textarea = $('examText');
		if (!textarea) return;

		const exams = textarea.value.split('\n').filter((x) => x.trim() !== '');
		if (exams.length <= 8) {
			textarea.value = exams.join('\n');
			return;
		}

		const midpoint = Math.ceil(exams.length / 2);
		const col1 = exams.slice(0, midpoint);
		const col2 = exams.slice(midpoint);

		const maxLength = Math.max(...col1.map((x) => x.length));
		const padding = 4;

		const lines = [];
		for (let i = 0; i < midpoint; i++) {
			let line = col1[i] || '';
			if (col2[i]) {
				const spaces = Math.max(1, maxLength - line.length + padding);
				line += ' '.repeat(spaces) + col2[i];
			}
			lines.push(line);
		}

		textarea.value = lines.join('\n');
	}

	function addExamsToTextarea(examsList) {
		const textarea = $('examText');
		if (!textarea || !Array.isArray(examsList)) return;

		const currentText = textarea.value.trim();
		const next = currentText ? `${currentText}\n${examsList.join('\n')}` : examsList.join('\n');
		textarea.value = next;
		formatExamsInColumns();
	}

	// ===============================
	// 7) Selects
	// ===============================
	function populateSelects() {
		const lab = $('laboratorySelect');
		const img = $('imageSelect');
		const mulher = $('womanSelect');

		// limpa mantendo placeholder
		if (lab) lab.length = 1;
		if (img) img.length = 1;
		if (mulher) mulher.length = 1;

		for (const [label, key] of Object.entries(opcoesSelect)) {
			if (!examesPorCategoria[key]) continue;

			if (lab && grupoLab.has(key)) lab.add(new Option(label, key));
			if (img && grupoImg.has(key)) img.add(new Option(label, key));
			if (mulher && grupoMulher.has(key)) mulher.add(new Option(label, key));
		}
	}

	function bindSelects() {
		const lab = $('laboratorySelect');
		const img = $('imageSelect');
		const mulher = $('womanSelect');

		const clinical = $('clinicalAnalysisCheckbox');
		const image = $('imageCheckbox');

		const binds = [lab, img, mulher].filter(Boolean);

		binds.forEach((select) => {
			if (select.dataset.bound === '1') return;
			select.dataset.bound = '1';

			on(select, 'change', function () {
				const key = this.value;
				if (key && examesPorCategoria[key]) {
					addExamsToTextarea(examesPorCategoria[key]);

					// auto-marca tipo (sem atrapalhar: s\u00F3 ajuda)
					if (this.id === 'imageSelect') {
						if (image) image.checked = true;
						if (clinical) clinical.checked = false;
					} else {
						if (clinical) clinical.checked = true;
						if (image) image.checked = false;
					}
				}
				this.value = '';
			});
		});
	}

	// ===============================
	// 8) Eventos Gerais
	// ===============================
	function bindFormEvents() {
		// m\u00E1scaras
		on($('cpf'), 'input', (e) => (e.target.value = maskCPF(e.target.value)));
		on($('telefone'), 'input', (e) => (e.target.value = maskPhone(e.target.value)));

		// exclusividade do tipo de exame
		const clinical = $('clinicalAnalysisCheckbox');
		const image = $('imageCheckbox');

		on(clinical, 'change', () => {
			if (clinical && clinical.checked && image) image.checked = false;
		});

		on(image, 'change', () => {
			if (image && image.checked && clinical) clinical.checked = false;
		});

		// bot\u00F5es
		on($('printBtnExam'), 'click', () => window.print());

		on($('clearExamBtn'), 'click', () => {
			const t = $('examText');
			if (t) t.value = '';
		});

		on($('clearAllBtn'), 'click', () => {
			if (!confirm('Tem certeza que deseja limpar todos os campos?')) return;

			// limpa apenas dentro do app (n\u00E3o bagun\u00E7a a sidebar)
			const app = $('app');
			if (app) {
				app.querySelectorAll('input[type="text"], input[type="date"], textarea').forEach((el) => (el.value = ''));
				app.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((el) => (el.checked = false));
			}

			// limpa controles relevantes da sidebar
			const toggle = $('toggleSusLogo');
			if (toggle) toggle.checked = false;

			// aplica estado do logo
			syncSusLogoExame();
		});
	}

	// ===============================
	// 9) Boot e Exposi\u00E7\u00E3o Global
	// ===============================
	function init() {
		// Evita re-inicializa\u00E7\u00E3o desnecess\u00E1ria
		if (window.ExamesModule && window.ExamesModule._initialized) return;

		// Verifica se elementos cr\u00EDticos existem antes de tentar bindar
		if (!$('app') && !$('examText')) return;

		createFormStructure();
		bindSusLogoExame();
		syncSusLogoExame();
		populateSelects();
		bindSelects();
		bindFormEvents();

		if (window.ExamesModule) window.ExamesModule._initialized = true;
	}

	// Exp\u00F5e API para ser chamada pelo app-main
	window.ExamesModule = {
		init: init,
		_initialized: false,
	};

	// Tenta auto-iniciar se DOM j\u00E1 estiver pronto (retrocompatibilidade)
	document.addEventListener('DOMContentLoaded', init);
})();
