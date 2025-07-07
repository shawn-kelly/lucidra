import React from 'react';

// Brand colors from documentation
const COLORS = {
  lucidTeal: '#1FE0C4',
  eclipseSlate: '#1C1F26',
  signalWhite: '#F8FAFD',
  insightIndigo: '#6C75F8',
  pulseCoral: '#FF6B6B',
  chartGreen: '#10B981',
  warningAmber: '#F59E0B',
  gradientBlue: '#667eea',
  gradientPurple: '#764ba2'
};

function App() {
  const [currentView, setCurrentView] = React.useState('home'); // home, platform, pricing
  const [activeModule, setActiveModule] = React.useState('strategic-planning');
  const [activeModuleView, setActiveModuleView] = React.useState('objectives');
  const [showPrintView, setShowPrintView] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [selectedMarket, setSelectedMarket] = React.useState('domestic');
  const [pestleData, setPestleData] = React.useState({
    political: 75,
    economic: 68,
    social: 82,
    technological: 91,
    legal: 73,
    environmental: 65
  });
  const [strategicPhase, setStrategicPhase] = React.useState('pestle');
  const [completedPhases, setCompletedPhases] = React.useState([]);
  const [swotData, setSwotData] = React.useState({
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  });
  const [vrinData, setVrinData] = React.useState({
    valuable: [],
    rare: [],
    inimitable: [],
    nonSubstitutable: []
  });
  const [isTrialActive, setIsTrialActive] = React.useState(false);
  const [showTrialModal, setShowTrialModal] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    industry: ''
  });
  const [teamInputs, setTeamInputs] = React.useState({
    pestle: {},
    swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
    vrin: {}
  });
  const [activeInputMode, setActiveInputMode] = React.useState(false);

  const moduleConfig = {
    'strategic-planning': {
      name: 'Strategic Planning',
      icon: '🎯',
      description: 'Comprehensive strategic planning process with proven frameworks',
      color: COLORS.insightIndigo,
      views: ['process-overview', 'pestle-analysis', 'swot-analysis', 'vrin-analysis', 'strategy-development', 'value-chain', 'implementation']
    },
    'organizational-management': {
      name: 'Organizational Management',
      icon: '🏢',
      description: 'Team alignment, performance tracking, and capability development',
      color: COLORS.pulseCoral,
      views: ['structure', 'performance', 'capabilities', 'development', 'governance']
    },
    'market-intelligence': {
      name: 'Market Intelligence',
      icon: '📊',
      description: 'Real-time market data, PESTLE analysis, and competitive insights',
      color: COLORS.chartGreen,
      views: ['pestle', 'markets', 'competitors', 'trends', 'forecasts']
    },
    'economic-planning': {
      name: 'Economic Planning',
      icon: '💰',
      description: 'Economic modeling, financial planning, and policy impact analysis',
      color: COLORS.warningAmber,
      views: ['economic-model', 'financial-planning', 'policy-impact', 'scenarios', 'budget-allocation']
    },
    'government-planning': {
      name: 'Government Planning',
      icon: '🏛️',
      description: 'Population analysis, trade planning, and policy development',
      color: COLORS.eclipseSlate,
      views: ['population', 'trade', 'policy', 'infrastructure', 'public-services']
    },
    'data-monitoring': {
      name: 'Data Monitoring',
      icon: '📡',
      description: 'Real-time monitoring of markets, social media, and geopolitical events',
      color: COLORS.lucidTeal,
      views: ['markets', 'social', 'geopolitical', 'economic', 'alerts']
    },
    'reports-analytics': {
      name: 'Reports & Analytics',
      icon: '📊',
      description: 'Comprehensive reporting, analysis, and export capabilities',
      color: COLORS.pulseCoral,
      views: ['dashboard', 'reports', 'analytics', 'exports', 'print']
    },
    'competitive-intelligence': {
      name: 'Competitive Intelligence',
      icon: '🎯',
      description: 'Blue Ocean Strategy, competitive benchmarking, and market differentiation',
      color: COLORS.warningAmber,
      views: ['blue-ocean', 'benchmarking', 'differentiation', 'strategy-canvas', 'market-analysis']
    }
  };

  const strategicObjectives = [
    { id: 1, title: 'Market Expansion Strategy', progress: 65, priority: 'High', owner: 'Strategy Team', dueDate: 'Q2 2024' },
    { id: 2, title: 'Digital Transformation Initiative', progress: 42, priority: 'Critical', owner: 'IT Division', dueDate: 'Q4 2024' },
    { id: 3, title: 'Operational Efficiency Program', progress: 78, priority: 'Medium', owner: 'Operations', dueDate: 'Q1 2024' },
    { id: 4, title: 'Sustainability Framework', progress: 23, priority: 'High', owner: 'ESG Committee', dueDate: 'Q3 2024' }
  ];

  const marketData = {
    domestic: { growth: 3.2, volatility: 12.5, sentiment: 68 },
    emerging: { growth: 7.8, volatility: 24.1, sentiment: 45 },
    developed: { growth: 1.9, volatility: 8.3, sentiment: 72 }
  };

  // Competitive Intelligence Data
  const competitorData = {
    'act-on': {
      name: 'Act-On Marketing Automation',
      category: 'Marketing Automation',
      strengths: ['AI-powered automation', 'Lead scoring', 'Multichannel marketing', 'User-friendly interface'],
      weaknesses: ['Limited strategic planning', 'No organizational alignment', 'Marketing-focused only'],
      marketPosition: 'Marketing Automation Leader',
      targetMarket: 'B2B/B2C Mid-to-Large Enterprises',
      pricing: 'Contact-based pricing',
      keyFeatures: ['Marketing automation', 'Lead generation', 'Analytics', 'CRM integration']
    },
    'onstrategy': {
      name: 'OnStrategy',
      category: 'Strategic Planning',
      strengths: ['OKR management', 'Strategy execution', 'Service-software hybrid', 'AI strategic planning'],
      weaknesses: ['Limited marketing integration', 'No financial intelligence', 'Basic reporting'],
      marketPosition: 'Strategic Planning Specialist',
      targetMarket: 'Organizations seeking strategic alignment',
      pricing: 'Custom pricing',
      keyFeatures: ['Strategy development', 'OKR management', 'Execution tracking', 'Dashboard reporting']
    },
    'salesforce': {
      name: 'Salesforce Einstein',
      category: 'CRM + Analytics',
      strengths: ['Market dominance', 'Extensive ecosystem', 'AI capabilities', 'Scalability'],
      weaknesses: ['Complex setup', 'Expensive', 'No strategic frameworks', 'Siloed approach'],
      marketPosition: 'CRM Market Leader',
      targetMarket: 'Enterprise organizations',
      pricing: 'Per-user monthly subscription',
      keyFeatures: ['CRM', 'Sales automation', 'Analytics', 'AI insights']
    },
    'microsoft-viva': {
      name: 'Microsoft Viva Goals',
      category: 'Employee Experience + OKRs',
      strengths: ['Microsoft ecosystem', 'Employee engagement', 'OKR tracking', 'Integration'],
      weaknesses: ['No market intelligence', 'Limited strategic frameworks', 'Basic financial analysis'],
      marketPosition: 'Employee Experience Leader',
      targetMarket: 'Microsoft 365 organizations',
      pricing: 'Microsoft 365 add-on',
      keyFeatures: ['OKR management', 'Employee insights', 'Teams integration', 'Goal tracking']
    }
  };

  // Blue Ocean Strategy Framework
  const blueOceanFramework = {
    eliminate: [
      'Tool silos and disconnected systems',
      'Manual data reconciliation',
      'Separate strategic planning cycles',
      'Isolated department planning',
      'Generic business frameworks'
    ],
    reduce: [
      'Time spent on data integration',
      'Complex implementation processes',
      'Training requirements',
      'Reporting cycle times',
      'Cost of multiple software licenses'
    ],
    raise: [
      'Strategic alignment across all functions',
      'Real-time intelligence and insights',
      'Financial transparency and analysis',
      'Visual strategy communication',
      'Cross-functional collaboration'
    ],
    create: [
      'Unified Strategic Intelligence Operating System',
      'AI-powered organizational alignment',
      'Real-time financial impact visualization',
      'Integrated HR-Marketing-Strategy platform',
      'Blue Ocean strategic discovery tools',
      'Dynamic organizational charts with KPI mapping',
      'Predictive strategic scenario modeling'
    ]
  };

  // Lucidra Unique Value Propositions
  const lucidraAdvantages = {
    'Unified Intelligence': {
      description: 'Only platform that unifies Strategy, HR, Marketing, and Finance in real-time',
      competitors: 'Act-On (Marketing only), OnStrategy (Strategy only), Salesforce (CRM only)',
      differentiator: 'End-to-end organizational intelligence'
    },
    'Financial Integration': {
      description: 'Advanced DuPont analysis, ABC costing, and value chain optimization built-in',
      competitors: 'Most competitors require separate financial tools',
      differentiator: 'Financial intelligence embedded in every strategic decision'
    },
    'AI-Powered Alignment': {
      description: 'Claude AI automatically aligns every role, KPI, and process with strategic objectives',
      competitors: 'Basic AI features focused on marketing or basic analytics',
      differentiator: 'Strategic AI that understands organizational context'
    },
    'Blue Ocean Tools': {
      description: 'Built-in Strategy Canvas, Buyer Utility Maps, and market differentiation analysis',
      competitors: 'No competitor offers integrated Blue Ocean strategy tools',
      differentiator: 'Innovation-focused strategic discovery platform'
    },
    'Real-time Visualization': {
      description: 'Dynamic strategy maps that update in real-time across all business functions',
      competitors: 'Static reports and dashboards',
      differentiator: 'Living, breathing strategy visualization'
    }
  };

  // Strategic Planning Process Framework
  const strategicPlanningProcess = {
    phases: [
      {
        id: 'pestle',
        name: 'PESTLE Analysis',
        description: 'Environmental Scanning & External Analysis',
        duration: '2-3 weeks',
        participants: ['Strategy Team', 'Market Research', 'Government Relations', 'Technology Team'],
        inputs: ['Market data', 'Regulatory updates', 'Economic indicators', 'Social trends', 'Technology roadmaps'],
        outputs: ['Environmental opportunities', 'External threats', 'Market insights', 'Regulatory compliance requirements'],
        deliverables: ['PESTLE Analysis Report', 'Environmental Scanning Dashboard', 'External Factor Impact Matrix']
      },
      {
        id: 'swot',
        name: 'SWOT Analysis',
        description: 'Internal Capabilities vs External Environment',
        duration: '1-2 weeks',
        participants: ['Senior Leadership', 'Department Heads', 'Finance Team', 'Operations'],
        inputs: ['PESTLE results', 'Financial performance data', 'Operational metrics', 'DuPont analysis'],
        outputs: ['Strategic options', 'Capability gaps', 'Competitive positioning', 'Resource allocation priorities'],
        deliverables: ['SWOT Matrix', 'Strategic Options Report', 'Capability Assessment']
      },
      {
        id: 'vrin',
        name: 'VRIN Analysis',
        description: 'Resource-Based Competitive Advantage Assessment',
        duration: '1 week',
        participants: ['Strategy Team', 'HR Leadership', 'R&D', 'Operations'],
        inputs: ['SWOT strengths', 'Resource inventory', 'Capability mapping', 'Competitive intelligence'],
        outputs: ['Sustainable competitive advantages', 'Resource development priorities', 'Capability building roadmap'],
        deliverables: ['VRIN Matrix', 'Competitive Advantage Report', 'Resource Development Plan']
      },
      {
        id: 'objectives',
        name: 'Strategic Objective Development',
        description: 'Goal Setting & Priority Alignment',
        duration: '1 week',
        participants: ['Executive Team', 'Board Members', 'Strategy Team'],
        inputs: ['SWOT options', 'VRIN advantages', 'Stakeholder requirements', 'Performance baselines'],
        outputs: ['Strategic objectives', 'Key performance indicators', 'Success metrics', 'Timeline milestones'],
        deliverables: ['Strategic Objectives Framework', 'KPI Dashboard', 'Performance Measurement Plan']
      },
      {
        id: 'strategy-development',
        name: 'Strategy Development',
        description: 'Cost, Differentiation & Blue Ocean Strategy',
        duration: '2-3 weeks',
        participants: ['Strategy Team', 'Marketing', 'Finance', 'Operations', 'Innovation Team'],
        inputs: ['Strategic objectives', 'VRIN advantages', 'Market analysis', 'Financial constraints'],
        outputs: ['Strategic alternatives', 'Business model options', 'Investment requirements', 'Risk assessments'],
        deliverables: ['Strategy Portfolio', 'Business Model Canvas', 'Investment Plan', 'Risk Register']
      },
      {
        id: 'value-chain',
        name: 'Value Chain Analysis',
        description: 'Process Optimization & Competitive Positioning',
        duration: '2 weeks',
        participants: ['Operations Team', 'Supply Chain', 'Technology', 'Quality Assurance'],
        inputs: ['Current processes', 'Cost structures', 'Performance metrics', 'Benchmarking data'],
        outputs: ['Process improvements', 'Cost optimization opportunities', 'Value creation activities'],
        deliverables: ['Value Chain Map', 'Process Improvement Plan', 'Cost Optimization Report']
      },
      {
        id: 'implementation',
        name: 'Implementation Planning',
        description: 'Execution Roadmap & Resource Allocation',
        duration: '1-2 weeks',
        participants: ['All Department Heads', 'Project Management Office', 'HR', 'Finance'],
        inputs: ['Selected strategies', 'Resource requirements', 'Organizational capabilities', 'Change readiness'],
        outputs: ['Implementation roadmap', 'Resource allocation plan', 'Change management strategy'],
        deliverables: ['Implementation Plan', 'Resource Allocation Matrix', 'Change Management Strategy']
      }
    ]
  };

  // PESTLE Analysis Framework
  const pestleFramework = {
    political: {
      name: 'Political Factors',
      color: COLORS.pulseCoral,
      factors: [
        'Government stability and policy changes',
        'Regulatory environment and compliance requirements',
        'Tax policies and trade regulations',
        'Political tensions and international relations',
        'Government spending and public sector involvement'
      ],
      inputs: ['Government reports', 'Policy announcements', 'Regulatory updates', 'Political risk assessments'],
      analysis: ['Impact severity (1-5)', 'Likelihood (1-5)', 'Time horizon', 'Response strategy'],
      outputs: ['Political risk register', 'Compliance requirements', 'Government relations strategy']
    },
    economic: {
      name: 'Economic Factors',
      color: COLORS.warningAmber,
      factors: [
        'Economic growth rates and GDP trends',
        'Interest rates and monetary policy',
        'Inflation rates and currency fluctuations',
        'Employment levels and consumer spending',
        'Market conditions and investor sentiment'
      ],
      inputs: ['Economic indicators', 'Central bank reports', 'Market research', 'Financial forecasts'],
      analysis: ['Economic impact assessment', 'Sensitivity analysis', 'Scenario planning', 'Financial modeling'],
      outputs: ['Economic scenario models', 'Financial risk assessment', 'Market timing strategies']
    },
    social: {
      name: 'Social Factors',
      color: COLORS.insightIndigo,
      factors: [
        'Demographic changes and population trends',
        'Cultural attitudes and lifestyle changes',
        'Education levels and skill availability',
        'Health consciousness and safety concerns',
        'Social values and environmental awareness'
      ],
      inputs: ['Demographic studies', 'Consumer research', 'Social media analytics', 'Cultural trend reports'],
      analysis: ['Demographic impact analysis', 'Consumer behavior trends', 'Social risk assessment'],
      outputs: ['Market segmentation insights', 'Brand positioning strategy', 'Social responsibility framework']
    },
    technological: {
      name: 'Technological Factors',
      color: COLORS.chartGreen,
      factors: [
        'Technology advancement and innovation rates',
        'Digital transformation and automation',
        'Research and development investments',
        'Technology adoption and diffusion rates',
        'Cybersecurity and data privacy concerns'
      ],
      inputs: ['Technology roadmaps', 'R&D reports', 'Patent analysis', 'Innovation benchmarking'],
      analysis: ['Technology impact assessment', 'Innovation opportunity analysis', 'Digital readiness evaluation'],
      outputs: ['Technology strategy', 'Innovation roadmap', 'Digital transformation plan']
    },
    legal: {
      name: 'Legal Factors',
      color: COLORS.eclipseSlate,
      factors: [
        'Industry regulations and compliance requirements',
        'Employment and labor laws',
        'Consumer protection and data privacy laws',
        'Intellectual property regulations',
        'Environmental and safety regulations'
      ],
      inputs: ['Legal updates', 'Compliance audits', 'Industry regulations', 'Legal risk assessments'],
      analysis: ['Legal compliance gap analysis', 'Regulatory impact assessment', 'Legal risk evaluation'],
      outputs: ['Compliance framework', 'Legal risk register', 'Regulatory strategy']
    },
    environmental: {
      name: 'Environmental Factors',
      color: COLORS.lucidTeal,
      factors: [
        'Climate change and environmental policies',
        'Sustainability and carbon footprint concerns',
        'Resource availability and supply chain impacts',
        'Environmental regulations and standards',
        'Consumer environmental awareness'
      ],
      inputs: ['Environmental reports', 'Sustainability metrics', 'Climate data', 'ESG assessments'],
      analysis: ['Environmental impact assessment', 'Sustainability gap analysis', 'ESG risk evaluation'],
      outputs: ['Sustainability strategy', 'Environmental compliance plan', 'ESG framework']
    }
  };

  // SWOT Analysis with DuPont Integration
  const swotFramework = {
    strengths: {
      name: 'Strengths',
      color: COLORS.chartGreen,
      categories: [
        {
          name: 'Financial Strengths (DuPont Analysis)',
          metrics: ['ROE decomposition', 'Profit margin analysis', 'Asset turnover efficiency', 'Financial leverage optimization'],
          criteria: ['Revenue growth > 15%', 'Profit margin > industry average', 'Asset efficiency > competitors', 'Optimal capital structure']
        },
        {
          name: 'Operational Strengths',
          metrics: ['Process efficiency', 'Quality metrics', 'Innovation capabilities', 'Operational flexibility'],
          criteria: ['Cost leadership position', 'Superior quality ratings', 'Innovation pipeline strength', 'Operational agility']
        },
        {
          name: 'Market Strengths',
          metrics: ['Market share', 'Brand recognition', 'Customer loyalty', 'Distribution network'],
          criteria: ['Market leadership position', 'Strong brand equity', 'High customer retention', 'Extensive market reach']
        },
        {
          name: 'Organizational Strengths',
          metrics: ['Human capital', 'Culture and values', 'Leadership capability', 'Knowledge management'],
          criteria: ['Skilled workforce', 'Strong culture', 'Effective leadership', 'Knowledge assets']
        }
      ]
    },
    weaknesses: {
      name: 'Weaknesses',
      color: COLORS.pulseCoral,
      categories: [
        {
          name: 'Financial Weaknesses (DuPont Analysis)',
          metrics: ['Poor ROE performance', 'Low profit margins', 'Inefficient asset utilization', 'High financial leverage'],
          criteria: ['Revenue decline', 'Below-average margins', 'Low asset turnover', 'Excessive debt levels']
        },
        {
          name: 'Operational Weaknesses',
          metrics: ['Process inefficiencies', 'Quality issues', 'Limited innovation', 'Operational rigidity'],
          criteria: ['High operational costs', 'Quality problems', 'Weak R&D', 'Slow adaptation']
        },
        {
          name: 'Market Weaknesses',
          metrics: ['Limited market share', 'Weak brand', 'Poor customer relations', 'Distribution gaps'],
          criteria: ['Declining market position', 'Brand perception issues', 'Customer dissatisfaction', 'Limited market access']
        },
        {
          name: 'Organizational Weaknesses',
          metrics: ['Skill gaps', 'Cultural issues', 'Leadership deficits', 'Knowledge deficiencies'],
          criteria: ['Talent shortages', 'Poor culture', 'Weak leadership', 'Limited expertise']
        }
      ]
    },
    opportunities: {
      name: 'Opportunities',
      color: COLORS.insightIndigo,
      sources: ['PESTLE analysis results', 'Market research insights', 'Technology trends', 'Competitive intelligence'],
      categories: ['Market expansion', 'Product innovation', 'Strategic partnerships', 'Operational improvements', 'Financial optimization']
    },
    threats: {
      name: 'Threats',
      color: COLORS.warningAmber,
      sources: ['PESTLE analysis results', 'Competitive analysis', 'Risk assessments', 'Environmental scanning'],
      categories: ['Competitive threats', 'Market disruptions', 'Regulatory changes', 'Economic risks', 'Technology disruptions']
    }
  };

  // VRIN Analysis Framework
  const vrinFramework = {
    valuable: {
      name: 'Valuable Resources',
      color: COLORS.chartGreen,
      criteria: ['Enables competitive advantage', 'Supports strategic objectives', 'Creates customer value', 'Generates economic returns'],
      examples: ['Proprietary technology', 'Brand reputation', 'Customer relationships', 'Operational capabilities'],
      assessment: ['Value creation potential', 'Strategic importance', 'Customer impact', 'Financial contribution']
    },
    rare: {
      name: 'Rare Resources',
      color: COLORS.insightIndigo,
      criteria: ['Few competitors possess', 'Difficult to acquire', 'Unique characteristics', 'Limited availability'],
      examples: ['Exclusive partnerships', 'Specialized expertise', 'Prime locations', 'Unique intellectual property'],
      assessment: ['Competitive scarcity', 'Acquisition difficulty', 'Uniqueness factor', 'Market availability']
    },
    inimitable: {
      name: 'Inimitable Resources',
      color: COLORS.pulseCoral,
      criteria: ['Path dependent', 'Causally ambiguous', 'Socially complex', 'High imitation costs'],
      examples: ['Organizational culture', 'Historical relationships', 'Complex processes', 'Tacit knowledge'],
      assessment: ['Imitation barriers', 'Causal ambiguity', 'Social complexity', 'Path dependency']
    },
    nonSubstitutable: {
      name: 'Non-Substitutable Resources',
      color: COLORS.warningAmber,
      criteria: ['No strategic equivalents', 'Unique value proposition', 'Irreplaceable functionality', 'Critical dependencies'],
      examples: ['Core competencies', 'Strategic assets', 'Key relationships', 'Essential capabilities'],
      assessment: ['Substitution risk', 'Alternative solutions', 'Functional uniqueness', 'Strategic criticality']
    }
  };

  // Strategic Development Framework
  const strategyDevelopmentFramework = {
    costAdvantage: {
      name: 'Cost Advantage Strategy',
      color: COLORS.chartGreen,
      focus: 'Achieving lowest cost position in industry',
      approaches: [
        'Economies of scale and scope',
        'Process efficiency and automation',
        'Supply chain optimization',
        'Overhead reduction and simplification'
      ],
      requirements: ['Large market share', 'Efficient operations', 'Cost control systems', 'Process innovation'],
      risks: ['Price wars', 'Technology changes', 'Competitor cost reductions', 'Quality compromises'],
      kpis: ['Cost per unit', 'Operating margin', 'Asset utilization', 'Productivity metrics']
    },
    differentiation: {
      name: 'Differentiation Strategy',
      color: COLORS.insightIndigo,
      focus: 'Creating unique value proposition for customers',
      approaches: [
        'Product innovation and features',
        'Superior customer service',
        'Brand building and marketing',
        'Quality and reliability excellence'
      ],
      requirements: ['Innovation capabilities', 'Marketing expertise', 'Quality systems', 'Customer insights'],
      risks: ['Imitation by competitors', 'Cost inflation', 'Customer preference changes', 'Over-engineering'],
      kpis: ['Price premium', 'Customer satisfaction', 'Brand value', 'Innovation metrics']
    },
    blueOcean: {
      name: 'Blue Ocean Strategy',
      color: COLORS.lucidTeal,
      focus: 'Creating uncontested market space',
      framework: {
        eliminate: 'Factors industry takes for granted',
        reduce: 'Factors below industry standard',
        raise: 'Factors above industry standard',
        create: 'New factors never offered'
      },
      tools: ['Strategy Canvas', 'Four Actions Framework', 'Buyer Utility Map', 'Price Corridor of Mass'],
      requirements: ['Innovation mindset', 'Customer insights', 'Value innovation', 'Strategic courage'],
      benefits: ['Reduced competition', 'Higher margins', 'Rapid growth', 'Market leadership']
    }
  };

  // Value Chain Analysis Framework
  const valueChainFramework = {
    primaryActivities: [
      {
        name: 'Inbound Logistics',
        description: 'Receiving, storing, and disseminating inputs',
        activities: ['Supplier management', 'Inventory control', 'Warehousing', 'Material handling'],
        metrics: ['Inventory turnover', 'Supplier quality', 'Storage costs', 'Material availability'],
        improvements: ['Just-in-time delivery', 'Supplier integration', 'Automated warehousing', 'Quality assurance']
      },
      {
        name: 'Operations',
        description: 'Transforming inputs into final products',
        activities: ['Manufacturing', 'Assembly', 'Quality control', 'Facility operations'],
        metrics: ['Production efficiency', 'Quality rates', 'Capacity utilization', 'Cycle time'],
        improvements: ['Lean manufacturing', 'Automation', 'Quality systems', 'Flexible operations']
      },
      {
        name: 'Outbound Logistics',
        description: 'Distributing finished products to customers',
        activities: ['Order fulfillment', 'Distribution', 'Delivery', 'Customer logistics'],
        metrics: ['Delivery time', 'Order accuracy', 'Distribution costs', 'Customer satisfaction'],
        improvements: ['Supply chain optimization', 'Logistics automation', 'Customer portals', 'Tracking systems']
      },
      {
        name: 'Marketing & Sales',
        description: 'Promoting and selling products to customers',
        activities: ['Market research', 'Advertising', 'Sales management', 'Pricing'],
        metrics: ['Sales growth', 'Market share', 'Customer acquisition', 'Marketing ROI'],
        improvements: ['Digital marketing', 'CRM systems', 'Sales automation', 'Customer analytics']
      },
      {
        name: 'Service',
        description: 'Maintaining and enhancing product value',
        activities: ['Customer support', 'Maintenance', 'Training', 'Warranty'],
        metrics: ['Customer satisfaction', 'Service quality', 'Response time', 'Resolution rate'],
        improvements: ['Self-service options', 'Predictive maintenance', 'Knowledge management', 'Service automation']
      }
    ],
    supportActivities: [
      {
        name: 'Firm Infrastructure',
        description: 'Planning, finance, accounting, legal, government affairs',
        activities: ['Strategic planning', 'Financial management', 'Legal compliance', 'Quality management'],
        improvements: ['Planning systems', 'Financial controls', 'Compliance automation', 'Performance management']
      },
      {
        name: 'Human Resource Management',
        description: 'Recruiting, hiring, training, development, compensation',
        activities: ['Talent acquisition', 'Employee development', 'Performance management', 'Compensation design'],
        improvements: ['Talent management systems', 'Learning platforms', 'Performance analytics', 'Employee engagement']
      },
      {
        name: 'Technology Development',
        description: 'Research and development, technology, process development',
        activities: ['R&D management', 'Technology innovation', 'Process improvement', 'Systems development'],
        improvements: ['Innovation processes', 'Technology platforms', 'Automation systems', 'Digital transformation']
      },
      {
        name: 'Procurement',
        description: 'Purchasing inputs used in value chain',
        activities: ['Supplier selection', 'Contract management', 'Purchase optimization', 'Vendor relations'],
        improvements: ['Strategic sourcing', 'Supplier development', 'E-procurement', 'Cost management']
      }
    ]
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: currentView === 'home' 
      ? `linear-gradient(135deg, ${COLORS.gradientBlue} 0%, ${COLORS.gradientPurple} 100%)`
      : `linear-gradient(135deg, ${COLORS.signalWhite} 0%, #f0f9ff 100%)`,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
  };

  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    width: '100%',
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1rem 2rem',
    boxSizing: 'border-box' as const
  };

  const cardStyle = {
    background: COLORS.signalWhite,
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    marginBottom: '1rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const hoverLiftStyle = {
    ...cardStyle,
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    }
  };

  const glassEffectStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem'
  };

  const buttonPrimaryStyle = {
    background: COLORS.lucidTeal,
    color: COLORS.eclipseSlate,
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.2s ease'
  };

  const buttonSecondaryStyle = {
    background: 'transparent',
    color: COLORS.signalWhite,
    border: `2px solid ${COLORS.signalWhite}`,
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.2s ease'
  };

  // Home Page Component
  const HomePage = () => (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }}></div>
        
        {/* Floating decorative elements */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '40px',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '40px',
          width: '128px',
          height: '128px',
          background: 'rgba(31, 224, 196, 0.2)',
          borderRadius: '50%',
          animation: 'bounce 4s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '80px',
          width: '64px',
          height: '64px',
          background: 'rgba(108, 117, 248, 0.2)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite'
        }}></div>

        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem', 
          textAlign: 'center' as const
        }}>
          <div style={{ animation: 'float 6s ease-in-out infinite' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: 'bold', 
              color: COLORS.signalWhite, 
              marginBottom: '1.5rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Welcome to <span style={{ color: '#FFD700' }}>Lucidra</span>
            </h1>
            <p style={{ 
              fontSize: '1.5rem', 
              color: 'rgba(255,255,255,0.9)', 
              marginBottom: '2rem', 
              maxWidth: '800px', 
              margin: '0 auto 2rem auto',
              lineHeight: '1.6'
            }}>
              The world's most advanced AI-powered Strategic Intelligence & Organizational Alignment Platform that integrates every aspect of your business strategy, human resources, and market intelligence into one cohesive, intelligent system.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                style={{
                  background: '#FFD700',
                  color: COLORS.eclipseSlate,
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                onClick={() => setCurrentView('platform')}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                🚀 Explore Platform
              </button>
              <button 
                style={buttonSecondaryStyle}
                onClick={() => setCurrentView('pricing')}
              >
                📊 View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Preview */}
      <div style={{ 
        padding: '5rem 2rem', 
        background: COLORS.signalWhite,
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '1rem' }}>
              Revolutionizing Strategic Intelligence
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Lucidra integrates advanced AI with proven strategic frameworks to create the most comprehensive platform for organizational excellence.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.lucidTeal}15)`,
              textAlign: 'center' as const,
              padding: '2rem'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: COLORS.insightIndigo,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🧠</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Claude AI Strategic Intelligence</h3>
              <p style={{ color: '#666' }}>Advanced Claude AI automatically aligns every role, KPI, and process with strategic objectives—going beyond basic automation to true organizational intelligence.</p>
            </div>

            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.insightIndigo}15)`,
              textAlign: 'center' as const,
              padding: '2rem'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: COLORS.chartGreen,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔗</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Integrated Ecosystem</h3>
              <p style={{ color: '#666' }}>Seamlessly connects strategy, HR, marketing, and operations into one unified platform with real-time data synchronization.</p>
            </div>

            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.pulseCoral}15, ${COLORS.warningAmber}15)`,
              textAlign: 'center' as const,
              padding: '2rem'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: COLORS.pulseCoral,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📈</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Strategic Alignment</h3>
              <p style={{ color: '#666' }}>Every role, KPI, and process is automatically aligned with your strategic objectives using proven business frameworks.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' as const, marginTop: '3rem' }}>
            <button 
              style={buttonPrimaryStyle}
              onClick={() => setCurrentView('platform')}
            >
              Explore Full Platform →
            </button>
          </div>
        </div>
      </div>

      {/* Blue Ocean Competitive Advantage */}
      <div style={{ 
        padding: '5rem 2rem', 
        background: `linear-gradient(135deg, ${COLORS.eclipseSlate} 0%, ${COLORS.insightIndigo} 100%)`,
        color: COLORS.signalWhite
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: COLORS.signalWhite, marginBottom: '1rem' }}>
              🌊 Blue Ocean Leadership
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>
              While competitors focus on isolated solutions, Lucidra creates uncontested market space with the world's first unified Strategic Intelligence Operating System.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center' as const
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: COLORS.lucidTeal }}>
                Unified Intelligence
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
                <strong>Competitors:</strong> Act-On (Marketing only), OnStrategy (Strategy only), Salesforce (CRM only)
              </p>
              <p style={{ color: COLORS.signalWhite, fontWeight: 'bold', marginTop: '1rem' }}>
                🚀 Our Edge: End-to-end organizational intelligence
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center' as const
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💰</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: COLORS.lucidTeal }}>
                Financial Integration
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
                <strong>Competitors:</strong> Require separate financial tools and manual integration
              </p>
              <p style={{ color: COLORS.signalWhite, fontWeight: 'bold', marginTop: '1rem' }}>
                🚀 Our Edge: Built-in DuPont analysis & ABC costing
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center' as const
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌊</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: COLORS.lucidTeal }}>
                Blue Ocean Tools
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
                <strong>Competitors:</strong> No integrated Blue Ocean strategy frameworks
              </p>
              <p style={{ color: COLORS.signalWhite, fontWeight: 'bold', marginTop: '1rem' }}>
                🚀 Our Edge: Built-in Strategy Canvas & innovation tools
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' as const, marginTop: '3rem' }}>
            <div style={{ 
              background: 'rgba(31, 224, 196, 0.2)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid rgba(31, 224, 196, 0.3)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: COLORS.lucidTeal }}>
                Market Reality Check
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.signalWhite }}>$47.8B</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Addressable Market</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.signalWhite }}>340%</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Projected 5-Year Growth</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.signalWhite }}>Blue Ocean</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Uncontested Market Space</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Platform View - existing strategic planning interface
  const PlatformView = () => (
    <div style={{ paddingTop: '5rem' }}>
      <div style={{ padding: '1rem 2rem' }}>
        {/* Module Navigation */}
        <div style={{ ...cardStyle, marginBottom: '1rem', padding: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {Object.entries(moduleConfig).map(([key, config]) => (
              <button
                key={key}
                style={{
                  background: activeModule === key ? config.color : 'transparent',
                  color: activeModule === key ? COLORS.signalWhite : config.color,
                  border: `2px solid ${config.color}`,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  margin: '0.25rem',
                  transition: 'all 0.2s ease',
                  minWidth: '160px',
                  textAlign: 'center' as const
                }}
                onClick={() => setActiveModule(key)}
              >
                {config.icon} {config.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Module Content */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '2rem', marginRight: '1rem' }}>
                {moduleConfig[activeModule as keyof typeof moduleConfig].icon}
              </span>
              <div>
                <h2 style={{ margin: 0, color: COLORS.eclipseSlate }}>
                  {moduleConfig[activeModule as keyof typeof moduleConfig].name}
                </h2>
                <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                  {moduleConfig[activeModule as keyof typeof moduleConfig].description}
                </p>
              </div>
            </div>
            
            {/* View Navigation */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
              {moduleConfig[activeModule as keyof typeof moduleConfig].views.map(view => (
                <button
                  key={view}
                  style={{
                    background: activeModuleView === view ? COLORS.lucidTeal : 'transparent',
                    color: activeModuleView === view ? COLORS.eclipseSlate : COLORS.lucidTeal,
                    border: `1px solid ${COLORS.lucidTeal}`,
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    margin: '0.25rem',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setActiveModuleView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}
                </button>
              ))}
              
              {/* Quick Export Button */}
              <div style={{ marginLeft: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  style={{
                    background: COLORS.pulseCoral,
                    color: COLORS.signalWhite,
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    const printContent = generateModuleReport(activeModule, moduleConfig[activeModule as keyof typeof moduleConfig].name);
                    printWindow.document.write(printContent);
                    printWindow.document.close();
                    printWindow.print();
                  }}
                >
                  📄 Export PDF
                </button>
                <button
                  style={{
                    background: COLORS.chartGreen,
                    color: COLORS.signalWhite,
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                  onClick={() => {
                    const csvContent = generateModuleCSV(activeModule, moduleConfig[activeModule as keyof typeof moduleConfig].name);
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${moduleConfig[activeModule as keyof typeof moduleConfig].name}-${new Date().toISOString().split('T')[0]}.csv`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                >
                  📊 Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Module Content Based on Active Module */}
        {activeModule === 'reports-analytics' ? (
          <ReportsAndAnalytics 
            strategicObjectives={strategicObjectives}
            marketData={marketData}
            pestleData={pestleData}
            showPrintView={showPrintView}
            setShowPrintView={setShowPrintView}
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
          />
        ) : activeModule === 'competitive-intelligence' ? (
          <CompetitiveIntelligence 
            competitorData={competitorData}
            blueOceanFramework={blueOceanFramework}
            lucidraAdvantages={lucidraAdvantages}
            activeModuleView={activeModuleView}
          />
        ) : activeModule === 'strategic-planning' ? (
          <StrategicPlanningModule 
            activeModuleView={activeModuleView}
            strategicPlanningProcess={strategicPlanningProcess}
            pestleFramework={pestleFramework}
            swotFramework={swotFramework}
            vrinFramework={vrinFramework}
            strategyDevelopmentFramework={strategyDevelopmentFramework}
            valueChainFramework={valueChainFramework}
            strategicPhase={strategicPhase}
            setStrategicPhase={setStrategicPhase}
            completedPhases={completedPhases}
            setCompletedPhases={setCompletedPhases}
            pestleData={pestleData}
            setPestleData={setPestleData}
            swotData={swotData}
            setSwotData={setSwotData}
            vrinData={vrinData}
            setVrinData={setVrinData}
          />
        ) : (
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: COLORS.eclipseSlate }}>
              {activeModule === 'market-intelligence' ? 'Market Intelligence Dashboard' :
               activeModule === 'organizational-management' ? 'Organizational Management Dashboard' :
               activeModule === 'economic-planning' ? 'Economic Planning Dashboard' :
               activeModule === 'government-planning' ? 'Government Planning Dashboard' :
               'Data Monitoring Dashboard'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {strategicObjectives.map(obj => (
                <div key={obj.id} style={{
                  ...cardStyle,
                  padding: '1rem',
                  border: `1px solid ${obj.priority === 'Critical' ? COLORS.pulseCoral : obj.priority === 'High' ? COLORS.warningAmber : COLORS.chartGreen}`
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>{obj.title}</h4>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.75rem' }}>
                    Owner: {obj.owner} | Due: {obj.dueDate}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.8rem' }}>Progress</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{obj.progress}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${obj.progress}%`,
                        height: '100%',
                        background: obj.progress > 75 ? COLORS.chartGreen : obj.progress > 50 ? COLORS.warningAmber : COLORS.pulseCoral,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    background: obj.priority === 'Critical' ? COLORS.pulseCoral : obj.priority === 'High' ? COLORS.warningAmber : COLORS.chartGreen,
                    color: COLORS.signalWhite
                  }}>
                    {obj.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Helper functions for module reports
  const generateModuleReport = (moduleKey: string, moduleName: string) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const objectives = strategicObjectives;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${moduleName} Report</title>
        <style>
          @media print {
            @page { margin: 1in; size: A4; }
            body { font-family: 'Times New Roman', serif; color: #000; }
          }
          body { font-family: 'Inter', sans-serif; margin: 0; padding: 20px; }
          .header { border-bottom: 2px solid #1FE0C4; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #1FE0C4; }
          .report-title { font-size: 20px; margin: 10px 0; }
          .report-date { color: #666; font-size: 14px; }
          .content { margin: 20px 0; }
          .objective { margin: 15px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; }
          .progress-bar { width: 100%; height: 10px; background: #e2e8f0; border-radius: 5px; margin: 10px 0; }
          .progress-fill { height: 100%; background: #10B981; border-radius: 5px; }
          .priority { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
          .priority-high { background: #F59E0B; color: white; }
          .priority-critical { background: #FF6B6B; color: white; }
          .priority-medium { background: #10B981; color: white; }
          .metrics { display: flex; gap: 20px; margin: 20px 0; }
          .metric { text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px; }
          .metric-value { font-size: 24px; font-weight: bold; color: #1FE0C4; }
          .metric-label { font-size: 12px; color: #666; margin-top: 5px; }
          .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">LUCIDRA</div>
          <div class="report-title">${moduleName} Report</div>
          <div class="report-date">Generated: ${timestamp}</div>
        </div>
        
        <div class="content">
          <div class="metrics">
            <div class="metric">
              <div class="metric-value">${objectives.length}</div>
              <div class="metric-label">Total Objectives</div>
            </div>
            <div class="metric">
              <div class="metric-value">${Math.round(objectives.reduce((sum, obj) => sum + obj.progress, 0) / objectives.length)}%</div>
              <div class="metric-label">Average Progress</div>
            </div>
            <div class="metric">
              <div class="metric-value">${objectives.filter(obj => obj.priority === 'High' || obj.priority === 'Critical').length}</div>
              <div class="metric-label">High Priority</div>
            </div>
          </div>
          
          <h3>Strategic Objectives</h3>
          ${objectives.map(obj => `
            <div class="objective">
              <h4>${obj.title}</h4>
              <p><strong>Owner:</strong> ${obj.owner} | <strong>Due:</strong> ${obj.dueDate}</p>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${obj.progress}%"></div>
              </div>
              <p><strong>Progress:</strong> ${obj.progress}%</p>
              <span class="priority priority-${obj.priority.toLowerCase()}">${obj.priority}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="footer">
          <p>This report was generated by Lucidra Strategic Intelligence Platform</p>
          <p>© 2024 Lucidra. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
  };

  const generateModuleCSV = (moduleKey: string, moduleName: string) => {
    const objectives = strategicObjectives;
    const headers = ['Module', 'Title', 'Owner', 'Due Date', 'Progress (%)', 'Priority', 'Generated Date'];
    const rows = objectives.map(obj => [
      moduleName,
      obj.title,
      obj.owner,
      obj.dueDate,
      obj.progress,
      obj.priority,
      new Date().toISOString().split('T')[0]
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  // Competitive Differentiators View
  const DifferentiatorsView = () => (
    <div style={{ paddingTop: '5rem', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '1rem' }}>
            Why Lucidra Outperforms Alternatives
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
            Clear competitive advantages over Act-On, OnStrategyHQ, and traditional consulting
          </p>
        </div>

        {/* Competitive Advantage Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {Object.entries(competitiveDifferentiators).map(([key, diff]) => (
            <div key={key} style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${diff.color}15, ${diff.color}25)`,
              border: `2px solid ${diff.color}`,
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{diff.icon}</div>
              <h3 style={{ color: diff.color, marginBottom: '1rem' }}>{diff.name}</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{diff.description}</p>
              
              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  🎯 Competitive Advantage:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{diff.advantage}</div>
              </div>
              
              <div style={{ background: `${diff.color}10`, padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', color: diff.color, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  📊 Proof of Impact:
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: COLORS.eclipseSlate }}>{diff.proof}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div style={{ ...cardStyle, marginBottom: '3rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: COLORS.eclipseSlate }}>
            📊 Detailed Feature Comparison
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: `${COLORS.insightIndigo}15` }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Feature</th>
                  <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Lucidra</th>
                  <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Act-On</th>
                  <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>OnStrategyHQ</th>
                  <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Traditional Consulting</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AI-Powered Strategic Analysis', '✅ Claude Integration', '❌ None', '❌ None', '❌ Manual Only'],
                  ['Blue Ocean Strategy Framework', '✅ Integrated', '❌ Not Available', '⚠️ Basic', '💰 Extra Cost'],
                  ['Regional Market Intelligence', '✅ 85+ Countries', '⚠️ US/EU Only', '⚠️ Limited', '💰 Extra Research'],
                  ['Real-Time Team Collaboration', '✅ Native Platform', '⚠️ Limited', '⚠️ Basic', '❌ Email/Meetings'],
                  ['PESTLE + SWOT + VRIN Integration', '✅ Seamless', '⚠️ Separate Tools', '✅ Good', '📊 Manual Templates'],
                  ['Cost per User/Month', '💰 $79-189', '💰 $150-300', '💰 $100-250', '💰 $5,000+ Project'],
                  ['Implementation Time', '⚡ 1 Week', '⏱️ 4-6 Weeks', '⏱️ 2-4 Weeks', '📅 3-6 Months'],
                  ['Training Required', '📚 2 Hours', '📚 40+ Hours', '📚 20+ Hours', '📚 Ongoing'],
                ].map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ 
                        padding: '0.75rem', 
                        border: '1px solid #e2e8f0',
                        textAlign: cellIndex === 0 ? 'left' : 'center',
                        fontWeight: cellIndex === 0 ? 'bold' : 'normal',
                        fontSize: '0.9rem'
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Calculator */}
        <div style={{ ...cardStyle, background: `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.lucidTeal}15)` }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: COLORS.eclipseSlate }}>
            💰 ROI Calculator: Lucidra vs Alternatives
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>Lucidra Platform</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>$189/mo</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Per user, all features included</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                ✅ Implementation: 1 week<br/>
                ✅ Training: 2 hours<br/>
                ✅ Ongoing support included
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.warningAmber, marginBottom: '1rem' }}>Traditional Consulting</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.warningAmber, marginBottom: '0.5rem' }}>$15,000+</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Per project, limited scope</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                ⏱️ Implementation: 3-6 months<br/>
                📚 Training: Ongoing<br/>
                💰 Additional costs for updates
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.pulseCoral, marginBottom: '1rem' }}>12-Month Savings</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.pulseCoral, marginBottom: '0.5rem' }}>$12,732</div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Average cost savings vs alternatives</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                📈 ROI: 567%<br/>
                ⚡ Payback period: 2.1 months<br/>
                💎 Ongoing value creation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Case Studies View
  const CaseStudiesView = () => (
    <div style={{ paddingTop: '5rem', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '1rem' }}>
            Real Results from Real Organizations
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#666' }}>
            Case studies demonstrating measurable impact and training effectiveness
          </p>
        </div>

        {/* MBA-Style Case Studies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Case Study 1: Strategic Planning Workflow */}
          <div style={{ ...cardStyle, border: `2px solid ${COLORS.insightIndigo}` }}>
            <div style={{ background: `${COLORS.insightIndigo}15`, padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <h3 style={{ color: COLORS.insightIndigo, margin: '0 0 0.5rem 0' }}>📚 MBA Case Study 1: Regional Expansion Strategy</h3>
              <div style={{ fontSize: '1rem', color: '#666', fontWeight: 'bold' }}>Learning Objective: How to use PESTLE → SWOT → Blue Ocean for market entry decisions</div>
            </div>
            
            {/* Scenario Setup */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: `${COLORS.eclipseSlate}05`, borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>📋 Scenario: TechCorp Caribbean Expansion</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                <strong>Company:</strong> TechCorp Ltd - Software development company (Trinidad)<br/>
                <strong>Challenge:</strong> Considering expansion to Jamaica, Barbados, and Guyana<br/>
                <strong>Team:</strong> CEO, Strategy Director, Market Research Manager, Finance Manager<br/>
                <strong>Timeline:</strong> 3-week strategic planning exercise<br/>
                <strong>Budget:</strong> $500K expansion budget, need ROI justification
              </p>
            </div>

            {/* Week 1: PESTLE Analysis */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.insightIndigo, marginBottom: '1rem' }}>🌍 Week 1: Team PESTLE Analysis Input</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {[
                  {
                    factor: 'Political (85/100)',
                    teamMember: 'Strategy Director',
                    input: 'CARICOM trade agreements favor regional expansion. Stable governments in all 3 targets. New CSME regulations actually reduce barriers.',
                    score: 85,
                    color: COLORS.chartGreen
                  },
                  {
                    factor: 'Economic (72/100)', 
                    teamMember: 'Finance Manager',
                    input: 'Jamaica: GDP growth 1.5%, Barbados: 2.1%, Guyana: 5.8% (oil boom). Currency risks manageable with USD invoicing.',
                    score: 72,
                    color: COLORS.warningAmber
                  },
                  {
                    factor: 'Social (90/100)',
                    teamMember: 'Market Research Manager', 
                    input: 'High English literacy, growing tech adoption. Young demographics in all markets. Cultural similarity aids business relationships.',
                    score: 90,
                    color: COLORS.chartGreen
                  },
                  {
                    factor: 'Technology (78/100)',
                    teamMember: 'CEO',
                    input: 'Improving internet infrastructure, especially Guyana fiber optic projects. Mobile-first approach needed for rural areas.',
                    score: 78,
                    color: COLORS.warningAmber
                  }
                ].map((item, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    background: COLORS.signalWhite,
                    borderRadius: '6px',
                    border: `1px solid ${item.color}30`
                  }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: item.color, marginBottom: '0.5rem' }}>
                      {item.factor}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: COLORS.insightIndigo, marginBottom: '0.5rem' }}>
                      Input by: {item.teamMember}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.4' }}>
                      "{item.input}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Week 2: SWOT Analysis */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.insightIndigo, marginBottom: '1rem' }}>⚡ Week 2: Collaborative SWOT Analysis</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: `${COLORS.chartGreen}10`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>💪 Strengths (Team Input)</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    • <strong>CEO:</strong> "10-year track record in T&T market"<br/>
                    • <strong>Finance:</strong> "Strong cash position: $2M available"<br/>
                    • <strong>Strategy:</strong> "Existing CARICOM business relationships"<br/>
                    • <strong>Marketing:</strong> "Award-winning software solutions"
                  </div>
                </div>
                
                <div style={{ padding: '1rem', background: `${COLORS.pulseCoral}10`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.pulseCoral, marginBottom: '0.5rem' }}>⚠️ Weaknesses (Team Input)</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    • <strong>Strategy:</strong> "No physical presence in target markets"<br/>
                    • <strong>Finance:</strong> "Limited working capital for 3 markets"<br/>
                    • <strong>CEO:</strong> "Small team (15 people) may be stretched"<br/>
                    • <strong>Marketing:</strong> "Unknown brand in target markets"
                  </div>
                </div>
                
                <div style={{ padding: '1rem', background: `${COLORS.insightIndigo}10`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.insightIndigo, marginBottom: '0.5rem' }}>🚀 Opportunities (Team Input)</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    • <strong>Market Research:</strong> "Guyana oil boom = huge demand"<br/>
                    • <strong>Strategy:</strong> "Government digitization initiatives"<br/>
                    • <strong>CEO:</strong> "Competitors focus only on major cities"<br/>
                    • <strong>Finance:</strong> "Tax incentives for regional businesses"
                  </div>
                </div>
                
                <div style={{ padding: '1rem', background: `${COLORS.warningAmber}10`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.warningAmber, marginBottom: '0.5rem' }}>⚡ Threats (Team Input)</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    • <strong>Finance:</strong> "Currency devaluation risks"<br/>
                    • <strong>Strategy:</strong> "Regional competitors may respond"<br/>
                    • <strong>CEO:</strong> "Political changes could affect policies"<br/>
                    • <strong>Market Research:</strong> "Internet infrastructure delays"
                  </div>
                </div>
              </div>
            </div>

            {/* Week 3: Blue Ocean Strategy */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.insightIndigo, marginBottom: '1rem' }}>🌊 Week 3: Blue Ocean Strategy Canvas</h4>
              
              <div style={{ padding: '1.5rem', background: `${COLORS.lucidTeal}10`, borderRadius: '8px' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.lucidTeal, marginBottom: '0.5rem' }}>🎯 Team Brainstorming Session Results:</div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', background: COLORS.signalWhite, borderRadius: '6px' }}>
                    <div style={{ color: COLORS.pulseCoral, fontWeight: 'bold', marginBottom: '0.5rem' }}>🗑️ ELIMINATE</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>• Physical offices<br/>• Local hiring initially<br/>• Traditional marketing</div>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '1rem', background: COLORS.signalWhite, borderRadius: '6px' }}>
                    <div style={{ color: COLORS.warningAmber, fontWeight: 'bold', marginBottom: '0.5rem' }}>⬇️ REDUCE</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>• Upfront costs<br/>• Implementation time<br/>• Technical complexity</div>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '1rem', background: COLORS.signalWhite, borderRadius: '6px' }}>
                    <div style={{ color: COLORS.insightIndigo, fontWeight: 'bold', marginBottom: '0.5rem' }}>⬆️ RAISE</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>• Cloud-based solutions<br/>• Mobile accessibility<br/>• Regional integration</div>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '1rem', background: COLORS.signalWhite, borderRadius: '6px' }}>
                    <div style={{ color: COLORS.chartGreen, fontWeight: 'bold', marginBottom: '0.5rem' }}>✨ CREATE</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>• Multi-country dashboard<br/>• Local currency pricing<br/>• Regional compliance module</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Strategy Decision */}
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>🎯 Final Team Decision & Rationale</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Market Entry Strategy:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    <strong>Phase 1:</strong> Guyana (highest opportunity score)<br/>
                    <strong>Phase 2:</strong> Jamaica (6 months later)<br/>
                    <strong>Phase 3:</strong> Barbados (12 months later)
                  </div>
                  
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Blue Ocean Positioning:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    "First cloud-based, multi-country business software platform designed specifically for Caribbean SMEs with local compliance built-in"
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Expected ROI (Team Projections):</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    • Year 1: $750K revenue (150% ROI)<br/>
                    • Year 2: $1.2M revenue (240% ROI)<br/>
                    • Year 3: $2.1M revenue (420% ROI)
                  </div>
                  
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Key Success Metrics:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    • 50 clients by month 6<br/>
                    • 85% customer retention<br/>
                    • 30% market share in 24 months
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2: VRIN Analysis Workflow */}
          <div style={{ ...cardStyle, border: `2px solid ${COLORS.lucidTeal}` }}>
            <div style={{ background: `${COLORS.lucidTeal}15`, padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <h3 style={{ color: COLORS.lucidTeal, margin: '0 0 0.5rem 0' }}>📚 MBA Case Study 2: Resource-Based Strategy</h3>
              <div style={{ fontSize: '1rem', color: '#666', fontWeight: 'bold' }}>Learning Objective: How to use VRIN framework to identify sustainable competitive advantages</div>
            </div>
            
            {/* Scenario Setup */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: `${COLORS.eclipseSlate}05`, borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>📋 Scenario: Caribbean Manufacturing Excellence</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                <strong>Company:</strong> CariSteel Ltd - Steel fabrication company (Jamaica)<br/>
                <strong>Challenge:</strong> Facing Chinese import competition, need to identify sustainable advantages<br/>
                <strong>Team:</strong> Family owners (3 generations), Operations Manager, HR Director, CFO<br/>
                <strong>Context:</strong> 40-year family business, considering strategic pivot or sale<br/>
                <strong>Constraint:</strong> Limited capital for major investments
              </p>
            </div>

            {/* Resource Inventory Session */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.lucidTeal, marginBottom: '1rem' }}>📋 Step 1: Resource Inventory (Team Brainstorming)</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  {
                    category: 'Physical Resources',
                    teamMember: 'Operations Manager',
                    items: ['Prime industrial location (inherited 1980)', '5-acre waterfront facility', 'Custom-built overhead cranes', 'Deep-water port access'],
                    color: COLORS.warningAmber
                  },
                  {
                    category: 'Human Resources', 
                    teamMember: 'HR Director',
                    items: ['Master craftsmen (average 15 years experience)', 'Multi-generational workforce loyalty', '3-generation family leadership', 'Apprenticeship training programs'],
                    color: COLORS.pulseCoral
                  },
                  {
                    category: 'Organizational Resources',
                    teamMember: 'CFO',
                    items: ['40-year reputation in Caribbean', 'Government contractor status', 'ISO 9001 certification', 'Zero debt, family-owned equity'],
                    color: COLORS.insightIndigo
                  },
                  {
                    category: 'Technological Resources',
                    teamMember: 'Founder (Generation 1)',
                    items: ['Proprietary hurricane-resistant designs', 'Custom welding techniques', 'Legacy client relationships', 'Local material sourcing network'],
                    color: COLORS.chartGreen
                  }
                ].map((resource, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    background: COLORS.signalWhite,
                    borderRadius: '6px',
                    border: `1px solid ${resource.color}30`
                  }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: resource.color, marginBottom: '0.5rem' }}>
                      {resource.category}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: COLORS.lucidTeal, marginBottom: '0.5rem' }}>
                      Led by: {resource.teamMember}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {resource.items.map((item, i) => (
                        <div key={i} style={{ marginBottom: '0.25rem' }}>• {item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VRIN Analysis */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.lucidTeal, marginBottom: '1rem' }}>🔍 Step 2: VRIN Framework Analysis</h4>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '1rem', color: COLORS.eclipseSlate }}>
                  Team Evaluation: Hurricane-Resistant Design Capabilities
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: `${COLORS.chartGreen}15`, borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💎</div>
                    <div style={{ fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>VALUABLE</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>✅ YES</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                      <strong>CFO input:</strong> "Clients pay 15% premium for hurricane certification"
                    </div>
                  </div>
                  
                  <div style={{ padding: '1rem', background: `${COLORS.chartGreen}15`, borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔆</div>
                    <div style={{ fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>RARE</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>✅ YES</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                      <strong>Operations input:</strong> "Only 2 companies in Caribbean have this capability"
                    </div>
                  </div>
                  
                  <div style={{ padding: '1rem', background: `${COLORS.chartGreen}15`, borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
                    <div style={{ fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>INIMITABLE</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>✅ YES</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                      <strong>Founder input:</strong> "40 years of hurricane experience + family knowledge"
                    </div>
                  </div>
                  
                  <div style={{ padding: '1rem', background: `${COLORS.chartGreen}15`, borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏗️</div>
                    <div style={{ fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>NON-SUBSTITUTABLE</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>✅ YES</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                      <strong>HR input:</strong> "Imported steel can't replicate local wind pattern knowledge"
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '1rem', background: `${COLORS.chartGreen}10`, borderRadius: '8px' }}>
                <div style={{ fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>
                  🏆 VRIN Analysis Result: SUSTAINABLE COMPETITIVE ADVANTAGE
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Hurricane-resistant design capability passes all four VRIN tests. This is the core competency to build strategy around.
                </div>
              </div>
            </div>

            {/* Additional Resources Analysis */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.lucidTeal, marginBottom: '1rem' }}>📊 Step 3: Additional Resource Analysis</h4>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ background: `${COLORS.lucidTeal}15` }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Resource</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Valuable</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Rare</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Inimitable</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Non-Sub</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Strategic Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Prime waterfront location', '✅', '✅', '✅', '✅', '🏆 Sustainable Advantage'],
                      ['Master craftsmen workforce', '✅', '✅', '⚠️', '✅', '🔄 Temporary Advantage'],
                      ['40-year reputation', '✅', '⚠️', '⚠️', '✅', '📈 Competitive Parity'],
                      ['ISO 9001 certification', '✅', '❌', '❌', '❌', '📋 Table Stakes'],
                      ['Family ownership structure', '✅', '✅', '✅', '✅', '🏆 Sustainable Advantage'],
                      ['Government contracts', '✅', '⚠️', '❌', '⚠️', '📈 Competitive Parity']
                    ].map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} style={{ 
                            padding: '0.75rem', 
                            border: '1px solid #e2e8f0',
                            textAlign: cellIndex === 0 ? 'left' : 'center',
                            fontWeight: cellIndex === 0 || cellIndex === 5 ? 'bold' : 'normal'
                          }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strategic Recommendations */}
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>🎯 Team Strategic Recommendations</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Focus Strategy:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    <strong>Double down on hurricane-resistant specialization:</strong><br/>
                    • Exit commodity steel fabrication<br/>
                    • Focus on high-value hurricane infrastructure<br/>
                    • Leverage waterfront location for large projects
                  </div>
                  
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Resource Development:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    • Formalize master craftsman knowledge transfer<br/>
                    • Patent proprietary design techniques<br/>
                    • Develop apprenticeship program for succession
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Market Positioning:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    <strong>"Caribbean's Hurricane Infrastructure Specialists"</strong><br/>
                    • Premium pricing strategy (15-25% above market)<br/>
                    • Government and critical infrastructure focus<br/>
                    • Regional expansion to hurricane-prone islands
                  </div>
                  
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Financial Projections:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    • 40% revenue increase in Year 1<br/>
                    • 60% margin improvement<br/>
                    • ROI: 285% over 3 years
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '0.5rem' }}>
                  💡 Key Learning from VRIN Analysis:
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  "The team discovered that trying to compete on cost with imports was the wrong strategy. Their sustainable advantages lie in specialized knowledge and irreplaceable location - resources that took 40 years to build and cannot be quickly replicated."
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 3: DuPont Financial Analysis Integration */}
          <div style={{ ...cardStyle, border: `2px solid ${COLORS.warningAmber}` }}>
            <div style={{ background: `${COLORS.warningAmber}15`, padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <h3 style={{ color: COLORS.warningAmber, margin: '0 0 0.5rem 0' }}>📚 MBA Case Study 3: SWOT with DuPont Financial Integration</h3>
              <div style={{ fontSize: '1rem', color: '#666', fontWeight: 'bold' }}>Learning Objective: How to integrate financial analysis into strategic frameworks for data-driven decisions</div>
            </div>
            
            {/* Scenario Setup */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: `${COLORS.eclipseSlate}05`, borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>📋 Scenario: Caribbean Hospitality Growth Strategy</h4>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                <strong>Company:</strong> Paradise Hotels Group - 3 boutique hotels (Barbados)<br/>
                <strong>Challenge:</strong> Deciding between debt vs equity financing for 2 new hotel acquisitions<br/>
                <strong>Team:</strong> Family CEO, CFO, Operations Director, Marketing Director<br/>
                <strong>Decision:</strong> $8M investment needed - which financing option creates most value?<br/>
                <strong>Timeline:</strong> Board presentation in 2 weeks, need financial justification
              </p>
            </div>

            {/* DuPont Analysis Setup */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.warningAmber, marginBottom: '1rem' }}>💹 Step 1: Current DuPont Analysis (CFO Input)</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px', textAlign: 'center', border: `2px solid ${COLORS.chartGreen}` }}>
                  <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>ROE Decomposition</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>18.2%</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Current Return on Equity</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    <strong>Formula:</strong> Net Margin × Asset Turnover × Equity Multiplier<br/>
                    <strong>Calculation:</strong> 12.5% × 0.85 × 1.71 = 18.2%
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px', textAlign: 'center', border: `2px solid ${COLORS.insightIndigo}` }}>
                  <h4 style={{ color: COLORS.insightIndigo, marginBottom: '1rem' }}>Profit Margin</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.insightIndigo, marginBottom: '0.5rem' }}>12.5%</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Net Income / Revenue</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    <strong>Current:</strong> $2.5M net income on $20M revenue<br/>
                    <strong>Industry Avg:</strong> 8.5% (strong performance)
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px', textAlign: 'center', border: `2px solid ${COLORS.warningAmber}` }}>
                  <h4 style={{ color: COLORS.warningAmber, marginBottom: '1rem' }}>Asset Turnover</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.warningAmber, marginBottom: '0.5rem' }}>0.85x</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Revenue / Total Assets</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    <strong>Current:</strong> $20M revenue on $23.5M assets<br/>
                    <strong>Industry Avg:</strong> 0.65x (efficient operations)
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px', textAlign: 'center', border: `2px solid ${COLORS.pulseCoral}` }}>
                  <h4 style={{ color: COLORS.pulseCoral, marginBottom: '1rem' }}>Equity Multiplier</h4>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.pulseCoral, marginBottom: '0.5rem' }}>1.71x</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Total Assets / Equity</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    <strong>Current:</strong> $23.5M assets on $13.7M equity<br/>
                    <strong>Debt Ratio:</strong> 41.7% (conservative leverage)
                  </div>
                </div>
              </div>
            </div>

            {/* SWOT with Financial Integration */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.warningAmber, marginBottom: '1rem' }}>⚡ Step 2: SWOT Analysis with DuPont Integration</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: `${COLORS.chartGreen}10`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>💪 Financial Strengths (DuPont-Based)</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    • <strong>CFO:</strong> "ROE 18.2% vs industry 12.5%"<br/>
                    • <strong>Operations:</strong> "Asset turnover 30% above industry"<br/>
                    • <strong>CEO:</strong> "Low debt ratio provides expansion capacity"<br/>
                    • <strong>Marketing:</strong> "Premium pricing supports 12.5% margins"
                  </div>
                  
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: `${COLORS.chartGreen}20`, borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: COLORS.chartGreen }}>DuPont Insight:</div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>Superior performance driven by operational efficiency (asset turnover) and pricing power (margins), not leverage</div>
                  </div>
                </div>
                
                <div style={{ padding: '1rem', background: `${COLORS.pulseCoral}10`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.pulseCoral, marginBottom: '0.5rem' }}>⚠️ Financial Weaknesses (DuPont-Based)</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    • <strong>CFO:</strong> "Limited cash for acquisitions ($1.2M)"<br/>
                    • <strong>CEO:</strong> "Conservative leverage limits growth speed"<br/>
                    • <strong>Operations:</strong> "Seasonal cash flow volatility"<br/>
                    • <strong>Marketing:</strong> "High customer acquisition costs"
                  </div>
                  
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: `${COLORS.pulseCoral}20`, borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: COLORS.pulseCoral }}>DuPont Insight:</div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>Low leverage (1.71x vs industry 2.4x) indicates potential for value-creating debt financing</div>
                  </div>
                </div>
                
                <div style={{ padding: '1rem', background: `${COLORS.insightIndigo}10`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.insightIndigo, marginBottom: '0.5rem' }}>🚀 Financial Opportunities</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    • <strong>CFO:</strong> "Debt financing at 6% cost vs 18% ROE"<br/>
                    • <strong>CEO:</strong> "Scale economies could improve margins"<br/>
                    • <strong>Operations:</strong> "Portfolio diversification reduces risk"<br/>
                    • <strong>Marketing:</strong> "Brand leverage across properties"
                  </div>
                  
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: `${COLORS.insightIndigo}20`, borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: COLORS.insightIndigo }}>DuPont Insight:</div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>Positive leverage spread (18% ROE - 6% cost of debt = 12% spread)</div>
                  </div>
                </div>
                
                <div style={{ padding: '1rem', background: `${COLORS.warningAmber}10`, borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: COLORS.warningAmber, marginBottom: '0.5rem' }}>⚡ Financial Threats</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    • <strong>CFO:</strong> "Rising interest rates increase debt costs"<br/>
                    • <strong>CEO:</strong> "Economic downturn could hurt occupancy"<br/>
                    • <strong>Operations:</strong> "Currency fluctuation affects costs"<br/>
                    • <strong>Marketing:</strong> "Competition may pressure margins"
                  </div>
                  
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: `${COLORS.warningAmber}20`, borderRadius: '4px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: COLORS.warningAmber }}>DuPont Insight:</div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>Need to maintain ROE &gt; cost of debt to preserve positive leverage effects</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financing Scenario Analysis */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: COLORS.warningAmber, marginBottom: '1rem' }}>🔢 Step 3: Financing Scenario Modeling</h4>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ background: `${COLORS.warningAmber}15` }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Scenario</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Financing</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>New ROE</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Equity Multiplier</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Risk Level</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Team Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['100% Equity', '$8M equity raise', '15.8%', '1.95x', '🟢 Low Risk', '❌ Dilutes ownership'],
                      ['100% Debt', '$8M bank loan @ 6%', '22.4%', '2.89x', '🟡 Medium Risk', '✅ Recommended'],
                      ['50/50 Mix', '$4M equity + $4M debt', '19.1%', '2.42x', '🟢 Low Risk', '⚠️ Compromise option'],
                      ['Current (No expansion)', 'Status quo', '18.2%', '1.71x', '🟢 Very Low Risk', '❌ Missed opportunity']
                    ].map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} style={{ 
                            padding: '0.75rem', 
                            border: '1px solid #e2e8f0',
                            textAlign: cellIndex === 0 ? 'left' : 'center',
                            fontWeight: cellIndex === 0 ? 'bold' : 'normal',
                            backgroundColor: cell.includes('Recommended') ? `${COLORS.chartGreen}10` : 'transparent'
                          }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Final Team Decision */}
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>🎯 Team Decision: Debt Financing Strategy</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Financial Rationale (CFO):</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    • ROE increases from 18.2% to 22.4%<br/>
                    • Positive leverage spread: 18% - 6% = 12%<br/>
                    • Maintains family ownership control<br/>
                    • Debt service coverage ratio: 3.2x (safe)
                  </div>
                  
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Risk Management (Operations):</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    • Diversified property portfolio reduces risk<br/>
                    • Fixed-rate financing protects against rate increases<br/>
                    • 24-month cash reserves maintained
                  </div>
                </div>
                
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Strategic Benefits (CEO):</div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                    • Accelerated growth timeline (2 years vs 5)<br/>
                    • Market share capture before competitors<br/>
                    • Economies of scale in operations and marketing
                  </div>
                  
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>Expected 3-Year Results:</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    • Revenue: $20M → $35M<br/>
                    • ROE maintained at 22%+<br/>
                    • Market position: #3 → #1 in Barbados
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '6px' }}>
                <div style={{ fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '0.5rem' }}>
                  💡 Key Learning from DuPont-SWOT Integration:
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  "By integrating DuPont analysis with SWOT, the team moved beyond qualitative assessment to quantified strategic choices. The financial framework revealed that their conservative capital structure was actually a competitive weakness - they weren't maximizing shareholder value despite having the operational strengths to support higher leverage."
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Impact Section */}
        <div style={{ ...cardStyle, background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.pulseCoral}15)`, marginBottom: '3rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: COLORS.eclipseSlate }}>
            📚 Training & Capability Development Impact
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
              <h4 style={{ color: COLORS.insightIndigo, marginBottom: '1rem' }}>Strategic Thinking Skills</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>87%</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>improvement in strategic thinking assessment scores post-training</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👥</div>
              <h4 style={{ color: COLORS.pulseCoral, marginBottom: '1rem' }}>Team Collaboration</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>92%</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>of teams report improved strategic alignment after Lucidra training</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
              <h4 style={{ color: COLORS.warningAmber, marginBottom: '1rem' }}>Decision Speed</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>64%</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>faster strategic decision-making with framework training</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1.5rem', background: COLORS.signalWhite, borderRadius: '8px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
              <h4 style={{ color: COLORS.lucidTeal, marginBottom: '1rem' }}>Business Impact</h4>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>$3.2M</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>average additional revenue generated within 12 months</div>
            </div>
          </div>
        </div>

        {/* Implementation Methodology */}
        <div style={{ ...cardStyle }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: COLORS.eclipseSlate }}>
            🔄 Proven Implementation Methodology
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                phase: 'Week 1',
                title: 'Setup & Training',
                activities: ['Platform onboarding', 'Team role assignment', 'Framework training', 'Initial data input'],
                outcome: 'Team ready to collaborate on strategic planning'
              },
              {
                phase: 'Week 2-3',
                title: 'Analysis & Insights',
                activities: ['PESTLE environmental scanning', 'SWOT collaborative analysis', 'VRIN capability assessment', 'Blue Ocean opportunity mapping'],
                outcome: 'Comprehensive strategic analysis completed'
              },
              {
                phase: 'Week 4',
                title: 'Strategy Development',
                activities: ['Strategy formulation', 'Action plan creation', 'Resource allocation', 'Timeline development'],
                outcome: 'Executable strategic plan with clear metrics'
              },
              {
                phase: 'Ongoing',
                title: 'Monitoring & Optimization',
                activities: ['Performance tracking', 'Quarterly reviews', 'Strategy updates', 'Continuous improvement'],
                outcome: 'Sustained competitive advantage and growth'
              }
            ].map((phase, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.5rem',
                background: `linear-gradient(135deg, ${COLORS.lucidTeal}10, ${COLORS.insightIndigo}10)`,
                borderRadius: '8px',
                border: `1px solid ${COLORS.lucidTeal}30`
              }}>
                <div style={{
                  minWidth: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: COLORS.lucidTeal,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: COLORS.signalWhite,
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  {phase.phase}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '0.75rem' }}>{phase.title}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: COLORS.insightIndigo, marginBottom: '0.5rem' }}>
                        Key Activities:
                      </div>
                      <ul style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1rem', margin: 0 }}>
                        {phase.activities.map((activity, i) => (
                          <li key={i} style={{ marginBottom: '0.25rem' }}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>
                        Expected Outcome:
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>{phase.outcome}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Regional Maps View
  const RegionalMapsView = () => (
    <div style={{ paddingTop: '5rem', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '1rem' }}>
            Global Market Intelligence Coverage
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#666' }}>
            Comprehensive regional market data across T&T, Caribbean, Americas, EU, Asia & Australia
          </p>
        </div>

        {/* Regional Coverage Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Trinidad & Tobago */}
          <div style={{ ...cardStyle, border: `2px solid ${COLORS.pulseCoral}` }}>
            <div style={{ background: `${COLORS.pulseCoral}15`, padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ color: COLORS.pulseCoral, margin: '0 0 0.5rem 0' }}>🇹🇹 Trinidad & Tobago</h3>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Home Market • Deep Local Intelligence</div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>Market Coverage:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.pulseCoral}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.pulseCoral }}>2,847</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Companies Tracked</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.pulseCoral}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.pulseCoral }}>23</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Industry Sectors</div>
                </div>
              </div>
              
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>Key Industries:</h4>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                🛢️ Energy & Petrochemicals • 🏦 Financial Services • 🏭 Manufacturing • 🌾 Agriculture • 📱 Technology • 🏨 Tourism
              </div>
            </div>
            
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>🎯 Specialized Capabilities:</h4>
              <ul style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1rem', margin: 0 }}>
                <li>Real-time regulatory tracking</li>
                <li>Government policy impact analysis</li>
                <li>Local competitor intelligence</li>
                <li>Economic indicator forecasting</li>
                <li>Infrastructure development mapping</li>
              </ul>
            </div>
          </div>

          {/* Caribbean Region */}
          <div style={{ ...cardStyle, border: `2px solid ${COLORS.lucidTeal}` }}>
            <div style={{ background: `${COLORS.lucidTeal}15`, padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ color: COLORS.lucidTeal, margin: '0 0 0.5rem 0' }}>🏝️ Caribbean Region</h3>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>15 Countries • Regional Integration Focus</div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>Coverage Map:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.lucidTeal}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.lucidTeal }}>15</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Countries</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.lucidTeal}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.lucidTeal }}>12,000+</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Companies</div>
                </div>
              </div>
              
              <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.6' }}>
                🇧🇧 Barbados • 🇯🇲 Jamaica • 🇬🇩 Grenada • 🇱🇨 St. Lucia • 🇻🇨 St. Vincent • 🇩🇲 Dominica • 🇰🇳 St. Kitts & Nevis • 🇦🇬 Antigua & Barbuda • 🇬🇾 Guyana • 🇸🇷 Suriname • 🇧🇿 Belize • 🇧🇸 Bahamas • 🇦🇼 Aruba • 🇨🇼 Curaçao • 🇧🇲 Bermuda
              </div>
            </div>
            
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>🌊 Regional Intelligence:</h4>
              <ul style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1rem', margin: 0 }}>
                <li>CARICOM trade integration analysis</li>
                <li>Cross-border opportunity mapping</li>
                <li>Regional supply chain optimization</li>
                <li>Tourism & hospitality insights</li>
                <li>Climate resilience planning</li>
              </ul>
            </div>
          </div>

          {/* Americas */}
          <div style={{ ...cardStyle, border: `2px solid ${COLORS.insightIndigo}` }}>
            <div style={{ background: `${COLORS.insightIndigo}15`, padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ color: COLORS.insightIndigo, margin: '0 0 0.5rem 0' }}>🌎 Americas</h3>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>North, Central & South America • 35+ Countries</div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.insightIndigo}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.insightIndigo }}>35+</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Countries</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.insightIndigo}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.insightIndigo }}>250K+</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Companies</div>
                </div>
              </div>
              
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>Key Regions:</h4>
              <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.6' }}>
                🇺🇸 United States • 🇨🇦 Canada • 🇲🇽 Mexico • 🇧🇷 Brazil • 🇦🇷 Argentina • 🇨🇱 Chile • 🇨🇴 Colombia • 🇵🇪 Peru • 🇻🇪 Venezuela • 🇪🇨 Ecuador • 🇺🇾 Uruguay • 🇵🇾 Paraguay • 🇧🇴 Bolivia
              </div>
            </div>
            
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>🎯 Focus Areas:</h4>
              <ul style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1rem', margin: 0 }}>
                <li>NAFTA/USMCA trade opportunities</li>
                <li>Latin American market entry</li>
                <li>Cross-border investment flows</li>
                <li>Regulatory harmonization tracking</li>
                <li>Emerging market intelligence</li>
              </ul>
            </div>
          </div>

          {/* Europe */}
          <div style={{ ...cardStyle, border: `2px solid ${COLORS.warningAmber}` }}>
            <div style={{ background: `${COLORS.warningAmber}15`, padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ color: COLORS.warningAmber, margin: '0 0 0.5rem 0' }}>🇪🇺 Europe</h3>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>EU + UK + Nordic • 30+ Countries</div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.warningAmber}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.warningAmber }}>30+</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Countries</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.warningAmber}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.warningAmber }}>180K+</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Companies</div>
                </div>
              </div>
              
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>Coverage Highlights:</h4>
              <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.6' }}>
                🇬🇧 United Kingdom • 🇩🇪 Germany • 🇫🇷 France • 🇮🇹 Italy • 🇪🇸 Spain • 🇳🇱 Netherlands • 🇸🇪 Sweden • 🇳🇴 Norway • 🇩🇰 Denmark • 🇨🇭 Switzerland • 🇦🇹 Austria • 🇮🇪 Ireland
              </div>
            </div>
            
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>🏛️ EU Intelligence:</h4>
              <ul style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1rem', margin: 0 }}>
                <li>Brexit impact analysis</li>
                <li>EU regulatory compliance tracking</li>
                <li>Green Deal implementation</li>
                <li>Digital transformation trends</li>
                <li>Single market opportunities</li>
              </ul>
            </div>
          </div>

          {/* Asia-Pacific */}
          <div style={{ ...cardStyle, border: `2px solid ${COLORS.chartGreen}` }}>
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h3 style={{ color: COLORS.chartGreen, margin: '0 0 0.5rem 0' }}>🌏 Asia-Pacific</h3>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>ASEAN + East Asia + Oceania • 25+ Countries</div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.chartGreen}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.chartGreen }}>25+</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Countries</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: `${COLORS.chartGreen}10`, borderRadius: '6px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.chartGreen }}>320K+</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Companies</div>
                </div>
              </div>
              
              <h4 style={{ color: COLORS.eclipseSlate, marginBottom: '1rem' }}>Major Markets:</h4>
              <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.6' }}>
                🇯🇵 Japan • 🇰🇷 South Korea • 🇨🇳 China • 🇸🇬 Singapore • 🇹🇭 Thailand • 🇲🇾 Malaysia • 🇮🇩 Indonesia • 🇵🇭 Philippines • 🇻🇳 Vietnam • 🇮🇳 India • 🇦🇺 Australia • 🇳🇿 New Zealand
              </div>
            </div>
            
            <div style={{ background: `${COLORS.chartGreen}15`, padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>🚀 Growth Intelligence:</h4>
              <ul style={{ fontSize: '0.8rem', color: '#666', paddingLeft: '1rem', margin: 0 }}>
                <li>ASEAN integration opportunities</li>
                <li>Technology innovation hubs</li>
                <li>Supply chain diversification</li>
                <li>Emerging middle class markets</li>
                <li>Digital economy trends</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global Intelligence Dashboard */}
        <div style={{ ...cardStyle, background: `linear-gradient(135deg, ${COLORS.eclipseSlate}15, ${COLORS.insightIndigo}15)`, marginBottom: '3rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: COLORS.eclipseSlate }}>
            🌍 Global Intelligence Dashboard
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { metric: '85+', label: 'Countries Covered', icon: '🌍', color: COLORS.lucidTeal },
              { metric: '750K+', label: 'Companies Tracked', icon: '🏢', color: COLORS.insightIndigo },
              { metric: '150+', label: 'Industry Sectors', icon: '🏭', color: COLORS.warningAmber },
              { metric: '24/7', label: 'Real-Time Updates', icon: '⚡', color: COLORS.pulseCoral },
              { metric: '95%', label: 'Data Accuracy', icon: '🎯', color: COLORS.chartGreen },
              { metric: '12', label: 'Languages Supported', icon: '🗣️', color: COLORS.eclipseSlate }
            ].map((stat, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                border: `2px solid ${stat.color}30`
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: stat.color, marginBottom: '0.25rem' }}>
                  {stat.metric}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Advantage Comparison */}
        <div style={{ ...cardStyle }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: COLORS.eclipseSlate }}>
            📊 Regional Coverage vs Competitors
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: `${COLORS.insightIndigo}15` }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Region</th>
                  <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Lucidra</th>
                  <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Act-On</th>
                  <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>OnStrategyHQ</th>
                  <th style={{ padding: '1rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>Traditional Consulting</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Caribbean Region', '✅ 15 Countries', '❌ None', '❌ None', '⚠️ Limited'],
                  ['Trinidad & Tobago', '✅ Deep Intelligence', '❌ None', '❌ None', '⚠️ Project-Based'],
                  ['Latin America', '✅ 20+ Countries', '⚠️ Mexico Only', '⚠️ Brazil Only', '💰 Extra Cost'],
                  ['North America', '✅ Full Coverage', '✅ US/Canada', '✅ US/Canada', '✅ Extensive'],
                  ['Europe', '✅ 30+ Countries', '✅ Major Markets', '⚠️ UK/Germany', '✅ Extensive'],
                  ['Asia-Pacific', '✅ 25+ Countries', '⚠️ Japan/Australia', '❌ Limited', '💰 Extra Cost'],
                  ['Real-Time Updates', '✅ 24/7', '⚠️ Weekly', '⚠️ Monthly', '❌ Quarterly'],
                  ['Local Language Support', '✅ 12 Languages', '⚠️ English Only', '⚠️ English Only', '💰 Extra Cost'],
                ].map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ 
                        padding: '0.75rem', 
                        border: '1px solid #e2e8f0',
                        textAlign: cellIndex === 0 ? 'left' : 'center',
                        fontWeight: cellIndex === 0 ? 'bold' : 'normal',
                        fontSize: '0.9rem'
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Pricing View
  const PricingView = () => (
    <div style={{ paddingTop: '5rem', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '1rem' }}>
            Choose Your Strategic Intelligence Plan
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#666' }}>
            Scale from startup to enterprise with our flexible pricing
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {/* Lucidra Core */}
          <div style={{
            ...cardStyle,
            textAlign: 'center' as const,
            padding: '2rem',
            border: `2px solid ${COLORS.chartGreen}`
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.chartGreen, marginBottom: '0.5rem' }}>
              Lucidra Core
            </h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '0.5rem' }}>
              $79
            </div>
            <div style={{ color: '#666', marginBottom: '2rem' }}>per user/month</div>
            <div style={{ textAlign: 'left' as const, marginBottom: '2rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>✓ Strategic Planning & OKRs</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Basic AI Integration</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Role Management</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Performance Tracking</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Basic Analytics</div>
            </div>
            <button style={{
              ...buttonPrimaryStyle,
              background: COLORS.chartGreen,
              color: COLORS.signalWhite,
              width: '100%'
            }}>
              Start Free Trial
            </button>
          </div>

          {/* Lucidra Intelligence */}
          <div style={{
            ...cardStyle,
            textAlign: 'center' as const,
            padding: '2rem',
            border: `2px solid ${COLORS.insightIndigo}`,
            position: 'relative' as const
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: COLORS.insightIndigo,
              color: COLORS.signalWhite,
              padding: '0.25rem 1rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              MOST POPULAR
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.insightIndigo, marginBottom: '0.5rem' }}>
              Lucidra Intelligence
            </h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '0.5rem' }}>
              $189
            </div>
            <div style={{ color: '#666', marginBottom: '2rem' }}>per user/month</div>
            <div style={{ textAlign: 'left' as const, marginBottom: '2rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>✓ Everything in Core</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Advanced AI & Claude Integration</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Market Intelligence & PESTLE</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Economic & Government Planning</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Real-time Data Monitoring</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Strategic Frameworks</div>
            </div>
            <button style={{
              ...buttonPrimaryStyle,
              background: COLORS.insightIndigo,
              color: COLORS.signalWhite,
              width: '100%'
            }}>
              Start Free Trial
            </button>
          </div>

          {/* Lucidra Vision */}
          <div style={{
            ...cardStyle,
            textAlign: 'center' as const,
            padding: '2rem',
            border: `2px solid ${COLORS.eclipseSlate}`
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '0.5rem' }}>
              Lucidra Vision
            </h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: COLORS.eclipseSlate, marginBottom: '0.5rem' }}>
              Custom
            </div>
            <div style={{ color: '#666', marginBottom: '2rem' }}>enterprise pricing</div>
            <div style={{ textAlign: 'left' as const, marginBottom: '2rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>✓ Everything in Intelligence</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Enterprise Deployment</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Advanced Governance</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Custom Integrations</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Dedicated Support</div>
              <div style={{ marginBottom: '0.5rem' }}>✓ Custom AI Models</div>
            </div>
            <button style={{
              ...buttonPrimaryStyle,
              background: COLORS.eclipseSlate,
              color: COLORS.signalWhite,
              width: '100%'
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Strategic Planning Module Component
  const StrategicPlanningModule = ({ 
    activeModuleView, 
    strategicPlanningProcess, 
    pestleFramework, 
    swotFramework, 
    vrinFramework, 
    strategyDevelopmentFramework, 
    valueChainFramework,
    strategicPhase,
    setStrategicPhase,
    completedPhases,
    setCompletedPhases,
    pestleData,
    setPestleData,
    swotData,
    setSwotData,
    vrinData,
    setVrinData
  }) => {

    const markPhaseComplete = (phaseId) => {
      if (!completedPhases.includes(phaseId)) {
        setCompletedPhases([...completedPhases, phaseId]);
      }
    };

    const getPhaseStatus = (phaseId) => {
      if (completedPhases.includes(phaseId)) return 'completed';
      if (strategicPhase === phaseId) return 'current';
      return 'pending';
    };

    // Process Overview View
    if (activeModuleView === 'process-overview') {
      return (
        <div style={cardStyle}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>
              🎯 Strategic Planning Process Roadmap
            </h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              Comprehensive 7-phase strategic planning process with proven frameworks and clear deliverables
            </p>
          </div>

          {/* Process Progress Bar */}
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.lucidTeal}15)`,
            marginBottom: '2rem'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: COLORS.insightIndigo }}>Process Progress</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflowX: 'auto', padding: '1rem 0' }}>
              {strategicPlanningProcess.phases.map((phase, index) => (
                <div key={phase.id} style={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: getPhaseStatus(phase.id) === 'completed' ? COLORS.chartGreen :
                                getPhaseStatus(phase.id) === 'current' ? COLORS.insightIndigo :
                                COLORS.eclipseSlate + '30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.signalWhite,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setStrategicPhase(phase.id)}>
                    {getPhaseStatus(phase.id) === 'completed' ? '✓' : index + 1}
                  </div>
                  {index < strategicPlanningProcess.phases.length - 1 && (
                    <div style={{
                      width: '40px',
                      height: '4px',
                      background: completedPhases.includes(strategicPlanningProcess.phases[index + 1].id) ? 
                                  COLORS.chartGreen : COLORS.eclipseSlate + '30',
                      margin: '0 1rem'
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {strategicPlanningProcess.phases.map((phase, index) => (
              <div key={phase.id} style={{
                ...cardStyle,
                background: getPhaseStatus(phase.id) === 'completed' ? `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.chartGreen}25)` :
                           getPhaseStatus(phase.id) === 'current' ? `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.insightIndigo}25)` :
                           `linear-gradient(135deg, ${COLORS.eclipseSlate}10, ${COLORS.eclipseSlate}20)`,
                border: `2px solid ${getPhaseStatus(phase.id) === 'completed' ? COLORS.chartGreen :
                                    getPhaseStatus(phase.id) === 'current' ? COLORS.insightIndigo :
                                    COLORS.eclipseSlate + '30'}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setStrategicPhase(phase.id)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: getPhaseStatus(phase.id) === 'completed' ? COLORS.chartGreen :
                                getPhaseStatus(phase.id) === 'current' ? COLORS.insightIndigo :
                                COLORS.eclipseSlate,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.signalWhite,
                    fontWeight: 'bold',
                    marginRight: '1rem'
                  }}>
                    {getPhaseStatus(phase.id) === 'completed' ? '✓' : index + 1}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: COLORS.eclipseSlate }}>{phase.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Duration: {phase.duration}</div>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', lineHeight: '1.5' }}>
                  {phase.description}
                </p>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem', color: COLORS.insightIndigo }}>
                    Key Participants:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {phase.participants.join(', ')}
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem', color: COLORS.chartGreen }}>
                    Deliverables:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {phase.deliverables.join(', ')}
                  </div>
                </div>

                <div style={{
                  background: COLORS.signalWhite,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  marginTop: '1rem'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: COLORS.eclipseSlate }}>
                    Status: {getPhaseStatus(phase.id) === 'completed' ? '✅ Completed' :
                             getPhaseStatus(phase.id) === 'current' ? '🔄 In Progress' :
                             '⏳ Pending'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.lucidTeal}15, ${COLORS.insightIndigo}15)`,
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: COLORS.eclipseSlate }}>Quick Actions</h4>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                ...buttonPrimaryStyle,
                background: COLORS.insightIndigo,
                color: COLORS.signalWhite
              }}
              onClick={() => setStrategicPhase('pestle')}>
                🌍 Start PESTLE Analysis
              </button>
              <button style={{
                ...buttonPrimaryStyle,
                background: COLORS.chartGreen,
                color: COLORS.signalWhite
              }}>
                📊 View All Reports
              </button>
              <button style={{
                ...buttonPrimaryStyle,
                background: COLORS.warningAmber,
                color: COLORS.signalWhite
              }}>
                👥 Assign Team Roles
              </button>
            </div>
          </div>
        </div>
      );
    }

    // PESTLE Analysis View
    if (activeModuleView === 'pestle-analysis') {
      return (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>
                🌍 PESTLE Analysis - Environmental Scanning
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Analyze Political, Economic, Social, Technological, Legal, and Environmental factors
              </p>
            </div>
            <button style={{
              ...buttonPrimaryStyle,
              background: COLORS.chartGreen,
              color: COLORS.signalWhite
            }}
            onClick={() => markPhaseComplete('pestle')}>
              ✅ Mark Complete
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {Object.entries(pestleFramework).map(([key, factor]) => (
              <div key={key} style={{
                ...cardStyle,
                background: `linear-gradient(135deg, ${factor.color}15, ${factor.color}25)`,
                border: `2px solid ${factor.color}`
              }}>
                <h4 style={{ color: factor.color, margin: '0 0 1rem 0' }}>
                  {factor.name}
                </h4>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Key Factors to Analyze:
                  </div>
                  {factor.factors.map((item, index) => (
                    <div key={index} style={{
                      padding: '0.5rem',
                      margin: '0.25rem 0',
                      background: COLORS.signalWhite,
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      border: `1px solid ${factor.color}20`
                    }}>
                      • {item}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: COLORS.insightIndigo }}>
                    Required Inputs:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {factor.inputs.join(', ')}
                  </div>
                </div>

                <div style={{
                  background: COLORS.signalWhite,
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `1px solid ${factor.color}30`
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: COLORS.chartGreen }}>
                    Expected Outputs:
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {factor.outputs.join(', ')}
                  </div>
                </div>

                {/* Interactive Team Input Section */}
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Team Assessment:
                  </div>
                  
                  {/* Score Input */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem' }}>Impact Score (1-100):</span>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={pestleData[key]}
                        onChange={(e) => setPestleData({...pestleData, [key]: parseInt(e.target.value)})}
                        style={{
                          width: '100px',
                          accentColor: factor.color
                        }}
                      />
                      <div style={{
                        background: factor.color,
                        color: COLORS.signalWhite,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        minWidth: '50px',
                        textAlign: 'center'
                      }}>
                        {pestleData[key]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Team Input Form */}
                  <div style={{ marginBottom: '1rem' }}>
                    <textarea
                      placeholder={`Enter your team's assessment for ${factor.name} factors...`}
                      value={teamInputs.pestle[key]?.assessment || ''}
                      onChange={(e) => setTeamInputs({
                        ...teamInputs,
                        pestle: {
                          ...teamInputs.pestle,
                          [key]: {
                            ...teamInputs.pestle[key],
                            assessment: e.target.value
                          }
                        }
                      })}
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.5rem',
                        border: `1px solid ${factor.color}`,
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  
                  {/* Team Member Assignment */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                    <select
                      value={teamInputs.pestle[key]?.assignedTo || ''}
                      onChange={(e) => setTeamInputs({
                        ...teamInputs,
                        pestle: {
                          ...teamInputs.pestle,
                          [key]: {
                            ...teamInputs.pestle[key],
                            assignedTo: e.target.value
                          }
                        }
                      })}
                      style={{
                        padding: '0.25rem',
                        border: `1px solid ${factor.color}`,
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}
                    >
                      <option value="">Assign to team member...</option>
                      <option value="Strategy Team">Strategy Team</option>
                      <option value="Market Research">Market Research</option>
                      <option value="Government Relations">Government Relations</option>
                      <option value="Technology Team">Technology Team</option>
                      <option value="Finance Team">Finance Team</option>
                      <option value="Operations Team">Operations Team</option>
                    </select>
                    
                    <button
                      onClick={() => {
                        const timestamp = new Date().toLocaleString();
                        setTeamInputs({
                          ...teamInputs,
                          pestle: {
                            ...teamInputs.pestle,
                            [key]: {
                              ...teamInputs.pestle[key],
                              lastUpdated: timestamp,
                              status: 'completed'
                            }
                          }
                        });
                      }}
                      style={{
                        background: COLORS.chartGreen,
                        color: COLORS.signalWhite,
                        border: 'none',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      Save Input
                    </button>
                  </div>
                  
                  {teamInputs.pestle[key]?.lastUpdated && (
                    <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.5rem' }}>
                      Last updated: {teamInputs.pestle[key]?.lastUpdated} by {teamInputs.pestle[key]?.assignedTo || 'Team Member'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* PESTLE Summary Dashboard */}
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.lucidTeal}15)`,
            marginTop: '2rem'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: COLORS.insightIndigo }}>PESTLE Analysis Summary</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {Object.entries(pestleData).map(([key, value]) => (
                <div key={key} style={{
                  textAlign: 'center',
                  padding: '1rem',
                  background: COLORS.signalWhite,
                  borderRadius: '8px'
                }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'capitalize', marginBottom: '0.5rem' }}>
                    {key}
                  </div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: value > 75 ? COLORS.chartGreen : value > 50 ? COLORS.warningAmber : COLORS.pulseCoral
                  }}>
                    {value}
                  </div>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: '#e2e8f0',
                    borderRadius: '2px',
                    marginTop: '0.5rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${value}%`,
                      height: '100%',
                      background: value > 75 ? COLORS.chartGreen : value > 50 ? COLORS.warningAmber : COLORS.pulseCoral,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // SWOT Analysis View
    if (activeModuleView === 'swot-analysis') {
      return (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>
                ⚡ SWOT Analysis - Internal Capabilities vs External Environment
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Analyze Strengths, Weaknesses, Opportunities, and Threats with DuPont financial integration
              </p>
            </div>
            <button style={{
              ...buttonPrimaryStyle,
              background: COLORS.chartGreen,
              color: COLORS.signalWhite
            }}
            onClick={() => markPhaseComplete('swot')}>
              ✅ Mark Complete
            </button>
          </div>

          {/* SWOT Matrix */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            
            {/* Strengths Quadrant */}
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.chartGreen}25)`,
              border: `2px solid ${COLORS.chartGreen}`
            }}>
              <h4 style={{ color: COLORS.chartGreen, margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center' }}>
                💪 Strengths (Internal Positive Factors)
              </h4>
              
              {swotFramework.strengths.categories.map((category, index) => (
                <div key={index} style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: COLORS.signalWhite,
                  borderRadius: '8px',
                  border: `1px solid ${COLORS.chartGreen}30`
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: COLORS.chartGreen }}>
                    {category.name}
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.insightIndigo }}>
                      Key Metrics:
                    </div>
                    {category.metrics.map((metric, i) => (
                      <div key={i} style={{ fontSize: '0.8rem', margin: '0.25rem 0', color: '#666' }}>
                        • {metric}
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                      Success Criteria:
                    </div>
                    {category.criteria.map((criterion, i) => (
                      <div key={i} style={{
                        fontSize: '0.8rem',
                        margin: '0.25rem 0',
                        padding: '0.25rem 0.5rem',
                        background: `${COLORS.chartGreen}10`,
                        borderRadius: '4px',
                        color: '#666'
                      }}>
                        ✓ {criterion}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Team Input for Strengths */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '8px',
                border: `1px solid ${COLORS.chartGreen}30`
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: COLORS.chartGreen, fontSize: '0.9rem' }}>
                  💪 Team Input - Add Strengths:
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Add a new strength (e.g., Strong market position, Innovative technology...)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const newStrength = e.target.value.trim();
                        setSwotData({
                          ...swotData,
                          strengths: [...swotData.strengths, {
                            id: Date.now(),
                            text: newStrength,
                            addedBy: userProfile.name || 'Team Member',
                            timestamp: new Date().toLocaleString(),
                            category: 'Team Added'
                          }]
                        });
                        e.target.value = '';
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: `1px solid ${COLORS.chartGreen}`,
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}
                  />
                </div>
                
                {/* Display team-added strengths */}
                {swotData.strengths.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                      Team Identified Strengths:
                    </div>
                    {swotData.strengths.map((strength, i) => (
                      <div key={strength.id || i} style={{
                        padding: '0.5rem',
                        margin: '0.25rem 0',
                        background: `${COLORS.chartGreen}15`,
                        borderRadius: '6px',
                        border: `1px solid ${COLORS.chartGreen}30`,
                        fontSize: '0.8rem'
                      }}>
                        <div style={{ color: COLORS.eclipseSlate, marginBottom: '0.25rem' }}>
                          ✓ {strength.text || strength}
                        </div>
                        {strength.addedBy && (
                          <div style={{ fontSize: '0.7rem', color: '#666' }}>
                            Added by {strength.addedBy} • {strength.timestamp}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Weaknesses Quadrant */}
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.pulseCoral}15, ${COLORS.pulseCoral}25)`,
              border: `2px solid ${COLORS.pulseCoral}`
            }}>
              <h4 style={{ color: COLORS.pulseCoral, margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center' }}>
                ⚠️ Weaknesses (Internal Negative Factors)
              </h4>
              
              {swotFramework.weaknesses.categories.map((category, index) => (
                <div key={index} style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: COLORS.signalWhite,
                  borderRadius: '8px',
                  border: `1px solid ${COLORS.pulseCoral}30`
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: COLORS.pulseCoral }}>
                    {category.name}
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.insightIndigo }}>
                      Problem Areas:
                    </div>
                    {category.metrics.map((metric, i) => (
                      <div key={i} style={{ fontSize: '0.8rem', margin: '0.25rem 0', color: '#666' }}>
                        • {metric}
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                      Warning Signs:
                    </div>
                    {category.criteria.map((criterion, i) => (
                      <div key={i} style={{
                        fontSize: '0.8rem',
                        margin: '0.25rem 0',
                        padding: '0.25rem 0.5rem',
                        background: `${COLORS.pulseCoral}10`,
                        borderRadius: '4px',
                        color: '#666'
                      }}>
                        ⚠️ {criterion}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Team Input for Weaknesses */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '8px',
                border: `1px solid ${COLORS.pulseCoral}30`
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: COLORS.pulseCoral, fontSize: '0.9rem' }}>
                  ⚠️ Team Input - Add Weaknesses:
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Add a weakness to address (e.g., Limited cash flow, Outdated systems...)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const newWeakness = e.target.value.trim();
                        setSwotData({
                          ...swotData,
                          weaknesses: [...swotData.weaknesses, {
                            id: Date.now(),
                            text: newWeakness,
                            addedBy: userProfile.name || 'Team Member',
                            timestamp: new Date().toLocaleString(),
                            category: 'Team Added'
                          }]
                        });
                        e.target.value = '';
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: `1px solid ${COLORS.pulseCoral}`,
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}
                  />
                </div>
                
                {/* Display team-added weaknesses */}
                {swotData.weaknesses.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                      Team Identified Weaknesses:
                    </div>
                    {swotData.weaknesses.map((weakness, i) => (
                      <div key={weakness.id || i} style={{
                        padding: '0.5rem',
                        margin: '0.25rem 0',
                        background: `${COLORS.pulseCoral}15`,
                        borderRadius: '6px',
                        border: `1px solid ${COLORS.pulseCoral}30`,
                        fontSize: '0.8rem'
                      }}>
                        <div style={{ color: COLORS.eclipseSlate, marginBottom: '0.25rem' }}>
                          ⚠️ {weakness.text || weakness}
                        </div>
                        {weakness.addedBy && (
                          <div style={{ fontSize: '0.7rem', color: '#666' }}>
                            Added by {weakness.addedBy} • {weakness.timestamp}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Opportunities Quadrant */}
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.insightIndigo}25)`,
              border: `2px solid ${COLORS.insightIndigo}`
            }}>
              <h4 style={{ color: COLORS.insightIndigo, margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center' }}>
                🚀 Opportunities (External Positive Factors)
              </h4>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.75rem', color: COLORS.insightIndigo }}>
                  Source Analysis:
                </div>
                {swotFramework.opportunities.sources.map((source, i) => (
                  <div key={i} style={{
                    padding: '0.5rem',
                    margin: '0.25rem 0',
                    background: COLORS.signalWhite,
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    border: `1px solid ${COLORS.insightIndigo}20`
                  }}>
                    📊 {source}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.75rem', color: COLORS.insightIndigo }}>
                  Opportunity Categories:
                </div>
                {swotFramework.opportunities.categories.map((category, i) => (
                  <div key={i} style={{
                    padding: '0.75rem',
                    margin: '0.5rem 0',
                    background: COLORS.signalWhite,
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    border: `2px solid ${COLORS.insightIndigo}30`,
                    fontWeight: 'bold',
                    color: COLORS.eclipseSlate
                  }}>
                    🎯 {category}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '8px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  🚀 Team Input - Add Opportunities:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                  Based on PESTLE analysis results and competitive intelligence
                </div>
                
                {/* Team Input for Opportunities */}
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Add an opportunity (e.g., New market segment, Technology adoption...)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const newOpportunity = e.target.value.trim();
                        setSwotData({
                          ...swotData,
                          opportunities: [...swotData.opportunities, {
                            id: Date.now(),
                            text: newOpportunity,
                            addedBy: userProfile.name || 'Team Member',
                            timestamp: new Date().toLocaleString(),
                            category: 'Team Added'
                          }]
                        });
                        e.target.value = '';
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: `1px solid ${COLORS.insightIndigo}`,
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}
                  />
                </div>
                
                {/* Display team-added opportunities */}
                {swotData.opportunities.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                      Team Identified Opportunities:
                    </div>
                    {swotData.opportunities.map((opportunity, i) => (
                      <div key={opportunity.id || i} style={{
                        padding: '0.5rem',
                        margin: '0.25rem 0',
                        background: `${COLORS.insightIndigo}15`,
                        borderRadius: '6px',
                        border: `1px solid ${COLORS.insightIndigo}30`,
                        fontSize: '0.8rem'
                      }}>
                        <div style={{ color: COLORS.eclipseSlate, marginBottom: '0.25rem' }}>
                          🚀 {opportunity.text || opportunity}
                        </div>
                        {opportunity.addedBy && (
                          <div style={{ fontSize: '0.7rem', color: '#666' }}>
                            Added by {opportunity.addedBy} • {opportunity.timestamp}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Threats Quadrant */}
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.warningAmber}15, ${COLORS.warningAmber}25)`,
              border: `2px solid ${COLORS.warningAmber}`
            }}>
              <h4 style={{ color: COLORS.warningAmber, margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center' }}>
                ⚡ Threats (External Negative Factors)
              </h4>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.75rem', color: COLORS.warningAmber }}>
                  Threat Intelligence Sources:
                </div>
                {swotFramework.threats.sources.map((source, i) => (
                  <div key={i} style={{
                    padding: '0.5rem',
                    margin: '0.25rem 0',
                    background: COLORS.signalWhite,
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    border: `1px solid ${COLORS.warningAmber}20`
                  }}>
                    🔍 {source}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.75rem', color: COLORS.warningAmber }}>
                  Threat Categories:
                </div>
                {swotFramework.threats.categories.map((category, i) => (
                  <div key={i} style={{
                    padding: '0.75rem',
                    margin: '0.5rem 0',
                    background: COLORS.signalWhite,
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    border: `2px solid ${COLORS.warningAmber}30`,
                    fontWeight: 'bold',
                    color: COLORS.eclipseSlate
                  }}>
                    ⚠️ {category}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '8px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  ⚡ Team Input - Add Threats:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                  Continuous monitoring and mitigation strategies required
                </div>
                
                {/* Team Input for Threats */}
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Add a threat to monitor (e.g., New competitor, Economic downturn...)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const newThreat = e.target.value.trim();
                        setSwotData({
                          ...swotData,
                          threats: [...swotData.threats, {
                            id: Date.now(),
                            text: newThreat,
                            addedBy: userProfile.name || 'Team Member',
                            timestamp: new Date().toLocaleString(),
                            category: 'Team Added'
                          }]
                        });
                        e.target.value = '';
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: `1px solid ${COLORS.warningAmber}`,
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}
                  />
                </div>
                
                {/* Display team-added threats */}
                {swotData.threats.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                      Team Identified Threats:
                    </div>
                    {swotData.threats.map((threat, i) => (
                      <div key={threat.id || i} style={{
                        padding: '0.5rem',
                        margin: '0.25rem 0',
                        background: `${COLORS.warningAmber}15`,
                        borderRadius: '6px',
                        border: `1px solid ${COLORS.warningAmber}30`,
                        fontSize: '0.8rem'
                      }}>
                        <div style={{ color: COLORS.eclipseSlate, marginBottom: '0.25rem' }}>
                          ⚡ {threat.text || threat}
                        </div>
                        {threat.addedBy && (
                          <div style={{ fontSize: '0.7rem', color: '#666' }}>
                            Added by {threat.addedBy} • {threat.timestamp}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DuPont Analysis Integration */}
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.eclipseSlate}15, ${COLORS.insightIndigo}15)`,
            marginTop: '2rem'
          }}>
            <h4 style={{ margin: '0 0 1.5rem 0', color: COLORS.eclipseSlate }}>
              💹 DuPont Analysis Integration - Financial Strength Assessment
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                border: `2px solid ${COLORS.chartGreen}`
              }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>ROE Decomposition</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.chartGreen }}>15.2%</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Return on Equity</div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                border: `2px solid ${COLORS.insightIndigo}`
              }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Profit Margin</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.insightIndigo }}>8.5%</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Net Income / Revenue</div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                border: `2px solid ${COLORS.warningAmber}`
              }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Asset Turnover</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.warningAmber }}>1.3x</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Revenue / Assets</div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                border: `2px solid ${COLORS.pulseCoral}`
              }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Equity Multiplier</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: COLORS.pulseCoral }}>1.4x</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Assets / Equity</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // VRIN Analysis View
    if (activeModuleView === 'vrin-analysis') {
      return (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>
                💎 VRIN Analysis - Resource-Based Competitive Advantage
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Evaluate resources for Valuable, Rare, Inimitable, and Non-Substitutable characteristics
              </p>
            </div>
            <button style={{
              ...buttonPrimaryStyle,
              background: COLORS.chartGreen,
              color: COLORS.signalWhite
            }}
            onClick={() => markPhaseComplete('vrin')}>
              ✅ Mark Complete
            </button>
          </div>

          {/* VRIN Framework Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {Object.entries(vrinFramework).map(([key, dimension]) => (
              <div key={key} style={{
                ...cardStyle,
                background: `linear-gradient(135deg, ${dimension.color}15, ${dimension.color}25)`,
                border: `2px solid ${dimension.color}`
              }}>
                <h4 style={{ color: dimension.color, margin: '0 0 1rem 0' }}>
                  {dimension.name}
                </h4>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Assessment Criteria:
                  </div>
                  {dimension.criteria.map((criterion, index) => (
                    <div key={index} style={{
                      padding: '0.5rem',
                      margin: '0.25rem 0',
                      background: COLORS.signalWhite,
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      border: `1px solid ${dimension.color}20`
                    }}>
                      ✓ {criterion}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: COLORS.insightIndigo }}>
                    Examples:
                  </div>
                  {dimension.examples.map((example, index) => (
                    <div key={index} style={{
                      padding: '0.5rem',
                      margin: '0.25rem 0',
                      background: `${dimension.color}10`,
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#666',
                      fontStyle: 'italic'
                    }}>
                      • {example}
                    </div>
                  ))}
                </div>

                <div style={{
                  background: COLORS.signalWhite,
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `1px solid ${dimension.color}30`
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem', color: COLORS.chartGreen }}>
                    Assessment Framework:
                  </div>
                  {dimension.assessment.map((item, index) => (
                    <div key={index} style={{ fontSize: '0.8rem', color: '#666', margin: '0.25rem 0' }}>
                      📊 {item}
                    </div>
                  ))}
                </div>

                {/* Interactive Team Resource Evaluation */}
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '8px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    🎯 Team Resource Evaluation - {dimension.name}:
                  </div>
                  
                  {/* Resource Input Form */}
                  <div style={{ marginBottom: '1rem' }}>
                    <input
                      type="text"
                      placeholder={`Add a ${key} resource (e.g., ${dimension.examples[0]})...`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          const newResource = e.target.value.trim();
                          setVrinData({
                            ...vrinData,
                            [key]: [...(vrinData[key] || []), {
                              id: Date.now(),
                              resource: newResource,
                              addedBy: userProfile.name || 'Team Member',
                              timestamp: new Date().toLocaleString(),
                              score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
                              notes: ''
                            }]
                          });
                          e.target.value = '';
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: `1px solid ${dimension.color}`,
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>
                      Press Enter to add resource • Team evaluation and scoring
                    </div>
                  </div>

                  {/* Team-Added Resources */}
                  {vrinData[key] && vrinData[key].length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                        Team Identified {dimension.name} Resources:
                      </div>
                      {vrinData[key].map((resource, i) => (
                        <div key={resource.id || i} style={{
                          padding: '0.75rem',
                          margin: '0.5rem 0',
                          background: `${dimension.color}15`,
                          borderRadius: '6px',
                          border: `1px solid ${dimension.color}30`,
                          fontSize: '0.8rem'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                            <div style={{ color: COLORS.eclipseSlate, fontWeight: 'bold', flex: 1 }}>
                              💎 {resource.resource || resource}
                            </div>
                            <div style={{
                              background: dimension.color,
                              color: COLORS.signalWhite,
                              padding: '0.25rem 0.5rem',
                              borderRadius: '10px',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              marginLeft: '0.5rem'
                            }}>
                              {resource.score || Math.floor(Math.random() * 30) + 70}/100
                            </div>
                          </div>
                          {resource.addedBy && (
                            <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem' }}>
                              Evaluated by {resource.addedBy} • {resource.timestamp}
                            </div>
                          )}
                          
                          {/* Quick Assessment Buttons */}
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <button
                              onClick={() => {
                                const updatedResources = vrinData[key].map(r => 
                                  r.id === resource.id 
                                    ? { ...r, assessment: 'High', score: Math.max(85, r.score || 70) }
                                    : r
                                );
                                setVrinData({ ...vrinData, [key]: updatedResources });
                              }}
                              style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.7rem',
                                border: 'none',
                                borderRadius: '4px',
                                background: resource.assessment === 'High' ? COLORS.chartGreen : '#f0f0f0',
                                color: resource.assessment === 'High' ? COLORS.signalWhite : '#666',
                                cursor: 'pointer'
                              }}
                            >
                              ✅ High
                            </button>
                            <button
                              onClick={() => {
                                const updatedResources = vrinData[key].map(r => 
                                  r.id === resource.id 
                                    ? { ...r, assessment: 'Medium', score: Math.min(Math.max(60, r.score || 70), 84) }
                                    : r
                                );
                                setVrinData({ ...vrinData, [key]: updatedResources });
                              }}
                              style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.7rem',
                                border: 'none',
                                borderRadius: '4px',
                                background: resource.assessment === 'Medium' ? COLORS.warningAmber : '#f0f0f0',
                                color: resource.assessment === 'Medium' ? COLORS.signalWhite : '#666',
                                cursor: 'pointer'
                              }}
                            >
                              ⚠️ Medium
                            </button>
                            <button
                              onClick={() => {
                                const updatedResources = vrinData[key].map(r => 
                                  r.id === resource.id 
                                    ? { ...r, assessment: 'Low', score: Math.min(59, r.score || 70) }
                                    : r
                                );
                                setVrinData({ ...vrinData, [key]: updatedResources });
                              }}
                              style={{
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.7rem',
                                border: 'none',
                                borderRadius: '4px',
                                background: resource.assessment === 'Low' ? COLORS.pulseCoral : '#f0f0f0',
                                color: resource.assessment === 'Low' ? COLORS.signalWhite : '#666',
                                cursor: 'pointer'
                              }}
                            >
                              ❌ Low
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Overall Score Display */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: `${dimension.color}10`,
                    borderRadius: '6px',
                    border: `1px solid ${dimension.color}30`
                  }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                      Team Average {dimension.name} Score:
                    </span>
                    <div style={{
                      background: dimension.color,
                      color: COLORS.signalWhite,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '0.8rem'
                    }}>
                      {vrinData[key] && vrinData[key].length > 0 
                        ? Math.round(vrinData[key].reduce((sum, r) => sum + (r.score || 75), 0) / vrinData[key].length)
                        : (key === 'valuable' ? '85' : key === 'rare' ? '72' : key === 'inimitable' ? '78' : '81')
                      }/100
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Resource Analysis Summary */}
          {(vrinData.valuable?.length > 0 || vrinData.rare?.length > 0 || vrinData.inimitable?.length > 0 || vrinData.nonSubstitutable?.length > 0) && (
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.lucidTeal}15, ${COLORS.chartGreen}15)`,
              marginTop: '2rem'
            }}>
              <h4 style={{ margin: '0 0 1.5rem 0', color: COLORS.lucidTeal }}>
                🎯 Team Resource Analysis Summary
              </h4>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  background: COLORS.signalWhite,
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <thead>
                    <tr style={{ background: COLORS.lucidTeal, color: COLORS.signalWhite }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.9rem' }}>Team Resource</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>V-Score</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>R-Score</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>I-Score</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>N-Score</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Added By</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Strategic Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Generate rows for all team-added resources */}
                    {Object.entries(vrinData).flatMap(([dimension, resources]) => 
                      (resources || []).map((resource, index) => {
                        // For demo purposes, assign scores across dimensions
                        const getScoreForDimension = (dim) => {
                          if (dim === dimension) return resource.score || 75;
                          return Math.floor(Math.random() * 40) + 50; // Random 50-90 for other dimensions
                        };
                        
                        const vScore = getScoreForDimension('valuable');
                        const rScore = getScoreForDimension('rare');
                        const iScore = getScoreForDimension('inimitable');
                        const nScore = getScoreForDimension('nonSubstitutable');
                        
                        const avgScore = (vScore + rScore + iScore + nScore) / 4;
                        const strategicValue = avgScore >= 80 ? 'Sustained Advantage' :
                                             avgScore >= 70 ? 'Competitive Advantage' :
                                             avgScore >= 60 ? 'Competitive Parity' : 'Disadvantage';
                        
                        return (
                          <tr key={`${dimension}-${index}`} style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem' }}>
                              {resource.resource || resource}
                            </td>
                            <td style={{ 
                              padding: '1rem', 
                              textAlign: 'center', 
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: vScore >= 80 ? COLORS.chartGreen : vScore >= 70 ? COLORS.warningAmber : COLORS.pulseCoral
                            }}>
                              {vScore}
                            </td>
                            <td style={{ 
                              padding: '1rem', 
                              textAlign: 'center', 
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: rScore >= 80 ? COLORS.chartGreen : rScore >= 70 ? COLORS.warningAmber : COLORS.pulseCoral
                            }}>
                              {rScore}
                            </td>
                            <td style={{ 
                              padding: '1rem', 
                              textAlign: 'center', 
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: iScore >= 80 ? COLORS.chartGreen : iScore >= 70 ? COLORS.warningAmber : COLORS.pulseCoral
                            }}>
                              {iScore}
                            </td>
                            <td style={{ 
                              padding: '1rem', 
                              textAlign: 'center', 
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              color: nScore >= 80 ? COLORS.chartGreen : nScore >= 70 ? COLORS.warningAmber : COLORS.pulseCoral
                            }}>
                              {nScore}
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.7rem', color: '#666' }}>
                              {resource.addedBy || 'Team Member'}
                            </td>
                            <td style={{ 
                              padding: '1rem', 
                              textAlign: 'center', 
                              fontSize: '0.7rem', 
                              fontWeight: 'bold',
                              color: strategicValue.includes('Sustained') ? COLORS.chartGreen :
                                     strategicValue.includes('Competitive Advantage') ? COLORS.insightIndigo :
                                     strategicValue.includes('Parity') ? COLORS.warningAmber : COLORS.pulseCoral
                            }}>
                              {strategicValue}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Team Resource Insights */}
              <div style={{ 
                marginTop: '1.5rem', 
                padding: '1.5rem', 
                background: `${COLORS.chartGreen}10`, 
                borderRadius: '8px' 
              }}>
                <h5 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>
                  🧠 AI-Powered Team Resource Insights
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                      Resource Strength Distribution:
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      • Valuable Resources: {(vrinData.valuable || []).length} identified<br/>
                      • Rare Resources: {(vrinData.rare || []).length} identified<br/>
                      • Inimitable Resources: {(vrinData.inimitable || []).length} identified<br/>
                      • Non-Substitutable: {(vrinData.nonSubstitutable || []).length} identified
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.eclipseSlate }}>
                      Strategic Recommendations:
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {Object.values(vrinData).some(arr => arr && arr.length > 0) 
                        ? "• Focus investment on high-scoring resources\n• Develop protection strategies for inimitable assets\n• Consider partnerships to acquire missing capabilities"
                        : "• Begin by identifying your core valuable resources\n• Evaluate existing assets using VRIN criteria\n• Involve team members from different departments"
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VRIN Competitive Advantage Matrix */}
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.lucidTeal}15, ${COLORS.insightIndigo}15)`,
            marginTop: '2rem'
          }}>
            <h4 style={{ margin: '0 0 1.5rem 0', color: COLORS.lucidTeal }}>
              🎯 VRIN Competitive Advantage Matrix (Framework Examples)
            </h4>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <thead>
                  <tr style={{ background: COLORS.eclipseSlate, color: COLORS.signalWhite }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.9rem' }}>Resource</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Valuable</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Rare</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Inimitable</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Non-Substitutable</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>Competitive Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Claude AI Integration', '✅', '✅', '✅', '✅', 'Sustained Competitive Advantage'],
                    ['Unified Platform Architecture', '✅', '✅', '✅', '⚠️', 'Temporary Competitive Advantage'],
                    ['Blue Ocean Framework', '✅', '✅', '⚠️', '✅', 'Competitive Advantage'],
                    ['Financial Integration (DuPont)', '✅', '⚠️', '✅', '✅', 'Competitive Parity'],
                    ['Strategic Planning Process', '✅', '❌', '⚠️', '⚠️', 'Competitive Disadvantage']
                  ].map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem', fontWeight: 'bold', fontSize: '0.8rem' }}>{row[0]}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '1rem' }}>{row[1]}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '1rem' }}>{row[2]}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '1rem' }}>{row[3]}</td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '1rem' }}>{row[4]}</td>
                      <td style={{ 
                        padding: '1rem', 
                        textAlign: 'center', 
                        fontSize: '0.8rem', 
                        fontWeight: 'bold',
                        color: row[5].includes('Sustained') ? COLORS.chartGreen :
                               row[5].includes('Temporary') ? COLORS.insightIndigo :
                               row[5].includes('Competitive Advantage') ? COLORS.warningAmber :
                               row[5].includes('Parity') ? COLORS.eclipseSlate : COLORS.pulseCoral
                      }}>{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resource Development Recommendations */}
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.lucidTeal}15)`,
            marginTop: '2rem'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: COLORS.chartGreen }}>
              🚀 Resource Development Recommendations
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{
                padding: '1rem',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                border: `2px solid ${COLORS.chartGreen}`
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.chartGreen }}>
                  🎯 Strengthen Core Resources
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Enhance Claude AI capabilities and platform integration to maintain sustained advantage
                </div>
              </div>
              
              <div style={{
                padding: '1rem',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                border: `2px solid ${COLORS.insightIndigo}`
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.insightIndigo }}>
                  🔧 Develop Rare Capabilities
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Build unique organizational intelligence features that competitors cannot easily replicate
                </div>
              </div>
              
              <div style={{
                padding: '1rem',
                background: COLORS.signalWhite,
                borderRadius: '8px',
                border: `2px solid ${COLORS.warningAmber}`
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: COLORS.warningAmber }}>
                  🛡️ Protect Inimitable Assets
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Safeguard proprietary algorithms and strategic frameworks through patents and trade secrets
                </div>
              </div>
            </div>
          </div>

          {/* Collaborative Resource Prioritization */}
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.lucidTeal}15)`,
            marginTop: '2rem'
          }}>
            <h4 style={{ margin: '0 0 1.5rem 0', color: COLORS.insightIndigo }}>
              🤝 Team Resource Prioritization & Action Planning
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Resource Investment Priority */}
              <div>
                <h5 style={{ color: COLORS.insightIndigo, marginBottom: '1rem' }}>
                  🎯 Investment Priority Ranking
                </h5>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                  Team members can vote on resource development priorities:
                </div>
                
                {/* Priority Voting Interface */}
                <div style={{ space: '1rem 0' }}>
                  {['High-Value AI Capabilities', 'Rare Market Position', 'Inimitable Processes', 'Non-Substitutable Assets'].map((priority, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      margin: '0.5rem 0',
                      background: COLORS.signalWhite,
                      borderRadius: '8px',
                      border: `1px solid ${COLORS.insightIndigo}30`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: COLORS.eclipseSlate }}>
                          {priority}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {[1, 2, 3, 4, 5].map(vote => (
                            <button
                              key={vote}
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '50%',
                                border: `2px solid ${COLORS.insightIndigo}`,
                                background: vote <= (3 + index) ? COLORS.insightIndigo : COLORS.signalWhite,
                                color: vote <= (3 + index) ? COLORS.signalWhite : COLORS.insightIndigo,
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                              }}
                            >
                              {vote}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.5rem' }}>
                        Team Average: {(3 + index)}/5 • {2 + index} votes cast
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Planning */}
              <div>
                <h5 style={{ color: COLORS.lucidTeal, marginBottom: '1rem' }}>
                  📋 90-Day Action Plan
                </h5>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                  Team-defined actions to strengthen key resources:
                </div>
                
                {/* Action Item Input */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    placeholder="Add action item (e.g., Patent AI algorithms, Hire ML specialists...)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const newAction = e.target.value.trim();
                        // For demo purposes, we'll add to a mock action list
                        const actionElement = document.createElement('div');
                        actionElement.innerHTML = `
                          <div style="padding: 0.75rem; margin: 0.5rem 0; background: ${COLORS.lucidTeal}15; border-radius: 6px; border: 1px solid ${COLORS.lucidTeal}30; font-size: 0.8rem;">
                            <div style="color: ${COLORS.eclipseSlate}; font-weight: bold; margin-bottom: 0.25rem;">📌 ${newAction}</div>
                            <div style="font-size: 0.7rem; color: #666;">Added by ${userProfile.name || 'Team Member'} • ${new Date().toLocaleDateString()}</div>
                            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                              <span style="background: ${COLORS.warningAmber}; color: white; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.7rem;">30 Days</span>
                              <span style="background: ${COLORS.insightIndigo}; color: white; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.7rem;">High Priority</span>
                            </div>
                          </div>
                        `;
                        e.target.parentNode.appendChild(actionElement);
                        e.target.value = '';
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: `1px solid ${COLORS.lucidTeal}`,
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}
                  />
                </div>

                {/* Sample Action Items */}
                <div>
                  <div style={{
                    padding: '0.75rem',
                    margin: '0.5rem 0',
                    background: `${COLORS.lucidTeal}15`,
                    borderRadius: '6px',
                    border: `1px solid ${COLORS.lucidTeal}30`,
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ color: COLORS.eclipseSlate, fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      📌 Develop IP protection strategy for AI algorithms
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>
                      Assigned to Legal Team • Due: Next 30 days
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <span style={{
                        background: COLORS.pulseCoral,
                        color: COLORS.signalWhite,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem'
                      }}>
                        Urgent
                      </span>
                      <span style={{
                        background: COLORS.chartGreen,
                        color: COLORS.signalWhite,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem'
                      }}>
                        In Progress
                      </span>
                    </div>
                  </div>

                  <div style={{
                    padding: '0.75rem',
                    margin: '0.5rem 0',
                    background: `${COLORS.lucidTeal}15`,
                    borderRadius: '6px',
                    border: `1px solid ${COLORS.lucidTeal}30`,
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ color: COLORS.eclipseSlate, fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      📌 Establish strategic partnerships for rare capabilities
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>
                      Assigned to Business Development • Due: 90 days
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <span style={{
                        background: COLORS.warningAmber,
                        color: COLORS.signalWhite,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem'
                      }}>
                        60 Days
                      </span>
                      <span style={{
                        background: COLORS.insightIndigo,
                        color: COLORS.signalWhite,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem'
                      }}>
                        Planning
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Collaboration Status */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: `${COLORS.chartGreen}10`,
              borderRadius: '8px'
            }}>
              <h5 style={{ color: COLORS.chartGreen, marginBottom: '1rem' }}>
                👥 Team Collaboration Status
              </h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen }}>
                    {Object.values(vrinData).reduce((total, arr) => total + (arr?.length || 0), 0)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Total Resources Identified</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.insightIndigo }}>
                    {(userProfile.name ? 1 : 0) + 3}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Active Team Members</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.warningAmber }}>
                    85%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Analysis Completion</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.lucidTeal }}>
                    30
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Days to Strategy Review</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default view for other analyses
    return (
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 1rem 0', color: COLORS.eclipseSlate }}>
          Strategic Planning - {activeModuleView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h3>
        <p style={{ color: '#666' }}>
          Detailed implementation for {activeModuleView} is coming soon. This will include comprehensive frameworks, 
          team assignments, and detailed analysis tools.
        </p>
      </div>
    );
  };

  // Competitive Intelligence Component
  const CompetitiveIntelligence = ({ competitorData, blueOceanFramework, lucidraAdvantages, activeModuleView }) => {
    const [selectedCompetitor, setSelectedCompetitor] = React.useState('act-on');
    const [showBlueOceanCanvas, setShowBlueOceanCanvas] = React.useState(false);

    if (activeModuleView === 'blue-ocean') {
      return (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>
                🌊 Blue Ocean Strategy Framework
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Create uncontested market space and make competition irrelevant
              </p>
            </div>
            <button 
              style={{
                ...buttonPrimaryStyle,
                background: COLORS.warningAmber,
                color: COLORS.signalWhite
              }}
              onClick={() => setShowBlueOceanCanvas(!showBlueOceanCanvas)}
            >
              {showBlueOceanCanvas ? '📊 Framework View' : '🎨 Strategy Canvas'}
            </button>
          </div>

          {!showBlueOceanCanvas ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Eliminate */}
              <div style={{
                ...cardStyle,
                background: `linear-gradient(135deg, ${COLORS.pulseCoral}15, ${COLORS.pulseCoral}25)`,
                border: `2px solid ${COLORS.pulseCoral}`
              }}>
                <h4 style={{ color: COLORS.pulseCoral, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
                  ❌ Eliminate
                </h4>
                {blueOceanFramework.eliminate.map((item, index) => (
                  <div key={index} style={{
                    padding: '0.75rem',
                    margin: '0.5rem 0',
                    background: COLORS.signalWhite,
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    border: `1px solid ${COLORS.pulseCoral}20`
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Reduce */}
              <div style={{
                ...cardStyle,
                background: `linear-gradient(135deg, ${COLORS.warningAmber}15, ${COLORS.warningAmber}25)`,
                border: `2px solid ${COLORS.warningAmber}`
              }}>
                <h4 style={{ color: COLORS.warningAmber, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
                  📉 Reduce
                </h4>
                {blueOceanFramework.reduce.map((item, index) => (
                  <div key={index} style={{
                    padding: '0.75rem',
                    margin: '0.5rem 0',
                    background: COLORS.signalWhite,
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    border: `1px solid ${COLORS.warningAmber}20`
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Raise */}
              <div style={{
                ...cardStyle,
                background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.insightIndigo}25)`,
                border: `2px solid ${COLORS.insightIndigo}`
              }}>
                <h4 style={{ color: COLORS.insightIndigo, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
                  📈 Raise
                </h4>
                {blueOceanFramework.raise.map((item, index) => (
                  <div key={index} style={{
                    padding: '0.75rem',
                    margin: '0.5rem 0',
                    background: COLORS.signalWhite,
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    border: `1px solid ${COLORS.insightIndigo}20`
                  }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Create */}
              <div style={{
                ...cardStyle,
                background: `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.chartGreen}25)`,
                border: `2px solid ${COLORS.chartGreen}`
              }}>
                <h4 style={{ color: COLORS.chartGreen, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
                  ✨ Create
                </h4>
                {blueOceanFramework.create.map((item, index) => (
                  <div key={index} style={{
                    padding: '0.75rem',
                    margin: '0.5rem 0',
                    background: COLORS.signalWhite,
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    border: `1px solid ${COLORS.chartGreen}20`,
                    fontWeight: 'bold'
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Strategy Canvas */
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.lucidTeal}10, ${COLORS.insightIndigo}10)`,
              padding: '2rem'
            }}>
              <h4 style={{ margin: '0 0 2rem 0', textAlign: 'center', color: COLORS.eclipseSlate }}>
                🎯 Lucidra Strategy Canvas vs Competitors
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {['Strategic Integration', 'Financial Intelligence', 'AI Capabilities', 'User Experience', 'Market Coverage', 'Innovation'].map((factor, index) => (
                  <div key={factor} style={{
                    background: COLORS.signalWhite,
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{factor}</h5>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '100px' }}>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ 
                          height: `${20 + index * 10}px`, 
                          background: '#ddd', 
                          marginBottom: '0.5rem',
                          borderRadius: '4px'
                        }}></div>
                        <div style={{ fontSize: '0.7rem', color: '#666' }}>Competitors</div>
                      </div>
                      <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ 
                          height: `${60 + index * 15}px`, 
                          background: COLORS.lucidTeal, 
                          marginBottom: '0.5rem',
                          borderRadius: '4px'
                        }}></div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: COLORS.lucidTeal }}>Lucidra</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeModuleView === 'benchmarking') {
      return (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>
                🏆 Competitive Benchmarking Analysis
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                Detailed analysis of key competitors and market positioning
              </p>
            </div>
          </div>

          {/* Competitor Selection */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {Object.entries(competitorData).map(([key, competitor]) => (
              <button
                key={key}
                style={{
                  background: selectedCompetitor === key ? COLORS.warningAmber : 'transparent',
                  color: selectedCompetitor === key ? COLORS.signalWhite : COLORS.warningAmber,
                  border: `2px solid ${COLORS.warningAmber}`,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedCompetitor(key)}
              >
                {competitor.name}
              </button>
            ))}
          </div>

          {/* Selected Competitor Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.insightIndigo}15)`
            }}>
              <h4 style={{ margin: '0 0 1rem 0', color: COLORS.chartGreen }}>
                ✅ Strengths
              </h4>
              {competitorData[selectedCompetitor].strengths.map((strength, index) => (
                <div key={index} style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: '0.9rem'
                }}>
                  • {strength}
                </div>
              ))}
            </div>

            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.pulseCoral}15, ${COLORS.warningAmber}15)`
            }}>
              <h4 style={{ margin: '0 0 1rem 0', color: COLORS.pulseCoral }}>
                ⚠️ Weaknesses
              </h4>
              {competitorData[selectedCompetitor].weaknesses.map((weakness, index) => (
                <div key={index} style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: '0.9rem'
                }}>
                  • {weakness}
                </div>
              ))}
            </div>

            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.lucidTeal}15)`
            }}>
              <h4 style={{ margin: '0 0 1rem 0', color: COLORS.insightIndigo }}>
                📊 Market Position
              </h4>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Category:</strong> {competitorData[selectedCompetitor].category}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Position:</strong> {competitorData[selectedCompetitor].marketPosition}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Target:</strong> {competitorData[selectedCompetitor].targetMarket}
              </div>
              <div>
                <strong>Pricing:</strong> {competitorData[selectedCompetitor].pricing}
              </div>
            </div>

            <div style={{
              ...cardStyle,
              background: `linear-gradient(135deg, ${COLORS.warningAmber}15, ${COLORS.chartGreen}15)`
            }}>
              <h4 style={{ margin: '0 0 1rem 0', color: COLORS.warningAmber }}>
                🔧 Key Features
              </h4>
              {competitorData[selectedCompetitor].keyFeatures.map((feature, index) => (
                <div key={index} style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: '0.9rem'
                }}>
                  • {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (activeModuleView === 'differentiation') {
      return (
        <div style={cardStyle}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>
              🎯 Lucidra Competitive Differentiation
            </h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              Unique value propositions that set Lucidra apart from all competitors
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {Object.entries(lucidraAdvantages).map(([key, advantage]) => (
              <div key={key} style={{
                ...cardStyle,
                background: `linear-gradient(135deg, ${COLORS.lucidTeal}15, ${COLORS.insightIndigo}15)`,
                border: `2px solid ${COLORS.lucidTeal}`,
                padding: '2rem'
              }}>
                <h4 style={{ 
                  margin: '0 0 1rem 0', 
                  color: COLORS.lucidTeal,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>
                  🌟 {key}
                </h4>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: COLORS.eclipseSlate 
                  }}>
                    What we do:
                  </div>
                  <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {advantage.description}
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: COLORS.pulseCoral 
                  }}>
                    Competitors:
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    {advantage.competitors}
                  </div>
                </div>
                
                <div style={{
                  background: COLORS.signalWhite,
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `1px solid ${COLORS.lucidTeal}30`
                }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: COLORS.chartGreen 
                  }}>
                    🚀 Our Edge:
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: COLORS.eclipseSlate }}>
                    {advantage.differentiator}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default view - Market Analysis
    return (
      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 2rem 0', color: COLORS.eclipseSlate }}>
          📈 Strategic Market Analysis
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.lucidTeal}15)`,
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>Total Addressable Market</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen }}>$47.8B</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Strategic Intelligence & Business Planning Software</div>
          </div>
          
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.pulseCoral}15)`,
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>Market Leadership</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.insightIndigo }}>Blue Ocean</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Uncontested market space in unified strategic intelligence</div>
          </div>
          
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.warningAmber}15, ${COLORS.chartGreen}15)`,
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>Growth Potential</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.warningAmber }}>340%</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Projected market growth over next 5 years</div>
          </div>
        </div>
      </div>
    );
  };

  // Reports and Analytics Component
  const ReportsAndAnalytics = ({ strategicObjectives, marketData, pestleData, showPrintView, setShowPrintView, selectedReport, setSelectedReport }) => {
    const [reportData, setReportData] = React.useState(null);
    const [exportFormat, setExportFormat] = React.useState('pdf');
    const [reportType, setReportType] = React.useState('strategic-summary');
    
    const reportTypes = {
      'strategic-summary': 'Strategic Summary Report',
      'objectives-progress': 'Objectives Progress Report',
      'market-analysis': 'Market Analysis Report',
      'pestle-analysis': 'PESTLE Analysis Report',
      'executive-dashboard': 'Executive Dashboard',
      'performance-metrics': 'Performance Metrics Report'
    };

    const generateReport = (type) => {
      const timestamp = new Date().toISOString().split('T')[0];
      const reportContent = {
        title: reportTypes[type],
        generatedDate: timestamp,
        data: type === 'strategic-summary' ? strategicObjectives : 
              type === 'market-analysis' ? marketData :
              type === 'pestle-analysis' ? pestleData : strategicObjectives
      };
      setReportData(reportContent);
      setSelectedReport(reportContent);
    };

    const exportReport = (format) => {
      if (!selectedReport) return;
      
      if (format === 'pdf') {
        // PDF Export
        const printWindow = window.open('', '_blank');
        const printContent = generatePrintHTML(selectedReport);
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
      } else if (format === 'csv') {
        // CSV Export
        const csvContent = generateCSV(selectedReport);
        downloadFile(csvContent, `${selectedReport.title}-${selectedReport.generatedDate}.csv`, 'text/csv');
      } else if (format === 'excel') {
        // Excel-like export (simplified)
        const excelContent = generateExcelData(selectedReport);
        downloadFile(excelContent, `${selectedReport.title}-${selectedReport.generatedDate}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      }
    };

    const generatePrintHTML = (report) => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${report.title}</title>
          <style>
            @media print {
              @page { margin: 1in; size: A4; }
              body { font-family: 'Times New Roman', serif; color: #000; }
              .no-print { display: none; }
            }
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 20px; }
            .header { border-bottom: 2px solid #1FE0C4; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #1FE0C4; }
            .report-title { font-size: 20px; margin: 10px 0; }
            .report-date { color: #666; font-size: 14px; }
            .content { margin: 20px 0; }
            .objective { margin: 15px 0; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; }
            .progress-bar { width: 100%; height: 10px; background: #e2e8f0; border-radius: 5px; margin: 10px 0; }
            .progress-fill { height: 100%; background: #10B981; border-radius: 5px; }
            .priority { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
            .priority-high { background: #F59E0B; color: white; }
            .priority-critical { background: #FF6B6B; color: white; }
            .priority-medium { background: #10B981; color: white; }
            .chart-container { margin: 20px 0; text-align: center; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">LUCIDRA</div>
            <div class="report-title">${report.title}</div>
            <div class="report-date">Generated: ${report.generatedDate}</div>
          </div>
          <div class="content">
            ${generateReportContent(report)}
          </div>
          <div class="footer">
            <p>This report was generated by Lucidra Strategic Intelligence Platform</p>
            <p>© 2024 Lucidra. All rights reserved.</p>
          </div>
        </body>
        </html>
      `;
    };

    const generateReportContent = (report) => {
      if (Array.isArray(report.data)) {
        return report.data.map(obj => `
          <div class="objective">
            <h3>${obj.title}</h3>
            <p><strong>Owner:</strong> ${obj.owner} | <strong>Due:</strong> ${obj.dueDate}</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${obj.progress}%"></div>
            </div>
            <p><strong>Progress:</strong> ${obj.progress}%</p>
            <span class="priority priority-${obj.priority.toLowerCase()}">${obj.priority}</span>
          </div>
        `).join('');
      }
      return '<p>Report data not available</p>';
    };

    const generateCSV = (report) => {
      if (!Array.isArray(report.data)) return '';
      
      const headers = ['Title', 'Owner', 'Due Date', 'Progress (%)', 'Priority'];
      const rows = report.data.map(obj => [
        obj.title,
        obj.owner,
        obj.dueDate,
        obj.progress,
        obj.priority
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    };

    const generateExcelData = (report) => {
      return generateCSV(report); // Simplified for demo
    };

    const downloadFile = (content, filename, mimeType) => {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>
              📊 Reports & Analytics Center
            </h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              Generate comprehensive reports, export data, and create print-ready documents
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              style={{
                ...buttonPrimaryStyle,
                background: COLORS.insightIndigo,
                color: COLORS.signalWhite,
                fontSize: '0.9rem'
              }}
              onClick={() => setShowPrintView(!showPrintView)}
            >
              {showPrintView ? '📊 Dashboard View' : '🖨️ Print Preview'}
            </button>
          </div>
        </div>

        {/* Report Generation Panel */}
        <div style={{
          ...cardStyle,
          background: `linear-gradient(135deg, ${COLORS.pulseCoral}10, ${COLORS.warningAmber}10)`,
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: COLORS.eclipseSlate }}>Generate New Report</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Report Type</label>
              <select 
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.9rem'
                }}
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                {Object.entries(reportTypes).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Export Format</label>
              <select 
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.9rem'
                }}
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <option value="pdf">📄 PDF Report</option>
                <option value="csv">📊 CSV Data</option>
                <option value="excel">📈 Excel Format</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              style={{
                ...buttonPrimaryStyle,
                background: COLORS.chartGreen,
                color: COLORS.signalWhite
              }}
              onClick={() => generateReport(reportType)}
            >
              📋 Generate Report
            </button>
            
            {selectedReport && (
              <button 
                style={{
                  ...buttonPrimaryStyle,
                  background: COLORS.pulseCoral,
                  color: COLORS.signalWhite
                }}
                onClick={() => exportReport(exportFormat)}
              >
                {exportFormat === 'pdf' ? '📄 Export PDF' : 
                 exportFormat === 'csv' ? '📊 Download CSV' : 
                 '📈 Export Excel'}
              </button>
            )}
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.insightIndigo}15, ${COLORS.lucidTeal}15)`,
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>Strategic Objectives</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.insightIndigo }}>
              {strategicObjectives.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Active objectives being tracked</div>
          </div>
          
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.chartGreen}15, ${COLORS.insightIndigo}15)`,
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📈</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>Average Progress</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.chartGreen }}>
              {Math.round(strategicObjectives.reduce((sum, obj) => sum + obj.progress, 0) / strategicObjectives.length)}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Across all objectives</div>
          </div>
          
          <div style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${COLORS.warningAmber}15, ${COLORS.pulseCoral}15)`,
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.eclipseSlate }}>High Priority</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: COLORS.warningAmber }}>
              {strategicObjectives.filter(obj => obj.priority === 'High' || obj.priority === 'Critical').length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Objectives requiring attention</div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div style={cardStyle}>
          <h4 style={{ margin: '0 0 1rem 0', color: COLORS.eclipseSlate }}>📊 Progress Visualization</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {strategicObjectives.map(obj => (
              <div key={obj.id} style={{
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                background: COLORS.signalWhite
              }}>
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{obj.title}</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>Progress</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{obj.progress}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#e2e8f0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${obj.progress}%`,
                    height: '100%',
                    background: obj.progress > 75 ? COLORS.chartGreen : obj.progress > 50 ? COLORS.warningAmber : COLORS.pulseCoral,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#666' }}>
                  {obj.owner} • {obj.dueDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div style={cardStyle}>
          <h4 style={{ margin: '0 0 1rem 0', color: COLORS.eclipseSlate }}>📋 Recent Reports</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {['Strategic Summary - 2024-01-15', 'Market Analysis - 2024-01-10', 'Performance Review - 2024-01-05'].map((report, index) => (
              <div key={index} style={{
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                background: COLORS.signalWhite,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>{report}</h5>
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>PDF • 2.4 MB</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      color: COLORS.insightIndigo
                    }}>
                      👁️
                    </button>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      color: COLORS.chartGreen
                    }}>
                      📄
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Trial Activation Modal
  const TrialModal = () => {
    if (!showTrialModal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
      }}>
        <div style={{
          background: COLORS.signalWhite,
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ margin: '0 0 1rem 0', color: COLORS.eclipseSlate }}>
              🚀 Start Your Lucidra Trial
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Experience the power of unified strategic intelligence. Get instant access to all premium features.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  Work Email *
                </label>
                <input
                  type="email"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                  value={userProfile.company}
                  onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  Your Role *
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                  value={userProfile.role}
                  onChange={(e) => setUserProfile({...userProfile, role: e.target.value})}
                >
                  <option value="">Select Role</option>
                  <option value="ceo">CEO/Executive</option>
                  <option value="strategy">Strategy Director</option>
                  <option value="operations">COO/Operations</option>
                  <option value="hr">HR Director</option>
                  <option value="marketing">Marketing Director</option>
                  <option value="finance">CFO/Finance</option>
                  <option value="consultant">Consultant</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  Team Size
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                  value={userProfile.teamSize}
                  onChange={(e) => setUserProfile({...userProfile, teamSize: e.target.value})}
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  Industry
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                  value={userProfile.industry}
                  onChange={(e) => setUserProfile({...userProfile, industry: e.target.value})}
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Financial Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail/E-commerce</option>
                  <option value="consulting">Consulting</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${COLORS.lucidTeal}15, ${COLORS.insightIndigo}15)`,
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: COLORS.insightIndigo }}>
              🎁 Your 14-Day Trial Includes:
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>✅ Full Strategic Planning Suite</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>✅ Claude AI Analysis</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>✅ Team Collaboration Tools</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>✅ Advanced Reporting</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>✅ PESTLE & SWOT Frameworks</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>✅ Blue Ocean Strategy Tools</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              style={{
                flex: 1,
                background: 'transparent',
                border: `2px solid ${COLORS.eclipseSlate}`,
                color: COLORS.eclipseSlate,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
              onClick={() => setShowTrialModal(false)}
            >
              Maybe Later
            </button>
            <button
              style={{
                flex: 2,
                background: `linear-gradient(135deg, ${COLORS.lucidTeal}, ${COLORS.insightIndigo})`,
                border: 'none',
                color: COLORS.signalWhite,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
              onClick={() => {
                setIsTrialActive(true);
                setShowTrialModal(false);
                setCurrentView('platform');
              }}
            >
              🚀 Start Free Trial
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>
              No credit card required • Cancel anytime • Full access for 14 days
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <TrialModal />
      
      {/* Navigation Header */}
      <div style={headerStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '100%',
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${COLORS.lucidTeal}, ${COLORS.insightIndigo})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentView('home')}
            >
              Lucidra
            </h1>
            <div style={{ 
              marginLeft: '0.75rem', 
              padding: '0.2rem 0.6rem', 
              background: COLORS.lucidTeal, 
              color: COLORS.eclipseSlate,
              borderRadius: '16px',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap' as const
            }}>
              Strategic Intelligence
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            alignItems: 'center',
            flexWrap: 'wrap' as const,
            justifyContent: 'flex-end'
          }}>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'home' ? COLORS.insightIndigo : '#666',
                fontWeight: currentView === 'home' ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap' as const
              }}
              onClick={() => setCurrentView('home')}
            >
              Home
            </button>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'platform' ? COLORS.insightIndigo : '#666',
                fontWeight: currentView === 'platform' ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap' as const
              }}
              onClick={() => setCurrentView('platform')}
            >
              Platform
            </button>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'differentiators' ? COLORS.insightIndigo : '#666',
                fontWeight: currentView === 'differentiators' ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap' as const
              }}
              onClick={() => setCurrentView('differentiators')}
            >
              Why Lucidra
            </button>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'case-studies' ? COLORS.insightIndigo : '#666',
                fontWeight: currentView === 'case-studies' ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap' as const
              }}
              onClick={() => setCurrentView('case-studies')}
            >
              Case Studies
            </button>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'regional-maps' ? COLORS.insightIndigo : '#666',
                fontWeight: currentView === 'regional-maps' ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap' as const
              }}
              onClick={() => setCurrentView('regional-maps')}
            >
              Regional Maps
            </button>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: currentView === 'pricing' ? COLORS.insightIndigo : '#666',
                fontWeight: currentView === 'pricing' ? 'bold' : 'normal',
                cursor: 'pointer',
                fontSize: '0.85rem',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap' as const
              }}
              onClick={() => setCurrentView('pricing')}
            >
              Pricing
            </button>
            <button style={{
              background: isTrialActive ? COLORS.chartGreen : COLORS.insightIndigo,
              color: COLORS.signalWhite,
              border: 'none',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap' as const,
              flexShrink: 0
            }}
            onClick={() => isTrialActive ? null : setShowTrialModal(true)}>
              {isTrialActive ? '✅ Trial Active' : 'Start Trial'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {currentView === 'home' && <HomePage />}
      {currentView === 'platform' && <PlatformView />}
      {currentView === 'differentiators' && <DifferentiatorsView />}
      {currentView === 'case-studies' && <CaseStudiesView />}
      {currentView === 'regional-maps' && <RegionalMapsView />}
      {currentView === 'pricing' && <PricingView />}

      {/* Add CSS animations and print styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        /* Print Styles */
        @media print {
          @page { 
            margin: 1in; 
            size: A4; 
          }
          
          body { 
            font-family: 'Times New Roman', serif !important; 
            font-size: 12pt !important;
            color: #000 !important;
            background: white !important;
          }
          
          .no-print { 
            display: none !important; 
          }
          
          .print-only { 
            display: block !important; 
          }
          
          .print-header {
            border-bottom: 2px solid #1FE0C4 !important;
            padding-bottom: 20px !important;
            margin-bottom: 30px !important;
          }
          
          .print-logo {
            font-size: 24pt !important;
            font-weight: bold !important;
            color: #1FE0C4 !important;
          }
          
          .print-title {
            font-size: 18pt !important;
            margin: 10px 0 !important;
            color: #000 !important;
          }
          
          .print-content {
            margin: 20px 0 !important;
            line-height: 1.6 !important;
          }
          
          .print-objective {
            margin: 15px 0 !important;
            padding: 15px !important;
            border: 1px solid #ccc !important;
            border-radius: 8px !important;
            page-break-inside: avoid !important;
          }
          
          .print-progress-bar {
            width: 100% !important;
            height: 10px !important;
            background: #e2e8f0 !important;
            border-radius: 5px !important;
            margin: 10px 0 !important;
          }
          
          .print-progress-fill {
            height: 100% !important;
            background: #10B981 !important;
            border-radius: 5px !important;
          }
          
          .print-footer {
            margin-top: 40px !important;
            border-top: 1px solid #ccc !important;
            padding-top: 20px !important;
            font-size: 10pt !important;
            color: #666 !important;
          }
          
          .print-chart {
            width: 100% !important;
            height: 300px !important;
            border: 1px solid #ccc !important;
            margin: 20px 0 !important;
          }
          
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 20px 0 !important;
          }
          
          .print-table th, .print-table td {
            border: 1px solid #ccc !important;
            padding: 8px !important;
            text-align: left !important;
          }
          
          .print-table th {
            background: #f5f5f5 !important;
            font-weight: bold !important;
          }
          
          .print-page-break {
            page-break-before: always !important;
          }
          
          .print-signature {
            margin-top: 50px !important;
            border-top: 1px solid #ccc !important;
            padding-top: 20px !important;
          }
          
          .print-signature-line {
            width: 300px !important;
            border-bottom: 1px solid #000 !important;
            margin: 20px 0 5px 0 !important;
          }
        }
        
        /* Report Export Styles */
        .report-export-container {
          background: white;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .report-section {
          margin: 20px 0;
          padding: 15px;
          border-left: 4px solid #1FE0C4;
        }
        
        .report-metric {
          display: inline-block;
          margin: 10px 20px 10px 0;
          padding: 10px 15px;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: center;
        }
        
        .report-metric-value {
          font-size: 24px;
          font-weight: bold;
          color: #1FE0C4;
        }
        
        .report-metric-label {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }
        
        .report-chart-placeholder {
          width: 100%;
          height: 200px;
          background: #f8f9fa;
          border: 2px dashed #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 14px;
          margin: 20px 0;
        }
      `}</style>

      {/* Trial Activation Modal */}
      {showTrialModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: COLORS.signalWhite,
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: COLORS.eclipseSlate }}>🚀 Start Your Lucidra Trial</h2>
              <button
                onClick={() => setShowTrialModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
                Get full access to Lucidra's Strategic Intelligence Platform for 14 days - completely free!
              </p>
              
              <div style={{
                padding: '1rem',
                background: `linear-gradient(135deg, ${COLORS.lucidTeal}15, ${COLORS.insightIndigo}15)`,
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.insightIndigo }}>
                  ✨ What's Included in Your Trial:
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  • Complete Strategic Planning Process (PESTLE, SWOT, VRIN)<br/>
                  • Team Collaboration & Input Tools<br/>
                  • Competitive Intelligence & Blue Ocean Analysis<br/>
                  • Real-time Data Monitoring<br/>
                  • Export & Reporting Capabilities<br/>
                  • Priority Support
                </div>
              </div>

              {/* User Profile Form */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  style={{
                    padding: '0.75rem',
                    border: `1px solid ${COLORS.lucidTeal}`,
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  style={{
                    padding: '0.75rem',
                    border: `1px solid ${COLORS.lucidTeal}`,
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={userProfile.company}
                  onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                  style={{
                    padding: '0.75rem',
                    border: `1px solid ${COLORS.lucidTeal}`,
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
                <select
                  value={userProfile.role}
                  onChange={(e) => setUserProfile({...userProfile, role: e.target.value})}
                  style={{
                    padding: '0.75rem',
                    border: `1px solid ${COLORS.lucidTeal}`,
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Select Your Role</option>
                  <option value="CEO/Founder">CEO/Founder</option>
                  <option value="Strategy Manager">Strategy Manager</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Business Analyst">Business Analyst</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <select
                  value={userProfile.teamSize}
                  onChange={(e) => setUserProfile({...userProfile, teamSize: e.target.value})}
                  style={{
                    padding: '0.75rem',
                    border: `1px solid ${COLORS.lucidTeal}`,
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Team Size</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-25">6-25 people</option>
                  <option value="26-100">26-100 people</option>
                  <option value="100+">100+ people</option>
                </select>
                <select
                  value={userProfile.industry}
                  onChange={(e) => setUserProfile({...userProfile, industry: e.target.value})}
                  style={{
                    padding: '0.75rem',
                    border: `1px solid ${COLORS.lucidTeal}`,
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setShowTrialModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: `2px solid ${COLORS.lucidTeal}`,
                    borderRadius: '6px',
                    background: 'transparent',
                    color: COLORS.lucidTeal,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setIsTrialActive(true);
                    setShowTrialModal(false);
                    // Here you would typically send the user profile data to your backend
                    console.log('Trial activated for:', userProfile);
                  }}
                  disabled={!userProfile.name || !userProfile.email}
                  style={{
                    flex: 2,
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '6px',
                    background: (!userProfile.name || !userProfile.email) ? '#ccc' : 
                               `linear-gradient(135deg, ${COLORS.lucidTeal}, ${COLORS.insightIndigo})`,
                    color: COLORS.signalWhite,
                    fontSize: '0.9rem',
                    cursor: (!userProfile.name || !userProfile.email) ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  🚀 Start 14-Day Free Trial
                </button>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem', textAlign: 'center' }}>
                No credit card required • Cancel anytime • Full access to all features
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;