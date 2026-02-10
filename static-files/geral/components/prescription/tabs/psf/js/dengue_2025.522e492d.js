/**
 * Apoio Dengue - Hidratação
 * Convertido de dengue_2025.html — layout original preservado
 */
(function () {
	'use strict';




	function injectNeuCSS() {
		if (document.getElementById('psf-neu-styles')) return;
		const s = document.createElement('style');
		s.id = 'psf-neu-styles';
		s.textContent = `
			.neu-card{background:#e0e5ec;padding:22px;border-radius:24px;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}
			.neu-inset{background:#e0e5ec;padding:18px;border-radius:24px;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}
			.neu-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 22px;border:none;border-radius:60px;background:#e0e5ec;color:#5f6775;font-weight:bold;cursor:pointer;transition:all .2s;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;font-size:13px}
			.neu-btn:hover{color:#007bff;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}
			.neu-btn:active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;color:#23217c;transform:translateY(1px)}
			.neu-btn-primary{color:#007bff}
			.neu-btn-danger{color:#dc3545}
			.neu-btn-success{color:#28a745}
			.neu-btn-info{color:#007bff}
			.neu-btn-container{display:flex;gap:15px;justify-content:center;margin-top:15px}
			.neu-form-group{margin-bottom:20px;display:flex;flex-direction:row;gap:10px;align-items:center;justify-content:center}
			.neu-form-label{font-size:14px;font-weight:500;color:#5f6775;display:flex;align-items:center;gap:10px}
			.neu-form-input{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;height:30px;transition:box-shadow .2s;max-width:80px}
			.neu-form-input:focus{outline:none;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff}
			.neu-form-select{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;transition:box-shadow .2s}
			.neu-form-select:focus{outline:none}
			.neu-form-textarea{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;min-height:100px;resize:vertical;transition:box-shadow .2s}
			.neu-form-textarea:focus{outline:none}
			.neu-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:40}
			.neu-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:95%;max-width:600px;z-index:50;max-height:90vh}
			.neu-modal{background:#e0e5ec;border-radius:36px;padding:18px;margin:20px}
		`;
		document.head.appendChild(s);
	}

	function renderDengue() {
		const container = document.getElementById('psf_sub_dengue');
		if (!container) {
			console.error('[Dengue] Container #psf_sub_dengue não encontrado');
			return;
		}

		injectNeuCSS();

		container.innerHTML = `
			<div class="neu-card w-full max-w-2xl mx-auto">
				<header class="text-center flex flex-row justify-start gap-6 m-6">
					<h1 class="text-center text-2xl font-bold flex items-center justify-center gap-3 text-[#23217c]">
						<i class="fa-solid fa-mosquito"></i>
						Hidratação na Dengue
					</h1>
				</header>

				<!-- Seção de Entrada de Dados -->
				<section class="neu-inset p-4">
					<div class="neu-form-group flex flex-col sm:flex-row items-center gap-4">
						<label for="dengue_pesoAdulto" class="neu-form-label text-2xl flex-shrink-0">Peso (adulto):</label>
						<input type="number" id="dengue_pesoAdulto" class="neu-form-input flex-grow" placeholder="Ex: 70" />
						<span class="neu-form-label text-gray-500">Kg</span>
					</div>
					<div class="neu-btn-container mt-4">
						<button id="dengue_calcBtn" type="button" class="neu-btn neu-btn-primary"><span class="text-sm">CALCULAR</span></button>
					</div>
				</section>

				<!-- Seção de Resultados -->
				<section class="neu-inset mt-6 p-4 space-y-4">
					<h2 class="text-lg font-semibold text-center mb-2 text-[#23217c]">Plano de Hidratação (Grupo A/B)</h2>
					<div class="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
						<span class="font-bold text-sm">Volume total em 24h:</span>
						<span id="dengue_lblVolumeTotal" class="text-xl font-bold text-blue-600"><span class="text-sm">- mL</span></span>
					</div>
					<div class="flex justify-between items-center bg-green-50 p-3 rounded-lg">
						<span class="font-bold text-sm">Soro de Reidratação Oral:</span>
						<span id="dengue_lblVolumeSoro" class="text-xl font-bold text-green-700"><span class="text-sm">- mL</span></span>
					</div>
					<div class="flex justify-between items-center bg-yellow-50 p-3 rounded-lg">
						<span class="font-bold text-sm">Demais líquidos (água, suco):</span>
						<span id="dengue_lblVolumeOutros" class="text-xl font-bold text-yellow-800"><span class="text-sm">- mL</span></span>
					</div>
				</section>

				<!-- Botões de Ação -->
				<div class="neu-btn-container mt-8">
					<button id="dengue_infoBtn" type="button" class="neu-btn"><i class="fa-solid fa-book-medical mr-2"></i><span class="text-sm">Lembrete</span></button>
					<button id="dengue_copyBtn" type="button" class="neu-btn"><i class="fa-solid fa-copy mr-2"></i><span class="text-sm">Copiar</span></button>
				</div>
			</div>

			<!-- MODAL DE APOIO -->
			<div id="dengue_infoModalOverlay" class="neu-modal-overlay hidden"></div>
			<div id="dengue_infoModal" class="neu-modal neu-modal-card hidden">
				<div class="flex flex-col h-[85vh] gap-6 p-4">
					<div class="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
						<h2 class="text-xl font-bold text-[#23217c]">Lembrete Rápido - Dengue</h2>
						<button id="dengue_closeModalBtn" type="button" class="text-3xl bg-transparent border-none cursor-pointer">&times;</button>
					</div>
					<div class="flex-grow overflow-y-auto space-y-4 pr-2">
						<div class="neu-inset p-3">
							<h3 class="font-bold text-md text-green-600">Grupo A</h3>
							<ul class="list-disc list-inside text-sm space-y-1 mt-1">
								<li>Notificação + Cartão Dengue + Prova do laço</li>
								<li>Receita médica e Atestado se necessário</li>
								<li>Retorno 5° dia do início dos sintomas</li>
								<li>Iniciar hidratação oral na unidade</li>
							</ul>
						</div>
						<div class="neu-inset p-3">
							<h3 class="font-bold text-md text-yellow-600">Grupo B</h3>
							<ul class="list-disc list-inside text-sm space-y-1 mt-1">
								<li>Notificação + Cartão Dengue</li>
								<li>Hematócrito + hemograma</li>
								<li>Retorno diário com médico até 48h pós febre</li>
								<li>Iniciar hidratação oral na unidade</li>
								<li>RT-PCR em todos</li>
							</ul>
						</div>
						<div class="neu-inset p-3">
							<h3 class="font-bold text-md text-orange-600">Grupo C</h3>
							<ul class="list-disc list-inside text-sm space-y-1 mt-1">
								<li>Notificação + Cartão Dengue + Hematócrito</li>
								<li>Hidratação venosa + Monitorização SV</li>
								<li>Contato SAMU</li>
								<li>Após alta, retorno como grupo B</li>
							</ul>
						</div>
						<div class="neu-inset p-3">
							<h3 class="font-bold text-md text-red-600">Grupo D</h3>
							<ul class="list-disc list-inside text-sm space-y-1 mt-1">
								<li>Notificação + Cartão Dengue + Hematócrito (se possível)</li>
								<li>Hidratação venosa + Monitorização SV</li>
								<li>Contato SAMU</li>
								<li>Após alta, retorno como grupo B</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		`;

		// ===============================
		//  ELEMENTOS
		// ===============================
		const pesoInput = document.getElementById('dengue_pesoAdulto');
		const calcBtn = document.getElementById('dengue_calcBtn');
		const copyBtn = document.getElementById('dengue_copyBtn');
		const infoBtn = document.getElementById('dengue_infoBtn');
		const lblVolumeTotal = document.getElementById('dengue_lblVolumeTotal');
		const lblVolumeSoro = document.getElementById('dengue_lblVolumeSoro');
		const lblVolumeOutros = document.getElementById('dengue_lblVolumeOutros');

		const modal = document.getElementById('dengue_infoModal');
		const overlay = document.getElementById('dengue_infoModalOverlay');
		const closeModalBtn = document.getElementById('dengue_closeModalBtn');

		let resultadoTexto = '';

		// ===============================
		//  FUNÇÕES
		// ===============================
		function calcular() {
			const peso = parseFloat(pesoInput.value);
			if (isNaN(peso) || peso <= 0) {
				alert('Por favor, insira um peso válido.');
				return;
			}

			const volumeTotal = peso * 60;
			const volumeSoro = Math.floor(volumeTotal * (1 / 3));
			const volumeOutros = volumeTotal - volumeSoro;

			lblVolumeTotal.textContent = volumeTotal + ' mL';
			lblVolumeSoro.textContent = volumeSoro + ' mL';
			lblVolumeOutros.textContent = volumeOutros + ' mL';

			resultadoTexto = 'Plano de hidratação oral para Dengue (Peso: ' + peso + ' Kg):\n';
			resultadoTexto += '- Volume total em 24h: ' + volumeTotal + ' mL\n';
			resultadoTexto += '- SORO DE REIDRATAÇÃO ORAL: ' + volumeSoro + ' mL\n';
			resultadoTexto += '- Volume dos demais líquidos: ' + volumeOutros + ' mL';
		}

		function copiar() {
			if (resultadoTexto === '') {
				alert('Calcule os volumes antes de copiar.');
				return;
			}
			navigator.clipboard
				.writeText(resultadoTexto)
				.then(() => alert('Plano de hidratação copiado!'))
				.catch((err) => {
					console.error('Erro ao copiar: ', err);
					alert('Não foi possível copiar o texto.');
				});
		}

		function openModal() {
			modal.classList.remove('hidden');
			overlay.classList.remove('hidden');
		}

		function closeModal() {
			modal.classList.add('hidden');
			overlay.classList.add('hidden');
		}

		// ===============================
		//  EVENT LISTENERS
		// ===============================
		calcBtn.addEventListener('click', calcular);
		copyBtn.addEventListener('click', copiar);
		infoBtn.addEventListener('click', openModal);
		closeModalBtn.addEventListener('click', closeModal);
		overlay.addEventListener('click', closeModal);

		console.log('[Dengue] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_dengue')) {
		renderDengue();
	}

	window.renderDengue = renderDengue;
})();
