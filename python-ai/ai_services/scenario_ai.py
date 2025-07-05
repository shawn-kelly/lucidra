from flask import Flask, request, jsonify
import anthropic
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Initialize Claude client
client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

@app.route("/analyze_scenario", methods=["POST"])
def analyze_scenario():
    data = request.json
    scenario_text = data.get("scenario", "")
    
    try:
        # Call Claude for analysis
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
        return jsonify({"ai_analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
