import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvaluaciones } from "../hooks/useEvaluaciones";
import ProblemaCard from "../components/ui/ProblemaCard";
import CrearProblemaModal from "../components/ui/CrearProblemaModal";

const EvaluacionDetallePage = () => {
  const { evaluacionId } = useParams<{ evaluacionId: string }>();
  const navigate = useNavigate();
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
        <div className="bg-neo-periwinkle border-4 border-black shadow-brutal p-8 animate-pulse">
          <span className="font-brutal text-2xl">CARGANDO EVALUACIÓN...</span>
        </div>
      </div>
    );
  }

  if (error || !evaluacion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
        <div className="bg-neo-red border-4 border-black shadow-brutal p-8">
          <span className="font-brutal text-2xl text-white">
            ERROR: {error || "Evaluación no encontrada"}
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
        <div className="flex items-center space-x-2 bg-white border-3 border-black shadow-brutal p-4">
          <button
            onClick={() => navigate("/cursos")}
            className="font-bold hover:text-neo-red transition-colors"
          >
            📍 Cursos
          </button>
          <span className="font-brutal text-xl">→</span>
          <button
            onClick={() => navigate(-1)}
            className="font-bold hover:text-neo-red transition-colors"
          >
            Módulo
          </button>
          <span className="font-brutal text-xl">→</span>
          <span className="font-bold text-neo-red">
            {evaluacion.titulo_evaluacion}
          </span>
        </div>
      </nav>

      {/* Header de la evaluación */}
      <div className="bg-neo-purple border-5 border-black shadow-brutal-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Icono grande */}
          <div className="lg:w-1/4">
            <div className="bg-neo-yellow border-4 border-black shadow-brutal-lg h-32 w-32 flex items-center justify-center mx-auto">
              <span className="font-brutal text-6xl">🧪</span>
            </div>
          </div>

          {/* Información */}
          <div className="lg:w-3/4 text-center lg:text-left">
            <h1 className="font-brutal text-4xl text-white mb-4">
              {evaluacion.titulo_evaluacion.toUpperCase()}
            </h1>
            <p className="text-xl font-bold text-black mb-6">
              {evaluacion.descripcion_evaluacion}
            </p>

            {/* Stats de la evaluación */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neo-lime border-3 border-black shadow-brutal p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {evaluacion.problemas?.length || 0}
                </div>
                <div className="font-bold">PROBLEMAS</div>
              </div>
              <div className="bg-neo-coral border-3 border-black shadow-brutal p-4 text-center">
                <div className="font-brutal text-2xl mb-1">⏱️</div>
                <div className="font-bold">DISPONIBLE</div>
              </div>
              <button
                onClick={() => setIsProblemaModalOpen(true)}
                className="bg-neo-orange border-3 border-black shadow-brutal p-4 text-center hover:shadow-brutal-lg transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
              >
                <div className="font-brutal text-2xl mb-1">➕</div>
                <div className="font-bold">CREAR PROBLEMA</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Problemas */}
      <div className="bg-neo-indigo border-4 border-black shadow-brutal-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-brutal text-3xl text-white">
            📝 PROBLEMAS DE LA EVALUACIÓN ({evaluacion.problemas?.length || 0})
          </h2>
        </div>

        {/* Grid de problemas */}
        {evaluacion.problemas && evaluacion.problemas.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {evaluacion.problemas.map((problema, index) => (
              <ProblemaCard
                key={problema.cod_problema}
                problema={problema}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="bg-neo-orange border-3 border-black shadow-brutal p-6 inline-block">
              <span className="font-brutal text-xl">
                NO HAY PROBLEMAS DISPONIBLES
              </span>
              <br />
              <span className="text-lg font-bold">
                ¡Crea problemas para que los estudiantes resuelvan!
              </span>
            </div>
            <br />
            <button
              onClick={() => setIsProblemaModalOpen(true)}
              className="bg-neo-lime border-3 border-black shadow-brutal px-6 py-3 font-brutal mt-4 hover:shadow-brutal-lg transition-shadow duration-100"
            >
              📝 CREAR EL PRIMER PROBLEMA
            </button>
          </div>
        )}
      </div>

      {/* Navegación inferior */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t-4 border-black">
        <button
          onClick={() => navigate(-1)}
          className="bg-neo-red border-4 border-black shadow-brutal-lg px-8 py-4 font-brutal text-lg hover:shadow-brutal-xl transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
        >
          ← VOLVER AL MÓDULO
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
