# Data Schema & AI Prompts: editorial-ai

## 1. Database Schema (ERD Logic)

### `as_users` (User Management)
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `role`: Enum (STUDENT, PARENT, ADMIN)
- `linked_user_id`: UUID (Self-reference)
- `nickname`: String
- `avatar_emoji`: String (or `avatar_url`)
- `bio`: String (one-liner)
- `learning_goals`: String
- `interests`: JSONB (e.g., `["NewJeans", "Gaming"]`)
- `preferred_newspapers`: JSONB (e.g., `["The Guardian", "Naver News"]`)
- `created_at`: Timestamp

### `as_likes` (Social Interaction)
- `user_id`: UUID (FK)
- `editorial_id`: UUID (FK)
- `created_at`: Timestamp (Primary key: `user_id`, `editorial_id`)

### `as_comments` (Social Interaction)
- `id`: UUID (Primary Key)
- `user_id`: UUID (FK)
- `editorial_id`: UUID (FK)
- `content`: Text
- `created_at`: Timestamp

### `as_editorials` (AI Generated Content)
- `id`: UUID (Primary Key)
- `title`: String
- `content`: Text
- `difficulty`: Enum (LEVEL_1, LEVEL_2, LEVEL_3)
- `style`: String (e.g., "The Guardian", "Friendly")
- `news_source_url`: String
- `keywords`: JSONB (Vocabulary list)
- `audio_url`: String (TTS path)

### `as_learning_logs` (Tracking)
- `id`: UUID
- `student_id`: UUID (FK)
- `editorial_id`: UUID (FK)
- `mode`: Enum (PENCIL, KEYBOARD)
- `error_count`: Integer
- `completion_status`: Enum (STARTED, COMPLETED)
- `completed_at`: Timestamp

### `as_quests` (Rewards)
- `id`: UUID
- `parent_id`: UUID (FK)
- `student_id`: UUID (FK)
- `title`: String
- `target_count`: Integer
- `reward_description`: String
- `status`: Enum (ACTIVE, FINISHED, REWARDED)

### `as_prompts` (Prompt Management)
- `id`: UUID (Primary Key)
- `function_key`: String (e.g., `TOPIC_SELECTION`, `GENERATE_BODY`, `EXTRACT_KEYWORDS`)
- `version`: Integer
- `content`: Text (Template string with variables)
- `is_active`: Boolean
- `updated_by`: UUID (Admin FK)
- `updated_at`: Timestamp

### `as_ads` (Monetization Tracking)
- `id`: UUID (Primary Key)
- `placement`: String (e.g., `MAIN_BANNER`, `POST_LEARNING`)
- `image_url`: String
- `target_url`: String
- `view_count`: Integer
- `click_count`: Integer

## 2. AI Prompt Templates

### 사설 생성 프롬프트 (Editorial Generation)
```text
Role: 전문 논설위원 및 소셜 교육 전문가
Task: 최신 뉴스를 바탕으로 중학생 수준에 맞는 500자 내외의 사설 작성
Constraints:
- 논리적 3단 구성 (서론, 본론, 결론)
- 어려운 한자어나 시사용어는 별도 설명 포함
- 중립적인 논조 유지
- [관심 키워드]를 자연스럽게 문맥에 녹여낼 것
Output JSON Format:
{
  "title": "...",
  "content": "...",
  "vocabulary": [{"word": "...", "meaning": "..."}],
  "quiz": [{"question": "...", "answer": "..."}]
}
```
