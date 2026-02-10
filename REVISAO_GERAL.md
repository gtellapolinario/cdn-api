# Relatório de Revisão Geral — CDN API

**Data:** 2026-02-09
**Escopo:** Revisão completa de todos os componentes JS, build system, nginx, HTML e manifests

## PROBLEMAS BAIXOS

### 17. Poluição do namespace global
Todos os componentes exportam funções diretamente em `window` (~20+ funções) sem namespace, checagem de colisão ou prefixo. Ex: `window.renderAside`, `window.insertAtCursor`, `window.copyToClipboard`.

### 18. `document.execCommand()` deprecado
**Arquivo:** `aside_formatting_tools.js` (linha 135)
API deprecada para formatação de contenteditable. Já documentado no código com comentário sobre migração futura para Tiptap/ProseMirror.

### 19. Dados UBS hardcoded
**Arquivo:** `aside_ubs_selector.js` (linhas 7-82)
Array com 75+ unidades de saúde hardcoded. Mudanças requerem novo deploy.

### 20. console.log mantido no bundle de produção
**Arquivo:** `build-bundle.cjs` (linha 160)
`drop_console: false` — todos os `console.log` permanecem no bundle minificado.

### 21. Versão hardcoded
**Arquivo:** `build-bundle.cjs` (linha 20)
`const VERSION = '1.0.0'` manual. Deveria ler do `package.json`.

### 22. API inconsistente no registry dos componentes
Cada componente registra métodos diferentes: `cnes-search` tem `search()`, `ubs-selector` tem `getUBSList()`, `hotstrings-panel` tem `reload()`. Sem interface padrão.

### 23. Toasts com setTimeout sem cleanup
**Arquivos:** `aside_cnes_search.js`, `aside_ubs_selector.js`
`setTimeout` aninhados para animação de fade-out não são cancelados no `destroy()`. Impacto mínimo (300ms), mas viola o padrão de lifecycle.

---

## RESUMO

| Severidade | Quantidade | Exemplos |
|-----------|-----------|----------|
| Baixo | 7 | Namespace pollution, execCommand deprecated, dados hardcoded |

**Ação imediata recomendada:** Rodar `python3 build.py` para sincronizar os manifests, e corrigir as referências CSS nos arquivos HTML.
