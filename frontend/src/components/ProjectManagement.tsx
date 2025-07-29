import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Input,
  Textarea,
  Select,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagCloseButton,
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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useToast,
  Spinner,
  CircularProgress,
  CircularProgressLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useColorModeValue,
  Flex,
  Spacer,
  Image,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  SimpleGrid,
  Code,
  Kbd
} from '@chakra-ui/react';
import { 
  AddIcon, 
  EditIcon, 
  DeleteIcon, 
  CalendarIcon, 
  TimeIcon,
  ViewIcon,
  InfoIcon,
  WarningIcon,
  CheckIcon,
  ArrowForwardIcon,
  StarIcon,
  AttachmentIcon,
  SearchIcon,
  DownloadIcon,
  ChatIcon,
  BellIcon,
  SettingsIcon,
  ChevronDownIcon,
  RepeatIcon,
  ExternalLinkIcon,
  CopyIcon,
  CloseIcon,
  LockIcon,
  UnlockIcon,
  ChevronRightIcon,
  EmailIcon,
  PhoneIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DragHandleIcon
} from '@chakra-ui/icons';

interface ProjectTask {
  id: string;
  name: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'cancelled' | 'on_hold' | 'testing' | 'review';
  priority: 'low' | 'medium' | 'high' | 'critical' | 'urgent';
  assignee: string;
  estimatedHours: number;
  actualHours: number;
  startDate: string;
  endDate: string;
  dependencies: string[];
  tags: string[];
  progress: number;
  cost: number;
  resources: ProjectResource[];
  milestones: ProjectMilestone[];
  comments: TaskComment[];
  subtasks: SubTask[];
  attachments: TaskAttachment[];
  timeTracking: TimeEntry[];
  customFields: { [key: string]: any };
  checklist: ChecklistItem[];
  labels: TaskLabel[];
  complexity: 'simple' | 'medium' | 'complex' | 'epic';
  storyPoints: number;
  effortEstimate: EffortEstimate;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  testCases: TestCase[];
  acceptanceCriteria: string[];
  blockers: Blocker[];
  workflowState: WorkflowState;
  kpis: TaskKPI[];
  integrations: TaskIntegration[];
  automationRules: AutomationRule[];
}

interface ProjectResource {
  id: string;
  name: string;
  type: 'human' | 'equipment' | 'material' | 'software' | 'budget' | 'facility' | 'external' | 'contract';
  allocation: number;
  cost: number;
  availability: string;
  skills?: string[];
  location?: string;
  capacity: ResourceCapacity;
  certification: Certification[];
  rate: ResourceRate;
  calendar: ResourceCalendar;
  utilization: UtilizationMetrics;
  conflicts: ResourceConflict[];
  bookings: ResourceBooking[];
  preferences: ResourcePreferences;
  performance: ResourcePerformance;
  contracts: ResourceContract[];
  costCenter: string;
  department: string;
  manager: string;
  backup: string[];
  restrictions: ResourceRestriction[];
}

interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  dependencies: string[];
  deliverables: string[];
}

interface TaskComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'status_change' | 'resource_update';
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'closing' | 'completed' | 'cancelled' | 'suspended' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical' | 'urgent';
  manager: string;
  team: string[];
  startDate: string;
  endDate: string;
  budget: number;
  actualCost: number;
  progress: number;
  tasks: ProjectTask[];
  milestones: ProjectMilestone[];
  resources: ProjectResource[];
  tags: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  healthScore: number;
  stakeholders: string[];
  processIntegration?: {
    linkedProcesses: string[];
    sharedResources: string[];
    dependencies: string[];
  };
  charter: ProjectCharter;
  scope: ProjectScope;
  schedule: ProjectSchedule;
  quality: QualityPlan;
  communication: CommunicationPlan;
  riskManagement: RiskManagement;
  procurement: ProcurementPlan;
  changeControl: ChangeControl;
  lessons: LessonsLearned[];
  portfolio: PortfolioInfo;
  governance: ProjectGovernance;
  methodology: ProjectMethodology;
  templates: ProjectTemplate[];
  baseline: ProjectBaseline;
  forecasting: ProjectForecasting;
  compliance: ComplianceInfo;
  sustainability: SustainabilityMetrics;
  innovation: InnovationMetrics;
  customAttributes: { [key: string]: any };
}

// Enhanced interfaces for comprehensive project management

interface SubTask {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignee: string;
  estimatedHours: number;
  actualHours: number;
  parentTaskId: string;
}

interface TaskAttachment {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'link' | 'code';
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  version: string;
  description?: string;
}

interface TimeEntry {
  id: string;
  userId: string;
  taskId: string;
  date: string;
  hours: number;
  description: string;
  billable: boolean;
  approved: boolean;
  category: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
}

interface TaskLabel {
  id: string;
  name: string;
  color: string;
  description?: string;
}

interface EffortEstimate {
  optimistic: number;
  mostLikely: number;
  pessimistic: number;
  confidence: number;
}

interface TestCase {
  id: string;
  name: string;
  description: string;
  steps: string[];
  expectedResult: string;
  actualResult?: string;
  status: 'pending' | 'passed' | 'failed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
}

interface Blocker {
  id: string;
  description: string;
  type: 'dependency' | 'resource' | 'external' | 'technical' | 'business';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string;
  reportedAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolution?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
}

interface WorkflowState {
  current: string;
  history: WorkflowTransition[];
  nextStates: string[];
  restrictions: string[];
}

interface WorkflowTransition {
  from: string;
  to: string;
  timestamp: string;
  user: string;
  reason?: string;
}

interface TaskKPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

interface TaskIntegration {
  id: string;
  type: 'jira' | 'github' | 'slack' | 'teams' | 'email' | 'api';
  config: { [key: string]: any };
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  active: boolean;
  createdBy: string;
  executionCount: number;
}

interface RuleCondition {
  field: string;
  operator: string;
  value: any;
}

interface RuleAction {
  type: string;
  parameters: { [key: string]: any };
}

interface ResourceCapacity {
  total: number;
  available: number;
  allocated: number;
  overbooked: number;
  unit: 'hours' | 'days' | 'quantity';
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  level: string;
  verified: boolean;
}

interface ResourceRate {
  standard: number;
  overtime: number;
  holiday: number;
  currency: string;
  billingPeriod: 'hourly' | 'daily' | 'monthly';
}

interface ResourceCalendar {
  workingDays: string[];
  workingHours: { start: string; end: string };
  holidays: Holiday[];
  timeOff: TimeOffEntry[];
  exceptions: CalendarException[];
}

interface Holiday {
  date: string;
  name: string;
  type: 'public' | 'company' | 'personal';
}

interface TimeOffEntry {
  startDate: string;
  endDate: string;
  type: 'vacation' | 'sick' | 'personal' | 'training';
  status: 'pending' | 'approved' | 'rejected';
}

interface CalendarException {
  date: string;
  hours: { start: string; end: string };
  reason: string;
}

interface UtilizationMetrics {
  current: number;
  average: number;
  peak: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  efficiency: number;
}

interface ResourceConflict {
  id: string;
  type: 'double_booking' | 'overallocation' | 'skill_mismatch' | 'availability';
  severity: 'low' | 'medium' | 'high';
  description: string;
  conflictingProjects: string[];
  resolution?: string;
  status: 'open' | 'resolved' | 'escalated';
}

interface ResourceBooking {
  id: string;
  projectId: string;
  taskId?: string;
  startDate: string;
  endDate: string;
  allocation: number;
  confirmed: boolean;
  recurring: boolean;
  notes?: string;
}

interface ResourcePreferences {
  preferredProjects: string[];
  skillDevelopment: string[];
  workLocation: 'office' | 'remote' | 'hybrid';
  maxUtilization: number;
  notifications: NotificationPreferences;
}

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  inApp: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
}

interface ResourcePerformance {
  rating: number;
  productivity: number;
  quality: number;
  reliability: number;
  collaboration: number;
  lastReview: string;
  goals: PerformanceGoal[];
}

interface PerformanceGoal {
  id: string;
  description: string;
  target: number;
  current: number;
  deadline: string;
  status: 'on_track' | 'at_risk' | 'achieved' | 'missed';
}

interface ResourceContract {
  id: string;
  type: 'permanent' | 'contract' | 'freelance' | 'vendor';
  startDate: string;
  endDate?: string;
  terms: string;
  rateCard: ResourceRate;
  renewalOptions: string[];
}

interface ResourceRestriction {
  type: 'project' | 'task' | 'time' | 'location' | 'skill';
  description: string;
  active: boolean;
  expiryDate?: string;
}

interface ProjectCharter {
  vision: string;
  objectives: string[];
  scope: string;
  deliverables: string[];
  assumptions: string[];
  constraints: string[];
  successCriteria: string[];
  authorization: ProjectAuthorization;
}

interface ProjectAuthorization {
  sponsor: string;
  approvedBy: string;
  approvalDate: string;
  budget: number;
  authority: string[];
}

interface ProjectScope {
  inclusions: string[];
  exclusions: string[];
  boundaries: string[];
  deliverables: Deliverable[];
  requirements: Requirement[];
  acceptance: AcceptanceCriteria[];
}

interface Deliverable {
  id: string;
  name: string;
  description: string;
  type: 'document' | 'software' | 'service' | 'product';
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'approved';
  owner: string;
  quality: QualityStandard[];
}

interface Requirement {
  id: string;
  type: 'functional' | 'non_functional' | 'business' | 'technical';
  description: string;
  priority: 'must_have' | 'should_have' | 'could_have' | 'wont_have';
  source: string;
  status: 'draft' | 'approved' | 'implemented' | 'tested';
  traceability: string[];
}

interface AcceptanceCriteria {
  id: string;
  description: string;
  criteria: string[];
  testable: boolean;
  owner: string;
  status: 'pending' | 'met' | 'not_met';
}

interface QualityStandard {
  aspect: string;
  measure: string;
  target: number;
  tolerance: number;
  method: string;
}

interface ProjectSchedule {
  baseline: ScheduleBaseline;
  current: ScheduleCurrent;
  critical_path: string[];
  buffers: ScheduleBuffer[];
  dependencies: ScheduleDependency[];
  constraints: ScheduleConstraint[];
}

interface ScheduleBaseline {
  startDate: string;
  endDate: string;
  duration: number;
  milestones: ProjectMilestone[];
  approvedBy: string;
  approvalDate: string;
}

interface ScheduleCurrent {
  startDate: string;
  endDate: string;
  duration: number;
  variance: number;
  confidence: number;
  lastUpdated: string;
}

interface ScheduleBuffer {
  type: 'project' | 'feeding' | 'resource';
  duration: number;
  consumed: number;
  remaining: number;
  location: string;
}

interface ScheduleDependency {
  id: string;
  predecessor: string;
  successor: string;
  type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
  lag: number;
  critical: boolean;
}

interface ScheduleConstraint {
  type: 'must_start_on' | 'must_finish_on' | 'start_no_earlier' | 'finish_no_later';
  date: string;
  reason: string;
  flexible: boolean;
}

interface QualityPlan {
  standards: QualityStandard[];
  processes: QualityProcess[];
  metrics: QualityMetric[];
  reviews: QualityReview[];
  improvements: QualityImprovement[];
}

interface QualityProcess {
  name: string;
  description: string;
  steps: string[];
  responsible: string;
  frequency: string;
  tools: string[];
}

interface QualityMetric {
  name: string;
  description: string;
  target: number;
  current: number;
  trend: 'improving' | 'declining' | 'stable';
  measurement: string;
}

interface QualityReview {
  id: string;
  type: 'design' | 'code' | 'process' | 'deliverable';
  date: string;
  reviewers: string[];
  findings: ReviewFinding[];
  status: 'scheduled' | 'in_progress' | 'completed';
}

interface ReviewFinding {
  severity: 'critical' | 'major' | 'minor' | 'suggestion';
  description: string;
  recommendation: string;
  assignee: string;
  status: 'open' | 'in_progress' | 'resolved' | 'deferred';
}

interface QualityImprovement {
  id: string;
  opportunity: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  owner: string;
  implementation: string;
  status: 'proposed' | 'approved' | 'implemented' | 'validated';
}

interface CommunicationPlan {
  stakeholders: StakeholderInfo[];
  channels: CommunicationChannel[];
  meetings: MeetingSchedule[];
  reports: ReportSchedule[];
  escalation: EscalationMatrix[];
}

interface StakeholderInfo {
  name: string;
  role: string;
  interest: 'high' | 'medium' | 'low';
  influence: 'high' | 'medium' | 'low';
  communication: 'daily' | 'weekly' | 'monthly' | 'milestone';
  preferences: string[];
}

interface CommunicationChannel {
  type: 'email' | 'meeting' | 'dashboard' | 'report' | 'chat';
  audience: string[];
  frequency: string;
  responsible: string;
  template?: string;
}

interface MeetingSchedule {
  type: 'standup' | 'review' | 'planning' | 'retrospective';
  frequency: string;
  duration: number;
  attendees: string[];
  agenda: string[];
  facilitator: string;
}

interface ReportSchedule {
  name: string;
  type: 'status' | 'progress' | 'financial' | 'quality' | 'risk';
  frequency: string;
  audience: string[];
  format: string;
  automated: boolean;
}

interface EscalationMatrix {
  level: number;
  trigger: string;
  escalateTo: string;
  timeframe: string;
  actions: string[];
}

interface RiskManagement {
  risks: ProjectRisk[];
  categories: RiskCategory[];
  tolerance: RiskTolerance;
  responses: RiskResponse[];
  monitoring: RiskMonitoring;
}

interface ProjectRisk {
  id: string;
  description: string;
  category: string;
  probability: number;
  impact: number;
  score: number;
  owner: string;
  status: 'identified' | 'assessed' | 'planned' | 'monitored' | 'closed';
  triggers: string[];
  responses: string[];
  contingency: string;
}

interface RiskCategory {
  name: string;
  description: string;
  color: string;
  weight: number;
}

interface RiskTolerance {
  low: { max: number; color: string };
  medium: { max: number; color: string };
  high: { max: number; color: string };
  appetite: string;
}

interface RiskResponse {
  risk: string;
  strategy: 'avoid' | 'mitigate' | 'transfer' | 'accept';
  actions: string[];
  owner: string;
  cost: number;
  timeline: string;
  effectiveness: number;
}

interface RiskMonitoring {
  frequency: string;
  indicators: string[];
  thresholds: { [key: string]: number };
  reports: string[];
  reviews: string[];
}

interface ProcurementPlan {
  items: ProcurementItem[];
  vendors: VendorInfo[];
  contracts: ContractInfo[];
  processes: ProcurementProcess[];
}

interface ProcurementItem {
  id: string;
  description: string;
  type: 'goods' | 'services' | 'construction';
  quantity: number;
  estimatedCost: number;
  actualCost?: number;
  vendor?: string;
  deliveryDate: string;
  status: 'planned' | 'sourcing' | 'contracted' | 'delivered';
}

interface VendorInfo {
  id: string;
  name: string;
  type: 'supplier' | 'contractor' | 'consultant';
  capabilities: string[];
  rating: number;
  contact: ContactInfo;
  contracts: string[];
  performance: VendorPerformance;
}

interface ContactInfo {
  primary: string;
  email: string;
  phone: string;
  address: string;
}

interface VendorPerformance {
  quality: number;
  delivery: number;
  cost: number;
  overall: number;
  history: PerformanceRecord[];
}

interface PerformanceRecord {
  period: string;
  score: number;
  notes: string;
}

interface ContractInfo {
  id: string;
  vendor: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  terms: string[];
  status: 'draft' | 'negotiating' | 'signed' | 'active' | 'completed';
}

interface ProcurementProcess {
  stage: string;
  activities: string[];
  responsible: string;
  duration: number;
  dependencies: string[];
}

interface ChangeControl {
  requests: ChangeRequest[];
  board: ChangeBoard;
  process: ChangeProcess;
  categories: ChangeCategory[];
}

interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: ChangeImpact;
  justification: string;
  requestedBy: string;
  requestDate: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'implemented';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  implementation: ImplementationPlan;
}

interface ChangeImpact {
  scope: 'none' | 'minor' | 'major' | 'significant';
  schedule: number; // days
  budget: number; // cost
  quality: 'improve' | 'neutral' | 'risk';
  resources: string[];
  dependencies: string[];
}

interface ImplementationPlan {
  tasks: string[];
  timeline: string;
  resources: string[];
  risks: string[];
  rollback: string;
}

interface ChangeBoard {
  members: string[];
  chair: string;
  frequency: string;
  quorum: number;
  authority: string[];
}

interface ChangeProcess {
  steps: ProcessStep[];
  approvals: ApprovalLevel[];
  documentation: string[];
  communication: string[];
}

interface ProcessStep {
  name: string;
  description: string;
  responsible: string;
  duration: number;
  inputs: string[];
  outputs: string[];
}

interface ApprovalLevel {
  level: number;
  threshold: number;
  approvers: string[];
  timeframe: string;
}

interface ChangeCategory {
  name: string;
  description: string;
  approval: string;
  impact: string;
}

interface LessonsLearned {
  id: string;
  category: 'positive' | 'negative' | 'recommendation';
  phase: string;
  description: string;
  impact: string;
  recommendation: string;
  applicable: string[];
  documented: string;
  author: string;
}

interface PortfolioInfo {
  program: string;
  portfolio: string;
  strategic: StrategicAlignment;
  dependencies: PortfolioDependency[];
  prioritization: PortfolioPriority;
}

interface StrategicAlignment {
  objectives: string[];
  kpis: string[];
  benefits: string[];
  contribution: number;
}

interface PortfolioDependency {
  project: string;
  type: 'resource' | 'deliverable' | 'schedule' | 'budget';
  description: string;
  impact: 'low' | 'medium' | 'high';
  management: string;
}

interface PortfolioPriority {
  score: number;
  criteria: PriorityCriteria[];
  rank: number;
  category: string;
}

interface PriorityCriteria {
  factor: string;
  weight: number;
  score: number;
  rationale: string;
}

interface ProjectGovernance {
  structure: GovernanceStructure;
  roles: GovernanceRole[];
  decisions: DecisionFramework;
  controls: GovernanceControl[];
  reporting: GovernanceReporting;
}

interface GovernanceStructure {
  sponsor: string;
  steering: string[];
  manager: string;
  board: string[];
  advisors: string[];
}

interface GovernanceRole {
  title: string;
  responsibilities: string[];
  authority: string[];
  accountabilities: string[];
  skills: string[];
}

interface DecisionFramework {
  types: DecisionType[];
  levels: DecisionLevel[];
  process: DecisionProcess;
  escalation: string[];
}

interface DecisionType {
  category: string;
  examples: string[];
  authority: string;
  process: string;
}

interface DecisionLevel {
  level: string;
  threshold: string;
  approver: string;
  timeframe: string;
}

interface DecisionProcess {
  steps: string[];
  criteria: string[];
  documentation: string[];
  communication: string[];
}

interface GovernanceControl {
  type: 'preventive' | 'detective' | 'corrective';
  description: string;
  frequency: string;
  responsible: string;
  evidence: string[];
}

interface GovernanceReporting {
  audiences: string[];
  frequency: string;
  content: string[];
  format: string;
  distribution: string[];
}

interface ProjectMethodology {
  framework: 'waterfall' | 'agile' | 'hybrid' | 'lean' | 'prince2' | 'pmbok';
  phases: MethodologyPhase[];
  practices: string[];
  tools: string[];
  tailoring: MethodologyTailoring;
}

interface MethodologyPhase {
  name: string;
  objectives: string[];
  deliverables: string[];
  activities: string[];
  roles: string[];
  duration: string;
}

interface MethodologyTailoring {
  reasons: string[];
  changes: string[];
  approval: string;
  documentation: string;
}

interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedDuration: number;
  tasks: Partial<ProjectTask>[];
  milestones: Partial<ProjectMilestone>[];
  requiredRoles: string[];
  complexity: 'simple' | 'medium' | 'complex';
  methodology: string;
  templates: TemplateAsset[];
  customization: TemplateCustomization;
}

interface TemplateAsset {
  type: 'document' | 'checklist' | 'process' | 'form';
  name: string;
  description: string;
  url: string;
  required: boolean;
}

interface TemplateCustomization {
  configurable: string[];
  optional: string[];
  mandatory: string[];
  validation: string[];
}

interface ProjectBaseline {
  scope: string;
  schedule: string;
  cost: string;
  quality: string;
  approved: boolean;
  approvedBy: string;
  approvalDate: string;
  version: string;
  changes: BaselineChange[];
}

interface BaselineChange {
  version: string;
  date: string;
  reason: string;
  impact: string;
  approvedBy: string;
}

interface ProjectForecasting {
  completion: ForecastCompletion;
  cost: ForecastCost;
  performance: ForecastPerformance;
  confidence: number;
  assumptions: string[];
  scenarios: ForecastScenario[];
}

interface ForecastCompletion {
  estimatedDate: string;
  probability: number;
  variance: number;
  criticalPath: string[];
}

interface ForecastCost {
  estimateAtCompletion: number;
  estimateToComplete: number;
  varianceAtCompletion: number;
  costPerformanceIndex: number;
}

interface ForecastPerformance {
  schedulePerformanceIndex: number;
  costPerformanceIndex: number;
  qualityIndex: number;
  riskIndex: number;
}

interface ForecastScenario {
  name: string;
  probability: number;
  impact: ScenarioImpact;
  mitigation: string[];
}

interface ScenarioImpact {
  schedule: number;
  cost: number;
  scope: string;
  quality: string;
}

interface ComplianceInfo {
  requirements: ComplianceRequirement[];
  audits: ComplianceAudit[];
  certifications: string[];
  policies: string[];
  violations: ComplianceViolation[];
}

interface ComplianceRequirement {
  id: string;
  type: 'regulatory' | 'corporate' | 'industry' | 'client';
  description: string;
  source: string;
  mandatory: boolean;
  evidence: string[];
  status: 'compliant' | 'non_compliant' | 'partial' | 'not_assessed';
}

interface ComplianceAudit {
  id: string;
  type: 'internal' | 'external' | 'regulatory';
  date: string;
  auditor: string;
  scope: string[];
  findings: AuditFinding[];
  recommendations: string[];
  status: 'planned' | 'in_progress' | 'completed';
}

interface AuditFinding {
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  requirement: string;
  evidence: string;
  recommendation: string;
  owner: string;
  dueDate: string;
  status: 'open' | 'in_progress' | 'resolved';
}

interface ComplianceViolation {
  id: string;
  requirement: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  discoveredDate: string;
  discoveredBy: string;
  rootCause: string;
  remediation: string;
  preventiveActions: string[];
  status: 'open' | 'investigating' | 'remediated' | 'closed';
}

interface SustainabilityMetrics {
  environmental: EnvironmentalMetrics;
  social: SocialMetrics;
  governance: GovernanceMetrics;
  reporting: SustainabilityReporting;
}

interface EnvironmentalMetrics {
  carbonFootprint: number;
  energyConsumption: number;
  wasteGeneration: number;
  waterUsage: number;
  sustainableMaterials: number;
  recyclingRate: number;
}

interface SocialMetrics {
  employeeSatisfaction: number;
  diversityIndex: number;
  communityImpact: number;
  stakeholderEngagement: number;
  ethicalSourcing: number;
}

interface GovernanceMetrics {
  ethicsCompliance: number;
  riskManagement: number;
  transparency: number;
  accountability: number;
  stakeholderRights: number;
}

interface SustainabilityReporting {
  framework: string;
  frequency: string;
  scope: string[];
  verification: boolean;
  publication: boolean;
}

interface InnovationMetrics {
  ideaGeneration: number;
  implementationRate: number;
  timeToMarket: number;
  innovationROI: number;
  patentsApplied: number;
  collaborations: number;
  learningHours: number;
  experimentSuccess: number;
}

const ProjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [selectedResource, setSelectedResource] = useState<ProjectResource | null>(null);
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [standaloneMode, setStandaloneMode] = useState(false);
  const [ganttView, setGanttView] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'card' | 'table' | 'kanban' | 'gantt' | 'timeline'>('card');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 1000000 });
  const [showArchived, setShowArchived] = useState(false);
  const [bulkSelection, setBulkSelection] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState('Current User');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<any>({});
  const [integrationStatus, setIntegrationStatus] = useState<any>({});
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [workflowStates, setWorkflowStates] = useState<string[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [reportingConfig, setReportingConfig] = useState<any>({});
  const [collaborationData, setCollaborationData] = useState<any>({});
  const [riskMatrix, setRiskMatrix] = useState<any[]>([]);
  const [qualityMetrics, setQualityMetrics] = useState<any>({});
  const [resourceUtilization, setResourceUtilization] = useState<any>({});
  const [timeTrackingData, setTimeTrackingData] = useState<TimeEntry[]>([]);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [lessonsLearned, setLessonsLearned] = useState<LessonsLearned[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<any>({});
  const [sustainabilityMetrics, setSustainabilityMetrics] = useState<SustainabilityMetrics | null>(null);
  const [innovationMetrics, setInnovationMetrics] = useState<InnovationMetrics | null>(null);
  
  // Modal and disclosure states
  const { isOpen: isNewProjectOpen, onOpen: onNewProjectOpen, onClose: onNewProjectClose } = useDisclosure();
  const { isOpen: isTaskOpen, onOpen: onTaskOpen, onClose: onTaskClose } = useDisclosure();
  const { isOpen: isGanttOpen, onOpen: onGanttOpen, onClose: onGanttClose } = useDisclosure();
  const { isOpen: isResourceOpen, onOpen: onResourceOpen, onClose: onResourceClose } = useDisclosure();
  const { isOpen: isProjectDetailsOpen, onOpen: onProjectDetailsOpen, onClose: onProjectDetailsClose } = useDisclosure();
  const { isOpen: isTaskDetailsOpen, onOpen: onTaskDetailsOpen, onClose: onTaskDetailsClose } = useDisclosure();
  const { isOpen: isResourceDetailsOpen, onOpen: onResourceDetailsOpen, onClose: onResourceDetailsClose } = useDisclosure();
  const { isOpen: isTemplateOpen, onOpen: onTemplateOpen, onClose: onTemplateClose } = useDisclosure();
  const { isOpen: isReportsOpen, onOpen: onReportsOpen, onClose: onReportsClose } = useDisclosure();
  const { isOpen: isBulkActionsOpen, onOpen: onBulkActionsOpen, onClose: onBulkActionsClose } = useDisclosure();
  const { isOpen: isWorkflowOpen, onOpen: onWorkflowOpen, onClose: onWorkflowClose } = useDisclosure();
  const { isOpen: isAutomationOpen, onOpen: onAutomationOpen, onClose: onAutomationClose } = useDisclosure();
  const { isOpen: isIntegrationOpen, onOpen: onIntegrationOpen, onClose: onIntegrationClose } = useDisclosure();
  const { isOpen: isAiInsightsOpen, onOpen: onAiInsightsOpen, onClose: onAiInsightsClose } = useDisclosure();
  const { isOpen: isRiskAnalysisOpen, onOpen: onRiskAnalysisOpen, onClose: onRiskAnalysisClose } = useDisclosure();
  const { isOpen: isQualityAnalysisOpen, onOpen: onQualityAnalysisOpen, onClose: onQualityAnalysisClose } = useDisclosure();
  const { isOpen: isResourceAnalysisOpen, onOpen: onResourceAnalysisOpen, onClose: onResourceAnalysisClose } = useDisclosure();
  const { isOpen: isTimeTrackingOpen, onOpen: onTimeTrackingOpen, onClose: onTimeTrackingClose } = useDisclosure();
  const { isOpen: isChangeControlOpen, onOpen: onChangeControlOpen, onClose: onChangeControlClose } = useDisclosure();
  const { isOpen: isKnowledgeOpen, onOpen: onKnowledgeOpen, onClose: onKnowledgeClose } = useDisclosure();
  const { isOpen: isComplianceOpen, onOpen: onComplianceOpen, onClose: onComplianceClose } = useDisclosure();
  const { isOpen: isSustainabilityOpen, onOpen: onSustainabilityOpen, onClose: onSustainabilityClose } = useDisclosure();
  const { isOpen: isInnovationOpen, onOpen: onInnovationOpen, onClose: onInnovationClose } = useDisclosure();
  const { isOpen: isCollaborationOpen, onOpen: onCollaborationOpen, onClose: onCollaborationClose } = useDisclosure();
  const { isOpen: isForecastingOpen, onOpen: onForecastingOpen, onClose: onForecastingClose } = useDisclosure();
  const { isOpen: isPortfolioOpen, onOpen: onPortfolioOpen, onClose: onPortfolioClose } = useDisclosure();
  const { isOpen: isGovernanceOpen, onOpen: onGovernanceOpen, onClose: onGovernanceClose } = useDisclosure();
  const { isOpen: isMethodologyOpen, onOpen: onMethodologyOpen, onClose: onMethodologyClose } = useDisclosure();
  const { isOpen: isCustomizationOpen, onOpen: onCustomizationOpen, onClose: onCustomizationClose } = useDisclosure();
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const { isOpen: isImportOpen, onOpen: onImportOpen, onClose: onImportClose } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  // Enhanced utility functions
  const calculateProjectHealth = useCallback((project: Project) => {
    let score = 100;
    
    // Schedule performance (30% weight)
    const today = new Date();
    const endDate = new Date(project.endDate);
    const startDate = new Date(project.startDate);
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysPassed = Math.max(0, (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const expectedProgress = Math.min(100, (daysPassed / totalDays) * 100);
    const scheduleVariance = Math.abs(expectedProgress - project.progress);
    score -= (scheduleVariance * 0.3);
    
    // Budget performance (25% weight)
    const budgetVariance = Math.abs((project.actualCost - project.budget) / project.budget * 100);
    score -= (budgetVariance * 0.25);
    
    // Quality performance (20% weight)
    const qualityScore = project.tasks.filter(t => t.status === 'completed').length / Math.max(1, project.tasks.length) * 100;
    score += (qualityScore - 80) * 0.2;
    
    // Risk level impact (15% weight)
    const riskImpact = project.riskLevel === 'high' ? 15 : project.riskLevel === 'medium' ? 5 : 0;
    score -= riskImpact;
    
    // Team productivity (10% weight)
    const avgTaskProgress = project.tasks.reduce((sum, task) => sum + task.progress, 0) / Math.max(1, project.tasks.length);
    score += (avgTaskProgress - 50) * 0.1;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }, []);

  const filterProjects = useCallback((projects: Project[]) => {
    return projects.filter(project => {
      // Status filter
      if (filterStatus !== 'all' && project.status !== filterStatus) return false;
      
      // Search term filter
      if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !project.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => project.tags.includes(tag))) return false;
      
      // Date range filter
      if (dateRange.start && new Date(project.startDate) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(project.endDate) > new Date(dateRange.end)) return false;
      
      // Budget range filter
      if (project.budget < budgetRange.min || project.budget > budgetRange.max) return false;
      
      // Archived filter
      if (!showArchived && project.status === 'archived') return false;
      
      return true;
    });
  }, [filterStatus, searchTerm, selectedTags, dateRange, budgetRange, showArchived]);

  const sortProjects = useCallback((projects: Project[]) => {
    return [...projects].sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'startDate':
          aValue = new Date(a.startDate);
          bValue = new Date(b.startDate);
          break;
        case 'endDate':
          aValue = new Date(a.endDate);
          bValue = new Date(b.endDate);
          break;
        case 'budget':
          aValue = a.budget;
          bValue = b.budget;
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'health':
          aValue = calculateProjectHealth(a);
          bValue = calculateProjectHealth(b);
          break;
        case 'priority':
          const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3, 'critical': 4, 'urgent': 5 };
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortBy, sortOrder, calculateProjectHealth]);

  const generateProjectInsights = useCallback((project: Project) => {
    const insights = [];
    const health = calculateProjectHealth(project);
    
    if (health < 70) {
      insights.push({
        type: 'warning',
        title: 'Project Health Risk',
        description: `Project health score is ${health}%. Consider reviewing schedule and budget.`,
        priority: 'high'
      });
    }
    
    const overdueTasks = project.tasks.filter(task => 
      new Date(task.endDate) < new Date() && task.status !== 'completed'
    );
    
    if (overdueTasks.length > 0) {
      insights.push({
        type: 'error',
        title: 'Overdue Tasks',
        description: `${overdueTasks.length} tasks are overdue. Immediate attention required.`,
        priority: 'critical'
      });
    }
    
    const budgetUtilization = (project.actualCost / project.budget) * 100;
    if (budgetUtilization > 90) {
      insights.push({
        type: 'warning',
        title: 'Budget Alert',
        description: `Budget utilization is at ${budgetUtilization.toFixed(1)}%. Consider cost controls.`,
        priority: 'high'
      });
    }
    
    return insights;
  }, [calculateProjectHealth]);

  const bulkUpdateProjects = useCallback((projectIds: string[], updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      projectIds.includes(project.id) ? { ...project, ...updates } : project
    ));
    toast({
      title: 'Bulk Update Completed',
      description: `Updated ${projectIds.length} projects successfully`,
      status: 'success',
      duration: 3000
    });
  }, [toast]);

  const exportProjectData = useCallback((format: 'csv' | 'excel' | 'pdf' | 'json', projectIds?: string[]) => {
    const projectsToExport = projectIds ? 
      projects.filter(p => projectIds.includes(p.id)) : 
      filterProjects(projects);
    
    // Simulated export functionality
    toast({
      title: 'Export Started',
      description: `Exporting ${projectsToExport.length} projects to ${format.toUpperCase()}`,
      status: 'info',
      duration: 3000
    });
    
    // In real implementation, this would trigger actual export
    setTimeout(() => {
      toast({
        title: 'Export Completed',
        description: `${format.toUpperCase()} file ready for download`,
        status: 'success',
        duration: 5000
      });
    }, 2000);
  }, [projects, filterProjects, toast]);

  const importProjectData = useCallback((file: File, options: any) => {
    // Simulated import functionality
    toast({
      title: 'Import Started',
      description: `Processing ${file.name}...`,
      status: 'info',
      duration: 3000
    });
    
    // In real implementation, this would process the file
    setTimeout(() => {
      toast({
        title: 'Import Completed',
        description: 'Projects imported successfully',
        status: 'success',
        duration: 5000
      });
    }, 3000);
  }, [toast]);

  useEffect(() => {
    // Initialize comprehensive sample data
    const sampleTeam = [
      'Sarah Mitchell', 
      'John Smith', 
      'Elena Rodriguez', 
      'Marcus Johnson', 
      'David Kim',
      'Lisa Wang',
      'James Chen',
      'Maya Patel'
    ];

    const sampleResources: ProjectResource[] = [
      {
        id: '1',
        name: 'Senior Developer',
        type: 'human',
        allocation: 100,
        cost: 75,
        availability: '9 AM - 5 PM',
        skills: ['React', 'TypeScript', 'Node.js'],
        location: 'Remote'
      },
      {
        id: '2',
        name: 'Project Server License',
        type: 'software',
        allocation: 1,
        cost: 200,
        availability: '24/7',
        location: 'Cloud'
      },
      {
        id: '3',
        name: 'Development Hardware',
        type: 'equipment',
        allocation: 2,
        cost: 150,
        availability: 'Business Hours',
        location: 'Office'
      }
    ];

    const sampleProjects: Project[] = [
      {
        id: '1',
        name: 'Customer Portal Redesign',
        description: 'Complete overhaul of customer-facing portal with modern UI/UX and enhanced functionality',
        status: 'active',
        priority: 'high',
        manager: 'Sarah Mitchell',
        team: ['John Smith', 'Elena Rodriguez', 'Marcus Johnson'],
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        budget: 150000,
        actualCost: 45000,
        progress: 35,
        tasks: [
          {
            id: '1',
            name: 'User Research & Analysis',
            description: 'Conduct user interviews and analyze current portal usage patterns',
            status: 'completed',
            priority: 'high',
            assignee: 'Elena Rodriguez',
            estimatedHours: 40,
            actualHours: 38,
            startDate: '2024-02-01',
            endDate: '2024-02-15',
            dependencies: [],
            tags: ['research', 'ux'],
            progress: 100,
            cost: 3800,
            resources: [sampleResources[0]],
            milestones: [],
            comments: [
              {
                id: '1',
                author: 'Elena Rodriguez',
                content: 'Completed user interviews with 25 customers. Key insights documented.',
                timestamp: '2024-02-15 14:30',
                type: 'status_change'
              }
            ]
          },
          {
            id: '2',
            name: 'UI/UX Design',
            description: 'Create wireframes, mockups, and interactive prototypes',
            status: 'in_progress',
            priority: 'high',
            assignee: 'John Smith',
            estimatedHours: 60,
            actualHours: 25,
            startDate: '2024-02-16',
            endDate: '2024-03-15',
            dependencies: ['1'],
            tags: ['design', 'ui', 'ux'],
            progress: 60,
            cost: 4500,
            resources: [sampleResources[0]],
            milestones: [],
            comments: []
          },
          {
            id: '3',
            name: 'Frontend Development',
            description: 'Implement new UI components and integrate with backend APIs',
            status: 'not_started',
            priority: 'medium',
            assignee: 'Marcus Johnson',
            estimatedHours: 120,
            actualHours: 0,
            startDate: '2024-03-16',
            endDate: '2024-04-20',
            dependencies: ['2'],
            tags: ['development', 'frontend'],
            progress: 0,
            cost: 9000,
            resources: [sampleResources[0], sampleResources[1]],
            milestones: [],
            comments: []
          }
        ],
        milestones: [
          {
            id: '1',
            name: 'Design Approval',
            description: 'Final design approval from stakeholders',
            dueDate: '2024-03-15',
            status: 'pending',
            dependencies: ['2'],
            deliverables: ['Approved mockups', 'Style guide', 'Component library']
          },
          {
            id: '2',
            name: 'Beta Release',
            description: 'Internal beta version for testing',
            dueDate: '2024-04-15',
            status: 'pending',
            dependencies: ['3'],
            deliverables: ['Beta application', 'Test plan', 'Bug reports']
          }
        ],
        resources: sampleResources,
        tags: ['customer', 'portal', 'redesign', 'ui/ux'],
        riskLevel: 'medium',
        healthScore: 78,
        stakeholders: ['Sarah Mitchell', 'Customer Success Team', 'IT Department'],
        processIntegration: {
          linkedProcesses: ['Customer Onboarding', 'Support Ticket Resolution'],
          sharedResources: ['Customer Service Team', 'Development Team'],
          dependencies: ['User Authentication Process', 'Data Migration Process']
        }
      },
      {
        id: '2',
        name: 'Process Automation Initiative',
        description: 'Automate key business processes to improve efficiency and reduce manual work',
        status: 'planning',
        priority: 'medium',
        manager: 'David Kim',
        team: ['Lisa Wang', 'James Chen'],
        startDate: '2024-03-01',
        endDate: '2024-06-30',
        budget: 200000,
        actualCost: 15000,
        progress: 15,
        tasks: [],
        milestones: [],
        resources: [],
        tags: ['automation', 'process', 'efficiency'],
        riskLevel: 'low',
        healthScore: 85,
        stakeholders: ['Operations Team', 'Management'],
        processIntegration: {
          linkedProcesses: ['Order Processing', 'Invoice Generation', 'Customer Support'],
          sharedResources: ['Operations Team', 'IT Team'],
          dependencies: ['System Integration', 'Data Standardization']
        }
      }
    ];

    const sampleTemplates: ProjectTemplate[] = [
      {
        id: '1',
        name: 'Software Development Project',
        category: 'Technology',
        description: 'Standard template for software development projects with agile methodology',
        estimatedDuration: 12, // weeks
        tasks: [],
        milestones: [],
        requiredRoles: ['Project Manager', 'Developers', 'QA Engineers', 'UX Designer'],
        complexity: 'medium'
      },
      {
        id: '2',
        name: 'Process Improvement Project',
        category: 'Operations',
        description: 'Template for process analysis and improvement initiatives',
        estimatedDuration: 16,
        tasks: [],
        milestones: [],
        requiredRoles: ['Process Analyst', 'Operations Manager', 'Subject Matter Experts'],
        complexity: 'complex'
      },
      {
        id: '3',
        name: 'Marketing Campaign',
        category: 'Marketing',
        description: 'Template for marketing campaign planning and execution',
        estimatedDuration: 8,
        tasks: [],
        milestones: [],
        requiredRoles: ['Marketing Manager', 'Content Creator', 'Designer', 'Analyst'],
        complexity: 'simple'
      }
    ];

    setTeamMembers(sampleTeam);
    setProjects(sampleProjects);
    setTemplates(sampleTemplates);
    
    // Initialize dashboard metrics
    setDashboardMetrics({
      totalProjects: sampleProjects.length,
      activeProjects: sampleProjects.filter(p => p.status === 'active').length,
      completedProjects: sampleProjects.filter(p => p.status === 'completed').length,
      totalBudget: sampleProjects.reduce((sum, p) => sum + p.budget, 0),
      actualCost: sampleProjects.reduce((sum, p) => sum + p.actualCost, 0),
      avgHealthScore: Math.round(sampleProjects.reduce((sum, p) => sum + calculateProjectHealth(p), 0) / sampleProjects.length),
      overdueTasks: sampleProjects.flatMap(p => p.tasks).filter(t => new Date(t.endDate) < new Date() && t.status !== 'completed').length,
      resourceUtilization: 82,
      onTimeDelivery: 87,
      budgetAdherence: 92
    });
    
    // Initialize AI insights
    setAiInsights([
      {
        type: 'optimization',
        title: 'Resource Optimization Opportunity',
        description: 'Senior Developer allocation can be optimized across 3 projects',
        impact: 'high',
        confidence: 85
      },
      {
        type: 'risk',
        title: 'Schedule Risk Detected',
        description: 'Customer Portal Redesign may face delays due to dependency issues',
        impact: 'medium',
        confidence: 72
      },
      {
        type: 'opportunity',
        title: 'Early Delivery Potential',
        description: 'Process Automation Initiative can potentially complete 2 weeks early',
        impact: 'medium',
        confidence: 68
      }
    ]);
    
    // Initialize workflow states
    setWorkflowStates([
      'Concept', 'Planning', 'Design', 'Development', 'Testing', 'Review', 'Deployment', 'Completed'
    ]);
    
    // Initialize sample automation rules
    setAutomationRules([
      {
        id: '1',
        name: 'Auto-assign based on skills',
        trigger: 'task_created',
        conditions: [{ field: 'tags', operator: 'contains', value: 'development' }],
        actions: [{ type: 'assign', parameters: { assignee: 'best_match' } }],
        active: true,
        createdBy: 'System Admin',
        executionCount: 15
      },
      {
        id: '2',
        name: 'Escalate overdue tasks',
        trigger: 'schedule_check',
        conditions: [{ field: 'status', operator: 'not_equals', value: 'completed' }, { field: 'due_date', operator: 'past', value: 1 }],
        actions: [{ type: 'notify', parameters: { escalate_to: 'manager' } }],
        active: true,
        createdBy: 'Project Manager',
        executionCount: 8
      }
    ]);
    
    // Initialize sample change requests
    setChangeRequests([
      {
        id: '1',
        title: 'Add Mobile Responsive Design',
        description: 'Enhance portal to be fully mobile responsive',
        category: 'enhancement',
        impact: {
          scope: 'major',
          schedule: 14,
          budget: 25000,
          quality: 'improve',
          resources: ['UI Designer', 'Frontend Developer'],
          dependencies: ['Mobile Testing Environment']
        },
        justification: 'Customer feedback indicates 60% access from mobile devices',
        requestedBy: 'Product Owner',
        requestDate: '2024-02-20',
        status: 'under_review',
        priority: 'high',
        implementation: {
          tasks: ['Design mobile layouts', 'Implement responsive CSS', 'Test across devices'],
          timeline: '3 weeks',
          resources: ['UI Team', 'QA Team'],
          risks: ['Browser compatibility', 'Performance impact'],
          rollback: 'Revert to desktop-only version'
        }
      }
    ]);
    
    // Initialize sample lessons learned
    setLessonsLearned([
      {
        id: '1',
        category: 'positive',
        phase: 'planning',
        description: 'Early stakeholder involvement significantly reduced scope changes',
        impact: 'Reduced project risk and improved timeline adherence',
        recommendation: 'Implement mandatory stakeholder workshops in planning phase',
        applicable: ['All projects', 'Customer-facing projects'],
        documented: '2024-02-15',
        author: 'Sarah Mitchell'
      },
      {
        id: '2',
        category: 'negative',
        phase: 'execution',
        description: 'Insufficient testing environment caused deployment delays',
        impact: '1-week delay in portal deployment',
        recommendation: 'Establish dedicated testing environments before development starts',
        applicable: ['Software projects', 'Integration projects'],
        documented: '2024-02-10',
        author: 'Technical Lead'
      }
    ]);
  }, [calculateProjectHealth]);

  const ProjectDashboard = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="xl" fontWeight="bold">📊 Project Management Dashboard</Text>
          {standaloneMode && (
            <Badge colorScheme="purple" variant="solid">Standalone Mode</Badge>
          )}
        </VStack>
        <HStack>
          <Switch
            isChecked={standaloneMode}
            onChange={(e) => setStandaloneMode(e.target.checked)}
            size="sm"
          />
          <Text fontSize="sm">Standalone Mode</Text>
          <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={onNewProjectOpen}>
            New Project
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Active Projects</StatLabel>
          <StatNumber>{projects.filter(p => p.status === 'active').length}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            2 started this month
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Total Budget</StatLabel>
          <StatNumber>${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            15% increase from last quarter
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>Avg Health Score</StatLabel>
          <StatNumber>{Math.round(projects.reduce((sum, p) => sum + calculateProjectHealth(p), 0) / projects.length)}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            8% improvement
          </StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="md" shadow="sm">
          <StatLabel>On-Time Delivery</StatLabel>
          <StatNumber>87%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            Target: 85%
          </StatHelpText>
        </Stat>
      </Grid>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Integrated Project & Process Management</Text>
          <Text fontSize="sm">
            Full integration with Process Management for end-to-end workflow optimization and resource sharing
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="2fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <HStack justify="space-between">
              <Text fontWeight="bold">Project Portfolio</Text>
              <HStack>
                <Button size="sm" leftIcon={<ViewIcon />} onClick={() => setGanttView(!ganttView)}>
                  {ganttView ? 'List View' : 'Gantt View'}
                </Button>
                <Button size="sm" leftIcon={<DownloadIcon />} variant="outline">
                  Export
                </Button>
              </HStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Project</Th>
                  <Th>Manager</Th>
                  <Th>Status</Th>
                  <Th>Progress</Th>
                  <Th>Budget</Th>
                  <Th>Health</Th>
                  <Th>Due Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {projects.map((project) => {
                  const health = calculateProjectHealth(project);
                  return (
                    <Tr key={project.id}>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold" fontSize="sm">{project.name}</Text>
                          <HStack>
                            <Badge size="sm" colorScheme={
                              project.priority === 'critical' ? 'red' :
                              project.priority === 'high' ? 'orange' :
                              project.priority === 'medium' ? 'yellow' : 'green'
                            }>
                              {project.priority}
                            </Badge>
                            {project.processIntegration && (
                              <Badge size="sm" colorScheme="purple" variant="outline">
                                Process Link
                              </Badge>
                            )}
                          </HStack>
                        </VStack>
                      </Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="sm">{project.manager}</Text>
                          <Text fontSize="xs" color="gray.600">
                            Team: {project.team.length}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Badge colorScheme={
                          project.status === 'active' ? 'green' :
                          project.status === 'planning' ? 'blue' :
                          project.status === 'on_hold' ? 'yellow' :
                          project.status === 'completed' ? 'purple' : 'gray'
                        }>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Progress value={project.progress} colorScheme="blue" size="sm" w="80px" />
                          <Text fontSize="xs">{project.progress}%</Text>
                        </VStack>
                      </Td>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="sm" fontWeight="semibold">
                            ${project.budget.toLocaleString()}
                          </Text>
                          <Text fontSize="xs" color={project.actualCost > project.budget ? "red.500" : "gray.600"}>
                            Spent: ${project.actualCost.toLocaleString()}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>
                        <CircularProgress 
                          value={health} 
                          size="40px" 
                          color={
                            health >= 80 ? 'green.400' :
                            health >= 60 ? 'yellow.400' : 'red.400'
                          }
                        >
                          <CircularProgressLabel fontSize="xs">
                            {Math.round(health)}
                          </CircularProgressLabel>
                        </CircularProgress>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{project.endDate}</Text>
                      </Td>
                      <Td>
                        <HStack>
                          <IconButton
                            aria-label="View project"
                            icon={<ViewIcon />}
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedProject(project);
                              onGanttOpen();
                            }}
                          />
                          <IconButton
                            aria-label="Edit project"
                            icon={<EditIcon />}
                            size="sm"
                            variant="ghost"
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <VStack spacing={4}>
          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Resource Utilization</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3}>
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">Development Team</Text>
                    <Text fontSize="sm" fontWeight="bold">85%</Text>
                  </HStack>
                  <Progress value={85} colorScheme="blue" size="sm" />
                </Box>
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">Design Team</Text>
                    <Text fontSize="sm" fontWeight="bold">65%</Text>
                  </HStack>
                  <Progress value={65} colorScheme="green" size="sm" />
                </Box>
                <Box w="full">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm">QA Team</Text>
                    <Text fontSize="sm" fontWeight="bold">92%</Text>
                  </HStack>
                  <Progress value={92} colorScheme="orange" size="sm" />
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Upcoming Milestones</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                {projects.flatMap(p => p.milestones)
                  .filter(m => m.status === 'pending')
                  .slice(0, 3)
                  .map(milestone => (
                    <HStack key={milestone.id} justify="space-between" p={2} bg="gray.50" borderRadius="md">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">{milestone.name}</Text>
                        <Text fontSize="xs" color="gray.600">{milestone.dueDate}</Text>
                      </VStack>
                      <Badge colorScheme="yellow" size="sm">
                        Pending
                      </Badge>
                    </HStack>
                  ))}
              </VStack>
            </CardBody>
          </Card>

          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Risk Alerts</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={2} align="stretch">
                <Alert status="warning" size="sm">
                  <AlertIcon boxSize={3} />
                  <Text fontSize="xs">Budget overrun risk: Portal Redesign</Text>
                </Alert>
                <Alert status="error" size="sm">
                  <AlertIcon boxSize={3} />
                  <Text fontSize="xs">Resource conflict: Dev team overallocated</Text>
                </Alert>
                <Alert status="info" size="sm">
                  <AlertIcon boxSize={3} />
                  <Text fontSize="xs">Milestone approaching: Design approval</Text>
                </Alert>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Grid>
    </VStack>
  );

  const TaskManagement = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">✅ Task Management</Text>
        <HStack>
          <Select size="sm" w="200px" placeholder="Filter by project">
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </Select>
          <Button colorScheme="green" leftIcon={<AddIcon />} onClick={onTaskOpen}>
            New Task
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4}>
        <Card>
          <CardHeader bg="gray.100">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="sm">Not Started</Text>
              <Badge colorScheme="gray">
                {projects.flatMap(p => p.tasks).filter(t => t.status === 'not_started').length}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <VStack spacing={3}>
              {projects.flatMap(p => p.tasks)
                .filter(task => task.status === 'not_started')
                .map(task => (
                  <Card key={task.id} size="sm" w="full" cursor="pointer" _hover={{ shadow: "md" }}>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>
                          {task.name}
                        </Text>
                        <HStack wrap="wrap">
                          <Badge size="xs" colorScheme={
                            task.priority === 'critical' ? 'red' :
                            task.priority === 'high' ? 'orange' :
                            task.priority === 'medium' ? 'yellow' : 'green'
                          }>
                            {task.priority}
                          </Badge>
                          {task.tags.slice(0, 2).map(tag => (
                            <Tag key={tag} size="sm" variant="subtle">
                              <TagLabel>{tag}</TagLabel>
                            </Tag>
                          ))}
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.600">
                            {task.assignee}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {task.estimatedHours}h
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader bg="blue.100">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="sm">In Progress</Text>
              <Badge colorScheme="blue">
                {projects.flatMap(p => p.tasks).filter(t => t.status === 'in_progress').length}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <VStack spacing={3}>
              {projects.flatMap(p => p.tasks)
                .filter(task => task.status === 'in_progress')
                .map(task => (
                  <Card key={task.id} size="sm" w="full" cursor="pointer" _hover={{ shadow: "md" }}>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold" noOfLines={2}>
                          {task.name}
                        </Text>
                        <Progress value={task.progress} colorScheme="blue" size="sm" w="full" />
                        <HStack wrap="wrap">
                          <Badge size="xs" colorScheme={
                            task.priority === 'critical' ? 'red' :
                            task.priority === 'high' ? 'orange' :
                            task.priority === 'medium' ? 'yellow' : 'green'
                          }>
                            {task.priority}
                          </Badge>
                          {task.tags.slice(0, 2).map(tag => (
                            <Tag key={tag} size="sm" variant="subtle">
                              <TagLabel>{tag}</TagLabel>
                            </Tag>
                          ))}
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.600">
                            {task.assignee}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {task.actualHours}/{task.estimatedHours}h
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader bg="red.100">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="sm">Blocked</Text>
              <Badge colorScheme="red">
                {projects.flatMap(p => p.tasks).filter(t => t.status === 'blocked').length}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <VStack spacing={3}>
              <Alert status="warning" size="sm">
                <AlertIcon boxSize={3} />
                <Text fontSize="xs">No blocked tasks - Great job!</Text>
              </Alert>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader bg="green.100">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="sm">Completed</Text>
              <Badge colorScheme="green">
                {projects.flatMap(p => p.tasks).filter(t => t.status === 'completed').length}
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody maxH="500px" overflowY="auto">
            <VStack spacing={3}>
              {projects.flatMap(p => p.tasks)
                .filter(task => task.status === 'completed')
                .map(task => (
                  <Card key={task.id} size="sm" w="full" cursor="pointer" _hover={{ shadow: "md" }}>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold" noOfLines={2} textDecoration="line-through" color="gray.500">
                          {task.name}
                        </Text>
                        <HStack wrap="wrap">
                          <Badge size="xs" colorScheme="green">
                            ✓ Done
                          </Badge>
                          {task.tags.slice(0, 2).map(tag => (
                            <Tag key={tag} size="sm" variant="subtle">
                              <TagLabel>{tag}</TagLabel>
                            </Tag>
                          ))}
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="xs" color="gray.600">
                            {task.assignee}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {task.actualHours}h
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );

  const ResourcePlanning = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">👥 Resource Planning & Allocation</Text>
        <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={onResourceOpen}>
          Add Resource
        </Button>
      </HStack>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Integrated Resource Management</Text>
          <Text fontSize="sm">
            Resources are shared between projects and processes for optimized allocation and cost management
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns="1fr 1fr" gap={6}>
        <VStack spacing={4}>
          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Resource Allocation Matrix</Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Resource</Th>
                    <Th>Type</Th>
                    <Th>Allocation</Th>
                    <Th>Cost/Hour</Th>
                    <Th>Utilization</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projects.flatMap(p => p.resources)
                    .filter((resource, index, self) => 
                      index === self.findIndex(r => r.id === resource.id)
                    )
                    .map(resource => (
                      <Tr key={resource.id}>
                        <Td>
                          <Text fontSize="sm" fontWeight="semibold">{resource.name}</Text>
                        </Td>
                        <Td>
                          <Badge size="sm" colorScheme={
                            resource.type === 'human' ? 'blue' :
                            resource.type === 'equipment' ? 'green' :
                            resource.type === 'software' ? 'purple' : 'orange'
                          }>
                            {resource.type}
                          </Badge>
                        </Td>
                        <Td>{resource.allocation}%</Td>
                        <Td>${resource.cost}</Td>
                        <Td>
                          <Progress 
                            value={resource.allocation} 
                            colorScheme={
                              resource.allocation > 100 ? 'red' :
                              resource.allocation > 80 ? 'yellow' : 'green'
                            }
                            size="sm" 
                            w="60px"
                          />
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Team Workload</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3}>
                {teamMembers.slice(0, 6).map(member => {
                  const workload = Math.floor(Math.random() * 40) + 60; // 60-100%
                  return (
                    <HStack key={member} justify="space-between" w="full">
                      <HStack>
                        <Avatar size="sm" name={member} />
                        <Text fontSize="sm">{member}</Text>
                      </HStack>
                      <HStack>
                        <Progress 
                          value={workload} 
                          colorScheme={
                            workload > 90 ? 'red' :
                            workload > 80 ? 'yellow' : 'green'
                          }
                          size="sm" 
                          w="80px"
                        />
                        <Text fontSize="xs" w="30px">{workload}%</Text>
                      </HStack>
                    </HStack>
                  );
                })}
              </VStack>
            </CardBody>
          </Card>
        </VStack>

        <VStack spacing={4}>
          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Cost Analysis</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Stat>
                  <StatLabel>Total Resource Cost</StatLabel>
                  <StatNumber>
                    ${projects.reduce((sum, p) => 
                      sum + p.resources.reduce((rSum, r) => rSum + (r.cost * r.allocation / 100), 0), 0
                    ).toFixed(0)}/month
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12% from last month
                  </StatHelpText>
                </Stat>
                
                <Divider />
                
                <VStack align="start" spacing={2} w="full">
                  <Text fontSize="sm" fontWeight="semibold">Cost Breakdown</Text>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Human Resources</Text>
                    <Text fontSize="sm" fontWeight="bold">65%</Text>
                  </HStack>
                  <Progress value={65} colorScheme="blue" size="sm" w="full" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Software Licenses</Text>
                    <Text fontSize="sm" fontWeight="bold">25%</Text>
                  </HStack>
                  <Progress value={25} colorScheme="purple" size="sm" w="full" />
                  
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm">Equipment</Text>
                    <Text fontSize="sm" fontWeight="bold">10%</Text>
                  </HStack>
                  <Progress value={10} colorScheme="green" size="sm" w="full" />
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card w="full">
            <CardHeader>
              <Text fontWeight="bold">Resource Conflicts</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} align="stretch">
                <Alert status="warning" size="sm">
                  <AlertIcon boxSize={3} />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" fontWeight="semibold">Overallocation Detected</Text>
                    <Text fontSize="xs">Senior Developer: 125% allocated</Text>
                  </VStack>
                </Alert>
                <Alert status="error" size="sm">
                  <AlertIcon boxSize={3} />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" fontWeight="semibold">Resource Conflict</Text>
                    <Text fontSize="xs">QA Engineer needed for overlapping tasks</Text>
                  </VStack>
                </Alert>
                <Alert status="info" size="sm">
                  <AlertIcon boxSize={3} />
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xs" fontWeight="semibold">Optimization Opportunity</Text>
                    <Text fontSize="xs">Designer available 35% of time</Text>
                  </VStack>
                </Alert>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Grid>
    </VStack>
  );

  const ReportsAnalytics = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">📈 Reports & Analytics</Text>
        <HStack>
          <Select size="sm" w="150px" defaultValue="month">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </Select>
          <Button leftIcon={<DownloadIcon />} variant="outline">
            Export Report
          </Button>
        </HStack>
      </HStack>

      <Grid templateColumns="1fr 1fr 1fr" gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">Project Performance</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <Stat>
                <StatLabel>On-Time Delivery Rate</StatLabel>
                <StatNumber>87%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  5% improvement
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Budget Adherence</StatLabel>
                <StatNumber>92%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Within budget
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Quality Score</StatLabel>
                <StatNumber>94%</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Customer satisfaction
                </StatHelpText>
              </Stat>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Resource Efficiency</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <Box w="full" h="200px" bg="gray.50" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                <Text color="gray.500">Resource Utilization Chart</Text>
              </Box>
              <HStack justify="space-between" w="full">
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" color="blue.500">82%</Text>
                  <Text fontSize="xs">Avg Utilization</Text>
                </VStack>
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" color="green.500">95%</Text>
                  <Text fontSize="xs">Efficiency</Text>
                </VStack>
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" color="orange.500">$125K</Text>
                  <Text fontSize="xs">Cost Saved</Text>
                </VStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Risk Assessment</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Low Risk Projects</Text>
                <Badge colorScheme="green">
                  {projects.filter(p => p.riskLevel === 'low').length}
                </Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">Medium Risk Projects</Text>
                <Badge colorScheme="yellow">
                  {projects.filter(p => p.riskLevel === 'medium').length}
                </Badge>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm">High Risk Projects</Text>
                <Badge colorScheme="red">
                  {projects.filter(p => p.riskLevel === 'high').length}
                </Badge>
              </HStack>
              
              <Divider />
              
              <VStack align="start" spacing={2} w="full">
                <Text fontSize="sm" fontWeight="semibold">Top Risk Factors</Text>
                <Text fontSize="xs">• Resource conflicts (3 projects)</Text>
                <Text fontSize="xs">• Budget overrun risk (2 projects)</Text>
                <Text fontSize="xs">• Timeline pressure (4 projects)</Text>
                <Text fontSize="xs">• Scope creep (1 project)</Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Process Integration Analysis</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Alert status="success">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">Integrated Projects</Text>
                <Text fontSize="sm">
                  {projects.filter(p => p.processIntegration).length} projects are integrated with process management for enhanced workflow optimization
                </Text>
              </VStack>
            </Alert>
            
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Project</Th>
                  <Th>Linked Processes</Th>
                  <Th>Shared Resources</Th>
                  <Th>Dependencies</Th>
                  <Th>Integration Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                {projects.filter(p => p.processIntegration).map(project => (
                  <Tr key={project.id}>
                    <Td>
                      <Text fontSize="sm" fontWeight="semibold">{project.name}</Text>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={1}>
                        {project.processIntegration?.linkedProcesses.map(process => (
                          <Badge key={process} size="sm" colorScheme="blue" variant="subtle">
                            {process}
                          </Badge>
                        ))}
                      </VStack>
                    </Td>
                    <Td>
                      <Text fontSize="sm">
                        {project.processIntegration?.sharedResources.length} resources
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm">
                        {project.processIntegration?.dependencies.length} dependencies
                      </Text>
                    </Td>
                    <Td>
                      <CircularProgress value={85} size="30px" color="green.400">
                        <CircularProgressLabel fontSize="xs">85</CircularProgressLabel>
                      </CircularProgress>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );

  const WorkflowManagement = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">🔧 Workflow Management</Text>
        <HStack>
          <Button colorScheme="purple" leftIcon={<AddIcon />} onClick={onWorkflowOpen}>
            Create Workflow
          </Button>
          <Button leftIcon={<RepeatIcon />} variant="outline" onClick={onAutomationOpen}>
            Automation Rules
          </Button>
        </HStack>
      </HStack>

      <Alert status="info">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="semibold">Advanced Workflow Engine</Text>
          <Text fontSize="sm">
            Design, automate, and optimize project workflows with AI-powered recommendations and real-time monitoring
          </Text>
        </VStack>
      </Alert>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">Active Workflows</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {workflowStates.map((state, index) => (
                <HStack key={state} justify="space-between" w="full" p={3} bg="gray.50" borderRadius="md">
                  <HStack>
                    <Badge colorScheme="blue" variant="solid">{index + 1}</Badge>
                    <Text fontSize="sm" fontWeight="semibold">{state}</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="xs" color={mutedColor}>Active: {Math.floor(Math.random() * 5) + 1}</Text>
                    <IconButton
                      aria-label="Configure workflow"
                      icon={<SettingsIcon />}
                      size="xs"
                      variant="ghost"
                    />
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Automation Rules</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={3}>
              {automationRules.map(rule => (
                <HStack key={rule.id} justify="space-between" w="full" p={3} borderWidth="1px" borderRadius="md">
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" fontWeight="semibold">{rule.name}</Text>
                    <HStack>
                      <Badge colorScheme={rule.active ? 'green' : 'gray'} size="sm">
                        {rule.active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Text fontSize="xs" color={mutedColor}>Executed: {rule.executionCount}x</Text>
                    </HStack>
                  </VStack>
                  <Switch isChecked={rule.active} size="sm" />
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );

  const AIInsightsDashboard = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <VStack align="start" spacing={1}>
          <Text fontSize="xl" fontWeight="bold">🤖 AI-Powered Insights</Text>
          <Text fontSize="sm" color={mutedColor}>Machine learning insights for optimal project management</Text>
        </VStack>
        <HStack>
          <Button leftIcon={<RepeatIcon />} variant="outline">
            Refresh Insights
          </Button>
          <Button colorScheme="purple" leftIcon={<SettingsIcon />}>
            Configure AI
          </Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        {aiInsights.map((insight, index) => (
          <Card key={index} borderWidth="2px" borderColor={
            insight.type === 'risk' ? 'red.200' :
            insight.type === 'optimization' ? 'blue.200' : 'green.200'
          }>
            <CardHeader>
              <HStack justify="space-between">
                <Badge colorScheme={
                  insight.type === 'risk' ? 'red' :
                  insight.type === 'optimization' ? 'blue' : 'green'
                } variant="solid">
                  {insight.type}
                </Badge>
                <CircularProgress value={insight.confidence} size="30px" color="purple.400">
                  <CircularProgressLabel fontSize="xs">{insight.confidence}%</CircularProgressLabel>
                </CircularProgress>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={3}>
                <Text fontWeight="bold" fontSize="md">{insight.title}</Text>
                <Text fontSize="sm" color={mutedColor}>{insight.description}</Text>
                <HStack justify="space-between" w="full">
                  <Badge colorScheme={
                    insight.impact === 'high' ? 'red' :
                    insight.impact === 'medium' ? 'yellow' : 'green'
                  } size="sm">
                    {insight.impact} impact
                  </Badge>
                  <Button size="xs" colorScheme="purple" variant="outline">
                    Act on Insight
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Card>
        <CardHeader>
          <Text fontWeight="bold">Predictive Analytics</Text>
        </CardHeader>
        <CardBody>
          <Grid templateColumns="1fr 1fr 1fr" gap={6}>
            <Stat>
              <StatLabel>Completion Prediction</StatLabel>
              <StatNumber color="blue.500">March 15, 2024</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                87% confidence
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Budget Forecast</StatLabel>
              <StatNumber color="green.500">$285,000</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                5% under budget
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Risk Score</StatLabel>
              <StatNumber color="yellow.500">Medium</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                Trending stable
              </StatHelpText>
            </Stat>
          </Grid>
        </CardBody>
      </Card>
    </VStack>
  );

  const TemplateManagement = () => (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">📋 Project Templates</Text>
        <HStack>
          <Button colorScheme="green" leftIcon={<AddIcon />}>
            Create Template
          </Button>
          <Button leftIcon={<DownloadIcon />} variant="outline">
            Import Template
          </Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {templates.map(template => (
          <Card key={template.id} variant="outline" cursor="pointer" _hover={{ shadow: 'md' }}>
            <CardHeader>
              <VStack align="start" spacing={2}>
                <HStack justify="space-between" w="full">
                  <Badge colorScheme="purple" variant="outline">{template.category}</Badge>
                  <Badge colorScheme={
                    template.complexity === 'simple' ? 'green' :
                    template.complexity === 'medium' ? 'yellow' : 'red'
                  } size="sm">
                    {template.complexity}
                  </Badge>
                </HStack>
                <Text fontWeight="bold" fontSize="lg">{template.name}</Text>
              </VStack>
            </CardHeader>
            <CardBody>
              <VStack align="start" spacing={3}>
                <Text fontSize="sm" color={mutedColor} noOfLines={3}>
                  {template.description}
                </Text>
                <HStack justify="space-between" w="full">
                  <Text fontSize="xs" color={mutedColor}>Duration: {template.estimatedDuration} weeks</Text>
                  <Text fontSize="xs" color={mutedColor}>Roles: {template.requiredRoles.length}</Text>
                </HStack>
                <HStack wrap="wrap" spacing={1}>
                  {template.requiredRoles.slice(0, 3).map(role => (
                    <Badge key={role} size="xs" variant="subtle">{role}</Badge>
                  ))}
                  {template.requiredRoles.length > 3 && (
                    <Badge size="xs" variant="outline">+{template.requiredRoles.length - 3}</Badge>
                  )}
                </HStack>
                <Button colorScheme="blue" size="sm" w="full">
                  Use Template
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );

  const ProjectSettings = () => (
    <VStack spacing={6} align="stretch">
      <Text fontSize="xl" fontWeight="bold">⚙️ Project Management Settings</Text>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
        <Card>
          <CardHeader>
            <Text fontWeight="bold">General Settings</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Default Project Status</FormLabel>
                <Select defaultValue="planning">
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="on_hold">On Hold</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Auto-assign Tasks</FormLabel>
                <Switch defaultIsChecked />
              </FormControl>
              <FormControl>
                <FormLabel>Enable Notifications</FormLabel>
                <Switch defaultIsChecked />
              </FormControl>
              <FormControl>
                <FormLabel>Time Tracking</FormLabel>
                <Switch defaultIsChecked />
              </FormControl>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Text fontWeight="bold">Integration Settings</Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm">Process Management</Text>
                <Badge colorScheme="green" variant="solid">Connected</Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm">Time Tracking</Text>
                <Badge colorScheme="green" variant="solid">Active</Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm">Financial Systems</Text>
                <Badge colorScheme="yellow" variant="solid">Pending</Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm">External APIs</Text>
                <Badge colorScheme="gray" variant="solid">Disabled</Badge>
              </HStack>
              <Button colorScheme="blue" size="sm">
                Configure Integrations
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Grid>
    </VStack>
  );

  return (
    <Box>
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList overflowX="auto" overflowY="hidden">
          <Tab>📊 Dashboard</Tab>
          <Tab>✅ Tasks</Tab>
          <Tab>👥 Resources</Tab>
          <Tab>📈 Analytics</Tab>
          <Tab>🔧 Workflow</Tab>
          <Tab>🤖 AI Insights</Tab>
          <Tab>📋 Templates</Tab>
          <Tab>⚙️ Settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProjectDashboard />
          </TabPanel>
          <TabPanel>
            <TaskManagement />
          </TabPanel>
          <TabPanel>
            <ResourcePlanning />
          </TabPanel>
          <TabPanel>
            <ReportsAnalytics />
          </TabPanel>
          <TabPanel>
            <WorkflowManagement />
          </TabPanel>
          <TabPanel>
            <AIInsightsDashboard />
          </TabPanel>
          <TabPanel>
            <TemplateManagement />
          </TabPanel>
          <TabPanel>
            <ProjectSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Comprehensive Modal System */}
      
      {/* Project Details Modal */}
      <Modal isOpen={isProjectDetailsOpen} onClose={onProjectDetailsClose} size="6xl">
        <ModalOverlay />
        <ModalContent maxH="90vh" overflowY="auto">
          <ModalHeader>
            <HStack>
              <Text>Project Details: {selectedProject?.name}</Text>
              <Badge colorScheme={selectedProject?.status === 'active' ? 'green' : 'blue'}>
                {selectedProject?.status?.replace('_', ' ')}
              </Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProject && (
              <VStack spacing={6} align="stretch">
                <Grid templateColumns="1fr 1fr 1fr" gap={6}>
                  <Stat>
                    <StatLabel>Progress</StatLabel>
                    <StatNumber>{selectedProject.progress}%</StatNumber>
                    <Progress value={selectedProject.progress} colorScheme="blue" size="sm" mt={2} />
                  </Stat>
                  <Stat>
                    <StatLabel>Budget Utilization</StatLabel>
                    <StatNumber>
                      ${selectedProject.actualCost.toLocaleString()} / ${selectedProject.budget.toLocaleString()}
                    </StatNumber>
                    <Progress value={(selectedProject.actualCost / selectedProject.budget) * 100} 
                      colorScheme={selectedProject.actualCost <= selectedProject.budget ? 'green' : 'red'} 
                      size="sm" mt={2} />
                  </Stat>
                  <Stat>
                    <StatLabel>Health Score</StatLabel>
                    <StatNumber>{calculateProjectHealth(selectedProject)}%</StatNumber>
                    <CircularProgress value={calculateProjectHealth(selectedProject)} size="40px" 
                      color={calculateProjectHealth(selectedProject) >= 80 ? 'green.400' : 'yellow.400'} mt={2} />
                  </Stat>
                </Grid>
                
                <Divider />
                
                <Text fontSize="lg" fontWeight="bold">Project Overview</Text>
                <Text>{selectedProject.description}</Text>
                
                <Grid templateColumns="1fr 1fr" gap={6}>
                  <VStack align="start" spacing={2}>
                    <Text fontSize="md" fontWeight="semibold">Team</Text>
                    <HStack wrap="wrap">
                      <Avatar size="sm" name={selectedProject.manager} />
                      <Text fontSize="sm" fontWeight="bold">{selectedProject.manager} (Manager)</Text>
                    </HStack>
                    <AvatarGroup size="sm" max={5}>
                      {selectedProject.team.map(member => (
                        <Avatar key={member} name={member} />
                      ))}
                    </AvatarGroup>
                  </VStack>
                  
                  <VStack align="start" spacing={2}>
                    <Text fontSize="md" fontWeight="semibold">Timeline</Text>
                    <HStack>
                      <CalendarIcon />
                      <Text fontSize="sm">Start: {selectedProject.startDate}</Text>
                    </HStack>
                    <HStack>
                      <CalendarIcon />
                      <Text fontSize="sm">End: {selectedProject.endDate}</Text>
                    </HStack>
                  </VStack>
                </Grid>
                
                <Text fontSize="lg" fontWeight="bold">Tasks Overview</Text>
                <SimpleGrid columns={4} spacing={4}>
                  <Stat bg="gray.50" p={3} borderRadius="md">
                    <StatLabel fontSize="xs">Not Started</StatLabel>
                    <StatNumber fontSize="lg">
                      {selectedProject.tasks.filter(t => t.status === 'not_started').length}
                    </StatNumber>
                  </Stat>
                  <Stat bg="blue.50" p={3} borderRadius="md">
                    <StatLabel fontSize="xs">In Progress</StatLabel>
                    <StatNumber fontSize="lg">
                      {selectedProject.tasks.filter(t => t.status === 'in_progress').length}
                    </StatNumber>
                  </Stat>
                  <Stat bg="green.50" p={3} borderRadius="md">
                    <StatLabel fontSize="xs">Completed</StatLabel>
                    <StatNumber fontSize="lg">
                      {selectedProject.tasks.filter(t => t.status === 'completed').length}
                    </StatNumber>
                  </Stat>
                  <Stat bg="red.50" p={3} borderRadius="md">
                    <StatLabel fontSize="xs">Blocked</StatLabel>
                    <StatNumber fontSize="lg">
                      {selectedProject.tasks.filter(t => t.status === 'blocked').length}
                    </StatNumber>
                  </Stat>
                </SimpleGrid>
                
                {generateProjectInsights(selectedProject).length > 0 && (
                  <>
                    <Text fontSize="lg" fontWeight="bold">AI Insights</Text>
                    <VStack spacing={3}>
                      {generateProjectInsights(selectedProject).map((insight, index) => (
                        <Alert key={index} status={insight.type as any}>
                          <AlertIcon />
                          <VStack align="start" spacing={1}>
                            <Text fontSize="sm" fontWeight="semibold">{insight.title}</Text>
                            <Text fontSize="sm">{insight.description}</Text>
                          </VStack>
                        </Alert>
                      ))}
                    </VStack>
                  </>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onProjectDetailsClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={() => {
              setSelectedProject(selectedProject);
              onProjectDetailsClose();
              onNewProjectOpen();
            }}>
              Edit Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Bulk Actions Modal */}
      <Modal isOpen={isBulkActionsOpen} onClose={onBulkActionsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bulk Actions ({bulkSelection.length} projects)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Button w="full" leftIcon={<EditIcon />} onClick={() => {
                // Bulk edit logic
                onBulkActionsClose();
                toast({
                  title: 'Bulk Edit Started',
                  description: `Editing ${bulkSelection.length} projects`,
                  status: 'info',
                  duration: 3000
                });
              }}>
                Edit Selected Projects
              </Button>
              <Button w="full" leftIcon={<RepeatIcon />} onClick={() => {
                bulkUpdateProjects(bulkSelection, { status: 'on_hold' });
                onBulkActionsClose();
              }}>
                Change Status
              </Button>
              <Button w="full" leftIcon={<DownloadIcon />} onClick={() => {
                exportProjectData('excel', bulkSelection);
                onBulkActionsClose();
              }}>
                Export Selected
              </Button>
              <Divider />
              <Button w="full" leftIcon={<DeleteIcon />} colorScheme="red" onClick={() => {
                // Archive projects logic
                onBulkActionsClose();
                toast({
                  title: 'Projects Archived',
                  description: `${bulkSelection.length} projects moved to archive`,
                  status: 'success',
                  duration: 3000
                });
                setBulkSelection([]);
              }}>
                Archive Selected
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onBulkActionsClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Export Modal */}
      <Modal isOpen={isExportOpen} onClose={onExportClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Project Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Export Format</FormLabel>
                <Select>
                  <option value="csv">CSV File</option>
                  <option value="excel">Excel Workbook</option>
                  <option value="pdf">PDF Report</option>
                  <option value="json">JSON Data</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Include</FormLabel>
                <CheckboxGroup>
                  <VStack align="start">
                    <Checkbox defaultIsChecked>Project Details</Checkbox>
                    <Checkbox defaultIsChecked>Tasks</Checkbox>
                    <Checkbox defaultIsChecked>Resources</Checkbox>
                    <Checkbox>Time Tracking</Checkbox>
                    <Checkbox>Comments</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onExportClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => {
              exportProjectData('excel');
              onExportClose();
            }}>
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Enhanced New/Edit Project Modal */}
      <Modal isOpen={isNewProjectOpen} onClose={onNewProjectClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedProject ? 'Edit Project' : 'Create New Project'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="70vh" overflowY="auto">
            <VStack spacing={6}>
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  Advanced project creation with AI-powered templates, resource optimization, and seamless integration with process management
                </Text>
              </Alert>
              
              <Grid templateColumns="1fr 1fr" gap={6} w="full">
                <FormControl>
                  <FormLabel>Project Name *</FormLabel>
                  <Input 
                    placeholder="Enter project name" 
                    defaultValue={selectedProject?.name || ''}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Project Code</FormLabel>
                  <Input placeholder="e.g., PROJ-2024-001" />
                </FormControl>
              </Grid>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  placeholder="Project description, objectives, and key deliverables" 
                  rows={4}
                  defaultValue={selectedProject?.description || ''}
                />
              </FormControl>
              
              <Grid templateColumns="1fr 1fr 1fr" gap={4} w="full">
                <FormControl>
                  <FormLabel>Project Manager *</FormLabel>
                  <Select placeholder="Select manager" defaultValue={selectedProject?.manager || ''}>
                    {teamMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Priority *</FormLabel>
                  <Select placeholder="Select priority" defaultValue={selectedProject?.priority || 'medium'}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                    <option value="urgent">Urgent</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select defaultValue={selectedProject?.status || 'planning'}>
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid templateColumns="1fr 1fr" gap={4} w="full">
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input type="date" defaultValue={selectedProject?.startDate || ''} />
                </FormControl>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input type="date" defaultValue={selectedProject?.endDate || ''} />
                </FormControl>
              </Grid>
              
              <Grid templateColumns="1fr 1fr" gap={4} w="full">
                <FormControl>
                  <FormLabel>Budget ($)</FormLabel>
                  <NumberInput defaultValue={selectedProject?.budget || 0}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Risk Level</FormLabel>
                  <Select defaultValue={selectedProject?.riskLevel || 'low'}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </Select>
                </FormControl>
              </Grid>
              
              <FormControl>
                <FormLabel>Team Members</FormLabel>
                <CheckboxGroup defaultValue={selectedProject?.team || []}>
                  <SimpleGrid columns={2} spacing={2}>
                    {teamMembers.map(member => (
                      <Checkbox key={member} value={member}>
                        <HStack>
                          <Avatar size="xs" name={member} />
                          <Text fontSize="sm">{member}</Text>
                        </HStack>
                      </Checkbox>
                    ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </FormControl>
              
              <FormControl>
                <FormLabel>Project Tags</FormLabel>
                <HStack wrap="wrap" spacing={2}>
                  {['high-priority', 'client-facing', 'internal', 'research', 'development', 'marketing'].map(tag => (
                    <Tag key={tag} size="sm" variant="outline" cursor="pointer" _hover={{ bg: 'blue.50' }}>
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
              </FormControl>
              
              <FormControl>
                <FormLabel>Integration Options</FormLabel>
                <VStack align="start" spacing={2}>
                  <Checkbox defaultIsChecked>
                    🔗 Link with Process Management
                  </Checkbox>
                  <Checkbox>
                    📊 Enable Advanced Analytics
                  </Checkbox>
                  <Checkbox>
                    🤖 AI-Powered Recommendations
                  </Checkbox>
                  <Checkbox>
                    ⏱️ Automatic Time Tracking
                  </Checkbox>
                </VStack>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onNewProjectClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={() => {
              // Project creation/update logic
              onNewProjectClose();
              toast({
                title: selectedProject ? 'Project Updated' : 'Project Created',
                description: selectedProject ? 'Project details updated successfully' : 'New project created successfully',
                status: 'success',
                duration: 3000
              });
              setSelectedProject(null);
            }}>
              {selectedProject ? 'Update Project' : 'Create Project'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProjectManagement;