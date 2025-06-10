from flask_restx import Namespace, Resource
from app.controllers import notaController

api = Namespace('nota', description='Operaciones relacionadas con notas')

@api.route('/')
class NotaResource(Resource):
    @api.doc(params={
        'cod_problema': 'Código del problema',
        'cod_usuario': 'Código del usuario'
    })
    @api.response(200, 'Nota obtenida exitosamente')
    @api.response(400, 'Parámetros requeridos faltantes')
    def get(self):
        """Obtener nota de un usuario para un problema específico"""
        return notaController.get_nota_controller()

@api.route('/calificar')
class CalificarResource(Resource):
    @api.response(200, 'Problema calificado exitosamente')
    @api.response(400, 'Datos de entrada inválidos')
    def post(self):
        """Calificar un problema"""
        return notaController.calificar_problema_controller()

@api.route('/usuario/<int:cod_usuario>')
class NotasUsuarioResource(Resource):
    @api.doc(params={'cod_usuario': 'Código del usuario'})
    @api.response(200, 'Notas obtenidas exitosamente')
    @api.response(400, 'Código de usuario inválido')
    @api.response(404, 'No se encontraron notas')
    def get(self, cod_usuario):
        """Obtener todas las notas de un usuario"""
        return notaController.get_notas_controller(cod_usuario)
