from flask import Blueprint
from app.controllers.notaController import calificar_problema_controller

nota_bp = Blueprint('nota', __name__)

nota_bp.route("/calificar", methods=["POST"])(calificar_problema_controller)
