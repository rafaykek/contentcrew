import uuid
import json
from datetime import datetime
from backend.database import get_db_connection
from backend.services.context_service import get_marketing_context
from backend.graph.workflow import workflow_engine
from backend.utils.logger import logger

def create_chat_session(message):
    conn = get_db_connection()
    cursor = conn.cursor()
    session_id = f"sess-{uuid.uuid4().hex[:8]}"
    now = datetime.now().isoformat()

    # Load Company Context
    company_context = get_marketing_context()

    # Build initial LangGraph WorkflowState
    initial_state = {
        "session_id": session_id,
        "user_request": message,
        "company_context": company_context,
        "competitors": company_context.get("competitors", []),
        "plan": {},
        "current_step": 1,
        "current_agent": "Supervisor Agent",
        "current_node": "START",
        "search_results": [],
        "scraped_content": [],
        "keywords": [],
        "competitor_analysis": {},
        "research_summary": {},
        "research_approved": False,
        "blog_outline": [],
        "blog_draft": {},
        "content_status": "empty",
        "content_approved": False,
        "publish_status": "not_started",
        "workflow_events": [],
        "errors": []
    }

    # Execute graph up to Research Approval Gate
    logger.info(f"Executing LangGraph workflow for session: {session_id}")
    final_state = workflow_engine.invoke(initial_state)

    events_json = json.dumps(final_state.get("workflow_events", []))
    research_summary_json = json.dumps(final_state.get("research_summary", {}))

    cursor.execute('''
        INSERT INTO workspace_sessions (session_id, user_request, workflow_status, current_agent, current_node, approval_required, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 1, ?, ?)
    ''', (session_id, message, "waiting_research_approval", final_state.get("current_agent", "Supervisor Gate"), final_state.get("current_node", "WAITING_FOR_RESEARCH_APPROVAL"), now, now))

    conn.commit()
    conn.close()

    return {
        "success": True,
        "session_id": session_id,
        "workflow_status": "waiting_research_approval",
        "message": "Supervisor Agent initiated task plan and completed competitor research.",
        "request": message,
        "initialEvents": final_state.get("workflow_events", []),
        "research_summary": final_state.get("research_summary", {})
    }

def get_current_status(session_id=None):
    conn = get_db_connection()
    cursor = conn.cursor()

    if session_id:
        cursor.execute('SELECT * FROM workspace_sessions WHERE session_id = ?', (session_id,))
        row = cursor.fetchone()
    else:
        cursor.execute('SELECT * FROM workspace_sessions ORDER BY created_at DESC LIMIT 1')
        row = cursor.fetchone()

    conn.close()

    if not row:
        return {
            "session_id": None,
            "workflow_status": "idle",
            "current_agent": None,
            "current_node": "START",
            "approval_required": False,
            "tool_activity": [],
            "blog_status": "empty",
            "publish_status": "not_started"
        }

    return {
        "session_id": row["session_id"],
        "user_request": row["user_request"],
        "workflow_status": row["workflow_status"],
        "current_agent": row["current_agent"],
        "current_node": row["current_node"],
        "approval_required": bool(row["approval_required"]),
        "tool_activity": [],
        "blog_status": "draft" if row["workflow_status"] in ["generating", "content_approval"] else ("published" if row["workflow_status"] == "published" else "empty"),
        "publish_status": "completed" if row["workflow_status"] == "published" else "not_started",
        "updated_at": row["updated_at"]
    }
