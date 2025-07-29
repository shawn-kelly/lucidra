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
  Progress,
  Badge,
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
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
  useDisclosure
} from '@chakra-ui/react';

// Bloom's Taxonomy Levels
type BloomLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';

interface BloomActivity {
  id: string;
  level: BloomLevel;
  title: string;
  description: string;
  instruction: string;
  type: 'multiple-choice' | 'open-ended' | 'matching' | 'scenario' | 'creation';
  content: any;
  points: number;
  timeEstimate: number; // minutes
}

interface LearningModule {
  id: string;
  framework: string;
  title: string;
  description: string;
  bloomActivities: BloomActivity[];
  prerequisites: string[];
  objectives: string[];
  totalPoints: number;
}

interface UserProgress {
  moduleId: string;
  completedActivities: string[];
  scores: { [activityId: string]: number };
  currentLevel: BloomLevel;
  masteryScore: number;
  timeSpent: number;
  attempts: number;
}

const BLOOM_LEVELS = [
  {
    level: 'remember' as BloomLevel,
    title: 'Remember',
    description: 'Recall facts, terms, basic concepts',
    color: 'red',
    icon: '🧠',
    verbs: ['Define', 'List', 'Identify', 'Name', 'State', 'Recall']
  },
  {
    level: 'understand' as BloomLevel,
    title: 'Understand',
    description: 'Explain concepts and ideas',
    color: 'orange',
    icon: '💡',
    verbs: ['Explain', 'Describe', 'Summarize', 'Interpret', 'Compare']
  },
  {
    level: 'apply' as BloomLevel,
    title: 'Apply',
    description: 'Use information in new situations',
    color: 'yellow',
    icon: '🔧',
    verbs: ['Apply', 'Demonstrate', 'Use', 'Implement', 'Execute']
  },
  {
    level: 'analyze' as BloomLevel,
    title: 'Analyze',
    description: 'Break down information into parts',
    color: 'green',
    icon: '🔍',
    verbs: ['Analyze', 'Compare', 'Contrast', 'Examine', 'Categorize']
  },
  {
    level: 'evaluate' as BloomLevel,
    title: 'Evaluate',
    description: 'Make judgments and assess value',
    color: 'blue',
    icon: '⚖️',
    verbs: ['Evaluate', 'Judge', 'Critique', 'Assess', 'Justify']
  },
  {
    level: 'create' as BloomLevel,
    title: 'Create',
    description: 'Produce new or original work',
    color: 'purple',
    icon: '🎨',
    verbs: ['Create', 'Design', 'Develop', 'Construct', 'Plan']
  }
];

// Sample Learning Modules for Strategy Frameworks
const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'blue-ocean-training',
    framework: 'Blue Ocean Strategy',
    title: 'Master Blue Ocean Strategy Through Bloom\'s Taxonomy',
    description: 'Progressive learning path from basic concepts to creating your own Blue Ocean strategy',
    prerequisites: [],
    objectives: [
      'Define Blue Ocean Strategy core concepts',
      'Analyze market spaces using Six Paths framework',
      'Create value innovation strategies',
      'Evaluate competitive positioning'
    ],
    totalPoints: 600,
    bloomActivities: [
      {
        id: 'remember-1',
        level: 'remember',
        title: 'Define Blue Ocean Concepts',
        description: 'Recall fundamental Blue Ocean terminology',
        instruction: 'Match each term with its correct definition',
        type: 'matching',
        content: {
          terms: ['Blue Ocean', 'Red Ocean', 'Value Innovation', 'Strategy Canvas'],
          definitions: [
            'Uncontested market space with high growth potential',
            'Competitive market space with known boundaries',
            'Simultaneous pursuit of differentiation and low cost',
            'Visual representation of current competitive landscape'
          ]
        },
        points: 50,
        timeEstimate: 5
      },
      {
        id: 'understand-1',
        level: 'understand',
        title: 'Explain Six Paths Framework',
        description: 'Demonstrate understanding of alternative industry exploration',
        instruction: 'Explain how each of the Six Paths can reveal new market opportunities',
        type: 'open-ended',
        content: {
          paths: [
            'Alternative Industries',
            'Strategic Groups',
            'Chain of Buyers',
            'Complementary Products',
            'Functional-Emotional Appeal',
            'Time Trends'
          ]
        },
        points: 75,
        timeEstimate: 15
      },
      {
        id: 'apply-1',
        level: 'apply',
        title: 'Apply Strategy Canvas',
        description: 'Use Strategy Canvas to map competitive factors',
        instruction: 'Create a Strategy Canvas for your industry using the provided template',
        type: 'creation',
        content: {
          template: 'strategy-canvas',
          factors: ['Price', 'Quality', 'Service', 'Innovation', 'Brand'],
          scale: [1, 2, 3, 4, 5]
        },
        points: 100,
        timeEstimate: 20
      },
      {
        id: 'analyze-1',
        level: 'analyze',
        title: 'Analyze Market Boundaries',
        description: 'Break down industry assumptions and constraints',
        instruction: 'Analyze the provided case study and identify limiting industry assumptions',
        type: 'scenario',
        content: {
          caseStudy: 'Netflix vs. Blockbuster transformation',
          questions: [
            'What industry assumptions did Netflix challenge?',
            'How did they redefine market boundaries?',
            'What factors did they eliminate, reduce, raise, or create?'
          ]
        },
        points: 125,
        timeEstimate: 25
      },
      {
        id: 'evaluate-1',
        level: 'evaluate',
        title: 'Evaluate Blue Ocean Opportunities',
        description: 'Assess and rank potential Blue Ocean strategies',
        instruction: 'Evaluate three Blue Ocean opportunities using provided criteria',
        type: 'multiple-choice',
        content: {
          opportunities: [
            'Sustainable packaging for e-commerce',
            'AI-powered personal finance coaching',
            'Virtual reality fitness experiences'
          ],
          criteria: ['Market Size', 'Differentiation Potential', 'Implementation Feasibility', 'Profit Potential'],
          scale: [1, 2, 3, 4, 5]
        },
        points: 150,
        timeEstimate: 30
      },
      {
        id: 'create-1',
        level: 'create',
        title: 'Create Blue Ocean Strategy',
        description: 'Design a comprehensive Blue Ocean strategy',
        instruction: 'Develop a complete Blue Ocean strategy including value proposition, target market, and implementation plan',
        type: 'creation',
        content: {
          components: [
            'Value Innovation Statement',
            'Four Actions Framework (Eliminate, Reduce, Raise, Create)',
            'New Strategy Canvas',
            'Target Market Definition',
            'Implementation Roadmap'
          ]
        },
        points: 200,
        timeEstimate: 45
      }
    ]
  },
  {
    id: 'porter-forces-training',
    framework: 'Porter\'s Five Forces',
    title: 'Master Competitive Analysis with Bloom\'s Taxonomy',
    description: 'Progressive learning from force identification to strategic positioning',
    prerequisites: [],
    objectives: [
      'Identify the five competitive forces',
      'Analyze industry attractiveness',
      'Evaluate competitive positioning',
      'Create strategic responses'
    ],
    totalPoints: 550,
    bloomActivities: [
      {
        id: 'remember-porter-1',
        level: 'remember',
        title: 'Identify Five Forces',
        description: 'Recall the five competitive forces',
        instruction: 'List and define each of Porter\'s Five Forces',
        type: 'multiple-choice',
        content: {
          question: 'Which are Porter\'s Five Forces?',
          options: [
            'Threat of New Entrants, Bargaining Power of Suppliers, Bargaining Power of Buyers, Threat of Substitutes, Competitive Rivalry',
            'Market Growth, Customer Loyalty, Brand Strength, Cost Structure, Innovation',
            'Economic Factors, Social Trends, Technology, Politics, Environment'
          ],
          correct: 0
        },
        points: 50,
        timeEstimate: 5
      },
      {
        id: 'analyze-porter-1',
        level: 'analyze',
        title: 'Analyze Industry Forces',
        description: 'Break down competitive dynamics in a specific industry',
        instruction: 'Analyze the airline industry using the Five Forces framework',
        type: 'scenario',
        content: {
          industry: 'Commercial Airlines',
          analysisAreas: [
            'Barriers to entry and new entrant threats',
            'Supplier power (aircraft manufacturers, fuel)',
            'Buyer power (business vs leisure travelers)',
            'Substitute threats (video conferencing, trains)',
            'Competitive rivalry intensity'
          ]
        },
        points: 150,
        timeEstimate: 25
      }
    ]
  }
];

const BloomTaxonomyTraining: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [currentActivity, setCurrentActivity] = useState<BloomActivity | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<any>({});
  const [showResults, setShowResults] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const getBloomLevelInfo = (level: BloomLevel) => {
    return BLOOM_LEVELS.find(l => l.level === level)!;
  };

  const calculateModuleProgress = (moduleId: string) => {
    const progress = userProgress.find(p => p.moduleId === moduleId);
    if (!progress) return 0;
    
    const module = LEARNING_MODULES.find(m => m.id === moduleId);
    if (!module) return 0;
    
    return (progress.completedActivities.length / module.bloomActivities.length) * 100;
  };

  const getCurrentBloomLevel = (moduleId: string) => {
    const progress = userProgress.find(p => p.moduleId === moduleId);
    if (!progress) return 'remember';
    
    const module = LEARNING_MODULES.find(m => m.id === moduleId);
    if (!module) return 'remember';
    
    const completedLevels = new Set();
    progress.completedActivities.forEach(activityId => {
      const activity = module.bloomActivities.find(a => a.id === activityId);
      if (activity) completedLevels.add(activity.level);
    });
    
    const levelOrder: BloomLevel[] = ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'];
    for (let i = levelOrder.length - 1; i >= 0; i--) {
      if (completedLevels.has(levelOrder[i])) {
        return levelOrder[i];
      }
    }
    return 'remember';
  };

  const renderBloomPyramid = () => (
    <Card bg={cardBg} mb={6}>
      <CardHeader>
        <Text fontSize="xl" fontWeight="bold">🔺 Bloom's Taxonomy Learning Pyramid</Text>
        <Text fontSize="sm" color="gray.500">Progress through six levels of cognitive learning</Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4}>
          {BLOOM_LEVELS.reverse().map((level, index) => (
            <Box key={level.level} w="100%" position="relative">
              <Card 
                bg={`${level.color}.50`} 
                border={`2px solid`} 
                borderColor={`${level.color}.200`}
                cursor="pointer"
                _hover={{ transform: 'scale(1.02)', transition: 'all 0.2s' }}
                w={`${100 - index * 12}%`}
                mx="auto"
              >
                <CardBody p={4}>
                  <HStack justify="space-between">
                    <HStack>
                      <Text fontSize="2xl">{level.icon}</Text>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" color={`${level.color}.700`}>
                          {level.title}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {level.description}
                        </Text>
                      </VStack>
                    </HStack>
                    <Badge colorScheme={level.color} variant="solid">
                      Level {6 - index}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Key verbs: {level.verbs.join(', ')}
                  </Text>
                </CardBody>
              </Card>
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );

  const renderModuleSelection = () => (
    <VStack spacing={6}>
      {renderBloomPyramid()}
      
      <Card bg={cardBg} w="100%">
        <CardHeader>
          <Text fontSize="xl" fontWeight="bold">📚 Choose Your Learning Path</Text>
          <Text fontSize="sm" color="gray.500">
            Select a strategy framework to master through progressive Bloom's Taxonomy levels
          </Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {LEARNING_MODULES.map((module) => {
              const progress = calculateModuleProgress(module.id);
              const currentLevel = getCurrentBloomLevel(module.id);
              const levelInfo = getBloomLevelInfo(currentLevel);
              
              return (
                <Card 
                  key={module.id}
                  cursor="pointer"
                  onClick={() => setSelectedModule(module)}
                  _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                  transition="all 0.2s"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <CardHeader>
                    <HStack justify="space-between">
                      <Text fontWeight="bold">{module.framework}</Text>
                      <Badge colorScheme={levelInfo.color} variant="outline">
                        {levelInfo.icon} {levelInfo.title}
                      </Badge>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <Text fontSize="sm" color="gray.600">
                        {module.description}
                      </Text>
                      
                      <Box w="100%">
                        <HStack justify="space-between" mb={1}>
                          <Text fontSize="xs" color="gray.500">Progress</Text>
                          <Text fontSize="xs" color="gray.500">{Math.round(progress)}%</Text>
                        </HStack>
                        <Progress value={progress} colorScheme={levelInfo.color} size="sm" />
                      </Box>
                      
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="xs" color="gray.500">
                          {module.bloomActivities.length} activities
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {module.totalPoints} points
                        </Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              );
            })}
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderActivityInterface = () => {
    if (!currentActivity) return null;
    
    const levelInfo = getBloomLevelInfo(currentActivity.level);
    
    return (
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <HStack>
                <Badge colorScheme={levelInfo.color} variant="solid">
                  {levelInfo.icon} {levelInfo.title}
                </Badge>
                <Text fontWeight="bold">{currentActivity.title}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                {currentActivity.description}
              </Text>
            </VStack>
            <VStack align="end" spacing={1}>
              <Text fontSize="sm" fontWeight="bold">{currentActivity.points} pts</Text>
              <Text fontSize="xs" color="gray.500">{currentActivity.timeEstimate} min</Text>
            </VStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="start">
            <Alert status="info">
              <AlertIcon />
              <Text fontSize="sm">{currentActivity.instruction}</Text>
            </Alert>
            
            {/* Activity content would be rendered here based on type */}
            <Box w="100%" p={4} bg="gray.50" borderRadius="md">
              <Text fontSize="sm" color="gray.600" textAlign="center">
                🚧 Interactive activity interface will be implemented here
                <br />
                Activity type: {currentActivity.type}
                <br />
                Level: {levelInfo.title} ({levelInfo.description})
              </Text>
            </Box>
            
            <HStack w="100%" justify="space-between">
              <Button variant="outline" onClick={() => setCurrentActivity(null)}>
                ← Back to Module
              </Button>
              <Button colorScheme={levelInfo.color}>
                Submit & Continue
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  const renderModuleDetail = () => {
    if (!selectedModule) return null;
    
    return (
      <VStack spacing={6}>
        <Card bg={cardBg} w="100%">
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold">{selectedModule.framework}</Text>
                <Text color="gray.500">{selectedModule.description}</Text>
              </VStack>
              <Button variant="outline" onClick={() => setSelectedModule(null)}>
                ← Back to Modules
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <Tabs colorScheme="teal">
              <TabList>
                <Tab>🎯 Learning Path</Tab>
                <Tab>📊 Progress</Tab>
                <Tab>🏆 Objectives</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack spacing={4}>
                    {BLOOM_LEVELS.map((level) => {
                      const activities = selectedModule.bloomActivities.filter(a => a.level === level.level);
                      if (activities.length === 0) return null;
                      
                      return (
                        <Card key={level.level} w="100%" border="1px solid" borderColor={`${level.color}.200`}>
                          <CardHeader bg={`${level.color}.50`}>
                            <HStack>
                              <Text fontSize="xl">{level.icon}</Text>
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="bold" color={`${level.color}.700`}>
                                  {level.title}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {level.description}
                                </Text>
                              </VStack>
                            </HStack>
                          </CardHeader>
                          <CardBody>
                            <VStack spacing={3}>
                              {activities.map((activity) => (
                                <Card 
                                  key={activity.id} 
                                  w="100%" 
                                  cursor="pointer"
                                  onClick={() => setCurrentActivity(activity)}
                                  _hover={{ bg: 'gray.50' }}
                                >
                                  <CardBody>
                                    <HStack justify="space-between">
                                      <VStack align="start" spacing={1}>
                                        <Text fontWeight="semibold">{activity.title}</Text>
                                        <Text fontSize="sm" color="gray.500">
                                          {activity.description}
                                        </Text>
                                      </VStack>
                                      <VStack align="end" spacing={1}>
                                        <Badge colorScheme={level.color}>
                                          {activity.points} pts
                                        </Badge>
                                        <Text fontSize="xs" color="gray.500">
                                          {activity.timeEstimate} min
                                        </Text>
                                      </VStack>
                                    </HStack>
                                  </CardBody>
                                </Card>
                              ))}
                            </VStack>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <Alert status="info">
                    <AlertIcon />
                    <Text>Progress tracking system will be implemented here</Text>
                  </Alert>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" spacing={3}>
                    <Text fontWeight="bold">Learning Objectives:</Text>
                    {selectedModule.objectives.map((objective, index) => (
                      <HStack key={index}>
                        <Text color="green.500">✓</Text>
                        <Text>{objective}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} maxW="6xl" mx="auto">
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" mb={2}>
            🔺 Bloom's Taxonomy Training System
          </Text>
          <Text fontSize="lg" color="gray.600" mb={4}>
            Master strategy frameworks through progressive cognitive development
          </Text>
          <Text fontSize="sm" color="gray.500">
            Progress from basic knowledge to creative strategic thinking
          </Text>
        </Box>

        {currentActivity ? renderActivityInterface() :
         selectedModule ? renderModuleDetail() :
         renderModuleSelection()}
      </VStack>
    </Box>
  );
};

export default BloomTaxonomyTraining;