import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Button,
  Grid,
  GridItem,
  Badge,
  Alert,
  AlertIcon,
  Progress,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useFrameworkData } from '../hooks/useFrameworkData';

const FrameworkIntegrationHubWithData: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const {
    frameworkState,
    blueOceanData,
    insights,
    applyInsightToFramework,
    hasData,
    lastUpdated
  } = useFrameworkData();

  const [activeTab, setActiveTab] = useState(0);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const toast = useToast();

  const { isOpen: isInsightOpen, onOpen: onInsightOpen, onClose: onInsightClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'blue_ocean': return '🌊';
      case 'marketing': return '📈';
      case 'hr': return '👥';
      case 'process': return '🔄';
      case 'inquiry_framework': return '🧠';
      default: return '🧩';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  const handleApplyInsight = (insightId: string, targetFramework: string) => {
    applyInsightToFramework(insightId, targetFramework);
    toast({
      title: "Insight Applied!",
      description: `Successfully applied insight to ${targetFramework} framework. Check the framework to see new strategies and actions.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const renderLiveInsightsDashboard = () => (
    <VStack spacing={6} align="stretch">
      {!hasData && (
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">No Framework Data Yet</Text>
            <Text fontSize="sm">
              Complete Blue Ocean Strategy analysis first to generate cross-framework insights. 
              Go to Blue Ocean Strategy → Six Paths Analysis or Buyer Utility Map to start.
            </Text>
          </VStack>
        </Alert>
      )}

      {hasData && (
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Live Framework Integration Active</Text>
            <Text fontSize="sm">
              {insights.length} cross-framework insights generated from your Blue Ocean Strategy analysis. 
              Data last updated: {new Date(lastUpdated).toLocaleString()}
            </Text>
          </VStack>
        </Alert>
      )}

      {insights.length > 0 && (
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
          {insights.map(insight => (
            <Card key={insight.id} bg={cardBg} _hover={{ shadow: 'lg' }} cursor="pointer">
              <CardHeader pb={3}>
                <HStack justify="space-between" align="start">
                  <HStack>
                    <Text fontSize="lg">{getFrameworkIcon(insight.sourceFramework)}</Text>
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="bold">{insight.title}</Text>
                      <Text fontSize="xs" color="gray.600">
                        From {insight.sourceFramework.replace('_', ' ')}
                      </Text>
                    </VStack>
                  </HStack>
                  <VStack align="end" spacing={1}>
                    <Badge colorScheme="green" size="sm">
                      Live Data
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(insight.createdAt).toLocaleTimeString()}
                    </Text>
                  </VStack>
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <Text fontSize="sm" color="gray.600" mb={3}>
                  {insight.description}
                </Text>
                
                <VStack spacing={3} align="stretch">
                  <Box>
                    <Text fontSize="xs" fontWeight="semibold" mb={2}>Target Frameworks:</Text>
                    <HStack spacing={2}>
                      {insight.targetFrameworks.map((target: string) => (
                        <Badge key={target} size="sm" variant="outline">
                          {getFrameworkIcon(target)} {target.replace('_', ' ')}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="semibold" mb={2}>
                      Actions ({insight.recommendations.length}):
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {insight.recommendations[0]}
                      {insight.recommendations.length > 1 && '...'}
                    </Text>
                  </Box>

                  <HStack justify="space-between">
                    <Button 
                      size="xs" 
                      variant="outline"
                      onClick={() => {
                        setSelectedInsight(insight);
                        onInsightOpen();
                      }}
                    >
                      View & Apply
                    </Button>
                    <Text fontSize="xs" color="gray.500">
                      Applied: {insight.appliedResults?.length || 0} times
                    </Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}

      {hasData && insights.length === 0 && (
        <Alert status="warning">
          <AlertIcon />
          <Text fontSize="sm">
            Blue Ocean data detected but no cross-framework insights generated yet. 
            Complete the Six Paths Analysis or Buyer Utility Map and click "Generate Insights" to create integration opportunities.
          </Text>
        </Alert>
      )}
    </VStack>
  );

  const renderLiveDataStatus = () => (
    <VStack spacing={6} align="stretch">
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Framework Data Status</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {/* Blue Ocean Status */}
            <HStack justify="space-between" p={3} bg={infoBg} borderRadius="md">
              <HStack>
                <Text fontSize="xl">🌊</Text>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold">Blue Ocean Strategy</Text>
                  <Text fontSize="sm" color="gray.600">
                    Six Paths: {blueOceanData.sixPathsAnalysis.insights.length > 0 ? 'Completed' : 'In Progress'}
                  </Text>
                </VStack>
              </HStack>
              <VStack align="end" spacing={0}>
                <Badge colorScheme={blueOceanData.sixPathsAnalysis.insights.length > 0 ? 'green' : 'gray'}>
                  {blueOceanData.sixPathsAnalysis.insights.length} insights
                </Badge>
                <Text fontSize="xs" color="gray.500">
                  {blueOceanData.sixPathsAnalysis.alternativeIndustries.length + 
                   blueOceanData.sixPathsAnalysis.buyerGroups.length + 
                   blueOceanData.sixPathsAnalysis.complementaryProducts.length} data points
                </Text>
              </VStack>
            </HStack>

            {/* Marketing Status */}
            <HStack justify="space-between" p={3} bg={infoBg} borderRadius="md">
              <HStack>
                <Text fontSize="xl">📈</Text>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold">Marketing Automation</Text>
                  <Text fontSize="sm" color="gray.600">
                    Generated from Blue Ocean insights
                  </Text>
                </VStack>
              </HStack>
              <VStack align="end" spacing={0}>
                <Badge colorScheme={frameworkState.marketing.campaigns.length > 0 ? 'green' : 'gray'}>
                  {frameworkState.marketing.campaigns.length} campaigns
                </Badge>
                <Text fontSize="xs" color="gray.500">
                  {frameworkState.marketing.generatedFromBlueOcean.length} from Blue Ocean
                </Text>
              </VStack>
            </HStack>

            {/* HR Status */}
            <HStack justify="space-between" p={3} bg={infoBg} borderRadius="md">
              <HStack>
                <Text fontSize="xl">👥</Text>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold">HR Management</Text>
                  <Text fontSize="sm" color="gray.600">
                    Strategic roles aligned with Blue Ocean
                  </Text>
                </VStack>
              </HStack>
              <VStack align="end" spacing={0}>
                <Badge colorScheme={frameworkState.hr.strategicRoles.length > 0 ? 'green' : 'gray'}>
                  {frameworkState.hr.strategicRoles.length} roles
                </Badge>
                <Text fontSize="xs" color="gray.500">
                  {frameworkState.hr.generatedFromBlueOcean.length} from Blue Ocean
                </Text>
              </VStack>
            </HStack>

            {/* Process Status */}
            <HStack justify="space-between" p={3} bg={infoBg} borderRadius="md">
              <HStack>
                <Text fontSize="xl">🔄</Text>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold">Process Improvement</Text>
                  <Text fontSize="sm" color="gray.600">
                    Improvements from utility blocks
                  </Text>
                </VStack>
              </HStack>
              <VStack align="end" spacing={0}>
                <Badge colorScheme={frameworkState.process.improvements.length > 0 ? 'green' : 'gray'}>
                  {frameworkState.process.improvements.length} improvements
                </Badge>
                <Text fontSize="xs" color="gray.500">
                  {frameworkState.process.generatedFromBlueOcean.length} from Blue Ocean
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Integration Flow */}
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">Live Integration Flow</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <HStack justify="space-between" w="full">
              <VStack spacing={2}>
                <Text fontSize="2xl">🌊</Text>
                <Text fontSize="sm" fontWeight="bold">Blue Ocean</Text>
                <Badge colorScheme="blue" size="sm">
                  {blueOceanData.sixPathsAnalysis.insights.length} insights
                </Badge>
              </VStack>
              
              <Text fontSize="2xl">→</Text>
              
              <VStack spacing={2}>
                <Text fontSize="2xl">🔗</Text>
                <Text fontSize="sm" fontWeight="bold">Integration Hub</Text>
                <Badge colorScheme="green" size="sm">
                  {insights.length} cross-insights
                </Badge>
              </VStack>
              
              <Text fontSize="2xl">→</Text>
              
              <VStack spacing={2}>
                <HStack>
                  <Text fontSize="lg">📈</Text>
                  <Text fontSize="lg">👥</Text>
                  <Text fontSize="lg">🔄</Text>
                </HStack>
                <Text fontSize="sm" fontWeight="bold">All Frameworks</Text>
                <Badge colorScheme="purple" size="sm">
                  {frameworkState.marketing.campaigns.length + 
                   frameworkState.hr.strategicRoles.length + 
                   frameworkState.process.improvements.length} actions
                </Badge>
              </VStack>
            </HStack>

            <Text fontSize="sm" color="gray.600" textAlign="center">
              Real-time data flow: Blue Ocean discoveries automatically generate specific actions in Marketing, HR, and Process frameworks
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const renderInsightDetail = () => {
    if (!selectedInsight) return null;

    return (
      <Modal isOpen={isInsightOpen} onClose={onInsightClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Text fontSize="lg">{getFrameworkIcon(selectedInsight.sourceFramework)}</Text>
              <Text>{selectedInsight.title}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Description</Text>
                <Text fontSize="sm" color="gray.600">{selectedInsight.description}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Actionable Recommendations</Text>
                <VStack spacing={2} align="stretch">
                  {selectedInsight.recommendations.map((rec: string, index: number) => (
                    <HStack key={index} align="start">
                      <Text fontSize="sm" color="blue.500">•</Text>
                      <Text fontSize="sm">{rec}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Apply to Frameworks</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                  {selectedInsight.targetFrameworks.map((framework: string) => {
                    const isApplied = selectedInsight.appliedResults?.some((result: any) => result.framework === framework);
                    return (
                      <Button
                        key={framework}
                        size="sm"
                        variant="outline"
                        leftIcon={<Text>{getFrameworkIcon(framework)}</Text>}
                        onClick={() => handleApplyInsight(selectedInsight.id, framework)}
                        isDisabled={isApplied}
                        colorScheme={isApplied ? 'green' : 'blue'}
                      >
                        {isApplied ? 'Applied ✓' : 'Apply'} to {framework.replace('_', ' ')}
                      </Button>
                    );
                  })}
                </Grid>
              </Box>

              {selectedInsight.appliedResults && selectedInsight.appliedResults.length > 0 && (
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Application Results</Text>
                  <VStack spacing={2} align="stretch">
                    {selectedInsight.appliedResults.map((result: any, index: number) => (
                      <Box key={index} p={3} bg={successBg} borderRadius="md">
                        <Text fontSize="sm" fontWeight="semibold">{result.action}</Text>
                        <Text fontSize="sm" color="gray.600" mb={2}>{result.outcome}</Text>
                        <Text fontSize="xs" color="gray.500">
                          Applied to {result.framework} at {new Date(result.timestamp).toLocaleString()}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onInsightClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">🔗</Text>
            <Text fontSize="3xl" fontWeight="bold">Framework Integration Hub</Text>
            <Badge colorScheme="green" ml={2}>LIVE DATA</Badge>
          </HStack>
          <Text color="gray.600" mb={6}>
            Real-time cross-framework intelligence showing how your Blue Ocean Strategy discoveries create specific opportunities in Marketing, HR, and Process frameworks.
          </Text>
        </Box>

        {/* Core Concept */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold">Live Strategic Intelligence Active</Text>
            <Text fontSize="sm">
              {hasData ? 
                `${insights.length} cross-framework insights generated from your Blue Ocean analysis. Data persisted and automatically synchronized.` :
                'Complete Blue Ocean Strategy analysis to activate cross-framework intelligence automation.'}
            </Text>
          </VStack>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Live Cross-Framework Insights</Tab>
            <Tab>Data Flow Status</Tab>
            <Tab>Framework Data Viewer</Tab>
            <Tab>Integration Analytics</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderLiveInsightsDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              {renderLiveDataStatus()}
            </TabPanel>
            <TabPanel px={0}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text fontSize="lg">🌊</Text>
                        <Text fontWeight="semibold">Blue Ocean Strategy Data</Text>
                        <Badge colorScheme="blue" size="sm">
                          {blueOceanData.sixPathsAnalysis.insights.length} insights
                        </Badge>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>Alternative Industries:</Text>
                        <VStack align="start" spacing={1}>
                          {blueOceanData.sixPathsAnalysis.alternativeIndustries.map((industry, index) => (
                            <Text key={index} fontSize="sm">• {industry}</Text>
                          ))}
                          {blueOceanData.sixPathsAnalysis.alternativeIndustries.length === 0 && (
                            <Text fontSize="sm" color="gray.500">None entered yet</Text>
                          )}
                        </VStack>
                      </Box>
                      <Box>
                        <Text fontSize="sm" fontWeight="semibold" mb={2}>Buyer Groups:</Text>
                        <VStack align="start" spacing={1}>
                          {blueOceanData.sixPathsAnalysis.buyerGroups.map((group, index) => (
                            <Text key={index} fontSize="sm">• {group}</Text>
                          ))}
                          {blueOceanData.sixPathsAnalysis.buyerGroups.length === 0 && (
                            <Text fontSize="sm" color="gray.500">None entered yet</Text>
                          )}
                        </VStack>
                      </Box>
                    </Grid>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text fontSize="lg">📈</Text>
                        <Text fontWeight="semibold">Generated Marketing Campaigns</Text>
                        <Badge colorScheme="green" size="sm">
                          {frameworkState.marketing.campaigns.length} campaigns
                        </Badge>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={3} align="stretch">
                      {frameworkState.marketing.campaigns.map((campaign) => (
                        <Box key={campaign.id} p={3} bg={infoBg} borderRadius="md">
                          <Text fontSize="sm" fontWeight="semibold">{campaign.name}</Text>
                          <Text fontSize="xs" color="gray.600">{campaign.messaging}</Text>
                          <HStack mt={2}>
                            <Badge size="xs" colorScheme="blue">
                              {campaign.targetBuyerGroup}
                            </Badge>
                            <Badge size="xs" colorScheme={campaign.emotionalAppeal ? 'purple' : 'gray'}>
                              {campaign.emotionalAppeal ? 'Emotional' : 'Functional'}
                            </Badge>
                          </HStack>
                        </Box>
                      ))}
                      {frameworkState.marketing.campaigns.length === 0 && (
                        <Text fontSize="sm" color="gray.500">No campaigns generated yet</Text>
                      )}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text fontSize="lg">👥</Text>
                        <Text fontWeight="semibold">Strategic HR Roles</Text>
                        <Badge colorScheme="green" size="sm">
                          {frameworkState.hr.strategicRoles.length} roles
                        </Badge>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={3} align="stretch">
                      {frameworkState.hr.strategicRoles.map((role) => (
                        <Box key={role.id} p={3} bg={infoBg} borderRadius="md">
                          <Text fontSize="sm" fontWeight="semibold">{role.title}</Text>
                          <Text fontSize="xs" color="gray.600" mb={2}>
                            {role.requiredCapabilities?.slice(0, 2).join(', ')}
                            {role.requiredCapabilities && role.requiredCapabilities.length > 2 && '...'}
                          </Text>
                          <HStack>
                            <Badge size="xs" colorScheme="purple">
                              {role.status}
                            </Badge>
                            {role.emotionalBrandingSkills && (
                              <Badge size="xs" colorScheme="orange">
                                Emotional Branding
                              </Badge>
                            )}
                          </HStack>
                        </Box>
                      ))}
                      {frameworkState.hr.strategicRoles.length === 0 && (
                        <Text fontSize="sm" color="gray.500">No strategic roles identified yet</Text>
                      )}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Integration analytics showing ROI and effectiveness metrics will be available once more cross-framework applications are completed.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Insight Detail Modal */}
      {renderInsightDetail()}
    </Box>
  );
};

export default FrameworkIntegrationHubWithData;