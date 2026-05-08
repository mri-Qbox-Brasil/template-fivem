# Manual do template-fivem

## Visão Geral
Template oficial da **MRI Qbox Team** para criação de novos recursos FiveM. Fornece estrutura organizada, suporte a `ox_lib`, Lua 5.4 e pipeline de CI/CD com versionamento semântico automático.

## Funcionalidades
- **Estrutura Padronizada**: Pastas `client/`, `server/`, `shared/` para código organizado.
- **Automação Total**: Semantic Release para versionamento e releases automáticas via GitHub Actions.
- **Build Otimizado**: Script Bash para empacotar o recurso em ZIP pronto para produção.
- **Suporte a ox_lib**: Configuração pré-definida para menus e callbacks via ox_lib.
- **CI/CD Pronto**: Workflow de release configurado em `.github/workflows/release.yml`.

## Como Funciona
1. Use o botão **Use this template** no GitHub para criar um novo repositório.
2. Edite o `fxmanifest.lua` com o nome, descrição e versão do recurso.
3. Desenvolva o código nas pastas `client/`, `server/` e `shared/`.
4. Commits com convenção (`feat:`, `fix:`, `breaking change:`) disparam releases automáticas.

## Configuração
### fxmanifest.lua
```lua
fx_version "cerulean"
game "gta5"
lua54 "yes"

author "MRI Qbox Team"
description "Descrição do seu script"
version "__VERSION__"  -- Substituído automaticamente pelo release

client_scripts { "client/*.lua" }
server_scripts { "server/*.lua" }
shared_scripts { "shared/*.lua" }
```

### Convenção de Commits (Obrigatório para Releases)
| Tipo | Descrição | Versão |
|------|-------------|--------|
| `feat:` | Nova funcionalidade | MINOR (1.1.0) |
| `fix:` | Correção de bug | PATCH (1.0.1) |
| `breaking change:` | Mudança incompatível | MAJOR (2.0.0) |

## Scripts Disponíveis
### Build para Produção
```bash
./scripts/build.sh nome_do_script  # Gera dist/nome_do_script.zip
```

### GitHub Actions
O workflow em `.github/workflows/release.yml` executa automaticamente em push na `main`:
1. Build do recurso via `scripts/build.sh`.
2. Versionamento semântico via `semantic-release`.
3. Criação de release e tag no GitHub.

## Casos de Uso
- Criação de novos scripts FiveM seguindo os padrões da MRI Qbox.
- Garantia de versionamento consistente e releases automáticas.
- Desenvolvimento de recursos compatíveis com ox_lib e Qbox.

## Solução de Problemas
- **Release não dispara**: Verifique se os commits seguem a convenção (ex: `feat: nova funcionalidade`).
- **Build falha**: Confirme que o script `scripts/build.sh` tem permissão de execução (`chmod +x scripts/build.sh`).
- **Dependências não instalam**: Execute `npm install` na raiz do projeto para instalar o semantic-release.
