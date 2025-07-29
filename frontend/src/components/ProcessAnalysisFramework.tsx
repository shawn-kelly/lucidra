import React, { useState, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Select,
  Alert,
  AlertIcon,
  Progress,
  Badge,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  IconButton,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Tooltip,
  Stack,
  Checkbox,
  RadioGroup,
  Radio
} from '@chakra-ui/react';

// Core data structures
interface SIPOCElement {
  id: string;
  category: 'supplier' | 'input' | 'process' | 'output' | 'customer';
  name: string;
  description: string;
  metrics?: string[];
  issues?: string[];
  opportunities?: string[];
}

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  owner: string;
  duration: number; // minutes
  cost: number; // dollars
  value: 'value-add' | 'non-value-add' | 'necessary-non-value-add';
  issues: string[];
  improvements: string[];
  swimlane: string;
}

interface SwimlaneRole {
  id: string;
  name: string;
  color: string;
  responsibilities: string[];
}

interface ProcessAnalysis {
  id: string;
  name: string;
  description: string;
  type: 'core' | 'support' | 'management';
  strategicAlignment: 'differentiation' | 'cost-leadership' | 'hybrid' | 'unclear';
  sipocElements: SIPOCElement[];
  processSteps: ProcessStep[];
  swimlanes: SwimlaneRole[];
  inefficiencies: InefficiencyAnalysis[];
  latentDemand: LatentDemandAnalysis[];
  recommendations: ProcessRecommendation[];
}

interface InefficiencyAnalysis {
  id: string;
  type: 'bottleneck' | 'waste' | 'rework' | 'waiting' | 'overprocessing' | 'handoff';
  description: string;
  impact: 'high' | 'medium' | 'low';
  costOfInaction: number;
  estimatedSavings: number;
  effortToFix: 'low' | 'medium' | 'high';
}

interface LatentDemandAnalysis {
  id: string;
  description: string;
  customerSegment: string;
  unmetNeed: string;
  potentialRevenue: number;
  implementationEffort: 'low' | 'medium' | 'high';
  strategicFit: 'high' | 'medium' | 'low';
}

interface ProcessRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'efficiency' | 'quality' | 'cost-reduction' | 'differentiation' | 'automation';
  priority: 'critical' | 'high' | 'medium' | 'low';
  timeline: string;
  investment: number;
  expectedROI: number;
  strategicAlignment: 'differentiation' | 'cost-leadership' | 'both';
}

// Template processes for common business functions
const PROCESS_TEMPLATES = [
  {
    name: 'Customer Onboarding',
    type: 'core' as const,
    description: 'End-to-end customer acquisition and setup process',
    swimlanes: [
      { id: 'sales', name: 'Sales Team', color: 'blue' },
      { id: 'customer-success', name: 'Customer Success', color: 'green' },
      { id: 'technical', name: 'Technical Team', color: 'purple' },
      { id: 'customer', name: 'Customer', color: 'orange' }
    ]
  },
  {
    name: 'Product Development',
    type: 'core' as const,
    description: 'Idea to market product development lifecycle',
    swimlanes: [
      { id: 'product', name: 'Product Management', color: 'red' },
      { id: 'engineering', name: 'Engineering', color: 'blue' },
      { id: 'design', name: 'Design Team', color: 'purple' },
      { id: 'qa', name: 'Quality Assurance', color: 'green' }
    ]
  },
  {
    name: 'Order Fulfillment',
    type: 'core' as const,
    description: 'Order processing to delivery completion',
    swimlanes: [
      { id: 'sales', name: 'Sales', color: 'blue' },
      { id: 'operations', name: 'Operations', color: 'green' },
      { id: 'warehouse', name: 'Warehouse', color: 'orange' },
      { id: 'logistics', name: 'Logistics', color: 'purple' }
    ]
  },
  {
    name: 'Employee Hiring',
    type: 'support' as const,
    description: 'Recruitment and onboarding workflow',
    swimlanes: [
      { id: 'hr', name: 'HR Team', color: 'green' },
      { id: 'hiring-manager', name: 'Hiring Manager', color: 'blue' },
      { id: 'candidate', name: 'Candidate', color: 'orange' },
      { id: 'leadership', name: 'Leadership', color: 'purple' }
    ]
  }
];

const INEFFICIENCY_PATTERNS = [
  {
    type: 'bottleneck' as const,
    indicators: ['Single point of failure', 'Long queue times', 'Resource constraints'],
    questions: ['Where do items wait the longest?', 'Which steps limit overall throughput?']
  },
  {
    type: 'waste' as const,
    indicators: ['Overproduction', 'Excess inventory', 'Unnecessary movement'],
    questions: ['What gets produced but not used?', 'Where do we create more than needed?']
  },
  {
    type: 'rework' as const,
    indicators: ['Quality issues', 'Errors requiring correction', 'Customer complaints'],
    questions: ['How often do we redo work?', 'What causes quality failures?']
  },
  {
    type: 'handoff' as const,
    indicators: ['Communication gaps', 'Delays between departments', 'Information loss'],
    questions: ['Where does information get lost?', 'Which handoffs cause delays?']
  }
];

const ProcessAnalysisFramework: React.FC = () => {
  const [currentProcess, setCurrentProcess] = useState<ProcessAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'sipoc' | 'swimlane' | 'analysis'>('sipoc');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const exportRef = useRef<HTMLDivElement>(null);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Initialize new process analysis
  const initializeNewProcess = (template?: any) => {
    const newProcess: ProcessAnalysis = {
      id: `process_${Date.now()}`,
      name: template?.name || 'New Process Analysis',
      description: template?.description || 'Process description',
      type: template?.type || 'core',
      strategicAlignment: 'unclear',
      sipocElements: [],
      processSteps: [],
      swimlanes: template?.swimlanes || [
        { id: 'role1', name: 'Role 1', color: 'blue', responsibilities: [] },
        { id: 'role2', name: 'Role 2', color: 'green', responsibilities: [] }
      ],
      inefficiencies: [],
      latentDemand: [],
      recommendations: []
    };
    setCurrentProcess(newProcess);
    setEditMode(true);
  };

  // SIPOC Analysis Component
  const SIPOCAnalysis = () => {
    const [selectedCategory, setSelectedCategory] = useState<SIPOCElement['category']>('supplier');
    
    const sipocCategories = [
      { key: 'supplier', name: 'Suppliers', icon: '🏭', color: 'blue' },
      { key: 'input', name: 'Inputs', icon: '📥', color: 'green' },
      { key: 'process', name: 'Process', icon: '⚙️', color: 'orange' },
      { key: 'output', name: 'Outputs', icon: '📤', color: 'purple' },
      { key: 'customer', name: 'Customers', icon: '👥', color: 'red' }
    ];

    const addSIPOCElement = () => {
      if (!currentProcess) return;
      
      const newElement: SIPOCElement = {
        id: `sipoc_${Date.now()}`,
        category: selectedCategory,
        name: 'New Element',
        description: 'Description',
        metrics: [],
        issues: [],
        opportunities: []
      };
      
      setCurrentProcess({
        ...currentProcess,
        sipocElements: [...currentProcess.sipocElements, newElement]
      });
    };

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">🔄 SIPOC Analysis</Text>
              <Text fontSize="sm" color="gray.500">Suppliers → Inputs → Process → Outputs → Customers</Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              {sipocCategories.map((category) => (
                <Card
                  key={category.key}
                  cursor="pointer"
                  onClick={() => setSelectedCategory(category.key as SIPOCElement['category'])}
                  border={selectedCategory === category.key ? '2px solid' : '1px solid'}
                  borderColor={selectedCategory === category.key ? `${category.color}.400` : 'gray.200'}
                  bg={selectedCategory === category.key ? `${category.color}.50` : 'white'}
                >
                  <CardBody textAlign="center" p={3}>
                    <Text fontSize="2xl" mb={2}>{category.icon}</Text>
                    <Text fontSize="sm" fontWeight="semibold">{category.name}</Text>
                    <Badge mt={1} colorScheme={category.color} variant="subtle">
                      {currentProcess?.sipocElements.filter(e => e.category === category.key).length || 0}
                    </Badge>
                  </CardBody>
                </Card>
              ))}
            </Grid>
            
            <Divider my={4} />
            
            <HStack justify="space-between" mb={4}>
              <Text fontWeight="semibold">
                {sipocCategories.find(c => c.key === selectedCategory)?.icon} {' '}
                {sipocCategories.find(c => c.key === selectedCategory)?.name}
              </Text>
              {editMode && (
                <Button size="sm" colorScheme="teal" onClick={addSIPOCElement}>
                  + Add Element
                </Button>
              )}
            </HStack>
            
            <VStack spacing={3}>
              {currentProcess?.sipocElements
                .filter(element => element.category === selectedCategory)
                .map((element) => (
                  <Card key={element.id} w="100%" variant="outline">
                    <CardBody>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold">{element.name}</Text>
                          <Text fontSize="sm" color="gray.600">{element.description}</Text>
                          {element.issues && element.issues.length > 0 && (
                            <HStack>
                              <Badge colorScheme="red" variant="subtle">Issues: {element.issues.length}</Badge>
                            </HStack>
                          )}
                        </VStack>
                        {editMode && (
                          <Button size="sm" variant="outline">Edit</Button>
                        )}
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </CardBody>
        </Card>

        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Process Analyst Questions:</Text>
            <Text fontSize="sm">
              • Who are your key suppliers and what do they provide?
              • What inputs (materials, information, resources) are critical?
              • What are the core process steps that transform inputs to outputs?
              • What outputs do you deliver and to whom?
              • Who are your customers (internal and external)?
            </Text>
          </VStack>
        </Alert>
      </VStack>
    );
  };

  // Swimlane Process Mapping Component
  const SwimlaneMapping = () => {
    const addProcessStep = () => {
      if (!currentProcess) return;
      
      const newStep: ProcessStep = {
        id: `step_${Date.now()}`,
        name: 'New Step',
        description: 'Step description',
        owner: currentProcess.swimlanes[0]?.id || 'role1',
        duration: 30,
        cost: 50,
        value: 'value-add',
        issues: [],
        improvements: [],
        swimlane: currentProcess.swimlanes[0]?.id || 'role1'
      };
      
      setCurrentProcess({
        ...currentProcess,
        processSteps: [...currentProcess.processSteps, newStep]
      });
    };

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">🏊 Swimlane Process Map</Text>
              {editMode && (
                <Button size="sm" colorScheme="teal" onClick={addProcessStep}>
                  + Add Step
                </Button>
              )}
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {currentProcess?.swimlanes.map((swimlane) => (
                <Card key={swimlane.id} w="100%" bg={`${swimlane.color}.50`} border="2px solid" borderColor={`${swimlane.color}.200`}>
                  <CardHeader bg={`${swimlane.color}.100`} py={2}>
                    <HStack justify="space-between">
                      <Text fontWeight="bold" color={`${swimlane.color}.700`}>
                        {swimlane.name}
                      </Text>
                      <Badge colorScheme={swimlane.color}>
                        {currentProcess?.processSteps.filter(s => s.swimlane === swimlane.id).length} steps
                      </Badge>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <HStack spacing={3} overflowX="auto" pb={2}>
                      {currentProcess?.processSteps
                        .filter(step => step.swimlane === swimlane.id)
                        .map((step, index) => (
                          <Card key={step.id} minW="200px" bg="white" shadow="sm">
                            <CardBody p={3}>
                              <VStack align="start" spacing={2}>
                                <HStack justify="space-between" w="100%">
                                  <Text fontSize="sm" fontWeight="semibold">{step.name}</Text>
                                  <Badge 
                                    colorScheme={
                                      step.value === 'value-add' ? 'green' : 
                                      step.value === 'non-value-add' ? 'red' : 'yellow'
                                    }
                                    variant="subtle" 
                                    fontSize="xs"
                                  >
                                    {step.value === 'value-add' ? 'VA' : 
                                     step.value === 'non-value-add' ? 'NVA' : 'NNVA'}
                                  </Badge>
                                </HStack>
                                <Text fontSize="xs" color="gray.600">{step.description}</Text>
                                <HStack justify="space-between" w="100%">
                                  <Text fontSize="xs">⏱️ {step.duration}min</Text>
                                  <Text fontSize="xs">💰 ${step.cost}</Text>
                                </HStack>
                                {step.issues.length > 0 && (
                                  <Badge colorScheme="red" variant="outline" fontSize="xs">
                                    {step.issues.length} issues
                                  </Badge>
                                )}
                              </VStack>
                            </CardBody>
                          </Card>
                        ))}
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Alert status="warning">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Efficiency Analysis Questions:</Text>
            <Text fontSize="sm">
              • Which steps add value vs. waste time?
              • Where do handoffs between roles cause delays?
              • What steps could be automated or eliminated?
              • Which roles are bottlenecks or underutilized?
            </Text>
          </VStack>
        </Alert>
      </VStack>
    );
  };

  // Strategic Analysis & Recommendations Component
  const StrategicAnalysis = () => {
    const calculateProcessMetrics = () => {
      if (!currentProcess) return null;
      
      const totalSteps = currentProcess.processSteps.length;
      const valueAddSteps = currentProcess.processSteps.filter(s => s.value === 'value-add').length;
      const totalDuration = currentProcess.processSteps.reduce((sum, step) => sum + step.duration, 0);
      const totalCost = currentProcess.processSteps.reduce((sum, step) => sum + step.cost, 0);
      const valueAddRatio = totalSteps > 0 ? (valueAddSteps / totalSteps) * 100 : 0;
      
      return { totalSteps, valueAddSteps, totalDuration, totalCost, valueAddRatio };
    };

    const metrics = calculateProcessMetrics();

    return (
      <VStack spacing={6} align="stretch">
        {/* Process Metrics */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="xl" fontWeight="bold">📊 Process Metrics & Strategic Alignment</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              <Card bg="blue.50" border="1px solid" borderColor="blue.200">
                <CardBody textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">{metrics?.totalSteps || 0}</Text>
                  <Text fontSize="sm" color="gray.600">Total Steps</Text>
                </CardBody>
              </Card>
              <Card bg="green.50" border="1px solid" borderColor="green.200">
                <CardBody textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="green.600">{metrics?.valueAddRatio.toFixed(1) || 0}%</Text>
                  <Text fontSize="sm" color="gray.600">Value-Add Ratio</Text>
                </CardBody>
              </Card>
              <Card bg="orange.50" border="1px solid" borderColor="orange.200">
                <CardBody textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="orange.600">{metrics?.totalDuration || 0}</Text>
                  <Text fontSize="sm" color="gray.600">Total Duration (min)</Text>
                </CardBody>
              </Card>
              <Card bg="purple.50" border="1px solid" borderColor="purple.200">
                <CardBody textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="purple.600">${metrics?.totalCost || 0}</Text>
                  <Text fontSize="sm" color="gray.600">Process Cost</Text>
                </CardBody>
              </Card>
            </Grid>
          </CardBody>
        </Card>

        {/* Strategic Alignment Assessment */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">⚖️ Strategic Alignment Assessment</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">Analyst Questions:</Text>
                  <Text fontSize="sm">
                    • Does this process support differentiation (unique value, quality, innovation)?
                    • Does this process support cost leadership (efficiency, standardization, scale)?
                    • Where are the biggest opportunities for strategic improvement?
                  </Text>
                </VStack>
              </Alert>
              
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Card bg="blue.50" border="1px solid" borderColor="blue.200">
                  <CardHeader bg="blue.100">
                    <Text fontWeight="bold" color="blue.700">🎯 Differentiation Signals</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm">✓ Custom solutions for customers</Text>
                      <Text fontSize="sm">✓ High-touch service steps</Text>
                      <Text fontSize="sm">✓ Quality control checkpoints</Text>
                      <Text fontSize="sm">✓ Innovation/R&D activities</Text>
                      <Text fontSize="sm">✓ Personalization capabilities</Text>
                    </VStack>
                  </CardBody>
                </Card>
                
                <Card bg="green.50" border="1px solid" borderColor="green.200">
                  <CardHeader bg="green.100">
                    <Text fontWeight="bold" color="green.700">💰 Cost Leadership Signals</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm">✓ Standardized procedures</Text>
                      <Text fontSize="sm">✓ Automation opportunities</Text>
                      <Text fontSize="sm">✓ Volume-based efficiencies</Text>
                      <Text fontSize="sm">✓ Shared resources/services</Text>
                      <Text fontSize="sm">✓ Streamlined handoffs</Text>
                    </VStack>
                  </CardBody>
                </Card>
              </Grid>
            </VStack>
          </CardBody>
        </Card>

        {/* Inefficiency Detection */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🔍 Inefficiency Detection</Text>
          </CardHeader>
          <CardBody>
            <Accordion allowMultiple>
              {INEFFICIENCY_PATTERNS.map((pattern) => (
                <AccordionItem key={pattern.type}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Badge colorScheme="red" variant="outline">
                          {pattern.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <Text fontWeight="semibold">
                          {pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)} Analysis
                        </Text>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <VStack align="start" spacing={3}>
                      <Text fontSize="sm" fontWeight="semibold">Common Indicators:</Text>
                      {pattern.indicators.map((indicator, index) => (
                        <Text key={index} fontSize="sm">• {indicator}</Text>
                      ))}
                      <Text fontSize="sm" fontWeight="semibold" mt={2}>Key Questions:</Text>
                      {pattern.questions.map((question, index) => (
                        <Text key={index} fontSize="sm" color="blue.600">❓ {question}</Text>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
        </Card>

        {/* Latent Demand Analysis */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">💎 Latent Demand Discovery</Text>
          </CardHeader>
          <CardBody>
            <Alert status="success" mb={4}>
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Latent Demand Questions:</Text>
                <Text fontSize="sm">
                  • What customer needs are NOT being met by current process?
                  • Where do customers create workarounds or use competitor solutions?
                  • What would customers pay extra for if we could deliver it?
                  • Which process outputs could become new revenue streams?
                </Text>
              </VStack>
            </Alert>
            
            <Box p={4} bg="yellow.50" borderRadius="md" border="1px solid" borderColor="yellow.200">
              <Text fontSize="sm" color="gray.600" fontStyle="italic" textAlign="center">
                🚧 Latent demand analysis interface will capture unmet customer needs,
                revenue opportunities, and process enhancement possibilities
              </Text>
            </Box>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // Export to Markdown for MS Teams
  const exportToMarkdown = () => {
    if (!currentProcess) return '';
    
    const markdown = `# Process Analysis: ${currentProcess.name}

## 📋 Process Overview
- **Type**: ${currentProcess.type}
- **Strategic Alignment**: ${currentProcess.strategicAlignment}
- **Description**: ${currentProcess.description}

## 🔄 SIPOC Analysis

### Suppliers
${currentProcess.sipocElements.filter(e => e.category === 'supplier').map(e => `- **${e.name}**: ${e.description}`).join('\n')}

### Inputs
${currentProcess.sipocElements.filter(e => e.category === 'input').map(e => `- **${e.name}**: ${e.description}`).join('\n')}

### Process
${currentProcess.sipocElements.filter(e => e.category === 'process').map(e => `- **${e.name}**: ${e.description}`).join('\n')}

### Outputs
${currentProcess.sipocElements.filter(e => e.category === 'output').map(e => `- **${e.name}**: ${e.description}`).join('\n')}

### Customers
${currentProcess.sipocElements.filter(e => e.category === 'customer').map(e => `- **${e.name}**: ${e.description}`).join('\n')}

## 🏊 Process Flow

${currentProcess.swimlanes.map(lane => `### ${lane.name}
${currentProcess.processSteps.filter(step => step.swimlane === lane.id).map(step => 
`- **${step.name}** (${step.duration}min, $${step.cost}) - ${step.description}`).join('\n')}`).join('\n\n')}

## 📊 Key Metrics
- **Total Steps**: ${currentProcess.processSteps.length}
- **Value-Add Steps**: ${currentProcess.processSteps.filter(s => s.value === 'value-add').length}
- **Total Duration**: ${currentProcess.processSteps.reduce((sum, step) => sum + step.duration, 0)} minutes
- **Total Cost**: $${currentProcess.processSteps.reduce((sum, step) => sum + step.cost, 0)}

## 🎯 Recommendations
*Process analysis recommendations will be generated based on inefficiency patterns and strategic alignment.*

---
*Generated by Lucidra Process Analysis Framework*`;

    return markdown;
  };

  const handleExport = () => {
    const markdown = exportToMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProcess?.name.replace(/\s+/g, '_').toLowerCase()}_analysis.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Main render
  const renderProcessSelection = () => (
    <VStack spacing={6}>
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          🔍 Process Analysis Framework
        </Text>
        <Text fontSize="lg" color="gray.600" mb={4}>
          SIPOC mapping, swimlane analysis, and strategic alignment assessment
        </Text>
        <Text fontSize="sm" color="gray.500">
          Map workflows, identify inefficiencies, discover latent demand
        </Text>
      </Box>

      <Card bg={cardBg} w="100%">
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">🚀 Start New Process Analysis</Text>
            <Button colorScheme="teal" onClick={() => initializeNewProcess()}>
              + Custom Process
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {PROCESS_TEMPLATES.map((template) => (
              <Card 
                key={template.name}
                cursor="pointer"
                onClick={() => initializeNewProcess(template)}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
                border="1px solid"
                borderColor="gray.200"
              >
                <CardHeader>
                  <HStack justify="space-between">
                    <Text fontWeight="bold">{template.name}</Text>
                    <Badge colorScheme={template.type === 'core' ? 'blue' : 'green'}>
                      {template.type}
                    </Badge>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Text fontSize="sm" color="gray.600">
                      {template.description}
                    </Text>
                    <HStack>
                      <Badge variant="outline">{template.swimlanes.length} roles</Badge>
                      <Badge variant="outline">SIPOC ready</Badge>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </CardBody>
      </Card>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Process Analyst Approach:</Text>
          <Text fontSize="sm">
            • Start with SIPOC to understand process boundaries and stakeholders
            • Use swimlane mapping to visualize workflow and identify handoff issues
            • Analyze strategic alignment: Does this process support differentiation or cost leadership?
            • Identify inefficiencies: bottlenecks, waste, rework, unnecessary steps
            • Discover latent demand: unmet customer needs that could drive growth
            • Export analysis as markdown for MS Teams collaboration
          </Text>
        </VStack>
      </Alert>
    </VStack>
  );

  const renderProcessAnalysis = () => (
    <VStack spacing={6}>
      <Card bg={cardBg} w="100%">
        <CardHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">{currentProcess?.name}</Text>
              <Text color="gray.500">{currentProcess?.description}</Text>
            </VStack>
            <HStack>
              <Button variant="outline" onClick={handleExport} size="sm">
                📤 Export MD
              </Button>
              <Button 
                variant="outline" 
                colorScheme={editMode ? 'red' : 'blue'} 
                onClick={() => setEditMode(!editMode)}
                size="sm"
              >
                {editMode ? 'View Mode' : 'Edit Mode'}
              </Button>
              <Button variant="outline" onClick={() => setCurrentProcess(null)} size="sm">
                ← Back
              </Button>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Tabs index={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>🔄 SIPOC</Tab>
              <Tab>🏊 Swimlane</Tab>
              <Tab>📊 Analysis</Tab>
            </TabList>
            <TabPanels>
              <TabPanel><SIPOCAnalysis /></TabPanel>
              <TabPanel><SwimlaneMapping /></TabPanel>
              <TabPanel><StrategicAnalysis /></TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} maxW="7xl" mx="auto">
        {currentProcess ? renderProcessAnalysis() : renderProcessSelection()}
      </VStack>
    </Box>
  );
};

export default ProcessAnalysisFramework;