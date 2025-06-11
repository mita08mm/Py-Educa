from marshmallow import Schema, fields, validate
import imghdr
import base64

class CursoSchema(Schema):
    cod_curso = fields.Integer(dump_only=True)
    titulo_curso = fields.String(required=True, validate=validate.Length(min=1, max=256))
    descripcion_curso = fields.String()
    imagen_curso = fields.Method("get_imagen_base64")

    def get_imagen_base64(self, obj):
        if obj.imagen_curso:
            image_type = imghdr.what(None, h=obj.imagen_curso)
            if image_type:
                mime_type = f"image/{image_type}"
            else:
                mime_type = "application/octet-stream"
            base64_str = base64.b64encode(obj.imagen_curso).decode("utf-8")
            return f"data:{mime_type};base64,{base64_str}"
        return None
