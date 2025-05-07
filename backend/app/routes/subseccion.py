from flask import Blueprint
from app.controllers import subseccionController

subseccion_bp = Blueprint('subseccion', __name__)

subseccion_bp.route('/', methods=['GET'])(subseccionController.listar_subsecciones)
subseccion_bp.route('/', methods=['POST'])(subseccionController.crear_subseccion)
