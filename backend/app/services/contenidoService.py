from app.models.contenido import Contenido
from app.extensions import db

def get_contenido_por_subseccion(cod_subseccion: int):
    return Contenido.query.filter_by(cod_subseccion=cod_subseccion).all()

def agregar_contenido(cod_modulo, cod_seccion, cod_subseccion, descripcion, link, imagen):
    nuevo_contenido = Contenido(
        cod_modulo=cod_modulo,
        cod_seccion=cod_seccion,
        cod_subseccion=cod_subseccion,
        descripcion=descripcion,
        link=link,
        imagen=imagen
    )
    db.session.add(nuevo_contenido)
    db.session.commit()
    return nuevo_contenido

def eliminar_contenido(cod_contenido: int):
    contenido = Contenido.query.filter_by(cod_contenido=cod_contenido).first()
    if contenido:
        db.session.delete(contenido)
        db.session.commit()
        return True
    return False

def editar_contenido(cod_contenido: int, descripcion: str = None, link: str = None, imagen: bytes = None):
    contenido = Contenido.query.filter_by(cod_contenido=cod_contenido).first()
    if not contenido:
        return None
    
    if descripcion is not None:
        contenido.descripcion = descripcion
    if link is not None:
        contenido.link = link
    if imagen is not None:
        contenido.imagen = imagen
    
    db.session.commit()
    return contenido
