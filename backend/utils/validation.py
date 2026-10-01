def validate_context_payload(data):
    """Validate company and competitor context update payloads."""
    if not isinstance(data, dict):
        return False, "Payload must be a JSON object."

    company = data.get("company")
    if company:
        if not isinstance(company, dict):
            return False, "Company must be an object."
        if "name" in company and not company["name"].strip():
            return False, "Company name cannot be empty."

    competitors = data.get("competitors")
    if competitors is not None and not isinstance(competitors, list):
        return False, "Competitors must be a list."

    return True, None

def validate_chat_payload(data):
    """Validate incoming user chat requests."""
    if not isinstance(data, dict):
        return False, "Payload must be a JSON object."
    message = data.get("message")
    if not message or not isinstance(message, str) or not message.strip():
        return False, "Chat message prompt is required and cannot be empty."
    return True, None

def validate_approval_payload(data):
    """Validate human approval payloads."""
    if not isinstance(data, dict):
        return False, "Payload must be a JSON object."
    decision = data.get("decision")
    if decision and decision not in ["approved", "rejected", "modified"]:
        return False, "Decision must be 'approved', 'rejected', or 'modified'."
    return True, None

def validate_blog_payload(data):
    """Validate blog creation/update payloads."""
    if not isinstance(data, dict):
        return False, "Payload must be a JSON object."
    title = data.get("title")
    if not title or not isinstance(title, str) or not title.strip():
        return False, "Blog title is required."
    content = data.get("content")
    if not content or not isinstance(content, str) or not content.strip():
        return False, "Blog content body is required."
    return True, None
