import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Progress,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Input,
  Textarea,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';

// Mutation Types and Interfaces
interface MutationHistoryEntry {
  id: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'transform' | 'merge' | 'split';
  target: string; // framework, process, data element
  before: any;
  after: any;
  user: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
}

interface MutationRule {
  id: string;
  name: string;
  condition: string;
  transformation: string;
  probability: number;
  impact: number;
  category: 'strategic' | 'operational' | 'financial' | 'competitive';
}

interface MutationEngine {
  isActive: boolean;
  intensity: number; // 1-10
  rules: MutationRule[];
  history: MutationHistoryEntry[];
  autoMutate: boolean;
  mutationInterval: number; // seconds
}

const MutationEngineComponent: React.FC = () => {
  const [mutationEngine, setMutationEngine] = useState<MutationEngine>({
    isActive: false,
    intensity: 3,
    rules: [],
    history: [],
    autoMutate: false,
    mutationInterval: 30
  });

  const [selectedTarget, setSelectedTarget] = useState('blue-ocean');
  const [mutationMode, setMutationMode] = useState<'manual' | 'guided' | 'autonomous'>('guided');
  const [activeMutations, setActiveMutations] = useState<MutationHistoryEntry[]>([]);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isRuleOpen, 
    onOpen: onRuleOpen, 
    onClose: onRuleClose 
  } = useDisclosure();

  // Pre-defined Mutation Rules
  const defaultMutationRules: MutationRule[] = [
    {
      id: 'competitive-shift',
      name: '🎯 Competitive Position Shift',
      condition: 'Industry attractiveness > 7',
      transformation: 'Modify competitive dynamics by 15-30%',
      probability: 0.7,
      impact: 8,
      category: 'competitive'
    },
    {
      id: 'market-disruption',
      name: '⚡ Market Disruption Simulation',
      condition: 'New entrant threat > 6',
      transformation: 'Simulate disruptive technology impact',
      probability: 0.4,
      impact: 9,
      category: 'strategic'
    },
    {
      id: 'value-chain-optimization',
      name: '🔄 Value Chain Reconfiguration',
      condition: 'Process efficiency < 80%',
      transformation: 'Restructure value chain activities',
      probability: 0.6,
      impact: 7,
      category: 'operational'
    },
    {
      id: 'customer-behavior-shift',
      name: '👥 Customer Preference Evolution',
      condition: 'Buyer utility score changes',
      transformation: 'Adjust customer journey and preferences',
      probability: 0.8,
      impact: 6,
      category: 'strategic'
    },
    {
      id: 'cost-structure-mutation',
      name: '💰 Cost Structure Transformation',
      condition: 'Resource constraints identified',
      transformation: 'Redistribute costs and investment priorities',
      probability: 0.5,
      impact: 8,
      category: 'financial'
    },
    {
      id: 'innovation-catalyst',
      name: '🚀 Innovation Breakthrough',
      condition: 'R&D investment > threshold',
      transformation: 'Introduce breakthrough capabilities',
      probability: 0.3,
      impact: 10,
      category: 'strategic'
    }
  ];

  // Initialize mutation rules
  useEffect(() => {
    if (mutationEngine.rules.length === 0) {
      setMutationEngine(prev => ({
        ...prev,
        rules: defaultMutationRules
      }));
    }
  }, []);

  // Auto-mutation system
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (mutationEngine.isActive && mutationEngine.autoMutate) {
      interval = setInterval(() => {
        triggerAutonomousMutation();
      }, mutationEngine.mutationInterval * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mutationEngine.isActive, mutationEngine.autoMutate, mutationEngine.mutationInterval]);

  const triggerAutonomousMutation = useCallback(() => {
    const availableRules = mutationEngine.rules.filter(rule => 
      Math.random() < rule.probability * (mutationEngine.intensity / 10)
    );

    if (availableRules.length > 0) {
      const selectedRule = availableRules[Math.floor(Math.random() * availableRules.length)];
      executeMutation(selectedRule);
    }
  }, [mutationEngine]);

  const executeMutation = (rule: MutationRule) => {
    const mutation: MutationHistoryEntry = {
      id: `mut_${Date.now()}`,
      timestamp: new Date(),
      type: 'transform',
      target: selectedTarget,
      before: generateBeforeState(),
      after: generateAfterState(rule),
      user: mutationMode === 'autonomous' ? 'AI-Engine' : 'User',
      description: rule.transformation,
      impact: rule.impact > 7 ? 'high' : rule.impact > 4 ? 'medium' : 'low'
    };

    setMutationEngine(prev => ({
      ...prev,
      history: [mutation, ...prev.history.slice(0, 99)] // Keep last 100 mutations
    }));

    setActiveMutations(prev => [mutation, ...prev.slice(0, 4)]); // Show last 5 active mutations

    // Auto-remove from active mutations after 10 seconds
    setTimeout(() => {
      setActiveMutations(prev => prev.filter(m => m.id !== mutation.id));
    }, 10000);
  };

  const generateBeforeState = () => ({
    timestamp: new Date(),
    framework: selectedTarget,
    competitive_forces: {
      rivalry: Math.floor(Math.random() * 10) + 1,
      buyer_power: Math.floor(Math.random() * 10) + 1,
      supplier_power: Math.floor(Math.random() * 10) + 1,
      new_entrants: Math.floor(Math.random() * 10) + 1,
      substitutes: Math.floor(Math.random() * 10) + 1
    },
    market_metrics: {
      size: `$${Math.floor(Math.random() * 500) + 100}B`,
      growth: `${(Math.random() * 10 + 2).toFixed(1)}%`,
      attractiveness: Math.floor(Math.random() * 4) + 6
    }
  });

  const generateAfterState = (rule: MutationRule) => {
    const before = generateBeforeState();
    const impact = rule.impact / 10;
    
    return {
      ...before,
      timestamp: new Date(),
      competitive_forces: {
        rivalry: Math.min(10, Math.max(1, before.competitive_forces.rivalry + (Math.random() - 0.5) * impact * 4)),
        buyer_power: Math.min(10, Math.max(1, before.competitive_forces.buyer_power + (Math.random() - 0.5) * impact * 4)),
        supplier_power: Math.min(10, Math.max(1, before.competitive_forces.supplier_power + (Math.random() - 0.5) * impact * 4)),
        new_entrants: Math.min(10, Math.max(1, before.competitive_forces.new_entrants + (Math.random() - 0.5) * impact * 4)),
        substitutes: Math.min(10, Math.max(1, before.competitive_forces.substitutes + (Math.random() - 0.5) * impact * 4))
      },
      mutation_applied: rule.name,
      mutation_intensity: impact
    };
  };

  const undoMutation = (mutationId: string) => {
    const mutation = mutationEngine.history.find(m => m.id === mutationId);
    if (mutation) {
      // Create reverse mutation
      const reverseMutation: MutationHistoryEntry = {
        id: `undo_${Date.now()}`,
        timestamp: new Date(),
        type: 'update',
        target: mutation.target,
        before: mutation.after,
        after: mutation.before,
        user: 'User',
        description: `Undo: ${mutation.description}`,
        impact: mutation.impact
      };

      setMutationEngine(prev => ({
        ...prev,
        history: [reverseMutation, ...prev.history]
      }));
    }
  };

  const getMutationImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getMutationTypeIcon = (type: string) => {
    switch (type) {
      case 'create': return '➕';
      case 'update': return '🔄';
      case 'delete': return '🗑️';
      case 'transform': return '⚡';
      case 'merge': return '🔗';
      case 'split': return '✂️';
      default: return '🔧';
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header with Control Panel */}
        <Card bg="purple.50" border="1px" borderColor="purple.200">
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="purple.700">
                  🧬 Mutation Engine
                </Text>
                <Text color="purple.600">
                  Advanced strategy evolution and scenario simulation system
                </Text>
              </VStack>
              <HStack>
                <Switch
                  isChecked={mutationEngine.isActive}
                  onChange={(e) => setMutationEngine(prev => ({ ...prev, isActive: e.target.checked }))}
                  colorScheme="purple"
                />
                <Text fontSize="sm" color="purple.600">
                  {mutationEngine.isActive ? 'Active' : 'Inactive'}
                </Text>
              </HStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>Mutation Intensity</Text>
                <VStack spacing={2}>
                  <Slider
                    value={mutationEngine.intensity}
                    onChange={(value) => setMutationEngine(prev => ({ ...prev, intensity: value }))}
                    min={1}
                    max={10}
                    colorScheme="purple"
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Text fontSize="sm" color="purple.600">{mutationEngine.intensity}/10</Text>
                </VStack>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>Target Framework</Text>
                <Select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  size="sm"
                >
                  <option value="blue-ocean">Blue Ocean Strategy</option>
                  <option value="porters-five">Porter's Five Forces</option>
                  <option value="value-chain">Value Chain Analysis</option>
                  <option value="bpmn-processes">BPMN Processes</option>
                  <option value="financial-models">Financial Models</option>
                </Select>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>Mutation Mode</Text>
                <Select
                  value={mutationMode}
                  onChange={(e) => setMutationMode(e.target.value as any)}
                  size="sm"
                >
                  <option value="manual">Manual Control</option>
                  <option value="guided">Guided Suggestions</option>
                  <option value="autonomous">Autonomous Evolution</option>
                </Select>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold" mb={2}>Auto-Mutation</Text>
                <VStack spacing={2}>
                  <Switch
                    isChecked={mutationEngine.autoMutate}
                    onChange={(e) => setMutationEngine(prev => ({ ...prev, autoMutate: e.target.checked }))}
                    colorScheme="purple"
                    size="sm"
                  />
                  <NumberInput
                    value={mutationEngine.mutationInterval}
                    onChange={(_, value) => setMutationEngine(prev => ({ ...prev, mutationInterval: value || 30 }))}
                    min={5}
                    max={300}
                    size="sm"
                    w="80px"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize="xs" color="gray.500">seconds</Text>
                </VStack>
              </Box>
            </Grid>
          </CardBody>
        </Card>

        {/* Active Mutations Display */}
        {activeMutations.length > 0 && (
          <Card bg="orange.50" border="1px" borderColor="orange.200">
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold" color="orange.700">
                ⚡ Active Mutations
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                {activeMutations.map((mutation) => (
                  <Alert key={mutation.id} status="info" borderRadius="md">
                    <AlertIcon />
                    <HStack justify="space-between" w="100%">
                      <HStack>
                        <Text fontSize="sm">
                          {getMutationTypeIcon(mutation.type)} {mutation.description}
                        </Text>
                        <Badge colorScheme={getMutationImpactColor(mutation.impact)}>
                          {mutation.impact}
                        </Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.500">
                        {mutation.timestamp.toLocaleTimeString()}
                      </Text>
                    </HStack>
                  </Alert>
                ))}
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Control Buttons */}
        <HStack spacing={4}>
          <Button
            colorScheme="purple"
            onClick={() => {
              const randomRule = mutationEngine.rules[Math.floor(Math.random() * mutationEngine.rules.length)];
              executeMutation(randomRule);
            }}
            isDisabled={!mutationEngine.isActive}
          >
            🎲 Trigger Random Mutation
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={onOpen}
          >
            📊 View Mutation History
          </Button>
          <Button
            colorScheme="green"
            variant="outline"
            onClick={onRuleOpen}
          >
            ⚙️ Manage Rules
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => setMutationEngine(prev => ({ ...prev, history: [] }))}
          >
            🗑️ Clear History
          </Button>
        </HStack>

        {/* Mutation Statistics */}
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                {mutationEngine.history.length}
              </Text>
              <Text fontSize="sm" color="gray.600">Total Mutations</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                {mutationEngine.history.filter(m => m.impact === 'high').length}
              </Text>
              <Text fontSize="sm" color="gray.600">High Impact</Text>
            </CardBody>
          </Card>
          <Card>
            <CardBody textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                {mutationEngine.rules.length}
              </Text>
              <Text fontSize="sm" color="gray.600">Active Rules</Text>
            </CardBody>
          </Card>
        </Grid>
      </VStack>

      {/* Mutation History Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>📊 Mutation History</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Time</Th>
                  <Th>Type</Th>
                  <Th>Target</Th>
                  <Th>Description</Th>
                  <Th>Impact</Th>
                  <Th>User</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mutationEngine.history.slice(0, 50).map((mutation) => (
                  <Tr key={mutation.id}>
                    <Td fontSize="xs">{mutation.timestamp.toLocaleString()}</Td>
                    <Td>{getMutationTypeIcon(mutation.type)}</Td>
                    <Td fontSize="xs">{mutation.target}</Td>
                    <Td fontSize="xs">{mutation.description}</Td>
                    <Td>
                      <Badge colorScheme={getMutationImpactColor(mutation.impact)}>
                        {mutation.impact}
                      </Badge>
                    </Td>
                    <Td fontSize="xs">{mutation.user}</Td>
                    <Td>
                      <Tooltip label="Undo this mutation">
                        <IconButton
                          aria-label="Undo"
                          size="xs"
                          icon={<Text>↶</Text>}
                          onClick={() => undoMutation(mutation.id)}
                        />
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Mutation Rules Management Modal */}
      <Modal isOpen={isRuleOpen} onClose={onRuleClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>⚙️ Mutation Rules Management</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {mutationEngine.rules.map((rule) => (
                <Card key={rule.id} variant="outline">
                  <CardBody>
                    <Grid templateColumns="2fr 1fr 1fr 1fr" gap={4} alignItems="center">
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold">{rule.name}</Text>
                        <Text fontSize="sm" color="gray.600">{rule.transformation}</Text>
                        <Text fontSize="xs" color="gray.500">Condition: {rule.condition}</Text>
                      </VStack>
                      <VStack>
                        <Text fontSize="xs" color="gray.500">Probability</Text>
                        <Text fontWeight="bold">{(rule.probability * 100).toFixed(0)}%</Text>
                      </VStack>
                      <VStack>
                        <Text fontSize="xs" color="gray.500">Impact</Text>
                        <Text fontWeight="bold" color={rule.impact > 7 ? 'red.500' : rule.impact > 4 ? 'yellow.500' : 'green.500'}>
                          {rule.impact}/10
                        </Text>
                      </VStack>
                      <VStack>
                        <Badge colorScheme="purple">{rule.category}</Badge>
                        <Button
                          size="xs"
                          colorScheme="purple"
                          onClick={() => executeMutation(rule)}
                        >
                          Execute
                        </Button>
                      </VStack>
                    </Grid>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MutationEngineComponent;