from app.extensions import db

class Curso(db.Model):
    __tablename__ = 'Curso'

    cod_curso = db.Column(db.Integer, nullable=False)
    titulo_curso = db.Column(db.String(256), nullable=False)
    descripcion_curso = db.Column(db.Text)
