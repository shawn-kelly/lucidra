import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Input,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Textarea,
  Switch,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  CircularProgress,
  CircularProgressLabel,
  useToast,
  Divider,
  Tag,
  TagLabel,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  AvatarGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Center,
  Tooltip,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { 
  AddIcon,
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  ViewIcon,
  WarningIcon,
  CheckIcon,
  RepeatIcon,
  CalendarIcon,
  InfoIcon,
  SettingsIcon,
  ChevronDownIcon,
  SearchIcon,
  TimeIcon,
  StarIcon,
  EmailIcon,
  PhoneIcon,
  AttachmentIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DragHandleIcon,
  CopyIcon,
  ExternalLinkIcon,
  LinkIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChatIcon,
  BellIcon,
  UnlockIcon
} from '@chakra-ui/icons';

// Strategic Planning Integration Interfaces
interface StrategicPlan {
  id: string;
  name: string;
  vision: string;
  mission: string;
  timeHorizon: string;
  status: 'draft' | 'active' | 'under_review' | 'completed';
  strategicThemes: StrategicTheme[];
  objectives: StrategicObjective[];
  initiatives: StrategicInitiative[];
  keyResults: KeyResult[];
  stakeholders: Stakeholder[];
  risks: StrategicRisk[];
  resources: ResourceAllocation[];
  timeline: PlanTimeline;
  governance: Governance;
  performance: PlanPerformance;
  organizationalAlignment: OrganizationalAlignment;
  frameworkIntegration: FrameworkIntegration;
  marketContext: MarketContext;
  competitiveAnalysis: CompetitiveAnalysis;
  lastUpdated: string;
  createdAt: string;
  createdBy: string;
}

interface StrategicTheme {
  id: string;
  name: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  strategicFocus: 'growth' | 'efficiency' | 'innovation' | 'market_expansion' | 'operational_excellence';
  objectives: string[];
  ownerRole: string;
  ownerId: string;
  budget: number;
  timeline: string;
  dependencies: string[];
  kpis: ThemeKPI[];
  progress: number;
  status: 'not_started' | 'in_progress' | 'on_track' | 'at_risk' | 'completed';
}

interface ThemeKPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  trend: 'improving' | 'stable' | 'declining';
  benchmarkPosition: number;
}

interface StrategicObjective {
  id: string;
  themeId: string;
  title: string;
  description: string;
  type: 'financial' | 'customer' | 'internal_process' | 'learning_growth';
  priority: 'critical' | 'high' | 'medium' | 'low';
  timeframe: 'short_term' | 'medium_term' | 'long_term';
  measurableOutcomes: string[];
  successCriteria: string[];
  keyResults: string[];
  ownerRole: string;
  ownerId: string;
  supportingRoles: string[];
  budget: number;
  resourceRequirements: ResourceRequirement[];
  dependencies: ObjectiveDependency[];
  risks: string[];
  progress: number;
  status: 'not_started' | 'in_progress' | 'on_track' | 'at_risk' | 'blocked' | 'completed';
  organizationalImpact: OrganizationalImpact;
}

interface ResourceRequirement {
  type: 'human' | 'financial' | 'technology' | 'infrastructure';
  description: string;
  quantity: number;
  cost: number;
  timeline: string;
  criticality: 'must_have' | 'should_have' | 'nice_to_have';
}

interface ObjectiveDependency {
  dependsOn: string;
  type: 'sequential' | 'parallel' | 'resource_sharing';
  criticality: 'blocking' | 'important' | 'minor';
  description: string;
}

interface OrganizationalImpact {
  affectedPositions: string[];
  newRolesRequired: NewRole[];
  skillRequirements: SkillRequirement[];
  structuralChanges: StructuralChange[];
  culturalRequirements: CulturalRequirement[];
  changeManagement: ChangeManagement;
}

interface NewRole {
  title: string;
  department: string;
  level: number;
  reportingTo: string;
  responsibilities: string[];
  requiredSkills: string[];
  timeline: string;
  budgetImpact: number;
}

interface SkillRequirement {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  affectedEmployees: number;
  developmentPlan: string;
  timeline: string;
  cost: number;
}

interface StructuralChange {
  type: 'reorganization' | 'new_department' | 'role_elimination' | 'reporting_change';
  description: string;
  affectedPositions: string[];
  timeline: string;
  riskLevel: 'low' | 'medium' | 'high';
  changeImpact: string;
}

interface CulturalRequirement {
  aspect: 'values' | 'behaviors' | 'processes' | 'communication';
  currentState: string;
  targetState: string;
  gap: string;
  interventions: string[];
  timeline: string;
  measurementCriteria: string[];
}

interface ChangeManagement {
  strategy: string;
  stakeholderAnalysis: StakeholderAnalysis[];
  communicationPlan: CommunicationPlan[];
  trainingRequirements: TrainingRequirement[];
  resistanceFactors: ResistanceFactor[];
  successFactors: string[];
  timeline: string;
  budget: number;
}

interface StakeholderAnalysis {
  stakeholder: string;
  influence: 'high' | 'medium' | 'low';
  interest: 'high' | 'medium' | 'low';
  attitude: 'champion' | 'supporter' | 'neutral' | 'skeptic' | 'blocker';
  strategy: string;
  engagementPlan: string[];
}

interface CommunicationPlan {
  audience: string;
  message: string;
  channel: string;
  frequency: string;
  owner: string;
  timeline: string;
}

interface TrainingRequirement {
  audience: string;
  trainingType: 'technical' | 'process' | 'leadership' | 'culture';
  content: string;
  delivery: 'in_person' | 'virtual' | 'self_paced' | 'blended';
  duration: string;
  cost: number;
  timeline: string;
}

interface ResistanceFactor {
  factor: string;
  probability: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  mitigation: string[];
  owner: string;
}

interface StrategicInitiative {
  id: string;
  objectiveId: string;
  name: string;
  description: string;
  type: 'project' | 'program' | 'operational_change' | 'cultural_initiative';
  scope: 'department' | 'division' | 'company_wide' | 'external';
  priority: 'critical' | 'high' | 'medium' | 'low';
  budget: number;
  timeline: InitiativeTimeline;
  team: InitiativeTeam;
  deliverables: Deliverable[];
  milestones: Milestone[];
  risks: InitiativeRisk[];
  dependencies: string[];
  success_criteria: string[];
  progress: number;
  status: 'planning' | 'in_progress' | 'on_track' | 'at_risk' | 'blocked' | 'completed' | 'cancelled';
  organizationalChanges: OrganizationalChange[];
}

interface InitiativeTimeline {
  startDate: string;
  endDate: string;
  phases: InitiativePhase[];
  criticalPath: string[];
}

interface InitiativePhase {
  name: string;
  startDate: string;
  endDate: string;
  deliverables: string[];
  resources: string[];
  dependencies: string[];
}

interface InitiativeTeam {
  projectManager: string;
  sponsor: string;
  stakeholders: string[];
  coreTeam: TeamMember[];
  extendedTeam: TeamMember[];
  externalPartners: string[];
}

interface TeamMember {
  employeeId: string;
  role: string;
  commitment: number; // percentage
  skills: string[];
  responsibilities: string[];
}

interface Deliverable {
  id: string;
  name: string;
  description: string;
  type: 'document' | 'system' | 'process' | 'training' | 'infrastructure';
  dueDate: string;
  owner: string;
  status: 'not_started' | 'in_progress' | 'review' | 'completed';
  dependencies: string[];
  acceptanceCriteria: string[];
}

interface Milestone {
  id: string;
  name: string;
  date: string;
  description: string;
  criteria: string[];
  status: 'upcoming' | 'at_risk' | 'achieved' | 'missed';
  impact: 'critical' | 'high' | 'medium' | 'low';
}

interface InitiativeRisk {
  id: string;
  description: string;
  probability: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  category: 'technical' | 'resource' | 'timeline' | 'stakeholder' | 'external';
  mitigation: string[];
  contingency: string[];
  owner: string;
  status: 'identified' | 'being_managed' | 'resolved' | 'occurred';
}

interface OrganizationalChange {
  type: 'role_creation' | 'role_modification' | 'process_change' | 'system_change' | 'cultural_shift';
  description: string;
  affectedAreas: string[];
  timeline: string;
  changeLeader: string;
  impact: 'transformational' | 'significant' | 'moderate' | 'minimal';
  readinessAssessment: ReadinessAssessment;
}

interface ReadinessAssessment {
  organizationalReadiness: number; // 0-100
  technicalReadiness: number;
  culturalReadiness: number;
  resourceReadiness: number;
  stakeholderReadiness: number;
  overallReadiness: number;
  gapAnalysis: string[];
  recommendations: string[];
}

interface KeyResult {
  id: string;
  objectiveId: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  dueDate: string;
  owner: string;
  status: 'not_started' | 'in_progress' | 'on_track' | 'at_risk' | 'completed';
  updateFrequency: 'weekly' | 'monthly' | 'quarterly';
  lastUpdated: string;
  trend: 'improving' | 'stable' | 'declining';
  confidence: number; // 0-100
}

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  type: 'internal' | 'external';
  influence: 'high' | 'medium' | 'low';
  interest: 'high' | 'medium' | 'low';
  expectations: string[];
  engagementStrategy: string;
  communicationPreference: string;
  lastEngagement: string;
}

interface StrategicRisk {
  id: string;
  title: string;
  description: string;
  category: 'strategic' | 'operational' | 'financial' | 'compliance' | 'reputational' | 'technology';
  probability: 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
  impact: 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
  riskScore: number;
  proximity: 'immediate' | 'near_term' | 'medium_term' | 'long_term';
  affectedObjectives: string[];
  currentControls: string[];
  additionalMitigation: string[];
  contingencyPlans: string[];
  owner: string;
  reviewDate: string;
  status: 'open' | 'being_managed' | 'closed' | 'occurred';
  organizationalImpact: RiskOrganizationalImpact;
}

interface RiskOrganizationalImpact {
  affectedPositions: string[];
  potentialRestructuring: boolean;
  skillImpacts: string[];
  processChanges: string[];
  culturalImplications: string[];
  resourceRedirection: boolean;
}

interface ResourceAllocation {
  category: 'human' | 'financial' | 'technology' | 'infrastructure';
  allocated: number;
  utilized: number;
  remaining: number;
  unit: string;
  allocation_by_theme: ThemeAllocation[];
  allocation_by_timeline: TimelineAllocation[];
  constraints: string[];
  optimization_opportunities: string[];
}

interface ThemeAllocation {
  themeId: string;
  themeName: string;
  allocation: number;
  utilization: number;
  variance: number;
}

interface TimelineAllocation {
  period: string;
  planned: number;
  actual: number;
  forecast: number;
}

interface PlanTimeline {
  startDate: string;
  endDate: string;
  reviewCycles: ReviewCycle[];
  majorMilestones: PlanMilestone[];
  phases: PlanPhase[];
  criticalPath: string[];
}

interface ReviewCycle {
  type: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
  participants: string[];
  agenda: string[];
  decisions: string[];
  nextReview: string;
}

interface PlanMilestone {
  id: string;
  name: string;
  date: string;
  description: string;
  success_criteria: string[];
  dependencies: string[];
  organizational_readiness: OrganizationalReadiness;
}

interface OrganizationalReadiness {
  structureReadiness: number;
  skillReadiness: number;
  cultureReadiness: number;
  systemReadiness: number;
  overallReadiness: number;
  gaps: string[];
  actions: string[];
}

interface PlanPhase {
  name: string;
  startDate: string;
  endDate: string;
  objectives: string[];
  deliverables: string[];
  organizationalChanges: string[];
  successCriteria: string[];
}

interface Governance {
  structure: GovernanceStructure;
  roles: GovernanceRole[];
  processes: GovernanceProcess[];
  reporting: ReportingStructure;
  decisionRights: DecisionRights[];
  escalationPaths: EscalationPath[];
}

interface GovernanceStructure {
  steeringCommittee: string[];
  executionTeams: ExecutionTeam[];
  reviewBoards: ReviewBoard[];
  workingGroups: WorkingGroup[];
}

interface ExecutionTeam {
  name: string;
  leader: string;
  members: string[];
  scope: string[];
  responsibilities: string[];
  reportingTo: string;
}

interface ReviewBoard {
  name: string;
  chair: string;
  members: string[];
  frequency: string;
  scope: string[];
  decisions: string[];
}

interface WorkingGroup {
  name: string;
  lead: string;
  members: string[];
  purpose: string;
  deliverables: string[];
  timeline: string;
}

interface GovernanceRole {
  title: string;
  responsibilities: string[];
  authority: string[];
  accountability: string[];
  reportingTo: string;
  keyDecisions: string[];
}

interface GovernanceProcess {
  name: string;
  description: string;
  inputs: string[];
  outputs: string[];
  participants: string[];
  timeline: string;
  tools: string[];
}

interface ReportingStructure {
  dashboards: Dashboard[];
  reports: Report[];
  meetings: GovernanceMeeting[];
  escalationTriggers: string[];
}

interface Dashboard {
  name: string;
  audience: string[];
  frequency: string;
  metrics: string[];
  visualizations: string[];
  access: string;
}

interface Report {
  name: string;
  audience: string[];
  frequency: string;
  content: string[];
  format: string;
  distribution: string;
}

interface GovernanceMeeting {
  name: string;
  participants: string[];
  frequency: string;
  agenda: string[];
  decisions: string[];
  followUp: string[];
}

interface DecisionRights {
  decision_type: string;
  decision_maker: string;
  consultWith: string[];
  informStakeholders: string[];
  escalation_criteria: string[];
}

interface EscalationPath {
  trigger: string;
  from: string;
  to: string;
  timeline: string;
  process: string[];
  resolution_criteria: string[];
}

interface PlanPerformance {
  overallProgress: number;
  themeProgress: ThemeProgress[];
  objectiveProgress: ObjectiveProgress[];
  kpiPerformance: KPIPerformance[];
  milestoneAchievement: MilestoneAchievement;
  riskStatus: RiskStatus;
  resourceUtilization: ResourceUtilization;
  stakeholderSatisfaction: StakeholderSatisfaction[];
  organizationalHealth: OrganizationalHealth;
}

interface ThemeProgress {
  themeId: string;
  themeName: string;
  progress: number;
  status: string;
  keyAchievements: string[];
  challenges: string[];
  nextActions: string[];
}

interface ObjectiveProgress {
  objectiveId: string;
  objectiveTitle: string;
  progress: number;
  status: string;
  keyResults: KeyResult[];
  organizationalAlignment: number;
}

interface KPIPerformance {
  kpiId: string;
  kpiName: string;
  target: number;
  actual: number;
  variance: number;
  trend: string;
  forecast: number;
  organizationalImpact: string;
}

interface MilestoneAchievement {
  achieved: number;
  missed: number;
  upcoming: number;
  atRisk: number;
  impactOnPlan: string;
}

interface RiskStatus {
  openRisks: number;
  closedRisks: number;
  newRisks: number;
  escalatedRisks: number;
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface ResourceUtilization {
  human: number;
  financial: number;
  technology: number;
  infrastructure: number;
  efficiency: number;
  constraints: string[];
}

interface StakeholderSatisfaction {
  stakeholder: string;
  satisfaction: number;
  engagement: number;
  feedback: string[];
  concerns: string[];
}

interface OrganizationalHealth {
  alignment: number;
  engagement: number;
  capability: number;
  culture: number;
  leadership: number;
  overallHealth: number;
  improvements: string[];
  risks: string[];
}

interface OrganizationalAlignment {
  structureAlignment: StructureAlignment;
  roleAlignment: RoleAlignment[];
  skillAlignment: SkillAlignment[];
  cultureAlignment: CultureAlignment;
  processAlignment: ProcessAlignment[];
  systemAlignment: SystemAlignment[];
  leadershipAlignment: LeadershipAlignment;
}

interface StructureAlignment {
  currentFit: number;
  targetFit: number;
  gaps: string[];
  requiredChanges: StructuralChange[];
  timeline: string;
  impact: string;
}

interface RoleAlignment {
  roleId: string;
  roleName: string;
  strategicContribution: number;
  currentAlignment: number;
  targetAlignment: number;
  developmentNeeds: string[];
  changesRequired: string[];
}

interface SkillAlignment {
  skill: string;
  strategicImportance: number;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  affectedRoles: string[];
  developmentPlan: string;
}

interface CultureAlignment {
  currentCulture: string[];
  targetCulture: string[];
  alignmentScore: number;
  culturalShifts: CulturalShift[];
  interventions: CulturalIntervention[];
  timeline: string;
}

interface CulturalShift {
  from: string;
  to: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard' | 'very_hard';
  timeline: string;
  interventions: string[];
}

interface CulturalIntervention {
  intervention: string;
  target: string;
  method: string;
  timeline: string;
  success_criteria: string[];
  owner: string;
}

interface ProcessAlignment {
  process: string;
  currentEffectiveness: number;
  targetEffectiveness: number;
  strategicContribution: number;
  improvementNeeds: string[];
  timeline: string;
}

interface SystemAlignment {
  system: string;
  currentCapability: number;
  targetCapability: number;
  strategicEnablement: number;
  upgradeNeeds: string[];
  timeline: string;
  investment: number;
}

interface LeadershipAlignment {
  overallAlignment: number;
  leadershipCapabilities: LeadershipCapability[];
  developmentNeeds: string[];
  successionReadiness: number;
  culturalModeling: number;
}

interface LeadershipCapability {
  capability: string;
  currentLevel: number;
  targetLevel: number;
  strategicImportance: number;
  developmentPlan: string;
  timeline: string;
}

interface FrameworkIntegration {
  blueOcean: BlueOceanIntegration;
  porter: PorterIntegration;
  mckinsey7S: McKinsey7SIntegration;
  rbv: RBVIntegration;
  christensen: ChristensenIntegration;
  rumelt: RumeltIntegration;
}

interface BlueOceanIntegration {
  eliminateFactors: string[];
  reduceFactors: string[];
  raiseFactors: string[];
  createFactors: string[];
  valueInnovation: ValueInnovation[];
  marketSpace: 'red_ocean' | 'blue_ocean' | 'transitioning';
  competitionRelevance: number;
}

interface ValueInnovation {
  innovation: string;
  valueIncrease: number;
  costReduction: number;
  organizationalRequirement: string[];
  timeline: string;
}

interface PorterIntegration {
  competitivePosition: 'cost_leadership' | 'differentiation' | 'focus' | 'hybrid';
  valueChainOptimization: ValueChainActivity[];
  fiveForces: FiveForcesFactor[];
  competitiveAdvantage: string[];
  sustainabilityFactors: string[];
}

interface ValueChainActivity {
  activity: string;
  currentPerformance: number;
  targetPerformance: number;
  improvementActions: string[];
  organizationalImplications: string[];
}

interface FiveForcesFactor {
  force: string;
  intensity: 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
  strategicResponse: string[];
  organizationalRequirements: string[];
}

interface McKinsey7SIntegration {
  alignmentScore: number;
  hardElementChanges: HardElementChange[];
  softElementChanges: SoftElementChange[];
  integrationPlan: string[];
  sequencing: string[];
}

interface HardElementChange {
  element: 'structure' | 'strategy' | 'systems';
  currentState: string;
  targetState: string;
  timeline: string;
  organizationalImpact: string[];
}

interface SoftElementChange {
  element: 'shared_values' | 'style' | 'staff' | 'skills';
  currentState: string;
  targetState: string;
  timeline: string;
  interventions: string[];
}

interface RBVIntegration {
  resources: StrategicResource[];
  capabilities: StrategicCapability[];
  vrioAnalysis: VRIOAnalysis[];
  competitiveAdvantage: string[];
  resourceDevelopment: ResourceDevelopment[];
}

interface StrategicResource {
  resource: string;
  type: 'tangible' | 'intangible' | 'human';
  strategic_value: number;
  current_strength: number;
  target_strength: number;
  development_plan: string[];
}

interface StrategicCapability {
  capability: string;
  current_maturity: number;
  target_maturity: number;
  strategic_importance: number;
  development_actions: string[];
  organizational_requirements: string[];
}

interface VRIOAnalysis {
  resource: string;
  valuable: boolean;
  rare: boolean;
  imitable: boolean;
  organized: boolean;
  competitive_implication: string;
  development_priority: 'critical' | 'high' | 'medium' | 'low';
}

interface ResourceDevelopment {
  resource: string;
  development_approach: string;
  timeline: string;
  investment: number;
  organizational_changes: string[];
  success_metrics: string[];
}

interface ChristensenIntegration {
  disruptionAssessment: DisruptionAssessment;
  innovationOpportunities: InnovationOpportunity[];
  adaptationStrategies: AdaptationStrategy[];
  organizationalAgility: OrganizationalAgility;
}

interface DisruptionAssessment {
  disruptionRisk: 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
  disruptionSources: string[];
  timeHorizon: string;
  preparationActions: string[];
  organizationalReadiness: number;
}

interface InnovationOpportunity {
  opportunity: string;
  type: 'sustaining' | 'disruptive' | 'new_market';
  potential_impact: number;
  organizational_requirements: string[];
  timeline: string;
  investment: number;
}

interface AdaptationStrategy {
  strategy: string;
  triggers: string[];
  actions: string[];
  organizational_changes: string[];
  timeline: string;
}

interface OrganizationalAgility {
  current_agility: number;
  target_agility: number;
  improvement_areas: string[];
  agility_initiatives: string[];
  measurement_criteria: string[];
}

interface RumeltIntegration {
  strategyKernel: StrategyKernel;
  goodStrategyElements: string[];
  badStrategyAvoidance: string[];
  focusAreas: FocusArea[];
  leveragePoints: LeveragePoint[];
}

interface StrategyKernel {
  diagnosis: Diagnosis;
  guidingPolicy: GuidingPolicy;
  coherentActions: CoherentAction[];
}

interface Diagnosis {
  criticalChallenge: string;
  rootCauses: string[];
  organizationalFactors: string[];
  marketFactors: string[];
  competitiveFactors: string[];
}

interface GuidingPolicy {
  approach: string;
  principles: string[];
  constraints: string[];
  tradeOffs: string[];
  organizationalImplications: string[];
}

interface CoherentAction {
  action: string;
  rationale: string;
  organizationalRequirement: string[];
  timeline: string;
  success_criteria: string[];
}

interface FocusArea {
  area: string;
  strategic_importance: number;
  current_focus: number;
  target_focus: number;
  organizational_alignment: string[];
}

interface LeveragePoint {
  point: string;
  impact_potential: number;
  effort_required: number;
  organizational_enablers: string[];
  timeline: string;
}

interface MarketContext {
  industryAnalysis: IndustryAnalysis;
  customerSegments: CustomerSegment[];
  marketTrends: MarketTrend[];
  regulatoryEnvironment: RegulatoryFactor[];
  economicFactors: EconomicFactor[];
  technologicalFactors: TechnologicalFactor[];
}

interface IndustryAnalysis {
  growth_rate: number;
  maturity: 'emerging' | 'growth' | 'mature' | 'declining';
  concentration: 'fragmented' | 'consolidated' | 'oligopoly' | 'monopoly';
  barriers_to_entry: 'low' | 'medium' | 'high';
  technology_change_pace: 'slow' | 'moderate' | 'fast' | 'very_fast';
  key_success_factors: string[];
}

interface CustomerSegment {
  segment: string;
  size: number;
  growth_rate: number;
  profitability: number;
  needs: string[];
  buying_behavior: string[];
  organizational_requirements: string[];
}

interface MarketTrend {
  trend: string;
  impact: 'transformational' | 'significant' | 'moderate' | 'minimal';
  timeframe: 'immediate' | 'near_term' | 'medium_term' | 'long_term';
  organizational_implications: string[];
  strategic_response: string[];
}

interface RegulatoryFactor {
  regulation: string;
  impact: 'high' | 'medium' | 'low';
  compliance_requirement: string[];
  organizational_changes: string[];
  timeline: string;
}

interface EconomicFactor {
  factor: string;
  current_impact: 'positive' | 'neutral' | 'negative';
  future_outlook: 'improving' | 'stable' | 'deteriorating';
  strategic_implications: string[];
  organizational_responses: string[];
}

interface TechnologicalFactor {
  technology: string;
  adoption_stage: 'emerging' | 'early_adoption' | 'mainstream' | 'mature';
  strategic_importance: number;
  organizational_readiness: number;
  investment_required: number;
}

interface CompetitiveAnalysis {
  directCompetitors: Competitor[];
  indirectCompetitors: Competitor[];
  competitivePosition: CompetitivePosition;
  competitiveAdvantages: CompetitiveAdvantage[];
  vulnerabilities: CompetitiveVulnerability[];
  competitiveResponse: CompetitiveResponse[];
}

interface Competitor {
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  strategy: string;
  organizationalCapabilities: string[];
  likelyMoves: string[];
}

interface CompetitivePosition {
  overall_position: 'leader' | 'challenger' | 'follower' | 'nicher';
  position_by_segment: SegmentPosition[];
  position_trends: string;
  strategic_groups: string[];
}

interface SegmentPosition {
  segment: string;
  position: 'leader' | 'challenger' | 'follower' | 'nicher';
  market_share: number;
  competitive_advantages: string[];
}

interface CompetitiveAdvantage {
  advantage: string;
  sustainability: 'high' | 'medium' | 'low';
  source: 'cost' | 'differentiation' | 'focus' | 'speed' | 'innovation';
  organizational_enablers: string[];
  reinforcement_needs: string[];
}

interface CompetitiveVulnerability {
  vulnerability: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  likelihood: 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
  mitigation_actions: string[];
  organizational_requirements: string[];
}

interface CompetitiveResponse {
  trigger: string;
  response_options: string[];
  recommended_action: string;
  organizational_readiness: number;
  timeline: string;
}

// Strategic Planning Integration Component
const StrategicPlanningIntegration: React.FC = () => {
  // Core state management
  const [strategicPlans, setStrategicPlans] = useState<StrategicPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<StrategicPlan | null>(null);
  const [organizationalImpact, setOrganizationalImpact] = useState<any>(null);
  
  // UI state
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'alignment' | 'execution'>('overview');
  const [filterTheme, setFilterTheme] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('active');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // Modal states
  const {
    isOpen: isPlanModalOpen,
    onOpen: onPlanModalOpen,
    onClose: onPlanModalClose
  } = useDisclosure();
  const {
    isOpen: isAlignmentModalOpen,
    onOpen: onAlignmentModalOpen,
    onClose: onAlignmentModalClose
  } = useDisclosure();
  const {
    isOpen: isImpactModalOpen,
    onOpen: onImpactModalOpen,
    onClose: onImpactModalClose
  } = useDisclosure();
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const greenBg = useColorModeValue('green.50', 'green.900');
  const redBg = useColorModeValue('red.50', 'red.900');
  const blueBg = useColorModeValue('blue.50', 'blue.900');
  const purpleBg = useColorModeValue('purple.50', 'purple.900');
  
  // Initialize sample strategic planning data
  useEffect(() => {
    generateSampleStrategicData();
  }, []);
  
  const generateSampleStrategicData = useCallback(() => {
    const samplePlan: StrategicPlan = {
      id: 'plan-001',
      name: 'Digital Transformation & Market Leadership 2024-2027',
      vision: 'To become the leading digital-first company in our industry, delivering exceptional customer value through innovation and operational excellence',
      mission: 'Transform our organization through digital innovation, organizational excellence, and strategic market positioning',
      timeHorizon: '3 years',
      status: 'active',
      strategicThemes: [
        {
          id: 'theme-001',
          name: 'Digital Innovation & Technology Leadership',
          description: 'Establish technology leadership through digital transformation and innovation capabilities',
          priority: 'critical',
          strategicFocus: 'innovation',
          objectives: ['obj-001', 'obj-002'],
          ownerRole: 'Chief Technology Officer',
          ownerId: 'emp-003',
          budget: 5000000,
          timeline: '24 months',
          dependencies: ['Organizational structure alignment', 'Talent acquisition'],
          kpis: [
            {
              id: 'kpi-001',
              name: 'Digital Maturity Index',
              target: 85,
              current: 65,
              unit: '%',
              frequency: 'quarterly',
              trend: 'improving',
              benchmarkPosition: 70
            }
          ],
          progress: 35,
          status: 'in_progress'
        },
        {
          id: 'theme-002',
          name: 'Organizational Excellence & Agility',
          description: 'Build organizational capabilities for speed, agility, and operational excellence',
          priority: 'critical',
          strategicFocus: 'operational_excellence',
          objectives: ['obj-003', 'obj-004'],
          ownerRole: 'Chief Operating Officer',
          ownerId: 'emp-002',
          budget: 3000000,
          timeline: '18 months',
          dependencies: ['Leadership development', 'Process optimization'],
          kpis: [
            {
              id: 'kpi-002',
              name: 'Organizational Agility Score',
              target: 80,
              current: 58,
              unit: '%',
              frequency: 'quarterly',
              trend: 'improving',
              benchmarkPosition: 65
            }
          ],
          progress: 42,
          status: 'in_progress'
        },
        {
          id: 'theme-003',
          name: 'Market Expansion & Customer Excellence',
          description: 'Expand market presence and achieve customer excellence across all touchpoints',
          priority: 'high',
          strategicFocus: 'market_expansion',
          objectives: ['obj-005', 'obj-006'],
          ownerRole: 'Chief Revenue Officer',
          ownerId: 'emp-004',
          budget: 4000000,
          timeline: '36 months',
          dependencies: ['Product development', 'Sales capability building'],
          kpis: [
            {
              id: 'kpi-003',
              name: 'Market Share Growth',
              target: 25,
              current: 18,
              unit: '%',
              frequency: 'quarterly',
              trend: 'improving',
              benchmarkPosition: 80
            }
          ],
          progress: 28,
          status: 'in_progress'
        }
      ],
      objectives: [
        {
          id: 'obj-001',
          themeId: 'theme-001',
          title: 'Establish AI-Driven Product Innovation Capability',
          description: 'Build comprehensive AI and machine learning capabilities to drive next-generation product innovation',
          type: 'learning_growth',
          priority: 'critical',
          timeframe: 'medium_term',
          measurableOutcomes: [
            'AI-powered product features launched',
            'Innovation cycle time reduced by 40%',
            'Customer satisfaction improvement of 25%'
          ],
          successCriteria: [
            'AI/ML team established and operational',
            'Innovation pipeline filled with AI-driven initiatives',
            'Customer adoption of AI features >70%'
          ],
          keyResults: ['kr-001', 'kr-002', 'kr-003'],
          ownerRole: 'Chief Technology Officer',
          ownerId: 'emp-003',
          supportingRoles: ['VP Engineering', 'VP Product', 'VP Data Science'],
          budget: 2500000,
          resourceRequirements: [
            {
              type: 'human',
              description: 'AI/ML specialists and data scientists',
              quantity: 15,
              cost: 1800000,
              timeline: '12 months',
              criticality: 'must_have'
            },
            {
              type: 'technology',
              description: 'AI/ML infrastructure and tools',
              quantity: 1,
              cost: 500000,
              timeline: '6 months',
              criticality: 'must_have'
            }
          ],
          dependencies: [
            {
              dependsOn: 'Data infrastructure modernization',
              type: 'sequential',
              criticality: 'blocking',
              description: 'Requires modern data platform for AI/ML operations'
            }
          ],
          risks: ['Talent acquisition challenges', 'Technology integration complexity', 'Customer adoption uncertainty'],
          progress: 40,
          status: 'in_progress',
          organizationalImpact: {
            affectedPositions: ['pos-003', 'pos-007', 'pos-008'],
            newRolesRequired: [
              {
                title: 'Director of AI/ML',
                department: 'Engineering',
                level: 3,
                reportingTo: 'pos-003',
                responsibilities: ['AI strategy', 'ML operations', 'Innovation leadership'],
                requiredSkills: ['Machine Learning', 'Product Strategy', 'Team Leadership'],
                timeline: '3 months',
                budgetImpact: 250000
              },
              {
                title: 'Senior Data Scientist',
                department: 'Engineering',
                level: 4,
                reportingTo: 'pos-009',
                responsibilities: ['Model development', 'Data analysis', 'Algorithm optimization'],
                requiredSkills: ['Python', 'TensorFlow', 'Statistical Analysis'],
                timeline: '6 months',
                budgetImpact: 150000
              }
            ],
            skillRequirements: [
              {
                skill: 'Machine Learning',
                currentLevel: 2,
                targetLevel: 4,
                affectedEmployees: 25,
                developmentPlan: 'AI/ML training program and certification',
                timeline: '12 months',
                cost: 200000
              },
              {
                skill: 'Data Science',
                currentLevel: 3,
                targetLevel: 4,
                affectedEmployees: 15,
                developmentPlan: 'Advanced analytics training',
                timeline: '9 months',
                cost: 150000
              }
            ],
            structuralChanges: [
              {
                type: 'new_department',
                description: 'Create AI/ML Center of Excellence',
                affectedPositions: ['pos-003'],
                timeline: '6 months',
                riskLevel: 'medium',
                changeImpact: 'Enhanced innovation capability and technical leadership'
              }
            ],
            culturalRequirements: [
              {
                aspect: 'values',
                currentState: 'Traditional engineering focus',
                targetState: 'Innovation and experimentation mindset',
                gap: 'Lack of risk tolerance and experimental approach',
                interventions: ['Innovation workshops', 'Fail-fast methodologies', 'Innovation time allocation'],
                timeline: '12 months',
                measurementCriteria: ['Innovation proposals submitted', 'Experimentation rate', 'Learning from failures']
              }
            ],
            changeManagement: {
              strategy: 'Phased introduction with early wins and continuous learning',
              stakeholderAnalysis: [
                {
                  stakeholder: 'Engineering team',
                  influence: 'high',
                  interest: 'high',
                  attitude: 'supporter',
                  strategy: 'Engage as innovation champions',
                  engagementPlan: ['Technical training', 'Innovation challenges', 'Recognition programs']
                },
                {
                  stakeholder: 'Product team',
                  influence: 'high',
                  interest: 'high',
                  attitude: 'champion',
                  strategy: 'Collaborate on AI-driven product roadmap',
                  engagementPlan: ['Joint planning sessions', 'Customer research', 'Success metrics alignment']
                }
              ],
              communicationPlan: [
                {
                  audience: 'All employees',
                  message: 'AI transformation strategy and benefits',
                  channel: 'All-hands meetings',
                  frequency: 'Monthly',
                  owner: 'Chief Technology Officer',
                  timeline: 'Ongoing'
                }
              ],
              trainingRequirements: [
                {
                  audience: 'Engineering team',
                  trainingType: 'technical',
                  content: 'AI/ML fundamentals and application development',
                  delivery: 'blended',
                  duration: '40 hours',
                  cost: 100000,
                  timeline: '6 months'
                }
              ],
              resistanceFactors: [
                {
                  factor: 'Technical complexity concerns',
                  probability: 'medium',
                  impact: 'medium',
                  mitigation: ['Hands-on training', 'Mentorship programs', 'Gradual skill building'],
                  owner: 'VP Engineering'
                }
              ],
              successFactors: ['Leadership commitment', 'Employee engagement', 'Quick wins', 'Continuous learning'],
              timeline: '18 months',
              budget: 500000
            }
          }
        }
      ],
      initiatives: [
        {
          id: 'init-001',
          objectiveId: 'obj-001',
          name: 'AI/ML Center of Excellence Establishment',
          description: 'Create and operationalize a center of excellence for AI and machine learning capabilities',
          type: 'program',
          scope: 'company_wide',
          priority: 'critical',
          budget: 1500000,
          timeline: {
            startDate: '2024-04-01',
            endDate: '2024-12-31',
            phases: [
              {
                name: 'Foundation',
                startDate: '2024-04-01',
                endDate: '2024-06-30',
                deliverables: ['Team structure', 'Initial hiring', 'Tool evaluation'],
                resources: ['HR', 'IT', 'Executive team'],
                dependencies: ['Budget approval', 'Org structure approval']
              },
              {
                name: 'Build',
                startDate: '2024-07-01',
                endDate: '2024-10-31',
                deliverables: ['AI platform', 'Initial models', 'Training programs'],
                resources: ['AI team', 'Engineering', 'Data team'],
                dependencies: ['Infrastructure', 'Data access']
              },
              {
                name: 'Launch',
                startDate: '2024-11-01',
                endDate: '2024-12-31',
                deliverables: ['Production models', 'Feature releases', 'Success metrics'],
                resources: ['Product team', 'Marketing', 'Customer success'],
                dependencies: ['Model validation', 'Customer feedback']
              }
            ],
            criticalPath: ['Team hiring', 'Infrastructure setup', 'Model development', 'Product integration']
          },
          team: {
            projectManager: 'emp-010',
            sponsor: 'emp-003',
            stakeholders: ['emp-001', 'emp-002', 'emp-004'],
            coreTeam: [
              {
                employeeId: 'emp-011',
                role: 'AI Lead',
                commitment: 100,
                skills: ['Machine Learning', 'Team Leadership'],
                responsibilities: ['Technical direction', 'Team building']
              },
              {
                employeeId: 'emp-012',
                role: 'Data Scientist',
                commitment: 80,
                skills: ['Python', 'Statistics', 'ML'],
                responsibilities: ['Model development', 'Data analysis']
              }
            ],
            extendedTeam: [
              {
                employeeId: 'emp-013',
                role: 'DevOps Engineer',
                commitment: 50,
                skills: ['Infrastructure', 'MLOps'],
                responsibilities: ['Platform setup', 'Deployment automation']
              }
            ],
            externalPartners: ['AI consulting firm', 'Cloud provider']
          },
          deliverables: [
            {
              id: 'del-001',
              name: 'AI/ML Platform Architecture',
              description: 'Comprehensive architecture for AI/ML development and deployment',
              type: 'document',
              dueDate: '2024-06-30',
              owner: 'emp-011',
              status: 'in_progress',
              dependencies: ['Infrastructure assessment'],
              acceptanceCriteria: ['Scalability requirements met', 'Security compliance', 'Cost optimization']
            }
          ],
          milestones: [
            {
              id: 'mil-001',
              name: 'AI Team Established',
              date: '2024-06-30',
              description: 'Core AI/ML team hired and onboarded',
              criteria: ['All key roles filled', 'Team training completed'],
              status: 'upcoming',
              impact: 'critical'
            },
            {
              id: 'mil-002',
              name: 'First AI Model in Production',
              date: '2024-10-31',
              description: 'First AI-powered feature deployed to customers',
              criteria: ['Model performance targets met', 'Customer feedback positive'],
              status: 'upcoming',
              impact: 'high'
            }
          ],
          risks: [
            {
              id: 'risk-001',
              description: 'Difficulty hiring qualified AI talent',
              probability: 'high',
              impact: 'high',
              category: 'resource',
              mitigation: ['Competitive compensation', 'Remote work options', 'Partner with universities'],
              contingency: ['External consultants', 'Phased hiring approach'],
              owner: 'emp-010',
              status: 'being_managed'
            }
          ],
          dependencies: ['Data infrastructure upgrade', 'Security compliance review'],
          success_criteria: [
            'AI platform operational',
            'Team productivity >80%',
            'Customer satisfaction with AI features >75%'
          ],
          progress: 25,
          status: 'in_progress',
          organizationalChanges: [
            {
              type: 'role_creation',
              description: 'New AI/ML leadership roles and team structure',
              affectedAreas: ['Engineering', 'Product', 'Data'],
              timeline: '6 months',
              changeLeader: 'emp-003',
              impact: 'significant',
              readinessAssessment: {
                organizationalReadiness: 75,
                technicalReadiness: 80,
                culturalReadiness: 70,
                resourceReadiness: 85,
                stakeholderReadiness: 80,
                overallReadiness: 78,
                gapAnalysis: ['Cultural shift to experimentation', 'Technical skill development'],
                recommendations: ['Innovation training', 'AI literacy programs']
              }
            }
          ]
        }
      ],
      keyResults: [
        {
          id: 'kr-001',
          objectiveId: 'obj-001',
          description: 'Deploy 3 AI-powered product features to production',
          target: 3,
          current: 1,
          unit: 'features',
          dueDate: '2024-12-31',
          owner: 'emp-011',
          status: 'in_progress',
          updateFrequency: 'monthly',
          lastUpdated: '2024-03-15',
          trend: 'improving',
          confidence: 75
        },
        {
          id: 'kr-002',
          objectiveId: 'obj-001',
          description: 'Achieve 80% customer satisfaction with AI features',
          target: 80,
          current: 0,
          unit: '%',
          dueDate: '2024-12-31',
          owner: 'emp-004',
          status: 'not_started',
          updateFrequency: 'monthly',
          lastUpdated: '2024-03-15',
          trend: 'stable',
          confidence: 60
        }
      ],
      stakeholders: [
        {
          id: 'stake-001',
          name: 'Board of Directors',
          role: 'Governance',
          type: 'internal',
          influence: 'high',
          interest: 'high',
          expectations: ['Strategic value delivery', 'Risk management', 'ROI achievement'],
          engagementStrategy: 'Quarterly business reviews with detailed progress reports',
          communicationPreference: 'Executive summaries and board presentations',
          lastEngagement: '2024-03-01'
        },
        {
          id: 'stake-002',
          name: 'Customer Advisory Board',
          role: 'Customer Representative',
          type: 'external',
          influence: 'medium',
          interest: 'high',
          expectations: ['Product value enhancement', 'User experience improvement'],
          engagementStrategy: 'Monthly feedback sessions and beta testing participation',
          communicationPreference: 'Product demos and direct feedback sessions',
          lastEngagement: '2024-03-10'
        }
      ],
      risks: [
        {
          id: 'risk-001',
          title: 'AI Talent Shortage',
          description: 'Difficulty in recruiting and retaining qualified AI/ML talent in competitive market',
          category: 'operational',
          probability: 'high',
          impact: 'high',
          riskScore: 80,
          proximity: 'immediate',
          affectedObjectives: ['obj-001'],
          currentControls: ['Competitive compensation', 'Remote work flexibility'],
          additionalMitigation: ['University partnerships', 'Internal training programs', 'Contractor relationships'],
          contingencyPlans: ['External consulting partnerships', 'Phased implementation approach'],
          owner: 'emp-003',
          reviewDate: '2024-04-01',
          status: 'being_managed',
          organizationalImpact: {
            affectedPositions: ['pos-003', 'pos-009'],
            potentialRestructuring: false,
            skillImpacts: ['AI/ML expertise gap', 'Technical leadership capacity'],
            processChanges: ['Hiring process optimization', 'Retention program enhancement'],
            culturalImplications: ['Innovation culture development', 'Learning mindset promotion'],
            resourceRedirection: true
          }
        }
      ],
      resources: [
        {
          category: 'financial',
          allocated: 12000000,
          utilized: 3500000,
          remaining: 8500000,
          unit: 'USD',
          allocation_by_theme: [
            { themeId: 'theme-001', themeName: 'Digital Innovation', allocation: 5000000, utilization: 1500000, variance: -1000000 },
            { themeId: 'theme-002', themeName: 'Organizational Excellence', allocation: 3000000, utilization: 1000000, variance: -500000 },
            { themeId: 'theme-003', themeName: 'Market Expansion', allocation: 4000000, utilization: 1000000, variance: -2000000 }
          ],
          allocation_by_timeline: [
            { period: 'Q1 2024', planned: 2000000, actual: 1800000, forecast: 1800000 },
            { period: 'Q2 2024', planned: 3000000, actual: 0, forecast: 2800000 },
            { period: 'Q3 2024', planned: 3500000, actual: 0, forecast: 3200000 },
            { period: 'Q4 2024', planned: 3500000, actual: 0, forecast: 3200000 }
          ],
          constraints: ['Budget approval cycles', 'Talent availability', 'Technology procurement timelines'],
          optimization_opportunities: ['Resource sharing across themes', 'Vendor consolidation', 'Internal capability building']
        },
        {
          category: 'human',
          allocated: 45,
          utilized: 28,
          remaining: 17,
          unit: 'FTE',
          allocation_by_theme: [
            { themeId: 'theme-001', themeName: 'Digital Innovation', allocation: 20, utilization: 12, variance: -8 },
            { themeId: 'theme-002', themeName: 'Organizational Excellence', allocation: 15, utilization: 10, variance: -5 },
            { themeId: 'theme-003', themeName: 'Market Expansion', allocation: 10, utilization: 6, variance: -4 }
          ],
          allocation_by_timeline: [
            { period: 'Q1 2024', planned: 25, actual: 20, forecast: 28 },
            { period: 'Q2 2024', planned: 35, actual: 0, forecast: 32 },
            { period: 'Q3 2024', planned: 40, actual: 0, forecast: 38 },
            { period: 'Q4 2024', planned: 45, actual: 0, forecast: 42 }
          ],
          constraints: ['Hiring challenges', 'Skill gaps', 'Competing priorities'],
          optimization_opportunities: ['Cross-training programs', 'Internal mobility', 'Contractor utilization']
        }
      ],
      timeline: {
        startDate: '2024-01-01',
        endDate: '2026-12-31',
        reviewCycles: [
          {
            type: 'monthly',
            participants: ['Theme owners', 'PMO', 'Executive team'],
            agenda: ['Progress review', 'Risk assessment', 'Resource needs'],
            decisions: ['Scope adjustments', 'Resource reallocation'],
            nextReview: '2024-04-15'
          },
          {
            type: 'quarterly',
            participants: ['Executive team', 'Board members', 'Key stakeholders'],
            agenda: ['Strategic alignment', 'Performance review', 'Market assessment'],
            decisions: ['Strategic adjustments', 'Investment decisions'],
            nextReview: '2024-06-30'
          }
        ],
        majorMilestones: [
          {
            id: 'mile-001',
            name: 'Digital Foundation Complete',
            date: '2024-12-31',
            description: 'Core digital infrastructure and capabilities established',
            success_criteria: ['AI platform operational', 'Digital processes implemented', 'Team capabilities built'],
            dependencies: ['Technology deployment', 'Training completion', 'Process optimization'],
            organizational_readiness: {
              structureReadiness: 80,
              skillReadiness: 75,
              cultureReadiness: 70,
              systemReadiness: 85,
              overallReadiness: 78,
              gaps: ['Cultural adaptation', 'Advanced skill development'],
              actions: ['Change management intensification', 'Advanced training programs']
            }
          }
        ],
        phases: [
          {
            name: 'Foundation Building',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            objectives: ['obj-001', 'obj-003'],
            deliverables: ['AI platform', 'Organizational structure', 'Process framework'],
            organizationalChanges: ['New roles creation', 'Skill development', 'Cultural shift initiation'],
            successCriteria: ['Platform operational', 'Team established', 'Initial results achieved']
          },
          {
            name: 'Scale and Optimize',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            objectives: ['obj-002', 'obj-004', 'obj-005'],
            deliverables: ['Advanced capabilities', 'Optimized processes', 'Market expansion'],
            organizationalChanges: ['Structure refinement', 'Advanced skill building', 'Culture embedding'],
            successCriteria: ['Capabilities mature', 'Efficiency gains', 'Market position improved']
          },
          {
            name: 'Market Leadership',
            startDate: '2026-01-01',
            endDate: '2026-12-31',
            objectives: ['obj-006'],
            deliverables: ['Market leadership', 'Innovation excellence', 'Sustainable advantage'],
            organizationalChanges: ['Excellence institutionalization', 'Innovation culture', 'Leadership development'],
            successCriteria: ['Market leadership achieved', 'Sustainable competitive advantage', 'Innovation pipeline']
          }
        ],
        criticalPath: ['AI capability building', 'Organizational transformation', 'Market positioning', 'Cultural evolution']
      },
      governance: {
        structure: {
          steeringCommittee: ['emp-001', 'emp-002', 'emp-003', 'emp-004'],
          executionTeams: [
            {
              name: 'Digital Innovation Team',
              leader: 'emp-003',
              members: ['emp-011', 'emp-012', 'emp-013'],
              scope: ['AI development', 'Technology innovation', 'Digital transformation'],
              responsibilities: ['Platform development', 'Innovation pipeline', 'Technical excellence'],
              reportingTo: 'Steering Committee'
            }
          ],
          reviewBoards: [
            {
              name: 'Investment Review Board',
              chair: 'emp-001',
              members: ['emp-002', 'emp-003', 'emp-004'],
              frequency: 'Monthly',
              scope: ['Budget allocation', 'Investment decisions', 'Resource optimization'],
              decisions: ['Funding approvals', 'Resource reallocation', 'Priority adjustments']
            }
          ],
          workingGroups: [
            {
              name: 'Organizational Change Working Group',
              lead: 'emp-002',
              members: ['HR Director', 'Change Manager', 'Department Heads'],
              purpose: 'Coordinate organizational changes across the transformation',
              deliverables: ['Change plans', 'Communication strategies', 'Training programs'],
              timeline: 'Ongoing'
            }
          ]
        },
        roles: [
          {
            title: 'Transformation Sponsor',
            responsibilities: ['Strategic direction', 'Resource allocation', 'Stakeholder engagement'],
            authority: ['Budget approval', 'Priority setting', 'Escalation resolution'],
            accountability: ['Transformation success', 'ROI achievement', 'Risk management'],
            reportingTo: 'Board of Directors',
            keyDecisions: ['Strategic direction', 'Investment priorities', 'Major changes']
          }
        ],
        processes: [
          {
            name: 'Monthly Progress Review',
            description: 'Regular assessment of transformation progress and adjustments',
            inputs: ['Progress reports', 'KPI data', 'Risk assessments'],
            outputs: ['Action plans', 'Resource decisions', 'Communication updates'],
            participants: ['Theme owners', 'PMO', 'Executive team'],
            timeline: 'Monthly',
            tools: ['Dashboard', 'Status reports', 'Risk register']
          }
        ],
        reporting: {
          dashboards: [
            {
              name: 'Transformation Executive Dashboard',
              audience: ['Executive team', 'Board members'],
              frequency: 'Real-time',
              metrics: ['Overall progress', 'Theme status', 'Key risks', 'Resource utilization'],
              visualizations: ['Progress charts', 'Risk heatmaps', 'Resource allocation'],
              access: 'Executive portal'
            }
          ],
          reports: [
            {
              name: 'Monthly Transformation Report',
              audience: ['Stakeholders', 'Department heads'],
              frequency: 'Monthly',
              content: ['Progress summary', 'Key achievements', 'Upcoming milestones', 'Risk updates'],
              format: 'PDF report',
              distribution: 'Email and portal'
            }
          ],
          meetings: [
            {
              name: 'Transformation Steering Committee',
              participants: ['Executive team', 'Theme owners'],
              frequency: 'Monthly',
              agenda: ['Progress review', 'Decision items', 'Risk assessment'],
              decisions: ['Resource allocation', 'Priority changes', 'Escalation resolution'],
              followUp: ['Action items', 'Communication updates']
            }
          ],
          escalationTriggers: ['Red status on critical themes', 'Major risk materialization', 'Budget variance >20%']
        },
        decisionRights: [
          {
            decision_type: 'Budget allocation',
            decision_maker: 'Steering Committee',
            consultWith: ['Finance', 'Theme owners'],
            informStakeholders: ['Department heads', 'PMO'],
            escalation_criteria: ['Budget variance >10%', 'Resource conflicts']
          }
        ],
        escalationPaths: [
          {
            trigger: 'Critical risk materialization',
            from: 'Theme owner',
            to: 'Steering Committee',
            timeline: '24 hours',
            process: ['Risk assessment', 'Impact analysis', 'Mitigation planning'],
            resolution_criteria: ['Risk mitigation approved', 'Resources allocated']
          }
        ]
      },
      performance: {
        overallProgress: 38,
        themeProgress: [
          {
            themeId: 'theme-001',
            themeName: 'Digital Innovation & Technology Leadership',
            progress: 35,
            status: 'in_progress',
            keyAchievements: ['AI team formation started', 'Technology stack evaluation completed'],
            challenges: ['Talent acquisition difficulties', 'Integration complexity'],
            nextActions: ['Accelerate hiring', 'Simplify integration approach']
          },
          {
            themeId: 'theme-002',
            themeName: 'Organizational Excellence & Agility',
            progress: 42,
            status: 'on_track',
            keyAchievements: ['Process optimization framework implemented', 'Agility training launched'],
            challenges: ['Cultural resistance in some areas', 'Change fatigue'],
            nextActions: ['Intensify change management', 'Celebrate early wins']
          },
          {
            themeId: 'theme-003',
            themeName: 'Market Expansion & Customer Excellence',
            progress: 28,
            status: 'at_risk',
            keyAchievements: ['Market research completed', 'Customer segmentation refined'],
            challenges: ['Competitive pressures', 'Resource constraints'],
            nextActions: ['Accelerate go-to-market', 'Reallocate resources']
          }
        ],
        objectiveProgress: [
          {
            objectiveId: 'obj-001',
            objectiveTitle: 'Establish AI-Driven Product Innovation Capability',
            progress: 40,
            status: 'in_progress',
            keyResults: [
              {
                id: 'kr-001',
                objectiveId: 'obj-001',
                description: 'Deploy 3 AI-powered product features to production',
                target: 3,
                current: 1,
                unit: 'features',
                dueDate: '2024-12-31',
                owner: 'emp-011',
                status: 'in_progress',
                updateFrequency: 'monthly',
                lastUpdated: '2024-03-15',
                trend: 'improving',
                confidence: 75
              }
            ],
            organizationalAlignment: 82
          }
        ],
        kpiPerformance: [
          {
            kpiId: 'kpi-001',
            kpiName: 'Digital Maturity Index',
            target: 85,
            actual: 65,
            variance: -20,
            trend: 'improving',
            forecast: 78,
            organizationalImpact: 'Moderate - requires acceleration of digital capability building'
          }
        ],
        milestoneAchievement: {
          achieved: 2,
          missed: 0,
          upcoming: 8,
          atRisk: 1,
          impactOnPlan: 'On track with minor adjustments needed'
        },
        riskStatus: {
          openRisks: 5,
          closedRisks: 2,
          newRisks: 1,
          escalatedRisks: 1,
          overallRiskLevel: 'medium'
        },
        resourceUtilization: {
          human: 62,
          financial: 29,
          technology: 45,
          infrastructure: 38,
          efficiency: 73,
          constraints: ['Talent availability', 'Budget timing', 'Integration dependencies']
        },
        stakeholderSatisfaction: [
          {
            stakeholder: 'Board of Directors',
            satisfaction: 78,
            engagement: 85,
            feedback: ['Progress is encouraging', 'Need more focus on ROI'],
            concerns: ['Timeline pressure', 'Market competition']
          },
          {
            stakeholder: 'Customer Advisory Board',
            satisfaction: 82,
            engagement: 90,
            feedback: ['Excited about AI features', 'Want faster delivery'],
            concerns: ['Feature complexity', 'Learning curve']
          }
        ],
        organizationalHealth: {
          alignment: 82,
          engagement: 78,
          capability: 75,
          culture: 72,
          leadership: 88,
          overallHealth: 79,
          improvements: ['Culture adaptation acceleration', 'Capability building focus'],
          risks: ['Change fatigue', 'Skill gap persistence']
        }
      },
      organizationalAlignment: {
        structureAlignment: {
          currentFit: 72,
          targetFit: 88,
          gaps: ['AI leadership structure', 'Cross-functional coordination', 'Decision speed'],
          requiredChanges: [
            {
              type: 'new_department',
              description: 'Create AI Center of Excellence',
              affectedPositions: ['pos-003'],
              timeline: '6 months',
              riskLevel: 'medium',
              changeImpact: 'Enhanced innovation capability and technical leadership'
            }
          ],
          timeline: '12 months',
          impact: 'Significant improvement in innovation capability and decision speed'
        },
        roleAlignment: [
          {
            roleId: 'pos-003',
            roleName: 'Chief Technology Officer',
            strategicContribution: 95,
            currentAlignment: 85,
            targetAlignment: 95,
            developmentNeeds: ['AI strategy leadership', 'Innovation portfolio management'],
            changesRequired: ['Expand scope to include AI strategy', 'Add innovation metrics']
          }
        ],
        skillAlignment: [
          {
            skill: 'Artificial Intelligence',
            strategicImportance: 95,
            currentLevel: 2,
            targetLevel: 4,
            gap: 2,
            affectedRoles: ['pos-003', 'pos-007', 'pos-008'],
            developmentPlan: 'Comprehensive AI training and hiring program'
          },
          {
            skill: 'Change Management',
            strategicImportance: 85,
            currentLevel: 3,
            targetLevel: 4,
            gap: 1,
            affectedRoles: ['pos-002', 'pos-004'],
            developmentPlan: 'Advanced change leadership development'
          }
        ],
        cultureAlignment: {
          currentCulture: ['Engineering excellence', 'Process focus', 'Risk aversion'],
          targetCulture: ['Innovation excellence', 'Customer focus', 'Experimentation'],
          alignmentScore: 72,
          culturalShifts: [
            {
              from: 'Risk aversion',
              to: 'Calculated risk-taking',
              importance: 'critical',
              difficulty: 'hard',
              timeline: '18 months',
              interventions: ['Innovation time', 'Failure celebration', 'Experimentation rewards']
            }
          ],
          interventions: [
            {
              intervention: 'Innovation Culture Program',
              target: 'All employees',
              method: 'Training, workshops, recognition',
              timeline: '12 months',
              success_criteria: ['Innovation proposals increase', 'Experimentation rate up', 'Risk tolerance improved'],
              owner: 'Chief Human Resources Officer'
            }
          ],
          timeline: '24 months'
        },
        processAlignment: [
          {
            process: 'Product Development',
            currentEffectiveness: 78,
            targetEffectiveness: 90,
            strategicContribution: 92,
            improvementNeeds: ['AI integration', 'Agile enhancement', 'Customer feedback loops'],
            timeline: '12 months'
          }
        ],
        systemAlignment: [
          {
            system: 'Data Platform',
            currentCapability: 65,
            targetCapability: 90,
            strategicEnablement: 95,
            upgradeNeeds: ['AI/ML capabilities', 'Real-time processing', 'Advanced analytics'],
            timeline: '9 months',
            investment: 800000
          }
        ],
        leadershipAlignment: {
          overallAlignment: 88,
          leadershipCapabilities: [
            {
              capability: 'Digital Leadership',
              currentLevel: 3,
              targetLevel: 4,
              strategicImportance: 95,
              developmentPlan: 'Digital transformation leadership program',
              timeline: '12 months'
            }
          ],
          developmentNeeds: ['AI literacy', 'Innovation leadership', 'Change leadership'],
          successionReadiness: 75,
          culturalModeling: 82
        }
      },
      frameworkIntegration: {
        blueOcean: {
          eliminateFactors: ['Legacy manual processes', 'Redundant approval layers', 'Siloed decision making'],
          reduceFactors: ['Time to market', 'Development costs', 'Operational complexity'],
          raiseFactors: ['Innovation speed', 'Customer experience', 'Data-driven decisions'],
          createFactors: ['AI-powered insights', 'Predictive capabilities', 'Automated optimization'],
          valueInnovation: [
            {
              innovation: 'AI-powered customer insights',
              valueIncrease: 40,
              costReduction: 25,
              organizationalRequirement: ['AI team', 'Data platform', 'Analytics capability'],
              timeline: '12 months'
            }
          ],
          marketSpace: 'transitioning',
          competitionRelevance: 65
        },
        porter: {
          competitivePosition: 'differentiation',
          valueChainOptimization: [
            {
              activity: 'Research & Development',
              currentPerformance: 75,
              targetPerformance: 90,
              improvementActions: ['AI integration', 'Innovation processes', 'Customer research'],
              organizationalImplications: ['R&D team expansion', 'New capabilities', 'Process changes']
            }
          ],
          fiveForces: [
            {
              force: 'Rivalry Among Competitors',
              intensity: 'high',
              strategicResponse: ['Differentiation strategy', 'Innovation focus', 'Customer lock-in'],
              organizationalRequirements: ['Innovation capability', 'Customer success teams', 'Agile processes']
            }
          ],
          competitiveAdvantage: ['Technology innovation', 'Customer experience', 'Operational efficiency'],
          sustainabilityFactors: ['Continuous innovation', 'Learning capability', 'Customer relationships']
        },
        mckinsey7S: {
          alignmentScore: 82,
          hardElementChanges: [
            {
              element: 'structure',
              currentState: 'Traditional functional structure',
              targetState: 'Innovation-enabled matrix structure',
              timeline: '12 months',
              organizationalImpact: ['New roles', 'Reporting changes', 'Decision rights']
            }
          ],
          softElementChanges: [
            {
              element: 'skills',
              currentState: 'Traditional technical skills',
              targetState: 'AI and innovation skills',
              timeline: '18 months',
              interventions: ['Training programs', 'Hiring strategy', 'Knowledge management']
            }
          ],
          integrationPlan: ['Structure first', 'Skills development', 'Culture evolution', 'Style adaptation'],
          sequencing: ['Hard elements foundation', 'Soft elements transformation', 'Integration and optimization']
        },
        rbv: {
          resources: [
            {
              resource: 'AI Capability',
              type: 'intangible',
              strategic_value: 95,
              current_strength: 3,
              target_strength: 5,
              development_plan: ['Team building', 'Technology platform', 'Process development']
            }
          ],
          capabilities: [
            {
              capability: 'Innovation Management',
              current_maturity: 3,
              target_maturity: 5,
              strategic_importance: 90,
              development_actions: ['Process development', 'Tool implementation', 'Culture building'],
              organizational_requirements: ['Innovation team', 'Funding process', 'Measurement system']
            }
          ],
          vrioAnalysis: [
            {
              resource: 'AI Capability',
              valuable: true,
              rare: true,
              imitable: false,
              organized: false,
              competitive_implication: 'Temporary competitive advantage',
              development_priority: 'critical'
            }
          ],
          competitiveAdvantage: ['AI innovation', 'Customer insights', 'Operational optimization'],
          resourceDevelopment: [
            {
              resource: 'AI Capability',
              development_approach: 'Build internally with external partnerships',
              timeline: '18 months',
              investment: 2500000,
              organizational_changes: ['New team structure', 'Process changes', 'Culture development'],
              success_metrics: ['Technical capability', 'Business impact', 'Innovation rate']
            }
          ]
        },
        christensen: {
          disruptionAssessment: {
            disruptionRisk: 'medium',
            disruptionSources: ['AI technology', 'New business models', 'Changing customer expectations'],
            timeHorizon: '3-5 years',
            preparationActions: ['Innovation capability', 'Agility building', 'Customer focus'],
            organizationalReadiness: 72
          },
          innovationOpportunities: [
            {
              opportunity: 'AI-powered customer experience',
              type: 'sustaining',
              potential_impact: 85,
              organizational_requirements: ['AI team', 'Customer data platform', 'Process redesign'],
              timeline: '12 months',
              investment: 1500000
            }
          ],
          adaptationStrategies: [
            {
              strategy: 'Innovation-first approach',
              triggers: ['Technology advancement', 'Customer demand shift', 'Competitive pressure'],
              actions: ['Accelerate innovation', 'Customer research', 'Technology adoption'],
              organizational_changes: ['Innovation structure', 'Risk tolerance', 'Speed emphasis'],
              timeline: '18 months'
            }
          ],
          organizationalAgility: {
            current_agility: 65,
            target_agility: 85,
            improvement_areas: ['Decision speed', 'Change capability', 'Learning rate'],
            agility_initiatives: ['Agile processes', 'Empowerment', 'Rapid experimentation'],
            measurement_criteria: ['Decision time', 'Change success rate', 'Learning velocity']
          }
        },
        rumelt: {
          strategyKernel: {
            diagnosis: {
              criticalChallenge: 'Digital transformation in competitive market',
              rootCauses: ['Technology gap', 'Innovation deficit', 'Organizational inertia'],
              organizationalFactors: ['Traditional culture', 'Skill gaps', 'Process limitations'],
              marketFactors: ['Increasing competition', 'Technology disruption', 'Customer expectations'],
              competitiveFactors: ['Innovation pressure', 'Speed requirements', 'Capability gaps']
            },
            guidingPolicy: {
              approach: 'Innovation-led differentiation with organizational transformation',
              principles: ['Customer value', 'Technology excellence', 'Organizational agility'],
              constraints: ['Budget limitations', 'Timeline pressure', 'Change capacity'],
              tradeOffs: ['Speed vs. stability', 'Innovation vs. efficiency', 'Growth vs. optimization'],
              organizationalImplications: ['Structure changes', 'Culture evolution', 'Capability building']
            },
            coherentActions: [
              {
                action: 'Build AI innovation capability',
                rationale: 'Create competitive advantage through technology differentiation',
                organizationalRequirement: ['AI team', 'Technology platform', 'Innovation processes'],
                timeline: '18 months',
                success_criteria: ['AI capability operational', 'Innovation rate increased', 'Customer value delivered']
              }
            ]
          },
          goodStrategyElements: ['Clear diagnosis', 'Focused approach', 'Coherent actions', 'Realistic timeline'],
          badStrategyAvoidance: ['Avoid wishful thinking', 'No generic goals', 'Clear resource allocation'],
          focusAreas: [
            {
              area: 'AI Innovation',
              strategic_importance: 95,
              current_focus: 30,
              target_focus: 80,
              organizational_alignment: ['Structure', 'Resources', 'Culture', 'Processes']
            }
          ],
          leveragePoints: [
            {
              point: 'AI capability development',
              impact_potential: 90,
              effort_required: 80,
              organizational_enablers: ['Leadership commitment', 'Resource allocation', 'Culture change'],
              timeline: '18 months'
            }
          ]
        }
      },
      marketContext: {
        industryAnalysis: {
          growth_rate: 8.5,
          maturity: 'growth',
          concentration: 'consolidated',
          barriers_to_entry: 'medium',
          technology_change_pace: 'fast',
          key_success_factors: ['Innovation capability', 'Customer experience', 'Operational efficiency', 'Technology adoption']
        },
        customerSegments: [
          {
            segment: 'Enterprise Customers',
            size: 1000000000,
            growth_rate: 12,
            profitability: 85,
            needs: ['Efficiency', 'Innovation', 'Integration'],
            buying_behavior: ['Long evaluation cycles', 'Multiple stakeholders', 'ROI focus'],
            organizational_requirements: ['Enterprise sales team', 'Solution consulting', 'Customer success']
          }
        ],
        marketTrends: [
          {
            trend: 'AI adoption acceleration',
            impact: 'transformational',
            timeframe: 'immediate',
            organizational_implications: ['AI capability critical', 'Speed advantage', 'Innovation focus'],
            strategic_response: ['AI investment', 'Capability building', 'Innovation acceleration']
          }
        ],
        regulatoryEnvironment: [
          {
            regulation: 'AI governance standards',
            impact: 'medium',
            compliance_requirement: ['AI ethics framework', 'Transparency measures', 'Risk management'],
            organizational_changes: ['Governance structure', 'Compliance processes', 'Risk management'],
            timeline: '12 months'
          }
        ],
        economicFactors: [
          {
            factor: 'Technology investment climate',
            current_impact: 'positive',
            future_outlook: 'stable',
            strategic_implications: ['Funding availability', 'Talent competition', 'Market opportunity'],
            organizational_responses: ['Investment acceleration', 'Talent acquisition', 'Market expansion']
          }
        ],
        technologicalFactors: [
          {
            technology: 'Artificial Intelligence',
            adoption_stage: 'early_adoption',
            strategic_importance: 95,
            organizational_readiness: 40,
            investment_required: 2500000
          }
        ]
      },
      competitiveAnalysis: {
        directCompetitors: [
          {
            name: 'TechCorp Solutions',
            marketShare: 25,
            strengths: ['AI capabilities', 'Market presence', 'Customer base'],
            weaknesses: ['Innovation speed', 'Customer experience', 'Agility'],
            strategy: 'Technology leadership with scale advantages',
            organizationalCapabilities: ['Large R&D team', 'Established processes', 'Financial resources'],
            likelyMoves: ['AI investment increase', 'Acquisition strategy', 'Market expansion']
          }
        ],
        indirectCompetitors: [
          {
            name: 'StartupInnovator',
            marketShare: 5,
            strengths: ['Innovation speed', 'Agility', 'Customer focus'],
            weaknesses: ['Scale', 'Resources', 'Market presence'],
            strategy: 'Disruptive innovation with customer-centric approach',
            organizationalCapabilities: ['Innovation culture', 'Speed', 'Flexibility'],
            likelyMoves: ['Feature innovation', 'Niche focus', 'Partnership strategy']
          }
        ],
        competitivePosition: {
          overall_position: 'challenger',
          position_by_segment: [
            {
              segment: 'Enterprise',
              position: 'follower',
              market_share: 15,
              competitive_advantages: ['Customer service', 'Integration capability']
            }
          ],
          position_trends: 'Improving through innovation focus',
          strategic_groups: ['Technology leaders', 'Customer-focused challengers', 'Niche specialists']
        },
        competitiveAdvantages: [
          {
            advantage: 'Customer relationship depth',
            sustainability: 'high',
            source: 'differentiation',
            organizational_enablers: ['Customer success team', 'Service culture', 'Relationship processes'],
            reinforcement_needs: ['Continuous improvement', 'Innovation integration', 'Value demonstration']
          }
        ],
        vulnerabilities: [
          {
            vulnerability: 'Innovation speed',
            severity: 'high',
            likelihood: 'medium',
            mitigation_actions: ['AI capability building', 'Process optimization', 'Culture change'],
            organizational_requirements: ['Innovation team', 'Agile processes', 'Risk tolerance']
          }
        ],
        competitiveResponse: [
          {
            trigger: 'Competitor AI advancement',
            response_options: ['Accelerate AI development', 'Strategic partnership', 'Acquisition'],
            recommended_action: 'Accelerate AI development with strategic partnerships',
            organizational_readiness: 75,
            timeline: '6 months'
          }
        ]
      },
      lastUpdated: '2024-03-15T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      createdBy: 'emp-001'
    };
    
    setStrategicPlans([samplePlan]);
    setSelectedPlan(samplePlan);
    
    // Generate organizational impact analysis
    setOrganizationalImpact({
      structuralChanges: 12,
      newRoles: 8,
      skillDevelopment: 15,
      processChanges: 25,
      culturalShifts: 6,
      budgetImpact: 12000000,
      timelineImpact: 36,
      riskLevel: 'medium',
      changeReadiness: 78
    });
  }, []);
  
  const runStrategicAlignment = useCallback(async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const steps = [
      'Analyzing strategic objectives...',
      'Assessing organizational capabilities...',
      'Evaluating structural alignment...',
      'Measuring cultural fit...',
      'Calculating resource requirements...',
      'Generating alignment recommendations...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      
      toast({
        title: steps[i],
        status: 'info',
        duration: 1000,
        isClosable: true,
        position: 'top-right'
      });
    }
    
    setIsAnalyzing(false);
    
    toast({
      title: 'Strategic Alignment Analysis Complete',
      description: 'Generated comprehensive alignment insights and organizational impact assessment',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }, [toast]);
  
  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'gray';
      default: return 'gray';
    }
  }, []);
  
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'on_track': return 'green';
      case 'in_progress': return 'blue';
      case 'at_risk': return 'orange';
      case 'blocked': return 'red';
      case 'completed': return 'green';
      default: return 'gray';
    }
  }, []);
  
  const filteredPlans = useMemo(() => {
    return strategicPlans.filter(plan => {
      const matchesStatus = filterStatus === 'all' || plan.status === filterStatus;
      return matchesStatus;
    });
  }, [strategicPlans, filterStatus]);
  
  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between" align="center">
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Text fontSize="3xl" fontWeight="bold">
                      🎯 Strategic Planning Integration & Organizational Alignment
                    </Text>
                  </HStack>
                  <Text color="gray.600">
                    Comprehensive strategic planning with real-time organizational structure integration and framework alignment
                  </Text>
                  <HStack spacing={3} flexWrap="wrap">
                    <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                      📋 Active Plans: {strategicPlans.filter(p => p.status === 'active').length}
                    </Badge>
                    <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                      🎯 Overall Progress: {selectedPlan?.performance.overallProgress || 0}%
                    </Badge>
                    <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                      🏢 Org Alignment: {selectedPlan?.organizationalAlignment.structureAlignment.currentFit || 0}%
                    </Badge>
                    <Badge colorScheme="green" variant="subtle" fontSize="xs">
                      📊 Framework Integration: {selectedPlan?.frameworkIntegration.mckinsey7S.alignmentScore || 0}%
                    </Badge>
                    <Badge colorScheme="orange" variant="subtle" fontSize="xs">
                      🔄 Open Risks: {selectedPlan?.performance.riskStatus.openRisks || 0}
                    </Badge>
                  </HStack>
                </VStack>
                
                <VStack spacing={2} align="end">
                  <HStack spacing={2}>
                    {selectedPlan && (
                      <>
                        <CircularProgress 
                          value={selectedPlan.performance.overallProgress} 
                          color="purple.400"
                          size="60px"
                          thickness="8px"
                        >
                          <CircularProgressLabel fontSize="xs" fontWeight="bold">
                            {selectedPlan.performance.overallProgress}%
                          </CircularProgressLabel>
                        </CircularProgress>
                        
                        <CircularProgress 
                          value={selectedPlan.organizationalAlignment.structureAlignment.currentFit} 
                          color="blue.400"
                          size="60px"
                          thickness="8px"
                        >
                          <CircularProgressLabel fontSize="xs" fontWeight="bold">
                            {selectedPlan.organizationalAlignment.structureAlignment.currentFit}%
                          </CircularProgressLabel>
                        </CircularProgress>
                        
                        <CircularProgress 
                          value={selectedPlan.performance.organizationalHealth.overallHealth} 
                          color="green.400"
                          size="60px"
                          thickness="8px"
                        >
                          <CircularProgressLabel fontSize="xs" fontWeight="bold">
                            {selectedPlan.performance.organizationalHealth.overallHealth}%
                          </CircularProgressLabel>
                        </CircularProgress>
                      </>
                    )}
                  </HStack>
                  
                  <HStack spacing={2}>
                    <Menu>
                      <MenuButton as={Button} size="sm" variant="outline" rightIcon={<ChevronDownIcon />}>
                        Actions
                      </MenuButton>
                      <MenuList>
                        <MenuItem icon={<AddIcon />} onClick={onPlanModalOpen}>
                          Create Strategic Plan
                        </MenuItem>
                        <MenuItem icon={<ViewIcon />} onClick={onAlignmentModalOpen}>
                          Alignment Analysis
                        </MenuItem>
                        <MenuItem icon={<SettingsIcon />} onClick={onImpactModalOpen}>
                          Organizational Impact
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<RepeatIcon />} onClick={runStrategicAlignment} isDisabled={isAnalyzing}>
                          Run Alignment Analysis
                        </MenuItem>
                        <MenuItem icon={<DownloadIcon />}>
                          Export Strategic Report
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    
                    <Button 
                      leftIcon={<TrendingUpIcon />} 
                      colorScheme="purple" 
                      size="sm"
                      onClick={onAlignmentModalOpen}
                    >
                      Alignment Dashboard
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
              
              {/* Analysis Progress */}
              {isAnalyzing && (
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="semibold">Strategic Alignment Analysis in Progress...</Text>
                    <Text fontSize="sm" color="gray.600">{Math.round(analysisProgress)}%</Text>
                  </HStack>
                  <Progress value={analysisProgress} colorScheme="purple" size="sm" />
                </Box>
              )}
              
              {/* Controls */}
              <HStack spacing={4} align="center" flexWrap="wrap">
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">View:</Text>
                  <Select size="sm" value={viewMode} onChange={(e) => setViewMode(e.target.value as any)} w="140px">
                    <option value="overview">Overview</option>
                    <option value="detailed">Detailed</option>
                    <option value="alignment">Alignment</option>
                    <option value="execution">Execution</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Theme:</Text>
                  <Select size="sm" value={filterTheme} onChange={(e) => setFilterTheme(e.target.value)} w="180px">
                    <option value="all">All Themes</option>
                    <option value="innovation">Digital Innovation</option>
                    <option value="excellence">Organizational Excellence</option>
                    <option value="expansion">Market Expansion</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Status:</Text>
                  <Select size="sm" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} w="120px">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="completed">Completed</option>
                  </Select>
                </HStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs variant="enclosed" colorScheme="purple" index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>🎯 Strategic Overview</Tab>
            <Tab>🏢 Organizational Impact</Tab>
            <Tab>📊 Framework Integration</Tab>
            <Tab>⚡ Execution Dashboard</Tab>
            <Tab>🔄 Change Management</Tab>
            <Tab>📈 Performance Analytics</Tab>
          </TabList>

          <TabPanels>
            {/* Strategic Overview Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                {selectedPlan && (
                  <>
                    {/* Plan Overview */}
                    <Card bg={cardBg}>
                      <CardHeader>
                        <HStack justify="space-between">
                          <VStack align="start" spacing={1}>
                            <Text fontSize="lg" fontWeight="bold">{selectedPlan.name}</Text>
                            <Text fontSize="sm" color="gray.600">{selectedPlan.mission}</Text>
                            <HStack>
                              <Badge colorScheme={getStatusColor(selectedPlan.status)}>{selectedPlan.status}</Badge>
                              <Badge variant="outline">{selectedPlan.timeHorizon}</Badge>
                            </HStack>
                          </VStack>
                          <VStack align="end" spacing={1}>
                            <Text fontSize="sm" color="gray.600">Overall Progress</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                              {selectedPlan.performance.overallProgress}%
                            </Text>
                          </VStack>
                        </HStack>
                      </CardHeader>
                      <CardBody>
                        <SimpleGrid columns={3} spacing={6}>
                          <Stat>
                            <StatLabel>Strategic Themes</StatLabel>
                            <StatNumber>{selectedPlan.strategicThemes.length}</StatNumber>
                            <StatHelpText>
                              <StatArrow type="increase" />
                              All themes active
                            </StatHelpText>
                          </Stat>
                          <Stat>
                            <StatLabel>Total Investment</StatLabel>
                            <StatNumber>${(selectedPlan.resources[0]?.allocated || 0).toLocaleString()}</StatNumber>
                            <StatHelpText>
                              {Math.round((selectedPlan.resources[0]?.utilized || 0) / (selectedPlan.resources[0]?.allocated || 1) * 100)}% utilized
                            </StatHelpText>
                          </Stat>
                          <Stat>
                            <StatLabel>Risk Level</StatLabel>
                            <StatNumber color={selectedPlan.performance.riskStatus.overallRiskLevel === 'medium' ? 'yellow.500' : 'green.500'}>
                              {selectedPlan.performance.riskStatus.overallRiskLevel.toUpperCase()}
                            </StatNumber>
                            <StatHelpText>
                              {selectedPlan.performance.riskStatus.openRisks} open risks
                            </StatHelpText>
                          </Stat>
                        </SimpleGrid>
                        
                        <Divider my={6} />
                        
                        {/* Strategic Themes Progress */}
                        <VStack spacing={4} align="stretch">
                          <Text fontSize="md" fontWeight="semibold">Strategic Themes Progress</Text>
                          
                          {selectedPlan.strategicThemes.map((theme) => (
                            <Card key={theme.id} bg="gray.50" borderLeft="4px" borderColor={`${getPriorityColor(theme.priority)}.400`}>
                              <CardBody>
                                <VStack spacing={3} align="stretch">
                                  <HStack justify="space-between">
                                    <VStack align="start" spacing={1}>
                                      <Text fontSize="sm" fontWeight="bold">{theme.name}</Text>
                                      <Text fontSize="xs" color="gray.600">{theme.description}</Text>
                                      <HStack>
                                        <Badge colorScheme={getPriorityColor(theme.priority)} size="sm">
                                          {theme.priority}
                                        </Badge>
                                        <Badge colorScheme={getStatusColor(theme.status)} size="sm">
                                          {theme.status}
                                        </Badge>
                                        <Badge variant="outline" size="sm">
                                          ${theme.budget.toLocaleString()}
                                        </Badge>
                                      </HStack>
                                    </VStack>
                                    <VStack align="end" spacing={1}>
                                      <CircularProgress 
                                        value={theme.progress} 
                                        color={getStatusColor(theme.status) + '.400'}
                                        size="50px"
                                      >
                                        <CircularProgressLabel fontSize="xs">
                                          {theme.progress}%
                                        </CircularProgressLabel>
                                      </CircularProgress>
                                      <Text fontSize="xs" color="gray.500">{theme.timeline}</Text>
                                    </VStack>
                                  </HStack>
                                  
                                  {/* Theme KPIs */}
                                  <SimpleGrid columns={2} spacing={4}>
                                    {theme.kpis.map((kpi) => (
                                      <HStack key={kpi.id} justify="space-between" p={3} bg="white" borderRadius="md">
                                        <VStack align="start" spacing={0}>
                                          <Text fontSize="xs" fontWeight="semibold">{kpi.name}</Text>
                                          <Text fontSize="xs" color="gray.600">
                                            Target: {kpi.target}{kpi.unit}
                                          </Text>
                                        </VStack>
                                        <VStack align="end" spacing={0}>
                                          <Text fontSize="sm" fontWeight="bold">
                                            {kpi.current}{kpi.unit}
                                          </Text>
                                          <Badge colorScheme={kpi.trend === 'improving' ? 'green' : kpi.trend === 'declining' ? 'red' : 'gray'} size="sm">
                                            {kpi.trend}
                                          </Badge>
                                        </VStack>
                                      </HStack>
                                    ))}
                                  </SimpleGrid>
                                </VStack>
                              </CardBody>
                            </Card>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                    
                    {/* Key Objectives */}
                    <Card bg={cardBg}>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="bold">Key Strategic Objectives</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={4} align="stretch">
                          {selectedPlan.objectives.slice(0, 3).map((objective) => (
                            <Card key={objective.id} bg="blue.50" borderLeft="4px" borderColor={`${getPriorityColor(objective.priority)}.400`}>
                              <CardBody>
                                <HStack justify="space-between" align="start">
                                  <VStack align="start" spacing={2} flex={1}>
                                    <VStack align="start" spacing={1}>
                                      <Text fontSize="sm" fontWeight="bold">{objective.title}</Text>
                                      <Text fontSize="xs" color="gray.600">{objective.description}</Text>
                                      <HStack>
                                        <Badge colorScheme={getPriorityColor(objective.priority)} size="sm">
                                          {objective.priority}
                                        </Badge>
                                        <Badge colorScheme="blue" size="sm">
                                          {objective.type.replace('_', ' ')}
                                        </Badge>
                                        <Badge variant="outline" size="sm">
                                          ${objective.budget.toLocaleString()}
                                        </Badge>
                                      </HStack>
                                    </VStack>
                                    
                                    {/* Organizational Impact Summary */}
                                    <Box p={3} bg="white" borderRadius="md" w="full">
                                      <Text fontSize="xs" fontWeight="semibold" mb={2}>Organizational Impact:</Text>
                                      <SimpleGrid columns={2} spacing={2}>
                                        <HStack>
                                          <Text fontSize="xs">New Roles:</Text>
                                          <Text fontSize="xs" fontWeight="bold">{objective.organizationalImpact.newRolesRequired.length}</Text>
                                        </HStack>
                                        <HStack>
                                          <Text fontSize="xs">Skill Changes:</Text>
                                          <Text fontSize="xs" fontWeight="bold">{objective.organizationalImpact.skillRequirements.length}</Text>
                                        </HStack>
                                        <HStack>
                                          <Text fontSize="xs">Structure Changes:</Text>
                                          <Text fontSize="xs" fontWeight="bold">{objective.organizationalImpact.structuralChanges.length}</Text>
                                        </HStack>
                                        <HStack>
                                          <Text fontSize="xs">Cultural Shifts:</Text>
                                          <Text fontSize="xs" fontWeight="bold">{objective.organizationalImpact.culturalRequirements.length}</Text>
                                        </HStack>
                                      </SimpleGrid>
                                    </Box>
                                  </VStack>
                                  
                                  <VStack align="end" spacing={2}>
                                    <CircularProgress 
                                      value={objective.progress} 
                                      color={getStatusColor(objective.status) + '.400'}
                                      size="60px"
                                    >
                                      <CircularProgressLabel fontSize="xs">
                                        {objective.progress}%
                                      </CircularProgressLabel>
                                    </CircularProgress>
                                    <Badge colorScheme={getStatusColor(objective.status)}>
                                      {objective.status.replace('_', ' ')}
                                    </Badge>
                                  </VStack>
                                </HStack>
                              </CardBody>
                            </Card>
                          ))}
                        </VStack>
                      </CardBody>
                    </Card>
                  </>
                )}
              </VStack>
            </TabPanel>

            {/* Organizational Impact Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                {selectedPlan && organizationalImpact && (
                  <>
                    {/* Impact Overview */}
                    <Card bg={cardBg}>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="bold">🏢 Organizational Impact Assessment</Text>
                      </CardHeader>
                      <CardBody>
                        <SimpleGrid columns={4} spacing={6}>
                          <Stat>
                            <StatLabel>Structural Changes</StatLabel>
                            <StatNumber>{organizationalImpact.structuralChanges}</StatNumber>
                            <StatHelpText>
                              Departments and roles affected
                            </StatHelpText>
                          </Stat>
                          <Stat>
                            <StatLabel>New Roles Required</StatLabel>
                            <StatNumber>{organizationalImpact.newRoles}</StatNumber>
                            <StatHelpText>
                              Across all strategic themes
                            </StatHelpText>
                          </Stat>
                          <Stat>
                            <StatLabel>Skill Development</StatLabel>
                            <StatNumber>{organizationalImpact.skillDevelopment}</StatNumber>
                            <StatHelpText>
                              Skills requiring enhancement
                            </StatHelpText>
                          </Stat>
                          <Stat>
                            <StatLabel>Change Readiness</StatLabel>
                            <StatNumber color="green.500">{organizationalImpact.changeReadiness}%</StatNumber>
                            <StatHelpText>
                              Overall organizational readiness
                            </StatHelpText>
                          </Stat>
                        </SimpleGrid>
                        
                        <Divider my={6} />
                        
                        {/* Structure Alignment Analysis */}
                        <VStack spacing={4} align="stretch">
                          <Text fontSize="md" fontWeight="semibold">Structure Alignment Analysis</Text>
                          
                          <SimpleGrid columns={2} spacing={6}>
                            <Card bg={blueBg}>
                              <CardBody>
                                <VStack spacing={3} align="start">
                                  <Text fontSize="sm" fontWeight="bold">Current vs Target Fit</Text>
                                  <HStack justify="space-between" w="full">
                                    <VStack align="start" spacing={0}>
                                      <Text fontSize="xs" color="gray.600">Current Fit</Text>
                                      <Text fontSize="lg" fontWeight="bold">{selectedPlan.organizationalAlignment.structureAlignment.currentFit}%</Text>
                                    </VStack>
                                    <VStack align="end" spacing={0}>
                                      <Text fontSize="xs" color="gray.600">Target Fit</Text>
                                      <Text fontSize="lg" fontWeight="bold" color="green.600">{selectedPlan.organizationalAlignment.structureAlignment.targetFit}%</Text>
                                    </VStack>
                                  </HStack>
                                  <Progress 
                                    value={selectedPlan.organizationalAlignment.structureAlignment.currentFit} 
                                    colorScheme="blue" 
                                    size="sm" 
                                    w="full"
                                  />
                                  <Text fontSize="xs" color="gray.600">
                                    Gap: {selectedPlan.organizationalAlignment.structureAlignment.targetFit - selectedPlan.organizationalAlignment.structureAlignment.currentFit}% improvement needed
                                  </Text>
                                </VStack>
                              </CardBody>
                            </Card>
                            
                            <Card bg={greenBg}>
                              <CardBody>
                                <VStack spacing={3} align="start">
                                  <Text fontSize="sm" fontWeight="bold">Leadership Alignment</Text>
                                  <HStack justify="space-between" w="full">
                                    <VStack align="start" spacing={0}>
                                      <Text fontSize="xs" color="gray.600">Current Level</Text>
                                      <Text fontSize="lg" fontWeight="bold">{selectedPlan.organizationalAlignment.leadershipAlignment.overallAlignment}%</Text>
                                    </VStack>
                                    <VStack align="end" spacing={0}>
                                      <Text fontSize="xs" color="gray.600">Succession Ready</Text>
                                      <Text fontSize="lg" fontWeight="bold" color="green.600">{selectedPlan.organizationalAlignment.leadershipAlignment.successionReadiness}%</Text>
                                    </VStack>
                                  </HStack>
                                  <Progress 
                                    value={selectedPlan.organizationalAlignment.leadershipAlignment.overallAlignment} 
                                    colorScheme="green" 
                                    size="sm" 
                                    w="full"
                                  />
                                  <Text fontSize="xs" color="gray.600">
                                    Cultural modeling: {selectedPlan.organizationalAlignment.leadershipAlignment.culturalModeling}%
                                  </Text>
                                </VStack>
                              </CardBody>
                            </Card>
                          </SimpleGrid>
                          
                          {/* Gaps and Required Changes */}
                          <SimpleGrid columns={2} spacing={6}>
                            <Card bg="orange.50">
                              <CardBody>
                                <VStack spacing={3} align="start">
                                  <Text fontSize="sm" fontWeight="bold" color="orange.700">Structural Gaps</Text>
                                  <List spacing={1}>
                                    {selectedPlan.organizationalAlignment.structureAlignment.gaps.map((gap, index) => (
                                      <ListItem key={index} fontSize="xs">
                                        <ListIcon as={WarningIcon} color="orange.400" />
                                        {gap}
                                      </ListItem>
                                    ))}
                                  </List>
                                </VStack>
                              </CardBody>
                            </Card>
                            
                            <Card bg="purple.50">
                              <CardBody>
                                <VStack spacing={3} align="start">
                                  <Text fontSize="sm" fontWeight="bold" color="purple.700">Required Changes</Text>
                                  <List spacing={1}>
                                    {selectedPlan.organizationalAlignment.structureAlignment.requiredChanges.map((change, index) => (
                                      <ListItem key={index} fontSize="xs">
                                        <ListIcon as={CheckIcon} color="purple.400" />
                                        {change.description}
                                      </ListItem>
                                    ))}
                                  </List>
                                </VStack>
                              </CardBody>
                            </Card>
                          </SimpleGrid>
                        </VStack>
                      </CardBody>
                    </Card>
                    
                    {/* Role and Skill Alignment */}
                    <Card bg={cardBg}>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="bold">Role & Skill Alignment</Text>
                      </CardHeader>
                      <CardBody>
                        <VStack spacing={6} align="stretch">
                          {/* Role Alignment */}
                          <VStack spacing={4} align="stretch">
                            <Text fontSize="md" fontWeight="semibold">Role Strategic Alignment</Text>
                            <Table variant="simple" size="sm">
                              <Thead>
                                <Tr>
                                  <Th>Role</Th>
                                  <Th>Strategic Contribution</Th>
                                  <Th>Current Alignment</Th>
                                  <Th>Target Alignment</Th>
                                  <Th>Development Needs</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {selectedPlan.organizationalAlignment.roleAlignment.map((role) => (
                                  <Tr key={role.roleId}>
                                    <Td>
                                      <Text fontSize="sm" fontWeight="semibold">{role.roleName}</Text>
                                    </Td>
                                    <Td>
                                      <HStack>
                                        <Progress value={role.strategicContribution} colorScheme="purple" size="sm" w="60px" />
                                        <Text fontSize="sm">{role.strategicContribution}%</Text>
                                      </HStack>
                                    </Td>
                                    <Td>
                                      <HStack>
                                        <Progress value={role.currentAlignment} colorScheme="blue" size="sm" w="60px" />
                                        <Text fontSize="sm">{role.currentAlignment}%</Text>
                                      </HStack>
                                    </Td>
                                    <Td>
                                      <HStack>
                                        <Progress value={role.targetAlignment} colorScheme="green" size="sm" w="60px" />
                                        <Text fontSize="sm">{role.targetAlignment}%</Text>
                                      </HStack>
                                    </Td>
                                    <Td>
                                      <VStack align="start" spacing={0}>
                                        {role.developmentNeeds.slice(0, 2).map((need, index) => (
                                          <Text key={index} fontSize="xs" color="gray.600">{need}</Text>
                                        ))}
                                      </VStack>
                                    </Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </VStack>
                          
                          <Divider />
                          
                          {/* Skill Alignment */}
                          <VStack spacing={4} align="stretch">
                            <Text fontSize="md" fontWeight="semibold">Critical Skill Gaps</Text>
                            <SimpleGrid columns={2} spacing={4}>
                              {selectedPlan.organizationalAlignment.skillAlignment.map((skill) => (
                                <Card key={skill.skill} bg="gray.50" borderLeft="4px" borderColor={skill.gap > 1.5 ? 'red.400' : skill.gap > 1 ? 'orange.400' : 'green.400'}>
                                  <CardBody>
                                    <VStack spacing={2} align="start">
                                      <HStack justify="space-between" w="full">
                                        <Text fontSize="sm" fontWeight="bold">{skill.skill}</Text>
                                        <Badge colorScheme={skill.strategicImportance > 90 ? 'red' : skill.strategicImportance > 75 ? 'orange' : 'blue'} size="sm">
                                          {skill.strategicImportance}% strategic
                                        </Badge>
                                      </HStack>
                                      
                                      <HStack justify="space-between" w="full">
                                        <VStack align="start" spacing={0}>
                                          <Text fontSize="xs" color="gray.600">Current</Text>
                                          <Text fontSize="sm" fontWeight="bold">{skill.currentLevel}/5</Text>
                                        </VStack>
                                        <VStack align="center" spacing={0}>
                                          <Text fontSize="xs" color="gray.600">Gap</Text>
                                          <Text fontSize="sm" fontWeight="bold" color={skill.gap > 1.5 ? 'red.500' : skill.gap > 1 ? 'orange.500' : 'green.500'}>
                                            {skill.gap}
                                          </Text>
                                        </VStack>
                                        <VStack align="end" spacing={0}>
                                          <Text fontSize="xs" color="gray.600">Target</Text>
                                          <Text fontSize="sm" fontWeight="bold" color="green.600">{skill.targetLevel}/5</Text>
                                        </VStack>
                                      </HStack>
                                      
                                      <Progress value={(skill.currentLevel / skill.targetLevel) * 100} colorScheme="blue" size="sm" w="full" />
                                      
                                      <Text fontSize="xs" color="gray.600">
                                        Affects {skill.affectedRoles.length} roles
                                      </Text>
                                    </VStack>
                                  </CardBody>
                                </Card>
                              ))}
                            </SimpleGrid>
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </>
                )}
              </VStack>
            </TabPanel>

            {/* Framework Integration Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">📊 Strategic Framework Integration</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Comprehensive integration with Blue Ocean, Porter, McKinsey 7S, RBV, Christensen, and Rumelt frameworks showing organizational alignment.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">⚡ Strategy Execution Dashboard</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Real-time execution tracking with organizational change management and progress monitoring.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">🔄 Change Management & Organizational Readiness</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Comprehensive change management with stakeholder analysis, communication planning, and readiness assessment.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">📈 Strategic Performance Analytics</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Advanced analytics on strategic performance, organizational health, and framework alignment effectiveness.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Modals */}
        <Modal isOpen={isPlanModalOpen} onClose={onPlanModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Strategic Plan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  Comprehensive strategic plan creation with organizational alignment assessment would be implemented here.
                </Text>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onPlanModalClose}>
                Cancel
              </Button>
              <Button colorScheme="purple">
                Create Plan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default StrategicPlanningIntegration;