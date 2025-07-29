import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Button,
  Grid,
  GridItem,
  Badge,
  Select,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Progress,
  Alert,
  AlertIcon,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

// Marketing Automation Data Structures (surpassing Act-On)
interface StrategicCampaign {
  id: string;
  name: string;
  strategicFramework: 'blue-ocean' | 'porter-forces' | 'vrio' | 'value-chain';
  strategicInsights: string[];
  targetSegments: CustomerSegment[];
  channels: MarketingChannel[];
  content: ContentAsset[];
  automation: AutomationWorkflow[];
  metrics: CampaignMetrics;
  status: 'planning' | 'active' | 'paused' | 'completed';
  budgetAllocated: number;
  roi: number;
  createdAt: string;
}

interface CustomerSegment {
  id: string;
  name: string;
  strategicValue: 'high' | 'medium' | 'low';
  buyerPersona: {
    demographics: Record<string, any>;
    psychographics: Record<string, any>;
    buyingBehavior: string[];
    painPoints: string[];
    strategicNeeds: string[];
  };
  size: number;
  conversionRate: number;
  lifetimeValue: number;
  acquisitionCost: number;
  engagementScore: number;
}

interface MarketingChannel {
  id: string;
  name: string;
  type: 'email' | 'social' | 'content' | 'webinar' | 'direct' | 'partner';
  strategicAlignment: string;
  performance: {
    reach: number;
    engagement: number;
    conversion: number;
    cost: number;
  };
  automation: boolean;
  integration: string[];
}

interface ContentAsset {
  id: string;
  title: string;
  type: 'email' | 'blog' | 'whitepaper' | 'video' | 'webinar' | 'case-study';
  strategicMessage: string;
  frameworkBased: boolean;
  buyerStage: 'awareness' | 'consideration' | 'decision' | 'retention';
  personalization: PersonalizationRule[];
  performance: ContentPerformance;
  aiGenerated: boolean;
  createdAt: string;
}

interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: TriggerCondition;
  steps: WorkflowStep[];
  strategicObjective: string;
  isActive: boolean;
  performance: WorkflowPerformance;
}

interface TriggerCondition {
  type: 'behavior' | 'demographic' | 'engagement' | 'strategic-score';
  conditions: Record<string, any>;
  frequency: 'immediate' | 'daily' | 'weekly';
}

interface WorkflowStep {
  id: string;
  type: 'email' | 'sms' | 'social' | 'scoring' | 'segmentation' | 'notification';
  action: string;
  delay: number;
  conditions: Record<string, any>;
  personalization: boolean;
}

interface PersonalizationRule {
  field: string;
  condition: string;
  value: any;
  content: string;
}

interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
  engagementScore: number;
  strategicImpact: number;
}

interface ContentPerformance {
  views: number;
  engagement: number;
  shares: number;
  conversions: number;
  timeOnPage: number;
  strategicRelevance: number;
}

interface WorkflowPerformance {
  triggered: number;
  completed: number;
  conversionRate: number;
  revenue: number;
  avgTimeToConvert: number;
}

// Comprehensive Marketing Automation Platform
const MarketingAutomation: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const [campaigns, setCampaigns] = useState<StrategicCampaign[]>([]);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [channels, setChannels] = useState<MarketingChannel[]>([]);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  
  const { isOpen: isCampaignOpen, onOpen: onCampaignOpen, onClose: onCampaignClose } = useDisclosure();
  const { isOpen: isSegmentOpen, onOpen: onSegmentOpen, onClose: onSegmentClose } = useDisclosure();
  const { isOpen: isWorkflowOpen, onOpen: onWorkflowOpen, onClose: onWorkflowClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  // Initialize demo data
  useEffect(() => {
    const demoSegments: CustomerSegment[] = [
      {
        id: 'seg_001',
        name: 'Strategic Leaders',
        strategicValue: 'high',
        buyerPersona: {
          demographics: { role: 'C-Level/VP', company_size: '500+', industry: 'Technology' },
          psychographics: { values: ['Innovation', 'Growth', 'Efficiency'], motivations: ['Competitive Advantage', 'Market Leadership'] },
          buyingBehavior: ['Research-driven', 'Consensus-building', 'ROI-focused'],
          painPoints: ['Market saturation', 'Digital transformation', 'Talent acquisition'],
          strategicNeeds: ['Blue ocean opportunities', 'Competitive differentiation', 'Sustainable growth']
        },
        size: 2500,
        conversionRate: 12.5,
        lifetimeValue: 45000,
        acquisitionCost: 2800,
        engagementScore: 8.7
      },
      {
        id: 'seg_002',
        name: 'Operational Managers',
        strategicValue: 'medium',
        buyerPersona: {
          demographics: { role: 'Director/Manager', company_size: '100-500', industry: 'Various' },
          psychographics: { values: ['Efficiency', 'Results', 'Team Success'], motivations: ['Process Improvement', 'Performance'] },
          buyingBehavior: ['Solution-focused', 'Quick decisions', 'Budget-conscious'],
          painPoints: ['Resource constraints', 'Process inefficiencies', 'Team alignment'],
          strategicNeeds: ['Operational excellence', 'Performance metrics', 'Team development']
        },
        size: 8200,
        conversionRate: 8.2,
        lifetimeValue: 18000,
        acquisitionCost: 1200,
        engagementScore: 7.3
      }
    ];

    const demoChannels: MarketingChannel[] = [
      {
        id: 'ch_001',
        name: 'Strategic Email Campaigns',
        type: 'email',
        strategicAlignment: 'Blue Ocean messaging for market leaders',
        performance: { reach: 15000, engagement: 24.5, conversion: 4.2, cost: 850 },
        automation: true,
        integration: ['CRM', 'Analytics', 'Lead Scoring']
      },
      {
        id: 'ch_002',
        name: 'LinkedIn Strategic Content',
        type: 'social',
        strategicAlignment: 'Thought leadership and strategic insights sharing',
        performance: { reach: 25000, engagement: 18.7, conversion: 2.8, cost: 1200 },
        automation: true,
        integration: ['Social Analytics', 'Lead Generation', 'Content Calendar']
      },
      {
        id: 'ch_003',
        name: 'Strategy Framework Webinars',
        type: 'webinar',
        strategicAlignment: 'Educational content based on strategic frameworks',
        performance: { reach: 3500, engagement: 45.2, conversion: 12.1, cost: 2100 },
        automation: false,
        integration: ['Registration', 'Follow-up', 'Lead Scoring']
      }
    ];

    const demoCampaigns: StrategicCampaign[] = [
      {
        id: 'camp_001',
        name: 'Blue Ocean Leadership Series',
        strategicFramework: 'blue-ocean',
        strategicInsights: [
          'Target uncontested market space in strategic planning software',
          'Eliminate traditional consulting dependencies',
          'Create new value curve combining strategy + automation',
          'Raise user experience and integration standards'
        ],
        targetSegments: demoSegments,
        channels: demoChannels,
        content: [],
        automation: [],
        metrics: {
          impressions: 45000,
          clicks: 3200,
          conversions: 180,
          revenue: 285000,
          roi: 235.5,
          engagementScore: 8.4,
          strategicImpact: 9.2
        },
        status: 'active',
        budgetAllocated: 25000,
        roi: 235.5,
        createdAt: new Date().toISOString()
      }
    ];

    setSegments(demoSegments);
    setChannels(demoChannels);
    setCampaigns(demoCampaigns);
  }, []);

  const createStrategicCampaign = () => {
    const newCampaign: StrategicCampaign = {
      id: `camp_${Date.now()}`,
      name: 'New Strategic Campaign',
      strategicFramework: 'blue-ocean',
      strategicInsights: [],
      targetSegments: [],
      channels: [],
      content: [],
      automation: [],
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        roi: 0,
        engagementScore: 0,
        strategicImpact: 0
      },
      status: 'planning',
      budgetAllocated: 0,
      roi: 0,
      createdAt: new Date().toISOString()
    };
    setCampaigns(prev => [...prev, newCampaign]);
    onCampaignClose();
  };

  const renderCampaignOverview = () => (
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
      <VStack spacing={6} align="stretch">
        {/* Campaign Performance Dashboard */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Strategic Campaign Performance</Text>
              <Button colorScheme="blue" size="sm" onClick={onCampaignOpen}>
                + New Campaign
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4} mb={6}>
              <Card bg={successBg} p={4}>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold">$1.2M</Text>
                  <Text fontSize="sm" textAlign="center">Revenue Generated</Text>
                </VStack>
              </Card>
              <Card bg={infoBg} p={4}>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold">245%</Text>
                  <Text fontSize="sm" textAlign="center">Average ROI</Text>
                </VStack>
              </Card>
              <Card bg={cardBg} p={4} border="2px" borderColor="purple.200">
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold">8.7</Text>
                  <Text fontSize="sm" textAlign="center">Strategic Impact</Text>
                </VStack>
              </Card>
              <Card bg={cardBg} p={4} border="2px" borderColor="orange.200">
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold">12.4%</Text>
                  <Text fontSize="sm" textAlign="center">Conversion Rate</Text>
                </VStack>
              </Card>
            </Grid>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Campaign</Th>
                  <Th>Framework</Th>
                  <Th>Status</Th>
                  <Th>Revenue</Th>
                  <Th>ROI</Th>
                  <Th>Strategic Impact</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {campaigns.map(campaign => (
                  <Tr key={campaign.id}>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">{campaign.name}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {campaign.targetSegments.length} segments, {campaign.channels.length} channels
                        </Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="purple" variant="subtle">
                        {campaign.strategicFramework.replace('-', ' ')}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge 
                        colorScheme={campaign.status === 'active' ? 'green' : campaign.status === 'planning' ? 'orange' : 'gray'}
                      >
                        {campaign.status}
                      </Badge>
                    </Td>
                    <Td>${campaign.metrics.revenue.toLocaleString()}</Td>
                    <Td>{campaign.metrics.roi.toFixed(1)}%</Td>
                    <Td>
                      <HStack>
                        <Progress 
                          value={campaign.metrics.strategicImpact * 10} 
                          size="sm" 
                          w="60px" 
                          colorScheme="purple" 
                        />
                        <Text fontSize="sm">{campaign.metrics.strategicImpact}/10</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Button size="xs" variant="outline">Edit</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Strategic Insights Integration */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">Framework-Based Campaign Insights</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {campaigns.map(campaign => (
                <Box key={campaign.id} p={4} bg={infoBg} borderRadius="md">
                  <Text fontSize="md" fontWeight="semibold" mb={2}>
                    {campaign.name} - Strategic Insights
                  </Text>
                  <VStack align="start" spacing={2}>
                    {campaign.strategicInsights.map((insight, index) => (
                      <HStack key={index}>
                        <Text fontSize="sm" color="blue.600">•</Text>
                        <Text fontSize="sm">{insight}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </VStack>

      <VStack spacing={6} align="stretch">
        {/* Customer Segments */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Strategic Segments</Text>
              <Button size="sm" colorScheme="purple" onClick={onSegmentOpen}>
                + New Segment
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {segments.map(segment => (
                <Box key={segment.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="semibold">{segment.name}</Text>
                    <Badge 
                      colorScheme={segment.strategicValue === 'high' ? 'green' : segment.strategicValue === 'medium' ? 'orange' : 'gray'}
                    >
                      {segment.strategicValue} value
                    </Badge>
                  </HStack>
                  <Grid templateColumns="repeat(2, 1fr)" gap={2} fontSize="xs">
                    <Text>Size: {segment.size.toLocaleString()}</Text>
                    <Text>LTV: ${segment.lifetimeValue.toLocaleString()}</Text>
                    <Text>Conv Rate: {segment.conversionRate}%</Text>
                    <Text>Engagement: {segment.engagementScore}/10</Text>
                  </Grid>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Marketing Channels */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">Integrated Channels</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {channels.map(channel => (
                <Box key={channel.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="semibold">{channel.name}</Text>
                    <Badge colorScheme={channel.automation ? 'green' : 'orange'}>
                      {channel.automation ? 'Automated' : 'Manual'}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.600" mb={2}>
                    {channel.strategicAlignment}
                  </Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={2} fontSize="xs">
                    <Text>Reach: {channel.performance.reach.toLocaleString()}</Text>
                    <Text>Engagement: {channel.performance.engagement}%</Text>
                    <Text>Conversion: {channel.performance.conversion}%</Text>
                    <Text>Cost: ${channel.performance.cost}</Text>
                  </Grid>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Automation Workflows */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Smart Workflows</Text>
              <Button size="sm" colorScheme="green" onClick={onWorkflowOpen}>
                + New Workflow
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  AI-powered workflows that adapt based on strategic framework insights and customer behavior
                </Text>
              </Alert>
              {workflows.length === 0 ? (
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  No workflows created yet. Start with a framework-based automation.
                </Text>
              ) : (
                workflows.map(workflow => (
                  <Box key={workflow.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                    <HStack justify="space-between">
                      <Text fontWeight="semibold">{workflow.name}</Text>
                      <Switch isChecked={workflow.isActive} size="sm" />
                    </HStack>
                    <Text fontSize="xs" color="gray.600">{workflow.strategicObjective}</Text>
                  </Box>
                ))
              )}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Grid>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">📈</Text>
            <Text fontSize="3xl" fontWeight="bold">Strategic Marketing Automation</Text>
          </HStack>
          <Text color="gray.600" mb={6}>
            Marketing automation platform that integrates with strategic frameworks for superior campaign performance
          </Text>
        </Box>

        {/* Competitive Advantage Alert */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Strategic Advantage Over Act-On & Competitors</Text>
            <Text fontSize="sm">
              Unlike traditional marketing platforms, Lucidra integrates strategic frameworks directly into campaign creation, 
              ensuring every marketing action supports your strategic objectives and competitive positioning.
            </Text>
          </VStack>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Campaign Overview</Tab>
            <Tab>Strategic Email Builder</Tab>
            <Tab>Lead Intelligence</Tab>
            <Tab>Analytics & ROI</Tab>
            <Tab>Integration Hub</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderCampaignOverview()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Strategic Email Builder with framework-based content suggestions coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Advanced lead intelligence with strategic scoring coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Comprehensive analytics dashboard connecting marketing metrics to strategic outcomes coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Integration hub for CRM, analytics, and strategic planning tools coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Campaign Creation Modal */}
      <Modal isOpen={isCampaignOpen} onClose={onCampaignClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Strategic Campaign</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  Strategic campaigns leverage framework insights to create more targeted and effective marketing.
                </Text>
              </Alert>

              <FormControl>
                <FormLabel>Campaign Name</FormLabel>
                <Input placeholder="Enter campaign name" />
              </FormControl>

              <FormControl>
                <FormLabel>Strategic Framework Base</FormLabel>
                <Select placeholder="Choose framework">
                  <option value="blue-ocean">Blue Ocean Strategy</option>
                  <option value="porter-forces">Porter Five Forces</option>
                  <option value="vrio">VRIO Analysis</option>
                  <option value="value-chain">Value Chain Analysis</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Campaign Objective</FormLabel>
                <Textarea placeholder="Describe the strategic objective..." rows={3} />
              </FormControl>

              <FormControl>
                <FormLabel>Budget Allocation</FormLabel>
                <NumberInput>
                  <NumberInputField placeholder="0" />
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCampaignClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={createStrategicCampaign}>
              Create Campaign
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MarketingAutomation;