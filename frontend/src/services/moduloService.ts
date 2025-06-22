import type { Modulo, CreateModuloData } from "../types/modulo";
import axios from "axios";

import { API_BASE_URL } from "../config"; 

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
      return response.data as Modulo[];
    } catch (error) {
      console.error("Error obteniendo módulos:", error);
      throw error;
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
