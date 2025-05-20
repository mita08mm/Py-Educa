from flask import jsonify
from app.services.evaluacionService import crear_seccion_y_evaluacion

def crear_evaluacion_controller(data):
    try:
        evaluacion = crear_seccion_y_evaluacion(data)
        return jsonify(evaluacion), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
