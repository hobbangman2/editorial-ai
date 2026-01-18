import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-1.5-flash for speed and reliability in extraction/generation tasks
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });
    }

    async generateJson(prompt: string): Promise<any> {
        try {
            const result = await this.model.generateContent(prompt);
            const text = result.response.text();
            return JSON.parse(text);
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw new Error('Failed to generate content from AI');
        }
    }
}

// Singleton instance managed by environment variable
export const geminiService = new GeminiService(process.env.GEMINI_API_KEY || '');
