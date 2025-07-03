import { Router } from 'express';
import { analyzeScenario } from '../../utils/aiClient';

const router = Router();

router.post('/suggest', async (req, res) => {
  const { scenario } = req.body;
  // Save to DB, omitted for brevity
  // Call Python AI for analysis
  const ai_analysis = await analyzeScenario(scenario);
  res.json({ scenario, ai_analysis });
});

export default router;
