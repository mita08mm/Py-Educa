from app.extensions import db

class Problema(db.Model):
    __tablename__ = "problema"

    cod_problema = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cod_evaluacion = db.Column(db.Integer, db.ForeignKey("evaluacion.cod_evaluacion"), nullable=False)
    cod_modulo = db.Column(db.Integer, nullable=False)
    cod_seccion = db.Column(db.Integer, nullable=False)
    cod_subseccion = db.Column(db.Integer, nullable=True)

    titulo_problema = db.Column(db.String(100))
    descripcion_problema = db.Column(db.Text)
    input = db.Column(db.Text)
    output = db.Column(db.Text)

    # Relaciones
    evaluacion = db.relationship("Evaluacion", backref="problemas", lazy=True)
    ejemplos = db.relationship("Ejemplo", back_populates="problema", lazy=True)

