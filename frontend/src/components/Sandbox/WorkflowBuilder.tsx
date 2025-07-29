import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Badge,
  Avatar,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  useColorModeValue,
  Alert,
  AlertIcon,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Spacer,
  useToast
} from '@chakra-ui/react';
import { FaPlus, FaTrash, FaDragHandle, FaPlay, FaEdit, FaCheck } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSandbox } from '../../hooks/useSandbox';

interface WorkflowBuilderProps {
  onNavigateBack: () => void;
}

export function WorkflowBuilder({ onNavigateBack }: WorkflowBuilderProps) {
  const toast = useToast();
  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [missionChallenge, setMissionChallenge] = useState('');
  const [subtasks, setSubtasks] = useState<any[]>([]);
  const [currentMission, setCurrentMission] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);

  const {
    dashboard,
    createMission,
    addSubtask,
    assignAdvisor,
    addIteration,
    loading,
    error
  } = useSandbox();

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleCreateMission = async () => {
    if (!missionTitle || !missionDescription || !missionChallenge) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all mission details',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const mission = await createMission(missionTitle, missionDescription, missionChallenge);
      setCurrentMission(mission);
      setActiveTab(1);
      toast({
        title: 'Mission Created!',
        description: 'Now add subtasks to break down your challenge',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create mission',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddSubtask = () => {
    const newSubtask = {
      id: Date.now().toString(),
      title: '',
      description: '',
      assignedAdvisor: '',
      promptTemplate: '',
      constraints: [],
      expectedFormat: '',
      status: 'pending',
      isEditing: true
    };
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleSaveSubtask = async (subtaskId: string) => {
    const subtask = subtasks.find(s => s.id === subtaskId);
    if (!subtask || !subtask.title || !subtask.description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in subtask title and description',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (currentMission) {
      try {
        await addSubtask(currentMission.id, subtask);
        setSubtasks(subtasks.map(s => 
          s.id === subtaskId ? { ...s, isEditing: false } : s
        ));
        toast({
          title: 'Subtask Added!',
          description: 'Subtask has been saved to your mission',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to save subtask',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleUpdateSubtask = (subtaskId: string, field: string, value: any) => {
    setSubtasks(subtasks.map(s => 
      s.id === subtaskId ? { ...s, [field]: value } : s
    ));
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter(s => s.id !== subtaskId));
  };

  const handleAssignAdvisor = async (subtaskId: string, advisorId: string) => {
    if (currentMission) {
      try {
        await assignAdvisor(currentMission.id, subtaskId, advisorId);
        handleUpdateSubtask(subtaskId, 'assignedAdvisor', advisorId);
        toast({
          title: 'Advisor Assigned!',
          description: 'AI advisor has been assigned to this subtask',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to assign advisor',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(subtasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSubtasks(items);
  };

  const getAdvisorById = (advisorId: string) => {
    return dashboard?.advisors?.find((a: any) => a.id === advisorId);
  };

  const renderSubtaskCard = (subtask: any, index: number) => {
    const advisor = getAdvisorById(subtask.assignedAdvisor);
    
    return (
      <Card key={subtask.id} bg={cardBg} borderColor={borderColor} mb={4}>
        <CardHeader pb={2}>
          <HStack justify="space-between">
            <HStack>
              <IconButton
                icon={<FaDragHandle />}
                size="sm"
                variant="ghost"
                aria-label="Drag handle"
                cursor="grab"
                color="gray.400"
              />
              <Text fontWeight="bold" fontSize="sm">
                Subtask {index + 1}
              </Text>
            </HStack>
            <HStack>
              {!subtask.isEditing && (
                <IconButton
                  icon={<FaEdit />}
                  size="sm"
                  variant="ghost"
                  aria-label="Edit subtask"
                  onClick={() => handleUpdateSubtask(subtask.id, 'isEditing', true)}
                />
              )}
              <IconButton
                icon={<FaTrash />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                aria-label="Delete subtask"
                onClick={() => handleDeleteSubtask(subtask.id)}
              />
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody pt={0}>
          <VStack spacing={4} align="stretch">
            {subtask.isEditing ? (
              <>
                <FormControl>
                  <FormLabel fontSize="sm">Title</FormLabel>
                  <Input
                    value={subtask.title}
                    onChange={(e) => handleUpdateSubtask(subtask.id, 'title', e.target.value)}
                    placeholder="e.g., Security Analysis"
                    size="sm"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Description</FormLabel>
                  <Textarea
                    value={subtask.description}
                    onChange={(e) => handleUpdateSubtask(subtask.id, 'description', e.target.value)}
                    placeholder="Describe what this subtask should accomplish..."
                    size="sm"
                    rows={3}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Prompt Template</FormLabel>
                  <Textarea
                    value={subtask.promptTemplate}
                    onChange={(e) => handleUpdateSubtask(subtask.id, 'promptTemplate', e.target.value)}
                    placeholder="Template for the AI prompt. Use [PLACEHOLDERS] for dynamic content."
                    size="sm"
                    rows={2}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Expected Format</FormLabel>
                  <Input
                    value={subtask.expectedFormat}
                    onChange={(e) => handleUpdateSubtask(subtask.id, 'expectedFormat', e.target.value)}
                    placeholder="e.g., Structured list, JSON, Report format..."
                    size="sm"
                  />
                </FormControl>
                <HStack>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    leftIcon={<FaCheck />}
                    onClick={() => handleSaveSubtask(subtask.id)}
                    isLoading={loading}
                  >
                    Save Subtask
                  </Button>
                </HStack>
              </>
            ) : (
              <>
                <Box>
                  <Text fontWeight="bold" fontSize="md">{subtask.title}</Text>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    {subtask.description}
                  </Text>
                </Box>
                
                {subtask.promptTemplate && (
                  <Box p={3} bg={bgColor} borderRadius="md" fontSize="sm">
                    <Text fontWeight="bold" mb={1}>Prompt Template:</Text>
                    <Text color="gray.600">{subtask.promptTemplate}</Text>
                  </Box>
                )}

                <HStack justify="space-between">
                  <FormControl maxW="200px">
                    <FormLabel fontSize="xs">Assign AI Advisor</FormLabel>
                    <Select
                      value={subtask.assignedAdvisor}
                      onChange={(e) => handleAssignAdvisor(subtask.id, e.target.value)}
                      size="sm"
                      placeholder="Select advisor..."
                    >
                      {dashboard?.advisors?.map((advisor: any) => (
                        <option key={advisor.id} value={advisor.id}>
                          {advisor.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {advisor && (
                    <HStack>
                      <Avatar size="sm" bg={advisor.color} color="white">
                        {advisor.icon}
                      </Avatar>
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="bold">
                          {advisor.name}
                        </Text>
                        <Badge size="sm" colorScheme={advisor.availability === 'free' ? 'green' : 'blue'}>
                          {advisor.availability}
                        </Badge>
                      </VStack>
                    </HStack>
                  )}
                </HStack>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
    );
  };

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex align="center">
          <Button variant="ghost" onClick={onNavigateBack} mr={4}>
            ← Back to Dashboard
          </Button>
          <Heading size="lg" color="teal.500">
            Mission Builder
          </Heading>
          <Spacer />
          {currentMission && (
            <Badge colorScheme="teal" p={2}>
              Mission: {currentMission.title}
            </Badge>
          )}
        </Flex>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Main Content */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>1. Mission Setup</Tab>
            <Tab isDisabled={!currentMission}>2. Subtask Builder</Tab>
            <Tab isDisabled={!currentMission}>3. Routing Interface</Tab>
          </TabList>

          <TabPanels>
            {/* Mission Setup */}
            <TabPanel>
              <Card bg={cardBg} borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Define Your Mission</Heading>
                  <Text fontSize="sm" color="gray.600">
                    Create a strategic challenge that will be broken down into AI-orchestrated subtasks
                  </Text>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>Mission Title</FormLabel>
                      <Input
                        value={missionTitle}
                        onChange={(e) => setMissionTitle(e.target.value)}
                        placeholder="e.g., Design a secure authentication system"
                      />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Mission Description</FormLabel>
                      <Textarea
                        value={missionDescription}
                        onChange={(e) => setMissionDescription(e.target.value)}
                        placeholder="Provide context about this mission and what success looks like..."
                        rows={4}
                      />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Strategic Challenge</FormLabel>
                      <Textarea
                        value={missionChallenge}
                        onChange={(e) => setMissionChallenge(e.target.value)}
                        placeholder="Describe the specific challenge or problem that needs to be solved..."
                        rows={3}
                      />
                      <FormHelperText>
                        This challenge will be broken down into subtasks for AI advisors to tackle
                      </FormHelperText>
                    </FormControl>
                    
                    <Button
                      colorScheme="teal"
                      onClick={handleCreateMission}
                      isLoading={loading}
                      loadingText="Creating Mission..."
                    >
                      Create Mission
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Subtask Builder */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Card bg={cardBg} borderColor={borderColor}>
                  <CardHeader>
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Heading size="md">Break Down Your Challenge</Heading>
                        <Text fontSize="sm" color="gray.600">
                          Create subtasks that different AI advisors can handle
                        </Text>
                      </VStack>
                      <Button
                        colorScheme="teal"
                        leftIcon={<FaPlus />}
                        onClick={handleAddSubtask}
                      >
                        Add Subtask
                      </Button>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    {subtasks.length === 0 ? (
                      <Text color="gray.500" textAlign="center" py={8}>
                        No subtasks yet. Click "Add Subtask" to start breaking down your challenge.
                      </Text>
                    ) : (
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="subtasks">
                          {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                              {subtasks.map((subtask, index) => (
                                <Draggable key={subtask.id} draggableId={subtask.id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {renderSubtaskCard(subtask, index)}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    )}
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>

            {/* Routing Interface */}
            <TabPanel>
              <Card bg={cardBg} borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Prompt Routing Interface</Heading>
                  <Text fontSize="sm" color="gray.600">
                    Execute your workflow and manage AI interactions
                  </Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    Routing interface will be implemented in the next iteration. 
                    This will allow you to execute prompts, manage responses, and track iterations.
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
}