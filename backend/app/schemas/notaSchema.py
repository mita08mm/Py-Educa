from marshmallow import Schema, fields, validate

class NotaSchema(Schema):
    cod_problema = fields.Int(required=True)
    cod_usuario = fields.Int(required=True)
    nota = fields.Float(required=True, validate=validate.Range(min=0))
    nota_total = fields.Float(required=True, validate=validate.Range(min=0))
