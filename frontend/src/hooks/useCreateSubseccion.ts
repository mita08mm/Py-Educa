import { useState } from "react";
import { subseccionService } from "../services/seccionService";
import type { Subseccion } from "../types/seccion";

export const useCreateSubseccion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createSubseccion = async (data: Subseccion) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await subseccionService.create(data);
      setSuccess(true);
    } catch (err) {
      console.error("Error en useCreateSubseccion:", err);
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

  return { createSubseccion, loading, error, success, reset };
};
