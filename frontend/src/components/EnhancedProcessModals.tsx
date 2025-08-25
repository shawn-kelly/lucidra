import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Badge,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  List,
  ListItem,
  ListIcon,
  Avatar,
  AvatarGroup,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  Tag,
  TagLabel,
  TagCloseButton,
  Switch,
  Checkbox,
  SimpleGrid,
  Divider,
  IconButton,
  useToast
} from '@chakra-ui/react';
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  CheckIcon,
  WarningIcon,
  InfoIcon,
  StarIcon,
  CalendarIcon,
  TimeIcon,
  AttachmentIcon,
  ChatIcon,
  BellIcon
} from '@chakra-ui/icons';

// Enhanced Step Detail Modal with comprehensive narratives and collaboration
export const EnhancedStepDetailModal = ({
  isOpen,
  onClose,
  selectedStep,
  setSelectedStep,
  selectedProcess,
  setSelectedProcess,
  processes,
  setProcesses,
  swimlanes,
  resources
}: any) => {
  const [activeTab, setActiveTab] = useState(0);
  const [collaborators, setCollaborators] = useState([
    { id: '1', name: 'Sarah Johnson', role: 'Process Owner', avatar: '👩‍💼', status: 'online' },
    { id: '2', name: 'Mike Chen', role: 'Business Analyst', avatar: '👨‍💻', status: 'online' },
    { id: '3', name: 'Lisa Rodriguez', role: 'Quality Manager', avatar: '👩‍🔬', status: 'away' },
    { id: '4', name: 'David Kim', role: 'Operations Lead', avatar: '👨‍💼', status: 'offline' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [stepNarrative, setStepNarrative] = useState(selectedStep?.narrative || '');
  const toast = useToast();

  const handleSaveStep = () => {
    if (!selectedStep || !selectedProcess) return;

    const updatedStep = {
      ...selectedStep,
      narrative: stepNarrative
    };

    const updatedSteps = selectedProcess.steps.map((step: any) =>
      step.id === selectedStep.id ? updatedStep : step
    );

    const updatedProcess = { ...selectedProcess, steps: updatedSteps };
    setSelectedProcess(updatedProcess);
    setProcesses((prev: any) => prev.map((p: any) => p.id === selectedProcess.id ? updatedProcess : p));

    toast({
      title: 'Step Updated Successfully',
      description: 'All changes have been saved to your process',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    onClose();
  };

  if (!selectedStep) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent maxH="90vh">
        <ModalHeader>
          <HStack spacing={3}>
            <Text fontSize="2xl">
              {selectedStep.type === 'start' ? '🟢' :
               selectedStep.type === 'task' ? '📋' :
               selectedStep.type === 'decision' ? '💎' :
               selectedStep.type === 'subprocess' ? '📦' :
               selectedStep.type === 'gateway' ? '⚡' :
               selectedStep.type === 'end' ? '🔴' : '❓'}
            </Text>
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold">{selectedStep.name}</Text>
              <HStack spacing={2}>
                <Badge colorScheme={
                  selectedStep.status === 'completed' ? 'green' :
                  selectedStep.status === 'in_progress' ? 'blue' :
                  selectedStep.status === 'blocked' ? 'red' : 'gray'
                }>
                  {selectedStep.status?.replace('_', ' ')}
                </Badge>
                <Badge colorScheme={
                  selectedStep.priority === 'critical' ? 'red' :
                  selectedStep.priority === 'high' ? 'orange' :
                  selectedStep.priority === 'medium' ? 'yellow' : 'green'
                }>
                  {selectedStep.priority} priority
                </Badge>
                <Badge variant="outline">{selectedStep.type}</Badge>
              </HStack>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Tabs index={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>📝 Overview</Tab>
              <Tab>📖 Narrative</Tab>
              <Tab>👥 Collaboration</Tab>
              <Tab>📊 Analytics</Tab>
              <Tab>⚙️ Configuration</Tab>
            </TabList>
            
            <TabPanels>
              {/* Overview Tab */}
              <TabPanel>
                <Grid templateColumns="1fr 300px" gap={6}>
                  <VStack spacing={6} align="stretch">
                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">📋 Step Information</Text>
                      </CardHeader>
                      <CardBody>
                        <SimpleGrid columns={2} spacing={4}>
                          <Box>
                            <Text fontSize="sm" color="gray.500">Assignee</Text>
                            <HStack>
                              <Avatar size="sm" name={selectedStep.assignee} />
                              <Text fontWeight="semibold">{selectedStep.assignee}</Text>
                            </HStack>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">Duration</Text>
                            <Text fontWeight="semibold">{selectedStep.duration} hours</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">Estimated Cost</Text>
                            <Text fontWeight="semibold">${selectedStep.cost}</Text>
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">Automation Level</Text>
                            <HStack>
                              <Progress value={selectedStep.automationLevel} size="sm" flex="1" />
                              <Text fontSize="sm">{selectedStep.automationLevel}%</Text>
                            </HStack>
                          </Box>
                        </SimpleGrid>
                        
                        <Divider my={4} />
                        
                        <VStack align="stretch" spacing={3}>
                          <Box>
                            <Text fontSize="sm" color="gray.500" mb={2}>Description</Text>
                            <Text fontSize="sm">{selectedStep.description}</Text>
                          </Box>
                          
                          {selectedStep.businessRules?.length > 0 && (
                            <Box>
                              <Text fontSize="sm" color="gray.500" mb={2}>Business Rules</Text>
                              <VStack align="stretch" spacing={1}>
                                {selectedStep.businessRules.map((rule: string, index: number) => (
                                  <HStack key={index} spacing={2}>
                                    <CheckIcon color="green.500" boxSize={3} />
                                    <Text fontSize="sm">{rule}</Text>
                                  </HStack>
                                ))}
                              </VStack>
                            </Box>
                          )}
                          
                          {selectedStep.compliance?.length > 0 && (
                            <Box>
                              <Text fontSize="sm" color="gray.500" mb={2}>Compliance Requirements</Text>
                              <HStack spacing={2} wrap="wrap">
                                {selectedStep.compliance.map((comp: string, index: number) => (
                                  <Badge key={index} colorScheme="purple" variant="outline">
                                    {comp}
                                  </Badge>
                                ))}
                              </HStack>
                            </Box>
                          )}
                        </VStack>
                      </CardBody>
                    </Card>
                    
                    {/* KPIs and Metrics */}
                    {selectedStep.kpis?.length > 0 && (
                      <Card>
                        <CardHeader>
                          <Text fontWeight="bold">📊 Key Performance Indicators</Text>
                        </CardHeader>
                        <CardBody>
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            {selectedStep.kpis.map((kpi: any) => (
                              <Box key={kpi.id} p={3} border="1px solid" borderColor="gray.200" borderRadius="md">
                                <VStack align="start" spacing={2}>
                                  <HStack justify="space-between" w="full">
                                    <Text fontSize="sm" fontWeight="semibold">{kpi.name}</Text>
                                    <Badge colorScheme={
                                      kpi.trend === 'increasing' ? 'green' :
                                      kpi.trend === 'decreasing' ? 'red' : 'gray'
                                    }>
                                      {kpi.trend}
                                    </Badge>
                                  </HStack>
                                  <Text fontSize="xs" color="gray.500">{kpi.description}</Text>
                                  <HStack spacing={4} fontSize="sm">
                                    <Text>Current: <strong>{kpi.current} {kpi.unit}</strong></Text>
                                    <Text>Target: <strong>{kpi.target} {kpi.unit}</strong></Text>
                                  </HStack>
                                  <Progress 
                                    value={(kpi.current / kpi.target) * 100} 
                                    colorScheme={kpi.current >= kpi.target ? 'green' : 'orange'} 
                                    size="sm" 
                                  />
                                </VStack>
                              </Box>
                            ))}
                          </SimpleGrid>
                        </CardBody>
                      </Card>
                    )}
                  </VStack>
                  
                  {/* Right Sidebar */}
                  <VStack spacing={4} align="stretch">
                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">⏱️ Timeline</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <Box>
                            <Text fontSize="xs" color="gray.500">Created</Text>
                            <Text fontSize="sm">2 days ago</Text>
                          </Box>
                          <Box>
                            <Text fontSize="xs" color="gray.500">Last Modified</Text>
                            <Text fontSize="sm">1 hour ago</Text>
                          </Box>
                          <Box>
                            <Text fontSize="xs" color="gray.500">Next Review</Text>
                            <Text fontSize="sm">Tomorrow at 2 PM</Text>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">🚨 Risk Assessment</Text>
                      </CardHeader>
                      <CardBody>
                        {selectedStep.risks?.length > 0 ? (
                          <VStack align="stretch" spacing={2}>
                            {selectedStep.risks.map((risk: any) => (
                              <Box key={risk.id} p={2} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.200">
                                <VStack align="start" spacing={1}>
                                  <Text fontSize="sm" fontWeight="semibold">{risk.description}</Text>
                                  <HStack spacing={2}>
                                    <Badge colorScheme="red" size="sm">{risk.probability}</Badge>
                                    <Badge colorScheme="orange" size="sm">{risk.impact}</Badge>
                                  </HStack>
                                  <Text fontSize="xs" color="gray.600">{risk.mitigation}</Text>
                                </VStack>
                              </Box>
                            ))}
                          </VStack>
                        ) : (
                          <Text fontSize="sm" color="gray.500">No risks identified</Text>
                        )}
                      </CardBody>
                    </Card>
                  </VStack>
                </Grid>
              </TabPanel>
              
              {/* Enhanced Narrative Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">Step Narrative & Documentation</Text>
                      <Text fontSize="xs">
                        Provide a comprehensive description of this step, including its purpose, 
                        execution details, decision criteria, and business context.
                      </Text>
                    </VStack>
                  </Alert>
                  
                  <Grid templateColumns="1fr 300px" gap={6}>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>📖 Detailed Step Narrative</FormLabel>
                        <Textarea
                          value={stepNarrative}
                          onChange={(e) => setStepNarrative(e.target.value)}
                          placeholder={`Describe this ${selectedStep.type} step in detail...

Example narrative structure:
• Purpose: What does this step accomplish?
• Input: What information/resources does it require?
• Process: How is the work performed?
• Decision Points: What choices or validations occur?
• Output: What results or deliverables are produced?
• Success Criteria: How do we know it's completed successfully?
• Error Handling: What happens if something goes wrong?
• Business Context: Why is this step important to the organization?`}
                          rows={12}
                          resize="vertical"
                        />
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          {stepNarrative.length}/5000 characters
                        </Text>
                      </FormControl>
                      
                      <Card bg="blue.50">
                        <CardHeader pb={2}>
                          <Text fontWeight="bold" fontSize="sm">💡 AI-Generated Narrative Template</Text>
                        </CardHeader>
                        <CardBody pt={0}>
                          <Text fontSize="sm" color="gray.700">
                            <strong>Purpose:</strong> This {selectedStep.type} step serves as {selectedStep.type === 'start' ? 'the entry point for the process' : selectedStep.type === 'decision' ? 'a critical decision gateway' : 'a key operational task'}.
                            <br/><br/>
                            <strong>Execution:</strong> The {selectedStep.assignee} is responsible for {selectedStep.description.toLowerCase()}. 
                            This typically takes {selectedStep.duration} hours and involves coordination with multiple stakeholders.
                            <br/><br/>
                            <strong>Business Value:</strong> Successfully completing this step ensures {selectedStep.type === 'start' ? 'proper process initiation' : selectedStep.type === 'decision' ? 'appropriate routing of work' : 'quality deliverable production'} while maintaining cost efficiency at ${selectedStep.cost}.
                            <br/><br/>
                            <strong>Quality Assurance:</strong> {selectedStep.automationLevel}% of this step is automated, with manual oversight for critical decision points and exception handling.
                          </Text>
                          <Button 
                            size="xs" 
                            colorScheme="blue" 
                            mt={3}
                            onClick={() => {
                              setStepNarrative(prev => 
                                prev + '\n\n' + `Purpose: This ${selectedStep.type} step serves as ${selectedStep.type === 'start' ? 'the entry point for the process' : selectedStep.type === 'decision' ? 'a critical decision gateway' : 'a key operational task'}.\n\nExecution: The ${selectedStep.assignee} is responsible for ${selectedStep.description.toLowerCase()}. This typically takes ${selectedStep.duration} hours and involves coordination with multiple stakeholders.\n\nBusiness Value: Successfully completing this step ensures ${selectedStep.type === 'start' ? 'proper process initiation' : selectedStep.type === 'decision' ? 'appropriate routing of work' : 'quality deliverable production'} while maintaining cost efficiency at $${selectedStep.cost}.\n\nQuality Assurance: ${selectedStep.automationLevel}% of this step is automated, with manual oversight for critical decision points and exception handling.`
                              );
                            }}
                          >
                            Use This Template
                          </Button>
                        </CardBody>
                      </Card>
                    </VStack>
                    
                    <VStack spacing={4} align="stretch">
                      <Card>
                        <CardHeader pb={2}>
                          <Text fontWeight="bold" fontSize="sm">📝 Documentation Checklist</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            {[
                              { item: 'Step purpose defined', checked: stepNarrative.includes('Purpose') || stepNarrative.includes('purpose') },
                              { item: 'Input requirements listed', checked: stepNarrative.includes('Input') || stepNarrative.includes('input') },
                              { item: 'Process details described', checked: stepNarrative.includes('Process') || stepNarrative.includes('process') },
                              { item: 'Decision criteria specified', checked: stepNarrative.includes('Decision') || stepNarrative.includes('decision') },
                              { item: 'Output/deliverables defined', checked: stepNarrative.includes('Output') || stepNarrative.includes('output') },
                              { item: 'Success criteria established', checked: stepNarrative.includes('Success') || stepNarrative.includes('success') },
                              { item: 'Error handling covered', checked: stepNarrative.includes('Error') || stepNarrative.includes('error') }
                            ].map((check, index) => (
                              <HStack key={index} spacing={2}>
                                <CheckIcon 
                                  color={check.checked ? 'green.500' : 'gray.300'} 
                                  boxSize={3} 
                                />
                                <Text 
                                  fontSize="xs" 
                                  color={check.checked ? 'green.600' : 'gray.500'}
                                  textDecoration={check.checked ? 'none' : 'none'}
                                >
                                  {check.item}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                      
                      <Card>
                        <CardHeader pb={2}>
                          <Text fontWeight="bold" fontSize="sm">🎯 Quick Actions</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={2}>
                            <Button size="xs" variant="outline" w="full" leftIcon={<AttachmentIcon />}>
                              Attach Documents
                            </Button>
                            <Button size="xs" variant="outline" w="full" leftIcon={<ChatIcon />}>
                              Add Comments
                            </Button>
                            <Button size="xs" variant="outline" w="full" leftIcon={<BellIcon />}>
                              Set Reminders
                            </Button>
                          </VStack>
                        </CardBody>
                      </Card>
                    </VStack>
                  </Grid>
                </VStack>
              </TabPanel>
              
              {/* Enhanced Collaboration Tab */}
              <TabPanel>
                <Grid templateColumns="1fr 300px" gap={6}>
                  <VStack spacing={6} align="stretch">
                    <Card>
                      <CardHeader>
                        <HStack justify="space-between">
                          <Text fontWeight="bold">💬 Discussion & Comments</Text>
                          <Badge colorScheme="blue">3 active threads</Badge>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          {/* Sample Comments */}
                          {[
                            {
                              id: '1',
                              user: 'Sarah Johnson',
                              role: 'Process Owner',
                              time: '2 hours ago',
                              message: 'The automation level for this step should be increased to 85%. We have the technology in place to reduce manual intervention.',
                              replies: 2
                            },
                            {
                              id: '2',
                              user: 'Mike Chen',
                              role: 'Business Analyst',
                              time: '1 day ago',
                              message: 'I recommend adding a quality gate here. The current process allows errors to propagate downstream.',
                              replies: 1
                            },
                            {
                              id: '3',
                              user: 'Lisa Rodriguez',
                              role: 'Quality Manager',
                              time: '3 days ago',
                              message: 'The compliance requirements need to be updated according to the new regulatory guidelines received last week.',
                              replies: 0
                            }
                          ].map((comment) => (
                            <Box key={comment.id} p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
                              <HStack spacing={3} align="start">
                                <Avatar size="sm" name={comment.user} />
                                <VStack align="start" spacing={1} flex="1">
                                  <HStack spacing={2}>
                                    <Text fontSize="sm" fontWeight="semibold">{comment.user}</Text>
                                    <Badge size="sm" variant="outline">{comment.role}</Badge>
                                    <Text fontSize="xs" color="gray.500">{comment.time}</Text>
                                  </HStack>
                                  <Text fontSize="sm">{comment.message}</Text>
                                  <HStack spacing={4} fontSize="xs">
                                    <Button size="xs" variant="ghost" leftIcon={<ChatIcon />}>
                                      Reply ({comment.replies})
                                    </Button>
                                    <Button size="xs" variant="ghost">
                                      Like
                                    </Button>
                                    <Button size="xs" variant="ghost">
                                      Share
                                    </Button>
                                  </HStack>
                                </VStack>
                              </HStack>
                            </Box>
                          ))}
                          
                          {/* New Comment Input */}
                          <Box p={4} border="2px dashed" borderColor="gray.200" borderRadius="md">
                            <VStack spacing={3} align="stretch">
                              <HStack>
                                <Avatar size="sm" name="You" />
                                <VStack align="start" spacing={0} flex="1">
                                  <Text fontSize="sm" fontWeight="semibold">Add Comment</Text>
                                  <Text fontSize="xs" color="gray.500">Share your thoughts or suggestions</Text>
                                </VStack>
                              </HStack>
                              <Textarea
                                placeholder="Share your insights, suggestions, or questions about this step..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={3}
                              />
                              <HStack justify="space-between">
                                <HStack spacing={2}>
                                  <Button size="xs" variant="outline" leftIcon={<AttachmentIcon />}>
                                    Attach
                                  </Button>
                                  <Button size="xs" variant="outline">
                                    @Mention
                                  </Button>
                                </HStack>
                                <Button 
                                  size="sm" 
                                  colorScheme="blue"
                                  isDisabled={!newComment.trim()}
                                  onClick={() => {
                                    toast({
                                      title: 'Comment Added',
                                      description: 'Your comment has been posted successfully',
                                      status: 'success',
                                      duration: 2000,
                                      isClosable: true,
                                    });
                                    setNewComment('');
                                  }}
                                >
                                  Post Comment
                                </Button>
                              </HStack>
                            </VStack>
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>
                  
                  {/* Right Sidebar - Team & Activity */}
                  <VStack spacing={4} align="stretch">
                    <Card>
                      <CardHeader pb={2}>
                        <Text fontWeight="bold" fontSize="sm">👥 Team Members</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          {collaborators.map((member) => (
                            <HStack key={member.id} spacing={3}>
                              <Box position="relative">
                                <Text fontSize="lg">{member.avatar}</Text>
                                <Box
                                  position="absolute"
                                  bottom="-1px"
                                  right="-1px"
                                  w="3"
                                  h="3"
                                  borderRadius="full"
                                  bg={
                                    member.status === 'online' ? 'green.400' :
                                    member.status === 'away' ? 'yellow.400' : 'gray.400'
                                  }
                                  border="1px solid white"
                                />
                              </Box>
                              <VStack align="start" spacing={0} flex="1">
                                <Text fontSize="sm" fontWeight="semibold">{member.name}</Text>
                                <Text fontSize="xs" color="gray.500">{member.role}</Text>
                              </VStack>
                              <IconButton
                                size="xs"
                                variant="ghost"
                                icon={<ChatIcon />}
                                aria-label="Message"
                              />
                            </HStack>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                    
                    <Card>
                      <CardHeader pb={2}>
                        <Text fontWeight="bold" fontSize="sm">🕐 Recent Activity</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          {[
                            { action: 'Updated narrative', user: 'You', time: '5 mins ago', icon: '📝' },
                            { action: 'Changed assignee', user: 'Sarah J.', time: '1 hour ago', icon: '👤' },
                            { action: 'Added comment', user: 'Mike C.', time: '2 hours ago', icon: '💬' },
                            { action: 'Increased automation', user: 'Lisa R.', time: '1 day ago', icon: '🤖' }
                          ].map((activity, index) => (
                            <HStack key={index} spacing={3}>
                              <Text>{activity.icon}</Text>
                              <VStack align="start" spacing={0} flex="1">
                                <Text fontSize="xs">{activity.action}</Text>
                                <Text fontSize="xs" color="gray.500">by {activity.user} • {activity.time}</Text>
                              </VStack>
                            </HStack>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                    
                    <Card>
                      <CardHeader pb={2}>
                        <Text fontWeight="bold" fontSize="sm">🔔 Notifications</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={2}>
                          <Switch size="sm" defaultChecked>
                            <Text fontSize="xs" ml={2}>Comment notifications</Text>
                          </Switch>
                          <Switch size="sm" defaultChecked>
                            <Text fontSize="xs" ml={2}>Status change alerts</Text>
                          </Switch>
                          <Switch size="sm">
                            <Text fontSize="xs" ml={2}>Daily summaries</Text>
                          </Switch>
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>
                </Grid>
              </TabPanel>
              
              {/* Analytics Tab */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card>
                    <CardHeader>
                      <Text fontWeight="bold">📊 Performance Metrics</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Box>
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm">Completion Rate</Text>
                            <Text fontSize="sm" fontWeight="bold">94%</Text>
                          </HStack>
                          <Progress value={94} colorScheme="green" />
                        </Box>
                        <Box>
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm">Average Duration</Text>
                            <Text fontSize="sm" fontWeight="bold">{selectedStep.duration}h</Text>
                          </HStack>
                          <Progress value={75} colorScheme="blue" />
                        </Box>
                        <Box>
                          <HStack justify="space-between" mb={2}>
                            <Text fontSize="sm">Quality Score</Text>
                            <Text fontSize="sm" fontWeight="bold">87%</Text>
                          </HStack>
                          <Progress value={87} colorScheme="purple" />
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <Text fontWeight="bold">🎯 Optimization Opportunities</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="stretch" spacing={3}>
                        <Alert status="info" size="sm">
                          <AlertIcon />
                          <VStack align="start" spacing={0}>
                            <Text fontSize="xs" fontWeight="semibold">Automation Opportunity</Text>
                            <Text fontSize="xs">This step could be 95% automated</Text>
                          </VStack>
                        </Alert>
                        <Alert status="warning" size="sm">
                          <AlertIcon />
                          <VStack align="start" spacing={0}>
                            <Text fontSize="xs" fontWeight="semibold">Duration Alert</Text>
                            <Text fontSize="xs">Average time exceeds target by 23%</Text>
                          </VStack>
                        </Alert>
                        <Alert status="success" size="sm">
                          <AlertIcon />
                          <VStack align="start" spacing={0}>
                            <Text fontSize="xs" fontWeight="semibold">Quality Excellence</Text>
                            <Text fontSize="xs">Consistently meets quality standards</Text>
                          </VStack>
                        </Alert>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </TabPanel>
              
              {/* Configuration Tab */}
              <TabPanel>
                <Grid templateColumns="1fr 1fr" gap={6}>
                  <VStack spacing={6} align="stretch">
                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">⚙️ Step Configuration</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          <FormControl>
                            <FormLabel fontSize="sm">Step Name</FormLabel>
                            <Input value={selectedStep.name} size="sm" />
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="sm">Description</FormLabel>
                            <Textarea value={selectedStep.description} size="sm" rows={3} />
                          </FormControl>
                          <HStack>
                            <FormControl>
                              <FormLabel fontSize="sm">Duration (hours)</FormLabel>
                              <NumberInput value={selectedStep.duration} size="sm">
                                <NumberInputField />
                              </NumberInput>
                            </FormControl>
                            <FormControl>
                              <FormLabel fontSize="sm">Cost ($)</FormLabel>
                              <NumberInput value={selectedStep.cost} size="sm">
                                <NumberInputField />
                              </NumberInput>
                            </FormControl>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>
                  
                  <VStack spacing={6} align="stretch">
                    <Card>
                      <CardHeader>
                        <Text fontWeight="bold">🔄 Status & Priority</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          <FormControl>
                            <FormLabel fontSize="sm">Status</FormLabel>
                            <Select value={selectedStep.status} size="sm">
                              <option value="not_started">Not Started</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="blocked">Blocked</option>
                              <option value="on_hold">On Hold</option>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="sm">Priority Level</FormLabel>
                            <Select value={selectedStep.priority} size="sm">
                              <option value="low">Low Priority</option>
                              <option value="medium">Medium Priority</option>
                              <option value="high">High Priority</option>
                              <option value="critical">Critical Priority</option>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="sm">Automation Level</FormLabel>
                            <Slider value={selectedStep.automationLevel} min={0} max={100}>
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb />
                            </Slider>
                            <Text fontSize="xs" color="gray.500" mt={1}>
                              {selectedStep.automationLevel}% automated
                            </Text>
                          </FormControl>
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        
        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveStep}>
              Save Changes
            </Button>
            <Button colorScheme="green" leftIcon={<CheckIcon />}>
              Save & Close
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EnhancedStepDetailModal;