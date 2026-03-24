#!/bin/bash
set -e

# Nome do script (folder name in dist)
SCRIPT_NAME=${1:-"package"}

echo "🚀 Iniciando build para: $SCRIPT_NAME"

rm -rf dist
mkdir -p "dist/$SCRIPT_NAME"

# Build web (se existir)
if [ -d "web" ]; then
  echo "📦 Building web..."
  cd web
  npm install --prefer-offline --no-audit --no-fund
  npm run build
  cd ..
fi

# Copia arquivos relevantes
echo "📂 Copiando arquivos..."
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
  --exclude="dist" \
  --exclude="web/node_modules" \
  . "dist/$SCRIPT_NAME"

# Compacta
echo "🗜️ Compactando..."
cd dist
zip -r "$SCRIPT_NAME.zip" "$SCRIPT_NAME"

echo "✅ Build concluído: dist/$SCRIPT_NAME.zip"