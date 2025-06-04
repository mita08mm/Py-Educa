from app.extensions import db
from app.models.rol import Rol
class Usuario(db.Model):
    __tablename__ = 'usuario'

    cod_usuario = db.Column('cod_usuario', db.Integer, primary_key=True, autoincrement=True)
    cod_rol = db.Column('cod_rol', db.Integer, db.ForeignKey('rol.cod_rol'), nullable=False)
    nombre = db.Column('nombre', db.String(256), nullable=False)
    usuario = db.Column('usuario', db.String(20), nullable=False)
    password = db.Column('password', db.String(256), nullable=False)
    email = db.Column('email', db.String(256), nullable=False)

    rol = db.relationship("Rol")
