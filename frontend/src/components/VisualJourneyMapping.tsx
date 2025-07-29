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
  CircularProgress,
  CircularProgressLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Avatar,
  AvatarGroup,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineIcon,
  TimelineDot,
  TimelineSeparator,
  Stepper,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  StepDescription,
  useSteps,
} from '@chakra-ui/react';
import { useFrameworkData } from '../hooks/useFrameworkData';

// Journey Mapping Data Structures
interface JourneyStage {
  id: string;
  name: string;
  description: string;
  framework: 'strategy' | 'marketing' | 'hr' | 'process' | 'financial' | 'integration';
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'on_hold';
  progress: number; // 0-100
  startDate?: string;
  endDate?: string;
  estimatedDuration: string;
  dependencies: string[]; // stage IDs
  assignees: TeamMember[];
  deliverables: string[];
  milestones: Milestone[];
  blueOceanConnection?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  department: string;
  workload: number; // 0-100 percentage
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface JourneyMap {
  id: string;
  name: string;
  description: string;
  type: 'strategic_planning' | 'implementation' | 'optimization' | 'transformation';
  overallProgress: number;
  stages: JourneyStage[];
  criticalPath: string[]; // stage IDs
  riskFactors: string[];
  successMetrics: { [key: string]: number };
}

const VisualJourneyMapping: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const {
    frameworkState,
    blueOceanData,
    insights,
    hasData
  } = useFrameworkData();

  const [journeyMaps, setJourneyMaps] = useState<JourneyMap[]>([]);
  const [selectedJourney, setSelectedJourney] = useState<JourneyMap | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');
  const warningBg = useColorModeValue('orange.50', 'orange.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Demo team members
  const demoTeamMembers: TeamMember[] = [
    { id: 'tm1', name: 'Sarah Chen', role: 'Strategy Lead', department: 'Strategy', workload: 85 },
    { id: 'tm2', name: 'Mike Rodriguez', role: 'Marketing Manager', department: 'Marketing', workload: 70 },
    { id: 'tm3', name: 'Emily Davis', role: 'HR Director', department: 'HR', workload: 60 },
    { id: 'tm4', name: 'David Kim', role: 'Process Analyst', department: 'Operations', workload: 75 },
    { id: 'tm5', name: 'Lisa Thompson', role: 'Financial Analyst', department: 'Finance', workload: 50 },
  ];

  // Initialize journey maps
  useEffect(() => {
    const strategicPlanningJourney: JourneyMap = {
      id: 'journey_strategic_planning',
      name: 'Strategic Planning & Blue Ocean Implementation',
      description: 'Complete strategic planning journey from Blue Ocean analysis to cross-framework implementation',
      type: 'strategic_planning',
      overallProgress: hasData ? 65 : 25,
      criticalPath: ['stage_blue_ocean', 'stage_insights', 'stage_marketing', 'stage_hr', 'stage_process'],
      riskFactors: [
        'Team bandwidth constraints',
        'Cross-functional alignment challenges',
        'Data quality and availability',
        'Change management resistance'
      ],
      successMetrics: {
        'Blue Ocean Completion': blueOceanData.sixPathsAnalysis.insights.length > 0 ? 100 : 30,
        'Cross-Framework Integration': insights.length * 20,
        'Team Engagement': 75,
        'Implementation Speed': 60
      },
      stages: [
        {
          id: 'stage_blue_ocean',
          name: 'Blue Ocean Strategy Analysis',
          description: 'Complete Six Paths Analysis and Buyer Utility Map to identify strategic opportunities',
          framework: 'strategy',
          status: blueOceanData.sixPathsAnalysis.insights.length > 0 ? 'completed' : 'in_progress',
          progress: blueOceanData.sixPathsAnalysis.insights.length > 0 ? 100 : 60,
          estimatedDuration: '2-3 weeks',
          dependencies: [],
          assignees: [demoTeamMembers[0], demoTeamMembers[4]],
          deliverables: [
            'Six Paths Analysis Report',
            'Buyer Utility Map',
            'Strategic Insights Document',
            'Blue Ocean Opportunity Assessment'
          ],
          milestones: [
            {
              id: 'ms1',
              name: 'Six Paths Analysis Complete',
              description: 'All six paths explored with buyer groups identified',
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              status: blueOceanData.sixPathsAnalysis.buyerGroups.length > 0 ? 'completed' : 'pending',
              priority: 'critical'
            },
            {
              id: 'ms2',
              name: 'Utility Map Complete',
              description: 'Buyer utility blocks analyzed and scored',
              dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              status: blueOceanData.buyerUtilityMap?.utilityBlocks ? 'completed' : 'pending',
              priority: 'high'
            }
          ],
          blueOceanConnection: 'Primary Blue Ocean analysis and insight generation'
        },
        {
          id: 'stage_insights',
          name: 'Cross-Framework Insight Generation',
          description: 'Generate and synthesize insights across Marketing, HR, and Process frameworks',
          framework: 'integration',
          status: insights.length > 0 ? 'in_progress' : 'not_started',
          progress: Math.min(100, insights.length * 25),
          estimatedDuration: '1-2 weeks',
          dependencies: ['stage_blue_ocean'],
          assignees: [demoTeamMembers[0], demoTeamMembers[1], demoTeamMembers[2], demoTeamMembers[3]],
          deliverables: [
            'Cross-Framework Insights Report',
            'Marketing Opportunity Analysis',
            'HR Strategic Role Requirements',
            'Process Improvement Roadmap'
          ],
          milestones: [
            {
              id: 'ms3',
              name: 'Insights Generated',
              description: 'All cross-framework insights identified and prioritized',
              dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
              status: insights.length > 2 ? 'completed' : 'pending',
              priority: 'high'
            }
          ],
          blueOceanConnection: 'Transforms Blue Ocean insights into actionable opportunities'
        },
        {
          id: 'stage_marketing',
          name: 'Marketing Automation Implementation',
          description: 'Deploy marketing campaigns and automation workflows based on Blue Ocean insights',
          framework: 'marketing',
          status: frameworkState.marketing.campaigns.length > 0 ? 'in_progress' : 'not_started',
          progress: Math.min(100, frameworkState.marketing.campaigns.length * 30),
          estimatedDuration: '3-4 weeks',
          dependencies: ['stage_insights'],
          assignees: [demoTeamMembers[1], demoTeamMembers[0]],
          deliverables: [
            'Campaign Strategy Document',
            'Marketing Automation Workflows',
            'Customer Segmentation Plan',
            'ROI Tracking Dashboard'
          ],
          milestones: [
            {
              id: 'ms4',
              name: 'First Campaign Live',
              description: 'Launch first Blue Ocean-based marketing campaign',
              dueDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'pending',
              priority: 'high'
            }
          ],
          blueOceanConnection: 'Campaigns generated from buyer group analysis and emotional positioning'
        },
        {
          id: 'stage_hr',
          name: 'Strategic HR Implementation',
          description: 'Develop and recruit strategic roles aligned with Blue Ocean positioning',
          framework: 'hr',
          status: frameworkState.hr.strategicRoles.length > 0 ? 'in_progress' : 'not_started',
          progress: Math.min(100, frameworkState.hr.strategicRoles.length * 25),
          estimatedDuration: '4-6 weeks',
          dependencies: ['stage_insights'],
          assignees: [demoTeamMembers[2], demoTeamMembers[0]],
          deliverables: [
            'Strategic Role Definitions',
            'Capability Gap Analysis',
            'Recruitment Strategy',
            'Team Structure Optimization'
          ],
          milestones: [
            {
              id: 'ms5',
              name: 'Roles Defined',
              description: 'All strategic roles defined with competency profiles',
              dueDate: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'pending',
              priority: 'medium'
            }
          ],
          blueOceanConnection: 'Roles created to support Blue Ocean strategy execution'
        },
        {
          id: 'stage_process',
          name: 'Process Improvement Implementation',
          description: 'Optimize processes based on Blue Ocean utility block analysis',
          framework: 'process',
          status: frameworkState.process.improvements.length > 0 ? 'in_progress' : 'not_started',
          progress: Math.min(100, frameworkState.process.improvements.length * 20),
          estimatedDuration: '6-8 weeks',
          dependencies: ['stage_insights'],
          assignees: [demoTeamMembers[3], demoTeamMembers[0]],
          deliverables: [
            'Process Improvement Plans',
            'Implementation Roadmaps',
            'Efficiency Metrics',
            'Change Management Plan'
          ],
          milestones: [
            {
              id: 'ms6',
              name: 'First Process Improved',
              description: 'Complete first utility-based process improvement',
              dueDate: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'pending',
              priority: 'medium'
            }
          ],
          blueOceanConnection: 'Process improvements from low utility block scores'
        },
        {
          id: 'stage_integration',
          name: 'Full Integration & Optimization',
          description: 'Complete cross-framework integration with performance optimization',
          framework: 'integration',
          status: 'not_started',
          progress: 0,
          estimatedDuration: '2-3 weeks',
          dependencies: ['stage_marketing', 'stage_hr', 'stage_process'],
          assignees: [demoTeamMembers[0], demoTeamMembers[1], demoTeamMembers[2], demoTeamMembers[3]],
          deliverables: [
            'Integration Performance Report',
            'ROI Analysis',
            'Optimization Recommendations',
            'Success Metrics Dashboard'
          ],
          milestones: [
            {
              id: 'ms7',
              name: 'Full Integration Complete',
              description: 'All frameworks fully integrated and optimized',
              dueDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'pending',
              priority: 'critical'
            }
          ],
          blueOceanConnection: 'Unified Blue Ocean strategy execution across all frameworks'
        }
      ]
    };

    setJourneyMaps([strategicPlanningJourney]);
    setSelectedJourney(strategicPlanningJourney);
  }, [frameworkState, blueOceanData, insights, hasData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'blocked': return 'red';
      case 'on_hold': return 'orange';
      case 'not_started': return 'gray';
      default: return 'gray';
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'strategy': return '🌊';
      case 'marketing': return '📈';
      case 'hr': return '👥';
      case 'process': return '🔄';
      case 'financial': return '💰';
      case 'integration': return '🔗';
      default: return '📋';
    }
  };

  const renderJourneyOverview = () => {
    if (!selectedJourney) return null;

    return (
      <VStack spacing={6} align="stretch">
        {/* Journey Header */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
          <CardHeader>
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={2}>
                <Text fontSize="xl" fontWeight="bold">{selectedJourney.name}</Text>
                <Text color="gray.600">{selectedJourney.description}</Text>
                <Badge colorScheme="purple" size="sm">
                  {selectedJourney.type.replace('_', ' ')}
                </Badge>
              </VStack>
              <VStack align="end" spacing={2}>
                <CircularProgress value={selectedJourney.overallProgress} color="blue.400" size="80px">
                  <CircularProgressLabel>{selectedJourney.overallProgress}%</CircularProgressLabel>
                </CircularProgress>
                <Text fontSize="sm" color="gray.600">Overall Progress</Text>
              </VStack>
            </HStack>
          </CardHeader>
        </Card>

        {/* Success Metrics */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">📊 Success Metrics</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              {Object.entries(selectedJourney.successMetrics).map(([metric, value]) => (
                <Box key={metric} p={3} bg={infoBg} borderRadius="md">
                  <VStack spacing={2}>
                    <Text fontSize="sm" fontWeight="semibold" textAlign="center">{metric}</Text>
                    <Progress value={value} colorScheme={value >= 80 ? 'green' : value >= 60 ? 'blue' : 'orange'} w="full" />
                    <Text fontSize="xs" color="gray.600">{value}%</Text>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </CardBody>
        </Card>

        {/* Stage Overview */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🗺️ Journey Stages</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {selectedJourney.stages.map((stage, index) => (
                <Box key={stage.id} position="relative">
                  <HStack spacing={4} align="start">
                    {/* Stage Icon and Number */}
                    <VStack spacing={1}>
                      <CircularProgress 
                        value={stage.progress} 
                        color={getStatusColor(stage.status)} 
                        size="60px"
                      >
                        <CircularProgressLabel fontSize="xs">
                          {index + 1}
                        </CircularProgressLabel>
                      </CircularProgress>
                      <Text fontSize="lg">{getFrameworkIcon(stage.framework)}</Text>
                    </VStack>

                    {/* Stage Details */}
                    <Box flex={1}>
                      <VStack align="start" spacing={2}>
                        <HStack>
                          <Text fontSize="md" fontWeight="bold">{stage.name}</Text>
                          <Badge colorScheme={getStatusColor(stage.status)} size="sm">
                            {stage.status.replace('_', ' ')}
                          </Badge>
                          {stage.blueOceanConnection && (
                            <Badge colorScheme="purple" size="sm">🌊 Blue Ocean</Badge>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="gray.600">{stage.description}</Text>
                        <HStack spacing={4}>
                          <Text fontSize="xs">
                            <strong>Duration:</strong> {stage.estimatedDuration}
                          </Text>
                          <Text fontSize="xs">
                            <strong>Progress:</strong> {stage.progress}%
                          </Text>
                          <Text fontSize="xs">
                            <strong>Team:</strong> {stage.assignees.length} members
                          </Text>
                        </HStack>
                        
                        {/* Assignees */}
                        <HStack>
                          <Text fontSize="xs" fontWeight="semibold">Team:</Text>
                          <AvatarGroup size="sm" max={3}>
                            {stage.assignees.map(member => (
                              <Avatar key={member.id} name={member.name} size="sm" />
                            ))}
                          </AvatarGroup>
                        </HStack>
                      </VStack>
                    </Box>

                    {/* Progress Bar */}
                    <VStack align="end" spacing={1}>
                      <Progress 
                        value={stage.progress} 
                        colorScheme={getStatusColor(stage.status)} 
                        size="sm" 
                        w="100px"
                      />
                      <Text fontSize="xs" color="gray.600">{stage.progress}%</Text>
                    </VStack>
                  </HStack>

                  {/* Connector Line */}
                  {index < selectedJourney.stages.length - 1 && (
                    <Box
                      position="absolute"
                      left="30px"
                      top="60px"
                      w="2px"
                      h="40px"
                      bg="gray.300"
                      zIndex={-1}
                    />
                  )}
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  const renderTeamWorkload = () => (
    <VStack spacing={6} align="stretch">
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">👥 Team Workload Analysis</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {demoTeamMembers.map(member => (
              <Box key={member.id} p={4} bg={infoBg} borderRadius="md">
                <HStack justify="space-between" align="start">
                  <HStack>
                    <Avatar name={member.name} size="md" />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">{member.name}</Text>
                      <Text fontSize="sm" color="gray.600">{member.role}</Text>
                      <Badge colorScheme="blue" size="sm">{member.department}</Badge>
                    </VStack>
                  </HStack>
                  <VStack align="end" spacing={1}>
                    <Text fontSize="sm" fontWeight="semibold">
                      {member.workload}% capacity
                    </Text>
                    <Progress 
                      value={member.workload} 
                      colorScheme={member.workload > 80 ? 'red' : member.workload > 60 ? 'orange' : 'green'} 
                      size="sm" 
                      w="100px"
                    />
                    <Text fontSize="xs" color="gray.500">
                      {member.workload > 80 ? 'Overloaded' : member.workload > 60 ? 'Busy' : 'Available'}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </CardBody>
      </Card>

      {/* Risk Factors */}
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">⚠️ Risk Factors</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={2} align="stretch">
            {selectedJourney?.riskFactors.map((risk, index) => (
              <Alert key={index} status="warning" borderRadius="md">
                <AlertIcon />
                <Text fontSize="sm">{risk}</Text>
              </Alert>
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
            <Text fontSize="3xl">🗺️</Text>
            <Text fontSize="3xl" fontWeight="bold">Visual Journey Mapping</Text>
            <Badge colorScheme="green" ml={2}>LIVE PROGRESS TRACKING</Badge>
          </HStack>
          <Text color="gray.600" mb={6}>
            Real-time visual mapping of team progress across strategy, marketing, HR, and process implementation journeys.
          </Text>
        </Box>

        {/* Integration Status */}
        {hasData && (
          <Alert status="success">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">Live Journey Tracking Active</Text>
              <Text fontSize="sm">
                Journey progress automatically updated based on framework completion status. 
                {selectedJourney?.overallProgress}% overall progress across {selectedJourney?.stages.length} stages.
              </Text>
            </VStack>
          </Alert>
        )}

        {!hasData && (
          <Alert status="info">
            <AlertIcon />
            <VStack align="start" spacing={1}>
              <Text fontWeight="semibold">Ready for Journey Tracking</Text>
              <Text fontSize="sm">
                Complete Blue Ocean Strategy analysis to activate live journey mapping and progress tracking across all frameworks.
              </Text>
            </VStack>
          </Alert>
        )}

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Journey Overview</Tab>
            <Tab>Team Workload</Tab>
            <Tab>Milestone Timeline</Tab>
            <Tab>Critical Path</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderJourneyOverview()}
            </TabPanel>
            <TabPanel px={0}>
              {renderTeamWorkload()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Interactive milestone timeline with Gantt chart visualization coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Critical path analysis with dependency mapping and bottleneck identification coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default VisualJourneyMapping;