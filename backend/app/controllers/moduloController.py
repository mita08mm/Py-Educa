from flask import request, jsonify
from app.services.moduloService import crear_modulo
from app.schemas.moduloSchema import modulo_schema

def crear_modulo_handler():
    data = request.get_json()
    
    # Validación mínima
    if not data:
        return jsonify({'error': 'Datos no proporcionados'}), 400
    
    modulo, error = crear_modulo(data)
    
    if error:
        return jsonify({'error': error}), 400  # 400 para errores de validación
    
    return modulo_schema.jsonify(modulo), 201