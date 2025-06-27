from marshmallow import Schema, fields

class ProblemaCreateSchema(Schema):
    cod_evaluacion = fields.Int(required=True)
    titulo_problema = fields.Str(required=True)
    descripcion_problema = fields.Str(required=True)
    input = fields.Str(required=False, allow_none=True)
    output = fields.Str(required=False, allow_none=True)
    input_ejemplo = fields.Str(required=False, allow_none=True)
    output_ejemplo = fields.Str(required=False, allow_none=True)
    editor = fields.Str(required=False, allow_none=True)

class ProblemaUpdateSchema(Schema):
    titulo_problema = fields.Str(required=False)
    descripcion_problema = fields.Str(required=False)
    input = fields.Str(required=False, allow_none=True)
    output = fields.Str(required=False, allow_none=True)
    input_ejemplo = fields.Str(required=False, allow_none=True)
    output_ejemplo = fields.Str(required=False, allow_none=True)

class ProblemaResponseSchema(Schema):
    cod_problema = fields.Int()
    cod_evaluacion = fields.Int()
    titulo_problema = fields.Str()
    descripcion_problema = fields.Str()
    input = fields.Str(allow_none=True)
    output = fields.Str(allow_none=True)
    input_ejemplo = fields.Str(allow_none=True)
    output_ejemplo = fields.Str(allow_none=True)
    editor = fields.Str(allow_none=True)