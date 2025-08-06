// Strategic Framework Type Definitions
export interface FrameworkMetadata {
  id: string;
  name: string;
  description: string;
  category: FrameworkCategory;
  icon: string;
  tier: UserTier;
  author?: string;
  version: string;
  tags: string[];
  dependencies?: string[];
  estimatedTime: number; // in minutes
  complexity: ComplexityLevel;
  isActive: boolean;
  lastUpdated: Date;
}

export enum FrameworkCategory {
  STRATEGY = 'strategy',
  PROCESS = 'process',
  ANALYSIS = 'analysis',
  OPERATIONS = 'operations',
  FINANCIAL = 'financial',
  TEAM = 'team',
  MARKETING = 'marketing',
  INNOVATION = 'innovation'
}

export enum UserTier {
  LITE = 'lite',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

export enum ComplexityLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface FrameworkInstance {
  id: string;
  frameworkId: string;
  name: string;
  data: Record<string, any>;
  metadata: FrameworkMetadata;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  organizationId?: string;
  isTemplate: boolean;
  sharedWith: string[];
  status: InstanceStatus;
  progress: number; // 0-100
}

export enum InstanceStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  SHARED = 'shared'
}

export interface FrameworkComponent {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  loadingComponent?: React.ComponentType;
  errorComponent?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export interface CrossFrameworkData {
  sourceFrameworkId: string;
  targetFrameworkId: string;
  dataMapping: Record<string, string>;
  lastSync: Date;
  syncEnabled: boolean;
}

export interface FrameworkRegistry {
  frameworks: Map<string, FrameworkMetadata>;
  components: Map<string, FrameworkComponent>;
  instances: Map<string, FrameworkInstance>;
  crossFrameworkData: CrossFrameworkData[];
}

export interface AIScenario {
  id: string;
  title: string;
  description: string;
  frameworks: string[];
  scenario: string;
  recommendations: AIRecommendation[];
  confidence: number; // 0-1
  generatedAt: Date;
  userId: string;
  isBookmarked: boolean;
}

export interface AIRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  impact: ImpactLevel;
  effort: EffortLevel;
  timeframe: string;
  frameworks: string[];
  actions: string[];
  priority: number; // 1-10
}

export enum RecommendationType {
  STRATEGIC = 'strategic',
  OPERATIONAL = 'operational',
  FINANCIAL = 'financial',
  MARKET = 'market',
  RISK = 'risk',
  OPPORTUNITY = 'opportunity'
}

export enum ImpactLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum EffortLevel {
  MINIMAL = 'minimal',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EXTENSIVE = 'extensive'
}

export interface PerformanceMetrics {
  frameworkId: string;
  loadTime: number;
  memoryUsage: number;
  renderTime: number;
  interactionLatency: number;
  errorRate: number;
  userSatisfaction?: number;
  timestamp: Date;
}

export interface StrategicIntelligence {
  id: string;
  type: IntelligenceType;
  title: string;
  summary: string;
  insights: Insight[];
  frameworks: string[];
  confidence: number;
  urgency: UrgencyLevel;
  generatedAt: Date;
  source: DataSource;
}

export enum IntelligenceType {
  MARKET_SHIFT = 'market_shift',
  COMPETITIVE_THREAT = 'competitive_threat',
  OPPORTUNITY = 'opportunity',
  REGULATORY_CHANGE = 'regulatory_change',
  TECHNOLOGY_TREND = 'technology_trend',
  CUSTOMER_BEHAVIOR = 'customer_behavior'
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  impact: ImpactLevel;
  actionable: boolean;
  relatedFrameworks: string[];
  suggestedActions: string[];
}

export enum UrgencyLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum DataSource {
  MARKET_DATA = 'market_data',
  FINANCIAL_DATA = 'financial_data',
  SOCIAL_SIGNALS = 'social_signals',
  NEWS_ANALYSIS = 'news_analysis',
  INTERNAL_DATA = 'internal_data',
  AI_ANALYSIS = 'ai_analysis'
}