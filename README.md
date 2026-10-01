# ContentCrew — AI Agentic Marketing Platform (Phase 1, Phase 2 & Phase 3 Complete)

**ContentCrew** is an Agentic AI marketing and content platform that turns market research, competitor benchmarking, and search intent analysis into publish-ready technical articles.

---

## Architecture Overview

```text
USER (Marketing Workspace)
   │
   ▼
POST /api/chat
   │
   ▼
Supervisor Agent (Orchestrator & Execution Planner)
   │
   ▼
Analysis Agent (Intelligence & Market Research Specialist)
   ├── Google Search Tool (Live web search queries)
   ├── Web Scraper Tool (Extracts public competitor headings & content)
   ├── Keyword Analysis Tool (Search intent & keyword clusters)
   └── Competitor Analysis Tool (Structural gap benchmarking)
   │
   ▼
HUMAN APPROVAL CHECKPOINT 1 (Research & Content Strategy Gate)
   │
   ▼ [Approved]
Generation Agent (Content Authoring & SEO Specialist)
   ├── Technical Blog Outline Builder
   ├── Full Markdown Article Generation
   └── SEO Readability Optimization Check
   │
   ▼
HUMAN APPROVAL CHECKPOINT 2 (Dynamic Editor Review Gate)
   │
   ▼ [Approved]
Publishing Tool (One-Click CMS & Database Persistence)
   │
   ▼
Published Article (Public /blogs page & GET /api/blog/<id>)
```

---

## Implemented Scope

### Phase 1: Frontend Foundation
- **Landing Page**: Hero section, CTA, workflow explanation (`Research → Analyze → Approve → Generate → Review → Publish`), value proposition cards.
- **Blogs Page**: Public-facing listing of published technical articles with search & category filters and reader overlay modal.
- **Three-Column Marketing Workspace**:
  - **Left Panel (Marketing Context)**: Persistent company profile, competitor entries, research intelligence summary.
  - **Center Panel (Chat & Agent Activity)**: Conversation stream, Supervisor execution plan, Analysis Agent tool cards (Google Search, Web Scraper, Keyword Analysis, Competitor Analysis), and Human-in-the-Loop approval cards.
  - **Right Panel (Dynamic Blog Editor)**: Markdown editor, SEO score breakdown, title/content editing, and publish authorization.

### Phase 2: Application Foundation, Onboarding & Backend Integration
- **Flask REST API Backend**: Organized modular backend with Blueprints (`health`, `context`, `chat`, `status`, `approval`, `blog`).
- **User Onboarding Flow**: Multi-step wizard collecting Company Profile, Target Audience personas, Industry, Products, and Competitors (`POST /api/context`).
- **Context Management**: Workspace left panel includes an "Edit" control allowing returning users to modify company context or add/remove competitors at any time.
- **Lightweight SQLite Persistence**: Database (`data/contentcrew.db`) storing `marketing_context`, `competitors`, `workspace_sessions`, `approvals`, and `blogs`.

### Phase 3: Agentic AI System & LangGraph Workflow
- **GroqCloud LLM Integration (`backend/llm/provider.py`)**: OpenAI-compatible GroqCloud LLM client targeting `openai/gpt-oss-120b` with bounded retries and JSON response parsing.
- **LangGraph StateGraph Engine (`backend/graph/workflow.py`)**: Stateful workflow graph (`WorkflowState`) orchestrating task planning, intelligence tool executions, human approval checkpoints, draft generation, and publishing.
- **Specialized AI Agents (`backend/agents/`)**:
  - `SupervisorAgent`: Analyzes user prompts and company profile to generate structured 6-step execution plans.
  - `AnalysisAgent`: Coordinates Google Search, Web Scraper, Keyword Analysis, and Competitor Analysis tools to produce a synthesized research summary.
  - `GenerationAgent`: Authors complete technical articles in Markdown adhering to approved research, company brand tone, and target keywords.
- **Tools (`backend/tools/`)**:
  - `execute_google_search`: Real live search query execution returning structured titles, URLs, and snippets.
  - `execute_web_scraper`: Web scraper extracting section headings, text, and word counts with 10s timeout and injection defense.
  - `execute_keyword_analysis`: Computes target keyword clusters, search intent, and relevance scores.
  - `execute_competitor_analysis`: Benchmarks competitor headings and identifies content coverage gaps.
  - `execute_publish_blog`: Enforces `content_approved == True` before saving published articles to SQLite.
- **Prompt Injection Defense (`backend/utils/security.py`)**: All scraped external webpage content is encapsulated within strict boundary tags (`--- BEGIN UNTRUSTED DATA ---`) instructing agents to treat it as reference data only.

---

## Environment Setup & Configuration

Ensure `.env` contains:

```env
FLASK_APP=app.py
FLASK_ENV=development
PORT=5000
DATABASE_PATH=data/contentcrew.db
SECRET_KEY=contentcrew-dev-secret-key-2026

# GrokCloud API Configuration
LLM_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
```

---

## Running the Application Locally

### 1. Start the Flask Backend Server

```bash
python app.py
```
The Flask backend will run at: `http://127.0.0.1:5000`

### 2. Start the Vite Frontend Development Server

In a second terminal window:

```bash
npm run dev
```
The Vite frontend will run at: `http://localhost:3000`

---

## Testing the End-to-End Workflow

You can run the end-to-end workflow verification script:

```bash
python scratch/test_phase3_workflow.py
```

### Expected Output:
1. `GET /health` -> 200 OK
2. `POST /api/chat` -> 200 OK (Supervisor plan created, Analysis Agent executed Google Search, Web Scraper, Keyword Analysis, and Competitor Analysis tools, graph paused at Human Checkpoint 1).
3. `POST /api/approval/research` -> 200 OK (Research strategy approved, Generation Agent authored technical blog draft, graph paused at Human Checkpoint 2).
4. `POST /api/approval/content` -> 200 OK (Content draft approved, Publish Tool saved article to SQLite database).
5. `GET /api/blogs` -> 200 OK (Published article listed on Blogs page).
