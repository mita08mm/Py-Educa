import pytest
from app.models.seccion import Seccion
from app.models.modulo import Modulo
from app.extensions import db
from app.services.seccionService import get_all_secciones, create_seccion

@pytest.fixture
def seccion_data():
    return {
        'titulo_seccion': 'Test Seccion',
        'descripcion_seccion': 'Test Description',
        'cod_modulo': 1
    }

def test_crear_seccion(app, seccion_data):
    with app.app_context():
        nueva_seccion = create_seccion(seccion_data)
        
        assert nueva_seccion is not None
        assert nueva_seccion.titulo_seccion == seccion_data['titulo_seccion']
        assert nueva_seccion.descripcion_seccion == seccion_data['descripcion_seccion']
        assert nueva_seccion.cod_modulo == seccion_data['cod_modulo']

def test_crear_seccion_sin_titulo(app):
    with app.app_context():
        seccion_data = {
            'descripcion_seccion': 'Test Description',
            'cod_modulo': 1
        }
        
        with pytest.raises(Exception):
            create_seccion(seccion_data)

def test_obtener_todas_secciones(app, seccion_data):
    with app.app_context():
        # Crear algunas secciones de prueba
        seccion1 = create_seccion(seccion_data)
        
        seccion_data2 = seccion_data.copy()
        seccion_data2['titulo_seccion'] = 'Test Seccion 2'
        seccion2 = create_seccion(seccion_data2)

        # Obtener todas las secciones
        secciones = get_all_secciones()
        
        # Verificar que se obtuvieron todas las secciones
        assert len(secciones) >= 2
        assert any(s.titulo_seccion == 'Test Seccion' for s in secciones)
        assert any(s.titulo_seccion == 'Test Seccion 2' for s in secciones)

def test_seccion_modelo(app, seccion_data):
    with app.app_context():
        seccion = Seccion(
            titulo_seccion=seccion_data['titulo_seccion'],
            descripcion_seccion=seccion_data['descripcion_seccion'],
            cod_modulo=seccion_data['cod_modulo']
        )
        
        db.session.add(seccion)
        db.session.commit()
        
        assert seccion.cod_seccion is not None
        assert seccion.titulo_seccion == seccion_data['titulo_seccion']
        assert seccion.descripcion_seccion == seccion_data['descripcion_seccion']
        assert seccion.cod_modulo == seccion_data['cod_modulo']

def test_relacion_modulo_seccion(app):
    with app.app_context():
        # Crear un módulo
        modulo = Modulo(
            cod_curso=1,
            titulo_modulo="Módulo Test",
            descripcion_modulo="Descripción Test"
        )
        db.session.add(modulo)
        db.session.flush()

        # Crear una sección asociada al módulo
        seccion = Seccion(
            titulo_seccion="Sección Test",
            descripcion_seccion="Descripción Test",
            cod_modulo=modulo.cod_modulo
        )
        db.session.add(seccion)
        db.session.commit()

        # Verificar la relación
        assert seccion.cod_modulo == modulo.cod_modulo
