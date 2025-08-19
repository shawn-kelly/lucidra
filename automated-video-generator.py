#!/usr/bin/env python3
"""
🎬 LUCIDRA AUTOMATED VIDEO GENERATION SYSTEM
===========================================

Professional video generation using MoviePy, gTTS, and automated screencast tools.
Creates real MP4 videos with voiceover, transitions, and professional effects.

Requirements:
- Ubuntu/Linux system
- Python 3.8+
- FFmpeg
- Chrome/Chromium (for screenshots)

Usage:
    python automated-video-generator.py --generate-all
    python automated-video-generator.py --video ceo-overview
    python automated-video-generator.py --batch-render
"""

import os
import sys
import json
import yaml
import time
import argparse
import subprocess
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple

# Video generation libraries
try:
    from moviepy.editor import *
    from PIL import Image, ImageDraw, ImageFont
    import requests
    from gtts import gTTS
    import tempfile
    import logging
except ImportError as e:
    print(f"❌ Missing required library: {e}")
    print("🔧 Install with: pip install moviepy pillow requests gtts")
    sys.exit(1)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class LucidraVideoGenerator:
    def __init__(self, output_dir: str = "generated_videos", assets_dir: str = "video_assets"):
        self.output_dir = Path(output_dir)
        self.assets_dir = Path(assets_dir)
        self.temp_dir = Path(tempfile.mkdtemp(prefix="lucidra_video_"))
        
        # Create directories
        self.output_dir.mkdir(exist_ok=True)
        self.assets_dir.mkdir(exist_ok=True)
        
        # Video specifications from our platform
        self.video_specs = {
            'ceo-overview': {
                'title': 'CEO Platform Overview',
                'duration': 510,  # 8:30 in seconds
                'resolution': (1920, 1080),
                'fps': 30,
                'background_color': '#2c3e50',
                'brand_color': '#3498db',
                'script_file': 'ceo_script.yaml',
                'scenes': self._get_ceo_scenes()
            },
            'strategic-frameworks': {
                'title': 'Strategic Frameworks Masterclass',
                'duration': 765,  # 12:45
                'resolution': (1920, 1080),
                'fps': 30,
                'background_color': '#8e44ad',
                'brand_color': '#9b59b6',
                'script_file': 'frameworks_script.yaml',
                'scenes': self._get_frameworks_scenes()
            },
            'process-management': {
                'title': 'Process Management Excellence',
                'duration': 615,  # 10:15
                'resolution': (1920, 1080),
                'fps': 30,
                'background_color': '#27ae60',
                'brand_color': '#2ecc71',
                'script_file': 'process_script.yaml',
                'scenes': self._get_process_scenes()
            }
        }
        
        logger.info(f"🎬 Lucidra Video Generator initialized")
        logger.info(f"📁 Output directory: {self.output_dir}")
        logger.info(f"🎥 Video specifications loaded: {len(self.video_specs)} videos")

    def _get_ceo_scenes(self) -> List[Dict]:
        """Define CEO Overview video scenes"""
        return [
            {
                'name': 'intro',
                'duration': 45,
                'type': 'title_card',
                'title': 'CEO Platform Overview',
                'subtitle': 'Strategic Intelligence for Executive Leadership',
                'narration': 'Welcome to Lucidra, the strategic intelligence platform designed specifically for executive leadership. I\'m here to guide you through the most powerful features that will transform how you make strategic decisions and lead your organization.'
            },
            {
                'name': 'dashboard_navigation',
                'duration': 105,
                'type': 'screenshot_demo',
                'title': 'Executive Dashboard',
                'screenshot': 'ceo_dashboard.png',
                'highlights': [
                    {'x': 100, 'y': 200, 'label': 'Real-time KPIs'},
                    {'x': 500, 'y': 300, 'label': 'Market Intelligence'},
                    {'x': 800, 'y': 150, 'label': 'Strategic Frameworks'}
                ],
                'narration': 'Your executive dashboard is the nerve center of your strategic operations. Here you can see real-time KPIs, market intelligence feeds, and strategic framework outputs all in one unified view. Notice how the dashboard adapts to your role, showing only the most critical information for C-level decision making.'
            },
            {
                'name': 'strategic_frameworks',
                'duration': 105,
                'type': 'animation',
                'title': 'Strategic Framework Integration',
                'animations': ['blue_ocean_demo', 'porters_analysis'],
                'narration': 'Lucidra integrates six powerful strategic frameworks directly into your workflow. From Blue Ocean Strategy to Porter\'s Five Forces, each framework provides actionable insights. Watch as I demonstrate how to run a competitive analysis that feeds directly into your strategic planning process.'
            },
            {
                'name': 'market_intelligence',
                'duration': 105,
                'type': 'live_demo',
                'title': 'Market Intelligence & Data Pulse',
                'demo_url': 'https://shawn-kelly.github.io/lucidra/',
                'demo_actions': ['click_data_pulse', 'show_market_signals', 'configure_alerts'],
                'narration': 'Your competitive advantage depends on superior intelligence. The Data Pulse system monitors market signals, competitor activities, and industry trends in real-time. I\'ll show you how to set up intelligent alerts and customize your market intelligence feeds for maximum strategic value.'
            },
            {
                'name': 'financial_analysis',
                'duration': 105,
                'type': 'screenshot_demo',
                'title': 'Financial Analysis Integration',
                'screenshot': 'financial_analysis.png',
                'narration': 'Executive decisions require deep financial insight. Lucidra\'s financial analysis tools provide DuPont analysis, activity-based costing, and investment evaluation capabilities. See how these integrate with your strategic frameworks to provide a complete picture of organizational performance.'
            },
            {
                'name': 'conclusion',
                'duration': 45,
                'type': 'title_card',
                'title': 'Your Strategic Intelligence Platform',
                'subtitle': 'Next: Strategic Frameworks Masterclass',
                'narration': 'You now have the foundation to leverage Lucidra\'s full strategic intelligence capabilities. Remember, this platform grows with your needs - explore the advanced features as your strategic requirements evolve. Your next step: complete the strategic frameworks masterclass to deepen your analytical capabilities.'
            }
        ]

    def _get_frameworks_scenes(self) -> List[Dict]:
        """Define Strategic Frameworks video scenes"""
        return [
            {
                'name': 'intro',
                'duration': 60,
                'type': 'title_card',
                'title': 'Strategic Frameworks Masterclass',
                'subtitle': 'Master the Tools of Strategic Excellence',
                'narration': 'Strategic frameworks are the foundation of exceptional leadership. In this masterclass, we\'ll dive deep into six proven frameworks that have guided the world\'s most successful organizations. By the end, you\'ll know exactly how to apply each framework to your specific strategic challenges.'
            },
            {
                'name': 'blue_ocean_deep_dive',
                'duration': 150,
                'type': 'interactive_demo',
                'title': 'Blue Ocean Strategy Deep Dive',
                'demo_actions': ['open_blue_ocean', 'create_strategy_canvas', 'four_actions_framework'],
                'narration': 'Blue Ocean Strategy helps you break free from competitive red oceans by creating uncontested market space. I\'ll walk you through the strategy canvas, four actions framework, and buyer utility map using real business examples. You\'ll see exactly how companies like Nintendo and Cirque du Soleil revolutionized their industries.'
            }
            # Additional scenes would be defined here...
        ]

    def _get_process_scenes(self) -> List[Dict]:
        """Define Process Management video scenes"""
        return [
            {
                'name': 'intro',
                'duration': 45,
                'type': 'title_card',
                'title': 'Process Management Excellence',
                'subtitle': 'BPMN 2.0 Modeling & Optimization',
                'narration': 'Process excellence drives operational superiority. Lucidra\'s process management system combines BPMN 2.0 modeling with real-time performance analytics. I\'ll show you how to model, optimize, and monitor processes that deliver exceptional results.'
            }
            # Additional scenes would be defined here...
        ]

    def generate_video(self, video_id: str, progress_callback=None) -> str:
        """Generate a complete video with professional quality"""
        logger.info(f"🎬 Starting video generation: {video_id}")
        
        if video_id not in self.video_specs:
            raise ValueError(f"Video specification not found: {video_id}")
        
        spec = self.video_specs[video_id]
        output_file = self.output_dir / f"{video_id}.mp4"
        
        try:
            # Step 1: Generate assets
            logger.info("📸 Generating visual assets...")
            self._generate_assets(video_id)
            if progress_callback:
                progress_callback(20, "Assets generated")
            
            # Step 2: Generate voiceover
            logger.info("🎙️ Generating voiceover...")
            audio_files = self._generate_voiceover(video_id)
            if progress_callback:
                progress_callback(40, "Voiceover generated")
            
            # Step 3: Create video scenes
            logger.info("🎥 Creating video scenes...")
            scene_clips = self._create_scenes(video_id)
            if progress_callback:
                progress_callback(60, "Scenes created")
            
            # Step 4: Composite final video
            logger.info("🎬 Compositing final video...")
            final_video = self._composite_video(scene_clips, spec)
            if progress_callback:
                progress_callback(80, "Video composited")
            
            # Step 5: Add background music and final effects
            logger.info("🎵 Adding audio and final effects...")
            final_video = self._add_audio_effects(final_video, audio_files)
            if progress_callback:
                progress_callback(95, "Audio and effects added")
            
            # Step 6: Export final video
            logger.info("💾 Exporting final video...")
            final_video.write_videofile(
                str(output_file),
                fps=spec['fps'],
                codec='libx264',
                audio_codec='aac',
                temp_audiofile=str(self.temp_dir / 'temp_audio.m4a'),
                remove_temp=True
            )
            if progress_callback:
                progress_callback(100, "Video export complete")
            
            logger.info(f"✅ Video generation completed: {output_file}")
            return str(output_file)
            
        except Exception as e:
            logger.error(f"❌ Video generation failed: {e}")
            raise

    def _generate_assets(self, video_id: str):
        """Generate visual assets for the video"""
        spec = self.video_specs[video_id]
        
        # Create title cards
        for scene in spec['scenes']:
            if scene['type'] == 'title_card':
                self._create_title_card(video_id, scene)
        
        # Generate screenshots if needed
        self._generate_screenshots(video_id)
        
        # Create highlight overlays
        self._create_highlight_overlays(video_id)

    def _create_title_card(self, video_id: str, scene: Dict):
        """Create a professional title card"""
        spec = self.video_specs[video_id]
        width, height = spec['resolution']
        
        # Create image
        img = Image.new('RGB', (width, height), spec['background_color'])
        draw = ImageDraw.Draw(img)
        
        # Load fonts (fallback to default if not available)
        try:
            title_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 72)
            subtitle_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 36)
        except:
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
        
        # Draw title
        title_bbox = draw.textbbox((0, 0), scene['title'], font=title_font)
        title_width = title_bbox[2] - title_bbox[0]
        title_x = (width - title_width) // 2
        title_y = height // 2 - 100
        draw.text((title_x, title_y), scene['title'], fill='white', font=title_font)
        
        # Draw subtitle if present
        if 'subtitle' in scene:
            subtitle_bbox = draw.textbbox((0, 0), scene['subtitle'], font=subtitle_font)
            subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
            subtitle_x = (width - subtitle_width) // 2
            subtitle_y = title_y + 100
            draw.text((subtitle_x, subtitle_y), scene['subtitle'], fill=spec['brand_color'], font=subtitle_font)
        
        # Add brand elements
        self._add_brand_elements(draw, width, height, spec['brand_color'])
        
        # Save title card
        title_path = self.assets_dir / f"{video_id}_{scene['name']}_title.png"
        img.save(title_path)
        logger.info(f"📄 Created title card: {title_path}")

    def _add_brand_elements(self, draw: ImageDraw.Draw, width: int, height: int, brand_color: str):
        """Add consistent brand elements to visuals"""
        # Add brand accent bar
        bar_height = 8
        draw.rectangle([0, height - bar_height, width, height], fill=brand_color)
        
        # Add corner accent
        accent_size = 60
        draw.rectangle([width - accent_size, 0, width, accent_size], fill=brand_color)

    def _generate_voiceover(self, video_id: str) -> List[str]:
        """Generate voiceover audio for all scenes"""
        spec = self.video_specs[video_id]
        audio_files = []
        
        for i, scene in enumerate(spec['scenes']):
            if 'narration' in scene:
                audio_file = self.temp_dir / f"{video_id}_scene_{i}_narration.mp3"
                
                # Generate TTS
                tts = gTTS(text=scene['narration'], lang='en', slow=False)
                tts.save(str(audio_file))
                
                audio_files.append(str(audio_file))
                logger.info(f"🎙️ Generated narration: scene {i}")
        
        return audio_files

    def _generate_screenshots(self, video_id: str):
        """Generate screenshots of the live platform"""
        logger.info("📸 Generating platform screenshots...")
        
        # Use Chrome headless to capture screenshots
        screenshot_script = f"""
        const puppeteer = require('puppeteer');
        (async () => {{
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({{width: 1920, height: 1080}});
            await page.goto('https://shawn-kelly.github.io/lucidra/');
            await page.screenshot({{path: '{self.assets_dir}/{video_id}_platform.png'}});
            await browser.close();
        }})();
        """
        
        # Save and execute Node.js script
        script_file = self.temp_dir / 'screenshot.js'
        with open(script_file, 'w') as f:
            f.write(screenshot_script)
        
        try:
            subprocess.run(['node', str(script_file)], check=True, capture_output=True)
            logger.info("✅ Platform screenshot captured")
        except subprocess.CalledProcessError:
            logger.warning("⚠️ Screenshot capture failed - using placeholder")
            self._create_placeholder_screenshot(video_id)

    def _create_placeholder_screenshot(self, video_id: str):
        """Create placeholder screenshot if live capture fails"""
        spec = self.video_specs[video_id]
        width, height = spec['resolution']
        
        img = Image.new('RGB', (width, height), '#34495e')
        draw = ImageDraw.Draw(img)
        
        # Draw placeholder content
        try:
            font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 48)
        except:
            font = ImageFont.load_default()
        
        text = "Lucidra Platform Screenshot"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        x = (width - text_width) // 2
        y = height // 2
        draw.text((x, y), text, fill='white', font=font)
        
        # Save placeholder
        placeholder_path = self.assets_dir / f"{video_id}_platform.png"
        img.save(placeholder_path)

    def _create_highlight_overlays(self, video_id: str):
        """Create highlight overlays for interactive elements"""
        # This would create animated arrows, callout boxes, etc.
        pass

    def _create_scenes(self, video_id: str) -> List[VideoFileClip]:
        """Create all video scenes"""
        spec = self.video_specs[video_id]
        scene_clips = []
        
        for scene in spec['scenes']:
            clip = None
            
            if scene['type'] == 'title_card':
                # Create title card clip
                title_path = self.assets_dir / f"{video_id}_{scene['name']}_title.png"
                if title_path.exists():
                    clip = ImageClip(str(title_path)).set_duration(scene['duration'])
            
            elif scene['type'] == 'screenshot_demo':
                # Create screenshot demonstration
                screenshot_path = self.assets_dir / f"{video_id}_platform.png"
                if screenshot_path.exists():
                    clip = ImageClip(str(screenshot_path)).set_duration(scene['duration'])
                    # Add zoom and pan effects
                    clip = clip.resize(1.2).set_position(('center', 'center'))
            
            elif scene['type'] == 'animation':
                # Create animated content
                clip = self._create_animation_scene(video_id, scene)
            
            if clip:
                scene_clips.append(clip)
                logger.info(f"🎬 Created scene: {scene['name']}")
        
        return scene_clips

    def _create_animation_scene(self, video_id: str, scene: Dict) -> VideoFileClip:
        """Create animated scene content"""
        # This would create custom animations for framework demonstrations
        # For now, create a placeholder animated scene
        
        def make_frame(t):
            # Create simple animated frame
            img = Image.new('RGB', (1920, 1080), '#2c3e50')
            draw = ImageDraw.Draw(img)
            
            # Animated circle
            center_x, center_y = 960, 540
            radius = 50 + int(30 * abs(math.sin(t * 2)))
            
            draw.ellipse([
                center_x - radius, center_y - radius,
                center_x + radius, center_y + radius
            ], fill='#3498db')
            
            return np.array(img)
        
        import math
        import numpy as np
        
        return VideoClip(make_frame, duration=scene['duration'])

    def _composite_video(self, scene_clips: List[VideoFileClip], spec: Dict) -> VideoFileClip:
        """Composite all scenes into final video"""
        if not scene_clips:
            raise ValueError("No scene clips to composite")
        
        # Add transitions between scenes
        final_clips = []
        for i, clip in enumerate(scene_clips):
            if i > 0:
                # Add fade transition
                clip = clip.crossfadein(1.0)
            final_clips.append(clip)
        
        # Concatenate all clips
        final_video = concatenate_videoclips(final_clips, method='compose')
        
        # Add brand overlay
        final_video = self._add_brand_overlay(final_video, spec)
        
        return final_video

    def _add_brand_overlay(self, video: VideoFileClip, spec: Dict) -> VideoFileClip:
        """Add consistent brand overlay to video"""
        # Create logo overlay (placeholder)
        logo_txt = TextClip("LUCIDRA", fontsize=24, color='white', font='Arial-Bold')
        logo_txt = logo_txt.set_position(('right', 'top')).set_duration(video.duration).margin(20)
        
        return CompositeVideoClip([video, logo_txt])

    def _add_audio_effects(self, video: VideoFileClip, audio_files: List[str]) -> VideoFileClip:
        """Add voiceover and background music"""
        if not audio_files:
            return video
        
        # Concatenate all narration audio
        audio_clips = [AudioFileClip(audio_file) for audio_file in audio_files]
        final_audio = concatenate_audioclips(audio_clips)
        
        # Set audio to video
        video = video.set_audio(final_audio)
        
        # Add background music if available
        bg_music_path = self.assets_dir / 'background_music.mp3'
        if bg_music_path.exists():
            bg_music = AudioFileClip(str(bg_music_path)).volumex(0.3)
            bg_music = bg_music.set_duration(video.duration)
            
            # Composite audio
            final_audio = CompositeAudioClip([final_audio, bg_music])
            video = video.set_audio(final_audio)
        
        return video

    def generate_all_videos(self, progress_callback=None):
        """Generate all videos in the specification"""
        logger.info("🚀 Starting batch video generation...")
        
        results = []
        total_videos = len(self.video_specs)
        
        for i, video_id in enumerate(self.video_specs.keys()):
            try:
                logger.info(f"🎬 Generating video {i+1}/{total_videos}: {video_id}")
                
                def video_progress(progress, step):
                    overall_progress = ((i * 100) + progress) / total_videos
                    if progress_callback:
                        progress_callback(overall_progress, f"{video_id}: {step}")
                
                output_file = self.generate_video(video_id, video_progress)
                results.append({'video_id': video_id, 'success': True, 'file': output_file})
                
            except Exception as e:
                logger.error(f"❌ Failed to generate {video_id}: {e}")
                results.append({'video_id': video_id, 'success': False, 'error': str(e)})
        
        logger.info("✅ Batch video generation completed")
        return results

    def cleanup(self):
        """Cleanup temporary files"""
        import shutil
        if self.temp_dir.exists():
            shutil.rmtree(self.temp_dir)
            logger.info("🗑️ Temporary files cleaned up")

def install_dependencies():
    """Install required system dependencies"""
    logger.info("🔧 Installing system dependencies...")
    
    commands = [
        'sudo apt-get update',
        'sudo apt-get install -y ffmpeg python3-pip nodejs npm',
        'npm install -g puppeteer',
        'pip3 install moviepy pillow requests gtts pyyaml'
    ]
    
    for cmd in commands:
        try:
            subprocess.run(cmd.split(), check=True)
            logger.info(f"✅ Executed: {cmd}")
        except subprocess.CalledProcessError as e:
            logger.warning(f"⚠️ Command failed: {cmd}")

def main():
    parser = argparse.ArgumentParser(description='Lucidra Automated Video Generator')
    parser.add_argument('--video', type=str, help='Generate specific video (ceo-overview, strategic-frameworks, process-management)')
    parser.add_argument('--generate-all', action='store_true', help='Generate all videos')
    parser.add_argument('--batch-render', action='store_true', help='Batch render all videos')
    parser.add_argument('--install-deps', action='store_true', help='Install system dependencies')
    parser.add_argument('--output-dir', type=str, default='generated_videos', help='Output directory')
    
    args = parser.parse_args()
    
    if args.install_deps:
        install_dependencies()
        return
    
    generator = LucidraVideoGenerator(output_dir=args.output_dir)
    
    try:
        if args.video:
            # Generate specific video
            def progress_callback(progress, step):
                print(f"Progress: {progress:.1f}% - {step}")
            
            output_file = generator.generate_video(args.video, progress_callback)
            print(f"✅ Video generated: {output_file}")
            
        elif args.generate_all or args.batch_render:
            # Generate all videos
            def batch_progress_callback(progress, step):
                print(f"Batch Progress: {progress:.1f}% - {step}")
            
            results = generator.generate_all_videos(batch_progress_callback)
            
            print("\n📊 Generation Results:")
            for result in results:
                if result['success']:
                    print(f"✅ {result['video_id']}: {result['file']}")
                else:
                    print(f"❌ {result['video_id']}: {result['error']}")
        
        else:
            print("❌ No action specified. Use --video, --generate-all, or --batch-render")
    
    finally:
        generator.cleanup()

if __name__ == "__main__":
    main()