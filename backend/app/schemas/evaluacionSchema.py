from marshmallow import Schema, fields

# Schema para crear Evaluacion
class EvaluacionCreateSchema(Schema):
    cod_modulo = fields.Int(required=True)
    titulo_evaluacion = fields.Str(required=True)
    descripcion_evaluacion = fields.Str(required=False, allow_none=True)

# Schema para actualizar Evaluacion
class EvaluacionUpdateSchema(Schema):
    titulo_evaluacion = fields.Str(required=False)
    descripcion_evaluacion = fields.Str(required=False, allow_none=True)

# Schema para respuesta de Evaluacion
class EvaluacionResponseSchema(Schema):
    cod_evaluacion = fields.Int()
    cod_modulo = fields.Int()
    titulo_evaluacion = fields.Str()
    descripcion_evaluacion = fields.Str(allow_none=True)