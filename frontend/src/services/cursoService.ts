import type { Curso } from "../types/curso";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cursoService = {
  async getCursos(): Promise<Curso[]> {
    try {
      const response = await api.get("/cursos");
      const data = response.data;
      // Validar que la respuesta sea un array de cursos
      if (Array.isArray(data)) {
        // Opcional: filtrar solo objetos válidos
        return data.filter(item => item && typeof item === 'object' && 'cod_curso' in item);
      }
      // Si la API responde con null, undefined o un objeto, retorna array vacío
      return [];
    } catch (error) {
      console.error("Error obteniendo cursos:", error);
      return [];
    }
  },

  async createCurso(data: FormData): Promise<Curso> {
    try {
      const response = await api.post("/cursos", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data as Curso;
    } catch (error) {
      console.error("Error creando curso:", error);
      throw error;
    }
  },
};
