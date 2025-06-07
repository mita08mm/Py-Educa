from flask_restx import Namespace, Resource, fields
from app.controllers import moduloController

api = Namespace('modulo', description='Operaciones relacionadas con módulos')

modulo_model = api.model('Modulo', {
    'cod_curso': fields.Integer(required=True, description='ID del curso al que pertenece el módulo'),
    'titulo_modulo': fields.String(required=True, description='Título del módulo'),
    'descripcion_modulo': fields.String(required=True, description='Descripción del módulo'),
})

@api.route('/')
class ModuloListResource(Resource):
     
    def get(self):
        return moduloController.listar_modulos()

    @api.expect(modulo_model)
    @api.doc(description='Crea un nuevo módulo')
    def post(self):
        return moduloController.crear_modulo_handler()
