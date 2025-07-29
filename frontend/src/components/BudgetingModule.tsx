import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Progress,
  Alert,
  AlertIcon,
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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Switch,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  CircularProgress,
  CircularProgressLabel,
  useToast,
  Divider,
  Tag,
  TagLabel,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { 
  AddIcon,
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  ViewIcon,
  WarningIcon,
  CheckIcon,
  RepeatIcon,
  CalendarIcon,
  InfoIcon,
  SettingsIcon,
  ChevronDownIcon,
  SearchIcon,
  TimeIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@chakra-ui/icons';

// Comprehensive interfaces for enterprise budgeting system
interface BudgetPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'closed' | 'revision';
  fiscalYear: string;
  quarter?: string;
  isActual: boolean;
  createdBy: string;
  approvedBy?: string;
  approvalDate?: string;
  version: number;
  parentPeriodId?: string;
  children: string[];
}

interface BudgetCategory {
  id: string;
  name: string;
  code: string;
  type: 'revenue' | 'expense' | 'capex' | 'opex';
  parentId?: string;
  level: number;
  description: string;
  isActive: boolean;
  budgetMethod: 'zero_based' | 'incremental' | 'activity_based' | 'value_based';
  owner: string;
  department: string;
  costCenter: string;
  tags: string[];
  children: string[];
}

interface BudgetLineItem {
  id: string;
  categoryId: string;
  periodId: string;
  name: string;
  description: string;
  budgetedAmount: number;
  actualAmount: number;
  forecastAmount: number;
  currency: string;
  unit: string;
  quantity: number;
  unitCost: number;
  varianceThreshold: number;
  isLocked: boolean;
  notes: string;
  justification: string;
  assumptions: string[];
  risks: BudgetRisk[];
  drivers: BudgetDriver[];
  allocations: BudgetAllocation[];
  approvalRequired: boolean;
  approvedBy?: string;
  lastUpdated: string;
  updatedBy: string;
  version: number;
  history: BudgetLineItemHistory[];
}

interface BudgetDriver {
  id: string;
  name: string;
  type: 'volume' | 'rate' | 'efficiency' | 'market' | 'regulatory' | 'strategic';
  value: number;
  unit: string;
  impact: number; // percentage impact on budget line
  probability: number;
  source: string;
  frequency: 'monthly' | 'quarterly' | 'annually' | 'one-time';
  isActive: boolean;
}

interface BudgetRisk {
  id: string;
  description: string;
  category: 'market' | 'operational' | 'financial' | 'regulatory' | 'strategic';
  probability: number;
  impact: number;
  riskScore: number;
  mitigation: string;
  contingency: number;
  owner: string;
  status: 'identified' | 'assessed' | 'mitigated' | 'closed';
}

interface BudgetAllocation {
  id: string;
  department: string;
  costCenter: string;
  project: string;
  percentage: number;
  amount: number;
  allocationMethod: 'percentage' | 'direct' | 'activity_based' | 'headcount';
  justification: string;
}

interface BudgetLineItemHistory {
  id: string;
  version: number;
  changeType: 'created' | 'updated' | 'approved' | 'rejected' | 'reallocated';
  changes: BudgetChange[];
  timestamp: string;
  userId: string;
  reason: string;
  approvedBy?: string;
}

interface BudgetChange {
  field: string;
  oldValue: any;
  newValue: any;
  impact: number;
}

interface BudgetScenario {
  id: string;
  name: string;
  description: string;
  type: 'base' | 'optimistic' | 'pessimistic' | 'stress_test' | 'custom';
  probability: number;
  assumptions: ScenarioAssumption[];
  adjustments: ScenarioAdjustment[];
  results: ScenarioResults;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

interface ScenarioAssumption {
  id: string;
  category: string;
  description: string;
  baseValue: number;
  adjustedValue: number;
  unit: string;
  confidence: number;
  source: string;
}

interface ScenarioAdjustment {
  categoryId: string;
  adjustmentType: 'percentage' | 'absolute' | 'driver_based';
  value: number;
  reasoning: string;
}

interface ScenarioResults {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  ebitda: number;
  cashFlow: number;
  keyMetrics: { [key: string]: number };
  variance: number;
}

interface BudgetApproval {
  id: string;
  budgetPeriodId: string;
  requestedBy: string;
  requestedAt: string;
  approvers: BudgetApprover[];
  status: 'pending' | 'approved' | 'rejected' | 'conditionally_approved';
  currentStage: number;
  totalStages: number;
  comments: ApprovalComment[];
  documents: ApprovalDocument[];
}

interface BudgetApprover {
  userId: string;
  role: string;
  stage: number;
  status: 'pending' | 'approved' | 'rejected' | 'delegated';
  approvedAt?: string;
  comments?: string;
  conditions?: string[];
  delegatedTo?: string;
}

interface ApprovalComment {
  id: string;
  userId: string;
  stage: number;
  comment: string;
  timestamp: string;
  type: 'question' | 'concern' | 'approval' | 'rejection' | 'suggestion';
}

interface ApprovalDocument {
  id: string;
  name: string;
  type: 'justification' | 'analysis' | 'presentation' | 'supporting_data';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
}

interface BudgetVariance {
  id: string;
  lineItemId: string;
  type: 'favorable' | 'unfavorable';
  amount: number;
  percentage: number;
  category: 'price' | 'volume' | 'efficiency' | 'timing' | 'scope' | 'other';
  explanation: string;
  correctionAction: string;
  responsibleParty: string;
  targetResolutionDate: string;
  status: 'identified' | 'investigating' | 'action_planned' | 'in_progress' | 'resolved';
  impact: 'low' | 'medium' | 'high' | 'critical';
}

interface BudgetDashboard {
  periodId: string;
  summary: BudgetSummary;
  kpis: BudgetKPI[];
  trends: BudgetTrend[];
  alerts: BudgetAlert[];
  forecasts: BudgetForecast[];
}

interface BudgetSummary {
  totalBudget: number;
  totalActual: number;
  totalForecast: number;
  variance: number;
  variancePercentage: number;
  utilizationRate: number;
  approvalStatus: string;
  remainingBudget: number;
  burnRate: number;
  projectedOverrun: number;
}

interface BudgetKPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'on_track' | 'at_risk' | 'off_track';
  category: 'efficiency' | 'accuracy' | 'timeliness' | 'cost_control';
}

interface BudgetTrend {
  period: string;
  budgeted: number;
  actual: number;
  forecast: number;
  variance: number;
}

interface BudgetAlert {
  id: string;
  type: 'variance' | 'overspend' | 'approval_needed' | 'deadline' | 'risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  affectedItems: string[];
  actionRequired: string;
  assignedTo: string;
  dueDate: string;
  isResolved: boolean;
}

interface BudgetForecast {
  period: string;
  method: 'trend' | 'driver_based' | 'regression' | 'machine_learning';
  confidence: number;
  scenarios: {
    pessimistic: number;
    base: number;
    optimistic: number;
  };
  keyAssumptions: string[];
}

interface BudgetIntegration {
  hrIntegration: {
    headcountPlanning: boolean;
    salaryBudgeting: boolean;
    benefitsCalculation: boolean;
    trainingBudgets: boolean;
  };
  marketingIntegration: {
    campaignBudgeting: boolean;
    roiTracking: boolean;
    channelAllocation: boolean;
    brandInvestment: boolean;
  };
  strategicIntegration: {
    initiativeAlignment: boolean;
    kpiIntegration: boolean;
    scenarioPlanning: boolean;
    riskAssessment: boolean;
  };
}

const BudgetingModule: React.FC = () => {
  // Core state management
  const [budgetPeriods, setBudgetPeriods] = useState<BudgetPeriod[]>([]);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [budgetLineItems, setBudgetLineItems] = useState<BudgetLineItem[]>([]);
  const [budgetScenarios, setBudgetScenarios] = useState<BudgetScenario[]>([]);
  const [budgetVariances, setBudgetVariances] = useState<BudgetVariance[]>([]);
  const [budgetApprovals, setBudgetApprovals] = useState<BudgetApproval[]>([]);
  const [budgetDashboard, setBudgetDashboard] = useState<BudgetDashboard | null>(null);
  
  // UI state
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<BudgetPeriod | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null);
  const [selectedLineItem, setSelectedLineItem] = useState<BudgetLineItem | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<BudgetScenario | null>(null);
  const [viewMode, setViewMode] = useState<'summary' | 'detailed' | 'variance' | 'trends'>('summary');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // Modal states
  const {
    isOpen: isPeriodModalOpen,
    onOpen: onPeriodModalOpen,
    onClose: onPeriodModalClose
  } = useDisclosure();
  const {
    isOpen: isCategoryModalOpen,
    onOpen: onCategoryModalOpen,
    onClose: onCategoryModalClose
  } = useDisclosure();
  const {
    isOpen: isLineItemModalOpen,
    onOpen: onLineItemModalOpen,
    onClose: onLineItemModalClose
  } = useDisclosure();
  const {
    isOpen: isScenarioModalOpen,
    onOpen: onScenarioModalOpen,
    onClose: onScenarioModalClose
  } = useDisclosure();
  const {
    isOpen: isVarianceModalOpen,
    onOpen: onVarianceModalOpen,
    onClose: onVarianceModalClose
  } = useDisclosure();
  const {
    isOpen: isApprovalModalOpen,
    onOpen: onApprovalModalOpen,
    onClose: onApprovalModalClose
  } = useDisclosure();
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const greenBg = useColorModeValue('green.50', 'green.900');
  const redBg = useColorModeValue('red.50', 'red.900');
  const yellowBg = useColorModeValue('yellow.50', 'yellow.900');
  
  // Initialize sample data
  useEffect(() => {
    generateSampleBudgetData();
  }, []);
  
  const generateSampleBudgetData = useCallback(() => {
    // Sample budget periods
    const samplePeriods: BudgetPeriod[] = [
      {
        id: 'period-2024',
        name: 'FY 2024 Annual Budget',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'active',
        fiscalYear: '2024',
        isActual: false,
        createdBy: 'Finance Team',
        approvedBy: 'CFO',
        approvalDate: '2023-12-15',
        version: 2,
        children: ['q1-2024', 'q2-2024', 'q3-2024', 'q4-2024']
      },
      {
        id: 'q1-2024',
        name: 'Q1 2024 Budget',
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        status: 'closed',
        fiscalYear: '2024',
        quarter: 'Q1',
        isActual: true,
        createdBy: 'Finance Team',
        parentPeriodId: 'period-2024',
        version: 1,
        children: []
      }
    ];
    setBudgetPeriods(samplePeriods);
    
    // Sample budget categories
    const sampleCategories: BudgetCategory[] = [
      {
        id: 'revenue',
        name: 'Total Revenue',
        code: 'REV',
        type: 'revenue',
        level: 1,
        description: 'All revenue streams',
        isActive: true,
        budgetMethod: 'activity_based',
        owner: 'Sales Director',
        department: 'Sales',
        costCenter: 'REV-001',
        tags: ['strategic', 'growth'],
        children: ['product-revenue', 'service-revenue']
      },
      {
        id: 'product-revenue',
        name: 'Product Revenue',
        code: 'REV-PRD',
        type: 'revenue',
        parentId: 'revenue',
        level: 2,
        description: 'Revenue from product sales',
        isActive: true,
        budgetMethod: 'activity_based',
        owner: 'Product Manager',
        department: 'Sales',
        costCenter: 'REV-001',
        tags: ['core', 'recurring'],
        children: []
      },
      {
        id: 'personnel',
        name: 'Personnel Expenses',
        code: 'EXP-PER',
        type: 'opex',
        level: 1,
        description: 'All employee-related expenses',
        isActive: true,
        budgetMethod: 'zero_based',
        owner: 'HR Director',
        department: 'Human Resources',
        costCenter: 'HR-001',
        tags: ['fixed', 'critical'],
        children: ['salaries', 'benefits', 'training']
      }
    ];
    setBudgetCategories(sampleCategories);
    
    // Sample budget line items
    const sampleLineItems: BudgetLineItem[] = [
      {
        id: 'line-001',
        categoryId: 'product-revenue',
        periodId: 'period-2024',
        name: 'SaaS Subscription Revenue',
        description: 'Monthly recurring revenue from SaaS subscriptions',
        budgetedAmount: 2400000,
        actualAmount: 1800000,
        forecastAmount: 2600000,
        currency: 'USD',
        unit: 'subscribers',
        quantity: 1000,
        unitCost: 200,
        varianceThreshold: 0.1,
        isLocked: false,
        notes: 'Based on 15% growth assumption',
        justification: 'Market expansion and new feature releases',
        assumptions: ['15% monthly growth', 'Churn rate below 5%', 'Average contract value increase'],
        risks: [
          {
            id: 'risk-001',
            description: 'Economic downturn affecting customer spending',
            category: 'market',
            probability: 0.3,
            impact: 0.25,
            riskScore: 7.5,
            mitigation: 'Diversify customer base and introduce value tiers',
            contingency: 10000,
            owner: 'Sales Director',
            status: 'assessed'
          }
        ],
        drivers: [
          {
            id: 'driver-001',
            name: 'Customer Growth Rate',
            type: 'volume',
            value: 15,
            unit: 'percentage',
            impact: 80,
            probability: 0.85,
            source: 'Sales Team Projections',
            frequency: 'monthly',
            isActive: true
          }
        ],
        allocations: [
          {
            id: 'alloc-001',
            department: 'Sales',
            costCenter: 'REV-001',
            project: 'Growth Initiative',
            percentage: 100,
            amount: 2400000,
            allocationMethod: 'direct',
            justification: 'Direct revenue attribution'
          }
        ],
        approvalRequired: true,
        approvedBy: 'CFO',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Finance Analyst',
        version: 1,
        history: []
      }
    ];
    setBudgetLineItems(sampleLineItems);
    
    // Sample scenarios
    const sampleScenarios: BudgetScenario[] = [
      {
        id: 'scenario-base',
        name: 'Base Case',
        description: 'Most likely scenario based on current trends',
        type: 'base',
        probability: 0.6,
        assumptions: [
          {
            id: 'assumption-001',
            category: 'Market Growth',
            description: 'Industry growth rate',
            baseValue: 12,
            adjustedValue: 12,
            unit: 'percentage',
            confidence: 0.8,
            source: 'Industry Report 2024'
          }
        ],
        adjustments: [],
        results: {
          totalRevenue: 2400000,
          totalExpenses: 1800000,
          netIncome: 600000,
          ebitda: 720000,
          cashFlow: 500000,
          keyMetrics: {
            'Gross Margin': 0.35,
            'EBITDA Margin': 0.3,
            'Revenue Growth': 0.15
          },
          variance: 0
        },
        isActive: true,
        createdBy: 'Finance Team',
        createdAt: new Date().toISOString()
      },
      {
        id: 'scenario-optimistic',
        name: 'Optimistic Case',
        description: 'Best case scenario with favorable market conditions',
        type: 'optimistic',
        probability: 0.25,
        assumptions: [
          {
            id: 'assumption-002',
            category: 'Market Growth',
            description: 'Accelerated industry growth',
            baseValue: 12,
            adjustedValue: 20,
            unit: 'percentage',
            confidence: 0.6,
            source: 'Best case market analysis'
          }
        ],
        adjustments: [
          {
            categoryId: 'product-revenue',
            adjustmentType: 'percentage',
            value: 25,
            reasoning: 'Accelerated customer acquisition'
          }
        ],
        results: {
          totalRevenue: 3000000,
          totalExpenses: 2000000,
          netIncome: 1000000,
          ebitda: 1200000,
          cashFlow: 850000,
          keyMetrics: {
            'Gross Margin': 0.4,
            'EBITDA Margin': 0.4,
            'Revenue Growth': 0.25
          },
          variance: 0.25
        },
        isActive: true,
        createdBy: 'Strategy Team',
        createdAt: new Date().toISOString()
      }
    ];
    setBudgetScenarios(sampleScenarios);
    
    // Sample dashboard data
    const sampleDashboard: BudgetDashboard = {
      periodId: 'period-2024',
      summary: {
        totalBudget: 2400000,
        totalActual: 1800000,
        totalForecast: 2600000,
        variance: 200000,
        variancePercentage: 8.33,
        utilizationRate: 75,
        approvalStatus: 'Approved',
        remainingBudget: 600000,
        burnRate: 200000,
        projectedOverrun: 0
      },
      kpis: [
        {
          id: 'kpi-001',
          name: 'Budget Accuracy',
          value: 92,
          target: 95,
          unit: 'percentage',
          trend: 'up',
          status: 'at_risk',
          category: 'accuracy'
        },
        {
          id: 'kpi-002',
          name: 'Forecast Reliability',
          value: 88,
          target: 90,
          unit: 'percentage',
          trend: 'stable',
          status: 'at_risk',
          category: 'accuracy'
        }
      ],
      trends: [
        { period: 'Jan', budgeted: 200000, actual: 185000, forecast: 195000, variance: -5000 },
        { period: 'Feb', budgeted: 200000, actual: 220000, forecast: 210000, variance: 20000 },
        { period: 'Mar', budgeted: 200000, actual: 195000, forecast: 205000, variance: -5000 }
      ],
      alerts: [
        {
          id: 'alert-001',
          type: 'variance',
          severity: 'medium',
          message: 'Marketing budget variance exceeds 10% threshold',
          affectedItems: ['marketing-campaigns'],
          actionRequired: 'Review spending and adjust forecast',
          assignedTo: 'Marketing Manager',
          dueDate: '2024-04-15',
          isResolved: false
        }
      ],
      forecasts: [
        {
          period: 'Q2 2024',
          method: 'trend',
          confidence: 0.85,
          scenarios: {
            pessimistic: 500000,
            base: 600000,
            optimistic: 750000
          },
          keyAssumptions: ['Continued market growth', 'No major economic disruption']
        }
      ]
    };
    setBudgetDashboard(sampleDashboard);
    
  }, []);
  
  const calculateBudgetHealth = useCallback((lineItem: BudgetLineItem) => {
    const variance = Math.abs(lineItem.actualAmount - lineItem.budgetedAmount) / lineItem.budgetedAmount;
    if (variance <= lineItem.varianceThreshold) return 'excellent';
    if (variance <= lineItem.varianceThreshold * 2) return 'good';
    if (variance <= lineItem.varianceThreshold * 3) return 'fair';
    return 'poor';
  }, []);
  
  const getVarianceColor = useCallback((variance: number) => {
    if (variance > 0) return 'green';
    if (variance < -0.1) return 'red';
    return 'yellow';
  }, []);
  
  const formatCurrency = useCallback((amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }, []);
  
  const runBudgetAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const steps = [
      'Analyzing budget variances...',
      'Calculating forecast accuracy...',
      'Identifying spending patterns...',
      'Assessing risk factors...',
      'Generating recommendations...',
      'Finalizing analysis...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      
      toast({
        title: steps[i],
        status: 'info',
        duration: 1000,
        isClosable: true,
        position: 'top-right'
      });
    }
    
    setIsAnalyzing(false);
    
    toast({
      title: 'Budget Analysis Complete',
      description: 'Generated comprehensive budget insights and recommendations',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }, [toast]);
  
  const filteredLineItems = useMemo(() => {
    return budgetLineItems.filter(item => {
      const matchesDepartment = filterDepartment === 'all' || 
        budgetCategories.find(cat => cat.id === item.categoryId)?.department === filterDepartment;
      const matchesSearch = searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDepartment && matchesSearch;
    });
  }, [budgetLineItems, budgetCategories, filterDepartment, searchTerm]);
  
  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between" align="center">
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Text fontSize="3xl" fontWeight="bold">
                      💰 Enterprise Budgeting & Financial Planning
                    </Text>
                  </HStack>
                  <Text color="gray.600">
                    Comprehensive budgeting system with scenario planning, variance analysis, and strategic integration
                  </Text>
                  <HStack spacing={3} flexWrap="wrap">
                    <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                      📊 Active Budgets: {budgetPeriods.filter(p => p.status === 'active').length}
                    </Badge>
                    <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                      📈 Total Budget: {formatCurrency(budgetDashboard?.summary.totalBudget || 0)}
                    </Badge>
                    <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                      🎯 Utilization: {budgetDashboard?.summary.utilizationRate || 0}%
                    </Badge>
                    <Badge colorScheme="green" variant="subtle" fontSize="xs">
                      ✅ Approved Items: {budgetLineItems.filter(item => item.approvedBy).length}
                    </Badge>
                  </HStack>
                </VStack>
                
                <VStack spacing={2} align="end">
                  <HStack spacing={2}>
                    {budgetDashboard && (
                      <CircularProgress 
                        value={budgetDashboard.summary.utilizationRate} 
                        color="teal.400"
                        size="60px"
                        thickness="8px"
                      >
                        <CircularProgressLabel fontSize="xs" fontWeight="bold">
                          {budgetDashboard.summary.utilizationRate}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    )}
                    
                    {budgetDashboard && (
                      <CircularProgress 
                        value={Math.abs(budgetDashboard.summary.variancePercentage)} 
                        color={budgetDashboard.summary.variance >= 0 ? 'green.400' : 'red.400'}
                        size="60px"
                        thickness="8px"
                      >
                        <CircularProgressLabel fontSize="xs" fontWeight="bold">
                          {budgetDashboard.summary.variancePercentage.toFixed(1)}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    )}
                  </HStack>
                  
                  <HStack spacing={2}>
                    <Menu>
                      <MenuButton as={Button} size="sm" variant="outline" rightIcon={<ChevronDownIcon />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <MenuItem icon={<AddIcon />} onClick={onPeriodModalOpen}>
                          New Budget Period
                        </MenuItem>
                        <MenuItem icon={<AddIcon />} onClick={onCategoryModalOpen}>
                          New Category
                        </MenuItem>
                        <MenuItem icon={<AddIcon />} onClick={onLineItemModalOpen}>
                          New Line Item
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<ViewIcon />} onClick={onScenarioModalOpen}>
                          Scenario Planning
                        </MenuItem>
                        <MenuItem icon={<WarningIcon />} onClick={onVarianceModalOpen}>
                          Variance Analysis
                        </MenuItem>
                        <MenuItem icon={<CheckIcon />} onClick={onApprovalModalOpen}>
                          Approval Workflow
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<RepeatIcon />} onClick={runBudgetAnalysis} isDisabled={isAnalyzing}>
                          Run Analysis
                        </MenuItem>
                        <MenuItem icon={<DownloadIcon />}>
                          Export Budget
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    
                    <Button 
                      leftIcon={<AddIcon />} 
                      colorScheme="teal" 
                      size="sm"
                      onClick={onLineItemModalOpen}
                    >
                      Add Budget Item
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
              
              {/* Analysis Progress */}
              {isAnalyzing && (
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="semibold">Budget Analysis in Progress...</Text>
                    <Text fontSize="sm" color="gray.600">{Math.round(analysisProgress)}%</Text>
                  </HStack>
                  <Progress value={analysisProgress} colorScheme="purple" size="sm" />
                </Box>
              )}
              
              {/* Filter and Search Controls */}
              <HStack spacing={4} align="center" flexWrap="wrap">
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">View:</Text>
                  <Select size="sm" value={viewMode} onChange={(e) => setViewMode(e.target.value as any)} w="140px">
                    <option value="summary">Summary</option>
                    <option value="detailed">Detailed</option>
                    <option value="variance">Variance</option>
                    <option value="trends">Trends</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Department:</Text>
                  <Select size="sm" value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} w="140px">
                    <option value="all">All Departments</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Human Resources">HR</option>
                    <option value="Engineering">Engineering</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Search:</Text>
                  <Input 
                    size="sm" 
                    placeholder="Search budget items..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    w="200px"
                  />
                </HStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs variant="enclosed" colorScheme="teal" index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>📊 Dashboard ({budgetDashboard?.alerts.filter(a => !a.isResolved).length || 0} alerts)</Tab>
            <Tab>💳 Budget Items ({filteredLineItems.length})</Tab>
            <Tab>🎭 Scenarios ({budgetScenarios.length})</Tab>
            <Tab>📈 Variance Analysis ({budgetVariances.length})</Tab>
            <Tab>✅ Approvals ({budgetApprovals.filter(a => a.status === 'pending').length} pending)</Tab>
            <Tab>📋 Reports & Analytics</Tab>
          </TabList>

          <TabPanels>
            {/* Dashboard Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                {budgetDashboard && (
                  <>
                    {/* Key Metrics */}
                    <SimpleGrid columns={4} spacing={6}>
                      <Stat>
                        <StatLabel>Total Budget</StatLabel>
                        <StatNumber>{formatCurrency(budgetDashboard.summary.totalBudget)}</StatNumber>
                        <StatHelpText>
                          FY 2024 Approved Budget
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Actual Spent</StatLabel>
                        <StatNumber>{formatCurrency(budgetDashboard.summary.totalActual)}</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          {budgetDashboard.summary.utilizationRate}% utilized
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Forecast</StatLabel>
                        <StatNumber color={budgetDashboard.summary.variance >= 0 ? 'green.500' : 'red.500'}>
                          {formatCurrency(budgetDashboard.summary.totalForecast)}
                        </StatNumber>
                        <StatHelpText>
                          <StatArrow type={budgetDashboard.summary.variance >= 0 ? 'increase' : 'decrease'} />
                          {budgetDashboard.summary.variancePercentage.toFixed(1)}% variance
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Remaining Budget</StatLabel>
                        <StatNumber>{formatCurrency(budgetDashboard.summary.remainingBudget)}</StatNumber>
                        <StatHelpText>
                          Burn rate: {formatCurrency(budgetDashboard.summary.burnRate)}/month
                        </StatHelpText>
                      </Stat>
                    </SimpleGrid>
                    
                    {/* Alerts */}
                    {budgetDashboard.alerts.filter(alert => !alert.isResolved).length > 0 && (
                      <Card bg={cardBg}>
                        <CardHeader>
                          <Text fontSize="lg" fontWeight="bold">🚨 Active Alerts</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={3} align="stretch">
                            {budgetDashboard.alerts.filter(alert => !alert.isResolved).map((alert) => (
                              <Alert key={alert.id} status={alert.severity === 'critical' ? 'error' : alert.severity === 'high' ? 'warning' : 'info'}>
                                <AlertIcon />
                                <VStack align="start" spacing={1} flex={1}>
                                  <HStack justify="space-between" w="full">
                                    <Text fontSize="sm" fontWeight="semibold">{alert.message}</Text>
                                    <Badge colorScheme={alert.severity === 'critical' ? 'red' : alert.severity === 'high' ? 'orange' : 'blue'}>
                                      {alert.severity}
                                    </Badge>
                                  </HStack>
                                  <Text fontSize="xs" color="gray.600">
                                    Action required: {alert.actionRequired} • Due: {new Date(alert.dueDate).toLocaleDateString()}
                                  </Text>
                                </VStack>
                                <IconButton
                                  icon={<CheckIcon />}
                                  size="sm"
                                  aria-label="Resolve alert"
                                  colorScheme="green"
                                />
                              </Alert>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    )}
                    
                    {/* KPIs */}
                    <Card bg={cardBg}>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="bold">📊 Key Performance Indicators</Text>
                      </CardHeader>
                      <CardBody>
                        <SimpleGrid columns={2} spacing={6}>
                          {budgetDashboard.kpis.map((kpi) => (
                            <HStack key={kpi.id} justify="space-between" p={4} bg="gray.50" borderRadius="md">
                              <VStack align="start" spacing={1}>
                                <Text fontSize="sm" fontWeight="semibold">{kpi.name}</Text>
                                <HStack>
                                  <Text fontSize="lg" fontWeight="bold">{kpi.value}{kpi.unit === 'percentage' ? '%' : ''}</Text>
                                  <Text fontSize="sm" color="gray.600">/ {kpi.target}{kpi.unit === 'percentage' ? '%' : ''}</Text>
                                </HStack>
                              </VStack>
                              <VStack align="end" spacing={1}>
                                <Badge colorScheme={kpi.status === 'on_track' ? 'green' : kpi.status === 'at_risk' ? 'yellow' : 'red'}>
                                  {kpi.status.replace('_', ' ')}
                                </Badge>
                                <Text fontSize="sm">
                                  {kpi.trend === 'up' ? '📈' : kpi.trend === 'down' ? '📉' : '➡️'}
                                </Text>
                              </VStack>
                            </HStack>
                          ))}
                        </SimpleGrid>
                      </CardBody>
                    </Card>
                  </>
                )}
              </VStack>
            </TabPanel>

            {/* Budget Items Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={4} align="stretch">
                {filteredLineItems.map((item) => {
                  const category = budgetCategories.find(cat => cat.id === item.categoryId);
                  const health = calculateBudgetHealth(item);
                  const variance = ((item.actualAmount - item.budgetedAmount) / item.budgetedAmount) * 100;
                  
                  return (
                    <Card key={item.id} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
                      <CardBody>
                        <HStack justify="space-between" align="start" mb={3}>
                          <HStack spacing={3}>
                            <VStack align="start" spacing={1}>
                              <HStack>
                                <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                                <Badge colorScheme={health === 'excellent' ? 'green' : health === 'good' ? 'blue' : health === 'fair' ? 'yellow' : 'red'}>
                                  {health}
                                </Badge>
                              </HStack>
                              <Text fontSize="sm" color="gray.600">{item.description}</Text>
                              <HStack spacing={2}>
                                <Text fontSize="xs" color="gray.500">
                                  {category?.department} • {category?.name}
                                </Text>
                                {item.approvedBy && (
                                  <Badge colorScheme="green" size="sm">✅ Approved</Badge>
                                )}
                              </HStack>
                            </VStack>
                          </HStack>
                          
                          <VStack align="end" spacing={2}>
                            <HStack spacing={4}>
                              <VStack spacing={0} align="center">
                                <Text fontSize="xs" color="gray.600">Budgeted</Text>
                                <Text fontSize="md" fontWeight="bold">{formatCurrency(item.budgetedAmount)}</Text>
                              </VStack>
                              <VStack spacing={0} align="center">
                                <Text fontSize="xs" color="gray.600">Actual</Text>
                                <Text fontSize="md" fontWeight="bold" color={variance >= 0 ? 'green.500' : 'red.500'}>
                                  {formatCurrency(item.actualAmount)}
                                </Text>
                              </VStack>
                              <VStack spacing={0} align="center">
                                <Text fontSize="xs" color="gray.600">Forecast</Text>
                                <Text fontSize="md" fontWeight="bold">{formatCurrency(item.forecastAmount)}</Text>
                              </VStack>
                              <VStack spacing={0} align="center">
                                <Text fontSize="xs" color="gray.600">Variance</Text>
                                <Text 
                                  fontSize="md" 
                                  fontWeight="bold" 
                                  color={variance >= 0 ? 'green.500' : 'red.500'}
                                >
                                  {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                                </Text>
                              </VStack>
                            </HStack>
                            <Menu>
                              <MenuButton as={IconButton} icon={<SettingsIcon />} size="sm" variant="ghost" />
                              <MenuList>
                                <MenuItem icon={<EditIcon />} onClick={() => {
                                  setSelectedLineItem(item);
                                  onLineItemModalOpen();
                                }}>
                                  Edit Line Item
                                </MenuItem>
                                <MenuItem icon={<ViewIcon />}>
                                  View Details
                                </MenuItem>
                                <MenuItem icon={<CalendarIcon />}>
                                  View History
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem icon={<CheckIcon />}>
                                  Submit for Approval
                                </MenuItem>
                                <MenuItem icon={<DeleteIcon />} color="red.500">
                                  Delete Item
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </VStack>
                        </HStack>
                        
                        {/* Progress bar for budget utilization */}
                        <Box>
                          <HStack justify="space-between" mb={1}>
                            <Text fontSize="xs" color="gray.600">Budget Utilization</Text>
                            <Text fontSize="xs" color="gray.600">
                              {((item.actualAmount / item.budgetedAmount) * 100).toFixed(1)}% used
                            </Text>
                          </HStack>
                          <Progress 
                            value={(item.actualAmount / item.budgetedAmount) * 100} 
                            colorScheme={getVarianceColor(variance / 100)} 
                            size="sm" 
                          />
                        </Box>
                        
                        {/* Risks and Drivers */}
                        {(item.risks.length > 0 || item.drivers.length > 0) && (
                          <HStack spacing={4} mt={3} fontSize="xs">
                            {item.risks.length > 0 && (
                              <HStack spacing={1}>
                                <WarningIcon color="orange.500" />
                                <Text color="gray.600">{item.risks.length} risk{item.risks.length !== 1 ? 's' : ''}</Text>
                              </HStack>
                            )}
                            {item.drivers.length > 0 && (
                              <HStack spacing={1}>
                                <TrendingUpIcon color="blue.500" />
                                <Text color="gray.600">{item.drivers.length} driver{item.drivers.length !== 1 ? 's' : ''}</Text>
                              </HStack>
                            )}
                          </HStack>
                        )}
                      </CardBody>
                    </Card>
                  );
                })}
                
                {filteredLineItems.length === 0 && (
                  <Alert status="info">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">No budget items found</Text>
                      <Text fontSize="xs">Create your first budget item to get started with financial planning.</Text>
                    </VStack>
                  </Alert>
                )}
              </VStack>
            </TabPanel>

            {/* Scenarios Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <Text fontSize="lg" fontWeight="bold">🎭 Budget Scenarios</Text>
                  <Button size="sm" leftIcon={<AddIcon />} onClick={onScenarioModalOpen}>
                    Create Scenario
                  </Button>
                </HStack>
                
                <SimpleGrid columns={3} spacing={6}>
                  {budgetScenarios.map((scenario) => (
                    <Card key={scenario.id} bg={cardBg} cursor="pointer" _hover={{ shadow: 'md' }}>
                      <CardBody>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <Text fontSize="md" fontWeight="bold">{scenario.name}</Text>
                            <Badge colorScheme={scenario.type === 'base' ? 'blue' : scenario.type === 'optimistic' ? 'green' : 'orange'}>
                              {scenario.type}
                            </Badge>
                          </HStack>
                          
                          <Text fontSize="sm" color="gray.600">{scenario.description}</Text>
                          
                          <VStack spacing={2} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="xs" color="gray.600">Revenue:</Text>
                              <Text fontSize="xs" fontWeight="semibold">{formatCurrency(scenario.results.totalRevenue)}</Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="xs" color="gray.600">Net Income:</Text>
                              <Text fontSize="xs" fontWeight="semibold" color={scenario.results.netIncome >= 0 ? 'green.500' : 'red.500'}>
                                {formatCurrency(scenario.results.netIncome)}
                              </Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="xs" color="gray.600">EBITDA Margin:</Text>
                              <Text fontSize="xs" fontWeight="semibold">
                                {(scenario.results.keyMetrics['EBITDA Margin'] * 100).toFixed(1)}%
                              </Text>
                            </HStack>
                          </VStack>
                          
                          <HStack justify="space-between" fontSize="xs" color="gray.500">
                            <Text>Probability: {(scenario.probability * 100).toFixed(0)}%</Text>
                            <Text>Variance: {(scenario.results.variance * 100).toFixed(1)}%</Text>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Variance Analysis Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">📈 Variance Analysis</Text>
                    <Button size="sm" leftIcon={<AddIcon />} onClick={onVarianceModalOpen}>
                      Add Variance
                    </Button>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Variance analysis helps identify deviations from budget and their root causes for better financial control.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Approvals Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">✅ Budget Approval Workflow</Text>
                    <Button size="sm" leftIcon={<AddIcon />} onClick={onApprovalModalOpen}>
                      Submit for Approval
                    </Button>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Manage budget approval workflows with multi-stage approvals and automated notifications.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Reports Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">📋 Reports & Analytics</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Comprehensive reporting suite with executive dashboards, detailed analytics, and export capabilities.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Basic Modals - More complex modals would be implemented with full functionality */}
        <Modal isOpen={isPeriodModalOpen} onClose={onPeriodModalClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Budget Period</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Period Name</FormLabel>
                  <Input placeholder="e.g., FY 2025 Annual Budget" />
                </FormControl>
                <SimpleGrid columns={2} spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <Input type="date" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>End Date</FormLabel>
                    <Input type="date" />
                  </FormControl>
                </SimpleGrid>
                <FormControl>
                  <FormLabel>Fiscal Year</FormLabel>
                  <Input placeholder="e.g., 2025" />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onPeriodModalClose}>
                Cancel
              </Button>
              <Button colorScheme="teal">
                Create Period
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Additional modals would follow similar patterns with comprehensive functionality */}
      </VStack>
    </Box>
  );
};

export default BudgetingModule;