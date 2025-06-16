from flask import Blueprint, request, jsonify
from ..services.code_execution_service import CodeExecutionService

code_execution_bp = Blueprint('code_execution', __name__)
code_service = CodeExecutionService()

@code_execution_bp.route('/execute', methods=['POST'])
def execute_code():
    """
    Endpoint para ejecutar código Python.
    
    Request body:
    {
        "code": "código Python a ejecutar"
    }
    
    Returns:
    {
        "status": {"id": int, "description": str},
        "stdout": str,
        "stderr": str,
        "memory": str,
        "time": str
    }
    """
    data = request.get_json()
    
    if not data or 'code' not in data:
        return jsonify({
            'error': 'No se proporcionó código para ejecutar'
        }), 400
    
    result = code_service.execute_code(data['code'])
    return jsonify(result) 