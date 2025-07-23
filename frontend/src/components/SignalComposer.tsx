import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  VStack,
  HStack,
  Badge,
  Select,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
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
  IconButton,
  Tooltip,
  Flex,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Switch,
  Checkbox,
  Divider,
} from '@chakra-ui/react';

// Signal Widget Types
interface SignalWidget {
  id: string;
  type: 'metric' | 'chart' | 'alert' | 'table' | 'map' | 'trend';
  title: string;
  dataSource: string;
  region: string;
  metrics: string[];
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  config: {
    showTrend?: boolean;
    showAlerts?: boolean;
    threshold?: number;
    timeRange?: string;
    aggregation?: string;
  };
}

interface MarketSignal {
  id: string;
  type: 'social' | 'financial' | 'product' | 'competitor';
  title: string;
  value: number;
  change: number;
  region: string;
  sector: string;
  confidence: number;
  timestamp: string;
}

// Sample Market Signals Data
const SAMPLE_SIGNALS: MarketSignal[] = [
  {
    id: '1',
    type: 'social',
    title: 'AI Technology Buzz',
    value: 94,
    change: 12.3,
    region: 'Global',
    sector: 'Technology',
    confidence: 89,
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'financial',
    title: 'Tech Stock Performance',
    value: 87,
    change: -2.1,
    region: 'Americas',
    sector: 'Technology',
    confidence: 92,
    timestamp: new Date().toISOString()
  },
  {
    id: '3',
    type: 'product',
    title: 'EV Market Growth',
    value: 78,
    change: 8.7,
    region: 'Europe',
    sector: 'Automotive',
    confidence: 85,
    timestamp: new Date().toISOString()
  },
  {
    id: '4',
    type: 'competitor',
    title: 'Market Share Shift',
    value: 65,
    change: -5.2,
    region: 'Asia',
    sector: 'E-commerce',
    confidence: 77,
    timestamp: new Date().toISOString()
  }
];

// Widget Templates
const WIDGET_TEMPLATES = [
  {
    type: 'metric',
    name: 'Key Metric',
    description: 'Display a single key performance indicator',
    defaultSize: 'small' as const,
    icon: '📊'
  },
  {
    type: 'chart',
    name: 'Trend Chart',
    description: 'Show trends over time with interactive charts',
    defaultSize: 'medium' as const,
    icon: '📈'
  },
  {
    type: 'alert',
    name: 'Alert Monitor',
    description: 'Monitor signals and trigger alerts',
    defaultSize: 'small' as const,
    icon: '🚨'
  },
  {
    type: 'table',
    name: 'Data Table',
    description: 'Detailed tabular view of signals',
    defaultSize: 'large' as const,
    icon: '📋'
  },
  {
    type: 'map',
    name: 'Geographic Map',
    description: 'Regional signal visualization',
    defaultSize: 'large' as const,
    icon: '🗺️'
  },
  {
    type: 'trend',
    name: 'Trend Indicator',
    description: 'Quick trend direction indicators',
    defaultSize: 'small' as const,
    icon: '📉'
  }
];

// Draggable Widget Component
const DraggableWidget: React.FC<{
  widget: SignalWidget;
  signals: MarketSignal[];
  onEdit: (widget: SignalWidget) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, newPosition: { x: number; y: number }) => void;
}> = ({ widget, signals, onEdit, onDelete, onMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - widget.position.x,
      y: e.clientY - widget.position.y
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      onMove(widget.id, newPosition);
    }
  }, [isDragging, dragStart, widget.id, onMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const filteredSignals = signals.filter(signal => 
    widget.dataSource === 'all' || signal.type === widget.dataSource
  );

  const getWidgetSize = () => {
    switch (widget.size) {
      case 'small': return { w: '200px', h: '150px' };
      case 'medium': return { w: '300px', h: '200px' };
      case 'large': return { w: '400px', h: '300px' };
      default: return { w: '200px', h: '150px' };
    }
  };

  const renderWidgetContent = () => {
    const size = getWidgetSize();
    
    switch (widget.type) {
      case 'metric':
        const signal = filteredSignals[0];
        return signal ? (
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              {signal.title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {signal.value}
            </Text>
            <HStack>
              <StatArrow type={signal.change >= 0 ? 'increase' : 'decrease'} />
              <Text fontSize="sm" color={signal.change >= 0 ? 'green.500' : 'red.500'}>
                {Math.abs(signal.change).toFixed(1)}%
              </Text>
            </HStack>
          </VStack>
        ) : (
          <Text color="gray.500">No data</Text>
        );

      case 'chart':
        return (
          <VStack spacing={2} h="full">
            <Text fontSize="md" fontWeight="semibold">{widget.title}</Text>
            <Box flex={1} w="full" bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md" p={2}>
              <Text fontSize="xs" color="gray.500">Chart visualization would go here</Text>
              {filteredSignals.slice(0, 3).map((signal, i) => (
                <HStack key={i} justify="space-between" mt={1}>
                  <Text fontSize="xs">{signal.title.slice(0, 15)}...</Text>
                  <Text fontSize="xs" fontWeight="bold">{signal.value}</Text>
                </HStack>
              ))}
            </Box>
          </VStack>
        );

      case 'alert':
        const alertSignals = filteredSignals.filter(s => s.confidence > 80);
        return (
          <VStack spacing={2}>
            <Text fontSize="md" fontWeight="semibold">{widget.title}</Text>
            <Badge colorScheme={alertSignals.length > 0 ? 'red' : 'green'}>
              {alertSignals.length} Alerts
            </Badge>
            {alertSignals.slice(0, 2).map((signal, i) => (
              <Alert key={i} status="warning" size="sm">
                <AlertIcon boxSize={3} />
                <Text fontSize="xs">{signal.title}</Text>
              </Alert>
            ))}
          </VStack>
        );

      case 'table':
        return (
          <VStack spacing={2} h="full">
            <Text fontSize="md" fontWeight="semibold">{widget.title}</Text>
            <Box overflowY="auto" w="full" flex={1}>
              {filteredSignals.slice(0, 5).map((signal, i) => (
                <HStack key={i} justify="space-between" py={1} borderBottom="1px" borderColor="gray.200">
                  <VStack align="start" spacing={0}>
                    <Text fontSize="xs" fontWeight="semibold">{signal.title}</Text>
                    <Text fontSize="xs" color="gray.500">{signal.sector}</Text>
                  </VStack>
                  <VStack align="end" spacing={0}>
                    <Text fontSize="xs" fontWeight="bold">{signal.value}</Text>
                    <Text fontSize="xs" color={signal.change >= 0 ? 'green.500' : 'red.500'}>
                      {signal.change >= 0 ? '+' : ''}{signal.change.toFixed(1)}%
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </Box>
          </VStack>
        );

      case 'map':
        const regionCounts = filteredSignals.reduce((acc, signal) => {
          acc[signal.region] = (acc[signal.region] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return (
          <VStack spacing={2} h="full">
            <Text fontSize="md" fontWeight="semibold">{widget.title}</Text>
            <Box flex={1} w="full" bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md" p={2}>
              <Text fontSize="xs" color="gray.500" mb={2}>Regional Distribution</Text>
              {Object.entries(regionCounts).map(([region, count]) => (
                <HStack key={region} justify="space-between">
                  <Text fontSize="xs">{region}</Text>
                  <Badge size="sm">{count}</Badge>
                </HStack>
              ))}
            </Box>
          </VStack>
        );

      case 'trend':
        const trendData = filteredSignals.slice(0, 3);
        return (
          <VStack spacing={2}>
            <Text fontSize="md" fontWeight="semibold">{widget.title}</Text>
            {trendData.map((signal, i) => (
              <HStack key={i} justify="space-between" w="full">
                <Text fontSize="xs">{signal.title.slice(0, 12)}...</Text>
                <HStack>
                  <StatArrow type={signal.change >= 0 ? 'increase' : 'decrease'} />
                  <Text fontSize="xs">{Math.abs(signal.change).toFixed(1)}%</Text>
                </HStack>
              </HStack>
            ))}
          </VStack>
        );

      default:
        return <Text>Widget type not implemented</Text>;
    }
  };

  const size = getWidgetSize();

  return (
    <Box
      ref={widgetRef}
      position="absolute"
      left={`${widget.position.x}px`}
      top={`${widget.position.y}px`}
      width={size.w}
      height={size.h}
      cursor={isDragging ? 'grabbing' : 'grab'}
      zIndex={isDragging ? 1000 : 1}
    >
      <Card
        bg={cardBg}
        border="2px"
        borderColor={isDragging ? 'blue.400' : borderColor}
        shadow={isDragging ? 'lg' : 'md'}
        h="full"
        onMouseDown={handleMouseDown}
      >
        <CardHeader py={2} px={3}>
          <HStack justify="space-between">
            <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
              {widget.title}
            </Text>
            <HStack spacing={1}>
              <IconButton
                aria-label="Edit widget"
                icon={<Text fontSize="xs">✏️</Text>}
                size="xs"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(widget);
                }}
              />
              <IconButton
                aria-label="Delete widget"
                icon={<Text fontSize="xs">🗑️</Text>}
                size="xs"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(widget.id);
                }}
              />
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody py={2} px={3}>
          {renderWidgetContent()}
        </CardBody>
      </Card>
    </Box>
  );
};

// Main SignalComposer Component
const SignalComposer: React.FC = () => {
  const [widgets, setWidgets] = useState<SignalWidget[]>([]);
  const [signals, setSignals] = useState<MarketSignal[]>(SAMPLE_SIGNALS);
  const [editingWidget, setEditingWidget] = useState<SignalWidget | null>(null);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  
  const canvasBg = useColorModeValue('gray.50', 'gray.900');
  const gridColor = useColorModeValue('gray.200', 'gray.700');

  // Auto-refresh signals simulation
  React.useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setSignals(prev => prev.map(signal => ({
        ...signal,
        value: Math.max(0, Math.min(100, signal.value + (Math.random() - 0.5) * 5)),
        change: (Math.random() - 0.5) * 10,
        timestamp: new Date().toISOString()
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const addWidget = (templateType: string) => {
    const template = WIDGET_TEMPLATES.find(t => t.type === templateType);
    if (!template) return;

    const newWidget: SignalWidget = {
      id: `widget_${Date.now()}`,
      type: template.type as any,
      title: template.name,
      dataSource: 'all',
      region: 'Global',
      metrics: ['value', 'change'],
      size: template.defaultSize,
      position: { x: 50 + widgets.length * 20, y: 50 + widgets.length * 20 },
      config: {
        showTrend: true,
        showAlerts: true,
        threshold: 80,
        timeRange: '24h',
        aggregation: 'avg'
      }
    };

    setWidgets(prev => [...prev, newWidget]);
    onAddClose();
  };

  const editWidget = (widget: SignalWidget) => {
    setEditingWidget(widget);
    onEditOpen();
  };

  const updateWidget = (updatedWidget: SignalWidget) => {
    setWidgets(prev => prev.map(w => w.id === updatedWidget.id ? updatedWidget : w));
    setEditingWidget(null);
    onEditClose();
  };

  const deleteWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };

  const moveWidget = (id: string, newPosition: { x: number; y: number }) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, position: newPosition } : w
    ));
  };

  const saveComposition = () => {
    const composition = {
      widgets,
      metadata: {
        created: new Date().toISOString(),
        name: 'Custom Dashboard',
        version: '1.0'
      }
    };
    
    // In a real app, this would save to backend
    console.log('Saving composition:', composition);
    
    // Download as JSON for demo
    const blob = new Blob([JSON.stringify(composition, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signal-dashboard.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="2xl" fontWeight="bold">📊 Signal Composer</Text>
            <Text color="gray.600">Build custom dashboard views with drag-and-drop widgets</Text>
          </Box>
          <HStack spacing={4}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="auto-refresh" mb="0" fontSize="sm">
                Auto Refresh
              </FormLabel>
              <Switch 
                id="auto-refresh" 
                isChecked={autoRefresh} 
                onChange={(e) => setAutoRefresh(e.target.checked)} 
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="grid-snap" mb="0" fontSize="sm">
                Grid Snap
              </FormLabel>
              <Switch 
                id="grid-snap" 
                isChecked={gridEnabled} 
                onChange={(e) => setGridEnabled(e.target.checked)} 
              />
            </FormControl>
            <Button colorScheme="blue" onClick={onAddOpen}>
              + Add Widget
            </Button>
            <Button colorScheme="green" onClick={saveComposition} isDisabled={widgets.length === 0}>
              💾 Save Dashboard
            </Button>
          </HStack>
        </Flex>

        {/* Stats */}
        <HStack spacing={6}>
          <Stat>
            <StatLabel>Active Widgets</StatLabel>
            <StatNumber>{widgets.length}</StatNumber>
            <StatHelpText>Dashboard components</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Live Signals</StatLabel>
            <StatNumber>{signals.length}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              Real-time data
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Data Sources</StatLabel>
            <StatNumber>4</StatNumber>
            <StatHelpText>Connected APIs</StatHelpText>
          </Stat>
        </HStack>

        {/* Canvas */}
        <Box
          position="relative"
          minH="600px"
          bg={canvasBg}
          border="2px dashed"
          borderColor={gridColor}
          borderRadius="lg"
          overflow="hidden"
          backgroundImage={gridEnabled ? 
            `radial-gradient(circle, ${gridColor} 1px, transparent 1px)` : 
            'none'
          }
          backgroundSize={gridEnabled ? '20px 20px' : 'none'}
        >
          {widgets.length === 0 ? (
            <Flex justify="center" align="center" h="400px">
              <VStack spacing={4}>
                <Text fontSize="lg" color="gray.500">Your dashboard canvas is empty</Text>
                <Button colorScheme="blue" onClick={onAddOpen}>
                  🎯 Add Your First Widget
                </Button>
              </VStack>
            </Flex>
          ) : (
            widgets.map(widget => (
              <DraggableWidget
                key={widget.id}
                widget={widget}
                signals={signals}
                onEdit={editWidget}
                onDelete={deleteWidget}
                onMove={moveWidget}
              />
            ))
          )}
        </Box>
      </VStack>

      {/* Add Widget Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Widget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {WIDGET_TEMPLATES.map(template => (
                <Card
                  key={template.type}
                  cursor="pointer"
                  _hover={{ shadow: 'md', borderColor: 'blue.300' }}
                  onClick={() => addWidget(template.type)}
                >
                  <CardBody>
                    <VStack spacing={2}>
                      <Text fontSize="2xl">{template.icon}</Text>
                      <Text fontWeight="bold">{template.name}</Text>
                      <Text fontSize="sm" color="gray.600" textAlign="center">
                        {template.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onAddClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Widget Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Widget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingWidget && (
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Widget Title</FormLabel>
                  <Input
                    value={editingWidget.title}
                    onChange={(e) => setEditingWidget(prev => 
                      prev ? { ...prev, title: e.target.value } : null
                    )}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Data Source</FormLabel>
                  <Select
                    value={editingWidget.dataSource}
                    onChange={(e) => setEditingWidget(prev => 
                      prev ? { ...prev, dataSource: e.target.value } : null
                    )}
                  >
                    <option value="all">All Signals</option>
                    <option value="social">Social Signals</option>
                    <option value="financial">Financial Signals</option>
                    <option value="product">Product Signals</option>
                    <option value="competitor">Competitor Signals</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Widget Size</FormLabel>
                  <Select
                    value={editingWidget.size}
                    onChange={(e) => setEditingWidget(prev => 
                      prev ? { ...prev, size: e.target.value as any } : null
                    )}
                  >
                    <option value="small">Small (200x150)</option>
                    <option value="medium">Medium (300x200)</option>
                    <option value="large">Large (400x300)</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Region Filter</FormLabel>
                  <Select
                    value={editingWidget.region}
                    onChange={(e) => setEditingWidget(prev => 
                      prev ? { ...prev, region: e.target.value } : null
                    )}
                  >
                    <option value="Global">Global</option>
                    <option value="Americas">Americas</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Australia">Australia</option>
                    <option value="Caribbean">Caribbean</option>
                  </Select>
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onEditClose}>Cancel</Button>
            <Button 
              colorScheme="blue" 
              onClick={() => editingWidget && updateWidget(editingWidget)}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SignalComposer;