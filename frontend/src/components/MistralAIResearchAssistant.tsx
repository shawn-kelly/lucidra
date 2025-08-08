import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Input,
  Select,
  FormControl,
  FormLabel,
  Badge,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  useToast,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  List,
  ListItem,
  UnorderedList
} from '@chakra-ui/react';

interface ResearchInsight {
  id: string;
  title: string;
  content: string;
  category: string;
  confidence: number;
  sources: string[];
  tags: string[];
}

const MistralAIResearchAssistant: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [researchQuery, setResearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('business_strategy');
  const [researchResults, setResearchResults] = useState<ResearchInsight[]>([]);

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  // Simplified research data to prevent performance issues
  const researchData = {
    business_strategy: {
      title: 'Blue Ocean Strategy Analysis',
      content: 'Analysis shows significant opportunities in uncontested market spaces for strategic planning tools.',
      confidence: 0.89,
      sources: ['Harvard Business Review', 'McKinsey Analysis'],
      tags: ['blue ocean', 'market opportunity']
    },
    competitive_analysis: {
      title: 'Competitive Landscape Overview',
      content: 'Current market dominated by visual tools lacking strategic depth. Opportunity for integrated approach.',
      confidence: 0.87,
      sources: ['Market Research', 'Competitive Intelligence'],
      tags: ['competitive analysis', 'market positioning']
    },
    market_research: {
      title: 'Strategic Planning Market Size',
      content: 'Market projected to reach $3.9B by 2025, with SMB segment representing significant opportunity.',
      confidence: 0.94,
      sources: ['Market Research Future', 'Forrester'],
      tags: ['market size', 'growth trends']
    }
  };

  const handleResearch = async () => {
    if (!researchQuery.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate research delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const data = researchData[selectedCategory as keyof typeof researchData] || researchData.business_strategy;
    
    const newInsight: ResearchInsight = {
      id: `insight_${Date.now()}`,
      title: data.title,
      content: `Based on your query "${researchQuery}": ${data.content}`,
      category: selectedCategory,
      confidence: data.confidence,
      sources: data.sources,
      tags: data.tags
    };
    
    setResearchResults([newInsight]);
    setIsAnalyzing(false);
    
    toast({
      title: 'Research Complete',
      description: 'Generated insights for your query',
      status: 'success',
      duration: 3000
    });
  };

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack justify="space-between" align="center" mb={4}>
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="purple.600">🧠 AI Research Assistant</Text>
              <Text color="gray.600">Local AI research and analysis for strategic planning</Text>
            </VStack>
            <HStack spacing={3}>
              <Badge colorScheme="purple" fontSize="sm" px={3} py={1}>
                Local AI Engine
              </Badge>
              <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
                No API Required
              </Badge>
            </HStack>
          </HStack>

          {/* Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <Stat>
              <StatLabel>Research Database</StatLabel>
              <StatNumber color="purple.500">500+</StatNumber>
              <StatHelpText>Insights & patterns</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Frameworks</StatLabel>
              <StatNumber color="blue.500">15</StatNumber>
              <StatHelpText>Strategic methodologies</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Competitors</StatLabel>
              <StatNumber color="orange.500">25</StatNumber>
              <StatHelpText>Market players tracked</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Recommendations</StatLabel>
              <StatNumber color="green.500">50+</StatNumber>
              <StatHelpText>Development suggestions</StatHelpText>
            </Stat>
          </SimpleGrid>
        </Box>

        {/* Research Query Interface */}
        <Card>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">🔍 Research Query Interface</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <FormControl flex={2}>
                  <FormLabel>Research Topic</FormLabel>
                  <Input 
                    value={researchQuery}
                    onChange={(e) => setResearchQuery(e.target.value)}
                    placeholder="What would you like to research? (e.g., 'competitive analysis for Blue Ocean Strategy')"
                    size="lg"
                  />
                </FormControl>
                <FormControl maxW="200px">
                  <FormLabel>Category</FormLabel>
                  <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="business_strategy">Business Strategy</option>
                    <option value="competitive_analysis">Competitive Analysis</option>
                    <option value="market_research">Market Research</option>
                  </Select>
                </FormControl>
                <Button 
                  colorScheme="purple" 
                  size="lg" 
                  onClick={handleResearch}
                  isLoading={isAnalyzing}
                  loadingText="Analyzing..."
                  minW="120px"
                >
                  🚀 Research
                </Button>
              </HStack>
              
              {isAnalyzing && (
                <Alert status="info">
                  <Spinner size="sm" mr={3} />
                  <Box>
                    <Text fontWeight="semibold">AI Analysis in Progress</Text>
                    <Text fontSize="sm">Processing your query and generating insights...</Text>
                  </Box>
                </Alert>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Research Results */}
        {researchResults.length > 0 && (
          <Card>
            <CardBody>
              <Tabs colorScheme="purple">
                <TabList>
                  <Tab>📊 Research Insights</Tab>
                  <Tab>🏢 Competitive Intelligence</Tab>
                  <Tab>📈 Implementation Guide</Tab>
                </TabList>

                <TabPanels>
                  {/* Research Insights */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <Text fontSize="xl" fontWeight="bold">Research Insights</Text>
                      
                      {researchResults.map((insight) => (
                        <Card key={insight.id} variant="outline">
                          <CardHeader>
                            <HStack justify="space-between">
                              <Text fontWeight="bold" fontSize="lg">{insight.title}</Text>
                              <Badge colorScheme="purple">{insight.category.replace('_', ' ')}</Badge>
                            </HStack>
                          </CardHeader>
                          <CardBody>
                            <VStack spacing={4} align="stretch">
                              <Text>{insight.content}</Text>
                              
                              <Box>
                                <Text fontSize="sm" fontWeight="semibold" mb={2}>Sources:</Text>
                                <UnorderedList fontSize="sm" color="gray.600">
                                  {insight.sources.map((source, index) => (
                                    <ListItem key={index}>{source}</ListItem>
                                  ))}
                                </UnorderedList>
                              </Box>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </TabPanel>

                  {/* Competitive Intelligence */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <Text fontSize="xl" fontWeight="bold">Competitive Intelligence</Text>
                      
                      <Card variant="outline">
                        <CardHeader>
                          <Text fontWeight="bold" fontSize="lg">Market Analysis</Text>
                        </CardHeader>
                        <CardBody>
                          <Text>Key competitive factors in the strategic planning software market include user experience, framework depth, and data integration capabilities.</Text>
                        </CardBody>
                      </Card>
                    </VStack>
                  </TabPanel>

                  {/* Implementation Guide */}
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <Text fontSize="xl" fontWeight="bold">Implementation Guide</Text>
                      
                      <Card>
                        <CardHeader>
                          <Text fontSize="md" fontWeight="bold">🎯 Strategic Recommendations</Text>
                        </CardHeader>
                        <CardBody>
                          <List spacing={2}>
                            <ListItem>Focus on underserved SMB market segment</ListItem>
                            <ListItem>Integrate AI throughout user experience</ListItem>
                            <ListItem>Build strong collaboration features</ListItem>
                            <ListItem>Emphasize measurable ROI and business impact</ListItem>
                          </List>
                        </CardBody>
                      </Card>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        )}

        {/* Quick Research Shortcuts */}
        <Card>
          <CardHeader>
            <Text fontSize="lg" fontWeight="bold">⚡ Quick Research Shortcuts</Text>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Button 
                variant="outline" 
                colorScheme="purple" 
                h="auto" 
                p={4}
                onClick={() => {
                  setResearchQuery("competitive analysis for strategic planning software");
                  setSelectedCategory("competitive_analysis");
                }}
              >
                <VStack>
                  <Text fontSize="2xl">🏢</Text>
                  <Text fontSize="sm">Competitive Analysis</Text>
                </VStack>
              </Button>
              
              <Button 
                variant="outline" 
                colorScheme="blue" 
                h="auto" 
                p={4}
                onClick={() => {
                  setResearchQuery("market opportunities for strategic planning");
                  setSelectedCategory("market_research");
                }}
              >
                <VStack>
                  <Text fontSize="2xl">📈</Text>
                  <Text fontSize="sm">Market Opportunities</Text>
                </VStack>
              </Button>
              
              <Button 
                variant="outline" 
                colorScheme="green" 
                h="auto" 
                p={4}
                onClick={() => {
                  setResearchQuery("blue ocean strategy implementation");
                  setSelectedCategory("business_strategy");
                }}
              >
                <VStack>
                  <Text fontSize="2xl">🌊</Text>
                  <Text fontSize="sm">Strategy Analysis</Text>
                </VStack>
              </Button>
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default MistralAIResearchAssistant;