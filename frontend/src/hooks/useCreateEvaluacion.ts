import { useState } from "react";
import { evaluacionService } from "../services/evaluacionService";

interface CreateEvaluacionData {
  cod_modulo: number;
  titulo_evaluacion: string;
  descripcion_evaluacion: string;
}

export const useCreateEvaluacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createEvaluacion = async (data: CreateEvaluacionData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await evaluacionService.create(data);
      setSuccess(true);
    } catch (err) {
      console.error("Error en useCreateEvaluacion:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return { createEvaluacion, loading, error, success, reset };
};
