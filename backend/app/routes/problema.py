from flask_restx import Namespace, Resource, fields
from app.controllers.problemaController import crear_problema_controller

api = Namespace('problema', description='Operaciones relacionadas con problema')

ejemplo_model = api.model('Ejemplo', {
    'input_ejemplo': fields.String(required=True, description='Entrada del ejemplo'),
    'output_ejemplo': fields.String(required=True, description='Salida esperada del ejemplo')
})

problema_model = api.model('Problema', {
    'cod_evaluacion': fields.Integer(required=True, description='Código de la evaluación'),
    'cod_modulo': fields.Integer(required=True, description='Código del módulo'),
    'cod_seccion': fields.Integer(required=True, description='Código de la sección'),
    'titulo_problema': fields.String(required=True, description='Título del problema'),
    'descripcion_problema': fields.String(required=True, description='Descripción del problema'),
    'input': fields.String(required=True, description='Entrada de prueba para el problema'),
    'output': fields.String(required=True, description='Salida esperada de la entrada de prueba'),
    'editor': fields.String(required=False, description='Plantilla de codigo del problema'),
    'ejemplos': fields.List(fields.Nested(ejemplo_model), required=True, description='Lista de ejemplos de entrada/salida')
})

@api.route('/crear')
class Problema(Resource):
    
    @api.expect(problema_model)
    def post(self):
        return crear_problema_controller()
