import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  AlertIcon,
  Badge,
  IconButton,
  Tooltip,
  Progress,
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
  Code,
  Textarea,
  Input,
  useToast,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react';
import { 
  FiRotateCcw, 
  FiRotateCw, 
  FiSave, 
  FiClock, 
  FiGitBranch,
  FiRewind,
  FiFastForward,
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiDatabase,
  FiLayers,
  FiTrendingUp,
  FiActivity,
  FiTarget,
  FiZap
} from 'react-icons/fi';

interface MutationSnapshot {
  id: string;
  timestamp: Date;
  type: 'manual' | 'auto' | 'checkpoint' | 'branch';
  title: string;
  description: string;
  framework: 'blue_ocean' | 'porter_forces' | 'bpmn_process' | 'strategy_canvas';
  data: any;
  metadata: {
    userId: string;
    userName: string;
    version: string;
    fileSize: number;
    changes: string[];
    performance: {
      executionTime: number;
      memoryUsage: number;
      complexity: number;
    };
  };
  parentId?: string;
  branchName?: string;
  tags: string[];
}

interface MutationBranch {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  snapshots: string[];
  isActive: boolean;
  mergeConflicts: number;
}

interface HistoryStats {
  totalSnapshots: number;
  totalBranches: number;
  storageUsed: number;
  averageSnapshotSize: number;
  undoCount: number;
  redoCount: number;
  branchSwitches: number;
  performanceScore: number;
}

const MutationHistoryManager: React.FC = () => {
  const [snapshots, setSnapshots] = useState<MutationSnapshot[]>([]);
  const [branches, setBranches] = useState<MutationBranch[]>([]);
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(-1);
  const [activeBranch, setActiveBranch] = useState<string>('main');
  const [historyStats, setHistoryStats] = useState<HistoryStats>({
    totalSnapshots: 0,
    totalBranches: 1,
    storageUsed: 0,
    averageSnapshotSize: 0,
    undoCount: 0,
    redoCount: 0,
    branchSwitches: 0,
    performanceScore: 95
  });
  const [selectedSnapshot, setSelectedSnapshot] = useState<MutationSnapshot | null>(null);
  const [isAutoSave, setIsAutoSave] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30);
  const [maxHistorySize, setMaxHistorySize] = useState(100);
  const [compressionEnabled, setCompressionEnabled] = useState(true);
  const [playbackMode, setPlaybackMode] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playbackIndex, setPlaybackIndex] = useState(0);
  
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isBranchOpen, onOpen: onBranchOpen, onClose: onBranchClose } = useDisclosure();
  const toast = useToast();
  const playbackTimer = useRef<NodeJS.Timeout>();

  // Initialize with sample data
  useEffect(() => {
    const sampleSnapshots: MutationSnapshot[] = [
      {
        id: 'snap-1',
        timestamp: new Date(Date.now() - 3600000),
        type: 'checkpoint',
        title: 'Initial Blue Ocean Canvas',
        description: 'Created initial value proposition canvas with 4 eliminate factors',
        framework: 'blue_ocean',
        data: {
          eliminate: ['Traditional distribution', 'Complex pricing', 'High maintenance', 'Manual processes'],
          reduce: ['Product complexity', 'Training requirements'],
          raise: ['User experience', 'Automation level'],
          create: ['AI-powered insights', 'Real-time collaboration']
        },
        metadata: {
          userId: 'user-1',
          userName: 'Strategy Analyst',
          version: '1.0.0',
          fileSize: 2048,
          changes: ['Added eliminate factors', 'Defined value proposition'],
          performance: {
            executionTime: 150,
            memoryUsage: 45,
            complexity: 3
          }
        },
        tags: ['initial', 'blue_ocean', 'canvas']
      },
      {
        id: 'snap-2',
        timestamp: new Date(Date.now() - 2700000),
        type: 'auto',
        title: 'Market Forces Adjustment',
        description: 'Auto-updated competitive forces based on market intelligence data',
        framework: 'porter_forces',
        data: {
          buyerPower: { intensity: 65, factors: ['Price sensitivity', 'Switching costs'] },
          supplierPower: { intensity: 40, factors: ['Resource availability', 'Differentiation'] },
          newEntrants: { intensity: 75, factors: ['Low barriers', 'Technology access'] },
          substitutes: { intensity: 30, factors: ['Limited alternatives', 'High switching costs'] },
          rivalry: { intensity: 80, factors: ['Many competitors', 'Price competition'] }
        },
        metadata: {
          userId: 'system',
          userName: 'Auto-Update System',
          version: '1.1.0',
          fileSize: 3124,
          changes: ['Updated buyer power', 'Adjusted rivalry intensity'],
          performance: {
            executionTime: 89,
            memoryUsage: 38,
            complexity: 4
          }
        },
        tags: ['auto', 'porter_forces', 'intelligence']
      },
      {
        id: 'snap-3',
        timestamp: new Date(Date.now() - 1800000),
        type: 'manual',
        title: 'Process Flow Optimization',
        description: 'Manually optimized BPMN process flow for better efficiency',
        framework: 'bpmn_process',
        data: {
          elements: [
            { id: 'start', type: 'start', position: { x: 100, y: 100 } },
            { id: 'task1', type: 'task', label: 'Data Collection', position: { x: 250, y: 100 } },
            { id: 'gateway', type: 'gateway', position: { x: 400, y: 100 } },
            { id: 'task2', type: 'task', label: 'Analysis', position: { x: 550, y: 100 } },
            { id: 'end', type: 'end', position: { x: 700, y: 100 } }
          ],
          connections: [
            { from: 'start', to: 'task1' },
            { from: 'task1', to: 'gateway' },
            { from: 'gateway', to: 'task2' },
            { from: 'task2', to: 'end' }
          ]
        },
        metadata: {
          userId: 'user-2',
          userName: 'Process Designer',
          version: '1.2.0',
          fileSize: 4567,
          changes: ['Added gateway element', 'Optimized flow connections'],
          performance: {
            executionTime: 245,
            memoryUsage: 52,
            complexity: 5
          }
        },
        tags: ['manual', 'bpmn', 'optimization']
      }
    ];

    const sampleBranches: MutationBranch[] = [
      {
        id: 'main',
        name: 'Main',
        description: 'Primary development branch',
        createdAt: new Date(Date.now() - 7200000),
        snapshots: ['snap-1', 'snap-2', 'snap-3'],
        isActive: true,
        mergeConflicts: 0
      },
      {
        id: 'experimental',
        name: 'Experimental',
        description: 'Testing new mutation algorithms',
        createdAt: new Date(Date.now() - 3600000),
        snapshots: ['snap-1'],
        isActive: false,
        mergeConflicts: 2
      }
    ];

    setSnapshots(sampleSnapshots);
    setBranches(sampleBranches);
    setCurrentSnapshotIndex(sampleSnapshots.length - 1);
    
    // Update stats
    const totalSize = sampleSnapshots.reduce((sum, snap) => sum + snap.metadata.fileSize, 0);
    setHistoryStats(prev => ({
      ...prev,
      totalSnapshots: sampleSnapshots.length,
      storageUsed: totalSize,
      averageSnapshotSize: totalSize / sampleSnapshots.length
    }));
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (!isAutoSave) return;

    const interval = setInterval(() => {
      createSnapshot('auto', 'Auto-save checkpoint', 'Automatic save point created');
    }, autoSaveInterval * 1000);

    return () => clearInterval(interval);
  }, [isAutoSave, autoSaveInterval]);

  // Playback functionality
  useEffect(() => {
    if (!playbackMode) return;

    playbackTimer.current = setInterval(() => {
      setPlaybackIndex(prev => {
        const newIndex = prev + 1;
        if (newIndex >= snapshots.length) {
          setPlaybackMode(false);
          return 0;
        }
        return newIndex;
      });
    }, 1000 / playbackSpeed);

    return () => {
      if (playbackTimer.current) {
        clearInterval(playbackTimer.current);
      }
    };
  }, [playbackMode, playbackSpeed, snapshots.length]);

  const createSnapshot = useCallback((type: 'manual' | 'auto' | 'checkpoint', title: string, description: string) => {
    const newSnapshot: MutationSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date(),
      type,
      title,
      description,
      framework: 'blue_ocean',
      data: { placeholder: 'Current mutation state' },
      metadata: {
        userId: 'user-1',
        userName: 'Current User',
        version: '1.0.0',
        fileSize: Math.floor(Math.random() * 5000) + 1000,
        changes: [`${type} snapshot created`],
        performance: {
          executionTime: Math.floor(Math.random() * 200) + 50,
          memoryUsage: Math.floor(Math.random() * 100) + 20,
          complexity: Math.floor(Math.random() * 5) + 1
        }
      },
      parentId: snapshots.length > 0 ? snapshots[currentSnapshotIndex]?.id : undefined,
      branchName: activeBranch,
      tags: [type, 'recent']
    };

    setSnapshots(prev => {
      const newSnapshots = [...prev, newSnapshot];
      // Trim to max size if needed
      if (newSnapshots.length > maxHistorySize) {
        return newSnapshots.slice(-maxHistorySize);
      }
      return newSnapshots;
    });
    
    setCurrentSnapshotIndex(prev => prev + 1);
    
    // Update branch
    setBranches(prev => prev.map(branch => 
      branch.id === activeBranch 
        ? { ...branch, snapshots: [...branch.snapshots, newSnapshot.id] }
        : branch
    ));

    toast({
      title: 'Snapshot Created',
      description: `${type} snapshot "${title}" saved`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  }, [snapshots, currentSnapshotIndex, activeBranch, maxHistorySize, toast]);

  const undoMutation = useCallback(() => {
    if (currentSnapshotIndex > 0) {
      setCurrentSnapshotIndex(prev => prev - 1);
      setHistoryStats(prev => ({ ...prev, undoCount: prev.undoCount + 1 }));
      
      toast({
        title: 'Undo Applied',
        description: 'Reverted to previous snapshot',
        status: 'info',
        duration: 1500,
        isClosable: true,
      });
    }
  }, [currentSnapshotIndex, toast]);

  const redoMutation = useCallback(() => {
    if (currentSnapshotIndex < snapshots.length - 1) {
      setCurrentSnapshotIndex(prev => prev + 1);
      setHistoryStats(prev => ({ ...prev, redoCount: prev.redoCount + 1 }));
      
      toast({
        title: 'Redo Applied',
        description: 'Advanced to next snapshot',
        status: 'info',
        duration: 1500,
        isClosable: true,
      });
    }
  }, [currentSnapshotIndex, snapshots.length, toast]);

  const jumpToSnapshot = useCallback((snapshotId: string) => {
    const index = snapshots.findIndex(s => s.id === snapshotId);
    if (index !== -1) {
      setCurrentSnapshotIndex(index);
      
      toast({
        title: 'Jumped to Snapshot',
        description: `Restored to "${snapshots[index].title}"`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [snapshots, toast]);

  const createBranch = useCallback((name: string, description: string) => {
    const newBranch: MutationBranch = {
      id: `branch-${Date.now()}`,
      name,
      description,
      createdAt: new Date(),
      snapshots: currentSnapshotIndex >= 0 ? [snapshots[currentSnapshotIndex].id] : [],
      isActive: false,
      mergeConflicts: 0
    };

    setBranches(prev => [...prev, newBranch]);
    
    toast({
      title: 'Branch Created',
      description: `New branch "${name}" created from current snapshot`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  }, [snapshots, currentSnapshotIndex, toast]);

  const switchBranch = useCallback((branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (branch) {
      setBranches(prev => prev.map(b => ({ ...b, isActive: b.id === branchId })));
      setActiveBranch(branchId);
      
      // Jump to latest snapshot in this branch
      if (branch.snapshots.length > 0) {
        const latestSnapshotId = branch.snapshots[branch.snapshots.length - 1];
        jumpToSnapshot(latestSnapshotId);
      }
      
      setHistoryStats(prev => ({ ...prev, branchSwitches: prev.branchSwitches + 1 }));
      
      toast({
        title: 'Branch Switched',
        description: `Switched to branch "${branch.name}"`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [branches, jumpToSnapshot, toast]);

  const startPlayback = useCallback(() => {
    setPlaybackMode(true);
    setPlaybackIndex(0);
    
    toast({
      title: 'Playback Started',
      description: 'Playing back mutation history',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  }, [toast]);

  const stopPlayback = useCallback(() => {
    setPlaybackMode(false);
    setPlaybackIndex(0);
    
    if (playbackTimer.current) {
      clearInterval(playbackTimer.current);
    }
    
    toast({
      title: 'Playback Stopped',
      status: 'info',
      duration: 1000,
      isClosable: true,
    });
  }, [toast]);

  const getSnapshotTypeColor = (type: string) => {
    switch (type) {
      case 'manual': return 'blue';
      case 'auto': return 'green';
      case 'checkpoint': return 'purple';
      case 'branch': return 'orange';
      default: return 'gray';
    }
  };

  const renderSnapshotCard = (snapshot: MutationSnapshot, index: number) => {
    const isCurrent = index === currentSnapshotIndex;
    const isPlayback = playbackMode && index === playbackIndex;
    
    return (
      <Card 
        key={snapshot.id} 
        mb={3} 
        borderColor={isCurrent ? 'teal.500' : isPlayback ? 'purple.500' : 'gray.200'}
        borderWidth={isCurrent || isPlayback ? 2 : 1}
        cursor="pointer"
        onClick={() => {
          setSelectedSnapshot(snapshot);
          onDetailsOpen();
        }}
      >
        <CardBody>
          <VStack spacing={3} align="stretch">
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <HStack>
                  <Text fontSize="md" fontWeight="bold">{snapshot.title}</Text>
                  <Badge colorScheme={getSnapshotTypeColor(snapshot.type)}>
                    {snapshot.type}
                  </Badge>
                  {isCurrent && <Badge colorScheme="teal">Current</Badge>}
                  {isPlayback && <Badge colorScheme="purple">Playing</Badge>}
                </HStack>
                <Text fontSize="sm" color="gray.600">{snapshot.description}</Text>
              </VStack>
              
              <VStack align="end" spacing={1}>
                <Text fontSize="xs" color="gray.500">
                  {snapshot.timestamp.toLocaleString()}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {snapshot.metadata.userName}
                </Text>
              </VStack>
            </HStack>
            
            <HStack justify="space-between">
              <HStack spacing={2}>
                {snapshot.tags.map(tag => (
                  <Badge key={tag} size="sm" variant="outline">{tag}</Badge>
                ))}
              </HStack>
              
              <HStack spacing={1}>
                <Button 
                  size="xs" 
                  colorScheme="teal" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpToSnapshot(snapshot.id);
                  }}
                >
                  <FiRotateCcw />
                </Button>
                <Text fontSize="xs" color="gray.500">
                  {(snapshot.metadata.fileSize / 1024).toFixed(1)}KB
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">⏱️ Mutation History Manager</Text>
            <Text color="gray.600">Undo, redo, and track all mutation changes with branching support</Text>
          </VStack>
          
          <HStack>
            <Button 
              leftIcon={<FiRotateCcw />} 
              isDisabled={currentSnapshotIndex <= 0}
              onClick={undoMutation}
            >
              Undo
            </Button>
            <Button 
              leftIcon={<FiRotateCw />} 
              isDisabled={currentSnapshotIndex >= snapshots.length - 1}
              onClick={redoMutation}
            >
              Redo
            </Button>
            <Button 
              leftIcon={<FiSave />} 
              colorScheme="teal"
              onClick={() => createSnapshot('manual', 'Manual Checkpoint', 'User-created save point')}
            >
              Save Checkpoint
            </Button>
          </HStack>
        </HStack>

        {/* Stats Dashboard */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem>
            <Stat>
              <StatLabel>Total Snapshots</StatLabel>
              <StatNumber>{historyStats.totalSnapshots}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +{historyStats.undoCount + historyStats.redoCount} operations
              </StatHelpText>
            </Stat>
          </GridItem>
          
          <GridItem>
            <Stat>
              <StatLabel>Storage Used</StatLabel>
              <StatNumber>{(historyStats.storageUsed / 1024).toFixed(1)}KB</StatNumber>
              <StatHelpText>
                Avg: {(historyStats.averageSnapshotSize / 1024).toFixed(1)}KB per snapshot
              </StatHelpText>
            </Stat>
          </GridItem>
          
          <GridItem>
            <Stat>
              <StatLabel>Active Branches</StatLabel>
              <StatNumber>{historyStats.totalBranches}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {historyStats.branchSwitches} switches
              </StatHelpText>
            </Stat>
          </GridItem>
          
          <GridItem>
            <Stat>
              <StatLabel>Performance Score</StatLabel>
              <StatNumber>{historyStats.performanceScore}%</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                System efficiency
              </StatHelpText>
            </Stat>
          </GridItem>
        </Grid>

        {/* Controls */}
        <Card>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">History Controls</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="auto-save" mb={0} flex={1}>
                    Auto-save enabled
                  </FormLabel>
                  <Switch 
                    id="auto-save"
                    isChecked={isAutoSave}
                    onChange={(e) => setIsAutoSave(e.target.checked)}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Auto-save interval (seconds)</FormLabel>
                  <Slider
                    value={autoSaveInterval}
                    onChange={setAutoSaveInterval}
                    min={10}
                    max={300}
                    step={10}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Text fontSize="sm" color="gray.600">{autoSaveInterval}s</Text>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Max history size</FormLabel>
                  <Select 
                    value={maxHistorySize}
                    onChange={(e) => setMaxHistorySize(parseInt(e.target.value))}
                  >
                    <option value="50">50 snapshots</option>
                    <option value="100">100 snapshots</option>
                    <option value="200">200 snapshots</option>
                    <option value="500">500 snapshots</option>
                  </Select>
                </FormControl>
              </VStack>
              
              <VStack spacing={4} align="stretch">
                <Text fontWeight="medium">Playback Controls</Text>
                
                <HStack>
                  {!playbackMode ? (
                    <Button leftIcon={<FiPlay />} onClick={startPlayback}>
                      Start Playback
                    </Button>
                  ) : (
                    <Button leftIcon={<FiPause />} onClick={stopPlayback}>
                      Stop Playback
                    </Button>
                  )}
                  
                  <IconButton 
                    aria-label="Skip to start"
                    icon={<FiSkipBack />}
                    onClick={() => setPlaybackIndex(0)}
                  />
                  <IconButton 
                    aria-label="Skip to end"
                    icon={<FiSkipForward />}
                    onClick={() => setPlaybackIndex(snapshots.length - 1)}
                  />
                </HStack>
                
                <FormControl>
                  <FormLabel>Playback speed</FormLabel>
                  <Slider
                    value={playbackSpeed}
                    onChange={setPlaybackSpeed}
                    min={0.1}
                    max={5}
                    step={0.1}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Text fontSize="sm" color="gray.600">{playbackSpeed}x speed</Text>
                </FormControl>
                
                {playbackMode && (
                  <Progress 
                    value={(playbackIndex / Math.max(1, snapshots.length - 1)) * 100} 
                    colorScheme="purple"
                    size="lg"
                  />
                )}
              </VStack>
            </Grid>
          </CardBody>
        </Card>

        {/* Branch Management */}
        <Card>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Branch Management</Text>
              <Button leftIcon={<FiGitBranch />} size="sm" onClick={onBranchOpen}>
                New Branch
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <HStack spacing={4} wrap="wrap">
              {branches.map(branch => (
                <Button
                  key={branch.id}
                  variant={branch.isActive ? 'solid' : 'outline'}
                  colorScheme={branch.isActive ? 'teal' : 'gray'}
                  leftIcon={<FiGitBranch />}
                  onClick={() => switchBranch(branch.id)}
                >
                  {branch.name}
                  <Badge ml={2} colorScheme={branch.mergeConflicts > 0 ? 'red' : 'green'}>
                    {branch.snapshots.length}
                  </Badge>
                </Button>
              ))}
            </HStack>
          </CardBody>
        </Card>

        {/* Snapshot History */}
        <Tabs>
          <TabList>
            <Tab>Timeline ({snapshots.length})</Tab>
            <Tab>Current Branch ({branches.find(b => b.isActive)?.snapshots.length || 0})</Tab>
            <Tab>Performance Metrics</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <VStack spacing={3} align="stretch">
                {snapshots.length === 0 ? (
                  <Alert status="info">
                    <AlertIcon />
                    No snapshots available. Create your first checkpoint to begin tracking history.
                  </Alert>
                ) : (
                  snapshots.map(renderSnapshotCard).reverse()
                )}
              </VStack>
            </TabPanel>
            
            <TabPanel>
              <VStack spacing={3} align="stretch">
                {branches.find(b => b.isActive)?.snapshots.map(snapshotId => {
                  const snapshot = snapshots.find(s => s.id === snapshotId);
                  if (!snapshot) return null;
                  const index = snapshots.indexOf(snapshot);
                  return renderSnapshotCard(snapshot, index);
                }) || (
                  <Alert status="info">
                    <AlertIcon />
                    No snapshots in current branch
                  </Alert>
                )}
              </VStack>
            </TabPanel>
            
            <TabPanel>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <Card>
                  <CardBody>
                    <Stat>
                      <StatLabel>Avg Execution Time</StatLabel>
                      <StatNumber>
                        {snapshots.length > 0 
                          ? Math.round(snapshots.reduce((sum, s) => sum + s.metadata.performance.executionTime, 0) / snapshots.length)
                          : 0
                        }ms
                      </StatNumber>
                    </Stat>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardBody>
                    <Stat>
                      <StatLabel>Avg Memory Usage</StatLabel>
                      <StatNumber>
                        {snapshots.length > 0 
                          ? Math.round(snapshots.reduce((sum, s) => sum + s.metadata.performance.memoryUsage, 0) / snapshots.length)
                          : 0
                        }MB
                      </StatNumber>
                    </Stat>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardBody>
                    <Stat>
                      <StatLabel>Avg Complexity</StatLabel>
                      <StatNumber>
                        {snapshots.length > 0 
                          ? (snapshots.reduce((sum, s) => sum + s.metadata.performance.complexity, 0) / snapshots.length).toFixed(1)
                          : 0
                        }
                      </StatNumber>
                    </Stat>
                  </CardBody>
                </Card>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Snapshot Details Modal */}
      {selectedSnapshot && (
        <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Text>{selectedSnapshot.title}</Text>
                <Badge colorScheme={getSnapshotTypeColor(selectedSnapshot.type)}>
                  {selectedSnapshot.type}
                </Badge>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" mb={2}>Description</Text>
                  <Text>{selectedSnapshot.description}</Text>
                </Box>
                
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Box>
                    <Text fontWeight="bold" mb={2}>Metadata</Text>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm">User: {selectedSnapshot.metadata.userName}</Text>
                      <Text fontSize="sm">Version: {selectedSnapshot.metadata.version}</Text>
                      <Text fontSize="sm">File Size: {(selectedSnapshot.metadata.fileSize / 1024).toFixed(1)}KB</Text>
                      <Text fontSize="sm">Timestamp: {selectedSnapshot.timestamp.toLocaleString()}</Text>
                    </VStack>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold" mb={2}>Performance</Text>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm">Execution: {selectedSnapshot.metadata.performance.executionTime}ms</Text>
                      <Text fontSize="sm">Memory: {selectedSnapshot.metadata.performance.memoryUsage}MB</Text>
                      <Text fontSize="sm">Complexity: {selectedSnapshot.metadata.performance.complexity}/5</Text>
                    </VStack>
                  </Box>
                </Grid>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>Changes</Text>
                  <VStack align="start" spacing={1}>
                    {selectedSnapshot.metadata.changes.map((change, index) => (
                      <Text key={index} fontSize="sm">• {change}</Text>
                    ))}
                  </VStack>
                </Box>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>Data Preview</Text>
                  <Code p={4} borderRadius="md" overflow="auto" maxH="200px">
                    {JSON.stringify(selectedSnapshot.data, null, 2)}
                  </Code>
                </Box>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button 
                colorScheme="teal" 
                mr={3}
                onClick={() => {
                  jumpToSnapshot(selectedSnapshot.id);
                  onDetailsClose();
                }}
              >
                Restore This Snapshot
              </Button>
              <Button variant="ghost" onClick={onDetailsClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Create Branch Modal */}
      <Modal isOpen={isBranchOpen} onClose={onBranchClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Branch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Branch Name</FormLabel>
                <Input placeholder="feature/new-algorithm" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Describe what this branch will be used for..." />
              </FormControl>
              
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  New branch will be created from the current snapshot and become active.
                </Text>
              </Alert>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onBranchClose}>Cancel</Button>
            <Button 
              colorScheme="teal" 
              onClick={() => {
                createBranch("New Feature", "Feature development branch");
                onBranchClose();
              }}
            >
              Create Branch
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MutationHistoryManager;