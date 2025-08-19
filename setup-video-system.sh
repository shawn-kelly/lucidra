#!/bin/bash

# ============================================
# 🎬 LUCIDRA VIDEO SYSTEM SETUP SCRIPT
# ============================================

set -e  # Exit on any error

echo "🚀 Setting up Lucidra Professional Video Generation System..."
echo "================================================"

# Update system
echo "📦 Updating system packages..."
sudo apt-get update

# Install system dependencies
echo "🔧 Installing system dependencies..."
sudo apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    python3-venv \
    nodejs \
    npm \
    wget \
    curl \
    git \
    imagemagick \
    fonts-dejavu-core

# Install Node.js dependencies for screenshots
echo "📸 Installing screenshot dependencies..."
npm install puppeteer

# Create Python virtual environment
echo "🐍 Setting up Python environment..."
python3 -m venv video_env
source video_env/bin/activate

# Install Python dependencies
echo "📚 Installing Python video libraries..."
pip install --upgrade pip
pip install \
    moviepy==1.0.3 \
    pillow \
    requests \
    gtts \
    pyyaml \
    numpy \
    opencv-python \
    matplotlib \
    seaborn

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p generated_videos
mkdir -p video_assets
mkdir -p video_scripts
mkdir -p temp_video

# Download background music (royalty-free)
echo "🎵 Downloading background music..."
if [ ! -f "video_assets/background_music.mp3" ]; then
    # Download a royalty-free background track
    wget -O video_assets/background_music.mp3 \
        "https://www.soundjay.com/misc/sounds/corporate-background.mp3" || \
        echo "⚠️  Background music download failed (optional)"
fi

# Create video generation script
echo "📝 Creating video generation commands..."
cat > generate_videos.sh << 'EOF'
#!/bin/bash

# Activate virtual environment
source video_env/bin/activate

# Generate specific video
generate_video() {
    echo "🎬 Generating video: $1"
    python3 automated-video-generator.py --video "$1"
}

# Generate all videos
generate_all() {
    echo "🎬 Generating all videos..."
    python3 automated-video-generator.py --generate-all
}

# Display usage
usage() {
    echo "Usage:"
    echo "  ./generate_videos.sh ceo-overview     # Generate CEO video"
    echo "  ./generate_videos.sh frameworks       # Generate frameworks video" 
    echo "  ./generate_videos.sh process         # Generate process video"
    echo "  ./generate_videos.sh all             # Generate all videos"
}

# Main execution
case "$1" in
    ceo-overview|ceo)
        generate_video "ceo-overview"
        ;;
    strategic-frameworks|frameworks)
        generate_video "strategic-frameworks"
        ;;
    process-management|process)
        generate_video "process-management"
        ;;
    all)
        generate_all
        ;;
    *)
        usage
        ;;
esac
EOF

chmod +x generate_videos.sh

# Create video specifications in YAML format
echo "📋 Creating video specifications..."
cat > video_scripts/ceo_script.yaml << 'EOF'
video_id: ceo-overview
title: "CEO Platform Overview"
duration: 510
scenes:
  - name: intro
    duration: 45
    type: title_card
    title: "CEO Platform Overview"
    subtitle: "Strategic Intelligence for Executive Leadership"
    narration: "Welcome to Lucidra, the strategic intelligence platform designed specifically for executive leadership. I'm here to guide you through the most powerful features that will transform how you make strategic decisions and lead your organization."
  
  - name: dashboard
    duration: 105
    type: screenshot_demo
    title: "Executive Dashboard Navigation"
    narration: "Your executive dashboard is the nerve center of your strategic operations. Here you can see real-time KPIs, market intelligence feeds, and strategic framework outputs all in one unified view."
    
  - name: frameworks
    duration: 105
    type: animation
    title: "Strategic Framework Integration"
    narration: "Lucidra integrates six powerful strategic frameworks directly into your workflow. From Blue Ocean Strategy to Porter's Five Forces, each framework provides actionable insights."
    
  - name: intelligence
    duration: 105
    type: live_demo
    title: "Market Intelligence & Data Pulse"
    narration: "Your competitive advantage depends on superior intelligence. The Data Pulse system monitors market signals, competitor activities, and industry trends in real-time."
    
  - name: financial
    duration: 105
    type: screenshot_demo
    title: "Financial Analysis Integration"
    narration: "Executive decisions require deep financial insight. Lucidra's financial analysis tools provide DuPont analysis, activity-based costing, and investment evaluation capabilities."
    
  - name: conclusion
    duration: 45
    type: title_card
    title: "Your Strategic Intelligence Platform"
    subtitle: "Next: Strategic Frameworks Masterclass"
    narration: "You now have the foundation to leverage Lucidra's full strategic intelligence capabilities. Your next step: complete the strategic frameworks masterclass."
EOF

# Create test script
echo "🧪 Creating test script..."
cat > test_video_system.sh << 'EOF'
#!/bin/bash

echo "🧪 Testing Lucidra Video Generation System..."

# Test Python dependencies
echo "🐍 Testing Python environment..."
source video_env/bin/activate
python3 -c "import moviepy; print('✅ MoviePy available')"
python3 -c "from gtts import gTTS; print('✅ Google TTS available')"
python3 -c "from PIL import Image; print('✅ PIL available')"

# Test FFmpeg
echo "🎬 Testing FFmpeg..."
ffmpeg -version | head -1

# Test video generator
echo "🎥 Testing video generator..."
python3 automated-video-generator.py --video ceo-overview || echo "⚠️ Video generation test failed"

echo "✅ Video system test completed!"
EOF

chmod +x test_video_system.sh

# Create one-command video generation
echo "⚡ Creating one-command generation..."
cat > generate_all_videos.sh << 'EOF'
#!/bin/bash

echo "🎬 LUCIDRA VIDEO GENERATION - ONE COMMAND"
echo "========================================"

# Activate environment
source video_env/bin/activate

# Generate all videos with progress
python3 automated-video-generator.py --batch-render

echo ""
echo "✅ All videos generated!"
echo "📁 Videos saved in: generated_videos/"
echo "🌐 Upload to your platform's video directory"
echo ""
echo "📋 Generated videos:"
ls -la generated_videos/
EOF

chmod +x generate_all_videos.sh

# Set permissions
echo "🔐 Setting permissions..."
chmod +x automated-video-generator.py

echo ""
echo "✅ LUCIDRA VIDEO SYSTEM SETUP COMPLETE!"
echo "======================================="
echo ""
echo "🎬 Quick Start Commands:"
echo "  ./generate_videos.sh all              # Generate all videos"
echo "  ./generate_videos.sh ceo-overview     # Generate CEO video only"
echo "  ./test_video_system.sh               # Test the system"
echo ""
echo "📁 Directory Structure:"
echo "  generated_videos/     # Output videos (MP4)"
echo "  video_assets/         # Images, music, assets"
echo "  video_scripts/        # YAML specifications"
echo ""
echo "🚀 ONE-COMMAND GENERATION:"
echo "  ./generate_all_videos.sh              # Generate everything"
echo ""
echo "💡 Next Steps:"
echo "  1. Run: ./test_video_system.sh"
echo "  2. Run: ./generate_all_videos.sh"
echo "  3. Upload videos to your platform"
echo ""