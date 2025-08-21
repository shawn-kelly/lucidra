/**
 * LUCIDRA WINDOW MANAGEMENT API v2.0
 * 
 * Comprehensive window management system using repository pattern
 * and agent-based state management for all modals, floating windows,
 * and overlays in the Lucidra platform.
 */

class LucidraWindowRepository {
    constructor() {
        this.windows = new Map();
        this.windowStack = [];
        this.minimizedWindows = new Map();
        this.windowStates = new Map();
        this.defaultConfig = {
            closeable: true,
            minimizable: true,
            resizable: false,
            draggable: true,
            backdrop: true,
            escapeClose: true,
            clickOutsideClose: false,
            zIndexBase: 1000
        };
        
        this.initializeEventListeners();
        console.log('🪟 Lucidra Window Management API v2.0 initialized');
    }

    /**
     * Initialize global event listeners for window management
     */
    initializeEventListeners() {
        // ESC key to close top window
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeTopWindow();
            }
        });

        // Prevent body scroll when modal is open
        document.addEventListener('keydown', (e) => {
            if (this.windowStack.length > 0 && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
            }
        });
    }

    /**
     * Create a new window with full controls
     */
    createWindow(id, options = {}) {
        const config = { ...this.defaultConfig, ...options };
        
        // Remove existing window if it exists
        this.destroyWindow(id);

        const windowElement = document.createElement('div');
        windowElement.className = 'lucidra-window-overlay';
        windowElement.id = `window-${id}`;
        windowElement.setAttribute('data-window-id', id);

        const zIndex = config.zIndexBase + this.windowStack.length;
        
        windowElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${config.backdrop ? 'rgba(0,0,0,0.8)' : 'transparent'};
            z-index: ${zIndex};
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: ${config.backdrop ? 'blur(5px)' : 'none'};
            animation: lucidraFadeIn 0.3s ease-out;
        `;

        const windowContent = document.createElement('div');
        windowContent.className = 'lucidra-window-content';
        windowContent.style.cssText = `
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: ${config.maxWidth || '90%'};
            max-height: ${config.maxHeight || '90%'};
            min-width: ${config.minWidth || '300px'};
            position: relative;
            overflow: hidden;
            animation: lucidraSlideIn 0.3s ease-out;
            display: flex;
            flex-direction: column;
        `;

        // Create window header with controls
        const windowHeader = this.createWindowHeader(id, config);
        windowContent.appendChild(windowHeader);

        // Create window body
        const windowBody = document.createElement('div');
        windowBody.className = 'lucidra-window-body';
        windowBody.style.cssText = `
            padding: 20px;
            overflow-y: auto;
            flex: 1;
            max-height: calc(90vh - 60px);
        `;
        windowContent.appendChild(windowBody);

        windowElement.appendChild(windowContent);

        // Add click outside to close if enabled
        if (config.clickOutsideClose) {
            windowElement.addEventListener('click', (e) => {
                if (e.target === windowElement) {
                    this.closeWindow(id);
                }
            });
        }

        // Add draggable functionality if enabled
        if (config.draggable) {
            this.makeDraggable(windowContent, windowHeader);
        }

        // Store window data
        this.windows.set(id, {
            element: windowElement,
            content: windowContent,
            body: windowBody,
            header: windowHeader,
            config: config,
            state: 'normal', // normal, minimized, maximized
            originalPosition: null,
            zIndex: zIndex
        });

        this.windowStack.push(id);
        document.body.appendChild(windowElement);

        return {
            element: windowElement,
            content: windowContent,
            body: windowBody,
            header: windowHeader
        };
    }

    /**
     * Create window header with minimize/close controls
     */
    createWindowHeader(windowId, config) {
        const header = document.createElement('div');
        header.className = 'lucidra-window-header';
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px 15px 0 0;
            cursor: ${config.draggable ? 'move' : 'default'};
            user-select: none;
        `;

        const titleContainer = document.createElement('div');
        titleContainer.className = 'lucidra-window-title';
        titleContainer.style.cssText = `
            font-weight: bold;
            font-size: 18px;
            flex: 1;
        `;
        
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'lucidra-window-controls';
        controlsContainer.style.cssText = `
            display: flex;
            gap: 10px;
            align-items: center;
        `;

        // Minimize button
        if (config.minimizable) {
            const minimizeBtn = this.createControlButton('−', 'Minimize', () => {
                this.minimizeWindow(windowId);
            });
            controlsContainer.appendChild(minimizeBtn);
        }

        // Close button
        if (config.closeable) {
            const closeBtn = this.createControlButton('×', 'Close', () => {
                this.closeWindow(windowId);
            });
            closeBtn.style.background = 'rgba(255,255,255,0.2)';
            controlsContainer.appendChild(closeBtn);
        }

        header.appendChild(titleContainer);
        header.appendChild(controlsContainer);

        return header;
    }

    /**
     * Create control button for window header
     */
    createControlButton(symbol, title, onclick) {
        const button = document.createElement('button');
        button.innerHTML = symbol;
        button.title = title;
        button.style.cssText = `
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        `;
        
        button.addEventListener('mouseenter', () => {
            button.style.background = 'rgba(255,255,255,0.3)';
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = 'rgba(255,255,255,0.1)';
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            onclick();
        });

        return button;
    }

    /**
     * Make window draggable
     */
    makeDraggable(element, header) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = element.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            
            element.style.position = 'fixed';
            element.style.left = startLeft + 'px';
            element.style.top = startTop + 'px';
            element.style.margin = '0';
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            e.preventDefault();
        });

        function handleMouseMove(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            element.style.left = (startLeft + deltaX) + 'px';
            element.style.top = (startTop + deltaY) + 'px';
        }

        function handleMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }

    /**
     * Set window title
     */
    setWindowTitle(windowId, title) {
        const windowData = this.windows.get(windowId);
        if (windowData) {
            const titleElement = windowData.header.querySelector('.lucidra-window-title');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }
    }

    /**
     * Set window content
     */
    setWindowContent(windowId, content) {
        const windowData = this.windows.get(windowId);
        if (windowData) {
            if (typeof content === 'string') {
                windowData.body.innerHTML = content;
            } else {
                windowData.body.innerHTML = '';
                windowData.body.appendChild(content);
            }
        }
    }

    /**
     * Minimize window
     */
    minimizeWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;

        windowData.state = 'minimized';
        windowData.element.style.display = 'none';
        
        // Create minimized window indicator
        this.createMinimizedIndicator(windowId);
        
        // Remove from active stack
        this.windowStack = this.windowStack.filter(id => id !== windowId);
        
        console.log(`🗗 Window ${windowId} minimized`);
    }

    /**
     * Create minimized window indicator in taskbar
     */
    createMinimizedIndicator(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;

        // Create or get taskbar
        let taskbar = document.getElementById('lucidra-taskbar');
        if (!taskbar) {
            taskbar = document.createElement('div');
            taskbar.id = 'lucidra-taskbar';
            taskbar.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 60px;
                background: rgba(255,255,255,0.95);
                backdrop-filter: blur(10px);
                border-top: 1px solid rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                padding: 0 20px;
                gap: 10px;
                z-index: 999999;
                box-shadow: 0 -2px 20px rgba(0,0,0,0.1);
            `;
            document.body.appendChild(taskbar);
        }

        const indicator = document.createElement('button');
        indicator.id = `minimized-${windowId}`;
        indicator.style.cssText = `
            background: #667eea;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
            max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        `;

        const title = windowData.header.querySelector('.lucidra-window-title').textContent;
        indicator.textContent = title || `Window ${windowId}`;
        indicator.title = `Click to restore: ${title}`;

        indicator.addEventListener('click', () => {
            this.restoreWindow(windowId);
        });

        indicator.addEventListener('mouseenter', () => {
            indicator.style.background = '#5a67d8';
            indicator.style.transform = 'scale(1.05)';
        });

        indicator.addEventListener('mouseleave', () => {
            indicator.style.background = '#667eea';
            indicator.style.transform = 'scale(1)';
        });

        taskbar.appendChild(indicator);
        this.minimizedWindows.set(windowId, indicator);
    }

    /**
     * Restore minimized window
     */
    restoreWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;

        windowData.state = 'normal';
        windowData.element.style.display = 'flex';
        
        // Update z-index to bring to front
        const newZIndex = this.defaultConfig.zIndexBase + this.windowStack.length;
        windowData.element.style.zIndex = newZIndex;
        windowData.zIndex = newZIndex;
        
        // Add back to active stack
        this.windowStack.push(windowId);
        
        // Remove minimized indicator
        const indicator = this.minimizedWindows.get(windowId);
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
            this.minimizedWindows.delete(windowId);
            
            // Remove taskbar if empty
            const taskbar = document.getElementById('lucidra-taskbar');
            if (taskbar && taskbar.children.length === 0) {
                document.body.removeChild(taskbar);
            }
        }
        
        console.log(`🗖 Window ${windowId} restored`);
    }

    /**
     * Close specific window
     */
    closeWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;

        // Add closing animation
        windowData.element.style.animation = 'lucidraFadeOut 0.2s ease-in forwards';
        
        setTimeout(() => {
            this.destroyWindow(windowId);
        }, 200);
        
        console.log(`✕ Window ${windowId} closed`);
    }

    /**
     * Close the topmost window
     */
    closeTopWindow() {
        if (this.windowStack.length > 0) {
            const topWindowId = this.windowStack[this.windowStack.length - 1];
            this.closeWindow(topWindowId);
        }
    }

    /**
     * Destroy window and clean up
     */
    destroyWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (windowData) {
            // Remove from DOM
            if (windowData.element.parentNode) {
                windowData.element.parentNode.removeChild(windowData.element);
            }
            
            // Clean up minimized indicator
            const indicator = this.minimizedWindows.get(windowId);
            if (indicator && indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
                this.minimizedWindows.delete(windowId);
            }
            
            // Remove from data structures
            this.windows.delete(windowId);
            this.windowStack = this.windowStack.filter(id => id !== windowId);
            this.windowStates.delete(windowId);
            
            // Remove taskbar if empty
            const taskbar = document.getElementById('lucidra-taskbar');
            if (taskbar && taskbar.children.length === 0) {
                document.body.removeChild(taskbar);
            }
        }
    }

    /**
     * Close all windows
     */
    closeAllWindows() {
        const windowIds = Array.from(this.windows.keys());
        windowIds.forEach(id => this.destroyWindow(id));
        console.log('✕ All windows closed');
    }

    /**
     * Get active windows count
     */
    getActiveWindowsCount() {
        return this.windowStack.length;
    }

    /**
     * Get minimized windows count
     */
    getMinimizedWindowsCount() {
        return this.minimizedWindows.size;
    }

    /**
     * Check if window exists
     */
    windowExists(windowId) {
        return this.windows.has(windowId);
    }

    /**
     * Focus window (bring to front)
     */
    focusWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (!windowData) return;

        // Remove from current position in stack
        this.windowStack = this.windowStack.filter(id => id !== windowId);
        // Add to top
        this.windowStack.push(windowId);
        
        // Update z-index
        const newZIndex = this.defaultConfig.zIndexBase + this.windowStack.length;
        windowData.element.style.zIndex = newZIndex;
        windowData.zIndex = newZIndex;
    }
}

// Initialize global window manager
window.LucidraWindows = new LucidraWindowRepository();

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes lucidraFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes lucidraFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes lucidraSlideIn {
        from { 
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
        }
        to { 
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    .lucidra-window-content:hover {
        box-shadow: 0 25px 80px rgba(0,0,0,0.4);
    }
    
    .lucidra-window-header {
        transition: background 0.3s ease;
    }
    
    .lucidra-window-body::-webkit-scrollbar {
        width: 8px;
    }
    
    .lucidra-window-body::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    
    .lucidra-window-body::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
    }
    
    .lucidra-window-body::-webkit-scrollbar-thumb:hover {
        background: #999;
    }
`;
document.head.appendChild(styleSheet);

console.log('🪟 Lucidra Window Management API v2.0 loaded successfully');