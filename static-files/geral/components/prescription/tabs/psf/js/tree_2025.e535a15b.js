/**
 * Gerador de Esquema de Árvore
 * Convertido de tree_2025.html — layout original preservado
 * Dependência externa: Viz.js (carregado sob demanda)
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
			.neu-form-textarea{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;min-height:100px;resize:vertical;transition:box-shadow .2s}
			.neu-form-textarea:focus{outline:none}
		`;
		document.head.appendChild(s);
	}

	/** Carrega Viz.js sob demanda */
	function loadVizJs() {
		return new Promise((resolve, reject) => {
			if (window.Viz) { resolve(); return; }
			const s1 = document.createElement('script');
			s1.src = 'https://cdn.jsdelivr.net/npm/viz.js@2.1.2/viz.js';
			s1.onload = () => {
				const s2 = document.createElement('script');
				s2.src = 'https://cdn.jsdelivr.net/npm/viz.js@2.1.2/full.render.js';
				s2.onload = resolve;
				s2.onerror = reject;
				document.head.appendChild(s2);
			};
			s1.onerror = reject;
			document.head.appendChild(s1);
		});
	}

	class TreeNode {
		constructor(name) {
			this.name = name;
			this.children = [];
		}
	}

	function parseMarkdown(text) {
		const lines = text.split('\n');
		const root = new TreeNode('root');
		const stack = [[-1, root]];

		for (let line of lines) {
			if (!line.trim()) continue;
			const stripped = line.trimLeft();
			if (!stripped.match(/^[-*+]\s/)) continue;

			const indent = line.length - stripped.length;
			const level = Math.floor(indent / 2);
			const name = stripped.replace(/^[-*+]\s/, '');
			const node = new TreeNode(name);

			while (stack.length > 0 && stack[stack.length - 1][0] >= level) {
				stack.pop();
			}
			if (stack.length > 0) {
				stack[stack.length - 1][1].children.push(node);
			}
			stack.push([level, node]);
		}
		return root;
	}

	function escapeLabel(str) {
		return str.replace(/"/g, '\\"');
	}

	function generateDotFormat(node, dot, nodeId, parentId) {
		dot = dot || [];
		nodeId = nodeId || 0;
		parentId = parentId === undefined ? null : parentId;

		const currentId = 'node' + nodeId;
		dot.push('  "' + currentId + '" [label="' + escapeLabel(node.name) + '"]');

		if (parentId !== null) {
			dot.push('  "' + parentId + '" -> "' + currentId + '"');
		}

		let nextId = nodeId + 1;
		for (const child of node.children) {
			const result = generateDotFormat(child, [], nextId, currentId);
			dot.push.apply(dot, result[0]);
			nextId = result[1];
		}
		return [dot, nextId];
	}

	function generateTextTree(node, prefix) {
		prefix = prefix || '';
		let result = [];
		const children = node.children;

		for (let i = 0; i < children.length; i++) {
			const isLast = i === children.length - 1;
			const connector = isLast ? '└── ' : '├── ';
			result.push(prefix + connector + children[i].name);

			if (children[i].children.length > 0) {
				const newPrefix = prefix + (isLast ? '    ' : '│   ');
				result = result.concat(generateTextTree(children[i], newPrefix));
			}
		}
		return result;
	}

	function renderTree() {
		const container = document.getElementById('psf_sub_tree');
		if (!container) {
			console.error('[Tree] Container #psf_sub_tree não encontrado');
			return;
		}

		injectNeuCSS();

		container.innerHTML = `
			<div class="p-4">
				<header class="text-center flex flex-row justify-start gap-6 m-6">
					<h1 class="text-3xl font-bold text-center mb-6 text-[#23217c]">Gerador de esquema árvore</h1>
				</header>

				<div class="neu-card grid grid-cols-1 md:grid-cols-2 gap-4">
					<!-- Input Section -->
					<div class="rounded-xl p-8 m-2 shadow">
						<h2 class="text-xl font-semibold mb-3 text-[#23217c]">Inserir ou digitar o esquema:</h2>
						<textarea id="tree_markdownInput" class="neu-form-textarea w-full h-64 p-2 border-0 rounded-xl" placeholder="Enter your markdown content here...">- </textarea>
						<button type="button" id="tree_generateBtn" class="neu-btn neu-btn-primary mt-3">Gerar Diagrama</button>
					</div>

					<!-- Output Section -->
					<div class="rounded-xl p-8 m-2 shadow">
						<h2 class="text-xl font-semibold mb-3 text-[#23217c]">Saída .SVG</h2>
						<div id="tree_svgOutput" class="neu-inset w-full max-h-[600px] p-2 overflow-auto border-0 rounded-xl"></div>
						<div class="mb-3">
							<h3 class="text-xl font-semibold mt-3 mb-3 text-[#23217c]">Saída .TXT</h3>
							<pre id="tree_textOutput" class="neu-inset p-2 border-0 rounded-xl text-xl overflow-auto max-h-[600px]"></pre>
						</div>
						<div class="flex gap-2">
							<button type="button" id="tree_downloadSvgBtn" class="neu-btn neu-btn-success">Download SVG</button>
							<button type="button" id="tree_downloadTxtBtn" class="neu-btn neu-btn-info">Download Text</button>
						</div>
					</div>
				</div>
			</div>
		`;

		const textarea = document.getElementById('tree_markdownInput');
		const generateBtn = document.getElementById('tree_generateBtn');
		const downloadSvgBtn = document.getElementById('tree_downloadSvgBtn');
		const downloadTxtBtn = document.getElementById('tree_downloadTxtBtn');

		// Handle tab key
		textarea.addEventListener('keydown', function (e) {
			if (e.key === 'Tab') {
				e.preventDefault();
				const start = this.selectionStart;
				const end = this.selectionEnd;
				const value = this.value;
				this.value = value.substring(0, start) + '  ' + value.substring(end);
				this.selectionStart = this.selectionEnd = start + 2;
			}
		});

		// Handle enter key
		textarea.addEventListener('keydown', function (e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				const start = this.selectionStart;
				const value = this.value;
				const lines = value.substring(0, start).split('\n');
				const currentLine = lines[lines.length - 1];

				const match = currentLine.match(/^\s*/);
				const indentation = match ? match[0] : '';
				const level = Math.floor(indentation.length / 2);

				let bullet = '';
				switch (level % 3) {
					case 0: bullet = '- '; break;
					case 1: bullet = '* '; break;
					case 2: bullet = '+ '; break;
				}

				const insertion = '\n' + indentation + bullet;
				this.value = value.substring(0, start) + insertion + value.substring(start);
				this.selectionStart = this.selectionEnd = start + insertion.length;
			}
		});

		async function generateDiagram() {
			try {
				await loadVizJs();
			} catch (err) {
				console.error('[Tree] Erro ao carregar Viz.js:', err);
				document.getElementById('tree_svgOutput').innerHTML = '<div class="p-4 text-red-500">Erro ao carregar Viz.js</div>';
				return;
			}

			const markdownText = textarea.value;
			const root = parseMarkdown(markdownText);

			const result = generateDotFormat(root);
			const dotContent = 'digraph G {\n  node [shape=box]\n  rankdir=TB\n' + result[0].join('\n') + '\n}';

			var viz = new Viz();
			try {
				const svg = await viz.renderString(dotContent);
				document.getElementById('tree_svgOutput').innerHTML = svg;
				const textTree = generateTextTree(root);
				document.getElementById('tree_textOutput').textContent = textTree.join('\n');
			} catch (error) {
				console.error(error);
				document.getElementById('tree_svgOutput').innerHTML = '<div class="text-red-500">Error: ' + error.message + '</div>';
			}
		}

		function downloadSVG() {
			const svg = document.querySelector('#tree_svgOutput svg');
			if (!svg) return;
			const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'tree-diagram.svg';
			a.click();
			URL.revokeObjectURL(url);
		}

		function downloadText() {
			const text = document.getElementById('tree_textOutput').textContent;
			if (!text) return;
			const blob = new Blob([text], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'tree-diagram.txt';
			a.click();
			URL.revokeObjectURL(url);
		}

		generateBtn.addEventListener('click', generateDiagram);
		downloadSvgBtn.addEventListener('click', downloadSVG);
		downloadTxtBtn.addEventListener('click', downloadText);

		console.log('[Tree] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_tree')) {
		renderTree();
	}

	window.renderTree = renderTree;
})();
