import type { Curso } from "../types/curso";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      return response.data as Curso[];
    } catch (error) {
      console.error("Error obteniendo cursos:", error);
      throw error;
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
