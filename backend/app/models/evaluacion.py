from app.extensions import db
from app.models.seccion import Seccion

class Evaluacion(db.Model):
    __tablename__ = "evaluacion"

    cod_evaluacion = db.Column("cod_evaluacion", db.Integer, primary_key=True, autoincrement=True)
    cod_modulo = db.Column("cod_modulo", db.Integer, nullable=True)
    cod_seccion = db.Column("cod_seccion", db.Integer, nullable=True)

    __table_args__ = (
        db.ForeignKeyConstraint(
            ["cod_modulo", "cod_seccion"],
            ["seccion.cod_modulo", "seccion.cod_seccion"]
        ),
    )
