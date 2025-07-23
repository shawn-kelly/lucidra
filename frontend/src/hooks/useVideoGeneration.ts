import React, { useState, useCallback } from 'react';

interface VideoGenerationOptions {
  videoId: string;
  content: any;
  voiceoverScript?: string;
  duration?: string;
}

interface VideoStatus {
  videoId: string;
  status: 'queued' | 'generating' | 'completed' | 'failed';
  progress: number;
  url?: string;
  error?: string;
}

export const useVideoGeneration = () => {
  const [generatingVideos, setGeneratingVideos] = useState<Map<string, VideoStatus>>(new Map());
  const [error, setError] = useState<string | null>(null);

  const generateVideo = useCallback(async (options: VideoGenerationOptions): Promise<VideoStatus> => {
    try {
      setError(null);
      
      // Start generation
      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error(`Failed to start video generation: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Update local state
      setGeneratingVideos(prev => new Map(prev.set(options.videoId, result)));
      
      // Start polling for status
      pollVideoStatus(options.videoId);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const pollVideoStatus = useCallback(async (videoId: string) => {
    const maxAttempts = 60; // 5 minutes with 5-second intervals
    let attempts = 0;

    const poll = async () => {
      try {
        attempts++;
        
        const response = await fetch(`/api/video/status/${videoId}`);
        if (!response.ok) {
          throw new Error(`Failed to get video status: ${response.statusText}`);
        }

        const status: VideoStatus = await response.json();
        
        // Update local state
        setGeneratingVideos(prev => new Map(prev.set(videoId, status)));

        // Continue polling if still generating and under max attempts
        if (status.status === 'generating' && attempts < maxAttempts) {
          setTimeout(poll, 5000); // Poll every 5 seconds
        } else if (status.status === 'failed') {
          setError(`Video generation failed: ${status.error || 'Unknown error'}`);
        }
      } catch (err) {
        console.error('Error polling video status:', err);
        if (attempts < maxAttempts) {
          setTimeout(poll, 5000); // Retry after 5 seconds
        } else {
          setError('Failed to get video status after multiple attempts');
        }
      }
    };

    poll();
  }, []);

  const getVideoStatus = useCallback((videoId: string): VideoStatus | undefined => {
    return generatingVideos.get(videoId);
  }, [generatingVideos]);

  const isVideoReady = useCallback((videoId: string): boolean => {
    const status = generatingVideos.get(videoId);
    return status?.status === 'completed' && !!status.url;
  }, [generatingVideos]);

  const getVideoUrl = useCallback((videoId: string): string | undefined => {
    const status = generatingVideos.get(videoId);
    return status?.status === 'completed' ? status.url : undefined;
  }, [generatingVideos]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    generateVideo,
    getVideoStatus,
    isVideoReady,
    getVideoUrl,
    generatingVideos: Array.from(generatingVideos.values()),
    error,
    clearError,
  };
};