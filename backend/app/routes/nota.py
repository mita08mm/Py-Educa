from flask_restx import Namespace, Resource
from app.controllers import notaController

api = Namespace('nota', description='Operaciones relacionadas con notas')

@api.route('/')
class NotaResource(Resource):
    def get(self):
        return notaController.get_nota_controller()

@api.route('/calificar')
class CalificarResource(Resource):
    def post(self):
        return notaController.calificar_problema_controller()
