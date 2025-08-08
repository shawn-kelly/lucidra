import React, { useState, useEffect, useMemo } from 'react';
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
  Alert,
  AlertIcon,
  Tag,
  TagLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  List,
  ListItem,
  ListIcon,
  OrderedList
} from '@chakra-ui/react';

interface FeatureIdea {
  id: string;
  name: string;
  description: string;
  category: 'ui_ux' | 'analytics' | 'collaboration' | 'automation' | 'integration' | 'mobile' | 'ai_intelligence';
  priority: number;
  effort: number;
  impact: number;
  userValue: number;
  technicalFeasibility: number;
  businessValue: number;
  dependencies: string[];
  userStories: string[];
  acceptanceCriteria: string[];
  mockups: string[];
  timeline: string;
  resources: string[];
}

interface DevelopmentPlan {
  featureId: string;
  phases: Array<{
    name: string;
    duration: number;
    tasks: string[];
    deliverables: string[];
    risks: string[];
  }>;
  totalTimelineWeeks: number;
  teamRequirements: string[];
  successMetrics: string[];
}

const LocalFeatureDevelopmentAssistant: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState(0);
  const [featureIdeas, setFeatureIdeas] = useState<FeatureIdea[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<FeatureIdea | null>(null);
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ui_ux');
  const [isGenerating, setIsGenerating] = useState(false);
  const [developmentPlan, setDevelopmentPlan] = useState<DevelopmentPlan | null>(null);

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  // Local feature database - no APIs needed
  const featureTemplates = {
    ui_ux: [
      {
        name: 'Dark Mode Toggle',
        description: 'Allow users to switch between light and dark themes for better accessibility and user preference',
        userStories: [
          'As a user working in low-light environments, I want to enable dark mode to reduce eye strain',
          'As a user with visual preferences, I want the system to remember my theme choice'
        ],
        acceptanceCriteria: [
          'Toggle switch in user settings',
          'System-wide theme application',
          'Persistent user preference storage',
          'Accessibility compliance maintained'
        ],
        effort: 3,
        impact: 7,
        timeline: '2-3 weeks'
      },
      {
        name: 'Interactive Dashboard Widgets',
        description: 'Draggable, resizable dashboard components that users can customize for their workflow',
        userStories: [
          'As a strategic planner, I want to arrange dashboard elements to match my workflow',
          'As a team lead, I want to prioritize the most important metrics visually'
        ],
        acceptanceCriteria: [
          'Drag and drop functionality',
          'Resize capabilities',
          'Layout persistence',
          'Widget library with options'
        ],
        effort: 8,
        impact: 8,
        timeline: '6-8 weeks'
      }
    ],
    analytics: [
      {
        name: 'Advanced Reporting Engine',
        description: 'Generate detailed reports with charts, trends, and export capabilities for strategic analysis',
        userStories: [
          'As an executive, I want to export strategic analysis for board presentations',
          'As an analyst, I want to create custom reports with specific metrics and timeframes'
        ],
        acceptanceCriteria: [
          'Multiple export formats (PDF, Excel, PowerPoint)',
          'Custom report builder',
          'Automated report scheduling',
          'Interactive charts and visualizations'
        ],
        effort: 10,
        impact: 9,
        timeline: '8-12 weeks'
      },
      {
        name: 'Predictive Analytics Dashboard',
        description: 'Use local algorithms to predict trends and outcomes based on historical data patterns',
        userStories: [
          'As a strategist, I want to see predicted outcomes of different strategic choices',
          'As a business owner, I want forecasts based on my current strategy implementation'
        ],
        acceptanceCriteria: [
          'Trend analysis algorithms',
          'Confidence intervals for predictions',
          'Scenario comparison tools',
          'Historical data visualization'
        ],
        effort: 12,
        impact: 10,
        timeline: '10-14 weeks'
      }
    ],
    collaboration: [
      {
        name: 'Real-time Commenting System',
        description: 'Allow team members to add comments and feedback directly on strategy elements',
        userStories: [
          'As a team member, I want to add feedback on specific strategy components',
          'As a project manager, I want to track all team discussions in context'
        ],
        acceptanceCriteria: [
          'Inline commenting on any element',
          'Comment threads and replies',
          'Notification system for new comments',
          'Comment resolution workflow'
        ],
        effort: 6,
        impact: 8,
        timeline: '4-6 weeks'
      },
      {
        name: 'Team Workspace Hub',
        description: 'Dedicated spaces for teams to collaborate on strategies with role-based permissions',
        userStories: [
          'As a team lead, I want to create private workspaces for different projects',
          'As a team member, I want to see only the projects relevant to my role'
        ],
        acceptanceCriteria: [
          'Workspace creation and management',
          'Role-based access control',
          'Team member invitation system',
          'Activity tracking per workspace'
        ],
        effort: 9,
        impact: 9,
        timeline: '7-9 weeks'
      }
    ],
    automation: [
      {
        name: 'Smart Data Import System',
        description: 'Automatically import and structure data from various sources using pattern recognition',
        userStories: [
          'As a business analyst, I want to import data from spreadsheets without manual mapping',
          'As a consultant, I want to quickly onboard client data into strategic frameworks'
        ],
        acceptanceCriteria: [
          'Multiple file format support',
          'Intelligent column mapping',
          'Data validation and error handling',
          'Import history and rollback'
        ],
        effort: 7,
        impact: 7,
        timeline: '5-7 weeks'
      }
    ],
    integration: [
      {
        name: 'Third-party Tool Connectors',
        description: 'Connect with popular business tools like Slack, Microsoft Teams, Google Workspace',
        userStories: [
          'As a remote team, I want strategy updates posted automatically to Slack',
          'As a Microsoft user, I want to sync strategic plans with Teams and SharePoint'
        ],
        acceptanceCriteria: [
          'OAuth integration flows',
          'Real-time sync capabilities',
          'Error handling and retry logic',
          'Integration status monitoring'
        ],
        effort: 8,
        impact: 8,
        timeline: '6-8 weeks'
      }
    ],
    mobile: [
      {
        name: 'Mobile Strategy App',
        description: 'Native mobile app for viewing, editing, and collaborating on strategies on-the-go',
        userStories: [
          'As a traveling executive, I want to review strategic plans during commutes',
          'As a field manager, I want to update strategy progress from client sites'
        ],
        acceptanceCriteria: [
          'iOS and Android native apps',
          'Offline capability',
          'Push notifications',
          'Touch-optimized interface'
        ],
        effort: 15,
        impact: 9,
        timeline: '12-16 weeks'
      }
    ],
    ai_intelligence: [
      {
        name: 'Local AI Strategy Assistant',
        description: 'Offline AI that provides strategic recommendations based on patterns in user data',
        userStories: [
          'As a strategist, I want AI suggestions for improving my Blue Ocean analysis',
          'As a business owner, I want intelligent recommendations for strategic priorities'
        ],
        acceptanceCriteria: [
          'Local machine learning models',
          'Pattern recognition algorithms',
          'Recommendation engine',
          'Learning from user feedback'
        ],
        effort: 14,
        impact: 10,
        timeline: '10-16 weeks'
      }
    ]
  };

  // Initialize with some sample features
  useEffect(() => {
    const sampleFeatures: FeatureIdea[] = [
      {
        id: 'feat-1',
        name: 'Real-time Collaboration Canvas',
        description: 'Allow multiple users to work simultaneously on strategic frameworks with live cursors and changes',
        category: 'collaboration',
        priority: 9,
        effort: 7,
        impact: 9,
        userValue: 8,
        technicalFeasibility: 7,
        businessValue: 9,
        dependencies: ['WebSocket infrastructure', 'User authentication system'],
        userStories: [
          'As a remote team, I want to see others working on the strategy in real-time',
          'As a facilitator, I want to guide team discussions with live collaboration'
        ],
        acceptanceCriteria: [
          'Live cursor positions visible to all users',
          'Real-time text and shape updates',
          'Conflict resolution for simultaneous edits',
          'User presence indicators'
        ],
        mockups: ['Collaboration interface', 'User cursors', 'Live updates'],
        timeline: '6-8 weeks',
        resources: ['2 Frontend developers', '1 Backend developer', '1 UX designer']
      },
      {
        id: 'feat-2',
        name: 'AI-Powered Competitive Intelligence',
        description: 'Local AI system that analyzes competitor data and provides strategic insights',
        category: 'ai_intelligence',
        priority: 8,
        effort: 10,
        impact: 9,
        userValue: 9,
        technicalFeasibility: 6,
        businessValue: 10,
        dependencies: ['Machine learning framework', 'Data processing pipeline'],
        userStories: [
          'As a strategist, I want automatic competitor analysis updates',
          'As a business owner, I want early warnings about competitive threats'
        ],
        acceptanceCriteria: [
          'Automated data collection and analysis',
          'Threat level assessments',
          'Strategic recommendation generation',
          'Trend identification and alerts'
        ],
        mockups: ['Intelligence dashboard', 'Competitor profiles', 'Alert system'],
        timeline: '10-12 weeks',
        resources: ['1 ML engineer', '2 Full-stack developers', '1 Data analyst']
      }
    ];
    setFeatureIdeas(sampleFeatures);
  }, []);

  // Generate feature ideas based on category
  const generateFeatureIdeas = (category: string) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const templates = featureTemplates[category as keyof typeof featureTemplates] || [];
      const newFeatures = templates.map((template, index) => ({
        id: `generated-${Date.now()}-${index}`,
        name: template.name,
        description: template.description,
        category: category as FeatureIdea['category'],
        priority: Math.floor(Math.random() * 3) + 7, // 7-10
        effort: template.effort,
        impact: template.impact,
        userValue: Math.floor(Math.random() * 3) + 7,
        technicalFeasibility: Math.floor(Math.random() * 4) + 6,
        businessValue: Math.floor(Math.random() * 3) + 7,
        dependencies: ['Requirements analysis', 'Design system updates'],
        userStories: template.userStories,
        acceptanceCriteria: template.acceptanceCriteria,
        mockups: ['Wireframes', 'User flow diagrams'],
        timeline: template.timeline,
        resources: ['Developer', 'Designer', 'QA Engineer']
      }));

      setFeatureIdeas(prev => [...prev, ...newFeatures]);
      setIsGenerating(false);
      
      toast({
        title: 'Features Generated',
        description: `Generated ${newFeatures.length} feature ideas for ${category}`,
        status: 'success',
        duration: 3000
      });
    }, 1500);
  };

  // Create custom feature
  const createCustomFeature = () => {
    if (newFeatureName.trim() && newFeatureDescription.trim()) {
      const newFeature: FeatureIdea = {
        id: `custom-${Date.now()}`,
        name: newFeatureName.trim(),
        description: newFeatureDescription.trim(),
        category: selectedCategory as FeatureIdea['category'],
        priority: 7,
        effort: 5,
        impact: 7,
        userValue: 7,
        technicalFeasibility: 7,
        businessValue: 7,
        dependencies: [],
        userStories: [`As a user, I want ${newFeatureName.toLowerCase()} so that I can ${newFeatureDescription.toLowerCase()}`],
        acceptanceCriteria: ['Feature functions as described', 'User can access the feature', 'Feature is well-documented'],
        mockups: ['To be created'],
        timeline: '4-6 weeks',
        resources: ['Developer', 'Designer']
      };

      setFeatureIdeas(prev => [...prev, newFeature]);
      setNewFeatureName('');
      setNewFeatureDescription('');
      
      toast({
        title: 'Custom Feature Created',
        description: newFeature.name,
        status: 'success',
        duration: 3000
      });
    }
  };

  // Generate development plan
  const generateDevelopmentPlan = (feature: FeatureIdea) => {
    setSelectedFeature(feature);
    
    const plan: DevelopmentPlan = {
      featureId: feature.id,
      phases: [
        {
          name: 'Discovery & Planning',
          duration: Math.ceil(feature.effort * 0.2),
          tasks: [
            'Conduct user research and interviews',
            'Create detailed requirements document',
            'Design technical architecture',
            'Plan testing strategy'
          ],
          deliverables: [
            'Requirements document',
            'Technical specifications',
            'Project timeline',
            'Risk assessment'
          ],
          risks: [
            'Requirements may change during discovery',
            'Technical complexity higher than estimated'
          ]
        },
        {
          name: 'Design & Prototyping',
          duration: Math.ceil(feature.effort * 0.25),
          tasks: [
            'Create wireframes and mockups',
            'Design user interaction flows',
            'Build interactive prototypes',
            'Conduct usability testing'
          ],
          deliverables: [
            'UI/UX designs',
            'Interactive prototype',
            'Design system updates',
            'Usability test results'
          ],
          risks: [
            'Design iterations may extend timeline',
            'User feedback may require major changes'
          ]
        },
        {
          name: 'Development',
          duration: Math.ceil(feature.effort * 0.4),
          tasks: [
            'Implement frontend components',
            'Build backend services',
            'Integrate with existing systems',
            'Write comprehensive tests'
          ],
          deliverables: [
            'Working feature implementation',
            'API documentation',
            'Test coverage reports',
            'Performance benchmarks'
          ],
          risks: [
            'Integration challenges with legacy code',
            'Performance issues with large datasets'
          ]
        },
        {
          name: 'Testing & Launch',
          duration: Math.ceil(feature.effort * 0.15),
          tasks: [
            'Comprehensive QA testing',
            'User acceptance testing',
            'Performance optimization',
            'Production deployment'
          ],
          deliverables: [
            'QA test reports',
            'Performance metrics',
            'Launch documentation',
            'User training materials'
          ],
          risks: [
            'Critical bugs discovered in final testing',
            'Performance issues in production environment'
          ]
        }
      ],
      totalTimelineWeeks: feature.effort,
      teamRequirements: feature.resources,
      successMetrics: [
        `User adoption rate > ${60 + feature.userValue}%`,
        `User satisfaction score > ${3.5 + (feature.impact / 10)}`,
        `Feature usage increases overall engagement by ${feature.impact * 2}%`,
        `Technical performance meets requirements`
      ]
    };

    setDevelopmentPlan(plan);
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 9) return 'red';
    if (priority >= 7) return 'orange';
    if (priority >= 5) return 'yellow';
    return 'green';
  };

  const getEffortColor = (effort: number) => {
    if (effort >= 10) return 'red';
    if (effort >= 7) return 'orange';
    if (effort >= 4) return 'yellow';
    return 'green';
  };

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center" mb={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="blue.600">🛠️ Feature Development Assistant</Text>
              <Text color="gray.600">AI-powered feature ideation, planning, and development guidance - 100% local</Text>
            </VStack>
            <HStack spacing={3}>
              <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                Local Intelligence
              </Badge>
              <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
                Zero API Calls
              </Badge>
            </HStack>
          </HStack>

          {/* Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Stat>
              <StatLabel>Feature Ideas</StatLabel>
              <StatNumber color="blue.500">{featureIdeas.length}</StatNumber>
              <StatHelpText>Generated & custom</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Avg Priority</StatLabel>
              <StatNumber color="orange.500">
                {useMemo(() => 
                  featureIdeas.length > 0 ? (featureIdeas.reduce((sum, f) => sum + f.priority, 0) / featureIdeas.length).toFixed(1) : '0',
                  [featureIdeas]
                )}
              </StatNumber>
              <StatHelpText>Out of 10</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>High Impact</StatLabel>
              <StatNumber color="green.500">
                {featureIdeas.filter(f => f.impact >= 8).length}
              </StatNumber>
              <StatHelpText>Features (8+ impact)</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Quick Wins</StatLabel>
              <StatNumber color="purple.500">
                {featureIdeas.filter(f => f.effort <= 5 && f.impact >= 7).length}
              </StatNumber>
              <StatHelpText>Low effort, high impact</StatHelpText>
            </Stat>
          </SimpleGrid>
        </Box>

        {/* Main Content */}
        <Card>
          <CardBody>
            <Tabs colorScheme="blue">
              <TabList>
                <Tab>💡 Feature Ideas</Tab>
                <Tab>🎯 Feature Generator</Tab>
                <Tab>📋 Development Plans</Tab>
                <Tab>🚀 Implementation</Tab>
              </TabList>

              <TabPanels>
                {/* Feature Ideas */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="xl" fontWeight="bold">Feature Backlog</Text>
                      <Button colorScheme="blue" onClick={() => generateFeatureIdeas('ui_ux')}>
                        Generate More Ideas
                      </Button>
                    </HStack>

                    <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                      {featureIdeas.map((feature) => (
                        <Card key={feature.id} variant="outline">
                          <CardHeader>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={1}>
                                <Text fontSize="lg" fontWeight="bold">{feature.name}</Text>
                                <Badge colorScheme="purple" size="sm">{feature.category.replace('_', ' ')}</Badge>
                              </VStack>
                              <VStack spacing={1}>
                                <Badge colorScheme={getPriorityColor(feature.priority)} size="sm">
                                  Priority: {feature.priority}
                                </Badge>
                                <Badge colorScheme={getEffortColor(feature.effort)} size="sm">
                                  Effort: {feature.effort}
                                </Badge>
                              </VStack>
                            </HStack>
                          </CardHeader>
                          <CardBody>
                            <VStack spacing={4} align="stretch">
                              <Text fontSize="sm" color="gray.600">{feature.description}</Text>
                              
                              <SimpleGrid columns={3} spacing={4}>
                                <VStack>
                                  <CircularProgress value={feature.impact * 10} color="green.400" size="50px">
                                    <CircularProgressLabel fontSize="xs">{feature.impact}</CircularProgressLabel>
                                  </CircularProgress>
                                  <Text fontSize="xs">Impact</Text>
                                </VStack>
                                <VStack>
                                  <CircularProgress value={feature.userValue * 10} color="blue.400" size="50px">
                                    <CircularProgressLabel fontSize="xs">{feature.userValue}</CircularProgressLabel>
                                  </CircularProgress>
                                  <Text fontSize="xs">User Value</Text>
                                </VStack>
                                <VStack>
                                  <CircularProgress value={feature.technicalFeasibility * 10} color="purple.400" size="50px">
                                    <CircularProgressLabel fontSize="xs">{feature.technicalFeasibility}</CircularProgressLabel>
                                  </CircularProgress>
                                  <Text fontSize="xs">Feasibility</Text>
                                </VStack>
                              </SimpleGrid>

                              <HStack justify="space-between">
                                <Text fontSize="sm" color="gray.500">Timeline: {feature.timeline}</Text>
                                <Button 
                                  size="sm" 
                                  colorScheme="blue" 
                                  onClick={() => generateDevelopmentPlan(feature)}
                                >
                                  Create Plan
                                </Button>
                              </HStack>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </Grid>
                  </VStack>
                </TabPanel>

                {/* Feature Generator */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">AI Feature Generator</Text>
                    
                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold">Generate New Feature Ideas</Text>
                      </CardHeader>
                      <CardBody>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
                          {Object.entries(featureTemplates).map(([category, templates]) => (
                            <Button
                              key={category}
                              variant="outline"
                              colorScheme="blue"
                              h="auto"
                              p={4}
                              isLoading={isGenerating}
                              onClick={() => generateFeatureIdeas(category)}
                            >
                              <VStack>
                                <Text fontSize="2xl">
                                  {category === 'ui_ux' ? '🎨' : 
                                   category === 'analytics' ? '📊' :
                                   category === 'collaboration' ? '👥' :
                                   category === 'automation' ? '🤖' :
                                   category === 'integration' ? '🔗' :
                                   category === 'mobile' ? '📱' : '🧠'}
                                </Text>
                                <Text fontSize="sm" textTransform="capitalize">
                                  {category.replace('_', ' ')}
                                </Text>
                                <Badge size="sm">{templates.length} templates</Badge>
                              </VStack>
                            </Button>
                          ))}
                        </SimpleGrid>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold">Create Custom Feature</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4}>
                          <HStack spacing={4} w="100%">
                            <FormControl flex={2}>
                              <FormLabel>Feature Name</FormLabel>
                              <Input 
                                value={newFeatureName}
                                onChange={(e) => setNewFeatureName(e.target.value)}
                                placeholder="e.g., Advanced Chart Builder"
                              />
                            </FormControl>
                            <FormControl flex={1}>
                              <FormLabel>Category</FormLabel>
                              <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="ui_ux">UI/UX</option>
                                <option value="analytics">Analytics</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="automation">Automation</option>
                                <option value="integration">Integration</option>
                                <option value="mobile">Mobile</option>
                                <option value="ai_intelligence">AI Intelligence</option>
                              </Select>
                            </FormControl>
                          </HStack>
                          
                          <FormControl>
                            <FormLabel>Feature Description</FormLabel>
                            <Textarea 
                              value={newFeatureDescription}
                              onChange={(e) => setNewFeatureDescription(e.target.value)}
                              placeholder="Describe what this feature does and why it's valuable..."
                              rows={3}
                            />
                          </FormControl>
                          
                          <Button colorScheme="green" onClick={createCustomFeature}>
                            Create Custom Feature
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>
                </TabPanel>

                {/* Development Plans */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Development Planning</Text>
                    
                    {developmentPlan && selectedFeature ? (
                      <VStack spacing={6} align="stretch">
                        <Card variant="outline" borderColor="blue.200">
                          <CardHeader>
                            <HStack justify="space-between">
                              <Text fontSize="lg" fontWeight="bold">{selectedFeature.name}</Text>
                              <Badge colorScheme="blue" fontSize="md">
                                {developmentPlan.totalTimelineWeeks} weeks
                              </Badge>
                            </HStack>
                          </CardHeader>
                          <CardBody>
                            <Text color="gray.600" mb={4}>{selectedFeature.description}</Text>
                            
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                              <Box>
                                <Text fontSize="md" fontWeight="semibold" mb={3}>📋 User Stories</Text>
                                <OrderedList spacing={2}>
                                  {selectedFeature.userStories.map((story, index) => (
                                    <ListItem key={index} fontSize="sm">{story}</ListItem>
                                  ))}
                                </OrderedList>
                              </Box>
                              
                              <Box>
                                <Text fontSize="md" fontWeight="semibold" mb={3}>✅ Acceptance Criteria</Text>
                                <List spacing={2}>
                                  {selectedFeature.acceptanceCriteria.map((criteria, index) => (
                                    <ListItem key={index} fontSize="sm">
                                      <ListIcon as={() => <Text as="span" color="green.500">•</Text>} />
                                      {criteria}
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                            </SimpleGrid>
                          </CardBody>
                        </Card>

                        <Text fontSize="lg" fontWeight="bold">🗓️ Development Phases</Text>
                        
                        {developmentPlan.phases.map((phase, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <HStack justify="space-between">
                                <Text fontSize="md" fontWeight="bold">{phase.name}</Text>
                                <Badge colorScheme="purple">{phase.duration} weeks</Badge>
                              </HStack>
                            </CardHeader>
                            <CardBody>
                              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                                <Box>
                                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Tasks:</Text>
                                  <List spacing={1}>
                                    {phase.tasks.map((task, taskIndex) => (
                                      <ListItem key={taskIndex} fontSize="xs">
                                        <ListIcon as={() => <Text as="span" color="blue.500">•</Text>} />
                                        {task}
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                                
                                <Box>
                                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Deliverables:</Text>
                                  <List spacing={1}>
                                    {phase.deliverables.map((deliverable, delIndex) => (
                                      <ListItem key={delIndex} fontSize="xs">
                                        <ListIcon as={() => <Text as="span" color="green.500">•</Text>} />
                                        {deliverable}
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                                
                                <Box>
                                  <Text fontSize="sm" fontWeight="semibold" mb={2} color="orange.600">Risks:</Text>
                                  <List spacing={1}>
                                    {phase.risks.map((risk, riskIndex) => (
                                      <ListItem key={riskIndex} fontSize="xs">
                                        <ListIcon as={() => <Text as="span" color="orange.500">⚠</Text>} />
                                        {risk}
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              </SimpleGrid>
                            </CardBody>
                          </Card>
                        ))}

                        <Card>
                          <CardHeader>
                            <Text fontSize="md" fontWeight="bold">🎯 Success Metrics</Text>
                          </CardHeader>
                          <CardBody>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                              <Box>
                                <Text fontSize="sm" fontWeight="semibold" mb={2}>Team Requirements:</Text>
                                <HStack spacing={2} flexWrap="wrap">
                                  {developmentPlan.teamRequirements.map((resource, index) => (
                                    <Tag key={index} size="sm" colorScheme="blue">
                                      <TagLabel>{resource}</TagLabel>
                                    </Tag>
                                  ))}
                                </HStack>
                              </Box>
                              
                              <Box>
                                <Text fontSize="sm" fontWeight="semibold" mb={2}>Success Criteria:</Text>
                                <List spacing={1}>
                                  {developmentPlan.successMetrics.map((metric, index) => (
                                    <ListItem key={index} fontSize="xs">
                                      <ListIcon as={() => <Text as="span" color="green.500">📊</Text>} />
                                      {metric}
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                            </SimpleGrid>
                          </CardBody>
                        </Card>
                      </VStack>
                    ) : (
                      <Alert status="info">
                        <AlertIcon />
                        <Text>Select a feature from the Feature Ideas tab and click "Create Plan" to generate a development plan.</Text>
                      </Alert>
                    )}
                  </VStack>
                </TabPanel>

                {/* Implementation */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Text fontSize="xl" fontWeight="bold">Implementation Guidance</Text>
                    
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Card>
                        <CardHeader>
                          <Text fontSize="lg" fontWeight="semibold">🚀 Quick Wins</Text>
                        </CardHeader>
                        <CardBody>
                          <Text fontSize="sm" color="gray.600" mb={3}>
                            Features with high impact and low effort - perfect for immediate implementation:
                          </Text>
                          <VStack spacing={2} align="stretch">
                            {featureIdeas
                              .filter(f => f.effort <= 5 && f.impact >= 7)
                              .slice(0, 5)
                              .map((feature) => (
                                <HStack key={feature.id} justify="space-between" p={2} bg="green.50" borderRadius="md">
                                  <Text fontSize="sm" fontWeight="semibold">{feature.name}</Text>
                                  <Badge colorScheme="green" size="sm">
                                    {feature.effort}w / {feature.impact} impact
                                  </Badge>
                                </HStack>
                              ))}
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card>
                        <CardHeader>
                          <Text fontSize="lg" fontWeight="semibold">🎯 High Impact Features</Text>
                        </CardHeader>
                        <CardBody>
                          <Text fontSize="sm" color="gray.600" mb={3}>
                            Features that will make the biggest difference to users:
                          </Text>
                          <VStack spacing={2} align="stretch">
                            {featureIdeas
                              .filter(f => f.impact >= 8)
                              .sort((a, b) => b.impact - a.impact)
                              .slice(0, 5)
                              .map((feature) => (
                                <HStack key={feature.id} justify="space-between" p={2} bg="blue.50" borderRadius="md">
                                  <Text fontSize="sm" fontWeight="semibold">{feature.name}</Text>
                                  <Badge colorScheme="blue" size="sm">
                                    Impact: {feature.impact}/10
                                  </Badge>
                                </HStack>
                              ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>

                    <Card>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="semibold">📊 Feature Prioritization Matrix</Text>
                      </CardHeader>
                      <CardBody>
                        <Text fontSize="sm" color="gray.600" mb={4}>
                          Features plotted by Impact vs Effort - optimize for high impact, low effort features first:
                        </Text>
                        
                        <Box position="relative" height="400px" bg="gray.50" borderRadius="md" p={4}>
                          <Text position="absolute" left="10px" top="50%" transform="rotate(-90deg)" fontSize="sm" color="gray.600">
                            Impact →
                          </Text>
                          <Text position="absolute" bottom="10px" left="50%" transform="translateX(-50%)" fontSize="sm" color="gray.600">
                            → Effort
                          </Text>
                          
                          {featureIdeas.map((feature) => {
                            const left = `${(feature.effort / 15) * 90 + 5}%`;
                            const bottom = `${(feature.impact / 10) * 80 + 10}%`;
                            
                            return (
                              <Tooltip key={feature.id} label={feature.name}>
                                <Box
                                  position="absolute"
                                  left={left}
                                  bottom={bottom}
                                  w="12px"
                                  h="12px"
                                  borderRadius="full"
                                  bg={getPriorityColor(feature.priority) + '.500'}
                                  cursor="pointer"
                                  _hover={{ transform: 'scale(1.5)' }}
                                  transition="transform 0.2s"
                                />
                              </Tooltip>
                            );
                          })}
                          
                          {/* Quadrant lines */}
                          <Box position="absolute" left="50%" top="0" width="1px" height="100%" bg="gray.300" />
                          <Box position="absolute" top="50%" left="0" height="1px" width="100%" bg="gray.300" />
                          
                          {/* Quadrant labels */}
                          <Text position="absolute" top="20%" left="20%" fontSize="xs" color="gray.500">
                            Quick Wins
                          </Text>
                          <Text position="absolute" top="20%" right="20%" fontSize="xs" color="gray.500">
                            Major Projects
                          </Text>
                          <Text position="absolute" bottom="20%" left="20%" fontSize="xs" color="gray.500">
                            Fill-ins
                          </Text>
                          <Text position="absolute" bottom="20%" right="20%" fontSize="xs" color="gray.500">
                            Questionable
                          </Text>
                        </Box>
                      </CardBody>
                    </Card>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
});

LocalFeatureDevelopmentAssistant.displayName = 'LocalFeatureDevelopmentAssistant';

export default LocalFeatureDevelopmentAssistant;