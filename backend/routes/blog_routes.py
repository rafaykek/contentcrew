from flask import Blueprint, request, jsonify
from backend.services.blog_service import get_all_blogs, get_blog_by_id, create_or_publish_blog
from backend.utils.validation import validate_blog_payload
from backend.utils.errors import error_response

blog_bp = Blueprint('blog', __name__)

@blog_bp.route('/api/blogs', methods=['GET'])
@blog_bp.route('/api/blog', methods=['GET'])
def list_blogs():
    blogs = get_all_blogs()
    return jsonify(blogs), 200

@blog_bp.route('/api/blog/<blog_id>', methods=['GET'])
def get_blog(blog_id):
    blog = get_blog_by_id(blog_id)
    if not blog:
        return error_response("NOT_FOUND", f"Blog with ID '{blog_id}' not found.", 404)
    return jsonify(blog), 200

@blog_bp.route('/api/blog', methods=['POST'])
def save_blog():
    data = request.get_json(silent=True)
    is_valid, err_msg = validate_blog_payload(data)
    if not is_valid:
        return error_response("VALIDATION_ERROR", err_msg, 400)

    blog = create_or_publish_blog(data)
    return jsonify({
        "success": True,
        "status": "PUBLISHED",
        "message": "Blog persisted successfully.",
        "publishedUrl": f"/blogs/{blog['id']}",
        "blog": blog
    }), 200
