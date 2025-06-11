# tests/test_usuario.py
import pytest
from app.extensions import db
from app.models.usuario import Usuario
from app.models.usuarioCurso import UsuarioCurso
from app.models.rol import Rol
from app.services.usuarioService import guardar_usuario, obtener_usuarios

@pytest.fixture
def rol_dummy(app):
    with app.app_context():
        rol = Rol(rol="Estudiante")
        db.session.add(rol)
        db.session.commit()
        return rol

def test_guardar_usuario(app, rol_dummy):
    with app.app_context():
        data = {
            "nombre": "Juan Perez",
            "usuario": "juanp",
            "email": "juan@test.com",
            "password": "123",
            "cod_rol": rol_dummy.cod_rol
        }

        usuario = Usuario(
            nombre=data["nombre"],
            usuario=data["usuario"],
            email=data["email"],
            password=data["password"],
            cod_rol=data["cod_rol"]
        )
        db.session.add(usuario)
        db.session.commit()

        assert usuario.cod_usuario is not None
        assert usuario.nombre == data["nombre"]

@pytest.fixture
def crear_usuarios_y_curso(app, rol_dummy):
    with app.app_context():
        u1 = Usuario(nombre="Usuario 1", usuario="u1", email="u1@test.com", password="123", cod_rol=rol_dummy.cod_rol)
        u2 = Usuario(nombre="Usuario 2", usuario="u2", email="u2@test.com", password="123", cod_rol=rol_dummy.cod_rol)
        db.session.add_all([u1, u2])
        db.session.commit()

        uc = UsuarioCurso(cod_usuario=u1.cod_usuario, cod_curso=1)
        db.session.add(uc)
        db.session.commit()

        return u1, u2

def test_obtener_usuarios(app, crear_usuarios_y_curso):
    u1, u2 = crear_usuarios_y_curso
    with app.app_context():
        usuarios = obtener_usuarios(1)
        assert len(usuarios) == 1
        assert usuarios[0]["cod_usuario"] == u1.cod_usuario
        assert usuarios[0]["nombre"] == u1.nombre
        assert usuarios[0]["usuario"] == u1.usuario
        assert usuarios[0]["email"] == u1.email
