"""
Financial Feed Module - Market Data Intelligence

This module handles ingestion of financial market data, stock performance,
sector analysis, and economic indicators from various financial APIs.

Features:
- Multi-source financial data ingestion (Yahoo Finance, Alpha Vantage, etc.)
- Stock price tracking and volatility analysis
- Sector performance monitoring
- Economic indicator integration
- Real-time market signal generation
- Data normalization for Lucidra's feedback engine

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
import numpy as np
from contextlib import asynccontextmanager
import yfinance as yf
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
DB_PATH = os.environ.get('LUCIDRA_DB_PATH', 'data/lucidra_signals.db')
ALPHA_VANTAGE_API_KEY = os.environ.get('ALPHA_VANTAGE_API_KEY', '')
RATE_LIMIT_WINDOW = 60  # 1 minute
MAX_RETRIES = 3
RETRY_DELAY = 2

class FinancialSignalType(Enum):
    """Financial signal type enumeration"""
    STOCK_PRICE = "stock_price"
    VOLATILITY = "volatility"
    SECTOR_PERFORMANCE = "sector_performance"
    ECONOMIC_INDICATOR = "economic_indicator"
    MARKET_SENTIMENT = "market_sentiment"

class MarketSector(Enum):
    """Market sector enumeration"""
    TECHNOLOGY = "technology"
    HEALTHCARE = "healthcare"
    FINANCE = "finance"
    ENERGY = "energy"
    CONSUMER = "consumer"
    INDUSTRIAL = "industrial"
    UTILITIES = "utilities"
    MATERIALS = "materials"
    REAL_ESTATE = "real_estate"
    COMMUNICATIONS = "communications"

@dataclass
class FinancialSignal:
    """
    Data structure for financial market signals
    """
    id: str
    signal_type: FinancialSignalType
    symbol: str
    name: str
    sector: MarketSector
    price: float
    change: float
    change_percent: float
    volume: int
    market_cap: Optional[float]
    volatility: float
    trend_direction: str  # 'bullish', 'bearish', 'neutral'
    confidence: float  # 0 to 1
    metadata: Dict[str, Any]
    timestamp: datetime
    source: str

class FinancialDataEngine:
    """
    Main engine for ingesting and processing financial market data
    """
    
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.rate_limits = {}
        self.session = None
        self._setup_database()
        
        # Define major stock symbols by sector
        self.sector_symbols = {
            MarketSector.TECHNOLOGY: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA', 'NFLX'],
            MarketSector.HEALTHCARE: ['JNJ', 'UNH', 'PFE', 'ABT', 'TMO', 'MDT', 'ABBV', 'DHR'],
            MarketSector.FINANCE: ['JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'AXP', 'USB'],
            MarketSector.ENERGY: ['XOM', 'CVX', 'COP', 'EOG', 'SLB', 'MPC', 'PSX', 'VLO'],
            MarketSector.CONSUMER: ['WMT', 'HD', 'PG', 'KO', 'MCD', 'DIS', 'NKE', 'SBUX'],
            MarketSector.INDUSTRIAL: ['BA', 'CAT', 'GE', 'HON', 'MMM', 'UPS', 'LMT', 'RTX'],
            MarketSector.UTILITIES: ['NEE', 'DUK', 'SO', 'AEP', 'EXC', 'XEL', 'PEG', 'ED'],
            MarketSector.MATERIALS: ['LIN', 'APD', 'ECL', 'SHW', 'FCX', 'NEM', 'DOW', 'DD']
        }
        
    def _setup_database(self):
        """Initialize DuckDB database and create financial signals table"""
        try:
            conn = duckdb.connect(self.db_path)
            
            # Create financial signals table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS financial_signals (
                    id VARCHAR PRIMARY KEY,
                    signal_type VARCHAR NOT NULL,
                    symbol VARCHAR NOT NULL,
                    name VARCHAR NOT NULL,
                    sector VARCHAR NOT NULL,
                    price FLOAT NOT NULL,
                    change_amount FLOAT,
                    change_percent FLOAT,
                    volume BIGINT,
                    market_cap FLOAT,
                    volatility FLOAT,
                    trend_direction VARCHAR,
                    confidence FLOAT,
                    metadata JSON,
                    timestamp TIMESTAMP NOT NULL,
                    source VARCHAR NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create indexes
            conn.execute("CREATE INDEX IF NOT EXISTS idx_financial_symbol ON financial_signals(symbol)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_financial_sector ON financial_signals(sector)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_financial_timestamp ON financial_signals(timestamp)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_financial_signal_type ON financial_signals(signal_type)")
            
            # Create sector performance summary table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS sector_performance (
                    sector VARCHAR PRIMARY KEY,
                    avg_change FLOAT,
                    total_volume BIGINT,
                    avg_volatility FLOAT,
                    trend_direction VARCHAR,
                    timestamp TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            conn.close()
            logger.info("Financial database tables initialized successfully")
            
        except Exception as e:
            logger.error(f"Financial database initialization failed: {e}")
            raise
    
    async def __aenter__(self):
        """Async context manager entry"""
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            headers={'User-Agent': 'Lucidra-FinancialFeed/1.0'}
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self.session:
            await self.session.close()
    
    def _check_rate_limit(self, source: str, limit_per_minute: int = 5) -> bool:
        """Check if API rate limit allows for new requests"""
        now = datetime.now()
        
        if source not in self.rate_limits:
            self.rate_limits[source] = {
                'count': 0,
                'window_start': now
            }
        
        rate_info = self.rate_limits[source]
        
        # Reset window if minute has passed
        if now - rate_info['window_start'] > timedelta(minutes=1):
            rate_info['count'] = 0
            rate_info['window_start'] = now
        
        if rate_info['count'] >= limit_per_minute:
            logger.warning(f"Rate limit exceeded for {source}")
            return False
        
        rate_info['count'] += 1
        return True
    
    def ingest_yahoo_finance_data(self, symbols: List[str] = None) -> List[FinancialSignal]:
        """
        Ingest stock data from Yahoo Finance
        
        Args:
            symbols: List of stock symbols to fetch
            
        Returns:
            List of FinancialSignal objects
        """
        if not self._check_rate_limit("yahoo_finance"):
            return self._get_yahoo_fallback_data()
        
        signals = []
        
        # Use default symbols if none provided
        if not symbols:
            symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX']
        
        try:
            # Fetch data for multiple symbols at once
            tickers = yf.Tickers(' '.join(symbols))
            
            for symbol in symbols:
                try:
                    ticker = tickers.tickers[symbol]
                    
                    # Get current info
                    info = ticker.info
                    
                    # Get recent price history for volatility calculation
                    hist = ticker.history(period='1mo')
                    
                    if hist.empty:
                        continue
                    
                    # Calculate volatility (standard deviation of returns)
                    returns = hist['Close'].pct_change().dropna()
                    volatility = returns.std() * np.sqrt(252)  # Annualized volatility
                    
                    # Get current price data
                    current_price = hist['Close'].iloc[-1]
                    previous_price = hist['Close'].iloc[-2] if len(hist) > 1 else current_price
                    change = current_price - previous_price
                    change_percent = (change / previous_price) * 100
                    
                    # Determine trend direction
                    trend_direction = self._determine_trend(hist['Close'])
                    
                    # Determine sector
                    sector = self._get_sector_from_symbol(symbol)
                    
                    signal = FinancialSignal(
                        id=f"yahoo_{symbol}_{int(time.time())}",
                        signal_type=FinancialSignalType.STOCK_PRICE,
                        symbol=symbol,
                        name=info.get('longName', symbol),
                        sector=sector,
                        price=float(current_price),
                        change=float(change),
                        change_percent=float(change_percent),
                        volume=int(hist['Volume'].iloc[-1]),
                        market_cap=info.get('marketCap'),
                        volatility=float(volatility),
                        trend_direction=trend_direction,
                        confidence=0.8,  # High confidence for Yahoo Finance data
                        metadata={
                            'beta': info.get('beta'),
                            'pe_ratio': info.get('trailingPE'),
                            'div_yield': info.get('dividendYield'),
                            'source': 'yahoo_finance'
                        },
                        timestamp=datetime.now(),
                        source='yahoo_finance'
                    )
                    
                    signals.append(signal)
                    
                except Exception as e:
                    logger.error(f"Failed to process {symbol}: {e}")
                    continue
                    
            logger.info(f"Ingested {len(signals)} Yahoo Finance signals")
            return signals
            
        except Exception as e:
            logger.error(f"Yahoo Finance ingestion failed: {e}")
            return self._get_yahoo_fallback_data()
    
    async def ingest_alpha_vantage_data(self, symbols: List[str] = None) -> List[FinancialSignal]:
        """
        Ingest financial data from Alpha Vantage API
        
        Args:
            symbols: List of stock symbols to fetch
            
        Returns:
            List of FinancialSignal objects
        """
        if not ALPHA_VANTAGE_API_KEY:
            logger.warning("Alpha Vantage API key not configured, using fallback data")
            return self._get_alpha_vantage_fallback_data()
        
        if not self._check_rate_limit("alpha_vantage"):
            return self._get_alpha_vantage_fallback_data()
        
        signals = []
        symbols = symbols or ['AAPL', 'MSFT', 'GOOGL', 'AMZN']
        
        base_url = "https://www.alphavantage.co/query"
        
        for symbol in symbols:
            try:
                # Get quote data
                params = {
                    'function': 'GLOBAL_QUOTE',
                    'symbol': symbol,
                    'apikey': ALPHA_VANTAGE_API_KEY
                }
                
                async with self.session.get(base_url, params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        
                        if 'Global Quote' in data:
                            quote = data['Global Quote']
                            
                            signal = self._process_alpha_vantage_quote(quote, symbol)
                            if signal:
                                signals.append(signal)
                        
                        # Add delay to respect API rate limits
                        await asyncio.sleep(12)  # Alpha Vantage free tier: 5 calls/minute
                        
            except Exception as e:
                logger.error(f"Alpha Vantage ingestion failed for {symbol}: {e}")
                continue
        
        logger.info(f"Ingested {len(signals)} Alpha Vantage signals")
        return signals
    
    def _process_alpha_vantage_quote(self, quote: Dict, symbol: str) -> Optional[FinancialSignal]:
        """Process Alpha Vantage quote data into FinancialSignal"""
        try:
            price = float(quote.get('05. price', 0))
            change = float(quote.get('09. change', 0))
            change_percent = float(quote.get('10. change percent', '0%').replace('%', ''))
            volume = int(quote.get('06. volume', 0))
            
            # Calculate volatility from high/low spread
            high = float(quote.get('03. high', price))
            low = float(quote.get('02. low', price))
            volatility = (high - low) / price if price > 0 else 0
            
            trend_direction = 'bullish' if change > 0 else 'bearish' if change < 0 else 'neutral'
            sector = self._get_sector_from_symbol(symbol)
            
            signal = FinancialSignal(
                id=f"alpha_vantage_{symbol}_{int(time.time())}",
                signal_type=FinancialSignalType.STOCK_PRICE,
                symbol=symbol,
                name=symbol,  # Alpha Vantage doesn't provide company name in global quote
                sector=sector,
                price=price,
                change=change,
                change_percent=change_percent,
                volume=volume,
                market_cap=None,
                volatility=volatility,
                trend_direction=trend_direction,
                confidence=0.85,  # High confidence for Alpha Vantage data
                metadata={
                    'open': quote.get('02. open'),
                    'high': quote.get('03. high'),
                    'low': quote.get('04. low'),
                    'previous_close': quote.get('08. previous close'),
                    'source': 'alpha_vantage'
                },
                timestamp=datetime.now(),
                source='alpha_vantage'
            )
            
            return signal
            
        except Exception as e:
            logger.error(f"Failed to process Alpha Vantage quote for {symbol}: {e}")
            return None
    
    def _determine_trend(self, price_series: pd.Series) -> str:
        """Determine trend direction from price series"""
        if len(price_series) < 5:
            return 'neutral'
        
        # Calculate moving averages
        short_ma = price_series.rolling(window=5).mean().iloc[-1]
        long_ma = price_series.rolling(window=10).mean().iloc[-1] if len(price_series) >= 10 else short_ma
        
        if short_ma > long_ma * 1.02:  # 2% threshold
            return 'bullish'
        elif short_ma < long_ma * 0.98:
            return 'bearish'
        else:
            return 'neutral'
    
    def _get_sector_from_symbol(self, symbol: str) -> MarketSector:
        """Determine sector from stock symbol"""
        for sector, symbols in self.sector_symbols.items():
            if symbol in symbols:
                return sector
        return MarketSector.TECHNOLOGY  # Default sector
    
    def calculate_sector_performance(self, signals: List[FinancialSignal]) -> List[Dict]:
        """
        Calculate aggregated sector performance metrics
        
        Args:
            signals: List of FinancialSignal objects
            
        Returns:
            List of sector performance dictionaries
        """
        sector_data = {}
        
        for signal in signals:
            sector = signal.sector
            
            if sector not in sector_data:
                sector_data[sector] = {
                    'total_change': 0,
                    'total_volume': 0,
                    'volatility_sum': 0,
                    'count': 0,
                    'bullish_count': 0,
                    'bearish_count': 0
                }
            
            data = sector_data[sector]
            data['total_change'] += signal.change_percent
            data['total_volume'] += signal.volume
            data['volatility_sum'] += signal.volatility
            data['count'] += 1
            
            if signal.trend_direction == 'bullish':
                data['bullish_count'] += 1
            elif signal.trend_direction == 'bearish':
                data['bearish_count'] += 1
        
        # Calculate averages and trends
        sector_performance = []
        for sector, data in sector_data.items():
            if data['count'] > 0:
                avg_change = data['total_change'] / data['count']
                avg_volatility = data['volatility_sum'] / data['count']
                
                # Determine overall sector trend
                if data['bullish_count'] > data['bearish_count']:
                    trend = 'bullish'
                elif data['bearish_count'] > data['bullish_count']:
                    trend = 'bearish'
                else:
                    trend = 'neutral'
                
                sector_performance.append({
                    'sector': sector.value,
                    'avg_change': avg_change,
                    'total_volume': data['total_volume'],
                    'avg_volatility': avg_volatility,
                    'trend_direction': trend,
                    'stock_count': data['count'],
                    'timestamp': datetime.now()
                })
        
        return sector_performance
    
    def _get_yahoo_fallback_data(self) -> List[FinancialSignal]:
        """Generate fallback Yahoo Finance data when API is unavailable"""
        return [
            FinancialSignal(
                id="yahoo_fallback_1",
                signal_type=FinancialSignalType.STOCK_PRICE,
                symbol="AAPL",
                name="Apple Inc.",
                sector=MarketSector.TECHNOLOGY,
                price=150.25,
                change=2.45,
                change_percent=1.65,
                volume=45000000,
                market_cap=2400000000000,
                volatility=0.25,
                trend_direction="bullish",
                confidence=0.8,
                metadata={"source": "fallback_data"},
                timestamp=datetime.now(),
                source="yahoo_finance_fallback"
            ),
            FinancialSignal(
                id="yahoo_fallback_2",
                signal_type=FinancialSignalType.STOCK_PRICE,
                symbol="MSFT",
                name="Microsoft Corporation",
                sector=MarketSector.TECHNOLOGY,
                price=330.75,
                change=-1.25,
                change_percent=-0.38,
                volume=25000000,
                market_cap=2500000000000,
                volatility=0.22,
                trend_direction="bearish",
                confidence=0.8,
                metadata={"source": "fallback_data"},
                timestamp=datetime.now(),
                source="yahoo_finance_fallback"
            )
        ]
    
    def _get_alpha_vantage_fallback_data(self) -> List[FinancialSignal]:
        """Generate fallback Alpha Vantage data when API is unavailable"""
        return [
            FinancialSignal(
                id="alpha_fallback_1",
                signal_type=FinancialSignalType.STOCK_PRICE,
                symbol="GOOGL",
                name="Alphabet Inc.",
                sector=MarketSector.TECHNOLOGY,
                price=2750.50,
                change=15.75,
                change_percent=0.58,
                volume=1500000,
                market_cap=1800000000000,
                volatility=0.28,
                trend_direction="bullish",
                confidence=0.85,
                metadata={"source": "fallback_data"},
                timestamp=datetime.now(),
                source="alpha_vantage_fallback"
            )
        ]
    
    def store_financial_signals(self, signals: List[FinancialSignal]):
        """
        Store financial signals in DuckDB database
        
        Args:
            signals: List of FinancialSignal objects to store
        """
        if not signals:
            return
        
        try:
            conn = duckdb.connect(self.db_path)
            
            # Convert signals to DataFrame for batch insert
            signal_data = []
            for signal in signals:
                signal_dict = asdict(signal)
                signal_dict['signal_type'] = signal.signal_type.value
                signal_dict['sector'] = signal.sector.value
                signal_dict['metadata'] = json.dumps(signal.metadata)
                signal_dict['change_amount'] = signal_dict.pop('change')  # Rename for SQL
                signal_data.append(signal_dict)
            
            df = pd.DataFrame(signal_data)
            
            # Insert data using DuckDB
            conn.execute("INSERT OR REPLACE INTO financial_signals SELECT * FROM df")
            conn.close()
            
            logger.info(f"Stored {len(signals)} financial signals in database")
            
        except Exception as e:
            logger.error(f"Failed to store financial signals: {e}")
    
    def store_sector_performance(self, sector_performance: List[Dict]):
        """Store sector performance data in database"""
        if not sector_performance:
            return
        
        try:
            conn = duckdb.connect(self.db_path)
            
            df = pd.DataFrame(sector_performance)
            
            # Insert or replace sector performance data
            conn.execute("INSERT OR REPLACE INTO sector_performance SELECT * FROM df")
            conn.close()
            
            logger.info(f"Stored {len(sector_performance)} sector performance records")
            
        except Exception as e:
            logger.error(f"Failed to store sector performance: {e}")
    
    def query_financial_signals(self, symbol: str = None, sector: str = None, 
                               limit: int = 100) -> List[Dict]:
        """
        Query stored financial signals with optional filters
        
        Args:
            symbol: Filter by stock symbol
            sector: Filter by sector
            limit: Maximum number of results
            
        Returns:
            List of signal dictionaries
        """
        try:
            conn = duckdb.connect(self.db_path)
            
            query = "SELECT * FROM financial_signals WHERE 1=1"
            params = []
            
            if symbol:
                query += " AND symbol = ?"
                params.append(symbol)
            
            if sector:
                query += " AND sector = ?"
                params.append(sector)
            
            query += " ORDER BY timestamp DESC LIMIT ?"
            params.append(limit)
            
            result = conn.execute(query, params).fetchall()
            columns = [desc[0] for desc in conn.description]
            conn.close()
            
            return [dict(zip(columns, row)) for row in result]
            
        except Exception as e:
            logger.error(f"Financial query failed: {e}")
            return []
    
    async def run_financial_ingestion_cycle(self):
        """
        Run a complete financial data ingestion cycle
        """
        logger.info("Starting financial data ingestion cycle")
        
        all_signals = []
        
        # Ingest from Yahoo Finance
        yahoo_signals = self.ingest_yahoo_finance_data()
        all_signals.extend(yahoo_signals)
        
        # Ingest from Alpha Vantage
        alpha_vantage_signals = await self.ingest_alpha_vantage_data()
        all_signals.extend(alpha_vantage_signals)
        
        # Store all signals
        self.store_financial_signals(all_signals)
        
        # Calculate and store sector performance
        sector_performance = self.calculate_sector_performance(all_signals)
        self.store_sector_performance(sector_performance)
        
        logger.info(f"Financial ingestion cycle completed. Total signals: {len(all_signals)}")
        return all_signals


# REST API Functions (FastAPI compatible)
def create_financial_feed_api():
    """Create REST API endpoints for financial feed functionality"""
    from fastapi import FastAPI, HTTPException, Query
    from typing import Optional
    
    app = FastAPI(title="Lucidra Financial Feed API")
    engine = FinancialDataEngine()
    
    @app.get("/api/financial/signals")
    async def get_financial_signals(
        symbol: Optional[str] = Query(None, description="Filter by stock symbol"),
        sector: Optional[str] = Query(None, description="Filter by sector"),
        limit: int = Query(100, description="Maximum number of results")
    ):
        """Get financial signals with optional filters"""
        try:
            signals = engine.query_financial_signals(symbol, sector, limit)
            return {"signals": signals, "count": len(signals)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.post("/api/financial/ingest")
    async def trigger_financial_ingestion():
        """Trigger manual financial data ingestion"""
        try:
            async with FinancialDataEngine() as engine:
                signals = await engine.run_financial_ingestion_cycle()
                return {"message": "Financial ingestion completed", "signals_count": len(signals)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.get("/api/financial/sectors")
    async def get_sector_performance():
        """Get sector performance summary"""
        try:
            conn = duckdb.connect(engine.db_path)
            result = conn.execute("SELECT * FROM sector_performance ORDER BY avg_change DESC").fetchall()
            columns = [desc[0] for desc in conn.description]
            conn.close()
            
            sectors = [dict(zip(columns, row)) for row in result]
            return {"sectors": sectors, "count": len(sectors)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.get("/api/financial/health")
    async def financial_health_check():
        """Health check endpoint"""
        return {"status": "healthy", "timestamp": datetime.now()}
    
    return app


# Command Line Interface
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Lucidra Financial Feed Engine")
    parser.add_argument("--ingest", action="store_true", help="Run financial data ingestion")
    parser.add_argument("--query", action="store_true", help="Query stored financial signals")
    parser.add_argument("--symbol", type=str, help="Filter by stock symbol")
    parser.add_argument("--sector", type=str, help="Filter by sector")
    parser.add_argument("--limit", type=int, default=10, help="Limit results")
    
    args = parser.parse_args()
    
    if args.ingest:
        async def main():
            async with FinancialDataEngine() as engine:
                await engine.run_financial_ingestion_cycle()
        
        asyncio.run(main())
    
    elif args.query:
        engine = FinancialDataEngine()
        signals = engine.query_financial_signals(
            symbol=args.symbol, 
            sector=args.sector, 
            limit=args.limit
        )
        
        for signal in signals:
            print(f"[{signal['symbol']}] {signal['name']} - ${signal['price']:.2f} "
                  f"({signal['change_percent']:+.2f}%) - {signal['timestamp']}")
    
    else:
        print("Use --ingest to run financial data ingestion or --query to query signals")