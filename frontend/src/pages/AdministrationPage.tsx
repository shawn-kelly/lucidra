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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { 
  FiUsers, FiDollarSign, FiSettings, FiShield, FiFileText, 
  FiCreditCard, FiBook, FiTarget, FiTrendingUp, FiDatabase
} from 'react-icons/fi';

interface AdminModule {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'User Management' | 'Financial' | 'System' | 'Content';
  permission: 'admin' | 'manager' | 'user';
  status: 'active' | 'beta' | 'coming-soon';
  path: string;
}

interface AdministrationPageProps {
  onNavigate: (path: string) => void;
}

const AdministrationPage: React.FC<AdministrationPageProps> = ({ onNavigate }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const adminModules: AdminModule[] = [
    {
      id: 'hr-management',
      title: 'HR Management',
      description: 'Complete human resources management with employee profiles, performance tracking, and organizational charts',
      icon: FiUsers,
      category: 'User Management',
      permission: 'manager',
      status: 'active',
      path: 'hr-management'
    },
    {
      id: 'budgeting-module',
      title: 'Budgeting & Financial Planning',
      description: 'Advanced budgeting tools with forecasting, variance analysis, and financial reporting',
      icon: FiDollarSign,
      category: 'Financial',
      permission: 'manager',
      status: 'beta',
      path: 'budgeting-module'
    },
    {
      id: 'pricing',
      title: 'Pricing & Plans',
      description: 'Subscription management, billing configuration, and pricing tier administration',
      icon: FiCreditCard,
      category: 'Financial',
      permission: 'admin',
      status: 'active',
      path: 'pricing'
    },
    {
      id: 'company-admin',
      title: 'Company Administration',
      description: 'Organization settings, company profile management, and system configuration',
      icon: FiSettings,
      category: 'System',
      permission: 'admin',
      status: 'active',
      path: 'company-admin'
    },
    {
      id: 'platform-manual',
      title: 'Platform Documentation',
      description: 'Comprehensive platform manual, user guides, and training materials',
      icon: FiBook,
      category: 'Content',
      permission: 'user',
      status: 'active',
      path: 'platform-manual'
    },
    {
      id: 'tutorial-videos',
      title: 'Tutorial Management',
      description: 'Video tutorial library management and training content creation',
      icon: FiFileText,
      category: 'Content',
      permission: 'manager',
      status: 'active',
      path: 'tutorial-videos'
    },
    {
      id: 'financial-integration',
      title: 'Financial Integration',
      description: 'Connect external financial systems and automate data synchronization',
      icon: FiDatabase,
      category: 'System',
      permission: 'admin',
      status: 'active',
      path: 'financial-integration'
    },
    {
      id: 'bloom-training',
      title: 'Bloom\'s Taxonomy Training',
      description: 'Educational framework training and cognitive skills development programs',
      icon: FiTarget,
      category: 'Content',
      permission: 'manager',
      status: 'active',
      path: 'bloom-training'
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
      case 'User Management': return 'blue';
      case 'Financial': return 'green';
      case 'System': return 'purple';
      case 'Content': return 'orange';
      default: return 'gray';
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'admin': return 'red';
      case 'manager': return 'orange';
      case 'user': return 'green';
      default: return 'gray';
    }
  };

  const groupedModules = adminModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, AdminModule[]>);

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <VStack spacing={2} align="start">
          <Text fontSize="3xl" fontWeight="bold">🛡️ Administration</Text>
          <Text fontSize="lg" color="gray.600">
            Comprehensive administration tools for managing your organization and platform
          </Text>
        </VStack>

        {/* Admin Overview Stats */}
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Total Admin Modules</StatLabel>
                <StatNumber color="blue.500">{adminModules.length}</StatNumber>
                <StatHelpText>Available tools</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>User Management</StatLabel>
                <StatNumber color="green.500">
                  {adminModules.filter(m => m.category === 'User Management').length}
                </StatNumber>
                <StatHelpText>HR & Team tools</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Financial Tools</StatLabel>
                <StatNumber color="purple.500">
                  {adminModules.filter(m => m.category === 'Financial').length}
                </StatNumber>
                <StatHelpText>Budget & Billing</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>System Config</StatLabel>
                <StatNumber color="orange.500">
                  {adminModules.filter(m => m.category === 'System').length}
                </StatNumber>
                <StatHelpText>Platform settings</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Admin Categories */}
        {Object.entries(groupedModules).map(([category, modules]) => (
          <Card key={category} bg={cardBg} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Text fontSize="xl" fontWeight="bold" color={`${getCategoryColor(category)}.500`}>
                    {category}
                  </Text>
                  <Badge colorScheme={getCategoryColor(category)} size="sm">
                    {modules.length} modules
                  </Badge>
                </HStack>
                
                <Divider />

                <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={4}>
                  {modules.map((module) => (
                    <Card 
                      key={module.id}
                      variant="outline"
                      _hover={{ 
                        borderColor: `${getCategoryColor(category)}.300`, 
                        shadow: 'md',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s'
                      }}
                      cursor="pointer"
                      borderLeftWidth="4px"
                      borderLeftColor={`${getCategoryColor(category)}.400`}
                    >
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          <HStack justify="space-between">
                            <HStack>
                              <Icon as={module.icon} boxSize={5} color={`${getCategoryColor(category)}.500`} />
                              <Text fontSize="md" fontWeight="semibold">{module.title}</Text>
                            </HStack>
                            <VStack spacing={1}>
                              <Badge colorScheme={getStatusColor(module.status)} size="sm">
                                {module.status === 'active' ? 'Available' : module.status}
                              </Badge>
                              <Badge colorScheme={getPermissionColor(module.permission)} size="xs">
                                {module.permission}
                              </Badge>
                            </VStack>
                          </HStack>

                          <Text fontSize="sm" color="gray.600">
                            {module.description}
                          </Text>

                          <HStack justify="space-between" fontSize="xs" color="gray.500">
                            <Text>🔐 {module.permission} access</Text>
                            <Text>📋 {category}</Text>
                          </HStack>

                          <Button
                            size="sm"
                            colorScheme={getCategoryColor(category)}
                            onClick={() => onNavigate(module.path)}
                            isDisabled={module.status === 'coming-soon'}
                            w="full"
                            leftIcon={<FiShield />}
                          >
                            {module.status === 'coming-soon' ? 'Coming Soon' : 'Access Module'}
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

        {/* Quick Administrative Actions */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold">⚡ Quick Actions</Text>
              <Text fontSize="sm" color="gray.600">
                Common administrative tasks and frequently accessed modules
              </Text>
              
              <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={3}>
                <Button
                  leftIcon={<FiUsers />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => onNavigate('hr-management')}
                  size="sm"
                >
                  Manage Users
                </Button>
                <Button
                  leftIcon={<FiDollarSign />}
                  colorScheme="green"
                  variant="outline"
                  onClick={() => onNavigate('budgeting-module')}
                  size="sm"
                >
                  Financial Planning
                </Button>
                <Button
                  leftIcon={<FiSettings />}
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => onNavigate('company-admin')}
                  size="sm"
                >
                  System Settings
                </Button>
                <Button
                  leftIcon={<FiBook />}
                  colorScheme="orange"
                  variant="outline"
                  onClick={() => onNavigate('platform-manual')}
                  size="sm"
                >
                  Documentation
                </Button>
              </Grid>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default AdministrationPage;