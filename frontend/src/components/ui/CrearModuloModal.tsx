import React, { useState, useEffect } from "react";
import { useCreateModulo } from "../../hooks/useCreateModulo";

interface CrearModuloModalProps {
  isOpen: boolean;
  onClose: () => void;
  cursoId: number;
  cursoTitulo: string;
  onModuloCreated: () => void;
}

const CrearModuloModal = ({
  isOpen,
  onClose,
  cursoId,
  cursoTitulo,
  onModuloCreated,
}: CrearModuloModalProps) => {
  const { createModulo, loading, error, success, reset } = useCreateModulo();

  const [formData, setFormData] = useState({
    titulo_modulo: "",
    descripcion_modulo: "",
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setFormData({ titulo_modulo: "", descripcion_modulo: "" });
        reset();
        onClose();
        onModuloCreated();
      }, 1500);
    }
  }, [success, reset, onClose, onModuloCreated]);

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
    await createModulo({
      cod_curso: cursoId,
      titulo_modulo: formData.titulo_modulo,
      descripcion_modulo: formData.descripcion_modulo || undefined,
    });
  };

  const handleClose = () => {
    setFormData({ titulo_modulo: "", descripcion_modulo: "" });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-neo-periwinkle rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-neo-lavender rounded-t-xl p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl text-neo-cream mb-1">
                CREAR NUEVO MÓDULO
              </h2>
              <p className="font-bold text-neo-mint">Para: {cursoTitulo}</p>
            </div>
            <button
              onClick={handleClose}
              className="bg-neo-peach rounded-lg px-4 py-2 font-brutal text-xl text-neo-cream hover:bg-neo-lime hover:text-neo-cream transition-all duration-100"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="bg-neo-lime rounded-lg p-6 animate-bounce">
                <span className="font-brutal text-2xl text-neo-aqua">
                  ✅ MÓDULO CREADO EXITOSAMENTE!
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título del módulo */}
              <div className="bg-neo-lavender rounded-lg p-4">
                <label className="block font-brutal text-lg mb-3 text-neo-cream">
                  📚 TÍTULO DEL MÓDULO
                </label>
                <input
                  type="text"
                  name="titulo_modulo"
                  value={formData.titulo_modulo}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 border border-neo-cream/30"
                  placeholder="Ej: Módulo 1: Introducción"
                />
              </div>

              {/* Descripción del módulo */}
              <div className="bg-neo-lavender rounded-lg p-4 mt-4">
                <label className="block font-brutal text-lg mb-3 text-neo-cream">
                  📝 DESCRIPCIÓN DEL MÓDULO
                </label>
                <textarea
                  name="descripcion_modulo"
                  value={formData.descripcion_modulo}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg font-bold bg-neo-lavender text-neo-cream placeholder:text-neo-cream/60 focus:ring-2 focus:ring-neo-lime transition-shadow duration-100 min-h-[100px] border border-neo-cream/30"
                  placeholder="Ej: En este módulo aprenderás los conceptos básicos de Python."
                />
              </div>

              {error && (
                <div className="bg-neo-error rounded-lg p-4">
                  <span className="font-brutal text-lg text-neo-cream">
                    ❌ ERROR: {error}
                  </span>
                </div>
              )}

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
                  {loading ? "⏳ CREANDO..." : "CREAR MÓDULO"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearModuloModal;
