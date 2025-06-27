import { useState, useEffect, useCallback } from "react";
import type { Contenido } from "../types/contenido";
import { contenidoService } from "../services/contenidoService";

export const useContenido = (subseccionId: number) => {
  const [contenido, setContenido] = useState<Contenido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContenido = useCallback(async () => {
    try {
      setLoading(true);
      const data = await contenidoService.getBySubseccion(subseccionId);
      setContenido(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [subseccionId]);

  useEffect(() => {
    if (subseccionId) {
      fetchContenido();
    }
  }, [subseccionId, fetchContenido]);

  return { contenido, loading, error, refetch: fetchContenido };
};
