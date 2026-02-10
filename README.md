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

Plan to implement                                                                                                │
│                                                                                                                  │
│ Plan: Refactor tab_apoio.js — Remove iframe, use CDNLoader lazy-loading                                          │
│                                                                                                                  │
│ Context                                                                                                          │
│                                                                                                                  │
│ tab_apoio.js currently uses especialidades-module.js which loads specialties via an iframe (#contentFrame). The  │
│ iframe HTML files have been deleted. Need to refactor to the same CDNLoader lazy-loading + neuromorphic pattern  │
│ used in tab_psf.js and tab_guias.js.                                                                             │
│                                                                                                                  │
│ The tab has 5 specialty buttons: Clínica, Emergência, Ginecologia, Pediatria, Psiquiatria.                       │
│                                                                                                                  │
│ Key Discovery                                                                                                    │
│                                                                                                                  │
│ The specialty modules (clinica.js, farmacos_completo.js) do NOT have their own renderXxx() functions that create │
│  layout — they expect specific DOM containers to already exist. So tab_apoio.js must:                            │
│ 1. Create the appropriate HTML scaffold for each specialty                                                       │
│ 2. Load the JS module(s) via CDNLoader                                                                           │
│ 3. The module auto-initializes into the pre-existing containers                                                  │
│                                                                                                                  │
│ Module Dependencies                                                                                              │
│ Specialty: Clínica                                                                                               │
│ Scripts (load order): protocolos-completo.js → clinica.js                                                        │
│ Needs DOM: #entitySelect, #protocolCard, #toast                                                                  │
│ Has renderFn?: ProtocolosModule.init() (auto)                                                                    │
│ ────────────────────────────────────────                                                                         │
│ Specialty: Pediatria                                                                                             │
│ Scripts (load order): farmacos_completo.js                                                                       │
│ Needs DOM: #selectFarmaco, #inputPeso, #inputIdadeMeses, #btnCalcular, #btnCopiarRx, #medicationCard,            │
│ #copyStatus                                                                                                      │
│ Has renderFn?: DOMContentLoaded listener (auto)                                                                  │
│ ────────────────────────────────────────                                                                         │
│ Specialty: Emergência                                                                                            │
│ Scripts (load order): protocolos-data-module.js                                                                  │
│ Needs DOM: Custom viewer                                                                                         │
│ Has renderFn?: No — need custom render                                                                           │
│ ────────────────────────────────────────                                                                         │
│ Specialty: Ginecologia                                                                                           │
│ Scripts (load order): Placeholder                                                                                │
│ Needs DOM: —                                                                                                     │
│ Has renderFn?: —                                                                                                 │
│ ────────────────────────────────────────                                                                         │
│ Specialty: Psiquiatria                                                                                           │
│ Scripts (load order): Placeholder                                                                                │
│ Needs DOM: —                                                                                                     │
│ Has renderFn?: —                                                                                                 │
│ Implementation                                                                                                   │
│                                                                                                                  │
│ File: static-files/geral/components/prescription/tabs/js/tab_apoio.js (full rewrite)                             │
│                                                                                                                  │
│ Pattern: identical to tab_psf.js (IIFE, neuromorphic, CDNLoader, menu buttons, switchTool)                       │
│                                                                                                                  │
│ const APOIO_CDN = 'https://cdn.gtmedics.com/apoioClinico';                                                       │
│                                                                                                                  │
│ const apoioTools = [                                                                                             │
│   { key: 'clinica',     name: 'Clínica Médica',  icon: 'cardiology',   ... },                                    │
│   { key: 'emergencia',  name: 'Emergência',      icon: 'emergency',    ... },                                    │
│   { key: 'pediatria',   name: 'Pediatria',       icon: 'pediatrics',   ... },                                    │
│   { key: 'gineco',      name: 'Ginecologia',     icon: 'pregnancy',    ... },                                    │
│   { key: 'psiquiatria', name: 'Psiquiatria',     icon: 'psychology',   ... },                                    │
│ ];                                                                                                               │
│                                                                                                                  │
│ switchTool logic (key difference from tab_psf.js):                                                               │
│                                                                                                                  │
│ Since these modules don't have render functions, the approach is:                                                │
│ 1. Create container with specialty-specific HTML scaffold (providing expected DOM IDs)                           │
│ 2. Load dependency scripts first (e.g., protocolos-completo.js before clinica.js)                                │
│ 3. After loading, call the module's init function if needed                                                      │
│ 4. For modules that use DOMContentLoaded (farmacos_completo.js), manually trigger init by dispatching the event  │
│ or calling their exposed API                                                                                     │
│                                                                                                                  │
│ Per-specialty scaffolds:                                                                                         │
│                                                                                                                  │
│ - Clínica: Dropdown <select id="entitySelect"> + <div id="protocolCard"> + toast div. Load                       │
│ protocolos-completo.js → clinica.js. After load, call ProtocolosModule.init().                                   │
│ - Pediatria: Drug calculator scaffold with #selectFarmaco, #inputPeso, #inputIdadeMeses, #btnCalcular,           │
│ #btnCopiarRx, #medicationCard, #copyStatus. Load farmacos_completo.js. After load, populate the #selectFarmaco   │
│ dropdown from window.farmacosData.getCategorias() + getByCategoria(), then bind events.                          │
│ - Emergência: Load protocolos-data-module.js. Custom render logic in switchTool: builds a category sidebar       │
│ (cardiologia, respiratório, neurologia from ProtocolosDataModule.getCategorias()) + content viewer. Clicking     │
│ category shows protocol list; clicking protocol shows content HTML + "Copiar Rx" button using rx_text. All       │
│ neuromorphic styled. Layout: sidebar left (1/3) + viewer right (2/3).                                            │
│ - Ginecologia / Psiquiatria: Placeholder (same pattern as tab_guias.js showPlaceholder)                          │
│                                                                                                                  │
│ File: static-files/geral/components/prescription/tabs/js/especialidades-module.js — NO CHANGES                   │
│                                                                                                                  │
│ Keep as-is (not loaded by tab_apoio.js anymore; it's still used standalone).                                     │
│                                                                                                                  │
│ Build steps after editing                                                                                        │
│                                                                                                                  │
│ npm run build          # Rebuild bundle (tab_apoio.js is in bundle)                                              │
│ python3 build.py       # Hash + manifest update                                                                  │
│                                                                                                                  │
│ Verification                                                                                                     │
│                                                                                                                  │
│ 1. npm run build succeeds with no errors                                                                         │
│ 2. python3 build.py generates new hash for tab_apoio.js                                                          │
│ 3. Open integra_cdnLoader.html in browser:                                                                       │
│   - Click "Apoio" tab → see neuromorphic menu with 5 buttons                                                     │
│   - Click "Clínica Médica" → dropdown loads with protocols, selecting one shows card                             │
│   - Click "Pediatria" → drug calculator loads, select drug + enter weight → calculate                            │
│   - Click "Emergência" → protocol categories and viewer load                                                     │
│   - Click "Gineco" / "Psiquiatria" → placeholder shown                                                           │
│   - Switch between apoio specialties multiple times — no errors                                                  │
│   - Switch to other tabs (Prescrição, PSF) and back — content preserved                                          │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

● I'll start by reading the current tab_apoio.js and the reference files (tab_psf.js, tab_guias.js) to understand
  the exact patterns, then read the source modules to understand their DOM requirements.
                                                                                                                    
● Read 3 files (ctrl+o to expand)    
                                                                                                                    
● Good. Now let me read the source modules to understand their DOM requirements.                                  

● Searched for 1 pattern, read 2 files (ctrl+o to expand)                                                           
   
● The farmacos file is huge. Let me read just the initialization/DOM part and find the protocolos data module.      
                                                                                   
● Searched for 2 patterns, read 1 file (ctrl+o to expand)                                                           
                                                                                   
● Let me read the farmacos initialization section and the protocolos-data-module.                                   
                                                                                   
● Read 2 files (ctrl+o to expand)                                                                                   
   
● Let me see the end of protocolos-data-module.js to understand its exposed API.                                    
                                                                                   
● Searched for 2 patterns (ctrl+o to expand)                                                                        
   
● Now let me read the farmacos getCategorias/getByCategoria functions to understand the data structure for          
  populating the select.                                                           
                                                                                                                    
● Read 1 file (ctrl+o to expand)     
                                                                                                                    
● Now I have all the information needed. Let me also check protocolos-data-module for its full API.                 
   
● Read 1 file (ctrl+o to expand)                                                                                    
                                                                                   
● Now I have all the information I need. Let me also check what CDN path protocolos-completo.js and clinica.js live 
  at to use the right loader.                                                                                       
                                                                                                                    
● Read 1 file (ctrl+o to expand)                                                   
                                                                                                                    
● All the modules are in the apoioClinico CDN. Now I have everything needed. Let me write the new tab_apoio.js.     
  
  Key understanding:                                                                                                
  - Clínica: needs protocolos-completo.js (data) → clinica.js (UI). Clinica expects #entitySelect, #protocolCard,
  #toast in DOM. It auto-inits on load.                                                                             
  - Pediatria: needs farmacos_completo.js. It uses DOMContentLoaded listener, so after creating the DOM scaffold I  
  need to manually trigger init. Expects #selectFarmaco, #inputPeso, #inputIdadeMeses, #btnCalcular, #btnCopiarRx,
  #medicationCard, #copyStatus.
  - Emergência: needs protocolos-data-module.js. No built-in render — I'll build a custom sidebar+viewer.
  - Ginecologia / Psiquiatria: placeholders