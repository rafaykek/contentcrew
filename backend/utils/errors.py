from flask import jsonify

def error_response(code, message, status_code=400):
    """
    Standardized API error response payload format:
    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Company name is required."
      }
    }
    """
    return jsonify({
        "success": False,
        "error": {
            "code": code,
            "message": message
        }
    }), status_code
