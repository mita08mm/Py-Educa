import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContenido } from "../hooks/useContenido";
import { subseccionService } from "../services/seccionService";
import type { Subseccion } from "../types/seccion";
import ContenidoCard from "../components/ui/ContenidoCard";
import CrearContenidoModal from "../components/ui/CrearContenidoModal";

const ContenidoPage = () => {
  const { subseccionId } = useParams<{ subseccionId: string }>();
  const navigate = useNavigate();
  const subseccionIdNum = subseccionId ? parseInt(subseccionId) : 0;

  const { contenido, loading, error, refetch } = useContenido(subseccionIdNum);
  const [subseccion, setSubseccion] = useState<Subseccion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubseccion = async () => {
      try {
        const subsecciones = await subseccionService.getAll();
        const found = subsecciones.find(
          (s) => s.cod_subseccion === subseccionIdNum
        );
        setSubseccion(found || null);
      } catch (err) {
        console.error("Error obteniendo subsección:", err);
      }
    };

    if (subseccionIdNum) {
      fetchSubseccion();
    }
  }, [subseccionIdNum]);

  const handleContenidoCreated = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-neo-yellow border-4 border-black shadow-brutal p-8 animate-pulse">
          <span className="font-brutal text-2xl">CARGANDO CONTENIDO...</span>
        </div>
      </div>
    );
  }

  if (error || !subseccion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
        <div className="bg-neo-red border-4 border-black shadow-brutal p-8">
          <span className="font-brutal text-2xl text-white">
            ERROR: {error || "Subsección no encontrada"}
          </span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-neo-cyan border-4 border-black shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
        >
          ← VOLVER
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="flex items-center space-x-2 bg-neo-periwinkle rounded-lg p-4">
          <button
            onClick={() => navigate("/cursos")}
            className="font-bold text-neo-cream hover:text-neo-lime transition-colors"
          >
            📍 Cursos
          </button>
          <span className="font-brutal text-xl text-neo-cream">→</span>
          <button
            onClick={() => navigate(`/modulo/${subseccion.cod_modulo}`)}
            className="font-bold text-neo-cream hover:text-neo-lime transition-colors"
          >
            Módulo
          </button>
          <span className="font-brutal text-xl text-neo-cream">→</span>
          <span className="font-bold text-neo-lime">
            {subseccion.titulo_subseccion}
          </span>
        </div>
      </nav>

      <div className="bg-neo-periwinkle rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="font-brutal text-3xl text-neo-cream">
            📚 VISUALIZANDO CONTENIDO
          </h2>
        </div>
      </div>

      {/* Header de la subsección */}
      <div className="bg-neo-periwinkle rounded-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Icono grande */}
          <div className="lg:w-1/3">
            <div className="bg-neo-mint rounded-xl h-64 flex items-center justify-center">
              <span className="font-brutal text-6xl">🎯</span>
            </div>
          </div>

          {/* Información */}
          <div className="lg:w-3/4 text-center lg:text-left">
            <h1 className="font-brutal text-4xl text-neo-cream mb-4">
              {subseccion.titulo_subseccion.toUpperCase()}
            </h1>
            {subseccion.descripcion_subseccion && (
              <p className="text-xl font-bold text-neo-mint mb-6">
                {subseccion.descripcion_subseccion}
              </p>
            )}

            {/* Stats del tema */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {contenido.length}
                </div>
                <div className="font-bold">ELEMENTOS</div>
              </div>
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {contenido.filter((c) => c.link).length}
                </div>
                <div className="font-bold">VIDEOS</div>
              </div>
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {contenido.filter((c) => !c.link).length}
                </div>
                <div className="font-bold">TEXTOS</div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-neo-peach rounded-lg p-4 text-center hover:bg-neo-lime hover:text-neo-cream transition-all duration-100 hover:scale-105"
              >
                <div className="font-brutal text-2xl mb-1">+</div>
                <div className="font-bold">AGREGAR CONTENIDO</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-neo-periwinkle rounded-xl p-4 flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="">
          <h2 className="font-brutal text-2xl text-neo-cream">
            📚 MATERIAL DE ESTUDIO
          </h2>
        </div>

        <div className="flex space-x-3 flex-wrap gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-neo-lime rounded-lg px-4 py-2 font-brutal text-neo-cream transition-all duration-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            + AGREGAR CONTENIDO
          </button>
        </div>
      </div>

      {/* Grid de contenido */}
      {contenido.length > 0 ? (
        <div className="space-y-4 mb-8">
          {contenido.map((item, index) => (
            <ContenidoCard
              key={item.cod_contenido}
              contenido={item}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mb-8">
          <div className="shadow-brutal p-8 inline-block mb-6">
            <span className="font-brutal text-2xl">
              NO HAY CONTENIDO DISPONIBLE
            </span>
            <br />
            <span className="text-lg font-bold">
              ¡Agrega videos, imágenes y descripciones!
            </span>
          </div>
          <br />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-neo-lime rounded-lg px-12 py-4 font-brutal text-lg hover:shadow-brutal-lg transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
          >
            + CREAR EL PRIMER CONTENIDO
          </button>
        </div>
      )}


      {/* Navegación inferior */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t-4 border-black">
        <button
          onClick={() => navigate(`/modulo/${subseccion.cod_modulo}`)}
          className="bg-neo-lime rounded-lg shadow-brutal-lg px-8 py-4 font-brutal text-lg hover:shadow-brutal-xl transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
        >
          ← VOLVER AL MÓDULO
        </button>

        <div className="shadow-brutal px-6 py-3">
          <span className="font-brutal text-lg">Tema #{subseccionIdNum}</span>
        </div>

        <button
          disabled
          className="bg-gray-400 rounded-lg shadow-brutal-lg px-8 py-4 font-brutal text-lg cursor-not-allowed opacity-50"
        >
          SIGUIENTE TEMA →
        </button>
      </div>

      {/* Modal para crear contenido */}
      <CrearContenidoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subseccionId={subseccionIdNum}
        subseccionTitulo={subseccion.titulo_subseccion}
        onContenidoCreated={handleContenidoCreated}
      />
    </div>
  );
};

export default ContenidoPage;