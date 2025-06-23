from app.extensions import db
from app.models.evaluacion import Evaluacion

class Problema(db.Model):
    __tablename__ = 'problema'
    
    cod_problema = db.Column(db.Integer, primary_key=True)
    cod_evaluacion = db.Column(db.Integer, nullable=False)
    titulo_problema = db.Column(db.String(100), nullable=False)
    descripcion_problema = db.Column(db.Text, nullable=False)
    input = db.Column(db.Text)
    output = db.Column(db.Text)
    editor= db.Column(db.Text)
    input_ejemplo = db.Column(db.Text)
    output_ejemplo = db.Column(db.Text)