# 🚀 FiveM Script Template (MRI Edition)

> **Template oficial da MRI Qbox Team** para a criação de novos recursos de FiveM. Fornece uma estrutura sólida, organizada e pronta para um pipeline de CI/CD profissional.

![FiveM](https://img.shields.io/badge/FiveM-GTA%20V-green?style=flat-square)
![Lua](https://img.shields.io/badge/Lua-5.4-orange?style=flat-square)
![ox_lib](https://img.shields.io/badge/ox_lib-Supported-blue?style=flat-square)
![Semantic Release](https://img.shields.io/badge/Semantic%20Release-Automated-blueviolet?style=flat-square)
![MRI Qbox](https://img.shields.io/badge/MRI%20Qbox-Brasil-blue?style=flat-square)

---

## 📋 Table of Contents

- [Destaques](#-destaques-do-template)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Tecnologias](#-tecnologias)
- [Começando](#-começando)
- [Configuração do fxmanifest.lua](#-configuração-do-fxmanifestlua)
- [Build para Produção](#-build-para-produção)
- [Geração de Documentação](#-geração-de-documentação)
- [CI/CD e Automação](#-cicd-e-automação)
- [Convenção de Commits](#-convenção-de-commits)
- [Exemplos de Código](#-exemplos-de-código)
- [GitHub Actions](#-github-actions)
- [Scripts Disponíveis](#-scripts-disponíveis)

---

## ✨ Destaques do Template

| Feature | Descrição |
|---------|-------------|
| 🎯 **Padrões MRI** | Configuração de `lua54`, suporte a `ox_lib`, estrutura organizada |
| 🤖 **Automação Total** | Semantic Release, GitHub Actions, releases automáticas |
| 📦 **Build Otimizado** | Script Bash para empacotamento pronto para produção |
| 🏷️ **Versionamento** | Versionamento semântico automático via commits |
| 🧪 **Pronto para CI** | Lint, testes e deploy automáticos |
| 📝 **Documentação** | README estruturado incluso |

---

## 📁 Estrutura de Pastas

```
meu-script/
├── .github/
│   └── workflows/
│       └── release.yml          # GitHub Actions workflow
├── client/                      # Código fonte Lua do lado do cliente
│   └── main.lua
├── server/                      # Código fonte Lua do lado do servidor
│   └── main.lua
├── shared/                      # Código compartilhado (config, utils)
│   └── config.lua
├── .release/                    # Pasta gerada pelo build (não versionar)
│   └── meu-script/
│       └── (arquivos prontos)
├── scripts/
│   └── build.sh                 # Script de build para produção
├── fxmanifest.lua               # Manifesto do recurso FiveM
├── package.json                 # Dependências npm (semantic-release)
├── release.config.js            # Configuração do semantic-release
├── .gitignore
└── README.md
```

### Descrição das Pastas

| Pasta | Propósito | Exemplo de arquivo |
|-------|-----------|-------------------|
| `client/` | Lógica do cliente (UI, inputs, rendering) | `client/main.lua` |
| `server/` | Lógica do servidor (API, database, events) | `server/main.lua` |
| `shared/` | Código compartilhado (config, helpers) | `shared/config.lua` |
| `.release/` | Saída do build (zip pronto para produção) | `.release/meu-script.zip` |
| `scripts/` | Scripts de automação | `scripts/build.sh` |

---

## 🛠️ Tecnologias

### FiveM/Lua

| Tecnologia | Versão | Descrição |
|------------|--------|-------------|
| **FXVersion** | `cerulean` | Versão do FiveM |
| **Lua** | `5.4` | Versão do Lua |
| **ox_lib** | Latest | Framework de UI e utilitários |

### Node.js (Automação)

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| **semantic-release** | ^23.0.0 | Versionamento automático |
| **@semantic-release/changelog** | ^6.0.0 | Geração de changelog |
| **@semantic-release/github** | ^10.0.0 | Integração GitHub |
| **@semantic-release/exec** | ^6.0.3 | Executar comandos customizados |

---

## 🚀 Começando

### 1. Criar Repositório

Use o botão **"Use this template"** no GitHub:

1. Acesse https://github.com/mri-Qbox-Brasil/template-fivem
2. Clique em **Use this template**
3. Crie um novo repositório (ex: `mri_Qmeuscript`)

### 2. Clone o Repositório

```bash
git clone https://github.com/mri-Qbox-Brasil/mri_Qmeuscript.git
cd mri_Qmeuscript
```

### 3. Instale as Dependências

```bash
# Na raiz do projeto (para ferramentas de release e automação)
npm install
```

### 4. Configure o fxmanifest.lua

Edite `fxmanifest.lua`:

```lua
fx_version "cerulean"
game "gta5"

lua54 "yes"

author "MRI Qbox Team"
description "Descrição do meu script"
version "__VERSION__"  -- Será substituído automaticamente

-- Scripts de Cliente
client_scripts {
    "client/*.lua"
}

-- Scripts de Servidor
server_scripts {
    "server/*.lua"
}
```

---

## 📦 Build para Produção

Para gerar o pacote final do recurso, use o script de build:

```bash
# Formato: ./scripts/build.sh [nome_do_script]
./scripts/build.sh mri_meuscript
```

### O que o build faz:

1. ✅ Limpa a pasta `.release/`
2. 📂 Copia arquivos relevantes (exclui `.git`, `node_modules`, etc.)
3. 🗜️ Compacta em `.release/mri_meuscript.zip`
4. 🚀 Pronto para upload no servidor!

### Saída do Build

```
.release/
├── mri_meuscript/           # Pasta organizada
│   ├── fxmanifest.lua
│   ├── client/
│   ├── server/
│   └── shared/
└── mri_meuscript.zip        # Arquivo compactado pronto
```

---

## 📄 Geração de Documentação

O template inclui um pipeline de geração automática de `README.md` e `MANUAL.md` via IA, configurável para qualquer provider compatível com a API da OpenAI (OpenAI, Groq, OpenRouter, Together AI, etc.).

### Como funciona

Ao fazer push na `main` com alterações em arquivos `.lua`, `fxmanifest.lua` ou nos templates, o workflow `.github/workflows/generate-docs.yml` executa `scripts/generate-docs.js`, que:

1. Coleta os arquivos-fonte do script (`fxmanifest.lua`, `client/`, `server/`, `shared/` e, se existir, `web/src/`)
2. Lê os templates em `.github/templates/`
3. Chama a API de IA para gerar os dois arquivos seguindo a estrutura dos templates
4. Commita `README.md` e `MANUAL.md` de volta no repositório (apenas se houver mudança)

### Configuração

Acesse **Settings → Secrets and variables → Actions** no repositório e configure:

| Tipo | Nome | Descrição |
|------|------|-----------|
| Secret | `AI_API_KEY` | Chave de API do provider escolhido |
| Variable | `AI_BASE_URL` | URL base da API (deixe vazio para usar OpenAI padrão) |
| Variable | `AI_MODEL` | Modelo a usar (ex: `gpt-4o-mini`, `llama-3.3-70b-versatile`) |

### Exemplos de providers

| Provider | `AI_BASE_URL` | Modelo sugerido |
|----------|--------------|-----------------|
| OpenAI | *(vazio)* | `gpt-4o-mini` |
| Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b-versatile` |
| OpenRouter | `https://openrouter.ai/api/v1` | `google/gemini-flash-1.5` |
| Together AI | `https://api.together.xyz/v1` | `meta-llama/Llama-3-70b-chat-hf` |

### Personalizando os templates

Edite os arquivos em `.github/templates/` para ajustar a estrutura e o estilo da documentação gerada:

- `README.template.md` — voltado para desenvolvedores (dependências, API, eventos, exports)
- `MANUAL.template.md` — voltado para admins de servidor (instalação, configuração, comandos)

A IA usa os templates como referência de estrutura e estilo, preenchendo o conteúdo com base no código-fonte real do script.

### Executar manualmente

Na aba **Actions** do repositório, selecione **Generate Docs** e clique em **Run workflow**.

---

## 🤖 CI/CD e Automação

### GitHub Actions Workflow

O template inclui um workflow pré-configurado (`.github/workflows/release.yml`):

```yaml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - name: Install deps
        run: npm install
      
      - name: Build
        run: |
          REPO_NAME=$(echo ${{ github.repository }} | cut -d'/' -f2)
          chmod +x scripts/build.sh && bash scripts/build.sh $REPO_NAME
      
      - name: Release
        run: npm run release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### O que acontece automaticamente:

| Gatilho | Ação |
|---------|------|
| Push na `main` | ✅ Build do recurso |
| | ✅ Versionamento semântico |
| | ✅ Geração de changelog |
| | ✅ Criação de release no GitHub |
| | ✅ Tag da versão |

---

## 📝 Convenção de Commits

Obrigatório para o funcionamento do **Semantic Release**:

| Tipo | Descrição | Versão |
|------|-------------|--------|
| `feat:` | Novas funcionalidades | **MINOR** (1.1.0) |
| `fix:` | Correções de bugs | **PATCH** (1.0.1) |
| `chore:` | Manutenção geral | - |
| `docs:` | Documentação | - |
| `refactor:` | Refatoração de código | - |
| `breaking change:` | Mudanças que quebram compatibilidade | **MAJOR** (2.0.0) |

### Exemplos:

```bash
git commit -m "feat: adiciona sistema de inventário"
git commit -m "fix: corrige erro no spawn de veículos"
git commit -m "docs: atualiza README com novos exemplos"
git commit -m "breaking change: altera API de exports"
```

---

## 💻 Exemplos de Código

### Exemplo: client/main.lua

```lua
-- client/main.lua
local function showMyMenu()
    lib.registerMenu({
        id = 'my_menu',
        title = 'Meu Script',
        options = {
            {
                label = 'Opção 1',
                description = 'Descrição da opção'
            }
        }
    }, function(selected, scrollIndex, args)
        print('Selecionado:', selected)
    end)
    lib.showMenu('my_menu')
end

RegisterCommand('meuscript', function()
    showMyMenu()
end, false)
```

### Exemplo: server/main.lua

```lua
-- server/main.lua
local function doSomething(source, data)
    print(('Jogador %s executou algo'):format(source))
    -- Lógica do servidor
end

lib.callback.register('meuscript:server:doSomething', function(source, data)
    doSomething(source, data)
    return true
end)
```

### Exemplo: shared/config.lua

```lua
-- shared/config.lua
Config = {}

Config.Debug = false
Config.MaxItems = 10
Config.NotifyType = 'ox'  -- 'ox' ou 'qb'
```

---

## 📦 Scripts Disponíveis

### `scripts/build.sh`

Script Bash para empacotamento parametrizado pronto para produção.

**Uso:**
```bash
./scripts/build.sh [nome_do_script]
```

**Exemplo:**
```bash
./scripts/build.sh mri_meuscript
```

**O que ele faz:**
1. Remove pasta `.release/` antiga
2. Cria nova pasta `.release/[nome_do_script]`
3. Copia arquivos (excluindo lixo)
4. Gera `.release/[nome_do_script].zip`

---

## 🔗 Links Úteis

- 📚 [Documentação Qbox](https://docs.qbox.re/)
- 🛠️ [ox_lib](https://github.com/overextended/ox_lib)
- 🤖 [Semantic Release](https://github.com/semantic-release/semantic-release)
- 🐙 [MRI Qbox no GitHub](https://github.com/mri-Qbox-Brasil)
- 💬 [Discord da MRI](https://discord.gg/uEfGD4mmVh)

---

## 📊 Comparação: Antes vs Depois

| Aspecto | Manual | Com Template |
|---------|--------|---------------|
| **Setup inicial** | ~30 min | ~2 min |
| **Versionamento** | Manual | Automático |
| **Build** | Manual | Automatizado |
| **Releases** | Manual | Automáticas |
| **Padronização** | Variável | Garantida |

---

## 📄 Licença

MIT License

---

<p align="center">
  <i>Desenvolvido com excelência pela MRI Qbox Team Brasil 🇧🇷</i>
</p>
