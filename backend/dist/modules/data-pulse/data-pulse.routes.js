"use strict";
/**
 * DataPulse API Routes
 *
 * REST endpoints for market intelligence data:
 * - GET /api/data-pulse/signals - Get filtered market signals
 * - GET /api/data-pulse/matches - Get strategic product matches
 * - GET /api/data-pulse/analytics - Get signal analytics and insights
 * - WebSocket /api/data-pulse/stream - Real-time signal updates
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDataPulseWebSocket = void 0;
const express_1 = require("express");
const data_pulse_service_1 = require("./data-pulse.service");
const router = (0, express_1.Router)();
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
router.get('/signals', async (req, res) => {
    try {
        const filters = {
            regions: req.query.regions ? (Array.isArray(req.query.regions) ? req.query.regions : [req.query.regions]) : undefined,
            sectors: req.query.sectors ? (Array.isArray(req.query.sectors) ? req.query.sectors : [req.query.sectors]) : undefined,
            signalTypes: req.query.signalTypes ? (Array.isArray(req.query.signalTypes) ? req.query.signalTypes : [req.query.signalTypes]) : undefined,
            timeRange: req.query.timeRange || '24h',
            confidenceThreshold: req.query.confidenceThreshold ? parseInt(req.query.confidenceThreshold) : undefined
        };
        const signals = await data_pulse_service_1.dataPulseService.getSignals(filters);
        res.json({
            success: true,
            data: signals,
            count: signals.length,
            filters: filters,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
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
router.get('/matches', async (req, res) => {
    try {
        const userGoals = req.query.userGoals ? (Array.isArray(req.query.userGoals) ? req.query.userGoals : [req.query.userGoals]) : undefined;
        const matches = await data_pulse_service_1.dataPulseService.getStrategicMatches(userGoals);
        res.json({
            success: true,
            data: matches,
            count: matches.length,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
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
router.get('/analytics', async (req, res) => {
    try {
        const analytics = await data_pulse_service_1.dataPulseService.getSignalAnalytics();
        const signals = await data_pulse_service_1.dataPulseService.getSignals();
        const insights = await data_pulse_service_1.dataPulseService.generateStrategicInsights(signals);
        res.json({
            success: true,
            data: {
                analytics,
                insights,
                lastUpdated: new Date().toISOString()
            }
        });
    }
    catch (error) {
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
router.get('/health', (req, res) => {
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
const setupDataPulseWebSocket = (io) => {
    const dataPulseNamespace = io.of('/data-pulse');
    dataPulseNamespace.on('connection', (socket) => {
        console.log('📡 DataPulse WebSocket client connected:', socket.id);
        // Send initial data
        data_pulse_service_1.dataPulseService.getSignals().then(signals => {
            socket.emit('signals', signals);
        });
        // Listen for real-time updates
        const handleSignalsUpdate = (signals) => {
            socket.emit('signalsUpdated', signals);
        };
        data_pulse_service_1.dataPulseService.on('signalsUpdated', handleSignalsUpdate);
        // Handle client requests
        socket.on('requestSignals', async (filters) => {
            try {
                const signals = await data_pulse_service_1.dataPulseService.getSignals(filters);
                socket.emit('signals', signals);
            }
            catch (error) {
                socket.emit('error', { message: 'Failed to fetch signals' });
            }
        });
        socket.on('requestMatches', async (userGoals) => {
            try {
                const matches = await data_pulse_service_1.dataPulseService.getStrategicMatches(userGoals);
                socket.emit('matches', matches);
            }
            catch (error) {
                socket.emit('error', { message: 'Failed to fetch matches' });
            }
        });
        socket.on('disconnect', () => {
            console.log('📡 DataPulse WebSocket client disconnected:', socket.id);
            data_pulse_service_1.dataPulseService.removeListener('signalsUpdated', handleSignalsUpdate);
        });
    });
};
exports.setupDataPulseWebSocket = setupDataPulseWebSocket;
exports.default = router;
//# sourceMappingURL=data-pulse.routes.js.map