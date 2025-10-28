#!/bin/bash

# Diagnostic Script for Election 2025 Website

echo "🔍 Election 2025 Server Diagnostics"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Node and pnpm versions
echo "📦 Environment:"
echo "   Node.js: $(node --version 2>/dev/null || echo 'NOT FOUND')"
echo "   pnpm: $(pnpm --version 2>/dev/null || echo 'NOT FOUND')"
echo ""

# Check if port 5000 is in use
echo "🔌 Port 5000 Status:"
PORT_CHECK=$(lsof -ti:5000 2>/dev/null)
if [ -n "$PORT_CHECK" ]; then
    echo "   ⚠️  Port 5000 is OCCUPIED by process: $PORT_CHECK"
    echo "   Process details:"
    ps -p $PORT_CHECK -o pid,command 2>/dev/null || echo "   Cannot get process details"
else
    echo "   ✅ Port 5000 is AVAILABLE"
fi
echo ""

# Check backend .env file
echo "⚙️  Backend Configuration:"
if [ -f "backend/.env" ]; then
    echo "   ✅ .env file exists in backend/"
    echo "   Variables found:"
    grep -E "^[A-Z_]+=" backend/.env | sed 's/=.*/=***/' | sed 's/^/      /'
else
    echo "   ❌ .env file NOT FOUND in backend/"
    if [ -f ".env" ]; then
        echo "   ℹ️  Found .env in root directory"
    fi
fi
echo ""

# Check frontend build
echo "🎨 Frontend Build Status:"
if [ -f "election-frontend/dist/index.html" ]; then
    echo "   ✅ dist/index.html exists"
    
    ASSET_COUNT=$(ls election-frontend/dist/assets/*.css election-frontend/dist/assets/*.js 2>/dev/null | wc -l | tr -d ' ')
    if [ "$ASSET_COUNT" -gt "0" ]; then
        echo "   ✅ Assets built ($ASSET_COUNT files)"
        ls -lh election-frontend/dist/assets/ | tail -n +2 | sed 's/^/      /'
    else
        echo "   ❌ Assets folder is EMPTY - build required!"
    fi
else
    echo "   ❌ Frontend NOT BUILT - dist/index.html missing"
fi
echo ""

# Check database connection
echo "🗄️  Database:"
if [ -f "backend/.env" ]; then
    DB_URL=$(grep "^DATABASE_URL=" backend/.env | cut -d'=' -f2)
    if [ -n "$DB_URL" ]; then
        echo "   ✅ DATABASE_URL is configured"
        echo "   Host: $(echo $DB_URL | grep -oP '(?<=@)[^/]+' || echo 'Not parseable')"
    else
        echo "   ❌ DATABASE_URL is NOT SET"
    fi
else
    echo "   ⚠️  Cannot check - .env file missing"
fi
echo ""

# Recommendations
echo "💡 Recommendations:"
echo ""

if [ -z "$PORT_CHECK" ]; then
    echo "   ✅ Port is free - server can start"
else
    echo "   ⚠️  Kill existing process: kill -9 $PORT_CHECK"
fi

if [ ! -f "backend/.env" ]; then
    echo "   ⚠️  Copy .env to backend: cp .env backend/.env"
fi

ASSET_COUNT=$(ls election-frontend/dist/assets/*.css election-frontend/dist/assets/*.js 2>/dev/null | wc -l | tr -d ' ')
if [ "$ASSET_COUNT" -eq "0" ]; then
    echo "   ⚠️  Build frontend: cd election-frontend && pnpm run build"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "To fix all issues and start server, run:"
echo "   ./restart-server.sh"
echo ""
