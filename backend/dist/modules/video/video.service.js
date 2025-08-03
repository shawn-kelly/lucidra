"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideo = generateVideo;
exports.getVideoStatus = getVideoStatus;
exports.listVideos = listVideos;
exports.generateStrategicDemo = generateStrategicDemo;
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
// In-memory store for video status (use Redis in production)
const videoStatusStore = new Map();
async function generateVideo(options) {
    const { videoId, content, voiceoverScript, duration } = options;
    // Initialize status
    const status = {
        videoId,
        status: 'queued',
        progress: 0
    };
    videoStatusStore.set(videoId, status);
    // Start video generation in background
    generateVideoAsync(options).catch(error => {
        console.error(`Video generation failed for ${videoId}:`, error);
        videoStatusStore.set(videoId, {
            ...status,
            status: 'failed',
            error: error.message
        });
    });
    return status;
}
async function generateVideoAsync(options) {
    const { videoId, content, voiceoverScript, duration } = options;
    try {
        // Update status to generating
        updateVideoStatus(videoId, { status: 'generating', progress: 10 });
        // Create output directory
        const outputDir = '/tmp/lucidra-videos';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        // Try AI video generation first, fallback to FFmpeg
        const aiVideoPath = await tryAIVideoGeneration(videoId, content, voiceoverScript);
        if (aiVideoPath) {
            // AI generation successful
            updateVideoStatus(videoId, {
                status: 'completed',
                progress: 100,
                url: `/api/video/stream/${videoId}`
            });
        }
        else {
            // Fallback to FFmpeg generation
            updateVideoStatus(videoId, { progress: 20 });
            const scenes = generateScenesFromContent(content);
            updateVideoStatus(videoId, { progress: 40 });
            const audioPath = await generateVoiceover(videoId, voiceoverScript || content.script);
            updateVideoStatus(videoId, { progress: 60 });
            const videoPath = await createVideoWithFFmpeg(videoId, scenes, audioPath, duration);
            updateVideoStatus(videoId, {
                status: 'completed',
                progress: 100,
                url: `/api/video/stream/${videoId}`
            });
        }
    }
    catch (error) {
        throw error;
    }
}
function generateScenesFromContent(content) {
    const scenes = [];
    // Opening scene - Brand introduction
    scenes.push({
        id: 'opening',
        text: 'Lucidra: Strategic Clarity Through AI',
        duration: 3,
        backgroundColor: '#1FE0C4',
        textStyle: {
            fontSize: 52,
            fontFamily: 'Inter, sans-serif',
            color: '#1C1F26',
            fontWeight: 'bold'
        },
        animation: 'fadeIn'
    });
    // Content-specific scenes
    if (content.highlights) {
        content.highlights.forEach((highlight, index) => {
            scenes.push({
                id: `scene_${index}`,
                text: highlight,
                duration: 5,
                backgroundColor: getSceneColor(index),
                textStyle: {
                    fontSize: 42,
                    fontFamily: 'Inter, sans-serif',
                    color: '#F8FAFD',
                    fontWeight: '500'
                },
                animation: 'slideIn',
                overlay: {
                    type: 'ui-mockup',
                    opacity: 0.3,
                    position: 'background'
                }
            });
        });
    }
    // Closing scene - Call to action
    scenes.push({
        id: 'closing',
        text: 'Enable Strategic Clarity Today',
        duration: 3,
        backgroundColor: '#6C75F8',
        textStyle: {
            fontSize: 48,
            fontFamily: 'Inter, sans-serif',
            color: '#F8FAFD',
            fontWeight: '600'
        },
        animation: 'fadeOut'
    });
    return scenes;
}
function getSceneColor(index) {
    const colors = ['#1FE0C4', '#1C1F26', '#6C75F8', '#FF6B6B', '#00D4AA'];
    return colors[index % colors.length];
}
async function generateVoiceover(videoId, script) {
    // For now, create a simple text-to-speech placeholder
    // In production, integrate with services like AWS Polly, Google TTS, or ElevenLabs
    const audioPath = `/tmp/lucidra-videos/${videoId}_audio.wav`;
    // Create a silent audio file as placeholder (replace with actual TTS)
    try {
        await execAsync(`ffmpeg -f lavfi -i "anullsrc=r=44100:cl=stereo" -t 30 -acodec pcm_s16le "${audioPath}" -y`);
        return audioPath;
    }
    catch (error) {
        console.warn('Failed to generate audio, continuing without:', error);
        return '';
    }
}
async function createVideoWithFFmpeg(videoId, scenes, audioPath, duration) {
    const outputPath = `/tmp/lucidra-videos/${videoId}.mp4`;
    try {
        // Create a simple video with text scenes
        const videoDuration = parseDuration(duration);
        const sceneFrames = Math.floor(videoDuration / scenes.length);
        // Generate video frames for each scene
        const frameCommands = scenes.map((scene, index) => {
            const startTime = index * sceneFrames;
            return `drawtext=text='${scene.text.replace(/'/g, "\\'")}':fontsize=36:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,${startTime},${startTime + sceneFrames})'`;
        }).join(',');
        // Create video with ffmpeg
        let ffmpegCommand = `ffmpeg -f lavfi -i "color=c=#1C1F26:size=1280x720:rate=30" -vf "${frameCommands}" -t ${videoDuration} -pix_fmt yuv420p`;
        // Add audio if available
        if (audioPath && fs.existsSync(audioPath)) {
            ffmpegCommand += ` -i "${audioPath}" -c:a aac -c:v libx264`;
        }
        else {
            ffmpegCommand += ` -c:v libx264`;
        }
        ffmpegCommand += ` "${outputPath}" -y`;
        console.log('Executing ffmpeg command:', ffmpegCommand);
        await execAsync(ffmpegCommand);
        return outputPath;
    }
    catch (error) {
        console.error('FFmpeg error:', error);
        throw new Error(`Video generation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}
async function tryAIVideoGeneration(videoId, content, voiceoverScript) {
    try {
        // Try multiple AI video services in order of preference
        const services = [
            { name: 'runway', func: generateWithRunwayML },
            { name: 'stability', func: generateWithStabilityAI },
            { name: 'openai', func: generateWithOpenAI },
            { name: 'leonardo', func: generateWithLeonardoAI }
        ];
        for (const service of services) {
            try {
                console.log(`Attempting video generation with ${service.name}...`);
                updateVideoStatus(videoId, { progress: 30 });
                const videoPath = await service.func(videoId, content, voiceoverScript);
                if (videoPath) {
                    console.log(`Successfully generated video with ${service.name}`);
                    return videoPath;
                }
            }
            catch (error) {
                console.warn(`${service.name} failed:`, error instanceof Error ? error.message : String(error));
                continue;
            }
        }
        return null;
    }
    catch (error) {
        console.error('All AI video services failed:', error);
        return null;
    }
}
async function generateWithRunwayML(videoId, content, voiceoverScript) {
    const apiKey = process.env.RUNWAY_API_KEY;
    if (!apiKey) {
        console.log('Runway ML API key not found, skipping...');
        return null;
    }
    try {
        // Create a compelling prompt from the content
        const prompt = createVideoPromptFromContent(content);
        const response = await axios_1.default.post('https://api.runwayml.com/v1/generate', {
            prompt,
            duration: 5, // seconds
            ratio: '16:9',
            model: 'gen3a_turbo'
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 60000
        });
        if (response.data && response.data.video_url) {
            const videoPath = `/tmp/lucidra-videos/${videoId}.mp4`;
            await downloadVideo(response.data.video_url, videoPath);
            return videoPath;
        }
        return null;
    }
    catch (error) {
        console.error('Runway ML error:', error.response?.data || (error instanceof Error ? error.message : String(error)));
        return null;
    }
}
async function generateWithStabilityAI(videoId, content, voiceoverScript) {
    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) {
        console.log('Stability AI API key not found, skipping...');
        return null;
    }
    try {
        const prompt = createVideoPromptFromContent(content);
        const response = await axios_1.default.post('https://api.stability.ai/v2beta/stable-video/generate', {
            prompt,
            duration: 'short',
            aspect_ratio: '16:9'
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 90000
        });
        if (response.data && response.data.video) {
            const videoPath = `/tmp/lucidra-videos/${videoId}.mp4`;
            await downloadVideo(response.data.video, videoPath);
            return videoPath;
        }
        return null;
    }
    catch (error) {
        console.error('Stability AI error:', error.response?.data || (error instanceof Error ? error.message : String(error)));
        return null;
    }
}
async function generateWithOpenAI(videoId, content, voiceoverScript) {
    // OpenAI doesn't have direct video generation yet, but we can use DALL-E for images + TTS
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.log('OpenAI API key not found, skipping...');
        return null;
    }
    try {
        // Generate images with DALL-E and create slideshow
        const prompt = createImagePromptFromContent(content);
        const response = await axios_1.default.post('https://api.openai.com/v1/images/generations', {
            prompt,
            n: 3,
            size: '1792x1024',
            model: 'dall-e-3'
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 60000
        });
        if (response.data && response.data.data && response.data.data.length > 0) {
            const videoPath = await createSlideshowFromImages(videoId, response.data.data, voiceoverScript);
            return videoPath;
        }
        return null;
    }
    catch (error) {
        console.error('OpenAI error:', error.response?.data || (error instanceof Error ? error.message : String(error)));
        return null;
    }
}
async function generateWithLeonardoAI(videoId, content, voiceoverScript) {
    const apiKey = process.env.LEONARDO_API_KEY;
    if (!apiKey) {
        console.log('Leonardo AI API key not found, skipping...');
        return null;
    }
    try {
        const prompt = createVideoPromptFromContent(content);
        const response = await axios_1.default.post('https://cloud.leonardo.ai/api/rest/v1/generations-motion', {
            prompt,
            num_images: 1,
            model_id: 'aa77f04e-3eec-4034-9c07-d0f619684628', // Leonardo Creative
            width: 1024,
            height: 576,
            motion_strength: 7
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 90000
        });
        if (response.data && response.data.sdGenerationJob) {
            // Poll for completion
            const jobId = response.data.sdGenerationJob.generationId;
            const videoPath = await pollLeonardoJob(videoId, jobId, apiKey);
            return videoPath;
        }
        return null;
    }
    catch (error) {
        console.error('Leonardo AI error:', error.response?.data || (error instanceof Error ? error.message : String(error)));
        return null;
    }
}
function createVideoPromptFromContent(content) {
    let prompt = 'Human-centered tutorial video showing a person using Lucidra platform, ';
    if (content.title) {
        prompt += `demonstrating ${content.title} workflow, `;
    }
    if (content.highlights && content.highlights.length > 0) {
        prompt += `specifically showcasing ${content.highlights.slice(0, 2).join(' and ')}, `;
    }
    prompt += 'realistic user interaction, clean minimalist interface, strategic planning in action, ';
    prompt += 'professional person at modern workspace, intuitive mouse movements, clear UI elements, ';
    prompt += 'natural human behavior, soft lighting, 16:9 aspect ratio, cinematic quality';
    return prompt;
}
function createImagePromptFromContent(content) {
    let prompt = 'Modern business infographic illustration, clean design, ';
    if (content.title) {
        prompt += `showing ${content.title} concepts, `;
    }
    prompt += 'professional color scheme, data visualization, charts and diagrams, corporate style';
    return prompt;
}
async function downloadVideo(url, outputPath) {
    const response = await (0, axios_1.default)({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}
async function createSlideshowFromImages(videoId, images, voiceoverScript) {
    const videoPath = `/tmp/lucidra-videos/${videoId}.mp4`;
    // Download images
    const imagePaths = [];
    for (let i = 0; i < images.length; i++) {
        const imagePath = `/tmp/lucidra-videos/${videoId}_image_${i}.png`;
        await downloadVideo(images[i].url, imagePath);
        imagePaths.push(imagePath);
    }
    // Create slideshow with ffmpeg
    const duration = 3; // seconds per image
    const inputs = imagePaths.map(path => `-loop 1 -t ${duration} -i "${path}"`).join(' ');
    const filters = imagePaths.map((_, i) => `[${i}:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[v${i}]`).join(';');
    const concat = imagePaths.map((_, i) => `[v${i}]`).join('') + `concat=n=${imagePaths.length}:v=1:a=0[out]`;
    const command = `ffmpeg ${inputs} -filter_complex "${filters};${concat}" -map "[out]" -c:v libx264 -pix_fmt yuv420p "${videoPath}" -y`;
    await execAsync(command);
    return videoPath;
}
async function pollLeonardoJob(videoId, jobId, apiKey) {
    const maxAttempts = 30;
    let attempts = 0;
    while (attempts < maxAttempts) {
        try {
            const response = await axios_1.default.get(`https://cloud.leonardo.ai/api/rest/v1/generations/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            if (response.data && response.data.generations_by_pk) {
                const generation = response.data.generations_by_pk;
                if (generation.status === 'COMPLETE' && generation.generated_images && generation.generated_images.length > 0) {
                    const videoUrl = generation.generated_images[0].motionMP4URL;
                    if (videoUrl) {
                        const videoPath = `/tmp/lucidra-videos/${videoId}.mp4`;
                        await downloadVideo(videoUrl, videoPath);
                        return videoPath;
                    }
                }
            }
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
            attempts++;
        }
        catch (error) {
            console.error('Error polling Leonardo job:', error);
            break;
        }
    }
    return null;
}
function parseDuration(duration) {
    // Parse duration like "15:30" to seconds
    const parts = duration.split(':');
    const minutes = parseInt(parts[0]) || 0;
    const seconds = parseInt(parts[1]) || 0;
    return minutes * 60 + seconds;
}
function updateVideoStatus(videoId, updates) {
    const current = videoStatusStore.get(videoId);
    if (current) {
        videoStatusStore.set(videoId, { ...current, ...updates });
    }
}
async function getVideoStatus(videoId) {
    return videoStatusStore.get(videoId) || null;
}
async function listVideos() {
    return Array.from(videoStatusStore.values());
}
async function generateStrategicDemo(demoType, content) {
    const videoId = `demo_${demoType}_${Date.now()}`;
    // Enhanced content for strategic demonstrations
    const enhancedContent = {
        title: `Lucidra ${demoType.charAt(0).toUpperCase() + demoType.slice(1)} Module`,
        highlights: [
            'Strategic clarity through AI-powered insights',
            'Gamified workflow orchestration',
            'Real-time organizational challenge resolution',
            'Modular framework integration',
            'Human-centered design principles'
        ],
        demoType,
        strategicFocus: content.strategicFocus || 'organizational effectiveness',
        voiceoverScript: generateStrategicVoiceover(demoType, content)
    };
    return await generateVideo({
        videoId,
        content: enhancedContent,
        voiceoverScript: enhancedContent.voiceoverScript,
        duration: '90' // 90 seconds for strategic demos
    });
}
function generateStrategicVoiceover(demoType, content) {
    const baseScript = `Welcome to Lucidra, where strategic clarity meets intelligent orchestration. `;
    switch (demoType) {
        case 'scenario-planning':
            return baseScript +
                `Watch as our AI-powered scenario planning module transforms complex business challenges into actionable insights. ` +
                `Notice how the clean, minimalist interface guides users through strategic analysis, ` +
                `while gamified elements keep the process engaging and productive. ` +
                `This is strategic depth without complexity - the Lucidra advantage.`;
        case 'market-analysis':
            return baseScript +
                `Observe how market analysis becomes intuitive with Lucidra's modular framework. ` +
                `Our human-centered design ensures that complex data transforms into clear strategic direction. ` +
                `Every interaction is purposeful, every insight actionable.`;
        case 'team-orchestration':
            return baseScript +
                `See how team orchestration flows naturally within Lucidra's ecosystem. ` +
                `From individual insights to collective intelligence, ` +
                `our platform enables seamless collaboration while maintaining strategic focus.`;
        default:
            return baseScript +
                `Experience how Lucidra transforms organizational challenges into strategic opportunities. ` +
                `Through AI-powered insights and human-centered design, ` +
                `complexity becomes clarity, and strategy becomes action.`;
    }
}
//# sourceMappingURL=video.service.js.map