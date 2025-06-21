from app.extensions import db
from app.models.evaluacion import Evaluacion
from app.models.problema import Problema
from app.models.modulo import Modulo
from app.schemas.evaluacionSchema import (
    EvaluacionCreateSchema, 
    EvaluacionResponseSchema,
    EvaluacionConProblemasSchema
)
from marshmallow import ValidationError

def crear_evaluacion(data):
    try:
        # Validar los datos de entrada usando el schema
        schema = EvaluacionCreateSchema()
        validated_data = schema.load(data)
        
        # Verificar si el módulo existe
        modulo = Modulo.query.get(validated_data['cod_modulo'])
        if not modulo:
            return {
                "error": "El módulo no existe"
            }, 404

        # Crear la nueva evaluación
        nueva_evaluacion = Evaluacion(
            cod_modulo=validated_data['cod_modulo'],
            titulo_evaluacion=validated_data['titulo_evaluacion'],
            descripcion_evaluacion=validated_data.get('descripcion_evaluacion')
        )
        
        # Guardar en la base de datos
        db.session.add(nueva_evaluacion)
        db.session.commit()
        
        # Serializar la respuesta
        response_schema = EvaluacionResponseSchema()
        evaluacion_data = response_schema.dump(nueva_evaluacion)
        
        return evaluacion_data, 201
        
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

def obtener_evaluacion_por_modulo(cod_modulo):
    """
    Obtiene la evaluación de un módulo específico con sus problemas
    
    Args:
        cod_modulo (int): ID del módulo
        
    Returns:
        tuple: (evaluacion_data, status_code)
    """
    try:
        evaluacion = Evaluacion.query.filter_by(cod_modulo=cod_modulo).first()
        
        if not evaluacion:
            return {
                'error': 'No se encontró evaluación para este módulo'
            }, 404
        
        # Obtener los problemas de esta evaluación
        problemas = Problema.query.filter_by(cod_evaluacion=evaluacion.cod_evaluacion).all()
        
        # Serializar la respuesta con problemas
        response_schema = EvaluacionConProblemasSchema()
        evaluacion_data = response_schema.dump({
            'cod_evaluacion': evaluacion.cod_evaluacion,
            'cod_modulo': evaluacion.cod_modulo,
            'titulo_evaluacion': evaluacion.titulo_evaluacion,
            'descripcion_evaluacion': evaluacion.descripcion_evaluacion,
            'problemas': problemas
        })
        
        return evaluacion_data, 200
        
    except Exception as e:
        return {
            'error': 'Error interno del servidor',
            'message': str(e)
        }, 500