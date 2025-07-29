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
  AccordionIcon
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
  TrendingDownIcon
} from '@chakra-ui/icons';

// Comprehensive HR interfaces based on Noe, Hollenbeck, Gerhart & Wright framework
interface Employee {
  id: string;
  employeeNumber: string;
  personalInfo: PersonalInfo;
  jobInfo: JobInfo;
  compensation: CompensationInfo;
  performance: PerformanceInfo;
  development: DevelopmentInfo;
  engagement: EngagementInfo;
  competencies: Competency[];
  certifications: Certification[];
  goals: Goal[];
  feedbackHistory: Feedback[];
  careerPath: CareerPath;
  riskFactors: RiskFactor[];
  succession: SuccessionInfo;
  status: 'active' | 'inactive' | 'terminated' | 'on_leave';
  createdAt: string;
  updatedAt: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  emergencyContact: EmergencyContact;
  dateOfBirth: string;
  gender: string;
  ethnicity?: string;
  veteranStatus?: string;
  disabilityStatus?: string;
  pronouns?: string;
  languages: Language[];
  photo?: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface Language {
  language: string;
  proficiency: 'basic' | 'intermediate' | 'advanced' | 'fluent' | 'native';
}

interface JobInfo {
  title: string;
  department: string;
  division: string;
  location: string;
  manager: string;
  directReports: string[];
  employmentType: 'full_time' | 'part_time' | 'contract' | 'intern';
  workArrangement: 'onsite' | 'remote' | 'hybrid';
  startDate: string;
  endDate?: string;
  jobDescription: string;
  responsibilities: string[];
  requirements: string[];
  workSchedule: WorkSchedule;
  costCenter: string;
  grade: string;
  level: number;
  exemptStatus: boolean;
}

interface WorkSchedule {
  standardHours: number;
  workDays: string[];
  startTime: string;
  endTime: string;
  timeZone: string;
  flexibleHours: boolean;
}

interface CompensationInfo {
  baseSalary: number;
  currency: string;
  payFrequency: 'hourly' | 'weekly' | 'biweekly' | 'monthly' | 'annually';
  bonus: BonusInfo;
  equity: EquityInfo;
  benefits: BenefitInfo;
  totalCompensation: number;
  marketData: MarketData;
  payHistory: PayHistory[];
  nextReviewDate: string;
}

interface BonusInfo {
  targetBonus: number;
  bonusType: 'performance' | 'retention' | 'signing' | 'project' | 'annual';
  bonusStructure: 'percentage' | 'fixed_amount';
  payoutSchedule: 'annual' | 'quarterly' | 'monthly';
  criteria: string[];
}

interface EquityInfo {
  stockOptions: number;
  vestingSchedule: VestingSchedule;
  strikePrice: number;
  grantDate: string;
  equityType: 'options' | 'rsu' | 'espp';
}

interface VestingSchedule {
  cliffPeriod: number; // months
  vestingPeriod: number; // months
  vestingFrequency: 'monthly' | 'quarterly' | 'annually';
  accelerationTriggers: string[];
}

interface BenefitInfo {
  healthInsurance: HealthInsurance;
  retirement: RetirementBenefit;
  timeOff: TimeOffBenefit;
  otherBenefits: OtherBenefit[];
  benefitValue: number;
}

interface HealthInsurance {
  plan: string;
  coverage: 'employee' | 'employee_spouse' | 'family';
  premiumEmployee: number;
  premiumEmployer: number;
  deductible: number;
  coinsurance: number;
}

interface RetirementBenefit {
  plan401k: boolean;
  employeeContribution: number;
  employerMatch: number;
  vestingSchedule: string;
  additionalRetirementBenefits: string[];
}

interface TimeOffBenefit {
  vacationDays: number;
  sickDays: number;
  personalDays: number;
  holidays: number;
  parentalLeave: number;
  sabbatical: boolean;
  unlimited: boolean;
}

interface OtherBenefit {
  type: string;
  description: string;
  value: number;
  provider: string;
}

interface MarketData {
  percentile: number;
  marketMedian: number;
  compaRatio: number;
  lastBenchmarkDate: string;
  source: string;
}

interface PayHistory {
  effectiveDate: string;
  previousSalary: number;
  newSalary: number;
  increaseAmount: number;
  increasePercentage: number;
  reason: string;
  approvedBy: string;
}

interface PerformanceInfo {
  currentRating: PerformanceRating;
  ratingHistory: PerformanceRating[];
  goals: Goal[];
  feedback: Feedback[];
  developmentPlan: DevelopmentPlan;
  calibrationData: CalibrationData;
  potentialRating: 'high' | 'medium' | 'low';
  riskOfLeaving: 'high' | 'medium' | 'low';
  lastReviewDate: string;
  nextReviewDate: string;
}

interface PerformanceRating {
  reviewPeriod: string;
  overallRating: number; // 1-5 scale
  coreCompetencies: CompetencyRating[];
  goalAchievement: GoalRating[];
  leadershipSkills?: CompetencyRating[];
  culturalFit: number;
  comments: string;
  ratedBy: string;
  ratingDate: string;
  calibrated: boolean;
}

interface CompetencyRating {
  competencyId: string;
  rating: number;
  evidence: string;
  developmentNeeds: string[];
}

interface GoalRating {
  goalId: string;
  achievementLevel: number; // percentage
  impact: 'high' | 'medium' | 'low';
  comments: string;
}

interface CalibrationData {
  calibrationSession: string;
  originalRating: number;
  calibratedRating: number;
  rationale: string;
  participants: string[];
}

interface DevelopmentInfo {
  developmentPlan: DevelopmentPlan;
  skills: Skill[];
  certifications: Certification[];
  education: Education[];
  trainingHistory: Training[];
  mentoringRelationships: MentoringRelationship[];
  careerAspirations: string[];
  developmentBudget: number;
  lastDevelopmentReview: string;
}

interface DevelopmentPlan {
  id: string;
  period: string;
  objectives: DevelopmentObjective[];
  skillGaps: SkillGap[];
  learningPlan: LearningActivity[];
  mentorAssigned: string;
  budget: number;
  status: 'draft' | 'active' | 'completed' | 'on_hold';
  progress: number;
}

interface DevelopmentObjective {
  id: string;
  description: string;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  measurementCriteria: string;
  resources: string[];
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
}

interface SkillGap {
  skillId: string;
  currentLevel: number;
  targetLevel: number;
  priority: 'critical' | 'important' | 'nice_to_have';
  timelineToClose: string;
  developmentActivities: string[];
}

interface LearningActivity {
  id: string;
  title: string;
  type: 'course' | 'workshop' | 'conference' | 'certification' | 'mentoring' | 'on_job';
  provider: string;
  duration: number;
  cost: number;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
  completionRate: number;
  skills: string[];
}

interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'leadership' | 'business' | 'language';
  currentLevel: number; // 1-5 scale
  targetLevel: number;
  certificationRequired: boolean;
  lastAssessed: string;
  assessedBy: string;
  evidence: string[];
}

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  maintainanceRequired: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  honors?: string[];
  relevantCoursework: string[];
  ongoing: boolean;
}

interface Training {
  id: string;
  title: string;
  provider: string;
  completionDate: string;
  hoursCompleted: number;
  certificateEarned: boolean;
  skills: string[];
  feedback: string;
  rating: number;
}

interface MentoringRelationship {
  id: string;
  type: 'mentor' | 'mentee';
  partnerId: string;
  partnerName: string;
  startDate: string;
  endDate?: string;
  goals: string[];
  meetingFrequency: string;
  status: 'active' | 'completed' | 'paused';
  feedback: string;
}

interface EngagementInfo {
  engagementScore: number; // 1-100
  satisfactionScore: number; // 1-100
  npsScore: number; // -100 to 100
  stayInterview: StayInterviewData;
  pulsesurveys: PulseSurveyResponse[];
  recognitions: Recognition[];
  workLifeBalance: WorkLifeBalanceData;
  culturalFit: number; // 1-10
  lastEngagementSurvey: string;
}

interface StayInterviewData {
  date: string;
  conductedBy: string;
  keyMotivators: string[];
  concerns: string[];
  improvementSuggestions: string[];
  retentionRisk: 'low' | 'medium' | 'high';
  actionItems: string[];
}

interface PulseSurveyResponse {
  surveyId: string;
  date: string;
  questions: SurveyQuestion[];
  overallScore: number;
  comments: string;
}

interface SurveyQuestion {
  question: string;
  response: number;
  category: 'engagement' | 'satisfaction' | 'culture' | 'leadership' | 'development';
}

interface Recognition {
  id: string;
  type: 'peer' | 'manager' | 'customer' | 'company';
  title: string;
  description: string;
  recognizedBy: string;
  date: string;
  publiclyShared: boolean;
  monetaryValue?: number;
}

interface WorkLifeBalanceData {
  averageWorkHours: number;
  overtimeHours: number;
  weekendWork: number;
  vacationUtilization: number;
  stressLevel: number; // 1-10
  workload: 'light' | 'manageable' | 'heavy' | 'overwhelming';
  flexibilityRating: number; // 1-10
}

interface Competency {
  id: string;
  name: string;
  category: 'core' | 'leadership' | 'technical' | 'functional';
  level: number; // 1-5
  description: string;
  behavioralIndicators: string[];
  assessmentMethods: string[];
  developmentResources: string[];
  lastAssessed: string;
  assessor: string;
  evidence: string[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'performance' | 'development' | 'behavioral' | 'project';
  category: 'individual' | 'team' | 'department' | 'company';
  priority: 'high' | 'medium' | 'low';
  startDate: string;
  targetDate: string;
  measurableOutcome: string;
  successCriteria: string[];
  keyResults: KeyResult[];
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'completed' | 'deferred' | 'cancelled';
  lastUpdated: string;
  linkedToBusinessGoals: string[];
}

interface KeyResult {
  id: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  dueDate: string;
  status: 'on_track' | 'at_risk' | 'off_track' | 'completed';
}

interface Feedback {
  id: string;
  type: 'performance' | 'behavioral' | 'development' | '360' | 'upward' | 'peer';
  providedBy: string;
  providedTo: string;
  date: string;
  content: string;
  rating?: number;
  actionItems: string[];
  followUpDate?: string;
  category: 'strength' | 'development_area' | 'general';
  anonymous: boolean;
  context: string;
}

interface CareerPath {
  currentRole: string;
  careerTrack: 'individual_contributor' | 'management' | 'technical_expert' | 'hybrid';
  nextPossibleRoles: string[];
  careerAspirations: string[];
  readinessForPromotion: 'ready_now' | 'ready_in_1_year' | 'ready_in_2_years' | 'not_ready';
  skillsForPromotion: string[];
  experienceGaps: string[];
  careerTimeline: CareerMilestone[];
  mentorRecommendations: string[];
}

interface CareerMilestone {
  role: string;
  targetDate: string;
  requiredSkills: string[];
  experiences: string[];
  developmentActivities: string[];
  probability: number; // 0-100
}

interface RiskFactor {
  id: string;
  category: 'performance' | 'engagement' | 'compliance' | 'behavior' | 'attendance';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-100
  impact: string;
  mitigationPlan: string;
  owner: string;
  dueDate: string;
  status: 'identified' | 'plan_developed' | 'in_progress' | 'resolved' | 'escalated';
  lastReviewed: string;
}

interface SuccessionInfo {
  isKeyPosition: boolean;
  successors: Successor[];
  readyNow: string[];
  readyInOneYear: string[];
  readyInTwoYears: string[];
  riskOfVacancy: 'low' | 'medium' | 'high';
  knowledgeTransferPlan: KnowledgeTransferPlan;
  criticalSkills: string[];
  institutionalKnowledge: string[];
}

interface Successor {
  employeeId: string;
  readiness: 'ready_now' | 'ready_in_1_year' | 'ready_in_2_years';
  fitScore: number; // 0-100
  developmentNeeds: string[];
  probability: number; // 0-100
}

interface KnowledgeTransferPlan {
  criticalKnowledge: string[];
  documentationStatus: string;
  mentorshipPlan: string;
  trainingPlan: string;
  timeline: string;
  status: 'not_started' | 'in_progress' | 'completed';
}

// HR Analytics and Insights
interface HRAnalytics {
  workforce: WorkforceAnalytics;
  talent: TalentAnalytics;
  engagement: EngagementAnalytics;
  performance: PerformanceAnalytics;
  compensation: CompensationAnalytics;
  diversity: DiversityAnalytics;
  turnover: TurnoverAnalytics;
  recruiting: RecruitingAnalytics;
}

interface EngagementAnalytics {
  overallEngagement: number;
  satisfactionScore: number;
  npsScore: number;
  engagementTrends: EngagementTrend[];
  topEngagementDrivers: string[];
  engagementByDepartment: DepartmentEngagement[];
}

interface EngagementTrend {
  period: string;
  score: number;
}

interface DepartmentEngagement {
  department: string;
  score: number;
}

interface PerformanceAnalytics {
  averageRating: number;
  ratingDistribution: RatingDistribution[];
  goalCompletionRate: number;
  calibrationAccuracy: number;
}

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

interface CompensationAnalytics {
  totalPayroll: number;
  averageSalary: number;
  payEquityRatio: number;
  compaRatioDistribution: CompaRatioDistribution[];
  marketPositioning: number;
  budgetVariance: number;
}

interface CompaRatioDistribution {
  range: string;
  count: number;
}

interface DiversityAnalytics {
  overallDiversityIndex: number;
  leadershipDiversity: number;
  hiringDiversity: number;
  promotionEquity: number;
  payEquity: PayEquity;
  inclusionScore: number;
}

interface PayEquity {
  genderPayGap: number;
  ethnicityPayGap: number;
}

interface TurnoverAnalytics {
  overallTurnoverRate: number;
  voluntaryTurnoverRate: number;
  involuntaryTurnoverRate: number;
  turnoverByDepartment: DepartmentTurnover[];
  turnoverCost: number;
  averageTimeTofill: number;
  retentionRate: number;
}

interface DepartmentTurnover {
  department: string;
  rate: number;
}

interface RecruitingAnalytics {
  openPositions: number;
  averageTimeToFill: number;
  averageCostPerHire: number;
  sourceEffectiveness: SourceEffectiveness[];
  candidateExperience: number;
  offerAcceptanceRate: number;
}

interface SourceEffectiveness {
  source: string;
  hires: number;
  cost: number;
}

interface WorkforceAnalytics {
  totalEmployees: number;
  newHires: number;
  terminations: number;
  headcountTrend: HeadcountTrend[];
  demographicBreakdown: DemographicBreakdown;
  locationDistribution: LocationDistribution[];
  departmentSizes: DepartmentSize[];
  workArrangements: WorkArrangementDistribution;
}

interface HeadcountTrend {
  period: string;
  totalHeadcount: number;
  newHires: number;
  terminations: number;
  netChange: number;
}

interface DemographicBreakdown {
  ageGroups: AgeGroup[];
  genderDistribution: GenderDistribution;
  ethnicityDistribution: EthnicityDistribution[];
  tenureDistribution: TenureDistribution[];
}

interface AgeGroup {
  range: string;
  count: number;
  percentage: number;
}

interface GenderDistribution {
  male: number;
  female: number;
  nonBinary: number;
  preferNotToSay: number;
}

interface EthnicityDistribution {
  ethnicity: string;
  count: number;
  percentage: number;
}

interface TenureDistribution {
  range: string;
  count: number;
  percentage: number;
}

interface LocationDistribution {
  location: string;
  count: number;
  percentage: number;
}

interface DepartmentSize {
  department: string;
  headcount: number;
  budgetedHeadcount: number;
  variance: number;
}

interface WorkArrangementDistribution {
  onsite: number;
  remote: number;
  hybrid: number;
}

interface TalentAnalytics {
  successionReadiness: SuccessionReadiness;
  skillGaps: SkillGapAnalysis[];
  highPotentialEmployees: number;
  flightRisk: FlightRiskAnalysis;
  promotionReadiness: PromotionReadiness[];
  developmentParticipation: DevelopmentParticipation;
}

interface SuccessionReadiness {
  keyPositions: number;
  positionsWithSuccessors: number;
  readyNow: number;
  readyInOneYear: number;
  readyInTwoYears: number;
  atRiskPositions: number;
}

interface SkillGapAnalysis {
  skill: string;
  requiredLevel: number;
  currentAverageLevel: number;
  gap: number;
  employeesAffected: number;
  criticalityScore: number;
}

interface FlightRiskAnalysis {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  topRiskFactors: string[];
  retentionActions: number;
}

interface PromotionReadiness {
  level: string;
  readyNow: number;
  readyInSixMonths: number;
  readyInOneYear: number;
  promotionRate: number;
}

interface DevelopmentParticipation {
  participationRate: number;
  averageDevelopmentHours: number;
  budgetUtilization: number;
  completionRate: number;
  satisfactionScore: number;
}

const EnhancedHRModule: React.FC = () => {
  // Core state management
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [hrAnalytics, setHrAnalytics] = useState<HRAnalytics | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // UI state
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'analytics'>('grid');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // Modal states
  const {
    isOpen: isEmployeeModalOpen,
    onOpen: onEmployeeModalOpen,
    onClose: onEmployeeModalClose
  } = useDisclosure();
  const {
    isOpen: isPerformanceModalOpen,
    onOpen: onPerformanceModalOpen,
    onClose: onPerformanceModalClose
  } = useDisclosure();
  const {
    isOpen: isDevelopmentModalOpen,
    onOpen: onDevelopmentModalOpen,
    onClose: onDevelopmentModalClose
  } = useDisclosure();
  const {
    isOpen: isSuccessionModalOpen,
    onOpen: onSuccessionModalOpen,
    onClose: onSuccessionModalClose
  } = useDisclosure();
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const greenBg = useColorModeValue('green.50', 'green.900');
  const redBg = useColorModeValue('red.50', 'red.900');
  const yellowBg = useColorModeValue('yellow.50', 'yellow.900');
  
  // Initialize sample data
  useEffect(() => {
    generateSampleHRData();
  }, []);
  
  const generateSampleHRData = useCallback(() => {
    // Sample employees based on comprehensive HR framework
    const sampleEmployees: Employee[] = [
      {
        id: 'emp-001',
        employeeNumber: 'E2024001',
        personalInfo: {
          firstName: 'Sarah',
          lastName: 'Chen',
          email: 'sarah.chen@company.com',
          phone: '+1-555-0123',
          address: {
            street: '123 Tech Street',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
            country: 'USA'
          },
          emergencyContact: {
            name: 'Michael Chen',
            relationship: 'Spouse',
            phone: '+1-555-0124',
            email: 'michael.chen@email.com'
          },
          dateOfBirth: '1990-05-15',
          gender: 'Female',
          ethnicity: 'Asian',
          pronouns: 'She/Her',
          languages: [
            { language: 'English', proficiency: 'native' },
            { language: 'Mandarin', proficiency: 'fluent' }
          ]
        },
        jobInfo: {
          title: 'Senior Software Engineer',
          department: 'Engineering',
          division: 'Product Development',
          location: 'San Francisco, CA',
          manager: 'emp-002',
          directReports: ['emp-003', 'emp-004'],
          employmentType: 'full_time',
          workArrangement: 'hybrid',
          startDate: '2022-01-15',
          jobDescription: 'Lead software development initiatives and mentor junior developers',
          responsibilities: [
            'Design and implement scalable software solutions',
            'Mentor junior developers',
            'Collaborate with product teams',
            'Code review and quality assurance'
          ],
          requirements: [
            'Bachelor\'s in Computer Science or equivalent',
            '5+ years software development experience',
            'Proficiency in Python, JavaScript, React'
          ],
          workSchedule: {
            standardHours: 40,
            workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            startTime: '09:00',
            endTime: '17:00',
            timeZone: 'PST',
            flexibleHours: true
          },
          costCenter: 'ENG-001',
          grade: 'E5',
          level: 5,
          exemptStatus: true
        },
        compensation: {
          baseSalary: 150000,
          currency: 'USD',
          payFrequency: 'annually',
          bonus: {
            targetBonus: 25000,
            bonusType: 'performance',
            bonusStructure: 'percentage',
            payoutSchedule: 'annual',
            criteria: ['Individual performance', 'Company performance', 'Team goals']
          },
          equity: {
            stockOptions: 5000,
            vestingSchedule: {
              cliffPeriod: 12,
              vestingPeriod: 48,
              vestingFrequency: 'monthly',
              accelerationTriggers: ['Change of control', 'Involuntary termination']
            },
            strikePrice: 50,
            grantDate: '2022-01-15',
            equityType: 'options'
          },
          benefits: {
            healthInsurance: {
              plan: 'Premium PPO',
              coverage: 'family',
              premiumEmployee: 200,
              premiumEmployer: 800,
              deductible: 1000,
              coinsurance: 0.2
            },
            retirement: {
              plan401k: true,
              employeeContribution: 0.06,
              employerMatch: 0.04,
              vestingSchedule: 'Immediate',
              additionalRetirementBenefits: ['Life insurance', 'Disability insurance']
            },
            timeOff: {
              vacationDays: 25,
              sickDays: 10,
              personalDays: 5,
              holidays: 12,
              parentalLeave: 12,
              sabbatical: true,
              unlimited: false
            },
            otherBenefits: [
              { type: 'Wellness', description: 'Gym membership', value: 1200, provider: 'Corporate Wellness' },
              { type: 'Education', description: 'Professional development', value: 3000, provider: 'Company' }
            ],
            benefitValue: 25000
          },
          totalCompensation: 200000,
          marketData: {
            percentile: 75,
            marketMedian: 140000,
            compaRatio: 1.07,
            lastBenchmarkDate: '2024-01-01',
            source: 'Radford Survey'
          },
          payHistory: [
            {
              effectiveDate: '2024-01-01',
              previousSalary: 140000,
              newSalary: 150000,
              increaseAmount: 10000,
              increasePercentage: 7.14,
              reason: 'Annual merit increase',
              approvedBy: 'emp-002'
            }
          ],
          nextReviewDate: '2025-01-01'
        },
        performance: {
          currentRating: {
            reviewPeriod: '2023',
            overallRating: 4.2,
            coreCompetencies: [
              {
                competencyId: 'technical_expertise',
                rating: 4.5,
                evidence: 'Led successful migration to microservices architecture',
                developmentNeeds: ['Advanced system design patterns']
              },
              {
                competencyId: 'collaboration',
                rating: 4.0,
                evidence: 'Excellent cross-team collaboration on product launches',
                developmentNeeds: ['Stakeholder management']
              }
            ],
            goalAchievement: [
              {
                goalId: 'goal-001',
                achievementLevel: 110,
                impact: 'high',
                comments: 'Exceeded performance targets'
              }
            ],
            culturalFit: 4.3,
            comments: 'Outstanding technical contributor with strong leadership potential',
            ratedBy: 'emp-002',
            ratingDate: '2024-01-15',
            calibrated: true
          },
          ratingHistory: [],
          goals: [],
          feedback: [],
          developmentPlan: {
            id: 'dev-001',
            period: '2024',
            objectives: [
              {
                id: 'obj-001',
                description: 'Develop system architecture skills',
                targetDate: '2024-12-31',
                priority: 'high',
                measurementCriteria: 'Complete advanced architecture course and lead 2 design reviews',
                resources: ['Online courses', 'Internal mentorship'],
                progress: 30,
                status: 'in_progress'
              }
            ],
            skillGaps: [
              {
                skillId: 'system_design',
                currentLevel: 3,
                targetLevel: 4,
                priority: 'critical',
                timelineToClose: '6 months',
                developmentActivities: ['Architecture course', 'Design review participation']
              }
            ],
            learningPlan: [],
            mentorAssigned: 'emp-005',
            budget: 5000,
            status: 'active',
            progress: 35
          },
          calibrationData: {
            calibrationSession: 'Q4-2023',
            originalRating: 4.0,
            calibratedRating: 4.2,
            rationale: 'Adjusted upward based on peer comparison',
            participants: ['emp-002', 'emp-006', 'emp-007']
          },
          potentialRating: 'high',
          riskOfLeaving: 'low',
          lastReviewDate: '2024-01-15',
          nextReviewDate: '2025-01-15'
        },
        development: {
          developmentPlan: {
            id: 'dev-001',
            period: '2024',
            objectives: [],
            skillGaps: [],
            learningPlan: [],
            mentorAssigned: 'emp-005',
            budget: 5000,
            status: 'active',
            progress: 35
          },
          skills: [
            {
              id: 'python',
              name: 'Python Programming',
              category: 'technical',
              currentLevel: 4,
              targetLevel: 5,
              certificationRequired: false,
              lastAssessed: '2024-01-15',
              assessedBy: 'emp-002',
              evidence: ['Code reviews', 'Project deliveries', 'Peer feedback']
            }
          ],
          certifications: [
            {
              id: 'aws-cert',
              name: 'AWS Solutions Architect',
              issuingOrganization: 'Amazon Web Services',
              issueDate: '2023-06-15',
              expirationDate: '2026-06-15',
              credentialId: 'AWS-SA-2023-001',
              verificationUrl: 'https://aws.amazon.com/verification',
              skills: ['Cloud Architecture', 'AWS Services'],
              maintainanceRequired: true
            }
          ],
          education: [
            {
              id: 'edu-001',
              institution: 'Stanford University',
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              startDate: '2008-09-01',
              endDate: '2012-06-15',
              gpa: 3.8,
              honors: ['Magna Cum Laude'],
              relevantCoursework: ['Data Structures', 'Algorithms', 'Software Engineering'],
              ongoing: false
            }
          ],
          trainingHistory: [],
          mentoringRelationships: [
            {
              id: 'mentor-001',
              type: 'mentee',
              partnerId: 'emp-005',
              partnerName: 'Alex Johnson',
              startDate: '2024-01-01',
              goals: ['Leadership development', 'Career advancement'],
              meetingFrequency: 'Bi-weekly',
              status: 'active',
              feedback: 'Very helpful and insightful sessions'
            }
          ],
          careerAspirations: ['Technical Lead', 'Engineering Manager', 'Product Owner'],
          developmentBudget: 5000,
          lastDevelopmentReview: '2024-01-15'
        },
        engagement: {
          engagementScore: 85,
          satisfactionScore: 88,
          npsScore: 45,
          stayInterview: {
            date: '2024-02-01',
            conductedBy: 'emp-002',
            keyMotivators: ['Technical challenges', 'Team collaboration', 'Growth opportunities'],
            concerns: ['Work-life balance during crunch time'],
            improvementSuggestions: ['More flexible working hours', 'Better project planning'],
            retentionRisk: 'low',
            actionItems: ['Discuss flexible schedule options', 'Improve sprint planning']
          },
          pulsesurveys: [],
          recognitions: [
            {
              id: 'rec-001',
              type: 'peer',
              title: 'Outstanding Collaboration',
              description: 'Exceptional support during the Q3 product launch',
              recognizedBy: 'emp-003',
              date: '2024-01-30',
              publiclyShared: true
            }
          ],
          workLifeBalance: {
            averageWorkHours: 42,
            overtimeHours: 2,
            weekendWork: 0,
            vacationUtilization: 80,
            stressLevel: 3,
            workload: 'manageable',
            flexibilityRating: 8
          },
          culturalFit: 9,
          lastEngagementSurvey: '2024-01-01'
        },
        competencies: [],
        certifications: [],
        goals: [],
        feedbackHistory: [],
        careerPath: {
          currentRole: 'Senior Software Engineer',
          careerTrack: 'technical_expert',
          nextPossibleRoles: ['Staff Software Engineer', 'Technical Lead', 'Engineering Manager'],
          careerAspirations: ['Technical Lead', 'Engineering Manager'],
          readinessForPromotion: 'ready_in_1_year',
          skillsForPromotion: ['System design', 'Leadership', 'Project management'],
          experienceGaps: ['Leading large projects', 'Cross-functional collaboration'],
          careerTimeline: [
            {
              role: 'Staff Software Engineer',
              targetDate: '2025-01-01',
              requiredSkills: ['Advanced system design', 'Technical leadership'],
              experiences: ['Lead major project', 'Mentor 3+ engineers'],
              developmentActivities: ['Architecture training', 'Leadership workshop'],
              probability: 75
            }
          ],
          mentorRecommendations: ['Focus on system design', 'Take on more leadership responsibilities']
        },
        riskFactors: [],
        succession: {
          isKeyPosition: true,
          successors: [
            {
              employeeId: 'emp-003',
              readiness: 'ready_in_2_years',
              fitScore: 75,
              developmentNeeds: ['Senior-level technical skills', 'Mentoring experience'],
              probability: 70
            }
          ],
          readyNow: [],
          readyInOneYear: [],
          readyInTwoYears: ['emp-003'],
          riskOfVacancy: 'low',
          knowledgeTransferPlan: {
            criticalKnowledge: ['System architecture', 'Legacy system knowledge'],
            documentationStatus: 'In progress',
            mentorshipPlan: 'Pair programming sessions',
            trainingPlan: 'Technical workshops',
            timeline: '6 months',
            status: 'in_progress'
          },
          criticalSkills: ['Python', 'System Design', 'Team Leadership'],
          institutionalKnowledge: ['Legacy system architecture', 'Customer integration patterns']
        },
        status: 'active',
        createdAt: '2022-01-15T00:00:00Z',
        updatedAt: '2024-03-01T00:00:00Z'
      }
    ];
    setEmployees(sampleEmployees);
    
    // Sample HR Analytics
    const sampleAnalytics: HRAnalytics = {
      workforce: {
        totalEmployees: 150,
        newHires: 12,
        terminations: 5,
        headcountTrend: [
          { period: 'Q1 2024', totalHeadcount: 145, newHires: 8, terminations: 3, netChange: 5 },
          { period: 'Q2 2024', totalHeadcount: 150, newHires: 12, terminations: 5, netChange: 7 }
        ],
        demographicBreakdown: {
          ageGroups: [
            { range: '22-30', count: 45, percentage: 30 },
            { range: '31-40', count: 60, percentage: 40 },
            { range: '41-50', count: 30, percentage: 20 },
            { range: '51+', count: 15, percentage: 10 }
          ],
          genderDistribution: {
            male: 75,
            female: 70,
            nonBinary: 3,
            preferNotToSay: 2
          },
          ethnicityDistribution: [
            { ethnicity: 'Asian', count: 45, percentage: 30 },
            { ethnicity: 'White', count: 60, percentage: 40 },
            { ethnicity: 'Hispanic/Latino', count: 25, percentage: 17 },
            { ethnicity: 'Black/African American', count: 15, percentage: 10 },
            { ethnicity: 'Other', count: 5, percentage: 3 }
          ],
          tenureDistribution: [
            { range: '0-1 years', count: 30, percentage: 20 },
            { range: '1-3 years', count: 45, percentage: 30 },
            { range: '3-5 years', count: 40, percentage: 27 },
            { range: '5+ years', count: 35, percentage: 23 }
          ]
        },
        locationDistribution: [
          { location: 'San Francisco, CA', count: 80, percentage: 53 },
          { location: 'Austin, TX', count: 35, percentage: 23 },
          { location: 'Remote', count: 35, percentage: 23 }
        ],
        departmentSizes: [
          { department: 'Engineering', headcount: 60, budgetedHeadcount: 65, variance: -5 },
          { department: 'Sales', headcount: 25, budgetedHeadcount: 25, variance: 0 },
          { department: 'Marketing', headcount: 20, budgetedHeadcount: 22, variance: -2 },
          { department: 'Customer Success', headcount: 15, budgetedHeadcount: 15, variance: 0 },
          { department: 'Operations', headcount: 30, budgetedHeadcount: 28, variance: 2 }
        ],
        workArrangements: {
          onsite: 75,
          remote: 35,
          hybrid: 40
        }
      },
      talent: {
        successionReadiness: {
          keyPositions: 25,
          positionsWithSuccessors: 18,
          readyNow: 8,
          readyInOneYear: 12,
          readyInTwoYears: 15,
          atRiskPositions: 7
        },
        skillGaps: [
          {
            skill: 'Data Science',
            requiredLevel: 4,
            currentAverageLevel: 2.5,
            gap: 1.5,
            employeesAffected: 25,
            criticalityScore: 8.5
          },
          {
            skill: 'Leadership',
            requiredLevel: 4,
            currentAverageLevel: 3.2,
            gap: 0.8,
            employeesAffected: 40,
            criticalityScore: 7.8
          }
        ],
        highPotentialEmployees: 35,
        flightRisk: {
          highRisk: 8,
          mediumRisk: 15,
          lowRisk: 127,
          topRiskFactors: ['Compensation below market', 'Limited growth opportunities', 'Work-life balance'],
          retentionActions: 12
        },
        promotionReadiness: [
          { level: 'Junior to Mid', readyNow: 15, readyInSixMonths: 8, readyInOneYear: 12, promotionRate: 0.75 },
          { level: 'Mid to Senior', readyNow: 8, readyInSixMonths: 12, readyInOneYear: 15, promotionRate: 0.65 },
          { level: 'Senior to Staff', readyNow: 3, readyInSixMonths: 5, readyInOneYear: 8, promotionRate: 0.45 }
        ],
        developmentParticipation: {
          participationRate: 85,
          averageDevelopmentHours: 40,
          budgetUtilization: 78,
          completionRate: 82,
          satisfactionScore: 4.2
        }
      },
      engagement: {
        overallEngagement: 78,
        satisfactionScore: 82,
        npsScore: 35,
        engagementTrends: [
          { period: 'Q1 2024', score: 75 },
          { period: 'Q2 2024', score: 78 }
        ],
        topEngagementDrivers: ['Career development', 'Team relationships', 'Meaningful work'],
        engagementByDepartment: [
          { department: 'Engineering', score: 82 },
          { department: 'Sales', score: 75 },
          { department: 'Marketing', score: 80 }
        ]
      },
      performance: {
        averageRating: 3.8,
        ratingDistribution: [
          { rating: 5, count: 15, percentage: 10 },
          { rating: 4, count: 60, percentage: 40 },
          { rating: 3, count: 60, percentage: 40 },
          { rating: 2, count: 12, percentage: 8 },
          { rating: 1, count: 3, percentage: 2 }
        ],
        goalCompletionRate: 78,
        calibrationAccuracy: 92
      },
      compensation: {
        totalPayroll: 18500000,
        averageSalary: 123333,
        payEquityRatio: 0.98,
        compaRatioDistribution: [
          { range: '0.8-0.9', count: 15 },
          { range: '0.9-1.0', count: 75 },
          { range: '1.0-1.1', count: 45 },
          { range: '1.1+', count: 15 }
        ],
        marketPositioning: 75, // percentile
        budgetVariance: -2.5 // percentage
      },
      diversity: {
        overallDiversityIndex: 0.72,
        leadershipDiversity: 0.65,
        hiringDiversity: 0.78,
        promotionEquity: 0.88,
        payEquity: {
          genderPayGap: 0.02,
          ethnicityPayGap: 0.015
        },
        inclusionScore: 4.1
      },
      turnover: {
        overallTurnoverRate: 8.5,
        voluntaryTurnoverRate: 6.2,
        involuntaryTurnoverRate: 2.3,
        turnoverByDepartment: [
          { department: 'Engineering', rate: 7.8 },
          { department: 'Sales', rate: 12.5 },
          { department: 'Marketing', rate: 6.2 }
        ],
        turnoverCost: 450000,
        averageTimeTofill: 45, // days
        retentionRate: 91.5
      },
      recruiting: {
        openPositions: 15,
        averageTimeToFill: 45,
        averageCostPerHire: 3500,
        sourceEffectiveness: [
          { source: 'Employee Referrals', hires: 8, cost: 2000 },
          { source: 'LinkedIn', hires: 12, cost: 4000 },
          { source: 'Job Boards', hires: 6, cost: 3000 }
        ],
        candidateExperience: 4.3,
        offerAcceptanceRate: 85
      }
    };
    setHrAnalytics(sampleAnalytics);
  }, []);
  
  const runTalentAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const steps = [
      'Analyzing workforce composition...',
      'Evaluating performance trends...',
      'Assessing engagement levels...',
      'Identifying talent risks...',
      'Calculating succession readiness...',
      'Generating insights...'
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
    
    setIsAnalyzing(false);
    
    toast({
      title: 'Talent Analysis Complete',
      description: 'Generated comprehensive workforce insights and recommendations',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }, [toast]);
  
  const getPerformanceColor = useCallback((rating: number) => {
    if (rating >= 4.5) return 'green';
    if (rating >= 3.5) return 'blue';
    if (rating >= 2.5) return 'yellow';
    return 'red';
  }, []);
  
  const getRiskColor = useCallback((risk: string) => {
    switch (risk) {
      case 'low': return 'green';
      case 'medium': return 'yellow';
      case 'high': return 'red';
      default: return 'gray';
    }
  }, []);
  
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesDepartment = filterDepartment === 'all' || emp.jobInfo.department === filterDepartment;
      const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
      const matchesSearch = searchTerm === '' || 
        `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.jobInfo.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDepartment && matchesStatus && matchesSearch;
    });
  }, [employees, filterDepartment, filterStatus, searchTerm]);
  
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
                      👥 Strategic Human Resource Management
                    </Text>
                  </HStack>
                  <Text color="gray.600">
                    Comprehensive HR system based on competitive advantage principles by Noe, Hollenbeck, Gerhart & Wright
                  </Text>
                  <HStack spacing={3} flexWrap="wrap">
                    <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                      👤 Total Employees: {hrAnalytics?.workforce.totalEmployees || 0}
                    </Badge>
                    <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                      📈 Engagement: {hrAnalytics?.engagement.overallEngagement || 0}%
                    </Badge>
                    <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                      ⭐ Avg Performance: {hrAnalytics?.performance.averageRating || 0}/5
                    </Badge>
                    <Badge colorScheme="green" variant="subtle" fontSize="xs">
                      🔄 Retention: {hrAnalytics?.turnover.retentionRate || 0}%
                    </Badge>
                    <Badge colorScheme="orange" variant="subtle" fontSize="xs">
                      🎯 High Potential: {hrAnalytics?.talent.highPotentialEmployees || 0}
                    </Badge>
                  </HStack>
                </VStack>
                
                <VStack spacing={2} align="end">
                  <HStack spacing={2}>
                    {hrAnalytics && (
                      <>
                        <CircularProgress 
                          value={hrAnalytics.engagement.overallEngagement} 
                          color="teal.400"
                          size="60px"
                          thickness="8px"
                        >
                          <CircularProgressLabel fontSize="xs" fontWeight="bold">
                            {hrAnalytics.engagement.overallEngagement}%
                          </CircularProgressLabel>
                        </CircularProgress>
                        
                        <CircularProgress 
                          value={hrAnalytics.turnover.retentionRate} 
                          color="green.400"
                          size="60px"
                          thickness="8px"
                        >
                          <CircularProgressLabel fontSize="xs" fontWeight="bold">
                            {hrAnalytics.turnover.retentionRate}%
                          </CircularProgressLabel>
                        </CircularProgress>
                        
                        <CircularProgress 
                          value={hrAnalytics.talent.successionReadiness.positionsWithSuccessors / hrAnalytics.talent.successionReadiness.keyPositions * 100} 
                          color="purple.400"
                          size="60px"
                          thickness="8px"
                        >
                          <CircularProgressLabel fontSize="xs" fontWeight="bold">
                            {Math.round(hrAnalytics.talent.successionReadiness.positionsWithSuccessors / hrAnalytics.talent.successionReadiness.keyPositions * 100)}%
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
                        <MenuItem icon={<AddIcon />} onClick={onEmployeeModalOpen}>
                          Add Employee
                        </MenuItem>
                        <MenuItem icon={<ViewIcon />} onClick={onPerformanceModalOpen}>
                          Performance Review
                        </MenuItem>
                        <MenuItem icon={<StarIcon />} onClick={onDevelopmentModalOpen}>
                          Development Plan
                        </MenuItem>
                        <MenuItem icon={<TrendingUpIcon />} onClick={onSuccessionModalOpen}>
                          Succession Planning
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<RepeatIcon />} onClick={runTalentAnalysis} isDisabled={isAnalyzing}>
                          Run Talent Analytics
                        </MenuItem>
                        <MenuItem icon={<DownloadIcon />}>
                          Export HR Report
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    
                    <Button 
                      leftIcon={<AddIcon />} 
                      colorScheme="teal" 
                      size="sm"
                      onClick={onEmployeeModalOpen}
                    >
                      Add Employee
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
              
              {/* Analysis Progress */}
              {isAnalyzing && (
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="semibold">Talent Analysis in Progress...</Text>
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
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                    <option value="analytics">Analytics</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Department:</Text>
                  <Select size="sm" value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} w="140px">
                    <option value="all">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Status:</Text>
                  <Select size="sm" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} w="120px">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on_leave">On Leave</option>
                  </Select>
                </HStack>
                
                <HStack spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Search:</Text>
                  <Input 
                    size="sm" 
                    placeholder="Search employees..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    w="200px"
                  />
                </HStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs variant="enclosed" colorScheme="teal" index={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>📊 HR Dashboard</Tab>
            <Tab>👥 Employee Directory ({filteredEmployees.length})</Tab>
            <Tab>⭐ Performance Management</Tab>
            <Tab>📈 Talent Development</Tab>
            <Tab>🔄 Succession Planning</Tab>
            <Tab>📈 Analytics & Insights</Tab>
            <Tab>🎯 Strategic HR</Tab>
          </TabList>

          <TabPanels>
            {/* HR Dashboard Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                {hrAnalytics && (
                  <>
                    {/* Key HR Metrics */}
                    <SimpleGrid columns={4} spacing={6}>
                      <Stat>
                        <StatLabel>Total Workforce</StatLabel>
                        <StatNumber>{hrAnalytics.workforce.totalEmployees}</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          +{hrAnalytics.workforce.newHires} new hires
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Employee Engagement</StatLabel>
                        <StatNumber>{hrAnalytics.engagement.overallEngagement}%</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          +3% from last quarter
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Retention Rate</StatLabel>
                        <StatNumber color="green.500">{hrAnalytics.turnover.retentionRate}%</StatNumber>
                        <StatHelpText>
                          Turnover: {hrAnalytics.turnover.overallTurnoverRate}%
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Succession Coverage</StatLabel>
                        <StatNumber>
                          {Math.round(hrAnalytics.talent.successionReadiness.positionsWithSuccessors / hrAnalytics.talent.successionReadiness.keyPositions * 100)}%
                        </StatNumber>
                        <StatHelpText>
                          {hrAnalytics.talent.successionReadiness.positionsWithSuccessors}/{hrAnalytics.talent.successionReadiness.keyPositions} key positions
                        </StatHelpText>
                      </Stat>
                    </SimpleGrid>
                    
                    {/* Department Overview */}
                    <Card bg={cardBg}>
                      <CardHeader>
                        <Text fontSize="lg" fontWeight="bold">🏢 Department Overview</Text>
                      </CardHeader>
                      <CardBody>
                        <SimpleGrid columns={2} spacing={6}>
                          {hrAnalytics.workforce.departmentSizes.map((dept) => (
                            <HStack key={dept.department} justify="space-between" p={4} bg="gray.50" borderRadius="md">
                              <VStack align="start" spacing={1}>
                                <Text fontSize="sm" fontWeight="semibold">{dept.department}</Text>
                                <HStack>
                                  <Text fontSize="lg" fontWeight="bold">{dept.headcount}</Text>
                                  <Text fontSize="sm" color="gray.600">/ {dept.budgetedHeadcount} budgeted</Text>
                                </HStack>
                              </VStack>
                              <VStack align="end" spacing={1}>
                                <Badge colorScheme={dept.variance >= 0 ? 'green' : 'red'}>
                                  {dept.variance >= 0 ? '+' : ''}{dept.variance}
                                </Badge>
                                <Text fontSize="xs" color="gray.500">variance</Text>
                              </VStack>
                            </HStack>
                          ))}
                        </SimpleGrid>
                      </CardBody>
                    </Card>
                    
                    {/* Talent Insights */}
                    <SimpleGrid columns={2} spacing={6}>
                      <Card bg={cardBg}>
                        <CardHeader>
                          <Text fontSize="lg" fontWeight="bold">🎯 Talent Pipeline</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={4} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="sm">High Potential Employees</Text>
                              <Text fontSize="sm" fontWeight="bold">{hrAnalytics.talent.highPotentialEmployees}</Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">Ready for Promotion</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                {hrAnalytics.talent.promotionReadiness.reduce((sum, p) => sum + p.readyNow, 0)}
                              </Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm">Development Participation</Text>
                              <Text fontSize="sm" fontWeight="bold">{hrAnalytics.talent.developmentParticipation.participationRate}%</Text>
                            </HStack>
                            <Divider />
                            <HStack justify="space-between">
                              <Text fontSize="sm" color="red.500">Flight Risk - High</Text>
                              <Text fontSize="sm" fontWeight="bold" color="red.500">{hrAnalytics.talent.flightRisk.highRisk}</Text>
                            </HStack>
                            <HStack justify="space-between">
                              <Text fontSize="sm" color="yellow.500">Flight Risk - Medium</Text>
                              <Text fontSize="sm" fontWeight="bold" color="yellow.500">{hrAnalytics.talent.flightRisk.mediumRisk}</Text>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                      
                      <Card bg={cardBg}>
                        <CardHeader>
                          <Text fontSize="lg" fontWeight="bold">📊 Performance Distribution</Text>
                        </CardHeader>
                        <CardBody>
                          <VStack spacing={3} align="stretch">
                            {hrAnalytics.performance.ratingDistribution.map((rating) => (
                              <HStack key={rating.rating} justify="space-between">
                                <HStack>
                                  <Text fontSize="sm">{rating.rating} {Array(rating.rating).fill('⭐').join('')}</Text>
                                  <Text fontSize="xs" color="gray.600">({rating.count} employees)</Text>
                                </HStack>
                                <HStack>
                                  <Progress 
                                    value={rating.percentage} 
                                    colorScheme={getPerformanceColor(rating.rating)} 
                                    size="sm" 
                                    w="100px" 
                                  />
                                  <Text fontSize="xs" fontWeight="bold">{rating.percentage}%</Text>
                                </HStack>
                              </HStack>
                            ))}
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                  </>
                )}
              </VStack>
            </TabPanel>

            {/* Employee Directory Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={4} align="stretch">
                {viewMode === 'grid' && (
                  <SimpleGrid columns={3} spacing={6}>
                    {filteredEmployees.map((employee) => (
                      <Card key={employee.id} bg={cardBg} cursor="pointer" _hover={{ shadow: 'md' }}>
                        <CardBody>
                          <VStack spacing={3} align="stretch">
                            <HStack spacing={3}>
                              <Avatar 
                                name={`${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`}
                                src={employee.personalInfo.photo}
                                size="md"
                              />
                              <VStack align="start" spacing={0}>
                                <Text fontSize="md" fontWeight="bold">
                                  {employee.personalInfo.firstName} {employee.personalInfo.lastName}
                                </Text>
                                <Text fontSize="sm" color="gray.600">{employee.jobInfo.title}</Text>
                                <Text fontSize="xs" color="gray.500">{employee.jobInfo.department}</Text>
                              </VStack>
                            </HStack>
                            
                            <HStack justify="space-between">
                              <VStack align="start" spacing={0}>
                                <Text fontSize="xs" color="gray.600">Performance</Text>
                                <HStack>
                                  <Text fontSize="sm" fontWeight="bold">
                                    {employee.performance.currentRating.overallRating}/5
                                  </Text>
                                  <Badge colorScheme={getPerformanceColor(employee.performance.currentRating.overallRating)} size="sm">
                                    {employee.performance.potentialRating}
                                  </Badge>
                                </HStack>
                              </VStack>
                              <VStack align="end" spacing={0}>
                                <Text fontSize="xs" color="gray.600">Risk</Text>
                                <Badge colorScheme={getRiskColor(employee.performance.riskOfLeaving)} size="sm">
                                  {employee.performance.riskOfLeaving}
                                </Badge>
                              </VStack>
                            </HStack>
                            
                            <HStack justify="space-between" fontSize="xs" color="gray.500">
                              <Text>Start: {new Date(employee.jobInfo.startDate).toLocaleDateString()}</Text>
                              <Text>ID: {employee.employeeNumber}</Text>
                            </HStack>
                            
                            <HStack spacing={2}>
                              <Button size="xs" variant="outline" leftIcon={<ViewIcon />}>
                                View Profile
                              </Button>
                              <Button size="xs" variant="outline" leftIcon={<EditIcon />}>
                                Edit
                              </Button>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                )}
                
                {viewMode === 'list' && (
                  <Card bg={cardBg}>
                    <CardBody>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Employee</Th>
                            <Th>Title</Th>
                            <Th>Department</Th>
                            <Th>Performance</Th>
                            <Th>Engagement</Th>
                            <Th>Risk</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {filteredEmployees.map((employee) => (
                            <Tr key={employee.id}>
                              <Td>
                                <HStack>
                                  <Avatar 
                                    name={`${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`}
                                    size="sm"
                                  />
                                  <VStack align="start" spacing={0}>
                                    <Text fontSize="sm" fontWeight="semibold">
                                      {employee.personalInfo.firstName} {employee.personalInfo.lastName}
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">{employee.employeeNumber}</Text>
                                  </VStack>
                                </HStack>
                              </Td>
                              <Td>
                                <Text fontSize="sm">{employee.jobInfo.title}</Text>
                              </Td>
                              <Td>
                                <Text fontSize="sm">{employee.jobInfo.department}</Text>
                              </Td>
                              <Td>
                                <HStack>
                                  <Text fontSize="sm">{employee.performance.currentRating.overallRating}/5</Text>
                                  <Badge colorScheme={getPerformanceColor(employee.performance.currentRating.overallRating)} size="sm">
                                    {employee.performance.potentialRating}
                                  </Badge>
                                </HStack>
                              </Td>
                              <Td>
                                <CircularProgress 
                                  value={employee.engagement.engagementScore} 
                                  color="teal.400" 
                                  size="30px"
                                >
                                  <CircularProgressLabel fontSize="xs">
                                    {employee.engagement.engagementScore}
                                  </CircularProgressLabel>
                                </CircularProgress>
                              </Td>
                              <Td>
                                <Badge colorScheme={getRiskColor(employee.performance.riskOfLeaving)}>
                                  {employee.performance.riskOfLeaving}
                                </Badge>
                              </Td>
                              <Td>
                                <Menu>
                                  <MenuButton as={IconButton} icon={<SettingsIcon />} size="sm" variant="ghost" />
                                  <MenuList>
                                    <MenuItem icon={<ViewIcon />}>View Profile</MenuItem>
                                    <MenuItem icon={<EditIcon />}>Edit Employee</MenuItem>
                                    <MenuItem icon={<StarIcon />}>Performance Review</MenuItem>
                                    <MenuItem icon={<TrendingUpIcon />}>Development Plan</MenuItem>
                                  </MenuList>
                                </Menu>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </CardBody>
                  </Card>
                )}
                
                {filteredEmployees.length === 0 && (
                  <Alert status="info">
                    <AlertIcon />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold">No employees found</Text>
                      <Text fontSize="xs">Adjust your filters or add new employees to get started.</Text>
                    </VStack>
                  </Alert>
                )}
              </VStack>
            </TabPanel>

            {/* Performance Management Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <Card bg={cardBg}>
                  <CardHeader>
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold">⭐ Performance Management System</Text>
                      <Button leftIcon={<AddIcon />} colorScheme="blue" size="sm">
                        Schedule Review
                      </Button>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={3} spacing={6}>
                      <Card bg={greenBg} borderLeft="4px" borderColor="green.400">
                        <CardBody>
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" fontWeight="semibold" color="green.700">Upcoming Reviews</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="green.800">12</Text>
                            <Text fontSize="xs" color="green.600">Next 30 days</Text>
                          </VStack>
                        </CardBody>
                      </Card>
                      
                      <Card bg={yellowBg} borderLeft="4px" borderColor="yellow.400">
                        <CardBody>
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" fontWeight="semibold" color="yellow.700">Overdue Reviews</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="yellow.800">3</Text>
                            <Text fontSize="xs" color="yellow.600">Requires immediate attention</Text>
                          </VStack>
                        </CardBody>
                      </Card>
                      
                      <Card bg="blue.50" borderLeft="4px" borderColor="blue.400">
                        <CardBody>
                          <VStack align="start" spacing={2}>
                            <Text fontSize="sm" fontWeight="semibold" color="blue.700">Goal Completion</Text>
                            <Text fontSize="2xl" fontWeight="bold" color="blue.800">78%</Text>
                            <Text fontSize="xs" color="blue.600">Average across organization</Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                    
                    <Divider my={6} />
                    
                    <VStack spacing={4} align="stretch">
                      <Text fontSize="md" fontWeight="semibold">Performance Review Cycles</Text>
                      
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Employee</Th>
                            <Th>Review Type</Th>
                            <Th>Due Date</Th>
                            <Th>Current Rating</Th>
                            <Th>Goals Progress</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {filteredEmployees.slice(0, 5).map((employee) => (
                            <Tr key={employee.id}>
                              <Td>
                                <HStack>
                                  <Avatar name={`${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`} size="sm" />
                                  <Text fontSize="sm">{employee.personalInfo.firstName} {employee.personalInfo.lastName}</Text>
                                </HStack>
                              </Td>
                              <Td>
                                <Badge colorScheme="purple" size="sm">Annual</Badge>
                              </Td>
                              <Td>
                                <Text fontSize="sm">2024-12-31</Text>
                              </Td>
                              <Td>
                                <HStack>
                                  <Progress 
                                    value={employee.performance.currentRating.overallRating * 20} 
                                    colorScheme={getPerformanceColor(employee.performance.currentRating.overallRating)}
                                    size="sm"
                                    w="60px"
                                  />
                                  <Text fontSize="sm">{employee.performance.currentRating.overallRating}/5</Text>
                                </HStack>
                              </Td>
                              <Td>
                                <CircularProgress 
                                  value={75} 
                                  color="blue.400" 
                                  size="30px"
                                >
                                  <CircularProgressLabel fontSize="xs">75%</CircularProgressLabel>
                                </CircularProgress>
                              </Td>
                              <Td>
                                <Badge colorScheme="green" size="sm">On Track</Badge>
                              </Td>
                              <Td>
                                <Menu>
                                  <MenuButton as={IconButton} icon={<SettingsIcon />} size="sm" variant="ghost" />
                                  <MenuList>
                                    <MenuItem icon={<ViewIcon />}>View Details</MenuItem>
                                    <MenuItem icon={<EditIcon />}>Edit Review</MenuItem>
                                    <MenuItem icon={<CalendarIcon />}>Schedule Meeting</MenuItem>
                                  </MenuList>
                                </Menu>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>

            {/* Talent Development Tab */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                <Card bg={cardBg}>
                  <CardHeader>
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold">📈 Talent Development & Learning</Text>
                      <Button leftIcon={<AddIcon />} colorScheme="purple" size="sm">
                        Create Development Plan
                      </Button>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={4} spacing={6}>
                      <Stat>
                        <StatLabel>Active Learning Plans</StatLabel>
                        <StatNumber>42</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          +15% this quarter
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Skill Certifications</StatLabel>
                        <StatNumber>128</StatNumber>
                        <StatHelpText>
                          <StatArrow type="increase" />
                          +8 this month
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Training Budget Used</StatLabel>
                        <StatNumber>68%</StatNumber>
                        <StatHelpText>
                          $340K of $500K budget
                        </StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel>Learning Hours</StatLabel>
                        <StatNumber>2,840</StatNumber>
                        <StatHelpText>
                          Average 18.9 hrs/employee
                        </StatHelpText>
                      </Stat>
                    </SimpleGrid>
                    
                    <Divider my={6} />
                    
                    <SimpleGrid columns={2} spacing={6}>
                      <Card bg="purple.50" borderLeft="4px" borderColor="purple.400">
                        <CardBody>
                          <VStack align="start" spacing={4}>
                            <Text fontSize="md" fontWeight="semibold" color="purple.700">Critical Skill Gaps</Text>
                            {hrAnalytics?.talent.skillGaps.map((gap, index) => (
                              <HStack key={index} justify="space-between" w="full">
                                <VStack align="start" spacing={0}>
                                  <Text fontSize="sm" fontWeight="semibold">{gap.skill}</Text>
                                  <Text fontSize="xs" color="gray.600">{gap.employeesAffected} employees affected</Text>
                                </VStack>
                                <VStack align="end" spacing={0}>
                                  <Progress 
                                    value={gap.criticalityScore * 10} 
                                    colorScheme="red" 
                                    size="sm" 
                                    w="60px"
                                  />
                                  <Text fontSize="xs" color="red.600">Gap: {gap.gap}</Text>
                                </VStack>
                              </HStack>
                            )) || []}
                          </VStack>
                        </CardBody>
                      </Card>
                      
                      <Card bg="green.50" borderLeft="4px" borderColor="green.400">
                        <CardBody>
                          <VStack align="start" spacing={4}>
                            <Text fontSize="md" fontWeight="semibold" color="green.700">Development Participation</Text>
                            <SimpleGrid columns={1} spacing={3} w="full">
                              <HStack justify="space-between">
                                <Text fontSize="sm">Participation Rate</Text>
                                <HStack>
                                  <Progress value={85} colorScheme="green" size="sm" w="80px" />
                                  <Text fontSize="sm" fontWeight="bold">85%</Text>
                                </HStack>
                              </HStack>
                              <HStack justify="space-between">
                                <Text fontSize="sm">Completion Rate</Text>
                                <HStack>
                                  <Progress value={82} colorScheme="blue" size="sm" w="80px" />
                                  <Text fontSize="sm" fontWeight="bold">82%</Text>
                                </HStack>
                              </HStack>
                              <HStack justify="space-between">
                                <Text fontSize="sm">Satisfaction Score</Text>
                                <HStack>
                                  <Progress value={84} colorScheme="purple" size="sm" w="80px" />
                                  <Text fontSize="sm" fontWeight="bold">4.2/5</Text>
                                </HStack>
                              </HStack>
                            </SimpleGrid>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                    
                    <Divider my={6} />
                    
                    <VStack spacing={4} align="stretch">
                      <Text fontSize="md" fontWeight="semibold">Individual Development Plans</Text>
                      
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Employee</Th>
                            <Th>Development Focus</Th>
                            <Th>Progress</Th>
                            <Th>Next Milestone</Th>
                            <Th>Budget Allocated</Th>
                            <Th>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {filteredEmployees.slice(0, 5).map((employee) => (
                            <Tr key={employee.id}>
                              <Td>
                                <HStack>
                                  <Avatar name={`${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`} size="sm" />
                                  <Text fontSize="sm">{employee.personalInfo.firstName} {employee.personalInfo.lastName}</Text>
                                </HStack>
                              </Td>
                              <Td>
                                <VStack align="start" spacing={0}>
                                  <Text fontSize="sm" fontWeight="semibold">Leadership Development</Text>
                                  <Text fontSize="xs" color="gray.600">Technical expertise → Management</Text>
                                </VStack>
                              </Td>
                              <Td>
                                <HStack>
                                  <Progress value={employee.development.developmentPlan.progress} colorScheme="blue" size="sm" w="60px" />
                                  <Text fontSize="sm">{employee.development.developmentPlan.progress}%</Text>
                                </HStack>
                              </Td>
                              <Td>
                                <Text fontSize="sm">Complete MBA course</Text>
                              </Td>
                              <Td>
                                <Text fontSize="sm" fontWeight="semibold">${employee.development.developmentBudget.toLocaleString()}</Text>
                              </Td>
                              <Td>
                                <Menu>
                                  <MenuButton as={IconButton} icon={<SettingsIcon />} size="sm" variant="ghost" />
                                  <MenuList>
                                    <MenuItem icon={<ViewIcon />}>View Plan</MenuItem>
                                    <MenuItem icon={<EditIcon />}>Update Progress</MenuItem>
                                    <MenuItem icon={<CalendarIcon />}>Schedule Review</MenuItem>
                                  </MenuList>
                                </Menu>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </TabPanel>

            {/* Succession Planning Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">🔄 Succession Planning & Leadership Pipeline</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Strategic succession planning to ensure continuity and leadership development for critical positions.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Analytics Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">📊 HR Analytics & Insights</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Advanced analytics for workforce planning, predictive modeling, and strategic decision making.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Strategic HR Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">🎯 Strategic HR & Competitive Advantage</Text>
                </CardHeader>
                <CardBody>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontSize="sm">
                      Strategic HR practices designed to create sustainable competitive advantage through human capital.
                    </Text>
                  </Alert>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Basic Modals - More complex modals would be implemented with full functionality */}
        <Modal isOpen={isEmployeeModalOpen} onClose={onEmployeeModalClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <SimpleGrid columns={2} spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input placeholder="Enter first name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input placeholder="Enter last name" />
                  </FormControl>
                </SimpleGrid>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Enter email address" />
                </FormControl>
                <SimpleGrid columns={2} spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel>Job Title</FormLabel>
                    <Input placeholder="e.g., Software Engineer" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Department</FormLabel>
                    <Select placeholder="Select department">
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input type="date" />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEmployeeModalClose}>
                Cancel
              </Button>
              <Button colorScheme="teal">
                Add Employee
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Additional modals would follow similar patterns with comprehensive functionality */}
      </VStack>
    </Box>
  );
};

export default EnhancedHRModule;