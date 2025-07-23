#!/bin/bash
cd /home/kelco/lucidra-project/frontend/build
echo "🚀 Starting Lucidra server..."
echo "📍 Server running at: http://localhost:8000"
echo "🌐 Open your browser and go to: http://localhost:8000"
echo "🔥 Press Ctrl+C to stop"
echo ""
python3 -m http.server 8000