// hotstrings-metadata-module.js
(() => {
	'use strict';

	// ============================================
	// BASE DE DADOS: METADATA DOS HOTSTRINGS
	// ============================================

	const psf_metadata = {
		abscesso_furunculo: {
			title: 'Abscesso Furunculo',
			symptoms: 'Tumoração dolorosa, eritema, calor local, flutuação.',
			tips: '\\nDrenagem (se flutuação ou se julgar necessário) + analgesia com Dipirona 01 amp IM',
		},
		aftas: {
			title: 'Aftas',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		amenorreia_secundaria: {
			title: 'Amenorreia Secundaria',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		amigdalite_j03_9: {
			title: 'Amigdalite J03 9',
			symptoms: 'Dor de garganta, febre, disfagia, hiperemia tonsilar, exsudato purulento.',
			tips: '\\nPenicilina G benzatina 1.2M UI IM dose única + sintomáticos pra casa',
		},
		anemia_crianca: {
			title: 'Anemia Crianca',
			symptoms: 'Palidez cutâneo-mucosa, fadiga, astenia, taquicardia, dispneia aos esforços.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		anemia_ferropriva_sintomatica_d50_0: {
			title: 'Anemia Ferropriva Sintomatica D50 0',
			symptoms: 'Palidez cutâneo-mucosa, fadiga, astenia, taquicardia, dispneia aos esforços.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		asma: {
			title: 'Asma',
			symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		asma_aguda_leve_moderada_j45_0: {
			title: 'Asma Aguda Leve Moderada J45 0',
			symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		asma_crianca_1: {
			title: 'Asma Crianca 1',
			symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		asma_crianca_2: {
			title: 'Asma Crianca 2',
			symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		asma_crianca_3: {
			title: 'Asma Crianca 3',
			symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		asma_crise_aguda: {
			title: 'Asma Crise Aguda',
			symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		asma_crise_aguda_2: {
			title: 'Asma Crise Aguda 2',
			symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		candidiase_vaginal_corrimento: {
			title: 'Candidiase Vaginal Corrimento',
			symptoms: 'Prurido vulvovaginal, corrimento branco grumoso, disúria, dispareunia.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		cefaleia_tensional_cefaleia_dor_de_cabeca_g44_2: {
			title: 'Cefaleia Tensional Cefaleia Dor De Cabeca G44 2',
			symptoms: 'Dor de cabeça (pressão, pulsátil), fotofobia, fonofobia, náuseas.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		cerume_impactado: {
			title: 'Cerume Impactado',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		cervicite_e_uretrite: {
			title: 'Cervicite E Uretrite',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		cinetose: {
			title: 'Cinetose',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		colelitiase: {
			title: 'Colelitiase',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		colica_biliar_litiase_biliar_pedra_nos_rins_k80_2: {
			title: 'Colica Biliar Litiase Biliar Pedra Nos Rins K80 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) Dipirona 01 amp + Buscopan Composto 01 amp em SF 0,9% 100 mL EV\\n   SE PERSISTIR, REPETIR MAIS UMA RODADA DA PRESCRIÇÃO ACIMA. SE MESMO ASSIM PERSISTIR:\\n1) TRAMADOL 1 AMP EM SF 0,9% 100ML EV',
		},
		conjuntivite_h10_9: {
			title: 'Conjuntivite H10 9',
			symptoms: 'Olhos vermelhos, prurido, lacrimejamento, secreção, sensação de areia nos olhos.',
			tips: '\\n1) Fazer compressas frias por 20 minutos no olho afetado\\n2) Evitar coçar os olhos e não usar soro fisiológico para lavar\\n3) Suspender o uso de lentes de contato durante o tratamento',
		},
		constipacao_funcional_k59_0: {
			title: 'Constipacao Funcional K59 0',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFOSFATO DE SÓDIO (FLEET ENEMA) Aplicar 01 enema por via retal, dose única.<br><br>\\n1) Aumentar a ingestão de água (mínimo 2L/dia)\\n2) Aumentar fibras (frutas, verduras e cereais integrais)\\n3) Praticar atividade física regular\\n4) Evitar segurar vontade de evacuar\\n\\n',
		},
		crise_convulsiva_epilepsia_g40_9: {
			title: 'Crise Convulsiva Epilepsia G40 9',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIAZEPAM 10mg (retal ou EV)\\n   Administrar 01 ampola via retal ou EV, dose única\\n2) OXIGÊNIO\\n   Administrar com máscara, se saturação < 94%\\n\\n',
		},
		crise_hipertensiva_i10_r03_0: {
			title: 'Crise Hipertensiva I10 R03 0',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) CAPTOPRIL 25mg SL\\n   Administrar 01 cp sublingual, monitorar PA a cada 15 min\\n\\n<br><br>\\n1) Manter uso correto dos anti-hipertensivos\\n2) Retorno com clínico ou cardiologista para ajuste medicamentoso',
		},
		dengue: {
			title: 'Dengue',
			symptoms: 'Febre alta súbita, cefaleia, dor retro-orbital, mialgia, artralgia, prostração, exantema.',
			tips: 'INTERNAÇÃO HOSPITALAR\\n\\n- Pacientes com sinais de alarme (grupo C) devem ser internados em hospital.\\n- Pacientes em estado grave com sinais de choque (grupo D) devem ser encaminhados à terapia intensiva.\\n- Internação é indicada também nas seguintes situações: recusa ou incapacidade de ingerir líquidos e alimentos; impossibilidade de acompanhamento ou retorno à unidade de saúde; descompensação de doença grave; plaquetas < 20.000/mm3.',
		},
		dengue_a90: {
			title: 'Dengue A90',
			symptoms: 'Febre alta súbita, cefaleia, dor retro-orbital, mialgia, artralgia, prostração, exantema.',
			tips: '\\n1) Dipirona 01 amp + Ondansetrona 01 amp em SF 0,9% 250 mL EV<br><br>\\nNão usar anti-inflamatórios (ibuprofeno, diclofenaco, cetoprofeno, nimesulida, etc)\\nHidratação vigorosa (mínimo 80 mL/kg/dia)\\nAlimentação leve (caldos, sucos, água de côco). Não tomar refrigerantes, sucos artificiais, gorduras como salgadinho e alimentos pesados.\\nRetorno se: sangramentos, dor abdominal intensa, vômitos persistentes ou sonolência\\nSe febre persistir mesmo com dipirona, intercalar com paracetamol\\n\\n',
		},
		dermatite_de_contato_reacao_alergica_leve_l23_9: {
			title: 'Dermatite De Contato Reacao Alergica Leve L23 9',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dermatite_seborreica_leve_l21_0: {
			title: 'Dermatite Seborreica Leve L21 0',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se queixa de dor ou prurido intenso)',
		},
		dermatofitose_interdigital_pe_de_atleta_b35_3: {
			title: 'Dermatofitose Interdigital Pe De Atleta B35 3',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se dor local intensa)<br><br>\\n→ Manter pés secos e arejados\\n→ Trocar meias diariamente\\n\\n',
		},
		dip_1: {
			title: 'Dip 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dip_2_comprometimento_sistemico: {
			title: 'Dip 2 Comprometimento Sistemico',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dismenorreia_1: {
			title: 'Dismenorreia 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dismenorreia_2: {
			title: 'Dismenorreia 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dispepsia_funcional_1: {
			title: 'Dispepsia Funcional 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dispesia_funcional_2: {
			title: 'Dispesia Funcional 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dor_muscular_lombalgia_algia_m54_5: {
			title: 'Dor Muscular Lombalgia Algia M54 5',
			symptoms: 'Dor na região lombar, rigidez, irradiação para glúteos ou coxas.',
			tips: '\\n1) DIPIRONA 1g IM + DICLOFENACO 75mg IM, dose única',
		},
		dorsalgia_1: {
			title: 'Dorsalgia 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dorsalgia_2: {
			title: 'Dorsalgia 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dorsalgia_3: {
			title: 'Dorsalgia 3',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dorsalgia_intensa: {
			title: 'Dorsalgia Intensa',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		dpoc_em_exacerbacao_j44_1: {
			title: 'Dpoc Em Exacerbacao J44 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) Inalação com 5 gotas de Fenoterol + 5 gotas de Brometo de Ipratrópio em 5 mL de SF 0,9%\\n2) Hidrocortisona 100mg EV ou IM',
		},
		enterobiase_infestacao_por_oxiuros_b80: {
			title: 'Enterobiase Infestacao Por Oxiuros B80',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se prurido anal intenso)<br><br>\\nLavar roupas de cama e higiene pessoal\\nTratar todos os contatos domiciliares\\n\\n',
		},
		enxaqueca_migranea_g43_9: {
			title: 'Enxaqueca Migranea G43 9',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM + DECADRON 4mg IM + ONDANSETRONA 01 amp IM',
		},
		erispela: {
			title: 'Erispela',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM + CEFTRIAXONA 1g IM',
		},
		escabiose_sarna_b86: {
			title: 'Escabiose Sarna B86',
			symptoms: 'Prurido intenso (pior à noite), pápulas escoriadas, túneis na pele.',
			tips: '\\n1) DIPIRONA 1g IM (se prurido generalizado intenso)',
		},
		escoriacoes_feridas_leves_s00_8: {
			title: 'Escoriacoes Feridas Leves S00 8',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM, dose única para analgesia local',
		},
		faringite_viral_faringoamigdalite_viral_j02_9: {
			title: 'Faringite Viral Faringoamigdalite Viral J02 9',
			symptoms: 'Dor de garganta, febre, disfagia, hiperemia tonsilar, exsudato purulento.',
			tips: '\\n1) DIPIRONA 1g IM + ORIENTAR repouso, hidratação e evitar antibiótico desnecessário',
		},
		foliculite: {
			title: 'Foliculite',
			symptoms: 'Pústulas ou pápulas eritematosas ao redor do folículo piloso, prurido leve.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		gases_em_bebes: {
			title: 'Gases Em Bebes',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		gastrite_drge_dispepsia_dor_no_estomago_k29_7_k21_9_k30: {
			title: 'Gastrite Drge Dispepsia Dor No Estomago K29 7 K21 9 K30',
			symptoms: 'Dor epigástrica, queimação, náuseas, plenitude pós-prandial.',
			tips: '\\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
		},
		geca_gastroenterite_aguda_a09: {
			title: 'Geca Gastroenterite Aguda A09',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
		},
		gota_1_crise: {
			title: 'Gota 1 Crise',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		gota_2_crise: {
			title: 'Gota 2 Crise',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		gota_3_crise: {
			title: 'Gota 3 Crise',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		gota_4_controle: {
			title: 'Gota 4 Controle',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		h_pylori_1: {
			title: 'H Pylori 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		h_pylori_2_alergia_a_amoxicilina: {
			title: 'H Pylori 2 Alergia A Amoxicilina',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		hemorragia_nasal_epistaxe_leve_r04_0: {
			title: 'Hemorragia Nasal Epistaxe Leve R04 0',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) Compressão com algodão embebido em SF gelado + NAFAZOLINA spray',
		},
		hemorroida_i84_9: {
			title: 'Hemorroida I84 9',
			symptoms: 'Sangramento ao evacuar, dor anal, prolapso, prurido.',
			tips: '\\n1) DIPIRONA 1g IM + DECADRON 4mg IM',
		},
		herpes_simples_b00_9: {
			title: 'Herpes Simples B00 9',
			symptoms: 'Vesículas agrupadas sobre base eritematosa, dor, ardor, prurido local.',
			tips: '\\n1) DIPIRONA 1g IM (se dor intensa local)',
		},
		hiperglicemia_descompensacao_do_dm2_e11_9: {
			title: 'Hiperglicemia Descompensacao Do Dm2 E11 9',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se queixa de dor)\\n2) SF 0,9% EV em 500 mL (caso de desidratação moderada)\\n3) investigar causas secundárias ou aderência do paciente ao tratamento',
		},
		hiperplasia_prostata_1: {
			title: 'Hiperplasia Prostata 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		hiperplasia_prostata_2: {
			title: 'Hiperplasia Prostata 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		hiperplasia_prostata_3: {
			title: 'Hiperplasia Prostata 3',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		hiperplasia_prostata_4: {
			title: 'Hiperplasia Prostata 4',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		hiperplasia_prostata_5: {
			title: 'Hiperplasia Prostata 5',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		hipertensao_arterial_descompensada_i10: {
			title: 'Hipertensao Arterial Descompensada I10',
			symptoms: 'Geralmente assintomática. Cefaleia nucal, tontura, escotomas em crises.',
			tips: '\\n1) CAPTOPRIL 25mg VO + DIPIRONA 1g IM\\n2) FUROSEMIDA 40mg tomar 01 cp via oral se houver congestão ou edema (avaliar se paciente é renal)\\n3) retorno em 1h para reavaliar',
		},
		hipertireoidismo_1: {
			title: 'Hipertireoidismo 1',
			symptoms: 'Perda de peso, intolerância ao calor, tremores, palpitações, insônia.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		hipertireoidismo_2: {
			title: 'Hipertireoidismo 2',
			symptoms: 'Perda de peso, intolerância ao calor, tremores, palpitações, insônia.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		hipoglicemia_sintomatica_e16_2: {
			title: 'Hipoglicemia Sintomatica E16 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) GLICOSE 50% EV (01 ampola 20mL) em infundido lento (10-15min) diluída em 100mL de SF 0,9% EV (se paciente sintomático - tremores, queda de nível de consciência, sudorese).',
		},
		hipotireoidismo: {
			title: 'Hipotireoidismo',
			symptoms: 'Ganho de peso, intolerância ao frio, pele seca, constipação, astenia.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		impetigo_l01_0: {
			title: 'Impetigo L01 0',
			symptoms: 'Lesões vesico-pustulosas que rompem e formam crostas melicéricas.',
			tips: '\\n1) DIPIRONA 1g IM (se dor local)',
		},
		impetigo_ou_ectima: {
			title: 'Impetigo Ou Ectima',
			symptoms: 'Lesões vesico-pustulosas que rompem e formam crostas melicéricas.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		impetigo_ou_ectima_2: {
			title: 'Impetigo Ou Ectima 2',
			symptoms: 'Lesões vesico-pustulosas que rompem e formam crostas melicéricas.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		infeccao_de_urina_itu_n39_0: {
			title: 'Infeccao De Urina Itu N39 0',
			symptoms: 'Disúria, polaciúria, urgência miccional, dor suprapúbica, febre (pielonefrite).',
			tips: '\\n1) DIPIRONA 1g IM + CEFTRIAXONA 1g IM',
		},
		insonia_leve_moderada_g47_0: {
			title: 'Insonia Leve Moderada G47 0',
			symptoms: 'Dificuldade para iniciar ou manter o sono, despertar precoce.',
			tips: '\\nNão aplicável',
		},
		insuficiencia_venosa_cronica: {
			title: 'Insuficiencia Venosa Cronica',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		intoxicacao_alimentar_leve_t62_9_a05_9: {
			title: 'Intoxicacao Alimentar Leve T62 9 A05 9',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) METOCLOPRAMIDA 10mg IM (se náusea ou vômito ativo)',
		},
		labirintite_h81_0: {
			title: 'Labirintite H81 0',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
		},
		larva_migrans_1: {
			title: 'Larva Migrans 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		larva_migrans_2: {
			title: 'Larva Migrans 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		larva_migrans_criancas: {
			title: 'Larva Migrans Criancas',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		mastalgia_1: {
			title: 'Mastalgia 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		molusco_contagioso_b08_1: {
			title: 'Molusco Contagioso B08 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se dor local)\\nEncaminhar para dermatologia se lesões extensas ou infeccionadas<br><br>\\nOrientar conduta expectante (resolução espontânea em 6 a 12 meses)\\nEvitar manipulação das lesões e compartilhar toalhas/objetos\\n\\n',
		},
		nauseas_e_vomitos_1_gestantes: {
			title: 'Nauseas E Vomitos 1 Gestantes',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		nauseas_e_vomitos_severos_3: {
			title: 'Nauseas E Vomitos Severos 3',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		nefrolitiase_colica_renal_n20_0: {
			title: 'Nefrolitiase Colica Renal N20 0',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA + ESCOPOLAMINA 1AMP , ONDANSETRONA 01 AMP EM 100ML DE SF 0,9%\\n2) REAVALIAR EM 1H',
		},
		onicomicose_1_maos_tinea_ungueum: {
			title: 'Onicomicose 1 Maos Tinea Ungueum',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		onicomicose_2_maos_tinea_ungueum: {
			title: 'Onicomicose 2 Maos Tinea Ungueum',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		onicomicose_3_pes: {
			title: 'Onicomicose 3 Pes',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		onicomicose_4_pes: {
			title: 'Onicomicose 4 Pes',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		osteoporose_1: {
			title: 'Osteoporose 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		osteoporose_2: {
			title: 'Osteoporose 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		osteoporose_3: {
			title: 'Osteoporose 3',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		otite_externa_h60_3: {
			title: 'Otite Externa H60 3',
			symptoms: 'Otalgia, febre, irritabilidade, hipoacusia, abaulamento de membrana timpânica.',
			tips: '\\n1) DIPIRONA + DECADRON 1AMP CADA IM',
		},
		otite_media_aguda_h66_0: {
			title: 'Otite Media Aguda H66 0',
			symptoms: 'Otalgia, febre, irritabilidade, hipoacusia, abaulamento de membrana timpânica.',
			tips: '\\n1) DIPIRONA + DECADRON 1AMP CADA IM',
		},
		otite_media_cefuroxima: {
			title: 'Otite Media Cefuroxima',
			symptoms: 'Otalgia, febre, irritabilidade, hipoacusia, abaulamento de membrana timpânica.',
			tips: 'Retornar se os sintomas piorarem, mesmo com medicamentos.\\n- Febre persistente por mais de 48h: temperatura acima de 37,8°C.\\n- Piora do quadro por 72 horas, mesmo com uso de antibióticos.\\n\\n- INTERNAÇÃO HOSPITALAR\\n\\n- Indicada na presença de complicações como otomastoidite, complicações intracranianas, sepse ou otalgia resistente à antibioticoterapia.<br><br>INTERNAÇÃO HOSPITALAR\\n\\n- Indicada na presença de complicações como otomastoidite, complicações intracranianas, sepse ou otalgia resistente à antibioticoterapia.',
		},
		oxiuriase_1: {
			title: 'Oxiuriase 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		oxiuriase_criancas_2: {
			title: 'Oxiuriase Criancas 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
		},
		pediculose_crianca_2_anos: {
			title: 'Pediculose Crianca 2 Anos',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		pediculose_pubiana: {
			title: 'Pediculose Pubiana',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		pep_profilaxia_pos_exposicao_sexual_z20_2: {
			title: 'Pep Profilaxia Pos Exposicao Sexual Z20 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se dor associada)\\n2) Início imediato do esquema acima, se disponível',
		},
		picada_de_inseto_com_reacao_inflamatoria_local_t63_4_l50_9: {
			title: 'Picada De Inseto Com Reacao Inflamatoria Local T63 4 L50 9',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) HIDROCORTISONA 100mg IM + DIPIRONA 1g IM',
		},
		pneumonias_pneumonia_broncopneumonia_bcp_j18_9: {
			title: 'Pneumonias Pneumonia Broncopneumonia Bcp J18 9',
			symptoms: 'Tosse com expectoração, febre, dispneia, dor torácica ventilatório-dependente.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		pre_natal_vitaminas: {
			title: 'Pre Natal Vitaminas',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		prostatite: {
			title: 'Prostatite',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		psoriase_leve_l40_0: {
			title: 'Psoriase Leve L40 0',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se dor associada intensa)',
		},
		ptiriase_versicolor: {
			title: 'Ptiriase Versicolor',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		queimadura_solar_leve_l55_0: {
			title: 'Queimadura Solar Leve L55 0',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM\\n2) ORIENTAR medidas de hidratação e proteção solar',
		},
		rinite_alergica_j30_9: {
			title: 'Rinite Alergica J30 9',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DEXCLORFENIRAMINA 5mg IM (se crise alérgica intensa)',
		},
		sangramento_uterino: {
			title: 'Sangramento Uterino',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		sifilis_penicilina_benzatina: {
			title: 'Sifilis Penicilina Benzatina',
			symptoms: 'Cancro duro (primária), manchas avermelhadas (secundária), gomas/neurosífilis (terciária).',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		sindrome_ansiosa_crise_de_ansiedade_leve_f41_0: {
			title: 'Sindrome Ansiosa Crise De Ansiedade Leve F41 0',
			symptoms: 'Inquietação, taquicardia, sudorese, tremores, sensação de morte iminente.',
			tips: '\\n1) DIAZEPAM 5mg IM (se crise aguda com agitação)',
		},
		sindrome_dispeptica: {
			title: 'Sindrome Dispeptica',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		sindrome_gripal_viral_simples_j11_1: {
			title: 'Sindrome Gripal Viral Simples J11 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM + ORIENTAR repouso e hidratação oral',
		},
		sinusite_aguda_j01_9: {
			title: 'Sinusite Aguda J01 9',
			symptoms: 'Cefaleia frontal, congestão nasal, rinorreia purulenta, tosse, halitose.',
			tips: '\\n1) DIPIRONA 1g IM + LAVAGEM NASAL com SF 0,9%',
		},
		teniase: {
			title: 'Teniase',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFerver e/ou filtrar toda a água a ser consumida em casa.\\nNão ingerir bebidas alcoólicas no dia do tratamento e no dia seguinte.',
		},
		tetano_conduta_para_ferimentos_a35: {
			title: 'Tetano Conduta Para Ferimentos A35',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nEncaminhar para continuidade da vacinação no posto\\nAvaliar antibioticoterapia se sinais de infecção local.<br><br>\\n1) LIMPEZA E DEBRIDAMENTO da ferida com SF 0,9% + PVPI\\n2) VACINA dT IM (se esquema vacinal incompleto ou desconhecido)\\n3) IMUNOGLOBULINA ANTITETÂNICA IM (se ferimento de alto risco e esquema vacinal incerto)\\n\\n',
		},
		tinea_micose_de_pele_ou_couro_cabeludo_b35_0_b35_4: {
			title: 'Tinea Micose De Pele Ou Couro Cabeludo B35 0 B35 4',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se prurido ou dor local intensa)',
		},
		tonsilite: {
			title: 'Tonsilite',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		tonsilite_2: {
			title: 'Tonsilite 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		tonsilite_criancas_1: {
			title: 'Tonsilite Criancas 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		tonsilite_criancas_2: {
			title: 'Tonsilite Criancas 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		tosse_seca_persistente_r05: {
			title: 'Tosse Seca Persistente R05',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) DIPIRONA 1g IM (se dor torácica associada à tosse)',
		},
		tricomoniase: {
			title: 'Tricomoniase',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
		},
		tricomoniase_2: {
			title: 'Tricomoniase 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nNão ingerir bebidas alcoólicas até 4 dias após o tratamento com secnidazol e manter abstinência sexual até o término do tratamento com o gel vaginal.',
		},
		ulcera_peptica_duodenal: {
			title: 'Ulcera Peptica Duodenal',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		urticaria: {
			title: 'Urticaria',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		urticaria_aguda_l50_9: {
			title: 'Urticaria Aguda L50 9',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) HIDROCORTISONA 100mg IM + DEXCLORFENIRAMINA 5mg IM',
		},
		urticaria_criancas: {
			title: 'Urticaria Criancas',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		vacinacao_antitetanica_a35: {
			title: 'Vacinacao Antitetanica A35',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\n1) AVALIAR ESQUEMA VACINAL do paciente (3 doses básicas + reforços)\\n2) dT IM (Vacina dupla adulto)\\n   Aplicar em caso de ferimentos com risco ou calendário desatualizado\\n3) IMUNOGLOBULINA ANTITETÂNICA IM\\n   Aplicar se ferimento de risco + vacinação incompleta/desconhecida\\n\\n',
		},
		vaginite_mista: {
			title: 'Vaginite Mista',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		vaginose_bacteriana: {
			title: 'Vaginose Bacteriana',
			symptoms: 'Corrimento branco-acinzentado, odor fétido (peixe podre), sem inflamação exuberante.',
			tips: '\\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
		},
		vaginose_bacteriana_2: {
			title: 'Vaginose Bacteriana 2',
			symptoms: 'Corrimento branco-acinzentado, odor fétido (peixe podre), sem inflamação exuberante.',
			tips: '\\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
		},
		vaginose_bacteriana_3: {
			title: 'Vaginose Bacteriana 3',
			symptoms: 'Corrimento branco-acinzentado, odor fétido (peixe podre), sem inflamação exuberante.',
			tips: '\\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
		},
		varizes_dos_membros_inferiores_i83_9: {
			title: 'Varizes Dos Membros Inferiores I83 9',
			symptoms: 'Veias dilatadas e tortuosas, dor em peso, edema, cansaço nas pernas.',
			tips: '\\n1) DIPIRONA 1g IM (se dor local intensa)',
		},
		vermifugo_amplo_espectro_1: {
			title: 'Vermifugo Amplo Espectro 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFerver e/ou filtrar toda a água a ser consumida em casa',
		},
		vermifugo_amplo_espectro_2: {
			title: 'Vermifugo Amplo Espectro 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFerver e/ou filtrar toda a água a ser consumida em casa.',
		},
		vermifugo_amplo_espectro_3: {
			title: 'Vermifugo Amplo Espectro 3',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFerver e/ou filtrar toda a água a ser consumida em casa.',
		},
		vermifugo_criancas_1: {
			title: 'Vermifugo Criancas 1',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
		},
		vermifugo_criancas_2: {
			title: 'Vermifugo Criancas 2',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
		},
		vermifugo_criancas_3: {
			title: 'Vermifugo Criancas 3',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: '\\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
		},
		vertigem_1: {
			title: 'Vertigem 1',
			symptoms: 'Sensação de rotação do ambiente ou do próprio corpo, náuseas, desequilíbrio.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		vertigem_aguda: {
			title: 'Vertigem Aguda',
			symptoms: 'Sensação de rotação do ambiente ou do próprio corpo, náuseas, desequilíbrio.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
		virose_criancas: {
			title: 'Virose Criancas',
			symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
			tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
		},
	};

	// ============================================
	// FUNÇÕES UTILITÁRIAS
	// ============================================

	/**
	 * Retorna metadata de um hotstring específico
	 */
	function getMetadata(key) {
		return psf_metadata[key] || null;
	}

	/**
	 * Busca metadados por termo (título, sintomas ou dicas)
	 */
	function buscarMetadata(termo) {
		termo = termo.toLowerCase();
		const resultados = [];

		Object.keys(psf_metadata).forEach((key) => {
			const meta = psf_metadata[key];

			if (key.toLowerCase().includes(termo) || meta.title.toLowerCase().includes(termo) || meta.symptoms.toLowerCase().includes(termo) || meta.tips.toLowerCase().includes(termo)) {
				resultados.push({
					key: key,
					...meta,
				});
			}
		});

		return resultados;
	}

	/**
	 * Retorna todos os metadados
	 */
	function getTodosMetadata() {
		return psf_metadata;
	}

	/**
	 * Lista todas as chaves disponíveis
	 */
	function getChaves() {
		return Object.keys(psf_metadata).sort();
	}

	/**
	 * Agrupa metadados por categoria (baseado em padrões no nome)
	 */
	function porCategoria(categoria) {
		categoria = categoria.toLowerCase();
		const resultados = {};

		Object.keys(psf_metadata).forEach((key) => {
			if (key.toLowerCase().includes(categoria)) {
				resultados[key] = psf_metadata[key];
			}
		});

		return resultados;
	}

	/**
	 * Busca por sintoma específico
	 */
	function porSintoma(sintoma) {
		sintoma = sintoma.toLowerCase();
		const resultados = [];

		Object.keys(psf_metadata).forEach((key) => {
			const meta = psf_metadata[key];

			if (meta.symptoms.toLowerCase().includes(sintoma)) {
				resultados.push({
					key: key,
					...meta,
				});
			}
		});

		return resultados;
	}

	/**
	 * Retorna dados combinados (hotstring + metadata)
	 * Requer que HotstringsModule já esteja carregado
	 */
	function getCombinado(key) {
		const metadata = getMetadata(key);
		if (!metadata) return null;

		const hotstring = window.HotstringsModule?.get(key);

		return {
			key: key,
			...metadata,
			prescription: hotstring || null,
		};
	}

	/**
	 * Estatísticas
	 */
	function getEstatisticas() {
		const total = Object.keys(psf_metadata).length;

		// Conta metadados com tips customizados
		let tipsCustomizados = 0;
		Object.values(psf_metadata).forEach((meta) => {
			if (!meta.tips.includes('Seguir conduta médica padrão')) {
				tipsCustomizados++;
			}
		});

		return {
			total: total,
			comTipsCustomizados: tipsCustomizados,
			titulosUnicos: new Set(Object.values(psf_metadata).map((m) => m.title)).size,
		};
	}

	// ============================================
	// COMPATIBILIDADE COM CÓDIGO ANTIGO
	// ============================================
	window.psf_metadata = psf_metadata;

	// ============================================
	// EXPÕE API GLOBAL
	// ============================================
	window.HotstringsMetadataModule = {
		// Dados
		data: psf_metadata,

		// Funções
		get: getMetadata,
		buscar: buscarMetadata,
		getTodos: getTodosMetadata,
		getChaves: getChaves,
		porCategoria: porCategoria,
		porSintoma: porSintoma,
		getCombinado: getCombinado,
		getEstatisticas: getEstatisticas,
	};

	console.log('✅ Hotstrings Metadata Module carregado:', window.HotstringsMetadataModule.getEstatisticas());
})();

const psf_metadata = {
	abscesso_furunculo: {
		title: 'Abscesso Furunculo',
		symptoms: 'Tumoração dolorosa, eritema, calor local, flutuação.',
		tips: '\\nDrenagem (se flutuação ou se julgar necessário) + analgesia com Dipirona 01 amp IM',
	},
	aftas: {
		title: 'Aftas',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	amenorreia_secundaria: {
		title: 'Amenorreia Secundaria',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	amigdalite_j03_9: {
		title: 'Amigdalite J03 9',
		symptoms: 'Dor de garganta, febre, disfagia, hiperemia tonsilar, exsudato purulento.',
		tips: '\\nPenicilina G benzatina 1.2M UI IM dose única + sintomáticos pra casa',
	},
	anemia_crianca: {
		title: 'Anemia Crianca',
		symptoms: 'Palidez cutâneo-mucosa, fadiga, astenia, taquicardia, dispneia aos esforços.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	anemia_ferropriva_sintomatica_d50_0: {
		title: 'Anemia Ferropriva Sintomatica D50 0',
		symptoms: 'Palidez cutâneo-mucosa, fadiga, astenia, taquicardia, dispneia aos esforços.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	asma: {
		title: 'Asma',
		symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	asma_aguda_leve_moderada_j45_0: {
		title: 'Asma Aguda Leve Moderada J45 0',
		symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	asma_crianca_1: {
		title: 'Asma Crianca 1',
		symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	asma_crianca_2: {
		title: 'Asma Crianca 2',
		symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	asma_crianca_3: {
		title: 'Asma Crianca 3',
		symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	asma_crise_aguda: {
		title: 'Asma Crise Aguda',
		symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	asma_crise_aguda_2: {
		title: 'Asma Crise Aguda 2',
		symptoms: 'Dispneia, sibilância, tosse seca, opressão torácica.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	candidiase_vaginal_corrimento: {
		title: 'Candidiase Vaginal Corrimento',
		symptoms: 'Prurido vulvovaginal, corrimento branco grumoso, disúria, dispareunia.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	cefaleia_tensional_cefaleia_dor_de_cabeca_g44_2: {
		title: 'Cefaleia Tensional Cefaleia Dor De Cabeca G44 2',
		symptoms: 'Dor de cabeça (pressão, pulsátil), fotofobia, fonofobia, náuseas.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	cerume_impactado: {
		title: 'Cerume Impactado',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	cervicite_e_uretrite: {
		title: 'Cervicite E Uretrite',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	cinetose: {
		title: 'Cinetose',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	colelitiase: {
		title: 'Colelitiase',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	colica_biliar_litiase_biliar_pedra_nos_rins_k80_2: {
		title: 'Colica Biliar Litiase Biliar Pedra Nos Rins K80 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) Dipirona 01 amp + Buscopan Composto 01 amp em SF 0,9% 100 mL EV\\n   SE PERSISTIR, REPETIR MAIS UMA RODADA DA PRESCRIÇÃO ACIMA. SE MESMO ASSIM PERSISTIR:\\n1) TRAMADOL 1 AMP EM SF 0,9% 100ML EV',
	},
	conjuntivite_h10_9: {
		title: 'Conjuntivite H10 9',
		symptoms: 'Olhos vermelhos, prurido, lacrimejamento, secreção, sensação de areia nos olhos.',
		tips: '\\n1) Fazer compressas frias por 20 minutos no olho afetado\\n2) Evitar coçar os olhos e não usar soro fisiológico para lavar\\n3) Suspender o uso de lentes de contato durante o tratamento',
	},
	constipacao_funcional_k59_0: {
		title: 'Constipacao Funcional K59 0',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFOSFATO DE SÓDIO (FLEET ENEMA) Aplicar 01 enema por via retal, dose única.<br><br>\\n1) Aumentar a ingestão de água (mínimo 2L/dia)\\n2) Aumentar fibras (frutas, verduras e cereais integrais)\\n3) Praticar atividade física regular\\n4) Evitar segurar vontade de evacuar\\n\\n',
	},
	crise_convulsiva_epilepsia_g40_9: {
		title: 'Crise Convulsiva Epilepsia G40 9',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIAZEPAM 10mg (retal ou EV)\\n   Administrar 01 ampola via retal ou EV, dose única\\n2) OXIGÊNIO\\n   Administrar com máscara, se saturação < 94%\\n\\n',
	},
	crise_hipertensiva_i10_r03_0: {
		title: 'Crise Hipertensiva I10 R03 0',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) CAPTOPRIL 25mg SL\\n   Administrar 01 cp sublingual, monitorar PA a cada 15 min\\n\\n<br><br>\\n1) Manter uso correto dos anti-hipertensivos\\n2) Retorno com clínico ou cardiologista para ajuste medicamentoso',
	},
	dengue: {
		title: 'Dengue',
		symptoms: 'Febre alta súbita, cefaleia, dor retro-orbital, mialgia, artralgia, prostração, exantema.',
		tips: 'INTERNAÇÃO HOSPITALAR\\n\\n- Pacientes com sinais de alarme (grupo C) devem ser internados em hospital.\\n- Pacientes em estado grave com sinais de choque (grupo D) devem ser encaminhados à terapia intensiva.\\n- Internação é indicada também nas seguintes situações: recusa ou incapacidade de ingerir líquidos e alimentos; impossibilidade de acompanhamento ou retorno à unidade de saúde; descompensação de doença grave; plaquetas < 20.000/mm3.',
	},
	dengue_a90: {
		title: 'Dengue A90',
		symptoms: 'Febre alta súbita, cefaleia, dor retro-orbital, mialgia, artralgia, prostração, exantema.',
		tips: '\\n1) Dipirona 01 amp + Ondansetrona 01 amp em SF 0,9% 250 mL EV<br><br>\\nNão usar anti-inflamatórios (ibuprofeno, diclofenaco, cetoprofeno, nimesulida, etc)\\nHidratação vigorosa (mínimo 80 mL/kg/dia)\\nAlimentação leve (caldos, sucos, água de côco). Não tomar refrigerantes, sucos artificiais, gorduras como salgadinho e alimentos pesados.\\nRetorno se: sangramentos, dor abdominal intensa, vômitos persistentes ou sonolência\\nSe febre persistir mesmo com dipirona, intercalar com paracetamol\\n\\n',
	},
	dermatite_de_contato_reacao_alergica_leve_l23_9: {
		title: 'Dermatite De Contato Reacao Alergica Leve L23 9',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dermatite_seborreica_leve_l21_0: {
		title: 'Dermatite Seborreica Leve L21 0',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se queixa de dor ou prurido intenso)',
	},
	dermatofitose_interdigital_pe_de_atleta_b35_3: {
		title: 'Dermatofitose Interdigital Pe De Atleta B35 3',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se dor local intensa)<br><br>\\n→ Manter pés secos e arejados\\n→ Trocar meias diariamente\\n\\n',
	},
	dip_1: {
		title: 'Dip 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dip_2_comprometimento_sistemico: {
		title: 'Dip 2 Comprometimento Sistemico',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dismenorreia_1: {
		title: 'Dismenorreia 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dismenorreia_2: {
		title: 'Dismenorreia 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dispepsia_funcional_1: {
		title: 'Dispepsia Funcional 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dispesia_funcional_2: {
		title: 'Dispesia Funcional 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dor_muscular_lombalgia_algia_m54_5: {
		title: 'Dor Muscular Lombalgia Algia M54 5',
		symptoms: 'Dor na região lombar, rigidez, irradiação para glúteos ou coxas.',
		tips: '\\n1) DIPIRONA 1g IM + DICLOFENACO 75mg IM, dose única',
	},
	dorsalgia_1: {
		title: 'Dorsalgia 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dorsalgia_2: {
		title: 'Dorsalgia 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dorsalgia_3: {
		title: 'Dorsalgia 3',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dorsalgia_intensa: {
		title: 'Dorsalgia Intensa',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	dpoc_em_exacerbacao_j44_1: {
		title: 'Dpoc Em Exacerbacao J44 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) Inalação com 5 gotas de Fenoterol + 5 gotas de Brometo de Ipratrópio em 5 mL de SF 0,9%\\n2) Hidrocortisona 100mg EV ou IM',
	},
	enterobiase_infestacao_por_oxiuros_b80: {
		title: 'Enterobiase Infestacao Por Oxiuros B80',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se prurido anal intenso)<br><br>\\nLavar roupas de cama e higiene pessoal\\nTratar todos os contatos domiciliares\\n\\n',
	},
	enxaqueca_migranea_g43_9: {
		title: 'Enxaqueca Migranea G43 9',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM + DECADRON 4mg IM + ONDANSETRONA 01 amp IM',
	},
	erispela: {
		title: 'Erispela',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM + CEFTRIAXONA 1g IM',
	},
	escabiose_sarna_b86: {
		title: 'Escabiose Sarna B86',
		symptoms: 'Prurido intenso (pior à noite), pápulas escoriadas, túneis na pele.',
		tips: '\\n1) DIPIRONA 1g IM (se prurido generalizado intenso)',
	},
	escoriacoes_feridas_leves_s00_8: {
		title: 'Escoriacoes Feridas Leves S00 8',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM, dose única para analgesia local',
	},
	faringite_viral_faringoamigdalite_viral_j02_9: {
		title: 'Faringite Viral Faringoamigdalite Viral J02 9',
		symptoms: 'Dor de garganta, febre, disfagia, hiperemia tonsilar, exsudato purulento.',
		tips: '\\n1) DIPIRONA 1g IM + ORIENTAR repouso, hidratação e evitar antibiótico desnecessário',
	},
	foliculite: {
		title: 'Foliculite',
		symptoms: 'Pústulas ou pápulas eritematosas ao redor do folículo piloso, prurido leve.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	gases_em_bebes: {
		title: 'Gases Em Bebes',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	gastrite_drge_dispepsia_dor_no_estomago_k29_7_k21_9_k30: {
		title: 'Gastrite Drge Dispepsia Dor No Estomago K29 7 K21 9 K30',
		symptoms: 'Dor epigástrica, queimação, náuseas, plenitude pós-prandial.',
		tips: '\\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
	},
	geca_gastroenterite_aguda_a09: {
		title: 'Geca Gastroenterite Aguda A09',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
	},
	gota_1_crise: {
		title: 'Gota 1 Crise',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	gota_2_crise: {
		title: 'Gota 2 Crise',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	gota_3_crise: {
		title: 'Gota 3 Crise',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	gota_4_controle: {
		title: 'Gota 4 Controle',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	h_pylori_1: {
		title: 'H Pylori 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	h_pylori_2_alergia_a_amoxicilina: {
		title: 'H Pylori 2 Alergia A Amoxicilina',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	hemorragia_nasal_epistaxe_leve_r04_0: {
		title: 'Hemorragia Nasal Epistaxe Leve R04 0',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) Compressão com algodão embebido em SF gelado + NAFAZOLINA spray',
	},
	hemorroida_i84_9: {
		title: 'Hemorroida I84 9',
		symptoms: 'Sangramento ao evacuar, dor anal, prolapso, prurido.',
		tips: '\\n1) DIPIRONA 1g IM + DECADRON 4mg IM',
	},
	herpes_simples_b00_9: {
		title: 'Herpes Simples B00 9',
		symptoms: 'Vesículas agrupadas sobre base eritematosa, dor, ardor, prurido local.',
		tips: '\\n1) DIPIRONA 1g IM (se dor intensa local)',
	},
	hiperglicemia_descompensacao_do_dm2_e11_9: {
		title: 'Hiperglicemia Descompensacao Do Dm2 E11 9',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se queixa de dor)\\n2) SF 0,9% EV em 500 mL (caso de desidratação moderada)\\n3) investigar causas secundárias ou aderência do paciente ao tratamento',
	},
	hiperplasia_prostata_1: {
		title: 'Hiperplasia Prostata 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	hiperplasia_prostata_2: {
		title: 'Hiperplasia Prostata 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	hiperplasia_prostata_3: {
		title: 'Hiperplasia Prostata 3',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	hiperplasia_prostata_4: {
		title: 'Hiperplasia Prostata 4',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	hiperplasia_prostata_5: {
		title: 'Hiperplasia Prostata 5',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	hipertensao_arterial_descompensada_i10: {
		title: 'Hipertensao Arterial Descompensada I10',
		symptoms: 'Geralmente assintomática. Cefaleia nucal, tontura, escotomas em crises.',
		tips: '\\n1) CAPTOPRIL 25mg VO + DIPIRONA 1g IM\\n2) FUROSEMIDA 40mg tomar 01 cp via oral se houver congestão ou edema (avaliar se paciente é renal)\\n3) retorno em 1h para reavaliar',
	},
	hipertireoidismo_1: {
		title: 'Hipertireoidismo 1',
		symptoms: 'Perda de peso, intolerância ao calor, tremores, palpitações, insônia.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	hipertireoidismo_2: {
		title: 'Hipertireoidismo 2',
		symptoms: 'Perda de peso, intolerância ao calor, tremores, palpitações, insônia.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	hipoglicemia_sintomatica_e16_2: {
		title: 'Hipoglicemia Sintomatica E16 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) GLICOSE 50% EV (01 ampola 20mL) em infundido lento (10-15min) diluída em 100mL de SF 0,9% EV (se paciente sintomático - tremores, queda de nível de consciência, sudorese).',
	},
	hipotireoidismo: {
		title: 'Hipotireoidismo',
		symptoms: 'Ganho de peso, intolerância ao frio, pele seca, constipação, astenia.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	impetigo_l01_0: {
		title: 'Impetigo L01 0',
		symptoms: 'Lesões vesico-pustulosas que rompem e formam crostas melicéricas.',
		tips: '\\n1) DIPIRONA 1g IM (se dor local)',
	},
	impetigo_ou_ectima: {
		title: 'Impetigo Ou Ectima',
		symptoms: 'Lesões vesico-pustulosas que rompem e formam crostas melicéricas.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	impetigo_ou_ectima_2: {
		title: 'Impetigo Ou Ectima 2',
		symptoms: 'Lesões vesico-pustulosas que rompem e formam crostas melicéricas.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	infeccao_de_urina_itu_n39_0: {
		title: 'Infeccao De Urina Itu N39 0',
		symptoms: 'Disúria, polaciúria, urgência miccional, dor suprapúbica, febre (pielonefrite).',
		tips: '\\n1) DIPIRONA 1g IM + CEFTRIAXONA 1g IM',
	},
	insonia_leve_moderada_g47_0: {
		title: 'Insonia Leve Moderada G47 0',
		symptoms: 'Dificuldade para iniciar ou manter o sono, despertar precoce.',
		tips: '\\nNão aplicável',
	},
	insuficiencia_venosa_cronica: {
		title: 'Insuficiencia Venosa Cronica',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	intoxicacao_alimentar_leve_t62_9_a05_9: {
		title: 'Intoxicacao Alimentar Leve T62 9 A05 9',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) METOCLOPRAMIDA 10mg IM (se náusea ou vômito ativo)',
	},
	labirintite_h81_0: {
		title: 'Labirintite H81 0',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
	},
	larva_migrans_1: {
		title: 'Larva Migrans 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	larva_migrans_2: {
		title: 'Larva Migrans 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	larva_migrans_criancas: {
		title: 'Larva Migrans Criancas',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	mastalgia_1: {
		title: 'Mastalgia 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	molusco_contagioso_b08_1: {
		title: 'Molusco Contagioso B08 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se dor local)\\nEncaminhar para dermatologia se lesões extensas ou infeccionadas<br><br>\\nOrientar conduta expectante (resolução espontânea em 6 a 12 meses)\\nEvitar manipulação das lesões e compartilhar toalhas/objetos\\n\\n',
	},
	nauseas_e_vomitos_1_gestantes: {
		title: 'Nauseas E Vomitos 1 Gestantes',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	nauseas_e_vomitos_severos_3: {
		title: 'Nauseas E Vomitos Severos 3',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	nefrolitiase_colica_renal_n20_0: {
		title: 'Nefrolitiase Colica Renal N20 0',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA + ESCOPOLAMINA 1AMP , ONDANSETRONA 01 AMP EM 100ML DE SF 0,9%\\n2) REAVALIAR EM 1H',
	},
	onicomicose_1_maos_tinea_ungueum: {
		title: 'Onicomicose 1 Maos Tinea Ungueum',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	onicomicose_2_maos_tinea_ungueum: {
		title: 'Onicomicose 2 Maos Tinea Ungueum',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	onicomicose_3_pes: {
		title: 'Onicomicose 3 Pes',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	onicomicose_4_pes: {
		title: 'Onicomicose 4 Pes',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	osteoporose_1: {
		title: 'Osteoporose 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	osteoporose_2: {
		title: 'Osteoporose 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	osteoporose_3: {
		title: 'Osteoporose 3',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	otite_externa_h60_3: {
		title: 'Otite Externa H60 3',
		symptoms: 'Otalgia, febre, irritabilidade, hipoacusia, abaulamento de membrana timpânica.',
		tips: '\\n1) DIPIRONA + DECADRON 1AMP CADA IM',
	},
	otite_media_aguda_h66_0: {
		title: 'Otite Media Aguda H66 0',
		symptoms: 'Otalgia, febre, irritabilidade, hipoacusia, abaulamento de membrana timpânica.',
		tips: '\\n1) DIPIRONA + DECADRON 1AMP CADA IM',
	},
	otite_media_cefuroxima: {
		title: 'Otite Media Cefuroxima',
		symptoms: 'Otalgia, febre, irritabilidade, hipoacusia, abaulamento de membrana timpânica.',
		tips: 'Retornar se os sintomas piorarem, mesmo com medicamentos.\\n- Febre persistente por mais de 48h: temperatura acima de 37,8°C.\\n- Piora do quadro por 72 horas, mesmo com uso de antibióticos.\\n\\n- INTERNAÇÃO HOSPITALAR\\n\\n- Indicada na presença de complicações como otomastoidite, complicações intracranianas, sepse ou otalgia resistente à antibioticoterapia.<br><br>INTERNAÇÃO HOSPITALAR\\n\\n- Indicada na presença de complicações como otomastoidite, complicações intracranianas, sepse ou otalgia resistente à antibioticoterapia.',
	},
	oxiuriase_1: {
		title: 'Oxiuriase 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	oxiuriase_criancas_2: {
		title: 'Oxiuriase Criancas 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
	},
	pediculose_crianca_2_anos: {
		title: 'Pediculose Crianca 2 Anos',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	pediculose_pubiana: {
		title: 'Pediculose Pubiana',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	pep_profilaxia_pos_exposicao_sexual_z20_2: {
		title: 'Pep Profilaxia Pos Exposicao Sexual Z20 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se dor associada)\\n2) Início imediato do esquema acima, se disponível',
	},
	picada_de_inseto_com_reacao_inflamatoria_local_t63_4_l50_9: {
		title: 'Picada De Inseto Com Reacao Inflamatoria Local T63 4 L50 9',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) HIDROCORTISONA 100mg IM + DIPIRONA 1g IM',
	},
	pneumonias_pneumonia_broncopneumonia_bcp_j18_9: {
		title: 'Pneumonias Pneumonia Broncopneumonia Bcp J18 9',
		symptoms: 'Tosse com expectoração, febre, dispneia, dor torácica ventilatório-dependente.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	pre_natal_vitaminas: {
		title: 'Pre Natal Vitaminas',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	prostatite: {
		title: 'Prostatite',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	psoriase_leve_l40_0: {
		title: 'Psoriase Leve L40 0',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se dor associada intensa)',
	},
	ptiriase_versicolor: {
		title: 'Ptiriase Versicolor',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	queimadura_solar_leve_l55_0: {
		title: 'Queimadura Solar Leve L55 0',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM\\n2) ORIENTAR medidas de hidratação e proteção solar',
	},
	rinite_alergica_j30_9: {
		title: 'Rinite Alergica J30 9',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DEXCLORFENIRAMINA 5mg IM (se crise alérgica intensa)',
	},
	sangramento_uterino: {
		title: 'Sangramento Uterino',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	sifilis_penicilina_benzatina: {
		title: 'Sifilis Penicilina Benzatina',
		symptoms: 'Cancro duro (primária), manchas avermelhadas (secundária), gomas/neurosífilis (terciária).',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	sindrome_ansiosa_crise_de_ansiedade_leve_f41_0: {
		title: 'Sindrome Ansiosa Crise De Ansiedade Leve F41 0',
		symptoms: 'Inquietação, taquicardia, sudorese, tremores, sensação de morte iminente.',
		tips: '\\n1) DIAZEPAM 5mg IM (se crise aguda com agitação)',
	},
	sindrome_dispeptica: {
		title: 'Sindrome Dispeptica',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	sindrome_gripal_viral_simples_j11_1: {
		title: 'Sindrome Gripal Viral Simples J11 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM + ORIENTAR repouso e hidratação oral',
	},
	sinusite_aguda_j01_9: {
		title: 'Sinusite Aguda J01 9',
		symptoms: 'Cefaleia frontal, congestão nasal, rinorreia purulenta, tosse, halitose.',
		tips: '\\n1) DIPIRONA 1g IM + LAVAGEM NASAL com SF 0,9%',
	},
	teniase: {
		title: 'Teniase',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFerver e/ou filtrar toda a água a ser consumida em casa.\\nNão ingerir bebidas alcoólicas no dia do tratamento e no dia seguinte.',
	},
	tetano_conduta_para_ferimentos_a35: {
		title: 'Tetano Conduta Para Ferimentos A35',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nEncaminhar para continuidade da vacinação no posto\\nAvaliar antibioticoterapia se sinais de infecção local.<br><br>\\n1) LIMPEZA E DEBRIDAMENTO da ferida com SF 0,9% + PVPI\\n2) VACINA dT IM (se esquema vacinal incompleto ou desconhecido)\\n3) IMUNOGLOBULINA ANTITETÂNICA IM (se ferimento de alto risco e esquema vacinal incerto)\\n\\n',
	},
	tinea_micose_de_pele_ou_couro_cabeludo_b35_0_b35_4: {
		title: 'Tinea Micose De Pele Ou Couro Cabeludo B35 0 B35 4',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se prurido ou dor local intensa)',
	},
	tonsilite: {
		title: 'Tonsilite',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	tonsilite_2: {
		title: 'Tonsilite 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	tonsilite_criancas_1: {
		title: 'Tonsilite Criancas 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	tonsilite_criancas_2: {
		title: 'Tonsilite Criancas 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	tosse_seca_persistente_r05: {
		title: 'Tosse Seca Persistente R05',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) DIPIRONA 1g IM (se dor torácica associada à tosse)',
	},
	tricomoniase: {
		title: 'Tricomoniase',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
	},
	tricomoniase_2: {
		title: 'Tricomoniase 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nNão ingerir bebidas alcoólicas até 4 dias após o tratamento com secnidazol e manter abstinência sexual até o término do tratamento com o gel vaginal.',
	},
	ulcera_peptica_duodenal: {
		title: 'Ulcera Peptica Duodenal',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	urticaria: {
		title: 'Urticaria',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	urticaria_aguda_l50_9: {
		title: 'Urticaria Aguda L50 9',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) HIDROCORTISONA 100mg IM + DEXCLORFENIRAMINA 5mg IM',
	},
	urticaria_criancas: {
		title: 'Urticaria Criancas',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	vacinacao_antitetanica_a35: {
		title: 'Vacinacao Antitetanica A35',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\n1) AVALIAR ESQUEMA VACINAL do paciente (3 doses básicas + reforços)\\n2) dT IM (Vacina dupla adulto)\\n   Aplicar em caso de ferimentos com risco ou calendário desatualizado\\n3) IMUNOGLOBULINA ANTITETÂNICA IM\\n   Aplicar se ferimento de risco + vacinação incompleta/desconhecida\\n\\n',
	},
	vaginite_mista: {
		title: 'Vaginite Mista',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	vaginose_bacteriana: {
		title: 'Vaginose Bacteriana',
		symptoms: 'Corrimento branco-acinzentado, odor fétido (peixe podre), sem inflamação exuberante.',
		tips: '\\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
	},
	vaginose_bacteriana_2: {
		title: 'Vaginose Bacteriana 2',
		symptoms: 'Corrimento branco-acinzentado, odor fétido (peixe podre), sem inflamação exuberante.',
		tips: '\\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
	},
	vaginose_bacteriana_3: {
		title: 'Vaginose Bacteriana 3',
		symptoms: 'Corrimento branco-acinzentado, odor fétido (peixe podre), sem inflamação exuberante.',
		tips: '\\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
	},
	varizes_dos_membros_inferiores_i83_9: {
		title: 'Varizes Dos Membros Inferiores I83 9',
		symptoms: 'Veias dilatadas e tortuosas, dor em peso, edema, cansaço nas pernas.',
		tips: '\\n1) DIPIRONA 1g IM (se dor local intensa)',
	},
	vermifugo_amplo_espectro_1: {
		title: 'Vermifugo Amplo Espectro 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFerver e/ou filtrar toda a água a ser consumida em casa',
	},
	vermifugo_amplo_espectro_2: {
		title: 'Vermifugo Amplo Espectro 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFerver e/ou filtrar toda a água a ser consumida em casa.',
	},
	vermifugo_amplo_espectro_3: {
		title: 'Vermifugo Amplo Espectro 3',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFerver e/ou filtrar toda a água a ser consumida em casa.',
	},
	vermifugo_criancas_1: {
		title: 'Vermifugo Criancas 1',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
	},
	vermifugo_criancas_2: {
		title: 'Vermifugo Criancas 2',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
	},
	vermifugo_criancas_3: {
		title: 'Vermifugo Criancas 3',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: '\\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
	},
	vertigem_1: {
		title: 'Vertigem 1',
		symptoms: 'Sensação de rotação do ambiente ou do próprio corpo, náuseas, desequilíbrio.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	vertigem_aguda: {
		title: 'Vertigem Aguda',
		symptoms: 'Sensação de rotação do ambiente ou do próprio corpo, náuseas, desequilíbrio.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
	virose_criancas: {
		title: 'Virose Criancas',
		symptoms: 'Sinais e sintomas compatíveis com a hipótese diagnóstica. Avaliar quadro clínico.',
		tips: 'Seguir conduta médica padrão e avaliar critérios de gravidade.',
	},
};

if (typeof window !== 'undefined') window.psf_metadata = psf_metadata;
