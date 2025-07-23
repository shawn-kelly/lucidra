import React, { useState, useEffect, useCallback } from 'react';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagCloseButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Checkbox,
  CheckboxGroup,
  Stack,
  Avatar,
  AvatarGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useToast,
  Spinner,
  CircularProgress,
  CircularProgressLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { 
  AddIcon, 
  EditIcon, 
  DeleteIcon, 
  CalendarIcon, 
  TimeIcon,
  ViewIcon,
  InfoIcon,
  WarningIcon,
  CheckIcon,
  ArrowForwardIcon,
  StarIcon,
  AttachmentIcon,
  SearchIcon,
  DownloadIcon,
  ChatIcon,
  BellIcon,
  SettingsIcon
} from '@chakra-ui/icons';

interface ProjectTask {
  id: string;
  name: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  estimatedHours: number;
  actualHours: number;
  startDate: string;
  endDate: string;
  dependencies: string[];
  tags: string[];
  progress: number;
  cost: number;
  resources: ProjectResource[];
  milestones: ProjectMilestone[];
  comments: TaskComment[];
}

interface ProjectResource {
  id: string;
  name: string;
  type: 'human' | 'equipment' | 'material' | 'software' | 'budget';
  allocation: number; // percentage or quantity
  cost: number;
  availability: string;
  skills?: string[];
  location?: string;
}

interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  dependencies: string[];
  deliverables: string[];
}

interface TaskComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'status_change' | 'resource_update';
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'closing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  manager: string;
  team: string[];
  startDate: string;
  endDate: string;
  budget: number;
  actualCost: number;
  progress: number;
  tasks: ProjectTask[];
  milestones: ProjectMilestone[];
  resources: ProjectResource[];
  tags: string[];
  riskLevel: 'low' | 'medium' | 'high';
  healthScore: number;
  stakeholders: string[];
  processIntegration?: {
    linkedProcesses: string[];
    sharedResources: string[];
    dependencies: string[];
  };
}

interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedDuration: number;
  tasks: Partial<ProjectTask>[];
  milestones: Partial<ProjectMilestone>[];
  requiredRoles: string[];
  complexity: 'simple' | 'medium' | 'complex';
}

const ProjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [standaloneMode, setStandaloneMode] = useState(false);
  const [ganttView, setGanttView] = useState(false);
  
  const { isOpen: isNewProjectOpen, onOpen: onNewProjectOpen, onClose: onNewProjectClose } = useDisclosure();
  const { isOpen: isTaskOpen, onOpen: onTaskOpen, onClose: onTaskClose } = useDisclosure();
  const { isOpen: isGanttOpen, onOpen: onGanttOpen, onClose: onGanttClose } = useDisclosure();
  const { isOpen: isResourceOpen, onOpen: onResourceOpen, onClose: onResourceClose } = useDisclosure();
  
  const toast = useToast();

  useEffect(() => {
    // Initialize sample data
    const sampleTeam = [
      'Sarah Mitchell', 
      'John Smith', 
      'Elena Rodriguez', 
      'Marcus Johnson', 
      'David Kim',
      'Lisa Wang',
      'James Chen',
      'Maya Patel'
    ];

    const sampleResources: ProjectResource[] = [
      {
        id: '1',
        name: 'Senior Developer',
        type: 'human',
        allocation: 100,
        cost: 75,
        availability: '9 AM - 5 PM',
        skills: ['React', 'TypeScript', 'Node.js'],
        location: 'Remote'
      },
      {
        id: '2',
        name: 'Project Server License',
        type: 'software',
        allocation: 1,
        cost: 200,
        availability: '24/7',
        location: 'Cloud'
      },
      {
        id: '3',
        name: 'Development Hardware',
        type: 'equipment',
        allocation: 2,
        cost: 150,
        availability: 'Business Hours',
        location: 'Office'
      }
    ];

    const sampleProjects: Project[] = [
      {
        id: '1',
        name: 'Customer Portal Redesign',
        description: 'Complete overhaul of customer-facing portal with modern UI/UX and enhanced functionality',
        status: 'active',
        priority: 'high',
        manager: 'Sarah Mitchell',
        team: ['John Smith', 'Elena Rodriguez', 'Marcus Johnson'],
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        budget: 150000,
        actualCost: 45000,
        progress: 35,
        tasks: [
          {
            id: '1',
            name: 'User Research & Analysis',
            description: 'Conduct user interviews and analyze current portal usage patterns',
            status: 'completed',
            priority: 'high',
            assignee: 'Elena Rodriguez',
            estimatedHours: 40,
            actualHours: 38,
            startDate: '2024-02-01',
            endDate: '2024-02-15',
            dependencies: [],
            tags: ['research', 'ux'],
            progress: 100,
            cost: 3800,
            resources: [sampleResources[0]],
            milestones: [],
            comments: [
              {
                id: '1',
                author: 'Elena Rodriguez',
                content: 'Completed user interviews with 25 customers. Key insights documented.',
                timestamp: '2024-02-15 14:30',
                type: 'status_change'
              }
            ]
          },
          {
            id: '2',
            name: 'UI/UX Design',
            description: 'Create wireframes, mockups, and interactive prototypes',
            status: 'in_progress',
            priority: 'high',
            assignee: 'John Smith',
            estimatedHours: 60,
            actualHours: 25,
            startDate: '2024-02-16',
            endDate: '2024-03-15',
            dependencies: ['1'],
            tags: ['design', 'ui', 'ux'],
            progress: 60,
            cost: 4500,
            resources: [sampleResources[0]],
            milestones: [],
            comments: []
          },
          {
            id: '3',
            name: 'Frontend Development',
            description: 'Implement new UI components and integrate with backend APIs',
            status: 'not_started',
            priority: 'medium',
            assignee: 'Marcus Johnson',
            estimatedHours: 120,
            actualHours: 0,
            startDate: '2024-03-16',
            endDate: '2024-04-20',
            dependencies: ['2'],
            tags: ['development', 'frontend'],
            progress: 0,
            cost: 9000,
            resources: [sampleResources[0], sampleResources[1]],
            milestones: [],
            comments: []
          }
        ],
        milestones: [
          {
            id: '1',
            name: 'Design Approval',
            description: 'Final design approval from stakeholders',
            dueDate: '2024-03-15',
            status: 'pending',
            dependencies: ['2'],
            deliverables: ['Approved mockups', 'Style guide', 'Component library']
          },
          {
            id: '2',
            name: 'Beta Release',
            description: 'Internal beta version for testing',
            dueDate: '2024-04-15',
            status: 'pending',
            dependencies: ['3'],
            deliverables: ['Beta application', 'Test plan', 'Bug reports']
          }
        ],
        resources: sampleResources,
        tags: ['customer', 'portal', 'redesign', 'ui/ux'],
        riskLevel: 'medium',
        healthScore: 78,
        stakeholders: ['Sarah Mitchell', 'Customer Success Team', 'IT Department'],
        processIntegration: {
          linkedProcesses: ['Customer Onboarding', 'Support Ticket Resolution'],
          sharedResources: ['Customer Service Team', 'Development Team'],
          dependencies: ['User Authentication Process', 'Data Migration Process']
        }
      },
      {
        id: '2',
        name: 'Process Automation Initiative',
        description: 'Automate key business processes to improve efficiency and reduce manual work',
        status: 'planning',
        priority: 'medium',
        manager: 'David Kim',
        team: ['Lisa Wang', 'James Chen'],
        startDate: '2024-03-01',
        endDate: '2024-06-30',
        budget: 200000,
        actualCost: 15000,
        progress: 15,
        tasks: [],
        milestones: [],
        resources: [],
        tags: ['automation', 'process', 'efficiency'],
        riskLevel: 'low',
        healthScore: 85,
        stakeholders: ['Operations Team', 'Management'],
        processIntegration: {
          linkedProcesses: ['Order Processing', 'Invoice Generation', 'Customer Support'],
          sharedResources: ['Operations Team', 'IT Team'],
          dependencies: ['System Integration', 'Data Standardization']
        }
      }
    ];

    const sampleTemplates: ProjectTemplate[] = [
      {
        id: '1',
        name: 'Software Development Project',
        category: 'Technology',
        description: 'Standard template for software development projects with agile methodology',
        estimatedDuration: 12, // weeks
        tasks: [],
        milestones: [],
        requiredRoles: ['Project Manager', 'Developers', 'QA Engineers', 'UX Designer'],
        complexity: 'medium'
      },
      {
        id: '2',
        name: 'Process Improvement Project',
        category: 'Operations',
        description: 'Template for process analysis and improvement initiatives',
        estimatedDuration: 16,
        tasks: [],
        milestones: [],
        requiredRoles: ['Process Analyst', 'Operations Manager', 'Subject Matter Experts'],
        complexity: 'complex'
      },
      {
        id: '3',
        name: 'Marketing Campaign',
        category: 'Marketing',
        description: 'Template for marketing campaign planning and execution',
        estimatedDuration: 8,
        tasks: [],
        milestones: [],
        requiredRoles: ['Marketing Manager', 'Content Creator', 'Designer', 'Analyst'],
        complexity: 'simple'
      }
    ];

    setTeamMembers(sampleTeam);
    setProjects(sampleProjects);
    setTemplates(sampleTemplates);
  }, []);

  const calculateProjectHealth = useCallback((project: Project) => {
    let score = 100;
    
    // Schedule performance
    const today = new Date();
    const endDate = new Date(project.endDate);
    const daysBehind = Math.max(0, (today.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
    score -= daysBehind * 2;
    
    // Budget performance
    const budgetOverrun = Math.max(0, (project.actualCost - project.budget) / project.budget * 100);
    score -= budgetOverrun;
    
    // Progress vs timeline
    const totalDays = (endDate.getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24);
    const daysPassed = (today.getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24);
    const expectedProgress = Math.min(100, (daysPassed / totalDays) * 100);
    const progressGap = Math.max(0, expectedProgress - project.progress);
    score -= progressGap * 0.5;
    
    return Math.max(0, Math.min(100, score));
  }, []);

  const ProjectDashboard = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="xl" fontWeight="bold">📊 Project Management Dashboard</Text>
          {standaloneMode && (
            <Badge colorScheme="purple" variant="solid">Standalone Mode</Badge>
          )}
        </VStack>
        <HStack>
          <Switch
            isChecked={standaloneMode}
            onChange={(e) => setStandaloneMode(e.target.checked)}
            size="sm"
          />
          <Text fontSize="sm">Standalone Mode</Text>
          <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProjectOpen}>
            New Project
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Active Projects</StatLabel>
          <StatNumber>{projects.filter(p => p.status === 'active').length}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            2 started this month
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Total Budget</StatLabel>
          <StatNumber>${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            15% increase from last quarter
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Avg Health Score</StatLabel>
          <StatNumber>{Math.round(projects.reduce((sum, p) => sum + calculateProjectHealth(p), 0) / projects.length)}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            8% improvement
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>On-Time Delivery</StatLabel>
          <StatNumber>87%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            Target: 85%
          </StatHelpText>
        </Stat>
      </Grid>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Integrated Project & Process Management</Text>
          <Text fontSize="sm">
            Full integration with Process Management for end-to-end workflow optimization and resource sharing
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="2fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontWeight="bold">Project Portfolio</Text>
              <HStack>
                <Button size="sm" leftIcon={<ViewIcon />} onClick={() => setGanttView(!ganttView)}>
                  {ganttView ? 'List View' : 'Gantt View'}
                </Button>
                <Button size="sm" leftIcon={<DownloadIcon />} variant="outline">
                  Export
                </Button>
              </HStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Project</Th>
                  <Th>Manager</Th>
                  <Th>Status</Th>
                  <Th>Progress</Th>
                  <Th>Budget</Th>
                  <Th>Health</Th>
                  <Th>Due Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {projects.map((project) => {
                  const health = calculateProjectHealth(project);
                  return (
                    <Tr key={project.id}>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold" fontSize="sm">{project.name}</Text>
                          <HStack>
                            <Badge size="sm" colorScheme={
                              project.priority === 'critical' ? 'red' :
                              project.priority === 'high' ? 'orange' :
                              project.priority === 'medium' ? 'yellow' : 'green'
                            }>
                              {project.priority}
                            </Badge>
                            {project.processIntegration && (
                              <Badge size="sm" colorScheme="purple" variant="outline">
                                Process Link
                              </Badge>
                            )}
                          </HStack>
                        </VStack>
                      </Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="sm">{project.manager}</Text>
                          <Text fontSize="xs" color="gray.600">
                            Team: {project.team.length}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Badge colorScheme={
                          project.status === 'active' ? 'green' :
                          project.status === 'planning' ? 'blue' :
                          project.status === 'on_hold' ? 'yellow' :
                          project.status === 'completed' ? 'purple' : 'gray'
                        }>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Progress value={project.progress} colorScheme="blue" size="sm" w="80px" />
                          <Text fontSize="xs">{project.progress}%</Text>
                        </VStack>
                      </Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="sm" fontWeight="semibold">
                            ${project.budget.toLocaleString()}
                          </Text>
                          <Text fontSize="xs" color={project.actualCost > project.budget ? "red.500" : "gray.600"}>
                            Spent: ${project.actualCost.toLocaleString()}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>
                        <CircularProgress 
                          value={health} 
                          size="40px" 
                          color={
                            health >= 80 ? 'green.400' :
                            health >= 60 ? 'yellow.400' : 'red.400'
                          }
                        >
                          <CircularProgressLabel fontSize="xs">
                            {Math.round(health)}
                          </CircularProgressLabel>
                        </CircularProgress>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{project.endDate}</Text>
                      </Td>
                      <Td>
                        <HStack>
                          <IconButton
                            aria-label="View project"
                            icon={<ViewIcon />}
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedProject(project);
                              onGanttOpen();
                            }}
                          />
                          <IconButton
                            aria-label="Edit project"
                            icon={<EditIcon />}
                            size="sm"
                            variant="ghost"
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <VStack spacing={4}>
          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Resource Utilization</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3}>
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">Development Team</Text>
                    <Text fontSize="sm" fontWeight="bold">85%</Text>
                  </HStack>
                  <Progress value={85} colorScheme="blue" size="sm" />
                </Box>
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">Design Team</Text>
                    <Text fontSize="sm" fontWeight="bold">65%</Text>
                  </HStack>
                  <Progress value={65} colorScheme="green" size="sm" />
                </Box>
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">QA Team</Text>
                    <Text fontSize="sm" fontWeight="bold">92%</Text>
                  </HStack>
                  <Progress value={92} colorScheme="orange" size="sm" />
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Upcoming Milestones</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                {projects.flatMap(p => p.milestones)
                  .filter(m => m.status === 'pending')
                  .slice(0, 3)
                  .map(milestone => (
                    <HStack key={milestone.id} justify="space-between" p={2} bg="gray.50" borderRadius="md">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">{milestone.name}</Text>
                        <Text fontSize="xs" color="gray.600">{milestone.dueDate}</Text>
                      </VStack>
                      <Badge colorScheme="yellow" size="sm">
                        Pending
                      </Badge>
                    </HStack>
                  ))}
              </VStack>
            </CardBody>
          </Card>

          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Risk Alerts</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={2} align="stretch">
                <Alert status="warning" size="sm">
                  <AlertIcon boxSize={3} />
                  <Text fontSize="xs">Budget overrun risk: Portal Redesign</Text>
                </Alert>
                <Alert status="error" size="sm">
                  <AlertIcon boxSize={3} />
                  <Text fontSize="xs">Resource conflict: Dev team overallocated</Text>
                </Alert>
                <Alert status="info" size="sm">
                  <AlertIcon boxSize={3} />
                  <Text fontSize="xs">Milestone approaching: Design approval</Text>
                </Alert>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Grid>
    </VStack>
  );

  const TaskManagement = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">✅ Task Management</Text>
        <HStack>
          <Select size="sm" w="200px" placeholder="Filter by project">
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </Select>
          <Button colorScheme="green" leftIcon={<AddIcon />} onClick={onTaskOpen}>
            New Task
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        <Card>
          <CardHeader bg="gray.100">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="sm">Not Started</Text>
              <Badge colorScheme="gray">
                {projects.flatMap(p => p.tasks).filter(t => t.status === 'not_started').length}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <VStack spacing={3}>
              {projects.flatMap(p => p.tasks)
                .filter(task => task.status === 'not_started')
                .map(task => (
                  <Card key={task.id} size="sm" w="full" cursor="pointer" _hover={{ shadow: "md" }}>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>
                          {task.name}
                        </Text>
                        <HStack wrap="wrap">
                          <Badge size="xs" colorScheme={
                            task.priority === 'critical' ? 'red' :
                            task.priority === 'high' ? 'orange' :
                            task.priority === 'medium' ? 'yellow' : 'green'
                          }>
                            {task.priority}
                          </Badge>
                          {task.tags.slice(0, 2).map(tag => (
                            <Tag key={tag} size="sm" variant="subtle">
                              <TagLabel>{tag}</TagLabel>
                            </Tag>
                          ))}
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.600">
                            {task.assignee}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {task.estimatedHours}h
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader bg="blue.100">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="sm">In Progress</Text>
              <Badge colorScheme="blue">
                {projects.flatMap(p => p.tasks).filter(t => t.status === 'in_progress').length}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <VStack spacing={3}>
              {projects.flatMap(p => p.tasks)
                .filter(task => task.status === 'in_progress')
                .map(task => (
                  <Card key={task.id} size="sm" w="full" cursor="pointer" _hover={{ shadow: "md" }}>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>
                          {task.name}
                        </Text>
                        <Progress value={task.progress} colorScheme="blue" size="sm" w="full" />
                        <HStack wrap="wrap">
                          <Badge size="xs" colorScheme={
                            task.priority === 'critical' ? 'red' :
                            task.priority === 'high' ? 'orange' :
                            task.priority === 'medium' ? 'yellow' : 'green'
                          }>
                            {task.priority}
                          </Badge>
                          {task.tags.slice(0, 2).map(tag => (
                            <Tag key={tag} size="sm" variant="subtle">
                              <TagLabel>{tag}</TagLabel>
                            </Tag>
                          ))}
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.600">
                            {task.assignee}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {task.actualHours}/{task.estimatedHours}h
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader bg="red.100">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="sm">Blocked</Text>
              <Badge colorScheme="red">
                {projects.flatMap(p => p.tasks).filter(t => t.status === 'blocked').length}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <VStack spacing={3}>
              <Alert status="warning" size="sm">
                <AlertIcon boxSize={3} />
                <Text fontSize="xs">No blocked tasks - Great job!</Text>
              </Alert>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader bg="green.100">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="sm">Completed</Text>
              <Badge colorScheme="green">
                {projects.flatMap(p => p.tasks).filter(t => t.status === 'completed').length}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <VStack spacing={3}>
              {projects.flatMap(p => p.tasks)
                .filter(task => task.status === 'completed')
                .map(task => (
                  <Card key={task.id} size="sm" w="full" cursor="pointer" _hover={{ shadow: "md" }}>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold" noOfLines={2} textDecoration="line-through" color="gray.500">
                          {task.name}
                        </Text>
                        <HStack wrap="wrap">
                          <Badge size="xs" colorScheme="green">
                            ✓ Done
                          </Badge>
                          {task.tags.slice(0, 2).map(tag => (
                            <Tag key={tag} size="sm" variant="subtle">
                              <TagLabel>{tag}</TagLabel>
                            </Tag>
                          ))}
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.600">
                            {task.assignee}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {task.actualHours}h
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );

  const ResourcePlanning = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">👥 Resource Planning & Allocation</Text>
        <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={onResourceOpen}>
          Add Resource
        </Button>
      </HStack>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Integrated Resource Management</Text>
          <Text fontSize="sm">
            Resources are shared between projects and processes for optimized allocation and cost management
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="1fr 1fr" gap={6}>
        <VStack spacing={4}>
          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Resource Allocation Matrix</Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Resource</Th>
                    <Th>Type</Th>
                    <Th>Allocation</Th>
                    <Th>Cost/Hour</Th>
                    <Th>Utilization</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projects.flatMap(p => p.resources)
                    .filter((resource, index, self) => 
                      index === self.findIndex(r => r.id === resource.id)
                    )
                    .map(resource => (
                      <Tr key={resource.id}>
                        <Td>
                          <Text fontSize="sm" fontWeight="semibold">{resource.name}</Text>
                        </Td>
                        <Td>
                          <Badge size="sm" colorScheme={
                            resource.type === 'human' ? 'blue' :
                            resource.type === 'equipment' ? 'green' :
                            resource.type === 'software' ? 'purple' : 'orange'
                          }>
                            {resource.type}
                          </Badge>
                        </Td>
                        <Td>{resource.allocation}%</Td>
                        <Td>${resource.cost}</Td>
                        <Td>
                          <Progress 
                            value={resource.allocation} 
                            colorScheme={
                              resource.allocation > 100 ? 'red' :
                              resource.allocation > 80 ? 'yellow' : 'green'
                            }
                            size="sm" 
                            w="60px"
                          />
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Team Workload</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3}>
                {teamMembers.slice(0, 6).map(member => {
                  const workload = Math.floor(Math.random() * 40) + 60; // 60-100%
                  return (
                    <HStack key={member} justify="space-between" w="full">
                      <HStack>
                        <Avatar size="sm" name={member} />
                        <Text fontSize="sm">{member}</Text>
                      </HStack>
                      <HStack>
                        <Progress 
                          value={workload} 
                          colorScheme={
                            workload > 90 ? 'red' :
                            workload > 80 ? 'yellow' : 'green'
                          }
                          size="sm" 
                          w="80px"
                        />
                        <Text fontSize="xs" w="30px">{workload}%</Text>
                      </HStack>
                    </HStack>
                  );
                })}
              </VStack>
            </CardBody>
          </Card>
        </VStack>

        <VStack spacing={4}>
          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Cost Analysis</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Stat>
                  <StatLabel>Total Resource Cost</StatLabel>
                  <StatNumber>
                    ${projects.reduce((sum, p) => 
                      sum + p.resources.reduce((rSum, r) => rSum + (r.cost * r.allocation / 100), 0), 0
                    ).toFixed(0)}/month
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12% from last month
                  </StatHelpText>
                </Stat>
                
                <Divider />
                
                <VStack align="start" spacing={2} w="full">
                  <Text fontSize="sm" fontWeight="semibold">Cost Breakdown</Text>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Human Resources</Text>
                    <Text fontSize="sm" fontWeight="bold">65%</Text>
                  </HStack>
                  <Progress value={65} colorScheme="blue" size="sm" w="full" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Software Licenses</Text>
                    <Text fontSize="sm" fontWeight="bold">25%</Text>
                  </HStack>
                  <Progress value={25} colorScheme="purple" size="sm" w="full" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Equipment</Text>
                    <Text fontSize="sm" fontWeight="bold">10%</Text>
                  </HStack>
                  <Progress value={10} colorScheme="green" size="sm" w="full" />
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Resource Conflicts</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                <Alert status="warning" size="sm">
                  <AlertIcon boxSize={3} />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" fontWeight="semibold">Overallocation Detected</Text>
                    <Text fontSize="xs">Senior Developer: 125% allocated</Text>
                  </VStack>
                </Alert>
                <Alert status="error" size="sm">
                  <AlertIcon boxSize={3} />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" fontWeight="semibold">Resource Conflict</Text>
                    <Text fontSize="xs">QA Engineer needed for overlapping tasks</Text>
                  </VStack>
                </Alert>
                <Alert status="info" size="sm">
                  <AlertIcon boxSize={3} />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" fontWeight="semibold">Optimization Opportunity</Text>
                    <Text fontSize="xs">Designer available 35% of time</Text>
                  </VStack>
                </Alert>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Grid>
    </VStack>
  );

  const ReportsAnalytics = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">📈 Reports & Analytics</Text>
        <HStack>
          <Select size="sm" w="150px" defaultValue="month">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </Select>
          <Button leftIcon={<DownloadIcon />} variant="outline">
            Export Report
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">Project Performance</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <Stat>
                <StatLabel>On-Time Delivery Rate</StatLabel>
                <StatNumber>87%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  5% improvement
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Budget Adherence</StatLabel>
                <StatNumber>92%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Within budget
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Quality Score</StatLabel>
                <StatNumber>94%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Customer satisfaction
                </StatHelpText>
              </Stat>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Resource Efficiency</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <Box w="full" h="200px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                <Text color="gray.500">Resource Utilization Chart</Text>
              </Box>
              <HStack justify="space-between" w="full">
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" color="blue.500">82%</Text>
                  <Text fontSize="xs">Avg Utilization</Text>
                </VStack>
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" color="green.500">95%</Text>
                  <Text fontSize="xs">Efficiency</Text>
                </VStack>
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" color="orange.500">$125K</Text>
                  <Text fontSize="xs">Cost Saved</Text>
                </VStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Risk Assessment</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Low Risk Projects</Text>
                <Badge colorScheme="green">
                  {projects.filter(p => p.riskLevel === 'low').length}
                </Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Medium Risk Projects</Text>
                <Badge colorScheme="yellow">
                  {projects.filter(p => p.riskLevel === 'medium').length}
                </Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">High Risk Projects</Text>
                <Badge colorScheme="red">
                  {projects.filter(p => p.riskLevel === 'high').length}
                </Badge>
              </HStack>
              
              <Divider />
              
              <VStack align="start" spacing={2} w="full">
                <Text fontSize="sm" fontWeight="semibold">Top Risk Factors</Text>
                <Text fontSize="xs">• Resource conflicts (3 projects)</Text>
                <Text fontSize="xs">• Budget overrun risk (2 projects)</Text>
                <Text fontSize="xs">• Timeline pressure (4 projects)</Text>
                <Text fontSize="xs">• Scope creep (1 project)</Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Process Integration Analysis</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Integrated Projects</Text>
                <Text fontSize="sm">
                  {projects.filter(p => p.processIntegration).length} projects are integrated with process management for enhanced workflow optimization
                </Text>
              </VStack>
            </Alert>
            
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Project</Th>
                  <Th>Linked Processes</Th>
                  <Th>Shared Resources</Th>
                  <Th>Dependencies</Th>
                  <Th>Integration Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                {projects.filter(p => p.processIntegration).map(project => (
                  <Tr key={project.id}>
                    <Td>
                      <Text fontSize="sm" fontWeight="semibold">{project.name}</Text>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={1}>
                        {project.processIntegration?.linkedProcesses.map(process => (
                          <Badge key={process} size="sm" colorScheme="blue" variant="subtle">
                            {process}
                          </Badge>
                        ))}
                      </VStack>
                    </Td>
                    <Td>
                      <Text fontSize="sm">
                        {project.processIntegration?.sharedResources.length} resources
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm">
                        {project.processIntegration?.dependencies.length} dependencies
                      </Text>
                    </Td>
                    <Td>
                      <CircularProgress value={85} size="30px" color="green.400">
                        <CircularProgressLabel fontSize="xs">85</CircularProgressLabel>
                      </CircularProgress>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box>
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>📊 Dashboard</Tab>
          <Tab>✅ Tasks</Tab>
          <Tab>👥 Resources</Tab>
          <Tab>📈 Analytics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProjectDashboard />
          </TabPanel>
          <TabPanel>
            <TaskManagement />
          </TabPanel>
          <TabPanel>
            <ResourcePlanning />
          </TabPanel>
          <TabPanel>
            <ReportsAnalytics />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modals would go here - keeping consistent with the pattern */}
      <Modal isOpen={isNewProjectOpen} onClose={onNewProjectClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  Projects can be integrated with process management for seamless workflow optimization
                </Text>
              </Alert>
              <FormControl>
                <FormLabel>Project Name</FormLabel>
                <Input placeholder="Enter project name" />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Project description and objectives" rows={3} />
              </FormControl>
              <Grid templateColumns="1fr 1fr" gap={4} w="full">
                <FormControl>
                  <FormLabel>Project Manager</FormLabel>
                  <Select placeholder="Select manager">
                    {teamMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <Select placeholder="Select priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </Select>
                </FormControl>
              </Grid>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNewProjectClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Create Project</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProjectManagement;