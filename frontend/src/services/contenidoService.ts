import axios from "axios";
import type { Contenido } from "../types/contenido";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const contenidoService = {
  getBySubseccion: async (cod_subseccion: number): Promise<Contenido[]> => {
    try {
      const response = await api.get(`/contenido/${cod_subseccion}`);
      const data = response.data;
      if (Array.isArray(data)) {
        return data.filter(item => item && typeof item === 'object' && 'cod_contenido' in item);
      }
      return [];
    } catch (error) {
      console.error("Error obteniendo contenido:", error);
      return [];
    }
  },

  create: async (
    cod_subseccion: number,
    data: FormData
  ): Promise<Contenido> => {
    const response = await api.post(`/contenido/${cod_subseccion}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data as Contenido;
  },
};
