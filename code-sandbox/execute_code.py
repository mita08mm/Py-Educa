import sys
import json
import resource
import tempfile
import os
import signal
import io
from flask import Flask, request, jsonify

app = Flask(__name__)

# Global variable to store input data
INPUT_DATA = []

def set_limits():
    """Set resource limits for security"""
    # CPU time limit (10 seconds)
    resource.setrlimit(resource.RLIMIT_CPU, (10, 10))
    # Memory limit (100MB)
    resource.setrlimit(resource.RLIMIT_AS, (100 * 1024 * 1024, 100 * 1024 * 1024))
    # File size limit (2MB)
    resource.setrlimit(resource.RLIMIT_FSIZE, (2 * 1024 * 1024, 2 * 1024 * 1024))

class InputSimulator:
    """Simulates input() function calls"""
    def __init__(self, input_data):
        self.input_data = input_data
        self.current_index = 0
    
    def get_input(self, prompt=""):
        if self.current_index < len(self.input_data):
            value = self.input_data[self.current_index]
            self.current_index += 1
            return value
        else:
            raise EOFError("No more input data available")

def execute_code(code, input_data=None):
    global INPUT_DATA
    INPUT_DATA = input_data or []
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8') as f:
        f.write(code)
        temp_file = f.name

    try:
        stdout = io.StringIO()
        stderr = io.StringIO()
        input_simulator = InputSimulator(INPUT_DATA)

        # Prepare execution environment
        exec_globals = dict(__builtins__=__builtins__)
        exec_globals['input'] = input_simulator.get_input
        data_dir = os.path.join(os.path.dirname(__file__), 'data')
        if os.path.exists(data_dir):
            exec_globals['__data_dir__'] = data_dir

        set_limits()

        with open(temp_file, 'r', encoding='utf-8') as f:
            code_content = f.read()

        old_stdout = sys.stdout
        old_stderr = sys.stderr
        sys.stdout = stdout
        sys.stderr = stderr
        try:
            exec(code_content, exec_globals)
        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr

        return {
            'status': {'id': 3, 'description': 'Accepted'},
            'stdout': stdout.getvalue(),
            'stderr': stderr.getvalue(),
            'memory': '0',
            'time': '0',
            'input_used': input_simulator.current_index
        }
    except Exception as e:
        return {
            'status': {'id': 4, 'description': 'Error'},
            'stdout': stdout.getvalue() if 'stdout' in locals() else '',
            'stderr': str(e),
            'memory': '0',
            'time': '0',
            'input_used': input_simulator.current_index if 'input_simulator' in locals() else 0
        }
    finally:
        if os.path.exists(temp_file):
            os.unlink(temp_file)

@app.route('/execute', methods=['POST'])
def handle_execute():
    data = request.get_json()
    if not data or 'code' not in data:
        return jsonify({'error': 'No code provided'}), 400
    code = data['code']
    input_data = data.get('input', [])
    result = execute_code(code, input_data)
    return jsonify(result)

@app.route('/health', methods=['GET'])
def health_check():
    data_files = []
    data_dir = os.path.join(os.path.dirname(__file__), 'data')
    if os.path.exists(data_dir):
        data_files = os.listdir(data_dir)
    return jsonify({
        'status': 'healthy',
        'data_files': data_files,
        'features': [
            'Interactive input support',
            'File access to data directory',
            'Resource limits (CPU: 10s, Memory: 100MB)',
            'Error handling and reporting'
        ]
    })

@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        'message': 'Sandbox is working!',
        'example_request': {
            'code': 'name = input("Enter your name: ")\nprint(f"Hello, {name}!")',
            'input': ['John']
        },
        'example_response': {
            'status': {'id': 3, 'description': 'Accepted'},
            'stdout': 'Hello, John!\n',
            'stderr': '',
            'input_used': 1
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False) 