import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  useColorModeValue,
  Icon,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { 
  FiSettings, FiUsers, FiTrendingUp, FiMap, FiBarChart3, 
  FiTarget, FiCpu, FiFileText, FiFolder, FiActivity
} from 'react-icons/fi';

interface OperationsModule {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'Process Management' | 'Project Management' | 'Team Management' | 'Performance';
  status: 'active' | 'beta' | 'coming-soon';
  path: string;
}

interface OperationsPageProps {
  onNavigate: (path: string) => void;
}

const OperationsPage: React.FC<OperationsPageProps> = ({ onNavigate }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const operationsModules: OperationsModule[] = [
    {
      id: 'process-management-advanced',
      title: 'Advanced Process Management',
      description: 'AI-powered process mapping with narrative conversion, cost analysis, and multi-format export',
      icon: FiCpu,
      category: 'Process Management',
      status: 'active',
      path: 'process-management-advanced'
    },
    {
      id: 'process-management',
      title: 'Process Management',
      description: 'Standard process documentation and workflow management tools',
      icon: FiSettings,
      category: 'Process Management',
      status: 'active',
      path: 'process-management'
    },
    {
      id: 'process-improvement',
      title: 'Process Improvement',
      description: 'Continuous improvement methodologies and optimization frameworks',
      icon: FiTrendingUp,
      category: 'Process Management',
      status: 'active',
      path: 'process-improvement'
    },
    {
      id: 'process-analysis',
      title: 'Process Analysis Framework',
      description: 'Deep-dive process analysis with bottleneck identification and efficiency metrics',
      icon: FiBarChart3,
      category: 'Process Management',
      status: 'active',
      path: 'process-analysis'
    },
    {
      id: 'project-management',
      title: 'Project Management',
      description: 'Comprehensive project planning, tracking, and resource management',
      icon: FiFolder,
      category: 'Project Management',
      status: 'active',
      path: 'project-management'
    },
    {
      id: 'team-collaboration',
      title: 'Team Collaboration',
      description: 'Real-time collaboration tools and team communication platform',
      icon: FiUsers,
      category: 'Team Management',
      status: 'active',
      path: 'team-collaboration'
    },
    {
      id: 'team-interaction',
      title: 'Live Team Interaction',
      description: 'Interactive team workshops and real-time collaboration sessions',
      icon: FiActivity,
      category: 'Team Management',
      status: 'active',
      path: 'team-interaction'
    },
    {
      id: 'capability-architecture',
      title: 'Capability Architecture',
      description: 'Map organizational capabilities and identify strategic gaps',
      icon: FiTarget,
      category: 'Performance',
      status: 'active',
      path: 'capability-architecture'
    },
    {
      id: 'platform-manual',
      title: 'Platform Manual',
      description: 'Comprehensive documentation and user guides for all platform features',
      icon: FiFileText,
      category: 'Performance',
      status: 'active',
      path: 'platform-manual'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'beta': return 'orange';
      case 'coming-soon': return 'gray';
      default: return 'gray';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Process Management': return 'blue';
      case 'Project Management': return 'purple';
      case 'Team Management': return 'teal';
      case 'Performance': return 'orange';
      default: return 'gray';
    }
  };

  const groupedModules = operationsModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, OperationsModule[]>);

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <VStack spacing={2} align="start">
          <Text fontSize="3xl" fontWeight="bold">⚙️ Operations</Text>
          <Text fontSize="lg" color="gray.600">
            Streamline your operations with powerful process, project, and team management tools
          </Text>
        </VStack>

        {/* Overview Stats */}
        <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4}>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {operationsModules.filter(m => m.category === 'Process Management').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Process Tools</Text>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                {operationsModules.filter(m => m.category === 'Project Management').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Project Tools</Text>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                {operationsModules.filter(m => m.category === 'Team Management').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Team Tools</Text>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {operationsModules.filter(m => m.status === 'active').length}
              </Text>
              <Text fontSize="sm" color="gray.600">Active Modules</Text>
            </CardBody>
          </Card>
        </Grid>

        {/* Operations Categories */}
        {Object.entries(groupedModules).map(([category, modules]) => (
          <Card key={category} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Text fontSize="xl" fontWeight="bold" color={`${getCategoryColor(category)}.500`}>
                    {category}
                  </Text>
                  <Badge colorScheme={getCategoryColor(category)} size="sm">
                    {modules.length} tools
                  </Badge>
                </HStack>
                
                <Divider />

                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                  {modules.map((module) => (
                    <Card 
                      key={module.id}
                      variant="outline"
                      _hover={{ 
                        borderColor: `${getCategoryColor(category)}.300`, 
                        shadow: 'sm',
                        transform: 'translateY(-1px)',
                        transition: 'all 0.2s'
                      }}
                      cursor="pointer"
                    >
                      <CardBody>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <HStack>
                              <Icon as={module.icon} boxSize={5} color={`${getCategoryColor(category)}.500`} />
                              <Text fontSize="md" fontWeight="semibold">{module.title}</Text>
                            </HStack>
                            <Badge colorScheme={getStatusColor(module.status)} size="sm">
                              {module.status === 'active' ? 'Ready' : module.status}
                            </Badge>
                          </HStack>

                          <Text fontSize="sm" color="gray.600">
                            {module.description}
                          </Text>

                          <Button
                            size="sm"
                            colorScheme={getCategoryColor(category)}
                            onClick={() => onNavigate(module.path)}
                            isDisabled={module.status === 'coming-soon'}
                            w="full"
                          >
                            {module.status === 'coming-soon' ? 'Coming Soon' : 'Launch Tool'}
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </VStack>
            </CardBody>
          </Card>
        ))}

        {/* Quick Access */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold">🚀 Quick Access</Text>
              
              <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
                <Button
                  leftIcon={<FiCpu />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => onNavigate('process-management-advanced')}
                  size="sm"
                >
                  AI Process Mapping
                </Button>
                <Button
                  leftIcon={<FiFolder />}
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => onNavigate('project-management')}
                  size="sm"
                >
                  Project Management
                </Button>
                <Button
                  leftIcon={<FiUsers />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => onNavigate('team-collaboration')}
                  size="sm"
                >
                  Team Collaboration
                </Button>
                <Button
                  leftIcon={<FiTrendingUp />}
                  colorScheme="green"
                  variant="outline"
                  onClick={() => onNavigate('process-improvement')}
                  size="sm"
                >
                  Process Improvement
                </Button>
              </Grid>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default OperationsPage;