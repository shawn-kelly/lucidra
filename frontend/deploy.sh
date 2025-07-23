#!/bin/bash

# Lucidra Deployment Script
# Prepares and deploys the Lucidra platform

echo "🚀 Lucidra Deployment Script"
echo "================================"

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create deployment directory
    echo "📁 Creating deployment directory..."
    rm -rf deployment
    mkdir deployment
    
    # Copy build files
    echo "📋 Copying build files..."
    cp -r build/* deployment/
    
    # Create deployment info
    echo "📄 Creating deployment info..."
    cat > deployment/deployment-info.json << EOF
{
  "deploymentDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "buildSize": "$(du -h build/static/js/main.*.js | cut -f1)",
  "version": "2.0.0",
  "features": [
    "Multi-tier Architecture",
    "Strategy Frameworks",
    "Business Model Canvas",
    "Market Intelligence",
    "Gamification System"
  ],
  "tiers": ["Lite", "Pro", "Enterprise"]
}
EOF
    
    echo "🎉 Deployment package ready in ./deployment/"
    echo "📊 Deployment size: $(du -sh deployment | cut -f1)"
    
    # Optional: Deploy to specific platforms
    echo ""
    echo "🌐 Deployment Options:"
    echo "1. Netlify: drag ./deployment folder to netlify.com/drop"
    echo "2. Vercel: run 'vercel ./deployment' in terminal"
    echo "3. GitHub Pages: copy to gh-pages branch"
    echo "4. AWS S3: upload to S3 bucket with static hosting"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo ""
echo "🎯 Local testing: http://localhost:3000"
echo "📝 See deployment/README.md for detailed instructions"
echo "✨ Happy deploying!"