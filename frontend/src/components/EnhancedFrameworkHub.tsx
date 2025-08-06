import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Alert,
  AlertIcon,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Tooltip,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Divider,
  Switch,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Collapse,
  useColorModeValue
} from '@chakra-ui/react';
import {
  FrameworkMetadata,
  FrameworkInstance,
  FrameworkCategory,
  UserTier,
  ComplexityLevel,
  InstanceStatus,
  PerformanceMetrics
} from '../types/FrameworkTypes';
import { frameworkRegistry } from '../services/FrameworkRegistry';
import AIScenarioEngine from './AIScenarioEngine';
import StrategicIntelligenceHub from './StrategicIntelligenceHub';

interface EnhancedFrameworkHubProps {
  userTier: UserTier;
  currentUser: string;
  onFrameworkSelect?: (frameworkId: string) => void;
  onInstanceCreate?: (instance: FrameworkInstance) => void;
}

// Performance monitoring wrapper component
const PerformanceWrapper: React.FC<{
  frameworkId: string;
  children: React.ReactNode;
}> = ({ frameworkId, children }) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const renderTime = performance.now() - startTime;
      frameworkRegistry.recordInteraction(frameworkId, renderTime);
    };
  }, [frameworkId]);

  return <>{children}</>;
};

// Lazy component loader with error boundaries
const LazyFrameworkLoader: React.FC<{
  frameworkId: string;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}> = ({ frameworkId, onLoadStart, onLoadComplete, onLoadError }) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadComponent = useCallback(async () => {
    if (Component || loading) return;

    setLoading(true);
    onLoadStart?.();

    try {
      const LoadedComponent = await frameworkRegistry.loadComponent(frameworkId);
      if (LoadedComponent) {
        setComponent(() => LoadedComponent);
        onLoadComplete?.();
      } else {
        throw new Error(`Failed to load component for framework: ${frameworkId}`);
      }
    } catch (err) {
      const error = err as Error;
      setError(error);
      onLoadError?.(error);
    } finally {
      setLoading(false);
    }
  }, [frameworkId, Component, loading, onLoadStart, onLoadComplete, onLoadError]);

  useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text>Loading framework...</Text>
        </VStack>
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <VStack align="start" spacing={2}>
          <Text fontWeight="semibold">Failed to load framework</Text>
          <Text fontSize="sm">{error.message}</Text>
          <Button size="sm" onClick={() => {
            setError(null);
            setComponent(null);
            loadComponent();
          }}>
            Retry
          </Button>
        </VStack>
      </Alert>
    );
  }

  if (!Component) {
    return (
      <Alert status="warning">
        <AlertIcon />
        <Text>Framework component not available</Text>
      </Alert>
    );
  }

  return (
    <PerformanceWrapper frameworkId={frameworkId}>
      <Component />
    </PerformanceWrapper>
  );
};

const EnhancedFrameworkHub: React.FC<EnhancedFrameworkHubProps> = ({
  userTier,
  currentUser,
  onFrameworkSelect,
  onInstanceCreate
}) => {
  const [frameworks, setFrameworks] = useState<FrameworkMetadata[]>([]);
  const [instances, setInstances] = useState<FrameworkInstance[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<FrameworkInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<Map<string, PerformanceMetrics | null>>(new Map());
  const [filters, setFilters] = useState({
    category: 'all',
    complexity: 'all',
    tier: 'all',
    search: ''
  });
  const [activeTab, setActiveTab] = useState(0);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [crossFrameworkMode, setCrossFrameworkMode] = useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Update performance data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newPerformanceData = frameworkRegistry.getAllPerformanceMetrics();
      setPerformanceData(newPerformanceData);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const allFrameworks = frameworkRegistry.getAllFrameworks();
      const userInstances = frameworkRegistry.getUserInstances(currentUser);
      
      setFrameworks(allFrameworks);
      setInstances(userInstances);
      
      // Load initial performance data
      const perfData = frameworkRegistry.getAllPerformanceMetrics();
      setPerformanceData(perfData);
    } catch (error) {
      console.error('Failed to load framework data:', error);
      toast({
        title: 'Load Failed',
        description: 'Unable to load framework data',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter frameworks based on user tier and filters
  const filteredFrameworks = useMemo(() => {
    let filtered = frameworks.filter(framework => {
      // Tier filter - show frameworks user has access to
      const tierHierarchy = {
        [UserTier.LITE]: [UserTier.LITE],
        [UserTier.PRO]: [UserTier.LITE, UserTier.PRO],
        [UserTier.ENTERPRISE]: [UserTier.LITE, UserTier.PRO, UserTier.ENTERPRISE]
      };
      
      if (!tierHierarchy[userTier]?.includes(framework.tier)) {
        return false;
      }

      // Category filter
      if (filters.category !== 'all' && framework.category !== filters.category) {
        return false;
      }

      // Complexity filter
      if (filters.complexity !== 'all' && framework.complexity !== filters.complexity) {
        return false;
      }

      // Tier filter
      if (filters.tier !== 'all' && framework.tier !== filters.tier) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        return (
          framework.name.toLowerCase().includes(query) ||
          framework.description.toLowerCase().includes(query) ||
          framework.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });

    // Sort by relevance: active first, then by complexity and tier
    return filtered.sort((a, b) => {
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
      
      const complexityOrder = {
        [ComplexityLevel.BEGINNER]: 1,
        [ComplexityLevel.INTERMEDIATE]: 2,
        [ComplexityLevel.ADVANCED]: 3,
        [ComplexityLevel.EXPERT]: 4
      };
      
      return complexityOrder[a.complexity] - complexityOrder[b.complexity];
    });
  }, [frameworks, userTier, filters]);

  // Handle framework selection
  const handleFrameworkSelect = (frameworkId: string) => {
    setSelectedFramework(frameworkId);
    if (onFrameworkSelect) {
      onFrameworkSelect(frameworkId);
    }

    // Add to selected frameworks for cross-framework analysis
    if (crossFrameworkMode) {
      setSelectedFrameworks(prev => 
        prev.includes(frameworkId) 
          ? prev.filter(id => id !== frameworkId)
          : [...prev, frameworkId]
      );
    }
  };

  // Create new framework instance
  const handleCreateInstance = async (frameworkId: string, name: string) => {
    try {
      const instance = frameworkRegistry.createInstance(frameworkId, name, currentUser);
      setInstances(prev => [...prev, instance]);
      
      if (onInstanceCreate) {
        onInstanceCreate(instance);
      }

      toast({
        title: 'Instance Created',
        description: `Created new instance: ${name}`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      onClose();
    } catch (error) {
      console.error('Failed to create instance:', error);
      toast({
        title: 'Creation Failed',
        description: 'Unable to create framework instance',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  // Get complexity color
  const getComplexityColor = (complexity: ComplexityLevel): string => {
    switch (complexity) {
      case ComplexityLevel.BEGINNER: return 'green';
      case ComplexityLevel.INTERMEDIATE: return 'blue';
      case ComplexityLevel.ADVANCED: return 'orange';
      case ComplexityLevel.EXPERT: return 'red';
      default: return 'gray';
    }
  };

  // Get tier color
  const getTierColor = (tier: UserTier): string => {
    switch (tier) {
      case UserTier.LITE: return 'gray';
      case UserTier.PRO: return 'blue';
      case UserTier.ENTERPRISE: return 'purple';
      default: return 'gray';
    }
  };

  // Render framework card
  const renderFrameworkCard = (framework: FrameworkMetadata) => {
    const performance = performanceData.get(framework.id);
    const isSelected = selectedFrameworks.includes(framework.id);
    
    return (
      <Card 
        key={framework.id}
        cursor="pointer"
        _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
        transition="all 0.2s"
        border={isSelected ? '2px solid' : '1px solid'}
        borderColor={isSelected ? 'teal.500' : 'gray.200'}
        bg={isSelected ? 'teal.50' : bgColor}
        onClick={() => handleFrameworkSelect(framework.id)}
      >
        <CardHeader pb={2}>
          <VStack align="start" spacing={2}>
            <HStack justify="space-between" w="full">
              <HStack spacing={2}>
                <Text fontSize="xl">{framework.icon}</Text>
                <Text fontSize="md" fontWeight="bold" noOfLines={1}>
                  {framework.name}
                </Text>
              </HStack>
              <VStack spacing={1} align="end">
                <Badge colorScheme={getTierColor(framework.tier)} size="sm">
                  {framework.tier}
                </Badge>
                {!framework.isActive && (
                  <Badge colorScheme="red" size="sm">Inactive</Badge>
                )}
              </VStack>
            </HStack>
            
            <HStack spacing={2} flexWrap="wrap">
              <Badge colorScheme={getComplexityColor(framework.complexity)} variant="subtle" size="sm">
                {framework.complexity}
              </Badge>
              <Badge variant="outline" size="sm">
                {framework.category}
              </Badge>
              <Badge variant="outline" size="sm">
                {framework.estimatedTime}min
              </Badge>
            </HStack>
          </VStack>
        </CardHeader>
        
        <CardBody pt={0}>
          <VStack align="start" spacing={3}>
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {framework.description}
            </Text>
            
            {framework.tags.length > 0 && (
              <HStack spacing={1} flexWrap="wrap">
                {framework.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" size="xs" colorScheme="gray">
                    {tag}
                  </Badge>
                ))}
                {framework.tags.length > 3 && (
                  <Badge variant="outline" size="xs" colorScheme="gray">
                    +{framework.tags.length - 3}
                  </Badge>
                )}
              </HStack>
            )}
            
            {performance && showPerformanceMonitor && (
              <Box w="full">
                <Text fontSize="xs" color="gray.500" mb={1}>Performance</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={2} fontSize="xs">
                  <Text>Load: {performance.loadTime?.toFixed(1)}ms</Text>
                  <Text>Memory: {performance.memoryUsage?.toFixed(1)}MB</Text>
                </Grid>
              </Box>
            )}
            
            <HStack justify="space-between" w="full">
              <Text fontSize="xs" color="gray.500">
                v{framework.version}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {new Date(framework.lastUpdated).toLocaleDateString()}
              </Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  // Render instance card
  const renderInstanceCard = (instance: FrameworkInstance) => (
    <Card 
      key={instance.id}
      cursor="pointer"
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
      transition="all 0.2s"
      onClick={() => setSelectedInstance(instance)}
    >
      <CardBody>
        <VStack align="start" spacing={3}>
          <HStack justify="space-between" w="full">
            <HStack spacing={2}>
              <Text fontSize="lg">{instance.metadata.icon}</Text>
              <Text fontSize="md" fontWeight="semibold" noOfLines={1}>
                {instance.name}
              </Text>
            </HStack>
            <Badge colorScheme={instance.status === InstanceStatus.COMPLETED ? 'green' : 'blue'}>
              {instance.status}
            </Badge>
          </HStack>
          
          <Text fontSize="sm" color="gray.600">
            {instance.metadata.name}
          </Text>
          
          <Box w="full">
            <HStack justify="space-between" mb={1}>
              <Text fontSize="xs">Progress</Text>
              <Text fontSize="xs">{instance.progress}%</Text>
            </HStack>
            <Progress value={instance.progress} colorScheme="teal" size="sm" />
          </Box>
          
          <HStack justify="space-between" w="full" fontSize="xs" color="gray.500">
            <Text>Created: {new Date(instance.createdAt).toLocaleDateString()}</Text>
            <Text>Updated: {new Date(instance.updatedAt).toLocaleDateString()}</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text>Loading Enhanced Framework Hub...</Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">🚀 Enhanced Framework Hub</Text>
            <Text color="gray.600">
              Advanced framework management with AI intelligence and performance monitoring
            </Text>
          </VStack>
          
          <HStack spacing={3}>
            <HStack spacing={2}>
              <Text fontSize="sm">Performance Monitor</Text>
              <Switch 
                isChecked={showPerformanceMonitor} 
                onChange={(e) => setShowPerformanceMonitor(e.target.checked)}
                colorScheme="teal"
              />
            </HStack>
            <HStack spacing={2}>
              <Text fontSize="sm">Cross-Framework Mode</Text>
              <Switch 
                isChecked={crossFrameworkMode} 
                onChange={(e) => {
                  setCrossFrameworkMode(e.target.checked);
                  if (!e.target.checked) {
                    setSelectedFrameworks([]);
                  }
                }}
                colorScheme="blue"
              />
            </HStack>
            <Button variant="outline" onClick={loadData}>
              Refresh
            </Button>
          </HStack>
        </HStack>

        {/* Statistics */}
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Available Frameworks</StatLabel>
                <StatNumber>{filteredFrameworks.length}</StatNumber>
                <StatHelpText>Accessible with {userTier} tier</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Active Instances</StatLabel>
                <StatNumber>{instances.length}</StatNumber>
                <StatHelpText>Your framework instances</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Loaded Components</StatLabel>
                <StatNumber>{frameworkRegistry.getLoadedComponentsCount()}</StatNumber>
                <StatHelpText>In memory</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Cross-Framework Selection */}
        {crossFrameworkMode && (
          <Card>
            <CardHeader>
              <Text fontSize="lg" fontWeight="semibold">
                Cross-Framework Analysis ({selectedFrameworks.length} selected)
              </Text>
            </CardHeader>
            <CardBody>
              <HStack spacing={2} flexWrap="wrap" mb={4}>
                {selectedFrameworks.map(frameworkId => {
                  const framework = frameworkRegistry.getFramework(frameworkId);
                  return framework ? (
                    <Badge key={frameworkId} colorScheme="teal" variant="solid" p={2}>
                      {framework.icon} {framework.name}
                      <Button
                        size="xs"
                        ml={2}
                        variant="ghost"
                        color="white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFrameworks(prev => prev.filter(id => id !== frameworkId));
                        }}
                      >
                        ×
                      </Button>
                    </Badge>
                  ) : null;
                })}
              </HStack>
              
              {selectedFrameworks.length >= 2 && (
                <HStack spacing={3}>
                  <Button
                    colorScheme="blue"
                    onClick={() => setActiveTab(3)} // AI Scenarios tab
                  >
                    Generate AI Scenarios
                  </Button>
                  <Button
                    colorScheme="purple"
                    onClick={() => setActiveTab(4)} // Intelligence Hub tab
                  >
                    Strategic Intelligence
                  </Button>
                </HStack>
              )}
            </CardBody>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Frameworks Library</Tab>
            <Tab>My Instances</Tab>
            <Tab>Performance Monitor</Tab>
            <Tab>AI Scenarios</Tab>
            <Tab>Intelligence Hub</Tab>
          </TabList>
          
          <TabPanels>
            {/* Frameworks Library */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                {/* Filters */}
                <Card>
                  <CardBody>
                    <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                      <GridItem>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>Category</Text>
                        <Select 
                          value={filters.category} 
                          onChange={(e) => setFilters({...filters, category: e.target.value})}
                        >
                          <option value="all">All Categories</option>
                          {Object.values(FrameworkCategory).map(category => (
                            <option key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                          ))}
                        </Select>
                      </GridItem>
                      
                      <GridItem>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>Complexity</Text>
                        <Select 
                          value={filters.complexity} 
                          onChange={(e) => setFilters({...filters, complexity: e.target.value})}
                        >
                          <option value="all">All Levels</option>
                          {Object.values(ComplexityLevel).map(level => (
                            <option key={level} value={level}>
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </option>
                          ))}
                        </Select>
                      </GridItem>
                      
                      <GridItem>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>Tier</Text>
                        <Select 
                          value={filters.tier} 
                          onChange={(e) => setFilters({...filters, tier: e.target.value})}
                        >
                          <option value="all">All Tiers</option>
                          {Object.values(UserTier).map(tier => (
                            <option key={tier} value={tier}>
                              {tier.toUpperCase()}
                            </option>
                          ))}
                        </Select>
                      </GridItem>
                      
                      <GridItem>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>Search</Text>
                        <InputGroup>
                          <InputLeftElement>
                            <Text>🔍</Text>
                          </InputLeftElement>
                          <Input
                            value={filters.search}
                            onChange={(e) => setFilters({...filters, search: e.target.value})}
                            placeholder="Search frameworks..."
                          />
                        </InputGroup>
                      </GridItem>
                    </Grid>
                  </CardBody>
                </Card>

                {/* Framework Grid */}
                <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={4}>
                  {filteredFrameworks.map(renderFrameworkCard)}
                </Grid>

                {filteredFrameworks.length === 0 && (
                  <Alert status="info">
                    <AlertIcon />
                    <Text>No frameworks match your current filters</Text>
                  </Alert>
                )}
              </VStack>
            </TabPanel>

            {/* My Instances */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="semibold">
                    Your Framework Instances ({instances.length})
                  </Text>
                  <Button colorScheme="teal" onClick={onOpen}>
                    Create New Instance
                  </Button>
                </HStack>

                {instances.length > 0 ? (
                  <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                    {instances.map(renderInstanceCard)}
                  </Grid>
                ) : (
                  <Alert status="info">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">No Instances Created</Text>
                      <Text fontSize="sm">
                        Create your first framework instance to start working with strategic frameworks
                      </Text>
                    </VStack>
                  </Alert>
                )}
              </VStack>
            </TabPanel>

            {/* Performance Monitor */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="semibold">Performance Monitoring</Text>
                  <Button onClick={() => frameworkRegistry.clearCache()}>
                    Clear Component Cache
                  </Button>
                </HStack>

                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                  {Array.from(performanceData.entries()).map(([frameworkId, metrics]) => {
                    const framework = frameworkRegistry.getFramework(frameworkId);
                    if (!framework || !metrics) return null;

                    return (
                      <Card key={frameworkId}>
                        <CardHeader>
                          <HStack spacing={2}>
                            <Text fontSize="lg">{framework.icon}</Text>
                            <Text fontSize="md" fontWeight="semibold">{framework.name}</Text>
                          </HStack>
                        </CardHeader>
                        <CardBody>
                          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                            <Stat size="sm">
                              <StatLabel>Load Time</StatLabel>
                              <StatNumber>{metrics.loadTime?.toFixed(1)}ms</StatNumber>
                            </Stat>
                            <Stat size="sm">
                              <StatLabel>Memory</StatLabel>
                              <StatNumber>{metrics.memoryUsage?.toFixed(1)}MB</StatNumber>
                            </Stat>
                            <Stat size="sm">
                              <StatLabel>Render Time</StatLabel>
                              <StatNumber>{metrics.renderTime?.toFixed(1)}ms</StatNumber>
                            </Stat>
                            <Stat size="sm">
                              <StatLabel>Error Rate</StatLabel>
                              <StatNumber>{(metrics.errorRate * 100).toFixed(1)}%</StatNumber>
                            </Stat>
                          </Grid>
                        </CardBody>
                      </Card>
                    );
                  })}
                </Grid>
              </VStack>
            </TabPanel>

            {/* AI Scenarios */}
            <TabPanel>
              <Suspense fallback={
                <Flex justify="center" align="center" minH="400px">
                  <Spinner size="xl" color="teal.500" />
                </Flex>
              }>
                <AIScenarioEngine 
                  selectedFrameworks={selectedFrameworks}
                  currentContext={{ userTier, currentUser }}
                />
              </Suspense>
            </TabPanel>

            {/* Intelligence Hub */}
            <TabPanel>
              <Suspense fallback={
                <Flex justify="center" align="center" minH="400px">
                  <Spinner size="xl" color="purple.500" />
                </Flex>
              }>
                <StrategicIntelligenceHub 
                  currentFramework={selectedFramework || undefined}
                  organizationContext={{ userTier, selectedFrameworks }}
                />
              </Suspense>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Selected Framework Display */}
        {selectedFramework && !crossFrameworkMode && (
          <Card>
            <CardHeader>
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  Active Framework: {frameworkRegistry.getFramework(selectedFramework)?.name}
                </Text>
                <Button variant="outline" onClick={() => setSelectedFramework(null)}>
                  Close
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <Suspense fallback={
                <Flex justify="center" align="center" minH="300px">
                  <VStack spacing={4}>
                    <Spinner size="xl" color="teal.500" />
                    <Text>Loading framework component...</Text>
                  </VStack>
                </Flex>
              }>
                <LazyFrameworkLoader 
                  frameworkId={selectedFramework}
                  onLoadStart={() => console.log('Loading framework:', selectedFramework)}
                  onLoadComplete={() => console.log('Framework loaded:', selectedFramework)}
                  onLoadError={(error) => console.error('Framework load error:', error)}
                />
              </Suspense>
            </CardBody>
          </Card>
        )}
      </VStack>

      {/* Create Instance Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Framework Instance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Framework</Text>
                <Select placeholder="Select framework">
                  {filteredFrameworks.map(framework => (
                    <option key={framework.id} value={framework.id}>
                      {framework.icon} {framework.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Instance Name</Text>
                <Input placeholder="Enter instance name..." />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal">
                Create Instance
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EnhancedFrameworkHub;