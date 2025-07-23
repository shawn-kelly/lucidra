from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Check if we have an API key and it's valid
api_key = os.getenv("ANTHROPIC_API_KEY")
dev_mode = os.getenv("DEV_MODE", "false").lower() == "true"

client = None
if api_key and api_key != "sk-ant-api03-your-key-here":
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)
        print("✅ Claude API client initialized")
    except ImportError:
        print("⚠️ Anthropic package not installed. Install with: pip install anthropic")
        client = None
    except Exception as e:
        print(f"⚠️ Could not initialize Claude client: {e}")
        client = None
else:
    print("⚠️ No valid Anthropic API key found. Running in development mode.")

def get_mock_analysis(scenario_text):
    """Generate a realistic business analysis for development/demo purposes"""
    scenario_lower = scenario_text.lower()
    
    if any(word in scenario_lower for word in ['financial', 'budget', 'cost', 'revenue', 'funding']):
        return """**Financial Strategic Analysis**

Your scenario involves critical financial considerations that require careful planning and resource allocation.

**Key Strategic Recommendations:**
• Conduct comprehensive financial impact assessment
• Develop 3-scenario financial modeling (conservative, realistic, optimistic)
• Establish cash flow monitoring and early warning systems
• Consider phased implementation to manage financial risk

**Risk Factors:**
• Potential budget overruns during implementation
• Cash flow disruptions in transition periods
• Market volatility affecting projections

**Opportunities:**
• Cost optimization and efficiency improvements
• New revenue stream development
• Enhanced financial controls and reporting

**Next Steps:**
1. Complete detailed financial analysis within 2 weeks
2. Engage financial advisors for independent review
3. Establish monthly financial review checkpoints
4. Create contingency funding plans

*Analysis generated using business strategy frameworks*"""

    elif any(word in scenario_lower for word in ['technology', 'digital', 'automation', 'ai', 'system']):
        return """**Technology Integration Analysis**

This scenario presents significant opportunities for technological advancement and operational transformation.

**Strategic Implementation Framework:**
• Technology readiness assessment and gap analysis
• Phased rollout strategy with pilot testing
• Change management and training programs
• ROI measurement and success metrics

**Critical Success Factors:**
• Executive sponsorship and clear communication
• Adequate training and support resources
• Strong vendor partnerships and support
• Flexible timeline with built-in adjustments

**Risk Mitigation:**
• Comprehensive backup and rollback procedures
• Parallel system operation during transition
• External expert consultation
• User acceptance testing protocols

**Expected Benefits:**
• 25-35% efficiency improvement in target processes
• Enhanced data analytics and decision-making capabilities
• Improved customer experience and satisfaction
• Competitive advantage through innovation

*Assessment based on technology adoption best practices*"""

    elif any(word in scenario_lower for word in ['market', 'competition', 'customer', 'disruption']):
        return """**Market Strategy Analysis**

Your scenario addresses critical market dynamics that could significantly impact competitive positioning.

**Strategic Response Framework:**
• Comprehensive competitive intelligence gathering
• Customer needs analysis and market segmentation
• Value proposition refinement and differentiation
• Market entry or expansion strategy development

**Competitive Advantages:**
• First-mover opportunities in emerging segments
• Strategic partnerships and alliances
• Innovation and product development focus
• Enhanced customer relationship management

**Market Risks:**
• Increased competition and price pressure
• Changing customer preferences
• Regulatory or industry changes
• Economic fluctuations

**Action Plan:**
1. Conduct market research and customer surveys
2. Analyze competitor strategies and positioning
3. Develop differentiation strategy
4. Create go-to-market implementation plan

*Analysis based on market strategy frameworks and competitive intelligence*"""

    else:
        return """**Strategic Business Analysis**

Your scenario presents important strategic considerations requiring thoughtful planning and execution.

**Strategic Assessment:**
• Comprehensive stakeholder impact analysis
• Resource requirement evaluation
• Risk assessment and mitigation planning
• Success metrics and KPI development

**Key Recommendations:**
• Develop clear implementation roadmap with milestones
• Engage key stakeholders early in the process
• Create communication plan for all affected parties
• Establish monitoring and evaluation framework

**Implementation Considerations:**
• Change management and organizational readiness
• Resource allocation and capacity planning
• Timeline development with realistic milestones
• Contingency planning for potential challenges

**Success Factors:**
• Leadership commitment and sponsorship
• Clear communication and transparency
• Adequate resources and support
• Continuous monitoring and adaptation

*Analysis generated using strategic planning methodologies*"""

@app.route("/analyze_scenario", methods=["POST"])
def analyze_scenario():
    data = request.json
    scenario_text = data.get("scenario", "")
    
    if not scenario_text:
        return jsonify({"error": "No scenario provided"}), 400
    
    try:
        if client and not dev_mode:
            # Use Claude API if available
            message = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1000,
                temperature=0.7,
                system="You are a strategic business analyst with expertise in organizational planning and scenario analysis. Provide detailed, actionable insights for business scenarios.",
                messages=[
                    {
                        "role": "user",
                        "content": f"Analyze this organizational scenario and predict potential impacts, opportunities, and strategic recommendations: {scenario_text}"
                    }
                ]
            )
            analysis = message.content[0].text
            return jsonify({"ai_analysis": analysis, "source": "claude_ai"})
        else:
            # Use mock analysis for development
            analysis = get_mock_analysis(scenario_text)
            return jsonify({"ai_analysis": analysis, "source": "mock_analysis"})
            
    except Exception as e:
        print(f"Error in AI analysis: {e}")
        # Fallback to mock analysis on any error
        analysis = get_mock_analysis(scenario_text)
        return jsonify({"ai_analysis": analysis, "source": "fallback_analysis"})

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    status = {
        "status": "healthy",
        "service": "Lucidra AI Service",
        "claude_api": "connected" if client else "unavailable",
        "dev_mode": dev_mode
    }
    return jsonify(status)

@app.route("/", methods=["GET"])
def home():
    """Home endpoint with service info"""
    return jsonify({
        "service": "Lucidra AI Service",
        "version": "1.0.0",
        "endpoints": [
            "/health - Health check",
            "/analyze_scenario - POST scenario analysis"
        ],
        "status": "running"
    })

if __name__ == "__main__":
    print("🚀 Starting Lucidra AI Service...")
    print(f"🔑 Claude API: {'✅ Connected' if client else '❌ Not available (using mock responses)'}")
    print(f"🔧 Dev Mode: {'✅ Enabled' if dev_mode else '❌ Disabled'}")
    print("🌐 Server starting on http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
