from flask import Blueprint
from app.controllers.moduloController import crear_modulo_handler

modulos_bp = Blueprint('modulos', __name__)

modulos_bp.route('/', methods=['POST'])(crear_modulo_handler)