from marshmallow import Schema, fields
from app.schemas.ejemploSchema import EjemploSchema

class ProblemaCreateSchema(Schema):
    cod_evaluacion = fields.Int(required=True)
    cod_modulo = fields.Int(required=True)
    cod_seccion = fields.Int(required=True)
    cod_subseccion = fields.Int(required=False, allow_none=True)
    titulo_problema = fields.Str(required=True)
    descripcion_problema = fields.Str(required=True)
    editor = fields.Str(required=False, allow_none=True)  
    input = fields.Str(required=True)
    output = fields.Str(required=True)
    ejemplos = fields.List(fields.Nested(EjemploSchema), required=False)
