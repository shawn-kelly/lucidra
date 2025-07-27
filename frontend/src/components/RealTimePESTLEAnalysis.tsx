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
  CircularProgress,
  CircularProgressLabel,
  LineChart,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Area,
  Legend
} from '@chakra-ui/react';

// Enhanced PESTLE Interfaces
interface PESTLEDataSource {
  id: string;
  name: string;
  type: 'government' | 'financial' | 'research' | 'industry' | 'social' | 'news';
  api_endpoint: string;
  update_frequency: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  reliability_score: number; // 1-10
  coverage_sectors: string[];
  geographic_scope: string[];
  cost_type: 'free' | 'paid' | 'premium';
  last_updated: string;
  status: 'active' | 'inactive' | 'error';
}

interface SectorProfile {
  sector: string;
  description: string;
  key_stakeholders: string[];
  regulatory_bodies: string[];
  market_size: number;
  growth_rate: number;
  maturity_level: 'emerging' | 'growth' | 'mature' | 'declining';
  innovation_index: number;
  sustainability_focus: number;
  digital_transformation_level: number;
}

interface MarketVariable {
  id: string;
  name: string;
  category: 'political' | 'economic' | 'social' | 'technological' | 'legal' | 'environmental';
  description: string;
  measurement_unit: string;
  typical_range: [number, number];
  update_frequency: string;
  data_sources: string[];
  calculation_method: string;
  weighting_factors: {
    startup_impact: number;
    mature_impact: number;
    volatility: number;
    predictability: number;
  };
}

interface TrendAnalysis {
  variable_id: string;
  time_series: {
    date: string;
    value: number;
    confidence: number;
  }[];
  trend_direction: 'strong_up' | 'weak_up' | 'stable' | 'weak_down' | 'strong_down';
  volatility_score: number;
  seasonality: boolean;
  correlation_factors: string[];
  forecast_3_months: number;
  forecast_6_months: number;
  forecast_12_months: number;
}

interface CompetitiveIntelligence {
  sector: string;
  competitor_activity: {
    new_entrants: number;
    market_exits: number;
    merger_activity: number;
    innovation_announcements: number;
  };
  investment_flows: {
    vc_funding: number;
    rd_spending: number;
    infrastructure_investment: number;
    government_grants: number;
  };
  regulatory_changes: {
    pending_legislation: string[];
    policy_shifts: string[];
    compliance_deadlines: string[];
  };
  technology_disruptions: {
    emerging_technologies: string[];
    adoption_rates: { [key: string]: number };
    patent_activity: number;
  };
}

interface AlertConfiguration {
  id: string;
  user_id: string;
  name: string;
  sector: string;
  variables: string[];
  thresholds: { [variable_id: string]: { min?: number; max?: number } };
  notification_methods: ('email' | 'sms' | 'dashboard' | 'slack')[];
  frequency: 'immediate' | 'daily' | 'weekly';
  active: boolean;
}

const RealTimePESTLEAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSector, setSelectedSector] = useState('Technology');
  const [businessStage, setBusinessStage] = useState<'startup' | 'mature'>('startup');
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);
  const [updateInterval, setUpdateInterval] = useState(300000); // 5 minutes
  const [dataSources, setDataSources] = useState<PESTLEDataSource[]>([]);
  const [marketVariables, setMarketVariables] = useState<MarketVariable[]>([]);
  const [trendAnalyses, setTrendAnalyses] = useState<TrendAnalysis[]>([]);
  const [competitiveIntel, setCompetitiveIntel] = useState<CompetitiveIntelligence | null>(null);
  const [alerts, setAlerts] = useState<AlertConfiguration[]>([]);
  const [liveDataFeed, setLiveDataFeed] = useState<any[]>([]);

  const { isOpen: isSourceModalOpen, onOpen: onSourceModalOpen, onClose: onSourceModalClose } = useDisclosure();
  const { isOpen: isAlertModalOpen, onOpen: onAlertModalOpen, onClose: onAlertModalClose } = useDisclosure();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Comprehensive sector definitions with market variables
  const sectorProfiles: { [key: string]: SectorProfile } = {
    'Technology': {
      sector: 'Technology',
      description: 'Software, hardware, AI, and digital transformation companies',
      key_stakeholders: ['Developers', 'Investors', 'Regulators', 'Consumers', 'Enterprise Clients'],
      regulatory_bodies: ['FTC', 'SEC', 'EU Digital Services Act', 'GDPR Authority'],
      market_size: 5200000, // in millions USD
      growth_rate: 12.5,
      maturity_level: 'growth',
      innovation_index: 9.2,
      sustainability_focus: 7.8,
      digital_transformation_level: 9.8
    },
    'Healthcare': {
      sector: 'Healthcare',
      description: 'Medical devices, pharmaceuticals, biotechnology, and health services',
      key_stakeholders: ['Patients', 'Healthcare Providers', 'Insurers', 'Regulators', 'Researchers'],
      regulatory_bodies: ['FDA', 'EMA', 'WHO', 'National Health Authorities'],
      market_size: 4200000,
      growth_rate: 8.7,
      maturity_level: 'mature',
      innovation_index: 8.5,
      sustainability_focus: 6.9,
      digital_transformation_level: 6.8
    },
    'Financial Services': {
      sector: 'Financial Services',
      description: 'Banking, insurance, fintech, and investment services',
      key_stakeholders: ['Consumers', 'Businesses', 'Investors', 'Central Banks', 'Regulators'],
      regulatory_bodies: ['Federal Reserve', 'SEC', 'FDIC', 'ECB', 'Basel Committee'],
      market_size: 3800000,
      growth_rate: 6.2,
      maturity_level: 'mature',
      innovation_index: 7.3,
      sustainability_focus: 7.2,
      digital_transformation_level: 8.1
    },
    'Retail': {
      sector: 'Retail',
      description: 'E-commerce, traditional retail, consumer goods, and omnichannel commerce',
      key_stakeholders: ['Consumers', 'Suppliers', 'Employees', 'Investors', 'Communities'],
      regulatory_bodies: ['FTC', 'Consumer Protection Agencies', 'Trade Commissions'],
      market_size: 6500000,
      growth_rate: 4.8,
      maturity_level: 'mature',
      innovation_index: 6.7,
      sustainability_focus: 8.1,
      digital_transformation_level: 7.9
    },
    'Manufacturing': {
      sector: 'Manufacturing',
      description: 'Industrial production, automation, and supply chain management',
      key_stakeholders: ['Workers', 'Suppliers', 'Customers', 'Communities', 'Environmental Groups'],
      regulatory_bodies: ['OSHA', 'EPA', 'Industry Standards Bodies', 'Trade Authorities'],
      market_size: 12800000,
      growth_rate: 3.2,
      maturity_level: 'mature',
      innovation_index: 6.8,
      sustainability_focus: 7.5,
      digital_transformation_level: 6.2
    },
    'Energy': {
      sector: 'Energy',
      description: 'Renewable energy, oil & gas, utilities, and energy infrastructure',
      key_stakeholders: ['Consumers', 'Governments', 'Environmental Groups', 'Investors', 'Communities'],
      regulatory_bodies: ['DOE', 'EPA', 'FERC', 'State Utility Commissions'],
      market_size: 8900000,
      growth_rate: 7.1,
      maturity_level: 'growth',
      innovation_index: 8.1,
      sustainability_focus: 9.3,
      digital_transformation_level: 5.9
    }
  };

  // Initialize data sources
  useEffect(() => {
    const initialDataSources: PESTLEDataSource[] = [
      {
        id: 'federal-reserve-api',
        name: 'Federal Reserve Economic Data (FRED)',
        type: 'government',
        api_endpoint: 'https://api.stlouisfed.org/fred/',
        update_frequency: 'daily',
        reliability_score: 9.8,
        coverage_sectors: ['Financial Services', 'Technology', 'Manufacturing', 'Retail'],
        geographic_scope: ['United States', 'Global'],
        cost_type: 'free',
        last_updated: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'world-bank-api',
        name: 'World Bank Open Data',
        type: 'government',
        api_endpoint: 'https://api.worldbank.org/v2/',
        update_frequency: 'monthly',
        reliability_score: 9.5,
        coverage_sectors: Object.keys(sectorProfiles),
        geographic_scope: ['Global', 'Regional', 'National'],
        cost_type: 'free',
        last_updated: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'bloomberg-api',
        name: 'Bloomberg Terminal API',
        type: 'financial',
        api_endpoint: 'https://api.bloomberg.com/',
        update_frequency: 'realtime',
        reliability_score: 9.9,
        coverage_sectors: Object.keys(sectorProfiles),
        geographic_scope: ['Global'],
        cost_type: 'premium',
        last_updated: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'crunchbase-api',
        name: 'Crunchbase Investment Data',
        type: 'industry',
        api_endpoint: 'https://api.crunchbase.com/',
        update_frequency: 'daily',
        reliability_score: 8.7,
        coverage_sectors: ['Technology', 'Healthcare', 'Financial Services'],
        geographic_scope: ['Global'],
        cost_type: 'paid',
        last_updated: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'google-trends-api',
        name: 'Google Trends API',
        type: 'social',
        api_endpoint: 'https://trends.googleapis.com/',
        update_frequency: 'hourly',
        reliability_score: 8.2,
        coverage_sectors: Object.keys(sectorProfiles),
        geographic_scope: ['Global', 'Regional', 'National'],
        cost_type: 'free',
        last_updated: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'patent-api',
        name: 'Patent Activity Database',
        type: 'research',
        api_endpoint: 'https://api.patentsview.org/',
        update_frequency: 'weekly',
        reliability_score: 8.9,
        coverage_sectors: ['Technology', 'Healthcare', 'Manufacturing'],
        geographic_scope: ['United States', 'EU', 'Global'],
        cost_type: 'free',
        last_updated: new Date().toISOString(),
        status: 'active'
      }
    ];

    setDataSources(initialDataSources);
    initializeMarketVariables();
    startDataCollection();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const initializeMarketVariables = () => {
    const variables: MarketVariable[] = [
      // Political Variables
      {
        id: 'political_stability_index',
        name: 'Political Stability Index',
        category: 'political',
        description: 'Measures political risk and stability in the operating environment',
        measurement_unit: 'Index (0-100)',
        typical_range: [30, 95],
        update_frequency: 'Monthly',
        data_sources: ['World Bank', 'Political Risk Services'],
        calculation_method: 'Composite index of governance indicators',
        weighting_factors: {
          startup_impact: 8.5,
          mature_impact: 7.2,
          volatility: 6.8,
          predictability: 4.3
        }
      },
      {
        id: 'regulatory_burden_score',
        name: 'Regulatory Burden Score',
        category: 'political',
        description: 'Quantifies the complexity and cost of regulatory compliance',
        measurement_unit: 'Score (1-10)',
        typical_range: [2, 9],
        update_frequency: 'Quarterly',
        data_sources: ['OECD', 'Industry Associations'],
        calculation_method: 'Weighted average of compliance costs and complexity',
        weighting_factors: {
          startup_impact: 9.2,
          mature_impact: 6.8,
          volatility: 5.1,
          predictability: 6.7
        }
      },
      
      // Economic Variables
      {
        id: 'gdp_growth_rate',
        name: 'GDP Growth Rate',
        category: 'economic',
        description: 'Annual percentage growth rate of Gross Domestic Product',
        measurement_unit: 'Percentage (%)',
        typical_range: [-5, 8],
        update_frequency: 'Quarterly',
        data_sources: ['Federal Reserve', 'World Bank', 'IMF'],
        calculation_method: 'Year-over-year percentage change in real GDP',
        weighting_factors: {
          startup_impact: 7.8,
          mature_impact: 8.9,
          volatility: 7.2,
          predictability: 6.1
        }
      },
      {
        id: 'interest_rates',
        name: 'Interest Rates (Federal Funds)',
        category: 'economic',
        description: 'Federal funds rate set by central bank monetary policy',
        measurement_unit: 'Percentage (%)',
        typical_range: [0, 8],
        update_frequency: 'Real-time',
        data_sources: ['Federal Reserve', 'Central Banks'],
        calculation_method: 'Policy rate decisions by monetary authorities',
        weighting_factors: {
          startup_impact: 9.1,
          mature_impact: 7.8,
          volatility: 8.3,
          predictability: 5.9
        }
      },
      
      // Social Variables
      {
        id: 'consumer_confidence',
        name: 'Consumer Confidence Index',
        category: 'social',
        description: 'Measures consumer optimism about economic conditions',
        measurement_unit: 'Index (0-200)',
        typical_range: [40, 140],
        update_frequency: 'Monthly',
        data_sources: ['Conference Board', 'Consumer Surveys'],
        calculation_method: 'Survey-based composite index',
        weighting_factors: {
          startup_impact: 7.3,
          mature_impact: 8.7,
          volatility: 6.9,
          predictability: 5.8
        }
      },
      {
        id: 'social_media_sentiment',
        name: 'Social Media Sentiment Score',
        category: 'social',
        description: 'Aggregate sentiment analysis from social media platforms',
        measurement_unit: 'Score (-100 to 100)',
        typical_range: [-50, 80],
        update_frequency: 'Real-time',
        data_sources: ['Twitter API', 'Social Listening Tools'],
        calculation_method: 'AI-powered sentiment analysis of social content',
        weighting_factors: {
          startup_impact: 8.9,
          mature_impact: 6.2,
          volatility: 9.1,
          predictability: 3.7
        }
      },
      
      // Technological Variables
      {
        id: 'rd_investment_rate',
        name: 'R&D Investment Rate',
        category: 'technological',
        description: 'Research and development spending as percentage of GDP',
        measurement_unit: 'Percentage of GDP (%)',
        typical_range: [1, 5],
        update_frequency: 'Annually',
        data_sources: ['OECD', 'NSF', 'Industry Reports'],
        calculation_method: 'Total R&D expenditure divided by GDP',
        weighting_factors: {
          startup_impact: 8.8,
          mature_impact: 7.9,
          volatility: 4.2,
          predictability: 7.8
        }
      },
      {
        id: 'patent_applications',
        name: 'Patent Applications Growth',
        category: 'technological',
        description: 'Year-over-year growth in patent applications filed',
        measurement_unit: 'Percentage Growth (%)',
        typical_range: [-10, 25],
        update_frequency: 'Monthly',
        data_sources: ['USPTO', 'WIPO', 'Patent Offices'],
        calculation_method: 'YoY percentage change in patent filings',
        weighting_factors: {
          startup_impact: 9.3,
          mature_impact: 6.8,
          volatility: 6.7,
          predictability: 6.9
        }
      },
      
      // Legal Variables
      {
        id: 'litigation_risk_index',
        name: 'Litigation Risk Index',
        category: 'legal',
        description: 'Measures legal risks and litigation frequency in sector',
        measurement_unit: 'Risk Index (1-10)',
        typical_range: [2, 9],
        update_frequency: 'Quarterly',
        data_sources: ['Legal Databases', 'Court Records'],
        calculation_method: 'Weighted index of litigation frequency and damages',
        weighting_factors: {
          startup_impact: 8.7,
          mature_impact: 7.1,
          volatility: 5.8,
          predictability: 6.3
        }
      },
      
      // Environmental Variables
      {
        id: 'carbon_price',
        name: 'Carbon Price Index',
        category: 'environmental',
        description: 'Market price of carbon emissions permits and taxes',
        measurement_unit: 'USD per ton CO2',
        typical_range: [10, 80],
        update_frequency: 'Daily',
        data_sources: ['Carbon Markets', 'Environmental Exchanges'],
        calculation_method: 'Weighted average of regional carbon pricing',
        weighting_factors: {
          startup_impact: 6.9,
          mature_impact: 8.4,
          volatility: 7.8,
          predictability: 5.2
        }
      },
      {
        id: 'sustainability_regulations',
        name: 'Sustainability Regulation Score',
        category: 'environmental',
        description: 'Measures stringency of environmental regulations',
        measurement_unit: 'Regulation Score (1-10)',
        typical_range: [3, 9],
        update_frequency: 'Quarterly',
        data_sources: ['Environmental Agencies', 'Policy Trackers'],
        calculation_method: 'Composite score of environmental policy stringency',
        weighting_factors: {
          startup_impact: 7.8,
          mature_impact: 8.9,
          volatility: 4.9,
          predictability: 7.1
        }
      }
    ];

    setMarketVariables(variables);
  };

  const startDataCollection = () => {
    if (!dataCollectionEnabled) return;

    intervalRef.current = setInterval(async () => {
      await collectRealTimeData();
    }, updateInterval);
  };

  const collectRealTimeData = async () => {
    try {
      // Simulate real-time data collection from various sources
      const newDataPoints = marketVariables.map(variable => {
        const baseValue = (variable.typical_range[0] + variable.typical_range[1]) / 2;
        const range = variable.typical_range[1] - variable.typical_range[0];
        const volatility = variable.weighting_factors.volatility / 10;
        
        // Generate realistic data with volatility
        const randomFactor = (Math.random() - 0.5) * volatility;
        const value = baseValue + (range * randomFactor);
        
        return {
          timestamp: new Date().toISOString(),
          variable_id: variable.id,
          variable_name: variable.name,
          category: variable.category,
          value: Math.max(variable.typical_range[0], Math.min(variable.typical_range[1], value)),
          source: 'live_feed',
          confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
          change_from_previous: (Math.random() - 0.5) * 10 // -5% to +5% change
        };
      });

      setLiveDataFeed(prev => [...newDataPoints, ...prev.slice(0, 100)]); // Keep last 100 data points

      // Generate competitive intelligence update
      if (Math.random() > 0.7) { // 30% chance of competitive intel update
        updateCompetitiveIntelligence();
      }

      // Check alert conditions
      checkAlertConditions(newDataPoints);

    } catch (error) {
      console.error('Data collection error:', error);
      toast({
        title: 'Data Collection Error',
        description: 'Unable to fetch real-time market data',
        status: 'warning',
        duration: 3000
      });
    }
  };

  const updateCompetitiveIntelligence = () => {
    const intel: CompetitiveIntelligence = {
      sector: selectedSector,
      competitor_activity: {
        new_entrants: Math.floor(Math.random() * 20),
        market_exits: Math.floor(Math.random() * 5),
        merger_activity: Math.floor(Math.random() * 8),
        innovation_announcements: Math.floor(Math.random() * 15)
      },
      investment_flows: {
        vc_funding: Math.random() * 5000 + 1000, // 1B-6B
        rd_spending: Math.random() * 2000 + 500, // 500M-2.5B
        infrastructure_investment: Math.random() * 10000 + 2000, // 2B-12B
        government_grants: Math.random() * 500 + 100 // 100M-600M
      },
      regulatory_changes: {
        pending_legislation: generatePendingLegislation(selectedSector),
        policy_shifts: generatePolicyShifts(selectedSector),
        compliance_deadlines: generateComplianceDeadlines(selectedSector)
      },
      technology_disruptions: {
        emerging_technologies: generateEmergingTech(selectedSector),
        adoption_rates: generateAdoptionRates(selectedSector),
        patent_activity: Math.floor(Math.random() * 1000 + 200)
      }
    };

    setCompetitiveIntel(intel);
  };

  const generatePendingLegislation = (sector: string): string[] => {
    const legislation = {
      'Technology': ['AI Regulation Act', 'Data Privacy Enhancement Bill', 'Digital Markets Competition Act'],
      'Healthcare': ['Drug Pricing Reform Act', 'Telehealth Expansion Bill', 'Medical Device Safety Act'],
      'Financial Services': ['Crypto Asset Regulation', 'Open Banking Standards', 'Climate Risk Disclosure'],
      'Retail': ['Consumer Protection Enhancement', 'Supply Chain Transparency Act', 'Worker Rights Bill'],
      'Manufacturing': ['Clean Energy Manufacturing Act', 'Supply Chain Security Bill', 'Worker Safety Standards'],
      'Energy': ['Clean Energy Infrastructure Act', 'Carbon Border Adjustment', 'Grid Modernization Bill']
    };
    return legislation[sector as keyof typeof legislation] || [];
  };

  const generatePolicyShifts = (sector: string): string[] => {
    const shifts = {
      'Technology': ['Increased antitrust scrutiny', 'AI ethics guidelines', 'Cross-border data transfer rules'],
      'Healthcare': ['Value-based care incentives', 'Drug importation policies', 'Digital health standards'],
      'Financial Services': ['Climate stress testing', 'Fintech sandbox expansion', 'Consumer data rights'],
      'Retail': ['Sustainability reporting requirements', 'Supply chain due diligence', 'Gig worker classification'],
      'Manufacturing': ['Reshoring incentives', 'Green manufacturing standards', 'Trade policy adjustments'],
      'Energy': ['Renewable energy mandates', 'Grid resilience requirements', 'Emissions reduction targets']
    };
    return shifts[sector as keyof typeof shifts] || [];
  };

  const generateComplianceDeadlines = (sector: string): string[] => {
    return [
      'Q2 2024: New reporting requirements',
      'Q3 2024: Updated safety standards',
      'Q4 2024: Environmental compliance review',
      'Q1 2025: Digital security audits'
    ];
  };

  const generateEmergingTech = (sector: string): string[] => {
    const tech = {
      'Technology': ['Quantum Computing', 'Edge AI', 'Extended Reality (XR)', 'Neuromorphic Computing'],
      'Healthcare': ['Precision Medicine', 'Digital Therapeutics', 'Robotic Surgery', 'Gene Editing'],
      'Financial Services': ['Central Bank Digital Currencies', 'DeFi Protocols', 'Quantum Cryptography', 'Embedded Finance'],
      'Retail': ['Autonomous Commerce', 'AR Shopping', 'Voice Commerce', 'Micro-fulfillment'],
      'Manufacturing': ['Digital Twins', 'Collaborative Robots', 'Additive Manufacturing', 'Smart Materials'],
      'Energy': ['Green Hydrogen', 'Advanced Storage', 'Carbon Capture', 'Fusion Technology']
    };
    return tech[sector as keyof typeof tech] || [];
  };

  const generateAdoptionRates = (sector: string): { [key: string]: number } => {
    return {
      'AI/ML': Math.random() * 40 + 30, // 30-70%
      'Cloud Computing': Math.random() * 30 + 60, // 60-90%
      'IoT': Math.random() * 50 + 25, // 25-75%
      'Blockchain': Math.random() * 20 + 5, // 5-25%
      'Automation': Math.random() * 35 + 40 // 40-75%
    };
  };

  const checkAlertConditions = (dataPoints: any[]) => {
    alerts.forEach(alert => {
      if (!alert.active) return;

      dataPoints.forEach(point => {
        if (alert.variables.includes(point.variable_id)) {
          const threshold = alert.thresholds[point.variable_id];
          if (!threshold) return;

          let alertTriggered = false;
          let alertMessage = '';

          if (threshold.min !== undefined && point.value < threshold.min) {
            alertTriggered = true;
            alertMessage = `${point.variable_name} dropped below threshold: ${point.value.toFixed(2)}`;
          } else if (threshold.max !== undefined && point.value > threshold.max) {
            alertTriggered = true;
            alertMessage = `${point.variable_name} exceeded threshold: ${point.value.toFixed(2)}`;
          }

          if (alertTriggered) {
            toast({
              title: `Alert: ${alert.name}`,
              description: alertMessage,
              status: 'warning',
              duration: 8000,
              isClosable: true
            });
          }
        }
      });
    });
  };

  const renderRealTimeDataDashboard = () => (
    <VStack spacing={6} align="stretch">
      {/* Control Panel */}
      <Card bg="blue.50" border="1px" borderColor="blue.200">
        <CardBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={4} alignItems="center">
            <FormControl>
              <FormLabel fontSize="sm">Sector</FormLabel>
              <Select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                size="sm"
              >
                {Object.keys(sectorProfiles).map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Business Stage</FormLabel>
              <Select
                value={businessStage}
                onChange={(e) => setBusinessStage(e.target.value as 'startup' | 'mature')}
                size="sm"
              >
                <option value="startup">Startup</option>
                <option value="mature">Mature</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Data Collection</FormLabel>
              <Switch
                isChecked={dataCollectionEnabled}
                onChange={(e) => {
                  setDataCollectionEnabled(e.target.checked);
                  if (e.target.checked) {
                    startDataCollection();
                  } else if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                  }
                }}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Update Frequency</FormLabel>
              <Select
                value={updateInterval}
                onChange={(e) => setUpdateInterval(Number(e.target.value))}
                size="sm"
              >
                <option value={60000}>1 minute</option>
                <option value={300000}>5 minutes</option>
                <option value={900000}>15 minutes</option>
                <option value={3600000}>1 hour</option>
              </Select>
            </FormControl>
          </Grid>
        </CardBody>
      </Card>

      {/* Sector Overview */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardHeader>
          <Text fontWeight="semibold">Sector Profile: {selectedSector}</Text>
        </CardHeader>
        <CardBody>
          {sectorProfiles[selectedSector] && (
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <VStack align="start" spacing={2}>
                <Text fontSize="sm" fontWeight="medium">Market Overview</Text>
                <Stat>
                  <StatLabel>Market Size</StatLabel>
                  <StatNumber>${(sectorProfiles[selectedSector].market_size / 1000).toFixed(1)}T</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Growth Rate</StatLabel>
                  <StatNumber>{sectorProfiles[selectedSector].growth_rate}%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    Annual growth
                  </StatHelpText>
                </Stat>
              </VStack>

              <VStack align="start" spacing={2}>
                <Text fontSize="sm" fontWeight="medium">Innovation Metrics</Text>
                <Stat>
                  <StatLabel>Innovation Index</StatLabel>
                  <StatNumber>{sectorProfiles[selectedSector].innovation_index}/10</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Digital Transformation</StatLabel>
                  <StatNumber>{sectorProfiles[selectedSector].digital_transformation_level}/10</StatNumber>
                </Stat>
              </VStack>

              <VStack align="start" spacing={2}>
                <Text fontSize="sm" fontWeight="medium">Key Stakeholders</Text>
                <VStack align="start" spacing={1}>
                  {sectorProfiles[selectedSector].key_stakeholders.slice(0, 3).map((stakeholder, index) => (
                    <Badge key={index} colorScheme="blue" variant="subtle">
                      {stakeholder}
                    </Badge>
                  ))}
                </VStack>
              </VStack>
            </Grid>
          )}
        </CardBody>
      </Card>

      {/* Live Data Feed */}
      <Card bg={cardBg} border="1px" borderColor={borderColor}>
        <CardHeader>
          <HStack justify="space-between">
            <Text fontWeight="semibold">Live Market Variables</Text>
            <HStack>
              <Badge colorScheme={dataCollectionEnabled ? 'green' : 'red'}>
                {dataCollectionEnabled ? '🟢 LIVE' : '🔴 STOPPED'}
              </Badge>
              <Text fontSize="sm" color="gray.500">
                Last update: {liveDataFeed[0] ? new Date(liveDataFeed[0].timestamp).toLocaleTimeString() : 'Never'}
              </Text>
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(1, 1fr)" gap={4} maxH="400px" overflow="auto">
            {marketVariables
              .filter(variable => {
                const relevanceKey = businessStage === 'startup' ? 'startup_impact' : 'mature_impact';
                return variable.weighting_factors[relevanceKey] > 6; // Show highly relevant variables
              })
              .map(variable => {
                const latestData = liveDataFeed.find(point => point.variable_id === variable.id);
                const relevanceScore = businessStage === 'startup' ? 
                  variable.weighting_factors.startup_impact : 
                  variable.weighting_factors.mature_impact;

                return (
                  <Card key={variable.id} bg="gray.50" size="sm">
                    <CardBody>
                      <Grid templateColumns="1fr auto auto" gap={4} alignItems="center">
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="semibold" fontSize="sm">{variable.name}</Text>
                          <Text fontSize="xs" color="gray.600">{variable.description}</Text>
                        </VStack>

                        <VStack align="end" spacing={0}>
                          {latestData ? (
                            <>
                              <Text fontWeight="bold">
                                {latestData.value.toFixed(2)} {variable.measurement_unit}
                              </Text>
                              <HStack spacing={1}>
                                <Badge colorScheme={latestData.change_from_previous > 0 ? 'green' : 'red'} size="sm">
                                  {latestData.change_from_previous > 0 ? '↗' : '↘'} {Math.abs(latestData.change_from_previous).toFixed(1)}%
                                </Badge>
                                <Text fontSize="xs" color="gray.500">
                                  {(latestData.confidence * 100).toFixed(0)}% conf.
                                </Text>
                              </HStack>
                            </>
                          ) : (
                            <Text fontSize="sm" color="gray.500">No data</Text>
                          )}
                        </VStack>

                        <VStack spacing={1}>
                          <CircularProgress value={relevanceScore * 10} color="blue.400" size="40px">
                            <CircularProgressLabel fontSize="xs">{relevanceScore.toFixed(1)}</CircularProgressLabel>
                          </CircularProgress>
                          <Text fontSize="xs" color="gray.500">Relevance</Text>
                        </VStack>
                      </Grid>
                    </CardBody>
                  </Card>
                );
              })}
          </Grid>
        </CardBody>
      </Card>

      {/* Competitive Intelligence */}
      {competitiveIntel && (
        <Card bg={cardBg} border="1px" borderColor={borderColor}>
          <CardHeader>
            <Text fontWeight="semibold">Competitive Intelligence - {selectedSector}</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="sm" fontWeight="medium">Market Activity</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <Stat>
                    <StatLabel>New Entrants</StatLabel>
                    <StatNumber>{competitiveIntel.competitor_activity.new_entrants}</StatNumber>
                    <StatHelpText>This quarter</StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel>M&A Activity</StatLabel>
                    <StatNumber>{competitiveIntel.competitor_activity.merger_activity}</StatNumber>
                    <StatHelpText>Announced deals</StatHelpText>
                  </Stat>
                </Grid>

                <Text fontSize="sm" fontWeight="medium">Investment Flows</Text>
                <Stat>
                  <StatLabel>VC Funding</StatLabel>
                  <StatNumber>${(competitiveIntel.investment_flows.vc_funding / 1000).toFixed(1)}B</StatNumber>
                  <StatHelpText>YTD total</StatHelpText>
                </Stat>
              </VStack>

              <VStack align="stretch" spacing={4}>
                <Text fontSize="sm" fontWeight="medium">Technology Trends</Text>
                <VStack align="start" spacing={2}>
                  {competitiveIntel.technology_disruptions.emerging_technologies.slice(0, 3).map((tech, index) => (
                    <HStack key={index} justify="space-between" w="100%">
                      <Text fontSize="sm">{tech}</Text>
                      <Badge colorScheme="purple">Emerging</Badge>
                    </HStack>
                  ))}
                </VStack>

                <Text fontSize="sm" fontWeight="medium">Regulatory Updates</Text>
                <VStack align="start" spacing={1}>
                  {competitiveIntel.regulatory_changes.pending_legislation.slice(0, 2).map((legislation, index) => (
                    <Text key={index} fontSize="xs" color="gray.600">
                      • {legislation}
                    </Text>
                  ))}
                </VStack>
              </VStack>
            </Grid>
          </CardBody>
        </Card>
      )}
    </VStack>
  );

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Card bg="green.50" border="1px" borderColor="green.200">
          <CardBody>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="3xl" fontWeight="bold" color="green.700">
                  📊 Real-Time PESTLE Analysis
                </Text>
                <Text fontSize="lg" color="green.600">
                  Live market intelligence and sector-specific data collection for strategic planning
                </Text>
              </VStack>
              <VStack align="end" spacing={2}>
                <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                  {dataSources.filter(s => s.status === 'active').length} Data Sources
                </Badge>
                <Text fontSize="sm" color="green.600">
                  {liveDataFeed.length} Live Data Points
                </Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Main Tabs */}
        <Tabs index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>📊 Live Dashboard</Tab>
            <Tab>🔍 Data Sources</Tab>
            <Tab>⚠️ Alerts & Monitoring</Tab>
            <Tab>📈 Trend Analysis</Tab>
            <Tab>🏭 Sector Comparison</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {renderRealTimeDataDashboard()}
            </TabPanel>
            
            <TabPanel px={0}>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="semibold">Data Sources Management</Text>
                  <Button colorScheme="green" onClick={onSourceModalOpen}>
                    + Add Data Source
                  </Button>
                </HStack>

                <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                  {dataSources.map(source => (
                    <Card key={source.id} bg={cardBg} border="1px" borderColor={borderColor}>
                      <CardBody>
                        <Grid templateColumns="1fr auto auto" gap={4} alignItems="center">
                          <VStack align="start" spacing={1}>
                            <HStack>
                              <Text fontWeight="semibold">{source.name}</Text>
                              <Badge colorScheme={source.status === 'active' ? 'green' : 'red'}>
                                {source.status}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              {source.type} • {source.update_frequency} updates • {source.cost_type}
                            </Text>
                            <HStack wrap="wrap" spacing={1}>
                              {source.coverage_sectors.slice(0, 3).map((sector, index) => (
                                <Tag key={index} size="sm" colorScheme="blue">
                                  <TagLabel>{sector}</TagLabel>
                                </Tag>
                              ))}
                            </HStack>
                          </VStack>

                          <VStack align="end" spacing={1}>
                            <Stat textAlign="right">
                              <StatLabel>Reliability</StatLabel>
                              <StatNumber fontSize="lg">{source.reliability_score}/10</StatNumber>
                            </Stat>
                            <Text fontSize="xs" color="gray.500">
                              Updated: {new Date(source.last_updated).toLocaleDateString()}
                            </Text>
                          </VStack>

                          <VStack spacing={1}>
                            <Switch isChecked={source.status === 'active'} colorScheme="green" />
                            <Button size="xs" variant="outline">
                              Configure
                            </Button>
                          </VStack>
                        </Grid>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </VStack>
            </TabPanel>
            
            <TabPanel px={0}>
              <Text>Alert configuration and monitoring dashboard</Text>
            </TabPanel>
            
            <TabPanel px={0}>
              <Text>Historical trend analysis and forecasting</Text>
            </TabPanel>
            
            <TabPanel px={0}>
              <Text>Cross-sector comparison and benchmarking</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default RealTimePESTLEAnalysis;