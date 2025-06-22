import React, { useState, useEffect } from "react";
import { useCreateEvaluacion } from "../../hooks/useCreateEvaluacion";

interface CrearEvaluacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduloId: number;
  moduloTitulo: string;
  onEvaluacionCreated: () => void;
}

const CrearEvaluacionModal = ({
  isOpen,
  onClose,
  moduloId,
  moduloTitulo,
  onEvaluacionCreated,
}: CrearEvaluacionModalProps) => {
  const { createEvaluacion, loading, error, success, reset } =
    useCreateEvaluacion();

  const [formData, setFormData] = useState({
    titulo_evaluacion: "",
    descripcion_evaluacion: "",
    input: "",
    output: "",
    input_ejemplo: "",
    output_ejemplo: "",
    codigo: "",
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        handleClose();
        onEvaluacionCreated();
      }, 1500);
    }
  }, [success]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      cod_modulo: moduloId,
      titulo_evaluacion: formData.titulo_evaluacion,
      descripcion_evaluacion: formData.descripcion_evaluacion,
      input: formData.input,
      output: formData.output,
      input_ejemplo: formData.input_ejemplo,
      output_ejemplo: formData.output_ejemplo,
      codigo: formData.codigo,
    };

    await createEvaluacion(submitData);
  };

  const handleClose = () => {
    setFormData({
      titulo_evaluacion: "",
      descripcion_evaluacion: "",
      input: "",
      output: "",
      input_ejemplo: "",
      output_ejemplo: "",
      codigo: "",
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-neo-cream border-5 border-black shadow-brutal-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-neo-indigo border-b-5 border-black p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl text-white mb-1">
                CREAR EVALUACIÓN
              </h2>
              <p className="font-bold text-black">
                Para módulo: {moduloTitulo}
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
                  ✅ EVALUACIÓN CREADA EXITOSAMENTE!
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información básica */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Título */}
                <div className="bg-neo-yellow border-4 border-black shadow-brutal p-4">
                  <label className="block font-brutal text-lg mb-3">
                    🏷️ TÍTULO
                  </label>
                  <input
                    type="text"
                    name="titulo_evaluacion"
                    value={formData.titulo_evaluacion}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border-3 border-black font-bold focus:shadow-brutal transition-shadow duration-100"
                    placeholder="Ej: Algoritmo de Ordenamiento"
                  />
                </div>

                {/* Descripción */}
                <div className="bg-neo-coral border-4 border-black shadow-brutal p-4">
                  <label className="block font-brutal text-lg mb-3">
                    📝 DESCRIPCIÓN
                  </label>
                  <textarea
                    name="descripcion_evaluacion"
                    value={formData.descripcion_evaluacion}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full p-3 border-3 border-black font-bold resize-none focus:shadow-brutal transition-shadow duration-100"
                    placeholder="Describe qué debe resolver el estudiante..."
                  />
                </div>
              </div>

              {/* Ejemplos para estudiantes */}
              <div className="bg-neo-mint border-4 border-black shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  👨‍🎓 EJEMPLO PARA ESTUDIANTES
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-brutal text-sm mb-2">
                      INPUT EJEMPLO:
                    </label>
                    <textarea
                      name="input_ejemplo"
                      value={formData.input_ejemplo}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full p-3 border-3 border-black font-mono text-sm focus:shadow-brutal transition-shadow duration-100"
                      placeholder="5
1 3 2 5 4"
                    />
                  </div>
                  <div>
                    <label className="block font-brutal text-sm mb-2">
                      OUTPUT EJEMPLO:
                    </label>
                    <textarea
                      name="output_ejemplo"
                      value={formData.output_ejemplo}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full p-3 border-3 border-black font-mono text-sm focus:shadow-brutal transition-shadow duration-100"
                      placeholder="1 2 3 4 5"
                    />
                  </div>
                </div>
              </div>

              {/* Casos de prueba reales */}
              <div className="bg-neo-lavender border-4 border-black shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  🧪 CASOS DE PRUEBA REALES
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-brutal text-sm mb-2">
                      INPUT REAL:
                    </label>
                    <textarea
                      name="input"
                      value={formData.input}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full p-3 border-3 border-black font-mono text-sm focus:shadow-brutal transition-shadow duration-100"
                      placeholder="10
9 7 5 3 1 2 4 6 8 10"
                    />
                  </div>
                  <div>
                    <label className="block font-brutal text-sm mb-2">
                      OUTPUT ESPERADO:
                    </label>
                    <textarea
                      name="output"
                      value={formData.output}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full p-3 border-3 border-black font-mono text-sm focus:shadow-brutal transition-shadow duration-100"
                      placeholder="1 2 3 4 5 6 7 8 9 10"
                    />
                  </div>
                </div>
              </div>

              {/* Código base */}
              <div className="bg-neo-sage border-4 border-black shadow-brutal p-6">
                <label className="block font-brutal text-lg mb-3">
                  💻 CÓDIGO BASE (OPCIONAL)
                </label>
                <textarea
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-3 border-3 border-black font-mono text-sm bg-gray-900 text-green-400 focus:shadow-brutal transition-shadow duration-100"
                  placeholder="def resolver_problema():
    # Tu código aquí
    pass

# Llamar a la función
resolver_problema()"
                />
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
                  className="bg-neo-sage border-3 border-black shadow-brutal px-6 py-3 font-brutal hover:shadow-brutal-lg transition-shadow duration-100"
                >
                  CANCELAR
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`border-3 border-black shadow-brutal px-6 py-3 font-brutal transition-shadow duration-100 hover:shadow-brutal-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-neo-lime hover:bg-neo-green"
                  }`}
                >
                  {loading ? "⏳ CREANDO..." : "🧪 CREAR EVALUACIÓN"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearEvaluacionModal;
