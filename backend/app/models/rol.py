from app.extensions import db

class Rol(db.Model):
    __tablename__ = 'rol'

    cod_rol = db.Column('cod_rol', db.Integer, primary_key=True, autoincrement=True)
    rol = db.Column('rol', db.String(30), nullable=False)

