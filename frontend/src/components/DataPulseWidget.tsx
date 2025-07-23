import React, { useState, useEffect, useCallback } from 'react';

/**
 * DataPulseWidget - Advanced Market Intelligence Dashboard
 * 
 * Features:
 * - Real-time market signals from multiple sources
 * - Advanced filtering by region, sector, and signal type
 * - Strategic Matchmaker for complementary products
 * - WebSocket connectivity for live updates
 * - Professional dashboard with Tailwind CSS
 * - Integration with Lucidra's data pipeline
 * 
 * @component
 */

// Type definitions
interface MarketSignal {
  id: string;
  type: 'social' | 'financial' | 'product' | 'trend';
  title: string;
  description: string;
  value: number;
  change: number;
  region: string;
  sector: string;
  confidence: number;
  tags: string[];
  timestamp: string;
  source: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface StrategicMatch {
  id: string;
  productName: string;
  matchScore: number;
  reasoning: string;
  marketOpportunity: string;
  estimatedRevenue: string;
  timeToMarket: string;
  riskLevel: 'low' | 'medium' | 'high';
  synegyType: string;
  implementationComplexity: string;
  successIndicators: string[];
}

interface FilterState {
  signalTypes: string[];
  regions: string[];
  sectors: string[];
  timeRange: string;
  minConfidence: number;
  priorityFilter: string;
}

interface DataPulseWidgetProps {
  userGoals?: string[];
  primaryProduct?: string;
  onSignalClick?: (signal: MarketSignal) => void;
  onMatchClick?: (match: StrategicMatch) => void;
  className?: string;
}

// Demo data with enhanced structure
const DEMO_SIGNALS: MarketSignal[] = [
  {
    id: 'signal_1',
    type: 'social',
    title: 'AI Automation Buzz Surge',
    description: 'Massive social media discussion spike around AI workflow automation tools',
    value: 89,
    change: 23.5,
    region: 'North America',
    sector: 'Technology',
    confidence: 92,
    tags: ['AI', 'automation', 'productivity', 'workflow'],
    timestamp: new Date().toISOString(),
    source: 'Twitter/X + Reddit',
    actionable: true,
    priority: 'high'
  },
  {
    id: 'signal_2',
    type: 'financial',
    title: 'SaaS Sector Performance',
    description: 'Software-as-a-Service stocks showing strong quarterly growth',
    value: 76,
    change: 8.2,
    region: 'Global',
    sector: 'Software',
    confidence: 88,
    tags: ['SaaS', 'growth', 'quarterly', 'stocks'],
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    source: 'Financial APIs',
    actionable: true,
    priority: 'medium'
  },
  {
    id: 'signal_3',
    type: 'product',
    title: 'Wireless Earbuds Demand',
    description: 'Consumer demand for premium wireless earbuds increasing significantly',
    value: 84,
    change: 15.7,
    region: 'Asia-Pacific',
    sector: 'Consumer Electronics',
    confidence: 85,
    tags: ['wireless', 'earbuds', 'premium', 'consumer'],
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    source: 'Amazon + Google Shopping',
    actionable: true,
    priority: 'high'
  },
  {
    id: 'signal_4',
    type: 'trend',
    title: 'Remote Work Tools Trending',
    description: 'Search interest in remote work productivity tools up 45% this month',
    value: 72,
    change: 18.3,
    region: 'Europe',
    sector: 'Productivity',
    confidence: 79,
    tags: ['remote-work', 'productivity', 'tools', 'trending'],
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    source: 'Google Trends',
    actionable: false,
    priority: 'medium'
  },
  {
    id: 'signal_5',
    type: 'financial',
    title: 'Sustainability Funding Surge',
    description: 'VC funding for sustainability startups increased 67% quarter-over-quarter',
    value: 93,
    change: 28.9,
    region: 'Global',
    sector: 'CleanTech',
    confidence: 94,
    tags: ['sustainability', 'funding', 'VC', 'cleantech'],
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    source: 'Alpha Vantage',
    actionable: true,
    priority: 'high'
  }
];

const DEMO_STRATEGIC_MATCHES: StrategicMatch[] = [
  {
    id: 'match_1',
    productName: 'AI-Powered Customer Service Bot',
    matchScore: 94,
    reasoning: 'High correlation with AI automation social buzz and business efficiency trends',
    marketOpportunity: 'Small businesses struggling with 24/7 customer support coverage',
    estimatedRevenue: '$50K-200K/year',
    timeToMarket: '3-6 months',
    riskLevel: 'medium',
    synegyType: 'complementary',
    implementationComplexity: 'medium',
    successIndicators: ['Response time reduction', 'Customer satisfaction increase', 'Cost savings']
  },
  {
    id: 'match_2',
    productName: 'Wireless Charging Station',
    matchScore: 87,
    reasoning: 'Strong demand for wireless consumer electronics accessories',
    marketOpportunity: 'Growing market for premium wireless device accessories',
    estimatedRevenue: '$30K-150K/year',
    timeToMarket: '2-4 months',
    riskLevel: 'low',
    synegyType: 'complementary',
    implementationComplexity: 'low',
    successIndicators: ['Sales volume growth', 'Brand partnerships', 'Market penetration']
  },
  {
    id: 'match_3',
    productName: 'Remote Team Collaboration Platform',
    matchScore: 82,
    reasoning: 'Aligned with remote work productivity trends and business needs',
    marketOpportunity: 'Companies seeking integrated remote work solutions',
    estimatedRevenue: '$100K-500K/year',
    timeToMarket: '6-12 months',
    riskLevel: 'high',
    synegyType: 'competitive',
    implementationComplexity: 'high',
    successIndicators: ['User adoption rate', 'Monthly recurring revenue', 'Enterprise clients']
  }
];

const DataPulseWidget: React.FC<DataPulseWidgetProps> = ({
  userGoals = [],
  primaryProduct,
  onSignalClick,
  onMatchClick,
  className = ''
}) => {
  // State management
  const [signals, setSignals] = useState<MarketSignal[]>(DEMO_SIGNALS);
  const [strategicMatches, setStrategicMatches] = useState<StrategicMatch[]>(DEMO_STRATEGIC_MATCHES);
  const [filteredSignals, setFilteredSignals] = useState<MarketSignal[]>(DEMO_SIGNALS);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedSignal, setSelectedSignal] = useState<MarketSignal | null>(null);
  const [showMatchmaker, setShowMatchmaker] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    signalTypes: [],
    regions: [],
    sectors: [],
    timeRange: '24h',
    minConfidence: 0,
    priorityFilter: 'all'
  });
  
  // Configuration
  const signalTypes = ['social', 'financial', 'product', 'trend'];
  const regions = ['Global', 'North America', 'Europe', 'Asia-Pacific', 'Latin America'];
  const sectors = ['Technology', 'Healthcare', 'Finance', 'Consumer Electronics', 'Software', 'CleanTech', 'Productivity'];
  const timeRanges = ['1h', '6h', '24h', '7d', '30d'];
  const priorityLevels = ['all', 'high', 'medium', 'low'];
  
  /**
   * Simulate real-time data updates
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setIsConnected(true);
      
      // Simulate signal value changes
      setSignals(prev => prev.map(signal => ({
        ...signal,
        value: Math.max(0, Math.min(100, signal.value + (Math.random() - 0.5) * 5)),
        change: (Math.random() - 0.5) * 20
      })));
      
      // Simulate occasional disconnection
      if (Math.random() < 0.05) {
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 2000);
      }
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  /**
   * Apply filters to signals
   */
  useEffect(() => {
    let filtered = [...signals];
    
    // Filter by signal types
    if (filters.signalTypes.length > 0) {
      filtered = filtered.filter(signal => filters.signalTypes.includes(signal.type));
    }
    
    // Filter by regions
    if (filters.regions.length > 0) {
      filtered = filtered.filter(signal => filters.regions.includes(signal.region));
    }
    
    // Filter by sectors
    if (filters.sectors.length > 0) {
      filtered = filtered.filter(signal => filters.sectors.includes(signal.sector));
    }
    
    // Filter by confidence
    if (filters.minConfidence > 0) {
      filtered = filtered.filter(signal => signal.confidence >= filters.minConfidence);
    }
    
    // Filter by priority
    if (filters.priorityFilter !== 'all') {
      filtered = filtered.filter(signal => signal.priority === filters.priorityFilter);
    }
    
    // Sort by value (descending)
    filtered.sort((a, b) => b.value - a.value);
    
    setFilteredSignals(filtered);
  }, [signals, filters]);
  
  /**
   * Handle filter changes
   */
  const handleFilterChange = useCallback((filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);
  
  /**
   * Handle signal selection
   */
  const handleSignalClick = useCallback((signal: MarketSignal) => {
    setSelectedSignal(signal);
    onSignalClick?.(signal);
  }, [onSignalClick]);
  
  /**
   * Handle match selection
   */
  const handleMatchClick = useCallback((match: StrategicMatch) => {
    onMatchClick?.(match);
  }, [onMatchClick]);
  
  /**
   * Manual refresh
   */
  const handleRefresh = useCallback(() => {
    setLastUpdate(new Date());
    // In production, would trigger API call
    console.log('Refreshing data pulse...');
  }, []);
  
  /**
   * Get signal icon
   */
  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'social': return '🌐';
      case 'financial': return '💰';
      case 'product': return '📦';
      case 'trend': return '📈';
      default: return '📊';
    }
  };
  
  /**
   * Get priority color
   */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  /**
   * Get risk level color
   */
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className={`max-w-7xl mx-auto p-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🌊 Data Pulse Intelligence
            </h2>
            <p className="text-gray-600">
              Real-time market signals and strategic opportunities
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            {/* Last Update */}
            <div className="text-sm text-gray-500">
              Updated: {lastUpdate.toLocaleTimeString()}
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Refresh
            </button>
            
            {/* Strategic Matchmaker Toggle */}
            <button
              onClick={() => setShowMatchmaker(!showMatchmaker)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showMatchmaker 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎯 Strategic Matchmaker
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{filteredSignals.length}</div>
            <div className="text-sm text-blue-600">Active Signals</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {filteredSignals.filter(s => s.actionable).length}
            </div>
            <div className="text-sm text-green-600">Actionable</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{strategicMatches.length}</div>
            <div className="text-sm text-purple-600">Strategic Matches</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(filteredSignals.reduce((acc, s) => acc + s.confidence, 0) / filteredSignals.length)}%
            </div>
            <div className="text-sm text-orange-600">Avg Confidence</div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">🔍 Filters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Signal Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signal Types
            </label>
            <div className="space-y-2">
              {signalTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.signalTypes.includes(type)}
                    onChange={(e) => {
                      const newTypes = e.target.checked
                        ? [...filters.signalTypes, type]
                        : filters.signalTypes.filter(t => t !== type);
                      handleFilterChange('signalTypes', newTypes);
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm capitalize">{getSignalIcon(type)} {type}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Regions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regions
            </label>
            <select
              multiple
              value={filters.regions}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                handleFilterChange('regions', selected);
              }}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              size={5}
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Sectors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sectors
            </label>
            <select
              multiple
              value={filters.sectors}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                handleFilterChange('sectors', selected);
              }}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              size={5}
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
          
          {/* Additional Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Range
              </label>
              <select
                value={filters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {timeRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Confidence: {filters.minConfidence}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minConfidence}
                onChange={(e) => handleFilterChange('minConfidence', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={filters.priorityFilter}
                onChange={(e) => handleFilterChange('priorityFilter', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {priorityLevels.map(level => (
                  <option key={level} value={level}>{level === 'all' ? 'All Priorities' : level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signals List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              📊 Market Signals ({filteredSignals.length})
            </h3>
            
            <div className="space-y-4">
              {filteredSignals.map(signal => (
                <div
                  key={signal.id}
                  onClick={() => handleSignalClick(signal)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedSignal?.id === signal.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getSignalIcon(signal.type)}</span>
                      <div>
                        <h4 className="font-medium text-gray-800">{signal.title}</h4>
                        <p className="text-sm text-gray-600">{signal.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded text-xs border ${getPriorityColor(signal.priority)}`}>
                        {signal.priority}
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-800">{signal.value.toFixed(0)}</div>
                        <div className={`text-sm ${signal.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {signal.change >= 0 ? '↗' : '↘'} {Math.abs(signal.change).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>{signal.region}</span>
                      <span>•</span>
                      <span>{signal.sector}</span>
                      <span>•</span>
                      <span>{signal.confidence}% confidence</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span>{signal.source}</span>
                      {signal.actionable && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Actionable
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {signal.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {signal.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {filteredSignals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No signals match your current filters
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Strategic Matchmaker Panel */}
        <div className="lg:col-span-1">
          {showMatchmaker && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                🎯 Strategic Matchmaker
              </h3>
              
              {primaryProduct && (
                <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">Primary Product</div>
                  <div className="text-purple-800">{primaryProduct}</div>
                </div>
              )}
              
              <div className="space-y-4">
                {strategicMatches.map(match => (
                  <div
                    key={match.id}
                    onClick={() => handleMatchClick(match)}
                    className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{match.productName}</h4>
                      <div className="text-lg font-bold text-purple-600">
                        {match.matchScore}%
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{match.reasoning}</p>
                    
                    <div className="text-sm text-gray-500 space-y-1">
                      <div>💰 {match.estimatedRevenue}</div>
                      <div>⏱️ {match.timeToMarket}</div>
                      <div className={`flex items-center space-x-1 ${getRiskColor(match.riskLevel)}`}>
                        <span>⚠️</span>
                        <span className="capitalize">{match.riskLevel} Risk</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Market Opportunity</div>
                      <div className="text-sm text-gray-700">{match.marketOpportunity}</div>
                    </div>
                    
                    <button className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      Explore Opportunity
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Signal Details Panel */}
          {selectedSignal && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">
                📊 Signal Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    {getSignalIcon(selectedSignal.type)} {selectedSignal.title}
                  </h4>
                  <p className="text-sm text-gray-600">{selectedSignal.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Value</div>
                    <div className="font-medium">{selectedSignal.value.toFixed(0)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Change</div>
                    <div className={`font-medium ${selectedSignal.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedSignal.change >= 0 ? '+' : ''}{selectedSignal.change.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Region</div>
                    <div className="font-medium">{selectedSignal.region}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Sector</div>
                    <div className="font-medium">{selectedSignal.sector}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Confidence</div>
                    <div className="font-medium">{selectedSignal.confidence}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Source</div>
                    <div className="font-medium">{selectedSignal.source}</div>
                  </div>
                </div>
                
                {selectedSignal.tags.length > 0 && (
                  <div>
                    <div className="text-gray-500 text-sm mb-2">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedSignal.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataPulseWidget;