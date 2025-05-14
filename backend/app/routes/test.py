# app/routes/test.py
from flask import Blueprint, jsonify

test_bp = Blueprint("test", __name__)

@test_bp.route("/message", methods=["GET"])
def get_message():
    return jsonify({"message": "¡Hola desde el backend en Docker!"})
