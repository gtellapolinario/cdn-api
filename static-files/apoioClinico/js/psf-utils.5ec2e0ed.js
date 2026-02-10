// psf-utils.js — Utilitários PSF (menu de ferramentas)
(() => {
  'use strict';

  /** Selector helper */
  const $psf = (id) => document.getElementById(id);

  /** Ferramentas disponíveis no PSF */
  const psfTools = [
    { name: 'Patologias Comuns', icon: 'medical_services', file: 'psf.html' },
  ];

  function renderPsfMenu() {
    const container = $psf("menu-psf");
    if (!container) return;

    container.innerHTML = "";
    psfTools.forEach((tool) => {
      container.innerHTML += `
        <button
          onclick="loadPsfTool('${tool.file}')"
          class="inline-flex items-center gap-2 rounded-full bg-[#e0e5ec] px-4 py-2 text-sm font-bold text-slate-700 shadow-[6px_6px_12px_#c1c9d2,-6px_-6px_12px_#ffffff] border-none hover:text-[#007BFF] active:shadow-[inset_4px_4px_8px_#c1c9d2,inset_-4px_-4px_8px_#ffffff] transition-all focus:outline-none">
          <span class="material-symbols-outlined text-base">${tool.icon || "description"}</span>
          ${tool.name}
        </button>
      `;
    });

    // Auto-load da primeira
    if (psfTools.length > 0) {
      loadPsfTool(psfTools[0].file);
    }
  }

  function loadPsfTool(file) {
    const frame = $psf("psfFrame");
    if (frame) frame.src = file;
  }

  // Init apenas se estiver no pai (onde existe menu-psf)
  if (document.getElementById("menu-psf")) {
    renderPsfMenu();
  }

  // Expor funções globalmente
  window.loadPsfTool = loadPsfTool;
  window.renderPsfMenu = renderPsfMenu;
})();
