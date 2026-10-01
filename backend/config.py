import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'contentcrew-dev-secret-key-2026')
    PORT = int(os.getenv('PORT', 5000))
    DB_PATH = os.path.join(BASE_DIR, os.getenv('DATABASE_PATH', 'data/contentcrew.db'))
    DEBUG = os.getenv('FLASK_ENV', 'development') == 'development'
