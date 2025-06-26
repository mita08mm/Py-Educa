import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useModuloDetalle } from "../hooks/useModuloDetalle";
import { useEvaluaciones } from "../hooks/useEvaluaciones";
import SeccionAccordion from "../components/ui/SeccionAccordion";
import CrearSeccionModal from "../components/ui/CrearSeccionModal";
import EvaluacionCard from "../components/ui/EvaluacionCard";
import CrearEvaluacionModal from "../components/ui/CrearEvaluacionModalProps";

const ModuloDetallePage = () => {
  const { moduloId } = useParams<{ moduloId: string }>();
  const navigate = useNavigate();
  const moduloIdNum = moduloId ? parseInt(moduloId) : 0;

  const { modulo, secciones, loading, error } = useModuloDetalle(moduloIdNum);
  const {
    evaluaciones: rawEvaluaciones,
    loading: loadingEvaluaciones,
    refetch: refetchEvaluaciones,
  } = useEvaluaciones(moduloIdNum);

  // Normalizar evaluaciones a array
  const evaluaciones = Array.isArray(rawEvaluaciones)
    ? rawEvaluaciones
    : rawEvaluaciones
    ? [rawEvaluaciones]
    : [];
  const [openSections, setOpenSections] = useState<number[]>([0]);
  const [isSeccionModalOpen, setIsSeccionModalOpen] = useState(false);
  const [isEvaluacionModalOpen, setIsEvaluacionModalOpen] = useState(false);

  const handleContentCreated = () => {
    // Refrescar la página para mostrar el nuevo contenido
    window.location.reload();
  };

  const handleEvaluacionCreated = () => {
    refetchEvaluaciones();
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="bg-neo-yellow border-4 border-black shadow-brutal p-8 animate-pulse">
          <span className="font-brutal text-2xl">CARGANDO MÓDULO...</span>
        </div>
      </div>
    );
  }

  if (error || !modulo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-6">
        <div className="bg-neo-red border-4 border-black shadow-brutal p-8">
          <span className="font-brutal text-2xl text-white">
            ERROR: {error || "Módulo no encontrado"}
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

  const totalSubsecciones = secciones.reduce(
    (total, seccion) => total + seccion.subsecciones.length,
    0
  );

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
            onClick={() => navigate(`/curso/${modulo.cod_curso}`)}
            className="font-bold text-neo-cream hover:text-neo-lime transition-colors"
          >
            Curso
          </button>
          <span className="font-brutal text-xl text-neo-cream">→</span>
          <span className="font-bold text-neo-lime">{modulo.titulo_modulo}</span>
        </div>
      </nav>

      {/* Header del módulo */}
      <div className="bg-neo-periwinkle rounded-xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Icono grande */}
          <div className="lg:w-1/4">
            <div className="bg-neo-lime rounded-lg h-32 w-32 flex items-center justify-center mx-auto">
              <span className="font-brutal text-6xl">📚</span>
            </div>
          </div>

          {/* Información */}
          <div className="lg:w-3/4 text-center lg:text-left">
            <h1 className="font-brutal text-4xl text-neo-cream mb-4">
              {modulo.titulo_modulo.toUpperCase()}
            </h1>
            <p className="text-xl font-bold text-neo-mint mb-6">
              {modulo.descripcion_modulo}
            </p>

            {/* Stats del módulo */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {secciones.length}
                </div>
                <div className="font-bold">SECCIONES</div>
              </div>
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {totalSubsecciones}
                </div>
                <div className="font-bold">TEMAS</div>
              </div>
              <div className="bg-neo-coral rounded-lg p-4 text-center">
                <div className="font-brutal text-2xl mb-1">
                  {evaluaciones.length}
                </div>
                <div className="font-bold">EVALUACIONES</div>
              </div>
              <button
                onClick={() => setIsSeccionModalOpen(true)}
                className="bg-neo-peach rounded-lg p-4 text-center hover:bg-neo-lime hover:text-neo-cream transition-all duration-100 hover:scale-105"
              >
                <div className="font-brutal text-2xl mb-1">+</div>
                <div className="font-bold">CREAR SECCIÓN</div>
              </button>
              <button
                onClick={() => setIsEvaluacionModalOpen(true)}
                className="bg-neo-peach rounded-lg p-4 text-center hover:bg-neo-lime hover:text-neo-cream transition-all duration-100 hover:scale-105"
              >
                <div className="font-brutal text-2xl mb-1">+</div>
                <div className="font-bold">CREAR EVALUACIÓN</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="bg-neo-periwinkle rounded-xl p-4 flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="">
          <h2 className="font-brutal text-2xl text-neo-cream">
            📋 CONTENIDO DEL MÓDULO
          </h2>
        </div>

        <div className="flex space-x-3 flex-wrap gap-2">
          <button
            onClick={() => setOpenSections(secciones.map((_, i) => i))}
            className="bg-neo-lime rounded-lg px-4 py-2 font-brutal text-neo-cream transition-all duration-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            EXPANDIR TODO
          </button>
          <button
            onClick={() => setOpenSections([])}
            className="bg-neo-lime rounded-lg px-4 py-2 font-brutal text-neo-cream transition-all duration-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            CONTRAER TODO
          </button>
        </div>
      </div>

      {/* Lista de secciones */}
      {secciones.length > 0 ? (
        <div className="space-y-4 mb-8">
          {secciones.map((seccion, index) => (
            <SeccionAccordion
              key={seccion.cod_seccion}
              seccion={seccion}
              index={index}
              isOpen={openSections.includes(index)}
              onToggle={() => toggleSection(index)}
              moduloId={moduloIdNum}
              onContentCreated={handleContentCreated}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mb-8">
          <div className="shadow-brutal p-8 inline-block mb-6">
            <span className="font-brutal text-2xl">
              NO HAY SECCIONES DISPONIBLES
            </span>
            <br />
            <span className="text-lg font-bold">
              ¡Agrega contenido a este módulo!
            </span>
          </div>
          <br />
          <button
            onClick={() => setIsSeccionModalOpen(true)}
            className="bg-neo-lime rounded-lg px-12 py-4 font-brutal text-lg hover:shadow-brutal-lg transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
          >
            + CREAR LA PRIMERA SECCIÓN
          </button>
        </div>
      )}

      {/* Sección de Evaluaciones */}
      <div className="bg-neo-periwinkle rounded-xl p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-brutal text-3xl text-neo-cream">
            🧪 EVALUACIONES DEL MÓDULO ({evaluaciones.length})
          </h2>
        </div>

        {/* Grid de evaluaciones */}
        {loadingEvaluaciones ? (
          <div className="text-center py-8">
            <div className="bg-neo-periwinkle rounded-lg p-4 inline-block">
              <span className="font-brutal text-lg text-neo-cream">
                CARGANDO EVALUACIONES...
              </span>
            </div>
          </div>
        ) : evaluaciones.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {evaluaciones.map((evaluacion, index) => (
              <EvaluacionCard
                key={evaluacion.cod_evaluacion}
                evaluacion={evaluacion}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="rounded-lg p-6 inline-block mb-4">
              <span className="font-brutal text-xl text-neo-cream">
                NO HAY EVALUACIONES DISPONIBLES
              </span>
              <br />
              <span className="text-lg font-bold text-neo-cream">
                ¡Crea evaluaciones para poner a prueba a los estudiantes!
              </span>
            </div>
            <br />
            <button
              onClick={() => setIsEvaluacionModalOpen(true)}
              className="bg-neo-lime rounded-lg px-6 py-3 font-brutal text-neo-cream mt-4 transition-all duration-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-neo-green"
            >
              🧪 CREAR LA PRIMERA EVALUACIÓN
            </button>
          </div>
        )}
      </div>

      {/* Navegación inferior */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t-4 border-black">
        <button
          onClick={() => navigate(`/curso/${modulo.cod_curso}`)}
          className="bg-neo-lime rounded-lg shadow-brutal-lg px-8 py-4 font-brutal text-lg hover:shadow-brutal-xl transition-all duration-100 hover:translate-x-1 hover:translate-y-1"
        >
          ← VOLVER AL CURSO
        </button>

        <div className="shadow-brutal px-6 py-3">
          <span className="font-brutal text-lg">Módulo #{moduloIdNum}</span>
        </div>

        <button
          disabled
          className="bg-gray-400 rounded-lg shadow-brutal-lg px-8 py-4 font-brutal text-lg cursor-not-allowed opacity-50"
        >
          SIGUIENTE MÓDULO →
        </button>
      </div>

      {/* Modal para crear sección */}
      <CrearSeccionModal
        isOpen={isSeccionModalOpen}
        onClose={() => setIsSeccionModalOpen(false)}
        moduloId={moduloIdNum}
        moduloTitulo={modulo.titulo_modulo}
        onSeccionCreated={handleContentCreated}
      />

      {/* Modal para crear evaluación */}
      <CrearEvaluacionModal
        isOpen={isEvaluacionModalOpen}
        onClose={() => setIsEvaluacionModalOpen(false)}
        moduloId={moduloIdNum}
        moduloTitulo={modulo.titulo_modulo}
        onEvaluacionCreated={handleEvaluacionCreated}
      />
    </div>
  );
};

export default ModuloDetallePage;
