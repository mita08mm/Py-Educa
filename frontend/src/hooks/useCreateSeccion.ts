import { useState } from "react";
import { seccionService } from "../services/seccionService";
import type { Seccion } from "../types/seccion";

export const useCreateSeccion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createSeccion = async (data: Seccion) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await seccionService.create(data);
      setSuccess(true);
    } catch (err) {
      console.error("Error en useCreateSeccion:", err);
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

  return { createSeccion, loading, error, success, reset };
};
