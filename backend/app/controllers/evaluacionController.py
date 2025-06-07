from flask import request
from app.services.evaluacionService import crear_seccion_y_evaluacion, obtener_evaluacion_completa

def crear_evaluacion_controller():
    try:
        data = request.get_json()
        evaluacion = crear_seccion_y_evaluacion(data)
        return evaluacion, 201
    except Exception as e:
        return {"error": str(e)}, 400

def obtener_evaluacion_completa_controller(cod_evaluacion):
    try:
        data = obtener_evaluacion_completa(cod_evaluacion)
        return data, 200
    except Exception as e:
        return {"error": str(e)}, 500