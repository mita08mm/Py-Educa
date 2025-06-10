from flask_restx import Namespace, Resource, fields
from flask import request
from app.controllers.usuarioController import crear_usuario
from app.controllers import usuarioController

api = Namespace('usuarios', description='Operaciones relacionadas con usuarios')

usuario_model = api.model('Usuario', {
    'nombre': fields.String(required=True, description='Nombre del usuario'),
    'email': fields.String(required=True, description='Correo electrónico')
})

@api.route('/')
class UsuarioResource(Resource):
    @api.expect(usuario_model)
    @api.response(201, 'Usuario creado exitosamente')
    def post(self):
        data = api.payload
        nuevo_usuario = crear_usuario(data)
        return nuevo_usuario.to_dict(), 201
    
    @api.doc(params={'cod_curso': 'Código del curso para filtrar usuarios'})
    @api.response(200, 'Lista de usuarios obtenida exitosamente')
    @api.response(400, 'Parámetros inválidos')
    @api.response(404, 'No se encontraron usuarios')
    def get(self):
        """Obtener lista de usuarios.
        
        Retorna una lista de usuarios que pertenecen a un curso específico si se proporciona cod_curso
        """
        cod_curso = request.args.get('cod_curso', type=int)
        return usuarioController.obtener_usuarios(cod_curso)
