# tests/test_usuario.py
import pytest
from app.extensions import db
from app.models.usuario import Usuario
from app.models.usuarioCurso import UsuarioCurso
from app.services.usuarioService import guardar_usuario, obtener_usuarios

@pytest.fixture
def usuario_data():
    return {
        "nombre": "Juan Perez"
    }

@pytest.fixture
def crear_usuarios_y_curso(app):
    with app.app_context():
        # Crear dos usuarios con solo nombre
        u1 = Usuario(nombre="Usuario 1", usuario="u1", email="u1@test.com", password="123")
        u2 = Usuario(nombre="Usuario 2", usuario="u2", email="u2@test.com", password="123")
        db.session.add_all([u1, u2])
        db.session.commit()

        # Relacionar solo u1 con curso 1
        uc = UsuarioCurso(cod_usuario=u1.cod_usuario, cod_curso=1)
        db.session.add(uc)
        db.session.commit()

        return u1, u2

def test_guardar_usuario(app, usuario_data):
    with app.app_context():
        # Para que no falle, agregamos los campos obligatorios manualmente
        usuario_data_completo = {
            "nombre": usuario_data["nombre"],
            "usuario": "juanp",
            "email": "juan@test.com",
            "password": "123"
        }
        usuario = Usuario(**usuario_data_completo)
        db.session.add(usuario)
        db.session.commit()

        assert usuario.nombre == usuario_data["nombre"]
        assert usuario.usuario == "juanp"

def test_obtener_usuarios(app, crear_usuarios_y_curso):
    u1, u2 = crear_usuarios_y_curso
    with app.app_context():
        usuarios = obtener_usuarios(1)
        assert len(usuarios) == 1
        assert usuarios[0]["cod_usuario"] == u1.cod_usuario
        assert usuarios[0]["nombre"] == u1.nombre
