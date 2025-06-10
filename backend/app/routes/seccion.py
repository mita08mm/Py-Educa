from flask_restx import Namespace, Resource, fields
from app.controllers import seccionController

api = Namespace('seccion', description='Operaciones relacionadas con secciones')

seccion_model = api.model('Seccion', {
    'titulo_seccion': fields.String(required=True, description='Título de la sección'),
    'descripcion_seccion': fields.String(required=True, description='Descripción de la sección'),
    'cod_curso': fields.Integer(required=True, description='Código del curso al que pertenece')
})

@api.route('/')
class SeccionListResource(Resource):
    @api.doc('listar_secciones')
    @api.response(200, 'Lista de secciones obtenida exitosamente')
    def get(self):
        """Obtiene todas las secciones disponibles"""
        return seccionController.listar_secciones()

    @api.doc('crear_seccion')
    @api.expect(seccion_model)
    @api.response(201, 'Sección creada exitosamente')
    @api.response(400, 'Datos de entrada inválidos')
    def post(self):
        """Crea una nueva sección"""
        return seccionController.crear_seccion()
