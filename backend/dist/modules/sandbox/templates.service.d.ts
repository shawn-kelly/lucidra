import { SandboxTemplate } from './sandbox.service';
export declare const SANDBOX_TEMPLATES: SandboxTemplate[];
export declare class TemplatesService {
    static getAllTemplates(): SandboxTemplate[];
    static getTemplateById(id: string): SandboxTemplate | null;
    static getTemplatesByCategory(category: string): SandboxTemplate[];
    static getTemplatesByDifficulty(difficulty: string): SandboxTemplate[];
}
//# sourceMappingURL=templates.service.d.ts.map