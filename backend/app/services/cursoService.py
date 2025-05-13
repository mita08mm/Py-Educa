from app.extensions import db
from app.models.curso import Curso

def crear_curso(data):
    curso = Curso(titulo_curso=data['titulo_curso'], descripcion_curso=data.get('descripcion_curso', ''))
    db.session.add(curso)
    db.session.commit()
    return curso, None

def get_all_cursos():
    return Curso.query.all() 