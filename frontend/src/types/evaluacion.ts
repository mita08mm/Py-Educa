export interface Evaluacion {
  cod_evaluacion?: number;
  cod_modulo: number;
  titulo_evaluacion: string;
  descripcion_evaluacion: string;
  problemas?: Problema[];
}

export interface Problema {
  cod_problema?: number;
  cod_evaluacion: number;
  titulo_problema: string;
  descripcion_problema: string;
  input: string;
  output: string;
  input_ejemplo: string;
  output_ejemplo: string;
  codigo: string;
}
export interface CreateEvaluacionData {
  cod_modulo: number;
  titulo_evaluacion: string;
  descripcion_evaluacion: string;
}
