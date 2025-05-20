from app.extensions import db

class Evaluacion(db.Model):
    __tablename__ = "evaluacion"

    cod_evaluacion = db.Column(db.Integer, primary_key=True)
    cod_modulo = db.Column(db.Integer, nullable=False)
    cod_seccion = db.Column(db.Integer, nullable=False)
