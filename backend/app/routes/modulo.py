from flask_restx import Namespace, Resource
from app.controllers import moduloController

api = Namespace('modulo', description='Operaciones relacionadas con módulos')

@api.route('/')
class ModuloListResource(Resource):
    def get(self):
        return moduloController.listar_modulos()

    def post(self):
        return moduloController.crear_modulo_handler()
