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
      case 'porter':
        items.push({ label: 'Five Forces', view: 'porter', icon: '🏢' });
        break;
      case 'execution':
        items.push({ label: 'Execution Tracker', view: 'execution', icon: '📈' });
        break;
      case 'canvas':
        items.push({ label: 'Business Model', view: 'canvas', icon: '📋' });
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
        
        <HStack spacing={2}>
          <Button
            variant={currentView === 'mission' ? 'solid' : 'ghost'}
            colorScheme={currentView === 'mission' ? 'teal' : 'gray'}
            size="sm"
            onClick={() => setCurrentView('mission')}
          >
            🎯 Mission
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
            <Text fontWeight="semibold">Latest Updates Available!</Text>
            <Text fontSize="sm">
              ✨ New Mission Statement Generator • 🏢 Interactive Porter's Five Forces • 📈 Strategy Execution Tracker
            </Text>
          </VStack>
        </Alert>

        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
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