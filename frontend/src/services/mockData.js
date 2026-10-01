// Mock Data Layer for ContentCrew (Phase 1 Frontend Foundation)
// Cleanly separated so it can be swapped out with real Flask/LangGraph endpoints in Phase 2/3.

export const initialMarketingContext = {
  company: {
    name: "CloudScale AI",
    description: "Enterprise Agentic AI and Autonomous Infrastructure Automation platform for modern DevOps & Engineering teams.",
    industry: "B2B SaaS / Enterprise Software",
    targetAudience: [
      "VP of Engineering",
      "Lead Solutions Architects",
      "DevOps & Platform Leads",
      "Enterprise CTOs"
    ],
    products: [
      "Agentic Orchestrator",
      "Workflow Studio Engine",
      "CloudScale Enterprise Server"
    ],
    brandTone: "Authoritative, technical, concise, forward-thinking"
  },
  competitors: [
    {
      id: "comp-1",
      name: "AgentFlow Systems",
      url: "https://agentflow.io",
      focusArea: "Simple workflow bot builders & Zapier integrations",
      topArticles: ["Why LLM Bots are Replacing Legacy Scripts", "The 2026 AI Automation Stack"],
      lastScraped: "2026-09-28"
    },
    {
      id: "comp-2",
      name: "LangCraft Inc",
      url: "https://langcraft.com",
      focusArea: "Developer LLM frameworks & multi-agent Python SDKs",
      topArticles: ["Architecting Multi-Agent Graphs", "LangGraph vs Custom Loop Frameworks"],
      lastScraped: "2026-09-30"
    },
    {
      id: "comp-3",
      name: "AutoOps Solutions",
      url: "https://autoops.ai",
      focusArea: "Infrastructure AI agents & Cloud Cost Optimization",
      topArticles: ["Autonomous SRE: Myth vs Reality", "How AI Agents Manage Kubernetes"],
      lastScraped: "2026-09-25"
    }
  ],
  researchSummary: {
    articlesAnalyzed: 18,
    keywordsDiscovered: 45,
    contentGapsIdentified: 7,
    avgCompetitorWordCount: 2150,
    lastResearchDate: "2026-10-01 19:45"
  }
};

export const initialBlogs = [
  {
    id: "blog-1",
    title: "Agentic AI: The Future of Autonomous Enterprise Workflows",
    excerpt: "Moving beyond passive chat interfaces: How multi-agent graphs with human-in-the-loop approvals are reshaping modern B2B SaaS architecture.",
    category: "Agentic AI",
    date: "2026-09-28",
    readTime: "6 min read",
    author: "ContentCrew Generation Agent",
    status: "Published",
    seoKeywords: ["Agentic AI", "Multi-Agent Graphs", "Human in the Loop", "Autonomous Workflows"],
    content: `
# Agentic AI: The Future of Autonomous Enterprise Workflows

Modern software engineering is transitioning from passive LLM chat prompts to **agentic workflows**—systems where autonomous AI agents collaborate, execute tools, analyze data, and request human verification at critical checkpoints.

## Why Chatbots Fail Enterprise Requirements

Standard chat interfaces suffer from key limitations:
1. **Lack of deterministic memory**: Chatbots lose context over extended tasks.
2. **No tool coordination**: They operate in isolation without verifying live data.
3. **No quality assurance**: They generate output directly without a human approval stage.

## The Agentic Solution: Multi-Agent Collaboration

By dividing tasks between specialized agents—such as a **Supervisor Agent** (orchestrator), an **Analysis Agent** (market research), and a **Generation Agent** (content creation)—enterprises achieve repeatable, audit-ready results.

### Key Architectural Pillars:
- **State Preservation**: Every tool output and decision is logged in a state graph.
- **Human-in-the-Loop Approval**: Human domain experts approve research strategies before draft generation.
- **Direct Integration**: Generated artifacts publish automatically to CMS endpoints.

---
*Published via ContentCrew Agentic Publishing Tool*
`
  },
  {
    id: "blog-2",
    title: "Why Competitor Content Scraping Drives Higher Search Intent Conversion",
    excerpt: "Discover how analyzing competitor headings, content gaps, and keyword density enables AI agents to craft superior, high-ranking technical articles.",
    category: "SEO Strategy",
    date: "2026-09-24",
    readTime: "8 min read",
    author: "ContentCrew Generation Agent",
    status: "Published",
    seoKeywords: ["Competitor Analysis", "Search Intent", "Content Gaps", "SEO Strategy"],
    content: `
# Why Competitor Content Scraping Drives Higher Search Intent Conversion

Creating content in a vacuum guarantees low organic search visibility. To rank effectively, technical content teams must understand the exact coverage of existing top-ranking competitor articles.

## Identifying Content Gaps with AI Scrapers

When the ContentCrew Analysis Agent inspects top competitor pages, it extracts:
- Section headings (H2, H3 structure)
- Covered subtopics vs omitted questions
- Semantic keyword clusters and intent alignment

## Turning Insights into Actionable Drafts

By identifying what competitors missed, the Generation Agent builds a comprehensive outline that addresses unanswered user questions, resulting in higher domain authority and search conversion.
`
  },
  {
    id: "blog-3",
    title: "Architecting Human-in-the-Loop Checkpoints in Agentic LLM Graphs",
    excerpt: "Explore how state pause and resume mechanics prevent AI hallucinations while preserving high throughput in enterprise automation pipelines.",
    category: "Architecture",
    date: "2026-09-19",
    readTime: "5 min read",
    author: "ContentCrew Generation Agent",
    status: "Published",
    seoKeywords: ["LangGraph", "Human Approval", "LLM State Machine", "B2B SaaS"],
    content: `
# Architecting Human-in-the-Loop Checkpoints in Agentic LLM Graphs

Fully autonomous AI without human oversight introduces brand risk. Fully manual content creation is too slow. The sweet spot is **Human-in-the-Loop (HITL) agentic workflows**.

## The Two-Stage Approval Model

ContentCrew enforces two distinct human verification gates:
1. **Research Strategy Gate**: Approving target keywords, analyzed competitors, and content structure.
2. **Draft & Review Gate**: Final polish, style adjustment, and one-click publishing authorization.

This design guarantees safety while reducing human execution time by over 80%.
`
  }
];

// Pre-packaged simulated agent sequence for demo runs in Phase 1
export const demoWorkflowEvents = [
  {
    id: "event-1",
    type: "SUPERVISOR_PLAN",
    agent: "Supervisor Agent",
    timestamp: "10:02:14",
    title: "Creating Execution Plan",
    plan: [
      { step: 1, text: "Understand company context & target audience", status: "completed" },
      { step: 2, text: "Identify key competitors in enterprise AI space", status: "completed" },
      { step: 3, text: "Perform live web search & extract competitor articles", status: "in_progress" },
      { step: 4, text: "Analyze keywords, search intent & content gaps", status: "pending" },
      { step: 5, text: "Request human approval for research strategy", status: "pending" },
      { step: 6, text: "Generate SEO-optimized blog draft", status: "pending" },
      { step: 7, text: "Present draft in editor & await publishing approval", status: "pending" }
    ]
  },
  {
    id: "event-2",
    type: "TOOL_EXECUTION",
    agent: "Analysis Agent",
    tool: "Google Search",
    timestamp: "10:02:18",
    query: "Agentic AI enterprise marketing content strategy 2026",
    status: "completed",
    resultsCount: 8,
    snippets: [
      "AgentFlow.io: Why Multi-Agent Systems Outperform Single Prompts in 2026",
      "LangCraft Blog: Architectural patterns for stateful LLM graphs with human approval",
      "AutoOps AI: Enterprise marketing automation using domain-specific agents"
    ]
  },
  {
    id: "event-3",
    type: "TOOL_EXECUTION",
    agent: "Analysis Agent",
    tool: "Web Scraper",
    timestamp: "10:02:22",
    url: "https://agentflow.io/blog/multi-agent-systems-2026",
    status: "completed",
    scrapedTitle: "Why Multi-Agent Systems Outperform Single Prompts in 2026",
    headingsExtracted: ["Introduction", "Limitations of Prompt Chains", "Stateful Graph Architectures", "ROI Metrics"],
    wordCount: 1840
  },
  {
    id: "event-4",
    type: "TOOL_EXECUTION",
    agent: "Analysis Agent",
    tool: "Keyword Analysis",
    timestamp: "10:02:26",
    status: "completed",
    primaryKeyword: "Agentic AI Marketing Workflows",
    discoveredKeywords: [
      { term: "Agentic AI", volume: "14.2K", difficulty: "Medium", intent: "Informational" },
      { term: "Multi-agent workflows B2B", volume: "4.8K", difficulty: "Low", intent: "Commercial" },
      { term: "Human in the loop LLM", volume: "6.1K", difficulty: "Low", intent: "Technical" }
    ]
  },
  {
    id: "event-5",
    type: "TOOL_EXECUTION",
    agent: "Analysis Agent",
    tool: "Competitor Analysis",
    timestamp: "10:02:30",
    status: "completed",
    contentGaps: [
      "Competitors lack technical detail on state-machine pause/resume capabilities",
      "No competitor covers ROI calculations for human-in-the-loop validation times",
      "Opportunity to position CloudScale AI as the pioneer in enterprise graph safety"
    ]
  },
  {
    id: "event-6",
    type: "APPROVAL_REQUEST",
    agent: "Supervisor Agent",
    timestamp: "10:02:34",
    approvalType: "RESEARCH_STRATEGY",
    summary: {
      topic: "Agentic AI Workflows for Enterprise Marketing",
      targetAudience: "VP of Engineering & DevOps Platform Leads",
      competitorsAnalyzed: 3,
      primaryKeywords: ["Agentic AI", "Multi-agent workflows B2B", "Human in the loop LLM"],
      recommendedOutline: [
        "1. Executive Summary: The Shift to Agentic Workflows",
        "2. Competitor Benchmark & Structural Gaps",
        "3. Building Deterministic Multi-Agent Graphs",
        "4. Practical ROI: Human-in-the-Loop Safety Gates",
        "5. Next Steps for Enterprise Engineering Teams"
      ]
    }
  }
];

export const generatedBlogMockDraft = {
  id: "draft-generated-101",
  title: "Agentic AI Workflows: Unlocking Deterministic Content Automation for Enterprise SaaS",
  subtitle: "How multi-agent orchestration, live competitor scraping, and human-in-the-loop checkpoints create high-ranking technical content at scale.",
  author: "ContentCrew Generation Agent",
  date: new Date().toISOString().split("T")[0],
  readTime: "7 min read",
  category: "Agentic AI",
  seoKeywords: ["Agentic AI", "Multi-agent workflows B2B", "Human in the loop LLM", "Enterprise SaaS"],
  readabilityScore: "94/100 (Grade 11 Technical)",
  targetAudience: "VP of Engineering & Platform Leads",
  content: `# Agentic AI Workflows: Unlocking Deterministic Content Automation for Enterprise SaaS

In the rapidly evolving landscape of modern enterprise software, marketing engineering teams are discovering that traditional text-generation prompts fail when applied to complex technical content. Single-prompt LLM outputs are frequently generic, lack live competitor context, and lack domain-specific precision.

Enter **Agentic AI Workflows**—a paradigm shift where discrete, specialized AI agents operate within a structured state machine, executing web research tools, analyzing SEO keyword data, and requesting explicit human approval prior to publication.

---

## 1. Executive Summary: The Shift to Agentic Workflows

Traditional content tools treat text generation as a single unstructured function call. In contrast, **ContentCrew** orchestrates specialized AI agents that function like a real marketing squad:

- **Supervisor Agent**: Plans tasks, routes state, and coordinates approval checkpoints.
- **Analysis Agent**: Executes live Google searches, scrapes competitor headings, and detects content gaps.
- **Generation Agent**: Builds structured outlines and authors high-intent articles adhering to verified research.

\`\`\`text
Research → Analyze → Approve → Generate → Review → Publish
\`\`\`

---

## 2. Competitor Benchmark & Structural Gaps

Based on live research conducted by the **Analysis Agent**, top competitors in the market emphasize generic chatbot capabilities while omitting three critical technical requirements:

1. **Deterministic State Preservation**: Competitor platforms fail to maintain state across multi-step research pipelines.
2. **Human-in-the-Loop Safety Gates**: Most tools attempt full auto-posting without allowing technical teams to approve research findings.
3. **Keyword Search Intent Alignment**: Generic tools overlook search volume metrics and commercial intent clustering.

---

## 3. Building Deterministic Multi-Agent Graphs

By structuring the workflow inside a state graph, every step is logged and verifiable:

- **Google Search Tool**: Fetches live articles for target queries.
- **Web Scraper Tool**: Parses H2/H3 heading structures to ensure comprehensive section coverage.
- **Keyword Analysis Tool**: Filters low-difficulty, high-conversion B2B search terms.

---

## 4. Practical ROI: Human-in-the-Loop Safety Gates

Safety and brand integrity are non-negotiable in enterprise B2B SaaS. ContentCrew integrates two mandatory approval checkpoints:

1. **Research Strategy Approval**: Review target keywords and competitor coverage before drafting begins.
2. **Blog Review & One-Click Publishing**: Refine title, headings, and SEO metadata directly in the dynamic editor before sending to the CMS endpoint.

---

## 5. Next Steps for Enterprise Engineering Teams

Implementing agentic marketing workflows enables enterprise teams to produce audit-ready, highly technical articles in minutes rather than weeks. By placing human oversight at key decision points, marketing leaders maintain complete control over brand voice while scaling output exponentially.

---
*Published via ContentCrew Enterprise Agentic Suite*`
};
