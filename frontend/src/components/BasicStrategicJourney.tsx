import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Alert,
  AlertIcon,
  Badge,
  Grid,
  useColorModeValue
} from '@chakra-ui/react';

interface BasicBusinessProfile {
  id: string;
  businessName: string;
  industry: string;
  stage: 'idea' | 'mvp' | 'growth' | 'pivot';
  goals: string[];
}

interface BasicStrategicJourneyProps {
  businessProfile?: BasicBusinessProfile | null;
  currentTier?: 'lite' | 'pro' | 'enterprise';
}

const BasicStrategicJourney: React.FC<BasicStrategicJourneyProps> = ({ 
  businessProfile,
  currentTier = 'pro'
}) => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const journeySteps = [
    {
      id: 'swot-analysis',
      name: 'SWOT Analysis',
      icon: '🎯',
      description: 'Analyze strengths, weaknesses, opportunities, and threats',
      estimatedTime: 30,
      status: 'available'
    },
    {
      id: 'business-model',
      name: 'Business Model Canvas',
      icon: '🗺️',
      description: 'Map your business model components',
      estimatedTime: 45,
      status: 'available'
    },
    {
      id: 'financial-planning',
      name: 'Financial Planning',
      icon: '💰',
      description: 'Create financial projections and models',
      estimatedTime: 60,
      status: 'available'
    }
  ];

  if (activeStep) {
    return (
      <Box p={6} bg={bgColor} minH="100vh">
        <VStack spacing={6} maxW="7xl" mx="auto">
          <HStack justify="space-between" mb={4} w="100%">
            <Text fontSize="2xl" fontWeight="bold">
              🎯 {activeStep.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Tool
            </Text>
            <Button variant="outline" onClick={() => setActiveStep(null)}>
              ← Back to Journey
            </Button>
          </HStack>
          
          <Alert status="success">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">🚀 Interactive Tool Launching!</Text>
              <Text fontSize="sm">
                This is where the live, dynamic {activeStep.replace('-', ' ')} tool will launch. 
                Real-time updates, auto-populating data, and guided strategic planning.
              </Text>
            </VStack>
          </Alert>

          <Card bg={cardBg} w="100%">
            <CardBody textAlign="center" py={20}>
              <VStack spacing={4}>
                <Text fontSize="4xl">🔧</Text>
                <Text fontSize="xl" fontWeight="bold">Dynamic Tool Interface</Text>
                <Text color="gray.600">
                  Live SWOT Analysis with real-time strategic objective generation 
                  and auto-populating Balanced Scorecard integration.
                </Text>
                <Button colorScheme="teal" onClick={() => setActiveStep(null)}>
                  Continue Development
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} maxW="7xl" mx="auto">
        {/* Header */}
        <Card bg={cardBg} w="100%">
          <CardHeader>
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">
                🗺️ Strategic Journey Map - {currentTier.toUpperCase()}
              </Text>
              <Text color="gray.500">
                {businessProfile?.businessName || 'Your Business'} • Dynamic Strategic Planning
              </Text>
            </VStack>
          </CardHeader>
        </Card>

        {/* Journey Steps */}
        <VStack spacing={6} align="stretch">
          <Alert status="success">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">🎉 Dynamic Strategic Journey Ready!</Text>
              <Text fontSize="sm">
                Click on any tool below to launch the live, interactive strategic planning experience. 
                Your data will flow automatically between frameworks with real-time updates.
              </Text>
            </VStack>
          </Alert>

          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
            {journeySteps.map((step) => (
              <Card 
                key={step.id} 
                variant="outline" 
                cursor="pointer"
                _hover={{ bg: 'teal.50', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                onClick={() => setActiveStep(step.id)}
              >
                <CardHeader>
                  <HStack justify="space-between">
                    <HStack>
                      <Text fontSize="2xl">{step.icon}</Text>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">{step.name}</Text>
                        <Text fontSize="sm" color="gray.500">{step.description}</Text>
                      </VStack>
                    </HStack>
                    <Badge colorScheme="green">Ready</Badge>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">
                      Est. Time: {step.estimatedTime} min
                    </Text>
                    <Button size="sm" colorScheme="teal">
                      Launch Dynamic Tool
                    </Button>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </Grid>

          {/* Dynamic Features Preview */}
          <Card bg="teal.50" border="2px solid" borderColor="teal.200">
            <CardBody>
              <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">🔄 Real-Time Data Flow Features</Text>
                <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="semibold" fontSize="sm">✅ Live SWOT Analysis</Text>
                    <Text fontSize="xs" color="gray.600">
                      Real-time progress tracking, auto-generating strategic objectives using TOWS matrix
                    </Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="semibold" fontSize="sm">🔄 Auto-Populating Scorecard</Text>
                    <Text fontSize="xs" color="gray.600">
                      Balanced Scorecard automatically updates from SWOT analysis data
                    </Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="semibold" fontSize="sm">📊 Dynamic Progress</Text>
                    <Text fontSize="xs" color="gray.600">
                      Journey completion tracking with live updates and visual indicators
                    </Text>
                  </VStack>
                </Grid>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </VStack>
    </Box>
  );
};

export default BasicStrategicJourney;