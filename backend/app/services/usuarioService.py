from app.models.usuario import Usuario
from app.extensions import db
from app.models.usuario import Usuario
from app.models.usuarioCurso import UsuarioCurso

def guardar_usuario(data):
    usuario = Usuario(nombre=data["nombre"])
    db.session.add(usuario)
    db.session.commit()
    return usuario

def obtener_usuarios(cod_curso):
    usuarios = (
        db.session.query(Usuario)
        .join(UsuarioCurso, Usuario.cod_usuario == UsuarioCurso.cod_usuario)
        .filter(UsuarioCurso.cod_curso == cod_curso)
        .all()
    )

    return [
        {
            "cod_usuario": u.cod_usuario,
            "nombre": u.nombre,
            "usuario": u.usuario,
            "email": u.email
        }
        for u in usuarios
    ]
