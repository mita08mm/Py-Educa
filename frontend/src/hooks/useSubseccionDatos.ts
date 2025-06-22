import { useState, useEffect } from "react";
import { subseccionService } from "../services/seccionService";
import type { Subseccion } from "../types/seccion";

export const useSubseccionDatos = (subseccionId: number) => {
  const [subseccionDatos, setSubseccionDatos] = useState<Subseccion | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubseccionDatos = async () => {
      try {
        setLoading(true);
        const subsecciones = await subseccionService.getAll();
        const found = subsecciones.find(
          (s) => s.cod_subseccion === subseccionId
        );
        setSubseccionDatos(found || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    if (subseccionId) {
      fetchSubseccionDatos();
    }
  }, [subseccionId]);

  return { subseccionDatos, loading, error };
};
