import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Button,
  Grid,
  GridItem,
  Badge,
  Alert,
  AlertIcon,
  Progress,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  NumberInput,
  NumberInputField,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useFrameworkData } from '../hooks/useFrameworkData';

interface BlueOceanStrategyWithDataProps {
  currentTier: string;
}

const BlueOceanStrategyWithData: React.FC<BlueOceanStrategyWithDataProps> = ({ currentTier }) => {
  const {
    blueOceanData,
    updateBlueOceanData,
    insights,
    saveSession,
    loadSession,
    getSavedSessions,
    hasData,
    lastUpdated
  } = useFrameworkData();

  const [activeStep, setActiveStep] = useState(0);
  const [sessionName, setSessionName] = useState('');
  const toast = useToast();

  const { isOpen: isSaveOpen, onOpen: onSaveOpen, onClose: onSaveClose } = useDisclosure();
  const { isOpen: isLoadOpen, onOpen: onLoadOpen, onClose: onLoadClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const stepBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  const blueOceanSteps = [
    {
      title: '1. Humanness Check',
      description: 'Assess current market positioning and human-centered approach',
      icon: '🧭'
    },
    {
      title: '2. As-Is Canvas',
      description: 'Map current strategic profile and competitive factors',
      icon: '📊'
    },
    {
      title: '3. Future Canvas',
      description: 'Design new value curve through eliminate-reduce-raise-create',
      icon: '🎯'
    },
    {
      title: '4. Six Paths Analysis',
      description: 'Explore alternative strategic directions',
      icon: '🛤️'
    },
    {
      title: '5. Buyer Utility Map',
      description: 'Map customer value across the entire buyer experience',
      icon: '🗺️'
    }
  ];

  // Generate Six Paths insights and update data
  const generateSixPathsInsights = () => {
    const insights: string[] = [];
    const opportunities: string[] = [];

    if (blueOceanData.sixPathsAnalysis.alternativeIndustries.length > 0) {
      insights.push(`Cross-industry analysis reveals ${blueOceanData.sixPathsAnalysis.alternativeIndustries.length} alternative markets with potential for value innovation`);
      opportunities.push(`Consider applying ${blueOceanData.sixPathsAnalysis.alternativeIndustries[0]} industry practices to your current market`);
    }

    if (blueOceanData.sixPathsAnalysis.buyerGroups.length > 0) {
      insights.push(`Identified ${blueOceanData.sixPathsAnalysis.buyerGroups.length} distinct buyer groups with different value expectations`);
      opportunities.push(`Target underserved buyer group: ${blueOceanData.sixPathsAnalysis.buyerGroups[blueOceanData.sixPathsAnalysis.buyerGroups.length - 1]}`);
    }

    if (blueOceanData.sixPathsAnalysis.complementaryProducts.length > 0) {
      insights.push(`Found ${blueOceanData.sixPathsAnalysis.complementaryProducts.length} complementary products that could be integrated into core offering`);
      opportunities.push(`Bundle with ${blueOceanData.sixPathsAnalysis.complementaryProducts[0]} to create unique value proposition`);
    }

    if (blueOceanData.sixPathsAnalysis.functionalEmotional) {
      const opposite = blueOceanData.sixPathsAnalysis.functionalEmotional === 'functional' ? 'emotional' : 'functional';
      insights.push(`Current orientation is ${blueOceanData.sixPathsAnalysis.functionalEmotional}, opportunity exists in ${opposite} appeal`);
      opportunities.push(`Shift from ${blueOceanData.sixPathsAnalysis.functionalEmotional} to ${opposite} positioning for differentiation`);
    }

    // Update data with insights - this will trigger cross-framework updates
    updateBlueOceanData({
      sixPathsAnalysis: {
        ...blueOceanData.sixPathsAnalysis,
        insights,
        opportunities,
        completedAt: new Date().toISOString()
      }
    });

    toast({
      title: "Strategic Insights Generated!",
      description: `Generated ${insights.length} insights and ${opportunities.length} opportunities. Check Framework Integration Hub to see cross-framework impacts.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // Add item to Six Paths category
  const addSixPathsItem = (category: keyof typeof blueOceanData.sixPathsAnalysis, value: string) => {
    if (category === 'alternativeIndustries' || category === 'strategicGroups' || 
        category === 'buyerGroups' || category === 'complementaryProducts') {
      const currentArray = blueOceanData.sixPathsAnalysis[category] as string[];
      updateBlueOceanData({
        sixPathsAnalysis: {
          ...blueOceanData.sixPathsAnalysis,
          [category]: [...currentArray, value]
        }
      });
    }
  };

  // Remove item from Six Paths category
  const removeSixPathsItem = (category: keyof typeof blueOceanData.sixPathsAnalysis, index: number) => {
    if (category === 'alternativeIndustries' || category === 'strategicGroups' || 
        category === 'buyerGroups' || category === 'complementaryProducts') {
      const currentArray = blueOceanData.sixPathsAnalysis[category] as string[];
      updateBlueOceanData({
        sixPathsAnalysis: {
          ...blueOceanData.sixPathsAnalysis,
          [category]: currentArray.filter((_, i) => i !== index)
        }
      });
    }
  };

  // Update utility value in Buyer Utility Map
  const updateUtilityValue = (stageIndex: number, lever: string, value: number) => {
    const updatedStages = blueOceanData.buyerUtilityMap.stages.map((stage, index) => 
      index === stageIndex 
        ? { ...stage, [lever.toLowerCase().replace(' & ', 'And').replace(' ', '')]: value }
        : stage
    );

    updateBlueOceanData({
      buyerUtilityMap: {
        ...blueOceanData.buyerUtilityMap,
        stages: updatedStages
      }
    });
  };

  // Identify utility blocks
  const identifyUtilityBlocks = () => {
    const utilityLevers = ['Productivity', 'Simplicity', 'Convenience', 'Risk', 'Fun & Image', 'Environmental'];
    const blocks: string[] = [];
    
    blueOceanData.buyerUtilityMap.stages.forEach((stage) => {
      utilityLevers.forEach(lever => {
        const leverKey = lever.toLowerCase().replace(' & ', 'And').replace(' ', '') as keyof typeof stage;
        if (typeof stage[leverKey] === 'number' && stage[leverKey] < 4) {
          blocks.push(`${stage.name} - ${lever}: Low utility (${stage[leverKey]}/10)`);
        }
      });
    });

    updateBlueOceanData({
      buyerUtilityMap: {
        ...blueOceanData.buyerUtilityMap,
        utilityBlocks: blocks
      }
    });

    toast({
      title: "Utility Blocks Identified!",
      description: `Found ${blocks.length} utility blocks hindering customer value.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Generate innovation opportunities
  const generateInnovationOpportunities = () => {
    const utilityLevers = ['Productivity', 'Simplicity', 'Convenience', 'Risk', 'Fun & Image', 'Environmental'];
    const opportunities: string[] = [];
    
    blueOceanData.buyerUtilityMap.stages.forEach((stage) => {
      utilityLevers.forEach(lever => {
        const leverKey = lever.toLowerCase().replace(' & ', 'And').replace(' ', '') as keyof typeof stage;
        if (typeof stage[leverKey] === 'number' && stage[leverKey] < 6) {
          opportunities.push(`Improve ${lever.toLowerCase()} during ${stage.name.toLowerCase()} stage`);
        }
      });
    });

    if (opportunities.length > 0) {
      opportunities.push(`Focus on ${blueOceanData.buyerUtilityMap.stages[0].name} and ${blueOceanData.buyerUtilityMap.stages[2].name} stages for maximum impact`);
      opportunities.push('Consider bundling improvements across multiple utility levers');
    }

    updateBlueOceanData({
      buyerUtilityMap: {
        ...blueOceanData.buyerUtilityMap,
        innovationOpportunities: opportunities.slice(0, 8),
        completedAt: new Date().toISOString()
      }
    });

    toast({
      title: "Innovation Opportunities Generated!",
      description: `Identified ${opportunities.length} improvement opportunities. These will automatically inform Process Improvement framework.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // Save session handler
  const handleSaveSession = () => {
    if (sessionName.trim()) {
      saveSession(sessionName.trim());
      toast({
        title: "Session Saved!",
        description: `Your Blue Ocean Strategy session "${sessionName}" has been saved.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSaveClose();
      setSessionName('');
    }
  };

  // Load session handler
  const handleLoadSession = (name: string) => {
    if (loadSession(name)) {
      toast({
        title: "Session Loaded!",
        description: `Loaded Blue Ocean Strategy session "${name}".`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onLoadClose();
    }
  };

  const renderSixPathsAnalysis = () => {
    const utilityLevers = ['Productivity', 'Simplicity', 'Convenience', 'Risk', 'Fun & Image', 'Environmental'];

    return (
      <Card bg={cardBg}>
        <CardHeader>
          <VStack align="start" spacing={2}>
            <HStack justify="space-between" w="full">
              <HStack>
                <Text fontSize="xl">🛤️</Text>
                <Text fontSize="xl" fontWeight="bold">Six Paths Analysis</Text>
              </HStack>
              <Badge colorScheme={blueOceanData.sixPathsAnalysis.completedAt ? 'green' : 'gray'}>
                {blueOceanData.sixPathsAnalysis.completedAt ? 'Completed' : 'In Progress'}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Systematically explore six paths to create blue ocean opportunities beyond existing industry boundaries
            </Text>
          </VStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={8} align="stretch">
            {/* Path 1: Alternative Industries */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={3}>
                Path 1: Alternative Industries
              </Text>
              <Text fontSize="sm" color="gray.600" mb={4}>
                What other industries could satisfy the same functional need as your industry?
              </Text>
              <VStack align="stretch" spacing={3}>
                {blueOceanData.sixPathsAnalysis.alternativeIndustries.map((industry, index) => (
                  <HStack key={index} p={3} bg={stepBg} borderRadius="md">
                    <Text flex={1}>{industry}</Text>
                    <IconButton
                      aria-label="Remove"
                      icon={<Text>×</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => removeSixPathsItem('alternativeIndustries', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="Enter alternative industry..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addSixPathsItem('alternativeIndustries', e.currentTarget.value.trim());
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                      if (input?.value.trim()) {
                        addSixPathsItem('alternativeIndustries', input.value.trim());
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Path 2: Strategic Groups */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={3}>
                Path 2: Strategic Groups Within Your Industry
              </Text>
              <VStack align="stretch" spacing={3}>
                {blueOceanData.sixPathsAnalysis.strategicGroups.map((group, index) => (
                  <HStack key={index} p={3} bg={stepBg} borderRadius="md">
                    <Text flex={1}>{group}</Text>
                    <IconButton
                      aria-label="Remove"
                      icon={<Text>×</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => removeSixPathsItem('strategicGroups', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="Enter strategic group..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addSixPathsItem('strategicGroups', e.currentTarget.value.trim());
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                      if (input?.value.trim()) {
                        addSixPathsItem('strategicGroups', input.value.trim());
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Path 3: Buyer Groups */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={3}>
                Path 3: Chain of Buyers
              </Text>
              <VStack align="stretch" spacing={3}>
                {blueOceanData.sixPathsAnalysis.buyerGroups.map((group, index) => (
                  <HStack key={index} p={3} bg={stepBg} borderRadius="md">
                    <Text flex={1}>{group}</Text>
                    <IconButton
                      aria-label="Remove"
                      icon={<Text>×</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => removeSixPathsItem('buyerGroups', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="Enter buyer group..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addSixPathsItem('buyerGroups', e.currentTarget.value.trim());
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                      if (input?.value.trim()) {
                        addSixPathsItem('buyerGroups', input.value.trim());
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Path 4: Complementary Products */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={3}>
                Path 4: Complementary Products and Services
              </Text>
              <VStack align="stretch" spacing={3}>
                {blueOceanData.sixPathsAnalysis.complementaryProducts.map((product, index) => (
                  <HStack key={index} p={3} bg={stepBg} borderRadius="md">
                    <Text flex={1}>{product}</Text>
                    <IconButton
                      aria-label="Remove"
                      icon={<Text>×</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => removeSixPathsItem('complementaryProducts', index)}
                    />
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="Enter complementary product..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addSixPathsItem('complementaryProducts', e.currentTarget.value.trim());
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                      if (input?.value.trim()) {
                        addSixPathsItem('complementaryProducts', input.value.trim());
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Path 5: Functional-Emotional Orientation */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={3}>
                Path 5: Functional-Emotional Orientation
              </Text>
              <RadioGroup
                value={blueOceanData.sixPathsAnalysis.functionalEmotional}
                onChange={(value) => updateBlueOceanData({
                  sixPathsAnalysis: {
                    ...blueOceanData.sixPathsAnalysis,
                    functionalEmotional: value
                  }
                })}
              >
                <Stack direction="column" spacing={3}>
                  <Radio value="functional">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">Functional Appeal</Text>
                      <Text fontSize="sm" color="gray.600">
                        Competes on utility, performance, cost-effectiveness
                      </Text>
                    </VStack>
                  </Radio>
                  <Radio value="emotional">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">Emotional Appeal</Text>
                      <Text fontSize="sm" color="gray.600">
                        Competes on feelings, status, lifestyle, experience
                      </Text>
                    </VStack>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>

            <Divider />

            {/* Path 6: Time Evolution */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={3}>
                Path 6: Time and Trends
              </Text>
              <FormControl>
                <Textarea
                  value={blueOceanData.sixPathsAnalysis.timeEvolution}
                  onChange={(e) => updateBlueOceanData({
                    sixPathsAnalysis: {
                      ...blueOceanData.sixPathsAnalysis,
                      timeEvolution: e.target.value
                    }
                  })}
                  placeholder="Describe emerging trends, technologies, regulations, or social changes that could create new value opportunities..."
                  rows={4}
                />
              </FormControl>
            </Box>

            <Divider />

            {/* Generate Insights */}
            <Box>
              <HStack justify="space-between" mb={4}>
                <Text fontSize="lg" fontWeight="semibold">Strategic Insights & Opportunities</Text>
                <Button
                  colorScheme="blue"
                  onClick={generateSixPathsInsights}
                  isDisabled={
                    blueOceanData.sixPathsAnalysis.alternativeIndustries.length === 0 &&
                    blueOceanData.sixPathsAnalysis.buyerGroups.length === 0 &&
                    blueOceanData.sixPathsAnalysis.complementaryProducts.length === 0 &&
                    !blueOceanData.sixPathsAnalysis.functionalEmotional
                  }
                >
                  Generate Insights
                </Button>
              </HStack>

              {blueOceanData.sixPathsAnalysis.insights.length > 0 && (
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  <Box>
                    <Text fontSize="md" fontWeight="semibold" mb={3} color="blue.600">
                      📊 Strategic Insights
                    </Text>
                    <VStack spacing={2} align="stretch">
                      {blueOceanData.sixPathsAnalysis.insights.map((insight, index) => (
                        <Box key={index} p={3} bg="blue.50" borderRadius="md" borderLeft="4px" borderLeftColor="blue.400">
                          <Text fontSize="sm">{insight}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontSize="md" fontWeight="semibold" mb={3} color="green.600">
                      💡 Blue Ocean Opportunities
                    </Text>
                    <VStack spacing={2} align="stretch">
                      {blueOceanData.sixPathsAnalysis.opportunities.map((opportunity, index) => (
                        <Box key={index} p={3} bg="green.50" borderRadius="md" borderLeft="4px" borderLeftColor="green.400">
                          <Text fontSize="sm">{opportunity}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </Grid>
              )}

              {blueOceanData.sixPathsAnalysis.insights.length === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  <Text fontSize="sm">
                    Complete at least one path analysis above, then click "Generate Insights" to discover blue ocean opportunities.
                  </Text>
                </Alert>
              )}
            </Box>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  const renderBuyerUtilityMap = () => {
    const utilityLevers = ['Productivity', 'Simplicity', 'Convenience', 'Risk', 'Fun & Image', 'Environmental'];

    return (
      <Card bg={cardBg}>
        <CardHeader>
          <VStack align="start" spacing={2}>
            <HStack justify="space-between" w="full">
              <HStack>
                <Text fontSize="xl">🗺️</Text>
                <Text fontSize="xl" fontWeight="bold">Buyer Utility Map</Text>
              </HStack>
              <Badge colorScheme={blueOceanData.buyerUtilityMap.completedAt ? 'green' : 'gray'}>
                {blueOceanData.buyerUtilityMap.completedAt ? 'Completed' : 'In Progress'}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Map customer value across the six stages of buyer experience and six utility levers
            </Text>
          </VStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={8} align="stretch">
            {/* Utility Matrix */}
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Customer Experience Utility Matrix
              </Text>
              <Box overflowX="auto">
                <Grid templateColumns={`120px repeat(${utilityLevers.length}, 1fr)`} gap={2}>
                  {/* Header */}
                  <Box fontWeight="bold" p={2}>Stage</Box>
                  {utilityLevers.map(lever => (
                    <Box key={lever} fontWeight="bold" p={2} textAlign="center" fontSize="sm">
                      {lever}
                    </Box>
                  ))}
                  
                  {/* Data rows */}
                  {blueOceanData.buyerUtilityMap.stages.map((stage, stageIndex) => (
                    <React.Fragment key={stage.name}>
                      <Box fontWeight="semibold" p={2}>{stage.name}</Box>
                      {utilityLevers.map(lever => {
                        const leverKey = lever.toLowerCase().replace(' & ', 'And').replace(' ', '') as keyof typeof stage;
                        const value = stage[leverKey] as number;
                        return (
                          <Box key={lever} p={1}>
                            <VStack spacing={1}>
                              <NumberInput
                                value={value}
                                onChange={(_, num) => updateUtilityValue(stageIndex, lever, num || 0)}
                                min={1}
                                max={10}
                                size="sm"
                                w="60px"
                              >
                                <NumberInputField textAlign="center" />
                              </NumberInput>
                              <Box
                                w="100%"
                                h="4px"
                                bg={value <= 3 ? 'red.200' : value <= 6 ? 'yellow.200' : 'green.200'}
                                borderRadius="2px"
                              />
                            </VStack>
                          </Box>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
              <Text fontSize="xs" color="gray.600" mt={2}>
                Rate each utility lever (1-10) for every stage of the buyer experience
              </Text>
            </Box>

            <Divider />

            {/* Analysis Tools */}
            <HStack spacing={4}>
              <Button colorScheme="orange" onClick={identifyUtilityBlocks}>
                Identify Utility Blocks
              </Button>
              <Button colorScheme="green" onClick={generateInnovationOpportunities}>
                Find Innovation Opportunities
              </Button>
            </HStack>

            {/* Utility Blocks */}
            {blueOceanData.buyerUtilityMap.utilityBlocks.length > 0 && (
              <Box>
                <Text fontSize="md" fontWeight="semibold" mb={3} color="orange.600">
                  🚫 Utility Blocks (Areas Hindering Customer Value)
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                  {blueOceanData.buyerUtilityMap.utilityBlocks.map((block, index) => (
                    <Box key={index} p={3} bg="orange.50" borderRadius="md" borderLeft="4px" borderLeftColor="orange.400">
                      <Text fontSize="sm">{block}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Innovation Opportunities */}
            {blueOceanData.buyerUtilityMap.innovationOpportunities.length > 0 && (
              <Box>
                <Text fontSize="md" fontWeight="semibold" mb={3} color="green.600">
                  💡 Innovation Opportunities
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                  {blueOceanData.buyerUtilityMap.innovationOpportunities.map((opportunity, index) => (
                    <Box key={index} p={3} bg="green.50" borderRadius="md" borderLeft="4px" borderLeftColor="green.400">
                      <Text fontSize="sm">{opportunity}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    );
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header with session management */}
        <Box>
          <HStack justify="space-between" mb={4}>
            <HStack>
              <Text fontSize="3xl">🌊</Text>
              <Text fontSize="3xl" fontWeight="bold">Blue Ocean Strategy</Text>
            </HStack>
            <HStack spacing={2}>
              <Button size="sm" variant="outline" onClick={onLoadOpen}>
                Load Session
              </Button>
              <Button size="sm" colorScheme="blue" onClick={onSaveOpen}>
                Save Session
              </Button>
            </HStack>
          </HStack>
          
          {hasData && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Data Saved Automatically</Text>
                <Text fontSize="sm">
                  Last updated: {new Date(lastUpdated).toLocaleString()}. 
                  Your work is preserved and {insights.length > 0 ? `${insights.length} cross-framework insights generated` : 'ready for cross-framework integration'}.
                </Text>
              </VStack>
            </Alert>
          )}
        </Box>

        {/* Progress indicator */}
        <Card bg={cardBg}>
          <CardBody>
            <VStack spacing={4}>
              <HStack justify="space-between" w="full">
                <Text fontSize="lg" fontWeight="bold">Framework Progress</Text>
                <Text fontSize="sm">Step {activeStep + 1} of {blueOceanSteps.length}</Text>
              </HStack>
              <Progress 
                value={((activeStep + 1) / blueOceanSteps.length) * 100} 
                colorScheme="blue" 
                size="lg" 
                borderRadius="md"
                w="full"
              />
              <Grid templateColumns={`repeat(${blueOceanSteps.length}, 1fr)`} gap={2} w="full">
                {blueOceanSteps.map((step, index) => (
                  <Button
                    key={index}
                    variant={activeStep === index ? 'solid' : 'outline'}
                    colorScheme={activeStep === index ? 'blue' : 'gray'}
                    size="sm"
                    onClick={() => setActiveStep(index)}
                    flexDirection="column"
                    h="auto"
                    py={3}
                  >
                    <Text fontSize="lg" mb={1}>{step.icon}</Text>
                    <Text fontSize="xs" textAlign="center">
                      {step.title}
                    </Text>
                  </Button>
                ))}
              </Grid>
            </VStack>
          </CardBody>
        </Card>

        {/* Step Content */}
        {activeStep === 3 && renderSixPathsAnalysis()}
        {activeStep === 4 && renderBuyerUtilityMap()}
        {(activeStep < 3) && (
          <Alert status="info">
            <AlertIcon />
            <Text>Steps 1-3 (Humanness Check, As-Is Canvas, Future Canvas) are available in the full component. Currently showing the data-persistent Six Paths Analysis and Buyer Utility Map.</Text>
          </Alert>
        )}

        {/* Navigation */}
        <HStack justify="space-between">
          <Button
            variant="outline"
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            isDisabled={activeStep === 0}
          >
            ← Previous
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => setActiveStep(Math.min(blueOceanSteps.length - 1, activeStep + 1))}
            isDisabled={activeStep === blueOceanSteps.length - 1}
          >
            Next →
          </Button>
        </HStack>
      </VStack>

      {/* Save Session Modal */}
      <Modal isOpen={isSaveOpen} onClose={onSaveClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Blue Ocean Strategy Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Session Name</FormLabel>
              <Input
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                placeholder="Enter session name..."
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onSaveClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveSession}>
              Save Session
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Load Session Modal */}
      <Modal isOpen={isLoadOpen} onClose={onLoadClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Load Blue Ocean Strategy Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3} align="stretch">
              {getSavedSessions().map(session => (
                <Button
                  key={session.name}
                  variant="outline"
                  onClick={() => handleLoadSession(session.name)}
                  flexDirection="column"
                  h="auto"
                  py={3}
                >
                  <Text fontWeight="bold">{session.name}</Text>
                  <Text fontSize="xs" color="gray.500">
                    Saved: {new Date(session.savedAt).toLocaleString()}
                  </Text>
                  {session.hasBlueOceanData && (
                    <Badge size="sm" colorScheme="green">Has Strategy Data</Badge>
                  )}
                </Button>
              ))}
              {getSavedSessions().length === 0 && (
                <Text textAlign="center" color="gray.500">
                  No saved sessions found
                </Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onLoadClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BlueOceanStrategyWithData;