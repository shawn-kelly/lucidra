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
  Grid,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Alert,
  AlertIcon,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import { AddIcon, ViewIcon, DownloadIcon } from '@chakra-ui/icons';

// Enhanced BPMN Designer Component with drag-and-drop functionality
export const EnhancedBPMNDesigner = ({ 
  selectedProcess, 
  setSelectedProcess, 
  processes, 
  setProcesses, 
  onSwimlaneOpen, 
  onStepDetailOpen, 
  onBPMNOpen, 
  onNewProcessOpen,
  handleExportProcess,
  setSelectedStep,
  cardBg 
}: any) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [canvasElements, setCanvasElements] = useState<any[]>(
    selectedProcess?.steps || []
  );
  
  const toast = useToast();

  useEffect(() => {
    if (selectedProcess) {
      setCanvasElements(selectedProcess.steps);
    }
  }, [selectedProcess]);

  const handleElementDragStart = (elementType: string) => {
    setDraggedElement(elementType);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedElement || !selectedProcess) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement = {
      id: `${draggedElement}-${Date.now()}`,
      name: `New ${draggedElement.charAt(0).toUpperCase() + draggedElement.slice(1)}`,
      description: `A new ${draggedElement} element`,
      type: draggedElement,
      swimlane: selectedProcess.swimlanes[0]?.id || '1',
      inputs: [],
      outputs: [],
      resources: [],
      duration: 1,
      cost: 50,
      dependencies: [],
      assignee: 'Unassigned',
      status: 'not_started',
      position: { x: Math.max(0, x - 50), y: Math.max(0, y - 30) },
      priority: 'medium',
      businessRules: [],
      compliance: [],
      kpis: [],
      risks: [],
      automationLevel: 0,
      qualityGates: [],
      dataRequirements: [],
      narrative: `This is a ${draggedElement} step that handles specific business logic and requirements. 
      
Key responsibilities:
• Process incoming data/requests
• Apply business rules and validation
• Generate appropriate outputs
• Monitor performance metrics
• Ensure compliance requirements

This step is designed to be efficient, scalable, and maintainable while providing clear audit trails for all operations.`
    };

    const updatedElements = [...canvasElements, newElement];
    setCanvasElements(updatedElements);
    
    // Update the process
    const updatedProcess = { ...selectedProcess, steps: updatedElements };
    setSelectedProcess(updatedProcess);
    setProcesses((prev: any) => prev.map((p: any) => p.id === selectedProcess.id ? updatedProcess : p));
    
    setDraggedElement(null);
    
    toast({
      title: 'Element Added Successfully',
      description: `${newElement.name} has been added to your process canvas`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleElementMove = (elementId: string, newX: number, newY: number) => {
    const updatedElements = canvasElements.map((element: any) => 
      element.id === elementId 
        ? { ...element, position: { x: newX, y: newY } }
        : element
    );
    setCanvasElements(updatedElements);
    
    if (selectedProcess) {
      const updatedProcess = { ...selectedProcess, steps: updatedElements };
      setSelectedProcess(updatedProcess);
      setProcesses((prev: any) => prev.map((p: any) => p.id === selectedProcess.id ? updatedProcess : p));
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="xl" fontWeight="bold">🎨 Interactive BPMN Designer</Text>
          <Text fontSize="sm" color="gray.500">Drag elements to canvas • Click elements to configure • Visual workflow builder</Text>
        </VStack>
        <HStack>
          <Button colorScheme="green" leftIcon={<AddIcon />} onClick={onSwimlaneOpen} size="sm">
            Add Swimlane
          </Button>
          <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onStepDetailOpen} size="sm">
            Add Step
          </Button>
          <Button colorScheme="purple" leftIcon={<ViewIcon />} onClick={onBPMNOpen} size="sm">
            Preview BPMN
          </Button>
        </HStack>
      </HStack>

      {/* Process Selection */}
      <Card bg={cardBg}>
        <CardBody>
          <HStack spacing={4}>
            <FormControl maxW="400px">
              <FormLabel fontSize="sm">Select Process to Design</FormLabel>
              <Select 
                placeholder="Choose a process to design"
                value={selectedProcess?.id || ''}
                onChange={(e) => {
                  const process = processes.find((p: any) => p.id === e.target.value);
                  setSelectedProcess(process || null);
                }}
              >
                {processes.map((process: any) => (
                  <option key={process.id} value={process.id}>{process.name} (v{process.version})</option>
                ))}
              </Select>
            </FormControl>
            <VStack align="start" spacing={1}>
              <Text fontSize="xs" color="gray.500">Quick Actions</Text>
              <HStack>
                <Button size="xs" colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProcessOpen}>
                  New Process
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </CardBody>
      </Card>

      {selectedProcess && (
        <Grid templateColumns="300px 1fr" gap={6}>
          <VStack spacing={4} align="stretch">
            <Card>
              <CardHeader pb={2}>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">🔧 BPMN Elements</Text>
                  <Text fontSize="xs" color="gray.500">Drag elements to canvas</Text>
                </VStack>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={2} spacing={2}>
                  {[
                    { type: 'start', icon: '🟢', name: 'Start Event', color: 'green.100', description: 'Process initiation point' },
                    { type: 'task', icon: '📋', name: 'Task', color: 'blue.100', description: 'Work activity' },
                    { type: 'decision', icon: '💎', name: 'Decision', color: 'yellow.100', description: 'Choice gateway' },
                    { type: 'subprocess', icon: '📦', name: 'Subprocess', color: 'purple.100', description: 'Sub-process' },
                    { type: 'gateway', icon: '⚡', name: 'Gateway', color: 'orange.100', description: 'Flow control' },
                    { type: 'end', icon: '🔴', name: 'End Event', color: 'red.100', description: 'Process termination' }
                  ].map((element) => (
                    <Card
                      key={element.type}
                      size="sm"
                      variant="outline"
                      cursor="grab"
                      draggable
                      onDragStart={() => handleElementDragStart(element.type)}
                      bg={element.color}
                      _hover={{ transform: 'scale(1.05)', shadow: 'md', borderColor: 'blue.400' }}
                      _active={{ cursor: 'grabbing' }}
                      borderWidth="2px"
                    >
                      <CardBody p={2} textAlign="center">
                        <VStack spacing={1}>
                          <Text fontSize="lg">{element.icon}</Text>
                          <Text fontSize="xs" fontWeight="bold">{element.name}</Text>
                          <Text fontSize="xs" color="gray.500" noOfLines={1}>{element.description}</Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
                
                <Alert status="info" mt={4} borderRadius="md">
                  <AlertIcon />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" fontWeight="semibold">Interactive Design</Text>
                    <Text fontSize="xs">
                      • Drag elements to canvas
                      • Click to configure properties  
                      • Visual flow connections
                    </Text>
                  </VStack>
                </Alert>
              </CardBody>
            </Card>

            <Card>
              <CardHeader pb={2}>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">👥 Swimlanes</Text>
                  <Text fontSize="xs" color="gray.500">{selectedProcess.swimlanes.length} configured roles</Text>
                </VStack>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={2}>
                  {selectedProcess.swimlanes.map((lane: any) => (
                    <Box
                      key={lane.id}
                      p={3}
                      border="2px solid"
                      borderColor="gray.200"
                      borderRadius="lg"
                      bg={lane.color}
                      color="white"
                      _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                      cursor="pointer"
                    >
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="bold">{lane.name}</Text>
                        <Text fontSize="xs" opacity={0.9}>{lane.role}</Text>
                        <Text fontSize="xs" opacity={0.7}>{lane.department}</Text>
                        {lane.responsibilities?.length > 0 && (
                          <Text fontSize="xs" opacity={0.8}>
                            {lane.responsibilities.slice(0, 2).join(', ')}
                            {lane.responsibilities.length > 2 && '...'}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  ))}
                  <Button size="sm" leftIcon={<AddIcon />} onClick={onSwimlaneOpen} variant="outline">
                    Add Swimlane
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardHeader pb={2}>
                <Text fontWeight="bold">📊 Canvas Statistics</Text>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Text fontSize="sm">Process Elements:</Text>
                    <Badge colorScheme="blue" fontSize="xs">{canvasElements.length}</Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm">Active Swimlanes:</Text>
                    <Badge colorScheme="green" fontSize="xs">{selectedProcess.swimlanes.length}</Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm">Estimated Cost:</Text>
                    <Badge colorScheme="purple" fontSize="xs">${selectedProcess.totalCost || 0}</Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm">Duration:</Text>
                    <Badge colorScheme="orange" fontSize="xs">{selectedProcess.totalDuration || 0}h</Badge>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm">Efficiency Score:</Text>
                    <Badge colorScheme="teal" fontSize="xs">{selectedProcess.efficiency || 0}%</Badge>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          <Card>
            <CardHeader pb={2}>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold">🎨 Interactive Process Canvas</Text>
                  <Text fontSize="sm" color="gray.500">
                    {selectedProcess.name} • {canvasElements.length} elements
                  </Text>
                </VStack>
                <HStack>
                  <Button size="sm" leftIcon={<ViewIcon />} onClick={onBPMNOpen} colorScheme="purple">
                    Preview
                  </Button>
                  <Button size="sm" leftIcon={<DownloadIcon />} onClick={() => {
                    if (selectedProcess) {
                      handleExportProcess(selectedProcess, 'bpmn');
                    }
                  }} colorScheme="green">
                    Export
                  </Button>
                </HStack>
              </HStack>
            </CardHeader>
            <CardBody p={0}>
              <Box
                h="600px"
                bg={useColorModeValue('gray.50', 'gray.800')}
                border="3px dashed"
                borderColor={draggedElement ? "blue.400" : "gray.300"}
                borderRadius="md"
                position="relative"
                overflow="hidden"
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
                transition="all 0.3s"
                backgroundImage={`
                  radial-gradient(circle, ${useColorModeValue('gray.300', 'gray.600')} 1px, transparent 1px)
                `}
                backgroundSize="20px 20px"
                _hover={draggedElement ? { borderColor: 'blue.500', bg: useColorModeValue('blue.50', 'blue.900') } : {}}
              >
                {canvasElements.length === 0 && (
                  <VStack spacing={4} justify="center" align="center" h="full">
                    <Text fontSize="5xl">🎨</Text>
                    <Text fontSize="lg" fontWeight="bold">Interactive Process Canvas</Text>
                    <Text color="gray.500" textAlign="center" maxW="400px">
                      Welcome to the visual process designer! Drag BPMN elements from the left panel to build your process flow. 
                      Click on elements to edit their properties and create detailed workflows.
                    </Text>
                    <VStack spacing={2}>
                      <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onStepDetailOpen}>
                        Add First Element
                      </Button>
                      <Text fontSize="xs" color="gray.400">Or drag an element from the left panel</Text>
                    </VStack>
                  </VStack>
                )}

                {/* Render swimlanes as background guides */}
                {selectedProcess.swimlanes.map((lane: any, index: number) => (
                  <Box
                    key={lane.id}
                    position="absolute"
                    top={`${index * 130}px`}
                    left="0"
                    right="0"
                    height="130px"
                    bg={lane.color}
                    opacity="0.08"
                    borderBottom="1px solid"
                    borderBottomColor={lane.color}
                    pointerEvents="none"
                  >
                    <Text
                      position="absolute"
                      left="15px"
                      top="10px"
                      fontSize="sm"
                      fontWeight="bold"
                      color={lane.color}
                      opacity="0.6"
                    >
                      {lane.name} - {lane.role}
                    </Text>
                    <Text
                      position="absolute"
                      left="15px"
                      top="30px"
                      fontSize="xs"
                      color={lane.color}
                      opacity="0.5"
                    >
                      {lane.department}
                    </Text>
                  </Box>
                ))}

                {/* Render process elements with enhanced interactivity */}
                {canvasElements.map((step: any, index: number) => {
                  const StepIcon = 
                    step.type === 'start' ? '🟢' : 
                    step.type === 'task' ? '📋' : 
                    step.type === 'decision' ? '💎' : 
                    step.type === 'subprocess' ? '📦' : 
                    step.type === 'gateway' ? '⚡' : 
                    step.type === 'end' ? '🔴' : '❓';

                  return (
                    <Box
                      key={step.id}
                      position="absolute"
                      left={`${step.position?.x || (60 + index * 160)}px`}
                      top={`${step.position?.y || (60 + (index % selectedProcess.swimlanes.length) * 130)}px`}
                      cursor="move"
                      draggable
                      onDragEnd={(e) => {
                        const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                        if (rect) {
                          const newX = e.clientX - rect.left;
                          const newY = e.clientY - rect.top;
                          handleElementMove(step.id, Math.max(0, newX - 70), Math.max(0, newY - 50));
                        }
                      }}
                    >
                      <Card 
                        size="sm" 
                        variant="elevated"
                        cursor="move"
                        minW="140px"
                        _hover={{ transform: 'scale(1.05)', shadow: 'xl', borderColor: 'blue.400' }}
                        onClick={() => {
                          setSelectedStep(step);
                          onStepDetailOpen();
                        }}
                        bg={
                          step.type === 'start' ? 'green.50' :
                          step.type === 'end' ? 'red.50' :
                          step.type === 'decision' ? 'yellow.50' :
                          step.type === 'task' ? 'blue.50' :
                          step.type === 'subprocess' ? 'purple.50' :
                          'orange.50'
                        }
                        borderLeft="4px solid"
                        borderLeftColor={
                          step.status === 'completed' ? 'green.500' : 
                          step.status === 'in_progress' ? 'blue.500' : 
                          step.status === 'blocked' ? 'red.500' : 'gray.400'
                        }
                        transition="all 0.2s"
                      >
                        <CardBody p={3}>
                          <VStack spacing={2}>
                            <Text fontSize="2xl">{StepIcon}</Text>
                            <Text fontSize="xs" fontWeight="bold" textAlign="center" maxW="120px" noOfLines={2}>
                              {step.name}
                            </Text>
                            <Badge 
                              colorScheme={
                                step.status === 'completed' ? 'green' : 
                                step.status === 'in_progress' ? 'blue' : 
                                step.status === 'blocked' ? 'red' : 'gray'
                              }
                              fontSize="xs"
                            >
                              {step.status?.replace('_', ' ') || 'Not Started'}
                            </Badge>
                            <VStack spacing={0}>
                              <Text fontSize="xs" color="gray.500">
                                {step.duration}h • ${step.cost}
                              </Text>
                              <Text fontSize="xs" color="gray.400" noOfLines={1}>
                                {step.assignee}
                              </Text>
                              {step.priority && (
                                <Badge 
                                  size="xs"
                                  colorScheme={
                                    step.priority === 'critical' ? 'red' :
                                    step.priority === 'high' ? 'orange' :
                                    step.priority === 'medium' ? 'yellow' : 'green'
                                  }
                                >
                                  {step.priority}
                                </Badge>
                              )}
                            </VStack>
                          </VStack>
                        </CardBody>

                        {/* Enhanced connection points */}
                        <Box
                          position="absolute"
                          right="-10px"
                          top="50%"
                          transform="translateY(-50%)"
                          w="5"
                          h="5"
                          bg="blue.400"
                          borderRadius="full"
                          cursor="crosshair"
                          border="2px solid white"
                          _hover={{ bg: 'blue.600', transform: 'translateY(-50%) scale(1.3)' }}
                          transition="all 0.2s"
                        />
                        
                        <Box
                          position="absolute"
                          left="-10px"
                          top="50%"
                          transform="translateY(-50%)"
                          w="5"
                          h="5"
                          bg="green.400"
                          borderRadius="full"
                          cursor="crosshair"
                          border="2px solid white"
                          _hover={{ bg: 'green.600', transform: 'translateY(-50%) scale(1.3)' }}
                          transition="all 0.2s"
                        />
                      </Card>
                    </Box>
                  );
                })}

                {/* Enhanced drop zone indicator */}
                {draggedElement && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    p={6}
                    bg="blue.100"
                    border="3px dashed"
                    borderColor="blue.400"
                    borderRadius="lg"
                    pointerEvents="none"
                    animation="pulse 1.5s infinite"
                  >
                    <VStack spacing={2}>
                      <Text fontSize="2xl">
                        {draggedElement === 'start' ? '🟢' : 
                         draggedElement === 'task' ? '📋' : 
                         draggedElement === 'decision' ? '💎' : 
                         draggedElement === 'subprocess' ? '📦' : 
                         draggedElement === 'gateway' ? '⚡' : 
                         draggedElement === 'end' ? '🔴' : '❓'}
                      </Text>
                      <Text color="blue.600" fontWeight="bold">
                        Drop {draggedElement} here
                      </Text>
                      <Text fontSize="xs" color="blue.500">
                        Release to add to canvas
                      </Text>
                    </VStack>
                  </Box>
                )}
              </Box>
            </CardBody>
          </Card>
        </Grid>
      )}

      {!selectedProcess && (
        <Card bg={cardBg} borderWidth="2px" borderStyle="dashed">
          <CardBody textAlign="center" py={10}>
            <VStack spacing={6}>
              <Text fontSize="6xl">🎨</Text>
              <VStack spacing={2}>
                <Text fontSize="xl" fontWeight="bold">Interactive BPMN Process Designer</Text>
                <Text color="gray.500" maxW="500px" textAlign="center">
                  Create professional business process diagrams with our drag-and-drop interface. 
                  Choose a process from above or create a new one to start designing your workflow visually.
                </Text>
              </VStack>
              <HStack spacing={4}>
                <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProcessOpen} size="lg">
                  Create New Process
                </Button>
                <Button variant="outline" onClick={() => {
                  if (processes.length > 0) {
                    setSelectedProcess(processes[0]);
                  }
                }} size="lg">
                  Select Existing Process
                </Button>
              </HStack>
              <Alert status="info" maxW="400px">
                <AlertIcon />
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">Getting Started</Text>
                  <Text fontSize="xs">
                    • Select or create a process above
                    • Drag elements from the left panel
                    • Click elements to configure
                    • Export as BPMN when complete
                  </Text>
                </VStack>
              </Alert>
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
};

export default EnhancedBPMNDesigner;