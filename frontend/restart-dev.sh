#!/bin/bash
# Kill existing processes
pkill -f "react-scripts start" 2>/dev/null
pkill -f "http.server" 2>/dev/null

# Wait a moment
sleep 2

# Start the development server
cd /home/kelco/lucidra-project/frontend
PORT=3001 npm start