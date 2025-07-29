import React, { useState } from 'react';
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
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Grid,
  GridItem,
  Divider,
  Image,
  Code,
  Kbd,
  Progress,
  Tooltip,
  IconButton
} from '@chakra-ui/react';
import { 
  SearchIcon, 
  DownloadIcon, 
  QuestionIcon,
  InfoIcon,
  CheckIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  StarIcon,
  TimeIcon,
  ViewIcon,
  EditIcon
} from '@chakra-ui/icons';

interface ManualSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: 'getting-started' | 'core-features' | 'advanced' | 'integrations' | 'troubleshooting';
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  subsections: ManualSubsection[];
}

interface ManualSubsection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'steps' | 'tips' | 'warning' | 'code' | 'table';
  steps?: string[];
  tips?: string[];
  code?: string;
  tableData?: any[];
  images?: string[];
}

const PlatformManual: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { isOpen: isPrintOpen, onOpen: onPrintOpen, onClose: onPrintClose } = useDisclosure();
  const { isOpen: isNavOpen, onOpen: onNavOpen, onClose: onNavClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const manualSections: ManualSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started Guide',
      icon: '🚀',
      description: 'Essential steps to begin using Lucidra effectively',
      category: 'getting-started',
      estimatedTime: '15 minutes',
      difficulty: 'beginner',
      subsections: [
        {
          id: 'welcome',
          title: 'Welcome to Lucidra',
          type: 'text',
          content: `Lucidra is a comprehensive strategic intelligence platform designed to help organizations analyze, plan, and execute business strategies. This manual will guide you through all platform features and help you maximize your strategic potential.

**What you'll learn:**
- How to navigate the platform
- Setting up your business profile
- Using core strategic frameworks
- Integrating financial data
- Generating actionable insights`
        },
        {
          id: 'first-login',
          title: 'Your First Login',
          type: 'steps',
          content: 'Follow these steps to get started with Lucidra:',
          steps: [
            'Access the platform at your organization\'s Lucidra URL',
            'Enter your credentials provided by your administrator',
            'Complete the welcome tutorial (optional but recommended)',
            'Set up your business profile using the guided wizard',
            'Explore the dashboard to familiarize yourself with the interface',
            'Join the onboarding webinar (check your email for details)'
          ]
        },
        {
          id: 'navigation-basics',
          title: 'Platform Navigation',
          type: 'text',
          content: `**Main Navigation Areas:**

🏠 **Dashboard** - Your central hub showing key metrics and recent activity
📚 **Strategy Frameworks** - Access to Porter's Five Forces, Blue Ocean, VRIO, and more
🎯 **Business Model Canvas** - Interactive 9-section business model development
💰 **Financial Integration** - Connect accounting systems and analyze financial data
🔄 **Process Management** - Map, analyze, and improve business processes
📊 **Analytics & Reports** - Generate insights and track performance
👥 **Team Collaboration** - Share insights and collaborate on strategies
⚙️ **Settings** - Configure your account and platform preferences`
        }
      ]
    },
    
    {
      id: 'business-model-canvas',
      title: 'Business Model Canvas',
      icon: '🎯',
      description: 'Complete guide to using the interactive Business Model Canvas',
      category: 'core-features',
      estimatedTime: '30 minutes',
      difficulty: 'beginner',
      subsections: [
        {
          id: 'canvas-overview',
          title: 'Canvas Overview',
          type: 'text',
          content: `The Business Model Canvas is a strategic management tool that helps you describe, design, challenge, and pivot your business model. Lucidra's interactive version includes:

**9 Building Blocks:**
1. **Key Partners** 🤝 - Strategic alliances and supplier networks
2. **Key Activities** ⚡ - Most important activities for your value proposition
3. **Key Resources** 🎯 - Assets required to make your business model work
4. **Value Propositions** 💎 - Products and services that create value
5. **Customer Relationships** ❤️ - Types of relationships with customer segments
6. **Channels** 📢 - How you reach and communicate with customers
7. **Customer Segments** 👥 - Different groups you aim to reach
8. **Cost Structure** 💰 - All costs incurred to operate your business model
9. **Revenue Streams** 💵 - Cash generated from each customer segment`
        },
        {
          id: 'canvas-completion',
          title: 'Completing Your Canvas',
          type: 'steps',
          content: 'Follow this systematic approach to complete your Business Model Canvas:',
          steps: [
            'Start with Customer Segments - Define who you\'re serving',
            'Identify Value Propositions - What problems are you solving?',
            'Map Channels - How will customers discover and purchase?',
            'Define Customer Relationships - What relationship type for each segment?',
            'List Revenue Streams - How does each segment pay you?',
            'Identify Key Resources - What assets do you need?',
            'Define Key Activities - What key things must you do?',
            'Map Key Partners - Who can help you succeed?',
            'Outline Cost Structure - What are your main costs?'
          ]
        },
        {
          id: 'canvas-tips',
          title: 'Best Practices',
          type: 'tips',
          content: 'Expert tips for maximizing your Business Model Canvas effectiveness:',
          tips: [
            'Use sticky notes approach - start with many ideas, then refine',
            'Be specific - avoid generic terms like "good customer service"',
            'Think customer-first - always start with customer segments',
            'Validate assumptions - test your hypotheses with real customers',
            'Keep it visual - use colors and icons to make connections clear',
            'Review regularly - business models evolve with market changes',
            'Share with team - get diverse perspectives on your model',
            'Connect to other frameworks - link to SWOT, Porter\'s Five Forces'
          ]
        }
      ]
    },

    {
      id: 'strategy-frameworks',
      title: 'Strategy Frameworks Guide',
      icon: '📚',
      description: 'Master all strategic analysis frameworks available in Lucidra',
      category: 'core-features',
      estimatedTime: '45 minutes',
      difficulty: 'intermediate',
      prerequisites: ['Business Model Canvas basics'],
      subsections: [
        {
          id: 'porters-five-forces',
          title: 'Porter\'s Five Forces Analysis',
          type: 'text',
          content: `**Understanding Competitive Forces**

Porter's Five Forces helps you analyze the competitive environment and industry attractiveness:

**1. Competitive Rivalry** 🥊
- Number and strength of competitors
- Industry growth rate
- Product differentiation
- Switching costs

**2. Supplier Power** 🏭
- Number of suppliers
- Switching costs
- Supplier concentration
- Forward integration potential

**3. Buyer Power** 👥
- Buyer concentration vs. firm concentration
- Buyer volume
- Buyer switching costs
- Price sensitivity

**4. Threat of Substitutes** 🔄
- Substitute performance
- Cost of change
- Buyer propensity to substitute

**5. Threat of New Entrants** 🚪
- Barriers to entry
- Expected retaliation
- Capital requirements
- Government regulations`
        },
        {
          id: 'blue-ocean-strategy',
          title: 'Blue Ocean Strategy Canvas',
          type: 'text',
          content: `**Creating Uncontested Market Space**

Blue Ocean Strategy helps you break out of competitive markets by creating new demand:

**Four Actions Framework:**

**Eliminate** ❌
- Which factors that the industry takes for granted should be eliminated?
- What factors that companies compete on should be reduced well below the industry standard?

**Reduce** ⬇️
- Which factors should be reduced well below the industry's standard?
- What factors that companies compete on are unnecessary?

**Raise** ⬆️
- Which factors should be raised well above the industry's standard?
- What factors that companies compete on should be increased?

**Create** ✨
- Which factors should be created that the industry has never offered?
- What new factors should be introduced to generate new value?`
        },
        {
          id: 'vrio-analysis',
          title: 'VRIO Resource Analysis',
          type: 'table',
          content: 'VRIO Analysis evaluates your resources for competitive advantage:',
          tableData: [
            {
              question: 'Valuable?',
              description: 'Does the resource enable the firm to exploit opportunities or neutralize threats?',
              implication: 'If No: Competitive Disadvantage'
            },
            {
              question: 'Rare?',
              description: 'Is the resource currently controlled by only a small number of competing firms?',
              implication: 'If No: Competitive Parity'
            },
            {
              question: 'Inimitable?',
              description: 'Do firms without the resource face a cost disadvantage in obtaining it?',
              implication: 'If No: Temporary Competitive Advantage'
            },
            {
              question: 'Organized?',
              description: 'Are the firm\'s other policies organized to support exploitation of the resource?',
              implication: 'If Yes: Sustained Competitive Advantage'
            }
          ]
        }
      ]
    },

    {
      id: 'financial-integration',
      title: 'Financial System Integration',
      icon: '💰',
      description: 'Connect and analyze financial data from multiple sources',
      category: 'integrations',
      estimatedTime: '25 minutes',
      difficulty: 'intermediate',
      subsections: [
        {
          id: 'supported-systems',
          title: 'Supported Accounting Systems',
          type: 'text',
          content: `**Direct API Integrations:**

**QuickBooks Online** 💼
- Real-time data synchronization
- Multi-company support
- Custom field mapping
- Automated transaction import

**Sage 50/100/300** 🌿
- Comprehensive data extraction
- Multi-currency support
- Advanced reporting capabilities
- Automated backup scheduling

**Microsoft Dynamics GP** 🏢
- Enterprise-level integration
- Complex data structure support
- Security compliance features
- Detailed audit trails

**Xero** 🔵
- Cloud-based synchronization
- Bank feed integration
- Third-party app connectivity
- Mobile accessibility`
        },
        {
          id: 'connection-setup',
          title: 'Setting Up Connections',
          type: 'steps',
          content: 'Follow these steps to connect your accounting system:',
          steps: [
            'Navigate to Financial Integration → System Connections',
            'Select your accounting system from the available options',
            'Click "Connect" and you\'ll be redirected to authorize access',
            'Select which company database to connect (if multiple available)',
            'Choose your sync frequency (real-time, hourly, daily, weekly)',
            'Select which data types to synchronize',
            'Test the connection and verify data appears correctly',
            'Set up automated sync schedules and notifications'
          ]
        },
        {
          id: 'file-uploads',
          title: 'Manual File Uploads',
          type: 'text',
          content: `**Supported File Formats:**

**CSV Files** 📄
- Chart of accounts
- General ledger transactions
- Trial balance reports
- Custom formatted exports

**Excel Files** 📊
- .XLS and .XLSX formats
- Multiple sheet support
- Template downloads available
- Data validation tools

**PDF Reports** 📋
- Financial statement extraction
- OCR text recognition
- Manual data verification
- Automated categorization

**Upload Process:**
1. Drag and drop files or browse to select
2. AI automatically detects file type and structure
3. Review and confirm field mappings
4. Process and validate data
5. Files appear in your financial data library`
        }
      ]
    },

    {
      id: 'process-management',
      title: 'Process Management & AI Logger',
      icon: '🔄',
      description: 'Map processes and use AI to track and resolve issues',
      category: 'core-features',
      estimatedTime: '35 minutes',
      difficulty: 'intermediate',
      subsections: [
        {
          id: 'process-mapping',
          title: 'Creating Process Maps',
          type: 'steps',
          content: 'Build comprehensive process maps using BPMN standards:',
          steps: [
            'Navigate to Process Management → Create New Process',
            'Choose a process template or start from scratch',
            'Add process start events (what triggers the process)',
            'Map activities using drag-and-drop BPMN elements',
            'Connect activities with sequence flows',
            'Add decision gateways where processes branch',
            'Define end events (successful completion, errors, etc.)',
            'Assign roles and responsibilities to each activity',
            'Add time estimates and resource requirements',
            'Validate the process flow and test scenarios'
          ]
        },
        {
          id: 'ai-issue-logging',
          title: 'AI-Powered Issue Logging',
          type: 'text',
          content: `**Note-Taking Style Problem Recording**

The AI Process Logger allows you to quickly record issues without disrupting your workflow:

**Quick Logging Features:**
- 📝 **Natural Language Input** - Describe issues in plain English
- 🎤 **Voice Recording** - Speak your issue description for hands-free logging
- 🧠 **AI Analysis** - Automatic categorization and impact assessment
- 🔍 **Pattern Recognition** - AI identifies recurring issues and trends
- 📊 **Real-time Reporting** - Instant insights and improvement suggestions

**How to Use:**
1. Access the Quick Logger from any page (floating action button)
2. Describe the issue in natural language
3. AI automatically categorizes and assesses impact
4. Receive immediate suggestions for resolution
5. Track progress and outcomes over time`
        },
        {
          id: 'improvement-tracking',
          title: 'Process Improvement Tracking',
          type: 'text',
          content: `**Continuous Improvement Cycle**

Lucidra tracks and measures process improvements automatically:

**Metrics Tracked:**
- 📈 **Issue Resolution Time** - How quickly problems are solved
- 🎯 **Process Efficiency** - Before and after improvement metrics
- 📊 **Impact Assessment** - Business value of improvements
- 🔄 **Recurring Issues** - Problems that need systematic solutions
- 👥 **Team Performance** - Individual and group improvement contributions

**AI-Generated Reports Include:**
- Weekly improvement summaries
- Trend analysis and predictions
- Resource allocation recommendations
- Best practice identification
- ROI calculations for improvements`
        }
      ]
    },

    {
      id: 'value-chain-models',
      title: 'Sector Value Chain Models',
      icon: '🏭',
      description: 'Industry-specific value chain templates and optimization',
      category: 'advanced',
      estimatedTime: '40 minutes',
      difficulty: 'advanced',
      prerequisites: ['Strategy Frameworks basics', 'Process Management'],
      subsections: [
        {
          id: 'sector-selection',
          title: 'Choosing Your Sector Model',
          type: 'text',
          content: `**Available Sector Models:**

**Financial Services** 🏦
- Retail Banking, Credit Unions
- Specialized KPIs: Net Interest Margin, Cost-to-Income Ratio
- Regulatory focus: Basel III, KYC/AML compliance

**Professional Services** ⚖️
- Legal, Accounting, Architecture, Consulting
- Specialized KPIs: Billable hours, Realization rate
- Focus on knowledge work optimization

**Service Industries** 🛠️
- Telecommunications, Restaurants, Plumbing, Electrical
- Specialized KPIs: Customer satisfaction, Service response time
- Operational excellence focus

**Manufacturing** 🏭
- FMCG, Production, Distribution
- Specialized KPIs: Production efficiency, Quality metrics
- Supply chain optimization

Each model includes:
- Industry-specific primary and support activities
- Relevant KPIs and benchmarks
- Regulatory considerations
- Best practice recommendations`
        },
        {
          id: 'customization',
          title: 'Customizing Value Chains',
          type: 'steps',
          content: 'Adapt sector models to your specific organization:',
          steps: [
            'Select the closest sector model to your business',
            'Review all primary and support activities',
            'Modify activity descriptions to match your operations',
            'Add or remove activities as needed for your context',
            'Update KPIs to reflect your specific metrics',
            'Adjust regulatory considerations for your jurisdiction',
            'Map your current processes to value chain activities',
            'Identify improvement opportunities using AI analysis',
            'Set up monitoring and tracking for key activities',
            'Export customized model for team sharing'
          ]
        }
      ]
    },

    {
      id: 'troubleshooting',
      title: 'Troubleshooting Guide',
      icon: '🔧',
      description: 'Common issues and solutions for platform usage',
      category: 'troubleshooting',
      estimatedTime: '20 minutes',
      difficulty: 'beginner',
      subsections: [
        {
          id: 'common-issues',
          title: 'Common Issues & Solutions',
          type: 'text',
          content: `**Login and Access Issues**

**Problem:** Cannot log in to the platform
**Solutions:**
- Verify your username and password
- Check with your administrator for account status
- Clear browser cache and cookies
- Try a different browser or incognito mode
- Contact support if using SSO

**Problem:** Features appear missing or greyed out
**Solutions:**
- Check your user tier (Lite, Pro, Enterprise)
- Contact administrator to verify permissions
- Refresh the page to reload permissions

**Financial Integration Issues**

**Problem:** Accounting system won't connect
**Solutions:**
- Verify you have administrator access to your accounting system
- Check if your accounting system version is supported
- Ensure firewall allows connections to Lucidra
- Try disconnecting and reconnecting

**Problem:** Financial data not syncing
**Solutions:**
- Check sync schedule and frequency settings
- Verify accounting system is online and accessible
- Review error logs in Integration Status tab
- Contact support for API troubleshooting`
        },
        {
          id: 'performance-tips',
          title: 'Performance Optimization',
          type: 'tips',
          content: 'Optimize your Lucidra experience:',
          tips: [
            'Use Chrome or Firefox browsers for best performance',
            'Close unused browser tabs to free memory',
            'Regularly clear browser cache (weekly recommended)',
            'Use wired internet connection for large file uploads',
            'Limit simultaneous users during peak sync times',
            'Schedule data syncs during off-peak hours',
            'Archive old projects to improve loading speed',
            'Use filters to limit large data views'
          ]
        },
        {
          id: 'support-resources',
          title: 'Getting Additional Help',
          type: 'text',
          content: `**Support Channels**

**In-Platform Help** 💬
- Click the help icon (?) on any page
- Access contextual help for specific features
- Use the AI assistant for quick questions

**Documentation** 📚
- Complete user manual (this document)
- Video tutorials and walkthroughs
- Best practices guides
- API documentation for developers

**Community Resources** 👥
- User community forum
- Best practices sharing
- Peer-to-peer support
- Success story case studies

**Direct Support** 🎧
- Email: support@lucidra.com
- Live chat during business hours
- Priority support for Enterprise customers
- Emergency support hotline for critical issues`
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'yellow';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'getting-started': return 'teal';
      case 'core-features': return 'blue';
      case 'advanced': return 'purple';
      case 'integrations': return 'orange';
      case 'troubleshooting': return 'red';
      default: return 'gray';
    }
  };

  const filteredSections = manualSections.filter(section => {
    const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.subsections.some(sub => 
                           sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sub.content.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCurrentSection = () => {
    return manualSections.find(section => section.id === selectedSection);
  };

  const renderSectionOverview = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          Welcome to the Lucidra Platform Manual. This comprehensive guide covers all features and provides step-by-step instructions for maximum platform effectiveness.
        </Text>
      </Alert>

      {/* Search and Filters */}
      <HStack spacing={4}>
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search manual sections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={onPrintOpen}
        >
          Export Manual
        </Button>
      </HStack>

      {/* Category Filter */}
      <HStack wrap="wrap" spacing={2}>
        <Text fontSize="sm" fontWeight="semibold">Categories:</Text>
        {[
          { key: 'all', label: 'All Sections', color: 'gray' },
          { key: 'getting-started', label: 'Getting Started', color: 'teal' },
          { key: 'core-features', label: 'Core Features', color: 'blue' },
          { key: 'advanced', label: 'Advanced', color: 'purple' },
          { key: 'integrations', label: 'Integrations', color: 'orange' },
          { key: 'troubleshooting', label: 'Troubleshooting', color: 'red' }
        ].map(category => (
          <Button
            key={category.key}
            size="sm"
            colorScheme={category.color}
            variant={selectedCategory === category.key ? 'solid' : 'outline'}
            onClick={() => setSelectedCategory(category.key)}
          >
            {category.label}
          </Button>
        ))}
      </HStack>

      {/* Manual Sections Grid */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {filteredSections.map((section) => (
          <Card 
            key={section.id}
            bg={cardBg}
            cursor="pointer"
            onClick={() => setSelectedSection(section.id)}
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
            borderWidth="2px"
            borderColor={borderColor}
          >
            <CardHeader pb={2}>
              <VStack align="start" spacing={2}>
                <HStack>
                  <Text fontSize="2xl">{section.icon}</Text>
                  <VStack align="start" spacing={0} flex="1">
                    <Text fontSize="md" fontWeight="bold" noOfLines={2}>
                      {section.title}
                    </Text>
                    <HStack spacing={2}>
                      <Badge 
                        colorScheme={getCategoryColor(section.category)} 
                        variant="subtle" 
                        fontSize="xs"
                      >
                        {section.category.replace('-', ' ')}
                      </Badge>
                      <Badge 
                        colorScheme={getDifficultyColor(section.difficulty)} 
                        variant="outline" 
                        fontSize="xs"
                      >
                        {section.difficulty}
                      </Badge>
                    </HStack>
                  </VStack>
                </HStack>
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {section.description}
                </Text>
              </VStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <HStack>
                    <TimeIcon boxSize={3} color="gray.500" />
                    <Text fontSize="xs" color="gray.500">{section.estimatedTime}</Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    {section.subsections.length} sections
                  </Text>
                </HStack>
                
                {section.prerequisites && (
                  <Box>
                    <Text fontSize="xs" color="gray.500" mb={1}>Prerequisites:</Text>
                    <VStack align="start" spacing={0}>
                      {section.prerequisites.map((prereq, index) => (
                        <Text key={index} fontSize="xs" color="orange.600">
                          • {prereq}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {filteredSections.length === 0 && (
        <Card bg={cardBg}>
          <CardBody textAlign="center" py={12}>
            <VStack spacing={4}>
              <SearchIcon boxSize={12} color="gray.400" />
              <Text fontSize="lg" fontWeight="semibold">No sections found</Text>
              <Text fontSize="sm" color="gray.600">
                Try adjusting your search terms or category filters
              </Text>
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  const renderSectionContent = () => {
    const section = getCurrentSection();
    if (!section) return null;

    return (
      <VStack spacing={6} align="stretch">
        {/* Section Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={2}>
            <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => setSelectedSection('overview')}>
                  Manual Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{section.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <HStack>
              <Text fontSize="3xl">{section.icon}</Text>
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold">{section.title}</Text>
                <Text color="gray.600">{section.description}</Text>
                <HStack spacing={4}>
                  <Badge 
                    colorScheme={getCategoryColor(section.category)} 
                    variant="solid"
                  >
                    {section.category.replace('-', ' ')}
                  </Badge>
                  <Badge 
                    colorScheme={getDifficultyColor(section.difficulty)} 
                    variant="outline"
                  >
                    {section.difficulty}
                  </Badge>
                  <HStack>
                    <TimeIcon boxSize={4} />
                    <Text fontSize="sm">{section.estimatedTime}</Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          </VStack>

          <VStack>
            <Button 
              leftIcon={<DownloadIcon />} 
              colorScheme="teal" 
              variant="outline" 
              size="sm"
              onClick={onPrintOpen}
            >
              Print Section
            </Button>
            <Progress 
              value={75} 
              colorScheme="teal" 
              size="sm" 
              w="100px"
              borderRadius="md"
            />
            <Text fontSize="xs" color="gray.500">Reading Progress</Text>
          </VStack>
        </HStack>

        {/* Prerequisites Alert */}
        {section.prerequisites && (
          <Alert status="warning">
            <AlertIcon />
            <VStack align="start" spacing={1} w="full">
              <Text fontSize="sm" fontWeight="semibold">Prerequisites Required</Text>
              <Text fontSize="sm">
                Make sure you're familiar with: {section.prerequisites.join(', ')}
              </Text>
            </VStack>
          </Alert>
        )}

        {/* Section Content */}
        <Accordion allowMultiple defaultIndex={[0]}>
          {section.subsections.map((subsection, index) => (
            <AccordionItem key={subsection.id}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <HStack>
                    <Text fontWeight="semibold">{subsection.title}</Text>
                    <Badge colorScheme="blue" variant="subtle" size="sm">
                      {subsection.type}
                    </Badge>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={6}>
                {renderSubsectionContent(subsection)}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Navigation */}
        <HStack justify="space-between" pt={6} borderTop="1px" borderColor={borderColor}>
          <Button 
            variant="ghost" 
            onClick={() => setSelectedSection('overview')}
            leftIcon={<ChevronRightIcon transform="rotate(180deg)" />}
          >
            Back to Manual Home
          </Button>
          
          <HStack spacing={2}>
            <Button size="sm" variant="outline" leftIcon={<StarIcon />}>
              Rate This Section
            </Button>
            <Button size="sm" variant="outline" leftIcon={<QuestionIcon />}>
              Ask Question
            </Button>
          </HStack>
        </HStack>
      </VStack>
    );
  };

  const renderSubsectionContent = (subsection: ManualSubsection) => {
    switch (subsection.type) {
      case 'steps':
        return (
          <VStack align="stretch" spacing={4}>
            <Text>{subsection.content}</Text>
            <OrderedList spacing={2}>
              {subsection.steps?.map((step, index) => (
                <ListItem key={index}>
                  <Text fontSize="sm">{step}</Text>
                </ListItem>
              ))}
            </OrderedList>
          </VStack>
        );

      case 'tips':
        return (
          <VStack align="stretch" spacing={4}>
            <Text>{subsection.content}</Text>
            <Alert status="success" variant="left-accent">
              <AlertIcon />
              <VStack align="start" spacing={2} w="full">
                {subsection.tips?.map((tip, index) => (
                  <HStack key={index} align="start">
                    <CheckIcon color="green.500" mt={1} />
                    <Text fontSize="sm">{tip}</Text>
                  </HStack>
                ))}
              </VStack>
            </Alert>
          </VStack>
        );

      case 'warning':
        return (
          <Alert status="warning">
            <AlertIcon />
            <Text fontSize="sm">{subsection.content}</Text>
          </Alert>
        );

      case 'code':
        return (
          <VStack align="stretch" spacing={4}>
            <Text>{subsection.content}</Text>
            {subsection.code && (
              <Code p={4} borderRadius="md" fontSize="sm" whiteSpace="pre-wrap">
                {subsection.code}
              </Code>
            )}
          </VStack>
        );

      case 'table':
        return (
          <VStack align="stretch" spacing={4}>
            <Text>{subsection.content}</Text>
            {subsection.tableData && (
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Question</Th>
                    <Th>Description</Th>
                    <Th>Implication</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {subsection.tableData.map((row, index) => (
                    <Tr key={index}>
                      <Td fontWeight="semibold">{row.question}</Td>
                      <Td fontSize="sm">{row.description}</Td>
                      <Td fontSize="sm" color="blue.600">{row.implication}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </VStack>
        );

      default:
        return (
          <Text whiteSpace="pre-line" lineHeight="tall">
            {subsection.content}
          </Text>
        );
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold">
              📖 Lucidra Platform Manual
            </Text>
            <Text color="gray.600">
              Comprehensive guide to mastering strategic intelligence with Lucidra
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="teal" variant="subtle">
                {manualSections.length} Sections
              </Badge>
              <Badge colorScheme="blue" variant="subtle">
                Interactive Guide
              </Badge>
              <Badge colorScheme="purple" variant="subtle">
                Printable Modules
              </Badge>
            </HStack>
          </VStack>

          <Button
            leftIcon={<ViewIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={onNavOpen}
            display={{ base: 'flex', lg: 'none' }}
          >
            Table of Contents
          </Button>
        </HStack>

        {/* Main Content */}
        <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
          {/* Navigation Sidebar - Desktop */}
          <Box display={{ base: 'none', lg: 'block' }}>
            <Card bg={cardBg} position="sticky" top="20px">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">📚 Table of Contents</Text>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={2}>
                  <Button
                    variant={selectedSection === 'overview' ? 'solid' : 'ghost'}
                    colorScheme="teal"
                    size="sm"
                    justifyContent="flex-start"
                    onClick={() => setSelectedSection('overview')}
                  >
                    📋 Manual Overview
                  </Button>
                  
                  <Divider />
                  
                  {manualSections.map((section) => (
                    <Button
                      key={section.id}
                      variant={selectedSection === section.id ? 'solid' : 'ghost'}
                      colorScheme={getCategoryColor(section.category)}
                      size="sm"
                      justifyContent="flex-start"
                      onClick={() => setSelectedSection(section.id)}
                      leftIcon={<Text fontSize="sm">{section.icon}</Text>}
                    >
                      <Text fontSize="sm" noOfLines={2} textAlign="left">
                        {section.title}
                      </Text>
                    </Button>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </Box>

          {/* Content Area */}
          <Box>
            {selectedSection === 'overview' ? renderSectionOverview() : renderSectionContent()}
          </Box>
        </Grid>

        {/* Mobile Navigation Drawer */}
        <Drawer isOpen={isNavOpen} placement="left" onClose={onNavClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <VStack align="stretch" spacing={4} pt={12}>
                <Text fontSize="lg" fontWeight="bold">📚 Table of Contents</Text>
                
                <Button
                  variant={selectedSection === 'overview' ? 'solid' : 'ghost'}
                  colorScheme="teal"
                  size="sm"
                  justifyContent="flex-start"
                  onClick={() => {
                    setSelectedSection('overview');
                    onNavClose();
                  }}
                >
                  📋 Manual Overview
                </Button>
                
                <Divider />
                
                {manualSections.map((section) => (
                  <Button
                    key={section.id}
                    variant={selectedSection === section.id ? 'solid' : 'ghost'}
                    colorScheme={getCategoryColor(section.category)}
                    size="sm"
                    justifyContent="flex-start"
                    onClick={() => {
                      setSelectedSection(section.id);
                      onNavClose();
                    }}
                    leftIcon={<Text fontSize="sm">{section.icon}</Text>}
                  >
                    <Text fontSize="sm" noOfLines={2} textAlign="left">
                      {section.title}
                    </Text>
                  </Button>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Print/Export Modal */}
        <Modal isOpen={isPrintOpen} onClose={onPrintClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>📄 Export Manual</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  Choose which sections to include in your export:
                </Text>
                
                <Alert status="info" size="sm">
                  <AlertIcon />
                  <Text fontSize="sm">
                    Exported manuals include all text, tables, and step-by-step instructions in a printer-friendly format.
                  </Text>
                </Alert>

                <VStack align="stretch" spacing={2}>
                  {manualSections.map((section) => (
                    <HStack key={section.id} justify="space-between">
                      <HStack>
                        <Text fontSize="sm">{section.icon}</Text>
                        <Text fontSize="sm">{section.title}</Text>
                      </HStack>
                      <Badge colorScheme="blue" variant="subtle" size="sm">
                        {section.subsections.length} sections
                      </Badge>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onPrintClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" leftIcon={<DownloadIcon />}>
                Export as PDF
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default PlatformManual;