// ============================================
// 🎥 LUCIDRA COMPREHENSIVE VIDEO CONTENT LIBRARY
// ============================================

const LucidraVideoLibrary = {
    // Detailed video scripts and content
    videoScripts: {
        'ceo-overview': {
            title: 'CEO Platform Overview',
            duration: '8:30',
            targetAudience: 'CEOs and Senior Executives',
            learningObjectives: [
                'Navigate the executive command center',
                'Understand strategic framework integration',
                'Master real-time business intelligence',
                'Configure executive dashboards',
                'Leverage market intelligence for decisions'
            ],
            script: {
                intro: {
                    duration: '0:00-0:45',
                    narration: `Welcome to Lucidra, the strategic intelligence platform designed specifically for executive leadership. I'm here to guide you through the most powerful features that will transform how you make strategic decisions and lead your organization.`,
                    visuals: 'Lucidra logo animation, executive dashboard preview',
                    callToAction: 'Let\'s explore your strategic command center'
                },
                section1: {
                    duration: '0:45-2:30',
                    title: 'Executive Dashboard Navigation',
                    narration: `Your executive dashboard is the nerve center of your strategic operations. Here you can see real-time KPIs, market intelligence feeds, and strategic framework outputs all in one unified view. Notice how the dashboard adapts to your role, showing only the most critical information for C-level decision making.`,
                    visuals: 'Live dashboard demonstration, KPI widgets, real-time data updates',
                    interactiveElements: ['Click to explore dashboard sections', 'Hover over KPIs for details'],
                    keyTakeaways: ['Unified strategic view', 'Real-time intelligence', 'Role-based customization']
                },
                section2: {
                    duration: '2:30-4:15',
                    title: 'Strategic Framework Integration',
                    narration: `Lucidra integrates six powerful strategic frameworks directly into your workflow. From Blue Ocean Strategy to Porter's Five Forces, each framework provides actionable insights. Watch as I demonstrate how to run a competitive analysis that feeds directly into your strategic planning process.`,
                    visuals: 'Framework selection interface, Blue Ocean canvas demo, Porter\'s analysis',
                    interactiveElements: ['Try the framework selector', 'Input your industry data'],
                    keyTakeaways: ['Six integrated frameworks', 'Actionable insights', 'Direct workflow integration']
                },
                section3: {
                    duration: '4:15-6:00',
                    title: 'Market Intelligence & Data Pulse',
                    narration: `Your competitive advantage depends on superior intelligence. The Data Pulse system monitors market signals, competitor activities, and industry trends in real-time. I'll show you how to set up intelligent alerts and customize your market intelligence feeds for maximum strategic value.`,
                    visuals: 'Data Pulse interface, market signals, competitive intelligence feeds',
                    interactiveElements: ['Configure alert preferences', 'Set market watchlists'],
                    keyTakeaways: ['Real-time market monitoring', 'Competitive intelligence', 'Strategic alerts']
                },
                section4: {
                    duration: '6:00-7:45',
                    title: 'Financial Analysis & Performance Tracking',
                    narration: `Executive decisions require deep financial insight. Lucidra's financial analysis tools provide DuPont analysis, activity-based costing, and investment evaluation capabilities. See how these integrate with your strategic frameworks to provide a complete picture of organizational performance.`,
                    visuals: 'Financial analysis interface, DuPont breakdown, ROI calculations',
                    interactiveElements: ['Upload financial data', 'Generate analysis reports'],
                    keyTakeaways: ['Integrated financial analysis', 'Strategic-financial alignment', 'Performance tracking']
                },
                conclusion: {
                    duration: '7:45-8:30',
                    narration: `You now have the foundation to leverage Lucidra's full strategic intelligence capabilities. Remember, this platform grows with your needs - explore the advanced features as your strategic requirements evolve. Your next step: complete the strategic frameworks masterclass to deepen your analytical capabilities.`,
                    visuals: 'Platform overview, next steps preview',
                    callToAction: 'Start Strategic Frameworks Masterclass',
                    nextVideo: 'strategic-frameworks'
                }
            }
        },

        'strategic-frameworks': {
            title: 'Strategic Frameworks Masterclass',
            duration: '12:45',
            targetAudience: 'Strategic Leaders and Business Analysts',
            learningObjectives: [
                'Master Blue Ocean Strategy methodology',
                'Conduct comprehensive Porter\'s Five Forces analysis',
                'Apply Good Strategy/Bad Strategy principles',
                'Implement Resource-Based View analysis',
                'Integrate frameworks for strategic advantage'
            ],
            script: {
                intro: {
                    duration: '0:00-1:00',
                    narration: `Strategic frameworks are the foundation of exceptional leadership. In this masterclass, we'll dive deep into six proven frameworks that have guided the world's most successful organizations. By the end, you'll know exactly how to apply each framework to your specific strategic challenges.`,
                    visuals: 'Strategic framework overview, success stories montage'
                },
                blueOcean: {
                    duration: '1:00-3:30',
                    title: 'Blue Ocean Strategy Deep Dive',
                    narration: `Blue Ocean Strategy helps you break free from competitive red oceans by creating uncontested market space. I'll walk you through the strategy canvas, four actions framework, and buyer utility map using a real business example. You'll see exactly how companies like Nintendo and Cirque du Soleil revolutionized their industries.`,
                    visuals: 'Strategy canvas interactive demo, four actions framework, case studies',
                    practicalExercise: 'Complete your own strategy canvas',
                    keyInsights: ['Value innovation principles', 'Four actions framework application', 'Blue ocean creation process']
                },
                portersFiveForces: {
                    duration: '3:30-6:00',
                    title: 'Porter\'s Five Forces Mastery',
                    narration: `Michael Porter's Five Forces framework reveals the true drivers of industry profitability. We'll analyze each force - competitive rivalry, supplier power, buyer power, threat of substitutes, and barriers to entry - using live market data. Watch as we build a complete competitive intelligence profile.`,
                    visuals: 'Five forces interactive analysis, industry data integration, competitive mapping',
                    practicalExercise: 'Analyze your industry using live data',
                    keyInsights: ['Industry structure analysis', 'Profitability drivers', 'Competitive positioning']
                },
                goodStrategy: {
                    duration: '6:00-8:15',
                    title: 'Good Strategy vs Bad Strategy',
                    narration: `Richard Rumelt's insights help distinguish truly effective strategy from fluffy mission statements. We'll examine the strategy kernel - diagnosis, guiding policy, and coherent actions - and learn to identify bad strategy patterns. This framework will sharpen your strategic thinking immediately.`,
                    visuals: 'Strategy kernel breakdown, good vs bad strategy examples',
                    practicalExercise: 'Evaluate your current strategy using the kernel',
                    keyInsights: ['Strategy kernel components', 'Bad strategy identification', 'Strategic coherence']
                },
                resourceBasedView: {
                    duration: '8:15-10:30',
                    title: 'Resource-Based View & VRIO Analysis',
                    narration: `Your competitive advantage lies in your unique resources and capabilities. The VRIO framework - Value, Rarity, Imitability, Organization - helps identify and leverage these advantages. We'll conduct a complete organizational capability audit and strategic fit analysis.`,
                    visuals: 'VRIO analysis interface, capability mapping, strategic fit assessment',
                    practicalExercise: 'Complete your VRIO analysis',
                    keyInsights: ['Resource identification', 'Capability assessment', 'Sustainable advantage creation']
                },
                integration: {
                    duration: '10:30-12:15',
                    title: 'Framework Integration & Strategic Synthesis',
                    narration: `The real power comes from integrating multiple frameworks into a comprehensive strategic view. I'll demonstrate how Blue Ocean insights inform Porter's analysis, how RBV capabilities support Good Strategy principles, and how to create a unified strategic intelligence system.`,
                    visuals: 'Framework integration dashboard, strategic synthesis examples',
                    practicalExercise: 'Create your integrated strategic assessment',
                    keyInsights: ['Framework complementarity', 'Strategic synthesis', 'Unified intelligence']
                },
                conclusion: {
                    duration: '12:15-12:45',
                    narration: `You now possess the strategic framework mastery that separates exceptional leaders from the rest. These tools will guide your decision-making and provide clarity in complex situations. Next, dive into the Executive Dashboard Navigation to optimize your strategic command center.`,
                    callToAction: 'Apply frameworks to your business',
                    nextVideo: 'executive-dashboards'
                }
            }
        },

        'process-management': {
            title: 'Process Management Excellence',
            duration: '10:15',
            targetAudience: 'Operations Managers and Process Analysts',
            learningObjectives: [
                'Master BPMN 2.0 process modeling',
                'Design interactive process workflows',
                'Implement process optimization strategies',
                'Create swimlane process maps',
                'Build process performance dashboards'
            ],
            script: {
                intro: {
                    duration: '0:00-0:45',
                    narration: `Process excellence drives operational superiority. Lucidra's process management system combines BPMN 2.0 modeling with real-time performance analytics. I'll show you how to model, optimize, and monitor processes that deliver exceptional results.`,
                    visuals: 'Process management interface preview, BPMN examples'
                },
                bpmnBasics: {
                    duration: '0:45-3:00',
                    title: 'BPMN 2.0 Interactive Modeling',
                    narration: `Business Process Model and Notation (BPMN) is the global standard for process modeling. Watch as I create a complete process model using start events, tasks, gateways, and end events. You'll see how to add sequence flows, design decision points, and implement parallel processing.`,
                    visuals: 'BPMN modeling interface, drag-and-drop demonstration, process elements',
                    practicalDemo: 'Build a customer onboarding process',
                    keyTechniques: ['Event modeling', 'Gateway logic', 'Swimlane organization']
                },
                swimlanes: {
                    duration: '3:00-5:30',
                    title: 'Advanced Swimlane Design',
                    narration: `Swimlanes organize processes by responsibility and role. I'll demonstrate how to create expandable swimlanes, assign activities to specific departments, and model cross-functional workflows. This is essential for large organization process mapping.`,
                    visuals: 'Swimlane creation, role assignment, cross-functional workflows',
                    practicalDemo: 'Design a multi-department approval process',
                    keyTechniques: ['Role-based organization', 'Cross-functional flows', 'Responsibility assignment']
                },
                processOptimization: {
                    duration: '5:30-7:45',
                    title: 'Process Optimization & Analytics',
                    narration: `Great process modeling is just the beginning. Lucidra analyzes your processes to identify bottlenecks, inefficiencies, and improvement opportunities. Watch as we run process analytics and implement optimization recommendations.`,
                    visuals: 'Process analytics dashboard, bottleneck identification, optimization suggestions',
                    practicalDemo: 'Optimize a procurement process',
                    keyTechniques: ['Bottleneck analysis', 'Cycle time optimization', 'Resource allocation']
                },
                monitoring: {
                    duration: '7:45-9:30',
                    title: 'Real-Time Process Monitoring',
                    narration: `Monitor your processes in real-time with comprehensive dashboards and alerts. I'll show you how to set up process KPIs, configure performance alerts, and create executive process reports that drive continuous improvement.`,
                    visuals: 'Process monitoring dashboard, KPI configuration, alert setup',
                    practicalDemo: 'Create a process performance dashboard',
                    keyTechniques: ['KPI design', 'Alert configuration', 'Performance reporting']
                },
                conclusion: {
                    duration: '9:30-10:15',
                    narration: `You now have the skills to model, optimize, and monitor world-class business processes. These capabilities will drive operational excellence throughout your organization. Next, explore Workflow Optimization Strategies to take your process mastery to the next level.`,
                    callToAction: 'Model your first process',
                    nextVideo: 'workflow-optimization'
                }
            }
        }

        // Additional scripts for remaining videos would follow...
    },

    // Interactive training scenarios
    trainingScenarios: {
        'ceo-decision-scenario': {
            title: 'CEO Strategic Decision Simulation',
            description: 'Navigate a complex strategic decision using Lucidra frameworks',
            scenario: 'Your company faces competitive pressure. Market share is declining, and a major competitor has launched a disruptive product. You have 6 months to respond.',
            challenges: [
                'Analyze competitive landscape using Porter\'s Five Forces',
                'Identify Blue Ocean opportunities',
                'Evaluate financial implications',
                'Design strategic response plan'
            ],
            tools: ['Blue Ocean Canvas', 'Porter\'s Analysis', 'Financial Modeling', 'Strategy Execution Tracker'],
            successMetrics: ['Strategic clarity', 'Framework application', 'Decision quality', 'Implementation plan']
        },

        'process-optimization-challenge': {
            title: 'Process Optimization Challenge',
            description: 'Redesign a complex multi-department process',
            scenario: 'Customer complaints about slow order fulfillment. The process involves 5 departments and has multiple approval stages.',
            challenges: [
                'Map current state using BPMN',
                'Identify bottlenecks and inefficiencies',
                'Design optimized future state',
                'Implement monitoring and metrics'
            ],
            tools: ['BPMN Modeler', 'Process Analytics', 'Swimlane Designer', 'Performance Dashboard'],
            successMetrics: ['Process efficiency', 'Cycle time reduction', 'Error elimination', 'Resource optimization']
        }
    },

    // AI-powered adaptive learning
    adaptiveLearning: {
        assessmentEngine: {
            evaluateUserProgress: function(userId, moduleId) {
                // Simulate AI assessment of user learning
                return {
                    comprehension: Math.floor(Math.random() * 30) + 70, // 70-100%
                    retention: Math.floor(Math.random() * 25) + 75,     // 75-100%
                    application: Math.floor(Math.random() * 35) + 65,   // 65-100%
                    nextRecommendations: this.generateRecommendations()
                };
            },

            generateRecommendations: function() {
                const recommendations = [
                    'Focus on practical application exercises',
                    'Review strategic framework integration',
                    'Practice with real business scenarios',
                    'Complete advanced assessment modules',
                    'Explore cross-functional case studies'
                ];
                return recommendations.slice(0, Math.floor(Math.random() * 3) + 2);
            }
        },

        personalizationEngine: {
            customizeContent: function(userProfile, learningHistory) {
                // AI-driven content personalization
                return {
                    contentPacing: userProfile.experience > 5 ? 'advanced' : 'standard',
                    focusAreas: this.identifyFocusAreas(learningHistory),
                    nextModules: this.suggestNextModules(userProfile),
                    difficulty: this.adjustDifficulty(learningHistory)
                };
            },

            identifyFocusAreas: function(history) {
                // Analyze weak areas and suggest focus
                return ['Strategic Thinking', 'Process Optimization', 'Financial Analysis'];
            }
        }
    }
};

// Export for integration
window.LucidraVideoLibrary = LucidraVideoLibrary;