from flask import Blueprint, request, jsonify
from backend.services.context_service import get_marketing_context, update_marketing_context
from backend.utils.validation import validate_context_payload
from backend.utils.errors import error_response

context_bp = Blueprint('context', __name__)

@context_bp.route('/api/context', methods=['GET'])
def get_context():
    context = get_marketing_context()
    return jsonify(context), 200

@context_bp.route('/api/context', methods=['POST'])
def save_context():
    data = request.get_json(silent=True)
    is_valid, err_msg = validate_context_payload(data)
    if not is_valid:
        return error_response("VALIDATION_ERROR", err_msg, 400)

    updated = update_marketing_context(data)
    return jsonify({
        "success": True,
        "message": "Marketing context updated successfully.",
        "context": updated
    }), 200
