import { useState } from "react";
import { createPortal } from "react-dom";
import PythonCodeEditor from "./PythonCodeEditor";
import type { Problema } from "../../types/evaluacion";

interface ProblemaCardProps {
  problema: Problema;
  index: number;
}

const ProblemaCard = ({ problema, index }: ProblemaCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'editor' | 'description'>('editor');
  const [currentCode, setCurrentCode] = useState(problema.editor || "");

  const handleEditar = () => {
    setCurrentCode(problema.editor || "");
    setCurrentView('editor');
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleViewDescription = () => {
    setCurrentView('description');
  };

  const handleBackToEditor = () => {
    setCurrentView('editor');
  };

  return (
    <>
      <div className="bg-neo-periwinkle rounded-xl p-8 mb-6 hover:scale-[1.02] transition-all duration-200">
        {/* Header del problema */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="font-brutal text-2xl text-neo-cream">
                #{index + 1}
              </span>
              <h3 className="font-brutal text-2xl text-neo-cream">
                {problema.titulo_problema.toUpperCase()}
              </h3>
            </div>
          </div>
          
          <p className="text-lg font-bold text-neo-mint">
            {problema.descripcion_problema}
          </p>
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

        {/* Acciones del problema */}
        <div className="flex justify-between items-center mt-8 pt-6">
          <div className="flex space-x-3">
            <button 
              className="bg-neo-lime rounded-lg px-6 py-3 font-brutal text-neo-cream hover:scale-105 transition-all duration-200"
              onClick={handleEditar}
            >
              ✏️ EDITAR SOLUCIÓN
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

      {/* Modal del editor de Python */}
      {isModalOpen && (
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
            <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
              {/* Header del modal */}
              <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
                <div className="flex space-x-3">
                  {currentView === 'editor' ? (
                    <button
                      onClick={handleViewDescription}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      📋 Ver Descripción
                    </button>
                  ) : (
                    <button
                      onClick={handleBackToEditor}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      💻 Volver al Editor
                    </button>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  ✕ Cerrar
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="overflow-hidden" style={{ height: 'calc(95vh - 80px)' }}>
                {currentView === 'editor' ? (
                  <PythonCodeEditor 
                    initialCode={currentCode} 
                    problemTitle={problema.titulo_problema}
                    onCodeChange={setCurrentCode}
                  />
                ) : (
                  <div className="h-full overflow-y-auto p-6 bg-gray-900">
                    <div className="max-w-4xl mx-auto">
                      {/* Información del problema */}
                      <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-white font-bold text-2xl mb-4">
                          {problema.titulo_problema}
                        </h2>
                        <p className="text-gray-300 text-lg mb-6">
                          {problema.descripcion_problema}
                        </p>
                      </div>

                      {/* Especificaciones */}
                      <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h3 className="text-white font-bold text-xl mb-4">🔄 ESPECIFICACIONES</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-gray-300 font-bold mb-2">📋 FORMATO DE ENTRADA</h4>
                            <p className="text-gray-400">{problema.input}</p>
                          </div>
                          <div>
                            <h4 className="text-gray-300 font-bold mb-2">📋 FORMATO DE SALIDA</h4>
                            <p className="text-gray-400">{problema.output}</p>
                          </div>
                        </div>
                      </div>

                      {/* Ejemplos */}
                      <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-white font-bold text-xl mb-4">🧪 CASOS DE EJEMPLO</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-gray-300 font-bold mb-2">📥 ENTRADA EJEMPLO</h4>
                            <pre className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto">
                              {problema.input_ejemplo}
                            </pre>
                          </div>
                          <div>
                            <h4 className="text-gray-300 font-bold mb-2">📤 SALIDA EJEMPLO</h4>
                            <pre className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto">
                              {problema.output_ejemplo}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )
      )}
    </>
  );
};

export default ProblemaCard;