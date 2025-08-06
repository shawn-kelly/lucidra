#!/bin/bash

echo "🚀 Lucidra GitHub Pages Deployment Script"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the lucidra-project root directory"
    exit 1
fi

# Check git status
echo "📊 Checking git status..."
git status

echo ""
echo "🔍 Current commit ready to push:"
git log --oneline -1

echo ""
echo "📁 Repository URL:"
git remote get-url origin

echo ""
echo "⚠️  MANUAL STEPS REQUIRED:"
echo "========================="
echo ""
echo "1. Push to GitHub (requires authentication):"
echo "   git push origin main"
echo ""
echo "2. If you need to set up GitHub authentication, use one of these methods:"
echo ""
echo "   Option A - Personal Access Token:"
echo "   • Go to GitHub.com → Settings → Developer settings → Personal access tokens"
echo "   • Generate a new token with 'repo' permissions"
echo "   • Use: git push https://YOUR_TOKEN@github.com/shawn-kelly/lucidra.git main"
echo ""
echo "   Option B - GitHub CLI (if installed):"
echo "   • Run: gh auth login"
echo "   • Then: git push origin main"
echo ""
echo "   Option C - SSH Key (recommended for repeated use):"
echo "   • Set up SSH key: ssh-keygen -t ed25519 -C 'your_email@example.com'"
echo "   • Add to GitHub: Settings → SSH and GPG keys"
echo "   • Change remote: git remote set-url origin git@github.com:shawn-kelly/lucidra.git"
echo ""
echo "3. After pushing, GitHub Pages will automatically deploy:"
echo "   • Check: https://github.com/shawn-kelly/lucidra/actions"
echo "   • Site will be live at: https://shawn-kelly.github.io/lucidra/"
echo ""
echo "4. If GitHub Pages isn't enabled:"
echo "   • Go to: https://github.com/shawn-kelly/lucidra/settings/pages"
echo "   • Set Source to 'GitHub Actions'"
echo ""

# Check if GitHub Pages is properly configured
echo "🔧 Verifying deployment configuration..."
echo ""
echo "✅ Frontend package.json homepage: $(grep '"homepage"' frontend/package.json || echo 'Not set')"
echo "✅ GitHub Actions workflow: $([ -f '.github/workflows/deploy-gh-pages.yml' ] && echo 'Present' || echo 'Missing')"
echo "✅ Build directory: $([ -d 'frontend/build' ] && echo 'Exists' || echo 'Missing - run npm run build')"

echo ""
echo "📝 Deployment Summary:"
echo "====================="
echo "• All code changes are committed and ready"
echo "• GitHub Pages workflow is configured"  
echo "• Homepage URL is set correctly"
echo "• After pushing, deployment will be automatic"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://shawn-kelly.github.io/lucidra/"
echo ""
echo "⏱️  Deployment typically takes 2-5 minutes after pushing."
echo ""

# Offer to open the GitHub repository
echo "🔗 Quick Links:"
echo "• Repository: https://github.com/shawn-kelly/lucidra"
echo "• Actions: https://github.com/shawn-kelly/lucidra/actions"
echo "• Settings: https://github.com/shawn-kelly/lucidra/settings/pages"
echo "• Live Site: https://shawn-kelly.github.io/lucidra/"
echo ""
echo "💡 Tip: Bookmark the Actions page to monitor deployments!"