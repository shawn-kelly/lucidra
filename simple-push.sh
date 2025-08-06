#!/bin/bash

echo "🚀 Simple Git Push for Lucidra"
echo "=============================="

cd /mnt/d/Projects/lucidra

# Force remove all locks
rm -rf .git/index.lock .git/HEAD.lock .git/refs/heads/main.lock

# Initialize if needed
git init 2>/dev/null

# Add remote if not exists
git remote add origin https://github.com/your-username/lucidra.git 2>/dev/null || true

# Add specific files only
git add frontend/src/components/HuggingFaceVideoProduction.tsx
git add frontend/src/components/RealTimePESTLEAnalysis.tsx  
git add CLAUDE.md

# Quick commit
git commit -m "Add AI Video & PESTLE Analysis"

# Push
git push -u origin main

echo "✅ Push completed!"