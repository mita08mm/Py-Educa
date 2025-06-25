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
      <div className="bg-neo-periwinkle rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-neo-lavender rounded-t-xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl text-neo-cream mb-1">
                CREAR NUEVA SECCIÓN
              </h2>
              <p className="font-bold text-neo-mint">Para: {moduloTitulo}</p>
            </div>
            <button
              onClick={handleClose}
              className="bg-neo-peach rounded-lg px-4 py-2 font-brutal text-xl text-neo-cream hover:bg-neo-lime hover:text-neo-cream transition-all duration-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="bg-neo-lime rounded-lg p-6 animate-bounce">
                <span className="font-brutal text-2xl text-neo-aqua">
                  ✅ SECCIÓN CREADA EXITOSAMENTE!
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div className="bg-neo-lavender rounded-lg p-4">
                <label className="block font-brutal text-lg mb-3 text-neo-cream">
                  📋 TÍTULO DE LA SECCIÓN
                </label>
                <input
                  type="text"
                  name="titulo_seccion"
                  value={formData.titulo_seccion}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                  placeholder="Ej: Conceptos Básicos"
                />
              </div>

              {/* Descripción */}
              <div className="bg-neo-lavender rounded-lg p-4 mt-4">
                <label className="block font-brutal text-lg mb-3 text-neo-cream">
                  📝 DESCRIPCIÓN (OPCIONAL)
                </label>
                <textarea
                  name="descripcion_seccion"
                  value={formData.descripcion_seccion}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 min-h-[100px] border border-neo-cream/30"
                  placeholder="Describe el contenido de esta sección..."
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-neo-error rounded-lg p-4">
                  <span className="font-brutal text-lg text-neo-cream">
                    ❌ ERROR: {error}
                  </span>
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-neo-sage rounded-lg px-6 py-3 font-brutal text-neo-cream transition-all duration-100 hover:bg-neo-mint hover:text-neo-aqua hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
                >
                  CANCELAR
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-lg px-6 py-3 font-brutal text-neo-cream transition-all duration-100 hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-neo-lime hover:bg-neo-green"
                  }`}
                >
                  {loading ? "⏳ CREANDO..." : "CREAR SECCIÓN"}
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
