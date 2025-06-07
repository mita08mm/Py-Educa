from flask import Flask
from .config import Config
from .extensions import db, migrate, jwt
from .routes import register_routes
from flask_cors import CORS

def create_app(config_class=Config):
    """Factory de aplicación con configuración flexible"""
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    CORS(app)

    register_routes(app)

    return app
