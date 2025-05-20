from flask import jsonify
from app.services.evaluacionService import crear_seccion_y_evaluacion, obtener_evaluacion_completa

def crear_evaluacion_controller(data):
    try:
        evaluacion = crear_seccion_y_evaluacion(data)
        return jsonify(evaluacion), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

def obtener_evaluacion_completa_controller(cod_evaluacion):
    try:
        data = obtener_evaluacion_completa(cod_evaluacion)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500