from app.models.modulo import Modulo
from app.extensions import db

def crear_modulo(data):
    # Validación básica (puedes usar Marshmallow para más complejidad)
    if not data.get('titulo_modulo') or not data.get('cod_curso'):
        return None, 'Título y código de curso son requeridos'
    
    # Verificar si el módulo ya existe (por título o código)
    if Modulo.query.filter_by(titulo_modulo=data['titulo_modulo']).first():
        return None, 'El título del módulo ya existe'
    
    nuevo_modulo = Modulo(
        cod_curso=data['cod_curso'],
        titulo_modulo=data['titulo_modulo'],
        descripcion_modulo=data.get('descripcion_modulo')
    )
    
    db.session.add(nuevo_modulo)
    db.session.commit()
    
    return nuevo_modulo, None