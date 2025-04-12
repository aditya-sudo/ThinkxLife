# app/__init__.py

from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Enable Cross-Origin Resource Sharing (optional, helpful if frontend is separate)
    CORS(app)

    # Register routes from routes.py
    from app.routes import bp as main_bp
    app.register_blueprint(main_bp)

    return app
