# 🔧 Fix Build Issues - Reusable Prompt

## Current Build Problem

**Issue**: `npm run build` hangs indefinitely (60+ seconds)
**Status**: Using static `complete-app.html` as workaround

## Debugging Steps

### 1. Quick Diagnosis
```bash
cd /mnt/d/projects/lucidra/frontend
./debug-build.sh
```

### 2. Check for Common Issues

**Infinite useEffect loops:**
```typescript
// ❌ PROBLEMATIC:
useEffect(() => {
  // logic
}, [objectDependency]);

// ✅ FIXED:
useEffect(() => {
  // logic
}, [object.specificProp, array.length]);
```

**Circular dependencies:**
```bash
npm install -g madge
madge --circular src/
```

**TypeScript errors:**
```bash
npx tsc --noEmit --skipLibCheck
```

### 3. Memory and Process Issues

**Check memory usage:**
```bash
free -h
df -h
```

**Kill hanging processes:**
```bash
pkill -f "node.*build"
```

## Alternative Build Approaches

### 1. Use Static Files (Current Working Solution)
```bash
./quick-build.sh
# Uses existing complete-app.html (489KB)
```

### 2. Development Mode (Works for Testing)
```bash
npm start
# Runs on http://localhost:3000
```

### 3. Progressive Component Integration
1. Start with minimal App.tsx
2. Add components one by one
3. Test build after each addition
4. Identify problematic component

## Known Problematic Components

- `EnhancedBlueOceanModule.tsx` - Fixed infinite loops
- `EnhancedProcessManagement.tsx` - Fixed infinite loops
- Large imported dependencies might cause memory issues

## Success Criteria

- [ ] Build completes in < 60 seconds
- [ ] No infinite loops in useEffect hooks
- [ ] No circular import dependencies
- [ ] TypeScript compiles without hanging
- [ ] Generated bundle size reasonable (< 2MB)

## Fallback Strategy

If React build continues to hang:
1. Use current static `complete-app.html` 
2. Deploy static version via GitHub Pages
3. Incrementally migrate to proper React build
4. Consider switching to Vite for faster builds