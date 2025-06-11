from app.extensions import db

class UsuarioCurso(db.Model):
    __tablename__ = 'usuario_curso'

    cod_curso = db.Column(db.Integer, db.ForeignKey('curso.cod_curso'), primary_key=True)
    cod_usuario = db.Column(db.Integer, db.ForeignKey('usuario.cod_usuario'), primary_key=True)

    usuario = db.relationship("Usuario", backref=db.backref("usuario_cursos", cascade="all, delete-orphan"))
    curso = db.relationship("Curso", backref=db.backref("usuario_cursos", cascade="all, delete-orphan"))
