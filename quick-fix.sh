#!/bin/bash

# Quick Fix & Start - Election 2025 Website
# This script fixes common issues and starts the server

echo "⚡ Quick Fix & Start - Election 2025"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")" || exit 1

# Step 1: Kill any process on port 5000
echo "1. Freeing port 5000..."
lsof -ti:5000 | xargs kill -9 2>/dev/null && echo "   ✅ Port 5000 freed" || echo "   ✅ Port 5000 already free"

# Step 2: Ensure .env is in backend directory
echo ""
echo "2. Checking environment configuration..."
if [ ! -f "backend/.env" ]; then
    if [ -f ".env" ]; then
        cp .env backend/.env
        echo "   ✅ .env copied to backend/"
    else
        echo "   ❌ ERROR: No .env file found!"
        exit 1
    fi
else
    echo "   ✅ backend/.env exists"
fi

# Step 3: Quick build frontend
echo ""
echo "3. Building frontend..."
cd election-frontend

# Check if already built
if [ -f "dist/index.html" ] && [ "$(ls -A dist/assets 2>/dev/null | wc -l)" -gt "0" ]; then
    echo "   ℹ️  Frontend already built, rebuilding..."
fi

pnpm install --prefer-offline --silent 2>&1 | grep -v "Already up to date" || true
rm -rf node_modules/.vite-temp 2>/dev/null
npx tsc -b 2>&1 | grep -i error || true
npx vite build 2>&1 | tail -5

if [ -f "dist/index.html" ] && [ "$(ls -A dist/assets 2>/dev/null | wc -l)" -gt "0" ]; then
    echo "   ✅ Frontend built successfully"
else
    echo "   ❌ Frontend build failed"
    exit 1
fi

# Step 4: Start server
cd ../backend

echo ""
echo "4. Starting server..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  🚀 Server starting on http://localhost:5000"
echo ""
echo "  Your modern hero section is ready with:"
echo "    ✨ Gradient text heading"
echo "    📊 Floating stats cards"  
echo "    🎨 Purple-blue background"
echo "    💫 Smooth animations"
echo "    🌍 Bilingual support (DE/EN)"
echo ""
echo "  Press Ctrl+C to stop the server"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

node server.js
