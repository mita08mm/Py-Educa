def register_routes(app):
    from .usuario import usuario_bp
    from .test import test_bp
    from .seccion import seccion_bp
    from .subseccion import subseccion_bp
    app.register_blueprint(usuario_bp, url_prefix="/api/usuarios")
    app.register_blueprint(test_bp, url_prefix="/api/test")
    app.register_blueprint(seccion_bp, url_prefix="/secciones")
    app.register_blueprint(subseccion_bp, url_prefix="/subsecciones")