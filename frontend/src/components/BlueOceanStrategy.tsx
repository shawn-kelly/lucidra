import React, { useState } from 'react';
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Badge,
  Alert,
  AlertIcon,
  Progress,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Divider,
  Checkbox,
  IconButton,
} from '@chakra-ui/react';

// Data structures for Blue Ocean Strategy
interface HumannessCheck {
  currentStrategy: string;
  targetCustomers: string;
  keyActivities: string[];
  valueProposition: string;
  competitiveAdvantages: string[];
  marketPosition: 'red_ocean' | 'blue_ocean' | 'transitional';
  humanFactors: {
    emotionalConnection: number;
    userExperience: number;
    accessibility: number;
    socialImpact: number;
  };
}

interface AsIsCanvas {
  factors: {
    name: string;
    currentLevel: number;
    industry: string;
    importance: number;
  }[];
  strategicProfile: string;
  competitiveFactors: string[];
  valueInnovation: string;
}

interface FutureCanvas {
  factors: {
    name: string;
    futureLevel: number;
    action: 'eliminate' | 'reduce' | 'raise' | 'create';
    rationale: string;
  }[];
  newValueCurve: string;
  blueOceanShift: string;
}

interface SixPathsAnalysis {
  alternativeIndustries: string[];
  strategicGroups: string[];
  buyerGroups: string[];
  complementaryProducts: string[];
  functionalEmotional: string;
  timeEvolution: string;
  insights: string[];
  opportunities: string[];
}

interface BuyerUtilityMap {
  stages: {
    name: string;
    productivity: number;
    simplicity: number;
    convenience: number;
    risk: number;
    funAndImage: number;
    environmental: number;
  }[];
  utilityBlocks: string[];
  innovationOpportunities: string[];
}

interface StrategyFair {
  stakeholders: {
    name: string;
    role: string;
    feedback: string;
    concerns: string[];
    support: number;
  }[];
  strategyPresentation: string;
  refinements: string[];
  consensus: number;
}

interface TippingPointLeadership {
  hotspots: string[];
  coldspots: string[];
  horsesForCourses: {
    leader: string;
    strengths: string[];
    assignment: string;
  }[];
  silencers: string[];
  champions: string[];
  executionPlan: string;
}

const BlueOceanStrategy: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [humannessCheck, setHumannessCheck] = useState<HumannessCheck>({
    currentStrategy: '',
    targetCustomers: '',
    keyActivities: [],
    valueProposition: '',
    competitiveAdvantages: [],
    marketPosition: 'red_ocean',
    humanFactors: {
      emotionalConnection: 5,
      userExperience: 5,
      accessibility: 5,
      socialImpact: 5
    }
  });

  const [asIsCanvas, setAsIsCanvas] = useState<AsIsCanvas>({
    factors: [
      { name: 'Price', currentLevel: 5, industry: 'average', importance: 8 },
      { name: 'Quality', currentLevel: 7, industry: 'average', importance: 9 },
      { name: 'Service', currentLevel: 6, industry: 'average', importance: 7 },
      { name: 'Innovation', currentLevel: 4, industry: 'average', importance: 8 }
    ],
    strategicProfile: '',
    competitiveFactors: [],
    valueInnovation: ''
  });

  const [futureCanvas, setFutureCanvas] = useState<FutureCanvas>({
    factors: [],
    newValueCurve: '',
    blueOceanShift: ''
  });

  const [sixPaths, setSixPaths] = useState<SixPathsAnalysis>({
    alternativeIndustries: [],
    strategicGroups: [],
    buyerGroups: [],
    complementaryProducts: [],
    functionalEmotional: '',
    timeEvolution: '',
    insights: [],
    opportunities: []
  });

  const [buyerUtility, setBuyerUtility] = useState<BuyerUtilityMap>({
    stages: [
      { name: 'Purchase', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
      { name: 'Delivery', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
      { name: 'Use', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
      { name: 'Supplements', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
      { name: 'Maintenance', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 },
      { name: 'Disposal', productivity: 5, simplicity: 5, convenience: 5, risk: 5, funAndImage: 5, environmental: 5 }
    ],
    utilityBlocks: [],
    innovationOpportunities: []
  });

  const [strategyFair, setStrategyFair] = useState<StrategyFair>({
    stakeholders: [],
    strategyPresentation: '',
    refinements: [],
    consensus: 0
  });

  const [tippingPoint, setTippingPoint] = useState<TippingPointLeadership>({
    hotspots: [],
    coldspots: [],
    horsesForCourses: [],
    silencers: [],
    champions: [],
    executionPlan: ''
  });

  const cardBg = useColorModeValue('white', 'gray.800');
  const stepBg = useColorModeValue('blue.50', 'blue.900');

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
    },
    {
      title: '6. Strategy Fair',
      description: 'Validate strategy with stakeholders and build consensus',
      icon: '🎪'
    },
    {
      title: '7. Tipping Point Leadership',
      description: 'Execute blue ocean shift with focused leadership',
      icon: '⚡'
    }
  ];

  const addFactor = (type: 'asIs' | 'future') => {
    if (type === 'asIs') {
      setAsIsCanvas(prev => ({
        ...prev,
        factors: [...prev.factors, { name: '', currentLevel: 5, industry: 'average', importance: 5 }]
      }));
    } else {
      setFutureCanvas(prev => ({
        ...prev,
        factors: [...prev.factors, { name: '', futureLevel: 5, action: 'create', rationale: '' }]
      }));
    }
  };

  const addStakeholder = () => {
    setStrategyFair(prev => ({
      ...prev,
      stakeholders: [...prev.stakeholders, { name: '', role: '', feedback: '', concerns: [], support: 5 }]
    }));
  };

  const renderHumannessCheck = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <VStack align="start" spacing={2}>
          <HStack>
            <Text fontSize="xl">🧭</Text>
            <Text fontSize="xl" fontWeight="bold">Humanness Check</Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Assess your current strategy's human-centered approach and market positioning
          </Text>
        </VStack>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <FormControl>
              <FormLabel>Current Strategy Description</FormLabel>
              <Textarea
                value={humannessCheck.currentStrategy}
                onChange={(e) => setHumannessCheck(prev => ({ ...prev, currentStrategy: e.target.value }))}
                placeholder="Describe your current business strategy..."
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Target Customers</FormLabel>
              <Textarea
                value={humannessCheck.targetCustomers}
                onChange={(e) => setHumannessCheck(prev => ({ ...prev, targetCustomers: e.target.value }))}
                placeholder="Who are your primary customers?"
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Value Proposition</FormLabel>
              <Textarea
                value={humannessCheck.valueProposition}
                onChange={(e) => setHumannessCheck(prev => ({ ...prev, valueProposition: e.target.value }))}
                placeholder="What unique value do you provide?"
                rows={3}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Market Position</FormLabel>
              <RadioGroup
                value={humannessCheck.marketPosition}
                onChange={(value) => setHumannessCheck(prev => ({ ...prev, marketPosition: value as any }))}
              >
                <Stack direction="column">
                  <Radio value="red_ocean">🔴 Red Ocean (Intense competition)</Radio>
                  <Radio value="transitional">🟡 Transitional (Some differentiation)</Radio>
                  <Radio value="blue_ocean">🔵 Blue Ocean (Uncontested market)</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Grid>

          <Divider />

          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={4}>Human Factors Assessment</Text>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              {Object.entries(humannessCheck.humanFactors).map(([factor, value]) => (
                <Box key={factor}>
                  <FormLabel textTransform="capitalize">
                    {factor.replace(/([A-Z])/g, ' $1').trim()}: {value}/10
                  </FormLabel>
                  <Slider
                    value={value}
                    onChange={(val) => setHumannessCheck(prev => ({
                      ...prev,
                      humanFactors: { ...prev.humanFactors, [factor]: val }
                    }))}
                    min={1}
                    max={10}
                    step={1}
                  >
                    <SliderTrack>
                      <SliderFilledTrack bg="blue.400" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              ))}
            </Grid>
          </Box>

          {humannessCheck.marketPosition === 'red_ocean' && (
            <Alert status="warning">
              <AlertIcon />
              <Text fontSize="sm">
                Your current position suggests a red ocean strategy. Consider exploring blue ocean opportunities 
                to escape intense competition and create new market space.
              </Text>
            </Alert>
          )}
        </VStack>
      </CardBody>
    </Card>
  );

  const renderAsIsCanvas = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <VStack align="start" spacing={2}>
          <HStack>
            <Text fontSize="xl">📊</Text>
            <Text fontSize="xl" fontWeight="bold">As-Is Strategic Canvas</Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Map your current strategic profile and competitive landscape
          </Text>
        </VStack>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">Competitive Factors</Text>
            <Button size="sm" colorScheme="blue" onClick={() => addFactor('asIs')}>
              + Add Factor
            </Button>
          </HStack>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Factor</Th>
                <Th>Current Level</Th>
                <Th>Industry Average</Th>
                <Th>Importance</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {asIsCanvas.factors.map((factor, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      value={factor.name}
                      onChange={(e) => {
                        const newFactors = [...asIsCanvas.factors];
                        newFactors[index].name = e.target.value;
                        setAsIsCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                      placeholder="Factor name"
                      size="sm"
                    />
                  </Td>
                  <Td>
                    <NumberInput
                      value={factor.currentLevel}
                      onChange={(_, val) => {
                        const newFactors = [...asIsCanvas.factors];
                        newFactors[index].currentLevel = val || 0;
                        setAsIsCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                      min={1}
                      max={10}
                      size="sm"
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                  <Td>
                    <Select
                      value={factor.industry}
                      onChange={(e) => {
                        const newFactors = [...asIsCanvas.factors];
                        newFactors[index].industry = e.target.value;
                        setAsIsCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                      size="sm"
                    >
                      <option value="low">Low</option>
                      <option value="average">Average</option>
                      <option value="high">High</option>
                    </Select>
                  </Td>
                  <Td>
                    <NumberInput
                      value={factor.importance}
                      onChange={(_, val) => {
                        const newFactors = [...asIsCanvas.factors];
                        newFactors[index].importance = val || 0;
                        setAsIsCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                      min={1}
                      max={10}
                      size="sm"
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove factor"
                      icon={<Text>🗑️</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const newFactors = asIsCanvas.factors.filter((_, i) => i !== index);
                        setAsIsCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <FormControl>
              <FormLabel>Strategic Profile Summary</FormLabel>
              <Textarea
                value={asIsCanvas.strategicProfile}
                onChange={(e) => setAsIsCanvas(prev => ({ ...prev, strategicProfile: e.target.value }))}
                placeholder="Summarize your current strategic profile..."
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Value Innovation Opportunities</FormLabel>
              <Textarea
                value={asIsCanvas.valueInnovation}
                onChange={(e) => setAsIsCanvas(prev => ({ ...prev, valueInnovation: e.target.value }))}
                placeholder="Identify potential areas for value innovation..."
                rows={4}
              />
            </FormControl>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );

  const generateSixPathsInsights = () => {
    const insights: string[] = [];
    const opportunities: string[] = [];

    // Generate insights based on current data
    if (sixPaths.alternativeIndustries.length > 0) {
      insights.push(`Cross-industry analysis reveals ${sixPaths.alternativeIndustries.length} alternative markets with potential for value innovation`);
      opportunities.push(`Consider applying ${sixPaths.alternativeIndustries[0]} industry practices to your current market`);
    }

    if (sixPaths.buyerGroups.length > 0) {
      insights.push(`Identified ${sixPaths.buyerGroups.length} distinct buyer groups with different value expectations`);
      opportunities.push(`Target underserved buyer group: ${sixPaths.buyerGroups[sixPaths.buyerGroups.length - 1]}`);
    }

    if (sixPaths.complementaryProducts.length > 0) {
      insights.push(`Found ${sixPaths.complementaryProducts.length} complementary products that could be integrated into core offering`);
      opportunities.push(`Bundle with ${sixPaths.complementaryProducts[0]} to create unique value proposition`);
    }

    if (sixPaths.functionalEmotional) {
      const opposite = sixPaths.functionalEmotional === 'functional' ? 'emotional' : 'functional';
      insights.push(`Current orientation is ${sixPaths.functionalEmotional}, opportunity exists in ${opposite} appeal`);
      opportunities.push(`Shift from ${sixPaths.functionalEmotional} to ${opposite} positioning for differentiation`);
    }

    setSixPaths(prev => ({ ...prev, insights, opportunities }));
  };

  const addSixPathsItem = (category: keyof SixPathsAnalysis, value: string) => {
    if (category === 'alternativeIndustries' || category === 'strategicGroups' || 
        category === 'buyerGroups' || category === 'complementaryProducts') {
      setSixPaths(prev => ({
        ...prev,
        [category]: [...(prev[category] as string[]), value]
      }));
    }
  };

  const renderSixPathsAnalysis = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <VStack align="start" spacing={2}>
          <HStack>
            <Text fontSize="xl">🛤️</Text>
            <Text fontSize="xl" fontWeight="bold">Six Paths Analysis</Text>
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
            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4}>
              <VStack align="stretch" spacing={3}>
                {sixPaths.alternativeIndustries.map((industry, index) => (
                  <HStack key={index} p={3} bg={stepBg} borderRadius="md">
                    <Text flex={1}>{industry}</Text>
                    <IconButton
                      aria-label="Remove"
                      icon={<Text>×</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => setSixPaths(prev => ({
                        ...prev,
                        alternativeIndustries: prev.alternativeIndustries.filter((_, i) => i !== index)
                      }))}
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
              <Alert status="info" size="sm">
                <AlertIcon />
                <Text fontSize="xs">
                  Think beyond direct competitors. Consider industries that solve the same core problem differently.
                </Text>
              </Alert>
            </Grid>
          </Box>

          <Divider />

          {/* Path 2: Strategic Groups */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Path 2: Strategic Groups Within Your Industry
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              What strategic groups exist in your industry, and what determines the differences?
            </Text>
            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4}>
              <VStack align="stretch" spacing={3}>
                {sixPaths.strategicGroups.map((group, index) => (
                  <HStack key={index} p={3} bg={stepBg} borderRadius="md">
                    <Text flex={1}>{group}</Text>
                    <IconButton
                      aria-label="Remove"
                      icon={<Text>×</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => setSixPaths(prev => ({
                        ...prev,
                        strategicGroups: prev.strategicGroups.filter((_, i) => i !== index)
                      }))}
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
              <Alert status="info" size="sm">
                <AlertIcon />
                <Text fontSize="xs">
                  Groups like luxury vs budget, full-service vs specialized, global vs local.
                </Text>
              </Alert>
            </Grid>
          </Box>

          <Divider />

          {/* Path 3: Buyer Groups */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Path 3: Chain of Buyers
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              Who are all the buyer groups that influence purchase decisions?
            </Text>
            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4}>
              <VStack align="stretch" spacing={3}>
                {sixPaths.buyerGroups.map((group, index) => (
                  <HStack key={index} p={3} bg={stepBg} borderRadius="md">
                    <Text flex={1}>{group}</Text>
                    <IconButton
                      aria-label="Remove"
                      icon={<Text>×</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => setSixPaths(prev => ({
                        ...prev,
                        buyerGroups: prev.buyerGroups.filter((_, i) => i !== index)
                      }))}
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
              <Alert status="info" size="sm">
                <AlertIcon />
                <Text fontSize="xs">
                  Consider purchasers, users, influencers, and decision makers.
                </Text>
              </Alert>
            </Grid>
          </Box>

          <Divider />

          {/* Path 4: Complementary Products */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Path 4: Complementary Products and Services
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              What complementary products or services are used alongside your offering?
            </Text>
            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4}>
              <VStack align="stretch" spacing={3}>
                {sixPaths.complementaryProducts.map((product, index) => (
                  <HStack key={index} p={3} bg={stepBg} borderRadius="md">
                    <Text flex={1}>{product}</Text>
                    <IconButton
                      aria-label="Remove"
                      icon={<Text>×</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => setSixPaths(prev => ({
                        ...prev,
                        complementaryProducts: prev.complementaryProducts.filter((_, i) => i !== index)
                      }))}
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
              <Alert status="info" size="sm">
                <AlertIcon />
                <Text fontSize="xs">
                  Think about the total solution customers need beyond your core product.
                </Text>
              </Alert>
            </Grid>
          </Box>

          <Divider />

          {/* Path 5: Functional-Emotional Orientation */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Path 5: Functional-Emotional Orientation
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              Is your industry's appeal primarily functional or emotional?
            </Text>
            <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4}>
              <VStack align="stretch" spacing={4}>
                <RadioGroup
                  value={sixPaths.functionalEmotional}
                  onChange={(value) => setSixPaths(prev => ({ ...prev, functionalEmotional: value }))}
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
                    <Radio value="mixed">
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">Mixed Appeal</Text>
                        <Text fontSize="sm" color="gray.600">
                          Balances both functional and emotional elements
                        </Text>
                      </VStack>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </VStack>
              <Alert status="info" size="sm">
                <AlertIcon />
                <Text fontSize="xs">
                  Consider the opposite orientation as a blue ocean opportunity.
                </Text>
              </Alert>
            </Grid>
          </Box>

          <Divider />

          {/* Path 6: Time Evolution */}
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Path 6: Time and Trends
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              What trends could reshape your industry?
            </Text>
            <FormControl>
              <Textarea
                value={sixPaths.timeEvolution}
                onChange={(e) => setSixPaths(prev => ({ ...prev, timeEvolution: e.target.value }))}
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
                  sixPaths.alternativeIndustries.length === 0 &&
                  sixPaths.buyerGroups.length === 0 &&
                  sixPaths.complementaryProducts.length === 0 &&
                  !sixPaths.functionalEmotional
                }
              >
                Generate Insights
              </Button>
            </HStack>

            {sixPaths.insights.length > 0 && (
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <Box>
                  <Text fontSize="md" fontWeight="semibold" mb={3} color="blue.600">
                    📊 Strategic Insights
                  </Text>
                  <VStack spacing={2} align="stretch">
                    {sixPaths.insights.map((insight, index) => (
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
                    {sixPaths.opportunities.map((opportunity, index) => (
                      <Box key={index} p={3} bg="green.50" borderRadius="md" borderLeft="4px" borderLeftColor="green.400">
                        <Text fontSize="sm">{opportunity}</Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Grid>
            )}

            {sixPaths.insights.length === 0 && (
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

  const renderBuyerUtilityMap = () => {
    const utilityLevers = ['Productivity', 'Simplicity', 'Convenience', 'Risk', 'Fun & Image', 'Environmental'];
    const buyerStages = ['Purchase', 'Delivery', 'Use', 'Supplements', 'Maintenance', 'Disposal'];

    const updateUtilityValue = (stageIndex: number, lever: string, value: number) => {
      setBuyerUtility(prev => ({
        ...prev,
        stages: prev.stages.map((stage, index) => 
          index === stageIndex 
            ? { ...stage, [lever.toLowerCase().replace(' & ', 'And').replace(' ', '')]: value }
            : stage
        )
      }));
    };

    const identifyUtilityBlocks = () => {
      const blocks: string[] = [];
      buyerUtility.stages.forEach((stage, stageIndex) => {
        utilityLevers.forEach(lever => {
          const leverKey = lever.toLowerCase().replace(' & ', 'And').replace(' ', '') as keyof typeof stage;
          if (typeof stage[leverKey] === 'number' && stage[leverKey] < 4) {
            blocks.push(`${stage.name} - ${lever}: Low utility (${stage[leverKey]}/10)`);
          }
        });
      });
      
      setBuyerUtility(prev => ({ ...prev, utilityBlocks: blocks }));
    };

    const generateInnovationOpportunities = () => {
      const opportunities: string[] = [];
      
      // Find highest potential improvements
      buyerUtility.stages.forEach((stage, stageIndex) => {
        utilityLevers.forEach(lever => {
          const leverKey = lever.toLowerCase().replace(' & ', 'And').replace(' ', '') as keyof typeof stage;
          if (typeof stage[leverKey] === 'number' && stage[leverKey] < 6) {
            opportunities.push(`Improve ${lever.toLowerCase()} during ${stage.name.toLowerCase()} stage`);
          }
        });
      });

      // Add strategic recommendations
      if (opportunities.length > 0) {
        opportunities.push(`Focus on ${buyerUtility.stages[0].name} and ${buyerUtility.stages[2].name} stages for maximum impact`);
        opportunities.push('Consider bundling improvements across multiple utility levers');
      }

      setBuyerUtility(prev => ({ ...prev, innovationOpportunities: opportunities.slice(0, 8) }));
    };

    return (
      <Card bg={cardBg}>
        <CardHeader>
          <VStack align="start" spacing={2}>
            <HStack>
              <Text fontSize="xl">🗺️</Text>
              <Text fontSize="xl" fontWeight="bold">Buyer Utility Map</Text>
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
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th w="120px">Stage</Th>
                      {utilityLevers.map(lever => (
                        <Th key={lever} textAlign="center" minW="100px">{lever}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {buyerUtility.stages.map((stage, stageIndex) => (
                      <Tr key={stage.name}>
                        <Td fontWeight="semibold">{stage.name}</Td>
                        {utilityLevers.map(lever => {
                          const leverKey = lever.toLowerCase().replace(' & ', 'And').replace(' ', '') as keyof typeof stage;
                          const value = stage[leverKey] as number;
                          return (
                            <Td key={lever} p={2}>
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
                            </Td>
                          );
                        })}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
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
            {buyerUtility.utilityBlocks.length > 0 && (
              <Box>
                <Text fontSize="md" fontWeight="semibold" mb={3} color="orange.600">
                  🚫 Utility Blocks (Areas Hindering Customer Value)
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                  {buyerUtility.utilityBlocks.map((block, index) => (
                    <Box key={index} p={3} bg="orange.50" borderRadius="md" borderLeft="4px" borderLeftColor="orange.400">
                      <Text fontSize="sm">{block}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Innovation Opportunities */}
            {buyerUtility.innovationOpportunities.length > 0 && (
              <Box>
                <Text fontSize="md" fontWeight="semibold" mb={3} color="green.600">
                  💡 Innovation Opportunities
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                  {buyerUtility.innovationOpportunities.map((opportunity, index) => (
                    <Box key={index} p={3} bg="green.50" borderRadius="md" borderLeft="4px" borderLeftColor="green.400">
                      <Text fontSize="sm">{opportunity}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Strategic Guidance */}
            <Alert status="info">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold" fontSize="sm">Buyer Utility Map Strategy</Text>
                <Text fontSize="sm">
                  1. Focus on stages and levers with lowest scores (1-3) - these are utility blocks limiting adoption.
                  2. Look for white space where no one is delivering high utility - blue ocean opportunities.
                  3. Consider how to eliminate, reduce, raise, or create utility across the buyer experience.
                </Text>
              </VStack>
            </Alert>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  const renderFutureCanvas = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <VStack align="start" spacing={2}>
          <HStack>
            <Text fontSize="xl">🎯</Text>
            <Text fontSize="xl" fontWeight="bold">Future Strategic Canvas</Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Design your new value curve using the Eliminate-Reduce-Raise-Create framework
          </Text>
        </VStack>
      </CardHeader>
      <CardBody>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">Blue Ocean Strategy Grid</Text>
            <Button size="sm" colorScheme="blue" onClick={() => addFactor('future')}>
              + Add Factor
            </Button>
          </HStack>

          <Grid templateColumns={{ base: "1fr", lg: "repeat(4, 1fr)" }} gap={4}>
            <Card bg="red.50" borderColor="red.200" border="1px">
              <CardHeader py={2}>
                <Text fontSize="sm" fontWeight="bold" color="red.600">ELIMINATE</Text>
              </CardHeader>
              <CardBody py={2}>
                {futureCanvas.factors.filter(f => f.action === 'eliminate').map((factor, i) => (
                  <Text key={i} fontSize="xs" mb={1}>{factor.name}</Text>
                ))}
              </CardBody>
            </Card>

            <Card bg="orange.50" borderColor="orange.200" border="1px">
              <CardHeader py={2}>
                <Text fontSize="sm" fontWeight="bold" color="orange.600">REDUCE</Text>
              </CardHeader>
              <CardBody py={2}>
                {futureCanvas.factors.filter(f => f.action === 'reduce').map((factor, i) => (
                  <Text key={i} fontSize="xs" mb={1}>{factor.name}</Text>
                ))}
              </CardBody>
            </Card>

            <Card bg="green.50" borderColor="green.200" border="1px">
              <CardHeader py={2}>
                <Text fontSize="sm" fontWeight="bold" color="green.600">RAISE</Text>
              </CardHeader>
              <CardBody py={2}>
                {futureCanvas.factors.filter(f => f.action === 'raise').map((factor, i) => (
                  <Text key={i} fontSize="xs" mb={1}>{factor.name}</Text>
                ))}
              </CardBody>
            </Card>

            <Card bg="blue.50" borderColor="blue.200" border="1px">
              <CardHeader py={2}>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">CREATE</Text>
              </CardHeader>
              <CardBody py={2}>
                {futureCanvas.factors.filter(f => f.action === 'create').map((factor, i) => (
                  <Text key={i} fontSize="xs" mb={1}>{factor.name}</Text>
                ))}
              </CardBody>
            </Card>
          </Grid>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Factor</Th>
                <Th>Future Level</Th>
                <Th>Action</Th>
                <Th>Rationale</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {futureCanvas.factors.map((factor, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      value={factor.name}
                      onChange={(e) => {
                        const newFactors = [...futureCanvas.factors];
                        newFactors[index].name = e.target.value;
                        setFutureCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                      placeholder="Factor name"
                      size="sm"
                    />
                  </Td>
                  <Td>
                    <NumberInput
                      value={factor.futureLevel}
                      onChange={(_, val) => {
                        const newFactors = [...futureCanvas.factors];
                        newFactors[index].futureLevel = val || 0;
                        setFutureCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                      min={0}
                      max={10}
                      size="sm"
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                  <Td>
                    <Select
                      value={factor.action}
                      onChange={(e) => {
                        const newFactors = [...futureCanvas.factors];
                        newFactors[index].action = e.target.value as any;
                        setFutureCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                      size="sm"
                    >
                      <option value="eliminate">Eliminate</option>
                      <option value="reduce">Reduce</option>
                      <option value="raise">Raise</option>
                      <option value="create">Create</option>
                    </Select>
                  </Td>
                  <Td>
                    <Input
                      value={factor.rationale}
                      onChange={(e) => {
                        const newFactors = [...futureCanvas.factors];
                        newFactors[index].rationale = e.target.value;
                        setFutureCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                      placeholder="Why this action?"
                      size="sm"
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove factor"
                      icon={<Text>🗑️</Text>}
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const newFactors = futureCanvas.factors.filter((_, i) => i !== index);
                        setFutureCanvas(prev => ({ ...prev, factors: newFactors }));
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <FormControl>
              <FormLabel>New Value Curve Description</FormLabel>
              <Textarea
                value={futureCanvas.newValueCurve}
                onChange={(e) => setFutureCanvas(prev => ({ ...prev, newValueCurve: e.target.value }))}
                placeholder="Describe your new strategic profile and value curve..."
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Blue Ocean Shift Strategy</FormLabel>
              <Textarea
                value={futureCanvas.blueOceanShift}
                onChange={(e) => setFutureCanvas(prev => ({ ...prev, blueOceanShift: e.target.value }))}
                placeholder="Summarize your blue ocean shift strategy..."
                rows={4}
              />
            </FormControl>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">🌊</Text>
            <Text fontSize="3xl" fontWeight="bold">Blue Ocean Strategy</Text>
          </HStack>
          <Text color="gray.600" mb={6}>
            Create uncontested market space and make competition irrelevant through systematic innovation
          </Text>
        </Box>

        {/* Progress Steps */}
        <Card bg={stepBg}>
          <CardBody>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(7, 1fr)" }} gap={2}>
              {blueOceanSteps.map((step, index) => (
                <Button
                  key={index}
                  variant={activeStep === index ? "solid" : "outline"}
                  colorScheme={activeStep === index ? "blue" : "gray"}
                  size="sm"
                  onClick={() => setActiveStep(index)}
                  flexDirection="column"
                  h="auto"
                  py={3}
                  px={2}
                >
                  <Text fontSize="lg" mb={1}>{step.icon}</Text>
                  <Text fontSize="xs" textAlign="center" noOfLines={2}>
                    {step.title}
                  </Text>
                </Button>
              ))}
            </Grid>
          </CardBody>
        </Card>

        {/* Current Step Progress */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="lg" fontWeight="semibold">
              {blueOceanSteps[activeStep].title}
            </Text>
            <Badge colorScheme="blue">
              Step {activeStep + 1} of {blueOceanSteps.length}
            </Badge>
          </HStack>
          <Progress value={(activeStep + 1) / blueOceanSteps.length * 100} colorScheme="blue" mb={4} />
          <Text color="gray.600" mb={6}>
            {blueOceanSteps[activeStep].description}
          </Text>
        </Box>

        {/* Step Content */}
        {activeStep === 0 && renderHumannessCheck()}
        {activeStep === 1 && renderAsIsCanvas()}
        {activeStep === 2 && renderFutureCanvas()}
        {activeStep === 3 && renderSixPathsAnalysis()}
        {activeStep === 4 && renderBuyerUtilityMap()}
        {activeStep === 5 && (
          <Alert status="info">
            <AlertIcon />
            <Text>Strategy Fair is under development. This will help validate your strategy with stakeholders and build consensus.</Text>
          </Alert>
        )}
        {activeStep === 6 && (
          <Alert status="info">
            <AlertIcon />
            <Text>Tipping Point Leadership is under development. This will help execute your blue ocean shift with focused leadership principles.</Text>
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
    </Box>
  );
};

export default BlueOceanStrategy;