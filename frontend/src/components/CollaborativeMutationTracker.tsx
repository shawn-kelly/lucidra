import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  AlertIcon,
  Progress,
  Avatar,
  AvatarGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Icon,
  Tooltip,
  Spinner,
  Select,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch
} from '@chakra-ui/react';
import { 
  FiUsers, 
  FiGitBranch, 
  FiRefreshCw, 
  FiCheck, 
  FiX, 
  FiClock, 
  FiAlertTriangle,
  FiPlay,
  FiPause,
  FiSettings,
  FiEye,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiArrowRight,
  FiMessageSquare
} from 'react-icons/fi';

interface CollaborativeMutation {
  id: string;
  type: 'blue_ocean' | 'porter_forces' | 'bpmn_process' | 'strategy_canvas';
  title: string;
  description: string;
  initiator: MutationUser;
  collaborators: MutationUser[];
  status: 'proposed' | 'in_review' | 'approved' | 'active' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: Date;
  targetDate: Date;
  progress: number;
  approvals: MutationApproval[];
  conflicts: MutationConflict[];
  timeline: MutationTimelineEvent[];
  realTimeUpdates: boolean;
  autoSync: boolean;
}

interface MutationUser {
  id: string;
  name: string;
  role: 'strategist' | 'analyst' | 'manager' | 'consultant';
  avatar: string;
  isOnline: boolean;
  permissions: string[];
}

interface MutationApproval {
  userId: string;
  userName: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
  comments?: string;
}

interface MutationConflict {
  id: string;
  type: 'data_collision' | 'permission_conflict' | 'timing_conflict';
  description: string;
  affectedUsers: string[];
  resolution: 'auto_merge' | 'manual_review' | 'first_wins' | 'last_wins';
  resolved: boolean;
}

interface MutationTimelineEvent {
  id: string;
  type: 'created' | 'modified' | 'approved' | 'rejected' | 'completed' | 'comment';
  userId: string;
  userName: string;
  timestamp: Date;
  description: string;
  metadata?: any;
}

interface CollaborationSettings {
  autoApproval: boolean;
  conflictResolution: 'auto_merge' | 'manual_review' | 'first_wins' | 'last_wins';
  notificationLevel: 'all' | 'important' | 'minimal';
  realTimeSync: boolean;
}

const CollaborativeMutationTracker: React.FC = () => {
  const [mutations, setMutations] = useState<CollaborativeMutation[]>([]);
  const [currentUser] = useState<MutationUser>({
    id: 'user-1',
    name: 'Strategic Analyst',
    role: 'analyst',
    avatar: '👤',
    isOnline: true,
    permissions: ['create', 'edit', 'approve', 'delete']
  });
  const [selectedMutation, setSelectedMutation] = useState<CollaborativeMutation | null>(null);
  const [collaborationSettings, setCollaborationSettings] = useState<CollaborationSettings>({
    autoApproval: false,
    conflictResolution: 'manual_review',
    notificationLevel: 'important',
    realTimeSync: true
  });
  const [activeTab, setActiveTab] = useState(0);
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const toast = useToast();

  // Sample data initialization
  useEffect(() => {
    const sampleMutations: CollaborativeMutation[] = [
      {
        id: 'mut-1',
        type: 'blue_ocean',
        title: 'Market Positioning Optimization',
        description: 'Refine value proposition and eliminate competition factors',
        initiator: {
          id: 'user-2',
          name: 'Strategy Director',
          role: 'strategist',
          avatar: '🎯',
          isOnline: true,
          permissions: ['create', 'edit', 'approve']
        },
        collaborators: [
          {
            id: 'user-3',
            name: 'Market Analyst',
            role: 'analyst',
            avatar: '📊',
            isOnline: true,
            permissions: ['edit', 'comment']
          },
          {
            id: 'user-4',
            name: 'Business Consultant',
            role: 'consultant',
            avatar: '💼',
            isOnline: false,
            permissions: ['approve', 'comment']
          }
        ],
        status: 'in_review',
        priority: 'high',
        startDate: new Date(Date.now() - 86400000),
        targetDate: new Date(Date.now() + 604800000),
        progress: 65,
        approvals: [
          {
            userId: 'user-3',
            userName: 'Market Analyst',
            status: 'approved',
            timestamp: new Date(Date.now() - 3600000),
            comments: 'Data analysis supports the proposed changes'
          },
          {
            userId: 'user-4',
            userName: 'Business Consultant',
            status: 'pending',
            timestamp: new Date(),
          }
        ],
        conflicts: [],
        timeline: [
          {
            id: 'tl-1',
            type: 'created',
            userId: 'user-2',
            userName: 'Strategy Director',
            timestamp: new Date(Date.now() - 86400000),
            description: 'Initiated market positioning optimization'
          },
          {
            id: 'tl-2',
            type: 'approved',
            userId: 'user-3',
            userName: 'Market Analyst',
            timestamp: new Date(Date.now() - 3600000),
            description: 'Approved mutation with data validation'
          }
        ],
        realTimeUpdates: true,
        autoSync: true
      },
      {
        id: 'mut-2',
        type: 'porter_forces',
        title: 'Competitive Pressure Analysis',
        description: 'Dynamic adjustment of competitive forces based on market changes',
        initiator: currentUser,
        collaborators: [
          {
            id: 'user-5',
            name: 'Industry Expert',
            role: 'consultant',
            avatar: '🏭',
            isOnline: true,
            permissions: ['edit', 'approve']
          }
        ],
        status: 'proposed',
        priority: 'medium',
        startDate: new Date(),
        targetDate: new Date(Date.now() + 432000000),
        progress: 15,
        approvals: [
          {
            userId: 'user-5',
            userName: 'Industry Expert',
            status: 'pending',
            timestamp: new Date(),
          }
        ],
        conflicts: [
          {
            id: 'conf-1',
            type: 'data_collision',
            description: 'Conflicting supplier power assessments',
            affectedUsers: ['user-1', 'user-5'],
            resolution: 'manual_review',
            resolved: false
          }
        ],
        timeline: [
          {
            id: 'tl-3',
            type: 'created',
            userId: 'user-1',
            userName: 'Strategic Analyst',
            timestamp: new Date(Date.now() - 1800000),
            description: 'Proposed competitive pressure analysis'
          }
        ],
        realTimeUpdates: true,
        autoSync: false
      }
    ];
    
    setMutations(sampleMutations);
  }, [currentUser]);

  // Real-time simulation
  useEffect(() => {
    if (!collaborationSettings.realTimeSync) return;

    const interval = setInterval(() => {
      setMutations(prev => prev.map(mut => {
        if (mut.status === 'active' && mut.progress < 100) {
          const progressIncrement = Math.random() * 5;
          const newProgress = Math.min(mut.progress + progressIncrement, 100);
          
          if (newProgress === 100 && mut.status !== 'completed') {
            // Mutation completed
            toast({
              title: 'Mutation Completed',
              description: `${mut.title} has been successfully completed`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            
            return {
              ...mut,
              progress: newProgress,
              status: 'completed' as const,
              timeline: [
                ...mut.timeline,
                {
                  id: `tl-${Date.now()}`,
                  type: 'completed',
                  userId: 'system',
                  userName: 'System',
                  timestamp: new Date(),
                  description: 'Mutation completed successfully'
                }
              ]
            };
          }
          
          return { ...mut, progress: newProgress };
        }
        return mut;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [collaborationSettings.realTimeSync, toast]);

  const handleApproveMutation = useCallback((mutationId: string, approved: boolean) => {
    setMutations(prev => prev.map(mut => {
      if (mut.id === mutationId) {
        const updatedApprovals = mut.approvals.map(approval => 
          approval.userId === currentUser.id 
            ? { ...approval, status: approved ? 'approved' : 'rejected' as const, timestamp: new Date() }
            : approval
        );
        
        const allApproved = updatedApprovals.every(a => a.status === 'approved');
        const hasRejection = updatedApprovals.some(a => a.status === 'rejected');
        
        let newStatus = mut.status;
        if (hasRejection) {
          newStatus = 'rejected';
        } else if (allApproved) {
          newStatus = 'approved';
        }
        
        const newTimelineEvent: MutationTimelineEvent = {
          id: `tl-${Date.now()}`,
          type: approved ? 'approved' : 'rejected',
          userId: currentUser.id,
          userName: currentUser.name,
          timestamp: new Date(),
          description: `${approved ? 'Approved' : 'Rejected'} mutation`
        };
        
        return {
          ...mut,
          approvals: updatedApprovals,
          status: newStatus,
          timeline: [...mut.timeline, newTimelineEvent]
        };
      }
      return mut;
    }));
    
    toast({
      title: approved ? 'Mutation Approved' : 'Mutation Rejected',
      status: approved ? 'success' : 'warning',
      duration: 2000,
      isClosable: true,
    });
  }, [currentUser, toast]);

  const handleStartMutation = useCallback((mutationId: string) => {
    setMutations(prev => prev.map(mut => {
      if (mut.id === mutationId && mut.status === 'approved') {
        return {
          ...mut,
          status: 'active',
          timeline: [
            ...mut.timeline,
            {
              id: `tl-${Date.now()}`,
              type: 'modified',
              userId: currentUser.id,
              userName: currentUser.name,
              timestamp: new Date(),
              description: 'Started mutation execution'
            }
          ]
        };
      }
      return mut;
    }));
    
    toast({
      title: 'Mutation Started',
      description: 'Real-time mutation execution has begun',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [currentUser, toast]);

  const handleResolveConflict = useCallback((mutationId: string, conflictId: string, resolution: string) => {
    setMutations(prev => prev.map(mut => {
      if (mut.id === mutationId) {
        const updatedConflicts = mut.conflicts.map(conflict => 
          conflict.id === conflictId 
            ? { ...conflict, resolved: true, resolution: resolution as any }
            : conflict
        );
        
        return {
          ...mut,
          conflicts: updatedConflicts,
          timeline: [
            ...mut.timeline,
            {
              id: `tl-${Date.now()}`,
              type: 'modified',
              userId: currentUser.id,
              userName: currentUser.name,
              timestamp: new Date(),
              description: `Resolved conflict using ${resolution} strategy`
            }
          ]
        };
      }
      return mut;
    }));
    
    toast({
      title: 'Conflict Resolved',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  }, [currentUser, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposed': return 'blue';
      case 'in_review': return 'orange';
      case 'approved': return 'green';
      case 'active': return 'purple';
      case 'completed': return 'gray';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'green';
      case 'medium': return 'yellow';
      case 'high': return 'orange';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const renderMutationCard = (mutation: CollaborativeMutation) => (
    <Card key={mutation.id} mb={4} cursor="pointer" onClick={() => {
      setSelectedMutation(mutation);
      onDetailsOpen();
    }}>
      <CardHeader>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <HStack>
              <Text fontSize="lg" fontWeight="bold">{mutation.title}</Text>
              <Badge colorScheme={getStatusColor(mutation.status)}>{mutation.status}</Badge>
              <Badge colorScheme={getPriorityColor(mutation.priority)} variant="outline">
                {mutation.priority}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.600">{mutation.description}</Text>
          </VStack>
          <VStack align="end" spacing={1}>
            <AvatarGroup size="sm" max={3}>
              <Avatar name={mutation.initiator.name} bg="teal.500" size="sm">
                {mutation.initiator.avatar}
              </Avatar>
              {mutation.collaborators.map(collab => (
                <Avatar key={collab.id} name={collab.name} bg="blue.500" size="sm">
                  {collab.avatar}
                </Avatar>
              ))}
            </AvatarGroup>
            <Text fontSize="xs" color="gray.500">
              {mutation.collaborators.length + 1} collaborators
            </Text>
          </VStack>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack spacing={3}>
          <Box width="100%">
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm">Progress</Text>
              <Text fontSize="sm">{Math.round(mutation.progress)}%</Text>
            </HStack>
            <Progress 
              value={mutation.progress} 
              colorScheme={getStatusColor(mutation.status)}
              size="sm"
            />
          </Box>
          
          <HStack justify="space-between" width="100%">
            <HStack spacing={2}>
              {mutation.conflicts.length > 0 && (
                <Tooltip label={`${mutation.conflicts.length} unresolved conflicts`}>
                  <Badge colorScheme="red" variant="subtle">
                    <Icon as={FiAlertTriangle} mr={1} />
                    {mutation.conflicts.length}
                  </Badge>
                </Tooltip>
              )}
              {mutation.realTimeUpdates && (
                <Tooltip label="Real-time updates enabled">
                  <Badge colorScheme="green" variant="subtle">
                    <Icon as={FiRefreshCw} />
                  </Badge>
                </Tooltip>
              )}
            </HStack>
            
            <HStack spacing={2}>
              {mutation.status === 'proposed' && mutation.approvals.some(a => a.userId === currentUser.id && a.status === 'pending') && (
                <>
                  <Button 
                    size="xs" 
                    colorScheme="green" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApproveMutation(mutation.id, true);
                    }}
                  >
                    <Icon as={FiCheck} />
                  </Button>
                  <Button 
                    size="xs" 
                    colorScheme="red" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApproveMutation(mutation.id, false);
                    }}
                  >
                    <Icon as={FiX} />
                  </Button>
                </>
              )}
              
              {mutation.status === 'approved' && (
                <Button 
                  size="xs" 
                  colorScheme="purple" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartMutation(mutation.id);
                  }}
                >
                  <Icon as={FiPlay} mr={1} />
                  Start
                </Button>
              )}
            </HStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );

  const renderMutationDetails = () => {
    if (!selectedMutation) return null;

    return (
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text>{selectedMutation.title}</Text>
              <Badge colorScheme={getStatusColor(selectedMutation.status)}>
                {selectedMutation.status}
              </Badge>
              <Badge colorScheme={getPriorityColor(selectedMutation.priority)} variant="outline">
                {selectedMutation.priority}
              </Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Collaborators</Tab>
                <Tab>Timeline</Tab>
                <Tab>Conflicts</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Box>
                      <Text fontWeight="bold" mb={2}>Description</Text>
                      <Text>{selectedMutation.description}</Text>
                    </Box>
                    
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <Box>
                        <Text fontWeight="bold" mb={2}>Progress</Text>
                        <Progress 
                          value={selectedMutation.progress} 
                          colorScheme={getStatusColor(selectedMutation.status)}
                          size="lg"
                          mb={2}
                        />
                        <Text fontSize="sm">{Math.round(selectedMutation.progress)}% complete</Text>
                      </Box>
                      
                      <Box>
                        <Text fontWeight="bold" mb={2}>Timeline</Text>
                        <Text fontSize="sm">
                          Started: {selectedMutation.startDate.toLocaleDateString()}
                        </Text>
                        <Text fontSize="sm">
                          Target: {selectedMutation.targetDate.toLocaleDateString()}
                        </Text>
                      </Box>
                    </Grid>
                    
                    <Box>
                      <Text fontWeight="bold" mb={2}>Approvals</Text>
                      <VStack spacing={2} align="stretch">
                        {selectedMutation.approvals.map(approval => (
                          <HStack key={approval.userId} justify="space-between">
                            <Text>{approval.userName}</Text>
                            <Badge colorScheme={
                              approval.status === 'approved' ? 'green' : 
                              approval.status === 'rejected' ? 'red' : 'yellow'
                            }>
                              {approval.status}
                            </Badge>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Box>
                      <Text fontWeight="bold" mb={3}>Initiator</Text>
                      <HStack>
                        <Avatar size="md" bg="teal.500">
                          {selectedMutation.initiator.avatar}
                        </Avatar>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{selectedMutation.initiator.name}</Text>
                          <Text fontSize="sm" color="gray.600">{selectedMutation.initiator.role}</Text>
                          <Badge colorScheme={selectedMutation.initiator.isOnline ? 'green' : 'gray'} variant="subtle">
                            {selectedMutation.initiator.isOnline ? 'Online' : 'Offline'}
                          </Badge>
                        </VStack>
                      </HStack>
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Text fontWeight="bold" mb={3}>Collaborators</Text>
                      <VStack spacing={3} align="stretch">
                        {selectedMutation.collaborators.map(collaborator => (
                          <HStack key={collaborator.id} justify="space-between">
                            <HStack>
                              <Avatar size="sm" bg="blue.500">
                                {collaborator.avatar}
                              </Avatar>
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="medium">{collaborator.name}</Text>
                                <Text fontSize="sm" color="gray.600">{collaborator.role}</Text>
                              </VStack>
                            </HStack>
                            <Badge colorScheme={collaborator.isOnline ? 'green' : 'gray'} variant="subtle">
                              {collaborator.isOnline ? 'Online' : 'Offline'}
                            </Badge>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  <VStack spacing={3} align="stretch">
                    {selectedMutation.timeline.map(event => (
                      <HStack key={event.id} spacing={3}>
                        <Icon 
                          as={event.type === 'approved' ? FiCheck : 
                              event.type === 'rejected' ? FiX : 
                              event.type === 'completed' ? FiCheck : FiClock}
                          color={event.type === 'approved' ? 'green.500' : 
                                 event.type === 'rejected' ? 'red.500' : 
                                 event.type === 'completed' ? 'green.500' : 'blue.500'}
                        />
                        <VStack align="start" spacing={0} flex={1}>
                          <Text fontSize="sm" fontWeight="medium">{event.description}</Text>
                          <Text fontSize="xs" color="gray.600">
                            {event.userName} • {event.timestamp.toLocaleString()}
                          </Text>
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
                
                <TabPanel>
                  {selectedMutation.conflicts.length === 0 ? (
                    <Alert status="success">
                      <AlertIcon />
                      No conflicts detected
                    </Alert>
                  ) : (
                    <VStack spacing={4} align="stretch">
                      {selectedMutation.conflicts.map(conflict => (
                        <Card key={conflict.id}>
                          <CardBody>
                            <VStack align="stretch" spacing={3}>
                              <HStack justify="space-between">
                                <Badge colorScheme="red">{conflict.type}</Badge>
                                <Badge colorScheme={conflict.resolved ? 'green' : 'orange'}>
                                  {conflict.resolved ? 'Resolved' : 'Active'}
                                </Badge>
                              </HStack>
                              
                              <Text>{conflict.description}</Text>
                              
                              <Text fontSize="sm" color="gray.600">
                                Affects: {conflict.affectedUsers.join(', ')}
                              </Text>
                              
                              {!conflict.resolved && (
                                <HStack>
                                  <Button 
                                    size="sm" 
                                    colorScheme="blue"
                                    onClick={() => handleResolveConflict(selectedMutation.id, conflict.id, 'auto_merge')}
                                  >
                                    Auto Merge
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    colorScheme="orange"
                                    onClick={() => handleResolveConflict(selectedMutation.id, conflict.id, 'manual_review')}
                                  >
                                    Manual Review
                                  </Button>
                                </HStack>
                              )}
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">🤝 Collaborative Mutation Tracker</Text>
            <Text color="gray.600">Coordinate team-based strategy mutations in real-time</Text>
          </VStack>
          
          <HStack>
            <Button leftIcon={<FiSettings />} onClick={onSettingsOpen}>
              Settings
            </Button>
            <Button colorScheme="teal" leftIcon={<FiUsers />} onClick={onCreateOpen}>
              New Collaboration
            </Button>
          </HStack>
        </HStack>

        {/* Real-time Status */}
        {collaborationSettings.realTimeSync && (
          <Alert status="info">
            <AlertIcon />
            <HStack>
              <Spinner size="sm" />
              <Text>Real-time collaboration sync active</Text>
            </HStack>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Active Mutations ({mutations.filter(m => m.status === 'active').length})</Tab>
            <Tab>Pending Review ({mutations.filter(m => m.status === 'in_review' || m.status === 'proposed').length})</Tab>
            <Tab>Completed ({mutations.filter(m => m.status === 'completed').length})</Tab>
            <Tab>All ({mutations.length})</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              {mutations.filter(m => m.status === 'active').map(renderMutationCard)}
              {mutations.filter(m => m.status === 'active').length === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  No active mutations currently running
                </Alert>
              )}
            </TabPanel>
            
            <TabPanel>
              {mutations.filter(m => m.status === 'in_review' || m.status === 'proposed').map(renderMutationCard)}
              {mutations.filter(m => m.status === 'in_review' || m.status === 'proposed').length === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  No mutations pending review
                </Alert>
              )}
            </TabPanel>
            
            <TabPanel>
              {mutations.filter(m => m.status === 'completed').map(renderMutationCard)}
              {mutations.filter(m => m.status === 'completed').length === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  No completed mutations yet
                </Alert>
              )}
            </TabPanel>
            
            <TabPanel>
              {mutations.map(renderMutationCard)}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Mutation Details Modal */}
      {renderMutationDetails()}

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Collaboration Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="auto-approval" mb={0} flex={1}>
                  Auto Approval
                </FormLabel>
                <Switch 
                  id="auto-approval"
                  isChecked={collaborationSettings.autoApproval}
                  onChange={(e) => setCollaborationSettings(prev => ({
                    ...prev,
                    autoApproval: e.target.checked
                  }))}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="real-time-sync" mb={0} flex={1}>
                  Real-time Sync
                </FormLabel>
                <Switch 
                  id="real-time-sync"
                  isChecked={collaborationSettings.realTimeSync}
                  onChange={(e) => setCollaborationSettings(prev => ({
                    ...prev,
                    realTimeSync: e.target.checked
                  }))}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Conflict Resolution</FormLabel>
                <Select 
                  value={collaborationSettings.conflictResolution}
                  onChange={(e) => setCollaborationSettings(prev => ({
                    ...prev,
                    conflictResolution: e.target.value as any
                  }))}
                >
                  <option value="auto_merge">Auto Merge</option>
                  <option value="manual_review">Manual Review</option>
                  <option value="first_wins">First Wins</option>
                  <option value="last_wins">Last Wins</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Notification Level</FormLabel>
                <Select 
                  value={collaborationSettings.notificationLevel}
                  onChange={(e) => setCollaborationSettings(prev => ({
                    ...prev,
                    notificationLevel: e.target.value as any
                  }))}
                >
                  <option value="all">All Updates</option>
                  <option value="important">Important Only</option>
                  <option value="minimal">Minimal</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSettingsClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create Collaboration Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Start New Collaboration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="info" mb={4}>
              <AlertIcon />
              This feature will integrate with your existing strategy frameworks
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCreateClose}>Cancel</Button>
            <Button colorScheme="teal">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CollaborativeMutationTracker;