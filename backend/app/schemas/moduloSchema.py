from marshmallow import Schema, fields

class ModuloSchema(Schema):
    cod_curso = fields.Int(required=True)
    cod_modulo = fields.Int(dump_only=True)
    titulo_modulo = fields.Str(required=True)
    descripcion_modulo = fields.Str()
