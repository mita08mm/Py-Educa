from app.extensions import db
from app.models.problema import Problema
from app.models.usuario import Usuario

class Nota(db.Model):
    __tablename__ = "nota"

    cod_problema = db.Column("cod_problema", db.Integer, db.ForeignKey("problema.cod_problema"), primary_key=True, nullable=False)
    cod_usuario = db.Column("cod_usuario", db.Integer, db.ForeignKey("usuario.cod_usuario"), primary_key=True, nullable=False)
    nota = db.Column("nota", db.Numeric, nullable=False)
    nota_total = db.Column("nota_total", db.Numeric, nullable=False)

