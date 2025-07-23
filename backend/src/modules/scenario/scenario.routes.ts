import { Router } from 'express';
import { analyzeScenario } from '../../utils/aiClient';
import { AIUsageTracker, ensureSession } from '../../utils/aiUsageTracker';
import { FallbackCoach } from '../../utils/fallbackCoach';

const router = Router();

// Apply session middleware to all routes
router.use(ensureSession);

router.post('/suggest', async (req, res) => {
  try {
    const { scenario } = req.body;
    const sessionId = req.sessionId!;
    
    // Check if AI can be used
    const aiStatus = AIUsageTracker.canUseAI(sessionId);
    
    let analysis;
    let usedAI = false;
    
    if (aiStatus.canUse) {
      try {
        // Call Claude AI for analysis
        analysis = await analyzeScenario(scenario);
        
        // Estimate tokens used (rough calculation based on response length)
        const estimatedTokens = Math.ceil(analysis.length / 4);
        AIUsageTracker.recordUsage(sessionId, estimatedTokens);
        usedAI = true;
        
      } catch (error) {
        console.error('AI analysis failed:', error);
        // Fall back to coaching logic
        const coachingResponse = FallbackCoach.analyzeScenario(scenario);
        analysis = coachingResponse.analysis;
      }
    } else {
      // Use fallback coaching logic
      const coachingResponse = FallbackCoach.analyzeScenario(scenario);
      analysis = coachingResponse.analysis;
    }
    
    // Get updated usage stats
    const usage = AIUsageTracker.getUsageStats(sessionId);
    
    res.json({
      scenario,
      ai_analysis: analysis,
      usedAI,
      usage,
      aiStatus: aiStatus.reason || 'Available'
    });
    
  } catch (error) {
    console.error('Scenario analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze scenario' });
  }
});

router.post('/opt-in', async (req, res) => {
  try {
    const sessionId = req.sessionId!;
    const success = AIUsageTracker.optInToAI(sessionId);
    const usage = AIUsageTracker.getUsageStats(sessionId);
    
    res.json({
      success,
      message: success ? 'AI analysis enabled' : 'Failed to enable AI',
      usage
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to opt in to AI' });
  }
});

router.post('/opt-out', async (req, res) => {
  try {
    const sessionId = req.sessionId!;
    const success = AIUsageTracker.optOutOfAI(sessionId);
    const usage = AIUsageTracker.getUsageStats(sessionId);
    
    res.json({
      success,
      message: success ? 'AI analysis disabled' : 'Failed to disable AI',
      usage
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to opt out of AI' });
  }
});

router.get('/usage', async (req, res) => {
  try {
    const sessionId = req.sessionId!;
    const usage = AIUsageTracker.getUsageStats(sessionId);
    const aiStatus = AIUsageTracker.canUseAI(sessionId);
    
    res.json({
      usage,
      aiStatus: aiStatus.reason || 'Available',
      canUseAI: aiStatus.canUse
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get usage stats' });
  }
});

router.get('/coaching-tips', async (req, res) => {
  try {
    const tips = FallbackCoach.getCoachingTips();
    res.json({ tips });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get coaching tips' });
  }
});

export default router;
