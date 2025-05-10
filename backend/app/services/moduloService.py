from app.models.modulo import Modulo
from app.extensions import db

def crear_modulo(data):
    nuevo_modulo = Modulo(**data)
    
    db.session.add(nuevo_modulo)
    db.session.commit()
    
    return nuevo_modulo, None

def get_all_modulos():
    return Modulo.query.all()