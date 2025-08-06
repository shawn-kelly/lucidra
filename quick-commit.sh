#!/bin/bash

# Quick commit and push script for Lucidra updates
echo "🚀 Quick commit and push starting..."

# Remove any git locks
rm -f .git/index.lock

# Add all changes
git add -A

# Commit with timestamp
git commit -m "Lucidra Update - $(date '+%Y-%m-%d %H:%M')"

# Force push to main
git push origin main --force

echo "✅ Git push completed!"