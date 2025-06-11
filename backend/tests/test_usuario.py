import pytest
from app.extensions import db
from app.models.usuario import Usuario
from app.models.usuarioCurso import UsuarioCurso
from app.models.rol import Rol
from app.services.usuarioService import guardar_usuario, obtener_usuarios

@pytest.fixture
def rol_valido(app):
    with app.app_context():
        rol = Rol(cod_rol=1, nombre="Estudiante")  # Asegura que el rol cod_rol=1 existe
        db.session.merge(rol)  # merge evita error si ya existe
        db.session.commit()
        return rol

@pytest.fixture
def usuario_data(rol_valido):
    return {
        "nombre": "Juan Perez",
        "usuario": "juanperez",
        "password": "password123",
        "email": "juan.perez@example.com",
        "cod_rol": rol_valido.cod_rol
    }

@pytest.fixture
def crear_usuarios_y_curso(app, rol_valido):
    with app.app_context():
        u1 = Usuario(
            nombre="Usuario 1",
            usuario="user1",
            email="user1@test.com",
            password="password1",
            cod_rol=rol_valido.cod_rol
        )
        u2 = Usuario(
            nombre="Usuario 2",
            usuario="user2",
            email="user2@test.com",
            password="password2",
            cod_rol=rol_valido.cod_rol
        )
        db.session.add_all([u1, u2])
        db.session.commit()

        uc = UsuarioCurso(cod_usuario=u1.cod_usuario, cod_curso=1)
        db.session.add(uc)
        db.session.commit()

        return u1, u2

def test_guardar_usuario(app, usuario_data):
    with app.app_context():
        usuario = guardar_usuario(usuario_data)

        assert usuario is not None
        assert usuario.nombre == usuario_data["nombre"]
        assert usuario.cod_usuario is not None

        # Verificamos en DB
        usuario_db = Usuario.query.get(usuario.cod_usuario)
        assert usuario_db is not None
        assert usuario_db.nombre == usuario_data["nombre"]

def test_obtener_usuarios(app, crear_usuarios_y_curso):
    u1, u2 = crear_usuarios_y_curso
    with app.app_context():
        usuarios_curso_1 = obtener_usuarios(1)

        assert len(usuarios_curso_1) == 1
        assert usuarios_curso_1[0]["cod_usuario"] == u1.cod_usuario
        assert usuarios_curso_1[0]["nombre"] == u1.nombre
        assert usuarios_curso_1[0]["usuario"] == u1.usuario
        assert usuarios_curso_1[0]["email"] == u1.email
