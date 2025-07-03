import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:5000";

export async function analyzeScenario(scenario: string): Promise<string> {
  const resp = await axios.post(`${AI_SERVICE_URL}/analyze_scenario`, { scenario });
  return resp.data.ai_analysis;
}
