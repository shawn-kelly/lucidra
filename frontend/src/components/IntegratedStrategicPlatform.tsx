import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { LucidraHealthMonitor } from './LucidraHealthMonitor';

interface PlatformMetrics {
  strategicFrameworks: number;
  activeProcesses: number;
  teamMembers: number;
  financialHealth: number;
  marketIntelligence: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
}

interface StrategicIntegration {
  id: string;
  name: string;
  type: 'framework' | 'process' | 'financial' | 'market';
  status: 'active' | 'pending' | 'completed';
  impact: number;
  connections: string[];
  kpis: {
    efficiency: number;
    roi: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

interface IntegratedPlatformProps {
  onClose?: () => void;
}

const IntegratedStrategicPlatform: React.FC<IntegratedPlatformProps> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<PlatformMetrics>({
    strategicFrameworks: 6,
    activeProcesses: 12,
    teamMembers: 8,
    financialHealth: 85,
    marketIntelligence: 92,
    systemHealth: 'healthy'
  });

  const [integrations, setIntegrations] = useState<StrategicIntegration[]>([
    {
      id: 'blue-ocean-integration',
      name: 'Blue Ocean Strategy Integration',
      type: 'framework',
      status: 'active',
      impact: 95,
      connections: ['market-data', 'financial-analysis', 'process-optimization'],
      kpis: { efficiency: 88, roi: 156, riskLevel: 'low' }
    },
    {
      id: 'porters-five-forces',
      name: 'Porter\'s Five Forces Analysis',
      type: 'framework',
      status: 'active',
      impact: 87,
      connections: ['competitive-intelligence', 'market-data'],
      kpis: { efficiency: 92, roi: 134, riskLevel: 'medium' }
    },
    {
      id: 'financial-framework',
      name: 'Financial Analysis Framework',
      type: 'financial',
      status: 'active',
      impact: 91,
      connections: ['dupont-analysis', 'abc-costing', 'irr-npv'],
      kpis: { efficiency: 94, roi: 178, riskLevel: 'low' }
    },
    {
      id: 'process-management',
      name: 'Process Management System',
      type: 'process',
      status: 'active',
      impact: 89,
      connections: ['bpmn-mapping', 'bottleneck-analysis'],
      kpis: { efficiency: 86, roi: 145, riskLevel: 'low' }
    },
    {
      id: 'market-intelligence',
      name: 'Market Intelligence Hub',
      type: 'market',
      status: 'active',
      impact: 93,
      connections: ['data-pulse', 'competitive-signals', 'trend-analysis'],
      kpis: { efficiency: 96, roi: 189, riskLevel: 'medium' }
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<StrategicIntegration | null>(null);
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // Simulate real-time platform monitoring
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        financialHealth: Math.max(75, Math.min(95, prev.financialHealth + (Math.random() - 0.5) * 5)),
        marketIntelligence: Math.max(85, Math.min(98, prev.marketIntelligence + (Math.random() - 0.5) * 3)),
        systemHealth: Math.random() > 0.9 ? 'warning' : 'healthy'
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'pending': return 'yellow';
      case 'completed': return 'blue';
      default: return 'gray';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'green';
      case 'medium': return 'yellow';
      case 'high': return 'red';
      default: return 'gray';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'framework': return '🧭';
      case 'process': return '⚙️';
      case 'financial': return '💰';
      case 'market': return '📊';
      default: return '🔗';
    }
  };

  const handleIntegrationOptimization = () => {
    toast({
      title: 'Integration Optimization Started',
      description: 'AI-powered optimization will analyze and improve cross-system integrations.',
      status: 'info',
      duration: 4000,
      isClosable: true,
    });

    // Simulate optimization improvement
    setIntegrations(prev => 
      prev.map(integration => ({
        ...integration,
        kpis: {
          ...integration.kpis,
          efficiency: Math.min(100, integration.kpis.efficiency + Math.random() * 5),
          roi: Math.min(200, integration.kpis.roi + Math.random() * 10)
        }
      }))
    );
  };

  const generateIntegrationReport = () => {
    const totalImpact = integrations.reduce((sum, int) => sum + int.impact, 0);
    const avgEfficiency = integrations.reduce((sum, int) => sum + int.kpis.efficiency, 0) / integrations.length;
    const avgROI = integrations.reduce((sum, int) => sum + int.kpis.roi, 0) / integrations.length;

    const report = `
LUCIDRA STRATEGIC INTEGRATION REPORT
====================================
Generated: ${new Date().toISOString()}

PLATFORM OVERVIEW:
- Strategic Frameworks: ${metrics.strategicFrameworks}
- Active Processes: ${metrics.activeProcesses}
- Team Members: ${metrics.teamMembers}
- Financial Health: ${metrics.financialHealth}%
- Market Intelligence: ${metrics.marketIntelligence}%
- System Health: ${metrics.systemHealth.toUpperCase()}

INTEGRATION PERFORMANCE:
- Total Strategic Impact: ${totalImpact}
- Average Efficiency: ${avgEfficiency.toFixed(1)}%
- Average ROI: ${avgROI.toFixed(1)}%
- Active Integrations: ${integrations.filter(i => i.status === 'active').length}

DETAILED INTEGRATIONS:
${integrations.map(integration => `
- ${integration.name}
  Type: ${integration.type.toUpperCase()}
  Status: ${integration.status.toUpperCase()}
  Impact Score: ${integration.impact}
  Efficiency: ${integration.kpis.efficiency}%
  ROI: ${integration.kpis.roi}%
  Risk Level: ${integration.kpis.riskLevel.toUpperCase()}
  Connections: ${integration.connections.join(', ')}
`).join('')}

RECOMMENDATIONS:
- Continue monitoring high-impact integrations (>90 impact)
- Optimize medium-risk integrations for better performance
- Expand market intelligence connections for enhanced competitive advantage
- Maintain system health monitoring for proactive issue resolution

This report provides a comprehensive view of your Lucidra platform's
strategic integration status and performance metrics.
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lucidra-integration-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box p={6}>
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold" color="purple.600">
              🔗 Integrated Strategic Platform
            </Text>
            <Text color="gray.600">
              Comprehensive view of all strategic frameworks, processes, and intelligence systems
            </Text>
          </VStack>
          <HStack>
            <Button colorScheme="purple" size="md" onClick={generateIntegrationReport}>
              📊 Generate Report
            </Button>
            <Button colorScheme="teal" size="md" onClick={handleIntegrationOptimization}>
              🚀 Optimize Integrations
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>← Back</Button>
            )}
          </HStack>
        </HStack>

        {/* Platform Health Overview */}
        <Alert status={metrics.systemHealth === 'healthy' ? 'success' : 'warning'}>
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">
              Platform Status: {metrics.systemHealth.toUpperCase()}
            </Text>
            <Text fontSize="sm">
              All {metrics.strategicFrameworks} strategic frameworks active • {metrics.activeProcesses} processes running • {metrics.teamMembers} team members engaged
            </Text>
          </VStack>
        </Alert>

        <Tabs variant="enclosed" colorScheme="purple">
          <TabList>
            <Tab>📊 Dashboard Overview</Tab>
            <Tab>🔗 Integration Matrix</Tab>
            <Tab>📈 Performance Analytics</Tab>
            <Tab>🏥 System Health</Tab>
          </TabList>

          <TabPanels>
            {/* Dashboard Overview */}
            <TabPanel>
              <VStack align="stretch" spacing={6}>
                {/* Key Metrics */}
                <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                  <Card>
                    <CardBody>
                      <Stat>
                        <StatLabel>Financial Health</StatLabel>
                        <StatNumber>{metrics.financialHealth}%</StatNumber>
                        <StatHelpText>Above industry average</StatHelpText>
                      </Stat>
                      <Progress value={metrics.financialHealth} colorScheme="green" mt={2} />
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Stat>
                        <StatLabel>Market Intelligence</StatLabel>
                        <StatNumber>{metrics.marketIntelligence}%</StatNumber>
                        <StatHelpText>Excellent coverage</StatHelpText>
                      </Stat>
                      <Progress value={metrics.marketIntelligence} colorScheme="blue" mt={2} />
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Stat>
                        <StatLabel>Active Integrations</StatLabel>
                        <StatNumber>{integrations.filter(i => i.status === 'active').length}</StatNumber>
                        <StatHelpText>All systems connected</StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Stat>
                        <StatLabel>System Efficiency</StatLabel>
                        <StatNumber>
                          {Math.round(integrations.reduce((sum, int) => sum + int.kpis.efficiency, 0) / integrations.length)}%
                        </StatNumber>
                        <StatHelpText>High performance</StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>
                </Grid>

                {/* Strategic Framework Status */}
                <Card>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="semibold">🧭 Strategic Framework Status</Text>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                      {integrations.map(integration => (
                        <Box 
                          key={integration.id}
                          p={3} 
                          border="2px solid" 
                          borderColor="gray.200" 
                          borderRadius="lg"
                          cursor="pointer"
                          onClick={() => {
                            setSelectedIntegration(integration);
                            onOpen();
                          }}
                          _hover={{ borderColor: 'purple.300', shadow: 'md' }}
                        >
                          <VStack align="start" spacing={2}>
                            <HStack justify="space-between" w="full">
                              <HStack>
                                <Text fontSize="lg">{getTypeIcon(integration.type)}</Text>
                                <Text fontSize="sm" fontWeight="semibold">{integration.name}</Text>
                              </HStack>
                              <Badge colorScheme={getStatusColor(integration.status)}>
                                {integration.status}
                              </Badge>
                            </HStack>
                            <HStack justify="space-between" w="full">
                              <Text fontSize="xs" color="gray.600">Impact: {integration.impact}</Text>
                              <Text fontSize="xs" color="gray.600">ROI: {integration.kpis.roi}%</Text>
                            </HStack>
                            <Progress value={integration.impact} size="sm" colorScheme="purple" />
                          </VStack>
                        </Box>
                      ))}
                    </Grid>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>

            {/* Integration Matrix */}
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="lg" fontWeight="semibold">🔗 Cross-System Integration Matrix</Text>
                <Card>
                  <CardBody>
                    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                      {integrations.map(integration => (
                        <Box key={integration.id} p={4} bg="gray.50" borderRadius="lg">
                          <VStack align="start" spacing={3}>
                            <HStack>
                              <Text fontSize="lg">{getTypeIcon(integration.type)}</Text>
                              <Text fontWeight="semibold">{integration.name}</Text>
                            </HStack>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="sm" fontWeight="medium">Connected Systems:</Text>
                              {integration.connections.map(connection => (
                                <Badge key={connection} variant="subtle" colorScheme="blue" size="sm">
                                  {connection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              ))}
                            </VStack>
                            <Divider />
                            <HStack justify="space-between" w="full">
                              <VStack align="start" spacing={0}>
                                <Text fontSize="xs" color="gray.600">Efficiency</Text>
                                <Text fontSize="sm" fontWeight="bold">{integration.kpis.efficiency}%</Text>
                              </VStack>
                              <VStack align="start" spacing={0}>
                                <Text fontSize="xs" color="gray.600">Risk</Text>
                                <Badge colorScheme={getRiskColor(integration.kpis.riskLevel)} size="sm">
                                  {integration.kpis.riskLevel}
                                </Badge>
                              </VStack>
                            </HStack>
                          </VStack>
                        </Box>
                      ))}
                    </Grid>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>

            {/* Performance Analytics */}
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="lg" fontWeight="semibold">📈 Performance Analytics</Text>
                <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                  {integrations.map(integration => (
                    <Card key={integration.id}>
                      <CardHeader>
                        <HStack>
                          <Text fontSize="md">{getTypeIcon(integration.type)}</Text>
                          <Text fontSize="sm" fontWeight="semibold">{integration.name}</Text>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <Box>
                            <Flex justify="space-between" mb={1}>
                              <Text fontSize="xs">Efficiency</Text>
                              <Text fontSize="xs">{integration.kpis.efficiency}%</Text>
                            </Flex>
                            <Progress value={integration.kpis.efficiency} colorScheme="green" size="sm" />
                          </Box>
                          <Box>
                            <Flex justify="space-between" mb={1}>
                              <Text fontSize="xs">ROI</Text>
                              <Text fontSize="xs">{integration.kpis.roi}%</Text>
                            </Flex>
                            <Progress value={Math.min(100, integration.kpis.roi / 2)} colorScheme="blue" size="sm" />
                          </Box>
                          <Box>
                            <Flex justify="space-between" mb={1}>
                              <Text fontSize="xs">Impact Score</Text>
                              <Text fontSize="xs">{integration.impact}/100</Text>
                            </Flex>
                            <Progress value={integration.impact} colorScheme="purple" size="sm" />
                          </Box>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </VStack>
            </TabPanel>

            {/* System Health */}
            <TabPanel>
              <LucidraHealthMonitor />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Integration Detail Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedIntegration && (
              <HStack>
                <Text fontSize="lg">{getTypeIcon(selectedIntegration.type)}</Text>
                <Text>{selectedIntegration.name}</Text>
              </HStack>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedIntegration && (
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Badge colorScheme={getStatusColor(selectedIntegration.status)} size="lg">
                    {selectedIntegration.status.toUpperCase()}
                  </Badge>
                  <Text fontSize="sm" color="gray.600">
                    Impact Score: {selectedIntegration.impact}/100
                  </Text>
                </HStack>

                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <Stat>
                    <StatLabel>Efficiency</StatLabel>
                    <StatNumber>{selectedIntegration.kpis.efficiency}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>ROI</StatLabel>
                    <StatNumber>{selectedIntegration.kpis.roi}%</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Risk Level</StatLabel>
                    <StatNumber>
                      <Badge colorScheme={getRiskColor(selectedIntegration.kpis.riskLevel)}>
                        {selectedIntegration.kpis.riskLevel.toUpperCase()}
                      </Badge>
                    </StatNumber>
                  </Stat>
                </Grid>

                <Box>
                  <Text fontWeight="semibold" mb={2}>Connected Systems:</Text>
                  <Flex wrap="wrap" gap={2}>
                    {selectedIntegration.connections.map(connection => (
                      <Badge key={connection} colorScheme="teal" variant="outline">
                        {connection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    ))}
                  </Flex>
                </Box>

                <Alert status="info">
                  <AlertIcon />
                  <Text fontSize="sm">
                    This integration is performing well and contributing significantly to your strategic objectives.
                    Monitor the efficiency metrics to ensure continued optimal performance.
                  </Text>
                </Alert>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default IntegratedStrategicPlatform;