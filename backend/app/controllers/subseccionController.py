from flask import request, jsonify
from app.services.subseccionService import get_all_subsecciones, create_subseccion
from app.schemas.subseccionSchema import SubseccionSchema

subseccion_schema = SubseccionSchema()
subsecciones_schema = SubseccionSchema(many=True)

def listar_subsecciones():
    subsecciones = get_all_subsecciones()
    return jsonify(subsecciones_schema.dump(subsecciones)), 200

def crear_subseccion():
    data = request.get_json()
    errors = subseccion_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    nueva = create_subseccion(data)
    return jsonify(subseccion_schema.dump(nueva)), 201
