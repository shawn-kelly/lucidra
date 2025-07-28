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
} from '@chakra-ui/react';
import { FiTarget, FiBarChart3, FiMap, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

interface CoreFeature {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'active' | 'coming-soon' | 'beta';
  path: string;
}

interface CoreFeaturesPageProps {
  onNavigate: (path: string) => void;
}

const CoreFeaturesPage: React.FC<CoreFeaturesPageProps> = ({ onNavigate }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const coreFeatures: CoreFeature[] = [
    {
      id: 'business-model-canvas',
      title: 'Business Model Canvas',
      description: 'Visualize and design your complete business model with our interactive canvas',
      icon: FiTarget,
      status: 'active',
      path: 'business-model-canvas'
    },
    {
      id: 'mission-statement',
      title: 'Mission Statement Generator',
      description: 'AI-powered mission statement creation with guided workflow and refinement',
      icon: FiTarget,
      status: 'active',
      path: 'mission-statement'
    },
    {
      id: 'five-forces',
      title: 'Porter\'s Five Forces',
      description: 'Comprehensive competitive analysis with real-time industry insights',
      icon: FiBarChart3,
      status: 'active',
      path: 'five-forces'
    },
    {
      id: 'execution-tracker',
      title: 'Strategy Execution Tracker',
      description: 'Track goals, milestones, tasks, and KPIs with real-time progress monitoring',
      icon: FiTrendingUp,
      status: 'active',
      path: 'execution-tracker'
    },
    {
      id: 'strategic-journey',
      title: 'Strategic Journey Mapping',
      description: 'Visual journey mapping for strategic planning and process optimization',
      icon: FiMap,
      status: 'active',
      path: 'strategic-journey'
    },
    {
      id: 'financial-analysis',
      title: 'Financial Analysis',
      description: 'Comprehensive financial modeling and analysis tools',
      icon: FiDollarSign,
      status: 'active',
      path: 'financial-analysis'
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Available';
      case 'beta': return 'Beta';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Unknown';
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <VStack spacing={2} align="start">
          <Text fontSize="3xl" fontWeight="bold">🎯 Core Features</Text>
          <Text fontSize="lg" color="gray.600">
            Essential business intelligence tools to drive your strategic success
          </Text>
        </VStack>

        {/* Features Grid */}
        <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={6}>
          {coreFeatures.map((feature) => (
            <GridItem key={feature.id}>
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
                cursor="pointer"
                h="full"
              >
                <CardBody>
                  <VStack spacing={4} align="stretch" h="full">
                    <HStack justify="space-between">
                      <HStack>
                        <Icon as={feature.icon} boxSize={6} color="blue.500" />
                        <Text fontSize="xl" fontWeight="bold">{feature.title}</Text>
                      </HStack>
                      <Badge colorScheme={getStatusColor(feature.status)} size="sm">
                        {getStatusText(feature.status)}
                      </Badge>
                    </HStack>

                    <Text color="gray.600" flex={1}>
                      {feature.description}
                    </Text>

                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => onNavigate(feature.path)}
                      isDisabled={feature.status === 'coming-soon'}
                      w="full"
                    >
                      {feature.status === 'coming-soon' ? 'Coming Soon' : 'Launch'}
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>

        {/* Quick Access Section */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold">🚀 Quick Access</Text>
              <Text color="gray.600">
                Jump directly to your most used tools and continue where you left off
              </Text>
              
              <HStack spacing={4} flexWrap="wrap">
                <Button
                  leftIcon={<FiTarget />}
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate('business-model-canvas')}
                >
                  Business Model Canvas
                </Button>
                <Button
                  leftIcon={<FiBarChart3 />}
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate('five-forces')}
                >
                  Competitive Analysis
                </Button>
                <Button
                  leftIcon={<FiTrendingUp />}
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate('execution-tracker')}
                >
                  Strategy Tracker
                </Button>
                <Button
                  leftIcon={<FiMap />}
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate('strategic-journey')}
                >
                  Journey Mapping
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default CoreFeaturesPage;