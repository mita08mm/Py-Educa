import pytest
import base64
from app.services.cursoService import crear_curso, get_all_cursos
from app.models.curso import Curso
from app.extensions import db

def test_crear_curso_con_imagen(app):
    # Imagen pequeña base64 válida (1x1 px png)
    imagen_base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgWRGV1sAAAAASUVORK5CYII="
    
    data = {
        "titulo_curso": "Curso con Imagen",
        "descripcion_curso": "Descripcion ejemplo",
        "imagen_curso": imagen_base64
    }

    with app.app_context():
        curso, error = crear_curso(data)

        assert error is None
        assert curso.titulo_curso == "Curso con Imagen"
        assert curso.descripcion_curso == "Descripcion ejemplo"
        assert curso.imagen_curso is not None
        assert isinstance(curso.imagen_curso, (bytes, bytearray))


def test_crear_curso_sin_imagen(app):
    data = {
        "titulo_curso": "Curso sin Imagen",
        "descripcion_curso": "Descripcion ejemplo"
    }

    with app.app_context():
        curso, error = crear_curso(data)

        assert error is None
        assert curso.titulo_curso == "Curso sin Imagen"
        assert curso.descripcion_curso == "Descripcion ejemplo"
        assert curso.imagen_curso is None


def test_crear_curso_imagen_invalida(app, capsys):
    # Base64 inválido (texto random)
    data = {
        "titulo_curso": "Curso Imagen Invalida",
        "descripcion_curso": "Descripcion ejemplo",
        "imagen_curso": "data:image/png;base64,@@@invalidbase64@@@"
    }

    with app.app_context():
        curso, error = crear_curso(data)

        # Debería seguir creando curso aunque la imagen falle
        assert error is None
        assert curso.titulo_curso == "Curso Imagen Invalida"
        assert curso.imagen_curso is None

        # Chequeamos que se imprimió error por decodificación
        captured = capsys.readouterr()
        assert "Error decodificando imagen" in captured.out


def test_get_all_cursos(app):
    with app.app_context():
        cursos = get_all_cursos()
        assert isinstance(cursos, list)
        # Cada item debe ser instancia de Curso
        for curso in cursos:
            assert isinstance(curso, Curso)
