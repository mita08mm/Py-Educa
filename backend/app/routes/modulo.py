from flask import Blueprint
from app.controllers import moduloController

modulo_bp = Blueprint('modulo', __name__)

modulo_bp.route('/', methods=['GET'])(moduloController.listar_modulos)
modulo_bp.route('/', methods=['POST'])(moduloController.crear_modulo_handler)
