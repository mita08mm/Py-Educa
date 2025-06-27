import { useState, useEffect } from "react";
import type { Modulo } from "../types/modulo";
import type { Seccion, Subseccion } from "../types/seccion";
import { moduloService } from "../services/moduloService";
import { seccionService, subseccionService } from "../services/seccionService";

interface SeccionConSubsecciones extends Seccion {
  subsecciones: Subseccion[];
}

export const useModuloDetalle = (moduloId: number) => {
  const [modulo, setModulo] = useState<Modulo | null>(null);
  const [secciones, setSecciones] = useState<SeccionConSubsecciones[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModuloDetalle = async () => {
      try {
        setLoading(true);

        const [modulosData, seccionesData, subseccionesData] =
          await Promise.all([
            moduloService.getModulos(),
            seccionService.getAll(),
            subseccionService.getAll(),
          ]);

        const moduloEncontrado = modulosData.find(
          (m) => m.cod_modulo === moduloId
        );
        if (!moduloEncontrado) {
          throw new Error("Módulo no encontrado");
        }

        const seccionesDelModulo = seccionesData.filter(
          (s) => s.cod_modulo === moduloId
        );

        const seccionesConSubsecciones: SeccionConSubsecciones[] =
          seccionesDelModulo.map((seccion) => ({
            ...seccion,
            subsecciones: subseccionesData.filter(
              (sub) =>
                sub.cod_seccion === seccion.cod_seccion &&
                sub.cod_modulo === moduloId
            ),
          }));

        setModulo(moduloEncontrado);
        setSecciones(seccionesConSubsecciones);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchModuloDetalle();
  }, [moduloId]);

  return { modulo, secciones, loading, error };
};
