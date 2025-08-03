import React, { useState } from 'react';
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
  useBreakpointValue
} from '@chakra-ui/react';

// Import working components
import MissionStatementGenerator from './components/MissionStatementGenerator';
import InteractivePortersFiveForces from './components/InteractivePortersFiveForces';
import StrategyExecutionTracker from './components/StrategyExecutionTracker';
import BusinessModelCanvasFixed from './components/BusinessModelCanvasFixed';
import HuggingFaceVideoProduction from './components/HuggingFaceVideoProduction';

// Import all missing functionality from previous working model
import ComprehensiveBlueOceanStrategy from './components/ComprehensiveBlueOceanStrategy';
import ProcessImprovementIntelligence from './components/ProcessImprovementIntelligence';
import DataPulseWidget from './components/DataPulseWidget';
import StartupStageSelector from './components/StartupStageSelector';
import StrategyFrameworks from './components/StrategyFrameworks';
import FinancialFrameworks from './components/FinancialFrameworks';
import FrameworkIntegrationHubWithData from './components/FrameworkIntegrationHubWithData';
import SignalComposer from './components/SignalComposer';
import StrategicMarketingAutomation from './components/StrategicMarketingAutomation';
import EnhancedHRModule from './components/EnhancedHRModule';
import TutorialVideoLibrary from './components/TutorialVideoLibrary';

// Import ALL Process Management components that were missing
import AdvancedProcessManagement from './components/AdvancedProcessManagement';
import ProcessManagement from './components/ProcessManagement';
import ProcessImprovement from './components/ProcessImprovement';
import ProcessImprovementWithIntegration from './components/ProcessImprovementWithIntegration';
import ProcessAnalysisFramework from './components/ProcessAnalysisFramework';
import ProjectManagement from './components/ProjectManagement';
import TeamCollaboration from './components/TeamCollaboration';
import TeamInteractionHub from './components/TeamInteractionHub';
import AIProcessLogger from './components/AIProcessLogger';
import OrganizationWideProcessManagement from './components/OrganizationWideProcessManagement';

// Import additional strategic components
import StrategicPlanningModule from './components/StrategicPlanningModule';
import StrategicPlanningIntegration from './components/StrategicPlanningIntegration';
import StrategicJourneyMap from './components/StrategicJourneyMap';
import VisualJourneyMapping from './components/VisualJourneyMapping';
import OrganizationalChartSystem from './components/OrganizationalChartSystem';
import ComprehensiveFinancialAnalysis from './components/ComprehensiveFinancialAnalysis';
import LiveSWOTAnalysis from './components/LiveSWOTAnalysis';
import RealTimePESTLEAnalysis from './components/RealTimePESTLEAnalysis';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userTier] = useState('pro'); // Default to pro for demo
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
        { id: 'strategy-frameworks', name: 'Strategy Frameworks', icon: '📚', desc: 'Complete framework library' },
        { id: 'strategic-planning', name: 'Strategic Planning', icon: '🗺️', desc: 'Comprehensive planning' },
        { id: 'strategic-journey', name: 'Strategic Journey', icon: '🛣️', desc: 'Journey mapping system' },
        { id: 'visual-mapping', name: 'Visual Mapping', icon: '🗺️', desc: 'Visual journey mapping' }
      ]
    },
    {
      title: "🔄 Process Management",
      color: "purple.500",
      items: [
        { id: 'organization-process', name: 'Organization-Wide Process', icon: '🌐', desc: 'Complete organizational process coordination' },
        { id: 'process-management', name: 'Process Management', icon: '🔄', desc: 'BPMN process design' },
        { id: 'advanced-process', name: 'Advanced Process', icon: '🏭', desc: 'AI process optimization' },
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
      case 'process-management':
        items.push({ label: 'Process Management', view: 'process-management', icon: '🔄' });
        break;
      case 'advanced-process':
        items.push({ label: 'Advanced Process', view: 'advanced-process', icon: '🏭' });
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
    }
    
    return items;
  };

  // Mobile navigation handlers
  const handleMobileMenuSelect = (viewId) => {
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
            <Text fontWeight="semibold">🚀 COMPLETE LUCIDRA PLATFORM - ALL 26+ MODULES ACTIVE!</Text>
            <Text fontSize="sm">
              🌊 Blue Ocean • 🗺️ Strategic Planning • 🛣️ Journey Mapping • 🔄 Process Management • 🏭 Advanced Process • ⚙️ Process Intelligence • 📊 Process Analysis • 🤖 AI Logger • 📊 Data Pulse • 🏢 Five Forces • 💰 Financial • 📈 Comprehensive Financial • ⚖️ SWOT • 🌍 PESTLE • 📋 Project Management • 👥 Team Collaboration • 🤝 Team Hub • 🏢 Org Chart • 📧 Marketing • 🚀 Startup Stages • 👥 HR • 📈 Execution • 📋 Canvas • 🎓 Tutorials • 🎥 AI Video
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
      </VStack>
    </Box>
  );

  // Main content renderer
  const renderCurrentView = () => {
    switch (currentView) {
      // Core Strategy & Planning
      case 'blue-ocean':
        return <ComprehensiveBlueOceanStrategy />;
      case 'strategy-frameworks':
        return <StrategyFrameworks />;
      case 'strategic-planning':
        return <StrategicPlanningModule />;
      case 'strategic-journey':
        return <StrategicJourneyMap />;
      case 'visual-mapping':
        return <VisualJourneyMapping />;
      
      // Process Management Suite
      case 'organization-process':
        return <OrganizationWideProcessManagement />;
      case 'process-management':
        return <ProcessManagement />;
      case 'advanced-process':
        return <AdvancedProcessManagement />;
      case 'process-improvement':
        return <ProcessImprovementIntelligence />;
      case 'process-analysis':
        return <ProcessAnalysisFramework />;
      case 'ai-process-logger':
        return <AIProcessLogger />;
      
      // Analysis & Intelligence
      case 'data-pulse':
        return <DataPulseWidget />;
      case 'porter':
        return <InteractivePortersFiveForces />;
      case 'financial':
        return <FinancialFrameworks />;
      case 'comprehensive-financial':
        return <ComprehensiveFinancialAnalysis />;
      case 'swot-analysis':
        return <LiveSWOTAnalysis />;
      case 'pestle-analysis':
        return <RealTimePESTLEAnalysis />;
      
      // Operations & Team Management
      case 'project-management':
        return <ProjectManagement />;
      case 'team-collaboration':
        return <TeamCollaboration />;
      case 'team-interaction':
        return <TeamInteractionHub />;
      case 'org-chart':
        return <OrganizationalChartSystem />;
      
      // Marketing, Learning & Tools
      case 'marketing-automation':
        return <StrategicMarketingAutomation />;
      case 'startup-stage':
        return <StartupStageSelector />;
      case 'hr-module':
        return <EnhancedHRModule />;
      case 'tutorials':
        return <TutorialVideoLibrary />;
      
      // Original Core Features
      case 'mission':
        return <MissionStatementGenerator />;
      case 'execution':
        return <StrategyExecutionTracker />;
      case 'canvas':
        return <BusinessModelCanvasFixed />;
      case 'video':
        return <HuggingFaceVideoProduction />;
      
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