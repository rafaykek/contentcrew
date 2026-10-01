from typing import TypedDict, List, Dict, Any, Optional

class WorkflowState(TypedDict):
    session_id: str
    user_request: str
    company_context: Dict[str, Any]
    competitors: List[Dict[str, Any]]
    
    plan: Dict[str, Any]
    current_step: int
    current_agent: str
    current_node: str
    
    search_results: List[Dict[str, Any]]
    scraped_content: List[Dict[str, Any]]
    keywords: List[Dict[str, Any]]
    competitor_analysis: Dict[str, Any]
    
    research_summary: Dict[str, Any]
    research_approved: bool
    
    blog_outline: List[str]
    blog_draft: Dict[str, Any]
    content_status: str
    content_approved: bool
    publish_status: str
    
    workflow_events: List[Dict[str, Any]]
    errors: List[str]
