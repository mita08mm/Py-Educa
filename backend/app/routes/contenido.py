from flask_restx import Namespace, Resource, reqparse, fields
from app.controllers import contenidoController

api = Namespace('contenido', description='Operaciones relacionadas con contenido')

contenido_form_model = api.model('ContenidoFormData', {
    'cod_modulo': fields.Integer(required=True, description='ID del módulo'),
    'cod_seccion': fields.Integer(required=True, description='ID de la sección'),
    'descripcion': fields.String(required=True, description='Descripción'),
    'link': fields.String(required=False, description='Link'),
    'imagen': fields.String(description='Archivo de imagen (probar con postman)')
})

@api.route('/<int:cod_subseccion>')
@api.param('cod_subseccion', 'ID de la subsección')
class ContenidoSubseccionResource(Resource):
    def get(self, cod_subseccion):
        return contenidoController.get_contenido_por_subseccion_controller(cod_subseccion)

    @api.expect(contenido_form_model)
    @api.doc(consumes=["multipart/form-data"])
    def post(self, cod_subseccion):
        return contenidoController.agregar_contenido_controller(cod_subseccion)

@api.route('/<int:cod_contenido>')
class ContenidoResource(Resource):
    def delete(self, cod_contenido):
        return contenidoController.eliminar_contenido_controller(cod_contenido)

    def put(self, cod_contenido):
        return contenidoController.editar_contenido_controller(cod_contenido)
