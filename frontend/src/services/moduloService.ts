import type { Modulo, CreateModuloData } from "../types/modulo";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const moduloService = {
  async getModulos(): Promise<Modulo[]> {
    try {
      const response = await api.get("/modulos");
      const data = response.data;
      // Validar que la respuesta sea un array de módulos
      if (Array.isArray(data)) {
        // Opcional: filtrar solo objetos válidos
        return data.filter(item => item && typeof item === 'object' && 'cod_modulo' in item);
      }
      // Si la API responde con null, undefined o un objeto, retorna array vacío
      return [];
    } catch (error) {
      console.error("Error obteniendo módulos:", error);
      return [];
    }
  },
  async createModulo(data: CreateModuloData): Promise<Modulo> {
    try {
      console.log("Datos del módulo a crear:", data);
      const response = await api.post("/modulos/", data);
      return response.data as Modulo;
    } catch (error) {
      console.error("Error creando módulo:", error);
      throw error;
    }
  },
};
