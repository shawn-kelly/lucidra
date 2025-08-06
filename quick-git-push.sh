#!/bin/bash
# Quick Git push without hanging processes

cd /mnt/d/Projects/lucidra

# Clean up any locks
rm -f .git/index.lock .git/refs/heads/main.lock 2>/dev/null

# Quick add and commit
git add . && git commit -m "🚀 Lucidra Auto-Update $(date '+%H:%M')" && git push origin main --force

echo "✅ Push completed!"