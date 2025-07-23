"""
Lucidra Data Pulse - Financial Market Ingestion Engine
Real-time financial data collection and analysis for strategic intelligence
"""

import asyncio
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Tuple
import aiohttp
import yfinance as yf
import pandas as pd
import numpy as np
from dataclasses import dataclass, asdict
from enum import Enum
import hashlib
import requests
from textblob import TextBlob
import re
from concurrent.futures import ThreadPoolExecutor
import time

class MarketSector(Enum):
    TECHNOLOGY = "technology"
    HEALTHCARE = "healthcare"
    FINANCIAL = "financial"
    ENERGY = "energy"
    CONSUMER_GOODS = "consumer_goods"
    INDUSTRIALS = "industrials"
    MATERIALS = "materials"
    UTILITIES = "utilities"
    REAL_ESTATE = "real_estate"
    CRYPTOCURRENCY = "cryptocurrency"

class FinancialDataType(Enum):
    STOCK_PRICE = "stock_price"
    MARKET_INDEX = "market_index"
    ECONOMIC_INDICATOR = "economic_indicator"
    CURRENCY = "currency"
    COMMODITY = "commodity"
    CRYPTOCURRENCY = "cryptocurrency"
    EARNINGS = "earnings"
    NEWS_SENTIMENT = "news_sentiment"

class TrendDirection(Enum):
    BULLISH = "bullish"
    BEARISH = "bearish"
    NEUTRAL = "neutral"
    VOLATILE = "volatile"

@dataclass
class FinancialSignal:
    """Core financial data signal structure"""
    id: str
    symbol: str
    data_type: FinancialDataType
    sector: MarketSector
    price: float
    volume: int
    change_percent: float
    change_absolute: float
    timestamp: datetime
    trend_direction: TrendDirection
    volatility_score: float
    liquidity_score: float
    sentiment_score: float
    technical_indicators: Dict[str, float]
    fundamental_metrics: Dict[str, float]
    metadata: Dict[str, Any]

@dataclass
class EconomicIndicator:
    """Economic indicator data structure"""
    id: str
    indicator_name: str
    value: float
    previous_value: float
    change_percent: float
    release_date: datetime
    next_release: datetime
    country: str
    category: str
    importance_score: float
    market_impact: str
    metadata: Dict[str, Any]

@dataclass
class MarketSentiment:
    """Market sentiment analysis structure"""
    id: str
    symbol: str
    sentiment_score: float
    confidence_score: float
    sentiment_label: str
    news_volume: int
    social_volume: int
    institutional_activity: float
    retail_activity: float
    fear_greed_index: float
    timestamp: datetime
    sources: List[str]
    metadata: Dict[str, Any]

class TechnicalAnalyzer:
    """Technical analysis calculations"""
    
    @staticmethod
    def calculate_rsi(prices: List[float], period: int = 14) -> float:
        """Calculate Relative Strength Index"""
        if len(prices) < period + 1:
            return 50.0
        
        deltas = [prices[i] - prices[i-1] for i in range(1, len(prices))]
        gains = [delta if delta > 0 else 0 for delta in deltas]
        losses = [-delta if delta < 0 else 0 for delta in deltas]
        
        avg_gain = sum(gains[-period:]) / period
        avg_loss = sum(losses[-period:]) / period
        
        if avg_loss == 0:
            return 100.0
        
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        return rsi
    
    @staticmethod
    def calculate_macd(prices: List[float], fast: int = 12, slow: int = 26, signal: int = 9) -> Dict[str, float]:
        """Calculate MACD indicators"""
        if len(prices) < slow:
            return {'macd': 0, 'signal': 0, 'histogram': 0}
        
        # Simple moving averages (in practice, use exponential)
        ema_fast = sum(prices[-fast:]) / fast
        ema_slow = sum(prices[-slow:]) / slow
        
        macd = ema_fast - ema_slow
        signal_line = macd  # Simplified
        histogram = macd - signal_line
        
        return {
            'macd': macd,
            'signal': signal_line,
            'histogram': histogram
        }
    
    @staticmethod
    def calculate_bollinger_bands(prices: List[float], period: int = 20, std_dev: float = 2) -> Dict[str, float]:
        """Calculate Bollinger Bands"""
        if len(prices) < period:
            return {'upper': 0, 'middle': 0, 'lower': 0}
        
        recent_prices = prices[-period:]
        sma = sum(recent_prices) / period
        variance = sum((price - sma) ** 2 for price in recent_prices) / period
        std = variance ** 0.5
        
        return {
            'upper': sma + (std_dev * std),
            'middle': sma,
            'lower': sma - (std_dev * std)
        }
    
    @staticmethod
    def calculate_volatility(prices: List[float], period: int = 20) -> float:
        """Calculate price volatility"""
        if len(prices) < period:
            return 0.0
        
        recent_prices = prices[-period:]
        returns = [(recent_prices[i] / recent_prices[i-1]) - 1 for i in range(1, len(recent_prices))]
        
        if not returns:
            return 0.0
        
        mean_return = sum(returns) / len(returns)
        variance = sum((r - mean_return) ** 2 for r in returns) / len(returns)
        
        return (variance ** 0.5) * 100  # Convert to percentage

class StockDataCollector:
    """Stock market data collection and analysis"""
    
    def __init__(self, alpha_vantage_key: str = None, finnhub_key: str = None):
        self.alpha_vantage_key = alpha_vantage_key
        self.finnhub_key = finnhub_key
        self.technical_analyzer = TechnicalAnalyzer()
        
        # Popular stock symbols by sector
        self.sector_symbols = {
            MarketSector.TECHNOLOGY: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'NFLX'],
            MarketSector.HEALTHCARE: ['JNJ', 'PFE', 'UNH', 'ABBV', 'MRK', 'TMO', 'MDT', 'GILD'],
            MarketSector.FINANCIAL: ['JPM', 'BAC', 'WFC', 'C', 'GS', 'MS', 'AXP', 'V'],
            MarketSector.ENERGY: ['XOM', 'CVX', 'COP', 'EOG', 'SLB', 'PSX', 'VLO', 'MPC'],
            MarketSector.CONSUMER_GOODS: ['PG', 'KO', 'PEP', 'WMT', 'HD', 'MCD', 'NKE', 'COST']
        }
    
    async def collect_stock_data(self, symbol: str, sector: MarketSector) -> Optional[FinancialSignal]:
        """Collect comprehensive stock data for a symbol"""
        try:
            # Get stock data using yfinance
            stock = yf.Ticker(symbol)
            
            # Get current price and basic info
            info = stock.info
            hist = stock.history(period="30d")
            
            if hist.empty:
                return None
            
            current_price = hist['Close'].iloc[-1]
            previous_price = hist['Close'].iloc[-2] if len(hist) >= 2 else current_price
            volume = hist['Volume'].iloc[-1]
            
            # Calculate changes
            change_absolute = current_price - previous_price
            change_percent = (change_absolute / previous_price) * 100 if previous_price != 0 else 0
            
            # Calculate technical indicators
            prices = hist['Close'].tolist()
            rsi = self.technical_analyzer.calculate_rsi(prices)
            macd = self.technical_analyzer.calculate_macd(prices)
            bollinger = self.technical_analyzer.calculate_bollinger_bands(prices)
            volatility = self.technical_analyzer.calculate_volatility(prices)
            
            # Determine trend direction
            if change_percent > 2:
                trend = TrendDirection.BULLISH
            elif change_percent < -2:
                trend = TrendDirection.BEARISH
            elif volatility > 5:
                trend = TrendDirection.VOLATILE
            else:
                trend = TrendDirection.NEUTRAL
            
            # Calculate scores
            liquidity_score = min(volume / 1000000, 100)  # Normalize by million shares
            sentiment_score = 0.0  # Would integrate with news sentiment
            
            # Fundamental metrics
            fundamental_metrics = {
                'market_cap': info.get('marketCap', 0),
                'pe_ratio': info.get('trailingPE', 0),
                'dividend_yield': info.get('dividendYield', 0),
                'beta': info.get('beta', 1.0),
                'eps': info.get('trailingEps', 0),
                'revenue_growth': info.get('revenueGrowth', 0)
            }
            
            financial_signal = FinancialSignal(
                id=hashlib.md5(f"{symbol}_{datetime.now().isoformat()}".encode()).hexdigest(),
                symbol=symbol,
                data_type=FinancialDataType.STOCK_PRICE,
                sector=sector,
                price=current_price,
                volume=int(volume),
                change_percent=change_percent,
                change_absolute=change_absolute,
                timestamp=datetime.now(),
                trend_direction=trend,
                volatility_score=volatility,
                liquidity_score=liquidity_score,
                sentiment_score=sentiment_score,
                technical_indicators={
                    'rsi': rsi,
                    'macd': macd['macd'],
                    'macd_signal': macd['signal'],
                    'bollinger_upper': bollinger['upper'],
                    'bollinger_middle': bollinger['middle'],
                    'bollinger_lower': bollinger['lower']
                },
                fundamental_metrics=fundamental_metrics,
                metadata={
                    'company_name': info.get('longName', symbol),
                    'industry': info.get('industry', ''),
                    'country': info.get('country', ''),
                    'currency': info.get('currency', 'USD'),
                    'exchange': info.get('exchange', '')
                }
            )
            
            return financial_signal
            
        except Exception as e:
            logging.error(f"Error collecting stock data for {symbol}: {e}")
            return None
    
    async def collect_sector_data(self, sector: MarketSector) -> List[FinancialSignal]:
        """Collect data for all stocks in a sector"""
        signals = []
        symbols = self.sector_symbols.get(sector, [])
        
        # Use ThreadPoolExecutor for concurrent data collection
        with ThreadPoolExecutor(max_workers=5) as executor:
            tasks = []
            for symbol in symbols:
                task = executor.submit(asyncio.run, self.collect_stock_data(symbol, sector))
                tasks.append(task)
            
            for task in tasks:
                try:
                    signal = task.result()
                    if signal:
                        signals.append(signal)
                except Exception as e:
                    logging.error(f"Error in sector data collection: {e}")
        
        return signals

class EconomicIndicatorCollector:
    """Economic indicator data collection"""
    
    def __init__(self, fred_api_key: str = None):
        self.fred_api_key = fred_api_key
        self.base_url = "https://api.stlouisfed.org/fred/series/observations"
        
        # Key economic indicators
        self.indicators = {
            'GDP': 'GDP',
            'unemployment_rate': 'UNRATE',
            'inflation_rate': 'CPIAUCSL',
            'interest_rate': 'FEDFUNDS',
            'consumer_confidence': 'UMCSENT',
            'industrial_production': 'INDPRO',
            'retail_sales': 'RSAFS',
            'housing_starts': 'HOUST',
            'durable_goods': 'DGORDER',
            'nonfarm_payrolls': 'PAYEMS'
        }
    
    async def collect_economic_data(self, indicator_name: str, series_id: str) -> Optional[EconomicIndicator]:
        """Collect specific economic indicator data"""
        try:
            if not self.fred_api_key:
                return None
            
            params = {
                'series_id': series_id,
                'api_key': self.fred_api_key,
                'file_type': 'json',
                'limit': 2,
                'sort_order': 'desc'
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(self.base_url, params=params) as response:
                    data = await response.json()
            
            if 'observations' in data and len(data['observations']) >= 2:
                latest = data['observations'][0]
                previous = data['observations'][1]
                
                current_value = float(latest['value'])
                previous_value = float(previous['value'])
                change_percent = ((current_value - previous_value) / previous_value) * 100
                
                # Determine market impact
                if abs(change_percent) > 5:
                    market_impact = "high"
                elif abs(change_percent) > 2:
                    market_impact = "medium"
                else:
                    market_impact = "low"
                
                economic_indicator = EconomicIndicator(
                    id=hashlib.md5(f"{series_id}_{latest['date']}".encode()).hexdigest(),
                    indicator_name=indicator_name,
                    value=current_value,
                    previous_value=previous_value,
                    change_percent=change_percent,
                    release_date=datetime.strptime(latest['date'], '%Y-%m-%d'),
                    next_release=datetime.now() + timedelta(days=30),  # Approximate
                    country='US',
                    category='economic',
                    importance_score=self._calculate_importance_score(indicator_name, change_percent),
                    market_impact=market_impact,
                    metadata={
                        'series_id': series_id,
                        'units': 'percent' if 'rate' in indicator_name.lower() else 'index',
                        'frequency': 'monthly',
                        'source': 'FRED'
                    }
                )
                
                return economic_indicator
                
        except Exception as e:
            logging.error(f"Error collecting economic data for {indicator_name}: {e}")
            return None
    
    def _calculate_importance_score(self, indicator_name: str, change_percent: float) -> float:
        """Calculate importance score for economic indicator"""
        base_importance = {
            'GDP': 10,
            'unemployment_rate': 9,
            'inflation_rate': 9,
            'interest_rate': 10,
            'consumer_confidence': 7,
            'industrial_production': 6,
            'retail_sales': 6,
            'housing_starts': 5,
            'durable_goods': 5,
            'nonfarm_payrolls': 8
        }
        
        base_score = base_importance.get(indicator_name, 5)
        volatility_multiplier = min(abs(change_percent) / 2, 2)  # Cap at 2x
        
        return min(base_score * (1 + volatility_multiplier), 10)

class CryptocurrencyCollector:
    """Cryptocurrency data collection"""
    
    def __init__(self, coinmarketcap_key: str = None):
        self.coinmarketcap_key = coinmarketcap_key
        self.base_url = "https://pro-api.coinmarketcap.com/v1"
        
        # Popular cryptocurrencies
        self.popular_cryptos = [
            'BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT', 'DOGE', 'AVAX', 'SHIB'
        ]
    
    async def collect_crypto_data(self, symbol: str) -> Optional[FinancialSignal]:
        """Collect cryptocurrency data"""
        try:
            # Using a free alternative API for demo purposes
            url = f"https://api.coingecko.com/api/v3/simple/price"
            params = {
                'ids': symbol.lower(),
                'vs_currencies': 'usd',
                'include_24hr_change': 'true',
                'include_24hr_vol': 'true'
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, params=params) as response:
                    data = await response.json()
            
            if symbol.lower() in data:
                crypto_data = data[symbol.lower()]
                
                price = crypto_data['usd']
                change_percent = crypto_data.get('usd_24h_change', 0)
                volume = crypto_data.get('usd_24h_vol', 0)
                
                # Determine trend based on 24h change
                if change_percent > 5:
                    trend = TrendDirection.BULLISH
                elif change_percent < -5:
                    trend = TrendDirection.BEARISH
                elif abs(change_percent) > 2:
                    trend = TrendDirection.VOLATILE
                else:
                    trend = TrendDirection.NEUTRAL
                
                financial_signal = FinancialSignal(
                    id=hashlib.md5(f"crypto_{symbol}_{datetime.now().isoformat()}".encode()).hexdigest(),
                    symbol=symbol,
                    data_type=FinancialDataType.CRYPTOCURRENCY,
                    sector=MarketSector.CRYPTOCURRENCY,
                    price=price,
                    volume=int(volume),
                    change_percent=change_percent,
                    change_absolute=price * (change_percent / 100),
                    timestamp=datetime.now(),
                    trend_direction=trend,
                    volatility_score=abs(change_percent),
                    liquidity_score=min(volume / 1000000, 100),
                    sentiment_score=0.0,
                    technical_indicators={},
                    fundamental_metrics={},
                    metadata={
                        'asset_type': 'cryptocurrency',
                        'base_currency': 'USD',
                        'data_source': 'coingecko'
                    }
                )
                
                return financial_signal
                
        except Exception as e:
            logging.error(f"Error collecting crypto data for {symbol}: {e}")
            return None

class MarketSentimentAnalyzer:
    """Market sentiment analysis from news and social media"""
    
    def __init__(self, news_api_key: str = None):
        self.news_api_key = news_api_key
        self.base_url = "https://newsapi.org/v2/everything"
    
    async def analyze_symbol_sentiment(self, symbol: str) -> Optional[MarketSentiment]:
        """Analyze sentiment for a specific symbol"""
        try:
            # Collect news articles
            params = {
                'q': f'"{symbol}" stock OR "{symbol}" shares',
                'sortBy': 'publishedAt',
                'language': 'en',
                'apiKey': self.news_api_key,
                'pageSize': 50
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(self.base_url, params=params) as response:
                    data = await response.json()
            
            if data['status'] == 'ok' and data['articles']:
                articles = data['articles']
                
                # Analyze sentiment of headlines and descriptions
                sentiments = []
                for article in articles:
                    text = f"{article['title']} {article['description'] or ''}"
                    blob = TextBlob(text)
                    sentiments.append(blob.sentiment.polarity)
                
                # Calculate aggregate sentiment
                avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else 0
                confidence = 1 - (np.std(sentiments) if len(sentiments) > 1 else 0)
                
                # Determine sentiment label
                if avg_sentiment > 0.1:
                    sentiment_label = "positive"
                elif avg_sentiment < -0.1:
                    sentiment_label = "negative"
                else:
                    sentiment_label = "neutral"
                
                market_sentiment = MarketSentiment(
                    id=hashlib.md5(f"sentiment_{symbol}_{datetime.now().isoformat()}".encode()).hexdigest(),
                    symbol=symbol,
                    sentiment_score=avg_sentiment,
                    confidence_score=confidence,
                    sentiment_label=sentiment_label,
                    news_volume=len(articles),
                    social_volume=0,  # Would integrate with social media
                    institutional_activity=0.0,  # Would integrate with institutional data
                    retail_activity=0.0,  # Would integrate with retail data
                    fear_greed_index=50 + (avg_sentiment * 50),  # Simple conversion
                    timestamp=datetime.now(),
                    sources=['news'],
                    metadata={
                        'articles_analyzed': len(articles),
                        'sentiment_range': f"{min(sentiments):.2f} to {max(sentiments):.2f}",
                        'data_source': 'newsapi'
                    }
                )
                
                return market_sentiment
                
        except Exception as e:
            logging.error(f"Error analyzing sentiment for {symbol}: {e}")
            return None

class FinancialFeedEngine:
    """Main orchestrator for financial data collection"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.collectors = {}
        self.setup_collectors()
    
    def setup_collectors(self):
        """Initialize all financial data collectors"""
        # Stock data collector
        self.collectors['stocks'] = StockDataCollector(
            self.config.get('alpha_vantage_key'),
            self.config.get('finnhub_key')
        )
        
        # Economic indicator collector
        if 'fred_api_key' in self.config:
            self.collectors['economics'] = EconomicIndicatorCollector(
                self.config['fred_api_key']
            )
        
        # Cryptocurrency collector
        if 'coinmarketcap_key' in self.config:
            self.collectors['crypto'] = CryptocurrencyCollector(
                self.config['coinmarketcap_key']
            )
        
        # Market sentiment analyzer
        if 'news_api_key' in self.config:
            self.collectors['sentiment'] = MarketSentimentAnalyzer(
                self.config['news_api_key']
            )
    
    async def collect_market_overview(self) -> Dict[str, Any]:
        """Collect comprehensive market overview"""
        overview = {
            'timestamp': datetime.now(),
            'financial_signals': [],
            'economic_indicators': [],
            'market_sentiment': [],
            'sector_performance': {},
            'market_summary': {}
        }
        
        # Collect stock data by sector
        if 'stocks' in self.collectors:
            stock_collector = self.collectors['stocks']
            
            for sector in [MarketSector.TECHNOLOGY, MarketSector.HEALTHCARE, MarketSector.FINANCIAL]:
                sector_signals = await stock_collector.collect_sector_data(sector)
                overview['financial_signals'].extend(sector_signals)
                
                # Calculate sector performance
                if sector_signals:
                    sector_change = sum(s.change_percent for s in sector_signals) / len(sector_signals)
                    overview['sector_performance'][sector.value] = {
                        'avg_change': sector_change,
                        'stock_count': len(sector_signals),
                        'top_performer': max(sector_signals, key=lambda x: x.change_percent).symbol,
                        'worst_performer': min(sector_signals, key=lambda x: x.change_percent).symbol
                    }
        
        # Collect economic indicators
        if 'economics' in self.collectors:
            economics_collector = self.collectors['economics']
            
            key_indicators = ['GDP', 'unemployment_rate', 'inflation_rate', 'interest_rate']
            for indicator in key_indicators:
                series_id = economics_collector.indicators.get(indicator)
                if series_id:
                    economic_data = await economics_collector.collect_economic_data(indicator, series_id)
                    if economic_data:
                        overview['economic_indicators'].append(economic_data)
        
        # Collect cryptocurrency data
        if 'crypto' in self.collectors:
            crypto_collector = self.collectors['crypto']
            
            for crypto in ['bitcoin', 'ethereum', 'binancecoin']:
                crypto_data = await crypto_collector.collect_crypto_data(crypto)
                if crypto_data:
                    overview['financial_signals'].append(crypto_data)
        
        # Collect market sentiment
        if 'sentiment' in self.collectors:
            sentiment_collector = self.collectors['sentiment']
            
            major_stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']
            for stock in major_stocks:
                sentiment_data = await sentiment_collector.analyze_symbol_sentiment(stock)
                if sentiment_data:
                    overview['market_sentiment'].append(sentiment_data)
        
        # Generate market summary
        if overview['financial_signals']:
            all_changes = [s.change_percent for s in overview['financial_signals']]
            overview['market_summary'] = {
                'total_signals': len(overview['financial_signals']),
                'avg_change': sum(all_changes) / len(all_changes),
                'positive_signals': len([c for c in all_changes if c > 0]),
                'negative_signals': len([c for c in all_changes if c < 0]),
                'high_volatility_signals': len([s for s in overview['financial_signals'] if s.volatility_score > 5]),
                'market_mood': 'bullish' if sum(all_changes) > 0 else 'bearish'
            }
        
        return overview
    
    async def collect_symbol_intelligence(self, symbol: str) -> Dict[str, Any]:
        """Collect comprehensive intelligence for a specific symbol"""
        intelligence = {
            'symbol': symbol,
            'timestamp': datetime.now(),
            'financial_data': None,
            'sentiment_analysis': None,
            'technical_analysis': {},
            'fundamental_analysis': {},
            'risk_assessment': {},
            'strategic_insights': []
        }
        
        # Collect financial data
        if 'stocks' in self.collectors:
            # Determine sector (simplified)
            sector = MarketSector.TECHNOLOGY  # Would need proper sector mapping
            financial_data = await self.collectors['stocks'].collect_stock_data(symbol, sector)
            intelligence['financial_data'] = financial_data
            
            if financial_data:
                intelligence['technical_analysis'] = financial_data.technical_indicators
                intelligence['fundamental_analysis'] = financial_data.fundamental_metrics
                
                # Simple risk assessment
                intelligence['risk_assessment'] = {
                    'volatility_risk': 'high' if financial_data.volatility_score > 5 else 'medium' if financial_data.volatility_score > 2 else 'low',
                    'liquidity_risk': 'low' if financial_data.liquidity_score > 10 else 'medium' if financial_data.liquidity_score > 5 else 'high',
                    'trend_risk': 'low' if financial_data.trend_direction == TrendDirection.BULLISH else 'high' if financial_data.trend_direction == TrendDirection.BEARISH else 'medium'
                }
        
        # Collect sentiment data
        if 'sentiment' in self.collectors:
            sentiment_data = await self.collectors['sentiment'].analyze_symbol_sentiment(symbol)
            intelligence['sentiment_analysis'] = sentiment_data
        
        # Generate strategic insights
        if intelligence['financial_data'] and intelligence['sentiment_analysis']:
            financial_data = intelligence['financial_data']
            sentiment_data = intelligence['sentiment_analysis']
            
            insights = []
            
            # Price momentum insight
            if financial_data.change_percent > 5:
                insights.append(f"Strong positive momentum (+{financial_data.change_percent:.1f}%) indicates potential continued upward movement")
            elif financial_data.change_percent < -5:
                insights.append(f"Significant decline (-{financial_data.change_percent:.1f}%) suggests caution or buying opportunity")
            
            # Sentiment vs price divergence
            if sentiment_data.sentiment_score > 0.2 and financial_data.change_percent < -2:
                insights.append("Positive sentiment despite price decline could indicate buying opportunity")
            elif sentiment_data.sentiment_score < -0.2 and financial_data.change_percent > 2:
                insights.append("Negative sentiment despite price rise suggests potential resistance")
            
            # Technical analysis insights
            if financial_data.technical_indicators.get('rsi', 50) > 70:
                insights.append("RSI indicates overbought conditions - potential reversal or consolidation")
            elif financial_data.technical_indicators.get('rsi', 50) < 30:
                insights.append("RSI indicates oversold conditions - potential buying opportunity")
            
            intelligence['strategic_insights'] = insights
        
        return intelligence

# Example usage
if __name__ == "__main__":
    # Example configuration
    config = {
        'alpha_vantage_key': 'your_alpha_vantage_key',
        'finnhub_key': 'your_finnhub_key',
        'fred_api_key': 'your_fred_api_key',
        'coinmarketcap_key': 'your_coinmarketcap_key',
        'news_api_key': 'your_news_api_key'
    }
    
    # Initialize engine
    engine = FinancialFeedEngine(config)
    
    # Example: Collect market overview
    async def main():
        print("Collecting market overview...")
        overview = await engine.collect_market_overview()
        
        print(f"\nMarket Summary:")
        print(f"Total signals: {overview['market_summary'].get('total_signals', 0)}")
        print(f"Average change: {overview['market_summary'].get('avg_change', 0):.2f}%")
        print(f"Market mood: {overview['market_summary'].get('market_mood', 'unknown')}")
        
        # Example: Collect symbol intelligence
        symbol = 'AAPL'
        print(f"\nCollecting intelligence for {symbol}...")
        intelligence = await engine.collect_symbol_intelligence(symbol)
        
        if intelligence['financial_data']:
            print(f"Price: ${intelligence['financial_data'].price:.2f}")
            print(f"Change: {intelligence['financial_data'].change_percent:.2f}%")
            print(f"Volatility: {intelligence['financial_data'].volatility_score:.2f}")
        
        for insight in intelligence['strategic_insights']:
            print(f"- {insight}")
    
    # Run the example
    asyncio.run(main())