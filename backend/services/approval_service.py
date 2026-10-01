import uuid
import json
from datetime import datetime
from backend.database import get_db_connection
from backend.services.context_service import get_marketing_context
from backend.agents.generation_agent import generation_agent
from backend.tools.publish_blog import execute_publish_blog
from backend.utils.logger import logger

def record_approval(approval_type, decision, payload=None, session_id=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    approval_id = f"appr-{uuid.uuid4().hex[:8]}"
    now = datetime.now().isoformat()
    payload_json = json.dumps(payload or {})

    # Record approval decision in SQLite database
    cursor.execute('''
        INSERT INTO approvals (id, session_id, approval_type, decision, payload, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (approval_id, session_id, approval_type, decision, payload_json, now))

    new_status = "content_approval" if approval_type == "RESEARCH_STRATEGY" else "published"
    if session_id:
        cursor.execute('''
            UPDATE workspace_sessions
            SET workflow_status = ?, current_agent = ?, current_node = ?, updated_at = ?
            WHERE session_id = ?
        ''', (new_status, "Generation Agent" if approval_type == "RESEARCH_STRATEGY" else "Publishing Tool", "WAITING_FOR_CONTENT_APPROVAL" if approval_type == "RESEARCH_STRATEGY" else "COMPLETED", now, session_id))

    conn.commit()
    conn.close() # Close DB connection before secondary tool executions!

    generated_draft = None

    if approval_type == "RESEARCH_STRATEGY":
        company_ctx = get_marketing_context()
        user_req = payload.get("topic", "Agentic AI Marketing Workflows")
        logger.info(f"Research strategy approved! Triggering Generation Agent for topic: '{user_req}'")
        generated_draft = generation_agent.generate_blog(user_req, company_ctx, payload)

    elif approval_type == "CONTENT_DRAFT":
        logger.info("Content draft approved! Executing Publish Blog Tool...")
        draft = payload.get("draft") or payload
        execute_publish_blog(draft, content_approved=True)

    return {
        "success": True,
        "approval_id": approval_id,
        "approval_type": approval_type,
        "decision": decision,
        "workflow_status": new_status,
        "generatedDraft": generated_draft,
        "message": f"{approval_type} decision '{decision}' recorded successfully."
    }
