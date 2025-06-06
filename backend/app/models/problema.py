from app.extensions import db
from app.models.evaluacion import Evaluacion
from app.models.subseccion import Subseccion

class Problema(db.Model):
    __tablename__ = "problema"

    cod_problema = db.Column("cod_problema", db.Integer, primary_key=True, autoincrement=True)
    cod_evaluacion = db.Column("cod_evaluacion", db.Integer, db.ForeignKey("evaluacion.cod_evaluacion"), nullable=True)
    cod_modulo = db.Column("cod_modulo", db.Integer, nullable=True)
    cod_seccion = db.Column("cod_seccion", db.Integer, nullable=True)
    cod_subseccion = db.Column("cod_subseccion", db.Integer, nullable=True)

    titulo_problema = db.Column("titulo_problema", db.String(100), nullable=False)
    descripcion_problema = db.Column("descripcion_problema", db.Text, nullable=False)
    input = db.Column("input", db.Text, nullable=False)
    output = db.Column("output", db.Text, nullable=False)

    __table_args__ = (
        db.ForeignKeyConstraint(
            ["cod_modulo", "cod_seccion", "cod_subseccion"],
            ["subseccion.cod_modulo", "subseccion.cod_seccion", "subseccion.cod_subseccion"]
        ),
    )

