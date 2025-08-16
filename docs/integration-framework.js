/**
 * Lucidra Platform Integration Framework
 * Connects organizational data across all strategic frameworks
 * Author: Claude Code
 * Date: August 15, 2025
 */

class LucidraIntegrationFramework {
    constructor() {
        this.organizationData = [];
        this.userLevel = 'junior';
        this.frameworks = {
            porter: null,
            blueOcean: null,
            processManagement: null,
            missionGenerator: null,
            canvas: null,
            organizationalIntelligence: null
        };
        this.listeners = [];
        this.initialize();
    }

    // Initialize the integration framework
    initialize() {
        this.loadOrganizationData();
        this.setupEventListeners();
        this.initializeFrameworks();
        console.log('🚀 Lucidra Integration Framework initialized');
    }

    // Load organizational data from localStorage or API
    loadOrganizationData() {
        try {
            const stored = localStorage.getItem('lucidra_org_data');
            if (stored) {
                this.organizationData = JSON.parse(stored);
                console.log('📊 Loaded organization data:', this.organizationData.length, 'employees');
            } else {
                this.organizationData = this.getDefaultOrgData();
                this.saveOrganizationData();
            }
        } catch (error) {
            console.error('Error loading organization data:', error);
            this.organizationData = this.getDefaultOrgData();
        }
    }

    // Save organizational data to localStorage
    saveOrganizationData() {
        try {
            localStorage.setItem('lucidra_org_data', JSON.stringify(this.organizationData));
            console.log('💾 Organization data saved');
        } catch (error) {
            console.error('Error saving organization data:', error);
        }
    }

    // Get default organizational structure
    getDefaultOrgData() {
        return [
            {
                id: 1,
                name: "Sarah Johnson",
                title: "Chief Executive Officer",
                department: "Executive",
                level: "executive",
                reportsTo: null,
                email: "sarah.johnson@company.com",
                responsibilities: ["Strategic vision", "Board relations", "Organizational culture"],
                kpis: ["Revenue growth", "Market share", "Employee satisfaction"]
            },
            {
                id: 2,
                name: "Michael Chen",
                title: "VP Engineering",
                department: "Engineering",
                level: "senior",
                reportsTo: 1,
                email: "michael.chen@company.com",
                responsibilities: ["Technical strategy", "Team leadership", "Product delivery"],
                kpis: ["Development velocity", "Code quality", "Team retention"]
            },
            {
                id: 3,
                name: "Lisa Rodriguez",
                title: "VP Sales",
                department: "Sales",
                level: "senior",
                reportsTo: 1,
                email: "lisa.rodriguez@company.com",
                responsibilities: ["Sales strategy", "Revenue generation", "Customer relationships"],
                kpis: ["Sales targets", "Customer acquisition", "Deal closure rate"]
            },
            {
                id: 4,
                name: "David Kim",
                title: "Engineering Manager",
                department: "Engineering",
                level: "middle",
                reportsTo: 2,
                email: "david.kim@company.com",
                responsibilities: ["Team management", "Project delivery", "Technical mentoring"],
                kpis: ["Project completion", "Team productivity", "Code review quality"]
            },
            {
                id: 5,
                name: "Anna Thompson",
                title: "Senior Developer",
                department: "Engineering",
                level: "junior",
                reportsTo: 4,
                email: "anna.thompson@company.com",
                responsibilities: ["Feature development", "Code quality", "Team collaboration"],
                kpis: ["Feature delivery", "Bug reduction", "Code coverage"]
            }
        ];
    }

    // User level management
    setUserLevel(level) {
        this.userLevel = level;
        this.notifyFrameworks('userLevelChanged', { level });
        console.log(`👤 User level set to: ${level}`);
    }

    getUserView(level = this.userLevel) {
        const views = {
            junior: {
                visibility: ['immediate_team', 'direct_manager'],
                permissions: ['view_own_data', 'update_personal_info'],
                frameworks: ['mission_generator', 'canvas_personal']
            },
            middle: {
                visibility: ['department', 'direct_reports', 'peer_managers'],
                permissions: ['view_department', 'update_team_data', 'performance_reviews'],
                frameworks: ['porter_departmental', 'process_management', 'blue_ocean_team']
            },
            senior: {
                visibility: ['organization', 'all_departments', 'strategic_data'],
                permissions: ['view_all', 'update_strategic_data', 'approve_changes'],
                frameworks: ['porter_full', 'blue_ocean_strategic', 'organizational_design']
            },
            executive: {
                visibility: ['full_organization', 'board_metrics', 'strategic_insights'],
                permissions: ['full_access', 'approve_all', 'strategic_decisions'],
                frameworks: ['all_frameworks', 'executive_dashboard', 'strategic_planning']
            }
        };
        return views[level] || views.junior;
    }

    // Framework registration and notification
    registerFramework(name, framework) {
        this.frameworks[name] = framework;
        console.log(`🔗 Framework registered: ${name}`);
    }

    notifyFrameworks(event, data) {
        Object.keys(this.frameworks).forEach(name => {
            if (this.frameworks[name] && typeof this.frameworks[name].handleEvent === 'function') {
                try {
                    this.frameworks[name].handleEvent(event, data);
                } catch (error) {
                    console.error(`Error notifying framework ${name}:`, error);
                }
            }
        });
    }

    // Organizational data methods
    addEmployee(employee) {
        const newEmployee = {
            id: Date.now(),
            ...employee,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.organizationData.push(newEmployee);
        this.saveOrganizationData();
        this.notifyFrameworks('employeeAdded', newEmployee);
        return newEmployee;
    }

    updateEmployee(id, updates) {
        const index = this.organizationData.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.organizationData[index] = {
                ...this.organizationData[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveOrganizationData();
            this.notifyFrameworks('employeeUpdated', this.organizationData[index]);
            return this.organizationData[index];
        }
        return null;
    }

    removeEmployee(id) {
        const index = this.organizationData.findIndex(emp => emp.id === id);
        if (index !== -1) {
            const removed = this.organizationData.splice(index, 1)[0];
            this.saveOrganizationData();
            this.notifyFrameworks('employeeRemoved', removed);
            return removed;
        }
        return null;
    }

    getEmployeesByLevel(level) {
        return this.organizationData.filter(emp => emp.level === level);
    }

    getEmployeesByDepartment(department) {
        return this.organizationData.filter(emp => emp.department === department);
    }

    getDepartments() {
        return [...new Set(this.organizationData.map(emp => emp.department))];
    }

    getOrganizationHierarchy() {
        const hierarchy = {};
        const lookup = {};

        // Create lookup table
        this.organizationData.forEach(emp => {
            lookup[emp.id] = { ...emp, children: [] };
        });

        // Build hierarchy
        this.organizationData.forEach(emp => {
            if (emp.reportsTo === null) {
                hierarchy[emp.id] = lookup[emp.id];
            } else if (lookup[emp.reportsTo]) {
                lookup[emp.reportsTo].children.push(lookup[emp.id]);
            }
        });

        return hierarchy;
    }

    // Strategic framework integrations
    getPorterAnalysisData() {
        return {
            competitiveRivalry: this.calculateCompetitiveRivalry(),
            supplierPower: this.calculateSupplierPower(),
            buyerPower: this.calculateBuyerPower(),
            entryBarriers: this.calculateEntryBarriers(),
            substituteThreat: this.calculateSubstituteThreat(),
            organizationalContext: this.getOrganizationalContext()
        };
    }

    calculateCompetitiveRivalry() {
        const salesTeamSize = this.getEmployeesByDepartment('Sales').length;
        const marketingTeamSize = this.getEmployeesByDepartment('Marketing').length;
        const competitiveCapacity = (salesTeamSize + marketingTeamSize) / this.organizationData.length;
        
        return {
            intensity: competitiveCapacity > 0.3 ? 'High' : competitiveCapacity > 0.15 ? 'Medium' : 'Low',
            score: Math.min(5, competitiveCapacity * 10),
            factors: [
                `Sales team: ${salesTeamSize} members`,
                `Marketing team: ${marketingTeamSize} members`,
                `Competitive capacity: ${(competitiveCapacity * 100).toFixed(1)}%`
            ]
        };
    }

    calculateSupplierPower() {
        const procurementTeam = this.organizationData.filter(emp => 
            emp.title.toLowerCase().includes('procurement') || 
            emp.title.toLowerCase().includes('supply') ||
            emp.department === 'Operations'
        ).length;
        
        return {
            intensity: procurementTeam > 5 ? 'Low' : procurementTeam > 2 ? 'Medium' : 'High',
            score: Math.max(1, 5 - procurementTeam * 0.5),
            factors: [
                `Procurement team: ${procurementTeam} members`,
                `Supply chain management: ${procurementTeam > 0 ? 'Present' : 'Limited'}`
            ]
        };
    }

    calculateBuyerPower() {
        const customerFacingRoles = this.organizationData.filter(emp =>
            emp.department === 'Sales' || 
            emp.department === 'Customer Success' ||
            emp.department === 'Support'
        ).length;
        
        return {
            intensity: customerFacingRoles > 10 ? 'Low' : customerFacingRoles > 5 ? 'Medium' : 'High',
            score: Math.max(1, 5 - customerFacingRoles * 0.2),
            factors: [
                `Customer-facing team: ${customerFacingRoles} members`,
                `Customer relationship strength: ${customerFacingRoles > 5 ? 'Strong' : 'Developing'}`
            ]
        };
    }

    calculateEntryBarriers() {
        const techTeamSize = this.getEmployeesByDepartment('Engineering').length;
        const rdTeamSize = this.organizationData.filter(emp => 
            emp.title.toLowerCase().includes('research') || 
            emp.title.toLowerCase().includes('innovation')
        ).length;
        
        const technicalBarrier = (techTeamSize + rdTeamSize) / this.organizationData.length;
        
        return {
            intensity: technicalBarrier > 0.4 ? 'High' : technicalBarrier > 0.2 ? 'Medium' : 'Low',
            score: Math.min(5, technicalBarrier * 10),
            factors: [
                `Technical team: ${techTeamSize} members`,
                `R&D capability: ${rdTeamSize} specialists`,
                `Technical barrier: ${(technicalBarrier * 100).toFixed(1)}%`
            ]
        };
    }

    calculateSubstituteThreat() {
        const innovationCapacity = this.organizationData.filter(emp =>
            emp.responsibilities && emp.responsibilities.some(r => 
                r.toLowerCase().includes('innovation') || 
                r.toLowerCase().includes('product development')
            )
        ).length;
        
        return {
            intensity: innovationCapacity > 5 ? 'Low' : innovationCapacity > 2 ? 'Medium' : 'High',
            score: Math.max(1, 5 - innovationCapacity * 0.3),
            factors: [
                `Innovation capacity: ${innovationCapacity} roles`,
                `Product development: ${innovationCapacity > 0 ? 'Active' : 'Limited'}`
            ]
        };
    }

    getOrganizationalContext() {
        return {
            totalEmployees: this.organizationData.length,
            departments: this.getDepartments(),
            managementLevels: [...new Set(this.organizationData.map(emp => emp.level))],
            avgTeamSize: this.calculateAvgTeamSize(),
            organizationalComplexity: this.calculateOrganizationalComplexity()
        };
    }

    calculateAvgTeamSize() {
        const managers = this.organizationData.filter(emp => 
            emp.level === 'middle' || emp.level === 'senior'
        );
        
        if (managers.length === 0) return 0;
        
        const totalDirectReports = managers.reduce((sum, manager) => {
            const directReports = this.organizationData.filter(emp => emp.reportsTo === manager.id);
            return sum + directReports.length;
        }, 0);
        
        return totalDirectReports / managers.length;
    }

    calculateOrganizationalComplexity() {
        const departments = this.getDepartments().length;
        const levels = [...new Set(this.organizationData.map(emp => emp.level))].length;
        const employeeCount = this.organizationData.length;
        
        return (departments * levels * Math.log(employeeCount + 1)) / 10;
    }

    // Blue Ocean Strategy integration
    getBlueOceanOpportunities() {
        const underrepresentedDepartments = this.identifyUnderrepresentedAreas();
        const skillGaps = this.identifySkillGaps();
        const innovationOpportunities = this.identifyInnovationOpportunities();
        
        return {
            organizationalGaps: underrepresentedDepartments,
            skillOpportunities: skillGaps,
            innovationAreas: innovationOpportunities,
            strategicRecommendations: this.generateBlueOceanRecommendations()
        };
    }

    identifyUnderrepresentedAreas() {
        const deptSizes = {};
        this.organizationData.forEach(emp => {
            deptSizes[emp.department] = (deptSizes[emp.department] || 0) + 1;
        });
        
        const avgDeptSize = Object.values(deptSizes).reduce((a, b) => a + b, 0) / Object.keys(deptSizes).length;
        
        return Object.entries(deptSizes)
            .filter(([dept, size]) => size < avgDeptSize * 0.7)
            .map(([dept, size]) => ({
                department: dept,
                currentSize: size,
                opportunity: `Expand ${dept} team for better market coverage`
            }));
    }

    identifySkillGaps() {
        const requiredSkills = ['AI/ML', 'Data Science', 'Digital Marketing', 'UX/UI', 'Cybersecurity'];
        const currentSkills = new Set();
        
        this.organizationData.forEach(emp => {
            if (emp.title) {
                requiredSkills.forEach(skill => {
                    if (emp.title.toLowerCase().includes(skill.toLowerCase())) {
                        currentSkills.add(skill);
                    }
                });
            }
        });
        
        return requiredSkills
            .filter(skill => !currentSkills.has(skill))
            .map(skill => ({
                skill,
                opportunity: `Hire ${skill} specialist for competitive advantage`
            }));
    }

    identifyInnovationOpportunities() {
        const innovationRoles = this.organizationData.filter(emp =>
            emp.responsibilities && emp.responsibilities.some(r =>
                r.toLowerCase().includes('innovation') ||
                r.toLowerCase().includes('research') ||
                r.toLowerCase().includes('development')
            )
        );
        
        if (innovationRoles.length < this.organizationData.length * 0.1) {
            return [
                {
                    area: 'Innovation Team',
                    opportunity: 'Create dedicated innovation team for disruptive thinking'
                },
                {
                    area: 'R&D Investment',
                    opportunity: 'Increase R&D capacity to 10% of workforce'
                }
            ];
        }
        
        return [
            {
                area: 'Innovation Process',
                opportunity: 'Optimize existing innovation processes for better output'
            }
        ];
    }

    generateBlueOceanRecommendations() {
        const recommendations = [
            'Create cross-functional innovation teams',
            'Implement employee-driven innovation programs',
            'Establish customer co-creation initiatives',
            'Develop strategic partnerships for capability expansion'
        ];
        
        return recommendations;
    }

    // Process Management integration
    getProcessManagementData() {
        return {
            organizationalProcesses: this.mapOrganizationalProcesses(),
            roleResponsibilities: this.getRoleResponsibilities(),
            communicationFlows: this.getCommunicationFlows(),
            decisionMakingPaths: this.getDecisionMakingPaths()
        };
    }

    mapOrganizationalProcesses() {
        const processes = {
            'Hiring Process': {
                owner: this.organizationData.find(emp => emp.department === 'HR')?.name || 'HR Team',
                stakeholders: ['Hiring Manager', 'HR', 'Team Lead'],
                steps: ['Job Posting', 'Resume Review', 'Interviews', 'Decision', 'Onboarding']
            },
            'Performance Review': {
                owner: this.organizationData.find(emp => emp.level === 'senior')?.name || 'Management',
                stakeholders: ['Employee', 'Manager', 'HR'],
                steps: ['Self Assessment', 'Manager Review', 'Goal Setting', 'Development Plan']
            },
            'Project Delivery': {
                owner: this.organizationData.find(emp => emp.title.includes('Manager'))?.name || 'Project Manager',
                stakeholders: ['Team Members', 'Stakeholders', 'Quality Assurance'],
                steps: ['Planning', 'Development', 'Testing', 'Deployment', 'Review']
            }
        };
        
        return processes;
    }

    getRoleResponsibilities() {
        return this.organizationData.map(emp => ({
            name: emp.name,
            title: emp.title,
            department: emp.department,
            responsibilities: emp.responsibilities || [],
            kpis: emp.kpis || []
        }));
    }

    getCommunicationFlows() {
        const hierarchy = this.getOrganizationHierarchy();
        const flows = [];
        
        this.organizationData.forEach(emp => {
            if (emp.reportsTo) {
                const manager = this.organizationData.find(m => m.id === emp.reportsTo);
                if (manager) {
                    flows.push({
                        from: emp.name,
                        to: manager.name,
                        type: 'reporting',
                        frequency: 'weekly'
                    });
                }
            }
        });
        
        return flows;
    }

    getDecisionMakingPaths() {
        const levels = {
            executive: { authority: 'Strategic decisions', approval_limit: 'Unlimited' },
            senior: { authority: 'Departmental decisions', approval_limit: '$100K+' },
            middle: { authority: 'Team decisions', approval_limit: '$25K+' },
            junior: { authority: 'Task decisions', approval_limit: '$5K+' }
        };
        
        return this.organizationData.map(emp => ({
            name: emp.name,
            level: emp.level,
            authority: levels[emp.level]?.authority || 'Limited',
            approvalLimit: levels[emp.level]?.approval_limit || '$1K'
        }));
    }

    // Event handling
    setupEventListeners() {
        // Listen for storage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'lucidra_org_data') {
                this.loadOrganizationData();
                this.notifyFrameworks('dataRefreshed', this.organizationData);
            }
        });
        
        // Listen for user level changes
        document.addEventListener('userLevelChanged', (e) => {
            this.setUserLevel(e.detail.level);
        });
    }

    // Utility methods
    exportData(format = 'json') {
        const data = {
            organizationData: this.organizationData,
            metadata: {
                exportDate: new Date().toISOString(),
                totalEmployees: this.organizationData.length,
                departments: this.getDepartments(),
                version: '1.0'
            }
        };
        
        switch (format) {
            case 'json':
                return JSON.stringify(data, null, 2);
            case 'csv':
                return this.convertToCSV(this.organizationData);
            default:
                return data;
        }
    }

    convertToCSV(data) {
        const headers = ['id', 'name', 'title', 'department', 'level', 'reportsTo', 'email'];
        const csvContent = [
            headers.join(','),
            ...data.map(emp => headers.map(h => emp[h] || '').join(','))
        ].join('\n');
        
        return csvContent;
    }

    importData(data, format = 'json') {
        try {
            let importedData;
            
            if (format === 'json') {
                importedData = typeof data === 'string' ? JSON.parse(data) : data;
                if (importedData.organizationData) {
                    importedData = importedData.organizationData;
                }
            } else if (format === 'csv') {
                importedData = this.parseCSV(data);
            }
            
            if (Array.isArray(importedData)) {
                this.organizationData = importedData.map(emp => ({
                    ...emp,
                    id: emp.id || Date.now() + Math.random(),
                    importedAt: new Date().toISOString()
                }));
                this.saveOrganizationData();
                this.notifyFrameworks('dataImported', this.organizationData);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Import error:', error);
            return false;
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',');
                const item = {};
                headers.forEach((header, index) => {
                    item[header.trim()] = values[index]?.trim();
                });
                data.push(item);
            }
        }
        
        return data;
    }

    // Analytics and reporting
    getAnalytics() {
        return {
            organization: this.getOrganizationalAnalytics(),
            strategic: this.getStrategicAnalytics(),
            performance: this.getPerformanceAnalytics()
        };
    }

    getOrganizationalAnalytics() {
        const deptDistribution = {};
        const levelDistribution = {};
        
        this.organizationData.forEach(emp => {
            deptDistribution[emp.department] = (deptDistribution[emp.department] || 0) + 1;
            levelDistribution[emp.level] = (levelDistribution[emp.level] || 0) + 1;
        });
        
        return {
            totalEmployees: this.organizationData.length,
            departmentDistribution: deptDistribution,
            levelDistribution: levelDistribution,
            avgTeamSize: this.calculateAvgTeamSize(),
            spanOfControl: this.calculateSpanOfControl(),
            organizationalDepth: this.calculateOrganizationalDepth()
        };
    }

    calculateSpanOfControl() {
        const managers = this.organizationData.filter(emp => 
            this.organizationData.some(subordinate => subordinate.reportsTo === emp.id)
        );
        
        if (managers.length === 0) return 0;
        
        const totalReports = managers.reduce((sum, manager) => {
            const directReports = this.organizationData.filter(emp => emp.reportsTo === manager.id);
            return sum + directReports.length;
        }, 0);
        
        return totalReports / managers.length;
    }

    calculateOrganizationalDepth() {
        const findDepth = (empId, depth = 0) => {
            const subordinates = this.organizationData.filter(emp => emp.reportsTo === empId);
            if (subordinates.length === 0) return depth;
            
            return Math.max(...subordinates.map(sub => findDepth(sub.id, depth + 1)));
        };
        
        const topLevel = this.organizationData.filter(emp => emp.reportsTo === null);
        return Math.max(...topLevel.map(emp => findDepth(emp.id, 1)));
    }

    getStrategicAnalytics() {
        return {
            porterMetrics: this.getPorterAnalysisData(),
            blueOceanOpportunities: this.getBlueOceanOpportunities(),
            innovationCapacity: this.calculateInnovationCapacity(),
            competitiveReadiness: this.calculateCompetitiveReadiness()
        };
    }

    calculateInnovationCapacity() {
        const innovators = this.organizationData.filter(emp =>
            emp.responsibilities && emp.responsibilities.some(r =>
                r.toLowerCase().includes('innovation') ||
                r.toLowerCase().includes('research') ||
                r.toLowerCase().includes('development')
            )
        );
        
        return {
            count: innovators.length,
            percentage: (innovators.length / this.organizationData.length) * 100,
            capacity: innovators.length > this.organizationData.length * 0.1 ? 'High' : 'Moderate'
        };
    }

    calculateCompetitiveReadiness() {
        const factors = {
            salesCapacity: this.getEmployeesByDepartment('Sales').length / this.organizationData.length,
            techCapacity: this.getEmployeesByDepartment('Engineering').length / this.organizationData.length,
            innovationCapacity: this.calculateInnovationCapacity().percentage / 100,
            managementEfficiency: this.calculateSpanOfControl() <= 7 ? 1 : 0.5
        };
        
        const score = Object.values(factors).reduce((a, b) => a + b, 0) / Object.keys(factors).length;
        
        return {
            score: score * 100,
            level: score > 0.7 ? 'High' : score > 0.4 ? 'Medium' : 'Low',
            factors
        };
    }

    getPerformanceAnalytics() {
        return {
            kpiCoverage: this.calculateKPICoverage(),
            responsibilityCoverage: this.calculateResponsibilityCoverage(),
            organizationalHealth: this.calculateOrganizationalHealth()
        };
    }

    calculateKPICoverage() {
        const employeesWithKPIs = this.organizationData.filter(emp => 
            emp.kpis && emp.kpis.length > 0
        );
        
        return {
            coverage: (employeesWithKPIs.length / this.organizationData.length) * 100,
            totalKPIs: employeesWithKPIs.reduce((sum, emp) => sum + emp.kpis.length, 0),
            avgKPIsPerEmployee: employeesWithKPIs.length > 0 ? 
                employeesWithKPIs.reduce((sum, emp) => sum + emp.kpis.length, 0) / employeesWithKPIs.length : 0
        };
    }

    calculateResponsibilityCoverage() {
        const employeesWithResponsibilities = this.organizationData.filter(emp =>
            emp.responsibilities && emp.responsibilities.length > 0
        );
        
        return {
            coverage: (employeesWithResponsibilities.length / this.organizationData.length) * 100,
            totalResponsibilities: employeesWithResponsibilities.reduce((sum, emp) => sum + emp.responsibilities.length, 0),
            avgResponsibilitiesPerEmployee: employeesWithResponsibilities.length > 0 ?
                employeesWithResponsibilities.reduce((sum, emp) => sum + emp.responsibilities.length, 0) / employeesWithResponsibilities.length : 0
        };
    }

    calculateOrganizationalHealth() {
        const metrics = {
            spanOfControl: this.calculateSpanOfControl(),
            organizationalDepth: this.calculateOrganizationalDepth(),
            kpiCoverage: this.calculateKPICoverage().coverage,
            responsibilityCoverage: this.calculateResponsibilityCoverage().coverage
        };
        
        const healthScore = (
            (metrics.spanOfControl <= 7 ? 25 : 0) +
            (metrics.organizationalDepth <= 6 ? 25 : 0) +
            (metrics.kpiCoverage * 0.25) +
            (metrics.responsibilityCoverage * 0.25)
        );
        
        return {
            score: healthScore,
            level: healthScore > 80 ? 'Excellent' : healthScore > 60 ? 'Good' : healthScore > 40 ? 'Fair' : 'Needs Improvement',
            metrics
        };
    }
}

// Global instance
window.LucidraIntegration = new LucidraIntegrationFramework();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LucidraIntegrationFramework;
}