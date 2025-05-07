from app.extensions import db
from app.models.modulo import Modulo

class Seccion(db.Model):
    __tablename__ = "seccion"

    cod_seccion = db.Column("cod_seccion", db.Integer, primary_key=True)
    titulo_seccion = db.Column("titulo_seccion", db.String(255), nullable=False)
    descripcion_seccion = db.Column("descripcion_seccion", db.String(255))
    cod_modulo = db.Column("cod_modulo", db.Integer, db.ForeignKey("modulo.cod_modulo"))
