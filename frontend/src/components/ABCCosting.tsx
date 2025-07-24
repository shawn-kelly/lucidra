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
  NumberInput,
  NumberInputField,
  Divider,
  IconButton,
  Tooltip,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

// Porter's Value Chain Activities
interface ValueChainActivity {
  id: string;
  name: string;
  type: 'primary' | 'support';
  category: 'inbound_logistics' | 'operations' | 'outbound_logistics' | 'marketing_sales' | 'service' | 
           'procurement' | 'technology' | 'hr_management' | 'firm_infrastructure';
  description: string;
  totalCost: number;
  processes: string[]; // Process IDs linked to this activity
}

// Activity-Based Costing Structures
interface CostDriver {
  id: string;
  name: string;
  unit: string;
  activityId: string;
  costPerUnit: number;
  totalUnits: number;
  totalCost: number;
}

interface CostPool {
  id: string;
  name: string;
  totalCost: number;
  drivers: CostDriver[];
  valueChainActivity: string;
}

interface SalaryAllocation {
  employeeId: string;
  employeeName: string;
  hourlyRate: number;
  totalHours: number;
  allocations: {
    processId: string;
    processName: string;
    hoursAllocated: number;
    cost: number;
    valueChainActivity: string;
  }[];
}

interface ProcessCostAnalysis {
  processId: string;
  processName: string;
  valueChainActivity: string;
  directCosts: {
    materials: number;
    labor: number;
    equipment: number;
  };
  indirectCosts: {
    overhead: number;
    support: number;
    facility: number;
  };
  activityCosts: {
    driverId: string;
    driverName: string;
    units: number;
    costPerUnit: number;
    totalCost: number;
  }[];
  totalCost: number;
  costPerUnit: number;
  profitabilityAnalysis: {
    revenue: number;
    grossMargin: number;
    contributionMargin: number;
    roi: number;
  };
}

interface ABCCostingProps {
  companyData?: any;
  onCostDataUpdate?: (data: any) => void;
}

const VALUE_CHAIN_ACTIVITIES: Omit<ValueChainActivity, 'id' | 'totalCost' | 'processes'>[] = [
  // Primary Activities
  {
    name: 'Inbound Logistics',
    type: 'primary',
    category: 'inbound_logistics',
    description: 'Receiving, warehousing, and inventory control of input materials'
  },
  {
    name: 'Operations',
    type: 'primary',
    category: 'operations',
    description: 'Value-creating activities that transform inputs into the final product'
  },
  {
    name: 'Outbound Logistics',
    type: 'primary',
    category: 'outbound_logistics',
    description: 'Storing and distributing the finished product'
  },
  {
    name: 'Marketing & Sales',
    type: 'primary',
    category: 'marketing_sales',
    description: 'Activities to convince buyers to purchase the product'
  },
  {
    name: 'Service',
    type: 'primary',
    category: 'service',
    description: 'Activities that maintain and enhance product value after sale'
  },
  
  // Support Activities
  {
    name: 'Procurement',
    type: 'support',
    category: 'procurement',
    description: 'Purchasing of raw materials, supplies, and other consumable items'
  },
  {
    name: 'Technology Development',
    type: 'support',
    category: 'technology',
    description: 'R&D, product design, and process improvement activities'
  },
  {
    name: 'Human Resource Management',
    type: 'support',
    category: 'hr_management',
    description: 'Recruiting, hiring, training, and compensating personnel'
  },
  {
    name: 'Firm Infrastructure',
    type: 'support',
    category: 'firm_infrastructure',
    description: 'General management, planning, finance, accounting, legal, and quality management'
  }
];

const ABCCosting: React.FC<ABCCostingProps> = ({ companyData, onCostDataUpdate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [valueChainActivities, setValueChainActivities] = useState<ValueChainActivity[]>([]);
  const [costPools, setCostPools] = useState<CostPool[]>([]);
  const [salaryAllocations, setSalaryAllocations] = useState<SalaryAllocation[]>([]);
  const [processCosts, setProcessCosts] = useState<ProcessCostAnalysis[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ValueChainActivity | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<SalaryAllocation | null>(null);
  
  const { isOpen: isActivityModalOpen, onOpen: onActivityModalOpen, onClose: onActivityModalClose } = useDisclosure();
  const { isOpen: isDriverModalOpen, onOpen: onDriverModalOpen, onClose: onDriverModalClose } = useDisclosure();
  const { isOpen: isSalaryModalOpen, onOpen: onSalaryModalOpen, onClose: onSalaryModalClose } = useDisclosure();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();
  
  useEffect(() => {
    // Initialize value chain activities
    const initialActivities: ValueChainActivity[] = VALUE_CHAIN_ACTIVITIES.map((activity, index) => ({
      ...activity,
      id: `vc_${index + 1}`,
      totalCost: Math.random() * 50000 + 10000, // Simulated costs
      processes: [] // Will be linked from process management
    }));
    
    setValueChainActivities(initialActivities);
    
    // Initialize sample cost pools
    const sampleCostPools: CostPool[] = [
      {
        id: 'cp_1',
        name: 'Machine Setup',
        totalCost: 25000,
        valueChainActivity: 'vc_2', // Operations
        drivers: [
          {
            id: 'cd_1',
            name: 'Number of Setups',
            unit: 'setups',
            activityId: 'cp_1',
            costPerUnit: 125,
            totalUnits: 200,
            totalCost: 25000
          }
        ]
      },
      {
        id: 'cp_2',
        name: 'Quality Control',
        totalCost: 18000,
        valueChainActivity: 'vc_2', // Operations
        drivers: [
          {
            id: 'cd_2',
            name: 'Inspection Hours',
            unit: 'hours',
            activityId: 'cp_2',
            costPerUnit: 45,
            totalUnits: 400,
            totalCost: 18000
          }
        ]
      },
      {
        id: 'cp_3',
        name: 'Customer Support',
        totalCost: 32000,
        valueChainActivity: 'vc_5', // Service
        drivers: [
          {
            id: 'cd_3',
            name: 'Support Tickets',
            unit: 'tickets',
            activityId: 'cp_3',
            costPerUnit: 16,
            totalUnits: 2000,
            totalCost: 32000
          }
        ]
      }
    ];
    
    setCostPools(sampleCostPools);
    
    // Initialize sample salary allocations
    const sampleSalaryAllocations: SalaryAllocation[] = [
      {
        employeeId: 'emp_1',
        employeeName: 'John Smith - Operations Manager',
        hourlyRate: 45,
        totalHours: 160, // Monthly hours
        allocations: [
          {
            processId: 'proc_1',
            processName: 'Product Assembly',
            hoursAllocated: 80,
            cost: 3600,
            valueChainActivity: 'vc_2'
          },
          {
            processId: 'proc_2',
            processName: 'Quality Control',
            hoursAllocated: 50,
            cost: 2250,
            valueChainActivity: 'vc_2'
          },
          {
            processId: 'proc_3',
            processName: 'Process Improvement',
            hoursAllocated: 30,
            cost: 1350,
            valueChainActivity: 'vc_7'
          }
        ]
      },
      {
        employeeId: 'emp_2',
        employeeName: 'Sarah Johnson - Sales Representative',
        hourlyRate: 38,
        totalHours: 160,
        allocations: [
          {
            processId: 'proc_4',
            processName: 'Lead Generation',
            hoursAllocated: 60,
            cost: 2280,
            valueChainActivity: 'vc_4'
          },
          {
            processId: 'proc_5',
            processName: 'Customer Meetings',
            hoursAllocated: 80,
            cost: 3040,
            valueChainActivity: 'vc_4'
          },
          {
            processId: 'proc_6',
            processName: 'Proposal Writing',
            hoursAllocated: 20,
            cost: 760,
            valueChainActivity: 'vc_4'
          }
        ]
      },
      {
        employeeId: 'emp_3',
        employeeName: 'Mike Chen - Customer Support',
        hourlyRate: 28,
        totalHours: 160,
        allocations: [
          {
            processId: 'proc_7',
            processName: 'Technical Support',
            hoursAllocated: 120,
            cost: 3360,
            valueChainActivity: 'vc_5'
          },
          {
            processId: 'proc_8',
            processName: 'Documentation',
            hoursAllocated: 25,
            cost: 700,
            valueChainActivity: 'vc_5'
          },
          {
            processId: 'proc_9',
            processName: 'Training',
            hoursAllocated: 15,
            cost: 420,
            valueChainActivity: 'vc_8'
          }
        ]
      }
    ];
    
    setSalaryAllocations(sampleSalaryAllocations);
    
    // Generate process cost analysis
    generateProcessCostAnalysis(initialActivities, sampleCostPools, sampleSalaryAllocations);
  }, []);
  
  const generateProcessCostAnalysis = useCallback((
    activities: ValueChainActivity[],
    pools: CostPool[],
    salaries: SalaryAllocation[]
  ) => {
    const processAnalyses: ProcessCostAnalysis[] = [];
    
    // Aggregate all processes from salary allocations
    const allProcesses = salaries.flatMap(emp => emp.allocations);
    const uniqueProcesses = Array.from(
      new Map(allProcesses.map(p => [p.processId, p])).values()
    );
    
    uniqueProcesses.forEach(process => {
      // Calculate labor costs for this process
      const laborCosts = salaries.reduce((total, emp) => {
        const allocation = emp.allocations.find(a => a.processId === process.processId);
        return total + (allocation?.cost || 0);
      }, 0);
      
      // Find relevant cost drivers
      const relevantDrivers = pools.flatMap(pool => 
        pool.drivers.filter(driver => 
          // Simplified logic - could be more sophisticated based on process characteristics
          Math.random() > 0.5
        )
      );
      
      const activityCosts = relevantDrivers.map(driver => ({
        driverId: driver.id,
        driverName: driver.name,
        units: Math.floor(Math.random() * 50) + 10,
        costPerUnit: driver.costPerUnit,
        totalCost: (Math.floor(Math.random() * 50) + 10) * driver.costPerUnit
      }));
      
      const totalActivityCost = activityCosts.reduce((sum, ac) => sum + ac.totalCost, 0);
      const directMaterials = Math.random() * 5000 + 1000;
      const directEquipment = Math.random() * 2000 + 500;
      const indirectOverhead = (laborCosts + directMaterials + directEquipment) * 0.15;
      const indirectSupport = (laborCosts + directMaterials + directEquipment) * 0.08;
      const indirectFacility = (laborCosts + directMaterials + directEquipment) * 0.05;
      
      const totalCost = laborCosts + directMaterials + directEquipment + 
                       indirectOverhead + indirectSupport + indirectFacility + totalActivityCost;
      
      const revenue = totalCost * (1.2 + Math.random() * 0.8); // 20-100% markup
      const grossMargin = revenue - totalCost;
      
      processAnalyses.push({
        processId: process.processId,
        processName: process.processName,
        valueChainActivity: process.valueChainActivity,
        directCosts: {
          materials: directMaterials,
          labor: laborCosts,
          equipment: directEquipment
        },
        indirectCosts: {
          overhead: indirectOverhead,
          support: indirectSupport,
          facility: indirectFacility
        },
        activityCosts,
        totalCost,
        costPerUnit: totalCost / (Math.random() * 100 + 50), // Simulated units
        profitabilityAnalysis: {
          revenue,
          grossMargin,
          contributionMargin: grossMargin / revenue,
          roi: (grossMargin / totalCost) * 100
        }
      });
    });
    
    setProcessCosts(processAnalyses);
    
    // Update value chain activity costs
    const updatedActivities = activities.map(activity => {
      const activityProcesses = processAnalyses.filter(p => p.valueChainActivity === activity.id);
      const totalActivityCost = activityProcesses.reduce((sum, p) => sum + p.totalCost, 0);
      return { ...activity, totalCost: totalActivityCost || activity.totalCost };
    });
    
    setValueChainActivities(updatedActivities);
  }, []);
  
  const addCostDriver = (poolId: string, driver: Omit<CostDriver, 'id'>) => {
    setCostPools(prev => prev.map(pool => 
      pool.id === poolId 
        ? { 
            ...pool, 
            drivers: [...pool.drivers, { ...driver, id: `cd_${Date.now()}` }]
          }
        : pool
    ));
  };
  
  const updateSalaryAllocation = (employeeId: string, processId: string, hours: number) => {
    setSalaryAllocations(prev => prev.map(emp => 
      emp.employeeId === employeeId 
        ? {
            ...emp,
            allocations: emp.allocations.map(alloc =>
              alloc.processId === processId
                ? { ...alloc, hoursAllocated: hours, cost: hours * emp.hourlyRate }
                : alloc
            )
          }
        : emp
    ));
  };
  
  const getTotalCostByActivity = () => {
    return valueChainActivities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + activity.totalCost;
      return acc;
    }, {} as Record<string, number>);
  };
  
  const costByActivity = getTotalCostByActivity();
  const totalCosts = Object.values(costByActivity).reduce((sum, cost) => sum + cost, 0);
  
  return (
    <Box p={6}>
      <VStack spacing={6} maxW="7xl" mx="auto">
        {/* Header */}
        <HStack justify="space-between" w="full">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">💰 Activity-Based Costing</Text>
            <Text color="gray.600">Porter's Value Chain integrated with process costing</Text>
          </VStack>
          <HStack>
            <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onActivityModalOpen}>
              Add Cost Pool
            </Button>
            <Button leftIcon={<AddIcon />} colorScheme="green" onClick={onSalaryModalOpen}>
              Manage Salary Allocation
            </Button>
          </HStack>
        </HStack>
        
        {/* Key Metrics */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6} w="full">
          <Stat bg={cardBg} p={4} borderRadius="md" shadow="sm">
            <StatLabel>Total Costs</StatLabel>
            <StatNumber>${totalCosts.toLocaleString()}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              All value chain activities
            </StatHelpText>
          </Stat>
          <Stat bg={cardBg} p={4} borderRadius="md" shadow="sm">
            <StatLabel>Primary Activities</StatLabel>
            <StatNumber>${(costByActivity.primary || 0).toLocaleString()}</StatNumber>
            <StatHelpText>
              {((costByActivity.primary || 0) / totalCosts * 100).toFixed(1)}% of total
            </StatHelpText>
          </Stat>
          <Stat bg={cardBg} p={4} borderRadius="md" shadow="sm">
            <StatLabel>Support Activities</StatLabel>
            <StatNumber>${(costByActivity.support || 0).toLocaleString()}</StatNumber>
            <StatHelpText>
              {((costByActivity.support || 0) / totalCosts * 100).toFixed(1)}% of total
            </StatHelpText>
          </Stat>
          <Stat bg={cardBg} p={4} borderRadius="md" shadow="sm">
            <StatLabel>Cost Efficiency</StatLabel>
            <StatNumber>{((costByActivity.primary || 0) / (costByActivity.support || 1)).toFixed(2)}</StatNumber>
            <StatHelpText>
              Primary to Support ratio
            </StatHelpText>
          </Stat>
        </Grid>
        
        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab} w="full">
          <TabList>
            <Tab>Value Chain Overview</Tab>
            <Tab>Cost Pools & Drivers</Tab>
            <Tab>Salary Allocation</Tab>
            <Tab>Process Cost Analysis</Tab>
            <Tab>Profitability Analysis</Tab>
          </TabList>
          
          <TabPanels>
            {/* Value Chain Overview */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <Alert status="info">
                  <AlertIcon />
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold">Porter's Value Chain Analysis</Text>
                    <Text fontSize="sm">
                      Analyze costs across primary and support activities to identify optimization opportunities
                    </Text>
                  </VStack>
                </Alert>
                
                {/* Primary Activities */}
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">Primary Activities</Text>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
                      {valueChainActivities.filter(a => a.type === 'primary').map(activity => (
                        <Card key={activity.id} border="2px" borderColor="blue.200" bg="blue.50">
                          <CardBody p={4}>
                            <VStack spacing={3} align="stretch">
                              <Text fontSize="sm" fontWeight="bold" textAlign="center">
                                {activity.name}
                              </Text>
                              <Text fontSize="xs" color="gray.600" textAlign="center">
                                {activity.description}
                              </Text>
                              <Divider />
                              <VStack spacing={1}>
                                <Text fontSize="lg" fontWeight="bold" color="blue.600">
                                  ${activity.totalCost.toLocaleString()}
                                </Text>
                                <Progress 
                                  value={(activity.totalCost / totalCosts) * 100} 
                                  colorScheme="blue" 
                                  size="sm" 
                                  w="full"
                                />
                                <Text fontSize="xs" color="gray.500">
                                  {((activity.totalCost / totalCosts) * 100).toFixed(1)}% of total
                                </Text>
                              </VStack>
                              <Button size="xs" onClick={() => {
                                setSelectedActivity(activity);
                                onActivityModalOpen();
                              }}>
                                View Details
                              </Button>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </Grid>
                  </CardBody>
                </Card>
                
                {/* Support Activities */}
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">Support Activities</Text>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
                      {valueChainActivities.filter(a => a.type === 'support').map(activity => (
                        <Card key={activity.id} border="2px" borderColor="purple.200" bg="purple.50">
                          <CardBody p={4}>
                            <VStack spacing={3} align="stretch">
                              <Text fontSize="sm" fontWeight="bold" textAlign="center">
                                {activity.name}
                              </Text>
                              <Text fontSize="xs" color="gray.600" textAlign="center">
                                {activity.description}
                              </Text>
                              <Divider />
                              <VStack spacing={1}>
                                <Text fontSize="lg" fontWeight="bold" color="purple.600">
                                  ${activity.totalCost.toLocaleString()}
                                </Text>
                                <Progress 
                                  value={(activity.totalCost / totalCosts) * 100} 
                                  colorScheme="purple" 
                                  size="sm" 
                                  w="full"
                                />
                                <Text fontSize="xs" color="gray.500">
                                  {((activity.totalCost / totalCosts) * 100).toFixed(1)}% of total
                                </Text>
                              </VStack>
                              <Button size="xs" onClick={() => {
                                setSelectedActivity(activity);
                                onActivityModalOpen();
                              }}>
                                View Details
                              </Button>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </Grid>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
            
            {/* Cost Pools & Drivers */}
            <TabPanel p={0} pt={6}>
              <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                {costPools.map(pool => {
                  const activity = valueChainActivities.find(a => a.id === pool.valueChainActivity);
                  return (
                    <Card key={pool.id} bg={cardBg}>
                      <CardHeader>
                        <HStack justify="space-between">
                          <VStack align="start" spacing={0}>
                            <Text fontSize="lg" fontWeight="bold">{pool.name}</Text>
                            <Badge colorScheme={activity?.type === 'primary' ? 'blue' : 'purple'}>
                              {activity?.name}
                            </Badge>
                          </VStack>
                          <Text fontSize="xl" fontWeight="bold" color="green.500">
                            ${pool.totalCost.toLocaleString()}
                          </Text>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          <Text fontSize="sm" fontWeight="semibold">Cost Drivers:</Text>
                          {pool.drivers.map(driver => (
                            <Box key={driver.id} p={3} bg="gray.50" borderRadius="md">
                              <Grid templateColumns="1fr 1fr" gap={2}>
                                <Text fontSize="sm" fontWeight="medium">{driver.name}</Text>
                                <Text fontSize="sm" textAlign="right">${driver.costPerUnit}/{driver.unit}</Text>
                                <Text fontSize="xs" color="gray.600">{driver.totalUnits} {driver.unit}</Text>
                                <Text fontSize="sm" fontWeight="bold" textAlign="right">
                                  ${driver.totalCost.toLocaleString()}
                                </Text>
                              </Grid>
                            </Box>
                          ))}
                          <Button size="sm" leftIcon={<AddIcon />} onClick={onDriverModalOpen}>
                            Add Driver
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  );
                })}
              </Grid>
            </TabPanel>
            
            {/* Salary Allocation */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                {salaryAllocations.map(employee => (
                  <Card key={employee.employeeId} bg={cardBg}>
                    <CardHeader>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text fontSize="lg" fontWeight="bold">{employee.employeeName}</Text>
                          <Text fontSize="sm" color="gray.600">
                            ${employee.hourlyRate}/hour • {employee.totalHours} hours/month
                          </Text>
                        </VStack>
                        <VStack align="end" spacing={0}>
                          <Text fontSize="xl" fontWeight="bold" color="green.500">
                            ${(employee.hourlyRate * employee.totalHours).toLocaleString()}
                          </Text>
                          <Text fontSize="sm" color="gray.600">Total Monthly Cost</Text>
                        </VStack>
                      </HStack>
                    </CardHeader>
                    <CardBody>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Process</Th>
                            <Th>Value Chain Activity</Th>
                            <Th isNumeric>Hours</Th>
                            <Th isNumeric>Cost</Th>
                            <Th isNumeric>% of Time</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {employee.allocations.map(allocation => {
                            const activity = valueChainActivities.find(a => a.id === allocation.valueChainActivity);
                            return (
                              <Tr key={allocation.processId}>
                                <Td>{allocation.processName}</Td>
                                <Td>
                                  <Badge colorScheme={activity?.type === 'primary' ? 'blue' : 'purple'} size="sm">
                                    {activity?.name}
                                  </Badge>
                                </Td>
                                <Td isNumeric>{allocation.hoursAllocated}</Td>
                                <Td isNumeric>${allocation.cost.toLocaleString()}</Td>
                                <Td isNumeric>
                                  {((allocation.hoursAllocated / employee.totalHours) * 100).toFixed(1)}%
                                </Td>
                                <Td>
                                  <IconButton
                                    aria-label="Edit allocation"
                                    icon={<EditIcon />}
                                    size="xs"
                                    onClick={() => {
                                      setSelectedEmployee(employee);
                                      onSalaryModalOpen();
                                    }}
                                  />
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </TabPanel>
            
            {/* Process Cost Analysis */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                {processCosts.map(process => {
                  const activity = valueChainActivities.find(a => a.id === process.valueChainActivity);
                  return (
                    <Card key={process.processId} bg={cardBg}>
                      <CardHeader>
                        <HStack justify="space-between">
                          <VStack align="start" spacing={0}>
                            <Text fontSize="lg" fontWeight="bold">{process.processName}</Text>
                            <Badge colorScheme={activity?.type === 'primary' ? 'blue' : 'purple'}>
                              {activity?.name}
                            </Badge>
                          </VStack>
                          <VStack align="end" spacing={0}>
                            <Text fontSize="xl" fontWeight="bold" color="red.500">
                              ${process.totalCost.toLocaleString()}
                            </Text>
                            <Text fontSize="sm" color="gray.600">Total Process Cost</Text>
                          </VStack>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                          {/* Direct Costs */}
                          <VStack align="stretch" spacing={3}>
                            <Text fontSize="md" fontWeight="semibold">Direct Costs</Text>
                            <Box p={3} bg="green.50" borderRadius="md">
                              <VStack spacing={2} align="stretch">
                                <HStack justify="space-between">
                                  <Text fontSize="sm">Materials</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${process.directCosts.materials.toLocaleString()}
                                  </Text>
                                </HStack>
                                <HStack justify="space-between">
                                  <Text fontSize="sm">Labor</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${process.directCosts.labor.toLocaleString()}
                                  </Text>
                                </HStack>
                                <HStack justify="space-between">
                                  <Text fontSize="sm">Equipment</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${process.directCosts.equipment.toLocaleString()}
                                  </Text>
                                </HStack>
                                <Divider />
                                <HStack justify="space-between">
                                  <Text fontSize="sm" fontWeight="bold">Total Direct</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${(process.directCosts.materials + process.directCosts.labor + process.directCosts.equipment).toLocaleString()}
                                  </Text>
                                </HStack>
                              </VStack>
                            </Box>
                          </VStack>
                          
                          {/* Indirect Costs */}
                          <VStack align="stretch" spacing={3}>
                            <Text fontSize="md" fontWeight="semibold">Indirect Costs</Text>
                            <Box p={3} bg="yellow.50" borderRadius="md">
                              <VStack spacing={2} align="stretch">
                                <HStack justify="space-between">
                                  <Text fontSize="sm">Overhead</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${process.indirectCosts.overhead.toLocaleString()}
                                  </Text>
                                </HStack>
                                <HStack justify="space-between">
                                  <Text fontSize="sm">Support</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${process.indirectCosts.support.toLocaleString()}
                                  </Text>
                                </HStack>
                                <HStack justify="space-between">
                                  <Text fontSize="sm">Facility</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${process.indirectCosts.facility.toLocaleString()}
                                  </Text>
                                </HStack>
                                <Divider />
                                <HStack justify="space-between">
                                  <Text fontSize="sm" fontWeight="bold">Total Indirect</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${(process.indirectCosts.overhead + process.indirectCosts.support + process.indirectCosts.facility).toLocaleString()}
                                  </Text>
                                </HStack>
                              </VStack>
                            </Box>
                          </VStack>
                          
                          {/* Activity-Based Costs */}
                          <VStack align="stretch" spacing={3}>
                            <Text fontSize="md" fontWeight="semibold">Activity-Based Costs</Text>
                            <Box p={3} bg="blue.50" borderRadius="md">
                              <VStack spacing={2} align="stretch">
                                {process.activityCosts.map(cost => (
                                  <HStack key={cost.driverId} justify="space-between">
                                    <Text fontSize="sm">{cost.driverName}</Text>
                                    <Text fontSize="sm" fontWeight="bold">
                                      ${cost.totalCost.toLocaleString()}
                                    </Text>
                                  </HStack>
                                ))}
                                <Divider />
                                <HStack justify="space-between">
                                  <Text fontSize="sm" fontWeight="bold">Total ABC</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${process.activityCosts.reduce((sum, c) => sum + c.totalCost, 0).toLocaleString()}
                                  </Text>
                                </HStack>
                              </VStack>
                            </Box>
                          </VStack>
                        </Grid>
                      </CardBody>
                    </Card>
                  );
                })}
              </VStack>
            </TabPanel>
            
            {/* Profitability Analysis */}
            <TabPanel p={0} pt={6}>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                {processCosts.map(process => {
                  const activity = valueChainActivities.find(a => a.id === process.valueChainActivity);
                  return (
                    <Card key={process.processId} bg={cardBg}>
                      <CardHeader>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="lg" fontWeight="bold">{process.processName}</Text>
                          <Badge colorScheme={activity?.type === 'primary' ? 'blue' : 'purple'}>
                            {activity?.name}
                          </Badge>
                        </VStack>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          {/* Revenue & Cost */}
                          <Grid templateColumns="1fr 1fr" gap={4}>
                            <VStack spacing={2} align="stretch">
                              <Text fontSize="sm" fontWeight="semibold">Revenue</Text>
                              <Text fontSize="lg" fontWeight="bold" color="green.500">
                                ${process.profitabilityAnalysis.revenue.toLocaleString()}
                              </Text>
                            </VStack>
                            <VStack spacing={2} align="stretch">
                              <Text fontSize="sm" fontWeight="semibold">Total Cost</Text>
                              <Text fontSize="lg" fontWeight="bold" color="red.500">
                                ${process.totalCost.toLocaleString()}
                              </Text>
                            </VStack>
                          </Grid>
                          
                          {/* Profitability Metrics */}
                          <VStack spacing={3} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="sm">Gross Margin</Text>
                              <Text fontSize="sm" fontWeight="bold" color="green.500">
                                ${process.profitabilityAnalysis.grossMargin.toLocaleString()}
                              </Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">Contribution Margin %</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                {(process.profitabilityAnalysis.contributionMargin * 100).toFixed(1)}%
                              </Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">ROI</Text>
                              <Text 
                                fontSize="sm" 
                                fontWeight="bold" 
                                color={process.profitabilityAnalysis.roi > 0 ? 'green.500' : 'red.500'}
                              >
                                {process.profitabilityAnalysis.roi.toFixed(1)}%
                              </Text>
                            </HStack>
                          </VStack>
                          
                          {/* Cost per Unit */}
                          <Box p={3} bg="gray.50" borderRadius="md">
                            <HStack justify="space-between">
                              <Text fontSize="sm" fontWeight="semibold">Cost per Unit</Text>
                              <Text fontSize="lg" fontWeight="bold">
                                ${process.costPerUnit.toFixed(2)}
                              </Text>
                            </HStack>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  );
                })}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default ABCCosting;