// protocolos-data-module.js
(() => {
	'use strict';

	// ============================================
	// DADOS DOS PROTOCOLOS (Somente dados, sem funções)
	// ============================================
	const protocolosData = {
		// ============================================
		// SEÇÃO 1: PROTOCOLOS CLÍNICOS (Ficha Vermelha)
		// ============================================
		cardiologia: {
			name: 'Cardiologia',
			items: {
				dor_toracica: {
					title: 'Dor Torácica Aguda',
					content: `
            <div class="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
                <div class="border-b pb-2">
                    <h2 class="text-xl font-bold text-blue-900">1. Triagem Rápida e Diagnóstico</h2>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <h3 class="font-bold text-blue-800 mb-2">1.1 Avaliação Inicial (ABCDE)</h3>
                        <ul class="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                            <li><strong>A (Vias Aéreas):</strong> Perviedade.</li>
                            <li><strong>B (Respiração):</strong> O₂ se Sat < 90%.</li>
                            <li><strong>C (Circulação):</strong> PA, FC, 2 Acessos Venosos.</li>
                            <li><strong>D (Neurológico):</strong> HGT (Excluir hipoglicemia).</li>
                        </ul>
                    </div>
                    
                    <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                        <h3 class="font-bold text-red-800 mb-2">1.2 "Time is Muscle" (≤ 10 min)</h3>
                        <ul class="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                            <li><strong>ECG 12 derivações:</strong> Imediato.</li>
                            <li><strong>Monitorização:</strong> Cardíaca e Oximetria.</li>
                            <li><strong>Troponina:</strong> Coleta imediata (0h).</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 class="font-bold text-slate-800 mt-2">1.3 Tratamento Inicial (MONAB)</h3>
                    <p class="text-sm text-gray-500 mb-2">Ajustar conforme contraindicações.</p>
                    <ul class="space-y-2 text-gray-700">
                        <li class="flex items-start"><span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-0.5">M</span> <span><strong>Morfina:</strong> 2-4mg IV diluída. (Se dor refratária). <span class="text-red-600 text-xs font-bold">Evitar em IAM VD.</span></span></li>
                        <li class="flex items-start"><span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-0.5">O</span> <span><strong>Oxigênio:</strong> Apenas se Sat < 90% ou dispneia.</span></li>
                        <li class="flex items-start"><span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-0.5">N</span> <span><strong>Nitratos:</strong> Isossorbida 5mg SL (Máx 3x) ou Tridil IV. <span class="text-red-600 text-xs font-bold">CI: Sildenafil/Tadalafila (48h), Hipotensão.</span></span></li>
                        <li class="flex items-start"><span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-0.5">A</span> <span><strong>Aspirina (AAS):</strong> 300mg (3cp) mastigados. <strong>+ Clopidogrel:</strong> 300mg (4cp).</span></li>
                        <li class="flex items-start"><span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-2 mt-0.5">B</span> <span><strong>Betabloqueador:</strong> Metoprolol VO nas primeiras 24h. <span class="text-red-600 text-xs font-bold">Evitar IV na fase aguda.</span></span></li>
                    </ul>
                </div>
            </div>
          `,
					rx_text: `PROTOCOLO DOR TORÁCICA / SCA:

1. AAS 100mg _____ 3 comprimidos (300mg) VO mastigados AGORA.
2. Clopidogrel 75mg _____ 4 comprimidos (300mg) AGORA.
   (Se > 75 anos: dose sem ataque, 75mg).
3. Atorvastatina 40mg _____ 2 comprimidos (80mg) VO AGORA.
4. Enoxaparina 40mg (1mg/kg) _____ 1 seringa SC 12/12h.
5. Isossorbida 5mg _____ 1 cp Sublingual se dor forte.
6. Pantoprazol 40mg _____ 1 cp VO Jejum.`,
				},

				iam_supra: {
					title: 'IAM com Supra ST (STEMI)',
					content: `
            <div class="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
                <div class="bg-red-100 border-l-4 border-red-600 p-4 rounded text-red-900">
                    <h2 class="text-xl font-bold flex items-center"><span class="material-symbols-outlined mr-2">warning</span> REPERFUSÃO IMEDIATA</h2>
                    <p class="font-semibold mt-1">Tempo é Músculo.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="font-bold text-blue-800 border-b border-blue-100 pb-1 mb-2">1. Estratégia de Reperfusão</h3>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li class="flex items-center justify-between">
                                <span><strong>ICP Primária:</strong></span>
                                <span class="bg-green-100 text-green-800 px-2 rounded-full text-xs">Meta ≤ 90 min</span>
                            </li>
                            <li class="flex items-center justify-between">
                                <span><strong>Fibrinólise:</strong></span>
                                <span class="bg-yellow-100 text-yellow-800 px-2 rounded-full text-xs">Meta ≤ 30 min</span>
                            </li>
                            <li class="text-xs text-gray-500 italic mt-1">Transferir se ICP disponível em < 120 min. Caso contrário, fibrinolítico local.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-bold text-blue-800 border-b border-blue-100 pb-1 mb-2">2. Kit Fibrinolítico (Tenecteplase)</h3>
                        <table class="w-full text-xs text-left border-collapse">
                            <tr class="bg-gray-50"><th class="p-1">Peso</th><th class="p-1">Dose</th><th class="p-1">Volume</th></tr>
                            <tr class="border-t"><td>< 60 kg</td><td>30 mg</td><td>6 ml</td></tr>
                            <tr class="border-t"><td>60-70 kg</td><td>35 mg</td><td>7 ml</td></tr>
                            <tr class="border-t"><td>70-80 kg</td><td>40 mg</td><td>8 ml</td></tr>
                            <tr class="border-t"><td>80-90 kg</td><td>45 mg</td><td>9 ml</td></tr>
                            <tr class="border-t"><td>> 90 kg</td><td>50 mg</td><td>10 ml</td></tr>
                        </table>
                        <p class="text-xs text-red-600 font-bold mt-1">* > 75 anos: Usar METADE da dose.</p>
                    </div>
                </div>

                <div>
                    <h3 class="font-bold text-slate-800 mt-2">3. Terapia Adjuvante</h3>
                    <ul class="list-disc pl-5 text-gray-700 text-sm">
                        <li><strong>Enoxaparina:</strong> Bolus 30mg IV + 1mg/kg SC 12/12h (< 75 anos).</li>
                        <li><strong>Clopidogrel:</strong> Ataque 300mg (< 75 anos) ou 75mg (> 75 anos). Se ICP: 600mg.</li>
                    </ul>
                </div>
            </div>
          `,
					rx_text: `IAM COM SUPRA - TROMBÓLISE (Tenecteplase):

1. Tenecteplase (Metalyse) _____ mg IV em Bolus Único AGORA.
   (Verificar tabela: <60kg:30mg | 60-70:35mg | 70-80:40mg | >90:50mg)
   (*Reduzir dose em 50% se > 75 anos).

2. AAS 300mg (+ Clopidogrel 300mg) VO AGORA.
3. Enoxaparina 30mg IV (Bolus) AGORA (Se < 75 anos).
4. Enoxaparina _____ mg (1mg/kg) SC 12/12h.
   (Se >75 anos: 0.75 mg/kg sem bolus. Se ClCr<30: 1mg/kg 1x/dia).`,
				},

				// ... mais protocolos de cardiologia
			},
		},

		// ============================================
		// SEÇÃO 2: RESPIRATÓRIO
		// ============================================
		respiratorio: {
			name: 'Respiratório',
			items: {
				asma_crise: {
					title: 'Crise de Asma',
					content: `...`,
					rx_text: `...`,
				},
				// ... mais protocolos
			},
		},

		// ============================================
		// SEÇÃO 3: NEUROLOGIA
		// ============================================
		neurologia: {
			name: 'Neurologia',
			items: {
				avc_isquemico: {
					title: 'AVC Isquêmico',
					content: `...`,
					rx_text: `...`,
				},
				// ... mais protocolos
			},
		},

		// ... mais especialidades (4000 linhas)
	};

	// ============================================
	// FUNÇÕES UTILITÁRIAS
	// ============================================

	/**
	 * Retorna todas as categorias (especialidades)
	 */
	function getCategorias() {
		return Object.keys(protocolosData).map((key) => ({
			key: key,
			name: protocolosData[key].name,
			count: Object.keys(protocolosData[key].items).length,
		}));
	}

	/**
	 * Retorna todos os protocolos de uma categoria
	 */
	function getProtocolosPorCategoria(categoria) {
		if (!protocolosData[categoria]) return [];

		return Object.keys(protocolosData[categoria].items).map((key) => ({
			key: key,
			...protocolosData[categoria].items[key],
		}));
	}

	/**
	 * Busca um protocolo específico
	 */
	function getProtocolo(categoria, protocoloKey) {
		if (!protocolosData[categoria]) return null;
		if (!protocolosData[categoria].items[protocoloKey]) return null;

		return {
			key: protocoloKey,
			categoria: categoria,
			categoriaNome: protocolosData[categoria].name,
			...protocolosData[categoria].items[protocoloKey],
		};
	}

	/**
	 * Busca textual em todos os protocolos
	 */
	function buscarProtocolos(termo) {
		termo = termo.toLowerCase();
		const resultados = [];

		Object.keys(protocolosData).forEach((catKey) => {
			const categoria = protocolosData[catKey];

			Object.keys(categoria.items).forEach((protKey) => {
				const protocolo = categoria.items[protKey];

				if (protocolo.title.toLowerCase().includes(termo) || protocolo.content.toLowerCase().includes(termo) || protocolo.rx_text.toLowerCase().includes(termo)) {
					resultados.push({
						key: protKey,
						categoria: catKey,
						categoriaNome: categoria.name,
						...protocolo,
					});
				}
			});
		});

		return resultados;
	}

	/**
	 * Retorna todos os protocolos em array flat
	 */
	function getTodosProtocolos() {
		const todos = [];

		Object.keys(protocolosData).forEach((catKey) => {
			const categoria = protocolosData[catKey];

			Object.keys(categoria.items).forEach((protKey) => {
				todos.push({
					key: protKey,
					categoria: catKey,
					categoriaNome: categoria.name,
					...categoria.items[protKey],
				});
			});
		});

		return todos;
	}

	/**
	 * Estatísticas
	 */
	function getEstatisticas() {
		let totalProtocolos = 0;
		const porCategoria = {};

		Object.keys(protocolosData).forEach((catKey) => {
			const count = Object.keys(protocolosData[catKey].items).length;
			porCategoria[catKey] = count;
			totalProtocolos += count;
		});

		return {
			total: totalProtocolos,
			categorias: Object.keys(protocolosData).length,
			porCategoria: porCategoria,
		};
	}

	// ============================================
	// EXPÕE API GLOBAL
	// ============================================
	window.ProtocolosDataModule = {
		// Dados brutos
		data: protocolosData,

		// Funções de acesso
		getCategorias: getCategorias,
		getProtocolosPorCategoria: getProtocolosPorCategoria,
		getProtocolo: getProtocolo,
		buscar: buscarProtocolos,
		getTodos: getTodosProtocolos,
		getEstatisticas: getEstatisticas,
	};

	// Compatibilidade com código antigo
	window.protocolosData = protocolosData;

	console.log('✅ Protocolos Data Module carregado:', window.ProtocolosDataModule.getEstatisticas());
})();
