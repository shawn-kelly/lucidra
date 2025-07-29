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
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

interface TutorialVideo {
  id: string;
  title: string;
  description: string;
  category: 'strategy' | 'marketing' | 'hr' | 'frameworks' | 'getting-started';
  duration: string;
  framework?: string;
  useCase: string;
  script: string;
  status: 'planning' | 'recording' | 'editing' | 'ready';
  thumbnailUrl?: string;
  videoUrl?: string;
  createdAt: string;
  tier: 'lite' | 'pro' | 'enterprise';
}

interface VideoRequest {
  id: string;
  organizationName: string;
  industry: string;
  specificTopic: string;
  framework: string;
  useCase: string;
  customRequirements: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'requested' | 'approved' | 'in_production' | 'completed';
  requestedBy: string;
  estimatedDelivery: string;
}

// Comprehensive tutorial video library
const TUTORIAL_VIDEOS: TutorialVideo[] = [
  // Getting Started Series
  {
    id: 'getting-started-001',
    title: 'Lucidra Platform Overview: Your Strategic Intelligence Hub',
    description: 'Complete walkthrough of Lucidra\'s integrated approach to strategy, marketing, and HR',
    category: 'getting-started',
    duration: '12:30',
    useCase: 'Platform orientation for new teams',
    script: 'Welcome to Lucidra - your comprehensive strategic intelligence platform. In this video, we\'ll explore how Lucidra integrates strategy development, marketing automation, and HR management into one powerful ecosystem...',
    status: 'ready',
    tier: 'lite',
    createdAt: new Date().toISOString()
  },
  {
    id: 'getting-started-002',
    title: 'Setting Up Your Organization Profile for Maximum Impact',
    description: 'Step-by-step guide to configuring your business profile for optimal framework recommendations',
    category: 'getting-started',
    duration: '8:45',
    useCase: 'Initial setup and configuration',
    script: 'Let\'s set up your organization profile to unlock Lucidra\'s full potential. We\'ll walk through industry selection, growth stage identification, and strategic priorities...',
    status: 'ready',
    tier: 'lite',
    createdAt: new Date().toISOString()
  },

  // Strategy Framework Demonstrations
  {
    id: 'strategy-001',
    title: 'Blue Ocean Strategy: Creating Uncontested Market Space',
    description: 'Live demonstration of using Lucidra\'s Blue Ocean tools to identify new market opportunities',
    category: 'strategy',
    framework: 'Blue Ocean Strategy',
    duration: '18:20',
    useCase: 'SaaS company entering competitive market',
    script: 'Today we\'re working with TechFlow Solutions, a SaaS company looking to break into the competitive project management space. Let\'s use Blue Ocean Strategy to find their uncontested market...',
    status: 'ready',
    tier: 'pro',
    createdAt: new Date().toISOString()
  },
  {
    id: 'strategy-002',
    title: 'Porter\'s Five Forces: Comprehensive Industry Analysis',
    description: 'Real-world application of Five Forces analysis for strategic decision making',
    category: 'strategy',
    framework: 'Porter Five Forces',
    duration: '15:45',
    useCase: 'Manufacturing company assessing market entry',
    script: 'We\'re analyzing the electric vehicle battery market for GreenTech Industries. Using Porter\'s Five Forces, we\'ll assess industry attractiveness and competitive dynamics...',
    status: 'ready',
    tier: 'lite',
    createdAt: new Date().toISOString()
  },
  {
    id: 'strategy-003',
    title: 'VRIO Analysis: Identifying Sustainable Competitive Advantages',
    description: 'Complete VRIO framework application for resource-based strategy development',
    category: 'strategy',
    framework: 'VRIO Analysis',
    duration: '14:30',
    useCase: 'Consulting firm evaluating core competencies',
    script: 'Strategic Advisors Inc. wants to understand their sustainable competitive advantages. We\'ll use VRIO analysis to evaluate their resources and capabilities...',
    status: 'ready',
    tier: 'pro',
    createdAt: new Date().toISOString()
  },

  // Marketing Automation Series
  {
    id: 'marketing-001',
    title: 'Integrated Campaign Creation: From Strategy to Execution',
    description: 'Building marketing campaigns that align with strategic frameworks and business goals',
    category: 'marketing',
    duration: '22:15',
    useCase: 'B2B software company launching new product',
    script: 'CloudSync is launching their new integration platform. We\'ll create a comprehensive marketing campaign using Lucidra\'s integrated approach, connecting strategy insights to tactical execution...',
    status: 'ready',
    tier: 'pro',
    createdAt: new Date().toISOString()
  },
  {
    id: 'marketing-002',
    title: 'Lead Scoring and Nurturing: Strategic Customer Journey Mapping',
    description: 'Advanced lead management using strategic customer segmentation',
    category: 'marketing',
    duration: '16:40',
    useCase: 'Enterprise software vendor optimizing sales pipeline',
    script: 'DataFlow Enterprise needs to improve lead quality and conversion. We\'ll set up strategic lead scoring and nurturing workflows based on their Blue Ocean insights...',
    status: 'ready',
    tier: 'pro',
    createdAt: new Date().toISOString()
  },
  {
    id: 'marketing-003',
    title: 'Marketing Analytics: Measuring Strategic Impact',
    description: 'Connecting marketing metrics to strategic objectives and business outcomes',
    category: 'marketing',
    duration: '19:25',
    useCase: 'Growth-stage startup measuring marketing ROI',
    script: 'StartupFlow wants to understand how their marketing efforts support strategic goals. We\'ll configure analytics dashboards that connect tactical metrics to strategic outcomes...',
    status: 'ready',
    tier: 'enterprise',
    createdAt: new Date().toISOString()
  },

  // HR Management Series
  {
    id: 'hr-001',
    title: 'Strategic Workforce Planning: Aligning Talent with Strategy',
    description: 'Complete workforce planning process using strategic insights and market analysis',
    category: 'hr',
    duration: '20:30',
    useCase: 'Technology company scaling operations',
    script: 'InnovateTech is scaling from 50 to 200 employees. We\'ll use strategic workforce planning to identify skill gaps, create job descriptions, and plan hiring sequences...',
    status: 'ready',
    tier: 'pro',
    createdAt: new Date().toISOString()
  },
  {
    id: 'hr-002',
    title: 'Competency-Based Job Description Generator',
    description: 'Creating strategic job descriptions that align with competitive advantages',
    category: 'hr',
    duration: '13:15',
    useCase: 'Consulting firm hiring senior strategists',
    script: 'Strategy Partners needs to hire senior consultants who can deliver their unique value proposition. We\'ll create competency-based job descriptions using VRIO insights...',
    status: 'ready',
    tier: 'pro',
    createdAt: new Date().toISOString()
  },
  {
    id: 'hr-003',
    title: 'Training Needs Analysis: Building Strategic Capabilities',
    description: 'Identifying and planning training programs based on strategic requirements',
    category: 'hr',
    duration: '17:50',
    useCase: 'Manufacturing company implementing digital transformation',
    script: 'ManuTech is undergoing digital transformation. We\'ll conduct training needs analysis and create development programs aligned with their strategic objectives...',
    status: 'ready',
    tier: 'enterprise',
    createdAt: new Date().toISOString()
  },

  // Framework-Specific Tutorials
  {
    id: 'framework-001',
    title: 'Integrated Framework Orchestration: Strategy to Execution',
    description: 'Using multiple frameworks together for comprehensive strategic planning',
    category: 'frameworks',
    duration: '25:40',
    useCase: 'Multi-national corporation strategic planning',
    script: 'GlobalCorp needs a comprehensive strategic plan. We\'ll use integrated framework orchestration, combining Five Forces, VRIO, Blue Ocean, and execution frameworks...',
    status: 'ready',
    tier: 'enterprise',
    createdAt: new Date().toISOString()
  }
];

const TutorialVideoSystem: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [videoRequests, setVideoRequests] = useState<VideoRequest[]>([]);
  const [currentVideo, setCurrentVideo] = useState<TutorialVideo | null>(null);
  
  const { isOpen: isRequestOpen, onOpen: onRequestOpen, onClose: onRequestClose } = useDisclosure();
  const { isOpen: isVideoOpen, onOpen: onVideoOpen, onClose: onVideoClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');

  const filteredVideos = TUTORIAL_VIDEOS.filter(video => {
    const categoryMatch = selectedCategory === 'all' || video.category === selectedCategory;
    const frameworkMatch = selectedFramework === 'all' || video.framework === selectedFramework;
    const tierAccess = currentTier === 'enterprise' || 
                      (currentTier === 'pro' && video.tier !== 'enterprise') ||
                      (currentTier === 'lite' && video.tier === 'lite');
    return categoryMatch && frameworkMatch && tierAccess;
  });

  const handleVideoRequest = () => {
    const newRequest: VideoRequest = {
      id: `req_${Date.now()}`,
      organizationName: '',
      industry: '',
      specificTopic: '',
      framework: '',
      useCase: '',
      customRequirements: '',
      urgency: 'medium',
      status: 'requested',
      requestedBy: 'Current User',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    setVideoRequests(prev => [...prev, newRequest]);
    onRequestClose();
  };

  const watchVideo = (video: TutorialVideo) => {
    setCurrentVideo(video);
    onVideoOpen();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'getting-started': return '🚀';
      case 'strategy': return '🎯';
      case 'marketing': return '📈';
      case 'hr': return '👥';
      case 'frameworks': return '🔧';
      default: return '📹';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'lite': return 'teal';
      case 'pro': return 'purple';
      case 'enterprise': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">📚</Text>
            <Text fontSize="3xl" fontWeight="bold">Tutorial Video Library</Text>
          </HStack>
          <Text color="gray.600" mb={6}>
            Learn how to use Lucidra's integrated platform with step-by-step video demonstrations
          </Text>
        </Box>

        {/* Stats and Overview */}
        <Card bg={infoBg}>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold">{TUTORIAL_VIDEOS.length}</Text>
                <Text fontSize="sm" textAlign="center">Total Videos</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold">{filteredVideos.length}</Text>
                <Text fontSize="sm" textAlign="center">Available to You</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold">5</Text>
                <Text fontSize="sm" textAlign="center">Framework Categories</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="bold">24/7</Text>
                <Text fontSize="sm" textAlign="center">Access Available</Text>
              </VStack>
            </Grid>
          </CardBody>
        </Card>

        {/* Filters */}
        <Card bg={cardBg}>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="all">All Categories</option>
                  <option value="getting-started">Getting Started</option>
                  <option value="strategy">Strategy Frameworks</option>
                  <option value="marketing">Marketing Automation</option>
                  <option value="hr">HR Management</option>
                  <option value="frameworks">Framework Integration</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Framework</FormLabel>
                <Select value={selectedFramework} onChange={(e) => setSelectedFramework(e.target.value)}>
                  <option value="all">All Frameworks</option>
                  <option value="Blue Ocean Strategy">Blue Ocean Strategy</option>
                  <option value="Porter Five Forces">Porter Five Forces</option>
                  <option value="VRIO Analysis">VRIO Analysis</option>
                  <option value="Value Chain">Value Chain Analysis</option>
                  <option value="SWOT">SWOT Analysis</option>
                </Select>
              </FormControl>

              <VStack justify="end">
                <Button colorScheme="blue" w="full" onClick={onRequestOpen}>
                  📝 Request Custom Video
                </Button>
              </VStack>
            </Grid>
          </CardBody>
        </Card>

        {/* Video Library */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {filteredVideos.map(video => (
            <Card 
              key={video.id} 
              bg={cardBg} 
              _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <CardHeader pb={2}>
                <VStack align="start" spacing={2}>
                  <HStack justify="space-between" w="full">
                    <Badge colorScheme={getTierBadgeColor(video.tier)} variant="subtle">
                      {video.tier.toUpperCase()}
                    </Badge>
                    <Text fontSize="sm" color="gray.500">{video.duration}</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="lg">{getCategoryIcon(video.category)}</Text>
                    <Text fontSize="md" fontWeight="bold" noOfLines={2}>
                      {video.title}
                    </Text>
                  </HStack>
                </VStack>
              </CardHeader>
              <CardBody pt={0}>
                <VStack align="start" spacing={3}>
                  <Text fontSize="sm" color="gray.600" noOfLines={3}>
                    {video.description}
                  </Text>
                  
                  {video.framework && (
                    <Badge colorScheme="purple" variant="outline" size="sm">
                      {video.framework}
                    </Badge>
                  )}
                  
                  <Text fontSize="xs" color="gray.500" fontStyle="italic">
                    Use Case: {video.useCase}
                  </Text>
                  
                  <Button 
                    colorScheme="blue" 
                    size="sm" 
                    w="full"
                    onClick={() => watchVideo(video)}
                  >
                    ▶️ Watch Tutorial
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>

        {/* Custom Video Requests */}
        {videoRequests.length > 0 && (
          <Card bg={cardBg}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold">Your Video Requests</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {videoRequests.map(request => (
                  <HStack key={request.id} justify="space-between" p={3} bg={infoBg} borderRadius="md">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">{request.specificTopic}</Text>
                      <Text fontSize="xs" color="gray.600">{request.useCase}</Text>
                    </VStack>
                    <Badge colorScheme="orange">{request.status}</Badge>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>

      {/* Video Request Modal */}
      <Modal isOpen={isRequestOpen} onClose={onRequestClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Custom Tutorial Video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  Tell us about your specific use case and we'll create a custom tutorial video for your organization.
                </Text>
              </Alert>

              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <FormControl>
                  <FormLabel>Organization Name</FormLabel>
                  <Input placeholder="Your company name" />
                </FormControl>

                <FormControl>
                  <FormLabel>Industry</FormLabel>
                  <Select placeholder="Select industry">
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>Specific Topic/Challenge</FormLabel>
                <Input placeholder="What specific topic would you like covered?" />
              </FormControl>

              <FormControl>
                <FormLabel>Framework Focus</FormLabel>
                <Select placeholder="Primary framework to demonstrate">
                  <option value="blue-ocean">Blue Ocean Strategy</option>
                  <option value="porter-forces">Porter Five Forces</option>
                  <option value="vrio">VRIO Analysis</option>
                  <option value="value-chain">Value Chain Analysis</option>
                  <option value="integrated">Multiple Frameworks</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Use Case Description</FormLabel>
                <Textarea 
                  placeholder="Describe your specific situation and what you want to achieve..."
                  rows={4}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Custom Requirements</FormLabel>
                <Textarea 
                  placeholder="Any specific requirements or areas of focus for the video..."
                  rows={3}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Urgency</FormLabel>
                <Select defaultValue="medium">
                  <option value="low">Low (2-3 weeks)</option>
                  <option value="medium">Medium (1 week)</option>
                  <option value="high">High (3-5 days)</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onRequestClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleVideoRequest}>
              Submit Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Video Player Modal */}
      <Modal isOpen={isVideoOpen} onClose={onVideoClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentVideo?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentVideo && (
              <VStack spacing={4} align="stretch">
                {/* Video Player Placeholder */}
                <Box 
                  bg="gray.900" 
                  borderRadius="lg" 
                  p={8} 
                  textAlign="center"
                  minH="400px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <VStack spacing={4}>
                    <Text fontSize="6xl">▶️</Text>
                    <Text color="white" fontSize="lg">Video Player</Text>
                    <Text color="gray.300" fontSize="sm">Duration: {currentVideo.duration}</Text>
                    <Button colorScheme="blue" size="lg">
                      ▶️ Play Tutorial
                    </Button>
                  </VStack>
                </Box>

                {/* Video Details */}
                <Tabs>
                  <TabList>
                    <Tab>Description</Tab>
                    <Tab>Script Preview</Tab>
                    <Tab>Use Case</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Text>{currentVideo.description}</Text>
                    </TabPanel>
                    <TabPanel>
                      <Text fontSize="sm" color="gray.600" fontStyle="italic">
                        {currentVideo.script}
                      </Text>
                    </TabPanel>
                    <TabPanel>
                      <Text fontWeight="semibold" mb={2}>Use Case:</Text>
                      <Text>{currentVideo.useCase}</Text>
                      {currentVideo.framework && (
                        <>
                          <Text fontWeight="semibold" mt={4} mb={2}>Framework:</Text>
                          <Badge colorScheme="purple">{currentVideo.framework}</Badge>
                        </>
                      )}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onVideoClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TutorialVideoSystem;