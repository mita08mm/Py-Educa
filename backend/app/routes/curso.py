from flask import Blueprint
from app.controllers import cursoController

curso_bp = Blueprint('curso', __name__)

curso_bp.route('/', methods=['GET'])(cursoController.listar_cursos)
curso_bp.route('/', methods=['POST'])(cursoController.crear_curso_handler) 