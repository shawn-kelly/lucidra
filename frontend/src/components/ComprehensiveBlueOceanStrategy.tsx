import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Badge,
  Progress,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Alert,
  AlertIcon,
  IconButton,
  Tooltip,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';

// Blue Ocean Strategy Framework Interfaces
interface BlueOceanProfile {
  id: string;
  companyName: string;
  industry: string;
  currentPosition: string;
  strategicGoal: string;
  completedFrameworks: string[];
  createdAt: string;
  updatedAt: string;
}

interface HumannessCheck {
  factors: {
    name: string;
    currentLevel: number; // 1-10
    desiredLevel: number; // 1-10
    importance: number; // 1-5
    actionItems: string[];
  }[];
  overallScore: number;
  humannessPriorities: string[];
}

interface AsIsCanvas {
  eliminate: string[];
  reduce: string[];
  raise: string[];
  create: string[];
  reasoning: { [key: string]: string };
  impactAssessment: { [key: string]: number };
}

interface ToBeCanvas {
  eliminate: string[];
  reduce: string[];
  raise: string[];
  create: string[];
  reasoning: { [key: string]: string };
  valueCurve: { [key: string]: number };
  differentiation: string[];
  costAdvantages: string[];
}

interface SixPathsAnalysis {
  paths: {
    id: string;
    name: string;
    currentApproach: string;
    alternativeIndustries: string[];
    strategicGroups: string[];
    buyerGroups: string[];
    complementaryOfferings: string[];
    functionalEmotionalOrientation: string;
    timeHorizon: string;
    opportunities: string[];
    feasibility: number;
    impact: number;
    priorityScore: number;
  }[];
  selectedPaths: string[];
  synthesizedStrategy: string;
}

interface BuyerUtilityMap {
  stages: {
    stage: string;
    utilities: {
      customerProductivity: number;
      simplicity: number;
      convenience: number;
      risk: number;
      funAndImage: number;
      environmentalFriendliness: number;
    };
    painPoints: string[];
    opportunityAreas: string[];
    solutionIdeas: string[];
  }[];
  overallUtilityScore: number;
  priorityUtilities: string[];
}

interface StrategyFair {
  stakeholderGroups: {
    group: string;
    concerns: string[];
    benefits: string[];
    supportLevel: number; // 1-10
    influenceLevel: number; // 1-10
    engagementPlan: string;
    feedbackReceived: string[];
  }[];
  fairnessAssessment: number;
  adoptionReadiness: number;
  riskMitigation: string[];
}

interface TippingPointLeadership {
  organizationalHurdles: {
    type: 'cognitive' | 'resource' | 'motivational' | 'political';
    description: string;
    severity: number; // 1-10
    approach: string;
    keyInfluencers: string[];
    actionPlan: string[];
    timeline: string;
    success_metrics: string[];
  }[];
  executionPlan: {
    phase: string;
    duration: string;
    keyActivities: string[];
    resources: string[];
    milestones: string[];
    risks: string[];
  }[];
  changeReadiness: number;
}

const ComprehensiveBlueOceanStrategy: React.FC = () => {
  const [activeFramework, setActiveFramework] = useState(0);
  const [blueOceanProfile, setBlueOceanProfile] = useState<BlueOceanProfile>({
    id: '1',
    companyName: '',
    industry: '',
    currentPosition: '',
    strategicGoal: '',
    completedFrameworks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  // Framework Data States
  const [humannessCheck, setHumannessCheck] = useState<HumannessCheck>({
    factors: [
      { name: 'Customer Empathy', currentLevel: 5, desiredLevel: 9, importance: 5, actionItems: [] },
      { name: 'Innovation Culture', currentLevel: 6, desiredLevel: 9, importance: 4, actionItems: [] },
      { name: 'Market Understanding', currentLevel: 7, desiredLevel: 9, importance: 5, actionItems: [] },
      { name: 'Organizational Agility', currentLevel: 5, desiredLevel: 8, importance: 4, actionItems: [] },
      { name: 'Value Creation Focus', currentLevel: 6, desiredLevel: 9, importance: 5, actionItems: [] },
      { name: 'Cross-functional Collaboration', currentLevel: 4, desiredLevel: 8, importance: 4, actionItems: [] }
    ],
    overallScore: 0,
    humannessPriorities: []
  });

  const [asIsCanvas, setAsIsCanvas] = useState<AsIsCanvas>({
    eliminate: [],
    reduce: [],
    raise: [],
    create: [],
    reasoning: {},
    impactAssessment: {}
  });

  const [toBeCanvas, setToBeCanvas] = useState<ToBeCanvas>({
    eliminate: [],
    reduce: [],
    raise: [],
    create: [],
    reasoning: {},
    valueCurve: {},
    differentiation: [],
    costAdvantages: []
  });

  const [sixPathsAnalysis, setSixPathsAnalysis] = useState<SixPathsAnalysis>({
    paths: [
      {
        id: '1',
        name: 'Alternative Industries',
        currentApproach: '',
        alternativeIndustries: [],
        strategicGroups: [],
        buyerGroups: [],
        complementaryOfferings: [],
        functionalEmotionalOrientation: '',
        timeHorizon: '',
        opportunities: [],
        feasibility: 5,
        impact: 5,
        priorityScore: 0
      },
      {
        id: '2',
        name: 'Strategic Groups',
        currentApproach: '',
        alternativeIndustries: [],
        strategicGroups: [],
        buyerGroups: [],
        complementaryOfferings: [],
        functionalEmotionalOrientation: '',
        timeHorizon: '',
        opportunities: [],
        feasibility: 5,
        impact: 5,
        priorityScore: 0
      },
      {
        id: '3',
        name: 'Buyer Groups',
        currentApproach: '',
        alternativeIndustries: [],
        strategicGroups: [],
        buyerGroups: [],
        complementaryOfferings: [],
        functionalEmotionalOrientation: '',
        timeHorizon: '',
        opportunities: [],
        feasibility: 5,
        impact: 5,
        priorityScore: 0
      },
      {
        id: '4',
        name: 'Complementary Products/Services',
        currentApproach: '',
        alternativeIndustries: [],
        strategicGroups: [],
        buyerGroups: [],
        complementaryOfferings: [],
        functionalEmotionalOrientation: '',
        timeHorizon: '',
        opportunities: [],
        feasibility: 5,
        impact: 5,
        priorityScore: 0
      },
      {
        id: '5',
        name: 'Functional-Emotional Orientation',
        currentApproach: '',
        alternativeIndustries: [],
        strategicGroups: [],
        buyerGroups: [],
        complementaryOfferings: [],
        functionalEmotionalOrientation: '',
        timeHorizon: '',
        opportunities: [],
        feasibility: 5,
        impact: 5,
        priorityScore: 0
      },
      {
        id: '6',
        name: 'Time Horizon',
        currentApproach: '',
        alternativeIndustries: [],
        strategicGroups: [],
        buyerGroups: [],
        complementaryOfferings: [],
        functionalEmotionalOrientation: '',
        timeHorizon: '',
        opportunities: [],
        feasibility: 5,
        impact: 5,
        priorityScore: 0
      }
    ],
    selectedPaths: [],
    synthesizedStrategy: ''
  });

  const [buyerUtilityMap, setBuyerUtilityMap] = useState<BuyerUtilityMap>({
    stages: [
      {
        stage: 'Purchase',
        utilities: {
          customerProductivity: 5,
          simplicity: 5,
          convenience: 5,
          risk: 5,
          funAndImage: 5,
          environmentalFriendliness: 5
        },
        painPoints: [],
        opportunityAreas: [],
        solutionIdeas: []
      },
      {
        stage: 'Delivery',
        utilities: {
          customerProductivity: 5,
          simplicity: 5,
          convenience: 5,
          risk: 5,
          funAndImage: 5,
          environmentalFriendliness: 5
        },
        painPoints: [],
        opportunityAreas: [],
        solutionIdeas: []
      },
      {
        stage: 'Use',
        utilities: {
          customerProductivity: 5,
          simplicity: 5,
          convenience: 5,
          risk: 5,
          funAndImage: 5,
          environmentalFriendliness: 5
        },
        painPoints: [],
        opportunityAreas: [],
        solutionIdeas: []
      },
      {
        stage: 'Supplements',
        utilities: {
          customerProductivity: 5,
          simplicity: 5,
          convenience: 5,
          risk: 5,
          funAndImage: 5,
          environmentalFriendliness: 5
        },
        painPoints: [],
        opportunityAreas: [],
        solutionIdeas: []
      },
      {
        stage: 'Maintenance',
        utilities: {
          customerProductivity: 5,
          simplicity: 5,
          convenience: 5,
          risk: 5,
          funAndImage: 5,
          environmentalFriendliness: 5
        },
        painPoints: [],
        opportunityAreas: [],
        solutionIdeas: []
      },
      {
        stage: 'Disposal',
        utilities: {
          customerProductivity: 5,
          simplicity: 5,
          convenience: 5,
          risk: 5,
          funAndImage: 5,
          environmentalFriendliness: 5
        },
        painPoints: [],
        opportunityAreas: [],
        solutionIdeas: []
      }
    ],
    overallUtilityScore: 0,
    priorityUtilities: []
  });

  const [strategyFair, setStrategyFair] = useState<StrategyFair>({
    stakeholderGroups: [
      {
        group: 'Employees',
        concerns: [],
        benefits: [],
        supportLevel: 5,
        influenceLevel: 7,
        engagementPlan: '',
        feedbackReceived: []
      },
      {
        group: 'Customers',
        concerns: [],
        benefits: [],
        supportLevel: 5,
        influenceLevel: 9,
        engagementPlan: '',
        feedbackReceived: []
      },
      {
        group: 'Partners',
        concerns: [],
        benefits: [],
        supportLevel: 5,
        influenceLevel: 6,
        engagementPlan: '',
        feedbackReceived: []
      },
      {
        group: 'Investors',
        concerns: [],
        benefits: [],
        supportLevel: 5,
        influenceLevel: 8,
        engagementPlan: '',
        feedbackReceived: []
      },
      {
        group: 'Regulators',
        concerns: [],
        benefits: [],
        supportLevel: 5,
        influenceLevel: 6,
        engagementPlan: '',
        feedbackReceived: []
      }
    ],
    fairnessAssessment: 0,
    adoptionReadiness: 0,
    riskMitigation: []
  });

  const [tippingPointLeadership, setTippingPointLeadership] = useState<TippingPointLeadership>({
    organizationalHurdles: [
      {
        type: 'cognitive',
        description: '',
        severity: 5,
        approach: '',
        keyInfluencers: [],
        actionPlan: [],
        timeline: '',
        success_metrics: []
      },
      {
        type: 'resource',
        description: '',
        severity: 5,
        approach: '',
        keyInfluencers: [],
        actionPlan: [],
        timeline: '',
        success_metrics: []
      },
      {
        type: 'motivational',
        description: '',
        severity: 5,
        approach: '',
        keyInfluencers: [],
        actionPlan: [],
        timeline: '',
        success_metrics: []
      },
      {
        type: 'political',
        description: '',
        severity: 5,
        approach: '',
        keyInfluencers: [],
        actionPlan: [],
        timeline: '',
        success_metrics: []
      }
    ],
    executionPlan: [],
    changeReadiness: 0
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Framework completion tracking
  const frameworks = [
    'Humanness Check',
    'As-Is Canvas',
    'To-Be Canvas', 
    'Six Paths Analysis',
    'Buyer Utility Map',
    'Strategy Fair',
    'Tipping Point Leadership'
  ];

  const getFrameworkCompletion = (frameworkIndex: number): number => {
    switch (frameworkIndex) {
      case 0: // Humanness Check
        const completedFactors = humannessCheck.factors.filter(f => f.actionItems.length > 0).length;
        return (completedFactors / humannessCheck.factors.length) * 100;
      case 1: // As-Is Canvas
        const asIsItems = Object.values(asIsCanvas).filter(v => Array.isArray(v) ? v.length > 0 : Object.keys(v).length > 0).length;
        return (asIsItems / 5) * 100;
      case 2: // To-Be Canvas
        const toBeItems = Object.values(toBeCanvas).filter(v => Array.isArray(v) ? v.length > 0 : Object.keys(v).length > 0).length;
        return (toBeItems / 7) * 100;
      case 3: // Six Paths
        const completedPaths = sixPathsAnalysis.paths.filter(p => p.opportunities.length > 0).length;
        return (completedPaths / 6) * 100;
      case 4: // Buyer Utility Map
        const completedStages = buyerUtilityMap.stages.filter(s => s.painPoints.length > 0 || s.opportunityAreas.length > 0).length;
        return (completedStages / 6) * 100;
      case 5: // Strategy Fair
        const completedStakeholders = strategyFair.stakeholderGroups.filter(g => g.concerns.length > 0 || g.benefits.length > 0).length;
        return (completedStakeholders / 5) * 100;
      case 6: // Tipping Point Leadership
        const completedHurdles = tippingPointLeadership.organizationalHurdles.filter(h => h.description && h.approach).length;
        return (completedHurdles / 4) * 100;
      default:
        return 0;
    }
  };

  const overallProgress = frameworks.reduce((acc, _, index) => acc + getFrameworkCompletion(index), 0) / frameworks.length;

  // Render Framework 1: Humanness Check
  const renderHumannessCheck = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Humanness Check Framework</Text>
          <Text fontSize="sm">
            Assess your organization's human-centered capabilities that enable Blue Ocean innovation.
            Rate current vs. desired levels and create action plans for improvement.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
        {humannessCheck.factors.map((factor, index) => (
          <Card key={index} bg={cardBg} border="1px" borderColor={borderColor}>
            <CardHeader>
              <HStack justify="space-between">
                <Text fontWeight="semibold">{factor.name}</Text>
                <Badge colorScheme={factor.currentLevel >= factor.desiredLevel ? 'green' : 'orange'}>
                  Gap: {factor.desiredLevel - factor.currentLevel}
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Current Level</FormLabel>
                  <Slider
                    value={factor.currentLevel}
                    min={1}
                    max={10}
                    onChange={(value) => {
                      const updatedFactors = [...humannessCheck.factors];
                      updatedFactors[index].currentLevel = value;
                      setHumannessCheck(prev => ({ ...prev, factors: updatedFactors }));
                    }}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Text fontSize="xs" fontWeight="bold">{factor.currentLevel}</Text>
                    </SliderThumb>
                  </Slider>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Desired Level</FormLabel>
                  <Slider
                    value={factor.desiredLevel}
                    min={1}
                    max={10}
                    onChange={(value) => {
                      const updatedFactors = [...humannessCheck.factors];
                      updatedFactors[index].desiredLevel = value;
                      setHumannessCheck(prev => ({ ...prev, factors: updatedFactors }));
                    }}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Text fontSize="xs" fontWeight="bold">{factor.desiredLevel}</Text>
                    </SliderThumb>
                  </Slider>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Importance (1-5)</FormLabel>
                  <Slider
                    value={factor.importance}
                    min={1}
                    max={5}
                    onChange={(value) => {
                      const updatedFactors = [...humannessCheck.factors];
                      updatedFactors[index].importance = value;
                      setHumannessCheck(prev => ({ ...prev, factors: updatedFactors }));
                    }}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Text fontSize="xs" fontWeight="bold">{factor.importance}</Text>
                    </SliderThumb>
                  </Slider>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel fontSize="sm">Action Items</FormLabel>
                <VStack align="stretch" spacing={2}>
                  {factor.actionItems.map((item, itemIndex) => (
                    <HStack key={itemIndex}>
                      <Input
                        value={item}
                        onChange={(e) => {
                          const updatedFactors = [...humannessCheck.factors];
                          updatedFactors[index].actionItems[itemIndex] = e.target.value;
                          setHumannessCheck(prev => ({ ...prev, factors: updatedFactors }));
                        }}
                        placeholder="Enter action item..."
                        size="sm"
                      />
                      <IconButton
                        aria-label="Remove action item"
                        icon={<Text>×</Text>}
                        size="sm"
                        onClick={() => {
                          const updatedFactors = [...humannessCheck.factors];
                          updatedFactors[index].actionItems.splice(itemIndex, 1);
                          setHumannessCheck(prev => ({ ...prev, factors: updatedFactors }));
                        }}
                      />
                    </HStack>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const updatedFactors = [...humannessCheck.factors];
                      updatedFactors[index].actionItems.push('');
                      setHumannessCheck(prev => ({ ...prev, factors: updatedFactors }));
                    }}
                  >
                    + Add Action Item
                  </Button>
                </VStack>
              </FormControl>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <Card bg="blue.50" border="1px" borderColor="blue.200">
        <CardBody>
          <Text fontWeight="semibold" mb={3}>Humanness Assessment Summary</Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <Stat>
              <StatLabel>Average Current Level</StatLabel>
              <StatNumber>
                {(humannessCheck.factors.reduce((acc, f) => acc + f.currentLevel, 0) / humannessCheck.factors.length).toFixed(1)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Average Desired Level</StatLabel>
              <StatNumber>
                {(humannessCheck.factors.reduce((acc, f) => acc + f.desiredLevel, 0) / humannessCheck.factors.length).toFixed(1)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Priority Gaps</StatLabel>
              <StatNumber>
                {humannessCheck.factors.filter(f => (f.desiredLevel - f.currentLevel) >= 3 && f.importance >= 4).length}
              </StatNumber>
            </Stat>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  // Render Framework 3: To-Be Canvas
  const renderToBeCanvas = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="success">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">To-Be Strategy Canvas</Text>
          <Text fontSize="sm">
            Design your future competitive position. Define the new value curve and strategic positioning
            that will create uncontested market space.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Eliminate */}
        <Card bg="red.50" border="1px" borderColor="red.200">
          <CardHeader>
            <Text fontWeight="semibold" color="red.700">🗑️ ELIMINATE</Text>
            <Text fontSize="sm" color="red.600">
              Which industry factors should be completely eliminated?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {toBeCanvas.eliminate.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...toBeCanvas.eliminate];
                      updated[index] = e.target.value;
                      setToBeCanvas(prev => ({ ...prev, eliminate: updated }));
                    }}
                    placeholder="Factor to eliminate..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...toBeCanvas.eliminate];
                      updated.splice(index, 1);
                      setToBeCanvas(prev => ({ ...prev, eliminate: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="red"
                onClick={() => setToBeCanvas(prev => ({ ...prev, eliminate: [...prev.eliminate, ''] }))}
              >
                + Add Factor
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Reduce */}
        <Card bg="orange.50" border="1px" borderColor="orange.200">
          <CardHeader>
            <Text fontWeight="semibold" color="orange.700">📉 REDUCE</Text>
            <Text fontSize="sm" color="orange.600">
              Which factors should be reduced well below industry standards?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {toBeCanvas.reduce.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...toBeCanvas.reduce];
                      updated[index] = e.target.value;
                      setToBeCanvas(prev => ({ ...prev, reduce: updated }));
                    }}
                    placeholder="Factor to reduce..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...toBeCanvas.reduce];
                      updated.splice(index, 1);
                      setToBeCanvas(prev => ({ ...prev, reduce: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="orange"
                onClick={() => setToBeCanvas(prev => ({ ...prev, reduce: [...prev.reduce, ''] }))}
              >
                + Add Factor
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Raise */}
        <Card bg="blue.50" border="1px" borderColor="blue.200">
          <CardHeader>
            <Text fontWeight="semibold" color="blue.700">📈 RAISE</Text>
            <Text fontSize="sm" color="blue.600">
              Which factors should be raised well above industry standards?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {toBeCanvas.raise.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...toBeCanvas.raise];
                      updated[index] = e.target.value;
                      setToBeCanvas(prev => ({ ...prev, raise: updated }));
                    }}
                    placeholder="Factor to raise..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...toBeCanvas.raise];
                      updated.splice(index, 1);
                      setToBeCanvas(prev => ({ ...prev, raise: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={() => setToBeCanvas(prev => ({ ...prev, raise: [...prev.raise, ''] }))}
              >
                + Add Factor
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Create */}
        <Card bg="green.50" border="1px" borderColor="green.200">
          <CardHeader>
            <Text fontWeight="semibold" color="green.700">✨ CREATE</Text>
            <Text fontSize="sm" color="green.600">
              Which factors should be created that the industry has never offered?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {toBeCanvas.create.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...toBeCanvas.create];
                      updated[index] = e.target.value;
                      setToBeCanvas(prev => ({ ...prev, create: updated }));
                    }}
                    placeholder="Factor to create..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...toBeCanvas.create];
                      updated.splice(index, 1);
                      setToBeCanvas(prev => ({ ...prev, create: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="green"
                onClick={() => setToBeCanvas(prev => ({ ...prev, create: [...prev.create, ''] }))}
              >
                + Add Factor
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      {/* Value Curve Design */}
      <Card bg="purple.50" border="1px" borderColor="purple.200">
        <CardHeader>
          <Text fontWeight="semibold" color="purple.700">📊 Value Curve Design</Text>
          <Text fontSize="sm" color="purple.600">
            Define the competitive factors and their relative levels for your new strategy
          </Text>
        </CardHeader>
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="gray.600">
              Rate each competitive factor from 1 (low) to 10 (high) to design your value curve
            </Text>
            <Grid templateColumns="repeat(1, 1fr)" gap={4}>
              {Object.entries(toBeCanvas.valueCurve).map(([factor, level]) => (
                <HStack key={factor} justify="space-between">
                  <Text fontSize="sm" fontWeight="medium" minW="200px">{factor}</Text>
                  <Slider
                    value={level}
                    min={1}
                    max={10}
                    step={1}
                    onChange={(value) => setToBeCanvas(prev => ({
                      ...prev,
                      valueCurve: { ...prev.valueCurve, [factor]: value }
                    }))}
                    w="200px"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Text fontSize="xs" fontWeight="bold">{level}</Text>
                    </SliderThumb>
                  </Slider>
                </HStack>
              ))}
            </Grid>
            <Button
              size="sm"
              colorScheme="purple"
              onClick={() => {
                const newFactor = prompt('Enter new competitive factor:');
                if (newFactor) {
                  setToBeCanvas(prev => ({
                    ...prev,
                    valueCurve: { ...prev.valueCurve, [newFactor]: 5 }
                  }));
                }
              }}
            >
              + Add Competitive Factor
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Strategic Differentiation */}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardHeader>
            <Text fontWeight="semibold">🎯 Differentiation Points</Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {toBeCanvas.differentiation.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...toBeCanvas.differentiation];
                      updated[index] = e.target.value;
                      setToBeCanvas(prev => ({ ...prev, differentiation: updated }));
                    }}
                    placeholder="Key differentiator..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...toBeCanvas.differentiation];
                      updated.splice(index, 1);
                      setToBeCanvas(prev => ({ ...prev, differentiation: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setToBeCanvas(prev => ({ ...prev, differentiation: [...prev.differentiation, ''] }))}
              >
                + Add Differentiator
              </Button>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardHeader>
            <Text fontWeight="semibold">💰 Cost Advantages</Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {toBeCanvas.costAdvantages.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...toBeCanvas.costAdvantages];
                      updated[index] = e.target.value;
                      setToBeCanvas(prev => ({ ...prev, costAdvantages: updated }));
                    }}
                    placeholder="Cost advantage..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...toBeCanvas.costAdvantages];
                      updated.splice(index, 1);
                      setToBeCanvas(prev => ({ ...prev, costAdvantages: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setToBeCanvas(prev => ({ ...prev, costAdvantages: [...prev.costAdvantages, ''] }))}
              >
                + Add Cost Advantage
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );

  // Render Framework 4: Six Paths Analysis
  const renderSixPathsAnalysis = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Six Paths Framework</Text>
          <Text fontSize="sm">
            Systematically explore paths to reconstruct market boundaries and create blue oceans.
            Each path offers a different lens to identify new market opportunities.
          </Text>
        </VStack>
      </Alert>

      <VStack spacing={6} align="stretch">
        {sixPathsAnalysis.paths.map((path, index) => (
          <Card key={path.id} bg={cardBg} border="1px" borderColor={borderColor}>
            <CardHeader>
              <HStack justify="space-between">
                <Text fontWeight="semibold" color="blue.700">
                  Path {index + 1}: {path.name}
                </Text>
                <Badge colorScheme={path.priorityScore > 7 ? 'green' : path.priorityScore > 4 ? 'yellow' : 'gray'}>
                  Priority: {path.priorityScore}/10
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Current Industry Approach</FormLabel>
                  <Textarea
                    value={path.currentApproach}
                    onChange={(e) => {
                      const updatedPaths = [...sixPathsAnalysis.paths];
                      updatedPaths[index].currentApproach = e.target.value;
                      setSixPathsAnalysis(prev => ({ ...prev, paths: updatedPaths }));
                    }}
                    placeholder="Describe how the industry currently approaches this..."
                    rows={2}
                    size="sm"
                  />
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Feasibility (1-10)</FormLabel>
                    <Slider
                      value={path.feasibility}
                      min={1}
                      max={10}
                      onChange={(value) => {
                        const updatedPaths = [...sixPathsAnalysis.paths];
                        updatedPaths[index].feasibility = value;
                        updatedPaths[index].priorityScore = (value + updatedPaths[index].impact) / 2;
                        setSixPathsAnalysis(prev => ({ ...prev, paths: updatedPaths }));
                      }}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb boxSize={6}>
                        <Text fontSize="xs" fontWeight="bold">{path.feasibility}</Text>
                      </SliderThumb>
                    </Slider>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Impact Potential (1-10)</FormLabel>
                    <Slider
                      value={path.impact}
                      min={1}
                      max={10}
                      onChange={(value) => {
                        const updatedPaths = [...sixPathsAnalysis.paths];
                        updatedPaths[index].impact = value;
                        updatedPaths[index].priorityScore = (updatedPaths[index].feasibility + value) / 2;
                        setSixPathsAnalysis(prev => ({ ...prev, paths: updatedPaths }));
                      }}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb boxSize={6}>
                        <Text fontSize="xs" fontWeight="bold">{path.impact}</Text>
                      </SliderThumb>
                    </Slider>
                  </FormControl>
                </Grid>

                <FormControl>
                  <FormLabel fontSize="sm">Identified Opportunities</FormLabel>
                  <VStack align="stretch" spacing={2}>
                    {path.opportunities.map((opp, oppIndex) => (
                      <HStack key={oppIndex}>
                        <Input
                          value={opp}
                          onChange={(e) => {
                            const updatedPaths = [...sixPathsAnalysis.paths];
                            updatedPaths[index].opportunities[oppIndex] = e.target.value;
                            setSixPathsAnalysis(prev => ({ ...prev, paths: updatedPaths }));
                          }}
                          placeholder="Describe opportunity..."
                          size="sm"
                        />
                        <IconButton
                          aria-label="Remove opportunity"
                          icon={<Text>×</Text>}
                          size="sm"
                          onClick={() => {
                            const updatedPaths = [...sixPathsAnalysis.paths];
                            updatedPaths[index].opportunities.splice(oppIndex, 1);
                            setSixPathsAnalysis(prev => ({ ...prev, paths: updatedPaths }));
                          }}
                        />
                      </HStack>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const updatedPaths = [...sixPathsAnalysis.paths];
                        updatedPaths[index].opportunities.push('');
                        setSixPathsAnalysis(prev => ({ ...prev, paths: updatedPaths }));
                      }}
                    >
                      + Add Opportunity
                    </Button>
                  </VStack>
                </FormControl>
              </Grid>
            </CardBody>
          </Card>
        ))}
      </VStack>

      {/* Path Synthesis */}
      <Card bg="green.50" border="1px" borderColor="green.200">
        <CardHeader>
          <Text fontWeight="semibold" color="green.700">🎯 Strategy Synthesis</Text>
        </CardHeader>
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="green.600">
              Select the most promising paths and synthesize them into a cohesive blue ocean strategy
            </Text>
            
            <Text fontWeight="medium">Selected Paths:</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              {sixPathsAnalysis.paths.map((path, index) => (
                <Checkbox
                  key={path.id}
                  isChecked={sixPathsAnalysis.selectedPaths.includes(path.id)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...sixPathsAnalysis.selectedPaths, path.id]
                      : sixPathsAnalysis.selectedPaths.filter(id => id !== path.id);
                    setSixPathsAnalysis(prev => ({ ...prev, selectedPaths: updated }));
                  }}
                >
                  <Text fontSize="sm">Path {index + 1}: {path.name}</Text>
                </Checkbox>
              ))}
            </Grid>

            <FormControl>
              <FormLabel>Synthesized Strategy</FormLabel>
              <Textarea
                value={sixPathsAnalysis.synthesizedStrategy}
                onChange={(e) => setSixPathsAnalysis(prev => ({ ...prev, synthesizedStrategy: e.target.value }))}
                placeholder="Combine selected paths into a coherent blue ocean strategy..."
                rows={4}
              />
            </FormControl>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  // Render Framework 2: As-Is Canvas
  const renderAsIsCanvas = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">As-Is Strategy Canvas</Text>
          <Text fontSize="sm">
            Map your current competitive position using the Four Actions Framework.
            Identify what you currently eliminate, reduce, raise, and create.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Eliminate */}
        <Card bg="red.50" border="1px" borderColor="red.200">
          <CardHeader>
            <Text fontWeight="semibold" color="red.700">🗑️ ELIMINATE</Text>
            <Text fontSize="sm" color="red.600">
              Which factors should be eliminated that the industry takes for granted?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {asIsCanvas.eliminate.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...asIsCanvas.eliminate];
                      updated[index] = e.target.value;
                      setAsIsCanvas(prev => ({ ...prev, eliminate: updated }));
                    }}
                    placeholder="Factor to eliminate..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...asIsCanvas.eliminate];
                      updated.splice(index, 1);
                      setAsIsCanvas(prev => ({ ...prev, eliminate: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="red"
                onClick={() => setAsIsCanvas(prev => ({ ...prev, eliminate: [...prev.eliminate, ''] }))}
              >
                + Add Factor
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Reduce */}
        <Card bg="orange.50" border="1px" borderColor="orange.200">
          <CardHeader>
            <Text fontWeight="semibold" color="orange.700">📉 REDUCE</Text>
            <Text fontSize="sm" color="orange.600">
              Which factors should be reduced well below industry standards?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {asIsCanvas.reduce.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...asIsCanvas.reduce];
                      updated[index] = e.target.value;
                      setAsIsCanvas(prev => ({ ...prev, reduce: updated }));
                    }}
                    placeholder="Factor to reduce..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...asIsCanvas.reduce];
                      updated.splice(index, 1);
                      setAsIsCanvas(prev => ({ ...prev, reduce: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="orange"
                onClick={() => setAsIsCanvas(prev => ({ ...prev, reduce: [...prev.reduce, ''] }))}
              >
                + Add Factor
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Raise */}
        <Card bg="blue.50" border="1px" borderColor="blue.200">
          <CardHeader>
            <Text fontWeight="semibold" color="blue.700">📈 RAISE</Text>
            <Text fontSize="sm" color="blue.600">
              Which factors should be raised well above industry standards?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {asIsCanvas.raise.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...asIsCanvas.raise];
                      updated[index] = e.target.value;
                      setAsIsCanvas(prev => ({ ...prev, raise: updated }));
                    }}
                    placeholder="Factor to raise..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...asIsCanvas.raise];
                      updated.splice(index, 1);
                      setAsIsCanvas(prev => ({ ...prev, raise: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={() => setAsIsCanvas(prev => ({ ...prev, raise: [...prev.raise, ''] }))}
              >
                + Add Factor
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Create */}
        <Card bg="green.50" border="1px" borderColor="green.200">
          <CardHeader>
            <Text fontWeight="semibold" color="green.700">✨ CREATE</Text>
            <Text fontSize="sm" color="green.600">
              Which factors should be created that the industry has never offered?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={2}>
              {asIsCanvas.create.map((item, index) => (
                <HStack key={index}>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const updated = [...asIsCanvas.create];
                      updated[index] = e.target.value;
                      setAsIsCanvas(prev => ({ ...prev, create: updated }));
                    }}
                    placeholder="Factor to create..."
                    size="sm"
                  />
                  <IconButton
                    aria-label="Remove"
                    icon={<Text>×</Text>}
                    size="sm"
                    onClick={() => {
                      const updated = [...asIsCanvas.create];
                      updated.splice(index, 1);
                      setAsIsCanvas(prev => ({ ...prev, create: updated }));
                    }}
                  />
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="green"
                onClick={() => setAsIsCanvas(prev => ({ ...prev, create: [...prev.create, ''] }))}
              >
                + Add Factor
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      {/* Strategic Reasoning */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardHeader>
          <Text fontWeight="semibold">Strategic Reasoning & Impact Assessment</Text>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm" color="gray.600" mb={4}>
            Provide reasoning for each strategic choice and assess potential impact.
          </Text>
          <Accordion allowMultiple>
            {['eliminate', 'reduce', 'raise', 'create'].map((action) => (
              <AccordionItem key={action}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="semibold" textTransform="capitalize">{action} Reasoning</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Textarea
                    value={asIsCanvas.reasoning[action] || ''}
                    onChange={(e) => setAsIsCanvas(prev => ({
                      ...prev,
                      reasoning: { ...prev.reasoning, [action]: e.target.value }
                    }))}
                    placeholder={`Explain why you chose to ${action} these factors...`}
                    rows={3}
                  />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </VStack>
  );

  // Main component render
  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Card bg="blue.50" border="1px" borderColor="blue.200">
          <CardBody>
            <HStack justify="space-between" mb={4}>
              <VStack align="start" spacing={1}>
                <Text fontSize="3xl" fontWeight="bold" color="blue.700">
                  🌊 Blue Ocean Strategy Workshop
                </Text>
                <Text fontSize="lg" color="blue.600">
                  Comprehensive framework implementation for creating uncontested market space
                </Text>
              </VStack>
              <VStack align="end" spacing={2}>
                <Text fontSize="sm" color="blue.600">Overall Progress</Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                  {Math.round(overallProgress)}%
                </Text>
                <Progress value={overallProgress} colorScheme="blue" size="lg" w="200px" />
              </VStack>
            </HStack>

            {/* Company Profile Setup */}
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl>
                <FormLabel fontSize="sm">Company Name</FormLabel>
                <Input
                  value={blueOceanProfile.companyName}
                  onChange={(e) => setBlueOceanProfile(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Enter company name"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Industry</FormLabel>
                <Input
                  value={blueOceanProfile.industry}
                  onChange={(e) => setBlueOceanProfile(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="Enter industry"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Current Position</FormLabel>
                <Input
                  value={blueOceanProfile.currentPosition}
                  onChange={(e) => setBlueOceanProfile(prev => ({ ...prev, currentPosition: e.target.value }))}
                  placeholder="Describe current market position"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Strategic Goal</FormLabel>
                <Input
                  value={blueOceanProfile.strategicGoal}
                  onChange={(e) => setBlueOceanProfile(prev => ({ ...prev, strategicGoal: e.target.value }))}
                  placeholder="Define strategic objective"
                  size="sm"
                />
              </FormControl>
            </Grid>
          </CardBody>
        </Card>

        {/* Framework Navigation */}
        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardBody>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>Framework Progress</Text>
            <Grid templateColumns="repeat(7, 1fr)" gap={2}>
              {frameworks.map((framework, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={activeFramework === index ? 'solid' : 'outline'}
                  colorScheme={getFrameworkCompletion(index) > 50 ? 'green' : 'blue'}
                  onClick={() => setActiveFramework(index)}
                  flexDirection="column"
                  h="auto"
                  py={3}
                >
                  <Text fontSize="xs" fontWeight="bold">
                    {Math.round(getFrameworkCompletion(index))}%
                  </Text>
                  <Text fontSize="xs" textAlign="center">
                    {framework}
                  </Text>
                </Button>
              ))}
            </Grid>
          </CardBody>
        </Card>

        {/* Framework Content */}
        <Card bg={cardBg} border="1px" borderColor={borderColor} minH="600px">
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">
                {frameworks[activeFramework]}
              </Text>
              <HStack>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveFramework(Math.max(0, activeFramework - 1))}
                  isDisabled={activeFramework === 0}
                >
                  ← Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveFramework(Math.min(frameworks.length - 1, activeFramework + 1))}
                  isDisabled={activeFramework === frameworks.length - 1}
                >
                  Next →
                </Button>
              </HStack>
            </HStack>
          </CardHeader>
          <CardBody>
            {activeFramework === 0 && renderHumannessCheck()}
            {activeFramework === 1 && renderAsIsCanvas()}
            {activeFramework === 2 && renderToBeCanvas()}
            {activeFramework === 3 && renderSixPathsAnalysis()}
            {activeFramework === 4 && (
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Buyer Utility Map</Text>
                  <Text fontSize="sm">
                    This framework will map customer utility across the buyer experience cycle,
                    identifying pain points and opportunity areas for breakthrough value creation.
                  </Text>
                </VStack>
              </Alert>
            )}
            {activeFramework === 5 && (
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Strategy Fair</Text>
                  <Text fontSize="sm">
                    This framework will ensure stakeholder buy-in by addressing concerns,
                    demonstrating benefits, and building adoption readiness across the organization.
                  </Text>
                </VStack>
              </Alert>
            )}
            {activeFramework === 6 && (
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Tipping Point Leadership</Text>
                  <Text fontSize="sm">
                    This framework will address organizational hurdles (cognitive, resource, motivational, political)
                    and develop execution plans to overcome resistance and drive change.
                  </Text>
                </VStack>
              </Alert>
            )}
          </CardBody>
        </Card>

        {/* Action Buttons */}
        <HStack justify="space-between">
          <Button onClick={onOpen} colorScheme="blue" variant="outline">
            📊 View Strategy Summary
          </Button>
          <HStack>
            <Button colorScheme="green">
              💾 Save Progress
            </Button>
            <Button colorScheme="purple">
              📄 Export Strategy
            </Button>
          </HStack>
        </HStack>
      </VStack>

      {/* Strategy Summary Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Blue Ocean Strategy Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="semibold">Overall Progress: {Math.round(overallProgress)}%</Text>
              <Progress value={overallProgress} colorScheme="blue" size="lg" />
              
              <Text fontWeight="semibold" mt={4}>Framework Completion:</Text>
              {frameworks.map((framework, index) => (
                <HStack key={index} justify="space-between">
                  <Text fontSize="sm">{framework}</Text>
                  <Badge colorScheme={getFrameworkCompletion(index) > 50 ? 'green' : 'gray'}>
                    {Math.round(getFrameworkCompletion(index))}%
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ComprehensiveBlueOceanStrategy;