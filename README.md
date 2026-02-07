# Managed CDN (Static Asset Server)

Servidor CDN estático otimizado para performance (Cache Imutável), segurança (Hotlink Protection) e versionamento automático.

## 🚀 Funcionalidades Principais

*   **Cache Imutável**: Arquivos JS recebem hash no nome (`app.a1b2c3d4.js`) para cache eterno no navegador.
*   **Versionamento Automático**: Script `build.py` detecta mudanças e gera novos hashes.
*   **Backup Automático**: Versões antigas são movidas para `storage/Backup` para manter a pasta limpa.
*   **Proteção de Origem**: Acesso direto bloqueado/controlado via `Referer` (apenas domínios autorizados).
*   **Smart Loader**: `cdn-loader.js` permite carregar a versão mais recente sem alterar o HTML.
*   **Relatório de Versões**: `VERSIONS.md` gerado automaticamente com snippets prontos para uso.

---

## 🛠️ Comandos de Manutenção (Dia a Dia)

### 1. Atualizei um arquivo `.js` (Geração de Nova Versão)
Sempre que você editar um arquivo JS na pasta `static-files`, rode este comando para gerar o novo hash e atualizar o manifesto.
**Não é necessário reiniciar o Docker.**

```bash
python3 build.py
```

*   Isso vai criar o arquivo novo (ex: `script.newhash.js`).
*   Vai mover o antigo para `storage/...Backup`.
*   Vai atualizar `VERSIONS.md`.

### 2. Atualizei o `nginx.conf` (Regras de Segurança/Cache)
Se você mudou regras de bloqueio ou cabeçalhos, precisa reiniciar o serviço Nginx.

```bash
docker restart cdn_nginx
```

### 3. Atualizei o `docker-cdn.compose.yml` (Portas/Labels)
Se alterou configurações do container ou traefik labels.

```bash
docker compose -f docker-cdn.compose.yml up -d
```

---

## 📦 Estrutura de Pastas

*   `static-files/`: Arquivos originais e versões atuais (servidos pelo Nginx).
*   `storage/`: Backups de versões antigas (não servidos publicamente).
*   `nginx.conf`: Configuração de Cache e Segurança.
*   `build.py`: Script de automação.
*   `VERSIONS.md`: Relatório gerado automaticamente com links e códigos.

---

## 💻 Como Usar no Frontend

Consulte o arquivo **[VERSIONS.md](./VERSIONS.md)** para pegar os códigos prontos.

### Opção A: Usando o CDNLoader (Recomendado)
Crie um arquivo base e carregue os módulos pelo nome lógico (sem hash). O loader resolve a versão correta.
```javascript
const loader = new CDNLoader("https://cdn.gtmedics.com/apoioClinico");
await loader.load("app-main.min.js");
```

### Opção B: Script Tag Direta (Manual)
Copie o link com hash do `VERSIONS.md`.
```html
<script src="https://cdn.gtmedics.com/apoioClinico/js/app-main.min.8974e42d.js"></script>
```
Lembre-se: Se usar esta opção, você precisará atualizar o HTML a cada deploy novo.

---

## 🔒 Segurança (Referer Protection)
O diretório `/apoioClinico/` está protegido contra uso em sites não autorizados.
*   **Permitido**: `gtmedics.com`, `*.gtmedics.com`, `localhost`.
*   **Bloqueado**: Outros domínios (retorna 403 Forbidden).
