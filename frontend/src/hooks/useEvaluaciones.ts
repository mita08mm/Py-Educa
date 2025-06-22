import { useState, useEffect, useCallback } from "react";
import type { Evaluacion } from "../types/evaluacion";
import { evaluacionService } from "../services/evaluacionService";

export const useEvaluaciones = (moduloId?: number) => {
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvaluaciones = useCallback(async () => {
    try {
      setLoading(true);
      const data = await evaluacionService.getAll();

      const filteredData = moduloId
        ? data.filter((evaluacion) => evaluacion.cod_modulo === moduloId)
        : data;

      setEvaluaciones(filteredData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [moduloId]);

  useEffect(() => {
    fetchEvaluaciones();
  }, [fetchEvaluaciones]);

  return { evaluaciones, loading, error, refetch: fetchEvaluaciones };
};
