import { PromptFunction, DEFAULT_PROMPTS } from './prompts';

export interface PromptManager {
    getPrompt(key: PromptFunction): Promise<string>;
}

export class SimplePromptManager implements PromptManager {
    async getPrompt(key: PromptFunction): Promise<string> {
        // In the future, this will fetch from DB (as_prompts)
        return DEFAULT_PROMPTS[key];
    }

    fillTemplate(template: string, variables: Record<string, string>): string {
        let filled = template;
        for (const [key, value] of Object.entries(variables)) {
            filled = filled.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
        return filled;
    }
}

export const promptManager = new SimplePromptManager();
