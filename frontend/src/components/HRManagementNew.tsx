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
} from '@chakra-ui/react';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  performance: number;
  engagement: number;
  skillGaps: string[];
  careerPath: string;
  salary: number;
  hireDate: string;
}

interface Team {
  id: string;
  name: string;
  manager: string;
  members: number;
  avgPerformance: number;
  projects: number;
  budget: number;
  strategicAlignment: number;
}

interface HRMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

const HRManagementNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const sampleEmployees: Employee[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        role: 'Senior Product Manager',
        department: 'Product',
        performance: 92,
        engagement: 88,
        skillGaps: ['Data Analysis', 'AI/ML Basics'],
        careerPath: 'Director of Product',
        salary: 125000,
        hireDate: '2022-03-15'
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        role: 'Full Stack Developer',
        department: 'Engineering',
        performance: 87,
        engagement: 91,
        skillGaps: ['DevOps', 'System Architecture'],
        careerPath: 'Senior Engineering Manager',
        salary: 115000,
        hireDate: '2021-08-22'
      },
      {
        id: '3',
        name: 'Elena Rodriguez',
        role: 'Marketing Manager',
        department: 'Marketing',
        performance: 89,
        engagement: 85,
        skillGaps: ['Digital Analytics', 'Growth Marketing'],
        careerPath: 'VP of Marketing',
        salary: 95000,
        hireDate: '2023-01-10'
      },
      {
        id: '4',
        name: 'David Kim',
        role: 'UX Designer',
        department: 'Design',
        performance: 94,
        engagement: 93,
        skillGaps: ['Prototyping Tools', 'Research Methods'],
        careerPath: 'Design Director',
        salary: 105000,
        hireDate: '2022-11-05'
      }
    ];

    const sampleTeams: Team[] = [
      {
        id: '1',
        name: 'Product Innovation Team',
        manager: 'Sarah Chen',
        members: 8,
        avgPerformance: 90,
        projects: 5,
        budget: 850000,
        strategicAlignment: 95
      },
      {
        id: '2',
        name: 'Engineering Platform Team',
        manager: 'Marcus Johnson',
        members: 12,
        avgPerformance: 88,
        projects: 8,
        budget: 1200000,
        strategicAlignment: 87
      },
      {
        id: '3',
        name: 'Growth Marketing Team',
        manager: 'Elena Rodriguez',
        members: 6,
        avgPerformance: 85,
        projects: 12,
        budget: 450000,
        strategicAlignment: 92
      }
    ];

    setEmployees(sampleEmployees);
    setTeams(sampleTeams);
  }, []);

  const hrMetrics: HRMetric[] = [
    { label: 'Employee Satisfaction', value: '88%', change: '+5.2%', trend: 'up', color: 'green' },
    { label: 'Retention Rate', value: '94%', change: '+2.1%', trend: 'up', color: 'blue' },
    { label: 'Time to Hire', value: '18 days', change: '-4 days', trend: 'up', color: 'purple' },
    { label: 'Training ROI', value: '312%', change: '+23%', trend: 'up', color: 'orange' }
  ];

  const TalentDashboard = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">👥 Strategic Talent Dashboard</Text>
        <Button colorScheme="blue">+ Add New Employee</Button>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        {hrMetrics.map((metric, idx) => (
          <Stat key={idx} bg="white" p={4} borderRadius="md" shadow="sm">
            <StatLabel>{metric.label}</StatLabel>
            <StatNumber>{metric.value}</StatNumber>
            <StatHelpText>
              <StatArrow type={metric.trend === 'up' ? 'increase' : 'decrease'} />
              {metric.change}
            </StatHelpText>
          </Stat>
        ))}
      </Grid>

      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontWeight="bold">Employee Overview</Text>
            <HStack>
              <Badge colorScheme="green">High Performers: {employees.filter(e => e.performance >= 90).length}</Badge>
              <Badge colorScheme="yellow">Development Needed: {employees.filter(e => e.performance < 85).length}</Badge>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Employee</Th>
                <Th>Role</Th>
                <Th>Department</Th>
                <Th>Performance</Th>
                <Th>Engagement</Th>
                <Th>Career Path</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((employee) => (
                <Tr key={employee.id}>
                  <Td>
                    <HStack>
                      <Avatar size="sm" name={employee.name} />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold" fontSize="sm">{employee.name}</Text>
                        <Text fontSize="xs" color="gray.600">
                          Hired: {new Date(employee.hireDate).toLocaleDateString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{employee.role}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme="gray" variant="subtle">{employee.department}</Badge>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Progress value={employee.performance} colorScheme="green" size="sm" w="60px" />
                      <Text fontSize="xs">{employee.performance}%</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Progress value={employee.engagement} colorScheme="blue" size="sm" w="60px" />
                      <Text fontSize="xs">{employee.engagement}%</Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color="gray.600">{employee.careerPath}</Text>
                  </Td>
                  <Td>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        onOpen();
                      }}
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </VStack>
  );

  const TeamManagement = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">🏆 Strategic Team Management</Text>
      
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Blue Ocean Team Alignment</Text>
          <Text fontSize="sm">
            Teams organized around strategic initiatives and value innovation
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="1fr 1fr 1fr" gap={6}>
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold">{team.name}</Text>
                <HStack>
                  <Badge colorScheme="blue">{team.members} members</Badge>
                  <Badge colorScheme="green">{team.projects} projects</Badge>
                </HStack>
              </VStack>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={4}>
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm" fontWeight="semibold">Team Performance</Text>
                    <Text fontSize="sm">{team.avgPerformance}%</Text>
                  </HStack>
                  <Progress value={team.avgPerformance} colorScheme="green" size="sm" />
                </Box>

                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm" fontWeight="semibold">Strategic Alignment</Text>
                    <Text fontSize="sm">{team.strategicAlignment}%</Text>
                  </HStack>
                  <Progress value={team.strategicAlignment} colorScheme="purple" size="sm" />
                </Box>

                <Box w="full">
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>Manager</Text>
                  <HStack>
                    <Avatar size="xs" name={team.manager} />
                    <Text fontSize="sm">{team.manager}</Text>
                  </HStack>
                </Box>

                <Box w="full">
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>Budget</Text>
                  <Text fontSize="sm" color="gray.600">
                    ${team.budget.toLocaleString()}
                  </Text>
                </Box>

                <Button size="sm" variant="outline" w="full">
                  Manage Team
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );

  const SkillDevelopment = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">📚 Strategic Skill Development</Text>
      
      <Card>
        <CardHeader>
          <Text fontWeight="bold">Skill Gap Analysis & Development Programs</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="1fr 1fr" gap={6}>
            <VStack align="start" spacing={4}>
              <Text fontSize="md" fontWeight="semibold">🎯 Critical Skill Gaps</Text>
              <VStack align="start" spacing={3} w="full">
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">Data Analysis & AI/ML</Text>
                    <Badge colorScheme="red">High Priority</Badge>
                  </HStack>
                  <Progress value={75} colorScheme="red" size="sm" />
                  <Text fontSize="xs" color="gray.600" mt={1}>
                    12 employees need training
                  </Text>
                </Box>
                
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">System Architecture & DevOps</Text>
                    <Badge colorScheme="orange">Medium Priority</Badge>
                  </HStack>
                  <Progress value={60} colorScheme="orange" size="sm" />
                  <Text fontSize="xs" color="gray.600" mt={1}>
                    8 employees need training
                  </Text>
                </Box>

                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">Digital Marketing & Analytics</Text>
                    <Badge colorScheme="yellow">Low Priority</Badge>
                  </HStack>
                  <Progress value={40} colorScheme="yellow" size="sm" />
                  <Text fontSize="xs" color="gray.600" mt={1}>
                    5 employees need training
                  </Text>
                </Box>

                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">Leadership & Strategy</Text>
                    <Badge colorScheme="purple">Strategic</Badge>
                  </HStack>
                  <Progress value={85} colorScheme="purple" size="sm" />
                  <Text fontSize="xs" color="gray.600" mt={1}>
                    15 employees enrolled
                  </Text>
                </Box>
              </VStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontSize="md" fontWeight="semibold">🚀 Active Training Programs</Text>
              <VStack align="start" spacing={3} w="full">
                <Card variant="outline" w="full">
                  <CardBody p={3}>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="sm" fontWeight="semibold">Blue Ocean Strategy Mastery</Text>
                        <Badge colorScheme="blue">8 weeks</Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">
                        Strategic thinking and value innovation methodologies
                      </Text>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="xs">Progress: 67%</Text>
                        <Text fontSize="xs">12 participants</Text>
                      </HStack>
                      <Progress value={67} colorScheme="blue" size="sm" w="full" />
                    </VStack>
                  </CardBody>
                </Card>

                <Card variant="outline" w="full">
                  <CardBody p={3}>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="sm" fontWeight="semibold">Data Science Fundamentals</Text>
                        <Badge colorScheme="green">12 weeks</Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">
                        Python, SQL, machine learning basics
                      </Text>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="xs">Progress: 45%</Text>
                        <Text fontSize="xs">18 participants</Text>
                      </HStack>
                      <Progress value={45} colorScheme="green" size="sm" w="full" />
                    </VStack>
                  </CardBody>
                </Card>

                <Card variant="outline" w="full">
                  <CardBody p={3}>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="sm" fontWeight="semibold">Leadership Excellence</Text>
                        <Badge colorScheme="purple">6 weeks</Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">
                        Team management and strategic leadership
                      </Text>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="xs">Progress: 83%</Text>
                        <Text fontSize="xs">9 participants</Text>
                      </HStack>
                      <Progress value={83} colorScheme="purple" size="sm" w="full" />
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </VStack>
          </Grid>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Career Development Pathways</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="1fr 1fr 1fr" gap={4}>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">🎯</Text>
              <Text fontSize="sm" fontWeight="semibold">Technical Track</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Individual Contributor → Senior IC → Staff → Principal → Distinguished Engineer
              </Text>
              <Badge colorScheme="green">24 employees</Badge>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">👥</Text>
              <Text fontSize="sm" fontWeight="semibold">Management Track</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Team Lead → Manager → Senior Manager → Director → VP
              </Text>
              <Badge colorScheme="blue">18 employees</Badge>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">🌊</Text>
              <Text fontSize="sm" fontWeight="semibold">Strategy Track</Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Analyst → Senior Analyst → Strategy Manager → Strategy Director → Chief Strategy Officer
              </Text>
              <Badge colorScheme="purple">12 employees</Badge>
            </VStack>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  const PerformanceAnalytics = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">📈 Performance & Engagement Analytics</Text>
      
      <Grid templateColumns="1fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">Performance Distribution</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Exceptional (90%+)</Text>
                <CircularProgress value={75} color="green.400" size="60px">
                  <CircularProgressLabel fontSize="xs">
                    {employees.filter(e => e.performance >= 90).length}
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">High (80-89%)</Text>
                <CircularProgress value={60} color="blue.400" size="60px">
                  <CircularProgressLabel fontSize="xs">
                    {employees.filter(e => e.performance >= 80 && e.performance < 90).length}
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Needs Development (&lt;80%)</Text>
                <CircularProgress value={25} color="yellow.400" size="60px">
                  <CircularProgressLabel fontSize="xs">
                    {employees.filter(e => e.performance < 80).length}
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Engagement Insights</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Overall Engagement</Text>
                  <Text fontSize="sm" fontWeight="bold">89%</Text>
                </HStack>
                <Progress value={89} colorScheme="green" size="sm" />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Career Satisfaction</Text>
                  <Text fontSize="sm" fontWeight="bold">84%</Text>
                </HStack>
                <Progress value={84} colorScheme="blue" size="sm" />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Work-Life Balance</Text>
                  <Text fontSize="sm" fontWeight="bold">91%</Text>
                </HStack>
                <Progress value={91} colorScheme="purple" size="sm" />
              </Box>
              <Box w="full">
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Strategic Alignment</Text>
                  <Text fontSize="sm" fontWeight="bold">87%</Text>
                </HStack>
                <Progress value={87} colorScheme="orange" size="sm" />
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Strategic HR KPIs</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
            <Stat textAlign="center">
              <StatLabel>Talent Retention</StatLabel>
              <StatNumber fontSize="2xl">94%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +2.1% vs last quarter
              </StatHelpText>
            </Stat>
            <Stat textAlign="center">
              <StatLabel>Internal Mobility</StatLabel>
              <StatNumber fontSize="2xl">23%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +5.4% vs last quarter
              </StatHelpText>
            </Stat>
            <Stat textAlign="center">
              <StatLabel>Training ROI</StatLabel>
              <StatNumber fontSize="2xl">312%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +23% vs last quarter
              </StatHelpText>
            </Stat>
            <Stat textAlign="center">
              <StatLabel>Strategic Readiness</StatLabel>
              <StatNumber fontSize="2xl">89%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +12% vs last quarter
              </StatHelpText>
            </Stat>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box>
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>👥 Talent</Tab>
          <Tab>🏆 Teams</Tab>
          <Tab>📚 Development</Tab>
          <Tab>📈 Analytics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TalentDashboard />
          </TabPanel>
          <TabPanel>
            <TeamManagement />
          </TabPanel>
          <TabPanel>
            <SkillDevelopment />
          </TabPanel>
          <TabPanel>
            <PerformanceAnalytics />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Employee Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedEmployee && (
              <VStack spacing={4} align="start">
                <HStack>
                  <Avatar size="lg" name={selectedEmployee.name} />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold" fontSize="lg">{selectedEmployee.name}</Text>
                    <Text color="gray.600">{selectedEmployee.role}</Text>
                    <Badge colorScheme="blue">{selectedEmployee.department}</Badge>
                  </VStack>
                </HStack>
                <Divider />
                <Grid templateColumns="1fr 1fr" gap={4} w="full">
                  <Stat>
                    <StatLabel>Performance</StatLabel>
                    <StatNumber>{selectedEmployee.performance}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Engagement</StatLabel>
                    <StatNumber>{selectedEmployee.engagement}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Salary</StatLabel>
                    <StatNumber>${selectedEmployee.salary.toLocaleString()}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Tenure</StatLabel>
                    <StatNumber>
                      {Math.floor((Date.now() - new Date(selectedEmployee.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                    </StatNumber>
                  </Stat>
                </Grid>
                <Box w="full">
                  <Text fontWeight="semibold" mb={2}>Career Path</Text>
                  <Text color="gray.600">{selectedEmployee.careerPath}</Text>
                </Box>
                <Box w="full">
                  <Text fontWeight="semibold" mb={2}>Skill Development Areas</Text>
                  <HStack wrap="wrap">
                    {selectedEmployee.skillGaps.map((skill, idx) => (
                      <Badge key={idx} colorScheme="orange" variant="subtle">
                        {skill}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HRManagementNew;