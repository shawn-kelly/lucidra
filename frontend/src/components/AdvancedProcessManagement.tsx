import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Alert,
  AlertIcon,
  IconButton,
  Tooltip,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Flex,
  Spacer,
  useToast
} from '@chakra-ui/react';

// Process Management Interfaces
interface ProcessStep {
  id: string;
  name: string;
  type: 'task' | 'decision' | 'event' | 'gateway' | 'subprocess';
  description: string;
  duration: number; // in hours
  cost: number;
  resources: Resource[];
  position: { x: number; y: number };
  inputs: string[];
  outputs: string[];
  dependencies: string[];
  risks: Risk[];
  kpis: ProcessKPI[];
  automation_level: number; // 0-100%
  complexity: number; // 1-10
  frequency: string; // daily, weekly, monthly, etc.
  owner: string;
  sla: number; // hours
  approval_required: boolean;
  compliance_requirements: string[];
}

interface ProcessFlow {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: ProcessStep[];
  connections: ProcessConnection[];
  total_cost: number;
  total_duration: number;
  efficiency_score: number;
  risk_score: number;
  automation_potential: number;
  narrative: string;
  created_at: string;
  updated_at: string;
  version: string;
  status: 'draft' | 'active' | 'archived';
  tags: string[];
}

interface ProcessConnection {
  id: string;
  from_step: string;
  to_step: string;
  condition?: string;
  probability?: number;
  delay?: number;
  cost?: number;
}

interface Resource {
  id: string;
  name: string;
  type: 'human' | 'system' | 'equipment' | 'material';
  cost_per_hour: number;
  availability: number; // 0-100%
  skills: string[];
  location: string;
  capacity: number;
}

interface Risk {
  id: string;
  description: string;
  probability: number; // 0-100%
  impact: number; // 1-10
  mitigation: string;
  owner: string;
  status: 'open' | 'mitigated' | 'closed';
}

interface ProcessKPI {
  id: string;
  name: string;
  target_value: number;
  current_value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold_warning: number;
  threshold_critical: number;
}

interface DelayImpact {
  step_id: string;
  delay_hours: number;
  cost_impact: number;
  resource_impact: string[];
  downstream_effects: {
    step_id: string;
    additional_delay: number;
    additional_cost: number;
  }[];
  customer_impact: string;
  compliance_impact: string;
}

interface ProcessExport {
  format: 'pdf' | 'word' | 'excel' | 'json' | 'bpmn';
  include_costs: boolean;
  include_resources: boolean;
  include_risks: boolean;
  include_kpis: boolean;
  include_narrative: boolean;
}

const AdvancedProcessManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [processes, setProcesses] = useState<ProcessFlow[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<ProcessFlow | null>(null);
  const [isCreatingFromNarrative, setIsCreatingFromNarrative] = useState(false);
  const [narrative, setNarrative] = useState('');
  const [isGeneratingMap, setIsGeneratingMap] = useState(false);
  const [mapView, setMapView] = useState<'visual' | 'table' | 'timeline'>('visual');
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [delayAnalysis, setDelayAnalysis] = useState<DelayImpact | null>(null);
  const [exportSettings, setExportSettings] = useState<ProcessExport>({
    format: 'pdf',
    include_costs: true,
    include_resources: true,
    include_risks: true,
    include_kpis: true,
    include_narrative: true
  });

  const { isOpen: isStepModalOpen, onOpen: onStepModalOpen, onClose: onStepModalClose } = useDisclosure();
  const { isOpen: isExportModalOpen, onOpen: onExportModalOpen, onClose: onExportModalClose } = useDisclosure();
  const { isOpen: isDelayModalOpen, onOpen: onDelayModalOpen, onClose: onDelayModalClose } = useDisclosure();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toast = useToast();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Sample data initialization
  useEffect(() => {
    const sampleResources: Resource[] = [
      {
        id: '1',
        name: 'Sales Manager',
        type: 'human',
        cost_per_hour: 75,
        availability: 80,
        skills: ['Sales', 'Customer Relations', 'Negotiation'],
        location: 'New York',
        capacity: 40
      },
      {
        id: '2',
        name: 'CRM System',
        type: 'system',
        cost_per_hour: 5,
        availability: 99,
        skills: ['Data Management', 'Reporting', 'Automation'],
        location: 'Cloud',
        capacity: 1000
      },
      {
        id: '3',
        name: 'Quality Analyst',
        type: 'human',
        cost_per_hour: 55,
        availability: 90,
        skills: ['Quality Control', 'Testing', 'Documentation'],
        location: 'Chicago',
        capacity: 40
      }
    ];

    const sampleProcess: ProcessFlow = {
      id: '1',
      name: 'Customer Onboarding Process',
      description: 'Complete process for onboarding new customers from lead to active account',
      category: 'Customer Management',
      steps: [
        {
          id: 'step1',
          name: 'Lead Qualification',
          type: 'task',
          description: 'Qualify incoming leads based on predetermined criteria',
          duration: 1,
          cost: 75,
          resources: [sampleResources[0]],
          position: { x: 100, y: 100 },
          inputs: ['Lead Information', 'Contact Details'],
          outputs: ['Qualified Lead', 'Lead Score'],
          dependencies: [],
          risks: [{
            id: 'risk1',
            description: 'Incomplete lead information',
            probability: 30,
            impact: 5,
            mitigation: 'Implement mandatory field validation',
            owner: 'Sales Manager',
            status: 'open'
          }],
          kpis: [{
            id: 'kpi1',
            name: 'Lead Qualification Rate',
            target_value: 80,
            current_value: 75,
            unit: '%',
            trend: 'up',
            threshold_warning: 70,
            threshold_critical: 60
          }],
          automation_level: 25,
          complexity: 6,
          frequency: 'daily',
          owner: 'Sales Team',
          sla: 4,
          approval_required: false,
          compliance_requirements: ['GDPR', 'Data Privacy']
        },
        {
          id: 'step2',
          name: 'Credit Check',
          type: 'task',
          description: 'Perform credit verification and risk assessment',
          duration: 0.5,
          cost: 30,
          resources: [sampleResources[1]],
          position: { x: 300, y: 100 },
          inputs: ['Qualified Lead', 'Financial Information'],
          outputs: ['Credit Score', 'Risk Assessment'],
          dependencies: ['step1'],
          risks: [{
            id: 'risk2',
            description: 'Credit bureau downtime',
            probability: 10,
            impact: 8,
            mitigation: 'Backup credit verification service',
            owner: 'Operations',
            status: 'mitigated'
          }],
          kpis: [{
            id: 'kpi2',
            name: 'Credit Check Processing Time',
            target_value: 30,
            current_value: 25,
            unit: 'minutes',
            trend: 'down',
            threshold_warning: 45,
            threshold_critical: 60
          }],
          automation_level: 90,
          complexity: 3,
          frequency: 'daily',
          owner: 'Risk Team',
          sla: 2,
          approval_required: false,
          compliance_requirements: ['SOX', 'Credit Regulations']
        },
        {
          id: 'step3',
          name: 'Account Setup',
          type: 'task',
          description: 'Create customer account and configure initial settings',
          duration: 2,
          cost: 110,
          resources: [sampleResources[2]],
          position: { x: 500, y: 100 },
          inputs: ['Approved Application', 'Customer Data'],
          outputs: ['Active Account', 'Login Credentials'],
          dependencies: ['step2'],
          risks: [],
          kpis: [{
            id: 'kpi3',
            name: 'Account Setup Accuracy',
            target_value: 99,
            current_value: 97,
            unit: '%',
            trend: 'stable',
            threshold_warning: 95,
            threshold_critical: 90
          }],
          automation_level: 60,
          complexity: 7,
          frequency: 'daily',
          owner: 'Operations Team',
          sla: 24,
          approval_required: true,
          compliance_requirements: ['Security Standards', 'Account Verification']
        }
      ],
      connections: [
        {
          id: 'conn1',
          from_step: 'step1',
          to_step: 'step2',
          condition: 'Lead Qualified = True',
          probability: 75,
          delay: 0,
          cost: 0
        },
        {
          id: 'conn2',
          from_step: 'step2',
          to_step: 'step3',
          condition: 'Credit Approved = True',
          probability: 85,
          delay: 0,
          cost: 0
        }
      ],
      total_cost: 215,
      total_duration: 3.5,
      efficiency_score: 82,
      risk_score: 15,
      automation_potential: 55,
      narrative: 'Our customer onboarding process begins when a lead enters our system...',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      version: '1.0',
      status: 'active',
      tags: ['Customer', 'Onboarding', 'Sales']
    };

    setResources(sampleResources);
    setProcesses([sampleProcess]);
    setSelectedProcess(sampleProcess);
  }, []);

  // AI-Powered Narrative to Process Map Conversion
  const generateProcessFromNarrative = async () => {
    setIsGeneratingMap(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI-generated process based on narrative
    const generatedSteps: ProcessStep[] = [];
    const narrativeWords = narrative.toLowerCase();
    
    // Simple AI logic - in production this would be actual AI processing
    if (narrativeWords.includes('customer') || narrativeWords.includes('lead')) {
      generatedSteps.push({
        id: 'ai_step1',
        name: 'Customer Contact',
        type: 'task',
        description: 'Initial customer interaction based on narrative',
        duration: 1,
        cost: 50,
        resources: [],
        position: { x: 100, y: 100 },
        inputs: ['Customer Inquiry'],
        outputs: ['Contact Record'],
        dependencies: [],
        risks: [],
        kpis: [],
        automation_level: 0,
        complexity: 5,
        frequency: 'daily',
        owner: 'TBD',
        sla: 4,
        approval_required: false,
        compliance_requirements: []
      });
    }
    
    if (narrativeWords.includes('approve') || narrativeWords.includes('review')) {
      generatedSteps.push({
        id: 'ai_step2',
        name: 'Review and Approval',
        type: 'decision',
        description: 'Review process based on narrative requirements',
        duration: 2,
        cost: 100,
        resources: [],
        position: { x: 300, y: 100 },
        inputs: ['Request'],
        outputs: ['Approval Decision'],
        dependencies: generatedSteps.length > 0 ? [generatedSteps[0].id] : [],
        risks: [],
        kpis: [],
        automation_level: 20,
        complexity: 7,
        frequency: 'daily',
        owner: 'Manager',
        sla: 8,
        approval_required: true,
        compliance_requirements: []
      });
    }
    
    const newProcess: ProcessFlow = {
      id: `process_${Date.now()}`,
      name: 'AI Generated Process',
      description: 'Process generated from narrative description',
      category: 'AI Generated',
      steps: generatedSteps,
      connections: [],
      total_cost: generatedSteps.reduce((sum, step) => sum + step.cost, 0),
      total_duration: generatedSteps.reduce((sum, step) => sum + step.duration, 0),
      efficiency_score: 75,
      risk_score: 20,
      automation_potential: 40,
      narrative: narrative,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      version: '1.0',
      status: 'draft',
      tags: ['AI Generated']
    };
    
    setProcesses(prev => [...prev, newProcess]);
    setSelectedProcess(newProcess);
    setIsGeneratingMap(false);
    
    toast({
      title: 'Process Generated Successfully',
      description: `Created process with ${generatedSteps.length} steps from narrative`,
      status: 'success',
      duration: 3000
    });
  };

  // Calculate delay impact analysis
  const calculateDelayImpact = (stepId: string, delayHours: number) => {
    if (!selectedProcess) return;
    
    const step = selectedProcess.steps.find(s => s.id === stepId);
    if (!step) return;
    
    // Calculate direct cost impact
    const directCostImpact = delayHours * step.resources.reduce((sum, r) => sum + r.cost_per_hour, 0);
    
    // Calculate downstream effects
    const downstreamEffects = selectedProcess.steps
      .filter(s => s.dependencies.includes(stepId))
      .map(s => ({
        step_id: s.id,
        additional_delay: delayHours * 0.5, // 50% propagation
        additional_cost: delayHours * 0.5 * s.resources.reduce((sum, r) => sum + r.cost_per_hour, 0)
      }));
    
    const impact: DelayImpact = {
      step_id: stepId,
      delay_hours: delayHours,
      cost_impact: directCostImpact,
      resource_impact: step.resources.map(r => r.name),
      downstream_effects: downstreamEffects,
      customer_impact: delayHours > 4 ? 'High - SLA breach likely' : 'Low - Within tolerance',
      compliance_impact: step.compliance_requirements.length > 0 ? 'May affect compliance deadlines' : 'No compliance impact'
    };
    
    setDelayAnalysis(impact);
    onDelayModalOpen();
  };

  // Export process in various formats
  const exportProcess = () => {
    if (!selectedProcess) return;
    
    const exportData = {
      process: selectedProcess,
      settings: exportSettings,
      exported_at: new Date().toISOString()
    };
    
    // Mock export - in production this would generate actual files
    switch (exportSettings.format) {
      case 'pdf':
        toast({
          title: 'PDF Export Started',
          description: 'Process map will be generated as PDF with visual diagrams',
          status: 'info',
          duration: 3000
        });
        break;
      case 'word':
        toast({
          title: 'Word Document Export Started',
          description: 'Process documentation will be generated in MS Word format',
          status: 'info',
          duration: 3000
        });
        break;
      case 'excel':
        toast({
          title: 'Excel Export Started',
          description: 'Process data will be exported to Excel with detailed analytics',
          status: 'info',
          duration: 3000
        });
        break;
      default:
        console.log('Export data:', exportData);
    }
    
    onExportModalClose();
  };

  // Canvas rendering for visual process map
  const renderProcessCanvas = useCallback(() => {
    if (!canvasRef.current || !selectedProcess) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw steps
    selectedProcess.steps.forEach(step => {
      const x = step.position.x;
      const y = step.position.y;
      const width = 120;
      const height = 60;
      
      // Draw step box
      ctx.fillStyle = step.type === 'decision' ? '#FED7D7' : '#E6FFFA';
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = '#2D3748';
      ctx.strokeRect(x, y, width, height);
      
      // Draw step name
      ctx.fillStyle = '#2D3748';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(step.name, x + width/2, y + height/2);
      
      // Draw cost and duration
      ctx.font = '10px Arial';
      ctx.fillText(`$${step.cost} | ${step.duration}h`, x + width/2, y + height - 10);
    });
    
    // Draw connections
    selectedProcess.connections.forEach(conn => {
      const fromStep = selectedProcess.steps.find(s => s.id === conn.from_step);
      const toStep = selectedProcess.steps.find(s => s.id === conn.to_step);
      
      if (fromStep && toStep) {
        ctx.beginPath();
        ctx.moveTo(fromStep.position.x + 120, fromStep.position.y + 30);
        ctx.lineTo(toStep.position.x, toStep.position.y + 30);
        ctx.strokeStyle = '#4299E1';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrow
        const angle = Math.atan2(toStep.position.y - fromStep.position.y, toStep.position.x - fromStep.position.x);
        const arrowLength = 10;
        ctx.beginPath();
        ctx.moveTo(toStep.position.x, toStep.position.y + 30);
        ctx.lineTo(
          toStep.position.x - arrowLength * Math.cos(angle - Math.PI/6),
          toStep.position.y + 30 - arrowLength * Math.sin(angle - Math.PI/6)
        );
        ctx.moveTo(toStep.position.x, toStep.position.y + 30);
        ctx.lineTo(
          toStep.position.x - arrowLength * Math.cos(angle + Math.PI/6),
          toStep.position.y + 30 - arrowLength * Math.sin(angle + Math.PI/6)
        );
        ctx.stroke();
      }
    });
  }, [selectedProcess]);

  useEffect(() => {
    renderProcessCanvas();
  }, [renderProcessCanvas, mapView]);

  const renderNarrativeInput = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">AI-Powered Process Generation</Text>
          <Text fontSize="sm">
            Describe your process in natural language. Our AI will automatically generate a process map with steps, 
            connections, and initial cost estimates.
          </Text>
        </VStack>
      </Alert>

      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardHeader>
          <Text fontWeight="semibold">Process Narrative</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Textarea
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="Describe your process... For example: 'When a customer places an order, we first verify their payment information, then check inventory availability. If items are in stock, we prepare the shipment and send tracking information to the customer. The order is then processed for delivery...'"
              rows={8}
            />
            
            <HStack>
              <Button
                colorScheme="blue"
                onClick={generateProcessFromNarrative}
                isLoading={isGeneratingMap}
                loadingText="Generating Process Map..."
                isDisabled={!narrative.trim()}
              >
                🤖 Generate Process Map
              </Button>
              <Button variant="outline" onClick={() => setNarrative('')}>
                Clear
              </Button>
            </HStack>
            
            {isGeneratingMap && (
              <Alert status="info">
                <Spinner size="sm" mr={3} />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">AI Processing...</Text>
                  <Text fontSize="sm">
                    Analyzing narrative, identifying process steps, estimating costs and durations
                  </Text>
                </VStack>
              </Alert>
            )}
          </VStack>
        </CardBody>
      </Card>

      <Card bg="green.50" border="1px" borderColor="green.200">
        <CardBody>
          <Text fontWeight="semibold" color="green.700" mb={2}>AI Generation Features</Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" fontWeight="medium">🧠 Intelligent Analysis</Text>
              <Text fontSize="xs" color="gray.600">Identifies process steps and decision points</Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" fontWeight="medium">💰 Cost Estimation</Text>
              <Text fontSize="xs" color="gray.600">Estimates time and resource costs</Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" fontWeight="medium">🔗 Dependency Mapping</Text>
              <Text fontSize="xs" color="gray.600">Identifies step dependencies and flows</Text>
            </VStack>
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" fontWeight="medium">⚡ Automation Insights</Text>
              <Text fontSize="xs" color="gray.600">Suggests automation opportunities</Text>
            </VStack>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderProcessMap = () => {
    if (!selectedProcess) {
      return (
        <Alert status="warning">
          <AlertIcon />
          <Text>Please select a process or create one from narrative</Text>
        </Alert>
      );
    }

    return (
      <VStack spacing={6} align="stretch">
        {/* Process Header */}
        <Card bg="blue.50" border="1px" borderColor="blue.200">
          <CardBody>
            <HStack justify="space-between" mb={4}>
              <VStack align="start" spacing={1}>
                <Text fontSize="xl" fontWeight="bold" color="blue.700">
                  {selectedProcess.name}
                </Text>
                <Text fontSize="sm" color="blue.600">
                  {selectedProcess.description}
                </Text>
              </VStack>
              <VStack align="end" spacing={2}>
                <Badge colorScheme="blue" variant="solid">
                  {selectedProcess.status.toUpperCase()}
                </Badge>
                <Text fontSize="sm" color="blue.600">
                  Version {selectedProcess.version}
                </Text>
              </VStack>
            </HStack>

            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <Stat>
                <StatLabel>Total Cost</StatLabel>
                <StatNumber color="blue.600">${selectedProcess.total_cost}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Duration</StatLabel>
                <StatNumber color="blue.600">{selectedProcess.total_duration}h</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Efficiency</StatLabel>
                <StatNumber color="blue.600">{selectedProcess.efficiency_score}%</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Risk Score</StatLabel>
                <StatNumber color={selectedProcess.risk_score > 50 ? "red.600" : "green.600"}>
                  {selectedProcess.risk_score}%
                </StatNumber>
              </Stat>
            </Grid>
          </CardBody>
        </Card>

        {/* View Toggle */}
        <HStack justify="space-between">
          <HStack>
            <Button
              size="sm"
              variant={mapView === 'visual' ? 'solid' : 'outline'}
              onClick={() => setMapView('visual')}
            >
              🗺️ Visual Map
            </Button>
            <Button
              size="sm"
              variant={mapView === 'table' ? 'solid' : 'outline'}
              onClick={() => setMapView('table')}
            >
              📊 Table View
            </Button>
            <Button
              size="sm"
              variant={mapView === 'timeline' ? 'solid' : 'outline'}
              onClick={() => setMapView('timeline')}
            >
              ⏱️ Timeline
            </Button>
          </HStack>
          
          <HStack>
            <Button size="sm" colorScheme="blue" onClick={onExportModalOpen}>
              📄 Export
            </Button>
            <Button size="sm" colorScheme="green">
              💾 Save
            </Button>
            <Button size="sm" colorScheme="purple">
              🔄 Update from Narrative
            </Button>
          </HStack>
        </HStack>

        {/* Map Content */}
        {mapView === 'visual' && (
          <Card bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                style={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
            </CardBody>
          </Card>
        )}

        {mapView === 'table' && (
          <Card bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Step</Th>
                    <Th>Type</Th>
                    <Th>Duration</Th>
                    <Th>Cost</Th>
                    <Th>Owner</Th>
                    <Th>Automation %</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedProcess.steps.map(step => (
                    <Tr key={step.id}>
                      <Td>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{step.name}</Text>
                          <Text fontSize="xs" color="gray.500">{step.description}</Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Badge colorScheme={step.type === 'decision' ? 'orange' : 'blue'}>
                          {step.type}
                        </Badge>
                      </Td>
                      <Td>{step.duration}h</Td>
                      <Td>${step.cost}</Td>
                      <Td>{step.owner}</Td>
                      <Td>
                        <Progress value={step.automation_level} size="sm" colorScheme="green" />
                        <Text fontSize="xs">{step.automation_level}%</Text>
                      </Td>
                      <Td>
                        <HStack>
                          <IconButton
                            aria-label="Edit step"
                            icon={<Text>✏️</Text>}
                            size="xs"
                            onClick={() => {
                              setSelectedStep(step);
                              onStepModalOpen();
                            }}
                          />
                          <IconButton
                            aria-label="Analyze delays"
                            icon={<Text>⏰</Text>}
                            size="xs"
                            onClick={() => calculateDelayImpact(step.id, 2)}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        )}

        {mapView === 'timeline' && (
          <Card bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <Text fontWeight="semibold" mb={4}>Process Timeline</Text>
              <VStack align="stretch" spacing={4}>
                {selectedProcess.steps.map((step, index) => (
                  <HStack key={step.id}>
                    <Box w="20px" textAlign="center">
                      <Text fontSize="sm" fontWeight="bold">{index + 1}</Text>
                    </Box>
                    <Box flex="1">
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="medium">{step.name}</Text>
                        <HStack spacing={2}>
                          <Badge colorScheme="blue">{step.duration}h</Badge>
                          <Badge colorScheme="green">${step.cost}</Badge>
                        </HStack>
                      </HStack>
                      <Progress value={75} colorScheme="blue" size="lg" />
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        {step.description}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    );
  };

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Card bg="purple.50" border="1px" borderColor="purple.200">
          <CardBody>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="3xl" fontWeight="bold" color="purple.700">
                  🏭 Advanced Process Management
                </Text>
                <Text fontSize="lg" color="purple.600">
                  AI-powered process mapping, cost analysis, and optimization
                </Text>
              </VStack>
              <VStack align="end" spacing={2}>
                <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                  {processes.length} Processes
                </Badge>
                <Text fontSize="sm" color="purple.600">
                  Total Value: ${processes.reduce((sum, p) => sum + p.total_cost, 0)}
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Main Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>🤖 Create from Narrative</Tab>
            <Tab>🗺️ Process Maps</Tab>
            <Tab>📊 Analytics</Tab>
            <Tab>🔗 Process Links</Tab>
            <Tab>⚙️ Resources</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderNarrativeInput()}
            </TabPanel>
            
            <TabPanel px={0}>
              {renderProcessMap()}
            </TabPanel>
            
            <TabPanel px={0}>
              <Text>Analytics dashboard with process optimization insights</Text>
            </TabPanel>
            
            <TabPanel px={0}>
              <Text>Process linking and dependency management</Text>
            </TabPanel>
            
            <TabPanel px={0}>
              <Text>Resource allocation and capacity planning</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Step Edit Modal */}
      <Modal isOpen={isStepModalOpen} onClose={onStepModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Process Step</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedStep && (
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Step Name</FormLabel>
                  <Input value={selectedStep.name} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea value={selectedStep.description} rows={3} />
                </FormControl>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl>
                    <FormLabel>Duration (hours)</FormLabel>
                    <NumberInput value={selectedStep.duration}>
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cost ($)</FormLabel>
                    <NumberInput value={selectedStep.cost}>
                      <NumberInputField />
                    </NumberInput>
                  </FormControl>
                </Grid>
                <Button colorScheme="blue">Save Changes</Button>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Export Modal */}
      <Modal isOpen={isExportModalOpen} onClose={onExportModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Export Format</FormLabel>
                <Select
                  value={exportSettings.format}
                  onChange={(e) => setExportSettings(prev => ({ ...prev, format: e.target.value as any }))}
                >
                  <option value="pdf">📄 PDF - Visual Process Map</option>
                  <option value="word">📝 MS Word - Documentation</option>
                  <option value="excel">📊 Excel - Data & Analytics</option>
                  <option value="json">⚙️ JSON - Raw Data</option>
                  <option value="bpmn">🔄 BPMN - Standard Format</option>
                </Select>
              </FormControl>
              
              <Text fontWeight="semibold">Include in Export:</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <Checkbox
                  isChecked={exportSettings.include_costs}
                  onChange={(e) => setExportSettings(prev => ({ ...prev, include_costs: e.target.checked }))}
                >
                  Cost Analysis
                </Checkbox>
                <Checkbox
                  isChecked={exportSettings.include_resources}
                  onChange={(e) => setExportSettings(prev => ({ ...prev, include_resources: e.target.checked }))}
                >
                  Resource Allocation
                </Checkbox>
                <Checkbox
                  isChecked={exportSettings.include_risks}
                  onChange={(e) => setExportSettings(prev => ({ ...prev, include_risks: e.target.checked }))}
                >
                  Risk Assessment
                </Checkbox>
                <Checkbox
                  isChecked={exportSettings.include_kpis}
                  onChange={(e) => setExportSettings(prev => ({ ...prev, include_kpis: e.target.checked }))}
                >
                  KPIs & Metrics
                </Checkbox>
              </Grid>
              
              <Button colorScheme="blue" onClick={exportProcess}>
                Export Process
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delay Impact Modal */}
      <Modal isOpen={isDelayModalOpen} onClose={onDelayModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delay Impact Analysis</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {delayAnalysis && (
              <VStack spacing={4} align="stretch">
                <Alert status="warning">
                  <AlertIcon />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold">Impact Assessment</Text>
                    <Text fontSize="sm">
                      Analysis for {delayAnalysis.delay_hours} hour delay
                    </Text>
                  </VStack>
                </Alert>
                
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Stat>
                    <StatLabel>Direct Cost Impact</StatLabel>
                    <StatNumber color="red.500">${delayAnalysis.cost_impact}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Customer Impact</StatLabel>
                    <StatNumber fontSize="sm">{delayAnalysis.customer_impact}</StatNumber>
                  </Stat>
                </Grid>
                
                {delayAnalysis.downstream_effects.length > 0 && (
                  <Box>
                    <Text fontWeight="semibold" mb={2}>Downstream Effects</Text>
                    <VStack align="stretch" spacing={2}>
                      {delayAnalysis.downstream_effects.map((effect, index) => (
                        <Card key={index} size="sm">
                          <CardBody>
                            <HStack justify="space-between">
                              <Text fontSize="sm">{effect.step_id}</Text>
                              <HStack>
                                <Badge colorScheme="orange">+{effect.additional_delay}h</Badge>
                                <Badge colorScheme="red">${effect.additional_cost}</Badge>
                              </HStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdvancedProcessManagement;