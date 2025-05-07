from app.models.usuario import Usuario
from app.extensions import db

def guardar_usuario(data):
    usuario = Usuario(nombre=data["nombre"])
    db.session.add(usuario)
    db.session.commit()
    return usuario
