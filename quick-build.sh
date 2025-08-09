#!/bin/bash

# 🚀 Quick Build & Serve Script
# Starts local static server for immediate testing

echo "⚡ LUCIDRA QUICK BUILD & SERVE"
echo "=============================================="

# Navigate to build directory
cd /mnt/d/projects/lucidra/frontend/build

# Check if build directory exists and has files
if [ ! -d "." ]; then
    echo "❌ Build directory not found!"
    exit 1
fi

if [ ! -f "complete-app.html" ]; then
    echo "❌ complete-app.html not found in build directory!"
    echo "📁 Available files:"
    ls -la
    exit 1
fi

echo "✅ Build directory found with files:"
echo "📁 Directory: $(pwd)"
echo "📊 Files:"
ls -la | head -10

echo ""
echo "🌐 Starting local server..."
echo "=============================================="

# Kill any existing server on port 8000
echo "🧹 Cleaning up any existing servers..."
pkill -f "python.*http.server.*8000" 2>/dev/null || true
sleep 1

# Start Python HTTP server
echo "🚀 Starting Python HTTP server on port 8000..."
python3 -m http.server 8000 &

# Get the process ID
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Check if server started successfully
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Server started successfully!"
    echo ""
    echo "🌐 ACCESS URLS:"
    echo "   Local:    http://localhost:8000"
    echo "   Network:  http://$(hostname -I | awk '{print $1}'):8000"
    echo ""
    echo "📄 AVAILABLE PAGES:"
    echo "   Main App:     http://localhost:8000/"
    echo "   Direct App:   http://localhost:8000/complete-app.html"
    echo "   Test Pages:   http://localhost:8000/app.html"
    echo ""
    echo "🎯 Server PID: $SERVER_PID"
    echo "🛑 To stop: kill $SERVER_PID"
    echo ""
    echo "=============================================="
    echo "✅ LUCIDRA PLATFORM IS NOW RUNNING LOCALLY!"
    echo "=============================================="
else
    echo "❌ Failed to start server!"
    exit 1
fi