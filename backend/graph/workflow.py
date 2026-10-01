from langgraph.graph import StateGraph, START, END
from backend.graph.state import WorkflowState
from backend.nodes.supervisor_nodes import create_plan_node
from backend.nodes.analysis_nodes import run_analysis_node
from backend.nodes.approval_nodes import request_research_approval_node, request_content_approval_node
from backend.nodes.generation_nodes import generate_content_node
from backend.nodes.publish_nodes import publish_blog_node
from backend.utils.logger import logger

def build_workflow_graph():
    """
    Build the ContentCrew LangGraph StateGraph workflow engine.
    Phase 3 Graph Pipeline:
    1. Research Phase: START -> create_plan -> run_analysis -> request_research_approval -> END (Human Gate 1)
    2. Generation Phase: generate_content -> request_content_approval -> END (Human Gate 2)
    3. Publish Phase: publish_blog -> END
    """
    logger.info("Building ContentCrew LangGraph StateGraph Engine...")

    graph = StateGraph(WorkflowState)

    # Add Nodes
    graph.add_node("create_plan", create_plan_node)
    graph.add_node("run_analysis", run_analysis_node)
    graph.add_node("request_research_approval", request_research_approval_node)
    graph.add_node("generate_content", generate_content_node)
    graph.add_node("request_content_approval", request_content_approval_node)
    graph.add_node("publish_blog", publish_blog_node)

    # Research Phase Edges (Halts at Human Checkpoint 1)
    graph.add_edge(START, "create_plan")
    graph.add_edge("create_plan", "run_analysis")
    graph.add_edge("run_analysis", "request_research_approval")
    graph.add_edge("request_research_approval", END)

    # Generation Phase Edges (Halts at Human Checkpoint 2)
    graph.add_edge("generate_content", "request_content_approval")
    graph.add_edge("request_content_approval", END)

    # Publish Phase Edges
    graph.add_edge("publish_blog", END)

    return graph.compile()

# Instantiate compiled workflow graph
workflow_engine = build_workflow_graph()
