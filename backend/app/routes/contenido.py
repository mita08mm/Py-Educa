from flask_restx import Namespace, Resource
from app.controllers import contenidoController

api = Namespace('contenido', description='Operaciones relacionadas con contenido')

@api.route('/<int:cod_subseccion>')
class ContenidoSubseccionResource(Resource):
    def get(self, cod_subseccion):
        return contenidoController.get_contenido_por_subseccion_controller(cod_subseccion)

    def post(self, cod_subseccion):
        return contenidoController.agregar_contenido_controller(cod_subseccion)

@api.route('/<int:cod_contenido>')
class ContenidoResource(Resource):
    def delete(self, cod_contenido):
        return contenidoController.eliminar_contenido_controller(cod_contenido)

    def put(self, cod_contenido):
        return contenidoController.editar_contenido_controller(cod_contenido)
