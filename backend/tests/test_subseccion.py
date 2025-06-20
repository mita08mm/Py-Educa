import pytest
from app.services.subseccionService import get_all_subsecciones, create_subseccion
from app.models.subseccion import Subseccion
from app.extensions import db

# Test para crear subsección exitosamente
def test_create_subseccion(app):
    data = {
        "cod_modulo": 1,
        "cod_seccion": 1,
        "titulo_subseccion": "Introducción a Flask"
    }

    with app.app_context():
        subseccion = create_subseccion(data)

        assert isinstance(subseccion, Subseccion)
        assert subseccion.titulo_subseccion == "Introducción a Flask"
        assert subseccion.cod_modulo == 1
        assert subseccion.cod_seccion == 1

        subseccion_db = Subseccion.query.get(subseccion.cod_subseccion)
        assert subseccion_db is not None
        assert subseccion_db.titulo_subseccion == "Introducción a Flask"


# Test para obtener lista de subsecciones
def test_get_all_subsecciones(app):
    with app.app_context():
        # Asegúrate de que haya al menos una subsección
        nueva = Subseccion(
            cod_modulo=1,
            cod_seccion=1,
            titulo_subseccion="Subsección de prueba"
        )
        db.session.add(nueva)
        db.session.commit()

        subsecciones = get_all_subsecciones()
        assert isinstance(subsecciones, list)
        assert len(subsecciones) >= 1
        assert any(s.titulo_subseccion == "Subsección de prueba" for s in subsecciones)
