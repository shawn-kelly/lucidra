import { v4 as uuidv4 } from 'uuid';

export interface AIAdvisor {
  id: string;
  name: string;
  type: 'claude' | 'gemini' | 'copilot' | 'deepseek' | 'gpt4' | 'custom';
  description: string;
  strengths: string[];
  costPerToken: number;
  availability: 'free' | 'paid' | 'limited';
  icon: string;
  color: string;
}

export interface WorkflowSubtask {
  id: string;
  title: string;
  description: string;
  assignedAdvisor?: string;
  promptTemplate?: string;
  constraints?: string[];
  expectedFormat?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'needs_revision';
  iterations: SubtaskIteration[];
  xpEarned: number;
}

export interface SubtaskIteration {
  id: string;
  iterationNumber: number;
  promptUsed: string;
  advisorResponse: string;
  userAnnotation?: string;
  improvementNotes?: string;
  timestamp: Date;
  xpAwarded: number;
}

export interface WorkflowMission {
  id: string;
  title: string;
  description: string;
  challenge: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'code_review' | 'ux_copy' | 'architecture' | 'brand_strategy' | 'custom';
  subtasks: WorkflowSubtask[];
  totalXP: number;
  completionStatus: 'not_started' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface UserProgress {
  userId: string;
  totalXP: number;
  level: number;
  badges: Badge[];
  completedMissions: string[];
  activeWorkflows: string[];
  streaks: {
    dailyPrompting: number;
    weeklyCompletion: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpRequired: number;
  category: 'decomposition' | 'synthesis' | 'iteration' | 'mastery';
  earnedAt?: Date;
}

export interface SandboxTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prebuiltSubtasks: Omit<WorkflowSubtask, 'id' | 'iterations' | 'xpEarned'>[];
  recommendedAdvisors: string[];
  learningObjectives: string[];
  xpReward: number;
}

// Default AI Advisors
export const DEFAULT_AI_ADVISORS: AIAdvisor[] = [
  {
    id: 'claude',
    name: 'Claude',
    type: 'claude',
    description: 'Strategic analysis and comprehensive reasoning',
    strengths: ['Complex reasoning', 'Strategic thinking', 'Code analysis', 'Writing'],
    costPerToken: 0.0015,
    availability: 'paid',
    icon: '🧠',
    color: '#FF6B6B'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    type: 'gemini',
    description: 'Multimodal analysis and creative problem-solving',
    strengths: ['Visual analysis', 'Creative ideation', 'Research', 'Multimodal tasks'],
    costPerToken: 0.001,
    availability: 'free',
    icon: '💎',
    color: '#4285F4'
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    type: 'copilot',
    description: 'Code generation and development assistance',
    strengths: ['Code completion', 'Debugging', 'Documentation', 'Testing'],
    costPerToken: 0.002,
    availability: 'paid',
    icon: '🚀',
    color: '#24292E'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    type: 'deepseek',
    description: 'Advanced reasoning and technical problem-solving',
    strengths: ['Mathematical reasoning', 'Technical analysis', 'System design', 'Optimization'],
    costPerToken: 0.0005,
    availability: 'free',
    icon: '🔍',
    color: '#1FE0C4'
  },
  {
    id: 'gpt4',
    name: 'GPT-4',
    type: 'gpt4',
    description: 'General-purpose AI with broad knowledge',
    strengths: ['General knowledge', 'Writing', 'Analysis', 'Summarization'],
    costPerToken: 0.003,
    availability: 'paid',
    icon: '🌟',
    color: '#00A67E'
  }
];

// Predefined badges
export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'prompt_conductor',
    name: 'Prompt Conductor',
    description: 'Orchestrated 10 multi-agent workflows successfully',
    icon: '🎼',
    xpRequired: 500,
    category: 'mastery'
  },
  {
    id: 'api_alchemist',
    name: 'API Alchemist',
    description: 'Transformed raw AI responses into strategic gold',
    icon: '⚗️',
    xpRequired: 300,
    category: 'synthesis'
  },
  {
    id: 'task_decomposer',
    name: 'Task Decomposer',
    description: 'Broke down complex challenges into elegant subtasks',
    icon: '🧩',
    xpRequired: 200,
    category: 'decomposition'
  },
  {
    id: 'iteration_master',
    name: 'Iteration Master',
    description: 'Perfected prompts through 50+ iterations',
    icon: '🔄',
    xpRequired: 750,
    category: 'iteration'
  },
  {
    id: 'synthesis_sage',
    name: 'Synthesis Sage',
    description: 'Combined insights from multiple AIs into coherent strategies',
    icon: '🧙‍♂️',
    xpRequired: 400,
    category: 'synthesis'
  }
];

// In-memory storage (replace with database in production)
const workflowMissions = new Map<string, WorkflowMission>();
const userProgress = new Map<string, UserProgress>();

export class SandboxService {
  
  static createWorkflowMission(userId: string, title: string, description: string, challenge: string, category: string): WorkflowMission {
    const mission: WorkflowMission = {
      id: uuidv4(),
      title,
      description,
      challenge,
      difficulty: 'beginner',
      category: category as any,
      subtasks: [],
      totalXP: 0,
      completionStatus: 'not_started',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId
    };
    
    workflowMissions.set(mission.id, mission);
    return mission;
  }
  
  static addSubtaskToMission(missionId: string, subtask: Omit<WorkflowSubtask, 'id' | 'iterations' | 'xpEarned'>): WorkflowSubtask {
    const mission = workflowMissions.get(missionId);
    if (!mission) throw new Error('Mission not found');
    
    const newSubtask: WorkflowSubtask = {
      ...subtask,
      id: uuidv4(),
      iterations: [],
      xpEarned: 0
    };
    
    mission.subtasks.push(newSubtask);
    mission.updatedAt = new Date();
    
    return newSubtask;
  }
  
  static assignAdvisorToSubtask(missionId: string, subtaskId: string, advisorId: string): void {
    const mission = workflowMissions.get(missionId);
    if (!mission) throw new Error('Mission not found');
    
    const subtask = mission.subtasks.find(s => s.id === subtaskId);
    if (!subtask) throw new Error('Subtask not found');
    
    subtask.assignedAdvisor = advisorId;
    mission.updatedAt = new Date();
  }
  
  static addIterationToSubtask(
    missionId: string, 
    subtaskId: string, 
    promptUsed: string, 
    advisorResponse: string,
    userAnnotation?: string
  ): SubtaskIteration {
    const mission = workflowMissions.get(missionId);
    if (!mission) throw new Error('Mission not found');
    
    const subtask = mission.subtasks.find(s => s.id === subtaskId);
    if (!subtask) throw new Error('Subtask not found');
    
    const iteration: SubtaskIteration = {
      id: uuidv4(),
      iterationNumber: subtask.iterations.length + 1,
      promptUsed,
      advisorResponse,
      userAnnotation,
      timestamp: new Date(),
      xpAwarded: this.calculateIterationXP(subtask.iterations.length + 1, userAnnotation)
    };
    
    subtask.iterations.push(iteration);
    subtask.xpEarned += iteration.xpAwarded;
    mission.totalXP += iteration.xpAwarded;
    
    // Update user progress
    this.updateUserProgress(mission.userId, iteration.xpAwarded);
    
    return iteration;
  }
  
  static getUserProgress(userId: string): UserProgress {
    if (!userProgress.has(userId)) {
      userProgress.set(userId, {
        userId,
        totalXP: 0,
        level: 1,
        badges: [],
        completedMissions: [],
        activeWorkflows: [],
        streaks: {
          dailyPrompting: 0,
          weeklyCompletion: 0
        }
      });
    }
    
    return userProgress.get(userId)!;
  }
  
  static updateUserProgress(userId: string, xpGained: number): void {
    const progress = this.getUserProgress(userId);
    progress.totalXP += xpGained;
    
    // Level calculation
    const newLevel = Math.floor(progress.totalXP / 100) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
      // Level up bonus
      progress.totalXP += 25;
    }
    
    // Check for new badges
    this.checkBadgeEligibility(progress);
  }
  
  static checkBadgeEligibility(progress: UserProgress): void {
    const earnedBadgeIds = progress.badges.map(b => b.id);
    
    AVAILABLE_BADGES.forEach(badge => {
      if (!earnedBadgeIds.includes(badge.id) && progress.totalXP >= badge.xpRequired) {
        progress.badges.push({
          ...badge,
          earnedAt: new Date()
        });
      }
    });
  }
  
  static calculateIterationXP(iterationNumber: number, hasAnnotation?: string): number {
    let baseXP = 10;
    
    // Bonus for iterations (encourages refinement)
    if (iterationNumber > 1) {
      baseXP += 5;
    }
    
    // Bonus for thoughtful annotation
    if (hasAnnotation && hasAnnotation.length > 20) {
      baseXP += 15;
    }
    
    return baseXP;
  }
  
  static getMissionById(missionId: string): WorkflowMission | null {
    return workflowMissions.get(missionId) || null;
  }
  
  static getUserMissions(userId: string): WorkflowMission[] {
    return Array.from(workflowMissions.values()).filter(m => m.userId === userId);
  }
  
  static getAvailableAdvisors(): AIAdvisor[] {
    return DEFAULT_AI_ADVISORS;
  }
  
  static getAvailableBadges(): Badge[] {
    return AVAILABLE_BADGES;
  }
}