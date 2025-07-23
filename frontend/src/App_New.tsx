import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChakraProvider, 
  Box, 
  Flex, 
  Button, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  useColorModeValue,
  Textarea,
  Alert,
  AlertIcon,
  Progress,
  Grid,
  GridItem,
  Select,
  Checkbox,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import StartupStageSelector from './components/StartupStageSelector';
import DataPulseWidget from './components/DataPulseWidget';

/**
 * Lucidra - Modular, gamified intelligence platform for strategic planning
 * 
 * Product Tiers:
 * - Lucidra Pro: Modular orchestration sandbox for strategists and developers
 * - Lucidra Lite: Guided, gamified companion for founders building plans, decks, and strategy documents
 * 
 * Features:
 * - Strategic Planning Dashboard
 * - Business Model Canvas
 * - Market Analysis Tools
 * - Strategy Framework Modules
 * - Data Pulse Intelligence
 * - Gamified Learning Experience
 * - Multi-tier product access
 */

// Product tier enumeration
type ProductTier = 'lite' | 'pro' | 'enterprise';

// Strategy Framework types
interface StrategyFramework {
  id: string;
  name: string;
  description: string;
  modules: string[];
  tier: ProductTier;
  enabled: boolean;
}

// Core Data Structures
interface BusinessProfile {
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

interface MarketSignal {
  id: string;
  type: 'social' | 'financial' | 'product' | 'competitor';
  title: string;
  description: string;
  value: number;
  change: number;
  region: string;
  sector: string;
  confidence: number;
  tags: string[];
  actionable: boolean;
}

interface BusinessPlan {
  id: string;
  businessProfileId: string;
  sections: {
    executiveSummary: string;
    marketAnalysis: string;
    competitorAnalysis: string;
    marketingStrategy: string;
    operationalPlan: string;
    financialProjections: string;
    riskAssessment: string;
  };
  status: 'draft' | 'reviewing' | 'complete';
  completionPercentage: number;
}

interface LearningProgress {
  userId: string;
  xp: number;
  level: number;
  badges: string[];
  completedModules: string[];
  streak: number;
  currentTier: ProductTier;
  availableFrameworks: string[];
}

// Strategy Framework data
const STRATEGY_FRAMEWORKS: StrategyFramework[] = [
  {
    id: 'blue-ocean',
    name: 'Blue Ocean Strategy',
    description: 'Create uncontested market space and make competition irrelevant',
    modules: ['Humanness Check', 'As-Is Canvas', 'Future Canvas', 'Six Paths Analysis', 'Buyer Utility Map', 'Strategy Fair', 'Tipping Point Leadership'],
    tier: 'pro',
    enabled: true
  },
  {
    id: 'porter-competitive',
    name: 'Competitive Strategy (Porter)',
    description: 'Analyze industry structure and competitive positioning',
    modules: ['Five Forces Analysis', 'Strategic Positioning Matrix', 'Market Signal Interpreter'],
    tier: 'lite',
    enabled: true
  },
  {
    id: 'porter-advantage',
    name: 'Competitive Advantage (Porter)',
    description: 'Build sustainable competitive advantages',
    modules: ['Value Chain Mapping', 'Cost and Differentiation Drivers', 'Strategic Linkage Exploration'],
    tier: 'pro',
    enabled: true
  },
  {
    id: 'christensen-disruption',
    name: 'Seeing What\'s Next (Christensen)',
    description: 'Predict and navigate disruptive innovation',
    modules: ['Signals of Change', 'Disruption Forecasting', 'Innovation Readiness'],
    tier: 'pro',
    enabled: true
  },
  {
    id: 'rumelt-strategy',
    name: 'Good Strategy / Bad Strategy (Rumelt)',
    description: 'Distinguish good strategy from bad and build effective strategies',
    modules: ['Strategy Kernel', 'Bad Strategy Filters', 'Leverage & Focus Principles'],
    tier: 'lite',
    enabled: true
  },
  {
    id: 'rbv-analysis',
    name: 'Resource-Based View (RBV)',
    description: 'Leverage internal resources for competitive advantage',
    modules: ['Resource Inventory', 'VRIO Analysis Table', 'Capability Mapping'],
    tier: 'pro',
    enabled: true
  }
];

// Product tier configurations
const TIER_CONFIG = {
  lite: {
    name: 'Lucidra Lite',
    description: 'Guided, gamified companion for founders',
    color: 'teal',
    maxFrameworks: 2,
    features: ['Business Model Canvas', 'Market Intelligence', 'Stage Selector', 'Basic Analytics']
  },
  pro: {
    name: 'Lucidra Pro',
    description: 'Modular orchestration sandbox for strategists',
    color: 'purple',
    maxFrameworks: 10,
    features: ['All Lite Features', 'Advanced Strategy Frameworks', 'Data Pulse Intelligence', 'Orchestration Sandbox']
  },
  enterprise: {
    name: 'Lucidra Enterprise',
    description: 'Full-scale strategic intelligence platform',
    color: 'blue',
    maxFrameworks: 999,
    features: ['All Pro Features', 'Custom Frameworks', 'Team Collaboration', 'Advanced Analytics']
  }
};

// Demo Data
const DEMO_BUSINESS_PROFILE: BusinessProfile = {
  id: 'demo_business_1',
  businessName: 'EcoFlow Solutions',
  industry: 'Sustainability Tech',
  stage: 'mvp',
  description: 'Smart water management system for urban environments',
  targetMarket: 'Municipal water departments and urban planners',
  goals: ['Reduce water waste by 30%', 'Launch pilot program', 'Secure Series A funding'],
  challenges: ['Regulatory compliance', 'High initial costs', 'Customer education'],
  createdAt: new Date().toISOString()
};

const DEMO_MARKET_SIGNALS: MarketSignal[] = [
  {
    id: 'signal_1',
    type: 'social',
    title: 'Smart City Tech Trending',
    description: 'Increased discussion about smart city solutions and water management',
    value: 87,
    change: 15.3,
    region: 'North America',
    sector: 'Urban Tech',
    confidence: 89,
    tags: ['smart-city', 'water', 'sustainability'],
    actionable: true
  },
  {
    id: 'signal_2',
    type: 'financial',
    title: 'Sustainability Funding Surge',
    description: 'VC funding for sustainability startups up 45% this quarter',
    value: 92,
    change: 28.7,
    region: 'Global',
    sector: 'CleanTech',
    confidence: 94,
    tags: ['funding', 'sustainability', 'cleantech'],
    actionable: true
  },
  {
    id: 'signal_3',
    type: 'competitor',
    title: 'New Water Tech Startup',
    description: 'Competitor raised $2M seed round for similar water management solution',
    value: 78,
    change: -8.2,
    region: 'Europe',
    sector: 'Water Tech',
    confidence: 85,
    tags: ['competitor', 'funding', 'water-tech'],
    actionable: true
  }
];

// Strategy Framework Components
const StrategyFrameworkCard: React.FC<{ framework: StrategyFramework; currentTier: ProductTier; onSelect: (framework: StrategyFramework) => void }> = ({ framework, currentTier, onSelect }) => {
  const isAccessible = framework.tier === 'lite' || (framework.tier === 'pro' && currentTier !== 'lite') || (framework.tier === 'enterprise' && currentTier === 'enterprise');
  const tierConfig = TIER_CONFIG[framework.tier];
  
  return (
    <Card 
      bg={useColorModeValue('white', 'gray.800')} 
      border={isAccessible ? '1px' : '1px'}
      borderColor={isAccessible ? 'gray.200' : 'gray.300'}
      opacity={isAccessible ? 1 : 0.6}
      _hover={isAccessible ? { shadow: 'md', borderColor: `${tierConfig.color}.300` } : {}}
      cursor={isAccessible ? 'pointer' : 'not-allowed'}
      onClick={() => isAccessible && onSelect(framework)}
    >
      <CardHeader>
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="bold">{framework.name}</Text>
          <Badge colorScheme={tierConfig.color} size="sm">
            {framework.tier.toUpperCase()}
          </Badge>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text fontSize="sm" color="gray.600" mb={4}>
          {framework.description}
        </Text>
        <VStack align="start" spacing={2}>
          <Text fontSize="xs" fontWeight="semibold">Modules:</Text>
          {framework.modules.slice(0, 3).map((module, index) => (
            <Text key={index} fontSize="xs" color="gray.500">
              • {module}
            </Text>
          ))}
          {framework.modules.length > 3 && (
            <Text fontSize="xs" color="gray.400">
              +{framework.modules.length - 3} more modules
            </Text>
          )}
        </VStack>
        {!isAccessible && (
          <Alert status="info" size="sm" mt={4}>
            <AlertIcon />
            <Text fontSize="xs">
              Upgrade to {tierConfig.name} to access
            </Text>
          </Alert>
        )}
      </CardBody>
    </Card>
  );
};

// Business Model Canvas Component
const BusinessModelCanvas: React.FC = () => {
  const [canvasData, setCanvasData] = useState({
    keyPartners: '',
    keyActivities: '',
    keyResources: '',
    valueProposition: '',
    customerRelationships: '',
    channels: '',
    customerSegments: '',
    costStructure: '',
    revenueStreams: ''
  });

  const cardBg = useColorModeValue('white', 'gray.800');

  const handleCanvasUpdate = (section: string, value: string) => {
    setCanvasData(prev => ({ ...prev, [section]: value }));
  };

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4} p={6}>
      <GridItem colSpan={1}>
        <Card bg={cardBg} h="200px">
          <CardHeader>
            <Text fontSize="sm" fontWeight="bold">🤝 Key Partners</Text>
          </CardHeader>
          <CardBody>
            <Textarea
              size="sm"
              placeholder="Who are your key partners and suppliers?"
              value={canvasData.keyPartners}
              onChange={(e) => handleCanvasUpdate('keyPartners', e.target.value)}
              h="100px"
              resize="none"
            />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={1}>
        <VStack spacing={4}>
          <Card bg={cardBg} h="95px">
            <CardHeader>
              <Text fontSize="sm" fontWeight="bold">⚡ Key Activities</Text>
            </CardHeader>
            <CardBody>
              <Textarea
                size="sm"
                placeholder="What key activities does your value proposition require?"
                value={canvasData.keyActivities}
                onChange={(e) => handleCanvasUpdate('keyActivities', e.target.value)}
                h="40px"
                resize="none"
              />
            </CardBody>
          </Card>
          
          <Card bg={cardBg} h="95px">
            <CardHeader>
              <Text fontSize="sm" fontWeight="bold">🔧 Key Resources</Text>
            </CardHeader>
            <CardBody>
              <Textarea
                size="sm"
                placeholder="What key resources does your value proposition require?"
                value={canvasData.keyResources}
                onChange={(e) => handleCanvasUpdate('keyResources', e.target.value)}
                h="40px"
                resize="none"
              />
            </CardBody>
          </Card>
        </VStack>
      </GridItem>

      <GridItem colSpan={1}>
        <Card bg={cardBg} h="200px">
          <CardHeader>
            <Text fontSize="sm" fontWeight="bold">💎 Value Proposition</Text>
          </CardHeader>
          <CardBody>
            <Textarea
              size="sm"
              placeholder="What value do you deliver to customers?"
              value={canvasData.valueProposition}
              onChange={(e) => handleCanvasUpdate('valueProposition', e.target.value)}
              h="100px"
              resize="none"
            />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={1}>
        <VStack spacing={4}>
          <Card bg={cardBg} h="95px">
            <CardHeader>
              <Text fontSize="sm" fontWeight="bold">❤️ Customer Relationships</Text>
            </CardHeader>
            <CardBody>
              <Textarea
                size="sm"
                placeholder="What type of relationship do you establish with customers?"
                value={canvasData.customerRelationships}
                onChange={(e) => handleCanvasUpdate('customerRelationships', e.target.value)}
                h="40px"
                resize="none"
              />
            </CardBody>
          </Card>
          
          <Card bg={cardBg} h="95px">
            <CardHeader>
              <Text fontSize="sm" fontWeight="bold">📢 Channels</Text>
            </CardHeader>
            <CardBody>
              <Textarea
                size="sm"
                placeholder="How do you reach and deliver to customers?"
                value={canvasData.channels}
                onChange={(e) => handleCanvasUpdate('channels', e.target.value)}
                h="40px"
                resize="none"
              />
            </CardBody>
          </Card>
        </VStack>
      </GridItem>

      <GridItem colSpan={1}>
        <Card bg={cardBg} h="200px">
          <CardHeader>
            <Text fontSize="sm" fontWeight="bold">👥 Customer Segments</Text>
          </CardHeader>
          <CardBody>
            <Textarea
              size="sm"
              placeholder="Who are you creating value for?"
              value={canvasData.customerSegments}
              onChange={(e) => handleCanvasUpdate('customerSegments', e.target.value)}
              h="100px"
              resize="none"
            />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={3}>
        <Card bg={cardBg} h="100px">
          <CardHeader>
            <Text fontSize="sm" fontWeight="bold">💰 Cost Structure</Text>
          </CardHeader>
          <CardBody>
            <Textarea
              size="sm"
              placeholder="What are the most important costs in your business model?"
              value={canvasData.costStructure}
              onChange={(e) => handleCanvasUpdate('costStructure', e.target.value)}
              h="40px"
              resize="none"
            />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={2}>
        <Card bg={cardBg} h="100px">
          <CardHeader>
            <Text fontSize="sm" fontWeight="bold">📈 Revenue Streams</Text>
          </CardHeader>
          <CardBody>
            <Textarea
              size="sm"
              placeholder="What revenue streams will you create?"
              value={canvasData.revenueStreams}
              onChange={(e) => handleCanvasUpdate('revenueStreams', e.target.value)}
              h="40px"
              resize="none"
            />
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

// Market Intelligence Component
const MarketIntelligence: React.FC = () => {
  const [signals, setSignals] = useState<MarketSignal[]>(DEMO_MARKET_SIGNALS);
  const [filter, setFilter] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const cardBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setSignals(prev => prev.map(signal => ({
        ...signal,
        value: Math.max(0, Math.min(100, signal.value + (Math.random() - 0.5) * 3)),
        change: (Math.random() - 0.5) * 15
      })));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const filteredSignals = signals.filter(signal => 
    filter === 'all' || signal.type === filter
  );

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'social': return '🌐';
      case 'financial': return '💰';
      case 'product': return '📦';
      case 'competitor': return '🎯';
      default: return '📊';
    }
  };

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">🌊 Market Intelligence</Text>
          <Text color="gray.600">Stay informed about your market and competitors</Text>
        </Box>
        <VStack align="end">
          <Text fontSize="sm" color="gray.500">
            Last update: {lastUpdate.toLocaleTimeString()}
          </Text>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} w="200px">
            <option value="all">All Signals</option>
            <option value="social">Social Trends</option>
            <option value="financial">Financial</option>
            <option value="product">Product</option>
            <option value="competitor">Competitors</option>
          </Select>
        </VStack>
      </HStack>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {filteredSignals.map(signal => (
          <Card key={signal.id} bg={cardBg} _hover={{ shadow: 'md' }}>
            <CardBody>
              <HStack justify="space-between" align="start" mb={3}>
                <HStack>
                  <Text fontSize="xl">{getSignalIcon(signal.type)}</Text>
                  <Box>
                    <Text fontWeight="bold" fontSize="md">{signal.title}</Text>
                    <Text fontSize="sm" color="gray.600">{signal.description}</Text>
                  </Box>
                </HStack>
                <VStack align="end" spacing={0}>
                  <Text fontSize="xl" fontWeight="bold">{signal.value.toFixed(0)}</Text>
                  <Text 
                    fontSize="sm" 
                    color={signal.change >= 0 ? 'green.500' : 'red.500'}
                  >
                    {signal.change >= 0 ? '↗' : '↘'} {Math.abs(signal.change).toFixed(1)}%
                  </Text>
                </VStack>
              </HStack>
              
              <HStack justify="space-between" mb={3}>
                <Text fontSize="xs" color="gray.500">
                  {signal.region} • {signal.sector}
                </Text>
                <Badge colorScheme="blue" size="sm">
                  {signal.confidence}% confidence
                </Badge>
              </HStack>
              
              <HStack spacing={2} mb={3}>
                {signal.tags.map(tag => (
                  <Badge key={tag} size="xs" variant="outline">
                    {tag}
                  </Badge>
                ))}
              </HStack>
              
              {signal.actionable && (
                <Alert status="info" size="sm" borderRadius="md">
                  <AlertIcon />
                  <Text fontSize="xs">
                    This signal suggests immediate action for your business
                  </Text>
                </Alert>
              )}
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

// Business Profile Setup
const BusinessProfileSetup: React.FC<{ onComplete: (profile: BusinessProfile) => void }> = ({ onComplete }) => {
  const [profile, setProfile] = useState<Partial<BusinessProfile>>({
    businessName: '',
    industry: '',
    stage: 'idea',
    description: '',
    targetMarket: '',
    goals: [],
    challenges: []
  });

  const handleSubmit = () => {
    const completeProfile: BusinessProfile = {
      id: `business_${Date.now()}`,
      ...profile,
      goals: profile.goals || [],
      challenges: profile.challenges || [],
      createdAt: new Date().toISOString()
    } as BusinessProfile;
    
    onComplete(completeProfile);
  };

  return (
    <Box p={6} maxW="800px" mx="auto">
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" mb={2}>
            🚀 Welcome to Lucidra
          </Text>
          <Text color="gray.600">
            Let's set up your business profile to get personalized insights
          </Text>
        </Box>

        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Business Name</FormLabel>
                <Input
                  value={profile.businessName}
                  onChange={(e) => setProfile(prev => ({ ...prev, businessName: e.target.value }))}
                  placeholder="Enter your business name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Industry</FormLabel>
                <Select
                  value={profile.industry}
                  onChange={(e) => setProfile(prev => ({ ...prev, industry: e.target.value }))}
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Business Stage</FormLabel>
                <RadioGroup 
                  value={profile.stage} 
                  onChange={(value) => setProfile(prev => ({ ...prev, stage: value as any }))}
                >
                  <Stack direction="row" spacing={8}>
                    <Radio value="idea">💡 Idea</Radio>
                    <Radio value="mvp">🔧 MVP</Radio>
                    <Radio value="growth">📈 Growth</Radio>
                    <Radio value="pivot">🔄 Pivot</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Business Description</FormLabel>
                <Textarea
                  value={profile.description}
                  onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your business in 2-3 sentences"
                  rows={3}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Target Market</FormLabel>
                <Input
                  value={profile.targetMarket}
                  onChange={(e) => setProfile(prev => ({ ...prev, targetMarket: e.target.value }))}
                  placeholder="Who are your target customers?"
                />
              </FormControl>

              <Button 
                colorScheme="teal" 
                size="lg" 
                onClick={handleSubmit}
                isDisabled={!profile.businessName || !profile.industry || !profile.description}
              >
                Create My Business Profile 🚀
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [currentTier, setCurrentTier] = useState<ProductTier>('lite');
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<StrategyFramework | null>(null);
  const [learningProgress, setLearningProgress] = useState<LearningProgress>({
    userId: 'demo_user',
    xp: 250,
    level: 3,
    badges: ['🚀 Getting Started', '📊 First Analysis'],
    completedModules: ['business-profile', 'market-research'],
    streak: 5,
    currentTier: 'lite',
    availableFrameworks: ['porter-competitive', 'rumelt-strategy']
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleProfileComplete = (profile: BusinessProfile) => {
    setBusinessProfile(profile);
    setCurrentView('dashboard');
    setLearningProgress(prev => ({ ...prev, xp: prev.xp + 100 }));
  };
  
  const handleTierChange = (tier: ProductTier) => {
    setCurrentTier(tier);
    setLearningProgress(prev => ({ ...prev, currentTier: tier }));
  };
  
  const handleFrameworkSelect = (framework: StrategyFramework) => {
    setSelectedFramework(framework);
    setCurrentView('strategy-framework');
  };
  
  const getAvailableFrameworks = () => {
    return STRATEGY_FRAMEWORKS.filter(framework => {
      if (currentTier === 'lite') return framework.tier === 'lite';
      if (currentTier === 'pro') return framework.tier === 'lite' || framework.tier === 'pro';
      return true; // enterprise has access to all
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return (
          <Box p={8} textAlign="center">
            <VStack spacing={8} maxW="4xl" mx="auto">
              <Box>
                <Text fontSize="4xl" fontWeight="bold" mb={4}>
                  🚀 Welcome to Lucidra
                </Text>
                <Text fontSize="xl" color="gray.600" mb={6}>
                  Modular, gamified intelligence platform for strategic planning
                </Text>
              </Box>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} w="full">
                {Object.entries(TIER_CONFIG).map(([tier, config]) => (
                  <Card 
                    key={tier}
                    bg={useColorModeValue('white', 'gray.800')}
                    border={currentTier === tier ? '2px' : '1px'}
                    borderColor={currentTier === tier ? `${config.color}.500` : 'gray.200'}
                    _hover={{ shadow: 'lg', borderColor: `${config.color}.300` }}
                    cursor="pointer"
                    onClick={() => handleTierChange(tier as ProductTier)}
                  >
                    <CardHeader>
                      <VStack spacing={2}>
                        <Badge colorScheme={config.color} fontSize="sm" p={2}>
                          {config.name}
                        </Badge>
                        <Text fontSize="lg" fontWeight="bold">{config.description}</Text>
                      </VStack>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold">Features:</Text>
                        {config.features.map((feature, index) => (
                          <Text key={index} fontSize="sm" color="gray.600">
                            • {feature}
                          </Text>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
              
              <VStack spacing={4}>
                <Text fontSize="lg" fontWeight="semibold">
                  Selected: {TIER_CONFIG[currentTier].name}
                </Text>
                <Button 
                  colorScheme={TIER_CONFIG[currentTier].color} 
                  size="lg" 
                  onClick={() => setCurrentView('setup')}
                >
                  Get Started with {TIER_CONFIG[currentTier].name}
                </Button>
              </VStack>
            </VStack>
          </Box>
        );
        
      case 'setup':
        return <BusinessProfileSetup onComplete={handleProfileComplete} />;
        
      case 'stage-selector':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">📊 Startup Stage Selector</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <StartupStageSelector onStageSelect={() => {}} onModuleSelect={() => {}} />
          </Box>
        );
        
      case 'data-pulse':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🌊 Data Pulse Intelligence</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <DataPulseWidget 
              userGoals={businessProfile?.goals}
              primaryProduct={businessProfile?.businessName}
              onSignalClick={(signal) => console.log('Signal clicked:', signal)}
              onMatchClick={(match) => console.log('Match clicked:', match)}
            />
          </Box>
        );
        
      case 'strategy-frameworks':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">📚 Strategy Frameworks</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            
            <Text color="gray.600" mb={6}>
              Interactive strategy frameworks from top business books
            </Text>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {STRATEGY_FRAMEWORKS.map(framework => (
                <StrategyFrameworkCard 
                  key={framework.id} 
                  framework={framework} 
                  currentTier={currentTier}
                  onSelect={handleFrameworkSelect}
                />
              ))}
            </Grid>
          </Box>
        );
        
      case 'strategy-framework':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">
                📖 {selectedFramework?.name}
              </Text>
              <Button variant="outline" onClick={() => setCurrentView('strategy-frameworks')}>← Back to Frameworks</Button>
            </HStack>
            
            <Card bg={useColorModeValue('white', 'gray.800')} mb={6}>
              <CardBody>
                <Text fontSize="lg" mb={4}>{selectedFramework?.description}</Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  This framework includes {selectedFramework?.modules.length} interactive modules:
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                  {selectedFramework?.modules.map((module, index) => (
                    <Card key={index} bg={useColorModeValue('gray.50', 'gray.700')} p={4}>
                      <Text fontSize="sm" fontWeight="semibold">{module}</Text>
                      <Text fontSize="xs" color="gray.500" mt={1}>Interactive module</Text>
                    </Card>
                  ))}
                </Grid>
              </CardBody>
            </Card>
            
            <Alert status="info">
              <AlertIcon />
              <Text fontSize="sm">
                Strategy framework modules are currently in development. They will provide interactive canvases, decision maps, and feedback loops for each framework.
              </Text>
            </Alert>
          </Box>
        );
        
      case 'dashboard':
        if (!businessProfile) {
          return <BusinessProfileSetup onComplete={handleProfileComplete} />;
        }
        
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold">
                  👋 Welcome back, {businessProfile?.businessName}!
                </Text>
                <Text color="gray.600">
                  {businessProfile?.industry} • {businessProfile?.stage} stage • {TIER_CONFIG[currentTier].name}
                </Text>
              </Box>
              <HStack spacing={4}>
                <Badge colorScheme="purple" fontSize="sm" p={2}>
                  Level {learningProgress.level}
                </Badge>
                <Badge colorScheme="teal" fontSize="sm" p={2}>
                  {learningProgress.xp} XP
                </Badge>
                <Badge colorScheme="orange" fontSize="sm" p={2}>
                  {learningProgress.streak} day streak 🔥
                </Badge>
                <Badge colorScheme={TIER_CONFIG[currentTier].color} fontSize="sm" p={2}>
                  {TIER_CONFIG[currentTier].name}
                </Badge>
              </HStack>
            </HStack>

            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
              <GridItem>
                <VStack spacing={4} align="stretch">
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">📋 Quick Actions</Text>
                    </CardHeader>
                    <CardBody>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <Button 
                          colorScheme="blue" 
                          leftIcon={<Text>🎯</Text>}
                          onClick={() => setCurrentView('business-model')}
                        >
                          Business Model Canvas
                        </Button>
                        <Button 
                          colorScheme="green" 
                          leftIcon={<Text>🌊</Text>}
                          onClick={() => setCurrentView('data-pulse')}
                        >
                          Data Pulse Intelligence
                        </Button>
                        <Button 
                          colorScheme="purple" 
                          leftIcon={<Text>📚</Text>}
                          onClick={() => setCurrentView('strategy-frameworks')}
                        >
                          Strategy Frameworks
                        </Button>
                        <Button 
                          colorScheme="orange" 
                          leftIcon={<Text>📊</Text>}
                          onClick={() => setCurrentView('stage-selector')}
                        >
                          Stage Selector
                        </Button>
                      </Grid>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">🎯 Current Goals</Text>
                    </CardHeader>
                    <CardBody>
                      <UnorderedList spacing={2}>
                        {businessProfile?.goals.map((goal, index) => (
                          <ListItem key={index}>{goal}</ListItem>
                        ))}
                      </UnorderedList>
                    </CardBody>
                  </Card>
                  
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">📚 Available Frameworks</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={2}>
                        {getAvailableFrameworks().slice(0, 3).map((framework) => (
                          <Button 
                            key={framework.id} 
                            variant="outline" 
                            size="sm" 
                            leftIcon={<Text>📖</Text>}
                            onClick={() => handleFrameworkSelect(framework)}
                          >
                            {framework.name}
                          </Button>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setCurrentView('strategy-frameworks')}
                        >
                          View All Frameworks →
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </GridItem>

              <GridItem>
                <VStack spacing={4} align="stretch">
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">🏆 Achievements</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={2}>
                        {learningProgress.badges.map((badge, index) => (
                          <Badge key={index} colorScheme="gold" p={2}>
                            {badge}
                          </Badge>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">⚠️ Challenges</Text>
                    </CardHeader>
                    <CardBody>
                      <UnorderedList spacing={2}>
                        {businessProfile?.challenges.map((challenge, index) => (
                          <ListItem key={index} fontSize="sm">
                            {challenge}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </CardBody>
                  </Card>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        );
        
      case 'business-model':
        return (
          <Box>
            <HStack justify="space-between" p={6} pb={0}>
              <Text fontSize="2xl" fontWeight="bold">🎯 Business Model Canvas</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <BusinessModelCanvas />
          </Box>
        );
        
      case 'market-intelligence':
        return (
          <Box>
            <HStack justify="space-between" p={6} pb={0}>
              <Text fontSize="2xl" fontWeight="bold">🌊 Market Intelligence</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <MarketIntelligence />
          </Box>
        );
        
      default:
        return (
          <Box p={8} textAlign="center">
            <Text fontSize="xl" mb={4}>🚀 Lucidra</Text>
            <Text color="gray.600">Strategic intelligence platform</Text>
          </Box>
        );
    }
  };

  return (
    <ChakraProvider>
      <Box bg={bgColor} minH="100vh">
        {/* Navigation */}
        {(businessProfile || currentView !== 'welcome') && (
          <Box bg="white" borderBottom="1px" borderColor="gray.200" px={8} py={4}>
            <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
              <HStack spacing={8}>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView('dashboard')}
                  fontWeight={currentView === 'dashboard' ? 'bold' : 'normal'}
                  color={currentView === 'dashboard' ? 'teal.500' : 'gray.600'}
                >
                  🏠 Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView('business-model')}
                  fontWeight={currentView === 'business-model' ? 'bold' : 'normal'}
                  color={currentView === 'business-model' ? 'teal.500' : 'gray.600'}
                >
                  🎯 Business Model
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView('data-pulse')}
                  fontWeight={currentView === 'data-pulse' ? 'bold' : 'normal'}
                  color={currentView === 'data-pulse' ? 'teal.500' : 'gray.600'}
                >
                  🌊 Data Pulse
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView('strategy-frameworks')}
                  fontWeight={currentView === 'strategy-frameworks' ? 'bold' : 'normal'}
                  color={currentView === 'strategy-frameworks' ? 'teal.500' : 'gray.600'}
                >
                  📚 Frameworks
                </Button>
              </HStack>
              <HStack spacing={4}>
                <Badge colorScheme="purple" variant="subtle">
                  Level {learningProgress.level}
                </Badge>
                <Badge colorScheme="teal" variant="subtle">
                  {learningProgress.xp} XP
                </Badge>
                <Badge colorScheme={TIER_CONFIG[currentTier].color} variant="subtle">
                  {TIER_CONFIG[currentTier].name}
                </Badge>
              </HStack>
            </Flex>
          </Box>
        )}

        {/* Main Content */}
        <Box maxW="7xl" mx="auto">
          {renderCurrentView()}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;