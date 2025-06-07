from flask_restx import Namespace, Resource, fields
from app.controllers.evaluacionController import crear_evaluacion_controller, obtener_evaluacion_completa_controller

api = Namespace('evaluacion', description='Operaciones relacionadas con evaluacion')

evaluacion_model = api.model('Evaluacion', {
    'cod_modulo': fields.Integer(required=True, description='Codigo modulo'),
    'titulo_seccion': fields.String(required=True, description='Título de la sección'),
    'descripcion_seccion': fields.String(required=True, description='Descripción de la sección')
})

@api.route('/')
class EvaluacionResource(Resource):
    @api.expect(evaluacion_model)
    def post(self):
        return crear_evaluacion_controller()

@api.route('/<int:cod_evaluacion>')
@api.param('cod_evaluacion', 'ID de la evaluación')
class EvaluacionGetResource(Resource):
    def get(self, cod_evaluacion):
        return obtener_evaluacion_completa_controller(cod_evaluacion)