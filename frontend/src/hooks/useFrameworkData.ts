import { useState, useEffect, useCallback } from 'react';

// Global Framework Data Types
export interface BlueOceanData {
  humannessCheck: {
    currentStrategy: string;
    targetCustomers: string;
    valueProposition: string;
    marketPosition: 'red_ocean' | 'blue_ocean' | 'transitional';
    humanFactors: {
      emotionalConnection: number;
      userExperience: number;
      accessibility: number;
      socialImpact: number;
    };
  };
  sixPathsAnalysis: {
    alternativeIndustries: string[];
    strategicGroups: string[];
    buyerGroups: string[];
    complementaryProducts: string[];
    functionalEmotional: string;
    timeEvolution: string;
    insights: string[];
    opportunities: string[];
    completedAt?: string;
  };
  buyerUtilityMap: {
    stages: Array<{
      name: string;
      productivity: number;
      simplicity: number;
      convenience: number;
      risk: number;
      funAndImage: number;
      environmental: number;
    }>;
    utilityBlocks: string[];
    innovationOpportunities: string[];
    completedAt?: string;
  };
}

export interface MarketingData {
  targetSegments: string[];
  campaigns: Array<{
    id: string;
    name: string;
    blueOceanSource?: string;
    targetBuyerGroup?: string;
    emotionalAppeal?: boolean;
    messaging: string;
    status: 'draft' | 'active' | 'completed';
  }>;
  generatedFromBlueOcean: string[];
}

export interface HRData {
  strategicRoles: Array<{
    id: string;
    title: string;
    blueOceanSource?: string;
    requiredCapabilities: string[];
    emotionalBrandingSkills?: boolean;
    status: 'planning' | 'recruiting' | 'filled';
  }>;
  trainingPrograms: string[];
  generatedFromBlueOcean: string[];
}

export interface ProcessData {
  improvements: Array<{
    id: string;
    name: string;
    blueOceanSource?: string;
    utilityBlockSource?: string;
    description: string;
    impact: string;
    status: 'identified' | 'in_progress' | 'completed';
  }>;
  generatedFromBlueOcean: string[];
}

export interface FrameworkInsight {
  id: string;
  sourceFramework: 'blue_ocean' | 'marketing' | 'hr' | 'process';
  sourceData: any;
  targetFrameworks: string[];
  title: string;
  description: string;
  recommendations: string[];
  autoApplied: boolean;
  createdAt: string;
  appliedResults: Array<{
    framework: string;
    action: string;
    outcome: string;
    timestamp: string;
  }>;
}

interface FrameworkState {
  blueOcean: BlueOceanData;
  marketing: MarketingData;
  hr: HRData;
  process: ProcessData;
  insights: FrameworkInsight[];
  lastUpdated: string;
}

// Default empty state
const getDefaultState = (): FrameworkState => ({
  blueOcean: {
    humannessCheck: {
      currentStrategy: '',
      targetCustomers: '',
      valueProposition: '',
      marketPosition: 'red_ocean',
      humanFactors: {
        emotionalConnection: 5,
        userExperience: 5,
        accessibility: 5,
        socialImpact: 5
      }
    },
    sixPathsAnalysis: {
      alternativeIndustries: [],
      strategicGroups: [],
      buyerGroups: [],
      complementaryProducts: [],
      functionalEmotional: '',
      timeEvolution: '',
      insights: [],
      opportunities: []
    },
    buyerUtilityMap: {
      stages: [
        { name: 'Purchase', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
        { name: 'Delivery', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
        { name: 'Use', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
        { name: 'Supplements', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
        { name: 'Maintenance', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
        { name: 'Disposal', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 }
      ],
      utilityBlocks: [],
      innovationOpportunities: []
    }
  },
  marketing: {
    targetSegments: [],
    campaigns: [],
    generatedFromBlueOcean: []
  },
  hr: {
    strategicRoles: [],
    trainingPrograms: [],
    generatedFromBlueOcean: []
  },
  process: {
    improvements: [],
    generatedFromBlueOcean: []
  },
  insights: [],
  lastUpdated: new Date().toISOString()
});

export const useFrameworkData = () => {
  const [frameworkState, setFrameworkState] = useState<FrameworkState>(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('lucidra_framework_data');
    return saved ? JSON.parse(saved) : getDefaultState();
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('lucidra_framework_data', JSON.stringify(frameworkState));
  }, [frameworkState]);

  // Update Blue Ocean data and trigger cross-framework updates
  const updateBlueOceanData = useCallback((updates: Partial<BlueOceanData>) => {
    setFrameworkState(prev => {
      const newBlueOcean = { ...prev.blueOcean, ...updates };
      const newState = {
        ...prev,
        blueOcean: newBlueOcean,
        lastUpdated: new Date().toISOString()
      };

      // Generate cross-framework insights
      const insights = generateCrossFrameworkInsights(newBlueOcean, prev);
      
      return {
        ...newState,
        insights: [...prev.insights, ...insights]
      };
    });
  }, []);

  // Generate insights when Blue Ocean data changes
  const generateCrossFrameworkInsights = (blueOceanData: BlueOceanData, prevState: FrameworkState): FrameworkInsight[] => {
    const insights: FrameworkInsight[] = [];

    // Six Paths Analysis insights
    if (blueOceanData.sixPathsAnalysis.insights.length > 0) {
      // Marketing insights
      if (blueOceanData.sixPathsAnalysis.buyerGroups.length > 0) {
        insights.push({
          id: `insight_${Date.now()}_marketing`,
          sourceFramework: 'blue_ocean',
          sourceData: blueOceanData.sixPathsAnalysis,
          targetFrameworks: ['marketing'],
          title: 'New Target Segments Identified',
          description: `Six Paths Analysis identified ${blueOceanData.sixPathsAnalysis.buyerGroups.length} distinct buyer groups for targeted campaigns`,
          recommendations: [
            `Create specific campaigns for ${blueOceanData.sixPathsAnalysis.buyerGroups[0]}`,
            'Develop messaging that addresses each buyer group\'s unique needs',
            'Test different value propositions across buyer segments'
          ],
          autoApplied: false,
          createdAt: new Date().toISOString(),
          appliedResults: []
        });
      }

      // HR insights
      if (blueOceanData.sixPathsAnalysis.functionalEmotional === 'emotional' || 
          blueOceanData.sixPathsAnalysis.opportunities.some(op => op.includes('emotional'))) {
        insights.push({
          id: `insight_${Date.now()}_hr`,
          sourceFramework: 'blue_ocean',
          sourceData: blueOceanData.sixPathsAnalysis,
          targetFrameworks: ['hr'],
          title: 'Emotional Branding Capabilities Required',
          description: 'Strategic shift toward emotional appeal requires new marketing and design capabilities',
          recommendations: [
            'Hire marketing professionals with emotional branding experience',
            'Develop training programs for emotional customer engagement',
            'Recruit UX designers with lifestyle-focused portfolios'
          ],
          autoApplied: false,
          createdAt: new Date().toISOString(),
          appliedResults: []
        });
      }
    }

    // Buyer Utility Map insights
    if (blueOceanData.buyerUtilityMap.utilityBlocks.length > 0) {
      insights.push({
        id: `insight_${Date.now()}_process`,
        sourceFramework: 'blue_ocean',
        sourceData: blueOceanData.buyerUtilityMap,
        targetFrameworks: ['process'],
        title: 'Process Improvements From Utility Blocks',
        description: `Buyer Utility Map identified ${blueOceanData.buyerUtilityMap.utilityBlocks.length} areas hindering customer value`,
        recommendations: blueOceanData.buyerUtilityMap.utilityBlocks.map(block => 
          `Address utility block: ${block}`
        ),
        autoApplied: false,
        createdAt: new Date().toISOString(),
        appliedResults: []
      });
    }

    return insights;
  };

  // Apply insight to target framework
  const applyInsightToFramework = useCallback((insightId: string, targetFramework: string) => {
    setFrameworkState(prev => {
      const insight = prev.insights.find(i => i.id === insightId);
      if (!insight) return prev;

      const newState = { ...prev };

      // Apply to Marketing
      if (targetFramework === 'marketing' && insight.sourceFramework === 'blue_ocean') {
        const blueOceanData = insight.sourceData;
        if (blueOceanData.buyerGroups) {
          blueOceanData.buyerGroups.forEach((buyerGroup: string) => {
            newState.marketing.campaigns.push({
              id: `campaign_${Date.now()}_${buyerGroup}`,
              name: `${buyerGroup} Targeted Campaign`,
              blueOceanSource: insight.id,
              targetBuyerGroup: buyerGroup,
              emotionalAppeal: blueOceanData.functionalEmotional === 'emotional',
              messaging: `Specialized messaging for ${buyerGroup} based on Blue Ocean analysis`,
              status: 'draft'
            });
          });
          newState.marketing.generatedFromBlueOcean.push(insight.id);
        }
      }

      // Apply to HR
      if (targetFramework === 'hr' && insight.sourceFramework === 'blue_ocean') {
        newState.hr.strategicRoles.push({
          id: `role_${Date.now()}`,
          title: 'Emotional Branding Specialist',
          blueOceanSource: insight.id,
          requiredCapabilities: insight.recommendations,
          emotionalBrandingSkills: true,
          status: 'planning'
        });
        newState.hr.generatedFromBlueOcean.push(insight.id);
      }

      // Apply to Process
      if (targetFramework === 'process' && insight.sourceFramework === 'blue_ocean') {
        insight.recommendations.forEach((rec, index) => {
          newState.process.improvements.push({
            id: `improvement_${Date.now()}_${index}`,
            name: `Utility Enhancement ${index + 1}`,
            blueOceanSource: insight.id,
            utilityBlockSource: rec,
            description: rec,
            impact: 'High - Direct customer value improvement',
            status: 'identified'
          });
        });
        newState.process.generatedFromBlueOcean.push(insight.id);
      }

      // Mark insight as applied
      const updatedInsights = prev.insights.map(i => 
        i.id === insightId 
          ? {
              ...i,
              autoApplied: true,
              appliedResults: [
                ...i.appliedResults,
                {
                  framework: targetFramework,
                  action: `Applied insights to ${targetFramework}`,
                  outcome: `Generated new ${targetFramework} strategies and actions`,
                  timestamp: new Date().toISOString()
                }
              ]
            }
          : i
      );

      return {
        ...newState,
        insights: updatedInsights,
        lastUpdated: new Date().toISOString()
      };
    });
  }, []);

  // Save current session
  const saveSession = useCallback((sessionName: string) => {
    const sessions = JSON.parse(localStorage.getItem('lucidra_sessions') || '{}');
    sessions[sessionName] = {
      data: frameworkState,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('lucidra_sessions', JSON.stringify(sessions));
  }, [frameworkState]);

  // Load saved session
  const loadSession = useCallback((sessionName: string) => {
    const sessions = JSON.parse(localStorage.getItem('lucidra_sessions') || '{}');
    if (sessions[sessionName]) {
      setFrameworkState(sessions[sessionName].data);
      return true;
    }
    return false;
  }, []);

  // Get all saved sessions
  const getSavedSessions = useCallback(() => {
    const sessions = JSON.parse(localStorage.getItem('lucidra_sessions') || '{}');
    return Object.keys(sessions).map(name => ({
      name,
      savedAt: sessions[name].savedAt,
      hasBlueOceanData: sessions[name].data.blueOcean.sixPathsAnalysis.insights.length > 0
    }));
  }, []);

  // Clear all data
  const clearAllData = useCallback(() => {
    setFrameworkState(getDefaultState());
    localStorage.removeItem('lucidra_framework_data');
  }, []);

  return {
    // Data
    frameworkState,
    
    // Blue Ocean specific
    blueOceanData: frameworkState.blueOcean,
    updateBlueOceanData,
    
    // Cross-framework insights
    insights: frameworkState.insights,
    applyInsightToFramework,
    
    // Session management
    saveSession,
    loadSession,
    getSavedSessions,
    clearAllData,
    
    // Stats
    lastUpdated: frameworkState.lastUpdated,
    hasData: frameworkState.blueOcean.sixPathsAnalysis.insights.length > 0 || frameworkState.insights.length > 0
  };
};