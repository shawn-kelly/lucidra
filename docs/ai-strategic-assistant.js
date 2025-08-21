/**
 * LUCIDRA AI STRATEGIC ASSISTANT v1.0
 * 
 * AI-powered strategic guidance system using natural language processing
 * Integrates with platform's existing strategic frameworks
 */

window.LucidraAI = {
    
    // AI Assistant Configuration
    config: {
        apiEndpoint: '/api/ai-strategic-assistant',
        model: 'claude-3.5-sonnet',
        maxTokens: 2000,
        temperature: 0.7,
        systemPrompt: `You are a strategic business advisor specializing in the frameworks available in Lucidra:
        - Porter's Five Forces Analysis
        - Blue Ocean Strategy 
        - BPMN Process Management
        - Financial Intelligence
        - Business Model Canvas
        - SWOT Analysis
        - Competitive Intelligence
        
        Provide actionable, framework-specific guidance based on the user's role and query.`
    },

    // Current conversation state
    conversation: [],
    isProcessing: false,
    currentUser: null,

    // Initialize AI Assistant
    init() {
        console.log('🤖 Initializing AI Strategic Assistant...');
        this.createAIInterface();
        this.setupEventListeners();
        this.loadConversationHistory();
    },

    // Create AI Assistant Interface
    createAIInterface() {
        const aiContainer = document.createElement('div');
        aiContainer.id = 'ai-assistant-container';
        aiContainer.innerHTML = `
            <!-- AI Assistant Toggle Button -->
            <div class="ai-toggle-button" onclick="LucidraAI.toggleAssistant()">
                <div class="ai-icon">🤖</div>
                <div class="ai-label">Strategic AI</div>
                <div class="ai-status" id="ai-status">Ready</div>
            </div>

            <!-- AI Assistant Panel -->
            <div class="ai-panel" id="ai-panel" style="display: none;">
                <div class="ai-header">
                    <div class="ai-title">
                        <span class="ai-icon">🤖</span>
                        Lucidra Strategic Assistant
                    </div>
                    <div class="ai-controls">
                        <button class="ai-minimize" onclick="LucidraAI.toggleAssistant()">−</button>
                    </div>
                </div>

                <div class="ai-conversation" id="ai-conversation">
                    <div class="ai-welcome-message">
                        <div class="ai-avatar">🤖</div>
                        <div class="ai-message">
                            <strong>Welcome to your Strategic AI Assistant!</strong><br>
                            I'm here to help you with strategic planning using Lucidra's frameworks. 
                            Ask me about Porter's Five Forces, Blue Ocean Strategy, SWOT analysis, or any strategic challenge you're facing.
                        </div>
                    </div>
                </div>

                <div class="ai-input-section">
                    <div class="ai-suggestions" id="ai-suggestions">
                        <button onclick="LucidraAI.sendSuggestion('Help me analyze my industry using Porter\\'s Five Forces')">
                            🏢 Industry Analysis
                        </button>
                        <button onclick="LucidraAI.sendSuggestion('Guide me through Blue Ocean Strategy')">
                            🌊 Blue Ocean Strategy
                        </button>
                        <button onclick="LucidraAI.sendSuggestion('Create a SWOT analysis for my business')">
                            📊 SWOT Analysis
                        </button>
                    </div>
                    
                    <div class="ai-input-container">
                        <input type="text" 
                               id="ai-input" 
                               placeholder="Ask me about your strategic challenges..."
                               onkeypress="LucidraAI.handleKeyPress(event)">
                        <button class="ai-send-btn" onclick="LucidraAI.sendMessage()">
                            <span id="send-icon">📤</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- AI Assistant Styles -->
            <style>
                .ai-toggle-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
                    transition: all 0.3s ease;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 160px;
                }

                .ai-toggle-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
                }

                .ai-icon {
                    font-size: 1.2em;
                    animation: pulse 2s infinite;
                }

                .ai-label {
                    font-weight: 600;
                    font-size: 0.9em;
                }

                .ai-status {
                    font-size: 0.75em;
                    opacity: 0.8;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 2px 8px;
                    border-radius: 10px;
                }

                .ai-panel {
                    position: fixed;
                    bottom: 100px;
                    right: 20px;
                    width: 400px;
                    height: 500px;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    z-index: 1001;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .ai-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .ai-title {
                    font-weight: 600;
                    font-size: 1em;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .ai-minimize {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2em;
                }

                .ai-conversation {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: #f8f9fa;
                }

                .ai-welcome-message, .ai-message-container {
                    display: flex;
                    margin-bottom: 15px;
                    gap: 10px;
                }

                .ai-avatar {
                    font-size: 1.5em;
                    width: 35px;
                    text-align: center;
                }

                .ai-message {
                    background: white;
                    padding: 12px 15px;
                    border-radius: 15px;
                    border: 2px solid #e3f2fd;
                    flex: 1;
                    font-size: 0.9em;
                    line-height: 1.4;
                }

                .user-message {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    margin-left: 50px;
                }

                .ai-input-section {
                    padding: 15px 20px;
                    background: white;
                    border-top: 2px solid #e3f2fd;
                }

                .ai-suggestions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 15px;
                }

                .ai-suggestions button {
                    background: #e3f2fd;
                    border: 1px solid #bbdefb;
                    padding: 6px 12px;
                    border-radius: 15px;
                    font-size: 0.8em;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .ai-suggestions button:hover {
                    background: #bbdefb;
                    transform: translateY(-1px);
                }

                .ai-input-container {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                #ai-input {
                    flex: 1;
                    padding: 12px 15px;
                    border: 2px solid #e3f2fd;
                    border-radius: 25px;
                    font-size: 0.9em;
                    outline: none;
                    transition: border-color 0.3s ease;
                }

                #ai-input:focus {
                    border-color: #667eea;
                }

                .ai-send-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1em;
                    transition: all 0.3s ease;
                }

                .ai-send-btn:hover {
                    transform: scale(1.1);
                }

                .ai-processing {
                    opacity: 0.7;
                    pointer-events: none;
                }

                .ai-typing {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: #666;
                    font-style: italic;
                    font-size: 0.8em;
                }

                .typing-dots {
                    display: inline-flex;
                    gap: 2px;
                }

                .typing-dot {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #667eea;
                    animation: typing 1.5s infinite;
                }

                .typing-dot:nth-child(2) { animation-delay: 0.3s; }
                .typing-dot:nth-child(3) { animation-delay: 0.6s; }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                @keyframes typing {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1); }
                }

                /* Responsive design */
                @media (max-width: 480px) {
                    .ai-panel {
                        width: calc(100vw - 40px);
                        height: 400px;
                        right: 20px;
                        left: 20px;
                    }
                    
                    .ai-toggle-button {
                        min-width: 140px;
                        padding: 12px 15px;
                    }
                }
            </style>
        `;

        document.body.appendChild(aiContainer);
    },

    // Toggle AI Assistant Panel
    toggleAssistant() {
        const panel = document.getElementById('ai-panel');
        const isVisible = panel.style.display !== 'none';
        
        if (isVisible) {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
            // Focus on input when opening
            setTimeout(() => {
                document.getElementById('ai-input').focus();
            }, 100);
        }
    },

    // Handle keyboard input
    handleKeyPress(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    },

    // Send suggested query
    sendSuggestion(suggestion) {
        document.getElementById('ai-input').value = suggestion;
        this.sendMessage();
    },

    // Send message to AI
    async sendMessage() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        
        if (!message || this.isProcessing) return;

        // Clear input and show processing state
        input.value = '';
        this.isProcessing = true;
        this.updateStatus('Processing...');
        
        // Add user message to conversation
        this.addMessageToUI(message, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get user context
            const userContext = this.getUserContext();
            
            // Simulate AI response (replace with actual API call)
            const response = await this.processStrategicQuery(message, userContext);
            
            // Remove typing indicator and show response
            this.hideTypingIndicator();
            this.addMessageToUI(response, 'assistant');
            
        } catch (error) {
            console.error('❌ AI Assistant Error:', error);
            this.hideTypingIndicator();
            this.addMessageToUI('I apologize, but I encountered an error. Please try again.', 'assistant');
        }
        
        this.isProcessing = false;
        this.updateStatus('Ready');
    },

    // Process strategic query (simulation)
    async processStrategicQuery(query, userContext) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Analyze query and provide framework-specific guidance
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.includes('porter') || lowerQuery.includes('five forces')) {
            return this.generatePortersResponse(query, userContext);
        } else if (lowerQuery.includes('blue ocean')) {
            return this.generateBlueOceanResponse(query, userContext);
        } else if (lowerQuery.includes('swot')) {
            return this.generateSWOTResponse(query, userContext);
        } else if (lowerQuery.includes('canvas') || lowerQuery.includes('business model')) {
            return this.generateCanvasResponse(query, userContext);
        } else {
            return this.generateGeneralResponse(query, userContext);
        }
    },

    // Generate Porter's Five Forces response
    generatePortersResponse(query, context) {
        return `**🏢 Porter's Five Forces Analysis**

Based on your query about industry analysis, here's how to approach it:

**1. Competitive Rivalry** 📊
- Assess the number and strength of competitors
- Look at market growth rate and differentiation levels
- *Tip: Use Lucidra's Strategic Intelligence module for real-time competitor data*

**2. Supplier Power** 🏭
- Evaluate supplier concentration and switching costs
- Consider supplier integration possibilities
- *Action: Map your key suppliers in the Process Management module*

**3. Buyer Power** 🛍️
- Analyze customer concentration and price sensitivity
- Assess switching costs and substitute availability
- *Next step: Review your customer segments in the Business Model Canvas*

**4. Threat of Substitutes** 🔄
- Identify alternative solutions to your offering
- Evaluate price-performance trade-offs
- *Recommendation: Use Blue Ocean tools to find uncontested market space*

**5. Barriers to Entry** 🚪
- Consider economies of scale, capital requirements
- Evaluate regulatory barriers and brand loyalty

Would you like me to help you dive deeper into any specific force for your industry?`;
    },

    // Generate Blue Ocean response
    generateBlueOceanResponse(query, context) {
        return `**🌊 Blue Ocean Strategy Guidance**

Let's explore how to create uncontested market space:

**Strategy Canvas** 📈
Start by plotting your industry's competing factors. In Lucidra's Blue Ocean module, you can:
- Map current competitive factors
- Identify which factors to eliminate, reduce, raise, or create
- Visualize your strategic profile vs competitors

**Four Actions Framework** 🎯
1. **Eliminate** - What industry factors should be removed?
2. **Reduce** - What factors should be reduced below industry standard?
3. **Raise** - What factors should be raised above industry standard?
4. **Create** - What new factors should be created?

**Value Innovation** 💡
Focus on both differentiation AND low cost by:
- Targeting non-customers (3 tiers)
- Breaking industry trade-offs
- Creating new demand

**${context.userType === 'ceo' ? 'CEO Focus' : context.userType === 'strategy-manager' ? 'Strategic Focus' : 'Practical Focus'}:**
${context.userType === 'ceo' ? 'Consider the strategic implications for your entire business model' : context.userType === 'strategy-manager' ? 'Develop detailed implementation plans for each strategic move' : 'Focus on operational changes needed to support the new strategy'}

Ready to start mapping your industry's strategy canvas?`;
    },

    // Generate SWOT response
    generateSWOTResponse(query, context) {
        return `**📊 SWOT Analysis Framework**

Let's build a comprehensive SWOT analysis for your business:

**Strengths** 💪
Internal factors that give you advantage:
- Core competencies and capabilities
- Unique resources and assets
- Strong brand or market position
- *Use Lucidra's Financial module to quantify your strengths*

**Weaknesses** ⚠️
Internal factors that need improvement:
- Resource limitations or gaps
- Process inefficiencies
- Market positioning challenges
- *Tip: Map these in the Process Management module*

**Opportunities** 🌟
External factors you can leverage:
- Market trends and growth areas
- Regulatory changes or new technologies
- Partnership or expansion possibilities
- *Monitor these with Strategic Intelligence dashboard*

**Threats** ⚡
External factors that could harm your business:
- Competitive pressures
- Economic or regulatory changes
- Technology disruptions
- *Track threat indicators in real-time*

**Strategic Actions** 🎯
- SO strategies: Use strengths to capture opportunities
- WO strategies: Overcome weaknesses to pursue opportunities  
- ST strategies: Use strengths to avoid threats
- WT strategies: Minimize weaknesses and avoid threats

Would you like help identifying specific SWOT factors for your industry?`;
    },

    // Generate Canvas response
    generateCanvasResponse(query, context) {
        return `**🎨 Business Model Canvas Guidance**

Let's optimize your business model design:

**Key Building Blocks:**

**1. Value Propositions** 🎯
- What unique value do you deliver?
- Which customer problems are you solving?
- *Use Lucidra's Canvas module for interactive mapping*

**2. Customer Segments** 👥
- Who are your most important customers?
- Which segments are most profitable?
- *Link to your SWOT opportunities*

**3. Channels** 📢
- How do you reach and deliver to customers?
- Which channels are most effective?

**4. Customer Relationships** 🤝
- What type of relationship do you maintain?
- How do you acquire, retain, and grow customers?

**5. Revenue Streams** 💰
- How does each value proposition generate revenue?
- *Connect to Financial Intelligence for optimization*

**6. Key Resources** 🏗️
- What key resources do your value propositions require?

**7. Key Activities** ⚙️
- What key activities do your value propositions require?
- *Map these in Process Management*

**8. Key Partnerships** 🤝
- Who are your key partners and suppliers?

**9. Cost Structure** 📊
- What are the most important costs?
- *Analyze with Financial frameworks*

Ready to dive into any specific canvas section?`;
    },

    // Generate general strategic response
    generateGeneralResponse(query, context) {
        const userRole = context.userType || 'strategist';
        return `**🤖 Strategic Guidance**

Based on your question about "${query}", here are some strategic considerations:

**Framework Recommendations:**
- **Porter's Five Forces**: Analyze your competitive environment
- **Blue Ocean Strategy**: Find uncontested market opportunities  
- **SWOT Analysis**: Assess internal strengths/weaknesses and external opportunities/threats
- **Business Model Canvas**: Map and optimize your value creation

**Role-Specific Focus** (${context.userTypeName}):
${this.getRoleSpecificGuidance(userRole)}

**Next Steps:**
1. Choose the most relevant framework for your challenge
2. Use Lucidra's interactive modules to apply the framework
3. Develop specific action plans based on insights

**Available Resources:**
- Strategic Intelligence dashboard for market data
- Process Management for workflow optimization
- Financial Intelligence for performance analysis

Would you like me to guide you through applying any specific framework to your situation?`;
    },

    // Get role-specific guidance
    getRoleSpecificGuidance(userRole) {
        const guidance = {
            'ceo': 'Focus on portfolio strategy, competitive positioning, and long-term value creation opportunities.',
            'strategy-manager': 'Develop detailed strategic plans, conduct thorough analysis, and create implementation roadmaps.',
            'operations-manager': 'Optimize processes, improve efficiency, and align operations with strategic objectives.',
            'financial-analyst': 'Quantify strategic options, assess financial implications, and build investment cases.',
            'entrepreneur': 'Validate business ideas, identify market opportunities, and build sustainable competitive advantages.'
        };
        return guidance[userRole] || 'Apply frameworks systematically to build competitive advantage.';
    },

    // Get user context
    getUserContext() {
        // Get current user from user journey system
        const userJourney = window.LucidraUserJourney;
        const currentUser = userJourney ? userJourney.currentUser : null;
        
        return {
            userType: currentUser,
            userTypeName: currentUser ? userJourney.userTypes[currentUser]?.name : 'Strategic Advisor',
            timestamp: new Date().toISOString()
        };
    },

    // Add message to UI
    addMessageToUI(message, sender) {
        const conversation = document.getElementById('ai-conversation');
        const messageContainer = document.createElement('div');
        messageContainer.className = 'ai-message-container';
        
        if (sender === 'user') {
            messageContainer.innerHTML = `
                <div class="ai-message user-message">${message}</div>
            `;
        } else {
            messageContainer.innerHTML = `
                <div class="ai-avatar">🤖</div>
                <div class="ai-message">${message}</div>
            `;
        }
        
        conversation.appendChild(messageContainer);
        conversation.scrollTop = conversation.scrollHeight;
        
        // Store in conversation history
        this.conversation.push({ message, sender, timestamp: Date.now() });
    },

    // Show typing indicator
    showTypingIndicator() {
        const conversation = document.getElementById('ai-conversation');
        const typingIndicator = document.createElement('div');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.className = 'ai-message-container';
        typingIndicator.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="ai-typing">
                Thinking<span class="typing-dots">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </span>
            </div>
        `;
        conversation.appendChild(typingIndicator);
        conversation.scrollTop = conversation.scrollHeight;
    },

    // Hide typing indicator
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    },

    // Update status
    updateStatus(status) {
        const statusElement = document.getElementById('ai-status');
        if (statusElement) {
            statusElement.textContent = status;
        }
    },

    // Setup event listeners
    setupEventListeners() {
        // Listen for user type changes
        document.addEventListener('userTypeChanged', (event) => {
            this.currentUser = event.detail.userType;
            console.log('🤖 AI Assistant updated user context:', this.currentUser);
        });
    },

    // Load conversation history
    loadConversationHistory() {
        try {
            const history = localStorage.getItem('lucidra-ai-conversation');
            if (history) {
                this.conversation = JSON.parse(history);
            }
        } catch (error) {
            console.warn('Could not load AI conversation history:', error);
            this.conversation = [];
        }
    },

    // Save conversation history
    saveConversationHistory() {
        try {
            localStorage.setItem('lucidra-ai-conversation', JSON.stringify(this.conversation));
        } catch (error) {
            console.warn('Could not save AI conversation history:', error);
        }
    }
};

// Initialize AI Assistant when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other systems to initialize first
    setTimeout(() => {
        window.LucidraAI.init();
    }, 1000);
});

// Auto-save conversation history before page unload
window.addEventListener('beforeunload', function() {
    if (window.LucidraAI) {
        window.LucidraAI.saveConversationHistory();
    }
});