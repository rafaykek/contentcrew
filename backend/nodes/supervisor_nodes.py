from datetime import datetime
from backend.agents.supervisor_agent import supervisor_agent
from backend.utils.logger import logger

def create_plan_node(state):
    logger.info("[Node: Supervisor Create Plan] Executing...")
    now_time = datetime.now().strftime("%H:%M:%S")

    user_req = state.get("user_request", "Agentic AI Marketing")
    company_ctx = state.get("company_context", {})

    plan = supervisor_agent.create_plan(user_req, company_ctx)

    event = {
        "id": f"event-{len(state.get('workflow_events', [])) + 1}",
        "type": "SUPERVISOR_PLAN",
        "agent": "Supervisor Agent",
        "timestamp": now_time,
        "title": "Creating Execution Plan",
        "plan": plan.get("steps", [])
    }

    events = state.get("workflow_events", [])
    events.append(event)

    state["plan"] = plan
    state["current_agent"] = "Supervisor Agent"
    state["current_node"] = "SUPERVISOR_PLAN"
    state["workflow_events"] = events
    return state
