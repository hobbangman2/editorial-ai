# System Architecture Design: editorial-ai

## 1. High-Level Architecture
서비스는 웹(React/Next.js)과 앱(iPad/Tablet) 모두를 지원하며, 공유되는 Backend API 레이어를 통해 데이터의 일관성을 유지합니다.

```mermaid
graph TD
    subgraph Client
        Web["Web Portal (Next.js)"]
        App["Tablet App (React Native/Expo)"]
        Admin["Admin Portal (Next.js)"]
    end

    subgraph API_Layer
        LB["Load Balancer"]
        Gateway["API Gateway / Node.js Server"]
    end

    subgraph AI_Pipeline
        NewsFetcher["News API Fetcher"]
        LLM["AI Engine (Gemini/OpenAI)"]
        PromptMgr["Prompt Manager"]
    end

    subgraph Storage
        DB[(PostgreSQL)]
        Cache[(Redis)]
        Storage[(Cloud Storage - TTS/Images)]
    end

    App <--> Gateway
    Web <--> Gateway
    Admin <--> Gateway
    Gateway <--> DB
    Gateway <--> Cache
    Gateway <--> AI_Pipeline
    NewsFetcher --> LLM
    LLM --> PromptMgr
    LLM --> Storage
```

## 2. Component Details

### 2.1 AI Editorial Engine Pipeline
1.  **News Fetching**: 실시간 뉴스 수집 및 가공.
2.  **Topic Selection**: (Prompt A) 수집된 뉴스 중 교육적 가치와 사용자 관심사가 높은 주제 선정.
3.  **Editorial Generation**: (Prompt B) 선정된 주제로 사설 본문 생성.
4.  **Keyword & Quiz Extraction**: (Prompt C) 생성된 본문에서 학습 요소(어휘, 퀴즈) 추출.
5.  **TTS Generation**: 오디오 변환 및 저장.

- **Prompt Management**: Admin Portal을 통해 DB에 저장된 각 스테이지별 프롬프트를 실시간 핫스와핑(Hot-swapping) 가능.

### 2.2 Sync & Notification Architecture
-   **Parent-Student Link**: 계정 간 연동 모델 (Link Token 기반).
-   **Push notifications**: FCM (Firebase Cloud Messaging)을 사용하여 앱 클라이언트에 실시간 퀘스트/완료 알림 전송.
-   **Web Sync**: WebSocket 또는 SSE를 통해 웹 화면의 실시간 상태 동기화.

## 3. Technology Stack
-   **Frontend**: Next.js (Web/Admin), React Native (App)
-   **Backend**: Node.js (NestJS or Express)
-   **Database**: PostgreSQL (Prisma ORM)
-   **AI**: Google Gemini Pro API / OpenAI GPT-4o
-   **Infra**: GCP (Compute Engine, Cloud Storage, Cloud Run)
-   **Auth**: NextAuth.js or Firebase Auth
