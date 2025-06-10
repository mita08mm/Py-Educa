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
    
    def get(self):
        cod_curso = request.args.get('cod_curso', type=int)
        return usuarioController.obtener_usuarios(cod_curso)
