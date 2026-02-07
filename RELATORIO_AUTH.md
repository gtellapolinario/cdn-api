# Relatório Técnico: Implementação de Basic Auth no CDN (Traefik + Nginx)

## 🎯 Objetivo
Proteger o diretório `/apoioClinico/` com autenticação Basic Auth via Traefik, mantendo o restante do CDN público e garantindo rotação segura de credenciais.

## ✅ Resumo das Alterações

1.  **Segregação de Roteamento (Traefik)**:
    *   O serviço CDN foi dividido em dois roteadores lógicos no `docker-cdn.compose.yml`:
        *   `cdn` (Público): Atende `Host(cdn.gtmedics.com)` com prioridade baixa (1).
        *   `cdn_apoio` (Privado): Atende `Host(cdn.gtmedics.com) && PathPrefix(/apoioClinico/)` com prioridade alta (100) e middleware de autenticação.

2.  **Segurança de Credenciais (.env)**:
    *   As credenciais (hash) foram movidas para um arquivo `.env` fora do `docker-compose.yml` para evitar exposição no git e facilitar a rotação.
    *   Variável: `CDN_BASIC_AUTH_USERS`.

3.  **Ajuste no Nginx (`nginx.conf`)**:
    *   Removido o bloqueio manual `if ($cors_origin = "") { return 403; }` em `/apoioClinico/`.
    *   Motivo: O bloqueio agora é feito pelo Traefik (401). Manter o 403 no Nginx impediria o acesso legítimo mesmo com senha correta.
    *   **Correção Crítica**: Adicionadas aspas em regex com chaves `{}` (ex: `location ~* "\.[0-9a-f]{8,}\.js$"`) para evitar erro de sintaxe que causava loop de reinicialização no container.

---

## 🛠️ Arquivos Modificados

### 1. `docker-cdn.compose.yml` (Destaque)

```yaml
labels:
  # Roteador Público
  - "traefik.http.routers.cdn.rule=Host(`cdn.gtmedics.com`)"
  - "traefik.http.routers.cdn.priority=1"
  
  # Roteador Privado (/apoioClinico/)
  - "traefik.http.routers.cdn_apoio.rule=Host(`cdn.gtmedics.com`) && PathPrefix(`/apoioClinico/`)"
  - "traefik.http.routers.cdn_apoio.middlewares=cdn_auth"
  - "traefik.http.routers.cdn_apoio.priority=100"
  
  # Middleware (Lê do .env)
  - "traefik.http.middlewares.cdn_auth.basicauth.users=${CDN_BASIC_AUTH_USERS}"
```

### 2. `.env` (Novo)
Armazena os usuários e hashes (separados por vírgula para rotação).
```env
CDN_BASIC_AUTH_USERS=gtmed:$apr1$XXXXXXXX$YYYYYYYYYYYYYYYYYYYYYY
# Para rotação: userold:hash,usernew:hash
```

---

## 🧪 Validação dos Testes

### Teste 1: Acesso Público (`/geral/`)
**Comando:** `curl -I https://cdn.gtmedics.com/geral/js/ufs-brasil-module.js`
**Resultado:** `HTTP/2 200 OK`
*   Sem solicitação de senha.
*   Headers corretos (`access-control-allow-origin: *`).

### Teste 2: Acesso Privado (`/apoioClinico/`) - Sem Credencial
**Comando:** `curl -I https://cdn.gtmedics.com/apoioClinico/js/exames-module.js`
**Resultado:** `HTTP/2 401 Unauthorized`
*   `www-authenticate: Basic realm="traefik"` presente.
*   Bloqueio efetivo.

## 🔄 Procedimento de Rotação de Senha

1.  Gere o novo hash (ex: `htpasswd -nb user nova_senha`).
2.  Edite o arquivo `.env`:
    *   Adicione o novo usuário ao lado do antigo (separado por vírgula) para transição suave.
    *   `CDN_BASIC_AUTH_USERS=antigo:hash,novo:hash`
3.  Aplique a mudança:
    *   `docker compose -f docker-cdn.compose.yml up -d`
4.  Após validar que todos usam a nova senha, remova o usuário antigo do `.env` e reaplique.

---

## ⚠️ Próximos Passos
*   Certifique-se de que seus clientes (se houver scripts automatizados) usem Basic Auth para acessar `/apoioClinico/`.
*   Navegadores pedirão senha ao acessar a URL diretamente.
*   Inclusão via `<script src="...">` em outros sites **falhará** se o site não estiver no mesmo domínio (e mesmo assim browser não envia auth automaticamente para cross-origin scripts a menos que configurado com `crossorigin="use-credentials"` e o usuário já tenha logado). **Use com cautela para assets de frontend público.**

**Status Final:** ✅ Implementado e Validado.


<script>
(async () => {
    // Aponta para a pasta base
    const loader = new CDNLoader("https://cdn.gtmedics.com/apoioClinico");
    
    // Carrega o arquivo (internamente ele busca app-main.min.<HASH>.js)
    await loader.load("app-main.min.js");
    
    console.log("Script carregado com sucesso!");
})();
</script>