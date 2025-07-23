import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Avatar,
  AvatarGroup,
  Tooltip,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Select,
  Switch,
  FormControl,
  FormLabel,
  Divider,
  Grid,
  GridItem,
  CircularProgress,
  CircularProgressLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast
} from '@chakra-ui/react';
import {
  FaChartLine,
  FaTwitter,
  FaReddit,
  FaNewspaper,
  FaDollarSign,
  FaBitcoin,
  FaShoppingCart,
  FaArrowUp,
  FaArrowDown,
  FaRefresh,
  FaCog,
  FaExpand,
  FaFilter,
  FaExternalLinkAlt,
  FaBell,
  FaHeart,
  FaShare,
  FaComment,
  FaRetweet,
  FaEye,
  FaFire,
  FaChartBar,
  FaTrendingUp,
  FaTrendingDown
} from 'react-icons/fa';
import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  Filler
);

interface DataPulseWidgetProps {
  widgetId: string;
  title: string;
  type: 'social' | 'financial' | 'product' | 'mixed';
  size: 'small' | 'medium' | 'large';
  refreshInterval?: number;
  config?: any;
  onConfigChange?: (config: any) => void;
  onExpand?: () => void;
}

interface SignalData {
  id: string;
  type: 'social' | 'financial' | 'product';
  source: string;
  content: string;
  timestamp: string;
  sentiment: number;
  engagement: number;
  metadata: any;
}

interface TrendData {
  keyword: string;
  volume: number;
  growth: number;
  sentiment: number;
  sources: string[];
}

interface MetricData {
  label: string;
  value: number;
  change: number;
  format: 'number' | 'percentage' | 'currency';
}

const DataPulseWidget: React.FC<DataPulseWidgetProps> = ({
  widgetId,
  title,
  type,
  size,
  refreshInterval = 30000,
  config,
  onConfigChange,
  onExpand
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signals, setSignals] = useState<SignalData[]>([]);
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtextColor = useColorModeValue('gray.600', 'gray.400');

  // Fetch data from API
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate mock data based on widget type
      const mockSignals = generateMockSignals(type);
      const mockTrends = generateMockTrends(type);
      const mockMetrics = generateMockMetrics(type);

      setSignals(mockSignals);
      setTrends(mockTrends);
      setMetrics(mockMetrics);
      setLastUpdate(new Date());

    } catch (error) {
      setError('Failed to fetch data');
      toast({
        title: 'Data Fetch Error',
        description: 'Failed to update widget data',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [type, toast]);

  // Auto-refresh effect
  useEffect(() => {
    fetchData();
    
    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, autoRefresh, refreshInterval]);

  // Generate mock data functions
  const generateMockSignals = (type: string): SignalData[] => {
    const sources = {
      social: ['twitter', 'reddit', 'linkedin', 'news'],
      financial: ['yahoo_finance', 'alpha_vantage', 'bloomberg', 'reuters'],
      product: ['google_trends', 'amazon', 'shopify', 'ebay']
    };

    const mockData: SignalData[] = [];
    const sourceList = sources[type as keyof typeof sources] || sources.social;

    for (let i = 0; i < 10; i++) {
      mockData.push({
        id: `signal_${i}`,
        type: type as any,
        source: sourceList[i % sourceList.length],
        content: generateMockContent(type),
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
        sentiment: Math.random() * 2 - 1, // -1 to 1
        engagement: Math.random() * 1000,
        metadata: {
          author: `user_${i}`,
          reach: Math.floor(Math.random() * 10000),
          shares: Math.floor(Math.random() * 100)
        }
      });
    }

    return mockData;
  };

  const generateMockTrends = (type: string): TrendData[] => {
    const keywords = {
      social: ['AI revolution', 'climate change', 'remote work', 'cryptocurrency', 'metaverse'],
      financial: ['Fed rates', 'inflation', 'tech stocks', 'oil prices', 'bond yields'],
      product: ['iPhone 15', 'Tesla Model Y', 'ChatGPT Plus', 'Nintendo Switch', 'AirPods Pro']
    };

    const keywordList = keywords[type as keyof typeof keywords] || keywords.social;

    return keywordList.map((keyword, index) => ({
      keyword,
      volume: Math.floor(Math.random() * 100000) + 1000,
      growth: (Math.random() - 0.5) * 50, // -25% to +25%
      sentiment: Math.random() * 2 - 1,
      sources: ['twitter', 'reddit', 'news'].slice(0, Math.floor(Math.random() * 3) + 1)
    }));
  };

  const generateMockMetrics = (type: string): MetricData[] => {
    const metrics = {
      social: [
        { label: 'Total Mentions', value: 45230, change: 12.5, format: 'number' as const },
        { label: 'Avg Sentiment', value: 0.65, change: 8.2, format: 'number' as const },
        { label: 'Engagement Rate', value: 4.8, change: -2.1, format: 'percentage' as const },
        { label: 'Viral Score', value: 78, change: 15.3, format: 'number' as const }
      ],
      financial: [
        { label: 'Market Cap', value: 2.8e12, change: 3.2, format: 'currency' as const },
        { label: 'Volume', value: 1.2e9, change: -5.7, format: 'number' as const },
        { label: 'Volatility', value: 18.5, change: 22.1, format: 'percentage' as const },
        { label: 'RSI', value: 65.3, change: 4.8, format: 'number' as const }
      ],
      product: [
        { label: 'Search Volume', value: 125000, change: 25.3, format: 'number' as const },
        { label: 'Price Trend', value: 899.99, change: -3.2, format: 'currency' as const },
        { label: 'Availability', value: 92, change: -8.5, format: 'percentage' as const },
        { label: 'Review Score', value: 4.2, change: 0.3, format: 'number' as const }
      ]
    };

    return metrics[type as keyof typeof metrics] || metrics.social;
  };

  const generateMockContent = (type: string): string => {
    const content = {
      social: [
        'Excited about the new AI developments! This could change everything.',
        'The latest climate report is concerning. We need immediate action.',
        'Remote work is here to stay. Companies need to adapt quickly.',
        'Cryptocurrency market showing interesting patterns today.',
        'The metaverse concept is evolving faster than expected.'
      ],
      financial: [
        'Fed decision impacts market sentiment significantly.',
        'Inflation data suggests economic slowdown ahead.',
        'Tech stocks showing resilience despite volatility.',
        'Oil prices react to geopolitical tensions.',
        'Bond yields indicate investor caution.'
      ],
      product: [
        'iPhone 15 pre-orders exceed expectations.',
        'Tesla Model Y maintains strong demand.',
        'ChatGPT Plus subscriptions growing rapidly.',
        'Nintendo Switch sales remain steady.',
        'AirPods Pro reviews highlight improved features.'
      ]
    };

    const contentList = content[type as keyof typeof content] || content.social;
    return contentList[Math.floor(Math.random() * contentList.length)];
  };

  // Chart data generation
  const getChartData = () => {
    if (type === 'social') {
      return {
        labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
        datasets: [
          {
            label: 'Sentiment',
            data: [0.2, 0.4, 0.1, 0.6, 0.3, 0.7],
            borderColor: '#1FE0C4',
            backgroundColor: 'rgba(31, 224, 196, 0.1)',
            fill: true
          },
          {
            label: 'Volume',
            data: [100, 150, 80, 200, 120, 250],
            borderColor: '#6C75F8',
            backgroundColor: 'rgba(108, 117, 248, 0.1)',
            fill: true
          }
        ]
      };
    } else if (type === 'financial') {
      return {
        labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM'],
        datasets: [
          {
            label: 'Price',
            data: [150, 155, 148, 162, 158, 165],
            borderColor: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            fill: true
          }
        ]
      };
    } else {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Search Interest',
            data: [65, 78, 85, 92],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true
          }
        ]
      };
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'twitter': return <FaTwitter color="#1DA1F2" />;
      case 'reddit': return <FaReddit color="#FF4500" />;
      case 'news': return <FaNewspaper color="#333" />;
      case 'yahoo_finance': return <FaDollarSign color="#720E9E" />;
      case 'bitcoin': return <FaBitcoin color="#F7931A" />;
      case 'amazon': return <FaShoppingCart color="#FF9900" />;
      default: return <FaChartLine />;
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return 'green';
    if (sentiment > -0.3) return 'gray';
    return 'red';
  };

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return value.toLocaleString();
    }
  };

  const getWidgetHeight = () => {
    switch (size) {
      case 'small': return '200px';
      case 'medium': return '300px';
      case 'large': return '400px';
      default: return '300px';
    }
  };

  const renderHeader = () => (
    <CardHeader pb={3}>
      <Flex justify="space-between" align="center">
        <HStack>
          <Heading size="sm" color={textColor}>
            {title}
          </Heading>
          <Badge colorScheme="teal" variant="subtle">
            {type}
          </Badge>
        </HStack>
        <HStack spacing={2}>
          <Tooltip label={`Last updated: ${lastUpdate.toLocaleTimeString()}`}>
            <Text fontSize="xs" color={subtextColor}>
              {Math.floor((Date.now() - lastUpdate.getTime()) / 60000)}m ago
            </Text>
          </Tooltip>
          <Menu>
            <MenuButton as={IconButton} icon={<FaCog />} size="sm" variant="ghost" />
            <MenuList>
              <MenuItem icon={<FaRefresh />} onClick={fetchData}>
                Refresh Now
              </MenuItem>
              <MenuItem icon={<FaFilter />}>
                Configure Filters
              </MenuItem>
              <MenuItem icon={<FaExpand />} onClick={onExpand}>
                Expand Widget
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
      
      <HStack mt={2} spacing={4}>
        <FormControl display="flex" alignItems="center" size="sm">
          <FormLabel htmlFor="auto-refresh" mb="0" fontSize="xs" color={subtextColor}>
            Auto-refresh
          </FormLabel>
          <Switch
            id="auto-refresh"
            size="sm"
            isChecked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
        </FormControl>
        <Select
          size="sm"
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          width="100px"
        >
          <option value="1h">1h</option>
          <option value="6h">6h</option>
          <option value="24h">24h</option>
          <option value="7d">7d</option>
        </Select>
      </HStack>
    </CardHeader>
  );

  const renderMetrics = () => (
    <SimpleGrid columns={2} spacing={3} mb={4}>
      {metrics.slice(0, 4).map((metric, index) => (
        <Stat key={index} size="sm">
          <StatLabel fontSize="xs" color={subtextColor}>
            {metric.label}
          </StatLabel>
          <StatNumber fontSize="md" color={textColor}>
            {formatValue(metric.value, metric.format)}
          </StatNumber>
          <StatHelpText fontSize="xs" mb={0}>
            <StatArrow type={metric.change > 0 ? 'increase' : 'decrease'} />
            {Math.abs(metric.change)}%
          </StatHelpText>
        </Stat>
      ))}
    </SimpleGrid>
  );

  const renderChart = () => (
    <Box height="120px" mb={4}>
      <Line
        data={getChartData()}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              display: true,
              grid: {
                display: false
              }
            },
            y: {
              display: false,
              grid: {
                display: false
              }
            }
          },
          elements: {
            point: {
              radius: 2
            }
          }
        }}
      />
    </Box>
  );

  const renderTrends = () => (
    <VStack spacing={2} align="stretch">
      <Text fontSize="sm" fontWeight="bold" color={textColor}>
        Trending Now
      </Text>
      {trends.slice(0, 3).map((trend, index) => (
        <HStack key={index} justify="space-between" p={2} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
          <VStack align="start" spacing={0} flex={1}>
            <Text fontSize="xs" fontWeight="medium" color={textColor} noOfLines={1}>
              {trend.keyword}
            </Text>
            <HStack spacing={2}>
              <Text fontSize="xs" color={subtextColor}>
                {trend.volume.toLocaleString()}
              </Text>
              <Badge size="sm" colorScheme={trend.growth > 0 ? 'green' : 'red'}>
                {trend.growth > 0 ? '+' : ''}{trend.growth.toFixed(1)}%
              </Badge>
            </HStack>
          </VStack>
          <CircularProgress
            value={Math.abs(trend.sentiment) * 100}
            size="30px"
            color={getSentimentColor(trend.sentiment)}
          />
        </HStack>
      ))}
    </VStack>
  );

  const renderSignals = () => (
    <VStack spacing={2} align="stretch">
      <Text fontSize="sm" fontWeight="bold" color={textColor}>
        Recent Signals
      </Text>
      {signals.slice(0, 3).map((signal, index) => (
        <HStack key={index} spacing={3} p={2} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
          <Box>{getSourceIcon(signal.source)}</Box>
          <VStack align="start" spacing={0} flex={1}>
            <Text fontSize="xs" color={textColor} noOfLines={2}>
              {signal.content}
            </Text>
            <HStack spacing={2}>
              <Text fontSize="xs" color={subtextColor}>
                {new Date(signal.timestamp).toLocaleTimeString()}
              </Text>
              <Badge size="sm" colorScheme={getSentimentColor(signal.sentiment)}>
                {signal.sentiment > 0 ? 'Positive' : signal.sentiment < 0 ? 'Negative' : 'Neutral'}
              </Badge>
            </HStack>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Flex justify="center" align="center" height="150px">
          <Spinner size="lg" color="teal.500" />
        </Flex>
      );
    }

    if (error) {
      return (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">{error}</Text>
        </Alert>
      );
    }

    return (
      <VStack spacing={4} align="stretch">
        {renderMetrics()}
        {size !== 'small' && renderChart()}
        {size === 'large' && (
          <Tabs size="sm" variant="enclosed">
            <TabList>
              <Tab>Trends</Tab>
              <Tab>Signals</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={3}>
                {renderTrends()}
              </TabPanel>
              <TabPanel p={3}>
                {renderSignals()}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        {size === 'medium' && renderTrends()}
      </VStack>
    );
  };

  return (
    <Card
      bg={bgColor}
      borderColor={borderColor}
      shadow="sm"
      height={getWidgetHeight()}
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
    >
      {renderHeader()}
      <CardBody pt={0}>
        {renderContent()}
      </CardBody>
    </Card>
  );
};

export default DataPulseWidget;