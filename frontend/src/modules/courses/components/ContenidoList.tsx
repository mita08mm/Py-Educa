import { useState, useEffect } from 'react';
import { contenidoService, Contenido } from '../../../services/api';

interface ContenidoListProps {
  cod_subseccion: number;
}

export const ContenidoList = ({ cod_subseccion }: ContenidoListProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contenidos, setContenidos] = useState<Contenido[]>([]);
  const extraerYoutubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : '';
  };
  
  const cargarContenidos = async () => {
    try {
      setLoading(true);
      const data = await contenidoService.getBySubseccion(cod_subseccion);
      console.log("Respuesta de contenido:", data);
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
          className="bg-[#1E293B] border border-[#334155] rounded-lg p-4 space-y-4"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {contenido.descripcion && (
              <article
              className={`prose prose-invert max-w-none flex-1 ${
                contenido.imagen ? 'lg:prose-lg' : 'prose-xl'
              }
                prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:font-bold
                prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:font-semibold
                prose-h3:text-xl lg:prose-h3:text-2xl
                prose-p:text-justify prose-p:leading-relaxed
                prose-img:rounded-lg prose-img:shadow-md`}
              dangerouslySetInnerHTML={{ __html: contenido.descripcion }}
            />
            )}
            {contenido.imagen && (
              <div className="lg:w-2/5 xl:w-1/3 flex-shrink-0">
                <img
                  src={contenido.imagen}
                  alt="Contenido"
                  className="max-w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          {contenido.link && (
            <div className="w-full flex justify-center">
              <div className="w-full max-w-3xl overflow-hidden rounded-lg ">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${extraerYoutubeId(contenido.link)}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
              </div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}; 