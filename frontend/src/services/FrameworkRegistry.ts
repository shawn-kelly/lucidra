import React from 'react';
import { 
  FrameworkMetadata, 
  FrameworkComponent, 
  FrameworkInstance, 
  FrameworkCategory, 
  UserTier, 
  ComplexityLevel,
  InstanceStatus,
  PerformanceMetrics
} from '../types/FrameworkTypes';

// Performance monitoring
class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics[]> = new Map();

  recordMetric(frameworkId: string, metric: Omit<PerformanceMetrics, 'frameworkId' | 'timestamp'>) {
    const fullMetric: PerformanceMetrics = {
      ...metric,
      frameworkId,
      timestamp: new Date()
    };

    if (!this.metrics.has(frameworkId)) {
      this.metrics.set(frameworkId, []);
    }

    const frameworkMetrics = this.metrics.get(frameworkId)!;
    frameworkMetrics.push(fullMetric);

    // Keep only last 100 metrics per framework
    if (frameworkMetrics.length > 100) {
      frameworkMetrics.splice(0, frameworkMetrics.length - 100);
    }
  }

  getMetrics(frameworkId: string): PerformanceMetrics[] {
    return this.metrics.get(frameworkId) || [];
  }

  getAverageMetrics(frameworkId: string): Partial<PerformanceMetrics> | null {
    const metrics = this.getMetrics(frameworkId);
    if (metrics.length === 0) return null;

    const totals = metrics.reduce((acc, metric) => ({
      loadTime: acc.loadTime + metric.loadTime,
      memoryUsage: acc.memoryUsage + metric.memoryUsage,
      renderTime: acc.renderTime + metric.renderTime,
      interactionLatency: acc.interactionLatency + metric.interactionLatency,
      errorRate: acc.errorRate + metric.errorRate,
      userSatisfaction: acc.userSatisfaction + (metric.userSatisfaction || 0)
    }), {
      loadTime: 0,
      memoryUsage: 0,
      renderTime: 0,
      interactionLatency: 0,
      errorRate: 0,
      userSatisfaction: 0
    });

    const count = metrics.length;
    return {
      loadTime: totals.loadTime / count,
      memoryUsage: totals.memoryUsage / count,
      renderTime: totals.renderTime / count,
      interactionLatency: totals.interactionLatency / count,
      errorRate: totals.errorRate / count,
      userSatisfaction: totals.userSatisfaction / count
    };
  }
}

// Enhanced Framework Registry with Performance Monitoring
export class FrameworkRegistry {
  private frameworks: Map<string, FrameworkMetadata> = new Map();
  private components: Map<string, FrameworkComponent> = new Map();
  private instances: Map<string, FrameworkInstance> = new Map();
  private performanceMonitor = new PerformanceMonitor();
  private loadedComponents: Map<string, React.ComponentType<any>> = new Map();

  // Initialize with existing frameworks
  constructor() {
    this.initializeFrameworks();
  }

  private initializeFrameworks() {
    const frameworks: FrameworkMetadata[] = [
      {
        id: 'blue-ocean',
        name: 'Blue Ocean Strategy',
        description: 'Create uncontested market space and make competition irrelevant',
        category: FrameworkCategory.STRATEGY,
        icon: '🌊',
        tier: UserTier.PRO,
        version: '2.1.0',
        tags: ['strategy', 'innovation', 'market-creation'],
        estimatedTime: 120,
        complexity: ComplexityLevel.ADVANCED,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'porters-five-forces',
        name: "Porter's Five Forces",
        description: 'Analyze industry competitiveness and profitability',
        category: FrameworkCategory.ANALYSIS,
        icon: '🏢',
        tier: UserTier.LITE,
        version: '1.5.0',
        tags: ['competition', 'industry', 'analysis'],
        estimatedTime: 60,
        complexity: ComplexityLevel.INTERMEDIATE,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'mission-generator',
        name: 'AI Mission Statement Generator',
        description: 'Create compelling mission statements with AI assistance',
        category: FrameworkCategory.STRATEGY,
        icon: '🎯',
        tier: UserTier.LITE,
        version: '1.2.0',
        tags: ['mission', 'ai', 'vision'],
        estimatedTime: 30,
        complexity: ComplexityLevel.BEGINNER,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'data-pulse',
        name: 'Data Pulse Intelligence',
        description: 'Real-time market signals and competitive intelligence',
        category: FrameworkCategory.ANALYSIS,
        icon: '📊',
        tier: UserTier.PRO,
        version: '2.0.0',
        tags: ['data', 'intelligence', 'real-time'],
        estimatedTime: 45,
        complexity: ComplexityLevel.INTERMEDIATE,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'process-management',
        name: 'Advanced Process Management',
        description: 'BPMN-based process design and optimization',
        category: FrameworkCategory.PROCESS,
        icon: '🔄',
        tier: UserTier.PRO,
        version: '1.8.0',
        tags: ['process', 'bpmn', 'optimization'],
        estimatedTime: 90,
        complexity: ComplexityLevel.ADVANCED,
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'financial-frameworks',
        name: 'Financial Analysis Suite',
        description: 'Comprehensive financial modeling and analysis',
        category: FrameworkCategory.FINANCIAL,
        icon: '💰',
        tier: UserTier.PRO,
        version: '1.6.0',
        tags: ['finance', 'modeling', 'analysis'],
        estimatedTime: 75,
        complexity: ComplexityLevel.ADVANCED,
        isActive: true,
        lastUpdated: new Date()
      }
    ];

    frameworks.forEach(framework => {
      this.frameworks.set(framework.id, framework);
    });
  }

  // Framework Management
  registerFramework(metadata: FrameworkMetadata): void {
    this.frameworks.set(metadata.id, metadata);
  }

  unregisterFramework(frameworkId: string): boolean {
    return this.frameworks.delete(frameworkId);
  }

  getFramework(frameworkId: string): FrameworkMetadata | undefined {
    return this.frameworks.get(frameworkId);
  }

  getAllFrameworks(): FrameworkMetadata[] {
    return Array.from(this.frameworks.values());
  }

  getFrameworksByCategory(category: FrameworkCategory): FrameworkMetadata[] {
    return this.getAllFrameworks().filter(framework => framework.category === category);
  }

  getFrameworksByTier(tier: UserTier): FrameworkMetadata[] {
    return this.getAllFrameworks().filter(framework => framework.tier === tier);
  }

  // Component Management with Lazy Loading
  registerComponent(component: FrameworkComponent): void {
    this.components.set(component.id, component);
  }

  async loadComponent(frameworkId: string): Promise<React.ComponentType<any> | null> {
    const startTime = performance.now();
    
    try {
      // Check if already loaded
      if (this.loadedComponents.has(frameworkId)) {
        return this.loadedComponents.get(frameworkId)!;
      }

      // Dynamic import based on framework ID
      let component: React.ComponentType<any>;
      
      switch (frameworkId) {
        case 'blue-ocean':
          const { default: BlueOcean } = await import('../components/ComprehensiveBlueOceanStrategy');
          component = BlueOcean;
          break;
        case 'porters-five-forces':
          const { default: Porter } = await import('../components/InteractivePortersFiveForces');
          component = Porter;
          break;
        case 'mission-generator':
          const { default: Mission } = await import('../components/MissionStatementGenerator');
          component = Mission;
          break;
        case 'data-pulse':
          const { default: DataPulse } = await import('../components/DataPulseWidget');
          component = DataPulse;
          break;
        case 'process-management':
          const { default: Process } = await import('../components/QuantumLeapProcessManagement');
          component = Process;
          break;
        case 'financial-frameworks':
          const { default: Financial } = await import('../components/FinancialFrameworks');
          component = Financial;
          break;
        default:
          throw new Error(`Unknown framework: ${frameworkId}`);
      }

      this.loadedComponents.set(frameworkId, component);

      // Record performance metrics
      const loadTime = performance.now() - startTime;
      this.performanceMonitor.recordMetric(frameworkId, {
        loadTime,
        memoryUsage: this.getMemoryUsage(),
        renderTime: 0, // Will be recorded during render
        interactionLatency: 0,
        errorRate: 0
      });

      return component;
    } catch (error) {
      console.error(`Failed to load framework ${frameworkId}:`, error);
      
      this.performanceMonitor.recordMetric(frameworkId, {
        loadTime: performance.now() - startTime,
        memoryUsage: this.getMemoryUsage(),
        renderTime: 0,
        interactionLatency: 0,
        errorRate: 1
      });

      return null;
    }
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1048576; // MB
    }
    return 0;
  }

  // Instance Management
  createInstance(frameworkId: string, name: string, userId: string): FrameworkInstance {
    const framework = this.getFramework(frameworkId);
    if (!framework) {
      throw new Error(`Framework ${frameworkId} not found`);
    }

    const instance: FrameworkInstance = {
      id: `${frameworkId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      frameworkId,
      name,
      data: {},
      metadata: framework,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
      isTemplate: false,
      sharedWith: [],
      status: InstanceStatus.DRAFT,
      progress: 0
    };

    this.instances.set(instance.id, instance);
    return instance;
  }

  getInstance(instanceId: string): FrameworkInstance | undefined {
    return this.instances.get(instanceId);
  }

  getUserInstances(userId: string): FrameworkInstance[] {
    return Array.from(this.instances.values()).filter(instance => instance.userId === userId);
  }

  updateInstance(instanceId: string, updates: Partial<FrameworkInstance>): boolean {
    const instance = this.instances.get(instanceId);
    if (!instance) return false;

    const updatedInstance = {
      ...instance,
      ...updates,
      updatedAt: new Date()
    };

    this.instances.set(instanceId, updatedInstance);
    return true;
  }

  deleteInstance(instanceId: string): boolean {
    return this.instances.delete(instanceId);
  }

  // Performance Analytics
  getPerformanceMetrics(frameworkId: string): Partial<PerformanceMetrics> | null {
    return this.performanceMonitor.getAverageMetrics(frameworkId);
  }

  getAllPerformanceMetrics(): Map<string, Partial<PerformanceMetrics> | null> {
    const allMetrics = new Map<string, Partial<PerformanceMetrics> | null>();
    
    for (const frameworkId of this.frameworks.keys()) {
      allMetrics.set(frameworkId, this.getPerformanceMetrics(frameworkId));
    }

    return allMetrics;
  }

  recordInteraction(frameworkId: string, latency: number): void {
    this.performanceMonitor.recordMetric(frameworkId, {
      loadTime: 0,
      memoryUsage: this.getMemoryUsage(),
      renderTime: 0,
      interactionLatency: latency,
      errorRate: 0
    });
  }

  // Search and Filter
  searchFrameworks(query: string): FrameworkMetadata[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getAllFrameworks().filter(framework =>
      framework.name.toLowerCase().includes(lowercaseQuery) ||
      framework.description.toLowerCase().includes(lowercaseQuery) ||
      framework.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  getRecommendedFrameworks(userTier: UserTier, currentFrameworkId?: string): FrameworkMetadata[] {
    const available = this.getFrameworksByTier(userTier);
    
    if (!currentFrameworkId) {
      return available.slice(0, 5); // Return top 5
    }

    const current = this.getFramework(currentFrameworkId);
    if (!current) return available.slice(0, 5);

    // Find frameworks with similar tags or category
    return available
      .filter(framework => 
        framework.id !== currentFrameworkId &&
        (framework.category === current.category ||
         framework.tags.some(tag => current.tags.includes(tag)))
      )
      .slice(0, 3);
  }

  // Memory Management
  unloadComponent(frameworkId: string): void {
    this.loadedComponents.delete(frameworkId);
  }

  clearCache(): void {
    this.loadedComponents.clear();
  }

  getLoadedComponentsCount(): number {
    return this.loadedComponents.size;
  }
}

// Singleton instance
export const frameworkRegistry = new FrameworkRegistry();