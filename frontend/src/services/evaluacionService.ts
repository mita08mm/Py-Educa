import axios from "axios";
import type { Evaluacion } from "../types/evaluacion";

import { API_BASE_URL } from "../config"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const evaluacionService = {
  create: async (data: Evaluacion): Promise<Evaluacion> => {
    const response = await api.post("/evaluacion/", data);
    return response.data as Evaluacion;
  },

  getAll: async (): Promise<Evaluacion[]> => {
    const response = await api.get("/evaluacion/");
    return response.data as Evaluacion[];
  },
};
