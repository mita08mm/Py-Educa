from app.extensions import db
from app.models.seccion import Seccion  

class Subseccion(db.Model):
    __tablename__ = "subseccion"

    cod_subseccion = db.Column("cod_subseccion", db.Integer, primary_key=True)
    titulo_subseccion = db.Column("titulo_subseccion", db.String(255), nullable=False)
    descripcion_subseccion = db.Column("descripcion_subseccion", db.String(255))
    cod_modulo = db.Column("cod_modulo", db.Integer, nullable=False)
    cod_seccion = db.Column("cod_seccion", db.Integer, db.ForeignKey("seccion.cod_seccion"), nullable=False)
