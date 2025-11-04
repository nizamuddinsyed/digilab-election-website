#!/bin/bash

# Election Candidates Website 2025 - Quick Start Script
# This script helps you get the application running quickly

set -e  # Exit on error

echo "========================================="
echo "Election Candidates Website 2025"
echo "Quick Start Script"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Error: pnpm is not installed${NC}"
    echo "Please install pnpm first: npm install -g pnpm"
    exit 1
fi

echo -e "${GREEN}✓ pnpm is installed${NC}"

# Check if Node.js version is 18+
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js 18+ is required (current: v$(node -v))${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version is compatible${NC}"
echo ""

# Step 1: Backend setup
echo "Step 1: Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠ No .env file found. Please create one with your configuration.${NC}"
    echo "Required variables:"
    echo "  - DATABASE_URL"
    echo "  - JWT_SECRET"
    echo "  - PORT (default: 5000)"
    echo ""
    read -p "Press Enter to continue when .env is ready..."
fi

echo "Installing backend dependencies..."
pnpm install

echo ""
read -p "Do you want to initialize the database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Initializing database..."
    pnpm run init-db
    echo -e "${GREEN}✓ Database initialized${NC}"
    echo ""
    echo -e "${YELLOW}Default Admin Credentials:${NC}"
    echo "  Username: admin"
    echo "  Password: admin123"
    echo -e "${RED}  ⚠ CHANGE THESE CREDENTIALS AFTER FIRST LOGIN!${NC}"
    echo ""
fi

cd ..

# Step 2: Frontend setup
echo "Step 2: Building frontend..."
cd election-frontend

echo "Installing frontend dependencies..."
pnpm install

echo "Building production bundle..."
pnpm run build

if [ -d "dist" ]; then
    echo -e "${GREEN}✓ Frontend build successful${NC}"
else
    echo -e "${RED}✗ Frontend build failed${NC}"
    exit 1
fi

cd ..

# Step 3: Start the application
echo ""
echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "To start the application:"
echo "  cd backend"
echo "  pnpm start"
echo ""
echo "The application will be available at:"
echo "  http://localhost:5000"
echo ""
echo "Admin Panel:"
echo "  http://localhost:5000/admin"
echo ""
echo "Default Credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo -e "${RED}⚠ IMPORTANT: Change admin password after first login!${NC}"
echo ""
echo "For production deployment, see DEPLOYMENT.md"
echo "For troubleshooting, see TROUBLESHOOTING.md"
echo ""

read -p "Do you want to start the server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Starting server..."
    cd backend
    pnpm start
fi
