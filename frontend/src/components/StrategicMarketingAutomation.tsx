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
  CircularProgressLabel
} from '@chakra-ui/react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  type: 'email' | 'social' | 'content' | 'ads';
  reach: number;
  engagement: string;
  conversion: string;
  roi: string;
  blueOceanInsight: string;
}

interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  characteristics: string[];
  valueProposition: string;
  reachability: number;
}

const StrategicMarketingAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Sample data initialization
  useEffect(() => {
    const sampleCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Blue Ocean Email Series - Uncontested Market',
        status: 'active',
        type: 'email',
        reach: 15420,
        engagement: '34.2%',
        conversion: '8.7%',
        roi: '245%',
        blueOceanInsight: 'Targeting non-customers through emotional appeal'
      },
      {
        id: '2',
        name: 'Six Paths Social Campaign',
        status: 'active',
        type: 'social',
        reach: 28750,
        engagement: '18.9%',
        conversion: '5.3%',
        roi: '189%',
        blueOceanInsight: 'Alternative industry solutions messaging'
      },
      {
        id: '3',
        name: 'Buyer Utility Content Hub',
        status: 'paused',
        type: 'content',
        reach: 8940,
        engagement: '45.1%',
        conversion: '12.4%',
        roi: '312%',
        blueOceanInsight: 'Eliminating buyer pain points across experience cycle'
      }
    ];

    const sampleSegments: CustomerSegment[] = [
      {
        id: '1',
        name: 'Non-Customers - Tier 1',
        size: 45000,
        characteristics: ['Price-sensitive', 'Basic needs', 'Underserved by competition'],
        valueProposition: 'Simplified solution at accessible price point',
        reachability: 85
      },
      {
        id: '2',
        name: 'Strategic Group Switchers',
        size: 12500,
        characteristics: ['Premium seekers', 'Feature-rich demand', 'Technology adopters'],
        valueProposition: 'Premium features without complexity',
        reachability: 92
      },
      {
        id: '3',
        name: 'Chain of Buyers - End Users',
        size: 67800,
        characteristics: ['Direct users', 'Experience-focused', 'Word-of-mouth influencers'],
        valueProposition: 'Superior user experience and usability',
        reachability: 78
      }
    ];

    setCampaigns(sampleCampaigns);
    setSegments(sampleSegments);
  }, []);

  const generateBlueOceanCampaign = () => {
    setIsGenerating(true);
    
    // Simulate campaign generation
    setTimeout(() => {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name: `Blue Ocean Campaign - ${Date.now()}`,
        status: 'draft',
        type: 'email',
        reach: Math.floor(Math.random() * 20000) + 5000,
        engagement: `${(Math.random() * 30 + 15).toFixed(1)}%`,
        conversion: `${(Math.random() * 10 + 5).toFixed(1)}%`,
        roi: `${Math.floor(Math.random() * 200 + 150)}%`,
        blueOceanInsight: 'AI-generated strategy based on Six Paths Analysis'
      };
      
      setCampaigns(prev => [...prev, newCampaign]);
      setIsGenerating(false);
    }, 3000);
  };

  const CampaignDashboard = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">📈 Campaign Performance Dashboard</Text>
        <Button 
          colorScheme="blue" 
          onClick={generateBlueOceanCampaign}
          isLoading={isGenerating}
          loadingText="Generating..."
        >
          + Generate Blue Ocean Campaign
        </Button>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Total Reach</StatLabel>
          <StatNumber>{campaigns.reduce((sum, c) => sum + c.reach, 0).toLocaleString()}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Avg Engagement</StatLabel>
          <StatNumber>32.7%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            18.2%
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Avg Conversion</StatLabel>
          <StatNumber>8.8%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            15.8%
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Avg ROI</StatLabel>
          <StatNumber>249%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            34.1%
          </StatHelpText>
        </Stat>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Active Campaigns</Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Campaign</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Reach</Th>
                <Th>Engagement</Th>
                <Th>ROI</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {campaigns.map((campaign) => (
                <Tr key={campaign.id}>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" fontSize="sm">{campaign.name}</Text>
                      <Text fontSize="xs" color="gray.600">{campaign.blueOceanInsight}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      campaign.type === 'email' ? 'blue' :
                      campaign.type === 'social' ? 'purple' :
                      campaign.type === 'content' ? 'green' : 'orange'
                    }>
                      {campaign.type}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      campaign.status === 'active' ? 'green' :
                      campaign.status === 'paused' ? 'yellow' : 'gray'
                    }>
                      {campaign.status}
                    </Badge>
                  </Td>
                  <Td>{campaign.reach.toLocaleString()}</Td>
                  <Td>{campaign.engagement}</Td>
                  <Td>{campaign.roi}</Td>
                  <Td>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        onOpen();
                      }}
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </VStack>
  );

  const CustomerSegmentation = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">👥 Blue Ocean Customer Segmentation</Text>
      
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Segments based on Blue Ocean Strategy Framework</Text>
          <Text fontSize="sm">
            Three tiers of non-customers identified through Six Paths Analysis
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="1fr 1fr 1fr" gap={6}>
        {segments.map((segment) => (
          <Card key={segment.id}>
            <CardHeader>
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold">{segment.name}</Text>
                <Badge colorScheme="blue">{segment.size.toLocaleString()} prospects</Badge>
              </VStack>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Characteristics:</Text>
                  {segment.characteristics.map((char, idx) => (
                    <Badge key={idx} variant="subtle" mr={1} mb={1} fontSize="xs">
                      {char}
                    </Badge>
                  ))}
                </Box>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>Value Proposition:</Text>
                  <Text fontSize="sm" color="gray.600">{segment.valueProposition}</Text>
                </Box>

                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm" fontWeight="semibold">Reachability</Text>
                    <Text fontSize="sm">{segment.reachability}%</Text>
                  </HStack>
                  <Progress value={segment.reachability} colorScheme="green" size="sm" />
                </Box>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );

  const AutomationBuilder = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">🤖 Campaign Automation Builder</Text>
      
      <Card>
        <CardHeader>
          <Text fontWeight="bold">Create New Blue Ocean Campaign</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="1fr 1fr" gap={6}>
            <VStack align="start" spacing={4}>
              <FormControl>
                <FormLabel>Campaign Name</FormLabel>
                <Input placeholder="Enter campaign name..." />
              </FormControl>
              
              <FormControl>
                <FormLabel>Blue Ocean Strategy Element</FormLabel>
                <Select placeholder="Select strategy focus">
                  <option value="six-paths">Six Paths Analysis</option>
                  <option value="non-customers">Non-Customer Focus</option>
                  <option value="buyer-utility">Buyer Utility Map</option>
                  <option value="strategic-sequence">Strategic Sequence</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Target Segment</FormLabel>
                <Select placeholder="Select target segment">
                  {segments.map(segment => (
                    <option key={segment.id} value={segment.id}>{segment.name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Campaign Type</FormLabel>
                <Select placeholder="Select campaign type">
                  <option value="email">Email Marketing</option>
                  <option value="social">Social Media</option>
                  <option value="content">Content Marketing</option>
                  <option value="ads">Digital Advertising</option>
                </Select>
              </FormControl>
            </VStack>

            <VStack align="start" spacing={4}>
              <FormControl>
                <FormLabel>Campaign Message</FormLabel>
                <Textarea 
                  placeholder="Enter your Blue Ocean value proposition message..."
                  rows={4}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Automation Triggers</FormLabel>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Switch />
                    <Text fontSize="sm">Lead magnet downloaded</Text>
                  </HStack>
                  <HStack>
                    <Switch />
                    <Text fontSize="sm">Website behavior trigger</Text>
                  </HStack>
                  <HStack>
                    <Switch />
                    <Text fontSize="sm">Email engagement threshold</Text>
                  </HStack>
                  <HStack>
                    <Switch />
                    <Text fontSize="sm">Social media interaction</Text>
                  </HStack>
                </VStack>
              </FormControl>

              <FormControl>
                <FormLabel>Budget Allocation</FormLabel>
                <Input placeholder="Enter budget amount..." />
              </FormControl>

              <Button colorScheme="blue" size="lg" w="full">
                🚀 Launch Blue Ocean Campaign
              </Button>
            </VStack>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  const ROIAnalytics = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">📊 Blue Ocean ROI Analytics</Text>
      
      <Grid templateColumns="1fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">Campaign Performance Comparison</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Blue Ocean Campaigns</Text>
                <CircularProgress value={75} color="blue.400" size="60px">
                  <CircularProgressLabel fontSize="xs">249%</CircularProgressLabel>
                </CircularProgress>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Traditional Campaigns</Text>
                <CircularProgress value={45} color="gray.400" size="60px">
                  <CircularProgressLabel fontSize="xs">145%</CircularProgressLabel>
                </CircularProgress>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Industry Average</Text>
                <CircularProgress value={35} color="red.400" size="60px">
                  <CircularProgressLabel fontSize="xs">98%</CircularProgressLabel>
                </CircularProgress>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Blue Ocean Impact Metrics</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Non-Customer Conversion</Text>
                  <Text fontSize="sm" fontWeight="bold">67%</Text>
                </HStack>
                <Progress value={67} colorScheme="green" size="sm" />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Market Space Expansion</Text>
                  <Text fontSize="sm" fontWeight="bold">234%</Text>
                </HStack>
                <Progress value={100} colorScheme="blue" size="sm" />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Competitive Differentiation</Text>
                  <Text fontSize="sm" fontWeight="bold">89%</Text>
                </HStack>
                <Progress value={89} colorScheme="purple" size="sm" />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Cost Reduction Efficiency</Text>
                  <Text fontSize="sm" fontWeight="bold">42%</Text>
                </HStack>
                <Progress value={42} colorScheme="orange" size="sm" />
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Strategic Framework Integration</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="1fr 1fr 1fr" gap={4}>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">🎯</Text>
              <Text fontSize="sm" fontWeight="semibold">Six Paths Analysis</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Alternative industries, strategic groups, buyer groups, complementary products, functional-emotional appeal, time trends
              </Text>
              <Badge colorScheme="green">Active</Badge>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">🗺️</Text>
              <Text fontSize="sm" fontWeight="semibold">Buyer Utility Map</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Customer experience cycle optimization across purchase, delivery, use, supplements, maintenance, disposal
              </Text>
              <Badge colorScheme="green">Active</Badge>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">⚖️</Text>
              <Text fontSize="sm" fontWeight="semibold">Strategy Fair</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Internal stakeholder buy-in and strategy validation through transparent communication
              </Text>
              <Badge colorScheme="yellow">Pending</Badge>
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
          <Tab>📈 Dashboard</Tab>
          <Tab>👥 Segmentation</Tab>
          <Tab>🤖 Automation</Tab>
          <Tab>📊 Analytics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CampaignDashboard />
          </TabPanel>
          <TabPanel>
            <CustomerSegmentation />
          </TabPanel>
          <TabPanel>
            <AutomationBuilder />
          </TabPanel>
          <TabPanel>
            <ROIAnalytics />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Campaign Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Campaign Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedCampaign && (
              <VStack spacing={4} align="start">
                <Text fontWeight="bold">{selectedCampaign.name}</Text>
                <Text fontSize="sm" color="gray.600">{selectedCampaign.blueOceanInsight}</Text>
                <Divider />
                <Grid templateColumns="1fr 1fr" gap={4} w="full">
                  <Stat>
                    <StatLabel>Reach</StatLabel>
                    <StatNumber>{selectedCampaign.reach.toLocaleString()}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Engagement</StatLabel>
                    <StatNumber>{selectedCampaign.engagement}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Conversion</StatLabel>
                    <StatNumber>{selectedCampaign.conversion}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>ROI</StatLabel>
                    <StatNumber>{selectedCampaign.roi}</StatNumber>
                  </Stat>
                </Grid>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StrategicMarketingAutomation;