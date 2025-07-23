"""
Data Pulse Module - Social Media & Trends Intelligence

This module handles ingestion of social media signals, sentiment analysis,
and trending data from multiple sources including Twitter/X, Reddit, and Google Trends.

Features:
- Multi-source data ingestion with fallback mechanisms
- Sentiment analysis and engagement metrics
- DuckDB storage with proper indexing
- REST API endpoints for querying
- Real-time data streaming capabilities

Author: Lucidra Development Team
"""

import os
import json
import logging
import asyncio
import aiohttp
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Union
from dataclasses import dataclass, asdict
from enum import Enum
import duckdb
import pandas as pd
from contextlib import asynccontextmanager
import hashlib
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
DB_PATH = os.environ.get('LUCIDRA_DB_PATH', 'data/lucidra_signals.db')
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds
MAX_RETRIES = 3
RETRY_DELAY = 5

class SignalType(Enum):
    """Signal type enumeration for categorizing data sources"""
    SOCIAL = "social"
    FINANCIAL = "financial"
    PRODUCT = "product"
    TREND = "trend"

class Platform(Enum):
    """Platform enumeration for data sources"""
    TWITTER = "twitter"
    REDDIT = "reddit"
    GOOGLE_TRENDS = "google_trends"
    UNKNOWN = "unknown"

@dataclass
class MarketSignal:
    """
    Data structure for market signals from various sources
    """
    id: str
    platform: Platform
    signal_type: SignalType
    title: str
    description: str
    content: str
    engagement_score: float
    sentiment_score: float  # -1 to 1
    confidence: float  # 0 to 1
    region: str
    sector: str
    keywords: List[str]
    hashtags: List[str]
    metadata: Dict[str, Any]
    timestamp: datetime
    source_url: Optional[str] = None
    author: Optional[str] = None

class DataPulseEngine:
    """
    Main engine for ingesting and processing market signals
    """
    
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.rate_limits = {}
        self.session = None
        self._setup_database()
        
    def _setup_database(self):
        """Initialize DuckDB database and create necessary tables"""
        try:
            conn = duckdb.connect(self.db_path)
            
            # Create signals table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS market_signals (
                    id VARCHAR PRIMARY KEY,
                    platform VARCHAR NOT NULL,
                    signal_type VARCHAR NOT NULL,
                    title VARCHAR NOT NULL,
                    description TEXT,
                    content TEXT,
                    engagement_score FLOAT,
                    sentiment_score FLOAT,
                    confidence FLOAT,
                    region VARCHAR,
                    sector VARCHAR,
                    keywords VARCHAR[], -- Array of keywords
                    hashtags VARCHAR[], -- Array of hashtags
                    metadata JSON,
                    timestamp TIMESTAMP,
                    source_url VARCHAR,
                    author VARCHAR,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create indexes for better query performance
            conn.execute("CREATE INDEX IF NOT EXISTS idx_signals_platform ON market_signals(platform)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_signals_type ON market_signals(signal_type)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_signals_timestamp ON market_signals(timestamp)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_signals_sector ON market_signals(sector)")
            
            # Create rate limiting table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS rate_limits (
                    platform VARCHAR PRIMARY KEY,
                    last_request TIMESTAMP,
                    request_count INTEGER,
                    reset_time TIMESTAMP
                )
            """)
            
            conn.close()
            logger.info("Database initialized successfully")
            
        except Exception as e:
            logger.error(f"Database initialization failed: {e}")
            raise
    
    async def __aenter__(self):
        """Async context manager entry"""
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            headers={'User-Agent': 'Lucidra-DataPulse/1.0'}
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self.session:
            await self.session.close()
    
    def _check_rate_limit(self, platform: str, limit_per_hour: int = 100) -> bool:
        """
        Check if API rate limit allows for new requests
        
        Args:
            platform: Platform name
            limit_per_hour: Maximum requests per hour
            
        Returns:
            bool: True if request is allowed, False otherwise
        """
        now = datetime.now()
        
        if platform not in self.rate_limits:
            self.rate_limits[platform] = {
                'count': 0,
                'window_start': now
            }
        
        rate_info = self.rate_limits[platform]
        
        # Reset window if hour has passed
        if now - rate_info['window_start'] > timedelta(hours=1):
            rate_info['count'] = 0
            rate_info['window_start'] = now
        
        if rate_info['count'] >= limit_per_hour:
            logger.warning(f"Rate limit exceeded for {platform}")
            return False
        
        rate_info['count'] += 1
        return True
    
    async def _make_request_with_fallback(self, url: str, headers: Dict = None, 
                                        params: Dict = None, platform: str = "unknown") -> Optional[Dict]:
        """
        Make HTTP request with retry logic and fallback handling
        
        Args:
            url: Request URL
            headers: HTTP headers
            params: Query parameters
            platform: Platform name for rate limiting
            
        Returns:
            Response data or None if failed
        """
        if not self._check_rate_limit(platform):
            logger.warning(f"Rate limit exceeded for {platform}, using fallback data")
            return None
        
        for attempt in range(MAX_RETRIES):
            try:
                async with self.session.get(url, headers=headers, params=params) as response:
                    if response.status == 200:
                        return await response.json()
                    elif response.status == 429:  # Rate limited
                        logger.warning(f"Rate limited by {platform} API, attempt {attempt + 1}")
                        await asyncio.sleep(RETRY_DELAY * (attempt + 1))
                    else:
                        logger.error(f"HTTP {response.status} for {platform}")
                        
            except aiohttp.ClientError as e:
                logger.error(f"Request failed for {platform}: {e}")
                if attempt < MAX_RETRIES - 1:
                    await asyncio.sleep(RETRY_DELAY * (attempt + 1))
        
        return None
    
    async def ingest_twitter_signals(self, keywords: List[str] = None) -> List[MarketSignal]:
        """
        Ingest trending signals from Twitter/X API
        
        Args:
            keywords: List of keywords to search for
            
        Returns:
            List of MarketSignal objects
        """
        signals = []
        
        # Fallback to demo data if API unavailable
        if not self._check_rate_limit("twitter"):
            return self._get_twitter_fallback_data()
        
        # Twitter API v2 endpoints (requires authentication)
        base_url = "https://api.twitter.com/2/tweets/search/recent"
        headers = {
            "Authorization": f"Bearer {os.environ.get('TWITTER_BEARER_TOKEN', '')}",
            "Content-Type": "application/json"
        }
        
        default_keywords = ["startup", "innovation", "technology", "business", "entrepreneurship"]
        search_terms = keywords or default_keywords
        
        for keyword in search_terms:
            params = {
                "query": f"{keyword} -is:retweet lang:en",
                "tweet.fields": "author_id,created_at,public_metrics,context_annotations",
                "max_results": 10
            }
            
            try:
                data = await self._make_request_with_fallback(
                    base_url, headers=headers, params=params, platform="twitter"
                )
                
                if data and 'data' in data:
                    for tweet in data['data']:
                        signal = self._process_twitter_tweet(tweet, keyword)
                        if signal:
                            signals.append(signal)
                            
            except Exception as e:
                logger.error(f"Twitter ingestion failed for keyword '{keyword}': {e}")
                continue
        
        logger.info(f"Ingested {len(signals)} Twitter signals")
        return signals
    
    def _process_twitter_tweet(self, tweet: Dict, keyword: str) -> Optional[MarketSignal]:
        """Process individual Twitter tweet into MarketSignal"""
        try:
            metrics = tweet.get('public_metrics', {})
            engagement = (
                metrics.get('like_count', 0) +
                metrics.get('retweet_count', 0) * 2 +
                metrics.get('reply_count', 0) * 1.5
            )
            
            # Simple sentiment analysis (placeholder - would use proper NLP)
            sentiment = self._calculate_sentiment(tweet.get('text', ''))
            
            signal = MarketSignal(
                id=f"twitter_{tweet['id']}",
                platform=Platform.TWITTER,
                signal_type=SignalType.SOCIAL,
                title=f"Twitter trend: {keyword}",
                description=tweet.get('text', '')[:200] + "..." if len(tweet.get('text', '')) > 200 else tweet.get('text', ''),
                content=tweet.get('text', ''),
                engagement_score=min(engagement / 100, 1.0),  # Normalize to 0-1
                sentiment_score=sentiment,
                confidence=0.7,  # Default confidence for Twitter data
                region="Global",
                sector="Technology",  # Would be determined by keyword analysis
                keywords=[keyword],
                hashtags=self._extract_hashtags(tweet.get('text', '')),
                metadata={
                    'author_id': tweet.get('author_id'),
                    'public_metrics': metrics,
                    'source': 'twitter_api_v2'
                },
                timestamp=datetime.fromisoformat(tweet['created_at'].replace('Z', '+00:00')),
                source_url=f"https://twitter.com/i/web/status/{tweet['id']}",
                author=tweet.get('author_id')
            )
            
            return signal
            
        except Exception as e:
            logger.error(f"Failed to process Twitter tweet: {e}")
            return None
    
    async def ingest_reddit_signals(self, subreddits: List[str] = None) -> List[MarketSignal]:
        """
        Ingest trending signals from Reddit API
        
        Args:
            subreddits: List of subreddit names to monitor
            
        Returns:
            List of MarketSignal objects
        """
        signals = []
        
        if not self._check_rate_limit("reddit"):
            return self._get_reddit_fallback_data()
        
        default_subreddits = ["startups", "entrepreneur", "technology", "business"]
        subreddits = subreddits or default_subreddits
        
        for subreddit in subreddits:
            url = f"https://www.reddit.com/r/{subreddit}/hot.json"
            params = {"limit": 25}
            
            try:
                data = await self._make_request_with_fallback(
                    url, params=params, platform="reddit"
                )
                
                if data and 'data' in data:
                    for post in data['data']['children']:
                        signal = self._process_reddit_post(post['data'], subreddit)
                        if signal:
                            signals.append(signal)
                            
            except Exception as e:
                logger.error(f"Reddit ingestion failed for r/{subreddit}: {e}")
                continue
        
        logger.info(f"Ingested {len(signals)} Reddit signals")
        return signals
    
    def _process_reddit_post(self, post: Dict, subreddit: str) -> Optional[MarketSignal]:
        """Process individual Reddit post into MarketSignal"""
        try:
            engagement = post.get('score', 0) + post.get('num_comments', 0) * 2
            sentiment = self._calculate_sentiment(post.get('title', '') + ' ' + post.get('selftext', ''))
            
            signal = MarketSignal(
                id=f"reddit_{post['id']}",
                platform=Platform.REDDIT,
                signal_type=SignalType.SOCIAL,
                title=post.get('title', ''),
                description=post.get('selftext', '')[:200] + "..." if len(post.get('selftext', '')) > 200 else post.get('selftext', ''),
                content=post.get('selftext', ''),
                engagement_score=min(engagement / 1000, 1.0),  # Normalize to 0-1
                sentiment_score=sentiment,
                confidence=0.6,  # Default confidence for Reddit data
                region="Global",
                sector=self._categorize_subreddit(subreddit),
                keywords=self._extract_keywords(post.get('title', '')),
                hashtags=[],  # Reddit doesn't use hashtags
                metadata={
                    'subreddit': subreddit,
                    'score': post.get('score', 0),
                    'num_comments': post.get('num_comments', 0),
                    'upvote_ratio': post.get('upvote_ratio', 0),
                    'source': 'reddit_api'
                },
                timestamp=datetime.fromtimestamp(post['created_utc']),
                source_url=f"https://reddit.com{post.get('permalink', '')}",
                author=post.get('author')
            )
            
            return signal
            
        except Exception as e:
            logger.error(f"Failed to process Reddit post: {e}")
            return None
    
    async def ingest_google_trends(self, keywords: List[str] = None) -> List[MarketSignal]:
        """
        Ingest trending signals from Google Trends
        
        Args:
            keywords: List of keywords to analyze
            
        Returns:
            List of MarketSignal objects
        """
        signals = []
        
        if not self._check_rate_limit("google_trends"):
            return self._get_google_trends_fallback_data()
        
        # Note: Google Trends doesn't have a direct API, would need to use pytrends library
        # This is a placeholder implementation
        
        try:
            # Placeholder for Google Trends integration
            # In production, would use pytrends library
            logger.info("Google Trends ingestion not implemented - using fallback data")
            return self._get_google_trends_fallback_data()
            
        except Exception as e:
            logger.error(f"Google Trends ingestion failed: {e}")
            return []
    
    def _calculate_sentiment(self, text: str) -> float:
        """
        Calculate sentiment score for given text
        
        Args:
            text: Text to analyze
            
        Returns:
            Sentiment score between -1 and 1
        """
        # Simple sentiment analysis - in production would use proper NLP
        positive_words = ['good', 'great', 'excellent', 'amazing', 'awesome', 'love', 'perfect', 'best']
        negative_words = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointing']
        
        text_lower = text.lower()
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        total_words = len(text.split())
        if total_words == 0:
            return 0.0
        
        score = (positive_count - negative_count) / max(total_words, 1)
        return max(-1.0, min(1.0, score))
    
    def _extract_hashtags(self, text: str) -> List[str]:
        """Extract hashtags from text"""
        import re
        hashtags = re.findall(r'#\w+', text)
        return [tag[1:] for tag in hashtags]  # Remove # symbol
    
    def _extract_keywords(self, text: str) -> List[str]:
        """Extract keywords from text"""
        # Simple keyword extraction - in production would use NLP
        words = text.lower().split()
        stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were'}
        keywords = [word for word in words if word not in stop_words and len(word) > 3]
        return keywords[:5]  # Return top 5 keywords
    
    def _categorize_subreddit(self, subreddit: str) -> str:
        """Categorize subreddit into business sector"""
        categories = {
            'technology': ['technology', 'programming', 'coding', 'ai', 'machinelearning'],
            'business': ['business', 'entrepreneur', 'startups', 'investing'],
            'healthcare': ['health', 'medicine', 'fitness'],
            'finance': ['personalfinance', 'investing', 'stocks', 'cryptocurrency']
        }
        
        for category, keywords in categories.items():
            if subreddit.lower() in keywords:
                return category.title()
        
        return "General"
    
    def _get_twitter_fallback_data(self) -> List[MarketSignal]:
        """Generate fallback Twitter data when API is unavailable"""
        return [
            MarketSignal(
                id="twitter_fallback_1",
                platform=Platform.TWITTER,
                signal_type=SignalType.SOCIAL,
                title="AI Startup Funding Surge",
                description="Major discussion about AI startup funding increasing significantly",
                content="AI startups are seeing unprecedented funding levels this quarter #AI #startups #funding",
                engagement_score=0.8,
                sentiment_score=0.6,
                confidence=0.7,
                region="Global",
                sector="Technology",
                keywords=["AI", "startup", "funding"],
                hashtags=["AI", "startups", "funding"],
                metadata={"source": "fallback_data"},
                timestamp=datetime.now(),
                source_url="https://twitter.com/example",
                author="demo_user"
            )
        ]
    
    def _get_reddit_fallback_data(self) -> List[MarketSignal]:
        """Generate fallback Reddit data when API is unavailable"""
        return [
            MarketSignal(
                id="reddit_fallback_1",
                platform=Platform.REDDIT,
                signal_type=SignalType.SOCIAL,
                title="Small Business Automation Tools Discussion",
                description="Thread about best automation tools for small businesses",
                content="Looking for recommendations on business automation tools that actually work",
                engagement_score=0.6,
                sentiment_score=0.4,
                confidence=0.6,
                region="Global",
                sector="Business",
                keywords=["automation", "tools", "business"],
                hashtags=[],
                metadata={"source": "fallback_data", "subreddit": "entrepreneur"},
                timestamp=datetime.now(),
                source_url="https://reddit.com/r/entrepreneur/example",
                author="demo_user"
            )
        ]
    
    def _get_google_trends_fallback_data(self) -> List[MarketSignal]:
        """Generate fallback Google Trends data when API is unavailable"""
        return [
            MarketSignal(
                id="trends_fallback_1",
                platform=Platform.GOOGLE_TRENDS,
                signal_type=SignalType.TREND,
                title="Remote Work Tools Trending",
                description="Search interest in remote work tools increasing significantly",
                content="Remote work tools search volume up 45% this month",
                engagement_score=0.7,
                sentiment_score=0.3,
                confidence=0.8,
                region="Global",
                sector="Technology",
                keywords=["remote", "work", "tools"],
                hashtags=[],
                metadata={"source": "fallback_data", "search_volume": "high"},
                timestamp=datetime.now(),
                source_url="https://trends.google.com/trends/explore",
                author="google_trends"
            )
        ]
    
    def store_signals(self, signals: List[MarketSignal]):
        """
        Store signals in DuckDB database
        
        Args:
            signals: List of MarketSignal objects to store
        """
        if not signals:
            return
        
        try:
            conn = duckdb.connect(self.db_path)
            
            # Convert signals to DataFrame for batch insert
            signal_data = []
            for signal in signals:
                signal_dict = asdict(signal)
                signal_dict['platform'] = signal.platform.value
                signal_dict['signal_type'] = signal.signal_type.value
                signal_dict['metadata'] = json.dumps(signal.metadata)
                signal_data.append(signal_dict)
            
            df = pd.DataFrame(signal_data)
            
            # Insert data using DuckDB
            conn.execute("INSERT OR REPLACE INTO market_signals SELECT * FROM df")
            conn.close()
            
            logger.info(f"Stored {len(signals)} signals in database")
            
        except Exception as e:
            logger.error(f"Failed to store signals: {e}")
    
    def query_signals(self, platform: str = None, signal_type: str = None, 
                     sector: str = None, limit: int = 100) -> List[Dict]:
        """
        Query stored signals with optional filters
        
        Args:
            platform: Filter by platform
            signal_type: Filter by signal type
            sector: Filter by sector
            limit: Maximum number of results
            
        Returns:
            List of signal dictionaries
        """
        try:
            conn = duckdb.connect(self.db_path)
            
            query = "SELECT * FROM market_signals WHERE 1=1"
            params = []
            
            if platform:
                query += " AND platform = ?"
                params.append(platform)
            
            if signal_type:
                query += " AND signal_type = ?"
                params.append(signal_type)
            
            if sector:
                query += " AND sector = ?"
                params.append(sector)
            
            query += " ORDER BY timestamp DESC LIMIT ?"
            params.append(limit)
            
            result = conn.execute(query, params).fetchall()
            columns = [desc[0] for desc in conn.description]
            conn.close()
            
            # Convert to list of dictionaries
            return [dict(zip(columns, row)) for row in result]
            
        except Exception as e:
            logger.error(f"Query failed: {e}")
            return []
    
    async def run_ingestion_cycle(self):
        """
        Run a complete ingestion cycle for all data sources
        """
        logger.info("Starting data ingestion cycle")
        
        all_signals = []
        
        # Ingest from all sources
        twitter_signals = await self.ingest_twitter_signals()
        reddit_signals = await self.ingest_reddit_signals()
        trends_signals = await self.ingest_google_trends()
        
        all_signals.extend(twitter_signals)
        all_signals.extend(reddit_signals)
        all_signals.extend(trends_signals)
        
        # Store all signals
        self.store_signals(all_signals)
        
        logger.info(f"Ingestion cycle completed. Total signals: {len(all_signals)}")
        return all_signals


# REST API Functions (FastAPI compatible)
def create_data_pulse_api():
    """
    Create REST API endpoints for data pulse functionality
    """
    from fastapi import FastAPI, HTTPException, Query
    from typing import Optional
    
    app = FastAPI(title="Lucidra Data Pulse API")
    engine = DataPulseEngine()
    
    @app.get("/api/data-pulse/signals")
    async def get_signals(
        platform: Optional[str] = Query(None, description="Filter by platform"),
        signal_type: Optional[str] = Query(None, description="Filter by signal type"),
        sector: Optional[str] = Query(None, description="Filter by sector"),
        limit: int = Query(100, description="Maximum number of results")
    ):
        """Get market signals with optional filters"""
        try:
            signals = engine.query_signals(platform, signal_type, sector, limit)
            return {"signals": signals, "count": len(signals)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.post("/api/data-pulse/ingest")
    async def trigger_ingestion():
        """Trigger manual data ingestion"""
        try:
            async with DataPulseEngine() as engine:
                signals = await engine.run_ingestion_cycle()
                return {"message": "Ingestion completed", "signals_count": len(signals)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.get("/api/data-pulse/health")
    async def health_check():
        """Health check endpoint"""
        return {"status": "healthy", "timestamp": datetime.now()}
    
    return app


# Command Line Interface
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Lucidra Data Pulse Engine")
    parser.add_argument("--ingest", action="store_true", help="Run data ingestion")
    parser.add_argument("--query", action="store_true", help="Query stored signals")
    parser.add_argument("--platform", type=str, help="Filter by platform")
    parser.add_argument("--limit", type=int, default=10, help="Limit results")
    
    args = parser.parse_args()
    
    if args.ingest:
        async def main():
            async with DataPulseEngine() as engine:
                await engine.run_ingestion_cycle()
        
        asyncio.run(main())
    
    elif args.query:
        engine = DataPulseEngine()
        signals = engine.query_signals(platform=args.platform, limit=args.limit)
        for signal in signals:
            print(f"[{signal['platform']}] {signal['title']} - {signal['timestamp']}")
    
    else:
        print("Use --ingest to run data ingestion or --query to query signals")