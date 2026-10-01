def get_updated_supervisor_plan(company_name="CloudScale AI", competitors=None):
    """
    Generate an updated Supervisor Plan checklist with completed statuses for Steps 1-4
    and in_progress status for Step 5 (Human Research Strategy Approval Gate).
    """
    comp_names = [c.get("name") for c in competitors] if competitors else []
    comp_str = f" ({', '.join(comp_names)})" if comp_names else ""

    return [
        { "step": 1, "text": f"Understand {company_name} company context & target audience", "status": "completed" },
        { "step": 2, "text": f"Identify key competitors{comp_str}", "status": "completed" },
        { "step": 3, "text": f"Perform live web search & extract competitor articles{comp_str}", "status": "completed" },
        { "step": 4, "text": "Analyze keywords, search intent & content gaps", "status": "completed" },
        { "step": 5, "text": "Request human approval for research strategy", "status": "in_progress" },
        { "step": 6, "text": "Generate SEO-optimized technical blog draft", "status": "pending" },
        { "step": 7, "text": "Present draft in editor & await publishing approval", "status": "pending" }
    ]
