from datetime import datetime
from backend.utils.logger import logger

def request_research_approval_node(state):
    logger.info("[Node: Request Research Approval] Interrupting workflow for Human Checkpoint 1...")
    now_time = datetime.now().strftime("%H:%M:%S")

    summary = state.get("research_summary", {})
    events = state.get("workflow_events", [])

    events.append({
        "id": f"event-{len(events) + 1}",
        "type": "APPROVAL_REQUEST",
        "agent": "Supervisor Agent",
        "timestamp": now_time,
        "approvalType": "RESEARCH_STRATEGY",
        "summary": {
            "topic": summary.get("topic", state.get("user_request", "")),
            "targetAudience": ", ".join(summary.get("targetAudience", ["DevOps Leads"])),
            "competitorsAnalyzed": summary.get("competitorsAnalyzed", 3),
            "primaryKeywords": summary.get("primaryKeywords", []),
            "recommendedOutline": summary.get("recommendedOutline", [])
        }
    })

    state["current_agent"] = "Supervisor Gate"
    state["current_node"] = "WAITING_FOR_RESEARCH_APPROVAL"
    state["workflow_events"] = events
    return state

def request_content_approval_node(state):
    logger.info("[Node: Request Content Approval] Interrupting workflow for Human Checkpoint 2...")
    now_time = datetime.now().strftime("%H:%M:%S")

    events = state.get("workflow_events", [])
    events.append({
        "id": f"event-{len(events) + 1}",
        "type": "APPROVAL_REQUEST",
        "agent": "Supervisor Gate",
        "timestamp": now_time,
        "approvalType": "CONTENT_DRAFT",
        "summary": "Generated blog draft ready for human editor review."
    })

    state["current_agent"] = "Supervisor Gate"
    state["current_node"] = "WAITING_FOR_CONTENT_APPROVAL"
    state["workflow_events"] = events
    return state
