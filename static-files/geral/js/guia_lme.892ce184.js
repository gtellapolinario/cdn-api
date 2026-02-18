/**
 * Guia LME (Laudo de Solicitação de Medicamentos)
 * Ajuste: sem botões flutuantes; controles ficam no aside do tab_guias.js
 */
(function () {
	'use strict';

	const API_URL = 'https://sigtap.gtmedics.com';

	window.GuiasModules = window.GuiasModules || {};

	// Função para mascara de data manual
	function maskDateBR(input) {
		let v = input.value.replace(/\D/g, '');
		if (v.length > 8) v = v.substring(0, 8);

		if (v.length >= 5) input.value = v.substring(0, 2) + '/' + v.substring(2, 4) + '/' + v.substring(4);
		else if (v.length >= 3) input.value = v.substring(0, 2) + '/' + v.substring(2);
		else input.value = v;
	}

	async function loadSelects(btnElement) {
		let originalContent = '';

		try {
			const response = await fetch(`${API_URL}/farmacos_lme/lista_simples`);
			const data = await response.json();

			const optionsHtml = ['<option value="">Selecione um medicamento...</option>'];
			data.forEach((item) => optionsHtml.push(`<option value="${item.value}">${item.label}</option>`));
			const finalHtml = optionsHtml.join('');

			['lme_med1', 'lme_med2'].forEach((id) => {
				const el = document.getElementById(id);
				if (el) el.innerHTML = finalHtml;
			});

			if (typeof Swal !== 'undefined') {
				Swal.fire({
					toast: true,
					position: 'top-end',
					icon: 'success',
					title: `${data.length} medicamentos carregados!`,
					showConfirmButton: false,
					timer: 2500,
				});
			} else {
				alert(`${data.length} medicamentos carregados!`);
			}
		} catch (error) {
			console.error('[Guia LME] Erro ao carregar:', error);
			alert('Erro ao carregar lista de medicamentos.');
		} finally {
			// clean up if needed
		}
	}

	function clear() {
		const wrapper = document.getElementById('guia_lme');
		if (!wrapper) return;

		const keepIds = new Set(['lme_cnes', 'lme_estabelecimento', 'lme_nomeMedico', 'lme_cnsMedico']);

		const inputs = wrapper.querySelectorAll('input[type="text"], input[type="date"], input[type="email"]');
		inputs.forEach((input) => {
			if (keepIds.has(input.id)) return;
			input.value = '';
		});

		['lme_med1', 'lme_med2'].forEach((id) => {
			const select = document.getElementById(id);
			if (select) select.selectedIndex = 0;
		});

		const anamnese = document.getElementById('lme_anamnese');
		if (anamnese) anamnese.value = '';

		wrapper.querySelectorAll('input[type="radio"]').forEach((r) => (r.checked = false));
		wrapper.querySelectorAll('input[type="checkbox"]').forEach((c) => (c.checked = false));
	}

	function renderGuiaLme() {
		const container = document.getElementById('guia_lme');
		if (!container) {
			console.error('[Guia LME] Container #guia_lme não encontrado');
			return;
		}

		container.innerHTML = `
  <div class="lg:col-span-3 w-full overflow-x-auto print:overflow-visible">
    <!-- A4 sheet -->
    <form id="laudo-ceaf"
      class="p-0 m-0 bg-white rounded-xl print:shadow-none w-full max-w-full md:max-w-[210mm] print:max-w-[210mm] mx-auto">
      <div class="relative h-full px-2 sm:px-4 md:px-6 print:px-2 pb-2 pt-2 w-full">
        <!-- FORMULARIO -->
        <div class="w-full max-w-5xl mx-auto bg-white p-4 relative">
          <!-- Header -->
          <div class="flex justify-center items-center">
            <div class="flex items-center">
              <div class="rounded-md px-3 flex items-center">
                <img id="logoSus" src="https://static.cdnlogo.com/logos/s/74/sus-brasil.svg" alt="Logo SUS"
                  class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 print:w-28 md:h-28 print:h-28 object-contain" />
              </div>
            </div>
            <div class="text-sm font-semibold">
              <p>Sistema Único de Saúde</p>
              <p>Ministério da Saúde</p>
              <p>Secretaria de Estado da Saúde</p>
            </div>
          </div>

          <!-- Title -->
          <div class="text-center font-bold text-sm border-l border-r border-b border-t border-black">
            <p>COMPONENTE ESPECIALIZADO DA ASSISTÊNCIA FARMACÊUTICA</p>
            <p>LAUDO DE SOLICITAÇÃO, AVALIAÇÃO E AUTORIZAÇÃO DE MEDICAMENTO(S)</p>
            <p>SOLICITAÇÃO DE MEDICAMENTO(S)</p>
          </div>

          <!-- Main Form -->
          <div class="mb-4">
            <div class="text-[9px] font-bold">
              CAMPOS DE PREENCHIMENTO EXCLUSIVO PELO MÉDICO SOLICITANTE
            </div>

            <!-- BOX 1 -->
            <div id="box1" class="border border-black mb-1 leading-none">
              <!-- Row 1 -->
              <div class="flex border-b border-black h-[36px] text-[10px] leading-none">
                <div class="w-1/2 border-r border-black relative h-full px-2 overflow-hidden">
                  <label for="lme_cnes"
                    class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">
                    1. Número do CNES*
                  </label>
                  <input id="lme_cnes" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-[20px] border-0 bg-transparent text-center focus:ring-0 focus:outline-none" />
                </div>

                <div class="w-1/2 relative h-full px-2 overflow-hidden">
                  <label for="lme_estabelecimento"
                    class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">
                    2. Nome do Estabelecimento de Saúde Solicitante
                  </label>
                  <input id="lme_estabelecimento" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-[14px] border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>
              </div>

              <!-- Row 2 -->
              <div class="flex border-b border-black h-[36px] text-[10px] leading-none">
                <div class="w-full relative h-full px-2 overflow-hidden">
                  <label for="lme_nomePaciente"
                    class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">
                    3. Nome completo do Paciente*
                  </label>
                  <input id="lme_nomePaciente" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-[14px] border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>
              </div>

              <!-- Row 3 -->
              <div class="flex border-b border-black h-[36px] text-[10px] leading-none">
                <div class="w-1/2 relative h-full px-2 overflow-hidden">
                  <label for="lme_nomeSocial"
                    class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">
                    3.1. Nome Social do Paciente
                  </label>
                  <input id="lme_nomeSocial" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-[14px] border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>

                <div class="w-1/4 border-r border-black relative h-full px-2 overflow-hidden"></div>

                <div class="w-1/4 relative h-full px-2 overflow-hidden">
                  <label for="lme_peso"
                    class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">
                    5. Peso do Paciente (kg)*
                  </label>
                  <input id="lme_peso" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-[14px] border-0 bg-transparent text-center focus:ring-0 focus:outline-none" />
                </div>
              </div>

              <!-- Row 4 -->
              <div class="flex h-[36px] text-[10px] leading-none">
                <div class="w-3/4 border-r border-black relative h-full px-2 overflow-hidden">
                  <label for="lme_nomeMae"
                    class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">
                    4. Nome da Mãe do Paciente*
                  </label>
                  <input id="lme_nomeMae" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-[14px] border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>

                <div class="w-1/4 relative h-full px-2 overflow-hidden">
                  <label for="lme_altura"
                    class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">
                    6. Altura do Paciente (cm)*
                  </label>
                  <input id="lme_altura" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-[14px] border-0 bg-transparent text-center focus:ring-0 focus:outline-none" />
                </div>
              </div>
            </div>

            <!-- BOX 2 — BLOCO 5 (Medicamentos) -->
            <div id="box2" class="border border-black mb-1 leading-none">
              <div class="">
                <!-- HEADER -->
                <div class="grid grid-cols-[32px_1fr_repeat(6,44px)] grid-rows-[18px_18px]">
                  <!-- 7 -->
                  <div
                    class="col-span-2 row-span-2 border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] font-semibold leading-none">
                    7. Medicamentos*
                  </div>
                  <!-- 8 -->
                  <div
                    class="col-span-6 border-b border-black bg-gray-100 flex items-center justify-center text-[10px] font-semibold leading-none">
                    8. Quantidade Solicitada*
                  </div>
                  <!-- Meses -->
                  <div
                    class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">
                    1º mês</div>
                  <div
                    class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">
                    2º mês</div>
                  <div
                    class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">
                    3º mês</div>
                  <div
                    class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">
                    4º mês</div>
                  <div
                    class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">
                    5º mês</div>
                  <div
                    class="border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">
                    6º mês</div>
                </div>

                <!-- LINHA 1 -->
                <div
                  class="grid grid-cols-[32px_1fr_repeat(6,44px)] h-[30px] border-b border-black text-[10px] leading-none">
                  <div class="border-r border-black flex items-center justify-center font-semibold">1</div>
                  <div class="border-r border-black overflow-hidden">
                    <select id="lme_med1"
                      class="w-full h-full border-0 bg-transparent px-1 text-[10px] leading-none focus:ring-0 focus:outline-none cursor-pointer min-w-0">
                      <option value="">Selecione...</option>
                    </select>
                  </div>
                  <div class="border-r border-black"><input id="lme_q1_1"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q1_2"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q1_3"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q1_4"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q1_5"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div><input id="lme_q1_6"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                </div>

                <!-- LINHA 2 -->
                <div
                  class="grid grid-cols-[32px_1fr_repeat(6,44px)] h-[30px] border-b border-black text-[10px] leading-none">
                  <div class="border-r border-black flex items-center justify-center font-semibold">2</div>
                  <div class="border-r border-black overflow-hidden">
                    <select id="lme_med2"
                      class="w-full h-full border-0 bg-transparent px-1 text-[10px] leading-none focus:ring-0 focus:outline-none cursor-pointer min-w-0">
                      <option value="">Selecione...</option>
                    </select>
                  </div>
                  <div class="border-r border-black"><input id="lme_q2_1"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q2_2"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q2_3"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q2_4"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q2_5"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div><input id="lme_q2_6"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                </div>

                <!-- LINHA 3 -->
                <div class="grid grid-cols-[32px_1fr_repeat(6,44px)] h-[30px] text-[10px] leading-none">
                  <div class="border-r border-black flex items-center justify-center font-semibold">3</div>
                  <div class="border-r border-black overflow-hidden">
                    <input id="lme_med3" class="w-full h-full border-0 px-1 text-left text-[10px] leading-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q3_1"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q3_2"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q3_3"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q3_4"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="border-r border-black"><input id="lme_q3_5"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                  <div><input id="lme_q3_6"
                      class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            <!-- BOX 3 — BLOCO 9 a 12 -->
            <div id="box3" class="border border-black mb-1 text-[10px] leading-none">
              <!-- Row 9/10 -->
              <div class="grid grid-cols-[120px_1fr] h-9 border-b border-black">
                <div class="relative border-r border-black px-2">
                  <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">9. CID-10*
                  </div>
                  <input id="lme_cid" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>
                <div class="relative px-2 overflow-hidden">
                  <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">10.
                    Diagnóstico</div>
                  <input id="lme_diagnostico" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>
              </div>

              <!-- Row 11 -->
              <div class="relative border-b border-black h-[60px] px-2 overflow-hidden">
                <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">11. Anamnese*
                </div>
                <textarea id="lme_anamnese"
                  class="absolute left-2 right-2 top-[18px] bottom-[2px] border-0 bg-transparent resize-none focus:ring-0 focus:outline-none"></textarea>
              </div>

              <!-- Row 12 (Tratamento Prévio) -->
              <div class="relative h-12 px-2 overflow-hidden">
                <div class="absolute top-[2px] left-2 right-2 font-semibold">12. Paciente realizou tratamento prévio
                  ou está em tratamento na doença?*</div>
                <div class="absolute left-2 right-2 bottom-[4px] flex items-center gap-4">
                  <label class="flex items-center gap-2"><input type="checkbox"
                      class="pdf-box" /><span>NÃO</span></label>
                  <label class="flex items-center gap-2"><input type="checkbox" class="pdf-box" /><span>SIM.
                      Relatar:</span></label>
                  <input type="text"
                    class="flex-1 min-w-0 h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>
              </div>
            </div>

            <!-- BOX 3B - BLOCO 13 (Atestado) -->
            <div id="box3-b" class="border border-black mb-1 text-[10px] leading-none">
              <div class="h-5 flex items-center justify-center font-semibold tracking-[0.3px] whitespace-nowrap">13.
                Atestado de Capacidade*</div>
              <div class="px-4 py-1 text-[11px] leading-tight">
                A solicitação do medicamento deverá ser realizada pelo paciente. Entretanto, fica dispensada a
                obrigatoriedade da presença física do paciente considerado incapaz de acordo com os artigos 3º e 4º do
                Código Civil. O paciente é considerado incapaz?
              </div>
              <div class="grid grid-cols-5 h-12 ">
                <div class="col-span-3 relative px-4 overflow-hidden">
                  <div
                    class="absolute left-2 top-[4px] grid-rows-[36px_36px] right-2 flex items-center gap-6 text-[8px] leading-none">
                    <div class="row-1 flex gap-8">
                      <label class="flex items-center gap-1 shrink-0"><input type="checkbox" class="w-3 h-3" /> <span
                          class="text-wrap text-[11px]">NÃO</span></label>
                      <label class="flex items-center gap-1 min-w-0 "><input type="checkbox" class="w-3 h-3" /><span
                          class="text-wrap text-[11px] text-justify">SIM. Indicar o nome do responsável pelo paciente,
                          o qual</span></label>
                    </div>
                    <div
                      class="absolute left-20 top-[14px] right-2 row-2 flex items-center gap-6 text-[8px] leading-none">
                      <label class=" mt-1.5"><span class="text-wrap text-[11px] text-justify">poderá realizar a
                          solicitação do medicamento</span></label>
                    </div>
                  </div>
                </div>
                <div class="col-span-2 relative px-2 overflow-hidden">
                  <input type="text"
                    class="absolute left-0.5 right-0.5 top-[8px] h-4 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                  <div class="absolute left-0.5 right-2.5 bottom-[11px] text-center text-[9px]">Nome do Responsável
                  </div>
                </div>
              </div>
            </div>

            <!-- BOX 4 - BLOCO 14 - 17 (Médico) -->
            <div id="box4" class="border border-black mb-1 text-[10px] leading-none">
              <div class="grid grid-cols-[1fr_140px_220px] grid-rows-[36px_36px]">
                <!-- 14 -->
                <div class="relative border-b border-black px-2 overflow-hidden">
                  <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">14. Nome do
                    médico solicitante*</div>
                  <input id="lme_nomeMedico" type="text"
                    class="absolute left-2 right-2 bottom-[2px] h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>
                <!-- coluna vazia -->
                <div class="border-r border-b border-black"></div>
                <!-- 17 -->
                <div class="relative row-span-2 px-2 overflow-hidden">
                  <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">17.
                    Assinatura e carimbo do médico*</div>
                  <div class="absolute left-2 right-2 top-[16px] bottom-[4px]"></div>
                </div>
                <!-- 15 -->
                <div class="relative border-r border-black px-2 overflow-hidden h-[36px]">
                  <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">15. Nº do
                    Cartão Nacional de Saúde (CNS) do médico solicitante*</div>
                  <input id="lme_cnsMedico" type="text"
                    class="absolute left-2 right-2 bottom-[2px] focus:ring-0 focus:outline-none" />
                </div>
                <!-- 16 -->
                <div class="relative border-r border-black px-2 overflow-hidden">
                  <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">16. Data da
                    Solicitação*</div>
                  <input id="lme_dataSolicitacao" type="text" inputmode="numeric" placeholder="dd/mm/aaaa"
                    maxlength="10"
                    class="absolute left-2 right-2 bottom-[2px] h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                </div>
              </div>
            </div>

            <!-- BOX 5 - BLOCO 18 (Campos preenchidos por) -->
            <div id="box5" class="border border-black text-[10px] leading-none">
              <div class="px-2 py-1 border-b border-black mb-2">
                <div class="flex flex-row gap-x-3 gap-y-1 mt-1 text-[9px]">
                  <div class="font-semibold">18. CAMPOS ABAIXO PREENCHIDOS POR*:</div>
                  <div class="font-semibold"><label class="flex items-center gap-1"><input type="checkbox"
                        class="w-3 h-3" /> Paciente</label></div>
                  <div class="font-semibold"><label class="flex items-center gap-1"><input type="checkbox"
                        class="w-3 h-3" /> Mãe do Paciente</label></div>
                  <div class="font-semibold"><label class="flex items-center gap-1"><input type="checkbox"
                        class="w-3 h-3" /> Responsável <span class="text-[8px]">(Descrito no item 13)</span></label>
                  </div>
                  <div class="font-semibold"><label class="flex items-center gap-1"><input type="checkbox"
                        class="w-3 h-3" /> Médico Solicitante</label></div>
                </div>
                <div class="flex items-center gap-2 mt-1 text-[9px]">
                  <label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> Outro, informar
                    nome:</label>
                  <input type="text"
                    class="flex-1 h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                  <span>e CPF:</span>
                  <input type="text"
                    class="w-[140px] h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                </div>
              </div>

              <div class="grid grid-cols-[2fr_1fr] border-b border-black h-[72px] text-[10px] leading-none">
                <div class="relative border-r border-black px-2 overflow-hidden">
                  <div class="absolute top-[2px] left-2 right-2 font-semibold">19. Raça/Cor/Etnia informado pelo
                    Paciente Responsável*</div>
                  <div class="absolute left-2 right-2 top-[22px] flex items-center gap-6 whitespace-nowrap">
                    <label class="inline-flex items-center gap-2"><input type="checkbox"
                        class="pdf-box" /><span>Branca</span></label>
                    <label class="inline-flex items-center gap-2"><input type="checkbox"
                        class="pdf-box" /><span>Amarela</span></label>
                    <label class="inline-flex items-center gap-2"><input type="checkbox"
                        class="pdf-box" /><span>Indígena. Informar Etnia:</span></label>
                    <input type="text"
                      class="flex-1 min-w-0 h-[14px] border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="absolute left-2 right-2 top-[48px] flex items-center whitespace-nowrap">
                    <label class="inline-flex items-center gap-2 w-[74px]"><input type="checkbox"
                        class="pdf-box" /><span>Preta</span></label>
                    <label class="inline-flex items-center gap-2"><input type="checkbox"
                        class="pdf-box" /><span>Parda</span></label>
                  </div>
                </div>
                <div class="relative px-2 overflow-hidden">
                  <div class="absolute top-[2px] left-2 right-2 font-semibold">20. Telefone(s) para contato do
                    paciente</div>
                  <div class="absolute left-2 right-2 top-[26px] flex items-center whitespace-nowrap">
                    <span class="mr-1">(</span><input type="text"
                      class="w-[44px] h-[14px] border-0 bg-transparent focus:ring-0 focus:outline-none text-center" /><span
                      class="ml-1">)</span>
                    <input type="text"
                      class="flex-1 h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                  </div>
                  <div class="absolute left-2 right-2 top-[48px] flex items-center whitespace-nowrap">
                    <span class="mr-1">(</span><input type="text"
                      class="w-[44px] h-[14px] border-0 bg-transparent focus:ring-0 focus:outline-none text-center" /><span
                      class="ml-1">)</span>
                    <input type="text"
                      class="flex-1 h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-[1fr_1fr] grid-rows-[36px_36px]">
                <div class="border-r border-b border-black px-2 py-1 overflow-hidden">
                  <div class="font-semibold">21. Número do documento do Paciente</div>
                  <div class="flex items-center gap-3 mt-1 text-[9px]">
                    <label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> CPF</label>
                    <label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> CNS:</label>
                    <input type="text"
                      class="flex-1 h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                  </div>
                </div>
                <div class="row-span-2 px-2 py-1">
                  <div class="font-semibold">23. Assinatura do responsável pelo preenchimento*</div>
                </div>
                <div class="border-r border-black px-2 py-1 overflow-hidden">
                  <div class="font-semibold">22. Correio Eletrônico do paciente</div>
                  <input type="email" class="mt-1 w-full h-3.5 bg-transparent focus:ring-0 focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
        `;
		// máscara do input
		const dataInput = document.getElementById('lme_dataSolicitacao');
		if (dataInput) {
			dataInput.addEventListener('input', function () {
				maskDateBR(this);
			});
		}

		// Inicializa o módulo de CID-10 para os campos
		if (window.Cid10Module && typeof window.Cid10Module.setupCidSearch === 'function') {
			window.Cid10Module.setupCidSearch('lme_cid', 'lme_diagnostico');
		} else {
			console.warn('Cid10Module não carregado ou setupCidSearch indisponível.');
		}

		console.log('[Guia LME] Renderizada (controles via aside externo)');
	}

	// Expondo módulo para o aside do tab_guias.js
	window.GuiasModules.lme = {
		clear,
		loadSelects,
	};

	window.renderGuiaLme = renderGuiaLme;
})();
