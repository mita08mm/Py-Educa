export interface Seccion {
  cod_seccion?: number;
  titulo_seccion: string;
  descripcion_seccion?: string;
  cod_modulo: number;
}

export interface Subseccion {
  cod_subseccion?: number;
  titulo_subseccion: string;
  descripcion_subseccion?: string;
  cod_modulo: number;
  cod_seccion: number;
}
