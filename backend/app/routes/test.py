from flask_restx import Namespace, Resource

api = Namespace('test', description='Ruta de prueba para verificar backend')

@api.route('/message')
class TestMessageResource(Resource):
    def get(self):
        return {"message": "¡Hola desde el backend en Docker!"}
