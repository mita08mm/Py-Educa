from flask import Blueprint
from app.controllers import seccionController

seccion_bp = Blueprint('seccion', __name__)

seccion_bp.route('/', methods=['GET'])(seccionController.listar_secciones)
seccion_bp.route('/', methods=['POST'])(seccionController.crear_seccion)
