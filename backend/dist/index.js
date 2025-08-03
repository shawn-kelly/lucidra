"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const scenario_routes_1 = __importDefault(require("./modules/scenario/scenario.routes"));
const video_routes_1 = require("./modules/video/video.routes");
const sandbox_routes_1 = require("./modules/sandbox/sandbox.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/scenario', scenario_routes_1.default);
app.use('/api/video', video_routes_1.videoRoutes);
app.use('/api/sandbox', sandbox_routes_1.sandboxRoutes);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Lucidra Backend' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map