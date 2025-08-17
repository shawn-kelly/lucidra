/**
 * Lucidra Real-Time Financial Engine v1.0
 * Live financial statement generation with scenario modeling
 * Supports Balance Sheet, P&L, Cash Flow with multi-format export
 */

class RealTimeFinancialEngine {
    constructor() {
        this.financialData = new Map();
        this.scenarioModels = new Map();
        this.updateListeners = new Set();
        this.exportFormats = ['json', 'excel', 'pdf', 'word'];
        this.calculationEngine = new FinancialCalculationEngine();
        this.scenarioEngine = new ScenarioModelingEngine();
        
        this.initializeDefaultScenarios();
        console.log('📊 Real-Time Financial Engine initialized');
    }

    // Initialize default scenario models
    initializeDefaultScenarios() {
        this.scenarioModels.set('current', {
            id: 'current',
            name: 'Current State',
            type: 'baseline',
            multipliers: { revenue: 1.0, expenses: 1.0, growth: 0.0 },
            active: true
        });

        this.scenarioModels.set('optimistic', {
            id: 'optimistic',
            name: 'Optimistic Growth',
            type: 'growth',
            multipliers: { revenue: 1.2, expenses: 1.05, growth: 0.15 },
            active: false
        });

        this.scenarioModels.set('pessimistic', {
            id: 'pessimistic',
            name: 'Conservative',
            type: 'conservative',
            multipliers: { revenue: 0.85, expenses: 1.1, growth: -0.05 },
            active: false
        });

        this.scenarioModels.set('expansion', {
            id: 'expansion',
            name: 'Market Expansion',
            type: 'strategic',
            multipliers: { revenue: 1.5, expenses: 1.3, growth: 0.25 },
            active: false
        });
    }

    // Update financial data and trigger real-time updates
    updateFinancialData(organizationId, data) {
        if (!this.financialData.has(organizationId)) {
            this.financialData.set(organizationId, {
                raw_data: {},
                processed_data: {},
                last_updated: null,
                data_source: null
            });
        }

        const orgData = this.financialData.get(organizationId);
        orgData.raw_data = data;
        orgData.last_updated = new Date();
        orgData.data_source = data.metadata?.source || 'unknown';

        // Process and normalize data
        orgData.processed_data = this.processFinancialData(data);

        // Trigger real-time updates
        this.notifyListeners(organizationId, 'data_updated', orgData.processed_data);

        console.log(`📈 Financial data updated for organization ${organizationId}`);
    }

    // Process raw financial data into standardized format
    processFinancialData(rawData) {
        return {
            balance_sheet: this.processBalanceSheet(rawData.balance_sheet || {}),
            income_statement: this.processIncomeStatement(rawData.income_statement || {}),
            cash_flow: this.processCashFlow(rawData.cash_flow || {}),
            chart_of_accounts: rawData.chart_of_accounts || [],
            metadata: {
                processed_at: new Date(),
                source: rawData.metadata?.source,
                quality_score: rawData.metadata?.data_quality?.score || 100
            }
        };
    }

    // Generate real-time Balance Sheet
    async generateBalanceSheet(organizationId, scenarioId = 'current', options = {}) {
        const orgData = this.getOrganizationData(organizationId);
        if (!orgData) {
            throw new Error(`No financial data found for organization ${organizationId}`);
        }

        const scenario = this.scenarioModels.get(scenarioId);
        if (!scenario) {
            throw new Error(`Scenario ${scenarioId} not found`);
        }

        const baseData = orgData.processed_data.balance_sheet;
        const asOfDate = options.asOfDate || new Date();

        const balanceSheet = {
            header: {
                organization_id: organizationId,
                statement_type: 'Balance Sheet',
                as_of_date: asOfDate.toISOString(),
                scenario: scenario.name,
                generated_at: new Date().toISOString(),
                currency: options.currency || 'USD'
            },
            assets: {
                current_assets: {
                    cash_and_equivalents: this.applyScenario(baseData.assets?.current_assets?.cash || 0, scenario, 'cash'),
                    accounts_receivable: this.applyScenario(baseData.assets?.current_assets?.accounts_receivable || 0, scenario, 'receivables'),
                    inventory: this.applyScenario(baseData.assets?.current_assets?.inventory || 0, scenario, 'inventory'),
                    prepaid_expenses: this.applyScenario(baseData.assets?.current_assets?.other_current || 0, scenario, 'prepaid'),
                    other_current_assets: this.applyScenario(baseData.assets?.current_assets?.other_current || 0, scenario, 'other_current')
                },
                non_current_assets: {
                    property_plant_equipment: this.applyScenario(baseData.assets?.fixed_assets?.property_plant_equipment || 0, scenario, 'ppe'),
                    accumulated_depreciation: this.applyScenario(baseData.assets?.fixed_assets?.accumulated_depreciation || 0, scenario, 'depreciation'),
                    intangible_assets: this.applyScenario(baseData.assets?.fixed_assets?.other_fixed || 0, scenario, 'intangible'),
                    investments: this.applyScenario(0, scenario, 'investments'),
                    other_non_current_assets: this.applyScenario(baseData.assets?.fixed_assets?.other_fixed || 0, scenario, 'other_non_current')
                }
            },
            liabilities: {
                current_liabilities: {
                    accounts_payable: this.applyScenario(baseData.liabilities?.current_liabilities?.accounts_payable || 0, scenario, 'payables'),
                    short_term_debt: this.applyScenario(baseData.liabilities?.current_liabilities?.short_term_debt || 0, scenario, 'short_debt'),
                    accrued_expenses: this.applyScenario(baseData.liabilities?.current_liabilities?.accrued_expenses || 0, scenario, 'accrued'),
                    current_portion_long_term_debt: this.applyScenario(0, scenario, 'current_ltd'),
                    other_current_liabilities: this.applyScenario(baseData.liabilities?.current_liabilities?.other_current || 0, scenario, 'other_current_liab')
                },
                non_current_liabilities: {
                    long_term_debt: this.applyScenario(baseData.liabilities?.long_term_liabilities?.long_term_debt || 0, scenario, 'long_debt'),
                    deferred_tax_liabilities: this.applyScenario(0, scenario, 'deferred_tax'),
                    other_non_current_liabilities: this.applyScenario(baseData.liabilities?.long_term_liabilities?.other_long_term || 0, scenario, 'other_non_current_liab')
                }
            },
            equity: {
                share_capital: this.applyScenario(baseData.equity?.owner_equity || 0, scenario, 'capital'),
                retained_earnings: this.applyScenario(baseData.equity?.retained_earnings || 0, scenario, 'retained'),
                other_comprehensive_income: this.applyScenario(0, scenario, 'oci'),
                treasury_stock: this.applyScenario(0, scenario, 'treasury'),
                other_equity: this.applyScenario(baseData.equity?.other_equity || 0, scenario, 'other_equity')
            }
        };

        // Calculate totals
        balanceSheet.assets.total_current_assets = this.sumObject(balanceSheet.assets.current_assets);
        balanceSheet.assets.total_non_current_assets = this.sumObject(balanceSheet.assets.non_current_assets);
        balanceSheet.assets.total_assets = balanceSheet.assets.total_current_assets + balanceSheet.assets.total_non_current_assets;

        balanceSheet.liabilities.total_current_liabilities = this.sumObject(balanceSheet.liabilities.current_liabilities);
        balanceSheet.liabilities.total_non_current_liabilities = this.sumObject(balanceSheet.liabilities.non_current_liabilities);
        balanceSheet.liabilities.total_liabilities = balanceSheet.liabilities.total_current_liabilities + balanceSheet.liabilities.total_non_current_liabilities;

        balanceSheet.equity.total_equity = this.sumObject(balanceSheet.equity);

        balanceSheet.total_liabilities_and_equity = balanceSheet.liabilities.total_liabilities + balanceSheet.equity.total_equity;

        // Add analysis
        balanceSheet.analysis = this.analyzeBalanceSheet(balanceSheet);

        return balanceSheet;
    }

    // Generate real-time Income Statement
    async generateIncomeStatement(organizationId, scenarioId = 'current', options = {}) {
        const orgData = this.getOrganizationData(organizationId);
        if (!orgData) {
            throw new Error(`No financial data found for organization ${organizationId}`);
        }

        const scenario = this.scenarioModels.get(scenarioId);
        const baseData = orgData.processed_data.income_statement;
        const { startDate, endDate } = options.dateRange || this.getDefaultDateRange();

        const incomeStatement = {
            header: {
                organization_id: organizationId,
                statement_type: 'Income Statement',
                period: {
                    start_date: startDate.toISOString(),
                    end_date: endDate.toISOString()
                },
                scenario: scenario.name,
                generated_at: new Date().toISOString(),
                currency: options.currency || 'USD'
            },
            revenue: {
                gross_revenue: this.applyScenario(baseData.revenue?.gross_revenue || 0, scenario, 'revenue'),
                sales_returns_allowances: this.applyScenario(baseData.revenue?.returns_allowances || 0, scenario, 'returns'),
                net_revenue: 0 // Calculated below
            },
            cost_of_goods_sold: {
                materials: this.applyScenario(baseData.cost_of_goods_sold?.materials || 0, scenario, 'materials'),
                direct_labor: this.applyScenario(baseData.cost_of_goods_sold?.labor || 0, scenario, 'labor'),
                manufacturing_overhead: this.applyScenario(baseData.cost_of_goods_sold?.overhead || 0, scenario, 'overhead'),
                total_cogs: 0 // Calculated below
            },
            operating_expenses: {
                salaries_and_wages: this.applyScenario(baseData.operating_expenses?.salaries_wages || 0, scenario, 'salaries'),
                rent_and_utilities: this.applyScenario(baseData.operating_expenses?.rent || 0, scenario, 'rent'),
                marketing_and_advertising: this.applyScenario(baseData.operating_expenses?.marketing || 0, scenario, 'marketing'),
                depreciation_and_amortization: this.applyScenario(0, scenario, 'depreciation'),
                professional_services: this.applyScenario(0, scenario, 'professional'),
                insurance: this.applyScenario(0, scenario, 'insurance'),
                other_operating_expenses: this.applyScenario(baseData.operating_expenses?.other_operating || 0, scenario, 'other_op_exp'),
                total_operating_expenses: 0 // Calculated below
            },
            other_income_expenses: {
                interest_income: this.applyScenario(baseData.other_income_expenses?.interest_income || 0, scenario, 'interest_income'),
                interest_expense: this.applyScenario(baseData.other_income_expenses?.interest_expense || 0, scenario, 'interest_expense'),
                gain_loss_on_investments: this.applyScenario(0, scenario, 'investment_gains'),
                other_income: this.applyScenario(baseData.other_income_expenses?.other || 0, scenario, 'other_income'),
                total_other_income: 0 // Calculated below
            }
        };

        // Calculate totals and derived figures
        incomeStatement.revenue.net_revenue = incomeStatement.revenue.gross_revenue - incomeStatement.revenue.sales_returns_allowances;
        
        incomeStatement.cost_of_goods_sold.total_cogs = this.sumObject(incomeStatement.cost_of_goods_sold, ['total_cogs']);
        
        incomeStatement.operating_expenses.total_operating_expenses = this.sumObject(incomeStatement.operating_expenses, ['total_operating_expenses']);
        
        incomeStatement.other_income_expenses.total_other_income = 
            incomeStatement.other_income_expenses.interest_income +
            incomeStatement.other_income_expenses.gain_loss_on_investments +
            incomeStatement.other_income_expenses.other_income -
            incomeStatement.other_income_expenses.interest_expense;

        // Calculate key profitability metrics
        incomeStatement.profitability = {
            gross_profit: incomeStatement.revenue.net_revenue - incomeStatement.cost_of_goods_sold.total_cogs,
            operating_income: 0, // Calculated below
            earnings_before_tax: 0, // Calculated below
            income_tax_expense: 0, // Calculated below
            net_income: 0 // Calculated below
        };

        incomeStatement.profitability.operating_income = 
            incomeStatement.profitability.gross_profit - incomeStatement.operating_expenses.total_operating_expenses;
        
        incomeStatement.profitability.earnings_before_tax = 
            incomeStatement.profitability.operating_income + incomeStatement.other_income_expenses.total_other_income;
        
        // Simplified tax calculation (override with actual tax logic)
        incomeStatement.profitability.income_tax_expense = 
            Math.max(0, incomeStatement.profitability.earnings_before_tax * (options.taxRate || 0.25));
        
        incomeStatement.profitability.net_income = 
            incomeStatement.profitability.earnings_before_tax - incomeStatement.profitability.income_tax_expense;

        // Add financial ratios and analysis
        incomeStatement.analysis = this.analyzeIncomeStatement(incomeStatement);

        return incomeStatement;
    }

    // Generate real-time Cash Flow Statement
    async generateCashFlow(organizationId, scenarioId = 'current', options = {}) {
        const orgData = this.getOrganizationData(organizationId);
        if (!orgData) {
            throw new Error(`No financial data found for organization ${organizationId}`);
        }

        const scenario = this.scenarioModels.get(scenarioId);
        const baseData = orgData.processed_data.cash_flow;
        const { startDate, endDate } = options.dateRange || this.getDefaultDateRange();

        // Get net income from income statement for cash flow calculation
        const incomeStatement = await this.generateIncomeStatement(organizationId, scenarioId, options);
        const netIncome = incomeStatement.profitability.net_income;

        const cashFlow = {
            header: {
                organization_id: organizationId,
                statement_type: 'Cash Flow Statement',
                period: {
                    start_date: startDate.toISOString(),
                    end_date: endDate.toISOString()
                },
                scenario: scenario.name,
                generated_at: new Date().toISOString(),
                currency: options.currency || 'USD'
            },
            operating_activities: {
                net_income: netIncome,
                depreciation_amortization: this.applyScenario(baseData.operating_activities?.depreciation || 0, scenario, 'depreciation'),
                changes_in_working_capital: {
                    accounts_receivable_change: this.applyScenario(baseData.operating_activities?.changes_working_capital || 0, scenario, 'ar_change'),
                    inventory_change: this.applyScenario(0, scenario, 'inventory_change'),
                    accounts_payable_change: this.applyScenario(0, scenario, 'ap_change'),
                    accrued_expenses_change: this.applyScenario(0, scenario, 'accrued_change'),
                    total_working_capital_change: 0 // Calculated below
                },
                other_operating_activities: this.applyScenario(baseData.operating_activities?.other_operating || 0, scenario, 'other_operating'),
                net_cash_from_operating: 0 // Calculated below
            },
            investing_activities: {
                capital_expenditures: this.applyScenario(baseData.investing_activities?.capital_expenditures || 0, scenario, 'capex'),
                acquisition_of_investments: this.applyScenario(baseData.investing_activities?.investments || 0, scenario, 'investments'),
                proceeds_from_asset_sales: this.applyScenario(0, scenario, 'asset_sales'),
                other_investing_activities: this.applyScenario(baseData.investing_activities?.other_investing || 0, scenario, 'other_investing'),
                net_cash_from_investing: 0 // Calculated below
            },
            financing_activities: {
                proceeds_from_debt: this.applyScenario(baseData.financing_activities?.debt_proceeds || 0, scenario, 'debt_proceeds'),
                debt_repayments: this.applyScenario(baseData.financing_activities?.debt_payments || 0, scenario, 'debt_payments'),
                proceeds_from_equity: this.applyScenario(baseData.financing_activities?.equity_proceeds || 0, scenario, 'equity_proceeds'),
                dividends_paid: this.applyScenario(baseData.financing_activities?.dividends_paid || 0, scenario, 'dividends'),
                other_financing_activities: this.applyScenario(baseData.financing_activities?.other_financing || 0, scenario, 'other_financing'),
                net_cash_from_financing: 0 // Calculated below
            }
        };

        // Calculate totals
        cashFlow.operating_activities.changes_in_working_capital.total_working_capital_change = 
            this.sumObject(cashFlow.operating_activities.changes_in_working_capital, ['total_working_capital_change']);

        cashFlow.operating_activities.net_cash_from_operating = 
            cashFlow.operating_activities.net_income +
            cashFlow.operating_activities.depreciation_amortization +
            cashFlow.operating_activities.changes_in_working_capital.total_working_capital_change +
            cashFlow.operating_activities.other_operating_activities;

        cashFlow.investing_activities.net_cash_from_investing = 
            -cashFlow.investing_activities.capital_expenditures -
            cashFlow.investing_activities.acquisition_of_investments +
            cashFlow.investing_activities.proceeds_from_asset_sales +
            cashFlow.investing_activities.other_investing_activities;

        cashFlow.financing_activities.net_cash_from_financing = 
            cashFlow.financing_activities.proceeds_from_debt -
            cashFlow.financing_activities.debt_repayments +
            cashFlow.financing_activities.proceeds_from_equity -
            cashFlow.financing_activities.dividends_paid +
            cashFlow.financing_activities.other_financing_activities;

        // Calculate net change in cash
        cashFlow.summary = {
            net_cash_from_operating: cashFlow.operating_activities.net_cash_from_operating,
            net_cash_from_investing: cashFlow.investing_activities.net_cash_from_investing,
            net_cash_from_financing: cashFlow.financing_activities.net_cash_from_financing,
            net_increase_in_cash: 0,
            cash_beginning_of_period: this.applyScenario(0, scenario, 'beginning_cash'),
            cash_end_of_period: 0
        };

        cashFlow.summary.net_increase_in_cash = 
            cashFlow.summary.net_cash_from_operating +
            cashFlow.summary.net_cash_from_investing +
            cashFlow.summary.net_cash_from_financing;

        cashFlow.summary.cash_end_of_period = 
            cashFlow.summary.cash_beginning_of_period + cashFlow.summary.net_increase_in_cash;

        // Add analysis
        cashFlow.analysis = this.analyzeCashFlow(cashFlow);

        return cashFlow;
    }

    // Apply scenario adjustments to financial data
    applyScenario(baseValue, scenario, itemType) {
        if (!scenario || !baseValue) return baseValue;

        let multiplier = 1.0;
        
        // Apply different multipliers based on item type and scenario
        switch (itemType) {
            case 'revenue':
                multiplier = scenario.multipliers.revenue;
                break;
            case 'expenses':
            case 'salaries':
            case 'rent':
            case 'marketing':
                multiplier = scenario.multipliers.expenses;
                break;
            case 'growth':
                return baseValue * (1 + scenario.multipliers.growth);
            default:
                multiplier = 1.0;
        }

        return Math.round(baseValue * multiplier);
    }

    // Analyze Balance Sheet
    analyzeBalanceSheet(balanceSheet) {
        const assets = balanceSheet.assets;
        const liabilities = balanceSheet.liabilities;
        const equity = balanceSheet.equity;

        return {
            ratios: {
                current_ratio: assets.total_current_assets / liabilities.total_current_liabilities || 0,
                quick_ratio: (assets.current_assets.cash_and_equivalents + assets.current_assets.accounts_receivable) / liabilities.total_current_liabilities || 0,
                debt_to_equity: liabilities.total_liabilities / equity.total_equity || 0,
                debt_ratio: liabilities.total_liabilities / assets.total_assets || 0,
                equity_ratio: equity.total_equity / assets.total_assets || 0
            },
            insights: this.generateBalanceSheetInsights(balanceSheet),
            health_score: this.calculateFinancialHealthScore(balanceSheet)
        };
    }

    // Analyze Income Statement
    analyzeIncomeStatement(incomeStatement) {
        const revenue = incomeStatement.revenue.net_revenue;
        const cogs = incomeStatement.cost_of_goods_sold.total_cogs;
        const grossProfit = incomeStatement.profitability.gross_profit;
        const operatingIncome = incomeStatement.profitability.operating_income;
        const netIncome = incomeStatement.profitability.net_income;

        return {
            margins: {
                gross_margin: revenue ? (grossProfit / revenue) * 100 : 0,
                operating_margin: revenue ? (operatingIncome / revenue) * 100 : 0,
                net_margin: revenue ? (netIncome / revenue) * 100 : 0
            },
            growth_rates: {
                // Would calculate from historical data in real implementation
                revenue_growth: 0,
                profit_growth: 0
            },
            cost_analysis: {
                cogs_percentage: revenue ? (cogs / revenue) * 100 : 0,
                operating_expense_percentage: revenue ? (incomeStatement.operating_expenses.total_operating_expenses / revenue) * 100 : 0
            },
            insights: this.generateIncomeStatementInsights(incomeStatement),
            performance_score: this.calculatePerformanceScore(incomeStatement)
        };
    }

    // Analyze Cash Flow
    analyzeCashFlow(cashFlow) {
        const operating = cashFlow.operating_activities.net_cash_from_operating;
        const investing = cashFlow.investing_activities.net_cash_from_investing;
        const financing = cashFlow.financing_activities.net_cash_from_financing;

        return {
            cash_conversion: {
                operating_cash_ratio: operating / Math.abs(investing) || 0,
                free_cash_flow: operating + investing,
                cash_flow_coverage: operating / Math.abs(financing) || 0
            },
            insights: this.generateCashFlowInsights(cashFlow),
            liquidity_score: this.calculateLiquidityScore(cashFlow)
        };
    }

    // Generate statement in specified format
    async generateStatement(organizationId, statementType, scenarioId = 'current', options = {}) {
        switch (statementType) {
            case 'balance_sheet':
                return await this.generateBalanceSheet(organizationId, scenarioId, options);
            case 'income_statement':
                return await this.generateIncomeStatement(organizationId, scenarioId, options);
            case 'cash_flow':
                return await this.generateCashFlow(organizationId, scenarioId, options);
            default:
                throw new Error(`Unsupported statement type: ${statementType}`);
        }
    }

    // Create new scenario
    createScenario(scenarioData) {
        const scenario = {
            id: scenarioData.id || `scenario_${Date.now()}`,
            name: scenarioData.name,
            type: scenarioData.type || 'custom',
            multipliers: scenarioData.multipliers || { revenue: 1.0, expenses: 1.0, growth: 0.0 },
            active: scenarioData.active || false,
            created_at: new Date()
        };

        this.scenarioModels.set(scenario.id, scenario);
        return scenario;
    }

    // Register update listener
    addUpdateListener(listener) {
        this.updateListeners.add(listener);
    }

    // Remove update listener
    removeUpdateListener(listener) {
        this.updateListeners.delete(listener);
    }

    // Notify all listeners of updates
    notifyListeners(organizationId, eventType, data) {
        this.updateListeners.forEach(listener => {
            try {
                listener(organizationId, eventType, data);
            } catch (error) {
                console.error('Error in update listener:', error);
            }
        });
    }

    // Helper methods
    getOrganizationData(organizationId) {
        return this.financialData.get(organizationId);
    }

    processBalanceSheet(data) {
        return data; // Simplified - implement full processing logic
    }

    processIncomeStatement(data) {
        return data; // Simplified - implement full processing logic
    }

    processCashFlow(data) {
        return data; // Simplified - implement full processing logic
    }

    sumObject(obj, excludeKeys = []) {
        return Object.entries(obj)
            .filter(([key]) => !excludeKeys.includes(key))
            .reduce((sum, [key, value]) => sum + (typeof value === 'number' ? value : 0), 0);
    }

    getDefaultDateRange() {
        const endDate = new Date();
        const startDate = new Date(endDate.getFullYear(), 0, 1); // Beginning of current year
        return { startDate, endDate };
    }

    // Placeholder methods for analysis (implement full logic)
    generateBalanceSheetInsights(balanceSheet) {
        return ['Balance sheet analysis insights would be generated here'];
    }

    generateIncomeStatementInsights(incomeStatement) {
        return ['Income statement analysis insights would be generated here'];
    }

    generateCashFlowInsights(cashFlow) {
        return ['Cash flow analysis insights would be generated here'];
    }

    calculateFinancialHealthScore(balanceSheet) {
        return 85; // Simplified scoring
    }

    calculatePerformanceScore(incomeStatement) {
        return 80; // Simplified scoring
    }

    calculateLiquidityScore(cashFlow) {
        return 75; // Simplified scoring
    }
}

// Financial Calculation Engine
class FinancialCalculationEngine {
    constructor() {
        this.calculationCache = new Map();
    }

    calculateRatio(numerator, denominator, defaultValue = 0) {
        return denominator !== 0 ? numerator / denominator : defaultValue;
    }

    calculatePercentage(part, whole, decimals = 2) {
        const percentage = whole !== 0 ? (part / whole) * 100 : 0;
        return Math.round(percentage * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    calculateGrowthRate(currentValue, previousValue) {
        return previousValue !== 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
    }
}

// Scenario Modeling Engine
class ScenarioModelingEngine {
    constructor() {
        this.scenarioTemplates = this.initializeScenarioTemplates();
    }

    initializeScenarioTemplates() {
        return {
            growth: {
                revenue: { min: 1.05, max: 1.5 },
                expenses: { min: 1.02, max: 1.2 },
                assets: { min: 1.1, max: 1.3 }
            },
            contraction: {
                revenue: { min: 0.7, max: 0.95 },
                expenses: { min: 0.9, max: 1.1 },
                assets: { min: 0.95, max: 1.05 }
            },
            transformation: {
                revenue: { min: 0.8, max: 1.8 },
                expenses: { min: 1.1, max: 1.4 },
                assets: { min: 1.2, max: 2.0 }
            }
        };
    }

    generateScenarioFromTemplate(templateType, customizations = {}) {
        const template = this.scenarioTemplates[templateType];
        if (!template) {
            throw new Error(`Scenario template ${templateType} not found`);
        }

        return {
            revenue: customizations.revenue || this.getRandomValue(template.revenue),
            expenses: customizations.expenses || this.getRandomValue(template.expenses),
            assets: customizations.assets || this.getRandomValue(template.assets)
        };
    }

    getRandomValue(range) {
        return Math.random() * (range.max - range.min) + range.min;
    }
}

// Global instance
window.RealTimeFinancialEngine = RealTimeFinancialEngine;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RealTimeFinancialEngine,
        FinancialCalculationEngine,
        ScenarioModelingEngine
    };
}

console.log('📊 Real-Time Financial Engine loaded successfully');