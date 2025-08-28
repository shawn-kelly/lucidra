import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Badge,
  Alert,
  AlertIcon,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  FormControl,
  FormLabel,
  Switch
} from '@chakra-ui/react';
import { 
  FiPlus, 
  FiMinus, 
  FiEdit3, 
  FiTrash2, 
  FiCalculator,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiActivity,
  FiTarget,
  FiBarChart
} from 'react-icons/fi';

interface ERRCFactor {
  id: string;
  category: 'eliminate' | 'reduce' | 'raise' | 'create';
  factor: string;
  description: string;
  currentCost: number;
  targetCost: number;
  impact: 'low' | 'medium' | 'high';
  valueChainActivity: string;
  abcCostDriver: string;
  implementationCost: number;
  expectedROI: number;
}

interface ValueChainActivity {
  id: string;
  name: string;
  type: 'primary' | 'support';
  currentCost: number;
  costDrivers: string[];
  efficiency: number;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

interface ABCCostingData {
  activityName: string;
  costDriver: string;
  driverVolume: number;
  costPerDriver: number;
  totalCost: number;
  allocatedToERRC: number;
}

const EnhancedBlueOceanWithValueChain: React.FC = () => {
  const [errcFactors, setERRCFactors] = useState<ERRCFactor[]>([]);
  const [valueChainActivities, setValueChainActivities] = useState<ValueChainActivity[]>([]);
  const [abcData, setAbcData] = useState<ABCCostingData[]>([]);
  const [selectedFactor, setSelectedFactor] = useState<ERRCFactor | null>(null);
  const [analysisMode, setAnalysisMode] = useState<'strategy' | 'costing' | 'impact'>('strategy');
  const [totalCostImpact, setTotalCostImpact] = useState(0);
  const [projectedSavings, setProjectedSavings] = useState(0);
  
  const { isOpen: isFactorModalOpen, onOpen: onFactorModalOpen, onClose: onFactorModalClose } = useDisclosure();
  const { isOpen: isAnalysisModalOpen, onOpen: onAnalysisModalOpen, onClose: onAnalysisModalClose } = useDisclosure();
  const { isOpen: isCostModalOpen, onOpen: onCostModalOpen, onClose: onCostModalClose } = useDisclosure();
  
  const toast = useToast();

  // Initialize sample data
  useEffect(() => {
    const sampleValueChain: ValueChainActivity[] = [
      {
        id: 'inbound-logistics',
        name: 'Inbound Logistics',
        type: 'primary',
        currentCost: 850000,
        costDrivers: ['Shipment volume', 'Supplier count', 'Storage time'],
        efficiency: 78,
        importance: 'high'
      },
      {
        id: 'operations',
        name: 'Operations',
        type: 'primary',
        currentCost: 2400000,
        costDrivers: ['Production hours', 'Machine utilization', 'Quality checks'],
        efficiency: 85,
        importance: 'critical'
      },
      {
        id: 'outbound-logistics',
        name: 'Outbound Logistics',
        type: 'primary',
        currentCost: 720000,
        costDrivers: ['Delivery volume', 'Distance', 'Packaging complexity'],
        efficiency: 82,
        importance: 'high'
      },
      {
        id: 'marketing-sales',
        name: 'Marketing & Sales',
        type: 'primary',
        currentCost: 1500000,
        costDrivers: ['Campaign reach', 'Sales calls', 'Channel management'],
        efficiency: 65,
        importance: 'high'
      },
      {
        id: 'service',
        name: 'Service',
        type: 'primary',
        currentCost: 450000,
        costDrivers: ['Service requests', 'Response time', 'Resolution complexity'],
        efficiency: 88,
        importance: 'medium'
      },
      {
        id: 'technology',
        name: 'Technology Development',
        type: 'support',
        currentCost: 950000,
        costDrivers: ['R&D projects', 'IT infrastructure', 'Innovation initiatives'],
        efficiency: 72,
        importance: 'critical'
      },
      {
        id: 'hr-management',
        name: 'Human Resource Management',
        type: 'support',
        currentCost: 680000,
        costDrivers: ['Employee count', 'Training programs', 'Recruitment'],
        efficiency: 79,
        importance: 'high'
      }
    ];

    const sampleABC: ABCCostingData[] = [
      {
        activityName: 'Quality Control',
        costDriver: 'Quality checks per unit',
        driverVolume: 15000,
        costPerDriver: 12.50,
        totalCost: 187500,
        allocatedToERRC: 0
      },
      {
        activityName: 'Customer Support',
        costDriver: 'Support tickets resolved',
        driverVolume: 8500,
        costPerDriver: 25.00,
        totalCost: 212500,
        allocatedToERRC: 0
      },
      {
        activityName: 'Marketing Campaigns',
        costDriver: 'Campaign impressions (000s)',
        driverVolume: 2400,
        costPerDriver: 85.50,
        totalCost: 205200,
        allocatedToERRC: 0
      },
      {
        activityName: 'Product Development',
        costDriver: 'Development hours',
        driverVolume: 4200,
        costPerDriver: 95.00,
        totalCost: 399000,
        allocatedToERRC: 0
      }
    ];

    const sampleERRC: ERRCFactor[] = [
      {
        id: 'elim-1',
        category: 'eliminate',
        factor: 'Complex pricing tiers',
        description: 'Simplify from 15 pricing options to 3 clear tiers',
        currentCost: 320000,
        targetCost: 0,
        impact: 'high',
        valueChainActivity: 'marketing-sales',
        abcCostDriver: 'Campaign impressions (000s)',
        implementationCost: 45000,
        expectedROI: 275
      },
      {
        id: 'red-1',
        category: 'reduce',
        factor: 'Manual quality checks',
        description: 'Automate 70% of routine quality inspections',
        currentCost: 187500,
        targetCost: 56250,
        impact: 'medium',
        valueChainActivity: 'operations',
        abcCostDriver: 'Quality checks per unit',
        implementationCost: 85000,
        expectedROI: 155
      },
      {
        id: 'raise-1',
        category: 'raise',
        factor: 'Customer experience quality',
        description: 'Enhanced support with AI-powered resolution',
        currentCost: 212500,
        targetCost: 350000,
        impact: 'high',
        valueChainActivity: 'service',
        abcCostDriver: 'Support tickets resolved',
        implementationCost: 120000,
        expectedROI: 185
      },
      {
        id: 'create-1',
        category: 'create',
        factor: 'Real-time collaboration platform',
        description: 'New digital workspace for customer co-creation',
        currentCost: 0,
        targetCost: 280000,
        impact: 'high',
        valueChainActivity: 'technology',
        abcCostDriver: 'Development hours',
        implementationCost: 450000,
        expectedROI: 220
      }
    ];

    setValueChainActivities(sampleValueChain);
    setAbcData(sampleABC);
    setERRCFactors(sampleERRC);
    calculateCostImpacts(sampleERRC);
  }, []);

  const calculateCostImpacts = useCallback((factors: ERRCFactor[]) => {
    const totalCurrentCost = factors.reduce((sum, factor) => sum + factor.currentCost, 0);
    const totalTargetCost = factors.reduce((sum, factor) => sum + factor.targetCost, 0);
    const totalImplementationCost = factors.reduce((sum, factor) => sum + factor.implementationCost, 0);
    
    setTotalCostImpact(totalTargetCost - totalCurrentCost + totalImplementationCost);
    setProjectedSavings(totalCurrentCost - totalTargetCost);
  }, []);

  const handleFactorUpdate = (factorId: string, updates: Partial<ERRCFactor>) => {
    const updatedFactors = errcFactors.map(factor => 
      factor.id === factorId ? { ...factor, ...updates } : factor
    );
    setERRCFactors(updatedFactors);
    calculateCostImpacts(updatedFactors);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'eliminate': return 'red';
      case 'reduce': return 'orange'; 
      case 'raise': return 'blue';
      case 'create': return 'green';
      default: return 'gray';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  // FIXED: High contrast modal with clear narrative visibility
  const renderFactorDetailsModal = () => (
    <Modal isOpen={isFactorModalOpen} onClose={onFactorModalClose} size="6xl">
      <ModalOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(4px)" />
      <ModalContent 
        bg="white" 
        color="gray.800" 
        border="2px solid"
        borderColor="blue.200"
        boxShadow="2xl"
      >
        <ModalHeader 
          bg="blue.50" 
          borderBottom="1px solid" 
          borderColor="blue.200"
          color="blue.800"
          fontSize="xl"
          fontWeight="bold"
        >
          {selectedFactor ? `${selectedFactor.category.toUpperCase()}: ${selectedFactor.factor}` : 'Factor Details'}
        </ModalHeader>
        <ModalCloseButton color="blue.600" />
        
        <ModalBody p={6} bg="white">
          {selectedFactor && (
            <VStack spacing={6} align="stretch">
              {/* High Contrast Narrative Section */}
              <Card bg="gray.50" border="1px solid" borderColor="gray.300">
                <CardHeader bg="gray.100" borderBottom="1px solid" borderColor="gray.300">
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    📖 Strategy Narrative
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text 
                    fontSize="md" 
                    lineHeight="1.8" 
                    color="gray.800"
                    fontWeight="500"
                    bg="white"
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    {selectedFactor.description}
                  </Text>
                </CardBody>
              </Card>

              {/* Cost Impact Analysis with High Contrast */}
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Card bg="blue.50" border="2px solid" borderColor="blue.300">
                  <CardHeader bg="blue.100" borderBottom="1px solid" borderColor="blue.300">
                    <Text fontSize="md" fontWeight="bold" color="blue.800">
                      💰 Cost Impact Analysis
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <Text fontWeight="semibold" color="gray.800">Current Cost:</Text>
                        <Text fontSize="lg" fontWeight="bold" color="blue.800">
                          ${selectedFactor.currentCost.toLocaleString()}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontWeight="semibold" color="gray.800">Target Cost:</Text>
                        <Text fontSize="lg" fontWeight="bold" color="green.600">
                          ${selectedFactor.targetCost.toLocaleString()}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontWeight="semibold" color="gray.800">Implementation:</Text>
                        <Text fontSize="lg" fontWeight="bold" color="orange.600">
                          ${selectedFactor.implementationCost.toLocaleString()}
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack justify="space-between">
                        <Text fontWeight="bold" color="gray.800">Net Impact:</Text>
                        <Text 
                          fontSize="xl" 
                          fontWeight="bold" 
                          color={selectedFactor.targetCost - selectedFactor.currentCost < 0 ? 'green.600' : 'red.600'}
                        >
                          ${Math.abs(selectedFactor.targetCost - selectedFactor.currentCost).toLocaleString()}
                          {selectedFactor.targetCost - selectedFactor.currentCost < 0 ? ' Savings' : ' Investment'}
                        </Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>

                <Card bg="green.50" border="2px solid" borderColor="green.300">
                  <CardHeader bg="green.100" borderBottom="1px solid" borderColor="green.300">
                    <Text fontSize="md" fontWeight="bold" color="green.800">
                      🎯 Value Chain Integration
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <Text fontWeight="semibold" color="gray.800">Activity:</Text>
                        <Badge colorScheme="green" fontSize="sm">
                          {valueChainActivities.find(a => a.id === selectedFactor.valueChainActivity)?.name}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontWeight="semibold" color="gray.800">Cost Driver:</Text>
                        <Text color="green.700" fontWeight="medium">
                          {selectedFactor.abcCostDriver}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontWeight="semibold" color="gray.800">Expected ROI:</Text>
                        <Text fontSize="lg" fontWeight="bold" color="green.600">
                          {selectedFactor.expectedROI}%
                        </Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              </Grid>

              {/* ABC Costing Integration */}
              <Card bg="purple.50" border="2px solid" borderColor="purple.300">
                <CardHeader bg="purple.100" borderBottom="1px solid" borderColor="purple.300">
                  <Text fontSize="md" fontWeight="bold" color="purple.800">
                    📈 ABC Costing Integration
                  </Text>
                </CardHeader>
                <CardBody>
                  <Table variant="simple" size="sm">
                    <Thead bg="purple.100">
                      <Tr>
                        <Th color="purple.800">Cost Driver</Th>
                        <Th color="purple.800" isNumeric>Current Volume</Th>
                        <Th color="purple.800" isNumeric>Cost per Driver</Th>
                        <Th color="purple.800" isNumeric>Impact</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {abcData
                        .filter(abc => abc.costDriver === selectedFactor.abcCostDriver)
                        .map((abc, index) => (
                          <Tr key={index} bg="white">
                            <Td color="gray.800" fontWeight="medium">{abc.costDriver}</Td>
                            <Td color="gray.800" isNumeric>{abc.driverVolume.toLocaleString()}</Td>
                            <Td color="gray.800" isNumeric>${abc.costPerDriver}</Td>
                            <Td color="gray.800" isNumeric fontWeight="bold">
                              ${abc.totalCost.toLocaleString()}
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter bg="gray.50" borderTop="1px solid" borderColor="gray.200">
          <Button 
            colorScheme="blue" 
            mr={3}
            onClick={() => {
              toast({
                title: 'Analysis Updated',
                description: 'Cost impact calculations refreshed with latest data',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              onFactorModalClose();
            }}
          >
            Update Analysis
          </Button>
          <Button variant="outline" onClick={onFactorModalClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">🌊 Enhanced Blue Ocean Strategy</Text>
            <Text color="gray.600">Integrated with Value Chain Analysis & ABC Costing</Text>
          </VStack>
          
          <HStack>
            <Badge 
              colorScheme={totalCostImpact < 0 ? 'green' : 'red'} 
              fontSize="md" 
              p={2}
            >
              Net Impact: ${Math.abs(totalCostImpact).toLocaleString()}
              {totalCostImpact < 0 ? ' Savings' : ' Investment'}
            </Badge>
            <Button colorScheme="blue" onClick={onAnalysisModalOpen}>
              📊 Full Analysis
            </Button>
          </HStack>
        </HStack>

        {/* Cost Impact Dashboard */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="red.500">
                ${errcFactors.filter(f => f.category === 'eliminate').reduce((sum, f) => sum + f.currentCost, 0).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.600">Eliminate Savings</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                ${errcFactors.filter(f => f.category === 'reduce').reduce((sum, f) => sum + (f.currentCost - f.targetCost), 0).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.600">Reduce Savings</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                ${errcFactors.filter(f => f.category === 'raise').reduce((sum, f) => sum + (f.targetCost - f.currentCost), 0).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.600">Raise Investment</Text>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                ${errcFactors.filter(f => f.category === 'create').reduce((sum, f) => sum + f.targetCost, 0).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.600">Create Investment</Text>
            </CardBody>
          </Card>
        </Grid>

        {/* ERRC Grid with Value Chain Integration */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {(['eliminate', 'reduce', 'raise', 'create'] as const).map((category) => (
            <Card key={category} borderColor={`${getCategoryColor(category)}.200`} borderWidth="2px">
              <CardHeader bg={`${getCategoryColor(category)}.50`}>
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold" color={`${getCategoryColor(category)}.800`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                  <Badge colorScheme={getCategoryColor(category)}>
                    {errcFactors.filter(f => f.category === category).length} factors
                  </Badge>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={3} align="stretch">
                  {errcFactors
                    .filter(factor => factor.category === category)
                    .map((factor) => (
                      <Card 
                        key={factor.id} 
                        bg="white" 
                        border="1px solid" 
                        borderColor="gray.200"
                        cursor="pointer"
                        _hover={{ shadow: 'md', borderColor: `${getCategoryColor(category)}.300` }}
                        onClick={() => {
                          setSelectedFactor(factor);
                          onFactorModalOpen();
                        }}
                      >
                        <CardBody>
                          <VStack spacing={2} align="stretch">
                            <HStack justify="space-between">
                              <Text fontWeight="bold" color="gray.800">{factor.factor}</Text>
                              <Badge colorScheme={getImpactColor(factor.impact)}>
                                {factor.impact}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.600" noOfLines={2}>
                              {factor.description}
                            </Text>
                            <HStack justify="space-between" fontSize="xs" color="gray.500">
                              <Text>
                                {valueChainActivities.find(a => a.id === factor.valueChainActivity)?.name}
                              </Text>
                              <Text fontWeight="bold">
                                ROI: {factor.expectedROI}%
                              </Text>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </VStack>

      {/* Fixed Contrast Factor Details Modal */}
      {renderFactorDetailsModal()}

      {/* Comprehensive Analysis Modal */}
      <Modal isOpen={isAnalysisModalOpen} onClose={onAnalysisModalClose} size="full">
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(4px)" />
        <ModalContent bg="white" color="gray.800" m={4}>
          <ModalHeader bg="blue.50" borderBottom="1px solid" borderColor="blue.200">
            <Text fontSize="xl" fontWeight="bold" color="blue.800">
              📊 Comprehensive ERRC & Value Chain Analysis
            </Text>
          </ModalHeader>
          <ModalCloseButton color="blue.600" />
          
          <ModalBody p={6}>
            <Tabs>
              <TabList>
                <Tab>Cost Impact Summary</Tab>
                <Tab>Value Chain Mapping</Tab>
                <Tab>ABC Integration</Tab>
                <Tab>ROI Projections</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    {/* Total Impact Summary */}
                    <Alert 
                      status={totalCostImpact < 0 ? "success" : "warning"} 
                      bg={totalCostImpact < 0 ? "green.50" : "orange.50"}
                      border="1px solid"
                      borderColor={totalCostImpact < 0 ? "green.200" : "orange.200"}
                    >
                      <AlertIcon />
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" color={totalCostImpact < 0 ? "green.800" : "orange.800"}>
                          Total Strategy Impact: ${Math.abs(totalCostImpact).toLocaleString()}
                          {totalCostImpact < 0 ? ' Net Savings' : ' Net Investment'}
                        </Text>
                        <Text fontSize="sm" color={totalCostImpact < 0 ? "green.700" : "orange.700"}>
                          Projected annual savings: ${projectedSavings.toLocaleString()}
                        </Text>
                      </VStack>
                    </Alert>

                    {/* Detailed Factor Analysis */}
                    <Table variant="simple" bg="white">
                      <Thead bg="gray.100">
                        <Tr>
                          <Th color="gray.800">Factor</Th>
                          <Th color="gray.800">Category</Th>
                          <Th color="gray.800">Current Cost</Th>
                          <Th color="gray.800">Target Cost</Th>
                          <Th color="gray.800">Implementation</Th>
                          <Th color="gray.800">Net Impact</Th>
                          <Th color="gray.800">ROI</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {errcFactors.map((factor) => (
                          <Tr key={factor.id} bg="white" _hover={{ bg: "gray.50" }}>
                            <Td color="gray.800" fontWeight="medium">{factor.factor}</Td>
                            <Td>
                              <Badge colorScheme={getCategoryColor(factor.category)}>
                                {factor.category}
                              </Badge>
                            </Td>
                            <Td color="gray.800">${factor.currentCost.toLocaleString()}</Td>
                            <Td color="gray.800">${factor.targetCost.toLocaleString()}</Td>
                            <Td color="gray.800">${factor.implementationCost.toLocaleString()}</Td>
                            <Td 
                              color={factor.targetCost - factor.currentCost < 0 ? "green.600" : "red.600"}
                              fontWeight="bold"
                            >
                              ${Math.abs(factor.targetCost - factor.currentCost).toLocaleString()}
                              {factor.targetCost - factor.currentCost < 0 ? ' ↓' : ' ↑'}
                            </Td>
                            <Td color="purple.600" fontWeight="bold">{factor.expectedROI}%</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">Value Chain Activity Impact</Text>
                    {valueChainActivities.map((activity) => {
                      const relatedFactors = errcFactors.filter(f => f.valueChainActivity === activity.id);
                      const activityImpact = relatedFactors.reduce((sum, f) => sum + (f.targetCost - f.currentCost), 0);
                      
                      return (
                        <Card key={activity.id} bg="white" border="1px solid" borderColor="gray.200">
                          <CardBody>
                            <HStack justify="space-between" align="start">
                              <VStack align="start" spacing={2}>
                                <HStack>
                                  <Text fontWeight="bold" color="gray.800">{activity.name}</Text>
                                  <Badge colorScheme={activity.type === 'primary' ? 'blue' : 'purple'}>
                                    {activity.type}
                                  </Badge>
                                  <Badge colorScheme={activity.importance === 'critical' ? 'red' : activity.importance === 'high' ? 'orange' : 'green'}>
                                    {activity.importance}
                                  </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">
                                  Current Cost: ${activity.currentCost.toLocaleString()} | Efficiency: {activity.efficiency}%
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  Cost Drivers: {activity.costDrivers.join(', ')}
                                </Text>
                              </VStack>
                              <VStack align="end" spacing={1}>
                                <Text 
                                  fontSize="lg" 
                                  fontWeight="bold" 
                                  color={activityImpact < 0 ? "green.600" : "red.600"}
                                >
                                  ${Math.abs(activityImpact).toLocaleString()}
                                  {activityImpact < 0 ? ' Savings' : ' Investment'}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {relatedFactors.length} ERRC factors
                                </Text>
                              </VStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="bold" color="gray.800">ABC Costing Integration</Text>
                    <Table variant="simple" bg="white">
                      <Thead bg="gray.100">
                        <Tr>
                          <Th color="gray.800">Activity</Th>
                          <Th color="gray.800">Cost Driver</Th>
                          <Th color="gray.800">Driver Volume</Th>
                          <Th color="gray.800">Cost per Driver</Th>
                          <Th color="gray.800">Total Cost</Th>
                          <Th color="gray.800">ERRC Impact</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {abcData.map((abc, index) => {
                          const relatedFactors = errcFactors.filter(f => f.abcCostDriver === abc.costDriver);
                          const errcImpact = relatedFactors.reduce((sum, f) => sum + (f.targetCost - f.currentCost), 0);
                          
                          return (
                            <Tr key={index} bg="white" _hover={{ bg: "gray.50" }}>
                              <Td color="gray.800" fontWeight="medium">{abc.activityName}</Td>
                              <Td color="gray.800">{abc.costDriver}</Td>
                              <Td color="gray.800">{abc.driverVolume.toLocaleString()}</Td>
                              <Td color="gray.800">${abc.costPerDriver}</Td>
                              <Td color="gray.800">${abc.totalCost.toLocaleString()}</Td>
                              <Td 
                                color={errcImpact < 0 ? "green.600" : "red.600"}
                                fontWeight="bold"
                              >
                                {errcImpact !== 0 ? `$${Math.abs(errcImpact).toLocaleString()}${errcImpact < 0 ? ' ↓' : ' ↑'}` : '-'}
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Alert status="info" bg="blue.50" border="1px solid" borderColor="blue.200">
                      <AlertIcon />
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" color="blue.800">ROI Analysis Summary</Text>
                        <Text fontSize="sm" color="blue.700">
                          Average ROI across all ERRC factors: {Math.round(errcFactors.reduce((sum, f) => sum + f.expectedROI, 0) / errcFactors.length)}%
                        </Text>
                      </VStack>
                    </Alert>
                    
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      {errcFactors.map((factor) => (
                        <Card key={factor.id} bg="white" border="1px solid" borderColor="gray.200">
                          <CardHeader bg="gray.50">
                            <HStack justify="space-between">
                              <Text fontWeight="bold" color="gray.800">{factor.factor}</Text>
                              <Badge colorScheme={getCategoryColor(factor.category)}>
                                {factor.category}
                              </Badge>
                            </HStack>
                          </CardHeader>
                          <CardBody>
                            <VStack spacing={3} align="stretch">
                              <HStack justify="space-between">
                                <Text color="gray.600">Expected ROI:</Text>
                                <Text fontSize="xl" fontWeight="bold" color="green.600">
                                  {factor.expectedROI}%
                                </Text>
                              </HStack>
                              <HStack justify="space-between">
                                <Text color="gray.600">Payback Period:</Text>
                                <Text fontWeight="bold" color="blue.600">
                                  {Math.round(factor.implementationCost / Math.abs(factor.targetCost - factor.currentCost) * 12)} months
                                </Text>
                              </HStack>
                              <Progress 
                                value={factor.expectedROI} 
                                max={300} 
                                colorScheme="green" 
                                bg="gray.100"
                              />
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </Grid>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          
          <ModalFooter bg="gray.50" borderTop="1px solid" borderColor="gray.200">
            <Button colorScheme="blue" mr={3} onClick={onAnalysisModalClose}>
              Save Analysis
            </Button>
            <Button variant="outline" onClick={onAnalysisModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EnhancedBlueOceanWithValueChain;