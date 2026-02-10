/**
 * Consulta Pre-Natal
 * Convertido de prenatal_neuro_2025.html — layout original preservado
 */
(function () {
	'use strict';

	function injectNeuCSS() {
		if (document.getElementById('psf-neu-styles')) return;
		const s = document.createElement('style');
		s.id = 'psf-neu-styles';
		s.textContent = [
			'.neu-card{background:#e0e5ec;padding:22px;border-radius:24px;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}',
			'.neu-inset{background:#e0e5ec;padding:18px;border-radius:24px;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff}',
			'.neu-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 22px;border:none;border-radius:60px;background:#e0e5ec;color:#5f6775;font-weight:bold;cursor:pointer;transition:all .2s;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;font-size:13px}',
			'.neu-btn:hover{color:#007bff;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff}',
			'.neu-btn:active{box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;color:#23217c;transform:translateY(1px)}',
			'.neu-btn-primary{color:#007bff}',
			'.neu-btn-danger{color:#dc3545}',
			'.neu-btn-success{color:#28a745}',
			'.neu-btn-info{color:#007bff}',
			'.neu-btn-container{display:flex;gap:15px;justify-content:center;margin-top:15px}',
			'.neu-form-group{margin-bottom:20px;display:flex;flex-direction:row;gap:10px;align-items:center;justify-content:center}',
			'.neu-form-label{font-size:14px;font-weight:500;color:#5f6775;display:flex;align-items:center;gap:10px}',
			'.neu-form-input{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;height:30px;transition:box-shadow .2s;max-width:80px}',
			'.neu-form-input:focus{outline:none;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff}',
			'.neu-form-select{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;transition:box-shadow .2s}',
			'.neu-form-select:focus{outline:none}',
			'.neu-form-textarea{padding:14px;border:none;border-radius:24px;background:#e0e5ec;color:#5f6775;font-size:14px;box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;min-height:100px;resize:vertical;transition:box-shadow .2s}',
			'.neu-form-textarea:focus{outline:none}',
			'.neu-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:40}',
			'.neu-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:95%;max-width:600px;z-index:50;max-height:90vh}',
			'.neu-modal{background:#e0e5ec;border-radius:36px;padding:18px;margin:20px}',
			'.n-inset{background:#e0e5ec;border:none;border-radius:0.75rem;width:100%;padding:0.5rem 1rem;font-size:1rem;box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;transition:box-shadow .2s}',
			'.n-inset:focus{box-shadow:inset 6px 6px 12px #c1c9d2,inset -6px -6px 12px #fff;outline:none}',
			'.n-table th{background:#007bff;color:#fff;padding:4px 8px}',
			'.n-table td{background:#e0e5ec;box-shadow:inset 2px 2px 4px #c1c9d2,inset -2px -2px 4px #fff;padding:4px 8px}',
			'.tv-toggle[aria-expanded="true"] .tw-caret{transform:rotate(90deg)}',
			'.tw-caret{display:inline-block;transition:transform .2s}',
			'.pn-surface{background:#e0e5ec;border-radius:24px;box-shadow:6px 6px 12px #c1c9d2,-6px -6px 12px #fff;padding:16px}',
			'.pn-checkbox{width:18px;height:18px;accent-color:#007bff;cursor:pointer}',
			'.pn-readout{background:#e0e5ec;border-radius:12px;padding:8px 12px;box-shadow:inset 3px 3px 6px #c1c9d2,inset -3px -3px 6px #fff;font-weight:600;min-height:30px;display:flex;align-items:center}',
			'.n-modal{background:#e0e5ec;border-radius:24px}',
			'.n-modal .n-modal-head{background:#e0e5ec;color:#5f6775;box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;border-radius:24px 24px 0 0;padding:12px 20px}',
			'.pn-toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:rgba(45,55,72,.95);box-shadow:3px 3px 6px #c1c9d2,-3px -3px 6px #fff;border-radius:12px;padding:12px 24px;color:#fff;font-size:14px;z-index:9999;transition:opacity .3s}'
		].join('\n');
		document.head.appendChild(s);
	}

	function renderPrenatal() {
		const container = document.getElementById('psf_sub_prenatal');
		if (!container) {
			console.error('[Prenatal] Container #psf_sub_prenatal nao encontrado');
			return;
		}

		injectNeuCSS();

		container.innerHTML = `
			<div class="p-4">
				<header class="flex flex-row justify-start items-center gap-4 mb-4 border-b border-gray-200 pb-4">
					<i class="fa-solid fa-person-pregnant text-3xl text-[#23217c]"></i>
					<h1 class="text-2xl font-bold text-[#23217c]">CONSULTA PRE-NATAL</h1>
				</header>

				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

					<!-- ======== COL ESQUERDA ======== -->
					<div class="flex flex-col gap-4">

						<!-- DADOS BASICOS -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px"><i class="fa-regular fa-calendar mr-1"></i> DADOS BASICOS</h2>
							<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 items-end">
								<div>
									<label for="pn_dum" class="text-xs text-gray-600">DUM</label>
									<input id="pn_dum" type="date" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label class="text-xs text-gray-600">IG</label>
									<div id="pn_ig" class="pn-readout w-full text-xs text-blue-700">--S --D</div>
								</div>
								<div>
									<label class="text-xs text-gray-600">DPP</label>
									<div id="pn_dpp" class="pn-readout w-full text-xs text-emerald-700">--/--/----</div>
								</div>
								<div>
									<label for="pn_consultaNum" class="text-xs text-gray-600">Consulta n&ordm;</label>
									<input id="pn_consultaNum" type="number" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label for="pn_dataConsulta" class="text-xs text-gray-600">Data da consulta</label>
									<input id="pn_dataConsulta" type="date" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
							</div>
						</div>

						<!-- TESTES RAPIDOS -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px"><i class="fa-solid fa-vials mr-1"></i> TESTES RAPIDOS</h2>
							<p class="text-xs text-center text-gray-600 mb-2">Teste rapido realizado?</p>
							<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
								<div>
									<div class="flex items-center gap-2">
										<input id="pn_testeRapido1" type="checkbox" class="pn-checkbox" />
										<label for="pn_testeRapido1" class="text-xs">1a Data</label>
									</div>
									<input id="pn_data1" type="date" class="n-inset w-full px-3 py-2 mt-1 hidden" style="font-size:12px" />
								</div>
								<div>
									<div class="flex items-center gap-2">
										<input id="pn_testeRapido2" type="checkbox" class="pn-checkbox" />
										<label for="pn_testeRapido2" class="text-xs">2a Data</label>
									</div>
									<input id="pn_data2" type="date" class="n-inset w-full px-3 py-2 mt-1 hidden" style="font-size:12px" />
								</div>
								<div>
									<div class="flex items-center gap-2">
										<input id="pn_testeRapido3" type="checkbox" class="pn-checkbox" />
										<label for="pn_testeRapido3" class="text-xs">3a Data</label>
									</div>
									<input id="pn_data3" type="date" class="n-inset w-full px-3 py-2 mt-1 hidden" style="font-size:12px" />
								</div>
							</div>
						</div>

						<!-- EXAMES + MEDICAMENTOS -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px"><i class="fa-solid fa-microscope mr-1"></i> EXAMES</h2>
							<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
								<div class="flex flex-col gap-1">
									<p class="text-xs font-semibold text-gray-600">Trimestres</p>
									<label class="inline-flex items-center gap-2 text-xs"><input id="pn_exames1Tri" type="checkbox" class="pn-checkbox" /> 1o Trimestre</label>
									<label class="inline-flex items-center gap-2 text-xs"><input id="pn_exames2Tri" type="checkbox" class="pn-checkbox" /> 2o Trimestre</label>
									<label class="inline-flex items-center gap-2 text-xs"><input id="pn_exames3Tri" type="checkbox" class="pn-checkbox" /> 3o Trimestre</label>
								</div>
								<div class="flex flex-col gap-1">
									<p class="text-xs font-semibold text-gray-600">Status</p>
									<label class="inline-flex items-center gap-2 text-xs"><input id="pn_solicitados" type="checkbox" class="pn-checkbox" /> Solicitados</label>
									<label class="inline-flex items-center gap-2 text-xs"><input id="pn_revisados" type="checkbox" class="pn-checkbox" /> Revisados</label>
								</div>
								<div class="flex flex-col gap-1">
									<label for="pn_medicamentos" class="text-xs">Medicamentos</label>
									<textarea id="pn_medicamentos" class="n-inset w-full px-3 py-2" style="font-size:12px;min-height:6rem"></textarea>
								</div>
							</div>
						</div>

						<!-- VACINA / ODONTO -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px"><i class="fa-solid fa-syringe mr-1"></i> Vacina/Odonto</h2>
							<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
								<div class="flex flex-col gap-2 mt-2">
									<label class="inline-flex items-center gap-2 text-xs">
										<input id="pn_vacinacao" type="checkbox" class="pn-checkbox" />
										Vacinas ok?
									</label>
									<label class="inline-flex items-center gap-2 text-xs">
										<input id="pn_acompOdonto" type="checkbox" class="pn-checkbox" />
										Odontologia ok?
									</label>
								</div>
								<div class="flex flex-col gap-1 col-span-2">
									<label for="pn_observacoes" class="text-xs">OBS</label>
									<textarea id="pn_observacoes" class="n-inset w-full px-3 py-2" style="font-size:12px;min-height:6rem"></textarea>
								</div>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end mt-4">
								<label class="inline-flex items-center gap-2 text-xs">
									<input id="pn_swabCultura" type="checkbox" class="pn-checkbox" />
									Swab StreptoB?
								</label>
								<div>
									<label for="pn_igSwab" class="text-xs">IG</label>
									<input id="pn_igSwab" type="text" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label for="pn_dataSwab" class="text-xs">Data</label>
									<input id="pn_dataSwab" type="date" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
							</div>
						</div>

					</div>

					<!-- ======== COL DIREITA (Apoio) ======== -->
					<div class="flex flex-col gap-4">

						<!-- HISTORIA OBSTETRICA -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px"><i class="fa-solid fa-baby-carriage mr-1"></i> HISTORIA OBSTETRICA</h2>
							<div class="grid grid-cols-3 gap-3 items-end">
								<div>
									<label for="pn_g" class="text-xs">G</label>
									<input id="pn_g" type="number" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label for="pn_p" class="text-xs">P</label>
									<input id="pn_p" type="number" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label for="pn_a" class="text-xs">A</label>
									<input id="pn_a" type="number" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
							</div>
							<div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
								<div>
									<label for="pn_hppGest" class="text-xs">HPP gestacional</label>
									<select id="pn_hppGest" class="n-inset w-full px-3 py-2" style="font-size:12px">
										<option>NDN</option>
										<option>Eclampsia</option>
										<option>Hipertensao da gestacao</option>
										<option>DMG</option>
									</select>
								</div>
								<div class="flex items-end gap-3">
									<label class="inline-flex items-center gap-2 text-xs"><input id="pn_pnar" type="checkbox" class="pn-checkbox" /> PNAR</label>
									<div class="flex-1">
										<label for="pn_obs" class="text-xs">OBS</label>
										<input id="pn_obs" type="text" class="n-inset w-full px-3 py-2" style="font-size:12px" />
									</div>
								</div>
							</div>
						</div>

						<!-- EXAME FISICO -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px"><i class="fa-solid fa-stethoscope mr-1"></i> EXAME FISICO</h2>
							<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
								<div>
									<label for="pn_au" class="text-xs">AU</label>
									<input id="pn_au" type="text" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label for="pn_bcf" class="text-xs">BCF</label>
									<input id="pn_bcf" type="text" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div class="flex items-end gap-2">
									<input id="pn_mf" type="checkbox" class="pn-checkbox" />
									<label for="pn_mf" class="text-xs">MF</label>
								</div>
								<div>
									<label for="pn_apresentacao" class="text-xs">Apresentacao</label>
									<select id="pn_apresentacao" class="n-inset w-full px-3 py-2" style="font-size:12px">
										<option>Cefalica</option>
										<option>Pelvica</option>
										<option>Transversa</option>
									</select>
								</div>
								<div>
									<label for="pn_pa" class="text-xs">PA</label>
									<input id="pn_pa" type="text" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label for="pn_peso" class="text-xs">Peso (kg)</label>
									<input id="pn_peso" type="text" inputmode="decimal" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label for="pn_altura" class="text-xs">Altura (m)</label>
									<input id="pn_altura" type="text" inputmode="decimal" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div>
									<label class="text-xs">IMC</label>
									<div id="pn_imc" class="pn-readout w-full text-xs">---</div>
								</div>
								<div class="sm:col-span-2">
									<label for="pn_edemaMmii" class="text-xs">Edema MMII</label>
									<input id="pn_edemaMmii" type="text" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
								<div class="sm:col-span-2">
									<label for="pn_queixas" class="text-xs">Queixas</label>
									<input id="pn_queixas" type="text" class="n-inset w-full px-3 py-2" style="font-size:12px" />
								</div>
							</div>
						</div>

						<!-- CONTROLES -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px"><i class="fa-solid fa-sliders mr-1"></i> Controles</h2>
							<div class="flex flex-row justify-between gap-3">
								<button type="button" id="pn_btnReiniciar" class="neu-btn" style="min-width:110px"><i class="fa fa-rotate mr-1"></i> Limpar</button>
								<button type="button" id="pn_btnCopiar" class="neu-btn neu-btn-primary" style="min-width:110px"><i class="fa fa-clipboard mr-1"></i> Copiar</button>
								<button type="button" id="pn_btnPuerperio" class="neu-btn" style="min-width:110px"><i class="fa-solid fa-baby mr-1"></i> Puerperio</button>
							</div>
						</div>

						<!-- PARAMETROS DE REFERENCIA -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px">PARAMETROS DE REFERENCIA</h2>
							<div class="overflow-x-auto">
								<table class="w-full text-xs n-table">
									<thead>
										<tr>
											<th class="px-2 py-1 text-left">Trimestre</th>
											<th class="px-2 py-1 text-center">Frequencia</th>
											<th class="px-2 py-1 text-center">Peso</th>
											<th class="px-2 py-1 text-center">PA</th>
											<th class="px-2 py-1 text-left">Outros</th>
										</tr>
									</thead>
									<tbody class="divide-y">
										<tr>
											<td class="px-2 py-1">1o TRIM (ate 12s)</td>
											<td class="px-2 py-1 text-center">Mensal</td>
											<td class="px-2 py-1 text-center">Ganho 1-2 kg</td>
											<td class="px-2 py-1 text-center">&lt;140/90</td>
											<td class="px-2 py-1">Acido folico</td>
										</tr>
										<tr>
											<td class="px-2 py-1">2o TRIM (14-28s)</td>
											<td class="px-2 py-1 text-center">Mensal</td>
											<td class="px-2 py-1 text-center">300-500 g/sem</td>
											<td class="px-2 py-1 text-center">&lt;140/90</td>
											<td class="px-2 py-1">Sulf. ferroso 20s</td>
										</tr>
										<tr>
											<td class="px-2 py-1">3o TRIM (29-36s)</td>
											<td class="px-2 py-1 text-center">Quinzenal</td>
											<td class="px-2 py-1 text-center">300-500 g/sem</td>
											<td class="px-2 py-1 text-center">&lt;140/90</td>
											<td class="px-2 py-1">Strep B (35-37s)</td>
										</tr>
										<tr>
											<td class="px-2 py-1">TERMO (37-41s)</td>
											<td class="px-2 py-1 text-center">Semanal</td>
											<td class="px-2 py-1 text-center">Manter ganho</td>
											<td class="px-2 py-1 text-center">&lt;140/90</td>
											<td class="px-2 py-1">CTG se necessario</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<!-- GUIAS RAPIDOS (tree views) -->
						<div class="pn-surface">
							<h2 class="mb-2 font-semibold text-[#23217c]" style="font-size:14px">GUIAS RAPIDOS</h2>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h3 class="text-xs font-semibold text-[#23217c] mb-1">Exames por Trimestre</h3>
									<ul class="flex flex-col gap-1">
										<li>
											<button type="button" class="pn-tv-toggle inline-flex items-center gap-2 text-xs font-semibold" aria-expanded="false"><span class="tw-caret">&#9654;</span> 1o TRIM (ate 12s)</button>
											<ul class="ml-6 mt-1 hidden list-disc text-xs text-gray-700">
												<li>GS/Rh, Hemograma, GJ</li>
												<li>Toxo IgG/IgM, TSH</li>
												<li>EAS + UC, Eletroforese Hgb</li>
												<li>TR: HIV/Sifilis/Hep B/C</li>
												<li>US TN (11-14s)</li>
											</ul>
										</li>
										<li>
											<button type="button" class="pn-tv-toggle inline-flex items-center gap-2 text-xs font-semibold" aria-expanded="false"><span class="tw-caret">&#9654;</span> 2o TRIM (24-28s)</button>
											<ul class="ml-6 mt-1 hidden list-disc text-xs text-gray-700">
												<li>TOTG 75g (jejum, 1h, 2h)</li>
												<li>Hemograma, Toxo suscetiveis</li>
												<li>TR: HIV/Sifilis/Hepatites</li>
												<li>Coombs indireto (Rh-)</li>
												<li>US obstetrica (22s+)</li>
											</ul>
										</li>
										<li>
											<button type="button" class="pn-tv-toggle inline-flex items-center gap-2 text-xs font-semibold" aria-expanded="false"><span class="tw-caret">&#9654;</span> 3o TRIM (29-36s)</button>
											<ul class="ml-6 mt-1 hidden list-disc text-xs text-gray-700">
												<li>Eritrograma, GJ</li>
												<li>Toxo suscetiveis</li>
												<li>TR ou VDRL/HIV</li>
												<li>Strep B (35-37s)</li>
												<li>CTG (40s+)</li>
											</ul>
										</li>
									</ul>
								</div>
								<div>
									<h3 class="text-xs font-semibold text-[#23217c] mb-1">Vacinacao &amp; Outros</h3>
									<ul class="flex flex-col gap-1">
										<li>
											<button type="button" class="pn-tv-toggle inline-flex items-center gap-2 text-xs font-semibold" aria-expanded="false"><span class="tw-caret">&#9654;</span> VACINACAO GESTANTE</button>
											<ul class="ml-6 mt-1 hidden list-disc text-xs text-gray-700">
												<li>dTpa (&ge;20s cada gestacao)</li>
												<li>Hepatite B (se nao imune)</li>
												<li>Influenza (campanha)</li>
												<li>COVID-19 (conforme PNI)</li>
											</ul>
										</li>
										<li>
											<button type="button" class="pn-tv-toggle inline-flex items-center gap-2 text-xs font-semibold" aria-expanded="false"><span class="tw-caret">&#9654;</span> COMPLICACOES</button>
											<ul class="ml-6 mt-1 hidden list-disc text-xs text-gray-700">
												<li>Pre-eclampsia: PA &ge;140/90</li>
												<li>DMG: TOTG &ge;92 mg/dL</li>
												<li>Trabalho de parto prematuro</li>
												<li>CIUR: peso &lt;p10</li>
											</ul>
										</li>
										<li>
											<button type="button" class="pn-tv-toggle inline-flex items-center gap-2 text-xs font-semibold" aria-expanded="false"><span class="tw-caret">&#9654;</span> PRESCRICOES ROTINA</button>
											<ul class="ml-6 mt-1 hidden list-disc text-xs text-gray-700">
												<li>Acido folico 400 &mu;g ate 3o mes</li>
												<li>Sulfato ferroso 40 mg (20s - 3m pos)</li>
												<li>Repelente (orientar)</li>
												<li>Complexo vitaminico se necessario</li>
											</ul>
										</li>
										<li>
											<button type="button" class="pn-tv-toggle inline-flex items-center gap-2 text-xs font-semibold" aria-expanded="false"><span class="tw-caret">&#9654;</span> CASOS ESPECIAIS</button>
											<ul class="ml-6 mt-1 hidden list-disc text-xs text-gray-700">
												<li>&ge;2 cesareas: agendar CMI</li>
												<li>Rh negativo: Coombs indireto</li>
												<li>40s: CTG no plantao</li>
												<li>41s: CTG + inducao</li>
												<li>STB: termo de consentimento</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>

					</div>

				</div>
			</div>

			<!-- MODAL PUERPERIO -->
			<div id="pn_modalOverlay" class="neu-modal-overlay hidden"></div>
			<div id="pn_modal" class="hidden fixed inset-0 z-50 items-center justify-center p-4">
				<div class="max-w-xl w-full overflow-hidden rounded-2xl shadow-2xl n-modal" style="background:#e0e5ec">
					<div class="flex items-center justify-between px-6 py-4 n-modal-head rounded-t-2xl">
						<h3 class="text-lg font-semibold">Puerperio - Apoio</h3>
						<button id="pn_btnCloseModal" type="button" class="text-2xl leading-none bg-transparent border-none cursor-pointer" aria-label="Fechar">&times;</button>
					</div>
					<div class="p-6 text-xs space-y-6" style="max-height:70vh;overflow-y:auto">
						<section>
							<h4 class="font-semibold text-[#23217c]">1a CONSULTA PUERPERAL (1a semana)</h4>
							<ul class="mt-2 list-disc pl-5 text-gray-700">
								<li>Informacoes do parto/internacao</li>
								<li>Sinais de alerta puerperal</li>
								<li>Revisar esquema vacinal</li>
								<li>Apoiar amamentacao</li>
								<li>Manter sulfato ferroso</li>
								<li>Planejamento familiar</li>
							</ul>
						</section>
						<section>
							<h4 class="font-semibold text-[#23217c]">2a CONSULTA PUERPERAL (ate 42 dias)</h4>
							<ul class="mt-2 list-disc pl-5 text-gray-700">
								<li>Avaliar involucao uterina</li>
								<li>Orientar metodos contraceptivos</li>
								<li>DIU pos-parto imediato (CMI)</li>
								<li>Se patologico: encaminhar gineco AB</li>
							</ul>
						</section>
						<div class="text-right">
							<button id="pn_btnCloseModal2" type="button" class="neu-btn neu-btn-primary">Fechar</button>
						</div>
					</div>
				</div>
			</div>
		`;

		// ===============================
		//  HELPERS
		// ===============================
		const getEl = function (id) { return document.getElementById(id); };
		const getVal = function (id) {
			const el = document.getElementById(id);
			return el ? (el.value || '').trim() : '';
		};

		const fmtBR = function (d) {
			if (!d || isNaN(d.getTime())) return '';
			const dd = String(d.getDate()).padStart(2, '0');
			const mm = String(d.getMonth() + 1).padStart(2, '0');
			const yyyy = d.getFullYear();
			return dd + '/' + mm + '/' + yyyy;
		};

		const addDays = function (date, n) {
			const d = new Date(date);
			d.setDate(d.getDate() + n);
			return d;
		};

		const fmtDateInput = function (val) {
			if (!val) return '';
			const d = new Date(val + 'T00:00:00');
			if (isNaN(d.getTime())) return '';
			return fmtBR(d);
		};

		function copyToClipboard(text) {
			try {
				if (navigator.clipboard && window.isSecureContext) {
					return navigator.clipboard.writeText(text).then(function () { return true; });
				}
			} catch (e) { /* fallback below */ }
			const ta = document.createElement('textarea');
			ta.value = text;
			ta.style.position = 'fixed';
			ta.style.left = '-9999px';
			document.body.appendChild(ta);
			ta.focus();
			ta.select();
			let ok = false;
			try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
			document.body.removeChild(ta);
			return Promise.resolve(ok);
		}

		function toast(msg) {
			const t = document.createElement('div');
			t.className = 'pn-toast';
			t.textContent = msg;
			document.body.appendChild(t);
			setTimeout(function () { t.remove(); }, 2200);
		}

		// ===============================
		//  IG / DPP CALCULATION
		// ===============================
		const dumEl = getEl('pn_dum');
		const igEl = getEl('pn_ig');
		const dppEl = getEl('pn_dpp');

		function recalcIG() {
			if (!dumEl) return;
			const dumVal = dumEl.value;
			if (!dumVal) {
				if (igEl) igEl.textContent = '--S --D';
				if (dppEl) dppEl.textContent = '--/--/----';
				return;
			}
			const dum = new Date(dumVal + 'T00:00:00');
			const hoje = new Date();
			const diffDias = Math.floor((hoje - dum) / (1000 * 60 * 60 * 24));
			if (diffDias < 0) {
				if (igEl) igEl.textContent = 'Data invalida';
				if (dppEl) dppEl.textContent = '---';
				return;
			}
			const semanas = Math.floor(diffDias / 7);
			const dias = diffDias - semanas * 7;
			if (igEl) igEl.textContent = semanas + 'S ' + dias + 'D';
			const dpp = addDays(dum, 280);
			if (dppEl) dppEl.textContent = fmtBR(dpp);
		}

		// ===============================
		//  IMC CALCULATION
		// ===============================
		const pesoEl = getEl('pn_peso');
		const alturaEl = getEl('pn_altura');
		const imcEl = getEl('pn_imc');

		function recalcIMC() {
			if (!pesoEl || !alturaEl || !imcEl) return;
			const pesoStr = (pesoEl.value || '').replace(',', '.');
			const altStr = (alturaEl.value || '').replace(',', '.');
			if (!pesoStr || !altStr) {
				imcEl.textContent = '---';
				imcEl.style.color = '';
				return;
			}
			const peso = parseFloat(pesoStr);
			const alt = parseFloat(altStr);
			if (!(peso > 0 && alt > 0)) {
				imcEl.textContent = '---';
				imcEl.style.color = '';
				return;
			}
			const imc = peso / (alt * alt);
			const v = imc.toFixed(2);
			let classe = 'Normal';
			let color = 'rgb(22 163 74)';
			if (imc < 18.5) {
				classe = 'Baixo peso';
				color = '#d97706';
			} else if (imc < 25) {
				classe = 'Normal';
				color = 'rgb(22 163 74)';
			} else if (imc < 30) {
				classe = 'Sobrepeso';
				color = '#d97706';
			} else {
				classe = 'Obesidade';
				color = '#dc3545';
			}
			imcEl.textContent = v + ' (' + classe + ')';
			imcEl.style.color = color;
		}

		// ===============================
		//  TESTE RAPIDO TOGGLES
		// ===============================
		function bindTRToggle() {
			const pairs = [
				['pn_testeRapido1', 'pn_data1'],
				['pn_testeRapido2', 'pn_data2'],
				['pn_testeRapido3', 'pn_data3']
			];
			pairs.forEach(function (pair) {
				const chk = getEl(pair[0]);
				const inp = getEl(pair[1]);
				if (!chk || !inp) return;
				chk.addEventListener('change', function () {
					inp.classList.toggle('hidden', !chk.checked);
					if (chk.checked && !inp.value) {
						inp.valueAsDate = new Date();
					}
				});
			});
		}

		// ===============================
		//  TREE VIEWS
		// ===============================
		function bindTreeViews() {
			container.querySelectorAll('.pn-tv-toggle').forEach(function (btn) {
				const list = btn.nextElementSibling;
				btn.addEventListener('click', function () {
					const expanded = btn.getAttribute('aria-expanded') === 'true';
					btn.setAttribute('aria-expanded', String(!expanded));
					if (list) list.classList.toggle('hidden');
				});
			});
		}

		// ===============================
		//  PUERPERIO MODAL
		// ===============================
		const modalEl = getEl('pn_modal');
		const modalOverlay = getEl('pn_modalOverlay');
		const btnCloseModal = getEl('pn_btnCloseModal');
		const btnCloseModal2 = getEl('pn_btnCloseModal2');

		function openModal() {
			if (modalOverlay) modalOverlay.classList.remove('hidden');
			if (modalEl) {
				modalEl.classList.remove('hidden');
				modalEl.classList.add('flex');
			}
		}

		function closeModal() {
			if (modalOverlay) modalOverlay.classList.add('hidden');
			if (modalEl) {
				modalEl.classList.add('hidden');
				modalEl.classList.remove('flex');
			}
		}

		// ===============================
		//  CLEAR ALL
		// ===============================
		function clearAll() {
			container.querySelectorAll('input').forEach(function (el) {
				if (el.type === 'checkbox') {
					el.checked = false;
				} else if (el.type !== 'button') {
					el.value = '';
				}
			});
			container.querySelectorAll('textarea').forEach(function (el) { el.value = ''; });
			container.querySelectorAll('select').forEach(function (el) { el.selectedIndex = 0; });

			if (igEl) igEl.textContent = '--S --D';
			if (dppEl) dppEl.textContent = '--/--/----';
			if (imcEl) {
				imcEl.textContent = '---';
				imcEl.style.color = '';
			}

			var data1 = getEl('pn_data1');
			var data2 = getEl('pn_data2');
			var data3 = getEl('pn_data3');
			if (data1) data1.classList.add('hidden');
			if (data2) data2.classList.add('hidden');
			if (data3) data3.classList.add('hidden');
		}

		// ===============================
		//  COPIAR (Markdown generation)
		// ===============================
		function copiarResumo() {
			const md = [];

			const dCons = fmtDateInput(getVal('pn_dataConsulta')) || fmtBR(new Date());
			md.push('**PRE-NATAL** -- Data: ' + dCons, '');

			const linha1 = [];
			const dDUM = fmtDateInput(getVal('pn_dum'));
			if (dDUM) linha1.push('- *DUM:* ' + dDUM);
			const igText = igEl ? igEl.textContent : '';
			if (igText && igText !== '--S --D') linha1.push('*IG:* ' + igText);
			const cnum = getVal('pn_consultaNum');
			if (cnum) linha1.push('*Consulta no:* ' + cnum);
			const dppText = dppEl ? dppEl.textContent : '';
			if (dppText && dppText !== '--/--/----') linha1.push('*DPP:* ' + dppText);
			if (linha1.length) md.push('### INFORMACOES BASICAS', linha1.join(' | '), '');

			md.push('### HISTORIA OBSTETRICA');
			const pnarEl = getEl('pn_pnar');
			md.push('- *G* ' + (getVal('pn_g') || '_') + ' *P* ' + (getVal('pn_p') || '_') + ' *A* ' + (getVal('pn_a') || '_') + ' | *HPP gest.:* ' + (getVal('pn_hppGest') || 'NDN'));
			md.push('- *PNAR?* ' + (pnarEl && pnarEl.checked ? 'Sim' : 'Nao') + ' | *OBS:* ' + (getVal('pn_obs') || '_'), '');

			md.push('### EXAME FISICO');
			const mfEl = getEl('pn_mf');
			md.push('- *AU:* ' + (getVal('pn_au') || '_') + ' | *BCF:* ' + (getVal('pn_bcf') || '_') + ' | *MF:* ' + (mfEl && mfEl.checked ? '+' : '-') + ' | *Apresentacao:* ' + (getVal('pn_apresentacao') || 'Cefalica'));
			md.push('- *PA:* ' + (getVal('pn_pa') || '_') + ' | *Peso:* ' + (getVal('pn_peso') || '_') + ' | *Altura:* ' + (getVal('pn_altura') || '_') + ' | *IMC:* ' + (imcEl ? imcEl.textContent : '---'));
			md.push('- *Edema MMII:* ' + (getVal('pn_edemaMmii') || '_'), '- *Queixas:* ' + (getVal('pn_queixas') || '_'), '');

			md.push('---');

			const tr1Chk = getEl('pn_testeRapido1');
			const tr2Chk = getEl('pn_testeRapido2');
			const tr3Chk = getEl('pn_testeRapido3');
			const tr1 = '- 1o: ' + (tr1Chk && tr1Chk.checked ? 'Sim' : 'Nao') + (getVal('pn_data1') ? ', *Data:* ' + fmtDateInput(getVal('pn_data1')) : '');
			const tr2 = '- 2o: ' + (tr2Chk && tr2Chk.checked ? 'Sim' : 'Nao') + (getVal('pn_data2') ? ', *Data:* ' + fmtDateInput(getVal('pn_data2')) : '');
			const tr3 = '- 3o: ' + (tr3Chk && tr3Chk.checked ? 'Sim' : 'Nao') + (getVal('pn_data3') ? ', *Data:* ' + fmtDateInput(getVal('pn_data3')) : '');
			md.push('### TESTES RAPIDOS', tr1, tr2, tr3, '');

			const solicitEl = getEl('pn_solicitados');
			const revisEl = getEl('pn_revisados');
			const solicit = solicitEl && solicitEl.checked;
			const revis = revisEl && revisEl.checked;
			let resumo = '- *Exames 1o|2o|3o tri.* -> ';
			resumo += (solicit && revis) ? 'Sol/Rev:' : (solicit ? 'Sol:' : (revis ? 'Rev:' : ''));
			const marc = [];
			const ex1 = getEl('pn_exames1Tri');
			const ex2 = getEl('pn_exames2Tri');
			const ex3 = getEl('pn_exames3Tri');
			if (ex1 && ex1.checked) marc.push('1o tri');
			if (ex2 && ex2.checked) marc.push('2o tri');
			if (ex3 && ex3.checked) marc.push('3o tri');
			md.push('### EXAMES', resumo + ' ' + (marc.length ? marc.join(', ') : '(*nenhum*)'), '', '---');

			const meds = getVal('pn_medicamentos');
			if (meds) md.push('### MEDICAMENTOS', meds, '');

			const vacEl = getEl('pn_vacinacao');
			const odontoEl = getEl('pn_acompOdonto');
			md.push('### VACINA/ODONTO');
			md.push('- *Vacinas ok?* ' + (vacEl && vacEl.checked ? 'Sim' : 'Nao'));
			md.push('- *Odontologia ok?* ' + (odontoEl && odontoEl.checked ? 'Sim' : 'Nao'));
			const obsVac = getVal('pn_observacoes');
			if (obsVac) md.push('- *OBS:* ' + obsVac);
			md.push('');

			md.push('### SWAB -- CULTURA PARA STREPTO B');
			const swabEl = getEl('pn_swabCultura');
			let sw = '- *Realizado?* ' + (swabEl && swabEl.checked ? 'Sim' : 'Nao');
			const dataSwabVal = getVal('pn_dataSwab');
			if (dataSwabVal) sw += ' | *Data:* ' + fmtDateInput(dataSwabVal);
			const igSwabVal = getVal('pn_igSwab');
			if (igSwabVal) sw += ' | *IG:* ' + igSwabVal;
			md.push(sw, '');

			const texto = md.join('\n');
			copyToClipboard(texto).then(function (ok) {
				toast(ok ? 'Resumo copiado para a area de transferencia.' : 'Falha ao copiar. Tente HTTPS ou outro navegador.');
			});
		}

		// ===============================
		//  EVENT LISTENERS
		// ===============================
		const btnReiniciar = getEl('pn_btnReiniciar');
		const btnCopiar = getEl('pn_btnCopiar');
		const btnPuerperio = getEl('pn_btnPuerperio');

		if (dumEl) dumEl.addEventListener('change', recalcIG);
		if (pesoEl) pesoEl.addEventListener('input', recalcIMC);
		if (alturaEl) alturaEl.addEventListener('input', recalcIMC);
		if (btnReiniciar) btnReiniciar.addEventListener('click', clearAll);
		if (btnCopiar) btnCopiar.addEventListener('click', copiarResumo);
		if (btnPuerperio) btnPuerperio.addEventListener('click', openModal);
		if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
		if (btnCloseModal2) btnCloseModal2.addEventListener('click', closeModal);
		if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

		// ===============================
		//  INIT
		// ===============================
		bindTRToggle();
		bindTreeViews();
		clearAll();

		console.log('[Prenatal] Renderizado com sucesso');
	}

	if (document.getElementById('psf_sub_prenatal')) {
		renderPrenatal();
	}

	window.renderPrenatal = renderPrenatal;
})();
