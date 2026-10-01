from backend.services.blog_service import create_or_publish_blog
from backend.utils.logger import logger

def execute_publish_blog(blog_draft, content_approved=False):
    """
    Publish Blog Tool. Saves approved blog draft to database.
    Strict Security Constraint: Requires content_approved == True.
    """
    if not content_approved:
        logger.error("Security Violation: Attempted to publish blog without explicit human approval.")
        return {
            "success": False,
            "error": "Security Policy Violation: Publishing requires explicit human approval checkpoint."
        }

    logger.info(f"Executing Publish Blog Tool for title: '{blog_draft.get('title')}'")

    blog_draft["status"] = "published"
    published_record = create_or_publish_blog(blog_draft)

    return {
        "success": True,
        "publish_status": "completed",
        "published_url": f"/blogs/{published_record['id']}",
        "blog": published_record
    }
