#!/bin/bash

echo "🚀 Starting Lucidra Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create necessary directories
mkdir -p backend/dist
mkdir -p frontend/build
mkdir -p python-ai/__pycache__

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install --legacy-peer-deps
fi
echo "✅ Backend dependencies installed"

# Install frontend dependencies  
echo "📦 Installing frontend dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install --legacy-peer-deps
fi
echo "✅ Frontend dependencies installed"

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
cd ../python-ai
if command -v python3 &> /dev/null; then
    python3 -m pip install -r requirements.txt
else
    python -m pip install -r requirements.txt
fi
echo "✅ Python dependencies installed"

cd ..

echo ""
echo "🎉 Setup complete! To start the development servers:"
echo ""
echo "Terminal 1 - Python AI Service:"
echo "cd python-ai && python -m ai_services.scenario_ai"
echo ""
echo "Terminal 2 - Backend API:"
echo "cd backend && npm run dev"
echo ""
echo "Terminal 3 - Frontend App:"
echo "cd frontend && npm start"
echo ""
echo "Then visit: http://localhost:3000"
echo ""