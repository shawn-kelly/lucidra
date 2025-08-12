import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Spinner,
  Alert,
  AlertIcon,
  Textarea,
  Select,
  Input,
  Grid,
  GridItem,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  Divider,
  Collapse,
  useToast
} from '@chakra-ui/react';
import { 
  AIScenario, 
  AIRecommendation, 
  RecommendationType, 
  ImpactLevel, 
  EffortLevel,
  FrameworkMetadata 
} from '../types/FrameworkTypes';
import { frameworkRegistry } from '../services/FrameworkRegistry';

interface AIScenarioEngineProps {
  selectedFrameworks?: string[];
  onScenarioSelect?: (scenario: AIScenario) => void;
  currentContext?: Record<string, any>;
}

const AIScenarioEngine: React.FC<AIScenarioEngineProps> = ({
  selectedFrameworks = [],
  onScenarioSelect,
  currentContext = {}
}) => {
  const [scenarios, setScenarios] = useState<AIScenario[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<AIScenario | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [scenarioType, setScenarioType] = useState<string>('competitive');
  const [timeHorizon, setTimeHorizon] = useState<string>('1-year');
  const [industryContext, setIndustryContext] = useState<string>('technology');
  const [generationProgress, setGenerationProgress] = useState(0);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Available frameworks for scenario generation
  const availableFrameworks = useMemo(() => 
    frameworkRegistry.getAllFrameworks(), 
    []
  );

  // Scenario types for different strategic contexts
  const scenarioTypes = [
    { value: 'competitive', label: 'Competitive Response', icon: '⚔️' },
    { value: 'market-entry', label: 'Market Entry', icon: '🚀' },
    { value: 'innovation', label: 'Innovation Strategy', icon: '💡' },
    { value: 'digital-transformation', label: 'Digital Transformation', icon: '🔄' },
    { value: 'crisis-management', label: 'Crisis Management', icon: '🚨' },
    { value: 'growth-strategy', label: 'Growth Strategy', icon: '📈' },
    { value: 'cost-optimization', label: 'Cost Optimization', icon: '💰' },
    { value: 'sustainability', label: 'Sustainability', icon: '🌱' }
  ];

  // Industry contexts
  const industryContexts = [
    'Technology', 'Healthcare', 'Financial Services', 'Retail', 'Manufacturing',
    'Energy', 'Education', 'Real Estate', 'Transportation', 'Food & Beverage'
  ];

  // Generate AI scenarios based on parameters
  const generateScenarios = useCallback(async () => {
    if (selectedFrameworks.length === 0 && !customPrompt.trim()) {
      toast({
        title: 'Selection Required',
        description: 'Please select frameworks or enter a custom prompt',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    setLoading(true);
    setGenerationProgress(0);

    try {
      // Simulate AI scenario generation with realistic progress
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      await new Promise(resolve => setTimeout(resolve, 3000));
      clearInterval(progressInterval);
      setGenerationProgress(100);

      // Generate mock scenarios based on parameters
      const generatedScenarios = await mockAIScenarioGeneration({
        frameworks: selectedFrameworks,
        scenarioType,
        timeHorizon,
        industryContext,
        customPrompt,
        currentContext
      });

      setScenarios(generatedScenarios);
      
      toast({
        title: 'Scenarios Generated',
        description: `Generated ${generatedScenarios.length} strategic scenarios`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });

    } catch (error) {
      console.error('Scenario generation failed:', error);
      toast({
        title: 'Generation Failed',
        description: 'Unable to generate scenarios. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } finally {
      setLoading(false);
      setTimeout(() => setGenerationProgress(0), 1000);
    }
  }, [selectedFrameworks, scenarioType, timeHorizon, industryContext, customPrompt, currentContext, toast]);

  // Handle scenario selection
  const handleScenarioSelect = (scenario: AIScenario) => {
    setSelectedScenario(scenario);
    onOpen();
    if (onScenarioSelect) {
      onScenarioSelect(scenario);
    }
  };

  // Get impact color
  const getImpactColor = (impact: ImpactLevel): string => {
    switch (impact) {
      case ImpactLevel.LOW: return 'green';
      case ImpactLevel.MEDIUM: return 'yellow';
      case ImpactLevel.HIGH: return 'orange';
      case ImpactLevel.CRITICAL: return 'red';
      default: return 'gray';
    }
  };

  // Get effort color
  const getEffortColor = (effort: EffortLevel): string => {
    switch (effort) {
      case EffortLevel.MINIMAL: return 'green';
      case EffortLevel.LOW: return 'teal';
      case EffortLevel.MEDIUM: return 'yellow';
      case EffortLevel.HIGH: return 'orange';
      case EffortLevel.EXTENSIVE: return 'red';
      default: return 'gray';
    }
  };

  // Render scenario card
  const renderScenarioCard = (scenario: AIScenario) => (
    <Card 
      key={scenario.id}
      cursor="pointer"
      _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
      transition="all 0.2s"
      onClick={() => handleScenarioSelect(scenario)}
    >
      <CardHeader pb={2}>
        <VStack align="start" spacing={2}>
          <HStack justify="space-between" w="full">
            <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
              {scenario.title}
            </Text>
            <Badge colorScheme={scenario.confidence > 0.8 ? 'green' : scenario.confidence > 0.6 ? 'yellow' : 'orange'}>
              {Math.round(scenario.confidence * 100)}% confidence
            </Badge>
          </HStack>
          <HStack spacing={2} flexWrap="wrap">
            {scenario.frameworks.slice(0, 3).map(frameworkId => {
              const framework = frameworkRegistry.getFramework(frameworkId);
              return framework ? (
                <Badge key={frameworkId} variant="outline" size="sm">
                  {framework.icon} {framework.name}
                </Badge>
              ) : null;
            })}
            {scenario.frameworks.length > 3 && (
              <Badge variant="outline" size="sm">
                +{scenario.frameworks.length - 3} more
              </Badge>
            )}
          </HStack>
        </VStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack align="start" spacing={3}>
          <Text fontSize="sm" color="gray.600" noOfLines={3}>
            {scenario.description}
          </Text>
          <HStack justify="space-between" w="full">
            <Text fontSize="xs" color="gray.500">
              {scenario.recommendations.length} recommendations
            </Text>
            <Text fontSize="xs" color="gray.500">
              {new Date(scenario.generatedAt).toLocaleDateString()}
            </Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  // Render recommendation card
  const renderRecommendationCard = (recommendation: AIRecommendation) => (
    <Card key={recommendation.id} size="sm">
      <CardBody>
        <VStack align="start" spacing={2}>
          <HStack justify="space-between" w="full">
            <Text fontSize="md" fontWeight="semibold">
              {recommendation.title}
            </Text>
            <Badge colorScheme="blue" variant="outline">
              Priority {recommendation.priority}
            </Badge>
          </HStack>
          
          <Text fontSize="sm" color="gray.600">
            {recommendation.description}
          </Text>
          
          <HStack spacing={2} flexWrap="wrap">
            <Badge colorScheme={getImpactColor(recommendation.impact)} size="sm">
              {recommendation.impact} impact
            </Badge>
            <Badge colorScheme={getEffortColor(recommendation.effort)} size="sm">
              {recommendation.effort} effort
            </Badge>
            <Badge variant="outline" size="sm">
              {recommendation.timeframe}
            </Badge>
          </HStack>
          
          {recommendation.actions.length > 0 && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1}>Actions:</Text>
              <VStack align="start" spacing={1}>
                {recommendation.actions.slice(0, 3).map((action, index) => (
                  <Text key={index} fontSize="xs" color="gray.600">
                    • {action}
                  </Text>
                ))}
                {recommendation.actions.length > 3 && (
                  <Text fontSize="xs" color="gray.500">
                    +{recommendation.actions.length - 3} more actions
                  </Text>
                )}
              </VStack>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">🤖 AI Scenario Engine</Text>
            <Text color="gray.600">Generate strategic scenarios across multiple frameworks</Text>
          </VStack>
          <Button variant="outline" onClick={() => setScenarios([])}>
            Clear All
          </Button>
        </HStack>

        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <Text fontSize="lg" fontWeight="semibold">Scenario Configuration</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              <GridItem>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Scenario Type</Text>
                <Select value={scenarioType} onChange={(e) => setScenarioType(e.target.value)}>
                  {scenarioTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </Select>
              </GridItem>
              
              <GridItem>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Time Horizon</Text>
                <Select value={timeHorizon} onChange={(e) => setTimeHorizon(e.target.value)}>
                  <option value="3-months">3 Months</option>
                  <option value="6-months">6 Months</option>
                  <option value="1-year">1 Year</option>
                  <option value="2-years">2 Years</option>
                  <option value="5-years">5 Years</option>
                </Select>
              </GridItem>
              
              <GridItem>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Industry Context</Text>
                <Select value={industryContext} onChange={(e) => setIndustryContext(e.target.value)}>
                  {industryContexts.map(industry => (
                    <option key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </option>
                  ))}
                </Select>
              </GridItem>
            </Grid>
            
            <Box mt={4}>
              <Text fontSize="sm" fontWeight="medium" mb={2}>Custom Prompt (Optional)</Text>
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe your specific strategic challenge or context..."
                rows={3}
              />
            </Box>
            
            <Box mt={4}>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Selected Frameworks ({selectedFrameworks.length})
              </Text>
              <HStack spacing={2} flexWrap="wrap">
                {selectedFrameworks.map(frameworkId => {
                  const framework = frameworkRegistry.getFramework(frameworkId);
                  return framework ? (
                    <Badge key={frameworkId} colorScheme="teal" variant="solid">
                      {framework.icon} {framework.name}
                    </Badge>
                  ) : null;
                })}
                {selectedFrameworks.length === 0 && (
                  <Text fontSize="sm" color="gray.500">
                    No frameworks selected - will use all available frameworks
                  </Text>
                )}
              </HStack>
            </Box>
            
            <HStack mt={6} spacing={4}>
              <Button
                colorScheme="teal"
                onClick={generateScenarios}
                isLoading={loading}
                loadingText="Generating..."
                leftIcon={<Text>🤖</Text>}
              >
                Generate Scenarios
              </Button>
              {loading && (
                <Box flex="1">
                  <Text fontSize="sm" mb={1}>Generating scenarios... {Math.round(generationProgress)}%</Text>
                  <Progress value={generationProgress} colorScheme="teal" />
                </Box>
              )}
            </HStack>
          </CardBody>
        </Card>

        {/* Generated Scenarios */}
        {scenarios.length > 0 && (
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Generated Scenarios ({scenarios.length})
            </Text>
            <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={4}>
              {scenarios.map(renderScenarioCard)}
            </Grid>
          </Box>
        )}

        {/* Empty State */}
        {scenarios.length === 0 && !loading && (
          <Alert status="info">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">Ready to Generate Scenarios</Text>
              <Text fontSize="sm">
                Configure your parameters above and click "Generate Scenarios" to create AI-powered strategic scenarios
              </Text>
            </VStack>
          </Alert>
        )}
      </VStack>

      {/* Scenario Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack align="start" spacing={2}>
              <Text>{selectedScenario?.title}</Text>
              <HStack spacing={2}>
                <Badge colorScheme={selectedScenario && selectedScenario.confidence > 0.8 ? 'green' : 'yellow'}>
                  {selectedScenario && Math.round(selectedScenario.confidence * 100)}% confidence
                </Badge>
                {selectedScenario?.isBookmarked && (
                  <Badge colorScheme="yellow">⭐ Bookmarked</Badge>
                )}
              </HStack>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedScenario && (
              <Tabs>
                <TabList>
                  <Tab>Scenario Details</Tab>
                  <Tab>Recommendations ({selectedScenario.recommendations.length})</Tab>
                  <Tab>Frameworks ({selectedScenario.frameworks.length})</Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel>
                    <VStack align="start" spacing={4}>
                      <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={2}>Description</Text>
                        <Text>{selectedScenario.description}</Text>
                      </Box>
                      
                      <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={2}>Strategic Scenario</Text>
                        <Box p={4} bg="gray.50" borderRadius="md">
                          <Text whiteSpace="pre-wrap">{selectedScenario.scenario}</Text>
                        </Box>
                      </Box>
                      
                      <HStack spacing={4}>
                        <Text fontSize="sm" color="gray.600">
                          Generated: {new Date(selectedScenario.generatedAt).toLocaleString()}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Confidence: {Math.round(selectedScenario.confidence * 100)}%
                        </Text>
                      </HStack>
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      {selectedScenario.recommendations
                        .sort((a, b) => b.priority - a.priority)
                        .map(renderRecommendationCard)}
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel>
                    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3}>
                      {selectedScenario.frameworks.map(frameworkId => {
                        const framework = frameworkRegistry.getFramework(frameworkId);
                        return framework ? (
                          <Card key={frameworkId} size="sm">
                            <CardBody>
                              <HStack spacing={3}>
                                <Text fontSize="xl">{framework.icon}</Text>
                                <VStack align="start" spacing={1}>
                                  <Text fontSize="md" fontWeight="semibold">
                                    {framework.name}
                                  </Text>
                                  <Text fontSize="sm" color="gray.600">
                                    {framework.description}
                                  </Text>
                                  <HStack spacing={2}>
                                    <Badge size="sm">{framework.category}</Badge>
                                    <Badge colorScheme="blue" size="sm">{framework.tier}</Badge>
                                  </HStack>
                                </VStack>
                              </HStack>
                            </CardBody>
                          </Card>
                        ) : null;
                      })}
                    </Grid>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="teal">
                Apply Scenario
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Mock AI scenario generation function
async function mockAIScenarioGeneration(params: {
  frameworks: string[];
  scenarioType: string;
  timeHorizon: string;
  industryContext: string;
  customPrompt: string;
  currentContext: Record<string, any>;
}): Promise<AIScenario[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const scenarios: AIScenario[] = [
    {
      id: `scenario-${Date.now()}-1`,
      title: `${getScenarioTypeLabel(params.scenarioType)} Strategy for ${params.industryContext}`,
      description: `Comprehensive strategic approach for ${params.scenarioType} in the ${params.industryContext} industry over ${params.timeHorizon}`,
      frameworks: params.frameworks.length > 0 ? params.frameworks : ['blue-ocean', 'porters-five-forces', 'data-pulse'],
      scenario: generateScenarioText(params),
      recommendations: generateRecommendations(params),
      confidence: 0.85,
      generatedAt: new Date(),
      userId: 'current-user',
      isBookmarked: false
    },
    {
      id: `scenario-${Date.now()}-2`,
      title: `Alternative ${getScenarioTypeLabel(params.scenarioType)} Approach`,
      description: `Risk-mitigated alternative strategy focusing on sustainable growth`,
      frameworks: params.frameworks.length > 0 ? params.frameworks : ['mission-generator', 'financial-frameworks'],
      scenario: generateAlternativeScenarioText(params),
      recommendations: generateAlternativeRecommendations(params),
      confidence: 0.78,
      generatedAt: new Date(),
      userId: 'current-user',
      isBookmarked: false
    }
  ];

  return scenarios;
}

function getScenarioTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    'competitive': 'Competitive Response',
    'market-entry': 'Market Entry',
    'innovation': 'Innovation Strategy',
    'digital-transformation': 'Digital Transformation',
    'crisis-management': 'Crisis Management',
    'growth-strategy': 'Growth Strategy',
    'cost-optimization': 'Cost Optimization',
    'sustainability': 'Sustainability'
  };
  return typeMap[type] || 'Strategic';
}

function generateScenarioText(params: any): string {
  return `Strategic Scenario for ${params.timeHorizon}:

The ${params.industryContext} industry is experiencing significant transformation driven by technological advancement and changing customer expectations. To address ${params.scenarioType} challenges, organizations should focus on:

1. Market Position Assessment
   - Analyze current competitive landscape using Porter's Five Forces
   - Identify market gaps and opportunities through Blue Ocean Strategy
   - Leverage real-time market intelligence for informed decision-making

2. Strategic Response Framework
   - Develop differentiated value propositions
   - Build strategic partnerships and alliances
   - Invest in core competencies and emerging technologies

3. Implementation Roadmap
   - Phase 1 (Months 1-3): Foundation building and market research
   - Phase 2 (Months 4-8): Strategy execution and pilot programs
   - Phase 3 (Months 9-12): Scale successful initiatives and optimize

Key Success Factors:
- Strong leadership commitment and change management
- Cross-functional collaboration and communication
- Continuous monitoring and strategy adaptation
- Investment in talent development and capabilities

Risk Mitigation:
- Diversified approach to reduce single points of failure
- Scenario planning for multiple future states
- Regular strategy reviews and course corrections

Expected Outcomes:
- Improved market position and competitive advantage
- Enhanced operational efficiency and profitability
- Stronger customer relationships and brand equity
- Sustainable long-term growth trajectory`;
}

function generateAlternativeScenarioText(params: any): string {
  return `Alternative Strategic Approach:

This scenario emphasizes gradual transformation with lower risk exposure while maintaining competitive positioning in the ${params.industryContext} sector.

Conservative Growth Strategy:
- Focus on core market strengths and proven capabilities
- Incremental innovation rather than disruptive changes
- Strategic partnerships to access new markets and technologies
- Emphasis on operational excellence and cost management

Risk-Balanced Implementation:
- Test-and-learn approach with smaller investments
- Diversified portfolio of strategic initiatives
- Strong financial controls and performance monitoring
- Flexible resource allocation based on market feedback

Timeline and Milestones:
- Phase 1: Market validation and small-scale pilots
- Phase 2: Gradual expansion of successful initiatives
- Phase 3: Full-scale implementation with proven models

This approach offers higher certainty of success while potentially limiting upside potential compared to more aggressive strategies.`;
}

function generateRecommendations(params: any): AIRecommendation[] {
  return [
    {
      id: 'rec-1',
      type: RecommendationType.STRATEGIC,
      title: 'Develop Core Value Proposition',
      description: 'Create unique value proposition that differentiates from competitors',
      impact: ImpactLevel.HIGH,
      effort: EffortLevel.MEDIUM,
      timeframe: '3-6 months',
      frameworks: ['blue-ocean', 'mission-generator'],
      actions: [
        'Conduct customer research and needs analysis',
        'Map competitive landscape and positioning',
        'Define unique value drivers and benefits',
        'Test value proposition with target segments'
      ],
      priority: 9
    },
    {
      id: 'rec-2',
      type: RecommendationType.OPERATIONAL,
      title: 'Implement Performance Monitoring',
      description: 'Establish KPIs and monitoring systems for strategy execution',
      impact: ImpactLevel.MEDIUM,
      effort: EffortLevel.LOW,
      timeframe: '1-2 months',
      frameworks: ['data-pulse', 'financial-frameworks'],
      actions: [
        'Define key performance indicators',
        'Set up dashboard and reporting systems',
        'Establish regular review processes',
        'Train teams on performance management'
      ],
      priority: 7
    },
    {
      id: 'rec-3',
      type: RecommendationType.MARKET,
      title: 'Expand Market Intelligence',
      description: 'Enhance market research and competitive intelligence capabilities',
      impact: ImpactLevel.MEDIUM,
      effort: EffortLevel.MEDIUM,
      timeframe: '2-4 months',
      frameworks: ['porters-five-forces', 'data-pulse'],
      actions: [
        'Implement market monitoring tools',
        'Develop competitive intelligence processes',
        'Create market trend analysis reports',
        'Build external partnership networks'
      ],
      priority: 6
    }
  ];
}

function generateAlternativeRecommendations(params: any): AIRecommendation[] {
  return [
    {
      id: 'alt-rec-1',
      type: RecommendationType.RISK,
      title: 'Strengthen Risk Management',
      description: 'Develop comprehensive risk assessment and mitigation strategies',
      impact: ImpactLevel.HIGH,
      effort: EffortLevel.MEDIUM,
      timeframe: '2-3 months',
      frameworks: ['financial-frameworks', 'process-management'],
      actions: [
        'Conduct enterprise risk assessment',
        'Develop risk mitigation playbooks',
        'Implement early warning systems',
        'Create crisis response protocols'
      ],
      priority: 8
    },
    {
      id: 'alt-rec-2',
      type: RecommendationType.FINANCIAL,
      title: 'Optimize Financial Performance',
      description: 'Focus on improving margins and operational efficiency',
      impact: ImpactLevel.MEDIUM,
      effort: EffortLevel.LOW,
      timeframe: '1-3 months',
      frameworks: ['financial-frameworks'],
      actions: [
        'Analyze cost structure and identify savings',
        'Optimize pricing strategies',
        'Improve cash flow management',
        'Streamline operational processes'
      ],
      priority: 7
    }
  ];
}

export default AIScenarioEngine;
