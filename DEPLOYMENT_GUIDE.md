# Lucidra GitHub Pages Deployment Guide

## 🌐 Live Demo

Once deployed, your Lucidra website will be available at:
**https://shawn-kelly.github.io/lucidra**

## 🚀 Automatic Deployment Setup

### 1. Enable GitHub Pages

1. Go to your repository: `https://github.com/shawn-kelly/lucidra`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The deployment workflow will automatically trigger on pushes to main/master

### 2. Repository Settings

Make sure your repository has:
- ✅ GitHub Actions enabled
- ✅ Pages permission set to "GitHub Actions"
- ✅ The main branch is named `main` or `master`

### 3. Automatic Deployment Process

The deployment happens automatically when you:
1. Push code to the main branch
2. The GitHub Action builds the React app
3. Deploys to GitHub Pages
4. Website becomes available at the GitHub Pages URL

## 🔧 Manual Deployment (if needed)

If you need to deploy manually:

```bash
# 1. Clone the repository
git clone https://github.com/shawn-kelly/lucidra.git
cd lucidra

# 2. Install dependencies
cd frontend
npm install

# 3. Build for production
npm run build

# 4. Deploy to GitHub Pages (requires gh-pages package)
npm install --save-dev gh-pages
npx gh-pages -d build
```

## 🎮 Demo Mode Features

The GitHub Pages deployment includes a special demo mode that:

### ✨ **What Works Without Backend**
- Complete UI/UX demonstration
- AI activation system simulation
- Token usage tracking (simulated)
- Opt-in/opt-out flows
- Upgrade modal and pricing
- Scenario analysis with realistic responses
- Fallback logic demonstration

### 🔄 **Simulated Features**
- **Session Management**: Creates demo session with realistic data
- **Token Tracking**: Shows usage progression as you interact
- **AI Analysis**: Provides intelligent responses based on scenario keywords
- **Plan Limits**: Demonstrates free/basic/premium tier differences
- **Upgrade Flow**: Shows pricing and plan comparison

### 📊 **Interactive Elements**
- Real-time token meter updates
- Progress bars showing capacity
- Status indicators and badges
- Loading states and animations
- Error handling and alerts

## 🎯 Demo Testing Scenarios

Try these scenarios to see different responses:

### Financial Scenarios
```
"Our company is considering a major financial restructuring to improve cash flow and reduce operational costs."
```

### Technology Scenarios  
```
"We're evaluating the adoption of AI technology to automate our customer service processes."
```

### Market Scenarios
```
"A new competitor has entered our market with disruptive pricing and we need to respond strategically."
```

## 🛠️ Customization Options

### Environment Variables (Auto-configured for GitHub Pages)
```bash
REACT_APP_DEMO_MODE=true
REACT_APP_GITHUB_PAGES=true
REACT_APP_API_URL=/api
```

### Demo Data Customization
Edit `/frontend/src/hooks/useDemoAIManager.ts` to modify:
- Usage limits and plans
- Demo responses
- Session data
- Scenario keywords

## 📱 Responsive Design

The demo works perfectly on:
- 🖥️ Desktop computers
- 📱 Mobile phones  
- 📱 Tablets
- 🌐 All modern browsers

## 🔍 What Visitors Will See

### First Visit Experience
1. **Landing Page**: Clean, professional Lucidra branding
2. **Demo Banner**: Clear indication this is a demonstration
3. **Opt-in Flow**: Shows the AI activation system
4. **Feature Showcase**: All components working together

### Interactive Demo Flow
1. **Enable AI**: Click to opt-in and see token allocation
2. **Try Analysis**: Enter scenarios and see intelligent responses  
3. **Watch Limits**: See token usage update in real-time
4. **Test Fallback**: Reach limits to see coaching logic
5. **Explore Upgrade**: View pricing and plan options

## 🎨 Visual Features

### Professional UI Components
- **Token Meter**: Real-time usage visualization
- **Progress Bars**: Color-coded capacity indicators
- **Status Badges**: Clear AI availability indicators
- **Modal Dialogs**: Upgrade pricing and plan comparison
- **Alert Messages**: Contextual help and status updates

### Responsive Layout
- **Desktop**: Two-column layout with sidebar
- **Mobile**: Stacked layout optimized for touch
- **Tablet**: Flexible grid that adapts to screen size

## 📞 Support & Contact

For deployment issues or questions:

1. **GitHub Issues**: Create an issue in the repository
2. **Documentation**: Refer to the main README.md
3. **Code Review**: Check the deployment workflow logs

## 🚀 Go Live Checklist

- [ ] Repository exists at `github.com/shawn-kelly/lucidra`
- [ ] GitHub Pages is enabled in repository settings
- [ ] Main branch has all the latest code
- [ ] GitHub Actions workflow exists (`.github/workflows/deploy-gh-pages.yml`)
- [ ] Package.json has correct homepage URL
- [ ] Demo mode components are properly configured

## 🌟 Expected Results

Once deployed, visitors will experience:
- ⚡ Fast loading React application
- 🎮 Fully interactive demo mode
- 📊 Real-time usage tracking simulation
- 🔄 Complete AI activation system workflow
- 💰 Pricing and upgrade flow demonstration
- 📱 Mobile-responsive design
- 🎨 Professional, polished UI

---

**Your live demo will be available at: https://shawn-kelly.github.io/lucidra**

*Note: Allow 5-10 minutes for initial deployment after pushing to GitHub*