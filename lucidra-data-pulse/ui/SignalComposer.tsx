import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Flex,
  Grid,
  GridItem,
  Divider,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Tooltip,
  Progress,
  Spinner
} from '@chakra-ui/react';
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaCopy,
  FaSave,
  FaPlay,
  FaPause,
  FaCog,
  FaFilter,
  FaChartLine,
  FaTable,
  FaMap,
  FaBell,
  FaCode,
  FaEye,
  FaExpand,
  FaCompress,
  FaDragHandle,
  FaRss,
  FaDownload,
  FaShare,
  FaInfoCircle
} from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DataPulseWidget from './DataPulseWidget';

interface SignalDefinition {
  id: string;
  name: string;
  description: string;
  type: 'social' | 'financial' | 'product' | 'mixed';
  sources: string[];
  filters: any;
  thresholds: any;
  isActive: boolean;
  created: Date;
  lastTriggered?: Date;
}

interface WidgetConfig {
  id: string;
  type: 'chart' | 'table' | 'metric' | 'alert' | 'feed';
  title: string;
  signalId: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number; w: number; h: number };
  config: any;
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: WidgetConfig[];
  layout: 'grid' | 'freeform';
  isPublic: boolean;
  tags: string[];
  refreshInterval: number;
}

const SignalComposer: React.FC = () => {
  const [signals, setSignals] = useState<SignalDefinition[]>([]);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [activeDashboard, setActiveDashboard] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<SignalDefinition | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [gridSize, setGridSize] = useState({ cols: 12, rows: 8 });
  
  const { isOpen: isSignalModalOpen, onOpen: onSignalModalOpen, onClose: onSignalModalClose } = useDisclosure();
  const { isOpen: isDashboardModalOpen, onOpen: onDashboardModalOpen, onClose: onDashboardModalClose } = useDisclosure();
  const { isOpen: isWidgetModalOpen, onOpen: onWidgetModalOpen, onClose: onWidgetModalClose } = useDisclosure();

  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Initialize with sample data
  React.useEffect(() => {
    const sampleSignals: SignalDefinition[] = [
      {
        id: 'signal-1',
        name: 'AI Sentiment Surge',
        description: 'Detect positive sentiment spikes about AI technologies',
        type: 'social',
        sources: ['twitter', 'reddit', 'news'],
        filters: {
          keywords: ['AI', 'artificial intelligence', 'machine learning'],
          sentimentThreshold: 0.6,
          volumeThreshold: 1000
        },
        thresholds: {
          alertThreshold: 0.8,
          trendDuration: '1h'
        },
        isActive: true,
        created: new Date(Date.now() - 86400000),
        lastTriggered: new Date(Date.now() - 3600000)
      },
      {
        id: 'signal-2',
        name: 'Market Volatility Alert',
        description: 'Monitor high volatility in tech stocks',
        type: 'financial',
        sources: ['yahoo_finance', 'alpha_vantage'],
        filters: {
          symbols: ['AAPL', 'GOOGL', 'MSFT', 'AMZN'],
          volatilityThreshold: 5.0
        },
        thresholds: {
          alertThreshold: 7.0,
          cooldownMinutes: 30
        },
        isActive: true,
        created: new Date(Date.now() - 172800000),
        lastTriggered: new Date(Date.now() - 1800000)
      },
      {
        id: 'signal-3',
        name: 'Product Launch Tracker',
        description: 'Track emerging product trends and launches',
        type: 'product',
        sources: ['google_trends', 'amazon', 'product_hunt'],
        filters: {
          categories: ['electronics', 'software'],
          searchGrowthThreshold: 50
        },
        thresholds: {
          alertThreshold: 100,
          trendDuration: '7d'
        },
        isActive: false,
        created: new Date(Date.now() - 259200000)
      }
    ];

    const sampleDashboard: Dashboard = {
      id: 'dashboard-1',
      name: 'Strategic Intelligence Hub',
      description: 'Real-time strategic intelligence dashboard',
      widgets: [
        {
          id: 'widget-1',
          type: 'chart',
          title: 'AI Sentiment Timeline',
          signalId: 'signal-1',
          size: 'large',
          position: { x: 0, y: 0, w: 6, h: 4 },
          config: { chartType: 'line', timeframe: '24h' }
        },
        {
          id: 'widget-2',
          type: 'metric',
          title: 'Market Volatility',
          signalId: 'signal-2',
          size: 'medium',
          position: { x: 6, y: 0, w: 3, h: 2 },
          config: { format: 'percentage', showTrend: true }
        },
        {
          id: 'widget-3',
          type: 'feed',
          title: 'Product Trends',
          signalId: 'signal-3',
          size: 'medium',
          position: { x: 9, y: 0, w: 3, h: 4 },
          config: { maxItems: 10, showSource: true }
        }
      ],
      layout: 'grid',
      isPublic: false,
      tags: ['AI', 'market', 'intelligence'],
      refreshInterval: 30000
    };

    setSignals(sampleSignals);
    setDashboards([sampleDashboard]);
    setActiveDashboard(sampleDashboard.id);
  }, []);

  const handleCreateSignal = useCallback(() => {
    setSelectedSignal(null);
    onSignalModalOpen();
  }, [onSignalModalOpen]);

  const handleEditSignal = useCallback((signal: SignalDefinition) => {
    setSelectedSignal(signal);
    onSignalModalOpen();
  }, [onSignalModalOpen]);

  const handleDeleteSignal = useCallback((signalId: string) => {
    setSignals(prev => prev.filter(s => s.id !== signalId));
    toast({
      title: 'Signal Deleted',
      description: 'Signal has been successfully deleted',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  const handleToggleSignal = useCallback((signalId: string) => {
    setSignals(prev => prev.map(s => 
      s.id === signalId ? { ...s, isActive: !s.isActive } : s
    ));
  }, []);

  const handleSaveSignal = useCallback((signalData: any) => {
    if (selectedSignal) {
      // Update existing signal
      setSignals(prev => prev.map(s => 
        s.id === selectedSignal.id ? { ...s, ...signalData } : s
      ));
      toast({
        title: 'Signal Updated',
        description: 'Signal has been successfully updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Create new signal
      const newSignal: SignalDefinition = {
        id: `signal-${Date.now()}`,
        ...signalData,
        created: new Date(),
        isActive: true
      };
      setSignals(prev => [...prev, newSignal]);
      toast({
        title: 'Signal Created',
        description: 'New signal has been successfully created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    onSignalModalClose();
  }, [selectedSignal, toast, onSignalModalClose]);

  const handleCreateDashboard = useCallback(() => {
    onDashboardModalOpen();
  }, [onDashboardModalOpen]);

  const handleSaveDashboard = useCallback((dashboardData: any) => {
    const newDashboard: Dashboard = {
      id: `dashboard-${Date.now()}`,
      ...dashboardData,
      widgets: []
    };
    setDashboards(prev => [...prev, newDashboard]);
    setActiveDashboard(newDashboard.id);
    onDashboardModalClose();
    toast({
      title: 'Dashboard Created',
      description: 'New dashboard has been successfully created',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [toast, onDashboardModalClose]);

  const handleAddWidget = useCallback((widgetData: any) => {
    if (!activeDashboard) return;

    const newWidget: WidgetConfig = {
      id: `widget-${Date.now()}`,
      ...widgetData,
      position: { x: 0, y: 0, w: 4, h: 3 } // Default position
    };

    setDashboards(prev => prev.map(d => 
      d.id === activeDashboard 
        ? { ...d, widgets: [...d.widgets, newWidget] }
        : d
    ));

    onWidgetModalClose();
    toast({
      title: 'Widget Added',
      description: 'Widget has been added to dashboard',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, [activeDashboard, toast, onWidgetModalClose]);

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination || !activeDashboard) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    setDashboards(prev => prev.map(d => {
      if (d.id === activeDashboard) {
        const newWidgets = [...d.widgets];
        const [removed] = newWidgets.splice(sourceIndex, 1);
        newWidgets.splice(destIndex, 0, removed);
        return { ...d, widgets: newWidgets };
      }
      return d;
    }));
  }, [activeDashboard]);

  const renderSignalBuilder = () => (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Heading size="md">Signal Definitions</Heading>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="teal"
          size="sm"
          onClick={handleCreateSignal}
        >
          Create Signal
        </Button>
      </HStack>

      <VStack spacing={3} align="stretch">
        {signals.map(signal => (
          <Card key={signal.id} bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <HStack justify="space-between" align="start">
                <VStack align="start" spacing={1} flex={1}>
                  <HStack>
                    <Text fontWeight="bold">{signal.name}</Text>
                    <Badge colorScheme={signal.isActive ? 'green' : 'gray'}>
                      {signal.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge colorScheme="blue" variant="outline">
                      {signal.type}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    {signal.description}
                  </Text>
                  <HStack spacing={4} fontSize="xs" color="gray.500">
                    <Text>Sources: {signal.sources.join(', ')}</Text>
                    <Text>Created: {signal.created.toLocaleDateString()}</Text>
                    {signal.lastTriggered && (
                      <Text>Last triggered: {signal.lastTriggered.toLocaleString()}</Text>
                    )}
                  </HStack>
                </VStack>
                <HStack>
                  <Switch
                    isChecked={signal.isActive}
                    onChange={() => handleToggleSignal(signal.id)}
                    size="sm"
                  />
                  <IconButton
                    icon={<FaEdit />}
                    size="sm"
                    variant="ghost"
                    aria-label="Edit signal"
                    onClick={() => handleEditSignal(signal)}
                  />
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Delete signal"
                    onClick={() => handleDeleteSignal(signal.id)}
                  />
                </HStack>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </VStack>
  );

  const renderDashboardBuilder = () => {
    const currentDashboard = dashboards.find(d => d.id === activeDashboard);
    
    if (!currentDashboard) {
      return (
        <VStack spacing={4} align="center" py={8}>
          <Text color="gray.500">No dashboard selected</Text>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="teal"
            onClick={handleCreateDashboard}
          >
            Create Dashboard
          </Button>
        </VStack>
      );
    }

    return (
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="md">{currentDashboard.name}</Heading>
            <Text fontSize="sm" color="gray.600">
              {currentDashboard.description}
            </Text>
          </VStack>
          <HStack>
            <Button
              leftIcon={<FaPlus />}
              size="sm"
              variant="outline"
              onClick={onWidgetModalOpen}
            >
              Add Widget
            </Button>
            <Button
              leftIcon={previewMode ? <FaEdit /> : <FaEye />}
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
          </HStack>
        </HStack>

        {/* Dashboard Grid */}
        <Box
          bg={cardBg}
          borderRadius="md"
          border="1px"
          borderColor={borderColor}
          p={4}
          minH="400px"
        >
          {previewMode ? (
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
              {currentDashboard.widgets.map(widget => (
                <GridItem
                  key={widget.id}
                  colSpan={widget.position.w}
                  rowSpan={widget.position.h}
                >
                  <DataPulseWidget
                    widgetId={widget.id}
                    title={widget.title}
                    type={signals.find(s => s.id === widget.signalId)?.type || 'mixed'}
                    size={widget.size}
                    config={widget.config}
                  />
                </GridItem>
              ))}
            </Grid>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="dashboard-widgets">
                {(provided) => (
                  <VStack
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    spacing={3}
                    align="stretch"
                  >
                    {currentDashboard.widgets.map((widget, index) => (
                      <Draggable key={widget.id} draggableId={widget.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            bg={cardBg}
                            borderColor={borderColor}
                          >
                            <CardHeader pb={2}>
                              <HStack justify="space-between">
                                <HStack>
                                  <Box
                                    {...provided.dragHandleProps}
                                    cursor="grab"
                                    _active={{ cursor: 'grabbing' }}
                                  >
                                    <FaDragHandle />
                                  </Box>
                                  <Text fontWeight="bold">{widget.title}</Text>
                                  <Badge colorScheme="blue" variant="outline">
                                    {widget.type}
                                  </Badge>
                                  <Badge colorScheme="gray" variant="outline">
                                    {widget.size}
                                  </Badge>
                                </HStack>
                                <HStack>
                                  <IconButton
                                    icon={<FaEdit />}
                                    size="sm"
                                    variant="ghost"
                                    aria-label="Edit widget"
                                  />
                                  <IconButton
                                    icon={<FaTrash />}
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="red"
                                    aria-label="Delete widget"
                                  />
                                </HStack>
                              </HStack>
                            </CardHeader>
                            <CardBody pt={0}>
                              <Text fontSize="sm" color="gray.600">
                                Signal: {signals.find(s => s.id === widget.signalId)?.name || 'Unknown'}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                Position: {widget.position.x},{widget.position.y} 
                                ({widget.position.w}×{widget.position.h})
                              </Text>
                            </CardBody>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Box>
      </VStack>
    );
  };

  const renderSignalModal = () => (
    <Modal isOpen={isSignalModalOpen} onClose={onSignalModalClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedSignal ? 'Edit Signal' : 'Create Signal'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Signal Name</FormLabel>
              <Input placeholder="Enter signal name" />
            </FormControl>
            
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Describe what this signal detects" />
            </FormControl>
            
            <FormControl>
              <FormLabel>Signal Type</FormLabel>
              <Select>
                <option value="social">Social Intelligence</option>
                <option value="financial">Financial Intelligence</option>
                <option value="product">Product Intelligence</option>
                <option value="mixed">Mixed Sources</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Data Sources</FormLabel>
              <VStack align="stretch" spacing={2}>
                {['Twitter', 'Reddit', 'News', 'Yahoo Finance', 'Google Trends'].map(source => (
                  <HStack key={source} justify="space-between">
                    <Text>{source}</Text>
                    <Switch />
                  </HStack>
                ))}
              </VStack>
            </FormControl>
            
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Filters & Thresholds
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack spacing={3} align="stretch">
                    <FormControl>
                      <FormLabel>Keywords</FormLabel>
                      <Input placeholder="Enter keywords separated by commas" />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Sentiment Threshold</FormLabel>
                      <NumberInput min={-1} max={1} step={0.1}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Volume Threshold</FormLabel>
                      <NumberInput min={0}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onSignalModalClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={() => handleSaveSignal({
            name: 'New Signal',
            description: 'Signal description',
            type: 'social',
            sources: ['twitter'],
            filters: {},
            thresholds: {}
          })}>
            Save Signal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const renderDashboardModal = () => (
    <Modal isOpen={isDashboardModalOpen} onClose={onDashboardModalClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Dashboard</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Dashboard Name</FormLabel>
              <Input placeholder="Enter dashboard name" />
            </FormControl>
            
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Describe the dashboard purpose" />
            </FormControl>
            
            <FormControl>
              <FormLabel>Layout</FormLabel>
              <Select>
                <option value="grid">Grid Layout</option>
                <option value="freeform">Freeform Layout</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Refresh Interval (seconds)</FormLabel>
              <NumberInput min={10} max={3600}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Make Public</FormLabel>
              <Switch />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onDashboardModalClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={() => handleSaveDashboard({
            name: 'New Dashboard',
            description: 'Dashboard description',
            layout: 'grid',
            refreshInterval: 30000,
            isPublic: false,
            tags: []
          })}>
            Create Dashboard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const renderWidgetModal = () => (
    <Modal isOpen={isWidgetModalOpen} onClose={onWidgetModalClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Widget</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Widget Title</FormLabel>
              <Input placeholder="Enter widget title" />
            </FormControl>
            
            <FormControl>
              <FormLabel>Widget Type</FormLabel>
              <Select>
                <option value="chart">Chart</option>
                <option value="metric">Metric</option>
                <option value="table">Table</option>
                <option value="feed">Feed</option>
                <option value="alert">Alert</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Signal Source</FormLabel>
              <Select>
                {signals.map(signal => (
                  <option key={signal.id} value={signal.id}>
                    {signal.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Widget Size</FormLabel>
              <Select>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onWidgetModalClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={() => handleAddWidget({
            type: 'chart',
            title: 'New Widget',
            signalId: signals[0]?.id || '',
            size: 'medium',
            config: {}
          })}>
            Add Widget
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg" color="teal.500">
              🎛️ Signal Composer
            </Heading>
            <Text color="gray.600">
              Build custom intelligence dashboards with drag-and-drop simplicity
            </Text>
          </VStack>
          <HStack>
            <Select
              value={activeDashboard || ''}
              onChange={(e) => setActiveDashboard(e.target.value)}
              placeholder="Select dashboard"
              width="200px"
            >
              {dashboards.map(dashboard => (
                <option key={dashboard.id} value={dashboard.id}>
                  {dashboard.name}
                </option>
              ))}
            </Select>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              onClick={handleCreateDashboard}
            >
              New Dashboard
            </Button>
          </HStack>
        </HStack>

        {/* Main Content */}
        <Tabs variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab>
              <HStack>
                <FaRss />
                <Text>Signals</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <FaChartLine />
                <Text>Dashboard</Text>
              </HStack>
            </Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              {renderSignalBuilder()}
            </TabPanel>
            <TabPanel>
              {renderDashboardBuilder()}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Modals */}
      {renderSignalModal()}
      {renderDashboardModal()}
      {renderWidgetModal()}
    </Box>
  );
};

export default SignalComposer;