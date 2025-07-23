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
  Switch,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { useFrameworkData } from '../hooks/useFrameworkData';

// Process Improvement Data Structures
interface ProcessImprovement {
  id: string;
  title: string;
  description: string;
  category: 'customer_journey' | 'operations' | 'technology' | 'workflow' | 'quality' | 'cost_reduction';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'identified' | 'planned' | 'in_progress' | 'completed' | 'on_hold';
  blueOceanSource?: string;
  utilityStageTarget?: string;
  utilityLeverTarget?: string;
  currentState: {
    description: string;
    painPoints: string[];
    efficiency: number; // 1-10 scale
    customerSatisfaction: number; // 1-10 scale
    cost: number;
  };
  targetState: {
    description: string;
    expectedBenefits: string[];
    targetEfficiency: number; // 1-10 scale
    targetSatisfaction: number; // 1-10 scale
    estimatedCostSavings: number;
  };
  implementation: {
    steps: ProcessStep[];
    timeline: string;
    resources: string[];
    budget: number;
    owner: string;
    stakeholders: string[];
  };
  metrics: {
    kpis: string[];
    baselines: { [key: string]: number };
    targets: { [key: string]: number };
    currentValues: { [key: string]: number };
  };
  blueOceanAlignment: {
    buyerUtilityImpact: string[];
    buyerGroupBenefit: string[];
    strategicContribution: string;
  };
  createdAt: string;
  completionDate?: string;
}

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  duration: string;
  dependencies: string[];
  assignee: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  deliverables: string[];
}

interface ProcessMap {
  id: string;
  name: string;
  description: string;
  type: 'customer_journey' | 'value_stream' | 'workflow' | 'decision_flow';
  stages: ProcessStage[];
  improvements: string[]; // ProcessImprovement IDs
  blueOceanUtilityMapping: { [stageId: string]: string[] }; // maps to utility stages
}

interface ProcessStage {
  id: string;
  name: string;
  description: string;
  owner: string;
  duration: string;
  inputs: string[];
  outputs: string[];
  painPoints: string[];
  improvementOpportunities: string[];
  utilityScore: number; // 1-10 scale based on Blue Ocean Buyer Utility Map
  efficiencyScore: number; // 1-10 scale
}

const ProcessImprovementWithIntegration: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const {
    frameworkState,
    blueOceanData,
    insights,
    hasData
  } = useFrameworkData();

  const [improvements, setImprovements] = useState<ProcessImprovement[]>([]);
  const [processMaps, setProcessMaps] = useState<ProcessMap[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImprovement, setSelectedImprovement] = useState<ProcessImprovement | null>(null);
  const [newImprovement, setNewImprovement] = useState<Partial<ProcessImprovement>>({});

  const toast = useToast();
  const { isOpen: isImprovementOpen, onOpen: onImprovementOpen, onClose: onImprovementClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');
  const warningBg = useColorModeValue('orange.50', 'orange.900');

  // Utility stages and levers from Blue Ocean Strategy
  const utilityStages = ['Purchase', 'Delivery', 'Use', 'Supplements', 'Maintenance', 'Disposal'];
  const utilityLevers = ['Customer Productivity', 'Simplicity', 'Convenience', 'Risk', 'Fun and Image', 'Environmental Friendliness'];

  // Initialize with demo data and Blue Ocean integrations
  useEffect(() => {
    // Load existing improvements from framework state
    const existingImprovements = frameworkState.process.improvements;
    setImprovements(existingImprovements);

    // Generate improvements from Blue Ocean Buyer Utility Map
    const blueOceanImprovements: ProcessImprovement[] = [];

    // Analyze utility blocks with low scores and generate improvements
    if (blueOceanData.buyerUtilityMap && blueOceanData.buyerUtilityMap.utilityBlocks) {
      blueOceanData.buyerUtilityMap.utilityBlocks.forEach((block, index) => {
        if (block.score <= 5) { // Low utility scores indicate improvement opportunities
          const stageIndex = Math.floor(index / 6);
          const leverIndex = index % 6;
          const stage = utilityStages[stageIndex];
          const lever = utilityLevers[leverIndex];

          blueOceanImprovements.push({
            id: `improvement_utility_${index}`,
            title: `Improve ${lever} in ${stage} Stage`,
            description: `Address low utility score (${block.score}/10) in ${stage} stage for ${lever} lever identified in Blue Ocean Buyer Utility Map`,
            category: 'customer_journey',
            priority: block.score <= 3 ? 'critical' : block.score <= 4 ? 'high' : 'medium',
            status: 'identified',
            blueOceanSource: 'buyer_utility_map',
            utilityStageTarget: stage,
            utilityLeverTarget: lever,
            currentState: {
              description: `Current ${stage.toLowerCase()} process lacks optimization for ${lever.toLowerCase()}`,
              painPoints: [
                `Low ${lever.toLowerCase()} utility (${block.score}/10)`,
                `Customer friction during ${stage.toLowerCase()} stage`,
                `Competitive disadvantage in this utility block`
              ],
              efficiency: block.score,
              customerSatisfaction: block.score,
              cost: Math.floor(Math.random() * 50000) + 10000
            },
            targetState: {
              description: `Optimized ${stage.toLowerCase()} process with enhanced ${lever.toLowerCase()}`,
              expectedBenefits: [
                `Increase ${lever.toLowerCase()} utility to 8+/10`,
                `Reduce customer effort and friction`,
                `Create competitive advantage in this utility block`,
                `Improve overall customer experience`
              ],
              targetEfficiency: Math.min(10, block.score + 4),
              targetSatisfaction: Math.min(10, block.score + 3),
              estimatedCostSavings: Math.floor(Math.random() * 30000) + 5000
            },
            implementation: {
              steps: [
                {
                  id: `step_${index}_1`,
                  name: `Analyze ${stage} Stage`,
                  description: `Conduct detailed analysis of current ${stage.toLowerCase()} process`,
                  duration: '2 weeks',
                  dependencies: [],
                  assignee: 'Process Analyst',
                  status: 'pending',
                  deliverables: ['Current state map', 'Pain point analysis', 'Stakeholder feedback']
                },
                {
                  id: `step_${index}_2`,
                  name: `Design ${lever} Enhancement`,
                  description: `Design improvements to enhance ${lever.toLowerCase()} in ${stage.toLowerCase()}`,
                  duration: '3 weeks',
                  dependencies: [`step_${index}_1`],
                  assignee: 'UX Designer',
                  status: 'pending',
                  deliverables: ['Future state design', 'User journey map', 'Technical requirements']
                },
                {
                  id: `step_${index}_3`,
                  name: 'Implement Improvements',
                  description: `Execute the ${lever.toLowerCase()} improvements`,
                  duration: '6 weeks',
                  dependencies: [`step_${index}_2`],
                  assignee: 'Implementation Team',
                  status: 'pending',
                  deliverables: ['Updated process', 'Training materials', 'Performance metrics']
                }
              ],
              timeline: '11 weeks',
              resources: ['Process Analyst', 'UX Designer', 'Implementation Team', 'IT Support'],
              budget: Math.floor(Math.random() * 25000) + 15000,
              owner: 'Process Improvement Manager',
              stakeholders: ['Customer Experience Team', 'Operations', 'IT', 'Customer Service']
            },
            metrics: {
              kpis: [
                `${lever} utility score`,
                'Customer satisfaction',
                'Process efficiency',
                'Time to complete',
                'Error rate'
              ],
              baselines: {
                utility_score: block.score,
                customer_satisfaction: block.score,
                process_efficiency: block.score,
                completion_time: 100,
                error_rate: 10 - block.score
              },
              targets: {
                utility_score: Math.min(10, block.score + 4),
                customer_satisfaction: Math.min(10, block.score + 3),
                process_efficiency: Math.min(10, block.score + 3),
                completion_time: 60,
                error_rate: Math.max(1, 5 - block.score)
              },
              currentValues: {
                utility_score: block.score,
                customer_satisfaction: block.score,
                process_efficiency: block.score,
                completion_time: 100,
                error_rate: 10 - block.score
              }
            },
            blueOceanAlignment: {
              buyerUtilityImpact: [`${stage} - ${lever}`],
              buyerGroupBenefit: blueOceanData.sixPathsAnalysis.buyerGroups,
              strategicContribution: `Improves Blue Ocean positioning by enhancing ${lever.toLowerCase()} in ${stage.toLowerCase()} stage`
            },
            createdAt: new Date().toISOString()
          });
        }
      });
    }

    // Generate improvements from insights
    const insightImprovements: ProcessImprovement[] = insights
      .filter(insight => insight.targetFrameworks.includes('process'))
      .slice(0, 3) // Limit to 3 insights
      .map((insight, index) => ({
        id: `improvement_insight_${index}`,
        title: `Process Enhancement: ${insight.title}`,
        description: `Process improvement opportunity identified from Blue Ocean Strategy insight: ${insight.description}`,
        category: 'workflow',
        priority: 'high',
        status: 'identified',
        blueOceanSource: insight.id,
        currentState: {
          description: 'Current process lacks strategic alignment with Blue Ocean insights',
          painPoints: [
            'Misaligned with Blue Ocean strategy',
            'Inefficient workflow',
            'Limited value creation'
          ],
          efficiency: 5,
          customerSatisfaction: 5,
          cost: 25000
        },
        targetState: {
          description: 'Optimized process aligned with Blue Ocean strategic insights',
          expectedBenefits: insight.recommendations.slice(0, 3),
          targetEfficiency: 8,
          targetSatisfaction: 8,
          estimatedCostSavings: 15000
        },
        implementation: {
          steps: [
            {
              id: `insight_step_${index}_1`,
              name: 'Process Analysis',
              description: 'Analyze current process alignment with Blue Ocean insights',
              duration: '2 weeks',
              dependencies: [],
              assignee: 'Strategy Analyst',
              status: 'pending',
              deliverables: ['Gap analysis', 'Strategic alignment assessment']
            },
            {
              id: `insight_step_${index}_2`,
              name: 'Process Redesign',
              description: 'Redesign process to incorporate Blue Ocean insights',
              duration: '4 weeks',
              dependencies: [`insight_step_${index}_1`],
              assignee: 'Process Designer',
              status: 'pending',
              deliverables: ['New process design', 'Implementation plan']
            }
          ],
          timeline: '6 weeks',
          resources: ['Strategy Analyst', 'Process Designer', 'Implementation Team'],
          budget: 20000,
          owner: 'Strategy Implementation Manager',
          stakeholders: ['Strategy Team', 'Operations', 'Quality Assurance']
        },
        metrics: {
          kpis: ['Strategic alignment', 'Process efficiency', 'Value creation', 'Customer impact'],
          baselines: { alignment: 5, efficiency: 5, value: 5, impact: 5 },
          targets: { alignment: 9, efficiency: 8, value: 8, impact: 8 },
          currentValues: { alignment: 5, efficiency: 5, value: 5, impact: 5 }
        },
        blueOceanAlignment: {
          buyerUtilityImpact: ['Strategic process alignment'],
          buyerGroupBenefit: insight.sourceData?.buyerGroups || [],
          strategicContribution: `Aligns process with Blue Ocean insight: ${insight.title}`
        },
        createdAt: new Date().toISOString()
      }));

    // Add generated improvements to existing ones
    const allNewImprovements = [...blueOceanImprovements, ...insightImprovements];
    if (allNewImprovements.length > 0) {
      setImprovements(prev => {
        const existingIds = prev.map(imp => imp.id);
        const newImprovements = allNewImprovements.filter(imp => !existingIds.includes(imp.id));
        return [...prev, ...newImprovements];
      });
    }

    // Generate demo process map
    const demoProcessMap: ProcessMap = {
      id: 'map_customer_journey',
      name: 'Customer Journey Process Map',
      description: 'End-to-end customer journey mapped to Blue Ocean Buyer Utility stages',
      type: 'customer_journey',
      stages: [
        {
          id: 'stage_awareness',
          name: 'Awareness & Discovery',
          description: 'Customer becomes aware of need and discovers solutions',
          owner: 'Marketing Team',
          duration: '1-7 days',
          inputs: ['Market research', 'Customer needs'],
          outputs: ['Qualified leads', 'Initial interest'],
          painPoints: ['Information overload', 'Complex messaging'],
          improvementOpportunities: ['Simplify messaging', 'Improve targeting'],
          utilityScore: 6,
          efficiencyScore: 7
        },
        {
          id: 'stage_evaluation',
          name: 'Evaluation & Purchase',
          description: 'Customer evaluates options and makes purchase decision',
          owner: 'Sales Team',
          duration: '3-14 days',
          inputs: ['Product information', 'Pricing'],
          outputs: ['Purchase decision', 'Signed contract'],
          painPoints: ['Complex pricing', 'Long evaluation process'],
          improvementOpportunities: ['Streamline pricing', 'Reduce friction'],
          utilityScore: 5,
          efficiencyScore: 5
        },
        {
          id: 'stage_onboarding',
          name: 'Onboarding & Implementation',
          description: 'Customer onboarding and initial product setup',
          owner: 'Customer Success Team',
          duration: '1-4 weeks',
          inputs: ['Purchase order', 'Customer requirements'],
          outputs: ['Configured product', 'Trained users'],
          painPoints: ['Complex setup', 'Steep learning curve'],
          improvementOpportunities: ['Automate setup', 'Improve training'],
          utilityScore: 4,
          efficiencyScore: 4
        }
      ],
      improvements: blueOceanImprovements.map(imp => imp.id),
      blueOceanUtilityMapping: {
        'stage_awareness': ['Purchase'],
        'stage_evaluation': ['Purchase'],
        'stage_onboarding': ['Delivery', 'Use']
      }
    };

    setProcessMaps([demoProcessMap]);
  }, [frameworkState.process.improvements, blueOceanData, insights]);

  // Generate improvement from Blue Ocean insight
  const generateImprovementFromInsight = (insight: any) => {
    const newImprovement: ProcessImprovement = {
      id: `improvement_${Date.now()}`,
      title: `Process Optimization: ${insight.title}`,
      description: `Process improvement generated from Blue Ocean Strategy insight: ${insight.description}`,
      category: 'workflow',
      priority: 'high',
      status: 'identified',
      blueOceanSource: insight.id,
      currentState: {
        description: 'Current process state before optimization',
        painPoints: [
          'Inefficient workflow',
          'Poor customer experience',
          'High operational costs'
        ],
        efficiency: 5,
        customerSatisfaction: 5,
        cost: 30000
      },
      targetState: {
        description: 'Optimized process aligned with Blue Ocean insights',
        expectedBenefits: insight.recommendations.slice(0, 4),
        targetEfficiency: 8,
        targetSatisfaction: 8,
        estimatedCostSavings: 20000
      },
      implementation: {
        steps: [
          {
            id: `step_${Date.now()}_1`,
            name: 'Process Assessment',
            description: 'Assess current process and identify improvement areas',
            duration: '2 weeks',
            dependencies: [],
            assignee: 'Process Analyst',
            status: 'pending',
            deliverables: ['Assessment report', 'Improvement recommendations']
          }
        ],
        timeline: '8 weeks',
        resources: ['Process Analyst', 'Implementation Team'],
        budget: 25000,
        owner: 'Operations Manager',
        stakeholders: ['Operations', 'Customer Experience', 'IT']
      },
      metrics: {
        kpis: ['Process efficiency', 'Customer satisfaction', 'Cost reduction'],
        baselines: { efficiency: 5, satisfaction: 5, cost: 100 },
        targets: { efficiency: 8, satisfaction: 8, cost: 70 },
        currentValues: { efficiency: 5, satisfaction: 5, cost: 100 }
      },
      blueOceanAlignment: {
        buyerUtilityImpact: ['Process optimization'],
        buyerGroupBenefit: insight.sourceData?.buyerGroups || [],
        strategicContribution: `Implements Blue Ocean insight: ${insight.title}`
      },
      createdAt: new Date().toISOString()
    };

    setImprovements(prev => [...prev, newImprovement]);
    
    toast({
      title: "Process Improvement Created!",
      description: `Created "${newImprovement.title}" from Blue Ocean insight`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'planned': return 'orange';
      case 'on_hold': return 'gray';
      case 'identified': return 'purple';
      default: return 'gray';
    }
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'customer_journey': return '👥';
      case 'operations': return '⚙️';
      case 'technology': return '💻';
      case 'workflow': return '🔄';
      case 'quality': return '✅';
      case 'cost_reduction': return '💰';
      default: return '🔧';
    }
  };

  const calculateCompletionPercentage = (improvement: ProcessImprovement): number => {
    const completedSteps = improvement.implementation.steps.filter(step => step.status === 'completed').length;
    return (completedSteps / improvement.implementation.steps.length) * 100;
  };

  const renderImprovementsDashboard = () => (
    <VStack spacing={6} align="stretch">
      {/* Integration Status */}
      {hasData && (
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Blue Ocean Process Integration Active</Text>
            <Text fontSize="sm">
              {improvements.filter(i => i.blueOceanSource).length} process improvements generated from Blue Ocean Strategy insights. 
              Focus on utility blocks with scores ≤5 for maximum impact.
            </Text>
          </VStack>
        </Alert>
      )}

      {!hasData && (
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Ready for Blue Ocean Process Integration</Text>
            <Text fontSize="sm">
              Complete Blue Ocean Strategy Buyer Utility Map to automatically identify process improvement opportunities based on low utility scores.
            </Text>
          </VStack>
        </Alert>
      )}

      {/* Process Overview Metrics */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {improvements.length}
            </Text>
            <Text fontSize="sm" color="gray.600">Total Improvements</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {improvements.filter(i => i.status === 'completed').length}
            </Text>
            <Text fontSize="sm" color="gray.600">Completed</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="purple.500">
              {improvements.filter(i => i.blueOceanSource).length}
            </Text>
            <Text fontSize="sm" color="gray.600">From Blue Ocean</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="orange.500">
              {improvements.reduce((sum, i) => sum + i.targetState.estimatedCostSavings, 0).toLocaleString()}
            </Text>
            <Text fontSize="sm" color="gray.600">Potential Savings ($)</Text>
          </CardBody>
        </Card>
      </Grid>

      {/* Improvements List */}
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">Process Improvements</Text>
            <Button size="sm" colorScheme="blue" onClick={onImprovementOpen}>
              Create Improvement
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {improvements.map(improvement => (
              <Card key={improvement.id} bg={infoBg} _hover={{ shadow: 'md' }} cursor="pointer">
                <CardBody>
                  <HStack justify="space-between" align="start" mb={3}>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Text fontSize="lg">{getCategoryIcon(improvement.category)}</Text>
                        <Text fontWeight="semibold">{improvement.title}</Text>
                        {improvement.blueOceanSource && (
                          <Badge colorScheme="purple" size="sm">🌊 Blue Ocean</Badge>
                        )}
                        {improvement.utilityStageTarget && (
                          <Badge colorScheme="blue" size="sm">
                            {improvement.utilityStageTarget} - {improvement.utilityLeverTarget}
                          </Badge>
                        )}
                      </HStack>
                      <Text fontSize="sm" color="gray.600">{improvement.description}</Text>
                      <HStack spacing={4}>
                        <Text fontSize="xs">
                          <strong>Category:</strong> {improvement.category}
                        </Text>
                        <Text fontSize="xs">
                          <strong>Timeline:</strong> {improvement.implementation.timeline}
                        </Text>
                        <Text fontSize="xs">
                          <strong>Budget:</strong> ${improvement.implementation.budget.toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack align="end" spacing={2}>
                      <Badge colorScheme={getStatusColor(improvement.status)}>
                        {improvement.status}
                      </Badge>
                      <Badge colorScheme={getPriorityColor(improvement.priority)} size="sm">
                        {improvement.priority} priority
                      </Badge>
                      <CircularProgress 
                        value={calculateCompletionPercentage(improvement)} 
                        size="40px" 
                        color="green.400"
                      >
                        <CircularProgressLabel fontSize="10px">
                          {Math.round(calculateCompletionPercentage(improvement))}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    </VStack>
                  </HStack>

                  {/* Current vs Target State */}
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    <Box p={3} bg="red.50" borderRadius="md">
                      <Text fontSize="xs" fontWeight="semibold" mb={1}>Current State</Text>
                      <HStack spacing={4}>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="xs">Efficiency: {improvement.currentState.efficiency}/10</Text>
                          <Progress value={improvement.currentState.efficiency * 10} colorScheme="red" size="sm" width="60px" />
                        </VStack>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="xs">Satisfaction: {improvement.currentState.customerSatisfaction}/10</Text>
                          <Progress value={improvement.currentState.customerSatisfaction * 10} colorScheme="red" size="sm" width="60px" />
                        </VStack>
                      </HStack>
                    </Box>
                    <Box p={3} bg="green.50" borderRadius="md">
                      <Text fontSize="xs" fontWeight="semibold" mb={1}>Target State</Text>
                      <HStack spacing={4}>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="xs">Target: {improvement.targetState.targetEfficiency}/10</Text>
                          <Progress value={improvement.targetState.targetEfficiency * 10} colorScheme="green" size="sm" width="60px" />
                        </VStack>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="xs">Savings: ${improvement.targetState.estimatedCostSavings.toLocaleString()}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </Grid>

                  {improvement.blueOceanAlignment && (
                    <Box mt={3} p={2} bg="purple.50" borderRadius="md">
                      <Text fontSize="xs" fontWeight="semibold" mb={1}>Blue Ocean Alignment:</Text>
                      <Text fontSize="xs">
                        {improvement.blueOceanAlignment.strategicContribution}
                      </Text>
                    </Box>
                  )}
                </CardBody>
              </Card>
            ))}
            {improvements.length === 0 && (
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  No process improvements yet. Create improvements manually or complete Blue Ocean Strategy Buyer Utility Map to auto-generate improvement opportunities.
                </Text>
              </Alert>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderUtilityMapping = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Blue Ocean Utility Block Analysis</Text>
          <Text fontSize="sm">
            Process improvements mapped to Blue Ocean Buyer Utility Map blocks. Low utility scores (≤5) indicate high-priority improvement opportunities.
          </Text>
        </VStack>
      </Alert>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Utility Block Improvement Mapping</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(7, 1fr)" gap={2}>
            {/* Header row */}
            <Box></Box>
            {utilityLevers.map(lever => (
              <Box key={lever} p={2} bg="gray.100" textAlign="center">
                <Text fontSize="xs" fontWeight="semibold">{lever}</Text>
              </Box>
            ))}

            {/* Utility stage rows */}
            {utilityStages.map((stage, stageIndex) => (
              <React.Fragment key={stage}>
                <Box p={2} bg="gray.100" textAlign="center">
                  <Text fontSize="xs" fontWeight="semibold">{stage}</Text>
                </Box>
                {utilityLevers.map((lever, leverIndex) => {
                  const blockIndex = stageIndex * 6 + leverIndex;
                  const block = blueOceanData.buyerUtilityMap?.utilityBlocks?.[blockIndex];
                  const score = block?.score || 5;
                  const hasImprovement = improvements.some(imp => 
                    imp.utilityStageTarget === stage && imp.utilityLeverTarget === lever
                  );

                  return (
                    <Box 
                      key={`${stage}-${lever}`}
                      p={2}
                      bg={score <= 3 ? 'red.100' : score <= 5 ? 'orange.100' : 'green.100'}
                      borderRadius="md"
                      textAlign="center"
                      border={hasImprovement ? '2px solid' : '1px solid'}
                      borderColor={hasImprovement ? 'purple.500' : 'gray.200'}
                    >
                      <VStack spacing={1}>
                        <Text fontSize="sm" fontWeight="bold">{score}/10</Text>
                        {hasImprovement && (
                          <Badge colorScheme="purple" size="xs">Improvement</Badge>
                        )}
                        {score <= 5 && !hasImprovement && (
                          <Badge colorScheme="orange" size="xs">Opportunity</Badge>
                        )}
                      </VStack>
                    </Box>
                  );
                })}
              </React.Fragment>
            ))}
          </Grid>

          <Box mt={4}>
            <Text fontSize="sm" fontWeight="semibold" mb={2}>Legend:</Text>
            <HStack spacing={4}>
              <HStack>
                <Box w={4} h={4} bg="red.100" borderRadius="sm"></Box>
                <Text fontSize="xs">Critical (≤3): Immediate improvement needed</Text>
              </HStack>
              <HStack>
                <Box w={4} h={4} bg="orange.100" borderRadius="sm"></Box>
                <Text fontSize="xs">Opportunity (4-5): Improvement beneficial</Text>
              </HStack>
              <HStack>
                <Box w={4} h={4} bg="green.100" borderRadius="sm"></Box>
                <Text fontSize="xs">Strong (6+): Maintain current performance</Text>
              </HStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Utility-based improvements summary */}
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Utility-Based Improvements</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={3} align="stretch">
            {improvements
              .filter(imp => imp.utilityStageTarget && imp.utilityLeverTarget)
              .map(improvement => (
                <Box key={improvement.id} p={3} bg={warningBg} borderRadius="md">
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">{improvement.title}</Text>
                      <Text fontSize="xs" color="gray.600">
                        Target: {improvement.utilityStageTarget} - {improvement.utilityLeverTarget}
                      </Text>
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <Badge colorScheme={getPriorityColor(improvement.priority)}>
                        {improvement.priority}
                      </Badge>
                      <Text fontSize="xs">
                        ${improvement.targetState.estimatedCostSavings.toLocaleString()} savings
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderBlueOceanProcessInsights = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="success">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Blue Ocean Process Intelligence</Text>
          <Text fontSize="sm">
            Strategic process insights derived from Blue Ocean Strategy that can be converted into specific process improvements.
          </Text>
        </VStack>
      </Alert>

      {insights.filter(insight => insight.targetFrameworks.includes('process')).map(insight => (
        <Card key={insight.id} bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="bold">{insight.title}</Text>
                <Text fontSize="sm" color="gray.600">{insight.description}</Text>
              </VStack>
              <Button 
                size="sm" 
                colorScheme="blue"
                onClick={() => generateImprovementFromInsight(insight)}
                isDisabled={improvements.some(i => i.blueOceanSource === insight.id)}
              >
                {improvements.some(i => i.blueOceanSource === insight.id) ? 'Improvement Created' : 'Generate Improvement'}
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Process Recommendations:</Text>
                <VStack align="start" spacing={1}>
                  {insight.recommendations.map((rec: string, index: number) => (
                    <Text key={index} fontSize="sm">• {rec}</Text>
                  ))}
                </VStack>
              </Box>
              
              {insight.appliedResults && insight.appliedResults.length > 0 && (
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Applied Results:</Text>
                  <VStack spacing={2} align="stretch">
                    {insight.appliedResults.filter((result: any) => result.framework === 'process').map((result: any, index: number) => (
                      <Box key={index} p={3} bg={successBg} borderRadius="md">
                        <Text fontSize="sm" fontWeight="semibold">{result.action}</Text>
                        <Text fontSize="sm" color="gray.600">{result.outcome}</Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>
      ))}

      {insights.filter(insight => insight.targetFrameworks.includes('process')).length === 0 && (
        <Alert status="info">
          <AlertIcon />
          <Text fontSize="sm">
            No Blue Ocean insights available for process improvement yet. Complete Six Paths Analysis and generate insights to see process opportunities.
          </Text>
        </Alert>
      )}
    </VStack>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">🔄</Text>
            <Text fontSize="3xl" fontWeight="bold">Process Improvement</Text>
            <Badge colorScheme="green" ml={2}>BLUE OCEAN INTEGRATED</Badge>
          </HStack>
          <Text color="gray.600" mb={6}>
            AI-assisted process improvement powered by Blue Ocean Strategy insights. Automatically identify improvement opportunities from utility block analysis and strategic positioning.
          </Text>
        </Box>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Improvements Dashboard</Tab>
            <Tab>Utility Block Mapping</Tab>
            <Tab>Blue Ocean Process Insights</Tab>
            <Tab>Process Maps</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderImprovementsDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              {renderUtilityMapping()}
            </TabPanel>
            <TabPanel px={0}>
              {renderBlueOceanProcessInsights()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Advanced process mapping with real-time monitoring and Blue Ocean integration coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default ProcessImprovementWithIntegration;