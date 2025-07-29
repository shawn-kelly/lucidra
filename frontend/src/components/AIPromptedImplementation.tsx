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
  NumberInput,
  NumberInputField,
  CircularProgress,
  CircularProgressLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineIcon,
  TimelineSeparator
} from '@chakra-ui/react';

// Core data structures
interface ImplementationStage {
  id: string;
  name: string;
  description: string;
  strategicIntent: string;
  targetOutcomes: string[];
  currentProgress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'at-risk' | 'completed' | 'blocked';
  startDate: Date;
  targetDate: Date;
  owner: string;
  team: string[];
  dependencies: string[];
  milestones: Milestone[];
  performanceMetrics: PerformanceMetric[];
  risks: Risk[];
  competitiveThreats: CompetitiveThreat[];
  actionPlans: ActionPlan[];
  aiNudges: AINudge[];
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  targetDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  deliverables: string[];
  successCriteria: string[];
}

interface PerformanceMetric {
  id: string;
  name: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  gapAnalysis: string;
}

interface Risk {
  id: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
  owner: string;
  status: 'open' | 'mitigated' | 'closed';
}

interface CompetitiveThreat {
  id: string;
  competitor: string;
  threat: string;
  urgency: 'low' | 'medium' | 'high';
  response: string;
  monitoring: string;
}

interface ActionPlan {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: Date;
  status: 'open' | 'in-progress' | 'completed' | 'blocked';
  dependencies: string[];
  resources: string[];
  successMeasure: string;
}

interface AINudge {
  id: string;
  type: 'performance-gap' | 'strategic-drift' | 'competitive-threat' | 'resource-constraint' | 'timeline-risk';
  message: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
  data: any;
  timestamp: Date;
  acknowledged: boolean;
  actionTaken?: string;
}

interface TeamInput {
  id: string;
  stageId: string;
  author: string;
  type: 'feedback' | 'concern' | 'suggestion' | 'blocker' | 'success';
  content: string;
  timestamp: Date;
  responses: TeamResponse[];
  status: 'open' | 'addressed' | 'closed';
}

interface TeamResponse {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface TeamsUpdate {
  id: string;
  stageId: string;
  summary: string;
  keyAchievements: string[];
  challenges: string[];
  nextSteps: string[];
  metrics: { name: string; value: string; trend: string }[];
  timeline: Date;
  stakeholders: string[];
}

// AI Coaching engine
const AI_COACHING_TRIGGERS = {
  'performance-gap': {
    threshold: 20, // % gap between current and target
    message: (metric: PerformanceMetric) => 
      `Performance gap detected: ${metric.name} is ${Math.abs(metric.currentValue - metric.targetValue)} ${metric.unit} behind target`,
    recommendation: (metric: PerformanceMetric) => 
      `Consider accelerating efforts or adjusting targets for ${metric.name}. Review resource allocation and remove blockers.`
  },
  'strategic-drift': {
    threshold: 7, // days without progress
    message: (stage: ImplementationStage) => 
      `Strategic drift detected in ${stage.name}. No significant progress in recent period.`,
    recommendation: (stage: ImplementationStage) => 
      `Reconnect with strategic intent: ${stage.strategicIntent}. Schedule team alignment session.`
  },
  'timeline-risk': {
    threshold: 0.8, // 80% time elapsed with <60% progress
    message: (stage: ImplementationStage) => 
      `Timeline risk: ${stage.name} is ${stage.currentProgress}% complete with limited time remaining.`,
    recommendation: (stage: ImplementationStage) => 
      `Prioritize critical path activities. Consider scope reduction or timeline adjustment.`
  }
};

// Strategic frameworks integration
const STRATEGIC_PROMPTS = {
  blueOcean: [
    'What can we eliminate that competitors take for granted?',
    'Where can we reduce complexity or cost?', 
    'What should we raise above industry standard?',
    'What can we create that doesn\'t exist yet?'
  ],
  porter: [
    'How does this support our differentiation strategy?',
    'Where can we achieve cost leadership?',
    'What new competitive advantages are we building?',
    'How does this defend against competitive forces?'
  ],
  competitive: [
    'What are competitors doing differently?',
    'Where are substitute offerings emerging?',
    'What scalable innovations should we consider?',
    'How can we turn threats into opportunities?'
  ]
};

const AIPromptedImplementation: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<ImplementationStage | null>(null);
  const [stages, setStages] = useState<ImplementationStage[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [teamInputs, setTeamInputs] = useState<TeamInput[]>([]);
  const [aiNudges, setAiNudges] = useState<AINudge[]>([]);
  const [coachingMode, setCoachingMode] = useState<'performance' | 'strategic' | 'competitive'>('performance');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  // AI Coaching Engine
  const generateAINudges = (stage: ImplementationStage): AINudge[] => {
    const nudges: AINudge[] = [];

    // Performance gap detection
    stage.performanceMetrics.forEach(metric => {
      const gapPercentage = Math.abs(metric.currentValue - metric.targetValue) / metric.targetValue * 100;
      if (gapPercentage > AI_COACHING_TRIGGERS['performance-gap'].threshold) {
        nudges.push({
          id: `nudge_${Date.now()}_${metric.id}`,
          type: 'performance-gap',
          message: AI_COACHING_TRIGGERS['performance-gap'].message(metric),
          urgency: gapPercentage > 50 ? 'critical' : gapPercentage > 30 ? 'high' : 'medium',
          recommendation: AI_COACHING_TRIGGERS['performance-gap'].recommendation(metric),
          data: { metric, gapPercentage },
          timestamp: new Date(),
          acknowledged: false
        });
      }
    });

    // Timeline risk detection
    const timeElapsed = (new Date().getTime() - stage.startDate.getTime()) / 
                       (stage.targetDate.getTime() - stage.startDate.getTime());
    if (timeElapsed > AI_COACHING_TRIGGERS['timeline-risk'].threshold && 
        stage.currentProgress < 60) {
      nudges.push({
        id: `nudge_${Date.now()}_timeline`,
        type: 'timeline-risk',
        message: AI_COACHING_TRIGGERS['timeline-risk'].message(stage),
        urgency: 'high',
        recommendation: AI_COACHING_TRIGGERS['timeline-risk'].recommendation(stage),
        data: { timeElapsed, progress: stage.currentProgress },
        timestamp: new Date(),
        acknowledged: false
      });
    }

    // Competitive threat detection
    stage.competitiveThreats.forEach(threat => {
      if (threat.urgency === 'high') {
        nudges.push({
          id: `nudge_${Date.now()}_threat_${threat.id}`,
          type: 'competitive-threat',
          message: `Competitive threat from ${threat.competitor}: ${threat.threat}`,
          urgency: 'high',
          recommendation: `Action required: ${threat.response}`,
          data: { threat },
          timestamp: new Date(),
          acknowledged: false
        });
      }
    });

    return nudges;
  };

  // Teams Update Generator
  const generateTeamsUpdate = (stage: ImplementationStage): TeamsUpdate => {
    const completedMilestones = stage.milestones.filter(m => m.status === 'completed');
    const overdueMilestones = stage.milestones.filter(m => m.status === 'overdue');
    
    return {
      id: `update_${Date.now()}`,
      stageId: stage.id,
      summary: `${stage.name} is ${stage.currentProgress}% complete with ${completedMilestones.length} milestones achieved.`,
      keyAchievements: completedMilestones.map(m => m.name),
      challenges: [
        ...overdueMilestones.map(m => `Overdue milestone: ${m.name}`),
        ...stage.risks.filter(r => r.status === 'open' && r.impact === 'high').map(r => r.description)
      ],
      nextSteps: stage.actionPlans
        .filter(ap => ap.status === 'open' && ap.priority === 'critical')
        .map(ap => ap.title),
      metrics: stage.performanceMetrics.map(m => ({
        name: m.name,
        value: `${m.currentValue} ${m.unit}`,
        trend: m.trend
      })),
      timeline: new Date(),
      stakeholders: [stage.owner, ...stage.team]
    };
  };

  // Implementation Stage Overview
  const StageOverview = () => (
    <VStack spacing={6} align="stretch">
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
        <Card bg="blue.50" border="1px solid" borderColor="blue.200">
          <CardBody>
            <Stat>
              <StatLabel>Overall Progress</StatLabel>
              <StatNumber>{currentStage?.currentProgress || 0}%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                On track for delivery
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg="green.50" border="1px solid" borderColor="green.200">
          <CardBody>
            <Stat>
              <StatLabel>Milestones Completed</StatLabel>
              <StatNumber>
                {currentStage?.milestones.filter(m => m.status === 'completed').length || 0}/
                {currentStage?.milestones.length || 0}
              </StatNumber>
              <StatHelpText>Achievement rate</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg="orange.50" border="1px solid" borderColor="orange.200">
          <CardBody>
            <Stat>
              <StatLabel>Active Risks</StatLabel>
              <StatNumber>
                {currentStage?.risks.filter(r => r.status === 'open').length || 0}
              </StatNumber>
              <StatHelpText>Requiring attention</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg="purple.50" border="1px solid" borderColor="purple.200">
          <CardBody>
            <Stat>
              <StatLabel>Team Members</StatLabel>
              <StatNumber>{currentStage?.team.length || 0}</StatNumber>
              <StatHelpText>Active contributors</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">🎯 Strategic Intent</Text>
        </CardHeader>
        <CardBody>
          <Alert status="info">
            <AlertIcon />
            <Text fontWeight="semibold">{currentStage?.strategicIntent}</Text>
          </Alert>
        </CardBody>
      </Card>
    </VStack>
  );

  // AI Coaching Dashboard
  const AINudgesDashboard = () => {
    const pendingNudges = aiNudges.filter(n => !n.acknowledged);
    const criticalNudges = pendingNudges.filter(n => n.urgency === 'critical');

    return (
      <VStack spacing={6} align="stretch">
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">🤖 AI Tactical Coach</Text>
              <Badge colorScheme={criticalNudges.length > 0 ? 'red' : 'green'}>
                {pendingNudges.length} active nudges
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {pendingNudges.length === 0 ? (
                <Alert status="success">
                  <AlertIcon />
                  <Text>All systems on track! No immediate coaching interventions needed.</Text>
                </Alert>
              ) : (
                pendingNudges.map((nudge) => (
                  <Alert 
                    key={nudge.id} 
                    status={
                      nudge.urgency === 'critical' ? 'error' :
                      nudge.urgency === 'high' ? 'warning' : 'info'
                    }
                  >
                    <AlertIcon />
                    <VStack align="start" spacing={2} w="100%">
                      <HStack justify="space-between" w="100%">
                        <Text fontWeight="semibold">{nudge.message}</Text>
                        <Badge 
                          colorScheme={
                            nudge.urgency === 'critical' ? 'red' :
                            nudge.urgency === 'high' ? 'orange' : 'blue'
                          }
                        >
                          {nudge.urgency}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm">{nudge.recommendation}</Text>
                      <HStack>
                        <Button size="xs" colorScheme="blue">
                          Take Action
                        </Button>
                        <Button size="xs" variant="outline">
                          Acknowledge
                        </Button>
                      </HStack>
                    </VStack>
                  </Alert>
                ))
              )}
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">💡 Strategic Coaching Prompts</Text>
          </CardHeader>
          <CardBody>
            <Tabs>
              <TabList>
                <Tab>🌊 Blue Ocean</Tab>
                <Tab>⚔️ Porter</Tab>
                <Tab>🏆 Competitive</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack align="start" spacing={3}>
                    {STRATEGIC_PROMPTS.blueOcean.map((prompt, index) => (
                      <HStack key={index}>
                        <Text color="blue.500">❓</Text>
                        <Text fontSize="sm">{prompt}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" spacing={3}>
                    {STRATEGIC_PROMPTS.porter.map((prompt, index) => (
                      <HStack key={index}>
                        <Text color="green.500">❓</Text>
                        <Text fontSize="sm">{prompt}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="start" spacing={3}>
                    {STRATEGIC_PROMPTS.competitive.map((prompt, index) => (
                      <HStack key={index}>
                        <Text color="purple.500">❓</Text>
                        <Text fontSize="sm">{prompt}</Text>
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

  // Performance Metrics Dashboard
  const PerformanceMetrics = () => (
    <VStack spacing={6} align="stretch">
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">📊 Performance Metrics</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
            {currentStage?.performanceMetrics.map((metric) => {
              const progressPercentage = (metric.currentValue / metric.targetValue) * 100;
              const isOnTrack = progressPercentage >= 80;
              
              return (
                <Card key={metric.id} variant="outline">
                  <CardBody>
                    <VStack spacing={3}>
                      <HStack justify="space-between" w="100%">
                        <Text fontWeight="semibold">{metric.name}</Text>
                        <Badge colorScheme={isOnTrack ? 'green' : 'red'}>
                          {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '➡️'}
                        </Badge>
                      </HStack>
                      
                      <CircularProgress 
                        value={Math.min(progressPercentage, 100)} 
                        color={isOnTrack ? 'green.400' : 'red.400'}
                        size="80px"
                      >
                        <CircularProgressLabel>{Math.round(progressPercentage)}%</CircularProgressLabel>
                      </CircularProgress>
                      
                      <VStack spacing={1}>
                        <Text fontSize="sm">
                          Current: {metric.currentValue} {metric.unit}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Target: {metric.targetValue} {metric.unit}
                        </Text>
                      </VStack>
                      
                      {metric.gapAnalysis && (
                        <Text fontSize="xs" color="gray.600" textAlign="center">
                          {metric.gapAnalysis}
                        </Text>
                      )}
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

  // Action Plans Dashboard
  const ActionPlans = () => (
    <Card bg={cardBg}>
      <CardHeader>
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="bold">📋 Action Plans</Text>
          <Button size="sm" colorScheme="teal">+ Add Action</Button>
        </HStack>
      </CardHeader>
      <CardBody>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Action</Th>
              <Th>Priority</Th>
              <Th>Assignee</Th>
              <Th>Due Date</Th>
              <Th>Status</Th>
              <Th>Success Measure</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentStage?.actionPlans.map((action) => (
              <Tr key={action.id}>
                <Td>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold" fontSize="sm">{action.title}</Text>
                    <Text fontSize="xs" color="gray.500">{action.description}</Text>
                  </VStack>
                </Td>
                <Td>
                  <Badge 
                    colorScheme={
                      action.priority === 'critical' ? 'red' :
                      action.priority === 'high' ? 'orange' :
                      action.priority === 'medium' ? 'yellow' : 'green'
                    }
                  >
                    {action.priority}
                  </Badge>
                </Td>
                <Td>{action.assignee}</Td>
                <Td>{action.dueDate.toLocaleDateString()}</Td>
                <Td>
                  <Badge 
                    colorScheme={
                      action.status === 'completed' ? 'green' :
                      action.status === 'blocked' ? 'red' :
                      action.status === 'in-progress' ? 'blue' : 'gray'
                    }
                  >
                    {action.status}
                  </Badge>
                </Td>
                <Td>
                  <Text fontSize="xs">{action.successMeasure}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );

  // Teams Update Generator
  const TeamsUpdateGenerator = () => {
    const [updateContent, setUpdateContent] = useState<TeamsUpdate | null>(null);

    const generateUpdate = () => {
      if (currentStage) {
        const update = generateTeamsUpdate(currentStage);
        setUpdateContent(update);
      }
    };

    const exportToTeams = () => {
      if (!updateContent) return;

      const markdown = `# ${currentStage?.name} - Implementation Update

## 📊 Progress Summary
${updateContent.summary}

## 🎉 Key Achievements
${updateContent.keyAchievements.map(achievement => `- ${achievement}`).join('\n')}

## ⚠️ Current Challenges
${updateContent.challenges.map(challenge => `- ${challenge}`).join('\n')}

## 🎯 Next Steps
${updateContent.nextSteps.map(step => `- ${step}`).join('\n')}

## 📈 Key Metrics
${updateContent.metrics.map(metric => `- **${metric.name}**: ${metric.value} ${metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '➡️'}`).join('\n')}

## 👥 Stakeholders
${updateContent.stakeholders.join(', ')}

---
*Generated by Lucidra AI Tactical Coach | ${updateContent.timeline.toLocaleString()}*`;

      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentStage?.name}_update_${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">📤 Teams Update Generator</Text>
            <HStack>
              <Button size="sm" onClick={generateUpdate}>Generate Update</Button>
              {updateContent && (
                <Button size="sm" colorScheme="blue" onClick={exportToTeams}>
                  Export to Teams
                </Button>
              )}
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          {updateContent ? (
            <VStack align="start" spacing={4}>
              <Box w="100%" p={4} bg="gray.50" borderRadius="md">
                <Text fontSize="sm" fontFamily="monospace" whiteSpace="pre-wrap">
                  {`# ${currentStage?.name} - Implementation Update

## 📊 Progress Summary
${updateContent.summary}

## 🎉 Key Achievements
${updateContent.keyAchievements.map(achievement => `- ${achievement}`).join('\n')}

## ⚠️ Current Challenges  
${updateContent.challenges.map(challenge => `- ${challenge}`).join('\n')}

## 🎯 Next Steps
${updateContent.nextSteps.map(step => `- ${step}`).join('\n')}`}
                </Text>
              </Box>
            </VStack>
          ) : (
            <Alert status="info">
              <AlertIcon />
              <Text>Click "Generate Update" to create a Teams-ready progress summary</Text>
            </Alert>
          )}
        </CardBody>
      </Card>
    );
  };

  // Main implementation dashboard
  const renderImplementationDashboard = () => (
    <VStack spacing={6}>
      <Card bg={cardBg} w="100%">
        <CardHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Text fontSize="2xl" fontWeight="bold">{currentStage?.name}</Text>
              <Text color="gray.500">{currentStage?.description}</Text>
            </VStack>
            <HStack>
              <Button variant="outline" onClick={() => setCurrentStage(null)} size="sm">
                ← Back to Stages
              </Button>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Tabs>
            <TabList>
              <Tab>📊 Overview</Tab>
              <Tab>🤖 AI Coach</Tab>
              <Tab>📈 Metrics</Tab>
              <Tab>📋 Actions</Tab>
              <Tab>📤 Teams Update</Tab>
            </TabList>
            <TabPanels>
              <TabPanel><StageOverview /></TabPanel>
              <TabPanel><AINudgesDashboard /></TabPanel>
              <TabPanel><PerformanceMetrics /></TabPanel>
              <TabPanel><ActionPlans /></TabPanel>
              <TabPanel><TeamsUpdateGenerator /></TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderStageSelection = () => (
    <VStack spacing={6}>
      <Box textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={2}>
          🤖 AI-Prompted Implementation
        </Text>
        <Text fontSize="lg" color="gray.600" mb={4}>
          Tactical AI coaching for strategic implementation with performance gap detection
        </Text>
        <Text fontSize="sm" color="gray.500">
          Trigger nudges, reinforce strategic intent, monitor competitive threats
        </Text>
      </Box>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">AI Tactical Coach Features:</Text>
          <Text fontSize="sm">
            • Performance gap detection with automated nudges
            • Strategic intent reinforcement from previous analysis steps
            • Competitive threat monitoring and response recommendations
            • Action plan optimization considering scalable innovation
            • Teams-ready progress summaries with markdown export
          </Text>
        </VStack>
      </Alert>

      <Card bg={cardBg} w="100%">
        <CardHeader>
          <Text fontSize="xl" fontWeight="bold">🚀 Implementation Stages</Text>
        </CardHeader>
        <CardBody>
          <Box textAlign="center" py={8}>
            <Text color="gray.500" mb={4}>No implementation stages configured yet.</Text>
            <Button colorScheme="teal" onClick={() => {}}>
              + Create Implementation Stage
            </Button>
          </Box>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} maxW="7xl" mx="auto">
        {currentStage ? renderImplementationDashboard() : renderStageSelection()}
      </VStack>
    </Box>
  );
};

export default AIPromptedImplementation;