import pytest
from app.services.problemaService import crear_problema_con_ejemplos  # Asegúrate que este sea el path correcto
from app.models.problema import Problema
from app.models.ejemplo import Ejemplo
from app.extensions import db

def test_crear_problema_con_ejemplos(app):
    data = {
        "cod_evaluacion": 1,
        "cod_modulo": 1,
        "cod_seccion": 1,
        "titulo_problema": "Sumar dos números",
        "descripcion_problema": "Dado dos números, sumarlos.",
        "input": "2 3",
        "output": "5",
        "editor": "editor_test",  # <- Nuevo campo agregado
        "ejemplos": [
            {"input_ejemplo": "1 1", "output_ejemplo": "2"},
            {"input_ejemplo": "2 5", "output_ejemplo": "7"},
        ]
    }

    with app.app_context():
        problema = crear_problema_con_ejemplos(data)

        # Verifica que el problema se guardó
        assert isinstance(problema.cod_problema, int)

        problema_db = Problema.query.get(problema.cod_problema)
        assert problema_db.titulo_problema == "Sumar dos números"
        assert problema_db.editor == "editor_test"  # <- Verificación del nuevo campo

        # Verifica los ejemplos relacionados
        ejemplos = Ejemplo.query.filter_by(cod_problema=problema.cod_problema).all()
        assert len(ejemplos) == 2
        assert ejemplos[0].input_ejemplo == "1 1"
        assert ejemplos[1].output_ejemplo == "7"
