# 🧠 PROJECT_CONTEXT.md - Persistent Claude Memory System

## 🎯 PROJECT OVERVIEW

**Lucidra** is a comprehensive business strategy platform combining AI-powered intelligence with interactive framework implementation. The platform helps entrepreneurs and organizations design, evaluate, and execute strategic decisions through gamified UX flows and real-time market intelligence.

### Product Architecture:
- **Frontend**: React 18 + TypeScript + Chakra UI + Tailwind CSS
- **Backend**: Python + FastAPI + DuckDB/PostgreSQL  
- **Intelligence**: Multi-source data ingestion (social, financial, product signals)
- **Frameworks**: Interactive implementations of major business strategy books

---

## 🚨 CRITICAL CURRENT ISSUES

### **PRIMARY ISSUE**: Site Loading Problem ❌
- **Status**: CRITICAL - Site shows infinite "loading" screen
- **Root Cause**: React build process hanging indefinitely (60+ seconds timeout)
- **Attempted Fixes**: 
  - ✅ Fixed infinite re-render loops in useEffect hooks
  - ✅ Disabled automatic GitHub Actions (stopped 415+ workflow runs)
  - ❌ Build still hangs even with problematic components disabled
- **Current Workaround**: Using `complete-app.html` static file in build directory
- **Next Steps**: Need to identify build hanging cause (memory, circular deps, conflicts)

### **SECONDARY ISSUE**: Excessive CI/CD Runs ✅ RESOLVED
- **Issue**: 415+ GitHub Actions workflow runs
- **Fix**: Disabled automatic push triggers in `.github/workflows/bulletproof-deploy.yml`
- **Status**: ✅ Now manual workflow_dispatch only

---

## 📁 KEY FILES & ARCHITECTURE

### **Working Site Files** (Static - Currently Deployed):
- `/frontend/build/complete-app.html` - ✅ Main working app (489KB)
- `/frontend/build/index.html` - ✅ Redirect page to complete-app.html
- `/frontend/build/static/js/main.df667bd6.js` - ✅ Compiled React app

### **Source Files** (React - Build Issues):
- `/frontend/src/App.tsx` - ✅ Main React application
- `/frontend/src/components/` - ✅ All React components
- **Problem**: `npm run build` hangs indefinitely

### **Enhanced Modules Created** (Need Integration):
- `EnhancedBlueOceanModule.tsx` - ✅ Fixed infinite loops
- `EnhancedProcessManagement.tsx` - ✅ Fixed infinite loops  
- `MistralAIResearchAssistant.tsx` - ✅ Local AI simulation
- `LocalFeatureDevelopmentAssistant.tsx` - ✅ Planning tool

---

## 🔧 DEVELOPMENT COMMANDS

### **Build Commands**:
```bash
# React Development Server (WORKS)
cd /mnt/d/projects/lucidra/frontend && npm start

# React Production Build (HANGS - PROBLEM)
cd /mnt/d/projects/lucidra/frontend && npm run build

# Static Site Server (WORKS - CURRENT SOLUTION)
cd /mnt/d/projects/lucidra/frontend/build && python -m http.server 8000
```

### **Deployment Commands**:
```bash
# Force GitHub Push
cd /mnt/d/projects/lucidra && git add . && git commit -m "Update" && git push --force-with-lease

# Manual GitHub Pages Deploy
# Go to: https://github.com/[username]/lucidra/actions
# Click "Run workflow" on "🚀 Bulletproof Deployment"
```

### **Debug Commands**:
```bash
# Check build directory
ls -la /mnt/d/projects/lucidra/frontend/build/

# Test static files
cd /mnt/d/projects/lucidra/frontend/build && python -m http.server 8000

# React dev mode (for debugging)
cd /mnt/d/projects/lucidra/frontend && npm start
```

---

## 🎯 FEATURES IMPLEMENTED

### ✅ **Working Features** (In Static Build):
- **Multi-Tier Platform**: Lite ($29), Pro ($99), Enterprise (Custom)
- **Strategy Frameworks**: 6 interactive business strategy modules
- **AI Video Generation**: Tier-based video creation system
- **Financial Analysis**: DuPont, ABC costing, IRR/NPV, break-even
- **Project Management**: Complete project lifecycle with analytics
- **Global Market Data**: 6-region economic intelligence
- **Process Intelligence**: Workflow design and optimization

### 🔄 **In Development**:
- Enhanced Blue Ocean Strategy module
- Advanced Process Management suite
- Local AI research assistant
- Feature development planning tool

### ❌ **Known Issues**:
- React build process hanging (primary blocker)
- Need integration of enhanced modules into working build

---

## 🚀 ACCELERATION FRAMEWORK

### **Fast Deployment Scripts** (Requested):
```bash
# 1. Create lucidra-deploy.sh
#!/bin/bash
cd /mnt/d/projects/lucidra
git add .
git commit -m "🚀 Quick deploy $(date)"
git push --force-with-lease
echo "✅ Deployed - Manual GitHub Actions trigger needed"

# 2. Create quick-build.sh  
#!/bin/bash
cd /mnt/d/projects/lucidra/frontend/build
python -m http.server 8000 &
echo "✅ Static site running on http://localhost:8000"
```

### **Modular Component Chunking**:
- Break large components into smaller, focused modules
- Create reusable UI component library
- Implement lazy loading for performance

### **Reusable Dev Prompts** (`.claude_prompts/`):
- `fix-build.md` - Build debugging steps
- `add-component.md` - Component creation template
- `deploy-site.md` - Deployment checklist
- `debug-react.md` - React debugging guide

---

## 🎯 IMMEDIATE NEXT STEPS

### **Priority 1**: Fix Build Issue
1. Identify why `npm run build` hangs
2. Check for circular dependencies with `madge`
3. Analyze memory usage during build
4. Consider switching to Vite for faster builds

### **Priority 2**: Deploy Working Site
1. Push current static files to GitHub
2. Trigger manual GitHub Pages deployment
3. Verify live site functionality

### **Priority 3**: Integration Enhancement
1. Integrate enhanced modules into working static build
2. Create hybrid static/dynamic approach
3. Optimize for mobile responsiveness

---

## 📊 TECHNICAL DEBT

### **High Priority**:
- React build hanging issue (critical blocker)
- Component infinite loop prevention
- Build process optimization

### **Medium Priority**:
- API integration for real market data
- Backend FastAPI connection
- Database integration (DuckDB/PostgreSQL)

### **Low Priority**:
- Advanced gamification features
- Enterprise white-label options
- Advanced analytics dashboards

---

## 🌐 LIVE DEPLOYMENT STATUS

### **Current Status**: 
- ✅ Static files ready for deployment
- ✅ GitHub Pages configuration active
- ❌ Build process issues prevent automated deployment
- 🔄 Manual deployment workflow available

### **Live URL**: 
- GitHub Pages: `https://[username].github.io/lucidra/`
- Local Static: `http://localhost:8000`

### **Last Updated**: 
- Session: Current
- Build: complete-app.html (489KB)
- Status: Ready for manual deployment

---

## 💡 DEVELOPMENT PATTERNS DISCOVERED

### **Anti-Patterns to Avoid**:
```typescript
// ❌ CAUSES INFINITE LOOPS:
useEffect(() => {
  // logic here
}, [objectDependency]);

// ✅ USE INSTEAD:
useEffect(() => {
  // logic here  
}, [obj.specificProp, obj.array.length]);
```

### **Working Patterns**:
```typescript
// ✅ PROPER DEPENDENCY ARRAY:
useEffect(() => {
  updateData();
}, [
  data.property1,
  data.array.length,
  data.nested.specificValue
]);
```

---

*🧠 This file serves as Claude's persistent memory across sessions*
*📅 Last Updated: Current Session*
*🎯 Status: Active Development - Build Issues Priority*