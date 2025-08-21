/**
 * LUCIDRA WINDOW AGENT MANAGER v2.0
 * 
 * Agent-based window state management system that monitors,
 * manages, and optimizes window behavior automatically.
 */

class LucidraWindowAgent {
    constructor(windowManager) {
        this.windowManager = windowManager;
        this.sessionData = {
            windowsOpened: 0,
            windowsClosed: 0,
            totalSessionTime: 0,
            peakConcurrentWindows: 0,
            userPreferences: this.loadUserPreferences()
        };
        
        this.performanceMetrics = {
            averageWindowLifetime: 0,
            memoryUsage: 0,
            renderPerformance: []
        };
        
        this.rules = new Map();
        this.actions = new Map();
        this.triggers = new Map();
        
        this.initializeAgent();
        console.log('🤖 Lucidra Window Agent v2.0 initialized');
    }

    /**
     * Initialize the agent system
     */
    initializeAgent() {
        this.startSessionTracking();
        this.registerDefaultRules();
        this.registerDefaultActions();
        this.registerDefaultTriggers();
        this.startPerformanceMonitoring();
        this.startAutomaticOptimization();
    }

    /**
     * Start session tracking
     */
    startSessionTracking() {
        this.sessionStartTime = Date.now();
        
        // Track window operations
        const originalCreateWindow = this.windowManager.createWindow.bind(this.windowManager);
        this.windowManager.createWindow = (id, options) => {
            this.sessionData.windowsOpened++;
            this.sessionData.peakConcurrentWindows = Math.max(
                this.sessionData.peakConcurrentWindows,
                this.windowManager.getActiveWindowsCount() + 1
            );
            
            const result = originalCreateWindow(id, options);
            this.onWindowCreated(id, options);
            return result;
        };

        const originalCloseWindow = this.windowManager.closeWindow.bind(this.windowManager);
        this.windowManager.closeWindow = (id) => {
            this.sessionData.windowsClosed++;
            this.onWindowClosed(id);
            return originalCloseWindow(id);
        };

        console.log('📊 Session tracking activated');
    }

    /**
     * Register default behavioral rules
     */
    registerDefaultRules() {
        // Rule: Auto-close idle windows
        this.addRule('auto-close-idle', {
            condition: (windowId) => {
                const windowData = this.windowManager.windows.get(windowId);
                if (!windowData) return false;
                
                const lastActivity = this.getWindowLastActivity(windowId);
                const idleTime = Date.now() - lastActivity;
                return idleTime > (this.sessionData.userPreferences.autoCloseAfter * 1000);
            },
            action: 'close-window',
            priority: 1
        });

        // Rule: Limit concurrent windows
        this.addRule('limit-concurrent', {
            condition: () => {
                return this.windowManager.getActiveWindowsCount() > this.sessionData.userPreferences.maxConcurrentWindows;
            },
            action: 'minimize-oldest',
            priority: 2
        });

        // Rule: Memory optimization
        this.addRule('memory-optimization', {
            condition: () => {
                return this.performanceMetrics.memoryUsage > 80; // 80% threshold
            },
            action: 'optimize-memory',
            priority: 3
        });

        console.log('📋 Default rules registered');
    }

    /**
     * Register default actions
     */
    registerDefaultActions() {
        this.addAction('close-window', (windowId) => {
            this.windowManager.closeWindow(windowId);
            console.log(`🤖 Agent closed idle window: ${windowId}`);
        });

        this.addAction('minimize-oldest', () => {
            const oldestWindow = this.findOldestWindow();
            if (oldestWindow) {
                this.windowManager.minimizeWindow(oldestWindow);
                console.log(`🤖 Agent minimized oldest window: ${oldestWindow}`);
            }
        });

        this.addAction('optimize-memory', () => {
            this.performMemoryOptimization();
            console.log('🤖 Agent performed memory optimization');
        });

        this.addAction('suggest-organization', () => {
            this.suggestWindowOrganization();
        });

        console.log('⚡ Default actions registered');
    }

    /**
     * Register default triggers
     */
    registerDefaultTriggers() {
        // Trigger rules evaluation every 30 seconds
        this.addTrigger('periodic-evaluation', () => {
            this.evaluateAllRules();
        }, 30000);

        // Trigger on window count change
        this.addTrigger('window-count-change', () => {
            this.evaluateRules(['limit-concurrent']);
        }, 'event');

        // Trigger on performance issues
        this.addTrigger('performance-check', () => {
            this.evaluateRules(['memory-optimization']);
        }, 60000);

        console.log('🔔 Default triggers registered');
    }

    /**
     * Add new rule to the system
     */
    addRule(name, rule) {
        this.rules.set(name, {
            ...rule,
            lastEvaluated: 0,
            timesTriggered: 0
        });
    }

    /**
     * Add new action to the system
     */
    addAction(name, actionFunction) {
        this.actions.set(name, actionFunction);
    }

    /**
     * Add new trigger to the system
     */
    addTrigger(name, callback, interval) {
        if (interval === 'event') {
            this.triggers.set(name, { callback, type: 'event' });
        } else {
            const triggerInterval = setInterval(callback, interval);
            this.triggers.set(name, { callback, interval: triggerInterval, type: 'timer' });
        }
    }

    /**
     * Evaluate all rules
     */
    evaluateAllRules() {
        const ruleNames = Array.from(this.rules.keys());
        this.evaluateRules(ruleNames);
    }

    /**
     * Evaluate specific rules
     */
    evaluateRules(ruleNames) {
        ruleNames.forEach(ruleName => {
            const rule = this.rules.get(ruleName);
            if (!rule) return;

            rule.lastEvaluated = Date.now();

            // Check rule condition
            let shouldTrigger = false;
            
            if (ruleName === 'auto-close-idle') {
                // Check all windows for idle condition
                for (const windowId of this.windowManager.windows.keys()) {
                    if (rule.condition(windowId)) {
                        shouldTrigger = true;
                        this.executeAction(rule.action, windowId);
                        rule.timesTriggered++;
                    }
                }
            } else {
                // General condition check
                if (rule.condition()) {
                    shouldTrigger = true;
                    this.executeAction(rule.action);
                    rule.timesTriggered++;
                }
            }

            if (shouldTrigger) {
                console.log(`🎯 Rule triggered: ${ruleName}`);
            }
        });
    }

    /**
     * Execute an action
     */
    executeAction(actionName, ...args) {
        const action = this.actions.get(actionName);
        if (action) {
            action(...args);
        } else {
            console.warn(`⚠️ Unknown action: ${actionName}`);
        }
    }

    /**
     * Window lifecycle callbacks
     */
    onWindowCreated(windowId, options) {
        // Store window creation time
        this.setWindowLastActivity(windowId, Date.now());
        
        // Apply user preferences
        this.applyUserPreferences(windowId, options);
        
        // Check for rule violations
        this.evaluateRules(['limit-concurrent']);
        
        console.log(`📊 Window created: ${windowId}`);
    }

    onWindowClosed(windowId) {
        // Clean up tracking data
        this.cleanupWindowData(windowId);
        console.log(`📊 Window closed: ${windowId}`);
    }

    /**
     * Performance monitoring
     */
    startPerformanceMonitoring() {
        setInterval(() => {
            this.updatePerformanceMetrics();
        }, 5000);
    }

    updatePerformanceMetrics() {
        // Estimate memory usage based on DOM elements
        const windowElements = document.querySelectorAll('.lucidra-window-overlay');
        this.performanceMetrics.memoryUsage = Math.min(windowElements.length * 10, 100);
        
        // Track render performance
        const renderStart = performance.now();
        // Simulate render check
        setTimeout(() => {
            const renderTime = performance.now() - renderStart;
            this.performanceMetrics.renderPerformance.push(renderTime);
            
            // Keep only last 10 measurements
            if (this.performanceMetrics.renderPerformance.length > 10) {
                this.performanceMetrics.renderPerformance.shift();
            }
        }, 0);
    }

    /**
     * Automatic optimization
     */
    startAutomaticOptimization() {
        setInterval(() => {
            this.performAutomaticOptimization();
        }, 120000); // Every 2 minutes
    }

    performAutomaticOptimization() {
        const activeWindows = this.windowManager.getActiveWindowsCount();
        const minimizedWindows = this.windowManager.getMinimizedWindowsCount();
        
        // Optimization suggestions
        if (activeWindows > 3) {
            console.log('💡 Agent suggestion: Consider minimizing some windows for better performance');
        }
        
        if (minimizedWindows > 5) {
            console.log('💡 Agent suggestion: Consider closing unused minimized windows');
        }
        
        // Auto-apply optimizations if user preferences allow
        if (this.sessionData.userPreferences.autoOptimize) {
            this.evaluateAllRules();
        }
    }

    /**
     * Utility methods
     */
    findOldestWindow() {
        let oldestId = null;
        let oldestTime = Date.now();
        
        for (const windowId of this.windowManager.windows.keys()) {
            const lastActivity = this.getWindowLastActivity(windowId);
            if (lastActivity < oldestTime) {
                oldestTime = lastActivity;
                oldestId = windowId;
            }
        }
        
        return oldestId;
    }

    getWindowLastActivity(windowId) {
        return parseInt(localStorage.getItem(`window-activity-${windowId}`)) || Date.now();
    }

    setWindowLastActivity(windowId, timestamp) {
        localStorage.setItem(`window-activity-${windowId}`, timestamp.toString());
    }

    cleanupWindowData(windowId) {
        localStorage.removeItem(`window-activity-${windowId}`);
    }

    performMemoryOptimization() {
        // Remove unused DOM elements
        const unusedElements = document.querySelectorAll('.lucidra-window-overlay[style*="display: none"]');
        unusedElements.forEach(el => el.remove());
        
        // Clear performance history
        this.performanceMetrics.renderPerformance = [];
        
        console.log('🧹 Memory optimization completed');
    }

    suggestWindowOrganization() {
        const activeCount = this.windowManager.getActiveWindowsCount();
        
        if (activeCount > 2) {
            this.showOptimizationSuggestion(
                'Window Organization',
                `You have ${activeCount} windows open. Consider organizing them for better workflow:`
            );
        }
    }

    showOptimizationSuggestion(title, message) {
        const suggestionId = 'agent-suggestion-' + Date.now();
        
        this.windowManager.createWindow(suggestionId, {
            maxWidth: '400px',
            closeable: true,
            minimizable: false,
            backdrop: true
        });
        
        this.windowManager.setWindowTitle(suggestionId, `🤖 ${title}`);
        this.windowManager.setWindowContent(suggestionId, `
            <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 15px;">🤖</div>
                <h3 style="color: #333; margin-bottom: 15px;">${title}</h3>
                <p style="color: #666; line-height: 1.5; margin-bottom: 20px;">${message}</p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="LucidraWindows.closeWindow('${suggestionId}')" 
                            style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        Got it
                    </button>
                    <button onclick="window.LucidraAgent.disableOptimizations(); LucidraWindows.closeWindow('${suggestionId}')" 
                            style="background: #ccc; color: #333; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        Don't show again
                    </button>
                </div>
            </div>
        `);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (this.windowManager.windowExists(suggestionId)) {
                this.windowManager.closeWindow(suggestionId);
            }
        }, 10000);
    }

    /**
     * User preferences management
     */
    loadUserPreferences() {
        const defaults = {
            autoCloseAfter: 300, // 5 minutes
            maxConcurrentWindows: 4,
            autoOptimize: true,
            showSuggestions: true
        };
        
        try {
            const saved = localStorage.getItem('lucidra-window-preferences');
            return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
        } catch (e) {
            return defaults;
        }
    }

    saveUserPreferences() {
        localStorage.setItem('lucidra-window-preferences', JSON.stringify(this.sessionData.userPreferences));
    }

    updateUserPreference(key, value) {
        this.sessionData.userPreferences[key] = value;
        this.saveUserPreferences();
        console.log(`🔧 User preference updated: ${key} = ${value}`);
    }

    disableOptimizations() {
        this.updateUserPreference('autoOptimize', false);
        this.updateUserPreference('showSuggestions', false);
        console.log('🔇 Automatic optimizations disabled');
    }

    /**
     * Agent statistics and reporting
     */
    getAgentStats() {
        return {
            session: this.sessionData,
            performance: this.performanceMetrics,
            rules: {
                total: this.rules.size,
                active: Array.from(this.rules.values()).filter(r => r.timesTriggered > 0).length
            },
            triggers: this.triggers.size,
            actions: this.actions.size
        };
    }

    generateReport() {
        const stats = this.getAgentStats();
        const sessionTime = (Date.now() - this.sessionStartTime) / 1000 / 60; // minutes
        
        return `
🤖 LUCIDRA WINDOW AGENT REPORT

📊 SESSION STATISTICS:
• Session Duration: ${sessionTime.toFixed(1)} minutes
• Windows Opened: ${stats.session.windowsOpened}
• Windows Closed: ${stats.session.windowsClosed}
• Peak Concurrent Windows: ${stats.session.peakConcurrentWindows}

🎯 AGENT PERFORMANCE:
• Active Rules: ${stats.rules.active}/${stats.rules.total}
• Memory Usage: ${this.performanceMetrics.memoryUsage}%
• Average Render Time: ${this.performanceMetrics.renderPerformance.length > 0 ? 
    (this.performanceMetrics.renderPerformance.reduce((a, b) => a + b, 0) / this.performanceMetrics.renderPerformance.length).toFixed(2) : 0}ms

⚙️ USER PREFERENCES:
• Auto-close idle windows: ${stats.session.userPreferences.autoCloseAfter}s
• Max concurrent windows: ${stats.session.userPreferences.maxConcurrentWindows}
• Auto-optimization: ${stats.session.userPreferences.autoOptimize ? 'Enabled' : 'Disabled'}

🔧 OPTIMIZATIONS APPLIED:
${Array.from(this.rules.values()).map(rule => 
    `• ${rule.action}: ${rule.timesTriggered} times`
).join('\n')}
        `;
    }

    /**
     * Apply user preferences to new windows
     */
    applyUserPreferences(windowId, options) {
        // Set up activity tracking
        const windowElement = this.windowManager.windows.get(windowId)?.element;
        if (windowElement) {
            // Track user interaction
            windowElement.addEventListener('click', () => {
                this.setWindowLastActivity(windowId, Date.now());
            });
            
            windowElement.addEventListener('keydown', () => {
                this.setWindowLastActivity(windowId, Date.now());
            });
        }
    }
}

// Initialize the agent when window manager is ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.LucidraWindows) {
        window.LucidraAgent = new LucidraWindowAgent(window.LucidraWindows);
        console.log('🤖 Lucidra Window Agent v2.0 ready');
    }
});

console.log('🤖 Lucidra Window Agent Manager v2.0 loaded successfully');