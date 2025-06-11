import { useState } from 'react';

// Datos de ejemplo estáticos
const evaluacionEjemplo = {
  id: 1,
  titulo: "Suma de Múltiplos",
  descripcion: "Escribe un programa que calcule la suma de todos los múltiplos de 3 o 5 por debajo de un número N dado. Por ejemplo, si el número ingresado es 10, los múltiplos de 3 o 5 por debajo de 10 son 3, 5, 6 y 9. La suma de estos múltiplos es 23.",
  formato_entrada: "Un número entero N (1 ≤ N ≤ 1000).",
  formato_salida: "Un número entero que representa la suma de todos los múltiplos de 3 o 5 menores que N.",
  ejemplo: {
    entrada: "10",
    salida: "23"
  },
  tiempo_limite: 60,
  puntos: 100
};

export const EvaluationExample = () => {
  const [codigo, setCodigo] = useState('// Escribe tu código aquí');
  const [ejecutando, setEjecutando] = useState(false);
  const [resultado, setResultado] = useState(null);
  
  const handleEjecutar = () => {
    setEjecutando(true);
    setResultado(null);
    
    // Simulamos la ejecución del código con un timeout
    setTimeout(() => {
      setResultado({
        status: 'success',
        output: 'Resultado de la ejecución:\n15\n20\n25'
      });
      setEjecutando(false);
    }, 1500);
  };
  
  const handleEnviar = () => {
    if (!confirm('¿Estás seguro de enviar tu solución? Una vez enviada, no podrás modificarla.')) {
      return;
    }
    
    setEjecutando(true);
    
    // Simulamos el envío de la solución con un timeout
    setTimeout(() => {
      alert('¡Tu solución ha sido enviada con éxito!');
      setEjecutando(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen w-full bg-surface">
      <div className="w-full">
        {/* Cabecera de la evaluación */}
        <div className="bg-brand-800 p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-white">{evaluacionEjemplo.titulo}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-brand-300 text-sm sm:text-base">
                <i className="fas fa-clock mr-1"></i> Tiempo límite: {evaluacionEjemplo.tiempo_limite} minutos
              </span>
              <span className="text-brand-300 text-sm sm:text-base">
                <i className="fas fa-star mr-1"></i> Puntos: {evaluacionEjemplo.puntos}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => window.history.back()}
                className="px-3 py-1 bg-brand-700 hover:bg-brand-600 text-white rounded-md text-sm"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
        
        {/* Contenido de la evaluación */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Descripción */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-brand-100 mb-2">Descripción del problema</h2>
            <div className="bg-surface-2 p-4 rounded-md text-brand-100">
              <p>{evaluacionEjemplo.descripcion}</p>
            </div>
          </div>
          
          {/* Formato de entrada y salida */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-brand-100 mb-2">Formato de Entrada</h3>
              <div className="bg-surface-2 p-4 rounded-md text-brand-100">
                <p>{evaluacionEjemplo.formato_entrada}</p>
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-brand-100 mb-2">Formato de Salida</h3>
              <div className="bg-surface-2 p-4 rounded-md text-brand-100">
                <p>{evaluacionEjemplo.formato_salida}</p>
              </div>
            </div>
          </div>
          
          {/* Ejemplo único */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-brand-100 mb-2">Ejemplo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-2 p-4 rounded-md">
                <h4 className="text-brand-300 mb-2">Entrada:</h4>
                <pre className="bg-black bg-opacity-20 p-2 rounded text-brand-100 font-mono text-sm overflow-x-auto">
                  {evaluacionEjemplo.ejemplo.entrada}
                </pre>
              </div>
              <div className="bg-surface-2 p-4 rounded-md">
                <h4 className="text-brand-300 mb-2">Salida esperada:</h4>
                <pre className="bg-black bg-opacity-20 p-2 rounded text-brand-100 font-mono text-sm overflow-x-auto">
                  {evaluacionEjemplo.ejemplo.salida}
                </pre>
              </div>
            </div>
          </div>
          
          {/* Editor de código */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-brand-100 mb-2">Tu solución</h3>
            <div className="bg-surface-2 rounded-md overflow-hidden">
              <div className="bg-brand-800 p-2 flex justify-between items-center">
                <span className="text-white">Editor de código</span>
                <span className="text-brand-300 text-sm">Python</span>
              </div>
              <textarea
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full h-48 sm:h-64 p-4 bg-black text-green-400 font-mono text-sm focus:outline-none resize-none"
              />
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={handleEjecutar}
              disabled={ejecutando}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
            >
              {ejecutando ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  Ejecutando...
                </>
              ) : (
                <>
                  <i className="fas fa-play mr-2"></i> Ejecutar
                </>
              )}
            </button>
            
            <button
              onClick={handleEnviar}
              disabled={ejecutando}
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-700 text-white rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
            >
              {ejecutando ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2"></i> Enviar solución
                </>
              )}
            </button>
          </div>
          
          {/* Resultado de la ejecución */}
          {resultado && (
            <div className={`mt-6 p-4 rounded-md ${
              resultado.status === 'success' ? 'bg-green-900 bg-opacity-20' : 'bg-red-900 bg-opacity-20'
            }`}>
              <h3 className={`text-base sm:text-lg font-semibold mb-2 ${
                resultado.status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {resultado.status === 'success' ? 'Ejecución exitosa' : 'Error de ejecución'}
              </h3>
              
              {resultado.status === 'success' && resultado.output && (
                <pre className="bg-black bg-opacity-30 p-3 rounded text-white font-mono text-sm overflow-x-auto">
                  {resultado.output}
                </pre>
              )}
              
              {resultado.status === 'error' && resultado.error && (
                <pre className="bg-black bg-opacity-30 p-3 rounded text-red-300 font-mono text-sm overflow-x-auto">
                  {resultado.error}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}