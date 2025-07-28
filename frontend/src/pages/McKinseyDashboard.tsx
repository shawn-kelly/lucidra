import React, { useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Grid,
  GridItem,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  useColorModeValue,
  Badge,
  Divider,
} from '@chakra-ui/react';
import {
  FiTrendingUp,
  FiTarget,
  FiBarChart3,
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiCpu,
  FiZap,
  FiBriefcase,
  FiMap,
} from 'react-icons/fi';
import McKinseyCard from '../components/layout/McKinseyCard';

interface McKinseyDashboardProps {
  onNavigate: (view: string) => void;
}

const McKinseyDashboard: React.FC<McKinseyDashboardProps> = ({ onNavigate }) => {
  const sectionBg = useColorModeValue('white', 'mckinsey.gray.800');
  const borderColor = useColorModeValue('mckinsey.gray.200', 'mckinsey.gray.600');

  const keyMetrics = [
    {
      label: 'Strategic Initiatives',
      value: '12',
      change: '+2 this month',
      color: 'mckinsey.primary',
      icon: FiTarget,
    },
    {
      label: 'Active Projects',
      value: '8',
      change: '+1 this week',
      color: 'mckinsey.teal',
      icon: FiBriefcase,
    },
    {
      label: 'Team Members',
      value: '24',
      change: '+3 new hires',
      color: 'mckinsey.blue',
      icon: FiUsers,
    },
    {
      label: 'Monthly Revenue',
      value: '$2.1M',
      change: '+12% vs last month',
      color: 'mckinsey.green',
      icon: FiDollarSign,
    },
  ];

  const recentActivity = [
    {
      title: 'Blue Ocean Strategy Analysis',
      description: 'Completed competitive analysis for new market entry',
      timestamp: '2 hours ago',
      status: 'completed',
      category: 'Strategy',
    },
    {
      title: 'Q4 Financial Forecast',
      description: 'Updated revenue projections based on market signals',
      timestamp: '4 hours ago',
      status: 'active',
      category: 'Finance',
    },
    {
      title: 'Process Optimization Review',
      description: 'AI-powered analysis identified 3 efficiency improvements',
      timestamp: '1 day ago',
      status: 'completed',
      category: 'Operations',
    },
  ];

  const quickActions = [
    {
      title: 'Strategic Planning',
      description: 'Develop comprehensive strategic initiatives',
      icon: FiTarget,
      path: 'strategy-frameworks-section',
      category: 'Strategy',
      progress: 75,
      metrics: [
        { label: 'Frameworks', value: '6/8', trend: 'up' as const },
        { label: 'Completion', value: '75%', trend: 'up' as const },
      ],
    },
    {
      title: 'Market Intelligence',
      description: 'Real-time PESTLE analysis and market insights',
      icon: FiBarChart3,
      path: 'pestle-realtime',
      category: 'Analytics',
      progress: 90,
      metrics: [
        { label: 'Data Sources', value: '6', trend: 'up' as const },
        { label: 'Insights', value: '23', trend: 'up' as const },
      ],
    },
    {
      title: 'Process Management',
      description: 'AI-powered process mapping and optimization',
      icon: FiCpu,
      path: 'process-management-advanced',
      category: 'Operations',
      progress: 60,
      metrics: [
        { label: 'Processes', value: '12', trend: 'neutral' as const },
        { label: 'Optimized', value: '8', trend: 'up' as const },
      ],
    },
    {
      title: 'Video Production',
      description: 'AI-generated training and presentation videos',
      icon: FiZap,
      path: 'video-production',
      category: 'AI Tools',
      progress: 85,
      metrics: [
        { label: 'Videos', value: '15', trend: 'up' as const },
        { label: 'Quality', value: '4.8/5', trend: 'up' as const },
      ],
    },
  ];

  return (
    <Box bg="mckinsey.gray.50" minH="calc(100vh - 72px)" pb="60px">
      <Container maxW="full" p={6}>
        <VStack spacing={8} align="stretch">
          {/* Welcome Section */}
          <Box bg={sectionBg} borderRadius="12px" p={6} borderWidth="1px" borderColor={borderColor}>
            <VStack spacing={4} align="start">
              <HStack justify="space-between" w="full">
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="700" color="mckinsey.primary.500">
                    Welcome back, John
                  </Text>
                  <Text color="mckinsey.gray.600">
                    Here's what's happening with your strategic initiatives today
                  </Text>
                </VStack>
                <Badge colorScheme="mckinsey.teal" variant="subtle" px={3} py={1}>
                  Senior Partner
                </Badge>
              </HStack>
              
              {/* Key Metrics */}
              <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4} w="full">
                {keyMetrics.map((metric, index) => (
                  <Box
                    key={index}
                    p={4}
                    bg="mckinsey.gray.50"
                    borderRadius="8px"
                    borderLeftWidth="4px"
                    borderLeftColor={`${metric.color}.500`}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" color="mckinsey.gray.600">
                          {metric.label}
                        </Text>
                        <Text fontSize="2xl" fontWeight="700" color="mckinsey.primary.500">
                          {metric.value}
                        </Text>
                        <Text fontSize="xs" color="mckinsey.gray.500">
                          {metric.change}
                        </Text>
                      </VStack>
                      <Box p={2} bg={`${metric.color}.100`} borderRadius="6px">
                        <metric.icon size={20} color={`var(--chakra-colors-${metric.color}-500)`} />
                      </Box>
                    </HStack>
                  </Box>
                ))}
              </Grid>
            </VStack>
          </Box>

          {/* Main Content Grid */}
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            {/* Quick Actions */}
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="xl" fontWeight="700" color="mckinsey.primary.500">
                  Strategic Tools
                </Text>
                <Badge variant="mckinseyTeal">4 Active</Badge>
              </HStack>
              
              <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                {quickActions.map((action, index) => (
                  <McKinseyCard
                    key={index}
                    title={action.title}
                    description={action.description}
                    icon={action.icon}
                    category={action.category}
                    progress={action.progress}
                    status="active"
                    metrics={action.metrics}
                    onClick={() => onNavigate(action.path)}
                    variant="elevated"
                  />
                ))}
              </Grid>
            </VStack>

            {/* Sidebar */}
            <VStack spacing={6} align="stretch">
              {/* Recent Activity */}
              <Box bg={sectionBg} borderRadius="12px" p={5} borderWidth="1px" borderColor={borderColor}>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="700" color="mckinsey.primary.500">
                      Recent Activity
                    </Text>
                    <FiActivity color="var(--chakra-colors-mckinsey-gray-400)" />
                  </HStack>
                  
                  <Divider />
                  
                  <VStack spacing={3} align="stretch">
                    {recentActivity.map((activity, index) => (
                      <Box key={index} p={3} bg="mckinsey.gray.50" borderRadius="6px">
                        <VStack spacing={2} align="start">
                          <HStack justify="space-between" w="full">
                            <Text fontSize="sm" fontWeight="600" color="mckinsey.primary.500">
                              {activity.title}
                            </Text>
                            <Badge size="xs" colorScheme={activity.status === 'completed' ? 'green' : 'blue'}>
                              {activity.status}
                            </Badge>
                          </HStack>
                          <Text fontSize="xs" color="mckinsey.gray.600">
                            {activity.description}
                          </Text>
                          <HStack justify="space-between" w="full">
                            <Badge variant="outline" size="xs">
                              {activity.category}
                            </Badge>
                            <Text fontSize="xs" color="mckinsey.gray.500">
                              {activity.timestamp}
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </Box>

              {/* Performance Summary */}
              <Box bg={sectionBg} borderRadius="12px" p={5} borderWidth="1px" borderColor={borderColor}>
                <VStack spacing={4} align="stretch">
                  <Text fontSize="lg" fontWeight="700" color="mckinsey.primary.500">
                    Performance Summary
                  </Text>
                  
                  <Divider />
                  
                  <VStack spacing={3} align="stretch">
                    <Box>
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" color="mckinsey.gray.600">Strategic Execution</Text>
                        <Text fontSize="sm" fontWeight="600">78%</Text>
                      </HStack>
                      <Progress value={78} size="sm" colorScheme="blue" borderRadius="full" />
                    </Box>
                    
                    <Box>
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" color="mckinsey.gray.600">Process Efficiency</Text>
                        <Text fontSize="sm" fontWeight="600">85%</Text>
                      </HStack>
                      <Progress value={85} size="sm" colorScheme="green" borderRadius="full" />
                    </Box>
                    
                    <Box>
                      <HStack justify="space-between" mb={2}>
                        <Text fontSize="sm" color="mckinsey.gray.600">Team Engagement</Text>
                        <Text fontSize="sm" fontWeight="600">92%</Text>
                      </HStack>
                      <Progress value={92} size="sm" colorScheme="teal" borderRadius="full" />
                    </Box>
                  </VStack>
                </VStack>
              </Box>
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default McKinseyDashboard;