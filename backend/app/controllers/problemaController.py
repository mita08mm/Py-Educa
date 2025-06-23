from flask import request
from app.services.problemaService import crear_problema

def crear_problema_controller():
    data = request.get_json()
    resultado, status_code = crear_problema(data)
    return resultado, status_code
