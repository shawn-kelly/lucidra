#!/bin/bash

# 🌐 Lucidra Build Server
# Serves the optimized build for testing

echo "🌐 LUCIDRA BUILD SERVER STARTING..."
echo "=================================="

cd /mnt/d/projects/lucidra/frontend

if [ ! -d "build" ]; then
    echo "❌ Build directory not found!"
    echo "Run ./build-optimized.sh first"
    exit 1
fi

echo "✅ Build directory found"
echo "📊 Build stats:"
ls -lah build/

echo ""
echo "🚀 Starting server on http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""

# Use Python's built-in server to serve the build
if command -v python3 &> /dev/null; then
    cd build
    python3 -m http.server 3000
elif command -v python &> /dev/null; then
    cd build  
    python -m SimpleHTTPServer 3000
else
    echo "❌ Python not found for serving"
    echo "Install a web server or use 'npx serve build'"
    exit 1
fi