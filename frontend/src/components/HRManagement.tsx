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
  Badge,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  CircularProgress,
  CircularProgressLabel,
  Avatar,
  AvatarGroup,
  IconButton,
  Tooltip
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
  NumberInput,
  NumberInputField,
  Switch,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

// Strategic HR Management Data Structures
interface StrategicRole {
  id: string;
  title: string;
  department: string;
  level: 'entry' | 'mid' | 'senior' | 'executive';
  strategicImportance: 'critical' | 'important' | 'supporting';
  linkedFramework: string[];
  competencies: Competency[];
  jobDescription: JobDescription;
  salaryRange: { min: number; max: number };
  requiredCount: number;
  currentCount: number;
  gapAnalysis: SkillGap[];
  trainingNeeds: TrainingRequirement[];
  createdAt: string;
}

interface Competency {
  id: string;
  name: string;
  type: 'technical' | 'strategic' | 'leadership' | 'behavioral';
  level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  strategicValue: number; // 1-10 scale
  assessmentCriteria: string[];
  developmentPath: string[];
}

interface JobDescription {
  summary: string;
  keyResponsibilities: string[];
  strategicContribution: string;
  requiredQualifications: string[];
  preferredQualifications: string[];
  competencyRequirements: CompetencyRequirement[];
  performanceMetrics: string[];
  careerProgression: string[];
}

interface CompetencyRequirement {
  competencyId: string;
  requiredLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
  weight: number; // importance weight
  assessmentMethod: string;
}

interface SkillGap {
  competencyId: string;
  currentLevel: string;
  requiredLevel: string;
  gapSize: number;
  impact: 'high' | 'medium' | 'low';
  recommendations: string[];
}

interface TrainingRequirement {
  id: string;
  title: string;
  type: 'strategic' | 'technical' | 'leadership' | 'compliance';
  urgency: 'immediate' | 'short-term' | 'long-term';
  targetRoles: string[];
  learningObjectives: string[];
  deliveryMethod: 'online' | 'classroom' | 'workshop' | 'mentoring' | 'project';
  duration: number; // hours
  cost: number;
  strategicAlignment: string;
  measurableOutcomes: string[];
}

interface WorkforcePlan {
  id: string;
  planningHorizon: '1-year' | '3-year' | '5-year';
  strategicObjectives: string[];
  currentWorkforce: WorkforceAnalysis;
  futureNeeds: FutureWorkforceNeeds;
  gapAnalysis: WorkforceGap[];
  actionPlan: HRAction[];
  budget: HRBudget;
  risks: HRRisk[];
}

interface WorkforceAnalysis {
  totalEmployees: number;
  byDepartment: Record<string, number>;
  byLevel: Record<string, number>;
  avgTenure: number;
  turnoverRate: number;
  skillDistribution: Record<string, number>;
  performanceDistribution: Record<string, number>;
}

interface FutureWorkforceNeeds {
  totalRequired: number;
  newRoles: StrategicRole[];
  expandingRoles: { roleId: string; additionalCount: number }[];
  decliningRoles: { roleId: string; reductionCount: number }[];
  skillEvolution: { skill: string; futureImportance: number }[];
}

interface WorkforceGap {
  area: string;
  currentState: string;
  requiredState: string;
  gapSize: number;
  impact: string;
  timeframe: string;
  solutions: string[];
}

interface HRAction {
  id: string;
  type: 'hire' | 'train' | 'redeploy' | 'promote' | 'restructure';
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeline: string;
  cost: number;
  expectedOutcome: string;
  dependencies: string[];
}

interface HRBudget {
  total: number;
  hiring: number;
  training: number;
  retention: number;
  technology: number;
  contingency: number;
}

interface HRRisk {
  risk: string;
  probability: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  mitigation: string[];
}

// Strategic HR Management Component
const HRManagement: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const [roles, setRoles] = useState<StrategicRole[]>([]);
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingRequirement[]>([]);
  const [workforcePlan, setWorkforcePlan] = useState<WorkforcePlan | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const { isOpen: isRoleOpen, onOpen: onRoleOpen, onClose: onRoleClose } = useDisclosure();
  const { isOpen: isTrainingOpen, onOpen: onTrainingOpen, onClose: onTrainingClose } = useDisclosure();
  const { isOpen: isJobDescOpen, onOpen: onJobDescOpen, onClose: onJobDescClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  // Initialize demo data
  useEffect(() => {
    const demoCompetencies: Competency[] = [
      {
        id: 'comp_001',
        name: 'Strategic Thinking',
        type: 'strategic',
        level: 'advanced',
        strategicValue: 9,
        assessmentCriteria: ['Framework application', 'Systems thinking', 'Long-term planning'],
        developmentPath: ['Strategy courses', 'Framework training', 'Mentoring']
      },
      {
        id: 'comp_002',
        name: 'Blue Ocean Innovation',
        type: 'strategic',
        level: 'expert',
        strategicValue: 10,
        assessmentCriteria: ['Value innovation', 'Market creation', 'Competitive analysis'],
        developmentPath: ['Blue Ocean certification', 'Innovation workshops', 'Case study analysis']
      },
      {
        id: 'comp_003',
        name: 'Digital Marketing Automation',
        type: 'technical',
        level: 'intermediate',
        strategicValue: 8,
        assessmentCriteria: ['Platform proficiency', 'Campaign optimization', 'Analytics interpretation'],
        developmentPath: ['Marketing automation training', 'Analytics courses', 'Hands-on projects']
      }
    ];

    const demoRoles: StrategicRole[] = [
      {
        id: 'role_001',
        title: 'Strategic Marketing Director',
        department: 'Marketing',
        level: 'senior',
        strategicImportance: 'critical',
        linkedFramework: ['Blue Ocean Strategy', 'Porter Five Forces'],
        competencies: demoCompetencies,
        jobDescription: {
          summary: 'Lead strategic marketing initiatives that align with business strategy and drive competitive advantage through innovative market positioning.',
          keyResponsibilities: [
            'Develop marketing strategies based on strategic framework insights',
            'Lead blue ocean market creation initiatives',
            'Design and execute integrated marketing campaigns',
            'Analyze competitive landscape and identify opportunities',
            'Manage marketing automation platforms and optimization'
          ],
          strategicContribution: 'Drives revenue growth through strategic market positioning and competitive differentiation',
          requiredQualifications: [
            'MBA or equivalent in Marketing/Strategy',
            '8+ years marketing leadership experience',
            'Proven track record in strategic marketing',
            'Experience with marketing automation platforms'
          ],
          preferredQualifications: [
            'Strategy framework certification (Blue Ocean, Porter)',
            'Experience in competitive analysis',
            'Background in digital transformation',
            'International market experience'
          ],
          competencyRequirements: [
            { competencyId: 'comp_001', requiredLevel: 'advanced', weight: 9, assessmentMethod: 'Case study + Interview' },
            { competencyId: 'comp_002', requiredLevel: 'expert', weight: 10, assessmentMethod: 'Framework application test' },
            { competencyId: 'comp_003', requiredLevel: 'intermediate', weight: 7, assessmentMethod: 'Technical assessment' }
          ],
          performanceMetrics: [
            'Revenue growth from strategic initiatives',
            'Market share improvement',
            'Campaign ROI and strategic impact',
            'Competitive positioning advancement'
          ],
          careerProgression: [
            'Chief Marketing Officer',
            'VP of Strategy',
            'General Manager'
          ]
        },
        salaryRange: { min: 120000, max: 180000 },
        requiredCount: 2,
        currentCount: 1,
        gapAnalysis: [
          {
            competencyId: 'comp_002',
            currentLevel: 'intermediate',
            requiredLevel: 'expert',
            gapSize: 2,
            impact: 'high',
            recommendations: ['Blue Ocean certification', 'Advanced training program']
          }
        ],
        trainingNeeds: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 'role_002',
        title: 'Strategic Operations Manager',
        department: 'Operations',
        level: 'mid',
        strategicImportance: 'important',
        linkedFramework: ['VRIO Analysis', 'Value Chain Analysis'],
        competencies: [demoCompetencies[0]],
        jobDescription: {
          summary: 'Optimize operational processes and capabilities to support strategic objectives and competitive advantages.',
          keyResponsibilities: [
            'Conduct VRIO analysis of operational capabilities',
            'Design value chain optimization initiatives',
            'Implement strategic operational improvements',
            'Manage cross-functional project teams',
            'Monitor operational performance metrics'
          ],
          strategicContribution: 'Builds operational capabilities that support sustainable competitive advantage',
          requiredQualifications: [
            'Bachelor\'s degree in Operations/Business',
            '5+ years operations management experience',
            'Project management certification',
            'Process improvement expertise'
          ],
          preferredQualifications: [
            'Strategy framework knowledge',
            'Lean Six Sigma certification',
            'Cross-functional leadership experience'
          ],
          competencyRequirements: [
            { competencyId: 'comp_001', requiredLevel: 'intermediate', weight: 8, assessmentMethod: 'Behavioral interview' }
          ],
          performanceMetrics: [
            'Operational efficiency improvements',
            'Cost reduction achievements',
            'Process optimization results',
            'Strategic capability development'
          ],
          careerProgression: [
            'Senior Operations Manager',
            'VP of Operations',
            'Chief Operating Officer'
          ]
        },
        salaryRange: { min: 80000, max: 120000 },
        requiredCount: 3,
        currentCount: 2,
        gapAnalysis: [],
        trainingNeeds: [],
        createdAt: new Date().toISOString()
      }
    ];

    const demoTraining: TrainingRequirement[] = [
      {
        id: 'train_001',
        title: 'Blue Ocean Strategy Certification Program',
        type: 'strategic',
        urgency: 'immediate',
        targetRoles: ['role_001'],
        learningObjectives: [
          'Master Blue Ocean Strategy framework',
          'Apply value innovation principles',
          'Create strategic canvases',
          'Develop implementation plans'
        ],
        deliveryMethod: 'workshop',
        duration: 40,
        cost: 5000,
        strategicAlignment: 'Critical for market differentiation and competitive advantage',
        measurableOutcomes: [
          'Framework certification completion',
          'Strategic canvas creation',
          'Market opportunity identification',
          'Implementation plan development'
        ]
      },
      {
        id: 'train_002',
        title: 'Strategic Marketing Automation Mastery',
        type: 'technical',
        urgency: 'short-term',
        targetRoles: ['role_001'],
        learningObjectives: [
          'Advanced platform proficiency',
          'Strategic campaign development',
          'ROI optimization techniques',
          'Integration with strategic frameworks'
        ],
        deliveryMethod: 'online',
        duration: 24,
        cost: 2500,
        strategicAlignment: 'Essential for marketing effectiveness and strategic execution',
        measurableOutcomes: [
          'Platform certification',
          'Campaign performance improvement',
          'ROI increase targets',
          'Strategic integration success'
        ]
      }
    ];

    setCompetencies(demoCompetencies);
    setRoles(demoRoles);
    setTrainingPrograms(demoTraining);
  }, []);

  const generateJobDescription = (role: StrategicRole) => {
    // AI-powered job description generation would go here
    console.log('Generating optimized job description for:', role.title);
  };

  const createTrainingPlan = () => {
    // Strategic training plan creation
    console.log('Creating strategic training plan');
  };

  const renderRoleManagement = () => (
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
      <VStack spacing={6} align="stretch">
        {/* Strategic Roles Overview */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Strategic Roles & Capabilities</Text>
              <Button colorScheme="blue" size="sm" onClick={onRoleOpen}>
                + Define New Role
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={6}>
              <Card bg={successBg} p={4}>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold">{roles.length}</Text>
                  <Text fontSize="sm" textAlign="center">Strategic Roles</Text>
                </VStack>
              </Card>
              <Card bg={infoBg} p={4}>
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold">
                    {roles.filter(r => r.strategicImportance === 'critical').length}
                  </Text>
                  <Text fontSize="sm" textAlign="center">Critical Positions</Text>
                </VStack>
              </Card>
              <Card bg={cardBg} p={4} border="2px" borderColor="orange.200">
                <VStack>
                  <Text fontSize="2xl" fontWeight="bold">
                    {roles.reduce((sum, r) => sum + Math.max(0, r.requiredCount - r.currentCount), 0)}
                  </Text>
                  <Text fontSize="sm" textAlign="center">Open Positions</Text>
                </VStack>
              </Card>
            </Grid>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Role</Th>
                  <Th>Strategic Level</Th>
                  <Th>Headcount</Th>
                  <Th>Skill Gaps</Th>
                  <Th>Salary Range</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {roles.map(role => (
                  <Tr key={role.id}>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">{role.title}</Text>
                        <Text fontSize="xs" color="gray.500">{role.department}</Text>
                        <HStack spacing={1}>
                          {role.linkedFramework.map(framework => (
                            <Badge key={framework} size="xs" colorScheme="purple" variant="outline">
                              {framework}
                            </Badge>
                          ))}
                        </HStack>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge 
                        colorScheme={
                          role.strategicImportance === 'critical' ? 'red' : 
                          role.strategicImportance === 'important' ? 'orange' : 'gray'
                        }
                      >
                        {role.strategicImportance}
                      </Badge>
                    </Td>
                    <Td>
                      <VStack spacing={1}>
                        <Text fontSize="sm">{role.currentCount}/{role.requiredCount}</Text>
                        <Progress 
                          value={(role.currentCount / role.requiredCount) * 100}
                          size="sm"
                          w="60px"
                          colorScheme={role.currentCount >= role.requiredCount ? 'green' : 'orange'}
                        />
                      </VStack>
                    </Td>
                    <Td>
                      <Text fontSize="sm">{role.gapAnalysis.length} gaps</Text>
                      {role.gapAnalysis.length > 0 && (
                        <Badge size="xs" colorScheme="red">High Impact</Badge>
                      )}
                    </Td>
                    <Td>
                      <Text fontSize="sm">
                        ${role.salaryRange.min.toLocaleString()} - ${role.salaryRange.max.toLocaleString()}
                      </Text>
                    </Td>
                    <Td>
                      <VStack spacing={1}>
                        <Button size="xs" variant="outline" onClick={onJobDescOpen}>
                          Job Description
                        </Button>
                        <Button size="xs" colorScheme="green" variant="outline">
                          Training Plan
                        </Button>
                      </VStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Competency Framework */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">Strategic Competency Framework</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              {competencies.map(competency => (
                <Box key={competency.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="semibold">{competency.name}</Text>
                    <Badge colorScheme={
                      competency.type === 'strategic' ? 'purple' :
                      competency.type === 'leadership' ? 'blue' :
                      competency.type === 'technical' ? 'green' : 'gray'
                    }>
                      {competency.type}
                    </Badge>
                  </HStack>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Text fontSize="sm">Strategic Value:</Text>
                      <Progress value={competency.strategicValue * 10} size="sm" w="80px" colorScheme="purple" />
                      <Text fontSize="sm">{competency.strategicValue}/10</Text>
                    </HStack>
                    <Text fontSize="xs" color="gray.600">
                      Development: {competency.developmentPath.slice(0, 2).join(', ')}
                      {competency.developmentPath.length > 2 && '...'}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </CardBody>
        </Card>
      </VStack>

      <VStack spacing={6} align="stretch">
        {/* Training Requirements */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Training Programs</Text>
              <Button size="sm" colorScheme="green" onClick={onTrainingOpen}>
                + New Program
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {trainingPrograms.map(program => (
                <Box key={program.id} p={3} border="1px" borderColor="gray.200" borderRadius="md">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="semibold" fontSize="sm">{program.title}</Text>
                    <Badge colorScheme={
                      program.urgency === 'immediate' ? 'red' :
                      program.urgency === 'short-term' ? 'orange' : 'blue'
                    }>
                      {program.urgency}
                    </Badge>
                  </HStack>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" color="gray.600">{program.strategicAlignment}</Text>
                    <HStack>
                      <Text fontSize="xs">Duration: {program.duration}h</Text>
                      <Text fontSize="xs">Cost: ${program.cost.toLocaleString()}</Text>
                    </HStack>
                    <Text fontSize="xs">Method: {program.deliveryMethod}</Text>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Workforce Analytics */}
        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">Workforce Analytics</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Box p={3} bg={infoBg} borderRadius="md">
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Strategic Capability Distribution</Text>
                <VStack spacing={2}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="xs">Strategic Thinking</Text>
                    <Text fontSize="xs">65%</Text>
                  </HStack>
                  <Progress value={65} size="sm" colorScheme="purple" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="xs">Innovation</Text>
                    <Text fontSize="xs">45%</Text>
                  </HStack>
                  <Progress value={45} size="sm" colorScheme="blue" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="xs">Digital Skills</Text>
                    <Text fontSize="xs">78%</Text>
                  </HStack>
                  <Progress value={78} size="sm" colorScheme="green" />
                </VStack>
              </Box>

              <Alert status="warning">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">Skill Gap Alert</Text>
                  <Text fontSize="xs">
                    Innovation capabilities below strategic requirements. 
                    Blue Ocean training recommended for 5 employees.
                  </Text>
                </VStack>
              </Alert>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Grid>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">👥</Text>
            <Text fontSize="3xl" fontWeight="bold">Strategic HR Management</Text>
          </HStack>
          <Text color="gray.600" mb={6}>
            Comprehensive HR platform that aligns talent management with strategic objectives and competitive advantages
          </Text>
        </Box>

        {/* Strategic Value Proposition */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Strategic HR Advantage</Text>
            <Text fontSize="sm">
              Unlike traditional HR systems, Lucidra connects every HR decision to strategic frameworks, 
              ensuring your talent strategy directly supports competitive advantage and business objectives.
            </Text>
          </VStack>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Roles & Competencies</Tab>
            <Tab>Job Description AI</Tab>
            <Tab>Workforce Planning</Tab>
            <Tab>Training & Development</Tab>
            <Tab>Strategic Analytics</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderRoleManagement()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>AI-powered job description generator with strategic competency integration coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Strategic workforce planning with scenario modeling coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Comprehensive training management with strategic learning paths coming soon.</Text>
              </Alert>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>HR analytics dashboard with strategic impact measurement coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Role Creation Modal */}
      <Modal isOpen={isRoleOpen} onClose={onRoleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Define Strategic Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  Strategic roles are defined based on their contribution to competitive advantage and framework implementation.
                </Text>
              </Alert>

              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <FormControl>
                  <FormLabel>Role Title</FormLabel>
                  <Input placeholder="Enter role title" />
                </FormControl>

                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <Select placeholder="Select department">
                    <option value="strategy">Strategy</option>
                    <option value="marketing">Marketing</option>
                    <option value="operations">Operations</option>
                    <option value="hr">Human Resources</option>
                    <option value="finance">Finance</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Strategic Importance</FormLabel>
                  <RadioGroup>
                    <Stack direction="row">
                      <Radio value="critical">Critical</Radio>
                      <Radio value="important">Important</Radio>
                      <Radio value="supporting">Supporting</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Required Count</FormLabel>
                  <NumberInput min={1}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>Linked Strategic Frameworks</FormLabel>
                <VStack align="start">
                  <Checkbox>Blue Ocean Strategy</Checkbox>
                  <Checkbox>Porter Five Forces</Checkbox>
                  <Checkbox>VRIO Analysis</Checkbox>
                  <Checkbox>Value Chain Analysis</Checkbox>
                </VStack>
              </FormControl>

              <FormControl>
                <FormLabel>Strategic Contribution</FormLabel>
                <Textarea placeholder="Describe how this role contributes to strategic objectives..." rows={3} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onRoleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onRoleClose}>
              Create Role
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HRManagement;