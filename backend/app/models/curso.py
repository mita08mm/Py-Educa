from app.extensions import db

class Curso(db.Model):
    __tablename__ = 'curso'

    cod_curso = db.Column(db.Integer, primary_key=True)
    titulo_curso = db.Column(db.String(256), nullable=False)
    descripcion_curso = db.Column(db.Text)
