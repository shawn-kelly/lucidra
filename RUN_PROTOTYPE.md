# 🚀 Lucidra Working Prototype - Quick Start Guide

## 📋 What You Get

This is a **fully functional working prototype** of the Lucidra business planning platform with:

- ✅ **Complete Claude AI integration** (with fallback logic)
- ✅ **Token usage tracking and management**
- ✅ **User opt-in/opt-out controls**
- ✅ **Real-time progress bars and usage meters**
- ✅ **Automatic fallback to coaching logic**
- ✅ **Responsive web interface**
- ✅ **Professional business scenario analysis**

## 🏃‍♂️ Quick Start (3 Steps)

### Step 1: Prerequisites Check
Make sure you have installed:
- **Node.js 18+** (Download from [nodejs.org](https://nodejs.org))
- **Python 3.8+** (Download from [python.org](https://python.org))
- **Git** (Download from [git-scm.com](https://git-scm.com))

### Step 2: Setup (Automated)

**On Windows:**
```bash
# Double-click or run in Command Prompt
start-dev.bat
```

**On Mac/Linux:**
```bash
# Make executable and run
chmod +x start-dev.sh
./start-dev.sh
```

### Step 3: Start the Services

Open **3 separate terminals** and run:

**Terminal 1 - AI Service:**
```bash
cd python-ai
python -m ai_services.scenario_ai
```

**Terminal 2 - Backend API:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend App:**
```bash
cd frontend
npm start
```

## 🌐 Access Your Working Prototype

Visit: **http://localhost:3000**

The app will automatically open in your browser!

## 🎮 Testing the Prototype

### 1. **Basic Functionality Test**
- Load the homepage - you should see the Lucidra interface
- Look for the AI opt-in banner
- Check that the token meter appears in the sidebar

### 2. **AI Activation Test**
- Click **"Enable AI Analysis"** 
- Watch the token meter update with your allocated limits
- See the status change to "AI Enabled"

### 3. **Scenario Analysis Test**
Try these sample scenarios:

**Financial Scenario:**
```
Our company is considering a major restructuring to reduce operational costs by 30% while maintaining service quality.
```

**Technology Scenario:**
```
We want to implement AI automation in our customer service department to handle 60% of routine inquiries.
```

**Market Scenario:**
```
A new competitor has entered our market with aggressive pricing. We need to respond strategically.
```

### 4. **Usage Tracking Test**
- Submit multiple scenarios
- Watch the token counter increase
- See the progress bars update in real-time
- Test reaching the usage limits

### 5. **Fallback Logic Test**
- Continue submitting scenarios after reaching limits
- See the system automatically switch to coaching logic
- Notice the "Coaching Logic" badge vs "AI Generated"

## 🔧 Configuration Options

### Using Your Own Claude API Key

1. Get your Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
2. Edit `python-ai/.env`:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
   DEV_MODE=false
   ```
3. Restart the Python service

### Adjusting Usage Limits

Edit `backend/src/utils/aiUsageTracker.ts`:
```typescript
export const USAGE_LIMITS: UsageLimits = {
  free: { maxTokens: 1000, maxCalls: 5 },
  basic: { maxTokens: 10000, maxCalls: 50 },
  premium: { maxTokens: 100000, maxCalls: 500 }
};
```

## 🎯 What Each Service Does

### **Python AI Service** (Port 5000)
- Handles Claude API integration
- Provides intelligent fallback responses
- Manages business scenario analysis
- Health checks and service monitoring

### **Backend API** (Port 4000)
- User session management
- Token usage tracking
- Opt-in/opt-out controls
- Request routing and validation

### **Frontend App** (Port 3000)
- React user interface
- Real-time usage visualization
- AI activation controls
- Responsive design

## 🔍 Monitoring and Debugging

### Check Service Health
- AI Service: http://localhost:5000/health
- Backend API: http://localhost:4000/health

### View Service Logs
All services show real-time logs in their terminal windows:
- **Python**: Request handling, API status, errors
- **Backend**: Session management, usage tracking
- **Frontend**: React development server, hot reloading

### Common Issues & Solutions

**Port already in use:**
```bash
# Kill processes on ports
npx kill-port 3000 4000 5000
```

**Missing dependencies:**
```bash
# Reinstall everything
rm -rf */node_modules */package-lock.json
./start-dev.sh  # or start-dev.bat on Windows
```

**Python module errors:**
```bash
pip install -r python-ai/requirements.txt --force-reinstall
```

## 🎨 UI Features You'll See

### **Main Interface**
- Clean, professional business application design
- Two-column layout with scenario input and sidebar
- Real-time status indicators and progress bars

### **AI Activation Flow**
- Prominent opt-in banner with clear benefits
- One-click activation with immediate feedback
- Token allocation display and usage tracking

### **Token Meter Sidebar**
- Real-time usage visualization
- Color-coded progress bars (green → yellow → orange → red)
- Plan information and status indicators
- Upgrade prompts when approaching limits

### **Analysis Results**
- Professional business analysis formatting
- Clear indication of AI vs coaching logic source
- Actionable recommendations and strategic insights
- Export and sharing capabilities (simulated)

## 📊 Data Flow

1. **User submits scenario** → Frontend validates input
2. **Frontend checks session** → Backend verifies usage limits
3. **If allowed** → Python service analyzes with Claude API
4. **If not allowed** → Python service uses fallback logic
5. **Usage tracked** → Backend updates token counters
6. **Results displayed** → Frontend shows analysis with usage info

## 🚀 Production Deployment

This prototype can be deployed to:
- **Heroku** (using provided Dockerfiles)
- **AWS/Digital Ocean** (using docker-compose)
- **Vercel/Netlify** (frontend only with serverless functions)

## 🎯 Key Features Demonstrated

### ✅ **AI Activation System**
- Explicit user consent required
- Clear benefit communication
- Easy opt-out capability
- Session-based activation

### ✅ **Usage Management**
- Real-time token tracking
- Plan-based limitations
- Automatic deactivation
- Usage statistics and projections

### ✅ **Intelligent Fallback**
- Seamless switching to coaching logic
- Quality business analysis without AI
- Clear indication of source
- No service interruption

### ✅ **Professional UX**
- Modern, responsive design
- Intuitive user flows
- Real-time feedback
- Error handling and recovery

---

## 🎉 You're Ready!

Your fully functional Lucidra prototype is now running with:
- Complete AI integration with Claude
- Real usage tracking and management
- Professional business analysis capabilities
- Responsive web interface

**Test it thoroughly and see the Claude AI activation system in action!**

Need help? Check the logs in each terminal for detailed debugging information.