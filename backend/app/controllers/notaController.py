from flask import request, jsonify
from app.services.notaService import NotaService
from app.schemas.notaSchema import NotaSchema

nota_schema = NotaSchema()

def calificar_problema_controller():
    json_data = request.get_json()

    if not json_data:
        return jsonify({"error": "No input data provided"}), 400

    errors = nota_schema.validate(json_data)
    if errors:
        return jsonify(errors), 422

    nota = NotaService.calificar_problema(json_data)
    return jsonify(nota_schema.dump(nota)), 200
