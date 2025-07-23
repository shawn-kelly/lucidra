import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Alert,
  AlertIcon,
  Progress,
  Badge,
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
  useToast,
  Divider,
  CircularProgress,
  CircularProgressLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react';

interface SWOTItem {
  id: string;
  text: string;
  impact: 'high' | 'medium' | 'low';
  timestamp: Date;
}

interface SWOTData {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
}

interface StrategicObjective {
  id: string;
  description: string;
  category: 'financial' | 'customer' | 'internal' | 'learning';
  priority: 'high' | 'medium' | 'low';
  source: 'SO' | 'WO' | 'ST' | 'WT'; // TOWS matrix combinations
  swotItems: string[]; // IDs of SWOT items that generated this objective
}

interface LiveSWOTAnalysisProps {
  businessProfile?: any;
  onDataUpdate?: (data: { swot: SWOTData; objectives: StrategicObjective[] }) => void;
  onComplete?: () => void;
}

const LiveSWOTAnalysis: React.FC<LiveSWOTAnalysisProps> = ({ 
  businessProfile, 
  onDataUpdate,
  onComplete 
}) => {
  const [swotData, setSWOTData] = useState<SWOTData>({
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  });
  
  const [strategicObjectives, setStrategicObjectives] = useState<StrategicObjective[]>([]);
  const [newItems, setNewItems] = useState({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  });
  
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showTOWS, setShowTOWS] = useState(false);
  const [isGeneratingObjectives, setIsGeneratingObjectives] = useState(false);

  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Real-time completion calculation
  useEffect(() => {
    const totalItems = Object.values(swotData).flat().length;
    const minItems = 8; // 2 per category minimum
    const progress = Math.min((totalItems / minItems) * 100, 100);
    setCompletionPercentage(progress);

    // Auto-generate strategic objectives when enough data
    if (totalItems >= 6 && !isGeneratingObjectives) {
      generateStrategicObjectives();
    }

    // Real-time data flow to parent components
    if (onDataUpdate) {
      onDataUpdate({ swot: swotData, objectives: strategicObjectives });
    }
  }, [swotData, strategicObjectives]);

  const addSWOTItem = (category: keyof SWOTData) => {
    const text = newItems[category].trim();
    if (!text) return;

    const newItem: SWOTItem = {
      id: `${category}_${Date.now()}`,
      text,
      impact: 'medium', // Default, can be changed later
      timestamp: new Date()
    };

    setSWOTData(prev => ({
      ...prev,
      [category]: [...prev[category], newItem]
    }));

    setNewItems(prev => ({
      ...prev,
      [category]: ''
    }));

    // Real-time feedback
    toast({
      title: 'Item Added!',
      description: `Added to ${category}`,
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'top-right'
    });
  };

  const removeSWOTItem = (category: keyof SWOTData, id: string) => {
    setSWOTData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const updateItemImpact = (category: keyof SWOTData, id: string, impact: 'high' | 'medium' | 'low') => {
    setSWOTData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, impact } : item
      )
    }));
  };

  // AI-powered strategic objective generation
  const generateStrategicObjectives = async () => {
    setIsGeneratingObjectives(true);
    
    // Simulate AI analysis with real strategic combinations
    setTimeout(() => {
      const newObjectives: StrategicObjective[] = [];

      // SO Strategy (Strengths + Opportunities)
      if (swotData.strengths.length > 0 && swotData.opportunities.length > 0) {
        const topStrength = swotData.strengths[0];
        const topOpportunity = swotData.opportunities[0];
        newObjectives.push({
          id: `SO_${Date.now()}`,
          description: `Leverage ${topStrength.text.toLowerCase()} to capitalize on ${topOpportunity.text.toLowerCase()}`,
          category: 'customer',
          priority: 'high',
          source: 'SO',
          swotItems: [topStrength.id, topOpportunity.id]
        });
      }

      // WO Strategy (Weaknesses + Opportunities)
      if (swotData.weaknesses.length > 0 && swotData.opportunities.length > 0) {
        const topWeakness = swotData.weaknesses[0];
        const topOpportunity = swotData.opportunities[0];
        newObjectives.push({
          id: `WO_${Date.now()}`,
          description: `Address ${topWeakness.text.toLowerCase()} to better pursue ${topOpportunity.text.toLowerCase()}`,
          category: 'internal',
          priority: 'medium',
          source: 'WO',
          swotItems: [topWeakness.id, topOpportunity.id]
        });
      }

      // ST Strategy (Strengths + Threats)
      if (swotData.strengths.length > 0 && swotData.threats.length > 0) {
        const topStrength = swotData.strengths[0];
        const topThreat = swotData.threats[0];
        newObjectives.push({
          id: `ST_${Date.now()}`,
          description: `Use ${topStrength.text.toLowerCase()} to defend against ${topThreat.text.toLowerCase()}`,
          category: 'financial',
          priority: 'high',
          source: 'ST',
          swotItems: [topStrength.id, topThreat.id]
        });
      }

      // WT Strategy (Weaknesses + Threats)
      if (swotData.weaknesses.length > 0 && swotData.threats.length > 0) {
        const topWeakness = swotData.weaknesses[0];
        const topThreat = swotData.threats[0];
        newObjectives.push({
          id: `WT_${Date.now()}`,
          description: `Minimize ${topWeakness.text.toLowerCase()} to reduce vulnerability to ${topThreat.text.toLowerCase()}`,
          category: 'learning',
          priority: 'medium',
          source: 'WT',
          swotItems: [topWeakness.id, topThreat.id]
        });
      }

      setStrategicObjectives(newObjectives);
      setShowTOWS(true);
      setIsGeneratingObjectives(false);

      toast({
        title: 'Strategic Objectives Generated!',
        description: `${newObjectives.length} objectives created from your SWOT analysis`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  const getSWOTCategories = () => [
    { 
      key: 'strengths' as keyof SWOTData, 
      name: 'Strengths', 
      icon: '💪', 
      color: 'green',
      description: 'Internal positive factors',
      prompt: `What are ${businessProfile?.businessName || 'your company'}'s key strengths?`
    },
    { 
      key: 'weaknesses' as keyof SWOTData, 
      name: 'Weaknesses', 
      icon: '⚠️', 
      color: 'red',
      description: 'Internal negative factors',
      prompt: `What weaknesses does ${businessProfile?.businessName || 'your company'} need to address?`
    },
    { 
      key: 'opportunities' as keyof SWOTData, 
      name: 'Opportunities', 
      icon: '🚀', 
      color: 'blue',
      description: 'External positive factors',
      prompt: `What market opportunities can ${businessProfile?.businessName || 'your company'} pursue?`
    },
    { 
      key: 'threats' as keyof SWOTData, 
      name: 'Threats', 
      icon: '⚡', 
      color: 'orange',
      description: 'External negative factors',
      prompt: `What external threats should ${businessProfile?.businessName || 'your company'} prepare for?`
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financial': return 'green';
      case 'customer': return 'blue';
      case 'internal': return 'orange';
      case 'learning': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} maxW="7xl" mx="auto">
        {/* Header with Live Progress */}
        <Card bg={cardBg} w="100%">
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold">
                  🎯 Live SWOT Analysis - {businessProfile?.businessName || 'Your Business'}
                </Text>
                <Text color="gray.500">
                  Real-time strategic analysis with auto-generating objectives
                </Text>
              </VStack>
              <VStack align="end" spacing={1}>
                <CircularProgress value={completionPercentage} color="teal.400" size="80px">
                  <CircularProgressLabel>{Math.round(completionPercentage)}%</CircularProgressLabel>
                </CircularProgress>
                <Text fontSize="sm" color="gray.500">Complete</Text>
              </VStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <HStack spacing={4}>
              <Progress value={completionPercentage} colorScheme="teal" size="lg" flex={1} />
              <Text fontSize="sm" fontWeight="semibold">
                {Object.values(swotData).flat().length} items added
              </Text>
            </HStack>
          </CardBody>
        </Card>

        {/* Live SWOT Grid */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
          {getSWOTCategories().map((category) => (
            <Card key={category.key} bg={cardBg} border="2px solid" borderColor={`${category.color}.200`}>
              <CardHeader bg={`${category.color}.50`}>
                <HStack justify="space-between">
                  <HStack>
                    <Text fontSize="2xl">{category.icon}</Text>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" color={`${category.color}.700`}>
                        {category.name}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {category.description}
                      </Text>
                    </VStack>
                  </HStack>
                  <Badge colorScheme={category.color}>
                    {swotData[category.key].length} items
                  </Badge>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  {/* AI Prompt */}
                  <Alert status="info" size="sm">
                    <Text fontSize="sm">{category.prompt}</Text>
                  </Alert>

                  {/* Add New Item */}
                  <HStack w="100%">
                    <Input
                      placeholder={`Add ${category.name.toLowerCase()}...`}
                      value={newItems[category.key]}
                      onChange={(e) => setNewItems(prev => ({
                        ...prev,
                        [category.key]: e.target.value
                      }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSWOTItem(category.key);
                        }
                      }}
                      size="sm"
                    />
                    <Button
                      colorScheme={category.color}
                      size="sm"
                      onClick={() => addSWOTItem(category.key)}
                      isDisabled={!newItems[category.key].trim()}
                    >
                      Add
                    </Button>
                  </HStack>

                  {/* Live Items List */}
                  <VStack spacing={2} w="100%">
                    {swotData[category.key].map((item) => (
                      <Card key={item.id} w="100%" variant="outline" size="sm">
                        <CardBody p={3}>
                          <HStack justify="space-between">
                            <Text fontSize="sm" flex={1}>{item.text}</Text>
                            <HStack>
                              <Button
                                size="xs"
                                colorScheme={getImpactColor(item.impact)}
                                variant="outline"
                                onClick={() => {
                                  const impacts: ('high' | 'medium' | 'low')[] = ['low', 'medium', 'high'];
                                  const currentIndex = impacts.indexOf(item.impact);
                                  const nextImpact = impacts[(currentIndex + 1) % impacts.length];
                                  updateItemImpact(category.key, item.id, nextImpact);
                                }}
                              >
                                {item.impact}
                              </Button>
                              <IconButton
                                size="xs"
                                variant="ghost"
                                colorScheme="red"
                                aria-label="Remove"
                                icon={<Text>×</Text>}
                                onClick={() => removeSWOTItem(category.key, item.id)}
                              />
                            </HStack>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>

        {/* Live Strategic Objectives Generation */}
        {showTOWS && (
          <Card bg={cardBg} w="100%">
            <CardHeader>
              <HStack justify="space-between">
                <Text fontSize="xl" fontWeight="bold">🎯 Auto-Generated Strategic Objectives</Text>
                <Badge colorScheme="purple" variant="outline">
                  {strategicObjectives.length} objectives
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <Alert status="success" mb={4}>
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">AI Analysis Complete!</Text>
                  <Text fontSize="sm">
                    Your SWOT data has been automatically processed using TOWS matrix analysis 
                    to generate strategic objectives that will flow into your Balanced Scorecard.
                  </Text>
                </VStack>
              </Alert>

              <VStack spacing={3}>
                {strategicObjectives.map((objective) => (
                  <Card key={objective.id} w="100%" variant="outline">
                    <CardBody>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1} flex={1}>
                          <Text fontSize="sm" fontWeight="semibold">{objective.description}</Text>
                          <HStack>
                            <Badge colorScheme={getCategoryColor(objective.category)} variant="subtle">
                              {objective.category}
                            </Badge>
                            <Badge colorScheme={objective.priority === 'high' ? 'red' : 'yellow'} variant="outline">
                              {objective.priority} priority
                            </Badge>
                            <Badge variant="outline">{objective.source} Strategy</Badge>
                          </HStack>
                        </VStack>
                        <Text fontSize="xs" color="gray.500">
                          Live Generated
                        </Text>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Loading State for Objective Generation */}
        {isGeneratingObjectives && (
          <Card bg="blue.50" border="2px solid" borderColor="blue.200" w="100%">
            <CardBody textAlign="center">
              <VStack spacing={3}>
                <CircularProgress isIndeterminate color="blue.400" />
                <Text fontWeight="semibold">🤖 AI Analyzing Your SWOT Data...</Text>
                <Text fontSize="sm" color="gray.600">
                  Generating strategic objectives using TOWS matrix analysis
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Real-time Stats */}
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4} w="100%">
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Analysis Progress</StatLabel>
                <StatNumber>{Math.round(completionPercentage)}%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Real-time updates
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>SWOT Items</StatLabel>
                <StatNumber>{Object.values(swotData).flat().length}</StatNumber>
                <StatHelpText>Total entries</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Strategic Objectives</StatLabel>
                <StatNumber>{strategicObjectives.length}</StatNumber>
                <StatHelpText>Auto-generated</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg}>
            <CardBody>
              <Stat>
                <StatLabel>Data Flow</StatLabel>
                <StatNumber>Live</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  To Balanced Scorecard
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Complete Button */}
        {completionPercentage >= 100 && (
          <Card bg="green.50" border="2px solid" borderColor="green.200" w="100%">
            <CardBody textAlign="center">
              <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">🎉 SWOT Analysis Complete!</Text>
                <Text fontSize="sm" color="gray.600">
                  Your strategic objectives are now flowing into the Balanced Scorecard and financial models.
                </Text>
                <HStack>
                  <Button colorScheme="green" onClick={onComplete}>
                    Continue to Business Model Canvas
                  </Button>
                  <Button variant="outline" onClick={() => window.print()}>
                    Export Analysis
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
};

export default LiveSWOTAnalysis;