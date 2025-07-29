import React, { useState } from 'react';
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
  Alert,
  AlertIcon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import { CheckIcon, InfoIcon, DownloadIcon } from '@chakra-ui/icons';

interface ValueChainActivity {
  id: string;
  name: string;
  description: string;
  type: 'primary' | 'support';
  icon: string;
  keyMetrics: string[];
  keyResources: string[];
  improvements: string[];
  costDrivers: string[];
}

interface SectorValueChain {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'service' | 'manufacturing' | 'financial' | 'professional';
  activities: ValueChainActivity[];
  sectorSpecificKPIs: string[];
  regulatoryConsiderations: string[];
}

const SectorValueChains: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('overview');
  const [selectedActivity, setSelectedActivity] = useState<ValueChainActivity | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const sectorValueChains: SectorValueChain[] = [
    // Financial Services
    {
      id: 'retail-banking',
      name: 'Retail Banking',
      icon: '🏦',
      description: 'Consumer banking services value chain optimization',
      category: 'financial',
      sectorSpecificKPIs: ['Net Interest Margin', 'Cost-to-Income Ratio', 'Return on Assets', 'Customer Acquisition Cost'],
      regulatoryConsiderations: ['Basel III Compliance', 'PCI DSS', 'KYC/AML Requirements', 'GDPR/Privacy'],
      activities: [
        {
          id: 'customer-acquisition',
          name: 'Customer Acquisition',
          description: 'Attracting and onboarding new customers',
          type: 'primary',
          icon: '👥',
          keyMetrics: ['Customer Acquisition Cost', 'Conversion Rate', 'Time to Account Opening'],
          keyResources: ['Marketing Channels', 'Branch Network', 'Digital Platforms', 'KYC Systems'],
          improvements: ['Digital onboarding optimization', 'Referral programs', 'Targeted marketing'],
          costDrivers: ['Marketing spend', 'Branch operations', 'Compliance processing', 'Technology infrastructure']
        },
        {
          id: 'account-servicing',
          name: 'Account Servicing',
          description: 'Managing customer accounts and transactions',
          type: 'primary',
          icon: '💳',
          keyMetrics: ['Transaction Processing Time', 'Error Rate', 'Customer Satisfaction'],
          keyResources: ['Core Banking System', 'ATM Network', 'Call Center', 'Mobile App'],
          improvements: ['Automated transaction processing', 'Self-service options', 'Predictive maintenance'],
          costDrivers: ['System maintenance', 'Staff costs', 'ATM operations', 'Fraud prevention']
        },
        {
          id: 'lending-operations',
          name: 'Lending Operations',
          description: 'Credit assessment, approval, and monitoring',
          type: 'primary',
          icon: '📊',
          keyMetrics: ['Loan Approval Time', 'Default Rate', 'Net Interest Margin'],
          keyResources: ['Credit Scoring Models', 'Risk Assessment Tools', 'Loan Officers', 'Legal Framework'],
          improvements: ['AI-powered credit scoring', 'Automated underwriting', 'Risk monitoring'],
          costDrivers: ['Risk assessment', 'Credit monitoring', 'Collections', 'Regulatory compliance']
        },
        {
          id: 'risk-management',
          name: 'Risk Management',
          description: 'Identifying, assessing, and mitigating financial risks',
          type: 'support',
          icon: '🛡️',
          keyMetrics: ['Risk-Adjusted Return', 'VaR (Value at Risk)', 'Capital Adequacy Ratio'],
          keyResources: ['Risk Models', 'Compliance Team', 'Audit Systems', 'Regulatory Reporting'],
          improvements: ['Real-time risk monitoring', 'Stress testing', 'Regulatory technology'],
          costDrivers: ['Compliance staff', 'Risk systems', 'Audit processes', 'Regulatory reporting']
        },
        {
          id: 'technology-infrastructure',
          name: 'Technology Infrastructure',
          description: 'IT systems supporting banking operations',
          type: 'support',
          icon: '💻',
          keyMetrics: ['System Uptime', 'Transaction Throughput', 'Security Incidents'],
          keyResources: ['Core Banking Platform', 'Security Systems', 'Data Centers', 'IT Staff'],
          improvements: ['Cloud migration', 'API modernization', 'Cybersecurity enhancement'],
          costDrivers: ['System licenses', 'Infrastructure maintenance', 'Security measures', 'Development costs']
        }
      ]
    },

    {
      id: 'credit-union',
      name: 'Credit Union',
      icon: '🏛️',
      description: 'Member-owned cooperative financial services',
      category: 'financial',
      sectorSpecificKPIs: ['Member Growth Rate', 'Loan-to-Share Ratio', 'Operating Expense Ratio', 'Member Satisfaction'],
      regulatoryConsiderations: ['NCUA Regulations', 'Field of Membership', 'Capital Requirements', 'Member Rights'],
      activities: [
        {
          id: 'member-services',
          name: 'Member Services',
          description: 'Serving member-owners with personalized financial services',
          type: 'primary',
          icon: '🤝',
          keyMetrics: ['Member Satisfaction Score', 'Service Resolution Time', 'Cross-selling Rate'],
          keyResources: ['Member Service Representatives', 'CRM System', 'Member Database', 'Branch Locations'],
          improvements: ['Member relationship management', 'Personalized service offerings', 'Digital member portal'],
          costDrivers: ['Staff salaries', 'Training costs', 'System maintenance', 'Branch operations']
        },
        {
          id: 'member-lending',
          name: 'Member Lending',
          description: 'Providing loans and credit to members at competitive rates',
          type: 'primary',
          icon: '💰',
          keyMetrics: ['Loan Origination Volume', 'Average Interest Rate Spread', 'Delinquency Rate'],
          keyResources: ['Loan Officers', 'Credit Analysis Tools', 'Loan Processing System', 'Risk Models'],
          improvements: ['Streamlined loan processing', 'Member-focused underwriting', 'Digital loan applications'],
          costDrivers: ['Loan processing', 'Credit analysis', 'Collections', 'Loan loss provisions']
        },
        {
          id: 'member-governance',
          name: 'Member Governance',
          description: 'Democratic governance and member engagement',
          type: 'support',
          icon: '🗳️',
          keyMetrics: ['Member Meeting Attendance', 'Board Participation', 'Member Feedback Score'],
          keyResources: ['Board of Directors', 'Member Communications', 'Voting Systems', 'Annual Reports'],
          improvements: ['Digital voting platforms', 'Member engagement programs', 'Transparent reporting'],
          costDrivers: ['Board compensation', 'Member communications', 'Annual meetings', 'Governance compliance']
        }
      ]
    },

    // Telecommunications
    {
      id: 'telecommunications',
      name: 'Telecommunications',
      icon: '📡',
      description: 'Network infrastructure and communication services',
      category: 'service',
      sectorSpecificKPIs: ['ARPU (Average Revenue Per User)', 'Churn Rate', 'Network Uptime', 'Customer Satisfaction'],
      regulatoryConsiderations: ['Spectrum Licensing', 'Net Neutrality', 'Privacy Regulations', 'Emergency Services'],
      activities: [
        {
          id: 'network-infrastructure',
          name: 'Network Infrastructure',
          description: 'Building and maintaining telecommunications network',
          type: 'primary',
          icon: '📶',
          keyMetrics: ['Network Coverage', 'Data Throughput', 'Network Reliability', 'Latency'],
          keyResources: ['Cell Towers', 'Fiber Optic Cables', 'Network Equipment', 'Spectrum Licenses'],
          improvements: ['5G deployment', 'Network optimization', 'Edge computing integration'],
          costDrivers: ['Infrastructure investment', 'Maintenance costs', 'Spectrum fees', 'Technology upgrades']
        },
        {
          id: 'customer-acquisition',
          name: 'Customer Acquisition',
          description: 'Acquiring new subscribers and service customers',
          type: 'primary',
          icon: '📱',
          keyMetrics: ['New Subscriber Growth', 'Customer Acquisition Cost', 'Market Share'],
          keyResources: ['Sales Channels', 'Marketing Campaigns', 'Retail Stores', 'Online Platforms'],
          improvements: ['Digital marketing optimization', 'Partner channel expansion', 'Customer referral programs'],
          costDrivers: ['Marketing spend', 'Sales commissions', 'Retail operations', 'Promotional offers']
        },
        {
          id: 'service-delivery',
          name: 'Service Delivery',
          description: 'Providing voice, data, and digital services',
          type: 'primary',
          icon: '🌐',
          keyMetrics: ['Service Quality', 'Call Drop Rate', 'Data Speed', 'Service Availability'],
          keyResources: ['Service Platforms', 'Customer Support', 'Billing Systems', 'Content Partnerships'],
          improvements: ['Network quality enhancement', 'Service bundling', 'Self-service portals'],
          costDrivers: ['Network operations', 'Customer support', 'Content licensing', 'Billing systems']
        },
        {
          id: 'technology-development',
          name: 'Technology Development',
          description: 'Developing and implementing new technologies',
          type: 'support',
          icon: '🔬',
          keyMetrics: ['R&D Investment', 'Innovation Pipeline', 'Time to Market'],
          keyResources: ['R&D Team', 'Testing Facilities', 'Technology Partnerships', 'Patents'],
          improvements: ['5G technology deployment', 'IoT service development', 'AI integration'],
          costDrivers: ['R&D investment', 'Technology licensing', 'Testing infrastructure', 'Patent costs']
        }
      ]
    },

    // FMCG (Fast Moving Consumer Goods)
    {
      id: 'fmcg',
      name: 'FMCG (Consumer Goods)',
      icon: '🛒',
      description: 'Fast-moving consumer goods manufacturing and distribution',
      category: 'manufacturing',
      sectorSpecificKPIs: ['Market Share', 'Inventory Turnover', 'Gross Margin', 'Brand Awareness'],
      regulatoryConsiderations: ['Food Safety Standards', 'Labeling Requirements', 'Environmental Regulations', 'Trade Standards'],
      activities: [
        {
          id: 'product-development',
          name: 'Product Development',
          description: 'Creating and improving consumer products',
          type: 'primary',
          icon: '🧪',
          keyMetrics: ['Time to Market', 'Product Success Rate', 'R&D ROI'],
          keyResources: ['R&D Labs', 'Product Managers', 'Consumer Research', 'Testing Facilities'],
          improvements: ['Consumer insight integration', 'Agile development', 'Sustainable packaging'],
          costDrivers: ['R&D costs', 'Testing expenses', 'Regulatory compliance', 'Patent protection']
        },
        {
          id: 'manufacturing',
          name: 'Manufacturing',
          description: 'Large-scale production of consumer goods',
          type: 'primary',
          icon: '🏭',
          keyMetrics: ['Production Efficiency', 'Quality Rate', 'Unit Cost', 'Capacity Utilization'],
          keyResources: ['Production Lines', 'Raw Materials', 'Quality Control', 'Manufacturing Staff'],
          improvements: ['Automation implementation', 'Lean manufacturing', 'Quality management systems'],
          costDrivers: ['Raw materials', 'Labor costs', 'Energy consumption', 'Equipment maintenance']
        },
        {
          id: 'supply-chain',
          name: 'Supply Chain & Distribution',
          description: 'Managing product flow from factory to retailer',
          type: 'primary',
          icon: '🚚',
          keyMetrics: ['Order Fulfillment Rate', 'Inventory Turnover', 'Distribution Cost', 'On-time Delivery'],
          keyResources: ['Distribution Centers', 'Transportation Fleet', 'Inventory Management', 'Logistics Partners'],
          improvements: ['Supply chain digitization', 'Demand forecasting', 'Last-mile optimization'],
          costDrivers: ['Transportation costs', 'Warehousing', 'Inventory carrying', 'Packaging materials']
        },
        {
          id: 'marketing-sales',
          name: 'Marketing & Sales',
          description: 'Building brand awareness and driving sales',
          type: 'primary',
          icon: '📺',
          keyMetrics: ['Brand Awareness', 'Market Share', 'Sales Growth', 'Marketing ROI'],
          keyResources: ['Marketing Team', 'Advertising Channels', 'Sales Force', 'Brand Assets'],
          improvements: ['Digital marketing integration', 'Influencer partnerships', 'Data-driven targeting'],
          costDrivers: ['Advertising spend', 'Promotional activities', 'Sales team costs', 'Market research']
        }
      ]
    },

    // Restaurant Services
    {
      id: 'restaurant-services',
      name: 'Restaurant Services',
      icon: '🍽️',
      description: 'Food service operations and customer experience',
      category: 'service',
      sectorSpecificKPIs: ['Table Turnover Rate', 'Food Cost Percentage', 'Labor Cost Ratio', 'Customer Satisfaction'],
      regulatoryConsiderations: ['Food Safety Regulations', 'Health Department Standards', 'Labor Laws', 'Alcohol Licensing'],
      activities: [
        {
          id: 'menu-development',
          name: 'Menu Development',
          description: 'Creating and optimizing menu offerings',
          type: 'primary',
          icon: '📋',
          keyMetrics: ['Menu Profitability', 'Item Popularity', 'Food Cost %', 'Customer Feedback'],
          keyResources: ['Chef Expertise', 'Supplier Relationships', 'Recipe Development', 'Cost Analysis'],
          improvements: ['Seasonal menu optimization', 'Dietary preference accommodation', 'Profit margin analysis'],
          costDrivers: ['Ingredient costs', 'Recipe development', 'Menu printing', 'Staff training']
        },
        {
          id: 'food-preparation',
          name: 'Food Preparation',
          description: 'Kitchen operations and food production',
          type: 'primary',
          icon: '👨‍🍳',
          keyMetrics: ['Order Accuracy', 'Preparation Time', 'Food Quality Score', 'Waste Percentage'],
          keyResources: ['Kitchen Staff', 'Cooking Equipment', 'Food Inventory', 'Quality Standards'],
          improvements: ['Kitchen workflow optimization', 'Inventory management systems', 'Quality control processes'],
          costDrivers: ['Labor costs', 'Food ingredients', 'Equipment maintenance', 'Utility costs']
        },
        {
          id: 'customer-service',
          name: 'Customer Service',
          description: 'Front-of-house operations and customer experience',
          type: 'primary',
          icon: '🤵',
          keyMetrics: ['Service Speed', 'Customer Satisfaction', 'Table Turnover', 'Upselling Success'],
          keyResources: ['Service Staff', 'POS Systems', 'Dining Area', 'Customer Feedback'],
          improvements: ['Staff training programs', 'Technology integration', 'Customer loyalty programs'],
          costDrivers: ['Staff wages', 'Training costs', 'POS systems', 'Customer amenities']
        }
      ]
    },

    // Professional Services - Attorney Practice
    {
      id: 'attorney-practice',
      name: 'Attorney Practice',
      icon: '⚖️',
      description: 'Legal services and client representation',
      category: 'professional',
      sectorSpecificKPIs: ['Billable Hours Utilization', 'Realization Rate', 'Client Retention', 'Case Success Rate'],
      regulatoryConsiderations: ['Bar Association Rules', 'Client Confidentiality', 'Conflict of Interest', 'Trust Account Management'],
      activities: [
        {
          id: 'client-acquisition',
          name: 'Client Acquisition',
          description: 'Marketing and business development',
          type: 'primary',
          icon: '🤝',
          keyMetrics: ['New Client Acquisition', 'Referral Rate', 'Marketing ROI', 'Client Conversion Rate'],
          keyResources: ['Business Development', 'Marketing Materials', 'Referral Network', 'Online Presence'],
          improvements: ['Digital marketing strategy', 'Client referral programs', 'Professional networking'],
          costDrivers: ['Marketing expenses', 'Business development time', 'Professional memberships', 'Website maintenance']
        },
        {
          id: 'legal-services',
          name: 'Legal Services Delivery',
          description: 'Providing legal counsel and representation',
          type: 'primary',
          icon: '📚',
          keyMetrics: ['Billable Hours', 'Case Resolution Time', 'Client Satisfaction', 'Win Rate'],
          keyResources: ['Attorneys', 'Legal Research', 'Case Management', 'Court Resources'],
          improvements: ['Technology-assisted research', 'Process standardization', 'Continuing education'],
          costDrivers: ['Attorney salaries', 'Legal research tools', 'Case preparation time', 'Court fees']
        },
        {
          id: 'practice-management',
          name: 'Practice Management',
          description: 'Administrative and operational support',
          type: 'support',
          icon: '📊',
          keyMetrics: ['Administrative Efficiency', 'Billing Accuracy', 'Collections Rate', 'Overhead Ratio'],
          keyResources: ['Practice Management Software', 'Administrative Staff', 'Accounting Systems', 'Office Space'],
          improvements: ['Automated billing systems', 'Document management', 'Client communication tools'],
          costDrivers: ['Software licenses', 'Administrative salaries', 'Office rent', 'Professional insurance']
        }
      ]
    },

    // Architect Practice
    {
      id: 'architect-practice',
      name: 'Architect Practice',
      icon: '🏗️',
      description: 'Architectural design and project management',
      category: 'professional',
      sectorSpecificKPIs: ['Project Profit Margin', 'Design Efficiency', 'Client Satisfaction', 'Project Timeline Adherence'],
      regulatoryConsiderations: ['Building Codes', 'Professional Licensing', 'Zoning Requirements', 'Environmental Standards'],
      activities: [
        {
          id: 'design-development',
          name: 'Design Development',
          description: 'Creating architectural designs and plans',
          type: 'primary',
          icon: '📐',
          keyMetrics: ['Design Hours per Project', 'Revision Cycles', 'Client Approval Rate', 'Design Innovation Score'],
          keyResources: ['Design Software', 'Architects', 'Design Libraries', 'Client Requirements'],
          improvements: ['BIM implementation', 'Parametric design', 'Collaborative design tools'],
          costDrivers: ['Design software licenses', 'Architect time', 'Model development', 'Client revisions']
        },
        {
          id: 'project-management',
          name: 'Project Management',
          description: 'Managing architectural projects from concept to completion',
          type: 'primary',
          icon: '📅',
          keyMetrics: ['Project Timeline Adherence', 'Budget Variance', 'Stakeholder Satisfaction', 'Quality Metrics'],
          keyResources: ['Project Managers', 'Scheduling Tools', 'Communication Systems', 'Quality Control'],
          improvements: ['Digital project management', 'Stakeholder collaboration platforms', 'Quality assurance systems'],
          costDrivers: ['Project management time', 'Coordination meetings', 'Quality control', 'Change management']
        },
        {
          id: 'regulatory-compliance',
          name: 'Regulatory Compliance',
          description: 'Ensuring designs meet all regulatory requirements',
          type: 'support',
          icon: '📋',
          keyMetrics: ['Approval Success Rate', 'Compliance Review Time', 'Regulatory Changes Adaptation'],
          keyResources: ['Regulatory Knowledge', 'Compliance Specialists', 'Code Libraries', 'Review Processes'],
          improvements: ['Automated code checking', 'Regulatory database integration', 'Compliance tracking systems'],
          costDrivers: ['Compliance review time', 'Regulatory research', 'Code analysis', 'Permit applications']
        }
      ]
    },

    // Accounting Practice
    {
      id: 'accounting-practice',
      name: 'Accounting Practice',
      icon: '🧮',
      description: 'Financial accounting and advisory services',
      category: 'professional',
      sectorSpecificKPIs: ['Revenue per Client', 'Staff Utilization Rate', 'Error Rate', 'Client Retention'],
      regulatoryConsiderations: ['GAAP Compliance', 'Tax Regulations', 'Professional Standards', 'Client Confidentiality'],
      activities: [
        {
          id: 'bookkeeping-services',
          name: 'Bookkeeping Services',
          description: 'Recording and maintaining financial transactions',
          type: 'primary',
          icon: '📖',
          keyMetrics: ['Processing Accuracy', 'Turnaround Time', 'Client Volume', 'Efficiency Ratio'],
          keyResources: ['Accounting Software', 'Bookkeeping Staff', 'Client Data', 'Process Standards'],
          improvements: ['Automated data entry', 'Cloud accounting integration', 'Process standardization'],
          costDrivers: ['Staff salaries', 'Software licenses', 'Data processing time', 'Quality review']
        },
        {
          id: 'tax-services',
          name: 'Tax Services',
          description: 'Tax preparation and planning services',
          type: 'primary',
          icon: '📄',
          keyMetrics: ['Tax Return Accuracy', 'Tax Savings Generated', 'Seasonal Efficiency', 'Client Satisfaction'],
          keyResources: ['Tax Software', 'Tax Professionals', 'Tax Knowledge Base', 'Client Documentation'],
          improvements: ['Tax automation tools', 'Continuing education', 'Client communication systems'],
          costDrivers: ['Professional development', 'Tax software', 'Research time', 'Review processes']
        },
        {
          id: 'advisory-services',
          name: 'Advisory Services',
          description: 'Financial consulting and business advisory',
          type: 'primary',
          icon: '💡',
          keyMetrics: ['Advisory Revenue Growth', 'Client Business Improvement', 'Engagement Success Rate'],
          keyResources: ['Senior Advisors', 'Industry Expertise', 'Analytical Tools', 'Best Practices'],
          improvements: ['Industry specialization', 'Data analytics capabilities', 'Client relationship management'],
          costDrivers: ['Senior professional time', 'Specialized training', 'Research tools', 'Client engagement']
        }
      ]
    },

    // Service Trades - Plumbing
    {
      id: 'plumbing-services',
      name: 'Plumbing Services',
      icon: '🔧',
      description: 'Plumbing installation, repair, and maintenance services',
      category: 'service',
      sectorSpecificKPIs: ['Service Call Response Time', 'First-Call Resolution Rate', 'Customer Satisfaction', 'Revenue per Technician'],
      regulatoryConsiderations: ['Plumbing Codes', 'Licensing Requirements', 'Safety Regulations', 'Environmental Standards'],
      activities: [
        {
          id: 'service-dispatch',
          name: 'Service Dispatch',
          description: 'Scheduling and dispatching plumbing services',
          type: 'primary',
          icon: '📞',
          keyMetrics: ['Response Time', 'Schedule Efficiency', 'Customer Communication', 'Technician Utilization'],
          keyResources: ['Dispatch System', 'Customer Database', 'Scheduling Software', 'Communication Tools'],
          improvements: ['GPS-enabled dispatching', 'Automated scheduling', 'Customer self-service booking'],
          costDrivers: ['Dispatch software', 'Communication systems', 'Scheduling coordination', 'Customer service']
        },
        {
          id: 'service-delivery',
          name: 'Service Delivery',
          description: 'On-site plumbing services and repairs',
          type: 'primary',
          icon: '🔨',
          keyMetrics: ['Job Completion Rate', 'Service Quality', 'Safety Incidents', 'Material Efficiency'],
          keyResources: ['Plumbing Technicians', 'Tools & Equipment', 'Service Vehicles', 'Parts Inventory'],
          improvements: ['Mobile diagnostic tools', 'Predictive maintenance', 'Technician training programs'],
          costDrivers: ['Technician wages', 'Vehicle maintenance', 'Tool investment', 'Parts inventory']
        },
        {
          id: 'customer-relationship',
          name: 'Customer Relationship Management',
          description: 'Building long-term customer relationships',
          type: 'support',
          icon: '🤝',
          keyMetrics: ['Customer Retention Rate', 'Repeat Business %', 'Referral Rate', 'Customer Lifetime Value'],
          keyResources: ['CRM System', 'Customer Service Team', 'Follow-up Processes', 'Loyalty Programs'],
          improvements: ['Preventive maintenance programs', 'Customer feedback systems', 'Service warranties'],
          costDrivers: ['CRM software', 'Customer service staff', 'Follow-up processes', 'Warranty costs']
        }
      ]
    },

    // Electrical Services
    {
      id: 'electrical-services',
      name: 'Electrical Services',
      icon: '⚡',
      description: 'Electrical installation, maintenance, and repair services',
      category: 'service',
      sectorSpecificKPIs: ['Safety Record', 'Project Completion Time', 'Code Compliance Rate', 'Profit per Job'],
      regulatoryConsiderations: ['Electrical Codes', 'Safety Standards', 'Licensing Requirements', 'Inspection Requirements'],
      activities: [
        {
          id: 'electrical-installation',
          name: 'Electrical Installation',
          description: 'Installing electrical systems and components',
          type: 'primary',
          icon: '🔌',
          keyMetrics: ['Installation Quality', 'Safety Compliance', 'Project Timeline', 'Material Efficiency'],
          keyResources: ['Licensed Electricians', 'Electrical Materials', 'Testing Equipment', 'Safety Gear'],
          improvements: ['Smart home integration', 'Energy-efficient solutions', 'Safety protocol enhancement'],
          costDrivers: ['Labor costs', 'Material costs', 'Equipment investment', 'Safety compliance']
        },
        {
          id: 'maintenance-repair',
          name: 'Maintenance & Repair',
          description: 'Ongoing electrical maintenance and emergency repairs',
          type: 'primary',
          icon: '🔧',
          keyMetrics: ['Response Time', 'Repair Success Rate', 'Customer Satisfaction', 'Safety Incidents'],
          keyResources: ['Service Technicians', 'Diagnostic Tools', 'Replacement Parts', 'Emergency Response'],
          improvements: ['Predictive maintenance technology', 'Remote diagnostics', 'Emergency response optimization'],
          costDrivers: ['Technician wages', 'Diagnostic equipment', 'Parts inventory', 'Emergency response']
        }
      ]
    },

    // HR Consulting
    {
      id: 'hr-consulting',
      name: 'HR Consulting',
      icon: '👥',
      description: 'Human resources consulting and industrial relations',
      category: 'professional',
      sectorSpecificKPIs: ['Client Satisfaction', 'Project Success Rate', 'Revenue per Consultant', 'Repeat Business Rate'],
      regulatoryConsiderations: ['Labor Laws', 'Employment Standards', 'Privacy Regulations', 'Professional Standards'],
      activities: [
        {
          id: 'hr-strategy',
          name: 'HR Strategy Development',
          description: 'Developing human resources strategies and policies',
          type: 'primary',
          icon: '📋',
          keyMetrics: ['Strategy Implementation Success', 'Policy Compliance Rate', 'Client Satisfaction'],
          keyResources: ['HR Consultants', 'Best Practices Database', 'Legal Resources', 'Industry Knowledge'],
          improvements: ['Data-driven HR analytics', 'Change management integration', 'Digital HR transformation'],
          costDrivers: ['Consultant time', 'Research costs', 'Travel expenses', 'Tool development']
        },
        {
          id: 'industrial-relations',
          name: 'Industrial Relations',
          description: 'Managing labor relations and workplace negotiations',
          type: 'primary',
          icon: '🤝',
          keyMetrics: ['Negotiation Success Rate', 'Workplace Harmony Index', 'Dispute Resolution Time'],
          keyResources: ['Labor Relations Specialists', 'Negotiation Tools', 'Legal Framework', 'Mediation Services'],
          improvements: ['Proactive conflict resolution', 'Stakeholder engagement platforms', 'Communication enhancement'],
          costDrivers: ['Specialist expertise', 'Negotiation time', 'Legal support', 'Mediation services']
        },
        {
          id: 'organizational-development',
          name: 'Organizational Development',
          description: 'Improving organizational effectiveness and culture',
          type: 'support',
          icon: '🌱',
          keyMetrics: ['Culture Improvement Score', 'Employee Engagement', 'Productivity Gains'],
          keyResources: ['OD Specialists', 'Assessment Tools', 'Training Programs', 'Change Methodologies'],
          improvements: ['Digital culture assessment', 'Agile transformation support', 'Leadership development'],
          costDrivers: ['Specialist time', 'Assessment tools', 'Training delivery', 'Change management']
        }
      ]
    },

    // Pest Control
    {
      id: 'pest-control',
      name: 'Pest Control Services',
      icon: '🐛',
      description: 'Pest management and extermination services',
      category: 'service',
      sectorSpecificKPIs: ['Treatment Effectiveness Rate', 'Customer Retention', 'Safety Compliance', 'Revenue Growth'],
      regulatoryConsiderations: ['Pesticide Regulations', 'Environmental Protection', 'Health & Safety', 'Licensing Requirements'],
      activities: [
        {
          id: 'pest-inspection',
          name: 'Pest Inspection',
          description: 'Identifying and assessing pest problems',
          type: 'primary',
          icon: '🔍',
          keyMetrics: ['Inspection Accuracy', 'Detection Rate', 'Assessment Quality', 'Customer Education'],
          keyResources: ['Inspection Tools', 'Trained Inspectors', 'Identification Guides', 'Documentation Systems'],
          improvements: ['Digital inspection tools', 'Customer education programs', 'Predictive pest modeling'],
          costDrivers: ['Inspector wages', 'Equipment costs', 'Training expenses', 'Documentation systems']
        },
        {
          id: 'treatment-services',
          name: 'Treatment Services',
          description: 'Applying pest control treatments and solutions',
          type: 'primary',
          icon: '💉',
          keyMetrics: ['Treatment Effectiveness', 'Safety Compliance', 'Customer Satisfaction', 'Re-treatment Rate'],
          keyResources: ['Licensed Technicians', 'Treatment Equipment', 'Pest Control Products', 'Safety Equipment'],
          improvements: ['Integrated Pest Management', 'Eco-friendly solutions', 'Precision application technology'],
          costDrivers: ['Chemical costs', 'Equipment maintenance', 'Technician training', 'Safety compliance']
        },
        {
          id: 'prevention-monitoring',
          name: 'Prevention & Monitoring',
          description: 'Ongoing monitoring and preventive measures',
          type: 'support',
          icon: '📊',
          keyMetrics: ['Prevention Success Rate', 'Monitoring Frequency', 'Early Detection Rate'],
          keyResources: ['Monitoring Systems', 'Data Analysis', 'Preventive Products', 'Customer Communication'],
          improvements: ['IoT monitoring systems', 'Data analytics for prediction', 'Customer self-monitoring tools'],
          costDrivers: ['Monitoring equipment', 'Data analysis', 'Preventive materials', 'Customer communication']
        }
      ]
    }
  ];

  const getSectorsByCategory = () => {
    const categories = {
      financial: sectorValueChains.filter(s => s.category === 'financial'),
      professional: sectorValueChains.filter(s => s.category === 'professional'),
      service: sectorValueChains.filter(s => s.category === 'service'),
      manufacturing: sectorValueChains.filter(s => s.category === 'manufacturing')
    };
    return categories;
  };

  const handleActivityClick = (activity: ValueChainActivity) => {
    setSelectedActivity(activity);
    onOpen();
  };

  const exportValueChain = (sector: SectorValueChain) => {
    const exportData = {
      sector: sector.name,
      activities: sector.activities,
      kpis: sector.sectorSpecificKPIs,
      regulations: sector.regulatoryConsiderations,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sector.id}-value-chain.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderSectorOverview = () => {
    const categories = getSectorsByCategory();
    
    return (
      <VStack spacing={6} align="stretch">
        <Alert status="info">
          <AlertIcon />
          <Text fontSize="sm">
            Select from 12 industry-specific value chain models. Each model is tailored with sector-specific activities, KPIs, and regulatory considerations.
          </Text>
        </Alert>

        {Object.entries(categories).map(([categoryName, sectors]) => (
          <Box key={categoryName}>
            <Text fontSize="xl" fontWeight="bold" mb={4} textTransform="capitalize">
              {categoryName} Services ({sectors.length})
            </Text>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {sectors.map((sector) => (
                <Card 
                  key={sector.id}
                  bg={cardBg}
                  cursor="pointer"
                  onClick={() => setSelectedSector(sector.id)}
                  _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                  borderWidth="2px"
                  borderColor={borderColor}
                >
                  <CardHeader pb={2}>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="full">
                        <HStack>
                          <Text fontSize="2xl">{sector.icon}</Text>
                          <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
                            {sector.name}
                          </Text>
                        </HStack>
                        <Badge colorScheme="purple" variant="subtle" fontSize="xs" textTransform="capitalize">
                          {sector.category}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" color="gray.600" noOfLines={3}>
                        {sector.description}
                      </Text>
                    </VStack>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <Text fontSize="xs" color="gray.500">Activities</Text>
                        <Text fontSize="xs" fontWeight="bold">{sector.activities.length}</Text>
                      </HStack>
                      <Progress value={80} colorScheme="teal" size="sm" />
                      <HStack justify="space-between">
                        <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                          {sector.sectorSpecificKPIs.length} KPIs
                        </Badge>
                        <Text fontSize="xs" color="gray.500">Industry Optimized</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
            <Divider mt={6} />
          </Box>
        ))}
      </VStack>
    );
  };

  const renderSectorDetails = () => {
    const sector = sectorValueChains.find(s => s.id === selectedSector);
    if (!sector) return null;

    const primaryActivities = sector.activities.filter(a => a.type === 'primary');
    const supportActivities = sector.activities.filter(a => a.type === 'support');

    return (
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <HStack>
              <Text fontSize="3xl">{sector.icon}</Text>
              <Text fontSize="3xl" fontWeight="bold">{sector.name}</Text>
            </HStack>
            <Text color="gray.600">{sector.description}</Text>
            <HStack spacing={4}>
              <Badge colorScheme="teal" variant="solid" textTransform="capitalize">
                {sector.category}
              </Badge>
              <Badge colorScheme="purple" variant="subtle">
                {sector.activities.length} Activities
              </Badge>
            </HStack>
          </VStack>
          <Button 
            leftIcon={<DownloadIcon />} 
            colorScheme="teal" 
            size="sm"
            onClick={() => exportValueChain(sector)}
          >
            Export Model
          </Button>
        </HStack>

        <Tabs variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab>🏭 Value Chain Activities</Tab>
            <Tab>📊 Sector KPIs</Tab>
            <Tab>📋 Regulatory Compliance</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0} pt={6}>
              <VStack spacing={6} align="stretch">
                {/* Primary Activities */}
                <Box>
                  <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.600">
                    🎯 Primary Activities ({primaryActivities.length})
                  </Text>
                  <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
                    {primaryActivities.map((activity) => (
                      <Card 
                        key={activity.id}
                        bg={cardBg}
                        borderColor="teal.200"
                        borderWidth="2px"
                        cursor="pointer"
                        onClick={() => handleActivityClick(activity)}
                        _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                      >
                        <CardHeader pb={2}>
                          <HStack justify="space-between">
                            <HStack>
                              <Text fontSize="xl">{activity.icon}</Text>
                              <Text fontSize="md" fontWeight="bold" noOfLines={2}>
                                {activity.name}
                              </Text>
                            </HStack>
                            <Badge colorScheme="teal" variant="solid" size="sm">
                              Primary
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600" noOfLines={2}>
                            {activity.description}
                          </Text>
                        </CardHeader>
                        <CardBody pt={0}>
                          <VStack spacing={2} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="xs" color="gray.500">Key Metrics</Text>
                              <Text fontSize="xs" fontWeight="bold">{activity.keyMetrics.length}</Text>
                            </HStack>
                            <List spacing={1}>
                              {activity.keyMetrics.slice(0, 2).map((metric, index) => (
                                <ListItem key={index}>
                                  <ListIcon as={CheckIcon} color="teal.500" />
                                  <Text fontSize="xs" display="inline">{metric}</Text>
                                </ListItem>
                              ))}
                              {activity.keyMetrics.length > 2 && (
                                <Text fontSize="xs" color="gray.500">
                                  ... and {activity.keyMetrics.length - 2} more
                                </Text>
                              )}
                            </List>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </Box>

                {/* Support Activities */}
                <Box>
                  <Text fontSize="xl" fontWeight="bold" mb={4} color="purple.600">
                    🛠️ Support Activities ({supportActivities.length})
                  </Text>
                  <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
                    {supportActivities.map((activity) => (
                      <Card 
                        key={activity.id}
                        bg={cardBg}
                        borderColor="purple.200"
                        borderWidth="2px"
                        cursor="pointer"
                        onClick={() => handleActivityClick(activity)}
                        _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                      >
                        <CardHeader pb={2}>
                          <HStack justify="space-between">
                            <HStack>
                              <Text fontSize="xl">{activity.icon}</Text>
                              <Text fontSize="md" fontWeight="bold" noOfLines={2}>
                                {activity.name}
                              </Text>
                            </HStack>
                            <Badge colorScheme="purple" variant="solid" size="sm">
                              Support
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600" noOfLines={2}>
                            {activity.description}
                          </Text>
                        </CardHeader>
                        <CardBody pt={0}>
                          <VStack spacing={2} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="xs" color="gray.500">Key Metrics</Text>
                              <Text fontSize="xs" fontWeight="bold">{activity.keyMetrics.length}</Text>
                            </HStack>
                            <List spacing={1}>
                              {activity.keyMetrics.slice(0, 2).map((metric, index) => (
                                <ListItem key={index}>
                                  <ListIcon as={CheckIcon} color="purple.500" />
                                  <Text fontSize="xs" display="inline">{metric}</Text>
                                </ListItem>
                              ))}
                              {activity.keyMetrics.length > 2 && (
                                <Text fontSize="xs" color="gray.500">
                                  ... and {activity.keyMetrics.length - 2} more
                                </Text>
                              )}
                            </List>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">📊 Sector-Specific KPIs</Text>
                </CardHeader>
                <CardBody>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    {sector.sectorSpecificKPIs.map((kpi, index) => (
                      <HStack key={index} p={3} borderRadius="md" bg="blue.50">
                        <Text fontSize="lg">📈</Text>
                        <Text fontSize="sm" fontWeight="semibold">{kpi}</Text>
                      </HStack>
                    ))}
                  </Grid>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel p={0} pt={6}>
              <Card bg={cardBg}>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">📋 Regulatory Considerations</Text>
                </CardHeader>
                <CardBody>
                  <VStack spacing={3} align="stretch">
                    {sector.regulatoryConsiderations.map((regulation, index) => (
                      <HStack key={index} p={3} borderRadius="md" bg="orange.50">
                        <Text fontSize="lg">⚖️</Text>
                        <Text fontSize="sm" fontWeight="semibold">{regulation}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    );
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold">
              🏭 Sector Value Chain Models
            </Text>
            <Text color="gray.600">
              Industry-specific value chain templates with tailored activities, KPIs, and compliance requirements
            </Text>
          </VStack>
          {selectedSector !== 'overview' && (
            <Button 
              variant="ghost" 
              onClick={() => setSelectedSector('overview')}
              leftIcon={<Text>←</Text>}
            >
              Back to Overview
            </Button>
          )}
        </HStack>

        {/* Content */}
        {selectedSector === 'overview' ? renderSectorOverview() : renderSectorDetails()}

        {/* Activity Detail Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Text fontSize="lg">{selectedActivity?.icon}</Text>
                <Text>{selectedActivity?.name}</Text>
                <Badge 
                  colorScheme={selectedActivity?.type === 'primary' ? 'teal' : 'purple'} 
                  variant="solid"
                >
                  {selectedActivity?.type}
                </Badge>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedActivity && (
                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" color="gray.600">
                    {selectedActivity.description}
                  </Text>
                  
                  <Accordion allowMultiple>
                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Text fontWeight="semibold">📊 Key Metrics ({selectedActivity.keyMetrics.length})</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <List spacing={2}>
                          {selectedActivity.keyMetrics.map((metric, index) => (
                            <ListItem key={index}>
                              <ListIcon as={CheckIcon} color="teal.500" />
                              {metric}
                            </ListItem>
                          ))}
                        </List>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Text fontWeight="semibold">🎯 Key Resources ({selectedActivity.keyResources.length})</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <List spacing={2}>
                          {selectedActivity.keyResources.map((resource, index) => (
                            <ListItem key={index}>
                              <ListIcon as={InfoIcon} color="blue.500" />
                              {resource}
                            </ListItem>
                          ))}
                        </List>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Text fontWeight="semibold">🚀 Improvement Opportunities ({selectedActivity.improvements.length})</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <List spacing={2}>
                          {selectedActivity.improvements.map((improvement, index) => (
                            <ListItem key={index}>
                              <ListIcon as={CheckIcon} color="green.500" />
                              {improvement}
                            </ListItem>
                          ))}
                        </List>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Text fontWeight="semibold">💰 Cost Drivers ({selectedActivity.costDrivers.length})</Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <List spacing={2}>
                          {selectedActivity.costDrivers.map((driver, index) => (
                            <ListItem key={index}>
                              <ListIcon as={InfoIcon} color="orange.500" />
                              {driver}
                            </ListItem>
                          ))}
                        </List>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default SectorValueChains;