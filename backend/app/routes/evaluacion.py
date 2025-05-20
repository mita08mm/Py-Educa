from flask import Blueprint, request
from app.controllers.evaluacionController import crear_evaluacion_controller

evaluacion_bp = Blueprint('evaluacion', __name__)

@evaluacion_bp.route('/', methods=['POST'])
def crear_evaluacion():
    data = request.get_json()
    return crear_evaluacion_controller(data)
