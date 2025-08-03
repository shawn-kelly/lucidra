export interface CoachingResponse {
    analysis: string;
    recommendations: string[];
    riskFactors: string[];
    opportunities: string[];
    nextSteps: string[];
    isFallback: boolean;
    confidence: 'low' | 'medium' | 'high';
}
export declare class FallbackCoach {
    private static readonly BUSINESS_KEYWORDS;
    private static readonly SCENARIO_TEMPLATES;
    static analyzeScenario(scenario: string): CoachingResponse;
    private static customizeAnalysis;
    private static generateNextSteps;
    static getCoachingTips(): string[];
    static getUpgradeMessage(plan: string): string;
}
//# sourceMappingURL=fallbackCoach.d.ts.map