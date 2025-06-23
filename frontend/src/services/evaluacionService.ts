import axios from "axios";
import type { Evaluacion, CreateEvaluacionData } from "../types/evaluacion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const evaluacionService = {
  create: async (data: CreateEvaluacionData): Promise<Evaluacion> => {
    console.log(data);
    const response = await api.post("/evaluacion/", data);
    return response.data as Evaluacion;
  },

  getByModulo: async (cod_modulo: number): Promise<Evaluacion[]> => {
    const response = await api.get(`/evaluacion/modulo/${cod_modulo}`);
    return response.data as Evaluacion[];
  },
};
