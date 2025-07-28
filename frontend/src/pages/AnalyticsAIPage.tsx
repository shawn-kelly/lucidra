import React from 'react';
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
  useColorModeValue,
  Icon,
  Badge,
  Progress,
  Divider,
} from '@chakra-ui/react';
import { 
  FiActivity, FiBarChart3, FiTrendingUp, FiZap, FiCpu, 
  FiVideo, FiEye, FiTarget, FiBrain, FiDatabase
} from 'react-icons/fi';

interface AIModule {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'Analytics' | 'AI Generation' | 'Intelligence' | 'Automation';
  aiCapability: number; // 0-100 AI sophistication
  status: 'active' | 'beta' | 'coming-soon';
  path: string;
}

interface AnalyticsAIPageProps {
  onNavigate: (path: string) => void;
}

const AnalyticsAIPage: React.FC<AnalyticsAIPageProps> = ({ onNavigate }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const aiModules: AIModule[] = [
    {
      id: 'video-production',
      title: 'AI Video Production Studio',
      description: 'Generate professional how-to videos with Hugging Face models and real-time market data overlays',
      icon: FiVideo,
      category: 'AI Generation',
      aiCapability: 95,
      status: 'active',
      path: 'video-production'
    },
    {
      id: 'pestle-realtime',
      title: 'Real-Time PESTLE Analysis',
      description: 'Live market intelligence with AI-powered data collection from 6+ global sources',
      icon: FiZap,
      category: 'Intelligence',
      aiCapability: 90,
      status: 'active',
      path: 'pestle-realtime'
    },
    {
      id: 'ai-process-logger',
      title: 'AI Process Logger',
      description: 'Intelligent process documentation and optimization recommendations',
      icon: FiCpu,
      category: 'Automation',
      aiCapability: 85,
      status: 'active',
      path: 'ai-process-logger'
    },
    {
      id: 'ai-implementation',
      title: 'AI Implementation Coach',
      description: 'Guided AI integration and strategic implementation assistance',
      icon: FiBrain,
      category: 'Automation',
      aiCapability: 80,
      status: 'active',
      path: 'ai-implementation'
    },
    {
      id: 'market-intelligence',
      title: 'Market Intelligence',
      description: 'Advanced market analysis with predictive insights and trend identification',
      icon: FiEye,
      category: 'Intelligence',
      aiCapability: 75,
      status: 'active',
      path: 'market-intelligence'
    },
    {
      id: 'financial-analysis',
      title: 'Financial Analysis',
      description: 'AI-powered financial modeling with predictive analytics and risk assessment',
      icon: FiTrendingUp,
      category: 'Analytics',
      aiCapability: 70,
      status: 'active',
      path: 'financial-analysis'
    },
    {
      id: 'dashboard',
      title: 'Analytics Dashboard',
      description: 'Real-time business intelligence dashboard with AI-generated insights',
      icon: FiBarChart3,
      category: 'Analytics',
      aiCapability: 65,
      status: 'active',
      path: 'dashboard'
    },
    {
      id: 'data-pulse',
      title: 'Data Pulse Analytics',
      description: 'Continuous data monitoring and automated alert system',
      icon: FiActivity,
      category: 'Analytics',
      aiCapability: 60,
      status: 'beta',
      path: 'data-pulse'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'beta': return 'orange';
      case 'coming-soon': return 'gray';
      default: return 'gray';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Analytics': return 'blue';
      case 'AI Generation': return 'purple';
      case 'Intelligence': return 'teal';
      case 'Automation': return 'orange';
      default: return 'gray';
    }
  };

  const getAICapabilityColor = (capability: number) => {
    if (capability >= 80) return 'purple';
    if (capability >= 60) return 'blue';
    return 'green';
  };

  const groupedModules = aiModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, AIModule[]>);

  const averageAI = Math.round(aiModules.reduce((acc, m) => acc + m.aiCapability, 0) / aiModules.length);

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <VStack spacing={2} align="start">
          <Text fontSize="3xl" fontWeight="bold">🤖 Analytics & AI</Text>
          <Text fontSize="lg" color="gray.600">
            Advanced AI-powered analytics and intelligence tools for data-driven decision making
          </Text>
        </VStack>

        {/* AI Overview Stats */}
        <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4}>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="purple.500">{averageAI}%</Text>
              <Text fontSize="sm" color="gray.600">Average AI Capability</Text>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {aiModules.filter(m => m.category === 'Analytics').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Analytics Tools</Text>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                {aiModules.filter(m => m.category === 'Intelligence').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Intelligence Systems</Text>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {aiModules.filter(m => m.status === 'active').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Active AI Tools</Text>
            </CardBody>
          </Card>
        </Grid>

        {/* AI Categories */}
        {Object.entries(groupedModules).map(([category, modules]) => (
          <Card key={category} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Text fontSize="xl" fontWeight="bold" color={`${getCategoryColor(category)}.500`}>
                    {category}
                  </Text>
                  <Badge colorScheme={getCategoryColor(category)} size="sm">
                    {modules.length} tools
                  </Badge>
                  <Badge colorScheme="purple" size="sm">
                    AI-Powered
                  </Badge>
                </HStack>
                
                <Divider />

                <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={4}>
                  {modules.map((module) => (
                    <Card 
                      key={module.id}
                      variant="outline"
                      _hover={{ 
                        borderColor: `${getCategoryColor(category)}.300`, 
                        shadow: 'md',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s'
                      }}
                      cursor="pointer"
                      borderLeftWidth="4px"
                      borderLeftColor={`${getCategoryColor(category)}.400`}
                    >
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          <HStack justify="space-between">
                            <HStack>
                              <Icon as={module.icon} boxSize={5} color={`${getCategoryColor(category)}.500`} />
                              <Text fontSize="md" fontWeight="semibold">{module.title}</Text>
                            </HStack>
                            <Badge colorScheme={getStatusColor(module.status)} size="sm">
                              {module.status === 'active' ? 'Live' : module.status}
                            </Badge>
                          </HStack>

                          <Text fontSize="sm" color="gray.600">
                            {module.description}
                          </Text>

                          <VStack spacing={2} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="xs" color="gray.500">AI Sophistication</Text>
                              <Text fontSize="xs" fontWeight="bold" color={`${getAICapabilityColor(module.aiCapability)}.500`}>
                                {module.aiCapability}%
                              </Text>
                            </HStack>
                            <Progress 
                              value={module.aiCapability} 
                              size="sm" 
                              colorScheme={getAICapabilityColor(module.aiCapability)}
                            />
                          </VStack>

                          <Button
                            size="sm"
                            colorScheme={getCategoryColor(category)}
                            onClick={() => onNavigate(module.path)}
                            isDisabled={module.status === 'coming-soon'}
                            w="full"
                            leftIcon={<FiBrain />}
                          >
                            {module.status === 'coming-soon' ? 'Coming Soon' : 'Launch AI Tool'}
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </VStack>
            </CardBody>
          </Card>
        ))}

        {/* Featured AI Tools */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold">⭐ Featured AI Tools</Text>
              <Text fontSize="sm" color="gray.600">
                Our most advanced AI-powered capabilities for strategic intelligence
              </Text>
              
              <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3}>
                <Button
                  leftIcon={<FiVideo />}
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => onNavigate('video-production')}
                  size="sm"
                  rightIcon={<Badge colorScheme="purple" size="xs">95% AI</Badge>}
                >
                  AI Video Studio
                </Button>
                <Button
                  leftIcon={<FiZap />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => onNavigate('pestle-realtime')}
                  size="sm"
                  rightIcon={<Badge colorScheme="teal" size="xs">90% AI</Badge>}
                >
                  Live Market Intelligence
                </Button>
                <Button
                  leftIcon={<FiCpu />}
                  colorScheme="orange"
                  variant="outline"
                  onClick={() => onNavigate('ai-process-logger')}
                  size="sm"
                  rightIcon={<Badge colorScheme="orange" size="xs">85% AI</Badge>}
                >
                  AI Process Logger
                </Button>
                <Button
                  leftIcon={<FiBrain />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => onNavigate('ai-implementation')}
                  size="sm"
                  rightIcon={<Badge colorScheme="blue" size="xs">80% AI</Badge>}
                >
                  AI Implementation Coach
                </Button>
              </Grid>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default AnalyticsAIPage;