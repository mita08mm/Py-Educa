from app.extensions import db
from app.models.problema import Problema
from app.models.ejemplo import Ejemplo

def crear_problema_con_ejemplos(data):
    problema = Problema(
        cod_evaluacion=data["cod_evaluacion"],
        cod_modulo=data["cod_modulo"],
        cod_seccion=data["cod_seccion"],
        titulo_problema=data["titulo_problema"],
        descripcion_problema=data["descripcion_problema"],
        input=data["input"],
        output=data["output"]
    )

    db.session.add(problema)
    db.session.flush()  # Obtener cod_problema antes de commit

    ejemplos_data = data.get("ejemplos", [])
    for ej in ejemplos_data:
        ejemplo = Ejemplo(
            cod_problema=problema.cod_problema,
            input_ejemplo=ej["input_ejemplo"],
            output_ejemplo=ej["output_ejemplo"]
        )
        db.session.add(ejemplo)

    db.session.commit()
    return problema
