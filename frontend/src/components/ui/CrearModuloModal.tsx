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
      <div className="bg-neo-cream border-5 border-black shadow-brutal-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-neo-magenta border-b-5 border-black p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl text-white mb-1">
                CREAR NUEVO MÓDULO
              </h2>
              <p className="font-bold text-black">Para: {cursoTitulo}</p>
            </div>
            <button
              onClick={handleClose}
              className="bg-neo-red border-3 border-black shadow-brutal px-4 py-2 font-brutal text-xl hover:shadow-brutal-lg transition-shadow duration-100"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="bg-neo-lime border-4 border-black shadow-brutal p-6 animate-bounce">
                <span className="font-brutal text-2xl">
                  ✅ MÓDULO CREADO EXITOSAMENTE!
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título del módulo */}
              <div className="bg-neo-yellow border-4 border-black shadow-brutal p-4">
                <label className="block font-brutal text-lg mb-3">
                  📚 TÍTULO DEL MÓDULO
                </label>
                <input
                  type="text"
                  name="titulo_modulo"
                  value={formData.titulo_modulo}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-3 border-black font-bold focus:shadow-brutal transition-shadow duration-100"
                  placeholder="Ej: Módulo 1: Introducción"
                />
              </div>

              <div className="bg-neo-mint border-4 border-black shadow-brutal p-4">
                <label className="block font-brutal text-lg mb-3">
                  📝 DESCRIPCIÓN (OPCIONAL)
                </label>
                <textarea
                  name="descripcion_modulo"
                  value={formData.descripcion_modulo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border-3 border-black font-bold resize-none focus:shadow-brutal transition-shadow duration-100"
                  placeholder="Describe el contenido del módulo..."
                />
              </div>

              {error && (
                <div className="bg-neo-red border-4 border-black shadow-brutal p-4">
                  <span className="font-brutal text-lg text-white">
                    ❌ ERROR: {error}
                  </span>
                </div>
              )}

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
                  {loading ? "⏳ CREANDO..." : "✅ CREAR MÓDULO"}
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
