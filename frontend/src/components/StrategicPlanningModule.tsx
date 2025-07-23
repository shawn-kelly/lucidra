import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Button,
  Grid,
  GridItem,
  Badge,
  Alert,
  AlertIcon,
  Progress,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Divider,
  CircularProgress,
  CircularProgressLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useFrameworkData } from '../hooks/useFrameworkData';

// Strategic Planning Data Structures
interface StrategicInitiative {
  id: string;
  title: string;
  description: string;
  category: 'value_innovation' | 'market_creation' | 'competitive_positioning' | 'cost_optimization' | 'differentiation';
  strategic_lens: 'blue_ocean' | 'porter_forces' | 'hybrid' | 'resource_based';
  goals: StrategicGoal[];
  uniqueness_score: number; // 1-10 scale
  estimated_roi: number; // percentage
  timeframe: 'short_term' | 'medium_term' | 'long_term'; // 3-6 months, 6-18 months, 18+ months
  resources_required: string[];
  key_metrics: string[];
  risks: string[];
  dependencies: string[];
  porter_analysis: PorterAnalysis;
  blue_ocean_analysis: BlueOceanAnalysis;
  implementation_phases: ImplementationPhase[];
  created_at: string;
  status: 'draft' | 'under_review' | 'approved' | 'in_progress' | 'completed';
}

interface StrategicGoal {
  id: string;
  description: string;
  target_metric: string;
  current_value: number;
  target_value: number;
  measurement_unit: string;
  timeframe: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface PorterAnalysis {
  competitive_rivalry: {
    intensity: number; // 1-10 scale
    key_factors: string[];
    strategic_implications: string[];
  };
  supplier_power: {
    intensity: number;
    key_factors: string[];
    strategic_implications: string[];
  };
  buyer_power: {
    intensity: number;
    key_factors: string[];
    strategic_implications: string[];
  };
  threat_of_substitutes: {
    intensity: number;
    key_factors: string[];
    strategic_implications: string[];
  };
  barriers_to_entry: {
    intensity: number;
    key_factors: string[];
    strategic_implications: string[];
  };
  overall_attractiveness: number; // 1-10 scale
}

interface BlueOceanAnalysis {
  industry_boundaries: {
    current_boundaries: string[];
    potential_expansions: string[];
    cross_industry_opportunities: string[];
  };
  buyer_utility: {
    pain_points: BuyerUtilityPoint[];
    utility_innovations: string[];
    value_curve_shifts: string[];
  };
  cost_structure: {
    current_cost_drivers: CostDriver[];
    elimination_opportunities: string[];
    reduction_opportunities: string[];
    innovation_investments: string[];
  };
  strategic_fit: {
    organizational_capabilities: string[];
    resource_requirements: string[];
    cultural_alignment: number; // 1-10 scale
    execution_feasibility: number; // 1-10 scale
  };
}

interface BuyerUtilityPoint {
  stage: 'purchase' | 'delivery' | 'use' | 'supplements' | 'maintenance' | 'disposal';
  lever: 'productivity' | 'simplicity' | 'convenience' | 'risk' | 'fun_image' | 'environmental';
  current_score: number; // 1-10 scale
  pain_description: string;
  improvement_opportunity: string;
}

interface CostDriver {
  category: string;
  current_cost: number;
  cost_percentage: number;
  optimization_potential: number; // percentage reduction possible
  strategic_importance: number; // 1-10 scale
}

interface ImplementationPhase {
  id: string;
  name: string;
  description: string;
  duration_weeks: number;
  key_activities: string[];
  success_criteria: string[];
  resource_allocation: { [key: string]: number };
  risk_mitigation: string[];
  dependencies: string[];
}

interface CoachingSession {
  id: string;
  initiative_id: string;
  session_type: 'discovery' | 'analysis' | 'strategy_design' | 'validation' | 'implementation';
  questions_asked: CoachingQuestion[];
  insights_generated: string[];
  recommendations: string[];
  next_steps: string[];
  session_notes: string;
  duration_minutes: number;
  participants: string[];
  completed_at?: string;
}

interface CoachingQuestion {
  id: string;
  category: 'industry_boundaries' | 'buyer_utility' | 'cost_structure' | 'strategic_fit' | 'competitive_forces';
  question: string;
  response: string;
  follow_up_questions: string[];
  insights: string[];
}

const StrategicPlanningModule: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const {
    frameworkState,
    blueOceanData,
    insights,
    hasData
  } = useFrameworkData();

  const [strategicInitiatives, setStrategicInitiatives] = useState<StrategicInitiative[]>([]);
  const [coachingSessions, setCoachingSessions] = useState<CoachingSession[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedInitiative, setSelectedInitiative] = useState<StrategicInitiative | null>(null);
  const [currentSession, setCurrentSession] = useState<CoachingSession | null>(null);
  const [newInitiativeForm, setNewInitiativeForm] = useState({
    title: '',
    description: '',
    category: 'value_innovation' as const,
    strategic_lens: 'blue_ocean' as const,
    timeframe: 'medium_term' as const
  });

  const toast = useToast();
  const { isOpen: isNewInitiativeOpen, onOpen: onNewInitiativeOpen, onClose: onNewInitiativeClose } = useDisclosure();
  const { isOpen: isCoachingOpen, onOpen: onCoachingOpen, onClose: onCoachingClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');
  const warningBg = useColorModeValue('orange.50', 'orange.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Strategic transformation coaching questions
  const coachingQuestions = {
    industry_boundaries: [
      "What industries do you currently compete in, and what are their traditional boundaries?",
      "Which alternative industries could serve the same buyer groups with different products/services?",
      "What complementary products or services could expand your market scope?",
      "How could you redefine your industry to create new market space?"
    ],
    buyer_utility: [
      "What are the biggest pain points your customers experience throughout their journey?",
      "At which stages (purchase, delivery, use, supplements, maintenance, disposal) do customers face the most friction?",
      "How could you dramatically improve productivity, simplicity, convenience, or reduce risk for buyers?",
      "What would make your offering 10x better than existing alternatives?"
    ],
    cost_structure: [
      "What are your three largest cost drivers, and why are they necessary?",
      "Which industry cost factors could you eliminate entirely?",
      "What costs could you reduce well below industry standards?",
      "Where should you invest to create unprecedented value?"
    ],
    strategic_fit: [
      "What unique organizational capabilities do you have or need to develop?",
      "How well does this strategy align with your company culture and values?",
      "What resources and partnerships are critical for execution?",
      "What could prevent you from successfully implementing this strategy?"
    ],
    competitive_forces: [
      "How intense is rivalry among existing competitors in your space?",
      "What power do suppliers and buyers have over your business model?",
      "What substitutes or alternative solutions pose the biggest threat?",
      "What barriers prevent new entrants from disrupting your market?"
    ]
  };

  // Initialize with demo data
  useEffect(() => {
    const demoInitiative: StrategicInitiative = {
      id: 'init_demo_1',
      title: 'Customer Experience Transformation',
      description: 'Create a blue ocean opportunity by eliminating traditional service friction points and introducing AI-powered customer journey optimization',
      category: 'value_innovation',
      strategic_lens: 'hybrid',
      uniqueness_score: 8.5,
      estimated_roi: 145,
      timeframe: 'medium_term',
      resources_required: ['AI Technology Platform', 'Customer Experience Team', 'Data Analytics Capability', 'Change Management'],
      key_metrics: ['Customer Satisfaction Score', 'Service Resolution Time', 'Customer Lifetime Value', 'Market Share Growth'],
      risks: ['Technology Implementation Complexity', 'Customer Adoption Resistance', 'Competitive Response'],
      dependencies: ['Technology Infrastructure', 'Staff Training', 'Process Redesign'],
      status: 'approved',
      created_at: new Date().toISOString(),
      goals: [
        {
          id: 'goal_1',
          description: 'Increase customer satisfaction score',
          target_metric: 'CSAT Score',
          current_value: 7.2,
          target_value: 9.5,
          measurement_unit: '/10',
          timeframe: '12 months',
          priority: 'critical'
        },
        {
          id: 'goal_2', 
          description: 'Reduce service resolution time',
          target_metric: 'Average Resolution Time',
          current_value: 48,
          target_value: 8,
          measurement_unit: 'hours',
          timeframe: '9 months',
          priority: 'high'
        }
      ],
      porter_analysis: {
        competitive_rivalry: {
          intensity: 7,
          key_factors: ['Price competition', 'Service differentiation challenges', 'Multiple established players'],
          strategic_implications: ['Need for unique value proposition', 'Focus on non-price competition']
        },
        supplier_power: {
          intensity: 4,
          key_factors: ['Multiple technology vendors available', 'Switching costs moderate'],
          strategic_implications: ['Opportunity for strategic partnerships', 'Negotiate favorable terms']
        },
        buyer_power: {
          intensity: 8,
          key_factors: ['High buyer awareness', 'Low switching costs', 'Price sensitivity'],
          strategic_implications: ['Must deliver exceptional value', 'Focus on customer lock-in through superior experience']
        },
        threat_of_substitutes: {
          intensity: 6,
          key_factors: ['Alternative service delivery models', 'Self-service technology options'],
          strategic_implications: ['Differentiate through human + AI hybrid approach', 'Continuous innovation required']
        },
        barriers_to_entry: {
          intensity: 5,
          key_factors: ['Technology infrastructure requirements', 'Customer trust and brand building'],
          strategic_implications: ['First-mover advantage opportunity', 'Invest in brand and capabilities']
        },
        overall_attractiveness: 6.5
      },
      blue_ocean_analysis: {
        industry_boundaries: {
          current_boundaries: ['Traditional customer service', 'Support ticket systems', 'Call center operations'],
          potential_expansions: ['Predictive service', 'Customer success consulting', 'Process optimization services'],
          cross_industry_opportunities: ['Healthcare patient experience', 'Financial advisory services', 'Educational support systems']
        },
        buyer_utility: {
          pain_points: [
            {
              stage: 'purchase',
              lever: 'simplicity',
              current_score: 6,
              pain_description: 'Complex onboarding process with multiple touchpoints',
              improvement_opportunity: 'Single-click onboarding with AI-guided setup'
            },
            {
              stage: 'use',
              lever: 'productivity',
              current_score: 5,
              pain_description: 'Time-consuming support interactions with long wait times',
              improvement_opportunity: 'Instant AI resolution with human escalation only when needed'
            }
          ],
          utility_innovations: [
            'Predictive issue prevention',
            'Proactive solution delivery',
            'Personalized experience optimization'
          ],
          value_curve_shifts: [
            'Eliminate: Wait times, repetitive questions, multiple handoffs',
            'Reduce: Resolution complexity, customer effort',
            'Raise: Personalization, proactive support',
            'Create: Predictive insights, outcome guarantees'
          ]
        },
        cost_structure: {
          current_cost_drivers: [
            { category: 'Human Resources', current_cost: 2400000, cost_percentage: 45, optimization_potential: 25, strategic_importance: 8 },
            { category: 'Technology Infrastructure', current_cost: 800000, cost_percentage: 15, optimization_potential: 15, strategic_importance: 9 },
            { category: 'Training & Development', current_cost: 400000, cost_percentage: 8, optimization_potential: 30, strategic_importance: 7 }
          ],
          elimination_opportunities: [
            'Manual ticket routing',
            'Repetitive training cycles',
            'Legacy system maintenance'
          ],
          reduction_opportunities: [
            'Automated first-level support (50% reduction)',
            'Self-service optimization (30% reduction)',
            'Predictive maintenance (40% reduction)'
          ],
          innovation_investments: [
            'AI/ML platform development',
            'Customer journey analytics',
            'Predictive service capabilities'
          ]
        },
        strategic_fit: {
          organizational_capabilities: [
            'Strong customer relationship management',
            'Technology adoption agility',
            'Data analytics expertise',
            'Change management experience'
          ],
          resource_requirements: [
            'AI/ML development team',
            'Customer experience designers',
            'Data scientists',
            'Change management specialists'
          ],
          cultural_alignment: 8,
          execution_feasibility: 7
        }
      },
      implementation_phases: [
        {
          id: 'phase_1',
          name: 'Foundation & Analysis',
          description: 'Establish baseline metrics, conduct deep customer research, and design AI-powered solution architecture',
          duration_weeks: 12,
          key_activities: [
            'Customer journey mapping and pain point analysis',
            'Technology platform selection and setup',
            'Team recruitment and training',
            'Pilot program design'
          ],
          success_criteria: [
            'Complete customer journey map with quantified pain points',
            'AI platform operational with basic capabilities',
            'Pilot customer group identified and onboarded'
          ],
          resource_allocation: {
            'Technology Development': 40,
            'Customer Research': 30,
            'Team Building': 20,
            'Project Management': 10
          },
          risk_mitigation: [
            'Phased technology rollout to minimize disruption',
            'Continuous customer feedback loops',
            'Backup manual processes for critical functions'
          ],
          dependencies: [
            'Technology vendor selection',
            'Customer research approvals',
            'Budget allocation confirmation'
          ]
        }
      ]
    };

    setStrategicInitiatives([demoInitiative]);
  }, []);

  const calculateUniquenessScore = (initiative: StrategicInitiative): number => {
    let score = 5; // baseline
    
    // Blue Ocean factors
    if (initiative.blue_ocean_analysis.value_curve_shifts.length > 3) score += 1.5;
    if (initiative.blue_ocean_analysis.industry_boundaries.cross_industry_opportunities.length > 2) score += 1;
    if (initiative.blue_ocean_analysis.utility_innovations.length > 2) score += 1;
    
    // Porter's competitive advantage
    if (initiative.porter_analysis.overall_attractiveness > 7) score += 1;
    if (initiative.porter_analysis.barriers_to_entry.intensity > 6) score += 0.5;
    
    return Math.min(10, score);
  };

  const calculateEstimatedROI = (initiative: StrategicInitiative): number => {
    let roi = 50; // baseline ROI
    
    // Value innovation multiplier
    if (initiative.category === 'value_innovation') roi += 30;
    if (initiative.category === 'market_creation') roi += 40;
    
    // Strategic fit bonus
    roi += (initiative.blue_ocean_analysis.strategic_fit.execution_feasibility * 5);
    roi += (initiative.blue_ocean_analysis.strategic_fit.cultural_alignment * 3);
    
    // Market attractiveness
    roi += (initiative.porter_analysis.overall_attractiveness * 10);
    
    // Cost optimization factor
    const totalOptimization = initiative.blue_ocean_analysis.cost_structure.current_cost_drivers
      .reduce((sum, driver) => sum + (driver.optimization_potential * driver.cost_percentage / 100), 0);
    roi += totalOptimization;
    
    return Math.round(Math.min(300, roi));
  };

  const startCoachingSession = (initiative: StrategicInitiative) => {
    const newSession: CoachingSession = {
      id: `session_${Date.now()}`,
      initiative_id: initiative.id,
      session_type: 'discovery',
      questions_asked: [],
      insights_generated: [],
      recommendations: [],
      next_steps: [],
      session_notes: '',
      duration_minutes: 0,
      participants: ['Strategic Planning Team']
    };
    
    setCurrentSession(newSession);
    setSelectedInitiative(initiative);
    onCoachingOpen();
  };

  const createNewInitiative = () => {
    const newInitiative: StrategicInitiative = {
      id: `init_${Date.now()}`,
      title: newInitiativeForm.title,
      description: newInitiativeForm.description,
      category: newInitiativeForm.category,
      strategic_lens: newInitiativeForm.strategic_lens,
      timeframe: newInitiativeForm.timeframe,
      goals: [],
      uniqueness_score: 5,
      estimated_roi: 50,
      resources_required: [],
      key_metrics: [],
      risks: [],
      dependencies: [],
      status: 'draft',
      created_at: new Date().toISOString(),
      porter_analysis: {
        competitive_rivalry: { intensity: 5, key_factors: [], strategic_implications: [] },
        supplier_power: { intensity: 5, key_factors: [], strategic_implications: [] },
        buyer_power: { intensity: 5, key_factors: [], strategic_implications: [] },
        threat_of_substitutes: { intensity: 5, key_factors: [], strategic_implications: [] },
        barriers_to_entry: { intensity: 5, key_factors: [], strategic_implications: [] },
        overall_attractiveness: 5
      },
      blue_ocean_analysis: {
        industry_boundaries: { current_boundaries: [], potential_expansions: [], cross_industry_opportunities: [] },
        buyer_utility: { pain_points: [], utility_innovations: [], value_curve_shifts: [] },
        cost_structure: { current_cost_drivers: [], elimination_opportunities: [], reduction_opportunities: [], innovation_investments: [] },
        strategic_fit: { organizational_capabilities: [], resource_requirements: [], cultural_alignment: 5, execution_feasibility: 5 }
      },
      implementation_phases: []
    };

    setStrategicInitiatives(prev => [...prev, newInitiative]);
    setNewInitiativeForm({ title: '', description: '', category: 'value_innovation', strategic_lens: 'blue_ocean', timeframe: 'medium_term' });
    onNewInitiativeClose();
    
    toast({
      title: "Strategic Initiative Created!",
      description: "Your new initiative is ready for coaching and analysis",
      status: "success",
      duration: 4000,
    });
  };

  const renderStrategicDashboard = () => (
    <VStack spacing={6} align="stretch">
      {/* Integration Status */}
      {hasData && (
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">🧠 Strategic Intelligence Active</Text>
            <Text fontSize="sm">
              Strategic planning powered by Blue Ocean insights and Porter's competitive analysis. 
              {strategicInitiatives.length} initiatives being coached with AI-powered guidance.
            </Text>
          </VStack>
        </Alert>
      )}

      {!hasData && (
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Ready for Strategic Transformation</Text>
            <Text fontSize="sm">
              Complete your Blue Ocean Strategy analysis to unlock AI-powered strategic coaching and competitive intelligence.
            </Text>
          </VStack>
        </Alert>
      )}

      {/* Strategic Overview Metrics */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Stat>
              <StatLabel>Active Initiatives</StatLabel>
              <StatNumber>{strategicInitiatives.length}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                Strategic projects
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Stat>
              <StatLabel>Avg Uniqueness Score</StatLabel>
              <StatNumber>
                {strategicInitiatives.length > 0 
                  ? (strategicInitiatives.reduce((sum, init) => sum + init.uniqueness_score, 0) / strategicInitiatives.length).toFixed(1)
                  : '0'
                }/10
              </StatNumber>
              <StatHelpText>Blue Ocean differentiation</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Stat>
              <StatLabel>Projected ROI</StatLabel>
              <StatNumber>
                {strategicInitiatives.length > 0 
                  ? Math.round(strategicInitiatives.reduce((sum, init) => sum + init.estimated_roi, 0) / strategicInitiatives.length)
                  : 0
                }%
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                Strategic returns
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Stat>
              <StatLabel>Coaching Sessions</StatLabel>
              <StatNumber>{coachingSessions.length}</StatNumber>
              <StatHelpText>Transformation guidance</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Action Buttons */}
      <HStack spacing={4}>
        <Button 
          colorScheme="blue" 
          leftIcon={<Text>🎯</Text>}
          onClick={onNewInitiativeOpen}
        >
          Create New Initiative
        </Button>
        <Button 
          variant="outline" 
          leftIcon={<Text>🧠</Text>}
          onClick={() => strategicInitiatives.length > 0 && startCoachingSession(strategicInitiatives[0])}
          isDisabled={strategicInitiatives.length === 0}
        >
          Start Strategic Coaching
        </Button>
      </HStack>

      {/* Strategic Initiatives Table */}
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Strategic Initiatives Portfolio</Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Initiative</Th>
                <Th>Strategic Lens</Th>
                <Th>Uniqueness Score</Th>
                <Th>Estimated ROI</Th>
                <Th>Timeframe</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {strategicInitiatives.map(initiative => (
                <Tr key={initiative.id}>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">{initiative.title}</Text>
                      <Text fontSize="sm" color="gray.600" noOfLines={2}>
                        {initiative.description}
                      </Text>
                      <Badge colorScheme="purple" size="sm">
                        {initiative.category.replace('_', ' ')}
                      </Badge>
                    </VStack>
                  </Td>
                  <Td>
                    <Badge 
                      colorScheme={
                        initiative.strategic_lens === 'blue_ocean' ? 'blue' :
                        initiative.strategic_lens === 'porter_forces' ? 'green' :
                        'purple'
                      }
                    >
                      {initiative.strategic_lens.replace('_', ' ')}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack>
                      <CircularProgress 
                        value={initiative.uniqueness_score * 10} 
                        size="40px" 
                        color={initiative.uniqueness_score >= 8 ? 'green.400' : initiative.uniqueness_score >= 6 ? 'blue.400' : 'orange.400'}
                      >
                        <CircularProgressLabel fontSize="xs">
                          {initiative.uniqueness_score.toFixed(1)}
                        </CircularProgressLabel>
                      </CircularProgress>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontWeight="bold" color={initiative.estimated_roi >= 100 ? 'green.500' : 'blue.500'}>
                      {initiative.estimated_roi}%
                    </Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      initiative.timeframe === 'short_term' ? 'green' :
                      initiative.timeframe === 'medium_term' ? 'blue' : 'orange'
                    }>
                      {initiative.timeframe.replace('_', ' ')}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      initiative.status === 'completed' ? 'green' :
                      initiative.status === 'in_progress' ? 'blue' :
                      initiative.status === 'approved' ? 'purple' : 'gray'
                    }>
                      {initiative.status.replace('_', ' ')}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack>
                      <IconButton
                        aria-label="Start Coaching"
                        icon={<Text>🧠</Text>}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => startCoachingSession(initiative)}
                      />
                      <IconButton
                        aria-label="View Details"
                        icon={<Text>👁️</Text>}
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedInitiative(initiative)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {strategicInitiatives.length === 0 && (
            <Alert status="info" mt={4}>
              <AlertIcon />
              <Text>No strategic initiatives yet. Create your first initiative to begin strategic transformation coaching.</Text>
            </Alert>
          )}
        </CardBody>
      </Card>
    </VStack>
  );

  const renderCoachingInterface = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          AI-powered strategic transformation coaching using Blue Ocean principles and Porter's competitive framework. 
          Interactive guidance to define goals, analyze competitive forces, and create unique market positions.
        </Text>
      </Alert>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <Card bg={infoBg}>
          <CardHeader>
            <Text fontSize="md" fontWeight="bold">🌊 Blue Ocean Coaching</Text>
          </CardHeader>
          <CardBody>
            <Text fontSize="sm" mb={4}>
              Explore value innovation opportunities and market creation strategies
            </Text>
            <VStack spacing={3} align="stretch">
              {coachingQuestions.buyer_utility.slice(0, 2).map((question, index) => (
                <Box key={index} p={3} bg="white" borderRadius="md" border="1px solid" borderColor={borderColor}>
                  <Text fontSize="sm">{question}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card bg={successBg}>
          <CardHeader>
            <Text fontSize="md" fontWeight="bold">⚔️ Competitive Analysis</Text>
          </CardHeader>
          <CardBody>
            <Text fontSize="sm" mb={4}>
              Analyze competitive forces and strategic positioning
            </Text>
            <VStack spacing={3} align="stretch">
              {coachingQuestions.competitive_forces.slice(0, 2).map((question, index) => (
                <Box key={index} p={3} bg="white" borderRadius="md" border="1px solid" borderColor={borderColor}>
                  <Text fontSize="sm">{question}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Interactive Strategic Coaching Session</Text>
        </CardHeader>
        <CardBody>
          <Alert status="info">
            <AlertIcon />
            <Text>Advanced interactive coaching interface with AI-powered guidance coming soon. Complete your first initiative to unlock guided strategic transformation.</Text>
          </Alert>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">🎯</Text>
            <Text fontSize="3xl" fontWeight="bold">Strategic Planning Module</Text>
            <Badge colorScheme="green" ml={2}>AI-POWERED COACHING</Badge>
          </HStack>
          <Text color="gray.600" mb={6}>
            Strategic transformation coach powered by Blue Ocean principles and Porter's competitive forces. 
            Define goals, analyze market opportunities, and create unique strategic positions with AI guidance.
          </Text>
        </Box>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Strategic Dashboard</Tab>
            <Tab>AI Coaching Interface</Tab>
            <Tab>Initiative Analysis</Tab>
            <Tab>Implementation Planning</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderStrategicDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              {renderCoachingInterface()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Deep initiative analysis with Porter's Five Forces integration and Blue Ocean value curve mapping coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Implementation planning with phase-by-phase execution roadmaps and risk mitigation strategies coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* New Initiative Modal */}
        <Modal isOpen={isNewInitiativeOpen} onClose={onNewInitiativeClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Strategic Initiative</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Initiative Title</FormLabel>
                  <Input
                    value={newInitiativeForm.title}
                    onChange={(e) => setNewInitiativeForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter strategic initiative title..."
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={newInitiativeForm.description}
                    onChange={(e) => setNewInitiativeForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your strategic initiative..."
                    rows={3}
                  />
                </FormControl>
                <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={newInitiativeForm.category}
                      onChange={(e) => setNewInitiativeForm(prev => ({ ...prev, category: e.target.value as any }))}
                    >
                      <option value="value_innovation">Value Innovation</option>
                      <option value="market_creation">Market Creation</option>
                      <option value="competitive_positioning">Competitive Positioning</option>
                      <option value="cost_optimization">Cost Optimization</option>
                      <option value="differentiation">Differentiation</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Strategic Lens</FormLabel>
                    <Select
                      value={newInitiativeForm.strategic_lens}
                      onChange={(e) => setNewInitiativeForm(prev => ({ ...prev, strategic_lens: e.target.value as any }))}
                    >
                      <option value="blue_ocean">Blue Ocean</option>
                      <option value="porter_forces">Porter's Forces</option>
                      <option value="hybrid">Hybrid Approach</option>
                      <option value="resource_based">Resource-Based</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Timeframe</FormLabel>
                    <Select
                      value={newInitiativeForm.timeframe}
                      onChange={(e) => setNewInitiativeForm(prev => ({ ...prev, timeframe: e.target.value as any }))}
                    >
                      <option value="short_term">Short Term (3-6 months)</option>
                      <option value="medium_term">Medium Term (6-18 months)</option>
                      <option value="long_term">Long Term (18+ months)</option>
                    </Select>
                  </FormControl>
                </Grid>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onNewInitiativeClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="blue" 
                onClick={createNewInitiative}
                isDisabled={!newInitiativeForm.title || !newInitiativeForm.description}
              >
                Create Initiative
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default StrategicPlanningModule;