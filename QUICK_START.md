# 🚀 Lucidra Quick Start Guide

## 🎯 Method 1: Direct Server Start

**Step 1:** Open terminal and run:
```bash
cd /home/kelco/lucidra-project/frontend/build
python3 -m http.server 8000
```

**Step 2:** Open your browser and visit:
```
http://localhost:8000
```

---

## 🎯 Method 2: Use Script

**Step 1:** Run the script:
```bash
/home/kelco/lucidra-project/frontend/run_server.sh
```

**Step 2:** Open browser to:
```
http://localhost:8000
```

---

## 🎯 Method 3: NPM Development Server

**Step 1:** Start dev server:
```bash
cd /home/kelco/lucidra-project/frontend
npm start
```

**Step 2:** It should auto-open at:
```
http://localhost:3000
```

---

## 🔧 Troubleshooting Steps

### If you see a blank page:
1. Check browser console for errors (F12)
2. Try refreshing the page (Ctrl+R)
3. Clear browser cache
4. Try a different browser

### If server won't start:
1. Check if port is free:
   ```bash
   ss -tlnp | grep :8000
   ```
2. Try different port:
   ```bash
   python3 -m http.server 8080
   ```
3. Check Python version:
   ```bash
   python3 --version
   ```

### If still having issues:
1. Try opening the HTML file directly:
   ```bash
   firefox /home/kelco/lucidra-project/frontend/build/index.html
   ```

---

## 📋 What Should Work

Once the server starts, you should see:
- ✅ Lucidra homepage with strategic intelligence branding
- ✅ Navigation menu with Platform, AI Sandbox, Data Pulse
- ✅ "Enable AI Analysis" button
- ✅ Professional business interface
- ✅ Token usage meters and progress bars

---

## 🆘 Emergency Backup

If nothing works, try this direct file access:
```bash
cd /home/kelco/lucidra-project/frontend/build
ls -la
cat index.html
```

Then open the `index.html` file in any browser.

---

## 🎉 Success Indicators

You'll know it's working when you see:
- Lucidra branding and logo
- Clean, professional interface
- AI activation controls
- Strategic scenario input area
- Real-time progress indicators