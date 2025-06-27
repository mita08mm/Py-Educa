from flask_restx import Namespace, Resource, fields
from app.controllers import cursoController

api = Namespace('curso', description='Operaciones relacionadas con cursos')

# Definición correcta del modelo para form-data
curso_form_model = api.model('CursoFormData', {
    'titulo_curso': fields.String(required=True, description='Título del curso'),
    'descripcion_curso': fields.String(required=False, description='Descripción'),
    'imagen_curso': fields.Raw(description='Archivo de imagen (probar con Postman)')
})

@api.route('/')
class CursoListResource(Resource):
    def get(self):
        return cursoController.listar_cursos()

    @api.expect(curso_form_model)  # Espera los datos definidos en el modelo
    @api.doc(consumes=["multipart/form-data"])  # Define que el consumo será form-data
    def post(self):
        return cursoController.crear_curso_handler()
