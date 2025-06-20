import axios from "axios";
import type { Contenido } from "../types/contenido";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const contenidoService = {
  getBySubseccion: async (cod_subseccion: number): Promise<Contenido[]> => {
    const response = await api.get(`/contenido/${cod_subseccion}`);
    return response.data as Contenido[];
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
