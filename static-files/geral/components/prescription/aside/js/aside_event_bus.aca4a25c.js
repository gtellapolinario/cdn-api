// aside_event_bus.js — Barramento de eventos centralizado
// Substitui window.addEventListener + window.dispatchEvent por um sistema controlado
(() => {
  'use strict';

  /** @typedef {'cnesDataLoaded'|'cnesDataCleared'|'cnesError'|'ubsSelected'|'hotstringClicked'|'hotstringExpanded'|'formattingApplied'|'editorBlockedStateChanged'|'editorContentCopied'|'asideReady'|'componentReady'} AsideEvent */

  class AsideEventBus {
    /** @type {Map<string, Set<Function>>} */
    #listeners = new Map();

    /** @type {Map<string, AbortController>} */
    #abortControllers = new Map();

    /**
     * Registra listener para um evento
     * @param {AsideEvent} event
     * @param {Function} callback
     * @returns {() => void} Função de unsubscribe
     */
    on(event, callback) {
      if (!this.#listeners.has(event)) {
        this.#listeners.set(event, new Set());
      }
      this.#listeners.get(event).add(callback);

      // Retorna unsubscribe
      return () => this.off(event, callback);
    }

    /**
     * Registra listener que executa apenas uma vez
     * @param {AsideEvent} event
     * @param {Function} callback
     */
    once(event, callback) {
      const wrapper = (...args) => {
        this.off(event, wrapper);
        callback(...args);
      };
      this.on(event, wrapper);
    }

    /**
     * Remove listener
     * @param {AsideEvent} event
     * @param {Function} callback
     */
    off(event, callback) {
      this.#listeners.get(event)?.delete(callback);
    }

    /**
     * Emite evento para todos os listeners
     * @param {AsideEvent} event
     * @param {*} [detail]
     */
    emit(event, detail = null) {
      const listeners = this.#listeners.get(event);
      if (!listeners?.size) {
        console.debug(`[EventBus] No listeners for "${event}"`);
        return;
      }

      for (const cb of listeners) {
        try {
          cb(detail);
        } catch (err) {
          console.error(`[EventBus] Error in "${event}" handler:`, err);
        }
      }
    }

    /**
     * Cria AbortController vinculado a um namespace (para cleanup por componente)
     * @param {string} namespace
     * @returns {AbortSignal}
     */
    getSignal(namespace) {
      if (this.#abortControllers.has(namespace)) {
        this.#abortControllers.get(namespace).abort();
      }
      const controller = new AbortController();
      this.#abortControllers.set(namespace, controller);
      return controller.signal;
    }

    /**
     * Remove TODOS os listeners de um namespace (componente)
     * @param {string} namespace
     */
    destroyNamespace(namespace) {
      if (this.#abortControllers.has(namespace)) {
        this.#abortControllers.get(namespace).abort();
        this.#abortControllers.delete(namespace);
      }
    }

    /**
     * Destrói todo o barramento
     */
    destroy() {
      this.#listeners.clear();
      for (const [, controller] of this.#abortControllers) {
        controller.abort();
      }
      this.#abortControllers.clear();
      console.log('[EventBus] Destroyed');
    }

    /**
     * Debug: lista eventos e quantidade de listeners
     */
    debug() {
      const info = {};
      for (const [event, set] of this.#listeners) {
        info[event] = set.size;
      }
      console.table(info);
    }
  }

  // Singleton
  if (!window.__asideBus) {
    window.__asideBus = new AsideEventBus();
  }

  window.AsideEventBus = AsideEventBus;
})();
