import axios from "axios";
import type { CreateProblemaData } from "../types/evaluacion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const problemaService = {
  create: async (data: CreateProblemaData) => {
    const response = await api.post("/problema/crear", data);
    return response.data;
  },
};
