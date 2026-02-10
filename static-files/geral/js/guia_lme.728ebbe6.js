/**
 * Guia LME (Laudo de Solicitação de Medicamentos)
 * Convertido de LME2.html
 */
(function () {
	'use strict';

	const API_URL = 'https://sigtap.gtmedics.com';

	function injectLmeStyles() {
		if (document.getElementById('guia-lme-styles')) return;
		const s = document.createElement('style');
		s.id = 'guia-lme-styles';
		s.textContent = `
            /* =========================================================
            CHECKBOX (padroniza TODOS como "bonitos" / nativos)
            - mantém tamanho 12px
            - aparência nativa (igual w-3 h-3)
             ========================================================= */
            #guia_lme .pdf-box {
                width: 12px;
                height: 12px;
                appearance: auto;
                -webkit-appearance: auto;
                background: initial;
                border: initial;
                display: inline-block;
                vertical-align: middle;
            }

            /* =========================================================
            PÁGINA / A4
            ========================================================= */
            #guia_lme .a4 {
                width: 210mm;
                min-height: 297mm;
            }

            #guia_lme * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }

            @page {
                size: A4;
                margin: 0;
            }

            /* =========================================================
            PRINT
            ========================================================= */
            @media print {
                html, body {
                    background: white !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }

                /* Ocultar elementos da interface geral na impressão */
                #header, #sidebar, #tab-guias > div > header, #menu-guias {
                    display: none !important;
                }

                /* Ocultar botão de limpar na impressão */
                #guia_lme aside {
                    display: none !important;
                }

                /* Esconder placeholders na impressão */
                #guia_lme ::-webkit-input-placeholder { color: transparent !important; opacity: 0 !important; }
                #guia_lme :-moz-placeholder { color: transparent !important; opacity: 0 !important; }
                #guia_lme ::-moz-placeholder { color: transparent !important; opacity: 0 !important; }
                #guia_lme :-ms-input-placeholder { color: transparent !important; opacity: 0 !important; }
                #guia_lme ::placeholder { color: transparent !important; opacity: 0 !important; }

                /* Remove bordas APENAS de inputs "de texto" e textarea */
                #guia_lme input:not([type="checkbox"]):not([type="radio"]),
                #guia_lme textarea {
                    border-color: transparent !important;
                }

                /* Remove controles do input date na impressão */
                #guia_lme input[type="date"]::-webkit-calendar-picker-indicator,
                #guia_lme input[type="date"]::-webkit-inner-spin-button,
                #guia_lme input[type="date"]::-webkit-clear-button {
                    display: none !important;
                    -webkit-appearance: none !important;
                }

                #guia_lme input[type="date"] {
                    border: none !important;
                    background: transparent !important;
                    outline: none !important;
                    box-shadow: none !important;
                    -webkit-appearance: none !important;
                    -moz-appearance: none !important;
                    appearance: none !important;
                    color: inherit !important;
                    padding: 0 !important;
                }

                #guia_lme section#laudo-ceaf {
                    box-shadow: none !important;
                    border: none !important;
                    margin: 0 !important;
                    max-width: 100% !important;
                }
            }
		`;
		document.head.appendChild(s);
	}

	// Função para mascara de data manual
	function maskDateBR(input) {
		let v = input.value.replace(/\D/g, '');
		if (v.length > 8) v = v.substring(0, 8);

		if (v.length >= 5) {
			input.value = v.substring(0, 2) + '/' + v.substring(2, 4) + '/' + v.substring(4);
		} else if (v.length >= 3) {
			input.value = v.substring(0, 2) + '/' + v.substring(2);
		} else {
			input.value = v;
		}
	}

	function renderGuiaLme() {
		const container = document.getElementById('guia_lme');
		if (!container) {
			console.error('[Guia LME] Container #guia_lme não encontrado');
			return;
		}

		injectLmeStyles();

		container.innerHTML = `
            <div class="bg-gray-100 min-h-screen py-8 text-sm relative">

                <!-- ASIDE (fora do A4) -->
                <aside class="fixed top-20 right-4 z-50 flex flex-col gap-2 print:hidden">
                    <button id="lme_btnLimpar"
                        class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow transition-colors">
                        Limpar Campos
                    </button>

                    <button id="lme_btnCarregar"
                        class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">cloud_download</span>
                        Carregar Selects
                    </button>
                </aside>

                 <!-- Wrapper: scroll no mobile, normal no print -->
                <div class="w-full overflow-x-auto print:overflow-visible">
                    <!-- A4 sheet -->
                    <section id="laudo-ceaf" class="bg-white w-full max-w-full md:max-w-[210mm] print:max-w-[210mm] mx-auto
                        rounded-xl print:rounded-none
                        shadow-sm print:shadow-none  
                        ring-1 ring-black/5 print:ring-0">

                        <div class="relative px-2 sm:px-4 md:px-6 print:px-2 py-4">
                            <!-- FORMULARIO -->

                            <div class="w-full max-w-5xl mx-auto bg-white p-4 relative">

                                <!-- Header -->
                                <div class="flex justify-center items-center">
                                    <div class="flex items-center">
                                        <div class="rounded-md px-3 flex items-center">
                                            <img id="logoSus" src="https://static.cdnlogo.com/logos/s/74/sus-brasil.svg"
                                                alt="Logo SUS"
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
                                                <input id="lme_nomeMae" type="text" value="ELIETE DO CARMO CORNELIO ROSA"
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
                                                <div class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">1º mês</div>
                                                <div class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">2º mês</div>
                                                <div class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">3º mês</div>
                                                <div class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">4º mês</div>
                                                <div class="border-r border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">5º mês</div>
                                                <div class="border-b border-black bg-gray-100 flex items-center justify-center text-[10px] leading-none">6º mês</div>
                                            </div>

                                            <!-- LINHA 1 -->
                                            <div class="grid grid-cols-[32px_1fr_repeat(6,44px)] h-[30px] border-b border-black text-[10px] leading-none">
                                                <div class="border-r border-black flex items-center justify-center font-semibold">1</div>
                                                <div class="border-r border-black overflow-hidden">
                                                    <select id="lme_med1" class="w-full h-full border-0 bg-transparent px-1 text-[10px] leading-none focus:ring-0 focus:outline-none cursor-pointer min-w-0">
                                                        <option value="">Selecione...</option>
                                                        <option value="OLANZAPINA 10.00 MG COMPRIMIDO">OLANZAPINA 10.00 MG COMPRIMIDO</option>
                                                        <option value="QUETIAPINA 25 MG COMPRIMIDO">QUETIAPINA 25 MG COMPRIMIDO</option>
                                                        <option value="RISPERIDONA 2 MG COMPRIMIDO">RISPERIDONA 2 MG COMPRIMIDO</option>
                                                    </select>
                                                </div>
                                                <div class="border-r border-black"><input id="lme_q1_1" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q1_2" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q1_3" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q1_4" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q1_5" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div><input id="lme_q1_6" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                            </div>

                                            <!-- LINHA 2 -->
                                            <div class="grid grid-cols-[32px_1fr_repeat(6,44px)] h-[30px] border-b border-black text-[10px] leading-none">
                                                <div class="border-r border-black flex items-center justify-center font-semibold">2</div>
                                                <div class="border-r border-black overflow-hidden">
                                                    <select id="lme_med2" class="w-full h-full border-0 bg-transparent px-1 text-[10px] leading-none focus:ring-0 focus:outline-none cursor-pointer min-w-0">
                                                        <option value="">Selecione...</option>
                                                    </select>
                                                </div>
                                                <div class="border-r border-black"><input id="lme_q2_1" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q2_2" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q2_3" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q2_4" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q2_5" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div><input id="lme_q2_6" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                            </div>

                                            <!-- LINHA 3 -->
                                            <div class="grid grid-cols-[32px_1fr_repeat(6,44px)] h-[30px] text-[10px] leading-none">
                                                <div class="border-r border-black flex items-center justify-center font-semibold">3</div>
                                                <div class="border-r border-black overflow-hidden">
                                                    <input id="lme_med3" class="w-full h-full border-0 px-1 text-left text-[10px] leading-none" />
                                                </div>
                                                <div class="border-r border-black"><input id="lme_q3_1" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q3_2" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q3_3" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q3_4" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div class="border-r border-black"><input id="lme_q3_5" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                                <div><input id="lme_q3_6" class="w-full h-full border-0 p-0 text-center text-[10px] leading-none focus:ring-0 focus:outline-none" /></div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- BOX 3 — BLOCO 9 a 12 -->
                                    <div id="box3" class="border border-black mb-1 text-[10px] leading-none">
                                        <!-- Row 9/10 -->
                                        <div class="grid grid-cols-[120px_1fr] h-9 border-b border-black">
                                            <div class="relative border-r border-black px-2 overflow-hidden">
                                                <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">9. CID-10*</div>
                                                <input id="lme_cid" type="text" class="absolute left-2 right-2 bottom-[2px] h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                                            </div>
                                            <div class="relative px-2 overflow-hidden">
                                                <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">10. Diagnóstico</div>
                                                <input id="lme_diagnostico" type="text" class="absolute left-2 right-2 bottom-[2px] h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                                            </div>
                                        </div>

                                        <!-- Row 11 -->
                                        <div class="relative border-b border-black h-[60px] px-2 overflow-hidden">
                                            <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">11. Anamnese*</div>
                                            <textarea id="lme_anamnese" class="absolute left-2 right-2 top-[18px] bottom-[2px] border-0 bg-transparent resize-none focus:ring-0 focus:outline-none"></textarea>
                                        </div>

                                        <!-- Row 12 (Tratamento Prévio) -->
                                        <div class="relative h-12 px-2 overflow-hidden">
                                            <div class="absolute top-[2px] left-2 right-2 font-semibold">12. Paciente realizou tratamento prévio ou está em tratamento na doença?*</div>
                                            <div class="absolute left-2 right-2 bottom-[4px] flex items-center gap-4">
                                                <label class="flex items-center gap-2"><input type="checkbox" class="pdf-box" /><span>NÃO</span></label>
                                                <label class="flex items-center gap-2"><input type="checkbox" class="pdf-box" /><span>SIM. Relatar:</span></label>
                                                <input type="text" class="flex-1 min-w-0 h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- BOX 3B - BLOCO 13 (Atestado) -->
                                    <div id="box3-b" class="border border-black mb-1 text-[10px] leading-none">
                                        <div class="h-5 flex items-center justify-center font-semibold tracking-[0.3px] whitespace-nowrap">13. Atestado de Capacidade*</div>
                                        <div class="px-4 py-1 text-[11px] leading-tight">
                                            A solicitação do medicamento deverá ser realizada pelo paciente. Entretanto, fica dispensada a obrigatoriedade da presença física do paciente considerado incapaz de acordo com os artigos 3º e 4º do Código Civil. O paciente é considerado incapaz?
                                        </div>
                                        <div class="grid grid-cols-5 h-12 ">
                                            <div class="col-span-3 relative px-4 overflow-hidden">
                                                <div class="absolute left-2 top-[4px] grid-rows-[36px_36px] right-2 flex items-center gap-6 text-[8px] leading-none">
                                                    <div class="row-1 flex gap-8">
                                                        <label class="flex items-center gap-1 shrink-0"><input type="checkbox" class="w-3 h-3" /> <span class="text-wrap text-[11px]">NÃO</span></label>
                                                        <label class="flex items-center gap-1 min-w-0 "><input type="checkbox" class="w-3 h-3" /><span class="text-wrap text-[11px] text-justify">SIM. Indicar o nome do responsável pelo paciente, o qual</span></label>
                                                    </div>
                                                    <div class="absolute left-20 top-[14px] right-2 row-2 flex items-center gap-6 text-[8px] leading-none">
                                                        <label class=" mt-1.5"><span class="text-wrap text-[11px] text-justify">poderá realizar a solicitação do medicamento</span></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-span-2 relative px-2 overflow-hidden">
                                                <input type="text" class="absolute left-0.5 right-0.5 top-[8px] h-4 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                                                <div class="absolute left-0.5 right-2.5 bottom-[11px] text-center text-[9px]">Nome do Responsável</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- BOX 4 - BLOCO 14 - 17 (Médico) -->
                                    <div id="box4" class="border border-black mb-1 text-[10px] leading-none">
                                        <div class="grid grid-cols-[1fr_140px_220px] grid-rows-[36px_36px]">
                                            <!-- 14 -->
                                            <div class="relative border-b border-black px-2 overflow-hidden">
                                                <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">14. Nome do médico solicitante*</div>
                                                <input id="lme_nomeMedico" type="text" class="absolute left-2 right-2 bottom-[2px] h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                                            </div>
                                            <!-- coluna vazia -->
                                            <div class="border-r border-b border-black"></div>
                                            <!-- 17 -->
                                            <div class="relative row-span-2 px-2 overflow-hidden">
                                                <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">17. Assinatura e carimbo do médico*</div>
                                                <div class="absolute left-2 right-2 top-[16px] bottom-[4px]"></div>
                                            </div>
                                            <!-- 15 -->
                                            <div class="relative border-r border-black px-2 overflow-hidden h-[36px]">
                                                <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">15. Nº do Cartão Nacional de Saúde (CNS) do médico solicitante*</div>
                                                <input id="lme_cnsMedico" type="text" class="absolute left-2 right-2 bottom-[2px] focus:ring-0 focus:outline-none" />
                                            </div>
                                            <!-- 16 -->
                                            <div class="relative border-r border-black px-2 overflow-hidden">
                                                <div class="absolute top-[2px] left-2 font-semibold tracking-[0.3px] whitespace-nowrap">16. Data da Solicitação*</div>
                                                <input id="lme_dataSolicitacao" type="text" inputmode="numeric" placeholder="dd/mm/aaaa" maxlength="10"
                                                    class="absolute left-2 right-2 bottom-[2px] h-3.5 border-0 bg-transparent focus:ring-0 focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- BOX 5 - BLOCO 18 (Campos preenchidos por) -->
                                    <div id="box5" class="border border-black text-[10px] leading-none">
                                        <div class="px-2 py-1 border-b border-black mb-2">
                                            <div class="flex flex-row gap-x-3 gap-y-1 mt-1 text-[9px]">
                                                <div class="font-semibold">18. CAMPOS ABAIXO PREENCHIDOS POR*:</div>
                                                <div class="font-semibold"><label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> Paciente</label></div>
                                                <div class="font-semibold"><label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> Mãe do Paciente</label></div>
                                                <div class="font-semibold"><label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> Responsável <span class="text-[8px]">(Descrito no item 13)</span></label></div>
                                                <div class="font-semibold"><label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> Médico Solicitante</label></div>
                                            </div>
                                            <div class="flex items-center gap-2 mt-1 text-[9px]">
                                                <label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> Outro, informar nome:</label>
                                                <input type="text" class="flex-1 h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                                                <span>e CPF:</span>
                                                <input type="text" class="w-[140px] h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-[2fr_1fr] border-b border-black h-[72px] text-[10px] leading-none">
                                            <div class="relative border-r border-black px-2 overflow-hidden">
                                                <div class="absolute top-[2px] left-2 right-2 font-semibold">19. Raça/Cor/Etnia informado pelo Paciente Responsável*</div>
                                                <div class="absolute left-2 right-2 top-[22px] flex items-center gap-6 whitespace-nowrap">
                                                    <label class="inline-flex items-center gap-2"><input type="checkbox" class="pdf-box" /><span>Branca</span></label>
                                                    <label class="inline-flex items-center gap-2"><input type="checkbox" class="pdf-box" /><span>Amarela</span></label>
                                                    <label class="inline-flex items-center gap-2"><input type="checkbox" class="pdf-box" /><span>Indígena. Informar Etnia:</span></label>
                                                    <input type="text" class="flex-1 min-w-0 h-[14px] border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                                                </div>
                                                <div class="absolute left-2 right-2 top-[48px] flex items-center whitespace-nowrap">
                                                    <label class="inline-flex items-center gap-2 w-[74px]"><input type="checkbox" class="pdf-box" /><span>Preta</span></label>
                                                    <label class="inline-flex items-center gap-2"><input type="checkbox" class="pdf-box" /><span>Parda</span></label>
                                                </div>
                                            </div>
                                            <div class="relative px-2 overflow-hidden">
                                                <div class="absolute top-[2px] left-2 right-2 font-semibold">20. Telefone(s) para contato do paciente</div>
                                                <div class="absolute left-2 right-2 top-[26px] flex items-center whitespace-nowrap">
                                                    <span class="mr-1">(</span><input type="text" class="w-[44px] h-[14px] border-0 bg-transparent focus:ring-0 focus:outline-none text-center" /><span class="ml-1">)</span>
                                                    <input type="text" class="flex-1 h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                                                </div>
                                                <div class="absolute left-2 right-2 top-[48px] flex items-center whitespace-nowrap">
                                                    <span class="mr-1">(</span><input type="text" class="w-[44px] h-[14px] border-0 bg-transparent focus:ring-0 focus:outline-none text-center" /><span class="ml-1">)</span>
                                                    <input type="text" class="flex-1 h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-[1fr_1fr] grid-rows-[36px_36px]">
                                            <div class="border-r border-b border-black px-2 py-1 overflow-hidden">
                                                <div class="font-semibold">21. Número do documento do Paciente</div>
                                                <div class="flex items-center gap-3 mt-1 text-[9px]">
                                                    <label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> CPF</label>
                                                    <label class="flex items-center gap-1"><input type="checkbox" class="w-3 h-3" /> CNS:</label>
                                                    <input type="text" class="flex-1 h-3.5 border-0 border-b border-black bg-transparent focus:ring-0 focus:outline-none" />
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
                    </section>
                </div>
            </div>
        `;

		// ===============================
		//  LOGICA
		// ===============================

		// Mascara de data no input
		const dataInput = document.getElementById('lme_dataSolicitacao');
		if (dataInput) {
			dataInput.addEventListener('input', function () {
				maskDateBR(this);
			});
		}

		// Carregar Selects
		async function carregarLMECompleto(btnElement) {
			let originalContent = '';

			if (btnElement) {
				originalContent = btnElement.innerHTML;
				btnElement.disabled = true;
				btnElement.innerHTML = `
                    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Baixando...</span>`;
			}

			try {
				const response = await fetch(`${API_URL}/farmacos_lme/lista_simples`);
				const data = await response.json();

				const optionsHtml = ['<option value="">Selecione um medicamento...</option>'];
				data.forEach((item) => {
					optionsHtml.push(`<option value="${item.value}">${item.label}</option>`);
				});
				const finalHtml = optionsHtml.join('');

				['lme_med1', 'lme_med2'].forEach((id) => {
					const el = document.getElementById(id);
					if (el) el.innerHTML = finalHtml;
				});

				// Toast simples se Swal nao estiver disponivel, ou console
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
				console.error('Erro ao carregar:', error);
				alert('Erro ao carregar lista de medicamentos.');
			} finally {
				if (btnElement) {
					btnElement.disabled = false;
					btnElement.innerHTML = originalContent;
				}
			}
		}

		// Limpar Formulario
		function limparFormulario() {
			const wrapper = document.getElementById('guia_lme');
			if (!wrapper) return;

			const inputs = wrapper.querySelectorAll('input[type="text"], input[type="date"], input[type="email"]');
			inputs.forEach((input) => {
				if (input.id === 'lme_nomeMae') {
					input.value = 'ELIETE DO CARMO CORNELIO ROSA';
				} else {
					input.value = '';
				}
			});

			['lme_med1', 'lme_med2', 'lme_med3'].forEach((id) => {
				const select = document.getElementById(id);
				if (select) select.selectedIndex = 0;
			});

			const anamnese = document.getElementById('lme_anamnese');
			if (anamnese) anamnese.value = '';

			const radios = wrapper.querySelectorAll('input[type="radio"]');
			radios.forEach((r) => (r.checked = false));

			const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
			checkboxes.forEach((c) => (c.checked = false));
		}

		// Bind events manually after render
		const btnCarregar = container.querySelector('#lme_btnCarregar');
		if (btnCarregar) {
			btnCarregar.addEventListener('click', function () {
				carregarLMECompleto(this);
			});
		}

		const btnLimpar = container.querySelector('#lme_btnLimpar');
		if (btnLimpar) {
			btnLimpar.addEventListener('click', limparFormulario);
		}

		console.log('[Guia LME] Renderizada com sucesso');
	}

	window.renderGuiaLme = renderGuiaLme;
})();
window.renderGuiaLme = renderGuiaLme;
