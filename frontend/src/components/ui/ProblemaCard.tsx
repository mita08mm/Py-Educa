import type { Problema } from "../../types/evaluacion";

interface ProblemaCardProps {
  problema: Problema;
  index: number;
}

const ProblemaCard = ({ problema, index }: ProblemaCardProps) => {
  const cardColors = [
    "bg-neo-cyan",
    "bg-neo-lime",
    "bg-neo-coral",
    "bg-neo-sage",
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
              📝 PROBLEMA #{index + 1}
            </span>
          </div>
          <div className="bg-neo-yellow border-2 border-white px-3 py-1">
            <span className="font-brutal text-xs text-black">CÓDIGO</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        <h3 className="font-brutal text-xl mb-3 text-black">
          {problema.titulo_problema.toUpperCase()}
        </h3>

        <p className="text-gray-800 mb-6 font-medium">
          {problema.descripcion_problema}
        </p>

        {/* Ejemplos de entrada y salida */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border-3 border-black shadow-brutal p-4">
            <h4 className="font-brutal text-sm mb-2 text-neo-red">
              📥 ENTRADA EJEMPLO:
            </h4>
            <pre className="text-xs bg-gray-100 p-2 border-2 border-gray-300 font-mono">
              {problema.input_ejemplo}
            </pre>
          </div>
          <div className="bg-white border-3 border-black shadow-brutal p-4">
            <h4 className="font-brutal text-sm mb-2 text-neo-red">
              📤 SALIDA EJEMPLO:
            </h4>
            <pre className="text-xs bg-gray-100 p-2 border-2 border-gray-300 font-mono">
              {problema.output_ejemplo}
            </pre>
          </div>
        </div>

        {/* Especificaciones técnicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-neo-yellow border-2 border-black p-3">
            <h4 className="font-brutal text-xs mb-1">📋 FORMATO ENTRADA:</h4>
            <p className="text-xs font-medium">{problema.input}</p>
          </div>
          <div className="bg-neo-lime border-2 border-black p-3">
            <h4 className="font-brutal text-xs mb-1">📋 FORMATO SALIDA:</h4>
            <p className="text-xs font-medium">{problema.output}</p>
          </div>
        </div>

        {/* Editor predeterminado */}
        {problema.codigo && (
          <div className="bg-gray-900 border-3 border-black shadow-brutal p-4">
            <h4 className="font-brutal text-sm mb-2 text-neo-lime">
              💻 CÓDIGO BASE:
            </h4>
            <pre className="text-xs text-green-400 font-mono overflow-x-auto">
              {problema.codigo}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemaCard;
