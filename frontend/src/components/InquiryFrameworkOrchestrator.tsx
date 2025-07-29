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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  CircularProgress,
  CircularProgressLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useFrameworkData } from '../hooks/useFrameworkData';

// Inquiry Framework Data Structures based on Warren Berger's "A More Beautiful Question"
interface StrategicQuestion {
  id: string;
  question: string;
  type: 'why' | 'what_if' | 'how' | 'foundational' | 'divergent' | 'convergent';
  stage: 'questioning' | 'ideating' | 'experimenting' | 'implementing';
  priority: 'critical' | 'high' | 'medium' | 'low';
  complexity: number; // 1-10 scale
  blueOceanRelevance: boolean;
  frameworkAlignment: {
    blueOcean: string[];
    marketing: string[];
    hr: string[];
    process: string[];
    porter: string[];
  };
  insights: QuestionInsight[];
  explorations: QuestionExploration[];
  answers: QuestionAnswer[];
  relatedQuestions: string[]; // question IDs
  createdAt: string;
  lastExplored?: string;
  status: 'open' | 'exploring' | 'answered' | 'archived';
}

interface QuestionInsight {
  id: string;
  insight: string;
  source: string;
  confidence: number; // 1-10 scale
  actionability: number; // 1-10 scale
  strategicImplications: string[];
  generatedAt: string;
}

interface QuestionExploration {
  id: string;
  approach: string;
  method: 'research' | 'experiment' | 'interview' | 'analysis' | 'observation';
  findings: string[];
  nextSteps: string[];
  timeInvested: number; // hours
  resources: string[];
  collaborators: string[];
  status: 'planned' | 'in_progress' | 'completed';
  startedAt: string;
  completedAt?: string;
}

interface QuestionAnswer {
  id: string;
  answer: string;
  confidence: number; // 1-10 scale
  validation: string[];
  assumptions: string[];
  implications: string[];
  followUpQuestions: string[];
  answeredBy: string;
  answeredAt: string;
  revisedAt?: string;
}

interface InquirySession {
  id: string;
  name: string;
  description: string;
  objective: string;
  questions: string[]; // question IDs
  participants: string[];
  duration: number; // hours
  insights: string[];
  outcomes: string[];
  blueOceanConnections: string[];
  sessionType: 'discovery' | 'problem_solving' | 'innovation' | 'strategy_development';
  status: 'planned' | 'active' | 'completed' | 'paused';
  createdAt: string;
  scheduledAt?: string;
  completedAt?: string;
}

const InquiryFrameworkOrchestrator: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const {
    frameworkState,
    blueOceanData,
    insights,
    hasData
  } = useFrameworkData();

  const [strategicQuestions, setStrategicQuestions] = useState<StrategicQuestion[]>([]);
  const [inquirySessions, setInquirySessions] = useState<InquirySession[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<StrategicQuestion | null>(null);
  const [questionInput, setQuestionInput] = useState('');
  const [selectedQuestionType, setSelectedQuestionType] = useState<'why' | 'what_if' | 'how'>('why');

  const toast = useToast();
  const { isOpen: isQuestionOpen, onOpen: onQuestionOpen, onClose: onQuestionClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');
  const warningBg = useColorModeValue('orange.50', 'orange.900');

  // Warren Berger's question templates and frameworks
  const questionTemplates = {
    why: [
      "Why do we assume [assumption]?",
      "Why hasn't this problem been solved before?", 
      "Why does this matter to our customers?",
      "Why are we approaching it this way?"
    ],
    what_if: [
      "What if we [opposite of current approach]?",
      "What if our biggest constraint was removed?",
      "What if we started from scratch?",
      "What if our customer's behavior changed?"
    ],
    how: [
      "How might we make this [simpler/better/faster]?",
      "How do we bridge the gap between current and ideal state?",
      "How can we turn this constraint into an advantage?",
      "How might we achieve this with limited resources?"
    ]
  };

  // Initialize with demo data and Blue Ocean integrations
  useEffect(() => {
    // Generate strategic questions from Blue Ocean insights
    const blueOceanQuestions: StrategicQuestion[] = [];

    // Questions based on Six Paths Analysis
    if (blueOceanData.sixPathsAnalysis.alternativeIndustries.length > 0) {
      blueOceanData.sixPathsAnalysis.alternativeIndustries.forEach((industry, index) => {
        blueOceanQuestions.push({
          id: `question_industry_${index}`,
          question: `What if we applied ${industry} industry practices to solve our customer problems?`,
          type: 'what_if',
          stage: 'ideating',
          priority: 'high',
          complexity: 7,
          blueOceanRelevance: true,
          frameworkAlignment: {
            blueOcean: ['Six Paths Analysis', 'Alternative Industries'],
            marketing: ['Market expansion', 'Competitive positioning'],
            hr: ['Cross-industry hiring', 'Capability development'],
            process: ['Process innovation', 'Best practice adoption'],
            porter: ['Competitive advantage', 'Industry structure']
          },
          insights: [
            {
              id: `insight_${index}_1`,
              insight: `Cross-industry practices from ${industry} could provide differentiation`,
              source: 'Blue Ocean Six Paths Analysis',
              confidence: 7,
              actionability: 8,
              strategicImplications: [
                'Potential for unique value proposition',
                'Reduced competitive pressure',
                'New capability development opportunities'
              ],
              generatedAt: new Date().toISOString()
            }
          ],
          explorations: [],
          answers: [],
          relatedQuestions: [],
          createdAt: new Date().toISOString(),
          status: 'open'
        });
      });
    }

    // Questions based on buyer groups
    if (blueOceanData.sixPathsAnalysis.buyerGroups.length > 0) {
      blueOceanData.sixPathsAnalysis.buyerGroups.forEach((group, index) => {
        blueOceanQuestions.push({
          id: `question_buyer_${index}`,
          question: `Why haven't we fully addressed the specific needs of ${group}?`,
          type: 'why',
          stage: 'questioning',
          priority: 'critical',
          complexity: 6,
          blueOceanRelevance: true,
          frameworkAlignment: {
            blueOcean: ['Six Paths Analysis', 'Buyer Groups'],
            marketing: ['Customer segmentation', 'Targeted campaigns'],
            hr: ['Customer-facing roles', 'Experience specialists'],
            process: ['Customer journey optimization', 'Touchpoint improvement'],
            porter: ['Buyer power analysis', 'Differentiation strategy']
          },
          insights: [
            {
              id: `buyer_insight_${index}`,
              insight: `${group} represents an underserved market opportunity`,
              source: 'Blue Ocean Buyer Group Analysis',
              confidence: 8,
              actionability: 9,
              strategicImplications: [
                'Opportunity for market expansion',
                'Potential for premium positioning',
                'Need for specialized capabilities'
              ],
              generatedAt: new Date().toISOString()
            }
          ],
          explorations: [],
          answers: [],
          relatedQuestions: [],
          createdAt: new Date().toISOString(),
          status: 'open'
        });
      });
    }

    // Questions based on utility map insights
    if (blueOceanData.buyerUtilityMap?.utilityBlocks) {
      const lowUtilityBlocks = blueOceanData.buyerUtilityMap.utilityBlocks
        .map((block, index) => ({ ...block, index }))
        .filter(block => block.score <= 4);

      lowUtilityBlocks.slice(0, 3).forEach((block, questionIndex) => {
        const stages = ['Purchase', 'Delivery', 'Use', 'Supplements', 'Maintenance', 'Disposal'];
        const levers = ['Customer Productivity', 'Simplicity', 'Convenience', 'Risk', 'Fun and Image', 'Environmental Friendliness'];
        const stageIndex = Math.floor(block.index / 6);
        const leverIndex = block.index % 6;
        const stage = stages[stageIndex];
        const lever = levers[leverIndex];

        blueOceanQuestions.push({
          id: `question_utility_${questionIndex}`,
          question: `How might we dramatically improve ${lever.toLowerCase()} during the ${stage.toLowerCase()} stage?`,
          type: 'how',
          stage: 'experimenting',
          priority: block.score <= 2 ? 'critical' : 'high',
          complexity: 8,
          blueOceanRelevance: true,
          frameworkAlignment: {
            blueOcean: ['Buyer Utility Map', `${stage} - ${lever}`],
            marketing: ['Value proposition development', 'Customer experience'],
            hr: ['Capability requirements', 'Service delivery'],
            process: ['Process optimization', 'Workflow improvement'],
            porter: ['Differentiation', 'Value chain enhancement']
          },
          insights: [
            {
              id: `utility_insight_${questionIndex}`,
              insight: `Low utility score (${block.score}/10) in ${stage} - ${lever} indicates major improvement opportunity`,
              source: 'Blue Ocean Buyer Utility Map',
              confidence: 9,
              actionability: 8,
              strategicImplications: [
                'Direct impact on customer satisfaction',
                'Competitive differentiation opportunity',
                'Process improvement potential'
              ],
              generatedAt: new Date().toISOString()
            }
          ],
          explorations: [],
          answers: [],
          relatedQuestions: [],
          createdAt: new Date().toISOString(),
          status: 'open'
        });
      });
    }

    // Add foundational strategic questions
    const foundationalQuestions: StrategicQuestion[] = [
      {
        id: 'foundational_1',
        question: "What if we could make our industry's biggest pain point completely irrelevant?",
        type: 'what_if',
        stage: 'ideating',
        priority: 'critical',
        complexity: 9,
        blueOceanRelevance: true,
        frameworkAlignment: {
          blueOcean: ['Value Innovation', 'Eliminate-Reduce-Raise-Create'],
          marketing: ['Disruptive positioning', 'Category creation'],
          hr: ['Innovation capabilities', 'Change management'],
          process: ['Process elimination', 'Workflow redesign'],
          porter: ['Industry transformation', 'Competitive dynamics']
        },
        insights: [],
        explorations: [],
        answers: [],
        relatedQuestions: [],
        createdAt: new Date().toISOString(),
        status: 'open'
      },
      {
        id: 'foundational_2',
        question: "Why do customers tolerate the current limitations in our industry?",
        type: 'why',
        stage: 'questioning',
        priority: 'high',
        complexity: 7,
        blueOceanRelevance: true,
        frameworkAlignment: {
          blueOcean: ['Market assumptions', 'Industry boundaries'],
          marketing: ['Customer research', 'Market education'],
          hr: ['Customer insight roles', 'Research capabilities'],
          process: ['Customer feedback loops', 'Research processes'],
          porter: ['Industry forces', 'Customer behavior']
        },
        insights: [],
        explorations: [],
        answers: [],
        relatedQuestions: [],
        createdAt: new Date().toISOString(),
        status: 'open'
      }
    ];

    const allQuestions = [...blueOceanQuestions, ...foundationalQuestions];
    setStrategicQuestions(allQuestions);

    // Create demo inquiry session
    const demoSession: InquirySession = {
      id: 'session_blue_ocean_discovery',
      name: 'Blue Ocean Strategy Discovery Session',
      description: 'Strategic inquiry session to explore Blue Ocean opportunities and challenge industry assumptions',
      objective: 'Identify breakthrough strategic questions that can lead to blue ocean discoveries',
      questions: allQuestions.slice(0, 5).map(q => q.id),
      participants: ['Strategy Team', 'Innovation Team', 'Customer Experience Team'],
      duration: 4,
      insights: [
        'Multiple cross-industry opportunities identified',
        'Significant utility gaps discovered in customer journey',
        'Foundational assumptions about market challenged'
      ],
      outcomes: [
        'Priority strategic questions defined',
        'Exploration roadmap created',
        'Cross-functional collaboration initiated'
      ],
      blueOceanConnections: [
        'Six Paths Analysis insights',
        'Buyer Utility Map findings',
        'Market boundary redefinition'
      ],
      sessionType: 'strategy_development',
      status: 'completed',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    };

    setInquirySessions([demoSession]);
  }, [blueOceanData, insights]);

  // Generate strategic question from input
  const generateStrategicQuestion = () => {
    if (!questionInput.trim()) return;

    const newQuestion: StrategicQuestion = {
      id: `question_${Date.now()}`,
      question: questionInput,
      type: selectedQuestionType,
      stage: 'questioning',
      priority: 'medium',
      complexity: 5,
      blueOceanRelevance: questionInput.toLowerCase().includes('blue ocean') || 
                          questionInput.toLowerCase().includes('market') ||
                          questionInput.toLowerCase().includes('customer'),
      frameworkAlignment: {
        blueOcean: [],
        marketing: [],
        hr: [],
        process: [],
        porter: []
      },
      insights: [],
      explorations: [],
      answers: [],
      relatedQuestions: [],
      createdAt: new Date().toISOString(),
      status: 'open'
    };

    setStrategicQuestions(prev => [...prev, newQuestion]);
    setQuestionInput('');
    
    toast({
      title: "Strategic Question Added!",
      description: `Created new ${selectedQuestionType} question for exploration`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Add insight to question
  const addInsightToQuestion = (questionId: string, insight: string) => {
    const newInsight: QuestionInsight = {
      id: `insight_${Date.now()}`,
      insight: insight,
      source: 'Manual input',
      confidence: 7,
      actionability: 7,
      strategicImplications: [],
      generatedAt: new Date().toISOString()
    };

    setStrategicQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, insights: [...q.insights, newInsight] }
        : q
    ));
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'why': return 'blue';
      case 'what_if': return 'purple';
      case 'how': return 'green';
      case 'foundational': return 'red';
      case 'divergent': return 'orange';
      case 'convergent': return 'teal';
      default: return 'gray';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'questioning': return 'blue';
      case 'ideating': return 'purple';
      case 'experimenting': return 'orange';
      case 'implementing': return 'green';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const renderQuestionsDashboard = () => (
    <VStack spacing={6} align="stretch">
      {/* Integration Status */}
      {hasData && (
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Blue Ocean Inquiry Integration Active</Text>
            <Text fontSize="sm">
              {strategicQuestions.filter(q => q.blueOceanRelevance).length} strategic questions generated from Blue Ocean Strategy insights. 
              Warren Berger's inquiry methodology integrated with strategic frameworks.
            </Text>
          </VStack>
        </Alert>
      )}

      {!hasData && (
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Ready for Blue Ocean Inquiry Integration</Text>
            <Text fontSize="sm">
              Complete Blue Ocean Strategy analysis to automatically generate strategic questions that challenge assumptions and explore opportunities.
            </Text>
          </VStack>
        </Alert>
      )}

      {/* Inquiry Overview Metrics */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {strategicQuestions.length}
            </Text>
            <Text fontSize="sm" color="gray.600">Strategic Questions</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {strategicQuestions.filter(q => q.status === 'answered').length}
            </Text>
            <Text fontSize="sm" color="gray.600">Answered</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="purple.500">
              {strategicQuestions.filter(q => q.blueOceanRelevance).length}
            </Text>
            <Text fontSize="sm" color="gray.600">Blue Ocean Aligned</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="orange.500">
              {strategicQuestions.reduce((sum, q) => sum + q.insights.length, 0)}
            </Text>
            <Text fontSize="sm" color="gray.600">Total Insights</Text>
          </CardBody>
        </Card>
      </Grid>

      {/* Question Creation */}
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Create Strategic Question</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Question Type</FormLabel>
              <Select 
                value={selectedQuestionType} 
                onChange={(e) => setSelectedQuestionType(e.target.value as any)}
              >
                <option value="why">Why Question (Challenge assumptions)</option>
                <option value="what_if">What If Question (Explore possibilities)</option>
                <option value="how">How Question (Find solutions)</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Your Strategic Question</FormLabel>
              <Textarea
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Enter your strategic question..."
                rows={3}
              />
            </FormControl>
            <Button 
              colorScheme="blue" 
              onClick={generateStrategicQuestion}
              isDisabled={!questionInput.trim()}
            >
              Add Strategic Question
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Strategic Questions List */}
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">Strategic Questions</Text>
            <Badge colorScheme="blue">{strategicQuestions.length} questions</Badge>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {strategicQuestions.map(question => (
              <Card key={question.id} bg={infoBg} _hover={{ shadow: 'md' }} cursor="pointer">
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between" align="start">
                      <VStack align="start" spacing={2} flex={1}>
                        <HStack>
                          <Badge colorScheme={getQuestionTypeColor(question.type)} size="sm">
                            {question.type.replace('_', ' ')}
                          </Badge>
                          <Badge colorScheme={getStageColor(question.stage)} size="sm">
                            {question.stage}
                          </Badge>
                          {question.blueOceanRelevance && (
                            <Badge colorScheme="purple" size="sm">🌊 Blue Ocean</Badge>
                          )}
                        </HStack>
                        <Text fontWeight="semibold" fontSize="md">{question.question}</Text>
                        <HStack spacing={4}>
                          <Text fontSize="xs">
                            <strong>Complexity:</strong> {question.complexity}/10
                          </Text>
                          <Text fontSize="xs">
                            <strong>Insights:</strong> {question.insights.length}
                          </Text>
                          <Text fontSize="xs">
                            <strong>Explorations:</strong> {question.explorations.length}
                          </Text>
                        </HStack>
                      </VStack>
                      <VStack align="end" spacing={2}>
                        <Badge colorScheme={getPriorityColor(question.priority)}>
                          {question.priority}
                        </Badge>
                        <Badge colorScheme={question.status === 'answered' ? 'green' : 'gray'} size="sm">
                          {question.status}
                        </Badge>
                        <CircularProgress 
                          value={(question.insights.length + question.explorations.length) * 20} 
                          size="40px" 
                          color="blue.400"
                        >
                          <CircularProgressLabel fontSize="10px">
                            {Math.min(100, (question.insights.length + question.explorations.length) * 20)}%
                          </CircularProgressLabel>
                        </CircularProgress>
                      </VStack>
                    </HStack>

                    {/* Question Insights */}
                    {question.insights.length > 0 && (
                      <Box p={3} bg="blue.50" borderRadius="md">
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>Latest Insights:</Text>
                        <VStack align="start" spacing={1}>
                          {question.insights.slice(0, 2).map(insight => (
                            <Text key={insight.id} fontSize="sm">
                              • {insight.insight}
                            </Text>
                          ))}
                          {question.insights.length > 2 && (
                            <Text fontSize="xs" color="gray.600">
                              +{question.insights.length - 2} more insights
                            </Text>
                          )}
                        </VStack>
                      </Box>
                    )}

                    {/* Framework Alignment */}
                    {question.blueOceanRelevance && (
                      <Box p={3} bg="purple.50" borderRadius="md">
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>Blue Ocean Alignment:</Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {question.frameworkAlignment.blueOcean.map((alignment, index) => (
                            <Badge key={index} colorScheme="purple" size="xs">
                              {alignment}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))}
            {strategicQuestions.length === 0 && (
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  No strategic questions yet. Create questions manually or complete Blue Ocean Strategy analysis to auto-generate inquiry opportunities.
                </Text>
              </Alert>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderQuestionTemplates = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Warren Berger's Question Framework</Text>
          <Text fontSize="sm">
            Strategic question templates based on "A More Beautiful Question" methodology to catalyze breakthrough thinking.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {/* Why Questions */}
        <Card bg={cardBg}>
          <CardHeader>
            <VStack align="start" spacing={1}>
              <HStack>
                <Text fontSize="lg">❓</Text>
                <Text fontSize="lg" fontWeight="bold" color="blue.600">Why Questions</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">Challenge assumptions and get to root causes</Text>
            </VStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {questionTemplates.why.map((template, index) => (
                <Box key={index} p={3} bg={infoBg} borderRadius="md" cursor="pointer">
                  <Text fontSize="sm">{template}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* What If Questions */}
        <Card bg={cardBg}>
          <CardHeader>
            <VStack align="start" spacing={1}>
              <HStack>
                <Text fontSize="lg">💭</Text>
                <Text fontSize="lg" fontWeight="bold" color="purple.600">What If Questions</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">Explore possibilities and imagine alternatives</Text>
            </VStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {questionTemplates.what_if.map((template, index) => (
                <Box key={index} p={3} bg={infoBg} borderRadius="md" cursor="pointer">
                  <Text fontSize="sm">{template}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* How Questions */}
        <Card bg={cardBg}>
          <CardHeader>
            <VStack align="start" spacing={1}>
              <HStack>
                <Text fontSize="lg">🔧</Text>
                <Text fontSize="lg" fontWeight="bold" color="green.600">How Questions</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">Find practical solutions and implementation paths</Text>
            </VStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {questionTemplates.how.map((template, index) => (
                <Box key={index} p={3} bg={infoBg} borderRadius="md" cursor="pointer">
                  <Text fontSize="sm">{template}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Blue Ocean Strategic Questions</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              Questions specifically generated from your Blue Ocean Strategy analysis to explore breakthrough opportunities:
            </Text>
            {strategicQuestions
              .filter(q => q.blueOceanRelevance)
              .slice(0, 5)
              .map(question => (
                <Box key={question.id} p={4} bg={successBg} borderRadius="md">
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">{question.question}</Text>
                      <HStack>
                        <Badge colorScheme={getQuestionTypeColor(question.type)} size="xs">
                          {question.type.replace('_', ' ')}
                        </Badge>
                        <Badge colorScheme="purple" size="xs">
                          Blue Ocean
                        </Badge>
                      </HStack>
                    </VStack>
                    <Badge colorScheme={getPriorityColor(question.priority)} size="sm">
                      {question.priority}
                    </Badge>
                  </HStack>
                </Box>
              ))}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderInquirySessions = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="success">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Strategic Inquiry Sessions</Text>
          <Text fontSize="sm">
            Collaborative sessions to explore strategic questions and generate breakthrough insights using structured inquiry methodology.
          </Text>
        </VStack>
      </Alert>

      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">Inquiry Sessions</Text>
            <Button size="sm" colorScheme="blue">
              Plan New Session
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {inquirySessions.map(session => (
              <Card key={session.id} bg={infoBg}>
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between" align="start">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="lg" fontWeight="bold">{session.name}</Text>
                        <Text fontSize="sm" color="gray.600">{session.description}</Text>
                        <Badge colorScheme="purple" size="sm">
                          {session.sessionType.replace('_', ' ')}
                        </Badge>
                      </VStack>
                      <VStack align="end" spacing={1}>
                        <Badge colorScheme={session.status === 'completed' ? 'green' : 'blue'}>
                          {session.status}
                        </Badge>
                        <Text fontSize="xs" color="gray.500">
                          {session.duration}h duration
                        </Text>
                      </VStack>
                    </HStack>

                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>Objective:</Text>
                      <Text fontSize="sm" color="gray.600">{session.objective}</Text>
                    </Box>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>Questions Explored:</Text>
                        <Text fontSize="sm" color="gray.600">{session.questions.length} questions</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>Participants:</Text>
                        <VStack align="start" spacing={1}>
                          {session.participants.map((participant, index) => (
                            <Badge key={index} size="sm" variant="outline">
                              {participant}
                            </Badge>
                          ))}
                        </VStack>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>Blue Ocean Connections:</Text>
                        <VStack align="start" spacing={1}>
                          {session.blueOceanConnections.slice(0, 2).map((connection, index) => (
                            <Text key={index} fontSize="xs" color="purple.600">
                              • {connection}
                            </Text>
                          ))}
                        </VStack>
                      </Box>
                    </Grid>

                    {session.status === 'completed' && (
                      <Box p={3} bg="green.50" borderRadius="md">
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>Key Outcomes:</Text>
                        <VStack align="start" spacing={1}>
                          {session.outcomes.map((outcome, index) => (
                            <Text key={index} fontSize="sm">• {outcome}</Text>
                          ))}
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">🧠</Text>
            <Text fontSize="3xl" fontWeight="bold">Inquiry Framework</Text>
            <Badge colorScheme="green" ml={2}>WARREN BERGER METHODOLOGY</Badge>
          </HStack>
          <Text color="gray.600" mb={6}>
            Strategic question orchestrator powered by Warren Berger's "A More Beautiful Question" methodology. Generate breakthrough insights through systematic inquiry and Blue Ocean Strategy integration.
          </Text>
        </Box>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Strategic Questions</Tab>
            <Tab>Question Templates</Tab>
            <Tab>Inquiry Sessions</Tab>
            <Tab>Insight Synthesis</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderQuestionsDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              {renderQuestionTemplates()}
            </TabPanel>
            <TabPanel px={0}>
              {renderInquirySessions()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Advanced insight synthesis and pattern recognition across all strategic questions coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default InquiryFrameworkOrchestrator;