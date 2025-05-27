import base64
import imghdr
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
            image_type = imghdr.what(None, h=obj.imagen)
            if image_type:
                mime_type = f"image/{image_type}"
            else:
                mime_type = "application/octet-stream"  # fallback

            base64_str = base64.b64encode(obj.imagen).decode("utf-8")
            return f"data:{mime_type};base64,{base64_str}"
        return None
