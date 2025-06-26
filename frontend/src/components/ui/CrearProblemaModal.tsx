import { useState } from "react";
import { problemaService } from "../../services/problemaService";
import type { CreateProblemaData } from "../../types/evaluacion";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    onClose();
  };

  if (!isOpen) return null;

  return (
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
                <div>
                  <label className="block font-brutal text-lg mb-3">
                    🚀 PLANTILLA INICIAL
                  </label>
                  <textarea
                    name="editor"
                    value={formData.editor}
                    onChange={handleChange}
                    rows={8}
                    className="w-full p-3 rounded-lg font-mono text-sm bg-gray-900 text-green-400 placeholder:text-green-400/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-gray-700"
                    placeholder={`# Escribe tu solución aquí
def resolver():
    # Tu código aquí
    pass`}
                  />
                  <div className="mt-3 bg-neo-sage rounded-lg shadow-brutal p-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-brutal text-lg">💡</span>
                      <span className="font-bold text-sm">
                        Código inicial que aparecerá en el editor para los estudiantes
                      </span>
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
  );
};

export default CrearProblemaModal;