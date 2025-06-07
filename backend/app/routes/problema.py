from flask import Blueprint
from app.controllers.problemaController import crear_problema_controller

problema_bp = Blueprint("problema", __name__)

@problema_bp.route("/crear", methods=["POST"])
def crear_problema():
    return crear_problema_controller()
