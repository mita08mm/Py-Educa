import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const codeExecutionService = {
  execute: async (code: string) => {
    const response = await api.post("/code/execute", { code });
    return response.data;
  },
}; 