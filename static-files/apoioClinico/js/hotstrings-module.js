// hotstrings-module.js
(() => {
	'use strict';

	// ============================================
	// BASE DE DADOS: HOTSTRINGS MÉDICOS
	// ============================================
	const psf_hotstrings = {
		abscesso_furunculo:
			'CEFALEXINA 500mg\n   Tomar 01 cp via oral de 6/6h por 10 dias\n   **Ou**\nCLINDAMICINA 300mg\n   Tomar 01 cp via oral de 8/8h por 10 dias\nIBUPROFENO 300mg\n   Tomar 01 cp via oral de 12/12h por 05 dias\nDIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n\n**USO TÓPICO**\nMUPIROCINA 20mg/g\nAplicar em região afetada 3x ao dia por 10 dias\n\n**NA UNIDADE:**\nDrenagem (se flutuação ou se julgar necessário) + analgesia com Dipirona 01 amp IM',
		aftas: 'Clorexidina 0,2% solução oral __________ 1 fr.\n   Fazer bochecho de 2 minutos, após higiene oral, duas vezes ao dia, por 10 dias.',
		amenorreia_secundaria: 'Medroxiprogesterona 10mg __________ 10 cp.\n   Tomar 1 cp, via oral, uma vez ao dia, por 10 dias, interromper o uso e retornar ao médico no 14º dia',
		amigdalite_j03_9:
			'AMOXICILINA + CLAVULANATO (500mg+125mg)\n   Tomar 01 cp via oral de 8/8h por 07 dias\nIBUPROFENO 300mg\n   Tomar 01 cp via oral de 12/12h por 05 dias\nDIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n\n**Na unidade:**\nPenicilina G benzatina 1.2M UI IM dose única + sintomáticos pra casa',
		anemia_crianca: 'Sulfato Ferroso 12,5mg Fe/2,5ml xarope\n   Tomar __ ml, via oral, duas vezes ao dia, por 90 dias.',
		anemia_ferropriva_sintomatica_d50_0: 'SULFATO FERROSO 120MG (COMPRIMIDO) __________ 1CX\n   TOMAR 1 CP VO DE 12/12H POR NO MÍNIMO 3 MESES',
		asma: 'Prednisona 20mg\n   Tomar 2 comprimidos, via oral, uma vez ao dia, pela manhã, por 5 dias.\n**Uso Externo:**\nSalbutamol+ Ipratrópio 120+20mcg/jato aerossol – 1 fr. (Combivent)\n   Aspirar 2 jatos, a cada 4 a 6 horas, por 5 dias.',
		asma_aguda_leve_moderada_j45_0:
			'1) PREDNISONA 20mg ——— 1 cx\n   Tomar 01 cp via oral de 12/12h por 05 dias\n2) SALBUTAMOL Xarope 2mg/5mL ——— 1 frasco\n   Tomar 5mL via oral de 8/8h por 05 dias (Opção comum para crianças ou adultos sem acesso ao inalador)\n\n**USO INALATÓRIO**\n1) SALBUTAMOL SPRAY 100mcg/jato\n   Inalar 2 jatos de 6/6h, por até 5 dias. Usar com espaçador.',
		asma_crianca_1: 'Prednisolona 3mg/ml xarope\n   Tomar __ ml, via oral, uma vez ao dia, pela manhã, por 5 dias.\n**Uso Externo:**\nSF 0,9% 3 ml + Fenoterol 5mg/ml __ gotas + Ipratrópio 0,25mg/ml __ gotas\n   Nebulizar a cada 6 horas, por 5 dias',
		asma_crianca_2: 'Prednisolona 3mg/ml xarope __________ 60 ml.\n   Tomar __ ml, via oral, uma vez ao dia, pela manhã, por 5 dias.\n**Uso Externo:**\nSalbutamol aerosol 100mcg/jato __________ 200 doses.\n   Aspirar 1 jato, a cada __ horas, por 5 dias.',
		asma_crianca_3: 'Salbutamol 2mg/5ml xarope __________ 120 ml.\n   Tomar 0,15mg/kg ml, via oral, a cada 8 horas, por 5 dias.\nPrednisolona 3mg/ml xarope __________ 60 ml.\n   Tomar __ ml, via oral, uma vez ao dia, pela manhã, por 5 dias.',
		asma_crise_aguda: 'Prednisona 20mg\n   Tomar 2 comprimidos, via oral, uma vez ao dia, pela manhã, por 5 dias.\n**Uso Externo:**\nSF 0,9% 3 ml + Fenoterol 5mg/ml 5 gotas + Ipratrópio 0,25mg/ml 30 gotas\n   Nebulizar a cada 6 horas, por 5 dias',
		asma_crise_aguda_2: 'Prednisona 20mg\n   Tomar 2 comprimidos, via oral, uma vez ao dia, pela manhã, por 5 dias.\n**Uso Externo:**\nSalbutamol aerosol 100mcg/jato __________ 200 doses.\n   Aspirar 2 jatos, a cada 4 horas, por 5 dias.',
		candidiase_vaginal_corrimento: '1) FLUCONAZOL 150mg\n   Tomar 01 cp via oral em dose única\n**USO TÓPICO**\n2) NISTATINA creme vaginal\n   Aplicar 01 aplicador por via vaginal à noite por 07 dias',
		cefaleia_tensional_cefaleia_dor_de_cabeca_g44_2: '1) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor\n2) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 12/12h por 05 dias',
		cerume_impactado: '**USO OTOLÓGICO**\n1) CERUMIN\n   Aplicar 05 gotas em ouvido afetado, manter posição deitada com o ouvido para cima por 05 minutos, de 8/8h por 05 dias',
		cervicite_e_uretrite:
			'Ciprofloxacino 500mg __________ 3 cp.\n   Tomar 1 cp, via oral, uma vez ao dia, por 3 dias.\nAzitromicina 500mg __________ 4 cp.\n   Tomar 2 cp, via oral, dose única. Repetir no parceiro.\n**Uso Externo:**\nCeftriaxona 250mg __________ 1 amp.\n   Aplicar 1 ampola, via intramuscular, dose única.',
		cinetose: 'Meclizina 25mg (Meclin) __________ 15 cp.\n   Tomar 1 comprimido, via oral, uma hora antes de viajar. Repetir após 12 horas, se necessário.',
		colelitiase: 'Ácido Ursodesoxicólico 300mg __________ 120 cp.\n   Tomar 1 cp, via oral, após o café da manhã e após o jantar, todos os dias.',
		colica_biliar_litiase_biliar_pedra_nos_rins_k80_2:
			'1) BUSCOPAN COMPOSTO\n   Tomar 01 cp via oral de 6/6h se dor abdominal ou febre\n2) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 12/12h por 05 dias\n3) TRAMADOL 50mg\n   Tomar 01 cp via oral de 8/8h se dor intensa e refratária a analgésicos comuns\n4) ONDANSETRONA 8mg\n   Tomar 01 cp via oral de 8/8h se náuseas ou vômitos\n\n**NA UNIDADE:**\n1) Dipirona 01 amp + Buscopan Composto 01 amp em SF 0,9% 100 mL EV\n   SE PERSISTIR, REPETIR MAIS UMA RODADA DA PRESCRIÇÃO ACIMA. SE MESMO ASSIM PERSISTIR:\n1) TRAMADOL 1 AMP EM SF 0,9% 100ML EV',
		conjuntivite_h10_9:
			'**USO OFTÁLMICO**\n1) TOBRAMICINA 0,3%\n   Aplicar 02 gotas no olho afetado de 6/6h por 05 dias\n\n**Orientações**\n1) Fazer compressas frias por 20 minutos no olho afetado\n2) Evitar coçar os olhos e não usar soro fisiológico para lavar\n3) Suspender o uso de lentes de contato durante o tratamento',
		constipacao_funcional_k59_0:
			'1) LACTULONA xarope\n   Tomar 15 mL via oral 1x ao dia. Pode aumentar até 30 mL/dia conforme resposta\n2) ÓLEO MINERAL\n   Tomar 15 mL via oral de 8/8h por até 07 dias se fezes endurecidas\n\n**Orientações**\n1) Aumentar a ingestão de água (mínimo 2L/dia)\n2) Aumentar fibras (frutas, verduras e cereais integrais)\n3) Praticar atividade física regular\n4) Evitar segurar vontade de evacuar\n\n**NA UNIDADE (SE NECESSÁRIO):**\nFOSFATO DE SÓDIO (FLEET ENEMA) Aplicar 01 enema por via retal, dose única.',
		crise_convulsiva_epilepsia_g40_9:
			'**Na unidade (se crise ativa ou pós-crise):**\n1) DIAZEPAM 10mg (retal ou EV)\n   Administrar 01 ampola via retal ou EV, dose única\n2) OXIGÊNIO\n   Administrar com máscara, se saturação < 94%\n\n**Uso Oral (pós-crise, se paciente não for epiléptico conhecido):**\n1) OBSERVAÇÃO E ENCAMINHAMENTO para neurologista (sem iniciar antiepiléptico sem histórico confirmado)',
		crise_hipertensiva_i10_r03_0:
			'1) CAPTOPRIL 25mg\n   Tomar 01 cp via oral. Repetir em 1h se pressão não reduzir\n2) FUROSEMIDA 40mg\n   Tomar 01 cp via oral, se houver congestão ou edema\n\n**Na unidade**\n1) CAPTOPRIL 25mg SL\n   Administrar 01 cp sublingual, monitorar PA a cada 15 min\n\n**Orientações**\n1) Manter uso correto dos anti-hipertensivos\n2) Retorno com clínico ou cardiologista para ajuste medicamentoso',
		dengue:
			'# Dengue - Grupo A e B (70kg)\n## MEDICAÇÕES PARA USO IMEDIATO\n\n Hidratação vigorosa: tomar 4 a 5 litros de líquidos por dia.\n - Soro de reidratação oral (SRO): Diluir 1 sachê em 1 litro de água.\n - Líquidos caseiros: água, suco de frutas, soro caseiro, chás, água de coco, entre outros.\n - Para fazer o soro caseiro deve-se misturar 1 litro de água com 1 colher de sopa bem cheia de açúcar (20 g) e 1 colher de café de sal (3,5 g).\n\n Dipirona 1g (Novalgina®) ou Paracetamol 500mg (Tylenol®)\n Tomar 1 comprimido via oral a cada 6 horas, se necessário, para dor ou febre (temperatura axilar acima de 37,8°C).\n\n Digesan® (Bromoprida) 10 mg ou Ondansetrona (Vonau®) 4 mg\n Tomar 1 comprimido a cada 8 horas, via oral, em caso de enjoo ou vômito.\n\n Loratadina 10 mg ou Fexofenadina 120 mg (Allegra®) ou Levocetirizina 5 mg (Zina®)\n - Tomar 1 comprimido cada 12 horas durante 5 días.\n\n- Eliminar focos de disseminação do mosquito Aedes aegypti.\n- Não use anti-inflamatórios como Nimesulida, Ibuprofeno, Diclofenaco, Cetoprofeno ou Naproxeno, entre outros.\n- Continue com os medicamentos de rotina.\n- Se você utiliza anticoagulantes (Rivaroxabana, Apixabana) ou antiagregantes (AAS, Clopidogrel), informe ao seu médico sobre a suspeita de dengue.\n\n- Retornar em caso de piora dos sintomas mesmo em uso de medicamentos\n- Dor abdominal intensa e contínua.\n- Vômito ou diarreia persistente.\n- Pressão baixa, tontura ou desmaios.\n- Sangramento ou manchas roxas na pele.\n\n- INTERNAÇÃO HOSPITALAR\n\n- Pacientes com sinais de alarme (grupo C) devem ser internados em hospital.\n- Pacientes em estado grave com sinais de choque (grupo D) devem ser encaminhados à terapia intensiva.\n- Internação é indicada também nas seguintes situações: recusa ou incapacidade de ingerir líquidos e alimentos; impossibilidade de acompanhamento ou retorno à unidade de saúde; descompensação de doença grave; plaquetas < 20.000/mm3.',
		dengue_a90:
			'1) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n2) ONDANSETRONA 8mg\n   Tomar 01 cp via oral de 8/8h se náuseas ou vômitos\n3) ENTEROGERMINA frasco\n   Tomar 01 frasco de 12/12h por 05 dias\n4) SRO\n   Diluir 01 sachê em 1L de água e beber ao longo do dia\n\n**Orientações**\nNão usar anti-inflamatórios (ibuprofeno, diclofenaco, cetoprofeno, nimesulida, etc)\nHidratação vigorosa (mínimo 80 mL/kg/dia)\nAlimentação leve (caldos, sucos, água de côco). Não tomar refrigerantes, sucos artificiais, gorduras como salgadinho e alimentos pesados.\nRetorno se: sangramentos, dor abdominal intensa, vômitos persistentes ou sonolência\nSe febre persistir mesmo com dipirona, intercalar com paracetamol\n\n**Na unidade**\n1) Dipirona 01 amp + Ondansetrona 01 amp em SF 0,9% 250 mL EV',
		dermatite_de_contato_reacao_alergica_leve_l23_9: '1) LORATADINA 10mg\n   Tomar 01 cp via oral à noite por 07 dias\n**USO TÓPICO**\n2) DEXCLORFENIRAMINA + BETAMETASONA creme\n   Aplicar fina camada na região afetada 2x ao dia por 07 dias',
		dermatite_seborreica_leve_l21_0:
			'**Uso Tópico**\n1) CETOCONAZOL shampoo 2%\n   Aplicar no couro cabeludo 3x por semana, deixar agir por 5 minutos e enxaguar, por 4 semanas\n2) HIDROCORTISONA creme 1%\n   Aplicar fina camada 2x/dia nas áreas acometidas por 5 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM (se queixa de dor ou prurido intenso)',
		dermatofitose_interdigital_pe_de_atleta_b35_3:
			'**Uso Tópico**\n1) CLOTRIMAZOL creme\n   Aplicar fina camada 2x/dia por 14 dias\n\n**Orientações**\n→ Manter pés secos e arejados\n→ Trocar meias diariamente\n\n**Na unidade**\n1) DIPIRONA 1g IM (se dor local intensa)',
		dip_1:
			'Metronidazol 250mg __________ 56 cp.\n   Tomar 2 cp, via oral, a cada 12 horas, 14 dias.\nDoxiciclina 100mg __________ 28 cp.\n   Tomar 1 cp, via oral, a cada 12 horas, 14 dias.\nAzitromicina 500mg __________ 2 cp.\n   Parceiro tomar 2 cp, via oral, em dose única.\n**Uso Externo:**\nCeftriaxona 250mg __________ 1 amp.\n   Aplicar 1 ampola, via intramuscular, dose única.',
		dip_2_comprometimento_sistemico:
			'Metronidazol 250mg __________ 56 cp.\n   Tomar 2 cp, via oral, a cada 12 horas, por 14 dias.\nDoxiciclina 100mg __________ 28 cp.\n   Tomar 1 cp, via oral, a cada 12 horas, por 14 dias.\nLevofloxacino 500mg __________ 14 cp.\n   Tomar 1 cp, via oral, uma vez ao dia, por 14 dias.\nAzitromicina 500mg __________ 2 cp.\n   Parceiro tomar 2 cp, via oral, em dose única.',
		dismenorreia_1: 'Ibuprofeno 600mg __________ 15 cp.\n   Tomar 1 cp, via oral, a cada 8 horas, por 5 dias.\nParacetamol+Codeína 500mg+30mg (Paco) __________ 12 cp.\n   Tomar 1 cp, via oral, a cada 8 horas, se dor forte',
		dismenorreia_2:
			'Emama 400mg __________ 60 cp.\n   Tomar 1 cp, via oral, uma vez ao dia, todos os dias, por 30 dias. Após, tomar 1 cp, via oral uma vez ao dia, por 7 dias, no período menstrual.\nIbuprofeno 600mg __________ 15 cp. Tomar 1 cp, via oral, a cada 8 horas, por 5 dias.',
		dispepsia_funcional_1:
			'Omeprazol 20mg __________ 28 cp.\n   Tomar 1 cápsula, via oral, em jejum, imediatamente antes do café da manhã, por 28 dias.\nDomperidona 10mg (Domperix) __________ 60 cp. Tomar 1 comprimido, via oral, três vezes ao dia, refeições, por 20 dias',
		dispesia_funcional_2:
			'Omeprazol 20mg __________ 28 cp.\n   Tomar 1 cápsula, via oral, em jejum, imediatamente antes do café da manhã, por 28 dias.\nBromoprida 4mg/ml solução oral gotas __________ 3 fr. Tomar 60 gotas, via oral, a cada 8 horas, por 14 dias.',
		dor_muscular_lombalgia_algia_m54_5:
			'1) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor\n2) DICLOFENACO SÓDICO 50mg\n   Tomar 01 cp via oral de 8/8h por 05 dias\n3) CICLOBENZAPRINA 10mg\n   Tomar 01 cp via oral 2h antes de dormir por 05 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM + DICLOFENACO 75mg IM, dose única',
		dorsalgia_1:
			'Nimesulida 50mg/ml gotas __________ 2 fr. Tomar 40 gotas, via oral, a cada 12 horas, por 6 dias.\nParacetamol 500mg __________ 20 cp. Tomar 1 cp, via oral, a cada 6 horas, por 5 dias.\nCiclobenzaprina 5mg __________ 10 cp. Tomar 1 cp, via oral, à noite, por 10 dias.\n**Uso Externo:**\nBetametasona 5+2mg/ml __________ 1 amp. Aplicar 1 ampola, via intramuscular, dose única.',
		dorsalgia_2:
			'Diclofenaco de Sódio 50mg __________ 15 cp. Tomar 1 cp, via oral, a cada 8 horas, por 5 dias.\nDipirona 500mg/ml solução oral gotas __________ 1 fr. Tomar 40 gotas, via oral, a cada 8 horas, por 3 dias.\n**Uso Externo:**\nDexametasona 4mg/2,5ml __________ 1 amp. Aplicar 1 ampola, via intramuscular, dose única.',
		dorsalgia_3:
			'Ibuprofeno 600mg __________ 15 cp. Tomar 1 cp, via oral, a cada 8 horas, por 5 dias.\nTramadol 50mg __________ 15 cp. Tomar 1 cp, via oral, a cada 8 horas, por 5 dias.\nCiclobenzaprina 5mg __________ 10 cp. Tomar 1 cp, via oral, à noite, por 10 dias.\n\n**Uso Externo:**\nDexalgen __________ 3 amp.\n   Aplicar 1 ampola, via intramuscular, a cada 3 dias, por 3 doses.',
		dorsalgia_intensa:
			'Bi-Profenid 150mg __________ 10cp. Tomar 1 cp, via oral, uma vez ao dia, por 10 dias.\nTramadol 50mg __________ 15 cp. Tomar 1 cp, via oral, a cada 8 horas, por 5 dias.\nMusculare 10mg __________ 15 cp. Tomar 1 cp, via oral, a cada 8 horas, por 5 dias.\n\n**Uso Externo:**\nDexalgen __________ 3 amp.\n   Aplicar 1 ampola, via intramuscular, a cada 3 dias, por 3 doses.',
		dpoc_em_exacerbacao_j44_1:
			'1) PREDNISONA 20mg\n   Tomar 01 cp via oral de 12/12h por 05 dias\n2) AZITROMICINA 500mg\n   Tomar 01 cp via oral 1x/dia por 05 dias\n\n**Inalatória (se disponível para casa):**\n3) SALBUTAMOL spray\n   Inalar 02 jatos de 6/6h com espaçador\n\n**Na unidade:**\n1) Inalação com 5 gotas de Fenoterol + 5 gotas de Brometo de Ipratrópio em 5 mL de SF 0,9%\n2) Hidrocortisona 100mg EV ou IM',
		enterobiase_infestacao_por_oxiuros_b80:
			'1) ALBENDAZOL 400mg\n   Tomar dose única via oral e repetir após 14 dias\n\n**Orientações**\nLavar roupas de cama e higiene pessoal\nTratar todos os contatos domiciliares\n\n**Na unidade**\n1) DIPIRONA 1g IM (se prurido anal intenso)',
		enxaqueca_migranea_g43_9:
			'1) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor\n2) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 12/12h por 05 dias\n3) NARATRIPTANA 2,5mg\n   Tomar 01 cp via oral ao sinal de dor intensa. Pode repetir em 4h se necessário. Máximo: 2 cp/dia\n\n**Na unidade**\n1) DIPIRONA 1g IM + DECADRON 4mg IM + ONDANSETRONA 01 amp IM',
		erispela:
			'1) CEFALEXINA 500mg\n   Tomar 01 cp via oral de 6/6h por 10 dias\n2) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n3) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 8/8h por 05 dias\n**Uso Tópico**\n4) NEOMICINA + BACITRACINA pomada\n   Aplicar fina camada na região afetada 3x/dia\n\n**Na unidade**\n1) DIPIRONA 1g IM + CEFTRIAXONA 1g IM',
		escabiose_sarna_b86:
			'**Uso Tópico**\n1) PERMETRINA 5% creme\n   Aplicar à noite da cabeça aos pés, deixar agir por 8-12h e remover no banho pela manhã. Repetir após 7 dias\n**Uso Oral (casos extensos ou falha do tópico)**\n2) IVERMECTINA 6mg\n   Tomar 3 comprimidos VO em dose única. Repetir após 7 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM (se prurido generalizado intenso)',
		escoriacoes_feridas_leves_s00_8:
			'**Uso Tópico**\n1) SULFADIAZINA DE PRATA creme\n   Aplicar fina camada na lesão 1 a 2x ao dia até cicatrização\n2) SF 0,9%\n   Lavar o local 2x ao dia antes da aplicação da pomada\n\n**Na unidade**\n1) DIPIRONA 1g IM, dose única para analgesia local',
		faringite_viral_faringoamigdalite_viral_j02_9:
			'1) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n2) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 8/8h por 03 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM + ORIENTAR repouso, hidratação e evitar antibiótico desnecessário',
		foliculite:
			'Eritromicina 500mg __________ 28 cp.\n   Tomar 1 cp, via oral, a cada 6 horas, por 7 dias. (às 6, 12, 18 e 24 horas)\n**Uso Externo:**\nMupirocina gel 2% __________ 15 g.\n   Aplicar nas lesões, após limpeza da pele com água e sabão, três vezes ao dia, por 7 dias.',
		gases_em_bebes:
			'Dimeticona gotas __________ 1 fr.\n   Tomar __ gotas, via oral, a cada 6 horas, por 10 dias.\n**Uso Externo:**\nSoro Fisiológico 0,9% __________ 1 fr.\n   Aplicar 1⁄2 conta-gotas em cada narina, 4 vezes ao dia (principalmente antes das mamadas e ao dormir).',
		gastrite_drge_dispepsia_dor_no_estomago_k29_7_k21_9_k30:
			'1) OMEPRAZOL 20mg\n   Tomar 01 cp via oral em jejum pela manhã por 30 dias\n2) BROMOPRIDA 10mg\n   Tomar 01 cp via oral 3x ao dia, 30 min antes das refeições\n3) ESCOPOLAMINA + DIPIRONA (10mg + 250mg)\n   Tomar 01 cp via oral de 6/6h se dor abdominal\n\n**Na unidade**\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
		geca_gastroenterite_aguda_a09:
			'1) OMEPRAZOL 20mg\n   Tomar 01 cp via oral em jejum pela manhã por 10 dias\n2) ENTEROGERMINA frasco\n   Tomar 01 frasco de 12/12h por 05 dias\n3) ONDANSETRONA 8mg\n   Tomar 01 cp via oral de 8/8h se náusea ou vômito\n4) ESCOPOLAMINA + DIPIRONA (10mg + 250mg)\n   Tomar 01 cp via oral de 6/6h se dor abdominal ou febre\n5) SAIS DE REIDRATAÇÃO ORAL\n   Diluir 01 sachê em 1L de água e beber ao longo do dia\n\nSe diarreia com sangue, febre ou dor em pontada:\n6) CIPROFLOXACINO 500mg\n   Tomar 01 cp via oral de 12/12h por 05 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
		gota_1_crise: 'Indometacina 50mg __________ 20 cp. Tomar 1 cápsula, via oral, a cada 8 horas, por 7 dias.\nColchicina 1mg __________ 20 cp. Tomar 1 comprimido, via oral, a cada 8 horas, por 7 dias.',
		gota_2_crise: 'Diclofenaco de Sódio 50mg __________ 20 cp. Tomar 1 cp, via oral, a cada 8 horas, por 7 dias.\nColchicina 1mg __________ 20 cp. Tomar 1 cp, via oral, a cada 8 horas, por 7 dias.',
		gota_3_crise: 'Prednisona 20mg __________ 18 cp. Tomar 2 cp, via oral, uma vez ao dia, por 5 dias. Após, tomar 1 cp, via oral, uma vez ao dia, por 5 dias. Após, tomar 1⁄2 cp, via oral, uma vez ao dia, por 6 dias.',
		gota_4_controle: 'Alopurinol 300mg __________ 30 cp. Tomar 1 cp, via oral, uma vez ao dia, por 30 dias.\nColchicina 0,5mg __________ 30 cp. Tomar 1 cp, via oral, uma vez ao dia, por 30 dias.',
		h_pylori_1:
			'Amoxicilina 500mg __________ 28 cp. Tomar 2 cp, via oral, a cada 12 horas, por 7 dias.\nClaritromicina 500mg __________ 14 cp. Tomar 1 cp, via oral, a cada 12 horas, por 7 dias.\nOmeprazol 20mg __________ 14 cp. Tomar 1 cp, via oral, a cada 12 horas, por 7 dias.',
		h_pylori_2_alergia_a_amoxicilina:
			'Metronidazol 250mg __________ 28 cp. Tomar 2 cp, via oral, a cada 12 horas, por 7 dias.\nClaritromicina 500mg __________ 14 cp. Tomar 1 cp, via oral, a cada 12 horas, por 7 dias.\nOmeprazol 20mg __________ 14 cp. Tomar 1 cp, via oral, a cada 12 horas, por 7 dias.',
		hemorragia_nasal_epistaxe_leve_r04_0:
			'**Uso Local**\n1) SF 0,9% gelado\n   Instilar no nariz e fazer compressão nasal por 10 minutos\n2) NAFAZOLINA spray nasal\n   Aplicar 1 jato em cada narina de 8/8h por até 03 dias\n\n**Na unidade**\n1) Compressão com algodão embebido em SF gelado + NAFAZOLINA spray',
		hemorroida_i84_9:
			'1) ÓLEO MINERAL\n   Tomar 15 mL via oral de 8/8h\n2) DAFLON (450mg + 50mg)\n   Tomar 01 cp via oral de 4/4h por 04 dias, depois 6/6h por 03 dias, depois 12/12h por 03 meses\n3) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 12/12h por 05 dias\n4) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n\n**Uso Tópico**\n5) PROCTYL pomada\n   Aplicar fina camada na região anal de 2-3x/dia\n\n**Na unidade**\n1) DIPIRONA 1g IM + DECADRON 4mg IM',
		herpes_simples_b00_9: '1) ACICLOVIR 400mg\n   Tomar 01 cp via oral de 8/8h por 07 dias (se gestante: 5 dias)\n\n**Na unidade**\n1) DIPIRONA 1g IM (se dor intensa local)',
		hiperglicemia_descompensacao_do_dm2_e11_9: '**Na unidade**\n1) DIPIRONA 1g IM (se queixa de dor)\n2) SF 0,9% EV em 500 mL (caso de desidratação moderada)\n3) investigar causas secundárias ou aderência do paciente ao tratamento',
		hiperplasia_prostata_1: 'Doxasozina 2mg __________ 30 cp. Tomar 1⁄2 cp, via oral, à noite, todos os dias, por 14 dias. Após, tomar 1 cp, via oral, à noite, todos os dias, por 21 dias e retornar ao médico para novo ajuste da dose.',
		hiperplasia_prostata_2: 'Doxasozina 4mg __________ 60 cp. Tomar 1 comprimido, via oral, à noite, todos os dias.',
		hiperplasia_prostata_3: 'Tansulozina 0,4mg __________ 60 cp.\n   Tomar 1 cápsula, via oral, após o café da manhã, todos os dias.',
		hiperplasia_prostata_4: 'Finasterida 5mg __________ 60 cp. Tomar 1 comprimido, via oral, à noite, todos os dias.',
		hiperplasia_prostata_5: 'Tansulozina 0,4mg __________ 60 cp.\n   Tomar 1 cápsula, via oral, após o café da manhã, todos os dias.\nFinasterida 5mg __________ 60 cp. Tomar 1 comprimido, via oral, à noite, todos os dias.',
		hipertensao_arterial_descompensada_i10: '**Na unidade**\n1) CAPTOPRIL 25mg VO + DIPIRONA 1g IM\n2) FUROSEMIDA 40mg tomar 01 cp via oral se houver congestão ou edema (avaliar se paciente é renal)\n3) retorno em 1h para reavaliar',
		hipertireoidismo_1: 'Tiamazol 5mg (Tapazol) __________ 50 cp.\n   Tomar 1 comprimido, via oral, a cada 8 horas, por 15 dias e retornar ao médico para reavaliação.\nPropranolol 40mg __________ 30 cp. Tomar 1 cp, via oral, a cada 12 horas, por 15 dias.',
		hipertireoidismo_2:
			'Propiltiouracil 5mg (Propil) __________ 60 cp.\n   Tomar 1 comprimido, via oral, a cada 8 horas, por 20 dias e retornar ao médico para reavaliação.\nPropranolol 40mg __________ 40 cp. Tomar 1 cp, via oral, a cada 12 horas, por 20 dias.',
		hipoglicemia_sintomatica_e16_2: '**Na unidade**\n1) GLICOSE 50% EV (01 ampola 20mL) em infundido lento (10-15min) diluída em 100mL de SF 0,9% EV (se paciente sintomático - tremores, queda de nível de consciência, sudorese).',
		hipotireoidismo: 'Levotiroxina 50mcg __________ 60 cp.\n   Tomar 1 comprimido, via oral, em jejum, 60 minutos antes do café da manhã, todos os dias.',
		impetigo_l01_0: '1) CEFALEXINA 500mg\n   Tomar 01 cp via oral de 6/6h por 07 dias\n**Uso Tópico**\n2) MUPIROCINA pomada\n   Aplicar fina camada nas lesões 3x ao dia por 07 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM (se dor local)',
		impetigo_ou_ectima:
			'**Uso Externo:**\nPenicilina G Benzatina 1.200.000 UI __________ 1 amp. Aplicar 1 ampola, via intramuscular, dose única.\nNeomicina + Bacitracina pomada __________ 1 tb.\n   Aplicar na lesão, após limpeza da pele e remoção das crostas com água morna e sabão, ou soro fisiológico, três vezes ao dia, por 7 dias.',
		impetigo_ou_ectima_2:
			'Eritromicina 250mg/5ml __________ 1 vd. Tomar 5 ml, via oral, a cada 6 horas, por 7 dias. (às 6, 12, 18 e 24 horas)\n**Uso Externo:**\nNeomicina + Bacitracina pomada __________ 1 tb.\n   Aplicar na lesão, após limpeza da pele e remoção das crostas com água morna e sabão, ou soro fisiológico, três vezes ao dia, por 7 dias.',
		infeccao_de_urina_itu_n39_0:
			'1) NITROFURANTOÍNA 100mg\n   Tomar 01 cp via oral de 6/6h por 07 dias\n   ou\n1) CIPROFLOXACINO 500mg\n   Tomar 01 cp via oral de 12/12h por 07 dias\n2) FENAZOPIRIDINA 200mg\n   Tomar 01 cp via oral de 8/8h por 03 dias\n3) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 8/8h por 05 dias\n\nSe pielonefrite:\n4) CEFTRIAXONA 1g IM, dose única\n\n**Na unidade**\n1) DIPIRONA 1g IM + CEFTRIAXONA 1g IM',
		insonia_leve_moderada_g47_0: '1) PASSIFLORA (extrato seco) 200mg\n   Tomar 01 cp via oral à noite, 30 minutos antes de dormir\n2) MELISSA + VALERIANA (fitoterápico composto)\n   Tomar 01 cp via oral à noite, se necessário\n\n**Na unidade**\nNão aplicável',
		insuficiencia_venosa_cronica: '**Uso Externo:**\nMeia Compressiva Kendall – média compressão.\n   Calçar pela manhã, antes de levantar-se da cama. Usar durante todo o dia. Elevar as pernas por 15 minutos antes de calçar, se tiver de retirá-las.',
		intoxicacao_alimentar_leve_t62_9_a05_9:
			'1) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n2) METOCLOPRAMIDA 10mg\n   Tomar 01 cp via oral de 8/8h se náusea ou vômito, por até 3 dias\n3) SORO CASEIRO ou REIDRATANTE ORAL\n   Ingerir por via oral após cada evacuação líquida\n\n**Na unidade**\n1) METOCLOPRAMIDA 10mg IM (se náusea ou vômito ativo)',
		labirintite_h81_0: '1) MECLIZINA 25mg\n   Tomar 01 cp via oral de 6/6h por 07 dias\n2) DRAMIN\n   Tomar 01 cp via oral de 8/8h se náusea ou vômito\n\n**Na unidade**\n1) DIPIRONA 1g IM + ONDANSETRONA 8mg IM',
		larva_migrans_1:
			'18- Albendazol 400mg __________ 3 cp. Tomar 1 cp, via oral, uma vez ao dia, por 3 dias.\n**Uso Externo:**\nTiabendazol 50mg/g pomada (Foldan) __________ 45 g.\n   Aplicar nas lesões, friccionando a pomada nas trilhas escavadas pelo parasita na pele, três vezes ao dia, por 5 dias seguidos.',
		larva_migrans_2:
			'Ivermectina 6mg (Vermectil) __________ 2 cp. Tomar 2 comprimidos, via oral, em dose única.\n**Uso Externo:**\nTiabendazol 50mg/g pomada (Foldan) __________ 45 g.\n   Aplicar nas lesões, friccionando a pomada nas trilhas escavadas pelo parasita na pele, três vezes ao dia, por 5 dias seguidos.',
		larva_migrans_criancas:
			'19- Albendazol 400mg/10ml __________ 3 fr. Tomar o conteúdo de um frasco (10 ml), via oral, uma vez ao dia, por 3 dias.\n**Uso Externo:**\nTiabendazol 50mg/g pomada (Foldan) __________ 45 g.\n   Aplicar nas lesões, friccionando a pomada nas trilhas escavadas pelo parasita na pele, três vezes ao dia, por 5 dias seguidos.',
		mastalgia_1: 'Tamoxifeno 10mg __________ 90 cp. Tomar 1 cp, via oral, uma vez ao dia, por 90 dias',
		molusco_contagioso_b08_1:
			'**Conduta Geral**\nOrientar conduta expectante (resolução espontânea em 6 a 12 meses)\nEvitar manipulação das lesões e compartilhar toalhas/objetos\n\n**Na unidade**\n1) DIPIRONA 1g IM (se dor local)\nEncaminhar para dermatologia se lesões extensas ou infeccionadas',
		nauseas_e_vomitos_1_gestantes: '20- Dimenidrinato 50mg (Dramin B6) __________ 20 cp. + Piridoxina 10mg\n   Tomar 1 comprimido, via oral, a cada 8 horas, por 7 dias.',
		nauseas_e_vomitos_severos_3: '21- Ondansetrona 8mg (Vonau Flash) __________ 10 cp. Tomar 1 comprimido, via oral, a cada 8 horas, por 3 dias.',
		nefrolitiase_colica_renal_n20_0:
			'1) ESCOPOLAMINA + DIPIRONA (10mg + 250mg)\n   Tomar 01 cp via oral de 6/6h se dor\n2) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 8/8h por 05 dias\n3) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor\n4) BROMOPRIDA 10mg\n   Tomar 01 cp via oral 3x/dia se náusea\n5) HIDRATAÇÃO oral vigorosa com água\n\n**Na unidade**\n1) DIPIRONA + ESCOPOLAMINA 1AMP , ONDANSETRONA 01 AMP EM 100ML DE SF 0,9%\n2) REAVALIAR EM 1H',
		onicomicose_1_maos_tinea_ungueum: 'Itraconazol 100mg __________ 28+ 28 cp. Tomar 2 cp, via oral, a cada 12 horas, por 7 dias; uma vez ao mês, por 2 meses.',
		onicomicose_2_maos_tinea_ungueum: 'Terbinafina 250mg __________ 56 cp. Tomar 1 cp, via oral, uma vez ao dia, por 56 dias.',
		onicomicose_3_pes: 'Itraconazol 100mg __________ 28 + 28+ 28 cp. Tomar 2 cp, via oral, a cada 12 horas, por 7 dias; uma vez ao mês, por 3 meses.',
		onicomicose_4_pes: 'Terbinafina 250mg __________ 84 cp. Tomar 1 cp, via oral, uma vez ao dia, por 84 dias.',
		osteoporose_1:
			'Alendronato de Sódio 70mg __________ 8 cp.\n   Tomar 1 comprimido, via oral, pela manhã, em jejum, 40 minutos antes do café da manhã, uma vez na semana. Tomar com um copo cheio de água filtrada. Não se deitar até fazer a primeira refeição.\nCarbonato de Cálcio 600mg __________ 60 cp. + Vitamina D 400UI\n   Tomar 1 comprimido, via oral, à noite, todos os dias.',
		osteoporose_2:
			'Risedronato de Sódio 35mg __________ 8 cp.\n   Tomar 1 comprimido, via oral, pela manhã, em jejum, 40 minutos antes do café da manhã, uma vez na semana. Tomar com um copo cheio de água filtrada. Não se deitar até fazer a primeira refeição.\nCarbonato de Cálcio 600mg __________ 60 cp. + Vitamina D 400UI\n   Tomar 1 comprimido, via oral, à noite, todos os dias.',
		osteoporose_3: 'Carbonato de Cálcio 600mg __________ 45 cp. + Vitamina D 400UI\n   Tomar 1 comprimido, via oral, à noite, todos os dias.',
		otite_externa_h60_3:
			'1) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 8/8h por 05 dias\n2) CEFALEXINA 500mg\n   Tomar 01 cp via oral de 6/6h por 07 dias\n**Uso Tópico**\n3) OTOSPORIN (ou similar com Polimixina B + Neomicina + Hidrocortisona)\n   Instilar 3 gotas no ouvido afetado 3x/dia por 07 dias\n\n**Na unidade**\n1) DIPIRONA + DECADRON 1AMP CADA IM',
		otite_media_aguda_h66_0:
			'1) AMOXICILINA 500mg\n   Tomar 01 cp via oral de 8/8h por 10 dias\n2) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 8/8h por 05 dias\n3) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n\n**Na unidade**\n1) DIPIRONA + DECADRON 1AMP CADA IM',
		otite_media_cefuroxima:
			'# Otite Média Aguda Bacteriana (Cefuroxima)\n## MEDICAÇÕES DE USO IMEDIATO\n\n Cefuroxima 500 mg (comprimido)\n - Tomar 1 comprimido, via oral, 12/12h, por 10 dias.\n\n Cetoprofeno 150 mg (comprimido)\n - Tomar 1 comprimido ao dia, pela manhã, durante 5 dias, com alimentos.\n\n Dipirona 1g (Novalgina®) ou Paracetamol 500mg (Tylenol®)\n Tomar 1 comprimido via oral a cada 6 horas, se necessário, para dor ou febre (temperatura axilar acima de 37,8°C).\n\n Digesan® (Bromoprida) 10 mg ou Ondansetrona (Vonau®) 4 mg\n Tomar 1 comprimido a cada 8 horas, via oral, em caso de enjoo ou vômito.\n\n Lavagem nasal com SF 0,9% 2-4x/dia\n Usar uma seringa (sem agulha) ou frasco de soro para lavagem: 20 mL de soro fisiológico, 2 a 4 vezes ao dia, por 5 dias, em caso de obstrução ou secreção nasal. Incline a cabeça para frente, com a boca aberta, e evite aplicar muita pressão ao lavar as narinas.\n\n- Retornar se os sintomas piorarem, mesmo com medicamentos.\n- Febre persistente por mais de 48h: temperatura acima de 37,8°C.\n- Piora do quadro por 72 horas, mesmo com uso de antibióticos.\n\n- INTERNAÇÃO HOSPITALAR\n\n- Indicada na presença de complicações como otomastoidite, complicações intracranianas, sepse ou otalgia resistente à antibioticoterapia.',
		oxiuriase_1: 'Pamoato de Pirvínio 100mg __________ 12 dg.\n   Tomar 1dg/10kg (máx. 6 dg), via oral, em dose única. Repetir após 2 semanas.',
		oxiuriase_criancas_2: 'Albendazol 400mg/10ml __________ 2 fr.\n   Tomar o conteúdo de um frasco (10 ml), via oral, em dose única.\n   Repetir após 7 dias.\n**Observação:**\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
		pediculose_crianca_2_anos:
			'Ivermectina 6mg (Vermectil) __________ 2 cp. Tomar 200mcg/kg comprimido, via oral, em dose única.\n**Uso Externo:**\nPermetrima 1% loção (Kwell) __________ 60 ml.\n   Lavar os cabelos com xampu, enxaguar bem e secar com toalha.\n   Aplicar a loção em todo o cabelo e couro cabeludo, com os cabelos ainda úmidos, principalmente na nuca e atrás das orelhas.\n   Deixe agir por 10 minutos.\n   Passe pente fino para remoção dos piolhos e lêndeas.\n   Enxague bem com água morna.\n   Repetir após 7 dias.',
		pediculose_pubiana:
			'Ivermectina 6mg (Vermectil) __________ 2 cp. Tomar 2 comprimidos, via oral, em dose única.\nDexclorfeniramina 2mg __________ 10 cp. Tomar 1 comprimido, via oral, a cada 8 horas, por 3 dias.\n**Uso Externo:**\nPermetrima 5% loção cremosa __________ 60 ml.\n   Aplicar nas áreas com pêlo, menos couro cabeludo, seguidos.\n   Remover com banho após 8 horas da aplicação.\n   Repetir procedimento após 7 dias.\n   Repetir tratamento no parceiro sexual.',
		pep_profilaxia_pos_exposicao_sexual_z20_2:
			'**Uso Oral (por 28 dias)**\n1) TENOFOVIR 300mg + LAMIVUDINA 300mg\n   Tomar 01 cp via oral 1x/dia\n2) DOLUTEGRAVIR 50mg\n   Tomar 01 cp via oral 1x/dia\n\nEncaminhar o paciente ao SAE/CTA para seguimento\n\n**Na unidade**\n1) DIPIRONA 1g IM (se dor associada)\n2) Início imediato do esquema acima, se disponível',
		picada_de_inseto_com_reacao_inflamatoria_local_t63_4_l50_9:
			'1) DEXCLORFENIRAMINA 0,5mg\n   Tomar 01 cp via oral de 8/8h por 05 dias\n2) PREDNISONA 20mg\n   Tomar 01 cp via oral 1x/dia por 03 dias\n3) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n\n**Na unidade**\n1) HIDROCORTISONA 100mg IM + DIPIRONA 1g IM',
		pneumonias_pneumonia_broncopneumonia_bcp_j18_9:
			'**Prescrição 01:**\nIndicado para pacientes com pneumonia adquirida na comunidade e sem fatores de risco para resistência bacteriana. Ideal em casos de intolerância ou contraindicação a betalactâmicos.\n1) AZITROMICINA 500mg Tomar 01 cp via oral uma vez ao dia por 05 dias\n2) PREDNISONA 20mg Tomar 01 cp via oral de 12/12h por 05 dias\n3) AMBROXOL 6mg/mL Tomar 05mL de 8/8h por 05 dias\n4) DIPIRONA 500mg Tomar 01 cp via oral de 6/6h se dor ou febre.\n\n**Prescrição 02:**\nPreferível em casos de pneumonia adquirida na comunidade com suspeita de infecção por *Streptococcus pneumoniae* ou outras bactérias suscetíveis. Indicado também para pacientes com risco de infecção por *Haemophilus influenzae*.\n\n1) AMOXICILINA + CLAVULANATO (500mg+125mg) Tomar 01 cp via oral de 8/8h por 07 dias\n2) PREDNISONA 20mg Tomar 01 cp via oral de 12/12h por 05 dias\n3) AMBROXOL 6mg/mL Tomar 05mL de 8/8h por 05 dias\n4) DIPIRONA 500mg Tomar 01 cp via oral de 6/6h se dor ou febre\n\n**Prescrição 03:**\nCombinação indicada para pacientes com pneumonia adquirida na comunidade, especialmente quando existe suspeita de infecção por *Mycoplasma pneumoniae*, *Chlamydia pneumoniae* ou *Legionella pneumophila*. A claritromicina pode ser usada como alternativa em caso de alergia à penicilina. Neste caso, realizar a seguinte prescrição:\n\n1) AMOXICILINA + CLAVULANATO (500mg+125mg) Tomar 01 cp via oral de 8/8h por 07 dias\n2) CLARITROMICINA 500mg Tomar 01 cp via oral de 12/12h por 07 dias\n3) PREDNISONA 20mg Tomar 01 cp via oral de 12/12h por 05 dias\n4) AMBROXOL 6mg/mL Tomar 05mL de 8/8h por 05 dias\n5) DIPIRONA 500mg Tomar 01 cp via oral de 6/6h se dor ou febre\n\n**Prescrição 04:**\nIndicado para pacientes com pneumonia grave, ou em casos onde há suspeita de resistência a antibióticos de primeira linha (ex: *Streptococcus pneumoniae* resistente à penicilina ou *Pseudomonas aeruginosa*). Preferível em pacientes com comorbidades, como diabetes, doenças pulmonares crônicas ou imunossupressão. (Mesma imagem utilizada no exemplo anterior + correlação clínica com o exemplo acima) Dito isso, prescrever:\n\n1) LEVOFLOXACINO 750mg Tomar 01 cp via oral uma vez ao dia por 07 dias\n2) PREDNISONA 20mg Tomar 01 cp via oral de 12/12h por 05 dias\n3) AMBROXOL 6mg/mL Tomar 05mL de 8/8h por 05 dias\n4) DIPIRONA 500mg Tomar 01 cp via oral de 6/6h se dor ou febre',
		pre_natal_vitaminas:
			'Ácido Fólico 5mg __________ 30 cp. Tomar 1 cp, via oral, uma vez ao dia, por 30 dias.\nSulfato Ferroso 300mg __________ 30 cp. Tomar 1 cp, via oral, uma vez ao dia, por 30 dias.\n\nObs: tomar com o estômago vazio, uma hora antes do almoço, com um pouco de água ou suco de laranja.\nNão tomar com leite.',
		prostatite: 'Ciprofloxacino 500mg __________ 56 cp. Tomar 1 cp, via oral, a cada 12 horas, por 28 dias.\nIbuprofeno 600mg __________ 10 cp. Tomar 1 cp, via oral, a cada 8 horas, por 3 dias.',
		psoriase_leve_l40_0:
			'**Uso Tópico**\n1) ÁCIDO SALICÍLICO + UREIA creme\n   Aplicar fina camada 2x/dia sobre as placas\n2) HIDROCORTISONA creme\n   Aplicar 2x/dia nas áreas afetadas por 5 a 7 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM (se dor associada intensa)',
		ptiriase_versicolor: 'Fluconazol 150mg __________ 3 cp.\n   Tomar 1 cápsula, via oral, uma vez por semana, por 3 semanas.\n**Uso Externo:**\nCetoconazol 2% creme __________ 30 g.\n   Aplicar na lesão, após limpeza da pele, a cada 8 horas, por 21 dias.',
		queimadura_solar_leve_l55_0:
			'**Uso Tópico**\n1) SULFADIAZINA DE PRATA creme\n   Aplicar fina camada nas áreas afetadas 2x/dia por 5 dias\n2) NEOMICINA + BACITRACINA pomada\n   Alternativa para pequenas lesões, aplicar 2x/dia\n\n3) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 8/8h por 03 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM\n2) ORIENTAR medidas de hidratação e proteção solar',
		rinite_alergica_j30_9:
			'1) LORATADINA 10mg\n   Tomar 01 cp via oral 1x/dia por 07 dias\n**Uso Tópico**\n2) SORO FISIOLÓGICO nasal 0,9%\n   Instilar 3-5 gotas em cada narina, 3x/dia\n\n**Na unidade**\n1) DEXCLORFENIRAMINA 5mg IM (se crise alérgica intensa)',
		sangramento_uterino: 'Ácido Tranexâmico 250mg __________ 30 cp. Tomar 2 cp, via oral, a cada 8 horas, por 5 dias.\nÁcido Mefenâmico 500mg __________ 15 cp. Tomar 1 cp, via oral, a cada 8 horas, por 5 dias.',
		sifilis_penicilina_benzatina: '**Uso Externo:**\nPenicilina Benzatina 1.200.000 UI __________ 12 amp.\n   Aplicar 2 ampolas, via intramuscular (uma em cada nádega), uma vez na semana, por 3 semanas.\n   Repetir tratamento no parceiro.',
		sindrome_ansiosa_crise_de_ansiedade_leve_f41_0:
			'1) PASSIFLORA EXTRATO SECO 200mg\n   Tomar 01 cp via oral 2x/dia\n2) VALERIANA + MELISSA (fitoterápico composto)\n   Tomar 01 cp via oral à noite, se necessário\n\n**Na unidade**\n1) DIAZEPAM 5mg IM (se crise aguda com agitação)',
		sindrome_dispeptica:
			'Omeprazol 20mg __________ 14 cp.\n   Tomar 1 cápsula, via oral, em jejum, imediatamente antes do café da manhã, por 14 dias.\nHidróxido de Alumínio suspensão __________ 1 vd. Tomar 10 ml, via oral, a cada 8 horas, por 4 dias.\nBromoprida 4mg/ml solução oral gotas __________ 1 fr. Tomar 60 gotas, via oral, a cada 8 horas, por 4 dias.',
		sindrome_gripal_viral_simples_j11_1:
			'1) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se febre ou dor\n2) LORATADINA 10mg\n   Tomar 01 cp via oral 1x/dia por 05 dias\n3) IBUPROFENO 300mg\n   Tomar 01 cp via oral de 8/8h por 03 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM + ORIENTAR repouso e hidratação oral',
		sinusite_aguda_j01_9:
			'1) AMOXICILINA 500mg + CLAVULANATO 125mg\n   Tomar 01 cp via oral de 8/8h por 10 dias\n2) LORATADINA 10mg\n   Tomar 01 cp via oral 1x/dia por 07 dias\n3) DIPIRONA 500mg\n   Tomar 01 cp via oral de 6/6h se dor ou febre\n\n**Na unidade**\n1) DIPIRONA 1g IM + LAVAGEM NASAL com SF 0,9%',
		teniase:
			'Praziquantel 150mg __________ 12 cp.\n   Tomar 10mg/kg, via oral, durante o café da manhã, com um pouco de líquido, em dose única.\n**Observações:**\nFerver e/ou filtrar toda a água a ser consumida em casa.\nNão ingerir bebidas alcoólicas no dia do tratamento e no dia seguinte.',
		tetano_conduta_para_ferimentos_a35:
			'**Conduta na unidade**\n1) LIMPEZA E DEBRIDAMENTO da ferida com SF 0,9% + PVPI\n2) VACINA dT IM (se esquema vacinal incompleto ou desconhecido)\n3) IMUNOGLOBULINA ANTITETÂNICA IM (se ferimento de alto risco e esquema vacinal incerto)\n\n**Orientações**\nEncaminhar para continuidade da vacinação no posto\nAvaliar antibioticoterapia se sinais de infecção local.',
		tinea_micose_de_pele_ou_couro_cabeludo_b35_0_b35_4:
			'**Uso Tópico**\n1) CLOTRIMAZOL creme\n   Aplicar 2x/dia nas lesões por 14 dias\n**Uso Oral (casos extensos ou couro cabeludo)**\n2) GRISEOFULVINA 500mg\n   Tomar 01 cp via oral 1x/dia por 30 dias\n\n**Na unidade**\n1) DIPIRONA 1g IM (se prurido ou dor local intensa)',
		tonsilite: 'Amoxicilina 500mg __________ 21 cp. Tomar 1 cp, via oral, a cada 8 horas, por 7 dias. (às 6, 14, e 22 horas)\nDipirona 500mg/ml solução oral gotas __________ 1 fr. Tomar 40 gotas, via oral, a cada 8 horas, por 3 dias.',
		tonsilite_2: '35- Amoxicilina + Clavulonato 875mg+125mg __________ 14 cp. Tomar 1 cp, via oral, a cada 12 horas, por 7 dias.\n36- Dipirona gotas __________ 1 fr. Tomar 40 gotas, via oral, a cada 8 horas, por 3 dias.',
		tonsilite_criancas_1: 'Amoxicilina 250mg/5ml __________ 1 vd. Tomar kg/3 ml, via oral, a cada 8 horas, por 7 dias. (às 6, 14, e 22 horas)\nDipirona 500mg/ml solução oral gotas __________ 1 fr. Tomar kg gotas, via oral, a cada 8 horas, por 3 dias.',
		tonsilite_criancas_2: 'Amoxicilina+Clavulonato 400mg+57mg/5ml __________ 1vd. Tomar __ ml, via oral, a cada 12 horas, por 7 dias.\nDipirona 500mg/ml solução oral gotas __________ 1 fr. Tomar __ gotas, via oral, a cada 8 horas, por 3 dias.',
		tosse_seca_persistente_r05:
			'1) BENZONATATO 100mg\n   Tomar 01 cp via oral de 8/8h por até 5 dias\n2) LORATADINA 10mg\n   Tomar 01 cp via oral 1x/dia por 07 dias\n3) SORO FISIOLÓGICO 0,9%\n   Instilar em narinas 3x/dia\n\n**Na unidade**\n1) DIPIRONA 1g IM (se dor torácica associada à tosse)',
		tricomoniase:
			'Metronidazol 250mg __________ 16 cp.\n   Tomar 8 comprimidos, via oral, em dose única e repetir o tratamento no parceiro.\n**Uso Externo:**\nMetronidazol 0,75% gel vaginal __________ 1 tb. Aplicar uma dose, via vaginal, à noite, por 7 dias.\n**Observação:**\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
		tricomoniase_2:
			'Secnidazol 1000mg __________ 4 cp.\n   Tomar 2 cp, via oral, em dose única e repetir o tratamento no parceiro.\n**Uso Externo:**\nMetronidazol 0,75% gel vaginal __________ 1 tb. Aplicar uma dose, via vaginal, à noite, por 7 dias.\n**Observação:**\nNão ingerir bebidas alcoólicas até 4 dias após o tratamento com secnidazol e manter abstinência sexual até o término do tratamento com o gel vaginal.',
		ulcera_peptica_duodenal: 'Omeprazol 20mg __________ 42 cp.\n   Tomar 1 cápsula, via oral, em jejum, imediatamente antes do café da manhã, por 42 dias.',
		urticaria:
			'Dexclorfeniramina 2mg/5ml xarope __________ 1 vd. Tomar 10 ml, via oral, a cada 8 horas, por 4 dias.\nPrednisona 20mg __________ 10 cp. Tomar 1 cp, via oral, a cada 12 horas, por 5 dias.\n**Uso Externo:**\nAD 20ml + Hidrocortisona 500mg __________ 1 amp. Aplicar, via intravenosa, lento, dose única.\nEpinefrina 1:1000 __________ 1 amp. Aplicar 0,5 ml, via subcutânea, em dose única.',
		urticaria_aguda_l50_9: '1) LORATADINA 10mg\n   Tomar 01 cp via oral 1x/dia por 07 dias\n2) PREDNISONA 20mg\n   Tomar 01 cp via oral 1x/dia por 03 dias\n\n**Na unidade**\n1) HIDROCORTISONA 100mg IM + DEXCLORFENIRAMINA 5mg IM',
		urticaria_criancas:
			'Dexclorfeniramina 2mg/5ml xarope __________ 1 vd. Tomar __ ml, via oral, a cada 8 horas, por 5 dias.\nPrednisolona 3mg/ml xarope __________ 1 vd. Tomar __ ml, via oral, a cada 12 horas, por 5 dias.\n**Uso Externo:**\nEpinefrina 1:1000 __________ 1 amp. Aplicar 0,01ml/kg, via subcutânea, em dose única.',
		vacinacao_antitetanica_a35:
			'**Na unidade**\n1) AVALIAR ESQUEMA VACINAL do paciente (3 doses básicas + reforços)\n2) dT IM (Vacina dupla adulto)\n   Aplicar em caso de ferimentos com risco ou calendário desatualizado\n3) IMUNOGLOBULINA ANTITETÂNICA IM\n   Aplicar se ferimento de risco + vacinação incompleta/desconhecida\n\n**Orientação:**\nEncaminhar paciente à UBS para continuidade de esquema vacinal completo',
		vaginite_mista: '**Uso Externo:**\nTioconazol+Tinidazol creme vaginal (Cartrax) __________ 35 g. (100mg+150mg/5g)\n   Aplicar uma dose, via vaginal, à noite, por 7 dias.',
		vaginose_bacteriana:
			'Metronidazol 250mg __________ 28 cp. Tomar 2 cp, via oral, a cada 12 horas, por 7 dias.\n**Uso Externo:**\nMetronidazol 0,75% gel vaginal __________ 1 tb. Aplicar uma dose, via vaginal, à noite, por 7 dias.\n**Observação:**\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
		vaginose_bacteriana_2:
			'Metronidazol 250mg __________ 28 cp. Tomar 2 cp, via oral, a cada 12 horas, por 7 dias.\n**Uso Externo:**\nClindamicina 2% creme vaginal __________ 1 tb. Aplicar uma dose, via vaginal, à noite, por 7 dias.\n**Observação:**\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
		vaginose_bacteriana_3:
			'Clindamicina 300mg __________ 28 cp. Tomar 1 cp, via oral, a cada 12 horas, por 14 dias.\n**Uso Externo:**\nMetronidazol 0,75% gel vaginal __________ 1 tb. Aplicar uma dose, via vaginal, à noite, por 14 dias.\n**Observação:**\nNão ingerir bebidas alcoólicas e manter abstinência sexual até 24 horas após o tratamento.',
		varizes_dos_membros_inferiores_i83_9:
			'1) FLAVONÓIDE (DAFLON® 500mg ou similar)\n   Tomar 01 cp via oral de 12/12h por 30 dias\n**Uso tópico (se dor local):**\n2) NITRATO DE MICONAZOL + HEPARINA (ex: Hirudoid®)\n   Aplicar fina camada 2x/dia nas pernas\n\n**Na unidade**\n1) DIPIRONA 1g IM (se dor local intensa)',
		vermifugo_amplo_espectro_1:
			'Mebendazol 100mg __________ 12 cp. Tomar 1 cp, via oral, a cada 12 horas, por 3 dias. Repetir após 7 dias.\nTiabendazol 500mg __________ 12 cp. Tomar 1 cp, via oral, a cada 12 horas, por 3 dias. Repetir após 7 dias.\n**Observação:**\nFerver e/ou filtrar toda a água a ser consumida em casa',
		vermifugo_amplo_espectro_2: 'Nitazoxanida 500mg (Annita) __________ 6 cp.\n   Tomar 1 comprimido, via oral, a cada 12 horas, por 3 dias.\n**Observação:**\nFerver e/ou filtrar toda a água a ser consumida em casa.',
		vermifugo_amplo_espectro_3: 'Albendazol 400mg __________ 6 cp.\n   Tomar 1 cp, via oral, uma vez ao dia, por 3 dias. Repetir após 7 dias.\n**Observação:**\nFerver e/ou filtrar toda a água a ser consumida em casa.',
		vermifugo_criancas_1:
			'Albendazol 400mg/10ml __________ 2 fr.\n   Tomar o conteúdo de um frasco (10 ml), via oral, em dose única.\n   Repetir após 7 dias.\nSulfato Ferroso 25mg/ml gotas __________ 2 fr. Tomar __ gotas, via oral, uma vez ao dia, por 90 dias.\n**Observação:**\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
		vermifugo_criancas_2:
			'Albendazol 400mg/10ml __________ 2 fr.\n   Tomar o conteúdo de um frasco (10 ml), via oral, em dose única.\n   Repetir após 7 dias.\nUltrafer 50mg/ml gotas __________ 2 fr. Tomar 10 gotas, via oral, duas vezes ao dia, por 90 dias.\nObs: tomar uma hora antes do almoço e do jantar, com um pouco de água ou suco de laranja.\nNão tomar com leite.\nNutrinfan xarope pediátrico __________ 1 fr. Tomar 2,5ml, via oral, uma vez ao dia, por 24 dias.\n**Observação:**\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
		vermifugo_criancas_3:
			'Mebendazol 100mg/5ml __________ 2 vd.\n   Tomar 5 ml, via oral, a cada 12 horas, por 3 dias. Repetir após 7 dias.\nMetronidazol 4% suspensão __________ 1 vd. Tomar __ ml, via oral, a cada 12 horas, por 5 dias.\nSulfato Ferroso 25mg/ml gotas __________ 2 fr. Tomar __ gotas, via oral, uma vez ao dia, por 90 dias.\n**Observação:**\nFerver e/ou filtrar toda a água a ser consumida pela criança.',
		vertigem_1: '37- Meclizina 25mg (Meclin) __________ 15 cp. Tomar 1 comprimido, via oral, a cada 8 horas, por 5 dias.',
		vertigem_aguda: '38- Dimenidrinato 50mg (Dramin B6) __________ 20 cp. + Piridoxina 10mg\n   Tomar 1 comprimido, via oral, a cada 6 horas, por 5 dias.',
		virose_criancas:
			'Dipirona gotas __________ 1 fr. Tomar 20 gotas, via oral, a cada 6 horas, por 3 dias.\nBromoprida gotas __________ 1 fr. Tomar 20 gotas, via oral, a cada 8 horas, por 3 dias.\n**Uso Externo:**\nSF 0,9% 250ml + Metoclopramida __________ 1⁄2 amp.\n   Aplicar, via endovenosa, lento, dose único.',
	};

	// ============================================
	// FUSÃO DE DADOS (LEGADO + NOVO)
	// ============================================

	// Captura dados que vieram do hotstrings.min.js (se carregado antes)
	const dadosLegados = window.hotstrings || {};

	// Unifica os dados (psf_hotstrings tem prioridade em caso de conflito, ou vice-versa, aqui optamos por merge)
	const dadosCompletos = Object.assign({}, dadosLegados, psf_hotstrings);

	// Atualiza o global window.hotstrings com tudo
	window.hotstrings = dadosCompletos;

	// ============================================
	// FUNÇÕES UTILITÁRIAS
	// ============================================

	/**
	 * Busca hotstrings por termo
	 */
	function buscarHotstring(termo) {
		termo = termo.toLowerCase();
		const resultados = [];

		Object.keys(dadosCompletos).forEach((key) => {
			if (key.toLowerCase().includes(termo) || dadosCompletos[key].toLowerCase().includes(termo)) {
				resultados.push({
					key: key,
					content: dadosCompletos[key],
				});
			}
		});

		return resultados;
	}

	/**
	 * Retorna um hotstring específico
	 */
	function getHotstring(key) {
		return dadosCompletos[key] || null;
	}

	/**
	 * Lista todas as chaves disponíveis
	 */
	function getChaves() {
		return Object.keys(dadosCompletos).sort();
	}

	/**
	 * Retorna todos os hotstrings
	 */
	function getTodos() {
		return dadosCompletos;
	}

	/**
	 * Filtra hotstrings por categoria (baseado em padrões no nome)
	 */
	function porCategoria(categoria) {
		categoria = categoria.toLowerCase();
		const resultados = {};

		Object.keys(dadosCompletos).forEach((key) => {
			if (key.toLowerCase().includes(categoria)) {
				resultados[key] = dadosCompletos[key];
			}
		});

		return resultados;
	}

	/**
	 * Estatísticas
	 */
	function getEstatisticas() {
		const total = Object.keys(dadosCompletos).length;

		// Conta por tipo de medicamento mencionado
		const medicamentos = new Set();
		Object.values(dadosCompletos).forEach((content) => {
			if (typeof content === 'string') {
				const matches = content.match(/[A-Z]{3,}/g);
				if (matches) {
					matches.forEach((m) => medicamentos.add(m));
				}
			}
		});

		return {
			total: total,
			medicamentosUnicos: medicamentos.size,
			tamanhoMedio: total > 0 ? Math.round(Object.values(dadosCompletos).reduce((sum, v) => sum + (v ? v.length : 0), 0) / total) : 0,
		};
	}

	// ============================================
	// EXPÕE API GLOBAL
	// ============================================
	window.HotstringsModule = {
		// Dados
		data: dadosCompletos,

		// Funções
		buscar: buscarHotstring,
		get: getHotstring,
		getChaves: getChaves,
		getTodos: getTodos,
		porCategoria: porCategoria,
		getEstatisticas: getEstatisticas,
	};

	console.log('✅ Hotstrings Module carregado:', window.HotstringsModule.getEstatisticas());
})();
