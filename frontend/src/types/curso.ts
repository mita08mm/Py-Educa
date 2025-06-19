export interface Curso {
  cod_curso?: number;
  titulo_curso: string;
  descripcion_curso?: string;
  imagen_curso?: string;
}
export interface CreateCursoData {
  titulo_curso: string;
  descripcion_curso: string;
  imagen_curso: string | null;
}
