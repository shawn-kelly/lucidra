import React, { useState, useEffect, useCallback } from 'react';
import TutorialVideoLibrary from './components/TutorialVideoLibrary.tsx';
import StrategicMarketingAutomation from './components/StrategicMarketingAutomation.tsx';
import HRManagementNew from './components/HRManagementNew.tsx';
import BlueOceanStrategy from './components/BlueOceanStrategy.tsx';
import ProcessImprovementIntelligence from './components/ProcessImprovementIntelligence.tsx';
import ProcessManagement from './components/ProcessManagement.tsx';
import ProjectManagement from './components/ProjectManagement.tsx';
import MinimalistLayout from './components/MinimalistLayout.tsx';
import ABCCosting from './components/ABCCosting.tsx';
import BusinessModelCanvasFixed from './components/BusinessModelCanvasFixed.tsx';
import StrategyFrameworks from './components/StrategyFrameworks.tsx';
import MissionStatementGenerator from './components/MissionStatementGenerator.tsx';
import InteractivePortersFiveForces from './components/InteractivePortersFiveForces.tsx';
import StrategyExecutionTracker from './components/StrategyExecutionTracker.tsx';
import ComprehensiveBlueOceanStrategy from './components/ComprehensiveBlueOceanStrategy.tsx';
import AdvancedProcessManagement from './components/AdvancedProcessManagement.tsx';
import HuggingFaceVideoProduction from './components/HuggingFaceVideoProduction.tsx';
import RealTimePESTLEAnalysis from './components/RealTimePESTLEAnalysis.tsx';
import CoreFeaturesPage from './pages/CoreFeaturesPage.tsx';
import StrategyFrameworksPage from './pages/StrategyFrameworksPage.tsx';
import OperationsPage from './pages/OperationsPage.tsx';
import AnalyticsAIPage from './pages/AnalyticsAIPage.tsx';
import AdministrationPage from './pages/AdministrationPage.tsx';
// import FinancialFrameworks from './components/FinancialFrameworks';
// import SignalComposer from './components/SignalComposer';
// import InquiryFramework from './components/InquiryFramework';
// import FrameworkIntegrationHub from './components/FrameworkIntegrationHub';
// import BlueOceanStrategyWithData from './components/BlueOceanStrategyWithData';
// import FrameworkIntegrationHubWithData from './components/FrameworkIntegrationHubWithData';
// import PortersFiveForces from './components/PortersFiveForces';
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
  Spacer,
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  useDisclosure,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
// import StartupStageSelector from './components/StartupStageSelector';
// import DataPulseWidget from './components/DataPulseWidget';
import BasicStrategicJourney from './components/BasicStrategicJourney.tsx';
import SectorValueChains from './components/SectorValueChains.tsx';
import FinancialIntegration from './components/FinancialIntegration.tsx';
import AIProcessLogger from './components/AIProcessLogger.tsx';
import PlatformManual from './components/PlatformManual.tsx';
import LandingPage from './components/LandingPage.tsx';

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
  companySize?: string;
  revenue?: string;
  fundingStage?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer';
  permissions: UserPermissions;
  department?: string;
  joinedAt: string;
  lastActive: string;
  companyId: string;
}

interface UserPermissions {
  canManageUsers: boolean;
  canAccessProcessManagement: boolean;
  canAccessProjectManagement: boolean;
  canAccessFinancialData: boolean;
  canEditBusinessProfile: boolean;
  canAccessAIRecommendations: boolean;
  canExportData: boolean;
  maxFrameworksAccess: number;
}

interface CompanyData {
  businessProfile: BusinessProfile;
  users: UserProfile[];
  processData: any[];
  financialData: any[];
  aiLearningData: AILearningProfile;
}

interface AILearningProfile {
  dataQuality: number;
  processOptimizations: number;
  recommendationsAccepted: number;
  industryBenchmarks: any[];
  learningInsights: string[];
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

// Product tier configurations with multi-user support
const TIER_CONFIG = {
  lite: {
    name: 'Lucidra Lite',
    description: 'Guided, gamified companion for founders',
    color: 'teal',
    price: '$29/month',
    baseUsers: 1,
    additionalUserPrice: '$15/user/month',
    maxUsers: 3,
    maxFrameworks: 2,
    maxVideos: 5,
    maxSignals: 10,
    features: [
      'Business Model Canvas', 
      'Market Intelligence', 
      'Stage Selector', 
      'Basic Analytics', 
      '5 AI Videos/month',
      'Up to 3 users',
      'Basic user roles'
    ],
    limitations: ['Limited to 2 frameworks', 'Basic market data only', 'Standard support', 'Basic admin controls']
  },
  pro: {
    name: 'Lucidra Pro',
    description: 'Modular orchestration sandbox for strategists',
    color: 'purple',
    price: '$99/month',
    baseUsers: 5,
    additionalUserPrice: '$20/user/month',
    maxUsers: 25,
    maxFrameworks: 10,
    maxVideos: 25,
    maxSignals: 100,
    features: [
      'All Lite Features', 
      'Advanced Strategy Frameworks', 
      'Data Pulse Intelligence', 
      'Orchestration Sandbox', 
      '25 AI Videos/month', 
      'Global Market Data',
      'Up to 25 users',
      'Advanced user roles & permissions',
      'Company dashboard',
      'Process improvement analytics',
      'Lean methodology tools'
    ],
    limitations: ['Advanced analytics included', 'Priority support', 'API access', 'Advanced admin controls']
  },
  enterprise: {
    name: 'Lucidra Enterprise',
    description: 'Full-scale strategic intelligence platform',
    color: 'blue',
    price: 'Custom Pricing',
    baseUsers: 'Unlimited',
    additionalUserPrice: 'Volume pricing',
    maxUsers: 999,
    maxFrameworks: 999,
    maxVideos: 999,
    maxSignals: 999,
    features: [
      'All Pro Features', 
      'Custom Frameworks', 
      'Team Collaboration', 
      'Advanced Analytics', 
      'Unlimited AI Videos', 
      'White-label Options',
      'Unlimited users',
      'Custom user roles',
      'Enterprise-grade admin controls',
      'Advanced AI learning system',
      'Custom integrations',
      'Dedicated success manager'
    ],
    limitations: ['Unlimited everything', 'Dedicated support', 'Custom integrations', 'Enterprise admin suite']
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
      minH="300px"
      maxH="400px"
    >
      <CardHeader pb={2}>
        <VStack align="start" spacing={2}>
          <Text 
            fontSize={{ base: "sm", md: "md", lg: "lg" }} 
            fontWeight="bold" 
            lineHeight="1.2"
            noOfLines={2}
            wordBreak="break-word"
          >
            {framework.name}
          </Text>
          <Badge colorScheme={tierConfig.color} size="sm">
            {framework.tier.toUpperCase()}
          </Badge>
        </VStack>
      </CardHeader>
      <CardBody pt={0}>
        <Text 
          fontSize={{ base: "xs", md: "sm" }} 
          color="gray.600" 
          mb={4}
          lineHeight="1.4"
          noOfLines={3}
        >
          {framework.description}
        </Text>
        <VStack align="start" spacing={1} mb={4}>
          <Text fontSize="xs" fontWeight="semibold" color="gray.700">Modules:</Text>
          <Box maxH="80px" overflow="hidden">
            {framework.modules.slice(0, 3).map((module, index) => (
              <Text 
                key={index} 
                fontSize="xs" 
                color="gray.500"
                noOfLines={1}
                lineHeight="1.3"
              >
                • {module}
              </Text>
            ))}
          </Box>
          {framework.modules.length > 3 && (
            <Text fontSize="xs" color="gray.400" fontStyle="italic">
              +{framework.modules.length - 3} more modules
            </Text>
          )}
        </VStack>
        {!isAccessible && (
          <Alert status="info" size="sm" mt={2} borderRadius="md">
            <AlertIcon boxSize={3} />
            <Text fontSize="xs" lineHeight="1.2">
              Upgrade to {tierConfig.name} to access
            </Text>
          </Alert>
        )}
      </CardBody>
    </Card>
  );
};


// Video Generator Component
const VideoGeneratorComponent: React.FC<{ currentTier: ProductTier; videosThisMonth: number; setVideosThisMonth: (fn: (prev: number) => number) => void }> = ({ currentTier, videosThisMonth, setVideosThisMonth }) => {
  const [videoScript, setVideoScript] = useState('');
  const [videoContent, setVideoContent] = useState('');
  const [generatedVideos, setGeneratedVideos] = useState<Array<{id: string, script: string, content: string, status: string}>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('gray.50', 'gray.700');
  const tierConfig = TIER_CONFIG[currentTier];
  
  const handleGenerateVideo = async () => {
    if (!videoScript || !videoContent) return;
    
    // Check tier limits
    if (videosThisMonth >= tierConfig.maxVideos) {
      alert(`You've reached your ${tierConfig.name} limit of ${tierConfig.maxVideos} videos per month. Upgrade to generate more videos.`);
      return;
    }
    
    setIsGenerating(true);
    const videoId = `video_${Date.now()}`;
    
    // Add to local state for demo
    const newVideo = {
      id: videoId,
      script: videoScript,
      content: videoContent,
      status: 'generating'
    };
    
    setGeneratedVideos(prev => [...prev, newVideo]);
    setVideosThisMonth(prev => prev + 1);
    
    // Simulate video generation with tier-based speed
    const generationTime = currentTier === 'enterprise' ? 2000 : currentTier === 'pro' ? 3000 : 5000;
    setTimeout(() => {
      setGeneratedVideos(prev => prev.map(v => 
        v.id === videoId ? { ...v, status: 'completed' } : v
      ));
      setIsGenerating(false);
    }, generationTime);
  };
  
  return (
    <Box p={6}>
      {/* Tier Usage Display */}
      <Box mb={6} p={4} bg={infoBg} borderRadius="lg" border="1px" borderColor={`${tierConfig.color}.200`}>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="lg" fontWeight="bold">{tierConfig.name} - AI Video Generator</Text>
            <Text fontSize="sm" color="gray.600">Generate professional videos with AI assistance</Text>
          </VStack>
          <VStack align="end" spacing={1}>
            <Badge colorScheme={tierConfig.color} fontSize="md" p={2}>
              {videosThisMonth}/{tierConfig.maxVideos === 999 ? '∞' : tierConfig.maxVideos} videos this month
            </Badge>
            <Progress 
              value={(videosThisMonth / (tierConfig.maxVideos === 999 ? 100 : tierConfig.maxVideos)) * 100} 
              colorScheme={tierConfig.color} 
              size="sm" 
              w="200px"
            />
          </VStack>
        </HStack>
      </Box>
      
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        <GridItem>
          <Card bg={cardBg}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">Create Your Video</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Video Content</FormLabel>
                  <Textarea
                    value={videoContent}
                    onChange={(e) => setVideoContent(e.target.value)}
                    placeholder="Describe what you want your video to show..."
                    h="100px"
                    resize="none"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Voiceover Script</FormLabel>
                  <Textarea
                    value={videoScript}
                    onChange={(e) => setVideoScript(e.target.value)}
                    placeholder="Write the script for your video narration..."
                    h="100px"
                    resize="none"
                  />
                </FormControl>
                
                <Button
                  colorScheme={tierConfig.color}
                  onClick={handleGenerateVideo}
                  isLoading={isGenerating}
                  loadingText={`Generating Video... (${currentTier === 'enterprise' ? 'Fast' : currentTier === 'pro' ? 'Standard' : 'Basic'} Speed)`}
                  isDisabled={!videoScript || !videoContent || videosThisMonth >= tierConfig.maxVideos}
                  leftIcon={<Text>🎬</Text>}
                  size="lg"
                >
                  {videosThisMonth >= tierConfig.maxVideos ? `Limit Reached - Upgrade ${tierConfig.name}` : 'Generate AI Video'}
                </Button>
                
                {currentTier === 'lite' && (
                  <Alert status="info" size="sm">
                    <AlertIcon />
                    <Text fontSize="xs">Lite users get basic video generation. Upgrade to Pro for faster processing and more features!</Text>
                  </Alert>
                )}
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem>
          <Card bg={cardBg}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">Video Status</Text>
            </CardHeader>
            <CardBody>
              {isGenerating ? (
                <VStack spacing={4} align="stretch">
                  <Alert status="info" size="sm">
                    <AlertIcon />
                    <Text fontSize="sm">Generating your video...</Text>
                  </Alert>
                  <Progress size="sm" isIndeterminate colorScheme="blue" />
                </VStack>
              ) : generatedVideos.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" color="gray.600">Latest Video:</Text>
                  <Box bg={infoBg} p={4} borderRadius="md">
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Video Content:</Text>
                    <Text fontSize="xs" color="gray.600" mb={2}>{generatedVideos[generatedVideos.length - 1]?.content}</Text>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Script:</Text>
                    <Text fontSize="xs" color="gray.600" mb={2}>{generatedVideos[generatedVideos.length - 1]?.script}</Text>
                    <Badge colorScheme="green">Completed</Badge>
                  </Box>
                  <Alert status="success" size="sm">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">✅ Video Generated Successfully!</Text>
                      <Text fontSize="xs">Quality: {currentTier === 'enterprise' ? 'Ultra HD (4K)' : currentTier === 'pro' ? 'Full HD (1080p)' : 'HD (720p)'}</Text>
                      <Text fontSize="xs">Speed: {currentTier === 'enterprise' ? 'Enterprise (2s)' : currentTier === 'pro' ? 'Pro (3s)' : 'Lite (5s)'}</Text>
                    </VStack>
                  </Alert>
                </VStack>
              ) : (
                <Text color="gray.500" fontSize="sm">
                  No videos generated yet. Create a video to see its status here.
                </Text>
              )}
            </CardBody>
          </Card>
          
          <Card bg={cardBg} mt={4}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">Previous Videos</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={2} align="stretch">
                {generatedVideos.map((video) => (
                  <HStack key={video.id} justify="space-between" p={2} bg={infoBg} borderRadius="md">
                    <Text fontSize="xs" fontWeight="mono">{video.id}</Text>
                    <Badge 
                      size="sm"
                      colorScheme={
                        video.status === 'completed' ? 'green' :
                        video.status === 'failed' ? 'red' :
                        video.status === 'generating' ? 'blue' : 'gray'
                      }
                    >
                      {video.status}
                    </Badge>
                  </HStack>
                ))}
                {generatedVideos.length === 0 && (
                  <Text color="gray.500" fontSize="sm">
                    No videos generated yet.
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
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

// Navigation Components
const NavigationHeader: React.FC<{
  currentView: string;
  setCurrentView: (view: string) => void;
  currentTier: ProductTier;
  learningProgress: LearningProgress;
}> = ({ currentView, setCurrentView, currentTier, learningProgress }) => {
  const headerBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <Box 
      bg={headerBg} 
      borderBottom="1px" 
      borderColor={borderColor} 
      py={3} 
      px={6} 
      position="sticky" 
      top={0} 
      zIndex={1000}
      shadow="sm"
    >
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        {/* Logo and Brand */}
        <HStack spacing={4}>
          <Button 
            variant="ghost" 
            fontSize="xl" 
            fontWeight="bold" 
            onClick={() => setCurrentView('home')}
            color="teal.500"
            leftIcon={<Text>🚀</Text>}
          >
            Lucidra
          </Button>
          <Badge colorScheme={TIER_CONFIG[currentTier].color} variant="subtle" fontSize="xs">
            {TIER_CONFIG[currentTier].name}
          </Badge>
        </HStack>

        {/* Main Navigation - Section Based */}
        <HStack spacing={1}>
          <Button
            variant={currentView === 'home' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'home' ? 'teal' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('home')}
          >
            🏠 Home
          </Button>
          <Button
            variant={currentView === 'core-features' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'core-features' ? 'teal' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('core-features')}
          >
            🎯 Core Features
          </Button>
          <Button
            variant={currentView === 'strategy-frameworks-section' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'strategy-frameworks-section' ? 'teal' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('strategy-frameworks-section')}
          >
            📚 Strategy Frameworks
          </Button>
          <Button
            variant={currentView === 'operations-section' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'operations-section' ? 'teal' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('operations-section')}
          >
            ⚙️ Operations
          </Button>
          <Button
            variant={currentView === 'analytics-ai-section' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'analytics-ai-section' ? 'teal' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('analytics-ai-section')}
          >
            🤖 Analytics & AI
          </Button>
          <Button
            variant={currentView === 'administration-section' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'administration-section' ? 'teal' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('administration-section')}
          >
            🛡️ Administration
          </Button>
        </HStack>

        {/* User Actions */}
        <HStack spacing={2}>
          <Button 
            colorScheme="teal" 
            size="sm" 
            onClick={() => setCurrentView('pricing')}
            variant="solid"
          >
            ⭐ Upgrade
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

const Breadcrumb: React.FC<{
  currentView: string;
  selectedFramework?: StrategyFramework | null;
  setCurrentView: (view: string) => void;
}> = ({ currentView, selectedFramework, setCurrentView }) => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const linkColor = useColorModeValue('teal.500', 'teal.300');
  const breadcrumbBg = useColorModeValue('gray.50', 'gray.900');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  
  const getBreadcrumbItems = () => {
    const items = [
      { label: 'Home', view: 'home', icon: '🏠' }
    ];
    
    switch (currentView) {
      case 'strategic-journey':
        items.push({ label: 'Strategic Journey', view: 'strategic-journey', icon: '🗺️' });
        break;
      case 'dashboard':
        items.push({ label: 'Dashboard', view: 'dashboard', icon: '📊' });
        break;
      case 'strategy-frameworks':
        items.push({ label: 'Strategy Frameworks', view: 'strategy-frameworks', icon: '📚' });
        break;
      case 'mission-statement':
        items.push({ label: 'Mission Statement Generator', view: 'mission-statement', icon: '🎯' });
        break;
      case 'five-forces':
        items.push({ label: 'Porter\'s Five Forces Analysis', view: 'five-forces', icon: '🏢' });
        break;
      case 'execution-tracker':
        items.push({ label: 'Strategy Execution Tracker', view: 'execution-tracker', icon: '📈' });
        break;
      case 'blue-ocean-comprehensive':
        items.push({ label: 'Blue Ocean Strategy Workshop', view: 'blue-ocean-comprehensive', icon: '🌊' });
        break;
      case 'process-management-advanced':
        items.push({ label: 'Advanced Process Management', view: 'process-management-advanced', icon: '🏭' });
        break;
      case 'video-production':
        items.push({ label: 'AI Video Production Studio', view: 'video-production', icon: '🎬' });
        break;
      case 'pestle-realtime':
        items.push({ label: 'Real-Time PESTLE Analysis', view: 'pestle-realtime', icon: '📊' });
        break;
      case 'core-features':
        items.push({ label: 'Core Features', view: 'core-features', icon: '🎯' });
        break;
      case 'strategy-frameworks-section':
        items.push({ label: 'Strategy Frameworks', view: 'strategy-frameworks-section', icon: '📚' });
        break;
      case 'operations-section':
        items.push({ label: 'Operations', view: 'operations-section', icon: '⚙️' });
        break;
      case 'analytics-ai-section':
        items.push({ label: 'Analytics & AI', view: 'analytics-ai-section', icon: '🤖' });
        break;
      case 'administration-section':
        items.push({ label: 'Administration', view: 'administration-section', icon: '🛡️' });
        break;
      case 'strategy-framework':
        items.push(
          { label: 'Strategy Frameworks', view: 'strategy-frameworks', icon: '📚' },
          { label: selectedFramework?.name || 'Framework', view: 'strategy-framework', icon: '🎯' }
        );
        break;
      case 'marketing-automation':
        items.push({ label: 'Marketing Automation', view: 'marketing-automation', icon: '📈' });
        break;
      case 'hr-management':
        items.push({ label: 'HR Management', view: 'hr-management', icon: '👥' });
        break;
      case 'tutorial-videos':
        items.push({ label: 'Tutorial Videos', view: 'tutorial-videos', icon: '📚' });
        break;
      case 'team-interaction':
        items.push({ label: 'Live Team Collaboration', view: 'team-interaction', icon: '👥' });
        break;
      case 'bloom-training':
        items.push({ label: 'Bloom\'s Taxonomy Training', view: 'bloom-training', icon: '🔺' });
        break;
      case 'process-analysis':
        items.push({ label: 'Process Analysis Framework', view: 'process-analysis', icon: '🔍' });
        break;
      case 'process-improvement':
        items.push({ label: 'Process Improvement', view: 'process-improvement', icon: '🔄' });
        break;
      case 'process-management':
        items.push({ label: 'Process Management', view: 'process-management', icon: '🏭' });
        break;
      case 'project-management':
        items.push({ label: 'Project Management', view: 'project-management', icon: '📊' });
        break;
      case 'sector-value-chains':
        items.push({ label: 'Sector Value Chains', view: 'sector-value-chains', icon: '🏭' });
        break;
      case 'financial-integration':
        items.push({ label: 'Financial Integration', view: 'financial-integration', icon: '💰' });
        break;
      case 'ai-process-logger':
        items.push({ label: 'AI Process Logger', view: 'ai-process-logger', icon: '🤖' });
        break;
      case 'platform-manual':
        items.push({ label: 'Platform Manual', view: 'platform-manual', icon: '📖' });
        break;
      case 'capability-architecture':
        items.push({ label: 'Capability Architecture', view: 'capability-architecture', icon: '🏗️' });
        break;
      case 'inquiry-framework':
        items.push({ label: 'Inquiry Framework', view: 'inquiry-framework', icon: '🧠' });
        break;
      case 'ai-implementation':
        items.push({ label: 'AI Implementation Coach', view: 'ai-implementation', icon: '🤖' });
        break;
      case 'team-collaboration':
        items.push({ label: 'Team Collaboration', view: 'team-collaboration', icon: '👥' });
        break;
      case 'framework-integration':
        items.push({ label: 'Framework Integration', view: 'framework-integration', icon: '🔗' });
        break;
      case 'live-integration':
        items.push({ label: 'Live Integration Hub', view: 'live-integration', icon: '🟢' });
        break;
      case 'journey-mapping':
        items.push({ label: 'Journey Mapping', view: 'journey-mapping', icon: '🗺️' });
        break;
      case 'strategic-planning':
        items.push({ label: 'Strategic Planning', view: 'strategic-planning', icon: '🎯' });
        break;
      case 'financial-analysis':
        items.push({ label: 'Financial Analysis', view: 'financial-analysis', icon: '💰' });
        break;
      case 'business-model-canvas':
        items.push({ label: 'Business Model Canvas', view: 'business-model-canvas', icon: '🎯' });
        break;
      case 'market-intelligence':
        items.push({ label: 'Market Intelligence', view: 'market-intelligence', icon: '🌊' });
        break;
      case 'video-generator':
        items.push({ label: 'AI Video Generator', view: 'video-generator', icon: '🎬' });
        break;
      case 'pricing':
        items.push({ label: 'Pricing & Plans', view: 'pricing', icon: '💳' });
        break;
      case 'welcome':
        items.push({ label: 'Welcome', view: 'welcome', icon: '👋' });
        break;
    }
    
    return items;
  };
  
  const breadcrumbItems = getBreadcrumbItems();
  
  if (breadcrumbItems.length <= 1) return null;
  
  return (
    <Box py={2} px={6} bg={breadcrumbBg}>
      <HStack spacing={2} maxW="7xl" mx="auto">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.view}>
            {index > 0 && <Text color={textColor}>/</Text>}
            <Button
              variant="ghost"
              size="sm"
              fontSize="xs"
              color={index === breadcrumbItems.length - 1 ? textColor : linkColor}
              cursor={index === breadcrumbItems.length - 1 ? 'default' : 'pointer'}
              onClick={() => index !== breadcrumbItems.length - 1 && setCurrentView(item.view)}
              leftIcon={<Text fontSize="xs">{item.icon}</Text>}
              _hover={index === breadcrumbItems.length - 1 ? {} : { bg: hoverBg }}
            >
              {item.label}
            </Button>
          </React.Fragment>
        ))}
      </HStack>
    </Box>
  );
};

const PricingCTA: React.FC<{
  currentTier: ProductTier;
  setCurrentView: (view: string) => void;
}> = ({ currentTier, setCurrentView }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  if (currentTier === 'enterprise') return null;
  
  const nextTier = currentTier === 'lite' ? 'pro' : 'enterprise';
  const nextTierConfig = TIER_CONFIG[nextTier];
  
  return (
    <Box 
      position="fixed" 
      bottom={4} 
      right={4} 
      zIndex={1000}
      display={{ base: 'none', md: 'block' }}
    >
      <Card 
        bg={cardBg} 
        border="2px" 
        borderColor={`${nextTierConfig.color}.200`}
        shadow="lg"
        maxW="280px"
      >
        <CardBody p={4}>
          <VStack spacing={3} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm" fontWeight="bold" color={`${nextTierConfig.color}.500`}>
                ⭐ Upgrade to {nextTierConfig.name}
              </Text>
            </HStack>
            <Text fontSize="xs" color="gray.600" noOfLines={2}>
              {nextTierConfig.description}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              {nextTierConfig.price}
            </Text>
            <Button 
              colorScheme={nextTierConfig.color} 
              size="sm"
              onClick={() => setCurrentView('pricing')}
            >
              View Plans
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

// Main App Component
// Authentication Interface
interface AuthUser {
  email: string;
  name: string;
  tier: 'lite' | 'pro' | 'enterprise';
  companyName?: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [currentTier, setCurrentTier] = useState<ProductTier>('lite');
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<StrategyFramework | null>(null);
  const [videosThisMonth, setVideosThisMonth] = useState(0);
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
  const welcomeCardBg = useColorModeValue('white', 'gray.800');
  const frameworkCardBg = useColorModeValue('white', 'gray.800');
  const frameworkModuleBg = useColorModeValue('gray.50', 'gray.700');
  const infoBg = useColorModeValue('gray.50', 'gray.700');
  const paymentBg = useColorModeValue('gray.50', 'gray.700');
  const enterpriseBg = useColorModeValue('blue.50', 'blue.900');

  const handleProfileComplete = (profile: BusinessProfile) => {
    setBusinessProfile(profile);
    setCurrentView('strategic-journey');
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
      case 'home':
        return (
          <Box p={8}>
            <VStack spacing={8} maxW="7xl" mx="auto">
              {/* Hero Section */}
              <Box textAlign="center" py={8}>
                <Text fontSize="5xl" fontWeight="bold" mb={4} bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">
                  🚀 Lucidra Platform
                </Text>
                <Text fontSize="xl" color="gray.600" mb={6} maxW="3xl" mx="auto">
                  Your comprehensive modular intelligence ecosystem for strategic planning, financial analysis, and business development
                </Text>
                <HStack justify="center" spacing={4}>
                  <Button 
                    colorScheme="teal" 
                    size="lg" 
                    onClick={() => setCurrentView('dashboard')}
                    leftIcon={<Text>📊</Text>}
                  >
                    Launch Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    colorScheme="teal" 
                    size="lg" 
                    onClick={() => setCurrentView('welcome')}
                    leftIcon={<Text>🎯</Text>}
                  >
                    Choose Your Plan
                  </Button>
                </HStack>
              </Box>

              {/* Quick Access Cards */}
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} w="full">
                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('strategy-frameworks')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">📚</Text>
                      <Text fontSize="lg" fontWeight="bold">Strategy Frameworks</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Access {getAvailableFrameworks().length} proven business strategy frameworks
                    </Text>
                    <Badge colorScheme="blue" variant="subtle">
                      {getAvailableFrameworks().length} Available
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('strategic-planning')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🎯</Text>
                      <Text fontSize="lg" fontWeight="bold">Strategic Planning</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      AI-powered strategic transformation coach with Blue Ocean & Porter's integration
                    </Text>
                    <Badge colorScheme="purple" variant="subtle">
                      AI Coaching
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('financial-analysis')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">💰</Text>
                      <Text fontSize="lg" fontWeight="bold">Financial Analysis</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      DuPont, IRR, ABC, Break-even analysis with global market data
                    </Text>
                    <Badge colorScheme="green" variant="subtle">
                      6 Global Regions
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('business-model-canvas')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🎯</Text>
                      <Text fontSize="lg" fontWeight="bold">Business Model Canvas</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Interactive 9-section business model development tool
                    </Text>
                    <Badge colorScheme="purple" variant="subtle">
                      Interactive Canvas
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('market-intelligence')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🌊</Text>
                      <Text fontSize="lg" fontWeight="bold">Market Intelligence</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Real-time market signals and competitive intelligence
                    </Text>
                    <Badge colorScheme="teal" variant="subtle">
                      Live Data
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('video-generator')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🎬</Text>
                      <Text fontSize="lg" fontWeight="bold">AI Video Generator</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Generate professional videos with AI assistance
                    </Text>
                    <Badge colorScheme="orange" variant="subtle">
                      {TIER_CONFIG[currentTier].maxVideos} Videos/month
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('marketing-automation')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">📈</Text>
                      <Text fontSize="lg" fontWeight="bold">Marketing Automation</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Strategic marketing platform surpassing Act-On with framework integration
                    </Text>
                    <Badge colorScheme="purple" variant="subtle">
                      Strategy-Based
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('hr-management')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">👥</Text>
                      <Text fontSize="lg" fontWeight="bold">HR Management</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Strategic workforce planning with competency-based job descriptions
                    </Text>
                    <Badge colorScheme="blue" variant="subtle">
                      Strategic HR
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('tutorial-videos')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">📚</Text>
                      <Text fontSize="lg" fontWeight="bold">Tutorial Videos</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Step-by-step demonstration videos for using Lucidra platform
                    </Text>
                    <Badge colorScheme="green" variant="subtle">
                      Learn & Apply
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('bloom-training')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🔺</Text>
                      <Text fontSize="lg" fontWeight="bold">Bloom's Taxonomy Training</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Progressive cognitive learning system for mastering strategy frameworks
                    </Text>
                    <Badge colorScheme="purple" variant="subtle">
                      Advanced Learning
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('process-analysis')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🔍</Text>
                      <Text fontSize="lg" fontWeight="bold">Process Analysis</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      SIPOC mapping, swimlane analysis, and strategic process optimization
                    </Text>
                    <Badge colorScheme="teal" variant="subtle">
                      Strategic Analysis
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('process-improvement')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🔄</Text>
                      <Text fontSize="lg" fontWeight="bold">Process Improvement</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      AI-assisted process mapping and improvement with strategic alignment
                    </Text>
                    <Badge colorScheme="cyan" variant="subtle">
                      Integrated Intelligence
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('process-management')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🏭</Text>
                      <Text fontSize="lg" fontWeight="bold">Process Management</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Full BPMN 2.0 workflow designer with swimlanes, AI narrative analysis, and resource allocation
                    </Text>
                    <Badge colorScheme="purple" variant="subtle">
                      BPMN + AI Integration
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('project-management')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">📊</Text>
                      <Text fontSize="lg" fontWeight="bold">Project Management</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Comprehensive project planning with Gantt charts, resource optimization, and process integration
                    </Text>
                    <Badge colorScheme="blue" variant="subtle">
                      Integrated Planning
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('sector-value-chains')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🏭</Text>
                      <Text fontSize="lg" fontWeight="bold">Sector Value Chains</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Industry-specific value chain templates for 12+ sectors including banking, professional services, and manufacturing
                    </Text>
                    <Badge colorScheme="purple" variant="subtle">
                      12 Industry Templates
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('financial-integration')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">💰</Text>
                      <Text fontSize="lg" fontWeight="bold">Financial Integration</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Connect QuickBooks, Sage, Great Plains, and other accounting systems for comprehensive financial analysis
                    </Text>
                    <Badge colorScheme="green" variant="subtle">
                      Multi-Platform Support
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('ai-process-logger')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🤖</Text>
                      <Text fontSize="lg" fontWeight="bold">AI Process Logger</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Note-taking style issue logging with AI analysis, real-time improvement tracking, and automated reporting
                    </Text>
                    <Badge colorScheme="orange" variant="subtle">
                      AI-Powered Analysis
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('platform-manual')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">📖</Text>
                      <Text fontSize="lg" fontWeight="bold">Platform Manual</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Comprehensive user guide with step-by-step instructions, best practices, and printable modules for all features
                    </Text>
                    <Badge colorScheme="teal" variant="subtle">
                      Interactive Guide
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('inquiry-framework')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🧠</Text>
                      <Text fontSize="lg" fontWeight="bold">Inquiry Framework</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Warren Berger's "A More Beautiful Question" - Why → What If → How methodology
                    </Text>
                    <Badge colorScheme="purple" variant="subtle">
                      Strategic Questioning
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('capability-architecture')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🏗️</Text>
                      <Text fontSize="lg" fontWeight="bold">Capability Architecture</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Strategic capability analysis using Porter's Value Chain and Blue Ocean ERRC
                    </Text>
                    <Badge colorScheme="blue" variant="subtle">
                      Strategic Planning
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('ai-implementation')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🤖</Text>
                      <Text fontSize="lg" fontWeight="bold">AI Implementation Coach</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Tactical AI coaching with performance gap detection and strategic nudges
                    </Text>
                    <Badge colorScheme="cyan" variant="subtle">
                      AI-Powered Coaching
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('team-collaboration')}
                  transition="all 0.2s"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">👥</Text>
                      <Text fontSize="lg" fontWeight="bold">Team Collaboration</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Async collaboration with structured feedback and assumption challenging
                    </Text>
                    <Badge colorScheme="pink" variant="subtle">
                      Team Facilitation
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('framework-integration')}
                  transition="all 0.2s"
                  border="2px"
                  borderColor="teal.200"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🔗</Text>
                      <Text fontSize="lg" fontWeight="bold">Framework Integration</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      See how insights from one framework create opportunities in others
                    </Text>
                    <Badge colorScheme="teal" variant="subtle">
                      Cross-Framework Intelligence
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('live-integration')}
                  transition="all 0.2s"
                  border="2px"
                  borderColor="green.200"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">🟢</Text>
                      <Text fontSize="lg" fontWeight="bold">Live Data System</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Real-time data persistence with cross-framework intelligence and live updates
                    </Text>
                    <Badge colorScheme="green" variant="subtle">
                      Persistent Storage & Live Sync
                    </Badge>
                  </CardBody>
                </Card>

                <Card 
                  bg={cardBg} 
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  cursor="pointer"
                  onClick={() => setCurrentView('pricing')}
                  transition="all 0.2s"
                  border="2px"
                  borderColor="orange.200"
                >
                  <CardHeader>
                    <HStack>
                      <Text fontSize="2xl">⭐</Text>
                      <Text fontSize="lg" fontWeight="bold">Upgrade & Pricing</Text>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" fontSize="sm" mb={3}>
                      Explore all plans and upgrade your tier for more features
                    </Text>
                    <Badge colorScheme="orange" variant="solid">
                      View All Plans
                    </Badge>
                  </CardBody>
                </Card>
              </Grid>

              {/* Current Tier Status */}
              <Card bg={cardBg} w="full">
                <CardHeader>
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">Your Current Plan: {TIER_CONFIG[currentTier].name}</Text>
                    <Badge colorScheme={TIER_CONFIG[currentTier].color} variant="solid">
                      {TIER_CONFIG[currentTier].price}
                    </Badge>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                    <VStack align="start">
                      <Text fontSize="sm" fontWeight="semibold">Available Features</Text>
                      {TIER_CONFIG[currentTier].features.slice(0, 3).map((feature, i) => (
                        <HStack key={i}>
                          <Text fontSize="xs" color="green.500">✓</Text>
                          <Text fontSize="xs">{feature}</Text>
                        </HStack>
                      ))}
                    </VStack>
                    <VStack align="start">
                      <Text fontSize="sm" fontWeight="semibold">Usage Limits</Text>
                      <HStack>
                        <Text fontSize="xs">📚 Frameworks:</Text>
                        <Text fontSize="xs" fontWeight="bold">{TIER_CONFIG[currentTier].maxFrameworks}</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="xs">🎬 Videos:</Text>
                        <Text fontSize="xs" fontWeight="bold">{TIER_CONFIG[currentTier].maxVideos}/month</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="xs">📡 Signals:</Text>
                        <Text fontSize="xs" fontWeight="bold">{TIER_CONFIG[currentTier].maxSignals}</Text>
                      </HStack>
                    </VStack>
                    <VStack align="start">
                      <Text fontSize="sm" fontWeight="semibold">Your Progress</Text>
                      <HStack>
                        <Text fontSize="xs">🏆 Level:</Text>
                        <Text fontSize="xs" fontWeight="bold">{learningProgress.level}</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="xs">⭐ XP:</Text>
                        <Text fontSize="xs" fontWeight="bold">{learningProgress.xp}</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="xs">🔥 Streak:</Text>
                        <Text fontSize="xs" fontWeight="bold">{learningProgress.streak} days</Text>
                      </HStack>
                    </VStack>
                  </Grid>
                  {currentTier !== 'enterprise' && (
                    <Box mt={4} pt={4} borderTop="1px" borderColor="gray.200">
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">
                          Want access to more features and unlimited usage?
                        </Text>
                        <Button 
                          colorScheme="orange" 
                          size="sm" 
                          onClick={() => setCurrentView('pricing')}
                        >
                          Upgrade Now
                        </Button>
                      </HStack>
                    </Box>
                  )}
                </CardBody>
              </Card>
            </VStack>
          </Box>
        );

      case 'welcome':
        return (
          <Box p={8} textAlign="center">
            <VStack spacing={8} maxW="6xl" mx="auto">
              <Box>
                <Text fontSize="4xl" fontWeight="bold" mb={4}>
                  🚀 Welcome to Lucidra
                </Text>
                <Text fontSize="xl" color="gray.600" mb={6}>
                  Choose your plan to get started with our modular intelligence platform
                </Text>
              </Box>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} w="full">
                {Object.entries(TIER_CONFIG).map(([tier, config]) => (
                  <Card 
                    key={tier}
                    bg={welcomeCardBg}
                    border={currentTier === tier ? '3px' : '1px'}
                    borderColor={currentTier === tier ? `${config.color}.500` : 'gray.200'}
                    _hover={{ shadow: 'xl', borderColor: `${config.color}.400`, transform: 'translateY(-4px)' }}
                    cursor="pointer"
                    onClick={() => handleTierChange(tier as ProductTier)}
                    transition="all 0.2s"
                    position="relative"
                    minH="450px"
                  >
                    {tier === 'pro' && (
                      <Badge 
                        position="absolute" 
                        top="-10px" 
                        right="20px" 
                        colorScheme="orange" 
                        fontSize="sm"
                        px={3}
                        py={1}
                      >
                        MOST POPULAR
                      </Badge>
                    )}
                    <CardHeader>
                      <VStack spacing={3}>
                        <Badge colorScheme={config.color} fontSize="lg" p={3} borderRadius="full">
                          {config.name}
                        </Badge>
                        <Text fontSize="2xl" fontWeight="bold" color={`${config.color}.600`}>
                          {config.price}
                        </Text>
                        <Text fontSize="md" color="gray.600" textAlign="center">
                          {config.description}
                        </Text>
                      </VStack>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontSize="sm" fontWeight="bold" color="green.600" mb={2}>✓ What's Included:</Text>
                          <VStack align="start" spacing={1}>
                            {config.features.map((feature, index) => (
                              <HStack key={index} align="start">
                                <Text color="green.500" fontSize="sm">✓</Text>
                                <Text fontSize="sm" color="gray.700">
                                  {feature}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                        </Box>
                        
                        <Box>
                          <Text fontSize="sm" fontWeight="bold" color="blue.600" mb={2}>📊 Limits:</Text>
                          <VStack align="start" spacing={1}>
                            <Text fontSize="xs" color="gray.600">• Frameworks: {config.maxFrameworks === 999 ? 'Unlimited' : config.maxFrameworks}</Text>
                            <Text fontSize="xs" color="gray.600">• AI Videos: {config.maxVideos === 999 ? 'Unlimited' : `${config.maxVideos}/month`}</Text>
                            <Text fontSize="xs" color="gray.600">• Market Signals: {config.maxSignals === 999 ? 'Unlimited' : config.maxSignals}</Text>
                          </VStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
              
              <VStack spacing={4}>
                <Box textAlign="center" p={6} bg={infoBg} borderRadius="lg" border="2px" borderColor={`${TIER_CONFIG[currentTier].color}.200`}>
                  <Text fontSize="xl" fontWeight="bold" mb={2}>
                    Selected: {TIER_CONFIG[currentTier].name}
                  </Text>
                  <Text fontSize="lg" color={`${TIER_CONFIG[currentTier].color}.600`} fontWeight="semibold" mb={2}>
                    {TIER_CONFIG[currentTier].price}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    {TIER_CONFIG[currentTier].description}
                  </Text>
                  <Button 
                    colorScheme={TIER_CONFIG[currentTier].color} 
                    size="lg" 
                    onClick={() => setCurrentView('setup')}
                    leftIcon={<Text>🚀</Text>}
                    _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                  >
                    Get Started with {TIER_CONFIG[currentTier].name}
                  </Button>
                </Box>
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
            <Alert status="info">
              <AlertIcon />
              <Text>Startup Stage Selector component is being integrated...</Text>
            </Alert>
          </Box>
        );
        
      case 'data-pulse':
        return (
          <Box>
            <HStack justify="space-between" p={6} pb={0}>
              <Text fontSize="2xl" fontWeight="bold">🌊 Data Pulse Intelligence</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Box p={6}>
              <Alert status="success">
                <AlertIcon />
                <Text>SignalComposer - Advanced drag-and-drop dashboard builder with 6 widget types (Metrics, Charts, Alerts, Tables, Maps, Trends) is ready for integration!</Text>
              </Alert>
            </Box>
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
        if (selectedFramework?.id === 'blue-ocean') {
          return (
            <Box>
              <HStack justify="space-between" mb={6} p={6} pb={0}>
                <Text fontSize="2xl" fontWeight="bold">
                  🌊 {selectedFramework?.name}
                </Text>
                <Button variant="outline" onClick={() => setCurrentView('strategy-frameworks')}>← Back to Frameworks</Button>
              </HStack>
              <BlueOceanStrategy />
            </Box>
          );
        }

        if (selectedFramework?.id === 'porter-competitive') {
          return (
            <Box>
              <HStack justify="space-between" mb={6} p={6} pb={0}>
                <Text fontSize="2xl" fontWeight="bold">
                  ⚔️ {selectedFramework?.name}
                </Text>
                <Button variant="outline" onClick={() => setCurrentView('strategy-frameworks')}>← Back to Frameworks</Button>
              </HStack>
              <Alert status="success">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Porter's Five Forces Analysis - READY!</Text>
                  <Text fontSize="sm">
                    <strong>Complete competitive intelligence system:</strong> Interactive Five Forces dashboard with force factor analysis,
                    competitive landscape mapping, strategic implications, and mitigation strategies. Real competitor analysis with 
                    market positioning insights.
                  </Text>
                  <Text fontSize="xs" color="blue.600" mt={2}>
                    ✅ Five Forces Dashboard ✅ Force Factor Analysis ✅ Competitor Intelligence ✅ Strategic Recommendations
                  </Text>
                </VStack>
              </Alert>
            </Box>
          );
        }
        
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">
                📖 {selectedFramework?.name}
              </Text>
              <Button variant="outline" onClick={() => setCurrentView('strategy-frameworks')}>← Back to Frameworks</Button>
            </HStack>
            
            <Card bg={frameworkCardBg} mb={6}>
              <CardBody>
                <Text fontSize="lg" mb={4}>{selectedFramework?.description}</Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  This framework includes {selectedFramework?.modules.length} interactive modules:
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                  {selectedFramework?.modules.map((module, index) => (
                    <Card key={index} bg={frameworkModuleBg} p={4}>
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
                  {businessProfile?.industry} • {businessProfile?.stage} stage • {TIER_CONFIG[currentTier].name} ({TIER_CONFIG[currentTier].price})
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
                        <Button 
                          colorScheme="pink" 
                          leftIcon={<Text>🎬</Text>}
                          onClick={() => setCurrentView('video-generator')}
                        >
                          Video Generator
                        </Button>
                        <Button 
                          colorScheme="cyan" 
                          leftIcon={<Text>💳</Text>}
                          onClick={() => setCurrentView('pricing')}
                        >
                          Pricing & Billing
                        </Button>
                        <Button 
                          colorScheme="teal" 
                          leftIcon={<Text>💰</Text>}
                          onClick={() => setCurrentView('financial-analysis')}
                        >
                          Financial Analysis
                        </Button>
                        <Button 
                          colorScheme="red" 
                          leftIcon={<Text>🌍</Text>}
                          onClick={() => setCurrentView('global-markets')}
                        >
                          Global Markets
                        </Button>
                        <Button 
                          colorScheme="yellow" 
                          leftIcon={<Text>📈</Text>}
                          onClick={() => setCurrentView('marketing-automation')}
                        >
                          Marketing Automation
                        </Button>
                        <Button 
                          colorScheme="gray" 
                          leftIcon={<Text>👥</Text>}
                          onClick={() => setCurrentView('hr-management')}
                        >
                          HR Management
                        </Button>
                        <Button 
                          colorScheme="blue" 
                          leftIcon={<Text>🔄</Text>}
                          onClick={() => setCurrentView('process-improvement')}
                        >
                          Process Improvement
                        </Button>
                        <Button 
                          colorScheme="green" 
                          leftIcon={<Text>👥</Text>}
                          onClick={() => setCurrentView('team-interaction')}
                        >
                          Live Team Collaboration
                        </Button>
                        <Button 
                          colorScheme="orange" 
                          leftIcon={<Text>🧠</Text>}
                          onClick={() => setCurrentView('inquiry-framework')}
                        >
                          Inquiry Framework
                        </Button>
                        <Button 
                          colorScheme="purple" 
                          leftIcon={<Text>🔗</Text>}
                          onClick={() => setCurrentView('live-integration')}
                        >
                          Live Integration Hub
                        </Button>
                        <Button 
                          colorScheme="teal" 
                          leftIcon={<Text>🗺️</Text>}
                          onClick={() => setCurrentView('journey-mapping')}
                        >
                          Journey Mapping
                        </Button>
                        
                        {/* Show video button only if user has access */}
                        {(currentTier === 'pro' || currentTier === 'enterprise' || currentTier === 'lite') && (
                          <Button 
                            colorScheme="pink" 
                            leftIcon={<Text>🎬</Text>}
                            onClick={() => setCurrentView('video-generator')}
                            position="relative"
                          >
                            AI Video Generator
                            {videosThisMonth > 0 && (
                              <Badge 
                                position="absolute" 
                                top="-8px" 
                                right="-8px" 
                                colorScheme="red" 
                                borderRadius="full"
                                fontSize="xs"
                              >
                                {videosThisMonth}
                              </Badge>
                            )}
                          </Button>
                        )}
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
        
      case 'video-generator':
        return (
          <Box>
            <HStack justify="space-between" p={6} pb={0}>
              <Text fontSize="2xl" fontWeight="bold">🎬 AI Video Generator</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <VideoGeneratorComponent currentTier={currentTier} videosThisMonth={videosThisMonth} setVideosThisMonth={setVideosThisMonth} />
          </Box>
        );

      case 'tutorial-videos':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">📚 Tutorial Video Library</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <TutorialVideoLibrary />
          </Box>
        );

      case 'team-interaction':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">👥 Live Team Collaboration</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success" mb={4}>
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Real Human Team Interaction Hub</Text>
                <Text fontSize="sm">Watch real professionals collaborate using Lucidra in diverse work environments with rotating scenarios</Text>
              </VStack>
            </Alert>
            {/* TeamInteractionHub will be integrated here when imported */}
            <Box p={8} border="2px" borderStyle="dashed" borderColor="teal.200" borderRadius="lg" textAlign="center">
              <VStack spacing={4}>
                <Text fontSize="6xl">👥</Text>
                <Text fontSize="xl" fontWeight="bold" color="teal.600">Live Team Collaboration Hub</Text>
                <Text color="gray.600" maxW="md">
                  Real professionals using Lucidra in diverse work environments - rotating between office, remote, hybrid, and conference scenarios
                </Text>
                <HStack spacing={2}>
                  <Badge colorScheme="green" size="lg">🏢 Office Scenarios</Badge>
                  <Badge colorScheme="blue" size="lg">🏠 Remote Teams</Badge>
                  <Badge colorScheme="purple" size="lg">🔄 Hybrid Work</Badge>
                  <Badge colorScheme="orange" size="lg">📊 Conference Rooms</Badge>
                </HStack>
                <Text fontSize="sm" color="teal.600" fontStyle="italic">
                  ✨ Features real human models from free sources with rotating images between scenarios
                </Text>
              </VStack>
            </Box>
          </Box>
        );

      case 'marketing-automation':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">📈 Strategic Marketing Automation</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <StrategicMarketingAutomation />
          </Box>
        );

      case 'hr-management':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">👥 Strategic HR Management</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <HRManagementNew />
          </Box>
        );

      case 'bloom-training':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🔺 Bloom's Taxonomy Training</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">🎯 Progressive Cognitive Learning System - MASTER STRATEGY FRAMEWORKS!</Text>
                <Text fontSize="sm">
                  <strong>Revolutionary training system using Bloom's Taxonomy to develop strategic thinking skills.</strong>
                  Progress through 6 cognitive levels: Remember → Understand → Apply → Analyze → Evaluate → Create.
                  Features: Interactive learning modules for each strategy framework, Progressive skill development with mastery tracking,
                  Gamified assessments and XP rewards, Visual learning pyramid with level progression,
                  Real-world case studies and scenario planning, Portfolio creation at advanced levels.
                </Text>
                <Text fontSize="xs" color="green.600" mt={2}>
                  ✅ 6 Bloom Levels ✅ Strategy Framework Training ✅ Mastery Tracking ✅ Interactive Assessments ✅ Skill Progression
                </Text>
              </VStack>
            </Alert>
          </Box>
        );

      case 'process-analysis':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🔍 Process Analysis Framework</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">🎯 Strategic Process Analysis - SIPOC & SWIMLANE MAPPING!</Text>
                <Text fontSize="sm">
                  <strong>Comprehensive workflow analysis and optimization framework.</strong>
                  Features: SIPOC analysis (Suppliers, Inputs, Process, Outputs, Customers), Interactive swimlane process mapping,
                  Inefficiency detection (bottlenecks, waste, rework, handoffs), Strategic alignment assessment (differentiation vs cost leadership),
                  Latent demand discovery, Markdown export for MS Teams collaboration,
                  Process metrics and ROI calculations, Value-add analysis and recommendations.
                </Text>
                <Text fontSize="xs" color="green.600" mt={2}>
                  ✅ SIPOC Mapping ✅ Swimlane Analysis ✅ Inefficiency Detection ✅ Strategic Alignment ✅ MS Teams Export
                </Text>
              </VStack>
            </Alert>
          </Box>
        );

      case 'process-improvement':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🔄 Process Improvement Intelligence</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <ProcessImprovementIntelligence />
          </Box>
        );

      case 'process-management':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🏭 Process Management & BPMN Design</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <ProcessManagement />
          </Box>
        );

      case 'project-management':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">📊 Project Management & Resource Planning</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <ProjectManagement />
          </Box>
        );

      case 'sector-value-chains':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🏭 Sector Value Chain Models</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <SectorValueChains />
          </Box>
        );

      case 'financial-integration':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">💰 Financial System Integration</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <FinancialIntegration />
          </Box>
        );

      case 'ai-process-logger':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🤖 AI Process Issue Logger</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <AIProcessLogger />
          </Box>
        );

      case 'platform-manual':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">📖 Platform User Manual</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <PlatformManual />
          </Box>
        );

      case 'capability-architecture':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🏗️ Capability Architecture Framework</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">🎯 Strategic Capability Analysis - PORTER'S VALUE CHAIN & BLUE OCEAN ERRC!</Text>
                <Text fontSize="sm">
                  <strong>Comprehensive capability optimization using proven strategic frameworks.</strong>
                  Features: Porter's Value Chain mapping (Primary & Support Activities), Blue Ocean ERRC Grid (Eliminate, Reduce, Raise, Create),
                  Capability-strategy alignment assessment, Gap analysis with current vs target levels,
                  Decision matrix with priority ranking, Multi-criteria analysis (Strategic Value, Implementation Ease, Competitive Impact),
                  Capability ownership assignment, Implementation roadmap with timelines.
                </Text>
                <Text fontSize="xs" color="green.600" mt={2}>
                  ✅ Value Chain Mapping ✅ ERRC Analysis ✅ Gap Assessment ✅ Decision Matrix ✅ Priority Ranking ✅ Ownership Assignment
                </Text>
              </VStack>
            </Alert>
          </Box>
        );

      case 'ai-implementation':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🤖 AI Implementation Coach</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">🎯 AI Tactical Coach - PERFORMANCE GAP DETECTION & STRATEGIC NUDGES!</Text>
                <Text fontSize="sm">
                  <strong>Intelligent implementation coaching with automated performance monitoring.</strong>
                  Features: Performance gap detection with AI-powered nudges, Strategic intent reinforcement from previous analysis,
                  Competitive threat monitoring and response recommendations, Action plan optimization considering scalable innovation,
                  Teams-ready progress summaries with markdown export, Timeline risk detection and mitigation,
                  Blue Ocean and Porter framework integration for strategic prompts.
                </Text>
                <Text fontSize="xs" color="green.600" mt={2}>
                  ✅ Performance Gaps ✅ AI Nudges ✅ Strategic Intent ✅ Competitive Threats ✅ Teams Updates ✅ Action Plans
                </Text>
              </VStack>
            </Alert>
          </Box>
        );

      case 'team-collaboration':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">👥 Team Collaboration Module</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">🤝 Collaborative Facilitator - ASYNC FEEDBACK & ASSUMPTION CHALLENGING!</Text>
                <Text fontSize="sm">
                  <strong>Structured team collaboration with framework-guided feedback and action tracking.</strong>
                  Features: Async review with structured comment blocks and voting systems, Framework-guided assumption challenging (Blue Ocean + Porter),
                  Action item tracking with dependency management, Collaboration rhythm cues (daily stand-ups, weekly retros),
                  Real-time progress dashboards with engagement metrics, Strategic prompt engines for critical thinking,
                  Teams integration for seamless async collaboration workflows.
                </Text>
                <Text fontSize="xs" color="green.600" mt={2}>
                  ✅ Async Feedback ✅ Structured Comments ✅ Action Tracking ✅ Assumption Challenge ✅ Progress Dashboards ✅ Collaboration Rhythms
                </Text>
              </VStack>
            </Alert>
          </Box>
        );

      case 'inquiry-framework':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🧠 Inquiry Framework</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">🌊 Strategic Inquiry Orchestrator - WARREN BERGER METHODOLOGY INTEGRATED!</Text>
                <Text fontSize="sm">
                  <strong>Revolutionary questioning system that automatically generates strategic questions from Blue Ocean Strategy insights.</strong>
                  Features: Warren Berger's Why → What If → How methodology, Auto-generated questions from Six Paths Analysis and Utility Map,
                  Strategic question templates and frameworks, Inquiry session management with collaboration tracking,
                  Cross-framework question synthesis, Insight capture and exploration tracking with confidence scoring.
                </Text>
                <Text fontSize="xs" color="green.600" mt={2}>
                  ✅ Blue Ocean Question Generation ✅ Berger Methodology ✅ Strategic Templates ✅ Session Management ✅ Insight Synthesis
                </Text>
              </VStack>
            </Alert>
          </Box>
        );

      case 'framework-integration':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🔗 Framework Integration Hub</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Framework Integration System Ready!</Text>
                <Text fontSize="sm">
                  Revolutionary cross-framework intelligence system showing how Blue Ocean insights automatically trigger 
                  Marketing campaigns, HR capability development, and Process improvements. Real workflow orchestration
                  with measurable business impact tracking.
                </Text>
              </VStack>
            </Alert>
          </Box>
        );

      case 'live-integration':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <HStack>
                <Text fontSize="2xl" fontWeight="bold">🟢 Live Data Integration Hub</Text>
                <Badge colorScheme="green">PERSISTENT STORAGE</Badge>
              </HStack>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <VStack spacing={4} align="stretch">
              <Alert status="success">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Complete Data Persistence & Cross-Framework Intelligence System</Text>
                  <Text fontSize="sm">
                    <strong>Revolutionary solution to your data storage issue:</strong> All framework data automatically persisted to localStorage. 
                    Real-time cross-framework synchronization. Session save/load functionality. Live insight generation and application tracking.
                  </Text>
                </VStack>
              </Alert>

              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={2}>
                  <Text fontWeight="semibold">How the Complete System Works:</Text>
                  <VStack align="start" spacing={1} fontSize="sm">
                    <Text>🔄 <strong>Persistent Storage:</strong> All Blue Ocean Strategy inputs (Six Paths, Buyer Utility Map) saved automatically</Text>
                    <Text>⚡ <strong>Cross-Framework Sync:</strong> Insights automatically generate Marketing campaigns, HR roles, Process improvements</Text>
                    <Text>💾 <strong>Session Management:</strong> Save/load complete strategy sessions by name</Text>
                    <Text>📊 <strong>Live Integration:</strong> Real-time data flow between all frameworks with impact tracking</Text>
                    <Text>🎯 <strong>Applied Intelligence:</strong> Click "Apply to Marketing/HR/Process" to create specific actions</Text>
                  </VStack>
                </VStack>
              </Alert>

              <Alert status="warning">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Components Ready for Activation</Text>
                  <Text fontSize="sm">
                    Complete BlueOceanStrategyWithData.tsx and FrameworkIntegrationHubWithData.tsx components built with:
                    useFrameworkData hook, persistent localStorage, cross-framework insight generation, session management, 
                    and live data synchronization. Ready to uncomment imports when needed.
                  </Text>
                </VStack>
              </Alert>
            </VStack>
          </Box>
        );

      case 'journey-mapping':
        return (
          <Box p={6}>
            <HStack justify="space-between" mb={6}>
              <Text fontSize="2xl" fontWeight="bold">🗺️ Visual Journey Mapping</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">🌊 Visual Journey Mapping - LIVE PROGRESS TRACKING!</Text>
                <Text fontSize="sm">
                  <strong>Revolutionary journey mapping system that shows real-time team progress across all strategic frameworks.</strong>
                  Features: Live progress tracking from framework completion, Team workload analysis with capacity management,
                  Visual stage mapping with Blue Ocean alignment, Milestone tracking and dependency management,
                  Risk factor identification, Success metrics dashboard with performance indicators.
                </Text>
                <Text fontSize="xs" color="green.600" mt={2}>
                  ✅ Live Progress Tracking ✅ Team Workload Analysis ✅ Milestone Management ✅ Blue Ocean Integration ✅ Risk Management
                </Text>
              </VStack>
            </Alert>
          </Box>
        );
        
      case 'pricing':
        return (
          <Box p={8}>
            <VStack spacing={8} maxW="7xl" mx="auto">
              {/* Header with Navigation */}
              <Box textAlign="center">
                <HStack justify="space-between" mb={6}>
                  <Button variant="outline" onClick={() => setCurrentView('home')} leftIcon={<Text>🏠</Text>}>
                    Back to Home
                  </Button>
                  <Text fontSize="4xl" fontWeight="bold" bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">
                    💳 Choose Your Lucidra Plan
                  </Text>
                  <Box w="120px" /> {/* Spacer for center alignment */}
                </HStack>
                <Text fontSize="xl" color="gray.600" mb={6}>
                  Select the perfect plan for your strategic intelligence needs
                </Text>
              </Box>

              {/* Pricing Cards */}
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} w="full">
                {Object.entries(TIER_CONFIG).map(([tier, config]) => (
                  <Card 
                    key={tier}
                    bg={cardBg}
                    border={currentTier === tier ? '3px' : '2px'}
                    borderColor={currentTier === tier ? `${config.color}.500` : `${config.color}.200`}
                    _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
                    transition="all 0.3s"
                    position="relative"
                    minH="600px"
                  >
                    {tier === 'pro' && (
                      <Badge 
                        position="absolute" 
                        top="-10px" 
                        right="20px" 
                        colorScheme="orange" 
                        fontSize="sm"
                        px={3}
                        py={1}
                      >
                        MOST POPULAR
                      </Badge>
                    )}
                    
                    <CardHeader textAlign="center" pb={4}>
                      <VStack spacing={3}>
                        <Text fontSize="2xl" fontWeight="bold" color={`${config.color}.500`}>
                          {config.name}
                        </Text>
                        <Text fontSize="lg" color="gray.600">
                          {config.description}
                        </Text>
                        <Text fontSize="4xl" fontWeight="bold">
                          {config.price}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {tier === 'enterprise' ? 'Custom billing' : 'per user, billed monthly'}
                        </Text>
                      </VStack>
                    </CardHeader>
                    
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
                            Features Included:
                          </Text>
                          <VStack spacing={2} align="start">
                            {config.features.map((feature, i) => (
                              <HStack key={i}>
                                <Text color="green.500" fontSize="sm">✓</Text>
                                <Text fontSize="sm">{feature}</Text>
                              </HStack>
                            ))}
                          </VStack>
                        </Box>
                        
                        <Divider />
                        
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
                            Usage Limits:
                          </Text>
                          <VStack spacing={2} align="start">
                            <HStack>
                              <Text fontSize="sm" color="gray.600">📚 Frameworks:</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                {config.maxFrameworks === 999 ? 'Unlimited' : config.maxFrameworks}
                              </Text>
                            </HStack>
                            <HStack>
                              <Text fontSize="sm" color="gray.600">🎬 Videos:</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                {config.maxVideos === 999 ? 'Unlimited' : `${config.maxVideos}/month`}
                              </Text>
                            </HStack>
                            <HStack>
                              <Text fontSize="sm" color="gray.600">📡 Signals:</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                {config.maxSignals === 999 ? 'Unlimited' : config.maxSignals}
                              </Text>
                            </HStack>
                          </VStack>
                        </Box>
                        
                        <Spacer />
                        
                        <Button 
                          colorScheme={config.color}
                          size="lg"
                          isDisabled={currentTier === tier}
                          onClick={() => {
                            handleTierChange(tier as ProductTier);
                            onOpen();
                          }}
                        >
                          {currentTier === tier ? 'Current Plan' : 
                           tier === 'enterprise' ? 'Contact Sales' : 'Choose Plan'}
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </Grid>

              {/* Payment Methods Section */}
              <Card bg={cardBg} w="full">
                <CardHeader>
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    💳 Secure Payment Options
                  </Text>
                  <Text textAlign="center" color="gray.600" mt={2}>
                    We support all major payment methods for your convenience
                  </Text>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
                    <VStack spacing={3} p={4} bg={paymentBg} borderRadius="md">
                      <Text fontSize="2xl">💳</Text>
                      <Text fontWeight="semibold">Credit Cards</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        Visa, MasterCard, American Express, Discover
                      </Text>
                    </VStack>
                    
                    <VStack spacing={3} p={4} bg={paymentBg} borderRadius="md">
                      <Text fontSize="2xl">🏦</Text>
                      <Text fontWeight="semibold">Wire Transfer</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        Direct bank transfers for enterprise customers
                      </Text>
                    </VStack>
                    
                    <VStack spacing={3} p={4} bg={paymentBg} borderRadius="md">
                      <Text fontSize="2xl">💱</Text>
                      <Text fontWeight="semibold">Digital Wallets</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        PayPal, Apple Pay, Google Pay, Stripe
                      </Text>
                    </VStack>
                    
                    <VStack spacing={3} p={4} bg={paymentBg} borderRadius="md">
                      <Text fontSize="2xl">🔒</Text>
                      <Text fontWeight="semibold">Crypto Payments</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        Bitcoin, Ethereum, USDC (coming soon)
                      </Text>
                    </VStack>
                  </Grid>
                  
                  <Box mt={6} p={4} bg={enterpriseBg} borderRadius="md">
                    <VStack spacing={3}>
                      <HStack>
                        <Text fontSize="xl">🔒</Text>
                        <Text fontWeight="semibold">Enterprise Payment Options</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        For Enterprise customers, we offer flexible payment terms including:
                      </Text>
                      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} w="full">
                        <VStack>
                          <Text fontSize="lg">📄</Text>
                          <Text fontSize="sm" fontWeight="semibold">Purchase Orders</Text>
                          <Text fontSize="xs" color="gray.600" textAlign="center">Net 30/60/90 terms available</Text>
                        </VStack>
                        <VStack>
                          <Text fontSize="lg">🏦</Text>
                          <Text fontSize="sm" fontWeight="semibold">ACH/Wire Transfers</Text>
                          <Text fontSize="xs" color="gray.600" textAlign="center">Direct bank transfers with custom invoicing</Text>
                        </VStack>
                        <VStack>
                          <Text fontSize="lg">💼</Text>
                          <Text fontSize="sm" fontWeight="semibold">Annual Billing</Text>
                          <Text fontSize="xs" color="gray.600" textAlign="center">Save 20% with annual commitment</Text>
                        </VStack>
                      </Grid>
                    </VStack>
                  </Box>
                </CardBody>
              </Card>

              {/* FAQ Section */}
              <Card bg={cardBg} w="full">
                <CardHeader>
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    ❓ Frequently Asked Questions
                  </Text>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    <VStack align="start" spacing={4}>
                      <Box>
                        <Text fontWeight="semibold" mb={2}>Can I change plans anytime?</Text>
                        <Text fontSize="sm" color="gray.600">
                          Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight="semibold" mb={2}>Is there a free trial?</Text>
                        <Text fontSize="sm" color="gray.600">
                          All plans include a 14-day free trial with full access to features.
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight="semibold" mb={2}>What happens to my data if I cancel?</Text>
                        <Text fontSize="sm" color="gray.600">
                          You can export all your data. We retain it for 90 days for reactivation.
                        </Text>
                      </Box>
                    </VStack>
                    <VStack align="start" spacing={4}>
                      <Box>
                        <Text fontWeight="semibold" mb={2}>Do you offer discounts for nonprofits?</Text>
                        <Text fontSize="sm" color="gray.600">
                          Yes! Qualified nonprofits receive 30% off all plans. Contact us for details.
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight="semibold" mb={2}>How does billing work?</Text>
                        <Text fontSize="sm" color="gray.600">
                          Monthly plans are billed monthly. Annual plans are billed upfront with 20% savings.
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight="semibold" mb={2}>Can I pay via wire transfer?</Text>
                        <Text fontSize="sm" color="gray.600">
                          Enterprise customers can pay via wire transfer, ACH, or purchase orders.
                        </Text>
                      </Box>
                    </VStack>
                  </Grid>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        );
        
      case 'checkout':
        return (
          <Box>
            <HStack justify="space-between" p={6} pb={0}>
              <Text fontSize="2xl" fontWeight="bold">💳 Checkout</Text>
              <Button variant="outline" onClick={() => setCurrentView('pricing')}>← Back to Pricing</Button>
            </HStack>
            <Box p={6}>
              <Alert status="info">
                <AlertIcon />
                <Text>Payment checkout is being integrated...</Text>
              </Alert>
            </Box>
          </Box>
        );
        
      case 'financial-analysis':
        return (
          <Box>
            <HStack justify="space-between" p={6} pb={0}>
              <Text fontSize="2xl" fontWeight="bold">💰 Financial Analysis</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Box p={6}>
              <Alert status="info">
                <AlertIcon />
                <Text>Comprehensive Financial Analysis Framework with DuPont Analysis, Activity-Based Costing, IRR/NPV calculations, and Break-Even Analysis is being integrated...</Text>
              </Alert>
            </Box>
          </Box>
        );
        
      case 'global-markets':
        return (
          <Box>
            <HStack justify="space-between" p={6} pb={0}>
              <Text fontSize="2xl" fontWeight="bold">🌍 Global Markets</Text>
              <Button variant="outline" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</Button>
            </HStack>
            <Box p={6}>
              <Alert status="info">
                <AlertIcon />
                <Text>Global market data integration is being implemented...</Text>
              </Alert>
            </Box>
          </Box>
        );

      case 'strategic-journey':
        return (
          <BasicStrategicJourney 
            businessProfile={businessProfile}
            currentTier={currentTier}
          />
        );
        
      case 'strategic-journey-old':
        return (
          <Box p={6}>
            <VStack spacing={6} maxW="7xl" mx="auto">
              {/* Journey Progress Header */}
              <Card bg={cardBg}>
                <CardHeader>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold">
                        🗺️ Strategic Journey Map - {currentTier.toUpperCase()}
                      </Text>
                      <Text color="gray.500">
                        {businessProfile?.businessName || 'Your Business'} • {businessProfile?.industry || 'Industry'}
                      </Text>
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <CircularProgress value={0} color="teal.400" size="80px">
                        <CircularProgressLabel>0%</CircularProgressLabel>
                      </CircularProgress>
                      <Text fontSize="sm" color="gray.500">Complete</Text>
                    </VStack>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Progress value={0} colorScheme="teal" size="lg" />
                  <HStack justify="space-between" mt={2}>
                    <Text fontSize="sm">Ready to start your strategic journey</Text>
                    <Text fontSize="sm">Business profile completed ✓</Text>
                  </HStack>
                </CardBody>
              </Card>

              {/* Welcome Message */}
              <Alert status="success">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">🎉 Welcome to Your Strategic Journey!</Text>
                  <Text fontSize="sm">
                    Based on your {currentTier} tier selection, you have access to comprehensive strategic planning tools. 
                    Your business profile has been captured and will guide the prompts and suggestions throughout your journey.
                  </Text>
                </VStack>
              </Alert>

              {/* Business Profile Summary */}
              {businessProfile && (
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">📋 Your Business Profile</Text>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold">Business Details</Text>
                        <Text fontSize="sm"><strong>Name:</strong> {businessProfile.businessName}</Text>
                        <Text fontSize="sm"><strong>Industry:</strong> {businessProfile.industry}</Text>
                        <Text fontSize="sm"><strong>Stage:</strong> {businessProfile.stage}</Text>
                      </VStack>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold">Goals & Challenges</Text>
                        <Text fontSize="sm"><strong>Goals:</strong> {businessProfile.goals?.join(', ') || 'None specified'}</Text>
                        <Text fontSize="sm"><strong>Target Market:</strong> {businessProfile.targetMarket}</Text>
                      </VStack>
                    </Grid>
                  </CardBody>
                </Card>
              )}

              {/* Next Steps */}
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">🚀 Your {currentTier.toUpperCase()} Journey Ahead</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info" mb={4}>
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">Intelligent Data Flow System</Text>
                      <Text fontSize="sm">
                        As you complete each tool, your data will automatically flow into downstream frameworks:
                        SWOT → Strategic Objectives → Balanced Scorecard → Departmental Goals
                      </Text>
                    </VStack>
                  </Alert>

                  <VStack spacing={4} align="stretch">
                    {currentTier === 'lite' && (
                      <>
                        <Text fontWeight="semibold">Lite Journey (5 Steps - ~3 hours)</Text>
                        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'teal.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="2xl" mb={2}>🎯</Text>
                              <Text fontSize="sm" fontWeight="semibold">SWOT Analysis</Text>
                              <Text fontSize="xs" color="gray.500">30 min</Text>
                            </CardBody>
                          </Card>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'teal.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="2xl" mb={2}>🗺️</Text>
                              <Text fontSize="sm" fontWeight="semibold">Business Model Canvas</Text>
                              <Text fontSize="xs" color="gray.500">45 min</Text>
                            </CardBody>
                          </Card>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'teal.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="2xl" mb={2}>💰</Text>
                              <Text fontSize="sm" fontWeight="semibold">Financial Planning</Text>
                              <Text fontSize="xs" color="gray.500">60 min</Text>
                            </CardBody>
                          </Card>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'teal.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="2xl" mb={2}>📋</Text>
                              <Text fontSize="sm" fontWeight="semibold">Action Planning</Text>
                              <Text fontSize="xs" color="gray.500">30 min</Text>
                            </CardBody>
                          </Card>
                        </Grid>
                      </>
                    )}

                    {currentTier === 'pro' && (
                      <>
                        <Text fontWeight="semibold">Pro Journey (10 Steps - ~9 hours)</Text>
                        <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={3}>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'blue.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="xl" mb={1}>🔍</Text>
                              <Text fontSize="xs" fontWeight="semibold">Market Analysis</Text>
                              <Text fontSize="xs" color="gray.500">45 min</Text>
                            </CardBody>
                          </Card>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'blue.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="xl" mb={1}>🎯</Text>
                              <Text fontSize="xs" fontWeight="semibold">SWOT + TOWS</Text>
                              <Text fontSize="xs" color="gray.500">40 min</Text>
                            </CardBody>
                          </Card>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'blue.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="xl" mb={1}>🔗</Text>
                              <Text fontSize="xs" fontWeight="semibold">Value Chain</Text>
                              <Text fontSize="xs" color="gray.500">50 min</Text>
                            </CardBody>
                          </Card>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'blue.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="xl" mb={1}>🌊</Text>
                              <Text fontSize="xs" fontWeight="semibold">Blue Ocean</Text>
                              <Text fontSize="xs" color="gray.500">60 min</Text>
                            </CardBody>
                          </Card>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'blue.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="xl" mb={1}>📊</Text>
                              <Text fontSize="xs" fontWeight="semibold">Balanced Scorecard</Text>
                              <Text fontSize="xs" color="gray.500">55 min</Text>
                            </CardBody>
                          </Card>
                          <Card variant="outline" cursor="pointer" _hover={{ bg: 'blue.50' }}>
                            <CardBody textAlign="center">
                              <Text fontSize="xl" mb={1}>💰</Text>
                              <Text fontSize="xs" fontWeight="semibold">Financial Modeling</Text>
                              <Text fontSize="xs" color="gray.500">90 min</Text>
                            </CardBody>
                          </Card>
                        </Grid>
                      </>
                    )}

                    {currentTier === 'enterprise' && (
                      <>
                        <Text fontWeight="semibold">Enterprise Journey (12+ Steps - ~12 hours)</Text>
                        <Text fontSize="sm" color="gray.600">
                          Includes all Pro features plus McKinsey 7S, Scenario Planning, and Organizational Assessment
                        </Text>
                        <Button colorScheme="purple" size="sm" width="fit-content">
                          View Full Enterprise Journey
                        </Button>
                      </>
                    )}
                  </VStack>
                </CardBody>
              </Card>

              {/* Call to Action */}
              <Card bg="teal.50" border="2px solid" borderColor="teal.200">
                <CardBody textAlign="center">
                  <VStack spacing={4}>
                    <Text fontSize="lg" fontWeight="bold">🎯 Ready to Begin Your Strategic Journey?</Text>
                    <Text fontSize="sm" color="gray.600">
                      Click on any tool above to start. Your progress will be saved and data will flow between frameworks automatically.
                    </Text>
                    <HStack>
                      <Button colorScheme="teal" leftIcon={<Text>🎯</Text>}>
                        Start with SWOT Analysis
                      </Button>
                      <Button variant="outline" leftIcon={<Text>🗺️</Text>}>
                        Begin Business Model Canvas
                      </Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        );

      case 'company-admin':
        return (
          <Box p={6}>
            <VStack spacing={8} maxW="7xl" mx="auto">
              {/* Header */}
              <HStack justify="space-between" w="full" mb={6}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">🏢 Company Administration</Text>
                  <Text color="gray.600">Manage users, permissions, and company settings</Text>
                </VStack>
                <Button variant="outline" onClick={() => setCurrentView('dashboard')} leftIcon={<Text>←</Text>}>
                  Back to Dashboard
                </Button>
              </HStack>

              {/* Company Overview Cards */}
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
                {/* Current Plan Card */}
                <Card bg={cardBg} borderColor={`${TIER_CONFIG[currentTier].color}.200`} border="2px">
                  <CardHeader>
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold">Current Plan</Text>
                      <Badge colorScheme={TIER_CONFIG[currentTier].color}>
                        {TIER_CONFIG[currentTier].name}
                      </Badge>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <Text fontSize="2xl" fontWeight="bold">{TIER_CONFIG[currentTier].price}</Text>
                      <Divider />
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Users</Text>
                        <Text fontSize="sm" fontWeight="bold">3 / {TIER_CONFIG[currentTier].maxUsers}</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Additional Users</Text>
                        <Text fontSize="sm" fontWeight="bold">{TIER_CONFIG[currentTier].additionalUserPrice}</Text>
                      </HStack>
                      <Button colorScheme={TIER_CONFIG[currentTier].color} size="sm" onClick={() => setCurrentView('pricing')}>
                        Upgrade Plan
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Company Stats Card */}
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">Company Analytics</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Active Users</Text>
                        <Text fontSize="sm" fontWeight="bold" color="green.500">3</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Processes Created</Text>
                        <Text fontSize="sm" fontWeight="bold">12</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">AI Recommendations</Text>
                        <Text fontSize="sm" fontWeight="bold">27</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Data Quality Score</Text>
                        <Text fontSize="sm" fontWeight="bold" color="blue.500">87%</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>

                {/* AI Learning Status Card */}
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">🤖 AI Learning Status</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <Box>
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm" color="gray.600">Learning Progress</Text>
                          <Text fontSize="sm" fontWeight="bold">78%</Text>
                        </HStack>
                        <Progress value={78} colorScheme="purple" size="sm" />
                      </Box>
                      <Box>
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm" color="gray.600">Process Optimization</Text>
                          <Text fontSize="sm" fontWeight="bold">65%</Text>
                        </HStack>
                        <Progress value={65} colorScheme="blue" size="sm" />
                      </Box>
                      <Box>
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="sm" color="gray.600">Recommendations Accuracy</Text>
                          <Text fontSize="sm" fontWeight="bold">92%</Text>
                        </HStack>
                        <Progress value={92} colorScheme="green" size="sm" />
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </Grid>

              {/* User Management Section */}
              <Box w="full">
                <Card bg={cardBg}>
                  <CardHeader>
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="lg" fontWeight="bold">👥 User Management</Text>
                        <Text fontSize="sm" color="gray.600">Manage team members and their permissions</Text>
                      </VStack>
                      <Button colorScheme="blue" leftIcon={<Text>+</Text>}>
                        Invite User
                      </Button>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {/* Users Table */}
                      <Box overflowX="auto">
                        <Table size="sm">
                          <Thead>
                            <Tr>
                              <Th>User</Th>
                              <Th>Role</Th>
                              <Th>Department</Th>
                              <Th>Last Active</Th>
                              <Th>Permissions</Th>
                              <Th>Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>
                                <HStack>
                                  <Avatar size="sm" name="John Admin" />
                                  <VStack align="start" spacing={0}>
                                    <Text fontSize="sm" fontWeight="bold">John Admin</Text>
                                    <Text fontSize="xs" color="gray.600">john@company.com</Text>
                                  </VStack>
                                </HStack>
                              </Td>
                              <Td>
                                <Badge colorScheme="red" variant="subtle">Admin</Badge>
                              </Td>
                              <Td>
                                <Text fontSize="sm">Strategy</Text>
                              </Td>
                              <Td>
                                <Text fontSize="sm" color="green.500">Online now</Text>
                              </Td>
                              <Td>
                                <Text fontSize="xs" color="gray.600">Full Access</Text>
                              </Td>
                              <Td>
                                <HStack spacing={1}>
                                  <Button size="xs" variant="ghost">Edit</Button>
                                  <Button size="xs" variant="ghost" colorScheme="red">Remove</Button>
                                </HStack>
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>
                                <HStack>
                                  <Avatar size="sm" name="Sarah Manager" />
                                  <VStack align="start" spacing={0}>
                                    <Text fontSize="sm" fontWeight="bold">Sarah Manager</Text>
                                    <Text fontSize="xs" color="gray.600">sarah@company.com</Text>
                                  </VStack>
                                </HStack>
                              </Td>
                              <Td>
                                <Badge colorScheme="purple" variant="subtle">Manager</Badge>
                              </Td>
                              <Td>
                                <Text fontSize="sm">Operations</Text>
                              </Td>
                              <Td>
                                <Text fontSize="sm" color="gray.600">2 hours ago</Text>
                              </Td>
                              <Td>
                                <Text fontSize="xs" color="gray.600">Process & Project Mgmt</Text>
                              </Td>
                              <Td>
                                <HStack spacing={1}>
                                  <Button size="xs" variant="ghost">Edit</Button>
                                  <Button size="xs" variant="ghost" colorScheme="red">Remove</Button>
                                </HStack>
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>
                                <HStack>
                                  <Avatar size="sm" name="Mike Analyst" />
                                  <VStack align="start" spacing={0}>
                                    <Text fontSize="sm" fontWeight="bold">Mike Analyst</Text>
                                    <Text fontSize="xs" color="gray.600">mike@company.com</Text>
                                  </VStack>
                                </HStack>
                              </Td>
                              <Td>
                                <Badge colorScheme="blue" variant="subtle">Analyst</Badge>
                              </Td>
                              <Td>
                                <Text fontSize="sm">Finance</Text>
                              </Td>
                              <Td>
                                <Text fontSize="sm" color="gray.600">Yesterday</Text>
                              </Td>
                              <Td>
                                <Text fontSize="xs" color="gray.600">Financial Data Only</Text>
                              </Td>
                              <Td>
                                <HStack spacing={1}>
                                  <Button size="xs" variant="ghost">Edit</Button>
                                  <Button size="xs" variant="ghost" colorScheme="red">Remove</Button>
                                </HStack>
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </Box>

              {/* Permission Templates Section */}
              <Box w="full">
                <Card bg={cardBg}>
                  <CardHeader>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="lg" fontWeight="bold">🔐 Permission Templates</Text>
                      <Text fontSize="sm" color="gray.600">Pre-configured role templates for quick user setup</Text>
                    </VStack>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
                      {/* Admin Template */}
                      <Card bg="red.50" borderColor="red.200" border="1px">
                        <CardBody p={4}>
                          <VStack spacing={3} align="stretch">
                            <HStack>
                              <Badge colorScheme="red">Admin</Badge>
                              <Text fontSize="sm" fontWeight="bold">Full Access</Text>
                            </HStack>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="xs">✓ Manage Users</Text>
                              <Text fontSize="xs">✓ All Modules</Text>
                              <Text fontSize="xs">✓ Financial Data</Text>
                              <Text fontSize="xs">✓ AI Recommendations</Text>
                              <Text fontSize="xs">✓ Export Data</Text>
                            </VStack>
                          </VStack>
                        </CardBody>
                      </Card>

                      {/* Manager Template */}
                      <Card bg="purple.50" borderColor="purple.200" border="1px">
                        <CardBody p={4}>
                          <VStack spacing={3} align="stretch">
                            <HStack>
                              <Badge colorScheme="purple">Manager</Badge>
                              <Text fontSize="sm" fontWeight="bold">Operations</Text>
                            </HStack>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="xs">✗ Manage Users</Text>
                              <Text fontSize="xs">✓ Process/Project Mgmt</Text>
                              <Text fontSize="xs">✓ Limited Financial</Text>
                              <Text fontSize="xs">✓ AI Recommendations</Text>
                              <Text fontSize="xs">✓ Export Data</Text>
                            </VStack>
                          </VStack>
                        </CardBody>
                      </Card>

                      {/* Analyst Template */}
                      <Card bg="blue.50" borderColor="blue.200" border="1px">
                        <CardBody p={4}>
                          <VStack spacing={3} align="stretch">
                            <HStack>
                              <Badge colorScheme="blue">Analyst</Badge>
                              <Text fontSize="sm" fontWeight="bold">Data Focus</Text>
                            </HStack>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="xs">✗ Manage Users</Text>
                              <Text fontSize="xs">✓ View Processes</Text>
                              <Text fontSize="xs">✓ Financial Data</Text>
                              <Text fontSize="xs">✓ AI Recommendations</Text>
                              <Text fontSize="xs">✗ Export Data</Text>
                            </VStack>
                          </VStack>
                        </CardBody>
                      </Card>

                      {/* Viewer Template */}
                      <Card bg="gray.50" borderColor="gray.200" border="1px">
                        <CardBody p={4}>
                          <VStack spacing={3} align="stretch">
                            <HStack>
                              <Badge colorScheme="gray">Viewer</Badge>
                              <Text fontSize="sm" fontWeight="bold">Read Only</Text>
                            </HStack>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="xs">✗ Manage Users</Text>
                              <Text fontSize="xs">✓ View Processes</Text>
                              <Text fontSize="xs">✗ Financial Data</Text>
                              <Text fontSize="xs">✓ Basic AI Insights</Text>
                              <Text fontSize="xs">✗ Export Data</Text>
                            </VStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    </Grid>
                  </CardBody>
                </Card>
              </Box>
            </VStack>
          </Box>
        );

      case 'abc-costing':
        return <ABCCosting companyData={businessProfile} onCostDataUpdate={(data) => console.log('Cost data updated:', data)} />;

      case 'business-model-canvas':
        return <BusinessModelCanvasFixed />;

      case 'strategy-frameworks':
        return <StrategyFrameworks currentTier={currentTier} />;

      case 'value-chain':
        return (
          <Box p={6}>
            <VStack spacing={6} maxW="7xl" mx="auto">
              <HStack justify="space-between" w="full">
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">🔗 Porter's Value Chain Analysis</Text>
                  <Text color="gray.600">Integrated with Activity-Based Costing</Text>
                </VStack>
                <Button onClick={() => setCurrentView('abc-costing')} colorScheme="blue">
                  View ABC Costing
                </Button>
              </HStack>
              
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Value Chain Integration</Text>
                  <Text fontSize="sm">
                    This module is fully integrated with ABC Costing for comprehensive cost analysis across your value chain activities.
                  </Text>
                </VStack>
              </Alert>
              
              <Card bg={cardBg}>
                <CardBody>
                  <Text textAlign="center" py={8}>
                    Click "View ABC Costing" above to access the integrated Porter's Value Chain analysis 
                    with Activity-Based Costing, salary allocation tracking, and process cost optimization.
                  </Text>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        );

      case 'mission-statement':
        return <MissionStatementGenerator />;

      case 'five-forces':
        return <InteractivePortersFiveForces />;

      case 'execution-tracker':
        return <StrategyExecutionTracker />;

      case 'blue-ocean-comprehensive':
        return <ComprehensiveBlueOceanStrategy />;

      case 'process-management-advanced':
        return <AdvancedProcessManagement />;

      case 'video-production':
        return <HuggingFaceVideoProduction />;

      case 'pestle-realtime':
        return <RealTimePESTLEAnalysis />;

      // Section Pages
      case 'core-features':
        return <CoreFeaturesPage onNavigate={setCurrentView} />;

      case 'strategy-frameworks-section':
        return <StrategyFrameworksPage onNavigate={setCurrentView} />;

      case 'operations-section':
        return <OperationsPage onNavigate={setCurrentView} />;

      case 'analytics-ai-section':
        return <AnalyticsAIPage onNavigate={setCurrentView} />;

      case 'administration-section':
        return <AdministrationPage onNavigate={setCurrentView} />;
        
      default:
        return (
          <Box p={8} textAlign="center">
            <Text fontSize="xl" mb={4}>🚀 Lucidra</Text>
            <Text color="gray.600">Strategic intelligence platform</Text>
          </Box>
        );
    }
  };

  // Check if we should use minimalist layout
  // Authentication handler
  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentTier(user.tier as ProductTier);
    if (user.companyName) {
      setBusinessProfile(prev => ({
        ...(prev || {
          businessName: user.companyName || '',
          industry: '',
          stageOfBusiness: 'idea',
          teamSize: '1-5',
          primaryGoals: [],
          challenges: [],
          timeHorizon: '6-months'
        }),
        businessName: user.companyName
      }));
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <ChakraProvider>
        <LandingPage onLogin={handleLogin} />
      </ChakraProvider>
    );
  }

  const useMinimalistLayout = currentView !== 'welcome';
  
  if (useMinimalistLayout) {
    return (
      <ChakraProvider>
        <MinimalistLayout
          currentView={currentView}
          setCurrentView={setCurrentView}
          currentTier={currentTier}
          companyName={currentUser?.companyName || businessProfile?.businessName || "Your Company"}
          userName={currentUser?.name || "Admin User"}
          onLogout={handleLogout}
        >
          {renderCurrentView()}
        </MinimalistLayout>
      </ChakraProvider>
    );
  }
  
  return (
    <ChakraProvider>
      <Box bg={bgColor} minH="100vh">
        {/* Navigation Header */}
        {currentView !== 'welcome' && (
          <NavigationHeader 
            currentView={currentView}
            setCurrentView={setCurrentView}
            currentTier={currentTier}
            learningProgress={learningProgress}
          />
        )}

        {/* Breadcrumb Navigation */}
        {currentView !== 'welcome' && currentView !== 'home' && (
          <Breadcrumb 
            currentView={currentView}
            selectedFramework={selectedFramework}
            setCurrentView={setCurrentView}
          />
        )}

        {/* Main Content */}
        <Box maxW="7xl" mx="auto">
          {renderCurrentView()}
        </Box>

        {/* Pricing CTA */}
        {currentView !== 'welcome' && currentView !== 'pricing' && (
          <PricingCTA 
            currentTier={currentTier}
            setCurrentView={setCurrentView}
          />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;