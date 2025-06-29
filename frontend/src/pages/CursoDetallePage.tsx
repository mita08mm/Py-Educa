import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCursoDetalle } from "../hooks/useCursoDetalle";
import ModuloCard from "../components/ui/ModuloCard";
import CrearModuloModal from "../components/ui/CrearModuloModal";
import { useModo } from "../context/ModoContext";

const CursoDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cursoId = id ? parseInt(id) : 0;
  const { isModoProfesor } = useModo();

  const { curso, modulos, loading, error } = useCursoDetalle(cursoId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModuloCreated = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-neo-periwinkle border-4 border-black shadow-brutal p-8 animate-pulse">
          <span className="font-brutal text-2xl">CARGANDO CURSO...</span>
        </div>
      </div>
    );
  }

  if (error || !curso) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
        <div className="bg-neo-red border-4 border-black shadow-brutal p-8">
          <span className="font-brutal text-2xl text-white">
            ERROR: {error || "Curso no encontrado"}
          </span>
        </div>
        <button
          onClick={() => navigate("/cursos")}
          className="bg-neo-cyan rounded-lg shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
        >
          ← VOLVER A CURSOS
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
          <span className="font-bold text-neo-lime">{curso.titulo_curso}</span>
        </div>
      </nav>

      {/* Información del curso */}
      <div className="bg-neo-periwinkle rounded-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Imagen del curso */}
          <div className="lg:w-1/3">
            <div className="bg-neo-mint rounded-xl h-64 flex items-center justify-center">
              {curso.imagen_curso ? (
                <img
                  src={curso.imagen_curso}
                  alt={curso.titulo_curso}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="font-brutal text-6xl">📚</span>
              )}
            </div>
          </div>

          {/* Información */}
          <div className="lg:w-2/3">
            <h1 className="font-brutal text-4xl text-neo-cream mb-4">
              {curso.titulo_curso.toUpperCase()}
            </h1>
            <p className="text-xl font-bold text-neo-mint mb-6">
              {curso.descripcion_curso}
            </p>

            {/* Stats del curso */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {modulos.length}
                </div>
                <div className="font-bold">MÓDULOS
                </div>
              </div>
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">0%</div>
                <div className="font-bold">PROGRESO</div>
              </div>
              {isModoProfesor && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-neo-peach rounded-lg p-4 text-center hover:bg-neo-lime hover:text-neo-cream transition-all duration-100 hover:scale-105"
                >
                  <div className="font-brutal text-2xl mb-1">+</div>
                  <div className="font-bold">CREAR MÓDULO</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Título de módulos */}
      <div className="bg-neo-periwinkle rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="font-brutal text-3xl text-neo-cream">
            📋 MÓDULOS DEL CURSO ({modulos.length})
          </h2>
        </div>
      </div>

      {/* Grid de módulos */}
      {modulos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulos.map((modulo, index) => (
            <ModuloCard key={modulo.cod_modulo} modulo={modulo} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-neo-warning rounded-lg p-8 inline-block">
            <span className="font-brutal text-2xl text-neo-aqua">
              {isModoProfesor 
                ? 'NO HAY MÓDULOS DISPONIBLES'
                : 'NO HAY MÓDULOS PARA ESTUDIAR'
              }
            </span>
            <br />
          </div>
        </div>
      )}

      {/* Botón flotante para volver */}
      <div className="fixed bottom-8 left-8">
        <button
          onClick={() => navigate("/cursos")}
          className="bg-neo-peach rounded-lg px-6 py-4 font-brutal text-lg text-neo-cream hover:bg-neo-lime hover:text-neo-cream transition-all duration-100 hover:scale-105"
        >
          ← VOLVER
        </button>
      </div>

      {/* Modal para crear módulo (solo en modo profesor) */}
      {isModoProfesor && (
        <CrearModuloModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cursoId={cursoId}
          cursoTitulo={curso.titulo_curso}
          onModuloCreated={handleModuloCreated}
        />
      )}
    </div>
  );
};

export default CursoDetallePage;
