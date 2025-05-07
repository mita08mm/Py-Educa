from marshmallow import Schema, fields

class SeccionSchema(Schema):
    cod_modulo = fields.Int(required=True)
    cod_seccion = fields.Int(dump_only=True)
    titulo_seccion = fields.Str(required=True)
    descripcion_seccion = fields.Str()
