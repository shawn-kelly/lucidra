@echo off
echo 🚀 Starting Lucidra Development Environment...

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

:: Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

:: Create necessary directories
if not exist "backend\dist" mkdir backend\dist
if not exist "frontend\build" mkdir frontend\build
if not exist "python-ai\__pycache__" mkdir python-ai\__pycache__

:: Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
if not exist "node_modules" (
    npm install --legacy-peer-deps
)
echo ✅ Backend dependencies installed

:: Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
if not exist "node_modules" (
    npm install --legacy-peer-deps
)
echo ✅ Frontend dependencies installed

:: Install Python dependencies
echo 🐍 Installing Python dependencies...
cd ..\python-ai
python -m pip install -r requirements.txt
echo ✅ Python dependencies installed

cd ..

echo.
echo 🎉 Setup complete! To start the development servers:
echo.
echo Terminal 1 - Python AI Service:
echo cd python-ai ^&^& python -m ai_services.scenario_ai
echo.
echo Terminal 2 - Backend API:
echo cd backend ^&^& npm run dev
echo.
echo Terminal 3 - Frontend App:
echo cd frontend ^&^& npm start
echo.
echo Then visit: http://localhost:3000
echo.
pause