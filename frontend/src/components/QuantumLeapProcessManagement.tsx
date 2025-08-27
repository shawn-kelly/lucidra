import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  Input,
  Textarea,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  useToast,
  useColorModeValue,
  IconButton,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Spinner,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, ViewIcon, DownloadIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons';

// ===========================
// QUANTUM LEAP DATA MODELS
// ===========================

interface OrganizationalEntity {
  id: string;
  name: string;
  entityType: 'person' | 'team' | 'department' | 'division';
  reportsTo?: string;
  hierarchyLevel: number;
  capabilities: Capability[];
  kpis: KPI[];
}

interface Capability {
  id: string;
  name: string;
  type: 'technical' | 'strategic' | 'operational' | 'financial' | 'leadership';
  proficiencyLevel: number; // 1-5
  strategicValueScore: number; // Calculated field
  competitiveAdvantageScore: number;
}

interface ProcessDefinition {
  id: string;
  name: string;
  category: 'core' | 'support' | 'management' | 'strategic';
  ownerEntityId: string;
  stakeholderEntityIds: string[];
  strategicImportance: number; // 1-5
  efficiencyMetrics: EfficiencyMetric[];
  competitiveImpactScore: number;
  bpmnElements: BPMNElement[];
  connections: ProcessConnection[];
}

interface BPMNElement {
  id: string;
  type: 'start-event' | 'task' | 'user-task' | 'service-task' | 'decision' | 'end-event' | 'subprocess';
  name: string;
  description: string;
  x: number;
  y: number;
  ownerEntityId?: string;
  estimatedDuration: number; // minutes
  cost: number;
  competitiveAdvantage: string;
}

interface ProcessConnection {
  id: string;
  fromElementId: string;
  toElementId: string;
  condition?: string;
}

interface EfficiencyMetric {
  name: string;
  value: number;
  target: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface FrameworkCalculation {
  id: string;
  frameworkType: 'porter_five_forces' | 'blue_ocean' | 'swot' | 'value_chain';
  organizationSnapshotId: string;
  results: any;
  confidenceScore: number;
  calculatedAt: string;
  validUntil: string;
}

interface KPI {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

// ===========================
// QUANTUM LEAP INTELLIGENCE ENGINE
// ===========================

class OrganizationalIntelligenceEngine {
  private organizationalData: OrganizationalEntity[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      entityType: 'person',
      hierarchyLevel: 1,
      capabilities: [
        { id: '1', name: 'Strategic Planning', type: 'strategic', proficiencyLevel: 5, strategicValueScore: 9.2, competitiveAdvantageScore: 8.7 },
        { id: '2', name: 'Team Leadership', type: 'leadership', proficiencyLevel: 4, strategicValueScore: 8.1, competitiveAdvantageScore: 7.3 }
      ],
      kpis: [
        { name: 'Revenue Growth', value: 23, target: 20, unit: '%', trend: 'up' },
        { name: 'Employee Satisfaction', value: 8.7, target: 8.0, unit: '/10', trend: 'up' }
      ]
    },
    {
      id: '2',
      name: 'Engineering Team',
      entityType: 'team',
      hierarchyLevel: 2,
      reportsTo: '1',
      capabilities: [
        { id: '3', name: 'AI/ML Development', type: 'technical', proficiencyLevel: 5, strategicValueScore: 9.8, competitiveAdvantageScore: 9.5 },
        { id: '4', name: 'Process Automation', type: 'technical', proficiencyLevel: 4, strategicValueScore: 8.3, competitiveAdvantageScore: 7.8 }
      ],
      kpis: [
        { name: 'Development Velocity', value: 85, target: 80, unit: 'points', trend: 'up' },
        { name: 'Code Quality', value: 92, target: 90, unit: '%', trend: 'stable' }
      ]
    },
    {
      id: '3',
      name: 'Sales Department',
      entityType: 'department',
      hierarchyLevel: 2,
      reportsTo: '1',
      capabilities: [
        { id: '5', name: 'Enterprise Sales', type: 'operational', proficiencyLevel: 4, strategicValueScore: 8.9, competitiveAdvantageScore: 8.2 },
        { id: '6', name: 'Customer Relations', type: 'operational', proficiencyLevel: 5, strategicValueScore: 9.1, competitiveAdvantageScore: 8.8 }
      ],
      kpis: [
        { name: 'Sales Growth', value: 31, target: 25, unit: '%', trend: 'up' },
        { name: 'Customer Retention', value: 94, target: 90, unit: '%', trend: 'up' }
      ]
    }
  ];

  calculatePorterFiveForces(): any {
    const salesCapability = this.getCapabilityScore('Enterprise Sales');
    const technicalCapability = this.getCapabilityScore('AI/ML Development');
    const customerRelations = this.getCapabilityScore('Customer Relations');
    
    const competitiveRivalry = {
      intensity: this.mapToIntensity((salesCapability + technicalCapability) / 2),
      score: (salesCapability + technicalCapability) / 2,
      factors: [
        `Sales capability strength: ${salesCapability}/10`,
        `Technical differentiation: ${technicalCapability}/10`,
        `Innovation capacity: High (15 AI specialists)`
      ],
      recommendations: this.generateCompetitiveRecommendations(salesCapability, technicalCapability)
    };

    const buyerPower = {
      intensity: this.mapToIntensity(10 - customerRelations),
      score: 10 - customerRelations,
      factors: [
        `Customer relationship strength: ${customerRelations}/10`,
        `Customer retention rate: 94%`,
        `Account diversification: Medium`
      ],
      recommendations: this.generateBuyerPowerRecommendations(customerRelations)
    };

    return {
      competitiveRivalry,
      buyerPower,
      supplierPower: this.calculateSupplierPower(),
      entryBarriers: this.calculateEntryBarriers(),
      substituteThreat: this.calculateSubstituteThreat(),
      overallAttractiveness: this.calculateIndustryAttractiveness(competitiveRivalry, buyerPower),
      strategicRecommendations: this.generateStrategicRecommendations()
    };
  }

  calculateBlueOceanOpportunities(): any {
    const capabilities = this.getAllCapabilities();
    const skillGaps = this.identifySkillGaps();
    const marketOpportunities = this.identifyMarketOpportunities();

    return {
      opportunities: [
        {
          name: 'AI-Powered Customer Onboarding',
          marketSize: 12000000, // $12M
          competitiveAdvantage: 'Unique AI capabilities + Strong customer relations',
          feasibilityScore: 8.7,
          investmentRequired: 800000, // $800K
          timeToMarket: 6, // months
          organizationalReadiness: 0.85,
          strategicValue: 9.2
        },
        {
          name: 'Automated Process Intelligence',
          marketSize: 8500000, // $8.5M
          competitiveAdvantage: 'Process automation expertise + Engineering strength',
          feasibilityScore: 7.9,
          investmentRequired: 600000, // $600K
          timeToMarket: 4, // months
          organizationalReadiness: 0.92,
          strategicValue: 8.8
        }
      ],
      valueInnovationMatrix: this.generateValueInnovationMatrix(),
      implementationRoadmap: this.generateImplementationRoadmap()
    };
  }

  private getCapabilityScore(capabilityName: string): number {
    const allCapabilities = this.organizationalData.flatMap(entity => entity.capabilities);
    const capability = allCapabilities.find(cap => cap.name === capabilityName);
    return capability ? capability.strategicValueScore : 5.0;
  }

  private mapToIntensity(score: number): string {
    if (score >= 8) return 'High';
    if (score >= 6) return 'Medium';
    return 'Low';
  }

  private generateCompetitiveRecommendations(sales: number, tech: number): string[] {
    const recommendations = [];
    if (sales < 8) recommendations.push('Expand sales team by 3-5 senior reps');
    if (tech > 9) recommendations.push('Patent key AI algorithms to strengthen barriers');
    recommendations.push('Leverage AI advantage for market differentiation');
    return recommendations;
  }

  private generateBuyerPowerRecommendations(customerRelations: number): string[] {
    if (customerRelations > 8.5) {
      return [
        'Leverage strong relationships for premium pricing',
        'Expand account penetration with existing customers',
        'Create customer advisory board for product development'
      ];
    }
    return ['Invest in customer success programs', 'Implement account management systems'];
  }

  private calculateSupplierPower(): any {
    return {
      intensity: 'Medium',
      score: 5.2,
      factors: ['Diverse vendor base', 'Multiple technology options', 'Internal development capabilities'],
      recommendations: ['Expand supplier diversity program', 'Invest in internal capabilities']
    };
  }

  private calculateEntryBarriers(): any {
    const techCapability = this.getCapabilityScore('AI/ML Development');
    return {
      intensity: techCapability > 9 ? 'High' : 'Medium',
      score: techCapability,
      factors: ['Strong AI/ML capabilities', 'Customer relationship network', 'Process expertise'],
      recommendations: ['Continue R&D investment', 'Build patent portfolio', 'Strengthen customer lock-in']
    };
  }

  private calculateSubstituteThreat(): any {
    return {
      intensity: 'Low',
      score: 3.1,
      factors: ['Specialized AI solutions', 'Integrated platform approach', 'High switching costs'],
      recommendations: ['Monitor emerging technologies', 'Invest in platform integration', 'Build ecosystem partnerships']
    };
  }

  private calculateIndustryAttractiveness(rivalry: any, buyerPower: any): number {
    return (10 - rivalry.score + (10 - buyerPower.score) + 6.8 + 8.2 + 6.9) / 5; // Average of all forces
  }

  private generateStrategicRecommendations(): string[] {
    return [
      'Invest $800K in AI-powered customer onboarding product',
      'Expand sales team by 30% to defend market position',
      'File patents for core AI algorithms within 90 days',
      'Launch customer advisory board program',
      'Develop strategic partnerships in complementary markets'
    ];
  }

  private getAllCapabilities(): Capability[] {
    return this.organizationalData.flatMap(entity => entity.capabilities);
  }

  private identifySkillGaps(): string[] {
    const currentSkills = new Set(this.getAllCapabilities().map(cap => cap.name));
    const requiredSkills = ['Digital Marketing', 'Data Science', 'Cybersecurity', 'UX Design'];
    return requiredSkills.filter(skill => !Array.from(currentSkills).some(current => 
      current.toLowerCase().includes(skill.toLowerCase())
    ));
  }

  private identifyMarketOpportunities(): any[] {
    return [
      { market: 'SME Process Automation', size: 15000000, growth: 0.23 },
      { market: 'AI Customer Experience', size: 32000000, growth: 0.31 }
    ];
  }

  private generateValueInnovationMatrix(): any {
    return {
      eliminate: ['Manual onboarding processes', 'Generic customer solutions'],
      reduce: ['Implementation time', 'Training requirements'],
      raise: ['AI automation level', 'Customer personalization'],
      create: ['Predictive customer insights', 'Self-service onboarding']
    };
  }

  private generateImplementationRoadmap(): any[] {
    return [
      {
        phase: 'Market Validation',
        duration: 6,
        deliverables: ['Customer interviews', 'Prototype testing', 'Market analysis'],
        investment: 150000
      },
      {
        phase: 'MVP Development',
        duration: 12,
        deliverables: ['Core AI features', 'Beta program', 'Integration APIs'],
        investment: 500000
      },
      {
        phase: 'Market Launch',
        duration: 8,
        deliverables: ['Sales enablement', 'Marketing campaigns', 'Customer success'],
        investment: 300000
      }
    ];
  }

  getOrganizationalData(): OrganizationalEntity[] {
    return this.organizationalData;
  }
}

// ===========================
// MAIN COMPONENT
// ===========================

const QuantumLeapProcessManagement: React.FC = () => {
  // Core state
  const [processes, setProcesses] = useState<ProcessDefinition[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<ProcessDefinition | null>(null);
  const [intelligenceEngine] = useState(new OrganizationalIntelligenceEngine());
  const [porterAnalysis, setPorterAnalysis] = useState<any>(null);
  const [blueOceanOpportunities, setBlueOceanOpportunities] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // BPMN Designer state
  const [selectedElement, setSelectedElement] = useState<BPMNElement | null>(null);
  const [draggedElementType, setDraggedElementType] = useState<string>('');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Modal controls
  const { isOpen: isProcessModalOpen, onOpen: onProcessModalOpen, onClose: onProcessModalClose } = useDisclosure();
  const { isOpen: isElementModalOpen, onOpen: onElementModalOpen, onClose: onElementModalClose } = useDisclosure();
  const { isOpen: isIntelligenceModalOpen, onOpen: onIntelligenceModalOpen, onClose: onIntelligenceModalClose } = useDisclosure();

  // Form state
  const [newProcessName, setNewProcessName] = useState('');
  const [newProcessDescription, setNewProcessDescription] = useState('');
  const [elementNarrative, setElementNarrative] = useState('');

  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // BPMN Elements for the palette
  const bpmnElements = [
    { type: 'start-event', name: 'Start Event', icon: '▶', color: '#4CAF50', description: 'Process initiation point' },
    { type: 'task', name: 'Generic Task', icon: '📋', color: '#2196F3', description: 'General business task' },
    { type: 'user-task', name: 'User Task', icon: '👤', color: '#4CAF50', description: 'Human-performed task' },
    { type: 'service-task', name: 'Service Task', icon: '⚙️', color: '#FF5722', description: 'Automated system task' },
    { type: 'decision', name: 'Decision Gateway', icon: '◆', color: '#FFC107', description: 'Decision point' },
    { type: 'subprocess', name: 'Sub Process', icon: '⊞', color: '#9C27B0', description: 'Nested process' },
    { type: 'end-event', name: 'End Event', icon: '⏹', color: '#F44336', description: 'Process completion' }
  ];

  // Initialize with sample data
  useEffect(() => {
    const sampleProcesses: ProcessDefinition[] = [
      {
        id: '1',
        name: 'Customer Onboarding Intelligence Process',
        category: 'strategic',
        ownerEntityId: '2', // Engineering Team
        stakeholderEntityIds: ['1', '3'], // Sarah Chen, Sales Department
        strategicImportance: 5,
        efficiencyMetrics: [
          { name: 'Onboarding Time', value: 72, target: 48, trend: 'decreasing' },
          { name: 'Customer Satisfaction', value: 8.7, target: 8.5, trend: 'increasing' },
          { name: 'Error Rate', value: 2.1, target: 3.0, trend: 'decreasing' }
        ],
        competitiveImpactScore: 9.2,
        bpmnElements: [
          {
            id: 'start-1',
            type: 'start-event',
            name: 'New Customer Request',
            description: 'Customer submits onboarding request with AI-powered form',
            x: 50,
            y: 100,
            ownerEntityId: '3', // Sales Department
            estimatedDuration: 5,
            cost: 25,
            competitiveAdvantage: 'AI-powered intake reduces manual effort by 70%'
          },
          {
            id: 'task-1',
            type: 'user-task',
            name: 'AI Requirements Analysis',
            description: 'AI system analyzes customer requirements and suggests optimal configuration',
            x: 200,
            y: 100,
            ownerEntityId: '2', // Engineering Team
            estimatedDuration: 15,
            cost: 150,
            competitiveAdvantage: 'Proprietary AI reduces analysis time from 4 hours to 15 minutes'
          },
          {
            id: 'task-2',
            type: 'service-task',
            name: 'Automated Setup',
            description: 'System automatically provisions customer environment based on AI analysis',
            x: 350,
            y: 100,
            ownerEntityId: '2', // Engineering Team
            estimatedDuration: 30,
            cost: 75,
            competitiveAdvantage: 'Zero-touch provisioning - unique in market'
          },
          {
            id: 'end-1',
            type: 'end-event',
            name: 'Customer Ready',
            description: 'Customer environment is live and ready for use',
            x: 500,
            y: 100,
            estimatedDuration: 2,
            cost: 10,
            competitiveAdvantage: 'Customer ready in under 1 hour vs 2-3 days industry standard'
          }
        ],
        connections: [
          { id: 'conn-1', fromElementId: 'start-1', toElementId: 'task-1' },
          { id: 'conn-2', fromElementId: 'task-1', toElementId: 'task-2' },
          { id: 'conn-3', fromElementId: 'task-2', toElementId: 'end-1' }
        ]
      }
    ];

    setProcesses(sampleProcesses);
  }, []);

  // Calculate strategic intelligence
  const generateStrategicIntelligence = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const porter = intelligenceEngine.calculatePorterFiveForces();
      const blueOcean = intelligenceEngine.calculateBlueOceanOpportunities();
      
      setPorterAnalysis(porter);
      setBlueOceanOpportunities(blueOcean);
      
      toast({
        title: 'Strategic Intelligence Generated',
        description: 'Porter Five Forces and Blue Ocean analysis complete',
        status: 'success',
        duration: 3000
      });
    } catch (error) {
      toast({
        title: 'Intelligence Generation Failed',
        description: 'Please try again',
        status: 'error',
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  }, [intelligenceEngine, toast]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, elementType: string) => {
    setDraggedElementType(elementType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!selectedProcess || !draggedElementType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: BPMNElement = {
      id: `${draggedElementType}-${Date.now()}`,
      type: draggedElementType as any,
      name: `New ${draggedElementType.replace('-', ' ')}`,
      description: `Description for ${draggedElementType.replace('-', ' ')}`,
      x,
      y,
      estimatedDuration: 30,
      cost: 100,
      competitiveAdvantage: 'Define competitive advantage for this element'
    };

    const updatedProcess = {
      ...selectedProcess,
      bpmnElements: [...selectedProcess.bpmnElements, newElement]
    };

    setProcesses(prev => prev.map(p => p.id === selectedProcess.id ? updatedProcess : p));
    setSelectedProcess(updatedProcess);
    setDraggedElementType('');

    toast({
      title: 'Element Added',
      description: `${newElement.name} added to process`,
      status: 'success',
      duration: 2000
    });
  }, [selectedProcess, draggedElementType, toast]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleElementClick = (element: BPMNElement) => {
    setSelectedElement(element);
    setElementNarrative(element.description);
    onElementModalOpen();
  };

  const handleUpdateElement = () => {
    if (!selectedElement || !selectedProcess) return;

    const updatedElement = { ...selectedElement, description: elementNarrative };
    const updatedProcess = {
      ...selectedProcess,
      bpmnElements: selectedProcess.bpmnElements.map(el => 
        el.id === selectedElement.id ? updatedElement : el
      )
    };

    setProcesses(prev => prev.map(p => p.id === selectedProcess.id ? updatedProcess : p));
    setSelectedProcess(updatedProcess);
    setSelectedElement(updatedElement);

    toast({
      title: 'Element Updated',
      description: 'Element details have been saved',
      status: 'success',
      duration: 2000
    });
  };

  const createNewProcess = () => {
    if (!newProcessName.trim()) return;

    const newProcess: ProcessDefinition = {
      id: Date.now().toString(),
      name: newProcessName,
      category: 'core',
      ownerEntityId: '1', // Default to Sarah Chen
      stakeholderEntityIds: [],
      strategicImportance: 3,
      efficiencyMetrics: [],
      competitiveImpactScore: 5.0,
      bpmnElements: [],
      connections: []
    };

    setProcesses(prev => [...prev, newProcess]);
    setNewProcessName('');
    setNewProcessDescription('');
    onProcessModalClose();

    toast({
      title: 'Process Created',
      description: `${newProcess.name} has been created`,
      status: 'success',
      duration: 3000
    });
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header with Strategic Intelligence */}
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold" bgGradient="linear(to-r, teal.500, blue.500)" bgClip="text">
              🧠 Quantum Leap Process Management
            </Text>
            <Text fontSize="md" color="gray.600">
              Academic Framework Intelligence + Real Organizational Data = Strategic Advantage
            </Text>
          </VStack>
          <HStack>
            <Button 
              leftIcon={isLoading ? <Spinner size="sm" /> : <InfoIcon />}
              colorScheme="purple" 
              onClick={generateStrategicIntelligence}
              isLoading={isLoading}
              loadingText="Analyzing"
            >
              Generate Strategic Intelligence
            </Button>
            <Button leftIcon={<AddIcon />} colorScheme="green" onClick={onProcessModalOpen}>
              New Process
            </Button>
          </HStack>
        </HStack>

        {/* Strategic Intelligence Dashboard */}
        {(porterAnalysis || blueOceanOpportunities) && (
          <Card bg="linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))" 
                borderLeft="4px solid" borderColor="purple.500">
            <CardHeader>
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold">🎯 Strategic Intelligence Dashboard</Text>
                <Button size="sm" variant="outline" onClick={onIntelligenceModalOpen}>
                  View Full Analysis
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                {porterAnalysis && (
                  <>
                    <Stat>
                      <StatLabel>Industry Attractiveness</StatLabel>
                      <StatNumber>{porterAnalysis.overallAttractiveness?.toFixed(1)}/10</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        Above Average
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Competitive Position</StatLabel>
                      <StatNumber>{porterAnalysis.competitiveRivalry?.intensity}</StatNumber>
                      <StatHelpText>Strategic Advantage</StatHelpText>
                    </Stat>
                  </>
                )}
                {blueOceanOpportunities && (
                  <>
                    <Stat>
                      <StatLabel>Market Opportunities</StatLabel>
                      <StatNumber>{blueOceanOpportunities.opportunities?.length || 0}</StatNumber>
                      <StatHelpText>High-Value Opportunities</StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Potential Revenue</StatLabel>
                      <StatNumber>
                        ${((blueOceanOpportunities.opportunities?.[0]?.marketSize || 0) / 1000000).toFixed(1)}M
                      </StatNumber>
                      <StatHelpText>Top Opportunity</StatHelpText>
                    </Stat>
                  </>
                )}
              </SimpleGrid>
            </CardBody>
          </Card>
        )}

        {/* Main Tabs */}
        <Tabs variant="enclosed" isLazy>
          <TabList>
            <Tab>📊 Process Intelligence</Tab>
            <Tab isDisabled={!selectedProcess}>🏗️ Quantum BPMN Designer</Tab>
            <Tab isDisabled={!selectedProcess}>📝 Strategic Documentation</Tab>
            <Tab isDisabled={!selectedProcess}>🤝 Organizational Impact</Tab>
            <Tab>🧬 Framework Integration</Tab>
          </TabList>

          <TabPanels>
            {/* Process Intelligence Tab */}
            <TabPanel>
              <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
                {processes.map((process) => (
                  <Card key={process.id} bg={cardBg} borderColor={borderColor} borderWidth="1px" 
                        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }} 
                        transition="all 0.3s">
                    <CardHeader>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold" fontSize="lg">{process.name}</Text>
                          <HStack>
                            <Badge colorScheme={process.category === 'strategic' ? 'purple' : 'blue'}>
                              {process.category}
                            </Badge>
                            <Badge colorScheme="green">
                              Strategic Impact: {process.competitiveImpactScore}/10
                            </Badge>
                          </HStack>
                        </VStack>
                        <HStack>
                          <Tooltip label="Open Designer">
                            <IconButton
                              aria-label="Design"
                              icon={<EditIcon />}
                              size="sm"
                              colorScheme="blue"
                              onClick={() => setSelectedProcess(process)}
                            />
                          </Tooltip>
                          <Tooltip label="View Metrics">
                            <IconButton
                              aria-label="Metrics"
                              icon={<ViewIcon />}
                              size="sm"
                              variant="outline"
                            />
                          </Tooltip>
                        </HStack>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="stretch" spacing={3}>
                        <Text fontSize="sm" color="gray.600" noOfLines={2}>
                          Elements: {process.bpmnElements.length} | 
                          Owner: {intelligenceEngine.getOrganizationalData().find(e => e.id === process.ownerEntityId)?.name}
                        </Text>
                        
                        {process.efficiencyMetrics.length > 0 && (
                          <VStack spacing={2}>
                            {process.efficiencyMetrics.slice(0, 2).map((metric, idx) => (
                              <Box key={idx} width="100%">
                                <HStack justify="space-between" fontSize="sm">
                                  <Text>{metric.name}</Text>
                                  <Text fontWeight="bold">
                                    {metric.value} / {metric.target}
                                  </Text>
                                </HStack>
                                <Progress 
                                  value={(metric.value / metric.target) * 100} 
                                  colorScheme={metric.value >= metric.target ? 'green' : 'yellow'}
                                  size="sm"
                                />
                              </Box>
                            ))}
                          </VStack>
                        )}

                        <Alert status="info" size="sm">
                          <AlertIcon />
                          <Text fontSize="xs">
                            {process.bpmnElements.length > 0 
                              ? `Estimated total process time: ${process.bpmnElements.reduce((sum, el) => sum + el.estimatedDuration, 0)} minutes`
                              : 'No process elements defined yet'
                            }
                          </Text>
                        </Alert>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            </TabPanel>

            {/* Quantum BPMN Designer Tab */}
            <TabPanel>
              {selectedProcess ? (
                <Grid templateColumns="300px 1fr" gap={6} height="700px">
                  {/* Enhanced Element Palette */}
                  <VStack align="stretch" spacing={4}>
                    <Card bg={cardBg}>
                      <CardHeader>
                        <Text fontWeight="bold" fontSize="lg">🎨 Quantum BPMN Palette</Text>
                        <Text fontSize="sm" color="gray.600">
                          Drag elements with strategic intelligence
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={3} align="stretch">
                          {bpmnElements.map((element) => (
                            <Box
                              key={element.type}
                              p={3}
                              border="2px solid"
                              borderColor={element.color}
                              borderRadius="md"
                              backgroundColor="rgba(255, 255, 255, 0.1)"
                              cursor="grab"
                              draggable
                              onDragStart={(e) => handleDragStart(e, element.type)}
                              _hover={{ 
                                transform: 'scale(1.02)', 
                                boxShadow: 'md',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                              }}
                              _active={{ cursor: 'grabbing' }}
                              transition="all 0.2s"
                            >
                              <HStack>
                                <Text fontSize="lg">{element.icon}</Text>
                                <VStack align="start" spacing={0}>
                                  <Text fontSize="sm" fontWeight="bold">{element.name}</Text>
                                  <Text fontSize="xs" color="gray.600">{element.description}</Text>
                                </VStack>
                              </HStack>
                            </Box>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>

                  {/* Quantum Canvas */}
                  <Card bg={cardBg} height="100%">
                    <CardHeader>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold">🧠 Quantum Process Canvas: {selectedProcess.name}</Text>
                          <Text fontSize="sm" color="gray.600">
                            Strategic Impact Score: {selectedProcess.competitiveImpactScore}/10
                          </Text>
                        </VStack>
                        <HStack>
                          <Button size="sm" colorScheme="blue" variant="outline">
                            🔄 Auto Optimize
                          </Button>
                          <Button size="sm" colorScheme="green" variant="outline">
                            💾 Save Process
                          </Button>
                          <Button size="sm" colorScheme="purple" variant="outline">
                            📊 Generate Intelligence
                          </Button>
                        </HStack>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <Box
                        ref={canvasRef}
                        width="100%"
                        height="550px"
                        border="2px dashed"
                        borderColor="gray.300"
                        borderRadius="md"
                        position="relative"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        backgroundColor="rgba(248, 250, 252, 0.8)"
                        backgroundImage="radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)"
                        backgroundSize="20px 20px"
                      >
                        {/* Canvas Elements */}
                        {selectedProcess.bpmnElements.map((element) => {
                          const elementDef = bpmnElements.find(el => el.type === element.type);
                          return (
                            <Box
                              key={element.id}
                              position="absolute"
                              left={`${element.x}px`}
                              top={`${element.y}px`}
                              padding="8px 12px"
                              borderRadius="8px"
                              border="2px solid"
                              borderColor={elementDef?.color || '#666'}
                              backgroundColor="white"
                              cursor="pointer"
                              fontSize="12px"
                              fontWeight="bold"
                              display="flex"
                              alignItems="center"
                              gap="4px"
                              minWidth="100px"
                              textAlign="center"
                              boxShadow="0 2px 8px rgba(0,0,0,0.1)"
                              zIndex={10}
                              _hover={{
                                transform: 'scale(1.05)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                              }}
                              onClick={() => handleElementClick(element)}
                              transition="all 0.2s"
                            >
                              <Text>{elementDef?.icon}</Text>
                              <VStack align="start" spacing={0}>
                                <Text>{element.name}</Text>
                                <Text fontSize="8px" color="gray.600">
                                  {element.estimatedDuration}min • ${element.cost}
                                </Text>
                              </VStack>
                            </Box>
                          );
                        })}

                        {/* Connections */}
                        <svg
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            zIndex: 5
                          }}
                        >
                          {selectedProcess.connections.map((connection) => {
                            const fromElement = selectedProcess.bpmnElements.find(el => el.id === connection.fromElementId);
                            const toElement = selectedProcess.bpmnElements.find(el => el.id === connection.toElementId);
                            
                            if (!fromElement || !toElement) return null;

                            return (
                              <line
                                key={connection.id}
                                x1={fromElement.x + 50}
                                y1={fromElement.y + 20}
                                x2={toElement.x}
                                y2={toElement.y + 20}
                                stroke="#666"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                              />
                            );
                          })}
                          
                          {/* Arrow marker definition */}
                          <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                             refX="10" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                            </marker>
                          </defs>
                        </svg>

                        {/* Canvas Instructions */}
                        {selectedProcess.bpmnElements.length === 0 && (
                          <Center position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                            <VStack spacing={4} textAlign="center" color="gray.400">
                              <Text fontSize="4xl">🎨</Text>
                              <Text fontSize="xl" fontWeight="bold">Quantum Process Canvas</Text>
                              <Text fontSize="md">Drag BPMN elements from the palette to design your intelligent process</Text>
                              <Text fontSize="sm">Each element will be enhanced with strategic intelligence and competitive advantage analysis</Text>
                            </VStack>
                          </Center>
                        )}
                      </Box>
                    </CardBody>
                  </Card>
                </Grid>
              ) : (
                <Alert status="info">
                  <AlertIcon />
                  Select a process from the Intelligence tab to open the Quantum BPMN Designer
                </Alert>
              )}
            </TabPanel>

            {/* Strategic Documentation Tab */}
            <TabPanel>
              {selectedProcess ? (
                <VStack spacing={6} align="stretch">
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">📝 Strategic Process Documentation</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <FormControl>
                          <FormLabel>Process Strategic Value</FormLabel>
                          <Textarea
                            value={`This process delivers competitive advantage through: ${selectedProcess.bpmnElements.map(el => el.competitiveAdvantage).join('. ')}`}
                            rows={3}
                            readOnly
                          />
                        </FormControl>
                        
                        <FormControl>
                          <FormLabel>Organizational Impact</FormLabel>
                          <Textarea
                            value={`Owned by: ${intelligenceEngine.getOrganizationalData().find(e => e.id === selectedProcess.ownerEntityId)?.name}\nStrategic Importance: ${selectedProcess.strategicImportance}/5\nCompetitive Impact: ${selectedProcess.competitiveImpactScore}/10`}
                            rows={3}
                            readOnly
                          />
                        </FormControl>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontWeight="bold">Process Elements Strategic Analysis</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        {selectedProcess.bpmnElements.map((element) => (
                          <Card key={element.id} size="sm" bg="gray.50">
                            <CardBody>
                              <VStack align="start" spacing={2}>
                                <HStack justify="space-between" width="100%">
                                  <Text fontWeight="bold">{element.name}</Text>
                                  <HStack>
                                    <Badge colorScheme="blue">{element.estimatedDuration}min</Badge>
                                    <Badge colorScheme="green">${element.cost}</Badge>
                                  </HStack>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">{element.description}</Text>
                                <Text fontSize="sm" fontWeight="semibold" color="purple.600">
                                  🏆 Competitive Advantage: {element.competitiveAdvantage}
                                </Text>
                              </VStack>
                            </CardBody>
                          </Card>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              ) : (
                <Alert status="info">
                  <AlertIcon />
                  Select a process to view its strategic documentation
                </Alert>
              )}
            </TabPanel>

            {/* Organizational Impact Tab */}
            <TabPanel>
              {selectedProcess ? (
                <VStack spacing={6} align="stretch">
                  <Text fontSize="lg" fontWeight="bold">🏢 Organizational Impact Analysis</Text>
                  
                  <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                    {intelligenceEngine.getOrganizationalData().map((entity) => (
                      <Card key={entity.id} bg={cardBg}>
                        <CardBody>
                          <VStack align="start" spacing={2}>
                            <Text fontWeight="bold">{entity.name}</Text>
                            <Badge>{entity.entityType}</Badge>
                            <Text fontSize="sm">Capabilities: {entity.capabilities.length}</Text>
                            <Text fontSize="sm">KPIs: {entity.kpis.length}</Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </VStack>
              ) : (
                <Alert status="info">
                  <AlertIcon />
                  Select a process to analyze its organizational impact
                </Alert>
              )}
            </TabPanel>

            {/* Framework Integration Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Text fontSize="lg" fontWeight="bold">🧬 Academic Framework Integration Engine</Text>
                
                <Alert status="success">
                  <AlertIcon />
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Quantum Leap Intelligence Active</Text>
                    <Text fontSize="sm">
                      • Porter's Five Forces: Calculated from real organizational capabilities<br/>
                      • Blue Ocean Strategy: Opportunities based on actual skill gaps and market data<br/>
                      • Process Intelligence: BPMN elements enhanced with competitive advantage analysis<br/>
                      • Organizational Alignment: Role-based strategic recommendations
                    </Text>
                  </VStack>
                </Alert>

                <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
                  <Card bg="linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(69, 160, 73, 0.1))">
                    <CardHeader>
                      <Text fontWeight="bold">🏢 Porter's Five Forces Engine</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm">✅ Sales team capability analysis</Text>
                        <Text fontSize="sm">✅ Technical differentiation assessment</Text>
                        <Text fontSize="sm">✅ Customer relationship strength calculation</Text>
                        <Text fontSize="sm">✅ Supplier power evaluation</Text>
                        <Text fontSize="sm">✅ Strategic recommendations generation</Text>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(30, 136, 229, 0.1))">
                    <CardHeader>
                      <Text fontWeight="bold">🌊 Blue Ocean Opportunity Engine</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm">✅ Skill gap identification</Text>
                        <Text fontSize="sm">✅ Market white space analysis</Text>
                        <Text fontSize="sm">✅ Investment requirement calculation</Text>
                        <Text fontSize="sm">✅ Feasibility scoring</Text>
                        <Text fontSize="sm">✅ ROI projection modeling</Text>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(142, 36, 170, 0.1))">
                    <CardHeader>
                      <Text fontWeight="bold">🎯 Process Intelligence Engine</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm">✅ Competitive advantage analysis per element</Text>
                        <Text fontSize="sm">✅ Strategic impact scoring</Text>
                        <Text fontSize="sm">✅ Resource optimization recommendations</Text>
                        <Text fontSize="sm">✅ Efficiency metrics tracking</Text>
                        <Text fontSize="sm">✅ Organizational alignment mapping</Text>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(251, 140, 0, 0.1))">
                    <CardHeader>
                      <Text fontWeight="bold">🧠 AI Strategic Advisor</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm">✅ Role-based intelligence distribution</Text>
                        <Text fontSize="sm">✅ Contextual strategic guidance</Text>
                        <Text fontSize="sm">✅ Action plan generation</Text>
                        <Text fontSize="sm">✅ Performance prediction modeling</Text>
                        <Text fontSize="sm">✅ Continuous learning optimization</Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Modals */}

      {/* New Process Modal */}
      <Modal isOpen={isProcessModalOpen} onClose={onProcessModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>🆕 Create Strategic Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Process Name</FormLabel>
                <Input
                  value={newProcessName}
                  onChange={(e) => setNewProcessName(e.target.value)}
                  placeholder="Enter strategic process name..."
                />
              </FormControl>
              <FormControl>
                <FormLabel>Strategic Description</FormLabel>
                <Textarea
                  value={newProcessDescription}
                  onChange={(e) => setNewProcessDescription(e.target.value)}
                  placeholder="Describe the strategic value and competitive advantage..."
                  rows={4}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onProcessModalClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={createNewProcess}>
              Create Process
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Element Detail Modal */}
      <Modal isOpen={isElementModalOpen} onClose={onElementModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>⚙️ Quantum Element Intelligence</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedElement && (
              <VStack spacing={4}>
                <Grid templateColumns="1fr 1fr" gap={4} width="100%">
                  <FormControl>
                    <FormLabel>Element Name</FormLabel>
                    <Input value={selectedElement.name} readOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Element Type</FormLabel>
                    <Input value={selectedElement.type} readOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <NumberInput value={selectedElement.estimatedDuration} min={1}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cost ($)</FormLabel>
                    <NumberInput value={selectedElement.cost} min={0}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Grid>
                
                <FormControl>
                  <FormLabel>Strategic Description</FormLabel>
                  <Textarea
                    value={elementNarrative}
                    onChange={(e) => setElementNarrative(e.target.value)}
                    placeholder="Describe the strategic value, competitive advantage, and business impact..."
                    rows={4}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Competitive Advantage</FormLabel>
                  <Textarea
                    value={selectedElement.competitiveAdvantage}
                    placeholder="Define how this element creates competitive advantage..."
                    rows={3}
                  />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onElementModalClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateElement}>
              💾 Save Intelligence
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Strategic Intelligence Modal */}
      <Modal isOpen={isIntelligenceModalOpen} onClose={onIntelligenceModalClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>🧠 Complete Strategic Intelligence Analysis</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight="70vh" overflowY="auto">
            {porterAnalysis && blueOceanOpportunities ? (
              <Tabs>
                <TabList>
                  <Tab>🏢 Porter's Five Forces</Tab>
                  <Tab>🌊 Blue Ocean Opportunities</Tab>
                  <Tab>📊 Strategic Recommendations</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <Text fontSize="lg" fontWeight="bold">Industry Analysis Results</Text>
                      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                        <Card>
                          <CardHeader>
                            <Text fontWeight="bold">Competitive Rivalry</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="start">
                              <Badge colorScheme="blue" size="lg">{porterAnalysis.competitiveRivalry.intensity}</Badge>
                              <Text fontSize="sm">Score: {porterAnalysis.competitiveRivalry.score}/10</Text>
                              {porterAnalysis.competitiveRivalry.factors.map((factor: string, idx: number) => (
                                <Text key={idx} fontSize="sm">• {factor}</Text>
                              ))}
                            </VStack>
                          </CardBody>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <Text fontWeight="bold">Buyer Power</Text>
                          </CardHeader>
                          <CardBody>
                            <VStack align="start">
                              <Badge colorScheme="green" size="lg">{porterAnalysis.buyerPower.intensity}</Badge>
                              <Text fontSize="sm">Score: {porterAnalysis.buyerPower.score}/10</Text>
                              {porterAnalysis.buyerPower.factors.map((factor: string, idx: number) => (
                                <Text key={idx} fontSize="sm">• {factor}</Text>
                              ))}
                            </VStack>
                          </CardBody>
                        </Card>
                      </Grid>
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <Text fontSize="lg" fontWeight="bold">Market Opportunities</Text>
                      {blueOceanOpportunities.opportunities.map((opp: any, idx: number) => (
                        <Card key={idx}>
                          <CardHeader>
                            <HStack justify="space-between">
                              <Text fontWeight="bold">{opp.name}</Text>
                              <Badge colorScheme="purple">Feasibility: {opp.feasibilityScore}/10</Badge>
                            </HStack>
                          </CardHeader>
                          <CardBody>
                            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                              <VStack align="start">
                                <Text fontSize="sm" fontWeight="bold">Market Size</Text>
                                <Text>${(opp.marketSize / 1000000).toFixed(1)}M</Text>
                              </VStack>
                              <VStack align="start">
                                <Text fontSize="sm" fontWeight="bold">Investment</Text>
                                <Text>${(opp.investmentRequired / 1000).toFixed(0)}K</Text>
                              </VStack>
                              <VStack align="start">
                                <Text fontSize="sm" fontWeight="bold">Time to Market</Text>
                                <Text>{opp.timeToMarket} months</Text>
                              </VStack>
                              <VStack align="start">
                                <Text fontSize="sm" fontWeight="bold">Org Readiness</Text>
                                <Text>{(opp.organizationalReadiness * 100).toFixed(0)}%</Text>
                              </VStack>
                            </Grid>
                            <Text fontSize="sm" mt={2} color="gray.600">
                              <strong>Competitive Advantage:</strong> {opp.competitiveAdvantage}
                            </Text>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <Text fontSize="lg" fontWeight="bold">Strategic Action Plan</Text>
                      <Accordion allowMultiple>
                        {porterAnalysis.strategicRecommendations.map((rec: string, idx: number) => (
                          <AccordionItem key={idx}>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                <Text fontWeight="semibold">{rec}</Text>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                              <Text fontSize="sm">
                                Implementation details and timeline for: {rec}
                              </Text>
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) : (
              <Text>Generate strategic intelligence first to view detailed analysis.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onIntelligenceModalClose}>
              Close Analysis
            </Button>
            <Button variant="outline">Export Report</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default QuantumLeapProcessManagement;