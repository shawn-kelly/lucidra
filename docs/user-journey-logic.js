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
        });

        // Highlight primary modules
        primaryModules.forEach(moduleId => {
            const moduleCard = document.querySelector(`[onclick*="${moduleId}"]`);
            if (moduleCard && moduleCard.classList.contains('module-card')) {
                moduleCard.style.border = '3px solid #3498db';
                moduleCard.classList.add('user-priority');
                
                // Add priority badge
                if (!moduleCard.querySelector('.priority-badge')) {
                    const badge = document.createElement('div');
                    badge.className = 'priority-badge';
                    badge.style.cssText = `
                        position: absolute;
                        top: -5px;
                        left: -5px;
                        background: #3498db;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 12px;
                        font-size: 0.7rem;
                        font-weight: 600;
                        z-index: 10;
                    `;
                    badge.textContent = 'PRIORITY';
                    moduleCard.style.position = 'relative';
                    moduleCard.appendChild(badge);
                }
            }
        });
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
            <h3 style="color: white; margin-bottom: 15px;">${user.icon} Quick Actions</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                ${user.primaryModules.map(moduleId => {
                    const moduleName = this.getModuleName(moduleId);
                    return `
                        <button 
                            onclick="showView('${moduleId}')" 
                            style="
                                background: rgba(52, 152, 219, 0.8);
                                color: white;
                                border: none;
                                padding: 12px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 600;
                                transition: all 0.3s ease;
                            "
                            onmouseover="this.style.background='rgba(52, 152, 219, 1)'"
                            onmouseout="this.style.background='rgba(52, 152, 219, 0.8)'"
                        >
                            ${moduleName}
                        </button>
                    `;
                }).join('')}
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
        
        const selector = document.getElementById('user-type-selector');
        if (selector) {
            selector.remove();
        }
        
        // Show welcome message
        setTimeout(() => {
            const user = this.userTypes[userType];
            alert(`🎉 Welcome, ${user.name}!\n\nYour Lucidra experience has been personalized with priority modules and features designed for ${user.description.toLowerCase()}.`);
        }, 500);
    },

    // Create user journey UI
    createUserJourneyUI() {
        // Add user type indicator to navigation
        const nav = document.querySelector('.nav-container') || document.querySelector('nav');
        if (nav && this.getCurrentUser()) {
            const user = this.userTypes[this.getCurrentUser()];
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(52, 152, 219, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 0.8em;
                font-weight: 600;
                cursor: pointer;
            `;
            indicator.innerHTML = `${user.icon} ${user.name}`;
            indicator.onclick = () => this.showUserTypeSelector();
            indicator.title = 'Click to change user type';
            
            nav.style.position = 'relative';
            nav.appendChild(indicator);
        }
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