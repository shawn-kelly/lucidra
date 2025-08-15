"""
Kaggle Data Integration Module for Lucidra Strategic Intelligence Platform

This module provides access to Kaggle datasets for business intelligence, 
competitive analysis, and strategic framework validation.

Author: Claude Code
Date: August 14, 2025
"""

import os
import json
import pandas as pd
import logging
from typing import Dict, List, Optional, Any
from pathlib import Path

# Conditional Kaggle import to handle missing credentials gracefully
try:
    import kaggle
    from kaggle.api.kaggle_api_extended import KaggleApi
    KAGGLE_AVAILABLE = True
except Exception as e:
    KAGGLE_AVAILABLE = False
    logger = logging.getLogger(__name__)
    logger.warning(f"Kaggle API not available: {str(e)}")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class KaggleBusinessIntelligence:
    """
    Kaggle integration for business intelligence datasets
    """
    
    def __init__(self):
        """Initialize Kaggle API client"""
        self.authenticated = False
        if KAGGLE_AVAILABLE:
            self.api = KaggleApi()
            self.setup_authentication()
        else:
            self.api = None
            logger.warning("⚠️ Kaggle API not available - using mock data for demonstration")
        
    def setup_authentication(self) -> bool:
        """
        Set up Kaggle API authentication
        
        Returns:
            bool: True if authentication successful, False otherwise
        """
        if not KAGGLE_AVAILABLE:
            return False
            
        try:
            # Try to authenticate with Kaggle API
            self.api.authenticate()
            self.authenticated = True
            logger.info("✅ Kaggle API authentication successful")
            return True
            
        except Exception as e:
            logger.warning(f"⚠️ Kaggle API authentication failed: {str(e)}")
            logger.info("💡 To enable Kaggle integration:")
            logger.info("1. Go to https://www.kaggle.com/settings/account")
            logger.info("2. Create a new API token")
            logger.info("3. Download kaggle.json file")
            logger.info("4. Place it at ~/.kaggle/kaggle.json")
            logger.info("5. Set permissions: chmod 600 ~/.kaggle/kaggle.json")
            return False
    
    def search_business_datasets(self, query: str = "business strategy", 
                                max_size: int = 100000000) -> List[Dict]:
        """
        Search for business-related datasets on Kaggle
        
        Args:
            query: Search query for datasets
            max_size: Maximum dataset size in bytes (default 100MB)
            
        Returns:
            List of dataset information dictionaries
        """
        if not self.authenticated:
            return []
            
        try:
            # Search for datasets
            datasets = self.api.dataset_list(search=query, max_size=max_size)
            
            business_datasets = []
            for dataset in datasets[:10]:  # Limit to top 10 results
                dataset_info = {
                    'ref': dataset.ref,
                    'title': dataset.title,
                    'subtitle': dataset.subtitle,
                    'description': getattr(dataset, 'description', ''),
                    'size': dataset.totalBytes,
                    'download_count': dataset.downloadCount,
                    'vote_count': dataset.voteCount,
                    'created': str(dataset.createdDate),
                    'url': f"https://www.kaggle.com/datasets/{dataset.ref}"
                }
                business_datasets.append(dataset_info)
                
            logger.info(f"📊 Found {len(business_datasets)} business datasets")
            return business_datasets
            
        except Exception as e:
            logger.error(f"❌ Error searching datasets: {str(e)}")
            return []
    
    def get_competitive_analysis_datasets(self) -> List[Dict]:
        """
        Get datasets specifically for competitive analysis
        
        Returns:
            List of competitive analysis datasets
        """
        competitive_queries = [
            "competitive analysis",
            "market share",
            "industry analysis",
            "competitor data",
            "market research"
        ]
        
        all_datasets = []
        for query in competitive_queries:
            datasets = self.search_business_datasets(query, max_size=50000000)
            all_datasets.extend(datasets)
            
        # Remove duplicates based on dataset reference
        unique_datasets = {ds['ref']: ds for ds in all_datasets}.values()
        return list(unique_datasets)
    
    def get_industry_benchmarking_data(self) -> Dict[str, Any]:
        """
        Get industry benchmarking datasets for strategic framework validation
        
        Returns:
            Dictionary with industry benchmarking information
        """
        benchmark_queries = [
            "industry benchmarks",
            "financial ratios",
            "performance metrics",
            "industry kpi",
            "sector analysis"
        ]
        
        benchmark_data = {
            'datasets': [],
            'categories': [
                'Financial Performance',
                'Operational Efficiency', 
                'Market Position',
                'Innovation Metrics',
                'Customer Satisfaction'
            ],
            'last_updated': pd.Timestamp.now().isoformat()
        }
        
        for query in benchmark_queries:
            datasets = self.search_business_datasets(query, max_size=25000000)
            benchmark_data['datasets'].extend(datasets[:3])  # Top 3 per category
            
        return benchmark_data
    
    def download_dataset_sample(self, dataset_ref: str, 
                               download_path: str = "./kaggle_data") -> Optional[str]:
        """
        Download a sample of a Kaggle dataset
        
        Args:
            dataset_ref: Dataset reference (e.g., 'username/dataset-name')
            download_path: Path to download the dataset
            
        Returns:
            Path to downloaded dataset or None if failed
        """
        if not self.authenticated:
            logger.warning("⚠️ Kaggle API not authenticated")
            return None
            
        try:
            # Create download directory
            Path(download_path).mkdir(parents=True, exist_ok=True)
            
            # Download dataset
            self.api.dataset_download_files(dataset_ref, path=download_path, unzip=True)
            
            dataset_path = os.path.join(download_path, dataset_ref.split('/')[-1])
            logger.info(f"📥 Downloaded dataset to: {dataset_path}")
            return dataset_path
            
        except Exception as e:
            logger.error(f"❌ Error downloading dataset {dataset_ref}: {str(e)}")
            return None
    
    def analyze_dataset_for_strategy(self, dataset_path: str) -> Dict[str, Any]:
        """
        Analyze a dataset for strategic insights
        
        Args:
            dataset_path: Path to the dataset file
            
        Returns:
            Dictionary with strategic analysis insights
        """
        try:
            # Try to read common file formats
            file_path = Path(dataset_path)
            if not file_path.exists():
                # Look for CSV files in the directory
                csv_files = list(Path(dataset_path).glob("*.csv"))
                if csv_files:
                    file_path = csv_files[0]
                else:
                    return {'error': 'No readable files found'}
            
            # Read the dataset
            if file_path.suffix.lower() == '.csv':
                df = pd.read_csv(file_path)
            elif file_path.suffix.lower() in ['.xlsx', '.xls']:
                df = pd.read_excel(file_path)
            else:
                return {'error': f'Unsupported file format: {file_path.suffix}'}
            
            # Generate strategic insights
            insights = {
                'dataset_info': {
                    'shape': df.shape,
                    'columns': list(df.columns),
                    'data_types': df.dtypes.to_dict(),
                    'memory_usage': df.memory_usage(deep=True).sum()
                },
                'strategic_metrics': {
                    'total_records': len(df),
                    'unique_entities': df.nunique().to_dict(),
                    'completeness': (df.notna().sum() / len(df)).to_dict(),
                    'numerical_columns': df.select_dtypes(include='number').columns.tolist(),
                    'categorical_columns': df.select_dtypes(include='object').columns.tolist()
                },
                'porter_five_forces_relevance': self._assess_porter_relevance(df),
                'blue_ocean_opportunities': self._identify_blue_ocean_signals(df),
                'competitive_intelligence': self._extract_competitive_insights(df)
            }
            
            return insights
            
        except Exception as e:
            logger.error(f"❌ Error analyzing dataset: {str(e)}")
            return {'error': str(e)}
    
    def _assess_porter_relevance(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Assess dataset relevance to Porter's Five Forces framework"""
        porter_signals = {
            'competitive_rivalry': [],
            'supplier_power': [],
            'buyer_power': [],
            'threat_of_substitutes': [],
            'barriers_to_entry': []
        }
        
        # Look for relevant columns
        columns_lower = [col.lower() for col in df.columns]
        
        # Competitive rivalry indicators
        competitive_keywords = ['competitor', 'market_share', 'price', 'revenue', 'growth']
        porter_signals['competitive_rivalry'] = [col for col in df.columns 
                                               if any(kw in col.lower() for kw in competitive_keywords)]
        
        # Supplier power indicators
        supplier_keywords = ['supplier', 'vendor', 'cost', 'inventory', 'supply_chain']
        porter_signals['supplier_power'] = [col for col in df.columns 
                                          if any(kw in col.lower() for kw in supplier_keywords)]
        
        # Buyer power indicators
        buyer_keywords = ['customer', 'client', 'satisfaction', 'loyalty', 'retention']
        porter_signals['buyer_power'] = [col for col in df.columns 
                                       if any(kw in col.lower() for kw in buyer_keywords)]
        
        return porter_signals
    
    def _identify_blue_ocean_signals(self, df: pd.DataFrame) -> List[str]:
        """Identify potential Blue Ocean Strategy signals in dataset"""
        blue_ocean_signals = []
        
        # Look for innovation and differentiation indicators
        innovation_keywords = ['innovation', 'new', 'unique', 'differentiat', 'disrupt']
        for col in df.columns:
            if any(keyword in col.lower() for keyword in innovation_keywords):
                blue_ocean_signals.append(f"Innovation signal in column: {col}")
        
        # Look for underserved market segments
        if 'segment' in ' '.join(df.columns).lower():
            blue_ocean_signals.append("Market segmentation data available for Blue Ocean analysis")
            
        return blue_ocean_signals
    
    def _extract_competitive_insights(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Extract competitive intelligence from dataset"""
        insights = {
            'competitor_mentions': 0,
            'market_metrics': [],
            'performance_indicators': []
        }
        
        # Count competitor-related columns
        competitor_cols = [col for col in df.columns if 'competitor' in col.lower()]
        insights['competitor_mentions'] = len(competitor_cols)
        
        # Identify market metrics
        market_keywords = ['market', 'share', 'size', 'growth', 'penetration']
        insights['market_metrics'] = [col for col in df.columns 
                                    if any(kw in col.lower() for kw in market_keywords)]
        
        # Identify performance indicators
        performance_keywords = ['revenue', 'profit', 'roi', 'performance', 'efficiency']
        insights['performance_indicators'] = [col for col in df.columns 
                                            if any(kw in col.lower() for kw in performance_keywords)]
        
        return insights

# Mock data for demonstration when Kaggle API is not available
def get_mock_business_datasets() -> List[Dict]:
    """
    Provide mock business datasets for demonstration
    
    Returns:
        List of mock business datasets
    """
    return [
        {
            'ref': 'company-performance/fortune-500-analysis',
            'title': 'Fortune 500 Company Performance Analysis',
            'subtitle': 'Comprehensive analysis of Fortune 500 companies',
            'size': 15000000,
            'download_count': 2500,
            'vote_count': 180,
            'url': 'https://www.kaggle.com/datasets/company-performance/fortune-500-analysis',
            'strategic_relevance': 'Porter\'s Five Forces, Competitive Analysis'
        },
        {
            'ref': 'market-research/industry-benchmarks-2024',
            'title': 'Industry Benchmarks & KPIs 2024',
            'subtitle': 'Cross-industry performance benchmarks',
            'size': 8500000,
            'download_count': 1800,
            'vote_count': 145,
            'url': 'https://www.kaggle.com/datasets/market-research/industry-benchmarks-2024',
            'strategic_relevance': 'Resource-Based View, Performance Analysis'
        },
        {
            'ref': 'innovation-data/disruptive-technologies',
            'title': 'Disruptive Technology Adoption Patterns',
            'subtitle': 'Technology disruption and market transformation',
            'size': 12000000,
            'download_count': 3200,
            'vote_count': 220,
            'url': 'https://www.kaggle.com/datasets/innovation-data/disruptive-technologies',
            'strategic_relevance': 'Seeing What\'s Next, Blue Ocean Strategy'
        },
        {
            'ref': 'competitive-intel/market-share-dynamics',
            'title': 'Global Market Share Dynamics',
            'subtitle': 'Market share changes across industries',
            'size': 20000000,
            'download_count': 4100,
            'vote_count': 195,
            'url': 'https://www.kaggle.com/datasets/competitive-intel/market-share-dynamics',
            'strategic_relevance': 'Competitive Strategy, Market Analysis'
        }
    ]

# Example usage and testing
if __name__ == "__main__":
    # Initialize Kaggle integration
    kaggle_bi = KaggleBusinessIntelligence()
    
    if kaggle_bi.authenticated:
        print("🎉 Kaggle API is configured and ready!")
        
        # Search for business datasets
        datasets = kaggle_bi.search_business_datasets("business strategy")
        print(f"📊 Found {len(datasets)} business strategy datasets")
        
        # Get competitive analysis datasets
        competitive_datasets = kaggle_bi.get_competitive_analysis_datasets()
        print(f"🏢 Found {len(competitive_datasets)} competitive analysis datasets")
        
        # Get industry benchmarking data
        benchmark_data = kaggle_bi.get_industry_benchmarking_data()
        print(f"📈 Found {len(benchmark_data['datasets'])} benchmarking datasets")
        
    else:
        print("⚠️ Using mock data for demonstration")
        mock_datasets = get_mock_business_datasets()
        for dataset in mock_datasets:
            print(f"📄 {dataset['title']}: {dataset['strategic_relevance']}")