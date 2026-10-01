from flask import Blueprint, request, jsonify
from backend.services.workspace_service import create_chat_session
from backend.utils.validation import validate_chat_payload
from backend.utils.errors import error_response

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/api/chat', methods=['POST'])
def handle_chat():
    data = request.get_json(silent=True)
    is_valid, err_msg = validate_chat_payload(data)
    if not is_valid:
        return error_response("VALIDATION_ERROR", err_msg, 400)

    res = create_chat_session(data["message"])
    return jsonify(res), 200
