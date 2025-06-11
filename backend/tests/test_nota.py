import pytest
from app.models.nota import Nota
from app.services.notaService import NotaService
from app.extensions import db

@pytest.fixture
def nota_data():
    return {
        "cod_problema": 1,
        "cod_usuario": 1,
        "nota": 8,
        "nota_total": 10
    }

def test_calificar_problema_crea_nota(app, nota_data):
    with app.app_context():
        # Aseguramos que no hay nota previa
        nota = Nota.query.get((nota_data["cod_problema"], nota_data["cod_usuario"]))
        assert nota is None

        # Ejecutamos método que debe crear nueva nota
        resultado = NotaService.calificar_problema(nota_data)

        assert resultado is not None
        assert resultado.nota == nota_data["nota"]
        assert resultado.nota_total == nota_data["nota_total"]

        # Verificar que quedó guardada en DB
        nota_db = Nota.query.get((nota_data["cod_problema"], nota_data["cod_usuario"]))
        assert nota_db is not None
        assert nota_db.nota == nota_data["nota"]

def test_calificar_problema_actualiza_nota(app, nota_data):
    with app.app_context():
        # Primero creamos una nota manualmente
        nota = Nota(
            cod_problema=nota_data["cod_problema"],
            cod_usuario=nota_data["cod_usuario"],
            nota=5,
            nota_total=10
        )
        db.session.add(nota)
        db.session.commit()

        # Modificamos datos para actualizar
        nota_data["nota"] = 9
        nota_data["nota_total"] = 10

        resultado = NotaService.calificar_problema(nota_data)

        assert resultado.nota == 9
        assert resultado.nota_total == 10

        # Comprobamos que en DB quedó actualizado
        nota_db = Nota.query.get((nota_data["cod_problema"], nota_data["cod_usuario"]))
        assert nota_db.nota == 9

def test_obtener_nota_devuelve_nota(app, nota_data):
    with app.app_context():
        # Creamos nota primero
        nota = Nota(
            cod_problema=nota_data["cod_problema"],
            cod_usuario=nota_data["cod_usuario"],
            nota=7,
            nota_total=10
        )
        db.session.add(nota)
        db.session.commit()

        nota_obtenida = NotaService.obtener_nota(nota_data["cod_problema"], nota_data["cod_usuario"])

        assert nota_obtenida is not None
        assert nota_obtenida.nota == 7

def test_obtener_nota_no_existe(app):
    with app.app_context():
        nota = NotaService.obtener_nota(9999, 9999)
        assert nota is None
