/**
 * DataPulse Service - Real-time market intelligence backend
 *
 * Provides REST API endpoints for:
 * - Live market signals (social, financial, product)
 * - Strategic product matching
 * - WebSocket real-time updates
 */
import { EventEmitter } from 'events';
export interface MarketSignal {
    id: string;
    type: 'social' | 'financial' | 'product';
    title: string;
    description: string;
    value: number;
    change: number;
    region: string;
    sector: string;
    timestamp: string;
    confidence: number;
    tags: string[];
    sourceUrl?: string;
    metadata?: Record<string, any>;
}
export interface StrategicMatch {
    id: string;
    productName: string;
    matchScore: number;
    reasoning: string;
    marketOpportunity: string;
    estimatedRevenue: string;
    timeToMarket: string;
    riskLevel: 'low' | 'medium' | 'high';
    relatedSignals: string[];
    competitorAnalysis?: string;
}
export interface DataPulseFilters {
    regions?: string[];
    sectors?: string[];
    signalTypes?: ('social' | 'financial' | 'product')[];
    timeRange?: '1h' | '24h' | '7d' | '30d';
    confidenceThreshold?: number;
}
declare class DataPulseService extends EventEmitter {
    private signals;
    private matches;
    private updateInterval;
    constructor();
    /**
     * Initialize with mock data for demonstration
     */
    private initializeMockData;
    /**
     * Start real-time updates simulation
     */
    private startRealTimeUpdates;
    /**
     * Simulate real-time signal value changes
     */
    private simulateSignalUpdates;
    /**
     * Get filtered market signals
     */
    getSignals(filters?: DataPulseFilters): Promise<MarketSignal[]>;
    /**
     * Get strategic product matches
     */
    getStrategicMatches(userGoals?: string[]): Promise<StrategicMatch[]>;
    /**
     * Get signal analytics and insights
     */
    getSignalAnalytics(): Promise<{
        totalSignals: number;
        averageConfidence: number;
        trendingTags: string[];
        sectorDistribution: Record<string, number>;
        regionDistribution: Record<string, number>;
    }>;
    /**
     * Generate AI-powered strategic insights
     */
    generateStrategicInsights(signals: MarketSignal[]): Promise<string[]>;
    private getTrendingTags;
    private getSectorDistribution;
    private getRegionDistribution;
    /**
     * Clean up resources
     */
    destroy(): void;
}
export declare const dataPulseService: DataPulseService;
export {};
//# sourceMappingURL=data-pulse.service.d.ts.map