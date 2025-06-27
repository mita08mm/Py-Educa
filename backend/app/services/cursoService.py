from app.extensions import db
from app.models.curso import Curso
import base64

def crear_curso(data):
    try:
        titulo_curso = data.get("titulo_curso")
        if not titulo_curso:
            return None, "titulo_curso es requerido"

        descripcion_curso = data.get("descripcion_curso", "")

        imagen_base64 = data.get("imagen_curso")
        imagen_bytes = None

        if imagen_base64:
            try:
                if imagen_base64.startswith("data:"):
                    imagen_base64 = imagen_base64.split(",")[1]
                imagen_bytes = base64.b64decode(imagen_base64)
            except Exception as e:
                print("Error decodificando imagen:", str(e))
                imagen_bytes = None  # Continua sin imagen

        nuevo_curso = Curso(
            titulo_curso=titulo_curso,
            descripcion_curso=descripcion_curso,
            imagen_curso=imagen_bytes
        )

        db.session.add(nuevo_curso)
        db.session.commit()
        return nuevo_curso, None

    except Exception as e:
        return None, str(e)


def get_all_cursos():
    return Curso.query.all()

