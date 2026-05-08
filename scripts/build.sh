#!/bin/bash
set -e

# Nome do script (folder name in .release)
SCRIPT_NAME=${1:-"package"}

echo "Iniciando build para: $SCRIPT_NAME"

rm -rf .release
mkdir -p ".release/$SCRIPT_NAME"

# Build web (se existir)
if [ -d "web" ]; then
  echo "Building web..."
  cd web
  npm install --prefer-offline --no-audit --no-fund
  npm run build
  cd ..
fi

# Copia arquivos relevantes (exclui web inteira — output copiado separadamente)
echo "Copiando arquivos..."
rsync -av \
  --exclude=".git" \
  --exclude=".github" \
  --exclude=".gitignore" \
  --exclude="scripts" \
  --exclude="package.json" \
  --exclude="package-lock.json" \
  --exclude="release.config.js" \
  --exclude="README.md" \
  --exclude="node_modules" \
  --exclude=".release" \
  --exclude="web" \
  . ".release/$SCRIPT_NAME"

# Copia apenas o output do build web
if [ -d "web/dist" ]; then
  echo "Copiando web/dist..."
  cp -r web/dist ".release/$SCRIPT_NAME/web"
fi

# Compacta
echo "Compactando..."
cd .release
zip -r "$SCRIPT_NAME.zip" "$SCRIPT_NAME"

echo "Build concluido: .release/$SCRIPT_NAME.zip"
