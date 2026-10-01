from flask import Blueprint, request, jsonify
from backend.services.workspace_service import get_current_status

status_bp = Blueprint('status', __name__)

@status_bp.route('/api/status', methods=['GET'])
def get_status():
    session_id = request.args.get('session_id')
    status = get_current_status(session_id)
    return jsonify(status), 200
