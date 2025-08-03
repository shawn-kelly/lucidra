import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Progress,
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
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
  AvatarGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useToast,
  Spinner,
  Flex,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Tag,
  TagLabel,
  TagCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';

interface Process {
  id: string;
  name: string;
  department: string;
  owner: string;
  status: 'active' | 'inactive' | 'under_review' | 'optimizing';
  efficiency: number;
  bottlenecks: string[];
  conflicts: string[];
  dependencies: string[];
  integrations: string[];
  lastUpdated: string;
  team: Array<{id: string, name: string, role: string, avatar?: string}>;
  metrics: {
    cycleTime: number;
    throughput: number;
    errorRate: number;
    costPerUnit: number;
  };
  aiRecommendations: string[];
}

interface AIAssistant {
  isActive: boolean;
  currentSuggestion: string;
  insights: string[];
  alerts: Array<{type: 'warning' | 'error' | 'info', message: string}>;
}

const OrganizationWideProcessManagement: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [aiAssistant, setAiAssistant] = useState<AIAssistant>({
    isActive: true,
    currentSuggestion: '',
    insights: [],
    alerts: []
  });
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [collaborationMode, setCollaborationMode] = useState(false);
  const [realTimeUsers, setRealTimeUsers] = useState<Array<{id: string, name: string, action: string}>>([]);
  
  const { isOpen: isProcessModalOpen, onOpen: onProcessModalOpen, onClose: onProcessModalClose } = useDisclosure();
  const { isOpen: isAIModalOpen, onOpen: onAIModalOpen, onClose: onAIModalClose } = useDisclosure();
  const toast = useToast();

  // Initialize with demo data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setProcesses([
        {
          id: 'proc-001',
          name: 'Customer Onboarding',
          department: 'Sales & Marketing',
          owner: 'Sarah Johnson',
          status: 'active',
          efficiency: 78,
          bottlenecks: ['Document verification delays', 'Manual approval process'],
          conflicts: ['Overlapping with customer service workflows'],
          dependencies: ['CRM system', 'Document management', 'Payment processing'],
          integrations: ['Mission Statement Module', 'Financial Analysis', 'HR Management'],
          lastUpdated: '2025-08-03',
          team: [
            {id: '1', name: 'Sarah Johnson', role: 'Process Owner'},
            {id: '2', name: 'Mike Chen', role: 'Analyst'},
            {id: '3', name: 'Lisa Park', role: 'Coordinator'}
          ],
          metrics: {
            cycleTime: 5.2,
            throughput: 24,
            errorRate: 3.1,
            costPerUnit: 45.60
          },
          aiRecommendations: [
            'Implement automated document verification',
            'Create parallel approval pathways',
            'Integrate with Blue Ocean Strategy for competitive advantage'
          ]
        },
        {
          id: 'proc-002',
          name: 'Product Development',
          department: 'R&D',
          owner: 'Dr. Alex Rodriguez',
          status: 'optimizing',
          efficiency: 65,
          bottlenecks: ['Resource allocation conflicts', 'Testing phase delays'],
          conflicts: ['Budget approval overlap with financial processes'],
          dependencies: ['Project management', 'Quality assurance', 'Market research'],
          integrations: ['Strategy Frameworks', 'Porter Five Forces', 'Data Pulse Intelligence'],
          lastUpdated: '2025-08-02',
          team: [
            {id: '4', name: 'Dr. Alex Rodriguez', role: 'Process Owner'},
            {id: '5', name: 'Emma Wilson', role: 'Lead Developer'},
            {id: '6', name: 'James Lee', role: 'QA Manager'}
          ],
          metrics: {
            cycleTime: 12.8,
            throughput: 8,
            errorRate: 5.7,
            costPerUnit: 1250.00
          },
          aiRecommendations: [
            'Optimize resource allocation using AI predictions',
            'Implement agile testing methodologies',
            'Connect with market intelligence for trend-based development'
          ]
        },
        {
          id: 'proc-003',
          name: 'Supply Chain Management',
          department: 'Operations',
          owner: 'Maria Santos',
          status: 'under_review',
          efficiency: 82,
          bottlenecks: ['Vendor communication gaps', 'Inventory forecasting'],
          conflicts: ['Procurement timing with production schedules'],
          dependencies: ['ERP system', 'Vendor management', 'Logistics'],
          integrations: ['Financial Analysis', 'Data Pulse', 'Execution Tracker'],
          lastUpdated: '2025-08-01',
          team: [
            {id: '7', name: 'Maria Santos', role: 'Process Owner'},
            {id: '8', name: 'Kevin Wong', role: 'Supply Chain Analyst'},
            {id: '9', name: 'Rachel Green', role: 'Vendor Relations'}
          ],
          metrics: {
            cycleTime: 8.5,
            throughput: 18,
            errorRate: 2.3,
            costPerUnit: 89.40
          },
          aiRecommendations: [
            'Implement predictive analytics for inventory',
            'Automate vendor communications',
            'Integrate with financial forecasting modules'
          ]
        }
      ]);
      
      setAiAssistant({
        isActive: true,
        currentSuggestion: 'AI Analysis: Customer Onboarding process shows 23% improvement potential through automation. Recommend immediate action on document verification bottleneck.',
        insights: [
          'Cross-department process conflicts detected in 3 areas',
          'Potential 18% efficiency gain through module integration',
          'Real-time collaboration can reduce cycle time by 15%',
          'AI-driven resource allocation could optimize 5 processes simultaneously'
        ],
        alerts: [
          {type: 'warning', message: 'Document verification bottleneck affecting 3 processes'},
          {type: 'error', message: 'Critical conflict detected between procurement and production'},
          {type: 'info', message: 'New integration opportunity with Data Pulse module identified'}
        ]
      });
      
      setRealTimeUsers([
        {id: '1', name: 'Sarah Johnson', action: 'Editing Customer Onboarding'},
        {id: '2', name: 'Mike Chen', action: 'Analyzing metrics'},
        {id: '3', name: 'Dr. Alex Rodriguez', action: 'Reviewing R&D process'}
      ]);
      
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleProcessSelect = (process: Process) => {
    setSelectedProcess(process);
    onProcessModalOpen();
  };

  const handleAIRecommendation = (processId: string, recommendation: string) => {
    toast({
      title: "AI Recommendation Applied",
      description: `Implementing: ${recommendation}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const renderProcessCard = (process: Process) => (
    <Card 
      key={process.id} 
      cursor="pointer" 
      onClick={() => handleProcessSelect(process)}
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
      transition="all 0.2s"
      borderLeft="4px solid"
      borderLeftColor={
        process.status === 'active' ? 'green.400' :
        process.status === 'optimizing' ? 'orange.400' :
        process.status === 'under_review' ? 'blue.400' : 'gray.400'
      }
    >
      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" fontSize="lg">{process.name}</Text>
            <HStack>
              <Badge colorScheme="purple" size="sm">{process.department}</Badge>
              <Badge 
                colorScheme={
                  process.status === 'active' ? 'green' :
                  process.status === 'optimizing' ? 'orange' :
                  process.status === 'under_review' ? 'blue' : 'gray'
                }
                size="sm"
              >
                {process.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </HStack>
          </VStack>
          <VStack align="end" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold" color="teal.500">
              {process.efficiency}%
            </Text>
            <Text fontSize="xs" color="gray.500">Efficiency</Text>
          </VStack>
        </Flex>
      </CardHeader>
      <CardBody pt={0}>
        <VStack align="start" spacing={3}>
          <Box w="full">
            <Text fontSize="sm" color="gray.600" mb={2}>Process Health</Text>
            <Progress 
              value={process.efficiency} 
              colorScheme={process.efficiency > 80 ? 'green' : process.efficiency > 60 ? 'orange' : 'red'}
              size="md"
              borderRadius="md"
            />
          </Box>
          
          <SimpleGrid columns={2} spacing={4} w="full">
            <Stat size="sm">
              <StatLabel>Cycle Time</StatLabel>
              <StatNumber fontSize="md">{process.metrics.cycleTime}d</StatNumber>
            </Stat>
            <Stat size="sm">
              <StatLabel>Throughput</StatLabel>
              <StatNumber fontSize="md">{process.metrics.throughput}/day</StatNumber>
            </Stat>
          </SimpleGrid>

          {process.bottlenecks.length > 0 && (
            <Box w="full">
              <Text fontSize="sm" fontWeight="semibold" color="red.500" mb={1}>
                🚫 Active Bottlenecks ({process.bottlenecks.length})
              </Text>
              <Text fontSize="xs" color="gray.600">
                {process.bottlenecks[0]}
                {process.bottlenecks.length > 1 && ` +${process.bottlenecks.length - 1} more`}
              </Text>
            </Box>
          )}

          {process.conflicts.length > 0 && (
            <Box w="full">
              <Text fontSize="sm" fontWeight="semibold" color="orange.500" mb={1}>
                ⚠️ Conflicts ({process.conflicts.length})
              </Text>
              <Text fontSize="xs" color="gray.600">
                {process.conflicts[0]}
              </Text>
            </Box>
          )}

          <Box w="full">
            <Text fontSize="sm" fontWeight="semibold" color="blue.500" mb={1}>
              🔗 Module Integrations ({process.integrations.length})
            </Text>
            <Flex wrap="wrap" gap={1}>
              {process.integrations.slice(0, 3).map((integration, idx) => (
                <Tag key={idx} size="sm" colorScheme="blue">
                  {integration}
                </Tag>
              ))}
              {process.integrations.length > 3 && (
                <Tag size="sm" variant="outline">+{process.integrations.length - 3}</Tag>
              )}
            </Flex>
          </Box>

          <Box w="full">
            <Text fontSize="sm" fontWeight="semibold" mb={1}>Team</Text>
            <AvatarGroup size="sm" max={3}>
              {process.team.map(member => (
                <Avatar key={member.id} name={member.name} />
              ))}
            </AvatarGroup>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );

  const renderAIDashboard = () => (
    <Card>
      <CardHeader>
        <HStack justify="space-between">
          <HStack>
            <Text fontSize="xl" fontWeight="bold">🤖 AI Process Assistant</Text>
            <Badge colorScheme="green" variant="subtle">ACTIVE</Badge>
          </HStack>
          <Button size="sm" variant="outline" onClick={onAIModalOpen}>
            View Details
          </Button>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack align="start" spacing={4}>
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="semibold">Current AI Insight</Text>
              <Text fontSize="sm">{aiAssistant.currentSuggestion}</Text>
            </Box>
          </Alert>

          <Box w="full">
            <Text fontWeight="semibold" mb={2}>🚨 Active Alerts</Text>
            <VStack align="start" spacing={2}>
              {aiAssistant.alerts.map((alert, idx) => (
                <Alert key={idx} status={alert.type} size="sm" borderRadius="md">
                  <AlertIcon />
                  <Text fontSize="sm">{alert.message}</Text>
                </Alert>
              ))}
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );

  const renderRealTimeCollaboration = () => (
    <Card>
      <CardHeader>
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="bold">👥 Real-Time Collaboration</Text>
          <Switch 
            isChecked={collaborationMode} 
            onChange={(e) => setCollaborationMode(e.target.checked)}
            colorScheme="teal"
          />
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack align="start" spacing={3}>
          <Text fontSize="sm" color="gray.600">
            {collaborationMode ? 'Live collaboration active' : 'Enable real-time collaboration'}
          </Text>
          
          {collaborationMode && (
            <VStack align="start" spacing={2} w="full">
              <Text fontWeight="semibold" fontSize="sm">Active Users</Text>
              {realTimeUsers.map(user => (
                <HStack key={user.id} w="full">
                  <Avatar size="xs" name={user.name} />
                  <VStack align="start" spacing={0} flex="1">
                    <Text fontSize="sm" fontWeight="semibold">{user.name}</Text>
                    <Text fontSize="xs" color="gray.500">{user.action}</Text>
                  </VStack>
                  <Badge size="sm" colorScheme="green">LIVE</Badge>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );

  const renderOrganizationMetrics = () => (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
      <Stat>
        <StatLabel>Total Processes</StatLabel>
        <StatNumber>24</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          12% from last month
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Avg Efficiency</StatLabel>
        <StatNumber>75%</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          8% improvement
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Active Bottlenecks</StatLabel>
        <StatNumber>7</StatNumber>
        <StatHelpText>
          <StatArrow type="decrease" />
          3 resolved this week
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Cost Savings</StatLabel>
        <StatNumber>$42K</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" />
          This quarter
        </StatHelpText>
      </Stat>
    </SimpleGrid>
  );

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" color="teal.500" />
        <Text mt={4} fontSize="lg">Loading Organization-Wide Process Management...</Text>
        <Text fontSize="sm" color="gray.600">Analyzing processes, connections, and AI insights</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Text fontSize="3xl" fontWeight="bold" mb={2}>
            🔄 Organization-Wide Process Management
          </Text>
          <Text fontSize="lg" color="gray.600">
            Coordinate, optimize, and integrate all organizational processes with AI assistance
          </Text>
        </Box>

        {/* Organization Metrics */}
        {renderOrganizationMetrics()}

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>📊 Process Overview</Tab>
            <Tab>🤖 AI Assistant</Tab>
            <Tab>👥 Collaboration</Tab>
            <Tab>🔗 Integrations</Tab>
            <Tab>📈 Analytics</Tab>
          </TabList>

          <TabPanels>
            {/* Process Overview Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="xl" fontWeight="bold">Active Processes</Text>
                  <Button colorScheme="teal" leftIcon={<Text>➕</Text>}>
                    Create New Process
                  </Button>
                </HStack>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                  {processes.map(renderProcessCard)}
                </Grid>
              </VStack>
            </TabPanel>

            {/* AI Assistant Tab */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                {renderAIDashboard()}
                {renderRealTimeCollaboration()}
              </SimpleGrid>
            </TabPanel>

            {/* Collaboration Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Alert status="success">
                  <AlertIcon />
                  <Box>
                    <Text fontWeight="semibold">Real-Time Collaboration Active</Text>
                    <Text fontSize="sm">
                      Teams can now work together in real-time to improve processes across the organization.
                    </Text>
                  </Box>
                </Alert>

                <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">🚀 Process Improvement Sessions</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <HStack w="full" p={3} bg="blue.50" borderRadius="md" border="1px solid" borderColor="blue.200">
                          <Box flex="1">
                            <Text fontWeight="semibold">Customer Onboarding Optimization</Text>
                            <Text fontSize="sm" color="gray.600">Active collaboration: 5 team members</Text>
                          </Box>
                          <Button size="sm" colorScheme="blue">Join Session</Button>
                        </HStack>
                        
                        <HStack w="full" p={3} bg="green.50" borderRadius="md" border="1px solid" borderColor="green.200">
                          <Box flex="1">
                            <Text fontWeight="semibold">Supply Chain Integration Review</Text>
                            <Text fontSize="sm" color="gray.600">Active collaboration: 3 team members</Text>
                          </Box>
                          <Button size="sm" colorScheme="green">Join Session</Button>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  {renderRealTimeCollaboration()}
                </Grid>
              </VStack>
            </TabPanel>

            {/* Integrations Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Text fontSize="xl" fontWeight="bold">🔗 Cross-Module Integration</Text>
                
                <Alert status="info">
                  <AlertIcon />
                  <Box>
                    <Text fontWeight="semibold">Smart Integration Active</Text>
                    <Text fontSize="sm">
                      Processes are automatically pulling data from Mission Statement, Blue Ocean Strategy, 
                      Financial Analysis, Data Pulse, and other Lucidra modules for comprehensive optimization.
                    </Text>
                  </Box>
                </Alert>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  <Card>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Text fontSize="2xl">🎯</Text>
                          <Text fontWeight="bold">Mission Integration</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Customer processes aligned with organizational mission statements
                        </Text>
                        <Badge colorScheme="green">Active</Badge>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Text fontSize="2xl">🌊</Text>
                          <Text fontWeight="bold">Blue Ocean Strategy</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Process innovations guided by blue ocean opportunities
                        </Text>
                        <Badge colorScheme="blue">Active</Badge>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Text fontSize="2xl">💰</Text>
                          <Text fontWeight="bold">Financial Analysis</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Cost optimization through financial data integration
                        </Text>
                        <Badge colorScheme="yellow">Active</Badge>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Text fontSize="2xl">📊</Text>
                          <Text fontWeight="bold">Data Pulse</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Real-time market signals influencing process decisions
                        </Text>
                        <Badge colorScheme="orange">Active</Badge>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Text fontSize="2xl">🏢</Text>
                          <Text fontWeight="bold">Porter Analysis</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Competitive analysis informing process improvements
                        </Text>
                        <Badge colorScheme="teal">Active</Badge>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack>
                          <Text fontSize="2xl">👥</Text>
                          <Text fontWeight="bold">HR Management</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Team capabilities and resource allocation optimization
                        </Text>
                        <Badge colorScheme="cyan">Active</Badge>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </VStack>
            </TabPanel>

            {/* Analytics Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Text fontSize="xl" fontWeight="bold">📈 Process Analytics & Insights</Text>
                
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">Efficiency Trends</Text>
                    </CardHeader>
                    <CardBody>
                      <Box h="200px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                        <Text color="gray.500">📊 Efficiency chart visualization</Text>
                      </Box>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">Bottleneck Analysis</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack w="full">
                          <Text flex="1" fontSize="sm">Document verification</Text>
                          <Progress value={85} size="sm" colorScheme="red" flex="2" />
                          <Text fontSize="sm" color="red.500">Critical</Text>
                        </HStack>
                        <HStack w="full">
                          <Text flex="1" fontSize="sm">Resource allocation</Text>
                          <Progress value={65} size="sm" colorScheme="orange" flex="2" />
                          <Text fontSize="sm" color="orange.500">High</Text>
                        </HStack>
                        <HStack w="full">
                          <Text flex="1" fontSize="sm">Vendor communication</Text>
                          <Progress value={40} size="sm" colorScheme="yellow" flex="2" />
                          <Text fontSize="sm" color="yellow.500">Medium</Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>

                <Card>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">🎯 AI-Driven Improvement Opportunities</Text>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <Box p={4} bg="green.50" borderRadius="md" border="1px solid" borderColor="green.200">
                        <VStack align="start" spacing={2}>
                          <HStack>
                            <Badge colorScheme="green">High Impact</Badge>
                            <Text fontSize="sm" fontWeight="bold">Automation Opportunity</Text>
                          </HStack>
                          <Text fontSize="sm">
                            Automate document verification across 3 processes for 23% efficiency gain
                          </Text>
                          <Button size="sm" colorScheme="green">Implement</Button>
                        </VStack>
                      </Box>

                      <Box p={4} bg="blue.50" borderRadius="md" border="1px solid" borderColor="blue.200">
                        <VStack align="start" spacing={2}>
                          <HStack>
                            <Badge colorScheme="blue">Medium Impact</Badge>
                            <Text fontSize="sm" fontWeight="bold">Integration Synergy</Text>
                          </HStack>
                          <Text fontSize="sm">
                            Connect supply chain with financial forecasting for 15% cost reduction
                          </Text>
                          <Button size="sm" colorScheme="blue">Review</Button>
                        </VStack>
                      </Box>
                    </Grid>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Process Detail Modal */}
        <Modal isOpen={isProcessModalOpen} onClose={onProcessModalClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedProcess?.name} - Detailed Process Management
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedProcess && (
                <VStack spacing={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    <Stat>
                      <StatLabel>Current Efficiency</StatLabel>
                      <StatNumber color="teal.500">{selectedProcess.efficiency}%</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Process Owner</StatLabel>
                      <StatNumber fontSize="lg">{selectedProcess.owner}</StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Department</StatLabel>
                      <StatNumber fontSize="lg">{selectedProcess.department}</StatNumber>
                    </Stat>
                  </SimpleGrid>

                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          🚫 Bottlenecks & Issues ({selectedProcess.bottlenecks.length})
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <VStack align="start" spacing={2}>
                          {selectedProcess.bottlenecks.map((bottleneck, idx) => (
                            <Alert key={idx} status="error" size="sm">
                              <AlertIcon />
                              <Text fontSize="sm">{bottleneck}</Text>
                            </Alert>
                          ))}
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          🤖 AI Recommendations ({selectedProcess.aiRecommendations.length})
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <VStack align="start" spacing={3}>
                          {selectedProcess.aiRecommendations.map((recommendation, idx) => (
                            <HStack key={idx} w="full" p={3} bg="blue.50" borderRadius="md">
                              <Text flex="1" fontSize="sm">{recommendation}</Text>
                              <Button 
                                size="sm" 
                                colorScheme="blue"
                                onClick={() => handleAIRecommendation(selectedProcess.id, recommendation)}
                              >
                                Apply
                              </Button>
                            </HStack>
                          ))}
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          🔗 Module Integrations ({selectedProcess.integrations.length})
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                          {selectedProcess.integrations.map((integration, idx) => (
                            <HStack key={idx} p={3} bg="green.50" borderRadius="md" border="1px solid" borderColor="green.200">
                              <Text flex="1" fontSize="sm" fontWeight="semibold">{integration}</Text>
                              <Badge colorScheme="green" size="sm">Connected</Badge>
                            </HStack>
                          ))}
                        </SimpleGrid>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3}>
                Save Changes
              </Button>
              <Button variant="ghost" onClick={onProcessModalClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default OrganizationWideProcessManagement;