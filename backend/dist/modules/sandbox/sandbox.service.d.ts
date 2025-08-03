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
export declare const DEFAULT_AI_ADVISORS: AIAdvisor[];
export declare const AVAILABLE_BADGES: Badge[];
export declare class SandboxService {
    static createWorkflowMission(userId: string, title: string, description: string, challenge: string, category: string): WorkflowMission;
    static addSubtaskToMission(missionId: string, subtask: Omit<WorkflowSubtask, 'id' | 'iterations' | 'xpEarned'>): WorkflowSubtask;
    static assignAdvisorToSubtask(missionId: string, subtaskId: string, advisorId: string): void;
    static addIterationToSubtask(missionId: string, subtaskId: string, promptUsed: string, advisorResponse: string, userAnnotation?: string): SubtaskIteration;
    static getUserProgress(userId: string): UserProgress;
    static updateUserProgress(userId: string, xpGained: number): void;
    static checkBadgeEligibility(progress: UserProgress): void;
    static calculateIterationXP(iterationNumber: number, hasAnnotation?: string): number;
    static getMissionById(missionId: string): WorkflowMission | null;
    static getUserMissions(userId: string): WorkflowMission[];
    static getAvailableAdvisors(): AIAdvisor[];
    static getAvailableBadges(): Badge[];
}
//# sourceMappingURL=sandbox.service.d.ts.map