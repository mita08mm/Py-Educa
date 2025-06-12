from app.extensions import db

class Curso(db.Model):
    __tablename__ = 'curso'

    cod_curso = db.Column("cod_curso", db.Integer, primary_key=True)
    titulo_curso = db.Column("titulo_curso", db.String(50), nullable=False)  # Máximo 50, como en la base
    descripcion_curso = db.Column("descripcion_curso", db.Text)
    imagen_curso = db.Column("imagen_curso", db.LargeBinary)

    