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
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        handleClose();
        onEvaluacionCreated();
      }, 1500);
    }
  }, [success, onEvaluacionCreated]);

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
    };

    await createEvaluacion(submitData);
  };

  const handleClose = () => {
    setFormData({
      titulo_evaluacion: "",
      descripcion_evaluacion: "",
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-neo-periwinkle border-5 border-black shadow-brutal-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-neo-indigo border-b-5 border-black p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl text-white mb-1">
                CREAR EVALUACIÓN
              </h2>
              <p className="font-bold text-white">
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
              {/* Información de la evaluación */}
              <div className="bg-neo-coral shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  📋 INFORMACIÓN BÁSICA
                </h3>

                {/* Título */}
                <div className="mb-4">
                  <label className="block font-brutal text-lg mb-3">
                    🏷️ TÍTULO DE LA EVALUACIÓN
                  </label>
                  <input
                    type="text"
                    name="titulo_evaluacion"
                    value={formData.titulo_evaluacion}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                    placeholder="Ej: Evaluación de Algoritmos de Ordenamiento"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block font-brutal text-lg mb-3">
                    📝 DESCRIPCIÓN
                  </label>
                  <textarea
                    name="descripcion_evaluacion"
                    value={formData.descripcion_evaluacion}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"

                    placeholder="Describe el objetivo de esta evaluación y qué temas abarca..."
                  />
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-neo-coral shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  ℹ️ INFORMACIÓN IMPORTANTE
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-brutal text-lg">📝</span>
                    <span className="font-bold">
                      Después de crear la evaluación, podrás agregar problemas
                      específicos
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-brutal text-lg">🧪</span>
                    <span className="font-bold">
                      Cada problema tendrá sus propios casos de prueba y
                      ejemplos
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-brutal text-lg">⏱️</span>
                    <span className="font-bold">
                      Los estudiantes podrán resolver los problemas en orden
                    </span>
                  </div>
                </div>
              </div>

              {/* Flujo de trabajo */}
              <div className="bg-neo-coral shadow-brutal p-6">
                <h3 className="font-brutal text-xl mb-4">
                  🚀 ¿QUÉ SIGUE DESPUÉS?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-neo-sage shadow-brutal p-4 text-center">
                    <div className="font-brutal text-2xl mb-2">1️⃣</div>
                    <div className="font-bold text-sm">CREAR EVALUACIÓN</div>
                    <div className="text-xs mt-1">
                      Establece título y descripción
                    </div>
                  </div>
                  <div className="bg-neo-sage shadow-brutal p-4 text-center">
                    <div className="font-brutal text-2xl mb-2">2️⃣</div>
                    <div className="font-bold text-sm">AGREGAR PROBLEMAS</div>
                    <div className="text-xs mt-1">
                      Define casos de prueba y ejemplos
                    </div>
                  </div>
                  <div className="bg-neo-sage shadow-brutal p-4 text-center">
                    <div className="font-brutal text-2xl mb-2">3️⃣</div>
                    <div className="font-bold text-sm">
                      ESTUDIANTES RESUELVEN
                    </div>
                    <div className="text-xs mt-1">Completan los problemas</div>
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
