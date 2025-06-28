import requests
from flask import current_app
from typing import Dict, Any

class CodeExecutionService:
    def __init__(self):
        self.sandbox_url = current_app.config.get('CODE_SANDBOX_URL', 'http://code-sandbox:5001')

    def execute_code(self, code: str, input_data: str = '') -> Dict[str, Any]:
        """
        Ejecuta código Python usando el sandbox.
        
        Args:
            code (str): Código Python a ejecutar
            input_data (str): Datos de entrada para stdin (opcional)
            
        Returns:
            Dict[str, Any]: Resultado de la ejecución con el siguiente formato:
            {
                'status': {'id': int, 'description': str},
                'stdout': str,
                'stderr': str,
                'memory': str,
                'time': str
            }
        """
        try:
            response = requests.post(
                f"{self.sandbox_url}/execute",
                json={"code": code, "input": input_data},
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            current_app.logger.error(f"Error al comunicarse con el sandbox: {str(e)}")
            return {
                'status': {'id': 4, 'description': 'Error'},
                'stdout': '',
                'stderr': f"Error al comunicarse con el sandbox: {str(e)}",
                'memory': '0',
                'time': '0'
            } 