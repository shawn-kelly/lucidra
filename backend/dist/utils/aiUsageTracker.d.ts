import { Request, Response } from 'express';
export interface UsageSession {
    sessionId: string;
    tokensUsed: number;
    aiCallsCount: number;
    isAiEnabled: boolean;
    userOptedIn: boolean;
    createdAt: Date;
    lastUsedAt: Date;
    plan: 'free' | 'basic' | 'premium';
}
export interface UsageLimits {
    free: {
        maxTokens: number;
        maxCalls: number;
    };
    basic: {
        maxTokens: number;
        maxCalls: number;
    };
    premium: {
        maxTokens: number;
        maxCalls: number;
    };
}
export declare const USAGE_LIMITS: UsageLimits;
export declare class AIUsageTracker {
    static generateSessionId(): string;
    static createSession(sessionId: string, plan?: 'free' | 'basic' | 'premium'): UsageSession;
    static getSession(sessionId: string): UsageSession | null;
    static optInToAI(sessionId: string): boolean;
    static optOutOfAI(sessionId: string): boolean;
    static canUseAI(sessionId: string): {
        canUse: boolean;
        reason?: string;
        usage: any;
    };
    static recordUsage(sessionId: string, tokensUsed: number): boolean;
    static getUsageStats(sessionId: string): any;
    static getAllSessions(): UsageSession[];
    static clearExpiredSessions(hoursOld?: number): number;
}
export declare const ensureSession: (req: Request, res: Response, next: any) => void;
declare global {
    namespace Express {
        interface Request {
            sessionId?: string;
        }
    }
}
//# sourceMappingURL=aiUsageTracker.d.ts.map