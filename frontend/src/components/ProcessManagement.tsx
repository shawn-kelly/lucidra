import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  Input,
  Textarea,
  Select,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tag,
  TagLabel,
  TagCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Checkbox,
  CheckboxGroup,
  Stack,
  Avatar,
  AvatarGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useToast,
  Spinner,
  Image,
  AspectRatio
} from '@chakra-ui/react';
import { 
  AddIcon, 
  EditIcon, 
  DeleteIcon, 
  DownloadIcon, 
  TimeIcon,
  ViewIcon,
  InfoIcon,
  WarningIcon,
  CheckIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
  DragHandleIcon,
  StarIcon,
  CalendarIcon,
  AttachmentIcon,
  SearchIcon
} from '@chakra-ui/icons';

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  type: 'start' | 'task' | 'decision' | 'subprocess' | 'end';
  swimlane: string;
  inputs: ProcessResource[];
  outputs: ProcessResource[];
  resources: ProcessResource[];
  duration: number; // in hours
  cost: number;
  dependencies: string[]; // step IDs
  assignee: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  position: { x: number; y: number };
  narrative?: string;
}

interface ProcessResource {
  id: string;
  name: string;
  type: 'human' | 'material' | 'data' | 'system' | 'document';
  quantity: number;
  unit: string;
  cost: number;
  availability: number; // percentage
  skills?: string[];
  specifications?: string;
}

interface ProcessSwimlane {
  id: string;
  name: string;
  role: string;
  department: string;
  color: string;
  resources: ProcessResource[];
}

interface BPMNProcess {
  id: string;
  name: string;
  description: string;
  version: string;
  owner: string;
  status: 'draft' | 'active' | 'retired';
  swimlanes: ProcessSwimlane[];
  steps: ProcessStep[];
  totalDuration: number;
  totalCost: number;
  efficiency: number;
  lastUpdated: string;
  narrative: string;
  aiAnalysis?: {
    extractedSteps: number;
    identifiedResources: number;
    suggestedOptimizations: string[];
    riskAreas: string[];
    complianceChecks: string[];
  };
  leanAnalysis?: LeanAnalysis;
  bottleneckAnalysis?: BottleneckAnalysis;
}

interface LeanAnalysis {
  valueStreamMap: ValueStreamStep[];
  wasteIdentification: WasteCategory[];
  kanbanRecommendations: KanbanRecommendation[];
  cycleTimes: CycleTimeMetric[];
  leadTime: number;
  processTime: number;
  efficiency: number;
  valueAddedRatio: number;
}

interface BottleneckAnalysis {
  criticalPath: string[];
  bottleneckSteps: BottleneckStep[];
  capacityUtilization: CapacityMetric[];
  queueAnalysis: QueueMetric[];
  recommendations: BottleneckRecommendation[];
  throughputMetrics: ThroughputMetric;
}

interface ValueStreamStep {
  stepId: string;
  valueType: 'value-added' | 'necessary-waste' | 'pure-waste';
  cycleTime: number;
  waitTime: number;
  processingTime: number;
  changeovers: number;
  defectRate: number;
}

interface WasteCategory {
  type: 'transportation' | 'inventory' | 'motion' | 'waiting' | 'overproduction' | 'overprocessing' | 'defects' | 'skills';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: number; // percentage
  suggestedActions: string[];
  affectedSteps: string[];
}

interface BottleneckStep {
  stepId: string;
  stepName: string;
  utilization: number;
  queueLength: number;
  processingRate: number;
  demandRate: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  rootCauses: string[];
  impact: {
    delayMinutes: number;
    costImpact: number;
    qualityImpact: number;
  };
}

interface CapacityMetric {
  resourceId: string;
  resourceName: string;
  currentCapacity: number;
  demandedCapacity: number;
  utilizationRate: number;
  overloadHours: number;
}

interface QueueMetric {
  stepId: string;
  avgQueueLength: number;
  maxQueueLength: number;
  avgWaitTime: number;
  maxWaitTime: number;
  serviceRate: number;
}

interface BottleneckRecommendation {
  type: 'capacity' | 'process' | 'technology' | 'training' | 'scheduling';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  estimatedImpact: {
    timeReduction: number;
    costSavings: number;
    qualityImprovement: number;
  };
  implementationCost: number;
  implementationTime: number;
  roi: number;
}

interface ThroughputMetric {
  currentThroughput: number;
  theoreticalMaxThroughput: number;
  efficiencyRatio: number;
  constraintStep: string;
}

interface KanbanRecommendation {
  stepId: string;
  currentWIP: number;
  recommendedWIP: number;
  reasoning: string;
  expectedImprovement: number;
}

interface CycleTimeMetric {
  stepId: string;
  stepName: string;
  cycleTime: number;
  targetCycleTime: number;
  variance: number;
  trend: 'improving' | 'stable' | 'declining';
}

interface ProcessTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  steps: Partial<ProcessStep>[];
  commonSwimlanes: string[];
  estimatedDuration: number;
  complexity: 'simple' | 'medium' | 'complex';
}

const ProcessManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [processes, setProcesses] = useState<BPMNProcess[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<BPMNProcess | null>(null);
  const [swimlanes, setSwimlanes] = useState<ProcessSwimlane[]>([]);
  const [resources, setResources] = useState<ProcessResource[]>([]);
  const [templates, setTemplates] = useState<ProcessTemplate[]>([]);
  const [narrativeInput, setNarrativeInput] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [standaloneMode, setStandaloneMode] = useState(false);
  
  const { isOpen: isNewProcessOpen, onOpen: onNewProcessOpen, onClose: onNewProcessClose } = useDisclosure();
  const { isOpen: isNarrativeOpen, onOpen: onNarrativeOpen, onClose: onNarrativeClose } = useDisclosure();
  const { isOpen: isResourceOpen, onOpen: onResourceOpen, onClose: onResourceClose } = useDisclosure();
  const { isOpen: isBPMNOpen, onOpen: onBPMNOpen, onClose: onBPMNClose } = useDisclosure();
  
  const toast = useToast();

  useEffect(() => {
    // Initialize sample data
    const sampleSwimlanes: ProcessSwimlane[] = [
      {
        id: '1',
        name: 'Customer Service',
        role: 'Service Representative',
        department: 'Customer Operations',
        color: '#3182CE',
        resources: []
      },
      {
        id: '2', 
        name: 'Operations Team',
        role: 'Process Coordinator',
        department: 'Operations',
        color: '#38A169',
        resources: []
      },
      {
        id: '3',
        name: 'Management',
        role: 'Supervisor',
        department: 'Leadership',
        color: '#D69E2E',
        resources: []
      },
      {
        id: '4',
        name: 'IT Systems',
        role: 'Automated Process',
        department: 'Technology',
        color: '#805AD5',
        resources: []
      }
    ];

    const sampleResources: ProcessResource[] = [
      {
        id: '1',
        name: 'Customer Service Rep',
        type: 'human',
        quantity: 2,
        unit: 'FTE',
        cost: 25,
        availability: 85,
        skills: ['Communication', 'CRM Systems', 'Problem Solving']
      },
      {
        id: '2',
        name: 'CRM System',
        type: 'system',
        quantity: 1,
        unit: 'license',
        cost: 50,
        availability: 99,
        specifications: 'Salesforce Enterprise'
      },
      {
        id: '3',
        name: 'Customer Data',
        type: 'data',
        quantity: 1,
        unit: 'database',
        cost: 0,
        availability: 100,
        specifications: 'Customer profile and history'
      }
    ];

    const sampleProcesses: BPMNProcess[] = [
      {
        id: '1',
        name: 'Customer Complaint Resolution',
        description: 'End-to-end process for handling customer complaints with escalation procedures',
        version: '2.1',
        owner: 'Sarah Mitchell',
        status: 'active',
        swimlanes: sampleSwimlanes,
        steps: [
          {
            id: 'start',
            name: 'Complaint Received',
            description: 'Customer submits complaint through various channels',
            type: 'start',
            swimlane: '1',
            inputs: [],
            outputs: [sampleResources[2]],
            resources: [sampleResources[0]],
            duration: 0.5,
            cost: 12.5,
            dependencies: [],
            assignee: 'Customer Service Team',
            status: 'completed',
            position: { x: 100, y: 50 }
          },
          {
            id: 'analyze',
            name: 'Analyze Complaint',
            description: 'Review complaint details and categorize severity',
            type: 'task',
            swimlane: '1',
            inputs: [sampleResources[2]],
            outputs: [sampleResources[2]],
            resources: [sampleResources[0], sampleResources[1]],
            duration: 1,
            cost: 75,
            dependencies: ['start'],
            assignee: 'John Smith',
            status: 'in_progress',
            position: { x: 300, y: 50 }
          },
          {
            id: 'decision',
            name: 'Escalation Required?',
            description: 'Determine if complaint requires management escalation',
            type: 'decision',
            swimlane: '1',
            inputs: [sampleResources[2]],
            outputs: [sampleResources[2]],
            resources: [sampleResources[0]],
            duration: 0.25,
            cost: 6.25,
            dependencies: ['analyze'],
            assignee: 'John Smith',
            status: 'not_started',
            position: { x: 500, y: 50 }
          }
        ],
        totalDuration: 24,
        totalCost: 450,
        efficiency: 78,
        lastUpdated: '2024-02-20',
        narrative: 'Customer complaints are received through phone, email, or web portal. The service representative logs the complaint in our CRM system and performs initial categorization...',
        aiAnalysis: {
          extractedSteps: 8,
          identifiedResources: 5,
          suggestedOptimizations: [
            'Automate initial complaint categorization using AI',
            'Implement customer self-service portal for simple issues',
            'Add real-time escalation triggers based on complaint severity'
          ],
          riskAreas: [
            'Manual data entry prone to errors',
            'Lack of standardized response times',
            'No automated follow-up mechanism'
          ],
          complianceChecks: [
            'GDPR data handling compliance',
            'Customer communication audit trail',
            'Service level agreement monitoring'
          ]
        }
      }
    ];

    const sampleTemplates: ProcessTemplate[] = [
      {
        id: '1',
        name: 'Customer Onboarding',
        category: 'Customer Management',
        description: 'Standard process for new customer registration and setup',
        steps: [],
        commonSwimlanes: ['Sales', 'Operations', 'IT'],
        estimatedDuration: 48,
        complexity: 'medium'
      },
      {
        id: '2',
        name: 'Order Fulfillment',
        category: 'Operations',
        description: 'End-to-end order processing from receipt to delivery',
        steps: [],
        commonSwimlanes: ['Sales', 'Warehouse', 'Shipping', 'Finance'],
        estimatedDuration: 72,
        complexity: 'complex'
      },
      {
        id: '3',
        name: 'Employee Onboarding',
        category: 'Human Resources',
        description: 'Complete new hire process including documentation and training',
        steps: [],
        commonSwimlanes: ['HR', 'IT', 'Management', 'Employee'],
        estimatedDuration: 120,
        complexity: 'medium'
      }
    ];

    setSwimlanes(sampleSwimlanes);
    setResources(sampleResources);
    setProcesses(sampleProcesses);
    setTemplates(sampleTemplates);
  }, []);

  const analyzeNarrativeWithAI = useCallback(async (narrative: string) => {
    setAiProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const aiAnalysis = {
      extractedSteps: Math.floor(Math.random() * 10) + 5,
      identifiedResources: Math.floor(Math.random() * 8) + 3,
      suggestedOptimizations: [
        'Implement automated approval workflow',
        'Add parallel processing for independent tasks',
        'Introduce quality gates at critical decision points'
      ],
      riskAreas: [
        'Manual handoffs between departments',
        'Lack of real-time status visibility',
        'Resource bottlenecks during peak periods'
      ],
      complianceChecks: [
        'Data security protocols',
        'Audit trail requirements',
        'Regulatory approval checkpoints'
      ]
    };

    setAiProcessing(false);
    
    toast({
      title: "AI Analysis Complete",
      description: `Extracted ${aiAnalysis.extractedSteps} process steps and ${aiAnalysis.identifiedResources} resources`,
      status: "success",
      duration: 5000
    });

    return aiAnalysis;
  }, [toast]);

  // AI-Powered Lean Analysis
  const performLeanAnalysis = useCallback(async (process: BPMNProcess): Promise<LeanAnalysis> => {
    setAiProcessing(true);
    
    // Simulate AI processing for lean analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const valueStreamMap: ValueStreamStep[] = process.steps.map(step => ({
      stepId: step.id,
      valueType: step.type === 'task' ? 'value-added' : 
                 step.type === 'decision' ? 'necessary-waste' : 'pure-waste',
      cycleTime: step.duration * 60, // Convert to minutes
      waitTime: Math.random() * 30, // Simulated wait time
      processingTime: step.duration * 60 * 0.7, // 70% of cycle time
      changeovers: Math.floor(Math.random() * 3),
      defectRate: Math.random() * 0.05 // 0-5% defect rate
    }));

    const wasteCategories: WasteCategory[] = [
      {
        type: 'waiting',
        description: 'Excessive wait times between process steps',
        severity: 'high',
        impact: 25,
        suggestedActions: [
          'Implement parallel processing',
          'Reduce batch sizes',
          'Balance workload distribution'
        ],
        affectedSteps: process.steps.slice(0, 2).map(s => s.id)
      },
      {
        type: 'overprocessing',
        description: 'Unnecessary approvals and documentation',
        severity: 'medium',
        impact: 15,
        suggestedActions: [
          'Streamline approval process',
          'Implement electronic signatures',
          'Reduce redundant data entry'
        ],
        affectedSteps: process.steps.slice(1, 3).map(s => s.id)
      },
      {
        type: 'transportation',
        description: 'Inefficient information flow between departments',
        severity: 'medium',
        impact: 12,
        suggestedActions: [
          'Implement shared digital workspace',
          'Automate data transfer',
          'Co-locate related functions'
        ],
        affectedSteps: process.steps.slice(0, 1).map(s => s.id)
      }
    ];

    const cycleTimes: CycleTimeMetric[] = process.steps.map(step => ({
      stepId: step.id,
      stepName: step.name,
      cycleTime: step.duration * 60,
      targetCycleTime: step.duration * 60 * 0.8, // 20% improvement target
      variance: Math.random() * 10,
      trend: Math.random() > 0.5 ? 'improving' : 'stable'
    }));

    const kanbanRecommendations: KanbanRecommendation[] = process.steps.map(step => ({
      stepId: step.id,
      currentWIP: Math.floor(Math.random() * 8) + 2,
      recommendedWIP: Math.floor(Math.random() * 5) + 2,
      reasoning: 'Based on Little\'s Law and current throughput analysis',
      expectedImprovement: Math.random() * 30 + 10 // 10-40% improvement
    }));

    const leanAnalysis: LeanAnalysis = {
      valueStreamMap,
      wasteIdentification: wasteCategories,
      kanbanRecommendations,
      cycleTimes,
      leadTime: process.totalDuration * 60, // Convert to minutes
      processTime: process.totalDuration * 60 * 0.6, // 60% actual processing
      efficiency: process.efficiency,
      valueAddedRatio: valueStreamMap.filter(s => s.valueType === 'value-added').length / valueStreamMap.length
    };

    setAiProcessing(false);
    
    toast({
      title: "Lean Analysis Complete",
      description: `Identified ${wasteCategories.length} waste categories and ${kanbanRecommendations.length} optimization opportunities`,
      status: "success",
      duration: 5000
    });

    return leanAnalysis;
  }, [toast]);

  // AI-Powered Bottleneck Analysis
  const performBottleneckAnalysis = useCallback(async (process: BPMNProcess): Promise<BottleneckAnalysis> => {
    setAiProcessing(true);
    
    // Simulate AI processing for bottleneck analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const bottleneckSteps: BottleneckStep[] = process.steps.map(step => {
      const utilization = Math.random() * 100;
      const demandRate = Math.random() * 20 + 5;
      const processingRate = demandRate * (utilization / 100);
      
      return {
        stepId: step.id,
        stepName: step.name,
        utilization,
        queueLength: Math.max(0, (demandRate - processingRate) * step.duration),
        processingRate,
        demandRate,
        severity: utilization > 90 ? 'critical' : 
                 utilization > 75 ? 'high' : 
                 utilization > 60 ? 'medium' : 'low',
        rootCauses: [
          utilization > 80 ? 'Resource capacity constraint' : 'Process inefficiency',
          'Uneven workload distribution',
          'Manual handoffs causing delays'
        ],
        impact: {
          delayMinutes: Math.max(0, (demandRate - processingRate) * 60),
          costImpact: Math.max(0, (demandRate - processingRate) * step.cost),
          qualityImpact: Math.random() * 10
        }
      };
    }).filter(step => step.utilization > 60); // Only include potential bottlenecks

    const capacityMetrics: CapacityMetric[] = process.steps.map(step => ({
      resourceId: step.id,
      resourceName: step.name,
      currentCapacity: step.duration * 8, // 8 hours per day
      demandedCapacity: step.duration * 10, // 25% overdemand
      utilizationRate: Math.random() * 40 + 60, // 60-100%
      overloadHours: Math.max(0, step.duration * 2)
    }));

    const queueMetrics: QueueMetric[] = process.steps.map(step => ({
      stepId: step.id,
      avgQueueLength: Math.random() * 5 + 1,
      maxQueueLength: Math.random() * 10 + 5,
      avgWaitTime: Math.random() * 60 + 15, // 15-75 minutes
      maxWaitTime: Math.random() * 120 + 60, // 60-180 minutes
      serviceRate: 1 / (step.duration * 60) // Items per minute
    }));

    const recommendations: BottleneckRecommendation[] = [
      {
        type: 'capacity',
        priority: 'high',
        description: 'Add additional resource to the highest utilized step',
        estimatedImpact: {
          timeReduction: 35,
          costSavings: 12000,
          qualityImprovement: 15
        },
        implementationCost: 5000,
        implementationTime: 30, // days
        roi: 2.4
      },
      {
        type: 'process',
        priority: 'medium',
        description: 'Implement parallel processing for independent tasks',
        estimatedImpact: {
          timeReduction: 25,
          costSavings: 8000,
          qualityImprovement: 10
        },
        implementationCost: 3000,
        implementationTime: 45,
        roi: 2.67
      },
      {
        type: 'technology',
        priority: 'high',
        description: 'Automate manual approval steps with workflow engine',
        estimatedImpact: {
          timeReduction: 45,
          costSavings: 18000,
          qualityImprovement: 25
        },
        implementationCost: 8000,
        implementationTime: 60,
        roi: 2.25
      }
    ];

    const throughputMetrics: ThroughputMetric = {
      currentThroughput: Math.random() * 10 + 5, // 5-15 items per hour
      theoreticalMaxThroughput: Math.random() * 5 + 15, // 15-20 items per hour
      efficiencyRatio: 0.65, // 65% efficiency
      constraintStep: bottleneckSteps.length > 0 ? bottleneckSteps[0].stepId : process.steps[0].id
    };

    const bottleneckAnalysis: BottleneckAnalysis = {
      criticalPath: process.steps.map(s => s.id), // Simplified critical path
      bottleneckSteps,
      capacityUtilization: capacityMetrics,
      queueAnalysis: queueMetrics,
      recommendations,
      throughputMetrics
    };

    setAiProcessing(false);
    
    toast({
      title: "Bottleneck Analysis Complete",
      description: `Found ${bottleneckSteps.length} bottlenecks with ${recommendations.length} optimization recommendations`,
      status: "success",
      duration: 5000
    });

    return bottleneckAnalysis;
  }, [toast]);

  const ProcessDashboard = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="xl" fontWeight="bold">🔄 Process Management Dashboard</Text>
          {standaloneMode && (
            <Badge colorScheme="purple" variant="solid">Standalone Mode</Badge>
          )}
        </VStack>
        <HStack>
          <Switch
            isChecked={standaloneMode}
            onChange={(e) => setStandaloneMode(e.target.checked)}
            size="sm"
          />
          <Text fontSize="sm">Standalone Mode</Text>
          <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProcessOpen}>
            New Process
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Active Processes</StatLabel>
          <StatNumber>{processes.filter(p => p.status === 'active').length}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12% from last month
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Avg Efficiency</StatLabel>
          <StatNumber>{Math.round(processes.reduce((sum, p) => sum + p.efficiency, 0) / processes.length)}%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            5.4% improvement
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Total Cost Savings</StatLabel>
          <StatNumber>$24.5K</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            Through optimization
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>AI Suggestions</StatLabel>
          <StatNumber>47</StatNumber>
          <StatHelpText>
            Ready for implementation
          </StatHelpText>
        </Stat>
      </Grid>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">BPMN 2.0 Compliance</Text>
          <Text fontSize="sm">
            Full Business Process Model and Notation support with swimlanes, gateways, and resource allocation
          </Text>
        </VStack>
      </Alert>

      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontWeight="bold">Process Overview</Text>
            <HStack>
              <Button size="sm" leftIcon={<DownloadIcon />} variant="outline">
                Export All
              </Button>
              <Button size="sm" leftIcon={<AttachmentIcon />} variant="outline">
                Import BPMN
              </Button>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Process Name</Th>
                <Th>Owner</Th>
                <Th>Status</Th>
                <Th>Efficiency</Th>
                <Th>Duration</Th>
                <Th>Cost</Th>
                <Th>Last Updated</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {processes.map((process) => (
                <Tr key={process.id}>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" fontSize="sm">{process.name}</Text>
                      <Text fontSize="xs" color="gray.600">v{process.version}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{process.owner}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      process.status === 'active' ? 'green' :
                      process.status === 'draft' ? 'yellow' : 'gray'
                    }>
                      {process.status}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Progress value={process.efficiency} colorScheme="green" size="sm" w="60px" />
                      <Text fontSize="xs">{process.efficiency}%</Text>
                    </VStack>
                  </Td>
                  <Td>{process.totalDuration}h</Td>
                  <Td>${process.totalCost}</Td>
                  <Td>
                    <Text fontSize="sm">{process.lastUpdated}</Text>
                  </Td>
                  <Td>
                    <HStack>
                      <IconButton
                        aria-label="View BPMN"
                        icon={<ViewIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedProcess(process);
                          onBPMNOpen();
                        }}
                      />
                      <IconButton
                        aria-label="Edit process"
                        icon={<EditIcon />}
                        size="sm"
                        variant="ghost"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </VStack>
  );

  const BPMNDesigner = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">🎨 BPMN Process Designer</Text>
        <HStack>
          <Button size="sm" leftIcon={<AddIcon />} colorScheme="blue">
            Add Step
          </Button>
          <Button size="sm" leftIcon={<DragHandleIcon />} variant="outline">
            Add Swimlane
          </Button>
          <Button size="sm" leftIcon={<DownloadIcon />} variant="outline">
            Export BPMN
          </Button>
        </HStack>
      </HStack>

      <Alert status="warning">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Visual BPMN Editor</Text>
          <Text fontSize="sm">
            Drag-and-drop interface for creating comprehensive process flows with swimlanes and resource allocation
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="250px 1fr" gap={6}>
        {/* BPMN Palette */}
        <Card>
          <CardHeader>
            <Text fontWeight="bold" fontSize="sm">BPMN Elements</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Box p={3} border="1px" borderColor="gray.200" borderRadius="md" cursor="grab">
                <HStack>
                  <Box w="20px" h="20px" bg="green.400" borderRadius="full" />
                  <Text fontSize="sm">Start Event</Text>
                </HStack>
              </Box>
              <Box p={3} border="1px" borderColor="gray.200" borderRadius="md" cursor="grab">
                <HStack>
                  <Box w="20px" h="15px" bg="blue.400" borderRadius="md" />
                  <Text fontSize="sm">Task</Text>
                </HStack>
              </Box>
              <Box p={3} border="1px" borderColor="gray.200" borderRadius="md" cursor="grab">
                <HStack>
                  <Box w="20px" h="20px" bg="yellow.400" transform="rotate(45deg)" />
                  <Text fontSize="sm">Gateway</Text>
                </HStack>
              </Box>
              <Box p={3} border="1px" borderColor="gray.200" borderRadius="md" cursor="grab">
                <HStack>
                  <Box w="20px" h="20px" bg="red.400" borderRadius="full" />
                  <Text fontSize="sm">End Event</Text>
                </HStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* BPMN Canvas */}
        <Card>
          <CardBody>
            <Box 
              h="600px" 
              bg="gray.50" 
              borderRadius="md" 
              position="relative"
              border="1px dashed"
              borderColor="gray.300"
            >
              {/* Swimlanes */}
              {swimlanes.map((lane, index) => (
                <Box
                  key={lane.id}
                  position="absolute"
                  top={`${index * 150}px`}
                  left="0"
                  right="0"
                  h="150px"
                  borderBottom="1px solid"
                  borderColor="gray.300"
                  bg="white"
                  _hover={{ bg: "gray.50" }}
                >
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    w="100px"
                    h="full"
                    bg={lane.color}
                    opacity={0.1}
                    borderRight="2px solid"
                    borderColor={lane.color}
                  />
                  <VStack
                    position="absolute"
                    left="10px"
                    top="10px"
                    align="start"
                    spacing={1}
                  >
                    <Text fontSize="sm" fontWeight="bold">{lane.name}</Text>
                    <Text fontSize="xs" color="gray.600">{lane.role}</Text>
                    <Badge size="sm" colorScheme="gray">{lane.department}</Badge>
                  </VStack>

                  {/* Process Steps in this swimlane */}
                  {selectedProcess?.steps
                    .filter(step => step.swimlane === lane.id)
                    .map(step => (
                      <Box
                        key={step.id}
                        position="absolute"
                        left={`${step.position.x}px`}
                        top={`${step.position.y}px`}
                        w="120px"
                        h="60px"
                        bg="white"
                        border="2px solid"
                        borderColor={
                          step.status === 'completed' ? 'green.400' :
                          step.status === 'in_progress' ? 'blue.400' :
                          step.status === 'blocked' ? 'red.400' : 'gray.300'
                        }
                        borderRadius="md"
                        p={2}
                        cursor="pointer"
                        shadow="sm"
                        _hover={{ shadow: "md" }}
                      >
                        <VStack spacing={1} align="start">
                          <Text fontSize="xs" fontWeight="bold" noOfLines={2}>
                            {step.name}
                          </Text>
                          <HStack>
                            <TimeIcon boxSize={2} />
                            <Text fontSize="xs">{step.duration}h</Text>
                          </HStack>
                          <Text fontSize="xs" color="gray.600">
                            ${step.cost}
                          </Text>
                        </VStack>
                      </Box>
                    ))}
                </Box>
              ))}

              {/* Canvas Instructions */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                color="gray.500"
              >
                <VStack spacing={2}>
                  <DragHandleIcon boxSize={8} />
                  <Text fontSize="lg" fontWeight="semibold">BPMN Process Canvas</Text>
                  <Text fontSize="sm">Drag elements from the palette to design your process</Text>
                  <Text fontSize="sm">Click existing elements to edit properties</Text>
                </VStack>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );

  const AIAnalysisPanel = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">🤖 AI Process Analysis</Text>
        <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={onNarrativeOpen}>
          Analyze Narrative
        </Button>
      </HStack>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Process Narrative Input</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Alert status="info">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">AI-Powered Process Extraction</Text>
                <Text fontSize="sm">
                  Upload documents or paste text descriptions. AI will extract process steps, identify resources, and suggest optimizations.
                </Text>
              </VStack>
            </Alert>

            <HStack>
              <Button leftIcon={<AttachmentIcon />} variant="outline">
                Upload Document
              </Button>
              <Button leftIcon={<AttachmentIcon />} variant="outline">
                Paste Text
              </Button>
              <Button leftIcon={<SearchIcon />} colorScheme="purple">
                Analyze with AI
              </Button>
            </HStack>

            <Box p={4} bg="gray.50" borderRadius="md">
              <Text fontSize="sm" fontWeight="semibold" mb={2}>Sample Process Narrative:</Text>
              <Text fontSize="sm" color="gray.700">
                "When a customer complaint is received, the customer service representative logs it into the CRM system. 
                They review the customer's history and categorize the complaint severity. If it's a high-priority issue, 
                it gets escalated to a supervisor. The supervisor reviews the case and assigns it to a specialist team..."
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {processes.filter(p => p.aiAnalysis).map(process => (
        <Card key={process.id}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontWeight="bold">AI Analysis: {process.name}</Text>
              <Badge colorScheme="purple">AI Generated</Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="1fr 1fr 1fr" gap={6}>
              <VStack align="start" spacing={3}>
                <Text fontSize="sm" fontWeight="semibold" color="green.600">
                  ✅ Optimization Opportunities
                </Text>
                {process.aiAnalysis?.suggestedOptimizations.map((suggestion, idx) => (
                  <HStack key={idx} align="start">
                    <CheckIcon color="green.500" boxSize={3} mt={1} />
                    <Text fontSize="sm">{suggestion}</Text>
                  </HStack>
                ))}
              </VStack>

              <VStack align="start" spacing={3}>
                <Text fontSize="sm" fontWeight="semibold" color="red.600">
                  ⚠️ Risk Areas
                </Text>
                {process.aiAnalysis?.riskAreas.map((risk, idx) => (
                  <HStack key={idx} align="start">
                    <WarningIcon color="red.500" boxSize={3} mt={1} />
                    <Text fontSize="sm">{risk}</Text>
                  </HStack>
                ))}
              </VStack>

              <VStack align="start" spacing={3}>
                <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                  📋 Compliance Checks
                </Text>
                {process.aiAnalysis?.complianceChecks.map((check, idx) => (
                  <HStack key={idx} align="start">
                    <InfoIcon color="blue.500" boxSize={3} mt={1} />
                    <Text fontSize="sm">{check}</Text>
                  </HStack>
                ))}
              </VStack>
            </Grid>

            <Divider my={4} />

            <HStack justify="space-between">
              <Stat size="sm">
                <StatLabel>Extracted Steps</StatLabel>
                <StatNumber>{process.aiAnalysis?.extractedSteps}</StatNumber>
              </Stat>
              <Stat size="sm">
                <StatLabel>Identified Resources</StatLabel>
                <StatNumber>{process.aiAnalysis?.identifiedResources}</StatNumber>
              </Stat>
              <Button size="sm" colorScheme="purple" leftIcon={<StarIcon />}>
                Apply Suggestions
              </Button>
            </HStack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );

  const ResourceManagement = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">👥 Resource Management</Text>
        <Button colorScheme="green" leftIcon={<AddIcon />} onClick={onResourceOpen}>
          Add Resource
        </Button>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">Resource Types</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <HStack justify="space-between" w="full">
                <HStack>
                  <Text fontSize="2xl">👤</Text>
                  <Text fontSize="sm">Human Resources</Text>
                </HStack>
                <Badge colorScheme="blue">{resources.filter(r => r.type === 'human').length}</Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <HStack>
                  <Text fontSize="2xl">🏭</Text>
                  <Text fontSize="sm">Material Resources</Text>
                </HStack>
                <Badge colorScheme="green">{resources.filter(r => r.type === 'material').length}</Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <HStack>
                  <Text fontSize="2xl">💻</Text>
                  <Text fontSize="sm">System Resources</Text>
                </HStack>
                <Badge colorScheme="purple">{resources.filter(r => r.type === 'system').length}</Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <HStack>
                  <Text fontSize="2xl">📊</Text>
                  <Text fontSize="sm">Data Resources</Text>
                </HStack>
                <Badge colorScheme="orange">{resources.filter(r => r.type === 'data').length}</Badge>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Resource Utilization</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {resources.slice(0, 4).map(resource => (
                <Box key={resource.id} w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm" fontWeight="semibold">{resource.name}</Text>
                    <Text fontSize="sm">{resource.availability}%</Text>
                  </HStack>
                  <Progress 
                    value={resource.availability} 
                    colorScheme={
                      resource.availability >= 80 ? 'green' :
                      resource.availability >= 60 ? 'yellow' : 'red'
                    }
                    size="sm" 
                  />
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Cost Analysis</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <Stat size="sm">
                <StatLabel>Total Resource Cost</StatLabel>
                <StatNumber>${resources.reduce((sum, r) => sum + (r.cost * r.quantity), 0)}/hr</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  5.2% from last month
                </StatHelpText>
              </Stat>
              <Divider />
              <Stat size="sm">
                <StatLabel>Most Expensive Resource</StatLabel>
                <StatNumber>${Math.max(...resources.map(r => r.cost))}/hr</StatNumber>
                <StatHelpText>CRM System License</StatHelpText>
              </Stat>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Resource Directory</Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Resource Name</Th>
                <Th>Type</Th>
                <Th>Quantity</Th>
                <Th>Cost/Unit</Th>
                <Th>Availability</Th>
                <Th>Skills/Specs</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {resources.map(resource => (
                <Tr key={resource.id}>
                  <Td>
                    <Text fontWeight="semibold" fontSize="sm">{resource.name}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      resource.type === 'human' ? 'blue' :
                      resource.type === 'material' ? 'green' :
                      resource.type === 'system' ? 'purple' : 'orange'
                    } variant="subtle">
                      {resource.type}
                    </Badge>
                  </Td>
                  <Td>{resource.quantity} {resource.unit}</Td>
                  <Td>${resource.cost}</Td>
                  <Td>
                    <Progress value={resource.availability} colorScheme="green" size="sm" w="60px" />
                    <Text fontSize="xs" mt={1}>{resource.availability}%</Text>
                  </Td>
                  <Td>
                    <HStack wrap="wrap">
                      {resource.skills?.slice(0, 2).map(skill => (
                        <Tag key={skill} size="sm" variant="subtle">
                          <TagLabel>{skill}</TagLabel>
                        </Tag>
                      ))}
                      {resource.specifications && (
                        <Tag size="sm" variant="subtle">
                          <TagLabel>{resource.specifications.slice(0, 15)}...</TagLabel>
                        </Tag>
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Edit resource"
                      icon={<EditIcon />}
                      size="sm"
                      variant="ghost"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box>
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>🔄 Dashboard</Tab>
          <Tab>🎨 BPMN Designer</Tab>
          <Tab>🤖 AI Analysis</Tab>
          <Tab>👥 Resources</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProcessDashboard />
          </TabPanel>
          <TabPanel>
            <BPMNDesigner />
          </TabPanel>
          <TabPanel>
            <AIAnalysisPanel />
          </TabPanel>
          <TabPanel>
            <ResourceManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* New Process Modal */}
      <Modal isOpen={isNewProcessOpen} onClose={onNewProcessClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Process Name</FormLabel>
                <Input placeholder="Enter process name" />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Describe the process purpose and scope" rows={3} />
              </FormControl>
              <FormControl>
                <FormLabel>Process Owner</FormLabel>
                <Input placeholder="Responsible person" />
              </FormControl>
              <FormControl>
                <FormLabel>Template</FormLabel>
                <Select placeholder="Choose a template (optional)">
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name} - {template.category}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNewProcessClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Create Process</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Narrative Analysis Modal */}
      <Modal isOpen={isNarrativeOpen} onClose={onNarrativeClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AI Process Narrative Analysis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">AI-Powered Analysis</Text>
                  <Text fontSize="sm">
                    Paste your process description below. AI will extract steps, identify resources, and suggest optimizations.
                  </Text>
                </VStack>
              </Alert>
              
              <FormControl>
                <FormLabel>Process Narrative</FormLabel>
                <Textarea
                  value={narrativeInput}
                  onChange={(e) => setNarrativeInput(e.target.value)}
                  placeholder="Paste or type your process description here..."
                  rows={8}
                />
              </FormControl>

              <HStack w="full">
                <Button leftIcon={<AttachmentIcon />} variant="outline">
                  Upload Document
                </Button>
                <Button leftIcon={<AttachmentIcon />} variant="outline">
                  Load Template
                </Button>
              </HStack>

              {aiProcessing && (
                <VStack spacing={2}>
                  <Spinner color="purple.500" />
                  <Text fontSize="sm">Analyzing narrative with AI...</Text>
                </VStack>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNarrativeClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="purple" 
              isLoading={aiProcessing}
              onClick={() => analyzeNarrativeWithAI(narrativeInput)}
              isDisabled={!narrativeInput.trim()}
            >
              Analyze with AI
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* BPMN Viewer Modal */}
      <Modal isOpen={isBPMNOpen} onClose={onBPMNClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>BPMN Process View: {selectedProcess?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Alert status="success">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Interactive Process View</Text>
                  <Text fontSize="sm">
                    Full BPMN 2.0 compliant process visualization with swimlanes, resources, and cost analysis
                  </Text>
                </VStack>
              </Alert>
              
              <Box w="full" h="500px" bg="gray.50" borderRadius="md" p={4}>
                <Text color="gray.500" textAlign="center" pt="200px" fontSize="lg">
                  Interactive BPMN Process Diagram
                  <br />
                  <Text fontSize="sm" mt={2}>
                    Swimlanes, process steps, decision gateways, and resource allocation visualization
                  </Text>
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onBPMNClose}>
              Close
            </Button>
            <Button colorScheme="blue" leftIcon={<EditIcon />}>
              Edit Process
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProcessManagement;