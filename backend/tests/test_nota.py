import pytest
from app.models.nota import Nota
from app.models.problema import Problema
from app.models.usuario import Usuario
from app.services.notaService import NotaService

@pytest.fixture
def setup_test_data(app):
    with app.app_context():
        # Crear usuario de prueba
        usuario = Usuario(
            nombre="Usuario Test",
            usuario="testuser",
            password="123456",
            email="test@test.com",
            cod_rol=1                         
        )
        app.db.session.add(usuario)
        app.db.session.flush()

        # Crear problema de prueba
        problema = Problema(
            titulo_problema="Problema Test",
            descripcion_problema="Descripción Test",
            input="input de prueba",
            output="output esperado",
            cod_subseccion=1
        )
        app.db.session.add(problema)
        app.db.session.commit()

        return {
            'cod_usuario': usuario.cod_usuario,
            'cod_problema': problema.cod_problema
        }

def test_calificar_problema_nuevo(app, setup_test_data):
    with app.app_context():
        data = {
            "cod_problema": setup_test_data['cod_problema'],
            "cod_usuario": setup_test_data['cod_usuario'],
            "nota": 85,
            "nota_total": 100
        }

        nota, _ = NotaService.calificar_problema(data)

        assert nota is not None
        assert nota.nota == 85
        assert nota.nota_total == 100
        assert nota.cod_problema == setup_test_data['cod_problema']
        assert nota.cod_usuario == setup_test_data['cod_usuario']

def test_calificar_problema_existente(app, setup_test_data):
    with app.app_context():
        # Crear nota inicial
        nota_inicial = Nota(
            cod_problema=setup_test_data['cod_problema'],
            cod_usuario=setup_test_data['cod_usuario'],
            nota=70,
            nota_total=100
        )
        app.db.session.add(nota_inicial)
        app.db.session.commit()

        # Actualizar nota
        data = {
            "cod_problema": setup_test_data['cod_problema'],
            "cod_usuario": setup_test_data['cod_usuario'],
            "nota": 90,
            "nota_total": 100
        }
        
        nota_actualizada, _ = NotaService.calificar_problema(data)
        
        assert nota_actualizada.nota == 90

def test_obtener_nota(app, setup_test_data):
    with app.app_context():
        # Crear nota de prueba
        nota_test = Nota(
            cod_problema=setup_test_data['cod_problema'],
            cod_usuario=setup_test_data['cod_usuario'],
            nota=85,
            nota_total=100
        )
        app.db.session.add(nota_test)
        app.db.session.commit()

        # Obtener nota
        nota, _ = NotaService.obtener_nota(
            setup_test_data['cod_problema'],
            setup_test_data['cod_usuario']
        )
        
        assert nota is not None
        assert nota.nota == 85
        assert nota.nota_total == 100

def test_obtener_nota_inexistente(app, setup_test_data):
    with app.app_context():
        nota, _ = NotaService.obtener_nota(
            setup_test_data['cod_problema'],
            setup_test_data['cod_usuario']
        )
        
        assert nota is None

def test_obtener_notas_de_usuario(app, setup_test_data):
    with app.app_context():
        # Crear nota de prueba
        nota_test = Nota(
            cod_problema=setup_test_data['cod_problema'],
            cod_usuario=setup_test_data['cod_usuario'],
            nota=85,
            nota_total=100
        )
        app.db.session.add(nota_test)
        app.db.session.commit()

        # Obtener notas del usuario
        notas = NotaService.obtener_notas_de_usuario(
            setup_test_data['cod_usuario']
        )
        
        assert notas is not None
        assert len(notas) == 1
        assert notas[0]['nota'] == float(85)
        assert notas[0]['nota_total'] == float(100)
        assert notas[0]['titulo_problema'] == "Problema Test"
