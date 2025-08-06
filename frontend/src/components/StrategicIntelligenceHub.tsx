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
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  Icon,
  IconButton,
  Tooltip,
  Switch,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Collapse,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Spinner,
  Flex,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import {
  StrategicIntelligence,
  IntelligenceType,
  UrgencyLevel,
  DataSource,
  Insight,
  ImpactLevel,
  FrameworkMetadata
} from '../types/FrameworkTypes';
import { frameworkRegistry } from '../services/FrameworkRegistry';

interface StrategicIntelligenceHubProps {
  currentFramework?: string;
  organizationContext?: Record<string, any>;
  onInsightAction?: (insight: Insight, action: string) => void;
}

const StrategicIntelligenceHub: React.FC<StrategicIntelligenceHubProps> = ({
  currentFramework,
  organizationContext = {},
  onInsightAction
}) => {
  const [intelligence, setIntelligence] = useState<StrategicIntelligence[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIntelligence, setSelectedIntelligence] = useState<StrategicIntelligence | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    urgency: 'all',
    source: 'all',
    framework: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(300); // 5 minutes
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Intelligence types with icons and colors
  const intelligenceTypes = [
    { value: IntelligenceType.MARKET_SHIFT, label: 'Market Shift', icon: '📈', color: 'blue' },
    { value: IntelligenceType.COMPETITIVE_THREAT, label: 'Competitive Threat', icon: '⚔️', color: 'red' },
    { value: IntelligenceType.OPPORTUNITY, label: 'Opportunity', icon: '💡', color: 'green' },
    { value: IntelligenceType.REGULATORY_CHANGE, label: 'Regulatory Change', icon: '⚖️', color: 'orange' },
    { value: IntelligenceType.TECHNOLOGY_TREND, label: 'Technology Trend', icon: '🔬', color: 'purple' },
    { value: IntelligenceType.CUSTOMER_BEHAVIOR, label: 'Customer Behavior', icon: '👥', color: 'teal' }
  ];

  // Data sources with descriptions
  const dataSources = [
    { value: DataSource.MARKET_DATA, label: 'Market Data', icon: '📊' },
    { value: DataSource.FINANCIAL_DATA, label: 'Financial Data', icon: '💰' },
    { value: DataSource.SOCIAL_SIGNALS, label: 'Social Signals', icon: '📱' },
    { value: DataSource.NEWS_ANALYSIS, label: 'News Analysis', icon: '📰' },
    { value: DataSource.INTERNAL_DATA, label: 'Internal Data', icon: '🏢' },
    { value: DataSource.AI_ANALYSIS, label: 'AI Analysis', icon: '🤖' }
  ];

  // Load strategic intelligence
  useEffect(() => {
    loadIntelligence();
  }, [currentFramework, organizationContext]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadIntelligence(true);
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Load intelligence data
  const loadIntelligence = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);

    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, isRefresh ? 500 : 1500));
      
      const mockIntelligence = await generateMockIntelligence(currentFramework, organizationContext);
      setIntelligence(mockIntelligence);
      setLastUpdate(new Date());

      if (isRefresh) {
        toast({
          title: 'Intelligence Updated',
          description: `Refreshed ${mockIntelligence.length} intelligence items`,
          status: 'success',
          duration: 2000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error('Failed to load intelligence:', error);
      toast({
        title: 'Update Failed',
        description: 'Unable to load strategic intelligence',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  }, [currentFramework, organizationContext, toast]);

  // Filter intelligence based on current filters and search
  const filteredIntelligence = useMemo(() => {
    return intelligence.filter(item => {
      // Type filter
      if (filters.type !== 'all' && item.type !== filters.type) return false;
      
      // Urgency filter
      if (filters.urgency !== 'all' && item.urgency !== filters.urgency) return false;
      
      // Source filter
      if (filters.source !== 'all' && item.source !== filters.source) return false;
      
      // Framework filter
      if (filters.framework !== 'all' && !item.frameworks.includes(filters.framework)) return false;
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.summary.toLowerCase().includes(query) ||
          item.insights.some(insight => 
            insight.title.toLowerCase().includes(query) ||
            insight.description.toLowerCase().includes(query)
          )
        );
      }
      
      return true;
    });
  }, [intelligence, filters, searchQuery]);

  // Get urgency color
  const getUrgencyColor = (urgency: UrgencyLevel): string => {
    switch (urgency) {
      case UrgencyLevel.LOW: return 'green';
      case UrgencyLevel.MEDIUM: return 'yellow';
      case UrgencyLevel.HIGH: return 'orange';
      case UrgencyLevel.CRITICAL: return 'red';
      default: return 'gray';
    }
  };

  // Get intelligence type info
  const getIntelligenceTypeInfo = (type: IntelligenceType) => {
    return intelligenceTypes.find(t => t.value === type) || 
           { icon: '📋', color: 'gray', label: 'Unknown' };
  };

  // Handle insight action
  const handleInsightAction = (insight: Insight, action: string) => {
    if (onInsightAction) {
      onInsightAction(insight, action);
    }
    
    toast({
      title: 'Action Initiated',
      description: `${action} action started for "${insight.title}"`,
      status: 'info',
      duration: 3000,
      isClosable: true
    });
  };

  // Calculate intelligence statistics
  const intelligenceStats = useMemo(() => {
    const total = intelligence.length;
    const critical = intelligence.filter(i => i.urgency === UrgencyLevel.CRITICAL).length;
    const opportunities = intelligence.filter(i => i.type === IntelligenceType.OPPORTUNITY).length;
    const threats = intelligence.filter(i => 
      i.type === IntelligenceType.COMPETITIVE_THREAT || 
      i.type === IntelligenceType.REGULATORY_CHANGE
    ).length;
    
    return { total, critical, opportunities, threats };
  }, [intelligence]);

  // Render intelligence card
  const renderIntelligenceCard = (item: StrategicIntelligence) => {
    const typeInfo = getIntelligenceTypeInfo(item.type);
    
    return (
      <Card 
        key={item.id}
        cursor="pointer"
        _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
        transition="all 0.2s"
        onClick={() => {
          setSelectedIntelligence(item);
          onOpen();
        }}
      >
        <CardHeader pb={2}>
          <VStack align="start" spacing={2}>
            <HStack justify="space-between" w="full">
              <HStack spacing={2}>
                <Text fontSize="lg">{typeInfo.icon}</Text>
                <Text fontSize="md" fontWeight="bold" noOfLines={1}>
                  {item.title}
                </Text>
              </HStack>
              <VStack spacing={1} align="end">
                <Badge colorScheme={getUrgencyColor(item.urgency)} size="sm">
                  {item.urgency}
                </Badge>
                <Badge variant="outline" size="sm">
                  {Math.round(item.confidence * 100)}%
                </Badge>
              </VStack>
            </HStack>
            
            <HStack spacing={2} flexWrap="wrap">
              <Badge colorScheme={typeInfo.color} variant="subtle" size="sm">
                {typeInfo.label}
              </Badge>
              {dataSources.find(s => s.value === item.source) && (
                <Badge variant="outline" size="sm">
                  {dataSources.find(s => s.value === item.source)?.icon} {dataSources.find(s => s.value === item.source)?.label}
                </Badge>
              )}
            </HStack>
          </VStack>
        </CardHeader>
        
        <CardBody pt={0}>
          <VStack align="start" spacing={3}>
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {item.summary}
            </Text>
            
            <HStack justify="space-between" w="full">
              <HStack spacing={2}>
                <Text fontSize="xs" color="gray.500">
                  {item.insights.length} insights
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {item.frameworks.length} frameworks
                </Text>
              </HStack>
              <Text fontSize="xs" color="gray.500">
                {new Date(item.generatedAt).toLocaleDateString()}
              </Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  // Render insight card
  const renderInsightCard = (insight: Insight) => (
    <Card key={insight.id} size="sm">
      <CardBody>
        <VStack align="start" spacing={3}>
          <HStack justify="space-between" w="full">
            <Text fontSize="md" fontWeight="semibold">{insight.title}</Text>
            <Badge colorScheme={getImpactColor(insight.impact)} size="sm">
              {insight.impact} impact
            </Badge>
          </HStack>
          
          <Text fontSize="sm" color="gray.600">{insight.description}</Text>
          
          {insight.suggestedActions.length > 0 && (
            <Box w="full">
              <Text fontSize="sm" fontWeight="medium" mb={2}>Suggested Actions:</Text>
              <VStack align="start" spacing={1}>
                {insight.suggestedActions.slice(0, 2).map((action, index) => (
                  <HStack key={index} spacing={2} w="full">
                    <Text fontSize="xs" color="gray.600" flex="1">• {action}</Text>
                    {insight.actionable && (
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInsightAction(insight, action);
                        }}
                      >
                        Execute
                      </Button>
                    )}
                  </HStack>
                ))}
              </VStack>
            </Box>
          )}
          
          {insight.relatedFrameworks.length > 0 && (
            <HStack spacing={1} flexWrap="wrap">
              <Text fontSize="xs" color="gray.500">Frameworks:</Text>
              {insight.relatedFrameworks.slice(0, 3).map(frameworkId => {
                const framework = frameworkRegistry.getFramework(frameworkId);
                return framework ? (
                  <Badge key={frameworkId} variant="outline" size="xs">
                    {framework.icon} {framework.name}
                  </Badge>
                ) : null;
              })}
            </HStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );

  const getImpactColor = (impact: ImpactLevel): string => {
    switch (impact) {
      case ImpactLevel.LOW: return 'green';
      case ImpactLevel.MEDIUM: return 'yellow';
      case ImpactLevel.HIGH: return 'orange';
      case ImpactLevel.CRITICAL: return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">🧠 Strategic Intelligence Hub</Text>
            <Text color="gray.600">Real-time insights and cross-framework intelligence</Text>
          </VStack>
          
          <HStack spacing={3}>
            <HStack spacing={2}>
              <Text fontSize="sm">Auto-refresh</Text>
              <Switch 
                isChecked={autoRefresh} 
                onChange={(e) => setAutoRefresh(e.target.checked)}
                colorScheme="teal"
              />
            </HStack>
            <Button
              variant="outline"
              onClick={() => loadIntelligence(true)}
              isLoading={loading}
              leftIcon={<Text>🔄</Text>}
            >
              Refresh
            </Button>
          </HStack>
        </HStack>

        {/* Statistics Dashboard */}
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Intelligence</StatLabel>
                <StatNumber>{intelligenceStats.total}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Active insights
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Critical Items</StatLabel>
                <StatNumber color="red.500">{intelligenceStats.critical}</StatNumber>
                <StatHelpText>Require immediate attention</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Opportunities</StatLabel>
                <StatNumber color="green.500">{intelligenceStats.opportunities}</StatNumber>
                <StatHelpText>Growth potential identified</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Threats</StatLabel>
                <StatNumber color="orange.500">{intelligenceStats.threats}</StatNumber>
                <StatHelpText>Risk factors detected</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <Text fontSize="lg" fontWeight="semibold">Intelligence Filters</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              <GridItem>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Type</Text>
                <Select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
                  <option value="all">All Types</option>
                  {intelligenceTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </Select>
              </GridItem>
              
              <GridItem>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Urgency</Text>
                <Select value={filters.urgency} onChange={(e) => setFilters({...filters, urgency: e.target.value})}>
                  <option value="all">All Urgency</option>
                  <option value={UrgencyLevel.CRITICAL}>Critical</option>
                  <option value={UrgencyLevel.HIGH}>High</option>
                  <option value={UrgencyLevel.MEDIUM}>Medium</option>
                  <option value={UrgencyLevel.LOW}>Low</option>
                </Select>
              </GridItem>
              
              <GridItem>
                <Text fontSize="sm" fontWeight="medium" mb={2}>Source</Text>
                <Select value={filters.source} onChange={(e) => setFilters({...filters, source: e.target.value})}>
                  <option value="all">All Sources</option>
                  {dataSources.map(source => (
                    <option key={source.value} value={source.value}>
                      {source.icon} {source.label}
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search intelligence..."
                  />
                </InputGroup>
              </GridItem>
            </Grid>
            
            <HStack mt={4} spacing={4} justify="space-between">
              <Text fontSize="sm" color="gray.600">
                Showing {filteredIntelligence.length} of {intelligence.length} items
              </Text>
              <Text fontSize="sm" color="gray.600">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </Text>
            </HStack>
          </CardBody>
        </Card>

        {/* Intelligence Items */}
        {loading ? (
          <Flex justify="center" align="center" minH="200px">
            <VStack spacing={4}>
              <Spinner size="xl" color="teal.500" />
              <Text>Loading strategic intelligence...</Text>
            </VStack>
          </Flex>
        ) : filteredIntelligence.length > 0 ? (
          <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap={4}>
            {filteredIntelligence.map(renderIntelligenceCard)}
          </Grid>
        ) : (
          <Alert status="info">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">No Intelligence Found</Text>
              <Text fontSize="sm">
                {intelligence.length === 0 
                  ? 'No strategic intelligence available. Check your data sources and try refreshing.'
                  : 'No items match your current filters. Try adjusting the filters above.'
                }
              </Text>
            </VStack>
          </Alert>
        )}
      </VStack>

      {/* Intelligence Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedIntelligence && (
              <VStack align="start" spacing={2}>
                <HStack spacing={3}>
                  <Text fontSize="lg">
                    {getIntelligenceTypeInfo(selectedIntelligence.type).icon}
                  </Text>
                  <Text>{selectedIntelligence.title}</Text>
                </HStack>
                <HStack spacing={2}>
                  <Badge colorScheme={getUrgencyColor(selectedIntelligence.urgency)}>
                    {selectedIntelligence.urgency} priority
                  </Badge>
                  <Badge variant="outline">
                    {Math.round(selectedIntelligence.confidence * 100)}% confidence
                  </Badge>
                  <Badge colorScheme={getIntelligenceTypeInfo(selectedIntelligence.type).color} variant="subtle">
                    {getIntelligenceTypeInfo(selectedIntelligence.type).label}
                  </Badge>
                </HStack>
              </VStack>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedIntelligence && (
              <Tabs>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Insights ({selectedIntelligence.insights.length})</Tab>
                  <Tab>Related Frameworks ({selectedIntelligence.frameworks.length})</Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel>
                    <VStack align="start" spacing={4}>
                      <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={2}>Summary</Text>
                        <Text>{selectedIntelligence.summary}</Text>
                      </Box>
                      
                      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                        <Card size="sm">
                          <CardBody>
                            <VStack align="start" spacing={2}>
                              <Text fontSize="sm" fontWeight="medium">Intelligence Type</Text>
                              <HStack>
                                <Text>{getIntelligenceTypeInfo(selectedIntelligence.type).icon}</Text>
                                <Text fontSize="sm">{getIntelligenceTypeInfo(selectedIntelligence.type).label}</Text>
                              </HStack>
                            </VStack>
                          </CardBody>
                        </Card>
                        
                        <Card size="sm">
                          <CardBody>
                            <VStack align="start" spacing={2}>
                              <Text fontSize="sm" fontWeight="medium">Data Source</Text>
                              <HStack>
                                <Text>{dataSources.find(s => s.value === selectedIntelligence.source)?.icon}</Text>
                                <Text fontSize="sm">{dataSources.find(s => s.value === selectedIntelligence.source)?.label}</Text>
                              </HStack>
                            </VStack>
                          </CardBody>
                        </Card>
                        
                        <Card size="sm">
                          <CardBody>
                            <VStack align="start" spacing={2}>
                              <Text fontSize="sm" fontWeight="medium">Confidence Level</Text>
                              <CircularProgress value={selectedIntelligence.confidence * 100} color="teal.400" size="60px">
                                <CircularProgressLabel fontSize="xs">
                                  {Math.round(selectedIntelligence.confidence * 100)}%
                                </CircularProgressLabel>
                              </CircularProgress>
                            </VStack>
                          </CardBody>
                        </Card>
                        
                        <Card size="sm">
                          <CardBody>
                            <VStack align="start" spacing={2}>
                              <Text fontSize="sm" fontWeight="medium">Generated</Text>
                              <Text fontSize="sm">
                                {new Date(selectedIntelligence.generatedAt).toLocaleString()}
                              </Text>
                            </VStack>
                          </CardBody>
                        </Card>
                      </Grid>
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      {selectedIntelligence.insights
                        .sort((a, b) => {
                          const impactOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                          return impactOrder[b.impact] - impactOrder[a.impact];
                        })
                        .map(renderInsightCard)}
                    </VStack>
                  </TabPanel>
                  
                  <TabPanel>
                    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3}>
                      {selectedIntelligence.frameworks.map(frameworkId => {
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
                                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
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
                Export Intelligence
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Mock intelligence generation
async function generateMockIntelligence(
  currentFramework?: string, 
  context?: Record<string, any>
): Promise<StrategicIntelligence[]> {
  const intelligence: StrategicIntelligence[] = [
    {
      id: `intel-${Date.now()}-1`,
      type: IntelligenceType.MARKET_SHIFT,
      title: 'AI Adoption Accelerating in Target Market',
      summary: 'Rapid AI adoption creating new competitive dynamics and customer expectations in the technology sector',
      insights: [
        {
          id: 'insight-1',
          title: 'Customer Expectations Rising',
          description: 'Customers increasingly expect AI-powered features and personalized experiences',
          impact: ImpactLevel.HIGH,
          actionable: true,
          relatedFrameworks: ['blue-ocean', 'porters-five-forces'],
          suggestedActions: [
            'Develop AI integration roadmap',
            'Survey customers on AI preferences',
            'Analyze competitor AI offerings'
          ]
        },
        {
          id: 'insight-2',
          title: 'New Market Entrants',
          description: 'AI-native startups disrupting traditional business models',
          impact: ImpactLevel.MEDIUM,
          actionable: true,
          relatedFrameworks: ['porters-five-forces', 'data-pulse'],
          suggestedActions: [
            'Monitor emerging competitors',
            'Assess threat of substitution',
            'Evaluate partnership opportunities'
          ]
        }
      ],
      frameworks: ['blue-ocean', 'porters-five-forces', 'data-pulse'],
      confidence: 0.89,
      urgency: UrgencyLevel.HIGH,
      generatedAt: new Date(),
      source: DataSource.MARKET_DATA
    },
    {
      id: `intel-${Date.now()}-2`,
      type: IntelligenceType.OPPORTUNITY,
      title: 'Sustainability Market Growth Opportunity',
      summary: 'Growing demand for sustainable solutions creating blue ocean opportunities',
      insights: [
        {
          id: 'insight-3',
          title: 'ESG Investment Surge',
          description: 'ESG-focused investments reaching record levels, creating funding opportunities',
          impact: ImpactLevel.HIGH,
          actionable: true,
          relatedFrameworks: ['blue-ocean', 'financial-frameworks'],
          suggestedActions: [
            'Develop sustainability strategy',
            'Identify ESG investors',
            'Create impact measurement framework'
          ]
        }
      ],
      frameworks: ['blue-ocean', 'financial-frameworks', 'mission-generator'],
      confidence: 0.82,
      urgency: UrgencyLevel.MEDIUM,
      generatedAt: new Date(),
      source: DataSource.FINANCIAL_DATA
    },
    {
      id: `intel-${Date.now()}-3`,
      type: IntelligenceType.COMPETITIVE_THREAT,
      title: 'Major Competitor Announces Strategic Partnership',
      summary: 'Key competitor forming alliance with technology leader, potentially disrupting market position',
      insights: [
        {
          id: 'insight-4',
          title: 'Technology Access Advantage',
          description: 'Partnership gives competitor access to advanced technology and expanded distribution',
          impact: ImpactLevel.HIGH,
          actionable: true,
          relatedFrameworks: ['porters-five-forces', 'data-pulse'],
          suggestedActions: [
            'Assess competitive impact',
            'Explore counter-partnerships',
            'Accelerate technology development'
          ]
        }
      ],
      frameworks: ['porters-five-forces', 'data-pulse', 'blue-ocean'],
      confidence: 0.95,
      urgency: UrgencyLevel.CRITICAL,
      generatedAt: new Date(),
      source: DataSource.NEWS_ANALYSIS
    },
    {
      id: `intel-${Date.now()}-4`,
      type: IntelligenceType.TECHNOLOGY_TREND,
      title: 'Quantum Computing Breakthrough',
      summary: 'Recent quantum computing advances may revolutionize data processing capabilities',
      insights: [
        {
          id: 'insight-5',
          title: 'Future Computing Paradigm',
          description: 'Quantum computing could fundamentally change data analysis and encryption',
          impact: ImpactLevel.MEDIUM,
          actionable: false,
          relatedFrameworks: ['data-pulse', 'financial-frameworks'],
          suggestedActions: [
            'Monitor quantum computing developments',
            'Assess long-term implications',
            'Consider research partnerships'
          ]
        }
      ],
      frameworks: ['data-pulse', 'financial-frameworks'],
      confidence: 0.71,
      urgency: UrgencyLevel.LOW,
      generatedAt: new Date(),
      source: DataSource.AI_ANALYSIS
    }
  ];

  return intelligence;
}

export default StrategicIntelligenceHub;