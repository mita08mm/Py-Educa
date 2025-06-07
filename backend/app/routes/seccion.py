from flask_restx import Namespace, Resource
from app.controllers import seccionController

api = Namespace('seccion', description='Operaciones relacionadas con secciones')

@api.route('/')
class SeccionListResource(Resource):
    def get(self):
        return seccionController.listar_secciones()

    def post(self):
        return seccionController.crear_seccion()
