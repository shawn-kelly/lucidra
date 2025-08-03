"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesService = exports.SANDBOX_TEMPLATES = void 0;
exports.SANDBOX_TEMPLATES = [
    {
        id: 'code_review_cycle',
        name: 'Code Review Orchestration',
        description: 'Multi-agent approach to comprehensive code review covering security, performance, and maintainability',
        category: 'code_review',
        difficulty: 'intermediate',
        estimatedTime: '45 minutes',
        xpReward: 150,
        learningObjectives: [
            'Learn to decompose code review into specialized areas',
            'Understand how different AIs excel at different review aspects',
            'Master the art of synthesizing technical feedback'
        ],
        recommendedAdvisors: ['claude', 'copilot', 'deepseek'],
        prebuiltSubtasks: [
            {
                title: 'Security Analysis',
                description: 'Review code for potential security vulnerabilities and best practices',
                assignedAdvisor: 'claude',
                promptTemplate: 'Analyze this code for security vulnerabilities: [CODE]. Focus on: authentication, input validation, data sanitization, and common security patterns.',
                constraints: ['Focus on OWASP Top 10', 'Consider data privacy implications'],
                expectedFormat: 'Structured list with severity levels and remediation steps',
                status: 'pending'
            },
            {
                title: 'Performance Optimization',
                description: 'Identify performance bottlenecks and optimization opportunities',
                assignedAdvisor: 'deepseek',
                promptTemplate: 'Analyze this code for performance issues: [CODE]. Look for: algorithmic complexity, memory usage, database queries, and optimization opportunities.',
                constraints: ['Consider scalability', 'Focus on measurable improvements'],
                expectedFormat: 'Performance analysis with specific metrics and recommendations',
                status: 'pending'
            },
            {
                title: 'Code Quality & Maintainability',
                description: 'Assess code structure, readability, and maintainability',
                assignedAdvisor: 'copilot',
                promptTemplate: 'Review this code for quality and maintainability: [CODE]. Evaluate: code structure, naming conventions, documentation, and adherence to best practices.',
                constraints: ['Follow language-specific conventions', 'Consider team collaboration'],
                expectedFormat: 'Structured feedback with specific improvement suggestions',
                status: 'pending'
            },
            {
                title: 'Synthesis & Action Plan',
                description: 'Combine all feedback into a coherent action plan',
                assignedAdvisor: 'claude',
                promptTemplate: 'Based on these review findings: [SECURITY_ANALYSIS], [PERFORMANCE_ANALYSIS], [QUALITY_ANALYSIS], create a prioritized action plan.',
                constraints: ['Prioritize by impact and effort', 'Consider team capacity'],
                expectedFormat: 'Prioritized action plan with timeline and resource requirements',
                status: 'pending'
            }
        ]
    },
    {
        id: 'ux_copy_refinement',
        name: 'UX Copy Refinement Pipeline',
        description: 'Multi-perspective approach to perfecting user interface copy through strategic AI collaboration',
        category: 'ux_copy',
        difficulty: 'beginner',
        estimatedTime: '30 minutes',
        xpReward: 100,
        learningObjectives: [
            'Understand different aspects of UX copy evaluation',
            'Learn to iterate on copy using multiple AI perspectives',
            'Master the balance between clarity and brand voice'
        ],
        recommendedAdvisors: ['claude', 'gemini', 'gpt4'],
        prebuiltSubtasks: [
            {
                title: 'User Psychology Analysis',
                description: 'Analyze copy from user psychology and behavioral perspective',
                assignedAdvisor: 'claude',
                promptTemplate: 'Analyze this UX copy from a user psychology perspective: [COPY]. Consider: cognitive load, emotional response, user motivations, and decision-making triggers.',
                constraints: ['Focus on user journey context', 'Consider accessibility'],
                expectedFormat: 'Psychological analysis with specific user impact predictions',
                status: 'pending'
            },
            {
                title: 'Brand Voice Alignment',
                description: 'Ensure copy aligns with brand personality and voice guidelines',
                assignedAdvisor: 'gpt4',
                promptTemplate: 'Evaluate this copy for brand voice consistency: [COPY]. Brand guidelines: [BRAND_VOICE]. Assess tone, personality, and message alignment.',
                constraints: ['Maintain brand authenticity', 'Consider audience expectations'],
                expectedFormat: 'Brand alignment assessment with specific recommendations',
                status: 'pending'
            },
            {
                title: 'Clarity & Conversion Optimization',
                description: 'Optimize copy for maximum clarity and conversion potential',
                assignedAdvisor: 'gemini',
                promptTemplate: 'Optimize this copy for clarity and conversion: [COPY]. Focus on: readability, action-oriented language, and conversion psychology.',
                constraints: ['Maintain brevity', 'Ensure mobile-friendly language'],
                expectedFormat: 'Optimized copy variations with A/B testing suggestions',
                status: 'pending'
            },
            {
                title: 'Final Copy Synthesis',
                description: 'Synthesize all feedback into final, polished copy',
                assignedAdvisor: 'claude',
                promptTemplate: 'Based on these analyses: [PSYCHOLOGY_ANALYSIS], [BRAND_ANALYSIS], [CONVERSION_ANALYSIS], create final optimized copy.',
                constraints: ['Balance all requirements', 'Provide multiple options'],
                expectedFormat: 'Final copy options with rationale for each choice',
                status: 'pending'
            }
        ]
    },
    {
        id: 'architecture_planning',
        name: 'System Architecture Planning',
        description: 'Comprehensive system design through multi-agent architectural analysis',
        category: 'architecture',
        difficulty: 'advanced',
        estimatedTime: '90 minutes',
        xpReward: 250,
        learningObjectives: [
            'Learn systematic approach to architecture design',
            'Understand how to leverage different AI strengths for architecture',
            'Master the art of balancing technical requirements with business needs'
        ],
        recommendedAdvisors: ['deepseek', 'claude', 'copilot'],
        prebuiltSubtasks: [
            {
                title: 'Requirements Analysis',
                description: 'Analyze and structure system requirements',
                assignedAdvisor: 'claude',
                promptTemplate: 'Analyze these system requirements: [REQUIREMENTS]. Structure them into: functional requirements, non-functional requirements, constraints, and assumptions.',
                constraints: ['Consider scalability needs', 'Identify potential conflicts'],
                expectedFormat: 'Structured requirements document with priority levels',
                status: 'pending'
            },
            {
                title: 'High-Level Architecture Design',
                description: 'Design overall system architecture and component interaction',
                assignedAdvisor: 'deepseek',
                promptTemplate: 'Design a high-level architecture for: [STRUCTURED_REQUIREMENTS]. Include: system components, data flow, integration points, and technology stack recommendations.',
                constraints: ['Consider maintainability', 'Plan for future growth'],
                expectedFormat: 'Architecture diagram with component descriptions',
                status: 'pending'
            },
            {
                title: 'Implementation Strategy',
                description: 'Plan implementation approach and development phases',
                assignedAdvisor: 'copilot',
                promptTemplate: 'Based on this architecture: [ARCHITECTURE_DESIGN], create an implementation strategy including: development phases, technology choices, and team structure.',
                constraints: ['Consider available resources', 'Plan for risk mitigation'],
                expectedFormat: 'Implementation roadmap with timelines and dependencies',
                status: 'pending'
            },
            {
                title: 'Architecture Review & Validation',
                description: 'Review and validate the complete architecture plan',
                assignedAdvisor: 'claude',
                promptTemplate: 'Review this complete architecture plan: [REQUIREMENTS] + [ARCHITECTURE] + [IMPLEMENTATION]. Validate against: scalability, maintainability, security, and business goals.',
                constraints: ['Identify potential risks', 'Suggest improvements'],
                expectedFormat: 'Architecture validation report with recommendations',
                status: 'pending'
            }
        ]
    },
    {
        id: 'brand_strategy_formation',
        name: 'Brand Strategy Formation',
        description: 'Multi-perspective brand strategy development through AI collaboration',
        category: 'brand_strategy',
        difficulty: 'intermediate',
        estimatedTime: '60 minutes',
        xpReward: 180,
        learningObjectives: [
            'Understand multi-faceted nature of brand strategy',
            'Learn to synthesize market research with creative vision',
            'Master the integration of strategic thinking with creative execution'
        ],
        recommendedAdvisors: ['claude', 'gemini', 'gpt4'],
        prebuiltSubtasks: [
            {
                title: 'Market Position Analysis',
                description: 'Analyze market landscape and competitive positioning',
                assignedAdvisor: 'claude',
                promptTemplate: 'Analyze the market position for: [BRAND_BRIEF]. Include: competitive landscape, market gaps, target audience analysis, and positioning opportunities.',
                constraints: ['Focus on differentiation', 'Consider market trends'],
                expectedFormat: 'Market analysis with positioning recommendations',
                status: 'pending'
            },
            {
                title: 'Brand Identity Development',
                description: 'Develop brand personality, values, and visual identity concepts',
                assignedAdvisor: 'gemini',
                promptTemplate: 'Develop brand identity for: [BRAND_BRIEF] based on market analysis: [MARKET_ANALYSIS]. Include: brand personality, core values, visual identity concepts, and brand voice.',
                constraints: ['Ensure authenticity', 'Consider cultural sensitivity'],
                expectedFormat: 'Comprehensive brand identity guide',
                status: 'pending'
            },
            {
                title: 'Brand Message Strategy',
                description: 'Create strategic messaging framework and communication strategy',
                assignedAdvisor: 'gpt4',
                promptTemplate: 'Create messaging strategy for: [BRAND_IDENTITY]. Develop: core message, value propositions, key messages for different audiences, and communication guidelines.',
                constraints: ['Maintain consistency', 'Consider different channels'],
                expectedFormat: 'Messaging framework with audience-specific adaptations',
                status: 'pending'
            },
            {
                title: 'Brand Strategy Integration',
                description: 'Integrate all elements into cohesive brand strategy',
                assignedAdvisor: 'claude',
                promptTemplate: 'Integrate these brand elements: [MARKET_ANALYSIS] + [BRAND_IDENTITY] + [MESSAGING_STRATEGY] into a cohesive brand strategy with implementation roadmap.',
                constraints: ['Ensure strategic alignment', 'Plan for measurement'],
                expectedFormat: 'Complete brand strategy with implementation plan',
                status: 'pending'
            }
        ]
    }
];
class TemplatesService {
    static getAllTemplates() {
        return exports.SANDBOX_TEMPLATES;
    }
    static getTemplateById(id) {
        return exports.SANDBOX_TEMPLATES.find(t => t.id === id) || null;
    }
    static getTemplatesByCategory(category) {
        return exports.SANDBOX_TEMPLATES.filter(t => t.category === category);
    }
    static getTemplatesByDifficulty(difficulty) {
        return exports.SANDBOX_TEMPLATES.filter(t => t.difficulty === difficulty);
    }
}
exports.TemplatesService = TemplatesService;
//# sourceMappingURL=templates.service.js.map