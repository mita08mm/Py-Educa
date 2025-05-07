from app.models.subseccion import Subseccion
from app.extensions import db

def get_all_subsecciones():
    return Subseccion.query.all()

def create_subseccion(data):
    subseccion = Subseccion(**data)
    db.session.add(subseccion)
    db.session.commit()
    return subseccion