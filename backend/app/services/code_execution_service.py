import requests
from flask import current_app
from typing import Dict, Any, List

class CodeExecutionService:
    def __init__(self):
        self.sandbox_url = current_app.config.get('CODE_SANDBOX_URL', 'http://code-sandbox:5001')

    def execute_code(self, code: str, input_data: List[str] = None) -> Dict[str, Any]:
        """
        Ejecuta código Python usando el sandbox con soporte para input.
        
        Args:
            code (str): Código Python a ejecutar
            input_data (List[str], optional): Lista de entradas para simular input()
            
        Returns:
            Dict[str, Any]: Resultado de la ejecución con el siguiente formato:
            {
                'status': {'id': int, 'description': str},
                'stdout': str,
                'stderr': str,
                'memory': str,
                'time': str,
                'input_used': int
            }
        """
        try:
            payload = {"code": code}
            if input_data:
                payload["input"] = input_data
            
            response = requests.post(
                f"{self.sandbox_url}/execute",
                json=payload,
                timeout=15
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
                'time': '0',
                'input_used': 0
            } 