from flask import request
from app.services.moduloService import crear_modulo, get_all_modulos
from app.schemas.moduloSchema import ModuloSchema

modulo_schema = ModuloSchema()
modulos_schema = ModuloSchema(many=True)

def crear_modulo_handler():
    data = request.get_json()
    errors = modulo_schema.validate(data)

    if errors:
        return errors, 400

    modulo, _ = crear_modulo(data)  # Se espera una tupla
    return modulo_schema.dump(modulo), 201

def listar_modulos():
    modulos = get_all_modulos()
    return modulos_schema.dump(modulos), 200
