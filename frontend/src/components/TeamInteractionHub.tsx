import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Avatar,
  AvatarGroup,
  Badge,
  Grid,
  GridItem,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Divider,
  Tooltip,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Flex,
  keyframes
} from '@chakra-ui/react';
import {
  ChatIcon,
  ViewIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  location: 'office' | 'remote' | 'hybrid';
  expertise: string[];
  currentProject: string;
  timezone: string;
}

interface TeamScenario {
  id: string;
  title: string;
  description: string;
  environment: 'office' | 'remote' | 'hybrid' | 'conference';
  backgroundImage: string;
  participants: TeamMember[];
  activity: string;
  duration: string;
  tools: string[];
}

const TeamInteractionHub: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { isOpen: isMemberModalOpen, onOpen: onMemberModalOpen, onClose: onMemberModalClose } = useDisclosure();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Realistic team scenarios with diverse professionals
  const teamScenarios: TeamScenario[] = [
    {
      id: 'strategy-session',
      title: 'Strategic Planning Session',
      description: 'Cross-functional team collaborating on Q4 strategic initiatives using Lucidra frameworks',
      environment: 'hybrid',
      backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      activity: 'Blue Ocean Strategy Workshop',
      duration: '90 minutes',
      tools: ['Business Model Canvas', 'SWOT Analysis', 'Porter\'s Five Forces'],
      participants: [
        {
          id: 'sarah-chen',
          name: 'Sarah Chen',
          role: 'Strategic Planning Manager',
          department: 'Strategy',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b66639f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          status: 'online',
          location: 'office',
          expertise: ['Strategic Planning', 'Market Analysis', 'Blue Ocean Strategy'],
          currentProject: 'Q4 Market Expansion',
          timezone: 'EST'
        },
        {
          id: 'marcus-johnson',
          name: 'Marcus Johnson',
          role: 'Senior Business Analyst',
          department: 'Analytics',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          status: 'online',
          location: 'remote',
          expertise: ['Data Analysis', 'Financial Modeling', 'KPI Development'],
          currentProject: 'Revenue Optimization',
          timezone: 'PST'
        },
        {
          id: 'elena-rodriguez',
          name: 'Elena Rodriguez',
          role: 'Operations Director',
          department: 'Operations',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80',
          status: 'busy',
          location: 'office',
          expertise: ['Process Optimization', 'Change Management', 'Lean Operations'],
          currentProject: 'Process Automation Initiative',
          timezone: 'EST'
        },
        {
          id: 'david-kim',
          name: 'David Kim',
          role: 'Product Manager',
          department: 'Product',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          status: 'online',
          location: 'hybrid',
          expertise: ['Product Strategy', 'User Experience', 'Agile Development'],
          currentProject: 'Feature Roadmap Planning',
          timezone: 'CST'
        }
      ]
    },
    {
      id: 'financial-review',
      title: 'Financial Analysis Review',
      description: 'Finance team analyzing quarterly performance using integrated financial data',
      environment: 'office',
      backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      activity: 'DuPont Analysis & Budget Review',
      duration: '60 minutes',
      tools: ['Financial Integration', 'ABC Costing', 'Variance Analysis'],
      participants: [
        {
          id: 'jennifer-white',
          name: 'Jennifer White',
          role: 'CFO',
          department: 'Finance',
          avatar: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80',
          status: 'online',
          location: 'office',
          expertise: ['Financial Strategy', 'Investment Analysis', 'Risk Management'],
          currentProject: 'Annual Budget Planning',
          timezone: 'EST'
        },
        {
          id: 'ahmed-hassan',
          name: 'Ahmed Hassan',
          role: 'Financial Analyst',
          department: 'Finance',
          avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
          status: 'online',
          location: 'office',
          expertise: ['Financial Modeling', 'Forecasting', 'Reporting'],
          currentProject: 'Cash Flow Optimization',
          timezone: 'EST'
        },
        {
          id: 'lisa-anderson',
          name: 'Lisa Anderson',
          role: 'Controller',
          department: 'Accounting',
          avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1083&q=80',
          status: 'away',
          location: 'remote',
          expertise: ['Cost Accounting', 'Compliance', 'Systems Integration'],
          currentProject: 'QuickBooks Integration',
          timezone: 'MST'
        }
      ]
    },
    {
      id: 'process-improvement',
      title: 'Process Improvement Workshop',
      description: 'Operations team identifying bottlenecks and implementing AI-assisted process logging',
      environment: 'remote',
      backgroundImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      activity: 'Lean Process Analysis',
      duration: '120 minutes',
      tools: ['AI Process Logger', 'BPMN Designer', 'Value Stream Mapping'],
      participants: [
        {
          id: 'robert-taylor',
          name: 'Robert Taylor',
          role: 'Process Excellence Lead',
          department: 'Operations',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
          status: 'online',
          location: 'remote',
          expertise: ['Lean Six Sigma', 'Process Mapping', 'Continuous Improvement'],
          currentProject: 'Digital Transformation',
          timezone: 'PST'
        },
        {
          id: 'maria-gonzalez',
          name: 'Maria Gonzalez',
          role: 'Quality Assurance Manager',
          department: 'Quality',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
          status: 'online',
          location: 'remote',
          expertise: ['Quality Systems', 'Audit Management', 'Training'],
          currentProject: 'ISO 9001 Certification',
          timezone: 'EST'
        },
        {
          id: 'james-murphy',
          name: 'James Murphy',
          role: 'IT Systems Analyst',
          department: 'IT',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          status: 'busy',
          location: 'hybrid',
          expertise: ['System Integration', 'Data Architecture', 'Automation'],
          currentProject: 'ERP Integration',
          timezone: 'CST'
        }
      ]
    },
    {
      id: 'sector-analysis',
      title: 'Industry Value Chain Analysis',
      description: 'Consulting team customizing sector-specific value chain models for client engagement',
      environment: 'conference',
      backgroundImage: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      activity: 'Banking Sector Value Chain Customization',
      duration: '45 minutes',
      tools: ['Sector Value Chains', 'Competitive Analysis', 'Regulatory Framework'],
      participants: [
        {
          id: 'alexandra-brown',
          name: 'Alexandra Brown',
          role: 'Senior Consultant',
          department: 'Consulting',
          avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          status: 'online',
          location: 'office',
          expertise: ['Industry Analysis', 'Strategic Consulting', 'Client Relations'],
          currentProject: 'Banking Sector Study',
          timezone: 'EST'
        },
        {
          id: 'thomas-lee',
          name: 'Thomas Lee',
          role: 'Research Analyst',
          department: 'Research',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          status: 'online',
          location: 'office',
          expertise: ['Market Research', 'Competitive Intelligence', 'Data Visualization'],
          currentProject: 'Fintech Disruption Analysis',
          timezone: 'EST'
        }
      ]
    }
  ];

  // Auto-rotate scenarios every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScenarioIndex((prev) => (prev + 1) % teamScenarios.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [teamScenarios.length]);

  const currentScenario = teamScenarios[currentScenarioIndex];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green';
      case 'busy': return 'red';
      case 'away': return 'yellow';
      case 'offline': return 'gray';
      default: return 'gray';
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'office': return '🏢';
      case 'remote': return '🏠';
      case 'hybrid': return '🔄';
      default: return '📍';
    }
  };

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    onMemberModalOpen();
  };

  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  return (
    <Box w="full">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              👥 Live Team Collaboration
            </Text>
            <Text color="gray.600" fontSize="sm">
              Real professionals using Lucidra in diverse work environments
            </Text>
          </VStack>
          <HStack>
            <IconButton
              aria-label="Previous scenario"
              icon={<ChevronLeftIcon />}
              variant="outline"
              size="sm"
              onClick={() => setCurrentScenarioIndex((prev) => (prev - 1 + teamScenarios.length) % teamScenarios.length)}
            />
            <IconButton
              aria-label="Next scenario"
              icon={<ChevronRightIcon />}
              variant="outline"
              size="sm"
              onClick={() => setCurrentScenarioIndex((prev) => (prev + 1) % teamScenarios.length)}
            />
          </HStack>
        </HStack>

        {/* Main Scenario Display */}
        <Card 
          bg={cardBg} 
          borderWidth="2px" 
          borderColor={borderColor}
          overflow="hidden"
          position="relative"
          minH="400px"
          animation={`${fadeIn} 0.5s ease-out`}
        >
          {/* Background Gradient */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            background={currentScenario.backgroundImage}
            opacity={0.1}
            zIndex={0}
          />
          
          <CardBody p={8} position="relative" zIndex={1}>
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8} h="full">
              {/* Scenario Info */}
              <VStack align="start" spacing={6} justify="center">
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Badge colorScheme="teal" variant="solid" fontSize="sm" px={3} py={1}>
                      {currentScenario.environment.toUpperCase()}
                    </Badge>
                    <Badge colorScheme="blue" variant="outline" fontSize="sm">
                      LIVE SESSION
                    </Badge>
                  </HStack>
                  
                  <Text fontSize="3xl" fontWeight="bold" lineHeight="short">
                    {currentScenario.title}
                  </Text>
                  
                  <Text fontSize="lg" color="gray.600" lineHeight="tall">
                    {currentScenario.description}
                  </Text>
                </VStack>

                {/* Session Details */}
                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <TimeIcon color="teal.500" />
                      <Text fontSize="sm" fontWeight="semibold">Duration</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">{currentScenario.duration}</Text>
                  </VStack>
                  
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <ViewIcon color="teal.500" />
                      <Text fontSize="sm" fontWeight="semibold">Activity</Text>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">{currentScenario.activity}</Text>
                  </VStack>
                </Grid>

                {/* Tools Used */}
                <VStack align="start" spacing={3} w="full">
                  <Text fontSize="sm" fontWeight="semibold">Lucidra Tools in Use:</Text>
                  <HStack wrap="wrap" spacing={2}>
                    {currentScenario.tools.map((tool, index) => (
                      <Badge key={index} colorScheme="purple" variant="subtle">
                        {tool}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>
              </VStack>

              {/* Team Members */}
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">Team Members</Text>
                  <Badge colorScheme="green" variant="subtle">
                    {currentScenario.participants.filter(p => p.status === 'online').length} Active
                  </Badge>
                </HStack>

                <VStack spacing={3} align="stretch">
                  {currentScenario.participants.map((member) => (
                    <Card 
                      key={member.id}
                      variant="outline"
                      cursor="pointer"
                      onClick={() => handleMemberClick(member)}
                      _hover={{ shadow: 'md', borderColor: 'teal.300' }}
                      transition="all 0.2s"
                      size="sm"
                    >
                      <CardBody p={4}>
                        <HStack spacing={3}>
                          <Box position="relative">
                            <Avatar size="md" src={member.avatar} name={member.name} />
                            <Box
                              position="absolute"
                              bottom={0}
                              right={0}
                              w={3}
                              h={3}
                              borderRadius="full"
                              bg={`${getStatusColor(member.status)}.500`}
                              border="2px solid white"
                            />
                          </Box>
                          
                          <VStack align="start" spacing={1} flex="1">
                            <HStack justify="space-between" w="full">
                              <Text fontSize="sm" fontWeight="semibold">
                                {member.name}
                              </Text>
                              <Text fontSize="xs">
                                {getLocationIcon(member.location)}
                              </Text>
                            </HStack>
                            <Text fontSize="xs" color="gray.600">
                              {member.role}
                            </Text>
                            <Text fontSize="xs" color="teal.600">
                              {member.currentProject}
                            </Text>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>

                {/* Team Summary */}
                <Card variant="filled" bg="teal.50">
                  <CardBody p={4}>
                    <VStack spacing={3}>
                      <AvatarGroup size="sm" max={4}>
                        {currentScenario.participants.map((member) => (
                          <Avatar key={member.id} src={member.avatar} name={member.name} />
                        ))}
                      </AvatarGroup>
                      <Text fontSize="xs" textAlign="center" color="teal.700">
                        Collaborative session in progress using Lucidra's integrated platform
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </Grid>
          </CardBody>
        </Card>

        {/* Scenario Navigation */}
        <HStack justify="center" spacing={2}>
          {teamScenarios.map((_, index) => (
            <Box
              key={index}
              w={3}
              h={3}
              borderRadius="full"
              bg={index === currentScenarioIndex ? 'teal.500' : 'gray.300'}
              cursor="pointer"
              onClick={() => setCurrentScenarioIndex(index)}
              transition="all 0.3s"
            />
          ))}
        </HStack>
      </VStack>

      {/* Member Detail Modal */}
      <Modal isOpen={isMemberModalOpen} onClose={onMemberModalClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Avatar size="md" src={selectedMember?.avatar} name={selectedMember?.name} />
              <VStack align="start" spacing={0}>
                <Text>{selectedMember?.name}</Text>
                <Text fontSize="sm" color="gray.600">{selectedMember?.role}</Text>
              </VStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedMember && (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <VStack align="start">
                    <Text fontSize="sm" fontWeight="semibold">Department</Text>
                    <Text fontSize="sm">{selectedMember.department}</Text>
                  </VStack>
                  <VStack align="start">
                    <Text fontSize="sm" fontWeight="semibold">Location</Text>
                    <HStack>
                      <Text fontSize="sm">{getLocationIcon(selectedMember.location)}</Text>
                      <Text fontSize="sm">{selectedMember.location}</Text>
                    </HStack>
                  </VStack>
                  <VStack align="start">
                    <Text fontSize="sm" fontWeight="semibold">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedMember.status)} variant="solid">
                      {selectedMember.status}
                    </Badge>
                  </VStack>
                  <VStack align="start">
                    <Text fontSize="sm" fontWeight="semibold">Timezone</Text>
                    <Text fontSize="sm">{selectedMember.timezone}</Text>
                  </VStack>
                </Grid>
                
                <Divider />
                
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Current Project</Text>
                  <Text fontSize="sm" color="teal.600">{selectedMember.currentProject}</Text>
                </VStack>
                
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Expertise</Text>
                  <HStack wrap="wrap" spacing={2}>
                    {selectedMember.expertise.map((skill, index) => (
                      <Badge key={index} colorScheme="blue" variant="subtle">
                        {skill}
                      </Badge>
                    ))}
                  </HStack>
                </VStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TeamInteractionHub;