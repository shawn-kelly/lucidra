interface VideoGenerationOptions {
    videoId: string;
    content: any;
    voiceoverScript?: string;
    duration: string;
}
interface VideoStatus {
    videoId: string;
    status: 'queued' | 'generating' | 'completed' | 'failed';
    progress: number;
    url?: string;
    error?: string;
}
export declare function generateVideo(options: VideoGenerationOptions): Promise<VideoStatus>;
export declare function getVideoStatus(videoId: string): Promise<VideoStatus | null>;
export declare function listVideos(): Promise<VideoStatus[]>;
export declare function generateStrategicDemo(demoType: string, content: any): Promise<VideoStatus>;
export {};
//# sourceMappingURL=video.service.d.ts.map