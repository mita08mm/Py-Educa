import sys
import json
import resource
import tempfile
import os
import signal
import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

# Set resource limits
def set_limits():
    # CPU time limit (5 seconds)
    resource.setrlimit(resource.RLIMIT_CPU, (5, 5))
    # Memory limit (50MB)
    resource.setrlimit(resource.RLIMIT_AS, (50 * 1024 * 1024, 50 * 1024 * 1024))
    # File size limit (1MB)
    resource.setrlimit(resource.RLIMIT_FSIZE, (1024 * 1024, 1024 * 1024))

def execute_code(code, input_data=''):
    # Create a temporary file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(code)
        temp_file = f.name

    try:
        # Execute the code with subprocess to handle input
        process = subprocess.Popen(
            [sys.executable, temp_file],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            preexec_fn=set_limits
        )
        
        # Send input and get output
        stdout, stderr = process.communicate(input=input_data, timeout=10)
        
        return {
            'status': {'id': 3, 'description': 'Accepted'},
            'stdout': stdout,
            'stderr': stderr,
            'memory': '0',  # You can implement memory tracking if needed
            'time': '0'     # You can implement time tracking if needed
        }

    except subprocess.TimeoutExpired:
        process.kill()
        return {
            'status': {'id': 4, 'description': 'Time Limit Exceeded'},
            'stdout': '',
            'stderr': 'Time limit exceeded (10 seconds)',
            'memory': '0',
            'time': '0'
        }
    except Exception as e:
        return {
            'status': {'id': 4, 'description': 'Error'},
            'stdout': '',
            'stderr': str(e),
            'memory': '0',
            'time': '0'
        }
    finally:
        # Clean up
        os.unlink(temp_file)

@app.route('/execute', methods=['POST'])
def handle_execute():
    data = request.get_json()
    if not data or 'code' not in data:
        return jsonify({'error': 'No code provided'}), 400

    code = data['code']
    input_data = data.get('input', '')
    
    result = execute_code(code, input_data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 