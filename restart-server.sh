#!/bin/bash

# Restart Server Script for Election 2025 Website

echo "🔄 Restarting Election 2025 Server..."
echo ""

# Navigate to project root
cd "$(dirname "$0")" || exit 1

# Step 1: Kill any existing processes on port 5000
echo "1️⃣ Stopping any existing server on port 5000..."
lsof -ti:5000 | xargs kill -9 2>/dev/null || true
sleep 2

# Step 2: Build the frontend
echo ""
echo "2️⃣ Building frontend..."
cd election-frontend || exit 1

echo "   📦 Installing dependencies..."
pnpm install --prefer-offline --silent

echo "   🧹 Cleaning cache..."
rm -rf node_modules/.vite-temp 2>/dev/null

echo "   🔨 Compiling TypeScript..."
npx tsc -b

echo "   ⚡ Building with Vite..."
npx vite build

# Check if build succeeded
if [ ! -f "dist/index.html" ] || [ ! "$(ls -A dist/assets 2>/dev/null)" ]; then
    echo ""
    echo "❌ Frontend build failed!"
    echo "Please check for errors above."
    exit 1
fi

echo "   ✅ Frontend build complete!"

# Step 3: Start the backend server
echo ""
echo "3️⃣ Starting backend server..."
cd ../backend || exit 1

# Check if .env exists
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  WARNING: .env file not found in backend directory!"
    echo "   Creating .env from root directory..."
    if [ -f "../.env" ]; then
        cp ../.env .env
        echo "   ✅ .env file copied"
    else
        echo "   ❌ No .env file found! Please create one."
        exit 1
    fi
fi

echo ""
echo "🚀 Starting server on port 5000..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Server is starting..."
echo "  Access at: http://localhost:5000"
echo "  Press Ctrl+C to stop"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the server
node server.js
