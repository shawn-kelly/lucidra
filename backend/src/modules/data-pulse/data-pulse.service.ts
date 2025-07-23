/**
 * DataPulse Service - Real-time market intelligence backend
 * 
 * Provides REST API endpoints for:
 * - Live market signals (social, financial, product)
 * - Strategic product matching
 * - WebSocket real-time updates
 */

import { EventEmitter } from 'events';

// Types for market signals
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

class DataPulseService extends EventEmitter {
  private signals: Map<string, MarketSignal> = new Map();
  private matches: Map<string, StrategicMatch> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.initializeMockData();
    this.startRealTimeUpdates();
  }

  /**
   * Initialize with mock data for demonstration
   */
  private initializeMockData(): void {
    const mockSignals: MarketSignal[] = [
      {
        id: 'signal_1',
        type: 'social',
        title: 'AI Automation Buzz Surge',
        description: 'Massive social media discussion spike around AI workflow automation tools',
        value: 85,
        change: 23.5,
        region: 'North America',
        sector: 'Technology',
        timestamp: new Date().toISOString(),
        confidence: 92,
        tags: ['AI', 'automation', 'productivity', 'SaaS'],
        sourceUrl: 'https://twitter.com/trends/ai-automation',
        metadata: {
          mentionCount: 15420,
          sentimentScore: 0.78,
          influencerEngagement: 'high'
        }
      },
      {
        id: 'signal_2',
        type: 'financial',
        title: 'FinTech Volatility Alert',
        description: 'High volatility detected in payment processing and digital banking stocks',
        value: 67,
        change: -12.3,
        region: 'Global',
        sector: 'Financial Services',
        timestamp: new Date().toISOString(),
        confidence: 88,
        tags: ['payments', 'volatility', 'disruption', 'banking'],
        metadata: {
          affectedStocks: ['SQ', 'PYPL', 'ADYEN'],
          volatilityIndex: 0.34,
          marketCap: '$2.1B'
        }
      },
      {
        id: 'signal_3',
        type: 'product',
        title: 'Sustainable Packaging Trend',
        description: 'Eco-friendly packaging products showing 340% growth in search volume',
        value: 94,
        change: 45.2,
        region: 'Europe',
        sector: 'Consumer Goods',
        timestamp: new Date().toISOString(),
        confidence: 95,
        tags: ['sustainability', 'packaging', 'growth', 'eco-friendly'],
        metadata: {
          searchVolume: 89400,
          competitorCount: 23,
          averagePrice: '$12.50'
        }
      },
      {
        id: 'signal_4',
        type: 'social',
        title: 'Remote Work Tools Demand',
        description: 'Increasing discussions about productivity tools for distributed teams',
        value: 78,
        change: 18.7,
        region: 'Global',
        sector: 'Technology',
        timestamp: new Date().toISOString(),
        confidence: 85,
        tags: ['remote-work', 'productivity', 'collaboration', 'SaaS'],
        metadata: {
          mentionCount: 8930,
          jobPostings: 2340,
          fundingActivity: 'increased'
        }
      }
    ];

    const mockMatches: StrategicMatch[] = [
      {
        id: 'match_1',
        productName: 'AI-Powered Customer Service Bot',
        matchScore: 94,
        reasoning: 'Strong correlation with AI automation social buzz and growing demand for automated customer support solutions',
        marketOpportunity: 'Small to medium businesses struggling with 24/7 customer support coverage',
        estimatedRevenue: '$50K-200K/year',
        timeToMarket: '3-6 months',
        riskLevel: 'medium',
        relatedSignals: ['signal_1'],
        competitorAnalysis: 'Moderate competition with differentiation opportunity in vertical-specific solutions'
      },
      {
        id: 'match_2',
        productName: 'Micro-Payment Processing API',
        matchScore: 87,
        reasoning: 'FinTech volatility creates opportunity for simplified, reliable payment solutions for creators and small businesses',
        marketOpportunity: 'Creator economy and micropayment market experiencing rapid growth',
        estimatedRevenue: '$100K-500K/year',
        timeToMarket: '6-12 months',
        riskLevel: 'high',
        relatedSignals: ['signal_2'],
        competitorAnalysis: 'High competition but opportunity in underserved niches'
      },
      {
        id: 'match_3',
        productName: 'Biodegradable Shipping Materials',
        matchScore: 91,
        reasoning: 'Direct alignment with sustainable packaging trend surge and regulatory pressure',
        marketOpportunity: 'E-commerce businesses seeking eco-friendly packaging solutions',
        estimatedRevenue: '$75K-300K/year',
        timeToMarket: '4-8 months',
        riskLevel: 'low',
        relatedSignals: ['signal_3'],
        competitorAnalysis: 'Growing market with room for innovative solutions'
      }
    ];

    // Store in maps for quick lookup
    mockSignals.forEach(signal => this.signals.set(signal.id, signal));
    mockMatches.forEach(match => this.matches.set(match.id, match));
  }

  /**
   * Start real-time updates simulation
   */
  private startRealTimeUpdates(): void {
    this.updateInterval = setInterval(() => {
      this.simulateSignalUpdates();
    }, 10000); // Update every 10 seconds
  }

  /**
   * Simulate real-time signal value changes
   */
  private simulateSignalUpdates(): void {
    this.signals.forEach((signal, id) => {
      // Simulate value changes
      const volatility = Math.random() * 10 - 5; // -5 to +5
      const newValue = Math.max(0, Math.min(100, signal.value + volatility));
      const change = newValue - signal.value;

      const updatedSignal: MarketSignal = {
        ...signal,
        value: newValue,
        change: change,
        timestamp: new Date().toISOString(),
        confidence: Math.max(60, Math.min(100, signal.confidence + (Math.random() * 4 - 2)))
      };

      this.signals.set(id, updatedSignal);
    });

    // Emit update event for WebSocket clients
    this.emit('signalsUpdated', Array.from(this.signals.values()));
  }

  /**
   * Get filtered market signals
   */
  async getSignals(filters: DataPulseFilters = {}): Promise<MarketSignal[]> {
    let signals = Array.from(this.signals.values());

    // Apply filters
    if (filters.signalTypes && filters.signalTypes.length > 0) {
      signals = signals.filter(signal => filters.signalTypes!.includes(signal.type));
    }

    if (filters.regions && filters.regions.length > 0) {
      signals = signals.filter(signal => filters.regions!.includes(signal.region));
    }

    if (filters.sectors && filters.sectors.length > 0) {
      signals = signals.filter(signal => filters.sectors!.includes(signal.sector));
    }

    if (filters.confidenceThreshold) {
      signals = signals.filter(signal => signal.confidence >= filters.confidenceThreshold!);
    }

    // Apply time range filter (mock implementation)
    if (filters.timeRange) {
      const now = new Date();
      const cutoff = new Date();
      
      switch (filters.timeRange) {
        case '1h':
          cutoff.setHours(now.getHours() - 1);
          break;
        case '24h':
          cutoff.setDate(now.getDate() - 1);
          break;
        case '7d':
          cutoff.setDate(now.getDate() - 7);
          break;
        case '30d':
          cutoff.setDate(now.getDate() - 30);
          break;
      }

      signals = signals.filter(signal => new Date(signal.timestamp) >= cutoff);
    }

    // Sort by timestamp (newest first)
    signals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return signals;
  }

  /**
   * Get strategic product matches
   */
  async getStrategicMatches(userGoals?: string[]): Promise<StrategicMatch[]> {
    let matches = Array.from(this.matches.values());

    // Sort by match score (highest first)
    matches.sort((a, b) => b.matchScore - a.matchScore);

    // In production, this would use AI to generate personalized matches
    // based on user goals, current signals, and market analysis
    
    return matches;
  }

  /**
   * Get signal analytics and insights
   */
  async getSignalAnalytics(): Promise<{
    totalSignals: number;
    averageConfidence: number;
    trendingTags: string[];
    sectorDistribution: Record<string, number>;
    regionDistribution: Record<string, number>;
  }> {
    const signals = Array.from(this.signals.values());
    
    const analytics = {
      totalSignals: signals.length,
      averageConfidence: signals.reduce((sum, s) => sum + s.confidence, 0) / signals.length,
      trendingTags: this.getTrendingTags(signals),
      sectorDistribution: this.getSectorDistribution(signals),
      regionDistribution: this.getRegionDistribution(signals)
    };

    return analytics;
  }

  /**
   * Generate AI-powered strategic insights
   */
  async generateStrategicInsights(signals: MarketSignal[]): Promise<string[]> {
    // In production, this would call an AI service to generate insights
    const insights = [
      "AI automation signals suggest strong opportunity in workflow optimization tools",
      "Financial sector volatility indicates potential for stable, simple payment solutions",
      "Sustainability trends show growing market for eco-friendly business solutions",
      "Remote work signals point to continued demand for collaboration tools"
    ];

    return insights;
  }

  private getTrendingTags(signals: MarketSignal[]): string[] {
    const tagCounts: Record<string, number> = {};
    
    signals.forEach(signal => {
      signal.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag);
  }

  private getSectorDistribution(signals: MarketSignal[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    signals.forEach(signal => {
      distribution[signal.sector] = (distribution[signal.sector] || 0) + 1;
    });

    return distribution;
  }

  private getRegionDistribution(signals: MarketSignal[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    signals.forEach(signal => {
      distribution[signal.region] = (distribution[signal.region] || 0) + 1;
    });

    return distribution;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.removeAllListeners();
  }
}

// Export singleton instance
export const dataPulseService = new DataPulseService();