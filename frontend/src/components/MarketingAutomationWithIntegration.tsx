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
  Alert,
  AlertIcon,
  Progress,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Switch,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useFrameworkData } from '../hooks/useFrameworkData';

// Marketing Automation Data Structures
interface MarketingCampaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'social' | 'content' | 'advertising' | 'integrated';
  status: 'draft' | 'active' | 'paused' | 'completed';
  blueOceanSource?: string;
  targetBuyerGroup?: string;
  emotionalAppeal?: boolean;
  channels: string[];
  messaging: {
    headline: string;
    description: string;
    callToAction: string;
    valueProposition: string;
  };
  targeting: {
    demographics: string[];
    psychographics: string[];
    behaviors: string[];
    geographics: string[];
  };
  metrics: {
    reach: number;
    engagement: number;
    conversions: number;
    roi: number;
    cost: number;
  };
  createdAt: string;
  launchedAt?: string;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  blueOceanBuyerGroup?: string;
  size: number;
  characteristics: string[];
  painPoints: string[];
  preferredChannels: string[];
  messagingPreferences: string;
  conversionPotential: number; // 1-10 scale
  acquisitionCost: number;
  lifetimeValue: number;
}

interface MarketingAutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  steps: WorkflowStep[];
  isActive: boolean;
  performance: {
    completionRate: number;
    conversionRate: number;
    dropOffPoints: string[];
  };
}

interface WorkflowStep {
  id: string;
  type: 'email' | 'delay' | 'condition' | 'tag' | 'webhook';
  name: string;
  config: any;
  nextSteps: string[];
}

const MarketingAutomationWithIntegration: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const {
    frameworkState,
    blueOceanData,
    insights,
    hasData
  } = useFrameworkData();

  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [workflows, setWorkflows] = useState<MarketingAutomationWorkflow[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState<MarketingCampaign | null>(null);

  const toast = useToast();
  const { isOpen: isCampaignOpen, onOpen: onCampaignOpen, onClose: onCampaignClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  // Initialize with demo data and Blue Ocean integrations
  useEffect(() => {
    // Load existing campaigns from framework state
    const existingCampaigns = frameworkState.marketing.campaigns.map(campaign => ({
      ...campaign,
      type: 'integrated' as const,
      channels: ['email', 'social', 'content'],
      messaging: {
        headline: `${campaign.name} - Strategic Marketing`,
        description: campaign.messaging,
        callToAction: 'Learn More',
        valueProposition: campaign.emotionalAppeal ? 'Transform your experience' : 'Improve your productivity'
      },
      targeting: {
        demographics: [campaign.targetBuyerGroup || 'Target audience'],
        psychographics: campaign.emotionalAppeal ? ['lifestyle-focused', 'experience-driven'] : ['efficiency-focused', 'results-driven'],
        behaviors: ['active software users', 'early adopters'],
        geographics: ['Global']
      },
      metrics: {
        reach: Math.floor(Math.random() * 10000) + 5000,
        engagement: Math.floor(Math.random() * 30) + 15,
        conversions: Math.floor(Math.random() * 500) + 100,
        roi: Math.floor(Math.random() * 300) + 150,
        cost: Math.floor(Math.random() * 5000) + 2000
      },
      createdAt: new Date().toISOString(),
      launchedAt: new Date().toISOString()
    }));

    setCampaigns(existingCampaigns);

    // Generate segments from Blue Ocean buyer groups
    const blueOceanSegments: CustomerSegment[] = blueOceanData.sixPathsAnalysis.buyerGroups.map((group, index) => ({
      id: `segment_bo_${index}`,
      name: `${group} Segment`,
      description: `Customer segment based on Blue Ocean buyer group analysis`,
      blueOceanBuyerGroup: group,
      size: Math.floor(Math.random() * 50000) + 10000,
      characteristics: [
        'Active in decision-making process',
        'Values specific benefits',
        'Influenced by peer recommendations'
      ],
      painPoints: [
        'Current solutions don\'t meet specific needs',
        'Complex decision-making process',
        'Limited time for evaluation'
      ],
      preferredChannels: ['email', 'social media', 'content marketing'],
      messagingPreferences: blueOceanData.sixPathsAnalysis.functionalEmotional === 'emotional' 
        ? 'Emotional, story-driven content' 
        : 'Data-driven, feature-focused content',
      conversionPotential: Math.floor(Math.random() * 3) + 7,
      acquisitionCost: Math.floor(Math.random() * 200) + 50,
      lifetimeValue: Math.floor(Math.random() * 2000) + 1000
    }));

    setSegments(blueOceanSegments);

    // Create demo workflows
    const demoWorkflows: MarketingAutomationWorkflow[] = [
      {
        id: 'workflow_001',
        name: 'Blue Ocean Nurture Sequence',
        description: 'Automated nurture sequence for Blue Ocean-identified buyer groups',
        trigger: 'Blue Ocean segment identification',
        steps: [
          {
            id: 'step_001',
            type: 'email',
            name: 'Welcome & Value Proposition',
            config: { subject: 'Transform your approach', template: 'blue_ocean_welcome' },
            nextSteps: ['step_002']
          },
          {
            id: 'step_002',
            type: 'delay',
            name: '3-day wait',
            config: { duration: '3 days' },
            nextSteps: ['step_003']
          },
          {
            id: 'step_003',
            type: 'email',
            name: 'Social proof & case studies',
            config: { subject: 'See how others transformed', template: 'social_proof' },
            nextSteps: ['step_004']
          }
        ],
        isActive: true,
        performance: {
          completionRate: 78,
          conversionRate: 12,
          dropOffPoints: ['Initial email open', 'Case study engagement']
        }
      }
    ];

    setWorkflows(demoWorkflows);
  }, [frameworkState.marketing.campaigns, blueOceanData]);

  // Generate campaign from Blue Ocean insights
  const generateCampaignFromInsight = (insight: any) => {
    const newCampaign: MarketingCampaign = {
      id: `campaign_${Date.now()}`,
      name: `${insight.title} Campaign`,
      description: `Marketing campaign generated from Blue Ocean Strategy insight`,
      type: 'integrated',
      status: 'draft',
      blueOceanSource: insight.id,
      targetBuyerGroup: insight.sourceData?.buyerGroups?.[0] || 'Target Audience',
      emotionalAppeal: insight.sourceData?.functionalEmotional === 'emotional',
      channels: ['email', 'social', 'content'],
      messaging: {
        headline: insight.title,
        description: insight.description,
        callToAction: 'Discover the Difference',
        valueProposition: insight.recommendations[0] || 'Experience a new approach'
      },
      targeting: {
        demographics: ['Decision makers', 'Influencers'],
        psychographics: insight.sourceData?.functionalEmotional === 'emotional' 
          ? ['Experience-focused', 'Innovation-seeking']
          : ['Efficiency-focused', 'Results-driven'],
        behaviors: ['Active software users', 'Research-oriented'],
        geographics: ['Global', 'English-speaking markets']
      },
      metrics: {
        reach: 0,
        engagement: 0,
        conversions: 0,
        roi: 0,
        cost: Math.floor(Math.random() * 3000) + 1000
      },
      createdAt: new Date().toISOString()
    };

    setCampaigns(prev => [...prev, newCampaign]);
    
    toast({
      title: "Campaign Generated!",
      description: `Created "${newCampaign.name}" from Blue Ocean insight`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  // Launch campaign
  const launchCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { 
            ...campaign, 
            status: 'active',
            launchedAt: new Date().toISOString(),
            metrics: {
              ...campaign.metrics,
              reach: Math.floor(Math.random() * 10000) + 5000,
              engagement: Math.floor(Math.random() * 25) + 10,
              conversions: Math.floor(Math.random() * 300) + 50,
              roi: Math.floor(Math.random() * 200) + 120
            }
          }
        : campaign
    ));

    toast({
      title: "Campaign Launched!",
      description: "Campaign is now active and collecting metrics",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'draft': return 'gray';
      case 'paused': return 'orange';
      case 'completed': return 'blue';
      default: return 'gray';
    }
  };

  const renderCampaignDashboard = () => (
    <VStack spacing={6} align="stretch">
      {/* Integration Status */}
      {hasData && (
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Blue Ocean Integration Active</Text>
            <Text fontSize="sm">
              {campaigns.filter(c => c.blueOceanSource).length} campaigns generated from Blue Ocean Strategy insights. 
              {segments.filter(s => s.blueOceanBuyerGroup).length} customer segments created from buyer group analysis.
            </Text>
          </VStack>
        </Alert>
      )}

      {!hasData && (
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Ready for Blue Ocean Integration</Text>
            <Text fontSize="sm">
              Complete Blue Ocean Strategy Six Paths Analysis to automatically generate targeted marketing campaigns and customer segments.
            </Text>
          </VStack>
        </Alert>
      )}

      {/* Campaign Overview */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {campaigns.length}
            </Text>
            <Text fontSize="sm" color="gray.600">Total Campaigns</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {campaigns.filter(c => c.status === 'active').length}
            </Text>
            <Text fontSize="sm" color="gray.600">Active</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="purple.500">
              {campaigns.filter(c => c.blueOceanSource).length}
            </Text>
            <Text fontSize="sm" color="gray.600">From Blue Ocean</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="orange.500">
              {campaigns.reduce((sum, c) => sum + c.metrics.roi, 0) / (campaigns.length || 1)}%
            </Text>
            <Text fontSize="sm" color="gray.600">Avg ROI</Text>
          </CardBody>
        </Card>
      </Grid>

      {/* Campaigns List */}
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">Marketing Campaigns</Text>
            <Button size="sm" colorScheme="blue" onClick={onCampaignOpen}>
              Create Campaign
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {campaigns.map(campaign => (
              <Card key={campaign.id} bg={infoBg} _hover={{ shadow: 'md' }} cursor="pointer">
                <CardBody>
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Text fontWeight="semibold">{campaign.name}</Text>
                        {campaign.blueOceanSource && (
                          <Badge colorScheme="purple" size="sm">🌊 Blue Ocean</Badge>
                        )}
                        {campaign.emotionalAppeal && (
                          <Badge colorScheme="pink" size="sm">💖 Emotional</Badge>
                        )}
                      </HStack>
                      <Text fontSize="sm" color="gray.600">{campaign.description}</Text>
                      <HStack spacing={4}>
                        <Text fontSize="xs">
                          <strong>Target:</strong> {campaign.targetBuyerGroup}
                        </Text>
                        <Text fontSize="xs">
                          <strong>Channels:</strong> {campaign.channels.join(', ')}
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack align="end" spacing={2}>
                      <Badge colorScheme={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      {campaign.status === 'active' && (
                        <VStack align="end" spacing={0}>
                          <Text fontSize="xs">ROI: {campaign.metrics.roi}%</Text>
                          <Text fontSize="xs">Reach: {campaign.metrics.reach.toLocaleString()}</Text>
                        </VStack>
                      )}
                      {campaign.status === 'draft' && (
                        <Button size="xs" colorScheme="green" onClick={() => launchCampaign(campaign.id)}>
                          Launch
                        </Button>
                      )}
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
            {campaigns.length === 0 && (
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  No campaigns yet. Create campaigns manually or complete Blue Ocean Strategy analysis to auto-generate targeted campaigns.
                </Text>
              </Alert>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderCustomerSegments = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Strategic Customer Segmentation</Text>
          <Text fontSize="sm">
            Customer segments automatically generated from Blue Ocean Strategy buyer group analysis.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {segments.map(segment => (
          <Card key={segment.id} bg={cardBg}>
            <CardHeader>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{segment.name}</Text>
                  {segment.blueOceanBuyerGroup && (
                    <Badge colorScheme="blue" size="sm">🌊 From Blue Ocean</Badge>
                  )}
                </VStack>
                <VStack align="end" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{segment.size.toLocaleString()}</Text>
                  <Text fontSize="xs" color="gray.500">Market Size</Text>
                </VStack>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Text fontSize="sm" color="gray.600">{segment.description}</Text>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Characteristics:</Text>
                  <VStack align="start" spacing={1}>
                    {segment.characteristics.map((char, index) => (
                      <Text key={index} fontSize="sm">• {char}</Text>
                    ))}
                  </VStack>
                </Box>

                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  <VStack>
                    <Text fontSize="xs" color="gray.500">Conversion</Text>
                    <Badge colorScheme={segment.conversionPotential >= 7 ? 'green' : 'orange'}>
                      {segment.conversionPotential}/10
                    </Badge>
                  </VStack>
                  <VStack>
                    <Text fontSize="xs" color="gray.500">CAC</Text>
                    <Text fontSize="sm" fontWeight="semibold">${segment.acquisitionCost}</Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="xs" color="gray.500">LTV</Text>
                    <Text fontSize="sm" fontWeight="semibold">${segment.lifetimeValue}</Text>
                  </VStack>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>Messaging:</Text>
                  <Text fontSize="sm" color="gray.600">{segment.messagingPreferences}</Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {segments.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          <Text fontSize="sm">
            Complete Blue Ocean Strategy Six Paths Analysis to automatically generate customer segments from buyer group analysis.
          </Text>
        </Alert>
      )}
    </VStack>
  );

  const renderBlueOceanInsights = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="success">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Blue Ocean Marketing Intelligence</Text>
          <Text fontSize="sm">
            Strategic insights from Blue Ocean Strategy that can be converted into targeted marketing campaigns.
          </Text>
        </VStack>
      </Alert>

      {insights.filter(insight => insight.targetFrameworks.includes('marketing')).map(insight => (
        <Card key={insight.id} bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="bold">{insight.title}</Text>
                <Text fontSize="sm" color="gray.600">{insight.description}</Text>
              </VStack>
              <Button 
                size="sm" 
                colorScheme="blue"
                onClick={() => generateCampaignFromInsight(insight)}
                isDisabled={campaigns.some(c => c.blueOceanSource === insight.id)}
              >
                {campaigns.some(c => c.blueOceanSource === insight.id) ? 'Campaign Created' : 'Generate Campaign'}
              </Button>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={3} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>Marketing Recommendations:</Text>
              <VStack align="start" spacing={1}>
                {insight.recommendations.map((rec: string, index: number) => (
                  <Text key={index} fontSize="sm">• {rec}</Text>
                ))}
              </VStack>
            </Box>
            
            {insight.appliedResults && insight.appliedResults.length > 0 && (
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Applied Results:</Text>
                <VStack spacing={2} align="stretch">
                  {insight.appliedResults.filter((result: any) => result.framework === 'marketing').map((result: any, index: number) => (
                    <Box key={index} p={3} bg={successBg} borderRadius="md">
                      <Text fontSize="sm" fontWeight="semibold">{result.action}</Text>
                      <Text fontSize="sm" color="gray.600">{result.outcome}</Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>
    ))}

    {insights.filter(insight => insight.targetFrameworks.includes('marketing')).length === 0 && (
      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          No Blue Ocean insights available for marketing yet. Complete Six Paths Analysis and generate insights to see marketing opportunities.
        </Text>
      </Alert>
    )}
  </VStack>
);

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">📈</Text>
            <Text fontSize="3xl" fontWeight="bold">Marketing Automation</Text>
            <Badge colorScheme="green" ml={2}>BLUE OCEAN INTEGRATED</Badge>
          </HStack>
          <Text color="gray.600" mb={6}>
            Strategic marketing automation powered by Blue Ocean Strategy insights. Generate targeted campaigns from buyer group analysis and strategic positioning.
          </Text>
        </Box>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Campaign Dashboard</Tab>
            <Tab>Customer Segments</Tab>
            <Tab>Blue Ocean Insights</Tab>
            <Tab>Automation Workflows</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderCampaignDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              {renderCustomerSegments()}
            </TabPanel>
            <TabPanel px={0}>
              {renderBlueOceanInsights()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Advanced automation workflows with Blue Ocean integration coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default MarketingAutomationWithIntegration;