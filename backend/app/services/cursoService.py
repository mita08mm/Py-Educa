from app.extensions import db
from app.models.curso import Curso
import base64

def crear_curso(data):
    imagen_bytes = None
    if 'imagen_curso' in data:
        try:
            imagen_base64 = data['imagen_curso'].split(',')[1]  # Quita 'data:image/...;base64,'
            imagen_bytes = base64.b64decode(imagen_base64)
        except Exception as e:
            print("Error decodificando imagen:", e)

    curso = Curso(
        titulo_curso=data['titulo_curso'],
        descripcion_curso=data.get('descripcion_curso', ''),
        imagen_curso=imagen_bytes
    )
    db.session.add(curso)
    db.session.commit()
    return curso, None


def get_all_cursos():
    return Curso.query.all()

