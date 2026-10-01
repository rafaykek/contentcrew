from datetime import datetime
from backend.tools.publish_blog import execute_publish_blog
from backend.utils.logger import logger

def publish_blog_node(state):
    logger.info("[Node: Publish Blog Node] Executing publication tool...")
    now_time = datetime.now().strftime("%H:%M:%S")

    draft = state.get("blog_draft", {})
    approved = state.get("content_approved", False)

    res = execute_publish_blog(draft, content_approved=approved)

    events = state.get("workflow_events", [])
    if res.get("success"):
        events.append({
            "id": f"event-{len(events) + 1}",
            "type": "PUBLISH_ACTIVITY",
            "agent": "Publishing Tool",
            "timestamp": now_time,
            "title": "Blog Published Successfully",
            "status": "completed",
            "publishedUrl": res.get("published_url")
        })
        state["publish_status"] = "completed"
        state["current_node"] = "COMPLETED"
    else:
        events.append({
            "id": f"event-{len(events) + 1}",
            "type": "ERROR",
            "agent": "Publishing Tool",
            "timestamp": now_time,
            "message": res.get("error")
        })
        state["publish_status"] = "failed"

    state["workflow_events"] = events
    return state
