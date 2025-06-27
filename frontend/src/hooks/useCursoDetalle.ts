import { useState, useEffect } from "react";
import type { Curso } from "../types/curso";
import type { Modulo } from "../types/modulo";
import { cursoService } from "../services/cursoService";
import { moduloService } from "../services/moduloService";

export const useCursoDetalle = (cursoId: number) => {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursoDetalle = async () => {
      try {
        setLoading(true);

        const [cursosData, modulosData] = await Promise.all([
          cursoService.getCursos(),
          moduloService.getModulos(),
        ]);

        const cursoEncontrado = cursosData.find((c) => c.cod_curso === cursoId);
        if (!cursoEncontrado) {
          throw new Error("Curso no encontrado");
        }

        const modulosDelCurso = modulosData.filter(
          (m) => m.cod_curso === cursoId
        );

        setCurso(cursoEncontrado);
        setModulos(modulosDelCurso);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCursoDetalle();
  }, [cursoId]);

  return { curso, modulos, loading, error };
};
