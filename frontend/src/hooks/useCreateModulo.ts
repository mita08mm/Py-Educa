import { useState } from "react";
import { moduloService } from "../services/moduloService";

interface CreateModuloData {
  cod_curso: number;
  titulo_modulo: string;
  descripcion_modulo?: string;
}

export const useCreateModulo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createModulo = async (data: CreateModuloData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await moduloService.createModulo(data);
      setSuccess(true);
    } catch (err) {
      console.error("Error en useCreateModulo:", err);
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

  return { createModulo, loading, error, success, reset };
};
