from app.models.evaluacion import Evaluacion
from app.models.modulo import Modulo
from app.models.seccion import Seccion
from app.extensions import db

def crear_seccion_y_evaluacion(data):
    cod_modulo = data.get("cod_modulo")
    titulo_seccion = data.get("titulo_seccion")
    descripcion_seccion = data.get("descripcion_seccion")
    
    # Validar si el módulo existe
    modulo = Modulo.query.get(cod_modulo)
    if not modulo:
        raise ValueError(f"El módulo con código {cod_modulo} no existe.")

    if not cod_modulo or not titulo_seccion:
            raise ValueError("cod_modulo y titulo_seccion son requeridos")
    
    # Crear nueva sección
    nueva_seccion = Seccion(
        cod_modulo=cod_modulo,
        titulo_seccion=titulo_seccion,
        descripcion_seccion=descripcion_seccion
    )
    
    db.session.add(nueva_seccion)
    db.session.flush()
    
    # Crear evaluación asociada a la sección
    nueva_evaluacion = Evaluacion(
        cod_modulo=cod_modulo,
        cod_seccion=nueva_seccion.cod_seccion
    )
    db.session.add(nueva_evaluacion)
    db.session.commit()

    return {
        "cod_modulo": cod_modulo,
        "titulo_seccion": nueva_seccion.titulo_seccion,
        "descripcion_seccion": nueva_seccion.descripcion_seccion,
        "cod_evaluacion": nueva_evaluacion.cod_evaluacion
    }
    