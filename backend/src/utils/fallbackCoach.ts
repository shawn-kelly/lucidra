export interface CoachingResponse {
  analysis: string;
  recommendations: string[];
  riskFactors: string[];
  opportunities: string[];
  nextSteps: string[];
  isFallback: boolean;
  confidence: 'low' | 'medium' | 'high';
}

export class FallbackCoach {
  
  private static readonly BUSINESS_KEYWORDS = {
    financial: ['revenue', 'profit', 'cost', 'budget', 'expense', 'investment', 'roi', 'cash flow', 'funding'],
    market: ['competitor', 'market share', 'customer', 'demand', 'pricing', 'product', 'service', 'brand'],
    operational: ['process', 'efficiency', 'automation', 'workflow', 'team', 'hiring', 'training', 'technology'],
    strategic: ['growth', 'expansion', 'partnership', 'acquisition', 'innovation', 'disruption', 'transformation'],
    risk: ['compliance', 'regulation', 'security', 'liability', 'reputation', 'crisis', 'contingency']
  };

  private static readonly SCENARIO_TEMPLATES = {
    financial: {
      analysis: "This scenario involves financial considerations that could impact your organization's fiscal health.",
      recommendations: [
        "Conduct a thorough financial analysis including cash flow projections",
        "Review budget allocations and identify potential cost savings",
        "Consider diversifying revenue streams to reduce financial risk",
        "Establish clear financial KPIs to track performance"
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
      analysis: "This scenario relates to market dynamics and competitive positioning that could affect your business strategy.",
      recommendations: [
        "Conduct comprehensive market research and competitive analysis",
        "Develop customer feedback mechanisms and satisfaction surveys",
        "Create differentiation strategies to stand out from competitors",
        "Monitor market trends and adjust strategies accordingly"
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
      analysis: "This scenario involves strategic decisions that could significantly impact your organization's future direction.",
      recommendations: [
        "Develop a comprehensive strategic plan with clear objectives",
        "Engage stakeholders in strategic planning discussions",
        "Create implementation timelines with measurable milestones",
        "Regularly review and adjust strategies based on outcomes"
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

  static analyzeScenario(scenario: string): CoachingResponse {
    const lowerScenario = scenario.toLowerCase();
    
    // Determine primary category
    const categories = Object.keys(this.BUSINESS_KEYWORDS) as Array<keyof typeof this.BUSINESS_KEYWORDS>;
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
    const template = this.SCENARIO_TEMPLATES[primaryCategory as keyof typeof this.SCENARIO_TEMPLATES];
    
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

  private static customizeAnalysis(scenario: string, baseAnalysis: string, matches: string[]): string {
    const scenarioLength = scenario.length;
    let analysis = baseAnalysis;
    
    if (matches.length > 0) {
      analysis += ` Key areas identified in your scenario include: ${matches.join(', ')}.`;
    }
    
    if (scenarioLength > 200) {
      analysis += " Given the complexity of your scenario, consider breaking it down into smaller, manageable components for better analysis.";
    } else if (scenarioLength < 50) {
      analysis += " Consider providing more details about your scenario to enable more comprehensive analysis.";
    }
    
    return analysis;
  }

  private static generateNextSteps(scenario: string, category: string): string[] {
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

    const specific = categorySpecificSteps[category as keyof typeof categorySpecificSteps] || [];
    return [...baseSteps, ...specific];
  }

  static getCoachingTips(): string[] {
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

  static getUpgradeMessage(plan: string): string {
    const messages = {
      free: "Upgrade to Basic plan for AI-powered insights and analysis. Get personalized recommendations from Claude AI.",
      basic: "Upgrade to Premium for unlimited AI analysis and advanced strategic planning tools.",
      premium: "You're on our Premium plan! Contact support if you need additional capacity."
    };
    
    return messages[plan as keyof typeof messages] || messages.free;
  }
}