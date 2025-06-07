from flask_restx import Namespace, Resource
from app.controllers import cursoController

api = Namespace('curso', description='Operaciones relacionadas con cursos')

@api.route('/')
class CursoListResource(Resource):
    def get(self):
        return cursoController.listar_cursos()

    def post(self):
        return cursoController.crear_curso_handler()
