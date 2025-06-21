from app.extensions import db
from app.models.evaluacion import Evaluacion
from app.models.problema import Problema
from app.schemas.problemaSchema import (
    ProblemaCreateSchema, 
    ProblemaResponseSchema
)
from marshmallow import ValidationError

def crear_problema(data):
    """
    Servicio para crear un nuevo problema en la base de datos
    
    Args:
        data (dict): Diccionario con los datos del problema
        
    Returns:
        tuple: (response_data, status_code)
    """
    try:
        # Validar los datos de entrada usando el schema
        schema = ProblemaCreateSchema()
        validated_data = schema.load(data)
        
        # Verificar que la evaluación existe
        evaluacion = Evaluacion.query.get(validated_data['cod_evaluacion'])
        if not evaluacion:
            return {
                'error': 'La evaluación especificada no existe'
            }, 404
        
        # Crear el nuevo problema
        nuevo_problema = Problema(
            cod_evaluacion=validated_data['cod_evaluacion'],
            titulo_problema=validated_data['titulo_problema'],
            descripcion_problema=validated_data['descripcion_problema'],
            input=validated_data.get('input'),
            output=validated_data.get('output'),
            input_ejemplo=validated_data['input_ejemplo'],
            output_ejemplo=validated_data['output_ejemplo']
        )
        
        # Guardar en la base de datos
        db.session.add(nuevo_problema)
        db.session.commit()
        
        # Serializar la respuesta
        response_schema = ProblemaResponseSchema()
        problema_data = response_schema.dump(nuevo_problema)
        
        return {
            'message': 'Problema creado exitosamente',
            'success': True,
            'data': problema_data
        }, 201
        
    except ValidationError as e:
        # Error de validación de datos
        db.session.rollback()
        return {
            'error': 'Datos de entrada inválidos',
            'details': e.messages
        }, 400
        
    except Exception as e:
        # Error interno del servidor
        db.session.rollback()
        return {
            'error': 'Error interno del servidor',
            'message': str(e)
        }, 500