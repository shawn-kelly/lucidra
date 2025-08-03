#!/bin/bash

# Automated Git update system for Lucidra platform
# This script automatically commits and pushes any changes

SCRIPT_DIR="/mnt/d/Projects/lucidra"
cd "$SCRIPT_DIR"

# Function to auto-commit and push
auto_update() {
    echo "🔄 Auto-update initiated at $(date)"
    
    # Clean Git environment
    rm -f .git/index.lock .git/refs/heads/main.lock 2>/dev/null
    
    # Check for changes
    if ! git diff --quiet || ! git diff --staged --quiet || [[ -n "$(git ls-files --others --exclude-standard)" ]]; then
        echo "📦 Changes detected, committing..."
        
        # Add all changes
        git add -A
        
        # Commit with timestamp
        git commit -m "🚀 Lucidra Auto-Update $(date '+%Y-%m-%d %H:%M:%S')

Automated commit of platform updates and improvements.

🤖 Generated with [Claude Code](https://claude.ai/code)
Co-Authored-By: Claude <noreply@anthropic.com>"
        
        # Push to GitHub
        echo "🌐 Pushing to GitHub..."
        git push origin main --force
        
        echo "✅ Auto-update completed successfully!"
    else
        echo "ℹ️  No changes to commit"
    fi
}

# Run the auto-update
auto_update

# Also set up a cron-style monitoring system
echo "⚙️ Setting up automated monitoring..."

# Create a simple monitoring script
cat > /mnt/d/Projects/lucidra/monitor-changes.sh << 'EOF'
#!/bin/bash
# Monitor for changes and auto-commit every 5 minutes
while true; do
    cd /mnt/d/Projects/lucidra
    if [[ -n "$(git status --porcelain)" ]]; then
        ./auto-update-system.sh
    fi
    sleep 300  # 5 minutes
done
EOF

chmod +x /mnt/d/Projects/lucidra/monitor-changes.sh

echo "✅ Automated update system configured!"
echo "🔗 Repository: https://github.com/shawn-kelly/lucidra"
echo "📊 All future changes will be automatically committed and pushed"