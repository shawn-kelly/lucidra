import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Badge,
  Progress,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Alert,
  AlertIcon,
  IconButton,
  Tooltip,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  useToast,
  Image,
  AspectRatio
} from '@chakra-ui/react';

// Video Production Interfaces
interface VideoProject {
  id: string;
  title: string;
  description: string;
  type: 'how-to' | 'market-analysis' | 'pestle-overview' | 'strategy-walkthrough' | 'data-insight';
  script: string;
  visual_style: 'professional' | 'animated' | 'data-focused' | 'minimalist' | 'corporate';
  duration: number; // in seconds
  status: 'planning' | 'generating' | 'completed' | 'failed';
  market_data_overlay: boolean;
  sector: string;
  business_stage: 'startup' | 'growth' | 'mature' | 'enterprise';
  created_at: string;
  generated_video_url?: string;
  thumbnail_url?: string;
  huggingface_model: string;
  generation_progress: number;
  estimated_completion: string;
}

interface MarketDataPoint {
  id: string;
  sector: string;
  variable: string;
  category: 'political' | 'economic' | 'social' | 'technological' | 'legal' | 'environmental';
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change_percent: number;
  relevance_startup: number; // 1-10
  relevance_mature: number; // 1-10
  data_source: string;
  last_updated: string;
  impact_level: 'low' | 'medium' | 'high' | 'critical';
  geographic_scope: 'local' | 'national' | 'regional' | 'global';
}

interface PESTLEAnalysis {
  id: string;
  sector: string;
  business_stage: 'startup' | 'mature';
  analysis_date: string;
  factors: {
    political: MarketDataPoint[];
    economic: MarketDataPoint[];
    social: MarketDataPoint[];
    technological: MarketDataPoint[];
    legal: MarketDataPoint[];
    environmental: MarketDataPoint[];
  };
  overall_score: number;
  risk_level: 'low' | 'moderate' | 'high' | 'extreme';
  opportunities: string[];
  threats: string[];
  recommendations: string[];
}

interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  duration_range: [number, number];
  market_data_integration: boolean;
  huggingface_models: string[];
  sample_script: string;
  visual_elements: string[];
}

const HuggingFaceVideoProduction: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [videoProjects, setVideoProjects] = useState<VideoProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null);
  const [marketData, setMarketData] = useState<MarketDataPoint[]>([]);
  const [pestleAnalysis, setPestleAnalysis] = useState<PESTLEAnalysis | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedBusinessStage, setSelectedBusinessStage] = useState<'startup' | 'mature'>('startup');
  const [realTimeDataEnabled, setRealTimeDataEnabled] = useState(true);

  const { isOpen: isProjectModalOpen, onOpen: onProjectModalOpen, onClose: onProjectModalClose } = useDisclosure();
  const { isOpen: isDataModalOpen, onOpen: onDataModalOpen, onClose: onDataModalClose } = useDisclosure();
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Available sectors and their market variables
  const sectors = {
    'Technology': {
      political: ['Tech Regulation Index', 'Data Privacy Laws', 'AI Governance Score', 'Digital Tax Rates'],
      economic: ['VC Funding Volume', 'Tech Stock Index', 'R&D Investment Rate', 'Digital Economy Share'],
      social: ['Digital Adoption Rate', 'Remote Work Adoption', 'Tech Talent Shortage', 'Consumer Tech Spending'],
      technological: ['AI Investment Growth', 'Cloud Adoption Rate', 'Automation Index', '5G Deployment'],
      legal: ['IP Protection Score', 'Cybersecurity Regulations', 'Competition Law Changes', 'Platform Liability'],
      environmental: ['E-waste Regulations', 'Green Tech Investment', 'Carbon Footprint Requirements', 'Sustainable Tech Adoption']
    },
    'Healthcare': {
      political: ['Healthcare Policy Changes', 'Public Health Funding', 'Drug Approval Processes', 'Healthcare Access Index'],
      economic: ['Healthcare Spending Growth', 'Insurance Coverage Rates', 'Medical Device Market', 'Pharma R&D Investment'],
      social: ['Aging Population Rate', 'Health Consciousness Index', 'Mental Health Awareness', 'Telemedicine Adoption'],
      technological: ['Digital Health Investment', 'AI in Healthcare', 'Biotech Innovation', 'Wearable Device Adoption'],
      legal: ['Medical Regulation Changes', 'Patient Privacy Laws', 'Drug Safety Requirements', 'Clinical Trial Regulations'],
      environmental: ['Pharmaceutical Waste', 'Sustainable Healthcare', 'Environmental Health Impact', 'Green Hospital Initiatives']
    },
    'Financial Services': {
      political: ['Banking Regulations', 'Monetary Policy Changes', 'Financial Stability Measures', 'Cross-border Finance Rules'],
      economic: ['Interest Rate Trends', 'Credit Market Conditions', 'Inflation Impact', 'Economic Growth Indicators'],
      social: ['Financial Inclusion Rate', 'Digital Payment Adoption', 'Consumer Debt Levels', 'Investment Behavior Changes'],
      technological: ['Fintech Investment', 'Blockchain Adoption', 'AI in Finance', 'Digital Banking Growth'],
      legal: ['Compliance Requirements', 'Consumer Protection Laws', 'Anti-Money Laundering', 'Data Security Regulations'],
      environmental: ['Sustainable Finance Growth', 'ESG Investment Trends', 'Climate Risk Assessment', 'Green Bond Market']
    },
    'Retail': {
      political: ['Trade Policy Changes', 'Labor Law Updates', 'Consumer Protection Rules', 'Import/Export Regulations'],
      economic: ['Consumer Spending Trends', 'Retail Sales Growth', 'Supply Chain Costs', 'Employment Rates'],
      social: ['Consumer Behavior Shifts', 'E-commerce Adoption', 'Sustainability Preferences', 'Brand Loyalty Changes'],
      technological: ['Retail Tech Investment', 'AR/VR in Retail', 'Inventory Management AI', 'Mobile Commerce Growth'],
      legal: ['Product Safety Regulations', 'Return Policy Laws', 'Advertising Standards', 'Worker Rights Legislation'],
      environmental: ['Packaging Regulations', 'Circular Economy Trends', 'Carbon Footprint Disclosure', 'Sustainable Sourcing']
    },
    'Manufacturing': {
      political: ['Industrial Policy Changes', 'Trade Agreements', 'Manufacturing Incentives', 'Supply Chain Security'],
      economic: ['Manufacturing Output', 'Raw Material Costs', 'Energy Prices', 'Export Competitiveness'],
      social: ['Workforce Skills Gap', 'Automation Acceptance', 'Local Manufacturing Preference', 'Worker Safety Standards'],
      technological: ['Industry 4.0 Adoption', 'IoT in Manufacturing', 'Robotics Investment', 'Digital Twin Technology'],
      legal: ['Safety Regulations', 'Quality Standards', 'Environmental Compliance', 'Labor Law Compliance'],
      environmental: ['Emissions Regulations', 'Waste Management', 'Resource Efficiency', 'Renewable Energy Adoption']
    },
    'Energy': {
      political: ['Energy Policy Changes', 'Renewable Energy Incentives', 'Carbon Tax Policies', 'Energy Independence Goals'],
      economic: ['Energy Price Volatility', 'Renewable Investment', 'Oil & Gas Markets', 'Energy Infrastructure Spending'],
      social: ['Public Opinion on Energy', 'Energy Poverty Rates', 'Climate Change Awareness', 'Community Energy Projects'],
      technological: ['Smart Grid Development', 'Energy Storage Innovation', 'Renewable Technology Costs', 'Digital Energy Management'],
      legal: ['Environmental Regulations', 'Energy Market Rules', 'Safety Standards', 'Grid Access Regulations'],
      environmental: ['Emissions Targets', 'Environmental Impact', 'Biodiversity Protection', 'Water Usage Regulations']
    }
  };

  // Hugging Face models for video generation
  const huggingFaceModels = [
    {
      id: 'text-to-video-synthesis',
      name: 'Text-to-Video Synthesis',
      description: 'Generate videos from text descriptions with market data overlays',
      capabilities: ['Text-to-video', 'Data visualization', 'Professional narration']
    },
    {
      id: 'video-generation-diffusion',
      name: 'Video Generation Diffusion',
      description: 'High-quality video generation with custom styling',
      capabilities: ['High resolution', 'Style transfer', 'Smooth animations']
    },
    {
      id: 'instructional-video-ai',
      name: 'Instructional Video AI',
      description: 'Specialized for how-to and tutorial content',
      capabilities: ['Step-by-step visuals', 'Annotations', 'Interactive elements']
    },
    {
      id: 'data-visualization-video',
      name: 'Data Visualization Video',
      description: 'Creates engaging videos from data and charts',
      capabilities: ['Chart animations', 'Data storytelling', 'PESTLE integration']
    }
  ];

  // Video templates
  const videoTemplates: VideoTemplate[] = [
    {
      id: 'market-analysis-template',
      name: 'Market Analysis Video',
      description: 'Comprehensive market overview with real-time data',
      duration_range: [180, 300],
      market_data_integration: true,
      huggingface_models: ['data-visualization-video', 'text-to-video-synthesis'],
      sample_script: 'Welcome to your sector market analysis. Today we\'ll explore the key factors affecting your industry...',
      visual_elements: ['Market charts', 'Trend graphs', 'Sector comparisons', 'Data overlays']
    },
    {
      id: 'pestle-overview-template',
      name: 'PESTLE Analysis Video',
      description: 'Complete PESTLE analysis with sector-specific insights',
      duration_range: [240, 360],
      market_data_integration: true,
      huggingface_models: ['instructional-video-ai', 'data-visualization-video'],
      sample_script: 'Let\'s dive into the Political, Economic, Social, Technological, Legal, and Environmental factors impacting your business...',
      visual_elements: ['PESTLE framework', 'Factor scoring', 'Impact analysis', 'Recommendations']
    },
    {
      id: 'how-to-strategy-template',
      name: 'Strategy How-To Video',
      description: 'Step-by-step strategy implementation guide',
      duration_range: [120, 240],
      market_data_integration: false,
      huggingface_models: ['instructional-video-ai', 'video-generation-diffusion'],
      sample_script: 'In this tutorial, we\'ll walk through implementing your business strategy step by step...',
      visual_elements: ['Process flows', 'Step annotations', 'Best practices', 'Common pitfalls']
    },
    {
      id: 'startup-insights-template',
      name: 'Startup Market Insights',
      description: 'Market intelligence tailored for startup businesses',
      duration_range: [150, 270],
      market_data_integration: true,
      huggingface_models: ['text-to-video-synthesis', 'data-visualization-video'],
      sample_script: 'As a startup in the current market, here are the key trends and opportunities you need to know...',
      visual_elements: ['Growth metrics', 'Opportunity mapping', 'Risk indicators', 'Success factors']
    }
  ];

  // Initialize sample data
  useEffect(() => {
    const sampleMarketData: MarketDataPoint[] = [
      {
        id: '1',
        sector: 'Technology',
        variable: 'VC Funding Volume',
        category: 'economic',
        value: 67.8,
        unit: 'Billion USD',
        trend: 'down',
        change_percent: -23.5,
        relevance_startup: 10,
        relevance_mature: 6,
        data_source: 'CB Insights',
        last_updated: new Date().toISOString(),
        impact_level: 'critical',
        geographic_scope: 'global'
      },
      {
        id: '2',
        sector: 'Technology',
        variable: 'AI Governance Score',
        category: 'political',
        value: 6.4,
        unit: 'Index (1-10)',
        trend: 'up',
        change_percent: 12.3,
        relevance_startup: 8,
        relevance_mature: 9,
        data_source: 'AI Policy Index',
        last_updated: new Date().toISOString(),
        impact_level: 'high',
        geographic_scope: 'national'
      },
      {
        id: '3',
        sector: 'Technology',
        variable: 'Digital Adoption Rate',
        category: 'social',
        value: 78.2,
        unit: 'Percentage',
        trend: 'up',
        change_percent: 8.7,
        relevance_startup: 9,
        relevance_mature: 7,
        data_source: 'Digital Economy Report',
        last_updated: new Date().toISOString(),
        impact_level: 'medium',
        geographic_scope: 'regional'
      },
      // Add more sample data for other sectors...
    ];

    setMarketData(sampleMarketData);
    setSelectedSector('Technology');
  }, []);

  // Generate real-time market data for selected sector
  const generateMarketData = (sector: string, businessStage: 'startup' | 'mature') => {
    const sectorData = sectors[sector as keyof typeof sectors];
    if (!sectorData) return [];

    const data: MarketDataPoint[] = [];
    
    Object.entries(sectorData).forEach(([category, variables]) => {
      variables.forEach((variable, index) => {
        // Simulate real-time data with some randomization
        const baseValue = Math.random() * 100;
        const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.25 ? 'down' : 'stable';
        const changePercent = (Math.random() - 0.5) * 30; // -15% to +15%
        
        data.push({
          id: `${sector}_${category}_${index}`,
          sector,
          variable,
          category: category as MarketDataPoint['category'],
          value: baseValue,
          unit: getUnitForVariable(variable),
          trend,
          change_percent: changePercent,
          relevance_startup: businessStage === 'startup' ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 6) + 3,
          relevance_mature: businessStage === 'mature' ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 6) + 3,
          data_source: getDataSourceForVariable(variable),
          last_updated: new Date().toISOString(),
          impact_level: getImpactLevel(Math.abs(changePercent)),
          geographic_scope: Math.random() > 0.7 ? 'global' : Math.random() > 0.4 ? 'national' : 'regional'
        });
      });
    });

    return data;
  };

  const getUnitForVariable = (variable: string): string => {
    if (variable.includes('Rate') || variable.includes('Percentage') || variable.includes('Share')) return '%';
    if (variable.includes('Index') || variable.includes('Score')) return 'Index (1-10)';
    if (variable.includes('Volume') || variable.includes('Investment')) return 'Billion USD';
    if (variable.includes('Growth')) return '% YoY';
    return 'Units';
  };

  const getDataSourceForVariable = (variable: string): string => {
    if (variable.includes('VC') || variable.includes('Investment')) return 'PitchBook/CB Insights';
    if (variable.includes('Policy') || variable.includes('Regulation')) return 'Government Sources';
    if (variable.includes('Adoption') || variable.includes('Consumer')) return 'Market Research';
    if (variable.includes('AI') || variable.includes('Tech')) return 'Tech Industry Reports';
    return 'Industry Analytics';
  };

  const getImpactLevel = (changePercent: number): MarketDataPoint['impact_level'] => {
    if (changePercent > 20) return 'critical';
    if (changePercent > 10) return 'high';
    if (changePercent > 5) return 'medium';
    return 'low';
  };

  // Generate PESTLE analysis
  const generatePESTLEAnalysis = async () => {
    if (!selectedSector) return;

    const data = generateMarketData(selectedSector, selectedBusinessStage);
    
    const factors = {
      political: data.filter(d => d.category === 'political'),
      economic: data.filter(d => d.category === 'economic'),
      social: data.filter(d => d.category === 'social'),
      technological: data.filter(d => d.category === 'technological'),
      legal: data.filter(d => d.category === 'legal'),
      environmental: data.filter(d => d.category === 'environmental')
    };

    // Calculate overall score based on relevance and impact
    const relevanceKey = selectedBusinessStage === 'startup' ? 'relevance_startup' : 'relevance_mature';
    const overallScore = data.reduce((acc, item) => {
      const relevance = item[relevanceKey];
      const impactScore = item.impact_level === 'critical' ? 4 : item.impact_level === 'high' ? 3 : item.impact_level === 'medium' ? 2 : 1;
      return acc + (relevance * impactScore);
    }, 0) / (data.length * 40); // Normalize to 0-1 scale

    const analysis: PESTLEAnalysis = {
      id: `${selectedSector}_${selectedBusinessStage}_${Date.now()}`,
      sector: selectedSector,
      business_stage: selectedBusinessStage,
      analysis_date: new Date().toISOString(),
      factors,
      overall_score: overallScore * 100,
      risk_level: overallScore > 0.75 ? 'extreme' : overallScore > 0.5 ? 'high' : overallScore > 0.25 ? 'moderate' : 'low',
      opportunities: generateOpportunities(factors, selectedBusinessStage),
      threats: generateThreats(factors, selectedBusinessStage),
      recommendations: generateRecommendations(factors, selectedBusinessStage, overallScore)
    };

    setPestleAnalysis(analysis);
    setMarketData(data);
  };

  const generateOpportunities = (factors: PESTLEAnalysis['factors'], stage: 'startup' | 'mature'): string[] => {
    const opportunities = [];
    
    // Analyze positive trends
    Object.values(factors).flat().forEach(factor => {
      if (factor.trend === 'up' && factor.change_percent > 5) {
        if (stage === 'startup' && factor.relevance_startup > 7) {
          opportunities.push(`Leverage growing ${factor.variable.toLowerCase()} for market entry`);
        } else if (stage === 'mature' && factor.relevance_mature > 7) {
          opportunities.push(`Expand operations based on positive ${factor.variable.toLowerCase()} trends`);
        }
      }
    });

    // Add stage-specific opportunities
    if (stage === 'startup') {
      opportunities.push('Agile adaptation to regulatory changes', 'First-mover advantage in emerging trends');
    } else {
      opportunities.push('Scale existing operations', 'Market consolidation opportunities');
    }

    return opportunities.slice(0, 5); // Limit to top 5
  };

  const generateThreats = (factors: PESTLEAnalysis['factors'], stage: 'startup' | 'mature'): string[] => {
    const threats = [];
    
    // Analyze negative trends
    Object.values(factors).flat().forEach(factor => {
      if ((factor.trend === 'down' && factor.change_percent < -5) || factor.impact_level === 'critical') {
        const relevance = stage === 'startup' ? factor.relevance_startup : factor.relevance_mature;
        if (relevance > 6) {
          threats.push(`Declining ${factor.variable.toLowerCase()} may impact operations`);
        }
      }
    });

    // Add stage-specific threats
    if (stage === 'startup') {
      threats.push('Limited resources for compliance', 'Market access barriers');
    } else {
      threats.push('Organizational inertia', 'Legacy system constraints');
    }

    return threats.slice(0, 5); // Limit to top 5
  };

  const generateRecommendations = (factors: PESTLEAnalysis['factors'], stage: 'startup' | 'mature', score: number): string[] => {
    const recommendations = [];
    
    if (score > 0.7) {
      recommendations.push('Implement robust risk management framework');
      recommendations.push('Increase monitoring frequency for critical factors');
    } else if (score > 0.4) {
      recommendations.push('Develop contingency plans for key risks');
      recommendations.push('Strengthen stakeholder engagement');
    } else {
      recommendations.push('Focus on opportunity identification');
      recommendations.push('Maintain current monitoring practices');
    }

    if (stage === 'startup') {
      recommendations.push('Build regulatory compliance into product development');
      recommendations.push('Establish strategic partnerships for market access');
    } else {
      recommendations.push('Evaluate digital transformation opportunities');
      recommendations.push('Consider strategic acquisitions or partnerships');
    }

    return recommendations;
  };

  // Generate video with Hugging Face
  const generateVideo = async (project: VideoProject) => {
    setIsGeneratingVideo(true);
    setSelectedProject(project);

    // Update project status
    const updatedProject = { ...project, status: 'generating' as const, generation_progress: 0 };
    setVideoProjects(prev => prev.map(p => p.id === project.id ? updatedProject : p));

    try {
      // Simulate Hugging Face API call
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setVideoProjects(prev => prev.map(p => 
          p.id === project.id ? { ...p, generation_progress: progress } : p
        ));
      }

      // Mock successful generation
      const completedProject = {
        ...updatedProject,
        status: 'completed' as const,
        generation_progress: 100,
        generated_video_url: 'https://example.com/generated-video.mp4',
        thumbnail_url: 'https://example.com/thumbnail.jpg'
      };

      setVideoProjects(prev => prev.map(p => p.id === project.id ? completedProject : p));

      toast({
        title: 'Video Generated Successfully',
        description: `${project.title} has been created with market data integration`,
        status: 'success',
        duration: 5000
      });

    } catch (error) {
      setVideoProjects(prev => prev.map(p => 
        p.id === project.id ? { ...p, status: 'failed' as const } : p
      ));

      toast({
        title: 'Video Generation Failed',
        description: 'Please try again or contact support',
        status: 'error',
        duration: 5000
      });
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const createNewVideoProject = (template: VideoTemplate) => {
    const newProject: VideoProject = {
      id: `project_${Date.now()}`,
      title: `${selectedSector} ${template.name}`,
      description: `${template.description} for ${selectedSector} sector`,
      type: template.id.includes('pestle') ? 'pestle-overview' : 
            template.id.includes('market') ? 'market-analysis' :
            template.id.includes('how-to') ? 'how-to' : 'strategy-walkthrough',
      script: template.sample_script,
      visual_style: 'professional',
      duration: template.duration_range[0],
      status: 'planning',
      market_data_overlay: template.market_data_integration,
      sector: selectedSector,
      business_stage: selectedBusinessStage,
      created_at: new Date().toISOString(),
      huggingface_model: template.huggingface_models[0],
      generation_progress: 0,
      estimated_completion: new Date(Date.now() + template.duration_range[0] * 1000).toISOString()
    };

    setVideoProjects(prev => [...prev, newProject]);
    setSelectedProject(newProject);
    onProjectModalOpen();
  };

  const renderVideoTemplates = () => (
    <VStack spacing={6} align="stretch">
      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Hugging Face Video Production</Text>
          <Text fontSize="sm">
            Create professional how-to videos and market analysis content with AI-powered generation.
            Videos include real-time market data and sector-specific insights.
          </Text>
        </VStack>
      </Alert>

      {/* Sector & Business Stage Selection */}
      <Card bg="blue.50" border="1px" borderColor="blue.200">
        <CardBody>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
            <FormControl>
              <FormLabel fontSize="sm">Target Sector</FormLabel>
              <Select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                placeholder="Select sector"
              >
                {Object.keys(sectors).map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Business Stage</FormLabel>
              <Select
                value={selectedBusinessStage}
                onChange={(e) => setSelectedBusinessStage(e.target.value as 'startup' | 'mature')}
              >
                <option value="startup">Startup</option>
                <option value="mature">Mature Business</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Real-time Data</FormLabel>
              <Switch
                isChecked={realTimeDataEnabled}
                onChange={(e) => setRealTimeDataEnabled(e.target.checked)}
                colorScheme="blue"
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Include live market data in videos
              </Text>
            </FormControl>
          </Grid>

          <Button
            colorScheme="blue"
            onClick={generatePESTLEAnalysis}
            isDisabled={!selectedSector}
            size="sm"
          >
            🔄 Refresh Market Data
          </Button>
        </CardBody>
      </Card>

      {/* Video Templates */}
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {videoTemplates.map(template => (
          <Card key={template.id} bg={cardBg} border="1px" borderColor={borderColor}
                _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                cursor="pointer"
                onClick={() => createNewVideoProject(template)}
                transition="all 0.2s">
            <CardHeader>
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">{template.name}</Text>
                <Text fontSize="sm" color="gray.600">{template.description}</Text>
              </VStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <Badge colorScheme="purple">
                    {template.duration_range[0]}-{template.duration_range[1]}s
                  </Badge>
                  <Badge colorScheme={template.market_data_integration ? 'green' : 'gray'}>
                    {template.market_data_integration ? 'Data Integration' : 'Standard'}
                  </Badge>
                </HStack>
                
                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" fontWeight="medium">Visual Elements:</Text>
                  <HStack wrap="wrap" spacing={1}>
                    {template.visual_elements.map((element, index) => (
                      <Tag key={index} size="sm" colorScheme="blue">
                        <TagLabel>{element}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                </VStack>

                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" fontWeight="medium">AI Models:</Text>
                  <Text fontSize="xs" color="gray.500">
                    {template.huggingface_models.join(', ')}
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </VStack>
  );

  const renderVideoProjects = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="semibold">Video Projects</Text>
        <Button colorScheme="blue" onClick={() => setActiveTab(0)}>
          + Create New Video
        </Button>
      </HStack>

      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        {videoProjects.map(project => (
          <Card key={project.id} bg={cardBg} border="1px" borderColor={borderColor}>
            <CardBody>
              <Grid templateColumns="auto 1fr auto" gap={4} alignItems="center">
                <AspectRatio ratio={16/9} w="120px">
                  <Box bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                    {project.status === 'completed' ? (
                      <Image src={project.thumbnail_url} alt="Video thumbnail" />
                    ) : (
                      <Text fontSize="xs" color="gray.500">
                        {project.status === 'generating' ? '🎬' : '📹'}
                      </Text>
                    )}
                  </Box>
                </AspectRatio>

                <VStack align="start" spacing={2}>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold">{project.title}</Text>
                    <Text fontSize="sm" color="gray.600">{project.description}</Text>
                  </VStack>
                  
                  <HStack spacing={2}>
                    <Badge colorScheme={
                      project.status === 'completed' ? 'green' :
                      project.status === 'generating' ? 'blue' :
                      project.status === 'failed' ? 'red' : 'gray'
                    }>
                      {project.status}
                    </Badge>
                    <Badge colorScheme="purple">{project.sector}</Badge>
                    <Badge colorScheme="orange">{project.business_stage}</Badge>
                    {project.market_data_overlay && (
                      <Badge colorScheme="green">Live Data</Badge>
                    )}
                  </HStack>

                  {project.status === 'generating' && (
                    <Box w="100%">
                      <Progress value={project.generation_progress} colorScheme="blue" size="sm" borderRadius="md" />
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        Generating... {project.generation_progress}%
                      </Text>
                    </Box>
                  )}
                </VStack>

                <VStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => generateVideo(project)}
                    isDisabled={project.status === 'generating' || project.status === 'completed'}
                    isLoading={project.status === 'generating'}
                  >
                    {project.status === 'completed' ? '✓ Done' : 
                     project.status === 'generating' ? 'Generating...' : 'Generate'}
                  </Button>
                  
                  {project.status === 'completed' && (
                    <Button size="sm" variant="outline">
                      📥 Download
                    </Button>
                  )}
                </VStack>
              </Grid>
            </CardBody>
          </Card>
        ))}
      </Grid>

      {videoProjects.length === 0 && (
        <Card bg="gray.50" border="1px" borderColor="gray.200">
          <CardBody textAlign="center" py={12}>
            <Text color="gray.500" mb={4}>No video projects yet</Text>
            <Button colorScheme="blue" onClick={() => setActiveTab(0)}>
              Create Your First Video
            </Button>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  const renderMarketData = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="semibold">
          Real-time Market Data - {selectedSector}
        </Text>
        <HStack>
          <Button size="sm" onClick={generatePESTLEAnalysis}>
            🔄 Refresh Data
          </Button>
          <Button size="sm" colorScheme="green" onClick={onDataModalOpen}>
            📊 View PESTLE Analysis
          </Button>
        </HStack>
      </HStack>

      {/* PESTLE Categories */}
      <Tabs>
        <TabList>
          <Tab>🏛️ Political</Tab>
          <Tab>💰 Economic</Tab>
          <Tab>👥 Social</Tab>
          <Tab>⚡ Technological</Tab>
          <Tab>⚖️ Legal</Tab>
          <Tab>🌱 Environmental</Tab>
        </TabList>

        <TabPanels>
          {['political', 'economic', 'social', 'technological', 'legal', 'environmental'].map((category, index) => (
            <TabPanel key={category} px={0}>
              <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                {marketData
                  .filter(data => data.category === category && data.sector === selectedSector)
                  .map(dataPoint => (
                    <Card key={dataPoint.id} bg={cardBg} border="1px" borderColor={borderColor}>
                      <CardBody>
                        <Grid templateColumns="1fr auto auto" gap={4} alignItems="center">
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="semibold">{dataPoint.variable}</Text>
                            <Text fontSize="sm" color="gray.600">{dataPoint.data_source}</Text>
                          </VStack>

                          <VStack align="end" spacing={1}>
                            <HStack>
                              <Text fontSize="lg" fontWeight="bold">
                                {dataPoint.value.toFixed(1)} {dataPoint.unit}
                              </Text>
                              <Badge colorScheme={
                                dataPoint.trend === 'up' ? 'green' :
                                dataPoint.trend === 'down' ? 'red' : 'gray'
                              }>
                                {dataPoint.trend === 'up' ? '↗' : dataPoint.trend === 'down' ? '↘' : '→'}
                                {Math.abs(dataPoint.change_percent).toFixed(1)}%
                              </Badge>
                            </HStack>
                            <Text fontSize="xs" color="gray.500">
                              Last updated: {new Date(dataPoint.last_updated).toLocaleDateString()}
                            </Text>
                          </VStack>

                          <VStack spacing={1}>
                            <Badge colorScheme={
                              dataPoint.impact_level === 'critical' ? 'red' :
                              dataPoint.impact_level === 'high' ? 'orange' :
                              dataPoint.impact_level === 'medium' ? 'yellow' : 'green'
                            }>
                              {dataPoint.impact_level}
                            </Badge>
                            <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                              <Tooltip label="Startup Relevance">
                                <Badge size="sm" colorScheme="blue">
                                  S: {dataPoint.relevance_startup}/10
                                </Badge>
                              </Tooltip>
                              <Tooltip label="Mature Business Relevance">
                                <Badge size="sm" colorScheme="purple">
                                  M: {dataPoint.relevance_mature}/10
                                </Badge>
                              </Tooltip>
                            </Grid>
                          </VStack>
                        </Grid>
                      </CardBody>
                    </Card>
                  ))}
              </Grid>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Card bg="purple.50" border="1px" borderColor="purple.200">
          <CardBody>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="3xl" fontWeight="bold" color="purple.700">
                  🎬 AI Video Production Studio
                </Text>
                <Text fontSize="lg" color="purple.600">
                  Hugging Face powered video generation with real-time market intelligence
                </Text>
              </VStack>
              <VStack align="end" spacing={2}>
                <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                  {videoProjects.length} Projects
                </Badge>
                <Text fontSize="sm" color="purple.600">
                  Powered by Hugging Face AI
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Main Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>🎬 Create Videos</Tab>
            <Tab>📁 My Projects</Tab>
            <Tab>📊 Market Data</Tab>
            <Tab>🧠 AI Models</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderVideoTemplates()}
            </TabPanel>
            
            <TabPanel px={0}>
              {renderVideoProjects()}
            </TabPanel>
            
            <TabPanel px={0}>
              {renderMarketData()}
            </TabPanel>
            
            <TabPanel px={0}>
              <VStack spacing={6} align="stretch">
                <Text fontSize="lg" fontWeight="semibold">Available Hugging Face Models</Text>
                <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                  {huggingFaceModels.map(model => (
                    <Card key={model.id} bg={cardBg} border="1px" borderColor={borderColor}>
                      <CardBody>
                        <VStack align="start" spacing={3}>
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="semibold">{model.name}</Text>
                            <Text fontSize="sm" color="gray.600">{model.description}</Text>
                          </VStack>
                          <HStack wrap="wrap" spacing={2}>
                            {model.capabilities.map((capability, index) => (
                              <Badge key={index} colorScheme="blue" variant="subtle">
                                {capability}
                              </Badge>
                            ))}
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* PESTLE Analysis Modal */}
      <Modal isOpen={isDataModalOpen} onClose={onDataModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PESTLE Analysis - {selectedSector}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {pestleAnalysis && (
              <VStack spacing={4} align="stretch">
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <Stat>
                    <StatLabel>Overall Score</StatLabel>
                    <StatNumber color={pestleAnalysis.overall_score > 75 ? 'red.500' : 'green.500'}>
                      {pestleAnalysis.overall_score.toFixed(1)}%
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Risk Level</StatLabel>
                    <StatNumber color={
                      pestleAnalysis.risk_level === 'extreme' ? 'red.500' :
                      pestleAnalysis.risk_level === 'high' ? 'orange.500' :
                      pestleAnalysis.risk_level === 'moderate' ? 'yellow.500' : 'green.500'
                    }>
                      {pestleAnalysis.risk_level}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Business Stage</StatLabel>
                    <StatNumber>{pestleAnalysis.business_stage}</StatNumber>
                  </Stat>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Card bg="green.50">
                    <CardHeader>
                      <Text fontWeight="semibold" color="green.700">Opportunities</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={1}>
                        {pestleAnalysis.opportunities.map((opp, index) => (
                          <Text key={index} fontSize="sm">• {opp}</Text>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="red.50">
                    <CardHeader>
                      <Text fontWeight="semibold" color="red.700">Threats</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack align="start" spacing={1}>
                        {pestleAnalysis.threats.map((threat, index) => (
                          <Text key={index} fontSize="sm">• {threat}</Text>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>

                <Card bg="blue.50">
                  <CardHeader>
                    <Text fontWeight="semibold" color="blue.700">Recommendations</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack align="start" spacing={1}>
                      {pestleAnalysis.recommendations.map((rec, index) => (
                        <Text key={index} fontSize="sm">• {rec}</Text>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HuggingFaceVideoProduction;