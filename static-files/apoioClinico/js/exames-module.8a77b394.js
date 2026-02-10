(() => {
	'use strict';

	// ===============================
	// 1) Dados (mantidos; com 1 correção: RFG -> TFG)
	// ===============================
	const examesPorCategoria = {
		// --- LABORATÓRIO ---
		anemia: ['HEMOGRAMA', 'FERRO SÉRICO', 'FERRITINA', 'TRANSFERRINA', 'ERITRÓCITOS'],

		risco_cardiovascular: ['HEMOGRAMA', 'LIPIDOGRAMA', 'GLICEMIA JEJUM', 'ÁCIDO ÚRICO', 'TFG', 'EAS'],

		controle_dm_tipo2: ['HEMOGRAMA', 'GLICEMIA JEJUM', 'HB GLICADA', 'LIPIDOGRAMA', 'TFG', 'EAS', 'RAC', 'ÁCIDO ÚRICO'],

		controle_has: ['HEMOGRAMA', 'GLICEMIA JEJUM', 'ÁCIDO ÚRICO', 'LIPIDOGRAMA', 'TFG', 'K+', 'EAS'],

		// Correção: 'RFG' -> 'TFG'
		controle_has_dm_tipo2: ['HEMOGRAMA', 'GLICEMIA JEJUM', 'HB GLICADA', 'LIPIDOGRAMA', 'TFG', 'EAS', 'RAC', 'ÁCIDO ÚRICO', 'K+'],

		hematuria_microscopica: ['EAS', 'DISMORFISMO ERITROCITÁRIO', 'UROCULTURA'],

		hipotireoidismo: ['TSH', 'T4 LIVRE'],

		investigacao_artrite_lupus: ['HEMOGRAMA', 'FAN, PCR, VHS', 'FATOR REUMETOIDE, ANTI CCP', 'ANTI SM, ANTI DNA', 'ANTI RO, ANTI LA', 'C3, C4', 'EAS'],

		risco_cirurgico: ['HEMOGRAMA', 'GLICEMIA DE JEJUM', 'HB GLICADA', 'URÉIA, CREATININA', 'COAGULOGRAMA', 'EAS'],

		seguimento_lupus: ['HEMOGRAMA', 'FAN', 'PCR, VHS', 'C3, C4', 'EAS'],

		seguimento_dm_pos_medicacao: ['GLICEMIA JEJUM', 'HB GLICADA'],

		verminoses: ['PSOF POSITIVO EM EXAME ANTERIOR', 'EPF', 'PSOF 3 AMOSTRAS'],

		intolerancia_gluten_lactose: ['ANTI-TRANSGLUTAMINASE IGA, IGG', 'ANTI-ENDOMÁSIO', 'ANTI-GLIADINA', 'TESTE DE TOLERÂNCIA ORAL A LACTOSE 50G'],

		arboviroses_covid: ['RT-PCR PARA ARBOVIROSES', 'RT-PCR COVID-19'],

		// --- IMAGEM ---
		dor_abdominal: ['ULTRASONOGRAFIA ABDOMEM TOTAL'],

		retencao_urinaria: ['ULTRASONOGRAFIA DE PRÓSTATA'],

		hernia_parede: ['ULTRASONOGRAFIA DE PAREDE'],

		aterosclerose_carotidas: ['ECODOPPLER DE CARÓTIDAS'],

		dor_claudicacao_varicoses: ['DUPLEX SCAN VENOSO DE MMII BILATERAL', 'DUPLEX SCAN VENOSO DE MMII E', 'DUPLEX SCAN VENOSO DE MMII D'],

		dor_ombro: ['ULTRASONOGRAFIA DE OMBRO D', 'ULTRASONOGRAFIA DE OMBRO E'],

		dor_joelho: ['ULTRASONOGRAFIA DE JOELHO D', 'ULTRASONOGRAFIA DE JOELHO E'],

		hematuria_nefrolitiase: ['ULTRASONOGRAFIA DE RINS E VIAS URINÁRIAS'],

		nodulo_tireoide: ['ULTRASONOGRAFIA COM DOPPLER DE TIREÓIDE'],

		dor_torax_tosse: ['RX DE TÓRAX PA E PERFIL'],

		dor_testicular: ['ULTRASONOGRAFIA BOLSA TESTICULAR COM DOPPLER'],

		// --- SAÚDE DA MULHER ---
		gestacao_1trimestre: ['HEMOGRAMA', 'GS/RH ; COOMBS INDIRETO', 'GLICEMIA JEJUM', 'TOXOPLASMOSE IGG/IGM', 'EAS + UROCULTURA', 'TSH', 'ELETROFORESE DE HEMOGLOBINA'],

		gestacao_2trimestre: ['HEMOGRAMA', '[Se RH -]COOMBS INDIRETO', 'GLICEMIA JEJUM', 'TOXOPLASMOSE IGG/IGM Se Susceptível', 'EAS + UROCULTURA', 'TOTG - 75g - Jejum, 1 e 2 horas'],

		gestacao_3trimestre: ['HEMOGRAMA', '[Se RH -]COOMBS INDIRETO', 'GLICEMIA JEJUM', 'TOXOPLASMOSE IGG/IGM Se Susceptível', 'EAS + UROCULTURA'],

		swab_3trimestre: ['SWAB COM CULTURA PARA STREPTOCOCCUS DO GRUPO B'],

		mamografia: ['MAMOGRAFIA BILATERAL'],

		bi_rads_0: ['ULTRASONOGRAFIA DE MAMA BILATERAL'],

		complemento_usg_mama: ['ULTRASONOGRAFIA DE AXILAS BILATERAL'],

		preventivo: ['EXAME CITOPATOLÓGICO DE COLO DO ÚTERO'],

		usg_obstetrico_1trimestre: ['ULTRASONOGRAFIA OBSTÉTRICA + TRANSLUSCÂNCIA NUCAL'],

		usg_obstetrico_2trimestre: ['ULTRASONOGRAFIA OBSTÉTRICA - MORFOLÓGICO'],

		usg_obstetrico: ['ULTRASONOGRAFIA OBSTÉTRICA'],

		sangramento_uterino: ['ULTRASONOGRAFIA ENDOVAGINAL'],
	};

	// Labels (texto do select) -> key (categoria)
	const opcoesSelect = {
		// LAB
		ANEMIA: 'anemia',
		'AVALIAÇÃO DE RISCO CARDIOVASCULAR': 'risco_cardiovascular',
		'CONTROLE DM TIPO 2': 'controle_dm_tipo2',
		'CONTROLE HAS': 'controle_has',
		'CONTROLE HAS E DM TIPO 2': 'controle_has_dm_tipo2',
		'HEMATÚRIA MICROSCÓPICA EM EXAME ANTERIOR': 'hematuria_microscopica',
		HIPOTIREOIDISMO: 'hipotireoidismo',
		'INVESTIGAÇÃO ARTRITE REUMATOIDE E LUPUS': 'investigacao_artrite_lupus',
		'RISCO CIRÚRGICO': 'risco_cirurgico',
		'SEGUIMENTO DE ATIVIDADE DE DOENÇA DO LUPUS': 'seguimento_lupus',
		'SEGUIMENTO DM TIPO 2 PÓS TROCA DE MEDICAÇÃO': 'seguimento_dm_pos_medicacao',
		'VERMINOSES: PSOF POSITIVO EM EXAME ANTERIOR': 'verminoses',
		'PESQUISA DE INTOLERÂNCIA A GLÚTEN E LACTOSE': 'intolerancia_gluten_lactose',
		'ARBOVIROSES E COVID': 'arboviroses_covid',

		// IMAGEM
		'DOR ABDOMINAL DIFUSA COM CERCA DE 6 MESES DE EVOLUÇÃO': 'dor_abdominal',
		'RETENÇÃO URINÁRIA / HISTÓRICO DE HPB / AUMENTO DE PSA+GOTEJAMENTO URINÁRIO': 'retencao_urinaria',
		'HÉRNIA INGUINAL? / HÉRNIA UMBILICAL? / HÉRNIA DE PAREDE': 'hernia_parede',
		'AVALIAÇÃO DE ATEROSCLEROSE DE CARÓTIDAS': 'aterosclerose_carotidas',
		'DOR EM CLAUDICAÇÃO? VEIAS VARICOSAS? TVP ANTERIOR? QUANDO? CLASSIFICAÇÃO CEAPS': 'dor_claudicacao_varicoses',
		'DOR E LIMITAÇÃO DE MOVIMENTO EM OMBRO COM CERCA DE 6 MESES DE EVOLUÇÃO': 'dor_ombro',
		'DOR E EDEMA EM JOELHO D OU E COM CERCA DE 6 MESES DE EVOLUÇÃO': 'dor_joelho',
		'HEMATÚRIA MICROSCÓPICA MANTIDA APÓS 2 EXAMES OU CONTROLE DE NEFROLITÍASE': 'hematuria_nefrolitiase',
		'NÓDULO DE TIREÓIDE?': 'nodulo_tireoide',
		'DOR TORÁXICA E TOSSE PRODUTIVA': 'dor_torax_tosse',
		'DOR TESTICULAR - VARICOCELE?': 'dor_testicular',

		// SAÚDE DA MULHER
		'GESTAÇÃO 1º TRIMESTRE': 'gestacao_1trimestre',
		'GESTAÇÃO 2º TRIMESTRE': 'gestacao_2trimestre',
		'GESTAÇÃO 3º TRIMESTRE': 'gestacao_3trimestre',
		'SWAB 3º TRIMESTRE': 'swab_3trimestre',
		MAMOGRAFIA: 'mamografia',
		'BI RADS 0 - ALTERAÇÃO EM MAMA': 'bi_rads_0',
		'COMPLEMENTO DE ULTRASONOGRAFIA DE MAMA': 'complemento_usg_mama',
		PREVENTIVO: 'preventivo',
		'ULTRASONOGRAFIA OBSTÉTRICO: 1º TRIMESTRE ; TRANSLUSCÂNCIA NUCAL': 'usg_obstetrico_1trimestre',
		'ULTRASONOGRAFIA OBSTÉTRICO: 2º TRIMESTRE': 'usg_obstetrico_2trimestre',
		'ULTRASONOGRAFIA OBSTÉTRICO: ULTRASONOGRAFIA OBSTÉTRICA': 'usg_obstetrico',
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
	// 2) Utilitários (sem unidecode)
	// ===============================
	const $ = (id) => document.getElementById(id);

	const on = (el, event, handler, options) => {
		if (!el) return;
		el.addEventListener(event, handler, options);
	};

	// remove acentos/diacríticos sem libs externas (equivalente básico ao "unidecode")
	function stripDiacritics(input) {
		if (input == null) return '';
		const s = String(input);

		// NFD separa acentos como marks combinantes
		// removemos o range principal U+0300..U+036F
		return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

	// normalização "canônica" para dedupe/comparação
	function normKey(input) {
		return stripDiacritics(String(input || ''))
			.trim()
			.replace(/\s+/g, ' ')
			.toUpperCase();
	}

	function uniqKeepOrder(list) {
		const seen = new Set();
		const out = [];
		for (const item of list) {
			const k = normKey(item);
			if (!k) continue;
			if (seen.has(k)) continue;
			seen.add(k);
			out.push(item);
		}
		return out;
	}

	// cria elemento se não existir
	function ensureEl(id, factory) {
		let el = $(id);
		if (el) return el;
		el = factory();
		el.id = id;
		return el;
	}

	// ===============================
	// 3) UI: Montagem do Formulário
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
      <tbody>
        <tr>
          <th colspan="4" class="border border-black p-1 bg-gray-200 text-center font-bold text-[12px]">REQUISIÇÃO DE EXAME</th>
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
                <span class="text-[12px] font-semibold whitespace-nowrap">NOME DA MÃE:</span>
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
                <span class="text-[12px] font-semibold whitespace-nowrap">ENDEREÇO:</span>
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
          <td colspan="4" class="border border-black p-1 bg-gray-100 text-left font-bold text-[12px]">1 - DADOS CLÍNICOS</td>
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
              placeholder="Digite solicitação de exames...&#10;(códigos + espaço) ou use os menus ao lado."></textarea>
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
      </tbody>
    `;
		app.appendChild(table);
	}

	// ===============================
	// 3.1) Controles (cria se não existirem)
	// ===============================
	function ensureControls() {
		const app = $('app');
		if (!app) return;

		// container de controles (só cria se não existir)
		// let controls = $('examControls');
		// if (!controls) {
		// 	controls = document.createElement('div');
		// 	controls.id = 'examControls';
		// 	controls.className = 'mt-2 p-2 border border-black rounded-md bg-slate-50 flex flex-wrap gap-2 items-center';
		// 	app.parentNode?.insertBefore(controls, app); 
		// }

		// toggle logo
		ensureEl('toggleSusLogo', () => {
			const wrap = document.createElement('label');
			wrap.className = 'flex items-center gap-2 text-[12px] font-semibold';
			const cb = document.createElement('input');
			cb.type = 'checkbox';
			cb.className = 'accent-sky-600';
			const span = document.createElement('span');
			span.textContent = 'Ocultar logo SUS (mostrar VIA DIGITAL)';
			wrap.appendChild(cb);
			wrap.appendChild(span);
			controls.appendChild(wrap);
			return cb;
		});

		// selects
		ensureEl('laboratorySelect', () => {
			const sel = document.createElement('select');
			sel.className = 'border border-slate-300 rounded px-2 py-1 text-[12px] bg-white';
			sel.appendChild(new Option('LAB: selecione…', ''));
			controls.appendChild(sel);
			return sel;
		});

		ensureEl('imageSelect', () => {
			const sel = document.createElement('select');
			sel.className = 'border border-slate-300 rounded px-2 py-1 text-[12px] bg-white';
			sel.appendChild(new Option('IMAGEM: selecione…', ''));
			controls.appendChild(sel);
			return sel;
		});

		ensureEl('womanSelect', () => {
			const sel = document.createElement('select');
			sel.className = 'border border-slate-300 rounded px-2 py-1 text-[12px] bg-white';
			sel.appendChild(new Option('MULHER: selecione…', ''));
			controls.appendChild(sel);
			return sel;
		});

		// botões
		ensureEl('printBtnExam', () => {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.textContent = 'Imprimir';
			btn.className = 'border border-black rounded px-3 py-1 text-[12px] font-semibold bg-white';
			controls.appendChild(btn);
			return btn;
		});

		ensureEl('clearExamBtn', () => {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.textContent = 'Limpar exames';
			btn.className = 'border border-black rounded px-3 py-1 text-[12px] font-semibold bg-white';
			controls.appendChild(btn);
			return btn;
		});

		ensureEl('clearAllBtn', () => {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.textContent = 'Limpar tudo';
			btn.className = 'border border-black rounded px-3 py-1 text-[12px] font-semibold bg-white';
			controls.appendChild(btn);
			return btn;
		});
	}

	// ===============================
	// 4) Toggle Logo SUS / VIA DIGITAL (CORRIGIDO)
	// ===============================
	function syncSusLogoExame() {
		const checkbox = $('toggleSusLogo');
		const logo = $('logoSusExame');
		const via = $('textoViaDigitalExame');
		if (!checkbox || !logo || !via) return;

		const ocultarLogo = !!checkbox.checked;
		// CORRETO: se ocultarLogo = true -> esconde logo, mostra "VIA DIGITAL"
		logo.classList.toggle('hidden', ocultarLogo);
		via.classList.toggle('hidden', !ocultarLogo);
	}

	function bindSusLogoExame() {
		const checkbox = $('toggleSusLogo');
		if (!checkbox) return;

		if (checkbox.dataset.bound === '1') return;
		checkbox.dataset.bound = '1';

		checkbox.addEventListener('change', syncSusLogoExame);
	}

	// ===============================
	// 5) Máscaras
	// ===============================
	function maskCPF(value) {
		return String(value || '')
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
			.slice(0, 14);
	}

	function maskPhone(value) {
		value = String(value || '').replace(/\D/g, '');

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
	// 6) Exames: textarea (com dedupe)
	// ===============================
	function formatExamsInColumns() {
		const textarea = $('examText');
		if (!textarea) return;

		const exams = textarea.value
			.split('\n')
			.map((x) => x.trim())
			.filter((x) => x !== '');

		const uniqueExams = uniqKeepOrder(exams);

		if (uniqueExams.length <= 8) {
			textarea.value = uniqueExams.join('\n');
			return;
		}

		const midpoint = Math.ceil(uniqueExams.length / 2);
		const col1 = uniqueExams.slice(0, midpoint);
		const col2 = uniqueExams.slice(midpoint);

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

		const currentLines = textarea.value
			.split('\n')
			.map((x) => x.trim())
			.filter(Boolean);

		const nextLines = currentLines.concat(examsList.map((x) => String(x || '').trim()).filter(Boolean));
		textarea.value = uniqKeepOrder(nextLines).join('\n');
		formatExamsInColumns();
	}

	// ===============================
	// 7) Selects
	// ===============================
	function populateSelects() {
		const lab = $('laboratorySelect');
		const img = $('imageSelect');
		const mulher = $('womanSelect');

		// limpa mantendo placeholder (index 0)
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

					// auto-marca tipo (sem atrapalhar: só ajuda)
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
		// máscaras
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

		// botões
		on($('printBtnExam'), 'click', () => window.print());

		on($('clearExamBtn'), 'click', () => {
			const t = $('examText');
			if (t) t.value = '';
		});

		on($('clearAllBtn'), 'click', () => {
			if (!confirm('Tem certeza que deseja limpar todos os campos?')) return;

			const app = $('app');
			if (app) {
				app.querySelectorAll('input[type="text"], input[type="date"], textarea').forEach((el) => (el.value = ''));
				app.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((el) => (el.checked = false));
			}

			const toggle = $('toggleSusLogo');
			if (toggle) toggle.checked = false;

			syncSusLogoExame();
		});
	}

	// ===============================
	// 9) Boot
	// ===============================
	function init() {
		// evita re-init
		if (window.ExamesModule && window.ExamesModule._initialized) return;

		// precisa existir #app
		if (!$('app')) return;

		// cria UI base e garante controles
		createFormStructure();
		ensureControls();

		// binds
		bindSusLogoExame();
		syncSusLogoExame();
		populateSelects();
		bindSelects();
		bindFormEvents();

		window.ExamesModule._initialized = true;
	}

	// expõe API
	window.ExamesModule = {
		init,
		_initialized: false,
		_utils: { stripDiacritics, normKey },
	};

	// auto-init robusto
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init, { once: true });
	} else {
		init();
	}
})();
