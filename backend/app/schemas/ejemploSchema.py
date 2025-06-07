from marshmallow import Schema, fields

class EjemploSchema(Schema):
    cod_ejemplo = fields.Int()
    input_ejemplo = fields.Str()
    output_ejemplo = fields.Str()
