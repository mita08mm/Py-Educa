export interface Contenido {
  cod_modulo: number;
  cod_seccion: number;
  cod_subseccion: number;
  cod_contenido: number;
  descripcion?: string;
  link?: string;
  imagen?: string;
}
export interface CreateContenidoData {
  cod_modulo: number;
  cod_seccion: number;
  descripcion?: string;
  link?: string;
  imagen?: string;
}
