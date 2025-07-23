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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

// Framework Integration Data Structures
interface FrameworkInsight {
  id: string;
  sourceFramework: 'blue_ocean' | 'marketing_automation' | 'hr_management' | 'process_improvement' | 'inquiry_framework';
  targetFrameworks: string[];
  insightType: 'strategic_opportunity' | 'market_gap' | 'capability_requirement' | 'process_optimization' | 'question_pattern';
  title: string;
  description: string;
  actionableRecommendations: string[];
  impactLevel: 'high' | 'medium' | 'low';
  confidenceScore: number;
  generatedAt: string;
  appliedTo: string[];
  results: FrameworkResult[];
}

interface FrameworkResult {
  targetFramework: string;
  action: string;
  outcome: string;
  metrics: { [key: string]: number };
  timestamp: string;
}

interface CrossFrameworkWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
  currentStep: number;
  status: 'active' | 'completed' | 'paused';
  insights: FrameworkInsight[];
}

interface WorkflowStep {
  framework: string;
  action: string;
  inputs: string[];
  outputs: string[];
  completed: boolean;
}

interface WorkflowTrigger {
  sourceFramework: string;
  condition: string;
  targetWorkflow: string;
  autoExecute: boolean;
}

// Demo data for framework integration
const DEMO_INSIGHTS: FrameworkInsight[] = [
  {
    id: 'bo_001',
    sourceFramework: 'blue_ocean',
    targetFrameworks: ['marketing_automation', 'hr_management'],
    insightType: 'strategic_opportunity',
    title: 'Emotional Appeal Shift Opportunity',
    description: 'Six Paths Analysis revealed a functional-to-emotional positioning opportunity in the productivity software market',
    actionableRecommendations: [
      'Develop emotional messaging campaign emphasizing lifestyle transformation',
      'Hire marketing talent with emotional branding expertise',
      'Redesign user experience to emphasize feelings over features',
      'Create customer stories highlighting personal transformation'
    ],
    impactLevel: 'high',
    confidenceScore: 87,
    generatedAt: new Date().toISOString(),
    appliedTo: [],
    results: []
  },
  {
    id: 'bo_002',
    sourceFramework: 'blue_ocean',
    targetFrameworks: ['process_improvement'],
    insightType: 'market_gap',
    title: 'Complementary Service Integration',
    description: 'Buyer Utility Map identified low convenience scores in the "Use" stage, suggesting service bundling opportunity',
    actionableRecommendations: [
      'Streamline onboarding process to reduce setup time',
      'Integrate complementary tools identified in Six Paths Analysis',
      'Automate maintenance and support processes',
      'Create seamless handoffs between service touchpoints'
    ],
    impactLevel: 'high',
    confidenceScore: 92,
    generatedAt: new Date().toISOString(),
    appliedTo: ['process_improvement'],
    results: [
      {
        targetFramework: 'process_improvement',
        action: 'Created automated onboarding workflow',
        outcome: 'Reduced setup time from 2 hours to 20 minutes',
        metrics: { 'setup_time_reduction': 83, 'customer_satisfaction': 94 },
        timestamp: new Date().toISOString()
      }
    ]
  },
  {
    id: 'inquiry_001',
    sourceFramework: 'inquiry_framework',
    targetFrameworks: ['blue_ocean', 'marketing_automation'],
    insightType: 'question_pattern',
    title: 'Strategic Questioning Pattern',
    description: 'Why → What If → How analysis uncovered assumptions about customer price sensitivity',
    actionableRecommendations: [
      'Test value-based pricing model instead of cost-plus',
      'Survey target market on willingness to pay for outcomes',
      'Develop pricing strategy based on Blue Ocean value innovation',
      'Create marketing campaigns around value rather than price'
    ],
    impactLevel: 'medium',
    confidenceScore: 78,
    generatedAt: new Date().toISOString(),
    appliedTo: [],
    results: []
  }
];

const DEMO_WORKFLOWS: CrossFrameworkWorkflow[] = [
  {
    id: 'workflow_001',
    name: 'Blue Ocean to Market Execution',
    description: 'Transform Blue Ocean insights into marketing campaigns and HR capabilities',
    steps: [
      {
        framework: 'blue_ocean',
        action: 'Complete Six Paths Analysis',
        inputs: ['Industry analysis', 'Competitor research'],
        outputs: ['Alternative industries', 'Buyer groups', 'Complementary products'],
        completed: true
      },
      {
        framework: 'blue_ocean',
        action: 'Generate Strategic Insights',
        inputs: ['Six Paths data'],
        outputs: ['Value innovation opportunities', 'Market gaps'],
        completed: true
      },
      {
        framework: 'marketing_automation',
        action: 'Create Targeted Campaigns',
        inputs: ['Value innovation opportunities', 'Buyer groups'],
        outputs: ['Campaign strategies', 'Customer segments'],
        completed: false
      },
      {
        framework: 'hr_management',
        action: 'Develop Required Capabilities',
        inputs: ['Market gaps', 'Strategic opportunities'],
        outputs: ['Job descriptions', 'Training programs'],
        completed: false
      }
    ],
    triggers: [
      {
        sourceFramework: 'blue_ocean',
        condition: 'Six Paths Analysis completed with >3 opportunities',
        targetWorkflow: 'workflow_001',
        autoExecute: true
      }
    ],
    currentStep: 2,
    status: 'active',
    insights: DEMO_INSIGHTS.slice(0, 2)
  }
];

const FrameworkIntegrationHub: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const [insights, setInsights] = useState<FrameworkInsight[]>(DEMO_INSIGHTS);
  const [workflows, setWorkflows] = useState<CrossFrameworkWorkflow[]>(DEMO_WORKFLOWS);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedInsight, setSelectedInsight] = useState<FrameworkInsight | null>(null);

  const { isOpen: isInsightOpen, onOpen: onInsightOpen, onClose: onInsightClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'blue_ocean': return '🌊';
      case 'marketing_automation': return '📈';
      case 'hr_management': return '👥';
      case 'process_improvement': return '🔄';
      case 'inquiry_framework': return '🧠';
      default: return '🧩';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  const applyInsightToFramework = (insight: FrameworkInsight, targetFramework: string) => {
    // Simulate applying insight to target framework
    const result: FrameworkResult = {
      targetFramework,
      action: `Applied "${insight.title}" insight`,
      outcome: `Generated new ${targetFramework} strategies`,
      metrics: {
        'improvement_score': Math.floor(Math.random() * 30) + 70,
        'confidence_level': insight.confidenceScore
      },
      timestamp: new Date().toISOString()
    };

    setInsights(prev => prev.map(i => 
      i.id === insight.id 
        ? { 
            ...i, 
            appliedTo: [...i.appliedTo, targetFramework],
            results: [...i.results, result]
          }
        : i
    ));
  };

  const renderInsightsDashboard = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Framework Integration Intelligence</Text>
          <Text fontSize="sm">
            Real-time insights generated from framework interactions, showing how discoveries in one area create opportunities in others.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
        {insights.map(insight => (
          <Card key={insight.id} bg={cardBg} _hover={{ shadow: 'lg' }} cursor="pointer">
            <CardHeader pb={3}>
              <HStack justify="space-between" align="start">
                <HStack>
                  <Text fontSize="lg">{getFrameworkIcon(insight.sourceFramework)}</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="bold">{insight.title}</Text>
                    <Text fontSize="xs" color="gray.600">
                      From {insight.sourceFramework.replace('_', ' ')}
                    </Text>
                  </VStack>
                </HStack>
                <VStack align="end" spacing={1}>
                  <Badge colorScheme={getImpactColor(insight.impactLevel)} size="sm">
                    {insight.impactLevel} impact
                  </Badge>
                  <Text fontSize="xs" color="gray.500">
                    {insight.confidenceScore}% confidence
                  </Text>
                </VStack>
              </HStack>
            </CardHeader>
            <CardBody pt={0}>
              <Text fontSize="sm" color="gray.600" mb={3}>
                {insight.description}
              </Text>
              
              <VStack spacing={3} align="stretch">
                <Box>
                  <Text fontSize="xs" fontWeight="semibold" mb={2}>Target Frameworks:</Text>
                  <HStack spacing={2}>
                    {insight.targetFrameworks.map(target => (
                      <Badge key={target} size="sm" variant="outline">
                        {getFrameworkIcon(target)} {target.replace('_', ' ')}
                      </Badge>
                    ))}
                  </HStack>
                </Box>

                <Box>
                  <Text fontSize="xs" fontWeight="semibold" mb={2}>
                    Recommendations ({insight.actionableRecommendations.length}):
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {insight.actionableRecommendations[0]}
                    {insight.actionableRecommendations.length > 1 && '...'}
                  </Text>
                </Box>

                <HStack justify="space-between">
                  <Button 
                    size="xs" 
                    variant="outline"
                    onClick={() => {
                      setSelectedInsight(insight);
                      onInsightOpen();
                    }}
                  >
                    View Details
                  </Button>
                  <Text fontSize="xs" color="gray.500">
                    Applied to {insight.appliedTo.length} framework{insight.appliedTo.length !== 1 ? 's' : ''}
                  </Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );

  const renderWorkflowOrchestration = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="success">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Cross-Framework Workflows</Text>
          <Text fontSize="sm">
            Automated workflows that orchestrate insights and actions across multiple frameworks for comprehensive strategic execution.
          </Text>
        </VStack>
      </Alert>

      {workflows.map(workflow => (
        <Card key={workflow.id} bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="bold">{workflow.name}</Text>
                <Text fontSize="sm" color="gray.600">{workflow.description}</Text>
              </VStack>
              <VStack align="end" spacing={1}>
                <Badge colorScheme={workflow.status === 'active' ? 'green' : 'blue'}>
                  {workflow.status}
                </Badge>
                <Text fontSize="sm">
                  Step {workflow.currentStep + 1}/{workflow.steps.length}
                </Text>
              </VStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {/* Workflow Progress */}
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="semibold">Workflow Progress</Text>
                  <Text fontSize="sm">
                    {workflow.steps.filter(s => s.completed).length}/{workflow.steps.length} completed
                  </Text>
                </HStack>
                <Progress 
                  value={(workflow.steps.filter(s => s.completed).length / workflow.steps.length) * 100}
                  colorScheme="blue"
                  size="sm"
                  borderRadius="md"
                />
              </Box>

              {/* Workflow Steps */}
              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text fontSize="sm" fontWeight="semibold">View Workflow Steps</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={3} align="stretch">
                      {workflow.steps.map((step, index) => (
                        <HStack key={index} p={3} bg={step.completed ? successBg : infoBg} borderRadius="md">
                          <Text fontSize="lg">{getFrameworkIcon(step.framework)}</Text>
                          <VStack align="start" spacing={0} flex={1}>
                            <HStack>
                              <Text fontSize="sm" fontWeight="semibold">{step.action}</Text>
                              {step.completed && <Badge colorScheme="green" size="sm">✓</Badge>}
                              {index === workflow.currentStep && <Badge colorScheme="orange" size="sm">Current</Badge>}
                            </HStack>
                            <Text fontSize="xs" color="gray.600">
                              {step.framework.replace('_', ' ')} framework
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              Outputs: {step.outputs.join(', ')}
                            </Text>
                          </VStack>
                        </HStack>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* Associated Insights */}
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Generated Insights ({workflow.insights.length})</Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                  {workflow.insights.map(insight => (
                    <Box key={insight.id} p={3} bg={infoBg} borderRadius="md">
                      <HStack justify="space-between" mb={1}>
                        <Text fontSize="xs" fontWeight="semibold">{insight.title}</Text>
                        <Badge size="xs" colorScheme={getImpactColor(insight.impactLevel)}>
                          {insight.impactLevel}
                        </Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">{insight.description}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );

  const renderInsightDetail = () => {
    if (!selectedInsight) return null;

    return (
      <Modal isOpen={isInsightOpen} onClose={onInsightClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text fontSize="lg">{getFrameworkIcon(selectedInsight.sourceFramework)}</Text>
              <Text>{selectedInsight.title}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Description</Text>
                <Text fontSize="sm" color="gray.600">{selectedInsight.description}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Actionable Recommendations</Text>
                <VStack spacing={2} align="stretch">
                  {selectedInsight.actionableRecommendations.map((rec, index) => (
                    <HStack key={index} align="start">
                      <Text fontSize="sm" color="blue.500">•</Text>
                      <Text fontSize="sm">{rec}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Apply to Frameworks</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                  {selectedInsight.targetFrameworks.map(framework => (
                    <Button
                      key={framework}
                      size="sm"
                      variant="outline"
                      leftIcon={<Text>{getFrameworkIcon(framework)}</Text>}
                      onClick={() => applyInsightToFramework(selectedInsight, framework)}
                      isDisabled={selectedInsight.appliedTo.includes(framework)}
                    >
                      {selectedInsight.appliedTo.includes(framework) ? 'Applied' : 'Apply'} to {framework.replace('_', ' ')}
                    </Button>
                  ))}
                </Grid>
              </Box>

              {selectedInsight.results.length > 0 && (
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Application Results</Text>
                  <VStack spacing={2} align="stretch">
                    {selectedInsight.results.map((result, index) => (
                      <Box key={index} p={3} bg={successBg} borderRadius="md">
                        <Text fontSize="sm" fontWeight="semibold">{result.action}</Text>
                        <Text fontSize="sm" color="gray.600" mb={2}>{result.outcome}</Text>
                        <HStack spacing={4}>
                          {Object.entries(result.metrics).map(([metric, value]) => (
                            <HStack key={metric}>
                              <Text fontSize="xs" color="gray.500">{metric.replace('_', ' ')}:</Text>
                              <Text fontSize="xs" fontWeight="semibold">{value}%</Text>
                            </HStack>
                          ))}
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onInsightClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">🔗</Text>
            <Text fontSize="3xl" fontWeight="bold">Framework Integration Hub</Text>
          </HStack>
          <Text color="gray.600" mb={6}>
            Discover how insights from one framework create opportunities in others. Real cross-framework intelligence that drives innovation and strategic advantage.
          </Text>
        </Box>

        {/* Core Concept */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Interconnected Strategic Intelligence</Text>
            <Text fontSize="sm">
              Blue Ocean insights automatically trigger Marketing campaigns → HR capability development → Process optimization → Enhanced questioning frameworks
            </Text>
          </VStack>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Cross-Framework Insights</Tab>
            <Tab>Workflow Orchestration</Tab>
            <Tab>Impact Analytics</Tab>
            <Tab>Integration Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderInsightsDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              {renderWorkflowOrchestration()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Impact analytics showing ROI and effectiveness of cross-framework integrations coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Integration settings for configuring automatic workflows and insight triggers coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Insight Detail Modal */}
      {renderInsightDetail()}
    </Box>
  );
};

export default FrameworkIntegrationHub;