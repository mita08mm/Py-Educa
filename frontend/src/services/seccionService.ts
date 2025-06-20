import axios from "axios";
import type { Seccion, Subseccion } from "../types/seccion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const seccionService = {
  getAll: async (): Promise<Seccion[]> => {
    const response = await api.get("/secciones");
    return response.data as Seccion[];
  },

  create: async (data: Seccion): Promise<Seccion> => {
    const response = await api.post("/secciones", data);
    return response.data as Seccion;
  },
};

export const subseccionService = {
  getAll: async (): Promise<Subseccion[]> => {
    const response = await api.get("/subsecciones");
    return response.data as Subseccion[];
  },

  create: async (data: Subseccion): Promise<Subseccion> => {
    const response = await api.post("/subsecciones", data);
    return response.data as Subseccion;
  },
};
