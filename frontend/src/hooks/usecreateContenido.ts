import { useState } from "react";
import { contenidoService } from "../services/contenidoService";

export const useCreateContenido = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createContenido = async (subseccionId: number, data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      console.log("=== ENVIANDO CONTENIDO ===");
      console.log("Subsección ID:", subseccionId);
      for (const pair of data.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      await contenidoService.create(subseccionId, data);
      setSuccess(true);
    } catch (err) {
      console.error("Error en useCreateContenido:", err);
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

  return { createContenido, loading, error, success, reset };
};
