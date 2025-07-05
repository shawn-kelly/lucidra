#!/bin/bash

echo "🚀 Setting up Lucidra Development Environment..."

# Create directories if they don't exist
mkdir -p backend/src/modules/scenario
mkdir -p frontend/src/components/Scenario
mkdir -p python-ai/ai_services

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
cd python-ai
pip install -r requirements.txt
cd ..

echo "✅ Setup complete!"
echo ""
echo "To run the application:"
echo "1. Update your .env files with your actual API keys"
echo "2. Run: docker-compose up --build"
echo "3. Or run services individually:"
echo "   - Backend: cd backend && npm run dev"
echo "   - Frontend: cd frontend && npm start"
echo "   - Python AI: cd python-ai && python -m ai_services.scenario_ai"
echo ""
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend API will be available at: http://localhost:4000"
echo "🤖 AI Service will be available at: http://localhost:5000"