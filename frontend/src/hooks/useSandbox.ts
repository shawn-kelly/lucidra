import { useState, useCallback } from 'react';
import axios from 'axios';

export interface SandboxDashboard {
  progress: {
    userId: string;
    totalXP: number;
    level: number;
    badges: any[];
    completedMissions: string[];
    activeWorkflows: string[];
    streaks: {
      dailyPrompting: number;
      weeklyCompletion: number;
    };
  };
  missions: any[];
  advisors: any[];
  availableBadges: any[];
}

export interface SandboxState {
  dashboard: SandboxDashboard | null;
  loading: boolean;
  error: string | null;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export const useSandbox = () => {
  const [state, setState] = useState<SandboxState>({
    dashboard: null,
    loading: false,
    error: null
  });

  // Create axios instance with session management
  const apiClient = axios.create({
    baseURL: `${API_URL}/sandbox`,
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
    }
    return response;
  });

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const refreshDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get('/dashboard');
      
      if (response.data.success) {
        setState(prev => ({
          ...prev,
          dashboard: response.data.data,
          loading: false
        }));
      } else {
        setError('Failed to load dashboard');
        setLoading(false);
      }
    } catch (error: any) {
      console.error('Dashboard refresh error:', error);
      setError(error.response?.data?.error || 'Failed to load dashboard');
      setLoading(false);
    }
  }, []);

  const createMission = useCallback(async (title: string, description: string, challenge: string, category: string = 'custom') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.post('/missions', {
        title,
        description,
        challenge,
        category
      });
      
      if (response.data.success) {
        setLoading(false);
        return response.data.data;
      } else {
        setError('Failed to create mission');
        setLoading(false);
        return null;
      }
    } catch (error: any) {
      console.error('Create mission error:', error);
      setError(error.response?.data?.error || 'Failed to create mission');
      setLoading(false);
      return null;
    }
  }, []);

  const getMission = useCallback(async (missionId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get(`/missions/${missionId}`);
      
      if (response.data.success) {
        setLoading(false);
        return response.data.data;
      } else {
        setError('Failed to get mission');
        setLoading(false);
        return null;
      }
    } catch (error: any) {
      console.error('Get mission error:', error);
      setError(error.response?.data?.error || 'Failed to get mission');
      setLoading(false);
      return null;
    }
  }, []);

  const addSubtask = useCallback(async (missionId: string, subtask: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.post(`/missions/${missionId}/subtasks`, subtask);
      
      if (response.data.success) {
        setLoading(false);
        return response.data.data;
      } else {
        setError('Failed to add subtask');
        setLoading(false);
        return null;
      }
    } catch (error: any) {
      console.error('Add subtask error:', error);
      setError(error.response?.data?.error || 'Failed to add subtask');
      setLoading(false);
      return null;
    }
  }, []);

  const assignAdvisor = useCallback(async (missionId: string, subtaskId: string, advisorId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.put(`/missions/${missionId}/subtasks/${subtaskId}/advisor`, {
        advisorId
      });
      
      if (response.data.success) {
        setLoading(false);
        return true;
      } else {
        setError('Failed to assign advisor');
        setLoading(false);
        return false;
      }
    } catch (error: any) {
      console.error('Assign advisor error:', error);
      setError(error.response?.data?.error || 'Failed to assign advisor');
      setLoading(false);
      return false;
    }
  }, []);

  const addIteration = useCallback(async (missionId: string, subtaskId: string, promptUsed: string, advisorResponse: string, userAnnotation?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.post(`/missions/${missionId}/subtasks/${subtaskId}/iterations`, {
        promptUsed,
        advisorResponse,
        userAnnotation
      });
      
      if (response.data.success) {
        setLoading(false);
        return response.data.data;
      } else {
        setError('Failed to add iteration');
        setLoading(false);
        return null;
      }
    } catch (error: any) {
      console.error('Add iteration error:', error);
      setError(error.response?.data?.error || 'Failed to add iteration');
      setLoading(false);
      return null;
    }
  }, []);

  const getUserProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get('/progress');
      
      if (response.data.success) {
        setLoading(false);
        return response.data.data;
      } else {
        setError('Failed to get progress');
        setLoading(false);
        return null;
      }
    } catch (error: any) {
      console.error('Get progress error:', error);
      setError(error.response?.data?.error || 'Failed to get progress');
      setLoading(false);
      return null;
    }
  }, []);

  const createMissionFromTemplate = useCallback(async (templateId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // This would call a specific endpoint for creating from template
      // For now, we'll simulate it
      const templateData = {
        'code_review_cycle': {
          title: 'Code Review Orchestration',
          description: 'Multi-agent approach to comprehensive code review',
          challenge: 'Review code for security, performance, and maintainability using multiple AI perspectives'
        },
        'ux_copy_refinement': {
          title: 'UX Copy Refinement Pipeline',
          description: 'Perfect interface copy through strategic AI collaboration',
          challenge: 'Refine user interface copy for optimal user experience and conversion'
        },
        'architecture_planning': {
          title: 'System Architecture Planning',
          description: 'Comprehensive system design through multi-agent analysis',
          challenge: 'Design a scalable system architecture using multiple AI perspectives'
        },
        'brand_strategy_formation': {
          title: 'Brand Strategy Formation',
          description: 'Multi-perspective brand strategy development',
          challenge: 'Develop a comprehensive brand strategy using AI collaboration'
        }
      };

      const template = templateData[templateId as keyof typeof templateData];
      if (template) {
        const mission = await createMission(template.title, template.description, template.challenge);
        setLoading(false);
        return mission;
      } else {
        setError('Template not found');
        setLoading(false);
        return null;
      }
    } catch (error: any) {
      console.error('Create from template error:', error);
      setError(error.response?.data?.error || 'Failed to create from template');
      setLoading(false);
      return null;
    }
  }, [createMission]);

  return {
    // State
    dashboard: state.dashboard,
    loading: state.loading,
    error: state.error,
    
    // Actions
    refreshDashboard,
    createMission,
    getMission,
    addSubtask,
    assignAdvisor,
    addIteration,
    getUserProgress,
    createMissionFromTemplate
  };
};