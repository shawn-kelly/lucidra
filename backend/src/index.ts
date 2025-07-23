import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scenarioRoutes from './modules/scenario/scenario.routes';
import { videoRoutes } from './modules/video/video.routes';
import { sandboxRoutes } from './modules/sandbox/sandbox.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/scenario', scenarioRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/sandbox', sandboxRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Lucidra Backend' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;