from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route("/api/message")
def get_message():
    return jsonify({"message": "¡Hola desde el backend en Docker!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)