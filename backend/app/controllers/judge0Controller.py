from flask import request, jsonify
from app.services.judge0Service import submit_code_to_judge0
import logging

def execute_code_controller():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se proporcionaron datos JSON"}), 400
            
        code = data.get("code", "")
        stdin = data.get("stdin", "")

        if not code:
            return jsonify({"error": "El campo 'code' es obligatorio"}), 400

        logging.info("Executing code through Judge0...")
        result = submit_code_to_judge0(code, stdin)
        
        response = {
            "stdout": result["stdout"],
            "stderr": result["stderr"],
            "compile_output": result["compile_output"],
            "status": result["status"]["description"]
        }
        
        logging.info(f"Code execution completed successfully: {response}")
        return jsonify(response)
        
    except Exception as e:
        error_msg = str(e)
        logging.error(f"Error executing code: {error_msg}")
        return jsonify({"error": error_msg}), 500