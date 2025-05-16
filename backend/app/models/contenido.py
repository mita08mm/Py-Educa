from app.extensions import db
from app.models.subseccion import Subseccion

class Contenido(db.Model):
    __tablename__ = "contenido"

    cod_modulo = db.Column("cod_modulo", db.Integer, primary_key=True)
    cod_seccion = db.Column("cod_seccion", db.Integer, primary_key=True)
    cod_subseccion = db.Column("cod_subseccion", db.Integer, primary_key=True)
    cod_contenido = db.Column("cod_contenido", db.Integer, primary_key=True, autoincrement=True)

    imagen = db.Column("imagen", db.LargeBinary)
    descripcion = db.Column("descripcion", db.Text)
    link = db.Column("link", db.String(500))

    subseccion = db.relationship(
        "Subseccion",
        backref=db.backref("contenidos", lazy=True),
        primaryjoin=(
            "and_("
            "Contenido.cod_modulo == Subseccion.cod_modulo, "
            "Contenido.cod_seccion == Subseccion.cod_seccion, "
            "Contenido.cod_subseccion == Subseccion.cod_subseccion"
            ")"
        ),
        foreign_keys=[cod_modulo, cod_seccion, cod_subseccion],
    )
