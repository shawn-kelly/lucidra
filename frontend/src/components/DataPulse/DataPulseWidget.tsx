import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  VStack, 
  HStack, 
  Badge, 
  Progress, 
  Select, 
  Checkbox, 
  Grid, 
  GridItem,
  useColorModeValue,
  Alert,
  AlertIcon,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackDivider
} from '@chakra-ui/react';

/**
 * DataPulseWidget - Real-time market intelligence dashboard
 * 
 * Features:
 * - Live market signals from social, financial, and product sources
 * - Multi-dimensional filtering (region, sector, signal type)
 * - Strategic Matchmaker for complementary product suggestions
 * - Real-time updates every 10 seconds
 */

// Types for market signals
interface MarketSignal {
  id: string;
  type: 'social' | 'financial' | 'product';
  title: string;
  description: string;
  value: number;
  change: number;
  region: string;
  sector: string;
  timestamp: string;
  confidence: number;
  tags: string[];
}

interface StrategicMatch {
  id: string;
  productName: string;
  matchScore: number;
  reasoning: string;
  marketOpportunity: string;
  estimatedRevenue: string;
  timeToMarket: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface DataPulseFilters {
  regions: string[];
  sectors: string[];
  signalTypes: ('social' | 'financial' | 'product')[];
  timeRange: '1h' | '24h' | '7d' | '30d';
}

// Mock data for demonstration
const mockSignals: MarketSignal[] = [
  {
    id: '1',
    type: 'social',
    title: 'AI Automation Buzz Surge',
    description: 'Massive social media discussion spike around AI workflow automation',
    value: 85,
    change: 23.5,
    region: 'North America',
    sector: 'Technology',
    timestamp: '2024-01-15T14:30:00Z',
    confidence: 92,
    tags: ['AI', 'automation', 'productivity']
  },
  {
    id: '2',
    type: 'financial',
    title: 'FinTech Volatility Alert',
    description: 'High volatility detected in payment processing stocks',
    value: 67,
    change: -12.3,
    region: 'Global',
    sector: 'Financial Services',
    timestamp: '2024-01-15T14:25:00Z',
    confidence: 88,
    tags: ['payments', 'volatility', 'disruption']
  },
  {
    id: '3',
    type: 'product',
    title: 'Sustainable Packaging Trend',
    description: 'Eco-friendly packaging products showing 340% growth',
    value: 94,
    change: 45.2,
    region: 'Europe',
    sector: 'Consumer Goods',
    timestamp: '2024-01-15T14:20:00Z',
    confidence: 95,
    tags: ['sustainability', 'packaging', 'growth']
  },
  {
    id: '4',
    type: 'social',
    title: 'Remote Work Tools Demand',
    description: 'Growing interest in productivity tools for distributed teams',
    value: 78,
    change: 18.7,
    region: 'Global',
    sector: 'Technology',
    timestamp: '2024-01-15T14:15:00Z',
    confidence: 83,
    tags: ['remote-work', 'productivity', 'collaboration']
  }
];

const mockMatches: StrategicMatch[] = [
  {
    id: '1',
    productName: 'AI-Powered Customer Service Bot',
    matchScore: 94,
    reasoning: 'Strong correlation with AI automation social buzz and customer service pain points',
    marketOpportunity: 'Small businesses struggling with 24/7 customer support',
    estimatedRevenue: '$50K-200K/year',
    timeToMarket: '3-6 months',
    riskLevel: 'medium'
  },
  {
    id: '2',
    productName: 'Micro-Payment Processing API',
    matchScore: 87,
    reasoning: 'FinTech volatility creates opportunity for simplified payment solutions',
    marketOpportunity: 'Creator economy and micropayment market',
    estimatedRevenue: '$100K-500K/year',
    timeToMarket: '6-12 months',
    riskLevel: 'high'
  },
  {
    id: '3',
    productName: 'Biodegradable Shipping Materials',
    matchScore: 91,
    reasoning: 'Direct alignment with sustainable packaging trend surge',
    marketOpportunity: 'E-commerce businesses seeking eco-friendly solutions',
    estimatedRevenue: '$75K-300K/year',
    timeToMarket: '4-8 months',
    riskLevel: 'low'
  }
];

export const DataPulseWidget: React.FC = () => {
  const [signals, setSignals] = useState<MarketSignal[]>(mockSignals);
  const [matches, setMatches] = useState<StrategicMatch[]>(mockMatches);
  const [filters, setFilters] = useState<DataPulseFilters>({
    regions: [],
    sectors: [],
    signalTypes: [],
    timeRange: '24h'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setSignals(prev => prev.map(signal => ({
        ...signal,
        value: Math.max(0, Math.min(100, signal.value + (Math.random() - 0.5) * 5)),
        change: (Math.random() - 0.5) * 20
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Fetch fresh data
  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdate(new Date());
    setIsLoading(false);
  }, []);

  // Filter signals
  const filteredSignals = signals.filter(signal => {
    if (filters.regions.length > 0 && !filters.regions.includes(signal.region)) return false;
    if (filters.sectors.length > 0 && !filters.sectors.includes(signal.sector)) return false;
    if (filters.signalTypes.length > 0 && !filters.signalTypes.includes(signal.type)) return false;
    return true;
  });

  // Get unique values for filters
  const availableRegions = [...new Set(signals.map(s => s.region))];
  const availableSectors = [...new Set(signals.map(s => s.sector))];

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'social': return '🌐';
      case 'financial': return '💰';
      case 'product': return '📦';
      default: return '⚡';
    }
  };

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'social': return 'blue';
      case 'financial': return 'green';
      case 'product': return 'purple';
      default: return 'gray';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'green';
      case 'medium': return 'yellow';
      case 'high': return 'red';
      default: return 'gray';
    }
  };

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: checked 
        ? [...prev[filterType as keyof DataPulseFilters], value]
        : (prev[filterType as keyof DataPulseFilters] as string[]).filter(item => item !== value)
    }));
  };

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <HStack spacing={3} mb={2}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.900">
              🌊 Data Pulse Intelligence
            </Text>
            <Box 
              w="3" 
              h="3" 
              borderRadius="full" 
              bg={isConnected ? 'green.400' : 'red.400'}
              className={isConnected ? 'animate-pulse' : ''}
            />
          </HStack>
          <Text color="gray.600">
            Real-time market signals and strategic opportunities
          </Text>
        </Box>
        <VStack align="end" spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Last update: {lastUpdate.toLocaleTimeString()}
          </Text>
          <Button
            onClick={refreshData}
            isLoading={isLoading}
            colorScheme="teal"
            size="sm"
          >
            🔄 Refresh
          </Button>
        </VStack>
      </Flex>

      {/* Filters */}
      <Card mb={6}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="semibold">
            🔍 Filters
          </Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
            {/* Signal Types */}
            <Box>
              <Text fontWeight="medium" mb={2}>Signal Types</Text>
              <VStack align="start" spacing={2}>
                {(['social', 'financial', 'product'] as const).map(type => (
                  <Checkbox
                    key={type}
                    isChecked={filters.signalTypes.includes(type)}
                    onChange={(e) => handleFilterChange('signalTypes', type, e.target.checked)}
                  >
                    <Text fontSize="sm" textTransform="capitalize">{type}</Text>
                  </Checkbox>
                ))}
              </VStack>
            </Box>

            {/* Regions */}
            <Box>
              <Text fontWeight="medium" mb={2}>Regions</Text>
              <VStack align="start" spacing={2}>
                {availableRegions.map(region => (
                  <Checkbox
                    key={region}
                    isChecked={filters.regions.includes(region)}
                    onChange={(e) => handleFilterChange('regions', region, e.target.checked)}
                  >
                    <Text fontSize="sm">{region}</Text>
                  </Checkbox>
                ))}
              </VStack>
            </Box>

            {/* Sectors */}
            <Box>
              <Text fontWeight="medium" mb={2}>Sectors</Text>
              <VStack align="start" spacing={2}>
                {availableSectors.map(sector => (
                  <Checkbox
                    key={sector}
                    isChecked={filters.sectors.includes(sector)}
                    onChange={(e) => handleFilterChange('sectors', sector, e.target.checked)}
                  >
                    <Text fontSize="sm">{sector}</Text>
                  </Checkbox>
                ))}
              </VStack>
            </Box>

            {/* Time Range */}
            <Box>
              <Text fontWeight="medium" mb={2}>Time Range</Text>
              <Select
                value={filters.timeRange}
                onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value as any }))}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </Select>
            </Box>
          </Grid>
        </CardBody>
      </Card>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        {/* Market Signals Panel */}
        <GridItem>
          <Card>
            <CardHeader>
              <Text fontSize="lg" fontWeight="semibold">
                📊 Live Market Signals
              </Text>
            </CardHeader>
            <CardBody>
              {filteredSignals.length === 0 ? (
                <Alert status="info">
                  <AlertIcon />
                  No signals match your current filters
                </Alert>
              ) : (
                <VStack spacing={4} align="stretch">
                  {filteredSignals.map(signal => (
                    <Box
                      key={signal.id}
                      p={4}
                      bg={bgColor}
                      borderRadius="md"
                      border="1px"
                      borderColor={borderColor}
                      _hover={{ shadow: 'md' }}
                    >
                      <HStack justify="space-between" align="start">
                        <Box flex={1}>
                          <HStack spacing={3} mb={2}>
                            <Text fontSize="xl">
                              {getSignalIcon(signal.type)}
                            </Text>
                            <Box>
                              <Text fontWeight="semibold">{signal.title}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {signal.description}
                              </Text>
                            </Box>
                          </HStack>
                          
                          <HStack spacing={4} fontSize="sm" color="gray.600" mb={2}>
                            <Text>{signal.region}</Text>
                            <Text>•</Text>
                            <Text>{signal.sector}</Text>
                            <Text>•</Text>
                            <Text>Confidence: {signal.confidence}%</Text>
                          </HStack>
                          
                          <HStack spacing={2}>
                            {signal.tags.map(tag => (
                              <Badge key={tag} size="sm" colorScheme="gray">
                                {tag}
                              </Badge>
                            ))}
                          </HStack>
                        </Box>
                        
                        <Box textAlign="right">
                          <Text fontSize="2xl" fontWeight="bold">
                            {signal.value.toFixed(0)}
                          </Text>
                          <HStack spacing={1}>
                            <Text color={signal.change >= 0 ? 'green.500' : 'red.500'}>
                              {signal.change >= 0 ? '↗' : '↘'}
                            </Text>
                            <Text 
                              fontSize="sm" 
                              color={signal.change >= 0 ? 'green.500' : 'red.500'}
                            >
                              {Math.abs(signal.change).toFixed(1)}%
                            </Text>
                          </HStack>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              )}
            </CardBody>
          </Card>
        </GridItem>

        {/* Strategic Matchmaker Panel */}
        <GridItem>
          <Card>
            <CardHeader>
              <HStack spacing={2}>
                <Text fontSize="xl">🎯</Text>
                <Text fontSize="lg" fontWeight="semibold">
                  Strategic Matchmaker
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                AI-powered product opportunities based on current market signals
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {matches.map(match => (
                  <Box
                    key={match.id}
                    p={4}
                    bg={bgColor}
                    borderRadius="md"
                    border="1px"
                    borderColor={borderColor}
                    _hover={{ shadow: 'md' }}
                  >
                    <HStack justify="space-between" align="start" mb={3}>
                      <Text fontWeight="semibold" fontSize="sm" flex={1}>
                        {match.productName}
                      </Text>
                      <VStack align="end" spacing={0}>
                        <Text fontSize="lg" fontWeight="bold" color="teal.500">
                          {match.matchScore}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          % match
                        </Text>
                      </VStack>
                    </HStack>
                    
                    <Text fontSize="sm" color="gray.600" mb={3}>
                      {match.reasoning}
                    </Text>
                    
                    <VStack spacing={2} align="stretch" fontSize="xs">
                      <HStack justify="space-between">
                        <Text color="gray.500">Market:</Text>
                        <Text fontWeight="medium">{match.marketOpportunity}</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.500">Revenue:</Text>
                        <Text fontWeight="medium">{match.estimatedRevenue}</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.500">Time:</Text>
                        <Text fontWeight="medium">{match.timeToMarket}</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.500">Risk:</Text>
                        <Badge 
                          size="sm" 
                          colorScheme={getRiskColor(match.riskLevel)}
                        >
                          {match.riskLevel}
                        </Badge>
                      </HStack>
                    </VStack>
                    
                    <Button
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                      width="full"
                      mt={3}
                    >
                      Explore Opportunity →
                    </Button>
                  </Box>
                ))}
              </VStack>
              
              <Alert status="info" mt={4} borderRadius="md">
                <AlertIcon />
                <Box>
                  <Text fontWeight="bold" fontSize="sm">
                    Pro Tip
                  </Text>
                  <Text fontSize="xs">
                    Strategic matches update in real-time based on signal strength and market momentum.
                  </Text>
                </Box>
              </Alert>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};