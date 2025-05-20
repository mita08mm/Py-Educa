from marshmallow import Schema, fields
from app.schemas.ejemploSchema import EjemploSchema

class ProblemaSchema(Schema):
    cod_problema = fields.Int()
    titulo_problema = fields.Str()
    descripcion_problema = fields.Str()
    input = fields.Str()
    output = fields.Str()
    ejemplos = fields.Nested(EjemploSchema, many=True)
