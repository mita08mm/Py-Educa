import requests
import time
from flask import current_app
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s:%(message)s'
)
logger = logging.getLogger(__name__)

PYTHON3_LANGUAGE_ID = 71

def submit_code_to_judge0(source_code: str, stdin: str = "") -> dict:
    """
    Envía código a Judge0 para su ejecución y espera los resultados
    """
    submit_url = f"{current_app.config['JUDGE0_API_URL']}/submissions/?base64_encoded=false&wait=false"
    headers = {
        "X-RapidAPI-Host": current_app.config["JUDGE0_HOST"],
        "X-RapidAPI-Key": current_app.config["JUDGE0_API_KEY"],
        "Content-Type": "application/json"
    }
    
    payload = {
        "language_id": PYTHON3_LANGUAGE_ID,
        "source_code": source_code,
        "stdin": stdin,
    }
    
    try:
        # Debug prints and logging
        logger.debug("="*50)
        logger.debug("Starting code submission")
        logger.debug(f"URL: {submit_url}")
        logger.debug(f"Headers: {headers}")
        logger.debug(f"Payload: {payload}")
        
        # Submit code
        response = requests.post(submit_url, headers=headers, json=payload)
        logger.debug(f"Initial Response Status: {response.status_code}")
        logger.debug(f"Initial Response Body: {response.text}")
        
        if response.status_code == 201:
            token = response.json().get("token")
            if not token:
                raise Exception("No token received from Judge0")
            
            logger.debug(f"Received token: {token}")
            
            # Get results URL
            get_url = f"{current_app.config['JUDGE0_API_URL']}/submissions/{token}?base64_encoded=false"
            
            # Poll for results
            max_attempts = 10
            for attempt in range(max_attempts):
                logger.debug(f"Attempt {attempt + 1}/{max_attempts} to fetch results")
                
                result_response = requests.get(get_url, headers=headers)
                logger.debug(f"Result Status: {result_response.status_code}")
                logger.debug(f"Result Body: {result_response.text}")
                
                if result_response.status_code == 200:
                    result = result_response.json()
                    status = result.get("status", {})
                    
                    logger.debug(f"Processing status: {status}")
                    
                    # Check if processing is complete
                    if status.get("id") not in [1, 2]:
                        return {
                            "stdout": result.get("stdout"),
                            "stderr": result.get("stderr"),
                            "compile_output": result.get("compile_output"),
                            "status": result.get("status") 
                        }
                
                time.sleep(2)
            
            raise Exception("Timeout waiting for code execution results")
        else:
            raise Exception(f"Error submitting code: {response.status_code} - {response.text}")
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request failed: {str(e)}")
        raise Exception(f"Error de conexión con Judge0: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise