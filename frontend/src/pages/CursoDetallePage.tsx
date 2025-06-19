import { useParams, useNavigate } from "react-router-dom";
import { useCursoDetalle } from "../hooks/useCursoDetalle";
import ModuloCard from "../components/ui/ModuloCard";

const CursoDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cursoId = id ? parseInt(id) : 0;

  const { curso, modulos, loading, error } = useCursoDetalle(cursoId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-neo-yellow border-4 border-black shadow-brutal p-8 animate-pulse">
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
          className="bg-neo-cyan border-4 border-black shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
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
        <div className="flex items-center space-x-2 bg-white border-3 border-black shadow-brutal p-4">
          <button
            onClick={() => navigate("/cursos")}
            className="font-bold hover:text-neo-red transition-colors"
          >
            📍 Cursos
          </button>
          <span className="font-brutal text-xl">→</span>
          <span className="font-bold text-neo-red">{curso.titulo_curso}</span>
        </div>
      </nav>

      {/* Información del curso */}
      <div className="bg-neo-magenta border-5 border-black shadow-brutal-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Imagen del curso */}
          <div className="lg:w-1/3">
            <div className="bg-neo-yellow border-4 border-black shadow-brutal-lg h-64 flex items-center justify-center">
              {curso.imagen_curso ? (
                <img
                  src={curso.imagen_curso}
                  alt={curso.titulo_curso}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-brutal text-6xl">📚</span>
              )}
            </div>
          </div>

          {/* Información */}
          <div className="lg:w-2/3">
            <h1 className="font-brutal text-4xl text-white mb-4">
              {curso.titulo_curso.toUpperCase()}
            </h1>
            <p className="text-xl font-bold text-black mb-6">
              {curso.descripcion_curso}
            </p>

            {/* Stats del curso */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neo-lime border-3 border-black shadow-brutal p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {modulos.length}
                </div>
                <div className="font-bold">MÓDULOS</div>
              </div>
              <div className="bg-neo-coral border-3 border-black shadow-brutal p-4 text-center">
                <div className="font-brutal text-2xl mb-1">0%</div>
                <div className="font-bold">PROGRESO</div>
              </div>
              <div className="bg-neo-cyan border-3 border-black shadow-brutal p-4 text-center">
                <div className="font-brutal text-2xl mb-1">⭐</div>
                <div className="font-bold">PREMIUM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Título de módulos */}
      <div className="bg-neo-yellow border-4 border-black shadow-brutal-lg p-6 mb-8">
        <h2 className="font-brutal text-3xl text-black">
          📋 MÓDULOS DEL CURSO ({modulos.length})
        </h2>
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
          <div className="bg-neo-orange border-4 border-black shadow-brutal p-8 inline-block">
            <span className="font-brutal text-2xl">
              NO HAY MÓDULOS DISPONIBLES
            </span>
          </div>
        </div>
      )}

      {/* Botón flotante para volver */}
      <div className="fixed bottom-8 left-8">
        <button
          onClick={() => navigate("/cursos")}
          className="bg-neo-red border-4 border-black shadow-brutal-lg px-6 py-4 font-brutal text-lg hover:shadow-brutal-xl transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
        >
          ← VOLVER
        </button>
      </div>
    </div>
  );
};

export default CursoDetallePage;
