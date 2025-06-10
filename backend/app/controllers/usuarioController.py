from app.services.usuarioService import guardar_usuario
from app.services.usuarioService import obtener_usuarios as obtener_usuarios_service

def crear_usuario(data):
    return guardar_usuario(data)

def obtener_usuarios(cod_curso):
    return obtener_usuarios_service(cod_curso)