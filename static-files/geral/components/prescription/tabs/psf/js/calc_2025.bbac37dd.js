/**
 * Calculadoras Medicas Consolidadas
 * Convertido de calc_2025.html -- layout original preservado
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

	function injectCalcCSS() {
		if (document.getElementById('calc-extra-styles')) return;
		const s = document.createElement('style');
		s.id = 'calc-extra-styles';
		s.textContent = `
			.calc-app-container{width:100%;display:grid;grid-template-columns:220px 1fr;gap:20px;min-height:400px}
			.calc-nav{display:flex;flex-direction:column;gap:12px;padding:12px;align-items:stretch}
			.calc-nav-btn{display:flex;align-items:center;gap:10px;padding:12px 16px;border:none;border-radius:60px;background:#e0e5ec;color:#5f6775;font-weight:600;font-size:12px;cursor:pointer;transition:all .2s;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;text-align:left;white-space:nowrap}
			.calc-nav-btn:hover{color:#007bff;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}
			.calc-nav-btn:active,.calc-nav-btn.active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;color:#23217c}
			.calc-content-area{padding:16px}
			.calc-container{display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:600px;margin:0 auto}
			.calc-form-group{margin-bottom:16px;display:flex;flex-direction:row;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap}
			.calc-form-label{font-size:13px;font-weight:500;color:#5f6775;min-width:160px;text-align:right}
			.calc-form-input{padding:10px 14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:13px;box-shadow:inset 4px 4px 8px #c1c9d2,inset -4px -4px 8px #fff;height:36px;transition:box-shadow .2s;max-width:200px;width:100%}
			.calc-form-input:focus{outline:none;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff}
			.calc-form-select{padding:10px 14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:13px;box-shadow:inset 4px 4px 8px #c1c9d2,inset -4px -4px 8px #fff;transition:box-shadow .2s;max-width:200px;width:100%}
			.calc-form-select:focus{outline:none}
			.calc-result{margin-top:16px;padding:16px;border-radius:24px;background:#e0e5ec;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;min-height:60px;width:100%;font-size:13px}
			.calc-result h4{font-size:15px;font-weight:700;color:#23217c;margin-bottom:8px}
			.calc-result p{margin:4px 0;line-height:1.5}
			.calc-result .text-danger{color:#dc3545;font-weight:600}
			.calc-mini-muted{font-size:11px;color:#8a99aa;margin-top:6px}
			.calc-codebox{background:#e0e5ec;border-radius:12px;padding:12px;box-shadow:inset 4px 4px 8px #c1c9d2,inset -4px -4px 8px #fff;font-family:'Courier New',monospace;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-all;margin:8px 0}
			.calc-hr-soft{border:none;border-top:1px solid #d1d9e6;margin:12px 0}
			.calc-info-box{padding:14px;border-radius:18px;background:#e0e5ec;box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;font-size:12px;margin-bottom:16px}
			.calc-row-2{display:flex;flex-direction:column;gap:4px;width:100%}
			.calc-badge{display:inline-block;padding:6px 14px;border-radius:60px;color:#fff;font-weight:700;font-size:12px;margin:6px 0}
			.calc-badge-ok{background:#28a745}
			.calc-badge-warn{background:#ffc107;color:#333}
			.calc-badge-bad{background:#dc3545}
			.calc-toggle-switch{position:relative;display:inline-block;width:54px;height:28px}
			.calc-toggle-switch input{opacity:0;width:0;height:0}
			.calc-toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#e0e5ec;transition:.4s;border-radius:60px;box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff}
			.calc-toggle-slider:before{position:absolute;content:'';height:22px;width:22px;left:3px;bottom:3px;background:#e0e5ec;transition:.4s;border-radius:50%;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}
			input:checked+.calc-toggle-slider:before{transform:translateX(26px)}
			.calc-risk-options{display:flex;flex-direction:column;gap:6px;align-items:start;font-size:12px}
			.calc-risk-options label{display:flex;align-items:center;gap:6px;cursor:pointer}
			.calc-nori-info{padding:14px;border-radius:18px;background:#e0e5ec;box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;font-size:12px;margin-bottom:16px}
			.calc-nori-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:10px}
			.calc-nori-grid details{padding:8px}
			.calc-nori-grid summary{cursor:pointer;color:#007bff;margin-bottom:6px;font-size:12px}
			.calc-nori-grid ul{margin-left:16px;margin-top:6px;list-style:disc}
			.calc-nori-grid li{font-size:11px;margin-bottom:4px}
			.calc-nori-table{width:100%;border-collapse:separate;border-spacing:6px;margin:12px 0;font-size:12px}
			.calc-nori-table th,.calc-nori-table td{padding:8px;text-align:center;background:#e0e5ec;border-radius:12px;box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff}
			.calc-nori-table th{background:#007bff;color:#fff;font-weight:600;box-shadow:none}
			.calc-nori-alert{padding:12px;margin:8px 0;border-radius:12px;background:#fff3e0;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;font-size:12px}
			.calc-nori-warning{background:#ffebee;color:#dc3545}
			.calc-nori-details{margin:12px 0;padding:12px;background:#e0e5ec;border-radius:12px;box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;font-size:12px}
			.calc-home-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;padding:10px}
			.calc-home-btn{display:flex;align-items:center;gap:10px;padding:14px 18px;border:none;border-radius:18px;background:#e0e5ec;color:#5f6775;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s;box-shadow:4px 4px 8px #c1c9d2,-4px -4px 8px #fff;text-align:left}
			.calc-home-btn:hover{color:#007bff;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}
			.calc-home-btn:active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff}
			@media(max-width:700px){
				.calc-app-container{grid-template-columns:1fr;grid-template-rows:auto 1fr}
				.calc-nav{flex-direction:row;flex-wrap:wrap;justify-content:center}
				.calc-nav-btn{font-size:11px;padding:8px 12px}
			}
		`;
		document.head.appendChild(s);
	}

	function renderCalc() {
		const container = document.getElementById('psf_sub_calc');
		if (!container) {
			console.error('[Calc] Container #psf_sub_calc nao encontrado');
			return;
		}

		injectNeuCSS();
		// injectCalcCSS();

		container.innerHTML = `
			<div class="calc-app-container">
				<nav class="calc-nav neu-inset">
					<button type="button" class="calc-nav-btn" data-calc="gfr"><i class="fa-solid fa-droplet"></i> TFG</button>
					<button type="button" class="calc-nav-btn" data-calc="cv"><i class="fa-solid fa-heart-pulse"></i> Risco Cardio.</button>
					<button type="button" class="calc-nav-btn" data-calc="bmi"><i class="fa-solid fa-weight-scale"></i> IMC</button>
					<button type="button" class="calc-nav-btn" data-calc="ga"><i class="fa-solid fa-baby"></i> Idade Gesta.</button>
					<button type="button" class="calc-nav-btn" data-calc="cga"><i class="fa-solid fa-calendar-plus"></i> Id. Corrigida</button>
					<button type="button" class="calc-nav-btn" data-calc="bili"><i class="fa-solid fa-vial"></i> Bilirrubina Neo</button>
					<button type="button" class="calc-nav-btn" data-calc="nori"><i class="fa-solid fa-syringe"></i> Noripurum</button>
				</nav>
				<section class="calc-content-area">
					<div id="calc_home-title" class="mb-4">
						<h2 class="text-xl font-bold flex items-center gap-3 text-[#23217c] mb-4">
							<i class="fa-solid fa-calculator"></i> Calculadoras Medicas
						</h2>
						<div id="calc_home-grid" class="calc-home-grid"></div>
					</div>
					<div id="calc_container"></div>
				</section>
			</div>
		`;

		// ===============================
		//  STATE & HELPERS
		// ===============================
		let activeCalcController = null;

		const CALCS = [
			{ key: 'gfr', icon: 'fa-droplet', name: 'CKD-EPI (TFG)', color: '#dc3545' },
			{ key: 'cv', icon: 'fa-heart-pulse', name: 'Risco Cardiovascular', color: '#e91e8f' },
			{ key: 'bmi', icon: 'fa-weight-scale', name: 'IMC', color: '#007bff' },
			{ key: 'ga', icon: 'fa-baby', name: 'Idade Gestacional', color: '#7c3aed' },
			{ key: 'cga', icon: 'fa-calendar-plus', name: 'IG Corrigida', color: '#0d9488' },
			{ key: 'bili', icon: 'fa-vial', name: 'Bilirrubina Neonatal', color: '#d97706' },
			{ key: 'nori', icon: 'fa-syringe', name: 'Noripurum (Ferro EV)', color: '#ea580c' },
		];

		const homeTitle = document.getElementById('calc_home-title');
		const calcContainer = document.getElementById('calc_container');
		const homeGrid = document.getElementById('calc_home-grid');

		// Build home grid buttons
		CALCS.forEach(function (c) {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'calc-home-btn';
			btn.setAttribute('data-calc', c.key);
			btn.innerHTML = '<i class="fa-solid ' + c.icon + '" style="color:' + c.color + '"></i> ' + c.name;
			homeGrid.appendChild(btn);
		});

		function readNumber(id) {
			const el = document.getElementById(id);
			const raw = String(el && el.value !== undefined ? el.value : '').trim();
			if (!raw) return NaN;
			const normalized = raw.replace(',', '.');
			const n = Number(normalized);
			return Number.isFinite(n) ? n : NaN;
		}

		function readInt(id) {
			const n = readNumber(id);
			if (!Number.isFinite(n)) return NaN;
			return Math.trunc(n);
		}

		function parseISODateLocal(iso) {
			if (!iso) return null;
			const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso).trim());
			if (!m) return null;
			const y = Number(m[1]);
			const mo = Number(m[2]);
			const d = Number(m[3]);
			const dt = new Date(y, mo - 1, d);
			return Number.isNaN(dt.getTime()) ? null : dt;
		}

		function diffDaysLocal(from, to) {
			const MS_PER_DAY = 24 * 60 * 60 * 1000;
			const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
			const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
			return Math.floor((b - a) / MS_PER_DAY);
		}

		function clamp(n, min, max) {
			return Math.max(min, Math.min(max, n));
		}

		function formatPct(n) {
			return n.toFixed(1) + '%';
		}

		function errorBox(msg) {
			return '<p class="text-danger"><strong>Erro:</strong> ' + msg + '</p>';
		}

		function okBox(html) {
			return '<div>' + html + '</div>';
		}

		function setHtml(id, html) {
			const el = document.getElementById(id);
			if (el) el.innerHTML = html;
		}

		function onClickId(id, handler, signal) {
			const el = document.getElementById(id);
			if (!el) return;
			el.addEventListener('click', handler, { signal: signal });
		}

		function copyToClipboard(text) {
			try {
				if (navigator.clipboard && window.isSecureContext) {
					return navigator.clipboard.writeText(text).then(function () {
						return true;
					});
				}
			} catch (e) {
				/* fallback below */
			}
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.style.position = 'fixed';
			ta.style.left = '-9999px';
			document.body.appendChild(ta);
			ta.focus();
			ta.select();
			let ok = false;
			try {
				ok = document.execCommand('copy');
			} catch (e) {
				/* ignore */
			}
			document.body.removeChild(ta);
			return Promise.resolve(ok);
		}

		// ===============================
		//  SHOW HOME / SHOW CALCULATOR
		// ===============================
		function showHome() {
			if (activeCalcController) activeCalcController.abort();
			activeCalcController = null;
			homeTitle.style.display = '';
			calcContainer.innerHTML = '';
			// Remove active state from nav
			container.querySelectorAll('.calc-nav-btn').forEach(function (b) {
				b.classList.remove('active');
			});
		}

		function showCalculator(contentHtml, afterMount) {
			if (activeCalcController) activeCalcController.abort();
			activeCalcController = new AbortController();
			homeTitle.style.display = 'none';
			calcContainer.innerHTML = contentHtml;
			if (typeof afterMount === 'function') {
				afterMount(activeCalcController.signal);
			}
		}

		// ===============================
		//  1) TFG -- CKD-EPI 2021
		// ===============================
		function egfrCkdEpi2021(age, scrMgDl, female) {
			const kappa = female ? 0.7 : 0.9;
			const alpha = female ? -0.241 : -0.302;
			const scr_k = scrMgDl / kappa;
			const minPart = Math.pow(Math.min(scr_k, 1), alpha);
			const maxPart = Math.pow(Math.max(scr_k, 1), -1.2);
			let egfr = 142 * minPart * maxPart * Math.pow(0.9938, age);
			if (female) egfr *= 1.012;
			return egfr;
		}

		function getCKDStage(gfr) {
			if (gfr >= 90) return 'Estagio 1';
			if (gfr >= 60) return 'Estagio 2';
			if (gfr >= 45) return 'Estagio 3a';
			if (gfr >= 30) return 'Estagio 3b';
			if (gfr >= 15) return 'Estagio 4';
			return 'Estagio 5';
		}

		function openGFRCalculator() {
			const html =
				'<div class="calc-container">' +
				'<h3 class="text-lg font-bold text-[#23217c] mb-4"><i class="fa-solid fa-droplet mr-2"></i>Calculadora CKD-EPI (2021)</h3>' +
				'<div class="calc-row-2">' +
				'<div class="calc-form-group">' +
				'<label for="calc_gfr-age" class="calc-form-label">Idade:</label>' +
				'<input type="number" id="calc_gfr-age" min="18" max="120" class="calc-form-input" inputmode="numeric" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<span class="calc-form-label"><i class="fa-solid fa-mars"></i> Masc.</span>' +
				'<label class="calc-toggle-switch">' +
				'<input type="checkbox" id="calc_gfr-gender" />' +
				'<span class="calc-toggle-slider"></span>' +
				'</label>' +
				'<span class="calc-form-label"><i class="fa-solid fa-venus"></i> Fem.</span>' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_gfr-cr" class="calc-form-label">Creatinina (mg/dL):</label>' +
				'<input type="number" id="calc_gfr-cr" step="0.01" min="0.1" max="20" class="calc-form-input" inputmode="decimal" />' +
				'</div>' +
				'</div>' +
				'<div class="calc-mini-muted">Use ponto ou virgula para decimais.</div>' +
				'<div class="neu-btn-container">' +
				'<button type="button" id="calc_gfr-calc" class="neu-btn neu-btn-primary">Calcular</button>' +
				'<button type="button" id="calc_gfr-clear" class="neu-btn">Limpar</button>' +
				'</div>' +
				'<div id="calc_gfr-result" class="calc-result"></div>' +
				'</div>';

			showCalculator(html, function (signal) {
				onClickId(
					'calc_gfr-calc',
					function () {
						const age = readNumber('calc_gfr-age');
						const scr = readNumber('calc_gfr-cr');
						const female = document.getElementById('calc_gfr-gender').checked;
						const rid = 'calc_gfr-result';

						if (!Number.isFinite(age) || age < 18 || age > 120) {
							setHtml(rid, errorBox('Idade invalida (18 a 120).'));
							return;
						}
						if (!Number.isFinite(scr) || scr < 0.1 || scr > 20) {
							setHtml(rid, errorBox('Creatinina invalida (0,1 a 20 mg/dL).'));
							return;
						}

						const egfr = egfrCkdEpi2021(age, scr, female);
						const stage = getCKDStage(egfr);

						setHtml(
							rid,
							okBox(
								'<h4>Resultado:</h4>' +
									'<p>eGFR (CKD-EPI 2021): <strong>' +
									egfr.toFixed(0) +
									' mL/min/1.73 m\u00B2</strong></p>' +
									'<p>Estagio DRC: <strong>' +
									stage +
									'</strong></p>' +
									'<hr class="calc-hr-soft"/>' +
									'<div class="calc-mini-muted">Observacao: estimativa baseada em creatinina (IDMS). Interprete no contexto clinico.</div>',
							),
						);
					},
					signal,
				);

				onClickId(
					'calc_gfr-clear',
					function () {
						document.getElementById('calc_gfr-age').value = '';
						document.getElementById('calc_gfr-cr').value = '';
						document.getElementById('calc_gfr-gender').checked = false;
						setHtml('calc_gfr-result', '');
					},
					signal,
				);
			});
		}

		// ===============================
		//  2) Risco Cardiovascular -- Framingham General CVD
		// ===============================
		function framinghamGeneralCvd10yRisk(sex, age, totalChol, hdl, sbp, treated, smoker, diabetes) {
			const ln = Math.log;

			if (sex === 'F') {
				const sum = 2.32888 * ln(age) + 1.20904 * ln(totalChol) + -0.70833 * ln(hdl) + (treated ? 2.82263 : 2.76157) * ln(sbp) + 0.52873 * (smoker ? 1 : 0) + 0.69154 * (diabetes ? 1 : 0);
				const mean = 26.1931;
				const s0 = 0.95012;
				return 1 - Math.pow(s0, Math.exp(sum - mean));
			}

			const sum = 3.06117 * ln(age) + 1.1237 * ln(totalChol) + -0.93263 * ln(hdl) + (treated ? 1.99881 : 1.93303) * ln(sbp) + 0.65451 * (smoker ? 1 : 0) + 0.57367 * (diabetes ? 1 : 0);
			const mean = 23.9802;
			const s0 = 0.88936;
			return 1 - Math.pow(s0, Math.exp(sum - mean));
		}

		function classifyRisk10y(riskPct) {
			if (riskPct < 10) {
				return {
					label: 'RISCO BAIXO',
					badge: 'calc-badge calc-badge-ok',
					orient: 'Mantenha habitos saudaveis: alimentacao equilibrada, atividade fisica regular, sono adequado e nao fumar.',
				};
			}
			if (riskPct <= 20) {
				return {
					label: 'RISCO INTERMEDIARIO',
					badge: 'calc-badge calc-badge-warn',
					orient: 'Reforcar mudancas de estilo de vida e discutir metas terapeuticas conforme diretrizes e comorbidades.',
				};
			}
			return {
				label: 'RISCO ALTO',
				badge: 'calc-badge calc-badge-bad',
				orient: 'Requer avaliacao clinica cuidadosa: estratificacao adicional e tratamento conforme diretrizes.',
			};
		}

		function openCardiovascularRiskCalculator() {
			const html =
				'<div class="calc-container">' +
				'<h3 class="text-lg font-bold text-[#23217c] mb-4"><i class="fa-solid fa-heart-pulse mr-2"></i>Risco Cardiovascular (Framingham, 10 anos)</h3>' +
				'<div class="calc-row-2">' +
				'<div class="calc-form-group">' +
				'<label for="calc_cv-age" class="calc-form-label">Idade (anos):</label>' +
				'<input type="number" id="calc_cv-age" min="30" max="79" class="calc-form-input" inputmode="numeric" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_cv-sex" class="calc-form-label">Sexo:</label>' +
				'<select id="calc_cv-sex" class="calc-form-select">' +
				'<option value="">Selecione</option>' +
				'<option value="M">Masculino</option>' +
				'<option value="F">Feminino</option>' +
				'</select>' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_cv-chol" class="calc-form-label">Colesterol total (mg/dL):</label>' +
				'<input type="number" id="calc_cv-chol" min="100" max="400" class="calc-form-input" inputmode="numeric" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_cv-hdl" class="calc-form-label">HDL (mg/dL):</label>' +
				'<input type="number" id="calc_cv-hdl" min="10" max="120" class="calc-form-input" inputmode="numeric" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_cv-sbp" class="calc-form-label">PAS (mmHg):</label>' +
				'<input type="number" id="calc_cv-sbp" min="80" max="240" class="calc-form-input" inputmode="numeric" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_cv-treated" class="calc-form-label">PAS em tratamento?</label>' +
				'<select id="calc_cv-treated" class="calc-form-select">' +
				'<option value="no">Nao</option>' +
				'<option value="yes">Sim</option>' +
				'</select>' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_cv-diabetes" class="calc-form-label">Diabetes:</label>' +
				'<select id="calc_cv-diabetes" class="calc-form-select">' +
				'<option value="no">Nao</option>' +
				'<option value="yes">Sim</option>' +
				'</select>' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_cv-smoke" class="calc-form-label">Tabagismo:</label>' +
				'<select id="calc_cv-smoke" class="calc-form-select">' +
				'<option value="no">Nao</option>' +
				'<option value="yes">Sim</option>' +
				'</select>' +
				'</div>' +
				'</div>' +
				'<div class="neu-btn-container">' +
				'<button type="button" id="calc_cv-calc" class="neu-btn neu-btn-primary">Calcular risco (10 anos)</button>' +
				'<button type="button" id="calc_cv-clear" class="neu-btn">Limpar</button>' +
				'</div>' +
				'<div id="calc_cv-result" class="calc-result"></div>' +
				'</div>';

			showCalculator(html, function (signal) {
				onClickId(
					'calc_cv-calc',
					function () {
						const sex = document.getElementById('calc_cv-sex').value;
						const age = readNumber('calc_cv-age');
						const totalChol = readNumber('calc_cv-chol');
						const hdl = readNumber('calc_cv-hdl');
						const sbp = readNumber('calc_cv-sbp');
						const treated = document.getElementById('calc_cv-treated').value === 'yes';
						const diabetes = document.getElementById('calc_cv-diabetes').value === 'yes';
						const smoker = document.getElementById('calc_cv-smoke').value === 'yes';

						if (!sex) {
							setHtml('calc_cv-result', errorBox('Selecione o sexo.'));
							return;
						}
						if (!Number.isFinite(age) || age < 30 || age > 79) {
							setHtml('calc_cv-result', errorBox('Idade invalida (30 a 79).'));
							return;
						}
						if (!Number.isFinite(totalChol) || totalChol < 100 || totalChol > 400) {
							setHtml('calc_cv-result', errorBox('Colesterol total invalido (100 a 400 mg/dL).'));
							return;
						}
						if (!Number.isFinite(hdl) || hdl < 10 || hdl > 120) {
							setHtml('calc_cv-result', errorBox('HDL invalido (10 a 120 mg/dL).'));
							return;
						}
						if (!Number.isFinite(sbp) || sbp < 80 || sbp > 240) {
							setHtml('calc_cv-result', errorBox('PAS invalida (80 a 240 mmHg).'));
							return;
						}

						const risk = framinghamGeneralCvd10yRisk(sex, age, totalChol, hdl, sbp, treated, smoker, diabetes);
						const riskPct = clamp(risk * 100, 0, 100);
						const cls = classifyRisk10y(riskPct);

						setHtml(
							'calc_cv-result',
							okBox(
								'<h4>Resultado</h4>' +
									'<p><strong>Risco de evento cardiovascular em 10 anos:</strong> ' +
									formatPct(riskPct) +
									'</p>' +
									'<div class="' +
									cls.badge +
									'">' +
									cls.label +
									'</div>' +
									'<p>' +
									cls.orient +
									'</p>' +
									'<hr class="calc-hr-soft"/>' +
									'<div class="calc-mini-muted">Nota: algoritmo de risco geral (CVD) do Framingham (D\'Agostino 2008). Use como apoio -- nao substitui julgamento clinico.</div>',
							),
						);
					},
					signal,
				);

				onClickId(
					'calc_cv-clear',
					function () {
						document.getElementById('calc_cv-age').value = '';
						document.getElementById('calc_cv-sex').value = '';
						document.getElementById('calc_cv-chol').value = '';
						document.getElementById('calc_cv-hdl').value = '';
						document.getElementById('calc_cv-sbp').value = '';
						document.getElementById('calc_cv-treated').value = 'no';
						document.getElementById('calc_cv-diabetes').value = 'no';
						document.getElementById('calc_cv-smoke').value = 'no';
						setHtml('calc_cv-result', '');
					},
					signal,
				);
			});
		}

		// ===============================
		//  3) IMC
		// ===============================
		function openBMICalculator() {
			const html =
				'<div class="calc-container">' +
				'<h3 class="text-lg font-bold text-[#23217c] mb-4"><i class="fa-solid fa-weight-scale mr-2"></i>Calculadora de IMC</h3>' +
				'<div class="calc-row-2">' +
				'<div class="calc-form-group">' +
				'<label for="calc_bmi-weight" class="calc-form-label">Peso (kg):</label>' +
				'<input type="number" id="calc_bmi-weight" min="0" step="0.1" class="calc-form-input" inputmode="decimal" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_bmi-height" class="calc-form-label">Altura (m):</label>' +
				'<input type="number" id="calc_bmi-height" min="0" step="0.01" class="calc-form-input" inputmode="decimal" />' +
				'</div>' +
				'</div>' +
				'<div class="neu-btn-container">' +
				'<button type="button" id="calc_bmi-calc" class="neu-btn neu-btn-primary">Calcular IMC</button>' +
				'<button type="button" id="calc_bmi-clear" class="neu-btn">Limpar</button>' +
				'</div>' +
				'<div id="calc_bmi-result" class="calc-result"></div>' +
				'</div>';

			showCalculator(html, function (signal) {
				onClickId(
					'calc_bmi-calc',
					function () {
						const weight = readNumber('calc_bmi-weight');
						const height = readNumber('calc_bmi-height');

						if (!Number.isFinite(weight) || weight <= 0) {
							setHtml('calc_bmi-result', errorBox('Peso invalido.'));
							return;
						}
						if (!Number.isFinite(height) || height <= 0) {
							setHtml('calc_bmi-result', errorBox('Altura invalida.'));
							return;
						}

						const bmi = weight / (height * height);
						let category = '';
						if (bmi < 18.5) category = 'Abaixo do peso';
						else if (bmi < 25) category = 'Peso normal';
						else if (bmi < 30) category = 'Sobrepeso';
						else category = 'Obesidade';

						setHtml('calc_bmi-result', okBox('<h4>Seu IMC e: ' + bmi.toFixed(2) + '</h4>' + '<p>Categoria: <strong>' + category + '</strong></p>'));
					},
					signal,
				);

				onClickId(
					'calc_bmi-clear',
					function () {
						document.getElementById('calc_bmi-weight').value = '';
						document.getElementById('calc_bmi-height').value = '';
						setHtml('calc_bmi-result', '');
					},
					signal,
				);
			});
		}

		// ===============================
		//  4) Idade Gestacional
		// ===============================
		function openGestationalAgeCalculator() {
			const html =
				'<div class="calc-container">' +
				'<h3 class="text-lg font-bold text-[#23217c] mb-4"><i class="fa-solid fa-baby mr-2"></i>Idade Gestacional</h3>' +
				'<div class="calc-row-2">' +
				'<div class="calc-form-group">' +
				'<label for="calc_ga-dum" class="calc-form-label">DUM:</label>' +
				'<input type="date" id="calc_ga-dum" class="calc-form-input" style="max-width:200px" />' +
				'</div>' +
				'</div>' +
				'<div class="calc-mini-muted">Calculo por diferenca de dias em data local (sem bug de fuso).</div>' +
				'<div class="neu-btn-container">' +
				'<button type="button" id="calc_ga-calc" class="neu-btn neu-btn-primary">Calcular</button>' +
				'<button type="button" id="calc_ga-clear" class="neu-btn">Limpar</button>' +
				'</div>' +
				'<div id="calc_ga-result" class="calc-result"></div>' +
				'</div>';

			showCalculator(html, function (signal) {
				onClickId(
					'calc_ga-calc',
					function () {
						const dum = parseISODateLocal(document.getElementById('calc_ga-dum').value);
						if (!dum) {
							setHtml('calc_ga-result', errorBox('Insira uma data valida.'));
							return;
						}

						const today = new Date();
						const days = diffDaysLocal(dum, today);
						if (days < 0) {
							setHtml('calc_ga-result', errorBox('A DUM esta no futuro.'));
							return;
						}

						const w = Math.floor(days / 7);
						const d = days % 7;

						setHtml('calc_ga-result', okBox('<h4>Idade Gestacional:</h4>' + '<p><strong>' + w + '</strong> semanas e <strong>' + d + '</strong> dias</p>'));
					},
					signal,
				);

				onClickId(
					'calc_ga-clear',
					function () {
						document.getElementById('calc_ga-dum').value = '';
						setHtml('calc_ga-result', '');
					},
					signal,
				);
			});
		}

		// ===============================
		//  5) Idade Corrigida
		// ===============================
		function openCorrectedGestationalAgeCalculator() {
			const html =
				'<div class="calc-container">' +
				'<h3 class="text-lg font-bold text-[#23217c] mb-4"><i class="fa-solid fa-calendar-plus mr-2"></i>Idade Gestacional Corrigida</h3>' +
				'<div class="calc-row-2">' +
				'<div class="calc-form-group">' +
				'<label for="calc_cga-birth" class="calc-form-label">Data de nascimento:</label>' +
				'<input type="date" id="calc_cga-birth" class="calc-form-input" style="max-width:200px" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_cga-ig" class="calc-form-label">IG ao nascer (semanas):</label>' +
				'<input type="number" id="calc_cga-ig" min="20" max="42" class="calc-form-input" inputmode="numeric" />' +
				'</div>' +
				'</div>' +
				'<div class="neu-btn-container">' +
				'<button type="button" id="calc_cga-calc" class="neu-btn neu-btn-primary">Calcular</button>' +
				'<button type="button" id="calc_cga-clear" class="neu-btn">Limpar</button>' +
				'</div>' +
				'<div id="calc_cga-result" class="calc-result"></div>' +
				'</div>';

			showCalculator(html, function (signal) {
				onClickId(
					'calc_cga-calc',
					function () {
						const birth = parseISODateLocal(document.getElementById('calc_cga-birth').value);
						const ig = readInt('calc_cga-ig');

						if (!birth) {
							setHtml('calc_cga-result', errorBox('Data de nascimento invalida.'));
							return;
						}
						if (!Number.isFinite(ig) || ig < 20 || ig > 42) {
							setHtml('calc_cga-result', errorBox('IG ao nascer invalida (20 a 42 semanas).'));
							return;
						}

						const today = new Date();
						const days = diffDaysLocal(birth, today);
						if (days < 0) {
							setHtml('calc_cga-result', errorBox('Data de nascimento esta no futuro.'));
							return;
						}

						const chronoW = Math.floor(days / 7);
						const chronoD = days % 7;

						const premWeeks = 40 - ig;
						const correctedDays = days - premWeeks * 7;

						const corrW = correctedDays >= 0 ? Math.floor(correctedDays / 7) : 0;
						const corrD = correctedDays >= 0 ? correctedDays % 7 : 0;

						setHtml(
							'calc_cga-result',
							okBox(
								'<h4>Resultados</h4>' +
									'<p><strong>Idade cronologica:</strong> ' +
									chronoW +
									' semanas e ' +
									chronoD +
									' dias</p>' +
									'<p><strong>Idade corrigida:</strong> ' +
									corrW +
									' semanas e ' +
									corrD +
									' dias</p>' +
									'<div class="calc-mini-muted">Correcao: (40 semanas - IG ao nascer).</div>',
							),
						);
					},
					signal,
				);

				onClickId(
					'calc_cga-clear',
					function () {
						document.getElementById('calc_cga-birth').value = '';
						document.getElementById('calc_cga-ig').value = '';
						setHtml('calc_cga-result', '');
					},
					signal,
				);
			});
		}

		// ===============================
		//  6) Bilirrubinemia Neonatal -- AAP 2022 via PediTools
		// ===============================
		function buildPediToolsBiliUrl(gaWeeks, ageHours, biliMgDl, risk) {
			const base = 'https://peditools.org/bili2022/api/';
			const params = new URLSearchParams();
			params.set('ga', String(gaWeeks));
			params.set('age', String(ageHours));
			if (Number.isFinite(biliMgDl)) params.set('bili', String(biliMgDl));
			params.set('risk', risk);
			return base + '?' + params.toString();
		}

		function extractBiliSummaryFromText(text) {
			const lines = String(text)
				.split('\n')
				.map(function (l) {
					return l.trim();
				})
				.filter(Boolean);

			const findIdx = function (needle) {
				return lines.findIndex(function (l) {
					return l.toLowerCase().includes(needle.toLowerCase());
				});
			};

			let phototh = null;
			let exchth = null;

			for (let i = 0; i < lines.length; i++) {
				const m = lines[i].match(/^(\d+(?:\.\d+)?)\s*mg\/dL\s+(\d+(?:\.\d+)?)\s*mg\/dL$/i);
				if (m) {
					phototh = Number(m[1]);
					exchth = Number(m[2]);
					break;
				}
			}

			const deltaLine = lines.find(function (l) {
				return l.toLowerCase().startsWith('phototherapy ') && l.toLowerCase().includes('phototherapy threshold');
			});

			let statusLine = null;
			const recIdx = findIdx('Recommendations');
			if (recIdx >= 0) {
				for (let j = recIdx + 1; j < Math.min(lines.length, recIdx + 6); j++) {
					if (lines[j].toLowerCase().includes('phototherapy threshold')) continue;
					statusLine = lines[j];
					break;
				}
			}

			const recBlock = [];
			if (recIdx >= 0) {
				for (let j = recIdx + 1; j < lines.length; j++) {
					if (lines[j].startsWith('* * *')) break;
					if (lines[j].toLowerCase().includes('thresholds for phototherapy')) break;
					if (lines[j].toLowerCase().includes('copy recommendations')) continue;
					recBlock.push(lines[j]);
					if (recBlock.length > 10) break;
				}
			}

			return { phototh: phototh, exchth: exchth, deltaLine: deltaLine, statusLine: statusLine, recBlock: recBlock };
		}

		function openNeonatalHyperbiliCalculator() {
			const html =
				'<div class="calc-container" style="max-width:700px">' +
				'<h3 class="text-lg font-bold text-[#23217c] mb-4"><i class="fa-solid fa-vial mr-2"></i>Bilirrubinemia Neonatal (AAP 2022)</h3>' +
				'<div class="calc-info-box">' +
				'<strong>Como funciona:</strong>' +
				'<p class="calc-mini-muted" style="margin-top:4px">Esta calculadora consulta o endpoint livre do PediTools (AAP 2022) e retorna limiares de fototerapia e recomendacoes. Necessita internet. Se a consulta falhar, voce podera abrir o resultado direto no navegador.</p>' +
				'</div>' +
				'<div class="calc-row-2">' +
				'<div class="calc-form-group">' +
				'<label for="calc_bili-ga" class="calc-form-label">IG ao nascer (semanas):</label>' +
				'<input type="number" id="calc_bili-ga" min="35" max="42" class="calc-form-input" inputmode="numeric" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_bili-age" class="calc-form-label">Idade pos-natal (horas):</label>' +
				'<input type="number" id="calc_bili-age" min="1" max="336" class="calc-form-input" inputmode="numeric" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_bili-value" class="calc-form-label">Bilirrubina total (mg/dL):</label>' +
				'<input type="number" id="calc_bili-value" min="0" max="40" step="0.1" class="calc-form-input" inputmode="decimal" />' +
				'</div>' +
				'<div class="calc-form-group" style="flex-direction:column;align-items:flex-start">' +
				'<span class="calc-form-label">Risco de neurotoxicidade (AAP):</span>' +
				'<div class="calc-risk-options">' +
				'<label><input type="radio" name="calc_bili-risk" value="none" checked /> Sem fatores</label>' +
				'<label><input type="radio" name="calc_bili-risk" value="any" /> Com fatores</label>' +
				'<span class="calc-mini-muted">(*prematuridade e considerada nas curvas por IG)</span>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="neu-btn-container">' +
				'<button type="button" id="calc_bili-calc" class="neu-btn neu-btn-primary">Consultar (AAP 2022)</button>' +
				'<button type="button" id="calc_bili-clear" class="neu-btn">Limpar</button>' +
				'</div>' +
				'<div id="calc_bili-result" class="calc-result"></div>' +
				'</div>';

			showCalculator(html, function (signal) {
				onClickId(
					'calc_bili-calc',
					async function () {
						const gaWeeks = readInt('calc_bili-ga');
						const ageHours = readInt('calc_bili-age');
						const bili = readNumber('calc_bili-value');
						const riskEl = container.querySelector('input[name="calc_bili-risk"]:checked');
						const risk = riskEl ? riskEl.value : 'none';

						if (!Number.isFinite(gaWeeks) || gaWeeks < 35 || gaWeeks > 42) {
							setHtml('calc_bili-result', errorBox('IG invalida (35 a 42 semanas).'));
							return;
						}
						if (!Number.isFinite(ageHours) || ageHours < 1 || ageHours > 336) {
							setHtml('calc_bili-result', errorBox('Idade em horas invalida (1 a 336).'));
							return;
						}
						if (!Number.isFinite(bili) || bili < 0 || bili > 40) {
							setHtml('calc_bili-result', errorBox('Bilirrubina invalida (0 a 40 mg/dL).'));
							return;
						}

						const url = buildPediToolsBiliUrl(gaWeeks, ageHours, bili, risk);

						setHtml('calc_bili-result', okBox('<h4>Consultando...</h4>' + '<p class="calc-mini-muted">Acessando PediTools AAP 2022.</p>'));

						try {
							const resp = await fetch(url, { method: 'GET', signal: signal });
							if (!resp.ok) throw new Error('HTTP ' + resp.status);
							const htmlText = await resp.text();

							const doc = new DOMParser().parseFromString(htmlText, 'text/html');
							const text = doc.body ? doc.body.innerText || doc.body.textContent || '' : '';
							const s = extractBiliSummaryFromText(text);

							const thresholdsOk = Number.isFinite(s.phototh) && Number.isFinite(s.exchth);

							let thresholdsHtml = thresholdsOk
								? '<p><strong>Limiar fototerapia:</strong> ' + s.phototh + ' mg/dL</p>' + '<p><strong>Limiar exsanguineo:</strong> ' + s.exchth + ' mg/dL</p>'
								: '<p class="text-danger">Nao consegui extrair limiares automaticamente. Abra o link abaixo para ver o resultado completo.</p>';

							let deltaHtml = s.deltaLine ? '<div class="calc-codebox">' + s.deltaLine + '</div>' : '';
							let statusHtml = s.statusLine ? '<div class="calc-mini-muted"><strong>Status:</strong> ' + s.statusLine + '</div>' : '';

							let recHtml = '';
							if (Array.isArray(s.recBlock) && s.recBlock.length) {
								const filtered = s.recBlock
									.filter(function (l) {
										return !/^AAP 2022/i.test(l);
									})
									.filter(function (l) {
										return !/^Calculator/i.test(l);
									})
									.filter(function (l) {
										return !/^GA at birth/i.test(l);
									})
									.filter(function (l) {
										return !/^Postnatal age/i.test(l);
									})
									.filter(function (l) {
										return !/^Bilirubin/i.test(l);
									})
									.filter(function (l) {
										return !/^Phototherapy threshold/i.test(l);
									});

								if (filtered.length) {
									recHtml = '<hr class="calc-hr-soft"/>' + '<h4>Recomendacoes (PediTools)</h4>' + '<div class="calc-codebox">' + filtered.join('\n') + '</div>';
								}
							}

							setHtml(
								'calc_bili-result',
								okBox(
									'<h4>Resultado (AAP 2022 via PediTools)</h4>' +
										'<p><strong>IG:</strong> ' +
										gaWeeks +
										' semanas &nbsp;|&nbsp; <strong>Idade:</strong> ' +
										ageHours +
										' horas &nbsp;|&nbsp; <strong>TSB:</strong> ' +
										bili.toFixed(1) +
										' mg/dL</p>' +
										'<p><strong>Risco neurotoxicidade:</strong> ' +
										(risk === 'any' ? 'COM fatores' : 'SEM fatores') +
										'</p>' +
										statusHtml +
										thresholdsHtml +
										deltaHtml +
										'<hr class="calc-hr-soft"/>' +
										'<p><strong>Link direto do calculo:</strong></p>' +
										'<div class="calc-codebox">' +
										url +
										'</div>' +
										recHtml +
										'<div class="calc-mini-muted" style="margin-top:8px">Aviso: esta saida e um auxilio. Confirme em fontes independentes e siga julgamento clinico.</div>',
								),
							);
						} catch (e) {
							const fallbackUrl = buildPediToolsBiliUrl(gaWeeks, ageHours, bili, risk);
							setHtml(
								'calc_bili-result',
								okBox(
									'<h4>Falha ao consultar PediTools</h4>' +
										'<p class="text-danger">Nao foi possivel obter resposta do endpoint (internet, bloqueio de rede ou CORS).</p>' +
										'<p><strong>Abra o calculo no navegador:</strong></p>' +
										'<div class="calc-codebox">' +
										fallbackUrl +
										'</div>',
								),
							);
						}
					},
					signal,
				);

				onClickId(
					'calc_bili-clear',
					function () {
						document.getElementById('calc_bili-ga').value = '';
						document.getElementById('calc_bili-age').value = '';
						document.getElementById('calc_bili-value').value = '';
						const rNone = container.querySelector('input[name="calc_bili-risk"][value="none"]');
						if (rNone) rNone.checked = true;
						setHtml('calc_bili-result', '');
					},
					signal,
				);
			});
		}

		// ===============================
		//  7) Noripurum -- Ganzoni
		// ===============================
		function dosePorAmpola(ferroRestante) {
			if (ferroRestante <= 0) return 0;
			const capped = Math.min(200, ferroRestante);
			return Math.min(200, Math.ceil(capped / 100) * 100);
		}

		function formatarDose(dose) {
			if (dose <= 0) return '-';
			const ampolas = dose / 100;
			return dose + 'mg (' + ampolas + ' ' + (ampolas === 1 ? 'ampola' : 'ampolas') + ')';
		}

		function openNoripurumCalculator() {
			const html =
				'<div class="calc-container" style="max-width:700px">' +
				'<h3 class="text-lg font-bold text-[#23217c] mb-4"><i class="fa-solid fa-syringe mr-2"></i>Calculadora de Dose -- Noripurum (Ferro EV)</h3>' +
				'<div class="calc-nori-info">' +
				'<strong>Parametros Importantes:</strong>' +
				'<div class="calc-nori-grid">' +
				'<details>' +
				'<summary><strong>Limites de Dose:</strong></summary>' +
				'<ul>' +
				'<li>Dose maxima por aplicacao: 200mg</li>' +
				'<li>Dose maxima semanal (regra pratica): 500mg</li>' +
				'<li>Intervalo minimo entre doses: 24h</li>' +
				'</ul>' +
				'</details>' +
				'<details>' +
				'<summary><strong>Diluicao e Administracao:</strong></summary>' +
				'<ul>' +
				'<li>Diluicao minima: 100mL SF 0,9% por ampola</li>' +
				'<li>Tempo minimo de infusao: 15 min/ampola</li>' +
				'<li>Administrar exclusivamente em SF 0,9%</li>' +
				'</ul>' +
				'</details>' +
				'<details>' +
				'<summary><strong>Reserva de Ferro:</strong></summary>' +
				'<ul>' +
				'<li>&lt; 35kg: 15mg/kg</li>' +
				'<li>\u2265 35kg: 500mg fixo</li>' +
				'</ul>' +
				'</details>' +
				'</div>' +
				'</div>' +
				'<div class="calc-row-2">' +
				'<div class="calc-form-group">' +
				'<label for="calc_nori-peso" class="calc-form-label">Peso (kg):</label>' +
				'<input type="number" id="calc_nori-peso" min="0" step="0.1" class="calc-form-input" inputmode="decimal" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_nori-hb-atual" class="calc-form-label">Hb atual (g/dL):</label>' +
				'<input type="number" id="calc_nori-hb-atual" min="0" step="0.1" class="calc-form-input" inputmode="decimal" />' +
				'</div>' +
				'<div class="calc-form-group">' +
				'<label for="calc_nori-hb-alvo" class="calc-form-label">Hb alvo (g/dL):</label>' +
				'<select id="calc_nori-hb-alvo" class="calc-form-select">' +
				'<option value="12">12</option>' +
				'<option value="13">13</option>' +
				'<option value="14">14</option>' +
				'</select>' +
				'</div>' +
				'</div>' +
				'<div class="calc-mini-muted">Padrao comum: 12 (mulheres) / 13 (homens), ajuste conforme cenario.</div>' +
				'<div class="neu-btn-container">' +
				'<button type="button" id="calc_nori-calc" class="neu-btn neu-btn-primary">Calcular Dose</button>' +
				'<button type="button" id="calc_nori-clear" class="neu-btn">Limpar</button>' +
				'</div>' +
				'<div id="calc_nori-result" class="calc-result" style="display:none;">' +
				'<div id="calc_nori-alert-box"></div>' +
				'<div class="calc-nori-details">' +
				'<strong>Detalhes do calculo:</strong>' +
				'<div id="calc_nori-calculo"></div>' +
				'</div>' +
				'<div><strong>Deficit total de ferro:</strong> <span id="calc_nori-deficit"></span></div>' +
				'<div>' +
				'<strong>Esquema de administracao (exemplo):</strong>' +
				'<div id="calc_nori-esquema"></div>' +
				'</div>' +
				'</div>' +
				'</div>';

			showCalculator(html, function (signal) {
				onClickId(
					'calc_nori-calc',
					function () {
						const peso = readNumber('calc_nori-peso');
						const hbAtual = readNumber('calc_nori-hb-atual');
						const hbAlvo = readNumber('calc_nori-hb-alvo');

						if (!Number.isFinite(peso) || peso <= 0) {
							alert('Peso invalido.');
							return;
						}
						if (!Number.isFinite(hbAtual) || hbAtual <= 0) {
							alert('Hemoglobina atual invalida.');
							return;
						}
						if (!Number.isFinite(hbAlvo) || hbAlvo <= 0) {
							alert('Hemoglobina alvo invalida.');
							return;
						}

						const reservaFerro = peso < 35 ? Math.round(peso * 15) : 500;
						const dhb = hbAlvo - hbAtual;
						const deficitTotal = Math.round(peso * dhb * 2.4 + reservaFerro);

						const resultDiv = document.getElementById('calc_nori-result');
						resultDiv.style.display = '';

						const calculoHtml =
							'<div class="calc-codebox">' +
							'Deficit Total = (Peso x \u0394Hb x 2.4) + Reserva\n\n' +
							'Peso = ' +
							peso.toFixed(1) +
							' kg\n' +
							'\u0394Hb = ' +
							hbAlvo.toFixed(1) +
							' - ' +
							hbAtual.toFixed(1) +
							' = ' +
							dhb.toFixed(1) +
							' g/dL\n' +
							'Reserva = ' +
							reservaFerro +
							' mg (' +
							(peso < 35 ? '15mg/kg' : 'fixo 500mg') +
							')\n\n' +
							'(' +
							peso.toFixed(1) +
							' x ' +
							dhb.toFixed(1) +
							' x 2.4) + ' +
							reservaFerro +
							' = ' +
							deficitTotal +
							' mg' +
							'</div>';

						document.getElementById('calc_nori-calculo').innerHTML = calculoHtml;
						document.getElementById('calc_nori-deficit').textContent = deficitTotal + ' mg';

						const numDoses = Math.ceil(deficitTotal / 200);
						const dosesPorSemana = Math.min(2, numDoses);
						const numSemanas = Math.ceil(numDoses / dosesPorSemana);

						let ferroRestante = deficitTotal;
						let totalPlanejado = 0;

						let tabela = '<table class="calc-nori-table">' + '<tr><th>Semana</th><th>Terca-feira</th><th>Sexta-feira</th><th>Total semanal</th></tr>';

						for (let semana = 1; semana <= numSemanas; semana++) {
							const doseT = dosePorAmpola(ferroRestante);
							ferroRestante -= doseT;
							totalPlanejado += doseT;

							const doseS = dosePorAmpola(ferroRestante);
							ferroRestante -= doseS;
							totalPlanejado += doseS;

							tabela += '<tr>' + '<td>' + semana + '</td>' + '<td>' + formatarDose(doseT) + '</td>' + '<td>' + formatarDose(doseS) + '</td>' + '<td>' + (doseT + doseS) + ' mg</td>' + '</tr>';
						}

						tabela += '</table>';

						const excesso = totalPlanejado - deficitTotal;

						document.getElementById('calc_nori-esquema').innerHTML = tabela;

						const alertas = [];
						if (hbAtual >= hbAlvo) {
							alertas.push('<div class="calc-nori-alert calc-nori-warning">' + '<strong>ATENCAO:</strong> Hb atual \u2265 meta. Reavaliar necessidade de reposicao.' + '</div>');
						}
						if (deficitTotal > 1000) {
							alertas.push('<div class="calc-nori-alert">' + 'Tratamento prolongado provavel. Considerar reavaliacao laboratorial apos 4-6 semanas.' + '</div>');
						}
						if (excesso > 0) {
							alertas.push('<div class="calc-nori-alert calc-nori-warning">' + '<strong>Nota:</strong> Total planejado ' + totalPlanejado + ' mg (\u2248 ' + excesso + ' mg acima do deficit) por arredondamento em ampolas.' + '</div>');
						}
						document.getElementById('calc_nori-alert-box').innerHTML = alertas.join('');
					},
					signal,
				);

				onClickId(
					'calc_nori-clear',
					function () {
						document.getElementById('calc_nori-peso').value = '';
						document.getElementById('calc_nori-hb-atual').value = '';
						document.getElementById('calc_nori-hb-alvo').value = '12';
						document.getElementById('calc_nori-result').style.display = 'none';
						document.getElementById('calc_nori-alert-box').innerHTML = '';
						document.getElementById('calc_nori-calculo').innerHTML = '';
						document.getElementById('calc_nori-deficit').textContent = '';
						document.getElementById('calc_nori-esquema').innerHTML = '';
					},
					signal,
				);
			});
		}

		// ===============================
		//  CALCULATOR DISPATCH MAP
		// ===============================
		const CALC_MAP = {
			gfr: openGFRCalculator,
			cv: openCardiovascularRiskCalculator,
			bmi: openBMICalculator,
			ga: openGestationalAgeCalculator,
			cga: openCorrectedGestationalAgeCalculator,
			bili: openNeonatalHyperbiliCalculator,
			nori: openNoripurumCalculator,
		};

		// ===============================
		//  EVENT LISTENERS
		// ===============================
		function handleCalcNav(e) {
			const btn = e.target.closest('[data-calc]');
			if (!btn) return;
			const key = btn.getAttribute('data-calc');
			if (CALC_MAP[key]) {
				// Highlight active nav button
				container.querySelectorAll('.calc-nav-btn').forEach(function (b) {
					b.classList.remove('active');
				});
				container.querySelectorAll('.calc-nav-btn[data-calc="' + key + '"]').forEach(function (b) {
					b.classList.add('active');
				});
				CALC_MAP[key]();
			}
		}

		// Nav sidebar buttons
		const navEl = container.querySelector('.calc-nav');
		if (navEl) navEl.addEventListener('click', handleCalcNav);

		// Home grid buttons
		if (homeGrid) homeGrid.addEventListener('click', handleCalcNav);

		// Show home on init
		showHome();

		console.log('[Calc] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_calc')) {
		renderCalc();
	}

	window.renderCalc = renderCalc;
})();
