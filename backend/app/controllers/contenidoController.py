from flask import request, jsonify
from app.services.contenidoService import get_contenido_por_subseccion, agregar_contenido, eliminar_contenido
from app.schemas.contenidoSchema import ContenidoSchema

contenido_schema = ContenidoSchema(many=True)
contenido_single_schema = ContenidoSchema()

def get_contenido_por_subseccion_controller(cod_subseccion):
    if not cod_subseccion:
        return jsonify({"error": "cod_subseccion es requerido"}), 400
    
    contenidos = get_contenido_por_subseccion(cod_subseccion)
    return jsonify(contenido_schema.dump(contenidos)), 200

def agregar_contenido_controller(cod_subseccion):
    try:
        cod_modulo = request.form.get("cod_modulo", type=int)
        cod_seccion = request.form.get("cod_seccion", type=int)
        descripcion = request.form.get("descripcion")
        link = request.form.get("link")
        imagen_file = request.files.get("imagen")

        if not (cod_modulo and cod_seccion):
            return jsonify({"error": "cod_modulo y cod_seccion son requeridos"}), 400

        imagen_bytes = imagen_file.read() if imagen_file else None

        contenido = agregar_contenido(
            cod_modulo=cod_modulo,
            cod_seccion=cod_seccion,
            cod_subseccion=cod_subseccion,
            descripcion=descripcion,
            link=link,
            imagen=imagen_bytes
        )

        return jsonify(contenido_single_schema.dump(contenido)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
def eliminar_contenido_controller(cod_contenido):
    try:
        if not cod_contenido:
            return jsonify({"error": "cod_contenido es requerido"}), 400
        
        eliminado = eliminar_contenido(cod_contenido)
        if eliminado:
            return jsonify({"message": "Contenido eliminado exitosamente"}), 200
        else:
            return jsonify({"error": "Contenido no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500