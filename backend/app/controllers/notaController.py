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

def get_nota_controller():
    cod_problema = request.args.get("cod_problema", type=int)
    cod_usuario = request.args.get("cod_usuario", type=int)

    if cod_problema is None or cod_usuario is None:
        return jsonify({"error": "cod_problema y cod_usuario son requeridos"}), 400

    nota = NotaService.obtener_nota(cod_problema, cod_usuario)

    if nota is None:
        return jsonify({"error": "Nota no encontrada"}), 404

    return jsonify(nota_schema.dump(nota)), 200