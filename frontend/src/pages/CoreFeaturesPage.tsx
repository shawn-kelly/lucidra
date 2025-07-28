import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Container,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FiTarget, FiBarChart3, FiMap, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import McKinseyCard from '../components/layout/McKinseyCard';

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
  const sectionBg = useColorModeValue('white', 'mckinsey.gray.800');
  const borderColor = useColorModeValue('mckinsey.gray.200', 'mckinsey.gray.600');

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
    <Box bg="mckinsey.gray.50" minH="calc(100vh - 72px)" pb="60px">
      <Container maxW="full" p={6}>
        <VStack spacing={8} align="stretch">
          {/* Header Section */}
          <Box bg={sectionBg} borderRadius="12px" p={6} borderWidth="1px" borderColor={borderColor}>
            <VStack spacing={4} align="start">
              <HStack justify="space-between" w="full">
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="700" color="mckinsey.primary.500">
                    Core Features
                  </Text>
                  <Text color="mckinsey.gray.600">
                    Essential business intelligence tools to drive your strategic success
                  </Text>
                </VStack>
                <HStack spacing={2}>
                  <Text fontSize="sm" color="mckinsey.gray.500">
                    {coreFeatures.filter(f => f.status === 'active').length} Active Tools
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>

          {/* Features Grid */}
          <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={6}>
            {coreFeatures.map((feature) => (
              <McKinseyCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                status={feature.status}
                category="Core Feature"
                onClick={() => onNavigate(feature.path)}
                actions={[
                  {
                    label: feature.status === 'coming-soon' ? 'Coming Soon' : 'Launch Tool',
                    onClick: () => onNavigate(feature.path),
                    variant: 'primary',
                  },
                ]}
                variant="elevated"
              />
            ))}
          </Grid>

          {/* Quick Access Section */}
          <Box bg={sectionBg} borderRadius="12px" p={6} borderWidth="1px" borderColor={borderColor}>
            <VStack spacing={6} align="stretch">
              <VStack spacing={2} align="start">
                <Text fontSize="xl" fontWeight="700" color="mckinsey.primary.500">
                  Quick Access
                </Text>
                <Text color="mckinsey.gray.600" fontSize="sm">
                  Jump directly to your most used tools and continue where you left off
                </Text>
              </VStack>
              
              <Divider />
              
              <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
                <Button
                  leftIcon={<FiTarget />}
                  variant="mckinseyOutline"
                  size="sm"
                  onClick={() => onNavigate('business-model-canvas')}
                >
                  Business Model Canvas
                </Button>
                <Button
                  leftIcon={<FiBarChart3 />}
                  variant="mckinseyOutline"
                  size="sm"
                  onClick={() => onNavigate('five-forces')}
                >
                  Competitive Analysis
                </Button>
                <Button
                  leftIcon={<FiTrendingUp />}
                  variant="mckinseyOutline"
                  size="sm"
                  onClick={() => onNavigate('execution-tracker')}
                >
                  Strategy Tracker
                </Button>
                <Button
                  leftIcon={<FiMap />}
                  variant="mckinseyOutline"
                  size="sm"
                  onClick={() => onNavigate('strategic-journey')}
                >
                  Journey Mapping
                </Button>
              </Grid>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default CoreFeaturesPage;