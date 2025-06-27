export interface Modulo {
  cod_curso: number;
  cod_modulo: number;
  titulo_modulo: string;
  descripcion_modulo: string;
}
export interface CreateModuloData {
  cod_curso: number;
  titulo_modulo: string;
  descripcion_modulo?: string;
}
