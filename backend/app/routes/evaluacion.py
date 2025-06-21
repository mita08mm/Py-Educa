from flask_restx import Namespace, Resource, fields
from app.controllers.evaluacionController import (
    crear_evaluacion_controller,
    obtener_evaluacion_por_modulo_controller
)

api = Namespace('evaluacion', description='Operaciones relacionadas con evaluacion')

evaluacion_model = api.model('Evaluacion', {
    'cod_modulo': fields.Integer(required=True, description='Codigo del módulo'),
    'titulo_evaluacion': fields.String(required=True, description='Título de la evaluación'),
    'descripcion_evaluacion': fields.String(required=False, description='Descripción de la evaluación')
})

@api.route('/')
class EvaluacionResource(Resource):
    @api.expect(evaluacion_model)
    def post(self):
        return crear_evaluacion_controller()

@api.route('/modulo/<int:cod_modulo>')
@api.param('cod_modulo', 'ID del módulo')
class EvaluacionPorModuloResource(Resource):
    def get(self, cod_modulo):
        return obtener_evaluacion_por_modulo_controller(cod_modulo)