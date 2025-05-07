from flask import request, jsonify
from app.services.seccionService import get_all_secciones, create_seccion
from app.schemas.seccionSchema import SeccionSchema

seccion_schema = SeccionSchema()
secciones_schema = SeccionSchema(many=True)

def listar_secciones():
    secciones = get_all_secciones()
    return jsonify(secciones_schema.dump(secciones)), 200

def crear_seccion():
    data = request.get_json()
    errors = seccion_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    nueva = create_seccion(data)
    return jsonify(seccion_schema.dump(nueva)), 201
