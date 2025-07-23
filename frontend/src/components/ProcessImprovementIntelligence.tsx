import React, { useState, useEffect } from 'react';
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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tag,
  TagLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, TimeIcon, TrendingUpIcon, TrendingDownIcon } from '@chakra-ui/icons';

interface Process {
  id: string;
  name: string;
  department: string;
  owner: string;
  type: 'Core' | 'Supporting' | 'Management';
  status: 'Optimized' | 'In Progress' | 'Needs Attention' | 'Critical';
  efficiency: number;
  cost: number;
  duration: number;
  quality: number;
  lastUpdated: string;
  issues: string[];
  improvements: string[];
}

interface Improvement {
  id: string;
  processId: string;
  title: string;
  description: string;
  method: 'Lean' | 'Six Sigma' | 'Kaizen' | 'Automation' | 'Reengineering';
  priority: 'High' | 'Medium' | 'Low';
  impact: number;
  effort: number;
  status: 'Planned' | 'In Progress' | 'Completed' | 'On Hold';
  roi: number;
  assignee: string;
  deadline: string;
}

interface Metric {
  label: string;
  value: number;
  unit: string;
  change: number;
  target: number;
  status: 'On Track' | 'At Risk' | 'Behind';
}

const ProcessImprovementIntelligence: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [improvements, setImprovements] = useState<Improvement[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [selectedImprovement, setSelectedImprovement] = useState<Improvement | null>(null);
  const { isOpen: isProcessOpen, onOpen: onProcessOpen, onClose: onProcessClose } = useDisclosure();
  const { isOpen: isImprovementOpen, onOpen: onImprovementOpen, onClose: onImprovementClose } = useDisclosure();

  useEffect(() => {
    const sampleProcesses: Process[] = [
      {
        id: '1',
        name: 'Customer Onboarding',
        department: 'Sales',
        owner: 'Sarah Mitchell',
        type: 'Core',
        status: 'In Progress',
        efficiency: 78,
        cost: 450,
        duration: 5.2,
        quality: 85,
        lastUpdated: '2024-02-20',
        issues: ['Manual data entry', 'Long approval chains', 'Inconsistent communication'],
        improvements: ['Automate form processing', 'Streamline approval workflow', 'Template standardization']
      },
      {
        id: '2',
        name: 'Inventory Management',
        department: 'Operations',
        owner: 'Marcus Johnson',
        type: 'Core',
        status: 'Optimized',
        efficiency: 92,
        cost: 1200,
        duration: 2.8,
        quality: 94,
        lastUpdated: '2024-02-18',
        issues: [],
        improvements: ['Real-time tracking implemented', 'Automated reordering', 'Predictive analytics']
      },
      {
        id: '3',
        name: 'Employee Recruitment',
        department: 'HR',
        owner: 'Elena Rodriguez',
        type: 'Supporting',
        status: 'Needs Attention',
        efficiency: 65,
        cost: 890,
        duration: 18.5,
        quality: 72,
        lastUpdated: '2024-02-22',
        issues: ['Slow screening process', 'Multiple interview rounds', 'Poor candidate experience'],
        improvements: ['AI-powered screening', 'Consolidated interviews', 'Mobile-friendly process']
      },
      {
        id: '4',
        name: 'Financial Reporting',
        department: 'Finance',
        owner: 'David Kim',
        type: 'Management',
        status: 'Critical',
        efficiency: 45,
        cost: 2100,
        duration: 12.0,
        quality: 68,
        lastUpdated: '2024-02-15',
        issues: ['Manual data compilation', 'Multiple systems', 'Error-prone calculations'],
        improvements: ['Automated data pipeline', 'Single source of truth', 'Real-time dashboards']
      }
    ];

    const sampleImprovements: Improvement[] = [
      {
        id: '1',
        processId: '1',
        title: 'Implement Customer Portal',
        description: 'Self-service portal for customers to complete onboarding steps independently',
        method: 'Automation',
        priority: 'High',
        impact: 85,
        effort: 60,
        status: 'In Progress',
        roi: 245,
        assignee: 'Tech Team',
        deadline: '2024-03-15'
      },
      {
        id: '2',
        processId: '3',
        title: 'AI Resume Screening',
        description: 'Implement AI-powered initial resume screening to reduce manual review time',
        method: 'Automation',
        priority: 'High',
        impact: 75,
        effort: 45,
        status: 'Planned',
        roi: 180,
        assignee: 'HR Tech Team',
        deadline: '2024-04-01'
      },
      {
        id: '3',
        processId: '4',
        title: 'Financial Data Integration',
        description: 'Integrate all financial systems into unified reporting platform',
        method: 'Reengineering',
        priority: 'High',
        impact: 90,
        effort: 80,
        status: 'Planned',
        roi: 320,
        assignee: 'Finance IT',
        deadline: '2024-05-30'
      },
      {
        id: '4',
        processId: '2',
        title: 'Predictive Maintenance',
        description: 'Implement predictive analytics for inventory optimization',
        method: 'Lean',
        priority: 'Medium',
        impact: 60,
        effort: 40,
        status: 'Completed',
        roi: 150,
        assignee: 'Operations Team',
        deadline: '2024-02-01'
      }
    ];

    setProcesses(sampleProcesses);
    setImprovements(sampleImprovements);
  }, []);

  const keyMetrics: Metric[] = [
    { label: 'Overall Process Efficiency', value: 70, unit: '%', change: 8.5, target: 85, status: 'On Track' },
    { label: 'Average Process Cost', value: 1160, unit: '$', change: -12.3, target: 1000, status: 'At Risk' },
    { label: 'Process Cycle Time', value: 9.6, unit: 'days', change: -15.2, target: 7, status: 'On Track' },
    { label: 'Quality Score', value: 80, unit: '%', change: 5.8, target: 90, status: 'Behind' }
  ];

  const ProcessDashboard = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">🔄 Process Intelligence Dashboard</Text>
        <Button colorScheme="blue" leftIcon={<AddIcon />}>
          Add New Process
        </Button>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        {keyMetrics.map((metric, idx) => (
          <Stat key={idx} bg="white" p={4} borderRadius="md" shadow="sm">
            <StatLabel>{metric.label}</StatLabel>
            <StatNumber>{metric.value}{metric.unit}</StatNumber>
            <StatHelpText>
              <StatArrow type={metric.change > 0 ? 'increase' : 'decrease'} />
              {Math.abs(metric.change)}%
              <Badge
                ml={2}
                colorScheme={
                  metric.status === 'On Track' ? 'green' :
                  metric.status === 'At Risk' ? 'yellow' : 'red'
                }
                size="sm"
              >
                {metric.status}
              </Badge>
            </StatHelpText>
          </Stat>
        ))}
      </Grid>

      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontWeight="bold">Process Overview</Text>
            <HStack>
              <Badge colorScheme="green">Optimized: {processes.filter(p => p.status === 'Optimized').length}</Badge>
              <Badge colorScheme="red">Critical: {processes.filter(p => p.status === 'Critical').length}</Badge>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Process</Th>
                <Th>Department</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Efficiency</Th>
                <Th>Cost</Th>
                <Th>Quality</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {processes.map((process) => (
                <Tr key={process.id}>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" fontSize="sm">{process.name}</Text>
                      <Text fontSize="xs" color="gray.600">Owner: {process.owner}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Badge colorScheme="gray" variant="subtle">{process.department}</Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      process.type === 'Core' ? 'blue' :
                      process.type === 'Supporting' ? 'purple' : 'orange'
                    } variant="subtle">
                      {process.type}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      process.status === 'Optimized' ? 'green' :
                      process.status === 'In Progress' ? 'blue' :
                      process.status === 'Needs Attention' ? 'yellow' : 'red'
                    }>
                      {process.status}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Progress value={process.efficiency} colorScheme="green" size="sm" w="60px" />
                      <Text fontSize="xs">{process.efficiency}%</Text>
                    </VStack>
                  </Td>
                  <Td>${process.cost}</Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Progress value={process.quality} colorScheme="blue" size="sm" w="60px" />
                      <Text fontSize="xs">{process.quality}%</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack>
                      <IconButton
                        aria-label="View process"
                        icon={<EditIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedProcess(process);
                          onProcessOpen();
                        }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </VStack>
  );

  const ImprovementTracker = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">🚀 Improvement Initiative Tracker</Text>
        <Button colorScheme="green" leftIcon={<AddIcon />}>
          New Initiative
        </Button>
      </HStack>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Improvement Methodology Integration</Text>
          <Text fontSize="sm">
            Combining Lean, Six Sigma, Kaizen, and automation approaches for maximum impact
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="1fr 1fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">Initiative Status</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Completed</Text>
                <CircularProgress value={75} color="green.400" size="60px">
                  <CircularProgressLabel fontSize="xs">
                    {improvements.filter(i => i.status === 'Completed').length}
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">In Progress</Text>
                <CircularProgress value={50} color="blue.400" size="60px">
                  <CircularProgressLabel fontSize="xs">
                    {improvements.filter(i => i.status === 'In Progress').length}
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Planned</Text>
                <CircularProgress value={25} color="yellow.400" size="60px">
                  <CircularProgressLabel fontSize="xs">
                    {improvements.filter(i => i.status === 'Planned').length}
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Methodology Breakdown</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Automation</Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {improvements.filter(i => i.method === 'Automation').length}
                  </Text>
                </HStack>
                <Progress 
                  value={(improvements.filter(i => i.method === 'Automation').length / improvements.length) * 100} 
                  colorScheme="purple" 
                  size="sm" 
                />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Lean</Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {improvements.filter(i => i.method === 'Lean').length}
                  </Text>
                </HStack>
                <Progress 
                  value={(improvements.filter(i => i.method === 'Lean').length / improvements.length) * 100} 
                  colorScheme="green" 
                  size="sm" 
                />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Six Sigma</Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {improvements.filter(i => i.method === 'Six Sigma').length}
                  </Text>
                </HStack>
                <Progress 
                  value={(improvements.filter(i => i.method === 'Six Sigma').length / improvements.length) * 100} 
                  colorScheme="blue" 
                  size="sm" 
                />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Reengineering</Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {improvements.filter(i => i.method === 'Reengineering').length}
                  </Text>
                </HStack>
                <Progress 
                  value={(improvements.filter(i => i.method === 'Reengineering').length / improvements.length) * 100} 
                  colorScheme="orange" 
                  size="sm" 
                />
              </Box>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">ROI Impact</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <Stat textAlign="center">
                <StatLabel>Total Expected ROI</StatLabel>
                <StatNumber fontSize="2xl">
                  {Math.round(improvements.reduce((sum, i) => sum + i.roi, 0) / improvements.length)}%
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Average across all initiatives
                </StatHelpText>
              </Stat>
              <Divider />
              <Box w="full">
                <Text fontSize="sm" fontWeight="semibold" mb={2}>High Impact Initiatives</Text>
                <VStack spacing={2}>
                  {improvements
                    .filter(i => i.impact >= 80)
                    .slice(0, 3)
                    .map((improvement) => (
                      <HStack key={improvement.id} justify="space-between" w="full" p={2} bg="gray.50" borderRadius="md">
                        <Text fontSize="xs">{improvement.title}</Text>
                        <Badge colorScheme="green" size="sm">{improvement.impact}%</Badge>
                      </HStack>
                    ))}
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Active Improvement Initiatives</Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Initiative</Th>
                <Th>Process</Th>
                <Th>Method</Th>
                <Th>Priority</Th>
                <Th>Impact</Th>
                <Th>Effort</Th>
                <Th>ROI</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {improvements.map((improvement) => {
                const process = processes.find(p => p.id === improvement.processId);
                return (
                  <Tr key={improvement.id}>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold" fontSize="sm">{improvement.title}</Text>
                        <Text fontSize="xs" color="gray.600">Due: {improvement.deadline}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Text fontSize="sm">{process?.name}</Text>
                    </Td>
                    <Td>
                      <Badge colorScheme={
                        improvement.method === 'Automation' ? 'purple' :
                        improvement.method === 'Lean' ? 'green' :
                        improvement.method === 'Six Sigma' ? 'blue' :
                        improvement.method === 'Kaizen' ? 'teal' : 'orange'
                      } variant="subtle">
                        {improvement.method}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge colorScheme={
                        improvement.priority === 'High' ? 'red' :
                        improvement.priority === 'Medium' ? 'yellow' : 'green'
                      }>
                        {improvement.priority}
                      </Badge>
                    </Td>
                    <Td>
                      <Progress value={improvement.impact} colorScheme="green" size="sm" w="60px" />
                      <Text fontSize="xs" mt={1}>{improvement.impact}%</Text>
                    </Td>
                    <Td>
                      <Progress value={improvement.effort} colorScheme="orange" size="sm" w="60px" />
                      <Text fontSize="xs" mt={1}>{improvement.effort}%</Text>
                    </Td>
                    <Td>{improvement.roi}%</Td>
                    <Td>
                      <Badge colorScheme={
                        improvement.status === 'Completed' ? 'green' :
                        improvement.status === 'In Progress' ? 'blue' :
                        improvement.status === 'Planned' ? 'yellow' : 'gray'
                      }>
                        {improvement.status}
                      </Badge>
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="View improvement"
                        icon={<EditIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedImprovement(improvement);
                          onImprovementOpen();
                        }}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </VStack>
  );

  const AnalyticsInsights = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">📊 Process Analytics & Insights</Text>
      
      <Card>
        <CardHeader>
          <Text fontWeight="bold">Process Performance Trends</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="1fr 1fr" gap={6}>
            <VStack align="start" spacing={4}>
              <Text fontSize="md" fontWeight="semibold">📈 Efficiency Trends</Text>
              <Box w="full" h="200px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                <Text color="gray.500">Efficiency Chart Placeholder</Text>
              </Box>
              <Alert status="success" variant="left-accent">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">Trend Analysis</Text>
                  <Text fontSize="sm">Overall efficiency improved by 15% over last quarter</Text>
                </VStack>
              </Alert>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontSize="md" fontWeight="semibold">💰 Cost Optimization</Text>
              <Box w="full" h="200px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                <Text color="gray.500">Cost Chart Placeholder</Text>
              </Box>
              <Alert status="info" variant="left-accent">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">Cost Savings</Text>
                  <Text fontSize="sm">$127K saved through process improvements this quarter</Text>
                </VStack>
              </Alert>
            </VStack>
          </Grid>
        </CardBody>
      </Card>

      <Grid templateColumns="1fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">Process Health Score</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {processes.map((process) => (
                <Box key={process.id} w="full">
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="semibold">{process.name}</Text>
                    <Badge colorScheme={
                      ((process.efficiency + process.quality) / 2) >= 85 ? 'green' :
                      ((process.efficiency + process.quality) / 2) >= 70 ? 'yellow' : 'red'
                    }>
                      {Math.round((process.efficiency + process.quality) / 2)}%
                    </Badge>
                  </HStack>
                  <Progress 
                    value={(process.efficiency + process.quality) / 2} 
                    colorScheme={
                      ((process.efficiency + process.quality) / 2) >= 85 ? 'green' :
                      ((process.efficiency + process.quality) / 2) >= 70 ? 'yellow' : 'red'
                    }
                    size="sm" 
                  />
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Improvement Recommendations</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="start">
              <Alert status="error" variant="left-accent">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">🚨 Critical: Financial Reporting</Text>
                  <Text fontSize="sm">45% efficiency - Immediate automation needed</Text>
                </VStack>
              </Alert>
              <Alert status="warning" variant="left-accent">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">⚠️ Attention: Employee Recruitment</Text>
                  <Text fontSize="sm">Consider AI screening to reduce 18.5-day cycle time</Text>
                </VStack>
              </Alert>
              <Alert status="info" variant="left-accent">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">💡 Opportunity: Customer Onboarding</Text>
                  <Text fontSize="sm">Self-service portal could improve efficiency by 30%</Text>
                </VStack>
              </Alert>
              <Alert status="success" variant="left-accent">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">✅ Success: Inventory Management</Text>
                  <Text fontSize="sm">92% efficiency achieved through automation</Text>
                </VStack>
              </Alert>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Process Methodology Framework</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">🏭</Text>
              <Text fontSize="sm" fontWeight="semibold">Lean Manufacturing</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Eliminate waste, reduce cycle time, improve flow
              </Text>
              <Badge colorScheme="green">Active</Badge>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">📊</Text>
              <Text fontSize="sm" fontWeight="semibold">Six Sigma</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Data-driven quality improvement, defect reduction
              </Text>
              <Badge colorScheme="blue">Active</Badge>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">🔄</Text>
              <Text fontSize="sm" fontWeight="semibold">Kaizen</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Continuous improvement, employee engagement
              </Text>
              <Badge colorScheme="teal">Active</Badge>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">🤖</Text>
              <Text fontSize="sm" fontWeight="semibold">Automation</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Technology-driven efficiency, error reduction
              </Text>
              <Badge colorScheme="purple">Priority</Badge>
            </VStack>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box>
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>🔄 Dashboard</Tab>
          <Tab>🚀 Improvements</Tab>
          <Tab>📊 Analytics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProcessDashboard />
          </TabPanel>
          <TabPanel>
            <ImprovementTracker />
          </TabPanel>
          <TabPanel>
            <AnalyticsInsights />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Process Detail Modal */}
      <Modal isOpen={isProcessOpen} onClose={onProcessClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Process Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedProcess && (
              <VStack spacing={4} align="start">
                <Text fontWeight="bold" fontSize="lg">{selectedProcess.name}</Text>
                <HStack wrap="wrap">
                  <Badge colorScheme="gray">{selectedProcess.department}</Badge>
                  <Badge colorScheme="blue">{selectedProcess.type}</Badge>
                  <Badge colorScheme={
                    selectedProcess.status === 'Optimized' ? 'green' :
                    selectedProcess.status === 'In Progress' ? 'blue' :
                    selectedProcess.status === 'Needs Attention' ? 'yellow' : 'red'
                  }>
                    {selectedProcess.status}
                  </Badge>
                </HStack>
                <Divider />
                <Grid templateColumns="1fr 1fr" gap={4} w="full">
                  <Stat>
                    <StatLabel>Efficiency</StatLabel>
                    <StatNumber>{selectedProcess.efficiency}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Quality</StatLabel>
                    <StatNumber>{selectedProcess.quality}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Cost</StatLabel>
                    <StatNumber>${selectedProcess.cost}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Duration</StatLabel>
                    <StatNumber>{selectedProcess.duration} days</StatNumber>
                  </Stat>
                </Grid>
                <Box w="full">
                  <Text fontWeight="semibold" mb={2}>Process Owner</Text>
                  <Text color="gray.600">{selectedProcess.owner}</Text>
                </Box>
                <Box w="full">
                  <Text fontWeight="semibold" mb={2}>Current Issues</Text>
                  <VStack align="start" spacing={1}>
                    {selectedProcess.issues.map((issue, idx) => (
                      <HStack key={idx}>
                        <Badge colorScheme="red" variant="subtle" size="sm">⚠️</Badge>
                        <Text fontSize="sm" color="gray.600">{issue}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
                <Box w="full">
                  <Text fontWeight="semibold" mb={2}>Planned Improvements</Text>
                  <VStack align="start" spacing={1}>
                    {selectedProcess.improvements.map((improvement, idx) => (
                      <HStack key={idx}>
                        <Badge colorScheme="green" variant="subtle" size="sm">✅</Badge>
                        <Text fontSize="sm" color="gray.600">{improvement}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Improvement Detail Modal */}
      <Modal isOpen={isImprovementOpen} onClose={onImprovementClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Improvement Initiative</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedImprovement && (
              <VStack spacing={4} align="start">
                <Text fontWeight="bold" fontSize="lg">{selectedImprovement.title}</Text>
                <Text color="gray.600">{selectedImprovement.description}</Text>
                <HStack wrap="wrap">
                  <Badge colorScheme="purple">{selectedImprovement.method}</Badge>
                  <Badge colorScheme={
                    selectedImprovement.priority === 'High' ? 'red' :
                    selectedImprovement.priority === 'Medium' ? 'yellow' : 'green'
                  }>
                    {selectedImprovement.priority}
                  </Badge>
                  <Badge colorScheme={
                    selectedImprovement.status === 'Completed' ? 'green' :
                    selectedImprovement.status === 'In Progress' ? 'blue' :
                    selectedImprovement.status === 'Planned' ? 'yellow' : 'gray'
                  }>
                    {selectedImprovement.status}
                  </Badge>
                </HStack>
                <Divider />
                <Grid templateColumns="1fr 1fr" gap={4} w="full">
                  <Stat>
                    <StatLabel>Impact</StatLabel>
                    <StatNumber>{selectedImprovement.impact}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Effort</StatLabel>
                    <StatNumber>{selectedImprovement.effort}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>ROI</StatLabel>
                    <StatNumber>{selectedImprovement.roi}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Deadline</StatLabel>
                    <StatNumber fontSize="sm">{selectedImprovement.deadline}</StatNumber>
                  </Stat>
                </Grid>
                <Box w="full">
                  <Text fontWeight="semibold" mb={2}>Assigned Team</Text>
                  <Text color="gray.600">{selectedImprovement.assignee}</Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProcessImprovementIntelligence;