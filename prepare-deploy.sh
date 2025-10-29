#!/bin/bash

echo "🚀 Preparing for deployment..."

# Step 1: Build the frontend
echo "📦 Building frontend..."
cd election-frontend
pnpm install
pnpm run build
cd ..

# Step 2: Copy dist to backend/public
echo "📂 Copying frontend build to backend..."
rm -rf backend/public
mkdir -p backend/public
cp -r election-frontend/dist/* backend/public/

# Step 3: Create uploads directory in backend
echo "📁 Creating uploads directory..."
mkdir -p backend/uploads

echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Commit and push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for Render deployment'"
echo "   git push"
echo ""
echo "2. Render will automatically deploy the backend folder"
echo "3. Frontend files are now in backend/public/"
