#!/bin/bash

# 🚀 Lucidra Fast Deployment Script
# Creates instant deployment with status feedback

echo "🚀 LUCIDRA FAST DEPLOYMENT STARTING..."
echo "================================================"

# Navigate to project directory
cd /mnt/d/projects/lucidra

# Check current git status
echo "📊 Current Git Status:"
git status --short

# Add all changes
echo ""
echo "📦 Adding all changes..."
git add .

# Create commit with timestamp
COMMIT_MSG="🚀 Quick deploy $(date '+%Y-%m-%d %H:%M:%S')"
echo "💾 Creating commit: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Check if commit was created
if [ $? -eq 0 ]; then
    echo "✅ Commit created successfully"
else
    echo "ℹ️  No changes to commit"
fi

# Push to remote
echo ""
echo "🌐 Pushing to GitHub..."
git push --force-with-lease

if [ $? -eq 0 ]; then
    echo "✅ Push successful!"
else
    echo "❌ Push failed"
    exit 1
fi

echo ""
echo "================================================"
echo "🎉 DEPLOYMENT COMPLETED!"
echo "================================================"
echo ""
echo "🔧 Next Steps:"
echo "1. Go to GitHub Actions: https://github.com/[username]/lucidra/actions"
echo "2. Click 'Run workflow' on '🚀 Bulletproof Deployment'"
echo "3. Wait for deployment completion"
echo "4. Visit live site: https://[username].github.io/lucidra/"
echo ""
echo "⚡ Quick Commands:"
echo "   ./quick-build.sh    - Start local server"
echo "   ./debug-build.sh    - Debug build issues"
echo ""
echo "✅ Ready for manual GitHub Pages deployment trigger!"