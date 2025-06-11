from flask import request, Response
import json
from app.services.cursoService import crear_curso, get_all_cursos
from app.schemas.cursoSchema import CursoSchema

curso_schema = CursoSchema()
cursos_schema = CursoSchema(many=True)

def crear_curso_handler():
    data = request.get_json()
    errors = curso_schema.validate(data)

    if errors:
        return Response(json.dumps(errors), status=400, mimetype='application/json')

    valid_data = curso_schema.load(data)
    curso, _ = crear_curso(valid_data)
    result = curso_schema.dump(curso)
    return Response(json.dumps(result), status=201, mimetype='application/json')

def listar_cursos():
    cursos = get_all_cursos()
    result = cursos_schema.dump(cursos)
    return Response(json.dumps(result), status=200, mimetype='application/json')