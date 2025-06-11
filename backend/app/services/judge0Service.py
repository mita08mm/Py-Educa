import requests
import time
from flask import current_app
import logging

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
        # Log request details
        logging.info(f"Submitting code to Judge0: {submit_url}")
        logging.info(f"Payload: {payload}")
        
        # Submit code
        response = requests.post(submit_url, headers=headers, json=payload)
        logging.info(f"Initial response status: {response.status_code}")
        logging.info(f"Initial response body: {response.text}")
        
        if response.status_code == 201:
            token = response.json().get("token")
            if not token:
                raise Exception("No token received from Judge0")
            
            # Get results URL
            get_url = f"{current_app.config['JUDGE0_API_URL']}/submissions/{token}?base64_encoded=false"
            
            # Poll for results
            max_attempts = 10
            for attempt in range(max_attempts):
                logging.info(f"Fetching results, attempt {attempt + 1}/{max_attempts}")
                
                result_response = requests.get(get_url, headers=headers)
                logging.info(f"Result response status: {result_response.status_code}")
                logging.info(f"Result response body: {result_response.text}")
                
                if result_response.status_code == 200:
                    result = result_response.json()
                    status = result.get("status", {})
                    
                    # Check if processing is complete
                    if status.get("id") not in [1, 2]:  # 1=In Queue, 2=Processing
                        output = {
                            "stdout": result.get("stdout"),
                            "stderr": result.get("stderr"),
                            "compile_output": result.get("compile_output"),
                            "status": {
                                "id": status.get("id"),
                                "description": status.get("description")
                            }
                        }
                        logging.info(f"Final output: {output}")
                        return output
                
                time.sleep(2)  # Increased wait time between attempts
            
            raise Exception("Timeout waiting for code execution results")
        else:
            raise Exception(f"Error submitting code: {response.status_code} - {response.text}")
            
    except requests.exceptions.RequestException as e:
        logging.error(f"Request failed: {str(e)}")
        raise Exception(f"Error de conexión con Judge0: {str(e)}")
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        raise