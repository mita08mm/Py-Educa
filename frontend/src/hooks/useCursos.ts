import { useState, useEffect } from "react";
import type { Curso } from "../types/curso";
import { cursoService } from "../services/cursoService";

export const useCursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        const data = await cursoService.getCursos();
        setCursos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return { cursos, loading, error };
};
