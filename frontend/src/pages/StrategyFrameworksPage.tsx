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
} from '@chakra-ui/react';
import { FiTrendingUp, FiTarget, FiMap, FiBarChart3, FiLayers, FiZap } from 'react-icons/fi';

interface StrategyFramework {
  id: string;
  title: string;
  description: string;
  icon: any;
  completion: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  path: string;
}

interface StrategyFrameworksPageProps {
  onNavigate: (path: string) => void;
}

const StrategyFrameworksPage: React.FC<StrategyFrameworksPageProps> = ({ onNavigate }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const frameworks: StrategyFramework[] = [
    {
      id: 'blue-ocean',
      title: 'Blue Ocean Strategy',
      description: 'Discover uncontested market spaces with 7 comprehensive frameworks including As-Is Canvas, To-Be Canvas, and Six Paths Analysis',
      icon: FiTrendingUp,
      completion: 85,
      difficulty: 'Advanced',
      timeEstimate: '2-3 hours',
      path: 'blue-ocean-comprehensive'
    },
    {
      id: 'porters-five-forces',
      title: 'Porter\'s Five Forces',
      description: 'Analyze competitive forces with real-time industry data and strategic recommendations',
      icon: FiBarChart3,
      completion: 100,
      difficulty: 'Intermediate',
      timeEstimate: '45 minutes',
      path: 'five-forces'
    },
    {
      id: 'business-model-canvas',
      title: 'Business Model Canvas',
      description: 'Design and visualize your complete business model with interactive components',
      icon: FiTarget,
      completion: 100,
      difficulty: 'Beginner',
      timeEstimate: '1 hour',
      path: 'business-model-canvas'
    },
    {
      id: 'value-chain',
      title: 'Porter\'s Value Chain',
      description: 'Analyze primary and support activities to identify competitive advantages',
      icon: FiLayers,
      completion: 70,
      difficulty: 'Intermediate',
      timeEstimate: '1.5 hours',
      path: 'value-chain'
    },
    {
      id: 'pestle-analysis',
      title: 'PESTLE Analysis',
      description: 'Real-time political, economic, social, technological, legal, and environmental analysis with live market data',
      icon: FiZap,
      completion: 95,
      difficulty: 'Intermediate',
      timeEstimate: '1 hour',
      path: 'pestle-realtime'
    },
    {
      id: 'strategic-journey',
      title: 'Strategic Journey Mapping',
      description: 'Visual journey mapping for strategic planning and process optimization',
      icon: FiMap,
      completion: 60,
      difficulty: 'Advanced',
      timeEstimate: '2 hours',
      path: 'strategic-journey'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'orange';
      case 'Advanced': return 'red';
      default: return 'gray';
    }
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'green';
    if (completion >= 50) return 'orange';
    return 'red';
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <VStack spacing={2} align="start">
          <Text fontSize="3xl" fontWeight="bold">📚 Strategy Frameworks</Text>
          <Text fontSize="lg" color="gray.600">
            Comprehensive strategic analysis tools to guide your business decisions
          </Text>
        </VStack>

        {/* Overview Stats */}
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">6</Text>
              <Text fontSize="sm" color="gray.600">Available Frameworks</Text>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {Math.round(frameworks.reduce((acc, f) => acc + f.completion, 0) / frameworks.length)}%
              </Text>
              <Text fontSize="sm" color="gray.600">Average Completion</Text>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">8-10</Text>
              <Text fontSize="sm" color="gray.600">Total Hours</Text>
            </CardBody>
          </Card>
        </Grid>

        {/* Frameworks Grid */}
        <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
          {frameworks.map((framework) => (
            <GridItem key={framework.id}>
              <Card 
                bg={cardBg} 
                borderWidth="1px" 
                borderColor={borderColor}
                _hover={{ 
                  borderColor: 'blue.300', 
                  shadow: 'md',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }}
                h="full"
              >
                <CardBody>
                  <VStack spacing={4} align="stretch" h="full">
                    <HStack justify="space-between">
                      <HStack>
                        <Icon as={framework.icon} boxSize={6} color="blue.500" />
                        <Text fontSize="lg" fontWeight="bold">{framework.title}</Text>
                      </HStack>
                      <Badge colorScheme={getDifficultyColor(framework.difficulty)} size="sm">
                        {framework.difficulty}
                      </Badge>
                    </HStack>

                    <Text color="gray.600" flex={1} fontSize="sm">
                      {framework.description}
                    </Text>

                    <VStack spacing={2} align="stretch">
                      <HStack justify="space-between">
                        <Text fontSize="xs" color="gray.500">Progress</Text>
                        <Text fontSize="xs" fontWeight="bold" color={`${getCompletionColor(framework.completion)}.500`}>
                          {framework.completion}%
                        </Text>
                      </HStack>
                      <Progress 
                        value={framework.completion} 
                        size="sm" 
                        colorScheme={getCompletionColor(framework.completion)}
                      />
                    </VStack>

                    <HStack justify="space-between" fontSize="xs" color="gray.500">
                      <Text>⏱️ {framework.timeEstimate}</Text>
                      <Text>🎯 Strategic Analysis</Text>
                    </HStack>

                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => onNavigate(framework.path)}
                      w="full"
                    >
                      {framework.completion > 0 ? 'Continue' : 'Start'} Framework
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold">🎯 Quick Actions</Text>
              
              <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                <Button
                  leftIcon={<FiTrendingUp />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => onNavigate('blue-ocean-comprehensive')}
                  size="sm"
                >
                  Blue Ocean Workshop
                </Button>
                <Button
                  leftIcon={<FiBarChart3 />}
                  colorScheme="green"
                  variant="outline"
                  onClick={() => onNavigate('five-forces')}
                  size="sm"
                >
                  Competitive Analysis
                </Button>
                <Button
                  leftIcon={<FiZap />}
                  colorScheme="orange"
                  variant="outline"
                  onClick={() => onNavigate('pestle-realtime')}
                  size="sm"
                >
                  Market Intelligence
                </Button>
                <Button
                  leftIcon={<FiTarget />}
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => onNavigate('business-model-canvas')}
                  size="sm"
                >
                  Business Model
                </Button>
              </Grid>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default StrategyFrameworksPage;