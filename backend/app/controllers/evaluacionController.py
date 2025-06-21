from flask import request
from app.services.evaluacionService import crear_evaluacion, obtener_evaluacion_por_modulo

def crear_evaluacion_controller():
    data = request.get_json()
    resultado, status_code = crear_evaluacion(data)
    return resultado, status_code

def obtener_evaluacion_por_modulo_controller(cod_modulo):
    resultado, status_code = obtener_evaluacion_por_modulo(cod_modulo)
    return resultado, status_code