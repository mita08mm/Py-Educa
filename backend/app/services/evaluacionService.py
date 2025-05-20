from app.models.evaluacion import Evaluacion
from app.models.modulo import Modulo
from app.models.seccion import Seccion
from app.models.problema import Problema
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
    
def obtener_evaluacion_completa(cod_evaluacion: int):
    evaluacion = Evaluacion.query.get(cod_evaluacion)
    if not evaluacion:
        raise ValueError("Evaluación no encontrada")

    seccion = Seccion.query.filter_by(
        cod_modulo=evaluacion.cod_modulo,
        cod_seccion=evaluacion.cod_seccion
    ).first()

    if not seccion:
        raise ValueError("Sección asociada no encontrada")

    problemas = Problema.query.filter_by(cod_evaluacion=cod_evaluacion).all()
    lista_problemas = []
    for p in problemas:
        ejemplos = [
            {
                "cod_ejemplo": ej.cod_ejemplo,
                "input_ejemplo": ej.input_ejemplo,
                "output_ejemplo": ej.output_ejemplo
            }
            for ej in p.ejemplos
        ]
        lista_problemas.append({
            "cod_problema": p.cod_problema,
            "titulo": p.titulo_problema,
            "descripcion": p.descripcion_problema,
            "input": p.input,
            "output": p.output,
            "ejemplos": ejemplos
        })

    return {
        "cod_evaluacion": evaluacion.cod_evaluacion,
        "seccion": {
            "cod_modulo": seccion.cod_modulo,
            "titulo_seccion": seccion.titulo_seccion,
            "descripcion_seccion": seccion.descripcion_seccion
        },
        "problemas": lista_problemas
    }