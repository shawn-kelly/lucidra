import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  AvatarBadge,
  useColorModeValue,
  Icon,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { FaRocket, FaTrophy, FaCog, FaPlus, FaUsers, FaBrain } from 'react-icons/fa';
import { WorkflowBuilder } from './WorkflowBuilder';
import { useSandbox } from '../../hooks/useSandbox';

interface SandboxDashboardProps {
  onNavigateToBuilder: () => void;
}

export function SandboxDashboard({ onNavigateToBuilder }: SandboxDashboardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const {
    dashboard,
    loading,
    error,
    createMissionFromTemplate,
    refreshDashboard
  } = useSandbox();

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    refreshDashboard();
  }, []);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    onOpen();
  };

  const handleCreateFromTemplate = async () => {
    if (selectedTemplate) {
      await createMissionFromTemplate(selectedTemplate.id);
      onClose();
      refreshDashboard();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'yellow';
      case 'advanced': return 'orange';
      case 'expert': return 'red';
      default: return 'gray';
    }
  };

  const getXPToNextLevel = (currentXP: number, level: number) => {
    const nextLevelXP = level * 100;
    return Math.max(0, nextLevelXP - currentXP);
  };

  if (loading) {
    return (
      <Box p={8}>
        <Text>Loading sandbox dashboard...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Text color="red.500">Error loading dashboard: {error}</Text>
      </Box>
    );
  }

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      {/* Header */}
      <VStack spacing={6} align="stretch" mb={8}>
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg" color="teal.500">
              🧩 AI Orchestration Sandbox
            </Heading>
            <Text color="gray.600">
              Build, refine, and master multi-agent workflows
            </Text>
          </VStack>
          <Button
            colorScheme="teal"
            leftIcon={<FaPlus />}
            onClick={onNavigateToBuilder}
            size="lg"
          >
            Create New Mission
          </Button>
        </Flex>

        {/* Progress Stats */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Total XP</StatLabel>
                <StatNumber color="teal.500">{dashboard?.progress?.totalXP || 0}</StatNumber>
                <StatHelpText>
                  Level {dashboard?.progress?.level || 1} • {getXPToNextLevel(dashboard?.progress?.totalXP || 0, dashboard?.progress?.level || 1)} XP to next level
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Badges Earned</StatLabel>
                <StatNumber color="purple.500">{dashboard?.progress?.badges?.length || 0}</StatNumber>
                <StatHelpText>
                  {dashboard?.availableBadges?.length || 0} available
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Missions Completed</StatLabel>
                <StatNumber color="green.500">{dashboard?.progress?.completedMissions?.length || 0}</StatNumber>
                <StatHelpText>
                  {dashboard?.progress?.activeWorkflows?.length || 0} active
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Daily Streak</StatLabel>
                <StatNumber color="orange.500">{dashboard?.progress?.streaks?.dailyPrompting || 0}</StatNumber>
                <StatHelpText>
                  Keep it up! 🔥
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        {/* Main Content */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            {/* Active Missions */}
            <Card bg={cardBg} borderColor={borderColor}>
              <CardHeader>
                <HStack justify="space-between">
                  <Heading size="md">Active Missions</Heading>
                  <Badge colorScheme="blue" variant="subtle">
                    {dashboard?.missions?.filter(m => m.completionStatus === 'in_progress').length || 0} active
                  </Badge>
                </HStack>
              </CardHeader>
              <CardBody>
                {dashboard?.missions?.filter(m => m.completionStatus === 'in_progress').length === 0 ? (
                  <Text color="gray.500" textAlign="center" py={4}>
                    No active missions. Start your first workflow below!
                  </Text>
                ) : (
                  <VStack spacing={4} align="stretch">
                    {dashboard?.missions?.filter(m => m.completionStatus === 'in_progress').map((mission: any) => (
                      <Box
                        key={mission.id}
                        p={4}
                        bg={bgColor}
                        borderRadius="md"
                        border="1px"
                        borderColor={borderColor}
                      >
                        <HStack justify="space-between" mb={2}>
                          <Text fontWeight="bold">{mission.title}</Text>
                          <Badge colorScheme={getDifficultyColor(mission.difficulty)}>
                            {mission.difficulty}
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.600" mb={3}>
                          {mission.description}
                        </Text>
                        <HStack justify="space-between">
                          <Text fontSize="sm" color="gray.500">
                            {mission.subtasks?.filter((s: any) => s.status === 'completed').length || 0} / {mission.subtasks?.length || 0} subtasks
                          </Text>
                          <Text fontSize="sm" color="teal.500" fontWeight="bold">
                            {mission.totalXP} XP
                          </Text>
                        </HStack>
                        <Progress
                          value={((mission.subtasks?.filter((s: any) => s.status === 'completed').length || 0) / (mission.subtasks?.length || 1)) * 100}
                          colorScheme="teal"
                          size="sm"
                          mt={2}
                        />
                      </Box>
                    ))}
                  </VStack>
                )}
              </CardBody>
            </Card>

            {/* Mission Templates */}
            <Card bg={cardBg} borderColor={borderColor}>
              <CardHeader>
                <Heading size="md">Mission Templates</Heading>
                <Text fontSize="sm" color="gray.600">
                  Pre-built workflows to get you started
                </Text>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {[
                    {
                      id: 'code_review_cycle',
                      name: 'Code Review Orchestration',
                      description: 'Multi-agent code review covering security, performance, and maintainability',
                      difficulty: 'intermediate',
                      estimatedTime: '45 minutes',
                      xpReward: 150,
                      category: 'code_review'
                    },
                    {
                      id: 'ux_copy_refinement',
                      name: 'UX Copy Refinement',
                      description: 'Perfect interface copy through strategic AI collaboration',
                      difficulty: 'beginner',
                      estimatedTime: '30 minutes',
                      xpReward: 100,
                      category: 'ux_copy'
                    },
                    {
                      id: 'architecture_planning',
                      name: 'System Architecture Planning',
                      description: 'Comprehensive system design through multi-agent analysis',
                      difficulty: 'advanced',
                      estimatedTime: '90 minutes',
                      xpReward: 250,
                      category: 'architecture'
                    },
                    {
                      id: 'brand_strategy_formation',
                      name: 'Brand Strategy Formation',
                      description: 'Multi-perspective brand strategy development',
                      difficulty: 'intermediate',
                      estimatedTime: '60 minutes',
                      xpReward: 180,
                      category: 'brand_strategy'
                    }
                  ].map((template) => (
                    <Box
                      key={template.id}
                      p={4}
                      bg={bgColor}
                      borderRadius="md"
                      border="1px"
                      borderColor={borderColor}
                      cursor="pointer"
                      _hover={{ borderColor: 'teal.300', bg: 'teal.50' }}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <VStack align="stretch" spacing={2}>
                        <HStack justify="space-between">
                          <Text fontWeight="bold" fontSize="sm">
                            {template.name}
                          </Text>
                          <Badge colorScheme={getDifficultyColor(template.difficulty)} size="sm">
                            {template.difficulty}
                          </Badge>
                        </HStack>
                        <Text fontSize="xs" color="gray.600">
                          {template.description}
                        </Text>
                        <HStack justify="space-between" fontSize="xs">
                          <Text color="gray.500">⏱️ {template.estimatedTime}</Text>
                          <Text color="teal.500" fontWeight="bold">
                            +{template.xpReward} XP
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>

        {/* Sidebar */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            {/* AI Advisors */}
            <Card bg={cardBg} borderColor={borderColor}>
              <CardHeader>
                <Heading size="md">AI Advisors</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={3} align="stretch">
                  {dashboard?.advisors?.map((advisor: any) => (
                    <HStack key={advisor.id} spacing={3}>
                      <Avatar size="sm" bg={advisor.color} color="white">
                        {advisor.icon}
                      </Avatar>
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontSize="sm" fontWeight="bold">
                          {advisor.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {advisor.description}
                        </Text>
                      </VStack>
                      <Badge
                        colorScheme={advisor.availability === 'free' ? 'green' : advisor.availability === 'paid' ? 'blue' : 'orange'}
                        size="sm"
                      >
                        {advisor.availability}
                      </Badge>
                    </HStack>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            {/* Recent Badges */}
            <Card bg={cardBg} borderColor={borderColor}>
              <CardHeader>
                <Heading size="md">Recent Badges</Heading>
              </CardHeader>
              <CardBody>
                {dashboard?.progress?.badges?.length === 0 ? (
                  <Text color="gray.500" fontSize="sm" textAlign="center">
                    Complete missions to earn badges!
                  </Text>
                ) : (
                  <VStack spacing={3} align="stretch">
                    {dashboard?.progress?.badges?.slice(0, 3).map((badge: any) => (
                      <HStack key={badge.id} spacing={3}>
                        <Box fontSize="2xl">{badge.icon}</Box>
                        <VStack align="start" spacing={0} flex={1}>
                          <Text fontSize="sm" fontWeight="bold">
                            {badge.name}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {badge.description}
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                )}
              </CardBody>
            </Card>
          </VStack>
        </GridItem>
      </Grid>

      {/* Template Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack align="start" spacing={1}>
              <Text>{selectedTemplate?.name}</Text>
              <Badge colorScheme={getDifficultyColor(selectedTemplate?.difficulty)}>
                {selectedTemplate?.difficulty}
              </Badge>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Text>{selectedTemplate?.description}</Text>
              
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={1}>Estimated Time</Text>
                  <Text fontSize="sm" color="gray.600">⏱️ {selectedTemplate?.estimatedTime}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={1}>XP Reward</Text>
                  <Text fontSize="sm" color="teal.500">+{selectedTemplate?.xpReward} XP</Text>
                </Box>
              </SimpleGrid>

              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>Learning Objectives</Text>
                <VStack align="stretch" spacing={1}>
                  {selectedTemplate?.learningObjectives?.map((objective: string, index: number) => (
                    <Text key={index} fontSize="sm" color="gray.600">
                      • {objective}
                    </Text>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleCreateFromTemplate}>
              Start Mission
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}