/**
 * DataPulse API Routes
 *
 * REST endpoints for market intelligence data:
 * - GET /api/data-pulse/signals - Get filtered market signals
 * - GET /api/data-pulse/matches - Get strategic product matches
 * - GET /api/data-pulse/analytics - Get signal analytics and insights
 * - WebSocket /api/data-pulse/stream - Real-time signal updates
 */
declare const router: import("express-serve-static-core").Router;
/**
 * WebSocket setup for real-time updates
 * This would typically be set up in a separate WebSocket server
 * or using Socket.IO for real-time signal streaming
 */
export declare const setupDataPulseWebSocket: (io: any) => void;
export default router;
//# sourceMappingURL=data-pulse.routes.d.ts.map