from flask import request
from app.services.judge0Service import submit_code_to_judge0
import logging

def execute_code_controller():
    try:
        data = request.get_json()
        if not data:
            return  {"error": "No se proporcionaron datos JSON"}, 400
            
        code = data.get("code", "")
        stdin = data.get("stdin", "")

        if not code:
            return  {"error": "El campo 'code' es obligatorio"}, 400

        logging.info("Executing code through Judge0...")
        result = submit_code_to_judge0(code, stdin)
        
        # Log the raw result for debugging
        logging.debug(f"Raw result from Judge0 service: {result}")
        
        # Create response with proper null handling
        response = {
            "stdout": result.get("stdout") if result.get("stdout") is not None else "No output",
            "stderr": result.get("stderr") if result.get("stderr") is not None else "No errors",
            "compile_output": result.get("compile_output") if result.get("compile_output") is not None else "No compilation output",
            "status": result.get("status", {}).get("description") if result.get("status") else "Unknown"
        }
        
        logging.info(f"Code execution completed successfully: {response}")
        return response
        
    except Exception as e:
        error_msg = str(e)
        logging.error(f"Error executing code: {error_msg}")
        return  {"error": error_msg}, 500