from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Plug in your OpenAI API key
openai.api_key = "sk-..."

@app.route("/analyze_scenario", methods=["POST"])
def analyze_scenario():
    data = request.json
    scenario_text = data.get("scenario", "")
    # Call OpenAI for analysis (LLM or GPT-4)
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a strategic business analyst."},
            {"role": "user", "content": f"Analyze this organizational scenario and predict potential impacts: {scenario_text}"}
        ]
    )
    analysis = completion.choices[0].message["content"]
    return jsonify({"ai_analysis": analysis})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
