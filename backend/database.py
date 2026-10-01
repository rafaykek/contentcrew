import os
import sqlite3
import json
from datetime import datetime
from backend.config import Config
from backend.utils.logger import logger

def get_db_connection():
    db_path = Config.DB_PATH
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    logger.info(f"Initializing database at: {Config.DB_PATH}")
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Marketing Context table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS marketing_context (
            id INTEGER PRIMARY KEY DEFAULT 1,
            company_name TEXT NOT NULL,
            description TEXT,
            industry TEXT,
            target_audience TEXT,
            products_services TEXT,
            brand_tone TEXT,
            onboarding_completed INTEGER DEFAULT 1,
            updated_at TEXT
        );
    ''')

    # 2. Competitors table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS competitors (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            url TEXT,
            focus_area TEXT,
            top_articles TEXT,
            last_scraped TEXT,
            created_at TEXT
        );
    ''')

    # 3. Workspace Sessions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS workspace_sessions (
            session_id TEXT PRIMARY KEY,
            user_request TEXT,
            workflow_status TEXT DEFAULT 'idle',
            current_agent TEXT,
            current_node TEXT,
            approval_required INTEGER DEFAULT 0,
            created_at TEXT,
            updated_at TEXT
        );
    ''')

    # 4. Approvals table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS approvals (
            id TEXT PRIMARY KEY,
            session_id TEXT,
            approval_type TEXT NOT NULL,
            decision TEXT NOT NULL,
            payload TEXT,
            created_at TEXT
        );
    ''')

    # 5. Blogs table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS blogs (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT,
            subtitle TEXT,
            excerpt TEXT,
            category TEXT,
            read_time TEXT,
            author TEXT,
            seo_keywords TEXT,
            readability_score TEXT,
            content TEXT NOT NULL,
            status TEXT DEFAULT 'published',
            created_at TEXT,
            updated_at TEXT,
            published_at TEXT
        );
    ''')

    conn.commit()

    # Seed default data if database is brand new
    cursor.execute('SELECT COUNT(*) as count FROM marketing_context')
    if cursor.fetchone()['count'] == 0:
        logger.info("Seeding initial company context and sample blogs into SQLite...")
        seed_initial_data(conn)

    conn.close()

def seed_initial_data(conn):
    cursor = conn.cursor()
    now = datetime.now().isoformat()

    # Initial Company Profile
    cursor.execute('''
        INSERT INTO marketing_context (id, company_name, description, industry, target_audience, products_services, brand_tone, onboarding_completed, updated_at)
        VALUES (1, ?, ?, ?, ?, ?, ?, 1, ?)
    ''', (
        "CloudScale AI",
        "Enterprise Agentic AI and Autonomous Infrastructure Automation platform for modern DevOps & Engineering teams.",
        "B2B SaaS / Enterprise Software",
        json.dumps(["VP of Engineering", "Lead Solutions Architects", "DevOps & Platform Leads", "Enterprise CTOs"]),
        json.dumps(["Agentic Orchestrator", "Workflow Studio Engine", "CloudScale Enterprise Server"]),
        "Authoritative, technical, concise, forward-thinking",
        now
    ))

    # Initial Competitors
    initial_competitors = [
        ("comp-1", "AgentFlow Systems", "https://agentflow.io", "Simple workflow bot builders & Zapier integrations", json.dumps(["Why LLM Bots are Replacing Legacy Scripts", "The 2026 AI Automation Stack"]), "2026-09-28", now),
        ("comp-2", "LangCraft Inc", "https://langcraft.com", "Developer LLM frameworks & multi-agent Python SDKs", json.dumps(["Architecting Multi-Agent Graphs", "LangGraph vs Custom Loop Frameworks"]), "2026-09-30", now),
        ("comp-3", "AutoOps Solutions", "https://autoops.ai", "Infrastructure AI agents & Cloud Cost Optimization", json.dumps(["Autonomous SRE: Myth vs Reality", "How AI Agents Manage Kubernetes"]), "2026-09-25", now)
    ]
    cursor.executemany('''
        INSERT INTO competitors (id, name, url, focus_area, top_articles, last_scraped, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', initial_competitors)

    # Initial Sample Blogs
    initial_blogs = [
        (
            "blog-1",
            "Agentic AI: The Future of Autonomous Enterprise Workflows",
            "agentic-ai-autonomous-enterprise-workflows",
            "Moving beyond passive chat interfaces: How multi-agent graphs with human-in-the-loop approvals reshape modern B2B SaaS.",
            "Moving beyond passive chat interfaces: How multi-agent graphs with human-in-the-loop approvals are reshaping modern B2B SaaS architecture.",
            "Agentic AI",
            "6 min read",
            "ContentCrew Generation Agent",
            json.dumps(["Agentic AI", "Multi-Agent Graphs", "Human in the Loop", "Autonomous Workflows"]),
            "94/100 (Grade 11 Technical)",
            """# Agentic AI: The Future of Autonomous Enterprise Workflows

Modern software engineering is transitioning from passive LLM chat prompts to **agentic workflows**—systems where autonomous AI agents collaborate, execute tools, analyze data, and request human verification at critical checkpoints.

## Why Chatbots Fail Enterprise Requirements

Standard chat interfaces suffer from key limitations:
1. **Lack of deterministic memory**: Chatbots lose context over extended tasks.
2. **No tool coordination**: They operate in isolation without verifying live data.
3. **No quality assurance**: They generate output directly without a human approval stage.

## The Agentic Solution: Multi-Agent Collaboration

By dividing tasks between specialized agents—such as a **Supervisor Agent** (orchestrator), an **Analysis Agent** (market research), and a **Generation Agent** (content creation)—enterprises achieve repeatable, audit-ready results.

---
*Published via ContentCrew Backend API*""",
            "published",
            "2026-09-28 10:00:00",
            "2026-09-28 10:00:00",
            "2026-09-28 10:00:00"
        ),
        (
            "blog-2",
            "Why Competitor Content Scraping Drives Higher Search Intent Conversion",
            "competitor-scraping-search-intent",
            "Discover how analyzing competitor headings, content gaps, and keyword density enables AI agents to craft superior technical articles.",
            "Discover how analyzing competitor headings, content gaps, and keyword density enables AI agents to craft superior, high-ranking technical articles.",
            "SEO Strategy",
            "8 min read",
            "ContentCrew Generation Agent",
            json.dumps(["Competitor Analysis", "Search Intent", "Content Gaps", "SEO Strategy"]),
            "92/100",
            """# Why Competitor Content Scraping Drives Higher Search Intent Conversion

Creating content in a vacuum guarantees low organic search visibility. To rank effectively, technical content teams must understand the exact coverage of existing top-ranking competitor articles.

## Identifying Content Gaps with AI Scrapers

When the ContentCrew Analysis Agent inspects top competitor pages, it extracts section headings, semantic keyword clusters, and content gaps to produce superior outlines.""",
            "published",
            "2026-09-24 14:30:00",
            "2026-09-24 14:30:00",
            "2026-09-24 14:30:00"
        )
    ]

    cursor.executemany('''
        INSERT INTO blogs (id, title, slug, subtitle, excerpt, category, read_time, author, seo_keywords, readability_score, content, status, created_at, updated_at, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', initial_blogs)

    conn.commit()
