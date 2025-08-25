import { Box, VStack, HStack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, DownloadIcon, CheckIcon } from '@chakra-ui/icons';
// import { EnhancedBPMNDesigner } from './EnhancedBPMNDesigner';
// import { EnhancedStepDetailModal } from './EnhancedProcessModals';
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
  GridItem,
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
  Tag,
  TagLabel,
  TagCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Flex
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
  SearchIcon,
  SettingsIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons';

// Enhanced interfaces for deep functionality
interface ProcessStep {
  id: string;
  name: string;
  description: string;
  type: 'start' | 'task' | 'decision' | 'subprocess' | 'end' | 'gateway' | 'event';
  swimlane: string;
  inputs: ProcessResource[];
  outputs: ProcessResource[];
  resources: ProcessResource[];
  duration: number;
  cost: number;
  dependencies: string[];
  assignee: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'on_hold';
  position: { x: number; y: number };
  narrative?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  businessRules: string[];
  compliance: string[];
  kpis: ProcessKPI[];
  risks: ProcessRisk[];
  automationLevel: number; // 0-100%
  qualityGates: QualityGate[];
  dataRequirements: DataRequirement[];
}

interface ProcessResource {
  id: string;
  name: string;
  type: 'human' | 'material' | 'data' | 'system' | 'document' | 'equipment' | 'facility';
  quantity: number;
  unit: string;
  cost: number;
  availability: number;
  skills?: string[];
  specifications?: string;
  location?: string;
  contactInfo?: string;
  certification?: string[];
  maintenanceSchedule?: string;
}

interface ProcessSwimlane {
  id: string;
  name: string;
  role: string;
  department: string;
  color: string;
  resources: ProcessResource[];
  responsibilities: string[];
  authority: string[];
  reportingLine: string;
  skillRequirements: string[];
}

interface ProcessKPI {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

interface ProcessRisk {
  id: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
  owner: string;
  status: 'open' | 'mitigated' | 'closed';
}

interface QualityGate {
  id: string;
  name: string;
  criteria: string[];
  checkpoints: string[];
  approver: string;
  mandatory: boolean;
}

interface DataRequirement {
  id: string;
  name: string;
  type: 'input' | 'output' | 'reference';
  format: string;
  source: string;
  frequency: string;
  retention: string;
}

interface BPMNProcess {
  id: string;
  name: string;
  description: string;
  version: string;
  owner: string;
  status: 'draft' | 'active' | 'retired' | 'under_review';
  swimlanes: ProcessSwimlane[];
  steps: ProcessStep[];
  totalDuration: number;
  totalCost: number;
  efficiency: number;
  lastUpdated: string;
  narrative: string;
  category: string;
  businessValue: string;
  stakeholders: string[];
  approvals: ProcessApproval[];
  metrics: ProcessMetrics;
  aiAnalysis?: AIAnalysis;
  leanAnalysis?: LeanAnalysis;
  bottleneckAnalysis?: BottleneckAnalysis;
  complianceAnalysis?: ComplianceAnalysis;
}

interface ProcessApproval {
  id: string;
  approver: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected';
  comments: string;
  date: string;
}

interface ProcessMetrics {
  cycleTime: number;
  leadTime: number;
  throughput: number;
  qualityScore: number;
  customerSatisfaction: number;
  costPerUnit: number;
  automationRate: number;
  errorRate: number;
}

interface AIAnalysis {
  extractedSteps: number;
  identifiedResources: number;
  suggestedOptimizations: OptimizationSuggestion[];
  riskAreas: string[];
  complianceChecks: string[];
  automationOpportunities: AutomationOpportunity[];
  benchmarkComparison: BenchmarkData;
}

interface OptimizationSuggestion {
  id: string;
  type: 'cost_reduction' | 'time_saving' | 'quality_improvement' | 'automation';
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  roi: number;
  timeline: string;
}

interface AutomationOpportunity {
  stepId: string;
  automationType: 'rpa' | 'ai' | 'workflow' | 'integration';
  feasibility: number;
  savings: number;
  description: string;
}

interface BenchmarkData {
  industry: string;
  avgCycleTime: number;
  avgCost: number;
  avgQuality: number;
  ranking: number;
  improvementAreas: string[];
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
  improvements: LeanImprovement[];
}

interface ValueStreamStep {
  stepId: string;
  valueType: 'value-added' | 'necessary-waste' | 'pure-waste';
  cycleTime: number;
  waitTime: number;
  processingTime: number;
  changeovers: number;
  defectRate: number;
  improvements: string[];
}

interface WasteCategory {
  type: 'transportation' | 'inventory' | 'motion' | 'waiting' | 'overproduction' | 'overprocessing' | 'defects' | 'skills';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: number;
  suggestedActions: string[];
  affectedSteps: string[];
  costImpact: number;
}

interface KanbanRecommendation {
  area: string;
  currentState: string;
  recommendedState: string;
  benefits: string[];
  implementation: string[];
}

interface LeanImprovement {
  area: string;
  current: number;
  target: number;
  actions: string[];
  timeline: string;
  investment: number;
  savings: number;
}

interface CycleTimeMetric {
  stepId: string;
  stepName: string;
  averageTime: number;
  standardDeviation: number;
  target: number;
  variance: number;  
}

interface BottleneckAnalysis {
  criticalPath: string[];
  bottleneckSteps: BottleneckStep[];
  capacityUtilization: CapacityMetric[];
  queueAnalysis: QueueMetric[];
  recommendations: BottleneckRecommendation[];
  throughputMetrics: ThroughputMetric;
  resourceOptimization: ResourceOptimization[];
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
  solutions: BottleneckSolution[];
}

interface BottleneckSolution {
  description: string;
  cost: number;
  timeToImplement: string;
  expectedImprovement: number;
  feasibility: 'low' | 'medium' | 'high';
}

interface CapacityMetric {
  resource: string;
  currentCapacity: number;
  requiredCapacity: number;
  utilizationRate: number;
  recommendation: string;
}

interface QueueMetric {
  stepId: string;
  averageQueueLength: number;
  averageWaitTime: number;
  maxQueueLength: number;
  maxWaitTime: number;
}

interface BottleneckRecommendation {
  priority: 'high' | 'medium' | 'low';
  description: string;
  impact: string;
  cost: number;
  timeline: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface ThroughputMetric {
  current: number;
  theoretical: number;
  efficiency: number;
  constraints: string[];
  improvementPotential: number;
}

interface ResourceOptimization {
  resourceId: string;
  currentAllocation: number;
  optimalAllocation: number;
  savingsOpportunity: number;
  reallocationSuggestion: string;
}

interface ComplianceAnalysis {
  frameworks: ComplianceFramework[];
  gaps: ComplianceGap[];
  recommendations: ComplianceRecommendation[];
  score: number;
  certifications: string[];
}

interface ComplianceFramework {
  name: string;
  requirements: string[];
  status: 'compliant' | 'partial' | 'non-compliant';
  lastAudit: string;
  nextAudit: string;
}

interface ComplianceGap {
  requirement: string;
  currentState: string;
  requiredState: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
  remediation: string;
}

interface ComplianceRecommendation {
  priority: 'high' | 'medium' | 'low';
  description: string;
  cost: number;
  timeline: string;
  benefit: string;
}

interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  complexity: 'simple' | 'moderate' | 'complex';
  estimatedTime: string;
  prebuiltSteps: ProcessStep[];
  requiredRoles: string[];
}

const ProcessManagement: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [processes, setProcesses] = useState<BPMNProcess[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<BPMNProcess | null>(null);
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [swimlanes, setSwimlanes] = useState<ProcessSwimlane[]>([]);
  const [resources, setResources] = useState<ProcessResource[]>([]);
  const [templates, setTemplates] = useState<ProcessTemplate[]>([]);
  const [narrativeInput, setNarrativeInput] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [standaloneMode, setStandaloneMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'card' | 'table' | 'kanban'>('card');

  // Form states for detailed modals
  const [newProcessForm, setNewProcessForm] = useState({
    name: '',
    description: '',
    category: '',
    owner: '',
    businessValue: '',
    stakeholders: [] as string[],
  });

  const [newStepForm, setNewStepForm] = useState({
    name: '',
    description: '',
    type: 'task' as ProcessStep['type'],
    swimlane: '',
    duration: 1,
    cost: 0,
    assignee: '',
    priority: 'medium' as ProcessStep['priority'],
    businessRules: [] as string[],
    compliance: [] as string[],
  });

  const [newResourceForm, setNewResourceForm] = useState({
    name: '',
    type: 'human' as ProcessResource['type'],
    quantity: 1,
    unit: 'hours',
    cost: 0,
    availability: 100,
    skills: [] as string[],
    specifications: '',
    location: '',
    contactInfo: '',
  });

  const [newSwimlaneForm, setNewSwimlaneForm] = useState({
    name: '',
    role: '',
    department: '',
    color: '#3182CE',
    responsibilities: [] as string[],
    authority: [] as string[],
    reportingLine: '',
    skillRequirements: [] as string[],
  });

  // Modal states
  const { isOpen: isNewProcessOpen, onOpen: onNewProcessOpen, onClose: onNewProcessClose } = useDisclosure();
  const { isOpen: isNarrativeOpen, onOpen: onNarrativeOpen, onClose: onNarrativeClose } = useDisclosure();
  const { isOpen: isResourceOpen, onOpen: onResourceOpen, onClose: onResourceClose } = useDisclosure();
  const { isOpen: isBPMNOpen, onOpen: onBPMNOpen, onClose: onBPMNClose } = useDisclosure();
  const { isOpen: isStepDetailOpen, onOpen: onStepDetailOpen, onClose: onStepDetailClose } = useDisclosure();
  const { isOpen: isSwimlaneOpen, onOpen: onSwimlaneOpen, onClose: onSwimlaneClose } = useDisclosure();
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure();
  const { isOpen: isAnalysisOpen, onOpen: onAnalysisOpen, onClose: onAnalysisClose } = useDisclosure();
  const { isOpen: isImportOpen, onOpen: onImportOpen, onClose: onImportClose } = useDisclosure();
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const { isOpen: isComplianceOpen, onOpen: onComplianceOpen, onClose: onComplianceClose } = useDisclosure();
  const { isOpen: isOptimizationOpen, onOpen: onOptimizationOpen, onClose: onOptimizationClose } = useDisclosure();

  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Initialize sample data
  useEffect(() => {
    const sampleSwimlanes: ProcessSwimlane[] = [
      {
        id: '1',
        name: 'Customer Service',
        role: 'Service Representative',
        department: 'Customer Operations',
        color: '#3182CE',
        resources: [],
        responsibilities: ['Handle customer inquiries', 'Process requests', 'Update customer records'],
        authority: ['Approve refunds up to $500', 'Access customer data', 'Create service tickets'],
        reportingLine: 'Customer Service Manager',
        skillRequirements: ['Communication skills', 'CRM software', 'Problem solving']
      },
      {
        id: '2', 
        name: 'Operations Team',
        role: 'Process Coordinator',
        department: 'Operations',
        color: '#38A169',
        resources: [],
        responsibilities: ['Coordinate workflow', 'Monitor process metrics', 'Ensure quality standards'],
        authority: ['Schedule resources', 'Escalate issues', 'Approve process changes'],
        reportingLine: 'Operations Manager',
        skillRequirements: ['Project management', 'Data analysis', 'Process improvement']
      },
      {
        id: '3',
        name: 'Management',
        role: 'Supervisor',
        department: 'Leadership',
        color: '#D69E2E',
        resources: [],
        responsibilities: ['Strategic oversight', 'Resource allocation', 'Performance review'],
        authority: ['Budget approval', 'Staff management', 'Policy decisions'],
        reportingLine: 'Director',
        skillRequirements: ['Leadership', 'Strategic thinking', 'Budget management']
      }
    ];

    const sampleResources: ProcessResource[] = [
      {
        id: '1',
        name: 'Customer Service Representative',
        type: 'human',
        quantity: 3,
        unit: 'FTE',
        cost: 25,
        availability: 85,
        skills: ['Customer service', 'CRM systems', 'Communication'],
        specifications: 'Minimum 2 years experience',
        location: 'Main Office',
        contactInfo: 'hr@company.com',
        certification: ['Customer Service Certification']
      },
      {
        id: '2',
        name: 'CRM System',
        type: 'system',
        quantity: 1,
        unit: 'license',
        cost: 100,
        availability: 99,
        specifications: 'Salesforce Enterprise Edition',
        location: 'Cloud',
        maintenanceSchedule: 'Weekly updates, Monthly maintenance'
      },
      {
        id: '3',
        name: 'Customer Database',
        type: 'data',
        quantity: 1,
        unit: 'database',
        cost: 50,
        availability: 99.9,
        specifications: 'PostgreSQL cluster with replication',
        location: 'Data Center A'
      }
    ];

    const sampleTemplates: ProcessTemplate[] = [
      {
        id: '1',
        name: 'Customer Onboarding',
        description: 'Standard process for onboarding new customers',
        category: 'Customer Management',
        industry: 'General',
        complexity: 'moderate',
        estimatedTime: '2-3 hours',
        prebuiltSteps: [],
        requiredRoles: ['Sales', 'Customer Service', 'IT']
      },
      {
        id: '2',
        name: 'Invoice Processing',
        description: 'Automated invoice processing workflow',
        category: 'Finance',
        industry: 'General',
        complexity: 'simple',
        estimatedTime: '1 hour',
        prebuiltSteps: [],
        requiredRoles: ['Accounts Payable', 'Finance Manager']
      },
      {
        id: '3',
        name: 'Product Development',
        description: 'End-to-end product development lifecycle',
        category: 'Product Management',
        industry: 'Technology',
        complexity: 'complex',
        estimatedTime: '1-2 days',
        prebuiltSteps: [],
        requiredRoles: ['Product Manager', 'Engineering', 'QA', 'Marketing']
      }
    ];

    const sampleProcess: BPMNProcess = {
      id: '1',
      name: 'Customer Support Ticket Resolution',
      description: 'Process for handling and resolving customer support tickets',
      version: '2.1',
      owner: 'Sarah Johnson',
      status: 'active',
      swimlanes: sampleSwimlanes,
      steps: [
        {
          id: '1',
          name: 'Receive Customer Ticket',
          description: 'Customer submits support ticket through portal',
          type: 'start',
          swimlane: '1',
          inputs: [],
          outputs: [],
          resources: [sampleResources[0]],
          duration: 0.1,
          cost: 5,
          dependencies: [],
          assignee: 'Auto-assigned',
          status: 'completed',
          position: { x: 100, y: 100 },
          priority: 'medium',
          businessRules: ['Ticket must contain customer ID', 'Priority auto-assigned based on customer tier'],
          compliance: ['GDPR data handling', 'SLA requirements'],
          kpis: [
            { id: '1', name: 'Response Time', description: 'Time to first response', target: 2, current: 1.5, unit: 'hours', trend: 'decreasing', frequency: 'daily' }
          ],
          risks: [
            { id: '1', description: 'Ticket lost in system', probability: 'low', impact: 'high', mitigation: 'Automated confirmation emails', owner: 'IT Manager', status: 'mitigated' }
          ],
          automationLevel: 80,
          qualityGates: [
            { id: '1', name: 'Ticket Validation', criteria: ['Customer ID verified', 'Issue category assigned'], checkpoints: ['System validation'], approver: 'System', mandatory: true }
          ],
          dataRequirements: [
            { id: '1', name: 'Customer Information', type: 'input', format: 'JSON', source: 'Customer Portal', frequency: 'Real-time', retention: '7 years' }
          ]
        }
      ],
      totalDuration: 2.5,
      totalCost: 125,
      efficiency: 87,
      lastUpdated: new Date().toISOString(),
      narrative: 'This process handles customer support tickets from initial receipt through resolution and follow-up.',
      category: 'Customer Service',
      businessValue: 'Ensures consistent, high-quality customer support delivery',
      stakeholders: ['Customer Service Manager', 'IT Director', 'Quality Assurance Manager'],
      approvals: [
        { id: '1', approver: 'John Smith', role: 'Process Owner', status: 'approved', comments: 'Approved with minor revisions', date: '2024-01-15' }
      ],
      metrics: {
        cycleTime: 2.5,
        leadTime: 3.2,
        throughput: 45,
        qualityScore: 94,
        customerSatisfaction: 4.2,
        costPerUnit: 125,
        automationRate: 65,
        errorRate: 2.1
      }
    };

    setSwimlanes(sampleSwimlanes);
    setResources(sampleResources);
    setTemplates(sampleTemplates);
    setProcesses([sampleProcess]);
  }, []);

  // Enhanced AI Analysis Functions
  const performAIAnalysis = useCallback(async (process: BPMNProcess): Promise<AIAnalysis> => {
    setAiProcessing(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const aiAnalysis: AIAnalysis = {
        extractedSteps: process.steps.length,
        identifiedResources: process.steps.reduce((acc, step) => acc + step.resources.length, 0),
        suggestedOptimizations: [
          {
            id: '1',
            type: 'automation',
            description: 'Implement RPA for initial ticket categorization',
            impact: 'high',
            effort: 'medium',
            roi: 2.3,
            timeline: '3-4 months'
          },
          {
            id: '2',
            type: 'time_saving',
            description: 'Introduce parallel processing for non-dependent steps',
            impact: 'medium',
            effort: 'low',
            roi: 1.8,
            timeline: '1-2 months'
          }
        ],
        riskAreas: ['Single point of failure in approval step', 'Manual handoffs causing delays'],
        complianceChecks: ['GDPR compliance verified', 'SLA tracking implemented'],
        automationOpportunities: [
          {
            stepId: '1',
            automationType: 'rpa',
            feasibility: 85,
            savings: 15000,
            description: 'Automate ticket routing based on keywords'
          }
        ],
        benchmarkComparison: {
          industry: 'Technology Services',
          avgCycleTime: 3.2,
          avgCost: 150,
          avgQuality: 89,
          ranking: 15,
          improvementAreas: ['Response time', 'First contact resolution']
        }
      };

      toast({
        title: 'AI Analysis Complete',
        description: `Found ${aiAnalysis.suggestedOptimizations.length} optimization opportunities`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      return aiAnalysis;
    } finally {
      setAiProcessing(false);
    }
  }, [toast]);

  const performLeanAnalysis = useCallback(async (process: BPMNProcess): Promise<LeanAnalysis> => {
    setAiProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const leanAnalysis: LeanAnalysis = {
        valueStreamMap: process.steps.map(step => ({
          stepId: step.id,
          valueType: step.type === 'task' ? 'value-added' : 
                     step.type === 'decision' ? 'necessary-waste' : 'pure-waste',
          cycleTime: step.duration * 60,
          waitTime: Math.random() * 30,
          processingTime: step.duration * 60 * 0.7,
          changeovers: Math.floor(Math.random() * 3),
          defectRate: Math.random() * 0.05,
          improvements: ['Reduce handoff time', 'Standardize process', 'Implement quality checks']
        })),
        wasteIdentification: [
          {
            type: 'waiting',
            description: 'Delays in approval workflow',
            severity: 'high',
            impact: 25,
            suggestedActions: ['Implement automated approvals', 'Set escalation triggers'],
            affectedSteps: ['2', '3'],
            costImpact: 5000
          }
        ],
        kanbanRecommendations: [
          {
            area: 'Ticket Processing',
            currentState: 'Push system with batching',
            recommendedState: 'Pull system with WIP limits',
            benefits: ['Reduced lead time', 'Better flow visibility'],
            implementation: ['Set up Kanban board', 'Define WIP limits', 'Train team']
          }
        ],
        cycleTimes: process.steps.map(step => ({
          stepId: step.id,
          stepName: step.name,
          averageTime: step.duration,
          standardDeviation: step.duration * 0.2,
          target: step.duration * 0.8,
          variance: 15
        })),
        leadTime: process.totalDuration,
        processTime: process.totalDuration * 0.6,
        efficiency: 75,
        valueAddedRatio: 60,
        improvements: [
          {
            area: 'Cycle Time',
            current: 2.5,
            target: 2.0,
            actions: ['Eliminate approval bottleneck', 'Automate data entry'],
            timeline: '3 months',
            investment: 25000,
            savings: 45000
          }
        ]
      };

      return leanAnalysis;
    } finally {
      setAiProcessing(false);
    }
  }, []);

  const performBottleneckAnalysis = useCallback(async (process: BPMNProcess): Promise<BottleneckAnalysis> => {
    setAiProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bottleneckAnalysis: BottleneckAnalysis = {
        criticalPath: process.steps.map(step => step.id),
        bottleneckSteps: process.steps.map(step => {
          const utilization = Math.random() * 100;
          return {
            stepId: step.id,
            stepName: step.name,
            utilization,
            queueLength: Math.max(0, Math.random() * 10),
            processingRate: Math.random() * 20 + 5,
            demandRate: Math.random() * 25 + 5,
            severity: utilization > 90 ? 'critical' : 
                     utilization > 75 ? 'high' : 
                     utilization > 60 ? 'medium' : 'low',
            rootCauses: ['Resource capacity constraint', 'Manual processing', 'Dependencies'],
            impact: {
              delayMinutes: Math.random() * 60,
              costImpact: Math.random() * 1000,
              qualityImpact: Math.random() * 10
            },
            solutions: [
              {
                description: 'Add additional resources',
                cost: 15000,
                timeToImplement: '2 weeks',
                expectedImprovement: 30,
                feasibility: 'high'
              }
            ]
          };
        }),
        capacityUtilization: [
          {
            resource: 'Customer Service Rep',
            currentCapacity: 40,
            requiredCapacity: 45,
            utilizationRate: 89,
            recommendation: 'Add 1 additional FTE or implement automation'
          }
        ],
        queueAnalysis: process.steps.map(step => ({
          stepId: step.id,
          averageQueueLength: Math.random() * 5,
          averageWaitTime: Math.random() * 30,
          maxQueueLength: Math.random() * 15,
          maxWaitTime: Math.random() * 120
        })),
        recommendations: [
          {
            priority: 'high',
            description: 'Implement automated ticket routing',
            impact: 'Reduce processing time by 40%',
            cost: 20000,
            timeline: '6 weeks',
            riskLevel: 'low'
          }
        ],
        throughputMetrics: {
          current: 45,
          theoretical: 65,
          efficiency: 69,
          constraints: ['Manual approval process', 'Limited system integration'],
          improvementPotential: 44
        },
        resourceOptimization: [
          {
            resourceId: '1',
            currentAllocation: 100,
            optimalAllocation: 85,
            savingsOpportunity: 3500,
            reallocationSuggestion: 'Reallocate 15% to peak hours'
          }
        ]
      };

      return bottleneckAnalysis;
    } finally {
      setAiProcessing(false);
    }
  }, []);

  // Handler functions for all button actions
  const handleCreateProcess = async () => {
    if (!newProcessForm.name || !newProcessForm.description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newProcess: BPMNProcess = {
      id: Date.now().toString(),
      name: newProcessForm.name,
      description: newProcessForm.description,
      version: '1.0',
      owner: newProcessForm.owner,
      status: 'draft',
      swimlanes: [],
      steps: [],
      totalDuration: 0,
      totalCost: 0,
      efficiency: 0,
      lastUpdated: new Date().toISOString(),
      narrative: '',
      category: newProcessForm.category,
      businessValue: newProcessForm.businessValue,
      stakeholders: newProcessForm.stakeholders,
      approvals: [],
      metrics: {
        cycleTime: 0,
        leadTime: 0,
        throughput: 0,
        qualityScore: 0,
        customerSatisfaction: 0,
        costPerUnit: 0,
        automationRate: 0,
        errorRate: 0
      }
    };

    setProcesses(prev => [...prev, newProcess]);
    setNewProcessForm({
      name: '',
      description: '',
      category: '',
      owner: '',
      businessValue: '',
      stakeholders: [],
    });
    onNewProcessClose();

    toast({
      title: 'Process Created',
      description: `Successfully created process: ${newProcess.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAnalyzeNarrative = async () => {
    if (!narrativeInput.trim()) {
      toast({
        title: 'No Input',
        description: 'Please enter a process narrative to analyze',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setAiProcessing(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Create a new process based on narrative analysis
      const analyzedProcess: BPMNProcess = {
        id: Date.now().toString(),
        name: 'AI Analyzed Process',
        description: 'Process created from narrative analysis',
        version: '1.0',
        owner: 'AI System',
        status: 'draft',
        swimlanes: swimlanes.slice(0, 2), // Use first 2 swimlanes
        steps: [
          {
            id: '1',
            name: 'Initial Step',
            description: 'Extracted from narrative',
            type: 'start',
            swimlane: '1',
            inputs: [],
            outputs: [],
            resources: [],
            duration: 0.5,
            cost: 25,
            dependencies: [],
            assignee: 'Team Member',
            status: 'not_started',
            position: { x: 100, y: 100 },
            priority: 'medium',
            businessRules: [],
            compliance: [],
            kpis: [],
            risks: [],
            automationLevel: 0,
            qualityGates: [],
            dataRequirements: []
          }
        ],
        totalDuration: 0.5,
        totalCost: 25,
        efficiency: 0,
        lastUpdated: new Date().toISOString(),
        narrative: narrativeInput,
        category: 'AI Generated',
        businessValue: 'Extracted from narrative analysis',
        stakeholders: [],
        approvals: [],
        metrics: {
          cycleTime: 0.5,
          leadTime: 0.5,
          throughput: 0,
          qualityScore: 0,
          customerSatisfaction: 0,
          costPerUnit: 25,
          automationRate: 0,
          errorRate: 0
        },
        aiAnalysis: {
          extractedSteps: 1,
          identifiedResources: 0,
          suggestedOptimizations: [],
          riskAreas: [],
          complianceChecks: [],
          automationOpportunities: [],
          benchmarkComparison: {
            industry: 'General',
            avgCycleTime: 1.0,
            avgCost: 50,
            avgQuality: 85,
            ranking: 50,
            improvementAreas: []
          }
        }
      };

      setProcesses(prev => [...prev, analyzedProcess]);
      setNarrativeInput('');
      onNarrativeClose();

      toast({
        title: 'Narrative Analysis Complete',
        description: 'Successfully created process from narrative',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setAiProcessing(false);
    }
  };

  const handleAddResource = () => {
    if (!newResourceForm.name) {
      toast({
        title: 'Missing Information',
        description: 'Please enter a resource name',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newResource: ProcessResource = {
      id: Date.now().toString(),
      ...newResourceForm,
    };

    setResources(prev => [...prev, newResource]);
    setNewResourceForm({
      name: '',
      type: 'human',
      quantity: 1,
      unit: 'hours',
      cost: 0,
      availability: 100,
      skills: [],
      specifications: '',
      location: '',
      contactInfo: '',
    });
    onResourceClose();

    toast({
      title: 'Resource Added',
      description: `Successfully added resource: ${newResource.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddSwimlane = () => {
    if (!newSwimlaneForm.name || !newSwimlaneForm.role) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in name and role',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newSwimlane: ProcessSwimlane = {
      id: Date.now().toString(),
      ...newSwimlaneForm,
      resources: []
    };

    setSwimlanes(prev => [...prev, newSwimlane]);
    setNewSwimlaneForm({
      name: '',
      role: '',
      department: '',
      color: '#3182CE',
      responsibilities: [],
      authority: [],
      reportingLine: '',
      skillRequirements: [],
    });
    onSwimlaneClose();

    toast({
      title: 'Swimlane Added',
      description: `Successfully added swimlane: ${newSwimlane.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleExportProcess = (process: BPMNProcess, format: 'json' | 'bpmn' | 'pdf' | 'excel') => {
    const exportData = {
      process,
      exportDate: new Date().toISOString(),
      format,
      metadata: {
        version: '1.0',
        generatedBy: 'Lucidra Process Management'
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${process.name}_${format}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: 'Export Complete',
      description: `Successfully exported ${process.name} as ${format.toUpperCase()}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleImportProcess = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (importedData.process) {
          const importedProcess = {
            ...importedData.process,
            id: Date.now().toString(), // Generate new ID
            lastUpdated: new Date().toISOString()
          };
          setProcesses(prev => [...prev, importedProcess]);
          toast({
            title: 'Import Successful',
            description: `Successfully imported process: ${importedProcess.name}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Import Failed',
          description: 'Invalid file format or corrupted data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteProcess = (processId: string) => {
    setProcesses(prev => prev.filter(p => p.id !== processId));
    if (selectedProcess?.id === processId) {
      setSelectedProcess(null);
    }
    toast({
      title: 'Process Deleted',
      description: 'Process has been successfully deleted',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCloneProcess = (process: BPMNProcess) => {
    const clonedProcess: BPMNProcess = {
      ...process,
      id: Date.now().toString(),
      name: `${process.name} (Copy)`,
      version: '1.0',
      status: 'draft',
      lastUpdated: new Date().toISOString()
    };
    
    setProcesses(prev => [...prev, clonedProcess]);
    toast({
      title: 'Process Cloned',
      description: `Successfully cloned process: ${clonedProcess.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // Filter and sort processes
  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         process.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || process.status === filterStatus;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'efficiency':
        return b.efficiency - a.efficiency;
      default:
        return 0;
    }
  });

  // Component for Process Dashboard
  const ProcessDashboard = () => (
    <VStack spacing={6} align="stretch">
      {/* Header with controls */}
      <HStack justify="space-between" wrap="wrap" spacing={4}>
        <VStack align="start" spacing={1}>
          <Text fontSize="xl" fontWeight="bold">🔄 Process Management Dashboard</Text>
          <HStack>
            {standaloneMode && (
              <Badge colorScheme="purple" variant="solid">Standalone Mode</Badge>
            )}
            <Badge colorScheme="green">{processes.length} Processes</Badge>
            <Badge colorScheme="blue">{resources.length} Resources</Badge>
            <Badge colorScheme="orange">{swimlanes.length} Swimlanes</Badge>
          </HStack>
        </VStack>
        
        <HStack wrap="wrap" spacing={2}>
          <Switch
            isChecked={standaloneMode}
            onChange={(e) => setStandaloneMode(e.target.checked)}
            size="sm"
          />
          <Text fontSize="sm">Standalone</Text>
          
          <Select size="sm" value={viewMode} onChange={(e) => setViewMode(e.target.value as any)} width="120px">
            <option value="card">Card View</option>
            <option value="table">Table View</option>
            <option value="kanban">Kanban</option>
          </Select>
          
          <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProcessOpen} size="sm">
            New Process
          </Button>
          <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={onTemplateOpen} size="sm">
            From Template
          </Button>
          <Button colorScheme="green" leftIcon={<DownloadIcon />} onClick={onImportOpen} size="sm">
            Import
          </Button>
        </HStack>
      </HStack>

      {/* Search and Filter Controls */}
      <Card bg={cardBg}>
        <CardBody>
          <HStack spacing={4} wrap="wrap">
            <FormControl maxW="300px">
              <Input
                placeholder="Search processes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftElement={<SearchIcon />}
              />
            </FormControl>
            
            <FormControl maxW="150px">
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="retired">Retired</option>
                <option value="under_review">Under Review</option>
              </Select>
            </FormControl>
            
            <FormControl maxW="150px">
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="updated">Last Updated</option>
                <option value="efficiency">Efficiency</option>
              </Select>
            </FormControl>
          </HStack>
        </CardBody>
      </Card>

      {/* Process Statistics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <Stat>
          <StatLabel>Total Processes</StatLabel>
          <StatNumber>{processes.length}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12% from last month
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Avg Efficiency</StatLabel>
          <StatNumber>{processes.length > 0 ? Math.round(processes.reduce((acc, p) => acc + p.efficiency, 0) / processes.length) : 0}%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            5% improvement
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Active Processes</StatLabel>
          <StatNumber>{processes.filter(p => p.status === 'active').length}</StatNumber>
          <StatHelpText>Currently running</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Automation Rate</StatLabel>
          <StatNumber>67%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            Target: 75%
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Process List */}
      {viewMode === 'card' && (
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {filteredProcesses.map((process) => (
            <Card key={process.id} bg={cardBg} borderWidth="1px" borderColor={borderColor} 
                  _hover={{ shadow: 'md', transform: 'translateY(-2px)' }} transition="all 0.2s">
              <CardHeader>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="lg" fontWeight="bold" noOfLines={1}>{process.name}</Text>
                    <HStack spacing={2}>
                      <Badge colorScheme={
                        process.status === 'active' ? 'green' :
                        process.status === 'draft' ? 'yellow' :
                        process.status === 'retired' ? 'red' : 'blue'
                      }>
                        {process.status}
                      </Badge>
                      <Badge variant="outline">v{process.version}</Badge>
                    </HStack>
                  </VStack>
                  <IconButton
                    aria-label="More options"
                    icon={<SettingsIcon />}
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSelectedProcess(process);
                      onAnalysisOpen();
                    }}
                  />
                </HStack>
              </CardHeader>
              
              <CardBody pt={0}>
                <VStack align="stretch" spacing={3}>
                  <Text fontSize="sm" color="gray.600" noOfLines={2}>{process.description}</Text>
                  
                  <SimpleGrid columns={2} spacing={4}>
                    <Box>
                      <Text fontSize="xs" color="gray.500">Duration</Text>
                      <Text fontSize="sm" fontWeight="semibold">{process.totalDuration}h</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="gray.500">Cost</Text>
                      <Text fontSize="sm" fontWeight="semibold">${process.totalCost}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="gray.500">Steps</Text>
                      <Text fontSize="sm" fontWeight="semibold">{process.steps.length}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="gray.500">Efficiency</Text>
                      <Text fontSize="sm" fontWeight="semibold">{process.efficiency}%</Text>
                    </Box>
                  </SimpleGrid>

                  <Progress value={process.efficiency} colorScheme="green" size="sm" />

                  <HStack spacing={2} wrap="wrap">
                    <Button size="xs" colorScheme="blue" onClick={() => {
                      setSelectedProcess(process);
                      setActiveTab(1);
                    }}>
                      Edit
                    </Button>
                    <Button size="xs" colorScheme="green" onClick={() => {
                      setSelectedProcess(process);
                      onAnalysisOpen();
                    }}>
                      Analyze
                    </Button>
                    <Button size="xs" colorScheme="orange" onClick={() => handleCloneProcess(process)}>
                      Clone
                    </Button>
                    <Button size="xs" colorScheme="purple" onClick={() => {
                      onExportOpen();
                      setSelectedProcess(process);
                    }}>
                      Export
                    </Button>
                    <Button size="xs" colorScheme="red" variant="outline" 
                            onClick={() => handleDeleteProcess(process.id)}>
                      Delete
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}

      {viewMode === 'table' && (
        <Card bg={cardBg}>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th>Owner</Th>
                  <Th>Duration</Th>
                  <Th>Cost</Th>
                  <Th>Efficiency</Th>
                  <Th>Last Updated</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredProcesses.map((process) => (
                  <Tr key={process.id}>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">{process.name}</Text>
                        <Text fontSize="xs" color="gray.500">v{process.version}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme={
                        process.status === 'active' ? 'green' :
                        process.status === 'draft' ? 'yellow' :
                        process.status === 'retired' ? 'red' : 'blue'
                      }>
                        {process.status}
                      </Badge>
                    </Td>
                    <Td>{process.owner}</Td>
                    <Td>{process.totalDuration}h</Td>
                    <Td>${process.totalCost}</Td>
                    <Td>
                      <HStack>
                        <Text>{process.efficiency}%</Text>
                        <Progress value={process.efficiency} size="sm" width="50px" />
                      </HStack>
                    </Td>
                    <Td>{new Date(process.lastUpdated).toLocaleDateString()}</Td>
                    <Td>
                      <HStack spacing={1}>
                        <IconButton aria-label="Edit" icon={<EditIcon />} size="sm" 
                                    onClick={() => {
                                      setSelectedProcess(process);
                                      setActiveTab(1);
                                    }} />
                        <IconButton aria-label="Analyze" icon={<ViewIcon />} size="sm" 
                                    onClick={() => {
                                      setSelectedProcess(process);
                                      onAnalysisOpen();
                                    }} />
                        <IconButton aria-label="Export" icon={<DownloadIcon />} size="sm" 
                                    onClick={() => {
                                      setSelectedProcess(process);
                                      onExportOpen();
                                    }} />
                        <IconButton aria-label="Delete" icon={<DeleteIcon />} size="sm" colorScheme="red" 
                                    onClick={() => handleDeleteProcess(process.id)} />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}

      {filteredProcesses.length === 0 && (
        <Card bg={cardBg}>
          <CardBody textAlign="center" py={10}>
            <VStack spacing={4}>
              <Text fontSize="6xl">📋</Text>
              <Text fontSize="xl" fontWeight="bold">No Processes Found</Text>
              <Text color="gray.500">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Create your first process to get started'}
              </Text>
              {!searchTerm && filterStatus === 'all' && (
                <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProcessOpen}>
                  Create First Process
                </Button>
              )}
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  // Enhanced BPMN Designer Component with drag-and-drop functionality
  const BPMNDesigner = () => {
    const [draggedElement, setDraggedElement] = React.useState<string | null>(null);
    const [canvasElements, setCanvasElements] = React.useState<ProcessStep[]>(
      selectedProcess?.steps || []
    );

    React.useEffect(() => {
      if (selectedProcess) {
        setCanvasElements(selectedProcess.steps);
      }
    }, [selectedProcess]);

    const handleElementDragStart = (elementType: string) => {
      setDraggedElement(elementType);
    };

    const handleCanvasDrop = (e: React.DragEvent) => {
      e.preventDefault();
      if (!draggedElement || !selectedProcess) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newElement: ProcessStep = {
        id: `${draggedElement}-${Date.now()}`,
        name: `New ${draggedElement.charAt(0).toUpperCase() + draggedElement.slice(1)}`,
        description: `A new ${draggedElement} element`,
        type: draggedElement as any,
        swimlane: selectedProcess.swimlanes[0]?.id || '1',
        inputs: [],
        outputs: [],
        resources: [],
        duration: 1,
        cost: 50,
        dependencies: [],
        assignee: 'Unassigned',
        status: 'not_started',
        position: { x: Math.max(0, x - 50), y: Math.max(0, y - 30) },
        priority: 'medium',
        businessRules: [],
        compliance: [],
        kpis: [],
        risks: [],
        automationLevel: 0,
        qualityGates: [],
        dataRequirements: [],
        narrative: `This is a ${draggedElement} step that handles specific business logic and requirements. 
        
Key responsibilities:
• Process incoming data/requests
• Apply business rules and validation
• Generate appropriate outputs
• Monitor performance metrics
• Ensure compliance requirements

This step is designed to be efficient, scalable, and maintainable while providing clear audit trails for all operations.`
      };

      const updatedElements = [...canvasElements, newElement];
      setCanvasElements(updatedElements);
      
      // Update the process
      const updatedProcess = { ...selectedProcess, steps: updatedElements };
      setSelectedProcess(updatedProcess);
      setProcesses((prev: any) => prev.map((p: any) => p.id === selectedProcess.id ? updatedProcess : p));
      
      setDraggedElement(null);
      
      toast({
        title: 'Element Added Successfully',
        description: `${newElement.name} has been added to your process canvas`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    };

    const handleCanvasDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    const handleElementMove = (elementId: string, newX: number, newY: number) => {
      const updatedElements = canvasElements.map(element => 
        element.id === elementId 
          ? { ...element, position: { x: newX, y: newY } }
          : element
      );
      setCanvasElements(updatedElements);
      
      if (selectedProcess) {
        const updatedProcess = { ...selectedProcess, steps: updatedElements };
        setSelectedProcess(updatedProcess);
        setProcesses((prev: any) => prev.map((p: any) => p.id === selectedProcess.id ? updatedProcess : p));
      }
    };

    return (
      <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">🎨 BPMN Process Designer</Text>
        <HStack>
          <Button colorScheme="green" leftIcon={<AddIcon />} onClick={onSwimlaneOpen}>
            Add Swimlane
          </Button>
          <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onStepDetailOpen}>
            Add Step
          </Button>
          <Button colorScheme="purple" leftIcon={<ViewIcon />} onClick={onBPMNOpen}>
            Preview BPMN
          </Button>
        </HStack>
      </HStack>

      {/* Process Selection */}
      <Card bg={cardBg}>
        <CardBody>
          <HStack spacing={4}>
            <FormControl maxW="300px">
              <FormLabel fontSize="sm">Select Process to Design</FormLabel>
              <Select 
                value={selectedProcess?.id || ''} 
                onChange={(e) => {
                  const process = processes.find(p => p.id === e.target.value);
                  setSelectedProcess(process || null);
                }}
                placeholder="Choose a process..."
              >
                {processes.map(process => (
                  <option key={process.id} value={process.id}>{process.name}</option>
                ))}
              </Select>
            </FormControl>
            {selectedProcess && (
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="semibold">{selectedProcess.name}</Text>
                <HStack>
                  <Badge colorScheme="blue">{selectedProcess.steps.length} steps</Badge>
                  <Badge colorScheme="green">{selectedProcess.swimlanes.length} swimlanes</Badge>
                </HStack>
              </VStack>
            )}
          </HStack>
        </CardBody>
      </Card>

      {selectedProcess ? (
        <Grid templateColumns={{ base: "1fr", lg: "1fr 300px" }} gap={6}>
          {/* Main Design Area */}
          <Card bg={cardBg} minH="500px">
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">Process Flow</Text>
            </CardHeader>
            <CardBody>
              <Box 
                border="2px dashed" 
                borderColor={draggedElement ? "blue.400" : "gray.300"}
                borderRadius="md" 
                p={8} 
                minH="400px" 
                position="relative"
                bg={useColorModeValue('gray.50', 'gray.800')}
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
                transition="all 0.2s"
                backgroundImage={`radial-gradient(circle, ${useColorModeValue('gray.300', 'gray.600')} 1px, transparent 1px)`}
                backgroundSize="20px 20px"
              >
                {/* Swimlanes */}
                {selectedProcess.swimlanes.map((swimlane, index) => (
                  <Box
                    key={swimlane.id}
                    position="absolute"
                    top={`${index * 120}px`}
                    left="0"
                    right="0"
                    height="120px"
                    bg={`${swimlane.color}20`}
                    border="1px solid"
                    borderColor={swimlane.color}
                    borderRadius="md"
                    p={2}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="bold">{swimlane.name}</Text>
                        <Text fontSize="xs" color="gray.600">{swimlane.role}</Text>
                      </VStack>
                      <IconButton
                        aria-label="Edit swimlane"
                        icon={<EditIcon />}
                        size="xs"
                        onClick={() => {
                          // Implementation for editing swimlane
                          toast({
                            title: 'Edit Swimlane',
                            description: 'Swimlane editing functionality would open here',
                            status: 'info',
                            duration: 3000,
                            isClosable: true,
                          });
                        }}
                      />
                    </HStack>
                  </Box>
                ))}

                {/* Enhanced Process Steps with Drag Support */}
                {canvasElements.map((step, index) => (
                  <Box
                    key={step.id}
                    position="absolute"
                    left={`${step.position?.x || (index * 150 + 100)}px`}
                    top={`${step.position?.y || 40}px`}
                    draggable
                    onDragEnd={(e) => {
                      const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                      if (rect) {
                        const newX = e.clientX - rect.left;
                        const newY = e.clientY - rect.top;
                        handleElementMove(step.id, Math.max(0, newX - 60), Math.max(0, newY - 30));
                      }
                    }}
                    width="120px"
                    height="60px"
                    bg="white"
                    border="2px solid"
                    borderColor={
                      step.type === 'start' ? 'green.400' :
                      step.type === 'end' ? 'red.400' :
                      step.type === 'decision' ? 'orange.400' : 'blue.400'
                    }
                    borderRadius={step.type === 'decision' ? '50%' : 'md'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ shadow: 'md', transform: 'scale(1.05)' }}
                    onClick={() => {
                      setSelectedStep(step);
                      onStepDetailOpen();
                    }}
                    transition="all 0.2s"
                  >
                    <VStack spacing={1}>
                      <Text fontSize="xs" fontWeight="bold" textAlign="center" noOfLines={2}>
                        {step.name}
                      </Text>
                      <Badge size="xs" colorScheme={
                        step.status === 'completed' ? 'green' :
                        step.status === 'in_progress' ? 'blue' :
                        step.status === 'blocked' ? 'red' : 'gray'
                      }>
                        {step.status}
                      </Badge>
                    </VStack>
                  </Box>
                ))}

                {/* Connection arrows */}
                {selectedProcess.steps.slice(0, -1).map((step, index) => (
                  <Box
                    key={`arrow-${step.id}`}
                    position="absolute"
                    left={`${index * 150 + 220}px`}
                    top="65px"
                    width="30px"
                    height="2px"
                    bg="gray.400"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      right: '-5px',
                      top: '-3px',
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid gray.400',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent'
                    }}
                  />
                ))}

                {/* Drop zone indicator */}
                {draggedElement && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    p={6}
                    bg="blue.100"
                    border="3px dashed"
                    borderColor="blue.400"
                    borderRadius="lg"
                    pointerEvents="none"
                    zIndex={10}
                  >
                    <VStack spacing={2}>
                      <Text fontSize="2xl">
                        {draggedElement === 'start' ? '🟢' : 
                         draggedElement === 'task' ? '📋' : 
                         draggedElement === 'decision' ? '💎' : 
                         draggedElement === 'subprocess' ? '📦' : 
                         draggedElement === 'gateway' ? '⚡' : 
                         draggedElement === 'end' ? '🔴' : '❓'}
                      </Text>
                      <Text color="blue.600" fontWeight="bold">
                        Drop {draggedElement} here
                      </Text>
                      <Text fontSize="xs" color="blue.500">
                        Release to add to canvas
                      </Text>
                    </VStack>
                  </Box>
                )}

                {canvasElements.length === 0 && !draggedElement && (
                  <VStack spacing={4} justify="center" align="center" h="full">
                    <Text fontSize="5xl">🎨</Text>
                    <Text fontSize="lg" fontWeight="bold">Interactive Process Canvas</Text>
                    <Text color="gray.500" textAlign="center" maxW="350px">
                      Welcome to the visual process designer! Drag BPMN elements from the right panel to build your process flow.
                    </Text>
                    <VStack spacing={2}>
                      <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onStepDetailOpen}>
                        Add First Element
                      </Button>
                      <Text fontSize="xs" color="gray.400">Or drag an element from the right panel</Text>
                    </VStack>
                  </VStack>
                )}
              </Box>
            </CardBody>
          </Card>

          {/* Side Panel with Tools */}
          <Card bg={cardBg}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">Design Tools</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {/* Draggable BPMN Elements */}
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>🔧 BPMN Elements</Text>
                  <Text fontSize="xs" color="gray.500" mb={3}>Drag elements to canvas</Text>
                  <SimpleGrid columns={2} spacing={2}>
                    {[
                      { type: 'start', icon: '🟢', name: 'Start Event', color: 'green' },
                      { type: 'task', icon: '📋', name: 'Task', color: 'blue' },
                      { type: 'decision', icon: '💎', name: 'Decision', color: 'yellow' },
                      { type: 'subprocess', icon: '📦', name: 'Subprocess', color: 'purple' },
                      { type: 'gateway', icon: '⚡', name: 'Gateway', color: 'orange' },
                      { type: 'end', icon: '🔴', name: 'End Event', color: 'red' }
                    ].map((element) => (
                      <Card
                        key={element.type}
                        size="sm"
                        variant="outline"
                        cursor="grab"
                        draggable
                        onDragStart={() => handleElementDragStart(element.type)}
                        bg={`${element.color}.50`}
                        borderColor={`${element.color}.200`}
                        _hover={{ 
                          transform: 'scale(1.05)', 
                          shadow: 'md', 
                          borderColor: `${element.color}.400`,
                          bg: `${element.color}.100`
                        }}
                        _active={{ cursor: 'grabbing' }}
                        borderWidth="2px"
                        transition="all 0.2s"
                      >
                        <CardBody p={2} textAlign="center">
                          <VStack spacing={1}>
                            <Text fontSize="lg">{element.icon}</Text>
                            <Text fontSize="xs" fontWeight="bold">{element.name}</Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                  <Alert status="info" mt={3} size="sm" borderRadius="md">
                    <AlertIcon />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="xs" fontWeight="semibold">Drag & Drop</Text>
                      <Text fontSize="xs">
                        Drag elements to the canvas to build your process
                      </Text>
                    </VStack>
                  </Alert>
                </Box>

                <Divider />

                {/* Quick Actions */}
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Quick Actions</Text>
                  <VStack spacing={2} align="stretch">
                    <Button size="sm" leftIcon={<AddIcon />} onClick={onStepDetailOpen}>
                      Add Step
                    </Button>
                    <Button size="sm" leftIcon={<AddIcon />} onClick={onSwimlaneOpen}>
                      Add Swimlane
                    </Button>
                    <Button size="sm" leftIcon={<ViewIcon />} onClick={onBPMNOpen}>
                      Preview
                    </Button>
                    <Button size="sm" leftIcon={<DownloadIcon />} onClick={() => {
                      if (selectedProcess) {
                        handleExportProcess(selectedProcess, 'bpmn');
                      }
                    }}>
                      Export BPMN
                    </Button>
                  </VStack>
                </Box>

                <Divider />

                {/* Process Properties */}
                {selectedProcess && (
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Process Properties</Text>
                    <VStack spacing={2} align="stretch">
                      <Box>
                        <Text fontSize="xs" color="gray.500">Name</Text>
                        <Text fontSize="sm">{selectedProcess.name}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="gray.500">Version</Text>
                        <Text fontSize="sm">v{selectedProcess.version}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="gray.500">Owner</Text>
                        <Text fontSize="sm">{selectedProcess.owner}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="gray.500">Status</Text>
                        <Badge colorScheme={
                          selectedProcess.status === 'active' ? 'green' :
                          selectedProcess.status === 'draft' ? 'yellow' : 'red'
                        }>
                          {selectedProcess.status}
                        </Badge>
                      </Box>
                    </VStack>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      ) : (
        <Card bg={cardBg}>
          <CardBody textAlign="center" py={10}>
            <VStack spacing={4}>
              <Text fontSize="6xl">🎨</Text>
              <Text fontSize="xl" fontWeight="bold">Select a Process to Design</Text>
              <Text color="gray.500">Choose a process from the dropdown above to start designing</Text>
              <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProcessOpen}>
                Create New Process
              </Button>
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  // AI Analysis Panel with comprehensive functionality
  const AIAnalysisPanel = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">🤖 AI Process Analysis</Text>
        <HStack>
          <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={onNarrativeOpen}>
            Analyze Narrative
          </Button>
          <Button colorScheme="green" leftIcon={<ViewIcon />} onClick={onComplianceOpen}>
            Compliance Check
          </Button>
          <Button colorScheme="orange" leftIcon={<StarIcon />} onClick={onOptimizationOpen}>
            Optimization
          </Button>
        </HStack>
      </HStack>

      {/* Process Selection for Analysis */}
      <Card bg={cardBg}>
        <CardBody>
          <HStack spacing={4} wrap="wrap">
            <FormControl maxW="300px">
              <FormLabel fontSize="sm">Select Process for Analysis</FormLabel>
              <Select 
                value={selectedProcess?.id || ''} 
                onChange={(e) => {
                  const process = processes.find(p => p.id === e.target.value);
                  setSelectedProcess(process || null);
                }}
                placeholder="Choose a process..."
              >
                {processes.map(process => (
                  <option key={process.id} value={process.id}>{process.name}</option>
                ))}
              </Select>
            </FormControl>
            
            {selectedProcess && (
              <HStack spacing={2}>
                <Button 
                  colorScheme="blue" 
                  onClick={() => performAIAnalysis(selectedProcess)}
                  isLoading={aiProcessing}
                  loadingText="Analyzing..."
                >
                  🧠 AI Analysis
                </Button>
                <Button 
                  colorScheme="green" 
                  onClick={() => performLeanAnalysis(selectedProcess)}
                  isLoading={aiProcessing}
                  loadingText="Analyzing..."
                >
                  📊 Lean Analysis
                </Button>
                <Button 
                  colorScheme="orange" 
                  onClick={() => performBottleneckAnalysis(selectedProcess)}
                  isLoading={aiProcessing}
                  loadingText="Analyzing..."
                >
                  🔍 Bottleneck Analysis
                </Button>
              </HStack>
            )}
          </HStack>
        </CardBody>
      </Card>

      {selectedProcess ? (
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
          {/* AI Analysis Results */}
          {selectedProcess.aiAnalysis && (
            <Card bg={cardBg}>
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">🧠 AI Analysis Results</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <SimpleGrid columns={2} spacing={4}>
                    <Stat>
                      <StatLabel>Extracted Steps</StatLabel>
                      <StatNumber>{selectedProcess.aiAnalysis.extractedSteps}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Identified Resources</StatLabel>
                      <StatNumber>{selectedProcess.aiAnalysis.identifiedResources}</StatNumber>
                    </Stat>
                  </SimpleGrid>

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Optimization Suggestions</Text>
                    <VStack spacing={2} align="stretch">
                      {selectedProcess.aiAnalysis.suggestedOptimizations.map((opt, index) => (
                        <Box key={index} p={3} bg="blue.50" borderRadius="md" borderWidth="1px" borderColor="blue.200">
                          <HStack justify="space-between" mb={1}>
                            <Badge colorScheme={
                              opt.type === 'automation' ? 'purple' :
                              opt.type === 'cost_reduction' ? 'green' :
                              opt.type === 'time_saving' ? 'blue' : 'orange'
                            }>
                              {opt.type.replace('_', ' ')}
                            </Badge>
                            <Badge colorScheme={opt.impact === 'high' ? 'red' : opt.impact === 'medium' ? 'orange' : 'green'}>
                              {opt.impact} impact
                            </Badge>
                          </HStack>
                          <Text fontSize="sm">{opt.description}</Text>
                          <HStack mt={2} spacing={4}>
                            <Text fontSize="xs" color="gray.600">ROI: {opt.roi}x</Text>
                            <Text fontSize="xs" color="gray.600">Timeline: {opt.timeline}</Text>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Automation Opportunities</Text>
                    <VStack spacing={2} align="stretch">
                      {selectedProcess.aiAnalysis.automationOpportunities.map((auto, index) => (
                        <Box key={index} p={3} bg="purple.50" borderRadius="md" borderWidth="1px" borderColor="purple.200">
                          <HStack justify="space-between" mb={1}>
                            <Badge colorScheme="purple">{auto.automationType.toUpperCase()}</Badge>
                            <Text fontSize="sm" fontWeight="semibold">${auto.savings.toLocaleString()} savings</Text>
                          </HStack>
                          <Text fontSize="sm">{auto.description}</Text>
                          <Progress value={auto.feasibility} colorScheme="purple" size="sm" mt={2} />
                          <Text fontSize="xs" color="gray.600">Feasibility: {auto.feasibility}%</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Industry Benchmark</Text>
                    <Box p={3} bg="gray.50" borderRadius="md">
                      <SimpleGrid columns={2} spacing={2}>
                        <Box>
                          <Text fontSize="xs" color="gray.500">Industry</Text>
                          <Text fontSize="sm">{selectedProcess.aiAnalysis.benchmarkComparison.industry}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color="gray.500">Your Ranking</Text>
                          <Text fontSize="sm">#{selectedProcess.aiAnalysis.benchmarkComparison.ranking}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color="gray.500">Avg Cycle Time</Text>
                          <Text fontSize="sm">{selectedProcess.aiAnalysis.benchmarkComparison.avgCycleTime}h</Text>
                        </Box>
                        <Box>
                          <Text fontSize="xs" color="gray.500">Avg Cost</Text>
                          <Text fontSize="sm">${selectedProcess.aiAnalysis.benchmarkComparison.avgCost}</Text>
                        </Box>
                      </SimpleGrid>
                    </Box>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Lean Analysis Results */}
          {selectedProcess.leanAnalysis && (
            <Card bg={cardBg}>
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">📊 Lean Analysis Results</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <SimpleGrid columns={2} spacing={4}>
                    <Stat>
                      <StatLabel>Value Added Ratio</StatLabel>
                      <StatNumber>{selectedProcess.leanAnalysis.valueAddedRatio}%</StatNumber>
                      <StatHelpText>Target: 80%</StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Process Efficiency</StatLabel>
                      <StatNumber>{selectedProcess.leanAnalysis.efficiency}%</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        12% improvement potential
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Waste Identification</Text>
                    <VStack spacing={2} align="stretch">
                      {selectedProcess.leanAnalysis.wasteIdentification.map((waste, index) => (
                        <Box key={index} p={3} bg="red.50" borderRadius="md" borderWidth="1px" borderColor="red.200">
                          <HStack justify="space-between" mb={1}>
                            <Badge colorScheme="red">{waste.type}</Badge>
                            <Badge colorScheme={
                              waste.severity === 'critical' ? 'red' :
                              waste.severity === 'high' ? 'orange' :
                              waste.severity === 'medium' ? 'yellow' : 'green'
                            }>
                              {waste.severity}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm">{waste.description}</Text>
                          <Text fontSize="xs" color="gray.600" mt={1}>
                            Impact: {waste.impact}% | Cost: ${waste.costImpact.toLocaleString()}
                          </Text>
                          <Box mt={2}>
                            <Text fontSize="xs" fontWeight="semibold">Suggested Actions:</Text>
                            <List spacing={1}>
                              {waste.suggestedActions.map((action, actionIndex) => (
                                <ListItem key={actionIndex} fontSize="xs">
                                  <ListIcon as={CheckIcon} color="green.500" />
                                  {action}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Improvement Opportunities</Text>
                    <VStack spacing={2} align="stretch">
                      {selectedProcess.leanAnalysis.improvements.map((improvement, index) => (
                        <Box key={index} p={3} bg="green.50" borderRadius="md" borderWidth="1px" borderColor="green.200">
                          <HStack justify="space-between" mb={1}>
                            <Text fontSize="sm" fontWeight="semibold">{improvement.area}</Text>
                            <Text fontSize="sm" color="green.600">
                              ${improvement.savings.toLocaleString()} savings
                            </Text>
                          </HStack>
                          <HStack spacing={4} mb={2}>
                            <Text fontSize="xs">Current: {improvement.current}</Text>
                            <Text fontSize="xs">Target: {improvement.target}</Text>
                            <Text fontSize="xs">Timeline: {improvement.timeline}</Text>
                          </HStack>
                          <Box>
                            <Text fontSize="xs" fontWeight="semibold">Action Plan:</Text>
                            <List spacing={1}>
                              {improvement.actions.map((action, actionIndex) => (
                                <ListItem key={actionIndex} fontSize="xs">
                                  <ListIcon as={ArrowForwardIcon} color="green.500" />
                                  {action}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Bottleneck Analysis Results */}
          {selectedProcess.bottleneckAnalysis && (
            <Card bg={cardBg}>
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">🔍 Bottleneck Analysis Results</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Throughput Metrics</Text>
                    <SimpleGrid columns={2} spacing={4}>
                      <Stat>
                        <StatLabel>Current Throughput</StatLabel>
                        <StatNumber>{selectedProcess.bottleneckAnalysis.throughputMetrics.current}</StatNumber>
                        <StatHelpText>units/hour</StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Theoretical Max</StatLabel>
                        <StatNumber>{selectedProcess.bottleneckAnalysis.throughputMetrics.theoretical}</StatNumber>
                        <StatHelpText>
                          {selectedProcess.bottleneckAnalysis.throughputMetrics.improvementPotential}% improvement potential
                        </StatHelpText>
                      </Stat>
                    </SimpleGrid>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Critical Bottlenecks</Text>
                    <VStack spacing={2} align="stretch">
                      {selectedProcess.bottleneckAnalysis.bottleneckSteps
                        .filter(step => step.severity === 'critical' || step.severity === 'high')
                        .map((step, index) => (
                          <Box key={index} p={3} bg="orange.50" borderRadius="md" borderWidth="1px" borderColor="orange.200">
                            <HStack justify="space-between" mb={1}>
                              <Text fontSize="sm" fontWeight="semibold">{step.stepName}</Text>
                              <Badge colorScheme={
                                step.severity === 'critical' ? 'red' :
                                step.severity === 'high' ? 'orange' :
                                step.severity === 'medium' ? 'yellow' : 'green'
                              }>
                                {step.severity}
                              </Badge>
                            </HStack>
                            <SimpleGrid columns={3} spacing={2} mb={2}>
                              <Box>
                                <Text fontSize="xs" color="gray.500">Utilization</Text>
                                <Text fontSize="sm">{Math.round(step.utilization)}%</Text>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="gray.500">Queue Length</Text>
                                <Text fontSize="sm">{Math.round(step.queueLength)}</Text>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="gray.500">Delay Impact</Text>
                                <Text fontSize="sm">{Math.round(step.impact.delayMinutes)}min</Text>
                              </Box>
                            </SimpleGrid>
                            <Box>
                              <Text fontSize="xs" fontWeight="semibold">Root Causes:</Text>
                              <List spacing={1}>
                                {step.rootCauses.slice(0, 2).map((cause, causeIndex) => (
                                  <ListItem key={causeIndex} fontSize="xs">
                                    <ListIcon as={WarningIcon} color="orange.500" />
                                    {cause}
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                            {step.solutions.length > 0 && (
                              <Box mt={2}>
                                <Text fontSize="xs" fontWeight="semibold">Recommended Solution:</Text>
                                <Box p={2} bg="white" borderRadius="sm">
                                  <Text fontSize="xs">{step.solutions[0].description}</Text>
                                  <HStack spacing={4} mt={1}>
                                    <Text fontSize="xs" color="gray.600">Cost: ${step.solutions[0].cost.toLocaleString()}</Text>
                                    <Text fontSize="xs" color="gray.600">Timeline: {step.solutions[0].timeToImplement}</Text>
                                    <Text fontSize="xs" color="green.600">
                                      +{step.solutions[0].expectedImprovement}% improvement
                                    </Text>
                                  </HStack>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        ))}
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Resource Optimization</Text>
                    <VStack spacing={2} align="stretch">
                      {selectedProcess.bottleneckAnalysis.resourceOptimization.map((resource, index) => (
                        <Box key={index} p={3} bg="blue.50" borderRadius="md" borderWidth="1px" borderColor="blue.200">
                          <HStack justify="space-between" mb={1}>
                            <Text fontSize="sm" fontWeight="semibold">Resource #{resource.resourceId}</Text>
                            <Text fontSize="sm" color="green.600">
                              ${resource.savingsOpportunity.toLocaleString()} savings
                            </Text>
                          </HStack>
                          <HStack spacing={4}>
                            <Text fontSize="xs">Current: {resource.currentAllocation}%</Text>
                            <Text fontSize="xs">Optimal: {resource.optimalAllocation}%</Text>
                          </HStack>
                          <Text fontSize="xs" mt={1}>{resource.reallocationSuggestion}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          )}
        </Grid>
      ) : (
        <Card bg={cardBg}>
          <CardBody textAlign="center" py={10}>
            <VStack spacing={4}>
              <Text fontSize="6xl">🤖</Text>
              <Text fontSize="xl" fontWeight="bold">Select a Process for AI Analysis</Text>
              <Text color="gray.500">Choose a process to unlock powerful AI-driven insights and optimizations</Text>
              <HStack spacing={4}>
                <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProcessOpen}>
                  Create Process
                </Button>
                <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={onNarrativeOpen}>
                  Analyze Narrative
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Narrative Analysis Card */}
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">📝 Process Narrative Analysis</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              Describe your process in natural language, and our AI will automatically extract steps, 
              identify resources, and create a structured process model.
            </Text>
            <Textarea
              placeholder="Example: When a customer calls with a complaint, the service representative first logs the issue in our CRM system, then escalates to a supervisor if the complaint involves a refund over $100..."
              value={narrativeInput}
              onChange={(e) => setNarrativeInput(e.target.value)}
              rows={6}
            />
            <HStack justify="space-between">
              <Text fontSize="xs" color="gray.500">
                {narrativeInput.length}/2000 characters
              </Text>
              <Button 
                colorScheme="purple" 
                onClick={handleAnalyzeNarrative}
                isLoading={aiProcessing}
                loadingText="Analyzing..."
                isDisabled={!narrativeInput.trim()}
              >
                🧠 Analyze Narrative
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  // Resources Panel with full functionality
  const ResourcesPanel = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">👥 Resource Management</Text>
        <HStack>
          <Button colorScheme="green" leftIcon={<AddIcon />} onClick={onResourceOpen}>
            Add Resource
          </Button>
          <Button colorScheme="blue" leftIcon={<DownloadIcon />}>
            Export Resources
          </Button>
        </HStack>
      </HStack>

      {/* Resource Statistics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <Stat>
          <StatLabel>Total Resources</StatLabel>
          <StatNumber>{resources.length}</StatNumber>
          <StatHelpText>Across all processes</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Human Resources</StatLabel>
          <StatNumber>{resources.filter(r => r.type === 'human').length}</StatNumber>
          <StatHelpText>Active personnel</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Avg Availability</StatLabel>
          <StatNumber>
            {resources.length > 0 ? Math.round(resources.reduce((acc, r) => acc + r.availability, 0) / resources.length) : 0}%
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            5% from last month
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Cost/Hour</StatLabel>
          <StatNumber>${resources.reduce((acc, r) => acc + r.cost, 0)}</StatNumber>
          <StatHelpText>Combined resource cost</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Resource Grid */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {resources.map((resource) => (
          <Card key={resource.id} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardHeader>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{resource.name}</Text>
                  <Badge colorScheme={
                    resource.type === 'human' ? 'blue' :
                    resource.type === 'system' ? 'purple' :
                    resource.type === 'material' ? 'orange' :
                    resource.type === 'data' ? 'green' : 'gray'
                  }>
                    {resource.type}
                  </Badge>
                </VStack>
                <IconButton
                  aria-label="Edit resource"
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    toast({
                      title: 'Edit Resource',
                      description: 'Resource editing functionality would open here',
                      status: 'info',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                />
              </HStack>
            </CardHeader>
            
            <CardBody pt={0}>
              <VStack align="stretch" spacing={3}>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Quantity</Text>
                    <Text fontSize="sm" fontWeight="semibold">{resource.quantity} {resource.unit}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Cost</Text>
                    <Text fontSize="sm" fontWeight="semibold">${resource.cost}/{resource.unit}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Availability</Text>
                    <Text fontSize="sm" fontWeight="semibold">{resource.availability}%</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Location</Text>
                    <Text fontSize="sm" fontWeight="semibold">{resource.location || 'N/A'}</Text>
                  </Box>
                </SimpleGrid>

                <Progress value={resource.availability} colorScheme="green" size="sm" />

                {resource.skills && resource.skills.length > 0 && (
                  <Box>
                    <Text fontSize="xs" color="gray.500" mb={1}>Skills</Text>
                    <HStack wrap="wrap" spacing={1}>
                      {resource.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} size="sm" variant="outline">
                          {skill}
                        </Badge>
                      ))}
                      {resource.skills.length > 3 && (
                        <Badge size="sm" variant="outline">
                          +{resource.skills.length - 3} more
                        </Badge>
                      )}
                    </HStack>
                  </Box>
                )}

                {resource.specifications && (
                  <Box>
                    <Text fontSize="xs" color="gray.500" mb={1}>Specifications</Text>
                    <Text fontSize="xs" noOfLines={2}>{resource.specifications}</Text>
                  </Box>
                )}

                <HStack spacing={2}>
                  <Button size="xs" colorScheme="blue" flex="1">
                    View Details
                  </Button>
                  <Button size="xs" colorScheme="green" flex="1">
                    Assign
                  </Button>
                  <IconButton
                    aria-label="Delete resource"
                    icon={<DeleteIcon />}
                    size="xs"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => {
                      setResources(prev => prev.filter(r => r.id !== resource.id));
                      toast({
                        title: 'Resource Deleted',
                        description: `${resource.name} has been removed`,
                        status: 'info',
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  />
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {resources.length === 0 && (
        <Card bg={cardBg}>
          <CardBody textAlign="center" py={10}>
            <VStack spacing={4}>
              <Text fontSize="6xl">👥</Text>
              <Text fontSize="xl" fontWeight="bold">No Resources Yet</Text>
              <Text color="gray.500">Add your first resource to start building your process team</Text>
              <Button colorScheme="green" leftIcon={<AddIcon />} onClick={onResourceOpen}>
                Add First Resource
              </Button>
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  return (
    <Box>
      {aiProcessing && (
        <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="blackAlpha.500" zIndex="9999" display="flex" alignItems="center" justifyContent="center">
          <Card bg={cardBg} p={8}>
            <VStack spacing={4}>
              <Spinner size="xl" colorScheme="blue" />
              <Text fontSize="lg" fontWeight="bold">AI Processing...</Text>
              <Text color="gray.500">Analyzing your process data</Text>
            </VStack>
          </Card>
        </Box>
      )}

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
            <ResourcesPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* All the detailed modals */}
      
      {/* New Process Modal */}
      <Modal isOpen={isNewProcessOpen} onClose={onNewProcessClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>🆕 Create New Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Process Name</FormLabel>
                <Input
                  value={newProcessForm.name}
                  onChange={(e) => setNewProcessForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter process name..."
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newProcessForm.description}
                  onChange={(e) => setNewProcessForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this process does..."
                  rows={3}
                />
              </FormControl>
              
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={newProcessForm.category}
                    onChange={(e) => setNewProcessForm(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select category...</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Quality">Quality Assurance</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Process Owner</FormLabel>
                  <Input
                    value={newProcessForm.owner}
                    onChange={(e) => setNewProcessForm(prev => ({ ...prev, owner: e.target.value }))}
                    placeholder="Owner name..."
                  />
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Business Value</FormLabel>
                <Textarea
                  value={newProcessForm.businessValue}
                  onChange={(e) => setNewProcessForm(prev => ({ ...prev, businessValue: e.target.value }))}
                  placeholder="What business value does this process provide?"
                  rows={2}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNewProcessClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreateProcess}>
              Create Process
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Narrative Analysis Modal */}
      <Modal isOpen={isNarrativeOpen} onClose={onNarrativeClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>📝 AI Narrative Analysis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">How it works</Text>
                  <Text fontSize="xs">
                    Describe your process in natural language. Our AI will extract steps, identify resources, 
                    and create a structured BPMN process automatically.
                  </Text>
                </VStack>
              </Alert>
              
              <FormControl>
                <FormLabel>Process Narrative</FormLabel>
                <Textarea
                  value={narrativeInput}
                  onChange={(e) => setNarrativeInput(e.target.value)}
                  placeholder="Example: When a customer calls with a complaint, the service representative first logs the issue in our CRM system. If the complaint involves a refund over $100, it must be escalated to a supervisor for approval. The supervisor reviews the case and either approves or denies the refund. If approved, the refund is processed through our payment system..."
                  rows={10}
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  {narrativeInput.length}/2000 characters
                </Text>
              </FormControl>
              
              <Box p={4} bg="blue.50" borderRadius="md">
                <Text fontSize="sm" fontWeight="semibold" mb={2}>💡 Tips for better results:</Text>
                <List spacing={1} fontSize="xs">
                  <ListItem>• Use clear, sequential language (first, then, next)</ListItem>
                  <ListItem>• Mention specific roles and responsibilities</ListItem>
                  <ListItem>• Include decision points and conditions</ListItem>
                  <ListItem>• Specify systems, tools, and resources used</ListItem>
                  <ListItem>• Include timing and approval requirements</ListItem>
                </List>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNarrativeClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="purple" 
              onClick={handleAnalyzeNarrative}
              isLoading={aiProcessing}
              loadingText="Analyzing..."
              isDisabled={!narrativeInput.trim()}
            >
              🧠 Analyze Process
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Resource Modal */}
      <Modal isOpen={isResourceOpen} onClose={onResourceClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>👤 Add New Resource</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Resource Name</FormLabel>
                  <Input
                    value={newResourceForm.name}
                    onChange={(e) => setNewResourceForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Customer Service Representative"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={newResourceForm.type}
                    onChange={(e) => setNewResourceForm(prev => ({ ...prev, type: e.target.value as any }))}
                  >
                    <option value="human">👤 Human</option>
                    <option value="system">💻 System</option>
                    <option value="material">📦 Material</option>
                    <option value="data">📊 Data</option>
                    <option value="document">📄 Document</option>
                    <option value="equipment">🔧 Equipment</option>
                    <option value="facility">🏢 Facility</option>
                  </Select>
                </FormControl>
              </HStack>
              
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    value={newResourceForm.quantity}
                    onChange={(_, num) => setNewResourceForm(prev => ({ ...prev, quantity: num || 1 }))}
                    min={1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Unit</FormLabel>
                  <Select
                    value={newResourceForm.unit}
                    onChange={(e) => setNewResourceForm(prev => ({ ...prev, unit: e.target.value }))}
                  >
                    <option value="hours">Hours</option>
                    <option value="FTE">FTE</option>
                    <option value="units">Units</option>
                    <option value="licenses">Licenses</option>
                    <option value="GB">GB</option>
                    <option value="each">Each</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Cost per Unit ($)</FormLabel>
                  <NumberInput
                    value={newResourceForm.cost}
                    onChange={(_, num) => setNewResourceForm(prev => ({ ...prev, cost: num || 0 }))}
                    min={0}
                    precision={2}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Availability (%)</FormLabel>
                <Slider
                  value={newResourceForm.availability}
                  onChange={(val) => setNewResourceForm(prev => ({ ...prev, availability: val }))}
                  min={0}
                  max={100}
                  step={5}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text fontSize="sm" color="gray.600">{newResourceForm.availability}%</Text>
              </FormControl>
              
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    value={newResourceForm.location}
                    onChange={(e) => setNewResourceForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Main Office, Cloud, Remote"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Contact Info</FormLabel>
                  <Input
                    value={newResourceForm.contactInfo}
                    onChange={(e) => setNewResourceForm(prev => ({ ...prev, contactInfo: e.target.value }))}
                    placeholder="e.g., email, phone, manager"
                  />
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Specifications/Notes</FormLabel>
                <Textarea
                  value={newResourceForm.specifications}
                  onChange={(e) => setNewResourceForm(prev => ({ ...prev, specifications: e.target.value }))}
                  placeholder="Additional details, requirements, or specifications..."
                  rows={2}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onResourceClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleAddResource}>
              Add Resource
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Swimlane Modal */}
      <Modal isOpen={isSwimlaneOpen} onClose={onSwimlaneClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>🏊 Add New Swimlane</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Swimlane Name</FormLabel>
                  <Input
                    value={newSwimlaneForm.name}
                    onChange={(e) => setNewSwimlaneForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Customer Service Team"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Primary Role</FormLabel>
                  <Input
                    value={newSwimlaneForm.role}
                    onChange={(e) => setNewSwimlaneForm(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g., Service Representative"
                  />
                </FormControl>
              </HStack>
              
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <Select
                    value={newSwimlaneForm.department}
                    onChange={(e) => setNewSwimlaneForm(prev => ({ ...prev, department: e.target.value }))}
                  >
                    <option value="">Select department...</option>
                    <option value="Customer Operations">Customer Operations</option>
                    <option value="Operations">Operations</option>
                    <option value="Finance">Finance</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Management">Management</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Color</FormLabel>
                  <Input
                    type="color"
                    value={newSwimlaneForm.color}
                    onChange={(e) => setNewSwimlaneForm(prev => ({ ...prev, color: e.target.value }))}
                    w="100px"
                  />
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Reporting Line</FormLabel>
                <Input
                  value={newSwimlaneForm.reportingLine}
                  onChange={(e) => setNewSwimlaneForm(prev => ({ ...prev, reportingLine: e.target.value }))}
                  placeholder="e.g., Customer Service Manager"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onSwimlaneClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddSwimlane}>
              Add Swimlane
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Export Modal */}
      <Modal isOpen={isExportOpen} onClose={onExportClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>📤 Export Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProcess && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold">Exporting: {selectedProcess.name}</Text>
                  <Text fontSize="xs" color="gray.500">v{selectedProcess.version}</Text>
                </Box>
                
                <Text fontSize="sm">Choose export format:</Text>
                
                <VStack spacing={2} align="stretch">
                  <Button 
                    leftIcon={<DownloadIcon />} 
                    justifyContent="flex-start"
                    onClick={() => {
                      handleExportProcess(selectedProcess, 'json');
                      onExportClose();
                    }}
                  >
                    JSON Format - Complete process data
                  </Button>
                  <Button 
                    leftIcon={<DownloadIcon />} 
                    justifyContent="flex-start"
                    onClick={() => {
                      handleExportProcess(selectedProcess, 'bpmn');
                      onExportClose();
                    }}
                  >
                    BPMN 2.0 - Standard process notation
                  </Button>
                  <Button 
                    leftIcon={<DownloadIcon />} 
                    justifyContent="flex-start"
                    onClick={() => {
                      handleExportProcess(selectedProcess, 'pdf');
                      onExportClose();
                    }}
                  >
                    PDF Report - Visual documentation
                  </Button>
                  <Button 
                    leftIcon={<DownloadIcon />} 
                    justifyContent="flex-start"
                    onClick={() => {
                      handleExportProcess(selectedProcess, 'excel');
                      onExportClose();
                    }}
                  >
                    Excel Spreadsheet - Data analysis
                  </Button>
                </VStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Process Analysis Drawer */}
      <Drawer isOpen={isAnalysisOpen} placement="right" onClose={onAnalysisClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            🔍 Process Analysis - {selectedProcess?.name}
          </DrawerHeader>
          
          <DrawerBody>
            {selectedProcess && (
              <VStack spacing={6} align="stretch">
                {/* Process Overview */}
                <Card>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">📊 Process Overview</Text>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={2} spacing={4}>
                      <Stat>
                        <StatLabel>Total Steps</StatLabel>
                        <StatNumber>{selectedProcess.steps.length}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>Total Duration</StatLabel>
                        <StatNumber>{selectedProcess.totalDuration}h</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>Total Cost</StatLabel>
                        <StatNumber>${selectedProcess.totalCost}</StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>Efficiency</StatLabel>
                        <StatNumber>{selectedProcess.efficiency}%</StatNumber>
                      </Stat>
                    </SimpleGrid>
                  </CardBody>
                </Card>

                {/* Analysis Actions */}
                <Card>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">🤖 AI Analysis Tools</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <Button 
                        colorScheme="blue" 
                        leftIcon={<ViewIcon />}
                        onClick={() => performAIAnalysis(selectedProcess)}
                        isLoading={aiProcessing}
                        loadingText="Analyzing..."
                      >
                        🧠 Comprehensive AI Analysis
                      </Button>
                      <Button 
                        colorScheme="green" 
                        leftIcon={<StarIcon />}
                        onClick={() => performLeanAnalysis(selectedProcess)}
                        isLoading={aiProcessing}
                        loadingText="Analyzing..."
                      >
                        📊 Lean Process Analysis
                      </Button>
                      <Button 
                        colorScheme="orange" 
                        leftIcon={<WarningIcon />}
                        onClick={() => performBottleneckAnalysis(selectedProcess)}
                        isLoading={aiProcessing}
                        loadingText="Analyzing..."
                      >
                        🔍 Bottleneck Analysis
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Process Steps */}
                <Card>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">📋 Process Steps</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      {selectedProcess.steps.map((step, index) => (
                        <Box key={step.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm" fontWeight="semibold">
                              {index + 1}. {step.name}
                            </Text>
                            <Badge colorScheme={
                              step.status === 'completed' ? 'green' :
                              step.status === 'in_progress' ? 'blue' :
                              step.status === 'blocked' ? 'red' : 'gray'
                            }>
                              {step.status}
                            </Badge>
                          </HStack>
                          <Text fontSize="xs" color="gray.600" mb={2}>{step.description}</Text>
                          <HStack spacing={4} fontSize="xs">
                            <Text>Duration: {step.duration}h</Text>
                            <Text>Cost: ${step.cost}</Text>
                            <Text>Resources: {step.resources.length}</Text>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Enhanced Step Detail Modal with Narratives and Collaboration */}
      <Modal isOpen={isStepDetailOpen} onClose={onStepDetailClose} size="6xl">
        <ModalOverlay bg="blackAlpha.500" />
        <ModalContent maxH="90vh">
          <ModalHeader>
            <HStack spacing={3}>
              <Text fontSize="2xl">
                {selectedStep?.type === 'start' ? '🟢' :
                 selectedStep?.type === 'task' ? '📋' :
                 selectedStep?.type === 'decision' ? '💎' :
                 selectedStep?.type === 'subprocess' ? '📦' :
                 selectedStep?.type === 'gateway' ? '⚡' :
                 selectedStep?.type === 'end' ? '🔴' : '❓'}
              </Text>
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold">{selectedStep?.name || 'Process Step'}</Text>
                <HStack spacing={2}>
                  <Badge colorScheme={
                    selectedStep?.status === 'completed' ? 'green' :
                    selectedStep?.status === 'in_progress' ? 'blue' :
                    selectedStep?.status === 'blocked' ? 'red' : 'gray'
                  }>
                    {selectedStep?.status?.replace('_', ' ') || 'not started'}
                  </Badge>
                  <Badge colorScheme={
                    selectedStep?.priority === 'critical' ? 'red' :
                    selectedStep?.priority === 'high' ? 'orange' :
                    selectedStep?.priority === 'medium' ? 'yellow' : 'green'
                  }>
                    {selectedStep?.priority || 'medium'} priority
                  </Badge>
                  <Badge variant="outline">{selectedStep?.type || 'task'}</Badge>
                </HStack>
              </VStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>📋 Overview</Tab>
                <Tab>📖 Narrative</Tab>
                <Tab>👥 Collaboration</Tab>
                <Tab>📊 Analytics</Tab>
              </TabList>
              
              <TabPanels>
                {/* Overview Tab */}
                <TabPanel>
                  <Grid templateColumns="1fr 300px" gap={6}>
                    <VStack spacing={4} align="stretch">
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">📋 Step Details</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4} align="stretch">
                            <FormControl>
                              <FormLabel>Step Name</FormLabel>
                              <Input 
                                value={selectedStep?.name || ''} 
                                placeholder="Enter step name..."
                                onChange={(e) => {
                                  if (selectedStep) {
                                    setSelectedStep({...selectedStep, name: e.target.value});
                                  }
                                }}
                              />
                            </FormControl>
                            
                            <FormControl>
                              <FormLabel>Description</FormLabel>
                              <Textarea 
                                value={selectedStep?.description || ''} 
                                placeholder="Describe what this step does..."
                                rows={3}
                                onChange={(e) => {
                                  if (selectedStep) {
                                    setSelectedStep({...selectedStep, description: e.target.value});
                                  }
                                }}
                              />
                            </FormControl>
                            
                            <HStack spacing={4}>
                              <FormControl>
                                <FormLabel>Assignee</FormLabel>
                                <Input value={selectedStep?.assignee || 'Unassigned'} />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Duration (hours)</FormLabel>
                                <Input type="number" value={selectedStep?.duration || 1} />
                              </FormControl>
                              <FormControl>
                                <FormLabel>Cost ($)</FormLabel>
                                <Input type="number" value={selectedStep?.cost || 50} />
                              </FormControl>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    </VStack>
                    
                    <VStack spacing={4} align="stretch">
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">⚙️ Properties</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={3} align="stretch">
                            <FormControl>
                              <FormLabel fontSize="sm">Status</FormLabel>
                              <Select size="sm" value={selectedStep?.status || 'not_started'}>
                                <option value="not_started">Not Started</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="blocked">Blocked</option>
                                <option value="on_hold">On Hold</option>
                              </Select>
                            </FormControl>
                            
                            <FormControl>
                              <FormLabel fontSize="sm">Priority</FormLabel>
                              <Select size="sm" value={selectedStep?.priority || 'medium'}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                              </Select>
                            </FormControl>
                            
                            <Box>
                              <Text fontSize="sm" mb={2}>Automation Level: {selectedStep?.automationLevel || 0}%</Text>
                              <Progress value={selectedStep?.automationLevel || 0} colorScheme="blue" />
                            </Box>
                          </VStack>
                        </CardBody>
                      </Card>
                    </VStack>
                  </Grid>
                </TabPanel>
                
                {/* Enhanced Narrative Tab */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Alert status="info" borderRadius="md">
                      <AlertIcon />
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">Step Narrative & Documentation</Text>
                        <Text fontSize="xs">
                          Provide a comprehensive description including purpose, execution details, decision criteria, and business context.
                        </Text>
                      </VStack>
                    </Alert>
                    
                    <Grid templateColumns="1fr 300px" gap={6}>
                      <FormControl>
                        <FormLabel>📖 Detailed Narrative</FormLabel>
                        <Textarea
                          value={selectedStep?.narrative || ''}
                          onChange={(e) => {
                            if (selectedStep) {
                              setSelectedStep({...selectedStep, narrative: e.target.value});
                            }
                          }}
                          placeholder={`Describe this ${selectedStep?.type || 'step'} in detail...

Example structure:
• Purpose: What does this step accomplish?
• Input: What information/resources are required?
• Process: How is the work performed?
• Decision Points: What choices or validations occur?
• Output: What results or deliverables are produced?
• Success Criteria: How do we know it's completed?
• Business Context: Why is this important?`}
                          rows={15}
                          resize="vertical"
                        />
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          {(selectedStep?.narrative || '').length}/5000 characters
                        </Text>
                      </FormControl>
                      
                      <VStack spacing={4} align="stretch">
                        <Card>
                          <CardHeader pb={2}>
                            <Text fontWeight="bold" fontSize="sm">📝 Documentation Checklist</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="stretch" spacing={2}>
                              {[
                                { item: 'Step purpose defined', checked: (selectedStep?.narrative || '').toLowerCase().includes('purpose') },
                                { item: 'Input requirements listed', checked: (selectedStep?.narrative || '').toLowerCase().includes('input') },
                                { item: 'Process details described', checked: (selectedStep?.narrative || '').toLowerCase().includes('process') },
                                { item: 'Output/deliverables defined', checked: (selectedStep?.narrative || '').toLowerCase().includes('output') },
                                { item: 'Success criteria established', checked: (selectedStep?.narrative || '').toLowerCase().includes('success') },
                                { item: 'Business context provided', checked: (selectedStep?.narrative || '').toLowerCase().includes('business') }
                              ].map((check, index) => (
                                <HStack key={index} spacing={2}>
                                  <CheckIcon 
                                    color={check.checked ? 'green.500' : 'gray.300'} 
                                    boxSize={3} 
                                  />
                                  <Text 
                                    fontSize="xs" 
                                    color={check.checked ? 'green.600' : 'gray.500'}
                                  >
                                    {check.item}
                                  </Text>
                                </HStack>
                              ))}
                            </VStack>
                          </CardBody>
                        </Card>
                        
                        <Card bg="blue.50">
                          <CardHeader pb={2}>
                            <Text fontWeight="bold" fontSize="sm">🤖 AI Suggestions</Text>
                          </CardHeader>
                          <CardBody pt={0}>
                            <Text fontSize="sm" color="gray.700">
                              <strong>Purpose:</strong> This {selectedStep?.type || 'step'} serves as {selectedStep?.type === 'start' ? 'the entry point' : selectedStep?.type === 'decision' ? 'a critical decision gateway' : 'a key operational task'}.
                              <br/><br/>
                              <strong>Execution:</strong> Typically takes {selectedStep?.duration || 1} hours and costs ${selectedStep?.cost || 50}.
                              <br/><br/>
                              <strong>Business Value:</strong> Ensures quality deliverable production while maintaining efficiency.
                            </Text>
                          </CardBody>
                        </Card>
                      </VStack>
                    </Grid>
                  </VStack>
                </TabPanel>
                
                {/* Collaboration Tab */}
                <TabPanel>
                  <Grid templateColumns="1fr 300px" gap={6}>
                    <VStack spacing={4} align="stretch">
                      <Card>
                        <CardHeader>
                          <HStack justify="space-between">
                            <Text fontWeight="bold">💬 Discussion & Comments</Text>
                            <Badge colorScheme="blue">2 active threads</Badge>
                          </HStack>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4} align="stretch">
                            {/* Sample Comments */}
                            <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
                              <HStack spacing={3} align="start">
                                <Text fontSize="2xl">👩‍💼</Text>
                                <VStack align="start" spacing={1} flex="1">
                                  <HStack spacing={2}>
                                    <Text fontSize="sm" fontWeight="semibold">Sarah Johnson</Text>
                                    <Badge size="sm" variant="outline">Process Owner</Badge>
                                    <Text fontSize="xs" color="gray.500">2 hours ago</Text>
                                  </HStack>
                                  <Text fontSize="sm">The automation level for this step should be increased. We have the technology in place to reduce manual intervention.</Text>
                                  <HStack spacing={4} fontSize="xs">
                                    <Button size="xs" variant="ghost">Reply (1)</Button>
                                    <Button size="xs" variant="ghost">Like</Button>
                                  </HStack>
                                </VStack>
                              </HStack>
                            </Box>
                            
                            <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
                              <HStack spacing={3} align="start">
                                <Text fontSize="2xl">👨‍💻</Text>
                                <VStack align="start" spacing={1} flex="1">
                                  <HStack spacing={2}>
                                    <Text fontSize="sm" fontWeight="semibold">Mike Chen</Text>
                                    <Badge size="sm" variant="outline">Business Analyst</Badge>
                                    <Text fontSize="xs" color="gray.500">1 day ago</Text>
                                  </HStack>
                                  <Text fontSize="sm">I recommend adding a quality gate here. The current process allows errors to propagate downstream.</Text>
                                  <HStack spacing={4} fontSize="xs">
                                    <Button size="xs" variant="ghost">Reply</Button>
                                    <Button size="xs" variant="ghost">Like</Button>
                                  </HStack>
                                </VStack>
                              </HStack>
                            </Box>
                            
                            {/* New Comment Input */}
                            <Box p={4} border="2px dashed" borderColor="gray.200" borderRadius="md">
                              <VStack spacing={3} align="stretch">
                                <HStack>
                                  <Text fontSize="2xl">👤</Text>
                                  <Text fontSize="sm" fontWeight="semibold">Add Comment</Text>
                                </HStack>
                                <Textarea
                                  placeholder="Share your insights, suggestions, or questions about this step..."
                                  rows={3}
                                />
                                <HStack justify="space-between">
                                  <Button size="xs" variant="outline">@Mention</Button>
                                  <Button size="sm" colorScheme="blue">Post Comment</Button>
                                </HStack>
                              </VStack>
                            </Box>
                          </VStack>
                        </CardBody>
                      </Card>
                    </VStack>
                    
                    <VStack spacing={4} align="stretch">
                      <Card>
                        <CardHeader pb={2}>
                          <Text fontWeight="bold" fontSize="sm">👥 Team Members</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={3}>
                            {[
                              { name: 'Sarah Johnson', role: 'Process Owner', avatar: '👩‍💼', status: 'online' },
                              { name: 'Mike Chen', role: 'Business Analyst', avatar: '👨‍💻', status: 'online' },
                              { name: 'Lisa Rodriguez', role: 'Quality Manager', avatar: '👩‍🔬', status: 'away' },
                            ].map((member, index) => (
                              <HStack key={index} spacing={3} w="full">
                                <Box position="relative">
                                  <Text fontSize="lg">{member.avatar}</Text>
                                  <Box
                                    position="absolute"
                                    bottom="-1px"
                                    right="-1px"
                                    w="3"
                                    h="3"
                                    borderRadius="full"
                                    bg={member.status === 'online' ? 'green.400' : 'yellow.400'}
                                    border="1px solid white"
                                  />
                                </Box>
                                <VStack align="start" spacing={0} flex="1">
                                  <Text fontSize="sm" fontWeight="semibold">{member.name}</Text>
                                  <Text fontSize="xs" color="gray.500">{member.role}</Text>
                                </VStack>
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                      
                      <Card>
                        <CardHeader pb={2}>
                          <Text fontWeight="bold" fontSize="sm">🕐 Recent Activity</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            {[
                              { action: 'Updated narrative', user: 'You', time: '5 mins ago', icon: '📝' },
                              { action: 'Changed assignee', user: 'Sarah J.', time: '1 hour ago', icon: '👤' },
                              { action: 'Added comment', user: 'Mike C.', time: '2 hours ago', icon: '💬' },
                            ].map((activity, index) => (
                              <HStack key={index} spacing={3}>
                                <Text>{activity.icon}</Text>
                                <VStack align="start" spacing={0} flex="1">
                                  <Text fontSize="xs">{activity.action}</Text>
                                  <Text fontSize="xs" color="gray.500">by {activity.user} • {activity.time}</Text>
                                </VStack>
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    </VStack>
                  </Grid>
                </TabPanel>
                
                {/* Analytics Tab */}
                <TabPanel>
                  <SimpleGrid columns={2} spacing={6}>
                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">📊 Performance Metrics</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          <Box>
                            <HStack justify="space-between" mb={2}>
                              <Text fontSize="sm">Completion Rate</Text>
                              <Text fontSize="sm" fontWeight="bold">94%</Text>
                            </HStack>
                            <Progress value={94} colorScheme="green" />
                          </Box>
                          <Box>
                            <HStack justify="space-between" mb={2}>
                              <Text fontSize="sm">Average Duration</Text>
                              <Text fontSize="sm" fontWeight="bold">{selectedStep?.duration || 1}h</Text>
                            </HStack>
                            <Progress value={75} colorScheme="blue" />
                          </Box>
                          <Box>
                            <HStack justify="space-between" mb={2}>
                              <Text fontSize="sm">Quality Score</Text>
                              <Text fontSize="sm" fontWeight="bold">87%</Text>
                            </HStack>
                            <Progress value={87} colorScheme="purple" />
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">🎯 Optimization Opportunities</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <Alert status="info" size="sm">
                            <AlertIcon />
                            <VStack align="start" spacing={0}>
                              <Text fontSize="xs" fontWeight="semibold">Automation Opportunity</Text>
                              <Text fontSize="xs">This step could be 95% automated</Text>
                            </VStack>
                          </Alert>
                          <Alert status="warning" size="sm">
                            <AlertIcon />
                            <VStack align="start" spacing={0}>
                              <Text fontSize="xs" fontWeight="semibold">Duration Alert</Text>
                              <Text fontSize="xs">Average time exceeds target by 23%</Text>
                            </VStack>
                          </Alert>
                          <Alert status="success" size="sm">
                            <AlertIcon />
                            <VStack align="start" spacing={0}>
                              <Text fontSize="xs" fontWeight="semibold">Quality Excellence</Text>
                              <Text fontSize="xs">Consistently meets quality standards</Text>
                            </VStack>
                          </Alert>
                        </VStack>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          
          <ModalFooter>
            <HStack spacing={3}>
              <Button variant="ghost" onClick={onStepDetailClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={() => {
                // Save step changes
                if (selectedStep && selectedProcess) {
                  const updatedSteps = selectedProcess.steps.map((step: any) =>
                    step.id === selectedStep.id ? selectedStep : step
                  );
                  const updatedProcess = { ...selectedProcess, steps: updatedSteps };
                  setSelectedProcess(updatedProcess);
                  setProcesses((prev: any) => prev.map((p: any) => p.id === selectedProcess.id ? updatedProcess : p));
                  
                  toast({
                    title: 'Step Updated',
                    description: 'All changes have been saved successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }
                onStepDetailClose();
              }}>
                Save & Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Import Modal */}
      <Modal isOpen={isImportOpen} onClose={onImportClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>📥 Import Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm">Import a process from a previously exported file</Text>
              
              <Box
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
                p={8}
                textAlign="center"
                cursor="pointer"
                _hover={{ borderColor: 'blue.400', bg: 'blue.50' }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.json';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      handleImportProcess(file);
                      onImportClose();
                    }
                  };
                  input.click();
                }}
              >
                <VStack spacing={2}>
                  <Text fontSize="4xl">📁</Text>
                  <Text fontSize="sm" fontWeight="semibold">Click to select file</Text>
                  <Text fontSize="xs" color="gray.500">Supports JSON format</Text>
                </VStack>
              </Box>
              
              <Alert status="info" size="sm">
                <AlertIcon />
                <Text fontSize="xs">
                  Imported processes will be added to your process library with a new ID
                </Text>
              </Alert>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProcessManagement;
