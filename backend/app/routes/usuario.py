from flask import Blueprint, request, jsonify
from app.controllers.usuarioController import crear_usuario

usuario_bp = Blueprint("usuarios", __name__)

@usuario_bp.route("/", methods=["POST"])
def crear():
    data = request.get_json()
    nuevo_usuario = crear_usuario(data)
    return jsonify(nuevo_usuario.to_dict()), 201