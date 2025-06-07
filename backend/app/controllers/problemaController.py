from flask import request
from app.schemas.problemaSchema import ProblemaCreateSchema
from app.services.problemaService import crear_problema_con_ejemplos

problema_create_schema = ProblemaCreateSchema()

def crear_problema_controller():
    data = request.get_json()
    errors = problema_create_schema.validate(data)
    if errors:
        return  errors, 400

    problema = crear_problema_con_ejemplos(data)
    return  {"message": "Problema y ejemplos creados correctamente", "cod_problema": problema.cod_problema}, 201
