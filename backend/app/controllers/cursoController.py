from flask import request, Response
import json
from app.services.cursoService import crear_curso, get_all_cursos
from app.schemas.cursoSchema import CursoSchema

curso_schema = CursoSchema()
cursos_schema = CursoSchema(many=True)

def crear_curso_handler():
    try:
        titulo_curso = request.form.get('titulo_curso')
        descripcion_curso = request.form.get('descripcion_curso', '')
        imagen_archivo = request.files.get('imagen_curso')  # Se asegura de que se obtiene la imagen

        if not titulo_curso:
            return Response(json.dumps({"error": "titulo_curso es requerido"}), status=400, mimetype='application/json')

        imagen_bytes = None
        if imagen_archivo:
            imagen_bytes = imagen_archivo.read()  # Se lee el archivo de imagen

        curso = crear_curso(
            titulo_curso=titulo_curso,  # Se pasa correctamente el título
            descripcion_curso=descripcion_curso,
            imagen_curso=imagen_bytes
        )

        return Response(curso_schema.dumps(curso), status=201, mimetype='application/json')
    except Exception as e:
        return Response(json.dumps({"error": str(e)}), status=500, mimetype='application/json')

def listar_cursos():
    cursos = get_all_cursos()
    result = cursos_schema.dump(cursos)
    return Response(json.dumps(result), status=200, mimetype='application/json')
