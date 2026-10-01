from flask import Flask
from flask_cors import CORS
from backend.config import Config
from backend.database import init_db
from backend.utils.logger import logger
from backend.routes.health_routes import health_bp
from backend.routes.context_routes import context_bp
from backend.routes.chat_routes import chat_bp
from backend.routes.status_routes import status_bp
from backend.routes.approval_routes import approval_bp
from backend.routes.blog_routes import blog_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for local development
    CORS(app, resources={r"/api/*": {"origins": "*"}, r"/health": {"origins": "*"}})

    # Initialize SQLite Database
    init_db()

    # Register Blueprints
    app.register_blueprint(health_bp)
    app.register_blueprint(context_bp)
    app.register_blueprint(chat_bp)
    app.register_blueprint(status_bp)
    app.register_blueprint(approval_bp)
    app.register_blueprint(blog_bp)

    @app.errorhandler(404)
    def handle_404(e):
        return {"success": False, "error": {"code": "NOT_FOUND", "message": "Endpoint not found."}}, 404

    @app.errorhandler(500)
    def handle_500(e):
        logger.error(f"Internal server error: {str(e)}")
        return {"success": False, "error": {"code": "INTERNAL_ERROR", "message": "An unexpected error occurred."}}, 500

    return app

app = create_app()

if __name__ == '__main__':
    logger.info(f"Starting ContentCrew Flask Backend on port {Config.PORT}...")
    app.run(host='0.0.0.0', port=Config.PORT, debug=Config.DEBUG)
