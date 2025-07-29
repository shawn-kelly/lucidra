import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Select,
  Alert,
  AlertIcon,
  Progress,
  Badge,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  IconButton,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Tooltip,
  Stack,
  Checkbox,
  Avatar,
  AvatarGroup,
  Tag,
  TagLabel,
  TagCloseButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useToast
} from '@chakra-ui/react';

// Core data structures
interface CollaborationSession {
  id: string;
  name: string;
  description: string;
  type: 'async-review' | 'structured-feedback' | 'assumption-challenge' | 'progress-review';
  status: 'draft' | 'active' | 'completed' | 'archived';
  owner: TeamMember;
  participants: TeamMember[];
  startDate: Date;
  endDate?: Date;
  framework: 'blue-ocean' | 'porter' | 'general';
  objectives: string[];
  deliverables: string[];
  collaborationRhythm: CollaborationRhythm;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
  expertise: string[];
  timezone: string;
  availability: 'available' | 'busy' | 'away';
}

interface CommentBlock {
  id: string;
  sessionId: string;
  type: 'assumption-challenge' | 'strategic-feedback' | 'risk-identification' | 'opportunity-discovery' | 'implementation-concern';
  content: string;
  author: TeamMember;
  timestamp: Date;
  framework: 'blue-ocean' | 'porter' | 'general';
  context: string; // What part of the strategy this relates to
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'addressed' | 'dismissed' | 'resolved';
  responses: CommentResponse[];
  votes: Vote[];
  actionItems: ActionItem[];
}

interface CommentResponse {
  id: string;
  content: string;
  author: TeamMember;
  timestamp: Date;
  type: 'clarification' | 'agreement' | 'disagreement' | 'alternative' | 'data';
}

interface Vote {
  id: string;
  userId: string;
  type: 'upvote' | 'downvote' | 'critical' | 'insightful';
  timestamp: Date;
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignee: TeamMember;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'completed' | 'blocked';
  dependencies: string[];
  framework: 'blue-ocean' | 'porter' | 'general';
}

interface CollaborationRhythm {
  dailyStandups: {
    enabled: boolean;
    time: string;
    duration: number; // minutes
    format: 'async' | 'sync';
    participants: string[];
  };
  weeklyRetros: {
    enabled: boolean;
    day: string;
    time: string;
    duration: number;
    format: 'async' | 'sync';
    focus: 'assumptions' | 'progress' | 'blockers' | 'opportunities';
  };
  reviewCycles: {
    frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly';
    reviewers: string[];
    criteria: string[];
  };
}

interface ProgressDashboard {
  sessionId: string;
  metrics: {
    totalComments: number;
    assumptionsChallenged: number;
    actionItemsCreated: number;
    actionItemsCompleted: number;
    participationRate: number;
    consensusScore: number;
  };
  heatmap: {
    [date: string]: {
      comments: number;
      engagement: number;
      decisions: number;
    };
  };
  topContributors: {
    member: TeamMember;
    contributionScore: number;
    insights: number;
  }[];
  frameworkUsage: {
    blueOcean: number;
    porter: number;
    general: number;
  };
}

// Framework-specific prompts
const ASSUMPTION_CHALLENGE_PROMPTS = {
  'blue-ocean': [
    'What industry assumptions are we taking for granted?',
    'Are we sure customers actually value what we think they value?',
    'Which "best practices" might actually be limiting us?',
    'What would happen if we eliminated this completely?',
    'Why hasn\'t anyone in our industry tried this approach?'
  ],
  'porter': [
    'How might new entrants disrupt our advantage?',
    'Are we overestimating our differentiation?',
    'Which supplier dependencies are we ignoring?',
    'What substitute solutions are emerging?',
    'Where might we be vulnerable to price competition?'
  ],
  'general': [
    'What evidence supports this assumption?',
    'Under what conditions would this be false?',
    'Who might disagree with this perspective?',
    'What are we not considering?',
    'How could this backfire?'
  ]
};

const COLLABORATION_TEMPLATES = [
  {
    name: 'Strategy Review Session',
    type: 'async-review' as const,
    description: 'Comprehensive review of strategic initiatives with structured feedback',
    duration: 7, // days
    framework: 'general' as const,
    objectives: [
      'Review strategic alignment',
      'Identify implementation risks',
      'Validate assumptions',
      'Optimize resource allocation'
    ]
  },
  {
    name: 'Blue Ocean Assumption Challenge',
    type: 'assumption-challenge' as const,
    description: 'Challenge industry assumptions using Blue Ocean methodology',
    duration: 3,
    framework: 'blue-ocean' as const,
    objectives: [
      'Challenge industry assumptions',
      'Identify value innovation opportunities',
      'Explore ERRC possibilities',
      'Validate customer value propositions'
    ]
  },
  {
    name: 'Competitive Position Review',
    type: 'structured-feedback' as const,
    description: 'Analyze competitive positioning using Porter\'s frameworks',
    duration: 5,
    framework: 'porter' as const,
    objectives: [
      'Assess competitive advantages',
      'Identify competitive threats',
      'Evaluate strategic positioning',
      'Plan competitive responses'
    ]
  }
];

const TeamCollaboration: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<CollaborationSession | null>(null);
  const [sessions, setSessions] = useState<CollaborationSession[]>([]);
  const [commentBlocks, setCommentBlocks] = useState<CommentBlock[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [filterFramework, setFilterFramework] = useState<'all' | 'blue-ocean' | 'porter' | 'general'>('all');
  const [newComment, setNewComment] = useState('');
  const [selectedCommentType, setSelectedCommentType] = useState<CommentBlock['type']>('strategic-feedback');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // Mock data
  const mockTeamMembers: TeamMember[] = [
    {
      id: 'user1',
      name: 'Sarah Chen',
      role: 'Strategy Lead',
      email: 'sarah@company.com',
      expertise: ['Blue Ocean Strategy', 'Market Analysis'],
      timezone: 'PST',
      availability: 'available'
    },
    {
      id: 'user2',
      name: 'Mike Rodriguez',
      role: 'Product Manager',
      email: 'mike@company.com',
      expertise: ['Product Strategy', 'Competitive Analysis'],
      timezone: 'EST',
      availability: 'busy'
    },
    {
      id: 'user3',
      name: 'Lisa Wong',
      role: 'Operations Director',
      email: 'lisa@company.com',
      expertise: ['Operations', 'Process Optimization'],
      timezone: 'PST',
      availability: 'available'
    }
  ];

  // Async Feedback System
  const AsyncFeedbackSystem = () => {
    const addCommentBlock = () => {
      if (!newComment.trim() || !currentSession) return;

      const commentBlock: CommentBlock = {
        id: `comment_${Date.now()}`,
        sessionId: currentSession.id,
        type: selectedCommentType,
        content: newComment,
        author: mockTeamMembers[0], // Current user
        timestamp: new Date(),
        framework: currentSession.framework,
        context: 'Strategy Review',
        tags: [],
        priority: 'medium',
        status: 'open',
        responses: [],
        votes: [],
        actionItems: []
      };

      setCommentBlocks(prev => [...prev, commentBlock]);
      setNewComment('');
      
      toast({
        title: 'Comment added',
        description: 'Your feedback has been submitted for async review',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    };

    const getCommentTypeColor = (type: CommentBlock['type']) => {
      switch (type) {
        case 'assumption-challenge': return 'red';
        case 'strategic-feedback': return 'blue';
        case 'risk-identification': return 'orange';
        case 'opportunity-discovery': return 'green';
        case 'implementation-concern': return 'purple';
        default: return 'gray';
      }
    };

    const filteredComments = commentBlocks.filter(comment => 
      filterFramework === 'all' || comment.framework === filterFramework
    );

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">💬 Async Feedback System</Text>
              <HStack>
                <Select 
                  size="sm" 
                  value={filterFramework} 
                  onChange={(e) => setFilterFramework(e.target.value as any)}
                  w="150px"
                >
                  <option value="all">All Frameworks</option>
                  <option value="blue-ocean">Blue Ocean</option>
                  <option value="porter">Porter</option>
                  <option value="general">General</option>
                </Select>
              </HStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {/* Add Comment Form */}
              <Card w="100%" bg="blue.50" border="1px solid" borderColor="blue.200">
                <CardBody>
                  <VStack spacing={3}>
                    <FormControl>
                      <FormLabel>Comment Type</FormLabel>
                      <Select 
                        value={selectedCommentType} 
                        onChange={(e) => setSelectedCommentType(e.target.value as CommentBlock['type'])}
                      >
                        <option value="strategic-feedback">Strategic Feedback</option>
                        <option value="assumption-challenge">Assumption Challenge</option>
                        <option value="risk-identification">Risk Identification</option>
                        <option value="opportunity-discovery">Opportunity Discovery</option>
                        <option value="implementation-concern">Implementation Concern</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Your Feedback</FormLabel>
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts, challenge assumptions, or provide strategic insights..."
                        rows={3}
                      />
                    </FormControl>
                    
                    <HStack justify="space-between" w="100%">
                      <Text fontSize="sm" color="gray.500">
                        Framework: {currentSession?.framework || 'general'}
                      </Text>
                      <Button 
                        colorScheme="blue" 
                        size="sm"
                        onClick={addCommentBlock}
                        isDisabled={!newComment.trim()}
                      >
                        Submit Feedback
                      </Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>

              {/* Comment Blocks */}
              <VStack spacing={4} w="100%">
                {filteredComments.map((comment) => (
                  <Card key={comment.id} w="100%" variant="outline">
                    <CardHeader>
                      <HStack justify="space-between">
                        <HStack>
                          <Avatar size="sm" name={comment.author.name} />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="semibold" fontSize="sm">{comment.author.name}</Text>
                            <Text fontSize="xs" color="gray.500">{comment.author.role}</Text>
                          </VStack>
                          <Badge colorScheme={getCommentTypeColor(comment.type)} variant="subtle">
                            {comment.type.replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline">{comment.framework}</Badge>
                        </HStack>
                        <VStack align="end" spacing={0}>
                          <Text fontSize="xs" color="gray.500">
                            {comment.timestamp.toLocaleDateString()}
                          </Text>
                          <Badge colorScheme={
                            comment.priority === 'critical' ? 'red' :
                            comment.priority === 'high' ? 'orange' :
                            comment.priority === 'medium' ? 'yellow' : 'green'
                          }>
                            {comment.priority}
                          </Badge>
                        </VStack>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <Text fontSize="sm" mb={3}>{comment.content}</Text>
                      
                      <HStack justify="space-between">
                        <HStack>
                          <Button size="xs" variant="ghost" leftIcon={<Text>👍</Text>}>
                            {comment.votes.filter(v => v.type === 'upvote').length}
                          </Button>
                          <Button size="xs" variant="ghost" leftIcon={<Text>💡</Text>}>
                            Insight
                          </Button>
                          <Button size="xs" variant="ghost" leftIcon={<Text>💬</Text>}>
                            Reply ({comment.responses.length})
                          </Button>
                        </HStack>
                        <HStack>
                          <Button size="xs" colorScheme="green">Create Action</Button>
                          <Button size="xs" variant="outline">Challenge</Button>
                        </HStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  // Action Tracking System
  const ActionTrackingSystem = () => {
    const mockActionItems: ActionItem[] = [
      {
        id: 'action1',
        title: 'Validate customer value assumption',
        description: 'Conduct customer interviews to validate our assumptions about value proposition',
        assignee: mockTeamMembers[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'in-progress',
        dependencies: [],
        framework: 'blue-ocean'
      },
      {
        id: 'action2',
        title: 'Analyze competitive response strategies',
        description: 'Develop contingency plans for potential competitive responses',
        assignee: mockTeamMembers[1],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        status: 'open',
        dependencies: ['action1'],
        framework: 'porter'
      }
    ];

    return (
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">📋 Action Tracking</Text>
            <Button size="sm" colorScheme="teal">+ New Action</Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Action</Th>
                <Th>Assignee</Th>
                <Th>Framework</Th>
                <Th>Priority</Th>
                <Th>Due Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mockActionItems.map((action) => (
                <Tr key={action.id}>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" fontSize="sm">{action.title}</Text>
                      <Text fontSize="xs" color="gray.500">{action.description}</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack>
                      <Avatar size="xs" name={action.assignee.name} />
                      <Text fontSize="sm">{action.assignee.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={action.framework === 'blue-ocean' ? 'blue' : 'green'}>
                      {action.framework}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={
                      action.priority === 'critical' ? 'red' :
                      action.priority === 'high' ? 'orange' :
                      action.priority === 'medium' ? 'yellow' : 'green'
                    }>
                      {action.priority}
                    </Badge>
                  </Td>
                  <Td>{action.dueDate.toLocaleDateString()}</Td>
                  <Td>
                    <Badge colorScheme={
                      action.status === 'completed' ? 'green' :
                      action.status === 'blocked' ? 'red' :
                      action.status === 'in-progress' ? 'blue' : 'gray'
                    }>
                      {action.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  };

  // Collaboration Rhythm Settings
  const CollaborationRhythm = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <Text fontSize="lg" fontWeight="bold">🔄 Collaboration Rhythm</Text>
      </CardHeader>
      <CardBody>
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          <Card variant="outline">
            <CardHeader>
              <HStack>
                <Text fontSize="lg">🌅</Text>
                <Text fontWeight="semibold">Daily Stand-ups</Text>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Checkbox defaultChecked>Enable daily check-ins</Checkbox>
                </HStack>
                <FormControl>
                  <FormLabel fontSize="sm">Format</FormLabel>
                  <Select size="sm" defaultValue="async">
                    <option value="async">Async (written updates)</option>
                    <option value="sync">Sync (video call)</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Time</FormLabel>
                  <Input type="time" size="sm" defaultValue="09:00" />
                </FormControl>
                <Text fontSize="xs" color="gray.500">
                  Focus: What did you accomplish? What are you working on? Any blockers?
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <HStack>
                <Text fontSize="lg">📊</Text>
                <Text fontWeight="semibold">Weekly Retros</Text>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Checkbox defaultChecked>Enable weekly retrospectives</Checkbox>
                </HStack>
                <FormControl>
                  <FormLabel fontSize="sm">Day</FormLabel>
                  <Select size="sm" defaultValue="friday">
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Focus</FormLabel>
                  <Select size="sm" defaultValue="assumptions">
                    <option value="assumptions">Assumption Challenges</option>
                    <option value="progress">Progress Review</option>
                    <option value="blockers">Blocker Resolution</option>
                    <option value="opportunities">Opportunity Discovery</option>
                  </Select>
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <HStack>
                <Text fontSize="lg">🔍</Text>
                <Text fontWeight="semibold">Review Cycles</Text>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={3}>
                <FormControl>
                  <FormLabel fontSize="sm">Frequency</FormLabel>
                  <Select size="sm" defaultValue="weekly">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Reviewers</FormLabel>
                  <VStack align="start" spacing={1}>
                    {mockTeamMembers.map(member => (
                      <Checkbox key={member.id} size="sm" defaultChecked>
                        {member.name}
                      </Checkbox>
                    ))}
                  </VStack>
                </FormControl>
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      </CardBody>
    </Card>
  );

  // Progress Dashboard
  const ProgressDashboard = () => {
    const mockProgress: ProgressDashboard = {
      sessionId: currentSession?.id || '',
      metrics: {
        totalComments: 24,
        assumptionsChallenged: 8,
        actionItemsCreated: 12,
        actionItemsCompleted: 7,
        participationRate: 85,
        consensusScore: 78
      },
      heatmap: {},
      topContributors: mockTeamMembers.map((member, index) => ({
        member,
        contributionScore: 85 - index * 15,
        insights: 6 - index * 2
      })),
      frameworkUsage: {
        blueOcean: 45,
        porter: 35,
        general: 20
      }
    };

    return (
      <VStack spacing={6} align="stretch">
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          <Card bg="blue.50" border="1px solid" borderColor="blue.200">
            <CardBody>
              <Stat>
                <StatLabel>Total Comments</StatLabel>
                <StatNumber>{mockProgress.metrics.totalComments}</StatNumber>
                <StatHelpText>Engagement level</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="red.50" border="1px solid" borderColor="red.200">
            <CardBody>
              <Stat>
                <StatLabel>Assumptions Challenged</StatLabel>
                <StatNumber>{mockProgress.metrics.assumptionsChallenged}</StatNumber>
                <StatHelpText>Critical thinking</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="green.50" border="1px solid" borderColor="green.200">
            <CardBody>
              <Stat>
                <StatLabel>Actions Completed</StatLabel>
                <StatNumber>
                  {mockProgress.metrics.actionItemsCompleted}/
                  {mockProgress.metrics.actionItemsCreated}
                </StatNumber>
                <StatHelpText>Execution rate</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="purple.50" border="1px solid" borderColor="purple.200">
            <CardBody>
              <Stat>
                <StatLabel>Participation Rate</StatLabel>
                <StatNumber>{mockProgress.metrics.participationRate}%</StatNumber>
                <StatHelpText>Team engagement</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Card bg={cardBg}>
            <CardHeader>
              <Text fontWeight="bold">🏆 Top Contributors</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3}>
                {mockProgress.topContributors.map((contributor, index) => (
                  <HStack key={contributor.member.id} justify="space-between" w="100%">
                    <HStack>
                      <Text fontSize="lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</Text>
                      <Avatar size="sm" name={contributor.member.name} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="semibold">{contributor.member.name}</Text>
                        <Text fontSize="xs" color="gray.500">{contributor.insights} insights</Text>
                      </VStack>
                    </HStack>
                    <Badge colorScheme="blue">{contributor.contributionScore}</Badge>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardHeader>
              <Text fontWeight="bold">📊 Framework Usage</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm">Blue Ocean Strategy</Text>
                  <HStack>
                    <Progress value={mockProgress.frameworkUsage.blueOcean} w="100px" colorScheme="blue" />
                    <Text fontSize="sm">{mockProgress.frameworkUsage.blueOcean}%</Text>
                  </HStack>
                </HStack>
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm">Porter's Frameworks</Text>
                  <HStack>
                    <Progress value={mockProgress.frameworkUsage.porter} w="100px" colorScheme="green" />
                    <Text fontSize="sm">{mockProgress.frameworkUsage.porter}%</Text>
                  </HStack>
                </HStack>
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm">General Strategy</Text>
                  <HStack>
                    <Progress value={mockProgress.frameworkUsage.general} w="100px" colorScheme="purple" />
                    <Text fontSize="sm">{mockProgress.frameworkUsage.general}%</Text>
                  </HStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    );
  };

  // Assumption Challenge Interface
  const AssumptionChallengeInterface = () => {
    const [selectedFramework, setSelectedFramework] = useState<'blue-ocean' | 'porter' | 'general'>('blue-ocean');

    return (
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">🧠 Assumption Challenge Center</Text>
            <Select 
              size="sm" 
              w="200px" 
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value as any)}
            >
              <option value="blue-ocean">Blue Ocean Strategy</option>
              <option value="porter">Porter's Frameworks</option>
              <option value="general">General Strategy</option>
            </Select>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <Alert status="info">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Challenge Mode: {selectedFramework.replace('-', ' ')}</Text>
                <Text fontSize="sm">
                  Use these prompts to systematically challenge assumptions and uncover new strategic insights
                </Text>
              </VStack>
            </Alert>

            <VStack spacing={3} w="100%">
              {ASSUMPTION_CHALLENGE_PROMPTS[selectedFramework].map((prompt, index) => (
                <Card key={index} w="100%" variant="outline" cursor="pointer" _hover={{ bg: 'gray.50' }}>
                  <CardBody>
                    <HStack justify="space-between">
                      <HStack>
                        <Text fontSize="lg">❓</Text>
                        <Text fontSize="sm">{prompt}</Text>
                      </HStack>
                      <Button size="xs" colorScheme="blue">
                        Challenge This
                      </Button>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  // Main collaboration interface
  const renderCollaborationSession = () => (
    <VStack spacing={6}>
      <Card bg={cardBg} w="100%">
        <CardHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">{currentSession?.name}</Text>
              <Text color="gray.500">{currentSession?.description}</Text>
            </VStack>
            <HStack>
              <AvatarGroup size="sm" max={3}>
                {currentSession?.participants.map(participant => (
                  <Avatar key={participant.id} name={participant.name} />
                ))}
              </AvatarGroup>
              <Button variant="outline" onClick={() => setCurrentSession(null)} size="sm">
                ← Back to Sessions
              </Button>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Tabs>
            <TabList>
              <Tab>💬 Feedback</Tab>
              <Tab>📋 Actions</Tab>
              <Tab>🧠 Challenge</Tab>
              <Tab>🔄 Rhythm</Tab>
              <Tab>📊 Progress</Tab>
            </TabList>
            <TabPanels>
              <TabPanel><AsyncFeedbackSystem /></TabPanel>
              <TabPanel><ActionTrackingSystem /></TabPanel>
              <TabPanel><AssumptionChallengeInterface /></TabPanel>
              <TabPanel><CollaborationRhythm /></TabPanel>
              <TabPanel><ProgressDashboard /></TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderSessionSelection = () => (
    <VStack spacing={6}>
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          👥 Team Collaboration Module
        </Text>
        <Text fontSize="lg" color="gray.600" mb={4}>
          Structured async collaboration with framework-guided feedback and action tracking
        </Text>
        <Text fontSize="sm" color="gray.500">
          Challenge assumptions, track actions, maintain collaboration rhythm
        </Text>
      </Box>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Collaborative Facilitator Features:</Text>
          <Text fontSize="sm">
            • Async review with structured comment blocks and voting
            • Framework-guided assumption challenging (Blue Ocean + Porter)
            • Action item tracking with dependency management
            • Collaboration rhythm cues (daily stand-ups, weekly retros)
            • Real-time progress dashboards with engagement metrics
          </Text>
        </VStack>
      </Alert>

      <Card bg={cardBg} w="100%">
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">🚀 Collaboration Sessions</Text>
            <Button colorScheme="teal">+ New Session</Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {COLLABORATION_TEMPLATES.map((template) => (
              <Card 
                key={template.name}
                cursor="pointer"
                onClick={() => {
                  // Mock session creation
                  const mockSession: CollaborationSession = {
                    id: `session_${Date.now()}`,
                    name: template.name,
                    description: template.description,
                    type: template.type,
                    status: 'active',
                    owner: mockTeamMembers[0],
                    participants: mockTeamMembers,
                    startDate: new Date(),
                    framework: template.framework,
                    objectives: template.objectives,
                    deliverables: [],
                    collaborationRhythm: {
                      dailyStandups: { enabled: true, time: '09:00', duration: 15, format: 'async', participants: [] },
                      weeklyRetros: { enabled: true, day: 'friday', time: '14:00', duration: 60, format: 'sync', focus: 'assumptions' },
                      reviewCycles: { frequency: 'weekly', reviewers: [], criteria: [] }
                    }
                  };
                  setCurrentSession(mockSession);
                }}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
                border="1px solid"
                borderColor="gray.200"
              >
                <CardHeader>
                  <HStack justify="space-between">
                    <Text fontWeight="bold">{template.name}</Text>
                    <Badge colorScheme={template.framework === 'blue-ocean' ? 'blue' : template.framework === 'porter' ? 'green' : 'purple'}>
                      {template.framework}
                    </Badge>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Text fontSize="sm" color="gray.600">
                      {template.description}
                    </Text>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="xs" fontWeight="semibold">Objectives:</Text>
                      {template.objectives.slice(0, 2).map((objective, index) => (
                        <Text key={index} fontSize="xs" color="gray.500">• {objective}</Text>
                      ))}
                    </VStack>
                    <HStack>
                      <Badge variant="outline">{template.duration} days</Badge>
                      <Badge variant="outline">{template.type}</Badge>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} maxW="7xl" mx="auto">
        {currentSession ? renderCollaborationSession() : renderSessionSelection()}
      </VStack>
    </Box>
  );
};

export default TeamCollaboration;