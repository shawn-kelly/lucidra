import React, { useState } from 'react';

/**
 * StartupStageSelector - Component for selecting startup stage and displaying tailored modules
 * 
 * Features:
 * - Stage selection (Idea, MVP, Growth, Pivot)
 * - Dynamic module display based on selection
 * - Tailwind CSS styling
 * - Responsive design
 * 
 * @component
 */

// Type definitions
interface StageModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  xpReward: number;
}

interface StartupStage {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  modules: StageModule[];
}

// Stage configuration with tailored modules
const STARTUP_STAGES: StartupStage[] = [
  {
    id: 'idea',
    name: 'Idea',
    description: 'Explore and validate your business concept',
    icon: '💡',
    color: 'bg-yellow-500',
    modules: [
      {
        id: 'problem-validation',
        title: 'Problem Validation',
        description: 'Identify and validate the core problem you\'re solving',
        icon: '🔍',
        priority: 'high',
        estimatedTime: '2-3 hours',
        xpReward: 100
      },
      {
        id: 'market-research',
        title: 'Market Research',
        description: 'Research your target market and competitors',
        icon: '📊',
        priority: 'high',
        estimatedTime: '3-4 hours',
        xpReward: 150
      },
      {
        id: 'value-proposition',
        title: 'Value Proposition',
        description: 'Craft your unique value proposition',
        icon: '💎',
        priority: 'high',
        estimatedTime: '1-2 hours',
        xpReward: 100
      },
      {
        id: 'business-model',
        title: 'Business Model Canvas',
        description: 'Map out your business model structure',
        icon: '🎯',
        priority: 'medium',
        estimatedTime: '2-3 hours',
        xpReward: 200
      }
    ]
  },
  {
    id: 'mvp',
    name: 'MVP',
    description: 'Build and test your minimum viable product',
    icon: '🔧',
    color: 'bg-blue-500',
    modules: [
      {
        id: 'feature-prioritization',
        title: 'Feature Prioritization',
        description: 'Identify core features for your MVP',
        icon: '📋',
        priority: 'high',
        estimatedTime: '2-3 hours',
        xpReward: 150
      },
      {
        id: 'user-testing',
        title: 'User Testing Framework',
        description: 'Set up user testing and feedback collection',
        icon: '🧪',
        priority: 'high',
        estimatedTime: '3-4 hours',
        xpReward: 200
      },
      {
        id: 'metrics-tracking',
        title: 'Metrics & Analytics',
        description: 'Define and track key performance indicators',
        icon: '📈',
        priority: 'high',
        estimatedTime: '2-3 hours',
        xpReward: 150
      },
      {
        id: 'iteration-plan',
        title: 'Iteration Planning',
        description: 'Plan for product improvements based on feedback',
        icon: '🔄',
        priority: 'medium',
        estimatedTime: '1-2 hours',
        xpReward: 100
      }
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Scale your business and expand market reach',
    icon: '📈',
    color: 'bg-green-500',
    modules: [
      {
        id: 'growth-hacking',
        title: 'Growth Hacking',
        description: 'Implement scalable growth strategies',
        icon: '🚀',
        priority: 'high',
        estimatedTime: '3-4 hours',
        xpReward: 200
      },
      {
        id: 'team-scaling',
        title: 'Team Scaling',
        description: 'Build and manage your growing team',
        icon: '👥',
        priority: 'high',
        estimatedTime: '2-3 hours',
        xpReward: 150
      },
      {
        id: 'funding-strategy',
        title: 'Funding Strategy',
        description: 'Explore funding options and investor relations',
        icon: '💰',
        priority: 'medium',
        estimatedTime: '4-5 hours',
        xpReward: 300
      },
      {
        id: 'market-expansion',
        title: 'Market Expansion',
        description: 'Enter new markets and segments',
        icon: '🌍',
        priority: 'medium',
        estimatedTime: '3-4 hours',
        xpReward: 250
      }
    ]
  },
  {
    id: 'pivot',
    name: 'Pivot',
    description: 'Strategically change direction based on learnings',
    icon: '🔄',
    color: 'bg-purple-500',
    modules: [
      {
        id: 'pivot-analysis',
        title: 'Pivot Analysis',
        description: 'Analyze why pivot is needed and identify new direction',
        icon: '🔍',
        priority: 'high',
        estimatedTime: '3-4 hours',
        xpReward: 200
      },
      {
        id: 'market-repositioning',
        title: 'Market Repositioning',
        description: 'Reposition your offering for new target market',
        icon: '🎯',
        priority: 'high',
        estimatedTime: '2-3 hours',
        xpReward: 150
      },
      {
        id: 'stakeholder-communication',
        title: 'Stakeholder Communication',
        description: 'Communicate pivot strategy to stakeholders',
        icon: '📢',
        priority: 'high',
        estimatedTime: '2-3 hours',
        xpReward: 150
      },
      {
        id: 'resource-reallocation',
        title: 'Resource Reallocation',
        description: 'Reallocate resources for new direction',
        icon: '⚖️',
        priority: 'medium',
        estimatedTime: '2-3 hours',
        xpReward: 100
      }
    ]
  }
];

interface StartupStageSelectorProps {
  onStageSelect?: (stage: StartupStage) => void;
  onModuleSelect?: (module: StageModule) => void;
  className?: string;
}

const StartupStageSelector: React.FC<StartupStageSelectorProps> = ({
  onStageSelect,
  onModuleSelect,
  className = ''
}) => {
  const [selectedStage, setSelectedStage] = useState<StartupStage | null>(null);
  const [selectedModule, setSelectedModule] = useState<StageModule | null>(null);

  /**
   * Handle stage selection
   * @param stage - Selected startup stage
   */
  const handleStageSelect = (stage: StartupStage) => {
    setSelectedStage(stage);
    setSelectedModule(null); // Reset module selection
    onStageSelect?.(stage);
  };

  /**
   * Handle module selection
   * @param module - Selected stage module
   */
  const handleModuleSelect = (module: StageModule) => {
    setSelectedModule(module);
    onModuleSelect?.(module);
  };

  /**
   * Get priority color classes
   * @param priority - Module priority level
   */
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className={`max-w-6xl mx-auto p-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🚀 Choose Your Startup Stage
        </h2>
        <p className="text-gray-600">
          Select your current stage to unlock personalized planning modules
        </p>
      </div>

      {/* Stage Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STARTUP_STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => handleStageSelect(stage)}
            className={`
              p-6 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedStage?.id === stage.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stage.icon}</span>
              <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {stage.name}
            </h3>
            <p className="text-sm text-gray-600">
              {stage.description}
            </p>
            <div className="mt-3 text-xs text-gray-500">
              {stage.modules.length} modules available
            </div>
          </button>
        ))}
      </div>

      {/* Stage Modules */}
      {selectedStage && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {selectedStage.icon} {selectedStage.name} Stage Modules
            </h3>
            <div className="text-sm text-gray-600">
              Total XP Available: {selectedStage.modules.reduce((sum, module) => sum + module.xpReward, 0)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedStage.modules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleSelect(module)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${selectedModule?.id === module.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{module.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {module.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <div className={`
                    px-2 py-1 rounded text-xs font-medium
                    ${getPriorityColor(module.priority)}
                  `}>
                    {module.priority}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>⏱️ {module.estimatedTime}</span>
                  <span>🎯 +{module.xpReward} XP</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Module Details */}
      {selectedModule && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-gray-800">
              {selectedModule.icon} {selectedModule.title}
            </h4>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Module
            </button>
          </div>
          
          <p className="text-gray-700 mb-4">
            {selectedModule.description}
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-gray-600">Duration</div>
              <div className="font-semibold">{selectedModule.estimatedTime}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-gray-600">XP Reward</div>
              <div className="font-semibold">+{selectedModule.xpReward}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-gray-600">Priority</div>
              <div className="font-semibold capitalize">{selectedModule.priority}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupStageSelector;