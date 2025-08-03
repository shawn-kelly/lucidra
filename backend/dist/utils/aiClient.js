"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeScenario = analyzeScenario;
const axios_1 = __importDefault(require("axios"));
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:5000";
const AI_SERVICES = [
    {
        name: 'primary',
        endpoint: `${AI_SERVICE_URL}/analyze_scenario`,
        priority: 1,
        costPerToken: 0.001,
        maxRetries: 2,
        timeout: 30000,
        headers: {}
    },
    {
        name: 'openai',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        priority: 2,
        costPerToken: 0.002,
        maxRetries: 3,
        timeout: 45000,
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    },
    {
        name: 'anthropic',
        endpoint: 'https://api.anthropic.com/v1/messages',
        priority: 3,
        costPerToken: 0.0015,
        maxRetries: 2,
        timeout: 60000,
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY || '',
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
        }
    }
];
async function analyzeScenario(scenario, preferredService) {
    const services = preferredService
        ? AI_SERVICES.filter(s => s.name === preferredService).concat(AI_SERVICES.filter(s => s.name !== preferredService))
        : AI_SERVICES.sort((a, b) => a.priority - b.priority);
    let lastError = null;
    for (const service of services) {
        if (!isServiceAvailable(service)) {
            console.log(`Skipping ${service.name} - missing configuration`);
            continue;
        }
        try {
            console.log(`Attempting analysis with ${service.name}`);
            const result = await callAIService(service, scenario);
            console.log(`Successfully analyzed with ${service.name}`);
            return result;
        }
        catch (error) {
            console.warn(`${service.name} failed:`, error instanceof Error ? error.message : String(error));
            lastError = error instanceof Error ? error : new Error(String(error));
            continue;
        }
    }
    throw lastError || new Error('All AI services failed');
}
function isServiceAvailable(service) {
    switch (service.name) {
        case 'primary':
            return true;
        case 'openai':
            return !!process.env.OPENAI_API_KEY;
        case 'anthropic':
            return !!process.env.ANTHROPIC_API_KEY;
        default:
            return false;
    }
}
async function callAIService(service, scenario) {
    const maxRetries = service.maxRetries;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            let requestData;
            let extractResponse;
            switch (service.name) {
                case 'primary':
                    requestData = { scenario };
                    extractResponse = (data) => data.ai_analysis;
                    break;
                case 'openai':
                    requestData = {
                        model: 'gpt-4',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a strategic business analyst. Analyze the given scenario and provide comprehensive insights including risks, opportunities, and recommendations.'
                            },
                            {
                                role: 'user',
                                content: `Analyze this business scenario: ${scenario}`
                            }
                        ],
                        max_tokens: 1000,
                        temperature: 0.7
                    };
                    extractResponse = (data) => data.choices[0].message.content;
                    break;
                case 'anthropic':
                    requestData = {
                        model: 'claude-3-sonnet-20240229',
                        max_tokens: 1000,
                        messages: [
                            {
                                role: 'user',
                                content: `As a strategic business analyst, analyze this scenario and provide comprehensive insights: ${scenario}`
                            }
                        ]
                    };
                    extractResponse = (data) => data.content[0].text;
                    break;
                default:
                    throw new Error(`Unknown service: ${service.name}`);
            }
            const response = await axios_1.default.post(service.endpoint, requestData, {
                headers: service.headers,
                timeout: service.timeout
            });
            return extractResponse(response.data);
        }
        catch (error) {
            attempt++;
            if (attempt >= maxRetries) {
                throw error;
            }
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`Retrying ${service.name} in ${delay}ms (attempt ${attempt}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error(`Failed after ${maxRetries} attempts`);
}
//# sourceMappingURL=aiClient.js.map