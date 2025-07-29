import React, { useState, useRef, useEffect } from 'react';
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
  Alert,
  AlertIcon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Input,
  Select,
  FormControl,
  FormLabel,
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Spinner,
  Grid,
  GridItem,
  Divider,
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  Tag,
  TagLabel,
  TagCloseButton,
  Switch,
  NumberInput,
  NumberInputField,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react';
import { 
  AddIcon, 
  CheckIcon, 
  EditIcon, 
  DeleteIcon,
  DownloadIcon,
  ChatIcon,
  TimeIcon,
  WarningIcon,
  InfoIcon,
  StarIcon,
  SearchIcon,
  CalendarIcon,
  RepeatIcon,
  ViewIcon
} from '@chakra-ui/icons';

interface ProcessIssue {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  processArea: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  impactLevel: number;
  estimatedTime: number;
  tags: string[];
  aiSuggestions: string[];
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  attachments?: string[];
  relatedIssues?: string[];
}

interface AIAnalysis {
  summary: string;
  rootCause: string;
  recommendations: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedResolutionTime: string;
  similarIssues: string[];
  preventionTips: string[];
}

interface ProcessReport {
  id: string;
  title: string;
  period: string;
  generatedAt: string;
  issueCount: number;
  resolvedCount: number;
  avgResolutionTime: string;
  topIssues: string[];
  improvements: string[];
  trends: string[];
}

const AIProcessLogger: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [issues, setIssues] = useState<ProcessIssue[]>([]);
  const [quickLogText, setQuickLogText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<ProcessIssue | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isQuickMode, setIsQuickMode] = useState(true);
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Sample data for demonstration
  useEffect(() => {
    const sampleIssues: ProcessIssue[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        title: 'Inventory system slow response',
        description: 'The inventory lookup is taking 15+ seconds to load, causing delays in order processing',
        processArea: 'Inventory Management',
        severity: 'high',
        status: 'investigating',
        impactLevel: 8,
        estimatedTime: 120,
        tags: ['performance', 'inventory', 'system'],
        aiSuggestions: [
          'Check database indexing on inventory tables',
          'Review recent system updates',
          'Monitor server resource usage'
        ],
        relatedIssues: ['2']
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        title: 'Customer complaint processing delay',
        description: 'Customer service team reports 2-3 day delays in processing complaints due to manual routing',
        processArea: 'Customer Service',
        severity: 'medium',
        status: 'resolved',
        impactLevel: 6,
        estimatedTime: 60,
        tags: ['customer-service', 'manual-process', 'delays'],
        aiSuggestions: [
          'Implement automated ticket routing',
          'Create complaint priority matrix',
          'Set up escalation workflows'
        ],
        resolution: 'Implemented automated routing system with priority-based assignment',
        resolvedBy: 'AI Process Optimizer',
        resolvedAt: new Date(Date.now() - 1800000).toISOString(),
        relatedIssues: ['1']
      }
    ];
    setIssues(sampleIssues);
  }, []);

  const handleQuickLog = async () => {
    if (!quickLogText.trim()) return;

    const newIssue: ProcessIssue = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      title: quickLogText.split('.')[0] || 'Process Issue',
      description: quickLogText,
      processArea: 'General',
      severity: 'medium',
      status: 'open',
      impactLevel: 5,
      estimatedTime: 30,
      tags: [],
      aiSuggestions: []
    };

    setIssues(prev => [newIssue, ...prev]);
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const analysis: AIAnalysis = {
        summary: 'Automated analysis of the reported process issue',
        rootCause: 'Potential workflow bottleneck identified',
        recommendations: [
          'Review current process documentation',
          'Identify alternative workflow paths',
          'Consider automation opportunities'
        ],
        priority: 'medium',
        estimatedResolutionTime: '2-4 hours',
        similarIssues: issues.slice(0, 2).map(i => i.title),
        preventionTips: [
          'Implement regular process reviews',
          'Set up monitoring alerts',
          'Document standard procedures'
        ]
      };

      setIssues(prev => prev.map(issue => 
        issue.id === newIssue.id 
          ? { 
              ...issue, 
              aiSuggestions: analysis.recommendations,
              tags: ['auto-logged', 'ai-analyzed']
            }
          : issue
      ));

      setIsAnalyzing(false);
      setQuickLogText('');
      
      toast({
        title: 'Issue logged successfully',
        description: 'AI analysis completed and suggestions generated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 3000);
  };

  const handleVoiceRecord = () => {
    setVoiceRecording(!voiceRecording);
    
    if (!voiceRecording) {
      // Simulate voice recording
      toast({
        title: 'Voice recording started',
        description: 'Speak your process issue description',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        setVoiceRecording(false);
        setQuickLogText('Voice recorded: Customer approval process taking too long due to multiple manual steps requiring manager sign-off');
        
        toast({
          title: 'Voice recording completed',
          description: 'Text has been transcribed and ready for logging',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }, 5000);
    }
  };

  const handleIssueClick = (issue: ProcessIssue) => {
    setSelectedIssue(issue);
    onDetailOpen();
  };

  const handleResolveIssue = (issueId: string, resolution: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { 
            ...issue, 
            status: 'resolved' as const,
            resolution,
            resolvedBy: 'User',
            resolvedAt: new Date().toISOString()
          }
        : issue
    ));

    toast({
      title: 'Issue resolved',
      description: 'Resolution has been recorded and AI will learn from this solution',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'green';
      case 'investigating': return 'blue';
      case 'closed': return 'gray';
      default: return 'orange';
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || issue.severity === filterSeverity;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const generateReport = () => {
    const resolvedIssues = issues.filter(i => i.status === 'resolved');
    const avgResolutionTime = resolvedIssues.length > 0 
      ? Math.round(resolvedIssues.reduce((sum, issue) => sum + (issue.estimatedTime || 0), 0) / resolvedIssues.length)
      : 0;

    const report: ProcessReport = {
      id: Date.now().toString(),
      title: `Process Issues Report - ${new Date().toLocaleDateString()}`,
      period: 'Last 30 days',
      generatedAt: new Date().toISOString(),
      issueCount: issues.length,
      resolvedCount: resolvedIssues.length,
      avgResolutionTime: `${avgResolutionTime} minutes`,
      topIssues: issues.slice(0, 5).map(i => i.title),
      improvements: [
        'Reduced average resolution time by 25%',
        'Increased automation in customer service',
        'Improved inventory system performance'
      ],
      trends: [
        'System performance issues trending down',
        'Customer service efficiency improving',
        'More proactive issue identification'
      ]
    };

    return report;
  };

  const renderQuickLogger = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <Text fontSize="sm">
          Quickly log process issues as they occur. AI will analyze patterns and suggest solutions without disrupting your workflow.
        </Text>
      </Alert>

      <Card bg={cardBg} borderWidth="2px" borderColor="teal.200">
        <CardHeader pb={2}>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">📝 Quick Issue Logger</Text>
            <HStack>
              <Switch 
                isChecked={isQuickMode} 
                onChange={(e) => setIsQuickMode(e.target.checked)}
                colorScheme="teal"
              />
              <Text fontSize="sm">Quick Mode</Text>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody pt={0}>
          <VStack spacing={4}>
            <Textarea
              ref={textareaRef}
              value={quickLogText}
              onChange={(e) => setQuickLogText(e.target.value)}
              placeholder="Describe the process issue you're experiencing... (e.g., 'Customer approval process taking too long, need manager sign-offs for every request')"
              rows={4}
              resize="vertical"
              bg={voiceRecording ? 'red.50' : 'white'}
              borderColor={voiceRecording ? 'red.300' : borderColor}
            />
            
            <HStack w="full" justify="space-between">
              <HStack>
                <Button
                  leftIcon={voiceRecording ? <Spinner size="sm" /> : <ChatIcon />}
                  onClick={handleVoiceRecord}
                  colorScheme={voiceRecording ? 'red' : 'blue'}
                  variant="outline"
                  size="sm"
                >
                  {voiceRecording ? 'Recording...' : 'Voice Input'}
                </Button>
                
                <Select size="sm" maxW="150px" defaultValue="general">
                  <option value="general">General</option>
                  <option value="inventory">Inventory</option>
                  <option value="customer-service">Customer Service</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                </Select>
              </HStack>

              <Button
                leftIcon={isAnalyzing ? <Spinner size="sm" /> : <AddIcon />}
                onClick={handleQuickLog}
                colorScheme="teal"
                isDisabled={!quickLogText.trim() || isAnalyzing}
                loadingText="Analyzing..."
              >
                {isAnalyzing ? 'AI Analyzing...' : 'Log Issue'}
              </Button>
            </HStack>

            {isAnalyzing && (
              <Box w="full">
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm">AI Analysis in progress...</Text>
                  <Text fontSize="sm">🧠 Identifying patterns</Text>
                </HStack>
                <Progress isIndeterminate colorScheme="teal" size="sm" />
              </Box>
            )}
          </VStack>
        </CardBody>
      </Card>

      {/* Recent Issues */}
      <Card bg={cardBg}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">🕒 Recent Issues</Text>
            <Badge colorScheme="teal" variant="subtle">
              {issues.length} total
            </Badge>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={3} align="stretch">
            {issues.slice(0, 3).map((issue) => (
              <Card 
                key={issue.id}
                variant="outline"
                cursor="pointer"
                onClick={() => handleIssueClick(issue)}
                _hover={{ shadow: 'md', borderColor: 'teal.300' }}
                transition="all 0.2s"
              >
                <CardBody p={4}>
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing={1} flex="1">
                      <Text fontSize="sm" fontWeight="semibold" noOfLines={1}>
                        {issue.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600" noOfLines={2}>
                        {issue.description}
                      </Text>
                      <HStack spacing={2}>
                        <Badge 
                          colorScheme={getSeverityColor(issue.severity)} 
                          variant="subtle" 
                          size="sm"
                        >
                          {issue.severity}
                        </Badge>
                        <Badge 
                          colorScheme={getStatusColor(issue.status)} 
                          variant="subtle" 
                          size="sm"
                        >
                          {issue.status}
                        </Badge>
                        <Text fontSize="xs" color="gray.500">
                          {new Date(issue.timestamp).toLocaleTimeString()}
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <Text fontSize="xs" color="gray.500">Impact</Text>
                      <Text fontSize="sm" fontWeight="bold" color="orange.500">
                        {issue.impactLevel}/10
                      </Text>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
            
            {issues.length > 3 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveTab(1)}
                rightIcon={<ViewIcon />}
              >
                View all {issues.length} issues
              </Button>
            )}
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderIssueList = () => (
    <VStack spacing={6} align="stretch">
      {/* Filters */}
      <Card bg={cardBg}>
        <CardBody>
          <HStack spacing={4} wrap="wrap">
            <FormControl maxW="200px">
              <FormLabel fontSize="sm">Search</FormLabel>
              <Input
                size="sm"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftElement={<SearchIcon />}
              />
            </FormControl>
            
            <FormControl maxW="150px">
              <FormLabel fontSize="sm">Status</FormLabel>
              <Select 
                size="sm" 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </Select>
            </FormControl>
            
            <FormControl maxW="150px">
              <FormLabel fontSize="sm">Severity</FormLabel>
              <Select 
                size="sm" 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </FormControl>

            <Button 
              leftIcon={<DownloadIcon />} 
              colorScheme="teal" 
              variant="outline" 
              size="sm"
              onClick={onReportOpen}
            >
              Generate Report
            </Button>
          </HStack>
        </CardBody>
      </Card>

      {/* Issues Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
        {filteredIssues.map((issue) => (
          <Card 
            key={issue.id}
            bg={cardBg}
            cursor="pointer"
            onClick={() => handleIssueClick(issue)}
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
            transition="all 0.2s"
            borderWidth="2px"
            borderColor={issue.status === 'resolved' ? 'green.200' : borderColor}
          >
            <CardHeader pb={2}>
              <HStack justify="space-between" align="start">
                <VStack align="start" spacing={1} flex="1">
                  <Text fontSize="md" fontWeight="bold" noOfLines={2}>
                    {issue.title}
                  </Text>
                  <HStack spacing={2}>
                    <Badge 
                      colorScheme={getSeverityColor(issue.severity)} 
                      variant="solid" 
                      size="sm"
                    >
                      {issue.severity}
                    </Badge>
                    <Badge 
                      colorScheme={getStatusColor(issue.status)} 
                      variant="subtle" 
                      size="sm"
                    >
                      {issue.status}
                    </Badge>
                  </HStack>
                </VStack>
                <VStack align="end" spacing={0}>
                  <Text fontSize="xs" color="gray.500">Impact</Text>
                  <Text fontSize="lg" fontWeight="bold" 
                        color={issue.impactLevel >= 8 ? 'red.500' : 
                               issue.impactLevel >= 6 ? 'orange.500' : 'green.500'}>
                    {issue.impactLevel}
                  </Text>
                </VStack>
              </HStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3} align="stretch">
                <Text fontSize="sm" color="gray.600" noOfLines={3}>
                  {issue.description}
                </Text>
                
                <HStack justify="space-between">
                  <Text fontSize="xs" color="gray.500">
                    📂 {issue.processArea}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    🕒 {issue.estimatedTime}min
                  </Text>
                </HStack>

                {issue.tags.length > 0 && (
                  <HStack wrap="wrap" spacing={1}>
                    {issue.tags.slice(0, 3).map((tag, index) => (
                      <Tag key={index} size="sm" colorScheme="blue" variant="subtle">
                        <TagLabel>{tag}</TagLabel>
                      </Tag>
                    ))}
                    {issue.tags.length > 3 && (
                      <Text fontSize="xs" color="gray.500">
                        +{issue.tags.length - 3} more
                      </Text>
                    )}
                  </HStack>
                )}

                <HStack justify="space-between" align="center">
                  <Text fontSize="xs" color="gray.500">
                    {new Date(issue.timestamp).toLocaleString()}
                  </Text>
                  {issue.aiSuggestions.length > 0 && (
                    <Badge colorScheme="purple" variant="subtle" size="sm">
                      🧠 AI Analyzed
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {filteredIssues.length === 0 && (
        <Card bg={cardBg}>
          <CardBody textAlign="center" py={12}>
            <VStack spacing={4}>
              <Text fontSize="4xl">🔍</Text>
              <Text fontSize="lg" fontWeight="semibold">No issues found</Text>
              <Text fontSize="sm" color="gray.600">
                {searchTerm || filterStatus !== 'all' || filterSeverity !== 'all' 
                  ? 'Try adjusting your filters or search terms'
                  : 'Start by logging your first process issue'
                }
              </Text>
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  const renderAnalytics = () => {
    const resolvedCount = issues.filter(i => i.status === 'resolved').length;
    const criticalCount = issues.filter(i => i.severity === 'critical').length;
    const avgImpact = issues.length > 0 
      ? Math.round(issues.reduce((sum, i) => sum + i.impactLevel, 0) / issues.length)
      : 0;

    return (
      <VStack spacing={6} align="stretch">
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <Card bg={cardBg} textAlign="center">
            <CardBody>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                  {issues.length}
                </Text>
                <Text fontSize="sm">Total Issues</Text>
              </VStack>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} textAlign="center">
            <CardBody>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="green.500">
                  {resolvedCount}
                </Text>
                <Text fontSize="sm">Resolved</Text>
              </VStack>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} textAlign="center">
            <CardBody>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="red.500">
                  {criticalCount}
                </Text>
                <Text fontSize="sm">Critical</Text>
              </VStack>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} textAlign="center">
            <CardBody>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                  {avgImpact}
                </Text>
                <Text fontSize="sm">Avg Impact</Text>
              </VStack>
            </CardBody>
          </Card>
        </Grid>

        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">📈 Issue Trends</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm">Resolution Rate</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {issues.length > 0 ? Math.round((resolvedCount / issues.length) * 100) : 0}%
                </Text>
              </HStack>
              <Progress 
                value={issues.length > 0 ? (resolvedCount / issues.length) * 100 : 0} 
                colorScheme="green" 
                size="sm" 
              />
              
              <HStack justify="space-between">
                <Text fontSize="sm">AI Analysis Coverage</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {issues.length > 0 ? Math.round((issues.filter(i => i.aiSuggestions.length > 0).length / issues.length) * 100) : 0}%
                </Text>
              </HStack>
              <Progress 
                value={issues.length > 0 ? (issues.filter(i => i.aiSuggestions.length > 0).length / issues.length) * 100 : 0} 
                colorScheme="purple" 
                size="sm" 
              />
            </VStack>
          </CardBody>
        </Card>

        <Card bg={cardBg}>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🎯 Top Process Areas</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              {['Customer Service', 'Inventory Management', 'Finance', 'HR'].map((area, index) => {
                const areaCount = issues.filter(i => i.processArea === area).length;
                const percentage = issues.length > 0 ? (areaCount / issues.length) * 100 : 0;
                
                return (
                  <HStack key={area} justify="space-between">
                    <Text fontSize="sm">{area}</Text>
                    <HStack>
                      <Text fontSize="sm" fontWeight="bold">{areaCount}</Text>
                      <Progress value={percentage} colorScheme="teal" size="sm" w="100px" />
                    </HStack>
                  </HStack>
                );
              })}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    );
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold">
              🤖 AI Process Issue Logger
            </Text>
            <Text color="gray.600">
              Note-taking style issue logging with AI analysis and real-time process improvement tracking
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="teal" variant="subtle">
                {issues.length} Issues Logged
              </Badge>
              <Badge colorScheme="green" variant="subtle">
                {issues.filter(i => i.status === 'resolved').length} Resolved
              </Badge>
              <Badge colorScheme="purple" variant="subtle">
                AI-Powered Analysis
              </Badge>
            </HStack>
          </VStack>
        </HStack>

        {/* Main Content */}
        <Tabs index={activeTab} onChange={setActiveTab} variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab>📝 Quick Logger</Tab>
            <Tab>📋 Issue List</Tab>
            <Tab>📊 Analytics</Tab>
            <Tab>📄 Reports</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0} pt={6}>
              {renderQuickLogger()}
            </TabPanel>
            
            <TabPanel p={0} pt={6}>
              {renderIssueList()}
            </TabPanel>
            
            <TabPanel p={0} pt={6}>
              {renderAnalytics()}
            </TabPanel>

            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <Alert status="info">
                  <AlertIcon />
                  <Text fontSize="sm">
                    Generate comprehensive reports showing issue patterns, resolution trends, and process improvement recommendations.
                  </Text>
                </Alert>
                
                <Button 
                  leftIcon={<DownloadIcon />} 
                  colorScheme="teal" 
                  onClick={onReportOpen}
                  alignSelf="start"
                >
                  Generate Process Report
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Issue Detail Modal */}
        <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Text>{selectedIssue?.title}</Text>
                <Badge 
                  colorScheme={selectedIssue ? getSeverityColor(selectedIssue.severity) : 'gray'} 
                  variant="solid"
                >
                  {selectedIssue?.severity}
                </Badge>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedIssue && (
                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" color="gray.600">
                    {selectedIssue.description}
                  </Text>
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="xs" color="gray.500">Process Area</Text>
                      <Text fontSize="sm" fontWeight="semibold">{selectedIssue.processArea}</Text>
                    </VStack>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="xs" color="gray.500">Impact Level</Text>
                      <Text fontSize="sm" fontWeight="semibold">{selectedIssue.impactLevel}/10</Text>
                    </VStack>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="xs" color="gray.500">Estimated Time</Text>
                      <Text fontSize="sm" fontWeight="semibold">{selectedIssue.estimatedTime} minutes</Text>
                    </VStack>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="xs" color="gray.500">Status</Text>
                      <Badge colorScheme={getStatusColor(selectedIssue.status)} variant="subtle">
                        {selectedIssue.status}
                      </Badge>
                    </VStack>
                  </Grid>

                  {selectedIssue.aiSuggestions.length > 0 && (
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>🧠 AI Suggestions:</Text>
                      <List spacing={1}>
                        {selectedIssue.aiSuggestions.map((suggestion, index) => (
                          <ListItem key={index}>
                            <ListIcon as={CheckIcon} color="purple.500" />
                            <Text fontSize="sm" display="inline">{suggestion}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {selectedIssue.resolution && (
                    <Box p={4} borderRadius="md" bg="green.50">
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>✅ Resolution:</Text>
                      <Text fontSize="sm">{selectedIssue.resolution}</Text>
                      <Text fontSize="xs" color="gray.500" mt={2}>
                        Resolved by {selectedIssue.resolvedBy} at{' '}
                        {selectedIssue.resolvedAt && new Date(selectedIssue.resolvedAt).toLocaleString()}
                      </Text>
                    </Box>
                  )}

                  {selectedIssue.status !== 'resolved' && (
                    <Box>
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>Add Resolution:</Text>
                      <Textarea
                        placeholder="Describe how this issue was resolved..."
                        size="sm"
                        rows={3}
                      />
                    </Box>
                  )}
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onDetailClose}>
                Close
              </Button>
              {selectedIssue?.status !== 'resolved' && (
                <Button 
                  colorScheme="green" 
                  onClick={() => {
                    if (selectedIssue) {
                      handleResolveIssue(selectedIssue.id, 'Manual resolution from detail view');
                      onDetailClose();
                    }
                  }}
                >
                  Mark Resolved
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Report Modal */}
        <Modal isOpen={isReportOpen} onClose={onReportClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>📄 Process Issues Report</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                {(() => {
                  const report = generateReport();
                  return (
                    <>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <VStack align="start">
                          <Text fontSize="sm" color="gray.500">Total Issues</Text>
                          <Text fontSize="2xl" fontWeight="bold">{report.issueCount}</Text>
                        </VStack>
                        <VStack align="start">
                          <Text fontSize="sm" color="gray.500">Resolved</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="green.500">{report.resolvedCount}</Text>
                        </VStack>
                        <VStack align="start">
                          <Text fontSize="sm" color="gray.500">Avg Resolution Time</Text>
                          <Text fontSize="2xl" fontWeight="bold">{report.avgResolutionTime}</Text>
                        </VStack>
                        <VStack align="start">
                          <Text fontSize="sm" color="gray.500">Resolution Rate</Text>
                          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                            {report.issueCount > 0 ? Math.round((report.resolvedCount / report.issueCount) * 100) : 0}%
                          </Text>
                        </VStack>
                      </Grid>

                      <Divider />

                      <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={2}>Top Issues:</Text>
                        <List spacing={1}>
                          {report.topIssues.map((issue, index) => (
                            <ListItem key={index}>
                              <ListIcon as={WarningIcon} color="orange.500" />
                              <Text fontSize="sm" display="inline">{issue}</Text>
                            </ListItem>
                          ))}
                        </List>
                      </Box>

                      <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={2}>Process Improvements:</Text>
                        <List spacing={1}>
                          {report.improvements.map((improvement, index) => (
                            <ListItem key={index}>
                              <ListIcon as={CheckIcon} color="green.500" />
                              <Text fontSize="sm" display="inline">{improvement}</Text>
                            </ListItem>
                          ))}
                        </List>
                      </Box>

                      <Box>
                        <Text fontSize="md" fontWeight="semibold" mb={2}>Trends:</Text>
                        <List spacing={1}>
                          {report.trends.map((trend, index) => (
                            <ListItem key={index}>
                              <ListIcon as={InfoIcon} color="blue.500" />
                              <Text fontSize="sm" display="inline">{trend}</Text>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </>
                  );
                })()}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onReportClose}>
                Close
              </Button>
              <Button colorScheme="teal" leftIcon={<DownloadIcon />}>
                Download Report
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default AIProcessLogger;