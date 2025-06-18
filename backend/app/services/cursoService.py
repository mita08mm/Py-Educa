from app.extensions import db
from app.models.curso import Curso
import base64

def crear_curso(titulo_curso,descripcion_curso,imagen_curso):
    nuevo_curso = Curso(
        titulo_curso=titulo_curso,
        descripcion_curso=descripcion_curso,
        imagen_curso=imagen_curso
    )
    db.session.add(nuevo_curso)
    db.session.commit()
    return nuevo_curso


def get_all_cursos():
    return Curso.query.all()

