from app.extensions import db
from app.models.nota import Nota

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
        return nota_existente
