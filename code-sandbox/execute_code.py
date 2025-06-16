import sys
import json
import resource
import tempfile
import os
import signal
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

def execute_code(code):
    # Create a temporary file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(code)
        temp_file = f.name

    try:
        # Set up output capture
        import io
        from contextlib import redirect_stdout, redirect_stderr
        stdout = io.StringIO()
        stderr = io.StringIO()

        exec_globals = {}
        
        # Execute the code with limits
        with redirect_stdout(stdout), redirect_stderr(stderr):
            set_limits()
            exec(open(temp_file).read(), exec_globals)

        return {
            'status': {'id': 3, 'description': 'Accepted'},
            'stdout': stdout.getvalue(),
            'stderr': stderr.getvalue(),
            'memory': '0',  # You can implement memory tracking if needed
            'time': '0'     # You can implement time tracking if needed
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

    result = execute_code(data['code'])
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 