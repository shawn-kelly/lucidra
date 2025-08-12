#!/bin/bash

echo "🚀 LUCIDRA CLEAN DEPLOYMENT"
echo "=========================="

cd /mnt/d/projects/lucidra

echo "📦 Building optimized frontend..."
cd frontend

# Run optimized build
if ./build-optimized.sh; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed, exiting..."
    exit 1
fi

echo "🚀 Checking GitHub Pages deployment..."
cd ..

# Check GitHub workflow status
echo "📊 Checking GitHub Actions..."
gh workflow list || echo "GitHub CLI not available, skipping workflow check"

echo "🌐 Deployment should be live at: https://shawn-kelly.github.io/lucidra"
echo "⏰ Allow 2-3 minutes for GitHub Pages to update"

echo "✅ Deployment process completed!"