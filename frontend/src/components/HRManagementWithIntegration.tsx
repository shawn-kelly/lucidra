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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Switch,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { useFrameworkData } from '../hooks/useFrameworkData';

// HR Management Data Structures
interface StrategicRole {
  id: string;
  title: string;
  description: string;
  department: 'strategy' | 'marketing' | 'operations' | 'technology' | 'finance' | 'hr';
  level: 'senior' | 'mid' | 'junior' | 'executive';
  status: 'planned' | 'open' | 'interviewing' | 'filled' | 'critical';
  blueOceanSource?: string;
  emotionalBrandingSkills: boolean;
  functionalExpertise: string[];
  requiredCapabilities: string[];
  strategicPriority: number; // 1-10 scale
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  estimatedSalary: {
    min: number;
    max: number;
    currency: string;
  };
  qualifications: {
    education: string[];
    experience: string[];
    skills: string[];
    certifications: string[];
  };
  competencyProfile: {
    strategicThinking: number; // 1-10
    emotionalIntelligence: number; // 1-10
    analyticalSkills: number; // 1-10
    communication: number; // 1-10
    leadership: number; // 1-10
    innovation: number; // 1-10
  };
  blueOceanAlignment: {
    sixPathsContribution: string[];
    utilityStageResponsibility: string[];
    buyerGroupFocus: string[];
  };
  createdAt: string;
  targetStartDate?: string;
}

interface TeamStructure {
  id: string;
  name: string;
  description: string;
  roles: StrategicRole[];
  blueOceanFocus: string;
  strategicObjective: string;
  teamSize: number;
  monthlyCost: number;
  effectiveness: number; // 1-10 scale
  keyMetrics: string[];
}

interface CapabilityGap {
  id: string;
  capability: string;
  currentLevel: number; // 1-10
  requiredLevel: number; // 1-10
  gap: number;
  impact: 'high' | 'medium' | 'low';
  addressedBy: string[]; // role IDs
  timeline: string;
  developmentPlan: string;
}

const HRManagementWithIntegration: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const {
    frameworkState,
    blueOceanData,
    insights,
    hasData
  } = useFrameworkData();

  const [strategicRoles, setStrategicRoles] = useState<StrategicRole[]>([]);
  const [teams, setTeams] = useState<TeamStructure[]>([]);
  const [capabilityGaps, setCapabilityGaps] = useState<CapabilityGap[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRole, setSelectedRole] = useState<StrategicRole | null>(null);
  const [newRole, setNewRole] = useState<Partial<StrategicRole>>({
    competencyProfile: {
      strategicThinking: 5,
      emotionalIntelligence: 5,
      analyticalSkills: 5,
      communication: 5,
      leadership: 5,
      innovation: 5
    }
  });

  const toast = useToast();
  const { isOpen: isRoleOpen, onOpen: onRoleOpen, onClose: onRoleClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  // Initialize with demo data and Blue Ocean integrations
  useEffect(() => {
    // Load existing strategic roles from framework state
    const existingRoles = frameworkState.hr.strategicRoles;
    setStrategicRoles(existingRoles);

    // Generate roles from Blue Ocean insights
    const blueOceanRoles: StrategicRole[] = [];

    // Create roles based on Six Paths Analysis
    if (blueOceanData.sixPathsAnalysis.buyerGroups.length > 0) {
      blueOceanData.sixPathsAnalysis.buyerGroups.forEach((group, index) => {
        blueOceanRoles.push({
          id: `role_bo_${index}`,
          title: `${group} Experience Specialist`,
          description: `Strategic role focused on understanding and engaging ${group} buyer group from Blue Ocean Strategy analysis`,
          department: 'marketing',
          level: 'mid',
          status: 'planned',
          blueOceanSource: 'six_paths_buyer_groups',
          emotionalBrandingSkills: blueOceanData.sixPathsAnalysis.functionalEmotional === 'emotional',
          functionalExpertise: [
            'Customer experience design',
            'Buyer journey mapping',
            'Segmentation analysis'
          ],
          requiredCapabilities: [
            `Deep understanding of ${group} needs and behaviors`,
            'Strategic customer engagement',
            'Cross-functional collaboration',
            'Data-driven insights generation'
          ],
          strategicPriority: Math.floor(Math.random() * 3) + 7, // 7-9 priority
          urgencyLevel: 'high',
          estimatedSalary: {
            min: 70000,
            max: 95000,
            currency: 'USD'
          },
          qualifications: {
            education: ['Bachelor\'s in Marketing, Psychology, or Business'],
            experience: ['3-5 years in customer experience or market research'],
            skills: ['Customer analytics', 'Persona development', 'Journey mapping'],
            certifications: ['Customer Experience Professional (CXP)', 'Google Analytics']
          },
          competencyProfile: {
            strategicThinking: Math.floor(Math.random() * 3) + 7,
            emotionalIntelligence: blueOceanData.sixPathsAnalysis.functionalEmotional === 'emotional' ? 9 : 6,
            analyticalSkills: Math.floor(Math.random() * 3) + 6,
            communication: Math.floor(Math.random() * 3) + 7,
            leadership: Math.floor(Math.random() * 3) + 5,
            innovation: Math.floor(Math.random() * 3) + 6
          },
          blueOceanAlignment: {
            sixPathsContribution: [`Buyer group analysis: ${group}`],
            utilityStageResponsibility: ['Purchase', 'Use', 'Supplements'],
            buyerGroupFocus: [group]
          },
          createdAt: new Date().toISOString(),
          targetStartDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        });
      });
    }

    // Create roles based on functional vs emotional orientation
    if (blueOceanData.sixPathsAnalysis.functionalEmotional === 'emotional') {
      blueOceanRoles.push({
        id: 'role_emotional_brand',
        title: 'Emotional Brand Strategist',
        description: 'Drive emotional connections and brand storytelling based on Blue Ocean emotional appeal strategy',
        department: 'marketing',
        level: 'senior',
        status: 'critical',
        blueOceanSource: 'emotional_orientation',
        emotionalBrandingSkills: true,
        functionalExpertise: [
          'Brand storytelling',
          'Emotional marketing',
          'Creative direction',
          'Brand psychology'
        ],
        requiredCapabilities: [
          'Develop emotional brand narratives',
          'Create compelling storytelling frameworks',
          'Design emotional customer touchpoints',
          'Measure emotional brand impact'
        ],
        strategicPriority: 9,
        urgencyLevel: 'critical',
        estimatedSalary: {
          min: 90000,
          max: 130000,
          currency: 'USD'
        },
        qualifications: {
          education: ['Bachelor\'s in Marketing, Communications, or Psychology'],
          experience: ['5+ years in brand strategy or creative marketing'],
          skills: ['Brand strategy', 'Storytelling', 'Creative thinking', 'Psychology'],
          certifications: ['Brand Management', 'Creative Strategy']
        },
        competencyProfile: {
          strategicThinking: 8,
          emotionalIntelligence: 10,
          analyticalSkills: 6,
          communication: 9,
          leadership: 7,
          innovation: 9
        },
        blueOceanAlignment: {
          sixPathsContribution: ['Emotional appeal strategy'],
          utilityStageResponsibility: ['Purchase', 'Use', 'Supplements', 'Maintenance'],
          buyerGroupFocus: blueOceanData.sixPathsAnalysis.buyerGroups
        },
        createdAt: new Date().toISOString(),
        targetStartDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days
      });
    }

    // Create roles based on alternative industries
    if (blueOceanData.sixPathsAnalysis.alternativeIndustries.length > 0) {
      blueOceanRoles.push({
        id: 'role_cross_industry',
        title: 'Cross-Industry Innovation Analyst',
        description: 'Analyze and integrate insights from alternative industries identified in Blue Ocean Strategy',
        department: 'strategy',
        level: 'senior',
        status: 'planned',
        blueOceanSource: 'alternative_industries',
        emotionalBrandingSkills: false,
        functionalExpertise: [
          'Industry analysis',
          'Competitive intelligence',
          'Innovation research',
          'Strategic planning'
        ],
        requiredCapabilities: [
          'Cross-industry pattern recognition',
          'Strategic synthesis and recommendations',
          'Innovation opportunity identification',
          'Market trend analysis'
        ],
        strategicPriority: 8,
        urgencyLevel: 'medium',
        estimatedSalary: {
          min: 85000,
          max: 120000,
          currency: 'USD'
        },
        qualifications: {
          education: ['MBA or Master\'s in Strategy, Business, or related field'],
          experience: ['4-6 years in strategy consulting or business analysis'],
          skills: ['Strategic analysis', 'Market research', 'Innovation management'],
          certifications: ['Strategic Planning', 'Innovation Management']
        },
        competencyProfile: {
          strategicThinking: 9,
          emotionalIntelligence: 6,
          analyticalSkills: 9,
          communication: 7,
          leadership: 6,
          innovation: 8
        },
        blueOceanAlignment: {
          sixPathsContribution: blueOceanData.sixPathsAnalysis.alternativeIndustries.map(industry => `Alternative industry: ${industry}`),
          utilityStageResponsibility: ['Purchase'],
          buyerGroupFocus: blueOceanData.sixPathsAnalysis.buyerGroups
        },
        createdAt: new Date().toISOString(),
        targetStartDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString() // 45 days
      });
    }

    // Add generated roles to existing ones
    if (blueOceanRoles.length > 0) {
      setStrategicRoles(prev => {
        const existingIds = prev.map(role => role.id);
        const newRoles = blueOceanRoles.filter(role => !existingIds.includes(role.id));
        return [...prev, ...newRoles];
      });
    }

    // Generate demo teams
    const demoTeams: TeamStructure[] = [
      {
        id: 'team_blue_ocean',
        name: 'Blue Ocean Strategy Team',
        description: 'Cross-functional team dedicated to implementing Blue Ocean Strategy insights',
        roles: blueOceanRoles,
        blueOceanFocus: 'Six Paths Analysis implementation',
        strategicObjective: 'Create uncontested market space through buyer group expansion',
        teamSize: blueOceanRoles.length,
        monthlyCost: blueOceanRoles.reduce((sum, role) => sum + (role.estimatedSalary.min + role.estimatedSalary.max) / 2 / 12, 0),
        effectiveness: 8,
        keyMetrics: [
          'Blue Ocean insight implementation rate',
          'New buyer group engagement',
          'Cross-industry innovation adoption',
          'Emotional brand connection scores'
        ]
      }
    ];

    setTeams(demoTeams);

    // Generate capability gaps
    const demoGaps: CapabilityGap[] = [
      {
        id: 'gap_emotional_marketing',
        capability: 'Emotional Brand Marketing',
        currentLevel: 4,
        requiredLevel: 8,
        gap: 4,
        impact: 'high',
        addressedBy: blueOceanRoles.filter(role => role.emotionalBrandingSkills).map(role => role.id),
        timeline: '3-6 months',
        developmentPlan: 'Hire Emotional Brand Strategist and train existing team'
      },
      {
        id: 'gap_customer_experience',
        capability: 'Customer Experience Design',
        currentLevel: 5,
        requiredLevel: 9,
        gap: 4,
        impact: 'high',
        addressedBy: blueOceanRoles.filter(role => role.blueOceanAlignment.sixPathsContribution.some(contrib => contrib.includes('Buyer group'))).map(role => role.id),
        timeline: '2-4 months',
        developmentPlan: 'Hire buyer group specialists and implement customer journey mapping'
      },
      {
        id: 'gap_innovation_research',
        capability: 'Cross-Industry Innovation Analysis',
        currentLevel: 3,
        requiredLevel: 7,
        gap: 4,
        impact: 'medium',
        addressedBy: [blueOceanRoles.find(role => role.title.includes('Innovation'))?.id].filter(Boolean) as string[],
        timeline: '4-6 months',
        developmentPlan: 'Establish innovation research team with cross-industry expertise'
      }
    ];

    setCapabilityGaps(demoGaps);
  }, [frameworkState.hr.strategicRoles, blueOceanData]);

  // Generate role from Blue Ocean insight
  const generateRoleFromInsight = (insight: any) => {
    const newRole: StrategicRole = {
      id: `role_${Date.now()}`,
      title: `${insight.title} Specialist`,
      description: `Strategic role created from Blue Ocean Strategy insight: ${insight.description}`,
      department: 'strategy',
      level: 'mid',
      status: 'planned',
      blueOceanSource: insight.id,
      emotionalBrandingSkills: insight.sourceData?.functionalEmotional === 'emotional',
      functionalExpertise: [
        'Strategic insight implementation',
        'Cross-functional coordination',
        'Performance measurement'
      ],
      requiredCapabilities: insight.recommendations.slice(0, 3),
      strategicPriority: Math.floor(Math.random() * 3) + 7,
      urgencyLevel: 'high',
      estimatedSalary: {
        min: 75000,
        max: 105000,
        currency: 'USD'
      },
      qualifications: {
        education: ['Bachelor\'s in Business, Strategy, or related field'],
        experience: ['3-5 years in strategic roles or consulting'],
        skills: ['Strategic thinking', 'Project management', 'Data analysis'],
        certifications: ['Strategic Planning', 'Project Management']
      },
      competencyProfile: {
        strategicThinking: 8,
        emotionalIntelligence: insight.sourceData?.functionalEmotional === 'emotional' ? 8 : 6,
        analyticalSkills: 7,
        communication: 7,
        leadership: 6,
        innovation: 7
      },
      blueOceanAlignment: {
        sixPathsContribution: [insight.title],
        utilityStageResponsibility: ['Purchase', 'Use'],
        buyerGroupFocus: insight.sourceData?.buyerGroups || []
      },
      createdAt: new Date().toISOString()
    };

    setStrategicRoles(prev => [...prev, newRole]);
    
    toast({
      title: "Strategic Role Created!",
      description: `Created "${newRole.title}" from Blue Ocean insight`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filled': return 'green';
      case 'interviewing': return 'blue';
      case 'open': return 'orange';
      case 'critical': return 'red';
      case 'planned': return 'gray';
      default: return 'gray';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'executive': return 'purple';
      case 'senior': return 'blue';
      case 'mid': return 'green';
      case 'junior': return 'gray';
      default: return 'gray';
    }
  };

  const calculateTeamEffectiveness = (roles: StrategicRole[]): number => {
    if (roles.length === 0) return 0;
    const avgCompetency = roles.reduce((sum, role) => {
      const roleAvg = Object.values(role.competencyProfile).reduce((s, v) => s + v, 0) / 6;
      return sum + roleAvg;
    }, 0) / roles.length;
    return Math.round(avgCompetency);
  };

  const renderStrategicRolesDashboard = () => (
    <VStack spacing={6} align="stretch">
      {/* Integration Status */}
      {hasData && (
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Blue Ocean HR Integration Active</Text>
            <Text fontSize="sm">
              {strategicRoles.filter(r => r.blueOceanSource).length} strategic roles generated from Blue Ocean Strategy insights. 
              {teams.filter(t => t.blueOceanFocus).length} teams aligned with Blue Ocean objectives.
            </Text>
          </VStack>
        </Alert>
      )}

      {!hasData && (
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Ready for Blue Ocean HR Integration</Text>
            <Text fontSize="sm">
              Complete Blue Ocean Strategy Six Paths Analysis to automatically generate strategic roles and team structures aligned with your Blue Ocean insights.
            </Text>
          </VStack>
        </Alert>
      )}

      {/* HR Overview Metrics */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {strategicRoles.length}
            </Text>
            <Text fontSize="sm" color="gray.600">Strategic Roles</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              {strategicRoles.filter(r => r.status === 'filled').length}
            </Text>
            <Text fontSize="sm" color="gray.600">Positions Filled</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="purple.500">
              {strategicRoles.filter(r => r.blueOceanSource).length}
            </Text>
            <Text fontSize="sm" color="gray.600">From Blue Ocean</Text>
          </CardBody>
        </Card>
        <Card bg={cardBg}>
          <CardBody textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="orange.500">
              {strategicRoles.filter(r => r.urgencyLevel === 'critical' || r.urgencyLevel === 'high').length}
            </Text>
            <Text fontSize="sm" color="gray.600">High Priority</Text>
          </CardBody>
        </Card>
      </Grid>

      {/* Strategic Roles List */}
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">Strategic Roles</Text>
            <Button size="sm" colorScheme="blue" onClick={onRoleOpen}>
              Create Role
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {strategicRoles.map(role => (
              <Card key={role.id} bg={infoBg} _hover={{ shadow: 'md' }} cursor="pointer">
                <CardBody>
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Text fontWeight="semibold">{role.title}</Text>
                        {role.blueOceanSource && (
                          <Badge colorScheme="purple" size="sm">🌊 Blue Ocean</Badge>
                        )}
                        {role.emotionalBrandingSkills && (
                          <Badge colorScheme="pink" size="sm">💖 Emotional</Badge>
                        )}
                        <Badge colorScheme={getLevelBadgeColor(role.level)} size="sm">
                          {role.level}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">{role.description}</Text>
                      <HStack spacing={4}>
                        <Text fontSize="xs">
                          <strong>Department:</strong> {role.department}
                        </Text>
                        <Text fontSize="xs">
                          <strong>Priority:</strong> {role.strategicPriority}/10
                        </Text>
                        <Text fontSize="xs">
                          <strong>Salary:</strong> ${role.estimatedSalary.min.toLocaleString()}-${role.estimatedSalary.max.toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack align="end" spacing={2}>
                      <Badge colorScheme={getStatusColor(role.status)}>
                        {role.status}
                      </Badge>
                      <Badge colorScheme={getUrgencyColor(role.urgencyLevel)} size="sm">
                        {role.urgencyLevel} urgency
                      </Badge>
                      {role.targetStartDate && (
                        <Text fontSize="xs" color="gray.500">
                          Target: {new Date(role.targetStartDate).toLocaleDateString()}
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                  {role.blueOceanAlignment && (
                    <Box mt={3} p={2} bg="purple.50" borderRadius="md">
                      <Text fontSize="xs" fontWeight="semibold" mb={1}>Blue Ocean Alignment:</Text>
                      <Text fontSize="xs">
                        Focus: {role.blueOceanAlignment.buyerGroupFocus.join(', ') || 'General strategic alignment'}
                      </Text>
                    </Box>
                  )}
                </CardBody>
              </Card>
            ))}
            {strategicRoles.length === 0 && (
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  No strategic roles yet. Create roles manually or complete Blue Ocean Strategy analysis to auto-generate strategic positions.
                </Text>
              </Alert>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderCapabilityGaps = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="warning">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Strategic Capability Analysis</Text>
          <Text fontSize="sm">
            Identified capability gaps based on Blue Ocean Strategy requirements and current organizational capacity.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {capabilityGaps.map(gap => (
          <Card key={gap.id} bg={cardBg}>
            <CardHeader>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{gap.capability}</Text>
                  <Badge colorScheme={gap.impact === 'high' ? 'red' : gap.impact === 'medium' ? 'orange' : 'blue'}>
                    {gap.impact} impact
                  </Badge>
                </VStack>
                <VStack align="end" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="red.500">
                    {gap.gap}
                  </Text>
                  <Text fontSize="xs" color="gray.500">Gap Level</Text>
                </VStack>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Current vs Required Level</Text>
                  <HStack spacing={4}>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="xs">Current: {gap.currentLevel}/10</Text>
                      <Progress value={gap.currentLevel * 10} colorScheme="red" size="sm" width="100px" />
                    </VStack>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="xs">Required: {gap.requiredLevel}/10</Text>
                      <Progress value={gap.requiredLevel * 10} colorScheme="green" size="sm" width="100px" />
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>Development Plan:</Text>
                  <Text fontSize="sm" color="gray.600">{gap.developmentPlan}</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>Timeline:</Text>
                  <Text fontSize="sm" color="gray.600">{gap.timeline}</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>Addressed by Roles:</Text>
                  <VStack align="start" spacing={1}>
                    {gap.addressedBy.map(roleId => {
                      const role = strategicRoles.find(r => r.id === roleId);
                      return role ? (
                        <Badge key={roleId} size="sm" colorScheme="blue">
                          {role.title}
                        </Badge>
                      ) : null;
                    })}
                  </VStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {capabilityGaps.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          <Text fontSize="sm">
            Complete Blue Ocean Strategy analysis to identify capability gaps and development needs.
          </Text>
        </Alert>
      )}
    </VStack>
  );

  const renderBlueOceanHRInsights = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="success">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Blue Ocean HR Intelligence</Text>
          <Text fontSize="sm">
            Strategic HR insights derived from Blue Ocean Strategy that can be converted into strategic roles and team structures.
          </Text>
        </VStack>
      </Alert>

      {insights.filter(insight => insight.targetFrameworks.includes('hr')).map(insight => (
        <Card key={insight.id} bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="bold">{insight.title}</Text>
                <Text fontSize="sm" color="gray.600">{insight.description}</Text>
              </VStack>
              <Button 
                size="sm" 
                colorScheme="blue"
                onClick={() => generateRoleFromInsight(insight)}
                isDisabled={strategicRoles.some(r => r.blueOceanSource === insight.id)}
              >
                {strategicRoles.some(r => r.blueOceanSource === insight.id) ? 'Role Created' : 'Generate Role'}
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>HR Recommendations:</Text>
                <VStack align="start" spacing={1}>
                  {insight.recommendations.map((rec: string, index: number) => (
                    <Text key={index} fontSize="sm">• {rec}</Text>
                  ))}
                </VStack>
              </Box>
              
              {insight.appliedResults && insight.appliedResults.length > 0 && (
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2">Applied Results:</Text>
                  <VStack spacing={2} align="stretch">
                    {insight.appliedResults.filter((result: any) => result.framework === 'hr').map((result: any, index: number) => (
                      <Box key={index} p={3} bg={successBg} borderRadius="md">
                        <Text fontSize="sm" fontWeight="semibold">{result.action}</Text>
                        <Text fontSize="sm" color="gray.600">{result.outcome}</Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>
      ))}

      {insights.filter(insight => insight.targetFrameworks.includes('hr')).length === 0 && (
        <Alert status="info">
          <AlertIcon />
          <Text fontSize="sm">
            No Blue Ocean insights available for HR yet. Complete Six Paths Analysis and generate insights to see HR opportunities.
          </Text>
        </Alert>
      )}
    </VStack>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">👥</Text>
            <Text fontSize="3xl" fontWeight="bold">HR Management</Text>
            <Badge colorScheme="green" ml={2}>BLUE OCEAN INTEGRATED</Badge>
          </HStack>
          <Text color="gray.600" mb={6}>
            Strategic human resources management powered by Blue Ocean Strategy insights. Generate strategic roles and team structures aligned with your Blue Ocean positioning.
          </Text>
        </Box>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Strategic Roles</Tab>
            <Tab>Capability Gaps</Tab>
            <Tab>Blue Ocean HR Insights</Tab>
            <Tab>Team Structures</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderStrategicRolesDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              {renderCapabilityGaps()}
            </TabPanel>
            <TabPanel px={0}>
              {renderBlueOceanHRInsights()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Advanced team structure optimization with Blue Ocean integration coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default HRManagementWithIntegration;