from app.extensions import db

class Ejemplo(db.Model):
    __tablename__ = "ejemplos"

    cod_problema = db.Column(db.Integer, db.ForeignKey('problema.cod_problema'), primary_key=True)
    cod_ejemplo = db.Column(db.Integer, primary_key=True, autoincrement=True)
    input_ejemplo = db.Column(db.Text)
    output_ejemplo = db.Column(db.Text)

    problema = db.relationship("Problema", back_populates="ejemplos")
