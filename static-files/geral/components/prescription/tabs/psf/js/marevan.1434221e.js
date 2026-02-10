(() => {
	'use strict';

	/**
	 * Renderiza a aba Marevan (Protocolo Varfarina)
	 */
	function renderMarevanTab() {
		const container = document.getElementById('tab_marevan'); // Certifique-se de criar este ID no HTML principal

		if (!container) {
			console.error('Container #tab_marevan não encontrado');
			return;
		}

		container.innerHTML = `
      <div class="mx-auto w-full max-w-7xl p-4 md:p-6 text-[#26282c] text-sm font-sans">
        
        <!-- App Container -->
        <div class="rounded-[30px] p-6 bg-[#e0e5ec] shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] transition-all duration-300 ring-1 ring-slate-200">
    
          <!-- Header -->
          <header class="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-2xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff]">
                <span class="material-symbols-outlined text-3xl text-red-500">water_drop</span>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-[#2d3748] tracking-tight">Anticoagulação (Varfarina)</h1>
                <p class="text-xs text-[#5f6775] font-medium">Protocolo Prático & Ajuste de Dose</p>
              </div>
            </div>
    
            <div class="flex gap-3">
              <!-- Botão Voltar (Pode precisar de ajuste dependendo da navegação da SPA) -->
              <button onclick="window.history.back()"
                class="px-4 py-2 rounded-xl bg-[#e0e5ec] text-[#5f6775] text-xs font-bold shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] hover:text-[#2d3748] hover:shadow-[4px_4px_8px_#c1c9d2,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">arrow_back</span> Voltar
              </button>
            </div>
          </header>
    
          <!-- Main Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    
            <!-- Left Column: Quick Stats & Targets (4 cols) -->
            <div class="lg:col-span-4 space-y-6">
    
              <!-- Card: Metas de INR -->
              <div class="p-5 rounded-[20px] bg-[#e0e5ec] shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
                <h3 class="text-sm font-bold text-[#2d3748] mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600">target</span>
                  Metas de INR
                </h3>
                <div class="space-y-3">
                  <div
                    class="flex justify-between items-center p-3 rounded-2xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff]">
                    <span class="text-xs font-semibold text-[#5f6775]">Geral (FA, TVP, TEP)</span>
                    <span class="text-sm font-black text-blue-600">2.0 - 3.0</span>
                  </div>
                  <div
                    class="flex justify-between items-center p-3 rounded-2xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff]">
                    <span class="text-xs font-semibold text-[#5f6775]">Prótese Biológica</span>
                    <span class="text-sm font-black text-blue-600">2.0 - 3.0</span>
                  </div>
                  <div
                    class="flex justify-between items-center p-3 rounded-2xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff]">
                    <span class="text-xs font-semibold text-[#5f6775]">Prótese Mec. Aórtica</span>
                    <span class="text-sm font-black text-blue-600">2.0 - 3.0</span>
                  </div>
                  <div
                    class="flex justify-between items-center p-3 rounded-2xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] border-l-4 border-orange-400">
                    <span class="text-xs font-semibold text-[#5f6775]">Prótese Mec. Mitral</span>
                    <span class="text-sm font-black text-orange-600">2.5 - 3.5</span>
                  </div>
                </div>
              </div>
    
              <!-- Card: Alertas Rápidos -->
              <div class="p-5 rounded-[20px] bg-[#e0e5ec] shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
                <h3 class="text-sm font-bold text-[#2d3748] mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-amber-600">warning</span>
                  Interações (Macetes)
                </h3>
                <ul class="space-y-3 text-xs text-[#5f6775]">
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-red-500 text-sm">arrow_upward</span>
                    <span>
                      <strong>Aumentam INR (Risco Sangramento):</strong><br>
                      Bactrim, Metronidazol, Cipro, Claritro, Amiodarona, Fluconazol, AINEs.
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-green-600 text-sm">arrow_downward</span>
                    <span>
                      <strong>Reduzem INR (Risco Trombo):</strong><br>
                      Rifampicina, Carbamazepina, Fenitoína, Vitamina K (Verdes escuros).
                    </span>
                  </li>
                  <li class="flex items-start gap-2 mt-2 pt-2 border-t border-slate-300">
                    <span class="material-symbols-outlined text-blue-500 text-sm">restaurant</span>
                    <span>
                      <strong>Dieta:</strong> Não proibir folhas verdes! Orientar <em>constância</em> na ingestão.
                    </span>
                  </li>
                </ul>
              </div>
    
            </div>
    
            <!-- Right Column: Content & Algorithm (8 cols) -->
            <div class="lg:col-span-8 space-y-6">
    
              <!-- Card: Algoritmo de Ajuste -->
              <div
                class="p-6 rounded-[30px] bg-[#e0e5ec] shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] animate-fadeIn">
                <h2 class="text-lg font-bold text-[#2d3748] mb-6 flex items-center gap-2">
                  <span class="material-symbols-outlined text-purple-600">tune</span>
                  Ajuste Prático de Dose (Alvo 2.0 - 3.0)
                </h2>
    
                <div
                  class="overflow-x-auto rounded-2xl shadow-[inset_6px_6px_12px_#c1c9d2,inset_-6px_-6px_12px_#ffffff] bg-[#e0e5ec] p-4">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-slate-300">
                        <th class="py-3 px-4 text-xs font-black text-[#5f6775] uppercase">INR Atual</th>
                        <th class="py-3 px-4 text-xs font-black text-[#5f6775] uppercase">Ajuste na Dose Semanal</th>
                        <th class="py-3 px-4 text-xs font-black text-[#5f6775] uppercase">Próximo Controle</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm font-medium text-[#2d3748]">
                      <tr class="hover:bg-black/5 transition-colors">
                        <td class="py-3 px-4 text-red-600 font-bold">&lt; 1.5</td>
                        <td class="py-3 px-4">Aumentar <span class="text-green-600 font-bold">+15 a 20%</span></td>
                        <td class="py-3 px-4">1 semana</td>
                      </tr>
                      <tr class="hover:bg-black/5 transition-colors bg-slate-50/50">
                        <td class="py-3 px-4 text-orange-600 font-bold">1.5 - 1.9</td>
                        <td class="py-3 px-4">Aumentar <span class="text-green-600 font-bold">+10%</span></td>
                        <td class="py-3 px-4">1-2 semanas</td>
                      </tr>
                      <tr class="hover:bg-purple-50 transition-colors bg-purple-100/30">
                        <td class="py-3 px-4 text-green-700 font-black flex items-center gap-2">
                          <span class="material-symbols-outlined text-sm">check_circle</span> 2.0 - 3.0
                        </td>
                        <td class="py-3 px-4 font-bold text-green-700">MANTER DOSE</td>
                        <td class="py-3 px-4">4 semanas</td>
                      </tr>
                      <tr class="hover:bg-black/5 transition-colors bg-slate-50/50">
                        <td class="py-3 px-4 text-orange-600 font-bold">3.1 - 3.9</td>
                        <td class="py-3 px-4">Reduzir <span class="text-red-500 font-bold">-10 a 15%</span></td>
                        <td class="py-3 px-4">1-2 semanas</td>
                      </tr>
                      <tr class="hover:bg-black/5 transition-colors">
                        <td class="py-3 px-4 text-red-600 font-bold">4.0 - 4.9</td>
                        <td class="py-3 px-4">Omitir 1 dose + Reduzir <span class="text-red-500 font-bold">-10 a 15%</span>
                        </td>
                        <td class="py-3 px-4">1 semana</td>
                      </tr>
                      <tr class="hover:bg-red-50 transition-colors">
                        <td class="py-3 px-4 text-red-800 font-black">&ge; 5.0</td>
                        <td class="py-3 px-4 text-xs">
                          <strong>Sem sangramento:</strong> Suspender até INR &lt; 3.0. Reiniciar -50%.<br>
                          <strong>> 9.0 ou sgto:</strong> Vitamina K oral (1-2.5mg) + Suspender.
                        </td>
                        <td class="py-3 px-4">24-48 horas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p class="mt-4 text-xs text-[#5f6775]">
                  * <strong>Dica de Ouro:</strong> Pense sempre na dose <em>semanal</em> total. Ex: paciente toma 5mg/dia
                  (35mg/sem). Ajuste de 10% = 3.5mg (aprox meio comprimido a menos na semana).
                </p>
              </div>
    
              <!-- Grid for secondary infos -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    
                <!-- Card: Início da Terapia -->
                <div class="p-5 rounded-[20px] bg-[#e0e5ec] shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
                  <h3 class="text-sm font-bold text-[#2d3748] mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined text-emerald-600">play_circle</span>
                    Como Iniciar
                  </h3>
                  <ul class="space-y-2 text-xs text-[#5f6775]">
                    <li>• Dose inicial padrão: <strong>5 mg/dia</strong> (1cp).</li>
                    <li>• Idosos/Baixo Peso: Iniciar com <strong>2.5 mg/dia</strong>.</li>
                    <li>• Não fazer dose de ataque (risco de necrose cutânea).</li>
                    <li>• <strong>Ponte com Heparina:</strong> Obrigatória se TVP/TEP agudos até INR &ge; 2 por 24h (min 5
                      dias).</li>
                    <li>• Checar INR no 3º dia.</li>
                  </ul>
                </div>
    
                <!-- Card: Perioperatório -->
                <div class="p-5 rounded-[20px] bg-[#e0e5ec] shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff]">
                  <h3 class="text-sm font-bold text-[#2d3748] mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined text-indigo-500">medical_services</span>
                    Perioperatório
                  </h3>
                  <ul class="space-y-2 text-xs text-[#5f6775]">
                    <li>• <strong>Suspender 5 dias antes</strong> da cirurgia.</li>
                    <li>• Procedimentos pequenos (catarata, dermato, dentário): Pode manter se INR na faixa inferior.</li>
                    <li>• <strong>Ponte Terapêutica:</strong> Só se alto risco trombótico (Válvula Mecânica, SAF, TEV
                      &lt;3m). Usar Enoxaparina 1mg/kg 12/12h até 24h antes.</li>
                  </ul>
                </div>
    
              </div>
            </div>
    
          </div>
    
        </div>
      </div>
    `;

		console.log('Aba Marevan renderizada');
	}

	// Expor globalmente
	window.renderMarevanTab = renderMarevanTab;

	// Auto-executar se o DOM já estiver pronto (opcional, igual ao exemplo)
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', renderMarevanTab);
	} else {
		renderMarevanTab();
	}
})();
