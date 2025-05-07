from app.extensions import ma
from app.models.modulo import Modulo

class ModuloSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Modulo
        include_fk = True  # Para incluir cod_curso (clave foránea si la tuviera)
        load_instance = True

modulo_schema = ModuloSchema()
modulos_schema = ModuloSchema(many=True)