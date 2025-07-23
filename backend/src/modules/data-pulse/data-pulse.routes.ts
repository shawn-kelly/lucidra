/**
 * DataPulse API Routes
 * 
 * REST endpoints for market intelligence data:
 * - GET /api/data-pulse/signals - Get filtered market signals
 * - GET /api/data-pulse/matches - Get strategic product matches
 * - GET /api/data-pulse/analytics - Get signal analytics and insights
 * - WebSocket /api/data-pulse/stream - Real-time signal updates
 */

import { Router, Request, Response } from 'express';
import { dataPulseService, DataPulseFilters } from './data-pulse.service';

const router = Router();

/**
 * GET /api/data-pulse/signals
 * 
 * Retrieve filtered market signals
 * 
 * Query parameters:
 * - regions: string[] - Filter by regions
 * - sectors: string[] - Filter by sectors  
 * - signalTypes: string[] - Filter by signal types (social, financial, product)
 * - timeRange: string - Filter by time range (1h, 24h, 7d, 30d)
 * - confidenceThreshold: number - Minimum confidence threshold
 */
router.get('/signals', async (req: Request, res: Response) => {
  try {
    const filters: DataPulseFilters = {
      regions: req.query.regions ? (Array.isArray(req.query.regions) ? req.query.regions as string[] : [req.query.regions as string]) : undefined,
      sectors: req.query.sectors ? (Array.isArray(req.query.sectors) ? req.query.sectors as string[] : [req.query.sectors as string]) : undefined,
      signalTypes: req.query.signalTypes ? (Array.isArray(req.query.signalTypes) ? req.query.signalTypes as ('social' | 'financial' | 'product')[] : [req.query.signalTypes as ('social' | 'financial' | 'product')]) : undefined,
      timeRange: req.query.timeRange as ('1h' | '24h' | '7d' | '30d') || '24h',
      confidenceThreshold: req.query.confidenceThreshold ? parseInt(req.query.confidenceThreshold as string) : undefined
    };

    const signals = await dataPulseService.getSignals(filters);
    
    res.json({
      success: true,
      data: signals,
      count: signals.length,
      filters: filters,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching signals:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market signals',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/data-pulse/matches
 * 
 * Retrieve strategic product matches based on current signals
 * 
 * Query parameters:
 * - userGoals: string[] - User's strategic goals for personalized matching
 */
router.get('/matches', async (req: Request, res: Response) => {
  try {
    const userGoals = req.query.userGoals ? (Array.isArray(req.query.userGoals) ? req.query.userGoals as string[] : [req.query.userGoals as string]) : undefined;
    
    const matches = await dataPulseService.getStrategicMatches(userGoals);
    
    res.json({
      success: true,
      data: matches,
      count: matches.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching strategic matches:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch strategic matches',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/data-pulse/analytics
 * 
 * Get signal analytics and strategic insights
 */
router.get('/analytics', async (req: Request, res: Response) => {
  try {
    const analytics = await dataPulseService.getSignalAnalytics();
    const signals = await dataPulseService.getSignals();
    const insights = await dataPulseService.generateStrategicInsights(signals);
    
    res.json({
      success: true,
      data: {
        analytics,
        insights,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/data-pulse/health
 * 
 * Health check endpoint
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    service: 'DataPulse',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/**
 * WebSocket setup for real-time updates
 * This would typically be set up in a separate WebSocket server
 * or using Socket.IO for real-time signal streaming
 */
export const setupDataPulseWebSocket = (io: any) => {
  const dataPulseNamespace = io.of('/data-pulse');
  
  dataPulseNamespace.on('connection', (socket: any) => {
    console.log('📡 DataPulse WebSocket client connected:', socket.id);
    
    // Send initial data
    dataPulseService.getSignals().then(signals => {
      socket.emit('signals', signals);
    });
    
    // Listen for real-time updates
    const handleSignalsUpdate = (signals: any) => {
      socket.emit('signalsUpdated', signals);
    };
    
    dataPulseService.on('signalsUpdated', handleSignalsUpdate);
    
    // Handle client requests
    socket.on('requestSignals', async (filters: DataPulseFilters) => {
      try {
        const signals = await dataPulseService.getSignals(filters);
        socket.emit('signals', signals);
      } catch (error) {
        socket.emit('error', { message: 'Failed to fetch signals' });
      }
    });
    
    socket.on('requestMatches', async (userGoals: string[]) => {
      try {
        const matches = await dataPulseService.getStrategicMatches(userGoals);
        socket.emit('matches', matches);
      } catch (error) {
        socket.emit('error', { message: 'Failed to fetch matches' });
      }
    });
    
    socket.on('disconnect', () => {
      console.log('📡 DataPulse WebSocket client disconnected:', socket.id);
      dataPulseService.removeListener('signalsUpdated', handleSignalsUpdate);
    });
  });
};

export default router;