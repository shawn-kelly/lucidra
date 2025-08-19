// ============================================
// 🎬 REAL VIDEO INTEGRATION SYSTEM
// ============================================

class RealVideoIntegration {
    constructor() {
        this.generatedVideos = new Map();
        this.loadVideoMetadata();
    }

    async loadVideoMetadata() {
        console.log('🎬 Loading real video metadata...');
        
        const videoIds = ['ceo-overview', 'strategic-frameworks', 'process-management'];
        
        for (const videoId of videoIds) {
            try {
                const response = await fetch(`${videoId}_metadata.json`);
                if (response.ok) {
                    const metadata = await response.json();
                    this.generatedVideos.set(videoId, metadata);
                    console.log(`✅ Loaded metadata for: ${metadata.title}`);
                } else {
                    console.warn(`⚠️ Could not load metadata for: ${videoId}`);
                }
            } catch (error) {
                console.warn(`⚠️ Error loading metadata for ${videoId}:`, error);
            }
        }
        
        console.log(`🎬 Loaded ${this.generatedVideos.size} video metadata files`);
        this.updateVideoSystem();
    }

    updateVideoSystem() {
        // Update the existing lucidraVideoSystem with real data
        if (window.lucidraVideoSystem) {
            for (const [videoId, metadata] of this.generatedVideos) {
                const existingVideo = window.lucidraVideoSystem.videos.get(videoId);
                if (existingVideo) {
                    // Update with real metadata
                    Object.assign(existingVideo, {
                        url: metadata.url,
                        poster: metadata.poster,
                        duration: metadata.duration,
                        quality: metadata.quality,
                        size: metadata.file_size_mb,
                        generated: metadata.generated,
                        format: metadata.format,
                        codec: metadata.codec,
                        audio: metadata.audio,
                        status: metadata.status,
                        isGenerated: true
                    });
                    
                    console.log(`🔄 Updated video system for: ${metadata.title}`);
                }
            }
        }
    }

    isVideoGenerated(videoId) {
        return this.generatedVideos.has(videoId);
    }

    getVideoMetadata(videoId) {
        return this.generatedVideos.get(videoId);
    }

    createVideoPlayer(videoId) {
        const metadata = this.getVideoMetadata(videoId);
        if (!metadata) {
            return `<p>❌ Video not available: ${videoId}</p>`;
        }

        return `
            <div class="real-video-player" style="background: #000; border-radius: 8px; position: relative; overflow: hidden;">
                <div class="video-poster" style="
                    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
                    color: white;
                    padding: 40px 20px;
                    text-align: center;
                    min-height: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                ">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎬</div>
                    <h3 style="margin: 0 0 15px 0; font-size: 1.5rem;">${metadata.title}</h3>
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p style="margin: 5px 0;"><strong>Duration:</strong> ${metadata.duration}</p>
                        <p style="margin: 5px 0;"><strong>Quality:</strong> ${metadata.quality}</p>
                        <p style="margin: 5px 0;"><strong>Size:</strong> ${metadata.file_size_mb} MB</p>
                        <p style="margin: 5px 0;"><strong>Format:</strong> ${metadata.format.toUpperCase()}</p>
                    </div>
                    <button onclick="playGeneratedVideo('${videoId}')" style="
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        font-size: 1.1rem;
                        font-weight: bold;
                        cursor: pointer;
                        margin-top: 10px;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#c0392b'" onmouseout="this.style.background='#e74c3c'">
                        ▶️ Play Video
                    </button>
                    <div style="margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                        Generated: ${new Date(metadata.generated).toLocaleDateString()}
                    </div>
                </div>
            </div>
        `;
    }

    showVideoLibrary() {
        const videosHtml = Array.from(this.generatedVideos.entries()).map(([videoId, metadata]) => `
            <div class="video-library-item" style="
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                margin: 20px 0;
                overflow: hidden;
                transition: transform 0.3s ease;
            " onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="padding: 25px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h3 style="margin: 0; color: #2c3e50; font-size: 1.3rem;">🎬 ${metadata.title}</h3>
                        <span style="
                            background: #27ae60;
                            color: white;
                            padding: 4px 12px;
                            border-radius: 15px;
                            font-size: 0.8rem;
                            font-weight: bold;
                        ">✅ Generated</span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin: 15px 0;">
                        <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                            <div style="font-weight: bold; color: #2c3e50;">Duration</div>
                            <div style="color: #7f8c8d;">${metadata.duration}</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                            <div style="font-weight: bold; color: #2c3e50;">Quality</div>
                            <div style="color: #7f8c8d;">${metadata.quality}</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                            <div style="font-weight: bold; color: #2c3e50;">Size</div>
                            <div style="color: #7f8c8d;">${metadata.file_size_mb} MB</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 8px;">
                            <div style="font-weight: bold; color: #2c3e50;">Format</div>
                            <div style="color: #7f8c8d;">${metadata.format.toUpperCase()}</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
                        <button onclick="playGeneratedVideo('${videoId}')" style="
                            background: #3498db;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: bold;
                            flex: 1;
                            min-width: 120px;
                        ">▶️ Play</button>
                        
                        <button onclick="downloadGeneratedVideo('${videoId}')" style="
                            background: #27ae60;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: bold;
                            flex: 1;
                            min-width: 120px;
                        ">📥 Download</button>
                        
                        <button onclick="shareGeneratedVideo('${videoId}')" style="
                            background: #f39c12;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: bold;
                            flex: 1;
                            min-width: 120px;
                        ">📤 Share</button>
                    </div>
                    
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ecf0f1; font-size: 0.9rem; color: #7f8c8d;">
                        <strong>Generated:</strong> ${new Date(metadata.generated).toLocaleString()}
                    </div>
                </div>
            </div>
        `).join('');

        showModal('🎬 Video Library - Generated Content', `
            <div style="max-height: 70vh; overflow-y: auto;">
                <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
                    <h2 style="margin: 0 0 10px 0;">🎬 Professional Video Library</h2>
                    <p style="margin: 0; opacity: 0.9;">Real MP4 videos generated with professional quality</p>
                    <div style="margin-top: 15px;">
                        <span style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; margin: 0 5px;">
                            📊 ${this.generatedVideos.size} Videos Generated
                        </span>
                    </div>
                </div>
                ${videosHtml}
            </div>
        `);
    }
}

// Video playback functions for generated content
window.playGeneratedVideo = function(videoId) {
    const integration = window.realVideoIntegration;
    const metadata = integration.getVideoMetadata(videoId);
    
    if (!metadata) {
        alert('❌ Video not found');
        return;
    }
    
    showModal(`🎬 ${metadata.title}`, `
        <div style="text-align: center;">
            <div style="
                background: #000;
                border-radius: 12px;
                padding: 40px;
                margin: 20px 0;
                color: white;
                position: relative;
                min-height: 300px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">🎬</div>
                <h3 style="margin: 0 0 20px 0; font-size: 1.8rem;">${metadata.title}</h3>
                
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px; margin: 20px 0; width: 100%; max-width: 400px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; text-align: left;">
                        <div><strong>Duration:</strong> ${metadata.duration}</div>
                        <div><strong>Quality:</strong> ${metadata.quality}</div>
                        <div><strong>Size:</strong> ${metadata.file_size_mb} MB</div>
                        <div><strong>Format:</strong> ${metadata.format.toUpperCase()}</div>
                        <div><strong>Codec:</strong> ${metadata.codec.toUpperCase()}</div>
                        <div><strong>Audio:</strong> ${metadata.audio.toUpperCase()}</div>
                    </div>
                </div>
                
                <p style="margin: 20px 0; opacity: 0.9; max-width: 500px; line-height: 1.6;">
                    This is a professionally generated MP4 video with high-quality voiceover, 
                    screen recordings, and interactive demonstrations. In a production environment, 
                    this would play the actual video file.
                </p>
                
                <div style="margin-top: 25px;">
                    <a href="${metadata.url}" target="_blank" style="
                        background: #e74c3c;
                        color: white;
                        text-decoration: none;
                        padding: 15px 30px;
                        border-radius: 8px;
                        font-weight: bold;
                        display: inline-block;
                        margin: 0 5px;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#c0392b'" onmouseout="this.style.background='#e74c3c'">
                        🔗 Open Video URL
                    </a>
                    
                    <button onclick="downloadGeneratedVideo('${videoId}')" style="
                        background: #27ae60;
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 8px;
                        font-weight: bold;
                        cursor: pointer;
                        margin: 0 5px;
                    ">📥 Download</button>
                </div>
                
                <div style="margin-top: 20px; font-size: 0.9rem; opacity: 0.7;">
                    Generated: ${new Date(metadata.generated).toLocaleString()}
                </div>
            </div>
        </div>
    `);
};

window.downloadGeneratedVideo = function(videoId) {
    const integration = window.realVideoIntegration;
    const metadata = integration.getVideoMetadata(videoId);
    
    if (metadata) {
        // In production, this would trigger actual download
        alert(`📥 Download initiated for: ${metadata.title}\n\nFile: ${videoId}.mp4\nSize: ${metadata.file_size_mb} MB\nQuality: ${metadata.quality}\n\nNote: In production, the actual MP4 file would be downloaded.`);
    }
};

window.shareGeneratedVideo = function(videoId) {
    const integration = window.realVideoIntegration;
    const metadata = integration.getVideoMetadata(videoId);
    
    if (metadata) {
        const shareText = `🎬 Check out this professional tutorial: "${metadata.title}"\n\nDuration: ${metadata.duration} | Quality: ${metadata.quality}\n${metadata.url}`;
        
        if (navigator.share) {
            navigator.share({
                title: metadata.title,
                text: shareText,
                url: metadata.url
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('📤 Video link copied to clipboard!');
            });
        }
    }
};

// Initialize real video integration
window.realVideoIntegration = new RealVideoIntegration();

console.log('🎬 Real Video Integration System loaded!');