import React, { useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Flex,
  Container,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { FiMenu, FiSearch, FiBell, FiChevronDown, FiHome, FiUsers, FiSettings } from 'react-icons/fi';

interface McKinseyLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  userProfile?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

const McKinseyLayout: React.FC<McKinseyLayoutProps> = ({ 
  children, 
  currentView, 
  onNavigate,
  userProfile = { name: 'John Doe', role: 'Senior Partner' }
}) => {
  const headerBg = useColorModeValue('white', 'mckinsey.gray.800');
  const borderColor = useColorModeValue('mckinsey.gray.200', 'mckinsey.gray.600');
  const sidebarBg = useColorModeValue('mckinsey.primary.500', 'mckinsey.primary.600');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: FiHome, description: 'Dashboard overview' },
    { id: 'core-features', label: 'Core Features', icon: FiSettings, description: 'Essential business tools' },
    { id: 'strategy-frameworks-section', label: 'Strategy Frameworks', icon: FiUsers, description: 'Strategic analysis tools' },
    { id: 'operations-section', label: 'Operations', icon: FiSettings, description: 'Process & project management' },
    { id: 'analytics-ai-section', label: 'Analytics & AI', icon: FiSearch, description: 'AI-powered insights' },
    { id: 'administration-section', label: 'Administration', icon: FiUsers, description: 'System management' },
  ];

  return (
    <Box minH="100vh" bg="mckinsey.gray.50">
      {/* McKinsey Header */}
      <Box
        bg={headerBg}
        borderBottom="1px"
        borderColor={borderColor}
        position="sticky"
        top={0}
        zIndex={1000}
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.06)"
      >
        <Container maxW="full" px={0}>
          <Flex h="72px" align="center" justify="space-between" px={6}>
            {/* Logo Section */}
            <HStack spacing={6}>
              <HStack spacing={3}>
                <Box w="40px" h="40px" bg="mckinsey.primary.500" borderRadius="4px" display="flex" alignItems="center" justifyContent="center">
                  <Text color="white" fontWeight="bold" fontSize="xl">L</Text>
                </Box>
                <VStack align="start" spacing={0}>
                  <Text fontSize="xl" fontWeight="700" color="mckinsey.primary.500" lineHeight="1.2">
                    Lucidra
                  </Text>
                  <Text fontSize="xs" color="mckinsey.gray.500" lineHeight="1">
                    Strategic Intelligence Platform
                  </Text>
                </VStack>
              </HStack>
              
              {/* Navigation Tabs */}
              <HStack spacing={0} ml={8}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(item.id)}
                    color={currentView === item.id ? 'mckinsey.primary.500' : 'mckinsey.gray.600'}
                    bg={currentView === item.id ? 'mckinsey.primary.50' : 'transparent'}
                    borderBottom={currentView === item.id ? '2px solid' : 'none'}
                    borderColor="mckinsey.primary.500"
                    borderRadius="0"
                    px={4}
                    py={6}
                    h="72px"
                    _hover={{
                      bg: 'mckinsey.primary.50',
                      color: 'mckinsey.primary.500',
                    }}
                    fontSize="sm"
                    fontWeight="600"
                  >
                    {item.label}
                  </Button>
                ))}
              </HStack>
            </HStack>

            {/* Right Section */}
            <HStack spacing={4}>
              {/* Search */}
              <IconButton
                icon={<FiSearch />}
                variant="ghost"
                aria-label="Search"
                color="mckinsey.gray.600"
                _hover={{ color: 'mckinsey.primary.500', bg: 'mckinsey.primary.50' }}
              />
              
              {/* Notifications */}
              <Box position="relative">
                <IconButton
                  icon={<FiBell />}
                  variant="ghost"
                  aria-label="Notifications"
                  color="mckinsey.gray.600"
                  _hover={{ color: 'mckinsey.primary.500', bg: 'mckinsey.primary.50' }}
                />
                <Box
                  position="absolute"
                  top="8px"
                  right="8px"
                  w="8px"
                  h="8px"
                  bg="mckinsey.orange"
                  borderRadius="full"
                />
              </Box>

              <Divider orientation="vertical" h="32px" />

              {/* User Profile */}
              <Menu>
                <MenuButton as={Button} variant="ghost" p={1}>
                  <HStack spacing={3}>
                    <Avatar size="sm" name={userProfile.name} bg="mckinsey.primary.500" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="600" color="mckinsey.gray.700">
                        {userProfile.name}
                      </Text>
                      <Text fontSize="xs" color="mckinsey.gray.500">
                        {userProfile.role}
                      </Text>
                    </VStack>
                    <FiChevronDown />
                  </HStack>
                </MenuButton>
                <MenuList borderColor="mckinsey.gray.200" boxShadow="0 8px 32px rgba(0, 0, 0, 0.12)">
                  <MenuItem>Profile Settings</MenuItem>
                  <MenuItem>Team Management</MenuItem>
                  <MenuItem>Preferences</MenuItem>
                  <Divider />
                  <MenuItem color="mckinsey.red">Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxW="full" px={0}>
        <Box minH="calc(100vh - 72px)">
          {children}
        </Box>
      </Container>

      {/* Status Bar */}
      <Box
        bg={headerBg}
        borderTop="1px"
        borderColor={borderColor}
        px={6}
        py={2}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex={999}
      >
        <HStack justify="space-between" fontSize="xs" color="mckinsey.gray.500">
          <HStack spacing={6}>
            <Text>© 2024 Lucidra Strategic Intelligence</Text>
            <HStack spacing={4}>
              <Text cursor="pointer" _hover={{ color: 'mckinsey.primary.500' }}>Privacy</Text>
              <Text cursor="pointer" _hover={{ color: 'mckinsey.primary.500' }}>Terms</Text>
              <Text cursor="pointer" _hover={{ color: 'mckinsey.primary.500' }}>Support</Text>
            </HStack>
          </HStack>
          <HStack spacing={4}>
            <Badge variant="mckinseyTeal" size="sm">System Healthy</Badge>
            <Text>Last updated: {new Date().toLocaleTimeString()}</Text>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default McKinseyLayout;