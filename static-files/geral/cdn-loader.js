class CDNLoader {
	constructor(baseUrl, { subDir = 'js' } = {}) {
		// Remove barra final do baseUrl se existir
		this.baseUrl = baseUrl.replace(/\/$/, '');
		this.subDir = subDir;
		this.manifestPromise = null;
	}

	async getManifest() {
		// Memoização: garante que o manifest seja baixado apenas uma vez
		if (!this.manifestPromise) {
			this.manifestPromise = fetch(`${this.baseUrl}/manifest.json`, { cache: 'no-store' })
				.then((r) => {
					if (!r.ok) throw new Error(`Erro ao carregar manifest: ${r.status}`);
					return r.json();
				})
				.catch((e) => {
					console.warn('CDNLoader: Manifest não encontrado, usando fallback.', e);
					return {}; // Retorna objeto vazio para permitir fallback
				});
		}
		return this.manifestPromise;
	}

	async load(logicalName, options = {}) {
		// Padrões seguros
		const opts = { defer: true, async: false, ...options };

		try {
			const manifest = await this.getManifest();
			// Se achar no manifest, usa o hash; senão, usa o nome original
			const hashed = manifest[logicalName];
			if (!hashed) {
				console.warn(`CDNLoader: "${logicalName}" não encontrado no manifest, usando fallback sem hash.`);
			}
			const resolved = hashed || logicalName;

			return this.injectScript(resolved, opts);
		} catch (error) {
			console.error(`CDNLoader: Falha ao carregar ${logicalName}`, error);
			throw error;
		}
	}

	injectScript(fileOrPath, options) {
		return new Promise((resolve, reject) => {
			const url = this.resolveUrl(fileOrPath);

			// Evita duplicação de scripts
			const existing = document.querySelector(`script[src="${url}"]`);
			if (existing) return resolve(existing);

			const s = document.createElement('script');
			s.src = url;

			// Lógica melhorada de async/defer
			if (options.async) {
				s.async = true;
			} else if (options.defer) {
				s.defer = true;
			}

			// Só define type se explícito (ex: 'module'), deixa o browser decidir o padrão
			if (options.type) s.type = options.type;

			s.onload = () => resolve(s);
			s.onerror = () => reject(new Error(`Falha ao carregar: ${url}`));

			document.head.appendChild(s);
		});
	}

	resolveUrl(fileOrPath) {
		// 1. Se for URL absoluta (http/https), retorna direto
		if (/^https?:\/\//i.test(fileOrPath)) return fileOrPath;

		// 2. Se começar com / (path absoluto), junta com a origin do baseUrl
		if (fileOrPath.startsWith('/')) {
			try {
				const u = new URL(this.baseUrl);
				return `${u.origin}${fileOrPath}`;
			} catch (e) {
				// Fallback se baseUrl for relativo/invalido (raro)
				return fileOrPath;
			}
		}

		// 3. Padrão: usa subDir configurado no construtor (default: 'js')
		return `${this.baseUrl}/${this.subDir}/${fileOrPath}`;
	}
}

window.CDNLoader = CDNLoader;
