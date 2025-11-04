#!/bin/bash

# Build Frontend Script for Election 2025 Website

echo "🚀 Starting frontend build process..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/election-frontend" || exit 1

echo "📦 Installing dependencies..."
pnpm install --prefer-offline

echo ""
echo "🧹 Cleaning temporary files..."
rm -rf node_modules/.vite-temp

echo ""
echo "🔨 Compiling TypeScript..."
npx tsc -b

echo ""
echo "⚡ Building with Vite..."
npx vite build

echo ""
if [ -f "dist/index.html" ] && [ "$(ls -A dist/assets)" ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📊 Build output:"
    ls -lh dist/assets/
    echo ""
    echo "🌐 You can now start the server with:"
    echo "   cd ../backend && node server.js"
else
    echo "❌ Build failed or incomplete!"
    echo "Please check the error messages above."
    exit 1
fi
