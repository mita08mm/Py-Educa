import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";
import { problemaService } from "../../services/problemaService";
import { codeExecutionService } from "../../services/codeExecutionService";
import type { CreateProblemaData } from "../../types/evaluacion";

// Estilos personalizados para Prism.js
const customPrismStyles = `
  /* Override todos los estilos de Prism.js */
  .token.operator,
  .token.punctuation,
  .token.operator + .token.punctuation,
  .token.punctuation + .token.operator {
    color: #e5e7eb !important;
    background: transparent !important;
  }
  
  /* Específicamente para el operador de asignación */
  .token.operator[data-operator="="],
  .token.operator:contains("="),
  .token.operator {
    color: #e5e7eb !important;
    background: transparent !important;
  }
  
  /* Override para cualquier estilo que pueda estar interfiriendo */
  .token.keyword {
    color: #fbbf24 !important;
    background: transparent !important;
  }
  
  .token.string {
    color: #34d399 !important;
    background: transparent !important;
  }
  
  .token.comment {
    color: #6b7280 !important;
    background: transparent !important;
  }
  
  .token.number {
    color: #f87171 !important;
    background: transparent !important;
  }
  
  .token.function {
    color: #60a5fa !important;
    background: transparent !important;
  }
  
  .token.class-name {
    color: #a78bfa !important;
    background: transparent !important;
  }
  
  /* Forzar que todos los tokens tengan fondo transparente */
  .token {
    background: transparent !important;
  }
  
  /* Override específico para el editor */
  .react-simple-code-editor .token.operator {
    color: #e5e7eb !important;
    background: transparent !important;
  }
`;

interface CrearProblemaModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluacionId: number;
  evaluacionTitulo: string;
  onProblemaCreated: () => void;
}

const CrearProblemaModal = ({
  isOpen,
  onClose,
  evaluacionId,
  evaluacionTitulo,
  onProblemaCreated,
}: CrearProblemaModalProps) => {
  const [formData, setFormData] = useState<CreateProblemaData>({
    cod_evaluacion: evaluacionId,
    titulo_problema: "",
    descripcion_problema: "",
    input: "",
    output: "",
    input_ejemplo: "",
    output_ejemplo: "",
    editor: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Estados para probar código
  const [testInput, setTestInput] = useState<string>("");
  const [testOutput, setTestOutput] = useState<string>("");
  const [testError, setTestError] = useState<string>("");
  const [testingCode, setTestingCode] = useState(false);

  const highlight = (code: string) =>
    Prism.highlight(code, Prism.languages.python, "python");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await problemaService.create(formData);
      setSuccess(true);
      setTimeout(() => {
        onProblemaCreated();
        handleClose();
      }, 1500);
    } catch (err) {
      setError("Error al crear el problema. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: CreateProblemaData) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (code: string) => {
    setFormData((prev: CreateProblemaData) => ({ ...prev, editor: code }));
  };

  const handleTestCode = async () => {
    if (!formData.editor.trim()) {
      setTestError("No hay código para probar");
      return;
    }

    setTestingCode(true);
    setTestOutput("");
    setTestError("");

    try {
      const res = await codeExecutionService.execute(formData.editor, testInput);
      if (res.stderr) {
        setTestError(res.stderr);
      } else {
        setTestOutput(res.stdout);
      }
    } catch (e: any) {
      setTestError(e.message || "Error al ejecutar el código");
    } finally {
      setTestingCode(false);
    }
  };

  const handleClose = () => {
    setFormData({
      cod_evaluacion: evaluacionId,
      titulo_problema: "",
      descripcion_problema: "",
      input: "",
      output: "",
      input_ejemplo: "",
      output_ejemplo: "",
      editor: "",
    });
    setError(null);
    setSuccess(false);
    setTestInput("");
    setTestOutput("");
    setTestError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{customPrismStyles}</style>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-neo-periwinkle rounded-lg shadow-brutal-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-neo-lavender border-b-5 border-black p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-brutal text-2xl text-white mb-1">
                  CREAR NUEVO PROBLEMA
                </h2>
                <p className="font-bold text-white">
                  Para evaluación: {evaluacionTitulo}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="bg-neo-red border-3 border-black shadow-brutal px-4 py-2 font-brutal text-xl hover:shadow-brutal-lg transition-shadow duration-100"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="bg-neo-lime border-4 border-black shadow-brutal p-6 animate-bounce">
                  <span className="font-brutal text-2xl">
                    ✅ PROBLEMA CREADO EXITOSAMENTE!
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información básica del problema */}
                <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                  <h3 className="font-brutal text-xl mb-4">
                    📋 INFORMACIÓN BÁSICA
                  </h3>

                  {/* Título del problema */}
                  <div className="mb-4">
                    <label className="block font-brutal text-lg mb-3">
                      🏷️ TÍTULO DEL PROBLEMA
                    </label>
                    <input
                      type="text"
                      name="titulo_problema"
                      value={formData.titulo_problema}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                      placeholder="Ej: Suma de dos números"
                    />
                  </div>

                  {/* Descripción del problema */}
                  <div>
                    <label className="block font-brutal text-lg mb-3">
                      📝 DESCRIPCIÓN DEL PROBLEMA
                    </label>
                    <textarea
                      name="descripcion_problema"
                      value={formData.descripcion_problema}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                      placeholder="Describe detalladamente el problema que deben resolver los estudiantes..."
                    />
                  </div>
                </div>

                {/* Especificaciones de entrada y salida */}
                <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                  <h3 className="font-brutal text-xl mb-4">
                    🔄 ESPECIFICACIONES
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-brutal text-lg mb-3">
                        📥 FORMATO DE ENTRADA
                      </label>
                      <textarea
                        name="input"
                        value={formData.input}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                        placeholder="Describe el formato de los datos de entrada..."
                      />
                    </div>
                    <div>
                      <label className="block font-brutal text-lg mb-3">
                        📤 FORMATO DE SALIDA
                      </label>
                      <textarea
                        name="output"
                        value={formData.output}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                        placeholder="Describe el formato de la salida esperada..."
                      />
                    </div>
                  </div>
                </div>

                {/* Ejemplos */}
                <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                  <h3 className="font-brutal text-xl mb-4">
                    🧪 CASOS DE EJEMPLO
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-brutal text-lg mb-3">
                        🔢 EJEMPLO DE ENTRADA
                      </label>
                      <textarea
                        name="input_ejemplo"
                        value={formData.input_ejemplo}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 rounded-lg font-mono text-sm bg-gray-900 text-green-400 placeholder:text-green-400/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-gray-700"
                        placeholder="3 5"
                      />
                    </div>
                    <div>
                      <label className="block font-brutal text-lg mb-3">
                        📋 EJEMPLO DE SALIDA
                      </label>
                      <textarea
                        name="output_ejemplo"
                        value={formData.output_ejemplo}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-3 rounded-lg font-mono text-sm bg-gray-900 text-green-400 placeholder:text-green-400/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-gray-700"
                        placeholder="8"
                      />
                    </div>
                  </div>
                </div>

                {/* Código base del editor */}
                <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                  <h3 className="font-brutal text-xl mb-4">
                    💻 CÓDIGO BASE (OPCIONAL)
                  </h3>
                  
                  {/* Selector de plantilla rápida */}
                  <div className="mb-4 bg-neo-lavender rounded-lg p-4">
                    <label className="block font-brutal text-lg mb-3 text-neo-cream">
                      📋 PLANTILLAS RÁPIDAS
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, editor: `# Función básica - Completa la lógica
def suma_numeros(a, b):
    # TODO: Completa esta función para sumar dos números
    # Escribe tu código aquí
    pass

# Código de prueba - Los estudiantes pueden ver pero no modificar
if __name__ == "__main__":
    resultado = suma_numeros(5, 3)
    print(f"La suma es: {resultado}")` }))}
                        className="bg-neo-peach rounded-lg p-3 text-left hover:bg-neo-lime hover:text-neo-cream transition-all duration-100"
                      >
                        <div className="font-brutal text-sm">🔢</div>
                        <div className="font-bold text-xs">Función Básica</div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, editor: `# Lista y bucles - Completa el procesamiento
def procesar_lista(numeros):
    # Variables iniciales (no modificar)
    suma = 0
    mayor = numeros[0]
    
    # TODO: Completa el bucle para calcular suma y mayor
    # Escribe tu código aquí
    for numero in numeros:
        # Completa la lógica
        pass
    
    return suma, mayor

# Código de prueba
if __name__ == "__main__":
    lista = [1, 5, 3, 9, 2]
    resultado = procesar_lista(lista)
    print(f"Suma: {resultado[0]}, Mayor: {resultado[1]}")` }))}
                        className="bg-neo-peach rounded-lg p-3 text-left hover:bg-neo-lime hover:text-neo-cream transition-all duration-100"
                      >
                        <div className="font-brutal text-sm">🔄</div>
                        <div className="font-bold text-xs">Lista y Bucles</div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, editor: `# Clase con métodos - Completa los métodos
class Calculadora:
    def __init__(self):
        # Inicialización (no modificar)
        self.historial = []
    
    def sumar(self, a, b):
        # TODO: Completa el método de suma
        # Escribe tu código aquí
        pass
    
    def multiplicar(self, a, b):
        # TODO: Completa el método de multiplicación
        # Escribe tu código aquí
        pass
    
    # Método de historial (no modificar)
    def agregar_al_historial(self, operacion, resultado):
        self.historial.append(f"{operacion} = {resultado}")

# Código de prueba
if __name__ == "__main__":
    calc = Calculadora()
    resultado1 = calc.sumar(10, 5)
    resultado2 = calc.multiplicar(4, 7)
    print(f"Suma: {resultado1}, Multiplicación: {resultado2}")` }))}
                        className="bg-neo-peach rounded-lg p-3 text-left hover:bg-neo-lime hover:text-neo-cream transition-all duration-100"
                      >
                        <div className="font-brutal text-sm">🏗️</div>
                        <div className="font-bold text-xs">Clase y Métodos</div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Editor de código profesional */}
                  <div className="bg-gray-900 rounded-lg border border-gray-700">
                    <div className="bg-gray-700 px-4 py-2 border-b border-gray-600 flex justify-between items-center">
                      <span className="text-gray-300 text-sm font-mono">main.py</span>
                      <button
                        type="button"
                        onClick={handleTestCode}
                        disabled={testingCode}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          testingCode
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {testingCode ? "Probando..." : "🧪 Probar"}
                      </button>
                    </div>
                    <Editor
                      value={formData.editor}
                      onValueChange={handleCodeChange}
                      highlight={highlight}
                      padding={16}
                      className="font-mono text-sm text-gray-200 min-h-[400px] focus:outline-none"
                      style={{ minHeight: 400 }}
                      placeholder={`#Escribe una plantilla nada mas o usa la plantilla de ejemplo`}
                    />
                  </div>

                  {/* Campos de prueba siempre visibles */}
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Input de prueba */}
                    <div className="bg-gray-800 rounded border border-gray-700">
                      <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
                        <span className="text-gray-300 text-sm font-mono">Input de Prueba</span>
                      </div>
                      <textarea
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        placeholder="Ingresa datos de prueba aquí..."
                        className="w-full p-4 font-mono text-sm bg-gray-800 text-gray-200 placeholder:text-gray-500 focus:outline-none min-h-[120px] resize-none"
                      />
                    </div>

                    {/* Output de prueba */}
                    <div className="bg-gray-800 rounded border border-gray-700">
                      <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
                        <span className="text-gray-300 text-sm font-mono">Resultado</span>
                      </div>
                      <div className="p-4 min-h-[120px]">
                        {testOutput ? (
                          <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                            {testOutput}
                          </pre>
                        ) : testError ? (
                          <pre className="font-mono text-sm text-red-400 whitespace-pre-wrap">
                            {testError}
                          </pre>
                        ) : (
                          <p className="font-mono text-sm text-gray-500">
                            El resultado aparecerá aquí después de probar...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Guía de uso simplificada */}
                  <div className="mt-4 bg-neo-lavender rounded-lg p-4">
                    <h4 className="font-brutal text-lg text-neo-cream mb-3">
                      📝 GUÍA RÁPIDA
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-yellow-400"># TODO:</span>
                        <span className="text-neo-mint">Instrucciones para el estudiante</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gray-400">pass</span>
                        <span className="text-neo-mint">Indica donde completar el código</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-brutal text-sm">🧪</span>
                        <span className="text-neo-mint">Prueba tu código antes de crear el problema</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="bg-neo-coral rounded-lg shadow-brutal p-6">
                  <h3 className="font-brutal text-xl mb-4">
                    ℹ️ INFORMACIÓN IMPORTANTE
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-brutal text-lg">🎯</span>
                      <span className="font-bold">
                        Los estudiantes verán la descripción, ejemplos y código base
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-brutal text-lg">⚡</span>
                      <span className="font-bold">
                        El sistema evaluará automáticamente las soluciones
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-brutal text-lg">📊</span>
                      <span className="font-bold">
                        Podrás ver estadísticas de rendimiento después
                      </span>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-neo-red border-4 border-black shadow-brutal p-4">
                    <span className="font-brutal text-lg text-white">
                      ❌ ERROR: {error}
                    </span>
                  </div>
                )}

                {/* Botones */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-neo-sage rounded-lg border-3 border-black shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
                  >
                    CANCELAR
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`rounded-lg shadow-brutal px-6 py-3 font-brutal transition-shadow duration-100 hover:shadow-brutal-lg ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-neo-lime hover:bg-neo-green"
                    }`}
                  >
                    {loading ? "⏳ CREANDO..." : "📝 CREAR PROBLEMA"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CrearProblemaModal;