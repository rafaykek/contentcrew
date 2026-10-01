from backend.llm.provider import llm_client
from backend.utils.logger import logger

class SupervisorAgent:
    def __init__(self):
        self.name = "Supervisor Agent"

    def create_plan(self, user_request, company_context):
        """
        Create a structured execution plan for the content creation task.
        """
        logger.info(f"[{self.name}] Creating execution plan for request: '{user_request}'")

        company_name = company_context.get("company", {}).get("name", "CloudScale AI")
        industry = company_context.get("company", {}).get("industry", "B2B SaaS")

        system_prompt = (
            "You are the Supervisor Agent orchestrating a multi-agent marketing team (Supervisor -> Analysis Agent -> Generation Agent).\n"
            "Your job is to analyze the user request and company context, then generate a JSON execution plan.\n"
            "Return JSON matching format:\n"
            "{\n"
            '  "goal": "...",\n'
            '  "steps": [\n'
            '    {"step": 1, "text": "...", "status": "completed"},\n'
            '    {"step": 2, "text": "...", "status": "in_progress"},\n'
            '    {"step": 3, "text": "...", "status": "pending"}\n'
            '  ],\n'
            '  "next_agent": "Analysis Agent"\n'
            "}"
        )

        user_prompt = (
            f"User Request: {user_request}\n"
            f"Company: {company_name} ({industry})\n"
            "Create a 6-step plan covering: Context Understanding, Competitor Web Scraping, Keyword & Gap Analysis, Research Approval Gate, Blog Generation, Content Review & Publishing Gate."
        )

        res = llm_client.generate(user_prompt, system_prompt=system_prompt, json_mode=True)

        if isinstance(res, dict) and "steps" in res:
            return res

        # Fallback structured plan if JSON mode fallback occurred
        return {
            "goal": f"Produce a publish-ready technical article on '{user_request}'",
            "steps": [
                {"step": 1, "text": "Understand company context & target audience", "status": "completed"},
                {"step": 2, "text": "Identify key competitors & execute web search", "status": "in_progress"},
                {"step": 3, "text": "Scrape competitor content & analyze content gaps", "status": "pending"},
                {"step": 4, "text": "Perform keyword discovery & SEO search intent analysis", "status": "pending"},
                {"step": 5, "text": "Request human approval for research strategy", "status": "pending"},
                {"step": 6, "text": "Generate SEO-optimized technical blog draft", "status": "pending"}
            ],
            "next_agent": "Analysis Agent"
        }

supervisor_agent = SupervisorAgent()
