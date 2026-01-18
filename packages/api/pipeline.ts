import { promptManager } from './prompt-manager';
import { geminiService } from './gemini';

export interface AIResult {
    title: string;
    content: string;
    vocabulary: any[];
    quiz: any[];
}

export class EditorialPipeline {
    async generateEditorial(interests: string[], news: string[], difficulty: string): Promise<AIResult> {
        // Stage 1: Topic Selection
        const topicPromptTemplate = await promptManager.getPrompt('TOPIC_SELECTION');
        const filledTopic = promptManager.fillTemplate(topicPromptTemplate, {
            interests: interests.join(', '),
            news: news.join('\n'),
        });
        const selected = await geminiService.generateJson(filledTopic);
        console.log('Stage 1: Selected Topic ->', selected.topic);

        // Stage 2: Generation
        const genPromptTemplate = await promptManager.getPrompt('GENERATE_BODY');
        const filledGen = promptManager.fillTemplate(genPromptTemplate, {
            topic: selected.topic,
            style: selected.style || 'Standard',
            difficulty: difficulty,
        });
        const bodyContent = await geminiService.generateJson(filledGen);
        console.log('Stage 2: Generated Content ->', bodyContent.title);

        // Stage 3: Extraction
        const extractPromptTemplate = await promptManager.getPrompt('EXTRACT_KEYWORDS');
        const filledExtract = promptManager.fillTemplate(extractPromptTemplate, {
            content: bodyContent.content,
        });
        const extraInfo = await geminiService.generateJson(filledExtract);
        console.log('Stage 3: Extracted Extras ->', extraInfo.vocabulary.length, 'words');

        return {
            title: bodyContent.title,
            content: bodyContent.content,
            vocabulary: extraInfo.vocabulary,
            quiz: extraInfo.quiz,
        };
    }
}

export const editorialPipeline = new EditorialPipeline();
