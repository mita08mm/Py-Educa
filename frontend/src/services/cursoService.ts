import type { Curso } from "../types/curso";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const cursoService = {
  async getCursos(): Promise<Curso[]> {
    const response = await fetch(`${API_BASE_URL}/cursos`);
    if (!response.ok) {
      throw new Error("Error al obtener los cursos");
    }
    return response.json();
  },
};
