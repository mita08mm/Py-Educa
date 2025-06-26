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
    "bg-neo-orange",
    "bg-neo-mint",
    "bg-neo-peach",
  ];
  
  const iconColors = [
    "bg-neo-coral",
  ];

  const bgColor = cardColors[index % cardColors.length];
  const iconColor = iconColors[index % iconColors.length];

  return (
    <div className="bg-neo-periwinkle rounded-xl p-8 mb-6 hover:scale-[1.02] transition-all duration-200">
      {/* Header del problema */}
      <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
        {/* Icono y número */}
        <div className="lg:w-1/4">
          <div className={`${iconColor} rounded-xl h-32 flex flex-col items-center justify-center`}>
            <span className="font-brutal text-4xl mb-2">📝</span>
            <span className="font-brutal text-xl text-neo-cream">
              #{index + 1}
            </span>
          </div>
        </div>

        {/* Información principal */}
        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-brutal text-2xl text-neo-cream">
              {problema.titulo_problema.toUpperCase()}
            </h3>
            <div className="bg-neo-lime rounded-lg px-4 py-2">
              <span className="font-brutal text-sm text-neo-cream">CÓDIGO</span>
            </div>
          </div>
          
          <p className="text-lg font-bold text-neo-mint mb-6">
            {problema.descripcion_problema}
          </p>

          
        </div>
      </div>

      {/* Especificaciones de entrada y salida */}
      <div className="bg-neo-coral rounded-xl p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-neo-coral rounded-xl p-3 mr-4">
            <span className="font-brutal text-2xl">🔄</span>
          </div>
          <h4 className="font-brutal text-xl text-white">
            ESPECIFICACIONES
          </h4>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-neo-periwinkle rounded-lg p-4">
            <h5 className="font-brutal text-lg text-white mb-3">
              📋 FORMATO DE ENTRADA
            </h5>
            <p className="font-bold text-sm text-white">
              {problema.input}
            </p>
          </div>
          <div className="bg-neo-periwinkle rounded-lg p-4">
            <h5 className="font-brutal text-lg text-white mb-3">
              📋 FORMATO DE SALIDA
            </h5>
            <p className="font-bold text-sm text-white">
              {problema.output}
            </p>
          </div>
        </div>
      </div>

      {/* Ejemplos de entrada y salida */}
      <div className="bg-neo-coral rounded-xl p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-neo-coral rounded-xl p-3 mr-4">
            <span className="font-brutal text-2xl">🧪</span>
          </div>
          <h4 className="font-brutal text-xl text-white">
            CASOS DE EJEMPLO
          </h4>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-neo-periwinkle rounded-lg p-4">
            <h5 className="font-brutal text-lg text-neo-cream mb-3">
              📥 ENTRADA EJEMPLO
            </h5>
            <pre className="font-mono text-sm bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto">
{problema.input_ejemplo}
            </pre>
          </div>
          <div className="bg-neo-periwinkle rounded-lg p-4">
            <h5 className="font-brutal text-lg text-neo-cream mb-3">
              📤 SALIDA EJEMPLO
            </h5>
            <pre className="font-mono text-sm bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto">
{problema.output_ejemplo}
            </pre>
          </div>
        </div>
      </div>

      {/* Código base (si existe) */}
      {problema.codigo && (
        <div className="bg-neo-cream rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-neo-coral rounded-xl p-3 mr-4">
              <span className="font-brutal text-2xl">💻</span>
            </div>
            <div>
              <h4 className="font-brutal text-xl text-neo-periwinkle">
                CÓDIGO BASE
              </h4>
              <p className="text-sm font-bold text-neo-periwinkle">
                Plantilla inicial para los estudiantes
              </p>
            </div>
          </div>
          
          <div className="bg-neo-periwinkle rounded-lg p-4">
            <pre className="font-mono text-sm bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
{problema.codigo}
            </pre>
          </div>
        </div>
      )}

      {/* Acciones del problema */}
      <div className="flex justify-between items-center mt-8 pt-6">
        <div className="flex space-x-3">
          <button className="bg-neo-lime rounded-lg px-6 py-3 font-brutal text-neo-cream hover:scale-105 transition-all duration-200">
            ✏️ EDITAR
          </button>
          <button className="bg-neo-orange rounded-lg px-6 py-3 font-brutal text-neo-cream hover:scale-105 transition-all duration-200">
            🧪 PROBAR
          </button>
        </div>

        <div className="bg-neo-cream rounded-lg px-4 py-2">
          <span className="font-brutal text-sm text-neo-periwinkle">
            Problema #{problema.cod_problema}
          </span>
        </div>

        <button className="bg-neo-coral rounded-lg px-6 py-3 font-brutal text-neo-cream hover:scale-105 transition-all duration-200">
          🗑️ ELIMINAR
        </button>
      </div>
    </div>
  );
};

export default ProblemaCard;