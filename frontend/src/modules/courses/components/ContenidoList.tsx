import { useState, useEffect } from 'react';
import { contenidoService, Contenido } from '../../../services/api';

interface ContenidoListProps {
  cod_subseccion: number;
}

export const ContenidoList = ({ cod_subseccion }: ContenidoListProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contenidos, setContenidos] = useState<Contenido[]>([]);

  const cargarContenidos = async () => {
    try {
      setLoading(true);
      const data = await contenidoService.getBySubseccion(cod_subseccion);
      setContenidos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el contenido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarContenidos();
  }, [cod_subseccion]);

  if (loading) {
    return <div className="text-center py-4 text-[#E2E8F0]">Cargando contenido...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
        {error}
      </div>
    );
  }

  if (contenidos.length === 0) {
    return <div className="text-center py-4 text-[#E2E8F0]">No hay contenido disponible</div>;
  }

  return (
    <div className="space-y-4">
      {contenidos.map((contenido) => (
        <div
          key={contenido.cod_contenido}
          className="bg-[#1E293B] border border-[#334155] rounded-lg p-4"
        >
          {contenido.imagen && (
            <div className="mb-4">
              <img
                src={`data:image/jpeg;base64,${contenido.imagen}`}
                alt="Contenido"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}

          {contenido.descripcion && (
            <div className="prose prose-invert max-w-none mb-4">
              <p className="text-[#E2E8F0]">{contenido.descripcion}</p>
            </div>
          )}

          {contenido.link && (
            <a
              href={contenido.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#46838C] hover:text-[#3A6D75] transition-colors"
            >
              Ver recurso externo →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}; 