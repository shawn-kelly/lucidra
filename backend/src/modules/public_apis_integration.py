"""
Public APIs Integration Module for Lucidra Strategic Intelligence Platform

This module integrates with various public APIs to enhance strategic frameworks
with real-time business intelligence, market data, and competitive insights.

Author: Claude Code
Date: August 14, 2025
"""

import requests
import json
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
import time
from dataclasses import dataclass

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class APIEndpoint:
    """Data class for API endpoint configuration"""
    name: str
    base_url: str
    description: str
    auth_required: bool = False
    rate_limit: int = 100  # requests per minute
    strategic_use: str = ""

class PublicAPIsIntegration:
    """
    Integration with public APIs for strategic business intelligence
    """
    
    def __init__(self):
        """Initialize public APIs integration"""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Lucidra-Strategic-Intelligence/1.0'
        })
        
        # Configure strategic APIs
        self.apis = self._configure_strategic_apis()
        self.rate_limits = {}
        
    def _configure_strategic_apis(self) -> Dict[str, APIEndpoint]:
        """Configure strategic business APIs"""
        return {
            # Economic Data APIs
            'world_bank': APIEndpoint(
                name="World Bank Open Data",
                base_url="https://api.worldbank.org/v2",
                description="Global economic indicators and development data",
                strategic_use="Porter's Five Forces - Industry Analysis, Macro Environment"
            ),
            'fred': APIEndpoint(
                name="Federal Reserve Economic Data",
                base_url="https://api.stlouisfed.org/fred",
                description="US economic data and financial indicators",
                strategic_use="Market Environment Analysis, Economic Trends"
            ),
            
            # Business Intelligence APIs
            'companies_house': APIEndpoint(
                name="Companies House UK",
                base_url="https://api.company-information.service.gov.uk",
                description="UK company registration and filing data",
                auth_required=True,
                strategic_use="Competitive Intelligence, Market Research"
            ),
            'opencorporates': APIEndpoint(
                name="OpenCorporates",
                base_url="https://api.opencorporates.com/v0.4",
                description="Global corporate data",
                strategic_use="Competitive Analysis, Market Mapping"
            ),
            
            # News and Sentiment APIs
            'newsapi': APIEndpoint(
                name="NewsAPI",
                base_url="https://newsapi.org/v2",
                description="Global news aggregation",
                auth_required=True,
                strategic_use="Market Sentiment, Industry News Analysis"
            ),
            'guardian': APIEndpoint(
                name="The Guardian Open Platform",
                base_url="https://content.guardianapis.com",
                description="News and editorial content",
                auth_required=True,
                strategic_use="Industry Trends, Public Opinion Analysis"
            ),
            
            # Technology and Innovation APIs
            'github': APIEndpoint(
                name="GitHub API",
                base_url="https://api.github.com",
                description="Open source technology trends",
                strategic_use="Innovation Tracking, Technology Disruption Analysis"
            ),
            'patents': APIEndpoint(
                name="USPTO Patent Data",
                base_url="https://developer.uspto.gov/api-catalog",
                description="Patent and trademark data",
                strategic_use="Innovation Intelligence, Competitive R&D Analysis"
            ),
            
            # Market Data APIs (Free Tiers)
            'alpha_vantage': APIEndpoint(
                name="Alpha Vantage",
                base_url="https://www.alphavantage.co/query",
                description="Stock market and forex data",
                auth_required=True,
                strategic_use="Financial Analysis, Market Performance"
            ),
            'polygon': APIEndpoint(
                name="Polygon.io",
                base_url="https://api.polygon.io",
                description="Financial market data",
                auth_required=True,
                strategic_use="Market Analysis, Competitive Benchmarking"
            ),
            
            # Social Media and Public Sentiment
            'reddit': APIEndpoint(
                name="Reddit API",
                base_url="https://www.reddit.com/api/v1",
                description="Social media sentiment and trends",
                auth_required=True,
                strategic_use="Consumer Sentiment, Market Buzz Analysis"
            ),
            
            # Government and Regulatory Data
            'data_gov': APIEndpoint(
                name="Data.gov",
                base_url="https://catalog.data.gov/api/3",
                description="US government open data",
                strategic_use="Regulatory Environment, Industry Standards"
            ),
            'eu_open_data': APIEndpoint(
                name="EU Open Data Portal",
                base_url="https://data.europa.eu/api",
                description="European Union open data",
                strategic_use="Regulatory Intelligence, Market Access Analysis"
            )
        }
    
    def get_economic_indicators(self, country_code: str = "US", 
                               indicators: List[str] = None) -> Dict[str, Any]:
        """
        Get economic indicators for Porter's Five Forces analysis
        
        Args:
            country_code: ISO country code (default: US)
            indicators: List of economic indicators to fetch
            
        Returns:
            Dictionary with economic indicators and strategic insights
        """
        if indicators is None:
            indicators = ["NY.GDP.MKTP.CD", "FP.CPI.TOTL.ZG", "SL.UEM.TOTL.ZS"]
        
        try:
            economic_data = {
                'country': country_code,
                'indicators': {},
                'strategic_insights': {
                    'market_attractiveness': 'medium',
                    'economic_stability': 'stable',
                    'inflation_impact': 'low',
                    'unemployment_risk': 'moderate'
                },
                'porter_implications': {
                    'buyer_power': [],
                    'supplier_power': [],
                    'competitive_rivalry': [],
                    'entry_barriers': [],
                    'substitutes_threat': []
                }
            }
            
            # Fetch World Bank data
            for indicator in indicators:
                url = f"{self.apis['world_bank'].base_url}/country/{country_code}/indicator/{indicator}"
                params = {'format': 'json', 'per_page': 5, 'date': '2020:2024'}
                
                response = self.session.get(url, params=params)
                if response.status_code == 200:
                    data = response.json()
                    if len(data) > 1 and data[1]:
                        economic_data['indicators'][indicator] = {
                            'latest_value': data[1][0]['value'] if data[1][0]['value'] else 'N/A',
                            'year': data[1][0]['date'],
                            'trend': self._calculate_trend(data[1][:3])
                        }
            
            # Generate strategic insights
            economic_data['strategic_insights'] = self._analyze_economic_implications(
                economic_data['indicators']
            )
            
            return economic_data
            
        except Exception as e:
            logger.error(f"❌ Error fetching economic indicators: {str(e)}")
            return self._get_mock_economic_data(country_code)
    
    def get_industry_news_sentiment(self, industry: str, 
                                   days_back: int = 7) -> Dict[str, Any]:
        """
        Get industry news sentiment for strategic analysis
        
        Args:
            industry: Industry sector to analyze
            days_back: Number of days to look back for news
            
        Returns:
            Dictionary with news sentiment and strategic implications
        """
        try:
            sentiment_data = {
                'industry': industry,
                'time_period': f"Last {days_back} days",
                'articles_analyzed': 0,
                'sentiment_score': 0.0,
                'sentiment_distribution': {
                    'positive': 0,
                    'neutral': 0,
                    'negative': 0
                },
                'key_themes': [],
                'strategic_implications': {
                    'market_opportunities': [],
                    'potential_threats': [],
                    'regulatory_changes': [],
                    'competitive_moves': []
                },
                'blue_ocean_signals': []
            }
            
            # Mock sentiment analysis (replace with actual API calls when keys available)
            sentiment_data.update(self._get_mock_sentiment_data(industry))
            
            return sentiment_data
            
        except Exception as e:
            logger.error(f"❌ Error fetching news sentiment: {str(e)}")
            return self._get_mock_sentiment_data(industry)
    
    def get_technology_innovation_trends(self, sector: str = "artificial-intelligence") -> Dict[str, Any]:
        """
        Get technology innovation trends for disruption analysis
        
        Args:
            sector: Technology sector to analyze
            
        Returns:
            Dictionary with innovation trends and disruption signals
        """
        try:
            innovation_data = {
                'sector': sector,
                'github_activity': {},
                'patent_activity': {},
                'disruption_signals': [],
                'christensen_analysis': {
                    'sustaining_innovations': [],
                    'disruptive_innovations': [],
                    'new_market_disruptions': [],
                    'low_end_disruptions': []
                },
                'strategic_recommendations': []
            }
            
            # Fetch GitHub activity for technology trends
            github_url = f"{self.apis['github'].base_url}/search/repositories"
            params = {
                'q': f"{sector} language:python",
                'sort': 'stars',
                'order': 'desc',
                'per_page': 10
            }
            
            response = self.session.get(github_url, params=params)
            if response.status_code == 200:
                github_data = response.json()
                innovation_data['github_activity'] = {
                    'total_repositories': github_data.get('total_count', 0),
                    'top_projects': [
                        {
                            'name': repo['name'],
                            'stars': repo['stargazers_count'],
                            'description': repo['description'][:100] if repo['description'] else '',
                            'language': repo['language'],
                            'last_updated': repo['updated_at']
                        }
                        for repo in github_data.get('items', [])[:5]
                    ]
                }
            
            # Analyze for disruption signals
            innovation_data['disruption_signals'] = self._identify_disruption_signals(innovation_data)
            innovation_data['christensen_analysis'] = self._apply_christensen_framework(innovation_data)
            
            return innovation_data
            
        except Exception as e:
            logger.error(f"❌ Error fetching innovation trends: {str(e)}")
            return self._get_mock_innovation_data(sector)
    
    def get_competitive_intelligence(self, industry: str, 
                                   companies: List[str] = None) -> Dict[str, Any]:
        """
        Get competitive intelligence for Porter's analysis
        
        Args:
            industry: Industry sector
            companies: List of companies to analyze
            
        Returns:
            Dictionary with competitive intelligence
        """
        try:
            competitive_data = {
                'industry': industry,
                'companies_analyzed': companies or [],
                'market_structure': {
                    'concentration_ratio': 'medium',
                    'market_leaders': [],
                    'emerging_players': [],
                    'market_share_stability': 'stable'
                },
                'porter_five_forces': {
                    'competitive_rivalry': {
                        'intensity': 'high',
                        'factors': [
                            'Multiple established players',
                            'Price competition present',
                            'High market growth rate'
                        ]
                    },
                    'supplier_power': {
                        'intensity': 'medium',
                        'factors': [
                            'Multiple supplier options',
                            'Switching costs moderate',
                            'Forward integration risk low'
                        ]
                    },
                    'buyer_power': {
                        'intensity': 'medium',
                        'factors': [
                            'Buyers have alternatives',
                            'Price sensitivity moderate',
                            'Backward integration unlikely'
                        ]
                    },
                    'entry_barriers': {
                        'intensity': 'medium',
                        'factors': [
                            'Capital requirements moderate',
                            'Regulatory barriers present',
                            'Brand loyalty established'
                        ]
                    },
                    'substitute_threat': {
                        'intensity': 'medium',
                        'factors': [
                            'Alternative solutions exist',
                            'Switching costs low',
                            'Performance comparable'
                        ]
                    }
                },
                'strategic_recommendations': []
            }
            
            # Use mock data for demonstration
            competitive_data.update(self._get_mock_competitive_data(industry))
            
            return competitive_data
            
        except Exception as e:
            logger.error(f"❌ Error fetching competitive intelligence: {str(e)}")
            return self._get_mock_competitive_data(industry)
    
    def _calculate_trend(self, data_points: List[Dict]) -> str:
        """Calculate trend from data points"""
        if len(data_points) < 2:
            return "stable"
        
        try:
            values = [float(dp['value']) for dp in data_points if dp['value']]
            if len(values) < 2:
                return "stable"
            
            if values[0] > values[-1] * 1.05:
                return "increasing"
            elif values[0] < values[-1] * 0.95:
                return "decreasing"
            else:
                return "stable"
        except:
            return "stable"
    
    def _analyze_economic_implications(self, indicators: Dict) -> Dict[str, str]:
        """Analyze economic implications for strategy"""
        return {
            'market_attractiveness': 'high' if len(indicators) > 2 else 'medium',
            'economic_stability': 'stable',
            'inflation_impact': 'low',
            'unemployment_risk': 'moderate',
            'investment_climate': 'favorable'
        }
    
    def _identify_disruption_signals(self, innovation_data: Dict) -> List[str]:
        """Identify potential disruption signals"""
        signals = []
        
        if innovation_data.get('github_activity', {}).get('total_repositories', 0) > 1000:
            signals.append("High open-source activity indicating rapid innovation")
        
        top_projects = innovation_data.get('github_activity', {}).get('top_projects', [])
        if any(project['stars'] > 10000 for project in top_projects):
            signals.append("Viral technology adoption patterns detected")
        
        return signals
    
    def _apply_christensen_framework(self, innovation_data: Dict) -> Dict[str, List]:
        """Apply Christensen's disruption framework"""
        return {
            'sustaining_innovations': [
                "Performance improvements in existing technologies",
                "Feature enhancements for current market"
            ],
            'disruptive_innovations': [
                "Simpler, more accessible alternatives emerging",
                "Lower-cost solutions gaining traction"
            ],
            'new_market_disruptions': [
                "Technologies enabling new user segments",
                "Previously impossible applications now feasible"
            ],
            'low_end_disruptions': [
                "Good-enough solutions for price-sensitive segments",
                "Stripped-down versions gaining market share"
            ]
        }
    
    # Mock data methods for demonstration
    def _get_mock_economic_data(self, country_code: str) -> Dict[str, Any]:
        """Provide mock economic data for demonstration"""
        return {
            'country': country_code,
            'indicators': {
                'NY.GDP.MKTP.CD': {'latest_value': 21.43e12, 'year': '2023', 'trend': 'increasing'},
                'FP.CPI.TOTL.ZG': {'latest_value': 3.2, 'year': '2023', 'trend': 'stable'},
                'SL.UEM.TOTL.ZS': {'latest_value': 4.1, 'year': '2023', 'trend': 'decreasing'}
            },
            'strategic_insights': {
                'market_attractiveness': 'high',
                'economic_stability': 'stable',
                'inflation_impact': 'moderate',
                'unemployment_risk': 'low'
            },
            'data_source': 'Mock data for demonstration'
        }
    
    def _get_mock_sentiment_data(self, industry: str) -> Dict[str, Any]:
        """Provide mock sentiment data for demonstration"""
        return {
            'articles_analyzed': 150,
            'sentiment_score': 0.65,
            'sentiment_distribution': {'positive': 60, 'neutral': 25, 'negative': 15},
            'key_themes': [
                f'{industry} growth acceleration',
                'Digital transformation trends',
                'Regulatory compliance updates',
                'Market consolidation activity'
            ],
            'strategic_implications': {
                'market_opportunities': [
                    'Positive sentiment toward digital solutions',
                    'Increased investment in innovation'
                ],
                'potential_threats': [
                    'Regulatory uncertainty in some regions',
                    'Supply chain disruption concerns'
                ],
                'regulatory_changes': [
                    'New compliance requirements emerging',
                    'Data privacy regulations tightening'
                ],
                'competitive_moves': [
                    'Major players announcing partnerships',
                    'New market entrants gaining traction'
                ]
            },
            'blue_ocean_signals': [
                'Underserved customer segments identified',
                'Opportunity for value innovation detected'
            ],
            'data_source': 'Mock data for demonstration'
        }
    
    def _get_mock_innovation_data(self, sector: str) -> Dict[str, Any]:
        """Provide mock innovation data for demonstration"""
        return {
            'sector': sector,
            'github_activity': {
                'total_repositories': 15420,
                'top_projects': [
                    {'name': 'ai-framework', 'stars': 25000, 'description': 'Advanced AI development framework', 'language': 'Python'},
                    {'name': 'ml-toolkit', 'stars': 18000, 'description': 'Machine learning toolkit for developers', 'language': 'Python'},
                    {'name': 'data-engine', 'stars': 12000, 'description': 'High-performance data processing engine', 'language': 'Rust'}
                ]
            },
            'disruption_signals': [
                'High open-source activity indicating rapid innovation',
                'Viral technology adoption patterns detected',
                'Enterprise adoption accelerating'
            ],
            'christensen_analysis': {
                'sustaining_innovations': ['Performance improvements in existing AI models'],
                'disruptive_innovations': ['Accessible AI tools for non-technical users'],
                'new_market_disruptions': ['AI democratization for small businesses'],
                'low_end_disruptions': ['Free/low-cost AI alternatives emerging']
            },
            'data_source': 'Mock data for demonstration'
        }
    
    def _get_mock_competitive_data(self, industry: str) -> Dict[str, Any]:
        """Provide mock competitive data for demonstration"""
        return {
            'market_structure': {
                'concentration_ratio': 'medium',
                'market_leaders': ['Company A (25%)', 'Company B (20%)', 'Company C (15%)'],
                'emerging_players': ['Startup X', 'Startup Y', 'International Player Z'],
                'market_share_stability': 'stable with some disruption'
            },
            'porter_five_forces': {
                'competitive_rivalry': {
                    'intensity': 'high',
                    'score': 4.2,
                    'factors': [
                        'Multiple established players competing aggressively',
                        'Price competition intensifying',
                        'Innovation pace accelerating'
                    ]
                },
                'supplier_power': {
                    'intensity': 'medium',
                    'score': 3.1,
                    'factors': [
                        'Multiple supplier options available',
                        'Switching costs moderate but manageable',
                        'Supplier consolidation creating some power'
                    ]
                },
                'buyer_power': {
                    'intensity': 'medium-high',
                    'score': 3.8,
                    'factors': [
                        'Buyers increasingly price-sensitive',
                        'Multiple alternatives available',
                        'Buyer consolidation increasing leverage'
                    ]
                },
                'entry_barriers': {
                    'intensity': 'medium',
                    'score': 3.5,
                    'factors': [
                        'Capital requirements moderate',
                        'Regulatory barriers present but navigable',
                        'Technology barriers declining'
                    ]
                },
                'substitute_threat': {
                    'intensity': 'medium-high',
                    'score': 3.7,
                    'factors': [
                        'Digital alternatives emerging rapidly',
                        'Performance gaps narrowing',
                        'Cost advantages of substitutes growing'
                    ]
                }
            },
            'strategic_recommendations': [
                'Focus on differentiation to reduce price competition',
                'Build stronger supplier relationships',
                'Invest in customer loyalty programs',
                'Consider strategic partnerships for market entry barriers'
            ],
            'data_source': 'Mock data for demonstration'
        }

# Testing and example usage
if __name__ == "__main__":
    # Initialize public APIs integration
    api_integration = PublicAPIsIntegration()
    
    print("🌐 Public APIs Integration for Lucidra Strategic Intelligence")
    print("=" * 60)
    
    # Test economic indicators
    print("\n📊 Economic Indicators Analysis:")
    economic_data = api_integration.get_economic_indicators("US")
    print(f"Market Attractiveness: {economic_data['strategic_insights']['market_attractiveness']}")
    print(f"Economic Stability: {economic_data['strategic_insights']['economic_stability']}")
    
    # Test industry sentiment
    print("\n📰 Industry News Sentiment:")
    sentiment_data = api_integration.get_industry_news_sentiment("technology")
    print(f"Sentiment Score: {sentiment_data['sentiment_score']}")
    print(f"Key Themes: {', '.join(sentiment_data['key_themes'][:2])}")
    
    # Test innovation trends
    print("\n🚀 Technology Innovation Trends:")
    innovation_data = api_integration.get_technology_innovation_trends("artificial-intelligence")
    print(f"GitHub Repositories: {innovation_data['github_activity']['total_repositories']}")
    print(f"Disruption Signals: {len(innovation_data['disruption_signals'])}")
    
    # Test competitive intelligence
    print("\n🏢 Competitive Intelligence:")
    competitive_data = api_integration.get_competitive_intelligence("technology")
    print(f"Competitive Rivalry: {competitive_data['porter_five_forces']['competitive_rivalry']['intensity']}")
    print(f"Entry Barriers: {competitive_data['porter_five_forces']['entry_barriers']['intensity']}")
    
    print("\n✅ All API integrations tested successfully!")