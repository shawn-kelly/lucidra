"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandboxService = exports.AVAILABLE_BADGES = exports.DEFAULT_AI_ADVISORS = void 0;
const uuid_1 = require("uuid");
// Default AI Advisors
exports.DEFAULT_AI_ADVISORS = [
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
exports.AVAILABLE_BADGES = [
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
const workflowMissions = new Map();
const userProgress = new Map();
class SandboxService {
    static createWorkflowMission(userId, title, description, challenge, category) {
        const mission = {
            id: (0, uuid_1.v4)(),
            title,
            description,
            challenge,
            difficulty: 'beginner',
            category: category,
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
    static addSubtaskToMission(missionId, subtask) {
        const mission = workflowMissions.get(missionId);
        if (!mission)
            throw new Error('Mission not found');
        const newSubtask = {
            ...subtask,
            id: (0, uuid_1.v4)(),
            iterations: [],
            xpEarned: 0
        };
        mission.subtasks.push(newSubtask);
        mission.updatedAt = new Date();
        return newSubtask;
    }
    static assignAdvisorToSubtask(missionId, subtaskId, advisorId) {
        const mission = workflowMissions.get(missionId);
        if (!mission)
            throw new Error('Mission not found');
        const subtask = mission.subtasks.find(s => s.id === subtaskId);
        if (!subtask)
            throw new Error('Subtask not found');
        subtask.assignedAdvisor = advisorId;
        mission.updatedAt = new Date();
    }
    static addIterationToSubtask(missionId, subtaskId, promptUsed, advisorResponse, userAnnotation) {
        const mission = workflowMissions.get(missionId);
        if (!mission)
            throw new Error('Mission not found');
        const subtask = mission.subtasks.find(s => s.id === subtaskId);
        if (!subtask)
            throw new Error('Subtask not found');
        const iteration = {
            id: (0, uuid_1.v4)(),
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
    static getUserProgress(userId) {
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
        return userProgress.get(userId);
    }
    static updateUserProgress(userId, xpGained) {
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
    static checkBadgeEligibility(progress) {
        const earnedBadgeIds = progress.badges.map(b => b.id);
        exports.AVAILABLE_BADGES.forEach(badge => {
            if (!earnedBadgeIds.includes(badge.id) && progress.totalXP >= badge.xpRequired) {
                progress.badges.push({
                    ...badge,
                    earnedAt: new Date()
                });
            }
        });
    }
    static calculateIterationXP(iterationNumber, hasAnnotation) {
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
    static getMissionById(missionId) {
        return workflowMissions.get(missionId) || null;
    }
    static getUserMissions(userId) {
        return Array.from(workflowMissions.values()).filter(m => m.userId === userId);
    }
    static getAvailableAdvisors() {
        return exports.DEFAULT_AI_ADVISORS;
    }
    static getAvailableBadges() {
        return exports.AVAILABLE_BADGES;
    }
}
exports.SandboxService = SandboxService;
//# sourceMappingURL=sandbox.service.js.map