import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  CardHeader,
  Alert,
  AlertIcon,
  Badge,
  Button,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
  Divider,
  Icon,
  Tooltip,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import { 
  FiTrendingUp, 
  FiActivity, 
  FiTarget, 
  FiZap,
  FiBarChart,
  FiPieChart,
  FiTrendingDown,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiGitBranch,
  FiDatabase,
  FiCpu,
  FiHardDrive,
  FiWifi,
  FiShield
} from 'react-icons/fi';

interface MutationMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'performance' | 'quality' | 'collaboration' | 'efficiency';
  importance: 'low' | 'medium' | 'high' | 'critical';
  threshold: {
    warning: number;
    critical: number;
  };
}

interface PerformanceInsight {
  id: string;
  type: 'optimization' | 'warning' | 'success' | 'trend';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number;
  actionable: boolean;
  recommendations: string[];
  frameworks: string[];
}

interface MutationPattern {
  id: string;
  pattern: string;
  frequency: number;
  efficiency: number;
  frameworks: string[];
  timePattern: 'morning' | 'afternoon' | 'evening' | 'weekend';
  userPattern: 'individual' | 'collaborative' | 'automated';
  successRate: number;
}

interface AnalyticsTimeRange {
  label: string;
  value: string;
  days: number;
}

const MutationAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<MutationMetric[]>([]);
  const [insights, setInsights] = useState<PerformanceInsight[]>([]);
  const [patterns, setPatterns] = useState<MutationPattern[]>([]);
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState(80);
  const [autoOptimization, setAutoOptimization] = useState(false);

  const timeRanges: AnalyticsTimeRange[] = [
    { label: 'Last 24 hours', value: '1d', days: 1 },
    { label: 'Last 7 days', value: '7d', days: 7 },
    { label: 'Last 30 days', value: '30d', days: 30 },
    { label: 'Last 90 days', value: '90d', days: 90 }
  ];

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Initialize sample data
  useEffect(() => {
    const sampleMetrics: MutationMetric[] = [
      {
        id: 'mutation-speed',
        name: 'Mutation Speed',
        value: 342,
        previousValue: 298,
        unit: 'ms',
        trend: 'up',
        category: 'performance',
        importance: 'high',
        threshold: { warning: 500, critical: 1000 }
      },
      {
        id: 'success-rate',
        name: 'Success Rate',
        value: 94.5,
        previousValue: 91.2,
        unit: '%',
        trend: 'up',
        category: 'quality',
        importance: 'critical',
        threshold: { warning: 85, critical: 70 }
      },
      {
        id: 'collaboration-score',
        name: 'Collaboration Score',
        value: 87,
        previousValue: 89,
        unit: '/100',
        trend: 'down',
        category: 'collaboration',
        importance: 'medium',
        threshold: { warning: 60, critical: 40 }
      },
      {
        id: 'efficiency-index',
        name: 'Efficiency Index',
        value: 8.7,
        previousValue: 8.1,
        unit: '/10',
        trend: 'up',
        category: 'efficiency',
        importance: 'high',
        threshold: { warning: 6, critical: 4 }
      },
      {
        id: 'memory-usage',
        name: 'Memory Usage',
        value: 68,
        previousValue: 72,
        unit: 'MB',
        trend: 'down',
        category: 'performance',
        importance: 'medium',
        threshold: { warning: 80, critical: 95 }
      },
      {
        id: 'error-rate',
        name: 'Error Rate',
        value: 2.3,
        previousValue: 3.1,
        unit: '%',
        trend: 'down',
        category: 'quality',
        importance: 'high',
        threshold: { warning: 5, critical: 10 }
      }
    ];

    const sampleInsights: PerformanceInsight[] = [
      {
        id: 'insight-1',
        type: 'optimization',
        title: 'Blue Ocean Strategy Mutations Peak Performance',
        description: 'Blue Ocean mutations show 23% better performance during morning hours',
        impact: 'medium',
        confidence: 87,
        actionable: true,
        recommendations: [
          'Schedule complex mutations during 9-11 AM',
          'Enable auto-optimization for off-peak hours',
          'Consider batch processing for large datasets'
        ],
        frameworks: ['blue_ocean']
      },
      {
        id: 'insight-2',
        type: 'warning',
        title: 'Collaborative Conflicts Increasing',
        description: 'Merge conflicts have increased by 34% in the last week',
        impact: 'high',
        confidence: 92,
        actionable: true,
        recommendations: [
          'Implement better branching strategy',
          'Add automated conflict resolution',
          'Improve team communication protocols'
        ],
        frameworks: ['all']
      },
      {
        id: 'insight-3',
        type: 'success',
        title: 'BPMN Process Optimization Success',
        description: 'Process mutation efficiency improved by 45% with new algorithms',
        impact: 'high',
        confidence: 95,
        actionable: false,
        recommendations: [
          'Apply similar optimization to other frameworks',
          'Document successful patterns',
          'Train team on new methodologies'
        ],
        frameworks: ['bpmn_process']
      },
      {
        id: 'insight-4',
        type: 'trend',
        title: 'Evening Collaboration Surge',
        description: 'Collaborative mutations increase 67% after 6 PM',
        impact: 'medium',
        confidence: 78,
        actionable: true,
        recommendations: [
          'Optimize real-time sync for evening hours',
          'Increase server capacity during peak times',
          'Enable enhanced notification system'
        ],
        frameworks: ['all']
      }
    ];

    const samplePatterns: MutationPattern[] = [
      {
        id: 'pattern-1',
        pattern: 'Iterative Refinement',
        frequency: 45,
        efficiency: 87,
        frameworks: ['blue_ocean', 'porter_forces'],
        timePattern: 'morning',
        userPattern: 'individual',
        successRate: 94
      },
      {
        id: 'pattern-2',
        pattern: 'Collaborative Validation',
        frequency: 32,
        efficiency: 78,
        frameworks: ['all'],
        timePattern: 'afternoon',
        userPattern: 'collaborative',
        successRate: 89
      },
      {
        id: 'pattern-3',
        pattern: 'Automated Optimization',
        frequency: 28,
        efficiency: 95,
        frameworks: ['bpmn_process'],
        timePattern: 'evening',
        userPattern: 'automated',
        successRate: 97
      },
      {
        id: 'pattern-4',
        pattern: 'Rapid Prototyping',
        frequency: 23,
        efficiency: 72,
        frameworks: ['blue_ocean'],
        timePattern: 'weekend',
        userPattern: 'individual',
        successRate: 83
      }
    ];

    setMetrics(sampleMetrics);
    setInsights(sampleInsights);
    setPatterns(samplePatterns);
  }, []);

  // Real-time metric updates
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
        const newValue = Math.max(0, metric.value * (1 + variation));
        
        return {
          ...metric,
          previousValue: metric.value,
          value: parseFloat(newValue.toFixed(1)),
          trend: newValue > metric.value ? 'up' : newValue < metric.value ? 'down' : 'stable'
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeEnabled]);

  // Computed analytics
  const filteredMetrics = useMemo(() => {
    return selectedCategory === 'all' 
      ? metrics 
      : metrics.filter(m => m.category === selectedCategory);
  }, [metrics, selectedCategory]);

  const overallHealth = useMemo(() => {
    if (metrics.length === 0) return 0;
    
    const healthScores = metrics.map(metric => {
      if (metric.value >= metric.threshold.critical) return 100;
      if (metric.value >= metric.threshold.warning) return 70;
      return 40;
    });
    
    return Math.round(healthScores.reduce((sum, score) => sum + score, 0) / healthScores.length);
  }, [metrics]);

  const criticalAlerts = useMemo(() => {
    return metrics.filter(m => m.value < m.threshold.critical).length;
  }, [metrics]);

  const warningAlerts = useMemo(() => {
    return metrics.filter(m => m.value < m.threshold.warning && m.value >= m.threshold.critical).length;
  }, [metrics]);

  const getMetricColor = (metric: MutationMetric) => {
    if (metric.value < metric.threshold.critical) return 'red';
    if (metric.value < metric.threshold.warning) return 'orange';
    return 'green';
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return FiZap;
      case 'warning': return FiAlertTriangle;
      case 'success': return FiCheckCircle;
      case 'trend': return FiTrendingUp;
      default: return FiActivity;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'purple';
      case 'warning': return 'orange';
      case 'success': return 'green';
      case 'trend': return 'blue';
      default: return 'gray';
    }
  };

  const renderMetricCard = (metric: MutationMetric) => (
    <Card key={metric.id} bg={cardBg} borderColor={borderColor}>
      <CardBody>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" color="gray.500">{metric.name}</Text>
              <HStack>
                <Text fontSize="2xl" fontWeight="bold" color={getMetricColor(metric) + '.500'}>
                  {metric.value}
                </Text>
                <Text fontSize="sm" color="gray.500">{metric.unit}</Text>
              </HStack>
            </VStack>
            
            <VStack align="end" spacing={0}>
              <Badge colorScheme={metric.importance === 'critical' ? 'red' : metric.importance === 'high' ? 'orange' : 'blue'}>
                {metric.importance}
              </Badge>
              <HStack spacing={1}>
                <Icon 
                  as={metric.trend === 'up' ? FiTrendingUp : metric.trend === 'down' ? FiTrendingDown : FiActivity} 
                  color={metric.trend === 'up' ? 'green.500' : metric.trend === 'down' ? 'red.500' : 'gray.500'}
                />
                <Text fontSize="xs" color="gray.500">
                  {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}
                  {Math.abs(metric.value - metric.previousValue).toFixed(1)}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          
          <Progress 
            value={(metric.value / metric.threshold.warning) * 100} 
            colorScheme={getMetricColor(metric)}
            size="sm"
          />
          
          <HStack justify="space-between" fontSize="xs" color="gray.500">
            <Text>Warning: {metric.threshold.warning}</Text>
            <Text>Critical: {metric.threshold.critical}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  const renderInsightCard = (insight: PerformanceInsight) => (
    <Card key={insight.id} bg={cardBg} borderColor={borderColor}>
      <CardBody>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <HStack>
              <Icon as={getInsightIcon(insight.type)} color={getInsightColor(insight.type) + '.500'} />
              <VStack align="start" spacing={0}>
                <Text fontSize="md" fontWeight="bold">{insight.title}</Text>
                <Text fontSize="sm" color="gray.600">{insight.description}</Text>
              </VStack>
            </HStack>
            
            <VStack align="end" spacing={1}>
              <Badge colorScheme={getInsightColor(insight.type)}>{insight.type}</Badge>
              <Badge variant="outline">{insight.confidence}% confident</Badge>
            </VStack>
          </HStack>
          
          <HStack>
            <Badge colorScheme={insight.impact === 'high' ? 'red' : insight.impact === 'medium' ? 'orange' : 'green'}>
              {insight.impact} impact
            </Badge>
            {insight.actionable && <Badge colorScheme="blue">Actionable</Badge>}
            <Badge variant="outline">{insight.frameworks.join(', ')}</Badge>
          </HStack>
          
          {insight.actionable && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>Recommendations:</Text>
              <VStack align="start" spacing={1}>
                {insight.recommendations.map((rec, index) => (
                  <Text key={index} fontSize="xs" color="gray.600">• {rec}</Text>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );

  const renderPatternCard = (pattern: MutationPattern) => (
    <Card key={pattern.id} bg={cardBg} borderColor={borderColor}>
      <CardBody>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontSize="md" fontWeight="bold">{pattern.pattern}</Text>
              <Text fontSize="sm" color="gray.600">
                {pattern.frequency} occurrences • {pattern.successRate}% success rate
              </Text>
            </VStack>
            <CircularProgress value={pattern.efficiency} color="green.400" size="50px">
              <CircularProgressLabel fontSize="xs">{pattern.efficiency}%</CircularProgressLabel>
            </CircularProgress>
          </HStack>
          
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <VStack align="start" spacing={1}>
              <Text fontSize="xs" color="gray.500">Time Pattern</Text>
              <Badge colorScheme="blue">{pattern.timePattern}</Badge>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="xs" color="gray.500">User Pattern</Text>
              <Badge colorScheme="purple">{pattern.userPattern}</Badge>
            </VStack>
          </Grid>
          
          <Box>
            <Text fontSize="xs" color="gray.500" mb={1}>Frameworks:</Text>
            <HStack spacing={1} wrap="wrap">
              {pattern.frameworks.map(framework => (
                <Badge key={framework} size="sm" variant="outline">
                  {framework}
                </Badge>
              ))}
            </HStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">📊 Mutation Analytics & Insights</Text>
            <Text color="gray.600">
              Real-time analytics, performance insights, and optimization recommendations
            </Text>
          </VStack>
          
          <HStack>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="realtime" mb={0} fontSize="sm">
                Real-time
              </FormLabel>
              <Switch 
                id="realtime"
                size="sm"
                isChecked={realTimeEnabled}
                onChange={(e) => setRealTimeEnabled(e.target.checked)}
              />
            </FormControl>
            
            <Select size="sm" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </Select>
          </HStack>
        </HStack>

        {/* System Health Overview */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <VStack>
                <CircularProgress 
                  value={overallHealth} 
                  color={overallHealth >= 80 ? 'green.400' : overallHealth >= 60 ? 'orange.400' : 'red.400'}
                  size="80px"
                  thickness="8px"
                >
                  <CircularProgressLabel fontSize="lg" fontWeight="bold">
                    {overallHealth}%
                  </CircularProgressLabel>
                </CircularProgress>
                <Text fontSize="sm" fontWeight="medium">System Health</Text>
                <Text fontSize="xs" color="gray.500">Overall Performance</Text>
              </VStack>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Active Mutations</StatLabel>
                <StatNumber color="blue.500">47</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12% increase
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Critical Alerts</StatLabel>
                <StatNumber color={criticalAlerts > 0 ? "red.500" : "green.500"}>
                  {criticalAlerts}
                </StatNumber>
                <StatHelpText>
                  {warningAlerts} warnings pending
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Efficiency Score</StatLabel>
                <StatNumber color="purple.500">8.7/10</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Above average
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Controls */}
        <Card bg={cardBg} borderColor={borderColor}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">Analytics Controls</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <FormControl>
                <FormLabel fontSize="sm">Category Filter</FormLabel>
                <Select 
                  size="sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="performance">Performance</option>
                  <option value="quality">Quality</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="efficiency">Efficiency</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm">Alert Threshold: {alertThreshold}%</FormLabel>
                <Slider
                  value={alertThreshold}
                  onChange={setAlertThreshold}
                  min={50}
                  max={95}
                  step={5}
                  size="sm"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="auto-opt" mb={0} fontSize="sm" flex={1}>
                  Auto-optimization
                </FormLabel>
                <Switch 
                  id="auto-opt"
                  size="sm"
                  isChecked={autoOptimization}
                  onChange={(e) => setAutoOptimization(e.target.checked)}
                />
              </FormControl>
            </Grid>
          </CardBody>
        </Card>

        {/* Main Analytics Tabs */}
        <Tabs>
          <TabList>
            <Tab>Performance Metrics ({filteredMetrics.length})</Tab>
            <Tab>Smart Insights ({insights.length})</Tab>
            <Tab>Usage Patterns ({patterns.length})</Tab>
            <Tab>Trends & Forecasts</Tab>
          </TabList>
          
          <TabPanels>
            {/* Performance Metrics */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                {realTimeEnabled && (
                  <Alert status="info">
                    <AlertIcon />
                    <HStack>
                      <Text>Real-time monitoring active</Text>
                      <Badge colorScheme="green">Live</Badge>
                    </HStack>
                  </Alert>
                )}
                
                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                  {filteredMetrics.map(renderMetricCard)}
                </Grid>
                
                {filteredMetrics.length === 0 && (
                  <Alert status="info">
                    <AlertIcon />
                    No metrics match the selected category filter
                  </Alert>
                )}
              </VStack>
            </TabPanel>
            
            {/* Smart Insights */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="medium">AI-Generated Insights</Text>
                  <Badge colorScheme="purple">Powered by Machine Learning</Badge>
                </HStack>
                
                <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={4}>
                  {insights.map(renderInsightCard)}
                </Grid>
              </VStack>
            </TabPanel>
            
            {/* Usage Patterns */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="medium">Mutation Patterns & Behaviors</Text>
                  <Badge colorScheme="blue">Pattern Recognition</Badge>
                </HStack>
                
                <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={4}>
                  {patterns.map(renderPatternCard)}
                </Grid>
              </VStack>
            </TabPanel>
            
            {/* Trends & Forecasts */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Alert status="info">
                  <AlertIcon />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">Predictive Analytics</Text>
                    <Text fontSize="sm">
                      Based on historical data and machine learning models, 
                      we forecast continued improvement in mutation efficiency over the next 30 days.
                    </Text>
                  </VStack>
                </Alert>
                
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <Card bg={cardBg} borderColor={borderColor}>
                    <CardHeader>
                      <HStack>
                        <Icon as={FiTrendingUp} color="green.500" />
                        <Text fontSize="lg" fontWeight="bold">Performance Forecast</Text>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between">
                          <Text fontSize="sm">Expected efficiency gain</Text>
                          <Badge colorScheme="green">+15%</Badge>
                        </HStack>
                        <HStack justify="space-between">
                          <Text fontSize="sm">Projected success rate</Text>
                          <Badge colorScheme="blue">97.2%</Badge>
                        </HStack>
                        <HStack justify="space-between">
                          <Text fontSize="sm">Resource optimization</Text>
                          <Badge colorScheme="purple">+23%</Badge>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                  
                  <Card bg={cardBg} borderColor={borderColor}>
                    <CardHeader>
                      <HStack>
                        <Icon as={FiCpu} color="purple.500" />
                        <Text fontSize="lg" fontWeight="bold">AI Recommendations</Text>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={3} align="stretch">
                        <Text fontSize="sm">
                          • Implement batch processing for 34% efficiency gain
                        </Text>
                        <Text fontSize="sm">
                          • Schedule complex mutations during low-traffic hours
                        </Text>
                        <Text fontSize="sm">
                          • Enable predictive caching for 28% speed improvement
                        </Text>
                        <Button size="sm" colorScheme="purple" mt={2}>
                          Apply Recommendations
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default MutationAnalytics;