from app.extensions import db

class Modulo(db.Model):
    __tablename__ = 'modulo'

    cod_modulo = db.Column(db.Integer, primary_key=True)
    cod_curso = db.Column(db.Integer, nullable=False)
    titulo_modulo = db.Column(db.String(256), nullable=False)
    descripcion_modulo = db.Column(db.Text)
