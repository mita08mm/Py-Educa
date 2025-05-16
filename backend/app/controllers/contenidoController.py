from flask import jsonify
from app.services.contenidoService import get_contenido_por_subseccion
from app.schemas.contenidoSchema import ContenidoSchema

contenido_schema = ContenidoSchema(many=True)

def get_contenido_por_subseccion_controller(cod_subseccion):
    if not cod_subseccion:
        return jsonify({"error": "cod_subseccion es requerido"}), 400
    
    contenidos = get_contenido_por_subseccion(cod_subseccion)
    return jsonify(contenido_schema.dump(contenidos)), 200
