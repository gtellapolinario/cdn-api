// protocolos-asma-module.js
(() => {
	'use strict';

	// ============================================
	// TEXTOS REUTILIZÁVEIS
	// ============================================
	const TXT_SINTOMATICOS_GERAL = `1) Em caso de dor ou febre: uma das medicações abaixo
- Dipirona 1g (Novalgina®) ou Paracetamol 500mg (Tylenol®): Tomar 1 comprimido via oral a cada 6 horas, se necessário, para dor ou febre (temperatura axilar acima de 37,8°C).

2) Em caso de enjoo ou vômito: uma das medicações abaixo
- Bromoprida (Digesan®) 10 mg ou Ondansetrona (Vonau®) 4 mg
Tomar 1 comprimido a cada 8 horas, via oral, em caso de enjoo ou vômito.`;

	const TXT_RECOMENDACOES_GERAL = `1) Cuide-se bem
- Tenha boa alimentação, boa noite de sono, evite bebidas alcoólicas.
- Se faz medicações de rotina, somente altere por orientação médica.
- Faça acompanhamento médico regular.

2) Retornar em caso de piora dos sintomas mesmo em uso de medicamentos
- Febre por mais de 48h: temperatura acima de 37,8°C.
- Piora da dor, tosse persistente, falta de ar, pressão baixa ou desmaios.`;

	window.protocolosClinica = [
		// --- RESPIRATÓRIO ---
		{
			id: 'herpes-zoster',
			title: 'Herpes Zóster',
			tags: ['herpes', 'zoster', 'valaciclovir', 'pele', 'dor'],
			summary: 'Valaciclovir + Sintomáticos + Orientações.',
			rx_text: `### **Herpes Zóster**
(Valaciclovir + Sintomáticos)

### PRESCRIÇÃO

1) Valaciclovir 500 mg (comprimido)
- Tomar 2 comprimidos, de 8/8h, via oral, por 7 dias

2) Naproxeno 500 mg
- Tomar 1 comprimido, 1x/dia, por 5 dias, com alimentos

# MEDICAÇÕES PARA USAR APENAS EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

3) Tramadol 50 mg (comprimido)
- Tomar 1 comprimido de 6/6h em caso de dor intensa refratária as medicações acima, por 3 dias.

# RECOMENDAÇÕES GERAIS

1) Retornar em caso de piora
- Piora do edema e inchaço na área da infecção.
- Aumento da vermelhidão (hiperemia), acompanhada de calor e dor local.
- Endurecimento ou coloração roxa no local da infecção, ou presença de abscesso.
- Febre (temperatura acima de 37,8°C) ou sinais de tontura e pressão baixa.`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: [
						'O ideal é iniciar tratamento empírico precoce (até no máximo 72 horas depois do início das lesões).',
						'Oriente a limpeza e proteção das lesões de forma adequada para evitar infecção bacteriana secundária.',
						'Se houver crostas melicéricas e exsudação sugerindo infecção secundária, iniciar antibioticoterapia concomitante.',
					],
				},
				{
					title: 'Internação Hospitalar',
					bullets: ['Indivíduos imunodeprimidos com quadro disseminado.', 'Presença de sintomas neurológicos (meningoencefalite, mielite).', 'Quadro oftalmológico associado.', 'Controle da dor aguda muito intensa.'],
				},
			],
			references: ['Patil A, Goldust M, Wollina U. Herpes zoster. Viruses. 2022.', 'MS Guia de Vigilância em Saúde 2021.'],
		},
		{
			id: 'asma-crise-ps',
			title: 'Crise de Asma (Pronto Socorro)',
			tags: ['asma', 'ps', 'crise', 'respiratorio'],
			summary: 'Manejo agudo: B2-agonista + Anticolinérgico + Corticoide sistêmico.',
			rx_text: `### **Crise de Asma**
no Pronto Socorro 🏥

**ANALGESIA / BRONCODILATAÇÃO**

B2 AGONISTA DE CURTA DURAÇÃO (Salbutamol/Fenoterol)
- Spray (100mcg): 4 a 10 puffs a cada 20 min na 1ª hora.
- Nebulização (5mg/mL): 10-20 gotas em 4mL SF0,9% a cada 20 min na 1ª hora.

ANTICOLINÉRGICO DE CURTA DURAÇÃO (Ipratrópio)
- Spray (20mcg): 4 a 10 puffs a cada 20 min na 1ª hora.
- Nebulização (0,25mg/mL): 20-40 gotas em 4mL SF0,9% a cada 20 min na 1ª hora.

**CORTICOIDE**
- Preferência VO: Prednisona/Prednisolona 40mg AGORA.
- Se VO indisponível: Hidrocortisona 100mg EV ou Metilprednisolona 62,5mg EV AGORA.

**SULFATO DE MAGNÉSIO** (Casos refratários)
- 50% (5g/10mL): 4mL + 100mL SF0,9% EV em 30 min.

**OXIGENIOTERAPIA**
- Cateter ou Máscara: Alvo SatO2 93-95%.`,
			sections: [
				{
					title: 'Observações',
					bullets: ['Via oral para corticoide é preferencial se disponível.', 'Sulfato de Magnésio apenas se refratário ao tratamento broncodilatador otimizado.'],
				},
			],
			references: ['GINA 2023', 'SBPT 2021'],
		},
		{
			id: 'asma-alta-esquema-1',
			title: 'Asma Alta - Esquema Ideal',
			tags: ['asma', 'alta', 'alenia', 'formoterol'],
			summary: 'Alta com Formoterol + Budesonida (Alenia) + Prednisolona.',
			rx_text: `### **Asma - Alta (Esquema Ideal)**
(Formoterol 12 mcg + Budesonida 400 mcg + Prednisolona)

### PRESCRIÇÃO

1) Formoterol 12 mcg + Budesonida 400 mcg (Alenia®)
- Utilize uma inalação por via oral a cada 12 horas, durante 30 dias.
- Enxágue a boca com água após o uso.

2) Prednisolona 40 mg
- Tomar 1 comprimido pela manhã, uma vez ao dia, durante 5 dias.

# USAR EM CASO DE SINTOMAS

1) Salbutamol 100 mcg/dose (Aerolin®)
- Fazer 2 puffs até 4/4h em caso de cansaço sob demanda. Interromper se palpitação.

2) Lavagem nasal com SF 0,9%
- 20 mL de soro fisiológico, 2 a 4 vezes ao dia, se congestão.

${TXT_SINTOMATICOS_GERAL}

${TXT_RECOMENDACOES_GERAL}`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Orientar quanto às medicações de uso regular e técnica inalatória.', 'Retorno com pneumologista em 5 a 7 dias.', 'Rever a técnica inalatória com paciente.'],
				},
				{
					title: 'Internação Hospitalar',
					bullets: ['Paciente sem resposta ao tratamento de resgate hospitalar.'],
				},
			],
			references: ['GINA 2023'],
		},
		{
			id: 'asma-alta-esquema-2',
			title: 'Asma Alta - Esquema Básico',
			tags: ['asma', 'alta', 'aerolin', 'clenil', 'sus'],
			summary: 'Alta com Salbutamol + Beclometasona + Prednisolona.',
			rx_text: `### **Asma - Alta (Esquema Básico)**
(Salbutamol/Aerolin + Beclometasona/Clenil + Prednisolona)

### PRESCRIÇÃO

1) Salbutamol 100 mcg/dose (Aerolin®)
- Fazer 1 puff de 8/8h por 30 dias.
- Fazer 2 puffs até 4/4h em caso de cansaço sob demanda (SOS).

2) Beclometasona 250 mcg/dose (Clenil HFA®)
- Utilize uma inalação por via oral a cada 12 horas, durante 30 dias.
- Enxágue a boca após o uso.

3) Prednisolona 40 mg
- Tomar 1 comprimido, 1x/dia, de manhã, por 5 dias.

# USAR EM CASO DE SINTOMAS

1) Lavagem nasal com SF 0,9% (20mL 2-4x/dia se congestão).

${TXT_SINTOMATICOS_GERAL}

${TXT_RECOMENDACOES_GERAL}`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Prescrição para casos novos sem terapia prévia.', 'Rever técnica inalatória.', 'Orientar retorno ambulatorial.'],
				},
			],
			references: ['GINA 2023'],
		},
		{
			id: 'dpoc-ps',
			title: 'DPOC Exacerbado (PS)',
			tags: ['dpoc', 'ps', 'exacerbacao'],
			summary: 'Broncodilatadores + Corticoide + Antibiótico (se indicado).',
			rx_text: `### **DPOC Exacerbado - PS**

**BRONCODILATADORES**
- Salbutamol + Ipratrópio (Spray ou Nebulização).
- Fazer a cada 20 min na primeira hora.

**CORTICOIDE**
- Prednisona 40mg VO AGORA (Preferência).
- Hidrocortisona 100mg EV ou Metilprednisolona 62,5mg EV (Se VO indisponível).

**ANTIBIOTICOTERAPIA**
- Indicada se: Piora da dispnéia + Aumento de secreções + Escarro purulento.
- Amoxicilina + Clavulanato 875+125mg 12/12h (7-10 dias).
- Levofloxacino 750mg 1x/dia (7 dias).
- Azitromicina 500mg 1x/dia (5 dias).

**OXIGENIOTERAPIA**
- Alvo 88-92% (Risco de narcose de CO2). VNI se indicado.`,
			sections: [
				{
					title: 'Observações',
					bullets: ['O2 em baixo fluxo (1-3 L/min) para SatO2 < 90%.', 'VNI em BIPAP se acidose respiratória.'],
				},
			],
			references: ['GOLD 2023'],
		},
		{
			id: 'dpoc-alta',
			title: 'DPOC - Alta',
			tags: ['dpoc', 'alta'],
			summary: 'Manutenção com broncodilatadores e completar ciclo de ATB/Corticoide.',
			rx_text: `### **DPOC - Alta**
(Salbutamol/Aerolin + Beclometasona/Clenil + Prednisolona)

### PRESCRIÇÃO

1) Salbutamol 100 mcg/dose (Aerolin®)
- Fazer 1 puff de 8/8h por 30 dias.
- Fazer 2 puffs até 4/4h em caso de cansaço sob demanda.

2) Beclometasona 250 mcg/dose (Clenil HFA®)
- Utilize uma inalação por via oral a cada 12 horas, durante 30 dias.
- Enxágue a boca após o uso.

3) Prednisolona 40 mg
- Tomar 1 comprimido, 1x/dia, de manhã, por 5 dias.

*Completar antibiótico se prescrito.*

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

${TXT_RECOMENDACOES_GERAL}`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Prescrever antibióticos caso a causa da descompensação seja suspeita ou infecção confirmada.', 'Sempre rever a técnica inalatória.'],
				},
				{
					title: 'Internação Hospitalar',
					bullets: ['Paciente sem resposta ao tratamento de resgate hospitalar.'],
				},
			],
			references: ['GOLD 2023'],
		},
		{
			id: 'faringo-viral',
			title: 'Faringoamigdalite Viral',
			tags: ['garganta', 'viral', 'dor'],
			summary: 'Sintomáticos e Corticoide. Não usar antibiótico.',
			rx_text: `### **Faringoamigdalite Viral**
(Corticoide + Sintomáticos + Orientações)

### PRESCRIÇÃO

1) Prednisolona 40mg (comprimido)
- Tomar 1 comprimido, via oral, 1x/dia por 4 dias

# MEDICAÇÕES PARA USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

3) Strepsils® (Flurbiprofeno) pastilhas
- 1 pastilha a cada 6 horas (máximo de 3 dias). Dissolver lentamente na boca.

# RECOMENDAÇÕES GERAIS

${TXT_RECOMENDACOES_GERAL}`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Anti-histamínicos e antitussígenos são contraindicados.', 'Gargarejo com água morna e sal e chás podem trazer conforto.'],
				},
				{
					title: 'Internação Hospitalar',
					bullets: ['Complicações supurativas (abscesso retrofaríngeo/tonsilar).', 'Toxemia significativa.'],
				},
			],
			references: ['ABORL 2023'],
		},
		{
			id: 'faringo-bact-1',
			title: 'Faringo. Bacteriana (Benzetacil)',
			tags: ['garganta', 'bacteriana', 'penicilina'],
			summary: 'Penicilina Benzatina dose única.',
			rx_text: `### **Faringoamigdalite Bacteriana (Benzetacil)**
(Penicilina Benzatina + Corticoide + Sintomáticos)

### PRESCRIÇÃO

1) Penicilina Benzatina 1.200.000 UI
- Uma aplicação, intramuscular, dose única.

2) Prednisolona 40mg (comprimido)
- Tomar 1 comprimido, 1x/dia, pela manhã, durante 4 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

3) Strepsils® (Flurbiprofeno) pastilhas (6/6h).

${TXT_RECOMENDACOES_GERAL}`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Verificar alergia a Penicilina.', 'Opções caseiras como gargarejos são válidas.'],
				},
			],
			references: ['ABORL 2023'],
		},
		{
			id: 'faringo-bact-2',
			title: 'Faringo. Bacteriana (Oral)',
			tags: ['garganta', 'bacteriana', 'amoxicilina'],
			summary: 'Amoxicilina-Clavulanato por 10 dias.',
			rx_text: `### **Faringoamigdalite Bacteriana (Oral)**
(Amoxicilina/Clavulanato + Corticoide + Sintomáticos)

### PRESCRIÇÃO

1) Amoxicilina-Clavulanato 875/125 mg (comprimido)
- Tomar 1 comprimido, via oral, de 12/12h, por 10 dias

2) Prednisolona 40mg (comprimido)
- Tomar 1 comprimido, 1x/dia, de manhã, por 4 dias

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

3) Strepsils® (Flurbiprofeno) pastilhas (6/6h).

${TXT_RECOMENDACOES_GERAL}`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Anti-histamínicos contraindicados.', 'Internação se abscesso ou toxemia.'],
				},
			],
			references: ['ABORL 2023'],
		},
		{
			id: 'influenza',
			title: 'Influenza | Alto Risco',
			tags: ['gripe', 'tamiflu', 'oseltamivir'],
			summary: 'Oseltamivir (Tamiflu) + Sintomáticos.',
			rx_text: `### **Influenza / Síndrome Gripal**
(Oseltamivir + Sintomáticos + Orientações)

# MEDICAÇÃO PARA USO IMEDIATO

1) Oseltamivir 75 mg (Tamiflu®)
- Tomar 1 comprimido, via oral, de 12 em 12 horas durante 5 dias.
- Disponível em postos de saúde.

2) Lavagem nasal com SF 0,9% 2-4x/dia.

3) Acetilcisteína Xarope/Granulado
- Tomar 1x/dia por 5 dias.

4) Anti-histamínico (Loratadina 10mg / Fexofenadina 120mg / Levocetirizina 5mg)
- Tomar 1 cp 1x/dia (ou 12/12h conforme escolha) por 5 dias.

5) Budesonida spray nasal 50 mcg (se congestão)
- 1 a 2 jatos em cada narina 12/12h por 10 dias.

# MEDICAÇÕES PARA USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

4) Em caso de congestão nasal intensa: Oximetazolina (Aturgyl)
- 1-2 gotas max 3-5 dias.

# RECOMENDAÇÕES GERAIS
- Hidratação adequada.
- Retornar se falta de ar, pressão baixa, desmaios.`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Pacientes de alto risco: Gestantes, Idosos > 60a, Crianças < 5a, Comorbidades.', 'Ajuste dose se TFG < 30.', 'Não há necessidade de retorno em casos leves.'],
				},
				{
					title: 'Internação Hospitalar',
					bullets: ['Risco de insuficiência respiratória.', 'Síndrome Respiratória Aguda Grave (SRAG).'],
				},
			],
			references: ['MS 2023'],
		},
		{
			id: 'pac-amox',
			title: 'PAC - Amoxicilina/Clav',
			tags: ['pneumonia', 'amoxicilina'],
			summary: 'Amoxicilina-Clavulanato para PAC ambulatorial.',
			rx_text: `### **Pneumonia Adquirida na Comunidade (PAC)**
(Amoxicilina/Clavulanato + Sintomáticos)

# MEDICAÇÕES DE USO IMEDIATO

1) Amoxicilina-Clavulanato (Clavulin® BD) 875/125 mg
- Tomar 1 comprimido oralmente a cada 12 horas durante 10 dias.

2) Acetilcisteína Xarope/Granulado
- Tomar 15 mL ou 1 envelope, 1x/dia, por 5 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES GERAIS

1) Retornar em caso de piora
- Febre por mais de 48h.
- Piora da dor, tosse persistente, falta de ar, pressão baixa.
- Tosse com sangramento intenso.
- Incapacidade de se alimentar.`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Mais de 72h sem resposta caracteriza falha terapêutica.', 'Para pacientes sem comorbidades e sem uso recente de ATB.'],
				},
				{
					title: 'Internação Hospitalar',
					bullets: ['CURB-65 ≥ 2.', 'Comorbidades descompensadas (DPOC, ICC, DM).', 'Baixo nível socioeconômico.'],
				},
			],
			references: ['SBPT 2018'],
		},
		{
			id: 'pac-levo',
			title: 'PAC - Levofloxacino',
			tags: ['pneumonia', 'levofloxacino'],
			summary: 'Levofloxacino para PAC (Alergia ou Comorbidades).',
			rx_text: `### **Pneumonia (PAC) - Levofloxacino**
(Levofloxacino + Sintomáticos)

# MEDICAÇÕES DE USO IMEDIATO

1) Levofloxacina 750 mg (comprimido)
- Tomar 1 comprimido ao dia durante 7 dias.

2) Acetilcisteína Xarope/Granulado
- Tomar 15 mL ou 1 envelope, 1x/dia, por 5 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES GERAIS
- Retornar se febre > 48h, dispneia, confusão mental.`,
			sections: [
				{
					title: 'Indicação',
					bullets: ['Alergia a Betalactâmicos.', 'Falha de tratamento prévio.', 'Comorbidades.'],
				},
			],
			references: ['SBPT 2018'],
		},
		{
			id: 'pac-cefuroxima-azitro',
			title: 'PAC - Cefuroxima + Azitro',
			tags: ['pneumonia', 'cefuroxima', 'azitromicina'],
			summary: 'Combinação para cobertura estendida.',
			rx_text: `### **PAC (Cefuroxima + Azitromicina)**

1) Cefuroxima 500 mg
- Tomar 1 comprimido de 12/12h por 7 dias.

2) Azitromicina 500 mg
- Tomar 1 comprimido 1x/dia por 7 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}`,
			sections: [{ title: 'Uso', bullets: ['Falha terapêutica', 'Suspeita de atípicos'] }],
			references: ['SBPT 2018'],
		},
		{
			id: 'pac-claritro',
			title: 'PAC - Claritromicina',
			tags: ['pneumonia', 'claritromicina'],
			summary: 'Macrolídeo isolado.',
			rx_text: `### **PAC (Claritromicina)**

1) Claritromicina 500 mg
- Tomar 1 comprimido de 12/12h por 7 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}`,
			sections: [
				{
					title: 'Indicação',
					bullets: ['Alternativa para pacientes jovens, sem comorbidades'],
				},
			],
			references: ['SBPT 2018'],
		},
		{
			id: 'rinosinusite-viral',
			title: 'Rinossinusite Viral',
			tags: ['sinusite', 'resfriado', 'viral'],
			summary: 'Lavagem nasal e sintomáticos.',
			rx_text: `### **Rinossinusite Viral / Resfriado**

1) Lavagem nasal com SF 0,9% abundante.
2) Acetilcisteína xarope/granulado.
3) Anti-histamínico (Loratadina 10mg / Fexofenadina 120mg).
4) Budesonida spray nasal 50mcg (1-2 jatos 12/12h).

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

- Descongestionante tópico (Oximetazolina) se necessário (max 3-5 dias).`,
			sections: [
				{
					title: 'Conduta',
					bullets: ['Não usar antibiótico precocemente', 'Observar evolução'],
				},
			],
			references: ['ABORL 2023'],
		},
		{
			id: 'rinosinusite-bact-1',
			title: 'Rinos. Bacteriana (Amoxicilina)',
			tags: ['sinusite', 'amoxicilina'],
			summary: 'Amoxicilina dose dobrada (875mg).',
			rx_text: `### **Rinossinusite Bacteriana (Amoxicilina)**

1) Amoxicilina 875mg
- Tomar 1 cp 12/12h por 10 dias.

2) Adjuvantes: Lavagem nasal intensa, Corticoide nasal.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}`,
			sections: [
				{
					title: 'Diagnóstico',
					bullets: ['Sintomas > 10 dias', 'Piora após melhora inicial (Double sickening)', 'Febre alta e purulência > 3 dias'],
				},
			],
			references: ['ABORL 2023'],
		},
		{
			id: 'rinosinusite-bact-2',
			title: 'Rinos. Bacteriana (Clavulin)',
			tags: ['sinusite', 'clavulin'],
			summary: 'Amoxicilina-Clavulanato.',
			rx_text: `### **Rinossinusite Bacteriana (Clavulin)**

1) Amoxicilina-Clavulanato 875/125 mg
- Tomar 1 cp 12/12h por 10 dias.

2) Adjuvantes: Lavagem, Corticoide nasal.

${TXT_SINTOMATICOS_GERAL}`,
			sections: [{ title: 'Uso', bullets: ['Falha de Amoxicilina', 'Comorbidades'] }],
			references: ['ABORL 2023'],
		},
		{
			id: 'tosse',
			title: 'Tosse (Sintomáticos)',
			tags: ['tosse'],
			summary: 'Antitussígenos e Mucolíticos.',
			rx_text: `### **Tosse**

1) Cloperastina (Seki/Tilugen) 10mL 8/8h.
2) Acetilcisteína 600mg 1x/dia.
3) Xarope de Guaco (opcional).

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}`,
			sections: [
				{
					title: 'Investigação',
					bullets: ['RX Tórax se > 3 semanas', 'Tratar causa base'],
				},
			],
			references: ['UpToDate'],
		},
		// --- DERMATOLOGIA ---
		{
			id: 'celulite-erisipela-ps',
			title: 'Celulite e Erisipela (PS)',
			tags: ['pele', 'celulite', 'erisipela', 'antibiotico'],
			summary: 'Antibioticoterapia parenteral (Oxacilina/Cefazolina/Ceftriaxona).',
			rx_text: `### **Celulite e Erisipela**
no Pronto Socorro 🏥

**TRATAMENTO AMBULATORIAL OU HOSPITALAR?**
(Classificação de Eron)
- Classe I (Sem sinais sistêmicos): Oral / Ambulatório.
- Classe II (Comorbidades/Dúvida): Internação curta ou Home Care.
- Classe III (Toxicidade) / IV (Sepse): Internação Hospitalar.

**OPÇÕES PARENTERAIS**
- Oxacilina 2g EV 4/4h.
- Cefazolina 1-2g EV 8/8h.
- Ceftriaxona 1g EV 12/12h ou 24/24h.

*Se úlcera diabética/pressão: Ceftriaxona + Ciprofloxacino.*

**TRATAMENTO ADJUVANTE**
- Membro elevado.
- Permanganato de potássio 1:20.000 (banho).`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Toxicidade sistêmica (Sepse).', 'Falha de tratamento oral.', 'Imunossupressão.', 'Suspeita de fasceíte necrotizante.'],
				},
			],
			references: ['NICE 2019', 'Eron Definition'],
		},
		{
			id: 'celulite-sem-mrsa',
			title: 'Celulite - Sem risco MRSA',
			tags: ['celulite', 'cefalexina', 'pele'],
			summary: 'Cefalexina + Naproxeno + Sintomáticos.',
			rx_text: `### **Celulite - Sem fatores de risco para MRSA**
(Cefalexina + Sintomáticos)

### PRESCRIÇÃO

1) Cefalexina 500mg (comprimido)
- Tomar 1 comprimido, via oral, de 6 em 6 horas por 7 dias.

2) Naproxeno 500 mg (comprimido)
- Tomar 1 comprimido com alimentação, uma vez ao dia, durante 5 dias.

3) Compressa de gelo no local afetado (15 min, 6x/dia).

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES GERAIS
- Elevar o membro afetado.
- Retornar se febre > 37,8°C, dor intensa ou aumento da lesão.`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Sinais de sepse', 'Falha oral', 'Imunossupressão'],
				},
			],
			references: ['NICE 2019'],
		},
		{
			id: 'celulite-com-mrsa',
			title: 'Celulite - Com risco MRSA',
			tags: ['celulite', 'mrsa', 'bactrim'],
			summary: 'Sulfametoxazol-Trimetoprima + Sintomáticos.',
			rx_text: `### **Celulite - Com fatores de risco para MRSA**
(Sulfa/Trimetoprima + Sintomáticos)

### PRESCRIÇÃO

1) Sulfametoxazol + trimetoprima 800/160 mg (Bactrim®)
- Tomar 1 comprimido, via oral, de 12 em 12 horas por 7 dias.

2) Naproxeno 500 mg
- Tomar 1 comprimido com alimentação, 1x/dia, por 5 dias.

3) Compressa de gelo.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Fatores MRSA: Uso prévio de ATB, Hospitalização, Esportes contato, Abscessos recorrentes.`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Sepse', 'Falha oral', 'Acometimento profundo'],
				},
			],
			references: ['NICE 2019'],
		},
		{
			id: 'erisipela-leve',
			title: 'Erisipela Leve',
			tags: ['erisipela', 'cefalexina'],
			summary: 'Cefalexina + Naproxeno.',
			rx_text: `### **Erisipela Leve**
(Cefalexina + Sintomáticos)

### PRESCRIÇÃO

1) Cefalexina 500mg
- Tomar 1 comprimido, via oral, de 6 em 6 horas por 7 dias.

2) Naproxeno 500 mg
- Tomar 1 comprimido com alimentação, 1x/dia, por 5 dias.

3) Compressa de gelo.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Piora inicial é comum (toxinas bacterianas).
- Manter repouso e perna elevada.`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Acometimento facial', 'Sepse', 'Falha oral'],
				},
			],
			references: ['NICE 2019'],
		},
		{
			id: 'dermatite-atopica',
			title: 'Dermatite Atópica',
			tags: ['pele', 'alergia', 'eczema'],
			summary: 'Tacrolimo + Hidrocortisona + Anti-histamínico.',
			rx_text: `### **Dermatite Atópica**
(Corticoide + Tacrolimo)

### PRESCRIÇÃO

1) Tacrolimo 0,1% pomada
- Aplicar sobre área afetadas até 2 vezes ao dia.

2) Hidrocortisona creme
- Aplicar sobre área afetadas até 2 vezes ao dia.

3) Anti-histamínico (Loratadina 10mg / Fexofenadina 120mg / Levocetirizina 5mg)
- Tomar 1 cp 12/12h por 5 dias.

4) Prednisolona 40 mg (Se grave/refratário)
- Tomar 1 cp pela manhã por 5 dias.

# MANUTENÇÃO
- Hidratação intensa (Cremes sem cheiro).
- Banhos rápidos e mornos. Sabonete neutro.`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Encaminhar ao dermatologista.', 'Corticoterapia sistêmica em casos graves.'],
				},
			],
			references: ['SBD', 'SBAA'],
		},
		{
			id: 'escabiose',
			title: 'Escabiose (Sarna)',
			tags: ['sarna', 'ivermectina', 'permetrina'],
			summary: 'Ivermectina + Permetrina Tópica + Higiene ambiental.',
			rx_text: `### **Escabiose / Sarna / Pediculose**
(Antiparasitários + Sintomáticos)

# MEDICAÇÃO PARA DE USO IMEDIATO

1) Ivermectina 6mg
- Tomar 2 comprimidos hoje (para ~60kg) e repetir em 7 dias (Dose: 0,2mg/kg).

2) Hidroxizina 25 mg (Hixizine®)
- Tomar 1 cp 12/12h por 5 dias (coceira).

3) Permetrina 1% (Loção)
- Aplicar do pescoço para baixo à noite, lavar de manhã. Repetir em 7 dias.

# RECOMENDAÇÕES AMBIENTAIS (CRUCIAIS)
- Trocar/Lavar roupas de cama e banho com água quente.
- Passar ferro nas roupas.
- Tratar TODOS os contactantes do domicílio simultaneamente.`,
			sections: [
				{
					title: 'Atenção',
					bullets: ['O prurido pode persistir por semanas mesmo após a cura (prurido pós-escabiótico).'],
				},
			],
			references: ['UpToDate'],
		},
		{
			id: 'furunculo',
			title: 'Furúnculo',
			tags: ['pele', 'abscesso', 'cefalexina'],
			summary: 'Cefalexina + Mupirocina + Calor local.',
			rx_text: `### **Furúnculo**
(Cefalexina + Mupirocina + Orientações)

### PRESCRIÇÃO

1) Cefalexina 500 mg
- Tomar 1 comprimido 6/6h por 7 dias.

2) Mupirocina 2% Pomada
- Aplicar 3x/dia por 7 dias.

3) Compressas mornas (20 min 3x/dia).

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES AO PRESCRITOR
- Drenagem se flutuação.
- Internação se face ou sepse.`,
			sections: [],
			references: ['SBD'],
		},
		{
			id: 'herpes-simples-1',
			title: 'Herpes Simples 1 (Labial)',
			tags: ['herpes', 'labial', 'aciclovir'],
			summary: 'Aciclovir + Sintomáticos.',
			rx_text: `### **Herpes Simples 1**
(Aciclovir + Sintomáticos)

### PRESCRIÇÃO

1) Aciclovir 400 mg
- Tomar 1 comprimido, de 8/8h, via oral, por 7 dias.

2) Naproxeno 500 mg
- Tomar 1 comprimido, 1x/dia, por 5 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# NOTA
- Iniciar precocemente (até 72h). Não cura infecção latente.`,
			sections: [],
			references: ['PCDT IST'],
		},
		{
			id: 'herpes-simples-2',
			title: 'Herpes Simples 2 (Genital)',
			tags: ['herpes', 'genital', 'valaciclovir'],
			summary: 'Valaciclovir + Sintomáticos.',
			rx_text: `### **Herpes Simples 2**
(Valaciclovir + Sintomáticos)

### PRESCRIÇÃO

1) Valaciclovir 500 mg
- Tomar 1 comprimido, de 8/8h, via oral, por 7 dias.

2) Naproxeno 500 mg
- Tomar 1 comprimido, 1x/dia, por 5 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# NOTA
- Iniciar precocemente. Abstinência sexual durante lesões.`,
			sections: [],
			references: ['PCDT IST'],
		},
		{
			id: 'impetigo',
			title: 'Impetigo',
			tags: ['pele', 'bacteriana', 'infancia', 'cefalexina'],
			summary: 'Cefalexina + Higiene + Mupirocina (opcional).',
			rx_text: `### **Impetigo**
(Cefalexina + Sintomáticos + Orientações)

### PRESCRIÇÃO

1) Cefalexina 500 mg
- Tomar 1 comprimido, 6/6h por 7 dias.

2) Higiene das lesões com água + sabão neutro.
- Remover crostas suavemente.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Afastar de escola/creche por 24h após início do ATB.
- Altamente contagioso.`,
			sections: [],
			references: ['SBD'],
		},
		{
			id: 'insolacao',
			title: 'Insolação / Queimadura Solar',
			tags: ['pele', 'sol', 'calamina'],
			summary: 'Calamina + Hidratação + Analgesia.',
			rx_text: `### **Insolação**
(Calamina + Sintomáticos)

### PRESCRIÇÃO

1) Calamina 8% Loção
- Aplicar 3x/dia por 5 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Compressas frias. Hidratação oral vigorosa.
- Não estourar bolhas.`,
			sections: [],
			references: ['UpToDate'],
		},
		{
			id: 'larva-migrans',
			title: 'Larva Migrans (Bicho Geográfico)',
			tags: ['pele', 'parasita', 'ivermectina'],
			summary: 'Ivermectina dose única.',
			rx_text: `### **Larva Migrans Cutânea**
(Ivermectina + Orientações)

# MEDICAÇÃO PARA USO IMEDIATO

1) Ivermectina 6mg
- Tomar 2 comprimidos hoje (dose única para ~60kg).
- Repetir em 7 dias se necessário.

# RECOMENDAÇÕES
- Gelo local para coceira.
- Doença autolimitada, mas tratamento acelera cura.`,
			sections: [],
			references: ['CDC'],
		},
		{
			id: 'onicocriptose',
			title: 'Onicocriptose (Unha Encravada)',
			tags: ['unha', 'inflamacao', 'nebacetin'],
			summary: 'Antibiótico tópico/sistêmico + Cuidados.',
			rx_text: `### **Onicocriptose**
(Antibiótico + Sintomáticos)

### PRESCRIÇÃO

1) Nebacetin pomada
- Aplicar 3x/dia por 7 dias.

2) Higiene com água e sabão neutro.

3) Naproxeno 500 mg (se dor intensa)
- Tomar 1 cp 1x/dia por 5 dias.

*Se infecção importante/celulite: Cefalexina 500mg 6/6h.*

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Evitar calçados apertados.
- Encaminhar para tratamento definitivo se recorrente.`,
			sections: [],
			references: ['SBD'],
		},
		{
			id: 'tinea-pedis',
			title: 'Tinea Pedis (Pé de Atleta)',
			tags: ['fungo', 'pe', 'cetoconazol'],
			summary: 'Antifúngico tópico (Cetoconazol).',
			rx_text: `### **Tinea Pedis**
(Cetoconazol + Orientações)

### PRESCRIÇÃO

1) Cetoconazol 2% Creme
- Aplicar nas lesões 12/12h por 30 dias.

# RECOMENDAÇÕES GERAIS
- Secar bem os pés e entre os dedos.
- Usar talco antisséptico.
- Meias de algodão.
- Desinfetar calçados (Lysoform).`,
			sections: [],
			references: ['SBD'],
		},
		{
			id: 'tungiase',
			title: 'Tungíase (Bicho de Pé)',
			tags: ['pele', 'parasita', 'ivermectina'],
			summary: 'Ivermectina ou Extração.',
			rx_text: `### **Tungíase**
(Ivermectina + Orientações)

# MEDICAÇÃO

1) Ivermectina 6mg
- 200mcg/kg Dose Única. (Uso se disseminado).

*Se poucas lesões: Extração estéril.*

# RECOMENDAÇÕES
- Usar calçados fechados.`,
			sections: [],
			references: ['SBD'],
		},
		// --- UROLOGIA E NEFROLOGIA ---
		{
			id: 'cistite-1',
			title: 'Cistite - Fosfomicina (Monuril)',
			tags: ['cistite', 'urologia', 'monuril', 'fosfomicina'],
			summary: 'Fosfomicina Dose Única + Pyridium + Sintomáticos.',
			rx_text: `### **Cistite | ITU Baixa 1**
(Fosfomicina + Sintomáticos + Orientações)

### PRESCRIÇÃO

1) Fosfomicina Trometamol 5,631g Envelope (Monuril®)
- Dissolver em meio copo de água e tomar ao deitar (esvaziar bexiga antes). Dose Única.

2) Fenazopiridina 200mg (Pyridium®)
- Tomar 1 comprimido, via oral, de 8 em 8 horas, durante 2 dias (Analgesia urinária).

3) Hidratação vigorosa.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

- Buscopan Composto 1 cp 6/6h se cólica.

# RECOMENDAÇÕES
- Urina pode ficar laranja/vermelha devido ao Pyridium.
- Não precisa de urocultura de controle se melhora.`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Sepse', 'Obstrução urinária', 'Intolerância oral'],
				},
			],
			references: ['SBU 2022'],
		},
		{
			id: 'cistite-2',
			title: 'Cistite - Nitrofurantoína',
			tags: ['cistite', 'urologia', 'nitrofurantoina', 'macrodantina'],
			summary: 'Nitrofurantoína 5-7 dias + Pyridium.',
			rx_text: `### **Cistite | ITU Baixa 2**
(Nitrofurantoína + Sintomáticos + Orientações)

### PRESCRIÇÃO

1) Nitrofurantoína 100mg
- Tomar 1 comprimido 6/6h durante 7 dias.

2) Fenazopiridina 200mg (Pyridium®)
- Tomar 1 comprimido 8/8h por 2 dias.

3) Hidratação vigorosa.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

- Buscopan Composto 1 cp 6/6h se cólica.

# NOTAS
- Nitrofurantoína deve ser evitada se TFG < 30.
- Urina laranja (Pyridium).`,
			sections: [],
			references: ['SBU 2022'],
		},
		{
			id: 'cistite-gestante',
			title: 'Cistite - Gestante',
			tags: ['cistite', 'gestante', 'cefuroxima'],
			summary: 'Cefuroxima + Pyridium.',
			rx_text: `### **Cistite | ITU Baixa | Gestante**
(Cefuroxima + Sintomáticos + Orientações)

### PRESCRIÇÃO

1) Cefuroxima 250 mg
- Tomar 1 comprimido 12/12h por 7 dias.

2) Fenazopiridina 200mg (Pyridium®)
- Tomar 1 comprimido 8/8h por 2 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

- Buscopan Composto 1 cp 6/6h se cólica.

# RECOMENDAÇÕES
- Sempre solicitar urocultura de controle em gestantes.
- Retornar se febre ou dor lombar (Pielonefrite).`,
			sections: [
				{
					title: 'Atenção',
					bullets: ['Gestantes têm maior risco de pielonefrite.', 'Fosfomicina também pode ser usada (Cat B).'],
				},
			],
			references: ['Febrasgo'],
		},
		{
			id: 'pielonefrite',
			title: 'Pielonefrite (ITU Alta)',
			tags: ['rim', 'pielonefrite', 'clavulin'],
			summary: 'Amoxicilina-Clavulanato + Sintomáticos (Ambulatorial).',
			rx_text: `### **Pielonefrite | ITU Alta**
(Amoxicilina/Clav + Sintomáticos + Orientações)

### PRESCRIÇÃO

1) Amoxicilina-Clavulanato 875/125 mg
- Tomar 1 comprimido 12/12h por 10 dias.

2) Fenazopiridina 200mg (Pyridium®)
- Tomar 1 comprimido 8/8h por 2 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

- Buscopan Composto 1 cp 6/6h se cólica.

# RECOMENDAÇÕES
- Retornar em 48-72h para reavaliação.
- Se febre persistente > 72h: Internação/Reavaliação.`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Gestantes', 'Sepse', 'Vômitos incoercíveis', 'Rim único', 'Obstrução'],
				},
			],
			references: ['SBU 2022'],
		},
		{
			id: 'ureterolitiase-ps',
			title: 'Cóica Renal / Ureterolitíase (PS)',
			tags: ['colica', 'rim', 'pedra', 'ps'],
			summary: 'Analgesia + AINEs + Opióides (PS).',
			rx_text: `### **Ureterolitíase (Cálculo Ureteral)**
no Pronto Socorro 🏥

**ANALGESIA (Escalada)**
1. AINEs (1ª Linha):
   - Tenoxicam 20-40mg EV ou Cetoprofeno 100mg EV.
   
2. Opióides (Se dor intensa/refratária):
   - Tramadol 50-100mg EV (Diluído).
   - Morfina 2-4mg EV (Titulando).

3. Antiespasmódicos (Adjuntos, eficácia menor):
   - Escopolamina (Buscopan) 20mg EV.

**CONDUTA DIAGNÓSTICA**
- TC de Abdome Total s/ Contraste (Padrão Ouro).
- USG de Vias Urinárias (Opção).
- Exames: Creatinina, EAS, Hemograma, PCR.

**CRITÉRIOS DE INTERNAÇÃO**
- Cálculo > 10mm.
-  Infecção associada (Pielonefrite obstrutiva = Emergência Urológica).
- Rim único / Anúria.
- Dor incontrolável.`,
			sections: [],
			references: ['SBU', 'AUA'],
		},
		{
			id: 'ureterolitiase-alta',
			title: 'Cólica Renal - Alta',
			tags: ['colica', 'rim', 'tansulosina'],
			summary: 'Tansulosina + AINEs + Analgesia.',
			rx_text: `### **Ureterolitíase - Alta**
(Tansulosina + Antibiótico Se indicado + Sintomáticos)

### PRESCRIÇÃO

1) Tansulosina 0,4 mg
- Tomar 1 comprimido, 1x/dia, por 4 semanas (Expulsão do cálculo).

2) Naproxeno 500 mg
- Tomar 1 cp 12/12h por 5 dias (Anti-inflamatório).

3) Tramadol 50mg (Resgate)
- Tomar 1 cp 8/8h SE dor intensa refratária.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

- Buscopan Composto 1 cp 6/6h.

# RECOMENDAÇÕES
- Peneirar urina para tentar recuperar o cálculo.
- Hidratação normal (não hiper-hidratar na crise).`,
			sections: [
				{
					title: 'Observação',
					bullets: ['Cálculos < 5mm têm > 90% chance de eliminação espontânea.'],
				},
			],
			references: ['SBU'],
		},
		{
			id: 'uretrite',
			title: 'Uretrite (Gonorreia/Clamídia)',
			tags: ['dst', 'ist', 'uretrite', 'ceftriaxona'],
			summary: 'Ceftriaxona IM + Azitromicina VO.',
			rx_text: `### **Uretrite no Homem**
(Ceftriaxona + Azitromicina + Sintomáticos)

### PRESCRIÇÃO

1) Ceftriaxona 500 mg
- Aplicar 1 ampola IM, dose única.

2) Azitromicina 500 mg
- Tomar 2 comprimidos (1g) via oral, dose única.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Tratar parceiros sexuais.
- Abstinência sexual por 7 dias.
- Sorologias para HIV, Sífilis, Hepatites.
- Retornar se secreção persistir.`,
			sections: [],
			references: ['PCDT IST 2022'],
		},
		// --- GASTROENTEROLOGIA ---
		{
			id: 'constipacao',
			title: 'Constipação Funcional',
			tags: ['gastro', 'constipacao', 'intestino', 'preso', 'lactulose'],
			summary: 'Fibras + Lactulose + Hidratação.',
			rx_text: `### **Constipação Funcional**
(Sintomáticos + Orientações)

### PRESCRIÇÃO

1) Hidratação vigorosa
- Ingerir 2 a 3 litros de água por dia.

2) Plantago Ovata (Fibrems®/Metamucil®)
- Diluir 1 envelope em 240 mL de água, via oral, 3 vezes ao dia.

3) Lactulose 667mg/mL
- Tomar 15 mL, via oral, 1x/dia. Ajustar conforme resposta.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Aumentar fibras na dieta (leguminosas, grãos, frutas com casca).
- Praticar exercícios físicos.
- Tentar evacuar após refeições (Reflexo gastrocólico).`,
			sections: [
				{
					title: 'Recomendações ao Prescritor',
					bullets: ['Tratamento inicial é não farmacológico.', 'Descartar causas secundárias.'],
				},
				{
					title: 'Internação Hospitalar',
					bullets: ['Abdome agudo', 'Instabilidade', 'Oclusão intestinal'],
				},
			],
			references: ['ASCRS 2016'],
		},
		{
			id: 'diarreia-nao-infecciosa',
			title: 'Diarreia Aguda (Não Infecciosa)',
			tags: ['gastro', 'diarreia', 'virose', 'gea'],
			summary: 'Hidratação + Racecadotrila + Floratil.',
			rx_text: `### **Diarreia | Gastroenterite (GEA) Não Infecciosa**
(Racecadotrila + Sintomáticos)

### PRESCRIÇÃO

1) Racecadotrila 100mg (Tiorfan®)
- Tomar 1 comprimido 8/8h antes das refeições por até 7 dias.

2) Floratil® 200 mg (Saccharomyces boulardii)
- Tomar 1 comprimido 12/12h por 3 dias.

3) Simeticona 125mg (Se gases)
- Tomar 1 comprimido 1x/dia.

4) Hidratação Vigorosa (SRO - Soro Oral)
- Tomar após cada evacuação líquida.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}
- Buscopan Composto 6/6h se cólica.

# RECOMENDAÇÕES
- Dieta leve (evitar leite, gorduras, doces).
- Não usar Loperamida (Imosec) se suspeita de disenteria.`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Desidratação grave', 'Vômitos incoercíveis'],
				},
			],
			references: ['MS 2022'],
		},
		{
			id: 'diarreia-infecciosa-annita',
			title: 'Diarreia - Antiparasitário (Annita)',
			tags: ['gastro', 'diarreia', 'verme', 'annita'],
			summary: 'Nitazoxanida (Annita) + Sintomáticos.',
			rx_text: `### **Diarreia | GEA Infecciosa / Antiparasitários**
(Nitazoxanida + Sintomáticos)

### PRESCRIÇÃO

1) Nitazoxanida 500mg (Annita®)
- Tomar 1 comprimido 12/12h por 3 dias.

2) Floratil® 200 mg
- Tomar 1 comprimido 12/12h por 3 dias.

3) Hidratação Vigorosa.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}
- Buscopan Composto 6/6h se cólica.

# RECOMENDAÇÕES
- Evitar álcool.
- Retornar se febre > 48h ou sangue nas fezes.`,
			sections: [],
			references: ['MS 2022'],
		},
		{
			id: 'diarreia-bact-cipro',
			title: 'Diarreia Bacteriana (Ciprofloxacino)',
			tags: ['gastro', 'diarreia', 'antibiotico', 'cipro'],
			summary: 'Ciprofloxacino + Floratil.',
			rx_text: `### **Diarreia Bacteriana (Ciprofloxacino)**
(Ciprofloxacino + Sintomáticos)

### PRESCRIÇÃO

1) Ciprofloxacino 500 mg
- Tomar 1 comprimido 12/12h por 5 dias.

2) Floratil® 200 mg
- Tomar 1 comprimido 12/12h por 3 dias.

3) Hidratação Vigorosa.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Não usar Loperamida.
- Indicado se disenteria (sangue/muco) e febre.`,
			sections: [],
			references: ['MS 2022'],
		},
		{
			id: 'diarreia-bact-azitro',
			title: 'Diarreia Bacteriana (Azitromicina)',
			tags: ['gastro', 'diarreia', 'antibiotico', 'azitromicina'],
			summary: 'Azitromicina + Floratil.',
			rx_text: `### **Diarreia Bacteriana (Azitromicina)**
(Azitromicina + Sintomáticos)

### PRESCRIÇÃO

1) Azitromicina 500 mg
- Tomar 1 comprimido 1x/dia por 5 dias.

2) Floratil® 200 mg
- Tomar 1 comprimido 12/12h por 3 dias.

3) Hidratação Vigorosa.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Opção para gestantes ou crianças (dose pediátrica).`,
			sections: [],
			references: ['MS 2022'],
		},
		{
			id: 'diverticulite-clavulin',
			title: 'Diverticulite - Clavulin',
			tags: ['gastro', 'diverticulite', 'clavulin', 'antibiotico'],
			summary: 'Amoxicilina-Clavulanato + Dieta líquida.',
			rx_text: `### **Diverticulite Aguda Não Complicada**
(Amoxicilina/Clavulanato + Sintomáticos)

### PRESCRIÇÃO

1) Amoxicilina-Clavulanato 875/125 mg
- Tomar 1 comprimido 12/12h por 10 dias.

2) Dieta líquida/pastosa sem resíduos (3-5 dias).
- Evitar fibras, grãos, cascas.
- Preferir caldos, gelatinas, sucos coados.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}
- Buscopan Composto 6/6h se cólica.

# RECOMENDAÇÕES
- Retornar em 48-72h para reavaliação.
- Introduzir fibras gradualmente após melhora.`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Idosos', 'Imunossuprimidos', 'Febre alta', 'Dor persistente', 'Intolerância oral'],
				},
			],
			references: ['ASCRS 2020'],
		},
		{
			id: 'diverticulite-cipro-metro',
			title: 'Diverticulite - Cipro + Metro',
			tags: ['gastro', 'diverticulite', 'cipro', 'metronidazol'],
			summary: 'Ciprofloxacino + Metronidazol + Dieta.',
			rx_text: `### **Diverticulite Aguda Não Complicada**
(Ciprofloxacino + Metronidazol + Sintomáticos)

### PRESCRIÇÃO

1) Ciprofloxacino 500mg
- Tomar 1 comprimido 12/12h por 10 dias.

2) Metronidazol 500mg
- Tomar 1 comprimido 8/8h por 10 dias.

3) Dieta líquida/pastosa sem resíduos (3-5 dias).

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Proibido álcool (Metronidazol).
- Alternativa para alérgicos a Penicilina.`,
			sections: [],
			references: ['ASCRS 2020'],
		},
		{
			id: 'drge',
			title: 'DRGE / Gastrite / Dispepsia',
			tags: ['gastro', 'estomago', 'boca', 'refluxo', 'pantoprazol'],
			summary: 'IBP (Pantoprazol) + Domperidona + Medidas.',
			rx_text: `### **Doença do Refluxo (DRGE) / Dispepsia**
(Pantoprazol + Domperidona + Sintomáticos)

### PRESCRIÇÃO

1) Pantoprazol 40 mg
- Tomar 1 comprimido em jejum, 1x/dia, por 10-30 dias.

2) Domperidona 10 mg (Se empachamento/náusea)
- Tomar 1 comprimido 30 min antes do almoço e jantar.

3) Mylanta Plus (Se azia)
- 1 colher se sintomas.

# RECOMENDAÇÕES COMPORTAMENTAIS (FUNDAMENTAL)
- Não deitar após refeições (pelo menos 2h).
- Elevar cabeceira da cama.
- Evitar café, álcool, gorduras, menta, chocolate, tomate.
- Se fumante, cessar tabagismo.`,
			sections: [],
			references: ['ACG 2022', 'FBG 2024'],
		},
		{
			id: 'hemorroida',
			title: 'Hemorroida',
			tags: ['gastro', 'anus', 'proctyl', 'hemorroida'],
			summary: 'Pomada (Proctyl) + Banho de Assento + Fibras.',
			rx_text: `### **Hemorróida**
(Proctyl + AINEs + Orientações)

### PRESCRIÇÃO

1) Proctyl Pomada
- Aplicar na região anal 2-3x/dia por 7 dias.

2) Banho de Assento (Água morna)
- 15 min 2-3x/dia (principalmente após evacuar).

3) Naproxeno 500 mg
- Tomar 1 comprimido 1x/dia por 5 dias (se dor).

4) Dieta rica em fibras e líquidos.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

- Se constipação: Muvinlax ou Lactulose.

# RECOMENDAÇÕES
- Evitar papel higiênico (lavar ou usar lenço umedecido).
- Não ficar muito tempo sentado no vaso.
- Retorno com proctologista.`,
			sections: [],
			references: ['ASCRS 2018'],
		},
		// --- NEUROLOGIA E PSIQUIATRIA ---
		{
			id: 'agitacao-ps',
			title: 'Agitação Psicomotora (PS)',
			tags: ['psiquiatria', 'ps', 'agitacao', 'haloperidol', 'diazepam'],
			summary: 'Descalonamento verbal + Medicação (Diazepam/Haloperidol).',
			rx_text: `### **Agitação Psicomotora**
no Pronto Socorro 🏥

**1. ABORDAGEM NÃO MEDICAMENTOSA (1ª Linha)**
- Descalonamento Verbal.
- Ambiente calmo, evitar confronto.

**2. ABORDAGEM MEDICAMENTOSA**
*Preferência VO:*
- Diazepam 5-10mg OU Clonazepam 0,5-2mg.

*Via Parenteral (Se recusa VO/Risco iminente):*
- Haloperidol 5mg IM (Repetir cada 30min se necessário, máx 20mg).
- Prometazina 50mg IM (Associar ao Haldol para sedação/prevenção de distonia).
- Midazolam 5-10mg IM (Se agitação grave/risco de lesão).

*Atenção:* Se intoxicação por álcool, evitar benzo. Prefira Haldol.

**3. CONTENÇÃO MECÂNICA**
- Último recurso. Equipe treinada (5 pessoas).`,
			sections: [],
			references: ['APA', 'Emergência 2024'],
		},
		{
			id: 'cefaleia-tensional-ps',
			title: 'Cefaleia Tensional (PS)',
			tags: ['cefaleia', 'dor', 'ps', 'analgesia'],
			summary: 'Analgesia Simples + AINE.',
			rx_text: `### **Cefaleia Tensional - PS**

**TRATAMENTO**
1. Dipirona 1g EV.
2. Cetoprofeno 100mg EV.

*Se refratário:* Avaliar diagnósticos diferenciais.`,
			sections: [],
			references: ['ABN 2018'],
		},
		{
			id: 'enxaqueca-ps',
			title: 'Enxaqueca / Migrânea (PS)',
			tags: ['enxaqueca', 'migranea', 'ps', 'dor'],
			summary: 'AINE + Antiemético + Dexametasona (Se > 72h).',
			rx_text: `### **Enxaqueca - PS**

**1. ANALGESIA + ANTIEMÉTICO**
- Dipirona 1g EV + Cetoprofeno 100mg EV.
- Metoclopramida 10mg EV (Ajuda na crise mesmo sem vômito).

**2. SE REFRATÁRIO OU > 72h (Estado Migranoso)**
- Dexametasona 10mg EV.
- Sumatriptano 6mg SC (Se disponível).

**3. RED FLAGS (TC CRÂNIO)**
- Início súbito (Thunderclap).
- Pior da vida.
- Déficit focal.
- Febre/Rigidez nuca.`,
			sections: [],
			references: ['ABN 2018'],
		},
		{
			id: 'cefaleia-tensional-alta',
			title: 'Cefaleia Tensional (Alta)',
			tags: ['cefaleia', 'dor', 'alta'],
			summary: 'Naproxeno + Dipirona.',
			rx_text: `### **Cefaleia Tensional**
(Naproxeno + SOS + Orientações)

### PRESCRIÇÃO

1) Naproxeno 500 mg
- Tomar 1 comprimido 1x/dia por 5 dias.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Evitar estresse e privação de sono.
- Não usar opióides.`,
			sections: [],
			references: ['ABN 2018'],
		},
		{
			id: 'enxaqueca-alta',
			title: 'Enxaqueca (Alta)',
			tags: ['enxaqueca', 'migranea', 'sumatriptano'],
			summary: 'Naproxeno + Sumatriptano (Resgate).',
			rx_text: `### **Cefaleia Tipo Enxaqueca**
(Naproxeno + Sumatriptano + Orientações)

### PRESCRIÇÃO

1) Naproxeno 500 mg
- Tomar 1 comprimido 1x/dia por 5 dias.

2) Sumatriptano 50mg (Se crise forte)
- Tomar 1 comprimido. Máx 4/dia.

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

- Plasil (Metoclopramida) se náusea.

# RECOMENDAÇÕES
- Evitar gatilhos (Queijo, Vinho, Jejum).
- Repouso em local escuro na crise.`,
			sections: [],
			references: ['ABN 2018'],
		},
		{
			id: 'ansiedade-ps',
			title: 'Crise de Ansiedade (PS)',
			tags: ['ansiedade', 'panico', 'ps', 'benzodiazepine'],
			summary: 'Acolhimento + Benzodiazepínico (Se necessário).',
			rx_text: `### **Crise de Ansiedade - PS**

**1. NÃO MEDICAMENTOSO (1ª Linha)**
- Acolhimento, empatia.
- Respiração diafragmática.
- "Isso é uma crise, vai passar em 10-30 min".

**2. MEDICAMENTOSO (Se intenso/refratário)**
- Clonazepam 0,5mg VO (ou 5-10 gotas).
- Alprazolam 0,5mg VO.
- Diazepam 5mg VO.

*Encaminhar para Psicologia/Psiquiatria.*`,
			sections: [],
			references: ['APA'],
		},
		{
			id: 'ansiedade-alta',
			title: 'Ansiedade Leve (Fitoterápico)',
			tags: ['ansiedade', 'calmante', 'passiflora'],
			summary: 'Passiflora (Calman) + Orientações.',
			rx_text: `### **Crise de Ansiedade**
(Passiflora + Orientações)

### PRESCRIÇÃO

1) Passiflora incarnata (Calman®, Pasalix®)
- Tomar 1 comprimido 12/12h por 3 dias.

# RECOMENDAÇÕES
- Higiene do sono.
- Atividade física.
- Evitar cafeína/estimulantes.`,
			sections: [],
			references: ['ABP'],
		},
		{
			id: 'paralisia-facial',
			title: 'Paralisia de Bell',
			tags: ['paralisia', 'facial', 'prednisona', 'corticoide'],
			summary: 'Corticoterapia alta dose (Prednisona) + Cuidados oculares.',
			rx_text: `### **Paralisia Facial Periférica**
(Corticoides + Colírio + Orientações)

### PRESCRIÇÃO

1) Prednisona 20mg
- Esquema regressivo (Total 10 dias):
  - Dias 1-5: 60mg (3 cp) pela manhã.
  - Dia 6: 50mg.
  - Dia 7: 40mg.
  - Dia 8: 30mg.
  - Dia 9: 20mg.
  - Dia 10: 10mg.

2) Colírio Lubrificante (Lágrima artificial)
- Pingar no olho afetado várias vezes ao dia (olho não fecha).

3) Oclusão noturna do olho com pomada (Retinol) e curativo.

# RECOMENDAÇÕES
- Proteger o olho é fundamental para evitar úlcera de córnea.
- Retornar se dor intensa ou vesículas (Herpes Zoster Ótico?).`,
			sections: [],
			references: ["Bell's Palsy Guideline"],
		},
		{
			id: 'vertigem',
			title: 'Vertigem / Labirintite',
			tags: ['tontura', 'labirintite', 'vertix', 'dramin'],
			summary: 'Flunarizina (Vertix) + Dramin.',
			rx_text: `### **Vertigem Periférica**
(Flunarizina + Sintomáticos)

### PRESCRIÇÃO

1) Flunarizina 10 mg (Vertix®)
- Tomar 1 comprimido à noite por 7 dias.

2) Dimenidrinato + B6 (Dramin B6)
- Tomar 1 comprimido de 6/6h se tontura/vômito.

# RECOMENDAÇÕES
- Cuidado ao levantar.
- Evitar dirigir.`,
			sections: [
				{
					title: 'Atenção',
					bullets: ['Excluir causas centrais (HINTS).', 'Vertigem persistente > dias ou déficit focal = Neuroimagem.'],
				},
			],
			references: ['ABORL'],
		},

		// --- GINECOLOGIA E OBSTETRÍCIA ---
		{
			id: 'candididase-leve',
			title: 'Candidíase (Leve)',
			tags: ['ginecologia', 'candidiase', 'fluconazol'],
			summary: 'Fluconazol dose única OU Creme vaginal (Miconazol/Nistatina).',
			rx_text: `### **Candidíase Vulvovaginal**
(Fluconazol + Creme Opcional)

### PRESCRIÇÃO

1) Fluconazol 150mg
- Tomar 1 comprimido, dose única.

OU

2) Miconazol 2% Creme Vaginal
- Aplicar 1 aplicador cheio à noite por 7 dias.

# RECOMENDAÇÕES
- Gestantes: APENAS creme vaginal (Miconazol ou Nistatina).
- Evitar roupas apertadas e sintéticas.
- Abstinência sexual durante tratamento.`,
			sections: [],
			references: ['PCDT IST 2022'],
		},
		{
			id: 'candididase-recorrente',
			title: 'Candidíase (Intensa/Recorrente)',
			tags: ['ginecologia', 'candidiase', 'fluconazol'],
			summary: 'Fluconazol 3 doses (D1, D4, D7) + Creme.',
			rx_text: `### **Candidíase - Sintomas Intensos**
(Esquema sequencial)

### PRESCRIÇÃO

1) Fluconazol 150mg
- Tomar 1 comprimido nos dias 1, 4 e 7. (Total 3 comprimidos).

2) Miconazol 2% Creme
- Aplicar por 10-14 dias à noite.

# RECOMENDAÇÕES
- Investigar diabetes ou imunossupressão se recorrente.`,
			sections: [],
			references: ['CDC', 'PCDT IST'],
		},
		{
			id: 'contracepcao-emergencia',
			title: 'Contracepção de Emergência',
			tags: ['dia', 'seguinte', 'pilula', 'levonorgestrel'],
			summary: 'Levonorgestrel (Pílula do dia seguinte).',
			rx_text: `### **Contracepção de Emergência**
(Levonorgestrel)

### PRESCRIÇÃO

1) Levonorgestrel 1,5mg (Dose Única)
- Tomar 1 comprimido o mais rápido possível (< 72h).
- (Ou 2 cp de 0,75mg juntos).

# RECOMENDAÇÕES
- Se vomitar em < 2h, repetir dose.
- Pode alterar o próximo ciclo menstrual.`,
			sections: [],
			references: ['FEBRASGO'],
		},
		{
			id: 'dip',
			title: 'DIP (Doença Inflamatória Pélvica)',
			tags: ['dip', 'ginecologia', 'ist', 'antibiotico'],
			summary: 'Ceftriaxona + Doxiciclina + Metronidazol.',
			rx_text: `### **Doença Inflamatória Pélvica (DIP)**
(Tratamento Ambulatorial)

### PRESCRIÇÃO

1) Ceftriaxona 500mg
- IM Dose Única.

2) Doxiciclina 100mg
- Tomar 1 comprimido 12/12h por 14 dias.

3) Metronidazol 500mg
- Tomar 1 comprimido 12/12h por 14 dias.

# RECOMENDAÇÕES
- Repouso e abstinência sexual.
- Tratar parceiro (Uretrite).
- Retornar em 72h para reavaliação OBRIGATÓRIA.`,
			sections: [
				{
					title: 'Internação Hospitalar',
					bullets: ['Gestantes', 'Abscesso tubo-ovariano', 'Sem melhora em 72h', 'Febre alta/Toxemia'],
				},
			],
			references: ['PCDT IST 2022'],
		},
		{
			id: 'herpes-genital',
			title: 'Herpes Genital',
			tags: ['herpes', 'ist', 'aciclovir'],
			summary: 'Aciclovir + Sintomáticos.',
			rx_text: `### **Herpes Genital**
(Aciclovir + Sintomáticos)

### PRESCRIÇÃO

1) Aciclovir 400 mg
- Tomar 1 comprimido de 8/8h por 7 dias.
- (Ou Valaciclovir 500mg 12/12h por 5 dias).

# USAR EM CASO DE SINTOMAS

${TXT_SINTOMATICOS_GERAL}

# RECOMENDAÇÕES
- Iniciar precocemente.
- Cesariana indicada se lesões ativas no parto.`,
			sections: [],
			references: ['PCDT IST'],
		},
		{
			id: 'tricomoniase',
			title: 'Tricomoníase',
			tags: ['ist', 'corrimento', 'metronidazol'],
			summary: 'Metronidazol 2g Dose Única.',
			rx_text: `### **Tricomoníase**
(Metronidazol + Orientações)

### PRESCRIÇÃO

1) Metronidazol 250mg
- Tomar 8 comprimidos (2g) de uma vez só (Dose Única).
- (Alternativa: 500mg 12/12h por 7 dias).

# RECOMENDAÇÕES
- Tratar parceiro.
- PROIBIDO ácool durante tratamento (Efeito Antabuse).`,
			sections: [],
			references: ['PCDT IST'],
		},
		{
			id: 'costocondrite',
			title: 'Costocondrite',
			tags: ['dor', 'toracica', 'inflamacao'],
			summary: 'AINEs + Calor local.',
			rx_text: `### **Costocondrite**
(Naproxeno + Sintomáticos)

### PRESCRIÇÃO

1) Naproxeno 500 mg
- Tomar 1 comprimido 12/12h por 5-7 dias.

2) Compressas mornas no local.

# RECOMENDAÇÕES
- Doença benigna autolimitada.
- Excluir causas cardíacas/pulmonares antes.`,
			sections: [],
			references: ['UpToDate'],
		},
	];

	// ============================================
	// FUNÇÕES
	// ============================================
	function getProtocoloById(id) {
		return protocolos.find((p) => p.id === id) || null;
	}

	function getAllProtocolos() {
		return protocolos;
	}

	function buscarProtocolos(termo) {
		termo = termo.toLowerCase();
		return protocolos.filter((p) => p.title.toLowerCase().includes(termo) || p.tags.some((tag) => tag.toLowerCase().includes(termo)) || p.summary.toLowerCase().includes(termo));
	}

	// ============================================
	// EXPÕE API GLOBAL
	// ============================================
	window.ProtocolosAsma = {
		get: getProtocoloById,
		getAll: getAllProtocolos,
		buscar: buscarProtocolos,
		protocolos: protocolos,
	};

	// Registra no sistema global de protocolos (se existir)
	if (window.protocolosClinica) {
		window.protocolosClinica = window.protocolosClinica.concat(protocolos);
	} else {
		window.protocolosClinica = protocolos;
	}
})();
