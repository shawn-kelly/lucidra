import express from 'express';
import { 
  SandboxService, 
  WorkflowMission, 
  AIAdvisor, 
  Badge,
  AVAILABLE_BADGES 
} from './sandbox.service';
import { ensureSession } from '../../utils/aiUsageTracker';

const router = express.Router();

// Apply session middleware
router.use(ensureSession);

// Get user's sandbox dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const sessionId = req.sessionId!;
    const progress = SandboxService.getUserProgress(sessionId);
    const missions = SandboxService.getUserMissions(sessionId);
    const advisors = SandboxService.getAvailableAdvisors();
    
    res.json({
      success: true,
      data: {
        progress,
        missions,
        advisors,
        availableBadges: AVAILABLE_BADGES
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, error: 'Failed to load dashboard' });
  }
});

// Create a new workflow mission
router.post('/missions', async (req, res) => {
  try {
    const sessionId = req.sessionId!;
    const { title, description, challenge, category } = req.body;
    
    if (!title || !description || !challenge) {
      return res.status(400).json({ 
        success: false, 
        error: 'Title, description, and challenge are required' 
      });
    }
    
    const mission = SandboxService.createWorkflowMission(
      sessionId,
      title,
      description,
      challenge,
      category || 'custom'
    );
    
    res.json({
      success: true,
      data: mission
    });
  } catch (error) {
    console.error('Create mission error:', error);
    res.status(500).json({ success: false, error: 'Failed to create mission' });
  }
});

// Get specific mission
router.get('/missions/:missionId', async (req, res) => {
  try {
    const { missionId } = req.params;
    const mission = SandboxService.getMissionById(missionId);
    
    if (!mission) {
      return res.status(404).json({ success: false, error: 'Mission not found' });
    }
    
    res.json({
      success: true,
      data: mission
    });
  } catch (error) {
    console.error('Get mission error:', error);
    res.status(500).json({ success: false, error: 'Failed to get mission' });
  }
});

// Add subtask to mission
router.post('/missions/:missionId/subtasks', async (req, res) => {
  try {
    const { missionId } = req.params;
    const { title, description, assignedAdvisor, promptTemplate, constraints, expectedFormat } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Title and description are required' 
      });
    }
    
    const subtask = SandboxService.addSubtaskToMission(missionId, {
      title,
      description,
      assignedAdvisor,
      promptTemplate,
      constraints: constraints || [],
      expectedFormat,
      status: 'pending'
    });
    
    res.json({
      success: true,
      data: subtask
    });
  } catch (error) {
    console.error('Add subtask error:', error);
    res.status(500).json({ success: false, error: 'Failed to add subtask' });
  }
});

// Assign advisor to subtask
router.put('/missions/:missionId/subtasks/:subtaskId/advisor', async (req, res) => {
  try {
    const { missionId, subtaskId } = req.params;
    const { advisorId } = req.body;
    
    if (!advisorId) {
      return res.status(400).json({ success: false, error: 'Advisor ID is required' });
    }
    
    SandboxService.assignAdvisorToSubtask(missionId, subtaskId, advisorId);
    
    res.json({
      success: true,
      message: 'Advisor assigned successfully'
    });
  } catch (error) {
    console.error('Assign advisor error:', error);
    res.status(500).json({ success: false, error: 'Failed to assign advisor' });
  }
});

// Add iteration to subtask
router.post('/missions/:missionId/subtasks/:subtaskId/iterations', async (req, res) => {
  try {
    const { missionId, subtaskId } = req.params;
    const { promptUsed, advisorResponse, userAnnotation } = req.body;
    
    if (!promptUsed || !advisorResponse) {
      return res.status(400).json({ 
        success: false, 
        error: 'Prompt and advisor response are required' 
      });
    }
    
    const iteration = SandboxService.addIterationToSubtask(
      missionId,
      subtaskId,
      promptUsed,
      advisorResponse,
      userAnnotation
    );
    
    res.json({
      success: true,
      data: iteration
    });
  } catch (error) {
    console.error('Add iteration error:', error);
    res.status(500).json({ success: false, error: 'Failed to add iteration' });
  }
});

// Get user progress
router.get('/progress', async (req, res) => {
  try {
    const sessionId = req.sessionId!;
    const progress = SandboxService.getUserProgress(sessionId);
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ success: false, error: 'Failed to get progress' });
  }
});

// Get available AI advisors
router.get('/advisors', async (req, res) => {
  try {
    const advisors = SandboxService.getAvailableAdvisors();
    
    res.json({
      success: true,
      data: advisors
    });
  } catch (error) {
    console.error('Get advisors error:', error);
    res.status(500).json({ success: false, error: 'Failed to get advisors' });
  }
});

// Get available badges
router.get('/badges', async (req, res) => {
  try {
    const badges = SandboxService.getAvailableBadges();
    
    res.json({
      success: true,
      data: badges
    });
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({ success: false, error: 'Failed to get badges' });
  }
});

export { router as sandboxRoutes };