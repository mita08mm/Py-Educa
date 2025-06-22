import { useState } from "react";
import type { Evaluacion } from "../../types/evaluacion";

interface EvaluacionCardProps {
  evaluacion: Evaluacion;
  index: number;
}

const EvaluacionCard = ({ evaluacion, index }: EvaluacionCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const cardColors = [
    "bg-neo-purple",
    "bg-neo-indigo",
    "bg-neo-magenta",
    "bg-neo-violet",
    "bg-neo-lavender",
    "bg-neo-periwinkle",
  ];

  const bgColor = cardColors[index % cardColors.length];

  return (
    <div
      className={`${bgColor} border-4 border-black shadow-brutal-lg hover:shadow-brutal-xl transition-all duration-100`}
    >
      {/* Header */}
      <div className="p-4 border-b-4 border-black bg-black text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-brutal text-lg">
              🧪 EVALUACIÓN #{index + 1}
            </span>
          </div>
          <div className="bg-neo-yellow border-2 border-white px-3 py-1">
            <span className="font-brutal text-xs text-black">
              MÓDULO {evaluacion.cod_modulo}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-brutal text-xl mb-3 text-white">
          {evaluacion.titulo_evaluacion.toUpperCase()}
        </h3>

        <p className="text-gray-200 mb-4 font-medium">
          {evaluacion.descripcion_evaluacion}
        </p>

        <div className="bg-white border-3 border-black shadow-brutal p-4 mb-4">
          <h4 className="font-brutal text-sm mb-2">📝 EJEMPLO:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <span className="font-bold text-xs text-gray-600">INPUT:</span>
              <div className="bg-neo-cream border-2 border-black p-2 text-sm font-mono">
                {evaluacion.input_ejemplo}
              </div>
            </div>
            <div>
              <span className="font-bold text-xs text-gray-600">OUTPUT:</span>
              <div className="bg-neo-lime border-2 border-black p-2 text-sm font-mono">
                {evaluacion.output_ejemplo}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-neo-cyan border-3 border-black shadow-brutal px-4 py-2 font-brutal text-sm hover:shadow-brutal-lg transition-shadow duration-100 mb-4"
        >
          {showDetails ? "👁️ OCULTAR DETALLES" : "🔍 VER DETALLES"}
        </button>
        {showDetails && (
          <div className="space-y-4">
            <div className="bg-white border-3 border-black shadow-brutal p-4">
              <h4 className="font-brutal text-sm mb-3">🧪 CASOS DE PRUEBA:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="font-bold text-xs text-gray-600">
                    INPUT REAL:
                  </span>
                  <div className="bg-neo-coral border-2 border-black p-2 text-sm font-mono max-h-20 overflow-y-auto">
                    {evaluacion.input}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-xs text-gray-600">
                    OUTPUT ESPERADO:
                  </span>
                  <div className="bg-neo-mint border-2 border-black p-2 text-sm font-mono max-h-20 overflow-y-auto">
                    {evaluacion.output}
                  </div>
                </div>
              </div>
            </div>

            {/* Código base */}
            {evaluacion.codigo && (
              <div className="bg-white border-3 border-black shadow-brutal p-4">
                <h4 className="font-brutal text-sm mb-3">💻 CÓDIGO BASE:</h4>
                <div className="bg-gray-900 border-2 border-black p-3 text-sm font-mono text-green-400 max-h-32 overflow-y-auto">
                  <pre>{evaluacion.codigo}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Botón de acción */}
        <div className="mt-6">
          <button className="bg-neo-red border-3 border-black shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100">
            🚀 RESOLVER EVALUACIÓN
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionCard;
