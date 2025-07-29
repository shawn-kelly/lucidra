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
  Select,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Progress,
  Alert,
  AlertIcon,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
} from '@chakra-ui/react';

// Process Improvement Data Structures
interface ProcessNarrative {
  id: string;
  processName: string;
  department: string;
  description: string;
  currentState: string;
  inputs: ProcessInput[];
  outputs: ProcessOutput[];
  timeMetrics: TimeMetrics;
  stakeholders: string[];
  painPoints: string[];
  improvementOpportunities: string[];
  strategicAlignment: string;
  createdAt: string;
  lastUpdated: string;
}

interface ProcessInput {
  id: string;
  name: string;
  type: 'data' | 'material' | 'resource' | 'information' | 'trigger';
  source: string;
  frequency: 'continuous' | 'daily' | 'weekly' | 'monthly' | 'on-demand';
  quality: number; // 1-10 scale
  availability: number; // 1-10 scale
  dependencies: string[];
}

interface ProcessOutput {
  id: string;
  name: string;
  type: 'deliverable' | 'decision' | 'data' | 'service' | 'product';
  destination: string;
  quality: number; // 1-10 scale
  value: number; // 1-10 scale
  recipients: string[];
  successCriteria: string[];
}

interface TimeMetrics {
  totalCycleTime: number; // in minutes
  valueAddedTime: number; // in minutes
  waitTime: number; // in minutes
  reworkTime: number; // in minutes
  efficiency: number; // percentage
  bottlenecks: string[];
  peakTimes: string[];
}

interface ProcessMapping {
  id: string;
  processNarrativeId: string;
  mapType: 'value-stream' | 'flowchart' | 'cross-functional' | 'system';
  steps: ProcessStep[];
  connections: ProcessConnection[];
  departments: string[];
  systems: string[];
  handoffs: ProcessHandoff[];
  aiRecommendations: AIRecommendation[];
  improvementOpportunities: ImprovementOpportunity[];
}

interface ProcessStep {
  id: string;
  name: string;
  type: 'task' | 'decision' | 'delay' | 'inspection' | 'storage';
  owner: string;
  department: string;
  timeRequired: number; // in minutes
  resources: string[];
  inputs: string[];
  outputs: string[];
  value: 'value-add' | 'non-value-add' | 'necessary-non-value-add';
  automationPotential: number; // 1-10 scale
  improvementPotential: number; // 1-10 scale
}

interface ProcessConnection {
  id: string;
  fromStepId: string;
  toStepId: string;
  condition?: string;
  probability?: number;
  notes?: string;
}

interface ProcessHandoff {
  id: string;
  fromDepartment: string;
  toDepartment: string;
  stepId: string;
  handoffType: 'information' | 'material' | 'responsibility' | 'approval';
  riskLevel: 'low' | 'medium' | 'high';
  communicationMethod: string;
  delays: number; // typical delay in minutes
}

interface AIRecommendation {
  id: string;
  category: 'automation' | 'elimination' | 'simplification' | 'standardization' | 'technology';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedBenefit: string;
  implementationEffort: 'low' | 'medium' | 'high';
  estimatedSavings: number; // in hours/week
  confidence: number; // 1-10 scale
  prerequisities: string[];
}

interface ImprovementOpportunity {
  id: string;
  type: 'waste-elimination' | 'automation' | 'standardization' | 'digitization' | 'training';
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  timeframe: 'immediate' | 'short-term' | 'long-term';
  description: string;
  expectedOutcome: string;
  kpis: string[];
  owner: string;
  status: 'identified' | 'planned' | 'in-progress' | 'completed';
}

interface IntegrationOptions {
  strategyAlignment: boolean;
  hrIntegration: boolean;
  marketingWorkflows: boolean;
  financialImpact: boolean;
  standaloneMode: boolean;
}

// Process Improvement Component
const ProcessImprovement: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const [narratives, setNarratives] = useState<ProcessNarrative[]>([]);
  const [mappings, setMappings] = useState<ProcessMapping[]>([]);
  const [selectedNarrative, setSelectedNarrative] = useState<ProcessNarrative | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [integrationOptions, setIntegrationOptions] = useState<IntegrationOptions>({
    strategyAlignment: true,
    hrIntegration: true,
    marketingWorkflows: false,
    financialImpact: true,
    standaloneMode: false
  });

  const { isOpen: isNarrativeOpen, onOpen: onNarrativeOpen, onClose: onNarrativeClose } = useDisclosure();
  const { isOpen: isMappingOpen, onOpen: onMappingOpen, onClose: onMappingClose } = useDisclosure();
  const { isOpen: isAIOpen, onOpen: onAIOpen, onClose: onAIClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  // Initialize demo data
  useEffect(() => {
    const demoNarratives: ProcessNarrative[] = [
      {
        id: 'narrative_001',
        processName: 'Customer Onboarding Process',
        department: 'Sales & Customer Success',
        description: 'Complete process for onboarding new enterprise customers from contract signature to full platform activation.',
        currentState: 'Manual process with multiple handoffs between sales, technical, and success teams. Average onboarding time is 45 days.',
        inputs: [
          {
            id: 'input_001',
            name: 'Signed Contract',
            type: 'information',
            source: 'Sales Team',
            frequency: 'on-demand',
            quality: 9,
            availability: 10,
            dependencies: ['Legal approval', 'Credit check']
          },
          {
            id: 'input_002',
            name: 'Customer Requirements',
            type: 'information',
            source: 'Customer',
            frequency: 'on-demand',
            quality: 7,
            availability: 8,
            dependencies: ['Discovery calls', 'Needs assessment']
          }
        ],
        outputs: [
          {
            id: 'output_001',
            name: 'Activated Customer Account',
            type: 'service',
            destination: 'Customer',
            quality: 8,
            value: 10,
            recipients: ['Customer', 'Customer Success'],
            successCriteria: ['User training completed', 'Platform configured', 'First value delivered']
          }
        ],
        timeMetrics: {
          totalCycleTime: 64800, // 45 days in minutes
          valueAddedTime: 2880, // 2 days actual work
          waitTime: 57600, // 40 days waiting
          reworkTime: 1440, // 1 day rework
          efficiency: 4.4, // 2/45 days
          bottlenecks: ['Technical setup', 'Training scheduling', 'Integration testing'],
          peakTimes: ['Monday mornings', 'End of quarter']
        },
        stakeholders: ['Sales Rep', 'Technical Team', 'Customer Success Manager', 'Customer Admin'],
        painPoints: [
          'Too many handoffs causing delays',
          'Inconsistent communication with customer',
          'Technical setup takes too long',
          'Training scheduling conflicts'
        ],
        improvementOpportunities: [
          'Automate technical setup where possible',
          'Create self-service onboarding portal',
          'Standardize communication templates',
          'Implement progress tracking dashboard'
        ],
        strategicAlignment: 'Critical for customer satisfaction and retention goals. Directly impacts NPS and time-to-value metrics.',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'narrative_002',
        processName: 'Strategic Planning Review Process',
        department: 'Strategy & Operations',
        description: 'Quarterly strategic planning review and adjustment process involving all department heads.',
        currentState: 'Quarterly meetings with extensive preparation, data gathering, and follow-up actions. Current cycle takes 3 weeks.',
        inputs: [
          {
            id: 'input_003',
            name: 'Departmental Performance Data',
            type: 'data',
            source: 'All Departments',
            frequency: 'monthly',
            quality: 8,
            availability: 9,
            dependencies: ['Monthly reporting', 'KPI tracking']
          }
        ],
        outputs: [
          {
            id: 'output_002',
            name: 'Updated Strategic Plan',
            type: 'deliverable',
            destination: 'Executive Team',
            quality: 9,
            value: 10,
            recipients: ['CEO', 'Department Heads', 'Board'],
            successCriteria: ['Clear objectives set', 'Resource allocation defined', 'Timeline established']
          }
        ],
        timeMetrics: {
          totalCycleTime: 30240, // 3 weeks
          valueAddedTime: 2880, // 2 days actual strategic work
          waitTime: 25920, // waiting for data and schedules
          reworkTime: 1440, // revisions
          efficiency: 9.5,
          bottlenecks: ['Data collection', 'Schedule coordination', 'Consensus building'],
          peakTimes: ['Quarter end']
        },
        stakeholders: ['CEO', 'Strategy Director', 'Department Heads', 'Finance Director'],
        painPoints: [
          'Data collection takes too long',
          'Inconsistent data quality across departments',
          'Difficult to schedule all stakeholders',
          'Too much time on presentations vs. strategic thinking'
        ],
        improvementOpportunities: [
          'Implement real-time strategy dashboard',
          'Automate data collection from existing systems',
          'Use async collaboration tools',
          'Pre-populate templates with known data'
        ],
        strategicAlignment: 'Core to organizational agility and strategic execution. Enables rapid response to market changes.',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
    ];

    setNarratives(demoNarratives);
  }, []);

  const generateAIRecommendations = (narrative: ProcessNarrative) => {
    // Simulate AI analysis
    const recommendations: AIRecommendation[] = [
      {
        id: 'ai_rec_001',
        category: 'automation',
        priority: 'high',
        title: 'Automate Customer Account Provisioning',
        description: 'Implement automated account setup based on contract parameters to reduce manual technical work.',
        expectedBenefit: 'Reduce onboarding time by 60% and eliminate setup errors',
        implementationEffort: 'medium',
        estimatedSavings: 20,
        confidence: 9,
        prerequisities: ['API integration', 'Template standardization']
      },
      {
        id: 'ai_rec_002',
        category: 'standardization',
        priority: 'medium',
        title: 'Create Onboarding Playbook',
        description: 'Standardize communication templates and process steps for consistent customer experience.',
        expectedBenefit: 'Improve customer satisfaction and reduce variability',
        implementationEffort: 'low',
        estimatedSavings: 10,
        confidence: 8,
        prerequisities: ['Process documentation', 'Team training']
      }
    ];

    return recommendations;
  };

  const createProcessMapping = (narrative: ProcessNarrative) => {
    // Generate basic process mapping structure
    onMappingOpen();
  };

  const renderNarrativeInput = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <VStack align="start" spacing={2}>
          <HStack>
            <Text fontSize="xl">📝</Text>
            <Text fontSize="xl" fontWeight="bold">Process Narrative Input</Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Capture detailed process information including inputs, outputs, and time metrics
          </Text>
        </VStack>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <FormControl>
              <FormLabel>Process Name</FormLabel>
              <Input placeholder="Enter process name..." />
            </FormControl>

            <FormControl>
              <FormLabel>Department/Function</FormLabel>
              <Select placeholder="Select department">
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="operations">Operations</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="strategy">Strategy</option>
                <option value="customer-success">Customer Success</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Current Cycle Time (days)</FormLabel>
              <NumberInput min={0}>
                <NumberInputField placeholder="0" />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Strategic Priority</FormLabel>
              <Select placeholder="Select priority">
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>Process Description</FormLabel>
            <Textarea
              placeholder="Describe the current process in detail..."
              rows={4}
            />
          </FormControl>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <FormControl>
              <FormLabel>Key Inputs</FormLabel>
              <Textarea
                placeholder="List main inputs (one per line)..."
                rows={5}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Key Outputs</FormLabel>
              <Textarea
                placeholder="List main outputs (one per line)..."
                rows={5}
              />
            </FormControl>
          </Grid>

          <FormControl>
            <FormLabel>Pain Points & Bottlenecks</FormLabel>
            <Textarea
              placeholder="Describe current challenges and bottlenecks..."
              rows={3}
            />
          </FormControl>

          <Divider />

          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>Integration Options</Text>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Switch 
                    isChecked={integrationOptions.strategyAlignment} 
                    onChange={(e) => setIntegrationOptions(prev => ({ ...prev, strategyAlignment: e.target.checked }))}
                  />
                  <Text fontSize="sm">Align with Strategic Frameworks</Text>
                </HStack>
                <HStack>
                  <Switch 
                    isChecked={integrationOptions.hrIntegration} 
                    onChange={(e) => setIntegrationOptions(prev => ({ ...prev, hrIntegration: e.target.checked }))}
                  />
                  <Text fontSize="sm">Connect to HR Competencies</Text>
                </HStack>
                <HStack>
                  <Switch 
                    isChecked={integrationOptions.marketingWorkflows} 
                    onChange={(e) => setIntegrationOptions(prev => ({ ...prev, marketingWorkflows: e.target.checked }))}
                  />
                  <Text fontSize="sm">Link to Marketing Processes</Text>
                </HStack>
              </VStack>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Switch 
                    isChecked={integrationOptions.financialImpact} 
                    onChange={(e) => setIntegrationOptions(prev => ({ ...prev, financialImpact: e.target.checked }))}
                  />
                  <Text fontSize="sm">Calculate Financial Impact</Text>
                </HStack>
                <HStack>
                  <Switch 
                    isChecked={integrationOptions.standaloneMode} 
                    onChange={(e) => setIntegrationOptions(prev => ({ ...prev, standaloneMode: e.target.checked }))}
                  />
                  <Text fontSize="sm">Standalone Process Module</Text>
                </HStack>
              </VStack>
            </Grid>
          </Box>

          <HStack spacing={4}>
            <Button colorScheme="blue" leftIcon={<Text>🤖</Text>}>
              Generate AI Analysis
            </Button>
            <Button colorScheme="green" leftIcon={<Text>🗺️</Text>}>
              Create Process Map
            </Button>
            <Button variant="outline">
              Save Draft
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  const renderProcessMappings = () => (
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
      <VStack spacing={6} align="stretch">
        {/* Process Mappings Gallery */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Process Mappings</Text>
              <Button colorScheme="blue" size="sm" onClick={onMappingOpen}>
                + Create Mapping
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              {narratives.map(narrative => (
                <Card key={narrative.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                  <VStack align="start" spacing={3}>
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="semibold" fontSize="sm">{narrative.processName}</Text>
                      <Badge colorScheme="blue" size="sm">
                        {narrative.department}
                      </Badge>
                    </HStack>
                    <Text fontSize="xs" color="gray.600" noOfLines={2}>
                      {narrative.description}
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={2} w="full" fontSize="xs">
                      <Text>Cycle Time: {Math.round(narrative.timeMetrics.totalCycleTime / 1440)} days</Text>
                      <Text>Efficiency: {narrative.timeMetrics.efficiency}%</Text>
                      <Text>Inputs: {narrative.inputs.length}</Text>
                      <Text>Outputs: {narrative.outputs.length}</Text>
                    </Grid>
                    <HStack spacing={2} w="full">
                      <Button size="xs" colorScheme="blue" variant="outline">
                        View Map
                      </Button>
                      <Button size="xs" colorScheme="green" variant="outline">
                        AI Analysis
                      </Button>
                    </HStack>
                  </VStack>
                </Card>
              ))}
            </Grid>
          </CardBody>
        </Card>

        {/* AI Recommendations */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">🤖 AI-Generated Recommendations</Text>
              <Button size="sm" colorScheme="purple" onClick={onAIOpen}>
                View All
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            {narratives.length > 0 && (
              <VStack spacing={4} align="stretch">
                {generateAIRecommendations(narratives[0]).map(rec => (
                  <Box key={rec.id} p={4} bg={infoBg} borderRadius="md">
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="semibold">{rec.title}</Text>
                      <Badge colorScheme={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'orange' : 'blue'}>
                        {rec.priority}
                      </Badge>
                    </HStack>
                    <Text fontSize="xs" color="gray.600" mb={2}>{rec.description}</Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={2} fontSize="xs">
                      <Text>Effort: {rec.implementationEffort}</Text>
                      <Text>Savings: {rec.estimatedSavings}h/week</Text>
                      <Text>Confidence: {rec.confidence}/10</Text>
                    </Grid>
                  </Box>
                ))}
              </VStack>
            )}
          </CardBody>
        </Card>
      </VStack>

      <VStack spacing={6} align="stretch">
        {/* Quick Stats */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">Process Analytics</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Card bg={successBg} p={3}>
                  <VStack>
                    <Text fontSize="xl" fontWeight="bold">{narratives.length}</Text>
                    <Text fontSize="xs" textAlign="center">Mapped Processes</Text>
                  </VStack>
                </Card>
                <Card bg={infoBg} p={3}>
                  <VStack>
                    <Text fontSize="xl" fontWeight="bold">
                      {narratives.reduce((avg, n) => avg + n.timeMetrics.efficiency, 0) / Math.max(narratives.length, 1)}%
                    </Text>
                    <Text fontSize="xs" textAlign="center">Avg Efficiency</Text>
                  </VStack>
                </Card>
              </Grid>

              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Efficiency Distribution</Text>
                {narratives.map(narrative => (
                  <Box key={narrative.id} mb={3}>
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="xs">{narrative.processName}</Text>
                      <Text fontSize="xs">{narrative.timeMetrics.efficiency}%</Text>
                    </HStack>
                    <Progress 
                      value={narrative.timeMetrics.efficiency} 
                      size="sm" 
                      colorScheme={narrative.timeMetrics.efficiency > 20 ? 'green' : 'orange'} 
                    />
                  </Box>
                ))}
              </Box>

              <Alert status="info" size="sm">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" fontWeight="semibold">Integration Active</Text>
                  <Text fontSize="xs">
                    Process improvements are aligned with strategic objectives and HR competencies.
                  </Text>
                </VStack>
              </Alert>
            </VStack>
          </CardBody>
        </Card>

        {/* Department Impact */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">Department Impact</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {Array.from(new Set(narratives.map(n => n.department))).map(dept => {
                const deptProcesses = narratives.filter(n => n.department === dept);
                const avgEfficiency = deptProcesses.reduce((sum, p) => sum + p.timeMetrics.efficiency, 0) / deptProcesses.length;
                
                return (
                  <Box key={dept} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="semibold">{dept}</Text>
                      <Badge colorScheme={avgEfficiency > 20 ? 'green' : 'orange'}>
                        {avgEfficiency.toFixed(1)}%
                      </Badge>
                    </HStack>
                    <Text fontSize="xs" color="gray.600">
                      {deptProcesses.length} processes mapped
                    </Text>
                  </Box>
                );
              })}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Grid>
  );

  const renderIntegrationDashboard = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="success">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Integrated Process Intelligence</Text>
          <Text fontSize="sm">
            Process improvements are automatically aligned with strategic frameworks, HR competencies, 
            and organizational objectives for maximum impact.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6}>
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="md" fontWeight="bold">🎯 Strategy Alignment</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" color="gray.600">
                Process improvements automatically contribute to strategic objectives
              </Text>
              <Box p={3} bg={successBg} borderRadius="md">
                <Text fontSize="xs" fontWeight="semibold">Blue Ocean Integration</Text>
                <Text fontSize="xs">Customer onboarding process creates uncontested customer experience value</Text>
              </Box>
              <Box p={3} bg={infoBg} borderRadius="md">
                <Text fontSize="xs" fontWeight="semibold">Competitive Advantage</Text>
                <Text fontSize="xs">Process efficiencies become sustainable competitive differentiators</Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="md" fontWeight="bold">👥 HR Integration</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" color="gray.600">
                Process roles automatically generate competency requirements and training needs
              </Text>
              <Box p={3} bg={successBg} borderRadius="md">
                <Text fontSize="xs" fontWeight="semibold">Competency Mapping</Text>
                <Text fontSize="xs">Process roles define required skills and competencies</Text>
              </Box>
              <Box p={3} bg={infoBg} borderRadius="md">
                <Text fontSize="xs" fontWeight="semibold">Training Alignment</Text>
                <Text fontSize="xs">Process improvements drive targeted training programs</Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="md" fontWeight="bold">📈 Marketing Integration</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" color="gray.600">
                Process improvements enhance customer journey and marketing effectiveness
              </Text>
              <Box p={3} bg={successBg} borderRadius="md">
                <Text fontSize="xs" fontWeight="semibold">Customer Experience</Text>
                <Text fontSize="xs">Process improvements directly enhance customer touchpoints</Text>
              </Box>
              <Box p={3} bg={infoBg} borderRadius="md">
                <Text fontSize="xs" fontWeight="semibold">Campaign Integration</Text>
                <Text fontSize="xs">Process metrics inform marketing automation triggers</Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">🔄 Cross-Functional Process Flow</Text>
        </CardHeader>
        <CardBody>
          <Alert status="info">
            <AlertIcon />
            <Text fontSize="sm">
              Interactive cross-functional process mapping with AI-assisted interconnection analysis is being developed.
              This will show how process improvements ripple across departments and align with strategic initiatives.
            </Text>
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
            <Text fontSize="3xl">🔄</Text>
            <Text fontSize="3xl" fontWeight="bold">Process Improvement Intelligence</Text>
          </HStack>
          <Text color="gray.600" mb={6}>
            AI-assisted process mapping and improvement with integrated strategic, HR, and marketing alignment
          </Text>
        </Box>

        {/* Strategic Value Proposition */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Integrated Process Intelligence Platform</Text>
            <Text fontSize="sm">
              Unlike standalone process improvement tools, Lucidra connects every process enhancement to strategic frameworks, 
              HR competencies, and marketing workflows for maximum organizational impact.
            </Text>
          </VStack>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Process Narratives</Tab>
            <Tab>AI-Assisted Mapping</Tab>
            <Tab>Integration Dashboard</Tab>
            <Tab>Improvement Analytics</Tab>
            <Tab>Standalone Services</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderNarrativeInput()}
            </TabPanel>
            <TabPanel px={0}>
              {renderProcessMappings()}
            </TabPanel>
            <TabPanel px={0}>
              {renderIntegrationDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Comprehensive improvement analytics with ROI calculations and strategic impact measurement coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Standalone process improvement services with white-label options for consulting and enterprise deployments coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Process Narrative Modal */}
      <Modal isOpen={isNarrativeOpen} onClose={onNarrativeClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Process Narrative</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="info" mb={4}>
              <AlertIcon />
              <Text fontSize="sm">
                Detailed process narrative creation with AI assistance and integration options.
              </Text>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNarrativeClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onNarrativeClose}>
              Create Narrative
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* AI Analysis Modal */}
      <Modal isOpen={isAIOpen} onClose={onAIClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI Process Analysis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="success">
                <AlertIcon />
                <Text fontSize="sm">
                  AI analysis provides automated recommendations for process automation, standardization, and elimination of waste.
                </Text>
              </Alert>
              
              {narratives.length > 0 && generateAIRecommendations(narratives[0]).map(rec => (
                <Box key={rec.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="semibold">{rec.title}</Text>
                    <Badge colorScheme={rec.priority === 'high' ? 'red' : 'orange'}>
                      {rec.priority}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600" mb={2}>{rec.description}</Text>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Expected Benefit:</Text>
                  <Text fontSize="sm" mb={3}>{rec.expectedBenefit}</Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap={3} fontSize="sm">
                    <Text>Effort: {rec.implementationEffort}</Text>
                    <Text>Savings: {rec.estimatedSavings}h/week</Text>
                    <Text>Confidence: {rec.confidence}/10</Text>
                  </Grid>
                </Box>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onAIClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProcessImprovement;