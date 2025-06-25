import { useNavigate } from "react-router-dom";
import type { Evaluacion } from "../../types/evaluacion";

interface EvaluacionCardProps {
  evaluacion: Evaluacion;
  index: number;
}

const EvaluacionCard = ({ evaluacion, index }: EvaluacionCardProps) => {
  const navigate = useNavigate();

  const cardColors = [
    "bg-neo-purple",
    "bg-neo-indigo",
    "bg-neo-magenta",
    "bg-neo-violet",
    "bg-neo-lavender",
    "bg-neo-periwinkle",
  ];

  const bgColor = cardColors[index % cardColors.length];

  const handleVerEvaluacion = () => {
    localStorage.setItem("currentModuloId", evaluacion.cod_modulo.toString());
    navigate(`/evaluacion/${evaluacion.cod_evaluacion}`);
  };

  return (
    <div
      className={`${bgColor} rounded-lg border-2 border-black hover:shadow-brutal-xl transition-all duration-100`}
    >
      {/* Header */}
      <div className="p-4 bg-neo-periwinkle text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-brutal text-lg">
              🧪 EVALUACIÓN #{index + 1}
            </span>
          </div>
          <div className="bg-neo-periwinkle rounded-lg px-3 py-1">
            <span className="font-brutal text-xs text-white">
              {evaluacion.problemas?.length || 0} PROBLEMAS
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <h3 className="font-brutal text-xl mb-3 text-white">
          {evaluacion.titulo_evaluacion.toUpperCase()}
        </h3>

        <p className="text-gray-200 mb-6 font-medium">
          {evaluacion.descripcion_evaluacion}
        </p>

        {/* Stats de la evaluación */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-neo-lavender rounded-lg p-3 text-center">
            <div className="font-brutal text-lg">
              {evaluacion.problemas?.length || 0}
            </div>
            <div className="text-xs font-bold">PROBLEMAS</div>
          </div>
          <div className="bg-neo-lavender rounded-lg p-3 text-center">
            <div className="font-brutal text-lg">⏱️</div>
            <div className="text-xs font-bold">DISPONIBLE</div>
          </div>
        </div>

        {/* Lista de problemas (preview) */}
        {evaluacion.problemas && evaluacion.problemas.length > 0 && (
          <div className="bg-neo-periwinkle rounded-lg shadow-brutal p-4 mb-4">
            <h4 className="font-brutal text-sm mb-2">📝 PROBLEMAS:</h4>
            <div className="space-y-2">
              {evaluacion.problemas.slice(0, 3).map((problema, idx) => (
                <div key={problema.cod_problema} className="text-sm">
                  <span className="font-bold">{idx + 1}.</span>{" "}
                  {problema.titulo_problema}
                </div>
              ))}
              {evaluacion.problemas.length > 3 && (
                <div className="text-xs text-gray-600">
                  +{evaluacion.problemas.length - 3} problemas más...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="space-y-3">
          <button
            onClick={handleVerEvaluacion}
            className="w-full bg-neo-lime shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
          >
            📋 VER EVALUACIÓN
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionCard;
