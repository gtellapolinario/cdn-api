(() => {
	'use strict';

	// =========================
	// Configura\u00E7\u00F5es e Constantes
	// =========================
	const API_URL = 'https://cnes-gtmedic.replit.app';

	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
		width: '300px',
		customClass: {
			popup: 'text-xs rounded-xl shadow-lg',
			title: 'text-xs font-semibold',
		},
	});

	// =========================
	// Fun\u00E7\u00F5es da API
	// =========================
	async function preencherCNES(codigoCnes, btnElement = null) {
		let originalContent = '';

		if (btnElement) {
			originalContent = btnElement.innerHTML;
			btnElement.disabled = true;
			btnElement.innerHTML = `
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Buscando...</span>
      `;
		}

		if (!codigoCnes) {
			Swal.fire({
				icon: 'warning',
				title: 'Aten\u00E7\u00E3o',
				text: 'Digite um c\u00F3digo CNES v\u00E1lido',
				confirmButtonColor: '#2563eb',
				confirmButtonText: 'OK',
				width: '350px',
				customClass: {
					popup: 'text-sm rounded-xl',
					title: 'text-base font-bold',
					htmlContainer: 'text-sm',
					confirmButton: 'text-xs px-4 py-2',
				},
			});

			if (btnElement) {
				btnElement.disabled = false;
				btnElement.innerHTML = originalContent;
			}
			return;
		}

		try {
			const response = await fetch(`${API_URL}/cnes/${codigoCnes}`);

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.detail || 'Erro ao buscar CNES');
			}

			const data = await response.json();

			document.getElementById('local1').value = data.local1;
			document.getElementById('local2').value = data.local2;
			document.getElementById('local3').value = data.local3;
			document.getElementById('local').value = data.local;
			document.getElementById('cnes').value = data.cnes;
			document.getElementById('telefone').value = data.telefone;

			Toast.fire({
				icon: 'success',
				title: 'Dados carregados!',
			});
		} catch (error) {
			console.error('\u274C Erro:', error);

			Swal.fire({
				icon: 'error',
				title: 'Erro',
				text: error.message,
				confirmButtonColor: '#dc2626',
				confirmButtonText: 'OK',
				width: '350px',
				customClass: {
					popup: 'text-sm rounded-xl',
					title: 'text-base font-bold',
					htmlContainer: 'text-xs',
					confirmButton: 'text-xs px-4 py-2',
				},
			});
		} finally {
			if (btnElement) {
				btnElement.disabled = false;
				btnElement.innerHTML = originalContent;
			}
		}
	}

	function limparCamposCNES() {
		document.getElementById('local1').value = '';
		document.getElementById('local2').value = '';
		document.getElementById('local3').value = '';
		document.getElementById('local').value = '';
		document.getElementById('cnes').value = '';
		document.getElementById('telefone').value = '';

		Toast.fire({
			icon: 'info',
			title: 'Campos limpos!',
		});
	}

	// =========================
	// Fun\u00E7\u00F5es da UI
	// =========================
	function mostrarCNES() {
		const select = document.getElementById('select-unidade');
		const container = document.getElementById('cnes-container');
		const input = document.getElementById('input-cnes');
		const cnes = select?.value;

		if (cnes) {
			if (input) input.value = cnes;
			if (container) container.style.display = 'flex';
		} else {
			if (container) container.style.display = 'none';
			if (input) input.value = '';
		}
	}

	function inserirCNES() {
		const cnes = document.getElementById('input-cnes')?.value;

		if (!cnes) {
			Toast.fire({
				icon: 'warning',
				title: 'Nenhum CNES selecionado',
			});
			return;
		}

		const campoBusca = document.getElementById('busca-cnes');
		if (!campoBusca) {
			console.error('Campo busca-cnes n\u00E3o encontrado');
			Swal.fire({
				icon: 'error',
				title: 'Erro',
				text: 'Campo de busca n\u00E3o encontrado',
				confirmButtonColor: '#dc2626',
			});
			return;
		}

		campoBusca.value = cnes;

		const btnBuscar = campoBusca.parentElement?.querySelector('button');

		if (btnBuscar && typeof preencherCNES === 'function') {
			preencherCNES(cnes, btnBuscar);
		} else {
			Toast.fire({
				icon: 'success',
				title: 'CNES inserido no campo de busca!',
			});
		}

		campoBusca.scrollIntoView({ behavior: 'smooth', block: 'center' });
		campoBusca.focus();
	}

	// =========================
	// Exp\u00F5e fun\u00E7\u00F5es globalmente (para onclick no HTML)
	// =========================
	window.preencherCNES = preencherCNES;
	window.limparCamposCNES = limparCamposCNES;
	window.mostrarCNES = mostrarCNES;
	window.inserirCNES = inserirCNES;
})();
