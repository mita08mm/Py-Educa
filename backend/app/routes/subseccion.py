from flask_restx import Namespace, Resource
from app.controllers import subseccionController

api = Namespace('subseccion', description='Operaciones relacionadas con subsecciones')

@api.route('/')
class SubseccionListResource(Resource):
    def get(self):
        return subseccionController.listar_subsecciones()

    def post(self):
        return subseccionController.crear_subseccion()
