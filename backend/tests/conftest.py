import pytest
from app import create_app
from app.extensions import db
from app.config import TestingConfig
from app.models.modulo import Modulo
from app.models.seccion import Seccion
from app.models.subseccion import Subseccion

@pytest.fixture(scope="function")
def app():
    app = create_app(TestingConfig)
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",  # Use in-memory SQLite
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
        "SECRET_KEY": "test-secret-key",
        "JWT_SECRET_KEY": "test-jwt-secret-key",
    })

    with app.app_context():
        db.create_all()  # Create all tables
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture(scope="function")
def client(app):
    return app.test_client()

@pytest.fixture(autouse=True)
def cleanup(app):
    with app.app_context():
        yield
        for table in reversed(db.metadata.sorted_tables):
            db.session.execute(table.delete())
        db.session.commit()

@pytest.fixture(autouse=True)
def setup_dependencies(app):
    with app.app_context():
        # Create módulo
        modulo = Modulo(cod_curso = 1, titulo_modulo="Módulo de prueba", descripcion_modulo="Descripción de prueba")
        db.session.add(modulo)
        db.session.flush()

        # Create sección
        seccion = Seccion(
            cod_modulo=modulo.cod_modulo,
            titulo_seccion="Sección de prueba",
            descripcion_seccion="Descripción de prueba"
        )
        db.session.add(seccion)
        db.session.flush()

        # Create subsección
        subseccion = Subseccion(
            cod_modulo=modulo.cod_modulo,
            cod_seccion=seccion.cod_seccion,
            titulo_subseccion="Subsección de prueba",
            descripcion_subseccion="Descripción de prueba"
        )
        db.session.add(subseccion)
        db.session.commit()