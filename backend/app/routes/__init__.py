def register_routes(app):
    from .usuario import usuario_bp
    from .test import test_bp
    from .seccion import seccion_bp
    from .subseccion import subseccion_bp
    from .modulo import modulo_bp
    from .curso import curso_bp
    from .contenido import contenido_bp
    from .nota import nota_bp
    from .evaluacion import evaluacion_bp
    from .problema import problema_bp
    app.register_blueprint(usuario_bp, url_prefix="/api/usuarios")
    app.register_blueprint(test_bp, url_prefix="/api/test")
    app.register_blueprint(seccion_bp, url_prefix="/secciones")
    app.register_blueprint(subseccion_bp, url_prefix="/subsecciones")
    app.register_blueprint(modulo_bp, url_prefix="/modulos")
    app.register_blueprint(curso_bp, url_prefix="/cursos")
    app.register_blueprint(contenido_bp, url_prefix="/contenido")
    app.register_blueprint(nota_bp, url_prefix="/nota")
    app.register_blueprint(evaluacion_bp, url_prefix="/evaluacion")
    app.register_blueprint(problema_bp, url_prefix="/problema")