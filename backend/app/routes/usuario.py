from flask_restx import Namespace, Resource, fields
from app.controllers.usuarioController import crear_usuario

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
