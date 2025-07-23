import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Textarea,
  Avatar,
  Badge,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Alert,
  AlertIcon,
  IconButton,
  Flex,
  Spacer,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import { FaPlay, FaCopy, FaCheck, FaPlus, FaEdit, FaExternalLinkAlt, FaRocket } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface PromptRoutingInterfaceProps {
  mission: any;
  onUpdateMission: (mission: any) => void;
}

interface ExecutionZone {
  id: string;
  name: string;
  advisor: any;
  subtasks: any[];
  status: 'idle' | 'executing' | 'completed' | 'error';
}

export function PromptRoutingInterface({ mission, onUpdateMission }: PromptRoutingInterfaceProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [executionZones, setExecutionZones] = useState<ExecutionZone[]>([]);
  const [currentExecution, setCurrentExecution] = useState<any>(null);
  const [promptText, setPromptText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [userAnnotation, setUserAnnotation] = useState('');
  const [xpEarned, setXpEarned] = useState(0);

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const zoneBg = useColorModeValue('gray.100', 'gray.600');

  // Initialize execution zones from mission subtasks
  React.useEffect(() => {
    if (mission && mission.subtasks) {
      const zones: ExecutionZone[] = [];
      
      // Group subtasks by assigned advisor
      const advisorGroups = mission.subtasks.reduce((groups: any, subtask: any) => {
        if (subtask.assignedAdvisor) {
          if (!groups[subtask.assignedAdvisor]) {
            groups[subtask.assignedAdvisor] = [];
          }
          groups[subtask.assignedAdvisor].push(subtask);
        }
        return groups;
      }, {});

      // Create execution zones
      Object.entries(advisorGroups).forEach(([advisorId, subtasks]: [string, any]) => {
        // Find advisor info (this would come from the sandbox hook)
        const advisor = {
          id: advisorId,
          name: advisorId.charAt(0).toUpperCase() + advisorId.slice(1),
          icon: '🤖',
          color: '#1FE0C4'
        };

        zones.push({
          id: advisorId,
          name: `${advisor.name} Zone`,
          advisor,
          subtasks,
          status: 'idle'
        });
      });

      setExecutionZones(zones);
    }
  }, [mission]);

  const handleExecutePrompt = useCallback(async (zoneId: string, subtaskId: string, prompt: string) => {
    const zone = executionZones.find(z => z.id === zoneId);
    if (!zone) return;

    // Update zone status
    setExecutionZones(zones => zones.map(z => 
      z.id === zoneId ? { ...z, status: 'executing' } : z
    ));

    // Simulate AI response (in real implementation, this would call the actual AI service)
    const simulatedResponse = await simulateAIResponse(zone.advisor, prompt);
    
    // Update zone status
    setExecutionZones(zones => zones.map(z => 
      z.id === zoneId ? { ...z, status: 'completed' } : z
    ));

    // Open response modal
    setCurrentExecution({
      zone,
      subtaskId,
      prompt,
      response: simulatedResponse,
      timestamp: new Date()
    });
    setPromptText(prompt);
    setResponseText(simulatedResponse);
    setUserAnnotation('');
    onOpen();
  }, [executionZones, onOpen]);

  const simulateAIResponse = async (advisor: any, prompt: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate contextual response based on advisor type
    const responses = {
      claude: `Based on strategic analysis of your prompt: "${prompt.substring(0, 50)}...", I recommend a multi-faceted approach that considers both immediate tactical needs and long-term strategic implications. Key insights: [1] Risk assessment shows moderate complexity, [2] Opportunity identification reveals 3 primary pathways, [3] Resource allocation suggests prioritizing areas with highest ROI.`,
      
      gemini: `Visual analysis and creative perspective on: "${prompt.substring(0, 50)}..." reveals interesting patterns. Creative solutions include: [1] Innovative approach combining traditional methods with emerging technologies, [2] User-centric design that prioritizes experience and accessibility, [3] Scalable framework that adapts to changing requirements.`,
      
      copilot: `Technical implementation analysis for: "${prompt.substring(0, 50)}..." suggests the following code structure and best practices: [1] Modular architecture for maintainability, [2] Security-first design with proper authentication, [3] Performance optimization through caching and efficient algorithms.`,
      
      deepseek: `Deep technical analysis of: "${prompt.substring(0, 50)}..." reveals: [1] Algorithmic complexity can be optimized through advanced data structures, [2] System design benefits from microservices architecture, [3] Mathematical modeling shows 87% efficiency improvement potential.`,
      
      gpt4: `Comprehensive analysis of: "${prompt.substring(0, 50)}..." provides: [1] Contextual understanding of requirements and constraints, [2] Balanced approach considering multiple stakeholder perspectives, [3] Actionable recommendations with implementation roadmap.`
    };

    return responses[advisor.id as keyof typeof responses] || `Analysis complete for prompt: "${prompt.substring(0, 50)}...". Detailed insights and recommendations provided based on specialized expertise.`;
  };

  const handleSaveIteration = useCallback(async () => {
    if (!currentExecution) return;

    const xpGain = 10 + (userAnnotation.length > 20 ? 15 : 0);
    setXpEarned(xpGain);

    // Here you would call the actual API to save the iteration
    // await addIteration(mission.id, currentExecution.subtaskId, promptText, responseText, userAnnotation);

    toast({
      title: 'Iteration Saved!',
      description: `Earned ${xpGain} XP for this iteration`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    onClose();
  }, [currentExecution, promptText, responseText, userAnnotation, toast, onClose]);

  const handleCopyPrompt = useCallback((prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: 'Copied!',
      description: 'Prompt copied to clipboard',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [toast]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // Handle dragging subtasks between zones
    if (source.droppableId !== destination.droppableId) {
      const sourceZone = executionZones.find(z => z.id === source.droppableId);
      const destZone = executionZones.find(z => z.id === destination.droppableId);
      
      if (sourceZone && destZone) {
        const subtask = sourceZone.subtasks[source.index];
        
        setExecutionZones(zones => zones.map(zone => {
          if (zone.id === source.droppableId) {
            return {
              ...zone,
              subtasks: zone.subtasks.filter((_, index) => index !== source.index)
            };
          }
          if (zone.id === destination.droppableId) {
            const newSubtasks = [...zone.subtasks];
            newSubtasks.splice(destination.index, 0, subtask);
            return {
              ...zone,
              subtasks: newSubtasks
            };
          }
          return zone;
        }));
      }
    }
  };

  const renderExecutionZone = (zone: ExecutionZone) => (
    <Card key={zone.id} bg={cardBg} borderColor={borderColor} minH="300px">
      <CardHeader pb={2}>
        <HStack justify="space-between">
          <HStack>
            <Avatar size="sm" bg={zone.advisor.color} color="white">
              {zone.advisor.icon}
            </Avatar>
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" fontSize="md">
                {zone.name}
              </Text>
              <Badge
                colorScheme={
                  zone.status === 'idle' ? 'gray' :
                  zone.status === 'executing' ? 'yellow' :
                  zone.status === 'completed' ? 'green' : 'red'
                }
                size="sm"
              >
                {zone.status}
              </Badge>
            </VStack>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            {zone.subtasks.length} subtasks
          </Text>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <Droppable droppableId={zone.id}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              bg={snapshot.isDraggingOver ? 'teal.50' : zoneBg}
              minH="200px"
              p={3}
              borderRadius="md"
              border="2px dashed"
              borderColor={snapshot.isDraggingOver ? 'teal.300' : 'gray.300'}
            >
              <VStack spacing={2} align="stretch">
                {zone.subtasks.map((subtask, index) => (
                  <Draggable key={subtask.id} draggableId={subtask.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        bg={snapshot.isDragging ? 'white' : cardBg}
                        p={3}
                        borderRadius="md"
                        border="1px"
                        borderColor={snapshot.isDragging ? 'teal.300' : borderColor}
                        shadow={snapshot.isDragging ? 'lg' : 'sm'}
                        cursor="grab"
                        _active={{ cursor: 'grabbing' }}
                      >
                        <VStack spacing={2} align="stretch">
                          <Text fontSize="sm" fontWeight="bold">
                            {subtask.title}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {subtask.description}
                          </Text>
                          {subtask.promptTemplate && (
                            <Box p={2} bg={bgColor} borderRadius="sm" fontSize="xs">
                              <Text color="gray.600" noOfLines={2}>
                                {subtask.promptTemplate}
                              </Text>
                            </Box>
                          )}
                          <HStack justify="space-between">
                            <Button
                              size="xs"
                              colorScheme="teal"
                              leftIcon={<FaPlay />}
                              onClick={() => handleExecutePrompt(zone.id, subtask.id, subtask.promptTemplate || 'Default prompt')}
                              isLoading={zone.status === 'executing'}
                              loadingText="Executing..."
                            >
                              Execute
                            </Button>
                            <IconButton
                              size="xs"
                              icon={<FaCopy />}
                              aria-label="Copy prompt"
                              onClick={() => handleCopyPrompt(subtask.promptTemplate || 'Default prompt')}
                            />
                          </HStack>
                        </VStack>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                
                {zone.subtasks.length === 0 && (
                  <Text color="gray.500" textAlign="center" py={4} fontSize="sm">
                    Drop subtasks here to assign to {zone.advisor.name}
                  </Text>
                )}
              </VStack>
            </Box>
          )}
        </Droppable>
      </CardBody>
    </Card>
  );

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Card bg={cardBg} borderColor={borderColor}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Heading size="md">🎯 Prompt Routing Interface</Heading>
                <Text fontSize="sm" color="gray.600">
                  Drag subtasks to AI advisor zones and execute your workflow
                </Text>
              </VStack>
              <HStack>
                <Badge colorScheme="blue" p={2}>
                  {mission?.subtasks?.length || 0} subtasks
                </Badge>
                <Badge colorScheme="green" p={2}>
                  {executionZones.length} advisors
                </Badge>
              </HStack>
            </HStack>
          </CardHeader>
        </Card>

        {/* Execution Zones */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Box>
            <Heading size="sm" mb={4}>AI Advisor Zones</Heading>
            {executionZones.length === 0 ? (
              <Alert status="info">
                <AlertIcon />
                No execution zones available. Please assign AI advisors to your subtasks in the Workflow Builder.
              </Alert>
            ) : (
              <VStack spacing={4} align="stretch">
                {executionZones.map(zone => renderExecutionZone(zone))}
              </VStack>
            )}
          </Box>
        </DragDropContext>

        {/* Workflow Progress */}
        <Card bg={cardBg} borderColor={borderColor}>
          <CardHeader>
            <Heading size="sm">Workflow Progress</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm">Overall Completion</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {Math.round((executionZones.filter(z => z.status === 'completed').length / Math.max(1, executionZones.length)) * 100)}%
                </Text>
              </HStack>
              <Progress
                value={(executionZones.filter(z => z.status === 'completed').length / Math.max(1, executionZones.length)) * 100}
                colorScheme="teal"
                size="lg"
              />
              <HStack justify="space-between" fontSize="sm">
                <Text color="gray.600">
                  {executionZones.filter(z => z.status === 'completed').length} / {executionZones.length} zones completed
                </Text>
                <Text color="teal.500" fontWeight="bold">
                  {mission?.totalXP || 0} XP earned
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>

      {/* Response Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text>AI Response</Text>
              <Badge colorScheme="teal">
                {currentExecution?.zone.advisor.name}
              </Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel fontSize="sm">Prompt Used</FormLabel>
                <Textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  rows={3}
                  bg={bgColor}
                  isReadOnly
                />
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm">AI Response</FormLabel>
                <Textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={6}
                  bg={bgColor}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm">Your Annotation (Optional)</FormLabel>
                <Textarea
                  value={userAnnotation}
                  onChange={(e) => setUserAnnotation(e.target.value)}
                  placeholder="Note improvements, contradictions, or insights..."
                  rows={3}
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Adding thoughtful annotations earns bonus XP!
                </Text>
              </FormControl>
              
              <Alert status="info" fontSize="sm">
                <AlertIcon />
                This iteration will earn you {10 + (userAnnotation.length > 20 ? 15 : 0)} XP
              </Alert>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleSaveIteration}>
              Save Iteration & Earn XP
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}