from flask import request, jsonify
from app.services.cursoService import crear_curso, get_all_cursos
from app.schemas.cursoSchema import CursoSchema

curso_schema = CursoSchema()
cursos_schema = CursoSchema(many=True)

def crear_curso_handler():
    data = request.get_json()
    errors = curso_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    curso, _ = crear_curso(data)  # Se espera una tupla
    return jsonify(curso_schema.dump(curso)), 201

def listar_cursos():
    cursos = get_all_cursos()
    return jsonify(cursos_schema.dump(cursos)), 200 