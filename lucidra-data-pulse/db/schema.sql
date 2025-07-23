-- Lucidra Data Pulse Database Schema
-- Optimized for both DuckDB (analytical) and PostgreSQL (transactional)

-- =============================================
-- CORE TABLES
-- =============================================

-- Data Sources Configuration
CREATE TABLE IF NOT EXISTS data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'social', 'financial', 'product', 'news'
    endpoint VARCHAR(500),
    api_key_hash VARCHAR(255),
    rate_limit_per_hour INTEGER DEFAULT 1000,
    is_active BOOLEAN DEFAULT TRUE,
    config_json JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Collection Sessions
CREATE TABLE IF NOT EXISTS collection_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES data_sources(id),
    session_type VARCHAR(50) NOT NULL, -- 'scheduled', 'manual', 'triggered'
    status VARCHAR(20) DEFAULT 'running', -- 'running', 'completed', 'failed', 'cancelled'
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    records_collected INTEGER DEFAULT 0,
    errors_count INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SOCIAL INTELLIGENCE TABLES
-- =============================================

-- Social Media Signals
CREATE TABLE IF NOT EXISTS social_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id VARCHAR(255), -- Original ID from the platform
    source VARCHAR(50) NOT NULL, -- 'twitter', 'reddit', 'linkedin', 'news'
    content TEXT NOT NULL,
    author VARCHAR(255),
    author_id VARCHAR(100),
    timestamp TIMESTAMP NOT NULL,
    url VARCHAR(1000),
    engagement_score DECIMAL(10,2) DEFAULT 0,
    sentiment_score DECIMAL(5,4) DEFAULT 0, -- -1 to 1
    sentiment_label VARCHAR(20), -- 'very_negative', 'negative', 'neutral', 'positive', 'very_positive'
    hashtags TEXT[], -- Array of hashtags
    mentions TEXT[], -- Array of mentions
    keywords TEXT[], -- Array of extracted keywords
    influence_score DECIMAL(10,2) DEFAULT 0,
    reach_estimate INTEGER DEFAULT 0,
    language VARCHAR(10) DEFAULT 'en',
    location VARCHAR(100),
    metadata JSONB,
    collection_session_id UUID REFERENCES collection_sessions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    UNIQUE(external_id, source)
);

-- Social Trends
CREATE TABLE IF NOT EXISTS social_trends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword VARCHAR(255) NOT NULL,
    trend_score DECIMAL(10,2) DEFAULT 0,
    volume INTEGER DEFAULT 0,
    velocity DECIMAL(10,4) DEFAULT 0, -- Rate of change
    source VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    related_terms TEXT[],
    sentiment_distribution JSONB, -- {'positive': 0.6, 'negative': 0.2, 'neutral': 0.2}
    geographic_data JSONB,
    metadata JSONB,
    collection_session_id UUID REFERENCES collection_sessions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- FINANCIAL INTELLIGENCE TABLES
-- =============================================

-- Financial Signals
CREATE TABLE IF NOT EXISTS financial_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(20) NOT NULL,
    data_type VARCHAR(50) NOT NULL, -- 'stock_price', 'market_index', 'crypto', etc.
    sector VARCHAR(50),
    price DECIMAL(15,4) NOT NULL,
    volume BIGINT DEFAULT 0,
    change_percent DECIMAL(8,4) DEFAULT 0,
    change_absolute DECIMAL(15,4) DEFAULT 0,
    timestamp TIMESTAMP NOT NULL,
    trend_direction VARCHAR(20), -- 'bullish', 'bearish', 'neutral', 'volatile'
    volatility_score DECIMAL(8,4) DEFAULT 0,
    liquidity_score DECIMAL(8,4) DEFAULT 0,
    sentiment_score DECIMAL(5,4) DEFAULT 0,
    technical_indicators JSONB, -- RSI, MACD, Bollinger Bands, etc.
    fundamental_metrics JSONB, -- P/E, Market Cap, etc.
    metadata JSONB,
    collection_session_id UUID REFERENCES collection_sessions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for time-series queries
    INDEX idx_financial_signals_symbol_timestamp (symbol, timestamp),
    INDEX idx_financial_signals_sector_timestamp (sector, timestamp)
);

-- Economic Indicators
CREATE TABLE IF NOT EXISTS economic_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    indicator_name VARCHAR(100) NOT NULL,
    series_id VARCHAR(50),
    value DECIMAL(15,4) NOT NULL,
    previous_value DECIMAL(15,4),
    change_percent DECIMAL(8,4) DEFAULT 0,
    release_date TIMESTAMP NOT NULL,
    next_release TIMESTAMP,
    country VARCHAR(10) DEFAULT 'US',
    category VARCHAR(50), -- 'employment', 'inflation', 'gdp', etc.
    importance_score DECIMAL(5,2) DEFAULT 0, -- 0-10 scale
    market_impact VARCHAR(20), -- 'high', 'medium', 'low'
    metadata JSONB,
    collection_session_id UUID REFERENCES collection_sessions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Unique constraint to prevent duplicates
    UNIQUE(series_id, release_date)
);

-- Market Sentiment
CREATE TABLE IF NOT EXISTS market_sentiment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(20) NOT NULL,
    sentiment_score DECIMAL(5,4) DEFAULT 0,
    confidence_score DECIMAL(5,4) DEFAULT 0,
    sentiment_label VARCHAR(20), -- 'positive', 'negative', 'neutral'
    news_volume INTEGER DEFAULT 0,
    social_volume INTEGER DEFAULT 0,
    institutional_activity DECIMAL(8,4) DEFAULT 0,
    retail_activity DECIMAL(8,4) DEFAULT 0,
    fear_greed_index DECIMAL(5,2) DEFAULT 50, -- 0-100 scale
    timestamp TIMESTAMP NOT NULL,
    sources TEXT[], -- Array of data sources
    metadata JSONB,
    collection_session_id UUID REFERENCES collection_sessions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_market_sentiment_symbol_timestamp (symbol, timestamp)
);

-- =============================================
-- PRODUCT INTELLIGENCE TABLES
-- =============================================

-- Product Trends
CREATE TABLE IF NOT EXISTS product_trends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'electronics', 'fashion', etc.
    brand VARCHAR(100),
    current_price DECIMAL(12,2) DEFAULT 0,
    price_history JSONB, -- Array of price points with timestamps
    price_movement VARCHAR(20), -- 'increasing', 'decreasing', 'stable', 'volatile'
    price_volatility DECIMAL(8,4) DEFAULT 0,
    search_volume INTEGER DEFAULT 0,
    search_growth DECIMAL(8,4) DEFAULT 0,
    sentiment_score DECIMAL(5,4) DEFAULT 0,
    popularity_score DECIMAL(8,4) DEFAULT 0,
    trend_status VARCHAR(20), -- 'emerging', 'growing', 'mature', 'declining'
    seasonal_factor DECIMAL(5,4) DEFAULT 0,
    geographic_data JSONB,
    competitor_analysis JSONB,
    timestamp TIMESTAMP NOT NULL,
    sources TEXT[],
    metadata JSONB,
    collection_session_id UUID REFERENCES collection_sessions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_product_trends_category_timestamp (category, timestamp),
    INDEX idx_product_trends_brand_timestamp (brand, timestamp)
);

-- Market Insights
CREATE TABLE IF NOT EXISTS market_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL,
    insight_type VARCHAR(50) NOT NULL, -- 'trend', 'pricing', 'competitive', etc.
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    confidence_score DECIMAL(5,4) DEFAULT 0,
    impact_score DECIMAL(5,2) DEFAULT 0, -- 0-10 scale
    time_horizon VARCHAR(50), -- '1-3 months', '6-12 months', etc.
    supporting_data JSONB,
    recommendations TEXT[],
    timestamp TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB,
    collection_session_id UUID REFERENCES collection_sessions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_market_insights_category_timestamp (category, timestamp),
    INDEX idx_market_insights_impact_score (impact_score DESC)
);

-- Competitor Intelligence
CREATE TABLE IF NOT EXISTS competitor_intelligence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competitor_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    product_launches JSONB, -- Array of product launch data
    pricing_strategy JSONB,
    market_share DECIMAL(8,4) DEFAULT 0,
    innovation_score DECIMAL(5,2) DEFAULT 0,
    customer_satisfaction DECIMAL(5,2) DEFAULT 0,
    recent_activities JSONB, -- Array of recent activity data
    strategic_moves TEXT[],
    timestamp TIMESTAMP NOT NULL,
    metadata JSONB,
    collection_session_id UUID REFERENCES collection_sessions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_competitor_intelligence_category_timestamp (category, timestamp)
);

-- =============================================
-- SIGNAL COMPOSITION TABLES
-- =============================================

-- Signal Definitions
CREATE TABLE IF NOT EXISTS signal_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Reference to user system
    name VARCHAR(255) NOT NULL,
    description TEXT,
    signal_type VARCHAR(50) NOT NULL, -- 'trend', 'alert', 'composite', etc.
    data_sources TEXT[], -- Array of data source types
    filters JSONB, -- Filter conditions
    aggregation_rules JSONB, -- How to combine multiple signals
    threshold_config JSONB, -- Alert thresholds
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_signal_definitions_user_id (user_id)
);

-- Signal Alerts
CREATE TABLE IF NOT EXISTS signal_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    signal_definition_id UUID REFERENCES signal_definitions(id),
    alert_type VARCHAR(50) NOT NULL, -- 'threshold', 'trend_change', 'anomaly', etc.
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    acknowledged_at TIMESTAMP,
    resolved_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'acknowledged', 'resolved'
    trigger_data JSONB, -- Data that triggered the alert
    metadata JSONB,
    
    INDEX idx_signal_alerts_status_severity (status, severity),
    INDEX idx_signal_alerts_triggered_at (triggered_at DESC)
);

-- Signal Compositions (User-created dashboards)
CREATE TABLE IF NOT EXISTS signal_compositions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    layout_config JSONB, -- Dashboard layout configuration
    signal_widgets JSONB, -- Array of widget configurations
    refresh_interval INTEGER DEFAULT 300, -- seconds
    is_public BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_signal_compositions_user_id (user_id)
);

-- =============================================
-- ANALYTICAL VIEWS
-- =============================================

-- Real-time Signal Summary
CREATE VIEW IF NOT EXISTS signal_summary AS
SELECT 
    'social' as signal_type,
    COUNT(*) as total_signals,
    AVG(sentiment_score) as avg_sentiment,
    MAX(timestamp) as latest_timestamp,
    COUNT(DISTINCT source) as unique_sources
FROM social_signals
WHERE timestamp > NOW() - INTERVAL '24 hours'
UNION ALL
SELECT 
    'financial' as signal_type,
    COUNT(*) as total_signals,
    AVG(sentiment_score) as avg_sentiment,
    MAX(timestamp) as latest_timestamp,
    COUNT(DISTINCT symbol) as unique_sources
FROM financial_signals
WHERE timestamp > NOW() - INTERVAL '24 hours'
UNION ALL
SELECT 
    'product' as signal_type,
    COUNT(*) as total_signals,
    AVG(sentiment_score) as avg_sentiment,
    MAX(timestamp) as latest_timestamp,
    COUNT(DISTINCT category) as unique_sources
FROM product_trends
WHERE timestamp > NOW() - INTERVAL '24 hours';

-- Trending Keywords (Social)
CREATE VIEW IF NOT EXISTS trending_keywords AS
SELECT 
    keyword,
    COUNT(*) as mention_count,
    AVG(sentiment_score) as avg_sentiment,
    MAX(timestamp) as latest_mention,
    array_agg(DISTINCT source) as sources
FROM social_trends
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY keyword
ORDER BY mention_count DESC, avg_sentiment DESC
LIMIT 100;

-- Market Movers (Financial)
CREATE VIEW IF NOT EXISTS market_movers AS
SELECT 
    symbol,
    sector,
    price,
    change_percent,
    volume,
    volatility_score,
    sentiment_score,
    timestamp
FROM financial_signals
WHERE timestamp > NOW() - INTERVAL '1 hour'
    AND ABS(change_percent) > 2.0
ORDER BY ABS(change_percent) DESC
LIMIT 50;

-- High-Impact Insights
CREATE VIEW IF NOT EXISTS high_impact_insights AS
SELECT 
    category,
    insight_type,
    title,
    description,
    confidence_score,
    impact_score,
    time_horizon,
    timestamp
FROM market_insights
WHERE impact_score >= 7.0
    AND is_active = TRUE
    AND timestamp > NOW() - INTERVAL '7 days'
ORDER BY impact_score DESC, timestamp DESC;

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Time-series indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_social_signals_timestamp ON social_signals(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_social_signals_source_timestamp ON social_signals(source, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_social_signals_sentiment ON social_signals(sentiment_score, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_financial_signals_timestamp ON financial_signals(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_financial_signals_change_percent ON financial_signals(change_percent DESC, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_financial_signals_volatility ON financial_signals(volatility_score DESC, timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_product_trends_timestamp ON product_trends(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_product_trends_search_growth ON product_trends(search_growth DESC, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_product_trends_popularity ON product_trends(popularity_score DESC, timestamp DESC);

-- Text search indexes
CREATE INDEX IF NOT EXISTS idx_social_signals_content_gin ON social_signals USING gin(to_tsvector('english', content));
CREATE INDEX IF NOT EXISTS idx_market_insights_title_gin ON market_insights USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_market_insights_description_gin ON market_insights USING gin(to_tsvector('english', description));

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
CREATE TRIGGER update_data_sources_updated_at BEFORE UPDATE ON data_sources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_signal_definitions_updated_at BEFORE UPDATE ON signal_definitions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_signal_compositions_updated_at BEFORE UPDATE ON signal_compositions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Signal aggregation function
CREATE OR REPLACE FUNCTION calculate_signal_strength(
    sentiment_score DECIMAL,
    volume INTEGER,
    trend_score DECIMAL
) RETURNS DECIMAL AS $$
BEGIN
    RETURN (
        COALESCE(sentiment_score, 0) * 0.4 +
        COALESCE(LOG(GREATEST(volume, 1)) / 10, 0) * 0.3 +
        COALESCE(trend_score / 100, 0) * 0.3
    );
END;
$$ LANGUAGE plpgsql;

-- Data retention function
CREATE OR REPLACE FUNCTION cleanup_old_data(retention_days INTEGER DEFAULT 365)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
    cutoff_date TIMESTAMP;
BEGIN
    cutoff_date := NOW() - INTERVAL '1 day' * retention_days;
    
    -- Clean up old social signals
    DELETE FROM social_signals WHERE created_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Clean up old financial signals
    DELETE FROM financial_signals WHERE created_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = deleted_count + ROW_COUNT;
    
    -- Clean up old product trends
    DELETE FROM product_trends WHERE created_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = deleted_count + ROW_COUNT;
    
    -- Clean up old alerts (keep longer)
    DELETE FROM signal_alerts WHERE triggered_at < (NOW() - INTERVAL '1 day' * (retention_days * 2));
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- INITIAL DATA
-- =============================================

-- Insert default data sources
INSERT INTO data_sources (name, type, rate_limit_per_hour, config_json) VALUES
('Twitter API', 'social', 1000, '{"version": "v2", "features": ["tweets", "trends", "sentiment"]}'),
('Reddit API', 'social', 600, '{"version": "1.0", "features": ["posts", "comments", "subreddits"]}'),
('News API', 'social', 500, '{"version": "v2", "features": ["articles", "sources", "sentiment"]}'),
('Yahoo Finance', 'financial', 2000, '{"version": "v8", "features": ["stocks", "indices", "crypto"]}'),
('Alpha Vantage', 'financial', 500, '{"version": "1.0", "features": ["stocks", "forex", "crypto", "indicators"]}'),
('FRED API', 'financial', 1000, '{"version": "1.0", "features": ["economic_indicators", "gdp", "employment"]}'),
('Google Trends', 'product', 100, '{"version": "1.0", "features": ["search_volume", "trends", "related_queries"]}'),
('Amazon Product API', 'product', 200, '{"version": "1.0", "features": ["products", "prices", "reviews"]}')
ON CONFLICT (name) DO NOTHING;

-- Insert sample signal definitions
INSERT INTO signal_definitions (user_id, name, description, signal_type, data_sources, filters, threshold_config) VALUES
(gen_random_uuid(), 'High Sentiment Surge', 'Detect sudden increases in positive sentiment', 'trend', ARRAY['social'], '{"sentiment_threshold": 0.7, "volume_threshold": 1000}', '{"alert_threshold": 0.8, "trend_duration": "1 hour"}'),
(gen_random_uuid(), 'Market Volatility Alert', 'Alert on high market volatility', 'alert', ARRAY['financial'], '{"volatility_threshold": 5.0, "symbols": ["SPY", "QQQ", "DIA"]}', '{"alert_threshold": 7.0, "cooldown_minutes": 30}'),
(gen_random_uuid(), 'Product Trend Emergence', 'Identify emerging product trends', 'trend', ARRAY['product'], '{"search_growth_threshold": 20, "category": "electronics"}', '{"alert_threshold": 50, "trend_duration": "7 days"}')
ON CONFLICT DO NOTHING;

-- =============================================
-- PERFORMANCE OPTIMIZATION
-- =============================================

-- Table partitioning for large datasets (PostgreSQL specific)
-- Note: This would typically be done based on timestamp ranges

-- Analyze tables for query optimization
ANALYZE social_signals;
ANALYZE financial_signals;
ANALYZE product_trends;
ANALYZE market_insights;

-- =============================================
-- SECURITY
-- =============================================

-- Row Level Security policies would go here
-- Example: Users can only see their own signal compositions
-- ALTER TABLE signal_compositions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY signal_compositions_user_policy ON signal_compositions
--     FOR ALL TO authenticated_users
--     USING (user_id = current_user_id());

-- =============================================
-- MONITORING AND HEALTH CHECKS
-- =============================================

-- Health check view
CREATE VIEW IF NOT EXISTS system_health AS
SELECT 
    'data_ingestion' as component,
    CASE 
        WHEN COUNT(*) > 0 THEN 'healthy'
        ELSE 'warning'
    END as status,
    COUNT(*) as active_sessions,
    MAX(created_at) as last_activity
FROM collection_sessions
WHERE status = 'running'
UNION ALL
SELECT 
    'signal_processing' as component,
    CASE 
        WHEN COUNT(*) > 0 THEN 'healthy'
        ELSE 'warning'
    END as status,
    COUNT(*) as recent_signals,
    MAX(timestamp) as last_signal
FROM social_signals
WHERE timestamp > NOW() - INTERVAL '1 hour'
UNION ALL
SELECT 
    'alert_system' as component,
    CASE 
        WHEN COUNT(*) < 100 THEN 'healthy'
        ELSE 'warning'
    END as status,
    COUNT(*) as active_alerts,
    MAX(triggered_at) as last_alert
FROM signal_alerts
WHERE status = 'active';

-- Data quality metrics
CREATE VIEW IF NOT EXISTS data_quality_metrics AS
SELECT 
    'social_signals' as table_name,
    COUNT(*) as total_records,
    COUNT(*) FILTER (WHERE sentiment_score IS NOT NULL) as records_with_sentiment,
    COUNT(*) FILTER (WHERE timestamp > NOW() - INTERVAL '24 hours') as recent_records,
    AVG(CASE WHEN content IS NOT NULL AND LENGTH(content) > 0 THEN 1 ELSE 0 END) as content_completeness
FROM social_signals
UNION ALL
SELECT 
    'financial_signals' as table_name,
    COUNT(*) as total_records,
    COUNT(*) FILTER (WHERE price > 0) as records_with_price,
    COUNT(*) FILTER (WHERE timestamp > NOW() - INTERVAL '24 hours') as recent_records,
    AVG(CASE WHEN symbol IS NOT NULL THEN 1 ELSE 0 END) as symbol_completeness
FROM financial_signals
UNION ALL
SELECT 
    'product_trends' as table_name,
    COUNT(*) as total_records,
    COUNT(*) FILTER (WHERE search_volume > 0) as records_with_search_volume,
    COUNT(*) FILTER (WHERE timestamp > NOW() - INTERVAL '24 hours') as recent_records,
    AVG(CASE WHEN product_name IS NOT NULL THEN 1 ELSE 0 END) as product_name_completeness
FROM product_trends;