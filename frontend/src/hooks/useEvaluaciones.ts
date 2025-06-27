import { useState, useEffect, useCallback } from "react";
import type { Evaluacion } from "../types/evaluacion";
import { evaluacionService } from "../services/evaluacionService";

export const useEvaluaciones = (moduloId: number) => {
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvaluaciones = useCallback(async () => {
    try {
      setLoading(true);

      const data = await evaluacionService.getByModulo(moduloId);
      setEvaluaciones(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [moduloId]);

  useEffect(() => {
    if (moduloId) {
      fetchEvaluaciones();
    }
  }, [fetchEvaluaciones, moduloId]);

  return { evaluaciones, loading, error, refetch: fetchEvaluaciones };
};
