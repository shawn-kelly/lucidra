"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackCoach = void 0;
class FallbackCoach {
    static analyzeScenario(scenario) {
        const lowerScenario = scenario.toLowerCase();
        // Determine primary category
        const categories = Object.keys(this.BUSINESS_KEYWORDS);
        const categoryScores = categories.map(category => {
            const keywords = this.BUSINESS_KEYWORDS[category];
            const matches = keywords.filter(keyword => lowerScenario.includes(keyword));
            return { category, score: matches.length, matches };
        });
        // Sort by score and get primary category
        categoryScores.sort((a, b) => b.score - a.score);
        const primaryCategory = categoryScores[0].category;
        const confidence = categoryScores[0].score > 2 ? 'high' :
            categoryScores[0].score > 0 ? 'medium' : 'low';
        // Get template for primary category
        const template = this.SCENARIO_TEMPLATES[primaryCategory];
        // Generate personalized next steps
        const nextSteps = this.generateNextSteps(scenario, primaryCategory);
        // Create customized analysis
        const customAnalysis = this.customizeAnalysis(scenario, template.analysis, categoryScores[0].matches);
        return {
            analysis: customAnalysis,
            recommendations: template.recommendations,
            riskFactors: template.riskFactors,
            opportunities: template.opportunities,
            nextSteps,
            isFallback: true,
            confidence
        };
    }
    static customizeAnalysis(scenario, baseAnalysis, matches) {
        const scenarioLength = scenario.length;
        let analysis = baseAnalysis;
        if (matches.length > 0) {
            analysis += ` Key areas identified in your scenario include: ${matches.join(', ')}.`;
        }
        if (scenarioLength > 200) {
            analysis += " Given the complexity of your scenario, consider breaking it down into smaller, manageable components for better analysis.";
        }
        else if (scenarioLength < 50) {
            analysis += " Consider providing more details about your scenario to enable more comprehensive analysis.";
        }
        return analysis;
    }
    static generateNextSteps(scenario, category) {
        const baseSteps = [
            "Document your current situation and desired outcomes",
            "Identify key stakeholders who should be involved in decision-making",
            "Set clear timelines and milestones for implementation"
        ];
        const categorySpecificSteps = {
            financial: [
                "Review your financial statements and cash flow projections",
                "Consult with financial advisors or accountants if needed"
            ],
            market: [
                "Conduct market research to validate your assumptions",
                "Gather customer feedback and competitive intelligence"
            ],
            operational: [
                "Map out current processes and identify bottlenecks",
                "Assess team capabilities and training needs"
            ],
            strategic: [
                "Align the scenario with your organization's mission and values",
                "Consider long-term implications and strategic fit"
            ],
            risk: [
                "Identify potential risks and their likelihood/impact",
                "Develop contingency plans for high-risk scenarios"
            ]
        };
        const specific = categorySpecificSteps[category] || [];
        return [...baseSteps, ...specific];
    }
    static getCoachingTips() {
        return [
            "Break complex scenarios into smaller, manageable components",
            "Always consider multiple perspectives and stakeholder viewpoints",
            "Focus on actionable insights rather than theoretical analysis",
            "Regularly review and adjust your strategies based on outcomes",
            "Document lessons learned for future scenario planning",
            "Consider both short-term and long-term implications",
            "Involve subject matter experts when dealing with specialized areas",
            "Use data and evidence to support your decision-making process"
        ];
    }
    static getUpgradeMessage(plan) {
        const messages = {
            free: "Unlock Lucidra's full strategic intelligence with AI-powered insights that transform organizational challenges into competitive advantages. Experience advanced analysis that goes beyond coaching logic to deliver personalized strategic recommendations.",
            basic: "Elevate to Premium for unlimited strategic intelligence and advanced orchestration tools. Access the complete Lucidra ecosystem where AI-powered analysis meets comprehensive strategic planning capabilities.",
            premium: "You're maximizing Lucidra's strategic intelligence! Our Premium tier provides unlimited access to AI-powered insights, advanced strategic tools, and priority support for complex organizational challenges."
        };
        return messages[plan] || messages.free;
    }
}
exports.FallbackCoach = FallbackCoach;
FallbackCoach.BUSINESS_KEYWORDS = {
    financial: ['revenue', 'profit', 'cost', 'budget', 'expense', 'investment', 'roi', 'cash flow', 'funding'],
    market: ['competitor', 'market share', 'customer', 'demand', 'pricing', 'product', 'service', 'brand'],
    operational: ['process', 'efficiency', 'automation', 'workflow', 'team', 'hiring', 'training', 'technology'],
    strategic: ['growth', 'expansion', 'partnership', 'acquisition', 'innovation', 'disruption', 'transformation'],
    risk: ['compliance', 'regulation', 'security', 'liability', 'reputation', 'crisis', 'contingency']
};
FallbackCoach.SCENARIO_TEMPLATES = {
    financial: {
        analysis: "Your scenario presents strategic financial considerations that directly impact organizational sustainability and growth potential. Through Lucidra's framework, we identify key financial levers that transform challenges into strategic opportunities.",
        recommendations: [
            "Deploy comprehensive financial modeling to reveal cash flow patterns and strategic timing opportunities",
            "Orchestrate budget optimization initiatives that align resources with strategic priorities",
            "Architect revenue diversification strategies that reduce dependency risks while expanding market reach",
            "Establish intelligent financial KPIs that provide predictive insights for strategic decision-making"
        ],
        riskFactors: [
            "Potential budget overruns or unexpected expenses",
            "Cash flow disruptions during implementation",
            "Market volatility affecting financial projections"
        ],
        opportunities: [
            "Improved financial efficiency and cost management",
            "New revenue generation possibilities",
            "Enhanced financial planning and forecasting capabilities"
        ]
    },
    market: {
        analysis: "Your scenario reveals critical market dynamics that shape competitive advantage and customer value creation. Lucidra's strategic lens transforms market complexity into clear positioning opportunities and actionable competitive intelligence.",
        recommendations: [
            "Execute intelligent market research that uncovers hidden customer needs and competitive blind spots",
            "Implement customer feedback orchestration systems that turn insights into strategic advantages",
            "Design differentiation strategies that create sustainable competitive moats through unique value propositions",
            "Deploy market trend monitoring systems that enable proactive strategic repositioning"
        ],
        riskFactors: [
            "Increased competition and market saturation",
            "Changing customer preferences and demands",
            "Potential loss of market share to competitors"
        ],
        opportunities: [
            "Market expansion and new customer acquisition",
            "Innovation opportunities to meet unmet needs",
            "Strategic partnerships and collaboration possibilities"
        ]
    },
    operational: {
        analysis: "This scenario involves operational aspects that could impact your organization's efficiency and productivity.",
        recommendations: [
            "Evaluate current processes and identify improvement opportunities",
            "Invest in training and development for your team",
            "Consider technology solutions to enhance operational efficiency",
            "Establish clear performance metrics and monitoring systems"
        ],
        riskFactors: [
            "Operational disruptions during transition periods",
            "Resistance to change from team members",
            "Technology integration challenges and learning curves"
        ],
        opportunities: [
            "Improved operational efficiency and productivity",
            "Enhanced team capabilities and skill development",
            "Streamlined processes and reduced operational costs"
        ]
    },
    strategic: {
        analysis: "Your scenario encompasses strategic considerations that will fundamentally shape organizational trajectory and competitive positioning. Through Lucidra's strategic orchestration framework, complex strategic challenges become clear pathways to sustainable advantage.",
        recommendations: [
            "Architect comprehensive strategic frameworks that align vision, capabilities, and market opportunities",
            "Orchestrate stakeholder engagement processes that build strategic consensus and commitment",
            "Design implementation roadmaps with intelligent milestones that adapt to changing conditions",
            "Establish strategic review cycles that enable continuous strategic optimization and learning"
        ],
        riskFactors: [
            "Strategic misalignment with organizational capabilities",
            "Resource constraints limiting strategic execution",
            "Market changes rendering strategies obsolete"
        ],
        opportunities: [
            "Significant growth and expansion possibilities",
            "Competitive advantages through strategic positioning",
            "Long-term sustainability and market leadership"
        ]
    },
    risk: {
        analysis: "This scenario involves risk management considerations that require careful planning and mitigation strategies.",
        recommendations: [
            "Conduct thorough risk assessment and impact analysis",
            "Develop comprehensive risk mitigation and contingency plans",
            "Establish monitoring systems for early risk detection",
            "Create crisis management protocols and response procedures"
        ],
        riskFactors: [
            "Regulatory compliance challenges and penalties",
            "Reputation damage from poor risk management",
            "Operational disruptions from unforeseen events"
        ],
        opportunities: [
            "Enhanced organizational resilience and preparedness",
            "Improved risk management capabilities",
            "Competitive advantage through superior risk management"
        ]
    }
};
//# sourceMappingURL=fallbackCoach.js.map