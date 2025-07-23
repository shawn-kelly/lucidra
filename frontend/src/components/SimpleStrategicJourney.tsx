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
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import LiveSWOTAnalysis from './LiveSWOTAnalysis';

interface SimpleBusinessProfile {
  id: string;
  businessName: string;
  industry: string;
  stage: 'idea' | 'mvp' | 'growth' | 'pivot';
  description: string;
  targetMarket: string;
  goals: string[];
  challenges: string[];
  createdAt: string;
}

interface SimpleStrategicJourneyProps {
  businessProfile?: SimpleBusinessProfile | null;
  currentTier?: 'lite' | 'pro' | 'enterprise';
}

const SimpleStrategicJourney: React.FC<SimpleStrategicJourneyProps> = ({ 
  businessProfile,
  currentTier = 'pro'
}) => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [swotData, setSWOTData] = useState<any>(null);
  const [strategicObjectives, setStrategicObjectives] = useState<any[]>([]);
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSWOTDataUpdate = (data: { swot: any; objectives: any[] }) => {
    setSWOTData(data.swot);
    setStrategicObjectives(data.objectives);
  };

  const handleSWOTComplete = () => {
    setActiveStep(null);
  };

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
      status: swotData ? 'available' : 'locked'
    },
    {
      id: 'financial-planning',
      name: 'Financial Planning',
      icon: '💰',
      description: 'Create financial projections and models',
      estimatedTime: 60,
      status: 'locked'
    }
  ];

  // Tool Renderer
  const renderActiveTool = () => {
    if (activeStep === 'swot-analysis') {
      return (
        <Box>
          <HStack justify="space-between" mb={4}>
            <Text fontSize="2xl" fontWeight="bold">
              🎯 Live SWOT Analysis Tool
            </Text>
            <Button variant="outline" onClick={() => setActiveStep(null)}>
              ← Back to Journey
            </Button>
          </HStack>
          <LiveSWOTAnalysis
            businessProfile={businessProfile}
            onDataUpdate={handleSWOTDataUpdate}
            onComplete={handleSWOTComplete}
          />
        </Box>
      );
    }

    return (
      <Box p={6}>
        <HStack justify="space-between" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">
            🔧 {activeStep?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Tool
          </Text>
          <Button variant="outline" onClick={() => setActiveStep(null)}>
            ← Back to Journey
          </Button>
        </HStack>
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Tool Under Development</Text>
            <Text fontSize="sm">
              This interactive tool is being developed. For now, you can continue with the journey.
            </Text>
          </VStack>
        </Alert>
        <Button mt={4} colorScheme="teal" onClick={() => setActiveStep(null)}>
          Back to Journey
        </Button>
      </Box>
    );
  };

  // Balanced Scorecard View
  const renderBalancedScorecard = () => (
    <VStack spacing={6} align="stretch">
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">📊 Balanced Scorecard (Auto-Populated)</Text>
            <Badge colorScheme="teal" variant="outline">
              {strategicObjectives.length > 0 ? '50' : '0'}% Complete
            </Badge>
          </HStack>
        </CardHeader>
        <CardBody>
          <Alert status={strategicObjectives.length > 0 ? "success" : "info"} mb={4}>
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">
                {strategicObjectives.length > 0 ? "Live Data Flow Active!" : "Dynamic Population:"}
              </Text>
              <Text fontSize="sm">
                {strategicObjectives.length > 0 
                  ? `🔄 Live updates: ${strategicObjectives.length} strategic objectives from SWOT analysis are now populating your Balanced Scorecard in real-time!`
                  : "Your Balanced Scorecard automatically populates as you complete journey steps: SWOT → Strategic Objectives, Financial Models → Targets, Value Chain → Internal Processes"
                }
              </Text>
            </VStack>
          </Alert>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {['Financial', 'Customer', 'Internal', 'Learning'].map((perspective, index) => (
              <Card key={perspective} variant="outline">
                <CardHeader bg={`${['green', 'blue', 'orange', 'purple'][index]}.50`}>
                  <HStack>
                    <Text fontSize="xl">{['💰', '👥', '⚙️', '📚'][index]}</Text>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">{perspective}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {perspective === 'Financial' ? 'Revenue, profitability, cost management' :
                         perspective === 'Customer' ? 'Customer satisfaction, retention, acquisition' :
                         perspective === 'Internal' ? 'Operational efficiency, quality, innovation' :
                         'Employee development, capabilities, culture'}
                      </Text>
                    </VStack>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <HStack justify="space-between" w="100%">
                      <Text fontSize="sm" fontWeight="semibold">Objectives:</Text>
                      <Badge colorScheme={['green', 'blue', 'orange', 'purple'][index]}>
                        {strategicObjectives.filter(obj => obj.category === perspective.toLowerCase()).length}
                      </Badge>
                    </HStack>
                    
                    {strategicObjectives.filter(obj => obj.category === perspective.toLowerCase()).length > 0 ? (
                      strategicObjectives
                        .filter(obj => obj.category === perspective.toLowerCase())
                        .map((objective, idx) => (
                          <Box key={idx} w="100%" p={2} bg="gray.50" borderRadius="md">
                            <Text fontSize="sm">{objective.description}</Text>
                            <Text fontSize="xs" color="gray.500">
                              Source: SWOT Analysis
                            </Text>
                          </Box>
                        ))
                    ) : (
                      <Text fontSize="sm" color="gray.500" textAlign="center">
                        Will populate from your strategic analysis
                      </Text>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  if (activeStep) {
    return (
      <Box p={6} bg={bgColor} minH="100vh">
        <VStack spacing={6} maxW="7xl" mx="auto">
          {renderActiveTool()}
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
                {businessProfile?.businessName || 'Your Business'} • Interactive Strategic Planning
              </Text>
            </VStack>
          </CardHeader>
        </Card>

        {/* View Mode Tabs */}
        <Card bg={cardBg} w="100%">
          <CardBody>
            <Tabs>
              <TabList>
                <Tab>🗺️ Journey Map</Tab>
                <Tab>📊 Balanced Scorecard</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* Journey Steps */}
                  <VStack spacing={6} align="stretch">
                    <Alert status="success">
                      <AlertIcon />
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">🎉 Welcome to Your Strategic Journey!</Text>
                        <Text fontSize="sm">
                          Complete each step to build your comprehensive strategic plan. Your data will flow automatically between tools.
                        </Text>
                      </VStack>
                    </Alert>

                    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                      {journeySteps.map((step, index) => (
                        <Card 
                          key={step.id} 
                          variant="outline" 
                          cursor={step.status === 'available' ? 'pointer' : 'not-allowed'}
                          opacity={step.status === 'locked' ? 0.6 : 1}
                          _hover={step.status === 'available' ? { bg: 'teal.50' } : {}}
                          onClick={() => step.status === 'available' && setActiveStep(step.id)}
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
                              <Badge 
                                colorScheme={
                                  step.status === 'available' ? 'green' : 
                                  step.status === 'completed' ? 'blue' : 'gray'
                                }
                              >
                                {step.status === 'available' ? 'Ready' :
                                 step.status === 'completed' ? 'Done' : 'Locked'}
                              </Badge>
                            </HStack>
                          </CardHeader>
                          <CardBody>
                            <HStack justify="space-between">
                              <Text fontSize="sm" color="gray.600">
                                Est. Time: {step.estimatedTime} min
                              </Text>
                              {step.status === 'available' && (
                                <Button size="sm" colorScheme="teal">
                                  Start Tool
                                </Button>
                              )}
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </Grid>

                    {/* Data Flow Alert */}
                    {strategicObjectives.length > 0 && (
                      <Alert status="success">
                        <AlertIcon />
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">🔄 Data Flow Active!</Text>
                          <Text fontSize="sm">
                            Your SWOT analysis has generated {strategicObjectives.length} strategic objectives 
                            that are now populating your Balanced Scorecard in real-time!
                          </Text>
                        </VStack>
                      </Alert>
                    )}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  {renderBalancedScorecard()}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default SimpleStrategicJourney;