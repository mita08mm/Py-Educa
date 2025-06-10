from app.extensions import db
from app.models.nota import Nota
from app.models.problema import Problema

class NotaService:

    def calificar_problema(data):
        cod_problema = data["cod_problema"]
        cod_usuario = data["cod_usuario"]

        nota_existente = Nota.query.get((cod_problema, cod_usuario))

        if nota_existente:
            nota_existente.nota = data["nota"]
            nota_existente.nota_total = data["nota_total"]
        else:
            nota_existente = Nota(
                cod_problema=cod_problema,
                cod_usuario=cod_usuario,
                nota=data["nota"],
                nota_total=data["nota_total"]
            )
            db.session.add(nota_existente)

        db.session.commit()
        return nota_existente, None
    
    def obtener_nota(cod_problema, cod_usuario):
        nota = Nota.query.filter_by(
            cod_problema=cod_problema, 
            cod_usuario=cod_usuario
        ).first()
        return nota, None if nota else None
    
    def obtener_notas_de_usuario(cod_usuario):
        resultados = (
            db.session.query(Nota, Problema)
            .join(Problema, Nota.cod_problema == Problema.cod_problema)
            .filter(Nota.cod_usuario == cod_usuario)
            .all()
        )

        notas_con_problemas = [
            {
                "cod_problema": problema.cod_problema,
                "titulo_problema": problema.titulo_problema,
                "descripcion_problema": problema.descripcion_problema,
                "nota": float(nota.nota),
                "nota_total": float(nota.nota_total)
            }
            for nota, problema in resultados
        ]

        return notas_con_problemas if notas_con_problemas else None