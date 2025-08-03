"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureSession = exports.AIUsageTracker = exports.USAGE_LIMITS = void 0;
exports.USAGE_LIMITS = {
    free: {
        maxTokens: 1000,
        maxCalls: 5
    },
    basic: {
        maxTokens: 10000,
        maxCalls: 50
    },
    premium: {
        maxTokens: 100000,
        maxCalls: 500
    }
};
// In-memory session storage (in production, use Redis or database)
const sessionStore = new Map();
class AIUsageTracker {
    static generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    static createSession(sessionId, plan = 'free') {
        const session = {
            sessionId,
            tokensUsed: 0,
            aiCallsCount: 0,
            isAiEnabled: false,
            userOptedIn: false,
            createdAt: new Date(),
            lastUsedAt: new Date(),
            plan
        };
        sessionStore.set(sessionId, session);
        return session;
    }
    static getSession(sessionId) {
        return sessionStore.get(sessionId) || null;
    }
    static optInToAI(sessionId) {
        const session = sessionStore.get(sessionId);
        if (!session)
            return false;
        session.userOptedIn = true;
        session.isAiEnabled = true;
        session.lastUsedAt = new Date();
        return true;
    }
    static optOutOfAI(sessionId) {
        const session = sessionStore.get(sessionId);
        if (!session)
            return false;
        session.userOptedIn = false;
        session.isAiEnabled = false;
        session.lastUsedAt = new Date();
        return true;
    }
    static canUseAI(sessionId) {
        const session = sessionStore.get(sessionId);
        if (!session) {
            return { canUse: false, reason: 'Session not found', usage: null };
        }
        if (!session.userOptedIn) {
            return { canUse: false, reason: 'User has not opted in to AI', usage: this.getUsageStats(sessionId) };
        }
        const limits = exports.USAGE_LIMITS[session.plan];
        if (session.tokensUsed >= limits.maxTokens) {
            session.isAiEnabled = false;
            return {
                canUse: false,
                reason: `Token limit exceeded (${limits.maxTokens})`,
                usage: this.getUsageStats(sessionId)
            };
        }
        if (session.aiCallsCount >= limits.maxCalls) {
            session.isAiEnabled = false;
            return {
                canUse: false,
                reason: `Call limit exceeded (${limits.maxCalls})`,
                usage: this.getUsageStats(sessionId)
            };
        }
        return { canUse: true, usage: this.getUsageStats(sessionId) };
    }
    static recordUsage(sessionId, tokensUsed) {
        const session = sessionStore.get(sessionId);
        if (!session)
            return false;
        session.tokensUsed += tokensUsed;
        session.aiCallsCount += 1;
        session.lastUsedAt = new Date();
        // Auto-deactivate if limits exceeded
        const limits = exports.USAGE_LIMITS[session.plan];
        if (session.tokensUsed >= limits.maxTokens || session.aiCallsCount >= limits.maxCalls) {
            session.isAiEnabled = false;
        }
        return true;
    }
    static getUsageStats(sessionId) {
        const session = sessionStore.get(sessionId);
        if (!session)
            return null;
        const limits = exports.USAGE_LIMITS[session.plan];
        return {
            sessionId: session.sessionId,
            plan: session.plan,
            tokensUsed: session.tokensUsed,
            tokensRemaining: Math.max(0, limits.maxTokens - session.tokensUsed),
            tokensLimit: limits.maxTokens,
            callsUsed: session.aiCallsCount,
            callsRemaining: Math.max(0, limits.maxCalls - session.aiCallsCount),
            callsLimit: limits.maxCalls,
            isAiEnabled: session.isAiEnabled,
            userOptedIn: session.userOptedIn,
            tokenUsagePercentage: Math.min(100, (session.tokensUsed / limits.maxTokens) * 100),
            callUsagePercentage: Math.min(100, (session.aiCallsCount / limits.maxCalls) * 100),
            createdAt: session.createdAt,
            lastUsedAt: session.lastUsedAt
        };
    }
    static getAllSessions() {
        return Array.from(sessionStore.values());
    }
    static clearExpiredSessions(hoursOld = 24) {
        const cutoff = new Date(Date.now() - hoursOld * 60 * 60 * 1000);
        let cleared = 0;
        for (const [sessionId, session] of sessionStore.entries()) {
            if (session.lastUsedAt < cutoff) {
                sessionStore.delete(sessionId);
                cleared++;
            }
        }
        return cleared;
    }
}
exports.AIUsageTracker = AIUsageTracker;
// Middleware to ensure session exists
const ensureSession = (req, res, next) => {
    let sessionId = req.headers['x-session-id'];
    if (!sessionId) {
        sessionId = AIUsageTracker.generateSessionId();
        AIUsageTracker.createSession(sessionId);
    }
    else {
        const session = AIUsageTracker.getSession(sessionId);
        if (!session) {
            AIUsageTracker.createSession(sessionId);
        }
    }
    req.sessionId = sessionId;
    res.setHeader('X-Session-Id', sessionId);
    next();
};
exports.ensureSession = ensureSession;
//# sourceMappingURL=aiUsageTracker.js.map