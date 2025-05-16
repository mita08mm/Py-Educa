from app.models.contenido import Contenido
from app.extensions import db

def get_contenido_por_subseccion(cod_subseccion: int):
    return Contenido.query.filter_by(cod_subseccion=cod_subseccion).all()
