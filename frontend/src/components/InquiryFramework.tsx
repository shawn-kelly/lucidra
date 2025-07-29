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
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

// Lucidra Inquiry Framework Data Structures
interface InquirySession {
  id: string;
  title: string;
  context: 'strategic_planning' | 'project_management' | 'marketing_strategy' | 'process_improvement' | 'innovation';
  stage: 'why' | 'what_if' | 'how';
  questions: InquiryQuestion[];
  insights: string[];
  actionItems: ActionItem[];
  participants: string[];
  createdAt: string;
  lastUpdated: string;
  integrations: FrameworkIntegration[];
}

interface InquiryQuestion {
  id: string;
  stage: 'why' | 'what_if' | 'how';
  question: string;
  responses: string[];
  followUpQuestions: string[];
  insights: string[];
  priority: 'high' | 'medium' | 'low';
  category: string;
  linkedFrameworks: string[];
}

interface ActionItem {
  id: string;
  description: string;
  owner: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  linkedQuestion: string;
  status: 'pending' | 'in_progress' | 'completed';
  framework: string;
}

interface FrameworkIntegration {
  frameworkType: 'blue_ocean' | 'porter_forces' | 'hr_management' | 'marketing_automation' | 'process_improvement';
  connectionType: 'question_source' | 'insight_target' | 'action_integration';
  description: string;
  autoTrigger: boolean;
}

interface QuestionTemplate {
  id: string;
  stage: 'why' | 'what_if' | 'how';
  context: string;
  template: string;
  examples: string[];
  integrationPoints: string[];
}

// Beautiful Questions Template Library
const QUESTION_TEMPLATES: QuestionTemplate[] = [
  // WHY Stage Templates
  {
    id: 'why_001',
    stage: 'why',
    context: 'strategic_planning',
    template: 'Why are we pursuing this strategy?',
    examples: [
      'Why do we believe this is our best opportunity?',
      'Why hasn\'t this market been addressed before?',
      'Why is this the right time for this initiative?'
    ],
    integrationPoints: ['Blue Ocean Strategy', 'Competitive Analysis']
  },
  {
    id: 'why_002',
    stage: 'why',
    context: 'process_improvement',
    template: 'Why does this process exist in its current form?',
    examples: [
      'Why do we do this step manually?',
      'Why does this handoff create delays?',
      'Why haven\'t we automated this?'
    ],
    integrationPoints: ['Process Improvement', 'Operational Efficiency']
  },
  {
    id: 'why_003',
    stage: 'why',
    context: 'marketing_strategy',
    template: 'Why isn\'t our message resonating?',
    examples: [
      'Why are customers choosing competitors?',
      'Why is our conversion rate low?',
      'Why don\'t customers understand our value?'
    ],
    integrationPoints: ['Marketing Automation', 'Customer Segmentation']
  },

  // WHAT IF Stage Templates
  {
    id: 'what_if_001',
    stage: 'what_if',
    context: 'strategic_planning',
    template: 'What if we approached this completely differently?',
    examples: [
      'What if we targeted a different market segment?',
      'What if we partnered instead of competing?',
      'What if we gave away our core product for free?'
    ],
    integrationPoints: ['Blue Ocean Strategy', 'Innovation']
  },
  {
    id: 'what_if_002',
    stage: 'what_if',
    context: 'process_improvement',
    template: 'What if we eliminated this step entirely?',
    examples: [
      'What if we automated the entire workflow?',
      'What if customers could self-serve?',
      'What if we reversed the process order?'
    ],
    integrationPoints: ['Process Improvement', 'Automation']
  },
  {
    id: 'what_if_003',
    stage: 'what_if',
    context: 'marketing_strategy',
    template: 'What if we flipped our messaging approach?',
    examples: [
      'What if we focused on emotional benefits?',
      'What if we targeted decision influencers instead?',
      'What if we used competitors\' strengths against them?'
    ],
    integrationPoints: ['Marketing Automation', 'Positioning']
  },

  // HOW Stage Templates
  {
    id: 'how_001',
    stage: 'how',
    context: 'strategic_planning',
    template: 'How might we test this hypothesis quickly?',
    examples: [
      'How can we validate demand with minimal investment?',
      'How will we measure success?',
      'How can we adapt if assumptions prove wrong?'
    ],
    integrationPoints: ['Strategic Planning', 'Metrics']
  },
  {
    id: 'how_002',
    stage: 'how',
    context: 'process_improvement',
    template: 'How might we pilot this improvement?',
    examples: [
      'How can we test with a small subset?',
      'How will we measure the impact?',
      'How do we scale if successful?'
    ],
    integrationPoints: ['Process Improvement', 'Change Management']
  },
  {
    id: 'how_003',
    stage: 'how',
    context: 'marketing_strategy',
    template: 'How might we test different approaches?',
    examples: [
      'How can we A/B test our messaging?',
      'How will we track engagement improvements?',
      'How do we optimize based on results?'
    ],
    integrationPoints: ['Marketing Automation', 'Analytics']
  }
];

// Meta-Prompts for Strategic Questioning
const META_PROMPTS = [
  "What's the most important question we're not asking?",
  "Are we solving the right problem?",
  "What assumptions are we making?",
  "Who benefits from the current approach—and who doesn't?",
  "What would a complete beginner question?",
  "What if we had unlimited resources?",
  "What if we had no resources?",
  "How might our biggest competitor approach this?",
  "What would our customers ask if they were in this meeting?",
  "What question would unlock the most value?"
];

// Inquiry Framework Component
const InquiryFramework: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const [sessions, setSessions] = useState<InquirySession[]>([]);
  const [activeSession, setActiveSession] = useState<InquirySession | null>(null);
  const [currentStage, setCurrentStage] = useState<'why' | 'what_if' | 'how'>('why');
  const [selectedContext, setSelectedContext] = useState('strategic_planning');
  const [activeTab, setActiveTab] = useState(0);

  const { isOpen: isSessionOpen, onOpen: onSessionOpen, onClose: onSessionClose } = useDisclosure();
  const { isOpen: isQuestionOpen, onOpen: onQuestionOpen, onClose: onQuestionClose } = useDisclosure();
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');
  const stageColors = {
    why: 'red',
    what_if: 'orange', 
    how: 'green'
  };

  // Initialize demo inquiry session
  useEffect(() => {
    const demoSession: InquirySession = {
      id: 'session_001',
      title: 'Strategic Market Positioning Review',
      context: 'strategic_planning',
      stage: 'why',
      questions: [
        {
          id: 'q_001',
          stage: 'why',
          question: 'Why are we losing market share to smaller competitors?',
          responses: [
            'They offer more personalized service',
            'Their pricing is more transparent',
            'They move faster on customer requests'
          ],
          followUpQuestions: [
            'Why can\'t we match their personalization?',
            'Why is our pricing structure complex?',
            'Why do our processes take longer?'
          ],
          insights: [
            'Size might be working against us',
            'Need to examine internal bureaucracy',
            'Customer experience gaps identified'
          ],
          priority: 'high',
          category: 'competitive_analysis',
          linkedFrameworks: ['Blue Ocean Strategy', 'Porter Five Forces']
        },
        {
          id: 'q_002',
          stage: 'what_if',
          question: 'What if we created a new category instead of competing directly?',
          responses: [
            'Could focus on outcomes rather than features',
            'Might bundle services differently',
            'Could target underserved segments'
          ],
          followUpQuestions: [
            'What if we guaranteed results?',
            'What if we charged based on value delivered?',
            'What if we partnered with complementary services?'
          ],
          insights: [
            'Blue ocean opportunity in outcome-based pricing',
            'Potential for service bundling innovation',
            'Underserved market segments exist'
          ],
          priority: 'high',
          category: 'innovation',
          linkedFrameworks: ['Blue Ocean Strategy', 'Marketing Automation']
        }
      ],
      insights: [
        'Market competition is driving commoditization',
        'Customer experience is the new battleground',
        'Opportunity exists for category creation'
      ],
      actionItems: [
        {
          id: 'action_001',
          description: 'Conduct customer experience audit',
          owner: 'Customer Success Team',
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          priority: 'high',
          linkedQuestion: 'q_001',
          status: 'pending',
          framework: 'Process Improvement'
        },
        {
          id: 'action_002',
          description: 'Explore outcome-based pricing models',
          owner: 'Strategy Team',
          dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          priority: 'medium',
          linkedQuestion: 'q_002',
          status: 'pending',
          framework: 'Blue Ocean Strategy'
        }
      ],
      participants: ['Strategy Director', 'Marketing Manager', 'Customer Success Lead'],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      integrations: [
        {
          frameworkType: 'blue_ocean',
          connectionType: 'insight_target',
          description: 'Questions feed into Blue Ocean value innovation analysis',
          autoTrigger: true
        },
        {
          frameworkType: 'marketing_automation',
          connectionType: 'action_integration',
          description: 'Customer insights drive campaign optimization',
          autoTrigger: false
        }
      ]
    };

    setSessions([demoSession]);
    setActiveSession(demoSession);
  }, []);

  const getStageIcon = (stage: 'why' | 'what_if' | 'how') => {
    switch (stage) {
      case 'why': return '🧠';
      case 'what_if': return '💡';
      case 'how': return '🔧';
      default: return '❓';
    }
  };

  const getContextIcon = (context: string) => {
    switch (context) {
      case 'strategic_planning': return '🎯';
      case 'project_management': return '📋';
      case 'marketing_strategy': return '📈';
      case 'process_improvement': return '🔄';
      case 'innovation': return '💡';
      default: return '🧩';
    }
  };

  const renderInquiryWorkspace = () => (
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
      <VStack spacing={6} align="stretch">
        {/* Stage Navigation */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">Why → What If → How Framework</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {(['why', 'what_if', 'how'] as const).map(stage => (
                <Button
                  key={stage}
                  variant={currentStage === stage ? 'solid' : 'outline'}
                  colorScheme={stageColors[stage]}
                  onClick={() => setCurrentStage(stage)}
                  flexDirection="column"
                  h="auto"
                  py={4}
                >
                  <Text fontSize="2xl" mb={2}>{getStageIcon(stage)}</Text>
                  <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
                    {stage.replace('_', ' ')}
                  </Text>
                  <Text fontSize="xs" textAlign="center" mt={1}>
                    {stage === 'why' && 'Challenge assumptions'}
                    {stage === 'what_if' && 'Imagine alternatives'}
                    {stage === 'how' && 'Turn ideas to action'}
                  </Text>
                </Button>
              ))}
            </Grid>
          </CardBody>
        </Card>

        {/* Current Stage Questions */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <HStack>
                <Text fontSize="xl">{getStageIcon(currentStage)}</Text>
                <Text fontSize="lg" fontWeight="bold">
                  {currentStage.replace('_', ' ').toUpperCase()} Questions
                </Text>
              </HStack>
              <Button colorScheme={stageColors[currentStage]} size="sm" onClick={onQuestionOpen}>
                + Add Question
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {activeSession?.questions
                .filter(q => q.stage === currentStage)
                .map(question => (
                  <Card key={question.id} p={4} border="1px" borderColor="gray.200">
                    <VStack align="start" spacing={3}>
                      <HStack justify="space-between" w="full">
                        <Text fontWeight="semibold">{question.question}</Text>
                        <Badge colorScheme={stageColors[question.stage]}>
                          {question.priority}
                        </Badge>
                      </HStack>
                      
                      {question.responses.length > 0 && (
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold" mb={2}>Responses:</Text>
                          <VStack align="start" spacing={1}>
                            {question.responses.map((response, idx) => (
                              <Text key={idx} fontSize="sm" color="gray.600">
                                • {response}
                              </Text>
                            ))}
                          </VStack>
                        </Box>
                      )}

                      {question.followUpQuestions.length > 0 && (
                        <Box>
                          <Text fontSize="sm" fontWeight="semibold" mb={2}>Follow-up Questions:</Text>
                          <VStack align="start" spacing={1}>
                            {question.followUpQuestions.map((followUp, idx) => (
                              <Text key={idx} fontSize="sm" color="blue.600">
                                → {followUp}
                              </Text>
                            ))}
                          </VStack>
                        </Box>
                      )}

                      <HStack spacing={2}>
                        {question.linkedFrameworks.map(framework => (
                          <Badge key={framework} size="sm" colorScheme="purple" variant="outline">
                            {framework}
                          </Badge>
                        ))}
                      </HStack>
                    </VStack>
                  </Card>
                ))}
              
              {activeSession?.questions.filter(q => q.stage === currentStage).length === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  <Text fontSize="sm">
                    No {currentStage.replace('_', ' ')} questions yet. Click "Add Question" to start your inquiry.
                  </Text>
                </Alert>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Question Templates */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Question Templates</Text>
              <Button size="sm" variant="outline" onClick={onTemplateOpen}>
                View All Templates
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {QUESTION_TEMPLATES
                .filter(template => template.stage === currentStage)
                .slice(0, 3)
                .map(template => (
                  <Box key={template.id} p={3} bg={infoBg} borderRadius="md">
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>{template.template}</Text>
                    <Text fontSize="xs" color="gray.600" mb={2}>
                      Context: {template.context.replace('_', ' ')}
                    </Text>
                    <Text fontSize="xs" color="blue.600">
                      Example: {template.examples[0]}
                    </Text>
                  </Box>
                ))}
            </VStack>
          </CardBody>
        </Card>
      </VStack>

      <VStack spacing={6} align="stretch">
        {/* Meta-Prompts */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🧬 Meta-Prompts</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" color="gray.600" mb={2}>
                Questions to ask about your questions:
              </Text>
              {META_PROMPTS.slice(0, 5).map((prompt, idx) => (
                <Box key={idx} p={2} bg={successBg} borderRadius="md" fontSize="sm">
                  {prompt}
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Insights & Actions */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">💡 Insights & Actions</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Key Insights:</Text>
                <VStack align="start" spacing={1}>
                  {activeSession?.insights.map((insight, idx) => (
                    <Text key={idx} fontSize="sm" color="gray.600">
                      • {insight}
                    </Text>
                  ))}
                </VStack>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Action Items:</Text>
                <VStack spacing={2} align="stretch">
                  {activeSession?.actionItems.map(action => (
                    <Box key={action.id} p={2} border="1px" borderColor="gray.200" borderRadius="md">
                      <Text fontSize="sm" fontWeight="semibold">{action.description}</Text>
                      <HStack justify="space-between" mt={1}>
                        <Text fontSize="xs" color="gray.500">{action.owner}</Text>
                        <Badge size="sm" colorScheme={action.priority === 'high' ? 'red' : 'blue'}>
                          {action.priority}
                        </Badge>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Framework Integrations */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🔗 Framework Integrations</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {activeSession?.integrations.map((integration, idx) => (
                <Box key={idx} p={3} bg={infoBg} borderRadius="md">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm" fontWeight="semibold">
                      {integration.frameworkType.replace('_', ' ')}
                    </Text>
                    <Switch isChecked={integration.autoTrigger} size="sm" />
                  </HStack>
                  <Text fontSize="xs" color="gray.600">
                    {integration.description}
                  </Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Grid>
  );

  const renderQuestionLibrary = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Beautiful Question Templates</Text>
          <Text fontSize="sm">
            Pre-built question templates based on Warren Berger's research into the power of inquiry.
          </Text>
        </VStack>
      </Alert>

      <Accordion allowMultiple>
        {(['why', 'what_if', 'how'] as const).map(stage => (
          <AccordionItem key={stage}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <HStack>
                  <Text fontSize="lg">{getStageIcon(stage)}</Text>
                  <Text fontWeight="semibold">{stage.replace('_', ' ').toUpperCase()} Questions</Text>
                  <Badge colorScheme={stageColors[stage]}>
                    {QUESTION_TEMPLATES.filter(t => t.stage === stage).length} templates
                  </Badge>
                </HStack>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                {QUESTION_TEMPLATES
                  .filter(template => template.stage === stage)
                  .map(template => (
                    <Card key={template.id} p={4} bg={infoBg}>
                      <VStack align="start" spacing={3}>
                        <Text fontSize="sm" fontWeight="semibold">{template.template}</Text>
                        <Badge size="sm" colorScheme="blue">
                          {template.context.replace('_', ' ')}
                        </Badge>
                        <Box>
                          <Text fontSize="xs" fontWeight="semibold" mb={1}>Examples:</Text>
                          {template.examples.map((example, idx) => (
                            <Text key={idx} fontSize="xs" color="gray.600" mb={1}>
                              • {example}
                            </Text>
                          ))}
                        </Box>
                        <Button size="xs" colorScheme={stageColors[stage]} variant="outline">
                          Use Template
                        </Button>
                      </VStack>
                    </Card>
                  ))}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">🧠</Text>
            <Text fontSize="3xl" fontWeight="bold">Lucidra Inquiry Framework</Text>
          </HStack>
          <Text color="gray.600" mb={6}>
            Based on "A More Beautiful Question" by Warren Berger - Better questions unlock better strategies, solutions, and execution
          </Text>
        </Box>

        {/* Core Concept */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">The Why → What If → How Model</Text>
            <Text fontSize="sm">
              Challenge assumptions (Why) → Imagine alternatives (What If) → Turn ideas into action (How)
            </Text>
          </VStack>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Inquiry Workspace</Tab>
            <Tab>Question Library</Tab>
            <Tab>Integration Hub</Tab>
            <Tab>Sessions & Analytics</Tab>
            <Tab>AI Response Schema</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderInquiryWorkspace()}
            </TabPanel>
            <TabPanel px={0}>
              {renderQuestionLibrary()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Framework integration hub with Blue Ocean, HR, Marketing, and Process Improvement connections coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Session analytics and inquiry pattern analysis coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>AI response schema for automated question generation and analysis coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Question Creation Modal */}
      <Modal isOpen={isQuestionOpen} onClose={onQuestionClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Beautiful Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  Create powerful questions that challenge assumptions and unlock new possibilities.
                </Text>
              </Alert>

              <FormControl>
                <FormLabel>Question Stage</FormLabel>
                <Select value={currentStage} onChange={(e) => setCurrentStage(e.target.value as any)}>
                  <option value="why">WHY - Challenge assumptions</option>
                  <option value="what_if">WHAT IF - Imagine alternatives</option>
                  <option value="how">HOW - Turn ideas to action</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Context</FormLabel>
                <Select value={selectedContext} onChange={(e) => setSelectedContext(e.target.value)}>
                  <option value="strategic_planning">Strategic Planning</option>
                  <option value="project_management">Project Management</option>
                  <option value="marketing_strategy">Marketing Strategy</option>
                  <option value="process_improvement">Process Improvement</option>
                  <option value="innovation">Innovation</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Your Question</FormLabel>
                <Textarea
                  placeholder="What question will unlock new insights?"
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onQuestionClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onQuestionClose}>
              Add Question
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InquiryFramework;