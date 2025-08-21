/**
 * LUCIDRA LOGO MANAGEMENT SYSTEM
 * 
 * Handles logo integration, fallbacks, and dynamic updates
 */

window.LucidraLogo = {
    
    // Logo configuration
    config: {
        // Primary logo URL - LUCIDRA OFFICIAL SVG LOGO
        primaryLogo: './lucidra-logo.svg',
        
        // Fallback options
        fallbackLogo: './lucidra-logo-light.svg',
        
        // Logo variations for different contexts
        variations: {
            light: './lucidra-logo-light.svg', // For dark backgrounds
            dark: './lucidra-logo.svg',        // For light backgrounds
            icon: './lucidra-icon.svg',        // Icon only
            full: './lucidra-logo.svg'         // Full logo with tagline
        },
        
        // Default text fallback
        textFallback: 'LUCIDRA',
        tagline: 'Strategic Intelligence Platform'
    },

    // Initialize logo system
    init() {
        console.log('🎨 Initializing Lucidra Logo System...');
        this.loadLogos();
        this.setupLogoPlaceholders();
        this.createLogoUploadInterface();
    },

    // Load and place logos throughout the site
    loadLogos() {
        // Main dashboard logo
        this.placeLogo('.dashboard-title', 'dashboard');
        
        // Navigation logo
        this.placeLogo('.nav-container', 'navigation', true);
        
        // Video canvas logos
        this.setupVideoLogos();
        
        // Footer logo
        this.placeLogo('footer', 'footer');
    },

    // Place logo in specific element
    placeLogo(selector, context, prepend = false) {
        const element = document.querySelector(selector);
        if (!element) return;

        const logoImg = this.createLogoElement(context);
        
        if (prepend) {
            element.insertBefore(logoImg, element.firstChild);
        } else {
            // Replace text with logo + text
            const currentText = element.textContent;
            element.innerHTML = '';
            element.appendChild(logoImg);
            
            if (currentText && currentText !== 'LUCIDRA') {
                const textSpan = document.createElement('span');
                textSpan.textContent = currentText;
                textSpan.style.marginLeft = '10px';
                element.appendChild(textSpan);
            }
        }
    },

    // Create logo element with fallback handling
    createLogoElement(context = 'default') {
        const logoImg = document.createElement('img');
        
        // Set appropriate logo class
        const logoClasses = {
            dashboard: 'lucidra-logo dashboard-logo',
            navigation: 'lucidra-logo nav-logo', 
            footer: 'lucidra-logo footer-logo',
            video: 'lucidra-logo video-logo',
            default: 'lucidra-logo'
        };
        
        logoImg.className = logoClasses[context] || logoClasses.default;
        logoImg.alt = 'Lucidra - Strategic Intelligence Platform';
        logoImg.title = 'Lucidra - Strategic Intelligence Platform';
        
        // Try primary logo first
        logoImg.src = this.config.primaryLogo;
        
        // Setup fallback chain
        logoImg.onerror = () => this.handleLogoError(logoImg, context);
        
        return logoImg;
    },

    // Handle logo loading errors with fallback chain
    handleLogoError(logoImg, context) {
        if (logoImg.src === this.config.primaryLogo) {
            // Try fallback logo
            logoImg.src = this.config.fallbackLogo;
        } else if (logoImg.src === this.config.fallbackLogo) {
            // Try appropriate variation
            const variation = this.selectLogoVariation(context);
            if (variation) {
                logoImg.src = variation;
            } else {
                this.replaceWithTextLogo(logoImg, context);
            }
        } else {
            // Final fallback: text logo
            this.replaceWithTextLogo(logoImg, context);
        }
    },

    // Select appropriate logo variation based on context
    selectLogoVariation(context) {
        const contextMap = {
            dashboard: this.config.variations.light, // Dashboard has dark gradient background
            navigation: this.config.variations.light, // Navigation has dark background
            footer: this.config.variations.dark,     // Footer typically light
            video: this.config.variations.light,    // Videos have dark backgrounds
            default: this.config.variations.full
        };
        
        return contextMap[context];
    },

    // Replace failed logo with styled text
    replaceWithTextLogo(logoImg, context) {
        const textLogo = document.createElement('div');
        textLogo.className = 'logo-placeholder';
        textLogo.textContent = this.config.textFallback;
        
        // Add context-specific styling
        if (context === 'dashboard') {
            textLogo.style.background = 'linear-gradient(45deg, #3498db, #2c3e50)';
            textLogo.style.color = 'white';
        } else if (context === 'navigation') {
            textLogo.style.background = 'rgba(52, 152, 219, 0.9)';
            textLogo.style.color = 'white';
        }
        
        logoImg.parentNode.replaceChild(textLogo, logoImg);
        
        console.log(`🎨 Using text fallback for ${context} logo`);
    },

    // Setup logo placeholders where logos should appear
    setupLogoPlaceholders() {
        // Create logo placeholder in key locations if they don't exist
        const locations = [
            { selector: '.dashboard-header', context: 'dashboard' },
            { selector: '.workspace-header', context: 'workspace' },
            { selector: '.modal-content', context: 'modal' }
        ];

        locations.forEach(location => {
            const element = document.querySelector(location.selector);
            if (element && !element.querySelector('.lucidra-logo, .logo-placeholder')) {
                const logoElement = this.createLogoElement(location.context);
                element.insertBefore(logoElement, element.firstChild);
            }
        });
    },

    // Setup logos for video generation
    setupVideoLogos() {
        // Add logo overlay function for video generation
        window.addLogoToCanvas = (ctx, canvas) => {
            // This will be called during video generation
            const logoText = this.config.textFallback;
            
            // Logo background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(20, 20, 200, 60);
            
            // Logo text
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(logoText, 120, 55);
            
            // Tagline
            ctx.font = '12px Arial';
            ctx.fillText(this.config.tagline, 120, 70);
        };
    },

    // Create interface for logo upload/management
    createLogoUploadInterface() {
        // Add logo management button to navigation
        const logoBtn = document.createElement('button');
        logoBtn.innerHTML = '🎨 Logo';
        logoBtn.style.cssText = `
            background: rgba(52, 152, 219, 0.8);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9em;
            margin: 0 5px;
        `;
        logoBtn.onclick = () => this.showLogoManager();
        
        // Add to navigation if it exists
        const nav = document.querySelector('.nav-container, nav');
        if (nav) {
            nav.appendChild(logoBtn);
        }
    },

    // Show logo management interface
    showLogoManager() {
        const modal = document.createElement('div');
        modal.style.cssText = `
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
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            ">
                <h2 style="color: #2c3e50; margin-bottom: 20px;">🎨 Lucidra Logo Management</h2>
                
                <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                    <h3 style="color: #34495e;">Current Logo Status</h3>
                    <div id="logo-status">
                        <p>Primary: <span style="color: #e74c3c;">Not loaded</span></p>
                        <p>Fallback: <span style="color: #e74c3c;">Not loaded</span></p>
                        <p>Current: <span style="color: #f39c12;">Text placeholder</span></p>
                    </div>
                </div>
                
                <div style="margin: 20px 0;">
                    <h3 style="color: #34495e;">Upload New Logo</h3>
                    <input type="file" id="logo-upload" accept="image/*" style="margin: 10px 0;">
                    <br>
                    <button onclick="LucidraLogo.uploadLogo()" style="
                        background: #27ae60;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 5px;
                    ">
                        Upload Logo
                    </button>
                </div>
                
                <div style="margin: 20px 0;">
                    <h3 style="color: #34495e;">Logo URL</h3>
                    <input type="url" id="logo-url" placeholder="Enter logo URL" style="
                        width: 80%;
                        padding: 10px;
                        border: 2px solid #bdc3c7;
                        border-radius: 6px;
                        margin: 10px 0;
                    ">
                    <br>
                    <button onclick="LucidraLogo.setLogoFromURL()" style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 5px;
                    ">
                        Set Logo from URL
                    </button>
                </div>
                
                <div style="margin: 20px 0;">
                    <button onclick="LucidraLogo.testAllLogos()" style="
                        background: #f39c12;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 5px;
                    ">
                        Test Logo Loading
                    </button>
                    <button onclick="LucidraLogo.resetLogos()" style="
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 5px;
                    ">
                        Reset to Default
                    </button>
                </div>
                
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #95a5a6;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 20px;
                ">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.updateLogoStatus();
    },

    // Upload logo file
    uploadLogo() {
        const fileInput = document.getElementById('logo-upload');
        const file = fileInput.files[0];
        
        if (!file) {
            alert('Please select a logo file first.');
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const logoDataURL = e.target.result;
            localStorage.setItem('lucidra_custom_logo', logoDataURL);
            this.config.primaryLogo = logoDataURL;
            this.refreshAllLogos();
            alert('✅ Logo uploaded successfully!');
            this.updateLogoStatus();
        };
        reader.readAsDataURL(file);
    },

    // Set logo from URL
    setLogoFromURL() {
        const urlInput = document.getElementById('logo-url');
        const logoURL = urlInput.value.trim();
        
        if (!logoURL) {
            alert('Please enter a logo URL.');
            return;
        }
        
        // Test if URL loads
        const testImg = new Image();
        testImg.onload = () => {
            this.config.primaryLogo = logoURL;
            localStorage.setItem('lucidra_logo_url', logoURL);
            this.refreshAllLogos();
            alert('✅ Logo URL set successfully!');
            this.updateLogoStatus();
        };
        testImg.onerror = () => {
            alert('❌ Could not load logo from that URL. Please check the URL and try again.');
        };
        testImg.src = logoURL;
    },

    // Test all logo variations
    testAllLogos() {
        const logos = [
            this.config.primaryLogo,
            this.config.fallbackLogo,
            ...Object.values(this.config.variations)
        ];
        
        let results = 'Logo Loading Test Results:\n\n';
        let testsCompleted = 0;
        
        logos.forEach((logoURL, index) => {
            if (!logoURL) {
                results += `Logo ${index + 1}: Not configured\n`;
                testsCompleted++;
                if (testsCompleted === logos.length) {
                    alert(results);
                }
                return;
            }
            
            const testImg = new Image();
            testImg.onload = () => {
                results += `Logo ${index + 1}: ✅ Loads successfully\n`;
                testsCompleted++;
                if (testsCompleted === logos.length) {
                    alert(results);
                }
            };
            testImg.onerror = () => {
                results += `Logo ${index + 1}: ❌ Failed to load\n`;
                testsCompleted++;
                if (testsCompleted === logos.length) {
                    alert(results);
                }
            };
            testImg.src = logoURL;
        });
    },

    // Reset logos to default
    resetLogos() {
        localStorage.removeItem('lucidra_custom_logo');
        localStorage.removeItem('lucidra_logo_url');
        this.config.primaryLogo = './assets/lucidra-logo.png';
        this.refreshAllLogos();
        alert('✅ Logos reset to default configuration.');
        this.updateLogoStatus();
    },

    // Refresh all logos on the page
    refreshAllLogos() {
        // Remove existing logos
        document.querySelectorAll('.lucidra-logo, .logo-placeholder').forEach(logo => {
            logo.remove();
        });
        
        // Reload logos
        this.loadLogos();
        
        console.log('🔄 All logos refreshed');
    },

    // Update logo status display
    updateLogoStatus() {
        const statusDiv = document.getElementById('logo-status');
        if (!statusDiv) return;
        
        // Test primary logo
        const testPrimary = new Image();
        const testFallback = new Image();
        
        testPrimary.onload = () => {
            statusDiv.innerHTML = statusDiv.innerHTML.replace(
                'Primary: <span style="color: #e74c3c;">Not loaded</span>',
                'Primary: <span style="color: #27ae60;">✅ Loaded</span>'
            );
        };
        
        testFallback.onload = () => {
            statusDiv.innerHTML = statusDiv.innerHTML.replace(
                'Fallback: <span style="color: #e74c3c;">Not loaded</span>',
                'Fallback: <span style="color: #27ae60;">✅ Loaded</span>'
            );
        };
        
        testPrimary.src = this.config.primaryLogo;
        testFallback.src = this.config.fallbackLogo;
    },

    // Load saved logo preferences
    loadSavedLogos() {
        const customLogo = localStorage.getItem('lucidra_custom_logo');
        const logoURL = localStorage.getItem('lucidra_logo_url');
        
        if (customLogo) {
            this.config.primaryLogo = customLogo;
        } else if (logoURL) {
            this.config.primaryLogo = logoURL;
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (window.LucidraLogo) {
        window.LucidraLogo.loadSavedLogos();
        window.LucidraLogo.init();
    }
});

// Export for global access
window.LucidraLogo = window.LucidraLogo;