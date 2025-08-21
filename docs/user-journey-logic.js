/**
 * LUCIDRA USER JOURNEY LOGIC SYSTEM
 * 
 * Manages different user types and their personalized journeys
 * Based on actual platform features and capabilities
 */

window.LucidraUserJourney = {
    
    // User type definitions based on platform analysis
    userTypes: {
        'ceo': {
            name: 'Chief Executive Officer',
            icon: '👨‍💼',
            description: 'Strategic oversight and decision-making',
            primaryModules: ['strategic-intelligence', 'porters', 'financial', 'execution'],
            dashboard: 'executive',
            priority: 'strategic',
            features: [
                'Real-time strategic dashboards',
                'Executive KPI monitoring', 
                'Competitive intelligence alerts',
                'Strategic decision support'
            ]
        },
        'strategy-manager': {
            name: 'Strategy Manager',
            icon: '🎯',
            description: 'Strategic planning and analysis',
            primaryModules: ['blue-ocean', 'porters', 'seeing-whats-next', 'canvas'],
            dashboard: 'strategy',
            priority: 'analysis',
            features: [
                'Blue Ocean Strategy canvas',
                'Porter\'s Five Forces analysis',
                'SWOT analysis engine',
                'Market intelligence tracking'
            ]
        },
        'operations-manager': {
            name: 'Operations Manager', 
            icon: '⚙️',
            description: 'Process optimization and management',
            primaryModules: ['process-mgmt', 'organizational', 'execution'],
            dashboard: 'operations',
            priority: 'efficiency',
            features: [
                'BPMN process designer',
                'Workflow optimization',
                'Organization process mapping',
                'Performance analytics'
            ]
        },
        'financial-analyst': {
            name: 'Financial Analyst',
            icon: '💰',
            description: 'Financial analysis and planning',
            primaryModules: ['financial', 'canvas', 'execution'],
            dashboard: 'financial',
            priority: 'performance',
            features: [
                'Financial modeling frameworks',
                'ROI tracking and optimization',
                'Investment decision support',
                'Budget planning and forecasting'
            ]
        },
        'entrepreneur': {
            name: 'Entrepreneur/Founder',
            icon: '🚀',
            description: 'Building and scaling new ventures',
            primaryModules: ['mission', 'canvas', 'blue-ocean', 'financial'],
            dashboard: 'startup',
            priority: 'innovation',
            features: [
                'AI Mission Statement Generator',
                'Business Model Canvas',
                'Blue Ocean Strategy tools',
                'Startup financial planning'
            ]
        }
    },

    // Current user state
    currentUser: null,
    userProgress: {},
    
    // Initialize user journey system
    init() {
        console.log('🎯 Initializing Lucidra User Journey System...');
        this.loadUserPreferences();
        this.setupUserTypeDetection();
        this.createUserJourneyUI();
    },

    // Detect or set user type
    setUserType(userType) {
        if (!this.userTypes[userType]) {
            console.error(`❌ Invalid user type: ${userType}`);
            return false;
        }

        this.currentUser = userType;
        localStorage.setItem('lucidra_user_type', userType);
        
        console.log(`✅ User type set to: ${this.userTypes[userType].name}`);
        this.personalizeExperience();
        this.trackUserJourney('user_type_selected', { userType });
        
        return true;
    },

    // Get current user type
    getCurrentUser() {
        return this.currentUser || localStorage.getItem('lucidra_user_type');
    },

    // Personalize experience based on user type
    personalizeExperience() {
        const userType = this.getCurrentUser();
        if (!userType || !this.userTypes[userType]) return;

        const user = this.userTypes[userType];
        
        // Update navigation to highlight relevant modules
        this.highlightRelevantModules(user.primaryModules);
        
        // Show personalized dashboard
        this.showPersonalizedDashboard(user);
        
        // Update welcome message
        this.updateWelcomeMessage(user);
        
        // Set up guided tour
        this.setupGuidedTour(user);
    },

    // Highlight modules relevant to user type
    highlightRelevantModules(primaryModules) {
        // Reset all module highlights
        document.querySelectorAll('.module-card').forEach(card => {
            card.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            card.classList.remove('user-priority');
            
            // Remove existing priority badges
            const existingBadge = card.querySelector('.priority-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
        });

        // Highlight primary modules with enhanced visibility
        primaryModules.forEach((moduleId, index) => {
            const moduleCard = document.querySelector(`[onclick*="${moduleId}"]`);
            if (moduleCard && moduleCard.classList.contains('module-card')) {
                moduleCard.classList.add('user-priority');
                
                // Ensure position relative for badges
                moduleCard.style.position = 'relative';
                
                // Add animated priority badge
                const badge = document.createElement('div');
                badge.className = 'priority-badge';
                badge.style.cssText = `
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: linear-gradient(45deg, #3498db, #2ecc71);
                    color: white;
                    padding: 6px 10px;
                    border-radius: 15px;
                    font-size: 0.7em;
                    font-weight: 700;
                    z-index: 10;
                    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
                    animation: priorityBadgePulse 2s ease-in-out infinite;
                `;
                badge.innerHTML = `✨ #${index + 1} PRIORITY`;
                moduleCard.appendChild(badge);
                
                // Add subtle glow effect
                moduleCard.style.boxShadow = '0 0 15px rgba(52, 152, 219, 0.3)';
                
                // Add click enhancement
                const originalOnClick = moduleCard.onclick;
                moduleCard.onclick = (e) => {
                    // Track priority module usage
                    this.trackUserJourney('priority_module_clicked', { 
                        moduleId, 
                        priority: index + 1,
                        userType: this.getCurrentUser() 
                    });
                    
                    // Show usage tip
                    this.showModuleUsageTip(moduleCard, moduleId);
                    
                    // Execute original click
                    if (originalOnClick) {
                        originalOnClick.call(moduleCard, e);
                    }
                };
            }
        });
        
        // Add feature discovery hint
        this.addFeatureDiscoveryHint();
    },

    // Add feature discovery hint
    addFeatureDiscoveryHint() {
        // Remove existing hint
        const existingHint = document.getElementById('feature-discovery-hint');
        if (existingHint) {
            existingHint.remove();
        }
        
        const hint = document.createElement('div');
        hint.id = 'feature-discovery-hint';
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            background: linear-gradient(45deg, #9b59b6, #8e44ad);
            color: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(155, 89, 182, 0.3);
            z-index: 999;
            max-width: 250px;
            font-size: 0.9em;
            animation: slideIn 0.5s ease;
        `;
        
        hint.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong>💡 New Features!</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2em;
                    cursor: pointer;
                ">×</button>
            </div>
            <p style="margin: 8px 0; font-size: 0.85em;">
                ✨ Modules with PRIORITY badges are optimized for your role
            </p>
            <p style="margin: 8px 0; font-size: 0.85em;">
                🎯 Look for the user type indicator in the top-right corner
            </p>
            <button onclick="LucidraUserJourney.showUserTypeSelector(); this.parentElement.remove()" style="
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 6px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.8em;
                width: 100%;
                margin-top: 8px;
            ">
                🔄 Change User Type
            </button>
        `;
        
        document.body.appendChild(hint);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (document.getElementById('feature-discovery-hint')) {
                hint.style.opacity = '0';
                setTimeout(() => hint.remove(), 300);
            }
        }, 8000);
    },

    // Show module usage tip
    showModuleUsageTip(moduleCard, moduleId) {
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: #2c3e50;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8em;
            white-space: nowrap;
            z-index: 11;
            animation: fadeIn 0.3s ease;
        `;
        tip.textContent = `🎯 Priority module for your role!`;
        
        moduleCard.appendChild(tip);
        
        // Remove tip after 2 seconds
        setTimeout(() => {
            tip.style.opacity = '0';
            setTimeout(() => tip.remove(), 300);
        }, 2000);
    },

    // Show personalized dashboard
    showPersonalizedDashboard(user) {
        const dashboardTitle = document.querySelector('.dashboard-title');
        const dashboardSubtitle = document.querySelector('.dashboard-subtitle');
        
        if (dashboardTitle) {
            dashboardTitle.textContent = `Welcome, ${user.name}`;
        }
        
        if (dashboardSubtitle) {
            dashboardSubtitle.innerHTML = `
                ${user.icon} ${user.description}<br>
                <small style="opacity: 0.8;">Focus: ${user.priority} • Features: ${user.features.length}</small>
            `;
        }

        // Add personalized quick actions
        this.addQuickActions(user);
    },

    // Add quick action buttons for user type
    addQuickActions(user) {
        const quickActionsContainer = document.querySelector('.quick-actions') || this.createQuickActionsContainer();
        
        quickActionsContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                <h3 style="color: white; margin: 0; display: flex; align-items: center; gap: 10px;">
                    ${user.icon} <span>Quick Actions for ${user.name}</span>
                </h3>
                <div style="background: rgba(255, 255, 255, 0.2); padding: 4px 8px; border-radius: 12px; font-size: 0.8em;">
                    ✨ PERSONALIZED
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
                ${user.primaryModules.map((moduleId, index) => {
                    const moduleName = this.getModuleName(moduleId);
                    return `
                        <button 
                            onclick="showView('${moduleId}'); LucidraUserJourney.trackUserJourney('quick_action_used', {moduleId: '${moduleId}', priority: ${index + 1}})" 
                            style="
                                background: linear-gradient(45deg, #3498db, #2980b9);
                                color: white;
                                border: none;
                                padding: 15px;
                                border-radius: 10px;
                                cursor: pointer;
                                font-weight: 600;
                                transition: all 0.3s ease;
                                position: relative;
                                box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            "
                            onmouseover="
                                this.style.transform='translateY(-2px)';
                                this.style.boxShadow='0 5px 20px rgba(52, 152, 219, 0.4)';
                            "
                            onmouseout="
                                this.style.transform='translateY(0)';
                                this.style.boxShadow='0 3px 10px rgba(52, 152, 219, 0.3)';
                            "
                        >
                            <span>${moduleName}</span>
                            <span style="
                                background: rgba(255, 255, 255, 0.2);
                                padding: 2px 6px;
                                border-radius: 8px;
                                font-size: 0.7em;
                            ">#${index + 1}</span>
                        </button>
                    `;
                }).join('')}
            </div>
            <div style="margin-top: 15px; padding: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 8px; font-size: 0.9em;">
                💡 <strong>Tip:</strong> These modules are ranked by relevance to your role as ${user.name}
            </div>
        `;
    },

    // Create quick actions container
    createQuickActionsContainer() {
        const container = document.createElement('div');
        container.className = 'quick-actions';
        container.style.cssText = `
            background: rgba(44, 62, 80, 0.8);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid rgba(255, 255, 255, 0.3);
        `;
        
        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
            dashboard.appendChild(container);
        }
        
        return container;
    },

    // Get module display name
    getModuleName(moduleId) {
        const moduleNames = {
            'strategic-intelligence': 'Strategic Intel',
            'porters': 'Porter\'s Analysis', 
            'financial': 'Financial Hub',
            'execution': 'Strategy Execution',
            'blue-ocean': 'Blue Ocean',
            'seeing-whats-next': 'Innovation Trends',
            'canvas': 'Business Model',
            'process-mgmt': 'Process Management',
            'organizational': 'Organization Design',
            'mission': 'Mission Generator'
        };
        return moduleNames[moduleId] || moduleId;
    },

    // Update welcome message
    updateWelcomeMessage(user) {
        // Add personalized tips
        const tipsContainer = document.querySelector('.user-tips') || this.createTipsContainer();
        
        tipsContainer.innerHTML = `
            <h4 style="color: #2c3e50; margin-bottom: 10px;">💡 Tips for ${user.name}</h4>
            <ul style="color: #34495e; margin: 0; padding-left: 20px;">
                ${user.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
    },

    // Create tips container  
    createTipsContainer() {
        const container = document.createElement('div');
        container.className = 'user-tips';
        container.style.cssText = `
            background: rgba(255, 255, 255, 0.95);
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 4px solid #3498db;
        `;
        
        const quickActions = document.querySelector('.quick-actions');
        if (quickActions) {
            quickActions.after(container);
        }
        
        return container;
    },

    // Setup guided tour for user type
    setupGuidedTour(user) {
        // Add tour button
        const tourButton = document.createElement('button');
        tourButton.innerHTML = `🎯 Start ${user.name} Tour`;
        tourButton.style.cssText = `
            background: #27ae60;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            margin: 10px 0;
        `;
        tourButton.onclick = () => this.startGuidedTour(user);
        
        const tipsContainer = document.querySelector('.user-tips');
        if (tipsContainer) {
            tipsContainer.appendChild(tourButton);
        }
    },

    // Start guided tour
    startGuidedTour(user) {
        console.log(`🎯 Starting guided tour for ${user.name}...`);
        
        // Create tour overlay
        const overlay = document.createElement('div');
        overlay.id = 'tour-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        overlay.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            ">
                <h2 style="color: #2c3e50; margin-bottom: 20px;">${user.icon} ${user.name} Tour</h2>
                <p style="color: #34495e; margin-bottom: 20px;">
                    Welcome to your personalized Lucidra experience! This tour will guide you through 
                    the key features designed for ${user.description.toLowerCase()}.
                </p>
                <div style="margin: 20px 0;">
                    <h4 style="color: #3498db;">Your Priority Modules:</h4>
                    <ul style="text-align: left; color: #34495e;">
                        ${user.primaryModules.map(moduleId => `<li>${this.getModuleName(moduleId)}</li>`).join('')}
                    </ul>
                </div>
                <button 
                    onclick="LucidraUserJourney.startTourStep(0, '${user.name}')" 
                    style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        margin: 5px;
                    "
                >
                    Start Tour
                </button>
                <button 
                    onclick="LucidraUserJourney.closeTour()" 
                    style="
                        background: #95a5a6;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        margin: 5px;
                    "
                >
                    Skip Tour
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
    },

    // Start tour step
    startTourStep(stepIndex, userName) {
        this.closeTour();
        
        const user = Object.values(this.userTypes).find(u => u.name === userName);
        if (!user || stepIndex >= user.primaryModules.length) {
            alert(`🎉 ${userName} tour complete! You're ready to use Lucidra effectively.`);
            return;
        }
        
        const moduleId = user.primaryModules[stepIndex];
        showView(moduleId);
        
        setTimeout(() => {
            alert(`📍 Step ${stepIndex + 1}/${user.primaryModules.length}: ${this.getModuleName(moduleId)}\n\nThis module is optimized for your role. Explore the features and click OK to continue the tour.`);
            this.startTourStep(stepIndex + 1, userName);
        }, 1000);
    },

    // Close tour overlay
    closeTour() {
        const overlay = document.getElementById('tour-overlay');
        if (overlay) {
            overlay.remove();
        }
    },

    // Track user journey analytics
    trackUserJourney(event, data = {}) {
        const journeyData = {
            timestamp: new Date().toISOString(),
            userType: this.getCurrentUser(),
            event: event,
            data: data
        };
        
        console.log('📊 User Journey Event:', journeyData);
        
        // Store in local analytics
        const analytics = JSON.parse(localStorage.getItem('lucidra_analytics') || '[]');
        analytics.push(journeyData);
        localStorage.setItem('lucidra_analytics', JSON.stringify(analytics.slice(-100))); // Keep last 100 events
    },

    // Load user preferences
    loadUserPreferences() {
        const savedUserType = localStorage.getItem('lucidra_user_type');
        if (savedUserType && this.userTypes[savedUserType]) {
            this.currentUser = savedUserType;
            console.log(`✅ Loaded saved user type: ${this.userTypes[savedUserType].name}`);
        }
    },

    // Setup user type detection
    setupUserTypeDetection() {
        // Auto-detect based on usage patterns if no saved preference
        if (!this.getCurrentUser()) {
            this.showUserTypeSelector();
        } else {
            this.personalizeExperience();
        }
    },

    // Show user type selector
    showUserTypeSelector() {
        const selector = document.createElement('div');
        selector.id = 'user-type-selector';
        selector.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        selector.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 800px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            ">
                <h2 style="color: #2c3e50; margin-bottom: 20px;">👋 Welcome to Lucidra!</h2>
                <p style="color: #34495e; margin-bottom: 30px;">
                    To personalize your experience, please select your role:
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    ${Object.entries(this.userTypes).map(([key, user]) => `
                        <button 
                            onclick="LucidraUserJourney.selectUserType('${key}')" 
                            style="
                                background: #f8f9fa;
                                border: 2px solid #3498db;
                                padding: 20px;
                                border-radius: 10px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                text-align: center;
                            "
                            onmouseover="this.style.background='#3498db'; this.style.color='white'"
                            onmouseout="this.style.background='#f8f9fa'; this.style.color='#2c3e50'"
                        >
                            <div style="font-size: 2em; margin-bottom: 10px;">${user.icon}</div>
                            <strong style="display: block; margin-bottom: 5px; color: inherit;">${user.name}</strong>
                            <small style="color: inherit;">${user.description}</small>
                        </button>
                    `).join('')}
                </div>
                <p style="color: #7f8c8d; margin-top: 20px; font-size: 0.9em;">
                    You can change this anytime in settings
                </p>
            </div>
        `;
        
        document.body.appendChild(selector);
    },

    // Select user type from selector
    selectUserType(userType) {
        this.setUserType(userType);
        
        // Remove selector immediately with smooth transition
        const selector = document.getElementById('user-type-selector');
        if (selector) {
            selector.style.opacity = '0';
            selector.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                selector.remove();
            }, 300);
        }
        
        // Show brief non-blocking welcome notification
        this.showWelcomeNotification(userType);
        
        // Immediately enable interaction with platform
        this.enablePlatformInteraction();
    },

    // Show non-blocking welcome notification
    showWelcomeNotification(userType) {
        const user = this.userTypes[userType];
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #27ae60, #2ecc71);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            max-width: 350px;
            animation: slideIn 0.5s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <span style="font-size: 1.5em;">${user.icon}</span>
                <strong>Welcome, ${user.name}!</strong>
            </div>
            <p style="margin: 0; font-size: 0.9em;">
                ✨ Platform personalized for ${user.description.toLowerCase()}
            </p>
            <div style="margin-top: 10px; font-size: 0.8em; opacity: 0.9;">
                🎯 Priority modules highlighted • Quick actions added
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove notification after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    },

    // Enable immediate platform interaction
    enablePlatformInteraction() {
        // Pulse the priority modules to draw attention
        this.highlightPriorityFeatures();
        
        // Show quick start guide
        setTimeout(() => {
            this.showQuickStartGuide();
        }, 1000);
    },

    // Highlight priority features with animation
    highlightPriorityFeatures() {
        document.querySelectorAll('.user-priority').forEach(card => {
            card.style.animation = 'priorityPulse 2s ease-in-out';
            
            // Add glow effect
            card.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.5)';
            
            // Remove animation after completion
            setTimeout(() => {
                card.style.animation = '';
                card.style.boxShadow = '';
            }, 2000);
        });
    },

    // Show non-blocking quick start guide
    showQuickStartGuide() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return;
        
        const user = this.userTypes[currentUser];
        const guide = document.createElement('div');
        guide.id = 'quick-start-guide';
        guide.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: white;
            border: 2px solid #3498db;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 300px;
            animation: slideUp 0.5s ease;
        `;
        
        guide.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <strong style="color: #2c3e50;">🚀 Quick Start</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    font-size: 1.2em;
                    cursor: pointer;
                    color: #95a5a6;
                ">×</button>
            </div>
            <p style="margin: 10px 0; color: #34495e; font-size: 0.9em;">
                Your priority modules are highlighted with blue borders:
            </p>
            <ul style="margin: 10px 0; padding-left: 20px; color: #34495e; font-size: 0.85em;">
                ${user.primaryModules.slice(0, 3).map(moduleId => 
                    `<li>${this.getModuleName(moduleId)}</li>`
                ).join('')}
            </ul>
            <button onclick="LucidraUserJourney.startQuickTour(); this.parentElement.remove()" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9em;
                width: 100%;
                margin-top: 10px;
            ">
                🎯 Take Quick Tour
            </button>
        `;
        
        document.body.appendChild(guide);
        
        // Auto-hide after 10 seconds if not interacted with
        setTimeout(() => {
            if (document.getElementById('quick-start-guide')) {
                guide.style.opacity = '0';
                setTimeout(() => guide.remove(), 300);
            }
        }, 10000);
    },

    // Quick tour without blocking overlay
    startQuickTour() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return;
        
        const user = this.userTypes[currentUser];
        this.currentTourStep = 0;
        this.tourModules = user.primaryModules;
        
        this.showTourStep();
    },

    // Show individual tour step
    showTourStep() {
        if (this.currentTourStep >= this.tourModules.length) {
            this.completeTour();
            return;
        }
        
        const moduleId = this.tourModules[this.currentTourStep];
        const moduleName = this.getModuleName(moduleId);
        
        // Find the module card
        const moduleCard = document.querySelector(`[onclick*="${moduleId}"]`);
        if (moduleCard && moduleCard.classList.contains('module-card')) {
            // Scroll module into view
            moduleCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add highlight
            moduleCard.style.transform = 'scale(1.05)';
            moduleCard.style.boxShadow = '0 10px 30px rgba(52, 152, 219, 0.4)';
            moduleCard.style.zIndex = '100';
            
            // Show step tooltip
            this.showStepTooltip(moduleCard, moduleName, this.currentTourStep + 1, this.tourModules.length);
        }
    },

    // Show step tooltip
    showStepTooltip(element, moduleName, stepNum, totalSteps) {
        // Remove existing tooltip
        const existingTooltip = document.getElementById('tour-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.id = 'tour-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: #2c3e50;
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 1001;
            max-width: 250px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = (rect.top - 100) + 'px';
        tooltip.style.left = (rect.left + rect.width/2 - 125) + 'px';
        
        tooltip.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">
                Step ${stepNum}/${totalSteps}: ${moduleName}
            </div>
            <div style="font-size: 0.9em; margin-bottom: 12px;">
                This is one of your priority modules. Click to explore!
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="LucidraUserJourney.nextTourStep()" style="
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.8em;
                ">
                    Next →
                </button>
                <button onclick="LucidraUserJourney.completeTour()" style="
                    background: #95a5a6;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.8em;
                ">
                    Skip
                </button>
            </div>
        `;
        
        document.body.appendChild(tooltip);
    },

    // Next tour step
    nextTourStep() {
        // Reset previous module styling
        const previousModule = document.querySelector(`[onclick*="${this.tourModules[this.currentTourStep]}"]`);
        if (previousModule && previousModule.classList.contains('module-card')) {
            previousModule.style.transform = '';
            previousModule.style.boxShadow = '';
            previousModule.style.zIndex = '';
        }
        
        this.currentTourStep++;
        this.showTourStep();
    },

    // Complete tour
    completeTour() {
        // Clean up tour elements
        const tooltip = document.getElementById('tour-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
        
        // Reset all module styling
        this.tourModules.forEach(moduleId => {
            const moduleCard = document.querySelector(`[onclick*="${moduleId}"]`);
            if (moduleCard && moduleCard.classList.contains('module-card')) {
                moduleCard.style.transform = '';
                moduleCard.style.boxShadow = '';
                moduleCard.style.zIndex = '';
            }
        });
        
        // Show completion message
        this.showCompletionMessage();
    },

    // Show completion message
    showCompletionMessage() {
        const completion = document.createElement('div');
        completion.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #27ae60, #2ecc71);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1002;
            animation: fadeIn 0.5s ease;
        `;
        
        completion.innerHTML = `
            <div style="font-size: 2em; margin-bottom: 10px;">🎉</div>
            <strong style="display: block; margin-bottom: 10px;">Tour Complete!</strong>
            <p style="margin: 0; font-size: 0.9em;">
                You're ready to explore your personalized Lucidra experience!
            </p>
        `;
        
        document.body.appendChild(completion);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            completion.style.opacity = '0';
            setTimeout(() => completion.remove(), 300);
        }, 3000);
    },

    // Create user journey UI
    createUserJourneyUI() {
        // Add user type indicator to navigation
        const header = document.querySelector('.header');
        if (header && this.getCurrentUser()) {
            const user = this.userTypes[this.getCurrentUser()];
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                position: absolute;
                top: 15px;
                right: 15px;
                background: linear-gradient(45deg, #3498db, #2980b9);
                color: white;
                padding: 10px 15px;
                border-radius: 25px;
                font-size: 0.85em;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
                transition: all 0.3s ease;
                animation: userTypePulse 3s ease-in-out infinite;
            `;
            indicator.innerHTML = `${user.icon} ${user.name}`;
            indicator.onclick = () => this.showUserTypeSelector();
            indicator.title = 'Click to change user type or view personalization';
            
            // Add hover effect
            indicator.onmouseover = () => {
                indicator.style.transform = 'scale(1.05)';
                indicator.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.4)';
            };
            indicator.onmouseout = () => {
                indicator.style.transform = 'scale(1)';
                indicator.style.boxShadow = '0 3px 10px rgba(52, 152, 219, 0.3)';
            };
            
            header.style.position = 'relative';
            header.appendChild(indicator);
        }
        
        // Add CSS animations
        this.addAnimationStyles();
    },

    // Add animation styles
    addAnimationStyles() {
        if (document.getElementById('user-journey-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'user-journey-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            
            @keyframes priorityPulse {
                0%, 100% { 
                    border-color: #3498db; 
                    box-shadow: 0 0 0 rgba(52, 152, 219, 0.4); 
                }
                50% { 
                    border-color: #2ecc71; 
                    box-shadow: 0 0 20px rgba(52, 152, 219, 0.6); 
                }
            }
            
            @keyframes userTypePulse {
                0%, 100% { 
                    box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
                }
                50% { 
                    box-shadow: 0 5px 20px rgba(52, 152, 219, 0.5);
                }
            }
            
            .user-priority {
                border: 3px solid #3498db !important;
                position: relative;
            }
            
            .user-priority::before {
                content: "✨ PRIORITY";
                position: absolute;
                top: -8px;
                right: -8px;
                background: linear-gradient(45deg, #3498db, #2ecc71);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.7em;
                font-weight: 600;
                z-index: 10;
                animation: priorityBadgePulse 2s ease-in-out infinite;
            }
            
            @keyframes priorityBadgePulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .quick-actions {
                animation: quickActionSlide 0.5s ease !important;
            }
            
            @keyframes quickActionSlide {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (window.LucidraUserJourney) {
        window.LucidraUserJourney.init();
    }
});

// Export for global access
window.LucidraUserJourney = window.LucidraUserJourney;