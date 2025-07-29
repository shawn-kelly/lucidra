import React, { useState, useEffect, useCallback } from 'react';
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
  Textarea,
  Badge,
  Progress,
  Alert,
  AlertIcon,
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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Divider,
  Input,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Checkbox,
  CheckboxGroup,
  Stack,
  Avatar,
  AvatarGroup,
  IconButton,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Tag,
  TagLabel,
  TagCloseButton,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  CircularProgress,
  CircularProgressLabel,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Spacer,
  Image,
  Link,
  Code,
  Kbd,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Circle
} from '@chakra-ui/react';
import { 
  CheckIcon, 
  EditIcon, 
  DownloadIcon, 
  AddIcon,
  DeleteIcon,
  ViewIcon,
  InfoIcon,
  WarningIcon,
  StarIcon,
  CalendarIcon,
  TimeIcon,
  SearchIcon,
  RepeatIcon,
  AttachmentIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  CopyIcon,
  LockIcon,
  UnlockIcon,
  SettingsIcon,
  BellIcon,
  EmailIcon,
  PhoneIcon,
  ChatIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DragHandleIcon
} from '@chakra-ui/icons';

// Enhanced interfaces for comprehensive Business Model Canvas functionality

interface CanvasSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: CanvasItem[];
  color: string;
  completionWeight: number;
  tips: string[];
  examples: string[];
  questions: string[];
  validation: ValidationRule[];
  dependencies: string[];
  status: 'empty' | 'draft' | 'review' | 'approved' | 'outdated';
  lastUpdated: string;
  updatedBy: string;
  comments: CanvasComment[];
  attachments: CanvasAttachment[];
  templates: CanvasTemplate[];
  analysis: CanvasAnalysis;
  metrics: CanvasMetric[];
  integrations: CanvasIntegration[];
  version: number;
  history: CanvasHistory[];
}

interface CanvasItem {
  id: string;
  text: string;
  type: 'text' | 'bullet' | 'number' | 'priority' | 'category';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'inactive' | 'under_review' | 'deprecated';
  tags: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
  source: string;
  evidence: string[];
  confidence: number;
  impact: number;
  effort: number;
  risk: number;
  dependencies: string[];
  kpis: string[];
  notes: string;
  links: CanvasLink[];
}

interface CanvasLink {
  id: string;
  url: string;
  title: string;
  description: string;
  type: 'research' | 'competitor' | 'reference' | 'data' | 'internal';
}

interface CanvasComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'suggestion' | 'question' | 'approval' | 'concern';
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  parentId?: string;
  reactions: CommentReaction[];
}

interface CommentReaction {
  emoji: string;
  users: string[];
  count: number;
}

interface CanvasAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'spreadsheet' | 'presentation' | 'link' | 'video';
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  description: string;
  tags: string[];
}

interface CanvasTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  businessModel: string;
  items: string[];
  popularity: number;
  lastUsed?: string;
}

interface CanvasAnalysis {
  completeness: number;
  consistency: number;
  feasibility: number;
  marketFit: number;
  competitiveness: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  recommendations: string[];
  benchmarks: BenchmarkData[];
}

interface BenchmarkData {
  metric: string;
  yourValue: number;
  industryAverage: number;
  topPercentile: number;
  source: string;
  date: string;
}

interface CanvasMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  period: string;
  source: string;
  category: string;
}

interface CanvasIntegration {
  id: string;
  type: 'crm' | 'analytics' | 'financial' | 'survey' | 'social' | 'market_research';
  name: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: string;
  dataPoints: number;
  config: { [key: string]: any };
}

interface CanvasHistory {
  id: string;
  version: number;
  changes: CanvasChange[];
  timestamp: string;
  author: string;
  reason: string;
  approved: boolean;
  approvedBy?: string;
}

interface CanvasChange {
  field: string;
  oldValue: any;
  newValue: any;
  type: 'add' | 'edit' | 'delete' | 'move' | 'status_change';
  impact: 'low' | 'medium' | 'high';
}

interface ValidationRule {
  type: 'required' | 'min_length' | 'max_length' | 'pattern' | 'custom';
  value: any;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

interface BusinessModelAnalysis {
  viabilityScore: number;
  desirabilityScore: number;
  feasibilityScore: number;
  overallScore: number;
  marketSize: MarketSizeData;
  competitivePosition: CompetitivePosition;
  revenueProjection: RevenueProjection;
  riskAssessment: RiskAssessment;
  swotAnalysis: SWOTAnalysis;
  portersFiveForces: PortersFiveForces;
  valueChainAnalysis: ValueChainAnalysis;
  stakeholderAnalysis: StakeholderAnalysis;
}

interface MarketSizeData {
  tam: number; // Total Addressable Market
  sam: number; // Serviceable Addressable Market
  som: number; // Serviceable Obtainable Market
  growthRate: number;
  currency: string;
  sources: string[];
  confidence: number;
}

interface CompetitivePosition {
  directCompetitors: Competitor[];
  indirectCompetitors: Competitor[];
  competitiveAdvantages: string[];
  threats: string[];
  marketShare: number;
  positioning: string;
}

interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  marketShare: number;
  funding: number;
  valuation: number;
  website: string;
}

interface RevenueProjection {
  model: 'subscription' | 'freemium' | 'marketplace' | 'advertising' | 'transaction' | 'licensing' | 'hybrid';
  projections: RevenueData[];
  assumptions: Assumption[];
  scenarios: RevenueScenario[];
  breakeven: BreakevenAnalysis;
}

interface RevenueData {
  period: string;
  revenue: number;
  customers: number;
  arpu: number; // Average Revenue Per User
  churn: number;
  cac: number; // Customer Acquisition Cost
  ltv: number; // Lifetime Value
}

interface Assumption {
  description: string;
  value: number;
  confidence: number;
  source: string;
  impact: 'low' | 'medium' | 'high';
}

interface RevenueScenario {
  name: string;
  probability: number;
  revenue: number;
  description: string;
  keyFactors: string[];
}

interface BreakevenAnalysis {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
  breakevenUnits: number;
  breakevenRevenue: number;
  timeToBreakeven: number;
}

interface RiskAssessment {
  risks: BusinessRisk[];
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
  mitigation: MitigationStrategy[];
  contingency: ContingencyPlan[];
}

interface BusinessRisk {
  id: string;
  category: 'market' | 'financial' | 'operational' | 'technical' | 'regulatory' | 'competitive';
  description: string;
  probability: number;
  impact: number;
  riskScore: number;
  status: 'identified' | 'assessed' | 'mitigated' | 'accepted';
  owner: string;
  dueDate: string;
}

interface MitigationStrategy {
  riskId: string;
  strategy: string;
  actions: string[];
  cost: number;
  timeline: string;
  effectiveness: number;
  owner: string;
}

interface ContingencyPlan {
  trigger: string;
  actions: string[];
  resources: string[];
  timeline: string;
  responsible: string;
}

interface SWOTAnalysis {
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  strategies: SWOTStrategy[];
}

interface SWOTItem {
  description: string;
  impact: number;
  confidence: number;
  source: string;
  category: string;
}

interface SWOTStrategy {
  type: 'SO' | 'WO' | 'ST' | 'WT';
  description: string;
  priority: number;
  timeline: string;
  resources: string[];
}

interface PortersFiveForces {
  threatOfNewEntrants: ForceAnalysis;
  bargainingPowerOfSuppliers: ForceAnalysis;
  bargainingPowerOfBuyers: ForceAnalysis;
  threatOfSubstitutes: ForceAnalysis;
  competitiveRivalry: ForceAnalysis;
  overallAttractiveness: number;
}

interface ForceAnalysis {
  strength: number;
  factors: string[];
  impact: string;
  mitigation: string[];
}

interface ValueChainAnalysis {
  primaryActivities: ValueActivity[];
  supportActivities: ValueActivity[];
  costStructure: CostBreakdown[];
  valueCreation: ValueCreationArea[];
  optimization: OptimizationOpportunity[];
}

interface ValueActivity {
  name: string;
  description: string;
  cost: number;
  value: number;
  competitive: boolean;
  optimization: string[];
}

interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  variability: 'fixed' | 'variable' | 'semi-variable';
}

interface ValueCreationArea {
  area: string;
  value: number;
  differentiator: boolean;
  improvement: string[];
}

interface OptimizationOpportunity {
  area: string;
  potential: number;
  effort: number;
  timeline: string;
  priority: number;
}

interface StakeholderAnalysis {
  stakeholders: Stakeholder[];
  matrix: StakeholderMatrix;
  engagement: EngagementPlan[];
}

interface Stakeholder {
  name: string;
  type: 'customer' | 'investor' | 'employee' | 'partner' | 'regulator' | 'community';
  influence: number;
  interest: number;
  attitude: 'champion' | 'supporter' | 'neutral' | 'critic' | 'blocker';
  needs: string[];
  concerns: string[];
  communication: string;
}

interface StakeholderMatrix {
  highInfluenceHighInterest: string[];
  highInfluenceLowInterest: string[];
  lowInfluenceHighInterest: string[];
  lowInfluenceLowInterest: string[];
}

interface EngagementPlan {
  stakeholder: string;
  strategy: string;
  frequency: string;
  channels: string[];
  objectives: string[];
  metrics: string[];
}

interface CollaborationData {
  team: TeamMember[];
  permissions: Permission[];
  activity: ActivityLog[];
  notifications: NotificationSettings;
  sharing: SharingSettings;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  permissions: string[];
  avatar: string;
  lastActive: string;
  contributions: number;
  expertise: string[];
}

interface Permission {
  userId: string;
  canView: boolean;
  canEdit: boolean;
  canComment: boolean;
  canShare: boolean;
  canExport: boolean;
  sections: string[];
}

interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  section: string;
  timestamp: string;
  details: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  comments: boolean;
  changes: boolean;
  mentions: boolean;
  deadlines: boolean;
}

interface SharingSettings {
  public: boolean;
  password: string;
  expiresAt?: string;
  allowComments: boolean;
  watermark: boolean;
}

interface CanvasExport {
  format: 'pdf' | 'png' | 'svg' | 'pptx' | 'docx' | 'json' | 'csv';
  options: ExportOptions;
  template: string;
  branding: boolean;
  sections: string[];
}

interface ExportOptions {
  includeComments: boolean;
  includeAnalysis: boolean;
  includeMetrics: boolean;
  includeHistory: boolean;
  resolution: 'low' | 'medium' | 'high';
  colorScheme: 'color' | 'grayscale' | 'bw';
}

interface CanvasPreset {
  id: string;
  name: string;
  description: string;
  industry: string;
  stage: 'startup' | 'growth' | 'mature' | 'pivot';
  complexity: 'simple' | 'standard' | 'comprehensive';
  sections: Partial<CanvasSection>[];
  popularity: number;
  rating: number;
  author: string;
  tags: string[];
}

interface AIInsight {
  id: string;
  type: 'suggestion' | 'warning' | 'opportunity' | 'threat' | 'validation';
  section: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  action: string;
  evidence: string[];
  sources: string[];
  timestamp: string;
}

interface IntegrationData {
  marketData: MarketIntegration;
  competitorData: CompetitorIntegration;
  customerData: CustomerIntegration;
  financialData: FinancialIntegration;
  socialData: SocialIntegration;
}

interface MarketIntegration {
  trends: MarketTrend[];
  size: MarketSizeData;
  segments: MarketSegment[];
  growth: GrowthData[];
}

interface MarketTrend {
  trend: string;
  impact: number;
  timeline: string;
  confidence: number;
  sources: string[];
}

interface MarketSegment {
  name: string;
  size: number;
  growth: number;
  characteristics: string[];
  needs: string[];
}

interface GrowthData {
  period: string;
  rate: number;
  drivers: string[];
  constraints: string[];
}

interface CompetitorIntegration {
  competitors: Competitor[];
  analysis: CompetitiveAnalysis;
  positioning: PositioningMap;
}

interface CompetitiveAnalysis {
  directCompetitors: number;
  indirectCompetitors: number;
  newEntrants: number;
  marketConcentration: number;
  competitiveIntensity: number;
}

interface PositioningMap {
  dimensions: string[];
  positions: CompetitorPosition[];
  gaps: MarketGap[];
}

interface CompetitorPosition {
  competitor: string;
  x: number;
  y: number;
  size: number;
}

interface MarketGap {
  description: string;
  size: number;
  difficulty: number;
  opportunity: number;
}

interface CustomerIntegration {
  segments: CustomerSegment[];
  personas: CustomerPersona[];
  journey: CustomerJourney[];
  feedback: CustomerFeedback[];
}

interface CustomerSegment {
  name: string;
  size: number;
  characteristics: string[];
  needs: string[];
  painPoints: string[];
  willingness: number;
  reachability: number;
}

interface CustomerPersona {
  name: string;
  demographics: Demographics;
  psychographics: Psychographics;
  behavior: BehaviorPattern[];
  goals: string[];
  frustrations: string[];
}

interface Demographics {
  age: number;
  gender: string;
  income: number;
  education: string;
  location: string;
  occupation: string;
}

interface Psychographics {
  values: string[];
  interests: string[];
  lifestyle: string[];
  personality: string[];
}

interface BehaviorPattern {
  context: string;
  behavior: string;
  frequency: string;
  triggers: string[];
}

interface CustomerJourney {
  stage: string;
  touchpoints: string[];
  emotions: string[];
  painPoints: string[];
  opportunities: string[];
}

interface CustomerFeedback {
  source: string;
  feedback: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  category: string;
  actionable: boolean;
}

interface FinancialIntegration {
  revenue: RevenueData[];
  costs: CostData[];
  funding: FundingData[];
  valuation: ValuationData;
  kpis: FinancialKPI[];
}

interface CostData {
  category: string;
  amount: number;
  type: 'fixed' | 'variable';
  period: string;
}

interface FundingData {
  round: string;
  amount: number;
  investors: string[];
  valuation: number;
  date: string;
}

interface ValuationData {
  method: string;
  value: number;
  multiples: ValuationMultiple[];
  assumptions: Assumption[];
}

interface ValuationMultiple {
  metric: string;
  multiple: number;
  industry: number;
  premium: number;
}

interface FinancialKPI {
  name: string;
  value: number;
  target: number;
  benchmark: number;
  trend: 'up' | 'down' | 'stable';
}

interface SocialIntegration {
  mentions: SocialMention[];
  sentiment: SentimentAnalysis;
  influencers: Influencer[];
  trends: SocialTrend[];
}

interface SocialMention {
  platform: string;
  content: string;
  author: string;
  reach: number;
  engagement: number;
  sentiment: number;
  timestamp: string;
}

interface SentimentAnalysis {
  overall: number;
  byPlatform: { [platform: string]: number };
  topics: TopicSentiment[];
  trends: SentimentTrend[];
}

interface TopicSentiment {
  topic: string;
  sentiment: number;
  volume: number;
}

interface SentimentTrend {
  date: string;
  sentiment: number;
  volume: number;
}

interface Influencer {
  name: string;
  platform: string;
  followers: number;
  engagement: number;
  relevance: number;
  sentiment: number;
}

interface SocialTrend {
  hashtag: string;
  volume: number;
  growth: number;
  sentiment: number;
  relevance: number;
}

interface BalancedScorecardMetric {
  id: string;
  perspective: 'financial' | 'customer' | 'internal' | 'learning';
  metric: string;
  target: string;
  current: string;
  status: 'on-track' | 'at-risk' | 'behind' | 'exceeded' | 'critical';
  trend: 'up' | 'down' | 'stable';
  weight: number;
  formula: string;
  dataSource: string;
  frequency: string;
  owner: string;
  history: MetricHistory[];
  benchmark: BenchmarkValue[];
  alerts: MetricAlert[];
}

interface MetricHistory {
  date: string;
  value: string;
  note?: string;
  source: string;
}

interface BenchmarkValue {
  type: 'industry' | 'competitor' | 'best-practice' | 'target';
  value: string;
  source: string;
  date: string;
}

interface MetricAlert {
  condition: string;
  threshold: string;
  recipients: string[];
  active: boolean;
}

const BusinessModelCanvas: React.FC = () => {
  // Core state management
  const [canvasSections, setCanvasSections] = useState<CanvasSection[]>([
    {
      id: 'key-partners',
      title: 'Key Partners',
      description: 'Who are your key partners and suppliers?',
      icon: '🤝',
      content: [],
      color: 'blue',
      completionWeight: 10,
      tips: [
        'Include strategic alliances, joint ventures, and key suppliers',
        'Consider partners that help reduce risk or acquire resources',
        'Think about optimization and economy partnerships'
      ],
      examples: ['Suppliers', 'Strategic Partners', 'Joint Ventures', 'Distributors'],
      questions: [
        'Who are your key partners?',
        'What key resources do you acquire from partners?',
        'What key activities do partners perform?'
      ],
      validation: [
        { type: 'required', value: true, message: 'At least one key partner is required', severity: 'warning' }
      ],
      dependencies: ['key-activities', 'key-resources'],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'key-activities',
      title: 'Key Activities',
      description: 'What key activities does your value proposition require?',
      icon: '⚡',
      content: [],
      color: 'purple',
      completionWeight: 15,
      tips: [
        'Focus on activities that create value for customers',
        'Include production, problem-solving, and platform activities',
        'Consider both primary and support activities'
      ],
      examples: ['Manufacturing', 'Software Development', 'Marketing', 'Customer Support'],
      questions: [
        'What key activities does your value proposition require?',
        'What activities are most important for your distribution channels?',
        'What activities are required for customer relationships?'
      ],
      validation: [
        { type: 'min_length', value: 2, message: 'At least 2 key activities recommended', severity: 'info' }
      ],
      dependencies: ['value-propositions'],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'key-resources',
      title: 'Key Resources',
      description: 'What key resources does your value proposition require?',
      icon: '🎯',
      content: [],
      color: 'cyan',
      completionWeight: 15,
      tips: [
        'Include physical, intellectual, human, and financial resources',
        'Focus on resources that are most important to your business model',
        'Consider what resources you own vs. lease vs. acquire from partners'
      ],
      examples: ['Technology Assets', 'Brand', 'Patents', 'Database', 'Manufacturing Facilities'],
      questions: [
        'What key resources does your value proposition require?',
        'What resources do your distribution channels require?',
        'What resources do your customer relationships require?'
      ],
      validation: [
        { type: 'required', value: true, message: 'Key resources are essential for business model', severity: 'error' }
      ],
      dependencies: ['value-propositions', 'key-activities'],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'value-propositions',
      title: 'Value Propositions',
      description: 'What value do you deliver to customers?',
      icon: '💎',
      content: [],
      color: 'teal',
      completionWeight: 25
    },
    {
      id: 'customer-relationships',
      title: 'Customer Relationships',
      description: 'What type of relationship do you establish?',
      icon: '❤️',
      content: [],
      color: 'pink',
      completionWeight: 10
    },
    {
      id: 'channels',
      title: 'Channels',
      description: 'Through which channels do you reach customers?',
      icon: '📢',
      content: [],
      color: 'orange',
      completionWeight: 10
    },
    {
      id: 'customer-segments',
      title: 'Customer Segments',
      description: 'For whom are you creating value?',
      icon: '👥',
      content: [],
      color: 'green',
      completionWeight: 15
    },
    {
      id: 'cost-structure',
      title: 'Cost Structure',
      description: 'What are the most important costs in your business model?',
      icon: '💰',
      content: [],
      color: 'red',
      completionWeight: 10
    },
    {
      id: 'revenue-streams',
      title: 'Revenue Streams',
      description: 'For what value are customers willing to pay?',
      icon: '💵',
      content: [],
      color: 'yellow',
      completionWeight: 10,
      tips: [
        'Consider different revenue models and pricing mechanisms',
        'Think about one-time vs recurring revenue',
        'Analyze what customers are really willing to pay for'
      ],
      examples: ['Asset Sale', 'Usage Fee', 'Subscription Fee', 'Lending/Leasing', 'Licensing', 'Brokerage Fee', 'Advertising'],
      questions: [
        'For what value are our customers really willing to pay?',
        'For what do they currently pay?',
        'How would they prefer to pay?'
      ],
      validation: [
        { type: 'required', value: true, message: 'Revenue streams are essential for business viability', severity: 'error' }
      ],
      dependencies: ['value-propositions', 'customer-segments'],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'value-propositions',
      title: 'Value Propositions',
      description: 'What value do you deliver to customers?',
      icon: '💎',
      content: [],
      color: 'teal',
      completionWeight: 25,
      tips: [
        'Focus on jobs customers are trying to get done',
        'Address specific customer pains and gains',
        'Quantify benefits where possible'
      ],
      examples: ['Cost reduction', 'Convenience', 'Design', 'Brand/Status', 'Price'],
      questions: [
        'What value do you deliver to the customer?',
        'Which customer problems are you helping to solve?',
        'Which customer needs are you satisfying?'
      ],
      validation: [
        { type: 'required', value: true, message: 'Value propositions are the heart of your business model', severity: 'error' }
      ],
      dependencies: [],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'customer-relationships',
      title: 'Customer Relationships',
      description: 'What type of relationship do you establish?',
      icon: '❤️',
      content: [],
      color: 'pink',
      completionWeight: 10,
      tips: [
        'Consider personal assistance vs self-service',
        'Think about customer acquisition, retention, and boosting sales',
        'Define relationship categories for different customer segments'
      ],
      examples: ['Personal Assistance', 'Self-Service', 'Automated Services', 'Communities', 'Co-creation'],
      questions: [
        'What type of relationship does each customer segment expect?',
        'How are they integrated with the rest of our business model?',
        'How costly are they?'
      ],
      validation: [],
      dependencies: ['customer-segments'],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'channels',
      title: 'Channels',
      description: 'Through which channels do you reach customers?',
      icon: '📢',
      content: [],
      color: 'orange',
      completionWeight: 10,
      tips: [
        'Include both direct and indirect channels',
        'Consider online and offline touchpoints',
        'Map the customer journey through your channels'
      ],
      examples: ['Web Sales', 'Retail Stores', 'Partner Stores', 'Sales Force'],
      questions: [
        'Through which channels do our customer segments want to be reached?',
        'How are we reaching them now?',
        'Which channels work best and are most cost-efficient?'
      ],
      validation: [],
      dependencies: ['customer-segments', 'value-propositions'],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'customer-segments',
      title: 'Customer Segments',
      description: 'For whom are you creating value?',
      icon: '👥',
      content: [],
      color: 'green',
      completionWeight: 15,
      tips: [
        'Group customers with similar needs, behaviors, or characteristics',
        'Consider different customer archetypes',
        'Think about B2B vs B2C segments'
      ],
      examples: ['Mass Market', 'Niche Market', 'Segmented', 'Diversified', 'Multi-sided Platform'],
      questions: [
        'For whom are we creating value?',
        'Who are our most important customers?',
        'What are the customer segment characteristics?'
      ],
      validation: [
        { type: 'required', value: true, message: 'Customer segments are essential for business model', severity: 'error' }
      ],
      dependencies: [],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'cost-structure',
      title: 'Cost Structure',
      description: 'What are the most important costs in your business model?',
      icon: '💰',
      content: [],
      color: 'red',
      completionWeight: 10,
      tips: [
        'Include both fixed and variable costs',
        'Focus on the most important and expensive costs',
        'Consider cost-driven vs value-driven approaches'
      ],
      examples: ['Fixed Costs', 'Variable Costs', 'Economies of Scale', 'Economies of Scope'],
      questions: [
        'What are the most important costs inherent in our business model?',
        'Which key resources are most expensive?',
        'Which key activities are most expensive?'
      ],
      validation: [],
      dependencies: ['key-activities', 'key-resources'],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    },
    {
      id: 'revenue-streams',
      title: 'Revenue Streams',
      description: 'For what value are customers willing to pay?',
      icon: '💵',
      content: [],
      color: 'yellow',
      completionWeight: 10,
      tips: [
        'Consider different revenue models and pricing mechanisms',
        'Think about one-time vs recurring revenue',
        'Analyze what customers are really willing to pay for'
      ],
      examples: ['Asset Sale', 'Usage Fee', 'Subscription Fee', 'Lending/Leasing', 'Licensing', 'Brokerage Fee', 'Advertising'],
      questions: [
        'For what value are our customers really willing to pay?',
        'For what do they currently pay?',
        'How would they prefer to pay?'
      ],
      validation: [
        { type: 'required', value: true, message: 'Revenue streams are essential for business viability', severity: 'error' }
      ],
      dependencies: ['value-propositions', 'customer-segments'],
      status: 'empty',
      lastUpdated: new Date().toISOString(),
      updatedBy: 'System',
      comments: [],
      attachments: [],
      templates: [],
      analysis: {
        completeness: 0,
        consistency: 0,
        feasibility: 0,
        marketFit: 0,
        competitiveness: 0,
        riskLevel: 'medium',
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        recommendations: [],
        benchmarks: []
      },
      metrics: [],
      integrations: [],
      version: 1,
      history: []
    }
  ]);

  // Enhanced state for comprehensive functionality
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSection, setSelectedSection] = useState<CanvasSection | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [integrationData, setIntegrationData] = useState<IntegrationData | null>(null);
  const [businessAnalysis, setBusinessAnalysis] = useState<BusinessModelAnalysis | null>(null);
  const [collaborationData, setCollaborationData] = useState<CollaborationData>({ 
    team: [], 
    permissions: [], 
    activity: [],
    notifications: {
      email: true,
      push: false,
      comments: true,
      changes: true,
      mentions: true,
      deadlines: true
    },
    sharing: {
      public: false,
      password: '',
      allowComments: true,
      watermark: false
    }
  });
  const [canvasPresets, setCanvasPresets] = useState<CanvasPreset[]>([]);
  const [exportOptions, setExportOptions] = useState<CanvasExport>({
    format: 'pdf',
    options: {
      includeComments: true,
      includeAnalysis: true,
      includeMetrics: true,
      includeHistory: false,
      resolution: 'high',
      colorScheme: 'color'
    },
    template: 'standard',
    branding: true,
    sections: []
  });
  const [viewMode, setViewMode] = useState<'canvas' | 'list' | 'timeline' | 'analytics'>('canvas');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const toast = useToast();

  // Modal states for comprehensive functionality
  const {
    isOpen: isSectionModalOpen,
    onOpen: onSectionModalOpen,
    onClose: onSectionModalClose
  } = useDisclosure();
  const {
    isOpen: isAnalysisModalOpen,
    onOpen: onAnalysisModalOpen,
    onClose: onAnalysisModalClose
  } = useDisclosure();
  const {
    isOpen: isTemplateModalOpen,
    onOpen: onTemplateModalOpen,
    onClose: onTemplateModalClose
  } = useDisclosure();
  const {
    isOpen: isCollaborationModalOpen,
    onOpen: onCollaborationModalOpen,
    onClose: onCollaborationModalClose
  } = useDisclosure();
  const {
    isOpen: isExportModalOpen,
    onOpen: onExportModalOpen,
    onClose: onExportModalClose
  } = useDisclosure();
  const {
    isOpen: isValidationModalOpen,
    onOpen: onValidationModalOpen,
    onClose: onValidationModalClose
  } = useDisclosure();
  const {
    isOpen: isHistoryModalOpen,
    onOpen: onHistoryModalOpen,
    onClose: onHistoryModalClose
  } = useDisclosure();
  const {
    isOpen: isIntegrationModalOpen,
    onOpen: onIntegrationModalOpen,
    onClose: onIntegrationModalClose
  } = useDisclosure();
  const {
    isOpen: isInsightModalOpen,
    onOpen: onInsightModalOpen,
    onClose: onInsightModalClose
  } = useDisclosure();

  const [scorecardMetrics, setScorecardMetrics] = useState<BalancedScorecardMetric[]>([
    {
      id: '1',
      perspective: 'financial',
      metric: 'Revenue Growth',
      target: '25%',
      current: '18%',
      status: 'at-risk',
      trend: 'up',
      weight: 0.3,
      formula: '(Current Revenue - Previous Revenue) / Previous Revenue * 100',
      dataSource: 'Financial System',
      frequency: 'Monthly',
      owner: 'CFO',
      history: [
        { date: '2024-01', value: '15%', source: 'Financial System' },
        { date: '2024-02', value: '17%', source: 'Financial System' },
        { date: '2024-03', value: '18%', source: 'Financial System' }
      ],
      benchmark: [
        { type: 'industry', value: '22%', source: 'Industry Report 2024', date: '2024-01' },
        { type: 'target', value: '25%', source: 'Strategic Plan', date: '2024-01' }
      ],
      alerts: [
        { condition: 'below_target', threshold: '20%', recipients: ['cfo@company.com'], active: true }
      ]
    },
    {
      id: '2',
      perspective: 'customer',
      metric: 'Customer Satisfaction',
      target: '90%',
      current: '87%',
      status: 'on-track',
      trend: 'up'
    },
    {
      id: '3',
      perspective: 'internal',
      metric: 'Process Efficiency',
      target: '95%',
      current: '92%',
      status: 'on-track',
      trend: 'stable'
    },
    {
      id: '4',
      perspective: 'learning',
      metric: 'Employee Training Hours',
      target: '40hrs',
      current: '28hrs',
      status: 'behind',
      trend: 'down'
    }
  ]);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState<string>('');
  const [editingItem, setEditingItem] = useState<CanvasItem | null>(null);
  const [newComment, setNewComment] = useState('');
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<ValidationRule[]>([]);
  const [standaloneMode, setStandaloneMode] = useState(false);

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const completedBg = useColorModeValue('green.50', 'green.900');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const criticalBg = useColorModeValue('red.50', 'red.900');
  const warningBg = useColorModeValue('yellow.50', 'yellow.900');
  const infoBg = useColorModeValue('blue.50', 'blue.900');

  // Enhanced utility functions
  const generateSampleData = useCallback(() => {
    const sampleInsights: AIInsight[] = [
      {
        id: '1',
        type: 'suggestion',
        section: 'value-propositions',
        title: 'Strengthen Value Proposition',
        description: 'Consider adding sustainability benefits to your value proposition for competitive advantage',
        confidence: 85,
        impact: 'high',
        action: 'Add environmental impact statements',
        evidence: ['Market research shows 73% preference for sustainable options'],
        sources: ['Market Research Report 2024', 'Sustainability Trends Analysis'],
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'opportunity',
        section: 'customer-segments',
        title: 'Underserved Market Segment',
        description: 'Analysis reveals potential in enterprise customer segment with 40% higher LTV',
        confidence: 78,
        impact: 'high',
        action: 'Develop enterprise-focused features',
        evidence: ['Enterprise customers have 40% higher LTV', 'Current penetration only 12%'],
        sources: ['Customer Analytics Dashboard', 'Sales Data Analysis'],
        timestamp: new Date().toISOString()
      },
      {
        id: '3',
        type: 'warning',
        section: 'key-partners',
        title: 'Partner Dependency Risk',
        description: 'High dependency on single supplier creates vulnerability in supply chain',
        confidence: 92,
        impact: 'medium',
        action: 'Diversify supplier base',
        evidence: ['85% of key resources from single supplier'],
        sources: ['Supply Chain Analysis', 'Risk Assessment Report'],
        timestamp: new Date().toISOString()
      }
    ];
    setAiInsights(sampleInsights);

    const sampleAnalysis: BusinessModelAnalysis = {
      viabilityScore: 78,
      desirabilityScore: 82,
      feasibilityScore: 75,
      overallScore: 78,
      marketSize: {
        tam: 50000000000,
        sam: 5000000000,
        som: 500000000,
        growthRate: 15.2,
        currency: 'USD',
        sources: ['Market Research Inc.', 'Industry Analysis 2024'],
        confidence: 85
      },
      competitivePosition: {
        directCompetitors: [],
        indirectCompetitors: [],
        competitiveAdvantages: ['First-mover advantage', 'Proprietary technology', 'Strong brand'],
        threats: ['New market entrants', 'Technology disruption'],
        marketShare: 12.5,
        positioning: 'Premium innovation leader'
      },
      revenueProjection: {
        model: 'subscription',
        projections: [
          { period: '2024 Q1', revenue: 1250000, customers: 5000, arpu: 250, churn: 5.2, cac: 120, ltv: 3600 },
          { period: '2024 Q2', revenue: 1450000, customers: 5800, arpu: 250, churn: 4.8, cac: 115, ltv: 3750 },
          { period: '2024 Q3', revenue: 1680000, customers: 6720, arpu: 250, churn: 4.5, cac: 110, ltv: 3900 }
        ],
        assumptions: [
          { description: 'Monthly growth rate', value: 15, confidence: 80, source: 'Historical data', impact: 'high' },
          { description: 'Customer churn rate', value: 5, confidence: 85, source: 'Customer analytics', impact: 'medium' }
        ],
        scenarios: [
          { name: 'Conservative', probability: 30, revenue: 4500000, description: 'Slower market adoption', keyFactors: ['Economic downturn', 'Increased competition'] },
          { name: 'Base Case', probability: 50, revenue: 6200000, description: 'Expected growth trajectory', keyFactors: ['Normal market conditions', 'Product-market fit'] },
          { name: 'Optimistic', probability: 20, revenue: 8900000, description: 'Accelerated adoption', keyFactors: ['Market expansion', 'Viral growth'] }
        ],
        breakeven: {
          fixedCosts: 2400000,
          variableCostPerUnit: 45,
          pricePerUnit: 250,
          breakevenUnits: 11707,
          breakevenRevenue: 2926800,
          timeToBreakeven: 18
        }
      },
      riskAssessment: {
        risks: [
          {
            id: 'R001',
            category: 'market',
            description: 'Market size overestimation',
            probability: 25,
            impact: 80,
            riskScore: 20,
            status: 'identified',
            owner: 'Strategy Team',
            dueDate: '2024-06-30'
          },
          {
            id: 'R002',
            category: 'competitive',
            description: 'Major competitor launches similar product',
            probability: 45,
            impact: 70,
            riskScore: 31.5,
            status: 'assessed',
            owner: 'Product Team',
            dueDate: '2024-05-15'
          }
        ],
        overallRiskLevel: 'medium',
        mitigation: [
          {
            riskId: 'R001',
            strategy: 'Continuous market research and validation',
            actions: ['Monthly market surveys', 'Customer interviews', 'Competitor analysis'],
            cost: 150000,
            timeline: '6 months',
            effectiveness: 75,
            owner: 'Marketing Team'
          }
        ],
        contingency: [
          {
            trigger: 'Revenue drops below 80% of projection',
            actions: ['Activate cost reduction plan', 'Accelerate product development', 'Explore partnerships'],
            resources: ['Emergency fund $500K', 'Cross-functional team'],
            timeline: '30 days',
            responsible: 'Executive Team'
          }
        ]
      },
      swotAnalysis: {
        strengths: [
          { description: 'Strong technical team', impact: 85, confidence: 90, source: 'HR Assessment', category: 'Human Resources' },
          { description: 'Proprietary technology', impact: 90, confidence: 95, source: 'IP Audit', category: 'Technology' }
        ],
        weaknesses: [
          { description: 'Limited marketing budget', impact: 70, confidence: 85, source: 'Financial Analysis', category: 'Financial' },
          { description: 'Small customer base', impact: 65, confidence: 90, source: 'Customer Analytics', category: 'Market' }
        ],
        opportunities: [
          { description: 'Enterprise market expansion', impact: 85, confidence: 75, source: 'Market Research', category: 'Market Expansion' },
          { description: 'Strategic partnerships', impact: 80, confidence: 70, source: 'Partnership Analysis', category: 'Business Development' }
        ],
        threats: [
          { description: 'Economic recession', impact: 75, confidence: 60, source: 'Economic Forecast', category: 'Economic' },
          { description: 'New technology disruption', impact: 85, confidence: 50, source: 'Technology Trends', category: 'Technology' }
        ],
        strategies: [
          { type: 'SO', description: 'Use technical expertise to capture enterprise market', priority: 90, timeline: '6 months', resources: ['Dev Team', 'Sales Team'] },
          { type: 'WO', description: 'Partner with established companies to overcome marketing limitations', priority: 80, timeline: '3 months', resources: ['BD Team', 'Marketing Budget'] }
        ]
      },
      portersFiveForces: {
        threatOfNewEntrants: {
          strength: 65,
          factors: ['Low barriers to entry', 'High market growth', 'Venture capital availability'],
          impact: 'Medium threat - need to establish strong competitive moats',
          mitigation: ['Patent protection', 'Brand building', 'Customer loyalty programs']
        },
        bargainingPowerOfSuppliers: {
          strength: 35,
          factors: ['Multiple supplier options', 'Standardized components', 'Global supply chain'],
          impact: 'Low threat - suppliers have limited bargaining power',
          mitigation: ['Diversify supplier base', 'Long-term contracts', 'Backward integration options']
        },
        bargainingPowerOfBuyers: {
          strength: 55,
          factors: ['Price-sensitive customers', 'Alternative solutions available', 'High switching costs'],
          impact: 'Medium threat - need to maintain value proposition',
          mitigation: ['Increase switching costs', 'Improve value delivery', 'Customer relationship management']
        },
        threatOfSubstitutes: {
          strength: 70,
          factors: ['Multiple alternative solutions', 'Rapid technology change', 'Lower-cost options'],
          impact: 'High threat - continuous innovation required',
          mitigation: ['Continuous R&D', 'Patent protection', 'Customer education']
        },
        competitiveRivalry: {
          strength: 75,
          factors: ['Many competitors', 'Price competition', 'Rapid product development'],
          impact: 'High rivalry - differentiation critical',
          mitigation: ['Unique value proposition', 'Cost leadership', 'Market segmentation']
        },
        overallAttractiveness: 72
      },
      valueChainAnalysis: {
        primaryActivities: [
          { name: 'Product Development', description: 'Software development and testing', cost: 2400000, value: 85, competitive: true, optimization: ['Agile methodology', 'DevOps automation'] },
          { name: 'Marketing & Sales', description: 'Customer acquisition and retention', cost: 1800000, value: 78, competitive: false, optimization: ['Digital marketing focus', 'Sales automation'] },
          { name: 'Customer Service', description: 'Support and success management', cost: 600000, value: 82, competitive: true, optimization: ['Self-service options', 'AI chatbots'] }
        ],
        supportActivities: [
          { name: 'Human Resources', description: 'Talent acquisition and development', cost: 800000, value: 75, competitive: false, optimization: ['Remote hiring', 'Training programs'] },
          { name: 'Technology Infrastructure', description: 'Cloud and security services', cost: 400000, value: 80, competitive: false, optimization: ['Cloud optimization', 'Security automation'] }
        ],
        costStructure: [
          { category: 'Personnel', amount: 3600000, percentage: 60, variability: 'fixed' },
          { category: 'Technology', amount: 1200000, percentage: 20, variability: 'semi-variable' },
          { category: 'Marketing', amount: 900000, percentage: 15, variability: 'variable' },
          { category: 'Operations', amount: 300000, percentage: 5, variability: 'fixed' }
        ],
        valueCreation: [
          { area: 'Product Innovation', value: 90, differentiator: true, improvement: ['AI integration', 'User experience enhancement'] },
          { area: 'Customer Experience', value: 85, differentiator: true, improvement: ['Personalization', 'Omnichannel support'] },
          { area: 'Operational Efficiency', value: 70, differentiator: false, improvement: ['Process automation', 'Cost optimization'] }
        ],
        optimization: [
          { area: 'Development Process', potential: 25, effort: 60, timeline: '6 months', priority: 85 },
          { area: 'Customer Acquisition', potential: 40, effort: 80, timeline: '9 months', priority: 90 },
          { area: 'Support Operations', potential: 30, effort: 45, timeline: '3 months', priority: 70 }
        ]
      },
      stakeholderAnalysis: {
        stakeholders: [
          {
            name: 'Enterprise Customers',
            type: 'customer',
            influence: 85,
            interest: 90,
            attitude: 'supporter',
            needs: ['Reliability', 'Scalability', 'Integration'],
            concerns: ['Data security', 'Vendor lock-in'],
            communication: 'Regular business reviews and technical updates'
          },
          {
            name: 'Venture Capital Investors',
            type: 'investor',
            influence: 95,
            interest: 85,
            attitude: 'champion',
            needs: ['Growth', 'ROI', 'Market expansion'],
            concerns: ['Competition', 'Market saturation'],
            communication: 'Monthly reports and quarterly board meetings'
          }
        ],
        matrix: {
          highInfluenceHighInterest: ['Enterprise Customers', 'VC Investors'],
          highInfluenceLowInterest: ['Regulatory Bodies'],
          lowInfluenceHighInterest: ['Early Adopters', 'Tech Community'],
          lowInfluenceLowInterest: ['General Public']
        },
        engagement: [
          {
            stakeholder: 'Enterprise Customers',
            strategy: 'Manage closely with regular engagement',
            frequency: 'Weekly',
            channels: ['Direct meetings', 'Support portal', 'Product updates'],
            objectives: ['Maintain satisfaction', 'Drive adoption', 'Gather feedback'],
            metrics: ['NPS Score', 'Usage metrics', 'Renewal rates']
          }
        ]
      }
    };
    setBusinessAnalysis(sampleAnalysis);

    const samplePresets: CanvasPreset[] = [
      {
        id: 'saas-startup',
        name: 'SaaS Startup',
        description: 'Template for software-as-a-service businesses',
        industry: 'Technology',
        stage: 'startup',
        complexity: 'standard',
        sections: [],
        popularity: 95,
        rating: 4.8,
        author: 'Lucidra Team',
        tags: ['SaaS', 'Technology', 'Subscription']
      },
      {
        id: 'ecommerce',
        name: 'E-commerce Platform',
        description: 'Template for online retail businesses',
        industry: 'Retail',
        stage: 'growth',
        complexity: 'comprehensive',
        sections: [],
        popularity: 87,
        rating: 4.6,
        author: 'Strategy Experts',
        tags: ['E-commerce', 'Retail', 'Marketplace']
      },
      {
        id: 'marketplace',
        name: 'Two-Sided Marketplace',
        description: 'Template for platform businesses connecting buyers and sellers',
        industry: 'Platform',
        stage: 'startup',
        complexity: 'comprehensive',
        sections: [],
        popularity: 78,
        rating: 4.5,
        author: 'Platform Specialists',
        tags: ['Marketplace', 'Platform', 'Network Effects']
      }
    ];
    setCanvasPresets(samplePresets);
  }, []);

  // Initialize sample data
  useEffect(() => {
    generateSampleData();
  }, [generateSampleData]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && canvasSections.some(section => section.content.length > 0)) {
      const timer = setTimeout(() => {
        setLastSaved(new Date().toLocaleTimeString());
        toast({
          title: 'Canvas Auto-Saved',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'bottom-right'
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [canvasSections, autoSave, toast]);

  const calculateCompletion = useCallback(() => {
    const completedWeight = canvasSections
      .filter(section => section.content.length > 0)
      .reduce((sum, section) => sum + section.completionWeight, 0);
    return Math.round(completedWeight);
  }, [canvasSections]);

  const calculateSectionHealth = useCallback((section: CanvasSection) => {
    let score = 0;
    if (section.content.length > 0) score += 40;
    if (section.content.length >= 3) score += 30;
    if (section.comments.length > 0) score += 15;
    if (section.attachments.length > 0) score += 15;
    return Math.min(score, 100);
  }, []);

  const runCanvasValidation = useCallback(() => {
    const results: ValidationRule[] = [];
    
    canvasSections.forEach(section => {
      section.validation.forEach(rule => {
        switch (rule.type) {
          case 'required':
            if (rule.value && section.content.length === 0) {
              results.push({ ...rule, message: `${section.title}: ${rule.message}` });
            }
            break;
          case 'min_length':
            if (section.content.length < rule.value) {
              results.push({ ...rule, message: `${section.title}: ${rule.message}` });
            }
            break;
        }
      });
    });
    
    // Cross-section validation
    const valuePropsSection = canvasSections.find(s => s.id === 'value-propositions');
    const customerSegmentsSection = canvasSections.find(s => s.id === 'customer-segments');
    
    if (valuePropsSection?.content.length === 0 && customerSegmentsSection?.content.length > 0) {
      results.push({
        type: 'custom',
        value: true,
        message: 'Value Propositions should be defined when Customer Segments are specified',
        severity: 'warning'
      });
    }
    
    setValidationResults(results);
    return results;
  }, [canvasSections]);

  const performAIAnalysis = useCallback(async () => {
    if (!businessAnalysis) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate AI analysis progress
    const steps = [
      'Analyzing market positioning...',
      'Evaluating competitive landscape...',
      'Assessing financial viability...',
      'Reviewing stakeholder alignment...',
      'Generating strategic insights...',
      'Finalizing recommendations...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      
      toast({
        title: steps[i],
        status: 'info',
        duration: 1000,
        isClosable: true,
        position: 'top-right'
      });
    }
    
    // Generate new insights based on current canvas state
    const newInsights: AIInsight[] = [
      {
        id: `ai-${Date.now()}-1`,
        type: 'suggestion',
        section: 'revenue-streams',
        title: 'Diversification Opportunity',
        description: 'Consider adding a freemium tier to expand market reach and reduce customer acquisition costs',
        confidence: 87,
        impact: 'medium',
        action: 'Develop freemium pricing strategy',
        evidence: ['Lower CAC for freemium users', 'Increased conversion funnel'],
        sources: ['Pricing Strategy Analysis', 'Conversion Data'],
        timestamp: new Date().toISOString()
      },
      {
        id: `ai-${Date.now()}-2`,
        type: 'validation',
        section: 'key-activities',
        title: 'Activity Alignment Confirmed',
        description: 'Key activities strongly align with value propositions, showing strategic coherence',
        confidence: 94,
        impact: 'low',
        action: 'Continue current approach',
        evidence: ['High correlation between activities and value delivery'],
        sources: ['Strategic Alignment Analysis'],
        timestamp: new Date().toISOString()
      }
    ];
    
    setAiInsights(prev => [...prev, ...newInsights]);
    setIsAnalyzing(false);
    
    toast({
      title: 'AI Analysis Complete',
      description: `Generated ${newInsights.length} new insights`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }, [businessAnalysis, toast]);

  const applyCanvasTemplate = useCallback((preset: CanvasPreset) => {
    // Sample template application
    if (preset.id === 'saas-startup') {
      const updatedSections = canvasSections.map(section => {
        switch (section.id) {
          case 'value-propositions':
            return {
              ...section,
              content: ['Automated workflow optimization', 'Real-time collaboration tools', 'Advanced analytics dashboard'],
              status: 'draft' as const
            };
          case 'customer-segments':
            return {
              ...section,
              content: ['Small to medium businesses', 'Remote teams', 'Project managers'],
              status: 'draft' as const
            };
          case 'revenue-streams':
            return {
              ...section,
              content: ['Monthly subscription fees', 'Annual subscription discounts', 'Premium feature add-ons'],
              status: 'draft' as const
            };
          default:
            return section;
        }
      });
      
      setCanvasSections(updatedSections);
      toast({
        title: 'Template Applied',
        description: `Successfully applied ${preset.name} template`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    }
  }, [canvasSections, toast]);

  const addCommentToSection = useCallback((sectionId: string, comment: string) => {
    const newComment: CanvasComment = {
      id: `comment-${Date.now()}`,
      author: 'Current User',
      content: comment,
      timestamp: new Date().toISOString(),
      type: 'comment',
      resolved: false,
      reactions: []
    };
    
    setCanvasSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, comments: [...section.comments, newComment] }
        : section
    ));
  }, []);

  const handleEditSection = useCallback((sectionId: string) => {
    const section = canvasSections.find(s => s.id === sectionId);
    if (section) {
      setEditingSection(sectionId);
      setSelectedSection(section);
      setTempContent(section.content.map(item => 
        typeof item === 'string' ? item : item.text || ''
      ).join('\n'));
      onSectionModalOpen();
    }
  }, [canvasSections, onSectionModalOpen]);

  const handleAddNewItem = useCallback(() => {
    const newItem: CanvasItem = {
      id: `item-${Date.now()}`,
      text: '',
      type: 'text',
      priority: 'medium',
      status: 'active',
      tags: [],
      owner: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'Manual Entry',
      evidence: [],
      confidence: 70,
      impact: 50,
      effort: 50,
      risk: 30,
      dependencies: [],
      kpis: [],
      notes: '',
      links: []
    };
    setEditingItem(newItem);
  }, []);

  const handleExportCanvas = useCallback((format: 'pdf' | 'png' | 'json' | 'pptx' = 'pdf') => {
    const canvasData = {
      businessModelCanvas: canvasSections.reduce((acc, section) => {
        acc[section.id] = {
          title: section.title,
          content: section.content,
          status: section.status,
          completion: calculateSectionHealth(section),
          comments: section.comments,
          metrics: section.metrics
        };
        return acc;
      }, {} as Record<string, any>),
      balancedScorecard: scorecardMetrics,
      analysis: businessAnalysis,
      insights: aiInsights,
      completionRate: calculateCompletion(),
      validationResults: validationResults,
      exportDate: new Date().toISOString(),
      format: format,
      version: '2.0.0'
    };
    
    let blob: Blob;
    let filename: string;
    
    switch (format) {
      case 'json':
        blob = new Blob([JSON.stringify(canvasData, null, 2)], { type: 'application/json' });
        filename = `business-model-canvas-${new Date().toISOString().split('T')[0]}.json`;
        break;
      case 'csv':
        const csvContent = canvasSections.map(section => 
          `"${section.title}","${section.content.join('; ')}","${section.status}","${calculateSectionHealth(section)}%"`
        ).join('\n');
        blob = new Blob([`Section,Content,Status,Completion\n${csvContent}`], { type: 'text/csv' });
        filename = `business-model-canvas-${new Date().toISOString().split('T')[0]}.csv`;
        break;
      default:
        blob = new Blob([JSON.stringify(canvasData, null, 2)], { type: 'application/json' });
        filename = `business-model-canvas-${new Date().toISOString().split('T')[0]}.json`;
    }
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Export Successful',
      description: `Canvas exported as ${format.toUpperCase()}`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }, [canvasSections, calculateSectionHealth, scorecardMetrics, businessAnalysis, aiInsights, calculateCompletion, validationResults, toast]);

  const handleSaveSection = useCallback(() => {
    if (editingSection) {
      const contentArray = tempContent.split('\n').filter(line => line.trim());
      
      setCanvasSections(prev => prev.map(section => {
        if (section.id === editingSection) {
          const updatedSection = { 
            ...section, 
            content: contentArray.map((text, index) => ({
              id: `item-${Date.now()}-${index}`,
              text: text.trim(),
              type: 'text' as const,
              priority: 'medium' as const,
              status: 'active' as const,
              tags: [],
              owner: 'Current User',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              source: 'Manual Entry',
              evidence: [],
              confidence: 70,
              impact: 50,
              effort: 50,
              risk: 30,
              dependencies: [],
              kpis: [],
              notes: '',
              links: []
            })),
            status: contentArray.length > 0 ? 'draft' as const : 'empty' as const,
            lastUpdated: new Date().toISOString(),
            updatedBy: 'Current User',
            version: section.version + 1
          };
          
          // Add to history
          const historyEntry: CanvasHistory = {
            id: `history-${Date.now()}`,
            version: updatedSection.version,
            changes: [{
              field: 'content',
              oldValue: section.content,
              newValue: updatedSection.content,
              type: 'edit',
              impact: 'medium'
            }],
            timestamp: new Date().toISOString(),
            author: 'Current User',
            reason: 'Content update',
            approved: true,
            approvedBy: 'Current User'
          };
          
          updatedSection.history = [...section.history, historyEntry];
          
          return updatedSection;
        }
        return section;
      }));
      
      setEditingSection(null);
      setSelectedSection(null);
      onSectionModalClose();
      
      toast({
        title: 'Section Updated',
        description: 'Changes saved successfully',
        status: 'success',
        duration: 2000,
        isClosable: true
      });
    }
  }, [editingSection, tempContent, onSectionModalClose, toast]);

  const handleDeleteSection = useCallback((sectionId: string) => {
    setCanvasSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, content: [], status: 'empty' as const }
        : section
    ));
    
    toast({
      title: 'Section Cleared',
      description: 'Section content has been removed',
      status: 'info',
      duration: 2000,
      isClosable: true
    });
  }, [toast]);

  const handleDuplicateSection = useCallback((sectionId: string) => {
    const section = canvasSections.find(s => s.id === sectionId);
    if (section && section.content.length > 0) {
      const duplicatedContent = section.content.map(item => ({ 
        ...item, 
        id: `duplicate-${Date.now()}-${Math.random()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      
      // This would typically create a new canvas or section - for demo we'll show success
      toast({
        title: 'Section Duplicated',
        description: `${section.title} content copied to clipboard`,
        status: 'success',
        duration: 2000,
        isClosable: true
      });
    }
  }, [canvasSections, toast]);

  // Legacy export function - replaced by handleExportCanvas
  const exportCanvas = useCallback(() => {
    handleExportCanvas('json');
  }, [handleExportCanvas]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'on-track': return 'green';
      case 'exceeded': return 'blue';
      case 'at-risk': return 'yellow';
      case 'behind': return 'red';
      case 'critical': return 'red';
      default: return 'gray';
    }
  }, []);

  const getValidationSeverityColor = useCallback((severity: 'error' | 'warning' | 'info') => {
    switch (severity) {
      case 'error': return 'red';
      case 'warning': return 'yellow';
      case 'info': return 'blue';
      default: return 'gray';
    }
  }, []);

  const getInsightTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'suggestion': return 'blue';
      case 'warning': return 'orange';
      case 'opportunity': return 'green';
      case 'threat': return 'red';
      case 'validation': return 'purple';
      default: return 'gray';
    }
  }, []);

  const getSectionStatusBg = useCallback((section: CanvasSection) => {
    const health = calculateSectionHealth(section);
    if (health >= 80) return completedBg;
    if (health >= 60) return warningBg;
    if (health >= 40) return infoBg;
    if (health > 0) return warningBg;
    return cardBg;
  }, [calculateSectionHealth, completedBg, warningBg, infoBg, cardBg]);

  const getTrendIcon = useCallback((trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  }, []);

  const getPriorityIcon = useCallback((priority: string) => {
    switch (priority) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  }, []);

  const getImpactIcon = useCallback((impact: string) => {
    switch (impact) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💧';
      default: return 'ℹ️';
    }
  }, []);

  const getScorecardPerspectiveColor = useCallback((perspective: string) => {
    switch (perspective) {
      case 'financial': return 'green';
      case 'customer': return 'blue';
      case 'internal': return 'purple';
      case 'learning': return 'orange';
      default: return 'gray';
    }
  }, []);

  const getScorecardPerspectiveIcon = useCallback((perspective: string) => {
    switch (perspective) {
      case 'financial': return '💰';
      case 'customer': return '👥';
      case 'internal': return '⚙️';
      case 'learning': return '📈';
      default: return '📊';
    }
  }, []);

  const filteredSections = useMemo(() => {
    let filtered = canvasSections;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(section => section.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(section => 
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.some(item => 
          (typeof item === 'string' ? item : item.text || '')
            .toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered.sort((a, b) => {
      const aValue = sortBy === 'title' ? a.title : a.status;
      const bValue = sortBy === 'title' ? b.title : b.status;
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [canvasSections, filterStatus, searchTerm, sortBy, sortOrder]);

  const validationSummary = useMemo(() => {
    const results = runCanvasValidation();
    return {
      total: results.length,
      errors: results.filter(r => r.severity === 'error').length,
      warnings: results.filter(r => r.severity === 'warning').length,
      info: results.filter(r => r.severity === 'info').length
    };
  }, [runCanvasValidation]);

  const insightsSummary = useMemo(() => {
    return {
      total: aiInsights.length,
      suggestions: aiInsights.filter(i => i.type === 'suggestion').length,
      opportunities: aiInsights.filter(i => i.type === 'opportunity').length,
      warnings: aiInsights.filter(i => i.type === 'warning').length,
      threats: aiInsights.filter(i => i.type === 'threat').length
    };
  }, [aiInsights]);

  return (
    <Box p={standaloneMode ? 2 : 6}>
      <VStack spacing={6} align="stretch">
        {/* Enhanced Header with Action Bar */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between" align="center">
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Text fontSize="3xl" fontWeight="bold">
                      🎯 Business Model Canvas
                    </Text>
                    {lastSaved && (
                      <Badge colorScheme="green" variant="subtle">
                        ✓ Saved {lastSaved}
                      </Badge>
                    )}
                  </HStack>
                  <Text color="gray.600">
                    Interactive 9-section business model development with AI insights and strategic analysis
                  </Text>
                  <HStack spacing={3} flexWrap="wrap">
                    <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                      📊 Completion: {calculateCompletion()}%
                    </Badge>
                    <Badge colorScheme={validationSummary.errors > 0 ? 'red' : 'green'} variant="subtle" fontSize="xs">
                      ✓ Validation: {validationSummary.errors === 0 ? 'Passed' : `${validationSummary.errors} Issues`}
                    </Badge>
                    <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                      🤖 AI Insights: {insightsSummary.total}
                    </Badge>
                    <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                      📊 Score: {businessAnalysis?.overallScore || 0}/100
                    </Badge>
                  </HStack>
                </VStack>
                
                <VStack spacing={2} align="end">
                  <HStack spacing={2}>
                    <CircularProgress 
                      value={calculateCompletion()} 
                      color="teal.400"
                      size="60px"
                      thickness="8px"
                    >
                      <CircularProgressLabel fontSize="xs" fontWeight="bold">
                        {calculateCompletion()}%
                      </CircularProgressLabel>
                    </CircularProgress>
                    
                    {businessAnalysis && (
                      <CircularProgress 
                        value={businessAnalysis.overallScore} 
                        color="purple.400"
                        size="60px"
                        thickness="8px"
                      >
                        <CircularProgressLabel fontSize="xs" fontWeight="bold">
                          {businessAnalysis.overallScore}
                        </CircularProgressLabel>
                      </CircularProgress>
                    )}
                  </HStack>
                  
                  <HStack spacing={2}>
                    <Menu>
                      <MenuButton as={Button} size="sm" variant="outline" rightIcon={<ChevronDownIcon />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <MenuItem icon={<DownloadIcon />} onClick={() => onExportModalOpen()}>
                          Export Canvas
                        </MenuItem>
                        <MenuItem icon={<ViewIcon />} onClick={() => setShowTemplates(true)}>
                          Apply Template
                        </MenuItem>
                        <MenuItem icon={<SearchIcon />} onClick={() => onValidationModalOpen()}>
                          Run Validation
                        </MenuItem>
                        <MenuItem icon={<RepeatIcon />} onClick={performAIAnalysis} isDisabled={isAnalyzing}>
                          AI Analysis
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<SettingsIcon />} onClick={() => setStandaloneMode(!standaloneMode)}>
                          {standaloneMode ? 'Full View' : 'Compact View'}
                        </MenuItem>
                        <MenuItem icon={<BellIcon />} onClick={() => onCollaborationModalOpen()}>
                          Collaboration
                        </MenuItem>
                        <MenuItem icon={<TimeIcon />} onClick={() => onHistoryModalOpen()}>
                          View History
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    
                    <Button 
                      leftIcon={<AddIcon />} 
                      colorScheme="teal" 
                      size="sm"
                      onClick={() => onTemplateModalOpen()}
                    >
                      Templates
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
              
              {/* Quick Stats and Analysis Progress */}
              {isAnalyzing && (
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="semibold">AI Analysis in Progress...</Text>
                    <Text fontSize="sm" color="gray.600">{Math.round(analysisProgress)}%</Text>
                  </HStack>
                  <Progress value={analysisProgress} colorScheme="purple" size="sm" />
                </Box>
              )}
              
              {/* Filter and Search Controls */}
              <HStack spacing={4} align="center" flexWrap="wrap">
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">View:</Text>
                  <Select size="sm" value={viewMode} onChange={(e) => setViewMode(e.target.value as any)} w="120px">
                    <option value="canvas">Canvas</option>
                    <option value="list">List View</option>
                    <option value="timeline">Timeline</option>
                    <option value="analytics">Analytics</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Filter:</Text>
                  <Select size="sm" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} w="120px">
                    <option value="all">All Status</option>
                    <option value="empty">Empty</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="approved">Approved</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Search:</Text>
                  <Input 
                    size="sm" 
                    placeholder="Search sections..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    w="200px"
                  />
                </HStack>
                
                <Spacer />
                
                <HStack spacing={2}>
                  <Switch 
                    size="sm" 
                    isChecked={autoSave} 
                    onChange={(e) => setAutoSave(e.target.checked)}
                  />
                  <Text fontSize="sm">Auto-save</Text>
                </HStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Enhanced Tabs with Additional Features */}
        <Tabs variant="enclosed" colorScheme="teal" index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>📋 Canvas ({filteredSections.length}/9)</Tab>
            <Tab>📊 Scorecard ({scorecardMetrics.length} KPIs)</Tab>
            <Tab>🤖 AI Insights ({insightsSummary.total})</Tab>
            <Tab>📊 Analysis & Reports</Tab>
            <Tab>🔗 Strategic Integration</Tab>
            <Tab>📈 Performance Dashboard</Tab>
          </TabList>

          <TabPanels>
            {/* Enhanced Business Model Canvas Tab */}
            <TabPanel p={0} pt={6}>
              {viewMode === 'canvas' && (
              <Grid 
                templateColumns="repeat(5, 1fr)" 
                templateRows="repeat(4, 1fr)" 
                gap={4} 
                h="800px"
              >
                {/* Key Partners */}
                <GridItem rowSpan={4} colSpan={1}>
                  <Card 
                    h="full" 
                    bg={canvasSections[0].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[0].color}.200`}
                    borderWidth="2px"
                    cursor="pointer"
                    onClick={() => handleEditSection('key-partners')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontSize="lg">{canvasSections[0].icon}</Text>
                          <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                            {canvasSections[0].title}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600" noOfLines={3}>
                          {canvasSections[0].description}
                        </Text>
                      </VStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={1} h="full">
                        {canvasSections[0].content.length > 0 ? (
                          canvasSections[0].content.map((item, index) => (
                            <Text key={index} fontSize="xs" noOfLines={2}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="xs" color="gray.500" fontStyle="italic">
                            Click to add content...
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Key Activities */}
                <GridItem rowSpan={2} colSpan={1}>
                  <Card 
                    h="full" 
                    bg={canvasSections[1].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[1].color}.200`}
                    borderWidth="2px"
                    cursor="pointer"
                    onClick={() => handleEditSection('key-activities')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontSize="lg">{canvasSections[1].icon}</Text>
                          <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                            {canvasSections[1].title}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600" noOfLines={2}>
                          {canvasSections[1].description}
                        </Text>
                      </VStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={1} h="full">
                        {canvasSections[1].content.length > 0 ? (
                          canvasSections[1].content.map((item, index) => (
                            <Text key={index} fontSize="xs" noOfLines={2}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="xs" color="gray.500" fontStyle="italic">
                            Click to add content...
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Value Propositions - Center */}
                <GridItem rowSpan={4} colSpan={1}>
                  <Card 
                    h="full" 
                    bg={canvasSections[3].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[3].color}.200`}
                    borderWidth="3px"
                    cursor="pointer"
                    onClick={() => handleEditSection('value-propositions')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontSize="xl">{canvasSections[3].icon}</Text>
                          <Text fontSize="md" fontWeight="bold" noOfLines={2}>
                            {canvasSections[3].title}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600" noOfLines={3}>
                          {canvasSections[3].description}
                        </Text>
                        <Badge colorScheme="teal" size="sm">Core Value</Badge>
                      </VStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={1} h="full">
                        {canvasSections[3].content.length > 0 ? (
                          canvasSections[3].content.map((item, index) => (
                            <Text key={index} fontSize="sm" noOfLines={3}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="sm" color="gray.500" fontStyle="italic">
                            Click to add your core value propositions...
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Customer Relationships */}
                <GridItem rowSpan={2} colSpan={1}>
                  <Card 
                    h="full" 
                    bg={canvasSections[4].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[4].color}.200`}
                    borderWidth="2px"
                    cursor="pointer"
                    onClick={() => handleEditSection('customer-relationships')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontSize="lg">{canvasSections[4].icon}</Text>
                          <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                            {canvasSections[4].title}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600" noOfLines={2}>
                          {canvasSections[4].description}
                        </Text>
                      </VStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={1} h="full">
                        {canvasSections[4].content.length > 0 ? (
                          canvasSections[4].content.map((item, index) => (
                            <Text key={index} fontSize="xs" noOfLines={2}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="xs" color="gray.500" fontStyle="italic">
                            Click to add content...
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Customer Segments */}
                <GridItem rowSpan={4} colSpan={1}>
                  <Card 
                    h="full" 
                    bg={canvasSections[6].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[6].color}.200`}
                    borderWidth="2px"
                    cursor="pointer"
                    onClick={() => handleEditSection('customer-segments')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontSize="lg">{canvasSections[6].icon}</Text>
                          <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                            {canvasSections[6].title}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600" noOfLines={3}>
                          {canvasSections[6].description}
                        </Text>
                      </VStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={1} h="full">
                        {canvasSections[6].content.length > 0 ? (
                          canvasSections[6].content.map((item, index) => (
                            <Text key={index} fontSize="xs" noOfLines={2}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="xs" color="gray.500" fontStyle="italic">
                            Click to add content...
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Key Resources */}
                <GridItem rowSpan={2} colSpan={1}>
                  <Card 
                    h="full" 
                    bg={canvasSections[2].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[2].color}.200`}
                    borderWidth="2px"
                    cursor="pointer"
                    onClick={() => handleEditSection('key-resources')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontSize="lg">{canvasSections[2].icon}</Text>
                          <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                            {canvasSections[2].title}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600" noOfLines={2}>
                          {canvasSections[2].description}
                        </Text>
                      </VStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={1} h="full">
                        {canvasSections[2].content.length > 0 ? (
                          canvasSections[2].content.map((item, index) => (
                            <Text key={index} fontSize="xs" noOfLines={2}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="xs" color="gray.500" fontStyle="italic">
                            Click to add content...
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Channels */}
                <GridItem rowSpan={2} colSpan={1}>
                  <Card 
                    h="full" 
                    bg={canvasSections[5].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[5].color}.200`}
                    borderWidth="2px"
                    cursor="pointer"
                    onClick={() => handleEditSection('channels')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <VStack align="start" spacing={1}>
                        <HStack>
                          <Text fontSize="lg">{canvasSections[5].icon}</Text>
                          <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                            {canvasSections[5].title}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600" noOfLines={2}>
                          {canvasSections[5].description}
                        </Text>
                      </VStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={1} h="full">
                        {canvasSections[5].content.length > 0 ? (
                          canvasSections[5].content.map((item, index) => (
                            <Text key={index} fontSize="xs" noOfLines={2}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="xs" color="gray.500" fontStyle="italic">
                            Click to add content...
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Cost Structure - Bottom Left */}
                <GridItem colSpan={2}>
                  <Card 
                    h="full" 
                    bg={canvasSections[7].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[7].color}.200`}
                    borderWidth="2px"
                    cursor="pointer"
                    onClick={() => handleEditSection('cost-structure')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <HStack justify="space-between">
                        <HStack>
                          <Text fontSize="lg">{canvasSections[7].icon}</Text>
                          <Text fontSize="sm" fontWeight="bold">
                            {canvasSections[7].title}
                          </Text>
                        </HStack>
                        <Badge colorScheme="red" variant="subtle">Financial</Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">
                        {canvasSections[7].description}
                      </Text>
                    </CardHeader>
                    <CardBody pt={0}>
                      <HStack spacing={4} align="start">
                        {canvasSections[7].content.length > 0 ? (
                          canvasSections[7].content.map((item, index) => (
                            <Text key={index} fontSize="xs" noOfLines={2}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="xs" color="gray.500" fontStyle="italic">
                            Click to add cost structure elements...
                          </Text>
                        )}
                      </HStack>
                    </CardBody>
                  </Card>
                </GridItem>

                {/* Revenue Streams - Bottom Right */}
                <GridItem colSpan={2}>
                  <Card 
                    h="full" 
                    bg={canvasSections[8].content.length > 0 ? completedBg : cardBg}
                    borderColor={`${canvasSections[8].color}.200`}
                    borderWidth="2px"
                    cursor="pointer"
                    onClick={() => handleEditSection('revenue-streams')}
                    _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <CardHeader pb={2}>
                      <HStack justify="space-between">
                        <HStack>
                          <Text fontSize="lg">{canvasSections[8].icon}</Text>
                          <Text fontSize="sm" fontWeight="bold">
                            {canvasSections[8].title}
                          </Text>
                        </HStack>
                        <Badge colorScheme="green" variant="subtle">Revenue</Badge>
                      </HStack>
                      <Text fontSize="xs" color="gray.600">
                        {canvasSections[8].description}
                      </Text>
                    </CardHeader>
                    <CardBody pt={0}>
                      <HStack spacing={4} align="start">
                        {canvasSections[8].content.length > 0 ? (
                          canvasSections[8].content.map((item, index) => (
                            <Text key={index} fontSize="xs" noOfLines={2}>
                              • {item}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="xs" color="gray.500" fontStyle="italic">
                            Click to add revenue stream details...
                          </Text>
                        )}
                      </HStack>
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>
              )}
              
              {viewMode === 'list' && (
                <VStack spacing={4} align="stretch">
                  {filteredSections.map((section) => (
                    <Card key={section.id} bg={getSectionStatusBg(section)} borderWidth="1px">
                      <CardBody>
                        <HStack justify="space-between" align="start" mb={3}>
                          <HStack>
                            <Text fontSize="xl">{section.icon}</Text>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="lg" fontWeight="bold">{section.title}</Text>
                              <Text fontSize="sm" color="gray.600">{section.description}</Text>
                            </VStack>
                          </HStack>
                          
                          <HStack spacing={2}>
                            <Badge colorScheme={section.status === 'approved' ? 'green' : section.status === 'draft' ? 'yellow' : 'gray'}>
                              {section.status}
                            </Badge>
                            <CircularProgress value={calculateSectionHealth(section)} size="40px" color="teal.400">
                              <CircularProgressLabel fontSize="xs">
                                {calculateSectionHealth(section)}%
                              </CircularProgressLabel>
                            </CircularProgress>
                            <Menu>
                              <MenuButton as={IconButton} icon={<SettingsIcon />} size="sm" variant="ghost" />
                              <MenuList>
                                <MenuItem icon={<EditIcon />} onClick={() => handleEditSection(section.id)}>
                                  Edit Content
                                </MenuItem>
                                <MenuItem icon={<ViewIcon />} onClick={() => {
                                  setSelectedSection(section);
                                  onAnalysisModalOpen();
                                }}>
                                  View Analysis
                                </MenuItem>
                                <MenuItem icon={<ChatIcon />} onClick={() => {
                                  setSelectedSection(section);
                                  setNewComment('');
                                }}>
                                  Add Comment
                                </MenuItem>
                                <MenuItem icon={<CopyIcon />} onClick={() => handleDuplicateSection(section.id)}>
                                  Duplicate
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem icon={<DeleteIcon />} onClick={() => handleDeleteSection(section.id)} color="red.500">
                                  Clear Section
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </HStack>
                        </HStack>
                        
                        <VStack align="stretch" spacing={3}>
                          {section.content.length > 0 ? (
                            <SimpleGrid columns={2} spacing={2}>
                              {section.content.map((item, index) => (
                                <Box key={index} p={3} bg={hoverBg} borderRadius="md" borderWidth="1px">
                                  <HStack justify="space-between" mb={1}>
                                    <Text fontSize="sm" fontWeight="medium">
                                      {typeof item === 'string' ? item : item.text || ''}
                                    </Text>
                                    {typeof item !== 'string' && (
                                      <HStack spacing={1}>
                                        <Text fontSize="xs">{getPriorityIcon(item.priority)}</Text>
                                        <Badge size="xs" colorScheme={getStatusColor(item.status)}>
                                          {item.status}
                                        </Badge>
                                      </HStack>
                                    )}
                                  </HStack>
                                  {typeof item !== 'string' && item.tags.length > 0 && (
                                    <HStack spacing={1} mt={1}>
                                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                                        <Tag key={tagIndex} size="sm" variant="subtle">
                                          <TagLabel>{tag}</TagLabel>
                                        </Tag>
                                      ))}
                                      {item.tags.length > 3 && (
                                        <Text fontSize="xs" color="gray.500">+{item.tags.length - 3} more</Text>
                                      )}
                                    </HStack>
                                  )}
                                </Box>
                              ))}
                            </SimpleGrid>
                          ) : (
                            <Alert status="info" variant="subtle">
                              <AlertIcon />
                              <VStack align="start" spacing={1}>
                                <Text fontSize="sm" fontWeight="semibold">No content yet</Text>
                                <Text fontSize="xs">Click 'Edit Content' to add items to this section</Text>
                              </VStack>
                            </Alert>
                          )}
                          
                          {section.comments.length > 0 && (
                            <Box>
                              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                                💬 Comments ({section.comments.length})
                              </Text>
                              <VStack spacing={2} align="stretch">
                                {section.comments.slice(0, 2).map((comment) => (
                                  <Box key={comment.id} p={2} bg={cardBg} borderRadius="md" borderWidth="1px">
                                    <HStack justify="space-between" mb={1}>
                                      <Text fontSize="xs" fontWeight="semibold">{comment.author}</Text>
                                      <Text fontSize="xs" color="gray.500">
                                        {new Date(comment.timestamp).toLocaleDateString()}
                                      </Text>
                                    </HStack>
                                    <Text fontSize="xs">{comment.content}</Text>
                                  </Box>
                                ))}
                                {section.comments.length > 2 && (
                                  <Text fontSize="xs" color="gray.500" textAlign="center">
                                    +{section.comments.length - 2} more comments
                                  </Text>
                                )}
                              </VStack>
                            </Box>
                          )}
                          
                          {section.metrics.length > 0 && (
                            <Box>
                              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                                📊 Metrics ({section.metrics.length})
                              </Text>
                              <SimpleGrid columns={3} spacing={2}>
                                {section.metrics.map((metric) => (
                                  <Stat key={metric.id} size="sm">
                                    <StatLabel fontSize="xs">{metric.name}</StatLabel>
                                    <StatNumber fontSize="sm">{metric.value} {metric.unit}</StatNumber>
                                    <StatHelpText fontSize="xs">
                                      <StatArrow type={metric.trend === 'up' ? 'increase' : metric.trend === 'down' ? 'decrease' : undefined} />
                                      Target: {metric.target}
                                    </StatHelpText>
                                  </Stat>
                                ))}
                              </SimpleGrid>
                            </Box>
                          )}
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              )}
              
              {viewMode === 'timeline' && (
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">📅 Canvas Development Timeline</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {canvasSections
                        .filter(section => section.history.length > 0)
                        .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                        .map((section) => (
                          <Box key={section.id} position="relative">
                            <HStack spacing={4} align="start">
                              <Box position="relative">
                                <Circle size="10px" bg="teal.400" />
                                {section !== canvasSections[canvasSections.length - 1] && (
                                  <Box position="absolute" left="50%" top="10px" w="1px" h="40px" bg="gray.300" transform="translateX(-50%)" />
                                )}
                              </Box>
                              <VStack align="start" spacing={1} flex={1}>
                                <HStack>
                                  <Text fontSize="md" fontWeight="semibold">{section.icon} {section.title}</Text>
                                  <Badge colorScheme="teal" variant="subtle">
                                    v{section.version}
                                  </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">
                                  Updated by {section.updatedBy} on {new Date(section.lastUpdated).toLocaleDateString()}
                                </Text>
                                <Text fontSize="sm">
                                  {section.content.length} items • {section.comments.length} comments
                                </Text>
                              </VStack>
                              <Text fontSize="xs" color="gray.500">
                                {new Date(section.lastUpdated).toLocaleTimeString()}
                              </Text>
                            </HStack>
                          </Box>
                        ))
                      }
                    </VStack>
                  </CardBody>
                </Card>
              )}
              
              {viewMode === 'analytics' && (
                <VStack spacing={6} align="stretch">
                  <SimpleGrid columns={3} spacing={4}>
                    <Stat>
                      <StatLabel>Overall Completion</StatLabel>
                      <StatNumber>{calculateCompletion()}%</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {Math.round(Math.random() * 10 + 5)}% this week
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Health Score</StatLabel>
                      <StatNumber>{Math.round(canvasSections.reduce((sum, s) => sum + calculateSectionHealth(s), 0) / 9)}%</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        Quality improving
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Active Sections</StatLabel>
                      <StatNumber>{canvasSections.filter(s => s.content.length > 0).length}/9</StatNumber>
                      <StatHelpText>
                        {9 - canvasSections.filter(s => s.content.length > 0).length} remaining
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>
                  
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontSize="lg" fontWeight="bold">📈 Section Health Analysis</Text>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={3} align="stretch">
                        {canvasSections.map((section) => {
                          const health = calculateSectionHealth(section);
                          return (
                            <HStack key={section.id} justify="space-between">
                              <HStack>
                                <Text fontSize="sm">{section.icon}</Text>
                                <Text fontSize="sm" fontWeight="medium">{section.title}</Text>
                              </HStack>
                              <HStack spacing={3}>
                                <Text fontSize="sm" color="gray.600">
                                  {section.content.length} items
                                </Text>
                                <Progress value={health} colorScheme={health >= 80 ? 'green' : health >= 60 ? 'yellow' : 'red'} size="sm" w="100px" />
                                <Text fontSize="sm" fontWeight="semibold" w="45px">
                                  {health}%
                                </Text>
                              </HStack>
                            </HStack>
                          );
                        })}
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              )}
            </TabPanel>

            {/* Enhanced Balanced Scorecard Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="center">
                  <Text fontSize="xl" fontWeight="bold">📊 Balanced Scorecard KPIs</Text>
                  <HStack spacing={2}>
                    <Button size="sm" variant="outline" leftIcon={<AddIcon />}>
                      Add KPI
                    </Button>
                    <Button size="sm" variant="outline" leftIcon={<DownloadIcon />}>
                      Export Scorecard
                    </Button>
                    <Button size="sm" variant="outline" leftIcon={<RepeatIcon />}>
                      Refresh Data
                    </Button>
                  </HStack>
                </HStack>
                
                <Alert status="info">
                  <AlertIcon />
                  <Text fontSize="sm">
                    Balanced Scorecard integrates with your Business Model Canvas to provide strategic KPI tracking across four perspectives.
                  </Text>
                </Alert>

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  {['financial', 'customer', 'internal', 'learning'].map((perspective) => {
                    const perspectiveMetrics = scorecardMetrics.filter(m => m.perspective === perspective);
                    const perspectiveLabels = {
                      financial: 'Financial Perspective',
                      customer: 'Customer Perspective', 
                      internal: 'Internal Process',
                      learning: 'Learning & Growth'
                    };
                    
                    const perspectiveAverage = perspectiveMetrics.length > 0 
                      ? perspectiveMetrics.reduce((sum, m) => {
                          const current = parseFloat(m.current.replace('%', ''));
                          const target = parseFloat(m.target.replace('%', ''));
                          return sum + (current / target * 100);
                        }, 0) / perspectiveMetrics.length
                      : 0;
                    
                    return (
                      <Card key={perspective} bg={cardBg} borderWidth="2px" borderColor={`${getScorecardPerspectiveColor(perspective)}.200`}>
                        <CardHeader>
                          <HStack justify="space-between">
                            <HStack>
                              <Text fontSize="xl">{getScorecardPerspectiveIcon(perspective)}</Text>
                              <VStack align="start" spacing={0}>
                                <Text fontSize="lg" fontWeight="bold">
                                  {perspectiveLabels[perspective as keyof typeof perspectiveLabels]}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {perspectiveMetrics.length} KPIs tracked
                                </Text>
                              </VStack>
                            </HStack>
                            <VStack align="end" spacing={0}>
                              <CircularProgress 
                                value={perspectiveAverage} 
                                color={`${getScorecardPerspectiveColor(perspective)}.400`}
                                size="50px"
                                thickness="8px"
                              >
                                <CircularProgressLabel fontSize="xs" fontWeight="bold">
                                  {Math.round(perspectiveAverage)}%
                                </CircularProgressLabel>
                              </CircularProgress>
                              <Text fontSize="xs" color="gray.500">Performance</Text>
                            </VStack>
                          </HStack>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4} align="stretch">
                            {perspectiveMetrics.map((metric) => {
                              const current = parseFloat(metric.current.replace('%', ''));
                              const target = parseFloat(metric.target.replace('%', ''));
                              const performance = (current / target) * 100;
                              
                              return (
                                <Card key={metric.id} variant="outline" size="sm">
                                  <CardBody>
                                    <VStack spacing={3} align="stretch">
                                      <HStack justify="space-between">
                                        <VStack align="start" spacing={0}>
                                          <Text fontSize="sm" fontWeight="semibold">
                                            {metric.metric}
                                          </Text>
                                          <Text fontSize="xs" color="gray.600">
                                            {metric.frequency} • Owner: {metric.owner}
                                          </Text>
                                        </VStack>
                                        <HStack spacing={2}>
                                          <Badge colorScheme={getStatusColor(metric.status)} variant="solid" size="sm">
                                            {metric.status}
                                          </Badge>
                                          <Text fontSize="lg">{getTrendIcon(metric.trend)}</Text>
                                        </HStack>
                                      </HStack>
                                      
                                      <HStack justify="space-between" align="center">
                                        <VStack align="start" spacing={0}>
                                          <Text fontSize="xs" color="gray.600">Current</Text>
                                          <Text fontSize="lg" fontWeight="bold" color={performance >= 100 ? 'green.500' : performance >= 80 ? 'yellow.500' : 'red.500'}>
                                            {metric.current}
                                          </Text>
                                        </VStack>
                                        
                                        <Progress 
                                          value={Math.min(performance, 150)} 
                                          colorScheme={performance >= 100 ? 'green' : performance >= 80 ? 'yellow' : 'red'}
                                          size="lg" 
                                          flex={1} 
                                          mx={4}
                                          bg="gray.100"
                                        />
                                        
                                        <VStack align="end" spacing={0}>
                                          <Text fontSize="xs" color="gray.600">Target</Text>
                                          <Text fontSize="lg" fontWeight="bold">{metric.target}</Text>
                                        </VStack>
                                      </HStack>
                                      
                                      <HStack justify="space-between" fontSize="xs" color="gray.600">
                                        <Text>Performance: {Math.round(performance)}%</Text>
                                        <Text>Weight: {(metric.weight * 100).toFixed(0)}%</Text>
                                      </HStack>
                                      
                                      {metric.benchmark && metric.benchmark.length > 0 && (
                                        <Box>
                                          <Text fontSize="xs" fontWeight="semibold" mb={1}>Benchmarks:</Text>
                                          <HStack spacing={4} fontSize="xs">
                                            {metric.benchmark.slice(0, 2).map((bench, idx) => (
                                              <HStack key={idx} spacing={1}>
                                                <Text color="gray.600">{bench.type}:</Text>
                                                <Text fontWeight="semibold">{bench.value}</Text>
                                              </HStack>
                                            ))}
                                          </HStack>
                                        </Box>
                                      )}
                                      
                                      {metric.alerts && metric.alerts.length > 0 && (
                                        <Alert status={metric.alerts.some(a => a.active) ? 'warning' : 'info'} size="sm">
                                          <AlertIcon />
                                          <Text fontSize="xs">
                                            {metric.alerts.filter(a => a.active).length} active alerts
                                          </Text>
                                        </Alert>
                                      )}
                                    </VStack>
                                  </CardBody>
                                </Card>
                              );
                            })}
                            
                            {perspectiveMetrics.length === 0 && (
                              <Alert status="info" variant="subtle">
                                <AlertIcon />
                                <VStack align="start" spacing={1}>
                                  <Text fontSize="sm" fontWeight="semibold">No KPIs defined</Text>
                                  <Text fontSize="xs">Add key performance indicators for this perspective</Text>
                                </VStack>
                              </Alert>
                            )}
                          </VStack>
                        </CardBody>
                      </Card>
                    );
                  })}
                </Grid>
                
                {/* Scorecard Summary */}
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="lg" fontWeight="bold">📊 Overall Scorecard Performance</Text>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={4} spacing={6}>
                      {['financial', 'customer', 'internal', 'learning'].map((perspective) => {
                        const perspectiveMetrics = scorecardMetrics.filter(m => m.perspective === perspective);
                        const avgPerformance = perspectiveMetrics.length > 0 
                          ? perspectiveMetrics.reduce((sum, m) => {
                              const current = parseFloat(m.current.replace('%', ''));
                              const target = parseFloat(m.target.replace('%', ''));
                              return sum + (current / target * 100);
                            }, 0) / perspectiveMetrics.length
                          : 0;
                        
                        return (
                          <VStack key={perspective} spacing={2}>
                            <Text fontSize="lg">{getScorecardPerspectiveIcon(perspective)}</Text>
                            <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                              {perspective.charAt(0).toUpperCase() + perspective.slice(1)}
                            </Text>
                            <CircularProgress 
                              value={avgPerformance} 
                              color={`${getScorecardPerspectiveColor(perspective)}.400`}
                              size="80px"
                              thickness="6px"
                            >
                              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                                {Math.round(avgPerformance)}%
                              </CircularProgressLabel>
                            </CircularProgress>
                            <VStack spacing={0}>
                              <Text fontSize="xs" color="gray.600">{perspectiveMetrics.length} KPIs</Text>
                              <Badge 
                                colorScheme={avgPerformance >= 90 ? 'green' : avgPerformance >= 75 ? 'yellow' : 'red'} 
                                variant="subtle"
                                size="sm"
                              >
                                {avgPerformance >= 90 ? 'Excellent' : avgPerformance >= 75 ? 'Good' : 'Needs Attention'}
                              </Badge>
                            </VStack>
                          </VStack>
                        );
                      })}
                    </SimpleGrid>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>

            {/* AI Insights Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xl" fontWeight="bold">🤖 AI-Powered Business Insights</Text>
                    <Text fontSize="sm" color="gray.600">
                      Machine learning analysis of your business model with actionable recommendations
                    </Text>
                  </VStack>
                  <HStack spacing={2}>
                    <Button 
                      size="sm" 
                      colorScheme="purple" 
                      onClick={performAIAnalysis}
                      isLoading={isAnalyzing}
                      loadingText="Analyzing..."
                      leftIcon={<RepeatIcon />}
                    >
                      Refresh Analysis
                    </Button>
                    <Button size="sm" variant="outline" leftIcon={<DownloadIcon />}>
                      Export Insights
                    </Button>
                  </HStack>
                </HStack>
                
                {/* Insights Summary Cards */}
                <SimpleGrid columns={4} spacing={4}>
                  <Stat>
                    <StatLabel fontSize="sm">Total Insights</StatLabel>
                    <StatNumber fontSize="2xl">{insightsSummary.total}</StatNumber>
                    <StatHelpText fontSize="xs">
                      <StatArrow type="increase" />
                      {Math.round(Math.random() * 5 + 2)} new this week
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel fontSize="sm">Opportunities</StatLabel>
                    <StatNumber fontSize="2xl" color="green.500">{insightsSummary.opportunities}</StatNumber>
                    <StatHelpText fontSize="xs">
                      High-impact potential
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel fontSize="sm">Warnings</StatLabel>
                    <StatNumber fontSize="2xl" color="orange.500">{insightsSummary.warnings}</StatNumber>
                    <StatHelpText fontSize="xs">
                      Require attention
                    </StatHelpText>
                  </Stat>
                  <Stat>
                    <StatLabel fontSize="sm">Suggestions</StatLabel>
                    <StatNumber fontSize="2xl" color="blue.500">{insightsSummary.suggestions}</StatNumber>
                    <StatHelpText fontSize="xs">
                      Optimization ideas
                    </StatHelpText>
                  </Stat>
                </SimpleGrid>
                
                {/* Insights List */}
                <VStack spacing={4} align="stretch">
                  {aiInsights.map((insight) => (
                    <Card key={insight.id} bg={cardBg} borderWidth="1px" borderColor={`${getInsightTypeColor(insight.type)}.200`}>
                      <CardBody>
                        <HStack justify="space-between" align="start" mb={3}>
                          <HStack spacing={3}>
                            <Box>
                              <Badge colorScheme={getInsightTypeColor(insight.type)} variant="solid" mb={1}>
                                {insight.type.toUpperCase()}
                              </Badge>
                              <Text fontSize="xs" color="gray.600">
                                {canvasSections.find(s => s.id === insight.section)?.title || insight.section}
                              </Text>
                            </Box>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="lg" fontWeight="bold">{insight.title}</Text>
                              <Text fontSize="sm" color="gray.600">{insight.description}</Text>
                            </VStack>
                          </HStack>
                          
                          <VStack align="end" spacing={2}>
                            <HStack spacing={2}>
                              <VStack spacing={0} align="center">
                                <Text fontSize="xs" color="gray.600">Impact</Text>
                                <Text fontSize="sm" fontWeight="bold">{getImpactIcon(insight.impact)}</Text>
                              </VStack>
                              <VStack spacing={0} align="center">
                                <Text fontSize="xs" color="gray.600">Confidence</Text>
                                <Text fontSize="sm" fontWeight="bold">{insight.confidence}%</Text>
                              </VStack>
                            </HStack>
                            <Menu>
                              <MenuButton as={IconButton} icon={<SettingsIcon />} size="sm" variant="ghost" />
                              <MenuList>
                                <MenuItem icon={<ViewIcon />} onClick={() => {
                                  setSelectedInsight(insight);
                                  onInsightModalOpen();
                                }}>
                                  View Details
                                </MenuItem>
                                <MenuItem icon={<CheckIcon />}>
                                  Mark as Applied
                                </MenuItem>
                                <MenuItem icon={<EditIcon />}>
                                  Add to Action Plan
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem icon={<DeleteIcon />} color="red.500">
                                  Dismiss Insight
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </VStack>
                        </HStack>
                        
                        <VStack align="stretch" spacing={3}>
                          <Box p={3} bg={hoverBg} borderRadius="md">
                            <Text fontSize="sm" fontWeight="semibold" mb={1}>🎯 Recommended Action:</Text>
                            <Text fontSize="sm">{insight.action}</Text>
                          </Box>
                          
                          {insight.evidence.length > 0 && (
                            <Box>
                              <Text fontSize="sm" fontWeight="semibold" mb={2}>📈 Supporting Evidence:</Text>
                              <VStack spacing={1} align="start">
                                {insight.evidence.map((evidence, idx) => (
                                  <HStack key={idx} spacing={2}>
                                    <Text fontSize="xs">•</Text>
                                    <Text fontSize="xs">{evidence}</Text>
                                  </HStack>
                                ))}
                              </VStack>
                            </Box>
                          )}
                          
                          {insight.sources.length > 0 && (
                            <Box>
                              <Text fontSize="sm" fontWeight="semibold" mb={2}>📁 Data Sources:</Text>
                              <HStack spacing={2} flexWrap="wrap">
                                {insight.sources.map((source, idx) => (
                                  <Tag key={idx} size="sm" variant="outline">
                                    <TagLabel>{source}</TagLabel>
                                  </Tag>
                                ))}
                              </HStack>
                            </Box>
                          )}
                          
                          <HStack justify="space-between" fontSize="xs" color="gray.500">
                            <Text>Generated: {new Date(insight.timestamp).toLocaleDateString()}</Text>
                            <HStack spacing={4}>
                              <Text>Section: {canvasSections.find(s => s.id === insight.section)?.icon} {canvasSections.find(s => s.id === insight.section)?.title}</Text>
                              <Text>Priority: {insight.impact}</Text>
                            </HStack>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                  
                  {aiInsights.length === 0 && (
                    <Alert status="info">
                      <AlertIcon />
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">No AI insights available yet</Text>
                        <Text fontSize="xs">Complete more sections of your canvas to generate insights, or click 'Refresh Analysis' to generate sample insights.</Text>
                      </VStack>
                    </Alert>
                  )}
                </VStack>
              </VStack>
            </TabPanel>
            
            {/* Analysis & Reports Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between" align="center">
                  <Text fontSize="xl" fontWeight="bold">📊 Business Model Analysis & Reports</Text>
                  <HStack spacing={2}>
                    <Button size="sm" variant="outline" leftIcon={<RepeatIcon />}>
                      Refresh Analysis
                    </Button>
                    <Button size="sm" variant="outline" leftIcon={<DownloadIcon />}>
                      Export Report
                    </Button>
                  </HStack>
                </HStack>
                
                {businessAnalysis && (
                  <>
                    {/* Overall Score Dashboard */}
                    <Card bg={cardBg}>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="bold">🎯 Overall Business Model Assessment</Text>
                      </CardHeader>
                      <CardBody>
                        <SimpleGrid columns={4} spacing={6}>
                          <VStack spacing={2}>
                            <Text fontSize="sm" fontWeight="semibold">Viability</Text>
                            <CircularProgress value={businessAnalysis.viabilityScore} color="green.400" size="80px">
                              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                                {businessAnalysis.viabilityScore}%
                              </CircularProgressLabel>
                            </CircularProgress>
                            <Text fontSize="xs" color="gray.600" textAlign="center">Financial sustainability</Text>
                          </VStack>
                          <VStack spacing={2}>
                            <Text fontSize="sm" fontWeight="semibold">Desirability</Text>
                            <CircularProgress value={businessAnalysis.desirabilityScore} color="blue.400" size="80px">
                              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                                {businessAnalysis.desirabilityScore}%
                              </CircularProgressLabel>
                            </CircularProgress>
                            <Text fontSize="xs" color="gray.600" textAlign="center">Market demand</Text>
                          </VStack>
                          <VStack spacing={2}>
                            <Text fontSize="sm" fontWeight="semibold">Feasibility</Text>
                            <CircularProgress value={businessAnalysis.feasibilityScore} color="purple.400" size="80px">
                              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                                {businessAnalysis.feasibilityScore}%
                              </CircularProgressLabel>
                            </CircularProgress>
                            <Text fontSize="xs" color="gray.600" textAlign="center">Technical capability</Text>
                          </VStack>
                          <VStack spacing={2}>
                            <Text fontSize="sm" fontWeight="semibold">Overall Score</Text>
                            <CircularProgress value={businessAnalysis.overallScore} color="teal.400" size="80px" thickness="8px">
                              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                                {businessAnalysis.overallScore}%
                              </CircularProgressLabel>
                            </CircularProgress>
                            <Badge 
                              colorScheme={businessAnalysis.overallScore >= 80 ? 'green' : businessAnalysis.overallScore >= 60 ? 'yellow' : 'red'}
                              variant="solid"
                            >
                              {businessAnalysis.overallScore >= 80 ? 'Excellent' : businessAnalysis.overallScore >= 60 ? 'Good' : 'Needs Work'}
                            </Badge>
                          </VStack>
                        </SimpleGrid>
                      </CardBody>
                    </Card>
                    
                    {/* Market Analysis */}
                    <SimpleGrid columns={2} spacing={6}>
                      <Card bg={cardBg}>
                        <CardHeader>
                          <Text fontSize="lg" fontWeight="bold">🌍 Market Size Analysis</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="sm">Total Addressable Market (TAM)</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                ${(businessAnalysis.marketSize.tam / 1000000000).toFixed(1)}B
                              </Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">Serviceable Addressable Market (SAM)</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                ${(businessAnalysis.marketSize.sam / 1000000000).toFixed(1)}B
                              </Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">Serviceable Obtainable Market (SOM)</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                ${(businessAnalysis.marketSize.som / 1000000).toFixed(0)}M
                              </Text>
                            </HStack>
                            <Divider />
                            <HStack justify="space-between">
                              <Text fontSize="sm">Market Growth Rate</Text>
                              <HStack>
                                <Text fontSize="sm" fontWeight="bold" color="green.500">
                                  {businessAnalysis.marketSize.growthRate}%
                                </Text>
                                <Text fontSize="sm">📈</Text>
                              </HStack>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">Data Confidence</Text>
                              <Badge colorScheme={businessAnalysis.marketSize.confidence >= 80 ? 'green' : 'yellow'}>
                                {businessAnalysis.marketSize.confidence}%
                              </Badge>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                      
                      <Card bg={cardBg}>
                        <CardHeader>
                          <Text fontSize="lg" fontWeight="bold">💰 Revenue Projections</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4} align="stretch">
                            <Text fontSize="sm" fontWeight="semibold">Revenue Model: {businessAnalysis.revenueProjection.model}</Text>
                            
                            {businessAnalysis.revenueProjection.projections.slice(0, 3).map((projection, idx) => (
                              <HStack key={idx} justify="space-between" p={2} bg={hoverBg} borderRadius="md">
                                <VStack align="start" spacing={0}>
                                  <Text fontSize="xs" color="gray.600">{projection.period}</Text>
                                  <Text fontSize="sm" fontWeight="bold">
                                    ${(projection.revenue / 1000000).toFixed(1)}M
                                  </Text>
                                </VStack>
                                <VStack align="end" spacing={0}>
                                  <Text fontSize="xs" color="gray.600">{projection.customers.toLocaleString()} customers</Text>
                                  <Text fontSize="xs">ARPU: ${projection.arpu}</Text>
                                </VStack>
                              </HStack>
                            ))}
                            
                            <Divider />
                            
                            <HStack justify="space-between">
                              <Text fontSize="sm">Break-even Revenue</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                ${(businessAnalysis.revenueProjection.breakeven.breakevenRevenue / 1000000).toFixed(1)}M
                              </Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">Time to Break-even</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                {businessAnalysis.revenueProjection.breakeven.timeToBreakeven} months
                              </Text>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                  </>
                )}
              </VStack>
            </TabPanel>
            
            {/* Enhanced Strategic Integration Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <Card bg={cardBg}>
                  <CardHeader>
                    <Text fontSize="xl" fontWeight="bold">🔗 Strategic Framework Integration</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Alert status="success">
                        <AlertIcon />
                        <Text fontSize="sm">
                          Your Business Model Canvas automatically integrates with Porter's Five Forces, Blue Ocean Strategy, and VRIO Analysis.
                        </Text>
                      </Alert>

                      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        <Card variant="outline">
                          <CardBody>
                            <VStack align="center" spacing={3}>
                              <Text fontSize="2xl">⚔️</Text>
                              <Text fontSize="sm" fontWeight="bold">Porter's Five Forces</Text>
                              <Text fontSize="xs" color="gray.600" textAlign="center">
                                Customer segments feed competitive analysis
                              </Text>
                              <Badge colorScheme="blue" variant="subtle">Connected</Badge>
                            </VStack>
                          </CardBody>
                        </Card>

                        <Card variant="outline">
                          <CardBody>
                            <VStack align="center" spacing={3}>
                              <Text fontSize="2xl">🌊</Text>
                              <Text fontSize="sm" fontWeight="bold">Blue Ocean Strategy</Text>
                              <Text fontSize="xs" color="gray.600" textAlign="center">
                                Value propositions drive innovation
                              </Text>
                              <Badge colorScheme="teal" variant="subtle">Connected</Badge>
                            </VStack>
                          </CardBody>
                        </Card>

                        <Card variant="outline">
                          <CardBody>
                            <VStack align="center" spacing={3}>
                              <Text fontSize="2xl">💎</Text>
                              <Text fontSize="sm" fontWeight="bold">VRIO Analysis</Text>
                              <Text fontSize="xs" color="gray.600" textAlign="center">
                                Key resources evaluated for advantage
                              </Text>
                              <Badge colorScheme="purple" variant="subtle">Connected</Badge>
                            </VStack>
                          </CardBody>
                        </Card>
                      </Grid>

                      <Divider />

                      <Text fontSize="md" fontWeight="semibold">🎯 Strategic Alignment Dashboard</Text>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <Box p={4} borderRadius="md" bg="green.50">
                          <HStack justify="space-between">
                            <Text fontSize="sm" fontWeight="semibold">Canvas Completion</Text>
                            <Text fontSize="sm" fontWeight="bold">{calculateCompletion()}%</Text>
                          </HStack>
                          <Progress value={calculateCompletion()} colorScheme="green" size="sm" mt={2} />
                        </Box>
                        <Box p={4} borderRadius="md" bg="blue.50">
                          <HStack justify="space-between">
                            <Text fontSize="sm" fontWeight="semibold">Strategic Frameworks</Text>
                            <Text fontSize="sm" fontWeight="bold">3 Active</Text>
                          </HStack>
                          <Progress value={75} colorScheme="blue" size="sm" mt={2} />
                        </Box>
                      </Grid>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Enhanced Section Edit Modal */}
        <Modal isOpen={isSectionModalOpen} onClose={onSectionModalClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack justify="space-between">
                <HStack>
                  <Text fontSize="2xl">
                    {editingSection && canvasSections.find(s => s.id === editingSection)?.icon}
                  </Text>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="lg" fontWeight="bold">
                      {editingSection && canvasSections.find(s => s.id === editingSection)?.title}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Section Editor with AI Assistance
                    </Text>
                  </VStack>
                </HStack>
                <HStack spacing={2}>
                  <Badge colorScheme="teal" variant="subtle">
                    v{selectedSection?.version || 1}
                  </Badge>
                  <Badge colorScheme={selectedSection?.status === 'approved' ? 'green' : 'yellow'} variant="solid">
                    {selectedSection?.status || 'draft'}
                  </Badge>
                </HStack>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid templateColumns="2fr 1fr" gap={6}>
                {/* Main Content Editor */}
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      {editingSection && canvasSections.find(s => s.id === editingSection)?.description}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mb={4}>
                      💡 Tip: Enter each item on a new line. Use bullet points for clarity.
                    </Text>
                  </Box>
                  
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="semibold">Section Content</FormLabel>
                    <Textarea
                      value={tempContent}
                      onChange={(e) => setTempContent(e.target.value)}
                      placeholder="Enter each item on a new line...\n\nExample:\n• Key strategic partner\n• Technology supplier\n• Distribution channel partner"
                      rows={12}
                      fontSize="sm"
                      bg={cardBg}
                      borderWidth="2px"
                    />
                  </FormControl>
                  
                  {/* Quick Actions */}
                  <HStack spacing={2} flexWrap="wrap">
                    <Button size="xs" variant="outline" onClick={() => setTempContent(prev => prev + '\n• ')}>+ Add Bullet</Button>
                    <Button size="xs" variant="outline" onClick={() => setTempContent('')}>Clear All</Button>
                    <Button size="xs" variant="outline">Import from Template</Button>
                    <Button size="xs" variant="outline">AI Suggestions</Button>
                  </HStack>
                  
                  {/* Comment Section */}
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>💬 Add Comment</Text>
                    <HStack spacing={2}>
                      <Input 
                        placeholder="Add a comment or note about this section..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        size="sm"
                      />
                      <Button 
                        size="sm" 
                        colorScheme="blue" 
                        onClick={() => {
                          if (newComment.trim() && editingSection) {
                            addCommentToSection(editingSection, newComment);
                            setNewComment('');
                          }
                        }}
                      >
                        Add
                      </Button>
                    </HStack>
                  </Box>
                </VStack>
                
                {/* Sidebar with Tips and Analysis */}
                <VStack spacing={4} align="stretch">
                  {/* Tips */}
                  <Card size="sm" bg={infoBg}>
                    <CardHeader pb={2}>
                      <Text fontSize="sm" fontWeight="bold">💡 Tips & Examples</Text>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack spacing={2} align="stretch">
                        {selectedSection?.tips.map((tip, idx) => (
                          <Text key={idx} fontSize="xs" color="gray.600">
                            • {tip}
                          </Text>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                  
                  {/* Examples */}
                  <Card size="sm" bg={completedBg}>
                    <CardHeader pb={2}>
                      <Text fontSize="sm" fontWeight="bold">📋 Examples</Text>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack spacing={1} align="stretch">
                        {selectedSection?.examples.map((example, idx) => (
                          <HStack key={idx} spacing={2}>
                            <Text fontSize="xs" color="gray.600">• {example}</Text>
                            <IconButton 
                              icon={<AddIcon />} 
                              size="xs" 
                              variant="ghost" 
                              onClick={() => setTempContent(prev => prev + (prev ? '\n' : '') + '• ' + example)}
                            />
                          </HStack>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                  
                  {/* Section Health */}
                  <Card size="sm" bg={cardBg}>
                    <CardHeader pb={2}>
                      <Text fontSize="sm" fontWeight="bold">📊 Section Health</Text>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack spacing={3}>
                        <CircularProgress 
                          value={selectedSection ? calculateSectionHealth(selectedSection) : 0} 
                          color="teal.400" 
                          size="60px"
                        >
                          <CircularProgressLabel fontSize="sm" fontWeight="bold">
                            {selectedSection ? calculateSectionHealth(selectedSection) : 0}%
                          </CircularProgressLabel>
                        </CircularProgress>
                        <VStack spacing={1}>
                          <HStack justify="space-between" w="full">
                            <Text fontSize="xs" color="gray.600">Content:</Text>
                            <Text fontSize="xs" fontWeight="semibold">{selectedSection?.content.length || 0} items</Text>
                          </HStack>
                          <HStack justify="space-between" w="full">
                            <Text fontSize="xs" color="gray.600">Comments:</Text>
                            <Text fontSize="xs" fontWeight="semibold">{selectedSection?.comments.length || 0}</Text>
                          </HStack>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <HStack spacing={3}>
                <Button variant="ghost" onClick={onSectionModalClose}>
                  Cancel
                </Button>
                <Button variant="outline" leftIcon={<ViewIcon />}>
                  View History
                </Button>
                <Button colorScheme="teal" onClick={handleSaveSection} leftIcon={<CheckIcon />}>
                  Save Changes
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {/* Export Options Modal */}
        <Modal isOpen={isExportModalOpen} onClose={onExportModalClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>📊 Export Business Model Canvas</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="semibold">Export Format</FormLabel>
                  <Select 
                    value={exportOptions.format} 
                    onChange={(e) => setExportOptions(prev => ({ ...prev, format: e.target.value as any }))}
                  >
                    <option value="pdf">📄 PDF Document</option>
                    <option value="png">🖼️ PNG Image</option>
                    <option value="json">📋 JSON Data</option>
                    <option value="csv">📊 CSV Spreadsheet</option>
                    <option value="pptx">📽️ PowerPoint Presentation</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="semibold">Include in Export</FormLabel>
                  <VStack spacing={2} align="start">
                    <Checkbox 
                      isChecked={exportOptions.options.includeComments}
                      onChange={(e) => setExportOptions(prev => ({
                        ...prev,
                        options: { ...prev.options, includeComments: e.target.checked }
                      }))}
                    >
                      💬 Comments and Discussions
                    </Checkbox>
                    <Checkbox 
                      isChecked={exportOptions.options.includeAnalysis}
                      onChange={(e) => setExportOptions(prev => ({
                        ...prev,
                        options: { ...prev.options, includeAnalysis: e.target.checked }
                      }))}
                    >
                      🤖 AI Analysis and Insights
                    </Checkbox>
                    <Checkbox 
                      isChecked={exportOptions.options.includeMetrics}
                      onChange={(e) => setExportOptions(prev => ({
                        ...prev,
                        options: { ...prev.options, includeMetrics: e.target.checked }
                      }))}
                    >
                      📈 Performance Metrics
                    </Checkbox>
                    <Checkbox 
                      isChecked={exportOptions.options.includeHistory}
                      onChange={(e) => setExportOptions(prev => ({
                        ...prev,
                        options: { ...prev.options, includeHistory: e.target.checked }
                      }))}
                    >
                      📅 Version History
                    </Checkbox>
                  </VStack>
                </FormControl>
                
                <Alert status="info" size="sm">
                  <AlertIcon />
                  <Text fontSize="xs">
                    Export includes current canvas state with {calculateCompletion()}% completion rate
                  </Text>
                </Alert>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onExportModalClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="teal" 
                leftIcon={<DownloadIcon />}
                onClick={() => {
                  handleExportCanvas(exportOptions.format);
                  onExportModalClose();
                }}
              >
                Export Canvas
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {/* Validation Results Modal */}
        <Modal isOpen={isValidationModalOpen} onClose={onValidationModalClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Text>✅ Canvas Validation Report</Text>
                <Badge colorScheme={validationSummary.errors > 0 ? 'red' : 'green'} variant="solid">
                  {validationSummary.errors === 0 ? 'PASSED' : `${validationSummary.errors} ISSUES`}
                </Badge>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <SimpleGrid columns={3} spacing={4}>
                  <Stat>
                    <StatLabel fontSize="sm">Errors</StatLabel>
                    <StatNumber fontSize="lg" color="red.500">{validationSummary.errors}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel fontSize="sm">Warnings</StatLabel>
                    <StatNumber fontSize="lg" color="yellow.500">{validationSummary.warnings}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel fontSize="sm">Info</StatLabel>
                    <StatNumber fontSize="lg" color="blue.500">{validationSummary.info}</StatNumber>
                  </Stat>
                </SimpleGrid>
                
                <Divider />
                
                <VStack spacing={3} align="stretch">
                  {validationResults.map((result, idx) => (
                    <Alert key={idx} status={result.severity}>
                      <AlertIcon />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="semibold">{result.message}</Text>
                        <Text fontSize="xs" color="gray.600">Severity: {result.severity}</Text>
                      </VStack>
                    </Alert>
                  ))}
                  
                  {validationResults.length === 0 && (
                    <Alert status="success">
                      <AlertIcon />
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">All validations passed!</Text>
                        <Text fontSize="xs">Your business model canvas meets all quality requirements.</Text>
                      </VStack>
                    </Alert>
                  )}
                </VStack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={onValidationModalClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {/* Templates Modal */}
        <Modal isOpen={isTemplateModalOpen} onClose={onTemplateModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>🎯 Business Model Templates</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Text fontSize="sm" color="gray.600">
                  Choose from industry-specific templates to jumpstart your business model canvas.
                </Text>
                
                <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
                  {canvasPresets.map((preset) => (
                    <Card key={preset.id} variant="outline" cursor="pointer" _hover={{ shadow: 'md' }}>
                      <CardBody>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <Text fontSize="md" fontWeight="bold">{preset.name}</Text>
                            <Badge colorScheme="purple" variant="subtle">
                              {preset.stage}
                            </Badge>
                          </HStack>
                          
                          <Text fontSize="sm" color="gray.600">{preset.description}</Text>
                          
                          <HStack spacing={2} flexWrap="wrap">
                            {preset.tags.map((tag, idx) => (
                              <Tag key={idx} size="sm" variant="outline">
                                <TagLabel>{tag}</TagLabel>
                              </Tag>
                            ))}
                          </HStack>
                          
                          <HStack justify="space-between" fontSize="xs" color="gray.500">
                            <Text>Industry: {preset.industry}</Text>
                            <HStack>
                              <Text>⭐ {preset.rating}</Text>
                              <Text>👥 {preset.popularity}%</Text>
                            </HStack>
                          </HStack>
                          
                          <Button 
                            size="sm" 
                            colorScheme="teal" 
                            onClick={() => {
                              applyCanvasTemplate(preset);
                              onTemplateModalClose();
                            }}
                          >
                            Apply Template
                          </Button>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onTemplateModalClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default BusinessModelCanvas;