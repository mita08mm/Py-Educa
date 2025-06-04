from app.extensions import db
from app.models.subseccion import Subseccion

class Contenido(db.Model):
    __tablename__ = "contenido"

    cod_contenido = db.Column(db.Integer, primary_key=True, autoincrement=True)

    cod_modulo = db.Column(db.Integer, nullable=False)
    cod_seccion = db.Column(db.Integer, nullable=False)
    cod_subseccion = db.Column(db.Integer, nullable=False)

    imagen = db.Column(db.LargeBinary)
    descripcion = db.Column(db.Text)
    link = db.Column(db.String(500))

    __table_args__ = (
        db.UniqueConstraint(
            "cod_modulo", "cod_seccion", "cod_subseccion",
            name="uq_modulo_seccion_subseccion"
        ),
    )

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
