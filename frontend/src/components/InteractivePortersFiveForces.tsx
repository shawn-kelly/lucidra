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
  Select,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Badge,
  Alert,
  AlertIcon,
  Progress,
  useColorModeValue,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
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
  useDisclosure,
  IconButton,
  Tooltip,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox
} from '@chakra-ui/react';

interface ForceAnalysis {
  name: string;
  intensity: number; // 1-10 scale
  factors: string[];
  impact: string;
  mitigationStrategies: string[];
  marketData?: {
    concentration: number;
    growthRate: number;
    barriers: string[];
  };
}

interface IndustryData {
  name: string;
  averageMargins: number;
  growthRate: number;
  concentration: number;
  barriers: string[];
  keyPlayers: string[];
  recentTrends: string[];
}

interface CompetitivePosition {
  overallAttractiveness: number;
  strategicRecommendations: string[];
  priorityActions: string[];
  riskAreas: string[];
  opportunities: string[];
}

const InteractivePortersFiveForces: React.FC = () => {
  const [industry, setIndustry] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [analysisStep, setAnalysisStep] = useState(1);
  const [forces, setForces] = useState<ForceAnalysis[]>([
    {
      name: 'Threat of New Entrants',
      intensity: 5,
      factors: [],
      impact: '',
      mitigationStrategies: [],
      marketData: { concentration: 0, growthRate: 0, barriers: [] }
    },
    {
      name: 'Bargaining Power of Suppliers',
      intensity: 5,
      factors: [],
      impact: '',
      mitigationStrategies: [],
      marketData: { concentration: 0, growthRate: 0, barriers: [] }
    },
    {
      name: 'Bargaining Power of Buyers',
      intensity: 5,
      factors: [],
      impact: '',
      mitigationStrategies: [],
      marketData: { concentration: 0, growthRate: 0, barriers: [] }
    },
    {
      name: 'Threat of Substitute Products',
      intensity: 5,
      factors: [],
      impact: '',
      mitigationStrategies: [],
      marketData: { concentration: 0, growthRate: 0, barriers: [] }
    },
    {
      name: 'Competitive Rivalry',
      intensity: 5,
      factors: [],
      impact: '',
      mitigationStrategies: [],
      marketData: { concentration: 0, growthRate: 0, barriers: [] }
    }
  ]);
  
  const [currentForceIndex, setCurrentForceIndex] = useState(0);
  const [industryData, setIndustryData] = useState<IndustryData | null>(null);
  const [competitivePosition, setCompetitivePosition] = useState<CompetitivePosition | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Industry options
  const industries = [
    'Technology - Software',
    'Technology - Hardware',
    'Healthcare - Pharmaceuticals',
    'Healthcare - Medical Devices',
    'Financial Services - Banking',
    'Financial Services - Insurance',
    'Retail - E-commerce',
    'Retail - Traditional',
    'Manufacturing - Automotive',
    'Manufacturing - Electronics',
    'Energy - Renewable',
    'Energy - Traditional',
    'Media & Entertainment',
    'Education Technology',
    'Food & Beverage',
    'Real Estate',
    'Transportation & Logistics',
    'Consulting Services'
  ];

  // Force-specific factors for guided analysis
  const forceFactors = {
    'Threat of New Entrants': [
      'Capital requirements',
      'Economies of scale',
      'Brand loyalty',
      'Government regulations',
      'Technology barriers',
      'Distribution access',
      'Network effects',
      'Switching costs'
    ],
    'Bargaining Power of Suppliers': [
      'Supplier concentration',
      'Switching costs',
      'Substitute inputs',
      'Forward integration threat',
      'Importance of volume',
      'Differentiation of inputs',
      'Information availability',
      'Supplier profitability'
    ],
    'Bargaining Power of Buyers': [
      'Buyer concentration',
      'Purchase volume',
      'Switching costs',
      'Backward integration threat',
      'Product standardization',
      'Price sensitivity',
      'Information availability',
      'Buyer profitability'
    ],
    'Threat of Substitute Products': [
      'Relative price performance',
      'Switching costs',
      'Buyer propensity to substitute',
      'Substitute quality',
      'Technology trends',
      'User habits',
      'Availability of substitutes',
      'Perceived value'
    ],
    'Competitive Rivalry': [
      'Number of competitors',
      'Industry growth rate',
      'Fixed costs',
      'Product differentiation',
      'Exit barriers',
      'Strategic stakes',
      'Capacity additions',
      'Competitor diversity'
    ]
  };

  // Simulate industry data loading
  const loadIndustryData = async (selectedIndustry: string) => {
    setIsLoadingData(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock industry data based on selection
    const mockData: IndustryData = {
      name: selectedIndustry,
      averageMargins: selectedIndustry.includes('Technology') ? 25 : 
                     selectedIndustry.includes('Healthcare') ? 30 :
                     selectedIndustry.includes('Retail') ? 8 : 15,
      growthRate: selectedIndustry.includes('Technology') ? 12 :
                  selectedIndustry.includes('Healthcare') ? 8 :
                  selectedIndustry.includes('Energy - Renewable') ? 15 : 5,
      concentration: Math.random() * 100,
      barriers: selectedIndustry.includes('Technology') ? 
        ['High R&D costs', 'Network effects', 'Talent scarcity'] :
        ['Regulatory compliance', 'Capital intensity', 'Brand recognition'],
      keyPlayers: selectedIndustry.includes('Technology') ?
        ['Microsoft', 'Google', 'Apple', 'Amazon'] :
        ['Industry Leader A', 'Industry Leader B', 'Industry Leader C'],
      recentTrends: [
        'Digital transformation acceleration',
        'Increased focus on sustainability',
        'Remote work adoption',
        'Supply chain diversification'
      ]
    };
    
    setIndustryData(mockData);
    setIsLoadingData(false);
  };

  // Calculate overall competitive position
  const calculateCompetitivePosition = () => {
    const totalIntensity = forces.reduce((sum, force) => sum + force.intensity, 0);
    const averageIntensity = totalIntensity / forces.length;
    const attractiveness = 10 - averageIntensity; // Higher force intensity = lower attractiveness
    
    const position: CompetitivePosition = {
      overallAttractiveness: attractiveness,
      strategicRecommendations: [
        attractiveness > 7 ? 'Consider aggressive expansion in this attractive market' :
        attractiveness > 5 ? 'Selective investment with focus on competitive advantages' :
        'Defensive strategies and potential market exit consideration',
        
        forces[0].intensity > 7 ? 'Build strong barriers to entry through brand, patents, or scale' :
        'Monitor new entrant threats and strengthen market position',
        
        forces[4].intensity > 7 ? 'Focus on differentiation and avoid price competition' :
        'Leverage competitive advantages for market share growth'
      ],
      priorityActions: [
        'Strengthen core competitive advantages',
        'Monitor competitive landscape changes',
        'Develop strategic partnerships',
        'Invest in innovation and R&D'
      ],
      riskAreas: forces.filter(f => f.intensity > 7).map(f => f.name),
      opportunities: forces.filter(f => f.intensity < 4).map(f => f.name)
    };
    
    setCompetitivePosition(position);
  };

  const updateForce = (index: number, field: keyof ForceAnalysis, value: any) => {
    const updatedForces = [...forces];
    updatedForces[index] = { ...updatedForces[index], [field]: value };
    setForces(updatedForces);
  };

  const addFactor = (forceIndex: number, factor: string) => {
    const updatedForces = [...forces];
    if (!updatedForces[forceIndex].factors.includes(factor)) {
      updatedForces[forceIndex].factors.push(factor);
      setForces(updatedForces);
    }
  };

  const removeFactor = (forceIndex: number, factor: string) => {
    const updatedForces = [...forces];
    updatedForces[forceIndex].factors = updatedForces[forceIndex].factors.filter(f => f !== factor);
    setForces(updatedForces);
  };

  const getIntensityColor = (intensity: number): string => {
    if (intensity <= 3) return 'green';
    if (intensity <= 6) return 'yellow';
    return 'red';
  };

  const getIntensityLabel = (intensity: number): string => {
    if (intensity <= 3) return 'Low';
    if (intensity <= 6) return 'Medium';
    return 'High';
  };

  const renderSetupStep = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="blue.500">
        Industry & Company Setup
      </Text>
      
      <FormControl isRequired>
        <FormLabel>Company Name</FormLabel>
        <Input
          placeholder="Enter your company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          size="lg"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Industry Sector</FormLabel>
        <Select
          placeholder="Select your industry"
          value={industry}
          onChange={(e) => {
            setIndustry(e.target.value);
            if (e.target.value) {
              loadIndustryData(e.target.value);
            }
          }}
          size="lg"
        >
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </Select>
      </FormControl>

      {isLoadingData && (
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Loading industry data...</Text>
            <Progress value={100} isIndeterminate colorScheme="blue" w="100%" />
          </VStack>
        </Alert>
      )}

      {industryData && (
        <Card bg="blue.50" border="1px" borderColor="blue.200">
          <CardHeader pb={2}>
            <Text fontWeight="semibold" color="blue.700">Industry Insights</Text>
          </CardHeader>
          <CardBody pt={0}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Stat>
                <StatLabel>Average Margins</StatLabel>
                <StatNumber>{industryData.averageMargins}%</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Growth Rate</StatLabel>
                <StatNumber>{industryData.growthRate}%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Annual growth
                </StatHelpText>
              </Stat>
            </Grid>
            <Text fontSize="sm" color="blue.600" mt={3}>
              Key Players: {industryData.keyPlayers.join(', ')}
            </Text>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  const renderForceAnalysis = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="semibold" color="blue.500">
          Force Analysis: {forces[currentForceIndex].name}
        </Text>
        <Badge colorScheme={getIntensityColor(forces[currentForceIndex].intensity)}>
          {getIntensityLabel(forces[currentForceIndex].intensity)} Impact
        </Badge>
      </HStack>

      {/* Force Intensity Slider */}
      <FormControl>
        <FormLabel>Force Intensity (1 = Low, 10 = High)</FormLabel>
        <HStack spacing={4}>
          <Text fontSize="sm" color="gray.500">1</Text>
          <Slider
            value={forces[currentForceIndex].intensity}
            onChange={(value) => updateForce(currentForceIndex, 'intensity', value)}
            min={1}
            max={10}
            step={1}
            colorScheme={getIntensityColor(forces[currentForceIndex].intensity)}
            flex={1}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Text fontSize="xs" fontWeight="bold">
                {forces[currentForceIndex].intensity}
              </Text>
            </SliderThumb>
          </Slider>
          <Text fontSize="sm" color="gray.500">10</Text>
        </HStack>
      </FormControl>

      {/* Factor Selection */}
      <Box>
        <Text fontWeight="semibold" mb={3}>Relevant Factors</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          {forceFactors[forces[currentForceIndex].name as keyof typeof forceFactors]?.map(factor => (
            <Checkbox
              key={factor}
              isChecked={forces[currentForceIndex].factors.includes(factor)}
              onChange={(e) => {
                if (e.target.checked) {
                  addFactor(currentForceIndex, factor);
                } else {
                  removeFactor(currentForceIndex, factor);
                }
              }}
            >
              <Text fontSize="sm">{factor}</Text>
            </Checkbox>
          ))}
        </Grid>
      </Box>

      {/* Impact Description */}
      <FormControl>
        <FormLabel>Impact Description</FormLabel>
        <Textarea
          placeholder="Describe how this force impacts your business..."
          value={forces[currentForceIndex].impact}
          onChange={(e) => updateForce(currentForceIndex, 'impact', e.target.value)}
          rows={3}
        />
      </FormControl>

      {/* Navigation */}
      <HStack justify="space-between">
        <Button
          onClick={() => setCurrentForceIndex(prev => Math.max(0, prev - 1))}
          isDisabled={currentForceIndex === 0}
          variant="outline"
        >
          ← Previous Force
        </Button>
        
        <Text fontSize="sm" color="gray.500">
          {currentForceIndex + 1} of {forces.length}
        </Text>
        
        <Button
          onClick={() => {
            if (currentForceIndex < forces.length - 1) {
              setCurrentForceIndex(prev => prev + 1);
            } else {
              calculateCompetitivePosition();
              setAnalysisStep(3);
            }
          }}
          colorScheme="blue"
        >
          {currentForceIndex < forces.length - 1 ? 'Next Force →' : 'Complete Analysis'}
        </Button>
      </HStack>
    </VStack>
  );

  const renderResults = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="lg" fontWeight="semibold" color="blue.500">
        Porter's Five Forces Analysis Results
      </Text>

      {/* Overall Assessment */}
      {competitivePosition && (
        <Card bg="blue.50" border="1px" borderColor="blue.200">
          <CardHeader>
            <HStack justify="space-between">
              <Text fontWeight="semibold" color="blue.700">Overall Industry Attractiveness</Text>
              <Badge 
                colorScheme={competitivePosition.overallAttractiveness > 7 ? 'green' : 
                          competitivePosition.overallAttractiveness > 4 ? 'yellow' : 'red'}
                fontSize="md"
                px={3}
                py={1}
              >
                {competitivePosition.overallAttractiveness.toFixed(1)}/10
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <Progress
              value={competitivePosition.overallAttractiveness * 10}
              colorScheme={competitivePosition.overallAttractiveness > 7 ? 'green' : 
                        competitivePosition.overallAttractiveness > 4 ? 'yellow' : 'red'}
              size="lg"
              borderRadius="md"
            />
          </CardBody>
        </Card>
      )}

      {/* Forces Summary */}
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        {forces.map((force, index) => (
          <Card key={index} bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <HStack justify="space-between" mb={3}>
                <Text fontWeight="semibold">{force.name}</Text>
                <Badge colorScheme={getIntensityColor(force.intensity)}>
                  {force.intensity}/10
                </Badge>
              </HStack>
              <Progress
                value={force.intensity * 10}
                colorScheme={getIntensityColor(force.intensity)}
                size="sm"
                mb={3}
              />
              <Text fontSize="sm" color="gray.600" mb={2}>
                Key Factors: {force.factors.join(', ') || 'None selected'}
              </Text>
              {force.impact && (
                <Text fontSize="sm">{force.impact}</Text>
              )}
            </CardBody>
          </Card>
        ))}
      </Grid>

      {/* Strategic Recommendations */}
      {competitivePosition && (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Card bg="green.50" border="1px" borderColor="green.200">
            <CardHeader>
              <Text fontWeight="semibold" color="green.700">Opportunities</Text>
            </CardHeader>
            <CardBody>
              {competitivePosition.opportunities.length > 0 ? (
                <VStack align="start" spacing={2}>
                  {competitivePosition.opportunities.map((opp, index) => (
                    <Text key={index} fontSize="sm">✓ {opp}</Text>
                  ))}
                </VStack>
              ) : (
                <Text fontSize="sm" color="gray.500">No low-intensity forces identified</Text>
              )}
            </CardBody>
          </Card>

          <Card bg="red.50" border="1px" borderColor="red.200">
            <CardHeader>
              <Text fontWeight="semibold" color="red.700">Risk Areas</Text>
            </CardHeader>
            <CardBody>
              {competitivePosition.riskAreas.length > 0 ? (
                <VStack align="start" spacing={2}>
                  {competitivePosition.riskAreas.map((risk, index) => (
                    <Text key={index} fontSize="sm">⚠️ {risk}</Text>
                  ))}
                </VStack>
              ) : (
                <Text fontSize="sm" color="gray.500">No high-intensity forces identified</Text>
              )}
            </CardBody>
          </Card>
        </Grid>
      )}

      {/* Action Items */}
      {competitivePosition && (
        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardHeader>
            <Text fontWeight="semibold">Strategic Recommendations</Text>
          </CardHeader>
          <CardBody>
            <VStack align="start" spacing={2}>
              {competitivePosition.strategicRecommendations.map((rec, index) => (
                <Text key={index} fontSize="sm">
                  {index + 1}. {rec}
                </Text>
              ))}
            </VStack>
          </CardBody>
        </Card>
      )}

      <HStack justify="center">
        <Button onClick={() => setAnalysisStep(1)} variant="outline">
          Start New Analysis
        </Button>
        <Button colorScheme="blue" onClick={onOpen}>
          Export Report
        </Button>
      </HStack>
    </VStack>
  );

  return (
    <Box maxW="6xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" color="blue.500" mb={2}>
            🏢 Interactive Porter's Five Forces Analysis
          </Text>
          <Text fontSize="lg" color="gray.600">
            Comprehensive competitive strategy analysis with real-time industry data
          </Text>
        </Box>

        {/* Progress Indicator */}
        <HStack justify="center" spacing={4}>
          {[1, 2, 3].map(step => (
            <HStack key={step}>
              <Badge
                colorScheme={analysisStep >= step ? 'blue' : 'gray'}
                variant={analysisStep === step ? 'solid' : 'outline'}
                fontSize="sm"
                px={3}
                py={1}
              >
                {step === 1 ? 'Setup' : step === 2 ? 'Analysis' : 'Results'}
              </Badge>
              {step < 3 && <Text color="gray.400">→</Text>}
            </HStack>
          ))}
        </HStack>

        {/* Content */}
        <Card bg={cardBg} border="1px" borderColor={borderColor} shadow="lg">
          <CardBody p={8}>
            {analysisStep === 1 && renderSetupStep()}
            {analysisStep === 2 && renderForceAnalysis()}
            {analysisStep === 3 && renderResults()}
          </CardBody>
        </Card>

        {/* Navigation */}
        {analysisStep === 1 && (
          <HStack justify="flex-end">
            <Button
              onClick={() => setAnalysisStep(2)}
              isDisabled={!companyName || !industry}
              colorScheme="blue"
            >
              Start Force Analysis →
            </Button>
          </HStack>
        )}
      </VStack>

      {/* Export Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Analysis Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Alert status="success">
                <AlertIcon />
                <Text>Your Porter's Five Forces analysis is ready for export.</Text>
              </Alert>
              
              <HStack spacing={4}>
                <Button colorScheme="blue" flex={1}>
                  Download PDF
                </Button>
                <Button variant="outline" flex={1}>
                  Share Link
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InteractivePortersFiveForces;