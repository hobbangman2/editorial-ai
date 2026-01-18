export type PromptFunction = 'TOPIC_SELECTION' | 'GENERATE_BODY' | 'EXTRACT_KEYWORDS';

export interface PromptTemplate {
    id: string;
    functionKey: PromptFunction;
    version: number;
    content: string;
    isActive: boolean;
}

/**
 * Default prompt templates (Initially managed as MD/Code, scalable to DB)
 */
export const DEFAULT_PROMPTS: Record<PromptFunction, string> = {
    TOPIC_SELECTION: `
Role: 시사 교육 전문가 및 뉴스 큐레이터
Task: 주어진 뉴스 리스트와 사용자의 관심사를 바탕으로, 중학생 문해력 향상에 가장 적합한 사설 주제 선정
User Interests: {{interests}}
Current News: {{news}}
Constraints:
- 교육적 가치가 높은 주제 우선
- 학생의 관심사와 뉴스 트렌드를 조화롭게 연결
Output: { "topic": "...", "reason": "...", "style": "..." }
  `.trim(),

    GENERATE_BODY: `
Role: 전문 논설위원 및 소셜 교육 전문가
Task: 선정된 주제로 중학생 수준의 사설 본문 작성
Topic: {{topic}}
Style Target: {{style}}
Difficulty: {{difficulty}}
Constraints:
- 서론/본론/결론의 논리적 구성
- 500자 내외의 분량
- 중립적이고 교육적인 어조
Output: { "title": "...", "content": "..." }
  `.trim(),

    EXTRACT_KEYWORDS: `
Role: 국어 교육 전문가
Task: 본문에서 학습할 핵심 어휘와 독해 퀴즈 추출
Content: {{content}}
Constraints:
- 핵심 어휘 3~5개 (단어, 뜻, 예문 포함)
- 본문 내용을 확인하는 객관식 퀴즈 1~2개
Output: { "vocabulary": [...], "quiz": [...] }
  `.trim(),
};
