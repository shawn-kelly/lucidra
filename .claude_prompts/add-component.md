# 🧩 Add Component - Reusable Prompt

## Safe Component Addition Pattern

### 1. Component Creation Template

```typescript
import React, { useState, useEffect } from 'react';

interface ComponentNameProps {
  // Define props with specific types
}

const ComponentName: React.FC<ComponentNameProps> = ({ 
  // destructured props
}) => {
  // State declarations
  const [state, setState] = useState<StateType>(initialValue);

  // ✅ SAFE useEffect pattern
  useEffect(() => {
    // logic here
  }, [
    // SPECIFIC primitive dependencies only
    // NEVER use object/array directly
    object.specificProperty,
    array.length,
    primitiveValue
  ]);

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### 2. Integration Steps

**Step 1: Create Component File**
```bash
# Create in appropriate directory
touch /mnt/d/projects/lucidra/frontend/src/components/ComponentName.tsx
```

**Step 2: Add to App.tsx (Safe Pattern)**
```typescript
// 1. Comment out import initially
// import ComponentName from './components/ComponentName';

// 2. Add placeholder case first
case 'component-name':
  return (
    <div>
      <h1>Component Name Placeholder</h1>
      <p>Component will be integrated here...</p>
    </div>
  );

// 3. Test placeholder works
// 4. ONLY THEN uncomment import when ready
```

**Step 3: Add Navigation**
```typescript
// Header navigation
<button onClick={() => setCurrentView('component-name')}>
  🧩 Component Name
</button>

// Breadcrumb navigation
case 'component-name':
  items.push({ label: 'Component Name', view: 'component-name', icon: '🧩' });
  break;
```

### 3. Testing Checklist

- [ ] Component file created with proper TypeScript types
- [ ] useEffect dependencies are primitives only
- [ ] Placeholder case added to App.tsx
- [ ] Navigation buttons added
- [ ] Local development server works: `npm start`
- [ ] No console errors or warnings
- [ ] Component renders correctly
- [ ] Build test passes: `npm run build` (if not hanging)

### 4. Common Pitfalls to Avoid

**❌ Infinite Loop Causes:**
```typescript
// Object dependency
useEffect(() => {}, [objectState]);

// Array dependency  
useEffect(() => {}, [arrayState]);

// Missing dependencies
useEffect(() => {
  // uses stateVar but not in deps
}, []);
```

**✅ Safe Patterns:**
```typescript
// Specific object properties
useEffect(() => {}, [obj.prop1, obj.prop2]);

// Array length
useEffect(() => {}, [array.length]);

// Primitive values only
useEffect(() => {}, [string, number, boolean]);
```

### 5. Fallback Strategy

If component causes build issues:
1. Comment out import immediately
2. Keep placeholder case active  
3. Debug component in isolation
4. Use static HTML version in build directory
5. Integrate gradually with testing

## Quick Commands

```bash
# Test component in development
npm start

# Create static version if needed
# Add to complete-app.html directly

# Deploy current working version
./lucidra-deploy.sh
```