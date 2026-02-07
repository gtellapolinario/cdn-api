// como é chamado no frontend
// <script src="js/hotstrings.js"></script>
// <script src="js/psf_hotstrings.js"></script>
// <script src="js/exame.js"></script>
// <script src="js/especialidades.js"></script>
// <script src="js/calcula.js"></script>
// <script src="js/psf.js"></script>

(() => {
	'use strict';

	// =========================
	// Helpers (escopo fechado)
	// =========================
	const el = (id) => document.getElementById(id);
	const on = (node, evt, fn, opts) => {
		if (!node) return;
		node.addEventListener(evt, fn, opts);
	};

	const safeFirstLine = (text) => {
		const first = String(text || '').split('\n')[0] || '';
		return first.length > 80 ? first.slice(0, 80) + '…' : first;
	};

	async function copyToClipboard(text) {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return;
		}
		const ta = document.createElement('textarea');
		ta.value = text;
		ta.style.position = 'fixed';
		ta.style.left = '-9999px';
		ta.style.top = '0';
		document.body.appendChild(ta);
		ta.focus();
		ta.select();
		document.execCommand('copy');
		document.body.removeChild(ta);
	}

	function flashBtn(btn, okText = 'OK!') {
		if (!btn) return;
		const original = btn.textContent;
		btn.textContent = okText;
		btn.classList.add('ring-2', 'ring-emerald-300');
		setTimeout(() => {
			btn.textContent = original;
			btn.classList.remove('ring-2', 'ring-emerald-300');
		}, 1200);
	}

	function insertAtCursor(textArea, text) {
		if (!textArea) return;
		const start = textArea.selectionStart ?? textArea.value.length;
		const end = textArea.selectionEnd ?? textArea.value.length;
		const before = textArea.value.slice(0, start);
		const after = textArea.value.slice(end);
		textArea.value = before + text + after;
		const pos = (before + text).length;
		textArea.setSelectionRange(pos, pos);
	}

	function tryExpandHotstring(textArea, dict) {
		if (!textArea || !dict) return;

		const cursorPos = textArea.selectionStart ?? textArea.value.length;
		const before = textArea.value.slice(0, cursorPos);

		if (!/\s$/.test(before)) return;

		const trimmed = before.trimEnd();
		const match = trimmed.match(/(\S+)$/);
		if (!match) return;

		const lastWord = match[1];

		let foundKey = lastWord;
		if (!Object.prototype.hasOwnProperty.call(dict, lastWord)) {
			const lower = lastWord.toLowerCase();
			foundKey = Object.keys(dict).find((k) => k.toLowerCase() === lower);
		}

		if (!foundKey) return;

		const expansion = dict[foundKey];
		const newBefore = trimmed.slice(0, trimmed.length - lastWord.length) + expansion + ' ';
		textArea.value = newBefore + textArea.value.slice(cursorPos);

		const newPos = newBefore.length;
		textArea.setSelectionRange(newPos, newPos);
	}

	// =========================
	// Hotstrings (espera existir)
	// =========================
	// =========================
	// Hotstrings (Gestão de Dados)
	// =========================
	// Acessor dinâmico para garantir que pegamos os dados mesmo se carregados depois
	const getHotstringsData = () => {
		if (window.HotstringsModule && window.HotstringsModule.data) {
			return window.HotstringsModule.data;
		}
		return typeof window.hotstrings === 'object' && window.hotstrings ? window.hotstrings : {};
	};

	let hotstringsRef = getHotstringsData();
	// Tenta atualizar a ref periodicamente se estiver vazia (caso de carregamento async)
	if (Object.keys(hotstringsRef).length === 0) {
		const retryInterval = setInterval(() => {
			const data = getHotstringsData();
			if (Object.keys(data).length > 0) {
				hotstringsRef = data;
				// Atualiza UI se necessário
				if (typeof renderHotstringsList === 'function') renderHotstringsList(el('searchBox')?.value || '');
				clearInterval(retryInterval);
			}
		}, 500);
	}

	const DEFAULT_HOTSTRINGS = JSON.parse(JSON.stringify(hotstringsRef));

	// =========================
	// Tabs
	// =========================
	const tabBtns = Array.from(document.querySelectorAll('.tabBtn'));
	const panels = {
		prescricao: el('tab-prescricao'),
		exames: el('tab-exames'),
		editar: el('tab-editar'),
		apoio: el('tab-apoio'),
		calculadoras: el('tab-calculadoras'),
		psf: el('tab-psf'),
	};

	function setActiveTab(name) {
		// Toggle Toolbar Prescrição
		const toolbar = el('toolbar-prescricao');
		if (toolbar) {
			const isPrescricao = name === 'prescricao';
			toolbar.classList.toggle('hidden', !isPrescricao);
			// Importante: toggle flex para garantir que display:none funcione se houver conflito de especificidade,
			// e restaurar layout correto quando visível.
			toolbar.classList.toggle('flex', isPrescricao);
		}

		for (const [k, panel] of Object.entries(panels)) {
			if (!panel) continue;
			panel.classList.toggle('hidden', k !== name);
		}
		for (const btn of tabBtns) {
			const active = btn.dataset.tab === name;

			// Mantém seu layout/base; só adiciona/remover classes de estado
			btn.classList.toggle('text-[#007BFF]', active);
			btn.classList.toggle('font-bold', active);

			btn.classList.toggle('text-slate-800', !active);
			btn.classList.toggle('font-medium', !active);
		}
		localStorage.setItem('rx_active_tab', name);

		// --- INTEGRAÇÃO DE MÓDULOS EXTERNOS ---

		// 1. Módulo de Especialidades (Aba Apoio/PSF)
		if (window.EspecialidadesModule && (name === 'apoio' || name === 'psf') && !window.EspecialidadesModule._initialized) {
			console.log('Inicializando Módulo de Especialidades...');
			if (window.EspecialidadesModule.init) window.EspecialidadesModule.init();
			window.EspecialidadesModule._initialized = true;
		}

		// 2. Refresh de Hotstrings se necessário (Aba Editar)
		if (name === 'editar') {
			hotstringsRef = getHotstringsData(); // garante dados frescos
			// Se houver função de renderizar tabela de edição, chame aqui
			if (typeof renderEditorTable === 'function') renderEditorTable();
		}

		// 3. Módulo de Exames
		if (name === 'exames' && window.ExamesModule) {
			if (window.ExamesModule.init && !window.ExamesModule._initialized) {
				console.log('Inicializando Módulo de Exames...');
				window.ExamesModule.init();
			}
		}

		// 4. Módulo de Protocolos (Aba PSF / Protocolos)
		if (name === 'psf' && window.ProtocolosModule) {
			// Protocolos pode precisar re-renderizar se o DOM mudou
			console.log('Verificando Módulo de Protocolos...');
			if (window.ProtocolosModule.init) window.ProtocolosModule.init();
		}
	}

	tabBtns.forEach((btn) => on(btn, 'click', () => setActiveTab(btn.dataset.tab)));

	// Pequeno delay para garantir que todos os scripts carregaram antes de definir a aba inicial
	setTimeout(() => {
		setActiveTab(localStorage.getItem('rx_active_tab') || 'prescricao');
	}, 100);

	// =========================
	// Codes panel
	// =========================
	const codesPanel = el('codesPanel');
	const codesBtn = el('codesBtn');
	const searchBox = el('searchBox');

	function renderHotstringsList(filter = '') {
		const hotstringItems = el('hotstringItems');
		const codesCount = el('codesCount');
		if (!hotstringItems || !codesCount) return;

		hotstringItems.innerHTML = '';
		const entries = Object.entries(hotstringsRef).sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));

		// Mostra o total de hotstrings disponíveis no contador
		codesCount.textContent = String(entries.length);

		const term = filter.trim().toLowerCase();

		// Se não houver termo de busca, mostra mensagem e não renderiza nada
		if (!term) {
			hotstringItems.innerHTML = `
        <div class="flex flex-col items-center justify-center py-8 text-slate-400 opacity-60">
          <span class="material-symbols-outlined text-4xl mb-2">manage_search</span>
          <span class="text-xs font-medium">Digite para buscar...</span>
        </div>
      `;
			return;
		}

		let count = 0;
		const LIMIT = 50; // Limite de renderização para performance

		const fragment = document.createDocumentFragment();

		for (const [code, text] of entries) {
			// Busca apenas na sigla (código), ignorando o texto expandido
			const match = code.toLowerCase().includes(term);
			if (!match) continue;

			if (count >= LIMIT) {
				const more = document.createElement('div');
				more.className = 'text-center text-xs text-slate-400 py-2 italic border-t border-slate-100 mt-2';
				more.textContent = `...e mais resultados. Refine sua busca.`;
				fragment.appendChild(more);
				break;
			}

			const row = document.createElement('button');
			row.type = 'button';
			row.className = 'w-full text-left px-3 py-2 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-lg transition-colors group mb-1';

			row.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="font-mono text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors bg-slate-100 inline-block px-1.5 rounded text-[11px] mb-1">${code}</div>
            <div class="text-[11px] text-slate-600 leading-snug line-clamp-2 text-justify">${safeFirstLine(text)}</div>
          </div>
          <span class="material-symbols-outlined text-slate-300 text-[16px] group-hover:text-blue-500 transition-colors mt-1">input</span>
        </div>
      `;

			// Evento de clique para inserir
			on(row, 'click', () => {
				insertAtCursor(el('textArea'), code + ' ');
				el('textArea')?.dispatchEvent(new Event('input', { bubbles: true }));
				el('textArea')?.focus();
			});

			fragment.appendChild(row);
			count++;
		}

		if (count === 0) {
			hotstringItems.innerHTML = `
        <div class="py-6 text-center text-sm text-slate-500">
          Nenhum resultado encontrado.
        </div>
      `;
		} else {
			hotstringItems.appendChild(fragment);
		}
	}

	// Remover antiga função filterHotstringsList pois a lógica agora está no render
	on(searchBox, 'input', () => renderHotstringsList(searchBox.value));

	// codesBtn é checkbox — melhor "change"
	on(codesBtn, 'change', (e) => {
		if (!codesPanel) return;
		codesPanel.classList.toggle('hidden', !e.target.checked);
	});
	// estado inicial coerente
	if (codesBtn && codesPanel) codesPanel.classList.toggle('hidden', !codesBtn.checked);

	// =========================
	// Hotstring expansion na Prescrição
	// =========================
	const textArea = el('textArea');
	const rxPrint = el('rxPrint');

	on(textArea, 'input', () => {
		tryExpandHotstring(textArea, hotstringsRef);
		if (rxPrint) rxPrint.textContent = textArea.value;
	});
	if (rxPrint && textArea) rxPrint.textContent = textArea.value;

	// Hotstring em Exames (sempre ativo)
	document.addEventListener('input', (e) => {
		if (e.target && e.target.id === 'examText') {
			tryExpandHotstring(e.target, hotstringsRef);
		}
	});

	// =========================
	// CRM/UF – guarda
	// =========================
	let crmUf = '';
	let enderecoUf = '';

	on(el('crmUf'), 'change', function () {
		crmUf = this.value;
	});
	on(el('uf'), 'change', function () {
		enderecoUf = this.value;
	});

	// =========================
	// =========================
	// Editor tab (Table UI)
	// =========================
	let editorCurrentPage = 1;
	let editorItemsPerPage = 10;
	let editorFilter = '';

	const editorHotstringsList = el('editorHotstringsList');
	const searchEditorInput = el('searchEditorInput');
	const itemsPerPageSelect = el('itemsPerPageSelect');
	const prevPageBtn = el('prevPageBtn');
	const nextPageBtn = el('nextPageBtn');
	const pageNumbers = el('pageNumbers');
	const totalItemsSpan = el('totalItems');
	const gotoPageInput = el('gotoPageInput');

	// Modal Elements
	const hotstringModal = el('hotstringModal');
	const modalCodeInput = el('modalCodeInput');
	const modalTextInput = el('modalTextInput');
	const modalTitle = el('modalTitle');
	const modalSaveBtn = el('modalSaveBtn');
	const modalCancelBtn = el('modalCancelBtn');

	let editingOriginalCode = null; // null = novo, string = editando

	function getFilteredSortedHotstrings() {
		const entries = Object.entries(hotstringsRef);
		const term = editorFilter.trim().toLowerCase();

		let filtered = entries;
		if (term) {
			filtered = entries.filter(([code, text]) => code.toLowerCase().includes(term) || text.toLowerCase().includes(term));
		}

		// Ordenar por código
		filtered.sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));
		return filtered;
	}

	function renderEditorTable() {
		if (!editorHotstringsList) return;

		const allItems = getFilteredSortedHotstrings();
		const total = allItems.length;
		if (totalItemsSpan) totalItemsSpan.textContent = total;

		const totalPages = Math.ceil(total / editorItemsPerPage) || 1;
		if (editorCurrentPage > totalPages) editorCurrentPage = totalPages;
		if (editorCurrentPage < 1) editorCurrentPage = 1;

		const start = (editorCurrentPage - 1) * editorItemsPerPage;
		const end = start + editorItemsPerPage;
		const pageItems = allItems.slice(start, end);

		editorHotstringsList.innerHTML = '';

		if (pageItems.length === 0) {
			const tr = document.createElement('tr');
			tr.innerHTML = `<td colspan="3" class="px-6 py-4 text-center text-slate-500">Nenhum item encontrado</td>`;
			editorHotstringsList.appendChild(tr);
		} else {
			pageItems.forEach(([code, text]) => {
				const tr = document.createElement('tr');
				tr.className = 'group transition-colors hover:bg-black/5 text-slate-800 border-b border-transparent hover:border-slate-200';

				// Truncate text for display
				const displayText = text.length > 60 ? text.slice(0, 60) + '...' : text;

				tr.innerHTML = `
              <td class="px-6 py-4 font-mono font-bold align-top select-all">${code}</td>
              <td class="px-6 py-4 whitespace-pre-wrap align-top text-xs">${displayText}</td>
              <td class="px-6 py-4 align-top text-right">
                <div class="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button type="button" class="btn-edit p-2 rounded-full hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors" title="Editar">
                    <span class="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button type="button" class="btn-delete p-2 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors" title="Excluir">
                    <span class="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </td>
            `;

				// Bind actions
				const btnEdit = tr.querySelector('.btn-edit');
				btnEdit.onclick = () => openModal(code, text);

				const btnDelete = tr.querySelector('.btn-delete');
				btnDelete.onclick = () => deleteHotstring(code);

				editorHotstringsList.appendChild(tr);
			});
		}

		renderPagination(totalPages);
	}

	function renderPagination(totalPages) {
		if (pageNumbers) {
			pageNumbers.innerHTML = '';
			const info = document.createElement('span');
			info.className = 'text-sm font-semibold text-slate-800 self-center';
			info.textContent = `${editorCurrentPage} / ${totalPages}`;
			pageNumbers.appendChild(info);
		}

		if (prevPageBtn) prevPageBtn.disabled = editorCurrentPage <= 1;
		if (nextPageBtn) nextPageBtn.disabled = editorCurrentPage >= totalPages;
		if (gotoPageInput) gotoPageInput.value = editorCurrentPage;
	}

	function openModal(code = null, text = null) {
		if (hotstringModal) hotstringModal.classList.remove('hidden');
		editingOriginalCode = code; // if null, new

		if (modalTitle) modalTitle.textContent = code ? 'Editar Hotstring' : 'Adicionar Hotstring';
		if (modalCodeInput) modalCodeInput.value = code || '';
		if (modalTextInput) modalTextInput.value = text || '';
		if (modalCodeInput) modalCodeInput.focus();
	}

	function closeModal() {
		if (hotstringModal) hotstringModal.classList.add('hidden');
		editingOriginalCode = null;
	}

	function saveHotstring() {
		const newCode = modalCodeInput.value.trim();
		const newText = modalTextInput.value;

		if (!newCode) {
			alert('Código é obrigatório!');
			return;
		}

		// Check renaming collision
		if (editingOriginalCode && newCode !== editingOriginalCode && hotstringsRef[newCode]) {
			if (!confirm(`O código "${newCode}" já existe. Deseja sobrescrever?`)) return;
		} else if (!editingOriginalCode && hotstringsRef[newCode]) {
			if (!confirm(`O código "${newCode}" já existe. Deseja sobrescrever?`)) return;
		}

		// Update Ref
		if (editingOriginalCode && newCode !== editingOriginalCode) {
			delete hotstringsRef[editingOriginalCode];
		}
		hotstringsRef[newCode] = newText;

		closeModal();
		renderHotstringsList(); // Sidebar
		renderEditorTable(); // Editor Table
	}

	function deleteHotstring(code) {
		if (confirm(`Excluir hotstring "${code}"?`)) {
			delete hotstringsRef[code];
			renderHotstringsList();
			renderEditorTable();
		}
	}
	// Garante que inicia sempre na primeira tab

	// Event Listeners for Editor
	on(el('addNewHotstringBtn'), 'click', () => openModal());
	on(modalCancelBtn, 'click', closeModal);
	on(modalSaveBtn, 'click', saveHotstring);

	on(searchEditorInput, 'input', (e) => {
		editorFilter = e.target.value;
		editorCurrentPage = 1;
		renderEditorTable();
	});

	on(itemsPerPageSelect, 'change', (e) => {
		editorItemsPerPage = parseInt(e.target.value);
		editorCurrentPage = 1;
		renderEditorTable();
	});

	on(prevPageBtn, 'click', () => {
		if (editorCurrentPage > 1) {
			editorCurrentPage--;
			renderEditorTable();
		}
	});

	on(nextPageBtn, 'click', () => {
		const total = getFilteredSortedHotstrings().length;
		const totalPages = Math.ceil(total / editorItemsPerPage) || 1;
		if (editorCurrentPage < totalPages) {
			editorCurrentPage++;
			renderEditorTable();
		}
	});

	on(gotoPageInput, 'change', (e) => {
		const val = parseInt(e.target.value);
		if (val > 0) {
			editorCurrentPage = val;
			renderEditorTable();
		}
	});

	// Convert Modal Logic
	const convertTextModal = el('convertTextModal');
	const convertCodeInput = el('convertCodeInput');
	const convertTextInput = el('convertTextInput');
	const convertCancelBtn = el('convertCancelBtn');
	const convertSaveBtn = el('convertSaveBtn');

	on(el('convertTextBtn'), 'click', () => {
		if (convertTextModal) convertTextModal.classList.remove('hidden');
		if (convertCodeInput) convertCodeInput.value = '';
		if (convertTextInput) convertTextInput.value = '';
	});

	on(convertCancelBtn, 'click', () => {
		if (convertTextModal) convertTextModal.classList.add('hidden');
	});

	on(convertSaveBtn, 'click', () => {
		const code = convertCodeInput.value.trim();
		const text = convertTextInput.value;
		if (!code) return alert('Código necessário');

		if (hotstringsRef[code] && !confirm('Sobrescrever?')) return;

		hotstringsRef[code] = text;
		if (convertTextModal) convertTextModal.classList.add('hidden');
		renderHotstringsList();
		renderEditorTable();
	});

	// Reset
	on(el('resetBtn'), 'click', () => {
		if (confirm('Restaurar todas as hotstrings para o padrão original? Isso apagará suas edições.')) {
			// Limpa objeto atual
			for (const k of Object.keys(hotstringsRef)) delete hotstringsRef[k];
			// Copia do padrão
			Object.assign(hotstringsRef, DEFAULT_HOTSTRINGS);

			renderHotstringsList();
			renderEditorTable();
			alert('Restaurado para o padrão.');
		}
	});

	// Export
	on(el('exportBtn'), 'click', () => {
		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(hotstringsRef, null, 2));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', 'hotstrings_backup.json');
		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	});

	// Import
	on(el('importInput'), 'change', (e) => {
		const file = e.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const obj = JSON.parse(event.target.result);
				if (obj && typeof obj === 'object') {
					if (confirm('Importar este arquivo substituirá sua lista atual. Continuar?')) {
						for (const k of Object.keys(hotstringsRef)) delete hotstringsRef[k];
						Object.assign(hotstringsRef, obj);
						renderHotstringsList();
						renderEditorTable();
						alert('Importado com sucesso!');
					}
				} else {
					alert('Arquivo inválido.');
				}
			} catch (err) {
				alert('Erro ao ler JSON: ' + err.message);
			}
		};
		reader.readAsText(file);
		e.target.value = '';
	});

	// Initial Render of Editor
	renderEditorTable();

	// =========================
	// Toggle SUS (Receita) — IDS CORRETOS
	// =========================
	const checkboxReceita = el('mostrarLogoSus');
	const logoSusReceita = el('logoSus'); // ✅ existe
	const textoViaReceita = el('textoViaDigital'); // ✅ existe

	function syncLogoReceita() {
		if (!checkboxReceita || !logoSusReceita || !textoViaReceita) return;

		if (checkboxReceita.checked) {
			logoSusReceita.classList.remove('hidden');
			textoViaReceita.classList.add('hidden');
		} else {
			logoSusReceita.classList.add('hidden');
			textoViaReceita.classList.remove('hidden');
		}
	}
	on(checkboxReceita, 'change', syncLogoReceita);
	syncLogoReceita();

	// =========================
	// Toggle rows (com estado inicial)
	// =========================
	function bindRowToggle(checkboxId, rowId) {
		const cb = el(checkboxId);
		const row = el(rowId);
		if (!cb || !row) return;

		const apply = () => row.classList.toggle('hidden', !cb.checked);
		on(cb, 'change', apply);
		apply();
	}

	bindRowToggle('mostrarMedico', 'rowMedico');
	bindRowToggle('mostrarLocal', 'rowLocal');
	bindRowToggle('mostrarEndereco', 'rowEndereco');

	// =========================
	// Inicializa lista
	// =========================
	renderHotstringsList();

	// =========================
	// Binds de Segurança para a Toolbar Prescrição
	// (Garante funcionalidade única e correta)
	// =========================
	const btnPrintRec = el('printBtnrec');
	if (btnPrintRec) {
		btnPrintRec.onclick = (e) => {
			e.preventDefault();
			window.print();
		};
	}

	const btnClearRec = el('clearBtn');
	if (btnClearRec) {
		btnClearRec.onclick = (e) => {
			e.preventDefault();
			if (confirm('Tem certeza que deseja limpar toda a prescrição?')) {
				const ta = el('textArea');
				const rxPrint = el('rxPrint');
				if (ta) {
					ta.value = '';
					if (rxPrint) rxPrint.textContent = ''; // Força atualização visual imediata
					// Dispara input para atualizar outros ouvintes com bubbling
					ta.dispatchEvent(new Event('input', { bubbles: true }));
					ta.focus();
				}
				// Limpar campos de paciente/data também?
				// Por segurança, mantemos os dados demográficos.
			}
		};
	}

	const btnCopyRec = el('copyBtn');
	if (btnCopyRec) {
		btnCopyRec.onclick = async (e) => {
			e.preventDefault();
			const ta = el('textArea');
			if (!ta || !ta.value) {
				flashBtn(btnCopyRec, 'Vazio!');
				return;
			}
			try {
				await copyToClipboard(ta.value);
				flashBtn(btnCopyRec, 'Copiado!');
			} catch (err) {
				console.error(err);
				alert('Erro ao copiar');
			}
		};
	}

	function mostrarCNES() {
		const select = document.getElementById('select-unidade');
		const container = document.getElementById('cnes-container');
		const input = document.getElementById('input-cnes');
		const cnes = select.value;

		if (cnes) {
			input.value = cnes;
			container.style.display = 'flex';
		} else {
			container.style.display = 'none';
			input.value = '';
		}
	}

	function inserirCNES() {
		const cnes = document.getElementById('input-cnes').value;

		if (!cnes) {
			if (typeof Swal !== 'undefined') {
				Swal.fire({
					toast: true,
					position: 'top-end',
					icon: 'warning',
					title: 'Nenhum CNES selecionado',
					showConfirmButton: false,
					timer: 2000,
				});
			} else {
				alert('Nenhum CNES selecionado');
			}
			return;
		}

		// Insere o CNES no campo de busca
		const campoBusca = document.getElementById('busca-cnes');
		if (campoBusca) {
			campoBusca.value = cnes;

			// Busca o botão de buscar (próximo ao input)
			const btnBuscar = campoBusca.parentElement.querySelector('button');

			// Dispara a busca automaticamente
			if (btnBuscar && typeof preencherCNES === 'function') {
				preencherCNES(cnes, btnBuscar);
			} else {
				// Se não encontrou a função, mostra toast de sucesso
				if (typeof Swal !== 'undefined') {
					Swal.fire({
						toast: true,
						position: 'top-end',
						icon: 'success',
						title: 'CNES inserido no campo de busca!',
						showConfirmButton: false,
						timer: 2000,
						timerProgressBar: true,
					});
				} else {
					alert('CNES inserido no campo de busca!');
				}
			}

			// Scroll suave até o campo de busca
			campoBusca.scrollIntoView({ behavior: 'smooth', block: 'center' });
			campoBusca.focus();
		} else {
			console.error('Campo busca-cnes não encontrado');
			if (typeof Swal !== 'undefined') {
				Swal.fire({
					icon: 'error',
					title: 'Erro',
					text: 'Campo de busca não encontrado',
					confirmButtonColor: '#dc2626',
				});
			}
		}
	}
	const API_URL = 'https://cnes-gtmedic.replit.app';

	// Toast customizado pequeno
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
				title: 'Atenção',
				text: 'Digite um código CNES válido',
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

			// Toast pequeno
			Toast.fire({
				icon: 'success',
				title: 'Dados carregados!',
			});
		} catch (error) {
			console.error('❌ Erro:', error);

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

	// --- Configuração Principal do Editor (ContentEditable) ---
	let editorDiv = document.getElementById('textArea');
	let limitWarning = document.getElementById('limitWarning');
	const maxFontSize = 12;
	const minFontSize = 7;
	let isBlocked = false;

	// Garante referência global aos hotstrings
	function ensureHotstrings() {
		if (!window.hotstringsRef && window.hotstrings) {
			window.hotstringsRef = window.hotstrings;
		}
	}
	ensureHotstrings();
	setInterval(ensureHotstrings, 500);

	// --- Auto-Resize da Fonte e Bloqueio ---
	function adjustFontSize() {
		if (!editorDiv) return false;
		let currentSize = parseFloat(window.getComputedStyle(editorDiv).fontSize) || maxFontSize;

		const isOverflowing = () => editorDiv.scrollHeight > editorDiv.clientHeight;

		// 1. Reduz se estiver estourando
		if (isOverflowing()) {
			while (isOverflowing() && currentSize > minFontSize) {
				currentSize -= 0.5;
				editorDiv.style.fontSize = currentSize + 'px';
			}
		}
		// 2. Se NÃO estiver estourando, tenta aumentar
		else if (currentSize < maxFontSize) {
			let attempts = 0;
			const maxAttempts = 20;

			while (!isOverflowing() && currentSize < maxFontSize && attempts < maxAttempts) {
				const nextSize = currentSize + 0.5;
				editorDiv.style.fontSize = nextSize + 'px';

				if (isOverflowing()) {
					editorDiv.style.fontSize = currentSize + 'px';
					break;
				}
				currentSize = nextSize;
				attempts++;
			}
		}

		// Atualiza estado de bloqueio
		const hitLimit = isOverflowing() && currentSize <= minFontSize;
		isBlocked = hitLimit;

		if (hitLimit) {
			limitWarning.style.display = 'block';
		} else {
			limitWarning.style.display = 'none';
		}

		return hitLimit;
	}

	// --- Hotstrings ---
	function tryExpandActiveWord() {
		ensureHotstrings();
		if (!window.hotstringsRef) return false;

		const sel = window.getSelection();
		if (!sel.rangeCount) return false;
		const range = sel.getRangeAt(0);
		const node = range.endContainer;

		if (node.nodeType !== Node.TEXT_NODE) return false;

		const text = node.textContent;
		const caretPos = range.endOffset;
		const textBefore = text.slice(0, caretPos);

		const match = textBefore.match(/(\S+)$/);
		if (!match) return false;

		const code = match[0];
		const content = window.hotstringsRef[code] || window.hotstringsRef[code.toLowerCase()];

		if (content) {
			const rangeToReplace = document.createRange();
			rangeToReplace.setStart(node, match.index);
			rangeToReplace.setEnd(node, caretPos);

			sel.removeAllRanges();
			sel.addRange(rangeToReplace);
			document.execCommand('insertText', false, content);

			// ✅ CORREÇÃO: Reposiciona o cursor no final do texto inserido
			const newRange = document.createRange();
			const newNode = sel.anchorNode;

			if (newNode && newNode.nodeType === Node.TEXT_NODE) {
				const newPos = sel.anchorOffset;
				newRange.setStart(newNode, newPos);
				newRange.collapse(true);

				sel.removeAllRanges();
				sel.addRange(newRange);
			}

			// Garante que o editor mantenha o foco
			editorDiv.focus();

			adjustFontSize();
			return true;
		}
		return false;
	}

	function handleEditorKeydown(e) {
		const allowedKeys = ['Backspace', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'];

		// Bloqueia apenas teclas de inserção quando no limite
		if (isBlocked) {
			const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;
			const isAllowedKey = allowedKeys.includes(e.key);

			// Permite: teclas permitidas, atalhos (Ctrl+C, etc), e teclas de função
			if (!isAllowedKey && !isModifierKey && e.key.length === 1) {
				e.preventDefault();
				return;
			}
		}

		if (e.key === ' ' || e.key === 'Enter') {
			if (tryExpandActiveWord()) {
				e.preventDefault();
			}
		}
	}

	// Bloqueia paste quando no limite
	function handleBeforeInput(e) {
		const blockedInputTypes = ['insertFromPaste', 'insertFromDrop', 'insertText', 'insertLineBreak', 'insertParagraph'];

		if (isBlocked && blockedInputTypes.includes(e.inputType)) {
			e.preventDefault();
		}
	}

	// --- Inicialização ---
	window.addEventListener('load', () => {
		setTimeout(() => {
			console.log('Gt-Medic: Inicializando editor...');

			const oldEditor = document.getElementById('textArea');
			if (oldEditor) {
				const newEditor = oldEditor.cloneNode(true);
				oldEditor.parentNode.replaceChild(newEditor, oldEditor);

				// Atualiza referências
				editorDiv = newEditor;
				limitWarning = document.getElementById('limitWarning');

				// Conecta listeners
				editorDiv.addEventListener('keydown', handleEditorKeydown);
				editorDiv.addEventListener('beforeinput', handleBeforeInput);
				editorDiv.addEventListener('input', adjustFontSize);
				editorDiv.addEventListener('paste', (e) => {
					if (isBlocked) e.preventDefault();
				});

				// Define fonte inicial
				editorDiv.style.fontSize = maxFontSize + 'px';
				adjustFontSize();
			}

			// --- OVERRIDES GLOBAIS ---
			window.insertAtCursor = function (textOrCode) {
				if (!textOrCode || isBlocked) return;
				const expanded = window.hotstringsRef && (window.hotstringsRef[textOrCode] || window.hotstringsRef[textOrCode.toLowerCase()]);
				const contentToInsert = expanded || textOrCode;
				if (editorDiv) {
					editorDiv.focus();
					document.execCommand('insertText', false, contentToInsert);
					adjustFontSize();
				}
			};

			window.copyToClipboard = function () {
				if (!editorDiv) return;
				const text = editorDiv.innerText;
				navigator.clipboard
					.writeText(text)
					.then(() => {
						const btn = document.getElementById('btnCopyRec');
						if (btn) {
							const original = btn.textContent;
							btn.textContent = 'Copiado!';
							setTimeout(() => (btn.textContent = original || 'Copiar'), 1500);
						}
					})
					.catch((err) => console.error('Erro ao copiar', err));
			};

			window.tryExpandHotstring = function () {
				return false;
			};

			// --- Sidebar Interception ---
			const sidebarPanel = document.getElementById('hotstringItems');
			if (sidebarPanel) {
				sidebarPanel.addEventListener(
					'click',
					(e) => {
						if (isBlocked) return;

						const btn = e.target.closest('button');
						if (!btn) return;
						const codeEl = btn.querySelector('.font-mono');
						if (codeEl) {
							const code = codeEl.textContent.trim();

							ensureHotstrings();
							const content = window.hotstringsRef && (window.hotstringsRef[code] || window.hotstringsRef[code.toLowerCase()]);

							if (content) {
								e.preventDefault();
								e.stopImmediatePropagation();

								if (editorDiv) {
									editorDiv.focus();

									// Salva posição do cursor antes
									const sel = window.getSelection();
									const hadRange = sel.rangeCount > 0;

									document.execCommand('insertText', false, content);

									// ✅ Garante que o cursor permaneça no editor
									setTimeout(() => {
										editorDiv.focus();

										// Move cursor para o final se necessário
										if (sel.rangeCount > 0) {
											const range = sel.getRangeAt(0);
											range.collapse(false); // false = final
											sel.removeAllRanges();
											sel.addRange(range);
										}
									}, 0);

									adjustFontSize();
								}
							}
						}
					},
					true,
				);
			}
		}, 200);
		window.addEventListener('resize', adjustFontSize);
	});
})();
