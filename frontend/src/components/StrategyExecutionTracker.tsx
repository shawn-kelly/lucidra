import React, { useState, useEffect } from 'react';
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
  Badge,
  Progress,
  useColorModeValue,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Tooltip,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  NumberInput,
  NumberInputField,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagCloseButton,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'financial' | 'operational' | 'strategic' | 'marketing' | 'product';
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'delayed';
  dueDate: string;
  assignee: string;
  progress: number; // 0-100
  dependencies: string[];
  kpis: KPI[];
  tasks: Task[];
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

interface KPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  assignee: string;
  dueDate: string;
}

interface StrategyGoal {
  id: string;
  title: string;
  description: string;
  timeframe: '1_month' | '3_months' | '6_months' | '1_year' | '2_years';
  milestones: string[]; // milestone IDs
  totalProgress: number;
  status: 'planning' | 'active' | 'completed' | 'paused';
}

const StrategyExecutionTracker: React.FC = () => {
  const [goals, setGoals] = useState<StrategyGoal[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<StrategyGoal | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [currentView, setCurrentView] = useState<'overview' | 'goals' | 'milestones' | 'analytics'>('overview');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const { isOpen: isGoalModalOpen, onOpen: onGoalModalOpen, onClose: onGoalModalClose } = useDisclosure();
  const { isOpen: isMilestoneModalOpen, onOpen: onMilestoneModalOpen, onClose: onMilestoneModalClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Sample data initialization
  useEffect(() => {
    const sampleGoals: StrategyGoal[] = [
      {
        id: '1',
        title: 'Market Expansion',
        description: 'Expand into 3 new geographic markets within the next year',
        timeframe: '1_year',
        milestones: ['1', '2', '3'],
        totalProgress: 45,
        status: 'active'
      },
      {
        id: '2',
        title: 'Digital Transformation',
        description: 'Modernize core business processes and customer touchpoints',
        timeframe: '6_months',
        milestones: ['4', '5'],
        totalProgress: 72,
        status: 'active'
      },
      {
        id: '3',
        title: 'Product Innovation',
        description: 'Launch 2 new product lines targeting emerging customer segments',
        timeframe: '1_year',
        milestones: ['6', '7', '8'],
        totalProgress: 23,
        status: 'planning'
      }
    ];

    const sampleMilestones: Milestone[] = [
      {
        id: '1',
        title: 'Market Research & Analysis',
        description: 'Complete comprehensive market research for target regions',
        category: 'strategic',
        priority: 'high',
        status: 'completed',
        dueDate: '2024-02-15',
        assignee: 'Strategy Team',
        progress: 100,
        dependencies: [],
        kpis: [
          { id: '1', name: 'Markets Analyzed', target: 5, current: 5, unit: 'markets', trend: 'up', lastUpdated: '2024-02-10' }
        ],
        tasks: [
          { id: '1', title: 'Industry analysis report', completed: true, assignee: 'John Doe', dueDate: '2024-02-10' },
          { id: '2', title: 'Competitive landscape mapping', completed: true, assignee: 'Jane Smith', dueDate: '2024-02-12' }
        ],
        notes: ['Research completed successfully', 'Identified 3 priority markets'],
        createdAt: '2024-01-15',
        updatedAt: '2024-02-15'
      },
      {
        id: '2',
        title: 'Legal & Regulatory Setup',
        description: 'Establish legal entities and regulatory compliance in target markets',
        category: 'operational',
        priority: 'high',
        status: 'in_progress',
        dueDate: '2024-03-30',
        assignee: 'Legal Team',
        progress: 60,
        dependencies: ['1'],
        kpis: [
          { id: '2', name: 'Legal Entities Established', target: 3, current: 2, unit: 'entities', trend: 'up', lastUpdated: '2024-03-01' },
          { id: '3', name: 'Compliance Rate', target: 100, current: 85, unit: '%', trend: 'up', lastUpdated: '2024-03-01' }
        ],
        tasks: [
          { id: '3', title: 'Register entity in Market A', completed: true, assignee: 'Legal Counsel', dueDate: '2024-02-28' },
          { id: '4', title: 'Register entity in Market B', completed: true, assignee: 'Legal Counsel', dueDate: '2024-03-15' },
          { id: '5', title: 'Register entity in Market C', completed: false, assignee: 'Legal Counsel', dueDate: '2024-03-30' }
        ],
        notes: ['Market A and B registrations complete', 'Market C pending final documentation'],
        createdAt: '2024-02-01',
        updatedAt: '2024-03-01'
      },
      {
        id: '4',
        title: 'Customer Experience Platform',
        description: 'Implement new CRM and customer portal system',
        category: 'operational',
        priority: 'medium',
        status: 'in_progress',
        dueDate: '2024-04-15',
        assignee: 'IT Team',
        progress: 75,
        dependencies: [],
        kpis: [
          { id: '4', name: 'System Uptime', target: 99.9, current: 99.7, unit: '%', trend: 'stable', lastUpdated: '2024-03-05' },
          { id: '5', name: 'User Adoption', target: 90, current: 68, unit: '%', trend: 'up', lastUpdated: '2024-03-05' }
        ],
        tasks: [
          { id: '6', title: 'CRM system configuration', completed: true, assignee: 'Tech Lead', dueDate: '2024-03-01' },
          { id: '7', title: 'Customer portal development', completed: false, assignee: 'Dev Team', dueDate: '2024-04-01' },
          { id: '8', title: 'User training program', completed: false, assignee: 'Training Team', dueDate: '2024-04-10' }
        ],
        notes: ['CRM configuration successful', 'Portal development ahead of schedule'],
        createdAt: '2024-01-20',
        updatedAt: '2024-03-05'
      }
    ];

    setGoals(sampleGoals);
    setMilestones(sampleMilestones);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'blocked': return 'red';
      case 'delayed': return 'orange';
      case 'not_started': return 'gray';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial': return '💰';
      case 'operational': return '⚙️';
      case 'strategic': return '🎯';
      case 'marketing': return '📈';
      case 'product': return '🛠️';
      default: return '📊';
    }
  };

  const calculateOverallProgress = () => {
    if (milestones.length === 0) return 0;
    const totalProgress = milestones.reduce((sum, milestone) => sum + milestone.progress, 0);
    return Math.round(totalProgress / milestones.length);
  };

  const getFilteredMilestones = () => {
    return milestones.filter(milestone => {
      const statusMatch = filterStatus === 'all' || milestone.status === filterStatus;
      const categoryMatch = filterCategory === 'all' || milestone.category === filterCategory;
      return statusMatch && categoryMatch;
    });
  };

  const renderOverview = () => {
    const overallProgress = calculateOverallProgress();
    const completedMilestones = milestones.filter(m => m.status === 'completed').length;
    const inProgressMilestones = milestones.filter(m => m.status === 'in_progress').length;
    const blockedMilestones = milestones.filter(m => m.status === 'blocked').length;

    return (
      <VStack spacing={6} align="stretch">
        {/* Key Metrics */}
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <Card bg="blue.50" border="1px" borderColor="blue.200">
            <CardBody textAlign="center">
              <CircularProgress value={overallProgress} color="blue.400" size="80px">
                <CircularProgressLabel fontWeight="bold">{overallProgress}%</CircularProgressLabel>
              </CircularProgress>
              <Text mt={2} fontWeight="semibold" color="blue.700">Overall Progress</Text>
            </CardBody>
          </Card>

          <Stat>
            <StatLabel>Completed Milestones</StatLabel>
            <StatNumber color="green.500">{completedMilestones}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {Math.round((completedMilestones / milestones.length) * 100)}% of total
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>In Progress</StatLabel>
            <StatNumber color="blue.500">{inProgressMilestones}</StatNumber>
            <StatHelpText>Active milestones</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Blocked/Delayed</StatLabel>
            <StatNumber color="red.500">{blockedMilestones}</StatNumber>
            <StatHelpText>Need attention</StatHelpText>
          </Stat>
        </Grid>

        {/* Active Goals */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Active Strategic Goals</Text>
          <Grid templateColumns="repeat(1, 1fr)" gap={4}>
            {goals.filter(g => g.status === 'active').map(goal => (
              <Card key={goal.id} bg={cardBg} border="1px" borderColor={borderColor} cursor="pointer"
                    onClick={() => setSelectedGoal(goal)}>
                <CardBody>
                  <HStack justify="space-between" mb={3}>
                    <Text fontWeight="semibold">{goal.title}</Text>
                    <Badge colorScheme="blue">{goal.timeframe.replace('_', ' ')}</Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600" mb={3}>{goal.description}</Text>
                  <Progress value={goal.totalProgress} colorScheme="blue" size="sm" borderRadius="md" />
                  <Text fontSize="xs" color="gray.500" mt={1}>{goal.totalProgress}% complete</Text>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Box>

        {/* Recent Activity */}
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>Recent Activity</Text>
          <VStack align="stretch" spacing={3}>
            {milestones
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .slice(0, 5)
              .map(milestone => (
                <Card key={milestone.id} bg={cardBg} border="1px" borderColor={borderColor} size="sm">
                  <CardBody py={3}>
                    <HStack justify="space-between">
                      <HStack>
                        <Text fontSize="lg">{getCategoryIcon(milestone.category)}</Text>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium" fontSize="sm">{milestone.title}</Text>
                          <Text fontSize="xs" color="gray.500">
                            Updated {new Date(milestone.updatedAt).toLocaleDateString()}
                          </Text>
                        </VStack>
                      </HStack>
                      <Badge colorScheme={getStatusColor(milestone.status)}>
                        {milestone.status.replace('_', ' ')}
                      </Badge>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
          </VStack>
        </Box>
      </VStack>
    );
  };

  const renderMilestones = () => {
    const filteredMilestones = getFilteredMilestones();

    return (
      <VStack spacing={6} align="stretch">
        {/* Filters and Actions */}
        <HStack justify="space-between">
          <HStack spacing={4}>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} size="sm" w="150px">
              <option value="all">All Status</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
              <option value="delayed">Delayed</option>
            </Select>
            <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} size="sm" w="150px">
              <option value="all">All Categories</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="strategic">Strategic</option>
              <option value="marketing">Marketing</option>
              <option value="product">Product</option>
            </Select>
          </HStack>
          <Button colorScheme="blue" onClick={onMilestoneModalOpen}>
            + New Milestone
          </Button>
        </HStack>

        {/* Milestones List */}
        <Grid templateColumns="repeat(1, 1fr)" gap={4}>
          {filteredMilestones.map(milestone => (
            <Card key={milestone.id} bg={cardBg} border="1px" borderColor={borderColor}
                  cursor="pointer" onClick={() => setSelectedMilestone(milestone)}>
              <CardBody>
                <HStack justify="space-between" mb={3}>
                  <HStack>
                    <Text fontSize="lg">{getCategoryIcon(milestone.category)}</Text>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="semibold">{milestone.title}</Text>
                      <Text fontSize="sm" color="gray.600">{milestone.assignee}</Text>
                    </VStack>
                  </HStack>
                  <VStack align="end" spacing={1}>
                    <Badge colorScheme={getStatusColor(milestone.status)}>
                      {milestone.status.replace('_', ' ')}
                    </Badge>
                    <Badge colorScheme={getPriorityColor(milestone.priority)} variant="outline">
                      {milestone.priority}
                    </Badge>
                  </VStack>
                </HStack>

                <Text fontSize="sm" color="gray.600" mb={3}>{milestone.description}</Text>

                <Progress value={milestone.progress} colorScheme={getStatusColor(milestone.status)} 
                         size="sm" borderRadius="md" mb={2} />
                
                <HStack justify="space-between" fontSize="xs" color="gray.500">
                  <Text>{milestone.progress}% complete</Text>
                  <Text>Due: {new Date(milestone.dueDate).toLocaleDateString()}</Text>
                </HStack>

                {milestone.kpis.length > 0 && (
                  <HStack mt={3} spacing={4}>
                    {milestone.kpis.slice(0, 2).map(kpi => (
                      <Box key={kpi.id}>
                        <Text fontSize="xs" color="gray.500">{kpi.name}</Text>
                        <Text fontSize="sm" fontWeight="semibold">
                          {kpi.current}/{kpi.target} {kpi.unit}
                        </Text>
                      </Box>
                    ))}
                  </HStack>
                )}
              </CardBody>
            </Card>
          ))}
        </Grid>
      </VStack>
    );
  };

  const renderAnalytics = () => {
    const categoryProgress = ['financial', 'operational', 'strategic', 'marketing', 'product'].map(category => {
      const categoryMilestones = milestones.filter(m => m.category === category);
      const avgProgress = categoryMilestones.length > 0 ? 
        categoryMilestones.reduce((sum, m) => sum + m.progress, 0) / categoryMilestones.length : 0;
      return { category, progress: Math.round(avgProgress), count: categoryMilestones.length };
    });

    return (
      <VStack spacing={6} align="stretch">
        <Text fontSize="lg" fontWeight="semibold">Strategy Analytics</Text>

        {/* Progress by Category */}
        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardHeader>
            <Text fontWeight="semibold">Progress by Category</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {categoryProgress.map(({ category, progress, count }) => (
                <Box key={category} w="100%">
                  <HStack justify="space-between" mb={2}>
                    <HStack>
                      <Text fontSize="sm">{getCategoryIcon(category)} {category}</Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="semibold">{progress}%</Text>
                  </HStack>
                  <Progress value={progress} colorScheme="blue" size="sm" borderRadius="md" />
                  <Text fontSize="xs" color="gray.500" mt={1}>{count} milestones</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Timeline View */}
        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardHeader>
            <Text fontWeight="semibold">Upcoming Milestones</Text>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={3}>
              {milestones
                .filter(m => m.status !== 'completed')
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .slice(0, 8)
                .map(milestone => {
                  const dueDate = new Date(milestone.dueDate);
                  const today = new Date();
                  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <HStack key={milestone.id} justify="space-between" p={3} 
                            bg={daysUntilDue < 7 ? 'red.50' : 'gray.50'} borderRadius="md">
                      <HStack>
                        <Text>{getCategoryIcon(milestone.category)}</Text>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium" fontSize="sm">{milestone.title}</Text>
                          <Text fontSize="xs" color="gray.600">{milestone.assignee}</Text>
                        </VStack>
                      </HStack>
                      <VStack align="end" spacing={0}>
                        <Text fontSize="sm" fontWeight="semibold" 
                              color={daysUntilDue < 7 ? 'red.600' : 'gray.600'}>
                          {daysUntilDue < 0 ? 'Overdue' : 
                           daysUntilDue === 0 ? 'Due Today' :
                           `${daysUntilDue} days`}
                        </Text>
                        <Progress value={milestone.progress} size="sm" w="60px" 
                                colorScheme={daysUntilDue < 7 ? 'red' : 'blue'} />
                      </VStack>
                    </HStack>
                  );
                })}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" color="blue.500" mb={2}>
            🎯 Strategy Execution Tracker
          </Text>
          <Text fontSize="lg" color="gray.600">
            Track, measure, and execute your strategic initiatives with precision
          </Text>
        </Box>

        {/* Navigation Tabs */}
        <Tabs value={currentView} onChange={(index) => {
          const views = ['overview', 'goals', 'milestones', 'analytics'];
          setCurrentView(views[index] as any);
        }}>
          <TabList>
            <Tab>📊 Overview</Tab>
            <Tab>🎯 Goals</Tab>
            <Tab>🏁 Milestones</Tab>
            <Tab>📈 Analytics</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderOverview()}
            </TabPanel>
            <TabPanel px={0}>
              <Text>Goals view coming soon...</Text>
            </TabPanel>
            <TabPanel px={0}>
              {renderMilestones()}
            </TabPanel>
            <TabPanel px={0}>
              {renderAnalytics()}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Milestone Detail Modal */}
      <Modal isOpen={!!selectedMilestone} onClose={() => setSelectedMilestone(null)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedMilestone && (
              <HStack>
                <Text>{getCategoryIcon(selectedMilestone.category)}</Text>
                <Text>{selectedMilestone.title}</Text>
              </HStack>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedMilestone && (
              <VStack spacing={4} align="stretch">
                <Progress value={selectedMilestone.progress} colorScheme={getStatusColor(selectedMilestone.status)} 
                         size="lg" borderRadius="md" />
                
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedMilestone.status)}>
                      {selectedMilestone.status.replace('_', ' ')}
                    </Badge>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600">Due Date</Text>
                    <Text fontSize="sm">{new Date(selectedMilestone.dueDate).toLocaleDateString()}</Text>
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>Description</Text>
                  <Text fontSize="sm">{selectedMilestone.description}</Text>
                </Box>

                {selectedMilestone.kpis.length > 0 && (
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>Key Performance Indicators</Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      {selectedMilestone.kpis.map(kpi => (
                        <Box key={kpi.id} p={3} bg="gray.50" borderRadius="md">
                          <Text fontSize="sm" fontWeight="semibold">{kpi.name}</Text>
                          <Text fontSize="lg" fontWeight="bold">{kpi.current}/{kpi.target} {kpi.unit}</Text>
                          <Progress value={(kpi.current / kpi.target) * 100} size="sm" colorScheme="blue" />
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                )}

                {selectedMilestone.tasks.length > 0 && (
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>Tasks</Text>
                    <VStack align="stretch" spacing={2}>
                      {selectedMilestone.tasks.map(task => (
                        <HStack key={task.id} justify="space-between" p={2} bg="gray.50" borderRadius="md">
                          <HStack>
                            <Checkbox isChecked={task.completed} />
                            <Text fontSize="sm" textDecoration={task.completed ? 'line-through' : 'none'}>
                              {task.title}
                            </Text>
                          </HStack>
                          <Text fontSize="xs" color="gray.500">{task.assignee}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StrategyExecutionTracker;