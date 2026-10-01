from flask import Blueprint, request, jsonify
from backend.services.approval_service import record_approval
from backend.utils.validation import validate_approval_payload
from backend.utils.errors import error_response

approval_bp = Blueprint('approval', __name__)

@approval_bp.route('/api/approval/research', methods=['POST'])
def approve_research():
    data = request.get_json(silent=True) or {}
    is_valid, err_msg = validate_approval_payload(data)
    if not is_valid:
        return error_response("VALIDATION_ERROR", err_msg, 400)

    decision = data.get("decision", "approved")
    session_id = data.get("session_id")
    res = record_approval("RESEARCH_STRATEGY", decision, data, session_id)
    return jsonify(res), 200

@approval_bp.route('/api/approval/content', methods=['POST'])
def approve_content():
    data = request.get_json(silent=True) or {}
    is_valid, err_msg = validate_approval_payload(data)
    if not is_valid:
        return error_response("VALIDATION_ERROR", err_msg, 400)

    decision = data.get("decision", "approved")
    session_id = data.get("session_id")
    res = record_approval("CONTENT_DRAFT", decision, data, session_id)
    return jsonify(res), 200
