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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

// Porter's Five Forces Data Structures
interface CompetitiveForce {
  name: string;
  strength: number; // 1-10 scale
  factors: ForceFactor[];
  analysis: string;
  strategicImplications: string[];
  mitigationStrategies: string[];
}

interface ForceFactor {
  id: string;
  name: string;
  description: string;
  impact: number; // 1-10 scale
  evidence: string;
  source: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

interface IndustryAnalysis {
  industryName: string;
  analysisDate: string;
  overallAttractiveness: number; // 1-10 scale
  forces: {
    competitiveRivalry: CompetitiveForce;
    supplierPower: CompetitiveForce;
    buyerPower: CompetitiveForce;
    threatOfSubstitutes: CompetitiveForce;
    threatOfNewEntrants: CompetitiveForce;
  };
  strategicRecommendations: string[];
  keyInsights: string[];
  riskFactors: string[];
  opportunities: string[];
}

interface Competitor {
  id: string;
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  strategy: string;
  financialHealth: number; // 1-10 scale
  innovationCapability: number; // 1-10 scale
  marketPosition: 'leader' | 'challenger' | 'follower' | 'nicher';
}

const PortersFiveForces: React.FC<{ currentTier: string }> = ({ currentTier }) => {
  const [analysis, setAnalysis] = useState<IndustryAnalysis>({
    industryName: '',
    analysisDate: new Date().toISOString(),
    overallAttractiveness: 5,
    forces: {
      competitiveRivalry: {
        name: 'Competitive Rivalry',
        strength: 5,
        factors: [],
        analysis: '',
        strategicImplications: [],
        mitigationStrategies: []
      },
      supplierPower: {
        name: 'Supplier Power',
        strength: 5,
        factors: [],
        analysis: '',
        strategicImplications: [],
        mitigationStrategies: []
      },
      buyerPower: {
        name: 'Buyer Power',
        strength: 5,
        factors: [],
        analysis: '',
        strategicImplications: [],
        mitigationStrategies: []
      },
      threatOfSubstitutes: {
        name: 'Threat of Substitutes',
        strength: 5,
        factors: [],
        analysis: '',
        strategicImplications: [],
        mitigationStrategies: []
      },
      threatOfNewEntrants: {
        name: 'Threat of New Entrants',
        strength: 5,
        factors: [],
        analysis: '',
        strategicImplications: [],
        mitigationStrategies: []
      }
    },
    strategicRecommendations: [],
    keyInsights: [],
    riskFactors: [],
    opportunities: []
  });

  const [activeForce, setActiveForce] = useState<keyof typeof analysis.forces>('competitiveRivalry');
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [newFactor, setNewFactor] = useState<Partial<ForceFactor>>({});

  const toast = useToast();
  const { isOpen: isFactorOpen, onOpen: onFactorOpen, onClose: onFactorClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const infoBg = useColorModeValue('blue.50', 'blue.900');
  const dangerBg = useColorModeValue('red.50', 'red.900');
  const successBg = useColorModeValue('green.50', 'green.900');

  // Initialize with demo data
  useEffect(() => {
    const demoAnalysis: IndustryAnalysis = {
      industryName: 'Cloud Productivity Software',
      analysisDate: new Date().toISOString(),
      overallAttractiveness: 6,
      forces: {
        competitiveRivalry: {
          name: 'Competitive Rivalry',
          strength: 8,
          factors: [
            {
              id: 'cr_001',
              name: 'Market Maturity',
              description: 'Established market with multiple strong players',
              impact: 8,
              evidence: 'Microsoft 365, Google Workspace, Slack dominate',
              source: 'Market research',
              trend: 'stable'
            },
            {
              id: 'cr_002',
              name: 'Product Differentiation',
              description: 'Limited differentiation leading to price competition',
              impact: 7,
              evidence: 'Feature parity across major platforms',
              source: 'Competitive analysis',
              trend: 'increasing'
            }
          ],
          analysis: 'High competitive rivalry due to market maturity and feature convergence',
          strategicImplications: [
            'Price pressure on standardized features',
            'Need for unique value proposition',
            'Innovation speed critical for differentiation'
          ],
          mitigationStrategies: [
            'Focus on Blue Ocean strategies to avoid direct competition',
            'Develop unique integrations and workflows',
            'Target underserved market segments'
          ]
        },
        supplierPower: {
          name: 'Supplier Power',
          strength: 4,
          factors: [
            {
              id: 'sp_001',
              name: 'Cloud Infrastructure',
              description: 'Multiple cloud providers available (AWS, Azure, GCP)',
              impact: 4,
              evidence: 'Competitive pricing and service parity',
              source: 'Vendor analysis',
              trend: 'decreasing'
            }
          ],
          analysis: 'Moderate supplier power with multiple cloud infrastructure options',
          strategicImplications: ['Manageable infrastructure costs', 'Multi-cloud strategy possible'],
          mitigationStrategies: ['Diversify cloud providers', 'Negotiate volume discounts']
        },
        buyerPower: {
          name: 'Buyer Power',
          strength: 7,
          factors: [
            {
              id: 'bp_001',
              name: 'Switching Costs',
              description: 'Low switching costs for basic productivity tools',
              impact: 7,
              evidence: 'Easy data migration between platforms',
              source: 'Customer surveys',
              trend: 'stable'
            }
          ],
          analysis: 'High buyer power due to low switching costs and multiple alternatives',
          strategicImplications: ['Price sensitivity', 'Need for strong customer retention'],
          mitigationStrategies: ['Increase switching costs through integrations', 'Focus on customer success']
        },
        threatOfSubstitutes: {
          name: 'Threat of Substitutes',
          strength: 6,
          factors: [
            {
              id: 'ts_001',
              name: 'Alternative Solutions',
              description: 'Various tools can replace productivity suites',
              impact: 6,
              evidence: 'Notion, Airtable, specialized tools gaining market share',
              source: 'Market trends',
              trend: 'increasing'
            }
          ],
          analysis: 'Moderate threat from innovative alternative solutions',
          strategicImplications: ['Continuous innovation required', 'Integration becomes key'],
          mitigationStrategies: ['Build comprehensive platform', 'Focus on workflow optimization']
        },
        threatOfNewEntrants: {
          name: 'Threat of New Entrants',
          strength: 5,
          factors: [
            {
              id: 'ne_001',
              name: 'Capital Requirements',
              description: 'Moderate capital needed for cloud-based solutions',
              impact: 5,
              evidence: 'Successful startups like Notion, Monday.com',
              source: 'Industry analysis',
              trend: 'stable'
            }
          ],
          analysis: 'Moderate threat with opportunities for innovative entrants',
          strategicImplications: ['Innovation pressure from startups', 'Niche opportunities exist'],
          mitigationStrategies: ['Rapid innovation cycles', 'Acquire promising startups']
        }
      },
      strategicRecommendations: [
        'Pursue Blue Ocean strategy to avoid intense competitive rivalry',
        'Build strong customer lock-in through workflow integrations',
        'Focus on underserved market segments with unique needs',
        'Develop proprietary data and AI capabilities'
      ],
      keyInsights: [
        'Market is highly competitive but opportunities exist in underserved segments',
        'Customer retention more important than acquisition in mature market',
        'Innovation and unique value proposition critical for success'
      ],
      riskFactors: [
        'Price wars among major competitors',
        'Rapid feature commoditization',
        'Customer churn to innovative alternatives'
      ],
      opportunities: [
        'Blue Ocean positioning in emotional productivity space',
        'AI-powered workflow automation',
        'Industry-specific solutions'
      ]
    };

    setAnalysis(demoAnalysis);

    const demoCompetitors: Competitor[] = [
      {
        id: 'comp_001',
        name: 'Microsoft 365',
        marketShare: 35,
        strengths: ['Enterprise integration', 'Brand recognition', 'Comprehensive suite'],
        weaknesses: ['Complex interface', 'High enterprise cost'],
        strategy: 'Platform dominance through integration',
        financialHealth: 9,
        innovationCapability: 7,
        marketPosition: 'leader'
      },
      {
        id: 'comp_002',
        name: 'Google Workspace',
        marketShare: 25,
        strengths: ['Collaboration features', 'Cloud-native', 'Simple pricing'],
        weaknesses: ['Limited offline functionality', 'Enterprise features'],
        strategy: 'Cloud-first collaboration platform',
        financialHealth: 9,
        innovationCapability: 8,
        marketPosition: 'challenger'
      },
      {
        id: 'comp_003',
        name: 'Notion',
        marketShare: 5,
        strengths: ['Flexibility', 'Modern interface', 'Knowledge management'],
        weaknesses: ['Performance issues', 'Learning curve'],
        strategy: 'All-in-one workspace differentiation',
        financialHealth: 7,
        innovationCapability: 9,
        marketPosition: 'nicher'
      }
    ];

    setCompetitors(demoCompetitors);
  }, []);

  // Calculate overall force strength
  const calculateForceStrength = (force: CompetitiveForce): number => {
    if (force.factors.length === 0) return force.strength;
    const averageImpact = force.factors.reduce((sum, factor) => sum + factor.impact, 0) / force.factors.length;
    return Math.round(averageImpact);
  };

  // Update force strength
  const updateForceStrength = (forceKey: keyof typeof analysis.forces, newStrength: number) => {
    setAnalysis(prev => ({
      ...prev,
      forces: {
        ...prev.forces,
        [forceKey]: {
          ...prev.forces[forceKey],
          strength: newStrength
        }
      }
    }));
  };

  // Update force analysis
  const updateForceAnalysis = (forceKey: keyof typeof analysis.forces, field: string, value: string) => {
    setAnalysis(prev => ({
      ...prev,
      forces: {
        ...prev.forces,
        [forceKey]: {
          ...prev.forces[forceKey],
          [field]: value
        }
      }
    }));
  };

  // Add factor to force
  const addFactorToForce = (forceKey: keyof typeof analysis.forces, factor: ForceFactor) => {
    setAnalysis(prev => ({
      ...prev,
      forces: {
        ...prev.forces,
        [forceKey]: {
          ...prev.forces[forceKey],
          factors: [...prev.forces[forceKey].factors, factor]
        }
      }
    }));
  };

  // Generate strategic analysis
  const generateStrategicAnalysis = () => {
    const forces = Object.values(analysis.forces);
    const averageForceStrength = forces.reduce((sum, force) => sum + force.strength, 0) / forces.length;
    const industryAttractiveness = 10 - averageForceStrength;

    const insights: string[] = [];
    const recommendations: string[] = [];
    const risks: string[] = [];
    const opportunities: string[] = [];

    // Analyze force strengths
    forces.forEach(force => {
      if (force.strength >= 7) {
        insights.push(`${force.name} is high (${force.strength}/10) - major strategic challenge`);
        risks.push(`High ${force.name.toLowerCase()} threatens profitability`);
      } else if (force.strength <= 3) {
        insights.push(`${force.name} is low (${force.strength}/10) - strategic advantage`);
        opportunities.push(`Leverage low ${force.name.toLowerCase()} for competitive advantage`);
      }
    });

    // Generate strategic recommendations
    if (analysis.forces.competitiveRivalry.strength >= 7) {
      recommendations.push('Pursue Blue Ocean strategy to avoid direct competition');
      recommendations.push('Focus on differentiation rather than cost leadership');
    }

    if (analysis.forces.buyerPower.strength >= 7) {
      recommendations.push('Increase customer switching costs through platform integration');
      recommendations.push('Build strong customer relationships and loyalty programs');
    }

    if (analysis.forces.supplierPower.strength >= 7) {
      recommendations.push('Diversify supplier base to reduce dependency');
      recommendations.push('Consider vertical integration for critical components');
    }

    // Industry attractiveness assessment
    if (industryAttractiveness >= 7) {
      insights.push('Industry is highly attractive for new investments');
      opportunities.push('Favorable industry dynamics support growth strategies');
    } else if (industryAttractiveness <= 3) {
      insights.push('Industry attractiveness is low - consider exit strategies');
      risks.push('Unfavorable industry structure limits profit potential');
    }

    setAnalysis(prev => ({
      ...prev,
      overallAttractiveness: industryAttractiveness,
      keyInsights: insights,
      strategicRecommendations: recommendations,
      riskFactors: risks,
      opportunities: opportunities
    }));

    toast({
      title: "Strategic Analysis Generated!",
      description: `Generated ${insights.length} insights and ${recommendations.length} strategic recommendations based on Five Forces analysis.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const getForceColor = (strength: number) => {
    if (strength >= 7) return 'red';
    if (strength >= 4) return 'orange';
    return 'green';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '❓';
    }
  };

  const renderForceAnalysis = () => {
    const force = analysis.forces[activeForce];
    const calculatedStrength = calculateForceStrength(force);

    return (
      <VStack spacing={6} align="stretch">
        {/* Force Overview */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="xl" fontWeight="bold">{force.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  Analyze factors that influence this competitive force
                </Text>
              </VStack>
              <VStack align="end" spacing={1}>
                <Badge colorScheme={getForceColor(calculatedStrength)} size="lg">
                  {calculatedStrength}/10
                </Badge>
                <Text fontSize="xs" color="gray.500">
                  Force Strength
                </Text>
              </VStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {/* Strength Slider */}
              <FormControl>
                <FormLabel>Force Strength Assessment</FormLabel>
                <Slider
                  value={force.strength}
                  onChange={(value) => updateForceStrength(activeForce, value)}
                  min={1}
                  max={10}
                  step={1}
                  colorScheme={getForceColor(force.strength)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <HStack justify="space-between" mt={2}>
                  <Text fontSize="xs">Low (1)</Text>
                  <Text fontSize="xs">High (10)</Text>
                </HStack>
              </FormControl>

              {/* Analysis Textarea */}
              <FormControl>
                <FormLabel>Force Analysis</FormLabel>
                <Textarea
                  value={force.analysis}
                  onChange={(e) => updateForceAnalysis(activeForce, 'analysis', e.target.value)}
                  placeholder="Describe your analysis of this competitive force..."
                  rows={3}
                />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        {/* Force Factors */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Force Factors</Text>
              <Button size="sm" colorScheme="blue" onClick={onFactorOpen}>
                Add Factor
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {force.factors.map((factor, index) => (
                <Box key={factor.id} p={4} bg={infoBg} borderRadius="md">
                  <HStack justify="space-between" align="start" mb={2}>
                    <VStack align="start" spacing={1}>
                      <HStack>
                        <Text fontWeight="semibold">{factor.name}</Text>
                        <Text fontSize="lg">{getTrendIcon(factor.trend)}</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">{factor.description}</Text>
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <Badge colorScheme={getForceColor(factor.impact)}>
                        {factor.impact}/10
                      </Badge>
                      <Text fontSize="xs" color="gray.500">Impact</Text>
                    </VStack>
                  </HStack>
                  <Text fontSize="sm" mb={2}>
                    <strong>Evidence:</strong> {factor.evidence}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Source: {factor.source}
                  </Text>
                </Box>
              ))}
              {force.factors.length === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  <Text fontSize="sm">
                    No factors added yet. Click "Add Factor" to identify specific elements that influence this competitive force.
                  </Text>
                </Alert>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Strategic Implications */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <Card bg={cardBg}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold" color="orange.600">⚠️ Strategic Implications</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={2} align="stretch">
                {force.strategicImplications.map((implication, index) => (
                  <Text key={index} fontSize="sm">• {implication}</Text>
                ))}
                {force.strategicImplications.length === 0 && (
                  <Text fontSize="sm" color="gray.500">
                    Strategic implications will be generated based on force analysis.
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold" color="green.600">🛡️ Mitigation Strategies</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={2} align="stretch">
                {force.mitigationStrategies.map((strategy, index) => (
                  <Text key={index} fontSize="sm">• {strategy}</Text>
                ))}
                {force.mitigationStrategies.length === 0 && (
                  <Text fontSize="sm" color="gray.500">
                    Mitigation strategies will be generated based on force analysis.
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    );
  };

  const renderFiveForcesDashboard = () => {
    const forceEntries = Object.entries(analysis.forces) as [keyof typeof analysis.forces, CompetitiveForce][];

    return (
      <VStack spacing={6} align="stretch">
        {/* Industry Overview */}
        <Card bg={cardBg}>
          <CardHeader>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="xl" fontWeight="bold">Industry Analysis Dashboard</Text>
                <Text fontSize="sm" color="gray.600">
                  {analysis.industryName || 'Enter industry name to begin analysis'}
                </Text>
              </VStack>
              <VStack align="end" spacing={1}>
                <Badge colorScheme={getForceColor(10 - analysis.overallAttractiveness)} size="lg">
                  {analysis.overallAttractiveness.toFixed(1)}/10
                </Badge>
                <Text fontSize="xs" color="gray.500">
                  Industry Attractiveness
                </Text>
              </VStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <FormControl mb={4}>
              <FormLabel>Industry Name</FormLabel>
              <Input
                value={analysis.industryName}
                onChange={(e) => setAnalysis(prev => ({ ...prev, industryName: e.target.value }))}
                placeholder="Enter industry name..."
              />
            </FormControl>
          </CardBody>
        </Card>

        {/* Five Forces Grid */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
          {forceEntries.map(([forceKey, force]) => {
            const strength = calculateForceStrength(force);
            return (
              <Card
                key={forceKey}
                bg={cardBg}
                _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                cursor="pointer"
                onClick={() => setActiveForce(forceKey)}
                transition="all 0.2s"
                border={activeForce === forceKey ? '2px' : '1px'}
                borderColor={activeForce === forceKey ? 'blue.400' : 'gray.200'}
              >
                <CardHeader pb={3}>
                  <VStack spacing={2}>
                    <Badge colorScheme={getForceColor(strength)} size="lg">
                      {strength}/10
                    </Badge>
                    <Text fontSize="sm" fontWeight="bold" textAlign="center">
                      {force.name}
                    </Text>
                  </VStack>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={2}>
                    <Text fontSize="xs" color="gray.600" textAlign="center">
                      {force.factors.length} factors analyzed
                    </Text>
                    <Text fontSize="xs" textAlign="center" noOfLines={2}>
                      {force.analysis || 'Click to analyze this force'}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            );
          })}
        </Grid>

        {/* Analysis Actions */}
        <HStack justify="center" spacing={4}>
          <Button
            colorScheme="blue"
            onClick={generateStrategicAnalysis}
            isDisabled={!analysis.industryName}
          >
            Generate Strategic Analysis
          </Button>
        </HStack>

        {/* Strategic Insights */}
        {analysis.keyInsights.length > 0 && (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <Card bg={cardBg}>
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold" color="blue.600">💡 Key Insights</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={2} align="stretch">
                  {analysis.keyInsights.map((insight, index) => (
                    <Box key={index} p={3} bg="blue.50" borderRadius="md" borderLeft="4px" borderLeftColor="blue.400">
                      <Text fontSize="sm">{insight}</Text>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>

            <Card bg={cardBg}>
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold" color="green.600">🎯 Strategic Recommendations</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={2} align="stretch">
                  {analysis.strategicRecommendations.map((recommendation, index) => (
                    <Box key={index} p={3} bg="green.50" borderRadius="md" borderLeft="4px" borderLeftColor="green.400">
                      <Text fontSize="sm">{recommendation}</Text>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </Grid>
        )}
      </VStack>
    );
  };

  const renderCompetitorAnalysis = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Competitive Landscape Analysis</Text>
          <Text fontSize="sm">
            Analyze key competitors to understand competitive rivalry and market positioning.
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {competitors.map(competitor => (
          <Card key={competitor.id} bg={cardBg}>
            <CardHeader>
              <HStack justify="space-between">
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{competitor.name}</Text>
                  <Badge colorScheme="purple" size="sm">
                    {competitor.marketPosition}
                  </Badge>
                </VStack>
                <VStack align="end" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{competitor.marketShare}%</Text>
                  <Text fontSize="xs" color="gray.500">Market Share</Text>
                </VStack>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Strengths:</Text>
                  <VStack align="start" spacing={1}>
                    {competitor.strengths.map((strength, index) => (
                      <Text key={index} fontSize="sm" color="green.600">• {strength}</Text>
                    ))}
                  </VStack>
                </Box>
                
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Weaknesses:</Text>
                  <VStack align="start" spacing={1}>
                    {competitor.weaknesses.map((weakness, index) => (
                      <Text key={index} fontSize="sm" color="red.600">• {weakness}</Text>
                    ))}
                  </VStack>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>Key Metrics:</Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                    <VStack>
                      <Text fontSize="xs" color="gray.500">Financial Health</Text>
                      <Badge colorScheme={getForceColor(10 - competitor.financialHealth)}>
                        {competitor.financialHealth}/10
                      </Badge>
                    </VStack>
                    <VStack>
                      <Text fontSize="xs" color="gray.500">Innovation</Text>
                      <Badge colorScheme={getForceColor(10 - competitor.innovationCapability)}>
                        {competitor.innovationCapability}/10
                      </Badge>
                    </VStack>
                  </Grid>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>Strategy:</Text>
                  <Text fontSize="sm" color="gray.600">{competitor.strategy}</Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <HStack mb={4}>
            <Text fontSize="3xl">⚔️</Text>
            <Text fontSize="3xl" fontWeight="bold">Porter's Five Forces Analysis</Text>
          </HStack>
          <Text color="gray.600" mb={6}>
            Systematic analysis of competitive forces that shape industry profitability and strategic positioning.
          </Text>
        </Box>

        {/* Main Content Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Five Forces Dashboard</Tab>
            <Tab>Force Analysis</Tab>
            <Tab>Competitor Analysis</Tab>
            <Tab>Strategic Summary</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderFiveForcesDashboard()}
            </TabPanel>
            <TabPanel px={0}>
              {renderForceAnalysis()}
            </TabPanel>
            <TabPanel px={0}>
              {renderCompetitorAnalysis()}
            </TabPanel>
            <TabPanel px={0}>
              <Alert status="info">
                <AlertIcon />
                <Text>Strategic summary and integration with Blue Ocean Strategy analysis coming soon.</Text>
              </Alert>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Add Factor Modal */}
      <Modal isOpen={isFactorOpen} onClose={onFactorClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Force Factor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Factor Name</FormLabel>
                <Input
                  value={newFactor.name || ''}
                  onChange={(e) => setNewFactor(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter factor name..."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newFactor.description || ''}
                  onChange={(e) => setNewFactor(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this factor..."
                  rows={3}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Impact Level: {newFactor.impact || 5}/10</FormLabel>
                <Slider
                  value={newFactor.impact || 5}
                  onChange={(value) => setNewFactor(prev => ({ ...prev, impact: value }))}
                  min={1}
                  max={10}
                  step={1}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>

              <FormControl>
                <FormLabel>Trend</FormLabel>
                <Select
                  value={newFactor.trend || 'stable'}
                  onChange={(e) => setNewFactor(prev => ({ ...prev, trend: e.target.value as any }))}
                >
                  <option value="increasing">📈 Increasing</option>
                  <option value="stable">➡️ Stable</option>
                  <option value="decreasing">📉 Decreasing</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Evidence/Source</FormLabel>
                <Input
                  value={newFactor.evidence || ''}
                  onChange={(e) => setNewFactor(prev => ({ ...prev, evidence: e.target.value }))}
                  placeholder="Evidence supporting this factor..."
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onFactorClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={() => {
                if (newFactor.name && newFactor.description) {
                  const factor: ForceFactor = {
                    id: `factor_${Date.now()}`,
                    name: newFactor.name,
                    description: newFactor.description,
                    impact: newFactor.impact || 5,
                    evidence: newFactor.evidence || '',
                    source: 'User input',
                    trend: newFactor.trend || 'stable'
                  };
                  addFactorToForce(activeForce, factor);
                  setNewFactor({});
                  onFactorClose();
                  toast({
                    title: "Factor Added",
                    description: `Added "${factor.name}" to ${analysis.forces[activeForce].name}`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
              isDisabled={!newFactor.name || !newFactor.description}
            >
              Add Factor
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PortersFiveForces;