// aside_registry.js — Registro de componentes com resolução por Promise
// Elimina polling (setInterval) e race conditions
(() => {
  'use strict';

  class AsideRegistry {
    /** @type {Map<string, { render: Function, destroy?: Function }>} */
    #components = new Map();

    /** @type {Map<string, { resolve: Function, reject: Function }>} */
    #pending = new Map();

    /** @type {Map<string, Promise<void>>} */
    #promises = new Map();

    /** @type {string[]} */
    #required = [];

    /**
     * Define quais componentes são obrigatórios
     * @param {string[]} names
     */
    setRequired(names) {
      this.#required = names;

      // Cria promises para cada componente esperado
      for (const name of names) {
        if (!this.#promises.has(name)) {
          this.#promises.set(
            name,
            new Promise((resolve, reject) => {
              this.#pending.set(name, { resolve, reject });
            })
          );
        }
      }
    }

    /**
     * Componente se auto-registra quando pronto
     * @param {string} name
     * @param {{ render: Function, destroy?: Function }} api
     */
    register(name, api) {
      if (this.#components.has(name)) {
        console.warn(`[Registry] "${name}" already registered, replacing`);
        this.#components.get(name).destroy?.();
      }

      this.#components.set(name, api);

      // Resolve a promise pendente
      const pending = this.#pending.get(name);
      if (pending) {
        pending.resolve();
        this.#pending.delete(name);
      }

      console.log(`[Registry] ✅ "${name}" registered`);
    }

    /**
     * Aguarda todos os componentes obrigatórios
     * @param {number} [timeoutMs=8000]
     * @returns {Promise<{ ready: string[], missing: string[] }>}
     */
    async waitForAll(timeoutMs = 8000) {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Component registration timeout')), timeoutMs)
      );

      const results = await Promise.allSettled(
        this.#required.map((name) =>
          Promise.race([this.#promises.get(name) || Promise.reject(), timeout])
        )
      );

      const ready = [];
      const missing = [];

      this.#required.forEach((name, i) => {
        if (results[i].status === 'fulfilled') {
          ready.push(name);
        } else {
          missing.push(name);
        }
      });

      if (missing.length) {
        console.warn(`[Registry] ⚠️ Missing components: ${missing.join(', ')}`);
      }

      return { ready, missing };
    }

    /**
     * Retorna API de um componente
     * @param {string} name
     */
    get(name) {
      return this.#components.get(name) || null;
    }

    /**
     * Verifica se componente está registrado
     * @param {string} name
     */
    has(name) {
      return this.#components.has(name);
    }

    /**
     * Destrói todos os componentes
     */
    destroyAll() {
      for (const [name, api] of this.#components) {
        try {
          api.destroy?.();
          console.log(`[Registry] 🗑️ "${name}" destroyed`);
        } catch (err) {
          console.error(`[Registry] Error destroying "${name}":`, err);
        }
      }
      this.#components.clear();
      this.#pending.clear();
      this.#promises.clear();
    }
  }

  // Singleton
  if (!window.__asideRegistry) {
    window.__asideRegistry = new AsideRegistry();
  }

  window.AsideRegistry = AsideRegistry;
})();
