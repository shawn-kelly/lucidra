"""
Product Trends Module - Complementary Product Intelligence

This module handles ingestion of product trend data, market research signals,
and complementary product opportunities from various sources including
Amazon, e-commerce platforms, and market research APIs.

Features:
- E-commerce product trend tracking
- Complementary product discovery
- Market demand analysis
- Competitive intelligence
- Consumer behavior insights
- Integration with Lucidra's strategic matching system

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
import hashlib
import time
import re
from bs4 import BeautifulSoup

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
DB_PATH = os.environ.get('LUCIDRA_DB_PATH', 'data/lucidra_signals.db')
RATE_LIMIT_WINDOW = 60  # 1 minute
MAX_RETRIES = 3
RETRY_DELAY = 3

class ProductTrendType(Enum):
    """Product trend signal type enumeration"""
    TRENDING_PRODUCT = "trending_product"
    COMPLEMENTARY_PRODUCT = "complementary_product"
    MARKET_DEMAND = "market_demand"
    COMPETITIVE_ANALYSIS = "competitive_analysis"
    CONSUMER_BEHAVIOR = "consumer_behavior"
    SEASONAL_TREND = "seasonal_trend"

class ProductCategory(Enum):
    """Product category enumeration"""
    ELECTRONICS = "electronics"
    CLOTHING = "clothing"
    HOME_GARDEN = "home_garden"
    HEALTH_BEAUTY = "health_beauty"
    SPORTS_OUTDOORS = "sports_outdoors"
    BOOKS_MEDIA = "books_media"
    TOYS_GAMES = "toys_games"
    AUTOMOTIVE = "automotive"
    FOOD_BEVERAGE = "food_beverage"
    BUSINESS_INDUSTRIAL = "business_industrial"

class TrendSentiment(Enum):
    """Trend sentiment enumeration"""
    RISING = "rising"
    DECLINING = "declining"
    STABLE = "stable"
    VOLATILE = "volatile"

@dataclass
class ProductTrendSignal:
    """
    Data structure for product trend signals
    """
    id: str
    trend_type: ProductTrendType
    product_name: str
    category: ProductCategory
    demand_score: float  # 0-100
    growth_rate: float  # Percentage
    sentiment: TrendSentiment
    price_range: Dict[str, float]  # min, max, avg
    market_size: Optional[float]
    competitors: List[str]
    keywords: List[str]
    complementary_products: List[str]
    seasonal_factors: Dict[str, float]
    consumer_demographics: Dict[str, Any]
    confidence: float  # 0-1
    metadata: Dict[str, Any]
    timestamp: datetime
    source: str
    region: str

@dataclass
class StrategicMatch:
    """
    Data structure for strategic product matching
    """
    id: str
    primary_product: str
    matched_product: str
    match_score: float  # 0-100
    synergy_type: str  # complementary, competitive, substitute
    market_opportunity: str
    estimated_demand: float
    revenue_potential: Dict[str, float]
    implementation_complexity: str  # low, medium, high
    time_to_market: str
    risk_factors: List[str]
    success_indicators: List[str]
    metadata: Dict[str, Any]
    timestamp: datetime

class ProductTrendsEngine:
    """
    Main engine for ingesting and analyzing product trends
    """
    
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.rate_limits = {}
        self.session = None
        self._setup_database()
        
        # Define complementary product relationships
        self.complementary_map = {
            'smartphone': ['phone_case', 'screen_protector', 'wireless_charger', 'bluetooth_headphones'],
            'laptop': ['laptop_bag', 'wireless_mouse', 'external_monitor', 'keyboard'],
            'coffee_maker': ['coffee_beans', 'coffee_filters', 'coffee_mugs', 'coffee_grinder'],
            'fitness_tracker': ['fitness_bands', 'heart_rate_monitor', 'workout_clothes', 'protein_supplements'],
            'camera': ['camera_lens', 'tripod', 'memory_card', 'camera_bag'],
            'gaming_console': ['game_controllers', 'gaming_headset', 'games', 'gaming_chair']
        }
        
    def _setup_database(self):
        """Initialize DuckDB database and create product trends tables"""
        try:
            conn = duckdb.connect(self.db_path)
            
            # Create product trends table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS product_trends (
                    id VARCHAR PRIMARY KEY,
                    trend_type VARCHAR NOT NULL,
                    product_name VARCHAR NOT NULL,
                    category VARCHAR NOT NULL,
                    demand_score FLOAT,
                    growth_rate FLOAT,
                    sentiment VARCHAR,
                    price_range JSON,
                    market_size FLOAT,
                    competitors VARCHAR[],
                    keywords VARCHAR[],
                    complementary_products VARCHAR[],
                    seasonal_factors JSON,
                    consumer_demographics JSON,
                    confidence FLOAT,
                    metadata JSON,
                    timestamp TIMESTAMP NOT NULL,
                    source VARCHAR NOT NULL,
                    region VARCHAR,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create strategic matches table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS strategic_matches (
                    id VARCHAR PRIMARY KEY,
                    primary_product VARCHAR NOT NULL,
                    matched_product VARCHAR NOT NULL,
                    match_score FLOAT,
                    synergy_type VARCHAR,
                    market_opportunity TEXT,
                    estimated_demand FLOAT,
                    revenue_potential JSON,
                    implementation_complexity VARCHAR,
                    time_to_market VARCHAR,
                    risk_factors VARCHAR[],
                    success_indicators VARCHAR[],
                    metadata JSON,
                    timestamp TIMESTAMP NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create indexes
            conn.execute("CREATE INDEX IF NOT EXISTS idx_product_trends_category ON product_trends(category)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_product_trends_product ON product_trends(product_name)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_product_trends_timestamp ON product_trends(timestamp)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_strategic_matches_primary ON strategic_matches(primary_product)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_strategic_matches_score ON strategic_matches(match_score)")
            
            conn.close()
            logger.info("Product trends database tables initialized successfully")
            
        except Exception as e:
            logger.error(f"Product trends database initialization failed: {e}")
            raise
    
    async def __aenter__(self):
        """Async context manager entry"""
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self.session:
            await self.session.close()
    
    def _check_rate_limit(self, source: str, limit_per_minute: int = 10) -> bool:
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
    
    async def scrape_amazon_trends(self, categories: List[str] = None) -> List[ProductTrendSignal]:
        """
        Scrape Amazon for trending products (demo implementation)
        
        Args:
            categories: List of product categories to scrape
            
        Returns:
            List of ProductTrendSignal objects
        """
        if not self._check_rate_limit("amazon"):
            return self._get_amazon_fallback_data()
        
        signals = []
        
        # Note: This is a simplified demo implementation
        # In production, would use proper Amazon API or more sophisticated scraping
        
        try:
            # Demo implementation with fallback data
            logger.info("Amazon scraping using demo data (full implementation would require API keys)")
            return self._get_amazon_fallback_data()
            
        except Exception as e:
            logger.error(f"Amazon scraping failed: {e}")
            return self._get_amazon_fallback_data()
    
    async def analyze_google_shopping_trends(self, keywords: List[str] = None) -> List[ProductTrendSignal]:
        """
        Analyze Google Shopping trends for product insights
        
        Args:
            keywords: List of keywords to analyze
            
        Returns:
            List of ProductTrendSignal objects
        """
        if not self._check_rate_limit("google_shopping"):
            return self._get_google_shopping_fallback_data()
        
        signals = []
        default_keywords = ["smart home", "fitness tracker", "wireless earbuds", "laptop", "smartphone"]
        keywords = keywords or default_keywords
        
        try:
            # Demo implementation - would use Google Shopping API in production
            logger.info("Google Shopping analysis using demo data")
            return self._get_google_shopping_fallback_data()
            
        except Exception as e:
            logger.error(f"Google Shopping analysis failed: {e}")
            return self._get_google_shopping_fallback_data()
    
    def generate_complementary_products(self, primary_product: str, 
                                      user_goals: List[str] = None) -> List[StrategicMatch]:
        """
        Generate complementary product suggestions based on primary product
        
        Args:
            primary_product: Primary product to find complements for
            user_goals: User's business goals and preferences
            
        Returns:
            List of StrategicMatch objects
        """
        matches = []
        
        # Find complementary products
        complementary_products = self._find_complementary_products(primary_product)
        
        for comp_product in complementary_products:
            # Calculate match score based on various factors
            match_score = self._calculate_match_score(primary_product, comp_product, user_goals)
            
            # Determine synergy type
            synergy_type = self._determine_synergy_type(primary_product, comp_product)
            
            # Generate market opportunity description
            market_opportunity = self._generate_market_opportunity(primary_product, comp_product)
            
            # Estimate demand and revenue potential
            estimated_demand = self._estimate_demand(comp_product)
            revenue_potential = self._calculate_revenue_potential(comp_product, estimated_demand)
            
            # Assess implementation complexity
            complexity = self._assess_implementation_complexity(primary_product, comp_product)
            
            # Estimate time to market
            time_to_market = self._estimate_time_to_market(complexity)
            
            # Identify risk factors
            risk_factors = self._identify_risk_factors(primary_product, comp_product)
            
            # Define success indicators
            success_indicators = self._define_success_indicators(comp_product)
            
            match = StrategicMatch(
                id=f"match_{hashlib.md5(f'{primary_product}_{comp_product}'.encode()).hexdigest()[:8]}",
                primary_product=primary_product,
                matched_product=comp_product,
                match_score=match_score,
                synergy_type=synergy_type,
                market_opportunity=market_opportunity,
                estimated_demand=estimated_demand,
                revenue_potential=revenue_potential,
                implementation_complexity=complexity,
                time_to_market=time_to_market,
                risk_factors=risk_factors,
                success_indicators=success_indicators,
                metadata={
                    'algorithm_version': '1.0',
                    'user_goals': user_goals,
                    'generated_at': datetime.now().isoformat()
                },
                timestamp=datetime.now()
            )
            
            matches.append(match)
        
        # Sort by match score
        matches.sort(key=lambda x: x.match_score, reverse=True)
        
        return matches[:5]  # Return top 5 matches
    
    def _find_complementary_products(self, primary_product: str) -> List[str]:
        """Find complementary products for a given primary product"""
        primary_lower = primary_product.lower()
        
        # Check predefined complementary map
        for key, complements in self.complementary_map.items():
            if key in primary_lower:
                return complements
        
        # Generate generic complementary products based on category
        if 'tech' in primary_lower or 'electronic' in primary_lower:
            return ['accessories', 'protective_case', 'charger', 'stand']
        elif 'clothing' in primary_lower or 'apparel' in primary_lower:
            return ['accessories', 'shoes', 'jewelry', 'bags']
        elif 'home' in primary_lower:
            return ['decor', 'cleaning_supplies', 'storage', 'lighting']
        else:
            return ['accessories', 'maintenance_kit', 'user_manual', 'warranty']
    
    def _calculate_match_score(self, primary: str, complement: str, user_goals: List[str] = None) -> float:
        """Calculate match score between primary and complementary product"""
        base_score = 60  # Base score
        
        # Bonus for popular complementary pairs
        if self._is_popular_pair(primary, complement):
            base_score += 20
        
        # Bonus for matching user goals
        if user_goals:
            for goal in user_goals:
                if goal.lower() in complement.lower():
                    base_score += 10
        
        # Bonus for high-demand products
        if self._is_high_demand_product(complement):
            base_score += 15
        
        # Add some randomness to simulate market variability
        import random
        base_score += random.uniform(-5, 5)
        
        return min(100, max(0, base_score))
    
    def _determine_synergy_type(self, primary: str, complement: str) -> str:
        """Determine the type of synergy between products"""
        if complement in self.complementary_map.get(primary.lower(), []):
            return "complementary"
        elif "competitor" in complement.lower() or "alternative" in complement.lower():
            return "competitive"
        else:
            return "complementary"  # Default
    
    def _generate_market_opportunity(self, primary: str, complement: str) -> str:
        """Generate market opportunity description"""
        opportunities = [
            f"Growing demand for {complement} accessories in the {primary} market",
            f"Untapped market for {complement} solutions targeting {primary} users",
            f"Opportunity to bundle {complement} with {primary} for increased value",
            f"Market gap for premium {complement} products in the {primary} space",
            f"Emerging trend toward integrated {complement} solutions for {primary} users"
        ]
        
        import random
        return random.choice(opportunities)
    
    def _estimate_demand(self, product: str) -> float:
        """Estimate market demand for a product (0-100 scale)"""
        # Simplified demand estimation
        high_demand_keywords = ['smart', 'wireless', 'portable', 'eco', 'premium']
        
        demand_score = 50  # Base demand
        
        for keyword in high_demand_keywords:
            if keyword in product.lower():
                demand_score += 10
        
        # Add seasonal factors
        current_month = datetime.now().month
        if current_month in [11, 12, 1]:  # Holiday season
            demand_score += 15
        elif current_month in [6, 7, 8]:  # Summer season
            demand_score += 10
        
        return min(100, max(0, demand_score))
    
    def _calculate_revenue_potential(self, product: str, demand: float) -> Dict[str, float]:
        """Calculate revenue potential for a product"""
        # Base revenue estimates (simplified)
        base_revenue = demand * 1000  # Scale demand to revenue
        
        return {
            'monthly_min': base_revenue * 0.5,
            'monthly_max': base_revenue * 2.0,
            'monthly_avg': base_revenue,
            'annual_potential': base_revenue * 12
        }
    
    def _assess_implementation_complexity(self, primary: str, complement: str) -> str:
        """Assess implementation complexity for bringing complement to market"""
        complexity_factors = [
            ('physical_product', 'high'),
            ('software', 'medium'),
            ('service', 'low'),
            ('accessory', 'low'),
            ('digital', 'medium')
        ]
        
        for factor, level in complexity_factors:
            if factor in complement.lower():
                return level
        
        return 'medium'  # Default
    
    def _estimate_time_to_market(self, complexity: str) -> str:
        """Estimate time to market based on complexity"""
        time_map = {
            'low': '1-3 months',
            'medium': '3-6 months',
            'high': '6-12 months'
        }
        
        return time_map.get(complexity, '3-6 months')
    
    def _identify_risk_factors(self, primary: str, complement: str) -> List[str]:
        """Identify risk factors for the product match"""
        risk_factors = [
            'Market saturation',
            'Seasonal demand fluctuations',
            'Supply chain dependencies',
            'Regulatory compliance requirements',
            'Competitive pricing pressure'
        ]
        
        # Add specific risks based on product type
        if 'electronic' in complement.lower():
            risk_factors.append('Technology obsolescence')
        if 'fashion' in complement.lower():
            risk_factors.append('Fashion trend changes')
        
        return risk_factors[:3]  # Return top 3 risk factors
    
    def _define_success_indicators(self, product: str) -> List[str]:
        """Define success indicators for the product"""
        return [
            'Monthly sales growth > 10%',
            'Customer satisfaction score > 4.0',
            'Market share increase',
            'Positive customer reviews',
            'Repeat purchase rate > 25%'
        ]
    
    def _is_popular_pair(self, primary: str, complement: str) -> bool:
        """Check if primary and complement form a popular product pair"""
        popular_pairs = [
            ('smartphone', 'phone_case'),
            ('laptop', 'laptop_bag'),
            ('camera', 'tripod'),
            ('coffee_maker', 'coffee_beans'),
            ('fitness_tracker', 'fitness_bands')
        ]
        
        for pair in popular_pairs:
            if pair[0] in primary.lower() and pair[1] in complement.lower():
                return True
        
        return False
    
    def _is_high_demand_product(self, product: str) -> bool:
        """Check if product is typically high-demand"""
        high_demand_keywords = ['smart', 'wireless', 'portable', 'premium', 'eco-friendly']
        
        for keyword in high_demand_keywords:
            if keyword in product.lower():
                return True
        
        return False
    
    def _get_amazon_fallback_data(self) -> List[ProductTrendSignal]:
        """Generate fallback Amazon data when scraping is unavailable"""
        return [
            ProductTrendSignal(
                id="amazon_fallback_1",
                trend_type=ProductTrendType.TRENDING_PRODUCT,
                product_name="Wireless Bluetooth Earbuds",
                category=ProductCategory.ELECTRONICS,
                demand_score=85.0,
                growth_rate=15.2,
                sentiment=TrendSentiment.RISING,
                price_range={"min": 29.99, "max": 199.99, "avg": 79.99},
                market_size=2500000000,
                competitors=["Apple AirPods", "Samsung Galaxy Buds", "Sony WF-1000XM4"],
                keywords=["wireless", "bluetooth", "earbuds", "audio"],
                complementary_products=["phone_case", "charging_cable", "ear_tips"],
                seasonal_factors={"holiday": 1.3, "summer": 1.1, "back_to_school": 1.2},
                consumer_demographics={"age_18_34": 0.4, "age_35_54": 0.35, "age_55_plus": 0.25},
                confidence=0.8,
                metadata={"source": "amazon_fallback", "last_updated": datetime.now().isoformat()},
                timestamp=datetime.now(),
                source="amazon_fallback",
                region="North America"
            ),
            ProductTrendSignal(
                id="amazon_fallback_2",
                trend_type=ProductTrendType.TRENDING_PRODUCT,
                product_name="Smart Home Security Camera",
                category=ProductCategory.ELECTRONICS,
                demand_score=78.0,
                growth_rate=22.5,
                sentiment=TrendSentiment.RISING,
                price_range={"min": 49.99, "max": 299.99, "avg": 129.99},
                market_size=1800000000,
                competitors=["Ring", "Nest", "Arlo", "Blink"],
                keywords=["smart", "security", "camera", "home"],
                complementary_products=["mounting_bracket", "sd_card", "power_adapter"],
                seasonal_factors={"holiday": 1.4, "summer": 1.2, "winter": 0.9},
                consumer_demographics={"age_25_44": 0.5, "age_45_64": 0.3, "age_18_34": 0.2},
                confidence=0.75,
                metadata={"source": "amazon_fallback", "last_updated": datetime.now().isoformat()},
                timestamp=datetime.now(),
                source="amazon_fallback",
                region="North America"
            )
        ]
    
    def _get_google_shopping_fallback_data(self) -> List[ProductTrendSignal]:
        """Generate fallback Google Shopping data when API is unavailable"""
        return [
            ProductTrendSignal(
                id="google_shopping_fallback_1",
                trend_type=ProductTrendType.MARKET_DEMAND,
                product_name="Fitness Tracker Watch",
                category=ProductCategory.SPORTS_OUTDOORS,
                demand_score=72.0,
                growth_rate=18.7,
                sentiment=TrendSentiment.RISING,
                price_range={"min": 39.99, "max": 399.99, "avg": 149.99},
                market_size=1200000000,
                competitors=["Fitbit", "Apple Watch", "Garmin", "Samsung Galaxy Watch"],
                keywords=["fitness", "tracker", "health", "wearable"],
                complementary_products=["sport_bands", "screen_protector", "charging_dock"],
                seasonal_factors={"new_year": 1.8, "summer": 1.3, "holiday": 1.1},
                consumer_demographics={"age_25_44": 0.45, "age_18_34": 0.35, "age_45_64": 0.2},
                confidence=0.7,
                metadata={"source": "google_shopping_fallback", "last_updated": datetime.now().isoformat()},
                timestamp=datetime.now(),
                source="google_shopping_fallback",
                region="Global"
            )
        ]
    
    def store_product_trends(self, trends: List[ProductTrendSignal]):
        """Store product trends in DuckDB database"""
        if not trends:
            return
        
        try:
            conn = duckdb.connect(self.db_path)
            
            # Convert trends to DataFrame
            trend_data = []
            for trend in trends:
                trend_dict = asdict(trend)
                trend_dict['trend_type'] = trend.trend_type.value
                trend_dict['category'] = trend.category.value
                trend_dict['sentiment'] = trend.sentiment.value
                trend_dict['price_range'] = json.dumps(trend.price_range)
                trend_dict['seasonal_factors'] = json.dumps(trend.seasonal_factors)
                trend_dict['consumer_demographics'] = json.dumps(trend.consumer_demographics)
                trend_dict['metadata'] = json.dumps(trend.metadata)
                trend_data.append(trend_dict)
            
            df = pd.DataFrame(trend_data)
            
            # Insert data
            conn.execute("INSERT OR REPLACE INTO product_trends SELECT * FROM df")
            conn.close()
            
            logger.info(f"Stored {len(trends)} product trends in database")
            
        except Exception as e:
            logger.error(f"Failed to store product trends: {e}")
    
    def store_strategic_matches(self, matches: List[StrategicMatch]):
        """Store strategic matches in DuckDB database"""
        if not matches:
            return
        
        try:
            conn = duckdb.connect(self.db_path)
            
            # Convert matches to DataFrame
            match_data = []
            for match in matches:
                match_dict = asdict(match)
                match_dict['revenue_potential'] = json.dumps(match.revenue_potential)
                match_dict['metadata'] = json.dumps(match.metadata)
                match_data.append(match_dict)
            
            df = pd.DataFrame(match_data)
            
            # Insert data
            conn.execute("INSERT OR REPLACE INTO strategic_matches SELECT * FROM df")
            conn.close()
            
            logger.info(f"Stored {len(matches)} strategic matches in database")
            
        except Exception as e:
            logger.error(f"Failed to store strategic matches: {e}")
    
    def query_product_trends(self, category: str = None, trend_type: str = None,
                           limit: int = 100) -> List[Dict]:
        """Query stored product trends with optional filters"""
        try:
            conn = duckdb.connect(self.db_path)
            
            query = "SELECT * FROM product_trends WHERE 1=1"
            params = []
            
            if category:
                query += " AND category = ?"
                params.append(category)
            
            if trend_type:
                query += " AND trend_type = ?"
                params.append(trend_type)
            
            query += " ORDER BY demand_score DESC LIMIT ?"
            params.append(limit)
            
            result = conn.execute(query, params).fetchall()
            columns = [desc[0] for desc in conn.description]
            conn.close()
            
            return [dict(zip(columns, row)) for row in result]
            
        except Exception as e:
            logger.error(f"Product trends query failed: {e}")
            return []
    
    def query_strategic_matches(self, primary_product: str = None, 
                              min_score: float = 0, limit: int = 100) -> List[Dict]:
        """Query stored strategic matches with optional filters"""
        try:
            conn = duckdb.connect(self.db_path)
            
            query = "SELECT * FROM strategic_matches WHERE 1=1"
            params = []
            
            if primary_product:
                query += " AND primary_product = ?"
                params.append(primary_product)
            
            if min_score > 0:
                query += " AND match_score >= ?"
                params.append(min_score)
            
            query += " ORDER BY match_score DESC LIMIT ?"
            params.append(limit)
            
            result = conn.execute(query, params).fetchall()
            columns = [desc[0] for desc in conn.description]
            conn.close()
            
            return [dict(zip(columns, row)) for row in result]
            
        except Exception as e:
            logger.error(f"Strategic matches query failed: {e}")
            return []
    
    async def run_product_trends_cycle(self, primary_product: str = None, 
                                     user_goals: List[str] = None):
        """Run a complete product trends analysis cycle"""
        logger.info("Starting product trends analysis cycle")
        
        # Scrape product trends
        amazon_trends = await self.scrape_amazon_trends()
        google_trends = await self.analyze_google_shopping_trends()
        
        all_trends = amazon_trends + google_trends
        
        # Store trends
        self.store_product_trends(all_trends)
        
        # Generate strategic matches if primary product is provided
        strategic_matches = []
        if primary_product:
            strategic_matches = self.generate_complementary_products(primary_product, user_goals)
            self.store_strategic_matches(strategic_matches)
        
        logger.info(f"Product trends cycle completed. Trends: {len(all_trends)}, Matches: {len(strategic_matches)}")
        
        return {
            'trends': all_trends,
            'strategic_matches': strategic_matches
        }


# REST API Functions (FastAPI compatible)
def create_product_trends_api():
    """Create REST API endpoints for product trends functionality"""
    from fastapi import FastAPI, HTTPException, Query
    from typing import Optional
    
    app = FastAPI(title="Lucidra Product Trends API")
    engine = ProductTrendsEngine()
    
    @app.get("/api/product-trends/trends")
    async def get_product_trends(
        category: Optional[str] = Query(None, description="Filter by category"),
        trend_type: Optional[str] = Query(None, description="Filter by trend type"),
        limit: int = Query(100, description="Maximum number of results")
    ):
        """Get product trends with optional filters"""
        try:
            trends = engine.query_product_trends(category, trend_type, limit)
            return {"trends": trends, "count": len(trends)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.get("/api/product-trends/matches")
    async def get_strategic_matches(
        primary_product: Optional[str] = Query(None, description="Primary product to match"),
        min_score: float = Query(0, description="Minimum match score"),
        limit: int = Query(100, description="Maximum number of results")
    ):
        """Get strategic product matches"""
        try:
            matches = engine.query_strategic_matches(primary_product, min_score, limit)
            return {"matches": matches, "count": len(matches)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.post("/api/product-trends/generate-matches")
    async def generate_matches(
        primary_product: str,
        user_goals: Optional[List[str]] = None
    ):
        """Generate strategic matches for a primary product"""
        try:
            matches = engine.generate_complementary_products(primary_product, user_goals)
            return {"matches": [asdict(match) for match in matches], "count": len(matches)}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.post("/api/product-trends/ingest")
    async def trigger_product_ingestion(
        primary_product: Optional[str] = None,
        user_goals: Optional[List[str]] = None
    ):
        """Trigger manual product trends ingestion"""
        try:
            async with ProductTrendsEngine() as engine:
                result = await engine.run_product_trends_cycle(primary_product, user_goals)
                return {
                    "message": "Product trends ingestion completed",
                    "trends_count": len(result['trends']),
                    "matches_count": len(result['strategic_matches'])
                }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.get("/api/product-trends/health")
    async def product_trends_health_check():
        """Health check endpoint"""
        return {"status": "healthy", "timestamp": datetime.now()}
    
    return app


# Command Line Interface
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Lucidra Product Trends Engine")
    parser.add_argument("--ingest", action="store_true", help="Run product trends ingestion")
    parser.add_argument("--match", type=str, help="Generate matches for primary product")
    parser.add_argument("--query", action="store_true", help="Query stored trends")
    parser.add_argument("--category", type=str, help="Filter by category")
    parser.add_argument("--limit", type=int, default=10, help="Limit results")
    
    args = parser.parse_args()
    
    if args.ingest:
        async def main():
            async with ProductTrendsEngine() as engine:
                await engine.run_product_trends_cycle()
        
        asyncio.run(main())
    
    elif args.match:
        engine = ProductTrendsEngine()
        matches = engine.generate_complementary_products(args.match)
        
        for match in matches:
            print(f"[{match.match_score:.1f}] {match.matched_product} - {match.market_opportunity}")
    
    elif args.query:
        engine = ProductTrendsEngine()
        trends = engine.query_product_trends(category=args.category, limit=args.limit)
        
        for trend in trends:
            print(f"[{trend['category']}] {trend['product_name']} - "
                  f"Demand: {trend['demand_score']:.1f}, Growth: {trend['growth_rate']:+.1f}%")
    
    else:
        print("Use --ingest to run product trends ingestion, --match <product> to generate matches, "
              "or --query to query trends")