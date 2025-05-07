from marshmallow import Schema, fields

class SubseccionSchema(Schema):
    cod_subseccion = fields.Int(dump_only=True)
    cod_modulo = fields.Int(required=True)
    cod_seccion = fields.Int(required=True)
    titulo_subseccion = fields.Str(required=True)
    descripcion_subseccion = fields.Str()
