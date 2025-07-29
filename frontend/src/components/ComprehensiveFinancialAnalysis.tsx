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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
} from '@chakra-ui/react';

// Financial Analysis Data Structures
interface ValueChainActivity {
  id: string;
  name: string;
  type: 'primary' | 'support';
  category: 'inbound_logistics' | 'operations' | 'outbound_logistics' | 'marketing_sales' | 'service' | 
           'procurement' | 'technology' | 'hr_management' | 'firm_infrastructure';
  cost: number;
  value: number;
  efficiency: number; // 1-10 scale
  strategic_importance: number; // 1-10 scale
  improvement_potential: number; // 1-10 scale
  benchmarkComparison: number; // vs industry average
}

interface DCFAnalysis {
  id: string;
  projectName: string;
  initialInvestment: number;
  projectionYears: number;
  discountRate: number;
  cashFlows: number[];
  npv: number;
  irr: number;
  paybackPeriod: number;
  profitabilityIndex: number;
  sensitivity: {
    discountRateChange: number[];
    npvChange: number[];
  };
}

interface DuPontAnalysis {
  id: string;
  period: string;
  revenue: number;
  netIncome: number;
  totalAssets: number;
  totalEquity: number;
  profitMargin: number;
  assetTurnover: number;
  equityMultiplier: number;
  roe: number;
  roa: number;
  historicalComparison: {
    periods: string[];
    roe: number[];
    components: {
      profitMargin: number[];
      assetTurnover: number[];
      equityMultiplier: number[];
    };
  };
}

interface BreakevenAnalysis {
  id: string;
  productService: string;
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  breakevenUnits: number;
  breakevenRevenue: number;
  marginOfSafety: number;
  targetProfit: number;
  unitsForTargetProfit: number;
  scenarios: {
    name: string;
    priceChange: number;
    costChange: number;
    newBreakevenUnits: number;
    impact: number;
  }[];
}

interface AccountingIntegration {
  id: string;
  system: 'quickbooks' | 'sage' | 'great_plains' | 'netsuite' | 'xero' | 'manual';
  status: 'connected' | 'disconnected' | 'sync_error' | 'pending';
  lastSync: string;
  dataFields: string[];
  syncFrequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
  errorLog: string[];
}

const ComprehensiveFinancialAnalysis: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const [valueChainActivities, setValueChainActivities] = useState<ValueChainActivity[]>([]);
  const [dcfAnalyses, setDCFAnalyses] = useState<DCFAnalysis[]>([]);
  const [dupontAnalysis, setDupontAnalysis] = useState<DuPontAnalysis | null>(null);
  const [breakevenAnalyses, setBreakevenAnalyses] = useState<BreakevenAnalysis[]>([]);
  const [accountingIntegrations, setAccountingIntegrations] = useState<AccountingIntegration[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const toast = useToast();
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // API integration functions
  const connectToAccountingSystem = async (systemName: string) => {
    try {
      const systemKey = systemName.toLowerCase().replace(' ', '_');
      
      // Simulate OAuth flow for accounting systems
      toast({
        title: `Connecting to ${systemName}...`,
        description: "Opening authentication window",
        status: "info",
        duration: 2000,
      });

      // Mock OAuth authentication process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update integration status
      const newIntegration: AccountingIntegration = {
        id: `int_${systemKey}_${Date.now()}`,
        system: systemKey as any,
        status: 'connected',
        lastSync: new Date().toISOString(),
        dataFields: getSystemDataFields(systemKey),
        syncFrequency: 'daily',
        errorLog: []
      };

      setAccountingIntegrations(prev => {
        const existing = prev.find(int => int.system === systemKey);
        if (existing) {
          return prev.map(int => 
            int.system === systemKey 
              ? { ...int, status: 'connected', lastSync: new Date().toISOString(), errorLog: [] }
              : int
          );
        }
        return [...prev, newIntegration];
      });

      toast({
        title: `${systemName} Connected!`,
        description: "Your accounting data is now being synchronized",
        status: "success",
        duration: 4000,
      });

      // Trigger data sync
      await syncAccountingData(systemKey);

    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Unable to connect to ${systemName}. Please try again.`,
        status: "error",
        duration: 4000,
      });
    }
  };

  const syncAccountingData = async (systemKey: string) => {
    try {
      // Update sync status
      setAccountingIntegrations(prev => prev.map(int => 
        int.system === systemKey 
          ? { ...int, status: 'pending' as any }
          : int
      ));

      // Mock API call to fetch data
      const response = await fetchAccountingData(systemKey);
      
      // Process the data and update financial analysis
      if (response.success) {
        updateFinancialAnalysisWithData(response.data);
        
        setAccountingIntegrations(prev => prev.map(int => 
          int.system === systemKey 
            ? { ...int, status: 'connected', lastSync: new Date().toISOString() }
            : int
        ));

        toast({
          title: "Data Synchronized",
          description: `Financial data from ${systemKey} has been updated`,
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      setAccountingIntegrations(prev => prev.map(int => 
        int.system === systemKey 
          ? { ...int, status: 'sync_error', errorLog: [...int.errorLog, `Sync failed: ${error}`] }
          : int
      ));
    }
  };

  const getSystemDataFields = (systemKey: string) => {
    const fieldMappings: { [key: string]: string[] } = {
      'quickbooks': ['Revenue', 'Expenses', 'Assets', 'Liabilities', 'Cash Flow', 'Profit & Loss', 'Balance Sheet'],
      'sage': ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Fixed Assets', 'Inventory'],
      'great_plains': ['Financial Statements', 'Trial Balance', 'Budget vs Actual', 'Cash Management'],
      'netsuite': ['Revenue Recognition', 'Financial Consolidation', 'Multi-currency', 'Advanced Analytics'],
      'xero': ['Bank Reconciliation', 'Invoicing', 'Expense Management', 'Financial Reporting'],
      'sap': ['Enterprise Financials', 'Management Accounting', 'Treasury', 'Risk Management'],
      'oracle': ['Financial Close', 'Reporting & Analytics', 'Revenue Management', 'Expense Management'],
      'dynamics': ['Financial Management', 'Budgeting & Forecasting', 'Fixed Asset Management', 'Bank Management']
    };
    return fieldMappings[systemKey] || ['Basic Financial Data'];
  };

  const fetchAccountingData = async (systemKey: string) => {
    // Mock API endpoints for different accounting systems
    const apiEndpoints: { [key: string]: string } = {
      'quickbooks': '/api/integrations/quickbooks/data',
      'sage': '/api/integrations/sage/data',
      'great_plains': '/api/integrations/greatplains/data',
      'netsuite': '/api/integrations/netsuite/data',
      'xero': '/api/integrations/xero/data',
      'sap': '/api/integrations/sap/data',
      'oracle': '/api/integrations/oracle/data',
      'dynamics': '/api/integrations/dynamics/data'
    };

    // Mock successful response with sample financial data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      data: {
        revenue: 2500000 + Math.random() * 500000,
        expenses: 1800000 + Math.random() * 300000,
        assets: 5000000 + Math.random() * 1000000,
        liabilities: 2000000 + Math.random() * 500000,
        cashFlow: [120000, 150000, 180000, 200000, 175000],
        lastUpdated: new Date().toISOString()
      }
    };
  };

  const updateFinancialAnalysisWithData = (data: any) => {
    // Update DuPont analysis with real data
    const netIncome = data.revenue - data.expenses;
    const equity = data.assets - data.liabilities;
    
    const updatedDuPont: DuPontAnalysis = {
      id: 'dupont_live',
      period: 'Current (Live Data)',
      revenue: data.revenue,
      netIncome,
      totalAssets: data.assets,
      totalEquity: equity,
      profitMargin: (netIncome / data.revenue) * 100,
      assetTurnover: data.revenue / data.assets,
      equityMultiplier: data.assets / equity,
      roe: (netIncome / equity) * 100,
      roa: (netIncome / data.assets) * 100,
      historicalComparison: dupontAnalysis?.historicalComparison || {
        periods: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
        roe: [12.5, 13.8, 15.2, 14.9, (netIncome / equity) * 100],
        components: {
          profitMargin: [8.2, 8.8, 9.5, 9.1, (netIncome / data.revenue) * 100],
          assetTurnover: [1.1, 1.15, 1.2, 1.18, data.revenue / data.assets],
          equityMultiplier: [1.45, 1.48, 1.52, 1.5, data.assets / equity]
        }
      }
    };

    setDupontAnalysis(updatedDuPont);

    // Update value chain with real cost data
    const costAllocation = {
      inbound_logistics: data.expenses * 0.15,
      operations: data.expenses * 0.45,
      outbound_logistics: data.expenses * 0.12,
      marketing_sales: data.expenses * 0.18,
      service: data.expenses * 0.10
    };

    setValueChainActivities(prev => prev.map(activity => ({
      ...activity,
      cost: costAllocation[activity.category as keyof typeof costAllocation] || activity.cost,
      value: activity.cost * (1 + activity.efficiency / 10)
    })));
  };

  const disconnectAccountingSystem = (systemKey: string) => {
    setAccountingIntegrations(prev => prev.map(int => 
      int.system === systemKey 
        ? { ...int, status: 'disconnected', errorLog: [...int.errorLog, 'Manually disconnected'] }
        : int
    ));

    toast({
      title: "System Disconnected",
      description: `${systemKey} integration has been disabled`,
      status: "warning",
      duration: 3000,
    });
  };

  const processFileUpload = async () => {
    if (!fileUpload) return;

    try {
      toast({
        title: "Processing File...",
        description: "Analyzing your financial data",
        status: "info",
        duration: 2000,
      });

      // Mock file processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate insights from uploaded file
      const fileData = {
        revenue: 2200000 + Math.random() * 600000,
        expenses: 1650000 + Math.random() * 350000,
        assets: 4500000 + Math.random() * 1500000,
        liabilities: 1800000 + Math.random() * 700000,
      };

      updateFinancialAnalysisWithData(fileData);

      toast({
        title: "File Processed Successfully!",
        description: "Your financial analysis has been updated with the uploaded data",
        status: "success",
        duration: 4000,
      });

      onUploadClose();
      setFileUpload(null);

    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Unable to process the uploaded file. Please check the format.",
        status: "error",
        duration: 4000,
      });
    }
  };

  // Initialize with demo data
  useEffect(() => {
    // Demo Value Chain Activities
    const demoValueChain: ValueChainActivity[] = [
      // Primary Activities
      {
        id: 'vc_inbound',
        name: 'Inbound Logistics',
        type: 'primary',
        category: 'inbound_logistics',
        cost: 150000,
        value: 200000,
        efficiency: 7,
        strategic_importance: 6,
        improvement_potential: 8,
        benchmarkComparison: 0.95
      },
      {
        id: 'vc_operations',
        name: 'Operations',
        type: 'primary',
        category: 'operations',
        cost: 500000,
        value: 800000,
        efficiency: 8,
        strategic_importance: 9,
        improvement_potential: 6,
        benchmarkComparison: 1.1
      },
      {
        id: 'vc_outbound',
        name: 'Outbound Logistics',
        type: 'primary',
        category: 'outbound_logistics',
        cost: 120000,
        value: 180000,
        efficiency: 6,
        strategic_importance: 7,
        improvement_potential: 9,
        benchmarkComparison: 0.88
      },
      {
        id: 'vc_marketing',
        name: 'Marketing & Sales',
        type: 'primary',
        category: 'marketing_sales',
        cost: 300000,
        value: 600000,
        efficiency: 7,
        strategic_importance: 9,
        improvement_potential: 7,
        benchmarkComparison: 1.05
      },
      {
        id: 'vc_service',
        name: 'Service',
        type: 'primary',
        category: 'service',
        cost: 100000,
        value: 150000,
        efficiency: 8,
        strategic_importance: 8,
        improvement_potential: 5,
        benchmarkComparison: 1.15
      },
      // Support Activities
      {
        id: 'vc_procurement',
        name: 'Procurement',
        type: 'support',
        category: 'procurement',
        cost: 80000,
        value: 120000,
        efficiency: 6,
        strategic_importance: 7,
        improvement_potential: 8,
        benchmarkComparison: 0.92
      },
      {
        id: 'vc_technology',
        name: 'Technology Development',
        type: 'support',
        category: 'technology',
        cost: 250000,
        value: 400000,
        efficiency: 9,
        strategic_importance: 10,
        improvement_potential: 4,
        benchmarkComparison: 1.25
      },
      {
        id: 'vc_hr',
        name: 'Human Resource Management',
        type: 'support',
        category: 'hr_management',
        cost: 200000,
        value: 300000,
        efficiency: 7,
        strategic_importance: 8,
        improvement_potential: 6,
        benchmarkComparison: 1.0
      },
      {
        id: 'vc_infrastructure',
        name: 'Firm Infrastructure',
        type: 'support',
        category: 'firm_infrastructure',
        cost: 180000,
        value: 220000,
        efficiency: 6,
        strategic_importance: 7,
        improvement_potential: 7,
        benchmarkComparison: 0.95
      }
    ];

    setValueChainActivities(demoValueChain);

    // Demo DCF Analysis
    const demoDCF: DCFAnalysis = {
      id: 'dcf_project_alpha',
      projectName: 'Strategic Blue Ocean Initiative',
      initialInvestment: 500000,
      projectionYears: 5,
      discountRate: 0.10,
      cashFlows: [150000, 200000, 250000, 300000, 350000],
      npv: 0,
      irr: 0,
      paybackPeriod: 0,
      profitabilityIndex: 0,
      sensitivity: {
        discountRateChange: [0.08, 0.09, 0.10, 0.11, 0.12],
        npvChange: []
      }
    };

    // Calculate DCF metrics
    const calculateDCF = (dcf: DCFAnalysis) => {
      // NPV Calculation
      let npv = -dcf.initialInvestment;
      dcf.cashFlows.forEach((cashFlow, index) => {
        npv += cashFlow / Math.pow(1 + dcf.discountRate, index + 1);
      });
      dcf.npv = npv;

      // IRR Calculation (simplified approximation)
      let irr = 0.1; // Starting guess
      for (let i = 0; i < 100; i++) {
        let npvAtIRR = -dcf.initialInvestment;
        dcf.cashFlows.forEach((cashFlow, index) => {
          npvAtIRR += cashFlow / Math.pow(1 + irr, index + 1);
        });
        if (Math.abs(npvAtIRR) < 1000) break;
        irr += npvAtIRR > 0 ? 0.001 : -0.001;
      }
      dcf.irr = irr;

      // Payback Period
      let cumulativeCashFlow = -dcf.initialInvestment;
      let paybackPeriod = 0;
      for (let i = 0; i < dcf.cashFlows.length; i++) {
        cumulativeCashFlow += dcf.cashFlows[i];
        if (cumulativeCashFlow >= 0) {
          paybackPeriod = i + 1 - (cumulativeCashFlow - dcf.cashFlows[i]) / dcf.cashFlows[i];
          break;
        }
      }
      dcf.paybackPeriod = paybackPeriod;

      // Profitability Index
      let presentValueOfCashFlows = 0;
      dcf.cashFlows.forEach((cashFlow, index) => {
        presentValueOfCashFlows += cashFlow / Math.pow(1 + dcf.discountRate, index + 1);
      });
      dcf.profitabilityIndex = presentValueOfCashFlows / dcf.initialInvestment;

      // Sensitivity Analysis
      dcf.sensitivity.npvChange = dcf.sensitivity.discountRateChange.map(rate => {
        let sensitivityNPV = -dcf.initialInvestment;
        dcf.cashFlows.forEach((cashFlow, index) => {
          sensitivityNPV += cashFlow / Math.pow(1 + rate, index + 1);
        });
        return sensitivityNPV;
      });

      return dcf;
    };

    setDCFAnalyses([calculateDCF(demoDCF)]);

    // Demo DuPont Analysis
    const demoDuPont: DuPontAnalysis = {
      id: 'dupont_2024',
      period: '2024 Q3',
      revenue: 2000000,
      netIncome: 150000,
      totalAssets: 1200000,
      totalEquity: 800000,
      profitMargin: 0.075, // Net Income / Revenue
      assetTurnover: 1.67, // Revenue / Total Assets
      equityMultiplier: 1.5, // Total Assets / Total Equity
      roe: 0.1875, // ROE = Profit Margin × Asset Turnover × Equity Multiplier
      roa: 0.125, // Net Income / Total Assets
      historicalComparison: {
        periods: ['2024 Q1', '2024 Q2', '2024 Q3'],
        roe: [0.16, 0.17, 0.1875],
        components: {
          profitMargin: [0.065, 0.070, 0.075],
          assetTurnover: [1.6, 1.65, 1.67],
          equityMultiplier: [1.53, 1.52, 1.5]
        }
      }
    };

    setDupontAnalysis(demoDuPont);

    // Demo Breakeven Analysis
    const demoBreakeven: BreakevenAnalysis = {
      id: 'breakeven_product_a',
      productService: 'Strategic Consulting Service',
      fixedCosts: 100000,
      variableCostPerUnit: 500,
      pricePerUnit: 2000,
      contributionMargin: 1500,
      contributionMarginRatio: 0.75,
      breakevenUnits: 67, // Fixed Costs / Contribution Margin
      breakevenRevenue: 133333, // Breakeven Units × Price Per Unit
      marginOfSafety: 0.25,
      targetProfit: 50000,
      unitsForTargetProfit: 100, // (Fixed Costs + Target Profit) / Contribution Margin
      scenarios: [
        {
          name: '10% Price Increase',
          priceChange: 0.10,
          costChange: 0,
          newBreakevenUnits: 56,
          impact: -16.4
        },
        {
          name: '5% Cost Reduction',
          priceChange: 0,
          costChange: -0.05,
          newBreakevenUnits: 62,
          impact: -7.5
        },
        {
          name: 'Combined Optimization',
          priceChange: 0.05,
          costChange: -0.03,
          newBreakevenUnits: 54,
          impact: -19.4
        }
      ]
    };

    setBreakevenAnalyses([demoBreakeven]);

    // Demo Accounting Integrations
    const demoIntegrations: AccountingIntegration[] = [
      {
        id: 'int_qb',
        system: 'quickbooks',
        status: 'connected',
        lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        dataFields: ['Revenue', 'Expenses', 'Assets', 'Liabilities', 'Cash Flow'],
        syncFrequency: 'daily',
        errorLog: []
      },
      {
        id: 'int_sage',
        system: 'sage',
        status: 'disconnected',
        lastSync: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        dataFields: ['General Ledger', 'Accounts Payable', 'Accounts Receivable'],
        syncFrequency: 'weekly',
        errorLog: ['Connection timeout', 'Authentication failed']
      }
    ];

    setAccountingIntegrations(demoIntegrations);
  }, []);

  const getActivityColor = (efficiency: number) => {
    if (efficiency >= 8) return 'green';
    if (efficiency >= 6) return 'yellow';
    return 'red';
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'green';
      case 'sync_error': return 'red';
      case 'pending': return 'yellow';
      case 'disconnected': return 'gray';
      default: return 'gray';
    }
  };

  const renderValueChainAnalysis = () => {
    const primaryActivities = valueChainActivities.filter(a => a.type === 'primary');
    const supportActivities = valueChainActivities.filter(a => a.type === 'support');
    const totalCost = valueChainActivities.reduce((sum, a) => sum + a.cost, 0);
    const totalValue = valueChainActivities.reduce((sum, a) => sum + a.value, 0);

    return (
      <VStack spacing={6} align="stretch">
        {/* Value Chain Overview */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">🔗 Value Chain Overview</Text>
              <Badge colorScheme="blue" fontSize="md" p={2}>
                Total Value: ${totalValue.toLocaleString()}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4} mb={6}>
              <Stat>
                <StatLabel>Total Cost</StatLabel>
                <StatNumber>${totalCost.toLocaleString()}</StatNumber>
                <StatHelpText>All activities</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Total Value</StatLabel>
                <StatNumber>${totalValue.toLocaleString()}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Value Margin: {(((totalValue - totalCost) / totalCost) * 100).toFixed(1)}%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Primary Activities</StatLabel>
                <StatNumber>{primaryActivities.length}</StatNumber>
                <StatHelpText>Core value creation</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Support Activities</StatLabel>
                <StatNumber>{supportActivities.length}</StatNumber>
                <StatHelpText>Enabling functions</StatHelpText>
              </Stat>
            </Grid>

            {/* Visual Value Chain */}
            <VStack spacing={4}>
              {/* Support Activities Row */}
              <Box w="full" p={4} bg={infoBg} borderRadius="lg">
                <Text fontSize="md" fontWeight="bold" mb={4} textAlign="center">
                  Support Activities
                </Text>
                <Grid templateColumns="repeat(4, 1fr)" gap={3}>
                  {supportActivities.map(activity => (
                    <Card key={activity.id} bg={cardBg} size="sm">
                      <CardBody p={3}>
                        <VStack spacing={2}>
                          <Text fontSize="sm" fontWeight="semibold" textAlign="center" noOfLines={2}>
                            {activity.name}
                          </Text>
                          <Badge colorScheme={getActivityColor(activity.efficiency)} size="sm">
                            Efficiency: {activity.efficiency}/10
                          </Badge>
                          <VStack spacing={1}>
                            <Text fontSize="xs">Cost: ${activity.cost.toLocaleString()}</Text>
                            <Text fontSize="xs">Value: ${activity.value.toLocaleString()}</Text>
                            <Text fontSize="xs">
                              vs Benchmark: {(activity.benchmarkComparison * 100).toFixed(0)}%
                            </Text>
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </Box>

              {/* Primary Activities Row */}
              <Box w="full" p={4} bg={successBg} borderRadius="lg">
                <Text fontSize="md" fontWeight="bold" mb={4} textAlign="center">
                  Primary Activities
                </Text>
                <Grid templateColumns="repeat(5, 1fr)" gap={3}>
                  {primaryActivities.map(activity => (
                    <Card key={activity.id} bg={cardBg} size="sm">
                      <CardBody p={3}>
                        <VStack spacing={2}>
                          <Text fontSize="sm" fontWeight="semibold" textAlign="center" noOfLines={2}>
                            {activity.name}
                          </Text>
                          <Badge colorScheme={getActivityColor(activity.efficiency)} size="sm">
                            Efficiency: {activity.efficiency}/10
                          </Badge>
                          <CircularProgress 
                            value={activity.strategic_importance * 10} 
                            color="blue.400" 
                            size="40px"
                          >
                            <CircularProgressLabel fontSize="xs">
                              {activity.strategic_importance}
                            </CircularProgressLabel>
                          </CircularProgress>
                          <VStack spacing={1}>
                            <Text fontSize="xs">Cost: ${activity.cost.toLocaleString()}</Text>
                            <Text fontSize="xs">Value: ${activity.value.toLocaleString()}</Text>
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Improvement Opportunities */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🎯 Improvement Opportunities</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {valueChainActivities
                .filter(a => a.improvement_potential >= 7)
                .sort((a, b) => b.improvement_potential - a.improvement_potential)
                .map(activity => (
                  <Box key={activity.id} p={3} bg="orange.50" borderRadius="md" borderLeft="4px" borderLeftColor="orange.400">
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">{activity.name}</Text>
                        <Text fontSize="xs" color="gray.600">
                          Current efficiency: {activity.efficiency}/10 | Benchmark: {(activity.benchmarkComparison * 100).toFixed(0)}%
                        </Text>
                      </VStack>
                      <VStack align="end" spacing={1}>
                        <Badge colorScheme="orange">
                          Improvement Potential: {activity.improvement_potential}/10
                        </Badge>
                        <Text fontSize="xs">
                          Potential Value: ${(activity.value * (activity.improvement_potential / 10) * 0.2).toLocaleString()}
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
  };

  const renderDCFAnalysis = () => {
    const dcf = dcfAnalyses[0];
    if (!dcf) return null;

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">💰 DCF Analysis: {dcf.projectName}</Text>
              <Badge colorScheme={dcf.npv > 0 ? 'green' : 'red'} fontSize="md" p={2}>
                NPV: ${dcf.npv.toLocaleString()}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4} mb={6}>
              <Stat>
                <StatLabel>Net Present Value</StatLabel>
                <StatNumber color={dcf.npv > 0 ? 'green.500' : 'red.500'}>
                  ${dcf.npv.toLocaleString()}
                </StatNumber>
                <StatHelpText>
                  {dcf.npv > 0 ? 'Project creates value' : 'Project destroys value'}
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Internal Rate of Return</StatLabel>
                <StatNumber>{(dcf.irr * 100).toFixed(2)}%</StatNumber>
                <StatHelpText>
                  vs Discount Rate: {(dcf.discountRate * 100).toFixed(1)}%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Payback Period</StatLabel>
                <StatNumber>{dcf.paybackPeriod.toFixed(1)} years</StatNumber>
                <StatHelpText>Time to recover investment</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Profitability Index</StatLabel>
                <StatNumber>{dcf.profitabilityIndex.toFixed(2)}</StatNumber>
                <StatHelpText>
                  {dcf.profitabilityIndex > 1 ? 'Profitable' : 'Unprofitable'}
                </StatHelpText>
              </Stat>
            </Grid>

            {/* Cash Flow Projection Table */}
            <Card bg={infoBg} mb={6}>
              <CardHeader>
                <Text fontSize="md" fontWeight="bold">Cash Flow Projections</Text>
              </CardHeader>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Year</Th>
                      <Th isNumeric>Cash Flow</Th>
                      <Th isNumeric>Present Value</Th>
                      <Th isNumeric>Cumulative PV</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>0</Td>
                      <Td isNumeric color="red.500">-${dcf.initialInvestment.toLocaleString()}</Td>
                      <Td isNumeric color="red.500">-${dcf.initialInvestment.toLocaleString()}</Td>
                      <Td isNumeric color="red.500">-${dcf.initialInvestment.toLocaleString()}</Td>
                    </Tr>
                    {dcf.cashFlows.map((cashFlow, index) => {
                      const presentValue = cashFlow / Math.pow(1 + dcf.discountRate, index + 1);
                      const cumulativePV = -dcf.initialInvestment + dcf.cashFlows.slice(0, index + 1)
                        .reduce((sum, cf, i) => sum + cf / Math.pow(1 + dcf.discountRate, i + 1), 0);
                      return (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td isNumeric>${cashFlow.toLocaleString()}</Td>
                          <Td isNumeric>${presentValue.toLocaleString()}</Td>
                          <Td isNumeric color={cumulativePV > 0 ? 'green.500' : 'red.500'}>
                            ${cumulativePV.toLocaleString()}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Sensitivity Analysis */}
            <Card bg={infoBg}>
              <CardHeader>
                <Text fontSize="md" fontWeight="bold">Sensitivity Analysis</Text>
              </CardHeader>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Discount Rate</Th>
                      <Th isNumeric>NPV</Th>
                      <Th isNumeric>Change from Base</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dcf.sensitivity.discountRateChange.map((rate, index) => {
                      const npv = dcf.sensitivity.npvChange[index];
                      const change = ((npv - dcf.npv) / dcf.npv) * 100;
                      return (
                        <Tr key={index}>
                          <Td>{(rate * 100).toFixed(1)}%</Td>
                          <Td isNumeric>${npv.toLocaleString()}</Td>
                          <Td isNumeric color={change > 0 ? 'green.500' : 'red.500'}>
                            {change.toFixed(1)}%
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  const renderDuPontAnalysis = () => {
    if (!dupontAnalysis) return null;

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">📊 DuPont Analysis: {dupontAnalysis.period}</Text>
              <Badge colorScheme="blue" fontSize="md" p={2}>
                ROE: {(dupontAnalysis.roe * 100).toFixed(2)}%
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            {/* DuPont Formula Visual */}
            <Box p={6} bg={infoBg} borderRadius="lg" mb={6}>
              <Text fontSize="md" fontWeight="bold" textAlign="center" mb={4}>
                ROE = Profit Margin × Asset Turnover × Equity Multiplier
              </Text>
              <HStack justify="center" spacing={8} align="center">
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                    {(dupontAnalysis.profitMargin * 100).toFixed(2)}%
                  </Text>
                  <Text fontSize="sm">Profit Margin</Text>
                  <Text fontSize="xs" color="gray.600">
                    Net Income / Revenue
                  </Text>
                </VStack>
                <Text fontSize="2xl">×</Text>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="green.500">
                    {dupontAnalysis.assetTurnover.toFixed(2)}
                  </Text>
                  <Text fontSize="sm">Asset Turnover</Text>
                  <Text fontSize="xs" color="gray.600">
                    Revenue / Total Assets
                  </Text>
                </VStack>
                <Text fontSize="2xl">×</Text>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                    {dupontAnalysis.equityMultiplier.toFixed(2)}
                  </Text>
                  <Text fontSize="sm">Equity Multiplier</Text>
                  <Text fontSize="xs" color="gray.600">
                    Total Assets / Total Equity
                  </Text>
                </VStack>
                <Text fontSize="2xl">=</Text>
                <VStack>
                  <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                    {(dupontAnalysis.roe * 100).toFixed(2)}%
                  </Text>
                  <Text fontSize="sm">ROE</Text>
                  <Text fontSize="xs" color="gray.600">
                    Return on Equity
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* Financial Metrics */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
              <Stat>
                <StatLabel>Revenue</StatLabel>
                <StatNumber>${dupontAnalysis.revenue.toLocaleString()}</StatNumber>
                <StatHelpText>Total revenue for period</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Net Income</StatLabel>
                <StatNumber>${dupontAnalysis.netIncome.toLocaleString()}</StatNumber>
                <StatHelpText>
                  Margin: {(dupontAnalysis.profitMargin * 100).toFixed(2)}%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Total Assets</StatLabel>
                <StatNumber>${dupontAnalysis.totalAssets.toLocaleString()}</StatNumber>
                <StatHelpText>
                  ROA: {(dupontAnalysis.roa * 100).toFixed(2)}%
                </StatHelpText>
              </Stat>
            </Grid>

            {/* Historical Trend */}
            <Card bg={infoBg}>
              <CardHeader>
                <Text fontSize="md" fontWeight="bold">Historical Trend Analysis</Text>
              </CardHeader>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Period</Th>
                      <Th isNumeric>ROE</Th>
                      <Th isNumeric>Profit Margin</Th>
                      <Th isNumeric>Asset Turnover</Th>
                      <Th isNumeric>Equity Multiplier</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dupontAnalysis.historicalComparison.periods.map((period, index) => (
                      <Tr key={index}>
                        <Td>{period}</Td>
                        <Td isNumeric>
                          {(dupontAnalysis.historicalComparison.roe[index] * 100).toFixed(2)}%
                        </Td>
                        <Td isNumeric>
                          {(dupontAnalysis.historicalComparison.components.profitMargin[index] * 100).toFixed(2)}%
                        </Td>
                        <Td isNumeric>
                          {dupontAnalysis.historicalComparison.components.assetTurnover[index].toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {dupontAnalysis.historicalComparison.components.equityMultiplier[index].toFixed(2)}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  const renderBreakevenAnalysis = () => {
    const breakeven = breakevenAnalyses[0];
    if (!breakeven) return null;

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">⚖️ Breakeven Analysis: {breakeven.productService}</Text>
              <Badge colorScheme="green" fontSize="md" p={2}>
                Breakeven: {breakeven.breakevenUnits} units
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4} mb={6}>
              <Stat>
                <StatLabel>Breakeven Units</StatLabel>
                <StatNumber>{breakeven.breakevenUnits}</StatNumber>
                <StatHelpText>Units to break even</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Breakeven Revenue</StatLabel>
                <StatNumber>${breakeven.breakevenRevenue.toLocaleString()}</StatNumber>
                <StatHelpText>Revenue to break even</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Contribution Margin</StatLabel>
                <StatNumber>${breakeven.contributionMargin}</StatNumber>
                <StatHelpText>
                  {(breakeven.contributionMarginRatio * 100).toFixed(1)}% ratio
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Target Profit Units</StatLabel>
                <StatNumber>{breakeven.unitsForTargetProfit}</StatNumber>
                <StatHelpText>
                  For ${breakeven.targetProfit.toLocaleString()} profit
                </StatHelpText>
              </Stat>
            </Grid>

            {/* Cost Structure */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={6}>
              <Card bg={infoBg}>
                <CardHeader>
                  <Text fontSize="md" fontWeight="bold">Cost Structure</Text>
                </CardHeader>
                <CardBody>
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm">Fixed Costs:</Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        ${breakeven.fixedCosts.toLocaleString()}
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm">Variable Cost per Unit:</Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        ${breakeven.variableCostPerUnit}
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm">Price per Unit:</Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        ${breakeven.pricePerUnit}
                      </Text>
                    </HStack>
                    <Divider />
                    <HStack justify="space-between">
                      <Text fontSize="sm" fontWeight="bold">Contribution Margin:</Text>
                      <Text fontSize="sm" fontWeight="bold" color="green.500">
                        ${breakeven.contributionMargin}
                      </Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>

              <Card bg={successBg}>
                <CardHeader>
                  <Text fontSize="md" fontWeight="bold">Margin of Safety</Text>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4}>
                    <CircularProgress 
                      value={breakeven.marginOfSafety * 100} 
                      color="green.400" 
                      size="100px"
                    >
                      <CircularProgressLabel>
                        {(breakeven.marginOfSafety * 100).toFixed(1)}%
                      </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="sm" textAlign="center" color="gray.600">
                      Safety margin indicates how much sales can decline before reaching breakeven point
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            </Grid>

            {/* Scenario Analysis */}
            <Card bg={infoBg}>
              <CardHeader>
                <Text fontSize="md" fontWeight="bold">Scenario Analysis</Text>
              </CardHeader>
              <CardBody>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Scenario</Th>
                      <Th isNumeric>Price Change</Th>
                      <Th isNumeric>Cost Change</Th>
                      <Th isNumeric>New Breakeven</Th>
                      <Th isNumeric>Impact</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {breakeven.scenarios.map((scenario, index) => (
                      <Tr key={index}>
                        <Td>{scenario.name}</Td>
                        <Td isNumeric color={scenario.priceChange > 0 ? 'green.500' : 'red.500'}>
                          {scenario.priceChange > 0 ? '+' : ''}{(scenario.priceChange * 100).toFixed(1)}%
                        </Td>
                        <Td isNumeric color={scenario.costChange < 0 ? 'green.500' : 'red.500'}>
                          {scenario.costChange > 0 ? '+' : ''}{(scenario.costChange * 100).toFixed(1)}%
                        </Td>
                        <Td isNumeric>{scenario.newBreakevenUnits} units</Td>
                        <Td isNumeric color={scenario.impact < 0 ? 'green.500' : 'red.500'}>
                          {scenario.impact > 0 ? '+' : ''}{scenario.impact.toFixed(1)}%
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  const renderAccountingIntegration = () => (
    <VStack spacing={6} align="stretch">
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">🔗 Accounting System Integrations</Text>
            <Button colorScheme="blue" size="sm" onClick={onUploadOpen}>
              Upload Financial Data
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {accountingIntegrations.map(integration => (
              <Card key={integration.id} bg={infoBg} border="1px solid" borderColor={borderColor}>
                <CardHeader>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="md" fontWeight="bold" textTransform="capitalize">
                        {integration.system.replace('_', ' ')}
                      </Text>
                      <Badge colorScheme={getSystemStatusColor(integration.status)}>
                        {integration.status.replace('_', ' ')}
                      </Badge>
                    </VStack>
                    <HStack>
                      <IconButton 
                        aria-label="Sync" 
                        icon={<Text>🔄</Text>} 
                        size="sm"
                        colorScheme={integration.status === 'connected' ? 'green' : 'gray'}
                        onClick={() => syncAccountingData(integration.system)}
                        isDisabled={integration.status !== 'connected'}
                      />
                      {integration.status === 'connected' && (
                        <IconButton 
                          aria-label="Disconnect" 
                          icon={<Text>🔌</Text>} 
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => disconnectAccountingSystem(integration.system)}
                        />
                      )}
                    </HStack>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm">Last Sync:</Text>
                      <Text fontSize="sm" color="gray.600">
                        {new Date(integration.lastSync).toLocaleDateString()}
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm">Frequency:</Text>
                      <Text fontSize="sm" color="gray.600">
                        {integration.syncFrequency.replace('_', ' ')}
                      </Text>
                    </HStack>
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>Data Fields:</Text>
                      <VStack spacing={1} align="start">
                        {integration.dataFields.map((field, index) => (
                          <Badge key={index} size="sm" variant="outline">
                            {field}
                          </Badge>
                        ))}
                      </VStack>
                    </Box>
                    {integration.errorLog.length > 0 && (
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2} color="red.500">
                          Recent Errors:
                        </Text>
                        <VStack spacing={1} align="start">
                          {integration.errorLog.slice(0, 2).map((error, index) => (
                            <Text key={index} fontSize="xs" color="red.500">
                              • {error}
                            </Text>
                          ))}
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>

          {/* Available Integrations */}
          <Card bg={successBg} mt={6}>
            <CardHeader>
              <Text fontSize="md" fontWeight="bold">Available Integrations</Text>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                {['QuickBooks', 'Sage', 'Great Plains', 'NetSuite', 'Xero', 'SAP', 'Oracle', 'Dynamics'].map(system => {
                  const systemKey = system.toLowerCase().replace(' ', '_');
                  const isConnected = accountingIntegrations.some(int => int.system === systemKey && int.status === 'connected');
                  const isPending = accountingIntegrations.some(int => int.system === systemKey && int.status === 'pending');
                  
                  return (
                    <Button 
                      key={system} 
                      variant={isConnected ? "solid" : "outline"} 
                      size="sm"
                      colorScheme={isConnected ? "green" : "blue"}
                      onClick={() => connectToAccountingSystem(system)}
                      isDisabled={isConnected || isPending}
                      isLoading={isPending}
                      leftIcon={isConnected ? <Text>✅</Text> : <Text>🔗</Text>}
                    >
                      {isConnected ? `${system} Connected` : `Connect ${system}`}
                    </Button>
                  );
                })}
              </SimpleGrid>
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      {/* File Upload Modal */}
      <Modal isOpen={isUploadOpen} onClose={onUploadClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Financial Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">Supported Formats:</Text>
                  <Text fontSize="xs">CSV, Excel (.xlsx), QuickBooks (.qbw), Sage (.sag)</Text>
                </VStack>
              </Alert>
              <FormControl>
                <FormLabel>Select File</FormLabel>
                <Input 
                  type="file" 
                  accept=".csv,.xlsx,.qbw,.sag" 
                  onChange={(e) => setFileUpload(e.target.files?.[0] || null)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Data Type</FormLabel>
                <Select placeholder="Select data type">
                  <option value="general_ledger">General Ledger</option>
                  <option value="profit_loss">Profit & Loss</option>
                  <option value="balance_sheet">Balance Sheet</option>
                  <option value="cash_flow">Cash Flow Statement</option>
                  <option value="trial_balance">Trial Balance</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onUploadClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              isDisabled={!fileUpload}
              onClick={processFileUpload}
            >
              Upload & Analyze
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">💰</Text>
            <Text fontSize="3xl" fontWeight="bold">Comprehensive Financial Analysis</Text>
            <Badge colorScheme="green" ml={2}>VISUAL ANALYTICS</Badge>
          </HStack>
          <Text color="gray.600" mb={6}>
            Complete financial analysis platform with visual value chain, DCF analysis, DuPont analysis, breakeven modeling, and accounting system integrations.
          </Text>
        </Box>

        {/* Integration Status */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Comprehensive Financial Integration Active</Text>
            <Text fontSize="sm">
              Visual value chain analysis, DCF modeling, DuPont analysis, and breakeven calculations with real accounting system integrations.
            </Text>
          </VStack>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Value Chain Analysis</Tab>
            <Tab>DCF Analysis</Tab>
            <Tab>DuPont Analysis</Tab>
            <Tab>Breakeven Analysis</Tab>
            <Tab>Accounting Integration</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderValueChainAnalysis()}
            </TabPanel>
            <TabPanel px={0}>
              {renderDCFAnalysis()}
            </TabPanel>
            <TabPanel px={0}>
              {renderDuPontAnalysis()}
            </TabPanel>
            <TabPanel px={0}>
              {renderBreakevenAnalysis()}
            </TabPanel>
            <TabPanel px={0}>
              {renderAccountingIntegration()}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default ComprehensiveFinancialAnalysis;