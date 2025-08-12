import React, { useState, useEffect } from 'react';

const VisualProcessArchitect = () => {
  const [activeView, setActiveView] = useState('designer');
  const [selectedElement, setSelectedElement] = useState(null);
  const [processes, setProcesses] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);
  const [connections, setConnections] = useState([]);

  // Business Process Elements Library
  const processElements = {
    events: [
      { id: 'start', name: 'Start Event', icon: '●', color: '#10B981', description: 'Process initiation point' },
      { id: 'end', name: 'End Event', icon: '●', color: '#EF4444', description: 'Process completion point' },
      { id: 'intermediate', name: 'Intermediate Event', icon: '◐', color: '#F59E0B', description: 'Process milestone' },
      { id: 'timer', name: 'Timer Event', icon: '⏰', color: '#8B5CF6', description: 'Time-based trigger' }
    ],
    activities: [
      { id: 'task', name: 'Task', icon: '□', color: '#3B82F6', description: 'Basic work unit' },
      { id: 'subprocess', name: 'Sub-Process', icon: '⊞', color: '#06B6D4', description: 'Composite activity' },
      { id: 'user-task', name: 'User Task', icon: '👤', color: '#EC4899', description: 'Human-performed task' },
      { id: 'service-task', name: 'Service Task', icon: '⚙️', color: '#6366F1', description: 'System-automated task' },
      { id: 'script-task', name: 'Script Task', icon: '📝', color: '#84CC16', description: 'Script execution' }
    ],
    gateways: [
      { id: 'exclusive', name: 'Exclusive Gateway', icon: '◇', color: '#F97316', description: 'XOR decision point' },
      { id: 'parallel', name: 'Parallel Gateway', icon: '⬟', color: '#14B8A6', description: 'AND split/join' },
      { id: 'inclusive', name: 'Inclusive Gateway', icon: '◈', color: '#A855F7', description: 'OR decision point' },
      { id: 'event-based', name: 'Event Gateway', icon: '⬢', color: '#EAB308', description: 'Event-driven split' }
    ],
    flows: [
      { id: 'sequence', name: 'Sequence Flow', icon: '→', color: '#374151', description: 'Process flow direction' },
      { id: 'message', name: 'Message Flow', icon: '💌', color: '#DC2626', description: 'Inter-process communication' },
      { id: 'association', name: 'Association', icon: '⋯', color: '#6B7280', description: 'Data/artifact link' }
    ]
  };

  // Advanced Process Metrics
  const processMetrics = {
    efficiency: {
      overall: 82,
      byCategory: {
        'Customer Management': 85,
        'Operations': 78,
        'Innovation': 92,
        'Finance': 75
      },
      trend: '+5% this month'
    },
    bottlenecks: [
      { process: 'Customer Onboarding', step: 'Document Verification', impact: 'High', duration: '24h' },
      { process: 'Lead Generation', step: 'Lead Qualification', impact: 'Medium', duration: '12h' },
      { process: 'Invoice Processing', step: 'Approval Workflow', impact: 'High', duration: '48h' }
    ],
    automation: {
      automated: 65,
      semiAutomated: 25,
      manual: 10
    },
    performance: {
      throughput: '1,250 processes/day',
      cycleTime: '4.2 hours avg',
      errorRate: '2.3%',
      sla: '94% on-time'
    }
  };

  // Enhanced Process Intelligence
  const intelligenceInsights = [
    {
      type: 'efficiency',
      title: 'Automation Opportunity Detected',
      message: 'Document Verification in Customer Onboarding can be 80% automated using AI document processing',
      impact: '+15% efficiency, -18 hours cycle time',
      confidence: 87,
      action: 'Implement AI Document Scanner'
    },
    {
      type: 'bottleneck',
      title: 'Resource Constraint Identified',
      message: 'Lead Qualification queue growing due to understaffing during peak hours',
      impact: '+30% lead response time',
      confidence: 92,
      action: 'Add 2 part-time qualification specialists'
    },
    {
      type: 'optimization',
      title: 'Process Consolidation Opportunity',
      message: 'Customer Support and Technical Support workflows have 70% overlap',
      impact: '-25% operational overhead',
      confidence: 78,
      action: 'Merge support workflows with smart routing'
    }
  ];

  const renderProcessDesigner = () => (
    <div className="flex h-full">
      {/* Element Palette */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Process Elements</h3>
        
        {Object.entries(processElements).map(([category, elements]) => (
          <div key={category} className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
              {category}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {elements.map((element) => (
                <div
                  key={element.id}
                  className="p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all group"
                  draggable
                  onDragStart={() => setDraggedElement(element)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl" style={{ color: element.color }}>
                      {element.icon}
                    </span>
                    <div>
                      <div className="text-xs font-medium text-gray-800">{element.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-700">
                        {element.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Design Canvas */}
      <div className="flex-1 bg-white relative overflow-auto">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div 
          className="w-full h-full min-h-screen relative"
          onDrop={(e) => {
            e.preventDefault();
            if (draggedElement) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              const newProcess = {
                id: `${draggedElement.id}-${Date.now()}`,
                type: draggedElement.id,
                name: draggedElement.name,
                x: x - 50,
                y: y - 25,
                ...draggedElement
              };
              
              setProcesses([...processes, newProcess]);
              setDraggedElement(null);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* Render Process Elements */}
          {processes.map((process) => (
            <div
              key={process.id}
              className="absolute p-4 bg-white rounded-lg border-2 border-gray-300 cursor-pointer hover:shadow-lg transition-all"
              style={{ 
                left: process.x, 
                top: process.y,
                borderColor: selectedElement?.id === process.id ? '#3B82F6' : '#D1D5DB'
              }}
              onClick={() => setSelectedElement(process)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl" style={{ color: process.color }}>
                  {process.icon}
                </span>
                <div>
                  <div className="text-sm font-medium text-gray-800">{process.name}</div>
                  <div className="text-xs text-gray-500">{process.type}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {processes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-4">🎨</div>
                <div className="text-lg font-medium mb-2">Visual Process Designer</div>
                <div className="text-sm">Drag elements from the palette to start designing your process</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedElement && (
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Properties</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Element Type</label>
              <div className="mt-1 p-2 bg-white rounded border text-sm text-gray-800">
                {selectedElement.name}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                defaultValue={selectedElement.name}
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Description</label>
              <textarea
                defaultValue={selectedElement.description}
                rows={3}
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Automation Level</label>
              <select className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Manual</option>
                <option>Semi-Automated</option>
                <option>Fully Automated</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Expected Duration</label>
              <input
                type="text"
                placeholder="e.g., 2 hours, 1 day"
                className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Assigned Role</label>
              <select className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sales Rep</option>
                <option>Customer Service</option>
                <option>Operations Manager</option>
                <option>System</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderProcessAnalytics = () => (
    <div className="p-6 space-y-6">
      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-blue-100 text-sm">Overall Efficiency</div>
              <div className="text-3xl font-bold">{processMetrics.efficiency.overall}%</div>
              <div className="text-blue-200 text-sm">{processMetrics.efficiency.trend}</div>
            </div>
            <div className="text-4xl opacity-80">⚡</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-green-100 text-sm">Automation Rate</div>
              <div className="text-3xl font-bold">{processMetrics.automation.automated}%</div>
              <div className="text-green-200 text-sm">+{processMetrics.automation.semiAutomated}% semi-auto</div>
            </div>
            <div className="text-4xl opacity-80">🤖</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-100 text-sm">Daily Throughput</div>
              <div className="text-2xl font-bold">{processMetrics.performance.throughput}</div>
              <div className="text-purple-200 text-sm">Avg: {processMetrics.performance.cycleTime}</div>
            </div>
            <div className="text-4xl opacity-80">📊</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-orange-100 text-sm">SLA Performance</div>
              <div className="text-3xl font-bold">{processMetrics.performance.sla}</div>
              <div className="text-orange-200 text-sm">Error rate: {processMetrics.performance.errorRate}</div>
            </div>
            <div className="text-4xl opacity-80">🎯</div>
          </div>
        </div>
      </div>

      {/* Efficiency by Category */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Efficiency by Category</h3>
        <div className="space-y-4">
          {Object.entries(processMetrics.efficiency.byCategory).map(([category, efficiency]) => (
            <div key={category} className="flex items-center justify-between">
              <div className="text-gray-700 font-medium">{category}</div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${efficiency}%` }}
                  />
                </div>
                <div className="text-sm font-semibold text-gray-600 w-12">{efficiency}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottleneck Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">🔍 Critical Bottlenecks</h3>
        <div className="space-y-4">
          {processMetrics.bottlenecks.map((bottleneck, index) => (
            <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-red-800">{bottleneck.process}</div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  bottleneck.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {bottleneck.impact} Impact
                </span>
              </div>
              <div className="text-sm text-red-700">
                <strong>Step:</strong> {bottleneck.step} • <strong>Duration:</strong> {bottleneck.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntelligenceInsights = () => (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🧠 Process Intelligence Insights</h2>
        <div className="text-gray-600">AI-powered recommendations for process optimization</div>
      </div>

      <div className="space-y-6">
        {intelligenceInsights.map((insight, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  insight.type === 'efficiency' ? 'bg-green-500' :
                  insight.type === 'bottleneck' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <h3 className="text-lg font-semibold text-gray-800">{insight.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-500">Confidence:</div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                  {insight.confidence}%
                </div>
              </div>
            </div>
            
            <div className="text-gray-700 mb-3">{insight.message}</div>
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
              <div className="text-sm text-green-800">
                <strong>Expected Impact:</strong> {insight.impact}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <strong>Recommended Action:</strong> {insight.action}
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Implement
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const views = [
    { id: 'designer', name: 'Visual Designer', icon: '🎨', description: 'Drag-and-drop process modeling' },
    { id: 'analytics', name: 'Process Analytics', icon: '📊', description: 'Performance metrics and KPIs' },
    { id: 'intelligence', name: 'AI Insights', icon: '🧠', description: 'Intelligent optimization recommendations' },
    { id: 'simulation', name: 'Process Simulation', icon: '⚡', description: 'What-if scenario modeling' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Visual Process Architect</h1>
            <div className="text-gray-600">Advanced Business Process Design & Optimization Platform</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export BPMN
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Save Project
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === view.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{view.icon}</span>
                <span>{view.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'designer' && renderProcessDesigner()}
        {activeView === 'analytics' && renderProcessAnalytics()}
        {activeView === 'intelligence' && renderIntelligenceInsights()}
        {activeView === 'simulation' && (
          <div className="p-6 text-center text-gray-500">
            <div className="text-4xl mb-4">⚡</div>
            <div className="text-xl font-semibold mb-2">Process Simulation</div>
            <div>Coming soon - What-if scenario modeling and capacity planning</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualProcessArchitect;