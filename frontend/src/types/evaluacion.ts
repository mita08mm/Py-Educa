export interface Evaluacion {
  cod_evaluacion?: number;
  cod_modulo: number;
  titulo_evaluacion: string;
  descripcion_evaluacion: string;
  input: string;
  output: string;
  input_ejemplo: string;
  output_ejemplo: string;
  codigo: string;
}
