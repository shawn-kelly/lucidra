#!/bin/bash

echo "🧪 LUCIDRA SITE VERIFICATION TEST"
echo "================================="

# Test 1: Check if build files exist
echo "📁 Checking build files..."
if [ -f "/mnt/d/projects/lucidra/frontend/build/index.html" ]; then
    echo "✅ index.html exists ($(wc -c < /mnt/d/projects/lucidra/frontend/build/index.html) bytes)"
else
    echo "❌ index.html missing!"
fi

if [ -f "/mnt/d/projects/lucidra/frontend/build/complete-app.html" ]; then
    echo "✅ complete-app.html exists ($(wc -c < /mnt/d/projects/lucidra/frontend/build/complete-app.html) bytes)"
else
    echo "❌ complete-app.html missing!"
fi

# Test 2: Start local server and test
echo ""
echo "🌐 Starting local test server..."
cd /mnt/d/projects/lucidra/frontend/build

# Kill any existing server
pkill -f "python.*http.server.*9000" 2>/dev/null || true
sleep 1

# Start server on port 9000 for testing
python3 -m http.server 9000 &
SERVER_PID=$!
sleep 3

# Test if server responds
echo "🧪 Testing server response..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/ | grep -q "200"; then
    echo "✅ Local server responds (200 OK)"
    echo "🔗 Test URL: http://localhost:9000/"
else
    echo "❌ Local server not responding"
fi

# Test GitHub Pages URL (if accessible)
echo ""
echo "🌐 Testing GitHub Pages..."
if curl -s -o /dev/null -w "%{http_code}" https://shawn-kelly.github.io/lucidra/ | grep -q "200"; then
    echo "✅ GitHub Pages responds (200 OK)"
    echo "🔗 Live URL: https://shawn-kelly.github.io/lucidra/"
else
    echo "⚠️ GitHub Pages not responding (may still be deploying)"
fi

# Clean up
kill $SERVER_PID 2>/dev/null || true

echo ""
echo "================================="
echo "✅ VERIFICATION COMPLETE"
echo "Local test: http://localhost:9000/"
echo "Live site: https://shawn-kelly.github.io/lucidra/"