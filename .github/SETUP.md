# Configuração — Callables e Pacote MRI

Este guia descreve como configurar um repositório de script FiveM para usar os workflows reutilizáveis deste repo.

---

## 1. Pré-requisitos (uma vez por organização)

### PAT `GH_TOKEN`

1. Acesse **Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. Crie um token com escopo na organização `mri-Qbox-Brasil`
3. Permissões mínimas: **Contents** R&W, **Pull requests** R&W, **Packages** Read, **Actions** R&W
4. Salve como secret de organização `GH_TOKEN`

---

## 2. Secrets e variáveis por repositório

| Nome | Tipo | Obrigatório para | Descrição |
|---|---|---|---|
| `GH_TOKEN` | Secret | Todos | PAT da organização |
| `AI_API_KEY` | Secret | `generate-docs` | Chave da API de IA |
| `AI_BASE_URL` | Variable | `generate-docs` | URL base da API (vazio = OpenAI) |
| `AI_MODEL` | Variable | `generate-docs` | Modelo (ex: `gpt-4o-mini`) |
| `AI_PROVIDER` | Variable | `generate-docs` | `gemini` para Gemini native, vazio para OpenAI-compatible |
| `AI_CHUNKS` | Variable | `generate-docs` | Nº de chunks para processar o código (default: `4`) |
| `PR_TEAM` | Variable | `update-actions` | Time do GitHub para atribuir PRs. Opcional. |

---

## 3. Workflows — uso nos repositórios de script

### Release

```yaml
jobs:
  release:
    uses: mri-Qbox-Brasil/template-fivem/.github/workflows/callable-release.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

### Generate Docs

```yaml
jobs:
  docs:
    uses: mri-Qbox-Brasil/template-fivem/.github/workflows/callable-generate-docs.yml@main
    secrets:
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
    with:
      ai-provider: ${{ vars.AI_PROVIDER }}
      ai-base-url: ${{ vars.AI_BASE_URL }}
      ai-model: ${{ vars.AI_MODEL }}
      ai-chunks: ${{ vars.AI_CHUNKS }}
```

### Update Actions

```yaml
jobs:
  update:
    uses: mri-Qbox-Brasil/template-fivem/.github/workflows/callable-update-actions.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
    with:
      pr-team: ${{ vars.PR_TEAM }}
```

### Repo Dispatch

```yaml
jobs:
  notify-docs:
    uses: mri-Qbox-Brasil/template-fivem/.github/workflows/callable-repo-dispatch.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GH_TOKEN }}
    with:
      friendly-name: "Nome do Seu Script"
```

### Template Sync

```yaml
jobs:
  sync:
    uses: mri-Qbox-Brasil/template-fivem/.github/workflows/callable-template-sync.yml@main
    secrets:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 4. Checklist

- [ ] Secret `GH_TOKEN` disponível (herdado da org ou criado no repo)
- [ ] Secret `AI_API_KEY` configurado
- [ ] Variáveis `AI_BASE_URL`, `AI_MODEL`, `AI_PROVIDER`, `AI_CHUNKS` configuradas
- [ ] `fxmanifest.lua` contém `version '__VERSION__'`
- [ ] Templates em `.github/templates/` existem
- [ ] `friendly-name` atualizado em `repo-dispatch.yml`
- [ ] Commits seguem Conventional Commits
