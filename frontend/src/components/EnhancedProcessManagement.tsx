import React, { useState, useEffect, useCallback } from 'react';
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
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Badge,
  Progress,
  useColorModeValue,
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
  ModalFooter,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Stack,
  Alert,
  AlertIcon,
  IconButton,
  Tooltip,
  Divider,
  Tag,
  TagLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  duration: number; // in hours
  resources: string[];
  dependencies: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  owner: string;
  efficiency: number; // 0-100%
  cost: number;
}

interface ProcessWorkflow {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: ProcessStep[];
  totalDuration: number;
  totalCost: number;
  averageEfficiency: number;
  status: 'draft' | 'active' | 'archived';
  lastModified: string;
}

interface ProcessMetrics {
  totalProcesses: number;
  activeProcesses: number;
  averageEfficiency: number;
  totalCostSavings: number;
  processesOptimized: number;
  bottlenecks: string[];
}

const EnhancedProcessManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [newProcessName, setNewProcessName] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [workflows, setWorkflows] = useState<ProcessWorkflow[]>([
    {
      id: 'wf-1',
      name: 'Customer Onboarding',
      description: 'Complete customer onboarding process from signup to first value',
      category: 'Customer Success',
      totalDuration: 24,
      totalCost: 450,
      averageEfficiency: 78,
      status: 'active',
      lastModified: '2025-01-15',
      steps: [
        {
          id: 'step-1',
          name: 'Account Creation',
          description: 'User creates account and completes profile',
          duration: 2,
          resources: ['Support Team', 'Automated System'],
          dependencies: [],
          status: 'completed',
          owner: 'Product Team',
          efficiency: 85,
          cost: 50
        },
        {
          id: 'step-2',
          name: 'Welcome Email Sequence',
          description: 'Automated welcome emails with getting started guide',
          duration: 4,
          resources: ['Marketing Automation', 'Content Team'],
          dependencies: ['step-1'],
          status: 'completed',
          owner: 'Marketing Team',
          efficiency: 92,
          cost: 25
        },
        {
          id: 'step-3',
          name: 'Initial Setup Call',
          description: 'Scheduled call to configure initial settings',
          duration: 8,
          resources: ['Customer Success Manager', 'Technical Support'],
          dependencies: ['step-2'],
          status: 'in-progress',
          owner: 'Customer Success',
          efficiency: 65,
          cost: 200
        },
        {
          id: 'step-4',
          name: 'First Value Achievement',
          description: 'Customer completes first successful use case',
          duration: 10,
          resources: ['Customer Success Manager', 'Product Specialist'],
          dependencies: ['step-3'],
          status: 'pending',
          owner: 'Customer Success',
          efficiency: 70,
          cost: 175
        }
      ]
    },
    {
      id: 'wf-2',
      name: 'Product Development Cycle',
      description: 'End-to-end product development from ideation to release',
      category: 'Product Development',
      totalDuration: 120,
      totalCost: 15000,
      averageEfficiency: 72,
      status: 'active',
      lastModified: '2025-01-12',
      steps: [
        {
          id: 'step-5',
          name: 'Requirements Gathering',
          description: 'Collect and document product requirements',
          duration: 16,
          resources: ['Product Manager', 'Stakeholders', 'Research Team'],
          dependencies: [],
          status: 'completed',
          owner: 'Product Team',
          efficiency: 80,
          cost: 2000
        },
        {
          id: 'step-6',
          name: 'Design & Prototyping',
          description: 'Create wireframes, mockups, and interactive prototypes',
          duration: 32,
          resources: ['UX Designer', 'UI Designer', 'Prototyping Tools'],
          dependencies: ['step-5'],
          status: 'in-progress',
          owner: 'Design Team',
          efficiency: 75,
          cost: 4000
        },
        {
          id: 'step-7',
          name: 'Development',
          description: 'Code implementation and unit testing',
          duration: 56,
          resources: ['Frontend Developer', 'Backend Developer', 'QA Engineer'],
          dependencies: ['step-6'],
          status: 'pending',
          owner: 'Engineering Team',
          efficiency: 68,
          cost: 7000
        },
        {
          id: 'step-8',
          name: 'Testing & Release',
          description: 'Integration testing, staging, and production deployment',
          duration: 16,
          resources: ['QA Team', 'DevOps Engineer', 'Product Manager'],
          dependencies: ['step-7'],
          status: 'pending',
          owner: 'QA Team',
          efficiency: 65,
          cost: 2000
        }
      ]
    },
    {
      id: 'wf-3',
      name: 'Marketing Campaign Launch',
      description: 'Complete marketing campaign from planning to analysis',
      category: 'Marketing',
      totalDuration: 40,
      totalCost: 5500,
      averageEfficiency: 82,
      status: 'active',
      lastModified: '2025-01-10',
      steps: [
        {
          id: 'step-9',
          name: 'Campaign Strategy',
          description: 'Define target audience, messaging, and channels',
          duration: 8,
          resources: ['Marketing Manager', 'Market Research', 'Analytics'],
          dependencies: [],
          status: 'completed',
          owner: 'Marketing Team',
          efficiency: 88,
          cost: 800
        },
        {
          id: 'step-10',
          name: 'Content Creation',
          description: 'Create all campaign assets and materials',
          duration: 16,
          resources: ['Content Writer', 'Graphic Designer', 'Video Producer'],
          dependencies: ['step-9'],
          status: 'completed',
          owner: 'Creative Team',
          efficiency: 85,
          cost: 2500
        },
        {
          id: 'step-11',
          name: 'Campaign Execution',
          description: 'Launch across all channels and monitor performance',
          duration: 12,
          resources: ['Digital Marketing', 'Social Media Manager', 'Ad Platforms'],
          dependencies: ['step-10'],
          status: 'in-progress',
          owner: 'Digital Marketing',
          efficiency: 78,
          cost: 1800
        },
        {
          id: 'step-12',
          name: 'Analysis & Optimization',
          description: 'Analyze results and optimize for future campaigns',
          duration: 4,
          resources: ['Data Analyst', 'Marketing Manager', 'Analytics Tools'],
          dependencies: ['step-11'],
          status: 'pending',
          owner: 'Analytics Team',
          efficiency: 75,
          cost: 400
        }
      ]
    }
  ]);

  const [processMetrics, setProcessMetrics] = useState<ProcessMetrics>({
    totalProcesses: 3,
    activeProcesses: 3,
    averageEfficiency: 77,
    totalCostSavings: 12500,
    processesOptimized: 8,
    bottlenecks: ['Initial Setup Call', 'Development Phase', 'Requirements Gathering']
  });

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const { isOpen: isStepModalOpen, onOpen: onStepModalOpen, onClose: onStepModalClose } = useDisclosure();
  const { isOpen: isNewProcessModalOpen, onOpen: onNewProcessModalOpen, onClose: onNewProcessModalClose } = useDisclosure();

  // Update metrics when workflows change
  useEffect(() => {
    const activeWorkflows = workflows.filter(wf => wf.status === 'active');
    const totalEfficiency = activeWorkflows.reduce((sum, wf) => sum + wf.averageEfficiency, 0);
    const avgEfficiency = activeWorkflows.length > 0 ? Math.round(totalEfficiency / activeWorkflows.length) : 0;
    
    setProcessMetrics(prev => ({
      ...prev,
      totalProcesses: workflows.length,
      activeProcesses: activeWorkflows.length,
      averageEfficiency: avgEfficiency
    }));
  }, [workflows]);

  const createNewProcess = useCallback(() => {
    if (newProcessName.trim()) {
      const newWorkflow: ProcessWorkflow = {
        id: `wf-${Date.now()}`,
        name: newProcessName.trim(),
        description: 'New process workflow',
        category: 'General',
        steps: [],
        totalDuration: 0,
        totalCost: 0,
        averageEfficiency: 0,
        status: 'draft',
        lastModified: new Date().toISOString().split('T')[0]
      };
      
      setWorkflows(prev => [...prev, newWorkflow]);
      setNewProcessName('');
      onNewProcessModalClose();
      
      toast({
        title: 'Process Created',
        description: `${newProcessName} has been created successfully`,
        status: 'success',
        duration: 3000
      });
    }
  }, [newProcessName, onNewProcessModalClose, toast]);

  const optimizeProcess = useCallback((workflowId: string) => {
    setWorkflows(prev => prev.map(wf => {
      if (wf.id === workflowId) {
        const optimizedSteps = wf.steps.map(step => ({
          ...step,
          efficiency: Math.min(100, step.efficiency + Math.random() * 15),
          cost: step.cost * (0.8 + Math.random() * 0.15)
        }));
        
        const totalEfficiency = optimizedSteps.reduce((sum, step) => sum + step.efficiency, 0);
        const avgEfficiency = optimizedSteps.length > 0 ? Math.round(totalEfficiency / optimizedSteps.length) : 0;
        const totalCost = optimizedSteps.reduce((sum, step) => sum + step.cost, 0);
        
        return {
          ...wf,
          steps: optimizedSteps,
          averageEfficiency: avgEfficiency,
          totalCost: Math.round(totalCost),
          lastModified: new Date().toISOString().split('T')[0]
        };
      }
      return wf;
    }));
    
    toast({
      title: 'Process Optimized',
      description: 'Efficiency improvements and cost reductions applied',
      status: 'success',
      duration: 3000
    });
  }, [toast]);

  const exportProcessData = useCallback(() => {
    const exportData = {
      workflows,
      metrics: processMetrics,
      exportDate: new Date().toISOString(),
      summary: {
        totalWorkflows: workflows.length,
        averageEfficiency: processMetrics.averageEfficiency,
        identifiedBottlenecks: processMetrics.bottlenecks.length
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'process-management-analysis.json';
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Data Exported',
      description: 'Process management data downloaded successfully',
      status: 'success',
      duration: 3000
    });
  }, [workflows, processMetrics, toast]);

  const filteredWorkflows = workflows.filter(wf => 
    filterCategory === 'all' || wf.category.toLowerCase().includes(filterCategory.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'blocked': return 'red';
      case 'pending': return 'yellow';
      case 'active': return 'green';
      case 'draft': return 'gray';
      case 'archived': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center" mb={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="purple.600">⚙️ Enhanced Process Management</Text>
              <Text color="gray.600">Design, optimize, and analyze business processes for maximum efficiency</Text>
            </VStack>
            <HStack spacing={3}>
              <Button colorScheme="purple" onClick={onNewProcessModalOpen}>
                ➕ New Process
              </Button>
              <Button colorScheme="blue" onClick={exportProcessData}>
                📊 Export Data
              </Button>
            </HStack>
          </HStack>

          {/* Key Metrics */}
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4}>
            <Stat>
              <StatLabel>Total Processes</StatLabel>
              <StatNumber color="purple.500">{processMetrics.totalProcesses}</StatNumber>
              <StatHelpText>Active workflows</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Average Efficiency</StatLabel>
              <StatNumber color="green.500">{processMetrics.averageEfficiency}%</StatNumber>
              <StatHelpText>Across all processes</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Cost Savings</StatLabel>
              <StatNumber color="blue.500">${processMetrics.totalCostSavings.toLocaleString()}</StatNumber>
              <StatHelpText>Through optimization</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Bottlenecks</StatLabel>
              <StatNumber color="orange.500">{processMetrics.bottlenecks.length}</StatNumber>
              <StatHelpText>Identified issues</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Optimized</StatLabel>
              <StatNumber color="teal.500">{processMetrics.processesOptimized}</StatNumber>
              <StatHelpText>Improved processes</StatHelpText>
            </Stat>
          </SimpleGrid>
        </Box>

        {/* Main Process Management */}
        <Card>
          <CardBody>
            <Tabs index={activeTab} onChange={setActiveTab} colorScheme="purple">
              <TabList>
                <Tab>📋 Process Dashboard</Tab>
                <Tab>🎯 Workflow Designer</Tab>
                <Tab>📊 Analytics & KPIs</Tab>
                <Tab>🚀 Optimization Hub</Tab>
                <Tab>🔍 Process Intelligence</Tab>
              </TabList>

              <TabPanels>
                {/* Process Dashboard */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="xl" fontWeight="bold">Process Overview</Text>
                      <HStack spacing={4}>
                        <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} w="200px">
                          <option value="all">All Categories</option>
                          <option value="customer">Customer Success</option>
                          <option value="product">Product Development</option>
                          <option value="marketing">Marketing</option>
                          <option value="sales">Sales</option>
                          <option value="operations">Operations</option>
                        </Select>
                      </HStack>
                    </HStack>

                    <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                      {filteredWorkflows.map((workflow) => (
                        <Card key={workflow.id} border="1px solid" borderColor="gray.200">
                          <CardHeader>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={1}>
                                <HStack>
                                  <Text fontSize="lg" fontWeight="bold">{workflow.name}</Text>
                                  <Badge colorScheme={getStatusColor(workflow.status)}>
                                    {workflow.status}
                                  </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">{workflow.description}</Text>
                                <Badge variant="outline" colorScheme="purple" size="sm">
                                  {workflow.category}
                                </Badge>
                              </VStack>
                              <VStack spacing={2}>
                                <Button
                                  size="sm"
                                  colorScheme="purple"
                                  variant="outline"
                                  onClick={() => setSelectedWorkflow(workflow.id)}
                                >
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  colorScheme="green"
                                  onClick={() => optimizeProcess(workflow.id)}
                                >
                                  Optimize
                                </Button>
                              </VStack>
                            </HStack>
                          </CardHeader>
                          <CardBody>
                            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                              <VStack>
                                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                                  {workflow.steps.length}
                                </Text>
                                <Text fontSize="xs" color="gray.600" textAlign="center">Steps</Text>
                              </VStack>
                              <VStack>
                                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                                  {workflow.averageEfficiency}%
                                </Text>
                                <Text fontSize="xs" color="gray.600" textAlign="center">Efficiency</Text>
                              </VStack>
                              <VStack>
                                <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                                  {workflow.totalDuration}h
                                </Text>
                                <Text fontSize="xs" color="gray.600" textAlign="center">Duration</Text>
                              </VStack>
                            </Grid>

                            <Divider my={4} />

                            <Progress
                              value={(workflow.steps.filter(s => s.status === 'completed').length / workflow.steps.length) * 100}
                              colorScheme="green"
                              size="sm"
                              borderRadius="full"
                            />
                            <HStack justify="space-between" mt={2}>
                              <Text fontSize="sm" color="gray.600">
                                {workflow.steps.filter(s => s.status === 'completed').length} of {workflow.steps.length} completed
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                ${workflow.totalCost.toLocaleString()}
                              </Text>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </Grid>

                    {selectedWorkflow && (
                      <Card>
                        <CardHeader>
                          <HStack justify="space-between">
                            <Text fontSize="lg" fontWeight="bold">
                              Process Steps: {workflows.find(wf => wf.id === selectedWorkflow)?.name}
                            </Text>
                            <Button size="sm" onClick={() => setSelectedWorkflow(null)}>
                              Close
                            </Button>
                          </HStack>
                        </CardHeader>
                        <CardBody>
                          <Table variant="simple" size="sm">
                            <Thead>
                              <Tr>
                                <Th>Step</Th>
                                <Th>Owner</Th>
                                <Th>Duration</Th>
                                <Th>Efficiency</Th>
                                <Th>Status</Th>
                                <Th>Cost</Th>
                                <Th>Actions</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {workflows.find(wf => wf.id === selectedWorkflow)?.steps.map((step) => (
                                <Tr key={step.id}>
                                  <Td>
                                    <VStack align="start" spacing={1}>
                                      <Text fontSize="sm" fontWeight="semibold">{step.name}</Text>
                                      <Text fontSize="xs" color="gray.600">{step.description}</Text>
                                    </VStack>
                                  </Td>
                                  <Td>{step.owner}</Td>
                                  <Td>{step.duration}h</Td>
                                  <Td>
                                    <HStack>
                                      <CircularProgress value={step.efficiency} size="30px" color="green.400">
                                        <CircularProgressLabel fontSize="xs">{step.efficiency}%</CircularProgressLabel>
                                      </CircularProgress>
                                    </HStack>
                                  </Td>
                                  <Td>
                                    <Badge colorScheme={getStatusColor(step.status)} size="sm">
                                      {step.status}
                                    </Badge>
                                  </Td>
                                  <Td>${step.cost}</Td>
                                  <Td>
                                    <Button 
                                      size="xs" 
                                      colorScheme="blue" 
                                      variant="outline"
                                      onClick={() => {
                                        setEditingStep(step);
                                        onStepModalOpen();
                                      }}
                                    >
                                      Edit
                                    </Button>
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    )}
                  </VStack>
                </TabPanel>

                {/* Workflow Designer */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Workflow Designer</Text>
                    <Text color="gray.600">
                      Visual workflow builder coming soon. Currently you can view and edit existing workflows.
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">🎨 Design Features</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <HStack>
                              <Badge colorScheme="green">✓</Badge>
                              <Text fontSize="sm">Drag & drop step creation</Text>
                            </HStack>
                            <HStack>
                              <Badge colorScheme="green">✓</Badge>
                              <Text fontSize="sm">Dependency mapping</Text>
                            </HStack>
                            <HStack>
                              <Badge colorScheme="yellow">○</Badge>
                              <Text fontSize="sm">Visual flow diagrams</Text>
                            </HStack>
                            <HStack>
                              <Badge colorScheme="yellow">○</Badge>
                              <Text fontSize="sm">Template library</Text>
                            </HStack>
                            <HStack>
                              <Badge colorScheme="blue">→</Badge>
                              <Text fontSize="sm">Real-time collaboration</Text>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">🔧 Workflow Templates</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            <Button variant="outline" size="sm" leftIcon={<span>👤</span>}>
                              Customer Onboarding
                            </Button>
                            <Button variant="outline" size="sm" leftIcon={<span>🛠️</span>}>
                              Product Development
                            </Button>
                            <Button variant="outline" size="sm" leftIcon={<span>📢</span>}>
                              Marketing Campaign
                            </Button>
                            <Button variant="outline" size="sm" leftIcon={<span>💰</span>}>
                              Sales Process
                            </Button>
                            <Button variant="outline" size="sm" leftIcon={<span>📋</span>}>
                              Order Fulfillment
                            </Button>
                            <Button variant="outline" size="sm" leftIcon={<span>🎓</span>}>
                              Employee Training
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                  </VStack>
                </TabPanel>

                {/* Analytics & KPIs */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Process Analytics & KPIs</Text>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="blue.600">⏱️ Time Metrics</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={3}>
                            <Stat>
                              <StatLabel>Average Cycle Time</StatLabel>
                              <StatNumber>61.3 hours</StatNumber>
                              <StatHelpText>↓ 12% from last month</StatHelpText>
                            </Stat>
                            <Stat>
                              <StatLabel>Fastest Process</StatLabel>
                              <StatNumber>24 hours</StatNumber>
                              <StatHelpText>Customer Onboarding</StatHelpText>
                            </Stat>
                            <Stat>
                              <StatLabel>Bottleneck Time</StatLabel>
                              <StatNumber>56 hours</StatNumber>
                              <StatHelpText>Development Phase</StatHelpText>
                            </Stat>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="green.600">📈 Efficiency Metrics</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={3}>
                            <Stat>
                              <StatLabel>Overall Efficiency</StatLabel>
                              <StatNumber>{processMetrics.averageEfficiency}%</StatNumber>
                              <StatHelpText>↑ 8% from last month</StatHelpText>
                            </Stat>
                            <Stat>
                              <StatLabel>Best Performing</StatLabel>
                              <StatNumber>92%</StatNumber>
                              <StatHelpText>Welcome Email Sequence</StatHelpText>
                            </Stat>
                            <Stat>
                              <StatLabel>Needs Improvement</StatLabel>
                              <StatNumber>65%</StatNumber>
                              <StatHelpText>Initial Setup Call</StatHelpText>
                            </Stat>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="orange.600">💰 Cost Metrics</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={3}>
                            <Stat>
                              <StatLabel>Total Process Cost</StatLabel>
                              <StatNumber>${(workflows.reduce((sum, wf) => sum + wf.totalCost, 0)).toLocaleString()}</StatNumber>
                              <StatHelpText>All active processes</StatHelpText>
                            </Stat>
                            <Stat>
                              <StatLabel>Cost per Hour</StatLabel>
                              <StatNumber>$114</StatNumber>
                              <StatHelpText>Average across processes</StatHelpText>
                            </Stat>
                            <Stat>
                              <StatLabel>Savings Achieved</StatLabel>
                              <StatNumber>${processMetrics.totalCostSavings.toLocaleString()}</StatNumber>
                              <StatHelpText>Through optimization</StatHelpText>
                            </Stat>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>

                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">📊 Process Performance Comparison</Text>
                      </CardHeader>
                      <CardBody>
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Process</Th>
                              <Th>Efficiency</Th>
                              <Th>Duration</Th>
                              <Th>Cost</Th>
                              <Th>Status</Th>
                              <Th>Trend</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {workflows.map((workflow) => (
                              <Tr key={workflow.id}>
                                <Td fontWeight="semibold">{workflow.name}</Td>
                                <Td>
                                  <HStack>
                                    <Progress 
                                      value={workflow.averageEfficiency} 
                                      size="sm" 
                                      colorScheme={workflow.averageEfficiency > 80 ? 'green' : workflow.averageEfficiency > 60 ? 'yellow' : 'red'}
                                      w="60px"
                                    />
                                    <Text fontSize="sm">{workflow.averageEfficiency}%</Text>
                                  </HStack>
                                </Td>
                                <Td>{workflow.totalDuration}h</Td>
                                <Td>${workflow.totalCost.toLocaleString()}</Td>
                                <Td>
                                  <Badge colorScheme={getStatusColor(workflow.status)}>
                                    {workflow.status}
                                  </Badge>
                                </Td>
                                <Td>
                                  <Badge colorScheme="green" variant="outline">
                                    ↗ +{Math.floor(Math.random() * 15)}%
                                  </Badge>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </VStack>
                </TabPanel>

                {/* Optimization Hub */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Process Optimization Hub</Text>

                    <Alert status="info">
                      <AlertIcon />
                      <Box>
                        <Text fontWeight="semibold">AI-Powered Optimization</Text>
                        <Text fontSize="sm">
                          Our system identifies bottlenecks, suggests improvements, and predicts optimization outcomes.
                        </Text>
                      </Box>
                    </Alert>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="red.600">🚨 Identified Issues</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            {processMetrics.bottlenecks.map((bottleneck, index) => (
                              <HStack key={index} justify="space-between" p={3} bg="red.50" borderRadius="md">
                                <VStack align="start" spacing={1}>
                                  <Text fontSize="sm" fontWeight="semibold">{bottleneck}</Text>
                                  <Text fontSize="xs" color="gray.600">
                                    Causing {15 + Math.floor(Math.random() * 25)}% delay
                                  </Text>
                                </VStack>
                                <Button size="xs" colorScheme="red" variant="outline">
                                  Fix
                                </Button>
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold" color="green.600">💡 Optimization Suggestions</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <HStack justify="space-between" p={3} bg="green.50" borderRadius="md">
                              <VStack align="start" spacing={1}>
                                <Text fontSize="sm" fontWeight="semibold">Automate Welcome Emails</Text>
                                <Text fontSize="xs" color="gray.600">Potential 25% time reduction</Text>
                              </VStack>
                              <Button size="xs" colorScheme="green">
                                Apply
                              </Button>
                            </HStack>
                            <HStack justify="space-between" p={3} bg="green.50" borderRadius="md">
                              <VStack align="start" spacing={1}>
                                <Text fontSize="sm" fontWeight="semibold">Parallel Processing</Text>
                                <Text fontSize="xs" color="gray.600">Run design and dev in parallel</Text>
                              </VStack>
                              <Button size="xs" colorScheme="green">
                                Apply
                              </Button>
                            </HStack>
                            <HStack justify="space-between" p={3} bg="green.50" borderRadius="md">
                              <VStack align="start" spacing={1}>
                                <Text fontSize="sm" fontWeight="semibold">Resource Reallocation</Text>
                                <Text fontSize="xs" color="gray.600">Reduce setup call duration</Text>
                              </VStack>
                              <Button size="xs" colorScheme="green">
                                Apply
                              </Button>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>

                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">🎯 Optimization Targets</Text>
                      </CardHeader>
                      <CardBody>
                        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                          <VStack spacing={3}>
                            <Text fontSize="lg" fontWeight="semibold">Efficiency Target</Text>
                            <CircularProgress value={85} size="100px" color="green.400">
                              <CircularProgressLabel>85%</CircularProgressLabel>
                            </CircularProgress>
                            <Text fontSize="sm" color="gray.600">Current: {processMetrics.averageEfficiency}%</Text>
                          </VStack>
                          <VStack spacing={3}>
                            <Text fontSize="lg" fontWeight="semibold">Cost Reduction</Text>
                            <CircularProgress value={30} size="100px" color="blue.400">
                              <CircularProgressLabel>30%</CircularProgressLabel>
                            </CircularProgress>
                            <Text fontSize="sm" color="gray.600">Target savings</Text>
                          </VStack>
                          <VStack spacing={3}>
                            <Text fontSize="lg" fontWeight="semibold">Time Reduction</Text>
                            <CircularProgress value={20} size="100px" color="purple.400">
                              <CircularProgressLabel>20%</CircularProgressLabel>
                            </CircularProgress>
                            <Text fontSize="sm" color="gray.600">Cycle time improvement</Text>
                          </VStack>
                        </Grid>
                      </CardBody>
                    </Card>
                  </VStack>
                </TabPanel>

                {/* Process Intelligence */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Process Intelligence & Insights</Text>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">🧠 AI Insights</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={3}>
                            <Alert status="success" size="sm">
                              <AlertIcon />
                              <Text fontSize="sm">Marketing campaigns show 18% higher efficiency when content creation is front-loaded</Text>
                            </Alert>
                            <Alert status="warning" size="sm">
                              <AlertIcon />
                              <Text fontSize="sm">Setup calls longer than 6 hours correlate with 35% higher churn rates</Text>
                            </Alert>
                            <Alert status="info" size="sm">
                              <AlertIcon />
                              <Text fontSize="sm">Development processes benefit from 2-day design review checkpoints</Text>
                            </Alert>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">📈 Predictive Analytics</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={4}>
                            <Box>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm">Customer Onboarding Success Rate</Text>
                                <Text fontSize="sm" fontWeight="semibold">87%</Text>
                              </HStack>
                              <Progress value={87} size="sm" colorScheme="green" />
                            </Box>
                            <Box>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm">Project Delivery Confidence</Text>
                                <Text fontSize="sm" fontWeight="semibold">72%</Text>
                              </HStack>
                              <Progress value={72} size="sm" colorScheme="yellow" />
                            </Box>
                            <Box>
                              <HStack justify="space-between" mb={2}>
                                <Text fontSize="sm">Campaign ROI Prediction</Text>
                                <Text fontSize="sm" fontWeight="semibold">94%</Text>
                              </HStack>
                              <Progress value={94} size="sm" colorScheme="blue" />
                            </Box>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>

                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">🎯 Strategic Recommendations</Text>
                      </CardHeader>
                      <CardBody>
                        <Accordion allowToggle>
                          <AccordionItem>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                <HStack>
                                  <Badge colorScheme="red">High Priority</Badge>
                                  <Text fontWeight="semibold">Streamline Customer Onboarding</Text>
                                </HStack>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                              <VStack align="stretch" spacing={2}>
                                <Text fontSize="sm">
                                  The initial setup call is taking 65% longer than optimal. Consider:
                                </Text>
                                <Text fontSize="sm" pl={4}>• Pre-call configuration automation</Text>
                                <Text fontSize="sm" pl={4}>• Self-service setup wizard</Text>
                                <Text fontSize="sm" pl={4}>• Dedicated technical onboarding team</Text>
                              </VStack>
                            </AccordionPanel>
                          </AccordionItem>

                          <AccordionItem>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                <HStack>
                                  <Badge colorScheme="yellow">Medium Priority</Badge>
                                  <Text fontWeight="semibold">Optimize Development Workflow</Text>
                                </HStack>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                              <VStack align="stretch" spacing={2}>
                                <Text fontSize="sm">
                                  Development efficiency can be improved through:
                                </Text>
                                <Text fontSize="sm" pl={4}>• Parallel design and development phases</Text>
                                <Text fontSize="sm" pl={4}>• Automated testing integration</Text>
                                <Text fontSize="sm" pl={4}>• Code review checkpoint optimization</Text>
                              </VStack>
                            </AccordionPanel>
                          </AccordionItem>

                          <AccordionItem>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                <HStack>
                                  <Badge colorScheme="blue">Enhancement</Badge>
                                  <Text fontWeight="semibold">Marketing Campaign Automation</Text>
                                </HStack>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                              <VStack align="stretch" spacing={2}>
                                <Text fontSize="sm">
                                  Leverage marketing automation for:
                                </Text>
                                <Text fontSize="sm" pl={4}>• Content scheduling and deployment</Text>
                                <Text fontSize="sm" pl={4}>• Performance monitoring and alerts</Text>
                                <Text fontSize="sm" pl={4}>• A/B testing automation</Text>
                              </VStack>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </CardBody>
                    </Card>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>

      {/* New Process Modal */}
      <Modal isOpen={isNewProcessModalOpen} onClose={onNewProcessModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Process Name</FormLabel>
              <Input 
                value={newProcessName}
                onChange={(e) => setNewProcessName(e.target.value)}
                placeholder="Enter process name..."
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNewProcessModalClose}>
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={createNewProcess}>
              Create Process
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Step Edit Modal */}
      <Modal isOpen={isStepModalOpen} onClose={onStepModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Process Step</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingStep && (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Step Name</FormLabel>
                  <Input value={editingStep.name} readOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea value={editingStep.description} readOnly />
                </FormControl>
                <SimpleGrid columns={2} spacing={4} w="100%">
                  <FormControl>
                    <FormLabel>Duration (hours)</FormLabel>
                    <NumberInput value={editingStep.duration} isReadOnly>
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cost ($)</FormLabel>
                    <NumberInput value={editingStep.cost} isReadOnly>
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>
                <FormControl>
                  <FormLabel>Owner</FormLabel>
                  <Input value={editingStep.owner} readOnly />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onStepModalClose}>
              Close
            </Button>
            <Button colorScheme="blue">
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EnhancedProcessManagement;