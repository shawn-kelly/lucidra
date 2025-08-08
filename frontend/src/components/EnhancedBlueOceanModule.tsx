import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Grid,
  GridItem,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Badge,
  Progress,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Tag,
  TagLabel,
  Alert,
  AlertIcon,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider
} from '@chakra-ui/react';

interface BlueOceanCanvas {
  eliminate: string[];
  reduce: string[];
  raise: string[];
  create: string[];
}

interface SixPathsData {
  alternativeIndustries: string[];
  strategicGroups: string[];
  buyerGroups: string[];
  complementaryProducts: string[];
  functionalEmotional: string[];
  timeTrends: string[];
}

interface UtilityStage {
  name: string;
  customerProductivity: number;
  simplicity: number;
  convenience: number;
  risk: number;
  funImage: number;
  environmental: number;
}

interface BlueOceanData {
  canvas: BlueOceanCanvas;
  sixPaths: SixPathsData;
  utilityMap: UtilityStage[];
  valueProposition: string;
  strategicPrice: number;
  targetCost: number;
  adoptionHurdles: string[];
}

const EnhancedBlueOceanModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [completionScore, setCompletionScore] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedQuadrant, setSelectedQuadrant] = useState<keyof BlueOceanCanvas>('eliminate');
  
  const [blueOceanData, setBlueOceanData] = useState<BlueOceanData>({
    canvas: {
      eliminate: ['Complex interfaces', 'High maintenance costs', 'Long setup times'],
      reduce: ['Technical complexity', 'Learning curve', 'Support dependencies'],
      raise: ['User experience', 'Automation level', 'Integration capabilities'],
      create: ['AI-powered insights', 'Self-service features', 'Community ecosystem']
    },
    sixPaths: {
      alternativeIndustries: ['Gaming industry UX', 'Social media engagement', 'E-commerce simplicity'],
      strategicGroups: ['Enterprise vs SMB', 'Self-service vs Full-service', 'Industry-specific vs Generic'],
      buyerGroups: ['End users', 'IT decision makers', 'C-suite executives', 'Procurement teams'],
      complementaryProducts: ['Training platforms', 'Integration tools', 'Analytics dashboards'],
      functionalEmotional: ['Professional efficiency', 'Personal empowerment', 'Team collaboration'],
      timeTrends: ['AI/ML adoption', 'Remote work normalization', 'Sustainability focus']
    },
    utilityMap: [
      { name: 'Purchase', customerProductivity: 7, simplicity: 8, convenience: 6, risk: 3, funImage: 5, environmental: 4 },
      { name: 'Delivery', customerProductivity: 6, simplicity: 7, convenience: 8, risk: 2, funImage: 4, environmental: 5 },
      { name: 'Use', customerProductivity: 9, simplicity: 8, convenience: 9, risk: 2, funImage: 7, environmental: 6 },
      { name: 'Supplements', customerProductivity: 5, simplicity: 6, convenience: 5, risk: 3, funImage: 4, environmental: 5 },
      { name: 'Maintenance', customerProductivity: 8, simplicity: 9, convenience: 7, risk: 2, funImage: 5, environmental: 7 },
      { name: 'Disposal', customerProductivity: 4, simplicity: 5, convenience: 4, risk: 6, funImage: 3, environmental: 8 }
    ],
    valueProposition: 'Democratize strategic intelligence by making enterprise-level business frameworks accessible to growing businesses through AI-powered guidance and gamified experiences.',
    strategicPrice: 99,
    targetCost: 25,
    adoptionHurdles: ['Learning new methodology', 'Organizational change resistance', 'Integration with existing tools']
  });

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  // Calculate completion score based on data completeness
  useEffect(() => {
    let score = 0;
    
    // Canvas completeness (40 points)
    const canvasItems = Object.values(blueOceanData.canvas).reduce((sum, items) => sum + items.length, 0);
    score += Math.min(40, canvasItems * 3);
    
    // Six paths completeness (30 points)
    const sixPathsItems = Object.values(blueOceanData.sixPaths).reduce((sum, items) => sum + items.length, 0);
    score += Math.min(30, sixPathsItems * 2);
    
    // Utility map completeness (15 points)
    const utilityScore = blueOceanData.utilityMap.reduce((sum, stage) => {
      const stageScore = Object.values(stage).filter(val => typeof val === 'number' && val > 0).length;
      return sum + stageScore;
    }, 0);
    score += Math.min(15, utilityScore);
    
    // Strategic elements (15 points)
    score += blueOceanData.valueProposition.length > 0 ? 5 : 0;
    score += blueOceanData.strategicPrice > 0 ? 5 : 0;
    score += blueOceanData.adoptionHurdles.length > 0 ? 5 : 0;
    
    setCompletionScore(Math.min(100, score));
  }, [
    blueOceanData.canvas.eliminate.length,
    blueOceanData.canvas.reduce.length, 
    blueOceanData.canvas.raise.length,
    blueOceanData.canvas.create.length,
    blueOceanData.sixPaths.alternativeIndustries.length,
    blueOceanData.sixPaths.strategicGroups.length,
    blueOceanData.sixPaths.buyerGroups.length,
    blueOceanData.sixPaths.complementaryProducts.length,
    blueOceanData.sixPaths.functionalEmotional.length,
    blueOceanData.sixPaths.timeTrends.length,
    blueOceanData.valueProposition,
    blueOceanData.strategicPrice,
    blueOceanData.adoptionHurdles.length
  ]);

  const addToCanvas = () => {
    if (currentInput.trim()) {
      setBlueOceanData(prev => ({
        ...prev,
        canvas: {
          ...prev.canvas,
          [selectedQuadrant]: [...prev.canvas[selectedQuadrant], currentInput.trim()]
        }
      }));
      setCurrentInput('');
      toast({
        title: `Added to ${selectedQuadrant}`,
        description: currentInput.trim(),
        status: 'success',
        duration: 2000
      });
    }
  };

  const removeFromCanvas = (quadrant: keyof BlueOceanCanvas, index: number) => {
    setBlueOceanData(prev => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        [quadrant]: prev.canvas[quadrant].filter((_, i) => i !== index)
      }
    }));
  };

  const generateInsights = () => {
    const insights = [
      "Consider subscription model like Netflix",
      "Target Gen Z with mobile-first approach", 
      "Bundle with complementary productivity tools",
      "Focus on emotional empowerment messaging",
      "Leverage no-code/low-code trends",
      "Address remote work challenges",
      "Emphasize environmental sustainability",
      "Create community-driven content"
    ];
    
    const newInsights = insights.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    setBlueOceanData(prev => ({
      ...prev,
      sixPaths: {
        ...prev.sixPaths,
        alternativeIndustries: [...prev.sixPaths.alternativeIndustries, ...newInsights.slice(0, 2)],
        timeTrends: [...prev.sixPaths.timeTrends, ...newInsights.slice(2, 4)]
      }
    }));

    toast({
      title: 'AI Insights Generated',
      description: 'Added new strategic exploration ideas',
      status: 'success',
      duration: 3000
    });
  };

  const exportStrategy = () => {
    const exportData = {
      ...blueOceanData,
      completionScore,
      exportDate: new Date().toISOString(),
      recommendations: [
        "Focus on creating exceptional buyer utility in the 'Use' stage",
        "Eliminate pain points in purchase and setup processes", 
        "Raise the bar on simplicity and convenience",
        "Create new community-driven support model"
      ]
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blue-ocean-strategy.json';
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Strategy Exported',
      description: 'Blue Ocean analysis downloaded successfully',
      status: 'success',
      duration: 3000
    });
  };

  const profitMargin = blueOceanData.strategicPrice > 0 ? 
    Math.round(((blueOceanData.strategicPrice - blueOceanData.targetCost) / blueOceanData.strategicPrice) * 100) : 0;

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center" mb={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="blue.600">🌊 Blue Ocean Strategy Workshop</Text>
              <Text color="gray.600">Create uncontested market space through systematic value innovation</Text>
            </VStack>
            <HStack spacing={4}>
              <CircularProgress value={completionScore} color="blue.400" size="80px">
                <CircularProgressLabel fontSize="lg" fontWeight="bold">{completionScore}%</CircularProgressLabel>
              </CircularProgress>
              <VStack spacing={2}>
                <Button colorScheme="purple" size="sm" onClick={generateInsights}>
                  🧠 Generate AI Insights
                </Button>
                <Button colorScheme="blue" size="sm" onClick={exportStrategy} isDisabled={completionScore < 60}>
                  📊 Export Strategy
                </Button>
              </VStack>
            </HStack>
          </HStack>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Stat>
              <StatLabel>Canvas Elements</StatLabel>
              <StatNumber color="blue.500">
                {Object.values(blueOceanData.canvas).reduce((sum, items) => sum + items.length, 0)}
              </StatNumber>
              <StatHelpText>ERRC Framework</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Strategic Paths</StatLabel>
              <StatNumber color="purple.500">
                {Object.values(blueOceanData.sixPaths).reduce((sum, items) => sum + items.length, 0)}
              </StatNumber>
              <StatHelpText>Exploration areas</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Utility Score</StatLabel>
              <StatNumber color="green.500">
                {Math.round(blueOceanData.utilityMap.reduce((sum, stage) => {
                  const stageAvg = (stage.customerProductivity + stage.simplicity + stage.convenience + 
                    stage.funImage + stage.environmental + (10 - stage.risk)) / 6;
                  return sum + stageAvg;
                }, 0) / blueOceanData.utilityMap.length)}
              </StatNumber>
              <StatHelpText>Average utility</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Profit Margin</StatLabel>
              <StatNumber color={profitMargin > 50 ? "green.500" : "orange.500"}>
                {profitMargin}%
              </StatNumber>
              <StatHelpText>Target margin</StatHelpText>
            </Stat>
          </SimpleGrid>
        </Box>

        {/* Main Workshop */}
        <Card>
          <CardBody>
            <Tabs index={activeTab} onChange={setActiveTab} colorScheme="blue">
              <TabList>
                <Tab>🎯 ERRC Canvas</Tab>
                <Tab>🔍 Six Paths</Tab>
                <Tab>📊 Utility Map</Tab>
                <Tab>💡 Value Innovation</Tab>
                <Tab>🚀 Implementation</Tab>
              </TabList>

              <TabPanels>
                {/* ERRC Canvas */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between" align="center">
                      <Text fontSize="xl" fontWeight="bold">Eliminate-Reduce-Raise-Create Framework</Text>
                      <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                        {Object.values(blueOceanData.canvas).reduce((sum, items) => sum + items.length, 0)} Elements
                      </Badge>
                    </HStack>
                    
                    <HStack spacing={4} align="end">
                      <FormControl maxW="200px">
                        <FormLabel>Quadrant</FormLabel>
                        <select 
                          value={selectedQuadrant} 
                          onChange={(e) => setSelectedQuadrant(e.target.value as keyof BlueOceanCanvas)}
                          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                        >
                          <option value="eliminate">🗑️ Eliminate</option>
                          <option value="reduce">📉 Reduce</option>
                          <option value="raise">📈 Raise</option>
                          <option value="create">✨ Create</option>
                        </select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>New Element</FormLabel>
                        <Input 
                          value={currentInput}
                          onChange={(e) => setCurrentInput(e.target.value)}
                          placeholder={`What should we ${selectedQuadrant}?`}
                          onKeyPress={(e) => e.key === 'Enter' && addToCanvas()}
                        />
                      </FormControl>
                      <Button colorScheme="blue" onClick={addToCanvas} minW="100px">
                        Add Element
                      </Button>
                    </HStack>

                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      {/* Eliminate */}
                      <Card border="2px solid" borderColor="red.200" bg="red.50">
                        <CardHeader>
                          <HStack justify="space-between">
                            <Text fontWeight="bold" color="red.600" fontSize="lg">🗑️ ELIMINATE</Text>
                            <Badge colorScheme="red">{blueOceanData.canvas.eliminate.length}</Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">Factors to remove completely</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanData.canvas.eliminate.map((item, index) => (
                              <HStack key={index} justify="space-between" p={2} bg="white" borderRadius="md">
                                <Text fontSize="sm">{item}</Text>
                                <IconButton
                                  size="xs"
                                  colorScheme="red"
                                  variant="ghost"
                                  aria-label="Remove"
                                  icon={<span>✕</span>}
                                  onClick={() => removeFromCanvas('eliminate', index)}
                                />
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>

                      {/* Reduce */}
                      <Card border="2px solid" borderColor="orange.200" bg="orange.50">
                        <CardHeader>
                          <HStack justify="space-between">
                            <Text fontWeight="bold" color="orange.600" fontSize="lg">📉 REDUCE</Text>
                            <Badge colorScheme="orange">{blueOceanData.canvas.reduce.length}</Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">Factors to reduce below industry standard</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanData.canvas.reduce.map((item, index) => (
                              <HStack key={index} justify="space-between" p={2} bg="white" borderRadius="md">
                                <Text fontSize="sm">{item}</Text>
                                <IconButton
                                  size="xs"
                                  colorScheme="orange"
                                  variant="ghost"
                                  aria-label="Remove"
                                  icon={<span>✕</span>}
                                  onClick={() => removeFromCanvas('reduce', index)}
                                />
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>

                      {/* Raise */}
                      <Card border="2px solid" borderColor="green.200" bg="green.50">
                        <CardHeader>
                          <HStack justify="space-between">
                            <Text fontWeight="bold" color="green.600" fontSize="lg">📈 RAISE</Text>
                            <Badge colorScheme="green">{blueOceanData.canvas.raise.length}</Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">Factors to raise above industry standard</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanData.canvas.raise.map((item, index) => (
                              <HStack key={index} justify="space-between" p={2} bg="white" borderRadius="md">
                                <Text fontSize="sm">{item}</Text>
                                <IconButton
                                  size="xs"
                                  colorScheme="green"
                                  variant="ghost"
                                  aria-label="Remove"
                                  icon={<span>✕</span>}
                                  onClick={() => removeFromCanvas('raise', index)}
                                />
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>

                      {/* Create */}
                      <Card border="2px solid" borderColor="blue.200" bg="blue.50">
                        <CardHeader>
                          <HStack justify="space-between">
                            <Text fontWeight="bold" color="blue.600" fontSize="lg">✨ CREATE</Text>
                            <Badge colorScheme="blue">{blueOceanData.canvas.create.length}</Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">New factors never offered by industry</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanData.canvas.create.map((item, index) => (
                              <HStack key={index} justify="space-between" p={2} bg="white" borderRadius="md">
                                <Text fontSize="sm">{item}</Text>
                                <IconButton
                                  size="xs"
                                  colorScheme="blue"
                                  variant="ghost"
                                  aria-label="Remove"
                                  icon={<span>✕</span>}
                                  onClick={() => removeFromCanvas('create', index)}
                                />
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    </Grid>
                  </VStack>
                </TabPanel>

                {/* Six Paths */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="xl" fontWeight="bold">Six Paths to Blue Ocean Opportunities</Text>
                      <Button colorScheme="purple" onClick={generateInsights}>
                        🧠 Generate AI Insights
                      </Button>
                    </HStack>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                      {Object.entries(blueOceanData.sixPaths).map(([key, items], pathIndex) => {
                        const pathConfig = {
                          alternativeIndustries: { title: '🏭 Alternative Industries', color: 'purple' },
                          strategicGroups: { title: '👥 Strategic Groups', color: 'green' },
                          buyerGroups: { title: '🎯 Buyer Groups', color: 'blue' },
                          complementaryProducts: { title: '🔗 Complementary Products', color: 'orange' },
                          functionalEmotional: { title: '💝 Functional-Emotional Appeal', color: 'pink' },
                          timeTrends: { title: '⏰ Time Trends', color: 'teal' }
                        };

                        const config = pathConfig[key as keyof typeof pathConfig];
                        
                        return (
                          <Card key={key}>
                            <CardHeader>
                              <HStack justify="space-between">
                                <Text fontWeight="bold" color={`${config.color}.600`}>{config.title}</Text>
                                <Badge colorScheme={config.color}>{items.length}</Badge>
                              </HStack>
                            </CardHeader>
                            <CardBody>
                              <VStack align="stretch" spacing={2}>
                                {items.map((item, index) => (
                                  <Tag key={index} size="sm" colorScheme={config.color}>
                                    <TagLabel>{item}</TagLabel>
                                  </Tag>
                                ))}
                                <Input
                                  size="sm"
                                  placeholder={`Add ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      const input = e.currentTarget.value;
                                      if (input.trim()) {
                                        setBlueOceanData(prev => ({
                                          ...prev,
                                          sixPaths: {
                                            ...prev.sixPaths,
                                            [key]: [...items, input.trim()]
                                          }
                                        }));
                                        e.currentTarget.value = '';
                                      }
                                    }
                                  }}
                                />
                              </VStack>
                            </CardBody>
                          </Card>
                        );
                      })}
                    </SimpleGrid>
                  </VStack>
                </TabPanel>

                {/* Utility Map */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Buyer Utility Map</Text>
                    <Text color="gray.600">
                      Rate utility levels across the buyer experience cycle (0-10 scale). 
                      High scores in underserved areas indicate Blue Ocean opportunities.
                    </Text>

                    <Box overflowX="auto">
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Experience Stage</Th>
                            <Th textAlign="center">Customer Productivity</Th>
                            <Th textAlign="center">Simplicity</Th>
                            <Th textAlign="center">Convenience</Th>
                            <Th textAlign="center">Risk Reduction</Th>
                            <Th textAlign="center">Fun & Image</Th>
                            <Th textAlign="center">Environmental</Th>
                            <Th textAlign="center">Average</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {blueOceanData.utilityMap.map((stage, stageIndex) => {
                            const utilities = [
                              stage.customerProductivity, stage.simplicity, stage.convenience, 
                              10 - stage.risk, stage.funImage, stage.environmental
                            ];
                            const average = utilities.reduce((sum, val) => sum + val, 0) / utilities.length;
                            
                            return (
                              <Tr key={stageIndex}>
                                <Td fontWeight="semibold">{stage.name}</Td>
                                {(['customerProductivity', 'simplicity', 'convenience', 'risk', 'funImage', 'environmental'] as const).map((utilityType) => (
                                  <Td key={utilityType} textAlign="center">
                                    <NumberInput 
                                      min={0} 
                                      max={10} 
                                      value={stage[utilityType]}
                                      onChange={(_, num) => {
                                        setBlueOceanData(prev => ({
                                          ...prev,
                                          utilityMap: prev.utilityMap.map((s, i) => 
                                            i === stageIndex ? { ...s, [utilityType]: num || 0 } : s
                                          )
                                        }));
                                      }}
                                      size="sm"
                                      w="70px"
                                    >
                                      <NumberInputField textAlign="center" />
                                    </NumberInput>
                                  </Td>
                                ))}
                                <Td textAlign="center">
                                  <Badge colorScheme={average > 7 ? 'green' : average > 5 ? 'yellow' : 'red'}>
                                    {average.toFixed(1)}
                                  </Badge>
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </Box>

                    <Alert status="info">
                      <AlertIcon />
                      <Box>
                        <Text fontWeight="semibold">Utility Optimization Tips</Text>
                        <Text fontSize="sm">
                          • Focus on stages with low utility scores for breakthrough opportunities<br/>
                          • Consider eliminating or reducing low-value stages<br/>
                          • Create new utility in unexplored stage-lever combinations
                        </Text>
                      </Box>
                    </Alert>
                  </VStack>
                </TabPanel>

                {/* Value Innovation */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Value Innovation Framework</Text>

                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold" fontSize="lg">🎯 Value Proposition</Text>
                      </CardHeader>
                      <CardBody>
                        <Textarea
                          value={blueOceanData.valueProposition}
                          onChange={(e) => setBlueOceanData(prev => ({
                            ...prev,
                            valueProposition: e.target.value
                          }))}
                          placeholder="Describe your unique value proposition that combines differentiation and low cost..."
                          rows={4}
                          resize="vertical"
                        />
                      </CardBody>
                    </Card>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="blue.600">📈 Strategic Pricing</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4}>
                            <FormControl>
                              <FormLabel>Strategic Price ($)</FormLabel>
                              <NumberInput
                                value={blueOceanData.strategicPrice}
                                onChange={(_, num) => setBlueOceanData(prev => ({
                                  ...prev,
                                  strategicPrice: num || 0
                                }))}
                              >
                                <NumberInputField />
                              </NumberInput>
                            </FormControl>
                            <FormControl>
                              <FormLabel>Target Cost ($)</FormLabel>
                              <NumberInput
                                value={blueOceanData.targetCost}
                                onChange={(_, num) => setBlueOceanData(prev => ({
                                  ...prev,
                                  targetCost: num || 0
                                }))}
                              >
                                <NumberInputField />
                              </NumberInput>
                            </FormControl>
                            <HStack justify="space-between" w="100%">
                              <Text fontSize="sm">Profit Margin:</Text>
                              <Badge colorScheme={profitMargin > 50 ? 'green' : profitMargin > 30 ? 'yellow' : 'red'} fontSize="md">
                                {profitMargin}%
                              </Badge>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="orange.600">🚧 Adoption Hurdles</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <Input
                              placeholder="Add adoption hurdle..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.currentTarget.value;
                                  if (input.trim()) {
                                    setBlueOceanData(prev => ({
                                      ...prev,
                                      adoptionHurdles: [...prev.adoptionHurdles, input.trim()]
                                    }));
                                    e.currentTarget.value = '';
                                  }
                                }
                              }}
                            />
                            {blueOceanData.adoptionHurdles.map((hurdle, index) => (
                              <HStack key={index} justify="space-between">
                                <Tag colorScheme="orange" size="sm">
                                  <TagLabel>{hurdle}</TagLabel>
                                </Tag>
                                <IconButton
                                  size="xs"
                                  aria-label="Remove hurdle"
                                  icon={<span>✕</span>}
                                  onClick={() => {
                                    setBlueOceanData(prev => ({
                                      ...prev,
                                      adoptionHurdles: prev.adoptionHurdles.filter((_, i) => i !== index)
                                    }));
                                  }}
                                />
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                  </VStack>
                </TabPanel>

                {/* Implementation */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Implementation Roadmap</Text>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                      <Alert status={completionScore > 80 ? 'success' : completionScore > 60 ? 'warning' : 'error'}>
                        <AlertIcon />
                        <Box>
                          <Text fontWeight="semibold">Strategy Readiness</Text>
                          <Text fontSize="sm">
                            {completionScore > 80 ? 'Ready for market testing' : 
                             completionScore > 60 ? 'Nearly ready for validation' : 'Continue building framework'}
                          </Text>
                        </Box>
                      </Alert>
                      
                      <Alert status="info">
                        <AlertIcon />
                        <Box>
                          <Text fontWeight="semibold">Next Steps</Text>
                          <Text fontSize="sm">Test buyer utility assumptions</Text>
                        </Box>
                      </Alert>
                      
                      <Alert status="info">
                        <AlertIcon />
                        <Box>
                          <Text fontWeight="semibold">Validation</Text>
                          <Text fontSize="sm">Pilot with target segments</Text>
                        </Box>
                      </Alert>
                    </SimpleGrid>

                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold" fontSize="lg">🎯 Strategic Recommendations</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <HStack>
                            <Badge colorScheme="green">✓</Badge>
                            <Text fontSize="sm">Focus on highest utility gaps in buyer experience</Text>
                          </HStack>
                          <HStack>
                            <Badge colorScheme="green">✓</Badge>
                            <Text fontSize="sm">Validate price point with target buyer groups</Text>
                          </HStack>
                          <HStack>
                            <Badge colorScheme="yellow">○</Badge>
                            <Text fontSize="sm">Develop cost structure to achieve target margin</Text>
                          </HStack>
                          <HStack>
                            <Badge colorScheme="yellow">○</Badge>
                            <Text fontSize="sm">Create adoption strategy to overcome hurdles</Text>
                          </HStack>
                          <HStack>
                            <Badge colorScheme="blue">→</Badge>
                            <Text fontSize="sm">Monitor competitor responses and maintain differentiation</Text>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Divider />

                    <HStack justify="center" spacing={4}>
                      <Button colorScheme="blue" size="lg" onClick={exportStrategy}>
                        📊 Export Complete Strategy
                      </Button>
                      <Button colorScheme="green" size="lg">
                        🚀 Launch Implementation Plan
                      </Button>
                    </HStack>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default EnhancedBlueOceanModule;