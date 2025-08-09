#!/bin/bash

# 🔍 Debug Build Issues Script
# Comprehensive build debugging and diagnosis

echo "🔍 LUCIDRA BUILD DEBUGGING DIAGNOSTIC"
echo "=================================================="

# Navigate to frontend directory
cd /mnt/d/projects/lucidra/frontend

echo "📁 Current Directory: $(pwd)"
echo ""

# Check Node.js and npm versions
echo "🔧 ENVIRONMENT CHECK:"
echo "   Node.js: $(node --version)"
echo "   NPM: $(npm --version)"
echo ""

# Check package.json
if [ -f "package.json" ]; then
    echo "✅ package.json found"
    echo "📦 Dependencies check:"
    grep -E '"react"|"typescript"|"@types"' package.json | head -5
else
    echo "❌ package.json not found!"
fi
echo ""

# Check for common build-breaking files
echo "🔍 POTENTIAL BUILD ISSUES:"

# Check for circular dependencies
if command -v madge &> /dev/null; then
    echo "🔄 Checking circular dependencies..."
    madge --circular src/ || echo "ℹ️  madge not installed - skipping circular dependency check"
else
    echo "ℹ️  Install madge for circular dependency check: npm install -g madge"
fi

# Check TypeScript errors
echo ""
echo "📝 TypeScript compilation check:"
if command -v npx &> /dev/null; then
    timeout 30s npx tsc --noEmit --skipLibCheck 2>&1 | head -20
    if [ $? -eq 124 ]; then
        echo "⏱️  TypeScript check timed out (30s) - potential hanging issue"
    fi
else
    echo "❌ npx not available"
fi

echo ""
echo "💾 DISK SPACE CHECK:"
df -h . | head -2

echo ""
echo "🧠 MEMORY USAGE:"
free -h | head -2

echo ""
echo "📁 BUILD DIRECTORY STATUS:"
if [ -d "build" ]; then
    echo "✅ Build directory exists"
    echo "📊 Build files:"
    ls -la build/ | head -10
    
    echo ""
    echo "📏 Key file sizes:"
    [ -f "build/complete-app.html" ] && echo "   complete-app.html: $(wc -c < build/complete-app.html) bytes"
    [ -f "build/index.html" ] && echo "   index.html: $(wc -c < build/index.html) bytes"
    [ -f "build/static/js/main.df667bd6.js" ] && echo "   main.df667bd6.js: $(wc -c < build/static/js/main.df667bd6.js) bytes"
else
    echo "❌ Build directory not found"
fi

echo ""
echo "🔍 COMMON BUILD ISSUES TO CHECK:"
echo "   1. ❌ Infinite useEffect loops (check EnhancedBlueOceanModule.tsx)"
echo "   2. ❌ Circular import dependencies"  
echo "   3. ❌ TypeScript errors causing hang"
echo "   4. ❌ Memory exhaustion during build"
echo "   5. ❌ Node.js version compatibility"

echo ""
echo "⚡ RECOMMENDED FIXES:"
echo "   1. Run: npm run start (dev mode works)"
echo "   2. Use existing static build: ./quick-build.sh"
echo "   3. Check component imports in App.tsx"
echo "   4. Verify useEffect dependency arrays"

echo ""
echo "🚀 QUICK SOLUTIONS:"
echo "   • Use working static build: ./quick-build.sh"
echo "   • Deploy current static files: ./lucidra-deploy.sh"
echo "   • Debug React components: npm run start"

echo ""
echo "=================================================="
echo "🎯 BUILD DIAGNOSIS COMPLETE"
echo "=================================================="