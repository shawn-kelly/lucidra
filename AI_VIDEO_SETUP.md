# 🎬 AI Video Generation Setup Guide

## Overview
Your Lucidra app now supports AI-powered video generation using multiple services. The system will automatically try different AI video services until one succeeds, then fall back to FFmpeg if needed.

## ✅ Current Status
- ✅ **Frontend**: Running on http://localhost:3000
- ✅ **Backend**: Running on http://localhost:4000
- ✅ **Video System**: Integrated with 4 AI services + FFmpeg fallback
- ✅ **UI Controls**: Added to video library interface

## 🔑 AI Service API Keys Setup

To enable AI video generation, you need at least one API key. The system tries services in this order:

### 1. Runway ML (Recommended)
- **Website**: https://app.runwayml.com/
- **Pricing**: $12/month for 125 credits (~25 videos)
- **Quality**: Excellent for business/educational content
- **Setup**: Add `RUNWAY_API_KEY=your_key_here` to `/home/kelco/lucidra-project/backend/.env`

### 2. Stability AI (Good Alternative)
- **Website**: https://platform.stability.ai/
- **Pricing**: $20/month for video generation
- **Quality**: Good for AI-generated content
- **Setup**: Add `STABILITY_API_KEY=your_key_here` to `/home/kelco/lucidra-project/backend/.env`

### 3. OpenAI (Image + TTS)
- **Website**: https://platform.openai.com/
- **Pricing**: Pay-per-use (DALL-E 3: $0.08/image)
- **Quality**: Creates slideshow videos from AI images
- **Setup**: Add `OPENAI_API_KEY=your_key_here` to `/home/kelco/lucidra-project/backend/.env`

### 4. Leonardo AI (Creative Option)
- **Website**: https://leonardo.ai/
- **Pricing**: $12/month for motion videos
- **Quality**: Artistic style, good for creative content
- **Setup**: Add `LEONARDO_API_KEY=your_key_here` to `/home/kelco/lucidra-project/backend/.env`

## 🚀 Quick Start (Recommended)

1. **Get a Runway ML API Key** (easiest to set up):
   ```bash
   # Go to https://app.runwayml.com/
   # Sign up and get your API key
   # Add to backend/.env file:
   echo "RUNWAY_API_KEY=your_runway_key_here" >> /home/kelco/lucidra-project/backend/.env
   ```

2. **Restart the backend**:
   ```bash
   cd /home/kelco/lucidra-project/backend
   npm run dev
   ```

3. **Test video generation**:
   - Open http://localhost:3000
   - Click "📚 Video Library" 
   - Select any video topic
   - Click "🚀 Generate with AI"

## 🎯 How It Works

1. **User clicks "Generate with AI"** in the video library
2. **System tries AI services** in order until one succeeds:
   - Runway ML → Stability AI → OpenAI → Leonardo AI
3. **If all AI services fail**, falls back to FFmpeg text-based video
4. **Video is generated** and made available for viewing
5. **Progress tracking** shows generation status in real-time

## 🛠️ Testing Without API Keys

Even without API keys, you can test the system:
- The backend will skip unavailable AI services
- It will fall back to FFmpeg to create text-based videos
- You'll see console logs showing which services were tried

## 📝 Environment Variables

Add these to `/home/kelco/lucidra-project/backend/.env`:

```bash
# Video Generation AI Services (at least one recommended)
RUNWAY_API_KEY=your_runway_api_key_here
STABILITY_API_KEY=your_stability_api_key_here  
OPENAI_API_KEY=your_openai_api_key_here
LEONARDO_API_KEY=your_leonardo_api_key_here
```

## 🎬 Video Content Generated

The AI will create videos about:
- Strategic Planning frameworks (PESTLE, SWOT, Porter's Five Forces)
- Business analysis methodologies
- Academic business concepts from Harvard, Wharton, etc.
- Practical strategic management applications

## 🔧 Troubleshooting

**Backend not restarting after adding API keys?**
```bash
pkill -f "ts-node-dev"
cd /home/kelco/lucidra-project/backend && npm run dev
```

**Want to see what's happening?**
```bash
tail -f /tmp/backend.log
```

**Frontend issues?**
```bash
# Check if it's running
curl http://localhost:3000
```

## 💡 Next Steps

1. **Get API keys** for your preferred video service
2. **Test video generation** with the built-in controls
3. **Customize prompts** using the "⚙️ Customize" button (coming soon)
4. **Integrate with your existing strategic content**

The system is ready to generate AI-powered educational videos for your strategic intelligence platform!