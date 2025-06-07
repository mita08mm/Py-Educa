from marshmallow import Schema, fields

class EvaluacionSchema(Schema):
    cod_evaluacion = fields.Int(dump_only=True)
    cod_modulo = fields.Int(required=True)
    cod_seccion = fields.Int(required=True)
