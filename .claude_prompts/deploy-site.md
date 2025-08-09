# 🚀 Deploy Site - Reusable Prompt

## Quick Deployment Commands

```bash
# 1. Fast deployment script
./lucidra-deploy.sh

# 2. Local testing
./quick-build.sh

# 3. Debug build issues  
./debug-build.sh
```

## Manual GitHub Pages Deployment

1. **Push changes**: `./lucidra-deploy.sh`
2. **Go to GitHub Actions**: https://github.com/[username]/lucidra/actions
3. **Click "Run workflow"** on "🚀 Bulletproof Deployment"
4. **Wait for completion** (~2-3 minutes)
5. **Visit live site**: https://[username].github.io/lucidra/

## Verification Checklist

- [ ] ✅ Local static server works: http://localhost:8000
- [ ] ✅ Main app loads: http://localhost:8000/complete-app.html
- [ ] ✅ GitHub push successful
- [ ] ✅ GitHub Actions deployment completed
- [ ] ✅ Live site accessible and functional

## Troubleshooting

**If local server fails:**
```bash
cd /mnt/d/projects/lucidra/frontend/build
python3 -m http.server 8000
```

**If GitHub Pages fails:**
- Check workflow logs in GitHub Actions
- Verify build directory has required files
- Ensure GitHub Pages is enabled in repo settings

**If site shows "loading":**
- Check that `complete-app.html` exists and is valid
- Verify redirect in `index.html` points to correct file
- Test individual HTML files directly