import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Container,
  Grid,
  GridItem,
  Card,
  CardBody,
  Badge,
  Image,
  Flex,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  Divider,
  SimpleGrid,
  useToast,
  keyframes,
  Center,
  Spinner
} from '@chakra-ui/react';
import {
  ViewIcon,
  ViewOffIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  CheckIcon,
  LockIcon,
  EmailIcon,
  PhoneIcon,
  ArrowForwardIcon
} from '@chakra-ui/icons';

interface Feature {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: string;
  image?: string;
  benefits: string[];
  tier: 'lite' | 'pro' | 'enterprise';
}

interface AuthUser {
  email: string;
  name: string;
  tier: 'lite' | 'pro' | 'enterprise';
  companyName?: string;
}

const LandingPage: React.FC<{ onLogin: (user: AuthUser) => void }> = ({ onLogin }) => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose } = useDisclosure();
  const toast = useToast();
  
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, teal.50)',
    'linear(to-br, gray.900, blue.900, purple.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const features: Feature[] = [
    {
      id: 'strategy-frameworks',
      title: 'Strategic Frameworks Suite',
      icon: '📚',
      category: 'Strategy',
      description: 'Complete collection of proven business strategy frameworks including Blue Ocean, Porter\'s Five Forces, VRIO Analysis, and more.',
      benefits: [
        'Interactive Blue Ocean Strategy Canvas',
        'Porter\'s Five Forces Analysis',
        'VRIO Resource Evaluation',
        'Competitive Strategy Mapping',
        'Strategic Positioning Tools'
      ],
      tier: 'lite'
    },
    {
      id: 'sector-value-chains',
      title: 'Industry Value Chain Models',
      icon: '🏭',
      category: 'Operations',
      description: 'Pre-built value chain templates for 12+ industries including banking, professional services, manufacturing, and more.',
      benefits: [
        '12 Industry-Specific Templates',
        'Customizable Activity Mapping',
        'KPI & Metric Tracking',
        'Regulatory Compliance Integration',
        'Cost Driver Analysis'
      ],
      tier: 'pro'
    },
    {
      id: 'financial-integration',
      title: 'Financial System Integration',
      icon: '💰',
      category: 'Finance',
      description: 'Seamlessly connect QuickBooks, Sage, Great Plains, and other accounting systems for comprehensive financial analysis.',
      benefits: [
        'Multi-Platform API Connections',
        'Real-Time Data Synchronization',
        'Automated Financial Reporting',
        'Custom Field Mapping',
        'Audit Trail Management'
      ],
      tier: 'pro'
    },
    {
      id: 'ai-process-logger',
      title: 'AI Process Intelligence',
      icon: '🤖',
      category: 'AI & Analytics',
      description: 'Note-taking style issue logging with AI analysis, pattern recognition, and automated improvement recommendations.',
      benefits: [
        'Natural Language Issue Logging',
        'Voice Recording & Transcription',
        'AI Pattern Recognition',
        'Real-Time Analytics Dashboard',
        'Automated Improvement Suggestions'
      ],
      tier: 'enterprise'
    },
    {
      id: 'business-model-canvas',
      title: 'Interactive Business Model Canvas',
      icon: '🎯',
      category: 'Strategy',
      description: 'Digital version of the world\'s most popular business model development tool with collaborative features.',
      benefits: [
        '9-Section Interactive Canvas',
        'Real-Time Collaboration',
        'Template Library',
        'Export & Sharing Options',
        'Integration with Other Frameworks'
      ],
      tier: 'lite'
    },
    {
      id: 'process-management',
      title: 'BPMN Process Management',
      icon: '🔄',
      category: 'Operations',
      description: 'Professional process mapping and optimization tools with BPMN 2.0 standards and improvement tracking.',
      benefits: [
        'BPMN 2.0 Standard Compliance',
        'Drag-and-Drop Process Designer',
        'Performance Analytics',
        'Bottleneck Identification',
        'Automation Recommendations'
      ],
      tier: 'pro'
    }
  ];

  const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `;

  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleAuth = async () => {
    setIsLoading(true);
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const user: AuthUser = {
      email,
      name: name || 'Demo User',
      tier: 'pro', // Default tier for demo
      companyName: companyName || undefined
    };

    toast({
      title: isSignUp ? 'Account Created!' : 'Welcome Back!',
      description: `Successfully ${isSignUp ? 'registered' : 'signed in'} to Lucidra`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setIsLoading(false);
    onAuthClose();
    onLogin(user);
  };

  const currentFeature = features[currentFeatureIndex];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'lite': return 'green';
      case 'pro': return 'blue';
      case 'enterprise': return 'purple';
      default: return 'gray';
    }
  };

  const renderFeatureShowcase = () => (
    <Box position="relative" w="full" h="500px" overflow="hidden" borderRadius="xl">
      <Card bg={cardBg} h="full" borderWidth="2px" borderColor={borderColor}>
        <CardBody p={8}>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} h="full">
            <VStack align="start" justify="center" spacing={6}>
              <HStack>
                <Text fontSize="4xl" animation={`${float} 3s ease-in-out infinite`}>
                  {currentFeature.icon}
                </Text>
                <VStack align="start" spacing={1}>
                  <Badge colorScheme={getTierColor(currentFeature.tier)} variant="solid" fontSize="xs">
                    {currentFeature.tier.toUpperCase()}
                  </Badge>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                    {currentFeature.category}
                  </Text>
                </VStack>
              </HStack>

              <VStack align="start" spacing={4}>
                <Text fontSize="3xl" fontWeight="bold" lineHeight="short">
                  {currentFeature.title}
                </Text>
                <Text fontSize="lg" color="gray.600" lineHeight="tall">
                  {currentFeature.description}
                </Text>
              </VStack>

              <VStack align="start" spacing={3} w="full">
                <Text fontSize="md" fontWeight="semibold">Key Benefits:</Text>
                {currentFeature.benefits.map((benefit, index) => (
                  <HStack key={index} align="start" spacing={3}>
                    <CheckIcon color="green.500" mt={1} />
                    <Text fontSize="sm" color="gray.700">{benefit}</Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>

            <Center>
              <Box
                w="300px"
                h="300px"
                bg="gradient-to-br from-blue-100 to-purple-100"
                borderRadius="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                overflow="hidden"
              >
                <Text fontSize="8xl" opacity={0.3}>
                  {currentFeature.icon}
                </Text>
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="80%"
                  h="80%"
                  borderRadius="xl"
                  bg="whiteAlpha.900"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backdropFilter="blur(10px)"
                >
                  <VStack spacing={2}>
                    <Text fontSize="2xl">{currentFeature.icon}</Text>
                    <Text fontSize="sm" fontWeight="bold" textAlign="center">
                      Interactive Demo
                    </Text>
                    <Text fontSize="xs" color="gray.600" textAlign="center">
                      Sign in to explore
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </Center>
          </Grid>
        </CardBody>
      </Card>

      {/* Navigation Dots */}
      <HStack
        position="absolute"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        spacing={2}
      >
        {features.map((_, index) => (
          <Box
            key={index}
            w={3}
            h={3}
            borderRadius="full"
            bg={index === currentFeatureIndex ? 'blue.500' : 'gray.300'}
            cursor="pointer"
            onClick={() => setCurrentFeatureIndex(index)}
            transition="all 0.3s"
          />
        ))}
      </HStack>

      {/* Navigation Arrows */}
      <IconButton
        aria-label="Previous feature"
        icon={<ChevronLeftIcon />}
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        colorScheme="blue"
        variant="ghost"
        size="lg"
        onClick={() => setCurrentFeatureIndex((prev) => (prev - 1 + features.length) % features.length)}
      />
      <IconButton
        aria-label="Next feature"
        icon={<ChevronRightIcon />}
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        colorScheme="blue"
        variant="ghost"
        size="lg"
        onClick={() => setCurrentFeatureIndex((prev) => (prev + 1) % features.length)}
      />
    </Box>
  );

  const renderAuthModal = () => (
    <Modal isOpen={isAuthOpen} onClose={onAuthClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="2xl" fontWeight="bold">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="enclosed" onChange={(index) => setIsSignUp(index === 1)}>
            <TabList>
              <Tab>Sign In</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0} pt={6}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel p={0} pt={6}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Company Name (Optional)</FormLabel>
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your Company"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Alert status="info" mt={6} borderRadius="md">
            <AlertIcon />
            <VStack align="start" spacing={1} w="full">
              <Text fontSize="sm" fontWeight="semibold">Demo Access Available</Text>
              <Text fontSize="xs">
                Use any email and password to access the full platform demo
              </Text>
            </VStack>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onAuthClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleAuth}
            isLoading={isLoading}
            loadingText={isSignUp ? 'Creating Account...' : 'Signing In...'}
            isDisabled={!email || !password}
            rightIcon={<ArrowForwardIcon />}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      {/* Hero Section */}
      <Container maxW="7xl" pt={20} pb={10}>
        <VStack spacing={12}>
          {/* Header */}
          <VStack spacing={6} textAlign="center" animation={`${fadeIn} 1s ease-out`}>
            <HStack spacing={4}>
              <Text fontSize="6xl" animation={`${float} 3s ease-in-out infinite`}>
                🧠
              </Text>
              <VStack align="start" spacing={0}>
                <Text fontSize="5xl" fontWeight="bold" bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text">
                  Lucidra
                </Text>
                <Text fontSize="lg" color="gray.600" fontWeight="medium">
                  Strategic Intelligence Platform
                </Text>
              </VStack>
            </HStack>

            <Text fontSize="2xl" color="gray.700" maxW="4xl" lineHeight="tall">
              Transform your business strategy with AI-powered frameworks, industry-specific value chains, 
              and comprehensive financial integration
            </Text>

            <HStack spacing={4}>
              <Button
                size="lg"
                colorScheme="blue"
                rightIcon={<ArrowForwardIcon />}
                onClick={onAuthOpen}
                shadow="lg"
                _hover={{ shadow: 'xl', transform: 'translateY(-2px)' }}
                transition="all 0.3s"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="blue"
                leftIcon={<ViewIcon />}
              >
                Watch Demo
              </Button>
            </HStack>

            <HStack spacing={8} pt={4}>
              <HStack>
                <StarIcon color="yellow.400" />
                <Text fontSize="sm" color="gray.600">
                  <strong>4.9/5</strong> user rating
                </Text>
              </HStack>
              <HStack>
                <CheckIcon color="green.500" />
                <Text fontSize="sm" color="gray.600">
                  <strong>500+</strong> companies trust us
                </Text>
              </HStack>
              <HStack>
                <LockIcon color="blue.500" />
                <Text fontSize="sm" color="gray.600">
                  <strong>Enterprise</strong> security
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Feature Showcase */}
          <Box w="full" animation={`${fadeIn} 1s ease-out 0.5s both`}>
            {renderFeatureShowcase()}
          </Box>

          {/* Tier Comparison */}
          <VStack spacing={8} w="full" animation={`${fadeIn} 1s ease-out 1s both`}>
            <VStack spacing={4} textAlign="center">
              <Text fontSize="3xl" fontWeight="bold">
                Choose Your Strategic Advantage
              </Text>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                From startups to enterprises, we have the right tools for your strategic journey
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {['lite', 'pro', 'enterprise'].map((tier) => (
                <Card key={tier} bg={cardBg} borderWidth="2px" borderColor={tier === 'pro' ? 'blue.300' : borderColor}>
                  <CardBody p={8}>
                    <VStack spacing={6} align="start">
                      <HStack justify="space-between" w="full">
                        <Badge colorScheme={getTierColor(tier)} variant="solid" fontSize="sm" px={3} py={1}>
                          {tier.toUpperCase()}
                        </Badge>
                        {tier === 'pro' && (
                          <Badge colorScheme="orange" variant="solid" fontSize="xs">
                            MOST POPULAR
                          </Badge>
                        )}
                      </HStack>

                      <VStack align="start" spacing={2}>
                        <Text fontSize="3xl" fontWeight="bold">
                          {tier === 'lite' ? '$29' : tier === 'pro' ? '$99' : 'Custom'}
                          {tier !== 'enterprise' && <Text as="span" fontSize="lg" color="gray.500">/month</Text>}
                        </Text>
                        <Text color="gray.600">
                          {tier === 'lite' && 'Perfect for startups and small teams'}
                          {tier === 'pro' && 'Ideal for growing businesses'}
                          {tier === 'enterprise' && 'Built for large organizations'}
                        </Text>
                      </VStack>

                      <VStack align="start" spacing={3} w="full">
                        <Text fontWeight="semibold">Features included:</Text>
                        {features
                          .filter(f => f.tier === tier || (tier === 'pro' && f.tier === 'lite') || (tier === 'enterprise'))
                          .map((feature) => (
                            <HStack key={feature.id} align="start" spacing={3}>
                              <CheckIcon color="green.500" mt={1} />
                              <Text fontSize="sm">{feature.title}</Text>
                            </HStack>
                          ))}
                      </VStack>

                      <Button
                        w="full"
                        colorScheme={tier === 'pro' ? 'blue' : 'gray'}
                        variant={tier === 'pro' ? 'solid' : 'outline'}
                        onClick={onAuthOpen}
                        size="lg"
                      >
                        {tier === 'enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>

          {/* CTA Section */}
          <Card bg={cardBg} w="full" borderWidth="2px" borderColor="blue.200" animation={`${fadeIn} 1s ease-out 1.5s both`}>
            <CardBody p={12}>
              <VStack spacing={6} textAlign="center">
                <Text fontSize="3xl" fontWeight="bold">
                  Ready to Transform Your Strategy?
                </Text>
                <Text fontSize="lg" color="gray.600" maxW="2xl">
                  Join hundreds of companies already using Lucidra to drive strategic success
                </Text>
                <HStack spacing={4}>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    rightIcon={<ArrowForwardIcon />}
                    onClick={onAuthOpen}
                  >
                    Start Your Free Trial
                  </Button>
                  <HStack spacing={2} color="gray.500">
                    <EmailIcon />
                    <Text fontSize="sm">No credit card required</Text>
                  </HStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>

      {renderAuthModal()}
    </Box>
  );
};

export default LandingPage;