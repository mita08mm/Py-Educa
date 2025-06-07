from flask import Blueprint
from flask_restx import Api

from .usuario import api as usuario_ns
from .test import api as test_ns
from .seccion import api as seccion_ns
from .subseccion import api as subseccion_ns
from .modulo import api as modulo_ns
from .curso import api as curso_ns
from .contenido import api as contenido_ns
from .nota import api as nota_ns
from .evaluacion import api as evaluacion_ns
from .problema import api as problema_ns

api_bp = Blueprint('api', __name__, url_prefix='/api')

api = Api(
    api_bp,
    version='1.0',
    title='PyEduca API',
    description='Documentación Swagger de la API de PyEduca'
)

api.add_namespace(usuario_ns, path='/usuarios')
api.add_namespace(test_ns, path='/test')
api.add_namespace(seccion_ns, path='/secciones')
api.add_namespace(subseccion_ns, path='/subsecciones')
api.add_namespace(modulo_ns, path='/modulos')
api.add_namespace(curso_ns, path='/cursos')
api.add_namespace(contenido_ns, path='/contenido')
api.add_namespace(nota_ns, path='/nota')
api.add_namespace(evaluacion_ns, path='/evaluacion')
api.add_namespace(problema_ns, path='/problema')

def register_routes(app):
    app.register_blueprint(api_bp)
