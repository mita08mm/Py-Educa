from app.models.seccion import Seccion
from app.extensions import db

def get_all_secciones():
    return Seccion.query.all()

def create_seccion(data):
    seccion = Seccion(**data)
    db.session.add(seccion)
    db.session.commit()
    return seccion
