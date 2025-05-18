from flask import Blueprint
from app.controllers import contenidoController

contenido_bp = Blueprint('contenido', __name__)

@contenido_bp.route('/<int:cod_subseccion>', methods=['GET'])
def obtener_contenido(cod_subseccion):
    return contenidoController.get_contenido_por_subseccion_controller(cod_subseccion)

@contenido_bp.route('/<int:cod_subseccion>', methods=['POST'])
def agregar_contenido(cod_subseccion):
    return contenidoController.agregar_contenido_controller(cod_subseccion)
