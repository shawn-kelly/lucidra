# Lucidra Deployment Troubleshooting Guide

## 🔧 Common Issues & Solutions

### 1. **npm dependency conflict errors**

**Error:** `Conflicting peer dependency: typescript@X.X.X`

**Solutions:**
```bash
# Option 1: Use legacy peer deps (Recommended)
npm install --legacy-peer-deps

# Option 2: Force install
npm install --force

# Option 3: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**For GitHub Actions:**
- The workflow is already configured with `--legacy-peer-deps`
- Uses Node.js 18 for better compatibility

### 2. **GitHub Pages deployment not working**

**Check these settings:**

1. **Repository Settings → Pages**
   - Source: "GitHub Actions" (not "Deploy from branch")
   - Allow GitHub Actions to deploy

2. **GitHub Actions Permissions**
   - Settings → Actions → General
   - "Allow all actions and reusable workflows"

3. **Repository Permissions**
   - Settings → Actions → General → Workflow permissions
   - "Read and write permissions"

### 3. **Website shows 404 error**

**Possible causes:**
- GitHub Pages not enabled
- Wrong homepage URL in package.json
- Deployment still in progress

**Solutions:**
```bash
# Check if homepage URL is correct in package.json
"homepage": "https://shawn-kelly.github.io/lucidra"

# Wait for deployment (can take 5-10 minutes)
# Check Actions tab for deployment status
```

### 4. **Build fails in GitHub Actions**

**Common causes:**
- TypeScript version conflicts
- Missing dependencies
- Environment variables not set

**Solutions:**
1. Check the `.npmrc` file exists with `legacy-peer-deps=true`
2. Verify all imports are correct
3. Check GitHub Actions logs for specific errors

### 5. **Demo mode not working**

**Check:**
- Environment variables are set correctly
- `useDemoAIManager` hook is properly imported
- Components are wrapped correctly

## 🚀 Manual Deployment Alternative

If GitHub Actions fail, deploy manually:

```bash
# 1. Install gh-pages globally
npm install -g gh-pages

# 2. In frontend directory
cd frontend
npm install --legacy-peer-deps
npm run build

# 3. Deploy manually
npx gh-pages -d build
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] All code pushed to main branch
- [ ] package.json has correct homepage URL
- [ ] .npmrc file exists with legacy-peer-deps
- [ ] TypeScript version is 4.9.5 (compatible with react-scripts 5.0.1)

### GitHub Settings
- [ ] Pages enabled with "GitHub Actions" source
- [ ] Actions have read/write permissions
- [ ] Repository is public (for free GitHub Pages)

### Post-deployment
- [ ] Check Actions tab for successful deployment
- [ ] Visit the website URL
- [ ] Test demo functionality
- [ ] Verify responsive design

## 🔍 Debugging Steps

### 1. Check Build Locally
```bash
cd frontend
npm install --legacy-peer-deps
npm run build
# Should create build/ directory without errors
```

### 2. Test Build Locally
```bash
# Serve the build locally
npx serve -s build
# Visit http://localhost:3000
```

### 3. Check GitHub Actions Logs
1. Go to repository → Actions tab
2. Click on latest workflow run
3. Check build and deploy steps for errors

### 4. Verify Environment Variables
In GitHub Actions, these should be set:
```
REACT_APP_API_URL=/api
REACT_APP_DEMO_MODE=true
REACT_APP_GITHUB_PAGES=true
```

## 📞 Support Resources

### GitHub Pages Documentation
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

### React Build Issues
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/#github-pages)
- [TypeScript in CRA](https://create-react-app.dev/docs/adding-typescript/)

### Common Commands
```bash
# Check Node version
node --version

# Check npm version  
npm --version

# Clear npm cache
npm cache clean --force

# Check for outdated packages
npm outdated

# Update packages (careful with breaking changes)
npm update
```

## 🎯 Expected Behavior

### Successful Deployment Signs
- ✅ GitHub Actions workflow completes successfully
- ✅ Website loads at https://shawn-kelly.github.io/lucidra
- ✅ Demo banner appears
- ✅ AI opt-in functionality works
- ✅ Token meter displays correctly
- ✅ Scenario analysis responds with demo data

### Performance Expectations
- 🚀 Initial load: 2-5 seconds
- ⚡ Demo interactions: <1 second response
- 📱 Mobile responsive design
- 🌐 Works in all modern browsers

---

## 🆘 Still Having Issues?

If you continue to have problems:

1. **Create a GitHub Issue** with:
   - Error messages (full text)
   - Screenshots of the issue
   - Browser and OS information
   - Steps to reproduce

2. **Check the Actions tab** for build logs

3. **Try the manual deployment** method as a backup

The system is designed to be robust and handle most edge cases automatically!