from flask import Blueprint
from app.controllers import contenidoController

contenido_bp = Blueprint('contenido', __name__)

@contenido_bp.route('/<int:cod_subseccion>', methods=['GET'])
def obtener_contenido(cod_subseccion):
    return contenidoController.get_contenido_por_subseccion_controller(cod_subseccion)

@contenido_bp.route('/<int:cod_subseccion>', methods=['POST'])
def agregar_contenido(cod_subseccion):
    return contenidoController.agregar_contenido_controller(cod_subseccion)

@contenido_bp.route('/<int:cod_contenido>', methods=['DELETE'])
def eliminar_contenido(cod_contenido):
    return contenidoController.eliminar_contenido_controller(cod_contenido)

@contenido_bp.route('/<int:cod_contenido>', methods=['PUT'])
def editar_contenido(cod_contenido):
    return contenidoController.editar_contenido_controller(cod_contenido)