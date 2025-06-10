from flask import request
from app.services.notaService import NotaService
from app.schemas.notaSchema import NotaSchema

nota_schema = NotaSchema()

def calificar_problema_controller():
    json_data = request.get_json()

    if not json_data:
        return {"error": "No input data provided"}, 400

    errors = nota_schema.validate(json_data)
    if errors:
        return errors, 400

    nota, _ = NotaService.calificar_problema(json_data)
    return nota_schema.dump(nota), 200

def get_nota_controller():
    cod_problema = request.args.get("cod_problema", type=int)
    cod_usuario = request.args.get("cod_usuario", type=int)

    if cod_problema is None or cod_usuario is None:
        return {"error": "cod_problema y cod_usuario son requeridos"}, 400

    nota, _ = NotaService.obtener_nota(cod_problema, cod_usuario)

    return nota_schema.dump(nota), 200

def get_notas_controller(cod_usuario):
    if not cod_usuario:
        return {"error": "cod_usuario es requerido"}, 400

    notas = NotaService.obtener_notas_de_usuario(cod_usuario)

    if notas is None:
        return {"error": "No se encontraron notas para este usuario"}, 404

    return notas, 200
