from datetime import datetime
from backend.agents.generation_agent import generation_agent
from backend.utils.logger import logger

def generate_content_node(state):
    logger.info("[Node: Generation Agent] Generating technical blog draft...")
    now_time = datetime.now().strftime("%H:%M:%S")

    user_req = state.get("user_request", "")
    company_ctx = state.get("company_context", {})
    research_summary = state.get("research_summary", {})

    draft = generation_agent.generate_blog(user_req, company_ctx, research_summary)

    events = state.get("workflow_events", [])
    events.append({
        "id": f"event-{len(events) + 1}",
        "type": "GENERATION_ACTIVITY",
        "agent": "Generation Agent",
        "timestamp": now_time,
        "title": "Blog Generation Complete",
        "status": "completed",
        "draftTitle": draft.get("title")
    })

    state["blog_draft"] = draft
    state["content_status"] = "draft_ready"
    state["current_agent"] = "Generation Agent"
    state["current_node"] = "GENERATION_COMPLETE"
    state["workflow_events"] = events
    return state
