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
  Divider
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

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userTier] = useState('pro'); // Default to pro for demo

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
      case 'process-improvement':
        items.push({ label: 'Process Improvement', view: 'process-improvement', icon: '⚙️' });
        break;
      case 'data-pulse':
        items.push({ label: 'Data Pulse', view: 'data-pulse', icon: '📊' });
        break;
      case 'startup-stage':
        items.push({ label: 'Startup Stages', view: 'startup-stage', icon: '🚀' });
        break;
      case 'porter':
        items.push({ label: 'Five Forces', view: 'porter', icon: '🏢' });
        break;
      case 'strategy-frameworks':
        items.push({ label: 'Strategy Frameworks', view: 'strategy-frameworks', icon: '📚' });
        break;
      case 'financial':
        items.push({ label: 'Financial Analysis', view: 'financial', icon: '💰' });
        break;
      case 'marketing-automation':
        items.push({ label: 'Marketing Automation', view: 'marketing-automation', icon: '📧' });
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

  // Header component
  const renderHeader = () => (
    <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200" px={6} py={4}>
      <Flex align="center" justify="space-between">
        <HStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" color="teal.600">
            Lucidra
          </Text>
          <Badge colorScheme="teal" variant="subtle">
            {userTier.toUpperCase()}
          </Badge>
        </HStack>
        
        <HStack spacing={1} flexWrap="wrap">
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
            variant={currentView === 'process-improvement' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'process-improvement' ? 'purple' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('process-improvement')}
          >
            ⚙️ Process
          </Button>
          <Button
            variant={currentView === 'data-pulse' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'data-pulse' ? 'orange' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('data-pulse')}
          >
            📊 Data Pulse
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
            variant={currentView === 'porter' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'porter' ? 'teal' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('porter')}
          >
            🏢 Five Forces
          </Button>
          <Button
            variant={currentView === 'strategy-frameworks' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'strategy-frameworks' ? 'red' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('strategy-frameworks')}
          >
            📚 Frameworks
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
            variant={currentView === 'marketing-automation' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'marketing-automation' ? 'pink' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('marketing-automation')}
          >
            📧 Marketing
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
      </Flex>
      
      {/* Breadcrumb */}
      <HStack mt={3} spacing={2} color="gray.600" fontSize="sm">
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
            <Text fontWeight="semibold">🚀 ALL FUNCTIONALITY RESTORED!</Text>
            <Text fontSize="sm">
              🌊 Blue Ocean Strategy • ⚙️ Process Improvement • 📊 Data Pulse Intelligence • 🚀 Startup Stages • 📚 Strategy Frameworks • 💰 Financial Analysis • 📧 Marketing Automation • 👥 HR Management • 🎓 Tutorial Library
            </Text>
          </VStack>
        </Alert>

        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('blue-ocean')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">🌊</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Blue Ocean Strategy</Text>
                  <Text fontSize="sm" color="gray.600">Create uncontested market space</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('process-improvement')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">⚙️</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Process Improvement</Text>
                  <Text fontSize="sm" color="gray.600">AI-powered process optimization</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('data-pulse')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">📊</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Data Pulse Intelligence</Text>
                  <Text fontSize="sm" color="gray.600">Real-time market signals</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('startup-stage')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">🚀</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Startup Stage Selector</Text>
                  <Text fontSize="sm" color="gray.600">Stage-based guidance system</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('strategy-frameworks')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">📚</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Strategy Frameworks</Text>
                  <Text fontSize="sm" color="gray.600">Complete framework library</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('financial')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">💰</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Financial Analysis</Text>
                  <Text fontSize="sm" color="gray.600">Comprehensive financial tools</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('marketing-automation')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">📧</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Marketing Automation</Text>
                  <Text fontSize="sm" color="gray.600">Strategic marketing tools</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('hr-module')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">👥</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">HR Management</Text>
                  <Text fontSize="sm" color="gray.600">Enhanced HR systems</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('mission')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">🎯</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Mission Generator</Text>
                  <Text fontSize="sm" color="gray.600">AI-powered mission statements</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('porter')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">🏢</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Porter's Five Forces</Text>
                  <Text fontSize="sm" color="gray.600">Interactive industry analysis</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('execution')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">📈</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Execution Tracker</Text>
                  <Text fontSize="sm" color="gray.600">Strategy implementation</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('canvas')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">📋</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Business Model Canvas</Text>
                  <Text fontSize="sm" color="gray.600">Visual business planning</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('tutorials')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">🎓</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">Tutorial Library</Text>
                  <Text fontSize="sm" color="gray.600">Video tutorial system</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>

          <Card 
            cursor="pointer" 
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={() => setCurrentView('video')}
          >
            <CardHeader>
              <HStack>
                <Text fontSize="2xl">🎥</Text>
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">AI Video Production</Text>
                  <Text fontSize="sm" color="gray.600">Generate strategy videos</Text>
                </VStack>
              </HStack>
            </CardHeader>
          </Card>
        </Grid>
      </VStack>
    </Box>
  );

  // Main content renderer
  const renderCurrentView = () => {
    switch (currentView) {
      case 'blue-ocean':
        return <ComprehensiveBlueOceanStrategy />;
      case 'process-improvement':
        return <ProcessImprovementIntelligence />;
      case 'data-pulse':
        return <DataPulseWidget />;
      case 'startup-stage':
        return <StartupStageSelector />;
      case 'strategy-frameworks':
        return <StrategyFrameworks />;
      case 'financial':
        return <FinancialFrameworks />;
      case 'marketing-automation':
        return <StrategicMarketingAutomation />;
      case 'hr-module':
        return <EnhancedHRModule />;
      case 'tutorials':
        return <TutorialVideoLibrary />;
      case 'mission':
        return <MissionStatementGenerator />;
      case 'porter':
        return <InteractivePortersFiveForces />;
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
        <Box>
          {renderCurrentView()}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;