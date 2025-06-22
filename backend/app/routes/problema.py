from flask_restx import Namespace, Resource, fields
from app.controllers.problemaController import crear_problema_controller

api = Namespace('problema', description='Operaciones relacionadas con problema')

problema_model = api.model('Problema', {
    'cod_evaluacion': fields.Integer(required=True, description='Código de la evaluación'),
    'titulo_problema': fields.String(required=True, description='Título del problema'),
    'descripcion_problema': fields.String(required=True, description='Descripción del problema'),
    'input': fields.String(required=False, description='Entrada de prueba para el problema'),
    'output': fields.String(required=False, description='Salida esperada de la entrada de prueba'),
    'input_ejemplo': fields.String(required=False),
    'output_ejemplo': fields.String(required=False),
    'editor': fields.String(required=False, description='Plantilla de codigo del problema'),
})

@api.route('/crear')
class Problema(Resource):
    
    @api.expect(problema_model)
    def post(self):
        return crear_problema_controller()
