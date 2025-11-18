#!/bin/bash

DEV="C:/Users/mail/t11"
PROD="C:/Users/mail/soulrain-new"

echo "🔄 Syncing t11 → soulrain-new (Windows version)..."

# --- Copy SRC folder ---
echo "📁 Syncing src/ ..."
robocopy "$DEV/src" "$PROD/src" /MIR /XD node_modules dist .git

# --- Copy PUBLIC folder ---
echo "📁 Syncing public/ ..."
robocopy "$DEV/public" "$PROD/public" /MIR /XD .git

# --- Copy individual files ---
echo "📄 Syncing project config files ..."
cp -f "$DEV/index.html" "$PROD/"
cp -f "$DEV/vite.config.js" "$PROD/"
cp -f "$DEV/tailwind.config.js" "$PROD/"
cp -f "$DEV/postcss.config.js" "$PROD/"
cp -f "$DEV/package.json" "$PROD/"
cp -f "$DEV/mediaList.js" "$PROD/" 2>/dev/null

echo "⚠️ Skipping vite.config.js (remember: PROD version includes BASE URL)"

echo "✅ Sync complete!"

read -p "🚀 Deploy now? (y/n) " confirm
if [ "$confirm" = "y" ]; then
  cd "$PROD"
  ./deploy.sh
else
  echo "⏸️ Deployment skipped."
fi