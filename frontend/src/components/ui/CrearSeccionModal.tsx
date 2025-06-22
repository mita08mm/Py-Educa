import React, { useState, useEffect } from "react";
import { useCreateSeccion } from "../../hooks/useCreateSeccion";

interface CrearSeccionModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduloId: number;
  moduloTitulo: string;
  onSeccionCreated: () => void;
}

const CrearSeccionModal = ({
  isOpen,
  onClose,
  moduloId,
  moduloTitulo,
  onSeccionCreated,
}: CrearSeccionModalProps) => {
  const { createSeccion, loading, error, success, reset } = useCreateSeccion();

  const [formData, setFormData] = useState({
    titulo_seccion: "",
    descripcion_seccion: "",
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setFormData({ titulo_seccion: "", descripcion_seccion: "" });
        reset();
        onClose();
        onSeccionCreated();
      }, 1500);
    }
  }, [success, reset, onClose, onSeccionCreated]);

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
    await createSeccion({
      cod_modulo: moduloId,
      titulo_seccion: formData.titulo_seccion,
      descripcion_seccion: formData.descripcion_seccion || undefined,
    });
  };

  const handleClose = () => {
    setFormData({ titulo_seccion: "", descripcion_seccion: "" });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-neo-cream border-5 border-black shadow-brutal-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-neo-coral border-b-5 border-black p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl text-black mb-1">
                CREAR NUEVA SECCIÓN
              </h2>
              <p className="font-bold text-gray-800">Para: {moduloTitulo}</p>
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
                  ✅ SECCIÓN CREADA EXITOSAMENTE!
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div className="bg-neo-yellow border-4 border-black shadow-brutal p-4">
                <label className="block font-brutal text-lg mb-3">
                  📋 TÍTULO DE LA SECCIÓN
                </label>
                <input
                  type="text"
                  name="titulo_seccion"
                  value={formData.titulo_seccion}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-3 border-black font-bold focus:shadow-brutal transition-shadow duration-100"
                  placeholder="Ej: Conceptos Básicos"
                />
              </div>

              {/* Descripción */}
              <div className="bg-neo-mint border-4 border-black shadow-brutal p-4">
                <label className="block font-brutal text-lg mb-3">
                  📝 DESCRIPCIÓN (OPCIONAL)
                </label>
                <textarea
                  name="descripcion_seccion"
                  value={formData.descripcion_seccion}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border-3 border-black font-bold resize-none focus:shadow-brutal transition-shadow duration-100"
                  placeholder="Describe el contenido de esta sección..."
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
                  {loading ? "⏳ CREANDO..." : "✅ CREAR SECCIÓN"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearSeccionModal;
