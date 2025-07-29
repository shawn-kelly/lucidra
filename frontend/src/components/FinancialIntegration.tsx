import React, { useState, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Alert,
  AlertIcon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  Spinner,
  useToast,
  Divider,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import { 
  AttachmentIcon, 
  CheckIcon, 
  WarningIcon, 
  InfoIcon, 
  DownloadIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons';

interface FinancialConnection {
  id: string;
  name: string;
  type: 'quickbooks' | 'sage' | 'greatplains' | 'xero' | 'manual';
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync: string;
  icon: string;
  description: string;
  dataTypes: string[];
  features: string[];
}

interface FinancialData {
  id: string;
  type: 'balance_sheet' | 'income_statement' | 'cash_flow' | 'trial_balance' | 'budget';
  name: string;
  period: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  source: 'upload' | 'api' | 'manual';
  size?: string;
  recordCount?: number;
}

interface MappingField {
  sourceField: string;
  targetField: string;
  dataType: string;
  required: boolean;
  mapped: boolean;
}

const FinancialIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedConnection, setSelectedConnection] = useState<FinancialConnection | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [mappingFields, setMappingFields] = useState<MappingField[]>([]);
  
  const { isOpen: isConnectionOpen, onOpen: onConnectionOpen, onClose: onConnectionClose } = useDisclosure();
  const { isOpen: isMappingOpen, onOpen: onMappingOpen, onClose: onMappingClose } = useDisclosure();
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const [connections, setConnections] = useState<FinancialConnection[]>([
    {
      id: 'quickbooks',
      name: 'QuickBooks Online',
      type: 'quickbooks',
      status: 'disconnected',
      lastSync: 'Never',
      icon: '💼',
      description: 'Connect to QuickBooks Online for automatic financial data sync',
      dataTypes: ['Chart of Accounts', 'Transactions', 'Customers', 'Vendors', 'Items'],
      features: ['Real-time sync', 'Multi-company support', 'Custom field mapping', 'Automated backups']
    },
    {
      id: 'sage',
      name: 'Sage 50/100/300',
      type: 'sage',
      status: 'disconnected',
      lastSync: 'Never',
      icon: '🌿',
      description: 'Integrate with Sage accounting systems for comprehensive financial data',
      dataTypes: ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Inventory', 'Payroll'],
      features: ['Multi-currency support', 'Advanced reporting', 'Data validation', 'Error handling']
    },
    {
      id: 'greatplains',
      name: 'Microsoft Dynamics GP',
      type: 'greatplains',
      status: 'disconnected',
      lastSync: 'Never',
      icon: '🏢',
      description: 'Connect to Microsoft Dynamics Great Plains for enterprise financial data',
      dataTypes: ['Financial Series', 'Distribution', 'Manufacturing', 'Project Accounting', 'HR & Payroll'],
      features: ['Enterprise integration', 'Complex data structures', 'Security compliance', 'Audit trails']
    },
    {
      id: 'xero',
      name: 'Xero',
      type: 'xero',
      status: 'connected',
      lastSync: '2 hours ago',
      icon: '🔵',
      description: 'Beautiful business financial management platform',
      dataTypes: ['Bank Transactions', 'Invoices', 'Bills', 'Contacts', 'Reports'],
      features: ['Cloud-based', 'Mobile access', 'Third-party apps', 'Bank feeds']
    }
  ]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate file upload with progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            
            // Add to financial data
            const newData: FinancialData = {
              id: `upload_${Date.now()}`,
              type: getFileType(file.name),
              name: file.name,
              period: getCurrentPeriod(),
              uploadDate: new Date().toISOString(),
              status: 'processing',
              source: 'upload',
              size: formatFileSize(file.size),
              recordCount: Math.floor(Math.random() * 1000) + 100
            };
            
            setFinancialData(prev => [...prev, newData]);
            
            // Simulate processing completion
            setTimeout(() => {
              setFinancialData(prev => prev.map(item => 
                item.id === newData.id ? { ...item, status: 'completed' as const } : item
              ));
              
              toast({
                title: 'File processed successfully',
                description: `${file.name} has been processed and is ready for analysis`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            }, 3000);
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    });
  }, [toast]);

  const getFileType = (filename: string): FinancialData['type'] => {
    const lower = filename.toLowerCase();
    if (lower.includes('balance') || lower.includes('bs')) return 'balance_sheet';
    if (lower.includes('income') || lower.includes('pl') || lower.includes('profit')) return 'income_statement';
    if (lower.includes('cash') || lower.includes('cf')) return 'cash_flow';
    if (lower.includes('trial')) return 'trial_balance';
    if (lower.includes('budget')) return 'budget';
    return 'income_statement';
  };

  const getCurrentPeriod = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleConnect = (connection: FinancialConnection) => {
    setSelectedConnection(connection);
    onConnectionOpen();
  };

  const handleConnectionSetup = async () => {
    if (!selectedConnection) return;

    setConnections(prev => prev.map(conn => 
      conn.id === selectedConnection.id 
        ? { ...conn, status: 'syncing' as const }
        : conn
    ));

    // Simulate connection process
    setTimeout(() => {
      setConnections(prev => prev.map(conn => 
        conn.id === selectedConnection.id 
          ? { 
              ...conn, 
              status: 'connected' as const, 
              lastSync: 'Just now' 
            }
          : conn
      ));

      toast({
        title: 'Connection established',
        description: `Successfully connected to ${selectedConnection.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onConnectionClose();
    }, 3000);
  };

  const handleDisconnect = (connectionId: string) => {
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId 
        ? { ...conn, status: 'disconnected' as const, lastSync: 'Never' }
        : conn
    ));

    toast({
      title: 'Connection removed',
      description: 'Financial system has been disconnected',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSync = (connectionId: string) => {
    setConnections(prev => prev.map(conn => 
      conn.id === connectionId 
        ? { ...conn, status: 'syncing' as const }
        : conn
    ));

    // Simulate sync process
    setTimeout(() => {
      setConnections(prev => prev.map(conn => 
        conn.id === connectionId 
          ? { 
              ...conn, 
              status: 'connected' as const, 
              lastSync: 'Just now' 
            }
          : conn
      ));

      // Add synced data
      const syncedData: FinancialData = {
        id: `sync_${Date.now()}`,
        type: 'income_statement',
        name: `${connections.find(c => c.id === connectionId)?.name} - Monthly Report`,
        period: getCurrentPeriod(),
        uploadDate: new Date().toISOString(),
        status: 'completed',
        source: 'api',
        recordCount: Math.floor(Math.random() * 500) + 200
      };

      setFinancialData(prev => [...prev, syncedData]);

      toast({
        title: 'Sync completed',
        description: 'Latest financial data has been synchronized',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 4000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'green';
      case 'syncing': return 'blue';
      case 'error': return 'red';
      case 'processing': return 'yellow';
      case 'completed': return 'green';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckIcon />;
      case 'syncing': return <Spinner size="sm" />;
      case 'error': return <WarningIcon />;
      case 'processing': return <Spinner size="sm" />;
      case 'completed': return <CheckIcon />;
      default: return <InfoIcon />;
    }
  };

  const renderConnectionsTab = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          Connect your accounting systems for real-time financial data integration. Supported platforms include QuickBooks, Sage, Great Plains, and more.
        </Text>
      </Alert>

      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
        {connections.map((connection) => (
          <Card 
            key={connection.id}
            bg={cardBg}
            borderWidth="2px"
            borderColor={connection.status === 'connected' ? 'green.200' : borderColor}
          >
            <CardHeader pb={2}>
              <HStack justify="space-between">
                <HStack>
                  <Text fontSize="2xl">{connection.icon}</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="lg" fontWeight="bold">{connection.name}</Text>
                    <HStack>
                      <Badge 
                        colorScheme={getStatusColor(connection.status)} 
                        variant="solid"
                        fontSize="xs"
                      >
                        {connection.status}
                      </Badge>
                      <Text fontSize="xs" color="gray.500">
                        Last sync: {connection.lastSync}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                {getStatusIcon(connection.status)}
              </HStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={4} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  {connection.description}
                </Text>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Data Types:</Text>
                  <HStack wrap="wrap" spacing={2}>
                    {connection.dataTypes.slice(0, 3).map((type, index) => (
                      <Badge key={index} colorScheme="blue" variant="subtle" fontSize="xs">
                        {type}
                      </Badge>
                    ))}
                    {connection.dataTypes.length > 3 && (
                      <Badge colorScheme="gray" variant="subtle" fontSize="xs">
                        +{connection.dataTypes.length - 3} more
                      </Badge>
                    )}
                  </HStack>
                </Box>

                <HStack spacing={2}>
                  {connection.status === 'disconnected' ? (
                    <Button 
                      colorScheme="teal" 
                      size="sm" 
                      flex="1"
                      onClick={() => handleConnect(connection)}
                    >
                      Connect
                    </Button>
                  ) : connection.status === 'connected' ? (
                    <>
                      <Button 
                        colorScheme="blue" 
                        size="sm" 
                        flex="1"
                        onClick={() => handleSync(connection.id)}
                      >
                        Sync Now
                      </Button>
                      <IconButton
                        aria-label="Disconnect"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(connection.id)}
                      />
                    </>
                  ) : (
                    <Button 
                      colorScheme="gray" 
                      size="sm" 
                      flex="1"
                      isDisabled
                      leftIcon={<Spinner size="xs" />}
                    >
                      {connection.status === 'syncing' ? 'Syncing...' : 'Connecting...'}
                    </Button>
                  )}
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );

  const renderFileUploadTab = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          Upload financial files in CSV, Excel, or PDF format. Supported file types include Balance Sheets, Income Statements, Cash Flow, and Trial Balance reports.
        </Text>
      </Alert>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">📁 File Upload</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <Box
              border="2px dashed"
              borderColor={borderColor}
              borderRadius="lg"
              p={8}
              textAlign="center"
              w="full"
              _hover={{ borderColor: 'teal.300', bg: 'teal.50' }}
              transition="all 0.2s"
            >
              <VStack spacing={4}>
                <AttachmentIcon boxSize={12} color="gray.400" />
                <Text fontSize="lg" fontWeight="semibold">
                  Drag & drop files here or click to browse
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Supports: CSV, XLS, XLSX, PDF (Max 10MB per file)
                </Text>
                <Input
                  type="file"
                  multiple
                  accept=".csv,.xls,.xlsx,.pdf"
                  onChange={handleFileUpload}
                  position="absolute"
                  opacity={0}
                  cursor="pointer"
                  w="full"
                  h="full"
                />
                <Button colorScheme="teal" variant="outline">
                  Browse Files
                </Button>
              </VStack>
            </Box>

            {isUploading && (
              <Box w="full">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm">Uploading...</Text>
                  <Text fontSize="sm">{uploadProgress}%</Text>
                </HStack>
                <Progress value={uploadProgress} colorScheme="teal" />
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>

      {financialData.length > 0 && (
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">📊 Financial Data Files</Text>
              <Badge colorScheme="teal" variant="subtle">
                {financialData.length} files
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>File Name</Th>
                  <Th>Type</Th>
                  <Th>Period</Th>
                  <Th>Source</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {financialData.map((file) => (
                  <Tr key={file.id}>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="semibold">{file.name}</Text>
                        {file.size && (
                          <Text fontSize="xs" color="gray.500">{file.size}</Text>
                        )}
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                        {file.type.replace('_', ' ')}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontSize="sm">{file.period}</Text>
                    </Td>
                    <Td>
                      <Badge 
                        colorScheme={file.source === 'api' ? 'green' : 'blue'} 
                        variant="subtle" 
                        fontSize="xs"
                      >
                        {file.source}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack>
                        {getStatusIcon(file.status)}
                        <Badge 
                          colorScheme={getStatusColor(file.status)} 
                          variant="subtle" 
                          fontSize="xs"
                        >
                          {file.status}
                        </Badge>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack spacing={1}>
                        <Tooltip label="View Details">
                          <IconButton
                            aria-label="View"
                            icon={<InfoIcon />}
                            size="xs"
                            variant="ghost"
                          />
                        </Tooltip>
                        <Tooltip label="Download">
                          <IconButton
                            aria-label="Download"
                            icon={<DownloadIcon />}
                            size="xs"
                            variant="ghost"
                          />
                        </Tooltip>
                        <Tooltip label="Delete">
                          <IconButton
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            size="xs"
                            variant="ghost"
                            colorScheme="red"
                          />
                        </Tooltip>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  const renderDataMappingTab = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          Map your financial data fields to standardized formats for consistent analysis across different accounting systems.
        </Text>
      </Alert>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">🔗 Field Mapping Configuration</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Select placeholder="Select data source" maxW="300px">
                <option value="quickbooks">QuickBooks Online</option>
                <option value="sage">Sage 50</option>
                <option value="upload">Uploaded File</option>
              </Select>
              <Button colorScheme="teal" onClick={onMappingOpen}>
                Configure Mapping
              </Button>
            </HStack>

            <Box p={4} borderRadius="md" bg="gray.50">
              <Text fontSize="sm" fontWeight="semibold" mb={2}>Default Mappings:</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" fontWeight="semibold">Standard Fields</Text>
                  <Text fontSize="xs">• Account Code → GL_Account</Text>
                  <Text fontSize="xs">• Account Name → GL_Description</Text>
                  <Text fontSize="xs">• Debit Amount → Debit_Amount</Text>
                  <Text fontSize="xs">• Credit Amount → Credit_Amount</Text>
                </VStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" fontWeight="semibold">Date Fields</Text>
                  <Text fontSize="xs">• Transaction Date → Trans_Date</Text>
                  <Text fontSize="xs">• Period → Accounting_Period</Text>
                  <Text fontSize="xs">• Year → Fiscal_Year</Text>
                  <Text fontSize="xs">• Month → Fiscal_Month</Text>
                </VStack>
              </Grid>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold">
              💰 Financial System Integration
            </Text>
            <Text color="gray.600">
              Connect accounting systems, upload financial data, and configure automated data flows
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="green" variant="subtle">
                {connections.filter(c => c.status === 'connected').length} Connected
              </Badge>
              <Badge colorScheme="blue" variant="subtle">
                {financialData.length} Data Files
              </Badge>
            </HStack>
          </VStack>
        </HStack>

        {/* Main Content */}
        <Tabs index={activeTab} onChange={setActiveTab} variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab>🔗 System Connections</Tab>
            <Tab>📁 File Upload</Tab>
            <Tab>🗂️ Data Mapping</Tab>
            <Tab>📊 Integration Status</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0} pt={6}>
              {renderConnectionsTab()}
            </TabPanel>
            
            <TabPanel p={0} pt={6}>
              {renderFileUploadTab()}
            </TabPanel>
            
            <TabPanel p={0} pt={6}>
              {renderDataMappingTab()}
            </TabPanel>

            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">📈 Integration Summary</Text>
                  </CardHeader>
                  <CardBody>
                    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                      <VStack>
                        <Text fontSize="2xl" fontWeight="bold" color="green.500">
                          {connections.filter(c => c.status === 'connected').length}
                        </Text>
                        <Text fontSize="sm" textAlign="center">Active Connections</Text>
                      </VStack>
                      <VStack>
                        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                          {financialData.filter(f => f.status === 'completed').length}
                        </Text>
                        <Text fontSize="sm" textAlign="center">Processed Files</Text>
                      </VStack>
                      <VStack>
                        <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                          {financialData.reduce((sum, f) => sum + (f.recordCount || 0), 0).toLocaleString()}
                        </Text>
                        <Text fontSize="sm" textAlign="center">Total Records</Text>
                      </VStack>
                      <VStack>
                        <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                          24/7
                        </Text>
                        <Text fontSize="sm" textAlign="center">Monitoring</Text>
                      </VStack>
                    </Grid>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Connection Setup Modal */}
        <Modal isOpen={isConnectionOpen} onClose={onConnectionClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Text fontSize="lg">{selectedConnection?.icon}</Text>
                <Text>Connect to {selectedConnection?.name}</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedConnection && (
                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" color="gray.600">
                    {selectedConnection.description}
                  </Text>
                  
                  <Alert status="info" size="sm">
                    <AlertIcon />
                    <Text fontSize="sm">
                      You will be redirected to {selectedConnection.name} to authorize the connection. 
                      Your login credentials are never stored by Lucidra.
                    </Text>
                  </Alert>

                  <FormControl>
                    <FormLabel>Company Database</FormLabel>
                    <Select placeholder="Select your company database">
                      <option value="main">Main Company</option>
                      <option value="subsidiary1">Subsidiary 1</option>
                      <option value="subsidiary2">Subsidiary 2</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Sync Frequency</FormLabel>
                    <Select defaultValue="daily">
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </Select>
                  </FormControl>

                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>Data to Sync:</Text>
                    <VStack align="start" spacing={2}>
                      {selectedConnection.dataTypes.map((type, index) => (
                        <HStack key={index}>
                          <Switch defaultChecked colorScheme="teal" />
                          <Text fontSize="sm">{type}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onConnectionClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="teal" 
                onClick={handleConnectionSetup}
                leftIcon={<ExternalLinkIcon />}
              >
                Connect & Authorize
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Field Mapping Modal */}
        <Modal isOpen={isMappingOpen} onClose={onMappingClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>🔗 Field Mapping Configuration</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Alert status="info" size="sm">
                  <AlertIcon />
                  <Text fontSize="sm">
                    Map source fields from your accounting system to standardized target fields.
                  </Text>
                </Alert>

                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Source Field</Th>
                      <Th>Target Field</Th>
                      <Th>Data Type</Th>
                      <Th>Required</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {[
                      { source: 'acct_no', target: 'GL_Account', type: 'Text', required: true, mapped: true },
                      { source: 'acct_desc', target: 'GL_Description', type: 'Text', required: true, mapped: true },
                      { source: 'dr_amount', target: 'Debit_Amount', type: 'Number', required: false, mapped: true },
                      { source: 'cr_amount', target: 'Credit_Amount', type: 'Number', required: false, mapped: false },
                      { source: 'trans_dt', target: 'Trans_Date', type: 'Date', required: true, mapped: true }
                    ].map((field, index) => (
                      <Tr key={index}>
                        <Td>
                          <Input size="sm" defaultValue={field.source} />
                        </Td>
                        <Td>
                          <Select size="sm" defaultValue={field.target}>
                            <option value="GL_Account">GL_Account</option>
                            <option value="GL_Description">GL_Description</option>
                            <option value="Debit_Amount">Debit_Amount</option>
                            <option value="Credit_Amount">Credit_Amount</option>
                            <option value="Trans_Date">Trans_Date</option>
                          </Select>
                        </Td>
                        <Td>
                          <Badge colorScheme="blue" variant="subtle" size="sm">
                            {field.type}
                          </Badge>
                        </Td>
                        <Td>
                          <Badge 
                            colorScheme={field.required ? 'red' : 'gray'} 
                            variant="subtle" 
                            size="sm"
                          >
                            {field.required ? 'Required' : 'Optional'}
                          </Badge>
                        </Td>
                        <Td>
                          <Badge 
                            colorScheme={field.mapped ? 'green' : 'yellow'} 
                            variant="subtle" 
                            size="sm"
                          >
                            {field.mapped ? 'Mapped' : 'Unmapped'}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onMappingClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={onMappingClose}>
                Save Mapping
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default FinancialIntegration;