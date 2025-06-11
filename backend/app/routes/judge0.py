from flask_restx import Namespace, Resource, fields
from flask import request
from app.controllers.judge0Controller import execute_code_controller

api = Namespace("code", description="Ejecutar código en Judge0")

# Modelo de entrada
code_input = api.model("CodeInput", {
    "code": fields.String(required=True, description="Código fuente en Python"),
    "stdin": fields.String(required=False, description="Entrada estándar para el programa")
})

# Modelo de salida
code_output = api.model("CodeOutput", {
    "stdout": fields.String(description="Salida estándar del programa"),
    "stderr": fields.String(description="Errores en tiempo de ejecución"),
    "compile_output": fields.String(description="Errores de compilación"),
    "status": fields.String(description="Estado de la ejecución")
})

@api.route("/execute")
class CodeExecutor(Resource):
    @api.expect(code_input)
    @api.marshal_with(code_output)
    @api.response(200, "Ejecución exitosa")
    @api.response(400, "Error en los datos enviados")
    @api.response(500, "Error interno")
    def post(self):
        """Ejecuta código Python utilizando Judge0 y devuelve el resultado"""
        return execute_code_controller()