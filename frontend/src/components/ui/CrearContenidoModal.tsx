import React, { useState, useEffect } from "react";
import { useCreateContenido } from "../../hooks/usecreateContenido";
import { getYouTubeThumbnail } from "../../utils/youtubeUtils";

interface CrearContenidoModalProps {
  isOpen: boolean;
  onClose: () => void;
  subseccionId: number;
  subseccionTitulo: string;
  onContenidoCreated: () => void;
}

const CrearContenidoModal = ({
  isOpen,
  onClose,
  subseccionId,
  subseccionTitulo,
  onContenidoCreated,
}: CrearContenidoModalProps) => {
  const { createContenido, loading, error, success, reset } =
    useCreateContenido();

  const [formData, setFormData] = useState({
    descripcion: "",
    link: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [youtubePreview, setYoutubePreview] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        handleClose();
        onContenidoCreated();
      }, 1500);
    }
  }, [success]);

  useEffect(() => {
    // Preview de YouTube
    if (formData.link) {
      const thumbnail = getYouTubeThumbnail(formData.link);
      setYoutubePreview(thumbnail);
    } else {
      setYoutubePreview(null);
    }
  }, [formData.link]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();

    if (formData.descripcion.trim()) {
      submitData.append("descripcion", formData.descripcion);
    }
    if (formData.link.trim()) {
      submitData.append("link", formData.link);
    }
    if (selectedImage) {
      submitData.append("imagen", selectedImage);
    }

    await createContenido(subseccionId, submitData);
  };

  const handleClose = () => {
    setFormData({ descripcion: "", link: "" });
    setSelectedImage(null);
    setImagePreview(null);
    setYoutubePreview(null);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-neo-cream border-5 border-black shadow-brutal-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-neo-purple border-b-5 border-black p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-brutal text-2xl text-white mb-1">
                AGREGAR CONTENIDO
              </h2>
              <p className="font-bold text-black">Para: {subseccionTitulo}</p>
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
                  ✅ CONTENIDO AGREGADO EXITOSAMENTE!
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Descripción */}
              <div className="bg-neo-yellow border-4 border-black shadow-brutal p-4">
                <label className="block font-brutal text-lg mb-3">
                  📝 DESCRIPCIÓN
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border-3 border-black font-bold resize-none focus:shadow-brutal transition-shadow duration-100"
                  placeholder="Explica el contenido de esta lección..."
                />
              </div>

              {/* Link de YouTube */}
              <div className="bg-neo-coral border-4 border-black shadow-brutal p-4">
                <label className="block font-brutal text-lg mb-3">
                  📹 VIDEO DE YOUTUBE (OPCIONAL)
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full p-3 border-3 border-black font-bold focus:shadow-brutal transition-shadow duration-100"
                  placeholder="https://www.youtube.com/watch?v=..."
                />

                {/* Preview del video de YouTube */}
                {youtubePreview && (
                  <div className="mt-4 border-3 border-black shadow-brutal bg-white p-4">
                    <p className="font-brutal text-lg mb-3">
                      PREVIEW DEL VIDEO:
                    </p>
                    <img
                      src={youtubePreview}
                      alt="YouTube Preview"
                      className="max-w-xs max-h-32 border-3 border-black shadow-brutal"
                    />
                  </div>
                )}
              </div>

              {/* Imagen */}
              <div className="bg-neo-mint border-4 border-black shadow-brutal p-4">
                <label className="block font-brutal text-lg mb-3">
                  🖼️ IMAGEN ADICIONAL (OPCIONAL)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border-3 border-black bg-white font-bold  file:bg-neo-orange file:px-4 file:py-2 file:font-brutal file:border-3 file:border-black file:shadow-brutal file:mr-4"
                />

                {/* Preview de la imagen */}
                {imagePreview && (
                  <div className="mt-4 border-3 border-black shadow-brutal bg-white p-4">
                    <p className="font-brutal text-lg mb-3">
                      PREVIEW DE LA IMAGEN:
                    </p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-xs max-h-48 border-3 border-black shadow-brutal"
                    />
                  </div>
                )}
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
                  {loading ? "⏳ GUARDANDO..." : "✅ AGREGAR CONTENIDO"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrearContenidoModal;
