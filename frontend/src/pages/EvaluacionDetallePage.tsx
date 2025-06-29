import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useModo } from "../context/ModoContext";
import { useEvaluaciones } from "../hooks/useEvaluaciones";
import ProblemaCard from "../components/ui/ProblemaCard";
import CrearProblemaModal from "../components/ui/CrearProblemaModal";

const EvaluacionDetallePage = () => {
  const { evaluacionId } = useParams<{ evaluacionId: string }>();
  const navigate = useNavigate();
  const { isModoProfesor } = useModo();
  const evaluacionIdNum = evaluacionId ? parseInt(evaluacionId) : 0;

  const [moduloIdNum, setModuloIdNum] = useState<number>(0);

  useEffect(() => {
    const moduloId = localStorage.getItem("currentModuloId");
    if (moduloId) {
      setModuloIdNum(parseInt(moduloId));
    }
  }, []);

  const {
    evaluaciones: rawEvaluaciones,
    loading,
    error,
    refetch,
  } = useEvaluaciones(moduloIdNum);

  const evaluaciones = Array.isArray(rawEvaluaciones)
    ? rawEvaluaciones
    : rawEvaluaciones
    ? [rawEvaluaciones]
    : [];

  const evaluacion = evaluaciones.length > 0 ? evaluaciones[0] : null;

  const [isProblemaModalOpen, setIsProblemaModalOpen] = useState(false);

  const handleProblemaCreated = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-neo-yellow rounded-xl p-8 animate-pulse">
          <span className="font-brutal text-2xl text-neo-periwinkle">CARGANDO EVALUACIÓN...</span>
        </div>
      </div>
    );
  }

  if (error || !evaluacion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
        <div className="bg-neo-coral rounded-xl p-8">
          <span className="font-brutal text-2xl text-neo-cream">
            ERROR: {error || "Evaluación no encontrada"}
          </span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-neo-cyan rounded-lg px-6 py-3 font-brutal text-neo-cream hover:scale-105 transition-all duration-200"
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
            onClick={() => navigate(-1)}
            className="font-bold text-neo-cream hover:text-neo-lime transition-colors"
          >
            Módulo
          </button>
          <span className="font-brutal text-xl text-neo-cream">→</span>
          <span className="font-bold text-neo-lime">
            {evaluacion.titulo_evaluacion}
          </span>
        </div>
      </nav>

      <div className="bg-neo-periwinkle rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="font-brutal text-3xl text-neo-cream">
            🧪 EVALUACIÓN DETALLADA
          </h2>
        </div>
      </div>

      {/* Header de la evaluación */}
      <div className="bg-neo-periwinkle rounded-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Icono grande */}
          <div className="lg:w-1/3">
            <div className="bg-neo-mint rounded-xl h-64 flex items-center justify-center">
              <span className="font-brutal text-6xl">🧪</span>
            </div>
          </div>

          {/* Información */}
          <div className="lg:w-3/4 text-center lg:text-left">
            <h1 className="font-brutal text-4xl text-neo-cream mb-4">
              {evaluacion.titulo_evaluacion.toUpperCase()}
            </h1>
            <p className="text-xl font-bold text-neo-mint mb-6">
              {evaluacion.descripcion_evaluacion}
            </p>

            {/* Stats de la evaluación */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {evaluacion.problemas?.length || 0}
                </div>
                <div className="font-bold">PROBLEMAS</div>
              </div>
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">⏱️</div>
                <div className="font-bold">DISPONIBLE</div>
              </div>
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {evaluacion.problemas?.filter(p => p.titulo_problema === 'multiple_choice').length || 0}
                </div>
                <div className="font-bold">MÚLTIPLE</div>
              </div>
              {isModoProfesor && (
                <button
                  onClick={() => setIsProblemaModalOpen(true)}
                  className="bg-neo-peach rounded-lg p-4 text-center hover:bg-neo-lime hover:text-neo-cream transition-all duration-100 hover:scale-105"
                >
                  <div className="font-brutal text-2xl mb-1">+</div>
                  <div className="font-bold">AGREGAR PROBLEMA</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-neo-periwinkle rounded-xl p-4 flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="">
          <h2 className="font-brutal text-2xl text-neo-cream">
            📝 PROBLEMAS DE EVALUACIÓN
          </h2>
        </div>
      </div>

      {/* Grid de problemas */}
      {evaluacion.problemas && evaluacion.problemas.length > 0 ? (
        <div className="space-y-4 mb-8">
          {evaluacion.problemas.map((problema, index) => (
            <ProblemaCard
              key={problema.cod_problema}
              problema={problema}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mb-8">
          <div className="bg-neo-orange rounded-xl p-8 inline-block mb-6">
            <span className="font-brutal text-2xl text-neo-periwinkle">
              NO HAY PROBLEMAS DISPONIBLES
            </span>
            <br />
            <span className="text-lg font-bold text-neo-periwinkle">
              ¡Crea problemas para que los estudiantes resuelvan!
            </span>
          </div>
          <br />
          {isModoProfesor && (
            <button
              onClick={() => setIsProblemaModalOpen(true)}
              className="bg-neo-lime rounded-lg px-12 py-4 font-brutal text-lg hover:scale-105 transition-all duration-100"
            >
              + CREAR EL PRIMER PROBLEMA
            </button>
          )}
        </div>
      )}

      {/* Navegación inferior */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t-4 border-black">
        <button
          onClick={() => navigate(-1)}
          className="bg-neo-lime rounded-lg px-8 py-4 font-brutal text-lg hover:scale-105 transition-all duration-100"
        >
          ← VOLVER AL MÓDULO
        </button>

        <div className="bg-neo-cream rounded-lg px-6 py-3">
          <span className="font-brutal text-lg text-neo-periwinkle">Evaluación #{evaluacionIdNum}</span>
        </div>

        <button
          disabled
          className="bg-gray-400 rounded-lg px-8 py-4 font-brutal text-lg cursor-not-allowed opacity-50"
        >
          SIGUIENTE EVALUACIÓN →
        </button>
      </div>

      {/* Modal para crear problema */}
      <CrearProblemaModal
        isOpen={isProblemaModalOpen}
        onClose={() => setIsProblemaModalOpen(false)}
        evaluacionId={evaluacionIdNum}
        evaluacionTitulo={evaluacion.titulo_evaluacion}
        onProblemaCreated={handleProblemaCreated}
      />
    </div>
  );
};

export default EvaluacionDetallePage;