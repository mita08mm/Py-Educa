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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await problemaService.create(formData);
      onProblemaCreated();
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-neo-cyan border-5 border-black shadow-brutal-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-black text-white p-6 border-b-4 border-black">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl">📝 CREAR NUEVO PROBLEMA</h2>
              <p className="text-neo-cyan mt-2">
                Para la evaluación: {evaluacionTitulo}
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-neo-red border-3 border-white px-4 py-2 font-brutal hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-neo-red border-3 border-black p-4">
              <span className="text-white font-brutal">{error}</span>
            </div>
          )}

          {/* Título del problema */}
          <div>
            <label className="block font-brutal text-lg mb-2">
              📋 TÍTULO DEL PROBLEMA *
            </label>
            <input
              type="text"
              name="titulo_problema"
              value={formData.titulo_problema}
              onChange={handleChange}
              required
              className="w-full border-3 border-black p-3 font-bold shadow-brutal focus:shadow-brutal-lg outline-none"
              placeholder="Ej: Suma de dos números"
            />
          </div>

          {/* Descripción del problema */}
          <div>
            <label className="block font-brutal text-lg mb-2">
              📝 DESCRIPCIÓN DEL PROBLEMA *
            </label>
            <textarea
              name="descripcion_problema"
              value={formData.descripcion_problema}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border-3 border-black p-3 font-medium shadow-brutal focus:shadow-brutal-lg outline-none resize-none"
              placeholder="Describe detalladamente el problema que deben resolver los estudiantes..."
            />
          </div>

          {/* Formato de entrada y salida */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-brutal text-lg mb-2">
                📥 FORMATO DE ENTRADA *
              </label>
              <textarea
                name="input"
                value={formData.input}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border-3 border-black p-3 font-medium shadow-brutal focus:shadow-brutal-lg outline-none resize-none"
                placeholder="Describe el formato de los datos de entrada..."
              />
            </div>
            <div>
              <label className="block font-brutal text-lg mb-2">
                📤 FORMATO DE SALIDA *
              </label>
              <textarea
                name="output"
                value={formData.output}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border-3 border-black p-3 font-medium shadow-brutal focus:shadow-brutal-lg outline-none resize-none"
                placeholder="Describe el formato de la salida esperada..."
              />
            </div>
          </div>

          {/* Ejemplos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-brutal text-lg mb-2">
                🔢 EJEMPLO DE ENTRADA *
              </label>
              <textarea
                name="input_ejemplo"
                value={formData.input_ejemplo}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border-3 border-black p-3 font-mono text-sm shadow-brutal focus:shadow-brutal-lg outline-none resize-none bg-gray-100"
                placeholder="3 5"
              />
            </div>
            <div>
              <label className="block font-brutal text-lg mb-2">
                📋 EJEMPLO DE SALIDA *
              </label>
              <textarea
                name="output_ejemplo"
                value={formData.output_ejemplo}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border-3 border-black p-3 font-mono text-sm shadow-brutal focus:shadow-brutal-lg outline-none resize-none bg-gray-100"
                placeholder="8"
              />
            </div>
          </div>

          {/* Código base del editor */}
          <div>
            <label className="block font-brutal text-lg mb-2">
              💻 CÓDIGO BASE (OPCIONAL)
            </label>
            <textarea
              name="editor"
              value={formData.editor}
              onChange={handleChange}
              rows={6}
              className="w-full border-3 border-black p-3 font-mono text-sm shadow-brutal focus:shadow-brutal-lg outline-none resize-none bg-gray-900 text-green-400"
              placeholder={`# Escribe tu solución aquí
def resolver():
    # Tu código aquí
    pass`}
            />
            <p className="text-sm text-gray-600 mt-2">
              Código inicial que aparecerá en el editor para los estudiantes
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6 border-t-3 border-black">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 border-3 border-black shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-neo-lime border-3 border-black shadow-brutal px-8 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "CREANDO..." : "📝 CREAR PROBLEMA"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearProblemaModal;
