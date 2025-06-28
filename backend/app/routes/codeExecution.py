from flask import Blueprint, request, jsonify, current_app
from ..services.code_execution_service import CodeExecutionService

code_execution_bp = Blueprint('code_execution', __name__)

@code_execution_bp.route('/execute', methods=['POST'])
def execute_code():
    """
    Endpoint para ejecutar código Python.
    
    Request body:
    {
        "code": "código Python a ejecutar",
        "input": "datos de entrada (opcional)"
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
    try:
        data = request.get_json()
        if not data or 'code' not in data:
            return jsonify({'error': 'No se proporcionó código para ejecutar'}), 400

        code = data['code']
        input_data = data.get('input', '')  # Input opcional
        
        if not isinstance(code, str) or not code.strip():
            return jsonify({'error': 'El código debe ser una cadena no vacía'}), 400

        # Crear una nueva instancia del servicio para cada solicitud
        code_service = CodeExecutionService()
        result = code_service.execute_code(code, input_data)
        
        return jsonify(result)
    except Exception as e:
        current_app.logger.error(f"Error al ejecutar el código: {str(e)}")
        return jsonify({
            'status': {'id': 4, 'description': 'Error'},
            'stdout': '',
            'stderr': str(e),
            'memory': '0',
            'time': '0'
        }), 500 