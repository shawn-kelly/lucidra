import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  FrameworkInstance, 
  FrameworkMetadata,
  InstanceStatus,
  UserTier 
} from '../types/FrameworkTypes';
import { frameworkRegistry } from '../services/FrameworkRegistry';

// Enhanced state management hook for frameworks
export const useFrameworkState = (userId: string, userTier: UserTier) => {
  const [frameworks, setFrameworks] = useState<FrameworkMetadata[]>([]);
  const [instances, setInstances] = useState<FrameworkInstance[]>([]);
  const [activeFramework, setActiveFramework] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');

  // Load frameworks and instances
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allFrameworks = frameworkRegistry.getAllFrameworks();
      const userInstances = frameworkRegistry.getUserInstances(userId);
      
      // Filter frameworks by user tier
      const accessibleFrameworks = allFrameworks.filter(framework => {
        const tierHierarchy = {
          [UserTier.LITE]: [UserTier.LITE],
          [UserTier.PRO]: [UserTier.LITE, UserTier.PRO],
          [UserTier.ENTERPRISE]: [UserTier.LITE, UserTier.PRO, UserTier.ENTERPRISE]
        };
        return tierHierarchy[userTier]?.includes(framework.tier);
      });
      
      setFrameworks(accessibleFrameworks);
      setInstances(userInstances);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [userId, userTier]);

  // Create new framework instance
  const createInstance = useCallback(async (
    frameworkId: string, 
    name: string,
    initialData?: Record<string, any>
  ): Promise<FrameworkInstance | null> => {
    try {
      const instance = frameworkRegistry.createInstance(frameworkId, name, userId);
      
      if (initialData) {
        instance.data = initialData;
        frameworkRegistry.updateInstance(instance.id, { data: initialData });
      }
      
      setInstances(prev => [...prev, instance]);
      return instance;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create instance');
      return null;
    }
  }, [userId]);

  // Update instance
  const updateInstance = useCallback(async (
    instanceId: string,
    updates: Partial<FrameworkInstance>
  ): Promise<boolean> => {
    try {
      const success = frameworkRegistry.updateInstance(instanceId, {
        ...updates,
        updatedAt: new Date()
      });
      
      if (success) {
        setInstances(prev => 
          prev.map(instance => 
            instance.id === instanceId 
              ? { ...instance, ...updates, updatedAt: new Date() }
              : instance
          )
        );
      }
      
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update instance');
      return false;
    }
  }, []);

  // Delete instance
  const deleteInstance = useCallback(async (instanceId: string): Promise<boolean> => {
    try {
      const success = frameworkRegistry.deleteInstance(instanceId);
      
      if (success) {
        setInstances(prev => prev.filter(instance => instance.id !== instanceId));
      }
      
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete instance');
      return false;
    }
  }, []);

  // Save instance data
  const saveInstanceData = useCallback(async (
    instanceId: string,
    data: Record<string, any>,
    progress?: number
  ): Promise<boolean> => {
    setSyncStatus('syncing');
    
    try {
      const updates: Partial<FrameworkInstance> = {
        data,
        updatedAt: new Date()
      };
      
      if (progress !== undefined) {
        updates.progress = Math.max(0, Math.min(100, progress));
        
        // Auto-update status based on progress
        if (progress === 0) {
          updates.status = InstanceStatus.DRAFT;
        } else if (progress < 100) {
          updates.status = InstanceStatus.IN_PROGRESS;
        } else {
          updates.status = InstanceStatus.COMPLETED;
        }
      }
      
      const success = await updateInstance(instanceId, updates);
      setSyncStatus(success ? 'idle' : 'error');
      return success;
    } catch (err) {
      setSyncStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to save data');
      return false;
    }
  }, [updateInstance]);

  // Load framework component
  const loadFrameworkComponent = useCallback(async (frameworkId: string) => {
    try {
      return await frameworkRegistry.loadComponent(frameworkId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load component');
      return null;
    }
  }, []);

  // Get framework by ID
  const getFramework = useCallback((frameworkId: string): FrameworkMetadata | undefined => {
    return frameworks.find(f => f.id === frameworkId);
  }, [frameworks]);

  // Get instance by ID
  const getInstance = useCallback((instanceId: string): FrameworkInstance | undefined => {
    return instances.find(i => i.id === instanceId);
  }, [instances]);

  // Get instances for framework
  const getFrameworkInstances = useCallback((frameworkId: string): FrameworkInstance[] => {
    return instances.filter(i => i.frameworkId === frameworkId);
  }, [instances]);

  // Search frameworks
  const searchFrameworks = useCallback((query: string): FrameworkMetadata[] => {
    if (!query.trim()) return frameworks;
    
    const lowercaseQuery = query.toLowerCase();
    return frameworks.filter(framework =>
      framework.name.toLowerCase().includes(lowercaseQuery) ||
      framework.description.toLowerCase().includes(lowercaseQuery) ||
      framework.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [frameworks]);

  // Get recommended frameworks
  const getRecommendedFrameworks = useCallback((
    currentFrameworkId?: string,
    limit: number = 5
  ): FrameworkMetadata[] => {
    return frameworkRegistry.getRecommendedFrameworks(userTier, currentFrameworkId)
      .slice(0, limit);
  }, [userTier]);

  // Statistics
  const stats = useMemo(() => {
    const totalInstances = instances.length;
    const completedInstances = instances.filter(i => i.status === InstanceStatus.COMPLETED).length;
    const inProgressInstances = instances.filter(i => i.status === InstanceStatus.IN_PROGRESS).length;
    const draftInstances = instances.filter(i => i.status === InstanceStatus.DRAFT).length;
    
    const completionRate = totalInstances > 0 ? (completedInstances / totalInstances) * 100 : 0;
    
    const frameworkUsage = frameworks.map(framework => ({
      framework,
      instanceCount: getFrameworkInstances(framework.id).length,
      completedCount: getFrameworkInstances(framework.id)
        .filter(i => i.status === InstanceStatus.COMPLETED).length
    })).sort((a, b) => b.instanceCount - a.instanceCount);
    
    return {
      totalFrameworks: frameworks.length,
      totalInstances,
      completedInstances,
      inProgressInstances,
      draftInstances,
      completionRate,
      frameworkUsage
    };
  }, [frameworks, instances, getFrameworkInstances]);

  // Auto-save functionality
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30000); // 30 seconds

  useEffect(() => {
    if (!autoSaveEnabled) return;
    
    const interval = setInterval(() => {
      // Auto-save logic for draft instances with unsaved changes
      instances
        .filter(instance => 
          instance.status === InstanceStatus.DRAFT || 
          instance.status === InstanceStatus.IN_PROGRESS
        )
        .forEach(instance => {
          // This would typically check for unsaved changes
          // For now, we'll just update the timestamp
          updateInstance(instance.id, { updatedAt: new Date() });
        });
    }, autoSaveInterval);

    return () => clearInterval(interval);
  }, [autoSaveEnabled, autoSaveInterval, instances, updateInstance]);

  // Initialize data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Clear error after some time
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return {
    // Data
    frameworks,
    instances,
    activeFramework,
    stats,
    
    // State
    loading,
    error,
    syncStatus,
    autoSaveEnabled,
    autoSaveInterval,
    
    // Actions
    loadData,
    createInstance,
    updateInstance,
    deleteInstance,
    saveInstanceData,
    loadFrameworkComponent,
    setActiveFramework,
    setAutoSaveEnabled,
    setAutoSaveInterval,
    
    // Getters
    getFramework,
    getInstance,
    getFrameworkInstances,
    searchFrameworks,
    getRecommendedFrameworks
  };
};

// Hook for managing cross-framework data sharing
export const useCrossFrameworkData = (userId: string) => {
  const [sharedData, setSharedData] = useState<Map<string, Record<string, any>>>(new Map());
  const [subscriptions, setSubscriptions] = useState<Map<string, string[]>>(new Map());

  // Share data between frameworks
  const shareData = useCallback((
    sourceFrameworkId: string,
    targetFrameworkIds: string[],
    data: Record<string, any>,
    mapping?: Record<string, string>
  ) => {
    const processedData = mapping 
      ? Object.keys(mapping).reduce((acc, key) => {
          if (data[mapping[key]]) {
            acc[key] = data[mapping[key]];
          }
          return acc;
        }, {} as Record<string, any>)
      : data;

    // Update shared data
    setSharedData(prev => {
      const newData = new Map(prev);
      targetFrameworkIds.forEach(targetId => {
        const existingData = newData.get(targetId) || {};
        newData.set(targetId, { ...existingData, ...processedData });
      });
      return newData;
    });

    // Update subscriptions
    setSubscriptions(prev => {
      const newSubs = new Map(prev);
      targetFrameworkIds.forEach(targetId => {
        const existing = newSubs.get(targetId) || [];
        if (!existing.includes(sourceFrameworkId)) {
          newSubs.set(targetId, [...existing, sourceFrameworkId]);
        }
      });
      return newSubs;
    });
  }, []);

  // Get shared data for framework
  const getSharedData = useCallback((frameworkId: string): Record<string, any> => {
    return sharedData.get(frameworkId) || {};
  }, [sharedData]);

  // Get frameworks sharing data with this framework
  const getDataSources = useCallback((frameworkId: string): string[] => {
    return subscriptions.get(frameworkId) || [];
  }, [subscriptions]);

  // Clear shared data
  const clearSharedData = useCallback((frameworkId?: string) => {
    if (frameworkId) {
      setSharedData(prev => {
        const newData = new Map(prev);
        newData.delete(frameworkId);
        return newData;
      });
      setSubscriptions(prev => {
        const newSubs = new Map(prev);
        newSubs.delete(frameworkId);
        return newSubs;
      });
    } else {
      setSharedData(new Map());
      setSubscriptions(new Map());
    }
  }, []);

  return {
    sharedData: Object.fromEntries(sharedData),
    shareData,
    getSharedData,
    getDataSources,
    clearSharedData
  };
};

// Hook for performance monitoring
export const useFrameworkPerformance = () => {
  const [performanceData, setPerformanceData] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = frameworkRegistry.getAllPerformanceMetrics();
      setPerformanceData(newData);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getPerformanceMetrics = useCallback((frameworkId: string) => {
    return performanceData.get(frameworkId);
  }, [performanceData]);

  const getAllMetrics = useCallback(() => {
    return Object.fromEntries(performanceData);
  }, [performanceData]);

  return {
    getPerformanceMetrics,
    getAllMetrics,
    performanceData: Object.fromEntries(performanceData)
  };
};