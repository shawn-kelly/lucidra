"""
Lucidra Data Pulse - Social/Trend Ingestion Engine
Real-time social media and trend data collection for strategic intelligence
"""

import asyncio
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import aiohttp
import tweepy
import praw
import requests
from dataclasses import dataclass, asdict
from enum import Enum
import hashlib
import re
from textblob import TextBlob
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Download required NLTK data
try:
    nltk.data.find('vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

class DataSource(Enum):
    TWITTER = "twitter"
    REDDIT = "reddit"
    LINKEDIN = "linkedin"
    NEWS = "news"
    GOOGLE_TRENDS = "google_trends"

class SentimentScore(Enum):
    VERY_NEGATIVE = -2
    NEGATIVE = -1
    NEUTRAL = 0
    POSITIVE = 1
    VERY_POSITIVE = 2

@dataclass
class SocialSignal:
    """Core data structure for social intelligence signals"""
    id: str
    source: DataSource
    content: str
    author: str
    timestamp: datetime
    url: str
    engagement_score: float
    sentiment_score: float
    sentiment_label: SentimentScore
    hashtags: List[str]
    mentions: List[str]
    keywords: List[str]
    influence_score: float
    reach_estimate: int
    metadata: Dict[str, Any]

@dataclass
class TrendSignal:
    """Trend analysis data structure"""
    id: str
    keyword: str
    trend_score: float
    volume: int
    velocity: float  # Rate of change
    source: DataSource
    timestamp: datetime
    related_terms: List[str]
    sentiment_distribution: Dict[str, float]
    geographic_data: Dict[str, Any]
    metadata: Dict[str, Any]

class SentimentAnalyzer:
    """Advanced sentiment analysis with multiple techniques"""
    
    def __init__(self):
        self.vader = SentimentIntensityAnalyzer()
        self.textblob_analyzer = TextBlob
    
    def analyze_sentiment(self, text: str) -> tuple[float, SentimentScore]:
        """
        Analyze sentiment using multiple approaches and return composite score
        """
        # VADER sentiment analysis
        vader_scores = self.vader.polarity_scores(text)
        vader_compound = vader_scores['compound']
        
        # TextBlob sentiment analysis
        blob = self.textblob_analyzer(text)
        textblob_polarity = blob.sentiment.polarity
        
        # Composite sentiment score (weighted average)
        composite_score = (vader_compound * 0.6) + (textblob_polarity * 0.4)
        
        # Convert to sentiment label
        if composite_score <= -0.5:
            sentiment_label = SentimentScore.VERY_NEGATIVE
        elif composite_score <= -0.1:
            sentiment_label = SentimentScore.NEGATIVE
        elif composite_score <= 0.1:
            sentiment_label = SentimentScore.NEUTRAL
        elif composite_score <= 0.5:
            sentiment_label = SentimentScore.POSITIVE
        else:
            sentiment_label = SentimentScore.VERY_POSITIVE
        
        return composite_score, sentiment_label

class KeywordExtractor:
    """Extract relevant keywords and entities from text"""
    
    def __init__(self):
        self.stop_words = set([
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
            'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 
            'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'
        ])
    
    def extract_keywords(self, text: str, max_keywords: int = 10) -> List[str]:
        """Extract meaningful keywords from text"""
        # Simple keyword extraction (can be enhanced with NLP libraries)
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
        word_freq = {}
        
        for word in words:
            if word not in self.stop_words:
                word_freq[word] = word_freq.get(word, 0) + 1
        
        # Sort by frequency and return top keywords
        sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return [word for word, freq in sorted_words[:max_keywords]]
    
    def extract_hashtags(self, text: str) -> List[str]:
        """Extract hashtags from text"""
        return re.findall(r'#(\w+)', text)
    
    def extract_mentions(self, text: str) -> List[str]:
        """Extract mentions from text"""
        return re.findall(r'@(\w+)', text)

class TwitterCollector:
    """Twitter/X data collection and processing"""
    
    def __init__(self, bearer_token: str, consumer_key: str, consumer_secret: str):
        self.bearer_token = bearer_token
        self.consumer_key = consumer_key
        self.consumer_secret = consumer_secret
        self.client = tweepy.Client(bearer_token=bearer_token)
        self.sentiment_analyzer = SentimentAnalyzer()
        self.keyword_extractor = KeywordExtractor()
    
    async def collect_trending_topics(self, woeid: int = 1) -> List[TrendSignal]:
        """Collect trending topics from Twitter"""
        try:
            # Get trending topics
            trends = self.client.get_place_trends(woeid)
            trend_signals = []
            
            for trend in trends[0]['trends']:
                trend_signal = TrendSignal(
                    id=hashlib.md5(f"twitter_trend_{trend['name']}_{datetime.now()}".encode()).hexdigest(),
                    keyword=trend['name'],
                    trend_score=trend.get('tweet_volume', 0) or 0,
                    volume=trend.get('tweet_volume', 0) or 0,
                    velocity=0.0,  # Would need historical data to calculate
                    source=DataSource.TWITTER,
                    timestamp=datetime.now(),
                    related_terms=[],
                    sentiment_distribution={},
                    geographic_data={'woeid': woeid},
                    metadata={'raw_trend': trend}
                )
                trend_signals.append(trend_signal)
            
            return trend_signals
            
        except Exception as e:
            logging.error(f"Error collecting Twitter trends: {e}")
            return []
    
    async def collect_keyword_mentions(self, keyword: str, max_results: int = 100) -> List[SocialSignal]:
        """Collect recent mentions of a specific keyword"""
        try:
            # Search for recent tweets
            tweets = self.client.search_recent_tweets(
                query=keyword,
                max_results=max_results,
                tweet_fields=['created_at', 'author_id', 'public_metrics', 'context_annotations']
            )
            
            social_signals = []
            
            if tweets.data:
                for tweet in tweets.data:
                    # Analyze sentiment
                    sentiment_score, sentiment_label = self.sentiment_analyzer.analyze_sentiment(tweet.text)
                    
                    # Extract keywords, hashtags, mentions
                    keywords = self.keyword_extractor.extract_keywords(tweet.text)
                    hashtags = self.keyword_extractor.extract_hashtags(tweet.text)
                    mentions = self.keyword_extractor.extract_mentions(tweet.text)
                    
                    # Calculate engagement score
                    metrics = tweet.public_metrics
                    engagement_score = (
                        metrics.get('like_count', 0) * 1.0 +
                        metrics.get('retweet_count', 0) * 2.0 +
                        metrics.get('reply_count', 0) * 1.5 +
                        metrics.get('quote_count', 0) * 1.8
                    )
                    
                    social_signal = SocialSignal(
                        id=tweet.id,
                        source=DataSource.TWITTER,
                        content=tweet.text,
                        author=tweet.author_id,
                        timestamp=tweet.created_at,
                        url=f"https://twitter.com/i/web/status/{tweet.id}",
                        engagement_score=engagement_score,
                        sentiment_score=sentiment_score,
                        sentiment_label=sentiment_label,
                        hashtags=hashtags,
                        mentions=mentions,
                        keywords=keywords,
                        influence_score=0.0,  # Would need author data to calculate
                        reach_estimate=metrics.get('impression_count', 0),
                        metadata={'public_metrics': metrics, 'context_annotations': tweet.context_annotations}
                    )
                    social_signals.append(social_signal)
            
            return social_signals
            
        except Exception as e:
            logging.error(f"Error collecting Twitter mentions for '{keyword}': {e}")
            return []

class RedditCollector:
    """Reddit data collection and processing"""
    
    def __init__(self, client_id: str, client_secret: str, user_agent: str):
        self.reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent
        )
        self.sentiment_analyzer = SentimentAnalyzer()
        self.keyword_extractor = KeywordExtractor()
    
    async def collect_trending_subreddits(self, limit: int = 50) -> List[TrendSignal]:
        """Collect trending topics from popular subreddits"""
        try:
            trending_signals = []
            
            # Get trending posts from popular subreddits
            subreddits = ['all', 'popular', 'worldnews', 'technology', 'business']
            
            for subreddit_name in subreddits:
                subreddit = self.reddit.subreddit(subreddit_name)
                
                for submission in subreddit.hot(limit=limit//len(subreddits)):
                    keywords = self.keyword_extractor.extract_keywords(submission.title + " " + submission.selftext)
                    
                    for keyword in keywords[:3]:  # Top 3 keywords per post
                        trend_signal = TrendSignal(
                            id=hashlib.md5(f"reddit_trend_{keyword}_{submission.id}".encode()).hexdigest(),
                            keyword=keyword,
                            trend_score=submission.score,
                            volume=submission.num_comments,
                            velocity=0.0,
                            source=DataSource.REDDIT,
                            timestamp=datetime.fromtimestamp(submission.created_utc),
                            related_terms=keywords,
                            sentiment_distribution={},
                            geographic_data={},
                            metadata={
                                'subreddit': subreddit_name,
                                'submission_id': submission.id,
                                'upvote_ratio': submission.upvote_ratio
                            }
                        )
                        trending_signals.append(trend_signal)
            
            return trending_signals
            
        except Exception as e:
            logging.error(f"Error collecting Reddit trends: {e}")
            return []
    
    async def collect_subreddit_sentiment(self, subreddit_name: str, limit: int = 100) -> List[SocialSignal]:
        """Collect sentiment data from a specific subreddit"""
        try:
            subreddit = self.reddit.subreddit(subreddit_name)
            social_signals = []
            
            for submission in subreddit.hot(limit=limit):
                # Analyze sentiment
                full_text = submission.title + " " + submission.selftext
                sentiment_score, sentiment_label = self.sentiment_analyzer.analyze_sentiment(full_text)
                
                # Extract keywords and metadata
                keywords = self.keyword_extractor.extract_keywords(full_text)
                hashtags = self.keyword_extractor.extract_hashtags(full_text)
                mentions = self.keyword_extractor.extract_mentions(full_text)
                
                social_signal = SocialSignal(
                    id=submission.id,
                    source=DataSource.REDDIT,
                    content=full_text,
                    author=submission.author.name if submission.author else 'deleted',
                    timestamp=datetime.fromtimestamp(submission.created_utc),
                    url=submission.url,
                    engagement_score=submission.score,
                    sentiment_score=sentiment_score,
                    sentiment_label=sentiment_label,
                    hashtags=hashtags,
                    mentions=mentions,
                    keywords=keywords,
                    influence_score=submission.upvote_ratio,
                    reach_estimate=submission.num_comments * 10,  # Rough estimate
                    metadata={
                        'subreddit': subreddit_name,
                        'num_comments': submission.num_comments,
                        'upvote_ratio': submission.upvote_ratio,
                        'gilded': submission.gilded
                    }
                )
                social_signals.append(social_signal)
            
            return social_signals
            
        except Exception as e:
            logging.error(f"Error collecting Reddit sentiment for r/{subreddit_name}: {e}")
            return []

class NewsCollector:
    """News and media data collection"""
    
    def __init__(self, news_api_key: str):
        self.news_api_key = news_api_key
        self.base_url = "https://newsapi.org/v2"
        self.sentiment_analyzer = SentimentAnalyzer()
        self.keyword_extractor = KeywordExtractor()
    
    async def collect_trending_news(self, category: str = 'business', country: str = 'us') -> List[SocialSignal]:
        """Collect trending news articles"""
        try:
            url = f"{self.base_url}/top-headlines"
            params = {
                'category': category,
                'country': country,
                'apiKey': self.news_api_key,
                'pageSize': 100
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, params=params) as response:
                    data = await response.json()
            
            social_signals = []
            
            if data['status'] == 'ok':
                for article in data['articles']:
                    # Analyze sentiment
                    content = f"{article['title']} {article['description'] or ''}"
                    sentiment_score, sentiment_label = self.sentiment_analyzer.analyze_sentiment(content)
                    
                    # Extract keywords
                    keywords = self.keyword_extractor.extract_keywords(content)
                    
                    social_signal = SocialSignal(
                        id=hashlib.md5(f"news_{article['url']}".encode()).hexdigest(),
                        source=DataSource.NEWS,
                        content=content,
                        author=article['author'] or article['source']['name'],
                        timestamp=datetime.fromisoformat(article['publishedAt'].replace('Z', '+00:00')),
                        url=article['url'],
                        engagement_score=0.0,  # News API doesn't provide engagement metrics
                        sentiment_score=sentiment_score,
                        sentiment_label=sentiment_label,
                        hashtags=[],
                        mentions=[],
                        keywords=keywords,
                        influence_score=0.0,
                        reach_estimate=0,
                        metadata={
                            'source': article['source']['name'],
                            'category': category,
                            'country': country,
                            'image_url': article['urlToImage']
                        }
                    )
                    social_signals.append(social_signal)
            
            return social_signals
            
        except Exception as e:
            logging.error(f"Error collecting news data: {e}")
            return []

class DataPulseEngine:
    """Main orchestrator for social/trend data collection"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.collectors = {}
        self.setup_collectors()
    
    def setup_collectors(self):
        """Initialize all data collectors"""
        # Twitter collector
        if all(key in self.config for key in ['twitter_bearer_token', 'twitter_consumer_key', 'twitter_consumer_secret']):
            self.collectors['twitter'] = TwitterCollector(
                self.config['twitter_bearer_token'],
                self.config['twitter_consumer_key'],
                self.config['twitter_consumer_secret']
            )
        
        # Reddit collector
        if all(key in self.config for key in ['reddit_client_id', 'reddit_client_secret', 'reddit_user_agent']):
            self.collectors['reddit'] = RedditCollector(
                self.config['reddit_client_id'],
                self.config['reddit_client_secret'],
                self.config['reddit_user_agent']
            )
        
        # News collector
        if 'news_api_key' in self.config:
            self.collectors['news'] = NewsCollector(self.config['news_api_key'])
    
    async def collect_all_signals(self, keywords: List[str] = None) -> Dict[str, List[Any]]:
        """Collect signals from all available sources"""
        results = {
            'social_signals': [],
            'trend_signals': []
        }
        
        # Collect Twitter data
        if 'twitter' in self.collectors:
            twitter_collector = self.collectors['twitter']
            
            # Collect trending topics
            twitter_trends = await twitter_collector.collect_trending_topics()
            results['trend_signals'].extend(twitter_trends)
            
            # Collect keyword mentions if keywords provided
            if keywords:
                for keyword in keywords:
                    twitter_mentions = await twitter_collector.collect_keyword_mentions(keyword)
                    results['social_signals'].extend(twitter_mentions)
        
        # Collect Reddit data
        if 'reddit' in self.collectors:
            reddit_collector = self.collectors['reddit']
            
            # Collect trending subreddit topics
            reddit_trends = await reddit_collector.collect_trending_subreddits()
            results['trend_signals'].extend(reddit_trends)
            
            # Collect subreddit sentiment
            popular_subreddits = ['worldnews', 'technology', 'business', 'stocks']
            for subreddit in popular_subreddits:
                reddit_sentiment = await reddit_collector.collect_subreddit_sentiment(subreddit)
                results['social_signals'].extend(reddit_sentiment)
        
        # Collect News data
        if 'news' in self.collectors:
            news_collector = self.collectors['news']
            
            # Collect trending news
            categories = ['business', 'technology', 'general']
            for category in categories:
                news_signals = await news_collector.collect_trending_news(category)
                results['social_signals'].extend(news_signals)
        
        return results
    
    async def collect_keyword_intelligence(self, keyword: str) -> Dict[str, Any]:
        """Collect comprehensive intelligence for a specific keyword"""
        intelligence = {
            'keyword': keyword,
            'timestamp': datetime.now(),
            'social_signals': [],
            'trend_signals': [],
            'sentiment_summary': {},
            'volume_metrics': {},
            'influence_metrics': {}
        }
        
        # Collect from Twitter
        if 'twitter' in self.collectors:
            twitter_signals = await self.collectors['twitter'].collect_keyword_mentions(keyword)
            intelligence['social_signals'].extend(twitter_signals)
        
        # Collect from Reddit
        if 'reddit' in self.collectors:
            # Search relevant subreddits (this would need enhanced Reddit search)
            reddit_signals = await self.collectors['reddit'].collect_subreddit_sentiment('all')
            # Filter for keyword relevance
            relevant_signals = [s for s in reddit_signals if keyword.lower() in s.content.lower()]
            intelligence['social_signals'].extend(relevant_signals)
        
        # Calculate summary metrics
        if intelligence['social_signals']:
            sentiment_scores = [s.sentiment_score for s in intelligence['social_signals']]
            intelligence['sentiment_summary'] = {
                'average_sentiment': sum(sentiment_scores) / len(sentiment_scores),
                'positive_ratio': len([s for s in sentiment_scores if s > 0]) / len(sentiment_scores),
                'negative_ratio': len([s for s in sentiment_scores if s < 0]) / len(sentiment_scores),
                'total_mentions': len(intelligence['social_signals'])
            }
        
        return intelligence

# Example usage and configuration
if __name__ == "__main__":
    # Example configuration
    config = {
        'twitter_bearer_token': 'your_twitter_bearer_token',
        'twitter_consumer_key': 'your_twitter_consumer_key',
        'twitter_consumer_secret': 'your_twitter_consumer_secret',
        'reddit_client_id': 'your_reddit_client_id',
        'reddit_client_secret': 'your_reddit_client_secret',
        'reddit_user_agent': 'Lucidra Data Pulse Bot v1.0',
        'news_api_key': 'your_news_api_key'
    }
    
    # Initialize engine
    engine = DataPulseEngine(config)
    
    # Example: Collect intelligence for specific keywords
    async def main():
        keywords = ['artificial intelligence', 'cryptocurrency', 'climate change']
        
        for keyword in keywords:
            intelligence = await engine.collect_keyword_intelligence(keyword)
            print(f"\nIntelligence for '{keyword}':")
            print(f"Total mentions: {intelligence['sentiment_summary'].get('total_mentions', 0)}")
            print(f"Average sentiment: {intelligence['sentiment_summary'].get('average_sentiment', 0):.2f}")
            print(f"Positive ratio: {intelligence['sentiment_summary'].get('positive_ratio', 0):.2f}")
    
    # Run the example
    asyncio.run(main())