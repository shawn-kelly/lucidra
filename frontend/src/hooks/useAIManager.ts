import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface AIUsage {
  sessionId: string;
  plan: 'free' | 'basic' | 'premium';
  tokensUsed: number;
  tokensRemaining: number;
  tokensLimit: number;
  callsUsed: number;
  callsRemaining: number;
  callsLimit: number;
  isAiEnabled: boolean;
  userOptedIn: boolean;
  tokenUsagePercentage: number;
  callUsagePercentage: number;
  createdAt: string;
  lastUsedAt: string;
}

export interface AIAnalysisResult {
  scenario: string;
  ai_analysis: string;
  usedAI: boolean;
  usage: AIUsage;
  aiStatus: string;
}

export interface AIManagerState {
  usage: AIUsage | null;
  loading: boolean;
  error: string | null;
  canUseAI: boolean;
  aiStatus: string;
  sessionId: string | null;
}

export interface AIManagerActions {
  optInToAI: () => Promise<boolean>;
  optOutOfAI: () => Promise<boolean>;
  analyzeScenario: (scenario: string) => Promise<AIAnalysisResult | null>;
  refreshUsage: () => Promise<void>;
  getCoachingTips: () => Promise<string[]>;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Check if we're in demo mode
const isDemoMode = () => {
  return process.env.REACT_APP_DEMO_MODE === 'true' || 
         process.env.REACT_APP_GITHUB_PAGES === 'true' ||
         (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
};

export const useAIManager = (): AIManagerState & AIManagerActions => {
  const [state, setState] = useState<AIManagerState>({
    usage: null,
    loading: false,
    error: null,
    canUseAI: false,
    aiStatus: 'Unknown',
    sessionId: null
  });

  // Create axios instance with session management
  const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Request interceptor to add session ID
  apiClient.interceptors.request.use((config) => {
    const sessionId = localStorage.getItem('lucidra-session-id');
    if (sessionId) {
      config.headers['X-Session-Id'] = sessionId;
    }
    return config;
  });

  // Response interceptor to handle session ID
  apiClient.interceptors.response.use((response) => {
    const sessionId = response.headers['x-session-id'];
    if (sessionId) {
      localStorage.setItem('lucidra-session-id', sessionId);
      setState(prev => ({ ...prev, sessionId }));
    }
    return response;
  });

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const refreshUsage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get('/scenario/usage');
      const { usage, aiStatus, canUseAI } = response.data;
      
      setState(prev => ({
        ...prev,
        usage,
        aiStatus,
        canUseAI,
        loading: false
      }));
    } catch (error: any) {
      console.error('Failed to refresh usage:', error);
      setError(error.response?.data?.error || 'Failed to get usage information');
      setLoading(false);
    }
  }, []);

  const optInToAI = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.post('/scenario/opt-in');
      const { success, usage } = response.data;
      
      if (success) {
        setState(prev => ({
          ...prev,
          usage,
          canUseAI: true,
          aiStatus: 'Available',
          loading: false
        }));
      } else {
        setError('Failed to enable AI analysis');
        setLoading(false);
      }
      
      return success;
    } catch (error: any) {
      console.error('Failed to opt in to AI:', error);
      setError(error.response?.data?.error || 'Failed to enable AI analysis');
      setLoading(false);
      return false;
    }
  }, []);

  const optOutOfAI = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.post('/scenario/opt-out');
      const { success, usage } = response.data;
      
      if (success) {
        setState(prev => ({
          ...prev,
          usage,
          canUseAI: false,
          aiStatus: 'Disabled',
          loading: false
        }));
      } else {
        setError('Failed to disable AI analysis');
        setLoading(false);
      }
      
      return success;
    } catch (error: any) {
      console.error('Failed to opt out of AI:', error);
      setError(error.response?.data?.error || 'Failed to disable AI analysis');
      setLoading(false);
      return false;
    }
  }, []);

  const analyzeScenario = useCallback(async (scenario: string): Promise<AIAnalysisResult | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.post('/scenario/suggest', { scenario });
      const result = response.data;
      
      // Update usage state
      setState(prev => ({
        ...prev,
        usage: result.usage,
        canUseAI: result.usage?.isAiEnabled || false,
        aiStatus: result.aiStatus,
        loading: false
      }));
      
      return result;
    } catch (error: any) {
      console.error('Failed to analyze scenario:', error);
      setError(error.response?.data?.error || 'Failed to analyze scenario');
      setLoading(false);
      return null;
    }
  }, []);

  const getCoachingTips = useCallback(async (): Promise<string[]> => {
    try {
      const response = await apiClient.get('/scenario/coaching-tips');
      return response.data.tips || [];
    } catch (error: any) {
      console.error('Failed to get coaching tips:', error);
      return [];
    }
  }, []);

  // Initialize usage data on mount
  useEffect(() => {
    refreshUsage();
  }, [refreshUsage]);

  // Auto-refresh usage every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshUsage, 30000);
    return () => clearInterval(interval);
  }, [refreshUsage]);

  return {
    // State
    usage: state.usage,
    loading: state.loading,
    error: state.error,
    canUseAI: state.canUseAI,
    aiStatus: state.aiStatus,
    sessionId: state.sessionId,
    
    // Actions
    optInToAI,
    optOutOfAI,
    analyzeScenario,
    refreshUsage,
    getCoachingTips
  };
};

// Helper hooks for specific use cases
export const useAIUsage = () => {
  const { usage, loading, error, refreshUsage } = useAIManager();
  return { usage, loading, error, refreshUsage };
};

export const useAIOptIn = () => {
  const { usage, optInToAI, optOutOfAI, canUseAI, aiStatus } = useAIManager();
  return { usage, optInToAI, optOutOfAI, canUseAI, aiStatus };
};

export const useScenarioAnalysis = () => {
  const { analyzeScenario, loading, error, usage, canUseAI } = useAIManager();
  return { analyzeScenario, loading, error, usage, canUseAI };
};