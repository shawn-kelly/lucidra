import React, { useState } from 'react';
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
  CardHeader,
  Badge,
  Alert,
  AlertIcon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Divider
} from '@chakra-ui/react';
import { StarIcon, CheckIcon, InfoIcon } from '@chakra-ui/icons';

interface FrameworkModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  tier: 'lite' | 'pro' | 'enterprise';
  category: 'competitive' | 'innovation' | 'resource' | 'execution';
  completionRate: number;
  estimatedTime: string;
}

interface PortersFiveForcesData {
  buyerPower: number;
  supplierPower: number;
  threatOfSubstitutes: number;
  threatOfNewEntrants: number;
  competitiveRivalry: number;
  analysis: {
    [key: string]: string;
  };
}

interface BlueOceanData {
  eliminateFactors: string[];
  reduceFactors: string[];
  raiseFactors: string[];
  createFactors: string[];
  currentStrategy: string;
  blueOceanStrategy: string;
}

interface VRIOAnalysis {
  resource: string;
  valuable: boolean;
  rare: boolean;
  imitability: boolean;
  organization: boolean;
  competitiveImplication: string;
  strategicValue: 'disadvantage' | 'parity' | 'temporary' | 'sustained';
}

const StrategyFrameworks: React.FC<{ currentTier: 'lite' | 'pro' | 'enterprise' }> = ({ currentTier }) => {
  const [selectedFramework, setSelectedFramework] = useState<string>('overview');
  const [portersData, setPortersData] = useState<PortersFiveForcesData>({
    buyerPower: 3,
    supplierPower: 2,
    threatOfSubstitutes: 4,
    threatOfNewEntrants: 3,
    competitiveRivalry: 4,
    analysis: {
      buyerPower: '',
      supplierPower: '',
      threatOfSubstitutes: '',
      threatOfNewEntrants: '',
      competitiveRivalry: ''
    }
  });
  
  const [blueOceanData, setBlueOceanData] = useState<BlueOceanData>({
    eliminateFactors: [],
    reduceFactors: [],
    raiseFactors: [],
    createFactors: [],
    currentStrategy: '',
    blueOceanStrategy: ''
  });
  
  const [vrioAnalyses, setVrioAnalyses] = useState<VRIOAnalysis[]>([]);
  const [newResource, setNewResource] = useState('');
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingFactor, setEditingFactor] = useState<{ category: string; index: number } | null>(null);
  const [tempFactorValue, setTempFactorValue] = useState('');

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const frameworkModules: FrameworkModule[] = [
    {
      id: 'porters-five-forces',
      name: 'Porter\'s Five Forces',
      icon: '⚔️',
      description: 'Analyze competitive forces in your industry',
      tier: 'lite',
      category: 'competitive',
      completionRate: 65,
      estimatedTime: '45 min'
    },
    {
      id: 'blue-ocean-strategy',
      name: 'Blue Ocean Strategy',
      icon: '🌊',
      description: 'Create uncontested market space through value innovation',
      tier: 'pro',
      category: 'innovation',
      completionRate: 40,
      estimatedTime: '60 min'
    },
    {
      id: 'vrio-analysis',
      name: 'VRIO Analysis',
      icon: '💎',
      description: 'Evaluate resources for sustainable competitive advantage',
      tier: 'pro',
      category: 'resource',
      completionRate: 25,
      estimatedTime: '30 min'
    },
    {
      id: 'swot-analysis',
      name: 'SWOT Analysis',
      icon: '🎯',
      description: 'Strengths, Weaknesses, Opportunities, Threats analysis',
      tier: 'lite',
      category: 'competitive',
      completionRate: 80,
      estimatedTime: '30 min'
    },
    {
      id: 'ansoff-matrix',
      name: 'Ansoff Growth Matrix',
      icon: '📈',
      description: 'Strategic framework for growth opportunities',
      tier: 'pro',
      category: 'execution',
      completionRate: 15,
      estimatedTime: '25 min'
    },
    {
      id: 'bcg-matrix',
      name: 'BCG Growth-Share Matrix',
      icon: '🔲',
      description: 'Portfolio analysis and resource allocation',
      tier: 'enterprise',
      category: 'execution',
      completionRate: 0,
      estimatedTime: '40 min'
    }
  ];

  const getAvailableFrameworks = () => {
    return frameworkModules.filter(framework => {
      if (currentTier === 'lite') return framework.tier === 'lite';
      if (currentTier === 'pro') return framework.tier === 'lite' || framework.tier === 'pro';
      return true; // enterprise gets all
    });
  };

  const getForceColor = (value: number) => {
    if (value <= 2) return 'green';
    if (value <= 3) return 'yellow';
    return 'red';
  };

  const getVRIOValue = (analysis: VRIOAnalysis) => {
    if (!analysis.valuable) return 'disadvantage';
    if (!analysis.rare) return 'parity';
    if (!analysis.imitability || !analysis.organization) return 'temporary';
    return 'sustained';
  };

  const getVRIOColor = (value: string) => {
    switch (value) {
      case 'sustained': return 'green';
      case 'temporary': return 'yellow';
      case 'parity': return 'blue';
      case 'disadvantage': return 'red';
      default: return 'gray';
    }
  };

  const addVRIOResource = () => {
    if (newResource.trim()) {
      setVrioAnalyses([...vrioAnalyses, {
        resource: newResource,
        valuable: false,
        rare: false,
        imitability: false,
        organization: false,
        competitiveImplication: '',
        strategicValue: 'disadvantage'
      }]);
      setNewResource('');
    }
  };

  const updateVRIOResource = (index: number, updates: Partial<VRIOAnalysis>) => {
    setVrioAnalyses(prev => prev.map((analysis, i) => 
      i === index ? { ...analysis, ...updates, strategicValue: getVRIOValue({ ...analysis, ...updates }) } : analysis
    ));
  };

  const addBlueOceanFactor = (category: keyof BlueOceanData, value: string) => {
    if (value.trim() && Array.isArray(blueOceanData[category])) {
      setBlueOceanData(prev => ({
        ...prev,
        [category]: [...(prev[category] as string[]), value.trim()]
      }));
    }
  };

  const removeBlueOceanFactor = (category: keyof BlueOceanData, index: number) => {
    if (Array.isArray(blueOceanData[category])) {
      setBlueOceanData(prev => ({
        ...prev,
        [category]: (prev[category] as string[]).filter((_, i) => i !== index)
      }));
    }
  };

  const renderFrameworkOverview = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          Strategic frameworks help you analyze your business from multiple perspectives. Each framework provides unique insights that integrate with your Business Model Canvas.
        </Text>
      </Alert>

      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">
          📚 Available Strategy Frameworks ({getAvailableFrameworks().length})
        </Text>
        <Badge colorScheme="teal" variant="solid">
          {currentTier.toUpperCase()} TIER
        </Badge>
      </HStack>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {getAvailableFrameworks().map((framework) => (
          <Card 
            key={framework.id}
            bg={cardBg}
            cursor="pointer"
            onClick={() => setSelectedFramework(framework.id)}
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
            borderColor={framework.completionRate > 0 ? 'green.200' : borderColor}
            borderWidth="2px"
          >
            <CardHeader pb={2}>
              <VStack align="start" spacing={2}>
                <HStack justify="space-between" w="full">
                  <HStack>
                    <Text fontSize="2xl">{framework.icon}</Text>
                    <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
                      {framework.name}
                    </Text>
                  </HStack>
                  <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                    {framework.tier}
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {framework.description}
                </Text>
              </VStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">Progress</Text>
                  <Text fontSize="xs" fontWeight="bold">{framework.completionRate}%</Text>
                </HStack>
                <Progress 
                  value={framework.completionRate} 
                  colorScheme={framework.completionRate > 50 ? 'green' : 'yellow'} 
                  size="sm"
                />
                <HStack justify="space-between">
                  <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                    {framework.category}
                  </Badge>
                  <Text fontSize="xs" color="gray.500">⏱️ {framework.estimatedTime}</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {currentTier === 'lite' && (
        <Alert status="warning">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontSize="sm" fontWeight="semibold">Upgrade to unlock more frameworks</Text>
            <Text fontSize="xs">
              Pro tier includes Blue Ocean Strategy, VRIO Analysis, and Ansoff Matrix. Enterprise adds BCG Matrix and advanced integrations.
            </Text>
          </VStack>
        </Alert>
      )}
    </VStack>
  );

  const renderPortersFiveForces = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="2xl" fontWeight="bold">⚔️ Porter's Five Forces Analysis</Text>
          <Text color="gray.600">Analyze the competitive forces shaping your industry</Text>
        </VStack>
        <Badge colorScheme="green" variant="solid" fontSize="sm">
          {portersData ? '65%' : '0%'} Complete
        </Badge>
      </HStack>

      <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(3, 1fr)" gap={4} h="600px">
        {/* Top - Threat of New Entrants */}
        <GridItem colStart={2}>
          <Card h="full" bg={cardBg} borderColor={`${getForceColor(portersData.threatOfNewEntrants)}.200`} borderWidth="2px">
            <CardHeader pb={2}>
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  🚪 Threat of New Entrants
                </Text>
                <Badge colorScheme={getForceColor(portersData.threatOfNewEntrants)}>
                  Level: {portersData.threatOfNewEntrants}/5
                </Badge>
              </VStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3}>
                <Slider
                  value={portersData.threatOfNewEntrants}
                  onChange={(value) => setPortersData(prev => ({ ...prev, threatOfNewEntrants: value }))}
                  min={1}
                  max={5}
                  step={1}
                  colorScheme={getForceColor(portersData.threatOfNewEntrants)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Textarea
                  placeholder="Analysis of new entrant threats..."
                  value={portersData.analysis.threatOfNewEntrants}
                  onChange={(e) => setPortersData(prev => ({
                    ...prev,
                    analysis: { ...prev.analysis, threatOfNewEntrants: e.target.value }
                  }))}
                  size="sm"
                  rows={3}
                />
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Left - Supplier Power */}
        <GridItem rowStart={2}>
          <Card h="full" bg={cardBg} borderColor={`${getForceColor(portersData.supplierPower)}.200`} borderWidth="2px">
            <CardHeader pb={2}>
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  🏭 Supplier Power
                </Text>
                <Badge colorScheme={getForceColor(portersData.supplierPower)}>
                  Level: {portersData.supplierPower}/5
                </Badge>
              </VStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3}>
                <Slider
                  value={portersData.supplierPower}
                  onChange={(value) => setPortersData(prev => ({ ...prev, supplierPower: value }))}
                  min={1}
                  max={5}
                  step={1}
                  colorScheme={getForceColor(portersData.supplierPower)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Textarea
                  placeholder="Analysis of supplier power..."
                  value={portersData.analysis.supplierPower}
                  onChange={(e) => setPortersData(prev => ({
                    ...prev,
                    analysis: { ...prev.analysis, supplierPower: e.target.value }
                  }))}
                  size="sm"
                  rows={3}
                />
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Center - Competitive Rivalry */}
        <GridItem rowStart={2} colStart={2}>
          <Card h="full" bg="red.50" borderColor="red.300" borderWidth="3px">
            <CardHeader pb={2}>
              <VStack spacing={2}>
                <Text fontSize="xl" fontWeight="bold" textAlign="center" color="red.600">
                  🥊 Competitive Rivalry
                </Text>
                <Badge colorScheme={getForceColor(portersData.competitiveRivalry)} variant="solid">
                  Level: {portersData.competitiveRivalry}/5
                </Badge>
              </VStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3}>
                <Slider
                  value={portersData.competitiveRivalry}
                  onChange={(value) => setPortersData(prev => ({ ...prev, competitiveRivalry: value }))}
                  min={1}
                  max={5}
                  step={1}
                  colorScheme={getForceColor(portersData.competitiveRivalry)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Textarea
                  placeholder="Analysis of competitive rivalry..."
                  value={portersData.analysis.competitiveRivalry}
                  onChange={(e) => setPortersData(prev => ({
                    ...prev,
                    analysis: { ...prev.analysis, competitiveRivalry: e.target.value }
                  }))}
                  size="sm"
                  rows={3}
                />
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Right - Buyer Power */}
        <GridItem rowStart={2} colStart={3}>
          <Card h="full" bg={cardBg} borderColor={`${getForceColor(portersData.buyerPower)}.200`} borderWidth="2px">
            <CardHeader pb={2}>
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  👥 Buyer Power
                </Text>
                <Badge colorScheme={getForceColor(portersData.buyerPower)}>
                  Level: {portersData.buyerPower}/5
                </Badge>
              </VStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3}>
                <Slider
                  value={portersData.buyerPower}
                  onChange={(value) => setPortersData(prev => ({ ...prev, buyerPower: value }))}
                  min={1}
                  max={5}
                  step={1}
                  colorScheme={getForceColor(portersData.buyerPower)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Textarea
                  placeholder="Analysis of buyer power..."
                  value={portersData.analysis.buyerPower}
                  onChange={(e) => setPortersData(prev => ({
                    ...prev,
                    analysis: { ...prev.analysis, buyerPower: e.target.value }
                  }))}
                  size="sm"
                  rows={3}
                />
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Bottom - Threat of Substitutes */}
        <GridItem rowStart={3} colStart={2}>
          <Card h="full" bg={cardBg} borderColor={`${getForceColor(portersData.threatOfSubstitutes)}.200`} borderWidth="2px">
            <CardHeader pb={2}>
              <VStack spacing={2}>
                <Text fontSize="lg" fontWeight="bold" textAlign="center">
                  🔄 Threat of Substitutes
                </Text>
                <Badge colorScheme={getForceColor(portersData.threatOfSubstitutes)}>
                  Level: {portersData.threatOfSubstitutes}/5
                </Badge>
              </VStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3}>
                <Slider
                  value={portersData.threatOfSubstitutes}
                  onChange={(value) => setPortersData(prev => ({ ...prev, threatOfSubstitutes: value }))}
                  min={1}
                  max={5}
                  step={1}
                  colorScheme={getForceColor(portersData.threatOfSubstitutes)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Textarea
                  placeholder="Analysis of substitute threats..."
                  value={portersData.analysis.threatOfSubstitutes}
                  onChange={(e) => setPortersData(prev => ({
                    ...prev,
                    analysis: { ...prev.analysis, threatOfSubstitutes: e.target.value }
                  }))}
                  size="sm"
                  rows={3}
                />
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          Use the sliders to rate each force from 1 (low threat) to 5 (high threat). Add your analysis in the text areas to build a comprehensive competitive assessment.
        </Text>
      </Alert>
    </VStack>
  );

  const renderBlueOceanStrategy = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="2xl" fontWeight="bold">🌊 Blue Ocean Strategy Canvas</Text>
          <Text color="gray.600">Create uncontested market space through value innovation</Text>
        </VStack>
        <Badge colorScheme="teal" variant="solid" fontSize="sm">
          40% Complete
        </Badge>
      </HStack>

      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* Eliminate */}
        <Card bg="red.50" borderColor="red.200" borderWidth="2px">
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold" color="red.600" textAlign="center">
              ❌ Eliminate
            </Text>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              What factors should be eliminated?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {blueOceanData.eliminateFactors.map((factor, index) => (
                <HStack key={index} justify="space-between">
                  <Text fontSize="sm" noOfLines={2} flex="1">{factor}</Text>
                  <Button 
                    size="xs" 
                    colorScheme="red" 
                    variant="ghost"
                    onClick={() => removeBlueOceanFactor('eliminateFactors', index)}
                  >
                    ×
                  </Button>
                </HStack>
              ))}
              <Input
                placeholder="Add factor to eliminate..."
                size="sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addBlueOceanFactor('eliminateFactors', (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </VStack>
          </CardBody>
        </Card>

        {/* Reduce */}
        <Card bg="orange.50" borderColor="orange.200" borderWidth="2px">
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold" color="orange.600" textAlign="center">
              ⬇️ Reduce
            </Text>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              What factors should be reduced?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {blueOceanData.reduceFactors.map((factor, index) => (
                <HStack key={index} justify="space-between">
                  <Text fontSize="sm" noOfLines={2} flex="1">{factor}</Text>
                  <Button 
                    size="xs" 
                    colorScheme="orange" 
                    variant="ghost"
                    onClick={() => removeBlueOceanFactor('reduceFactors', index)}
                  >
                    ×
                  </Button>
                </HStack>
              ))}
              <Input
                placeholder="Add factor to reduce..."
                size="sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addBlueOceanFactor('reduceFactors', (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </VStack>
          </CardBody>
        </Card>

        {/* Raise */}
        <Card bg="blue.50" borderColor="blue.200" borderWidth="2px">
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold" color="blue.600" textAlign="center">
              ⬆️ Raise
            </Text>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              What factors should be raised?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {blueOceanData.raiseFactors.map((factor, index) => (
                <HStack key={index} justify="space-between">
                  <Text fontSize="sm" noOfLines={2} flex="1">{factor}</Text>
                  <Button 
                    size="xs" 
                    colorScheme="blue" 
                    variant="ghost"
                    onClick={() => removeBlueOceanFactor('raiseFactors', index)}
                  >
                    ×
                  </Button>
                </HStack>
              ))}
              <Input
                placeholder="Add factor to raise..."
                size="sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addBlueOceanFactor('raiseFactors', (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </VStack>
          </CardBody>
        </Card>

        {/* Create */}
        <Card bg="green.50" borderColor="green.200" borderWidth="2px">
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold" color="green.600" textAlign="center">
              ✨ Create
            </Text>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              What new factors should be created?
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {blueOceanData.createFactors.map((factor, index) => (
                <HStack key={index} justify="space-between">
                  <Text fontSize="sm" noOfLines={2} flex="1">{factor}</Text>
                  <Button 
                    size="xs" 
                    colorScheme="green" 
                    variant="ghost"
                    onClick={() => removeBlueOceanFactor('createFactors', index)}
                  >
                    ×
                  </Button>
                </HStack>
              ))}
              <Input
                placeholder="Add factor to create..."
                size="sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addBlueOceanFactor('createFactors', (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">📊 Current Strategy</Text>
          </CardHeader>
          <CardBody>
            <Textarea
              placeholder="Describe your current competitive strategy..."
              value={blueOceanData.currentStrategy}
              onChange={(e) => setBlueOceanData(prev => ({ ...prev, currentStrategy: e.target.value }))}
              rows={6}
            />
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🌊 Blue Ocean Strategy</Text>
          </CardHeader>
          <CardBody>
            <Textarea
              placeholder="Describe your proposed blue ocean strategy..."
              value={blueOceanData.blueOceanStrategy}
              onChange={(e) => setBlueOceanData(prev => ({ ...prev, blueOceanStrategy: e.target.value }))}
              rows={6}
            />
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );

  const renderVRIOAnalysis = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="2xl" fontWeight="bold">💎 VRIO Analysis</Text>
          <Text color="gray.600">Evaluate your resources for sustainable competitive advantage</Text>
        </VStack>
        <Badge colorScheme="purple" variant="solid" fontSize="sm">
          {vrioAnalyses.length} Resources
        </Badge>
      </HStack>

      <Card bg={cardBg}>
        <CardBody>
          <HStack spacing={4}>
            <Input
              placeholder="Enter a key resource or capability..."
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addVRIOResource()}
            />
            <Button colorScheme="purple" onClick={addVRIOResource}>
              Add Resource
            </Button>
          </HStack>
        </CardBody>
      </Card>

      {vrioAnalyses.length > 0 && (
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">VRIO Framework Analysis</Text>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Resource</Th>
                  <Th textAlign="center">Valuable?</Th>
                  <Th textAlign="center">Rare?</Th>
                  <Th textAlign="center">Inimitable?</Th>
                  <Th textAlign="center">Organized?</Th>
                  <Th>Strategic Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {vrioAnalyses.map((analysis, index) => (
                  <Tr key={index}>
                    <Td>
                      <Text fontWeight="semibold">{analysis.resource}</Text>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        size="sm"
                        colorScheme={analysis.valuable ? 'green' : 'red'}
                        variant={analysis.valuable ? 'solid' : 'outline'}
                        onClick={() => updateVRIOResource(index, { valuable: !analysis.valuable })}
                      >
                        {analysis.valuable ? '✅' : '❌'}
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        size="sm"
                        colorScheme={analysis.rare ? 'green' : 'red'}
                        variant={analysis.rare ? 'solid' : 'outline'}
                        onClick={() => updateVRIOResource(index, { rare: !analysis.rare })}
                      >
                        {analysis.rare ? '✅' : '❌'}
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        size="sm"
                        colorScheme={analysis.imitability ? 'green' : 'red'}
                        variant={analysis.imitability ? 'solid' : 'outline'}
                        onClick={() => updateVRIOResource(index, { imitability: !analysis.imitability })}
                      >
                        {analysis.imitability ? '✅' : '❌'}
                      </Button>
                    </Td>
                    <Td textAlign="center">
                      <Button
                        size="sm"
                        colorScheme={analysis.organization ? 'green' : 'red'}
                        variant={analysis.organization ? 'solid' : 'outline'}
                        onClick={() => updateVRIOResource(index, { organization: !analysis.organization })}
                      >
                        {analysis.organization ? '✅' : '❌'}
                      </Button>
                    </Td>
                    <Td>
                      <Badge colorScheme={getVRIOColor(analysis.strategicValue)} variant="solid">
                        {analysis.strategicValue}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}

      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          VRIO Analysis: Valuable resources exploiting opportunities, Rare resources among competitors, Inimitable resources that are costly to copy, and Organized to capture value.
        </Text>
      </Alert>
    </VStack>
  );

  const renderFrameworkContent = () => {
    switch (selectedFramework) {
      case 'porters-five-forces':
        return renderPortersFiveForces();
      case 'blue-ocean-strategy':
        if (currentTier === 'lite') {
          return (
            <Alert status="warning">
              <AlertIcon />
              <VStack align="start">
                <Text fontWeight="semibold">Upgrade Required</Text>
                <Text fontSize="sm">Blue Ocean Strategy is available with Pro and Enterprise tiers.</Text>
              </VStack>
            </Alert>
          );
        }
        return renderBlueOceanStrategy();
      case 'vrio-analysis':
        if (currentTier === 'lite') {
          return (
            <Alert status="warning">
              <AlertIcon />
              <VStack align="start">
                <Text fontWeight="semibold">Upgrade Required</Text>
                <Text fontSize="sm">VRIO Analysis is available with Pro and Enterprise tiers.</Text>
              </VStack>
            </Alert>
          );
        }
        return renderVRIOAnalysis();
      default:
        return renderFrameworkOverview();
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedFramework('overview')}
            leftIcon={<Text>←</Text>}
          >
            Back to Frameworks
          </Button>
          <Badge colorScheme="teal" variant="outline">
            Integrated with Business Model Canvas
          </Badge>
        </HStack>

        {/* Framework Content */}
        {renderFrameworkContent()}
      </VStack>
    </Box>
  );
};

export default StrategyFrameworks;