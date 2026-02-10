/**
 * Página Principal - Viver a Vida v7.67
 * Convertido de index.html para módulo JavaScript
 * Padrão baseado em inc_radio.js
 */

(function() {
  'use strict';

  const MainPage = {
    state: {
      currentPage: 'home'
    },

    elements: {
      header: null,
      toolsSection: null,
      buttons: []
    },

    init() {
      this.cacheElements();
      this.setupEventListeners();
    },

    cacheElements() {
      this.header = document.querySelector('header');
      this.toolsSection = document.querySelector('section');
      this.buttons = document.querySelectorAll('.tool-button');
    },

    setupEventListeners() {
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('button:not([type])').forEach((btn) => btn.setAttribute('type', 'button'));
      });
    }
  };

  window.MainPage = MainPage;

  window.abrirExtrator = function() {
    window.location.href = 'extrator_2025.html';
  };

  window.abrirEscriba = function() {
    window.location.href = 'escriba_2025.html';
  };

  window.abrirExamesSimples = function() {
    window.location.href = 'exames_simples_2025.html';
  };

  window.abrirDengue = function() {
    window.location.href = 'dengue_2025.html';
  };

  window.abrirPsiquiatria = function() {
    window.location.href = 'psiqui_2025.html';
  };

  window.abrirVds = function() {
    window.location.href = 'visita_2025.html';
  };

  window.abrirPed = function() {
    window.location.href = 'ped_2025.html';
  };

  window.abrirPrenatal = function() {
    window.location.href = 'prenatal_neuro_2025.html';
  };

  window.abrirTree = function() {
    window.location.href = 'tree_2025.html';
  };

  document.addEventListener('DOMContentLoaded', function() {
    MainPage.init();
  });

})();
