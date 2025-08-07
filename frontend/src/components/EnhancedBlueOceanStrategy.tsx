import React, { useState, useEffect, useCallback } from 'react';
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
  Select,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Alert,
  AlertIcon,
  IconButton,
  Tooltip,
  Divider,
  Tag,
  TagLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';

// Enhanced Blue Ocean Strategy Interfaces
interface BlueOceanCanvas {
  eliminate: string[];
  reduce: string[];
  raise: string[];
  create: string[];
}

interface SixPathsAnalysis {
  alternativeIndustries: string[];
  strategicGroups: string[];
  buyerGroups: string[];
  complementaryProducts: string[];
  functionalEmotionalAppeal: string[];
  timeTrends: string[];
}

interface BuyerUtilityMap {
  stages: {
    name: string;
    utilities: {
      customerProductivity: number;
      simplicity: number;
      convenience: number;
      risk: number;
      funAndImage: number;
      environmentalFriendliness: number;
    };
  }[];
}

interface BlueOceanStrategy {
  canvas: BlueOceanCanvas;
  sixPaths: SixPathsAnalysis;
  utilityMap: BuyerUtilityMap;
  valueInnovation: {
    differentiationFactors: string[];
    costFactors: string[];
    valueProposition: string;
  };
  strategicSequence: {
    buyerUtility: boolean;
    price: number;
    cost: number;
    adoption: string[];
  };
}

const EnhancedBlueOceanStrategy: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [blueOceanStrategy, setBlueOceanStrategy] = useState<BlueOceanStrategy>({
    canvas: { eliminate: [], reduce: [], raise: [], create: [] },
    sixPaths: {
      alternativeIndustries: [],
      strategicGroups: [],
      buyerGroups: [],
      complementaryProducts: [],
      functionalEmotionalAppeal: [],
      timeTrends: []
    },
    utilityMap: {
      stages: [
        { name: 'Purchase', utilities: { customerProductivity: 0, simplicity: 0, convenience: 0, risk: 0, funAndImage: 0, environmentalFriendliness: 0 } },
        { name: 'Delivery', utilities: { customerProductivity: 0, simplicity: 0, convenience: 0, risk: 0, funAndImage: 0, environmentalFriendliness: 0 } },
        { name: 'Use', utilities: { customerProductivity: 0, simplicity: 0, convenience: 0, risk: 0, funAndImage: 0, environmentalFriendliness: 0 } },
        { name: 'Supplements', utilities: { customerProductivity: 0, simplicity: 0, convenience: 0, risk: 0, funAndImage: 0, environmentalFriendliness: 0 } },
        { name: 'Maintenance', utilities: { customerProductivity: 0, simplicity: 0, convenience: 0, risk: 0, funAndImage: 0, environmentalFriendliness: 0 } },
        { name: 'Disposal', utilities: { customerProductivity: 0, simplicity: 0, convenience: 0, risk: 0, funAndImage: 0, environmentalFriendliness: 0 } }
      ]
    },
    valueInnovation: {
      differentiationFactors: [],
      costFactors: [],
      valueProposition: ''
    },
    strategicSequence: {
      buyerUtility: false,
      price: 0,
      cost: 0,
      adoption: []
    }
  });

  const [completionScore, setCompletionScore] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedCanvasQuadrant, setSelectedCanvasQuadrant] = useState<keyof BlueOceanCanvas>('eliminate');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Calculate completion score
  useEffect(() => {
    const canvasScore = Object.values(blueOceanStrategy.canvas).reduce((sum, items) => sum + items.length, 0) * 5;
    const sixPathsScore = Object.values(blueOceanStrategy.sixPaths).reduce((sum, items) => sum + items.length, 0) * 3;
    const utilityScore = blueOceanStrategy.utilityMap.stages.reduce((sum, stage) => {
      return sum + Object.values(stage.utilities).reduce((utilSum, val) => utilSum + (val > 0 ? 1 : 0), 0);
    }, 0) * 2;
    const valueScore = (blueOceanStrategy.valueInnovation.valueProposition.length > 0 ? 10 : 0) +
                     (blueOceanStrategy.valueInnovation.differentiationFactors.length * 2) +
                     (blueOceanStrategy.valueInnovation.costFactors.length * 2);
    
    const total = Math.min(100, canvasScore + sixPathsScore + utilityScore + valueScore);
    setCompletionScore(total);
  }, [blueOceanStrategy]);

  const addToCanvas = useCallback(() => {
    if (currentInput.trim()) {
      setBlueOceanStrategy(prev => ({
        ...prev,
        canvas: {
          ...prev.canvas,
          [selectedCanvasQuadrant]: [...prev.canvas[selectedCanvasQuadrant], currentInput.trim()]
        }
      }));
      setCurrentInput('');
      toast({
        title: `Added to ${selectedCanvasQuadrant}`,
        description: currentInput.trim(),
        status: 'success',
        duration: 2000
      });
    }
  }, [currentInput, selectedCanvasQuadrant, toast]);

  const removeFromCanvas = useCallback((quadrant: keyof BlueOceanCanvas, index: number) => {
    setBlueOceanStrategy(prev => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        [quadrant]: prev.canvas[quadrant].filter((_, i) => i !== index)
      }
    }));
  }, []);

  const updateUtilityScore = useCallback((stageIndex: number, utilityType: string, value: number) => {
    setBlueOceanStrategy(prev => ({
      ...prev,
      utilityMap: {
        ...prev.utilityMap,
        stages: prev.utilityMap.stages.map((stage, index) => 
          index === stageIndex 
            ? {
                ...stage,
                utilities: {
                  ...stage.utilities,
                  [utilityType]: value
                }
              }
            : stage
        )
      }
    }));
  }, []);

  const generateSixPathsInsights = useCallback(() => {
    const insights = [
      "Consider subscription models from software industry",
      "Target Gen Z with mobile-first approach",
      "Bundle with complementary wellness products",
      "Focus on emotional connection and community",
      "Leverage AI and automation trends",
      "Address sustainability concerns"
    ];
    
    const randomInsights = insights.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    setBlueOceanStrategy(prev => ({
      ...prev,
      sixPaths: {
        ...prev.sixPaths,
        alternativeIndustries: [...prev.sixPaths.alternativeIndustries, ...randomInsights]
      }
    }));

    toast({
      title: 'Six Paths Insights Generated',
      description: 'Added strategic exploration suggestions',
      status: 'success',
      duration: 3000
    });
  }, [toast]);

  const exportStrategy = useCallback(() => {
    const exportData = {
      blueOceanStrategy,
      completionScore,
      exportDate: new Date().toISOString(),
      recommendations: [
        "Focus on high-utility, low-cost innovations",
        "Test buyer utility assumptions with target segments",
        "Develop pricing strategy based on value proposition",
        "Create adoption barriers for competitors"
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
      description: 'Blue Ocean Strategy analysis downloaded',
      status: 'success',
      duration: 3000
    });
  }, [blueOceanStrategy, completionScore, toast]);

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold">🌊 Enhanced Blue Ocean Strategy</Text>
              <Text color="gray.600">Create uncontested market space through value innovation</Text>
            </VStack>
            <HStack spacing={3}>
              <CircularProgress value={completionScore} color="blue.400" size="60px">
                <CircularProgressLabel fontSize="sm">{completionScore}%</CircularProgressLabel>
              </CircularProgress>
              <Button colorScheme="blue" onClick={exportStrategy} isDisabled={completionScore < 50}>
                Export Strategy
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <Text fontSize="lg" fontWeight="semibold">Strategy Development Progress</Text>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
              <Stat>
                <StatLabel>Canvas Elements</StatLabel>
                <StatNumber>{Object.values(blueOceanStrategy.canvas).reduce((sum, items) => sum + items.length, 0)}</StatNumber>
                <StatHelpText>ERRC Framework</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Six Paths Insights</StatLabel>
                <StatNumber>{Object.values(blueOceanStrategy.sixPaths).reduce((sum, items) => sum + items.length, 0)}</StatNumber>
                <StatHelpText>Exploration paths</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Utility Mapping</StatLabel>
                <StatNumber>
                  {blueOceanStrategy.utilityMap.stages.reduce((sum, stage) => 
                    sum + Object.values(stage.utilities).filter(val => val > 0).length, 0
                  )}
                </StatNumber>
                <StatHelpText>Buyer touchpoints</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Value Innovation</StatLabel>
                <StatNumber>
                  {blueOceanStrategy.valueInnovation.differentiationFactors.length + 
                   blueOceanStrategy.valueInnovation.costFactors.length}
                </StatNumber>
                <StatHelpText>Innovation drivers</StatHelpText>
              </Stat>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Main Strategy Builder */}
        <Card>
          <CardBody>
            <Tabs index={activeTab} onChange={setActiveTab} colorScheme="blue">
              <TabList>
                <Tab>🎯 ERRC Canvas</Tab>
                <Tab>🔍 Six Paths</Tab>
                <Tab>📊 Utility Map</Tab>
                <Tab>💡 Value Innovation</Tab>
                <Tab>🚀 Strategic Sequence</Tab>
              </TabList>

              <TabPanels>
                {/* ERRC Canvas */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold">Eliminate-Reduce-Raise-Create Framework</Text>
                    
                    <HStack spacing={4} align="end">
                      <Select value={selectedCanvasQuadrant} onChange={(e) => setSelectedCanvasQuadrant(e.target.value as keyof BlueOceanCanvas)}>
                        <option value="eliminate">Eliminate</option>
                        <option value="reduce">Reduce</option>
                        <option value="raise">Raise</option>
                        <option value="create">Create</option>
                      </Select>
                      <Input 
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        placeholder={`What should we ${selectedCanvasQuadrant}?`}
                        onKeyPress={(e) => e.key === 'Enter' && addToCanvas()}
                      />
                      <Button colorScheme="blue" onClick={addToCanvas}>
                        Add
                      </Button>
                    </HStack>

                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <GridItem>
                        <Card border="2px" borderColor="red.200">
                          <CardHeader bg="red.50">
                            <Text fontWeight="bold" color="red.600">🗑️ ELIMINATE</Text>
                            <Text fontSize="sm" color="gray.600">What factors should be eliminated?</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="stretch" spacing={2}>
                              {blueOceanStrategy.canvas.eliminate.map((item, index) => (
                                <HStack key={index} justify="space-between">
                                  <Text fontSize="sm">{item}</Text>
                                  <IconButton
                                    size="xs"
                                    aria-label="Remove"
                                    icon={<span>✕</span>}
                                    onClick={() => removeFromCanvas('eliminate', index)}
                                  />
                                </HStack>
                              ))}
                              {blueOceanStrategy.canvas.eliminate.length === 0 && (
                                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                                  No items added yet
                                </Text>
                              )}
                            </VStack>
                          </CardBody>
                        </Card>
                      </GridItem>

                      <GridItem>
                        <Card border="2px" borderColor="orange.200">
                          <CardHeader bg="orange.50">
                            <Text fontWeight="bold" color="orange.600">📉 REDUCE</Text>
                            <Text fontSize="sm" color="gray.600">What factors should be reduced?</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="stretch" spacing={2}>
                              {blueOceanStrategy.canvas.reduce.map((item, index) => (
                                <HStack key={index} justify="space-between">
                                  <Text fontSize="sm">{item}</Text>
                                  <IconButton
                                    size="xs"
                                    aria-label="Remove"
                                    icon={<span>✕</span>}
                                    onClick={() => removeFromCanvas('reduce', index)}
                                  />
                                </HStack>
                              ))}
                              {blueOceanStrategy.canvas.reduce.length === 0 && (
                                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                                  No items added yet
                                </Text>
                              )}
                            </VStack>
                          </CardBody>
                        </Card>
                      </GridItem>

                      <GridItem>
                        <Card border="2px" borderColor="green.200">
                          <CardHeader bg="green.50">
                            <Text fontWeight="bold" color="green.600">📈 RAISE</Text>
                            <Text fontSize="sm" color="gray.600">What factors should be raised?</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="stretch" spacing={2}>
                              {blueOceanStrategy.canvas.raise.map((item, index) => (
                                <HStack key={index} justify="space-between">
                                  <Text fontSize="sm">{item}</Text>
                                  <IconButton
                                    size="xs"
                                    aria-label="Remove"
                                    icon={<span>✕</span>}
                                    onClick={() => removeFromCanvas('raise', index)}
                                  />
                                </HStack>
                              ))}
                              {blueOceanStrategy.canvas.raise.length === 0 && (
                                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                                  No items added yet
                                </Text>
                              )}
                            </VStack>
                          </CardBody>
                        </Card>
                      </GridItem>

                      <GridItem>
                        <Card border="2px" borderColor="blue.200">
                          <CardHeader bg="blue.50">
                            <Text fontWeight="bold" color="blue.600">✨ CREATE</Text>
                            <Text fontSize="sm" color="gray.600">What factors should be created?</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="stretch" spacing={2}>
                              {blueOceanStrategy.canvas.create.map((item, index) => (
                                <HStack key={index} justify="space-between">
                                  <Text fontSize="sm">{item}</Text>
                                  <IconButton
                                    size="xs"
                                    aria-label="Remove"
                                    icon={<span>✕</span>}
                                    onClick={() => removeFromCanvas('create', index)}
                                  />
                                </HStack>
                              ))}
                              {blueOceanStrategy.canvas.create.length === 0 && (
                                <Text fontSize="sm" color="gray.500" fontStyle="italic">
                                  No items added yet
                                </Text>
                              )}
                            </VStack>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </Grid>
                  </VStack>
                </TabPanel>

                {/* Six Paths Analysis */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="xl" fontWeight="semibold">Six Paths Framework</Text>
                      <Button colorScheme="purple" onClick={generateSixPathsInsights}>
                        Generate AI Insights
                      </Button>
                    </HStack>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="purple.600">🏭 Alternative Industries</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanStrategy.sixPaths.alternativeIndustries.map((item, index) => (
                              <Tag key={index} size="sm" colorScheme="purple">{item}</Tag>
                            ))}
                            <Input 
                              size="sm" 
                              placeholder="Add alternative industry..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.currentTarget.value;
                                  if (input.trim()) {
                                    setBlueOceanStrategy(prev => ({
                                      ...prev,
                                      sixPaths: {
                                        ...prev.sixPaths,
                                        alternativeIndustries: [...prev.sixPaths.alternativeIndustries, input.trim()]
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

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="green.600">👥 Strategic Groups</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanStrategy.sixPaths.strategicGroups.map((item, index) => (
                              <Tag key={index} size="sm" colorScheme="green">{item}</Tag>
                            ))}
                            <Input 
                              size="sm" 
                              placeholder="Add strategic group..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.currentTarget.value;
                                  if (input.trim()) {
                                    setBlueOceanStrategy(prev => ({
                                      ...prev,
                                      sixPaths: {
                                        ...prev.sixPaths,
                                        strategicGroups: [...prev.sixPaths.strategicGroups, input.trim()]
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

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="blue.600">🎯 Buyer Groups</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanStrategy.sixPaths.buyerGroups.map((item, index) => (
                              <Tag key={index} size="sm" colorScheme="blue">{item}</Tag>
                            ))}
                            <Input 
                              size="sm" 
                              placeholder="Add buyer group..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.currentTarget.value;
                                  if (input.trim()) {
                                    setBlueOceanStrategy(prev => ({
                                      ...prev,
                                      sixPaths: {
                                        ...prev.sixPaths,
                                        buyerGroups: [...prev.sixPaths.buyerGroups, input.trim()]
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

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="orange.600">🔗 Complementary Products</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanStrategy.sixPaths.complementaryProducts.map((item, index) => (
                              <Tag key={index} size="sm" colorScheme="orange">{item}</Tag>
                            ))}
                            <Input 
                              size="sm" 
                              placeholder="Add complementary product..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.currentTarget.value;
                                  if (input.trim()) {
                                    setBlueOceanStrategy(prev => ({
                                      ...prev,
                                      sixPaths: {
                                        ...prev.sixPaths,
                                        complementaryProducts: [...prev.sixPaths.complementaryProducts, input.trim()]
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

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="pink.600">💝 Functional-Emotional Appeal</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanStrategy.sixPaths.functionalEmotionalAppeal.map((item, index) => (
                              <Tag key={index} size="sm" colorScheme="pink">{item}</Tag>
                            ))}
                            <Input 
                              size="sm" 
                              placeholder="Add appeal factor..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.currentTarget.value;
                                  if (input.trim()) {
                                    setBlueOceanStrategy(prev => ({
                                      ...prev,
                                      sixPaths: {
                                        ...prev.sixPaths,
                                        functionalEmotionalAppeal: [...prev.sixPaths.functionalEmotionalAppeal, input.trim()]
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

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="teal.600">⏰ Time Trends</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {blueOceanStrategy.sixPaths.timeTrends.map((item, index) => (
                              <Tag key={index} size="sm" colorScheme="teal">{item}</Tag>
                            ))}
                            <Input 
                              size="sm" 
                              placeholder="Add time trend..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.currentTarget.value;
                                  if (input.trim()) {
                                    setBlueOceanStrategy(prev => ({
                                      ...prev,
                                      sixPaths: {
                                        ...prev.sixPaths,
                                        timeTrends: [...prev.sixPaths.timeTrends, input.trim()]
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
                    </SimpleGrid>
                  </VStack>
                </TabPanel>

                {/* Buyer Utility Map */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold">Buyer Utility Map</Text>
                    <Text color="gray.600">
                      Rate each utility lever across the buyer experience cycle (0-10 scale)
                    </Text>

                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Stage</Th>
                          <Th>Productivity</Th>
                          <Th>Simplicity</Th>
                          <Th>Convenience</Th>
                          <Th>Risk</Th>
                          <Th>Fun & Image</Th>
                          <Th>Environment</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {blueOceanStrategy.utilityMap.stages.map((stage, stageIndex) => (
                          <Tr key={stageIndex}>
                            <Td fontWeight="semibold">{stage.name}</Td>
                            {Object.entries(stage.utilities).map(([utilityType, value]) => (
                              <Td key={utilityType}>
                                <NumberInput 
                                  min={0} 
                                  max={10} 
                                  value={value}
                                  onChange={(_, num) => updateUtilityScore(stageIndex, utilityType, num || 0)}
                                  size="sm"
                                  w="60px"
                                >
                                  <NumberInputField />
                                </NumberInput>
                              </Td>
                            ))}
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>

                    <Alert status="info">
                      <AlertIcon />
                      <Box>
                        <Text fontWeight="semibold">Utility Mapping Tips</Text>
                        <Text fontSize="sm">
                          Focus on stages and levers where you can create exceptional utility or eliminate pain points. 
                          High scores in underserved areas indicate Blue Ocean opportunities.
                        </Text>
                      </Box>
                    </Alert>
                  </VStack>
                </TabPanel>

                {/* Value Innovation */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold">Value Innovation</Text>

                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      <GridItem>
                        <Card>
                          <CardHeader>
                            <Text fontWeight="bold">🎯 Differentiation Factors</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="stretch" spacing={3}>
                              <Input 
                                placeholder="Add differentiation factor..."
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    const input = e.currentTarget.value;
                                    if (input.trim()) {
                                      setBlueOceanStrategy(prev => ({
                                        ...prev,
                                        valueInnovation: {
                                          ...prev.valueInnovation,
                                          differentiationFactors: [...prev.valueInnovation.differentiationFactors, input.trim()]
                                        }
                                      }));
                                      e.currentTarget.value = '';
                                    }
                                  }
                                }}
                              />
                              {blueOceanStrategy.valueInnovation.differentiationFactors.map((factor, index) => (
                                <Tag key={index} colorScheme="blue" size="md">
                                  <TagLabel>{factor}</TagLabel>
                                </Tag>
                              ))}
                            </VStack>
                          </CardBody>
                        </Card>
                      </GridItem>

                      <GridItem>
                        <Card>
                          <CardHeader>
                            <Text fontWeight="bold">💰 Cost Factors</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="stretch" spacing={3}>
                              <Input 
                                placeholder="Add cost factor..."
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    const input = e.currentTarget.value;
                                    if (input.trim()) {
                                      setBlueOceanStrategy(prev => ({
                                        ...prev,
                                        valueInnovation: {
                                          ...prev.valueInnovation,
                                          costFactors: [...prev.valueInnovation.costFactors, input.trim()]
                                        }
                                      }));
                                      e.currentTarget.value = '';
                                    }
                                  }
                                }}
                              />
                              {blueOceanStrategy.valueInnovation.costFactors.map((factor, index) => (
                                <Tag key={index} colorScheme="green" size="md">
                                  <TagLabel>{factor}</TagLabel>
                                </Tag>
                              ))}
                            </VStack>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </Grid>

                    <FormControl>
                      <FormLabel>Value Proposition</FormLabel>
                      <Textarea 
                        value={blueOceanStrategy.valueInnovation.valueProposition}
                        onChange={(e) => setBlueOceanStrategy(prev => ({
                          ...prev,
                          valueInnovation: {
                            ...prev.valueInnovation,
                            valueProposition: e.target.value
                          }
                        }))}
                        placeholder="Describe your unique value proposition that combines differentiation and low cost..."
                        rows={4}
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>

                {/* Strategic Sequence */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="semibold">Strategic Sequence</Text>
                    <Text color="gray.600">
                      Validate your Blue Ocean opportunity through the strategic sequence
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">1. Buyer Utility</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <RadioGroup 
                              value={blueOceanStrategy.strategicSequence.buyerUtility ? 'yes' : 'no'}
                              onChange={(value) => setBlueOceanStrategy(prev => ({
                                ...prev,
                                strategicSequence: {
                                  ...prev.strategicSequence,
                                  buyerUtility: value === 'yes'
                                }
                              }))}
                            >
                              <Stack>
                                <Radio value="yes">Yes - Creates exceptional utility</Radio>
                                <Radio value="no">No - Limited or unclear utility</Radio>
                              </Stack>
                            </RadioGroup>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">2. Price Point</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <FormControl>
                              <FormLabel>Strategic Price ($)</FormLabel>
                              <NumberInput 
                                value={blueOceanStrategy.strategicSequence.price}
                                onChange={(_, num) => setBlueOceanStrategy(prev => ({
                                  ...prev,
                                  strategicSequence: {
                                    ...prev.strategicSequence,
                                    price: num || 0
                                  }
                                }))}
                              >
                                <NumberInputField />
                              </NumberInput>
                            </FormControl>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">3. Cost Target</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <FormControl>
                              <FormLabel>Target Cost ($)</FormLabel>
                              <NumberInput 
                                value={blueOceanStrategy.strategicSequence.cost}
                                onChange={(_, num) => setBlueOceanStrategy(prev => ({
                                  ...prev,
                                  strategicSequence: {
                                    ...prev.strategicSequence,
                                    cost: num || 0
                                  }
                                }))}
                              >
                                <NumberInputField />
                              </NumberInput>
                            </FormControl>
                            <Text fontSize="sm" color="gray.600">
                              Profit Margin: {blueOceanStrategy.strategicSequence.price > 0 ? 
                                Math.round(((blueOceanStrategy.strategicSequence.price - blueOceanStrategy.strategicSequence.cost) / blueOceanStrategy.strategicSequence.price) * 100) : 0}%
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">4. Adoption Hurdles</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <Input 
                              placeholder="Add adoption hurdle..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.currentTarget.value;
                                  if (input.trim()) {
                                    setBlueOceanStrategy(prev => ({
                                      ...prev,
                                      strategicSequence: {
                                        ...prev.strategicSequence,
                                        adoption: [...prev.strategicSequence.adoption, input.trim()]
                                      }
                                    }));
                                    e.currentTarget.value = '';
                                  }
                                }
                              }}
                            />
                            {blueOceanStrategy.strategicSequence.adoption.map((hurdle, index) => (
                              <Tag key={index} colorScheme="orange">
                                <TagLabel>{hurdle}</TagLabel>
                              </Tag>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <Text fontSize="lg" fontWeight="semibold">🎯 Next Steps</Text>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Alert status={completionScore > 70 ? 'success' : 'warning'}>
                <AlertIcon />
                <Box>
                  <Text fontWeight="semibold">Strategy Development</Text>
                  <Text fontSize="sm">
                    {completionScore > 70 ? 
                      'Ready for validation and testing' : 
                      'Continue building your strategy framework'
                    }
                  </Text>
                </Box>
              </Alert>
              <Alert status="info">
                <AlertIcon />
                <Box>
                  <Text fontWeight="semibold">Market Testing</Text>
                  <Text fontSize="sm">Validate assumptions with target customers</Text>
                </Box>
              </Alert>
              <Alert status="info">
                <AlertIcon />
                <Box>
                  <Text fontWeight="semibold">Execution Planning</Text>
                  <Text fontSize="sm">Develop implementation roadmap</Text>
                </Box>
              </Alert>
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default EnhancedBlueOceanStrategy;