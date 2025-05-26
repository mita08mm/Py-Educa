from flask import Flask
from .config import Config, TestingConfig
from .extensions import db, migrate, jwt
from .routes import register_routes
from app.models.modulo import Modulo
from app.models.seccion import Seccion
from flask_cors import CORS

def create_app(config_name="default"):
    app = Flask(__name__)
    config_by_name = {
        "default": Config,
        "testing": TestingConfig,
    }
    
    app.config.from_object(config_by_name[config_name])

    # Habilitar CORS para permitir peticiones desde el frontend
    CORS(app)
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    register_routes(app)

    return app
