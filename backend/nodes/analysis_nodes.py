from datetime import datetime
from backend.agents.analysis_agent import analysis_agent
from backend.utils.plan_helper import get_updated_supervisor_plan
from backend.utils.logger import logger

def run_analysis_node(state):
    logger.info("[Node: Analysis Agent] Executing research & tool sequence...")
    now_time = datetime.now().strftime("%H:%M:%S")

    user_req = state.get("user_request", "")
    company_ctx = state.get("company_context", {})
    competitors = state.get("competitors", [])

    results = analysis_agent.run_analysis(user_req, company_ctx, competitors)

    events = state.get("workflow_events", [])

    # Update Supervisor Plan event in workflow events stream
    company_name = company_ctx.get("company", {}).get("name", "CloudScale AI")
    updated_plan_steps = get_updated_supervisor_plan(company_name, competitors)

    for evt in events:
        if evt.get("type") == "SUPERVISOR_PLAN":
            evt["plan"] = updated_plan_steps

    # Search Event
    search_res = results["search_event"]
    events.append({
        "id": f"event-{len(events) + 1}",
        "type": "TOOL_EXECUTION",
        "agent": "Analysis Agent",
        "tool": "Google Search",
        "timestamp": now_time,
        "query": search_res["query"],
        "status": "completed",
        "resultsCount": search_res["results_count"],
        "snippets": [r["title"] for r in search_res["results"][:3]]
    })

    # Scraper Event
    scrape_res = results["scrape_event"]
    events.append({
        "id": f"event-{len(events) + 1}",
        "type": "TOOL_EXECUTION",
        "agent": "Analysis Agent",
        "tool": "Web Scraper",
        "timestamp": now_time,
        "url": scrape_res["url"],
        "status": "completed",
        "scrapedTitle": scrape_res["title"],
        "headingsExtracted": scrape_res["headings"],
        "wordCount": scrape_res["word_count"]
    })

    # Keyword Event
    kw_res = results["keyword_event"]
    events.append({
        "id": f"event-{len(events) + 1}",
        "type": "TOOL_EXECUTION",
        "agent": "Analysis Agent",
        "tool": "Keyword Analysis",
        "timestamp": now_time,
        "status": "completed",
        "primaryKeyword": kw_res["primary_topic"],
        "discoveredKeywords": [
            {"term": k["term"], "volume": "High Intent", "difficulty": "Medium", "intent": k["intent"]}
            for k in kw_res["discovered_keywords"]
        ]
    })

    # Competitor Event
    comp_res = results["competitor_event"]
    events.append({
        "id": f"event-{len(events) + 1}",
        "type": "TOOL_EXECUTION",
        "agent": "Analysis Agent",
        "tool": "Competitor Analysis",
        "timestamp": now_time,
        "status": "completed",
        "contentGaps": comp_res["content_gaps"]
    })

    state["search_results"] = search_res["results"]
    state["scraped_content"] = [scrape_res]
    state["keywords"] = kw_res["discovered_keywords"]
    state["competitor_analysis"] = comp_res
    state["research_summary"] = results["research_summary"]
    state["current_agent"] = "Analysis Agent"
    state["current_node"] = "ANALYSIS_COMPLETE"
    state["workflow_events"] = events

    return state
