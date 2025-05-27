from flask import Blueprint
from app.controllers import notaController

nota_bp = Blueprint('nota', __name__)

nota_bp.route("/calificar", methods=["POST"])(notaController.calificar_problema_controller)
nota_bp.route('/', methods=['GET'])(notaController.get_nota_controller)