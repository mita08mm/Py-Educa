from marshmallow import Schema, fields, validate

class CursoSchema(Schema):
    cod_curso = fields.Integer(dump_only=True)
    titulo_curso = fields.String(required=True, validate=validate.Length(min=1, max=256))
    descripcion_curso = fields.String() 