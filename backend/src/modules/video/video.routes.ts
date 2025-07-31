import express from 'express';
import { generateVideo, getVideoStatus, listVideos } from './video.service';

const router = express.Router();

// Generate a new video from content
router.post('/generate', async (req, res) => {
  try {
    const { videoId, content, voiceoverScript, duration } = req.body;
    
    if (!videoId || !content) {
      return res.status(400).json({ error: 'Video ID and content are required' });
    }

    const result = await generateVideo({
      videoId,
      content,
      voiceoverScript,
      duration: duration || '15:30'
    });

    res.json({
      success: true,
      estimatedCompletion: new Date(Date.now() + 300000), // 5 minutes
      ...result
    });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

// Get video generation status
router.get('/status/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const status = await getVideoStatus(videoId);
    
    res.json(status);
  } catch (error) {
    console.error('Video status error:', error);
    res.status(500).json({ error: 'Failed to get video status' });
  }
});

// List all available videos
router.get('/list', async (req, res) => {
  try {
    const videos = await listVideos();
    res.json(videos);
  } catch (error) {
    console.error('Video list error:', error);
    res.status(500).json({ error: 'Failed to list videos' });
  }
});

// Stream video file
router.get('/stream/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const videoPath = `/tmp/lucidra-videos/${videoId}.mp4`;
    
    // Set appropriate headers for video streaming
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Accept-Ranges', 'bytes');
    
    // Stream the video file
    const fs = require('fs');
    if (fs.existsSync(videoPath)) {
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
      }
    } else {
      res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    console.error('Video streaming error:', error);
    res.status(500).json({ error: 'Failed to stream video' });
  }
});

export { router as videoRoutes };