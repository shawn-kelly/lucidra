import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Textarea,
  Alert,
  AlertIcon,
  Progress,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
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
  Checkbox,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

// Financial Analysis Types
interface FinancialData {
  revenue: number;
  cogs: number;
  operatingExpenses: number;
  assets: number;
  liabilities: number;
  equity: number;
  cashFlow: number;
  investments: number;
  period: string;
  region: string;
}

interface MarketData {
  region: string;
  gdp: number;
  inflation: number;
  interestRate: number;
  exchangeRate: number;
  marketSize: number;
  growth: number;
  lastUpdated: string;
}

interface DuPontAnalysis {
  profitMargin: number;
  assetTurnover: number;
  equityMultiplier: number;
  roe: number;
  roa: number;
}

interface ActivityBasedCost {
  activity: string;
  cost: number;
  driver: string;
  allocation: number;
}

interface IRRCalculation {
  initialInvestment: number;
  cashFlows: number[];
  irr: number;
  npv: number;
  paybackPeriod: number;
}

interface BreakEvenAnalysis {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
}

// Global Market Regions
const GLOBAL_REGIONS = [
  { code: 'caribbean', name: 'Caribbean', currency: 'USD' },
  { code: 'americas', name: 'Americas', currency: 'USD' },
  { code: 'europe', name: 'Europe', currency: 'EUR' },
  { code: 'asia', name: 'Asia Pacific', currency: 'USD' },
  { code: 'australia', name: 'Australia', currency: 'AUD' },
  { code: 'india', name: 'India', currency: 'INR' }
];

// Demo Market Data
const DEMO_MARKET_DATA: MarketData[] = [
  {
    region: 'Caribbean',
    gdp: 890000000000,
    inflation: 3.2,
    interestRate: 4.5,
    exchangeRate: 1.0,
    marketSize: 45000000000,
    growth: 2.8,
    lastUpdated: new Date().toISOString()
  },
  {
    region: 'Americas',
    gdp: 24000000000000,
    inflation: 2.8,
    interestRate: 5.25,
    exchangeRate: 1.0,
    marketSize: 8500000000000,
    growth: 3.2,
    lastUpdated: new Date().toISOString()
  },
  {
    region: 'Europe',
    gdp: 18000000000000,
    inflation: 2.1,
    interestRate: 4.0,
    exchangeRate: 0.92,
    marketSize: 6200000000000,
    growth: 1.8,
    lastUpdated: new Date().toISOString()
  },
  {
    region: 'Asia Pacific',
    gdp: 28000000000000,
    inflation: 2.5,
    interestRate: 3.8,
    exchangeRate: 1.0,
    marketSize: 12000000000000,
    growth: 5.2,
    lastUpdated: new Date().toISOString()
  },
  {
    region: 'Australia',
    gdp: 1400000000000,
    inflation: 3.8,
    interestRate: 4.35,
    exchangeRate: 1.48,
    marketSize: 425000000000,
    growth: 2.3,
    lastUpdated: new Date().toISOString()
  },
  {
    region: 'India',
    gdp: 3700000000000,
    inflation: 5.8,
    interestRate: 6.5,
    exchangeRate: 82.5,
    marketSize: 1850000000000,
    growth: 6.8,
    lastUpdated: new Date().toISOString()
  }
];

// Financial Analysis Component
const FinancialFrameworks: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('americas');
  const [financialData, setFinancialData] = useState<FinancialData>({
    revenue: 1000000,
    cogs: 600000,
    operatingExpenses: 200000,
    assets: 800000,
    liabilities: 300000,
    equity: 500000,
    cashFlow: 200000,
    investments: 100000,
    period: 'Q1 2025',
    region: 'americas'
  });

  const [dupontAnalysis, setDupontAnalysis] = useState<DuPontAnalysis | null>(null);
  const [abcData, setAbcData] = useState<ActivityBasedCost[]>([]);
  const [irrData, setIrrData] = useState<IRRCalculation | null>(null);
  const [breakEvenData, setBreakEvenData] = useState<BreakEvenAnalysis | null>(null);
  const [marketData, setMarketData] = useState<MarketData[]>(DEMO_MARKET_DATA);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('gray.50', 'gray.700');

  // Calculate DuPont Analysis
  useEffect(() => {
    if (financialData.revenue > 0 && financialData.assets > 0 && financialData.equity > 0) {
      const netIncome = financialData.revenue - financialData.cogs - financialData.operatingExpenses;
      const profitMargin = (netIncome / financialData.revenue) * 100;
      const assetTurnover = financialData.revenue / financialData.assets;
      const equityMultiplier = financialData.assets / financialData.equity;
      const roe = profitMargin * assetTurnover * equityMultiplier / 100;
      const roa = (netIncome / financialData.assets) * 100;

      setDupontAnalysis({
        profitMargin,
        assetTurnover,
        equityMultiplier,
        roe,
        roa
      });
    }
  }, [financialData]);

  // Calculate Break-Even Analysis
  const calculateBreakEven = () => {
    const fixedCosts = financialData.operatingExpenses;
    const variableCostPerUnit = financialData.cogs / 1000; // Assuming 1000 units for demo
    const pricePerUnit = financialData.revenue / 1000; // Assuming 1000 units for demo
    
    if (pricePerUnit > variableCostPerUnit) {
      const breakEvenUnits = fixedCosts / (pricePerUnit - variableCostPerUnit);
      const breakEvenRevenue = breakEvenUnits * pricePerUnit;
      
      setBreakEvenData({
        fixedCosts,
        variableCostPerUnit,
        pricePerUnit,
        breakEvenUnits,
        breakEvenRevenue
      });
    }
  };

  // Calculate IRR (simplified)
  const calculateIRR = () => {
    const initialInvestment = financialData.investments;
    const cashFlows = [
      financialData.cashFlow * 0.8,
      financialData.cashFlow * 1.0,
      financialData.cashFlow * 1.2,
      financialData.cashFlow * 1.1,
      financialData.cashFlow * 1.3
    ];
    
    // Simplified IRR calculation (would use proper financial formulas in production)
    const totalCashFlow = cashFlows.reduce((sum, cf) => sum + cf, 0);
    const irr = ((totalCashFlow / initialInvestment) ** (1/5) - 1) * 100;
    const npv = cashFlows.reduce((sum, cf, i) => sum + cf / Math.pow(1.1, i + 1), 0) - initialInvestment;
    const paybackPeriod = initialInvestment / (totalCashFlow / 5);
    
    setIrrData({
      initialInvestment,
      cashFlows,
      irr,
      npv,
      paybackPeriod
    });
  };

  // Initialize ABC Data
  useEffect(() => {
    setAbcData([
      { activity: 'Production', cost: financialData.cogs * 0.6, driver: 'Machine Hours', allocation: 60 },
      { activity: 'Quality Control', cost: financialData.cogs * 0.2, driver: 'Inspections', allocation: 20 },
      { activity: 'Packaging', cost: financialData.cogs * 0.1, driver: 'Units Produced', allocation: 10 },
      { activity: 'Shipping', cost: financialData.cogs * 0.1, driver: 'Shipments', allocation: 10 }
    ]);
  }, [financialData.cogs]);

  const currentMarketData = marketData.find(m => m.region === selectedRegion) || marketData[0];

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" mb={4}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">💰 Financial Analysis Framework</Text>
              <Text color="gray.600">Comprehensive financial analysis with global market integration</Text>
            </Box>
            <HStack>
              <Select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                {GLOBAL_REGIONS.map(region => (
                  <option key={region.code} value={region.code}>{region.name}</option>
                ))}
              </Select>
              <Button colorScheme="blue" onClick={onOpen}>Import Data</Button>
            </HStack>
          </HStack>
        </Box>

        {/* Market Data Overview */}
        <Card bg={cardBg}>
          <CardHeader bg={headerBg}>
            <Text fontSize="lg" fontWeight="bold">🌍 Global Market Data - {currentMarketData.region}</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(6, 1fr)" gap={4}>
              <Stat>
                <StatLabel>GDP</StatLabel>
                <StatNumber>${(currentMarketData.gdp / 1000000000000).toFixed(1)}T</StatNumber>
                <StatHelpText>Trillion USD</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Inflation</StatLabel>
                <StatNumber>{currentMarketData.inflation}%</StatNumber>
                <StatHelpText>
                  <StatArrow type={currentMarketData.inflation > 3 ? 'increase' : 'decrease'} />
                  Annual Rate
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Interest Rate</StatLabel>
                <StatNumber>{currentMarketData.interestRate}%</StatNumber>
                <StatHelpText>Central Bank</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Market Size</StatLabel>
                <StatNumber>${(currentMarketData.marketSize / 1000000000).toFixed(0)}B</StatNumber>
                <StatHelpText>Billion USD</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Growth Rate</StatLabel>
                <StatNumber>{currentMarketData.growth}%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Annual Growth
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Exchange Rate</StatLabel>
                <StatNumber>{currentMarketData.exchangeRate}</StatNumber>
                <StatHelpText>vs USD</StatHelpText>
              </Stat>
            </Grid>
          </CardBody>
        </Card>

        {/* Financial Analysis Tabs */}
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>📊 DuPont Analysis</Tab>
            <Tab>🎯 Activity-Based Costing</Tab>
            <Tab>📈 IRR & NPV</Tab>
            <Tab>⚖️ Break-Even Analysis</Tab>
            <Tab>📋 Data Input</Tab>
          </TabList>

          <TabPanels>
            {/* DuPont Analysis */}
            <TabPanel>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">DuPont Analysis</Text>
                  <Text fontSize="sm" color="gray.600">
                    Decompose ROE into profit margin, asset turnover, and financial leverage
                  </Text>
                </CardHeader>
                <CardBody>
                  {dupontAnalysis ? (
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="blue.500">Profit Margin</Text>
                        <Text fontSize="2xl" fontWeight="bold">{dupontAnalysis.profitMargin.toFixed(2)}%</Text>
                        <Text fontSize="xs" color="gray.600">Net Income / Revenue</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="green.500">Asset Turnover</Text>
                        <Text fontSize="2xl" fontWeight="bold">{dupontAnalysis.assetTurnover.toFixed(2)}x</Text>
                        <Text fontSize="xs" color="gray.600">Revenue / Assets</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="purple.500">Equity Multiplier</Text>
                        <Text fontSize="2xl" fontWeight="bold">{dupontAnalysis.equityMultiplier.toFixed(2)}x</Text>
                        <Text fontSize="xs" color="gray.600">Assets / Equity</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="orange.500">ROE</Text>
                        <Text fontSize="2xl" fontWeight="bold">{dupontAnalysis.roe.toFixed(2)}%</Text>
                        <Text fontSize="xs" color="gray.600">Return on Equity</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="red.500">ROA</Text>
                        <Text fontSize="2xl" fontWeight="bold">{dupontAnalysis.roa.toFixed(2)}%</Text>
                        <Text fontSize="xs" color="gray.600">Return on Assets</Text>
                      </Box>
                    </Grid>
                  ) : (
                    <Alert status="info">
                      <AlertIcon />
                      <Text>Enter financial data to calculate DuPont Analysis</Text>
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </TabPanel>

            {/* Activity-Based Costing */}
            <TabPanel>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">Activity-Based Costing</Text>
                  <Text fontSize="sm" color="gray.600">
                    Allocate costs based on activities that drive expenses
                  </Text>
                </CardHeader>
                <CardBody>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Activity</Th>
                        <Th>Cost</Th>
                        <Th>Driver</Th>
                        <Th>Allocation %</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {abcData.map((item, index) => (
                        <Tr key={index}>
                          <Td>{item.activity}</Td>
                          <Td>${item.cost.toLocaleString()}</Td>
                          <Td>{item.driver}</Td>
                          <Td>{item.allocation}%</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            </TabPanel>

            {/* IRR & NPV */}
            <TabPanel>
              <Card bg={cardBg}>
                <CardHeader>
                  <HStack justify="space-between">
                    <Box>
                      <Text fontSize="lg" fontWeight="bold">IRR & NPV Analysis</Text>
                      <Text fontSize="sm" color="gray.600">
                        Internal Rate of Return and Net Present Value calculations
                      </Text>
                    </Box>
                    <Button colorScheme="blue" onClick={calculateIRR}>Calculate IRR</Button>
                  </HStack>
                </CardHeader>
                <CardBody>
                  {irrData ? (
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="blue.500">IRR</Text>
                        <Text fontSize="2xl" fontWeight="bold">{irrData.irr.toFixed(2)}%</Text>
                        <Text fontSize="xs" color="gray.600">Internal Rate of Return</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="green.500">NPV</Text>
                        <Text fontSize="2xl" fontWeight="bold">${irrData.npv.toLocaleString()}</Text>
                        <Text fontSize="xs" color="gray.600">Net Present Value</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="purple.500">Payback Period</Text>
                        <Text fontSize="2xl" fontWeight="bold">{irrData.paybackPeriod.toFixed(1)} years</Text>
                        <Text fontSize="xs" color="gray.600">Investment Recovery</Text>
                      </Box>
                    </Grid>
                  ) : (
                    <Alert status="info">
                      <AlertIcon />
                      <Text>Click "Calculate IRR" to perform investment analysis</Text>
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </TabPanel>

            {/* Break-Even Analysis */}
            <TabPanel>
              <Card bg={cardBg}>
                <CardHeader>
                  <HStack justify="space-between">
                    <Box>
                      <Text fontSize="lg" fontWeight="bold">Break-Even Analysis</Text>
                      <Text fontSize="sm" color="gray.600">
                        Calculate the point where revenues equal costs
                      </Text>
                    </Box>
                    <Button colorScheme="blue" onClick={calculateBreakEven}>Calculate Break-Even</Button>
                  </HStack>
                </CardHeader>
                <CardBody>
                  {breakEvenData ? (
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="blue.500">Break-Even Units</Text>
                        <Text fontSize="2xl" fontWeight="bold">{breakEvenData.breakEvenUnits.toFixed(0)}</Text>
                        <Text fontSize="xs" color="gray.600">Units to break even</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="green.500">Break-Even Revenue</Text>
                        <Text fontSize="2xl" fontWeight="bold">${breakEvenData.breakEvenRevenue.toLocaleString()}</Text>
                        <Text fontSize="xs" color="gray.600">Revenue to break even</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="purple.500">Fixed Costs</Text>
                        <Text fontSize="2xl" fontWeight="bold">${breakEvenData.fixedCosts.toLocaleString()}</Text>
                        <Text fontSize="xs" color="gray.600">Operating expenses</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="orange.500">Variable Cost per Unit</Text>
                        <Text fontSize="2xl" fontWeight="bold">${breakEvenData.variableCostPerUnit.toFixed(2)}</Text>
                        <Text fontSize="xs" color="gray.600">Cost per unit</Text>
                      </Box>
                    </Grid>
                  ) : (
                    <Alert status="info">
                      <AlertIcon />
                      <Text>Click "Calculate Break-Even" to perform break-even analysis</Text>
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </TabPanel>

            {/* Data Input */}
            <TabPanel>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">Financial Data Input</Text>
                  <Text fontSize="sm" color="gray.600">
                    Enter your financial data for analysis
                  </Text>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl>
                      <FormLabel>Revenue</FormLabel>
                      <NumberInput value={financialData.revenue} onChange={(val) => setFinancialData(prev => ({ ...prev, revenue: parseInt(val) || 0 }))}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Cost of Goods Sold</FormLabel>
                      <NumberInput value={financialData.cogs} onChange={(val) => setFinancialData(prev => ({ ...prev, cogs: parseInt(val) || 0 }))}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Operating Expenses</FormLabel>
                      <NumberInput value={financialData.operatingExpenses} onChange={(val) => setFinancialData(prev => ({ ...prev, operatingExpenses: parseInt(val) || 0 }))}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Total Assets</FormLabel>
                      <NumberInput value={financialData.assets} onChange={(val) => setFinancialData(prev => ({ ...prev, assets: parseInt(val) || 0 }))}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Total Liabilities</FormLabel>
                      <NumberInput value={financialData.liabilities} onChange={(val) => setFinancialData(prev => ({ ...prev, liabilities: parseInt(val) || 0 }))}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Equity</FormLabel>
                      <NumberInput value={financialData.equity} onChange={(val) => setFinancialData(prev => ({ ...prev, equity: parseInt(val) || 0 }))}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Cash Flow</FormLabel>
                      <NumberInput value={financialData.cashFlow} onChange={(val) => setFinancialData(prev => ({ ...prev, cashFlow: parseInt(val) || 0 }))}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Investments</FormLabel>
                      <NumberInput value={financialData.investments} onChange={(val) => setFinancialData(prev => ({ ...prev, investments: parseInt(val) || 0 }))}>
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                  </Grid>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Data Import Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import Financial Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Alert status="info">
                <AlertIcon />
                <Text>Connect to external financial data sources or upload reports</Text>
              </Alert>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <Button colorScheme="blue" variant="outline">
                  📊 Upload Excel/CSV
                </Button>
                <Button colorScheme="green" variant="outline">
                  🔗 Connect API
                </Button>
                <Button colorScheme="purple" variant="outline">
                  📈 Yahoo Finance
                </Button>
                <Button colorScheme="orange" variant="outline">
                  🏦 Banking Data
                </Button>
              </Grid>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FinancialFrameworks;