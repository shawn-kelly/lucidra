"""
Enhanced Data Pulse Intelligence Engine

Real-time market signal ingestion from:
- Social media (Twitter/X, Reddit, LinkedIn)
- Financial APIs (Yahoo Finance, Alpha Vantage)
- Product trends (Google Trends, Amazon data)
- News sentiment analysis

Features:
- Multi-source data aggregation
- Real-time signal processing
- AI-powered strategic matching
- WebSocket streaming for live updates
"""

import asyncio
import json
import logging
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass, asdict
from enum import Enum
import aiohttp
import pandas as pd
from textblob import TextBlob
import websockets
import duckdb
import sqlite3
from concurrent.futures import ThreadPoolExecutor
import hashlib

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SignalType(Enum):
    SOCIAL = "social"
    FINANCIAL = "financial"
    PRODUCT = "product"
    NEWS = "news"

class RiskLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

@dataclass
class MarketSignal:
    """Core market signal data structure"""
    id: str
    type: SignalType
    title: str
    description: str
    value: float
    change: float
    region: str
    sector: str
    timestamp: str
    confidence: float
    tags: List[str]
    source_url: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            **asdict(self),
            'type': self.type.value,
            'metadata': self.metadata or {}
        }

@dataclass
class StrategicMatch:
    """Strategic product opportunity match"""
    id: str
    product_name: str
    match_score: float
    reasoning: str
    market_opportunity: str
    estimated_revenue: str
    time_to_market: str
    risk_level: RiskLevel
    related_signals: List[str]
    competitor_analysis: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            **asdict(self),
            'risk_level': self.risk_level.value
        }

class DataPulseEngine:
    """Main engine for market intelligence data processing"""
    
    def __init__(self, db_path: str = "data_pulse.db"):
        self.db_path = db_path
        self.session: Optional[aiohttp.ClientSession] = None
        self.websocket_clients: List[websockets.WebSocketServerProtocol] = []
        self.signal_cache: Dict[str, MarketSignal] = {}
        self.match_cache: Dict[str, StrategicMatch] = {}
        self.executor = ThreadPoolExecutor(max_workers=4)
        
        # Initialize database
        self._init_database()
        
        # Mock API keys (in production, load from environment)
        self.api_keys = {
            'twitter': 'mock_twitter_api_key',
            'alpha_vantage': 'mock_alpha_vantage_key',
            'news_api': 'mock_news_api_key'
        }
    
    def _init_database(self):
        """Initialize SQLite database for signal storage"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create signals table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS signals (
                id TEXT PRIMARY KEY,
                type TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                value REAL,
                change_percent REAL,
                region TEXT,
                sector TEXT,
                timestamp TEXT,
                confidence REAL,
                tags TEXT,
                source_url TEXT,
                metadata TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create matches table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS strategic_matches (
                id TEXT PRIMARY KEY,
                product_name TEXT NOT NULL,
                match_score REAL,
                reasoning TEXT,
                market_opportunity TEXT,
                estimated_revenue TEXT,
                time_to_market TEXT,
                risk_level TEXT,
                related_signals TEXT,
                competitor_analysis TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("Database initialized successfully")
    
    async def start(self):
        """Start the data pulse engine"""
        logger.info("🚀 Starting DataPulse Engine...")
        
        # Initialize HTTP session
        self.session = aiohttp.ClientSession()
        
        # Start data ingestion tasks
        tasks = [
            self._ingest_social_signals(),
            self._ingest_financial_signals(),
            self._ingest_product_trends(),
            self._generate_strategic_matches(),
            self._cleanup_old_data()
        ]
        
        await asyncio.gather(*tasks)
    
    async def _ingest_social_signals(self):
        """Ingest social media signals (Twitter, Reddit, LinkedIn)"""
        while True:
            try:
                logger.info("🔄 Ingesting social signals...")
                
                # Mock Twitter trending topics
                twitter_signals = await self._fetch_twitter_trends()
                
                # Mock Reddit discussions
                reddit_signals = await self._fetch_reddit_discussions()
                
                # Process and store signals
                all_signals = twitter_signals + reddit_signals
                for signal in all_signals:
                    await self._store_signal(signal)
                    self.signal_cache[signal.id] = signal
                
                # Broadcast to WebSocket clients
                await self._broadcast_signals(all_signals)
                
                logger.info(f"📊 Processed {len(all_signals)} social signals")
                
            except Exception as e:
                logger.error(f"Error ingesting social signals: {e}")
            
            await asyncio.sleep(60)  # Update every minute
    
    async def _fetch_twitter_trends(self) -> List[MarketSignal]:
        """Fetch trending topics from Twitter/X"""
        # Mock Twitter API response
        mock_trends = [
            {
                'topic': 'AI Automation',
                'volume': 45000,
                'sentiment': 0.8,
                'region': 'Global',
                'related_keywords': ['AI', 'automation', 'productivity', 'tools']
            },
            {
                'topic': 'Remote Work',
                'volume': 23000,
                'sentiment': 0.6,
                'region': 'North America',
                'related_keywords': ['remote', 'work', 'hybrid', 'productivity']
            },
            {
                'topic': 'Sustainable Tech',
                'volume': 18000,
                'sentiment': 0.9,
                'region': 'Europe',
                'related_keywords': ['sustainable', 'green', 'tech', 'environment']
            }
        ]
        
        signals = []
        for trend in mock_trends:
            signal = MarketSignal(
                id=f"twitter_{hashlib.md5(trend['topic'].encode()).hexdigest()[:8]}",
                type=SignalType.SOCIAL,
                title=f"{trend['topic']} Trending",
                description=f"High social media engagement around {trend['topic']} with {trend['volume']} mentions",
                value=min(100, trend['volume'] / 1000),
                change=float(f"{(trend['sentiment'] - 0.5) * 40:.1f}"),
                region=trend['region'],
                sector="Technology",
                timestamp=datetime.now().isoformat(),
                confidence=85.0 + (trend['sentiment'] * 10),
                tags=trend['related_keywords'],
                source_url=f"https://twitter.com/search?q={trend['topic'].replace(' ', '%20')}",
                metadata={
                    'platform': 'twitter',
                    'mention_count': trend['volume'],
                    'sentiment_score': trend['sentiment'],
                    'engagement_rate': 0.12
                }
            )
            signals.append(signal)
        
        return signals
    
    async def _fetch_reddit_discussions(self) -> List[MarketSignal]:
        """Fetch trending discussions from Reddit"""
        # Mock Reddit API response
        mock_discussions = [
            {
                'subreddit': 'entrepreneur',
                'title': 'SaaS pricing strategies gaining traction',
                'score': 1200,
                'comments': 340,
                'sentiment': 0.7,
                'keywords': ['SaaS', 'pricing', 'strategy', 'business']
            },
            {
                'subreddit': 'startups',
                'title': 'FinTech disruption in micropayments',
                'score': 890,
                'comments': 156,
                'sentiment': 0.6,
                'keywords': ['fintech', 'payments', 'disruption', 'innovation']
            }
        ]
        
        signals = []
        for discussion in mock_discussions:
            signal = MarketSignal(
                id=f"reddit_{hashlib.md5(discussion['title'].encode()).hexdigest()[:8]}",
                type=SignalType.SOCIAL,
                title=f"Reddit Discussion: {discussion['title']}",
                description=f"Popular discussion in r/{discussion['subreddit']} with {discussion['score']} upvotes",
                value=min(100, discussion['score'] / 20),
                change=float(f"{(discussion['sentiment'] - 0.5) * 30:.1f}"),
                region="Global",
                sector="Technology",
                timestamp=datetime.now().isoformat(),
                confidence=80.0 + (discussion['sentiment'] * 15),
                tags=discussion['keywords'],
                source_url=f"https://reddit.com/r/{discussion['subreddit']}",
                metadata={
                    'platform': 'reddit',
                    'upvotes': discussion['score'],
                    'comment_count': discussion['comments'],
                    'sentiment_score': discussion['sentiment']
                }
            )
            signals.append(signal)
        
        return signals
    
    async def _ingest_financial_signals(self):
        """Ingest financial market signals"""
        while True:
            try:
                logger.info("💰 Ingesting financial signals...")
                
                # Mock financial data
                financial_signals = await self._fetch_financial_data()
                
                for signal in financial_signals:
                    await self._store_signal(signal)
                    self.signal_cache[signal.id] = signal
                
                await self._broadcast_signals(financial_signals)
                logger.info(f"📈 Processed {len(financial_signals)} financial signals")
                
            except Exception as e:
                logger.error(f"Error ingesting financial signals: {e}")
            
            await asyncio.sleep(120)  # Update every 2 minutes
    
    async def _fetch_financial_data(self) -> List[MarketSignal]:
        """Fetch financial market data"""
        # Mock financial data
        mock_data = [
            {
                'symbol': 'TECH',
                'sector': 'Technology',
                'price': 245.67,
                'change': 5.23,
                'volume': 2340000,
                'volatility': 0.18
            },
            {
                'symbol': 'FINTECH',
                'sector': 'Financial Services',
                'price': 89.34,
                'change': -2.45,
                'volume': 1560000,
                'volatility': 0.24
            },
            {
                'symbol': 'RETAIL',
                'sector': 'Consumer Goods',
                'price': 156.78,
                'change': 3.12,
                'volume': 890000,
                'volatility': 0.15
            }
        ]
        
        signals = []
        for data in mock_data:
            signal = MarketSignal(
                id=f"financial_{data['symbol'].lower()}",
                type=SignalType.FINANCIAL,
                title=f"{data['symbol']} Market Movement",
                description=f"Price: ${data['price']:.2f}, Volume: {data['volume']:,}",
                value=min(100, abs(data['change']) * 10),
                change=data['change'],
                region="Global",
                sector=data['sector'],
                timestamp=datetime.now().isoformat(),
                confidence=90.0 - (data['volatility'] * 100),
                tags=['stocks', 'market', 'trading', data['symbol'].lower()],
                source_url=f"https://finance.yahoo.com/quote/{data['symbol']}",
                metadata={
                    'symbol': data['symbol'],
                    'price': data['price'],
                    'volume': data['volume'],
                    'volatility': data['volatility'],
                    'market_cap': f"${data['price'] * 1000000:.0f}"
                }
            )
            signals.append(signal)
        
        return signals
    
    async def _ingest_product_trends(self):
        """Ingest product trend signals"""
        while True:
            try:
                logger.info("🛍️ Ingesting product trends...")
                
                # Mock product trend data
                product_signals = await self._fetch_product_trends()
                
                for signal in product_signals:
                    await self._store_signal(signal)
                    self.signal_cache[signal.id] = signal
                
                await self._broadcast_signals(product_signals)
                logger.info(f"🏷️ Processed {len(product_signals)} product signals")
                
            except Exception as e:
                logger.error(f"Error ingesting product trends: {e}")
            
            await asyncio.sleep(300)  # Update every 5 minutes
    
    async def _fetch_product_trends(self) -> List[MarketSignal]:
        """Fetch product trend data"""
        # Mock product trend data
        mock_trends = [
            {
                'product': 'AI Writing Tools',
                'search_volume': 89000,
                'growth_rate': 0.45,
                'competition': 'medium',
                'category': 'Software'
            },
            {
                'product': 'Eco-friendly Packaging',
                'search_volume': 67000,
                'growth_rate': 0.62,
                'competition': 'low',
                'category': 'Materials'
            },
            {
                'product': 'Remote Work Equipment',
                'search_volume': 45000,
                'growth_rate': 0.28,
                'competition': 'high',
                'category': 'Hardware'
            }
        ]
        
        signals = []
        for trend in mock_trends:
            signal = MarketSignal(
                id=f"product_{hashlib.md5(trend['product'].encode()).hexdigest()[:8]}",
                type=SignalType.PRODUCT,
                title=f"{trend['product']} Trend",
                description=f"Search volume: {trend['search_volume']:,}, Growth: {trend['growth_rate']:.1%}",
                value=min(100, trend['search_volume'] / 1000),
                change=trend['growth_rate'] * 100,
                region="Global",
                sector="Consumer Goods",
                timestamp=datetime.now().isoformat(),
                confidence=85.0 + (trend['growth_rate'] * 10),
                tags=['products', 'trends', 'market', trend['category'].lower()],
                source_url=f"https://trends.google.com/trends/explore?q={trend['product'].replace(' ', '+')}",
                metadata={
                    'search_volume': trend['search_volume'],
                    'growth_rate': trend['growth_rate'],
                    'competition_level': trend['competition'],
                    'category': trend['category']
                }
            )
            signals.append(signal)
        
        return signals
    
    async def _generate_strategic_matches(self):
        """Generate AI-powered strategic product matches"""
        while True:
            try:
                logger.info("🎯 Generating strategic matches...")
                
                # Get recent high-confidence signals
                recent_signals = [
                    signal for signal in self.signal_cache.values()
                    if signal.confidence > 80 and 
                    datetime.fromisoformat(signal.timestamp.replace('Z', '+00:00')) > datetime.now() - timedelta(hours=24)
                ]
                
                matches = await self._ai_generate_matches(recent_signals)
                
                for match in matches:
                    await self._store_match(match)
                    self.match_cache[match.id] = match
                
                logger.info(f"🎪 Generated {len(matches)} strategic matches")
                
            except Exception as e:
                logger.error(f"Error generating strategic matches: {e}")
            
            await asyncio.sleep(600)  # Update every 10 minutes
    
    async def _ai_generate_matches(self, signals: List[MarketSignal]) -> List[StrategicMatch]:
        """AI-powered strategic match generation"""
        # Mock AI-generated matches based on signals
        if not signals:
            return []
        
        matches = []
        
        # Analyze signal patterns
        ai_signals = [s for s in signals if 'AI' in ' '.join(s.tags)]
        fintech_signals = [s for s in signals if 'fintech' in ' '.join(s.tags) or s.type == SignalType.FINANCIAL]
        product_signals = [s for s in signals if s.type == SignalType.PRODUCT]
        
        # Generate matches for AI signals
        if ai_signals:
            match = StrategicMatch(
                id="ai_match_1",
                product_name="AI-Powered Business Analytics Dashboard",
                match_score=92.5,
                reasoning="Strong AI automation signals indicate growing demand for intelligent business tools",
                market_opportunity="SMBs seeking automated insights without technical complexity",
                estimated_revenue="$100K-400K/year",
                time_to_market="4-8 months",
                risk_level=RiskLevel.MEDIUM,
                related_signals=[s.id for s in ai_signals[:3]],
                competitor_analysis="Moderate competition with opportunity for vertical specialization"
            )
            matches.append(match)
        
        # Generate matches for fintech signals
        if fintech_signals:
            match = StrategicMatch(
                id="fintech_match_1",
                product_name="Simplified Payment API for Creators",
                match_score=88.3,
                reasoning="Financial volatility creates opportunity for stable, creator-focused payment solutions",
                market_opportunity="Content creators and small businesses needing simple payment processing",
                estimated_revenue="$75K-300K/year",
                time_to_market="6-12 months",
                risk_level=RiskLevel.HIGH,
                related_signals=[s.id for s in fintech_signals[:2]],
                competitor_analysis="High competition but underserved creator economy niche"
            )
            matches.append(match)
        
        # Generate matches for product signals
        if product_signals:
            match = StrategicMatch(
                id="product_match_1",
                product_name="Sustainable Business Starter Kit",
                match_score=94.1,
                reasoning="Growing product trends in sustainability create bundling opportunity",
                market_opportunity="Eco-conscious entrepreneurs starting sustainable businesses",
                estimated_revenue="$50K-250K/year",
                time_to_market="3-6 months",
                risk_level=RiskLevel.LOW,
                related_signals=[s.id for s in product_signals[:2]],
                competitor_analysis="Emerging market with first-mover advantage potential"
            )
            matches.append(match)
        
        return matches
    
    async def _store_signal(self, signal: MarketSignal):
        """Store signal in database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO signals 
            (id, type, title, description, value, change_percent, region, sector, 
             timestamp, confidence, tags, source_url, metadata)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            signal.id,
            signal.type.value,
            signal.title,
            signal.description,
            signal.value,
            signal.change,
            signal.region,
            signal.sector,
            signal.timestamp,
            signal.confidence,
            json.dumps(signal.tags),
            signal.source_url,
            json.dumps(signal.metadata or {})
        ))
        
        conn.commit()
        conn.close()
    
    async def _store_match(self, match: StrategicMatch):
        """Store strategic match in database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO strategic_matches 
            (id, product_name, match_score, reasoning, market_opportunity, 
             estimated_revenue, time_to_market, risk_level, related_signals, competitor_analysis)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            match.id,
            match.product_name,
            match.match_score,
            match.reasoning,
            match.market_opportunity,
            match.estimated_revenue,
            match.time_to_market,
            match.risk_level.value,
            json.dumps(match.related_signals),
            match.competitor_analysis
        ))
        
        conn.commit()
        conn.close()
    
    async def _broadcast_signals(self, signals: List[MarketSignal]):
        """Broadcast signals to WebSocket clients"""
        if not self.websocket_clients:
            return
        
        message = {
            'type': 'signals_update',
            'data': [signal.to_dict() for signal in signals],
            'timestamp': datetime.now().isoformat()
        }
        
        # Send to all connected clients
        disconnected_clients = []
        for client in self.websocket_clients:
            try:
                await client.send(json.dumps(message))
            except websockets.exceptions.ConnectionClosed:
                disconnected_clients.append(client)
        
        # Remove disconnected clients
        for client in disconnected_clients:
            self.websocket_clients.remove(client)
    
    async def _cleanup_old_data(self):
        """Clean up old signals and matches"""
        while True:
            try:
                logger.info("🧹 Cleaning up old data...")
                
                cutoff_date = datetime.now() - timedelta(days=7)
                
                conn = sqlite3.connect(self.db_path)
                cursor = conn.cursor()
                
                # Delete old signals
                cursor.execute('DELETE FROM signals WHERE created_at < ?', (cutoff_date,))
                
                # Delete old matches
                cursor.execute('DELETE FROM strategic_matches WHERE created_at < ?', (cutoff_date,))
                
                conn.commit()
                conn.close()
                
                logger.info("✅ Data cleanup completed")
                
            except Exception as e:
                logger.error(f"Error during data cleanup: {e}")
            
            await asyncio.sleep(3600)  # Run every hour
    
    async def get_signals(self, filters: Dict[str, Any] = None) -> List[MarketSignal]:
        """Get filtered signals from cache or database"""
        signals = list(self.signal_cache.values())
        
        if filters:
            if 'signal_types' in filters:
                signals = [s for s in signals if s.type.value in filters['signal_types']]
            if 'regions' in filters:
                signals = [s for s in signals if s.region in filters['regions']]
            if 'sectors' in filters:
                signals = [s for s in signals if s.sector in filters['sectors']]
            if 'confidence_threshold' in filters:
                signals = [s for s in signals if s.confidence >= filters['confidence_threshold']]
        
        return sorted(signals, key=lambda x: x.timestamp, reverse=True)
    
    async def get_strategic_matches(self) -> List[StrategicMatch]:
        """Get strategic matches from cache"""
        return sorted(self.match_cache.values(), key=lambda x: x.match_score, reverse=True)
    
    async def stop(self):
        """Stop the data pulse engine"""
        logger.info("⏹️ Stopping DataPulse Engine...")
        
        if self.session:
            await self.session.close()
        
        self.executor.shutdown(wait=True)
        
        # Close all WebSocket connections
        for client in self.websocket_clients:
            await client.close()
        
        logger.info("✅ DataPulse Engine stopped")

# WebSocket handler
async def websocket_handler(websocket, path):
    """Handle WebSocket connections for real-time updates"""
    engine.websocket_clients.append(websocket)
    logger.info(f"📡 WebSocket client connected: {websocket.remote_address}")
    
    try:
        # Send initial data
        signals = await engine.get_signals()
        matches = await engine.get_strategic_matches()
        
        initial_message = {
            'type': 'initial_data',
            'signals': [signal.to_dict() for signal in signals],
            'matches': [match.to_dict() for match in matches],
            'timestamp': datetime.now().isoformat()
        }
        
        await websocket.send(json.dumps(initial_message))
        
        # Keep connection alive
        async for message in websocket:
            # Handle client requests
            data = json.loads(message)
            
            if data['type'] == 'get_signals':
                signals = await engine.get_signals(data.get('filters'))
                response = {
                    'type': 'signals_response',
                    'data': [signal.to_dict() for signal in signals]
                }
                await websocket.send(json.dumps(response))
            
            elif data['type'] == 'get_matches':
                matches = await engine.get_strategic_matches()
                response = {
                    'type': 'matches_response',
                    'data': [match.to_dict() for match in matches]
                }
                await websocket.send(json.dumps(response))
    
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        if websocket in engine.websocket_clients:
            engine.websocket_clients.remove(websocket)
        logger.info(f"📡 WebSocket client disconnected: {websocket.remote_address}")

# Global engine instance
engine = DataPulseEngine()

async def main():
    """Main entry point"""
    try:
        # Start WebSocket server
        websocket_server = websockets.serve(websocket_handler, "localhost", 8765)
        logger.info("🌐 WebSocket server started on ws://localhost:8765")
        
        # Start data pulse engine
        await asyncio.gather(
            websocket_server,
            engine.start()
        )
        
    except KeyboardInterrupt:
        logger.info("⏹️ Received shutdown signal")
    finally:
        await engine.stop()

if __name__ == "__main__":
    asyncio.run(main())