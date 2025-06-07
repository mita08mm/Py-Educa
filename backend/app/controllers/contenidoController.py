from flask import request  
from app.services.contenidoService import get_contenido_por_subseccion, agregar_contenido, eliminar_contenido, editar_contenido
from app.schemas.contenidoSchema import ContenidoSchema

contenido_schema = ContenidoSchema(many=True)
contenido_single_schema = ContenidoSchema()

def get_contenido_por_subseccion_controller(cod_subseccion):
    if not cod_subseccion:
        return  {"error": "cod_subseccion es requerido"}, 400
    
    contenidos = get_contenido_por_subseccion(cod_subseccion)
    return  contenido_schema.dump(contenidos), 200

def agregar_contenido_controller(cod_subseccion):
    try:
        cod_modulo = request.form.get("cod_modulo", type=int)
        cod_seccion = request.form.get("cod_seccion", type=int)
        descripcion = request.form.get("descripcion")
        link = request.form.get("link")
        imagen_file = request.files.get("imagen")

        if not (cod_modulo and cod_seccion):
            return  ({"error": "cod_modulo y cod_seccion son requeridos"}), 400

        imagen_bytes = imagen_file.read() if imagen_file else None

        contenido = agregar_contenido(
            cod_modulo=cod_modulo,
            cod_seccion=cod_seccion,
            cod_subseccion=cod_subseccion,
            descripcion=descripcion,
            link=link,
            imagen=imagen_bytes
        )

        return  contenido_single_schema.dump(contenido), 201
    except Exception as e:
        return  {"error": str(e)}, 500
    
def eliminar_contenido_controller(cod_contenido):
    try:
        if not cod_contenido:
            return  {"error": "cod_contenido es requerido"}, 400
        
        eliminado = eliminar_contenido(cod_contenido)
        if eliminado:
            return  {"message": "Contenido eliminado exitosamente"}, 200
        else:
            return  {"error": "Contenido no encontrado"}, 404
    except Exception as e:
        return  {"error": str(e)}, 500
    
def editar_contenido_controller(cod_contenido):
    try:
        if not cod_contenido:
            return  {"error": "cod_contenido es requerido"}, 400

        data = request.get_json()
        if not data:
            return  {"error": "JSON requerido en el cuerpo de la solicitud"}, 400

        descripcion = data.get("descripcion")
        link = data.get("link")
        imagen_base64 = data.get("imagen")

        imagen_bytes = None
        if imagen_base64:
            import base64
            try:
                imagen_bytes = base64.b64decode(imagen_base64)
            except Exception:
                return  {"error": "imagen debe estar en formato base64 válido"}, 400

        contenido = editar_contenido(
            cod_contenido=cod_contenido,
            descripcion=descripcion,
            link=link,
            imagen=imagen_bytes
        )

        if contenido is None:
            return  {"error": "Contenido no encontrado"}, 404

        return  contenido_single_schema.dump(contenido), 200
    except Exception as e:
        return  {"error": str(e)}, 500

