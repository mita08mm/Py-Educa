import { useState } from "react";
import { cursoService } from "../services/cursoService";

export const useCreateCurso = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createCurso = async (
    titulo: string,
    descripcion: string,
    imagen?: File
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Crear FormData
      const formData = new FormData();
      formData.append("titulo_curso", titulo);
      formData.append("descripcion_curso", descripcion);

      if (imagen) {
        formData.append("imagen_curso", imagen);
      }

      await cursoService.createCurso(formData);
      setSuccess(true);
    } catch (err) {
      console.error("Error en useCreateCurso:", err);
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

  return { createCurso, loading, error, success, reset };
};
