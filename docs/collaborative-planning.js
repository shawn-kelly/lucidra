/**
 * LUCIDRA REAL-TIME COLLABORATIVE PLANNING v1.0
 * 
 * Multi-user strategy canvas with real-time collaboration
 * Supports simultaneous editing, commenting, and team coordination
 */

window.LucidraCollaboration = {
    
    // Collaboration Configuration
    config: {
        websocketUrl: 'wss://lucidra-collab.herokuapp.com/ws',
        maxUsers: 10,
        autoSaveInterval: 5000,
        conflictResolution: 'last-writer-wins',
        notificationDuration: 3000
    },

    // Collaboration State
    isConnected: false,
    currentSession: null,
    activeUsers: new Map(),
    localChanges: [],
    pendingSync: false,
    cursors: new Map(),

    // Initialize Collaborative Planning
    init() {
        console.log('👥 Initializing Real-Time Collaborative Planning...');
        this.createCollaborationUI();
        this.setupEventListeners();
        this.initializeWebSocket();
    },

    // Create Collaboration Interface
    createCollaborationUI() {
        const collabContainer = document.createElement('div');
        collabContainer.id = 'collaboration-container';
        collabContainer.innerHTML = `
            <!-- Collaboration Panel -->
            <div class="collaboration-panel" id="collab-panel">
                <div class="collab-header">
                    <div class="collab-title">
                        <span class="collab-icon">👥</span>
                        Team Collaboration
                        <div class="connection-status" id="connection-status">
                            <div class="status-dot offline"></div>
                            <span class="status-text">Connecting...</span>
                        </div>
                    </div>
                    <div class="collab-controls">
                        <button class="collab-btn" onclick="LucidraCollaboration.shareSession()" title="Share Session">
                            📤 Share
                        </button>
                        <button class="collab-btn" onclick="LucidraCollaboration.togglePanel()" title="Toggle Panel">
                            📋
                        </button>
                    </div>
                </div>

                <div class="collab-content" id="collab-content">
                    <!-- Active Users Section -->
                    <div class="active-users-section">
                        <h3>👥 Active Users <span id="user-count">0</span></h3>
                        <div class="active-users-list" id="active-users-list">
                            <!-- Users will be populated here -->
                        </div>
                        <div class="invite-section">
                            <input type="text" id="invite-email" placeholder="colleague@company.com">
                            <button onclick="LucidraCollaboration.inviteUser()">📧 Invite</button>
                        </div>
                    </div>

                    <!-- Recent Activity Section -->
                    <div class="activity-section">
                        <h3>📝 Recent Activity</h3>
                        <div class="activity-feed" id="activity-feed">
                            <div class="activity-item">
                                <div class="activity-icon">🎯</div>
                                <div class="activity-text">
                                    <strong>You</strong> started collaborative session
                                    <div class="activity-time">Just now</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Comments Section -->
                    <div class="comments-section">
                        <h3>💬 Comments & Notes</h3>
                        <div class="comments-list" id="comments-list">
                            <!-- Comments will be populated here -->
                        </div>
                        <div class="comment-input-section">
                            <textarea id="comment-input" placeholder="Add a comment or note..."></textarea>
                            <button onclick="LucidraCollaboration.addComment()">📝 Add Comment</button>
                        </div>
                    </div>

                    <!-- Version History -->
                    <div class="version-section">
                        <h3>📊 Version History</h3>
                        <div class="version-list" id="version-list">
                            <!-- Version history will be populated here -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Collaboration Floating Widgets -->
            <div class="collab-widgets">
                <!-- Live Cursors will be added here -->
            </div>

            <!-- Session Share Modal -->
            <div class="share-modal" id="share-modal" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>📤 Share Collaboration Session</h3>
                        <button class="close-btn" onclick="LucidraCollaboration.closeShareModal()">✕</button>
                    </div>
                    <div class="modal-body">
                        <div class="share-option">
                            <label>📋 Session Link:</label>
                            <div class="link-container">
                                <input type="text" id="session-link" readonly>
                                <button onclick="LucidraCollaboration.copyLink()">📋 Copy</button>
                            </div>
                        </div>
                        <div class="share-option">
                            <label>🔐 Access Level:</label>
                            <select id="access-level">
                                <option value="edit">✏️ Can Edit</option>
                                <option value="comment">💬 Can Comment</option>
                                <option value="view">👀 View Only</option>
                            </select>
                        </div>
                        <div class="share-option">
                            <label>⏰ Expires:</label>
                            <select id="expiry-time">
                                <option value="1h">1 Hour</option>
                                <option value="24h">24 Hours</option>
                                <option value="7d">7 Days</option>
                                <option value="never">Never</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="primary-btn" onclick="LucidraCollaboration.generateShareLink()">
                            🚀 Generate Link
                        </button>
                    </div>
                </div>
            </div>

            <!-- Collaboration Styles -->
            <style>
                .collaboration-panel {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    width: 350px;
                    height: calc(100vh - 120px);
                    background: white;
                    border: 2px solid #e3f2fd;
                    border-radius: 15px;
                    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    font-family: 'Segoe UI', sans-serif;
                }

                .collab-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 13px 13px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .collab-title {
                    font-weight: 600;
                    font-size: 1em;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .connection-status {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.8em;
                    margin-top: 3px;
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                .status-dot.online { background: #4caf50; }
                .status-dot.offline { background: #f44336; }
                .status-dot.connecting { background: #ff9800; }

                .collab-controls {
                    display: flex;
                    gap: 8px;
                }

                .collab-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.8em;
                    transition: all 0.3s ease;
                }

                .collab-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-1px);
                }

                .collab-content {
                    flex: 1;
                    padding: 15px;
                    overflow-y: auto;
                }

                .active-users-section, .activity-section, .comments-section, .version-section {
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #e3f2fd;
                }

                .active-users-section h3, .activity-section h3, .comments-section h3, .version-section h3 {
                    color: #2c3e50;
                    font-size: 0.9em;
                    margin: 0 0 10px 0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                #user-count {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.7em;
                    font-weight: 700;
                }

                .active-users-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 10px;
                }

                .user-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 0.8em;
                    position: relative;
                    cursor: pointer;
                }

                .user-avatar.online::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 8px;
                    height: 8px;
                    background: #4caf50;
                    border: 2px solid white;
                    border-radius: 50%;
                }

                .invite-section {
                    display: flex;
                    gap: 8px;
                    margin-top: 10px;
                }

                #invite-email {
                    flex: 1;
                    padding: 8px 10px;
                    border: 1px solid #e3f2fd;
                    border-radius: 8px;
                    font-size: 0.8em;
                    outline: none;
                }

                #invite-email:focus {
                    border-color: #667eea;
                }

                .invite-section button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.8em;
                    white-space: nowrap;
                }

                .activity-feed {
                    max-height: 120px;
                    overflow-y: auto;
                }

                .activity-item {
                    display: flex;
                    gap: 10px;
                    padding: 8px 0;
                    border-bottom: 1px solid #f5f5f5;
                    font-size: 0.8em;
                }

                .activity-icon {
                    width: 25px;
                    text-align: center;
                    font-size: 1.2em;
                }

                .activity-text {
                    flex: 1;
                    color: #2c3e50;
                }

                .activity-time {
                    color: #7f8c8d;
                    font-size: 0.9em;
                    margin-top: 2px;
                }

                .comments-list {
                    max-height: 150px;
                    overflow-y: auto;
                    margin-bottom: 10px;
                }

                .comment-item {
                    background: #f8f9fa;
                    padding: 10px;
                    border-radius: 8px;
                    margin-bottom: 8px;
                    font-size: 0.8em;
                    border-left: 3px solid #667eea;
                }

                .comment-author {
                    font-weight: 600;
                    color: #2c3e50;
                    margin-bottom: 3px;
                }

                .comment-text {
                    color: #34495e;
                    line-height: 1.4;
                    margin-bottom: 3px;
                }

                .comment-time {
                    color: #7f8c8d;
                    font-size: 0.9em;
                }

                .comment-input-section {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                #comment-input {
                    width: 100%;
                    min-height: 60px;
                    padding: 8px 10px;
                    border: 1px solid #e3f2fd;
                    border-radius: 8px;
                    font-size: 0.8em;
                    resize: vertical;
                    outline: none;
                    font-family: inherit;
                }

                #comment-input:focus {
                    border-color: #667eea;
                }

                .comment-input-section button {
                    align-self: flex-end;
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.8em;
                }

                .version-list {
                    max-height: 100px;
                    overflow-y: auto;
                }

                .version-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 6px 0;
                    border-bottom: 1px solid #f5f5f5;
                    font-size: 0.8em;
                }

                .version-info {
                    color: #2c3e50;
                }

                .version-time {
                    color: #7f8c8d;
                    font-size: 0.9em;
                }

                /* Share Modal Styles */
                .share-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                }

                .modal-content {
                    background: white;
                    border-radius: 15px;
                    width: 450px;
                    max-width: 90vw;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                }

                .modal-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 13px 13px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-header h3 {
                    margin: 0;
                    font-size: 1.1em;
                }

                .close-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2em;
                }

                .modal-body {
                    padding: 20px;
                }

                .share-option {
                    margin-bottom: 15px;
                }

                .share-option label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: 0.9em;
                }

                .link-container {
                    display: flex;
                    gap: 8px;
                }

                .link-container input {
                    flex: 1;
                    padding: 10px;
                    border: 2px solid #e3f2fd;
                    border-radius: 8px;
                    font-size: 0.9em;
                    outline: none;
                }

                .link-container button, .share-option select {
                    padding: 10px 15px;
                    border: 2px solid #e3f2fd;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9em;
                }

                .share-option select {
                    width: 100%;
                    outline: none;
                }

                .modal-footer {
                    padding: 15px 20px;
                    text-align: right;
                    border-top: 1px solid #e3f2fd;
                }

                .primary-btn {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1em;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .primary-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
                }

                /* Live cursors */
                .live-cursor {
                    position: absolute;
                    pointer-events: none;
                    z-index: 10000;
                    transition: all 0.1s ease;
                }

                .cursor-pointer {
                    width: 20px;
                    height: 20px;
                    background: #667eea;
                    border-radius: 50% 0 50% 50%;
                    transform: rotate(-45deg);
                }

                .cursor-label {
                    background: #667eea;
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.7em;
                    margin-top: 5px;
                    transform: rotate(45deg);
                    white-space: nowrap;
                }

                /* Responsive design */
                @media (max-width: 768px) {
                    .collaboration-panel {
                        width: 100vw;
                        right: 0;
                        height: 300px;
                        top: auto;
                        bottom: 0;
                        border-radius: 15px 15px 0 0;
                    }
                    
                    .modal-content {
                        width: 95vw;
                        margin: 10px;
                    }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
            </style>
        `;

        document.body.appendChild(collabContainer);
    },

    // Initialize WebSocket Connection (simulated)
    initializeWebSocket() {
        console.log('🔌 Initializing WebSocket connection...');
        
        // Simulate connection establishment
        setTimeout(() => {
            this.isConnected = true;
            this.updateConnectionStatus('online');
            this.simulateCollaborativeSession();
        }, 2000);
    },

    // Simulate collaborative session
    simulateCollaborativeSession() {
        // Add some demo users
        this.addUser({ id: 'user1', name: 'Sarah Chen', role: 'Strategy Manager', avatar: 'SC' });
        this.addUser({ id: 'user2', name: 'Mike Rodriguez', role: 'CEO', avatar: 'MR' });
        this.addUser({ id: 'user3', name: 'Lisa Wang', role: 'Financial Analyst', avatar: 'LW' });

        // Simulate periodic activity
        setInterval(() => {
            this.simulateUserActivity();
        }, 15000);

        // Auto-save simulation
        setInterval(() => {
            this.autoSave();
        }, this.config.autoSaveInterval);
    },

    // Update connection status
    updateConnectionStatus(status) {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        
        if (statusDot && statusText) {
            statusDot.className = `status-dot ${status}`;
            
            const statusMessages = {
                'online': 'Connected',
                'offline': 'Disconnected', 
                'connecting': 'Connecting...'
            };
            
            statusText.textContent = statusMessages[status] || 'Unknown';
        }
    },

    // Add user to session
    addUser(user) {
        this.activeUsers.set(user.id, user);
        this.updateActiveUsersList();
        this.addActivity(`${user.name} joined the session`, 'user-join');
    },

    // Remove user from session
    removeUser(userId) {
        const user = this.activeUsers.get(userId);
        if (user) {
            this.activeUsers.delete(userId);
            this.updateActiveUsersList();
            this.addActivity(`${user.name} left the session`, 'user-leave');
        }
    },

    // Update active users display
    updateActiveUsersList() {
        const usersList = document.getElementById('active-users-list');
        const userCount = document.getElementById('user-count');
        
        if (usersList && userCount) {
            usersList.innerHTML = '';
            userCount.textContent = this.activeUsers.size;
            
            this.activeUsers.forEach(user => {
                const userElement = document.createElement('div');
                userElement.className = 'user-avatar online';
                userElement.textContent = user.avatar;
                userElement.title = `${user.name} (${user.role})`;
                usersList.appendChild(userElement);
            });
        }
    },

    // Add activity to feed
    addActivity(text, type = 'general') {
        const activityFeed = document.getElementById('activity-feed');
        if (!activityFeed) return;

        const icons = {
            'user-join': '👋',
            'user-leave': '👋',
            'edit': '✏️',
            'comment': '💬',
            'save': '💾',
            'general': '📝'
        };

        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">${icons[type] || '📝'}</div>
            <div class="activity-text">
                ${text}
                <div class="activity-time">${this.formatTime(new Date())}</div>
            </div>
        `;

        // Add to top of feed
        activityFeed.insertBefore(activityItem, activityFeed.firstChild);

        // Limit activity items
        while (activityFeed.children.length > 10) {
            activityFeed.removeChild(activityFeed.lastChild);
        }
    },

    // Add comment
    addComment() {
        const input = document.getElementById('comment-input');
        if (!input || !input.value.trim()) return;

        const comment = {
            id: Date.now(),
            author: 'You',
            text: input.value.trim(),
            timestamp: new Date()
        };

        this.displayComment(comment);
        this.addActivity(`You added a comment`, 'comment');
        
        input.value = '';
    },

    // Display comment
    displayComment(comment) {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-time">${this.formatTime(comment.timestamp)}</div>
        `;

        commentsList.insertBefore(commentElement, commentsList.firstChild);
    },

    // Share session
    shareSession() {
        const modal = document.getElementById('share-modal');
        if (modal) {
            modal.style.display = 'flex';
            // Generate session link
            const sessionLink = `https://lucidra.io/session/${this.generateSessionId()}`;
            document.getElementById('session-link').value = sessionLink;
        }
    },

    // Close share modal
    closeShareModal() {
        const modal = document.getElementById('share-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // Copy link to clipboard
    copyLink() {
        const linkInput = document.getElementById('session-link');
        if (linkInput) {
            linkInput.select();
            document.execCommand('copy');
            
            // Show temporary feedback
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = '✅ Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    },

    // Generate share link
    generateShareLink() {
        const accessLevel = document.getElementById('access-level').value;
        const expiryTime = document.getElementById('expiry-time').value;
        
        // Simulate link generation
        this.addActivity(`Generated share link with ${accessLevel} access`, 'general');
        this.closeShareModal();
        
        // Show success notification
        this.showNotification('Share link generated and copied to clipboard!', 'success');
    },

    // Generate session ID
    generateSessionId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },

    // Invite user
    inviteUser() {
        const emailInput = document.getElementById('invite-email');
        if (!emailInput || !emailInput.value.trim()) return;

        const email = emailInput.value.trim();
        
        // Simulate invitation
        this.addActivity(`Invited ${email} to join session`, 'user-join');
        this.showNotification(`Invitation sent to ${email}`, 'success');
        
        emailInput.value = '';
    },

    // Toggle collaboration panel
    togglePanel() {
        const panel = document.getElementById('collab-panel');
        if (panel) {
            const isVisible = panel.style.display !== 'none';
            panel.style.display = isVisible ? 'none' : 'block';
        }
    },

    // Simulate user activity
    simulateUserActivity() {
        const activities = [
            { user: 'Sarah Chen', action: 'updated Porter\'s Five Forces analysis', type: 'edit' },
            { user: 'Mike Rodriguez', action: 'added strategic comment', type: 'comment' },
            { user: 'Lisa Wang', action: 'modified financial projections', type: 'edit' }
        ];

        const activity = activities[Math.floor(Math.random() * activities.length)];
        this.addActivity(activity.action, activity.type);
    },

    // Auto-save function
    autoSave() {
        if (this.localChanges.length > 0) {
            this.addActivity('Auto-saved changes', 'save');
            this.localChanges = [];
        }
    },

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                ${message}
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
            border-radius: 10px;
            padding: 15px 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInNotification 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto-remove notification
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, this.config.notificationDuration);
    },

    // Format time helper
    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    },

    // Setup event listeners
    setupEventListeners() {
        // Listen for document changes
        document.addEventListener('input', (event) => {
            if (event.target.matches('.strategic-canvas input, .strategic-canvas textarea')) {
                this.trackLocalChange(event);
            }
        });

        // Listen for mouse movements (for cursor tracking)
        document.addEventListener('mousemove', (event) => {
            this.trackCursorMovement(event);
        });

        // Add notification animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInNotification {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutNotification {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    },

    // Track local changes
    trackLocalChange(event) {
        const change = {
            element: event.target.id || event.target.name,
            value: event.target.value,
            timestamp: Date.now()
        };
        
        this.localChanges.push(change);
        this.addActivity('You made changes to the canvas', 'edit');
    },

    // Track cursor movement (simplified)
    trackCursorMovement(event) {
        // Only track if collaboration is active and connected
        if (this.isConnected && this.activeUsers.size > 0) {
            // In a real implementation, this would send cursor position to other users
            // For now, we just update our local cursor tracking
        }
    }
};

// Initialize Collaborative Planning when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for other systems to initialize first
    setTimeout(() => {
        window.LucidraCollaboration.init();
    }, 1500);
});

// Add CSS animations for notifications
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('collab-animations')) {
        const style = document.createElement('style');
        style.id = 'collab-animations';
        style.textContent = `
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
    }
});