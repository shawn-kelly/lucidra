# Claude API Activation System for Lucidra

## Overview

The Claude API Activation System provides a comprehensive solution for managing AI usage in Lucidra with explicit user opt-in, token tracking, automatic fallback, and usage visualization.

## 🎯 Key Features

### 1. **Explicit Opt-In System**
- Users must explicitly enable AI analysis
- Clear consent flow with benefits explanation
- Easy opt-out functionality
- Session-based activation (doesn't persist between browser sessions)

### 2. **Token Usage Tracking**
- Real-time token and API call monitoring
- Per-session usage limits based on plan tiers
- Automatic deactivation when limits are exceeded
- Usage statistics and projections

### 3. **Plan-Based Limits**
- **Free Plan**: 1,000 tokens, 5 API calls per session
- **Basic Plan**: 10,000 tokens, 50 API calls per session
- **Premium Plan**: 100,000 tokens, 500 API calls per session

### 4. **Intelligent Fallback**
- Automatic switching to coaching logic when AI is unavailable
- Keyword-based scenario analysis
- Structured recommendations and insights
- Clear indication of fallback vs AI analysis

### 5. **Rich UX Components**
- Token meter with usage visualization
- Progress bars showing remaining capacity
- Upgrade prompts and plan comparison
- Status indicators and alerts

## 🏗️ Architecture

### Backend Components

#### `AIUsageTracker` (`backend/src/utils/aiUsageTracker.ts`)
```typescript
// Core functionality
AIUsageTracker.createSession(sessionId, plan)
AIUsageTracker.optInToAI(sessionId)
AIUsageTracker.canUseAI(sessionId)
AIUsageTracker.recordUsage(sessionId, tokens)
AIUsageTracker.getUsageStats(sessionId)
```

#### `FallbackCoach` (`backend/src/utils/fallbackCoach.ts`)
```typescript
// Intelligent fallback logic
FallbackCoach.analyzeScenario(scenario)
FallbackCoach.getCoachingTips()
FallbackCoach.getUpgradeMessage(plan)
```

### Frontend Components

#### `useAIManager` Hook (`frontend/src/hooks/useAIManager.ts`)
```typescript
const {
  usage,           // Current usage stats
  canUseAI,        // Whether AI is available
  optInToAI,       // Function to enable AI
  optOutOfAI,      // Function to disable AI
  analyzeScenario, // AI/fallback analysis
  loading,         // Loading state
  error           // Error state
} = useAIManager();
```

#### UI Components
- `TokenMeter`: Real-time usage visualization
- `AIOptInBanner`: User-friendly opt-in flow
- `UpgradeModal`: Plan comparison and upgrade flow

## 🚀 Usage Examples

### Basic Implementation

```typescript
import { useAIManager } from '../hooks/useAIManager';

function MyComponent() {
  const { usage, canUseAI, optInToAI, analyzeScenario } = useAIManager();
  
  const handleAnalysis = async (scenario: string) => {
    const result = await analyzeScenario(scenario);
    if (result) {
      console.log('Analysis:', result.ai_analysis);
      console.log('Used AI:', result.usedAI);
    }
  };
  
  if (!usage?.userOptedIn) {
    return <AIOptInBanner onOptIn={optInToAI} />;
  }
  
  return (
    <div>
      <TokenMeter usage={usage} />
      {/* Your component content */}
    </div>
  );
}
```

### Advanced Usage with Custom Handling

```typescript
function AdvancedComponent() {
  const {
    usage,
    canUseAI,
    analyzeScenario,
    getCoachingTips,
    error
  } = useAIManager();
  
  const handleSmartAnalysis = async (scenario: string) => {
    if (canUseAI) {
      // Try AI first
      const result = await analyzeScenario(scenario);
      return result;
    } else {
      // Get coaching tips as backup
      const tips = await getCoachingTips();
      return { tips, isFallback: true };
    }
  };
  
  return (
    <div>
      {usage && (
        <div>
          Tokens: {usage.tokensUsed}/{usage.tokensLimit}
          Calls: {usage.callsUsed}/{usage.callsLimit}
        </div>
      )}
    </div>
  );
}
```

## 📊 API Endpoints

### Scenario Analysis
```bash
POST /api/scenario/suggest
Content-Type: application/json
X-Session-Id: session_id_here

{
  "scenario": "Your business scenario description"
}
```

### Opt-In/Out
```bash
POST /api/scenario/opt-in
X-Session-Id: session_id_here

POST /api/scenario/opt-out
X-Session-Id: session_id_here
```

### Usage Statistics
```bash
GET /api/scenario/usage
X-Session-Id: session_id_here
```

## 🎨 UI/UX Features

### Token Meter
- Real-time usage bars for tokens and API calls
- Color-coded progress (green → yellow → orange → red)
- Remaining capacity display
- Plan information and status

### Opt-In Flow
- Clear benefit explanation
- Plan-specific limits display
- Security and privacy assurances
- One-click activation

### Upgrade Prompts
- Triggered at 80%+ usage
- Plan comparison modal
- Feature differentiation
- Upgrade call-to-actions

## 🔒 Security & Privacy

### Session Management
- Unique session IDs for each user session
- No persistent storage of user data
- Automatic session cleanup after 24 hours
- Local storage for session continuity

### Privacy Protection
- No user data stored beyond session scope
- AI usage limited to analysis only
- Clear data handling policies
- Opt-out available at any time

## ⚙️ Configuration

### Environment Variables
```bash
# Backend
ANTHROPIC_API_KEY=your_claude_api_key

# Frontend
REACT_APP_API_URL=http://localhost:4000/api
```

### Usage Limits Configuration
Edit `USAGE_LIMITS` in `backend/src/utils/aiUsageTracker.ts`:

```typescript
export const USAGE_LIMITS: UsageLimits = {
  free: { maxTokens: 1000, maxCalls: 5 },
  basic: { maxTokens: 10000, maxCalls: 50 },
  premium: { maxTokens: 100000, maxCalls: 500 }
};
```

## 🧪 Testing

### Manual Testing
1. Start the application
2. Navigate to scenario analysis
3. Observe opt-in banner
4. Enable AI and test usage tracking
5. Exceed limits to test fallback
6. Test opt-out functionality

### API Testing
```bash
# Test session creation and opt-in
curl -X POST http://localhost:4000/api/scenario/opt-in \
  -H "Content-Type: application/json"

# Test usage endpoint
curl -X GET http://localhost:4000/api/scenario/usage \
  -H "X-Session-Id: your_session_id"
```

## 🚢 Deployment Notes

### Production Considerations
1. Replace in-memory session storage with Redis
2. Implement proper user authentication
3. Add rate limiting and abuse protection
4. Monitor API usage and costs
5. Set up usage analytics

### Scaling
- Use Redis for session storage
- Implement proper caching strategies
- Add monitoring and alerting
- Consider API rate limiting

## 📈 Future Enhancements

### Planned Features
- User accounts and persistent usage history
- Advanced analytics and reporting
- Custom usage limits per organization
- Integration with payment processing
- API key management for enterprise users

### Monitoring
- Usage analytics dashboard
- Cost tracking and budgeting
- Performance monitoring
- Error tracking and alerting

## 🤝 Contributing

When working with the AI activation system:

1. Follow the existing patterns for session management
2. Update usage limits carefully
3. Test fallback logic thoroughly
4. Maintain UX consistency
5. Document new features

## 📝 Changelog

### v1.0.0 (Current)
- Initial implementation
- Basic usage tracking
- Fallback coaching logic
- React components and hooks
- Opt-in/opt-out functionality
- Token meter and progress bars
- Upgrade modal system

---

**Built with ❤️ for secure, user-friendly AI integration**