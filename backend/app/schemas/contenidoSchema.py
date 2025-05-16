from marshmallow import Schema, fields

class ContenidoSchema(Schema):
    cod_modulo = fields.Int(required=True)
    cod_seccion = fields.Int(required=True)
    cod_subseccion = fields.Int(required=True)
    cod_contenido = fields.Int(required=True)
    descripcion = fields.Str()
    link = fields.Str()
    imagen = fields.Method("get_imagen_base64")

    def get_imagen_base64(self, obj):
        if obj.imagen:
            import base64
            return base64.b64encode(obj.imagen).decode('utf-8')
        return None
