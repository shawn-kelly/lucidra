import React, { useState, Suspense } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Spacer,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
  Spinner,
  Center
} from '@chakra-ui/react';

// Core working components - always loaded
import MissionStatementGenerator from './components/MissionStatementGenerator';
import InteractivePortersFiveForces from './components/InteractivePortersFiveForces';
import StrategyExecutionTracker from './components/StrategyExecutionTracker';
import BusinessModelCanvasFixed from './components/BusinessModelCanvasFixed';
import VisualProcessArchitect from './components/VisualProcessArchitect';
import ComprehensivePortersFiveForces from './components/ComprehensivePortersFiveForces';
import ComprehensiveSWOTAnalysis from './components/ComprehensiveSWOTAnalysis';

// Lazy load component chunks to optimize build and runtime performance
const ChunkStrategy = React.lazy(() => import('./components/ComprehensiveBlueOceanStrategy'));
const ChunkDataPulse = React.lazy(() => import('./components/DataPulseWidget'));
const ChunkStartupStages = React.lazy(() => import('./components/StartupStageSelector'));
const ChunkStrategyFrameworks = React.lazy(() => import('./components/StrategyFrameworks'));
const ChunkFinancialFrameworks = React.lazy(() => import('./components/FinancialFrameworks'));
const ChunkFrameworkHub = React.lazy(() => import('./components/FrameworkIntegrationHubWithData'));
const ChunkSignalComposer = React.lazy(() => import('./components/SignalComposer'));
const ChunkMarketingAutomation = React.lazy(() => import('./components/StrategicMarketingAutomation'));
const ChunkHRModule = React.lazy(() => import('./components/EnhancedHRModule'));
const ChunkVideoLibrary = React.lazy(() => import('./components/TutorialVideoLibrary'));
const ChunkVideoProduction = React.lazy(() => import('./components/HuggingFaceVideoProduction'));

// Advanced Process Management Chunks
const ChunkAdvancedProcess = React.lazy(() => import('./components/AdvancedProcessManagement'));
const ChunkProcessManagement = React.lazy(() => import('./components/QuantumLeapProcessManagement'));
const ChunkProcessImprovement = React.lazy(() => import('./components/ProcessImprovement'));
const ChunkProcessAnalysis = React.lazy(() => import('./components/ProcessAnalysisFramework'));

// Mutation System Components (chunked for optimal performance)
const ChunkMutationEngine = React.lazy(() => import('./components/MutationEngine'));
const ChunkCollaborativeMutations = React.lazy(() => import('./components/CollaborativeMutationTracker'));
const ChunkMutationHistory = React.lazy(() => import('./components/MutationHistoryManager'));
const ChunkMutationAnalytics = React.lazy(() => import('./components/MutationAnalytics'));
const ChunkMutableBlueOcean = React.lazy(() => import('./components/MutableBlueOceanStrategy'));
const ChunkMutablePorter = React.lazy(() => import('./components/MutablePortersFiveForces'));
const ChunkMutableBPMN = React.lazy(() => import('./components/MutableBPMNEngine'));
const ChunkProjectManagement = React.lazy(() => import('./components/ProjectManagement'));
const ChunkTeamCollaboration = React.lazy(() => import('./components/TeamCollaboration'));
const ChunkTeamInteraction = React.lazy(() => import('./components/TeamInteractionHub'));
const ChunkAIProcessLogger = React.lazy(() => import('./components/AIProcessLogger'));
const ChunkOrganizationProcess = React.lazy(() => import('./components/OrganizationWideProcessManagement'));

// Strategic Components Chunks
const ChunkStrategicPlanning = React.lazy(() => import('./components/StrategicPlanningModule'));
const ChunkStrategicJourney = React.lazy(() => import('./components/StrategicJourneyMap'));
const ChunkVisualMapping = React.lazy(() => import('./components/VisualJourneyMapping'));
const ChunkOrgChart = React.lazy(() => import('./components/OrganizationalChartSystem'));
const ChunkFinancialAnalysis = React.lazy(() => import('./components/ComprehensiveFinancialAnalysis'));
const ChunkSWOTAnalysis = React.lazy(() => import('./components/LiveSWOTAnalysis'));
const ChunkPESTLEAnalysis = React.lazy(() => import('./components/RealTimePESTLEAnalysis'));

// Advanced Infrastructure Chunks
const ChunkEnhancedFrameworkHub = React.lazy(() => import('./components/EnhancedFrameworkHub'));
const ChunkHealthMonitor = React.lazy(() => import('./components/LucidraHealthMonitor'));
const ChunkIntegratedPlatform = React.lazy(() => import('./components/IntegratedStrategicPlatform'));
const ChunkAIScenarioEngine = React.lazy(() => import('./components/AIScenarioEngine'));
const ChunkStrategicIntelligence = React.lazy(() => import('./components/StrategicIntelligenceHub'));

// Loading component for chunked components
const ChunkLoadingSpinner = () => (
  <Center p={8}>
    <VStack spacing={4}>
      <Spinner size="xl" color="blue.500" thickness="4px" />
      <Text fontSize="sm" color="gray.600">Loading module...</Text>
    </VStack>
  </Center>
);

function App(): JSX.Element {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userTier] = useState('pro'); // Default to pro for demo
  const [currentUser] = useState('demo-user-123'); // Demo user ID
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Mobile menu categories
  const menuCategories = [
    {
      title: "🎯 Strategy & Planning",
      color: "blue.500",
      items: [
        { id: 'mission', name: 'Mission Generator', icon: '🎯', desc: 'AI-powered mission statements' },
        { id: 'blue-ocean', name: 'Blue Ocean Strategy', icon: '🌊', desc: 'Uncontested market space' },
        { id: 'enhanced-blue-ocean', name: 'Enhanced Blue Ocean', icon: '🌊', desc: 'Advanced Blue Ocean Workshop' },
        { id: 'strategy-frameworks', name: 'Strategy Frameworks', icon: '📚', desc: 'Complete framework library' },
        { id: 'strategic-planning', name: 'Strategic Planning', icon: '🗺️', desc: 'Comprehensive planning' },
        { id: 'strategic-journey', name: 'Strategic Journey', icon: '🛣️', desc: 'Journey mapping system' },
        { id: 'visual-mapping', name: 'Visual Mapping', icon: '🗺️', desc: 'Visual journey mapping' },
        { id: 'strategic-integration', name: 'Strategic Integration Hub', icon: '🎯', desc: 'Unified strategy, HR & process planning' }
      ]
    },
    {
      title: "🔄 Process Management",
      color: "purple.500",
      items: [
        { id: 'organization-process', name: 'Organization-Wide Process', icon: '🌐', desc: 'Complete organizational process coordination' },
        { id: 'visual-process-architect', name: 'Visual Process Architect', icon: '🎨', desc: 'Advanced visual process designer with BPMN modeling' },
        { id: 'process-management', name: 'Process Management', icon: '🔄', desc: 'BPMN process design' },
        { id: 'advanced-process', name: 'Advanced Process', icon: '🏭', desc: 'AI process optimization' },
        { id: 'enhanced-process', name: 'Enhanced Process Management', icon: '⚙️', desc: 'Complete process intelligence suite' },
        { id: 'process-improvement', name: 'Process Intelligence', icon: '⚙️', desc: 'Intelligent optimization' },
        { id: 'process-analysis', name: 'Process Analysis', icon: '📊', desc: 'Analysis framework' },
        { id: 'ai-process-logger', name: 'AI Process Logger', icon: '🤖', desc: 'Automated logging' }
      ]
    },
    {
      title: "📊 Analysis & Intelligence",
      color: "orange.500",
      items: [
        { id: 'data-pulse', name: 'Data Pulse Intelligence', icon: '📊', desc: 'Real-time market signals' },
        { id: 'porter', name: 'Porter Five Forces', icon: '🏢', desc: 'Industry analysis' },
        { id: 'financial', name: 'Financial Analysis', icon: '💰', desc: 'Financial frameworks' },
        { id: 'comprehensive-financial', name: 'Comprehensive Financial', icon: '📈', desc: 'Advanced financial tools' },
        { id: 'swot-analysis', name: 'SWOT Analysis', icon: '⚖️', desc: 'Live SWOT analysis' },
        { id: 'pestle-analysis', name: 'PESTLE Analysis', icon: '🌍', desc: 'Real-time PESTLE' }
      ]
    },
    {
      title: "🧬 Mutation System",
      color: "purple.500",
      items: [
        { id: 'mutation-engine', name: 'Mutation Engine', icon: '⚙️', desc: 'Core mutation system with autonomous evolution' },
        { id: 'collaborative-mutations', name: 'Collaborative Mutations', icon: '🤝', desc: 'Team-based mutation tracking' },
        { id: 'mutation-history', name: 'Mutation History', icon: '⏱️', desc: 'Undo/redo with branching support' },
        { id: 'mutation-analytics', name: 'Mutation Analytics', icon: '📊', desc: 'Analytics and insights dashboard' },
        { id: 'mutable-blue-ocean', name: 'Mutable Blue Ocean', icon: '🌊', desc: 'Dynamic Blue Ocean mutations' },
        { id: 'mutable-porter', name: 'Mutable Porter Forces', icon: '🏢', desc: 'Dynamic competitive analysis' },
        { id: 'mutable-bpmn', name: 'Mutable BPMN', icon: '🔄', desc: 'Process mutation engine' }
      ]
    },
    {
      title: "👥 Operations & Team",
      color: "cyan.500",
      items: [
        { id: 'project-management', name: 'Project Management', icon: '📋', desc: 'Complete project system' },
        { id: 'team-collaboration', name: 'Team Collaboration', icon: '👥', desc: 'Collaboration tools' },
        { id: 'team-interaction', name: 'Team Hub', icon: '🤝', desc: 'Team interaction system' },
        { id: 'org-chart', name: 'Organization Chart', icon: '🏢', desc: 'Org chart system' },
        { id: 'hr-module', name: 'HR Management', icon: '👥', desc: 'Enhanced HR system' }
      ]
    },
    {
      title: "🛠️ Tools & Resources",
      color: "green.500",
      items: [
        { id: 'marketing-automation', name: 'Marketing Automation', icon: '📧', desc: 'Strategic marketing' },
        { id: 'startup-stage', name: 'Startup Stages', icon: '🚀', desc: 'Stage-based guidance' },
        { id: 'execution', name: 'Execution Tracker', icon: '📈', desc: 'Strategy implementation' },
        { id: 'canvas', name: 'Business Model Canvas', icon: '📋', desc: 'Visual business planning' },
        { id: 'tutorials', name: 'Tutorial Library', icon: '🎓', desc: 'Video tutorial system' },
        { id: 'video', name: 'AI Video Production', icon: '🎥', desc: 'Generate strategy videos' }
      ]
    },
    {
      title: "🚀 Advanced Infrastructure",
      color: "purple.500",
      items: [
        { id: 'framework-hub', name: 'Enhanced Framework Hub', icon: '🚀', desc: 'Advanced framework management' },
        { id: 'ai-scenarios', name: 'AI Scenario Engine', icon: '🤖', desc: 'Cross-framework AI scenarios' },
        { id: 'intelligence-hub', name: 'Strategic Intelligence', icon: '🧠', desc: 'Real-time strategic insights' },
        { id: 'signal-composer', name: 'Signal Composer', icon: '📊', desc: 'Custom intelligence dashboards' }
      ]
    }
  ];

  // Breadcrumb items
  const getBreadcrumbItems = () => {
    const items = [{ label: 'Dashboard', view: 'dashboard', icon: '🏠' }];
    
    switch (currentView) {
      case 'mission':
        items.push({ label: 'Mission Generator', view: 'mission', icon: '🎯' });
        break;
      case 'blue-ocean':
        items.push({ label: 'Blue Ocean Strategy', view: 'blue-ocean', icon: '🌊' });
        break;
      case 'enhanced-blue-ocean':
        items.push({ label: 'Enhanced Blue Ocean', view: 'enhanced-blue-ocean', icon: '🌊' });
        break;
      case 'strategy-frameworks':
        items.push({ label: 'Strategy Frameworks', view: 'strategy-frameworks', icon: '📚' });
        break;
      case 'strategic-planning':
        items.push({ label: 'Strategic Planning', view: 'strategic-planning', icon: '🗺️' });
        break;
      case 'strategic-journey':
        items.push({ label: 'Strategic Journey', view: 'strategic-journey', icon: '🛣️' });
        break;
      case 'visual-mapping':
        items.push({ label: 'Visual Mapping', view: 'visual-mapping', icon: '🗺️' });
        break;
      case 'organization-process':
        items.push({ label: 'Organization-Wide Process', view: 'organization-process', icon: '🌐' });
        break;
      case 'visual-process-architect':
        items.push({ label: 'Visual Process Architect', view: 'visual-process-architect', icon: '🎨' });
        break;
      case 'process-management':
        items.push({ label: 'Process Management', view: 'process-management', icon: '🔄' });
        break;
      case 'advanced-process':
        items.push({ label: 'Advanced Process', view: 'advanced-process', icon: '🏭' });
        break;
      case 'enhanced-process':
        items.push({ label: 'Enhanced Process Management', view: 'enhanced-process', icon: '⚙️' });
        break;
      case 'process-improvement':
        items.push({ label: 'Process Intelligence', view: 'process-improvement', icon: '⚙️' });
        break;
      case 'process-analysis':
        items.push({ label: 'Process Analysis', view: 'process-analysis', icon: '📊' });
        break;
      case 'ai-process-logger':
        items.push({ label: 'AI Process Logger', view: 'ai-process-logger', icon: '🤖' });
        break;
      case 'data-pulse':
        items.push({ label: 'Data Pulse', view: 'data-pulse', icon: '📊' });
        break;
      case 'porter':
        items.push({ label: 'Five Forces', view: 'porter', icon: '🏢' });
        break;
      case 'financial':
        items.push({ label: 'Financial Analysis', view: 'financial', icon: '💰' });
        break;
      case 'comprehensive-financial':
        items.push({ label: 'Comprehensive Financial', view: 'comprehensive-financial', icon: '📈' });
        break;
      case 'swot-analysis':
        items.push({ label: 'SWOT Analysis', view: 'swot-analysis', icon: '⚖️' });
        break;
      case 'pestle-analysis':
        items.push({ label: 'PESTLE Analysis', view: 'pestle-analysis', icon: '🌍' });
        break;
      case 'project-management':
        items.push({ label: 'Project Management', view: 'project-management', icon: '📋' });
        break;
      case 'team-collaboration':
        items.push({ label: 'Team Collaboration', view: 'team-collaboration', icon: '👥' });
        break;
      case 'team-interaction':
        items.push({ label: 'Team Hub', view: 'team-interaction', icon: '🤝' });
        break;
      case 'org-chart':
        items.push({ label: 'Organization Chart', view: 'org-chart', icon: '🏢' });
        break;
      case 'marketing-automation':
        items.push({ label: 'Marketing Automation', view: 'marketing-automation', icon: '📧' });
        break;
      case 'startup-stage':
        items.push({ label: 'Startup Stages', view: 'startup-stage', icon: '🚀' });
        break;
      case 'hr-module':
        items.push({ label: 'HR Management', view: 'hr-module', icon: '👥' });
        break;
      case 'health-monitor':
        items.push({ label: 'System Health', view: 'health-monitor', icon: '🏥' });
        break;
      case 'integrated-platform':
        items.push({ label: 'Integrated Platform', view: 'integrated-platform', icon: '🔗' });
        break;
      case 'execution':
        items.push({ label: 'Execution Tracker', view: 'execution', icon: '📈' });
        break;
      case 'canvas':
        items.push({ label: 'Business Model', view: 'canvas', icon: '📋' });
        break;
      case 'tutorials':
        items.push({ label: 'Video Tutorials', view: 'tutorials', icon: '🎓' });
        break;
      case 'video':
        items.push({ label: 'AI Video', view: 'video', icon: '🎥' });
        break;
      case 'framework-hub':
        items.push({ label: 'Enhanced Framework Hub', view: 'framework-hub', icon: '🚀' });
        break;
      case 'ai-scenarios':
        items.push({ label: 'AI Scenario Engine', view: 'ai-scenarios', icon: '🤖' });
        break;
      case 'intelligence-hub':
        items.push({ label: 'Strategic Intelligence', view: 'intelligence-hub', icon: '🧠' });
        break;
      case 'signal-composer':
        items.push({ label: 'Signal Composer', view: 'signal-composer', icon: '📊' });
        break;
      
      // Mutation System Breadcrumbs
      case 'mutation-engine':
        items.push({ label: 'Mutation Engine', view: 'mutation-engine', icon: '⚙️' });
        break;
      case 'collaborative-mutations':
        items.push({ label: 'Collaborative Mutations', view: 'collaborative-mutations', icon: '🤝' });
        break;
      case 'mutation-history':
        items.push({ label: 'Mutation History', view: 'mutation-history', icon: '⏱️' });
        break;
      case 'mutation-analytics':
        items.push({ label: 'Mutation Analytics', view: 'mutation-analytics', icon: '📊' });
        break;
      case 'mutable-blue-ocean':
        items.push({ label: 'Mutable Blue Ocean', view: 'mutable-blue-ocean', icon: '🌊' });
        break;
      case 'mutable-porter':
        items.push({ label: 'Mutable Porter Forces', view: 'mutable-porter', icon: '🏢' });
        break;
      case 'mutable-bpmn':
        items.push({ label: 'Mutable BPMN', view: 'mutable-bpmn', icon: '🔄' });
        break;
    }
    
    return items;
  };

  // Mobile navigation handlers
  const handleMobileMenuSelect = (viewId: string) => {
    setCurrentView(viewId);
    onClose();
  };

  // Mobile sidebar drawer component
  const renderMobileSidebar = () => (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <HStack spacing={3}>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              Lucidra
            </Text>
            <Badge colorScheme="teal" variant="subtle">
              {userTier.toUpperCase()}
            </Badge>
          </HStack>
        </DrawerHeader>
        <DrawerBody p={0}>
          <VStack spacing={0} align="stretch">
            {/* Dashboard */}
            <Button
              variant="ghost"
              justifyContent="flex-start"
              p={4}
              h="auto"
              borderRadius="0"
              fontWeight={currentView === 'dashboard' ? 'bold' : 'normal'}
              bg={currentView === 'dashboard' ? 'teal.50' : 'transparent'}
              borderLeft={currentView === 'dashboard' ? '4px solid' : '4px solid transparent'}
              borderColor={currentView === 'dashboard' ? 'teal.500' : 'transparent'}
              onClick={() => handleMobileMenuSelect('dashboard')}
            >
              <HStack spacing={3} w="full">
                <Text fontSize="lg">🏠</Text>
                <VStack align="start" spacing={0} flex="1">
                  <Text fontSize="md">Dashboard</Text>
                  <Text fontSize="xs" color="gray.500">Platform overview</Text>
                </VStack>
              </HStack>
            </Button>

            {/* Menu Categories */}
            {menuCategories.map((category, categoryIndex) => (
              <Box key={categoryIndex}>
                <Box px={4} py={3} bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
                  <Text fontSize="sm" fontWeight="bold" color={category.color}>
                    {category.title}
                  </Text>
                </Box>
                {category.items.map((item, itemIndex) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    justifyContent="flex-start"
                    p={4}
                    h="auto"
                    borderRadius="0"
                    fontWeight={currentView === item.id ? 'bold' : 'normal'}
                    bg={currentView === item.id ? `${category.color.split('.')[0]}.50` : 'transparent'}
                    borderLeft={currentView === item.id ? '4px solid' : '4px solid transparent'}
                    borderColor={currentView === item.id ? category.color : 'transparent'}
                    onClick={() => handleMobileMenuSelect(item.id)}
                    _hover={{ bg: `${category.color.split('.')[0]}.25` }}
                  >
                    <HStack spacing={3} w="full">
                      <Text fontSize="lg">{item.icon}</Text>
                      <VStack align="start" spacing={0} flex="1">
                        <Text fontSize="sm" noOfLines={1}>{item.name}</Text>
                        <Text fontSize="xs" color="gray.500" noOfLines={2}>{item.desc}</Text>
                      </VStack>
                    </HStack>
                  </Button>
                ))}
              </Box>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  // Mobile dropdown menu component
  const renderMobileDropdown = () => (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="outline"
        leftIcon={<Text fontSize="md">☰</Text>}
      >
        Menu
      </MenuButton>
      <MenuList maxH="80vh" overflowY="auto" w="300px">
        <MenuItem onClick={() => setCurrentView('dashboard')}>
          <HStack spacing={3}>
            <Text>🏠</Text>
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" fontWeight="bold">Dashboard</Text>
              <Text fontSize="xs" color="gray.500">Platform overview</Text>
            </VStack>
          </HStack>
        </MenuItem>
        <MenuDivider />
        
        {menuCategories.map((category, categoryIndex) => (
          <Box key={categoryIndex}>
            <MenuItem isDisabled>
              <Text fontSize="xs" fontWeight="bold" color={category.color}>
                {category.title}
              </Text>
            </MenuItem>
            {category.items.map((item) => (
              <MenuItem key={item.id} onClick={() => setCurrentView(item.id)}>
                <HStack spacing={3}>
                  <Text>{item.icon}</Text>
                  <VStack align="start" spacing={0} flex="1">
                    <Text fontSize="sm" noOfLines={1}>{item.name}</Text>
                    <Text fontSize="xs" color="gray.500" noOfLines={1}>{item.desc}</Text>
                  </VStack>
                </HStack>
              </MenuItem>
            ))}
            {categoryIndex < menuCategories.length - 1 && <MenuDivider />}
          </Box>
        ))}
      </MenuList>
    </Menu>
  );

  // Header component - responsive for mobile and desktop
  const renderHeader = () => (
    <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
      {isMobile ? (
        // Mobile Header with Menu Button
        <Flex align="center" justify="space-between" px={4} py={3}>
          <HStack spacing={3}>
            <IconButton
              icon={<Text fontSize="lg">☰</Text>}
              variant="ghost"
              size="sm"
              onClick={onOpen}
              aria-label="Open menu"
            />
            <Text fontSize="lg" fontWeight="bold" color="teal.600">
              Lucidra
            </Text>
            <Badge colorScheme="teal" variant="subtle" size="sm">
              {userTier.toUpperCase()}
            </Badge>
          </HStack>
          {renderMobileDropdown()}
        </Flex>
      ) : (
        // Desktop Header with Full Navigation
        <VStack spacing={2} align="stretch" px={6} py={4}>
          {/* Top Section: Logo and Tier */}
          <Flex align="center" justify="space-between">
            <HStack spacing={4}>
              <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                Lucidra
              </Text>
              <Badge colorScheme="teal" variant="subtle">
                {userTier.toUpperCase()}
              </Badge>
            </HStack>
          </Flex>
        
        <VStack spacing={2} align="stretch">
          {/* Row 1: Core Strategy & Planning */}
          <HStack spacing={1} flexWrap="wrap" justify="center">
            <Button
              variant={currentView === 'mission' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'mission' ? 'teal' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('mission')}
            >
              🎯 Mission
            </Button>
            <Button
              variant={currentView === 'blue-ocean' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'blue-ocean' ? 'blue' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('blue-ocean')}
            >
              🌊 Blue Ocean
            </Button>
            <Button
              variant={currentView === 'enhanced-blue-ocean' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'enhanced-blue-ocean' ? 'blue' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('enhanced-blue-ocean')}
            >
              🌊 Enhanced BO
            </Button>
            <Button
              variant={currentView === 'enhanced-process' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'enhanced-process' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('enhanced-process')}
            >
              ⚙️ Enhanced Process
            </Button>
            <Button
              variant={currentView === 'strategy-frameworks' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'strategy-frameworks' ? 'red' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('strategy-frameworks')}
            >
              📚 Strategy
            </Button>
            <Button
              variant={currentView === 'strategic-planning' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'strategic-planning' ? 'green' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('strategic-planning')}
            >
              🗺️ Planning
            </Button>
            <Button
              variant={currentView === 'strategic-journey' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'strategic-journey' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('strategic-journey')}
            >
              🛣️ Journey
            </Button>
            <Button
              variant={currentView === 'visual-mapping' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'visual-mapping' ? 'orange' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('visual-mapping')}
            >
              🗺️ Visual Map
            </Button>
          </HStack>

          {/* Row 2: Process Management Suite */}
          <HStack spacing={1} flexWrap="wrap" justify="center">
            <Button
              variant={currentView === 'organization-process' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'organization-process' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('organization-process')}
            >
              🌐 Org Process
            </Button>
            <Button
              variant={currentView === 'process-management' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'process-management' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('process-management')}
            >
              🔄 Process Mgmt
            </Button>
            <Button
              variant={currentView === 'advanced-process' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'advanced-process' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('advanced-process')}
            >
              🏭 Advanced Process
            </Button>
            <Button
              variant={currentView === 'process-improvement' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'process-improvement' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('process-improvement')}
            >
              ⚙️ Process Intel
            </Button>
            <Button
              variant={currentView === 'process-analysis' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'process-analysis' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('process-analysis')}
            >
              📊 Process Analysis
            </Button>
            <Button
              variant={currentView === 'ai-process-logger' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'ai-process-logger' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('ai-process-logger')}
            >
              🤖 AI Logger
            </Button>
          </HStack>

          {/* Row 3: Analysis & Intelligence */}
          <HStack spacing={1} flexWrap="wrap" justify="center">
            <Button
              variant={currentView === 'data-pulse' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'data-pulse' ? 'orange' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('data-pulse')}
            >
              📊 Data Pulse
            </Button>
            <Button
              variant={currentView === 'porter' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'porter' ? 'teal' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('porter')}
            >
              🏢 Five Forces
            </Button>
            <Button
              variant={currentView === 'financial' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'financial' ? 'yellow' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('financial')}
            >
              💰 Financial
            </Button>
            <Button
              variant={currentView === 'comprehensive-financial' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'comprehensive-financial' ? 'yellow' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('comprehensive-financial')}
            >
              📈 Comp Financial
            </Button>
            <Button
              variant={currentView === 'swot-analysis' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'swot-analysis' ? 'teal' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('swot-analysis')}
            >
              ⚖️ SWOT
            </Button>
            <Button
              variant={currentView === 'pestle-analysis' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'pestle-analysis' ? 'teal' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('pestle-analysis')}
            >
              🌍 PESTLE
            </Button>
            <Button
              variant={currentView === 'integrated-platform' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'integrated-platform' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('integrated-platform')}
            >
              🔗 Integrated
            </Button>
          </HStack>

          {/* Row 4: Operations & Team Management */}
          <HStack spacing={1} flexWrap="wrap" justify="center">
            <Button
              variant={currentView === 'project-management' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'project-management' ? 'green' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('project-management')}
            >
              📋 Projects
            </Button>
            <Button
              variant={currentView === 'team-collaboration' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'team-collaboration' ? 'cyan' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('team-collaboration')}
            >
              👥 Team Collab
            </Button>
            <Button
              variant={currentView === 'team-interaction' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'team-interaction' ? 'cyan' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('team-interaction')}
            >
              🤝 Team Hub
            </Button>
            <Button
              variant={currentView === 'org-chart' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'org-chart' ? 'cyan' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('org-chart')}
            >
              🏢 Org Chart
            </Button>
            <Button
              variant={currentView === 'hr-module' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'hr-module' ? 'cyan' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('hr-module')}
            >
              👥 HR
            </Button>
            <Button
              variant={currentView === 'health-monitor' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'health-monitor' ? 'blue' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('health-monitor')}
            >
              🏥 Health
            </Button>
          </HStack>

          {/* Row 5: Marketing, Learning & Tools */}
          <HStack spacing={1} flexWrap="wrap" justify="center">
            <Button
              variant={currentView === 'marketing-automation' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'marketing-automation' ? 'pink' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('marketing-automation')}
            >
              📧 Marketing
            </Button>
            <Button
              variant={currentView === 'startup-stage' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'startup-stage' ? 'green' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('startup-stage')}
            >
              🚀 Stages
            </Button>
            <Button
              variant={currentView === 'execution' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'execution' ? 'teal' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('execution')}
            >
              📈 Execution
            </Button>
            <Button
              variant={currentView === 'canvas' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'canvas' ? 'teal' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('canvas')}
            >
              📋 Canvas
            </Button>
            <Button
              variant={currentView === 'tutorials' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'tutorials' ? 'indigo' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('tutorials')}
            >
              🎓 Tutorials
            </Button>
            <Button
              variant={currentView === 'video' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'video' ? 'teal' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('video')}
            >
              🎥 AI Video
            </Button>
          </HStack>

          {/* Row 6: Advanced Infrastructure */}
          <HStack spacing={1} flexWrap="wrap" justify="center">
            <Button
              variant={currentView === 'framework-hub' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'framework-hub' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('framework-hub')}
            >
              🚀 Framework Hub
            </Button>
            <Button
              variant={currentView === 'ai-scenarios' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'ai-scenarios' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('ai-scenarios')}
            >
              🤖 AI Scenarios
            </Button>
            <Button
              variant={currentView === 'intelligence-hub' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'intelligence-hub' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('intelligence-hub')}
            >
              🧠 Intelligence
            </Button>
            <Button
              variant={currentView === 'signal-composer' ? 'solid' : 'ghost'}
              colorScheme={currentView === 'signal-composer' ? 'purple' : 'gray'}
              size="sm"
              onClick={() => setCurrentView('signal-composer')}
            >
              📊 Signal Composer
            </Button>
          </HStack>
          </VStack>
        </VStack>
      )}
      
      {/* Breadcrumb - Desktop Only */}
      {!isMobile && (
        <HStack mt={3} spacing={2} color="gray.600" fontSize="sm" px={6} pb={3}>
          {getBreadcrumbItems().map((item, index) => (
            <React.Fragment key={item.view}>
              {index > 0 && <Text>/</Text>}
              <HStack spacing={1}>
                <Text>{item.icon}</Text>
                <Button
                  variant="link"
                  size="sm"
                  color="gray.600"
                  onClick={() => setCurrentView(item.view)}
                >
                  {item.label}
                </Button>
              </HStack>
            </React.Fragment>
          ))}
        </HStack>
      )}
    </Box>
  );

  // Dashboard view
  const renderDashboard = () => (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="3xl" fontWeight="bold" mb={2}>
            Welcome to Lucidra
          </Text>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Your AI-powered business strategy platform
          </Text>
        </Box>

        <Alert status="success" borderRadius="lg">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">🚀 COMPLETE LUCIDRA PLATFORM - ALL 28+ MODULES ACTIVE!</Text>
            <Text fontSize="sm">
              🌊 Blue Ocean • 🗺️ Strategic Planning • 🛣️ Journey Mapping • 🔄 Process Management • 🏭 Advanced Process • ⚙️ Process Intelligence • 📊 Process Analysis • 🤖 AI Logger • 📊 Data Pulse • 🏢 Five Forces • 💰 Financial • 📈 Comprehensive Financial • ⚖️ SWOT • 🌍 PESTLE • 🔗 Integrated Platform • 📋 Project Management • 👥 Team Collaboration • 🤝 Team Hub • 🏢 Org Chart • 📧 Marketing • 🚀 Startup Stages • 👥 HR • 🏥 Health Monitor • 📈 Execution • 📋 Canvas • 🎓 Tutorials • 🎥 AI Video
            </Text>
          </VStack>
        </Alert>

        {/* Strategy & Planning Section */}
        <Box mb={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4} color="blue.600">
            📈 Strategy & Planning Suite
          </Text>
          <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={3}>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('blue-ocean')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🌊</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Blue Ocean Strategy</Text>
                    <Text fontSize="xs" color="gray.600">Uncontested market space</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('enhanced-blue-ocean')} border="2px solid" borderColor="blue.200">
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🌊</Text>
                  <VStack align="start" spacing={0}>
                    <HStack>
                      <Text fontWeight="bold" fontSize="sm">Enhanced Blue Ocean</Text>
                      <Badge colorScheme="blue" size="xs">NEW</Badge>
                    </HStack>
                    <Text fontSize="xs" color="gray.600">Advanced workshop with analytics</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('strategic-planning')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🗺️</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Strategic Planning</Text>
                    <Text fontSize="xs" color="gray.600">Comprehensive planning module</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('strategic-journey')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🛣️</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Strategic Journey</Text>
                    <Text fontSize="xs" color="gray.600">Journey mapping system</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('visual-mapping')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🗺️</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Visual Mapping</Text>
                    <Text fontSize="xs" color="gray.600">Visual journey mapping</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('strategy-frameworks')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📚</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Strategy Frameworks</Text>
                    <Text fontSize="xs" color="gray.600">Complete framework library</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('mission')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🎯</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Mission Generator</Text>
                    <Text fontSize="xs" color="gray.600">AI-powered missions</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Grid>
        </Box>

        {/* Process Management Suite */}
        <Box mb={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4} color="purple.600">
            🔄 Process Management Suite
          </Text>
          <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={3}>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('organization-process')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🌐</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Organization-Wide Process</Text>
                    <Text fontSize="xs" color="gray.600">Complete process coordination</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('process-management')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🔄</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Process Management</Text>
                    <Text fontSize="xs" color="gray.600">BPMN process design</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('advanced-process')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🏭</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Advanced Process</Text>
                    <Text fontSize="xs" color="gray.600">AI process optimization</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('enhanced-process')} border="2px solid" borderColor="purple.200">
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">⚙️</Text>
                  <VStack align="start" spacing={0}>
                    <HStack>
                      <Text fontWeight="bold" fontSize="sm">Enhanced Process Mgmt</Text>
                      <Badge colorScheme="purple" size="xs">NEW</Badge>
                    </HStack>
                    <Text fontSize="xs" color="gray.600">Complete process intelligence suite</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('process-improvement')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">⚙️</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Process Intelligence</Text>
                    <Text fontSize="xs" color="gray.600">Intelligent optimization</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('process-analysis')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📊</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Process Analysis</Text>
                    <Text fontSize="xs" color="gray.600">Analysis framework</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('ai-process-logger')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🤖</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">AI Process Logger</Text>
                    <Text fontSize="xs" color="gray.600">Automated logging</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Grid>
        </Box>

        {/* Analysis & Intelligence Suite */}
        <Box mb={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4} color="orange.600">
            📊 Analysis & Intelligence
          </Text>
          <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={3}>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('data-pulse')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📊</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Data Pulse Intelligence</Text>
                    <Text fontSize="xs" color="gray.600">Real-time market signals</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('porter')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🏢</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Porter's Five Forces</Text>
                    <Text fontSize="xs" color="gray.600">Industry analysis</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('financial')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">💰</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Financial Analysis</Text>
                    <Text fontSize="xs" color="gray.600">Financial frameworks</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('comprehensive-financial')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📈</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Comprehensive Financial</Text>
                    <Text fontSize="xs" color="gray.600">Advanced financial tools</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('swot-analysis')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">⚖️</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">SWOT Analysis</Text>
                    <Text fontSize="xs" color="gray.600">Live SWOT analysis</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('pestle-analysis')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🌍</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">PESTLE Analysis</Text>
                    <Text fontSize="xs" color="gray.600">Real-time PESTLE</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Grid>
        </Box>

        {/* Operations & Team Management */}
        <Box mb={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4} color="cyan.600">
            👥 Operations & Team Management
          </Text>
          <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={3}>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('project-management')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📋</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Project Management</Text>
                    <Text fontSize="xs" color="gray.600">Complete project system</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('team-collaboration')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">👥</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Team Collaboration</Text>
                    <Text fontSize="xs" color="gray.600">Collaboration tools</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('team-interaction')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🤝</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Team Hub</Text>
                    <Text fontSize="xs" color="gray.600">Team interaction system</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('org-chart')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🏢</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Organization Chart</Text>
                    <Text fontSize="xs" color="gray.600">Org chart system</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('hr-module')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">👥</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">HR Management</Text>
                    <Text fontSize="xs" color="gray.600">Enhanced HR system</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Grid>
        </Box>

        {/* Tools & Resources */}
        <Box mb={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4} color="green.600">
            🛠️ Tools & Resources
          </Text>
          <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={3}>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('marketing-automation')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📧</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Marketing Automation</Text>
                    <Text fontSize="xs" color="gray.600">Strategic marketing</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('startup-stage')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🚀</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Startup Stages</Text>
                    <Text fontSize="xs" color="gray.600">Stage-based guidance</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('execution')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📈</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Execution Tracker</Text>
                    <Text fontSize="xs" color="gray.600">Strategy implementation</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('canvas')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📋</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Business Model Canvas</Text>
                    <Text fontSize="xs" color="gray.600">Visual business planning</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('tutorials')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🎓</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Tutorial Library</Text>
                    <Text fontSize="xs" color="gray.600">Video tutorial system</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('video')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🎥</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">AI Video Production</Text>
                    <Text fontSize="xs" color="gray.600">Generate strategy videos</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Grid>
        </Box>

        {/* Advanced Infrastructure Suite */}
        <Box mb={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4} color="purple.600">
            🚀 Advanced Infrastructure
          </Text>
          <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={3}>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('framework-hub')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🚀</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Enhanced Framework Hub</Text>
                    <Text fontSize="xs" color="gray.600">Advanced framework management</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('ai-scenarios')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🤖</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">AI Scenario Engine</Text>
                    <Text fontSize="xs" color="gray.600">Cross-framework AI scenarios</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('intelligence-hub')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">🧠</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Strategic Intelligence Hub</Text>
                    <Text fontSize="xs" color="gray.600">Real-time strategic insights</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
            <Card cursor="pointer" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s" onClick={() => setCurrentView('signal-composer')}>
              <CardBody py={3}>
                <HStack>
                  <Text fontSize="xl">📊</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Signal Composer</Text>
                    <Text fontSize="xs" color="gray.600">Custom intelligence dashboards</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Grid>
        </Box>
      </VStack>
    </Box>
  );

  // Comprehensive Process Management Foundation Component
  const ComprehensiveProcessManagement = () => {
    const [activeTab, setActiveTab] = React.useState('mapping');
    const [selectedProcess, setSelectedProcess] = React.useState<any>(null);
    const [processes, setProcesses] = React.useState([
      {
        id: 'customer-onboarding',
        name: 'Customer Onboarding',
        category: 'Customer Management',
        status: 'optimized',
        efficiency: 85,
        bottlenecks: ['Document Verification', 'Account Setup'],
        inputs: ['Customer Application', 'ID Documents', 'Initial Deposit'],
        resources: ['Customer Service Rep', 'Verification System', 'Account Database'],
        outputs: ['Active Account', 'Welcome Package', 'Customer ID'],
        steps: [
          { id: 1, name: 'Application Received', duration: '2 hours', automation: 'automated', status: 'efficient' },
          { id: 2, name: 'Document Verification', duration: '24 hours', automation: 'manual', status: 'bottleneck' },
          { id: 3, name: 'Credit Check', duration: '4 hours', automation: 'automated', status: 'efficient' },
          { id: 4, name: 'Account Setup', duration: '8 hours', automation: 'semi-automated', status: 'bottleneck' },
          { id: 5, name: 'Welcome Package', duration: '1 hour', automation: 'automated', status: 'efficient' }
        ],
        connections: ['lead-generation', 'customer-support'],
        kpis: {
          cycleTime: '39 hours',
          throughput: '45 customers/day',
          errorRate: '3%',
          customerSatisfaction: '4.2/5'
        }
      },
      {
        id: 'lead-generation',
        name: 'Lead Generation',
        category: 'Marketing',
        status: 'needs-improvement',
        efficiency: 65,
        bottlenecks: ['Lead Qualification', 'Follow-up Process'],
        inputs: ['Marketing Campaigns', 'Website Traffic', 'Referrals'],
        resources: ['Marketing Team', 'CRM System', 'Analytics Tools'],
        outputs: ['Qualified Leads', 'Lead Database', 'Campaign Reports'],
        steps: [
          { id: 1, name: 'Lead Capture', duration: '1 hour', automation: 'automated', status: 'efficient' },
          { id: 2, name: 'Initial Scoring', duration: '2 hours', automation: 'automated', status: 'efficient' },
          { id: 3, name: 'Lead Qualification', duration: '12 hours', automation: 'manual', status: 'bottleneck' },
          { id: 4, name: 'Assignment to Sales', duration: '4 hours', automation: 'manual', status: 'bottleneck' },
          { id: 5, name: 'Follow-up Scheduling', duration: '2 hours', automation: 'semi-automated', status: 'moderate' }
        ],
        connections: ['customer-onboarding', 'sales-process'],
        kpis: {
          cycleTime: '21 hours',
          throughput: '120 leads/day',
          errorRate: '12%',
          conversionRate: '15%'
        }
      },
      {
        id: 'product-development',
        name: 'Product Development',
        category: 'Innovation',
        status: 'optimized',
        efficiency: 92,
        bottlenecks: ['Regulatory Approval'],
        inputs: ['Market Research', 'Customer Feedback', 'Technical Requirements'],
        resources: ['Development Team', 'Testing Lab', 'Regulatory Specialists'],
        outputs: ['Product Prototype', 'Technical Documentation', 'Market-Ready Product'],
        steps: [
          { id: 1, name: 'Concept Development', duration: '2 weeks', automation: 'manual', status: 'efficient' },
          { id: 2, name: 'Prototype Creation', duration: '4 weeks', automation: 'semi-automated', status: 'efficient' },
          { id: 3, name: 'Testing & Validation', duration: '3 weeks', automation: 'automated', status: 'efficient' },
          { id: 4, name: 'Regulatory Approval', duration: '8 weeks', automation: 'manual', status: 'bottleneck' },
          { id: 5, name: 'Production Setup', duration: '2 weeks', automation: 'semi-automated', status: 'efficient' }
        ],
        connections: ['market-research', 'quality-assurance'],
        kpis: {
          cycleTime: '19 weeks',
          throughput: '2 products/quarter',
          errorRate: '2%',
          innovationIndex: '8.5/10'
        }
      }
    ]);

    const tabs = [
      { id: 'mapping', name: 'Process Mapping', icon: '🗺️' },
      { id: 'analysis', name: 'Bottleneck Analysis', icon: '🔍' },
      { id: 'optimization', name: 'Efficiency Optimization', icon: '⚡' },
      { id: 'integration', name: 'Process Integration', icon: '🔗' },
      { id: 'monitoring', name: 'Real-time Monitoring', icon: '📊' }
    ];

    const getEfficiencyColor = (efficiency: number) => {
      if (efficiency >= 85) return 'green';
      if (efficiency >= 70) return 'yellow';
      return 'red';
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'efficient': return 'green';
        case 'bottleneck': return 'red';
        case 'moderate': return 'yellow';
        default: return 'gray';
      }
    };

    return (
      <Box p={6}>
        <VStack align="stretch" spacing={6}>
          {/* Header */}
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                🔄 Comprehensive Process Management
              </Text>
              <Text color="gray.600">
                Process mapping, bottleneck analysis, and efficiency optimization system
              </Text>
            </VStack>
            <HStack>
              <Button colorScheme="purple" size="md">
                📊 Generate Process Report
              </Button>
              <Button variant="outline" size="md">
                ➕ Add New Process
              </Button>
            </HStack>
          </HStack>

          {/* Tab Navigation */}
          <HStack spacing={1} bg="gray.50" p={2} borderRadius="lg" overflowX="auto">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'solid' : 'ghost'}
                colorScheme={activeTab === tab.id ? 'purple' : 'gray'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                minWidth="fit-content"
                flexShrink={0}
              >
                {tab.icon} {tab.name}
              </Button>
            ))}
          </HStack>

          {/* Content Area */}
          <Box bg="white" borderRadius="lg" border="1px" borderColor="gray.200" minHeight="700px">
            {activeTab === 'mapping' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">🗺️ Process Mapping & Flow Analysis</Text>
                  
                  {/* Process Overview Cards */}
                  <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={6}>
                    {processes.map(process => (
                      <Card 
                        key={process.id} 
                        border="1px" 
                        borderColor="gray.200"
                        cursor="pointer"
                        onClick={() => setSelectedProcess(process)}
                        _hover={{ borderColor: 'purple.300', shadow: 'md' }}
                        bg={selectedProcess?.id === process.id ? 'purple.50' : 'white'}
                      >
                        <CardHeader pb={2}>
                          <HStack justify="space-between">
                            <VStack align="start" spacing={1}>
                              <Text fontSize="lg" fontWeight="bold">{process.name}</Text>
                              <Badge colorScheme={getEfficiencyColor(process.efficiency)}>
                                {process.efficiency}% Efficient
                              </Badge>
                            </VStack>
                            <Text fontSize="sm" color="gray.500">{process.category}</Text>
                          </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                          <VStack align="stretch" spacing={3}>
                            {/* Efficiency Progress Bar */}
                            <Box>
                              <HStack justify="space-between" mb={1}>
                                <Text fontSize="sm" color="gray.600">Process Efficiency</Text>
                                <Text fontSize="sm" fontWeight="bold">{process.efficiency}%</Text>
                              </HStack>
                              <Box bg="gray.100" borderRadius="full" height="8px">
                                <Box 
                                  bg={`${getEfficiencyColor(process.efficiency)}.500`} 
                                  height="8px" 
                                  width={`${process.efficiency}%`} 
                                  borderRadius="full" 
                                />
                              </Box>
                            </Box>

                            {/* Process Flow Summary */}
                            <Box>
                              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>Process Flow</Text>
                              <HStack spacing={1} wrap="wrap">
                                {process.steps.slice(0, 3).map((step, index) => (
                                  <React.Fragment key={step.id}>
                                    <Badge 
                                      size="sm" 
                                      colorScheme={getStatusColor(step.status)}
                                      variant="subtle"
                                    >
                                      {step.name}
                                    </Badge>
                                    {index < 2 && <Text fontSize="xs" color="gray.400">→</Text>}
                                  </React.Fragment>
                                ))}
                                {process.steps.length > 3 && (
                                  <Badge size="sm" variant="outline">+{process.steps.length - 3} more</Badge>
                                )}
                              </HStack>
                            </Box>

                            {/* Key Metrics */}
                            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                              <Box>
                                <Text fontSize="xs" color="gray.600">Cycle Time</Text>
                                <Text fontSize="sm" fontWeight="bold">{process.kpis.cycleTime}</Text>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="gray.600">Throughput</Text>
                                <Text fontSize="sm" fontWeight="bold">{process.kpis.throughput}</Text>
                              </Box>
                            </Grid>

                            {/* Bottlenecks */}
                            {process.bottlenecks.length > 0 && (
                              <Box>
                                <Text fontSize="xs" color="red.600" fontWeight="semibold" mb={1}>Bottlenecks Identified</Text>
                                <VStack align="start" spacing={0}>
                                  {process.bottlenecks.slice(0, 2).map(bottleneck => (
                                    <Text key={bottleneck} fontSize="xs" color="red.600">• {bottleneck}</Text>
                                  ))}
                                </VStack>
                              </Box>
                            )}
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>

                  {/* Detailed Process View */}
                  {selectedProcess && (
                    <Card border="2px" borderColor="purple.200" bg="purple.50">
                      <CardHeader>
                        <HStack justify="space-between">
                          <Text fontSize="xl" fontWeight="bold">
                            🔍 Detailed Process Analysis: {selectedProcess.name}
                          </Text>
                          <Button size="sm" onClick={() => setSelectedProcess(null)}>✕</Button>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                          {/* Inputs */}
                          <Box>
                            <Text fontSize="md" fontWeight="bold" color="blue.600" mb={3}>📥 Inputs</Text>
                            <VStack align="start" spacing={2}>
                              {selectedProcess.inputs.map((input: string) => (
                                <HStack key={input} spacing={2}>
                                  <Box w="8px" h="8px" bg="blue.400" borderRadius="full" />
                                  <Text fontSize="sm">{input}</Text>
                                </HStack>
                              ))}
                            </VStack>
                          </Box>

                          {/* Process Steps */}
                          <Box>
                            <Text fontSize="md" fontWeight="bold" color="purple.600" mb={3}>⚙️ Process Steps</Text>
                            <VStack align="stretch" spacing={2}>
                              {selectedProcess.steps.map((step: any, index: number) => (
                                <Box key={step.id} p={2} bg="white" borderRadius="md" border="1px" borderColor="gray.200">
                                  <HStack justify="space-between" mb={1}>
                                    <Text fontSize="sm" fontWeight="medium">{index + 1}. {step.name}</Text>
                                    <Badge size="xs" colorScheme={getStatusColor(step.status)}>
                                      {step.status}
                                    </Badge>
                                  </HStack>
                                  <HStack spacing={4}>
                                    <Text fontSize="xs" color="gray.600">⏱️ {step.duration}</Text>
                                    <Text fontSize="xs" color="gray.600">🤖 {step.automation}</Text>
                                  </HStack>
                                </Box>
                              ))}
                            </VStack>
                          </Box>

                          {/* Outputs */}
                          <Box>
                            <Text fontSize="md" fontWeight="bold" color="green.600" mb={3}>📤 Outputs</Text>
                            <VStack align="start" spacing={2}>
                              {selectedProcess.outputs.map((output: string) => (
                                <HStack key={output} spacing={2}>
                                  <Box w="8px" h="8px" bg="green.400" borderRadius="full" />
                                  <Text fontSize="sm">{output}</Text>
                                </HStack>
                              ))}
                            </VStack>
                          </Box>
                        </Grid>

                        {/* Resources & Connections */}
                        <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={6}>
                          <Box>
                            <Text fontSize="md" fontWeight="bold" color="orange.600" mb={3}>🛠️ Resources Required</Text>
                            <HStack wrap="wrap" spacing={2}>
                              {selectedProcess.resources.map((resource: string) => (
                                <Badge key={resource} colorScheme="orange" variant="subtle">{resource}</Badge>
                              ))}
                            </HStack>
                          </Box>

                          <Box>
                            <Text fontSize="md" fontWeight="bold" color="teal.600" mb={3}>🔗 Connected Processes</Text>
                            <HStack wrap="wrap" spacing={2}>
                              {selectedProcess.connections.map((connection: string) => (
                                <Badge key={connection} colorScheme="teal" variant="subtle">
                                  {connection.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                </Badge>
                              ))}
                            </HStack>
                          </Box>
                        </Grid>
                      </CardBody>
                    </Card>
                  )}
                </VStack>
              </Box>
            )}

            {activeTab === 'analysis' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">🔍 Bottleneck Analysis & Root Cause Identification</Text>
                  
                  {/* Bottleneck Overview */}
                  <Alert status="warning">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">7 bottlenecks identified across processes</Text>
                      <Text fontSize="xs">Estimated impact: 23% efficiency loss, $45K/month opportunity cost</Text>
                    </VStack>
                  </Alert>

                  <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
                    {processes.map(process => (
                      process.bottlenecks.length > 0 && (
                        <Card key={process.id} border="1px" borderColor="red.200">
                          <CardHeader pb={2}>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="lg" fontWeight="bold">{process.name}</Text>
                              <HStack>
                                <Badge colorScheme="red">
                                  {process.bottlenecks.length} Bottleneck{process.bottlenecks.length > 1 ? 's' : ''}
                                </Badge>
                                <Text fontSize="sm" color="gray.600">
                                  Impact: {100 - process.efficiency}% efficiency loss
                                </Text>
                              </HStack>
                            </VStack>
                          </CardHeader>
                          <CardBody pt={0}>
                            <VStack align="stretch" spacing={4}>
                              {process.steps.filter(step => step.status === 'bottleneck').map(step => (
                                <Box key={step.id} p={3} bg="red.50" borderRadius="md" border="1px" borderColor="red.200">
                                  <VStack align="start" spacing={2}>
                                    <HStack justify="space-between" width="100%">
                                      <Text fontSize="sm" fontWeight="bold" color="red.700">{step.name}</Text>
                                      <Badge size="sm" colorScheme="red">Critical</Badge>
                                    </HStack>
                                    <Text fontSize="xs" color="red.600">Duration: {step.duration}</Text>
                                    <Text fontSize="xs" color="red.600">Type: {step.automation}</Text>
                                    
                                    {/* Root Cause Analysis */}
                                    <Box width="100%">
                                      <Text fontSize="xs" fontWeight="semibold" color="red.700" mb={1}>Root Causes:</Text>
                                      <VStack align="start" spacing={0}>
                                        {step.name === 'Document Verification' && (
                                          <>
                                            <Text fontSize="xs" color="red.600">• Manual review process</Text>
                                            <Text fontSize="xs" color="red.600">• Lack of automated validation</Text>
                                            <Text fontSize="xs" color="red.600">• Single point of failure</Text>
                                          </>
                                        )}
                                        {step.name === 'Account Setup' && (
                                          <>
                                            <Text fontSize="xs" color="red.600">• Multiple system integrations</Text>
                                            <Text fontSize="xs" color="red.600">• Manual data entry</Text>
                                            <Text fontSize="xs" color="red.600">• Legacy system constraints</Text>
                                          </>
                                        )}
                                        {step.name === 'Lead Qualification' && (
                                          <>
                                            <Text fontSize="xs" color="red.600">• Subjective scoring criteria</Text>
                                            <Text fontSize="xs" color="red.600">• Inconsistent follow-up</Text>
                                            <Text fontSize="xs" color="red.600">• Lack of automation</Text>
                                          </>
                                        )}
                                        {step.name === 'Regulatory Approval' && (
                                          <>
                                            <Text fontSize="xs" color="red.600">• External dependency</Text>
                                            <Text fontSize="xs" color="red.600">• Complex compliance requirements</Text>
                                            <Text fontSize="xs" color="red.600">• Limited communication channels</Text>
                                          </>
                                        )}
                                      </VStack>
                                    </Box>

                                    {/* Optimization Recommendations */}
                                    <Box width="100%" bg="green.50" p={2} borderRadius="md">
                                      <Text fontSize="xs" fontWeight="semibold" color="green.700" mb={1}>Optimization Opportunities:</Text>
                                      <VStack align="start" spacing={0}>
                                        {step.name === 'Document Verification' && (
                                          <>
                                            <Text fontSize="xs" color="green.600">✓ Implement AI-powered document scanning</Text>
                                            <Text fontSize="xs" color="green.600">✓ Add parallel verification tracks</Text>
                                            <Text fontSize="xs" color="green.600">✓ Create automated validation rules</Text>
                                          </>
                                        )}
                                        {step.name === 'Account Setup' && (
                                          <>
                                            <Text fontSize="xs" color="green.600">✓ API integration for real-time sync</Text>
                                            <Text fontSize="xs" color="green.600">✓ Pre-populate account templates</Text>
                                            <Text fontSize="xs" color="green.600">✓ Batch processing capabilities</Text>
                                          </>
                                        )}
                                        {step.name === 'Lead Qualification' && (
                                          <>
                                            <Text fontSize="xs" color="green.600">✓ Machine learning scoring model</Text>
                                            <Text fontSize="xs" color="green.600">✓ Automated lead routing</Text>
                                            <Text fontSize="xs" color="green.600">✓ Progressive profiling system</Text>
                                          </>
                                        )}
                                        {step.name === 'Regulatory Approval' && (
                                          <>
                                            <Text fontSize="xs" color="green.600">✓ Proactive compliance monitoring</Text>
                                            <Text fontSize="xs" color="green.600">✓ Parallel approval processes</Text>
                                            <Text fontSize="xs" color="green.600">✓ Regulatory liaison program</Text>
                                          </>
                                        )}
                                      </VStack>
                                    </Box>
                                  </VStack>
                                </Box>
                              ))}
                            </VStack>
                          </CardBody>
                        </Card>
                      )
                    ))}
                  </Grid>
                </VStack>
              </Box>
            )}

            {activeTab === 'optimization' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">⚡ Efficiency Optimization & Process Improvement</Text>
                  
                  {/* Optimization Opportunities Dashboard */}
                  <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                    <Card>
                      <CardBody>
                        <VStack spacing={3}>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.700">Potential Time Savings</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="green.600">156 hours/month</Text>
                          <Badge colorScheme="green" variant="subtle">32% improvement</Badge>
                        </VStack>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <VStack spacing={3}>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.700">Cost Reduction</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="blue.600">$45,000/month</Text>
                          <Badge colorScheme="blue" variant="subtle">18% cost savings</Badge>
                        </VStack>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <VStack spacing={3}>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.700">Automation Potential</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="purple.600">67%</Text>
                          <Badge colorScheme="purple" variant="subtle">High impact</Badge>
                        </VStack>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <VStack spacing={3}>
                          <Text fontSize="sm" fontWeight="semibold" color="gray.700">Quality Improvement</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="orange.600">15%</Text>
                          <Badge colorScheme="orange" variant="subtle">Error reduction</Badge>
                        </VStack>
                      </CardBody>
                    </Card>
                  </Grid>

                  {/* Process Optimization Recommendations */}
                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="semibold">🎯 Priority Optimization Projects</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        {[
                          {
                            title: 'Automated Document Verification System',
                            impact: 'High',
                            effort: 'Medium',
                            timeReduction: '18 hours/day',
                            costSavings: '$15,000/month',
                            description: 'AI-powered document scanning and validation with machine learning',
                            steps: ['Implement OCR technology', 'Train ML models', 'Setup validation rules', 'Integration testing']
                          },
                          {
                            title: 'Lead Qualification Automation',
                            impact: 'High', 
                            effort: 'Low',
                            timeReduction: '12 hours/day',
                            costSavings: '$8,000/month',
                            description: 'Automated lead scoring and routing based on behavioral data',
                            steps: ['Define scoring criteria', 'Build automation workflows', 'CRM integration', 'A/B testing']
                          },
                          {
                            title: 'Account Setup Streamlining',
                            impact: 'Medium',
                            effort: 'Medium',
                            timeReduction: '6 hours/day',
                            costSavings: '$12,000/month',
                            description: 'API integrations and pre-filled templates for faster account creation',
                            steps: ['API development', 'Template creation', 'Integration testing', 'User training']
                          }
                        ].map((project, index) => (
                          <Box key={index} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                            <Grid templateColumns="2fr 1fr" gap={6}>
                              <VStack align="start" spacing={3}>
                                <HStack>
                                  <Text fontSize="md" fontWeight="bold">{project.title}</Text>
                                  <Badge colorScheme={project.impact === 'High' ? 'green' : 'yellow'}>
                                    {project.impact} Impact
                                  </Badge>
                                  <Badge variant="outline">
                                    {project.effort} Effort
                                  </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">{project.description}</Text>
                                <Box>
                                  <Text fontSize="xs" fontWeight="semibold" color="gray.700" mb={1}>Implementation Steps:</Text>
                                  <HStack wrap="wrap" spacing={2}>
                                    {project.steps.map((step, i) => (
                                      <Badge key={i} size="sm" variant="outline">{i + 1}. {step}</Badge>
                                    ))}
                                  </HStack>
                                </Box>
                              </VStack>
                              <VStack spacing={3} align="end">
                                <VStack spacing={1} align="end">
                                  <Text fontSize="xs" color="gray.600">Time Savings</Text>
                                  <Text fontSize="md" fontWeight="bold" color="green.600">{project.timeReduction}</Text>
                                </VStack>
                                <VStack spacing={1} align="end">
                                  <Text fontSize="xs" color="gray.600">Cost Savings</Text>
                                  <Text fontSize="md" fontWeight="bold" color="blue.600">{project.costSavings}</Text>
                                </VStack>
                                <Button size="sm" colorScheme="purple">
                                  Start Project
                                </Button>
                              </VStack>
                            </Grid>
                          </Box>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>
            )}

            {activeTab === 'integration' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">🔗 Process Integration & Strategic Alignment</Text>
                  
                  <Alert status="info">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">Strategic Integration Status: 89% aligned</Text>
                      <Text fontSize="xs">Process data feeds into Porter's Five Forces, SWOT Analysis, and Blue Ocean Strategy</Text>
                    </VStack>
                  </Alert>

                  {/* Integration Matrix */}
                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="semibold">📊 Process-Strategy Integration Matrix</Text>
                    </CardHeader>
                    <CardBody>
                      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                        <Box bg="blue.50" p={4} borderRadius="md" border="1px" borderColor="blue.200">
                          <VStack align="start" spacing={3}>
                            <Text fontSize="sm" fontWeight="bold" color="blue.700">🏢 Porter's Five Forces</Text>
                            <Text fontSize="xs" color="blue.600">Process efficiency data feeds competitive analysis</Text>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="xs" color="blue.600">• Customer onboarding → Buyer Power</Text>
                              <Text fontSize="xs" color="blue.600">• Lead generation → Competitive Rivalry</Text>
                              <Text fontSize="xs" color="blue.600">• Product development → Substitutes</Text>
                            </VStack>
                            <Badge colorScheme="blue" size="sm">92% Integration</Badge>
                          </VStack>
                        </Box>

                        <Box bg="green.50" p={4} borderRadius="md" border="1px" borderColor="green.200">
                          <VStack align="start" spacing={3}>
                            <Text fontSize="sm" fontWeight="bold" color="green.700">⚖️ SWOT Analysis</Text>
                            <Text fontSize="xs" color="green.600">Process bottlenecks identify weaknesses, efficiencies show strengths</Text>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="xs" color="green.600">• Bottlenecks → Weaknesses</Text>
                              <Text fontSize="xs" color="green.600">• Optimizations → Strengths</Text>
                              <Text fontSize="xs" color="green.600">• Automation → Opportunities</Text>
                            </VStack>
                            <Badge colorScheme="green" size="sm">87% Integration</Badge>
                          </VStack>
                        </Box>

                        <Box bg="purple.50" p={4} borderRadius="md" border="1px" borderColor="purple.200">
                          <VStack align="start" spacing={3}>
                            <Text fontSize="sm" fontWeight="bold" color="purple.700">🌊 Blue Ocean Strategy</Text>
                            <Text fontSize="xs" color="purple.600">Process innovations create differentiation opportunities</Text>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="xs" color="purple.600">• Unique processes → Differentiation</Text>
                              <Text fontSize="xs" color="purple.600">• Automation → Cost reduction</Text>
                              <Text fontSize="xs" color="purple.600">• Efficiency → Value creation</Text>
                            </VStack>
                            <Badge colorScheme="purple" size="sm">85% Integration</Badge>
                          </VStack>
                        </Box>

                        <Box bg="orange.50" p={4} borderRadius="md" border="1px" borderColor="orange.200">
                          <VStack align="start" spacing={3}>
                            <Text fontSize="sm" fontWeight="bold" color="orange.700">🎯 Resource-Based View</Text>
                            <Text fontSize="xs" color="orange.600">Process capabilities become competitive resources</Text>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="xs" color="orange.600">• Unique processes → Valuable</Text>
                              <Text fontSize="xs" color="orange.600">• Automation → Rare</Text>
                              <Text fontSize="xs" color="orange.600">• Integration → Inimitable</Text>
                            </VStack>
                            <Badge colorScheme="orange" size="sm">90% Integration</Badge>
                          </VStack>
                        </Box>
                      </Grid>
                    </CardBody>
                  </Card>

                  {/* Strategic Insights from Process Data */}
                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="semibold">🔮 Strategic Insights from Process Analysis</Text>
                    </CardHeader>
                    <CardBody>
                      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <VStack align="stretch" spacing={4}>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">Competitive Advantages Identified</Text>
                          {[
                            { advantage: 'Automated Document Processing', strength: 'High', rarity: 'Medium', impact: 'Customer satisfaction +15%' },
                            { advantage: 'Integrated Lead-to-Customer Flow', strength: 'Medium', rarity: 'High', impact: 'Conversion rate +23%' },
                            { advantage: 'Rapid Product Development', strength: 'High', rarity: 'High', impact: 'Time-to-market -40%' }
                          ].map((item, index) => (
                            <Box key={index} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                              <VStack align="start" spacing={2}>
                                <Text fontSize="sm" fontWeight="bold">{item.advantage}</Text>
                                <HStack spacing={4}>
                                  <HStack>
                                    <Text fontSize="xs" color="gray.600">Strength:</Text>
                                    <Badge size="xs" colorScheme={item.strength === 'High' ? 'green' : 'yellow'}>
                                      {item.strength}
                                    </Badge>
                                  </HStack>
                                  <HStack>
                                    <Text fontSize="xs" color="gray.600">Rarity:</Text>
                                    <Badge size="xs" colorScheme={item.rarity === 'High' ? 'purple' : 'blue'}>
                                      {item.rarity}
                                    </Badge>
                                  </HStack>
                                </HStack>
                                <Text fontSize="xs" color="green.600" fontWeight="semibold">{item.impact}</Text>
                              </VStack>
                            </Box>
                          ))}
                        </VStack>

                        <VStack align="stretch" spacing={4}>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">Strategic Vulnerabilities</Text>
                          {[
                            { vulnerability: 'Manual Verification Dependency', risk: 'High', mitigation: 'AI automation project' },
                            { vulnerability: 'Single-threaded Lead Qualification', risk: 'Medium', mitigation: 'Parallel processing implementation' },
                            { vulnerability: 'Regulatory Approval Bottleneck', risk: 'High', mitigation: 'Proactive compliance system' }
                          ].map((item, index) => (
                            <Box key={index} p={3} border="1px" borderColor="red.200" borderRadius="md" bg="red.50">
                              <VStack align="start" spacing={2}>
                                <Text fontSize="sm" fontWeight="bold" color="red.700">{item.vulnerability}</Text>
                                <HStack>
                                  <Text fontSize="xs" color="gray.600">Risk Level:</Text>
                                  <Badge size="xs" colorScheme={item.risk === 'High' ? 'red' : 'orange'}>
                                    {item.risk}
                                  </Badge>
                                </HStack>
                                <Text fontSize="xs" color="green.700" fontWeight="semibold">
                                  Mitigation: {item.mitigation}
                                </Text>
                              </VStack>
                            </Box>
                          ))}
                        </VStack>
                      </Grid>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>
            )}

            {activeTab === 'monitoring' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">📊 Real-time Process Monitoring & KPI Dashboard</Text>
                  
                  {/* Real-time Metrics */}
                  <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                    {[
                      { metric: 'Overall Efficiency', value: '82%', change: '+5%', color: 'green' },
                      { metric: 'Active Processes', value: '23', change: '+2', color: 'blue' },
                      { metric: 'Bottlenecks', value: '7', change: '-3', color: 'red' },
                      { metric: 'Automation Rate', value: '67%', change: '+12%', color: 'purple' },
                      { metric: 'Cost per Transaction', value: '$12.50', change: '-$2.30', color: 'orange' },
                      { metric: 'Customer Satisfaction', value: '4.3/5', change: '+0.2', color: 'teal' }
                    ].map((item, index) => (
                      <Card key={index}>
                        <CardBody>
                          <VStack spacing={2}>
                            <Text fontSize="xs" color="gray.600" textAlign="center">{item.metric}</Text>
                            <Text fontSize="lg" fontWeight="bold" color={`${item.color}.600`}>{item.value}</Text>
                            <Badge 
                              size="sm" 
                              colorScheme={item.change.startsWith('+') ? 'green' : item.change.startsWith('-') && item.metric !== 'Bottlenecks' && item.metric !== 'Cost per Transaction' ? 'red' : 'green'}
                            >
                              {item.change} this week
                            </Badge>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>

                  {/* Process Performance Tracking */}
                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="semibold">📈 Process Performance Trends</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={4}>
                        {processes.map(process => (
                          <Box key={process.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                            <Grid templateColumns="2fr 1fr" gap={6}>
                              <VStack align="start" spacing={3}>
                                <HStack justify="space-between" width="100%">
                                  <Text fontSize="md" fontWeight="bold">{process.name}</Text>
                                  <Badge colorScheme={getEfficiencyColor(process.efficiency)}>
                                    {process.efficiency}% Efficient
                                  </Badge>
                                </HStack>
                                
                                {/* Key Performance Indicators */}
                                <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
                                  <VStack align="start" spacing={1}>
                                    <Text fontSize="xs" color="gray.600">Cycle Time</Text>
                                    <Text fontSize="sm" fontWeight="bold">{process.kpis.cycleTime}</Text>
                                  </VStack>
                                  <VStack align="start" spacing={1}>
                                    <Text fontSize="xs" color="gray.600">Throughput</Text>
                                    <Text fontSize="sm" fontWeight="bold">{process.kpis.throughput}</Text>
                                  </VStack>
                                  <VStack align="start" spacing={1}>
                                    <Text fontSize="xs" color="gray.600">Error Rate</Text>
                                    <Text fontSize="sm" fontWeight="bold" color={process.kpis.errorRate < '5%' ? 'green.600' : 'red.600'}>
                                      {process.kpis.errorRate}
                                    </Text>
                                  </VStack>
                                  <VStack align="start" spacing={1}>
                                    <Text fontSize="xs" color="gray.600">
                                      {process.kpis.customerSatisfaction ? 'Satisfaction' : 
                                       process.kpis.conversionRate ? 'Conversion' : 'Innovation Index'}
                                    </Text>
                                    <Text fontSize="sm" fontWeight="bold" color="blue.600">
                                      {process.kpis.customerSatisfaction || process.kpis.conversionRate || process.kpis.innovationIndex}
                                    </Text>
                                  </VStack>
                                </Grid>
                              </VStack>

                              {/* Real-time Status */}
                              <VStack spacing={3} align="end">
                                <Box textAlign="right">
                                  <Text fontSize="xs" color="gray.600" mb={1}>Live Status</Text>
                                  <HStack>
                                    <Box w="8px" h="8px" bg="green.400" borderRadius="full" />
                                    <Text fontSize="sm" color="green.600">Active</Text>
                                  </HStack>
                                </Box>
                                <Button size="sm" variant="outline">
                                  📊 View Details
                                </Button>
                              </VStack>
                            </Grid>
                          </Box>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
    );
  };

  // Comprehensive Porter's Five Forces Component - COMMENTED OUT, USING EXTERNAL COMPONENT
  /* const ComprehensivePortersFiveForces = () => {
    const [activeTab, setActiveTab] = React.useState('analysis');
    const [selectedForce, setSelectedForce] = React.useState<any>(null);
    const [industryData, setIndustryData] = React.useState({
      industryName: 'Business Intelligence & Analytics Software',
      marketSize: '$29.5B',
      growthRate: '12.3% CAGR',
      concentration: 'Moderate - CR4: 45%',
      maturity: 'Growth Stage',
      attractivenessScore: 7.2
    });

    const [forcesAnalysis, setForcesAnalysis] = React.useState({
      competitiveRivalry: {
        intensity: 8.5,
        factors: [
          { factor: 'Number of Competitors', score: 8, weight: 'High', description: '100+ direct competitors including Tableau, PowerBI, Qlik' },
          { factor: 'Industry Growth Rate', score: 6, weight: 'Medium', description: '12.3% CAGR creating space for multiple players' },
          { factor: 'Product Differentiation', score: 9, weight: 'High', description: 'Limited differentiation, feature parity common' },
          { factor: 'Switching Costs', score: 7, weight: 'High', description: 'Moderate switching costs due to data integration' },
          { factor: 'Exit Barriers', score: 8, weight: 'Medium', description: 'High R&D investments and specialized talent' }
        ],
        strategicImplications: [
          'Focus on unique process integration capabilities',
          'Build strong customer switching costs through deep integration',
          'Invest in AI differentiation to stay ahead of feature parity'
        ],
        processLinks: [
          { process: 'Customer Onboarding', impact: 'Faster onboarding creates competitive advantage' },
          { process: 'Product Development', impact: 'Rapid development cycle essential for feature competition' }
        ]
      },
      buyerPower: {
        intensity: 6.5,
        factors: [
          { factor: 'Buyer Concentration', score: 5, weight: 'Medium', description: 'Fragmented customer base reduces individual buyer power' },
          { factor: 'Volume of Purchases', score: 7, weight: 'High', description: 'Enterprise deals represent 60% of revenue' },
          { factor: 'Switching Costs', score: 6, weight: 'High', description: 'Data migration and training create moderate barriers' },
          { factor: 'Price Sensitivity', score: 8, weight: 'High', description: 'High price sensitivity, especially among SMEs' },
          { factor: 'Backward Integration', score: 3, weight: 'Low', description: 'Low threat of customers building internal solutions' }
        ],
        strategicImplications: [
          'Develop tiered pricing for different customer segments',
          'Increase switching costs through deeper process integration',
          'Focus on ROI demonstration and value-based pricing'
        ],
        processLinks: [
          { process: 'Lead Generation', impact: 'Must qualify for budget authority and decision-making power' },
          { process: 'Customer Onboarding', impact: 'Reduce time-to-value to increase switching costs quickly' }
        ]
      },
      supplierPower: {
        intensity: 4.2,
        factors: [
          { factor: 'Supplier Concentration', score: 6, weight: 'Medium', description: 'Cloud providers (AWS, Azure, GCP) have significant power' },
          { factor: 'Uniqueness of Service', score: 4, weight: 'Medium', description: 'Multiple cloud and data providers available' },
          { factor: 'Switching Costs', score: 5, weight: 'Medium', description: 'Moderate costs to switch cloud providers' },
          { factor: 'Forward Integration', score: 3, weight: 'Low', description: 'Low threat of suppliers entering BI market directly' },
          { factor: 'Input Importance', score: 4, weight: 'Medium', description: 'Cloud infrastructure critical but commoditized' }
        ],
        strategicImplications: [
          'Maintain multi-cloud strategy to reduce dependency',
          'Negotiate volume discounts with key suppliers',
          'Develop proprietary data processing capabilities'
        ],
        processLinks: [
          { process: 'Product Development', impact: 'Technology choices affect supplier relationships' },
          { process: 'Financial Management', impact: 'Infrastructure costs are major expense category' }
        ]
      },
      threatOfNewEntrants: {
        intensity: 7.8,
        factors: [
          { factor: 'Capital Requirements', score: 6, weight: 'Medium', description: 'Moderate initial investment, cloud reduces barriers' },
          { factor: 'Technology Access', score: 8, weight: 'High', description: 'Open source tools and cloud platforms widely available' },
          { factor: 'Brand Loyalty', score: 5, weight: 'Medium', description: 'Moderate brand loyalty, customers willing to switch' },
          { factor: 'Regulatory Barriers', score: 3, weight: 'Low', description: 'Limited regulatory barriers in most markets' },
          { factor: 'Scale Economics', score: 7, weight: 'High', description: 'Significant advantages at scale for R&D and sales' }
        ],
        strategicImplications: [
          'Build strong network effects and data moats',
          'Invest heavily in R&D to stay ahead of new entrants',
          'Focus on industries with high switching costs'
        ],
        processLinks: [
          { process: 'Market Research', impact: 'Monitor emerging competitors and new technologies' },
          { process: 'Strategic Partnerships', impact: 'Partnerships can create barriers for new entrants' }
        ]
      },
      threatOfSubstitutes: {
        intensity: 6.8,
        factors: [
          { factor: 'Substitute Availability', score: 7, weight: 'High', description: 'Excel, custom dashboards, open-source tools available' },
          { factor: 'Price-Performance', score: 6, weight: 'Medium', description: 'Some substitutes offer lower cost but reduced functionality' },
          { factor: 'Switching Costs', score: 5, weight: 'Medium', description: 'Low to moderate costs to switch to substitutes' },
          { factor: 'Buyer Propensity', score: 8, weight: 'High', description: 'Cost-conscious SMEs often consider substitutes first' },
          { factor: 'Performance Gap', score: 6, weight: 'High', description: 'Performance gap with substitutes is narrowing' }
        ],
        strategicImplications: [
          'Emphasize unique process integration capabilities',
          'Target use cases where substitutes perform poorly',
          'Build ecosystem that makes substitution difficult'
        ],
        processLinks: [
          { process: 'Product Development', impact: 'Must stay significantly ahead of substitute capabilities' },
          { process: 'Customer Onboarding', impact: 'Demonstrate clear superiority over substitutes' }
        ]
      }
    });

    const tabs = [
      { id: 'analysis', name: 'Five Forces Analysis', icon: '🏢' },
      { id: 'industry', name: 'Industry Overview', icon: '📈' },
      { id: 'strategic', name: 'Strategic Recommendations', icon: '🎯' },
      { id: 'integration', name: 'Process Integration', icon: '🔗' },
      { id: 'monitoring', name: 'Competitive Intelligence', icon: '👁️' }
    ];

    const getIntensityColor = (intensity: number) => {
      if (intensity >= 8) return 'red';
      if (intensity >= 6) return 'orange';
      if (intensity >= 4) return 'yellow';
      return 'green';
    };

    const getScoreColor = (score: number) => {
      if (score >= 8) return 'red';
      if (score >= 6) return 'orange';
      if (score >= 4) return 'yellow';
      return 'green';
    };

    const forceDetails = {
      competitiveRivalry: {
        title: '🥊 Competitive Rivalry',
        description: 'Intensity of competition among existing players',
        color: 'red'
      },
      buyerPower: {
        title: '🛒 Buyer Power',
        description: 'Ability of customers to put pressure on margins',
        color: 'blue'
      },
      supplierPower: {
        title: '🏭 Supplier Power',
        description: 'Ability of suppliers to increase prices or reduce quality',
        color: 'purple'
      },
      threatOfNewEntrants: {
        title: '🚪 Threat of New Entrants',
        description: 'Ease with which new competitors can enter the market',
        color: 'orange'
      },
      threatOfSubstitutes: {
        title: '🔄 Threat of Substitutes',
        description: 'Availability of alternative solutions',
        color: 'teal'
      }
    };

    return (
      <Box p={6}>
        <VStack align="stretch" spacing={6}>
          {/* Header */}
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                🏢 Porter's Five Forces Analysis
              </Text>
              <Text color="gray.600">
                Industry analysis with competitive intelligence and strategic recommendations
              </Text>
            </VStack>
            <HStack>
              <Button 
                colorScheme="blue" 
                size="md"
                onClick={() => {
                  const analysisData = {
                    industry: industryData.industryName,
                    attractiveness: industryData.attractivenessScore,
                    forces: Object.keys(portersFiveForcesData).map(key => ({
                      force: key,
                      intensity: (portersFiveForcesData as any)[key].intensity,
                      factors: (portersFiveForcesData as any)[key].factors
                    }))
                  };
                  const dataStr = JSON.stringify(analysisData, null, 2);
                  const dataBlob = new Blob([dataStr], {type: 'application/json'});
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `porters-five-forces-${industryData.industryName.replace(/\s+/g, '-').toLowerCase()}.json`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
              >
                📊 Export Analysis
              </Button>
              <Button 
                variant="outline" 
                size="md"
                onClick={() => {
                  // Simulate industry data update
                  const newGrowthRate = `${(Math.random() * 10 + 2).toFixed(1)}% YoY`;
                  const newMarketSize = `$${(Math.random() * 500 + 100).toFixed(0)}B`;
                  const newScore = Math.floor(Math.random() * 4) + 6; // 6-10 range
                  
                  setIndustryData(prev => ({
                    ...prev,
                    growthRate: newGrowthRate,
                    marketSize: newMarketSize,
                    attractivenessScore: newScore,
                    competitiveIntensity: Math.floor(Math.random() * 3) + 7, // 7-9 range
                    lastUpdated: new Date().toISOString()
                  }));
                  
                  alert(`Industry data updated! New attractiveness score: ${newScore}/10`);
                }}
              >
                🔄 Update Industry Data
              </Button>
            </HStack>
          </HStack>

          {/* Industry Overview Banner */}
          <Alert status="info">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <HStack spacing={4}>
                <Text fontSize="sm" fontWeight="semibold">Industry: {industryData.industryName}</Text>
                <Badge colorScheme="blue">{industryData.marketSize} Market</Badge>
                <Badge colorScheme="green">{industryData.growthRate}</Badge>
                <Badge colorScheme="purple">Attractiveness: {industryData.attractivenessScore}/10</Badge>
              </HStack>
              <Text fontSize="xs">Analysis updated with real-time competitive intelligence and process integration</Text>
            </VStack>
          </Alert>

          {/* Tab Navigation */}
          <HStack spacing={1} bg="gray.50" p={2} borderRadius="lg" overflowX="auto">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'solid' : 'ghost'}
                colorScheme={activeTab === tab.id ? 'blue' : 'gray'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                minWidth="fit-content"
                flexShrink={0}
              >
                {tab.icon} {tab.name}
              </Button>
            ))}
          </HStack>

          {/* Content Area */}
          <Box bg="white" borderRadius="lg" border="1px" borderColor="gray.200" minHeight="700px">
            {activeTab === 'analysis' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">🏢 Five Forces Competitive Analysis</Text>
                  
                  {/* Forces Overview */}
                  <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                    {Object.entries(forcesAnalysis).map(([forceKey, forceData]) => (
                      <Card
                        key={forceKey}
                        border="2px"
                        borderColor={`${getIntensityColor(forceData.intensity)}.200`}
                        bg={`${getIntensityColor(forceData.intensity)}.50`}
                        cursor="pointer"
                        onClick={() => setSelectedForce({ key: forceKey, ...forceData })}
                        _hover={{ shadow: 'lg', borderColor: `${getIntensityColor(forceData.intensity)}.400` }}
                      >
                        <CardBody>
                          <VStack spacing={3}>
                            <Text fontSize="sm" fontWeight="bold" color={`${(forceDetails as any)[forceKey].color}.700`} textAlign="center">
                              {(forceDetails as any)[forceKey].title}
                            </Text>
                            <Text fontSize="2xl" fontWeight="bold" color={`${getIntensityColor(forceData.intensity)}.600`}>
                              {forceData.intensity}/10
                            </Text>
                            <Badge colorScheme={getIntensityColor(forceData.intensity)}>
                              {forceData.intensity >= 8 ? 'Very High' :
                               forceData.intensity >= 6 ? 'High' :
                               forceData.intensity >= 4 ? 'Medium' : 'Low'} Intensity
                            </Badge>
                            <Text fontSize="xs" color="gray.600" textAlign="center">
                              {(forceDetails as any)[forceKey].description}
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>

                  {/* Detailed Force Analysis */}
                  {selectedForce && (
                    <Card border="2px" borderColor="blue.200" bg="blue.50">
                      <CardHeader>
                        <HStack justify="space-between">
                          <Text fontSize="xl" fontWeight="bold" color="blue.700">
                            🔍 Detailed Analysis: {(forceDetails as any)[selectedForce.key].title}
                          </Text>
                          <Button size="sm" onClick={() => setSelectedForce(null)}>✕</Button>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={6}>
                          {/* Force Factors */}
                          <Box>
                            <Text fontSize="lg" fontWeight="semibold" color="blue.700" mb={4}>
                              📊 Analysis Factors
                            </Text>
                            <VStack align="stretch" spacing={3}>
                              {selectedForce.factors.map((factor: any, index: number) => (
                                <Box key={index} p={4} bg="white" borderRadius="md" border="1px" borderColor="gray.200">
                                  <Grid templateColumns="1fr 100px" gap={4}>
                                    <VStack align="start" spacing={2}>
                                      <HStack justify="space-between" width="100%">
                                        <Text fontSize="md" fontWeight="bold">{factor.factor}</Text>
                                        <Badge size="sm" variant="outline">{factor.weight} Weight</Badge>
                                      </HStack>
                                      <Text fontSize="sm" color="gray.600">{factor.description}</Text>
                                    </VStack>
                                    <VStack spacing={2}>
                                      <Text fontSize="2xl" fontWeight="bold" color={`${getScoreColor(factor.score)}.600`}>
                                        {factor.score}/10
                                      </Text>
                                      <Badge size="sm" colorScheme={getScoreColor(factor.score)}>
                                        {factor.score >= 8 ? 'High' :
                                         factor.score >= 6 ? 'Medium' :
                                         factor.score >= 4 ? 'Low' : 'Very Low'}
                                      </Badge>
                                    </VStack>
                                  </Grid>
                                </Box>
                              ))}
                            </VStack>
                          </Box>

                          {/* Strategic Implications */}
                          <Box>
                            <Text fontSize="lg" fontWeight="semibold" color="green.700" mb={4}>
                              🎯 Strategic Implications
                            </Text>
                            <VStack align="stretch" spacing={2}>
                              {selectedForce.strategicImplications.map((implication: string, index: number) => (
                                <HStack key={index} p={3} bg="green.50" borderRadius="md">
                                  <Text fontSize="sm" color="green.600">✓</Text>
                                  <Text fontSize="sm" color="green.700">{implication}</Text>
                                </HStack>
                              ))}
                            </VStack>
                          </Box>

                          {/* Process Integration */}
                          <Box>
                            <Text fontSize="lg" fontWeight="semibold" color="purple.700" mb={4}>
                              🔗 Process Integration Links
                            </Text>
                            <VStack align="stretch" spacing={2}>
                              {selectedForce.processLinks.map((link: any, index: number) => (
                                <Box key={index} p={3} bg="purple.50" borderRadius="md">
                                  <VStack align="start" spacing={1}>
                                    <Text fontSize="sm" fontWeight="bold" color="purple.700">
                                      📋 {link.process}
                                    </Text>
                                    <Text fontSize="sm" color="purple.600">{link.impact}</Text>
                                  </VStack>
                                </Box>
                              ))}
                            </VStack>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  )}

                  {/* Overall Attractiveness Assessment */}
                  <Card border="1px" borderColor="gray.200">
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="semibold">📊 Industry Attractiveness Assessment</Text>
                    </CardHeader>
                    <CardBody>
                      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <VStack align="start" spacing={4}>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">Overall Score Breakdown</Text>
                          <VStack align="stretch" spacing={3} width="100%">
                            {Object.entries(forcesAnalysis).map(([forceKey, forceData]) => (
                              <Box key={forceKey}>
                                <HStack justify="space-between" mb={2}>
                                  <Text fontSize="sm" color="gray.700">
                                    {forceDetails[forceKey].title.split(' ').slice(1).join(' ')}
                                  </Text>
                                  <Text fontSize="sm" fontWeight="bold" color={`${getIntensityColor(forceData.intensity)}.600`}>
                                    {forceData.intensity}/10
                                  </Text>
                                </HStack>
                                <Box bg="gray.100" borderRadius="full" height="6px">
                                  <Box 
                                    bg={`${getIntensityColor(forceData.intensity)}.500`} 
                                    height="6px" 
                                    width={`${forceData.intensity * 10}%`} 
                                    borderRadius="full" 
                                  />
                                </Box>
                              </Box>
                            ))}
                          </VStack>
                        </VStack>

                        <VStack align="start" spacing={4}>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">Strategic Recommendation</Text>
                          <Box p={4} bg="blue.50" borderRadius="md" width="100%">
                            <VStack align="start" spacing={3}>
                              <HStack>
                                <Text fontSize="lg" fontWeight="bold" color="blue.700">
                                  Industry Attractiveness: {industryData.attractivenessScore}/10
                                </Text>
                                <Badge colorScheme="blue" size="lg">Attractive</Badge>
                              </HStack>
                              <Text fontSize="sm" color="blue.600">
                                Despite high competitive rivalry, strong growth rate and moderate supplier power make this an attractive industry.
                                Focus on differentiation through process integration and build strong customer switching costs.
                              </Text>
                              <HStack spacing={2}>
                                <Badge colorScheme="green" variant="subtle">Growth Opportunity</Badge>
                                <Badge colorScheme="yellow" variant="subtle">Competitive Pressure</Badge>
                                <Badge colorScheme="blue" variant="subtle">Market Expansion</Badge>
                              </HStack>
                            </VStack>
                          </Box>
                        </VStack>
                      </Grid>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>
            )}

            {activeTab === 'strategic' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">🎯 Strategic Recommendations & Action Plan</Text>
                  
                  {/* Strategic Priorities */}
                  <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                    <Card border="2px" borderColor="red.200" bg="red.50">
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color="red.700">
                          🛡️ Competitive Defense Strategy
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            High competitive rivalry requires strong defensive positioning
                          </Text>
                          {[
                            'Build unique process integration moat',
                            'Increase customer switching costs through deep integration',
                            'Focus on niche markets with specific needs',
                            'Accelerate AI development for differentiation'
                          ].map((strategy, index) => (
                            <HStack key={index} p={3} bg="white" borderRadius="md">
                              <Box w="20px" h="20px" bg="red.500" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                                <Text fontSize="xs" color="white" fontWeight="bold">{index + 1}</Text>
                              </Box>
                              <Text fontSize="sm" color="red.700">{strategy}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card border="2px" borderColor="blue.200" bg="blue.50">
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color="blue.700">
                          💪 Market Position Enhancement
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            Leverage moderate buyer power and supplier advantages
                          </Text>
                          {[
                            'Develop tiered pricing for different segments',
                            'Create enterprise partnership program',
                            'Build multi-cloud infrastructure strategy',
                            'Establish thought leadership in process optimization'
                          ].map((strategy, index) => (
                            <HStack key={index} p={3} bg="white" borderRadius="md">
                              <Box w="20px" h="20px" bg="blue.500" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                                <Text fontSize="xs" color="white" fontWeight="bold">{index + 1}</Text>
                              </Box>
                              <Text fontSize="sm" color="blue.700">{strategy}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card border="2px" borderColor="orange.200" bg="orange.50">
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color="orange.700">
                          🚧 Entry Barrier Construction
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            High threat of new entrants requires strong barriers
                          </Text>
                          {[
                            'Build network effects through ecosystem',
                            'Create proprietary data advantages',
                            'Establish industry partnerships',
                            'Patent key process innovations'
                          ].map((strategy, index) => (
                            <HStack key={index} p={3} bg="white" borderRadius="md">
                              <Box w="20px" h="20px" bg="orange.500" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                                <Text fontSize="xs" color="white" fontWeight="bold">{index + 1}</Text>
                              </Box>
                              <Text fontSize="sm" color="orange.700">{strategy}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card border="2px" borderColor="teal.200" bg="teal.50">
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color="teal.700">
                          🔄 Substitute Defense
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <Text fontSize="sm" color="gray.600" mb={2}>
                            Medium-high substitute threat requires clear value proposition
                          </Text>
                          {[
                            'Demonstrate ROI superiority over Excel/manual methods',
                            'Focus on complex use cases substitutes cannot handle',
                            'Build integrated workflow ecosystem',
                            'Provide superior user experience and support'
                          ].map((strategy, index) => (
                            <HStack key={index} p={3} bg="white" borderRadius="md">
                              <Box w="20px" h="20px" bg="teal.500" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                                <Text fontSize="xs" color="white" fontWeight="bold">{index + 1}</Text>
                              </Box>
                              <Text fontSize="sm" color="teal.700">{strategy}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  </Grid>

                  {/* Implementation Roadmap */}
                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="semibold">🗺️ Strategic Implementation Roadmap</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={6}>
                        {[
                          {
                            phase: 'Phase 1: Immediate (0-6 months)',
                            color: 'red',
                            initiatives: [
                              'Launch AI automation acceleration program',
                              'Implement process integration differentiation',
                              'Establish enterprise partnership program',
                              'Begin building proprietary data moats'
                            ]
                          },
                          {
                            phase: 'Phase 2: Short-term (6-18 months)',
                            color: 'orange',
                            initiatives: [
                              'Deploy multi-cloud infrastructure strategy',
                              'Launch tiered pricing and market segmentation',
                              'Establish thought leadership platform',
                              'Build network effects and ecosystem'
                            ]
                          },
                          {
                            phase: 'Phase 3: Medium-term (18-36 months)',
                            color: 'green',
                            initiatives: [
                              'Scale market expansion into new segments',
                              'Expand strategic partnership network',
                              'Leverage patent portfolio for competitive advantage',
                              'Achieve industry leadership position'
                            ]
                          }
                        ].map((phase, index) => (
                          <Box key={index} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                            <VStack align="stretch" spacing={3}>
                              <HStack>
                                <Badge colorScheme={phase.color} size="lg" variant="solid">
                                  {phase.phase}
                                </Badge>
                              </HStack>
                              <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                                {phase.initiatives.map((initiative, i) => (
                                  <HStack key={i} p={3} bg={`${phase.color}.50`} borderRadius="md">
                                    <Box w="6px" h="6px" bg={`${phase.color}.500`} borderRadius="full" />
                                    <Text fontSize="sm" color={`${phase.color}.700`}>{initiative}</Text>
                                  </HStack>
                                ))}
                              </Grid>
                            </VStack>
                          </Box>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
    );
  }; */

  // Comprehensive SWOT Analysis Component - COMMENTED OUT, USING EXTERNAL COMPONENT
  /* const ComprehensiveSWOTAnalysis = () => {
    const [activeTab, setActiveTab] = React.useState('analysis');
    const [selectedQuadrant, setSelectedQuadrant] = React.useState<any>(null);
    const [swotData, setSwotData] = React.useState({
      strengths: [
        {
          id: 1,
          title: 'Automated Document Processing',
          description: 'AI-powered document verification reducing processing time by 75%',
          impact: 'High',
          confidence: 95,
          source: 'Process Analysis',
          relatedProcess: 'Customer Onboarding',
          strategicValue: 'Cost Leadership & Differentiation',
          metrics: { timeSaving: '18 hours/day', costSaving: '$15K/month' }
        },
        {
          id: 2,
          title: 'Integrated Lead-to-Customer Flow',
          description: 'Seamless pipeline with 23% higher conversion rates than industry average',
          impact: 'High',
          confidence: 88,
          source: 'Market Benchmarking',
          relatedProcess: 'Lead Generation',
          strategicValue: 'Revenue Growth',
          metrics: { conversionRate: '+23%', revenueImpact: '$45K/month' }
        },
        {
          id: 3,
          title: 'Rapid Product Development Cycle',
          description: '40% faster time-to-market with 92% process efficiency',
          impact: 'Medium',
          confidence: 92,
          source: 'Internal Data',
          relatedProcess: 'Product Development',
          strategicValue: 'Innovation Leadership',
          metrics: { timeToMarket: '-40%', innovationIndex: '8.5/10' }
        },
        {
          id: 4,
          title: 'Strong Financial Position',
          description: 'Healthy cash flow and 15% above-industry profit margins',
          impact: 'High',
          confidence: 94,
          source: 'Financial Analysis',
          relatedProcess: 'Financial Management',
          strategicValue: 'Financial Stability',
          metrics: { profitMargin: '+15%', cashFlow: 'Positive' }
        }
      ],
      weaknesses: [
        {
          id: 1,
          title: 'Manual Verification Dependency',
          description: 'Critical bottleneck in document verification causing 24-hour delays',
          impact: 'High',
          confidence: 96,
          source: 'Process Analysis',
          relatedProcess: 'Customer Onboarding',
          strategicThreat: 'Customer Satisfaction Risk',
          metrics: { delayTime: '24 hours', satisfactionImpact: '-12%' }
        },
        {
          id: 2,
          title: 'Lead Qualification Inconsistency',
          description: 'Subjective criteria leading to 12% error rate in lead scoring',
          impact: 'Medium',
          confidence: 87,
          source: 'Quality Analysis',
          relatedProcess: 'Lead Generation',
          strategicThreat: 'Revenue Leakage',
          metrics: { errorRate: '12%', lostRevenue: '$8K/month' }
        },
        {
          id: 3,
          title: 'Limited Market Intelligence',
          description: 'Reactive rather than proactive market analysis capabilities',
          impact: 'Medium',
          confidence: 78,
          source: 'Competitive Analysis',
          relatedProcess: 'Market Research',
          strategicThreat: 'Competitive Disadvantage',
          metrics: { responseTime: '+3 weeks', marketShare: 'At risk' }
        },
        {
          id: 4,
          title: 'Regulatory Approval Bottleneck',
          description: 'External dependency causing 8-week delays in product launches',
          impact: 'High',
          confidence: 89,
          source: 'Process Analysis',
          relatedProcess: 'Product Development',
          strategicThreat: 'Time-to-Market Risk',
          metrics: { delayWeeks: '8 weeks', opportunityCost: '$25K/week' }
        }
      ],
      opportunities: [
        {
          id: 1,
          title: 'AI Automation Expansion',
          description: 'Machine learning can automate 67% of manual processes',
          impact: 'High',
          confidence: 85,
          source: 'Technology Assessment',
          marketSize: '$2.3M automation market',
          timeframe: '6-12 months',
          strategicFit: 'High - Aligns with efficiency goals',
          metrics: { automationPotential: '67%', costReduction: '$156K/year' }
        },
        {
          id: 2,
          title: 'Market Expansion to SME Segment',
          description: 'Underserved small-medium enterprises with 15% growth rate',
          impact: 'High',
          confidence: 78,
          source: 'Market Research',
          marketSize: '$450M addressable market',
          timeframe: '9-18 months',
          strategicFit: 'Medium - Requires new capabilities',
          metrics: { marketGrowth: '15% CAGR', revenueOpportunity: '$50M' }
        },
        {
          id: 3,
          title: 'Strategic Partnerships',
          description: 'Integration with complementary service providers',
          impact: 'Medium',
          confidence: 72,
          source: 'Partnership Analysis',
          marketSize: '$180M partnership ecosystem',
          timeframe: '3-9 months',
          strategicFit: 'High - Leverages existing strengths',
          metrics: { partnerNetwork: '25+ potential', revenueShare: '20%' }
        },
        {
          id: 4,
          title: 'Digital Platform Strategy',
          description: 'Self-service platform for smaller clients with scalable pricing',
          impact: 'High',
          confidence: 81,
          source: 'Digital Strategy',
          marketSize: '$320M digital services market',
          timeframe: '12-24 months',
          strategicFit: 'High - Technology advantage',
          metrics: { scalability: '10x capacity', marginImprovement: '+25%' }
        }
      ],
      threats: [
        {
          id: 1,
          title: 'Competitive Automation Race',
          description: 'Major competitors investing heavily in AI and automation',
          impact: 'High',
          confidence: 91,
          source: 'Competitive Intelligence',
          timeframe: '6-12 months',
          likelihood: 'Very High',
          strategicResponse: 'Accelerate automation initiatives',
          metrics: { competitorInvestment: '$50M+', marketShareRisk: '15%' }
        },
        {
          id: 2,
          title: 'Regulatory Changes',
          description: 'New compliance requirements may impact operational processes',
          impact: 'Medium',
          confidence: 67,
          source: 'Regulatory Monitoring',
          timeframe: '12-18 months',
          likelihood: 'Medium',
          strategicResponse: 'Proactive compliance program',
          metrics: { complianceCost: '$125K', implementationTime: '6 months' }
        },
        {
          id: 3,
          title: 'Economic Downturn Impact',
          description: 'Market contraction could affect client spending and growth',
          impact: 'High',
          confidence: 73,
          source: 'Economic Analysis',
          timeframe: '3-12 months',
          likelihood: 'Medium',
          strategicResponse: 'Diversification and cost optimization',
          metrics: { revenueRisk: '25%', clientChurn: '+8%' }
        },
        {
          id: 4,
          title: 'Talent Acquisition Challenges',
          description: 'Skills shortage in AI and automation technologies',
          impact: 'Medium',
          confidence: 84,
          source: 'HR Analysis',
          timeframe: 'Ongoing',
          likelihood: 'High',
          strategicResponse: 'Skills development and retention programs',
          metrics: { vacancyRate: '23%', salaryInflation: '+15%' }
        }
      ]
    });

    const tabs = [
      { id: 'analysis', name: 'SWOT Analysis', icon: '⚖️' },
      { id: 'matrix', name: 'Strategic Matrix', icon: '📊' },
      { id: 'action-plan', name: 'Action Planning', icon: '🎯' },
      { id: 'integration', name: 'Process Integration', icon: '🔗' },
      { id: 'monitoring', name: 'Progress Tracking', icon: '📈' }
    ];

    const getImpactColor = (impact) => {
      switch (impact) {
        case 'High': return 'red';
        case 'Medium': return 'yellow';
        case 'Low': return 'green';
        default: return 'gray';
      }
    };

    const getConfidenceColor = (confidence) => {
      if (confidence >= 85) return 'green';
      if (confidence >= 70) return 'yellow';
      return 'red';
    };

    return (
      <Box p={6}>
        <VStack align="stretch" spacing={6}>
          {/* Header */}
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="green.600">
                ⚖️ Comprehensive SWOT Analysis
              </Text>
              <Text color="gray.600">
                Strategic analysis with process integration and competitive intelligence
              </Text>
            </VStack>
            <HStack>
              <Button colorScheme="green" size="md">
                📊 Export Analysis
              </Button>
              <Button variant="outline" size="md">
                🔄 Refresh Data
              </Button>
            </HStack>
          </VStack>

          {/* Tab Navigation */}
          <HStack spacing={1} bg="gray.50" p={2} borderRadius="lg" overflowX="auto">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'solid' : 'ghost'}
                colorScheme={activeTab === tab.id ? 'green' : 'gray'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                minWidth="fit-content"
                flexShrink={0}
              >
                {tab.icon} {tab.name}
              </Button>
            ))}
          </HStack>

          {/* Content Area */}
          <Box bg="white" borderRadius="lg" border="1px" borderColor="gray.200" minHeight="700px">
            {activeTab === 'analysis' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">⚖️ SWOT Analysis Dashboard</Text>
                  
                  {/* SWOT Grid */}
                  <Grid templateColumns="repeat(2, 1fr)" gap={6} minHeight="600px">
                    {/* Strengths Quadrant */}
                    <Card border="2px" borderColor="green.200" bg="green.50">
                      <CardHeader pb={3}>
                        <HStack justify="space-between">
                          <Text fontSize="lg" fontWeight="bold" color="green.700">
                            💪 Strengths ({swotData.strengths.length})
                          </Text>
                          <Badge colorScheme="green" variant="subtle">Internal & Positive</Badge>
                        </HStack>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack align="stretch" spacing={3} maxHeight="400px" overflowY="auto">
                          {swotData.strengths.map(item => (
                            <Box
                              key={item.id}
                              p={3}
                              bg="white"
                              borderRadius="md"
                              border="1px"
                              borderColor="green.200"
                              cursor="pointer"
                              onClick={() => setSelectedQuadrant(item)}
                              _hover={{ borderColor: 'green.400', shadow: 'md' }}
                            >
                              <VStack align="start" spacing={2}>
                                <HStack justify="space-between" width="100%">
                                  <Text fontSize="sm" fontWeight="bold" color="green.700">{item.title}</Text>
                                  <Badge size="xs" colorScheme={getImpactColor(item.impact)}>
                                    {item.impact}
                                  </Badge>
                                </HStack>
                                <Text fontSize="xs" color="gray.600">{item.description}</Text>
                                <HStack spacing={4} width="100%">
                                  <VStack spacing={0} align="start">
                                    <Text fontSize="xs" color="gray.500">Confidence</Text>
                                    <Text fontSize="xs" fontWeight="bold" color={`${getConfidenceColor(item.confidence)}.600`}>
                                      {item.confidence}%
                                    </Text>
                                  </VStack>
                                  <VStack spacing={0} align="start">
                                    <Text fontSize="xs" color="gray.500">Source</Text>
                                    <Text fontSize="xs" fontWeight="bold">{item.source}</Text>
                                  </VStack>
                                </HStack>
                                {item.metrics && (
                                  <Box bg="green.100" p={2} borderRadius="sm" width="100%">
                                    <HStack spacing={3}>
                                      {Object.entries(item.metrics).map(([key, value]) => (
                                        <VStack key={key} spacing={0} align="start">
                                          <Text fontSize="xs" color="green.700" fontWeight="semibold">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                          </Text>
                                          <Text fontSize="xs" color="green.600">{value}</Text>
                                        </VStack>
                                      ))}
                                    </HStack>
                                  </Box>
                                )}
                              </VStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Weaknesses Quadrant */}
                    <Card border="2px" borderColor="red.200" bg="red.50">
                      <CardHeader pb={3}>
                        <HStack justify="space-between">
                          <Text fontSize="lg" fontWeight="bold" color="red.700">
                            ⚠️ Weaknesses ({swotData.weaknesses.length})
                          </Text>
                          <Badge colorScheme="red" variant="subtle">Internal & Negative</Badge>
                        </HStack>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack align="stretch" spacing={3} maxHeight="400px" overflowY="auto">
                          {swotData.weaknesses.map(item => (
                            <Box
                              key={item.id}
                              p={3}
                              bg="white"
                              borderRadius="md"
                              border="1px"
                              borderColor="red.200"
                              cursor="pointer"
                              onClick={() => setSelectedQuadrant(item)}
                              _hover={{ borderColor: 'red.400', shadow: 'md' }}
                            >
                              <VStack align="start" spacing={2}>
                                <HStack justify="space-between" width="100%">
                                  <Text fontSize="sm" fontWeight="bold" color="red.700">{item.title}</Text>
                                  <Badge size="xs" colorScheme={getImpactColor(item.impact)}>
                                    {item.impact}
                                  </Badge>
                                </HStack>
                                <Text fontSize="xs" color="gray.600">{item.description}</Text>
                                <HStack spacing={4} width="100%">
                                  <VStack spacing={0} align="start">
                                    <Text fontSize="xs" color="gray.500">Confidence</Text>
                                    <Text fontSize="xs" fontWeight="bold" color={`${getConfidenceColor(item.confidence)}.600`}>
                                      {item.confidence}%
                                    </Text>
                                  </VStack>
                                  <VStack spacing={0} align="start">
                                    <Text fontSize="xs" color="gray.500">Risk Level</Text>
                                    <Text fontSize="xs" fontWeight="bold" color="red.600">{item.strategicThreat}</Text>
                                  </VStack>
                                </HStack>
                                {item.metrics && (
                                  <Box bg="red.100" p={2} borderRadius="sm" width="100%">
                                    <HStack spacing={3}>
                                      {Object.entries(item.metrics).map(([key, value]) => (
                                        <VStack key={key} spacing={0} align="start">
                                          <Text fontSize="xs" color="red.700" fontWeight="semibold">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                          </Text>
                                          <Text fontSize="xs" color="red.600">{value}</Text>
                                        </VStack>
                                      ))}
                                    </HStack>
                                  </Box>
                                )}
                              </VStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Opportunities Quadrant */}
                    <Card border="2px" borderColor="blue.200" bg="blue.50">
                      <CardHeader pb={3}>
                        <HStack justify="space-between">
                          <Text fontSize="lg" fontWeight="bold" color="blue.700">
                            🚀 Opportunities ({swotData.opportunities.length})
                          </Text>
                          <Badge colorScheme="blue" variant="subtle">External & Positive</Badge>
                        </HStack>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack align="stretch" spacing={3} maxHeight="400px" overflowY="auto">
                          {swotData.opportunities.map(item => (
                            <Box
                              key={item.id}
                              p={3}
                              bg="white"
                              borderRadius="md"
                              border="1px"
                              borderColor="blue.200"
                              cursor="pointer"
                              onClick={() => setSelectedQuadrant(item)}
                              _hover={{ borderColor: 'blue.400', shadow: 'md' }}
                            >
                              <VStack align="start" spacing={2}>
                                <HStack justify="space-between" width="100%">
                                  <Text fontSize="sm" fontWeight="bold" color="blue.700">{item.title}</Text>
                                  <Badge size="xs" colorScheme={getImpactColor(item.impact)}>
                                    {item.impact}
                                  </Badge>
                                </HStack>
                                <Text fontSize="xs" color="gray.600">{item.description}</Text>
                                <HStack spacing={4} width="100%">
                                  <VStack spacing={0} align="start">
                                    <Text fontSize="xs" color="gray.500">Market Size</Text>
                                    <Text fontSize="xs" fontWeight="bold" color="blue.600">{item.marketSize}</Text>
                                  </VStack>
                                  <VStack spacing={0} align="start">
                                    <Text fontSize="xs" color="gray.500">Timeframe</Text>
                                    <Text fontSize="xs" fontWeight="bold">{item.timeframe}</Text>
                                  </VStack>
                                </HStack>
                                {item.metrics && (
                                  <Box bg="blue.100" p={2} borderRadius="sm" width="100%">
                                    <HStack spacing={3}>
                                      {Object.entries(item.metrics).map(([key, value]) => (
                                        <VStack key={key} spacing={0} align="start">
                                          <Text fontSize="xs" color="blue.700" fontWeight="semibold">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                          </Text>
                                          <Text fontSize="xs" color="blue.600">{value}</Text>
                                        </VStack>
                                      ))}
                                    </HStack>
                                  </Box>
                                )}
                              </VStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    {/* Threats Quadrant */}
                    <Card border="2px" borderColor="orange.200" bg="orange.50">
                      <CardHeader pb={3}>
                        <HStack justify="space-between">
                          <Text fontSize="lg" fontWeight="bold" color="orange.700">
                            ⚡ Threats ({swotData.threats.length})
                          </Text>
                          <Badge colorScheme="orange" variant="subtle">External & Negative</Badge>
                        </HStack>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack align="stretch" spacing={3} maxHeight="400px" overflowY="auto">
                          {swotData.threats.map(item => (
                            <Box
                              key={item.id}
                              p={3}
                              bg="white"
                              borderRadius="md"
                              border="1px"
                              borderColor="orange.200"
                              cursor="pointer"
                              onClick={() => setSelectedQuadrant(item)}
                              _hover={{ borderColor: 'orange.400', shadow: 'md' }}
                            >
                              <VStack align="start" spacing={2}>
                                <HStack justify="space-between" width="100%">
                                  <Text fontSize="sm" fontWeight="bold" color="orange.700">{item.title}</Text>
                                  <Badge size="xs" colorScheme={getImpactColor(item.impact)}>
                                    {item.impact}
                                  </Badge>
                                </HStack>
                                <Text fontSize="xs" color="gray.600">{item.description}</Text>
                                <HStack spacing={4} width="100%">
                                  <VStack spacing={0} align="start">
                                    <Text fontSize="xs" color="gray.500">Likelihood</Text>
                                    <Text fontSize="xs" fontWeight="bold" color="orange.600">{item.likelihood}</Text>
                                  </VStack>
                                  <VStack spacing={0} align="start">
                                    <Text fontSize="xs" color="gray.500">Response</Text>
                                    <Text fontSize="xs" fontWeight="bold">{item.strategicResponse}</Text>
                                  </VStack>
                                </HStack>
                                {item.metrics && (
                                  <Box bg="orange.100" p={2} borderRadius="sm" width="100%">
                                    <HStack spacing={3}>
                                      {Object.entries(item.metrics).map(([key, value]) => (
                                        <VStack key={key} spacing={0} align="start">
                                          <Text fontSize="xs" color="orange.700" fontWeight="semibold">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                          </Text>
                                          <Text fontSize="xs" color="orange.600">{value}</Text>
                                        </VStack>
                                      ))}
                                    </HStack>
                                  </Box>
                                )}
                              </VStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  </Grid>
                </VStack>
              </Box>
            )}

            {activeTab === 'matrix' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">📊 Strategic Matrix & Priority Analysis</Text>
                  
                  {/* Strategic Combinations */}
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color="purple.600">
                          🎯 SO Strategies (Strengths + Opportunities)
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <Box p={3} bg="purple.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="purple.700" mb={2}>
                              Leverage AI Automation for Market Expansion
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Use our automated document processing strength to capture SME market opportunity
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="purple">High Priority</Badge>
                              <Badge size="xs" variant="outline">6-12 months</Badge>
                            </HStack>
                          </Box>
                          
                          <Box p={3} bg="purple.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="purple.700" mb={2}>
                              Digital Platform Strategy
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Transform integrated lead-to-customer flow into scalable digital platform
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="purple">Medium Priority</Badge>
                              <Badge size="xs" variant="outline">12-24 months</Badge>
                            </HStack>
                          </Box>

                          <Box p={3} bg="purple.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="purple.700" mb={2}>
                              Strategic Partnerships for Rapid Development
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Use rapid product development capability to create partnership integrations
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="purple">High Priority</Badge>
                              <Badge size="xs" variant="outline">3-9 months</Badge>
                            </HStack>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color="red.600">
                          🛡️ ST Strategies (Strengths + Threats)
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <Box p={3} bg="red.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="red.700" mb={2}>
                              Accelerate Automation to Counter Competition
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Use financial strength to invest heavily in AI before competitors gain advantage
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="red">Critical</Badge>
                              <Badge size="xs" variant="outline">Immediate</Badge>
                            </HStack>
                          </Box>

                          <Box p={3} bg="red.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="red.700" mb={2}>
                              Diversification Strategy
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Leverage rapid development to create recession-proof product portfolio
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="red">High Priority</Badge>
                              <Badge size="xs" variant="outline">6-12 months</Badge>
                            </HStack>
                          </Box>

                          <Box p={3} bg="red.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="red.700" mb={2}>
                              Talent Retention Programs
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Use strong financial position to secure top AI talent against market shortages
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="red">Medium Priority</Badge>
                              <Badge size="xs" variant="outline">Ongoing</Badge>
                            </HStack>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color="orange.600">
                          ⚡ WO Strategies (Weaknesses + Opportunities)
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <Box p={3} bg="orange.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="orange.700" mb={2}>
                              AI Investment to Fix Manual Processes
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Address manual verification weakness through AI automation opportunity
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="orange">High Priority</Badge>
                              <Badge size="xs" variant="outline">6-12 months</Badge>
                            </HStack>
                          </Box>

                          <Box p={3} bg="orange.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="orange.700" mb={2}>
                              Market Intelligence Platform
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Develop digital platform with advanced market intelligence capabilities
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="orange">Medium Priority</Badge>
                              <Badge size="xs" variant="outline">12-18 months</Badge>
                            </HStack>
                          </Box>

                          <Box p={3} bg="orange.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="orange.700" mb={2}>
                              Partnership-Driven Lead Quality
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Use strategic partnerships to improve lead qualification through shared data
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="orange">Medium Priority</Badge>
                              <Badge size="xs" variant="outline">9-15 months</Badge>
                            </HStack>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                          🔒 WT Strategies (Weaknesses + Threats)
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <Box p={3} bg="gray.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                              Emergency Process Automation
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Rapidly automate manual processes before competitors exploit weakness
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="gray">Critical</Badge>
                              <Badge size="xs" variant="outline">Immediate</Badge>
                            </HStack>
                          </Box>

                          <Box p={3} bg="gray.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                              Regulatory Compliance Program
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Address regulatory bottleneck before new compliance requirements hit
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="gray">High Priority</Badge>
                              <Badge size="xs" variant="outline">3-6 months</Badge>
                            </HStack>
                          </Box>

                          <Box p={3} bg="gray.50" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold" color="gray.700" mb={2}>
                              Cost Structure Optimization
                            </Text>
                            <Text fontSize="xs" color="gray.600" mb={2}>
                              Fix inefficiencies and prepare for potential economic downturn impact
                            </Text>
                            <HStack>
                              <Badge size="xs" colorScheme="gray">Medium Priority</Badge>
                              <Badge size="xs" variant="outline">6-9 months</Badge>
                            </HStack>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </Grid>
                </VStack>
              </Box>
            )}

            {activeTab === 'action-plan' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">🎯 Strategic Action Plan & Implementation</Text>
                  
                  <Alert status="info">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">12 strategic initiatives identified</Text>
                      <Text fontSize="xs">Prioritized by impact, urgency, and resource requirements</Text>
                    </VStack>
                  </Alert>

                  {/* Priority Action Items */}
                  <VStack align="stretch" spacing={4}>
                    {[
                      {
                        priority: 'Critical',
                        title: 'AI Automation Acceleration Program',
                        description: 'Emergency automation of manual processes to counter competitive threats',
                        timeline: 'Immediate - 6 months',
                        budget: '$250K',
                        resources: ['AI/ML Team', 'Process Engineers', 'Change Management'],
                        kpis: ['67% automation rate', '156 hours/month saved', '$45K/month cost reduction'],
                        risks: ['Implementation complexity', 'Change resistance', 'Technology integration'],
                        dependencies: ['Process mapping completion', 'Technology vendor selection', 'Staff training'],
                        owner: 'CTO',
                        status: 'Planning'
                      },
                      {
                        priority: 'High',
                        title: 'Strategic Partnership Development',
                        description: 'Build complementary partnerships to enhance market position',
                        timeline: '3-9 months',
                        budget: '$75K',
                        resources: ['Business Development', 'Legal Team', 'Integration Specialists'],
                        kpis: ['5+ strategic partnerships', '20% revenue share', '25+ partner network'],
                        risks: ['Partner selection', 'Integration complexity', 'Revenue sharing'],
                        dependencies: ['Market analysis', 'Legal framework', 'Technology readiness'],
                        owner: 'VP Business Development',
                        status: 'Initiation'
                      },
                      {
                        priority: 'High',
                        title: 'Market Intelligence Enhancement',
                        description: 'Develop proactive market analysis capabilities',
                        timeline: '6-12 months', 
                        budget: '$180K',
                        resources: ['Data Science Team', 'Market Analysts', 'Technology Infrastructure'],
                        kpis: ['3-week faster response', '15% market share protection', 'Predictive insights'],
                        risks: ['Data quality', 'Analysis accuracy', 'Technology dependencies'],
                        dependencies: ['Data sources identification', 'Analytics platform', 'Skills development'],
                        owner: 'VP Strategy',
                        status: 'Analysis'
                      },
                      {
                        priority: 'Medium',
                        title: 'Digital Platform Strategy',
                        description: 'Self-service platform for SME market segment',
                        timeline: '12-24 months',
                        budget: '$500K',
                        resources: ['Product Team', 'Engineering', 'UX Design', 'Marketing'],
                        kpis: ['10x scalability', '+25% margin improvement', '$50M revenue opportunity'],
                        risks: ['Market acceptance', 'Technology scalability', 'Competitive response'],
                        dependencies: ['Market research', 'Technology architecture', 'Go-to-market strategy'],
                        owner: 'VP Product',
                        status: 'Conceptual'
                      },
                      {
                        priority: 'Medium',
                        title: 'Regulatory Compliance Program',
                        description: 'Proactive compliance management system',
                        timeline: '3-6 months',
                        budget: '$125K',
                        resources: ['Compliance Team', 'Legal Specialists', 'Process Analysts'],
                        kpis: ['6-month implementation', 'Zero compliance violations', 'Process efficiency'],
                        risks: ['Regulatory changes', 'Implementation costs', 'Process disruption'],
                        dependencies: ['Regulatory analysis', 'Process redesign', 'Staff training'],
                        owner: 'Chief Compliance Officer',
                        status: 'Planning'
                      }
                    ].map((action, index) => (
                      <Card key={index} border="1px" borderColor="gray.200">
                        <CardHeader pb={3}>
                          <HStack justify="space-between">
                            <VStack align="start" spacing={1}>
                              <HStack>
                                <Badge colorScheme={
                                  action.priority === 'Critical' ? 'red' :
                                  action.priority === 'High' ? 'orange' : 'yellow'
                                }>
                                  {action.priority} Priority
                                </Badge>
                                <Text fontSize="lg" fontWeight="bold">{action.title}</Text>
                              </HStack>
                              <Text fontSize="sm" color="gray.600">{action.description}</Text>
                            </VStack>
                            <VStack align="end" spacing={1}>
                              <Badge variant="outline">{action.status}</Badge>
                              <Text fontSize="sm" fontWeight="bold">{action.budget}</Text>
                            </VStack>
                          </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            <VStack align="start" spacing={3}>
                              <Box>
                                <Text fontSize="xs" fontWeight="semibold" color="gray.700" mb={2}>Timeline & Owner</Text>
                                <VStack align="start" spacing={1}>
                                  <Text fontSize="xs" color="gray.600">📅 {action.timeline}</Text>
                                  <Text fontSize="xs" color="gray.600">👤 {action.owner}</Text>
                                </VStack>
                              </Box>
                              
                              <Box>
                                <Text fontSize="xs" fontWeight="semibold" color="gray.700" mb={2}>Resources Required</Text>
                                <VStack align="start" spacing={1}>
                                  {action.resources.slice(0, 3).map(resource => (
                                    <Text key={resource} fontSize="xs" color="gray.600">• {resource}</Text>
                                  ))}
                                </VStack>
                              </Box>
                            </VStack>

                            <VStack align="start" spacing={3}>
                              <Box>
                                <Text fontSize="xs" fontWeight="semibold" color="green.700" mb={2}>Success KPIs</Text>
                                <VStack align="start" spacing={1}>
                                  {action.kpis.slice(0, 3).map(kpi => (
                                    <Text key={kpi} fontSize="xs" color="green.600">✓ {kpi}</Text>
                                  ))}
                                </VStack>
                              </Box>

                              <Box>
                                <Text fontSize="xs" fontWeight="semibold" color="blue.700" mb={2}>Dependencies</Text>
                                <VStack align="start" spacing={1}>
                                  {action.dependencies.slice(0, 2).map(dep => (
                                    <Text key={dep} fontSize="xs" color="blue.600">→ {dep}</Text>
                                  ))}
                                  {action.dependencies.length > 2 && (
                                    <Text fontSize="xs" color="blue.500">+{action.dependencies.length - 2} more</Text>
                                  )}
                                </VStack>
                              </Box>
                            </VStack>

                            <VStack align="start" spacing={3}>
                              <Box>
                                <Text fontSize="xs" fontWeight="semibold" color="red.700" mb={2}>Key Risks</Text>
                                <VStack align="start" spacing={1}>
                                  {action.risks.map(risk => (
                                    <Text key={risk} fontSize="xs" color="red.600">⚠️ {risk}</Text>
                                  ))}
                                </VStack>
                              </Box>

                              <Box>
                                <Button size="sm" colorScheme="blue" width="100%">
                                  📋 View Detailed Plan
                                </Button>
                              </Box>
                            </VStack>
                          </Grid>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
    );
  }; */

  // Strategic Project Integration Hub Component
  const StrategicProjectIntegrationHub = () => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [projects, setProjects] = React.useState([
      {
        id: 1,
        name: "Digital Transformation Initiative",
        status: "active",
        progress: 75,
        team: ["Sarah", "Mike", "Alex"],
        processes: ["Customer Onboarding", "Data Migration", "Staff Training"],
        strategicAlignment: "Blue Ocean Strategy",
        budget: "$250,000",
        timeline: "Q2 2025"
      },
      {
        id: 2,
        name: "Market Expansion Strategy",
        status: "planning",
        progress: 30,
        team: ["Lisa", "John", "Maria"],
        processes: ["Market Research", "Competitive Analysis", "Go-to-Market"],
        strategicAlignment: "Porter's Five Forces",
        budget: "$150,000",
        timeline: "Q3 2025"
      },
      {
        id: 3,
        name: "Operational Excellence Program",
        status: "active",
        progress: 60,
        team: ["David", "Emma", "Chris"],
        processes: ["Process Optimization", "Quality Control", "Performance Metrics"],
        strategicAlignment: "Lean Six Sigma",
        budget: "$100,000",
        timeline: "Q4 2025"
      }
    ]);

    const tabs = [
      { id: 'overview', name: 'Strategic Overview', icon: '🎯' },
      { id: 'projects', name: 'Project Portfolio', icon: '📋' },
      { id: 'resources', name: 'Resource Planning', icon: '👥' },
      { id: 'alignment', name: 'Strategic Alignment', icon: '🎪' },
      { id: 'metrics', name: 'Performance Metrics', icon: '📊' }
    ];

    return (
      <Box p={6}>
        <VStack align="stretch" spacing={6}>
          {/* Header */}
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                🎯 Strategic Project Integration Hub
              </Text>
              <Text color="gray.600">
                Unified strategy, HR, and process management ecosystem
              </Text>
            </VStack>
            <HStack>
              <Button colorScheme="blue" size="md">
                📊 Generate Report
              </Button>
              <Button variant="outline" size="md">
                ⚙️ Settings
              </Button>
            </HStack>
          </VStack>

          {/* Tab Navigation */}
          <HStack spacing={1} bg="gray.50" p={2} borderRadius="lg" overflowX="auto">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'solid' : 'ghost'}
                colorScheme={activeTab === tab.id ? 'blue' : 'gray'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                minWidth="fit-content"
                flexShrink={0}
              >
                {tab.icon} {tab.name}
              </Button>
            ))}
          </HStack>

          {/* Content Area */}
          <Box bg="white" borderRadius="lg" border="1px" borderColor="gray.200" minHeight="600px">
            {activeTab === 'overview' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  {/* Strategic Overview Dashboard */}
                  <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
                    <Card>
                      <CardHeader pb={2}>
                        <Text fontSize="lg" fontWeight="semibold">🎯 Strategy Execution</Text>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack align="stretch" spacing={3}>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Overall Progress</Text>
                            <Text fontSize="sm" fontWeight="bold">68%</Text>
                          </HStack>
                          <Box bg="gray.100" borderRadius="full" height="8px">
                            <Box bg="blue.500" height="8px" width="68%" borderRadius="full" />
                          </Box>
                          <Text fontSize="xs" color="gray.500">3 active projects aligned with strategy</Text>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader pb={2}>
                        <Text fontSize="lg" fontWeight="semibold">👥 Resource Utilization</Text>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack align="stretch" spacing={3}>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Team Capacity</Text>
                            <Text fontSize="sm" fontWeight="bold">85%</Text>
                          </HStack>
                          <Box bg="gray.100" borderRadius="full" height="8px">
                            <Box bg="green.500" height="8px" width="85%" borderRadius="full" />
                          </Box>
                          <Text fontSize="xs" color="gray.500">12 team members across projects</Text>
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader pb={2}>
                        <Text fontSize="lg" fontWeight="semibold">🔄 Process Efficiency</Text>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack align="stretch" spacing={3}>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Process Optimization</Text>
                            <Text fontSize="sm" fontWeight="bold">72%</Text>
                          </HStack>
                          <Box bg="gray.100" borderRadius="full" height="8px">
                            <Box bg="purple.500" height="8px" width="72%" borderRadius="full" />
                          </Box>
                          <Text fontSize="xs" color="gray.500">15 processes mapped and optimized</Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  </Grid>

                  {/* Strategic Alignment Matrix */}
                  <Card>
                    <CardHeader>
                      <Text fontSize="xl" fontWeight="bold">🎪 Strategic Alignment Matrix</Text>
                    </CardHeader>
                    <CardBody>
                      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                        <Box bg="blue.50" p={4} borderRadius="md" border="1px" borderColor="blue.200">
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" fontWeight="bold" color="blue.700">Strategic Frameworks</Text>
                            <Text fontSize="xs" color="blue.600">Blue Ocean Strategy</Text>
                            <Text fontSize="xs" color="blue.600">Porter's Five Forces</Text>
                            <Text fontSize="xs" color="blue.600">Lean Six Sigma</Text>
                          </VStack>
                        </Box>
                        <Box bg="purple.50" p={4} borderRadius="md" border="1px" borderColor="purple.200">
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" fontWeight="bold" color="purple.700">Process Excellence</Text>
                            <Text fontSize="xs" color="purple.600">BPMN Mapping</Text>
                            <Text fontSize="xs" color="purple.600">Process Optimization</Text>
                            <Text fontSize="xs" color="purple.600">Quality Control</Text>
                          </VStack>
                        </Box>
                        <Box bg="cyan.50" p={4} borderRadius="md" border="1px" borderColor="cyan.200">
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" fontWeight="bold" color="cyan.700">HR Integration</Text>
                            <Text fontSize="xs" color="cyan.600">Workforce Planning</Text>
                            <Text fontSize="xs" color="cyan.600">Skills Development</Text>
                            <Text fontSize="xs" color="cyan.600">Performance Management</Text>
                          </VStack>
                        </Box>
                        <Box bg="green.50" p={4} borderRadius="md" border="1px" borderColor="green.200">
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" fontWeight="bold" color="green.700">Project Delivery</Text>
                            <Text fontSize="xs" color="green.600">Timeline Management</Text>
                            <Text fontSize="xs" color="green.600">Budget Control</Text>
                            <Text fontSize="xs" color="green.600">Risk Assessment</Text>
                          </VStack>
                        </Box>
                      </Grid>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>
            )}

            {activeTab === 'projects' && (
              <Box p={6}>
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Text fontSize="xl" fontWeight="bold">📋 Project Portfolio</Text>
                    <Button colorScheme="blue" size="sm">+ New Project</Button>
                  </HStack>
                  
                  {projects.map(project => (
                    <Card key={project.id} border="1px" borderColor="gray.200">
                      <CardHeader pb={2}>
                        <HStack justify="space-between">
                          <VStack align="start" spacing={1}>
                            <Text fontSize="lg" fontWeight="bold">{project.name}</Text>
                            <HStack>
                              <Badge colorScheme={project.status === 'active' ? 'green' : 'orange'}>
                                {project.status}
                              </Badge>
                              <Text fontSize="sm" color="gray.600">{project.timeline}</Text>
                            </HStack>
                          </VStack>
                          <VStack align="end" spacing={1}>
                            <Text fontSize="sm" fontWeight="bold">{project.budget}</Text>
                            <Text fontSize="xs" color="gray.600">{project.progress}% Complete</Text>
                          </VStack>
                        </HStack>
                      </CardHeader>
                      <CardBody pt={0}>
                        <VStack align="stretch" spacing={3}>
                          <Box bg="gray.100" borderRadius="full" height="6px">
                            <Box 
                              bg={project.status === 'active' ? 'green.500' : 'orange.500'} 
                              height="6px" 
                              width={`${project.progress}%`} 
                              borderRadius="full" 
                            />
                          </Box>
                          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                            <Box>
                              <Text fontSize="xs" fontWeight="semibold" color="gray.700" mb={1}>Team Members</Text>
                              <HStack wrap="wrap">
                                {project.team.map(member => (
                                  <Badge key={member} variant="outline" size="sm">{member}</Badge>
                                ))}
                              </HStack>
                            </Box>
                            <Box>
                              <Text fontSize="xs" fontWeight="semibold" color="gray.700" mb={1}>Key Processes</Text>
                              <VStack align="start" spacing={0}>
                                {project.processes.slice(0, 2).map(process => (
                                  <Text key={process} fontSize="xs" color="gray.600">• {process}</Text>
                                ))}
                                {project.processes.length > 2 && (
                                  <Text fontSize="xs" color="blue.500">+ {project.processes.length - 2} more</Text>
                                )}
                              </VStack>
                            </Box>
                            <Box>
                              <Text fontSize="xs" fontWeight="semibold" color="gray.700" mb={1}>Strategy Alignment</Text>
                              <Badge colorScheme="blue" variant="subtle">{project.strategicAlignment}</Badge>
                            </Box>
                          </Grid>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </Box>
            )}

            {activeTab === 'resources' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">👥 Resource Planning Dashboard</Text>
                  
                  <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold">Team Allocation</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          {[
                            { team: 'Digital Transformation', members: 8, utilization: 95 },
                            { team: 'Market Expansion', members: 6, utilization: 70 },
                            { team: 'Operations Excellence', members: 5, utilization: 85 }
                          ].map(team => (
                            <Box key={team.team}>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm" fontWeight="medium">{team.team}</Text>
                                <Text fontSize="sm" color="gray.600">{team.members} members</Text>
                              </HStack>
                              <HStack spacing={2}>
                                <Box bg="gray.100" borderRadius="full" height="6px" flex="1">
                                  <Box 
                                    bg={team.utilization > 90 ? 'red.500' : team.utilization > 75 ? 'yellow.500' : 'green.500'} 
                                    height="6px" 
                                    width={`${team.utilization}%`} 
                                    borderRadius="full" 
                                  />
                                </Box>
                                <Text fontSize="xs" color="gray.600">{team.utilization}%</Text>
                              </HStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold">Skills Matrix</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          {[
                            { skill: 'Project Management', level: 85, demand: 'High' },
                            { skill: 'Process Analysis', level: 78, demand: 'Medium' },
                            { skill: 'Strategic Planning', level: 92, demand: 'High' },
                            { skill: 'Data Analysis', level: 65, demand: 'Growing' }
                          ].map(skill => (
                            <Box key={skill.skill}>
                              <HStack justify="space-between" mb={1}>
                                <Text fontSize="sm" fontWeight="medium">{skill.skill}</Text>
                                <Badge size="sm" colorScheme={skill.demand === 'High' ? 'red' : skill.demand === 'Medium' ? 'yellow' : 'green'}>
                                  {skill.demand}
                                </Badge>
                              </HStack>
                              <Box bg="gray.100" borderRadius="full" height="6px">
                                <Box bg="blue.500" height="6px" width={`${skill.level}%`} borderRadius="full" />
                              </Box>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  </Grid>
                </VStack>
              </Box>
            )}

            {activeTab === 'alignment' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">🎪 Strategic Alignment Analysis</Text>
                  
                  <Alert status="info">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">Strategic Alignment Score: 87%</Text>
                      <Text fontSize="xs">All projects are well-aligned with organizational strategy</Text>
                    </VStack>
                  </Alert>

                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold">Framework Utilization</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          {[
                            { framework: 'Blue Ocean Strategy', projects: 2, effectiveness: 92 },
                            { framework: "Porter's Five Forces", projects: 1, effectiveness: 88 },
                            { framework: 'Lean Six Sigma', projects: 1, effectiveness: 85 },
                            { framework: 'SWOT Analysis', projects: 3, effectiveness: 78 }
                          ].map(fw => (
                            <Box key={fw.framework}>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm" fontWeight="medium">{fw.framework}</Text>
                                <Text fontSize="sm" color="gray.600">{fw.projects} projects</Text>
                              </HStack>
                              <HStack spacing={2}>
                                <Box bg="gray.100" borderRadius="full" height="6px" flex="1">
                                  <Box bg="green.500" height="6px" width={`${fw.effectiveness}%`} borderRadius="full" />
                                </Box>
                                <Text fontSize="xs" color="gray.600">{fw.effectiveness}%</Text>
                              </HStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold">Process Integration</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          {[
                            { process: 'Customer Onboarding', integration: 95, impact: 'High' },
                            { process: 'Data Migration', integration: 82, impact: 'Medium' },
                            { process: 'Staff Training', integration: 78, impact: 'Medium' },
                            { process: 'Market Research', integration: 88, impact: 'High' }
                          ].map(proc => (
                            <Box key={proc.process}>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm" fontWeight="medium">{proc.process}</Text>
                                <Badge size="sm" colorScheme={proc.impact === 'High' ? 'green' : 'yellow'}>
                                  {proc.impact}
                                </Badge>
                              </HStack>
                              <Box bg="gray.100" borderRadius="full" height="6px">
                                <Box bg="purple.500" height="6px" width={`${proc.integration}%`} borderRadius="full" />
                              </Box>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  </Grid>
                </VStack>
              </Box>
            )}

            {activeTab === 'metrics' && (
              <Box p={6}>
                <VStack align="stretch" spacing={6}>
                  <Text fontSize="xl" fontWeight="bold">📊 Performance Metrics Dashboard</Text>
                  
                  <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                    {[
                      { title: 'Strategic Execution', value: '87%', change: '+12%', color: 'green' },
                      { title: 'Resource Efficiency', value: '78%', change: '+8%', color: 'blue' },
                      { title: 'Process Optimization', value: '85%', change: '+15%', color: 'purple' },
                      { title: 'Team Satisfaction', value: '92%', change: '+5%', color: 'cyan' }
                    ].map(metric => (
                      <Card key={metric.title}>
                        <CardBody>
                          <VStack spacing={3}>
                            <Text fontSize="sm" fontWeight="semibold" color="gray.700">{metric.title}</Text>
                            <Text fontSize="2xl" fontWeight="bold" color={`${metric.color}.600`}>{metric.value}</Text>
                            <Badge colorScheme={metric.color} variant="subtle">{metric.change} vs last month</Badge>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>

                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="semibold">Key Performance Indicators</Text>
                    </CardHeader>
                    <CardBody>
                      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <VStack align="stretch" spacing={4}>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">Strategic KPIs</Text>
                          {[
                            { kpi: 'Strategy Implementation Rate', target: 90, actual: 87, unit: '%' },
                            { kpi: 'Framework Adoption', target: 80, actual: 92, unit: '%' },
                            { kpi: 'Project Alignment Score', target: 85, actual: 88, unit: '%' }
                          ].map(item => (
                            <Box key={item.kpi}>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm">{item.kpi}</Text>
                                <Text fontSize="sm" fontWeight="bold" color={item.actual >= item.target ? 'green.600' : 'red.600'}>
                                  {item.actual}{item.unit}
                                </Text>
                              </HStack>
                              <Box bg="gray.100" borderRadius="full" height="4px">
                                <Box 
                                  bg={item.actual >= item.target ? 'green.500' : 'red.500'} 
                                  height="4px" 
                                  width={`${Math.min(item.actual, 100)}%`} 
                                  borderRadius="full" 
                                />
                              </Box>
                            </Box>
                          ))}
                        </VStack>

                        <VStack align="stretch" spacing={4}>
                          <Text fontSize="md" fontWeight="semibold" color="gray.700">Operational KPIs</Text>
                          {[
                            { kpi: 'Process Efficiency', target: 75, actual: 82, unit: '%' },
                            { kpi: 'Resource Utilization', target: 85, actual: 78, unit: '%' },
                            { kpi: 'Quality Score', target: 90, actual: 95, unit: '%' }
                          ].map(item => (
                            <Box key={item.kpi}>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm">{item.kpi}</Text>
                                <Text fontSize="sm" fontWeight="bold" color={item.actual >= item.target ? 'green.600' : 'red.600'}>
                                  {item.actual}{item.unit}
                                </Text>
                              </HStack>
                              <Box bg="gray.100" borderRadius="full" height="4px">
                                <Box 
                                  bg={item.actual >= item.target ? 'green.500' : 'red.500'} 
                                  height="4px" 
                                  width={`${Math.min(item.actual, 100)}%`} 
                                  borderRadius="full" 
                                />
                              </Box>
                            </Box>
                          ))}
                        </VStack>
                      </Grid>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
    );
  };

  // Main content renderer
  const renderCurrentView = () => {
    const renderWithSuspense = (Component: React.ComponentType) => (
      <Suspense fallback={<ChunkLoadingSpinner />}>
        <Component />
      </Suspense>
    );

    switch (currentView) {
      // Core Strategy & Planning (chunked for better performance)
      case 'blue-ocean':
        return renderWithSuspense(ChunkStrategy);
      case 'enhanced-blue-ocean':
        return renderWithSuspense(ChunkStrategy); // Fallback to working component
      case 'strategy-frameworks':
        return renderWithSuspense(ChunkStrategyFrameworks);
      case 'strategic-planning':
        return renderWithSuspense(ChunkStrategicPlanning);
      case 'strategic-journey':
        return renderWithSuspense(ChunkStrategicJourney);
      case 'visual-mapping':
        return renderWithSuspense(ChunkVisualMapping);
      case 'strategic-integration':
        return <StrategicProjectIntegrationHub />; // Inline component - no chunking
      
      // Process Management Suite (chunked)
      case 'organization-process':
        return renderWithSuspense(ChunkOrganizationProcess);
      case 'visual-process-architect':
        return <VisualProcessArchitect />;
      case 'process-management':
        return <ComprehensiveProcessManagement />;
      case 'advanced-process':
        return renderWithSuspense(ChunkAdvancedProcess);
      case 'enhanced-process':
        return renderWithSuspense(ChunkAdvancedProcess); // Fallback to working component
      case 'process-improvement':
        return renderWithSuspense(ChunkProcessImprovement);
      case 'process-analysis':
        return renderWithSuspense(ChunkProcessAnalysis);
      case 'ai-process-logger':
        return renderWithSuspense(ChunkAIProcessLogger);
      
      // Analysis & Intelligence (chunked except core)
      case 'data-pulse':
        return renderWithSuspense(ChunkDataPulse);
      case 'porter':
        return <ComprehensivePortersFiveForces />;
      case 'financial':
        return renderWithSuspense(ChunkFinancialFrameworks);
      case 'comprehensive-financial':
        return renderWithSuspense(ChunkFinancialAnalysis);
      case 'swot-analysis':
        return <ComprehensiveSWOTAnalysis />;
      case 'pestle-analysis':
        return renderWithSuspense(ChunkPESTLEAnalysis);
      
      // Operations & Team Management (chunked)
      case 'project-management':
        return renderWithSuspense(ChunkProjectManagement);
      case 'team-collaboration':
        return renderWithSuspense(ChunkTeamCollaboration);
      case 'team-interaction':
        return renderWithSuspense(ChunkTeamInteraction);
      case 'org-chart':
        return renderWithSuspense(ChunkOrgChart);
      
      // Marketing, Learning & Tools (chunked)
      case 'marketing-automation':
        return renderWithSuspense(ChunkMarketingAutomation);
      case 'startup-stage':
        return renderWithSuspense(ChunkStartupStages);
      case 'hr-module':
        return renderWithSuspense(ChunkHRModule);
      case 'health-monitor':
        return renderWithSuspense(ChunkHealthMonitor);
      case 'integrated-platform':
        return renderWithSuspense(ChunkIntegratedPlatform);
      case 'tutorials':
        return renderWithSuspense(ChunkVideoLibrary);
      
      // Original Core Features (no chunking for best performance)
      case 'mission':
        return <MissionStatementGenerator />;
      case 'execution':
        return <StrategyExecutionTracker />;
      case 'canvas':
        return <BusinessModelCanvasFixed />;
      case 'video':
        return renderWithSuspense(ChunkVideoProduction);
      
      // Mutation System Components (chunked for optimal performance)
      case 'mutation-engine':
        return renderWithSuspense(ChunkMutationEngine);
      case 'collaborative-mutations':
        return renderWithSuspense(ChunkCollaborativeMutations);
      case 'mutation-history':
        return renderWithSuspense(ChunkMutationHistory);
      case 'mutation-analytics':
        return renderWithSuspense(ChunkMutationAnalytics);
      case 'mutable-blue-ocean':
        return renderWithSuspense(ChunkMutableBlueOcean);
      case 'mutable-porter':
        return renderWithSuspense(ChunkMutablePorter);
      case 'mutable-bpmn':
        return renderWithSuspense(ChunkMutableBPMN);
      
      default:
        return renderDashboard();
    }
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        {renderHeader()}
        {isMobile && renderMobileSidebar()}
        <Box>
          {renderCurrentView()}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;