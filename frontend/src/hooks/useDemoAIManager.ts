import { useState, useEffect, useCallback } from 'react';
import { AIUsage, AIAnalysisResult, AIManagerState, AIManagerActions } from './useAIManager';

// Demo data for GitHub Pages
const DEMO_USAGE: AIUsage = {
  sessionId: 'demo_session_12345',
  plan: 'free',
  tokensUsed: 450,
  tokensRemaining: 550,
  tokensLimit: 1000,
  callsUsed: 2,
  callsRemaining: 3,
  callsLimit: 5,
  isAiEnabled: false,
  userOptedIn: false,
  tokenUsagePercentage: 45,
  callUsagePercentage: 40,
  createdAt: new Date().toISOString(),
  lastUsedAt: new Date().toISOString()
};

const DEMO_RESPONSES = [
  {
    scenario: "market disruption",
    analysis: `**Strategic Analysis: Market Disruption Scenario**

This scenario involves significant market dynamics that could reshape your competitive landscape and business strategy.

**Key Strategic Recommendations:**

1. **Competitive Intelligence Enhancement**
   - Implement robust market monitoring systems
   - Establish early warning indicators for disruption signals
   - Develop rapid response protocols for competitive threats

2. **Innovation Acceleration**
   - Increase R&D investment by 15-20% to stay ahead of disruption
   - Create innovation labs or partnerships with startups
   - Foster a culture of continuous experimentation

3. **Customer Relationship Fortification**
   - Deepen customer engagement through personalized experiences
   - Implement loyalty programs and value-added services
   - Establish direct feedback channels for market insights

**Risk Assessment:**
- **High Risk**: Potential 20-40% market share erosion if unprepared
- **Medium Risk**: Revenue volatility during transition periods
- **Low Risk**: Short-term operational adjustments needed

**Strategic Opportunities:**
- First-mover advantage in emerging market segments
- Partnership opportunities with disruptive technologies
- Potential acquisition targets among struggling competitors

**Recommended Next Steps:**
1. Conduct comprehensive market disruption assessment within 30 days
2. Develop 3-5 scenario-based strategic response plans
3. Allocate 10% of budget to innovation and market positioning
4. Establish cross-functional disruption response team

*This analysis was generated using advanced business strategy frameworks and market analysis methodologies.*`
  },
  {
    scenario: "new technology",
    analysis: `**Technology Adoption Strategic Analysis**

Your scenario indicates a significant technology integration opportunity that could transform operational capabilities and competitive positioning.

**Strategic Implementation Framework:**

1. **Technology Assessment & Planning**
   - Comprehensive ROI analysis with 3-year projections
   - Risk assessment including technical, financial, and operational factors
   - Stakeholder impact analysis and change management planning

2. **Phased Implementation Strategy**
   - Pilot program with 20% of operations (Months 1-3)
   - Gradual rollout with continuous optimization (Months 4-8)
   - Full deployment with performance monitoring (Months 9-12)

3. **Organizational Readiness**
   - Skill gap analysis and training program development
   - Cultural change management initiatives
   - Technology infrastructure upgrades

**Business Impact Projections:**
- **Efficiency Gains**: 25-35% improvement in relevant processes
- **Cost Reduction**: 15-20% operational cost savings within 18 months
- **Revenue Opportunity**: 10-15% new revenue streams potential

**Critical Success Factors:**
- Executive sponsorship and clear communication
- Adequate training and support resources
- Flexible implementation timeline with built-in adjustments
- Strong vendor/partner relationships

**Risk Mitigation Strategies:**
- Comprehensive backup and rollback procedures
- Parallel system operation during transition
- External expert consultation for complex implementations

*Analysis based on technology adoption best practices and organizational change management principles.*`
  },
  {
    scenario: "financial",
    analysis: `**Financial Strategy Analysis**

This scenario involves critical financial considerations that require careful planning and strategic decision-making to optimize fiscal health and growth opportunities.

**Financial Strategic Recommendations:**

1. **Cash Flow Optimization**
   - Implement rolling 13-week cash flow forecasting
   - Negotiate extended payment terms with suppliers
   - Accelerate receivables collection processes
   - Establish emergency credit facilities

2. **Investment Prioritization**
   - Apply weighted scoring model for capital allocation
   - Focus on projects with <24-month payback periods
   - Diversify investment portfolio to reduce concentration risk
   - Consider lease vs. buy decisions for major expenditures

3. **Financial Risk Management**
   - Establish financial ratio monitoring dashboards
   - Implement currency hedging for international operations
   - Create contingency reserves (3-6 months operating expenses)
   - Regular stress testing of financial scenarios

**Key Performance Indicators:**
- Current Ratio: Target >1.5
- Debt-to-Equity: Maintain <0.6
- Operating Margin: Improve by 2-3 percentage points
- Return on Investment: Target >15% for new projects

**Strategic Opportunities:**
- Potential cost synergies through process optimization
- Revenue diversification reducing financial volatility
- Strategic partnerships to share financial risk
- Technology investments improving financial efficiency

**Action Plan:**
1. Complete comprehensive financial audit within 15 days
2. Develop scenario-based financial models
3. Establish monthly financial review processes
4. Create financial risk assessment framework

*Analysis based on corporate finance best practices and strategic financial management principles.*`
  }
];

export const useDemoAIManager = (): AIManagerState & AIManagerActions => {
  const [state, setState] = useState<AIManagerState>({
    usage: DEMO_USAGE,
    loading: false,
    error: null,
    canUseAI: false,
    aiStatus: 'Demo Mode',
    sessionId: 'demo_session_12345'
  });

  const refreshUsage = useCallback(async () => {
    // Simulate API delay
    setState(prev => ({ ...prev, loading: true }));
    setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        usage: { ...DEMO_USAGE },
        loading: false 
      }));
    }, 500);
  }, []);

  const optInToAI = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true }));
    
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUsage = { 
          ...DEMO_USAGE, 
          userOptedIn: true, 
          isAiEnabled: true 
        };
        setState(prev => ({
          ...prev,
          usage: updatedUsage,
          canUseAI: true,
          aiStatus: 'Demo Mode - AI Enabled',
          loading: false
        }));
        resolve(true);
      }, 1000);
    });
  }, []);

  const optOutOfAI = useCallback(async (): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true }));
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUsage = { 
          ...DEMO_USAGE, 
          userOptedIn: false, 
          isAiEnabled: false 
        };
        setState(prev => ({
          ...prev,
          usage: updatedUsage,
          canUseAI: false,
          aiStatus: 'Demo Mode - AI Disabled',
          loading: false
        }));
        resolve(true);
      }, 500);
    });
  }, []);

  const analyzeScenario = useCallback(async (scenario: string): Promise<AIAnalysisResult | null> => {
    setState(prev => ({ ...prev, loading: true }));
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find best matching demo response
        const lowerScenario = scenario.toLowerCase();
        let selectedResponse = DEMO_RESPONSES[0]; // default
        
        for (const response of DEMO_RESPONSES) {
          if (lowerScenario.includes(response.scenario)) {
            selectedResponse = response;
            break;
          }
        }

        const canUse = state.usage?.userOptedIn && state.usage?.isAiEnabled;
        const result: AIAnalysisResult = {
          scenario,
          ai_analysis: selectedResponse.analysis,
          usedAI: canUse,
          usage: { 
            ...DEMO_USAGE, 
            tokensUsed: DEMO_USAGE.tokensUsed + 50,
            callsUsed: DEMO_USAGE.callsUsed + 1,
            userOptedIn: state.usage?.userOptedIn || false,
            isAiEnabled: state.usage?.isAiEnabled || false
          },
          aiStatus: canUse ? 'Demo Mode - AI Used' : 'Demo Mode - Coaching Logic'
        };

        // Update usage
        setState(prev => ({
          ...prev,
          usage: result.usage,
          loading: false
        }));

        resolve(result);
      }, 2000); // Simulate realistic API response time
    });
  }, [state.usage]);

  const getCoachingTips = useCallback(async (): Promise<string[]> => {
    return [
      "Be specific about your scenario context and constraints",
      "Consider multiple stakeholder perspectives in your analysis",
      "Think about both immediate and long-term implications",
      "Include quantifiable metrics where possible",
      "Consider regulatory and compliance factors",
      "Evaluate resource requirements and availability",
      "Plan for change management and communication",
      "Document assumptions and risk factors"
    ];
  }, []);

  // Initialize demo data
  useEffect(() => {
    refreshUsage();
  }, [refreshUsage]);

  return {
    // State
    usage: state.usage,
    loading: state.loading,
    error: state.error,
    canUseAI: state.canUseAI,
    aiStatus: state.aiStatus,
    sessionId: state.sessionId,
    
    // Actions
    optInToAI,
    optOutOfAI,
    analyzeScenario,
    refreshUsage,
    getCoachingTips
  };
};