import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Select,
  Alert,
  AlertIcon,
  Progress,
  Badge,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Tooltip,
  Stack,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';

import LiveSWOTAnalysis from './LiveSWOTAnalysis';

// Core data structures
interface StrategicJourney {
  id: string;
  businessProfile: BusinessProfile;
  currentStep: number;
  completedSteps: string[];
  journeySteps: JourneyStep[];
  balancedScorecard: BalancedScorecard;
  mckinsey7S: McKinsey7S;
  strategicObjectives: StrategicObjective[];
  departmentalObjectives: { [department: string]: DepartmentalObjective[] };
  tacticalActions: { [department: string]: TacticalAction[] };
  dataConnections: DataConnection[];
  completionPercentage: number;
}

interface BusinessProfile {
  id: string;
  businessName: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  tier: 'lite' | 'pro' | 'enterprise';
  stage: 'idea' | 'mvp' | 'growth' | 'scale';
  primaryGoals: string[];
  timeframe: string;
}

// Use the BusinessProfile type from the main app
interface LucidraBusinessProfile {
  id: string;
  businessName: string;
  industry: string;
  stage: 'idea' | 'mvp' | 'growth' | 'pivot';
  description: string;
  targetMarket: string;
  goals: string[];
  challenges: string[];
  createdAt: string;
}

interface JourneyStep {
  id: string;
  order: number;
  name: string;
  description: string;
  icon: string;
  category: 'foundation' | 'analysis' | 'strategy' | 'planning' | 'execution';
  tierAccess: ('lite' | 'pro' | 'enterprise')[];
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  prerequisites: string[];
  estimatedTime: number; // minutes
  tools: Tool[];
  prompts: Prompt[];
  deliverables: string[];
  dataOutputs: string[]; // What data this step contributes to other frameworks
  dataInputs: string[]; // What data this step needs from other frameworks
}

interface Tool {
  id: string;
  name: string;
  type: 'canvas' | 'analysis' | 'framework' | 'financial' | 'assessment';
  component: string; // React component name
  description: string;
  dataSchema: any;
  exportFormats: string[];
}

interface Prompt {
  id: string;
  type: 'guidance' | 'question' | 'suggestion' | 'warning' | 'congratulation';
  content: string;
  triggerCondition?: string;
  framework?: string;
}

interface BalancedScorecard {
  financial: BSCPerspective;
  customer: BSCPerspective;
  internal: BSCPerspective;
  learning: BSCPerspective;
  completionPercentage: number;
}

interface BSCPerspective {
  objectives: BSCObjective[];
  measures: BSCMeasure[];
  targets: BSCTarget[];
  initiatives: BSCInitiative[];
}

interface BSCObjective {
  id: string;
  description: string;
  source: string; // Which tool/analysis this came from
  linkedToStrategy: boolean;
}

interface BSCMeasure {
  id: string;
  name: string;
  type: 'financial' | 'operational' | 'strategic';
  currentValue?: number;
  targetValue?: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
}

interface BSCTarget {
  id: string;
  measureId: string;
  value: number;
  timeframe: string;
  responsibility: string;
}

interface BSCInitiative {
  id: string;
  name: string;
  description: string;
  owner: string;
  timeline: string;
  budget?: number;
  expectedImpact: string;
}

interface McKinsey7S {
  strategy: S7Element;
  structure: S7Element;
  systems: S7Element;
  sharedValues: S7Element;
  style: S7Element;
  staff: S7Element;
  skills: S7Element;
  alignmentScore: number;
  gapAnalysis: string[];
}

interface S7Element {
  current: string;
  desired: string;
  gap: 'none' | 'small' | 'medium' | 'large';
  actions: string[];
  dataSource: string; // Which analysis provided this data
}

interface StrategicObjective {
  id: string;
  description: string;
  category: 'financial' | 'customer' | 'internal' | 'learning';
  priority: 'high' | 'medium' | 'low';
  timeframe: 'short' | 'medium' | 'long';
  source: 'swot' | 'dupont' | 'competitive' | 'value-chain';
  kpis: string[];
  responsible: string;
  departmentalBreakdown: string[];
}

interface DepartmentalObjective {
  id: string;
  department: string;
  strategicObjectiveId: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeline: string;
  budget?: number;
  owner: string;
  tacticalActions: string[];
}

interface TacticalAction {
  id: string;
  departmentalObjectiveId: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: 'planned' | 'in-progress' | 'completed' | 'blocked';
  resources: string[];
  dependencies: string[];
  successMetrics: string[];
}

interface DataConnection {
  id: string;
  type: 'manual' | 'upload' | 'api';
  source: string;
  destination: string; // Which financial model
  status: 'disconnected' | 'connected' | 'syncing' | 'error';
  lastSync?: Date;
  dataPoints: string[];
}

// Journey steps configuration by tier
const JOURNEY_STEPS_BY_TIER = {
  lite: [
    {
      id: 'business-profile',
      order: 1,
      name: 'Business Profile',
      category: 'foundation' as const,
      description: 'Define your business fundamentals',
      icon: '🏢',
      tools: ['business-profile-canvas'],
      estimatedTime: 15
    },
    {
      id: 'swot-analysis',
      order: 2,
      name: 'SWOT Analysis',
      category: 'analysis' as const,
      description: 'Analyze strengths, weaknesses, opportunities, threats',
      icon: '🎯',
      tools: ['swot-matrix'],
      estimatedTime: 30
    },
    {
      id: 'business-model-canvas',
      order: 3,
      name: 'Business Model Canvas',
      category: 'strategy' as const,
      description: 'Map your business model',
      icon: '🗺️',
      tools: ['bmc-canvas'],
      estimatedTime: 45
    },
    {
      id: 'basic-financials',
      order: 4,
      name: 'Basic Financial Planning',
      category: 'planning' as const,
      description: 'Essential financial projections',
      icon: '💰',
      tools: ['financial-projections'],
      estimatedTime: 60
    },
    {
      id: 'action-planning',
      order: 5,
      name: 'Action Planning',
      category: 'execution' as const,
      description: 'Create implementation roadmap',
      icon: '📋',
      tools: ['action-planner'],
      estimatedTime: 30
    }
  ],
  pro: [
    {
      id: 'business-profile',
      order: 1,
      name: 'Business Profile',
      category: 'foundation' as const,
      description: 'Comprehensive business definition',
      icon: '🏢',
      tools: ['business-profile-canvas', 'stakeholder-map'],
      estimatedTime: 25
    },
    {
      id: 'market-analysis',
      order: 2,
      name: 'Market Analysis',
      category: 'analysis' as const,
      description: 'Porter\'s Five Forces + Market Intelligence',
      icon: '🔍',
      tools: ['porters-five-forces', 'market-intelligence'],
      estimatedTime: 45
    },
    {
      id: 'swot-analysis',
      order: 3,
      name: 'SWOT Analysis',
      category: 'analysis' as const,
      description: 'Strategic position analysis',
      icon: '🎯',
      tools: ['swot-matrix', 'tows-matrix'],
      estimatedTime: 40
    },
    {
      id: 'value-chain-analysis',
      order: 4,
      name: 'Value Chain Analysis',
      category: 'analysis' as const,
      description: 'Porter\'s Value Chain optimization',
      icon: '🔗',
      tools: ['value-chain-canvas'],
      estimatedTime: 50
    },
    {
      id: 'blue-ocean-strategy',
      order: 5,
      name: 'Blue Ocean Strategy',
      category: 'strategy' as const,
      description: 'Value innovation and ERRC',
      icon: '🌊',
      tools: ['strategy-canvas', 'errc-grid'],
      estimatedTime: 60
    },
    {
      id: 'business-model-canvas',
      order: 6,
      name: 'Business Model Canvas',
      category: 'strategy' as const,
      description: 'Integrated business model',
      icon: '🗺️',
      tools: ['bmc-canvas'],
      estimatedTime: 45
    },
    {
      id: 'balanced-scorecard',
      order: 7,
      name: 'Balanced Scorecard',
      category: 'planning' as const,
      description: 'Strategic measurement system',
      icon: '📊',
      tools: ['balanced-scorecard'],
      estimatedTime: 55
    },
    {
      id: 'financial-modeling',
      order: 8,
      name: 'Financial Modeling',
      category: 'planning' as const,
      description: 'Advanced financial analysis',
      icon: '💰',
      tools: ['dupont-analysis', 'abc-costing', 'financial-projections'],
      estimatedTime: 90
    },
    {
      id: 'strategic-planning',
      order: 9,
      name: 'Strategic Planning',
      category: 'planning' as const,
      description: 'Comprehensive strategic plan',
      icon: '🎯',
      tools: ['strategic-plan-template'],
      estimatedTime: 75
    },
    {
      id: 'implementation-roadmap',
      order: 10,
      name: 'Implementation Roadmap',
      category: 'execution' as const,
      description: 'Detailed execution plan',
      icon: '🛣️',
      tools: ['roadmap-builder', 'milestone-tracker'],
      estimatedTime: 60
    }
  ],
  enterprise: [
    // Includes all Pro steps plus additional enterprise features
    {
      id: 'organizational-assessment',
      order: 1,
      name: 'Organizational Assessment',
      category: 'foundation' as const,
      description: 'Comprehensive org analysis',
      icon: '🏛️',
      tools: ['org-assessment', 'capability-maturity'],
      estimatedTime: 45
    },
    {
      id: 'stakeholder-mapping',
      order: 2,
      name: 'Stakeholder Ecosystem',
      category: 'foundation' as const,
      description: 'Map all stakeholder relationships',
      icon: '👥',
      tools: ['stakeholder-map', 'influence-matrix'],
      estimatedTime: 40
    },
    // ... continues with all Pro steps plus additional enterprise tools
    {
      id: 'mckinsey-7s',
      order: 11,
      name: 'McKinsey 7S Analysis',
      category: 'analysis' as const,
      description: 'Organizational alignment assessment',
      icon: '⭐',
      tools: ['mckinsey-7s-framework'],
      estimatedTime: 70
    },
    {
      id: 'scenario-planning',
      order: 12,
      name: 'Scenario Planning',
      category: 'strategy' as const,
      description: 'Multiple future scenarios',
      icon: '🔮',
      tools: ['scenario-builder', 'monte-carlo'],
      estimatedTime: 120
    }
  ]
};

// Data flow mapping - how tools feed into each other
const DATA_FLOW_MAP = {
  'swot-analysis': {
    outputs: ['strategic-objectives', 'balanced-scorecard', 'mckinsey-7s'],
    feeds: 'Strengths and weaknesses inform strategy; Opportunities drive objectives'
  },
  'porters-five-forces': {
    outputs: ['competitive-strategy', 'blue-ocean-strategy', 'value-chain'],
    feeds: 'Competitive forces shape strategic positioning and value creation'
  },
  'value-chain-analysis': {
    outputs: ['cost-structure', 'abc-costing', 'capability-gaps'],
    feeds: 'Value activities inform cost models and capability requirements'
  },
  'blue-ocean-strategy': {
    outputs: ['innovation-priorities', 'differentiation-strategy', 'investment-focus'],
    feeds: 'ERRC recommendations drive resource allocation and strategic focus'
  },
  'dupont-analysis': {
    outputs: ['financial-objectives', 'performance-targets', 'balanced-scorecard'],
    feeds: 'ROE drivers become financial performance objectives'
  },
  'business-model-canvas': {
    outputs: ['revenue-model', 'cost-structure', 'strategic-partnerships'],
    feeds: 'Business model components inform financial projections and partnerships'
  }
};

const StrategicJourneyMap: React.FC<{ 
  businessProfile?: LucidraBusinessProfile | null;
  currentTier?: 'lite' | 'pro' | 'enterprise';
}> = ({ 
  businessProfile,
  currentTier = 'pro'
}) => {
  const [journey, setJourney] = useState<StrategicJourney | null>(null);
  const [currentStep, setCurrentStep] = useState<JourneyStep | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'step' | 'scorecard' | '7s' | 'objectives'>('map');
  const [executiveLevel, setExecutiveLevel] = useState<'ceo' | 'vp' | 'director' | 'manager'>('ceo');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [swotData, setSWOTData] = useState<any>(null);
  const [strategicObjectives, setStrategicObjectives] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Handle SWOT data updates and flow to other frameworks
  const handleSWOTDataUpdate = (data: { swot: any; objectives: any[] }) => {
    setSWOTData(data.swot);
    setStrategicObjectives(data.objectives);
    
    // Auto-populate Balanced Scorecard from SWOT objectives
    if (journey) {
      const updatedJourney = { ...journey };
      data.objectives.forEach(objective => {
        const perspective = objective.category as keyof BalancedScorecard;
        if (updatedJourney.balancedScorecard[perspective]) {
          updatedJourney.balancedScorecard[perspective].objectives.push({
            id: objective.id,
            description: objective.description,
            source: 'SWOT Analysis',
            linkedToStrategy: true
          });
        }
      });
      setJourney(updatedJourney);
    }
  };

  const handleToolLaunch = (toolId: string) => {
    setActiveTool(toolId);
  };

  const handleToolClose = () => {
    setActiveTool(null);
  };

  // Initialize journey based on business profile
  useEffect(() => {
    if (businessProfile) {
      // Convert LucidraBusinessProfile to BusinessProfile format
      const convertedProfile: BusinessProfile = {
        id: businessProfile.id,
        businessName: businessProfile.businessName,
        industry: businessProfile.industry,
        size: 'medium', // Default mapping - could be derived from team size if available
        tier: currentTier, // Use the selected tier from the main app
        stage: businessProfile.stage === 'pivot' ? 'growth' : businessProfile.stage,
        primaryGoals: businessProfile.goals,
        timeframe: '12 months' // Default timeframe
      };
      initializeJourney(convertedProfile);
    }
  }, [businessProfile]);

  const initializeJourney = (profile: BusinessProfile) => {
    const steps = JOURNEY_STEPS_BY_TIER[profile.tier] || JOURNEY_STEPS_BY_TIER.lite;
    
    const journeySteps: JourneyStep[] = steps.map((step, index) => ({
      ...step,
      tierAccess: [profile.tier],
      status: index === 0 ? 'available' : 'locked',
      prerequisites: index > 0 ? [steps[index - 1].id] : [],
      tools: step.tools.map(toolName => ({
        id: toolName,
        name: toolName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        type: 'canvas' as const,
        component: toolName,
        description: `${toolName} tool`,
        dataSchema: {},
        exportFormats: ['pdf', 'excel', 'json']
      })),
      prompts: generateStepPrompts(step.id, profile),
      deliverables: [`Completed ${step.name}`, `${step.name} Export`, `Data Integration`],
      dataOutputs: DATA_FLOW_MAP[step.id]?.outputs || [],
      dataInputs: []
    }));

    const newJourney: StrategicJourney = {
      id: `journey_${Date.now()}`,
      businessProfile: profile,
      currentStep: 0,
      completedSteps: [],
      journeySteps,
      balancedScorecard: initializeBalancedScorecard(),
      mckinsey7S: initializeMcKinsey7S(),
      strategicObjectives: [],
      departmentalObjectives: {},
      tacticalActions: {},
      dataConnections: [],
      completionPercentage: 0
    };

    setJourney(newJourney);
  };

  const generateStepPrompts = (stepId: string, profile: BusinessProfile): Prompt[] => {
    const prompts: { [key: string]: Prompt[] } = {
      'business-profile': [
        {
          id: 'welcome',
          type: 'guidance',
          content: `Welcome to your ${profile.tier} strategic planning journey! Let's start by defining your business fundamentals.`,
        },
        {
          id: 'completion',
          type: 'congratulation',
          content: 'Great! Your business profile will now flow into your SWOT analysis and competitive assessment.',
        }
      ],
      'swot-analysis': [
        {
          id: 'guidance',
          type: 'guidance',
          content: 'Your SWOT analysis will automatically populate your Balanced Scorecard objectives and strategic priorities.',
        },
        {
          id: 'suggestion',
          type: 'suggestion',
          content: 'Consider how your strengths can capitalize on opportunities and how to address weaknesses that make you vulnerable to threats.',
        }
      ],
      'business-model-canvas': [
        {
          id: 'data-flow',
          type: 'guidance',
          content: 'Your business model components will flow into financial projections and partnership strategies.',
        }
      ],
      'balanced-scorecard': [
        {
          id: 'auto-populate',
          type: 'guidance',
          content: 'Your Balanced Scorecard is auto-populating from your SWOT analysis, competitive assessment, and strategic objectives.',
        }
      ]
    };

    return prompts[stepId] || [];
  };

  const initializeBalancedScorecard = (): BalancedScorecard => ({
    financial: { objectives: [], measures: [], targets: [], initiatives: [] },
    customer: { objectives: [], measures: [], targets: [], initiatives: [] },
    internal: { objectives: [], measures: [], targets: [], initiatives: [] },
    learning: { objectives: [], measures: [], targets: [], initiatives: [] },
    completionPercentage: 0
  });

  const initializeMcKinsey7S = (): McKinsey7S => ({
    strategy: { current: '', desired: '', gap: 'none', actions: [], dataSource: '' },
    structure: { current: '', desired: '', gap: 'none', actions: [], dataSource: '' },
    systems: { current: '', desired: '', gap: 'none', actions: [], dataSource: '' },
    sharedValues: { current: '', desired: '', gap: 'none', actions: [], dataSource: '' },
    style: { current: '', desired: '', gap: 'none', actions: [], dataSource: '' },
    staff: { current: '', desired: '', gap: 'none', actions: [], dataSource: '' },
    skills: { current: '', desired: '', gap: 'none', actions: [], dataSource: '' },
    alignmentScore: 0,
    gapAnalysis: []
  });

  // Journey Map Visualization
  const JourneyMapView = () => {
    if (!journey) return null;

    const getStepColor = (status: JourneyStep['status']) => {
      switch (status) {
        case 'completed': return 'green';
        case 'in-progress': return 'blue';
        case 'available': return 'teal';
        case 'locked': return 'gray';
        default: return 'gray';
      }
    };

    const getCategorySteps = (category: JourneyStep['category']) => 
      journey.journeySteps.filter(step => step.category === category);

    const categories = ['foundation', 'analysis', 'strategy', 'planning', 'execution'] as const;

    return (
      <VStack spacing={8} align="stretch">
        {/* Journey Progress Header */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold">
                  🗺️ Strategic Journey Map - {journey.businessProfile.tier.toUpperCase()}
                </Text>
                <Text color="gray.500">
                  {journey.businessProfile.businessName} • {journey.businessProfile.industry}
                </Text>
              </VStack>
              <VStack align="end" spacing={1}>
                <CircularProgress 
                  value={journey.completionPercentage} 
                  color="teal.400" 
                  size="80px"
                >
                  <CircularProgressLabel>{Math.round(journey.completionPercentage)}%</CircularProgressLabel>
                </CircularProgress>
                <Text fontSize="sm" color="gray.500">Complete</Text>
              </VStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <Progress value={journey.completionPercentage} colorScheme="teal" size="lg" />
            <HStack justify="space-between" mt={2}>
              <Text fontSize="sm">Step {journey.currentStep + 1} of {journey.journeySteps.length}</Text>
              <Text fontSize="sm">{journey.completedSteps.length} completed</Text>
            </HStack>
          </CardBody>
        </Card>

        {/* Journey Categories */}
        <VStack spacing={6}>
          {categories.map((category) => {
            const categorySteps = getCategorySteps(category);
            if (categorySteps.length === 0) return null;

            return (
              <Card key={category} bg={cardBg} w="100%">
                <CardHeader>
                  <HStack>
                    <Text fontSize="lg" fontWeight="bold" textTransform="capitalize">
                      {category === 'foundation' ? '🏗️' : 
                       category === 'analysis' ? '🔍' : 
                       category === 'strategy' ? '🎯' : 
                       category === 'planning' ? '📋' : '🚀'} {category}
                    </Text>
                    <Badge variant="outline">
                      {categorySteps.filter(s => s.status === 'completed').length}/{categorySteps.length} complete
                    </Badge>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                    {categorySteps.map((step) => (
                      <Card
                        key={step.id}
                        cursor={step.status !== 'locked' ? 'pointer' : 'not-allowed'}
                        onClick={() => step.status !== 'locked' && setCurrentStep(step)}
                        opacity={step.status === 'locked' ? 0.6 : 1}
                        border="2px solid"
                        borderColor={
                          step.status === 'completed' ? 'green.200' :
                          step.status === 'in-progress' ? 'blue.200' :
                          step.status === 'available' ? 'teal.200' : 'gray.200'
                        }
                        bg={step.status === 'completed' ? 'green.50' : 'white'}
                        _hover={step.status !== 'locked' ? { 
                          transform: 'translateY(-2px)', 
                          shadow: 'lg' 
                        } : {}}
                        transition="all 0.2s"
                      >
                        <CardHeader>
                          <HStack justify="space-between">
                            <HStack>
                              <Text fontSize="2xl">{step.icon}</Text>
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="bold" fontSize="sm">{step.name}</Text>
                                <Text fontSize="xs" color="gray.500">{step.estimatedTime} min</Text>
                              </VStack>
                            </HStack>
                            <Badge colorScheme={getStepColor(step.status)}>
                              {step.status}
                            </Badge>
                          </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" color="gray.600">
                              {step.description}
                            </Text>
                            
                            {step.tools.length > 0 && (
                              <VStack align="start" spacing={1} w="100%">
                                <Text fontSize="xs" fontWeight="semibold">Tools:</Text>
                                <HStack wrap="wrap">
                                  {step.tools.slice(0, 2).map(tool => (
                                    <Badge key={tool.id} variant="outline" fontSize="xs">
                                      {tool.name}
                                    </Badge>
                                  ))}
                                  {step.tools.length > 2 && (
                                    <Badge variant="outline" fontSize="xs">
                                      +{step.tools.length - 2} more
                                    </Badge>
                                  )}
                                </HStack>
                              </VStack>
                            )}

                            {step.dataOutputs.length > 0 && (
                              <VStack align="start" spacing={1} w="100%">
                                <Text fontSize="xs" fontWeight="semibold" color="green.600">
                                  Feeds into:
                                </Text>
                                <Text fontSize="xs" color="green.600">
                                  {step.dataOutputs.slice(0, 2).join(', ')}
                                  {step.dataOutputs.length > 2 && '...'}
                                </Text>
                              </VStack>
                            )}
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </CardBody>
              </Card>
            );
          })}
        </VStack>

        {/* Data Flow Visualization */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🔄 Data Flow Integration</Text>
          </CardHeader>
          <CardBody>
            <Alert status="info">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Intelligent Data Flow:</Text>
                <Text fontSize="sm">
                  • SWOT → Strategic Objectives → Balanced Scorecard → Departmental Goals
                  • Porter's Analysis → Competitive Strategy → Value Chain Optimization
                  • Business Model → Financial Projections → DuPont Analysis → Performance Targets
                  • Blue Ocean ERRC → Innovation Priorities → Resource Allocation
                  • 7S Framework → Organizational Alignment → Implementation Planning
                </Text>
              </VStack>
            </Alert>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // Balanced Scorecard View (Auto-populated)
  const BalancedScorecardView = () => {
    if (!journey) return null;

    const perspectives = [
      { 
        key: 'financial' as keyof BalancedScorecard, 
        name: 'Financial', 
        icon: '💰', 
        color: 'green',
        description: 'Revenue, profitability, cost management'
      },
      { 
        key: 'customer' as keyof BalancedScorecard, 
        name: 'Customer', 
        icon: '👥', 
        color: 'blue',
        description: 'Customer satisfaction, retention, acquisition'
      },
      { 
        key: 'internal' as keyof BalancedScorecard, 
        name: 'Internal Process', 
        icon: '⚙️', 
        color: 'orange',
        description: 'Operational efficiency, quality, innovation'
      },
      { 
        key: 'learning' as keyof BalancedScorecard, 
        name: 'Learning & Growth', 
        icon: '📚', 
        color: 'purple',
        description: 'Employee development, capabilities, culture'
      }
    ];

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">📊 Balanced Scorecard (Auto-Populated)</Text>
              <Badge colorScheme="teal" variant="outline">
                {Math.round(journey.balancedScorecard.completionPercentage)}% Complete
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <Alert status={strategicObjectives.length > 0 ? "success" : "info"} mb={4}>
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">
                  {strategicObjectives.length > 0 ? "Live Data Flow Active!" : "Dynamic Population:"}
                </Text>
                <Text fontSize="sm">
                  {strategicObjectives.length > 0 
                    ? `🔄 Live updates: ${strategicObjectives.length} strategic objectives from SWOT analysis are now populating your Balanced Scorecard in real-time!`
                    : "Your Balanced Scorecard automatically populates as you complete journey steps: SWOT → Strategic Objectives, Financial Models → Targets, Value Chain → Internal Processes"
                  }
                </Text>
              </VStack>
            </Alert>

            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {perspectives.map((perspective) => (
                <Card key={perspective.key} variant="outline">
                  <CardHeader bg={`${perspective.color}.50`}>
                    <HStack>
                      <Text fontSize="xl">{perspective.icon}</Text>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">{perspective.name}</Text>
                        <Text fontSize="sm" color="gray.600">{perspective.description}</Text>
                      </VStack>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="sm" fontWeight="semibold">Objectives:</Text>
                        <Badge colorScheme={perspective.color}>
                          {journey.balancedScorecard[perspective.key].objectives.length}
                        </Badge>
                      </HStack>
                      
                      {journey.balancedScorecard[perspective.key].objectives.length > 0 ? (
                        journey.balancedScorecard[perspective.key].objectives.map((objective, index) => (
                          <Box key={index} w="100%" p={2} bg="gray.50" borderRadius="md">
                            <Text fontSize="sm">{objective.description}</Text>
                            <Text fontSize="xs" color="gray.500">
                              Source: {objective.source}
                            </Text>
                          </Box>
                        ))
                      ) : (
                        <Text fontSize="sm" color="gray.500" textAlign="center">
                          Will populate from your strategic analysis
                        </Text>
                      )}

                      <Divider />

                      <HStack justify="space-between" w="100%">
                        <Text fontSize="sm" fontWeight="semibold">Measures:</Text>
                        <Badge variant="outline">
                          {journey.balancedScorecard[perspective.key].measures.length}
                        </Badge>
                      </HStack>

                      <HStack justify="space-between" w="100%">
                        <Text fontSize="sm" fontWeight="semibold">Initiatives:</Text>
                        <Badge variant="outline">
                          {journey.balancedScorecard[perspective.key].initiatives.length}
                        </Badge>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // McKinsey 7S View (Auto-populated)
  const McKinsey7SView = () => {
    if (!journey) return null;

    const elements = [
      { key: 'strategy' as keyof McKinsey7S, name: 'Strategy', icon: '🎯', description: 'Plans to outperform competitors' },
      { key: 'structure' as keyof McKinsey7S, name: 'Structure', icon: '🏗️', description: 'How the organization is organized' },
      { key: 'systems' as keyof McKinsey7S, name: 'Systems', icon: '⚙️', description: 'Processes and procedures' },
      { key: 'sharedValues' as keyof McKinsey7S, name: 'Shared Values', icon: '💎', description: 'Core beliefs and culture' },
      { key: 'style' as keyof McKinsey7S, name: 'Style', icon: '👔', description: 'Leadership approach' },
      { key: 'staff' as keyof McKinsey7S, name: 'Staff', icon: '👥', description: 'Human resources capabilities' },
      { key: 'skills' as keyof McKinsey7S, name: 'Skills', icon: '🎓', description: 'Core competencies' }
    ];

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">⭐ McKinsey 7S Framework (Auto-Populated)</Text>
              <Badge colorScheme="purple" variant="outline">
                Alignment Score: {journey.mckinsey7S.alignmentScore}%
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <Alert status="info" mb={4}>
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Intelligent Integration:</Text>
                <Text fontSize="sm">
                  Your 7S framework auto-populates from: Strategy (Blue Ocean + Porter), 
                  Structure (Value Chain), Systems (Process Analysis), Values (Business Profile)
                </Text>
              </VStack>
            </Alert>

            <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
              {elements.map((element) => {
                const s7Element = journey.mckinsey7S[element.key] as S7Element;
                const gapColor = 
                  s7Element.gap === 'none' ? 'green' :
                  s7Element.gap === 'small' ? 'yellow' :
                  s7Element.gap === 'medium' ? 'orange' : 'red';

                return (
                  <Card key={element.key} variant="outline">
                    <CardHeader>
                      <HStack justify="space-between">
                        <HStack>
                          <Text fontSize="xl">{element.icon}</Text>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="sm">{element.name}</Text>
                            <Text fontSize="xs" color="gray.500">{element.description}</Text>
                          </VStack>
                        </HStack>
                        <Badge colorScheme={gapColor}>
                          {s7Element.gap} gap
                        </Badge>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <Box w="100%">
                          <Text fontSize="xs" fontWeight="semibold" color="blue.600">Current State:</Text>
                          <Text fontSize="sm">{s7Element.current || 'Will populate from analysis'}</Text>
                        </Box>
                        
                        <Box w="100%">
                          <Text fontSize="xs" fontWeight="semibold" color="green.600">Desired State:</Text>
                          <Text fontSize="sm">{s7Element.desired || 'Will be defined based on strategy'}</Text>
                        </Box>

                        {s7Element.dataSource && (
                          <Box w="100%">
                            <Text fontSize="xs" fontWeight="semibold" color="purple.600">Data Source:</Text>
                            <Text fontSize="xs">{s7Element.dataSource}</Text>
                          </Box>
                        )}

                        {s7Element.actions.length > 0 && (
                          <Box w="100%">
                            <Text fontSize="xs" fontWeight="semibold">Actions:</Text>
                            {s7Element.actions.map((action, index) => (
                              <Text key={index} fontSize="xs" color="gray.600">• {action}</Text>
                            ))}
                          </Box>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                );
              })}
            </Grid>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // Executive Drill-Down View
  const ExecutiveDrillDownView = () => {
    if (!journey) return null;

    const levelData = {
      ceo: {
        title: 'CEO Dashboard',
        icon: '👑',
        focus: 'Strategic Objectives & Overall Performance',
        objectives: journey.strategicObjectives,
        metrics: ['Revenue Growth', 'Market Share', 'ROE', 'Strategic Initiative Progress']
      },
      vp: {
        title: 'VP Dashboard', 
        icon: '🎯',
        focus: 'Departmental Objectives & Cross-Functional Initiatives',
        objectives: Object.values(journey.departmentalObjectives).flat(),
        metrics: ['Departmental KPIs', 'Resource Utilization', 'Project Milestones']
      },
      director: {
        title: 'Director Dashboard',
        icon: '📊', 
        focus: 'Functional Excellence & Team Performance',
        objectives: Object.values(journey.departmentalObjectives).flat(),
        metrics: ['Team Performance', 'Process Efficiency', 'Quality Metrics']
      },
      manager: {
        title: 'Manager Dashboard',
        icon: '📋',
        focus: 'Tactical Execution & Team Development',
        objectives: Object.values(journey.tacticalActions).flat(),
        metrics: ['Task Completion', 'Team Development', 'Operational Metrics']
      }
    };

    const currentLevel = levelData[executiveLevel];

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <HStack>
                <Text fontSize="xl">{currentLevel.icon}</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xl" fontWeight="bold">{currentLevel.title}</Text>
                  <Text color="gray.500">{currentLevel.focus}</Text>
                </VStack>
              </HStack>
              <Select 
                value={executiveLevel} 
                onChange={(e) => setExecutiveLevel(e.target.value as any)}
                w="200px"
              >
                <option value="ceo">CEO Level</option>
                <option value="vp">VP Level</option>
                <option value="director">Director Level</option>
                <option value="manager">Manager Level</option>
              </Select>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
              <Card variant="outline">
                <CardHeader>
                  <Text fontWeight="bold">Key Objectives</Text>
                </CardHeader>
                <CardBody>
                  {currentLevel.objectives.length > 0 ? (
                    currentLevel.objectives.slice(0, 5).map((obj, index) => (
                      <Box key={index} mb={2} p={2} bg="gray.50" borderRadius="md">
                        <Text fontSize="sm" fontWeight="semibold">
                          {typeof obj === 'string' ? obj : obj.description || 'Strategic Objective'}
                        </Text>
                      </Box>
                    ))
                  ) : (
                    <Text fontSize="sm" color="gray.500">
                      Objectives will populate as you complete your strategic analysis
                    </Text>
                  )}
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <Text fontWeight="bold">Key Metrics</Text>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={2}>
                    {currentLevel.metrics.map((metric, index) => (
                      <HStack key={index} justify="space-between" w="100%">
                        <Text fontSize="sm">{metric}</Text>
                        <Badge variant="outline">TBD</Badge>
                      </HStack>
                    ))}
                  </VStack>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <Text fontWeight="bold">Progress Overview</Text>
                </CardHeader>
                <CardBody>
                  <VStack spacing={3}>
                    <CircularProgress value={journey.completionPercentage} color="teal.400">
                      <CircularProgressLabel>
                        {Math.round(journey.completionPercentage)}%
                      </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="sm" textAlign="center">
                      Strategic Plan Completion
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </Grid>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // Step Detail View
  const StepDetailView = () => {
    if (!currentStep) return null;

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <HStack>
                <Text fontSize="2xl">{currentStep.icon}</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xl" fontWeight="bold">{currentStep.name}</Text>
                  <Text color="gray.500">{currentStep.description}</Text>
                </VStack>
              </HStack>
              <HStack>
                <Badge colorScheme="teal">{currentStep.estimatedTime} min</Badge>
                <Button variant="outline" onClick={() => setCurrentStep(null)}>
                  ← Back to Map
                </Button>
              </HStack>
            </HStack>
          </CardHeader>
          <CardBody>
            {/* Step prompts */}
            {currentStep.prompts.map((prompt) => (
              <Alert 
                key={prompt.id} 
                status={
                  prompt.type === 'guidance' ? 'info' :
                  prompt.type === 'suggestion' ? 'warning' :
                  prompt.type === 'congratulation' ? 'success' : 'info'
                }
                mb={4}
              >
                <AlertIcon />
                <Text>{prompt.content}</Text>
              </Alert>
            ))}

            {/* Tools for this step */}
            <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
              {currentStep.tools.map((tool) => (
                <Card key={tool.id} variant="outline" cursor="pointer" _hover={{ bg: 'gray.50' }}>
                  <CardBody>
                    <VStack spacing={3}>
                      <Text fontWeight="bold">{tool.name}</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        {tool.description}
                      </Text>
                      <Button 
                        size="sm" 
                        colorScheme="teal"
                        onClick={() => handleToolLaunch(tool.id)}
                      >
                        Launch Tool
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>

            {/* Data flow information */}
            {currentStep.dataOutputs.length > 0 && (
              <Alert status="success" mt={4}>
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Data Integration:</Text>
                  <Text fontSize="sm">
                    Completing this step will automatically populate: {currentStep.dataOutputs.join(', ')}
                  </Text>
                </VStack>
              </Alert>
            )}
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // Tool Renderer Component
  const ToolRenderer = () => {
    if (!activeTool) return null;

    const handleComplete = () => {
      setActiveTool(null);
      // Mark the current step as completed and unlock next step
      if (currentStep && journey) {
        const updatedJourney = { ...journey };
        const stepIndex = updatedJourney.journeySteps.findIndex(s => s.id === currentStep.id);
        if (stepIndex !== -1) {
          updatedJourney.journeySteps[stepIndex].status = 'completed';
          updatedJourney.completedSteps.push(currentStep.id);
          
          // Unlock next step
          if (stepIndex + 1 < updatedJourney.journeySteps.length) {
            updatedJourney.journeySteps[stepIndex + 1].status = 'available';
          }
          
          // Update completion percentage
          const completedCount = updatedJourney.completedSteps.length;
          const totalSteps = updatedJourney.journeySteps.length;
          updatedJourney.completionPercentage = Math.round((completedCount / totalSteps) * 100);
          
          setJourney(updatedJourney);
        }
      }
    };

    switch (activeTool) {
      case 'swot-matrix':
      case 'swot-analysis':
        return (
          <Box>
            <HStack justify="space-between" mb={4}>
              <Text fontSize="2xl" fontWeight="bold">
                🎯 Live SWOT Analysis Tool
              </Text>
              <Button variant="outline" onClick={handleToolClose}>
                ← Back to Journey
              </Button>
            </HStack>
            <LiveSWOTAnalysis
              businessProfile={businessProfile}
              onDataUpdate={handleSWOTDataUpdate}
              onComplete={handleComplete}
            />
          </Box>
        );
      
      default:
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">
                🔧 {activeTool?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Tool
              </Text>
              <Button variant="outline" onClick={handleToolClose}>
                ← Back to Journey
              </Button>
            </HStack>
            <Alert status="info">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Tool Under Development</Text>
                <Text fontSize="sm">
                  This interactive tool is being developed. For now, you can continue with the journey.
                </Text>
              </VStack>
            </Alert>
            <Button mt={4} colorScheme="teal" onClick={handleComplete}>
              Mark as Complete & Continue Journey
            </Button>
          </Box>
        );
    }
  };

  if (!journey) {
    return (
      <Box p={6} bg={bgColor} minH="100vh">
        <VStack spacing={6} maxW="7xl" mx="auto">
          <Alert status="info">
            <AlertIcon />
            <VStack align="start" spacing={2}>
              <Text fontWeight="semibold">Welcome to Your Strategic Journey!</Text>
              <Text fontSize="sm">
                {businessProfile ? 
                  'Loading your personalized journey map...' : 
                  'Complete your business profile in the welcome screen to access your tier-specific strategic journey map.'
                }
              </Text>
              {!businessProfile && (
                <Button 
                  colorScheme="teal" 
                  size="sm" 
                  onClick={() => window.location.reload()}
                >
                  Return to Welcome
                </Button>
              )}
            </VStack>
          </Alert>
          
          {/* Show a preview of what's coming */}
          <Card bg={cardBg} w="100%">
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">🗺️ Your Strategic Journey Preview</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" color="gray.600" mb={4}>
                Based on your selected {currentTier.toUpperCase()} tier, you'll get:
              </Text>
              <VStack align="start" spacing={2}>
                {JOURNEY_STEPS_BY_TIER[currentTier]?.map((step, index) => (
                  <HStack key={step.id}>
                    <Text fontSize="lg">{step.icon}</Text>
                    <Text fontSize="sm">{step.name} ({step.estimatedTime} min)</Text>
                  </HStack>
                )) || []}
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} maxW="7xl" mx="auto">
        {/* View Mode Tabs */}
        <Card bg={cardBg} w="100%">
          <CardBody>
            <Tabs index={
              viewMode === 'map' ? 0 :
              viewMode === 'scorecard' ? 1 :
              viewMode === '7s' ? 2 :
              viewMode === 'objectives' ? 3 : 0
            }>
              <TabList>
                <Tab onClick={() => setViewMode('map')}>🗺️ Journey Map</Tab>
                <Tab onClick={() => setViewMode('scorecard')}>📊 Balanced Scorecard</Tab>
                <Tab onClick={() => setViewMode('7s')}>⭐ McKinsey 7S</Tab>
                <Tab onClick={() => setViewMode('objectives')}>🎯 Executive View</Tab>
              </TabList>
            </Tabs>
          </CardBody>
        </Card>

        {/* Content based on view mode */}
        {activeTool ? (
          <ToolRenderer />
        ) : (
          <>
            {viewMode === 'map' && !currentStep && <JourneyMapView />}
            {viewMode === 'map' && currentStep && <StepDetailView />}
            {viewMode === 'scorecard' && <BalancedScorecardView />}
            {viewMode === '7s' && <McKinsey7SView />}
            {viewMode === 'objectives' && <ExecutiveDrillDownView />}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default StrategicJourneyMap;