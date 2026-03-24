# 🚀 FiveM Script Template (MRI Edition)

Este é o template oficial da **MRI Qbox Team** para a criação de novos recursos de FiveM. Ele combina uma estrutura sólida em Lua com um frontend moderno em React, tudo integrado em um pipeline de CI/CD profissional.

## 🌟 Destaques do Template

- **Framework Moderno**: React 18 + Vite + Tailwind CSS + TypeScript.
- **Comunicação NUI Nativa**: Contextos e hooks (`useNuiEvent`, `fetchNui`) prontos para usar.
- **Padrões MRI**: Configuração de `lua54`, suporte a `ox_lib` e estrutura organizada.
- **Automação Total**:
  - **Semantic Release**: Versionamento automático via commits.
  - **GitHub Actions**: Atualização automática de dependências e ações.
  - **Build Script**: Script Bash para empacotamento parametrizado.

## 📁 Estrutura de Pastas

- `client/`: Código fonte Lua do lado do cliente.
- `server/`: Código fonte Lua do lado do servidor.
- `shared/`: Código compartilhado entre cliente e servidor (ex: configs).
- `web/`: Aplicação React (NUI). O build é gerado em `web/build`.
- `dist/`: Pasta gerada pelo build contendo o recurso compactado.

## 🛠️ Começando

1. **Criar Repositório**: Use o botão "Use this template" no GitHub.
2. **Instalar Dependências**:
   ```bash
   # Na raiz do projeto (para ferramentas de release)
   npm install
   
   # Na pasta web (para o frontend)
   cd web
   npm install --legacy-peer-deps
   ```
3. **Desenvolvimento Web**:
   ```bash
   cd web
   npm run dev
   ```

## 📦 Build para Produção

Para gerar o pacote final do recurso, use o script de build passando o nome desejado para a pasta (normalmente o nome do script):

```bash
# Formato: ./scripts/build.sh [nome_do_script]
./scripts/build.sh mri_meuscript
```

Isso executará o build do frontend e organizará os arquivos em `dist/mri_meuscript`, gerando também um arquivo `mri_meuscript.zip`.

## 📝 Convenção de Commits

Obrigatório para o funcionamento do Semantic Release:
- `feat:` Novas funcionalidades.
- `fix:` Correções de bugs.
- `chore:`, `docs:`, `refactor:` Manutenção geral.

---
*Desenvolvido com excelência pela MRI Qbox Team.*