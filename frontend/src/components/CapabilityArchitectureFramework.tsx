import React, { useState, useRef } from 'react';
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  IconButton,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Tooltip,
  Stack,
  Checkbox,
  RadioGroup,
  Radio,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';

// Core data structures
interface Capability {
  id: string;
  name: string;
  description: string;
  category: 'primary' | 'support';
  valueChainActivity: ValueChainActivity;
  currentLevel: number; // 1-5 scale
  targetLevel: number; // 1-5 scale
  strategicImportance: 'critical' | 'high' | 'medium' | 'low';
  competitiveAdvantage: 'distinctive' | 'competitive' | 'parity' | 'disadvantage';
  owner: string;
  resources: Resource[];
  processes: Process[];
  gaps: string[];
  dependencies: string[];
}

interface Resource {
  id: string;
  name: string;
  type: 'human' | 'financial' | 'physical' | 'technological' | 'organizational';
  quality: number; // 1-5 scale
  availability: number; // 1-5 scale
  cost: number;
  strategicValue: 'high' | 'medium' | 'low';
}

interface Process {
  id: string;
  name: string;
  efficiency: number; // 1-5 scale
  effectiveness: number; // 1-5 scale
  maturity: 'ad-hoc' | 'defined' | 'managed' | 'optimized';
  digitization: number; // 1-5 scale
}

type ValueChainActivity = 
  | 'inbound-logistics' | 'operations' | 'outbound-logistics' | 'marketing-sales' | 'service'
  | 'firm-infrastructure' | 'hr-management' | 'technology-development' | 'procurement';

type ERRCAction = 'eliminate' | 'reduce' | 'raise' | 'create';

interface ERRCRecommendation {
  id: string;
  action: ERRCAction;
  capability: string;
  rationale: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  timeline: string;
  owner: string;
  resources: number; // investment required
  strategicAlignment: string;
}

interface CapabilityGap {
  id: string;
  capability: string;
  currentState: string;
  desiredState: string;
  gapSize: 'large' | 'medium' | 'small';
  priority: 'critical' | 'high' | 'medium' | 'low';
  rootCause: string;
  recommendations: string[];
}

interface DecisionMatrix {
  id: string;
  capability: string;
  strategicValue: number; // 1-5
  implementationEase: number; // 1-5
  competitiveImpact: number; // 1-5
  resourceRequirement: number; // 1-5 (reverse scored)
  riskLevel: number; // 1-5 (reverse scored)
  totalScore: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  owner: string;
  timeline: string;
}

interface CapabilityAnalysis {
  id: string;
  organizationName: string;
  strategicGoals: string[];
  valueChainActivities: { [key in ValueChainActivity]: Capability[] };
  errcRecommendations: ERRCRecommendation[];
  capabilityGaps: CapabilityGap[];
  decisionMatrix: DecisionMatrix[];
  lastUpdated: Date;
}

// Porter's Value Chain structure
const VALUE_CHAIN_ACTIVITIES = {
  primary: [
    { 
      key: 'inbound-logistics' as ValueChainActivity, 
      name: 'Inbound Logistics', 
      description: 'Receiving, storing, inventory management',
      icon: '📦',
      color: 'blue'
    },
    { 
      key: 'operations' as ValueChainActivity, 
      name: 'Operations', 
      description: 'Production, manufacturing, service delivery',
      icon: '⚙️',
      color: 'green'
    },
    { 
      key: 'outbound-logistics' as ValueChainActivity, 
      name: 'Outbound Logistics', 
      description: 'Distribution, delivery, order fulfillment',
      icon: '🚚',
      color: 'orange'
    },
    { 
      key: 'marketing-sales' as ValueChainActivity, 
      name: 'Marketing & Sales', 
      description: 'Promotion, selling, customer acquisition',
      icon: '📈',
      color: 'purple'
    },
    { 
      key: 'service' as ValueChainActivity, 
      name: 'Service', 
      description: 'Customer support, maintenance, training',
      icon: '🛠️',
      color: 'teal'
    }
  ],
  support: [
    { 
      key: 'firm-infrastructure' as ValueChainActivity, 
      name: 'Firm Infrastructure', 
      description: 'Management, finance, legal, quality',
      icon: '🏢',
      color: 'gray'
    },
    { 
      key: 'hr-management' as ValueChainActivity, 
      name: 'Human Resource Management', 
      description: 'Recruiting, training, development, compensation',
      icon: '👥',
      color: 'pink'
    },
    { 
      key: 'technology-development' as ValueChainActivity, 
      name: 'Technology Development', 
      description: 'R&D, product design, process improvement',
      icon: '🔬',
      color: 'cyan'
    },
    { 
      key: 'procurement' as ValueChainActivity, 
      name: 'Procurement', 
      description: 'Purchasing, supplier management, sourcing',
      icon: '🛒',
      color: 'yellow'
    }
  ]
};

// ERRC Framework structure
const ERRC_ACTIONS = [
  {
    action: 'eliminate' as ERRCAction,
    name: 'Eliminate',
    description: 'Remove capabilities that add cost but little value',
    icon: '🗑️',
    color: 'red',
    questions: [
      'Which capabilities should be eliminated?',
      'What factors has your industry taken for granted that should be eliminated?',
      'Which capabilities drain resources without strategic value?'
    ]
  },
  {
    action: 'reduce' as ERRCAction,
    name: 'Reduce',
    description: 'Scale down over-engineered capabilities',
    icon: '📉',
    color: 'orange',
    questions: [
      'Which capabilities should be reduced well below industry standard?',
      'Where are you over-investing relative to customer value?',
      'Which capabilities create unnecessary complexity?'
    ]
  },
  {
    action: 'raise' as ERRCAction,
    name: 'Raise',
    description: 'Enhance capabilities above industry standard',
    icon: '📈',
    color: 'green',
    questions: [
      'Which capabilities should be raised well above industry standard?',
      'Where can you create exceptional customer value?',
      'Which capabilities differentiate you from competitors?'
    ]
  },
  {
    action: 'create' as ERRCAction,
    name: 'Create',
    description: 'Develop entirely new capabilities',
    icon: '🚀',
    color: 'blue',
    questions: [
      'Which capabilities should be created that your industry has never offered?',
      'What new sources of value can you unlock?',
      'Which emerging capabilities will define future competition?'
    ]
  }
];

// Sample capability templates
const CAPABILITY_TEMPLATES = [
  {
    name: 'Digital Customer Experience',
    description: 'End-to-end digital customer journey optimization',
    category: 'primary' as const,
    valueChainActivity: 'marketing-sales' as ValueChainActivity,
    strategicImportance: 'critical' as const
  },
  {
    name: 'Data Analytics & AI',
    description: 'Advanced analytics, machine learning, and AI capabilities',
    category: 'support' as const,
    valueChainActivity: 'technology-development' as ValueChainActivity,
    strategicImportance: 'high' as const
  },
  {
    name: 'Agile Product Development',
    description: 'Rapid product iteration and time-to-market optimization',
    category: 'primary' as const,
    valueChainActivity: 'operations' as ValueChainActivity,
    strategicImportance: 'high' as const
  },
  {
    name: 'Strategic Partnership Management',
    description: 'Alliance development and ecosystem orchestration',
    category: 'support' as const,
    valueChainActivity: 'procurement' as ValueChainActivity,
    strategicImportance: 'medium' as const
  }
];

const CapabilityArchitectureFramework: React.FC = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState<CapabilityAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<ValueChainActivity>('operations');
  const [editMode, setEditMode] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'value-chain' | 'errc' | 'gaps' | 'matrix'>('value-chain');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Initialize new capability analysis
  const initializeNewAnalysis = () => {
    const newAnalysis: CapabilityAnalysis = {
      id: `analysis_${Date.now()}`,
      organizationName: 'My Organization',
      strategicGoals: [],
      valueChainActivities: {} as { [key in ValueChainActivity]: Capability[] },
      errcRecommendations: [],
      capabilityGaps: [],
      decisionMatrix: [],
      lastUpdated: new Date()
    };

    // Initialize empty arrays for each value chain activity
    Object.values(VALUE_CHAIN_ACTIVITIES.primary.concat(VALUE_CHAIN_ACTIVITIES.support))
      .forEach(activity => {
        newAnalysis.valueChainActivities[activity.key] = [];
      });

    setCurrentAnalysis(newAnalysis);
    setEditMode(true);
  };

  // Porter's Value Chain Analysis Component
  const ValueChainAnalysis = () => {
    const addCapability = (activityKey: ValueChainActivity) => {
      if (!currentAnalysis) return;

      const newCapability: Capability = {
        id: `capability_${Date.now()}`,
        name: 'New Capability',
        description: 'Capability description',
        category: VALUE_CHAIN_ACTIVITIES.primary.find(a => a.key === activityKey) ? 'primary' : 'support',
        valueChainActivity: activityKey,
        currentLevel: 3,
        targetLevel: 4,
        strategicImportance: 'medium',
        competitiveAdvantage: 'parity',
        owner: 'TBD',
        resources: [],
        processes: [],
        gaps: [],
        dependencies: []
      };

      const updatedActivities = { ...currentAnalysis.valueChainActivities };
      updatedActivities[activityKey] = [...updatedActivities[activityKey], newCapability];

      setCurrentAnalysis({
        ...currentAnalysis,
        valueChainActivities: updatedActivities
      });
    };

    const getCapabilityColor = (advantage: string) => {
      switch (advantage) {
        case 'distinctive': return 'green';
        case 'competitive': return 'blue';
        case 'parity': return 'yellow';
        case 'disadvantage': return 'red';
        default: return 'gray';
      }
    };

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">🔗 Porter's Value Chain Analysis</Text>
              <Text fontSize="sm" color="gray.500">Map capabilities across primary and support activities</Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={6}>
              {/* Support Activities */}
              <Card w="100%" bg="gray.50" border="2px solid" borderColor="gray.200">
                <CardHeader bg="gray.100">
                  <Text fontWeight="bold" color="gray.700">🏗️ Support Activities</Text>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                    {VALUE_CHAIN_ACTIVITIES.support.map((activity) => (
                      <Card 
                        key={activity.key}
                        cursor="pointer"
                        onClick={() => setSelectedActivity(activity.key)}
                        border={selectedActivity === activity.key ? '2px solid' : '1px solid'}
                        borderColor={selectedActivity === activity.key ? `${activity.color}.400` : 'gray.200'}
                        bg={selectedActivity === activity.key ? `${activity.color}.50` : 'white'}
                        _hover={{ shadow: 'md' }}
                      >
                        <CardBody textAlign="center" p={3}>
                          <Text fontSize="xl" mb={2}>{activity.icon}</Text>
                          <Text fontSize="xs" fontWeight="semibold" mb={1}>{activity.name}</Text>
                          <Badge colorScheme={activity.color} variant="subtle" fontSize="xs">
                            {currentAnalysis?.valueChainActivities[activity.key]?.length || 0} capabilities
                          </Badge>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </CardBody>
              </Card>

              {/* Primary Activities */}
              <Card w="100%" bg="blue.50" border="2px solid" borderColor="blue.200">
                <CardHeader bg="blue.100">
                  <Text fontWeight="bold" color="blue.700">⚡ Primary Activities</Text>
                </CardHeader>
                <CardBody>
                  <HStack spacing={4} justify="center">
                    {VALUE_CHAIN_ACTIVITIES.primary.map((activity) => (
                      <Card 
                        key={activity.key}
                        cursor="pointer"
                        onClick={() => setSelectedActivity(activity.key)}
                        border={selectedActivity === activity.key ? '2px solid' : '1px solid'}
                        borderColor={selectedActivity === activity.key ? `${activity.color}.400` : 'gray.200'}
                        bg={selectedActivity === activity.key ? `${activity.color}.50` : 'white'}
                        _hover={{ shadow: 'md' }}
                        minW="140px"
                      >
                        <CardBody textAlign="center" p={3}>
                          <Text fontSize="xl" mb={2}>{activity.icon}</Text>
                          <Text fontSize="xs" fontWeight="semibold" mb={1}>{activity.name}</Text>
                          <Badge colorScheme={activity.color} variant="subtle" fontSize="xs">
                            {currentAnalysis?.valueChainActivities[activity.key]?.length || 0} capabilities
                          </Badge>
                        </CardBody>
                      </Card>
                    ))}
                  </HStack>
                </CardBody>
              </Card>
            </VStack>
          </CardBody>
        </Card>

        {/* Selected Activity Details */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <HStack>
                  <Text fontSize="xl">
                    {[...VALUE_CHAIN_ACTIVITIES.primary, ...VALUE_CHAIN_ACTIVITIES.support]
                      .find(a => a.key === selectedActivity)?.icon}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {[...VALUE_CHAIN_ACTIVITIES.primary, ...VALUE_CHAIN_ACTIVITIES.support]
                      .find(a => a.key === selectedActivity)?.name}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {[...VALUE_CHAIN_ACTIVITIES.primary, ...VALUE_CHAIN_ACTIVITIES.support]
                    .find(a => a.key === selectedActivity)?.description}
                </Text>
              </VStack>
              {editMode && (
                <Button size="sm" colorScheme="teal" onClick={() => addCapability(selectedActivity)}>
                  + Add Capability
                </Button>
              )}
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {currentAnalysis?.valueChainActivities[selectedActivity]?.map((capability) => (
                <Card key={capability.id} w="100%" variant="outline">
                  <CardBody>
                    <Grid templateColumns="2fr 1fr 1fr 1fr" gap={4} alignItems="center">
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontWeight="semibold">{capability.name}</Text>
                          <Badge 
                            colorScheme={getCapabilityColor(capability.competitiveAdvantage)}
                            variant="subtle"
                          >
                            {capability.competitiveAdvantage}
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">{capability.description}</Text>
                        <HStack>
                          <Badge variant="outline">{capability.strategicImportance} importance</Badge>
                          <Badge variant="outline">{capability.owner}</Badge>
                        </HStack>
                      </VStack>
                      
                      <VStack spacing={1}>
                        <Text fontSize="xs" color="gray.500">Current Level</Text>
                        <Progress value={capability.currentLevel * 20} colorScheme="blue" size="sm" w="100%" />
                        <Text fontSize="xs">{capability.currentLevel}/5</Text>
                      </VStack>
                      
                      <VStack spacing={1}>
                        <Text fontSize="xs" color="gray.500">Target Level</Text>
                        <Progress value={capability.targetLevel * 20} colorScheme="green" size="sm" w="100%" />
                        <Text fontSize="xs">{capability.targetLevel}/5</Text>
                      </VStack>
                      
                      <VStack spacing={1}>
                        <Text fontSize="xs" color="gray.500">Gap</Text>
                        <Badge 
                          colorScheme={
                            capability.targetLevel - capability.currentLevel > 1 ? 'red' :
                            capability.targetLevel - capability.currentLevel > 0 ? 'yellow' : 'green'
                          }
                        >
                          {capability.targetLevel - capability.currentLevel > 0 ? '+' : ''}{capability.targetLevel - capability.currentLevel}
                        </Badge>
                      </VStack>
                    </Grid>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Capability Architect Questions:</Text>
            <Text fontSize="sm">
              • Which capabilities are distinctive vs. at parity with competitors?
              • Where do you have the biggest gaps between current and target state?
              • Which capabilities are most critical to your strategic goals?
              • How do your capabilities create competitive advantage?
            </Text>
          </VStack>
        </Alert>
      </VStack>
    );
  };

  // ERRC Analysis Component
  const ERRCAnalysis = () => {
    const [selectedAction, setSelectedAction] = useState<ERRCAction>('eliminate');

    const addERRCRecommendation = () => {
      if (!currentAnalysis) return;

      const newRecommendation: ERRCRecommendation = {
        id: `errc_${Date.now()}`,
        action: selectedAction,
        capability: 'Capability Name',
        rationale: 'Strategic rationale',
        impact: 'medium',
        effort: 'medium',
        timeline: '6 months',
        owner: 'TBD',
        resources: 0,
        strategicAlignment: 'Strategic goal alignment'
      };

      setCurrentAnalysis({
        ...currentAnalysis,
        errcRecommendations: [...currentAnalysis.errcRecommendations, newRecommendation]
      });
    };

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">🌊 Blue Ocean ERRC Grid</Text>
              <Text fontSize="sm" color="gray.500">Eliminate • Reduce • Raise • Create</Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {ERRC_ACTIONS.map((action) => (
                <Card
                  key={action.action}
                  cursor="pointer"
                  onClick={() => setSelectedAction(action.action)}
                  border={selectedAction === action.action ? '2px solid' : '1px solid'}
                  borderColor={selectedAction === action.action ? `${action.color}.400` : 'gray.200'}
                  bg={selectedAction === action.action ? `${action.color}.50` : 'white'}
                  _hover={{ shadow: 'md' }}
                >
                  <CardHeader textAlign="center" pb={2}>
                    <Text fontSize="2xl" mb={2}>{action.icon}</Text>
                    <Text fontWeight="bold" color={`${action.color}.700`}>{action.name}</Text>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={2}>
                      <Text fontSize="xs" color="gray.600" textAlign="center">
                        {action.description}
                      </Text>
                      <Badge colorScheme={action.color} variant="subtle">
                        {currentAnalysis?.errcRecommendations.filter(r => r.action === action.action).length || 0} items
                      </Badge>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </CardBody>
        </Card>

        {/* Selected ERRC Action Details */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <HStack>
                  <Text fontSize="xl">
                    {ERRC_ACTIONS.find(a => a.action === selectedAction)?.icon}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color={`${ERRC_ACTIONS.find(a => a.action === selectedAction)?.color}.700`}>
                    {ERRC_ACTIONS.find(a => a.action === selectedAction)?.name}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {ERRC_ACTIONS.find(a => a.action === selectedAction)?.description}
                </Text>
              </VStack>
              {editMode && (
                <Button size="sm" colorScheme={ERRC_ACTIONS.find(a => a.action === selectedAction)?.color} onClick={addERRCRecommendation}>
                  + Add Recommendation
                </Button>
              )}
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {/* Guiding Questions */}
              <Alert status="info" w="100%">
                <AlertIcon />
                <VStack align="start" spacing={1} w="100%">
                  <Text fontWeight="semibold">Key Questions for {ERRC_ACTIONS.find(a => a.action === selectedAction)?.name}:</Text>
                  {ERRC_ACTIONS.find(a => a.action === selectedAction)?.questions.map((question, index) => (
                    <Text key={index} fontSize="sm">• {question}</Text>
                  ))}
                </VStack>
              </Alert>

              {/* Recommendations List */}
              <VStack spacing={3} w="100%">
                {currentAnalysis?.errcRecommendations
                  .filter(rec => rec.action === selectedAction)
                  .map((recommendation) => (
                    <Card key={recommendation.id} w="100%" variant="outline">
                      <CardBody>
                        <Grid templateColumns="2fr 1fr 1fr 1fr" gap={4} alignItems="center">
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="semibold">{recommendation.capability}</Text>
                            <Text fontSize="sm" color="gray.600">{recommendation.rationale}</Text>
                            <Text fontSize="xs" color="gray.500">{recommendation.strategicAlignment}</Text>
                          </VStack>
                          
                          <VStack spacing={1}>
                            <Text fontSize="xs" color="gray.500">Impact</Text>
                            <Badge 
                              colorScheme={
                                recommendation.impact === 'high' ? 'green' :
                                recommendation.impact === 'medium' ? 'yellow' : 'red'
                              }
                            >
                              {recommendation.impact}
                            </Badge>
                          </VStack>
                          
                          <VStack spacing={1}>
                            <Text fontSize="xs" color="gray.500">Effort</Text>
                            <Badge 
                              colorScheme={
                                recommendation.effort === 'low' ? 'green' :
                                recommendation.effort === 'medium' ? 'yellow' : 'red'
                              }
                            >
                              {recommendation.effort}
                            </Badge>
                          </VStack>
                          
                          <VStack spacing={1}>
                            <Text fontSize="xs" color="gray.500">Owner</Text>
                            <Text fontSize="sm" fontWeight="semibold">{recommendation.owner}</Text>
                            <Text fontSize="xs">{recommendation.timeline}</Text>
                          </VStack>
                        </Grid>
                      </CardBody>
                    </Card>
                  ))}
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // Decision Matrix Component
  const DecisionMatrixAnalysis = () => {
    const calculatePriority = (matrix: DecisionMatrix): 'critical' | 'high' | 'medium' | 'low' => {
      if (matrix.totalScore >= 18) return 'critical';
      if (matrix.totalScore >= 15) return 'high';
      if (matrix.totalScore >= 12) return 'medium';
      return 'low';
    };

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'critical': return 'red';
        case 'high': return 'orange';
        case 'medium': return 'yellow';
        case 'low': return 'green';
        default: return 'gray';
      }
    };

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">📊 Capability Decision Matrix</Text>
              <Text fontSize="sm" color="gray.500">Priority ranking with multi-criteria analysis</Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <Alert status="info" mb={4}>
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Decision Criteria (1-5 scale):</Text>
                <Text fontSize="sm">
                  • <strong>Strategic Value</strong>: Alignment with strategic goals and competitive advantage
                  • <strong>Implementation Ease</strong>: Feasibility and complexity of development
                  • <strong>Competitive Impact</strong>: Potential to create differentiation
                  • <strong>Resource Requirement</strong>: Investment needed (reverse scored)
                  • <strong>Risk Level</strong>: Implementation and market risks (reverse scored)
                </Text>
              </VStack>
            </Alert>

            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Capability</Th>
                  <Th textAlign="center">Strategic Value</Th>
                  <Th textAlign="center">Implementation Ease</Th>
                  <Th textAlign="center">Competitive Impact</Th>
                  <Th textAlign="center">Resource Req.</Th>
                  <Th textAlign="center">Risk Level</Th>
                  <Th textAlign="center">Total Score</Th>
                  <Th textAlign="center">Priority</Th>
                  <Th>Owner</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentAnalysis?.decisionMatrix
                  .sort((a, b) => b.totalScore - a.totalScore)
                  .map((matrix) => (
                    <Tr key={matrix.id}>
                      <Td>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="semibold" fontSize="sm">{matrix.capability}</Text>
                          <Text fontSize="xs" color="gray.500">{matrix.timeline}</Text>
                        </VStack>
                      </Td>
                      <Td textAlign="center">
                        <Badge colorScheme="blue" variant="outline">{matrix.strategicValue}</Badge>
                      </Td>
                      <Td textAlign="center">
                        <Badge colorScheme="green" variant="outline">{matrix.implementationEase}</Badge>
                      </Td>
                      <Td textAlign="center">
                        <Badge colorScheme="purple" variant="outline">{matrix.competitiveImpact}</Badge>
                      </Td>
                      <Td textAlign="center">
                        <Badge colorScheme="orange" variant="outline">{6 - matrix.resourceRequirement}</Badge>
                      </Td>
                      <Td textAlign="center">
                        <Badge colorScheme="red" variant="outline">{6 - matrix.riskLevel}</Badge>
                      </Td>
                      <Td textAlign="center">
                        <Text fontWeight="bold" fontSize="lg">{matrix.totalScore}</Text>
                      </Td>
                      <Td textAlign="center">
                        <Badge colorScheme={getPriorityColor(matrix.priority)} variant="solid">
                          {matrix.priority}
                        </Badge>
                      </Td>
                      <Td>
                        <Text fontSize="sm" fontWeight="semibold">{matrix.owner}</Text>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>

            {(!currentAnalysis?.decisionMatrix || currentAnalysis.decisionMatrix.length === 0) && (
              <Box textAlign="center" py={8}>
                <Text color="gray.500">No capabilities in decision matrix yet.</Text>
                <Text fontSize="sm" color="gray.400">Add capabilities through Value Chain or ERRC analysis.</Text>
              </Box>
            )}
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🎯 Implementation Roadmap</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <Card bg="red.50" border="1px solid" borderColor="red.200">
                <CardHeader bg="red.100" py={2}>
                  <Text fontWeight="bold" color="red.700" fontSize="sm">🚨 Critical Priority</Text>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={2}>
                    {currentAnalysis?.decisionMatrix
                      .filter(m => m.priority === 'critical')
                      .map(m => (
                        <Text key={m.id} fontSize="xs">{m.capability}</Text>
                      ))}
                  </VStack>
                </CardBody>
              </Card>

              <Card bg="orange.50" border="1px solid" borderColor="orange.200">
                <CardHeader bg="orange.100" py={2}>
                  <Text fontWeight="bold" color="orange.700" fontSize="sm">🔥 High Priority</Text>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={2}>
                    {currentAnalysis?.decisionMatrix
                      .filter(m => m.priority === 'high')
                      .map(m => (
                        <Text key={m.id} fontSize="xs">{m.capability}</Text>
                      ))}
                  </VStack>
                </CardBody>
              </Card>

              <Card bg="yellow.50" border="1px solid" borderColor="yellow.200">
                <CardHeader bg="yellow.100" py={2}>
                  <Text fontWeight="bold" color="yellow.700" fontSize="sm">⚡ Medium Priority</Text>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={2}>
                    {currentAnalysis?.decisionMatrix
                      .filter(m => m.priority === 'medium')
                      .map(m => (
                        <Text key={m.id} fontSize="xs">{m.capability}</Text>
                      ))}
                  </VStack>
                </CardBody>
              </Card>

              <Card bg="green.50" border="1px solid" borderColor="green.200">
                <CardHeader bg="green.100" py={2}>
                  <Text fontWeight="bold" color="green.700" fontSize="sm">🟢 Low Priority</Text>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={2}>
                    {currentAnalysis?.decisionMatrix
                      .filter(m => m.priority === 'low')
                      .map(m => (
                        <Text key={m.id} fontSize="xs">{m.capability}</Text>
                      ))}
                  </VStack>
                </CardBody>
              </Card>
            </Grid>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // Main render functions
  const renderAnalysisSelection = () => (
    <VStack spacing={6}>
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          🏗️ Capability Architecture Framework
        </Text>
        <Text fontSize="lg" color="gray.600" mb={4}>
          Strategic capability analysis using Porter's Value Chain and Blue Ocean ERRC
        </Text>
        <Text fontSize="sm" color="gray.500">
          Compare resources and processes with strategic goals, optimize capability portfolio
        </Text>
      </Box>

      <Card bg={cardBg} w="100%">
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">🚀 Start New Capability Analysis</Text>
            <Button colorScheme="teal" onClick={initializeNewAnalysis}>
              + New Analysis
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {CAPABILITY_TEMPLATES.map((template) => (
              <Card 
                key={template.name}
                cursor="pointer"
                onClick={initializeNewAnalysis}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
                border="1px solid"
                borderColor="gray.200"
              >
                <CardHeader>
                  <HStack justify="space-between">
                    <Text fontWeight="bold">{template.name}</Text>
                    <Badge colorScheme={template.category === 'primary' ? 'blue' : 'green'}>
                      {template.category}
                    </Badge>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Text fontSize="sm" color="gray.600">
                      {template.description}
                    </Text>
                    <HStack>
                      <Badge variant="outline">{template.strategicImportance} importance</Badge>
                      <Badge variant="outline">{template.valueChainActivity}</Badge>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </CardBody>
      </Card>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Capability Architect Approach:</Text>
          <Text fontSize="sm">
            • Start with Porter's Value Chain to map current capabilities across activities
            • Use Blue Ocean ERRC grid to identify what to Eliminate, Reduce, Raise, and Create
            • Assess gaps between current and target capability levels
            • Build decision matrix with strategic value, implementation ease, and resource requirements
            • Prioritize capabilities and assign ownership for implementation
          </Text>
        </VStack>
      </Alert>
    </VStack>
  );

  const renderCapabilityAnalysis = () => (
    <VStack spacing={6}>
      <Card bg={cardBg} w="100%">
        <CardHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">{currentAnalysis?.organizationName}</Text>
              <Text color="gray.500">Capability Architecture Analysis</Text>
            </VStack>
            <HStack>
              <Button 
                variant="outline" 
                colorScheme={editMode ? 'red' : 'blue'} 
                onClick={() => setEditMode(!editMode)}
                size="sm"
              >
                {editMode ? 'View Mode' : 'Edit Mode'}
              </Button>
              <Button variant="outline" onClick={() => setCurrentAnalysis(null)} size="sm">
                ← Back
              </Button>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Tabs index={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>🔗 Value Chain</Tab>
              <Tab>🌊 ERRC Grid</Tab>
              <Tab>📊 Decision Matrix</Tab>
            </TabList>
            <TabPanels>
              <TabPanel><ValueChainAnalysis /></TabPanel>
              <TabPanel><ERRCAnalysis /></TabPanel>
              <TabPanel><DecisionMatrixAnalysis /></TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} maxW="7xl" mx="auto">
        {currentAnalysis ? renderCapabilityAnalysis() : renderAnalysisSelection()}
      </VStack>
    </Box>
  );
};

export default CapabilityArchitectureFramework;