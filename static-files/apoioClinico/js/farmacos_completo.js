// farmacos-completo.js
(() => {
	'use strict';

	// farmacos_completo.js - Dados farmacológicos pediátricos
	// Baseado no Manual de Sobrevivência do Residente de Pediatria - HIAS
	// Atualizado em: Julho – 2017

	const farmacos = {
		// ============================================
		// CATEGORIA: Antimicrobianos
		// ============================================
		antibioticos: {
			ampicilina: {
				name: 'AMPICILINA',
				category: 'Antimicrobianos',
				presentation: 'SUSPENSÃO: 250mg/5ml<br>ENDOVENOSO: 500mg ; 1000mg -> 100mg/ml (Rediluir para 10ml AD)',
				dose: '100mg/kg/dia 6/6h',
				practicalRule: 'Regra prática (EV): Peso/4 em ml',
				renalAdjustment: 'CICr 10-30 -> aumentar intervalo para 8/8h ou 12/12h<br>CICr < 10 -> aumentar intervalo para 12/12h',
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const dailyDoseMg = weight * 100;
					const singleDoseMg = dailyDoseMg / 4; // 6/6h = 4 doses ao dia
					const evDoseMl = weight / 4;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 6h`,
						practicalDose: `${evDoseMl.toFixed(1)} ml por dose (EV)`,
						details: `Dose diária total: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 100 mg/kg/dia)<br>Dividido em 4 doses: ${singleDoseMg.toFixed(1)} mg a cada 6 horas`,
					};
				},
			},

			amicacina: {
				name: 'AMICACINA',
				category: 'Antimicrobianos',
				presentation: 'ENDOVENOSO: 100mg/2ml (50mg/ml)',
				dose: '15mg/kg/dia 8/8h ou 1x/dia (máximo 1,5g/dia)',
				practicalRule: null,
				renalAdjustment: 'CICr 30-50 -> aumentar intervalo para 12/12h ou 18/18h<br>CICr 10-29 -> aumentar intervalo para 18/18h ou 24/24h<br>CICr < 10 -> aumentar intervalo para 48/48h ou 72/72h',
				maxDose: 'Máximo 1,5g/dia',
				notes: 'Diluição: 5mg/ml em SF0,9% ou AD',
				calculate: function (weight) {
					const dailyDoseMg = weight * 15;
					const singleDoseMg = dailyDoseMg / 3; // 8/8h = 3 doses ao dia
					const maxDose = 1500; // 1.5g

					let calculatedDose = dailyDoseMg;
					if (calculatedDose > maxDose) calculatedDose = maxDose;

					return {
						dailyDose: `${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg/dia`,
						singleDose: `${(Math.min(dailyDoseMg, maxDose) / 3).toFixed(1)} mg a cada 8h`,
						practicalDose: null,
						details: `Dose diária total: ${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg (${weight} kg × 15 mg/kg/dia)<br>Dividido em 3 doses: ${(Math.min(dailyDoseMg, maxDose) / 3).toFixed(1)} mg a cada 8 horas${
							dailyDoseMg > maxDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxDose} mg/dia</span>` : ''
						}`,
					};
				},
			},

			amoxicilina: {
				name: 'AMOXICILINA',
				category: 'Antimicrobianos',
				presentation: 'SUSPENSÃO: 250mg/5ml (VELAMOX) ou 400mg/5ml (SINOT)',
				dose: '50mg/kg/dia 8/8h // 80-90mg/kg/dia se dose dobrada',
				practicalRule: 'peso/3 em ml (na apresentação de 250mg/5ml) 3x/dia<br>peso/4 em ml (na apresentação de 400mg/5ml) 2x/dia',
				renalAdjustment: 'CICr 10-29 -> 8-20mg/kg 12/12h<br>CICr < 10 -> 8-20mg/kg 24/24h',
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const dailyDoseMg = weight * 50;
					const singleDoseMg = dailyDoseMg / 3; // 8/8h = 3 doses ao dia
					const suspension250Ml = weight / 3;
					const suspension400Ml = weight / 4;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 8h`,
						practicalDose: `Suspensão 250mg/5ml: ${suspension250Ml.toFixed(1)} ml 3x/dia<br>Suspensão 400mg/5ml: ${suspension400Ml.toFixed(1)} ml 2x/dia`,
						details: `Dose diária total: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 50 mg/kg/dia)<br>Dividido em 3 doses: ${singleDoseMg.toFixed(1)} mg a cada 8 horas`,
					};
				},
			},

			amox_clav: {
				name: 'AMOXICILINA - CLAVULANATO',
				category: 'Antimicrobianos',
				presentation: 'SUSPENSÃO: Sigma-Clav BD 400mg/5ml; Atak Clav, Sinot-Clav 400mg + 57mg/5ml (frasco 70ml); Posto 250mg + 62,5mg/5ml',
				dose: '50mg/kg/dia 8/8h (SE BD: 12/12h) - cálculo pela Amoxicilina',
				practicalRule: 'Peso X 0,3 em ml de 12/12h',
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const dailyDoseMg = weight * 50;
					const singleDoseMgBD = dailyDoseMg / 2; // 12/12h = 2 doses ao dia
					const practicalDoseMl = weight * 0.3;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia (de amoxicilina)`,
						singleDose: `${singleDoseMgBD.toFixed(1)} mg a cada 12h (esquema BD)`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml a cada 12h`,
						details: `Dose diária total: ${dailyDoseMg.toFixed(1)} mg de amoxicilina (${weight} kg × 50 mg/kg/dia)<br>Dividido em 2 doses (BD): ${singleDoseMgBD.toFixed(1)} mg a cada 12 horas<br>Regra prática: ${practicalDoseMl.toFixed(
							1,
						)} ml da suspensão a cada 12h`,
					};
				},
			},

			azitromicina: {
				name: 'AZITROMICINA (Zitromax)',
				category: 'Antimicrobianos',
				presentation: 'SUSPENSÃO: 200mg/5ml<br>FA: 500mg',
				dose: '10mg/kg/dia (máx 500mg/dia) ou 20mg/kg/dia (max 1,2g/dia) se bactérias atípicas',
				practicalRule: 'Suspensão => peso/4 (1x/dia)',
				renalAdjustment: 'sem ajuste',
				maxDose: 'Máximo 500mg/dia (dose padrão) ou 1,2g/dia (bactérias atípicas)',
				notes: 'Diluição: 1-2mg/ml. Correr em 1-3h',
				calculate: function (weight) {
					const dailyDoseMg = weight * 10;
					const maxDose = 500;
					const suspensionMl = weight / 4;

					let calculatedDose = dailyDoseMg;
					if (calculatedDose > maxDose) calculatedDose = maxDose;

					return {
						dailyDose: `${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg/dia (dose única)`,
						singleDose: 'Dose única diária',
						practicalDose: `${suspensionMl.toFixed(1)} ml da suspensão 1x/dia`,
						details: `Dose diária: ${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg (${weight} kg × 10 mg/kg/dia)${
							dailyDoseMg > maxDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxDose} mg/dia</span>` : ''
						}<br>Suspensão 200mg/5ml: ${suspensionMl.toFixed(1)} ml 1 vez ao dia`,
					};
				},
			},

			cefadroxila: {
				name: 'CEFADROXILA',
				category: 'Antimicrobianos',
				presentation: 'SUSPENSÃO: 250mg/5ml ou 500mg/5ml',
				dose: '30mg/kg/dia, 12/12hs (por 10 dias)',
				practicalRule: null,
				renalAdjustment: 'CICr 25-50 -> dose inicial de 1g 12/12h e depois de 500mg 12/12hs<br>CICr 10-25 -> dose inicial de 1g 24/24h e depois de 500mg 24/24hs<br>CICr < 10 -> dose inicial de 1g 36/36h e depois de 500mg 36/36hs',
				maxDose: null,
				notes: 'Tratamento por 10 dias',
				calculate: function (weight) {
					const dailyDoseMg = weight * 30;
					const singleDoseMg = dailyDoseMg / 2; // 12/12h = 2 doses ao dia

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 12h`,
						practicalDose: null,
						details: `Dose diária total: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 30 mg/kg/dia)<br>Dividido em 2 doses: ${singleDoseMg.toFixed(1)} mg a cada 12 horas<br>Tratar por 10 dias`,
					};
				},
			},

			cefalexina: {
				name: 'CEFALEXINA (Keflex)',
				category: 'Antimicrobianos',
				presentation: 'SUSPENSÃO: 250mg/5ml',
				dose: '50mg/kg/dia',
				practicalRule: 'peso / 4 em ml por dose (de 6/6hs)',
				renalAdjustment: 'evitar na IR!!',
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const dailyDoseMg = weight * 50;
					const singleDoseMg = dailyDoseMg / 4; // 6/6h = 4 doses ao dia
					const suspensionMl = weight / 4;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 6h`,
						practicalDose: `${suspensionMl.toFixed(1)} ml da suspensão a cada 6h`,
						details: `Dose diária total: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 50 mg/kg/dia)<br>Dividido em 4 doses: ${singleDoseMg.toFixed(1)} mg a cada 6 horas<br>Suspensão 250mg/5ml: ${suspensionMl.toFixed(1)} ml a cada 6h`,
					};
				},
			},

			cefalotina: {
				name: 'CEFALOTINA',
				category: 'Antimicrobianos',
				presentation: 'FA: 1g (IM ou EV) => diluir em 10ml AD',
				dose: '80-160mg/kg/dia (padrão 100mg/kg/dia), administrar 6/6hs',
				practicalRule: 'peso / 4 em ml por dose (de 6/6hs)',
				renalAdjustment: 'CICr 25-50 -> sem ajuste<br>CICr 10-50 -> até 1,5g a cada 6 horas<br>CICr 10-25 -> até 1g a cada 6 horas<br>CICr 2-10 -> até 500mg a cada 6 horas<br>CICr < 2 -> até 500mg a cada 8 horas',
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const dailyDoseMg = weight * 100; // dose padrão
					const singleDoseMg = dailyDoseMg / 4; // 6/6h = 4 doses ao dia
					const practicalDoseMl = weight / 4;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia (faixa: ${(weight * 80).toFixed(0)}-${(weight * 160).toFixed(0)} mg/dia)`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 6h`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml por dose`,
						details: `Dose diária total: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 100 mg/kg/dia - dose padrão)<br>Dividido em 4 doses: ${singleDoseMg.toFixed(1)} mg a cada 6 horas<br>Faixa recomendada: ${(weight * 80).toFixed(0)}-${(weight * 160).toFixed(
							0,
						)} mg/dia`,
					};
				},
			},

			ceftriaxona: {
				name: 'CEFTRIAXONA (Rocefin, Ceftriax)',
				category: 'Antimicrobianos',
				presentation: 'FA: 250mg (IM); 500mg (IM, IV), 1000mg (IM, IV) => Diluir em 5ml AD',
				dose: '50-100mg/kg/dia em 1 ou 2 doses (acima de 2g/dia, dividir em 2 doses! Na meningite, fazer também 2 doses, com máximo de 100-160mg/kg/dia). Máximo 4g/dia',
				practicalRule: 'se diluição para 10ml AD => peso = ml / dia<br>se diluição para 5ml AD => peso/2 = ml / dia',
				renalAdjustment: 'manter mesma dose',
				maxDose: 'Máximo 4g/dia',
				notes: 'USO EV: 100mg/ml. Rediluir para 40mg/ml em SF0,9%. Correr em 30 min.',
				calculate: function (weight) {
					// Usando dose média de 75mg/kg/dia
					const dailyDoseMg = weight * 75;
					const maxDose = 4000; // 4g

					let calculatedDose = dailyDoseMg;
					if (calculatedDose > maxDose) calculatedDose = maxDose;

					const singleDoseMg = calculatedDose; // Normalmente 1 dose/dia
					const dilution10Ml = weight; // para diluição em 10ml AD
					const dilution5Ml = weight / 2; // para diluição em 5ml AD

					return {
						dailyDose: `${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg/dia`,
						singleDose: `${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg 1x/dia (ou dividido em 2 doses se > 2g)`,
						practicalDose: `Diluição em 10ml AD: ${dilution10Ml.toFixed(1)} ml/dia<br>Diluição em 5ml AD: ${dilution5Ml.toFixed(1)} ml/dia`,
						details: `Dose diária: ${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg (${weight} kg × 75 mg/kg/dia - dose média)${
							dailyDoseMg > maxDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxDose} mg/dia</span>` : ''
						}<br>Faixa recomendada: ${(weight * 50).toFixed(0)}-${(weight * 100).toFixed(0)} mg/dia<br>Acima de 2000 mg/dia, dividir em 2 doses.`,
					};
				},
			},

			cefepime: {
				name: 'CEFEPIME',
				category: 'Antimicrobianos',
				presentation: 'FA = 1000mg ou 2000mg',
				dose: '50mg/kg/dose 8/8h - Máximo 2g/dose',
				practicalRule: 'peso/2 em ml / dose',
				renalAdjustment: 'CICr 10-50 -> aumentar intervalo para 24/24h<br>CICr < 10 -> aumentar intervalo para 48/48h',
				maxDose: 'Máximo 2g/dose',
				notes: 'Diluição: inicial 100mg/ml. Rediluir para 40mg/ml em SF0,9%. Correr em 30min.',
				calculate: function (weight) {
					const singleDoseMg = weight * 50;
					const maxSingleDose = 2000; // 2g

					let calculatedSingleDose = singleDoseMg;
					if (calculatedSingleDose > maxSingleDose) calculatedSingleDose = maxSingleDose;

					const dailyDoseMg = calculatedSingleDose * 3; // 8/8h = 3 doses ao dia
					const practicalDoseMl = weight / 2;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${Math.min(singleDoseMg, maxSingleDose).toFixed(1)} mg a cada 8h`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml por dose`,
						details: `Dose por administração: ${Math.min(singleDoseMg, maxSingleDose).toFixed(1)} mg (${weight} kg × 50 mg/kg/dose)${
							singleDoseMg > maxSingleDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxSingleDose} mg/dose</span>` : ''
						}<br>3 doses ao dia (8/8h) = ${dailyDoseMg.toFixed(1)} mg/dia`,
					};
				},
			},

			ceftazidima: {
				name: 'CEFTAZIDIMA',
				category: 'Antimicrobianos',
				presentation: 'FA 1000mg ; 2000mg',
				dose: '100-150mg/kg/dia 8/8h',
				practicalRule: 'peso / 3 em ml / dose (dose mínima)',
				renalAdjustment: 'CICr 30-50 -> 50mg/kg a cada 12h<br>CICr 10-29 -> 50mg/kg a cada 24h<br>CICr < 10 -> 50mg/kg a cada 48h',
				maxDose: 'Máximo 6g/dia',
				notes: 'USO EV: diluir para 100mg/ml. Rediluir para 40mg/ml. Correr em 20min.<br>USO IM: diluir em AD ou lidocaína 1% para 250mg/ml',
				calculate: function (weight) {
					const dailyDoseMg = weight * 125; // dose média (entre 100-150)
					const singleDoseMg = dailyDoseMg / 3; // 8/8h = 3 doses ao dia
					const maxDose = 6000; // 6g

					let calculatedDose = dailyDoseMg;
					if (calculatedDose > maxDose) calculatedDose = maxDose;

					const practicalDoseMl = weight / 3;

					return {
						dailyDose: `${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg/dia`,
						singleDose: `${(Math.min(dailyDoseMg, maxDose) / 3).toFixed(1)} mg a cada 8h`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml por dose (dose mínima)`,
						details: `Dose diária: ${Math.min(dailyDoseMg, maxDose).toFixed(1)} mg (${weight} kg × 125 mg/kg/dia - dose média)${
							dailyDoseMg > maxDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxDose} mg/dia</span>` : ''
						}<br>Faixa recomendada: ${(weight * 100).toFixed(0)}-${(weight * 150).toFixed(0)} mg/dia<br>Dividido em 3 doses: ${(Math.min(dailyDoseMg, maxDose) / 3).toFixed(1)} mg a cada 8 horas`,
					};
				},
			},

			clindamicina: {
				name: 'CLINDAMICINA',
				category: 'Antimicrobianos',
				presentation: '150mg/ml (FA 2, 4 e 6ml)',
				dose: '25-40mg/kg/dia de 6/6h ou 8/8h Mínimo 300mg/dia',
				practicalRule: null,
				renalAdjustment: 'sem ajuste',
				maxDose: null,
				notes: 'Diluição: 6mg/ml em SF 0,9%. Correr em 30min.',
				calculate: function (weight) {
					const dailyDoseMg = weight * 32.5; // dose média (entre 25-40)
					const singleDose6h = dailyDoseMg / 4; // 6/6h = 4 doses ao dia
					const singleDose8h = dailyDoseMg / 3; // 8/8h = 3 doses ao dia
					const minDose = 300;

					let calculatedDose = dailyDoseMg;
					if (calculatedDose < minDose) calculatedDose = minDose;

					return {
						dailyDose: `${Math.max(dailyDoseMg, minDose).toFixed(1)} mg/dia (mínimo ${minDose} mg/dia)`,
						singleDose: `6/6h: ${(Math.max(dailyDoseMg, minDose) / 4).toFixed(1)} mg a cada 6h<br>8/8h: ${(Math.max(dailyDoseMg, minDose) / 3).toFixed(1)} mg a cada 8h`,
						practicalDose: null,
						details: `Dose diária: ${Math.max(dailyDoseMg, minDose).toFixed(1)} mg (${weight} kg × 32.5 mg/kg/dia - dose média)${
							dailyDoseMg < minDose ? `<br><span class="text-red-600 font-medium">Dose ajustada para o mínimo de ${minDose} mg/dia</span>` : ''
						}<br>Faixa recomendada: ${(weight * 25).toFixed(0)}-${(weight * 40).toFixed(0)} mg/dia`,
					};
				},
			},

			gentamicina: {
				name: 'GENTAMICINA',
				category: 'Antimicrobianos',
				presentation: '20mg/ml ou 40mg/ml ou 80mg/2ml (EV ou IM)',
				dose: '5-7mg/kg/dia em 1-3 doses. (MUDA EM RN CONFORME IDADE E PESO – 24/24hs)',
				practicalRule: null,
				renalAdjustment: 'CICr 30-50 -> aumentar intervalo para 12/12h ou 18/18h<br>CICr 10-29 -> aumentar intervalo para 18/18h ou 24/24h<br>CICl < 10 -> aumentar intervalo para 48/48h ou 72/72h',
				maxDose: null,
				notes: 'Diluição: 10mg/ml em SF0,9%. Correr em 30 minutos.<br>Em RN muda conforme idade e peso (24/24hs)',
				calculate: function (weight) {
					const dailyDoseMg = weight * 6; // dose média (entre 5-7)
					const singleDoseMg1x = dailyDoseMg; // 1 dose ao dia
					const singleDoseMg3x = dailyDoseMg / 3; // 3 doses ao dia

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `1x/dia: ${singleDoseMg1x.toFixed(1)} mg<br>3x/dia: ${singleDoseMg3x.toFixed(1)} mg a cada 8h`,
						practicalDose: null,
						details: `Dose diária: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 6 mg/kg/dia - dose média)<br>Faixa recomendada: ${(weight * 5).toFixed(0)}-${(weight * 7).toFixed(
							0,
						)} mg/dia<br>Pode ser administrada em 1 a 3 doses diárias<br><span class="text-amber-600 font-medium">Em RN: dose varia conforme idade e peso (geralmente 24/24h)</span>`,
					};
				},
			},

			meropenem: {
				name: 'MEROPENEM',
				category: 'Antimicrobianos',
				presentation: 'FA 500mg; 1000mg',
				dose: '60mg/kg/dia 8/8h (se MENINGITE: dose dobradal!)',
				practicalRule: null,
				renalAdjustment: 'CICr 30-50: 20-40mg/kg 12/12h<br>CICr 10-20mg/kg 12/12h<br>CICr < 10: 10-20mg/kg 24/24h',
				maxDose: null,
				notes: 'Diluição: em bolus -> 50mg/ml (500mg + 10ml diluente). Em 30 min -> 1-20mg/ml.',
				calculate: function (weight, isMeningitis = false) {
					const baseDailyDoseMg = weight * 60;
					const dailyDoseMg = isMeningitis ? baseDailyDoseMg * 2 : baseDailyDoseMg;
					const singleDoseMg = dailyDoseMg / 3; // 8/8h = 3 doses ao dia

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia${isMeningitis ? ' (DOBRADA - meningite)' : ''}`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 8h`,
						practicalDose: null,
						details: `Dose diária: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × ${isMeningitis ? '120' : '60'} mg/kg/dia)<br>Dividido em 3 doses: ${singleDoseMg.toFixed(1)} mg a cada 8 horas${
							isMeningitis ? '<br><span class="text-red-600 font-medium">ATENÇÃO: DOSE DOBRADA PARA MENINGITE</span>' : ''
						}`,
					};
				},
			},

			metronidazol: {
				name: 'METRONIDAZOL',
				category: 'Antimicrobianos',
				presentation: 'FA 5mg/ml<br>SUSPENSÃO: 40mg/ml',
				dose: '30-40mg/kg/dia 8/8h',
				practicalRule: 'VO – peso/3 ml / dose<br>EV – 2xP / dose',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Diluição: solução já pronta para infusão.',
				calculate: function (weight) {
					const dailyDoseMg = weight * 35; // dose média (entre 30-40)
					const singleDoseMg = dailyDoseMg / 3; // 8/8h = 3 doses ao dia
					const voDoseMl = weight / 3;
					const evDoseMl = weight * 2;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 8h`,
						practicalDose: `VO: ${voDoseMl.toFixed(1)} ml por dose<br>EV: ${evDoseMl.toFixed(1)} ml por dose`,
						details: `Dose diária: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 35 mg/kg/dia - dose média)<br>Faixa recomendada: ${(weight * 30).toFixed(0)}-${(weight * 40).toFixed(0)} mg/dia<br>Dividido em 3 doses: ${singleDoseMg.toFixed(1)} mg a cada 8 horas`,
					};
				},
			},

			oxacilina: {
				name: 'OXACILINA',
				category: 'Antimicrobianos',
				presentation: 'FA 500mg',
				dose: '150-200mg/kg/dia 4/4h ou 6/6h - Máximo 1g/dose 4/4h',
				practicalRule: 'peso/3 / dose (se 4/4h)',
				renalAdjustment: 'usar dose mínima na IR grave',
				maxDose: 'Máximo 1g/dose 4/4h',
				notes: 'Diluição: diluição inicial 100mg/ml. Rediluir para 10mg/ml em SF0,9%',
				calculate: function (weight) {
					const dailyDoseMg = weight * 175; // dose média (entre 150-200)
					const singleDose6h = dailyDoseMg / 4; // 6/6h = 4 doses ao dia
					const singleDose4h = dailyDoseMg / 6; // 4/4h = 6 doses ao dia
					const maxSingleDose = 1000; // 1g

					let calculatedSingleDose4h = singleDose4h;
					if (calculatedSingleDose4h > maxSingleDose) calculatedSingleDose4h = maxSingleDose;

					const practicalDoseMl = weight / 3;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `6/6h: ${singleDose6h.toFixed(1)} mg a cada 6h<br>4/4h: ${Math.min(singleDose4h, maxSingleDose).toFixed(1)} mg a cada 4h${singleDose4h > maxSingleDose ? ' (limitado)' : ''}`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml por dose (se 4/4h)`,
						details: `Dose diária: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 175 mg/kg/dia - dose média)<br>Faixa recomendada: ${(weight * 150).toFixed(0)}-${(weight * 200).toFixed(0)} mg/dia<br>Máximo por dose (4/4h): ${maxSingleDose} mg${
							singleDose4h > maxSingleDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxSingleDose} mg/dose</span>` : ''
						}`,
					};
				},
			},

			pen_cristalina: {
				name: 'PENICILINA CRISTALINA',
				category: 'Antimicrobianos',
				presentation: 'FA 1.000.000 UI; 5.000.000 UI',
				dose: '200.000UI/kg/dia 6/6h - Máximo 24.000.000 UI/dia',
				practicalRule: 'Peso/10 por dose (Ex: P=7,2Kg => fazer 0,72ml de 6/6hs, rediluir 1ml a cada kg)',
				renalAdjustment: 'CICr 30-50 -> 75% da dose<br>CICr < 10 -> 20-50% da dose',
				maxDose: 'Máximo 24.000.000 UI/dia',
				notes: 'Diluição: 500.000 UI/ml (1 FA 5.000.000 + 8 ml AD -> 500.000UI/ml)<br>Rediluição: < 1 ano -> 50.000UI/ml; > 1 ano -> 100.000UI/ml',
				calculate: function (weight) {
					const dailyDoseUI = weight * 200000;
					const maxDose = 24000000; // 24 milhões

					let calculatedDose = dailyDoseUI;
					if (calculatedDose > maxDose) calculatedDose = maxDose;

					const singleDoseUI = calculatedDose / 4; // 6/6h = 4 doses ao dia
					const practicalDoseMl = weight / 10;

					return {
						dailyDose: `${(Math.min(dailyDoseUI, maxDose) / 1000000).toFixed(1)} milhões UI/dia`,
						singleDose: `${(Math.min(dailyDoseUI, maxDose) / 4000000).toFixed(1)} milhões UI a cada 6h`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml por dose`,
						details: `Dose diária: ${(Math.min(dailyDoseUI, maxDose) / 1000000).toFixed(1)} milhões UI (${weight} kg × 200.000 UI/kg/dia)${
							dailyDoseUI > maxDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxDose / 1000000} milhões UI/dia</span>` : ''
						}<br>Dividido em 4 doses: ${(Math.min(dailyDoseUI, maxDose) / 4000000).toFixed(1)} milhões UI a cada 6 horas<br>Regra prática: ${practicalDoseMl.toFixed(1)} ml por dose`,
					};
				},
			},

			pen_benzatina: {
				name: 'PENICILINA BENZATINA',
				category: 'Antimicrobianos',
				presentation: 'FA 1.200.000 UI ; 600.000UI',
				dose: '25-50 mil UI/kg/dose – DOSE ÚNICA (faringite, impetigo)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'DOSE ÚNICA para faringite, impetigo',
				calculate: function (weight) {
					const doseUI = weight * 37500; // dose média (entre 25-50 mil)
					const doseInMillions = doseUI / 1000000;

					return {
						dailyDose: `${doseInMillions.toFixed(2)} milhões UI (DOSE ÚNICA)`,
						singleDose: 'DOSE ÚNICA',
						practicalDose: null,
						details: `Dose única: ${doseInMillions.toFixed(2)} milhões UI (${weight} kg × 37.500 UI/kg - dose média)<br>Faixa recomendada: ${((weight * 25000) / 1000000).toFixed(2)}-${((weight * 50000) / 1000000).toFixed(
							2,
						)} milhões UI<br>Para faringite ou impetigo - administração única`,
					};
				},
			},

			pen_v: {
				name: 'PENICILINA V (Pen-Ve-Oral)',
				category: 'Antimicrobianos',
				presentation: 'SUSPENSÃO: 400.000UI / 5ml',
				dose: '25-50 mil UI/kg/dose – de 12/12hs por 5 dias (Infecções leves, faringites, Piodermite)',
				practicalRule: 'Peso / 3 por dose',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Administrar por 5 dias para infecções leves, faringites, piodermite',
				calculate: function (weight) {
					const singleDoseUI = weight * 37500; // dose média (entre 25-50 mil)
					const dailyDoseUI = singleDoseUI * 2; // 12/12h = 2 doses ao dia
					const practicalDoseMl = weight / 3;

					return {
						dailyDose: `${(dailyDoseUI / 1000).toFixed(0)} mil UI/dia`,
						singleDose: `${(singleDoseUI / 1000).toFixed(0)} mil UI a cada 12h`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml por dose`,
						details: `Dose por administração: ${(singleDoseUI / 1000).toFixed(0)} mil UI (${weight} kg × 37,5 mil UI/kg - dose média)<br>Faixa: ${(weight * 25).toFixed(0)}-${(weight * 50).toFixed(
							0,
						)} mil UI/dose<br>2 doses ao dia (12/12h) durante 5 dias<br>Suspensão 400.000UI/5ml: ${practicalDoseMl.toFixed(1)} ml por dose`,
					};
				},
			},

			sulfametoxazol: {
				name: 'SULFAMETOXAZOL - TRIMETROPIM',
				category: 'Antimicrobianos',
				presentation: 'SUSPENSÃO: 200mg + 40mg/5ml',
				dose: '40mg/kg/dia 12/12h',
				practicalRule: 'peso/2 em ml / dose',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Cálculo pela dose de sulfametoxazol',
				calculate: function (weight) {
					const dailyDoseMg = weight * 40; // sulfametoxazol
					const singleDoseMg = dailyDoseMg / 2; // 12/12h = 2 doses ao dia
					const practicalDoseMl = weight / 2;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia de sulfametoxazol`,
						singleDose: `${singleDoseMg.toFixed(1)} mg de sulfametoxazol a cada 12h`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml da suspensão por dose`,
						details: `Dose diária de sulfametoxazol: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 40 mg/kg/dia)<br>Dividido em 2 doses: ${singleDoseMg.toFixed(1)} mg a cada 12 horas<br>Suspensão 200mg+40mg/5ml: ${practicalDoseMl.toFixed(1)} ml por dose`,
					};
				},
			},

			vancomicina: {
				name: 'VANCOMICINA',
				category: 'Antimicrobianos',
				presentation: 'FA 1g – 50mg/ml',
				dose: '40mg/kg/dia 6/6h',
				practicalRule: 'peso/5 ml / dose',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Diluição: 2,5-5mg/ml em SF0,9% ou SG5%. Correr em 1h.',
				calculate: function (weight) {
					const dailyDoseMg = weight * 40;
					const singleDoseMg = dailyDoseMg / 4; // 6/6h = 4 doses ao dia
					const practicalDoseMl = weight / 5;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 6h`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml por dose (apresentação 50mg/ml)`,
						details: `Dose diária total: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 40 mg/kg/dia)<br>Dividido em 4 doses: ${singleDoseMg.toFixed(1)} mg a cada 6 horas<br>Apresentação 50mg/ml: ${practicalDoseMl.toFixed(1)} ml por dose`,
					};
				},
			},
		},

		// ============================================
		// CATEGORIA: Anti-parasitários
		// ============================================
		antiparasitarios: {
			albendazol: {
				name: 'ALBENDAZOL (para maiores de 2 anos)',
				category: 'Anti-parasitários',
				presentation: 'SUSPENSÃO: 400mg/10ml ; cp 400mg',
				dose: '10ml ou 1cp 1x/dia 3-5 dias',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Para maiores de 2 anos',
				calculate: function (weight) {
					return {
						dailyDose: 'Dose fixa: 10ml da suspensão ou 1 comprimido de 400mg',
						singleDose: 'Dose única diária',
						practicalDose: '10ml da suspensão OU 1 comprimido',
						details: 'Administrar 1 vez ao dia por 3 a 5 dias<br>Dose não ajustada por peso - dose fixa para maiores de 2 anos<br>Suspensão: 10ml (400mg) 1x/dia<br>Comprimido: 1 comprimido (400mg) 1x/dia',
					};
				},
			},

			mebendazol: {
				name: 'MEBENDAZOL',
				category: 'Anti-parasitários',
				presentation: 'SUSPENSÃO: 100mg/5ml; cp 100mg',
				dose: '100mg (5ml) 12/12h por 3 dias (ascaris, necator, enterobius, estrongiloides)<br>200mg 12/12h por 5 dias para larva migrans',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Dose varia conforme a parasitose',
				calculate: function (weight, isLarvaMigrans = false) {
					const treatmentDays = isLarvaMigrans ? 5 : 3;
					const doseMg = isLarvaMigrans ? 200 : 100;
					const suspensionMl = isLarvaMigrans ? 10 : 5; // 100mg/5ml

					return {
						dailyDose: `${doseMg * 2} mg/dia (${doseMg} mg 2x/dia)`,
						singleDose: `${doseMg} mg a cada 12h`,
						practicalDose: `${suspensionMl} ml da suspensão a cada 12h`,
						details: `${isLarvaMigrans ? 'Larva migrans' : 'Ascaris, necator, enterobius, estrongiloides'}<br>Dose: ${doseMg} mg (${suspensionMl} ml) a cada 12 horas<br>Tratamento por ${treatmentDays} dias<br>Dose não ajustada por peso - dose fixa`,
					};
				},
			},

			ivermectina: {
				name: 'IVERMECTINA (para maiores de 1 ano)',
				category: 'Anti-parasitários',
				presentation: 'cp 6mg',
				dose: '15-25kg -> ½ cp<br>26-44kg -> 1 cp<br>45-64kg -> 1cp + ½cp<br>> 65kg -> 2cps<br>A dose é única. No caso de escaloiose, pode repetir 1x após 2 semanas.',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Para maiores de 1 ano. Dose única. Para escaloiose, pode repetir após 2 semanas.',
				calculate: function (weight) {
					let dose = '';
					let details = '';

					if (weight < 15) {
						dose = 'Peso insuficiente (menor que 15kg)';
						details = 'Não recomendado para peso inferior a 15kg';
					} else if (weight >= 15 && weight <= 25) {
						dose = '½ comprimido (3mg)';
						details = 'Peso: 15-25kg → ½ comprimido de 6mg = 3mg';
					} else if (weight >= 26 && weight <= 44) {
						dose = '1 comprimido (6mg)';
						details = 'Peso: 26-44kg → 1 comprimido de 6mg = 6mg';
					} else if (weight >= 45 && weight <= 64) {
						dose = '1½ comprimidos (9mg)';
						details = 'Peso: 45-64kg → 1 comprimido + ½ = 9mg';
					} else {
						dose = '2 comprimidos (12mg)';
						details = 'Peso: >65kg → 2 comprimidos de 6mg = 12mg';
					}

					return {
						dailyDose: `${dose} - DOSE ÚNICA`,
						singleDose: 'Dose única',
						practicalDose: dose,
						details: `${details}<br>Dose única para tratamento<br>Para escaloiose: pode repetir a dose após 2 semanas<br>Medicamento para maiores de 1 ano`,
					};
				},
			},

			nitazoxanida: {
				name: 'NITAZOXANIDA (Annita) (a partir de 1 ano)',
				category: 'Anti-parasitários',
				presentation: 'SUSPENSÃO (pó): 20mg/ml ou Cp 500mg',
				dose: '7,5mg/kg/dose 12/12h por 3 dias<br>> 12 anos: 500mg 12/12h por 3 dias',
				practicalRule: 'marca do peso na seringa de 12/12hs por 3 dias ou (7,5 x Peso)/20 em ml de 12/12hs por 3 dias (Max: 15ml/dose)',
				renalAdjustment: null,
				maxDose: 'Máximo 15ml/dose',
				notes: 'Frasco: 45ml / 60ml / 100ml',
				calculate: function (weight, ageMonths = null) {
					const ageYears = Number.isFinite(ageMonths) ? ageMonths / 12 : null;
					// Se maior de 12 anos, dose fixa
					if (ageYears && ageYears > 12) {
						return {
							dailyDose: '1000 mg/dia (500mg 2x/dia)',
							singleDose: '500 mg a cada 12h',
							practicalDose: 'Dose fixa para >12 anos',
							details: 'Para maiores de 12 anos: dose fixa de 500mg a cada 12h<br>Tratamento por 3 dias<br>Comprimido de 500mg: 1 comprimido a cada 12h',
						};
					}

					const singleDoseMg = weight * 7.5;
					const dailyDoseMg = singleDoseMg * 2;
					const suspensionMl = (weight * 7.5) / 20;
					const maxMl = 15;

					let calculatedMl = suspensionMl;
					if (calculatedMl > maxMl) calculatedMl = maxMl;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 12h`,
						practicalDose: `${Math.min(suspensionMl, maxMl).toFixed(1)} ml da suspensão a cada 12h${suspensionMl > maxMl ? ' (máximo)' : ''}`,
						details: `Dose por administração: ${singleDoseMg.toFixed(1)} mg (${weight} kg × 7,5 mg/kg/dose)<br>2 doses ao dia (12/12h) durante 3 dias<br>Suspensão 20mg/ml: ${Math.min(suspensionMl, maxMl).toFixed(1)} ml a cada 12h${
							suspensionMl > maxMl ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxMl} ml/dose</span>` : ''
						}`,
					};
				},
			},
		},

		// ============================================
		// CATEGORIA: Analgésicos e Antitérmicos
		// ============================================
		analgesicos: {
			dipirona: {
				name: 'DIPIRONA',
				category: 'Analgésicos/Antitérmicos',
				presentation: 'Gotas: 500mg/ml (25mg/gota)<br>Solução: 50mg/ml<br>Âmpola: 500mg/ml',
				dose: '10-25mg/kg/dose 6/6h (fazer mínimo no lactente e máximo no escolar)',
				practicalRule: 'gotas: 0,8-1gota x P / dose<br>solução: 0,3-0,5ml x P / dose<br>EV: 0,03ml x P / dose - completar com AD para 10ml ou EV: 0,1ml por cada 5kg de peso',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Usar dose mínima em lactentes e dose máxima em escolares',
				calculate: function (weight, isLactente = false) {
					const doseMgPerKg = isLactente ? 10 : 25; // mínimo no lactente, máximo no escolar
					const singleDoseMg = weight * doseMgPerKg;
					const dailyDoseMg = singleDoseMg * 4; // 6/6h = 4 doses ao dia

					// Cálculos práticos
					const dropsMin = weight * 0.8;
					const dropsMax = weight * 1;
					const solutionMin = weight * 0.3;
					const solutionMax = weight * 0.5;
					const evDoseMl1 = weight * 0.03;
					const evDoseMl2 = (weight / 5) * 0.1;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 6h (${doseMgPerKg} mg/kg/dose)`,
						practicalDose: `Gotas: ${dropsMin.toFixed(1)}-${dropsMax.toFixed(1)} gotas/dose<br>Solução: ${solutionMin.toFixed(1)}-${solutionMax.toFixed(1)} ml/dose<br>EV: ${evDoseMl1.toFixed(2)} ml/dose + AD para 10ml OU ${evDoseMl2.toFixed(1)} ml/dose`,
						details: `Dose por administração: ${singleDoseMg.toFixed(1)} mg (${weight} kg × ${doseMgPerKg} mg/kg/dose)${
							isLactente ? '<br><span class="text-blue-600 font-medium">Dose mínima (lactente)</span>' : '<br><span class="text-blue-600 font-medium">Dose máxima (escolar)</span>'
						}<br>4 doses ao dia (6/6h)<br>Faixa: ${(weight * 10).toFixed(0)}-${(weight * 25).toFixed(0)} mg/dose`,
					};
				},
			},

			ibuprofeno: {
				name: 'IBUPROFENO (Alivium)',
				category: 'Analgésicos/Antitérmicos',
				presentation: 'gotas: 50mg/ml [5mg/gota] ou 100mg/ml [10mg/gota] (pouco usada)<br>Solução: 30mg/ml (pouco usada)',
				dose: '10mg/kg/dose de 8/8h ou 6/6h (analgésico) - Máximo: 40mg/kg/dia ou 2,4g/dia',
				practicalRule: '1-2gotas x P (analgésico e antitérmico) – Máximo 40gotas/dose',
				renalAdjustment: null,
				maxDose: 'Máximo 40mg/kg/dia ou 2,4g/dia',
				notes: null,
				calculate: function (weight, frequency = '8h') {
					const singleDoseMg = weight * 10;
					const dosesPerDay = frequency === '8h' ? 3 : 4;
					const dailyDoseMg = singleDoseMg * dosesPerDay;
					const maxDailyDoseMg = Math.min(weight * 40, 2400);

					const drops50mgMl = weight * 1; // 1-2 gotas/kg, usando 1 como média
					const maxDrops = 40;

					let calculatedDrops = drops50mgMl;
					if (calculatedDrops > maxDrops) calculatedDrops = maxDrops;

					return {
						dailyDose: `${Math.min(dailyDoseMg, maxDailyDoseMg).toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada ${frequency === '8h' ? '8' : '6'}h`,
						practicalDose: `Gotas (50mg/ml): ${Math.min(drops50mgMl, maxDrops).toFixed(0)} gotas/dose${drops50mgMl > maxDrops ? ' (máximo)' : ''}`,
						details: `Dose por administração: ${singleDoseMg.toFixed(1)} mg (${weight} kg × 10 mg/kg/dose)<br>${dosesPerDay} doses ao dia (${frequency === '8h' ? '8/8h' : '6/6h'})<br>Dose diária máxima: ${maxDailyDoseMg.toFixed(
							0,
						)} mg (${weight} × 40 mg/kg/dia OU 2,4g)${dailyDoseMg > maxDailyDoseMg ? `<br><span class="text-red-600 font-medium">Ajustar dose! ${dailyDoseMg.toFixed(0)} mg/dia excede o máximo</span>` : ''}`,
					};
				},
			},

			paracetamol: {
				name: 'PARACETAMOL (Tylenol)',
				category: 'Analgésicos/Antitérmicos',
				presentation: 'Gotas: 200mg/ml [10mg/gota] ou Bebê 100mg/ml [5mg/gota]<br>Solução: 160mg/5ml (32mg/ml) ou SUS 200mg/ml',
				dose: '10-15mg/kg/dose 6/6h',
				practicalRule: 'gotas 1gt/kg // gotas bebê 2gt/kg // suspensão 0,3-0,5ml/kg/dose',
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const singleDoseMg = weight * 12.5; // dose média (entre 10-15)
					const dailyDoseMg = singleDoseMg * 4; // 6/6h = 4 doses ao dia

					// Cálculos práticos
					const drops200mgMl = weight; // 1 gota/kg
					const dropsBaby100mgMl = weight * 2; // 2 gotas/kg
					const suspensionMin = weight * 0.3;
					const suspensionMax = weight * 0.5;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 6h (${weight} × 12,5 mg/kg/dose)`,
						practicalDose: `Gotas (200mg/ml): ${drops200mgMl.toFixed(0)} gotas/dose<br>Gotas bebê (100mg/ml): ${dropsBaby100mgMl.toFixed(0)} gotas/dose<br>Suspensão: ${suspensionMin.toFixed(1)}-${suspensionMax.toFixed(1)} ml/dose`,
						details: `Dose por administração: ${singleDoseMg.toFixed(1)} mg (${weight} kg × 12,5 mg/kg/dose - dose média)<br>Faixa recomendada: ${(weight * 10).toFixed(0)}-${(weight * 15).toFixed(0)} mg/dose<br>4 doses ao dia (6/6h) = ${dailyDoseMg.toFixed(
							1,
						)} mg/dia`,
					};
				},
			},

			cetoprofeno: {
				name: 'CETOPROFENO',
				category: 'Analgésicos/Antitérmicos',
				presentation: 'Gotas: 20mg/ml (1mg/gota)<br>FA 50mg/ml',
				dose: '1mg/kg/dose 8/8h a 6/6h<br>OBS.: 7-11 anos: 25mg/dose<br>> 11 anos: 50mg/dose',
				practicalRule: '1 gota/kg/dose de 8/8hs por 5 dias (Max: 50 gotas/dose)',
				renalAdjustment: null,
				maxDose: 'Máximo 50 gotas/dose',
				notes: 'Diluição EV: 30-50ml SF0,9%. Correr em 30min.',
				calculate: function (weight, ageMonths = null) {
					const ageYears = Number.isFinite(ageMonths) ? ageMonths / 12 : null;
					// Verificar se há dose fixa por idade
					if (ageYears) {
						if (ageYears >= 7 && ageYears <= 11) {
							return {
								dailyDose: '75 mg/dia (25mg 3x/dia)',
								singleDose: '25 mg a cada 8h',
								practicalDose: '25 gotas/dose (gotas 20mg/ml)',
								details: 'Idade 7-11 anos: dose fixa de 25mg por administração<br>3 doses ao dia (8/8h) = 75 mg/dia<br>Gotas 20mg/ml (1mg/gota): 25 gotas/dose',
							};
						} else if (ageYears > 11) {
							return {
								dailyDose: '150 mg/dia (50mg 3x/dia)',
								singleDose: '50 mg a cada 8h',
								practicalDose: '50 gotas/dose (gotas 20mg/ml) - MÁXIMO',
								details: 'Idade >11 anos: dose fixa de 50mg por administração<br>3 doses ao dia (8/8h) = 150 mg/dia<br>Gotas 20mg/ml (1mg/gota): 50 gotas/dose (máximo)',
							};
						}
					}

					// Cálculo por peso para menores de 7 anos
					const singleDoseMg = weight * 1;
					const dailyDoseMg = singleDoseMg * 3; // 8/8h = 3 doses ao dia
					const drops = weight; // 1 gota/kg
					const maxDrops = 50;

					let calculatedDrops = drops;
					if (calculatedDrops > maxDrops) calculatedDrops = maxDrops;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 8h`,
						practicalDose: `${Math.min(drops, maxDrops).toFixed(0)} gotas/dose${drops > maxDrops ? ' (máximo)' : ''}`,
						details: `Dose por administração: ${singleDoseMg.toFixed(1)} mg (${weight} kg × 1 mg/kg/dose)<br>3 doses ao dia (8/8h) = ${dailyDoseMg.toFixed(1)} mg/dia<br>Tratamento por 5 dias${
							drops > maxDrops ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxDrops} gotas/dose</span>` : ''
						}`,
					};
				},
			},

			tramadol: {
				name: 'TRAMADOL',
				category: 'Analgésicos/Antitérmicos',
				presentation: 'Gotas: 100mg/ml (2,5mg/gota)<br>Cápsula: 50mg<br>Âmpola: 50mg/ml',
				dose: '1-2mg/kg/dose de 4/4h a 6/6h - Máximo 400mg/dia',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Máximo 400mg/dia',
				notes: null,
				calculate: function (weight, frequency = '6h') {
					const singleDoseMg = weight * 1.5; // dose média (entre 1-2)
					const dosesPerDay = frequency === '4h' ? 6 : 4;
					const dailyDoseMg = singleDoseMg * dosesPerDay;
					const maxDailyDose = 400;

					let calculatedDailyDose = dailyDoseMg;
					if (calculatedDailyDose > maxDailyDose) calculatedDailyDose = maxDailyDose;

					const calculatedSingleDose = calculatedDailyDose / dosesPerDay;

					// Cálculo gotas (2,5mg/gota)
					const drops = calculatedSingleDose / 2.5;

					return {
						dailyDose: `${Math.min(dailyDoseMg, maxDailyDose).toFixed(1)} mg/dia`,
						singleDose: `${calculatedSingleDose.toFixed(1)} mg a cada ${frequency === '4h' ? '4' : '6'}h`,
						practicalDose: `Gotas: ${drops.toFixed(0)} gotas/dose (2,5mg/gota)`,
						details: `Dose por administração: ${calculatedSingleDose.toFixed(1)} mg (baseado em ${singleDoseMg.toFixed(1)} mg - dose média)<br>${dosesPerDay} doses ao dia (${frequency === '4h' ? '4/4h' : '6/6h'})<br>Faixa recomendada: ${(weight * 1).toFixed(
							0,
						)}-${(weight * 2).toFixed(0)} mg/dose<br>Máximo diário: ${maxDailyDose} mg${dailyDoseMg > maxDailyDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxDailyDose} mg/dia</span>` : ''}`,
					};
				},
			},

			morfina: {
				name: 'MORFINA',
				category: 'Analgésicos/Antitérmicos',
				presentation: 'FA 1mg/ml (2ml) ou 10mg/ml (1ml)',
				dose: '0,1-0,2mg/kg/dose bolus 4/4h (EV, IM ou SC) - MÁXIMO 15mg/dose',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Máximo 15mg/dose',
				notes: 'Dose deve ser titulada conforme resposta do paciente! A resposta é muito variável!',
				calculate: function (weight) {
					const singleDoseMg = weight * 0.15; // dose média (entre 0,1-0,2)
					const maxSingleDose = 15;

					let calculatedSingleDose = singleDoseMg;
					if (calculatedSingleDose > maxSingleDose) calculatedSingleDose = maxSingleDose;

					const dailyDoseMg = calculatedSingleDose * 6; // 4/4h = 6 doses ao dia

					// Cálculo volume para apresentações
					const volume1mgMl = calculatedSingleDose; // 1mg/ml
					const volume10mgMl = calculatedSingleDose / 10; // 10mg/ml

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${calculatedSingleDose.toFixed(2)} mg a cada 4h`,
						practicalDose: `FA 1mg/ml: ${volume1mgMl.toFixed(1)} ml/dose<br>FA 10mg/ml: ${volume10mgMl.toFixed(2)} ml/dose`,
						details: `Dose por administração: ${calculatedSingleDose.toFixed(2)} mg (${weight} kg × 0,15 mg/kg/dose - dose média)${
							singleDoseMg > maxSingleDose ? `<br><span class="text-red-600 font-medium">Dose limitada pelo máximo de ${maxSingleDose} mg/dose</span>` : ''
						}<br>Faixa recomendada: ${(weight * 0.1).toFixed(2)}-${(weight * 0.2).toFixed(2)} mg/dose<br>6 doses ao dia (4/4h)<br><span class="text-red-600 font-bold">ATENÇÃO: Titular conforme resposta do paciente! Resposta muito variável.</span>`,
					};
				},
			},
		},

		// ============================================
		// CATEGORIA: Gastrointestinais
		// ============================================
		gastrointestinais: {
			bromoprida: {
				name: 'BROMOPRIDA',
				category: 'Gastrointestinais',
				presentation: 'GOTAS: 4mg/ml (1gt = 0,17mg)<br>FA: 5mg/ml',
				dose: '0,5-1mg/kg/dia em 3 doses',
				practicalRule: 'VO → 1 gota/kg/dose 8/8h<br>EV → 0,03 x P / dose – completar para 20 com AD ou SF',
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight, route = 'VO') {
					const dailyDoseMg = weight * 0.75; // dose média (entre 0,5-1)
					const singleDoseMg = dailyDoseMg / 3; // 3 doses ao dia

					if (route === 'VO') {
						const drops = weight; // 1 gota/kg/dose
						return {
							dailyDose: `${dailyDoseMg.toFixed(2)} mg/dia`,
							singleDose: `${singleDoseMg.toFixed(2)} mg a cada 8h`,
							practicalDose: `${drops.toFixed(0)} gotas/dose (8/8h)`,
							details: `Dose diária: ${dailyDoseMg.toFixed(2)} mg (${weight} kg × 0,75 mg/kg/dia - dose média)<br>Faixa: ${(weight * 0.5).toFixed(2)}-${(weight * 1).toFixed(2)} mg/dia<br>3 doses ao dia (8/8h): ${singleDoseMg.toFixed(
								2,
							)} mg/dose<br>Gotas (0,17mg/gota): ${drops.toFixed(0)} gotas/dose`,
						};
					} else {
						const evDoseMl = weight * 0.03;
						return {
							dailyDose: `${dailyDoseMg.toFixed(2)} mg/dia`,
							singleDose: `${singleDoseMg.toFixed(2)} mg a cada 8h`,
							practicalDose: `${evDoseMl.toFixed(2)} ml/dose + completar para 20ml com AD/SF`,
							details: `Dose diária: ${dailyDoseMg.toFixed(2)} mg (${weight} kg × 0,75 mg/kg/dia - dose média)<br>Faixa: ${(weight * 0.5).toFixed(2)}-${(weight * 1).toFixed(2)} mg/dia<br>3 doses ao dia (8/8h): ${singleDoseMg.toFixed(
								2,
							)} mg/dose<br>EV: ${evDoseMl.toFixed(2)} ml/dose + completar para 20ml`,
						};
					}
				},
			},

			dramin: {
				name: 'DRAMIN',
				category: 'Gastrointestinais',
				presentation: 'FA 50mg/ml (EV ou IM)<br>Cp 50mg<br>Gotas: 25mg/ml (1mg/gota)',
				dose: '1-1,5mg/kg/dose 6/6h',
				practicalRule: 'VO – 1gt/kg/dose',
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const singleDoseMg = weight * 1.25; // dose média (entre 1-1,5)
					const dailyDoseMg = singleDoseMg * 4; // 6/6h = 4 doses ao dia

					const drops = weight; // 1 gota/kg/dose

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada 6h`,
						practicalDose: `${drops.toFixed(0)} gotas/dose (VO)`,
						details: `Dose por administração: ${singleDoseMg.toFixed(1)} mg (${weight} kg × 1,25 mg/kg/dose - dose média)<br>Faixa: ${(weight * 1).toFixed(1)}-${(weight * 1.5).toFixed(1)} mg/dose<br>4 doses ao dia (6/6h) = ${dailyDoseMg.toFixed(
							1,
						)} mg/dia<br>Gotas (1mg/gota): ${drops.toFixed(0)} gotas/dose`,
					};
				},
			},

			ondansetrona: {
				name: 'ONDASENTRONA',
				category: 'Gastrointestinais',
				presentation: 'FA 2mg/ml (4mg/2ml ou 8mg/4ml)<br>Cp 4mg ; 8mg',
				dose: 'VO 2-11a: 4mg 8/8h<br>VO >= 12a: 8mg 8/8h<br>EV: 0,15mg/kg/dose (Rediluir para 0,08mg/ml de SF em 15min – Ex: 4mg em 50ml SF)',
				practicalRule: 'EV - 0,075 x P = ml/dose',
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight, ageMonths = null, route = 'VO') {
					if (route === 'VO') {
						if (ageYears && ageYears >= 12) {
							return {
								dailyDose: '24 mg/dia (8mg 3x/dia)',
								singleDose: '8 mg a cada 8h',
								practicalDose: 'Comprimido de 8mg: 1 cp a cada 8h',
								details: 'Para ≥12 anos: dose fixa de 8mg por administração<br>3 doses ao dia (8/8h) = 24 mg/dia',
							};
						} else {
							return {
								dailyDose: '12 mg/dia (4mg 3x/dia)',
								singleDose: '4 mg a cada 8h',
								practicalDose: 'Comprimido de 4mg: 1 cp a cada 8h',
								details: 'Para 2-11 anos: dose fixa de 4mg por administração<br>3 doses ao dia (8/8h) = 12 mg/dia',
							};
						}
					} else {
						// EV
						const singleDoseMg = weight * 0.15;
						const dailyDoseMg = singleDoseMg * 3; // 8/8h = 3 doses ao dia
						const practicalDoseMl = weight * 0.075;

						return {
							dailyDose: `${dailyDoseMg.toFixed(2)} mg/dia`,
							singleDose: `${singleDoseMg.toFixed(2)} mg a cada 8h`,
							practicalDose: `${practicalDoseMl.toFixed(2)} ml/dose (solução EV)`,
							details: `Dose EV: ${singleDoseMg.toFixed(2)} mg (${weight} kg × 0,15 mg/kg/dose)<br>3 doses ao dia (8/8h) = ${dailyDoseMg.toFixed(2)} mg/dia<br>Rediluir para 0,08mg/ml em SF (ex: 4mg em 50ml SF)`,
						};
					}
				},
			},

			domperidona: {
				name: 'DOMPERIDONA (Motilium)',
				category: 'Gastrointestinais',
				presentation: 'SUSPENSÃO 1mg/ml<br>Cp 10mg',
				dose: '0,25-0,4mg/kg/dose 8/8h (antes das refeições)',
				practicalRule: '0,3xP = ml/dose',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Administrar antes das refeições',
				calculate: function (weight) {
					const singleDoseMg = weight * 0.325; // dose média (entre 0,25-0,4)
					const dailyDoseMg = singleDoseMg * 3; // 8/8h = 3 doses ao dia
					const practicalDoseMl = weight * 0.3;

					return {
						dailyDose: `${dailyDoseMg.toFixed(2)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(2)} mg a cada 8h (antes das refeições)`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml da suspensão/dose`,
						details: `Dose por administração: ${singleDoseMg.toFixed(2)} mg (${weight} kg × 0,325 mg/kg/dose - dose média)<br>Faixa: ${(weight * 0.25).toFixed(2)}-${(weight * 0.4).toFixed(
							2,
						)} mg/dose<br>3 doses ao dia (8/8h, antes das refeições) = ${dailyDoseMg.toFixed(2)} mg/dia<br>Suspensão 1mg/ml: ${practicalDoseMl.toFixed(1)} ml/dose`,
					};
				},
			},

			simeticona: {
				name: 'SIMETICONA (Luftal)',
				category: 'Gastrointestinais',
				presentation: 'GOTAS: 75mg/ml (2,5mg/gota)',
				dose: 'lactente 4-6gotas de 8/8h<br>< 12a: 8 gotas/dose até de 6/6h ou 4/4h<br>> 12a: 16 gotas/dose até de 6/6h ou 4/4h',
				practicalRule: 'Peso em gotas de 6/6hs (tem passagem apenas pelo Trato Gastrointestinal)',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Tem passagem apenas pelo Trato Gastrointestinal',
				calculate: function (weight, _ageMonths = null, isLactente = false) {
					if (isLactente) {
						return {
							dailyDose: '12-18 gotas/dia (4-6 gotas 3x/dia)',
							singleDose: '4-6 gotas a cada 8h',
							practicalDose: '4-6 gotas/dose',
							details: 'Para lactentes: 4-6 gotas por administração<br>3 doses ao dia (8/8h)<br>Total: 12-18 gotas/dia',
						};
					} else if (ageYears && ageYears < 12) {
						return {
							dailyDose: 'Até 32 gotas/dia (8 gotas até 4x/dia)',
							singleDose: '8 gotas/dose (até 6/6h ou 4/4h)',
							practicalDose: '8 gotas/dose',
							details: 'Para <12 anos: 8 gotas por administração<br>Até 4 doses ao dia (6/6h ou 4/4h)<br>Máximo: 32 gotas/dia (8 gotas × 4)',
						};
					} else {
						return {
							dailyDose: 'Até 64 gotas/dia (16 gotas até 4x/dia)',
							singleDose: '16 gotas/dose (até 6/6h ou 4/4h)',
							practicalDose: '16 gotas/dose',
							details: 'Para ≥12 anos: 16 gotas por administração<br>Até 4 doses ao dia (6/6h ou 4/4h)<br>Máximo: 64 gotas/dia (16 gotas × 4)',
						};
					}
				},
			},

			colikids: {
				name: 'COLIKIDS (Lactobacillus reuteri) ou PROVANCE',
				category: 'Gastrointestinais',
				presentation: 'GOTAS (5ml)',
				dose: '5 gotas 1x/dia. Pode diluir em sucos ou outros líquidos, exceto líquidos quentes.',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Pode diluir em sucos ou outros líquidos, exceto líquidos quentes.',
				calculate: function (weight) {
					return {
						dailyDose: 'Dose fixa: 5 gotas/dia',
						singleDose: '5 gotas (dose única diária)',
						practicalDose: '5 gotas 1x/dia',
						details: 'Dose fixa independente do peso: 5 gotas 1 vez ao dia<br>Pode diluir em sucos ou outros líquidos frios/mornos<br>NÃO diluir em líquidos quentes',
					};
				},
			},

			escopolamina: {
				name: 'ESCOPOLAMINA (Buscopan) – evitar em lactentes',
				category: 'Gastrointestinais',
				presentation: 'GOTAS: 10mg/ml (0,5mg/gota)<br>CP: 10mg<br>FA: 20mg/ml',
				dose: 'VO 1-6a: 5-10 gotas/dose de 8/8h<br>VO 6-14a: 10-20 gotas/dose de 8/8h<br>EV ou IM: 1-6a: 5mg/dose<br>> 6a: 10-20mg/dose',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'No uso EV, pode diluir com SF ou SG. Fazer lento, ~ 1ml/min. Evitar em lactentes.',
				calculate: function (weight, ageMonths = null, route = 'VO') {
					if (route === 'VO') {
						if (ageYears && ageYears >= 6) {
							return {
								dailyDose: '30-60 gotas/dia (10-20 gotas 3x/dia)',
								singleDose: '10-20 gotas a cada 8h',
								practicalDose: '10-20 gotas/dose (VO)',
								details: 'Idade 6-14 anos (VO): 10-20 gotas por administração<br>3 doses ao dia (8/8h) = 30-60 gotas/dia<br>Gotas 0,5mg/gota = 5-10 mg/dose',
							};
						} else {
							return {
								dailyDose: '15-30 gotas/dia (5-10 gotas 3x/dia)',
								singleDose: '5-10 gotas a cada 8h',
								practicalDose: '5-10 gotas/dose (VO)',
								details: 'Idade 1-6 anos (VO): 5-10 gotas por administração<br>3 doses ao dia (8/8h) = 15-30 gotas/dia<br>Gotas 0,5mg/gota = 2,5-5 mg/dose',
							};
						}
					} else {
						// EV/IM
						if (ageYears && ageYears >= 6) {
							return {
								dailyDose: '30-60 mg/dia (10-20 mg 3x/dia)',
								singleDose: '10-20 mg a cada 8h (EV/IM)',
								practicalDose: 'FA 20mg/ml: 0,5-1 ml/dose',
								details: 'Idade >6 anos (EV/IM): 10-20 mg por administração<br>3 doses ao dia (8/8h) = 30-60 mg/dia<br>FA 20mg/ml: 0,5-1 ml/dose<br>Infundir lentamente (~1 ml/min)',
							};
						} else {
							return {
								dailyDose: '15 mg/dia (5 mg 3x/dia)',
								singleDose: '5 mg a cada 8h (EV/IM)',
								practicalDose: 'FA 20mg/ml: 0,25 ml/dose',
								details: 'Idade 1-6 anos (EV/IM): 5 mg por administração<br>3 doses ao dia (8/8h) = 15 mg/dia<br>FA 20mg/ml: 0,25 ml/dose<br>Infundir lentamente (~1 ml/min)',
							};
						}
					}
				},
			},

			escopolamina_dipirona: {
				name: 'ESCOPOLAMINA + DIPIRONA (Buscopan composto)',
				category: 'Gastrointestinais',
				presentation: 'GOTAS: 6,67 + 333,4mg/ml (0,5 + 25mg / gota)<br>EV: 6,67mg + 333,4mg/ml',
				dose: '1-6a: 0,1-0,2mg/kg/dose 8/8h ou 6/6h<br>> 6a: 0,2mg/kg/dose 8/8h ou 6/6h',
				practicalRule: '1-6a: 5-10gotas/dose<br>> 6a: 10-20gotas/dose<br>EV: 0,03 x Peso por dose (fazer lento, em 5 minutos)',
				renalAdjustment: null,
				maxDose: null,
				notes: 'EV: fazer lento, em 5 minutos',
				calculate: function (weight, ageMonths = null, route = 'VO') {
					if (route === 'VO') {
						if (ageYears && ageYears > 6) {
							const singleDoseMgHioscina = weight * 0.2;
							const singleDoseMgDipirona = singleDoseMgHioscina * 50; // proporção 1:50
							const drops = weight; // aproximadamente 1 gota/kg para >6a

							return {
								dailyDose: `Hioscina: ${(singleDoseMgHioscina * 3).toFixed(2)} mg/dia | Dipirona: ${(singleDoseMgDipirona * 3).toFixed(1)} mg/dia`,
								singleDose: `Hioscina: ${singleDoseMgHioscina.toFixed(2)} mg | Dipirona: ${singleDoseMgDipirona.toFixed(1)} mg a cada 8h`,
								practicalDose: `${Math.min(drops, 20).toFixed(0)} gotas/dose${drops > 20 ? ' (máximo 20)' : ''}`,
								details: `Idade >6 anos (VO):<br>Hioscina: ${singleDoseMgHioscina.toFixed(2)} mg/dose (${weight} × 0,2 mg/kg/dose)<br>Dipirona: ${singleDoseMgDipirona.toFixed(1)} mg/dose (proporção 1:50)<br>3 doses ao dia (8/8h)<br>Gotas: ${Math.min(
									drops,
									20,
								).toFixed(0)} gotas/dose (10-20 gotas)`,
							};
						} else {
							const singleDoseMgHioscina = weight * 0.15; // média entre 0,1-0,2
							const singleDoseMgDipirona = singleDoseMgHioscina * 50;
							const dropsMin = 5;
							const dropsMax = 10;
							const drops = weight <= 10 ? dropsMin : dropsMax;

							return {
								dailyDose: `Hioscina: ${(singleDoseMgHioscina * 3).toFixed(2)} mg/dia | Dipirona: ${(singleDoseMgDipirona * 3).toFixed(1)} mg/dia`,
								singleDose: `Hioscina: ${singleDoseMgHioscina.toFixed(2)} mg | Dipirona: ${singleDoseMgDipirona.toFixed(1)} mg a cada 8h`,
								practicalDose: `${drops} gotas/dose (5-10 gotas)`,
								details: `Idade 1-6 anos (VO):<br>Hioscina: ${singleDoseMgHioscina.toFixed(2)} mg/dose (${weight} × 0,15 mg/kg/dose - média)<br>Faixa: ${(weight * 0.1).toFixed(2)}-${(weight * 0.2).toFixed(2)} mg/dose<br>Dipirona: ${singleDoseMgDipirona.toFixed(
									1,
								)} mg/dose (proporção 1:50)<br>3 doses ao dia (8/8h)<br>Gotas: ${drops} gotas/dose (5-10 gotas)`,
							};
						}
					} else {
						// EV
						const evDoseMl = weight * 0.03;
						const singleDoseMgHioscina = evDoseMl * 6.67; // concentração 6,67mg/ml
						const singleDoseMgDipirona = evDoseMl * 333.4; // concentração 333,4mg/ml

						return {
							dailyDose: `Hioscina: ${(singleDoseMgHioscina * 3).toFixed(2)} mg/dia | Dipirona: ${(singleDoseMgDipirona * 3).toFixed(1)} mg/dia`,
							singleDose: `Hioscina: ${singleDoseMgHioscina.toFixed(2)} mg | Dipirona: ${singleDoseMgDipirona.toFixed(1)} mg a cada 8h`,
							practicalDose: `${evDoseMl.toFixed(2)} ml/dose (EV - lento em 5 minutos)`,
							details: `EV (todas as idades):<br>Hioscina: ${singleDoseMgHioscina.toFixed(2)} mg/dose<br>Dipirona: ${singleDoseMgDipirona.toFixed(1)} mg/dose<br>3 doses ao dia (8/8h)<br>Volume: ${evDoseMl.toFixed(
								2,
							)} ml/dose<br><span class="text-red-600 font-medium">Infundir lentamente em 5 minutos</span>`,
						};
					}
				},
			},

			lactulose: {
				name: 'LACTULOSE (Lactulona)',
				category: 'Gastrointestinais',
				presentation: 'XAROPE: 667mg/ml<br>SACHÊ: 10g em 15ml',
				dose: 'Constipação - 0,3-0,5ml/kg/dia 12/12h<br>Encefalopatia Hepática – 2-10ml/dia 8/8h a 6/6h (latcente) ou 10-15ml/kg/dia 8/8h a 4/4h (criança)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Na EH, ajustar a dose para manter 2-4 deleções por dia',
				calculate: function (weight, condition = 'constipacao', ageMonths = null) {
					if (condition === 'constipacao') {
						const dailyDoseMl = weight * 0.4; // média entre 0,3-0,5
						const singleDoseMl = dailyDoseMl / 2; // 12/12h

						// Dose por idade (fixas)
						let ageBasedDose = '';
						if (ageYears && ageYears < 1) ageBasedDose = '5 ml/dia';
						else if (ageYears && ageYears <= 5) ageBasedDose = '7,5 ml/dia';
						else if (ageYears && ageYears <= 12) ageBasedDose = '12 ml/dia';

						return {
							dailyDose: `${dailyDoseMl.toFixed(1)} ml/dia (peso)${ageBasedDose ? ` | ${ageBasedDose} (idade)` : ''}`,
							singleDose: `${singleDoseMl.toFixed(1)} ml a cada 12h`,
							practicalDose: '12/12h',
							details: `Constipação:<br>Por peso: ${dailyDoseMl.toFixed(1)} ml/dia (${weight} × 0,4 ml/kg/dia - média)<br>Faixa: ${(weight * 0.3).toFixed(1)}-${(weight * 0.5).toFixed(1)} ml/kg/dia<br>2 doses ao dia (12/12h): ${singleDoseMl.toFixed(1)} ml/dose${
								ageBasedDose ? `<br>Por idade: ${ageBasedDose}` : ''
							}`,
						};
					} else {
						// Encefalopatia hepática
						if (ageYears && ageYears < 1) {
							return {
								dailyDose: '2-10 ml/dia',
								singleDose: '0,7-3,3 ml a cada 8h (8/8h a 6/6h)',
								practicalDose: 'Ajustar para 2-4 deleções/dia',
								details: 'Encefalopatia Hepática (lactente):<br>Dose: 2-10 ml/dia<br>Dividir em 3-4 doses (8/8h a 6/6h)<br>Ajustar para manter 2-4 evacuações por dia',
							};
						} else {
							const dailyDoseMl = weight * 12.5; // média entre 10-15
							const singleDoseMl6h = dailyDoseMl / 4; // 6/6h
							const singleDoseMl4h = dailyDoseMl / 6; // 4/4h

							return {
								dailyDose: `${dailyDoseMl.toFixed(1)} ml/dia (${weight} × 12,5 ml/kg/dia)`,
								singleDose: `6/6h: ${singleDoseMl6h.toFixed(1)} ml/dose | 4/4h: ${singleDoseMl4h.toFixed(1)} ml/dose`,
								practicalDose: 'Ajustar para 2-4 deleções/dia',
								details: `Encefalopatia Hepática (criança):<br>Dose diária: ${dailyDoseMl.toFixed(1)} ml (${weight} × 12,5 ml/kg/dia - média)<br>Faixa: ${(weight * 10).toFixed(0)}-${(weight * 15).toFixed(
									0,
								)} ml/kg/dia<br>Dividir em 4-6 doses (8/8h a 4/4h)<br><span class="text-red-600 font-medium">Ajustar para manter 2-4 evacuações por dia</span>`,
							};
						}
					}
				},
			},

			oleo_mineral: {
				name: 'ÓLEO MINERAL (não fazer em menores de 4 anos ou com risco de aspiração!!)',
				category: 'Gastrointestinais',
				presentation: '---',
				dose: 'VO: 5-20ml/dose 1x/dia ou 12/12h - 1 a 3ml/kg/dia, 1-2x/dia (Máx: 50ml/dose)<br>Enema: 30-60ml dose única.',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Máximo 50ml/dose (VO)',
				notes: 'CONTRAINDICADO em menores de 4 anos ou com risco de aspiração!!',
				calculate: function (weight, ageMonths = null, route = 'VO') {
					if (ageYears && ageYears < 4) {
						return {
							dailyDose: 'CONTRAINDICADO < 4 anos',
							singleDose: 'NÃO RECOMENDADO',
							practicalDose: 'CONTRAINDICADO',
							details: "<span class='text-red-600 font-bold'>CONTRAINDICADO EM MENORES DE 4 ANOS OU COM RISCO DE ASPIRAÇÃO!</span>",
						};
					}

					if (route === 'VO') {
						const dailyDoseMl = weight * 2; // média entre 1-3 ml/kg/dia
						const maxDose = 50;
						let calculatedDose = Math.min(dailyDoseMl, maxDose);

						return {
							dailyDose: `${calculatedDose.toFixed(1)} ml/dia`,
							singleDose: `1x/dia: ${calculatedDose.toFixed(1)} ml | 2x/dia: ${(calculatedDose / 2).toFixed(1)} ml/dose`,
							practicalDose: 'Faixa: 5-20 ml/dose',
							details: `VO (≥4 anos, sem risco aspiração):<br>Dose diária: ${calculatedDose.toFixed(1)} ml (${weight} × 2 ml/kg/dia - média)${
								dailyDoseMl > maxDose ? `<br><span class="text-red-600 font-medium">Limitado ao máximo de ${maxDose} ml/dose</span>` : ''
							}<br>Faixa: ${(weight * 1).toFixed(0)}-${Math.min(weight * 3, maxDose).toFixed(0)} ml/kg/dia<br>Administrar 1-2x/dia<br>Faixa fixa: 5-20 ml/dose`,
						};
					} else {
						// Enema
						return {
							dailyDose: 'Dose única: 30-60 ml',
							singleDose: '30-60 ml (dose única)',
							practicalDose: '30-60 ml enema',
							details: 'Enema (dose única): 30-60 ml<br>Apenas para ≥4 anos sem risco de aspiração',
						};
					}
				},
			},

			solucao_mucosite: {
				name: 'Solução para Mucosite',
				category: 'Gastrointestinais',
				presentation: 'xilocaína 5ml + nistatina 5ml + eritromicina 5ml + hidróxido de alumínio 5ml',
				dose: 'bochechar e cuspir 8/8h',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Preparar misturando os componentes',
				calculate: function (weight) {
					return {
						dailyDose: 'Solução composta',
						singleDose: 'Bochechar e cuspir',
						practicalDose: 'Preparo: 5ml de cada componente',
						details: 'Preparação:<br>• Xilocaína: 5ml<br>• Nistatina: 5ml<br>• Eritromicina: 5ml<br>• Hidróxido de alumínio: 5ml<br><br>Total: 20ml da solução<br>Uso: bochechar e cuspir a cada 8 horas<br>Não engolir',
					};
				},
			},

			floratil: {
				name: 'FLORATIL',
				category: 'Gastrointestinais',
				presentation: 'sachês',
				dose: '1 sachê em pequena quantidade de água, 12/12h, por 3 dias.',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					return {
						dailyDose: '2 sachês/dia',
						singleDose: '1 sachê a cada 12h',
						practicalDose: '1 sachê em água 2x/dia',
						details: 'Dose fixa independente do peso:<br>1 sachê em pequena quantidade de água<br>2 vezes ao dia (12/12h)<br>Tratamento por 3 dias',
					};
				},
			},
		},

		// ============================================
		// CATEGORIA: Anti-histamínicos e Corticoides
		// ============================================
		antialergicos: {
			hidroxizine: {
				name: 'HIDROXIZINE (Hixizine)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'XAROPE 2mg/ml<br>CP 25mg',
				dose: '1-2mg/kg/dia 8/8h ou 6/6h',
				practicalRule: 'Peso/4 por dose (2mg/kg/dia)',
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const dailyDoseMg = weight * 1.5; // média entre 1-2
					const singleDose8h = dailyDoseMg / 3; // 8/8h
					const singleDose6h = dailyDoseMg / 4; // 6/6h
					const practicalDoseMl = weight / 4;

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `8/8h: ${singleDose8h.toFixed(1)} mg | 6/6h: ${singleDose6h.toFixed(1)} mg`,
						practicalDose: `${practicalDoseMl.toFixed(1)} ml do xarope/dose (2mg/kg/dia)`,
						details: `Dose diária: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 1,5 mg/kg/dia - média)<br>Faixa: ${weight.toFixed(1)}-${(weight * 2).toFixed(1)} mg/dia<br>Dividir em 3-4 doses (8/8h ou 6/6h)<br>Xarope 2mg/ml: ${practicalDoseMl.toFixed(
							1,
						)} ml/dose (para 2mg/kg/dia)`,
					};
				},
			},

			loratadina: {
				name: 'LORATADINA (Claritin) (evitar em menores de 2 anos)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'XAROPE 1mg/ml<br>CP 10mg',
				dose: '6m-2a = 2,5ml 1x/dia<br>2-5a = 5ml 1x/dia<br>≥ 6a ou ≥ 30kg: 10ml 1x/dia',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Evitar em menores de 2 anos',
				calculate: function (weight, ageMonths = null) {
					if (ageMonths) {
						if (ageMonths < 6) {
							return {
								dailyDose: 'Não recomendado < 6 meses',
								singleDose: 'NÃO RECOMENDADO',
								practicalDose: 'Contraindicado',
								details: "<span class='text-red-600 font-medium'>Não recomendado para menores de 6 meses</span>",
							};
						} else if (ageMonths >= 6 && ageMonths < 24) {
							return {
								dailyDose: '2,5 mg/dia',
								singleDose: '2,5 mg (dose única)',
								practicalDose: '2,5 ml do xarope 1x/dia',
								details: 'Idade 6 meses a 2 anos: 2,5 mg/dia<br>Xarope 1mg/ml: 2,5 ml 1 vez ao dia',
							};
						}
					}

					// Se não temos idade, usar peso como referência
					if (weight < 30) {
						// Assumir criança entre 2-5 anos
						return {
							dailyDose: '5 mg/dia',
							singleDose: '5 mg (dose única)',
							practicalDose: '5 ml do xarope 1x/dia',
							details: 'Para peso <30kg (aproximadamente 2-5 anos): 5 mg/dia<br>Xarope 1mg/ml: 5 ml 1 vez ao dia',
						};
					} else {
						return {
							dailyDose: '10 mg/dia',
							singleDose: '10 mg (dose única)',
							practicalDose: '10 ml do xarope OU 1 comprimido 1x/dia',
							details: 'Para ≥6 anos OU ≥30kg: 10 mg/dia<br>Xarope 1mg/ml: 10 ml 1 vez ao dia<br>OU Comprimido 10mg: 1 comprimido 1 vez ao dia',
						};
					}
				},
			},

			desloratadina: {
				name: 'DESLORATADINA (Sigmaliv, Desalex) (a partir de 6m)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'XAROPE 0,5mg/ml<br>CP 5mg',
				dose: '6m-2a: 1mg/dose 1x/dia = 2ml 1x/dia<br>2-5a: 1,25mg/dose 1x/dia = 2,5ml 1x/dia<br>5-10a: 2,5mg/dose 1x/dia = 5ml 1x/dia<br>≥ 10a: 5mg/dose 1x/dia = 10ml 1x/dia',
				practicalRule: 'Ver tabela por idade',
				renalAdjustment: null,
				maxDose: null,
				notes: 'A partir de 6 meses',
				calculate: function (weight, ageMonths = null) {
					const ageYears = Number.isFinite(ageMonths) ? ageMonths / 12 : null;
					if (!ageYears) {
						// Estimativa por peso se não tem idade
						if (weight < 10) ageYears = 1;
						else if (weight < 20) ageYears = 3;
						else if (weight < 30) ageYears = 7;
						else ageYears = 12;
					}

					if (ageYears < 0.5) {
						return {
							dailyDose: 'Não recomendado < 6 meses',
							singleDose: 'NÃO RECOMENDADO',
							practicalDose: 'Contraindicado',
							details: "<span class='text-red-600 font-medium'>Não recomendado para menores de 6 meses</span>",
						};
					} else if (ageYears >= 0.5 && ageYears < 2) {
						return {
							dailyDose: '1 mg/dia',
							singleDose: '1 mg (dose única)',
							practicalDose: '2 ml do xarope 1x/dia',
							details: 'Idade 6 meses a 2 anos: 1 mg/dia<br>Xarope 0,5mg/ml: 2 ml 1 vez ao dia',
						};
					} else if (ageYears >= 2 && ageYears < 5) {
						return {
							dailyDose: '1,25 mg/dia',
							singleDose: '1,25 mg (dose única)',
							practicalDose: '2,5 ml do xarope 1x/dia',
							details: 'Idade 2 a 5 anos: 1,25 mg/dia<br>Xarope 0,5mg/ml: 2,5 ml 1 vez ao dia',
						};
					} else if (ageYears >= 5 && ageYears < 10) {
						return {
							dailyDose: '2,5 mg/dia',
							singleDose: '2,5 mg (dose única)',
							practicalDose: '5 ml do xarope OU ½ comprimido 1x/dia',
							details: 'Idade 5 a 10 anos: 2,5 mg/dia<br>Xarope 0,5mg/ml: 5 ml 1 vez ao dia<br>OU Comprimido 5mg: ½ comprimido 1 vez ao dia',
						};
					} else {
						return {
							dailyDose: '5 mg/dia',
							singleDose: '5 mg (dose única)',
							practicalDose: '10 ml do xarope OU 1 comprimido 1x/dia',
							details: 'Idade ≥10 anos: 5 mg/dia<br>Xarope 0,5mg/ml: 10 ml 1 vez ao dia<br>OU Comprimido 5mg: 1 comprimido 1 vez ao dia',
						};
					}
				},
			},

			hidrocortisona: {
				name: 'HIDROCORTISONA (Solu cortef)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'FA 100mg/ml',
				dose: '2-5mg/kg/dose 6/6h ou 4/4h (asmal)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Diluição: 0,1-1mg/ml em SG5%. Correr em 30min.',
				calculate: function (weight, frequency = '6h') {
					const singleDoseMg = weight * 3.5; // média entre 2-5
					const dosesPerDay = frequency === '6h' ? 4 : 6;
					const dailyDoseMg = singleDoseMg * dosesPerDay;

					// Diluição
					const dilutionLow = singleDoseMg / 1; // 1mg/ml
					const dilutionHigh = singleDoseMg / 0.1; // 0,1mg/ml

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
						singleDose: `${singleDoseMg.toFixed(1)} mg a cada ${frequency === '6h' ? '6' : '4'}h`,
						practicalDose: `FA 100mg/ml: ${(singleDoseMg / 100).toFixed(2)} ml/dose`,
						details: `Dose por administração: ${singleDoseMg.toFixed(1)} mg (${weight} kg × 3,5 mg/kg/dose - média)<br>Faixa: ${(weight * 2).toFixed(1)}-${(weight * 5).toFixed(
							1,
						)} mg/dose<br>${dosesPerDay} doses ao dia (${frequency}/${frequency}h) = ${dailyDoseMg.toFixed(1)} mg/dia<br>Diluir para 0,1-1 mg/ml em SG5% (${dilutionLow.toFixed(0)}-${dilutionHigh.toFixed(0)} ml total)<br>Infundir em 30 minutos`,
					};
				},
			},

			dexametasona: {
				name: 'DEXAMETASONA',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'EV: 4mg/ml ou 8mg/ml<br>VO: 0,1mg/ml (elixir) ou 4mg (cp)',
				dose: 'Edema de glote: 0,6mg/kg/dose<br>Anti-Inflamatório: 0,08 a 0,3mg/kg/dia de 6/6hs ou 12/12hs<br>Meningite (> 6 semanas): 0,6mg/kg/dia, IV, 6/6hs',
				practicalRule: 'Peso/3 em ml de 8/8hs por 5 dias (Máx: 15ml/dose)',
				renalAdjustment: null,
				maxDose: 'Máximo 15ml/dose (prática)',
				notes: null,
				calculate: function (weight, indication = 'anti_inflamatorio') {
					if (indication === 'edema_glote') {
						const singleDoseMg = weight * 0.6;
						const maxDose = 8;

						let calculatedDose = singleDoseMg;
						if (calculatedDose > maxDose) calculatedDose = maxDose;

						return {
							dailyDose: `${calculatedDose.toFixed(2)} mg (DOSE ÚNICA)`,
							singleDose: `${calculatedDose.toFixed(2)} mg - DOSE ÚNICA`,
							practicalDose: `EV 4mg/ml: ${(calculatedDose / 4).toFixed(2)} ml<br>EV 8mg/ml: ${(calculatedDose / 8).toFixed(2)} ml`,
							details: `Edema de glote: dose única de ${calculatedDose.toFixed(2)} mg (${weight} kg × 0,6 mg/kg)${singleDoseMg > maxDose ? `<br><span class="text-red-600 font-medium">Limitado ao máximo de ${maxDose} mg</span>` : ''}<br>Não é necessário diluir`,
						};
					} else if (indication === 'meningite') {
						const dailyDoseMg = weight * 0.6;
						const singleDoseMg = dailyDoseMg / 4; // 6/6h = 4 doses ao dia

						return {
							dailyDose: `${dailyDoseMg.toFixed(2)} mg/dia`,
							singleDose: `${singleDoseMg.toFixed(2)} mg a cada 6h (IV)`,
							practicalDose: `EV 4mg/ml: ${(singleDoseMg / 4).toFixed(2)} ml/dose`,
							details: `Meningite (>6 semanas):<br>Dose diária: ${dailyDoseMg.toFixed(2)} mg (${weight} kg × 0,6 mg/kg/dia)<br>Dividido em 4 doses IV (6/6h): ${singleDoseMg.toFixed(2)} mg/dose`,
						};
					} else {
						// Anti-inflamatório
						const dailyDoseMg = weight * 0.19; // média entre 0,08-0,3
						const singleDose6h = dailyDoseMg / 4; // 6/6h
						const singleDose12h = dailyDoseMg / 2; // 12/12h
						const practicalDoseMl = weight / 3;
						const maxMl = 15;

						let calculatedMl = practicalDoseMl;
						if (calculatedMl > maxMl) calculatedMl = maxMl;

						return {
							dailyDose: `${dailyDoseMg.toFixed(2)} mg/dia`,
							singleDose: `6/6h: ${singleDose6h.toFixed(2)} mg | 12/12h: ${singleDose12h.toFixed(2)} mg`,
							practicalDose: `${Math.min(practicalDoseMl, maxMl).toFixed(1)} ml/dose (8/8h por 5 dias)${practicalDoseMl > maxMl ? ' (máximo)' : ''}`,
							details: `Anti-inflamatório:<br>Dose diária: ${dailyDoseMg.toFixed(2)} mg (${weight} kg × 0,19 mg/kg/dia - média)<br>Faixa: ${(weight * 0.08).toFixed(2)}-${(weight * 0.3).toFixed(
								2,
							)} mg/kg/dia<br>Dividir em 2-4 doses (12/12h ou 6/6h)<br>Regra prática (VO): ${Math.min(practicalDoseMl, maxMl).toFixed(1)} ml do elixir (0,1mg/ml) 8/8h por 5 dias`,
						};
					}
				},
			},

			fexofenadina: {
				name: 'FEXOFENADINA (Allegra Pediátrico)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'SUSPENSÃO ORAL 6mg/ml',
				dose: 'Urticária: 6m-2a (ou ≤ 10,5kg): 2,5ml (15mg) 12/12h<br>' + 'Rinite alérgica ou urticária: 2-11a (ou > 10,5kg): 5ml (30mg) 12/12h<br>' + '≥ 12a: 10ml (60mg) 12/12h (ou conforme apresentação)',
				practicalRule: '6mg/ml: 2,5ml=15mg | 5ml=30mg | 10ml=60mg',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Evitar junto com suco de frutas. Segurança/eficácia NÃO estabelecida: rinite < 2 anos; urticária < 6 meses.',
				calculate: function (weight, ageMonths = null, indication = 'rinite_ou_urticaria') {
					const mgPerMl = 6;

					if (ageMonths !== null && ageMonths < 6) {
						return {
							dailyDose: 'Não recomendado < 6 meses',
							singleDose: 'NÃO RECOMENDADO',
							practicalDose: 'Contraindicado',
							details: "<span class='text-red-600 font-medium'>Allegra Pediátrico: eficácia/segurança não estabelecida para urticária idiopática crônica < 6 meses.</span>",
						};
					}

					// Regra de decisão por idade (preferencial). Se idade não vier, usa peso como proxy (10,5 kg).
					let group = null;
					if (ageMonths !== null) {
						if (ageMonths >= 6 && ageMonths < 24) group = '6m-2a';
						else if (ageMonths >= 24 && ageMonths < 144) group = '2-11a';
						else if (ageMonths >= 144) group = '>=12a';
					} else if (typeof weight === 'number') {
						if (weight <= 10.5) group = '6m-2a';
						else if (weight > 10.5) group = '2-11a';
					}

					// Doses por grupo
					// Nota: 6m-2a (ou ≤10,5kg) está explicitamente descrito para URTICÁRIA; para rinite <2a, não estabelecido.
					let mlPerDose = null;
					let freq = '12/12h (2x/dia)';
					let groupLabel = 'idade não informada';

					if (group === '6m-2a') {
						mlPerDose = 2.5;
						groupLabel = '6m–2a (ou ≤10,5 kg)';
					} else if (group === '2-11a') {
						mlPerDose = 5;
						groupLabel = '2–11a (ou >10,5 kg)';
					} else if (group === '>=12a') {
						mlPerDose = 10;
						groupLabel = '≥12a';
					}

					if (mlPerDose === null) {
						return {
							dailyDose: 'Depende de idade/peso',
							singleDose: 'Informe ageMonths (meses) para calcular',
							practicalDose: '—',
							details: 'Para fexofenadina pediátrica, a posologia é principalmente por FAIXA ETÁRIA/limiar de peso (10,5kg). ' + 'Informe ageMonths para saída precisa.',
						};
					}

					const mgPerDose = mlPerDose * mgPerMl;
					const dailyMg = mgPerDose * 2;

					const warn =
						group === '6m-2a' && indication !== 'urticaria'
							? "<br><span class='text-amber-700 font-medium'>Atenção: para rinite alérgica sazonal, a eficácia/segurança NÃO está estabelecida abaixo de 2 anos. A tabela de 6m–2a refere-se à urticária.</span>"
							: '';

					return {
						dailyDose: `${dailyMg.toFixed(0)} mg/dia`,
						singleDose: `${mgPerDose.toFixed(0)} mg ${freq}`,
						practicalDose: `${mlPerDose.toFixed(1)} ml da suspensão (6mg/ml) por dose, ${freq}`,
						details:
							`Grupo: ${groupLabel}` +
							`<br>Dose: ${mlPerDose.toFixed(1)} ml/dose × 2 = ${dailyMg.toFixed(0)} mg/dia` +
							`<br>Conversão: ${mlPerDose.toFixed(1)} ml × 6 mg/ml = ${mgPerDose.toFixed(0)} mg por dose` +
							`<br>Evitar junto com suco de frutas; preferir água.` +
							warn,
					};
				},
			},

			bilastina: {
				name: 'BILASTINA (Alektos Ped)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'SOLUÇÃO ORAL 2,5mg/ml',
				dose: '6–11a E ≥ 20kg: 4ml (10mg) 1x/dia<br>' + 'Administrar em jejum: 1h antes OU 2h após alimentos/sucos',
				practicalRule: '2,5mg/ml: 4ml = 10mg',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Evitar sucos de frutas (reduz absorção). Uso pediátrico descrito para 6–11 anos e ≥20 kg.',
				calculate: function (weight, ageMonths = null) {
					const mgPerMl = 2.5;

					if (ageMonths !== null) {
						if (ageMonths < 72) {
							return {
								dailyDose: 'Não indicado < 6 anos',
								singleDose: 'NÃO INDICADO',
								practicalDose: '—',
								details: "<span class='text-red-600 font-medium'>Bilastina (Alektos Ped): posologia pediátrica descrita para 6–11 anos.</span>",
							};
						}
						if (ageMonths >= 144) {
							return {
								dailyDose: 'Fora do recorte pediátrico',
								singleDose: 'Considere posologia de adulto conforme prescrição',
								practicalDose: '—',
								details: 'Alektos Ped é a apresentação pediátrica (6–11 anos). Para ≥12 anos, a dose costuma seguir apresentação/adulto.',
							};
						}
					}

					if (typeof weight !== 'number') {
						return {
							dailyDose: 'Depende de peso (limiar)',
							singleDose: 'Informe weight para checar ≥20kg',
							practicalDose: '—',
							details: 'Bilastina pediátrica requer ≥20 kg (além da faixa etária).',
						};
					}

					if (weight < 20) {
						return {
							dailyDose: 'Não indicado < 20kg',
							singleDose: 'NÃO INDICADO',
							practicalDose: '—',
							details: `<span class='text-red-600 font-medium'>Peso: ${weight.toFixed(1)} kg. Bilastina (Alektos Ped) exige ≥ 20 kg na posologia pediátrica.</span>`,
						};
					}

					const ml = 4;
					const doseMg = ml * mgPerMl;

					return {
						dailyDose: `${doseMg.toFixed(0)} mg/dia`,
						singleDose: `${doseMg.toFixed(0)} mg (dose única diária)`,
						practicalDose: `${ml.toFixed(1)} ml da solução (2,5mg/ml) 1x/dia`,
						details: `Dose: ${ml.toFixed(1)} ml × 2,5 mg/ml = ${doseMg.toFixed(0)} mg/dia` + `<br><span class='text-amber-700 font-medium'>Administrar em jejum: 1h antes ou 2h após alimentos/sucos de frutas.</span>`,
					};
				},
			},

			montelucaste: {
				name: 'MONTELUCASTE (Montelair / similares)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'GRANULADO 4mg (sachê)<br>CP mastigável 4mg/5mg<br>CP revestido 10mg',
				dose: '6m–2a: 4mg (sachê) 1x/dia<br>' + '2–5a: 4mg (mastigável OU sachê) 1x/dia<br>' + '6–14a: 5mg (mastigável) 1x/dia<br>' + '≥ 15a: 10mg 1x/dia',
				practicalRule: 'Dose fixa por faixa etária (1x/dia)',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Asma: preferir ao anoitecer. Rinite: 1x/dia conforme prescrição. Não trata crise aguda. Atenção a alterações de humor/comportamento.',
				calculate: function (weight, ageMonths = null) {
					if (ageMonths === null) {
						return {
							dailyDose: 'Depende de idade',
							singleDose: 'Informe ageMonths (meses)',
							practicalDose: '—',
							details: 'Montelucaste é dose fixa por faixa etária.',
						};
					}

					if (ageMonths < 6) {
						return {
							dailyDose: 'Não estabelecido < 6 meses',
							singleDose: 'NÃO RECOMENDADO',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Montelucaste: segurança/eficácia não estabelecida para menores de 6 meses.</span>",
						};
					}

					let mg = null;
					let form = null;

					if (ageMonths >= 6 && ageMonths < 24) {
						mg = 4;
						form = 'Granulado 4mg (sachê)';
					} else if (ageMonths >= 24 && ageMonths < 72) {
						mg = 4;
						form = 'CP mastigável 4mg OU granulado 4mg';
					} else if (ageMonths >= 72 && ageMonths < 180) {
						mg = 5;
						form = 'CP mastigável 5mg';
					} else {
						mg = 10;
						form = 'CP 10mg';
					}

					return {
						dailyDose: `${mg} mg/dia`,
						singleDose: `${mg} mg (dose única diária)`,
						practicalDose: `${form} 1x/dia`,
						details: `Faixa etária (meses): ${ageMonths}` + `<br>Dose: ${mg} mg 1x/dia` + `<br><span class='text-amber-700 font-medium'>Asma: preferir ao anoitecer. Não usar como resgate de crise.</span>`,
					};
				},
			},

			cetirizina: {
				name: 'CETIRIZINA',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'SOLUÇÃO ORAL 1mg/ml (ex.: Zyrtec)<br>GOTAS 10mg/ml (usual: 0,5mg/gota; 20 gotas = 10mg)',
				dose: '2–6a: 2,5mg 12/12h (máx 5mg/dia) OU conforme prescrição<br>' + '6–12a: 5mg 12/12h (máx 10mg/dia)<br>' + '≥ 12a: 10mg 1x/dia (ou 5mg 12/12h)',
				practicalRule: '1mg/ml: 2,5mg=2,5ml | 5mg=5ml | 10mg=10ml<br>10mg/ml gotas: 2,5mg=5 gotas | 5mg=10 gotas | 10mg=20 gotas',
				renalAdjustment: 'Ajustar em insuficiência renal (ver bula específica).',
				maxDose: null,
				notes: 'A posologia varia por apresentação (solução 1mg/ml vs gotas 10mg/ml) e função renal.',
				calculate: function (weight, ageMonths = null) {
					// Base principal: solução 1mg/ml (ml == mg). Conversão de gotas quando 10mg/ml: 0,5mg/gota.
					const mgPerDrop = 0.5;

					if (ageMonths === null) {
						return {
							dailyDose: 'Depende de idade',
							singleDose: 'Informe ageMonths (meses)',
							practicalDose: '—',
							details: 'Cetirizina: dose por faixa etária; considerar também função renal.',
						};
					}

					if (ageMonths < 24) {
						return {
							dailyDose: 'Fora do recorte padronizado (2 anos+)',
							singleDose: 'Considere bula específica/prescrição',
							practicalDose: '—',
							details: "<span class='text-amber-700 font-medium'>A apresentação e bula variam: para &lt;2 anos, não padronizei aqui (use a bula do produto específico/prescrição).</span>",
						};
					}

					let mgPerDose = null;
					let dosesPerDay = null;
					let regimen = null;

					if (ageMonths >= 24 && ageMonths < 72) {
						mgPerDose = 2.5;
						dosesPerDay = 2;
						regimen = '2,5mg 12/12h';
					} else if (ageMonths >= 72 && ageMonths < 144) {
						mgPerDose = 5;
						dosesPerDay = 2;
						regimen = '5mg 12/12h';
					} else {
						mgPerDose = 10;
						dosesPerDay = 1;
						regimen = '10mg 1x/dia';
					}

					const dailyMg = mgPerDose * dosesPerDay;

					const mlSolution = mgPerDose; // 1mg/ml
					const drops = mgPerDose / mgPerDrop;

					return {
						dailyDose: `${dailyMg.toFixed(1)} mg/dia`,
						singleDose: `${mgPerDose.toFixed(1)} mg (${regimen})`,
						practicalDose: `Solução 1mg/ml: ${mlSolution.toFixed(1)} ml por dose` + ` | Gotas 10mg/ml: ${drops.toFixed(0)} gotas por dose`,
						details:
							`Regime: ${regimen}` +
							`<br>Solução 1mg/ml: ${mlSolution.toFixed(1)} ml = ${mgPerDose.toFixed(1)} mg por dose` +
							`<br>Gotas 10mg/ml (0,5mg/gota): ${drops.toFixed(0)} gotas = ${mgPerDose.toFixed(1)} mg por dose` +
							`<br><span class='text-amber-700 font-medium'>Ajustar em insuficiência renal conforme bula do produto.</span>`,
					};
				},
			},

			levocetirizina: {
				name: 'LEVOCETIRIZINA (ex.: Zyxem / similares)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'GOTAS 5mg/ml (1ml = 20 gotas; 1 gota = 0,25mg)<br>CP 5mg',
				dose: '2–6a: 1,25mg 12/12h (5 gotas 12/12h; máx 2,5mg/dia)<br>' + '≥ 6a: 5mg 1x/dia (20 gotas/dia OU 1 cp 5mg)',
				practicalRule: '0,25mg/gota: 5 gotas=1,25mg | 20 gotas=5mg',
				renalAdjustment: 'Ajustar em insuficiência renal (ver bula específica).',
				maxDose: '5mg/dia (≥6a e adultos); 2,5mg/dia (2–6a)',
				notes: 'Preferir 1x/dia à noite se sonolência. Em DRC, reduzir conforme ClCr.',
				calculate: function (weight, ageMonths = null) {
					const mgPerDrop = 0.25;

					if (ageMonths === null) {
						return {
							dailyDose: 'Depende de idade',
							singleDose: 'Informe ageMonths (meses)',
							practicalDose: '—',
							details: 'Levocetirizina: dose por faixa etária; considerar função renal.',
						};
					}

					if (ageMonths < 24) {
						return {
							dailyDose: 'Não padronizado aqui < 2 anos',
							singleDose: 'Considere bula/prescrição',
							practicalDose: '—',
							details: "<span class='text-amber-700 font-medium'>Para &lt;2 anos, não padronizei a posologia nesta estrutura.</span>",
						};
					}

					let regimen = null;
					let mgPerDose = null;
					let dosesPerDay = null;

					if (ageMonths >= 24 && ageMonths < 72) {
						regimen = '1,25mg 12/12h';
						mgPerDose = 1.25;
						dosesPerDay = 2;
					} else {
						regimen = '5mg 1x/dia';
						mgPerDose = 5;
						dosesPerDay = 1;
					}

					const dailyMg = mgPerDose * dosesPerDay;
					const dropsPerDose = mgPerDose / mgPerDrop;

					return {
						dailyDose: `${dailyMg.toFixed(2)} mg/dia`,
						singleDose: `${mgPerDose.toFixed(2)} mg (${regimen})`,
						practicalDose: `${dropsPerDose.toFixed(0)} gotas por dose`,
						details:
							`Regime: ${regimen}` +
							`<br>Conversão: 1 gota = 0,25mg → ${dropsPerDose.toFixed(0)} gotas = ${mgPerDose.toFixed(2)} mg` +
							`<br>Total diário: ${dailyMg.toFixed(2)} mg/dia` +
							`<br><span class='text-amber-700 font-medium'>Ajustar em insuficiência renal conforme bula do produto.</span>`,
					};
				},
			},

			ebastina: {
				name: 'EBASTINA (Ebastel / similares)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'XAROPE 1mg/ml<br>CP 10mg',
				dose: '2–5a: 2,5ml (2,5mg) 1x/dia<br>' + '6–11a: 5ml (5mg) 1x/dia<br>' + '≥ 12a: 10ml (10mg) 1x/dia',
				practicalRule: '1mg/ml: ml = mg (2,5ml=2,5mg | 5ml=5mg | 10ml=10mg)',
				renalAdjustment: null,
				maxDose: '10mg/dia',
				notes: 'Em insuficiência hepática leve a moderada, não exceder 10mg/dia (ver bula).',
				calculate: function (weight, ageMonths = null) {
					if (ageMonths === null) {
						return {
							dailyDose: 'Depende de idade',
							singleDose: 'Informe ageMonths (meses)',
							practicalDose: '—',
							details: 'Ebastina: dose fixa por faixa etária (xarope 1mg/ml).',
						};
					}

					if (ageMonths < 24) {
						return {
							dailyDose: 'Não indicado < 2 anos',
							singleDose: 'NÃO INDICADO',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Ebastina xarope: posologia de bula a partir de 2 anos.</span>",
						};
					}

					let ml = null;
					let label = null;

					if (ageMonths >= 24 && ageMonths < 72) {
						ml = 2.5;
						label = '2–5 anos';
					} else if (ageMonths >= 72 && ageMonths < 144) {
						ml = 5;
						label = '6–11 anos';
					} else {
						ml = 10;
						label = '≥ 12 anos';
					}

					const mg = ml; // 1mg/ml

					return {
						dailyDose: `${mg.toFixed(1)} mg/dia`,
						singleDose: `${mg.toFixed(1)} mg (dose única diária)`,
						practicalDose: `${ml.toFixed(1)} ml do xarope 1mg/ml 1x/dia`,
						details: `Faixa: ${label}` + `<br>Xarope 1mg/ml: ${ml.toFixed(1)} ml = ${mg.toFixed(1)} mg` + `<br><span class='text-amber-700 font-medium'>Se insuficiência hepática leve/moderada: não exceder 10mg/dia.</span>`,
					};
				},
			},

			dexclorfeniramina: {
				name: 'DEXCLORFENIRAMINA (Polaramine) (para maiores de 2 anos)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'Cp 2mg; Solução Oral 2mg/5ml; Gotas 2,8mg/ml',
				dose: '2-6a = 1,25ml ou 5 gotas (3x/dia)<br>6-12a = ½ cp ou 2,5 ou 10 gotas (3x/dia)<br>> 12a = 1 cp ou 20 gotas (3x/dia)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Para maiores de 2 anos',
				calculate: function (weight, ageMonths = null) {
					const ageYears = Number.isFinite(ageMonths) ? ageMonths / 12 : null;
					if (ageYears && ageYears < 2) {
						return {
							dailyDose: 'Não recomendado < 2 anos',
							singleDose: 'NÃO RECOMENDADO',
							practicalDose: 'Contraindicado',
							details: "<span class='text-red-600 font-medium'>Não recomendado para menores de 2 anos</span>",
						};
					}

					if (ageYears) {
						if (ageYears >= 2 && ageYears < 6) {
							return {
								dailyDose: '7,5 mg/dia (2,5 mg 3x/dia)',
								singleDose: '2,5 mg (1,25ml solução OU 5 gotas)',
								practicalDose: '1,25 ml da solução OU 5 gotas 3x/dia',
								details: 'Idade 2-6 anos:<br>2,5 mg por administração (0,4ml gotas = 5 gotas)<br>3 vezes ao dia = 7,5 mg/dia<br>Solução 2mg/5ml: 1,25 ml/dose<br>Gotas 2,8mg/ml: 5 gotas/dose',
							};
						} else if (ageYears >= 6 && ageYears <= 12) {
							return {
								dailyDose: '6 mg/dia (2 mg 3x/dia)',
								singleDose: '2 mg (½ comprimido OU 2,5ml solução OU 10 gotas)',
								practicalDose: '½ comprimido OU 2,5 ml solução OU 10 gotas 3x/dia',
								details: 'Idade 6-12 anos:<br>2 mg por administração<br>3 vezes ao dia = 6 mg/dia<br>Comprimido 2mg: ½ comprimido/dose<br>Solução 2mg/5ml: 2,5 ml/dose<br>Gotas 2,8mg/ml: 10 gotas/dose',
							};
						} else {
							return {
								dailyDose: '12 mg/dia (4 mg 3x/dia)',
								singleDose: '4 mg (1 comprimido OU 5ml solução OU 20 gotas)',
								practicalDose: '1 comprimido OU 5 ml solução OU 20 gotas 3x/dia',
								details: 'Idade >12 anos:<br>4 mg por administração<br>3 vezes ao dia = 12 mg/dia<br>Comprimido 2mg: 2 comprimidos/dose (4mg)<br>Solução 2mg/5ml: 5 ml/dose (2mg)<br>Gotas 2,8mg/ml: 20 gotas/dose (5,6mg)',
							};
						}
					}

					// Se não tem idade, estimar por peso
					if (weight < 15) {
						return {
							dailyDose: '7,5 mg/dia (2,5 mg 3x/dia)',
							singleDose: '2,5 mg (1,25ml solução OU 5 gotas)',
							practicalDose: '1,25 ml da solução OU 5 gotas 3x/dia',
							details: 'Estimativa para peso <15kg (≈2-6 anos)',
						};
					} else if (weight <= 40) {
						return {
							dailyDose: '6 mg/dia (2 mg 3x/dia)',
							singleDose: '2 mg (½ comprimido OU 2,5ml solução OU 10 gotas)',
							practicalDose: '½ comprimido OU 2,5 ml solução OU 10 gotas 3x/dia',
							details: 'Estimativa para peso 15-40kg (≈6-12 anos)',
						};
					} else {
						return {
							dailyDose: '12 mg/dia (4 mg 3x/dia)',
							singleDose: '4 mg (1 comprimido OU 5ml solução OU 20 gotas)',
							practicalDose: '1 comprimido OU 5 ml solução OU 20 gotas 3x/dia',
							details: 'Estimativa para peso >40kg (≈>12 anos)',
						};
					}
				},
			},

			prednisolona: {
				name: 'PREDNISOLONA (Prelone, Predsim)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'SOLUÇÃO: 3mg/ml<br>CP 5mg ; 20mg',
				dose: 'Ataque: 1-2mg/kg/dose 6/6h (asmal)<br>1-2mg/kg/dia 1x/dia por 5-7d (asmal)',
				practicalRule: 'P/3 = dose ml',
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight, regimen = 'ataque') {
					if (regimen === 'ataque') {
						const singleDoseMg = weight * 1.5; // média entre 1-2
						const dailyDoseMg = singleDoseMg * 4; // 6/6h = 4 doses ao dia
						const practicalDoseMl = weight / 3;

						return {
							dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
							singleDose: `${singleDoseMg.toFixed(1)} mg a cada 6h`,
							practicalDose: `${practicalDoseMl.toFixed(1)} ml da solução/dose`,
							details: `Ataque (asma):<br>Dose por administração: ${singleDoseMg.toFixed(1)} mg (${weight} kg × 1,5 mg/kg/dose - média)<br>Faixa: ${weight.toFixed(1)}-${(weight * 2).toFixed(1)} mg/dose<br>4 doses ao dia (6/6h) = ${dailyDoseMg.toFixed(
								1,
							)} mg/dia<br>Solução 3mg/ml: ${practicalDoseMl.toFixed(1)} ml/dose`,
						};
					} else {
						const dailyDoseMg = weight * 1.5; // média entre 1-2
						const practicalDoseMl = weight / 3;

						return {
							dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia`,
							singleDose: `${dailyDoseMg.toFixed(1)} mg 1x/dia`,
							practicalDose: `${practicalDoseMl.toFixed(1)} ml da solução 1x/dia`,
							details: `Manutenção (asma):<br>Dose diária: ${dailyDoseMg.toFixed(1)} mg (${weight} kg × 1,5 mg/kg/dia - média)<br>Faixa: ${weight.toFixed(1)}-${(weight * 2).toFixed(
								1,
							)} mg/dia<br>1 dose ao dia por 5-7 dias<br>Solução 3mg/ml: ${practicalDoseMl.toFixed(1)} ml 1 vez ao dia`,
						};
					}
				},
			},

			prometazina: {
				name: 'PROMETAZINA (Fenergan)',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'FA 25mg/ml',
				dose: '0,1mg/kg/dose 6/6h - Máximo 1mg/kg/dia',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Máximo 1mg/kg/dia',
				notes: 'FAZER IM. Passar para anti-histamínicos VO (opção do Fenergan VO 25mg/cp) assim que possível!',
				calculate: function (weight) {
					const singleDoseMg = weight * 0.1;
					const dailyDoseMg = singleDoseMg * 4; // 6/6h = 4 doses ao dia
					const maxDailyDose = weight * 1;

					let calculatedDailyDose = dailyDoseMg;
					if (calculatedDailyDose > maxDailyDose) calculatedDailyDose = maxDailyDose;

					const calculatedSingleDose = calculatedDailyDose / 4;

					return {
						dailyDose: `${Math.min(dailyDoseMg, maxDailyDose).toFixed(2)} mg/dia`,
						singleDose: `${calculatedSingleDose.toFixed(2)} mg a cada 6h (IM)`,
						practicalDose: `FA 25mg/ml: ${(calculatedSingleDose / 25).toFixed(2)} ml/dose`,
						details: `Dose por administração: ${calculatedSingleDose.toFixed(2)} mg (baseado em ${singleDoseMg.toFixed(2)} mg - ${weight} × 0,1 mg/kg/dose)${
							dailyDoseMg > maxDailyDose ? `<br><span class="text-red-600 font-medium">Ajustado para máximo de ${maxDailyDose.toFixed(1)} mg/dia (1 mg/kg/dia)</span>` : ''
						}<br>4 doses ao dia (6/6h)<br><span class="text-red-600 font-bold">ADMINISTRAR IM! Passar para VO assim que possível.</span>`,
					};
				},
			},

			sulfato_ferroso: {
				name: 'SULFATO FERROSO',
				category: 'Anti-histamínicos/Corticoides',
				presentation: 'VO: 1mg Fe³⁺/gota = 25mg/ml',
				dose: '4mg/kg/dia (2x/dia) antes das refeições e com sucos cítricos p/melhor absorção por 3 meses',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Dica: Anemia Ferropriva (Fe³⁺ ↓; Ferritina ↓; TIBC ↑; Sat. Transferrina ↓)',
				calculate: function (weight) {
					const dailyDoseMgFe = weight * 4; // mg de ferro elementar
					const dailyDoseMgSulfato = dailyDoseMgFe * 5; // conversão aproximada: sulfato ferroso tem ~20% Fe elementar
					const singleDoseMgFe = dailyDoseMgFe / 2;
					const singleDoseMgSulfato = dailyDoseMgSulfato / 2;

					// Gotas (1mg Fe³⁺/gota)
					const drops = dailyDoseMgFe; // 1 gota = 1mg Fe³⁺
					const dropsPerDose = drops / 2;

					return {
						dailyDose: `${dailyDoseMgFe.toFixed(1)} mg de ferro elementar/dia (≈${dailyDoseMgSulfato.toFixed(0)} mg de sulfato ferroso)`,
						singleDose: `${singleDoseMgFe.toFixed(1)} mg Fe a cada 12h`,
						practicalDose: `${dropsPerDose.toFixed(0)} gotas 2x/dia (antes das refeições)`,
						details: `Ferro elementar: ${dailyDoseMgFe.toFixed(1)} mg/dia (${weight} kg × 4 mg/kg/dia)<br>2 doses ao dia (12/12h): ${singleDoseMgFe.toFixed(1)} mg Fe/dose<br>Gotas (1mg Fe³⁺/gota): ${dropsPerDose.toFixed(
							0,
						)} gotas 2x/dia<br>Administrar ANTES das refeições com sucos cítricos<br>Tratamento por 3 meses<br><span class="text-blue-600 font-medium">Dica: Anemia Ferropriva (Fe³⁺ ↓; Ferritina ↓; TIBC ↑; Sat. Transferrina ↓)</span>`,
					};
				},
			},
		},

		// ============================================
		// CATEGORIA: Antitussígenos
		// ============================================
		antitussigenos: {
			koid_d: {
				name: 'KOID D (Betametasona + Dexclorfeniramina)',
				category: 'Antitussígenos',
				presentation: 'VO: 0,25mg + 2mg/5ml',
				dose: '2 a 6 anos = 2ml de 8/8hs ou 6/6hs<br>6 a 12 anos = 2,5ml de 8/8hs ou 6/6hs<br>> 12 anos = 5 a 10ml de 8/8hs ou 6/6hs',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight, ageMonths = null) {
					const ageYears = Number.isFinite(ageMonths) ? ageMonths / 12 : null;
					if (ageYears) {
						if (ageYears >= 2 && ageYears < 6) {
							return {
								dailyDose: 'Betametasona: 0,3-0,6 mg/dia | Dexclorfeniramina: 2,4-4,8 mg/dia',
								singleDose: '2 ml/dose (Betametasona: 0,1 mg + Dexclorfeniramina: 0,8 mg)',
								practicalDose: '2 ml 3-4x/dia',
								details: 'Idade 2-6 anos:<br>2 ml por administração<br>3-4 vezes ao dia (8/8h ou 6/6h)<br>Cada 5ml contém: Betametasona 0,25mg + Dexclorfeniramina 2mg<br>2ml = Betametasona: 0,1 mg + Dexclorfeniramina: 0,8 mg',
							};
						} else if (ageYears >= 6 && ageYears <= 12) {
							return {
								dailyDose: 'Betametasona: 0,375-0,75 mg/dia | Dexclorfeniramina: 3-6 mg/dia',
								singleDose: '2,5 ml/dose (Betametasona: 0,125 mg + Dexclorfeniramina: 1 mg)',
								practicalDose: '2,5 ml 3-4x/dia',
								details: 'Idade 6-12 anos:<br>2,5 ml por administração<br>3-4 vezes ao dia (8/8h ou 6/6h)<br>Cada 5ml contém: Betametasona 0,25mg + Dexclorfeniramina 2mg<br>2,5ml = Betametasona: 0,125 mg + Dexclorfeniramina: 1 mg',
							};
						} else {
							return {
								dailyDose: 'Betametasona: 0,75-3 mg/dia | Dexclorfeniramina: 6-24 mg/dia',
								singleDose: '5-10 ml/dose (Betametasona: 0,25-0,5 mg + Dexclorfeniramina: 2-4 mg)',
								practicalDose: '5-10 ml 3-4x/dia',
								details:
									'Idade >12 anos:<br>5-10 ml por administração<br>3-4 vezes ao dia (8/8h ou 6/6h)<br>Cada 5ml contém: Betametasona 0,25mg + Dexclorfeniramina 2mg<br>5ml = Betametasona: 0,25 mg + Dexclorfeniramina: 2 mg<br>10ml = Betametasona: 0,5 mg + Dexclorfeniramina: 4 mg',
							};
						}
					}
					// Estimativa por peso
					if (weight < 15) {
						return {
							dailyDose: 'Betametasona: 0,3-0,6 mg/dia | Dexclorfeniramina: 2,4-4,8 mg/dia',
							singleDose: '2 ml/dose',
							practicalDose: '2 ml 3-4x/dia',
							details: 'Estimativa para peso <15kg (≈2-6 anos)',
						};
					} else if (weight <= 40) {
						return {
							dailyDose: 'Betametasona: 0,375-0,75 mg/dia | Dexclorfeniramina: 3-6 mg/dia',
							singleDose: '2,5 ml/dose',
							practicalDose: '2,5 ml 3-4x/dia',
							details: 'Estimativa para peso 15-40kg (≈6-12 anos)',
						};
					} else {
						return {
							dailyDose: 'Betametasona: 0,75-3 mg/dia | Dexclorfeniramina: 6-24 mg/dia',
							singleDose: '5-10 ml/dose',
							practicalDose: '5-10 ml 3-4x/dia',
							details: 'Estimativa para peso >40kg (≈>12 anos)',
						};
					}
				},
			},

			torante: {
				name: 'TORANTE (Hedera helix)',
				category: 'Antitussígenos',
				presentation: 'VO: 15mg/ml',
				dose: '2 a 5 anos = 2,5ml de 8/8hs<br>6 a 12 anos = 5,0ml de 8/8hs<br>> 12 anos = 5,0ml de 8/8hs',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight, ageMonths = null) {
					const ageYears = Number.isFinite(ageMonths) ? ageMonths / 12 : null;
					if (ageYears) {
						if (ageYears >= 2 && ageYears <= 5) {
							return {
								dailyDose: '112,5 mg/dia (37,5 mg 3x/dia)',
								singleDose: '37,5 mg (2,5 ml)',
								practicalDose: '2,5 ml 3x/dia (8/8h)',
								details: 'Idade 2-5 anos:<br>2,5 ml por administração<br>3 vezes ao dia (8/8h)<br>Cada ml contém 15mg de Hedera helix<br>2,5ml = 37,5 mg/dose<br>Dose diária: 112,5 mg',
							};
						} else {
							return {
								dailyDose: '225 mg/dia (75 mg 3x/dia)',
								singleDose: '75 mg (5 ml)',
								practicalDose: '5 ml 3x/dia (8/8h)',
								details: 'Idade ≥6 anos:<br>5 ml por administração<br>3 vezes ao dia (8/8h)<br>Cada ml contém 15mg de Hedera helix<br>5ml = 75 mg/dose<br>Dose diária: 225 mg',
							};
						}
					}

					// Estimativa por peso
					if (weight < 20) {
						return {
							dailyDose: '112,5 mg/dia (37,5 mg 3x/dia)',
							singleDose: '37,5 mg (2,5 ml)',
							practicalDose: '2,5 ml 3x/dia',
							details: 'Estimativa para peso <20kg (≈2-5 anos)',
						};
					} else {
						return {
							dailyDose: '225 mg/dia (75 mg 3x/dia)',
							singleDose: '75 mg (5 ml)',
							practicalDose: '5 ml 3x/dia',
							details: 'Estimativa para peso ≥20kg (≈≥6 anos)',
						};
					}
				},
			},

			acebrofilina: {
				name: 'ACEBROFILINA',
				category: 'Antitussígenos',
				presentation: 'VO: 25mg/5ml',
				dose: 'Peso/5 em ml de 12/12hs por 5 dias (Máx.: 10ml/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Máximo 10ml/dose',
				notes: 'Tratamento por 5 dias',
				calculate: function (weight) {
					const doseMl = weight / 5;
					const maxMl = 10;

					let calculatedMl = doseMl;
					if (calculatedMl > maxMl) calculatedMl = maxMl;

					const doseMg = calculatedMl * 5; // 25mg/5ml = 5mg/ml
					const dailyDoseMg = doseMg * 2; // 12/12h = 2 doses ao dia

					return {
						dailyDose: `${dailyDoseMg.toFixed(1)} mg/dia (${calculatedMl.toFixed(1)} ml 2x/dia)`,
						singleDose: `${doseMg.toFixed(1)} mg (${calculatedMl.toFixed(1)} ml) a cada 12h`,
						practicalDose: `${calculatedMl.toFixed(1)} ml de 12/12 horas${doseMl > maxMl ? ' (máximo)' : ''}`,
						details: `Dose por administração: ${calculatedMl.toFixed(1)} ml (${weight} ÷ 5)${
							doseMl > maxMl ? `<br><span class="text-red-600 font-medium">Limitado ao máximo de ${maxMl} ml/dose</span>` : ''
						}<br>2 doses ao dia (12/12h) por 5 dias<br>Solução 25mg/5ml (5mg/ml): ${calculatedMl.toFixed(1)} ml = ${doseMg.toFixed(1)} mg<br>Dose diária: ${dailyDoseMg.toFixed(1)} mg`,
					};
				},
			},
		},

		// ============================================
		// CATEGORIA: Hidratação/Electrólitos
		// ============================================
		hidratacao: {
			regra_holliday: {
				name: 'Regra de Holliday-Segar (Cálculo de Hidratação)',
				category: 'Hidratação/Electrólitos',
				presentation: 'Cálculo da Cota Hídrica (CH) e Peso Calórico (Pcal)',
				dose: 'Peso < 10 kg: CH = 100 ml/kg<br>Peso 10-20 kg: CH = 1000 ml + 50 ml/kg acima de 10 kg<br>Peso > 20 kg: CH = 1500 ml + 20 ml/kg acima de 20 kg<br>Pcal = CH ÷ 100',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Para cálculo de eletrólitos na HV, usar Pcal (não peso real!)<br>Sódio: 3 mEq Na/kg/dia (1 ml NaCl 20% = 3,4 mEq Na)<br>Potássio: 2 mEq K/kg/dia (1 ml KCl 10% = 1,34 mEq K)',
				calculate: function (weight) {
					let ch = 0;
					let details = '';

					if (weight <= 10) {
						ch = weight * 100;
						details = `Peso ≤ 10 kg: CH = ${weight} kg × 100 ml/kg`;
					} else if (weight <= 20) {
						const excess = weight - 10;
						ch = 1000 + excess * 50;
						details = `Peso 10-20 kg: CH = 1000 ml + (${excess} kg × 50 ml/kg)`;
					} else {
						const excess = weight - 20;
						ch = 1500 + excess * 20;
						details = `Peso > 20 kg: CH = 1500 ml + (${excess} kg × 20 ml/kg)`;
					}

					const pcal = ch / 100;
					const naDailyMeq = pcal * 3;
					const kDailyMeq = pcal * 2;
					const naCl20Ml = naDailyMeq / 3.4;
					const kCl10Ml = kDailyMeq / 1.34;

					// Exemplo de prescrição para 24h (4 fases de 6h)
					const phaseVolume = ch / 4;
					const naPhaseMl = naCl20Ml / 4;
					const kPhaseMl = kCl10Ml / 4;
					const infusionRate = phaseVolume / 6; // ml/h
					const dropsMin = infusionRate / 3; // 1 ml/h = 3 gts/min

					return {
						dailyDose: `${ch.toFixed(0)} ml/dia (CH)`,
						singleDose: `Pcal = ${pcal.toFixed(1)} kg`,
						practicalDose: `Fase (6h): ${phaseVolume.toFixed(0)} ml SG5% + ${naPhaseMl.toFixed(1)} ml NaCl20% + ${kPhaseMl.toFixed(1)} ml KCl10%`,
						details: `${details} = <strong>${ch.toFixed(0)} ml/dia</strong><br><br><strong>Pcal = CH ÷ 100 = ${pcal.toFixed(1)} kg</strong> (usar para eletrólitos)<br><br><strong>Eletrólitos/dia:</strong><br>• Sódio: ${naDailyMeq.toFixed(
							1,
						)} mEq Na (${pcal.toFixed(1)} × 3)<br>• Potássio: ${kDailyMeq.toFixed(1)} mEq K (${pcal.toFixed(1)} × 2)<br><br><strong>Volumes/dia:</strong><br>• NaCl 20%: ${naCl20Ml.toFixed(1)} ml (${naDailyMeq.toFixed(1)} ÷ 3,4)<br>• KCl 10%: ${kCl10Ml.toFixed(
							1,
						)} ml (${kDailyMeq.toFixed(1)} ÷ 1,34)<br><br><strong>Prescrição exemplo (24h em 4 fases):</strong><br>SG 5%: ${phaseVolume.toFixed(0)} ml/fase<br>NaCl 20%: ${naPhaseMl.toFixed(1)} ml/fase<br>KCl 10%: ${kPhaseMl.toFixed(
							1,
						)} ml/fase<br>Infundir a ${infusionRate.toFixed(1)} ml/h (${dropsMin.toFixed(0)} gts/min)`,
					};
				},
			},

			correcao_potassio: {
				name: 'Correção de Potássio',
				category: 'Hidratação/Electrólitos',
				presentation: 'Hipocalemia grave (K < 2,5) e leve/moderada',
				dose: '<strong>Grave (K < 2,5):</strong> 0,3-0,5 mEq K/kg/h em 4h<br><strong>Leve/Moderada:</strong> 2-5 mEq K/kg/dia (aumentar na HV ou KCl 6% VO)',
				practicalRule: 'KCl 10% = 1,34 mEq K/ml<br>KCl 6% = 0,8 mEq K/ml',
				renalAdjustment: null,
				maxDose: 'Veia periférica: máximo 8 mEq K/100 ml<br>Veia central: máximo 15 mEq K/100 ml',
				notes: 'Exemplo cálculo: Paciente 10 kg, K=2,0<br>0,4 mEq K/kg/h × 10 kg × 4h = 16 mEq K<br>400 ml SG5% + 12 ml KCl 10% em 4h',
				calculate: function (weight, kLevel, isSevere = true) {
					if (isSevere) {
						const meqPerKgH = 0.4; // média entre 0,3-0,5
						const totalMeq = meqPerKgH * weight * 4; // fase de 4h
						const concentration = 4; // 4 mEq K/100 ml (seguro para veia periférica)
						const totalVolume = (totalMeq / concentration) * 100;
						const kcl10Ml = totalMeq / 1.34;
						const infusionRate = totalVolume / 4; // ml/h
						const dropsMin = infusionRate / 3;

						return {
							dailyDose: `${totalMeq.toFixed(1)} mEq K em 4h`,
							singleDose: `${meqPerKgH.toFixed(1)} mEq K/kg/h`,
							practicalDose: `${totalVolume.toFixed(0)} ml SG5% + ${kcl10Ml.toFixed(1)} ml KCl 10% em 4h`,
							details: `<strong>Hipocalemia GRAVE (K < 2,5)</strong><br>Dose: ${meqPerKgH.toFixed(1)} mEq K/kg/h (faixa: 0,3-0,5)<br>Tempo: 4 horas<br>Total: ${totalMeq.toFixed(1)} mEq K (${meqPerKgH.toFixed(
								1,
							)} × ${weight} kg × 4h)<br><br><strong>Preparação:</strong><br>${totalVolume.toFixed(0)} ml SG5% com ${kcl10Ml.toFixed(
								1,
							)} ml KCl 10%<br>Concentração: ${concentration} mEq K/100 ml (seguro periférico)<br><br><strong>Infusão:</strong><br>${infusionRate.toFixed(1)} ml/h (${dropsMin.toFixed(0)} gts/min) por 4 horas`,
						};
					} else {
						const meqPerKgDay = 3.5; // média entre 2-5
						const totalMeq = meqPerKgDay * weight;
						const kcl10MlHv = totalMeq / 1.34;
						const kcl6MlVo = totalMeq / 0.8;

						return {
							dailyDose: `${totalMeq.toFixed(1)} mEq K/dia`,
							singleDose: `${meqPerKgDay.toFixed(1)} mEq K/kg/dia`,
							practicalDose: `HV: +${kcl10MlHv.toFixed(1)} ml KCl 10%/dia<br>VO: ${kcl6MlVo.toFixed(1)} ml KCl 6%/dia (6/6h)`,
							details: `<strong>Hipocalemia LEVE/MODERADA</strong><br>Dose: ${meqPerKgDay.toFixed(1)} mEq K/kg/dia (faixa: 2-5)<br>Total: ${totalMeq.toFixed(1)} mEq K/dia<br><br><strong>Opções:</strong><br>1. Aumentar KCl 10% na HV: +${kcl10MlHv.toFixed(
								1,
							)} ml/dia<br>2. KCl 6% VO: ${kcl6MlVo.toFixed(1)} ml/dia, dividido 6/6h<br>KCl 6% = 0,8 mEq K/ml`,
						};
					}
				},
			},

			correcao_sodio: {
				name: 'Correção do Sódio',
				category: 'Hidratação/Electrólitos',
				presentation: 'Hiponatremia grave (Na < 120 ou sintomática)',
				dose: 'Fórmula: (Na desejado - Na atual) × 0,6 × Peso = mEq Na a repor<br>Diferencial máximo: 12 mEq/dia (ideal 6-8/dia)',
				practicalRule: '1 ml NaCl 3% = 0,5 mEq Na<br>100 ml NaCl 3% = 15 ml NaCl 20% + 85 ml SG5%',
				renalAdjustment: null,
				maxDose: '<strong>Aguda:</strong> 5 mEq Na/kg/h ou 10 ml NaCl 3%/kg/h<br><strong>Crônica:</strong> 2,5 mEq Na/kg/h ou 5 ml NaCl 3%/kg/h',
				notes: 'Exemplo: Paciente 10 kg, Na=115<br>(123-115) × 0,6 × 10 = 48 mEq Na<br>96 ml NaCl 3% em 4h (12 mEq Na/h)',
				calculate: function (weight, naCurrent, naTarget = 123, isAcute = true) {
					const meqToReplace = (naTarget - naCurrent) * 0.6 * weight;
					const maxIncreasePerDay = 12;
					const maxMeqPerDay = maxIncreasePerDay * 0.6 * weight;

					let calculatedMeq = meqToReplace;
					if (calculatedMeq > maxMeqPerDay) calculatedMeq = maxMeqPerDay;

					const nacl3Ml = calculatedMeq / 0.5;
					const nacl20Ml = (nacl3Ml * 15) / 100;
					const sg5Ml = (nacl3Ml * 85) / 100;

					const maxRateMeq = isAcute ? 5 : 2.5;
					const maxMeqPerH = maxRateMeq * weight;
					const infusionTime = 4; // fase de ataque 4-6h, usar 4h como exemplo
					const meqPerH = calculatedMeq / infusionTime;

					if (meqPerH > maxMeqPerH) {
						return {
							dailyDose: `${calculatedMeq.toFixed(1)} mEq Na (AJUSTAR TEMPO!)`,
							singleDose: `Taxa: ${meqPerH.toFixed(1)} mEq Na/h (EXCEDE MÁXIMO)`,
							practicalDose: `${nacl3Ml.toFixed(0)} ml NaCl 3%<br>(${nacl20Ml.toFixed(1)} ml NaCl20% + ${sg5Ml.toFixed(0)} ml SG5%)`,
							details: `<strong>ATENÇÃO: Taxa de infusão excede o máximo!</strong><br><br>Máximo ${isAcute ? 'aguda' : 'crônica'}: ${maxMeqPerH.toFixed(1)} mEq Na/h (${maxRateMeq} × ${weight} kg)<br>Calculado: ${meqPerH.toFixed(
								1,
							)} mEq Na/h<br><br><strong>Aumentar tempo de infusão para:</strong> ${(calculatedMeq / maxMeqPerH).toFixed(1)} horas<br><br>mEq a repor: ${calculatedMeq.toFixed(
								1,
							)} mEq Na (limitado a ${maxIncreasePerDay} mEq/dia)<br>Volume NaCl 3%: ${nacl3Ml.toFixed(0)} ml<br>Preparo: ${nacl20Ml.toFixed(1)} ml NaCl20% + ${sg5Ml.toFixed(0)} ml SG5%`,
						};
					}

					const infusionRate = nacl3Ml / infusionTime; // ml/h
					const dropsMin = infusionRate / 3;

					return {
						dailyDose: `${calculatedMeq.toFixed(1)} mEq Na em ${infusionTime}h`,
						singleDose: `${meqPerH.toFixed(1)} mEq Na/h`,
						practicalDose: `${nacl3Ml.toFixed(0)} ml NaCl 3% em ${infusionTime}h<br>(${nacl20Ml.toFixed(1)} ml NaCl20% + ${sg5Ml.toFixed(0)} ml SG5%)`,
						details: `<strong>Hiponatremia ${isAcute ? 'AGUDA' : 'CRÔNICA'}</strong><br>mEq a repor: ${calculatedMeq.toFixed(1)} mEq Na<br>Volume NaCl 3%: ${nacl3Ml.toFixed(0)} ml<br>Preparo: ${nacl20Ml.toFixed(1)} ml NaCl20% + ${sg5Ml.toFixed(
							0,
						)} ml SG5%<br><br><strong>Infusão:</strong><br>${infusionRate.toFixed(1)} ml/h (${dropsMin.toFixed(0)} gts/min) por ${infusionTime} horas<br>Taxa: ${meqPerH.toFixed(1)} mEq Na/h (< ${maxMeqPerH.toFixed(1)} mEq Na/h - OK)`,
					};
				},
			},

			hipoglicemia: {
				name: 'Hipoglicemia',
				category: 'Hidratação/Electrólitos',
				presentation: 'Manejo da hipoglicemia sintomática',
				dose: '<strong>RN:</strong> Glicose 10%, 2 ml/kg EV bolus (ou Glicose 5%, 4 ml/kg)<br><strong>Crianças >RN:</strong> Glicose 25%, 2 ml/kg EV bolus',
				practicalRule: '10 ml SG 10% = 1,2 ml SG 50% + 8,8 ml SG 5%<br>10 ml SG 25% = 5 ml SG 50% + 5 ml AD',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Hipoglicemia assintomática com glicemia >20 mg/dL: alimentar e monitorar',
				calculate: function (weight, isNewborn = false) {
					if (isNewborn) {
						const dose10Percent = weight * 2;
						const dose5Percent = weight * 4;

						// Preparo SG10%
						const sg50For10Percent = (dose10Percent * 1.2) / 10;
						const sg5For10Percent = (dose10Percent * 8.8) / 10;

						return {
							dailyDose: 'BOLUS (urgente)',
							singleDose: `${dose10Percent.toFixed(1)} ml SG10% EV bolus<br>OU ${dose5Percent.toFixed(1)} ml SG5% EV bolus`,
							practicalDose: `SG10%: ${sg50For10Percent.toFixed(1)} ml SG50% + ${sg5For10Percent.toFixed(1)} ml SG5%`,
							details: `<strong>RECÉM-NASCIDO</strong><br>Hipoglicemia sintomática ou glicemia < 20 mg/dL<br><br><strong>Opção 1:</strong> Glicose 10%, ${dose10Percent.toFixed(1)} ml EV em bolus<br>Preparo: ${sg50For10Percent.toFixed(
								1,
							)} ml SG50% + ${sg5For10Percent.toFixed(1)} ml SG5%<br><br><strong>Opção 2:</strong> Glicose 5%, ${dose5Percent.toFixed(1)} ml EV em bolus<br><br>Após: monitorar glicemia e manter aporte glicose adequado`,
						};
					} else {
						const dose25Percent = weight * 2;

						// Preparo SG25%
						const sg50For25Percent = (dose25Percent * 5) / 10;
						const adFor25Percent = (dose25Percent * 5) / 10;

						return {
							dailyDose: 'BOLUS (urgente)',
							singleDose: `${dose25Percent.toFixed(1)} ml SG25% EV bolus`,
							practicalDose: `SG25%: ${sg50For25Percent.toFixed(1)} ml SG50% + ${adFor25Percent.toFixed(1)} ml AD`,
							details: `<strong>CRIANÇA (não RN)</strong><br>Hipoglicemia sintomática ou glicemia < 40 mg/dL<br><br><strong>Dose:</strong> Glicose 25%, ${dose25Percent.toFixed(1)} ml EV em bolus<br>Preparo: ${sg50For25Percent.toFixed(
								1,
							)} ml SG50% + ${adFor25Percent.toFixed(1)} ml AD<br><br>Após: monitorar glicemia e manter aporte glicose adequado<br><br><strong>Assintomática com glicemia >20 mg/dL:</strong> alimentar e monitorar`,
						};
					}
				},
			},

			calculo_vig: {
				name: 'Cálculo da VIG/TIG (Volume/Taxa de Infusão de Glicose)',
				category: 'Hidratação/Electrólitos',
				presentation: 'Cálculo de gramas de glicose para atingir VIG desejada',
				dose: '<strong>VIG objetivo:</strong><br>RNPT: 4-6 mg/kg/min<br>RNT: 4-8 mg/kg/min<br>Fórmula: Gramas glicose = Peso × VIG × 1,44',
				practicalRule: 'Regra da Aranha para ajuste de concentração<br>SG50% = (P × 1,44 × VIG × 20 – CH)/9',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Exemplo: RNT 4kg, VIG=4 mg/kg/min, CH=400ml<br>Gramas = 4 × 4 × 1,44 = 23g<br>Concentração = 23g/400ml = ~6%',
				calculate: function (weight, vigTarget, ch) {
					const glucoseGrams = weight * vigTarget * 1.44;
					const concentration = (glucoseGrams / ch) * 100;

					// Regra da aranha para preparo com SG5% e SG50%
					// Para obter concentração desejada a partir de SG5% (C1=5) e SG50% (C2=50)
					// Volume SG50% = (CH × (Cdesejada - 5)) / (50 - 5)
					// Volume SG5% = CH - volume SG50%

					const volumeSg50 = (ch * (concentration - 5)) / 45;
					const volumeSg5 = ch - volumeSg50;

					// Regra prática alternativa
					const practicalSg50 = (weight * 1.44 * vigTarget * 20 - ch) / 9;

					return {
						dailyDose: `${glucoseGrams.toFixed(1)} g glicose/dia`,
						singleDose: `VIG: ${vigTarget} mg/kg/min`,
						practicalDose: `Concentração: ${concentration.toFixed(1)}%<br>SG5%: ${volumeSg5.toFixed(0)} ml + SG50%: ${volumeSg50.toFixed(1)} ml`,
						details: `<strong>Dados:</strong><br>• Peso: ${weight} kg<br>• VIG objetivo: ${vigTarget} mg/kg/min<br>• CH: ${ch} ml/dia<br><br><strong>Cálculo:</strong><br>Gramas glicose = ${weight} × ${vigTarget} × 1,44 = <strong>${glucoseGrams.toFixed(
							1,
						)} g/dia</strong><br><br><strong>Concentração necessária:</strong><br>${glucoseGrams.toFixed(1)} g / ${ch} ml = ${concentration.toFixed(1)}%<br><br><strong>Preparo (Regra da Aranha):</strong><br>SG5%: ${volumeSg5.toFixed(
							0,
						)} ml<br>SG50%: ${volumeSg50.toFixed(1)} ml<br><br><strong>Regra prática SG50%:</strong><br>(${weight} × 1,44 × ${vigTarget} × 20 - ${ch}) ÷ 9 = ${practicalSg50.toFixed(1)} ml SG50%`,
					};
				},
			},
		},

		// ============================================
		// CATEGORIA: Anticonvulsivantes
		// ============================================
		anticonvulsivantes: {
			midazolam: {
				name: 'MIDAZOLAM (Dormonid)',
				category: 'Anticonvulsivantes',
				useContext: 'Crise convulsiva (benzodiazepínico de emergência)',
				presentation: 'FA 5mg/ml',
				dose: '0,1–0,3 mg/kg/dose (EV) | Máx 3 doses com intervalo de 5 min',
				practicalRule: 'Diluir 1ml em 4ml AD → 1mg/ml → 0,1–0,3 ml/kg/dose',
				renalAdjustment: null,
				maxDose: 'Máx 3 doses (5/5 min). Pronto para via aérea a partir da 2ª dose.',
				notes: 'Risco de depressão respiratória (principalmente após doses repetidas). Monitorizar e preparar suporte ventilatório.',
				calculate: function (weight, ageMonths = null) {
					const w = Number(weight);
					if (!isFinite(w) || w <= 0) {
						return {
							dailyDose: '—',
							singleDose: 'Peso inválido',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Informe um peso válido (kg).</span>",
						};
					}

					const minMg = 0.1 * w;
					const maxMg = 0.3 * w;
					const refMg = 0.2 * w;

					const ampConc = 5; // mg/ml
					const ampMinMl = minMg / ampConc;
					const ampMaxMl = maxMg / ampConc;
					const ampRefMl = refMg / ampConc;

					// Diluição do protocolo: 1 mg/ml (mg == ml)
					const dilMinMl = minMg;
					const dilMaxMl = maxMg;
					const dilRefMl = refMg;

					return {
						dailyDose: 'CRISE AGUDA (não se expressa em mg/dia)',
						singleDose: `${fmt(minMg)}–${fmt(maxMg)} mg (0,1–0,3 mg/kg) | ref: ${fmt(refMg)} mg (0,2 mg/kg)`,
						practicalDose: `Diluído 1mg/ml: ${fmt(dilMinMl)}–${fmt(dilMaxMl)} ml/dose (ref ${fmt(dilRefMl)} ml)` + `<br>Ampola 5mg/ml (se necessário): ${fmt(ampMinMl)}–${fmt(ampMaxMl)} ml (ref ${fmt(ampRefMl)} ml)`,
						details:
							`Peso: ${fmt(w, 1)} kg<br>` +
							`Dose: 0,1–0,3 mg/kg = ${fmt(minMg)}–${fmt(maxMg)} mg/dose<br>` +
							`Diluição: 1ml (5mg) + 4ml AD → 5ml (1mg/ml)<br>` +
							`<span class='text-amber-700 font-medium'>Máx 3 doses (intervalo 5 min). Preparar via aérea a partir da 2ª dose.</span>`,
					};
				},
			},

			diazepam: {
				name: 'DIAZEPAM',
				category: 'Anticonvulsivantes',
				useContext: 'Crise convulsiva (benzodiazepínico de emergência)',
				presentation: 'FA 10mg/2ml (5mg/ml)',
				dose: 'Anticonvulsivante: 0,2–0,5 mg/kg/dose<br>Sedativa: 0,04–0,2 mg/dose (se for mg/kg no seu protocolo, ajustar)',
				practicalRule: '5mg/ml → volume (ml) = dose(mg) ÷ 5',
				renalAdjustment: null,
				maxDose: null,
				notes: 'Uso em emergência. Risco de depressão respiratória (especialmente se já recebeu benzodiazepínico prévio).',
				calculate: function (weight) {
					const w = Number(weight);
					if (!isFinite(w) || w <= 0) {
						return {
							dailyDose: '—',
							singleDose: 'Peso inválido',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Informe um peso válido (kg).</span>",
						};
					}

					const conc = 5; // mg/ml
					const minMg = 0.2 * w;
					const maxMg = 0.5 * w;
					const refMg = 0.3 * w;

					const minMl = minMg / conc;
					const maxMl = maxMg / conc;
					const refMl = refMg / conc;

					return {
						dailyDose: 'CRISE AGUDA (não se expressa em mg/dia)',
						singleDose: `${fmt(minMg)}–${fmt(maxMg)} mg (0,2–0,5 mg/kg) | ref: ${fmt(refMg)} mg`,
						practicalDose: `${fmt(minMl)}–${fmt(maxMl)} ml (FA 5mg/ml) | ref: ${fmt(refMl)} ml`,
						details:
							`Peso: ${fmt(w, 1)} kg<br>` +
							`Dose anticonvulsivante: 0,2–0,5 mg/kg = ${fmt(minMg)}–${fmt(maxMg)} mg<br>` +
							`FA 10mg/2ml = 5mg/ml → ${fmt(minMl)}–${fmt(maxMl)} ml<br>` +
							`<span class='text-amber-700 font-medium'>Monitorizar FR/SatO2; risco de depressão respiratória em repetição/associação.</span>`,
					};
				},
			},

			fenobarbital: {
				name: 'FENOBARBITAL',
				category: 'Anticonvulsivantes',
				useContext: 'Emergência (ataque) + Casa (manutenção)',
				presentation: 'AMP 100mg/ml (emergência) | GOTAS 40mg/ml (manutenção)',
				dose: 'ATAQUE: 10–20 mg/kg/dose EV lento<br>Se não houver controle: repetir após 5 min com 5–10 mg/kg (máx total ataque 30 mg/kg)<br>MANUTENÇÃO: 3–6 mg/kg/dia (VO) 12/12h ou dose única',
				practicalRule: 'EMERGÊNCIA: diluir 1ml em 9ml AD → 10mg/ml → 1–2 ml/kg/dose<br>Repetição: 0,5–1 ml/kg (10mg/ml)<br>MANUTENÇÃO VO (gotas 40mg/ml): diluir em água, 1 gota = 2mg → ~0,075–0,15 ml/kg/dia',
				renalAdjustment: null,
				maxDose: 'Ataque total: 30 mg/kg',
				notes: 'Crise: risco de depressão respiratória/hipotensão. Manutenção domiciliar: Gardenal gotas 40mg/ml, diluir em água. Eficácia avaliada após 15 dias.[web:51][web:52][web:54][web:55]',
				calculate: function (weight) {
					const w = Number(weight);
					if (!isFinite(w) || w <= 0) {
						return {
							dailyDose: '—',
							singleDose: 'Peso inválido',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Informe um peso válido (kg).</span>",
						};
					}

					// ATAQUE EV
					const loadMinMg = 10 * w;
					const loadMaxMg = 20 * w;
					const extraMinMg = 5 * w;
					const extraMaxMg = 10 * w;
					const maxTotalMg = 30 * w;

					const concDil = 10; // mg/ml após diluição (1+9)
					const loadMinMl = loadMinMg / concDil;
					const loadMaxMl = loadMaxMg / concDil;
					const extraMinMl = extraMinMg / concDil;
					const extraMaxMl = extraMaxMg / concDil;
					const maxTotalMl = maxTotalMg / concDil;

					// MANUTENÇÃO VO
					const maintMinMgDay = 3 * w;
					const maintMaxMgDay = 6 * w;
					const maintMinPerDose = maintMinMgDay / 2; // 12/12h
					const maintMaxPerDose = maintMaxMgDay / 2;

					// MANUTENÇÃO GOTAS (40mg/ml)
					const concGotas = 40; // mg/ml
					const maintMinMlDay = maintMinMgDay / concGotas;
					const maintMaxMlDay = maintMaxMgDay / concGotas;
					const maintMinMlPerDose = maintMinPerDose / concGotas;
					const maintMaxMlPerDose = maintMaxPerDose / concGotas;

					return {
						dailyDose: `MANUTENÇÃO VO: ${fmt(maintMinMgDay, 0)}–${fmt(maintMaxMgDay, 0)} mg/dia (12/12h ou dose única)`,
						singleDose: `ATAQUE EV: ${fmt(loadMinMg, 0)}–${fmt(loadMaxMg, 0)} mg (lento)`,
						practicalDose:
							`ATAQUE (10mg/ml): ${fmt(loadMinMl)}–${fmt(loadMaxMl)} ml` +
							`<br>Repetição (10mg/ml): ${fmt(extraMinMl)}–${fmt(extraMaxMl)} ml` +
							`<br>Máx total (10mg/ml): ${fmt(maxTotalMl)} ml` +
							`<br>MANUTENÇÃO VO (gotas 40mg/ml): ${fmt(maintMinMlDay, 2)}–${fmt(maintMaxMlDay, 2)} ml/dia` +
							`<br>Por dose (12/12h): ${fmt(maintMinMlPerDose, 2)}–${fmt(maintMaxMlPerDose, 2)} ml`,
						details:
							`Peso: ${fmt(w, 1)} kg<br><br>` +
							`<strong>ATAQUE EV (emergência):</strong><br>` +
							`Ataque 10–20 mg/kg: ${fmt(loadMinMg, 0)}–${fmt(loadMaxMg, 0)} mg<br>` +
							`Diluição: 1ml (100mg) + 9ml AD → 10mg/ml<br>` +
							`Volume (10mg/ml): ${fmt(loadMinMl)}–${fmt(loadMaxMl)} ml<br>` +
							`Se sem controle: +5–10 mg/kg após 5 min → ${fmt(extraMinMg, 0)}–${fmt(extraMaxMg, 0)} mg (${fmt(extraMinMl)}–${fmt(extraMaxMl)} ml)<br>` +
							`<span class='text-amber-700 font-medium'>Máx total ataque: 30 mg/kg → ${fmt(maxTotalMg, 0)} mg (${fmt(maxTotalMl)} ml a 10mg/ml)</span><br><br>` +
							`<strong>MANUTENÇÃO VO (casa):</strong><br>` +
							`Dose 3–6 mg/kg/dia 12/12h (ou dose única): ${fmt(maintMinMgDay, 0)}–${fmt(maintMaxMgDay, 0)} mg/dia<br>` +
							`Por dose (12/12h): ${fmt(maintMinPerDose, 0)}–${fmt(maintMaxPerDose, 0)} mg<br>` +
							`<span class='text-blue-700 font-medium'>Gardenal gotas 40mg/ml (1 gota ≈ 2mg):</span><br>` +
							`Volume diário: ${fmt(maintMinMlDay, 2)}–${fmt(maintMaxMlDay, 2)} ml/dia (${fmt(maintMinMlDay * 20, 0)}–${fmt(maintMaxMlDay * 20, 0)} gotas/dia)<br>` +
							`Por dose (12/12h): ${fmt(maintMinMlPerDose, 2)}–${fmt(maintMaxMlPerDose, 2)} ml (${fmt(maintMinMlPerDose * 20, 0)}–${fmt(maintMaxMlPerDose * 20, 0)} gotas)<br>` +
							`Iniciar manutenção: 12h após o ataque (regra do serviço: metade da dose total de ataque).<br>` +
							`<span class='text-purple-700 font-medium'>⚠ Diluir gotas em água. Eficácia avaliada após 15 dias.</span>`,
					};
				},
			},

			fenitoina: {
				name: 'FENITOÍNA (Hidantal)',
				category: 'Anticonvulsivantes',
				useContext: 'Emergência (ataque) + Casa (manutenção)',
				presentation: 'AMP 50mg/ml (emergência) | SUSPENSÃO 50mg/ml (manutenção)',
				dose: 'ATAQUE: 15–20 mg/kg/dose<br>Se não houver controle: doses adicionais de 5 mg/kg até dose total 30 mg/kg<br>MANUTENÇÃO: 4–8 mg/kg/dia (VO) 8/8h ou 12/12h',
				practicalRule: 'EMERGÊNCIA: diluir 1ml em 4ml AD → 10mg/ml → 2 ml/kg (para 20 mg/kg)<br>MANUTENÇÃO VO (suspensão 50mg/ml): 0,08–0,16 ml/kg/dia dividido 8/8h ou 12/12h',
				renalAdjustment: null,
				maxDose: 'Ataque total: 30 mg/kg | Manutenção: 300 mg/dia',
				notes: 'Convulsão focal, tumor SNC, TCE. Manutenção: Hidantal suspensão 50mg/ml. Crianças >6 anos podem precisar dose mínima de adulto (300mg/dia).[web:46][web:47][web:48][web:50]',
				calculate: function (weight) {
					const w = Number(weight);
					if (!isFinite(w) || w <= 0) {
						return {
							dailyDose: '—',
							singleDose: 'Peso inválido',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Informe um peso válido (kg).</span>",
						};
					}

					// ATAQUE EV
					const loadMinMg = 15 * w;
					const loadMaxMg = 20 * w;
					const addMg = 5 * w;
					const maxTotalMg = 30 * w;

					const concDil = 10; // mg/ml após diluir 1ml em 4ml
					const loadMinMl = loadMinMg / concDil;
					const loadMaxMl = loadMaxMg / concDil;
					const addMl = addMg / concDil;
					const maxTotalMl = maxTotalMg / concDil;

					// MANUTENÇÃO VO
					const maintMinMgDay = 4 * w;
					const maintMaxMgDay = 8 * w;
					const maintMinPerDose8h = maintMinMgDay / 3; // 8/8h
					const maintMaxPerDose8h = maintMaxMgDay / 3;

					// MANUTENÇÃO SUSPENSÃO (50mg/ml)
					const concSusp = 50; // mg/ml
					const maintMinMlDay = maintMinMgDay / concSusp;
					const maintMaxMlDay = maintMaxMgDay / concSusp;
					const maintMinMlPerDose8h = maintMinPerDose8h / concSusp;
					const maintMaxMlPerDose8h = maintMaxPerDose8h / concSusp;

					// Alerta se dose calculada < 300mg (limite mínimo >6 anos)
					const doseAlert = maintMaxMgDay < 300 && w > 20 ? '<br><span class="text-orange-600 font-medium">⚠ Crianças >6 anos podem precisar dose mínima de 300mg/dia</span>' : '';

					return {
						dailyDose: `MANUTENÇÃO VO: ${fmt(maintMinMgDay, 0)}–${fmt(maintMaxMgDay, 0)} mg/dia (8/8h ou 12/12h)`,
						singleDose: `ATAQUE EV: ${fmt(loadMinMg, 0)}–${fmt(loadMaxMg, 0)} mg`,
						practicalDose:
							`ATAQUE (10mg/ml): ${fmt(loadMinMl)}–${fmt(loadMaxMl)} ml` +
							`<br>Dose adicional (10mg/ml): ${fmt(addMl)} ml` +
							`<br>Máx total (10mg/ml): ${fmt(maxTotalMl)} ml` +
							`<br>MANUTENÇÃO VO (suspensão 50mg/ml): ${fmt(maintMinMlDay, 2)}–${fmt(maintMaxMlDay, 2)} ml/dia` +
							`<br>Por dose (8/8h): ${fmt(maintMinMlPerDose8h, 2)}–${fmt(maintMaxMlPerDose8h, 2)} ml`,
						details:
							`Peso: ${fmt(w, 1)} kg<br><br>` +
							`<strong>ATAQUE EV (emergência):</strong><br>` +
							`Ataque 15–20 mg/kg: ${fmt(loadMinMg, 0)}–${fmt(loadMaxMg, 0)} mg<br>` +
							`Diluição: 1ml (50mg) + 4ml AD → 10mg/ml<br>` +
							`Volume (10mg/ml): ${fmt(loadMinMl)}–${fmt(loadMaxMl)} ml<br>` +
							`Se sem controle: +5 mg/kg → ${fmt(addMg, 0)} mg (${fmt(addMl)} ml) até total 30 mg/kg<br>` +
							`<span class='text-amber-700 font-medium'>Máx total ataque: 30 mg/kg → ${fmt(maxTotalMg, 0)} mg (${fmt(maxTotalMl)} ml)</span><br><br>` +
							`<strong>MANUTENÇÃO VO (casa):</strong><br>` +
							`Dose 4–8 mg/kg/dia 8/8h (ou 12/12h): ${fmt(maintMinMgDay, 0)}–${fmt(maintMaxMgDay, 0)} mg/dia<br>` +
							`Por dose (8/8h): ${fmt(maintMinPerDose8h, 0)}–${fmt(maintMaxPerDose8h, 0)} mg<br>` +
							`<span class='text-blue-700 font-medium'>Hidantal suspensão 50mg/ml:</span><br>` +
							`Volume diário: ${fmt(maintMinMlDay, 2)}–${fmt(maintMaxMlDay, 2)} ml/dia<br>` +
							`Por dose (8/8h): ${fmt(maintMinMlPerDose8h, 2)}–${fmt(maintMaxMlPerDose8h, 2)} ml<br>` +
							`Iniciar manutenção: 8h após o ataque.${doseAlert}`,
					};
				},
			},

			clonazepam: {
				name: 'CLONAZEPAM',
				category: 'Anticonvulsivantes',
				useContext: 'Controle ambulatorial (benzodiazepínico)',
				presentation: 'CP 0,25mg; 0,5mg; 1mg; 2mg<br>Gotas 2,5mg/ml (0,1mg/gota)',
				dose: '≤10 anos OU <30kg: inicial 0,01–0,03 mg/kg/dia (2–3 tomadas); manutenção 0,1–0,2 mg/kg/dia (3 tomadas); máx inicial 0,05 mg/kg/dia; ajuste +0,25–0,5 mg a cada 3 dias.<br>>10 anos OU ≥30kg: inicial 1,5 mg/dia (3 tomadas); máx 6 mg/dia; ajuste +0,25–0,5 mg a cada 3 dias.',
				practicalRule: 'Gotas: 0,1 mg/gota | gotas/dia = mg/dia ÷ 0,1',
				renalAdjustment: null,
				maxDose: 'Fase inicial: não exceder 0,05 mg/kg/dia (crianças pequenas). Adolescente: até 6 mg/dia.',
				notes: 'No PA preferir Midazolam [Meia vida curta]',
				calculate: function (weight, ageMonths = null) {
					const w = Number(weight);
					if (!isFinite(w) || w <= 0) {
						return {
							dailyDose: '—',
							singleDose: 'Peso inválido',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Informe um peso válido (kg).</span>",
						};
					}

					const ageYears = ageMonths != null ? ageMonths / 12 : null;
					const smallChild = (ageYears != null && ageYears <= 10) || w < 30;

					const mgPerDrop = 0.1;
					const mgPerMl = 2.5;

					if (smallChild) {
						const initMin = 0.01 * w;
						const initMax = 0.03 * w;
						const initMaxCap = 0.05 * w;

						const maintMin = 0.1 * w;
						const maintMax = 0.2 * w;

						const initTID_min = initMin / 3;
						const initTID_max = initMax / 3;

						const maintTID_min = maintMin / 3;
						const maintTID_max = maintMax / 3;

						const initDropsMin = initMin / mgPerDrop;
						const initDropsMax = initMax / mgPerDrop;

						const maintDropsMin = maintMin / mgPerDrop;
						const maintDropsMax = maintMax / mgPerDrop;

						const initMlRef = (initMin + initMax) / 2 / mgPerMl;
						const maintMlRef = (maintMin + maintMax) / 2 / mgPerMl;

						return {
							dailyDose: `Inicial: ${fmt(initMin, 3)}–${fmt(initMax, 3)} mg/dia (máx inicial ${fmt(initMaxCap, 3)} mg/dia)` + `<br>Manutenção: ${fmt(maintMin, 3)}–${fmt(maintMax, 3)} mg/dia`,
							singleDose: `Preferir 3 tomadas:` + `<br>Inicial: ${fmt(initTID_min, 3)}–${fmt(initTID_max, 3)} mg por dose (TID)` + `<br>Manutenção: ${fmt(maintTID_min, 3)}–${fmt(maintTID_max, 3)} mg por dose (TID)`,
							practicalDose:
								`Gotas (0,1 mg/gota):` +
								`<br>Inicial: ${fmt(initDropsMin, 0)}–${fmt(initDropsMax, 0)} gotas/dia` +
								`<br>Manutenção: ${fmt(maintDropsMin, 0)}–${fmt(maintDropsMax, 0)} gotas/dia` +
								`<br>Referência em ml (2,5 mg/ml): inicial ~${fmt(initMlRef)} ml/dia | manutenção ~${fmt(maintMlRef)} ml/dia`,
							details: `Critério: ≤10 anos ou <30 kg.` + (ageYears != null ? ` | Idade: ${fmt(ageYears, 1)} anos` : ``) + `<br>Ajuste: +0,25–0,5 mg a cada 3 dias conforme resposta clínica.`,
						};
					}

					const initFixed = 1.5; // mg/dia
					const maxFixed = 6.0; // mg/dia
					const initTID = initFixed / 3;

					const initDrops = initFixed / mgPerDrop;
					const initMl = initFixed / mgPerMl;

					return {
						dailyDose: `Inicial: ${fmt(initFixed)} mg/dia | Máx: ${fmt(maxFixed)} mg/dia`,
						singleDose: `Dividir em 3 tomadas: ${fmt(initTID)} mg por dose (TID)`,
						practicalDose: `Gotas: ~${fmt(initDrops, 0)} gotas/dia | Solução: ~${fmt(initMl)} ml/dia (dividir em 3)`,
						details: `Critério: >10 anos ou ≥30 kg.` + (ageYears != null ? ` | Idade: ${fmt(ageYears, 1)} anos` : ``) + `<br>Ajuste: +0,25–0,5 mg a cada 3 dias.`,
					};
				},
			},

			clobazam: {
				name: 'CLOBAZAM',
				category: 'Anticonvulsivantes',
				useContext: 'Controle ambulatorial (benzodiazepínico) | (opcional) intermitente febril',
				presentation: 'CP 10mg (comum) | (se houver) Suspensão 2,5mg/ml',
				dose:
					'≥3 anos: usual 5–10 mg/dia (2 tomadas); adjuvante refratária: 5–15 mg/dia; pediatria raramente >20–30 mg/dia.<br>' +
					'6m–3 anos: contraindicado (exceto casos excepcionais sob supervisão).<br>' +
					'Febril intermitente (estudo citado): ≤5kg 5mg/d; 5–10kg 10mg/d; 11–15kg 15mg/d; >20kg 20mg/d.',
				practicalRule: 'Se suspensão 2,5mg/ml: ml/dia = mg/dia ÷ 2,5 (BID: dividir por 2).',
				renalAdjustment: null,
				maxDose: 'Regra prática pediatria: evitar >20–30 mg/dia.',
				notes: 'Sedação/tolerância podem ocorrer. Retirada gradual se uso contínuo.',
				calculate: function (weight, ageMonths = null, mode = 'usual') {
					const w = Number(weight);
					if (!isFinite(w) || w <= 0) {
						return {
							dailyDose: '—',
							singleDose: 'Peso inválido',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Informe um peso válido (kg).</span>",
						};
					}

					if (ageMonths != null && ageMonths >= 6 && ageMonths < 36) {
						return {
							dailyDose: 'Contraindicado 6m–3a (salvo exceção)',
							singleDose: 'NÃO USAR',
							practicalDose: '—',
							details: "<span class='text-red-600 font-medium'>Clobazam: 6 meses a 3 anos contraindicado, exceto exceções sob supervisão rigorosa.</span>",
						};
					}

					const mgPerMl = 2.5;

					if (String(mode).toLowerCase() === 'febril') {
						let mgDay = 20;
						if (w <= 5) mgDay = 5;
						else if (w <= 10) mgDay = 10;
						else if (w <= 15) mgDay = 15;
						else if (w > 20) mgDay = 20;

						const mlDay = mgDay / mgPerMl;

						return {
							dailyDose: `Intermitente (febril): ${fmt(mgDay, 0)} mg/dia`,
							singleDose: `Se BID: ${fmt(mgDay / 2)} mg por dose`,
							practicalDose: `Se suspensão 2,5mg/ml: ${fmt(mlDay)} ml/dia (ou ${fmt(mlDay / 2)} ml 12/12h)`,
							details: `Peso: ${fmt(w, 1)} kg` + (ageMonths != null ? ` | Idade: ${fmt(ageMonths / 12, 1)} anos` : '') + `<br>Esquema: ≤5kg 5mg/d; 5–10kg 10mg/d; 11–15kg 15mg/d; >20kg 20mg/d.`,
						};
					}

					const usualMin = 5;
					const usualMax = 10;

					const mlMin = usualMin / mgPerMl;
					const mlMax = usualMax / mgPerMl;

					return {
						dailyDose: `Usual: ${fmt(usualMin, 0)}–${fmt(usualMax, 0)} mg/dia (BID)`,
						singleDose: `BID: ${fmt(usualMin / 2)}–${fmt(usualMax / 2)} mg por dose`,
						practicalDose: `Se suspensão 2,5mg/ml: ${fmt(mlMin)}–${fmt(mlMax)} ml/dia (dividir em 2)` + `<br>Se comprimido 10mg: usar frações conforme prescrição`,
						details: `Idade: ${ageMonths != null ? fmt(ageMonths / 12, 1) + ' anos' : 'não informada'}<br>` + `Regra ≥3 anos — 5–10 mg/dia (BID). Refratária: 5–15 mg/dia. Pediatria raramente >20–30 mg/dia.`,
					};
				},
			},
		},

		// ============================================
		// CATEGORIA: Asma/Respiratório
		// ============================================
		respiratorio: {
			fenoterol: {
				name: 'FENOTEROL (Berotec)',
				category: 'Asma/Respiratório',
				presentation: '5mg/ml (0,25mg/gota)',
				dose: '0,1mg/kg/dose 20/20min (resgate)',
				practicalRule: '1 gota a cada 3kg + 4ml SF 20/20 minutos, 3 vezes',
				renalAdjustment: null,
				maxDose: 'Máximo 10gts/dose (Blackbook) | No HIAS: máximo 5gts/dose',
				notes: 'No HIAS dificilmente fazemos mais de 5gts – efeitos colaterais podem superar benefícios',
				calculate: function (weight) {
					const singleDoseMg = weight * 0.1;
					const drops = weight / 0.3; // 1 gota a cada 3kg (0,25mg/gota)
					const maxDropsHIAS = 5;
					const maxDropsConsensus = 10;

					let calculatedDropsHIAS = drops;
					if (calculatedDropsHIAS > maxDropsHIAS) calculatedDropsHIAS = maxDropsHIAS;

					let calculatedDropsConsensus = drops;
					if (calculatedDropsConsensus > maxDropsConsensus) calculatedDropsConsensus = maxDropsConsensus;

					return {
						dailyDose: `${singleDoseMg.toFixed(2)} mg/dose (resgate)`,
						singleDose: '20/20min por até 3 doses',
						practicalDose: `${calculatedDropsHIAS.toFixed(0)} gotas (HIAS) | ${calculatedDropsConsensus.toFixed(0)} gotas (consenso) + 4ml SF`,
						details: `<strong>Resgate crise asma</strong><br>Dose: ${singleDoseMg.toFixed(2)} mg (${weight} kg × 0,1 mg/kg/dose)<br>Intervalo: 20/20 minutos (até 3 doses)<br><br><strong>Preparo nebulização:</strong><br>• ${calculatedDropsHIAS.toFixed(
							0,
						)} gotas (protocolo HIAS - max ${maxDropsHIAS})<br>• ${calculatedDropsConsensus.toFixed(
							0,
						)} gotas (consenso - max ${maxDropsConsensus})<br>• + 4 ml SF 0,9%<br>• Nebulizar 20/20min<br><br><span class="text-red-600 font-medium">No HIAS: raramente usamos mais de 5 gotas devido a efeitos colaterais</span>`,
					};
				},
			},

			fenoterol_spray: {
				name: 'FENOTEROL Spray',
				category: 'Asma/Respiratório',
				presentation: '100ug/jato',
				dose: '1 jato a cada 3kg, 20/20 minutos, 3x',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Máximo 10 jatos por dose',
				notes: null,
				calculate: function (weight) {
					const puffs = Math.ceil(weight / 3);
					const maxPuffs = 10;

					let calculatedPuffs = puffs;
					if (calculatedPuffs > maxPuffs) calculatedPuffs = maxPuffs;

					const doseUg = calculatedPuffs * 100;

					return {
						dailyDose: `${doseUg} ug/dose`,
						singleDose: '20/20min por até 3 doses',
						practicalDose: `${calculatedPuffs} jatos/dose${puffs > maxPuffs ? ' (máximo)' : ''}`,
						details: `<strong>Spray inalatório (resgate)</strong><br>Cálculo: 1 jato a cada 3 kg<br>${weight} kg ÷ 3 = ${puffs.toFixed(1)} jatos → ${calculatedPuffs} jatos${
							puffs > maxPuffs ? ` (limitado ao máximo de ${maxPuffs})` : ''
						}<br>Dose: ${doseUg} ug (${calculatedPuffs} × 100 ug/jato)<br>Intervalo: 20/20 minutos (até 3 doses)`,
					};
				},
			},

			salbutamol_spray: {
				name: 'SALBUTAMOL Spray (Aerolin)',
				category: 'Asma/Respiratório',
				presentation: '100ug/jato',
				dose: '2-4 jatos / dose',
				practicalRule: 'Peso / 2 por dose (até máximo de 10 jatos)',
				renalAdjustment: null,
				maxDose: 'Máximo de 10 jatos / dose',
				notes: null,
				calculate: function (weight) {
					const puffsByWeight = Math.ceil(weight / 2);
					const maxPuffs = 10;

					let calculatedPuffs = puffsByWeight;
					if (calculatedPuffs > maxPuffs) calculatedPuffs = maxPuffs;

					// Garantir dentro da faixa 2-4 se possível
					if (calculatedPuffs < 2) calculatedPuffs = 2;
					if (calculatedPuffs > 4 && weight <= 8) calculatedPuffs = 4; // Para crianças pequenas, manter 2-4

					const doseUg = calculatedPuffs * 100;

					return {
						dailyDose: `${doseUg} ug/dose`,
						singleDose: 'Dose de resgate',
						practicalDose: `${calculatedPuffs} jatos/dose (${puffsByWeight} por peso)`,
						details: `<strong>Salbutamol spray (Aerolin)</strong><br><strong>Por peso:</strong> ${weight} kg ÷ 2 = ${puffsByWeight} jatos<br><strong>Faixa recomendada:</strong> 2-4 jatos/dose<br><strong>Máximo:</strong> 10 jatos/dose<br><br><strong>Dose prescrita:</strong> ${calculatedPuffs} jatos (${doseUg} ug)${
							puffsByWeight > maxPuffs ? `<br><span class="text-red-600 font-medium">Limitado ao máximo de ${maxPuffs} jatos</span>` : ''
						}`,
					};
				},
			},

			ipratropio: {
				name: 'BROMETO DE IPRATRÓPIO (Atrovent)',
				category: 'Asma/Respiratório',
				presentation: '0,25mg/ml',
				dose: '< 20kg: 10 gotas/dose<br>> 20kg: 20 gotas/dose',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'No HIAS, protocolo questiona eficácia e tende a não usar esta medicação!',
				calculate: function (weight) {
					const drops = weight < 20 ? 10 : 20;
					const doseMg = drops * 0.0125; // 0,25mg/ml, 1ml = 20 gotas → 1 gota = 0,0125mg

					return {
						dailyDose: `${doseMg.toFixed(2)} mg/dose`,
						singleDose: 'Associar ao β2-agonista',
						practicalDose: `${drops} gotas/dose`,
						details: `<strong>Ipratrópio nebulização</strong><br>Peso: ${weight} kg → ${weight < 20 ? '< 20kg' : '≥ 20kg'}<br>Dose: ${drops} gotas (${doseMg.toFixed(
							2,
						)} mg)<br>Solução 0,25mg/ml (1ml = 20 gotas)<br><br><span class="text-red-600 font-bold">ATENÇÃO: No HIAS, protocolo da Pneumo questiona eficácia e tende a NÃO usar esta medicação!</span>`,
					};
				},
			},

			ipratropio_spray: {
				name: 'BROMETO DE IPRATRÓPIO Spray (Atrovent)',
				category: 'Asma/Respiratório',
				presentation: '20ug/jato',
				dose: '4 jatos/dose',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					return {
						dailyDose: '80 ug/dose',
						singleDose: '4 jatos (dose fixa)',
						practicalDose: '4 jatos/dose',
						details: `<strong>Ipratrópio spray</strong><br>Dose fixa: 4 jatos/dose<br>Cada jato: 20 ug<br>Dose total: 80 ug<br>Associar ao β2-agonista inalatório`,
					};
				},
			},

			sulfato_magnesio: {
				name: 'SULFATO DE MAGNÉSIO 50%',
				category: 'Asma/Respiratório',
				presentation: '500mg/ml',
				dose: '25-75mg/kg/dose de 4/4h (média 40mg/kg/dose). Máximo 2g/dose',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Máximo 2g/dose',
				notes: 'Diluir em SF para correr 2,5mg/kg/min em aproximadamente 20 minutos',
				calculate: function (weight) {
					const singleDoseMg = weight * 40; // dose média
					const maxDose = 2000; // 2g

					let calculatedDose = singleDoseMg;
					if (calculatedDose > maxDose) calculatedDose = maxDose;

					const volumeMl = calculatedDose / 500; // 500mg/ml
					const infusionRateMgMin = weight * 2.5; // 2,5mg/kg/min
					const infusionTimeMin = 20; // aproximadamente
					const totalVolumeMl = (infusionRateMgMin * infusionTimeMin) / 500; // para diluição

					return {
						dailyDose: `${calculatedDose.toFixed(0)} mg/dose`,
						singleDose: '4/4h (crise grave)',
						practicalDose: `${volumeMl.toFixed(1)} ml + SF para ${totalVolumeMl.toFixed(0)} ml total`,
						details: `<strong>Crise asma grave (refratária)</strong><br>Dose: ${calculatedDose.toFixed(0)} mg (${weight} kg × 40 mg/kg/dose - média)${
							singleDoseMg > maxDose ? `<br><span class="text-red-600 font-medium">Limitado ao máximo de ${maxDose} mg/dose</span>` : ''
						}<br>Faixa: ${(weight * 25).toFixed(0)}-${Math.min(weight * 75, maxDose).toFixed(0)} mg/dose<br><br><strong>Preparo:</strong><br>• ${volumeMl.toFixed(1)} ml de MgSO4 50% (500mg/ml)<br>• Diluir em SF 0,9% para ${totalVolumeMl.toFixed(
							0,
						)} ml total<br>• Infundir a 2,5 mg/kg/min ≈ ${infusionRateMgMin.toFixed(1)} mg/min<br>• Tempo: ~20 minutos`,
					};
				},
			},

			salbutamol_ev: {
				name: 'SALBUTAMOL EV',
				category: 'Asma/Respiratório',
				presentation: '0,5mg/ml',
				dose: 'Bolus 15-20ug/kg em 15min. Infusão continua 0,5-1ug/kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Para crise grave refratária (alternativa ao sulfato de magnésio)',
				calculate: function (weight, isBolus = true) {
					if (isBolus) {
						const bolusUg = weight * 17.5; // média entre 15-20
						const bolusMg = bolusUg / 1000;
						const volumeMl = bolusMg / 0.5; // 0,5mg/ml

						return {
							dailyDose: `${bolusUg.toFixed(0)} ug (bolus)`,
							singleDose: 'Em 15 minutos',
							practicalDose: `${volumeMl.toFixed(1)} ml em 15min`,
							details: `<strong>Bolus EV (crise grave)</strong><br>Dose: ${bolusUg.toFixed(0)} ug (${weight} kg × 17,5 ug/kg - média)<br>Faixa: ${(weight * 15).toFixed(0)}-${(weight * 20).toFixed(0)} ug<br>Volume: ${volumeMl.toFixed(
								1,
							)} ml (solução 0,5mg/ml)<br>Infundir em 15 minutos<br><br>Após bolus, considerar infusão contínua se necessário`,
						};
					} else {
						const infusionUgKgMin = 0.75; // média entre 0,5-1
						const infusionUgMin = weight * infusionUgKgMin;
						const infusionMgH = (infusionUgMin * 60) / 1000;

						// Preparo para infusão contínua
						// Diluir 5mg (10ml) em 240ml SF = 20ug/ml
						const concentrationUgMl = 20; // exemplo comum
						const infusionRateMlH = (infusionUgMin * 60) / concentrationUgMl;

						return {
							dailyDose: `${infusionUgKgMin.toFixed(1)} ug/kg/min`,
							singleDose: 'Infusão contínua',
							practicalDose: `${infusionRateMlH.toFixed(1)} ml/h (solução 20ug/ml)`,
							details: `<strong>Infusão contínua EV</strong><br>Dose: ${infusionUgKgMin.toFixed(1)} ug/kg/min (média)<br>Faixa: 0,5-1 ug/kg/min<br>Taxa: ${infusionUgMin.toFixed(1)} ug/min = ${infusionMgH.toFixed(
								2,
							)} mg/h<br><br><strong>Preparo comum:</strong><br>5 mg (10ml de solução 0,5mg/ml) em 240ml SF 0,9%<br>Concentração: 20 ug/ml<br>Velocidade: ${infusionRateMlH.toFixed(1)} ml/h<br><br>Titular conforme resposta clínica`,
						};
					}
				},
			},

			clenil_hfa: {
				name: 'CLENIL HFA',
				category: 'Asma/Respiratório',
				presentation: '50ug/jato, 100ug/jato, 200ug/jato e 250ug/jato',
				dose: '< 5a: 50ug/jato - 1 jato de 12/12h<br>6-12a: dose baixa 50ug/jato - 1 jato de 12/12h até 2 jatos de 12/12h; dose média 250ug/jato 1 jato 1x/dia ou 1 jato de 12/12h<br>Adulto: dose baixa 50ug/jato 2 jatos 12/12h; dose média 250ug/jato de 12/12h',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Corticoide inalatório para prevenção',
				calculate: function (weight, ageMonths = null, doseLevel = 'baixa') {
					if (ageYears && ageYears < 5) {
						return {
							dailyDose: '100 ug/dia',
							singleDose: '50 ug 2x/dia',
							practicalDose: '1 jato de 50ug 12/12h',
							details: `<strong>Idade < 5 anos</strong><br>Dose preventiva<br>1 jato de 50ug 2 vezes ao dia (12/12h)<br>Dose diária: 100 ug`,
						};
					} else if (ageYears && ageYears <= 12) {
						if (doseLevel === 'baixa') {
							return {
								dailyDose: '100-200 ug/dia',
								singleDose: '50ug 1-2 jatos 2x/dia',
								practicalDose: '1-2 jatos de 50ug 12/12h',
								details: `<strong>Idade 6-12 anos (dose baixa)</strong><br>1-2 jatos de 50ug 2 vezes ao dia (12/12h)<br>Dose diária: 100-200 ug`,
							};
						} else {
							return {
								dailyDose: '250-500 ug/dia',
								singleDose: '250ug 1 jato 1-2x/dia',
								practicalDose: '1 jato de 250ug 1-2x/dia',
								details: `<strong>Idade 6-12 anos (dose média)</strong><br>1 jato de 250ug 1-2 vezes ao dia<br>Dose diária: 250-500 ug`,
							};
						}
					} else {
						if (doseLevel === 'baixa') {
							return {
								dailyDose: '200 ug/dia',
								singleDose: '50ug 2 jatos 2x/dia',
								practicalDose: '2 jatos de 50ug 12/12h',
								details: `<strong>Adulto/adolescente (dose baixa)</strong><br>2 jatos de 50ug 2 vezes ao dia (12/12h)<br>Dose diária: 200 ug`,
							};
						} else {
							return {
								dailyDose: '500 ug/dia',
								singleDose: '250ug 1 jato 2x/dia',
								practicalDose: '1 jato de 250ug 12/12h',
								details: `<strong>Adulto/adolescente (dose média)</strong><br>1 jato de 250ug 2 vezes ao dia (12/12h)<br>Dose diária: 500 ug`,
							};
						}
					}
				},
			},
		},

		// ============================================
		// CATEGORIA: Drogas de Infusão Contínua
		// ============================================
		drogasContinuas: {
			amiodarona: {
				name: 'AMIODARONA (Atlansil)',
				category: 'Drogas de Infusão Contínua',
				presentation: '50mg/mL',
				dose: 'Ataque: 5mg/Kg<br>Manutenção: 5-10 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Ataque: 300mg',
				notes: 'Diluir em SG5%, concentração máx 2mg/mL. Meia-vida longa: 40-55 dias',
				calculate: function (weight) {
					const attackDose = Math.min(weight * 5, 300);
					const maintenanceMin = weight * 5;
					const maintenanceMax = weight * 10;

					return {
						dailyDose: `${attackDose.toFixed(0)} mg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min manutenção`,
						singleDose: `Ataque: ${attackDose.toFixed(0)} mg (${weight} kg × 5 mg/kg)<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min`,
						practicalDose: `Ataque: ${(attackDose / 50).toFixed(2)} mL (${attackDose.toFixed(0)} mg ÷ 50 mg/mL)`,
						details: `Dose de ataque: ${attackDose.toFixed(0)} mg (${weight} kg × 5 mg/kg, máximo 300mg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(
							0,
						)} mcg/min<br>Diluir em SG5% para concentração máxima de 2mg/mL<br>Volume do ataque: ${(attackDose / 50).toFixed(2)} mL do produto concentrado`,
					};
				},
			},

			amrinona: {
				name: 'AMRINONA (Inocor)',
				category: 'Drogas de Infusão Contínua',
				presentation: '5mg/mL',
				dose: 'Ataque: 0,75-1mg/Kg<br>Manutenção: 5-10 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Inodilatador. Pode ser feito IO. Não diluir em solução glicosada',
				calculate: function (weight) {
					const attackMin = weight * 0.75;
					const attackMax = weight * 1;
					const maintenanceMin = weight * 5;
					const maintenanceMax = weight * 10;

					return {
						dailyDose: `${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min manutenção`,
						singleDose: `Ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min`,
						practicalDose: `Ataque: ${(attackMin / 5).toFixed(2)}-${(attackMax / 5).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg (${weight} kg × 0,75-1 mg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min<br>Volume do ataque: ${(attackMin / 5).toFixed(2)}-${(
							attackMax / 5
						).toFixed(2)} mL (5mg/mL)<br>Não diluir em solução glicosada`,
					};
				},
			},

			dobutamina: {
				name: 'DOBUTAMINA (Dobutrex)',
				category: 'Drogas de Infusão Contínua',
				presentation: '12,5mg/mL',
				dose: '2-20 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Inotrópico; vasodilatador. Evitar em hipotensos. Pode ser feito IO',
				calculate: function (weight) {
					const minRate = weight * 2;
					const maxRate = weight * 20;

					// Para cálculo de mg/hora
					const minMgPerHour = (minRate * 60) / 1000; // mcg/min para mg/hora
					const maxMgPerHour = (maxRate * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min`,
						singleDose: `${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min (${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
						practicalDose: null,
						details: `Dose de infusão: ${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min (${weight} kg × 2-20 mcg/kg/min)<br>Equivalente a ${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(
							2,
						)} mg/hora<br>Evitar usar em pacientes hipotensos<br>Pode ser administrado via intraóssea`,
					};
				},
			},

			dopamina: {
				name: 'DOPAMINA (Revivan)',
				category: 'Drogas de Infusão Contínua',
				presentation: '5mg/mL',
				dose: '2-20 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Inotrópico; vasodilatador renal e esplâncnico (baixas doses); vasopressor (altas doses). Pode ser feito IO',
				calculate: function (weight) {
					const minRate = weight * 2;
					const maxRate = weight * 20;
					const minMgPerHour = (minRate * 60) / 1000;
					const maxMgPerHour = (maxRate * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min`,
						singleDose: `${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min (${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
						practicalDose: null,
						details: `Dose: ${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min (${weight} kg × 2-20 mcg/kg/min)<br>Equivalente a ${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(
							2,
						)} mg/hora<br>• 2-5 mcg/kg/min: efeito renal/esplâncnico<br>• 5-10 mcg/kg/min: inotrópico<br>• >10 mcg/kg/min: vasopressor<br>Pode ser administrado via intraóssea`,
					};
				},
			},

			epinefrinaCont: {
				name: 'EPINEFRINA - Infusão Contínua (Adrenalina)',
				category: 'Drogas de Infusão Contínua',
				presentation: '1mg/mL',
				dose: '0,1-1,0 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Inotrópico; vasodilatador (baixas doses); cronotrópico e vasopressor (altas doses). Pode ser feito IO',
				calculate: function (weight) {
					const minRate = weight * 0.1;
					const maxRate = weight * 1.0;
					const minMgPerHour = (minRate * 60) / 1000;
					const maxMgPerHour = (maxRate * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min`,
						singleDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: null,
						details: `Dose: ${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${weight} kg × 0,1-1,0 mcg/kg/min)<br>Equivalente a ${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(
							3,
						)} mg/hora<br>• Baixas doses: efeito inotrópico/vasodilatador<br>• Altas doses: efeito cronotrópico/vasopressor<br>Pode ser administrado via intraóssea`,
					};
				},
			},

			fentanilaCont: {
				name: 'FENTANILA - Infusão Contínua',
				category: 'Drogas de Infusão Contínua',
				presentation: '50 mcg/mL',
				dose: 'Ataque: 2-7 mcg/Kg<br>Manutenção: 1-10 mcg/Kg/hora',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Ataque: Máx 100 mcg',
				notes: 'Pode causar rigidez torácica. Se ocorrer, usar bloqueador neuromuscular',
				calculate: function (weight) {
					const attackMin = weight * 2;
					const attackMax = Math.min(weight * 7, 100);
					const maintenanceMin = weight * 1;
					const maintenanceMax = weight * 10;

					return {
						dailyDose: `${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/hora`,
						singleDose: `Ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/hora`,
						practicalDose: `Ataque: ${(attackMin / 50).toFixed(2)}-${(attackMax / 50).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg (${weight} kg × 2-7 mcg/kg, máximo 100mcg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/hora<br>Volume do ataque: ${(
							attackMin / 50
						).toFixed(2)}-${(attackMax / 50).toFixed(2)} mL (50mcg/mL)<br>Atenção: risco de rigidez torácica`,
					};
				},
			},

			fenoldopan: {
				name: 'FENOLDOPAN (Corlopam)',
				category: 'Drogas de Infusão Contínua',
				presentation: '10mg/mL',
				dose: '0,1-0,8 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Vasodilatador renal. Aumenta PIC e pressão intraocular',
				calculate: function (weight) {
					const minRate = weight * 0.1;
					const maxRate = weight * 0.8;
					const minMgPerHour = (minRate * 60) / 1000;
					const maxMgPerHour = (maxRate * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min`,
						singleDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: null,
						details: `Dose: ${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${weight} kg × 0,1-0,8 mcg/kg/min)<br>Equivalente a ${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(
							3,
						)} mg/hora<br>Vasodilatador renal seletivo<br>Cuidado: aumenta pressão intracraniana e intraocular`,
					};
				},
			},

			ketaminaCont: {
				name: 'KETAMINA - Infusão Contínua (Ketamin S)',
				category: 'Drogas de Infusão Contínua',
				presentation: '50mg/mL',
				dose: 'Ataque: 1-4 mg/Kg<br>Manutenção: 5-10 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Associar midazolam',
				calculate: function (weight) {
					const attackMin = weight * 1;
					const attackMax = weight * 4;
					const maintenanceMin = weight * 5;
					const maintenanceMax = weight * 10;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min`,
						singleDose: `Ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min (${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
						practicalDose: `Ataque: ${(attackMin / 50).toFixed(2)}-${(attackMax / 50).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg (${weight} kg × 1-4 mg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min<br>Volume do ataque: ${(attackMin / 50).toFixed(2)}-${(
							attackMax / 50
						).toFixed(2)} mL (50mg/mL)<br>Sempre associar midazolam`,
					};
				},
			},

			labetalolCont: {
				name: 'LABETALOL - Infusão Contínua (Trandate)',
				category: 'Drogas de Infusão Contínua',
				presentation: '5mg/mL',
				dose: 'Ataque: 0,2-1 mg/Kg<br>Manutenção: 0,4-3 mg/Kg/hora',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Contraindicado em asma, DPOC, choque cardiogênico',
				calculate: function (weight) {
					const attackMin = weight * 0.2;
					const attackMax = weight * 1;
					const maintenanceMin = weight * 0.4;
					const maintenanceMax = weight * 3;

					return {
						dailyDose: `${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg ataque + ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mg/hora`,
						singleDose: `Ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg<br>Manutenção: ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mg/hora`,
						practicalDose: `Ataque: ${(attackMin / 5).toFixed(2)}-${(attackMax / 5).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg (${weight} kg × 0,2-1 mg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mg/hora<br>Volume do ataque: ${(attackMin / 5).toFixed(2)}-${(
							attackMax / 5
						).toFixed(2)} mL (5mg/mL)<br>Contraindicado: asma, DPOC, choque cardiogênico`,
					};
				},
			},

			levosimendan: {
				name: 'LEVOSIMENDAN (Simdax)',
				category: 'Drogas de Infusão Contínua',
				presentation: '2,5mg/mL',
				dose: 'Ataque: 6-12 mcg/Kg em 10 min<br>Manutenção: 0,05-0,2 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: 'Contraindicado na insuficiência renal',
				maxDose: null,
				notes: 'Inodilatador. Contraindicado na insuficiência renal',
				calculate: function (weight) {
					const attackMin = weight * 6;
					const attackMax = weight * 12;
					const maintenanceMin = weight * 0.05;
					const maintenanceMax = weight * 0.2;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg ataque + ${maintenanceMin.toFixed(2)}-${maintenanceMax.toFixed(2)} mcg/min`,
						singleDose: `Ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg em 10 min<br>Manutenção: ${maintenanceMin.toFixed(2)}-${maintenanceMax.toFixed(2)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: `Ataque: ${(attackMin / 2500).toFixed(3)}-${(attackMax / 2500).toFixed(3)} mL (2,5mg/mL = 2500mcg/mL)`,
						details: `Dose de ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg em 10 min (${weight} kg × 6-12 mcg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(2)}-${maintenanceMax.toFixed(2)} mcg/min<br>Volume do ataque: ${(
							attackMin / 2500
						).toFixed(3)}-${(attackMax / 2500).toFixed(3)} mL<br>Contraindicado em insuficiência renal`,
					};
				},
			},

			lidocainaCont: {
				name: 'LIDOCAÍNA - Infusão Contínua (Xylocaina)',
				category: 'Drogas de Infusão Contínua',
				presentation: '20mg/mL (2%)',
				dose: 'Ataque: 1 mg/Kg/dose<br>Manutenção: 20-50 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Efeitos colaterais: hipotensão, assistolia, convulsões, parada respiratória',
				calculate: function (weight) {
					const attackDose = weight * 1;
					const maintenanceMin = weight * 20;
					const maintenanceMax = weight * 50;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackDose.toFixed(0)} mg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min`,
						singleDose: `Ataque: ${attackDose.toFixed(0)} mg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min (${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
						practicalDose: `Ataque: ${(attackDose / 20).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackDose.toFixed(0)} mg (${weight} kg × 1 mg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min<br>Volume do ataque: ${(attackDose / 20).toFixed(
							2,
						)} mL (20mg/mL)<br>Atenção: risco de hipotensão, arritmias, convulsões`,
					};
				},
			},

			midazolamCont: {
				name: 'MIDAZOLAM - Infusão Contínua (Dormonid)',
				category: 'Drogas de Infusão Contínua',
				presentation: '5mg/mL',
				dose: 'Ataque: 0,2-0,4 mg/Kg<br>Sedação: 0,1-0,3 mg/Kg/hora<br>Mal convulsivo: 1-18 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Mal convulsivo: 1-18 mcg/Kg/min',
				calculate: function (weight, indication = 'sedacao') {
					if (indication === 'sedacao') {
						const attackMin = weight * 0.2;
						const attackMax = weight * 0.4;
						const maintenanceMin = weight * 0.1;
						const maintenanceMax = weight * 0.3;

						return {
							dailyDose: `${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg ataque + ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mg/hora`,
							singleDose: `Ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg<br>Manutenção: ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mg/hora`,
							practicalDose: `Ataque: ${(attackMin / 5).toFixed(2)}-${(attackMax / 5).toFixed(2)} mL`,
							details: `Sedação:<br>• Ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg (${weight} kg × 0,2-0,4 mg/kg)<br>• Manutenção: ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mg/hora<br>Volume do ataque: ${(attackMin / 5).toFixed(
								2,
							)}-${(attackMax / 5).toFixed(2)} mL`,
						};
					} else {
						const minRate = weight * 1;
						const maxRate = weight * 18;
						const minMgPerHour = (minRate * 60) / 1000;
						const maxMgPerHour = (maxRate * 60) / 1000;

						return {
							dailyDose: `${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min`,
							singleDose: `${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min (${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
							practicalDose: null,
							details: `Mal convulsivo:<br>• Dose: ${minRate.toFixed(0)}-${maxRate.toFixed(0)} mcg/min (${weight} kg × 1-18 mcg/kg/min)<br>• Equivalente a ${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora`,
						};
					}
				},
			},

			milrinona: {
				name: 'MILRINONA (Primacor)',
				category: 'Drogas de Infusão Contínua',
				presentation: '1mg/mL',
				dose: 'Ataque: 50-75 mcg/Kg em até 1 hora<br>Manutenção: 0,25-0,75 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Inodilatador',
				calculate: function (weight) {
					const attackMin = weight * 50;
					const attackMax = weight * 75;
					const maintenanceMin = weight * 0.25;
					const maintenanceMax = weight * 0.75;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg ataque + ${maintenanceMin.toFixed(2)}-${maintenanceMax.toFixed(2)} mcg/min`,
						singleDose: `Ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg em 1 hora<br>Manutenção: ${maintenanceMin.toFixed(2)}-${maintenanceMax.toFixed(2)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: `Ataque: ${(attackMin / 1000).toFixed(2)}-${(attackMax / 1000).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg em 1 hora (${weight} kg × 50-75 mcg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(2)}-${maintenanceMax.toFixed(2)} mcg/min<br>Volume do ataque: ${(
							attackMin / 1000
						).toFixed(2)}-${(attackMax / 1000).toFixed(2)} mL (1mg/mL = 1000mcg/mL)`,
					};
				},
			},

			morfinaCont: {
				name: 'MORFINA - Infusão Contínua (Dimorf)',
				category: 'Drogas de Infusão Contínua',
				presentation: '1mg/mL',
				dose: 'Ataque: 0,1-0,2 mg/Kg<br>Manutenção: 0,025-2,5 mg/Kg/hora',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Ataque: 15mg',
				notes: 'Depressão respiratória e SNC. Secreção de histamina. Antídoto: Naloxona',
				calculate: function (weight) {
					const attackMin = Math.min(weight * 0.1, 15);
					const attackMax = Math.min(weight * 0.2, 15);
					const maintenanceMin = weight * 0.025;
					const maintenanceMax = weight * 2.5;

					return {
						dailyDose: `${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg ataque + ${maintenanceMin.toFixed(3)}-${maintenanceMax.toFixed(2)} mg/hora`,
						singleDose: `Ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg<br>Manutenção: ${maintenanceMin.toFixed(3)}-${maintenanceMax.toFixed(2)} mg/hora`,
						practicalDose: `Ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg (${weight} kg × 0,1-0,2 mg/kg, máximo 15mg)<br>Dose de manutenção: ${maintenanceMin.toFixed(3)}-${maintenanceMax.toFixed(
							2,
						)} mg/hora<br>Atenção: depressão respiratória, secreção de histamina<br>Antídoto: Naloxona`,
					};
				},
			},

			nicardipina: {
				name: 'NICARDIPINA (Cardene)',
				category: 'Drogas de Infusão Contínua',
				presentation: '5mg/mL',
				dose: '0,5-3 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Bloqueador de canal de cálcio. Diminui fluxo cerebral e coronariano',
				calculate: function (weight) {
					const minRate = weight * 0.5;
					const maxRate = weight * 3;
					const minMgPerHour = (minRate * 60) / 1000;
					const maxMgPerHour = (maxRate * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min`,
						singleDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: null,
						details: `Dose: ${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${weight} kg × 0,5-3 mcg/kg/min)<br>Equivalente a ${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(
							3,
						)} mg/hora<br>Bloqueador de canal de cálcio<br>Efeito: diminui fluxo cerebral e coronariano`,
					};
				},
			},

			nitroglicerina: {
				name: 'NITROGLICERINA (Tridil)',
				category: 'Drogas de Infusão Contínua',
				presentation: '5mg/mL',
				dose: '0,3-1 mcg/Kg/min (até 5 mcg/Kg/min)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Pode causar hipotensão',
				calculate: function (weight) {
					const minRate = weight * 0.3;
					const maxRate = weight * 1;
					const maxRateTotal = weight * 5;
					const minMgPerHour = (minRate * 60) / 1000;
					const maxMgPerHour = (maxRate * 60) / 1000;
					const maxMgPerHourTotal = (maxRateTotal * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (até ${maxRateTotal.toFixed(1)} mcg/min)`,
						singleDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: null,
						details: `Dose inicial: ${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${weight} kg × 0,3-1 mcg/kg/min)<br>Dose máxima: até ${maxRateTotal.toFixed(1)} mcg/min<br>Equivalente a ${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(
							3,
						)} mg/hora (até ${maxMgPerHourTotal.toFixed(3)} mg/hora)<br>Atenção: pode causar hipotensão`,
					};
				},
			},

			nitroprussiato: {
				name: 'NITROPRUSSIATO DE SÓDIO (Nipride)',
				category: 'Drogas de Infusão Contínua',
				presentation: '25mg/mL',
				dose: '0,5-1 mcg/Kg/min (até 8 mcg/Kg/min)',
				practicalRule: null,
				renalAdjustment: 'Risco de intoxicação em insuficiência renal ou hepática',
				maxDose: null,
				notes: 'Diluir em solução glicosada. Necessita fotoproteção',
				calculate: function (weight) {
					const minRate = weight * 0.5;
					const maxRate = weight * 1;
					const maxRateTotal = weight * 8;
					const minMgPerHour = (minRate * 60) / 1000;
					const maxMgPerHour = (maxRate * 60) / 1000;
					const maxMgPerHourTotal = (maxRateTotal * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (até ${maxRateTotal.toFixed(1)} mcg/min)`,
						singleDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: null,
						details: `Dose inicial: ${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${weight} kg × 0,5-1 mcg/kg/min)<br>Dose máxima: até ${maxRateTotal.toFixed(1)} mcg/min<br>Equivalente a ${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(
							3,
						)} mg/hora (até ${maxMgPerHourTotal.toFixed(3)} mg/hora)<br>Diluir em SG5%. Fotoproteção obrigatória.<br>Risco de intoxicação em IR/IH`,
					};
				},
			},

			norepinefrina: {
				name: 'NOREPINEFRINA (Norepine)',
				category: 'Drogas de Infusão Contínua',
				presentation: '1mg/mL',
				dose: '0,1-2,0 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Vasopressora. Não diluir em SF',
				calculate: function (weight) {
					const minRate = weight * 0.1;
					const maxRate = weight * 2.0;
					const minMgPerHour = (minRate * 60) / 1000;
					const maxMgPerHour = (maxRate * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min`,
						singleDose: `${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: null,
						details: `Dose: ${minRate.toFixed(1)}-${maxRate.toFixed(1)} mcg/min (${weight} kg × 0,1-2,0 mcg/kg/min)<br>Equivalente a ${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora<br>Vasopressor puro<br>Não diluir em soro fisiológico`,
					};
				},
			},

			octreotida: {
				name: 'OCTREOTIDA (Sandostatin)',
				category: 'Drogas de Infusão Contínua',
				presentation: 'Ampolas: 0,05mg, 0,1mg, 0,5mg',
				dose: 'Ataque: 1 mcg/Kg<br>Manutenção: 1-2 mcg/Kg/hora',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Monitorizar glicemia e PA',
				calculate: function (weight) {
					const attackDose = weight * 1;
					const maintenanceMin = weight * 1;
					const maintenanceMax = weight * 2;

					return {
						dailyDose: `${attackDose.toFixed(0)} mcg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/hora`,
						singleDose: `Ataque: ${attackDose.toFixed(0)} mcg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/hora`,
						practicalDose: `Ataque: ${(attackDose / 50).toFixed(2)} mL da ampola 0,05mg/mL (50mcg/mL)`,
						details: `Dose de ataque: ${attackDose.toFixed(0)} mcg (${weight} kg × 1 mcg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(
							0,
						)} mcg/hora<br>Opções de apresentação:<br>• 0,05mg/mL = 50mcg/mL<br>• 0,1mg/mL = 100mcg/mL<br>• 0,5mg/mL = 500mcg/mL<br>Monitorizar: glicemia e pressão arterial`,
					};
				},
			},

			propofolCont: {
				name: 'PROPOFOL - Infusão Contínua (Diprivan)',
				category: 'Drogas de Infusão Contínua',
				presentation: '10mg/mL',
				dose: 'Ataque: 1-2 mg/Kg<br>Manutenção: 25-300 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Insolúvel em água',
				calculate: function (weight) {
					const attackMin = weight * 1;
					const attackMax = weight * 2;
					const maintenanceMin = weight * 25;
					const maintenanceMax = weight * 300;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min`,
						singleDose: `Ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min (${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
						practicalDose: `Ataque: ${(attackMin / 10).toFixed(1)}-${(attackMax / 10).toFixed(1)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg (${weight} kg × 1-2 mg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min<br>Volume do ataque: ${(attackMin / 10).toFixed(1)}-${(
							attackMax / 10
						).toFixed(1)} mL (10mg/mL)<br>Insolúvel em água`,
					};
				},
			},

			rocuronioCont: {
				name: 'ROCURÔNIO - Infusão Contínua (Esmeron)',
				category: 'Drogas de Infusão Contínua',
				presentation: '10mg/mL',
				dose: 'Ataque: 0,6-1,2 mg/Kg<br>Manutenção: 6-10 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Associar sedação',
				calculate: function (weight) {
					const attackMin = weight * 0.6;
					const attackMax = weight * 1.2;
					const maintenanceMin = weight * 6;
					const maintenanceMax = weight * 10;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min`,
						singleDose: `Ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min (${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
						practicalDose: `Ataque: ${(attackMin / 10).toFixed(2)}-${(attackMax / 10).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} mg (${weight} kg × 0,6-1,2 mg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min<br>Volume do ataque: ${(attackMin / 10).toFixed(
							2,
						)}-${(attackMax / 10).toFixed(2)} mL (10mg/mL)<br>Sempre associar sedação`,
					};
				},
			},

			prostaglandinaE1: {
				name: 'PROSTAGLANDINA E1 (Alprostadil)',
				category: 'Drogas de Infusão Contínua',
				presentation: '500 mcg/mL',
				dose: '0,01-0,1 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Monitorizar apneia, hipotensão e hipoglicemia',
				calculate: function (weight) {
					const minRate = weight * 0.01;
					const maxRate = weight * 0.1;
					const minMgPerHour = (minRate * 60) / 1000;
					const maxMgPerHour = (maxRate * 60) / 1000;

					return {
						dailyDose: `${minRate.toFixed(2)}-${maxRate.toFixed(2)} mcg/min`,
						singleDose: `${minRate.toFixed(2)}-${maxRate.toFixed(2)} mcg/min (${minMgPerHour.toFixed(4)}-${maxMgPerHour.toFixed(4)} mg/hora)`,
						practicalDose: null,
						details: `Dose: ${minRate.toFixed(2)}-${maxRate.toFixed(2)} mcg/min (${weight} kg × 0,01-0,1 mcg/kg/min)<br>Equivalente a ${minMgPerHour.toFixed(4)}-${maxMgPerHour.toFixed(4)} mg/hora<br>Monitorizar: apneia, hipotensão, hipoglicemia`,
					};
				},
			},

			salbutamolCont: {
				name: 'SALBUTAMOL - Infusão Contínua (Aerolin)',
				category: 'Drogas de Infusão Contínua',
				presentation: '500 mcg/mL',
				dose: 'Ataque: 15 mcg/Kg (infundir em 10 min)<br>Manutenção: 0,1-15 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Monitorizar ritmo cardíaco, potássio sérico e glicemia',
				calculate: function (weight) {
					const attackDose = weight * 15;
					const maintenanceMin = weight * 0.1;
					const maintenanceMax = weight * 15;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackDose.toFixed(0)} mcg ataque + ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(0)} mcg/min`,
						singleDose: `Ataque: ${attackDose.toFixed(0)} mcg em 10 min<br>Manutenção: ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(0)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
						practicalDose: `Ataque: ${(attackDose / 500).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackDose.toFixed(0)} mcg em 10 min (${weight} kg × 15 mcg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(0)} mcg/min<br>Volume do ataque: ${(attackDose / 500).toFixed(
							2,
						)} mL (500mcg/mL)<br>Monitorizar: ECG, K+, glicemia`,
					};
				},
			},

			somatostatina: {
				name: 'SOMATOSTATINA (Sillamin)',
				category: 'Drogas de Infusão Contínua',
				presentation: '3mg',
				dose: 'Ataque: 1-5 mcg/Kg<br>Manutenção: 3-10 mcg/Kg/hora',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Monitorização hemodinâmica e de glicemia',
				calculate: function (weight) {
					const attackMin = weight * 1;
					const attackMax = weight * 5;
					const maintenanceMin = weight * 3;
					const maintenanceMax = weight * 10;

					return {
						dailyDose: `${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/hora`,
						singleDose: `Ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/hora`,
						practicalDose: `Preparar solução: diluir 3mg (3000mcg) em volume adequado`,
						details: `Dose de ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mcg (${weight} kg × 1-5 mcg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(
							0,
						)} mcg/hora<br>Preparação: diluir 3mg (3000mcg) em SF/SG<br>Monitorizar: hemodinâmica, glicemia`,
					};
				},
			},

			terbutalinaCont: {
				name: 'TERBUTALINA - Infusão Contínua (Terbutil)',
				category: 'Drogas de Infusão Contínua',
				presentation: '0,5mg/mL (500 mcg/mL)',
				dose: 'Ataque: 10 mcg/Kg (infundir em 10 min)<br>Manutenção: 0,1-4,0 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Ataque: 500 mcg',
				notes: 'Monitorizar ritmo cardíaco, potássio sérico e glicemia. Diluição com SF aumenta risco de edema pulmonar',
				calculate: function (weight) {
					const attackDose = Math.min(weight * 10, 500);
					const maintenanceMin = weight * 0.1;
					const maintenanceMax = weight * 4.0;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackDose.toFixed(0)} mcg ataque + ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mcg/min`,
						singleDose: `Ataque: ${attackDose.toFixed(0)} mcg em 10 min<br>Manutenção: ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mcg/min (${minMgPerHour.toFixed(3)}-${maxMgPerHour.toFixed(3)} mg/hora)`,
						practicalDose: `Ataque: ${(attackDose / 500).toFixed(2)} mL`,
						details: `Dose de ataque: ${attackDose.toFixed(0)} mcg em 10 min (${weight} kg × 10 mcg/kg, máximo 500mcg)<br>Dose de manutenção: ${maintenanceMin.toFixed(1)}-${maintenanceMax.toFixed(1)} mcg/min<br>Volume do ataque: ${(attackDose / 500).toFixed(
							2,
						)} mL (500mcg/mL)<br>Monitorizar: ECG, K+, glicemia<br>Evitar diluição com SF (risco edema pulmonar)`,
					};
				},
			},

			tiopentalCont: {
				name: 'TIOPENTAL - Infusão Contínua (Thionembutal)',
				category: 'Drogas de Infusão Contínua',
				presentation: 'Frascos: 0,5 e 1,0g',
				dose: 'Ataque: 2-5 mg/Kg<br>Manutenção: 10-100 mcg/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Monitorização hemodinâmica',
				calculate: function (weight) {
					const attackMin = weight * 2;
					const attackMax = weight * 5;
					const maintenanceMin = weight * 10;
					const maintenanceMax = weight * 100;
					const minMgPerHour = (maintenanceMin * 60) / 1000;
					const maxMgPerHour = (maintenanceMax * 60) / 1000;

					return {
						dailyDose: `${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg ataque + ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min`,
						singleDose: `Ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg<br>Manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min (${minMgPerHour.toFixed(2)}-${maxMgPerHour.toFixed(2)} mg/hora)`,
						practicalDose: null,
						details: `Dose de ataque: ${attackMin.toFixed(0)}-${attackMax.toFixed(0)} mg (${weight} kg × 2-5 mg/kg)<br>Dose de manutenção: ${maintenanceMin.toFixed(0)}-${maintenanceMax.toFixed(0)} mcg/min<br>Monitorização hemodinâmica obrigatória`,
					};
				},
			},

			vasopressina: {
				name: 'VASOPRESSINA (Encrise)',
				category: 'Drogas de Infusão Contínua',
				presentation: '200 U/mL',
				dose: 'Ataque: 0,4-1 U/Kg<br>Manutenção: 0,00002-0,002 U/Kg/min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Ataque: 40U',
				notes: 'Uso em PCR e hipotensão resistente às catecolaminas',
				calculate: function (weight) {
					const attackMin = Math.min(weight * 0.4, 40);
					const attackMax = Math.min(weight * 1, 40);
					const maintenanceMin = weight * 0.00002;
					const maintenanceMax = weight * 0.002;

					return {
						dailyDose: `${attackMin.toFixed(1)}-${attackMax.toFixed(1)} U ataque + ${maintenanceMin.toFixed(6)}-${maintenanceMax.toFixed(5)} U/min`,
						singleDose: `Ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} U<br>Manutenção: ${maintenanceMin.toFixed(6)}-${maintenanceMax.toFixed(5)} U/min`,
						practicalDose: `Ataque: ${(attackMin / 200).toFixed(3)}-${(attackMax / 200).toFixed(3)} mL`,
						details: `Dose de ataque: ${attackMin.toFixed(1)}-${attackMax.toFixed(1)} U (${weight} kg × 0,4-1 U/kg, máximo 40U)<br>Dose de manutenção: ${maintenanceMin.toFixed(6)}-${maintenanceMax.toFixed(5)} U/min<br>Volume do ataque: ${(
							attackMin / 200
						).toFixed(3)}-${(attackMax / 200).toFixed(3)} mL (200U/mL)<br>Indicação: PCR e hipotensão refratária`,
					};
				},
			},

			adenosina: {
				name: 'ADENOSINA (Adenocard)',
				category: 'Drogas de Emergência',
				presentation: '3mg/mL',
				dose: '0,1-0,2 mg/Kg (Máx: 12mg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '12mg',
				notes: 'Infundir bolo rápido de 3-5mL de SF após a droga',
				calculate: function (weight) {
					const doseMin = weight * 0.1;
					const doseMax = Math.min(weight * 0.2, 12);

					return {
						dailyDose: `Bolus único`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (bolus rápido)`,
						practicalDose: `${(doseMin / 3).toFixed(2)}-${(doseMax / 3).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,1-0,2 mg/kg, máximo 12mg)<br>Volume: ${(doseMin / 3).toFixed(2)}-${(doseMax / 3).toFixed(
							2,
						)} mL (3mg/mL)<br>Administração: bolus rápido IV seguido de 3-5mL de SF<br>Indicação: taquicardia supraventricular`,
					};
				},
			},

			amiodaronaEmerg: {
				name: 'AMIODARONA - Bolus (Atlansil)',
				category: 'Drogas de Emergência',
				presentation: '50mg/mL',
				dose: '5mg/Kg (Máx: 300mg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '300mg',
				notes: 'Diluir em SG5%, concentração máx 2mg/mL',
				calculate: function (weight) {
					const dose = Math.min(weight * 5, 300);

					return {
						dailyDose: `Bolus único (pode repetir)`,
						singleDose: `${dose.toFixed(0)} mg`,
						practicalDose: `${(dose / 50).toFixed(2)} mL`,
						details: `Dose: ${dose.toFixed(0)} mg (${weight} kg × 5 mg/kg, máximo 300mg)<br>Volume: ${(dose / 50).toFixed(2)} mL (50mg/mL)<br>Diluir em SG5% para concentração máxima de 2mg/mL`,
					};
				},
			},

			amlodipina: {
				name: 'AMLODIPINA - Uso Oral (Norvasc)',
				category: 'Drogas de Emergência',
				presentation: 'Comprimidos: 5mg e 10mg',
				dose: '0,1-0,3 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Efeitos colaterais relacionados à dosagem',
				calculate: function (weight) {
					const doseMin = weight * 0.1;
					const doseMax = weight * 0.3;

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dia (dose única)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `Comprimido 5mg: ${(doseMin / 5).toFixed(1)}-${(doseMax / 5).toFixed(1)} comp<br>Comprimido 10mg: ${(doseMin / 10).toFixed(1)}-${(doseMax / 10).toFixed(1)} comp`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,1-0,3 mg/kg)<br>Administração: dose única diária<br>Considerar fracionamento de comprimidos se necessário`,
					};
				},
			},

			atenolol: {
				name: 'ATENOLOL - Uso Oral (Atenol)',
				category: 'Drogas de Emergência',
				presentation: 'Comprimidos: 25mg, 50mg, 100mg',
				dose: '1-2 mg/Kg (Máx: 200mg/dia)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '200mg/dia',
				notes: 'Contraindicado em edema pulmonar e choque cardiogênico',
				calculate: function (weight) {
					const doseMin = weight * 1;
					const doseMax = Math.min(weight * 2, 200);

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dia`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (dose única ou dividida)`,
						practicalDose: `Comp 25mg: ${(doseMin / 25).toFixed(1)}-${(doseMax / 25).toFixed(1)} comp<br>Comp 50mg: ${(doseMin / 50).toFixed(1)}-${(doseMax / 50).toFixed(1)} comp`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dia (${weight} kg × 1-2 mg/kg, máximo 200mg)<br>Pode dividir em 1-2 doses ao dia<br>Contraindicação: edema pulmonar, choque cardiogênico`,
					};
				},
			},

			atropina: {
				name: 'ATROPINA (Pasmodex)',
				category: 'Drogas de Emergência',
				presentation: '0,25mg/mL',
				dose: '0,02 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'Criança: 0,5mg<br>Adolescente: 1,0mg',
				notes: 'Pode ser feito IO',
				calculate: function (weight, ageMonths = null) {
					const ageYears = Number.isFinite(ageMonths) ? ageMonths / 12 : null;
					const dose = weight * 0.02;
					let maxDose = 0.5;
					if (ageYears > 12) maxDose = 1.0;
					const finalDose = Math.min(dose, maxDose);

					return {
						dailyDose: `Bolus (repetir conforme necessidade)`,
						singleDose: `${finalDose.toFixed(2)} mg (máx: ${maxDose}mg)`,
						practicalDose: `${(finalDose / 0.25).toFixed(2)} mL`,
						details: `Dose: ${finalDose.toFixed(2)} mg (${weight} kg × 0,02 mg/kg)<br>Máximo: ${maxDose}mg (${ageYears > 12 ? 'adolescente' : 'criança'})<br>Volume: ${(finalDose / 0.25).toFixed(2)} mL (0,25mg/mL)<br>Vias: IV ou IO`,
					};
				},
			},

			bicarbonato: {
				name: 'BICARBONATO DE SÓDIO',
				category: 'Drogas de Emergência',
				presentation: '8,4% (1mEq/mL)',
				dose: '1 mEq/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'RN usar 4,2%. Lactente e crianças 8,4%. Veloc máx: 1mEq/Kg/h',
				calculate: function (weight, isNewborn = false) {
					const dose = weight * 1; // mEq
					const concentration = isNewborn ? 0.5 : 1; // mEq/mL (4,2% = 0,5mEq/mL; 8,4% = 1mEq/mL)
					const volume = dose / concentration;

					return {
						dailyDose: `${dose.toFixed(0)} mEq (bolus ou infusão)`,
						singleDose: `${dose.toFixed(0)} mEq`,
						practicalDose: `${volume.toFixed(1)} mL (${isNewborn ? '4,2%' : '8,4%'})`,
						details: `Dose: ${dose.toFixed(0)} mEq (${weight} kg × 1 mEq/kg)<br>Concentração: ${isNewborn ? '4,2% (0,5mEq/mL) - RN' : '8,4% (1mEq/mL) - lactente/criança'}<br>Volume: ${volume.toFixed(1)} mL<br>Velocidade máxima: 1 mEq/kg/hora`,
					};
				},
			},

			carvaoAtivado: {
				name: 'CARVÃO ATIVADO - Uso Oral',
				category: 'Drogas de Emergência',
				presentation: 'De manipulação',
				dose: '1,0 g/Kg/dose (Máx: 50g/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '50g/dose',
				notes: 'Diluição 1:10. Em doses repetidas associar laxativo',
				calculate: function (weight) {
					const dose = Math.min(weight * 1, 50);
					const volume = dose * 10; // Diluição 1:10

					return {
						dailyDose: `${dose.toFixed(0)} g/dose`,
						singleDose: `${dose.toFixed(0)} g`,
						practicalDose: `${volume.toFixed(0)} mL após diluição 1:10`,
						details: `Dose: ${dose.toFixed(0)} g (${weight} kg × 1 g/kg, máximo 50g)<br>Diluição: preparar ${volume.toFixed(0)} mL total (diluição 1:10)<br>Vias: VO ou SNG<br>Doses repetidas: associar laxativo`,
					};
				},
			},

			cetorolaco: {
				name: 'CETOROLACO (Toradol)',
				category: 'Drogas de Emergência',
				presentation: '30mg/mL',
				dose: '0,2-1 mg/Kg (Máx: 120mg/dia)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '120mg/dia',
				notes: 'Hemorragia digestiva. Nefrotoxicidade',
				calculate: function (weight) {
					const doseMin = weight * 0.2;
					const doseMax = Math.min(weight * 1, 120);

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dose (máx 120mg/dia)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 30).toFixed(2)}-${(doseMax / 30).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,2-1 mg/kg, máximo 120mg/dia)<br>Volume: ${(doseMin / 30).toFixed(2)}-${(doseMax / 30).toFixed(
							2,
						)} mL (30mg/mL)<br>Cuidado: risco de hemorragia digestiva e nefrotoxicidade`,
					};
				},
			},

			desfibrilacao: {
				name: 'DESFIBRILAÇÃO/CARDIOVERSÃO',
				category: 'Drogas de Emergência',
				presentation: 'Energia elétrica',
				dose: 'Cardioversão: 0,5-2 J/Kg<br>Desfibrilação: 2-4 J/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Cardioversão: iniciar 0,5-1 J/Kg<br>Desfibrilação: primeira 2J/Kg, seguintes 4J/Kg',
				calculate: function (weight) {
					const cardioMin = weight * 0.5;
					const cardioMax = weight * 2;
					const defibFirst = weight * 2;
					const defibSubsequent = weight * 4;

					return {
						dailyDose: `Energia conforme necessidade`,
						singleDose: `Cardioversão: ${cardioMin.toFixed(0)}-${cardioMax.toFixed(0)} J<br>Desfibrilação: ${defibFirst.toFixed(0)} J (1ª), ${defibSubsequent.toFixed(0)} J (seguintes)`,
						practicalDose: null,
						details: `Cardioversão (síncrona):<br>• Iniciar com ${(weight * 0.5).toFixed(0)}-${(weight * 1).toFixed(0)} J<br>• Máximo: ${cardioMax.toFixed(0)} J<br><br>Desfibrilação (não-síncrona):<br>• Primeira: ${defibFirst.toFixed(
							0,
						)} J<br>• Seguintes: ${defibSubsequent.toFixed(0)} J`,
					};
				},
			},

			cloretoCalcio: {
				name: 'CLORETO DE CÁLCIO',
				category: 'Drogas de Emergência',
				presentation: '10% (100mg/mL)',
				dose: '20 mg/Kg (Máx: 1g)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '1g',
				notes: 'Não usar IM ou SC. Extravasamento pode causar necrose',
				calculate: function (weight) {
					const dose = Math.min(weight * 20, 1000);
					const elementalCalcium = dose * 0.27; // 27% de cálcio elementar no cloreto

					return {
						dailyDose: `${dose.toFixed(0)} mg (bolus)`,
						singleDose: `${dose.toFixed(0)} mg (${elementalCalcium.toFixed(0)} mg Ca²⁺)`,
						practicalDose: `${(dose / 100).toFixed(1)} mL`,
						details: `Dose: ${dose.toFixed(0)} mg (${weight} kg × 20 mg/kg, máximo 1g)<br>Cálcio elementar: ${elementalCalcium.toFixed(0)} mg (27% de ${dose.toFixed(0)} mg)<br>Volume: ${(dose / 100).toFixed(
							1,
						)} mL (100mg/mL)<br>Administração: IV lento<br>Contraindicação: IM, SC (risco de necrose)`,
					};
				},
			},

			codeina: {
				name: 'CODEÍNA - Uso Oral',
				category: 'Drogas de Emergência',
				presentation: 'Solução: 3mg/mL<br>Comprimidos: 30mg, 60mg',
				dose: '1 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Hipotensão e depressão respiratória',
				calculate: function (weight) {
					const dose = weight * 1;

					return {
						dailyDose: `${dose.toFixed(0)} mg/dose (6/6h)`,
						singleDose: `${dose.toFixed(0)} mg`,
						practicalDose: `Solução: ${(dose / 3).toFixed(1)} mL (3mg/mL)<br>Comp 30mg: ${(dose / 30).toFixed(1)} comp`,
						details: `Dose: ${dose.toFixed(0)} mg (${weight} kg × 1 mg/kg)<br>Frequência: a cada 6 horas<br>Atenção: risco de hipotensão e depressão respiratória`,
					};
				},
			},

			dexametasona: {
				name: 'DEXAMETASONA (Decadron)',
				category: 'Drogas de Emergência',
				presentation: '2mg/mL (4mg/2,5mL)',
				dose: 'Laringite: 0,6 mg/Kg (Máx: 16mg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '16mg',
				notes: 'Pode ser usado na mesma dose por via oral',
				calculate: function (weight) {
					const dose = Math.min(weight * 0.6, 16);

					return {
						dailyDose: `${dose.toFixed(1)} mg (dose única)`,
						singleDose: `${dose.toFixed(1)} mg`,
						practicalDose: `${(dose / 2).toFixed(1)} mL (2mg/mL)`,
						details: `Dose laringite: ${dose.toFixed(1)} mg (${weight} kg × 0,6 mg/kg, máximo 16mg)<br>Volume: ${(dose / 2).toFixed(1)} mL (2mg/mL)<br>Vias: IM ou EV (mesma dose oral se necessário)`,
					};
				},
			},

			dexmedetomidina: {
				name: 'DEXMEDETOMIDINA (Precedex)',
				category: 'Drogas de Emergência',
				presentation: '100 mcg/mL',
				dose: '1 mcg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Pode ser usado por via intranasal',
				calculate: function (weight) {
					const dose = weight * 1;

					return {
						dailyDose: `${dose.toFixed(0)} mcg (dose única)`,
						singleDose: `${dose.toFixed(0)} mcg`,
						practicalDose: `${(dose / 100).toFixed(2)} mL`,
						details: `Dose: ${dose.toFixed(0)} mcg (${weight} kg × 1 mcg/kg)<br>Volume: ${(dose / 100).toFixed(2)} mL (100mcg/mL)<br>Vias: IV ou intranasal (mesma dose)`,
					};
				},
			},

			difenidramina: {
				name: 'DIFENIDRAMINA (Benadryl)',
				category: 'Drogas de Emergência',
				presentation: '50mg/mL',
				dose: '1-2 mg/Kg (Máx: 50mg/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '50mg/dose',
				notes: 'Contraindicado em crise asmática aguda. Pode causar excitação paradoxal',
				calculate: function (weight) {
					const doseMin = weight * 1;
					const doseMax = Math.min(weight * 2, 50);

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dose (6/6h)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 50).toFixed(2)}-${(doseMax / 50).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 1-2 mg/kg, máximo 50mg/dose)<br>Volume: ${(doseMin / 50).toFixed(2)}-${(doseMax / 50).toFixed(
							2,
						)} mL (50mg/mL)<br>Contraindicação: crise asmática aguda<br>Efeito adverso: excitação paradoxal`,
					};
				},
			},

			diazepam: {
				name: 'DIAZEPAM (Dienpax)',
				category: 'Drogas de Emergência',
				presentation: '5mg/mL',
				dose: '0,2-0,5 mg/Kg (Máx: 0,6 mg/Kg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Pode ser usado IM ou VR. Pode causar hipotensão e depressão respiratória',
				calculate: function (weight) {
					const doseMin = weight * 0.2;
					const doseMax = Math.min(weight * 0.5, weight * 0.6);

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dose (repetir conforme necessidade)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 5).toFixed(2)}-${(doseMax / 5).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,2-0,5 mg/kg)<br>Volume: ${(doseMin / 5).toFixed(2)}-${(doseMax / 5).toFixed(
							2,
						)} mL (5mg/mL)<br>Vias: IV, IM ou via retal<br>Atenção: hipotensão e depressão respiratória`,
					};
				},
			},

			enalapril: {
				name: 'ENALAPRIL (Renitec)',
				category: 'Drogas de Emergência',
				presentation: 'Comprimidos',
				dose: 'Bolus IV: 5-10 mcg/Kg/dose<br>Oral: 0,1-0,5 mg/Kg/dia (Máx: 40mg/dia)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '40mg/dia',
				notes: null,
				calculate: function (weight, route = 'iv') {
					if (route === 'iv') {
						const doseMin = weight * 5;
						const doseMax = weight * 10;

						return {
							dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mcg/dose (bolus)`,
							singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mcg`,
							practicalDose: 'Preparar diluição apropriada',
							details: `Dose IV: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mcg (${weight} kg × 5-10 mcg/kg)<br>Administração: bolus IV`,
						};
					} else {
						const doseMin = weight * 0.1;
						const doseMax = Math.min(weight * 0.5, 40);

						return {
							dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dia`,
							singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dia (dividir em 1-2 doses)`,
							practicalDose: 'Comprimidos conforme dose calculada',
							details: `Dose oral: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dia (${weight} kg × 0,1-0,5 mg/kg, máximo 40mg)<br>Dividir em 1-2 doses diárias`,
						};
					}
				},
			},

			// ============================================
			// CATEGORIA: Drogas de Emergência - F-M
			// ============================================

			epinefrinaEmerg: {
				name: 'EPINEFRINA - Emergência (Adrenalina)',
				category: 'Drogas de Emergência',
				presentation: '1:1000 (1mg/mL)',
				dose: 'EV/IO: 0,01 mg/Kg<br>ET: 0,1 mg/Kg<br>IM (anafilaxia): 0,01 mg/Kg<br>Inal (laringite): 3-5 ampolas',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: 'EV: 1mg<br>ET: 2,5mg<br>IM: 0,5mg',
				notes: 'Diluições diferentes conforme via',
				calculate: function (weight, route = 'ev') {
					let dose, concentration, volume, maxDose;

					switch (route) {
						case 'ev':
						case 'io':
							dose = weight * 0.01;
							maxDose = 1;
							concentration = 0.1; // 1:10.000 = 0,1mg/mL
							break;
						case 'et':
							dose = weight * 0.1;
							maxDose = 2.5;
							concentration = 1; // 1:1.000 = 1mg/mL
							break;
						case 'im':
							dose = weight * 0.01;
							maxDose = 0.5;
							concentration = 1; // 1:1.000 = 1mg/mL
							break;
					}

					const finalDose = Math.min(dose, maxDose);
					volume = finalDose / concentration;

					return {
						dailyDose: `${finalDose.toFixed(2)} mg (${route.toUpperCase()})`,
						singleDose: `${finalDose.toFixed(2)} mg`,
						practicalDose: `${volume.toFixed(2)} mL (${concentration === 1 ? '1:1000' : '1:10000'})`,
						details: `Via ${route.toUpperCase()}: ${finalDose.toFixed(2)} mg (${weight} kg × ${route === 'et' ? '0,1' : '0,01'} mg/kg)<br>Máximo: ${maxDose}mg<br>Volume: ${volume.toFixed(2)} mL (${
							concentration === 1 ? '1:1000 (1mg/mL)' : '1:10000 (0,1mg/mL)'
						})`,
					};
				},
			},

			etomidato: {
				name: 'ETOMIDATE (Hypnomidate)',
				category: 'Drogas de Emergência',
				presentation: '2mg/mL',
				dose: '0,2-0,4 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Indicado na IOT em politrauma. Não utilizar em choque séptico',
				calculate: function (weight) {
					const doseMin = weight * 0.2;
					const doseMax = weight * 0.4;

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (dose única para IOT)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 2).toFixed(2)}-${(doseMax / 2).toFixed(2)} mL`,
						details: `Dose IOT: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,2-0,4 mg/kg)<br>Volume: ${(doseMin / 2).toFixed(2)}-${(doseMax / 2).toFixed(
							2,
						)} mL (2mg/mL)<br>Indicação: intubação em politrauma<br>Contraindicação: choque séptico`,
					};
				},
			},

			fenitoina: {
				name: 'FENITOÍNA (Hidantal)',
				category: 'Drogas de Emergência',
				presentation: '50mg/mL',
				dose: '15-20 mg/Kg (Máx: 1500mg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '1500mg',
				notes: 'Não diluir em glicose. Vel máx: 1 mg/Kg/min',
				calculate: function (weight) {
					const doseMin = weight * 15;
					const doseMax = Math.min(weight * 20, 1500);
					const infusionTime = doseMax / weight; // minutos para infundir a 1mg/kg/min

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (dose de ataque)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 50).toFixed(1)}-${(doseMax / 50).toFixed(1)} mL`,
						details: `Dose ataque: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 15-20 mg/kg, máximo 1500mg)<br>Volume: ${(doseMin / 50).toFixed(1)}-${(doseMax / 50).toFixed(1)} mL (50mg/mL)<br>Infusão: máximo ${infusionTime.toFixed(
							0,
						)} minutos (1mg/kg/min)<br>Diluição: usar SF, não usar glicose`,
					};
				},
			},

			fenobarbital: {
				name: 'FENOBARBITAL SÓDICO (Fenocris)',
				category: 'Drogas de Emergência',
				presentation: '100mg/mL',
				dose: '15-20 mg/Kg (Máx: 800mg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '800mg',
				notes: 'Evitar administração > 30mg/min em criança',
				calculate: function (weight) {
					const doseMin = weight * 15;
					const doseMax = Math.min(weight * 20, 800);
					const infusionTime = doseMax / 30; // minutos para infundir a 30mg/min

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (dose de ataque)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 100).toFixed(1)}-${(doseMax / 100).toFixed(1)} mL`,
						details: `Dose ataque: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 15-20 mg/kg, máximo 800mg)<br>Volume: ${(doseMin / 100).toFixed(1)}-${(doseMax / 100).toFixed(1)} mL (100mg/mL)<br>Infusão: máximo ${infusionTime.toFixed(
							0,
						)} minutos (30mg/min em criança)`,
					};
				},
			},

			fentanilaEmerg: {
				name: 'FENTANILA - Bolus (Fentanil)',
				category: 'Drogas de Emergência',
				presentation: '50 mcg/mL',
				dose: '1-4 mcg/Kg (Máx: 100 mcg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '100 mcg',
				notes: 'Risco rigidez torácica: infundir lentamente',
				calculate: function (weight) {
					const doseMin = weight * 1;
					const doseMax = Math.min(weight * 4, 100);

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mcg/dose (repetir conforme necessidade)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mcg`,
						practicalDose: `${(doseMin / 50).toFixed(2)}-${(doseMax / 50).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mcg (${weight} kg × 1-4 mcg/kg, máximo 100mcg)<br>Volume: ${(doseMin / 50).toFixed(2)}-${(doseMax / 50).toFixed(
							2,
						)} mL (50mcg/mL)<br>Administração: infundir lentamente<br>Atenção: risco de rigidez torácica`,
					};
				},
			},

			flumazenil: {
				name: 'FLUMAZENIL (Lanexat)',
				category: 'Drogas de Emergência',
				presentation: '0,1mg/mL',
				dose: '0,01-0,05 mg/Kg (Máx: 0,2mg/dose, 1mg/dose total)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '0,2mg/dose, 1mg/dose total',
				notes: 'Não reverte efeito de narcóticos. Pode precipitar convulsões',
				calculate: function (weight) {
					const doseMin = weight * 0.01;
					const doseMax = Math.min(weight * 0.05, 0.2);

					return {
						dailyDose: `${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg/dose (repetir conforme necessidade, máx 1mg total)`,
						singleDose: `${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg`,
						practicalDose: `${(doseMin / 0.1).toFixed(1)}-${(doseMax / 0.1).toFixed(1)} mL`,
						details: `Dose: ${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg (${weight} kg × 0,01-0,05 mg/kg)<br>Máximo por dose: 0,2mg<br>Máximo total: 1mg<br>Volume: ${(doseMin / 0.1).toFixed(1)}-${(doseMax / 0.1).toFixed(
							1,
						)} mL (0,1mg/mL)<br>Atenção: não reverte narcóticos, risco de convulsões`,
					};
				},
			},

			furosemida: {
				name: 'FUROSEMIDA (Lasix)',
				category: 'Drogas de Emergência',
				presentation: '10mg/mL',
				dose: '0,5-6 mg/Kg/dose',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Pode causar hipocalemia e alcalose metabólica',
				calculate: function (weight) {
					const doseMin = weight * 0.5;
					const doseMax = weight * 6;

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dose (repetir conforme necessidade)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 10).toFixed(1)}-${(doseMax / 10).toFixed(1)} mL`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,5-6 mg/kg)<br>Volume: ${(doseMin / 10).toFixed(1)}-${(doseMax / 10).toFixed(1)} mL (10mg/mL)<br>Monitorização: eletrólitos (especialmente K⁺)`,
					};
				},
			},

			glicose: {
				name: 'GLICOSE',
				category: 'Drogas de Emergência',
				presentation: '10% (0,1g/mL)<br>25% (0,25g/mL)',
				dose: '0,5-1,0 g/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: '10%: 5-10 mL/Kg<br>25%: 2-4 mL/Kg',
				calculate: function (weight, concentration = 10) {
					const gramsMin = weight * 0.5;
					const gramsMax = weight * 1.0;
					let volumeMin, volumeMax;

					if (concentration === 10) {
						volumeMin = gramsMin * 10; // 10mL/g para 10%
						volumeMax = gramsMax * 10;
					} else {
						volumeMin = gramsMin * 4; // 4mL/g para 25%
						volumeMax = gramsMax * 4;
					}

					return {
						dailyDose: `${gramsMin.toFixed(1)}-${gramsMax.toFixed(1)} g`,
						singleDose: `${gramsMin.toFixed(1)}-${gramsMax.toFixed(1)} g`,
						practicalDose: `${volumeMin.toFixed(0)}-${volumeMax.toFixed(0)} mL (${concentration}%)`,
						details: `Dose: ${gramsMin.toFixed(1)}-${gramsMax.toFixed(1)} g (${weight} kg × 0,5-1,0 g/kg)<br>Volume ${concentration}%: ${volumeMin.toFixed(0)}-${volumeMax.toFixed(0)} mL<br>Administração: bolus IV`,
					};
				},
			},

			gluconatoCalcio: {
				name: 'GLUCONATO DE CÁLCIO',
				category: 'Drogas de Emergência',
				presentation: '10% (100mg/mL)',
				dose: '60-100 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Não administrar IM ou SC. Vel máx: 100mg/min. Conc máx: 50mg/mL',
				calculate: function (weight) {
					const doseMin = weight * 60;
					const doseMax = weight * 100;
					const elementalCalciumMin = doseMin * 0.09; // 9% de cálcio elementar no gluconato
					const elementalCalciumMax = doseMax * 0.09;
					const infusionTime = doseMax / 100; // minutos para infundir a 100mg/min

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${elementalCalciumMin.toFixed(0)}-${elementalCalciumMax.toFixed(0)} mg Ca²⁺)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 100).toFixed(1)}-${(doseMax / 100).toFixed(1)} mL`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 60-100 mg/kg)<br>Cálcio elementar: ${elementalCalciumMin.toFixed(0)}-${elementalCalciumMax.toFixed(0)} mg (9% da dose)<br>Volume: ${(doseMin / 100).toFixed(1)}-${(
							doseMax / 100
						).toFixed(1)} mL (100mg/mL)<br>Infusão: máximo ${infusionTime.toFixed(0)} minutos (100mg/min)<br>Contraindicação: IM, SC`,
					};
				},
			},

			haloperidol: {
				name: 'HALOPERIDOL - Intramuscular (Haldol)',
				category: 'Drogas de Emergência',
				presentation: '5mg/mL',
				dose: '6-12 anos: 1-3 mg/dose<br>>12 anos: 5 mg/dose<br>Máx: 0,15 mg/Kg/dia',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '0,15 mg/Kg/dia',
				notes: 'Pode ser repetido a cada 4-8 hor				calculate: function (weight, ageYears =as. Não usar por via endovenosa',
				calculate: function (weight, ageMonths = null) {
					const ageYears = Number.isFinite(ageMonths) ? ageMonths / 12 : null;
					let doseMin, doseMax;
					const dailyMax = weight * 0.15;

					if (ageYears >= 6 && ageYears <= 12) {
						doseMin = 1;
						doseMax = 3;
					} else if (ageYears > 12) {
						doseMin = 5;
						doseMax = 5;
					} else {
						return {
							dailyDose: 'Não recomendado < 6 anos',
							singleDose: 'NÃO RECOMENDADO',
							practicalDose: 'Contraindicado',
							details: "<span class='text-red-600 font-medium'>Não recomendado para menores de 6 anos</span>",
						};
					}

					const actualMax = Math.min(doseMax, dailyMax);

					return {
						dailyDose: `${doseMin}-${actualMax} mg/dose (máx ${dailyMax.toFixed(1)} mg/dia)`,
						singleDose: `${doseMin}-${actualMax} mg`,
						practicalDose: `${(doseMin / 5).toFixed(1)}-${(actualMax / 5).toFixed(1)} mL`,
						details: `Faixa etária: ${ageYears} anos<br>Dose: ${doseMin}-${actualMax} mg/dose<br>Máximo diário: ${dailyMax.toFixed(1)} mg (${weight} kg × 0,15 mg/kg)<br>Volume: ${(doseMin / 5).toFixed(1)}-${(actualMax / 5).toFixed(
							1,
						)} mL (5mg/mL)<br>Intervalo: 4-8 horas<br>Via: IM apenas`,
					};
				},
			},

			hidralazina: {
				name: 'HIDRALAZINA (Apresolina)',
				category: 'Drogas de Emergência',
				presentation: '20mg/mL',
				dose: '0,2-0,6 mg/Kg (Máx: 25mg/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '25mg/dose',
				notes: 'Taquicardia reflexa. Uso com cuidado em pacientes com doença renal ou cardíaca grave',
				calculate: function (weight) {
					const doseMin = weight * 0.2;
					const doseMax = Math.min(weight * 0.6, 25);

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dose (repetir conforme necessidade)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 20).toFixed(2)}-${(doseMax / 20).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,2-0,6 mg/kg, máximo 25mg/dose)<br>Volume: ${(doseMin / 20).toFixed(2)}-${(doseMax / 20).toFixed(
							2,
						)} mL (20mg/mL)<br>Efeito adverso: taquicardia reflexa<br>Cuidado: doença renal/cardíaca grave`,
					};
				},
			},

			hidratoCloral: {
				name: 'HIDRATO DE CLORAL',
				category: 'Drogas de Emergência',
				presentation: 'Xarope 10% (500mg/5mL)',
				dose: '25-100 mg/Kg (Máx: 2g/dose)',
				practicalRule: null,
				renalAdjustment: 'Contraindicado em doença renal ou hepática',
				maxDose: '2g/dose',
				notes: 'Depressão de SNC. Contraindicado em pacientes com doença renal ou hepática',
				calculate: function (weight) {
					const doseMin = weight * 25;
					const doseMax = Math.min(weight * 100, 2000);
					const volumeMin = (doseMin / 100) * 5; // 100mg/mL (10% = 100mg/mL)
					const volumeMax = (doseMax / 100) * 5;

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dose`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${volumeMin.toFixed(1)}-${volumeMax.toFixed(1)} mL (xarope 10%)`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 25-100 mg/kg, máximo 2g)<br>Volume: ${volumeMin.toFixed(1)}-${volumeMax.toFixed(
							1,
						)} mL (xarope 10% = 100mg/mL)<br>Vias: oral ou retal<br>Contraindicação: doença renal/hepática<br>Efeito: depressão SNC`,
					};
				},
			},

			hidrocortisona: {
				name: 'HIDROCORTISONA (Solu-Cortef)',
				category: 'Drogas de Emergência',
				presentation: '500mg/4mL (125mg/mL)',
				dose: '4-8 mg/Kg (Máx: 500mg/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '500mg/dose',
				notes: 'Crise adrenal. Dose ataque: 50mg/m²',
				calculate: function (weight, bsa = null) {
					const doseMin = weight * 4;
					const doseMax = Math.min(weight * 8, 500);

					let bsaDose = '';
					if (bsa) {
						const bsaDoseValue = bsa * 50;
						bsaDose = `<br>Dose por superfície: ${bsaDoseValue.toFixed(0)} mg (${bsa.toFixed(2)} m² × 50 mg/m²)`;
					}

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dose`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 125).toFixed(2)}-${(doseMax / 125).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 4-8 mg/kg, máximo 500mg)${bsaDose}<br>Volume: ${(doseMin / 125).toFixed(2)}-${(doseMax / 125).toFixed(2)} mL (125mg/mL)<br>Indicação: crise adrenal`,
					};
				},
			},

			ketaminaEmerg: {
				name: 'KETAMINA - Bolus (Ketamin S)',
				category: 'Drogas de Emergência',
				presentation: '50mg/mL',
				dose: '0,5-2 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Associar atropina e midazolam. Vel máx: 0,5 mg/Kg/min. Conc máx: 2mg/mL',
				calculate: function (weight) {
					const doseMin = weight * 0.5;
					const doseMax = weight * 2;
					const infusionTime = doseMax / (weight * 0.5); // minutos para infundir a 0,5mg/kg/min

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dose`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 50).toFixed(2)}-${(doseMax / 50).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,5-2 mg/kg)<br>Volume: ${(doseMin / 50).toFixed(2)}-${(doseMax / 50).toFixed(2)} mL (50mg/mL)<br>Infusão: máximo ${infusionTime.toFixed(
							0,
						)} minutos (0,5mg/kg/min)<br>Associar: atropina e midazolam`,
					};
				},
			},

			lidocainaEmerg: {
				name: 'LIDOCAÍNA - Bolus (Xylestesin)',
				category: 'Drogas de Emergência',
				presentation: '2% sem vasoconstritor (20mg/mL)',
				dose: '1-2 mg/Kg (Máx: 100mg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '100mg',
				notes: 'Indicação IOT em pacientes com risco de aumento PIC',
				calculate: function (weight) {
					const doseMin = weight * 1;
					const doseMax = Math.min(weight * 2, 100);

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dose`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 20).toFixed(2)}-${(doseMax / 20).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 1-2 mg/kg, máximo 100mg)<br>Volume: ${(doseMin / 20).toFixed(2)}-${(doseMax / 20).toFixed(
							2,
						)} mL (20mg/mL)<br>Indicação: IOT em risco de aumento PIC<br>Formulação: sem vasoconstritor`,
					};
				},
			},

			manitol: {
				name: 'MANITOL',
				category: 'Drogas de Emergência',
				presentation: '20% (0,2g/mL)',
				dose: '0,5-1,0 g/Kg',
				practicalRule: null,
				renalAdjustment: 'Contraindicado em desidratação e doença renal grave',
				maxDose: null,
				notes: 'Infusão lenta: 20-30 minutos',
				calculate: function (weight) {
					const gramsMin = weight * 0.5;
					const gramsMax = weight * 1.0;
					const volumeMin = gramsMin * 5; // 20% = 0,2g/mL = 5mL/g
					const volumeMax = gramsMax * 5;

					return {
						dailyDose: `${gramsMin.toFixed(1)}-${gramsMax.toFixed(1)} g`,
						singleDose: `${gramsMin.toFixed(1)}-${gramsMax.toFixed(1)} g`,
						practicalDose: `${volumeMin.toFixed(0)}-${volumeMax.toFixed(0)} mL`,
						details: `Dose: ${gramsMin.toFixed(1)}-${gramsMax.toFixed(1)} g (${weight} kg × 0,5-1,0 g/kg)<br>Volume 20%: ${volumeMin.toFixed(0)}-${volumeMax.toFixed(0)} mL (0,2g/mL)<br>Infusão: 20-30 minutos<br>Contraindicação: desidratação, doença renal grave`,
					};
				},
			},

			metilprednisolona: {
				name: 'METILPREDNISOLONA (Solumedrol)',
				category: 'Drogas de Emergência',
				presentation: '125mg/2mL (62,5mg/mL)',
				dose: '0,5-1 mg/Kg (Máx: 250mg/dose)<br>Asma ataque: 2 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '250mg/dose',
				notes: 'Asma dose ataque: 2 mg/Kg',
				calculate: function (weight, indication = 'geral') {
					let doseMin, doseMax;

					if (indication === 'asma') {
						doseMin = weight * 2;
						doseMax = weight * 2;
					} else {
						doseMin = weight * 0.5;
						doseMax = Math.min(weight * 1, 250);
					}

					const actualMax = Math.min(doseMax, 250);

					return {
						dailyDose: `${doseMin.toFixed(1)}-${actualMax.toFixed(1)} mg/dose`,
						singleDose: `${doseMin.toFixed(1)}-${actualMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 62.5).toFixed(2)}-${(actualMax / 62.5).toFixed(2)} mL`,
						details: `Indicação: ${indication === 'asma' ? 'asma (ataque)' : 'geral'}<br>Dose: ${doseMin.toFixed(1)}-${actualMax.toFixed(1)} mg (${weight} kg × ${indication === 'asma' ? '2' : '0,5-1'} mg/kg, máximo 250mg)<br>Volume: ${(doseMin / 62.5).toFixed(
							2,
						)}-${(actualMax / 62.5).toFixed(2)} mL (62,5mg/mL)`,
					};
				},
			},

			// ============================================
			// CATEGORIA: Drogas de Emergência - N-Z
			// ============================================
			midazolamEmerg: {
				name: 'MIDAZOLAM - Bolus (Dormonid)',
				category: 'Drogas de Emergência',
				presentation: '5mg/mL',
				dose: '0,1-0,4 mg/Kg (Máx: 10mg/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '10mg/dose',
				notes: 'Também IM ou intranasal. Contraindicado em choque e glaucoma. Antídoto: Flumazenil',
				calculate: function (weight) {
					const doseMin = weight * 0.1;
					const doseMax = Math.min(weight * 0.4, 10);

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dose (repetir conforme necessidade)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 5).toFixed(2)}-${(doseMax / 5).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,1-0,4 mg/kg, máximo 10mg/dose)<br>Volume: ${(doseMin / 5).toFixed(2)}-${(doseMax / 5).toFixed(
							2,
						)} mL (5mg/mL)<br>Vias: IV, IM ou intranasal<br>Contraindicação: choque, glaucoma<br>Antídoto: Flumazenil`,
					};
				},
			},

			morfinaEmerg: {
				name: 'MORFINA - Bolus (Dimorf)',
				category: 'Drogas de Emergência',
				presentation: '1mg/mL',
				dose: '0,1-0,2 mg/Kg (Máx: 15mg/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '15mg/dose',
				notes: 'Depressão respiratória e SNC. Secreção histamina. Antídoto: Naloxona',
				calculate: function (weight) {
					const doseMin = weight * 0.1;
					const doseMax = Math.min(weight * 0.2, 15);

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg/dose (repetir conforme necessidade)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mL`,
						details: `Dose: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,1-0,2 mg/kg, máximo 15mg/dose)<br>Volume: ${doseMin.toFixed(1)}-${doseMax.toFixed(
							1,
						)} mL (1mg/mL)<br>Atenção: depressão respiratória, secreção de histamina<br>Antídoto: Naloxona`,
					};
				},
			},

			morfinaOral: {
				name: 'MORFINA - Uso Oral (Dimorf)',
				category: 'Drogas de Emergência',
				presentation: 'Comprimidos: 10mg, 30mg',
				dose: '3-6 meses: 0,1 mg/Kg/dose<br>>6 meses: 0,2-0,5 mg/Kg/dose<br>Máx: 15-20mg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '15-20mg',
				notes: 'Intervalo de doses 3/3 ou 4/4 horas',
				calculate: function (weight, ageMonths = 12) {
					let dose;

					if (ageMonths >= 3 && ageMonths <= 6) {
						dose = weight * 0.1;
					} else if (ageMonths > 6) {
						const doseMin = weight * 0.2;
						const doseMax = Math.min(weight * 0.5, 20);
						dose = `${doseMin.toFixed(1)}-${doseMax.toFixed(1)}`;
					} else {
						return {
							dailyDose: 'Não recomendado < 3 meses',
							singleDose: 'NÃO RECOMENDADO',
							practicalDose: 'Contraindicado',
							details: "<span class='text-red-600 font-medium'>Não recomendado para menores de 3 meses</span>",
						};
					}

					return {
						dailyDose: typeof dose === 'string' ? `${dose} mg/dose` : `${dose.toFixed(1)} mg/dose`,
						singleDose: typeof dose === 'string' ? `${dose} mg` : `${dose.toFixed(1)} mg`,
						practicalDose: 'Comprimidos conforme dose calculada',
						details: `Idade: ${ageMonths} meses<br>Dose: ${typeof dose === 'string' ? dose : dose.toFixed(1)} mg (${weight} kg × ${ageMonths <= 6 ? '0,1' : '0,2-0,5'} mg/kg)<br>Intervalo: 3-4 horas<br>Máximo: ${ageMonths <= 6 ? '15' : '20'}mg`,
					};
				},
			},

			naloxona: {
				name: 'NALOXONA (Narcan)',
				category: 'Drogas de Emergência',
				presentation: '0,4mg/mL',
				dose: '0,01-0,1 mg/Kg (Máx: 2mg)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '2mg',
				notes: 'Pode ser usado EV, SC, IM, ET',
				calculate: function (weight) {
					const doseMin = weight * 0.01;
					const doseMax = Math.min(weight * 0.1, 2);

					return {
						dailyDose: `${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg/dose (repetir conforme necessidade)`,
						singleDose: `${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg`,
						practicalDose: `${(doseMin / 0.4).toFixed(2)}-${(doseMax / 0.4).toFixed(2)} mL`,
						details: `Dose: ${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg (${weight} kg × 0,01-0,1 mg/kg, máximo 2mg)<br>Volume: ${(doseMin / 0.4).toFixed(2)}-${(doseMax / 0.4).toFixed(
							2,
						)} mL (0,4mg/mL)<br>Vias: EV, SC, IM, ET (endotraqueal)<br>Indicação: reversão de opioides`,
					};
				},
			},

			oxicodona: {
				name: 'OXICODONA - Uso Oral (Oxycontin)',
				category: 'Drogas de Emergência',
				presentation: 'Comprimidos: 10mg, 20mg, 40mg',
				dose: '0,05-0,15 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Devem ser deglutidos inteiros. Não podem ser fracionados ou triturados',
				calculate: function (weight) {
					const doseMin = weight * 0.05;
					const doseMax = weight * 0.15;

					// Encontrar o comprimido mais adequado
					let practicalDose = '';
					if (doseMax >= 40) {
						practicalDose = 'Comp 40mg: 1 comp';
					} else if (doseMax >= 20) {
						practicalDose = 'Comp 20mg: 1 comp';
					} else if (doseMax >= 10) {
						practicalDose = 'Comp 10mg: 1 comp';
					} else {
						practicalDose = 'Dose inferior ao comprimido disponível - considerar outra medicação';
					}

					return {
						dailyDose: `${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg/dose`,
						singleDose: `${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg`,
						practicalDose: practicalDose,
						details: `Dose: ${doseMin.toFixed(2)}-${doseMax.toFixed(2)} mg (${weight} kg × 0,05-0,15 mg/kg)<br>Administração: deglutir comprimido inteiro<br>Não fracionar ou triturar`,
					};
				},
			},

			propofolEmerg: {
				name: 'PROPOFOL - Bolus (Diprivan)',
				category: 'Drogas de Emergência',
				presentation: '10mg/mL',
				dose: '1-3 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Insolúvel em água. Não usar com hipotensão ou choque',
				calculate: function (weight) {
					const doseMin = weight * 1;
					const doseMax = weight * 3;

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dose (para indução)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 10).toFixed(1)}-${(doseMax / 10).toFixed(1)} mL`,
						details: `Dose indução: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 1-3 mg/kg)<br>Volume: ${(doseMin / 10).toFixed(1)}-${(doseMax / 10).toFixed(1)} mL (10mg/mL)<br>Contraindicação: hipotensão, choque`,
					};
				},
			},

			propranolol: {
				name: 'PROPRANOLOL - Uso Oral (Inderal)',
				category: 'Drogas de Emergência',
				presentation: 'Comprimidos: 10mg, 40mg, 80mg',
				dose: '1-3 mg/Kg/dose (Máx: 60mg/dia)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '60mg/dia',
				notes: 'Contraindicado em asma, ICC e bloqueio cardíaco',
				calculate: function (weight) {
					const doseMin = weight * 1;
					const doseMax = Math.min(weight * 3, 60);

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dose (dividir em 2-3 doses/dia)`,
						singleDose: `${(doseMin / 2).toFixed(0)}-${(doseMax / 3).toFixed(0)} mg por tomada`,
						practicalDose: 'Comprimidos conforme dose calculada',
						details: `Dose total diária: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 1-3 mg/kg/dia, máximo 60mg)<br>Dividir em 2-3 doses ao dia<br>Contraindicação: asma, ICC, bloqueio cardíaco`,
					};
				},
			},

			rocuronioEmerg: {
				name: 'ROCURÔNIO - Bolus (Esmeron)',
				category: 'Drogas de Emergência',
				presentation: '10mg/mL',
				dose: '0,6-1,2 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Associar sedação. Pode causar hipotensão ou hipertensão, arritmia e broncoespasmo',
				calculate: function (weight) {
					const doseMin = weight * 0.6;
					const doseMax = weight * 1.2;

					return {
						dailyDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (dose para IOT)`,
						singleDose: `${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg`,
						practicalDose: `${(doseMin / 10).toFixed(2)}-${(doseMax / 10).toFixed(2)} mL`,
						details: `Dose IOT: ${doseMin.toFixed(1)}-${doseMax.toFixed(1)} mg (${weight} kg × 0,6-1,2 mg/kg)<br>Volume: ${(doseMin / 10).toFixed(2)}-${(doseMax / 10).toFixed(
							2,
						)} mL (10mg/mL)<br>Obrigatório: associar sedação<br>Efeitos adversos: alterações hemodinâmicas, broncoespasmo`,
					};
				},
			},

			salbutamolInal: {
				name: 'SALBUTAMOL - Inalatório (Aerolin)',
				category: 'Drogas de Emergência',
				presentation: 'Spray: 100mcg/dose<br>Nebulização: 5mg/mL<br>Nebules: 2,5mg/flaconete',
				dose: 'Nebulização: 0,15 mg/Kg (mínimo: 2,5mg) a cada 20 min, 3 vezes<br>Aerosol: 4-10 borrifadas (mínimo 4) a cada 20 min, 3 vezes',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: null,
				calculate: function (weight) {
					const nebDoseMg = weight * 0.15;
					const nebDoseFinal = Math.max(nebDoseMg, 2.5);
					const nebVolume = nebDoseFinal / 5; // 5mg/mL

					let puffs;
					if (weight < 10) puffs = '4 borrifadas';
					else if (weight < 20) puffs = '6 borrifadas';
					else if (weight < 30) puffs = '8 borrifadas';
					else puffs = '10 borrifadas';

					return {
						dailyDose: 'Doses repetidas conforme crise',
						singleDose: `Nebulização: ${nebDoseFinal.toFixed(1)} mg<br>Aerosol: ${puffs}`,
						practicalDose: `Nebulização: ${nebVolume.toFixed(1)} mL da solução 5mg/mL<br>Aerosol: ${puffs}`,
						details: `Peso: ${weight} kg<br><br>Nebulização:<br>• Dose: ${nebDoseFinal.toFixed(1)} mg (${weight} kg × 0,15 mg/kg, mínimo 2,5mg)<br>• Volume: ${nebVolume.toFixed(
							1,
						)} mL (solução 5mg/mL)<br>• Frequência: a cada 20 minutos, máximo 3 doses<br><br>Aerosol (spray):<br>• ${puffs} (100mcg/borrifada)<br>• Frequência: a cada 20 minutos, máximo 3 vezes`,
					};
				},
			},

			succinilcolina: {
				name: 'SUCCINILCOLINA (Succinil-Colin)',
				category: 'Drogas de Emergência',
				presentation: '100mg',
				dose: '1-2 mg/Kg (Máx: 150mg/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '150mg/dose',
				notes: 'Realizar pré-tratamento com atropina. Aumento PIC. Não utilizar em politrauma, queimadura e distrofia muscular',
				calculate: function (weight) {
					const doseMin = weight * 1;
					const doseMax = Math.min(weight * 2, 150);

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (dose para IOT)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: 'Preparar diluição apropriada',
						details: `Dose IOT: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 1-2 mg/kg, máximo 150mg)<br>Pré-tratamento: atropina obrigatória<br>Aumenta: pressão intracraniana<br>Contraindicação: politrauma, queimadura, distrofia muscular`,
					};
				},
			},

			sugamadex: {
				name: 'SUGAMADEX (Bridion)',
				category: 'Drogas de Emergência',
				presentation: '100mg/mL',
				dose: '2-16 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Reversor do Rocurônio',
				calculate: function (weight) {
					const doseMin = weight * 2;
					const doseMax = weight * 16;

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (dose única)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 100).toFixed(1)}-${(doseMax / 100).toFixed(1)} mL`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 2-16 mg/kg)<br>Volume: ${(doseMin / 100).toFixed(1)}-${(doseMax / 100).toFixed(1)} mL (100mg/mL)<br>Indicação: reversão do bloqueio neuromuscular por rocurônio`,
					};
				},
			},

			sulfatoMagnesio: {
				name: 'SULFATO DE MAGNÉSIO',
				category: 'Drogas de Emergência',
				presentation: '50% (500mg/mL)',
				dose: '25-50 mg/Kg (Máx: 2g/dose)',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '2g/dose',
				notes: 'Risco bloqueio cardíaco completo, hipotensão e depressão respiratória. Antídoto: gluconato cálcio',
				calculate: function (weight) {
					const doseMin = weight * 25;
					const doseMax = Math.min(weight * 50, 2000);

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dose`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 500).toFixed(1)}-${(doseMax / 500).toFixed(1)} mL`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 25-50 mg/kg, máximo 2g)<br>Volume: ${(doseMin / 500).toFixed(1)}-${(doseMax / 500).toFixed(
							1,
						)} mL (500mg/mL)<br>Riscos: bloqueio cardíaco, hipotensão, depressão respiratória<br>Antídoto: gluconato de cálcio`,
					};
				},
			},

			terbutalinaEmerg: {
				name: 'TERBUTALINA - Bolus (Terbutil)',
				category: 'Drogas de Emergência',
				presentation: '0,5mg/mL (500 mcg/mL)',
				dose: '10 mcg/Kg (Máx: 500 mcg) em 10 min',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: '500 mcg',
				notes: 'Pode causar agitação, arritmias e palpitação',
				calculate: function (weight) {
					const dose = Math.min(weight * 10, 500);

					return {
						dailyDose: `${dose.toFixed(0)} mcg (infundir em 10 minutos)`,
						singleDose: `${dose.toFixed(0)} mcg`,
						practicalDose: `${(dose / 500).toFixed(2)} mL`,
						details: `Dose: ${dose.toFixed(0)} mcg (${weight} kg × 10 mcg/kg, máximo 500mcg)<br>Volume: ${(dose / 500).toFixed(2)} mL (500mcg/mL)<br>Administração: infundir em 10 minutos<br>Efeitos adversos: agitação, arritmias, palpitação`,
					};
				},
			},

			tiopentalEmerg: {
				name: 'TIOPENTAL - Bolus (Thiopentax)',
				category: 'Drogas de Emergência',
				presentation: '1,0g pó para diluição',
				dose: '3-5 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Instabilidade hemodinâmica e respiratória',
				calculate: function (weight) {
					const doseMin = weight * 3;
					const doseMax = weight * 5;

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (dose para IOT)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: 'Preparar diluição apropriada',
						details: `Dose IOT: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 3-5 mg/kg)<br>Apresentação: pó 1g para diluição<br>Atenção: instabilidade hemodinâmica e respiratória`,
					};
				},
			},

			tramadol: {
				name: 'TRAMADOL (Tramal)',
				category: 'Drogas de Emergência',
				presentation: '50mg/mL',
				dose: '1-2 mg/Kg',
				practicalRule: null,
				renalAdjustment: null,
				maxDose: null,
				notes: 'Boa tolerância hemodinâmica e respiratória',
				calculate: function (weight) {
					const doseMin = weight * 1;
					const doseMax = weight * 2;

					return {
						dailyDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg/dose (6-8/8h)`,
						singleDose: `${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg`,
						practicalDose: `${(doseMin / 50).toFixed(1)}-${(doseMax / 50).toFixed(1)} mL`,
						details: `Dose: ${doseMin.toFixed(0)}-${doseMax.toFixed(0)} mg (${weight} kg × 1-2 mg/kg)<br>Volume: ${(doseMin / 50).toFixed(1)}-${(doseMax / 50).toFixed(
							1,
						)} mL (50mg/mL)<br>Frequência: a cada 6-8 horas<br>Vantagem: boa tolerância hemodinâmica e respiratória`,
					};
				},
			},
		},
	};

	// ============================================
	// FORMATADOR: remove zeros finais (2.00 -> 2 | 1.20 -> 1.2)
	// ============================================
	function fmt(n, decimals = 2) {
		const num = Number(n);
		if (!isFinite(num)) return '—';
		return num.toFixed(decimals).replace(/\.?0+$/, '');
	}

	// ============================================
	// FUNÇÕES AUXILIARES
	// ============================================

	// Função auxiliar para obter todas as categorias
	function getFarmacoCategorias() {
		return Object.keys(farmacos);
	}

	// Função auxiliar para obter fármacos por categoria
	function getFarmacosByCategoria(categoria) {
		return farmacos[categoria] || {};
	}

	// Função auxiliar para buscar fármaco por nome em todas as categorias
	function findFarmacoByName(nome) {
		nome = nome.toLowerCase();

		for (const categoria in farmacos) {
			for (const key in farmacos[categoria]) {
				const farmaco = farmacos[categoria][key];
				if (farmaco.name.toLowerCase().includes(nome)) {
					return {
						categoria: categoria,
						key: key,
						farmaco: farmaco,
					};
				}
			}
		}

		return null;
	}

	// ============================================
	// FUNÇÕES DE FORMATAÇÃO DE TEXTO
	// ============================================

	// Copiar prescrição
	function stripHtml(s) {
		return String(s ?? '')
			.replace(/<[^>]*>/g, '')
			.trim();
	}

	function normalizeSpaces(s) {
		return String(s ?? '')
			.replace(/[ \t]+\n/g, '\n')
			.replace(/\n{3,}/g, '\n\n')
			.trim();
	}

	// tenta pegar um número "dose" do calculate
	function firstNumberFromCalc(calc, preferredUnit = null) {
		const practical = stripHtml(calc?.practicalDose);
		const single = stripHtml(calc?.singleDose);
		const details = stripHtml(calc?.details);

		const text = `${practical} ${single} ${details}`.toLowerCase();

		// Se você quer volume, tente pegar "X mL" antes
		if (preferredUnit === 'mL') {
			const m = text.match(/(\d+(?:[.,]\d+)?)\s*m[l]/);
			if (m) return m[1].replace(',', '.');
		}

		// Se você quer gotas
		if (preferredUnit === 'gts') {
			const m = text.match(/(\d+(?:[.,]\d+)?)\s*(gts|gotas|gt)\b/);
			if (m) return m[1].replace(',', '.');
		}

		// Se você quer jatos
		if (preferredUnit === 'jato(s)') {
			const m = text.match(/(\d+(?:[.,]\d+)?)\s*jato/);
			if (m) return m[1].replace(',', '.');
		}

		// Fallback: primeiro número que aparecer
		const m = text.match(/(\d+(?:[.,]\d+)?)/);
		return m ? m[1].replace(',', '.') : null;
	}

	// tenta montar "Nome + dose" a partir de presentation
	function inferDrugLine(item) {
		const pres = stripHtml(item?.presentation);
		const name = stripHtml(item?.name);

		// pega "50 mg/5 mL" / "20mg" etc.
		const matchRatio = pres.match(/(\d+(?:[.,]\d+)?)\s*mg\s*\/\s*(\d+(?:[.,]\d+)?)\s*m[lL]/i);
		if (matchRatio) {
			const mg = matchRatio[1].replace(',', '.');
			const ml = matchRatio[2].replace(',', '.');
			return `${name} ${mg} mg/${ml} mL`;
		}

		const matchMg = pres.match(/(\d+(?:[.,]\d+)?)\s*mg/i);
		if (matchMg) {
			const mg = matchMg[1].replace(',', '.');
			return `${name} ${mg} mg`;
		}

		// se não achar mg, devolve o nome
		return name || 'Fármaco';
	}

	function cleanPosologyText(s) {
		let t = stripHtml(s);

		// normalizações comuns
		t = t.replace(/\bhs\b/gi, 'h'); // 12/12hs -> 12/12h
		t = t.replace(/\bml\b/gi, 'mL'); // ml -> mL
		t = t.replace(/\bgts\b/gi, 'gts'); // ok
		t = t.replace(/\s+/g, ' ').trim(); // espaços

		// remover espaços antes de pontuação
		t = t.replace(/\s+\)/g, ')').replace(/\(\s+/g, '(');

		return t;
	}

	function extractDurationHint(item, calc) {
		// se já estiver escrito no practicalDose, não precisa
		const sources = [stripHtml(calc?.practicalDose), stripHtml(calc?.details), stripHtml(item?.notes), stripHtml(item?.dose)];

		const joined = sources.filter(Boolean).join(' ').toLowerCase();

		// por 5 dias / por 7 dias / por 2 semanas / por 1 mês
		const m = joined.match(/\bpor\s+(\d+)\s*(dia|dias|semana|semanas|m[eê]s|meses)\b/i);
		if (!m) return '';

		// retorna com formatação padrão
		return `por ${m[1]} ${m[2]}`;
	}

	function hasDuration(text) {
		return /\bpor\s+\d+\s*(dia|dias|semana|semanas|m[eê]s|meses)\b/i.test(text);
	}

	// ============================================
	// FUNÇÕES DE CONSTRUÇÃO DE PRESCRIÇÃO
	// ============================================

	function buildPrescriptionSimple(item, ctx) {
		if (!item) return null;

		const rx = item.rxDefault || {};

		let calc = null;
		if (typeof item.calculate === 'function') {
			calc = item.calculate(ctx?.weight, ctx?.ageMonths);
		}

		const drugLine = (rx.drugLine && rx.drugLine.trim()) || inferDrugLine(item);

		// ✅ caminho curto: usa o practicalDose como posologia principal
		if (calc?.practicalDose) {
			const base = cleanPosologyText(calc.practicalDose);
			const dur = extractDurationHint(item, calc);

			let line2 = `Tomar ${base}`;
			if (dur && !hasDuration(base)) line2 += ` ${dur}`;

			// notas extras opcionais
			if (rx.notes) line2 += `. ${stripHtml(rx.notes)}`;

			// garante ponto final
			if (!/[.!?]$/.test(line2)) line2 += '.';

			return normalizeSpaces(`${drugLine}\n${line2}`);
		}

		// fallback: seu modelo antigo (quando não tem calculate)
		let doseValue = rx.doseValue || '1';
		const unit = rx.unit || 'cp(s)';
		const freq = rx.freq || '';
		const duration = rx.duration || '';
		const notes = rx.notes || '';

		const template = rx.instruction || 'Tomar {dose} {unit}' + (freq ? ' de {freq}' : '') + (duration ? ' {duration}' : '') + (notes ? '. {notes}' : '.');

		const line2 = template
			.replaceAll('{dose}', String(doseValue).trim())
			.replaceAll('{unit}', String(unit).trim())
			.replaceAll('{freq}', String(freq).trim())
			.replaceAll('{duration}', String(duration).trim())
			.replaceAll('{notes}', String(notes).trim())
			.replace(/\s+/g, ' ')
			.replace(/\s+\./g, '.')
			.trim();

		return normalizeSpaces(`${drugLine}\n${line2}`);
	}

	function buildRxText(item, ctx) {
		// 1) se o calculate já entrega rxText, usa e acabou
		const calc = item.calculate?.(ctx.weight, ctx.ageMonths);
		if (calc?.rxText) return normalizeSpaces(stripHtml(calc.rxText));

		// 2) se você ainda usa practicalDose, só monta 2 linhas e pronto
		if (calc?.practicalDose) {
			const drugLine = (item.rxDefault?.drugLine || `${item.name || 'Fármaco'} ${stripHtml(item.presentation || '')}`).trim();
			const pos = normalizeSpaces(stripHtml(calc.practicalDose));
			return normalizeSpaces(`${drugLine}\nTomar ${pos}.`);
		}

		// 3) fallback: algum template fixo do rxDefault (sem inferência)
		const rx = item.rxDefault || {};
		if (rx.copy) return normalizeSpaces(rx.copy);

		return '';
	}

	// ============================================
	// CLIPBOARD
	// ============================================

	async function copyToClipboard(text) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.setAttribute('readonly', '');
			ta.style.position = 'fixed';
			ta.style.left = '-9999px';
			document.body.appendChild(ta);
			ta.select();
			const ok = document.execCommand('copy');
			document.body.removeChild(ta);
			return ok;
		}
	}

	function getFarmacoByPath(farmacos, path) {
		return path.split('.').reduce((acc, key) => (acc ? acc[key] : null), farmacos);
	}

	// ============================================
	// VARIÁVEL GLOBAL PARA RX TEXT
	// ============================================
	let currentRxText = '';

	// ============================================
	// EXPÕE API GLOBAL
	// ============================================
	window.farmacosData = {
		farmacos: farmacos,
		getCategorias: getFarmacoCategorias,
		getByCategoria: getFarmacosByCategoria,
		findByName: findFarmacoByName,
	};

	// ============================================
	// EVENT LISTENERS
	// ============================================
	document.addEventListener('DOMContentLoaded', () => {
		// ============================================
		// LISTENER 1: Botão Copiar Rx (primeira implementação)
		// ============================================
		const btn = document.getElementById('btnCopiarRx');
		if (btn) {
			btn.addEventListener('click', async () => {
				const select = document.getElementById('selectFarmaco');
				if (!select) return;

				const path = select.value;

				const pesoEl = document.getElementById('inputPeso');
				const idadeEl = document.getElementById('inputIdadeMeses');

				const weight = pesoEl ? Number(pesoEl.value) : NaN;
				const ageMonths = idadeEl && idadeEl.value ? Number(idadeEl.value) : null;

				const farmacos = window.farmacosData?.farmacos;
				if (!farmacos) return;

				const item = path.split('.').reduce((acc, k) => (acc ? acc[k] : null), farmacos);
				if (!item) return;

				const rxText = buildPrescriptionSimple(item, { weight, ageMonths });
				const statusEl = document.getElementById('copyStatus');

				if (!rxText) {
					if (statusEl) statusEl.textContent = 'Sem prescrição para este item.';
					return;
				}

				const ok = await copyToClipboard(rxText);
				if (statusEl) {
					statusEl.textContent = ok ? 'Copiado ✅' : 'Falha ao copiar ❌';
					setTimeout(() => (statusEl.textContent = ''), 1500);
				}
			});
		}

		// ============================================
		// LISTENER 2: Botões Calcular e Copiar (segunda implementação)
		// ============================================
		const btnCalc = document.getElementById('btnCalcular');
		const btnCopy = document.getElementById('btnCopiarRx');
		const statusEl = document.getElementById('copyStatus');
		const cardEl = document.getElementById('medicationCard');

		function setStatus(msg) {
			if (!statusEl) return;
			statusEl.textContent = msg;
			setTimeout(() => (statusEl.textContent = ''), 1500);
		}

		function getSelectedItem() {
			const select = document.getElementById('selectFarmaco');
			const path = select?.value;
			const farmacos = window.farmacosData?.farmacos;
			if (!path || !farmacos) return null;
			return path.split('.').reduce((acc, k) => (acc ? acc[k] : null), farmacos);
		}

		function getCtx() {
			const pesoEl = document.getElementById('inputPeso');
			const idadeEl = document.getElementById('inputIdadeMeses');
			const weight = pesoEl ? Number(pesoEl.value) : NaN;
			const ageMonths = idadeEl?.value ? Number(idadeEl.value) : null;
			return { weight, ageMonths };
		}

		// ✅ quando calcular, você monta e guarda o rxText
		if (btnCalc) {
			btnCalc.addEventListener('click', () => {
				const item = getSelectedItem();
				if (!item) return setStatus('Selecione um fármaco.');

				const ctx = getCtx();
				currentRxText = buildRxText(item, ctx);

				if (!currentRxText) return setStatus('Sem prescrição para este item.');

				// renderize como quiser; MAS a cópia já está pronta
				if (cardEl) {
					cardEl.textContent = currentRxText;
					cardEl.dataset.copy = currentRxText;
				}

				setStatus('Calculado ✅');
			});
		}

		// ✅ copiar só copia o que já foi calculado/renderizado
		if (btnCopy) {
			btnCopy.addEventListener('click', async () => {
				const text = currentRxText || cardEl?.dataset?.copy || normalizeSpaces(cardEl?.innerText || '');
				if (!text) return setStatus('Nada para copiar.');

				const ok = await copyToClipboard(text);
				setStatus(ok ? 'Copiado ✅' : 'Falha ao copiar ❌');
			});
		}
	});
})();
